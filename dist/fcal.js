"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Big = require("decimal.js");
var interpreter_1 = require("./interpreter/interpreter");
var token_1 = require("./lex/token");
var phrase_1 = require("./types/phrase");
var units_1 = require("./types/units");
var Fcal = /** @class */ (function () {
    function Fcal(source) {
        this.phrases = Fcal.getdefaultphrases();
        this.ttypes = Fcal.getdefaultTTypes();
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
    Fcal.getdefaultTTypes = function () {
        var ttypes = new units_1.TType.TTypes();
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal(1), 'cm', 'cm'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal(0.01), 'm', 'm'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal(10), 'mm', 'mm'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal(0.00001), 'km', 'km'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal('0.39370078740157'), 'inch', 'inch'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal('0.032808398950131'), 'foot/feet', 'ft'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal('0.010936132983377'), 'yard', 'yd', 'yard'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal('0.0000062137119223733'), 'mile', 'mi'));
        ttypes.Add(new units_1.TType('DISTANCE', new Big.Decimal('0.0000053995680345572'), 'nautical mile (nmi)', 'nmi'));
        return ttypes;
    };
    Fcal.prototype.evaluate = function () {
        return this.interpreter.evaluateExpression();
    };
    return Fcal;
}());
exports.Fcal = Fcal;
//# sourceMappingURL=fcal.js.map