import { TokenType, PrintTT } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';
import { Phrases } from '../phrase';
import { Type } from '../datetype';

export class Interpreter implements Expr.IVisitor<any> {
  private parser: Parser;
  private ast: Expr;
  private source: string;
  constructor(source: string, phrases: Phrases) {
    this.source = source;
    this.parser = new Parser(source, phrases);
  }

  public evaluateExpression(): Type {
    console.debug(this.parser.source);
    console.debug('=====================Parser debug starts=============');
    this.ast = this.parser.parse();
    console.log(this.ast.toString());
    console.debug('================Interpreter debug starts=============');
    const Type = this.evaluate(this.ast);
    console.debug('================Interpreter debug ends=============');

    return Type;
  }

  public visitBinaryExpr(expr: Expr.Binary): Type.BNumber {
    console.debug('VISITING BINARY LEFT');
    let left = this.evaluate(expr.left) as Type.BNumber;
    console.debug('VISITING BINARY RIGHT');
    const right = this.evaluate(expr.right) as Type.BNumber;
    console.log(`${PrintTT(expr.operator.type)} ${left.format()} ${right.format()}`);
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
    console.debug('VISITING GROUP');
    return this.evaluate(expr.expression);
  }

  public visitLiteralExpr(expr: Expr.Literal): Type {
    return expr.value;
  }

  public visitUnaryExpr(expr: Expr.Unary): Type.BNumber {
    console.debug('VISITING UNARY');
    const right = this.evaluate(expr.right) as Type.BNumber;
    if (expr.operator.type === TokenType.MINUS) {
      return right.negated();
    }
    return right;
  }

  public visitPercentageExpr(expr: Expr.Percentage): Type {
    console.debug('VISITING UNARY');
    const value = this.evaluate(expr.expression);
    if (value instanceof Type.Numberic) {
      return Type.Percentage.New((value as Type.Numberic).number);
    }
    throw new Error('Expecting numeric value in percentage');
  }
  private evaluate(expr: Expr): Type {
    console.debug(expr.start, expr.end);
    console.debug(expr.toString());
    const ast = expr.accept(this);
    console.debug(`result ${ast.format()}`);
    console.log(setCharAt(this.source, ast.format(), expr.start, expr.end));
    return ast;
  }
}

function setCharAt(str: string, replace: string, start: number, end: number): string {
  if (start > str.length - 1 && end > str.length - 1) {
    return str;
  }
  return str.substr(0, start) + replace + str.substr(end);
}
