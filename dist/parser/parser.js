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
        const expr = this.expressionStmt();
        return expr;
    }
    expressionStmt() {
        const expr = this.expression();
        this.consume(token_1.TokenType.NEWLINE, 'Expecting new Line ');
        return expr;
    }
    expression() {
        return this.percentage();
    }
    percentage() {
        let expr = this.addition();
        while (this.match(token_1.TokenType.OF)) {
            const operator = this.previous();
            const right = this.addition();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    }
    addition() {
        let expr = this.multiply();
        while (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.multiply();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    }
    multiply() {
        let expr = this.unary();
        while (this.match(token_1.TokenType.TIMES, token_1.TokenType.SLASH, token_1.TokenType.MOD, token_1.TokenType.OF)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    }
    unary() {
        if (this.match(token_1.TokenType.PLUS, token_1.TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new expr_1.Expr.Unary(operator, right, operator.start, right.end);
        }
        return this.exponent();
    }
    exponent() {
        let expr = this.percent();
        while (this.match(token_1.TokenType.CAP)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    }
    percent() {
        let expr = this.term();
        if (this.match(token_1.TokenType.PERCENTAGE)) {
            const operator = this.previous();
            expr = new expr_1.Expr.Percentage(expr, expr.start, operator.end);
        }
        return expr;
    }
    term() {
        if (this.match(token_1.TokenType.Number)) {
            return new expr_1.Expr.Literal(this.previous().Literal, this.previous().start, this.previous().end);
        }
        if (this.match(token_1.TokenType.OPEN_PARAN)) {
            const start = this.previous();
            const expr = this.expression();
            this.consume(token_1.TokenType.CLOSE_PARAN, "Expect ')' after expression");
            return new expr_1.Expr.Grouping(expr, start.start, this.previous().end);
        }
        throw new Error(`Expect expression but found ${this.peek().lexeme}`);
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