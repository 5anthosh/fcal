"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../lex/token");
const parser_1 = require("../parser/parser");
class Interpreter {
    constructor(source) {
        this.parser = new parser_1.Parser(source);
    }
    evaluateExpression() {
        const expr = this.parser.parse();
        return this.evaluate(expr);
    }
    visitBinaryExpr(expr) {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case token_1.TokenType.PLUS:
                return left.add(right);
            case token_1.TokenType.MINUS:
                return left.add(right);
            case token_1.TokenType.STAR:
                return left.mul(right);
            case token_1.TokenType.SLASH:
                return left.div(right);
            default:
                return null;
        }
    }
    visitGroupingExpr(expr) {
        return this.evaluate(expr.expression);
    }
    visitLiteralExpr(expr) {
        return expr.value;
    }
    visitUnaryExpr(expr) {
        const right = this.evaluate(expr.right);
        if (expr.operator.type === token_1.TokenType.PLUS) {
            return right.mul(-1);
        }
        return right;
    }
    evaluate(expr) {
        return expr.accept(this);
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map