"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("big.js");
const token_1 = require("./token");
class Lexer {
    constructor(source) {
        this.source = source;
        this.start = 0;
        this.current = 0;
        this.tokens = [];
    }
    Next() {
        if (this.isAtEnd()) {
            return token_1.Token.EOLToken(this.current);
        }
        return this.scan();
    }
    scan() {
        let char = this.advance();
        switch (char) {
            case token_1.Char.PLUS:
                return this.createToken(token_1.TokenType.PLUS, token_1.Char.PLUS);
            case token_1.Char.MINUS:
                return this.createToken(token_1.TokenType.MINUS, token_1.Char.MINUS);
            case token_1.Char.STAR:
                return this.createToken(token_1.TokenType.STAR, token_1.Char.STAR);
            case token_1.Char.SLASH:
                return this.createToken(token_1.TokenType.SLASH, token_1.Char.SLASH);
            default:
                if (Lexer.isDigit(char)) {
                    return this.number();
                }
                throw new LexerError(`Unexpected character ${char}`);
        }
    }
    static isDigit(char) {
        return char >= '0' && char <= '9';
    }
    isAtEnd() {
        return this.current >= this.source.length;
    }
    advance() {
        this.current++;
        return this.source.charAt(this.current - 1);
    }
    peek(n) {
        if (this.current + n >= this.source.length)
            return '\0';
        return this.source.charAt(this.current + n);
    }
    // private match(expected: String): boolean {
    //   if (this.isAtEnd()) {
    //     return false;
    //   }
    //   if (this.source.charAt(this.current) != expected) {
    //     return false;
    //   }
    //   this.current++;
    //   return true;
    // }
    number() {
        while (Lexer.isDigit(this.peek(0))) {
            this.advance();
        }
        if (this.peek(0) == '.' && Lexer.isDigit(this.peek(1))) {
            this.advance();
            while (Lexer.isDigit(this.peek(0))) {
                this.advance();
            }
        }
        return this.createToken(token_1.TokenType.Number, new Big(this.lexeme()));
    }
    createToken(type, literal) {
        let token = new token_1.Token(type, this.lexeme(), literal, this.start, this.current);
        this.start = this.current;
        this.tokens.push(token);
        return token;
    }
    lexeme() {
        return this.source.substring(this.start, this.current);
    }
}
exports.Lexer = Lexer;
class LexerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LexerParingrror';
    }
}
exports.LexerError = LexerError;
//# sourceMappingURL=lex.js.map