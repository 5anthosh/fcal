import Decimal from 'decimal.js';
import { FcalError } from '../FcalError';
import { TT } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';
import { Type } from '../types/datatype';
import { Phrases } from '../types/phrase';
import { Unit } from '../types/units';
import { Environment } from './environment';
import { FcalFunction } from './function';

export class Interpreter implements Expr.IVisitor<any> {
  private ast: Expr;
  private environment: Environment;
  constructor(source: string, phrases: Phrases, units: Unit.List, environment: Environment) {
    const parser = new Parser(source, phrases, units);
    this.environment = environment;
    this.ast = parser.parse();
  }

  public visitCallExpr(expr: Expr.Call): Type {
    const name = expr.name;
    let call: FcalFunction | undefined;
    call = this.environment.functions.get(name);
    if (call) {
      if (call.arbity !== -1) {
        if (call.arbity !== expr.argument.length) {
          throw new FcalError(
            `function ${name} Expected ${call.arbity} args but got ${expr.argument.length}`,
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

  public visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.UnitNumber.convertToUnit(value as Type.Numberic, expr.unit);
    }
    throw new FcalError('Expecting numeric value before in', expr.start, expr.end);
  }
  public visitUnitExpr(expr: Expr.UnitExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.UnitNumber.New((value as Type.Numberic).n, expr.unit);
    }
    throw new FcalError('Expecting numeric value before unit', expr.start, expr.end);
  }

  public visitBinaryExpr(expr: Expr.Binary): Type.BNumber {
    let left = this.evaluate(expr.left) as Type.BNumber;
    const right = this.evaluate(expr.right) as Type.BNumber;
    switch (expr.operator.type) {
      case TT.PLUS:
        if (!left.n.isFinite() && !right.n.isFinite()) {
          if (!((left.n.isNegative() && right.n.isNegative()) || (left.n.isPositive() && right.n.isPositive()))) {
            // console.log(left.number, right.number);
            throw new FcalError('Subtraction between Infinity is indeterminate', expr.left.start, expr.right.end);
          }
        }
        return left.Add(right);
      case TT.MINUS:
        if (!left.n.isFinite() && !right.n.isFinite()) {
          if ((left.n.isPositive() && right.n.isPositive()) || (left.n.isNegative() && right.n.isNegative())) {
            // console.log(left.number, right.number)
            throw new FcalError('Subtraction between Infinity is indeterminate', expr.left.start, expr.right.end);
          }
        }
        return left.Sub(right);
      case TT.TIMES:
        return left.times(right);
      case TT.SLASH:
        if (!left.n.isFinite() && !right.n.isFinite()) {
          throw new FcalError('Division between Infinity is indeterminate', expr.left.start, expr.right.end);
        }
        return left.divide(right);
      case TT.MOD:
        if (!left.n.isFinite()) {
          throw new FcalError('Modulus between Infinity is indeterminate', expr.left.start, expr.right.end);
        }
        if (right.isZero()) {
          return new Type.BNumber('Infinity');
        }
        return left.modulo(right);
      case TT.CAP:
        if (left.isNegative()) {
          if (!right.isInteger()) {
            throw new FcalError(
              `Pow of operation results in complex number and complex is not supported yet`,
              expr.left.start,
              expr.right.end,
            );
          }
        }
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

  public visitUnaryExpr(expr: Expr.Unary): Type.BNumber {
    const right = this.evaluate(expr.right) as Type.BNumber;
    if (expr.operator.type === TT.MINUS) {
      return right.negated();
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
  public setValues(values: { [index: string]: Type | number | string | Decimal }) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
  }
  private evaluate(expr: Expr): Type {
    const ast = expr.accept(this);
    return ast;
  }
}
