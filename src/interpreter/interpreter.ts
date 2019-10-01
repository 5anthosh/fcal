import Big = require('big.js');

import { TokenType } from '../lex/token';
import { Expr } from '../parser/expr';
import { Parser } from '../parser/parser';

export class Interpreter implements Expr.IVisitor<any> {
  private parser: Parser;
  constructor(source: string) {
    this.parser = new Parser(source);
  }

  public evaluateExpression(): any {
    const expr = this.parser.parse();
    return this.evaluate(expr);
  }

  public visitBinaryExpr(expr: Expr.Binary): any {
    const left = this.evaluate(expr.left) as Big.Big;
    const right = this.evaluate(expr.right) as Big.Big;
    switch (expr.operator.type) {
      case TokenType.PLUS:
        return left.add(right);
      case TokenType.MINUS:
        return left.add(right);
      case TokenType.TIMES:
        return left.mul(right);
      case TokenType.SLASH:
        return left.div(right);
      default:
        return null;
    }
  }

  public visitGroupingExpr(expr: Expr.Grouping): any {
    return this.evaluate(expr.expression);
  }

  public visitLiteralExpr(expr: Expr.Literal): any {
    return expr.value;
  }

  public visitUnaryExpr(expr: Expr.Unary): any {
    const right = this.evaluate(expr.right) as Big.Big;
    if (expr.operator.type === TokenType.PLUS) {
      return right.mul(-1);
    }
    return right;
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }
}
