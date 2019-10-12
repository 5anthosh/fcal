import { Expr } from '../parser/expr';
import { Type } from '../types/datatype';
import { Phrases } from '../types/phrase';
import { TType } from '../types/units';
export declare class Interpreter implements Expr.IVisitor<any> {
    private parser;
    private ast;
    constructor(source: string, phrases: Phrases, ttypes: TType.TTypes);
    evaluateExpression(): Type;
    visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): Type;
    visitUnitExpr(expr: Expr.UnitExpr): Type.Units;
    visitBinaryExpr(expr: Expr.Binary): Type.BNumber;
    visitGroupingExpr(expr: Expr.Grouping): Type;
    visitLiteralExpr(expr: Expr.Literal): Type;
    visitUnaryExpr(expr: Expr.Unary): Type.BNumber;
    visitPercentageExpr(expr: Expr.Percentage): Type;
    private evaluate;
}
export declare function setCharAt(str: string, replace: string, start: number, end: number): string;
