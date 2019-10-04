"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ASTPrinter {
    constructor() {
        this.depth = 0;
    }
    static createPrefix(depth) {
        return `${this.prefixchar}${'-'.repeat(depth)} (${depth / 2})`;
    }
    visitBinaryExpr(expr) {
        this.depth += ASTPrinter.tab;
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth)}EXPR BINARY  ${expr.operator} \n|\n${left}${right}`;
    }
    visitGroupingExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth)}EXPR Grouping \n|\n${expression}`;
    }
    visitLiteralExpr(expr) {
        return `${ASTPrinter.createPrefix(this.depth)}EXPR LITERAL ${expr.value.format()}\n|\n`;
    }
    visitUnaryExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth)}EXPR UNARY ${expr.operator} \n|\n${expression}`;
    }
    visitPercentageExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth)}EXPR PERCENTAGE \n|\n${expression}`;
    }
    print(expr) {
        return this.evaluate(expr);
    }
    evaluate(expr) {
        const ast = expr.accept(this);
        return ast;
    }
}
exports.ASTPrinter = ASTPrinter;
ASTPrinter.tab = 3;
ASTPrinter.prefixchar = '+';
//# sourceMappingURL=astPrinter.js.map