"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
var ASTPrinter = /** @class */ (function () {
    function ASTPrinter() {
        this.depth = 0;
    }
    ASTPrinter.createPrefix = function (depth, type) {
        return "" + this.prefixchar + '-'.repeat(depth * this.tab) + " (" + depth / this.tab + ")" + colors_1.default.blue(type);
    };
    ASTPrinter.prototype.visitUnitExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNIT') + " " + expr.unit.unitType + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitUnitConvertionExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNIT CONVERT') + " " + expr.unit.unitType + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitBinaryExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var left = this.evaluate(expr.left);
        var right = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'BINARY') + "  " + expr.operator + " \n|\n" + left + right;
    };
    ASTPrinter.prototype.visitGroupingExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'Grouping') + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitLiteralExpr = function (expr) {
        return ASTPrinter.createPrefix(this.depth, 'LITERAL') + " " + expr.value.format() + "\n|\n";
    };
    ASTPrinter.prototype.visitUnaryExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNARY') + " " + expr.operator + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitPercentageExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'PERCENTAGE') + " \n|\n" + expression;
    };
    ASTPrinter.prototype.print = function (expr) {
        return this.evaluate(expr);
    };
    ASTPrinter.prototype.evaluate = function (expr) {
        var ast = expr.accept(this);
        return ast;
    };
    ASTPrinter.tab = 2;
    ASTPrinter.prefixchar = '+';
    return ASTPrinter;
}());
exports.ASTPrinter = ASTPrinter;
//# sourceMappingURL=astPrinter.js.map