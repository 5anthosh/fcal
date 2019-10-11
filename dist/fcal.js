"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultUnits_1 = require("./defaultUnits");
var interpreter_1 = require("./interpreter/interpreter");
var token_1 = require("./lex/token");
var phrase_1 = require("./types/phrase");
var Fcal = /** @class */ (function () {
    function Fcal(source) {
        this.phrases = Fcal.getdefaultphrases();
        this.ttypes = defaultUnits_1.getdefaultTTypes();
        this.interpreter = new interpreter_1.Interpreter(source, this.phrases, this.ttypes);
    }
    Fcal.getdefaultphrases = function () {
        var phrases = new phrase_1.Phrases();
        phrases.addPhrases(token_1.TokenType.PLUS, 'PLUS', 'AND', 'WITH', 'ADD');
        phrases.addPhrases(token_1.TokenType.MINUS, 'MINUS', 'SUBTRACT', 'WITHOUT');
        phrases.addPhrases(token_1.TokenType.TIMES, 'TIMES', 'x', 'MULTIPLIEDBY', 'mul');
        phrases.addPhrases(token_1.TokenType.SLASH, 'DIVIDE', 'DIVIDEBY');
        phrases.addPhrases(token_1.TokenType.CAP, 'POW');
        phrases.addPhrases(token_1.TokenType.MOD, 'mod');
        phrases.addPhrases(token_1.TokenType.OF, 'of');
        phrases.addPhrases(token_1.TokenType.IN, 'in');
        return phrases;
    };
    Fcal.prototype.evaluate = function () {
        return this.interpreter.evaluateExpression();
    };
    return Fcal;
}());
exports.Fcal = Fcal;
//# sourceMappingURL=fcal.js.map