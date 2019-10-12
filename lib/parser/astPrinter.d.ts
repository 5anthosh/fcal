import { Expr } from './expr';
export declare class ASTPrinter implements Expr.IVisitor<string> {
    private static tab;
    private static prefixchar;
    private static createPrefix;
    private depth;
    constructor();
    visitUnitExpr(expr: Expr.UnitExpr): string;
    visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): string;
    visitBinaryExpr(expr: Expr.Binary): string;
    visitGroupingExpr(expr: Expr.Grouping): string;
    visitLiteralExpr(expr: Expr.Literal): string;
    visitUnaryExpr(expr: Expr.Unary): string;
    visitPercentageExpr(expr: Expr.Percentage): string;
    print(expr: Expr): string;
    private evaluate;
}
