import Big = require('decimal.js');
import { TokenType, PrintTT } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';
import { Phrases } from '../phrase';

export class Interpreter implements Expr.IVisitor<any> {
  private parser: Parser;
  constructor(source: string, phrases: Phrases) {
    this.parser = new Parser(source, phrases);
  }

  public evaluateExpression(): any {
    const expr = this.parser.parse();
    return this.evaluate(expr);
  }

  public visitBinaryExpr(expr: Expr.Binary): any {
    const left = this.evaluate(expr.left) as Big.Decimal;
    const right = this.evaluate(expr.right) as Big.Decimal;
    console.log(`${PrintTT(expr.operator.type)} ${left} ${right}`);
    switch (expr.operator.type) {
      case TokenType.PLUS:
        return left.plus(right);
      case TokenType.MINUS:
        return left.minus(right);
      case TokenType.TIMES:
        return left.mul(right);
      case TokenType.SLASH:
        return left.div(right);
      case TokenType.MOD:
        if (right.isZero()) {
          return new Big.Decimal('Infinity');
        }
        return left.mod(right);
      case TokenType.CAP:
        if (left.isNegative()) {
          if (!right.isInteger()) {
            // safe play with complex numbers
            // -2^0.25 will handled like -(2^0.25)
            // may support complex numbers in future
            return left
              .negated()
              .pow(right)
              .negated();
          }
        }
        return left.pow(right);
      default:
        return new Big.Decimal(0);
    }
  }

  public visitGroupingExpr(expr: Expr.Grouping): any {
    return this.evaluate(expr.expression);
  }

  public visitLiteralExpr(expr: Expr.Literal): any {
    return expr.value;
  }

  public visitUnaryExpr(expr: Expr.Unary): any {
    const right = this.evaluate(expr.right) as Big.Decimal;
    if (expr.operator.type === TokenType.MINUS) {
      return right.negated();
    }
    return right;
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }
}
