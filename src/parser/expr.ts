import { Token } from '../lex/token';

export abstract class Expr {
  public abstract accept<T>(visitor: Expr.IVisitor<T>): T;
}

// tslint:disable-next-line: no-namespace
export namespace Expr {
  export class Binary extends Expr {
    public left: Expr;
    public operator: Token;
    public right: Expr;
    constructor(left: Expr, operator: Token, right: Expr) {
      super();
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitBinaryExpr(this);
    }
  }

  export class Grouping extends Expr {
    public expression: Expr;
    constructor(expression: Expr) {
      super();
      this.expression = expression;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitGroupingExpr(this);
    }
  }

  export class Literal extends Expr {
    public value: any;
    constructor(value: any) {
      super();
      this.value = value;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitLiteralExpr(this);
    }
  }
  export class Unary extends Expr {
    public operator: Token;
    public right: Expr;
    constructor(operator: Token, right: Expr) {
      super();
      this.operator = operator;
      this.right = right;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitUnaryExpr(this);
    }
  }

  export interface IVisitor<T> {
    visitBinaryExpr(expr: Expr.Binary): T;
    visitGroupingExpr(expr: Expr.Grouping): T;
    visitLiteralExpr(expr: Expr.Literal): T;
    visitUnaryExpr(expr: Expr.Unary): T;
  }
}
