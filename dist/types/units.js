"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Unit = /** @class */ (function () {
    function Unit(id, ratio, unitType) {
        this.id = id;
        this.ratio = ratio;
        this.unitType = unitType;
    }
    return Unit;
}());
exports.Unit = Unit;
var TType = /** @class */ (function () {
    function TType(id, ratio, unitType) {
        var phrases = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            phrases[_i - 3] = arguments[_i];
        }
        this.unit = new Unit(id, ratio, unitType);
        this.phrases = phrases;
    }
    return TType;
}());
exports.TType = TType;
// tslint:disable-next-line:no-namespace
(function (TType) {
    /**
     * Represents various Term types
     */
    var TTypes = /** @class */ (function () {
        function TTypes() {
            this.ttypes = [];
        }
        TTypes.prototype.Add = function (ttype) {
            if (this.check.apply(this, ttype.phrases)) {
                throw new Error('phrase already exits');
            }
            this.ttypes.push(ttype);
        };
        TTypes.prototype.check = function () {
            var phrases = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                phrases[_i] = arguments[_i];
            }
            for (var _a = 0, _b = this.ttypes; _a < _b.length; _a++) {
                var ttype = _b[_a];
                for (var _c = 0, _d = ttype.phrases; _c < _d.length; _c++) {
                    var phrase = _d[_c];
                    for (var _e = 0, phrases_1 = phrases; _e < phrases_1.length; _e++) {
                        var phrase2 = phrases_1[_e];
                        if (phrase === phrase2) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        TTypes.prototype.get = function (phrase) {
            for (var _i = 0, _a = this.ttypes; _i < _a.length; _i++) {
                var ttype = _a[_i];
                for (var _b = 0, _c = ttype.phrases; _b < _c.length; _b++) {
                    var phrase2 = _c[_b];
                    if (phrase === phrase2) {
                        return [ttype.unit, true];
                    }
                }
            }
            return [null, false];
        };
        return TTypes;
    }());
    TType.TTypes = TTypes;
})(TType = exports.TType || (exports.TType = {}));
exports.TType = TType;
//# sourceMappingURL=units.js.map