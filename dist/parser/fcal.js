"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../interpreter/interpreter");
const token_1 = require("../lex/token");
const phrase_1 = require("../phrase");
class Fcal {
    constructor(source) {
        this.phrases = Fcal.getdefaultphrases();
        this.interpreter = new interpreter_1.Interpreter(source, this.phrases);
    }
    static getdefaultphrases() {
        const phrases = new phrase_1.Phrases();
        phrases.addPhrases(token_1.TokenType.PLUS, 'PLUS', 'AND', 'WITH', 'ADD');
        phrases.addPhrases(token_1.TokenType.MINUS, 'MINUS', 'SUBTRACT', 'WITHOUT');
        phrases.addPhrases(token_1.TokenType.TIMES, 'TIMES', 'MULTIPLIEDBY', 'mul');
        phrases.addPhrases(token_1.TokenType.SLASH, 'DIVIDE', 'DIVIDEBY');
        phrases.addPhrases(token_1.TokenType.CAP, 'POW');
        phrases.addPhrases(token_1.TokenType.MOD, 'mod');
        return phrases;
    }
    evaluate() {
        return this.interpreter.evaluateExpression();
    }
}
exports.Fcal = Fcal;
//# sourceMappingURL=fcal.js.map