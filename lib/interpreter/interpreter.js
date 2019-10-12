"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../lex/token");
var parser_1 = require("../parser/parser");
var datatype_1 = require("../types/datatype");
var Interpreter = /** @class */ (function () {
    function Interpreter(source, phrases, ttypes, environment, functions) {
        this.parser = new parser_1.Parser(source, phrases, ttypes);
        this.environment = environment;
        this.funcations = functions;
    }
    Interpreter.prototype.visitCallExpr = function (expr) {
        var _a;
        var name = expr.name;
        var call;
        var ok;
        _a = this.funcations.get(name), call = _a[0], ok = _a[1];
        if (ok) {
            if (call.arbity !== -1) {
                if (call.arbity !== expr.argument.length) {
                    throw new Error("Expected " + call.arbity + " but got " + expr.argument.length);
                }
            }
            var argument = Array();
            for (var _i = 0, _b = expr.argument; _i < _b.length; _i++) {
                var param = _b[_i];
                argument.push(this.evaluate(param));
            }
            return call.call.apply(call, __spreadArrays([this.environment], argument));
        }
        throw Error(name + " is not callable");
    };
    Interpreter.prototype.visitAssignExpr = function (expr) {
        var value = this.evaluate(expr.value);
        this.environment.set(expr.name, value);
        return value;
    };
    Interpreter.prototype.visitVariableExpr = function (expr) {
        return this.environment.get(expr.name);
    };
    Interpreter.prototype.evaluateExpression = function () {
        this.ast = this.parser.parse();
        // console.log(this.ast.toString());
        return this.evaluate(this.ast);
    };
    Interpreter.prototype.visitUnitConvertionExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.Units.convertToUnit(value, expr.unit);
        }
        throw new Error('Expecting numeric value before in');
    };
    Interpreter.prototype.visitUnitExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.Units.New(value.number, expr.unit);
        }
        throw new Error('Expecting numeric value before unit');
    };
    Interpreter.prototype.visitBinaryExpr = function (expr) {
        var left = this.evaluate(expr.left);
        var right = this.evaluate(expr.right);
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
                    return new datatype_1.Type.BNumber('Infinity');
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
                left = new datatype_1.Type.Percentage(left.number);
                var per = left;
                right.number = per.percentageValue(right.number);
                return right;
            default:
                return datatype_1.Type.BNumber.ZERO;
        }
    };
    Interpreter.prototype.visitGroupingExpr = function (expr) {
        return this.evaluate(expr.expression);
    };
    Interpreter.prototype.visitLiteralExpr = function (expr) {
        return expr.value;
    };
    Interpreter.prototype.visitUnaryExpr = function (expr) {
        var right = this.evaluate(expr.right);
        if (expr.operator.type === token_1.TokenType.MINUS) {
            return right.negated();
        }
        return right;
    };
    Interpreter.prototype.visitPercentageExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.Percentage.New(value.number);
        }
        throw new Error('Expecting numeric value in percentage');
    };
    Interpreter.prototype.evaluate = function (expr) {
        // console.log(expr.toString());
        var ast = expr.accept(this);
        // console.log(ast.format());
        return ast;
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
function setCharAt(str, replace, start, end) {
    if (start > str.length - 1 && end > str.length - 1) {
        return str;
    }
    return str.substr(0, start) + replace + str.substr(end);
}
exports.setCharAt = setCharAt;
//# sourceMappingURL=interpreter.js.map