"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lex_1 = require("../lex/lex");
var token_1 = require("../lex/token");
var expr_1 = require("./expr");
var Parser = /** @class */ (function () {
    function Parser(source, phrases) {
        this.source = source;
        this.lexer = new lex_1.Lexer(this.source, phrases);
        this.ntoken = 0;
        this.tokens = [];
    }
    Parser.prototype.parse = function () {
        var expr = this.expressionStmt();
        return expr;
    };
    Parser.prototype.expressionStmt = function () {
        var expr = this.expression();
        this.consume(token_1.TokenType.NEWLINE, 'Expecting new Line');
        return expr;
    };
    Parser.prototype.expression = function () {
        return this.percentage();
    };
    Parser.prototype.percentage = function () {
        var expr = this.addition();
        while (this.match(token_1.TokenType.OF)) {
            var operator = this.previous();
            var right = this.addition();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.addition = function () {
        var expr = this.multiply();
        while (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            var operator = this.previous();
            var right = this.multiply();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.multiply = function () {
        var expr = this.unary();
        while (this.match(token_1.TokenType.TIMES, token_1.TokenType.SLASH, token_1.TokenType.MOD, token_1.TokenType.OF)) {
            var operator = this.previous();
            var right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.unary = function () {
        if (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            var operator = this.previous();
            var right = this.unary();
            return new expr_1.Expr.Unary(operator, right, operator.start, right.end);
        }
        return this.exponent();
    };
    Parser.prototype.exponent = function () {
        var expr = this.percent();
        while (this.match(token_1.TokenType.CAP)) {
            var operator = this.previous();
            var right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.percent = function () {
        var expr = this.term();
        if (this.match(token_1.TokenType.PERCENTAGE)) {
            var operator = this.previous();
            expr = new expr_1.Expr.Percentage(expr, expr.start, operator.end);
        }
        return expr;
    };
    Parser.prototype.term = function () {
        if (this.match(token_1.TokenType.Number)) {
            return new expr_1.Expr.Literal(this.previous().Literal, this.previous().start, this.previous().end);
        }
        if (this.match(token_1.TokenType.OPEN_PARAN)) {
            var start = this.previous();
            var expr = this.expression();
            this.consume(token_1.TokenType.CLOSE_PARAN, "Expect ')' after expression");
            return new expr_1.Expr.Grouping(expr, start.start, this.previous().end);
        }
        throw new Error("Expect expression but found " + this.peek().lexeme);
    };
    Parser.prototype.match = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
            var type = types_1[_a];
            if (this.check(type)) {
                this.incr();
                return true;
            }
        }
        return false;
    };
    Parser.prototype.consume = function (type, message) {
        if (this.check(type)) {
            this.incr();
            return;
        }
        throw new Error(message);
    };
    Parser.prototype.check = function (type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type === type;
    };
    Parser.prototype.isAtEnd = function () {
        var token = this.nextToken();
        return token.type === token_1.TokenType.EOL;
    };
    Parser.prototype.nextToken = function () {
        if (this.ntoken < this.tokens.length) {
            return this.tokens[this.ntoken];
        }
        return this.getToken();
    };
    Parser.prototype.getToken = function () {
        var token = this.lexer.Next();
        if (token.type !== token_1.TokenType.EOL) {
            this.tokens.push(token);
        }
        return token;
    };
    Parser.prototype.previous = function () {
        return this.tokens[this.ntoken - 1];
    };
    Parser.prototype.peek = function () {
        return this.nextToken();
    };
    Parser.prototype.incr = function () {
        this.ntoken++;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map