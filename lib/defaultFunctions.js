"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./interpreter/function");
function getDefaultFunction() {
    var functions = new function_1.FcalFunctions();
    var abs = new function_1.FcalFunction('abs', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    abs.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.abs());
    };
    functions.add(abs);
    var sqrt = new function_1.FcalFunction('sqrt', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    sqrt.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.sqrt());
    };
    functions.add(sqrt);
    var cbrt = new function_1.FcalFunction('cbrt', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    cbrt.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.cbrt());
    };
    functions.add(cbrt);
    var log = new function_1.FcalFunction('log', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    log.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.log());
    };
    functions.add(log);
    var ln = new function_1.FcalFunction('ln', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    ln.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.ln());
    };
    functions.add(ln);
    var round = new function_1.FcalFunction('round', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    round.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.round());
    };
    functions.add(round);
    var floor = new function_1.FcalFunction('floor', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    floor.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.floor());
    };
    functions.add(floor);
    var ceil = new function_1.FcalFunction('ceil', 1);
    // tslint:disable-next-line: only-arrow-functions variable-name
    ceil.function = function (_environment) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        var value = argument[0];
        return value.newNumeric(value.number.ceil());
    };
    functions.add(ceil);
    return functions;
}
exports.getDefaultFunction = getDefaultFunction;
//# sourceMappingURL=defaultFunctions.js.map