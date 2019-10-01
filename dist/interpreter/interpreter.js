"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("bignumber.js");
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
                // console.log(`ADD ${left} ${right}`);
                return left.plus(right);
            case token_1.TokenType.MINUS:
                // console.log(`MINUX ${left} ${right}`);
                return left.minus(right);
            case token_1.TokenType.TIMES:
                // console.log(`times ${left} ${right}`);
                return left.multipliedBy(right);
            case token_1.TokenType.SLASH:
                // console.log(`SLASH ${left} ${right}`);
                if (right.eq(0)) {
                    return Infinity;
                }
                return left.div(right);
            default:
                return new Big.BigNumber(0);
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