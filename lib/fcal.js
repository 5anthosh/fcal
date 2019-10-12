"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultUnits_1 = require("./defaultUnits");
var environment_1 = require("./environment");
var interpreter_1 = require("./interpreter/interpreter");
var token_1 = require("./lex/token");
var phrase_1 = require("./types/phrase");
var datatype_1 = require("./types/datatype");
var Fcal = /** @class */ (function () {
    function Fcal() {
        this.phrases = Fcal.getdefaultphrases();
        this.ttypes = defaultUnits_1.getdefaultTTypes();
        this.environment = new environment_1.Environment();
        this.defaultValues();
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
    Fcal.prototype.evaluate = function (source) {
        return new interpreter_1.Interpreter(source, this.phrases, this.ttypes, this.environment).evaluateExpression();
    };
    Fcal.prototype.setValues = function (values) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                var element = values[key];
                this.environment.set(key, element);
            }
        }
    };
    Fcal.prototype.defaultValues = function () {
        this.setValues({ PI: datatype_1.Type.BNumber.New('3.141592653589793238462643383279502884197169399375105') });
    };
    return Fcal;
}());
exports.Fcal = Fcal;
//# sourceMappingURL=fcal.js.map