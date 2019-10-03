"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../lex/token");
const parser_1 = require("../parser/parser");
const datetype_1 = require("../datetype");
class Interpreter {
    constructor(source, phrases) {
        this.source = source;
        this.parser = new parser_1.Parser(source, phrases);
    }
    evaluateExpression() {
        console.debug(this.parser.source);
        console.debug('=====================Parser debug starts=============');
        this.ast = this.parser.parse();
        console.log(this.ast.toString());
        console.debug('================Interpreter debug starts=============');
        const Type = this.evaluate(this.ast);
        console.debug('================Interpreter debug ends=============');
        return Type;
    }
    visitBinaryExpr(expr) {
        console.debug('VISITING BINARY LEFT');
        let left = this.evaluate(expr.left);
        console.debug('VISITING BINARY RIGHT');
        const right = this.evaluate(expr.right);
        console.log(`${token_1.PrintTT(expr.operator.type)} ${left.format()} ${right.format()}`);
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
        console.debug('VISITING GROUP');
        return this.evaluate(expr.expression);
    }
    visitLiteralExpr(expr) {
        return expr.value;
    }
    visitUnaryExpr(expr) {
        console.debug('VISITING UNARY');
        const right = this.evaluate(expr.right);
        if (expr.operator.type === token_1.TokenType.MINUS) {
            return right.negated();
        }
        return right;
    }
    visitPercentageExpr(expr) {
        console.debug('VISITING UNARY');
        const value = this.evaluate(expr.expression);
        if (value instanceof datetype_1.Type.Numberic) {
            return datetype_1.Type.Percentage.New(value.number);
        }
        throw new Error('Expecting numeric value in percentage');
    }
    evaluate(expr) {
        console.debug(expr.start, expr.end);
        console.debug(expr.toString());
        const ast = expr.accept(this);
        console.debug(`result ${ast.format()}`);
        console.log(setCharAt(this.source, ast.format(), expr.start, expr.end));
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
//# sourceMappingURL=interpreter.js.map