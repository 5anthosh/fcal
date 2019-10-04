"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../lex/token");
const parser_1 = require("../parser/parser");
const datetype_1 = require("../types/datetype");
class Interpreter {
    constructor(source, phrases) {
        this.parser = new parser_1.Parser(source, phrases);
    }
    evaluateExpression() {
        this.ast = this.parser.parse();
        return this.evaluate(this.ast);
    }
    visitBinaryExpr(expr) {
        let left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case token_1.TokenType.PLUS:
                return left.Add(right);
            case token_1.TokenType.MINUS:
                return left.Sub(right);
            case token_1.TokenType.TIMES:
                return left.times(right);
            case token_1.TokenType.SLASH:
                return left.divide(right);
            case token_1.TokenType.MOD:
                if (right.isZero()) {
                    return new datetype_1.Type.BNumber('Infinity');
                }
                return left.modulo(right);
            case token_1.TokenType.CAP:
                if (left.isNegative()) {
                    if (!right.isInteger()) {
                        // safe play with complex numbers
                        // -2^0.25 will handled like -(2^0.25)
                        // may support complex numbers in future
                        return left
                            .negated()
                            .power(right)
                            .negated();
                    }
                }
                return left.power(right);
            case token_1.TokenType.OF:
                left = new datetype_1.Type.Percentage(left.number);
                const per = left;
                right.number = per.percentageValue(right.number);
                return right;
            default:
                return datetype_1.Type.BNumber.ZERO;
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
    visitPercentageExpr(expr) {
        const value = this.evaluate(expr.expression);
        if (value instanceof datetype_1.Type.Numberic) {
            return datetype_1.Type.Percentage.New(value.number);
        }
        throw new Error('Expecting numeric value in percentage');
    }
    evaluate(expr) {
        // console.log(expr.toString());
        const ast = expr.accept(this);
        return ast;
    }
}
exports.Interpreter = Interpreter;
function setCharAt(str, replace, start, end) {
    if (start > str.length - 1 && end > str.length - 1) {
        return str;
    }
    return str.substr(0, start) + replace + str.substr(end);
}
exports.setCharAt = setCharAt;
//# sourceMappingURL=interpreter.js.map