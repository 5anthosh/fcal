import { converterFuncFmt } from '../evaluator/converter';
import { FcalError } from '../fcal';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';
import { UnitMeta } from '../types/units';
import { ASTPrinter } from './astPrinter';
import { Token } from './lex/token';

abstract class Expr {
  public start?: number;
  public end?: number;

  constructor(start?: number, end?: number) {
    this.start = start;
    this.end = end;
  }

  public toString(): string {
    const res = new ASTPrinter().print(this);
    return res.substring(0, res.length - 2);
  }

  public eval<T>(visitor: Expr.IVisitor<T>): T {
    try {
      return this.accept(visitor);
    } catch (e) {
      if (e instanceof FcalError) {
        if (e.start === undefined) {
          e.start = this.start;
        }
        if (e.end === undefined) {
          e.end = this.end;
        }
      }
      throw e;
    }
  }

  public abstract accept<T>(visitor: Expr.IVisitor<T>): T;
}

namespace Expr {
  export class Binary extends Expr {
    public left: Expr;
    public operator: Token;
    public right: Expr;

    constructor(left: Expr, operator: Token, right: Expr, start?: number, end?: number) {
      super(start, end);
      this.left = left;
      this.operator = operator;
      this.right = right;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitBinaryExpr(this);
    }
  }

  export class Ternary extends Expr {
    public main: Expr;
    public trueExpr: Expr;
    public falseExpr: Expr;

    constructor(main: Expr, trueExpr: Expr, falseExpr: Expr, start?: number, end?: number) {
      super(start, end);
      this.main = main;
      this.trueExpr = trueExpr;
      this.falseExpr = falseExpr;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitTernaryExpr(this);
    }
  }

  export class Logical extends Expr {
    public left: Expr;
    public operator: Token;
    public right: Expr;

    constructor(left: Expr, operator: Token, right: Expr, start?: number, end?: number) {
      super(start, end);
      this.left = left;
      this.operator = operator;
      this.right = right;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitLogicalExpr(this);
    }
  }

  export class Grouping extends Expr {
    public expression: Expr;

    constructor(expression: Expr, start?: number, end?: number) {
      super(start, end);
      this.expression = expression;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitGroupingExpr(this);
    }
  }

  export class Assign extends Expr {
    public name: string;
    public value: Expr;

    constructor(name: string, value: Expr, start?: number, end?: number) {
      super(start, end);
      this.name = name;
      this.value = value;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitAssignExpr(this);
    }
  }

  export class Variable extends Expr {
    public name: string;

    constructor(name: string, start?: number, end?: number) {
      super(start, end);
      this.name = name;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitVariableExpr(this);
    }
  }
  export class Call extends Expr {
    public name: string;
    public argument: Expr[];

    constructor(name: string, argument: Expr[], start?: number, end?: number) {
      super(start, end);
      this.name = name;
      this.argument = argument;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitCallExpr(this);
    }
  }

  export class Literal extends Expr {
    public value: Type;

    constructor(value: Type, start?: number, end?: number) {
      super(start, end);
      this.value = value;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitLiteralExpr(this);
    }
  }

  export class Percentage extends Expr {
    public expression: Expr;

    constructor(expression: Expr, start?: number, end?: number) {
      super(start, end);
      this.expression = expression;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitPercentageExpr(this);
    }
  }

  export class UnitExpr extends Expr {
    public phrase: string;
    public expression: Expr;
    public unit: UnitMeta;

    constructor(expression: Expr, phrase: string, unit: UnitMeta, start?: number, end?: number) {
      super(start, end);
      this.unit = unit;
      this.phrase = phrase;
      this.expression = expression;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitUnitExpr(this);
    }
  }
  export class ConversionExpr extends Expr {
    public expression: Expr;
    public to: UnitMeta | NumberSystem | converterFuncFmt;
    public name: string;

    constructor(
      expression: Expr,
      to: UnitMeta | NumberSystem | converterFuncFmt,
      name: string,
      start?: number,
      end?: number,
    ) {
      super(start, end);
      this.to = to;
      this.name = name;
      this.expression = expression;
    }

    public accept<T>(visitor: Expr.IVisitor<T>): T {
      return visitor.visitConversionExpr(this);
    }
  }
  export class Unary extends Expr {
    public operator: Token;
    public right: Expr;

    constructor(operator: Token, right: Expr, start?: number, end?: number) {
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
    visitUnitExpr(expr: Expr.UnitExpr): T;
    visitConversionExpr(expr: Expr.ConversionExpr): T;
    visitAssignExpr(expr: Expr.Assign): T;
    visitVariableExpr(expr: Expr.Variable): T;
    visitCallExpr(expr: Expr.Call): T;
    visitLogicalExpr(expr: Expr.Logical): T;
    visitTernaryExpr(expr: Expr.Ternary): T;
  }
}

export { Expr };
