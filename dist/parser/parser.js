"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lex_1 = require("../lex/lex");
const token_1 = require("../lex/token");
const expr_1 = require("./expr");
class Parser {
    constructor(source, phrases) {
        this.source = source;
        this.lexer = new lex_1.Lexer(this.source, phrases);
        this.ntoken = 0;
        this.tokens = [];
    }
    parse() {
        return this.expression();
    }
    expression() {
        return this.addition();
    }
    addition() {
        let expr = this.multiply();
        while (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.multiply();
            expr = new expr_1.Expr.Binary(expr, operator, right);
        }
        return expr;
    }
    multiply() {
        let expr = this.unary();
        while (this.match(token_1.TokenType.TIMES, token_1.TokenType.SLASH, token_1.TokenType.MOD)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right);
        }
        return expr;
    }
    unary() {
        if (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new expr_1.Expr.Unary(operator, right);
        }
        return this.exponent();
    }
    exponent() {
        let expr = this.term();
        while (this.match(token_1.TokenType.CAP)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right);
        }
        return expr;
    }
    term() {
        if (this.match(token_1.TokenType.Number)) {
            return new expr_1.Expr.Literal(this.previous().Literal);
        }
        if (this.match(token_1.TokenType.OPEN_PARAN)) {
            const expr = this.expression();
            this.consume(token_1.TokenType.CLOSE_PARAN, "Expect ')' after expression");
            return new expr_1.Expr.Grouping(expr);
        }
        throw new Error('Expect expression');
    }
    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.incr();
                return true;
            }
        }
        return false;
    }
    consume(type, message) {
        if (this.check(type)) {
            this.incr();
            return;
        }
        throw new Error(message);
    }
    check(type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type === type;
    }
    isAtEnd() {
        const token = this.nextToken();
        return token.type === token_1.TokenType.EOL;
    }
    nextToken() {
        if (this.ntoken < this.tokens.length) {
            return this.tokens[this.ntoken];
        }
        return this.getToken();
    }
    getToken() {
        const token = this.lexer.Next();
        if (token.type !== token_1.TokenType.EOL) {
            this.tokens.push(token);
        }
        return token;
    }
    previous() {
        return this.tokens[this.ntoken - 1];
    }
    peek() {
        return this.nextToken();
    }
    incr() {
        this.ntoken++;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map