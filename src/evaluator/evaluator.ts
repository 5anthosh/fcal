import { FcalError } from '../fcal';
import { ToJSON } from '../json/toJSON';
import { Expr } from '../parser/expr';
import { TT } from '../parser/lex/token';
import { Parser } from '../parser/parser';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';
import { Phrases } from '../types/phrase';
import { Unit, UnitMeta } from '../types/units';
import { Converter } from './converter';
import { Environment } from './environment';
import { FcalFunction } from './function';
import { Scale } from './scale';

class Evaluator implements Expr.IVisitor<Type> {
  public readonly environment: Environment;
  private readonly ast: Expr;
  private readonly source?: string;
  private strict: boolean;
  constructor(
    source: string | Expr,
    phrases: Phrases,
    units: Unit.List,
    environment: Environment,
    c: Converter,
    scale: Scale,
    strict: boolean,
  ) {
    this.environment = environment;
    this.strict = strict;
    if (typeof source === 'string') {
      const parser = new Parser(source, phrases, units, c, scale, environment.symbolTable);
      this.ast = parser.parse();
      this.source = source;
      return;
    }
    this.ast = source;
  }

  public getAST(): string {
    return this.ast.toString();
  }

  public toJSON(): string {
    return new ToJSON(this.ast).toJSON();
  }

  public toObj(): object {
    return new ToJSON(this.ast).toObj();
  }

  public visitCallExpr(expr: Expr.Call): Type {
    const name = expr.name;
    let call: FcalFunction | undefined;
    call = this.environment.functions.get(name);
    if (call) {
      if (call.arity !== -1) {
        if (call.arity !== expr.argument.length) {
          throw new FcalError(
            `function ${name} expected ${call.arity} args but got ${expr.argument.length}`,
            expr.start,
            expr.end,
          );
        }
      }
      const argument = Array<Type>();
      for (const param of expr.argument) {
        argument.push(this.evaluate(param));
      }
      return call.call(this.environment, argument);
    }
    throw new FcalError(`${name} is not callable`, expr.start, expr.end);
  }

  public visitAssignExpr(expr: Expr.Assign): Type {
    const value = this.evaluate(expr.value);
    this.environment.set(expr.name, value);
    return value;
  }

  public visitVariableExpr(expr: Expr.Variable): Type {
    return this.environment.get(expr.name, expr.start, expr.end);
  }

  public evaluateExpression(): Type {
    try {
      const value = this.evaluate(this.ast);
      this.environment.set('_', value);
      return value;
    } catch (e) {
      if (e instanceof FcalError) {
        e.source = this.source;
      }
      throw e;
    }
  }

  public visitConversionExpr(expr: Expr.ConversionExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numeric) {
      if (expr.to instanceof UnitMeta) {
        return Type.UnitNumber.convertToUnit(value, expr.to).setSystem(value.ns);
      }
      if (expr.to instanceof NumberSystem) {
        return (value as Type.Numeric).setSystem(expr.to);
      }
      return expr.to(value);
    }
    throw new FcalError('Expecting numeric value before in', expr.start, expr.end);
  }

  public visitUnitExpr(expr: Expr.UnitExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numeric) {
      return Type.UnitNumber.New((value as Type.Numeric).n, expr.unit).setSystem(value.ns);
    }
    throw new FcalError('Expecting numeric value before unit', expr.start, expr.end);
  }

  public visitTernaryExpr(expr: Expr.Ternary): Type {
    const main = this.evaluate(expr.main) as Type.Numeric;
    if (main.trusty()) {
      return this.evaluate(expr.trueExpr);
    }
    return this.evaluate(expr.falseExpr);
  }

  public visitLogicalExpr(expr: Expr.Logical): Type {
    const left = this.evaluate(expr.left) as Type.Numeric;
    if (expr.operator.type === TT.AND) {
      return left.trusty() ? this.evaluate(expr.right) : left;
    }
    return left.trusty() ? left : this.evaluate(expr.right);
  }

  public visitBinaryExpr(expr: Expr.Binary): Type {
    let left = this.evaluate(expr.left) as Type.Numeric;
    const right = this.evaluate(expr.right) as Type.Numeric;
    if (this.strict) {
      this.checkInvalidOperation(expr.operator.type, [left, right]);
    }
    switch (expr.operator.type) {
      case TT.EQUAL_EQUAL:
        return left.EQ(right);
      case TT.EQUAL_EQUAL_EQUAL:
        return new Type.FBoolean(left.n.eq(right.n));
      case TT.NOT_EQUAL:
        return left.NEQ(right);
      case TT.NOT_EQUAL_EQUAL:
        return new Type.FBoolean(!left.n.eq(right.n));
      case TT.GREATER:
        return left.GT(right);
      case TT.GREATER_EQUAL:
        return left.GTE(right);
      case TT.GREATER_EQUAL_EQUAL:
        return new Type.FBoolean(left.n.gte(right.n));
      case TT.LESS:
        return left.LT(right);
      case TT.LESS_EQUAL:
        return left.LTE(right);
      case TT.LESS_EQUAL_EQUAL:
        return new Type.FBoolean(left.n.lte(right.n));
      case TT.PLUS:
        return left.Add(right);
      case TT.MINUS:
        return left.Sub(right);
      case TT.TIMES:
        return left.times(right);
      case TT.FLOOR_DIVIDE:
        const v = left.divide(right);
        v.n = v.n.floor();
        return v;
      case TT.SLASH:
        return left.divide(right);
      case TT.MOD:
        return left.modulo(right);
      case TT.CAP:
        return left.power(right);
      case TT.OF:
        left = new Type.Percentage(left.n);
        const per = left as Type.Percentage;
        right.n = per.percentageValue(right.n);
        return right;
      default:
        return Type.BNumber.ZERO;
    }
  }

  public visitGroupingExpr(expr: Expr.Grouping): Type {
    return this.evaluate(expr.expression);
  }

  public visitLiteralExpr(expr: Expr.Literal): Type {
    return expr.value;
  }

  public visitUnaryExpr(expr: Expr.Unary): Type {
    const right = this.evaluate(expr.right) as Type.BNumber;
    if (expr.operator.type === TT.MINUS) {
      return right.negated();
    }
    if (expr.operator.type === TT.NOT) {
      return right.not();
    }
    return right;
  }

  public visitPercentageExpr(expr: Expr.Percentage): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numeric) {
      return Type.Percentage.New((value as Type.Numeric).n);
    }
    throw new FcalError('Expecting numeric value in percentage', expr.start, expr.end);
  }
  private evaluate(expr: Expr): Type {
    const ast = expr.eval(this);
    return ast;
  }
  private checkInvalidOperation(operation: TT, values: Type[]): void {
    let checkValue;
    for (const value of values) {
      if (value instanceof Type.Percentage) {
        continue;
      }
      if (!checkValue) {
        checkValue = value;
        continue;
      }
      if (checkValue.TYPE !== value.TYPE) {
        switch (operation) {
          case TT.TIMES:
          case TT.SLASH:
          case TT.FLOOR_DIVIDE:
          case TT.MOD:
          case TT.PERCENTAGE:
          case TT.CAP:
          case TT.LESS_EQUAL_EQUAL:
          case TT.GREATER_EQUAL_EQUAL:
          case TT.EQUAL_EQUAL_EQUAL:
          case TT.NOT_EQUAL_EQUAL:
            continue;
          default:
            throw new FcalError(
              `Unexpected '${operation}' operation between different types (${Type.typeVsStr[checkValue.TYPE]}, ${
                Type.typeVsStr[value.TYPE]
              })`,
            );
        }
      }
      if (checkValue instanceof Type.UnitNumber && value instanceof Type.UnitNumber) {
        if (checkValue.unit.id !== value.unit.id) {
          throw new FcalError(
            `Unexpected '${operation}' operation between different units (${checkValue.unit.id}, ${value.unit.id})`,
          );
        }
      }
    }
  }
}

export { Evaluator };
