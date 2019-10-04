import { Type } from '../datetype';
import { Token } from '../lex/token';
import { ASTPrinter } from './astPrinter';

export abstract class Expr extends ASTPrinter {
  public start: number;
  public end: number;
  constructor(start: number, end: number) {
    super();
    this.start = start;
    this.end = end;
  }
  public toString(): string {
    return this.print(this);
  }
  public abstract accept<T>(visitor: Expr.IVisitor<T>): T;
}

// tslint:disable-next-line: no-namespace
export namespace Expr {
  export class Binary extends Expr {
    public left: Expr;
    public operator: Token;
    public right: Expr;
    constructor(left: Expr, operator: Token, right: Expr, start: number, end: number) {
      super(start, end);
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitBinaryExpr(this);
    }
  }

  export class Grouping extends Expr {
    public start: any;
    public end: any;
    public expression: Expr;
    constructor(expression: Expr, start: number, end: number) {
      super(start, end);
      this.expression = expression;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitGroupingExpr(this);
    }
  }

  export class Literal extends Expr {
    public start: any;
    public end: any;
    public value: Type;
    constructor(value: Type, start: number, end: number) {
      super(start, end);
      this.value = value;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitLiteralExpr(this);
    }
  }

  export class Percentage extends Expr {
    public start: any;
    public end: any;
    public expression: Expr;
    constructor(expression: Expr, start: number, end: number) {
      super(start, end);
      this.expression = expression;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitPercentageExpr(this);
    }
  }

  export class Unary extends Expr {
    public start: any;
    public end: any;
    public operator: Token;
    public right: Expr;
    constructor(operator: Token, right: Expr, start: number, end: number) {
      super(start, end);
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
    visitPercentageExpr(expr: Expr.Percentage): T;
  }
}
