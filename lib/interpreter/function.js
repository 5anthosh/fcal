"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var datatype_1 = require("../types/datatype");
var FcalFunction = /** @class */ (function () {
    function FcalFunction(name, arbity) {
        this.arbity = arbity;
        this.name = name;
    }
    FcalFunction.prototype.call = function (environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = this.function.apply(this, __spreadArrays([environment], argument));
        if (value === null) {
            return datatype_1.Type.BNumber.New('0');
        }
        return value;
    };
    return FcalFunction;
}());
exports.FcalFunction = FcalFunction;
var FcalFunctions = /** @class */ (function () {
    function FcalFunctions() {
        this.functions = Array();
    }
    FcalFunctions.prototype.add = function (fcalFunction) {
        if (this.check(fcalFunction.name)) {
            throw new Error(fcalFunction.name + " is already registered");
        }
        this.functions.push(fcalFunction);
    };
    FcalFunctions.prototype.get = function (name) {
        for (var _i = 0, _a = this.functions; _i < _a.length; _i++) {
            var func = _a[_i];
            if (func.name === name) {
                return [func, true];
            }
        }
        return [null, false];
    };
    FcalFunctions.prototype.check = function (name) {
        for (var _i = 0, _a = this.functions; _i < _a.length; _i++) {
            var funcs = _a[_i];
            if (funcs.name === name) {
                return true;
            }
        }
        return false;
    };
    return FcalFunctions;
}());
exports.FcalFunctions = FcalFunctions;
//# sourceMappingURL=function.js.map