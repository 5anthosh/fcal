"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("decimal.js");
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
        // console.log(`${PrintTT(expr.operator.type)} ${left} ${right}`);
        switch (expr.operator.type) {
            case token_1.TokenType.PLUS:
                return left.plus(right);
            case token_1.TokenType.MINUS:
                return left.minus(right);
            case token_1.TokenType.TIMES:
                return left.mul(right);
            case token_1.TokenType.SLASH:
                return left.div(right);
            case token_1.TokenType.CAP:
                if (left.isNegative()) {
                    if (!right.isInteger()) {
                        // safe play with complex numbers
                        // -2^0.25 will handled like -(2^0.25)
                        // may support complex numbers in future
                        return left
                            .negated()
                            .pow(right)
                            .negated();
                    }
                }
                return left.pow(right);
            default:
                return new Big.Decimal(0);
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
        if (expr.operator.type === token_1.TokenType.MINUS) {
            return right.negated();
        }
        return right;
    }
    evaluate(expr) {
        return expr.accept(this);
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map