"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datatype_1 = require("../types/datatype");
var char_1 = require("./char");
var lexError_1 = require("./lexError");
var token_1 = require("./token");
var Lexer = /** @class */ (function () {
    function Lexer(source, phrases) {
        this.source = source.replace(/[ \t]+$/, '');
        this.start = 0;
        this.current = 0;
        this.tokens = [];
        this.phrases = phrases;
    }
    Lexer.isDigit = function (char) {
        return char >= '0' && char <= '9';
    };
    Lexer.isAlpha = function (char) {
        return !Lexer.isDigit(char) && !this.isSpace(char) && char !== '\0' && char !== '\n';
    };
    Lexer.isSpace = function (char) {
        return char === '\t' || char === ' ';
    };
    Lexer.prototype.Next = function () {
        if (this.isAtEnd()) {
            return token_1.Token.EOLToken(this.current);
        }
        return this.scan();
    };
    Lexer.prototype.scan = function () {
        var char = this.space();
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
    };
    Lexer.prototype.isAtEnd = function () {
        return this.current >= this.source.length;
    };
    Lexer.prototype.advance = function () {
        this.current++;
        return this.source.charAt(this.current - 1);
    };
    Lexer.prototype.peek = function (n) {
        if (this.current + n >= this.source.length) {
            return '\0';
        }
        return this.source.charAt(this.current + n);
    };
    Lexer.prototype.string = function () {
        var _a;
        while (Lexer.isAlpha(this.peek(0))) {
            this.advance();
        }
        var text = this.lexeme();
        var type;
        var ok;
        _a = this.phrases.search(text), type = _a[0], ok = _a[1];
        if (ok) {
            return this.createToken(type);
        }
        throw new lexError_1.LexerError("Unexpected Identifier " + text);
    };
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
    Lexer.prototype.number = function () {
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
    };
    Lexer.prototype.createToken = function (type) {
        return this.createTokenWithLiteral(type, null);
    };
    Lexer.prototype.createTokenWithLiteral = function (type, literal) {
        var token = new token_1.Token(type, this.lexeme(), literal, this.start, this.current);
        this.start = this.current;
        this.tokens.push(token);
        return token;
    };
    Lexer.prototype.lexeme = function () {
        return this.source.substring(this.start, this.current);
    };
    Lexer.prototype.space = function () {
        var char = this.advance();
        while (Lexer.isSpace(char)) {
            this.start = this.current;
            char = this.advance();
        }
        return char;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lex.js.map