import { FcalError } from '../fcal';
import { TT } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';
import { Type } from '../types/datatype';
import { Phrases } from '../types/phrase';
import { Unit, UnitMeta } from '../types/units';
import { EnvInputType, Environment } from './environment';
import { FcalFunction } from './function';

class Interpreter implements Expr.IVisitor<Type> {
  private readonly ast: Expr;
  private readonly environment: Environment;
  constructor(source: string, phrases: Phrases, units: Unit.List, environment: Environment) {
    const parser = new Parser(source, phrases, units, environment.symbolTable);
    this.environment = environment;
    this.ast = parser.parse();
  }

  public getAST(): string {
    return this.ast.toString();
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
    return this.environment.get(expr.name);
  }

  public evaluateExpression(): Type {
    const value = this.evaluate(this.ast);
    this.environment.set('_', value);
    return value;
  }

  public visitUnitConvertionExpr(expr: Expr.UnitorNSConvertionExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      if (expr.unit instanceof UnitMeta) {
        return Type.UnitNumber.convertToUnit(value, expr.unit).setSystem(value.ns);
      }
      return (value as Type.Numberic).setSystem(expr.unit);
    }
    throw new FcalError('Expecting numeric value before in', expr.start, expr.end);
  }

  public visitUnitExpr(expr: Expr.UnitExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.UnitNumber.New((value as Type.Numberic).n, expr.unit).setSystem(value.ns);
    }
    throw new FcalError('Expecting numeric value before unit', expr.start, expr.end);
  }

  public visitLogicalExpr(expr: Expr.Logical): Type {
    const left = this.evaluate(expr.left) as Type.Numberic;
    if (expr.operator.type === TT.AND) {
      const right = this.evaluate(expr.right) as Type.Numberic;
      return new Type.FBoolean(left.trusty() && right.trusty());
    }
    return new Type.FBoolean(left.trusty() || (this.evaluate(expr.right) as Type.Numberic).trusty());
  }

  public visitBinaryExpr(expr: Expr.Binary): Type {
    let left = this.evaluate(expr.left) as Type.Numberic;
    const right = this.evaluate(expr.right) as Type.Numberic;
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
        return left.Add(right, expr.left.start, expr.right.end);
      case TT.MINUS:
        return left.Sub(right, expr.left.start, expr.right.end);
      case TT.TIMES:
        return left.times(right, expr.left.start, expr.right.end);
      case TT.FLOOR_DIVIDE:
        const v = left.divide(right, expr.left.start, expr.right.end);
        v.n = v.n.floor();
        return v;
      case TT.SLASH:
        return left.divide(right, expr.left.start, expr.right.end);
      case TT.MOD:
        return left.modulo(right, expr.left.start, expr.right.end);
      case TT.CAP:
        return left.power(right, expr.left.start, expr.right.end);
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
    if (value instanceof Type.Numberic) {
      return Type.Percentage.New((value as Type.Numberic).n);
    }
    throw new FcalError('Expecting numeric value in percentage', expr.start, expr.end);
  }

  public setValues(values: EnvInputType) {
    this.environment.use(values);
  }

  private evaluate(expr: Expr): Type {
    const ast = expr.accept(this);
    return ast;
  }
}

export { Interpreter };
