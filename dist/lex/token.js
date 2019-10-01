"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType[TokenType["PLUS"] = 0] = "PLUS";
    TokenType[TokenType["MINUS"] = 1] = "MINUS";
    TokenType[TokenType["STAR"] = 2] = "STAR";
    TokenType[TokenType["MOD"] = 3] = "MOD";
    TokenType[TokenType["SLASH"] = 4] = "SLASH";
    TokenType[TokenType["Number"] = 5] = "Number";
    TokenType[TokenType["EOL"] = 6] = "EOL";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
function PrintTT(enumNumber) {
    return TokenType[enumNumber];
}
class Char {
}
exports.Char = Char;
Char.PLUS = "+";
Char.MINUS = "-";
Char.STAR = "*";
Char.MOD = "mod";
Char.SLASH = "/";
class Token {
    constructor(type, lexeme, literal, start, end) {
        this.type = type;
        this.lexeme = lexeme;
        this.start = start;
        this.end = end;
        this.Literal = literal;
    }
    toString() {
        return `< ${PrintTT(this.type)} ${this.lexeme} ${this.Literal} (${this.start}, ${this.end})>`;
    }
    static EOLToken(end) {
        return new Token(TokenType.EOL, "", null, end, end);
    }
}
exports.Token = Token;
// export default { TokenType, Token };
//# sourceMappingURL=token.js.map