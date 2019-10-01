import Big = require('bignumber.js');

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
    const left = this.evaluate(expr.left) as Big.BigNumber;
    const right = this.evaluate(expr.right) as Big.BigNumber;
    switch (expr.operator.type) {
      case TokenType.PLUS:
        // console.log(`ADD ${left} ${right}`);
        return left.plus(right);
      case TokenType.MINUS:
        // console.log(`MINUX ${left} ${right}`);
        return left.minus(right);
      case TokenType.TIMES:
        // console.log(`times ${left} ${right}`);
        return left.multipliedBy(right);
      case TokenType.SLASH:
        // console.log(`SLASH ${left} ${right}`);
        if (right.eq(0)) {
          return Infinity;
        }
        return left.div(right);
      default:
        return new Big.BigNumber(0);
    }
  }

  public visitGroupingExpr(expr: Expr.Grouping): any {
    return this.evaluate(expr.expression);
  }

  public visitLiteralExpr(expr: Expr.Literal): any {
    return expr.value;
  }

  public visitUnaryExpr(expr: Expr.Unary): any {
    const right = this.evaluate(expr.right) as Big.BigNumber;
    if (expr.operator.type === TokenType.MINUS) {
      return right.negated();
    }
    return right;
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }
}
