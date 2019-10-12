"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Phrase = /** @class */ (function () {
    function Phrase(type) {
        var phrases = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            phrases[_i - 1] = arguments[_i];
        }
        this.type = type;
        this.phrases = phrases;
    }
    Phrase.prototype.add = function () {
        var _a;
        var phrases = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            phrases[_i] = arguments[_i];
        }
        for (var _b = 0, phrases_1 = phrases; _b < phrases_1.length; _b++) {
            var phrase = phrases_1[_b];
            if (this.check(phrase)) {
                throw new Error(phrase + " already exists");
            }
        }
        (_a = this.phrases).push.apply(_a, phrases);
    };
    Phrase.prototype.check = function () {
        var phrase = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            phrase[_i] = arguments[_i];
        }
        for (var _a = 0, _b = this.phrases; _a < _b.length; _a++) {
            var phrase1 = _b[_a];
            for (var _c = 0, phrase_1 = phrase; _c < phrase_1.length; _c++) {
                var phrase2 = phrase_1[_c];
                if (phrase2 === phrase1) {
                    return true;
                }
            }
        }
        return false;
    };
    return Phrase;
}());
exports.Phrase = Phrase;
var Phrases = /** @class */ (function () {
    function Phrases() {
        this.phrases = [];
    }
    Phrases.prototype.add = function () {
        var _a;
        var phrases = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            phrases[_i] = arguments[_i];
        }
        (_a = this.phrases).push.apply(_a, phrases);
    };
    Phrases.prototype.getPhrases = function (key) {
        for (var _i = 0, _a = this.phrases; _i < _a.length; _i++) {
            var phrase = _a[_i];
            if (phrase.type === key) {
                return [phrase.phrases, true];
            }
        }
        return [[], false];
    };
    Phrases.prototype.search = function (key) {
        key = key.toUpperCase();
        for (var _i = 0, _a = this.phrases; _i < _a.length; _i++) {
            var phrase = _a[_i];
            if (phrase.phrases.find(function (x) { return x === key; })) {
                return [phrase.type, true];
            }
        }
        return [0, false];
    };
    Phrases.prototype.addPhrases = function (type) {
        var _a;
        var phrases = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            phrases[_i - 1] = arguments[_i];
        }
        phrases = phrases.map(function (x) { return x.toUpperCase(); });
        if (this.checkPhrase.apply(this, phrases)) {
            throw new Error("phrases already exits");
        }
        for (var _b = 0, _c = this.phrases; _b < _c.length; _b++) {
            var phrase = _c[_b];
            if (phrase.type === type) {
                (_a = phrase.phrases).push.apply(_a, phrases);
            }
        }
        this.add(new (Phrase.bind.apply(Phrase, __spreadArrays([void 0, type], phrases)))());
    };
    Phrases.prototype.checkPhrase = function () {
        var phrase = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            phrase[_i] = arguments[_i];
        }
        for (var _a = 0, _b = this.phrases; _a < _b.length; _a++) {
            var phrase1 = _b[_a];
            if (phrase1.check.apply(phrase1, phrase)) {
                return true;
            }
        }
        return false;
    };
    return Phrases;
}());
exports.Phrases = Phrases;
//# sourceMappingURL=phrase.js.map