"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["PLUS"] = 0] = "PLUS";
    TokenType[TokenType["MINUS"] = 1] = "MINUS";
    TokenType[TokenType["TIMES"] = 2] = "TIMES";
    TokenType[TokenType["MOD"] = 3] = "MOD";
    TokenType[TokenType["SLASH"] = 4] = "SLASH";
    TokenType[TokenType["Number"] = 5] = "Number";
    TokenType[TokenType["OPEN_PARAN"] = 6] = "OPEN_PARAN";
    TokenType[TokenType["CLOSE_PARAN"] = 7] = "CLOSE_PARAN";
    TokenType[TokenType["NEWLINE"] = 8] = "NEWLINE";
    TokenType[TokenType["EOL"] = 9] = "EOL";
    TokenType[TokenType["PERCENTAGE"] = 10] = "PERCENTAGE";
    TokenType[TokenType["OF"] = 11] = "OF";
    TokenType[TokenType["CAP"] = 12] = "CAP";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
function PrintTT(enumNumber) {
    return TokenType[enumNumber];
}
exports.PrintTT = PrintTT;
class Token {
    constructor(type, lexeme, literal, start, end) {
        this.type = type;
        this.lexeme = lexeme;
        this.start = start;
        this.end = end;
        this.Literal = literal;
    }
    static EOLToken(end) {
        return new Token(TokenType.EOL, '', null, end, end);
    }
    toString() {
        let literal = '';
        if (this.Literal !== null) {
            literal = this.Literal.format();
        }
        return colors_1.default.cyan(`< ${PrintTT(this.type)} ${this.lexeme} ${literal} (${this.start}, ${this.end})>`);
    }
}
exports.Token = Token;
// export default { TokenType, Token };
//# sourceMappingURL=token.js.map