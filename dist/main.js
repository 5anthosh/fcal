"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lex_1 = require("./lex/lex");
const fcal_1 = require("./parser/fcal");
const type_1 = require("./type");
function main() {
    const value = new fcal_1.Fcal('2*2*2').evaluate();
    // tslint:disable-next-line:no-console
    console.log(value.toString());
    console.log(type_1.Type.Number('-4')
        .negated()
        .mod(type_1.Type.Number('0.23')));
    const lex = new lex_1.Lexer('23 add 23 + 3 pow 2', fcal_1.Fcal.getdefaultphrases());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
    console.log(lex.Next().toString());
}
main();
//# sourceMappingURL=main.js.map