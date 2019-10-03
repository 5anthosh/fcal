import { Token } from '../lex/token';
import { Type } from '../datetype';

export abstract class Expr {
  public depth: number;
  public start: number;
  public end: number;
  constructor(depth: number, start: number, end: number) {
    this.depth = depth;
    this.start = start;
    this.end = end;
  }
  public abstract toString();
  public abstract increaseDepth();
  public abstract accept<T>(visitor: Expr.IVisitor<T>): T;
}

// tslint:disable-next-line: no-namespace
export namespace Expr {
  export class Binary extends Expr {
    public left: Expr;
    public operator: Token;
    public right: Expr;
    constructor(depth: number, left: Expr, operator: Token, right: Expr, start: number, end: number) {
      super(depth, start, end);
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitBinaryExpr(this);
    }
    public increaseDepth() {
      this.depth += 1;
      this.left.increaseDepth();
      this.right.increaseDepth();
    }
    public toString(): string {
      return `+${'-'.repeat(this.depth)}(${this.depth})EXPR BINARY  ${this.operator} \n|\n${this.left}${this.right}`;
    }
  }

  export class Grouping extends Expr {
    public start: any;
    public end: any;
    public expression: Expr;
    constructor(depth: number, expression: Expr, start: number, end: number) {
      super(depth, start, end);
      this.expression = expression;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitGroupingExpr(this);
    }
    public increaseDepth() {
      this.depth += 1;
      this.expression.increaseDepth();
    }
    public toString(): string {
      return `+${'-'.repeat(this.depth)}(${this.depth})EXPR Grouping \n|\n${this.expression}`;
    }
  }

  export class Literal extends Expr {
    public start: any;
    public end: any;
    public value: Type;
    constructor(depth: number, value: Type, start: number, end: number) {
      super(depth, start, end);
      this.value = value;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitLiteralExpr(this);
    }
    public increaseDepth() {
      this.depth += 1;
    }
    public toString(): string {
      return `+${'-'.repeat(this.depth)}(${this.depth})EXPR LITERAL ${this.value.format()}\n|\n`;
    }
  }

  export class Percentage extends Expr {
    public start: any;
    public end: any;
    public expression: Expr;
    constructor(depth: number, expression: Expr, start: number, end: number) {
      super(depth, start, end);
      this.expression = expression;
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitPercentageExpr(this);
    }
    public increaseDepth() {
      this.depth += 1;
      this.expression.increaseDepth();
    }
    public toString(): string {
      return `+${'-'.repeat(this.depth)}(${this.depth})EXPR PERCENTAGE \n|\n${this.expression}`;
    }
  }

  export class Unary extends Expr {
    public start: any;
    public end: any;
    public operator: Token;
    public right: Expr;
    constructor(depth: number, operator: Token, right: Expr, start: number, end: number) {
      super(depth, start, end);
      this.operator = operator;
      this.right = right;
    }
    public increaseDepth() {
      this.depth += 1;
      this.right.increaseDepth();
    }
    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitUnaryExpr(this);
    }
    public toString(): string {
      return `+${'-'.repeat(this.depth)}(${this.depth})EXPR UNARY ${this.operator} \n|\n${this.right}`;
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
