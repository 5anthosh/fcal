import { FcalError } from '../FcalError';
import { TokenType } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';
import { Type } from '../types/datatype';
import { Phrases } from '../types/phrase';
import { Unit } from '../types/units';
import { Environment } from './environment';
import { FcalFunction, FcalFunctions } from './function';

export class Interpreter implements Expr.IVisitor<any> {
  private parser: Parser;
  private ast: Expr;
  private environment: Environment;
  private funcations: FcalFunctions;
  constructor(source: string, phrases: Phrases, units: Unit.Units, environment: Environment, functions: FcalFunctions) {
    this.parser = new Parser(source, phrases, units);
    this.environment = environment;
    this.funcations = functions;
    this.ast = this.parser.parse();
  }

  public visitCallExpr(expr: Expr.Call): Type {
    // console.log(`VISIT CALL EXP ${expr.name}`);
    const name = expr.name;
    let call: FcalFunction | null;
    let ok: boolean;
    [call, ok] = this.funcations.get(name);
    if (ok && call != null) {
      if (call.arbity !== -1) {
        if (call.arbity !== expr.argument.length) {
          FcalError.throwWithEnd(
            expr.start,
            expr.end,
            `function ${name} Expected ${call.arbity} args but got ${expr.argument.length}`,
          );
        }
      }
      const argument = Array<Type>();
      for (const param of expr.argument) {
        argument.push(this.evaluate(param));
      }
      return call.call(this.environment, ...argument);
    }
    throw FcalError.ErrorWithEnd(expr.start, expr.end, `${name} is not callable`);
  }
  public visitAssignExpr(expr: Expr.Assign): Type {
    // console.log('VISIT ASSIGN');
    const value = this.evaluate(expr.value);
    this.environment.set(expr.name, value);
    return value;
  }
  public visitVariableExpr(expr: Expr.Variable): Type {
    // console.log('VISIT VARIABLE');
    return this.environment.get(expr.name);
  }
  public evaluateExpression(): Type {
    // console.log(this.ast.toString());
    return this.evaluate(this.ast);
  }

  public visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.UnitNumber.convertToUnit(value as Type.Numberic, expr.unit);
    }
    throw FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value before in');
  }
  public visitUnitExpr(expr: Expr.UnitExpr): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.UnitNumber.New((value as Type.Numberic).number, expr.unit);
    }
    throw FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value before unit');
  }

  public visitBinaryExpr(expr: Expr.Binary): Type.BNumber {
    // console.log(`VISIT BIN ${PrintTT(expr.operator.type)} LEFT`);
    let left = this.evaluate(expr.left) as Type.BNumber;
    // console.log(`VISIT BIN ${PrintTT(expr.operator.type)} RIGHT`);
    const right = this.evaluate(expr.right) as Type.BNumber;
    switch (expr.operator.type) {
      case TokenType.PLUS:
        return left.Add(right);
      case TokenType.MINUS:
        return left.Sub(right);
      case TokenType.TIMES:
        return left.times(right);
      case TokenType.SLASH:
        return left.divide(right);
      case TokenType.MOD:
        if (right.isZero()) {
          return new Type.BNumber('Infinity');
        }
        return left.modulo(right);
      case TokenType.CAP:
        if (left.isNegative()) {
          if (!right.isInteger()) {
            // safe play with complex numbers
            // -2^0.25 will handled like -(2^0.25)
            // may support complex numbers in future
            return left
              .negated()
              .power(right)
              .negated();
          }
        }
        return left.power(right);
      case TokenType.OF:
        left = new Type.Percentage(left.number);
        const per = left as Type.Percentage;
        right.number = per.percentageValue(right.number);
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
    // console.log('VISIT UNARY');
    const right = this.evaluate(expr.right) as Type.BNumber;
    if (expr.operator.type === TokenType.MINUS) {
      return right.negated();
    }
    return right;
  }

  public visitPercentageExpr(expr: Expr.Percentage): Type {
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.Percentage.New((value as Type.Numberic).number);
    }
    throw FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value in percentage');
  }
  public setValues(values: { [index: string]: Type | number }) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
  }
  private evaluate(expr: Expr): Type {
    // console.log(expr.toString());
    const ast = expr.accept(this);
    // console.log(ast.format());
    return ast;
  }
}

export function setCharAt(str: string, replace: string, start: number, end: number): string {
  if (start > str.length - 1 && end > str.length - 1) {
    return str;
  }
  return str.substr(0, start) + replace + str.substr(end);
}
