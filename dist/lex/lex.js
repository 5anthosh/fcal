"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datatype_1 = require("../types/datatype");
const char_1 = require("./char");
const lexError_1 = require("./lexError");
const token_1 = require("./token");
class Lexer {
    constructor(source, phrases) {
        this.source = source.replace(/[ \t]+$/, '');
        this.start = 0;
        this.current = 0;
        this.tokens = [];
        this.phrases = phrases;
    }
    static isDigit(char) {
        return char >= '0' && char <= '9';
    }
    static isAlpha(char) {
        return !Lexer.isDigit(char) && !this.isSpace(char) && char !== '\0' && char !== '\n';
    }
    static isSpace(char) {
        return char === '\t' || char === ' ';
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
            case char_1.Char.TIMES:
                return this.createToken(token_1.TokenType.TIMES);
            case char_1.Char.SLASH:
                return this.createToken(token_1.TokenType.SLASH);
            case char_1.Char.OPEN_PARAN:
                return this.createToken(token_1.TokenType.OPEN_PARAN);
            case char_1.Char.CLOSE_PARAN:
                return this.createToken(token_1.TokenType.CLOSE_PARAN);
            case char_1.Char.CAP:
                return this.createToken(token_1.TokenType.CAP);
            case char_1.Char.PERCENTAGE:
                return this.createToken(token_1.TokenType.PERCENTAGE);
            case char_1.Char.NEWLINE:
                return this.createToken(token_1.TokenType.NEWLINE);
            default:
                if (Lexer.isDigit(char)) {
                    return this.number();
                }
                return this.string();
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
    string() {
        while (Lexer.isAlpha(this.peek(0))) {
            this.advance();
        }
        const text = this.lexeme();
        let type;
        let ok;
        [type, ok] = this.phrases.search(text);
        if (ok) {
            return this.createToken(type);
        }
        throw new lexError_1.LexerError(`Unexpected Identifier ${text}`);
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
        return this.createTokenWithLiteral(token_1.TokenType.Number, new datatype_1.Type.BNumber(this.lexeme()));
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