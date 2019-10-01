"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../type");
const char_1 = require("./char");
const lexError_1 = require("./lexError");
const token_1 = require("./token");
class Lexer {
    constructor(source) {
        this.source = source;
        this.start = 0;
        this.current = 0;
        this.tokens = [];
    }
    static isDigit(char) {
        return char >= '0' && char <= '9';
    }
    static isSpace(char) {
        return char === '\n' || char === ' ';
    }
    Next() {
        if (this.isAtEnd()) {
            return token_1.Token.EOLToken(this.current);
        }
        return this.scan();
    }
    scan() {
        const char = this.space();
        switch (char) {
            case char_1.Char.PLUS:
                return this.createToken(token_1.TokenType.PLUS);
            case char_1.Char.MINUS:
                return this.createToken(token_1.TokenType.MINUS);
            case char_1.Char.STAR:
                return this.createToken(token_1.TokenType.STAR);
            case char_1.Char.SLASH:
                return this.createToken(token_1.TokenType.SLASH);
            case char_1.Char.OPEN_PARAN:
                return this.createToken(token_1.TokenType.OPEN_PARAN);
            case char_1.Char.CLOSE_PARAN:
                return this.createToken(token_1.TokenType.CLOSE_PARAN);
            default:
                if (Lexer.isDigit(char)) {
                    return this.number();
                }
                throw new lexError_1.LexerError(`Unexpected character ${char}`);
        }
    }
    isAtEnd() {
        return this.current >= this.source.length;
    }
    advance() {
        this.current++;
        return this.source.charAt(this.current - 1);
    }
    peek(n) {
        if (this.current + n >= this.source.length) {
            return '\0';
        }
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
        if (this.peek(0) === '.' && Lexer.isDigit(this.peek(1))) {
            this.advance();
            while (Lexer.isDigit(this.peek(0))) {
                this.advance();
            }
        }
        return this.createTokenWithLiteral(token_1.TokenType.Number, type_1.Type.Number(this.lexeme()));
    }
    createToken(type) {
        return this.createTokenWithLiteral(type, null);
    }
    createTokenWithLiteral(type, literal) {
        const token = new token_1.Token(type, this.lexeme(), literal, this.start, this.current);
        this.start = this.current;
        this.tokens.push(token);
        return token;
    }
    lexeme() {
        return this.source.substring(this.start, this.current);
    }
    space() {
        let char = this.advance();
        while (Lexer.isSpace(char)) {
            this.start = this.current;
            char = this.advance();
        }
        return char;
    }
}
exports.Lexer = Lexer;
//# sourceMappingURL=lex.js.map