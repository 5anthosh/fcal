import { Token } from '../lex/token';
import { Type } from '../types/datatype';
import { Unit } from '../types/units';
import { ASTPrinter } from './astPrinter';
export declare abstract class Expr extends ASTPrinter {
    start: number;
    end: number;
    constructor(start: number, end: number);
    toString(): string;
    abstract accept<T>(visitor: Expr.IVisitor<T>): T;
}
export declare namespace Expr {
    class Binary extends Expr {
        left: Expr;
        operator: Token;
        right: Expr;
        constructor(left: Expr, operator: Token, right: Expr, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class Grouping extends Expr {
        start: any;
        end: any;
        expression: Expr;
        constructor(expression: Expr, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class Literal extends Expr {
        start: any;
        end: any;
        value: Type;
        constructor(value: Type, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class Percentage extends Expr {
        start: any;
        end: any;
        expression: Expr;
        constructor(expression: Expr, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class UnitExpr extends Expr {
        start: any;
        end: any;
        expression: Expr;
        unit: Unit;
        constructor(expression: Expr, unit: Unit, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class UnitConvertionExpr extends Expr {
        start: any;
        end: any;
        expression: Expr;
        unit: Unit;
        constructor(expression: Expr, unit: Unit, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    class Unary extends Expr {
        start: any;
        end: any;
        operator: Token;
        right: Expr;
        constructor(operator: Token, right: Expr, start: number, end: number);
        accept<T>(visitor: Expr.IVisitor<T>): T;
    }
    interface IVisitor<T> {
        visitBinaryExpr(expr: Expr.Binary): T;
        visitGroupingExpr(expr: Expr.Grouping): T;
        visitLiteralExpr(expr: Expr.Literal): T;
        visitUnaryExpr(expr: Expr.Unary): T;
        visitPercentageExpr(expr: Expr.Percentage): T;
        visitUnitExpr(expr: Expr.UnitExpr): T;
        visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): T;
    }
}
