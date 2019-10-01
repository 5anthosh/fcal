"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lex_1 = require("./lex/lex");
const token_1 = require("./lex/token");
function parser() {
    const lexer = new lex_1.Lexer('0+234/343/11234.1234123$');
    while (true) {
        try {
            const token = lexer.Next();
            if (token.type === token_1.TokenType.EOL) {
                return;
            }
            console.log(token.toString());
        }
        catch (err) {
            console.log(err.message);
            return;
        }
    }
}
parser();
//# sourceMappingURL=main.js.map