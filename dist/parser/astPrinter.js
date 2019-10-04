"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class ASTPrinter {
    constructor() {
        this.depth = 0;
    }
    static createPrefix(depth, type) {
        return `${this.prefixchar}${'-'.repeat(depth * this.tab)} (${depth / this.tab})${colors_1.default.blue(type)}`;
    }
    visitBinaryExpr(expr) {
        this.depth += ASTPrinter.tab;
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth, 'BINARY')}  ${expr.operator} \n|\n${left}${right}`;
    }
    visitGroupingExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth, 'Grouping')} \n|\n${expression}`;
    }
    visitLiteralExpr(expr) {
        return `${ASTPrinter.createPrefix(this.depth, 'LITERAL')} ${expr.value.format()}\n|\n`;
    }
    visitUnaryExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth, 'UNARY')} ${expr.operator} \n|\n${expression}`;
    }
    visitPercentageExpr(expr) {
        this.depth += ASTPrinter.tab;
        const expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return `${ASTPrinter.createPrefix(this.depth, 'PERCENTAGE')} \n|\n${expression}`;
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
ASTPrinter.tab = 2;
ASTPrinter.prefixchar = '+';
//# sourceMappingURL=astPrinter.js.map