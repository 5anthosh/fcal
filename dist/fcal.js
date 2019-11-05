(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fcal = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError = /** @class */ (function (_super) {
    __extends(FcalError, _super);
    function FcalError(start, end, message) {
        var _this = _super.call(this, message) || this;
        _this.start = start;
        _this.end = end;
        _this.message = message;
        if (start === -1) {
            _this.name = 'FcalError';
        }
        else {
            _this.name = "FcalError [" + start + ", " + end + "]";
        }
        return _this;
    }
    FcalError.throw = function (start, message) {
        throw FcalError.Error(start, message);
    };
    FcalError.throwWithEnd = function (start, end, message) {
        throw FcalError.ErrorWithEnd(start, end, message);
    };
    FcalError.throwWithoutCtx = function (message) {
        FcalError.throw(-1, message);
    };
    FcalError.Error = function (start, message) {
        return new FcalError(start, start, message);
    };
    FcalError.ErrorWithEnd = function (start, end, message) {
        return new FcalError(start, end, message);
    };
    FcalError.ErrorWithoutCtx = function (message) {
        return FcalError.Error(-1, message);
    };
    return FcalError;
}(Error));
exports.FcalError = FcalError;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./interpreter/function");
function getDefaultFunction() {
    var functions = Array();
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('abs', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.abs());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('sqrt', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.sqrt());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('cbrt', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.cbrt());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('log', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.log());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('ln', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.ln());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('round', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.round());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('floor', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.floor());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('ceil', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.ceil());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('cos', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.cosine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('acos', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseCosine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('cosh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.hyperbolicCosine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('acosh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseHyperbolicCosine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('sin', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.sine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('asin', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseSine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('sinh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.hyperbolicSine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('asinh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseHyperbolicSine());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('tan', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.tangent());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('atan', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseTangent());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('tanh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.hyperbolicTangent());
    }));
    functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new function_1.FcalFunction('atanh', 1, function (_environment, argument) {
        var value = argument[0];
        return value.New(value.n.inverseHyperbolicTangent());
    }));
    return functions;
}
exports.getDefaultFunction = getDefaultFunction;

},{"./interpreter/function":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Big = require("decimal.js");
var units_1 = require("./types/units");
function getdefaultUnits() {
    var units = new Array();
    setDistanceUnits(units);
    setSpeedUnits(units);
    setTimeUnits(units);
    setTemperatureUnits(units);
    return units;
}
exports.getdefaultUnits = getdefaultUnits;
function setDistanceUnits(units) {
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(1), 'cm', ['cm', 'centimeter'])
        .Singular('Centimeter')
        .Plural('Centimeters'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(100), 'm', ['m', 'meter']).Singular('Meter').Plural('Meters'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(0.1), 'mm', ['mm', 'milimeter']).Singular('Milimeter').Plural('Milimeters'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(100000), 'km', ['km']).Singular('Kilometer').Plural('Kilometers'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(2.54), 'inch', ['inch']).Singular('Inch').Plural('Inches'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(30.48), 'foot/feet', ['ft']).Singular('Foot').Plural('Feet'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(91.44), 'yard', ['yd', 'yard']).Singular('Yard').Plural('Yards'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(160934.4), 'mile', ['mi']).Singular('Mile').Plural('Miles'));
    units.push(new units_1.Unit(units_1.Unit.LENGTHID, new Big.Decimal(185200), 'nautical mile (nmi)', ['nmi']));
}
function setSpeedUnits(units) {
    units.push(new units_1.Unit(units_1.Unit.SPEEDID, new Big.Decimal(1), 'km/h', ['kmh', 'kmph', 'khm', 'kph']));
    units.push(new units_1.Unit(units_1.Unit.SPEEDID, new Big.Decimal(1.609344), 'miles/h', ['mph']));
    units.push(new units_1.Unit(units_1.Unit.SPEEDID, new Big.Decimal(3.6), 'm/s', ['mps']));
    units.push(new units_1.Unit(units_1.Unit.SPEEDID, new Big.Decimal(1.097), 'ft/s', ['fps']));
    units.push(new units_1.Unit(units_1.Unit.SPEEDID, new Big.Decimal(1.852), 'kt', ['kts', 'knots']));
}
function setTimeUnits(units) {
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(1e-9), 'nsec', ['nsec', 'nanosecond', 'nanoseconds'])
        .Singular('Nanosecond')
        .Plural('Nanoseconds'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(1e-6), 'msec', ['msec', 'microsecond', 'microseconds'])
        .Singular('Microsecond')
        .Plural('Microseconds'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(1), 'second(s)', ['sec', 'second', 'seconds'])
        .Singular('Second')
        .Plural('Seconds'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(60), 'minute(s)', ['min', 'minute', 'minutes'])
        .Singular('Minute')
        .Plural('Minutes'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(3600), 'hour(s)', ['hr', 'hour', 'hours']).Singular('Hour').Plural('Hours'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(86400), 'day(s)', ['day', 'days']).Singular('Day').Plural('Days'));
    units.push(new units_1.Unit(units_1.Unit.TIMEID, new Big.Decimal(604800), 'week(s)', ['week', 'weeks']).Singular('Week').Plural('Weeks'));
}
function setTemperatureUnits(units) {
    units.push(new units_1.Unit(units_1.Unit.TEMPERATUREID, new Big.Decimal(1), 'K', ['K', 'kelvin']));
    units.push(new units_1.Unit(units_1.Unit.TEMPERATUREID, new Big.Decimal('0.55555555555555555556'), '°F', ['°F', 'F']).setBias(new Big.Decimal('255.3722222222222')));
    units.push(new units_1.Unit(units_1.Unit.TEMPERATUREID, new Big.Decimal(1), '°C', ['°C', 'C']).setBias(new Big.Decimal(273.15)));
}

},{"./types/units":17,"decimal.js":18}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decimal_js_1 = require("decimal.js");
exports.Decimal = decimal_js_1.Decimal;
var defaultFunctions_1 = require("./defaultFunctions");
var defaultUnits_1 = require("./defaultUnits");
var environment_1 = require("./interpreter/environment");
exports.Environment = environment_1.Environment;
var function_1 = require("./interpreter/function");
exports.FcalFunction = function_1.FcalFunction;
var interpreter_1 = require("./interpreter/interpreter");
var token_1 = require("./lex/token");
var datatype_1 = require("./types/datatype");
exports.Type = datatype_1.Type;
var phrase_1 = require("./types/phrase");
var units_1 = require("./types/units");
exports.Unit = units_1.Unit;
/**
 * Formula evaluation engine.
 * It evaluates various arithmetic operations, percentage operations,
 * variables and functions with units
 */
var Fcal = /** @class */ (function () {
    function Fcal() {
        this.environment = new environment_1.Environment(Fcal.functions);
        this.setDefaultValues();
    }
    /**
     * register new fcal Functions
     * @param {Array<FcalFunction>} functions list of fcal function definitions
     */
    Fcal.UseFunctions = function (functions) {
        for (var _i = 0, functions_1 = functions; _i < functions_1.length; _i++) {
            var func = functions_1[_i];
            this.UseFunction(func);
        }
    };
    /**
     * Register new Fcal function
     * @param {FcalFunction} function fcal function definitions
     */
    Fcal.UseFunction = function (func) {
        this.functions.push(func);
    };
    /**
     * Register new units
     * @param {Array<Unit>} units
     */
    Fcal.UseUnits = function (units) {
        for (var _i = 0, units_2 = units; _i < units_2.length; _i++) {
            var unit = units_2[_i];
            this.UseUnit(unit);
        }
    };
    /**
     * Register new unit
     * @param {Unit} unit
     */
    Fcal.UseUnit = function (unit) {
        this.units.push(unit);
    };
    /**
     * Get unit meta by its phrase
     * @param {string} unit phrase
     * @returns {UnitMeta | null}
     */
    Fcal.getUnit = function (unit) {
        return this.units.get(unit);
    };
    Fcal.IntialiseStaticValues = function () {
        if (!this.phrases) {
            this.phrases = this.getdefaultphrases();
        }
        if (!this.units) {
            this.units = new units_1.Unit.List();
            this.setDefaultUnits();
        }
        if (!this.functions) {
            this.functions = new function_1.FcalFunction.List();
            this.setDefaultFunctions();
        }
    };
    Fcal.getdefaultphrases = function () {
        var phrases = new phrase_1.Phrases();
        phrases.push(token_1.TT.PLUS, ['PLUS', 'AND', 'WITH', 'ADD']);
        phrases.push(token_1.TT.MINUS, ['MINUS', 'SUBTRACT', 'WITHOUT']);
        phrases.push(token_1.TT.TIMES, ['TIMES', 'MULTIPLIEDBY', 'mul']);
        phrases.push(token_1.TT.SLASH, ['DIVIDE', 'DIVIDEBY']);
        phrases.push(token_1.TT.CAP, ['POW']);
        phrases.push(token_1.TT.MOD, ['mod']);
        phrases.push(token_1.TT.OF, ['of']);
        phrases.push(token_1.TT.IN, ['in', 'as']);
        return phrases;
    };
    Fcal.setDefaultFunctions = function () {
        this.UseFunctions(defaultFunctions_1.getDefaultFunction());
    };
    Fcal.setDefaultUnits = function () {
        this.UseUnits(defaultUnits_1.getdefaultUnits());
    };
    /**
     * Evaluates given expression
     * @param {String} expression formula expression
     * @returns {Type} result of expression
     */
    Fcal.prototype.evaluate = function (source) {
        source = prefixNewLIne(source);
        return new interpreter_1.Interpreter(source, Fcal.phrases, Fcal.units, this.environment).evaluateExpression();
    };
    /**
     * Create new expression with copy of Fcal.Environment
     * @param {String} source formula expression
     * @returns {Expression} Expression with parsed AST
     */
    Fcal.prototype.expression = function (source) {
        var env = new environment_1.Environment(Fcal.functions);
        env.values = Object.assign({}, this.environment.values);
        source = prefixNewLIne(source);
        return new Expression(new interpreter_1.Interpreter(source, Fcal.phrases, Fcal.units, env));
    };
    /**
     * Create new  Expression in sync with Fcal.Environment
     * @param {Strign} source formula expression
     * @returns {Expression} Expression with parsed AST
     */
    Fcal.prototype.expressionSync = function (source) {
        source = prefixNewLIne(source);
        return new Expression(new interpreter_1.Interpreter(source, Fcal.phrases, Fcal.units, this.environment));
    };
    /**
     * create a new variable with value or assign value to variable
     * @param {{[index:string]: Type | number | string | Decimal}} values vairbles
     */
    Fcal.prototype.setValues = function (values) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                var element = values[key];
                this.environment.set(key, element);
            }
        }
    };
    Fcal.prototype.setDefaultValues = function () {
        this.setValues({
            E: datatype_1.Type.BNumber.New('2.718281828459045235360287'),
            PI: datatype_1.Type.BNumber.New('3.141592653589793238462645'),
            PI2: datatype_1.Type.BNumber.New('6.2831853071795864769'),
            _: datatype_1.Type.BNumber.ZERO,
        });
    };
    return Fcal;
}());
exports.Fcal = Fcal;
function prefixNewLIne(source) {
    if (source.endsWith('\n')) {
        return source;
    }
    return source + '\n';
}
/**
 * Expression takes AST created from Parser and
 * evaluate AST with its state
 */
var Expression = /** @class */ (function () {
    function Expression(interpeter) {
        this.interpreter = interpeter;
    }
    /**
     * Evaluate AST of formula expression
     * @returns {Type}  result of formula expression
     */
    Expression.prototype.evaluate = function () {
        return this.interpreter.evaluateExpression();
    };
    /**
     * Change state of variables
     * if variable is not found,  it will create a new variable
     * @param {{[index:string]: Type | number}} values variables
     */
    Expression.prototype.setValues = function (values) {
        this.interpreter.setValues(values);
    };
    return Expression;
}());
exports.Expression = Expression;
Fcal.IntialiseStaticValues();

},{"./defaultFunctions":2,"./defaultUnits":3,"./interpreter/environment":5,"./interpreter/function":6,"./interpreter/interpreter":7,"./lex/token":10,"./types/datatype":14,"./types/phrase":16,"./types/units":17,"decimal.js":18}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError_1 = require("../FcalError");
var datatype_1 = require("../types/datatype");
/**
 * Represents runtime variable environment
 * It represents state of fcal
 */
var Environment = /** @class */ (function () {
    function Environment(functions) {
        this.values = {};
        this.functions = functions;
    }
    /**
     * Get the value of variable
     * @param {String} key variable name
     * @throws {FcalError} Error if variable is not available
     */
    Environment.prototype.get = function (key) {
        if (this.values.hasOwnProperty(key)) {
            return this.values[key];
        }
        throw FcalError_1.FcalError.ErrorWithoutCtx("Undefined variable " + key);
    };
    /**
     * create or assign a variable with value
     * @param {} key variable name
     * @param value value
     */
    Environment.prototype.set = function (key, value) {
        if (value instanceof datatype_1.Type) {
            this.values[key] = value;
            return;
        }
        this.values[key] = datatype_1.Type.BNumber.New(value);
    };
    return Environment;
}());
exports.Environment = Environment;

},{"../FcalError":1,"../types/datatype":14}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decimal_js_1 = __importDefault(require("decimal.js"));
var FcalError_1 = require("../FcalError");
var datatype_1 = require("../types/datatype");
/**
 * FcalFunction represents function in fcal
 */
var FcalFunction = /** @class */ (function () {
    function FcalFunction(name, arbity, func) {
        this.arbity = arbity;
        this.function = func;
        this.name = name;
    }
    /**
     * call the function
     * @param {Environment} environment state of fcal
     * @param {Array<Type>} argument arguments of the function
     * @returns {Type} function result
     * @throws {FcalError} Error if function return invalid return type
     */
    FcalFunction.prototype.call = function (environment, argument) {
        var value = this.function(environment, argument);
        if (!value) {
            // if function does not return no value then
            // Assign basic 0 number
            return datatype_1.Type.BNumber.New(0);
        }
        if (typeof value === 'number' || value instanceof decimal_js_1.default) {
            return datatype_1.Type.BNumber.New(value);
        }
        if (!(value instanceof datatype_1.Type)) {
            throw FcalError_1.FcalError.ErrorWithoutCtx(this.name + " Function Invalid return type,  Expecting Fcal.Type but got " + typeof value);
        }
        return value;
    };
    return FcalFunction;
}());
exports.FcalFunction = FcalFunction;
/**
 * List of fcal functions
 */
// tslint:disable-next-line:no-namespace
(function (FcalFunction) {
    var List = /** @class */ (function () {
        function List() {
            this.functions = {};
        }
        /**
         * Add new fcal function
         * @param {FcalFunction} fcalFunction
         * @throws {FcalError} Error if function name is already exists
         */
        List.prototype.push = function (fcalFunction) {
            if (this.check(fcalFunction.name)) {
                FcalError_1.FcalError.throwWithoutCtx(fcalFunction.name + " is already registered");
            }
            this.functions[fcalFunction.name] = fcalFunction;
        };
        /**
         * Call a function by its name
         * @param {string} name name of the function
         * @param {Environment} enviroment state of fcal
         * @param {Array<Type>} argument arguments for the function
         * @param {Type} Type resullt of the function
         * @throws {FcalError} Error if function is not found
         */
        List.prototype.call = function (name, enviroment, argument) {
            var fcalFunc = this.get(name);
            if (fcalFunc) {
                return fcalFunc.function(enviroment, argument);
            }
            throw FcalError_1.FcalError.ErrorWithoutCtx("Function " + name + " is not found");
        };
        /**
         * Get function implemention by its function name
         * @param {string} name function name
         * @returns {FcalFunction | undefined} function
         */
        List.prototype.get = function (name) {
            return this.functions[name];
        };
        /**
         * check if function is available
         * @param {name} name function name
         * @returns {boolean} if function is available
         */
        List.prototype.check = function (name) {
            return this.functions.hasOwnProperty(name);
        };
        return List;
    }());
    FcalFunction.List = List;
})(FcalFunction = exports.FcalFunction || (exports.FcalFunction = {}));
exports.FcalFunction = FcalFunction;

},{"../FcalError":1,"../types/datatype":14,"decimal.js":18}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError_1 = require("../FcalError");
var token_1 = require("../lex/token");
var parser_1 = require("../parser/parser");
var datatype_1 = require("../types/datatype");
var Interpreter = /** @class */ (function () {
    function Interpreter(source, phrases, units, environment) {
        var parser = new parser_1.Parser(source, phrases, units);
        this.environment = environment;
        this.ast = parser.parse();
    }
    Interpreter.prototype.visitCallExpr = function (expr) {
        var name = expr.name;
        var call;
        call = this.environment.functions.get(name);
        if (call) {
            if (call.arbity !== -1) {
                if (call.arbity !== expr.argument.length) {
                    FcalError_1.FcalError.throwWithEnd(expr.start, expr.end, "function " + name + " Expected " + call.arbity + " args but got " + expr.argument.length);
                }
            }
            var argument = Array();
            for (var _i = 0, _a = expr.argument; _i < _a.length; _i++) {
                var param = _a[_i];
                argument.push(this.evaluate(param));
            }
            return call.call(this.environment, argument);
        }
        throw FcalError_1.FcalError.ErrorWithEnd(expr.start, expr.end, name + " is not callable");
    };
    Interpreter.prototype.visitAssignExpr = function (expr) {
        var value = this.evaluate(expr.value);
        this.environment.set(expr.name, value);
        return value;
    };
    Interpreter.prototype.visitVariableExpr = function (expr) {
        return this.environment.get(expr.name);
    };
    Interpreter.prototype.evaluateExpression = function () {
        var value = this.evaluate(this.ast);
        this.environment.set('_', value);
        return value;
    };
    Interpreter.prototype.visitUnitConvertionExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.UnitNumber.convertToUnit(value, expr.unit);
        }
        throw FcalError_1.FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value before in');
    };
    Interpreter.prototype.visitUnitExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.UnitNumber.New(value.n, expr.unit);
        }
        throw FcalError_1.FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value before unit');
    };
    Interpreter.prototype.visitBinaryExpr = function (expr) {
        var left = this.evaluate(expr.left);
        var right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case token_1.TT.PLUS:
                if (!left.n.isFinite() && !right.n.isFinite()) {
                    if (!((left.n.isNegative() && right.n.isNegative()) || (left.n.isPositive() && right.n.isPositive()))) {
                        // console.log(left.number, right.number);
                        FcalError_1.FcalError.throwWithEnd(expr.left.start, expr.right.end, 'Subtraction between Infinity is indeterminate');
                    }
                }
                return left.Add(right);
            case token_1.TT.MINUS:
                if (!left.n.isFinite() && !right.n.isFinite()) {
                    if ((left.n.isPositive() && right.n.isPositive()) || (left.n.isNegative() && right.n.isNegative())) {
                        // console.log(left.number, right.number)
                        FcalError_1.FcalError.throwWithEnd(expr.left.start, expr.right.end, 'Subtraction between Infinity is indeterminate');
                    }
                }
                return left.Sub(right);
            case token_1.TT.TIMES:
                return left.times(right);
            case token_1.TT.SLASH:
                if (!left.n.isFinite() && !right.n.isFinite()) {
                    FcalError_1.FcalError.throwWithEnd(expr.left.start, expr.right.end, 'Division between Infinity is indeterminate');
                }
                return left.divide(right);
            case token_1.TT.MOD:
                if (!left.n.isFinite()) {
                    FcalError_1.FcalError.throwWithEnd(expr.left.start, expr.right.end, 'Modulus between Infinity is indeterminate');
                }
                if (right.isZero()) {
                    return new datatype_1.Type.BNumber('Infinity');
                }
                return left.modulo(right);
            case token_1.TT.CAP:
                if (left.isNegative()) {
                    if (!right.isInteger()) {
                        FcalError_1.FcalError.throwWithEnd(expr.left.start, expr.right.end, "Pow of operation results in complex number and complex is not supported yet");
                    }
                }
                return left.power(right);
            case token_1.TT.OF:
                left = new datatype_1.Type.Percentage(left.n);
                var per = left;
                right.n = per.percentageValue(right.n);
                return right;
            default:
                return datatype_1.Type.BNumber.ZERO;
        }
    };
    Interpreter.prototype.visitGroupingExpr = function (expr) {
        return this.evaluate(expr.expression);
    };
    Interpreter.prototype.visitLiteralExpr = function (expr) {
        return expr.value;
    };
    Interpreter.prototype.visitUnaryExpr = function (expr) {
        var right = this.evaluate(expr.right);
        if (expr.operator.type === token_1.TT.MINUS) {
            return right.negated();
        }
        return right;
    };
    Interpreter.prototype.visitPercentageExpr = function (expr) {
        var value = this.evaluate(expr.expression);
        if (value instanceof datatype_1.Type.Numberic) {
            return datatype_1.Type.Percentage.New(value.n);
        }
        throw FcalError_1.FcalError.ErrorWithEnd(expr.start, expr.end, 'Expecting numeric value in percentage');
    };
    Interpreter.prototype.setValues = function (values) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                var element = values[key];
                this.environment.set(key, element);
            }
        }
    };
    Interpreter.prototype.evaluate = function (expr) {
        var ast = expr.accept(this);
        return ast;
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;

},{"../FcalError":1,"../lex/token":10,"../parser/parser":13,"../types/datatype":14}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Char = /** @class */ (function () {
    function Char() {
    }
    Char.PLUS = '+';
    Char.MINUS = '-';
    Char.TIMES = '*';
    Char.MOD = 'mod';
    Char.SLASH = '/';
    Char.OPEN_PARAN = '(';
    Char.CLOSE_PARAN = ')';
    Char.CAP = '^';
    Char.PERCENTAGE = '%';
    Char.EQUAL = '=';
    Char.DOUBLE_COLON = ':';
    Char.COMMA = ',';
    Char.NEWLINE = '\n';
    return Char;
}());
exports.Char = Char;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError_1 = require("../FcalError");
var datatype_1 = require("../types/datatype");
var numberSystem_1 = require("../types/numberSystem");
var char_1 = require("./char");
var token_1 = require("./token");
var Lexer = /** @class */ (function () {
    function Lexer(source, phrases, untis) {
        // Removing the space around expression
        this.source = source.replace(/[ \t]+$/, '');
        this.start = 0;
        this.current = 0;
        this.tokens = [];
        this.phrases = phrases;
        this.units = untis;
    }
    Lexer.isDigit = function (char) {
        return char >= '0' && char <= '9';
    };
    Lexer.isAlpha = function (char) {
        return (!Lexer.isDigit(char) && !this.isSpace(char) && char !== '\0' && char !== '\n' && !Lexer.notAlpha.includes(char));
    };
    Lexer.isSpace = function (char) {
        return char === '\t' || char === ' ';
    };
    Lexer.isBinaryDigit = function (char) {
        return char === '0' || char === '1';
    };
    Lexer.isOctalDigit = function (char) {
        return char >= '0' && char <= '8';
    };
    Lexer.isHexDigit = function (char) {
        return (char >= '0' && char <= '9') || (char >= 'a' && char <= 'f') || (char >= 'A' && char <= 'F');
    };
    Lexer.prototype.Next = function () {
        if (this.isAtEnd()) {
            return token_1.Token.EOL(this.current);
        }
        return this.scan();
    };
    Lexer.prototype.scan = function () {
        var char = this.space();
        switch (char) {
            case char_1.Char.PLUS:
                return this.TT(token_1.TT.PLUS);
            case char_1.Char.MINUS:
                return this.TT(token_1.TT.MINUS);
            case char_1.Char.TIMES:
                return this.TT(token_1.TT.TIMES);
            case char_1.Char.SLASH:
                return this.TT(token_1.TT.SLASH);
            case char_1.Char.EQUAL:
                return this.TT(token_1.TT.EQUAL);
            case char_1.Char.COMMA:
                return this.TT(token_1.TT.COMMA);
            case char_1.Char.DOUBLE_COLON:
                return this.TT(token_1.TT.EQUAL);
            case char_1.Char.OPEN_PARAN:
                return this.TT(token_1.TT.OPEN_PARAN);
            case char_1.Char.CLOSE_PARAN:
                return this.TT(token_1.TT.CLOSE_PARAN);
            case char_1.Char.CAP:
                return this.TT(token_1.TT.CAP);
            case char_1.Char.PERCENTAGE:
                return this.TT(token_1.TT.PERCENTAGE);
            case char_1.Char.NEWLINE:
                return this.TT(token_1.TT.NEWLINE);
            default:
                if (Lexer.isDigit(char)) {
                    return this.number();
                }
                return this.string();
        }
    };
    Lexer.prototype.isAtEnd = function () {
        return this.current >= this.source.length;
    };
    Lexer.prototype.eat = function () {
        this.current++;
        return this.source.charAt(this.current - 1);
    };
    Lexer.prototype.peek = function (n) {
        if (this.current + n >= this.source.length) {
            return '\0';
        }
        return this.source.charAt(this.current + n);
    };
    Lexer.prototype.string = function () {
        while (Lexer.isAlpha(this.peek(0)) || Lexer.isDigit(this.peek(0))) {
            this.eat();
        }
        var text = this.lexeme();
        var type;
        if (text === 'Infinity') {
            return this.TTWithLiteral(token_1.TT.Number, new datatype_1.Type.BNumber(text));
        }
        type = this.phrases.get(text);
        if (type !== undefined) {
            return this.TT(type);
        }
        var unit = this.units.get(text);
        if (unit) {
            return this.TTWithLiteral(token_1.TT.UNIT, text);
        }
        return this.TT(token_1.TT.NAME);
    };
    Lexer.prototype.number = function () {
        if (this.peek(0) === 'b' || this.peek(0) === 'B') {
            this.eat();
            while (Lexer.isDigit(this.peek(0))) {
                if (!Lexer.isBinaryDigit(this.peek(0))) {
                    FcalError_1.FcalError.throw(this.current, "Unexpected '" + this.peek(0) + "' in binary number");
                }
                this.eat();
            }
            var value = new datatype_1.Type.BNumber(this.lexeme());
            value.setSystem(numberSystem_1.NumberSystem.Binary);
            return this.TTWithLiteral(token_1.TT.Number, value);
        }
        if (this.peek(0) === 'o' || this.peek(0) === 'O') {
            this.eat();
            while (Lexer.isDigit(this.peek(0))) {
                if (!Lexer.isOctalDigit(this.peek(0))) {
                    FcalError_1.FcalError.throw(this.current, "Unexpected '" + this.peek(0) + "' in Octal number");
                }
                this.eat();
            }
            var value = new datatype_1.Type.BNumber(this.lexeme());
            value.setSystem(numberSystem_1.NumberSystem.Octal);
            return this.TTWithLiteral(token_1.TT.Number, value);
        }
        if (this.peek(0) === 'x' || this.peek(0) === 'X') {
            this.eat();
            if (!Lexer.isHexDigit(this.peek(0))) {
                FcalError_1.FcalError.throw(this.current, "Unexpected '" + this.peek(0) + "' in Hexa decimal");
            }
            while (Lexer.isHexDigit(this.peek(0))) {
                this.eat();
            }
            var value = new datatype_1.Type.BNumber(this.lexeme());
            value.setSystem(numberSystem_1.NumberSystem.HexaDecimal);
            return this.TTWithLiteral(token_1.TT.Number, value);
        }
        while (Lexer.isDigit(this.peek(0))) {
            this.eat();
        }
        if (this.peek(0) === '.' && Lexer.isDigit(this.peek(1))) {
            this.eat();
            while (Lexer.isDigit(this.peek(0))) {
                this.eat();
            }
        }
        if (this.peek(0) === 'E' || this.peek(0) === 'e') {
            var c = this.peek(0);
            this.eat();
            if (this.peek(0) === '+' || this.peek(0) === '-') {
                c = this.peek(0);
                this.eat();
            }
            if (!Lexer.isDigit(this.peek(0))) {
                FcalError_1.FcalError.throwWithEnd(this.start, this.current, "Expecting number after " + c + " but got '" + this.peek(0) + "'");
            }
            while (Lexer.isDigit(this.peek(0))) {
                this.eat();
            }
        }
        return this.TTWithLiteral(token_1.TT.Number, new datatype_1.Type.BNumber(this.lexeme()));
    };
    Lexer.prototype.TT = function (type) {
        return this.TTWithLiteral(type, null);
    };
    Lexer.prototype.TTWithLiteral = function (type, literal) {
        var token = new token_1.Token(type, this.lexeme(), literal, this.start, this.current);
        this.start = this.current;
        this.tokens.push(token);
        return token;
    };
    Lexer.prototype.lexeme = function () {
        return this.source.substring(this.start, this.current);
    };
    Lexer.prototype.space = function () {
        var char = this.eat();
        while (Lexer.isSpace(char)) {
            this.start = this.current;
            char = this.eat();
        }
        return char;
    };
    Lexer.notAlpha = [
        char_1.Char.PLUS,
        char_1.Char.MINUS,
        char_1.Char.TIMES,
        char_1.Char.SLASH,
        char_1.Char.OPEN_PARAN,
        char_1.Char.CLOSE_PARAN,
        char_1.Char.CAP,
        char_1.Char.PERCENTAGE,
        char_1.Char.EQUAL,
        char_1.Char.COMMA,
        char_1.Char.DOUBLE_COLON,
        char_1.Char.NEWLINE,
    ];
    return Lexer;
}());
exports.Lexer = Lexer;

},{"../FcalError":1,"../types/datatype":14,"../types/numberSystem":15,"./char":8,"./token":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TT;
(function (TT) {
    TT[TT["PLUS"] = 0] = "PLUS";
    TT[TT["MINUS"] = 1] = "MINUS";
    TT[TT["TIMES"] = 2] = "TIMES";
    TT[TT["MOD"] = 3] = "MOD";
    TT[TT["SLASH"] = 4] = "SLASH";
    TT[TT["Number"] = 5] = "Number";
    TT[TT["OPEN_PARAN"] = 6] = "OPEN_PARAN";
    TT[TT["CLOSE_PARAN"] = 7] = "CLOSE_PARAN";
    TT[TT["NEWLINE"] = 8] = "NEWLINE";
    TT[TT["EOL"] = 9] = "EOL";
    TT[TT["IN"] = 10] = "IN";
    TT[TT["NAME"] = 11] = "NAME";
    TT[TT["EQUAL"] = 12] = "EQUAL";
    TT[TT["COMMA"] = 13] = "COMMA";
    TT[TT["PERCENTAGE"] = 14] = "PERCENTAGE";
    TT[TT["OF"] = 15] = "OF";
    TT[TT["UNIT"] = 16] = "UNIT";
    TT[TT["CAP"] = 17] = "CAP";
})(TT = exports.TT || (exports.TT = {}));
function PrintTT(enumNumber) {
    return TT[enumNumber];
}
exports.PrintTT = PrintTT;
var Token = /** @class */ (function () {
    function Token(type, lexeme, literal, start, end) {
        this.type = type;
        this.lexeme = lexeme;
        this.start = start;
        this.end = end;
        this.Literal = literal;
    }
    Token.EOL = function (end) {
        return new Token(TT.EOL, '', null, end, end);
    };
    Token.prototype.toString = function () {
        var literal = '';
        if (this.Literal !== null) {
            literal = this.Literal.format();
        }
        return "< " + PrintTT(this.type) + " " + this.lexeme + " " + literal + " (" + this.start + ", " + this.end + ")>";
    };
    return Token;
}());
exports.Token = Token;
// export default { TokenType, Token };

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ASTPrinter = /** @class */ (function () {
    function ASTPrinter() {
        this.depth = 0;
    }
    ASTPrinter.createPrefix = function (depth, type) {
        return "" + this.prefixchar + '-'.repeat(depth * this.tab) + " (" + depth / this.tab + ")" + type;
    };
    ASTPrinter.prototype.visitCallExpr = function (expr) {
        return ASTPrinter.createPrefix(this.depth, 'Function') + " \n|\n" + expr.name;
    };
    ASTPrinter.prototype.visitAssignExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var value = this.evaluate(expr.value);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'ASSIGN') + " \n|\n" + value;
    };
    ASTPrinter.prototype.visitVariableExpr = function (expr) {
        return ASTPrinter.createPrefix(this.depth, 'VARIABLE') + " " + expr.name + "\n|\n";
    };
    ASTPrinter.prototype.visitUnitExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNIT') + " " + expr.unit.unitType + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitUnitConvertionExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNIT CONVERT') + " " + expr.unit.unitType + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitBinaryExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var left = this.evaluate(expr.left);
        var right = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'BINARY') + "  " + expr.operator + " \n|\n" + left + right;
    };
    ASTPrinter.prototype.visitGroupingExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'Grouping') + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitLiteralExpr = function (expr) {
        return ASTPrinter.createPrefix(this.depth, 'LITERAL') + " " + expr.value.print() + "\n|\n";
    };
    ASTPrinter.prototype.visitUnaryExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.right);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'UNARY') + " " + expr.operator + " \n|\n" + expression;
    };
    ASTPrinter.prototype.visitPercentageExpr = function (expr) {
        this.depth += ASTPrinter.tab;
        var expression = this.evaluate(expr.expression);
        this.depth -= ASTPrinter.tab;
        return ASTPrinter.createPrefix(this.depth, 'PERCENTAGE') + " \n|\n" + expression;
    };
    ASTPrinter.prototype.print = function (expr) {
        return this.evaluate(expr);
    };
    ASTPrinter.prototype.evaluate = function (expr) {
        var ast = expr.accept(this);
        return ast;
    };
    ASTPrinter.tab = 2;
    ASTPrinter.prefixchar = '+';
    return ASTPrinter;
}());
exports.ASTPrinter = ASTPrinter;

},{}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var astPrinter_1 = require("./astPrinter");
var Expr = /** @class */ (function (_super) {
    __extends(Expr, _super);
    function Expr(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    Expr.prototype.toString = function () {
        return this.print(this);
    };
    return Expr;
}(astPrinter_1.ASTPrinter));
exports.Expr = Expr;
// tslint:disable-next-line: no-namespace
(function (Expr) {
    var Binary = /** @class */ (function (_super) {
        __extends(Binary, _super);
        function Binary(left, operator, right, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.left = left;
            _this.operator = operator;
            _this.right = right;
            return _this;
        }
        Binary.prototype.accept = function (visitor) {
            return visitor.visitBinaryExpr(this);
        };
        return Binary;
    }(Expr));
    Expr.Binary = Binary;
    var Grouping = /** @class */ (function (_super) {
        __extends(Grouping, _super);
        function Grouping(expression, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.expression = expression;
            return _this;
        }
        Grouping.prototype.accept = function (visitor) {
            return visitor.visitGroupingExpr(this);
        };
        return Grouping;
    }(Expr));
    Expr.Grouping = Grouping;
    var Assign = /** @class */ (function (_super) {
        __extends(Assign, _super);
        function Assign(name, value, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.name = name;
            _this.value = value;
            return _this;
        }
        Assign.prototype.accept = function (visitor) {
            return visitor.visitAssignExpr(this);
        };
        return Assign;
    }(Expr));
    Expr.Assign = Assign;
    var Variable = /** @class */ (function (_super) {
        __extends(Variable, _super);
        function Variable(name, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.name = name;
            return _this;
        }
        Variable.prototype.accept = function (visitor) {
            return visitor.visitVariableExpr(this);
        };
        return Variable;
    }(Expr));
    Expr.Variable = Variable;
    var Call = /** @class */ (function (_super) {
        __extends(Call, _super);
        function Call(name, argument, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.name = name;
            _this.argument = argument;
            return _this;
        }
        Call.prototype.accept = function (visitor) {
            return visitor.visitCallExpr(this);
        };
        return Call;
    }(Expr));
    Expr.Call = Call;
    var Literal = /** @class */ (function (_super) {
        __extends(Literal, _super);
        function Literal(value, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.value = value;
            return _this;
        }
        Literal.prototype.accept = function (visitor) {
            return visitor.visitLiteralExpr(this);
        };
        return Literal;
    }(Expr));
    Expr.Literal = Literal;
    var Percentage = /** @class */ (function (_super) {
        __extends(Percentage, _super);
        function Percentage(expression, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.expression = expression;
            return _this;
        }
        Percentage.prototype.accept = function (visitor) {
            return visitor.visitPercentageExpr(this);
        };
        return Percentage;
    }(Expr));
    Expr.Percentage = Percentage;
    var UnitExpr = /** @class */ (function (_super) {
        __extends(UnitExpr, _super);
        function UnitExpr(expression, unit, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.unit = unit;
            _this.expression = expression;
            return _this;
        }
        UnitExpr.prototype.accept = function (visitor) {
            return visitor.visitUnitExpr(this);
        };
        return UnitExpr;
    }(Expr));
    Expr.UnitExpr = UnitExpr;
    var UnitConvertionExpr = /** @class */ (function (_super) {
        __extends(UnitConvertionExpr, _super);
        function UnitConvertionExpr(expression, unit, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.unit = unit;
            _this.expression = expression;
            return _this;
        }
        UnitConvertionExpr.prototype.accept = function (visitor) {
            return visitor.visitUnitConvertionExpr(this);
        };
        return UnitConvertionExpr;
    }(Expr));
    Expr.UnitConvertionExpr = UnitConvertionExpr;
    var Unary = /** @class */ (function (_super) {
        __extends(Unary, _super);
        function Unary(operator, right, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.operator = operator;
            _this.right = right;
            return _this;
        }
        Unary.prototype.accept = function (visitor) {
            return visitor.visitUnaryExpr(this);
        };
        return Unary;
    }(Expr));
    Expr.Unary = Unary;
})(Expr = exports.Expr || (exports.Expr = {}));
exports.Expr = Expr;

},{"./astPrinter":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError_1 = require("../FcalError");
var lex_1 = require("../lex/lex");
var token_1 = require("../lex/token");
var expr_1 = require("./expr");
var Parser = /** @class */ (function () {
    function Parser(source, phrases, units) {
        this.source = source;
        this.lexer = new lex_1.Lexer(this.source, phrases, units);
        this.ntoken = 0;
        this.tokens = [];
    }
    Parser.prototype.parse = function () {
        var expr = this.Stmt();
        return expr;
    };
    Parser.prototype.Stmt = function () {
        var expr = this.assignment();
        if (this.match([token_1.TT.NEWLINE])) {
            return expr;
        }
        if (this.peek().type === token_1.TT.EOL) {
            FcalError_1.FcalError.throw(this.peek().end, 'Expecting new Line');
        }
        throw FcalError_1.FcalError.ErrorWithEnd(this.peek().start, this.peek().end, "Unexpected token " + this.peek().lexeme);
    };
    Parser.prototype.assignment = function () {
        var expr = this.expression();
        if (this.match([token_1.TT.EQUAL])) {
            var expres = this.expression();
            if (expr instanceof expr_1.Expr.Variable) {
                var name_1 = expr.name;
                return new expr_1.Expr.Assign(name_1, expres, expr.start, expres.end);
            }
        }
        return expr;
    };
    Parser.prototype.expression = function () {
        return this.addition();
    };
    Parser.prototype.addition = function () {
        var expr = this.multiply();
        while (this.match([token_1.TT.PLUS, token_1.TT.MINUS])) {
            var operator = this.previous();
            var right = this.multiply();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.multiply = function () {
        var expr = this.unary();
        while (this.match([token_1.TT.TIMES, token_1.TT.SLASH, token_1.TT.MOD, token_1.TT.OF])) {
            var operator = this.previous();
            var right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.unary = function () {
        if (this.match([token_1.TT.PLUS, token_1.TT.MINUS])) {
            var operator = this.previous();
            var right = this.unary();
            return new expr_1.Expr.Unary(operator, right, operator.start, right.end);
        }
        return this.exponent();
    };
    Parser.prototype.exponent = function () {
        var expr = this.unitConvert();
        while (this.match([token_1.TT.CAP])) {
            var operator = this.previous();
            var right = this.unary();
            expr = new expr_1.Expr.Binary(expr, operator, right, expr.start, right.end);
        }
        return expr;
    };
    Parser.prototype.unitConvert = function () {
        var expr = this.suffix();
        if (this.match([token_1.TT.IN])) {
            this.consume(token_1.TT.UNIT, 'Expecting unit after in');
            var unit = this.previous();
            var unit2 = this.lexer.units.get(unit.lexeme);
            if (unit2) {
                return new expr_1.Expr.UnitConvertionExpr(expr, unit2, expr.start, unit.end);
            }
        }
        return expr;
    };
    Parser.prototype.suffix = function () {
        var expr = this.call();
        if (this.match([token_1.TT.PERCENTAGE])) {
            var operator = this.previous();
            return new expr_1.Expr.Percentage(expr, expr.start, operator.end);
        }
        if (this.match([token_1.TT.UNIT])) {
            var unit = this.previous();
            var unit2 = void 0;
            unit2 = this.lexer.units.get(unit.lexeme);
            if (unit2) {
                return new expr_1.Expr.UnitExpr(expr, unit2, expr.start, unit.end);
            }
        }
        return expr;
    };
    Parser.prototype.call = function () {
        var expr = this.term();
        if (this.match([token_1.TT.OPEN_PARAN])) {
            if (expr instanceof expr_1.Expr.Variable) {
                var argument = Array();
                if (this.peek().type !== token_1.TT.CLOSE_PARAN) {
                    do {
                        if (argument.length >= 255) {
                            FcalError_1.FcalError.throwWithEnd(expr.start, this.peek().end, expr.name + " function cannot have more than 255 arguments");
                        }
                        argument.push(this.expression());
                    } while (this.match([token_1.TT.COMMA]));
                }
                this.consume(token_1.TT.CLOSE_PARAN, "Expect ')' after the arguments");
                return new expr_1.Expr.Call(expr.name, argument, expr.start, this.previous().end);
            }
            FcalError_1.FcalError.throwWithEnd(expr.start, this.previous().end, "Not callable");
        }
        return expr;
    };
    Parser.prototype.term = function () {
        if (this.match([token_1.TT.Number])) {
            return new expr_1.Expr.Literal(this.previous().Literal, this.previous().start, this.previous().end);
        }
        if (this.match([token_1.TT.OPEN_PARAN])) {
            var start = this.previous();
            var expr = this.expression();
            this.consume(token_1.TT.CLOSE_PARAN, "Expect ')' after expression but found " + this.peek().lexeme);
            return new expr_1.Expr.Grouping(expr, start.start, this.previous().end);
        }
        if (this.match([token_1.TT.NAME])) {
            return new expr_1.Expr.Variable(this.previous().lexeme, this.previous().start, this.previous().end);
        }
        throw FcalError_1.FcalError.ErrorWithEnd(this.peek().start, this.peek().end, "Expect expression but found " + this.peek().lexeme);
    };
    Parser.prototype.match = function (types) {
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            if (this.check(type)) {
                this.incr();
                return true;
            }
        }
        return false;
    };
    Parser.prototype.consume = function (type, message) {
        if (this.check(type)) {
            this.incr();
            return;
        }
        FcalError_1.FcalError.throwWithEnd(this.peek().start, this.peek().end, message);
    };
    Parser.prototype.check = function (type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type === type;
    };
    Parser.prototype.isAtEnd = function () {
        var token = this.nextToken();
        return token.type === token_1.TT.EOL;
    };
    Parser.prototype.nextToken = function () {
        if (this.ntoken < this.tokens.length) {
            return this.tokens[this.ntoken];
        }
        return this.getToken();
    };
    Parser.prototype.getToken = function () {
        var token = this.lexer.Next();
        if (token.type !== token_1.TT.EOL) {
            this.tokens.push(token);
        }
        return token;
    };
    Parser.prototype.previous = function () {
        return this.tokens[this.ntoken - 1];
    };
    Parser.prototype.peek = function () {
        return this.nextToken();
    };
    Parser.prototype.incr = function () {
        this.ntoken++;
    };
    return Parser;
}());
exports.Parser = Parser;

},{"../FcalError":1,"../lex/lex":9,"../lex/token":10,"./expr":12}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Big = require("decimal.js");
var numberSystem_1 = require("./numberSystem");
var Type = /** @class */ (function () {
    function Type() {
    }
    Type.prototype.toString = function () {
        return this.print();
    };
    return Type;
}());
exports.Type = Type;
var DATATYPE;
(function (DATATYPE) {
    DATATYPE[DATATYPE["NUMBER"] = 0] = "NUMBER";
    DATATYPE[DATATYPE["UNIT"] = 1] = "UNIT";
    DATATYPE[DATATYPE["PERCENTAGE"] = 2] = "PERCENTAGE";
})(DATATYPE = exports.DATATYPE || (exports.DATATYPE = {}));
var TYPERANK;
(function (TYPERANK) {
    TYPERANK[TYPERANK["PERCENTAGE"] = 0] = "PERCENTAGE";
    TYPERANK[TYPERANK["NUMBER"] = 1] = "NUMBER";
    TYPERANK[TYPERANK["UNIT"] = 2] = "UNIT";
})(TYPERANK = exports.TYPERANK || (exports.TYPERANK = {}));
/**
 * Represents a type of variable or value
 */
// tslint:disable-next-line:no-namespace
(function (Type) {
    var Numberic = /** @class */ (function (_super) {
        __extends(Numberic, _super);
        function Numberic(value) {
            var _this = _super.call(this) || this;
            if (value instanceof Big.Decimal) {
                _this.n = value;
            }
            else {
                _this.n = new Big.Decimal(value);
            }
            _this.ns = numberSystem_1.NumberSystem.Decimal;
            _this.lf = false;
            return _this;
        }
        Numberic.prototype.setSystem = function (numberSys) {
            this.ns = numberSys;
        };
        Numberic.prototype.toNumericString = function () {
            return this.ns.to(this.n);
        };
        Numberic.prototype.print = function () {
            return this.toNumericString();
        };
        Numberic.prototype.Add = function (value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.lf = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    return value.New(this.plus(value).n);
                }
                return this.plus(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.plus(this);
            }
            return this.New(value.plus(this).n);
        };
        Numberic.prototype.Sub = function (value) {
            return this.Add(value.negated());
        };
        Numberic.prototype.times = function (value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.lf = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    return value.New(this.mul(value).n);
                }
                return this.mul(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.mul(this);
            }
            return this.New(value.mul(this).n);
        };
        Numberic.prototype.divide = function (value) {
            // console.log(`DIVIDE ${this.number.toString()} ${value.number.toString()}`);
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.lf = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    if (this.TYPERANK === value.TYPERANK) {
                        return this.New(this.div(value).n);
                    }
                    return value.New(this.div(value).n);
                }
                return this.div(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.div(this);
            }
            return this.New(value.div(this).n);
        };
        Numberic.prototype.power = function (value) {
            // console.log(`CAP ${this.number.toString()} ${value.number.toString()}`);
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.lf = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    if (this.TYPERANK === value.TYPERANK) {
                        return this.New(this.pow(value).n);
                    }
                    return value.New(this.pow(value).n);
                }
                return this.pow(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.pow(this);
            }
            return this.New(value.pow(this).n);
        };
        Numberic.prototype.modulo = function (value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.lf = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    if (this.TYPERANK === value.TYPERANK) {
                        return this.New(this.mod(value).n);
                    }
                    return value.New(this.mod(value).n);
                }
                return this.mod(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.mod(this);
            }
            return this.New(value.mod(this).n);
        };
        return Numberic;
    }(Type));
    Type.Numberic = Numberic;
    /**
     * Basic Number type
     */
    var BNumber = /** @class */ (function (_super) {
        __extends(BNumber, _super);
        function BNumber(value) {
            var _this = _super.call(this, value) || this;
            _this.TYPE = DATATYPE.NUMBER;
            _this.TYPERANK = TYPERANK.NUMBER;
            return _this;
        }
        BNumber.New = function (value) {
            return new BNumber(value);
        };
        BNumber.prototype.isZero = function () {
            return this.n.isZero();
        };
        BNumber.prototype.isNegative = function () {
            return this.n.isNegative();
        };
        BNumber.prototype.isInteger = function () {
            return this.n.isInteger();
        };
        BNumber.prototype.negated = function () {
            return BNumber.New(this.n.negated());
        };
        BNumber.prototype.div = function (value) {
            return BNumber.New(this.n.div(value.n));
        };
        BNumber.prototype.pow = function (value) {
            return BNumber.New(this.n.pow(value.n));
        };
        BNumber.prototype.mod = function (value) {
            return BNumber.New(this.n.modulo(value.n));
        };
        BNumber.prototype.mul = function (value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.n.mul(value.n));
            // return value.mul(value.newNumeric(this.number));
        };
        BNumber.prototype.plus = function (value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.n.plus(value.n));
            // return value.plus(value.newNumeric(this.number));
        };
        BNumber.prototype.New = function (value) {
            return BNumber.New(value);
        };
        BNumber.ZERO = BNumber.New(new Big.Decimal(0));
        return BNumber;
    }(Numberic));
    Type.BNumber = BNumber;
    /**
     * Percentage type
     */
    var Percentage = /** @class */ (function (_super) {
        __extends(Percentage, _super);
        function Percentage(value) {
            var _this = _super.call(this, value) || this;
            _this.TYPE = DATATYPE.PERCENTAGE;
            _this.TYPERANK = TYPERANK.PERCENTAGE;
            return _this;
        }
        Percentage.New = function (value) {
            return new Percentage(value);
        };
        Percentage.prototype.isZero = function () {
            return this.n.isZero();
        };
        Percentage.prototype.isNegative = function () {
            return this.n.isNegative();
        };
        Percentage.prototype.isInteger = function () {
            return this.n.isInteger();
        };
        Percentage.prototype.negated = function () {
            return Percentage.New(this.n.negated());
        };
        Percentage.prototype.plus = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.n.plus(value.n));
            }
            return Percentage.New(value.n.plus(this.percentageValue(value.n)));
        };
        Percentage.prototype.mul = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.n.mul(value.n));
            }
            return Percentage.New(value.n.mul(this.percentageValue(value.n)));
        };
        Percentage.prototype.div = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.n.div(value.n));
            }
            if (value.lf) {
                return Percentage.New(value.n.div(this.percentageValue(value.n)));
            }
            return Percentage.New(this.percentageValue(value.n).div(value.n));
        };
        Percentage.prototype.pow = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.n.pow(value.n));
            }
            if (value.lf) {
                return Percentage.New(value.n.pow(this.percentageValue(value.n)));
            }
            return Percentage.New(this.percentageValue(value.n).pow(value.n));
        };
        Percentage.prototype.mod = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.n.mod(value.n));
            }
            if (value.lf) {
                return Percentage.New(value.n.mod(this.percentageValue(value.n)));
            }
            return Percentage.New(this.percentageValue(value.n).mod(value.n));
        };
        Percentage.prototype.percentageValue = function (value) {
            return value.mul(this.n.div(Percentage.base));
        };
        Percentage.prototype.print = function () {
            return "% " + this.toNumericString();
        };
        Percentage.prototype.New = function (value) {
            return Percentage.New(value);
        };
        Percentage.base = new Big.Decimal(100);
        return Percentage;
    }(Numberic));
    Type.Percentage = Percentage;
    /**
     * Number with unit
     */
    var UnitNumber = /** @class */ (function (_super) {
        __extends(UnitNumber, _super);
        function UnitNumber(value, unit) {
            var _this = _super.call(this, value) || this;
            _this.unit = unit;
            _this.TYPE = DATATYPE.UNIT;
            _this.TYPERANK = TYPERANK.UNIT;
            return _this;
        }
        UnitNumber.New = function (value, unit) {
            return new UnitNumber(value, unit);
        };
        UnitNumber.convertToUnit = function (value, unit) {
            if (value instanceof UnitNumber) {
                var value2 = value;
                if (value2.unit.id === unit.id && value2.unit.unitType !== unit.unitType) {
                    return UnitNumber.New(value2.convert(unit.ratio(), unit.bias()), unit);
                }
            }
            return UnitNumber.New(value.n, unit);
        };
        UnitNumber.prototype.New = function (value) {
            return new UnitNumber(value, this.unit);
        };
        UnitNumber.prototype.isZero = function () {
            return this.n.isZero();
        };
        UnitNumber.prototype.isNegative = function () {
            return this.n.isNegative();
        };
        UnitNumber.prototype.isInteger = function () {
            return this.n.isInteger();
        };
        UnitNumber.prototype.negated = function () {
            return this.New(this.n.negated());
        };
        UnitNumber.prototype.plus = function (value) {
            if (value instanceof UnitNumber) {
                var right = value;
                if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
                    return this.New(this.n.add(right.n));
                }
                if (this.unit.id !== right.unit.id) {
                    return right.New(this.n.add(right.n));
                }
                return right.New(this.convert(right.ratio(), right.bias()).add(right.n));
            }
            return this.New(this.n.plus(value.n));
        };
        UnitNumber.prototype.mul = function (value) {
            if (value instanceof UnitNumber) {
                var right = value;
                if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
                    return this.New(this.n.mul(right.n));
                }
                if (this.unit.id !== right.unit.id) {
                    return right.New(this.n.mul(right.n));
                }
                return right.New(this.convert(right.ratio(), right.bias()).mul(right.n));
            }
            return this.New(this.n.mul(value.n));
        };
        UnitNumber.prototype.div = function (value) {
            var left;
            var right;
            if (this.lf) {
                left = this;
                right = value;
            }
            else {
                right = this;
                left = value;
            }
            if (value instanceof UnitNumber) {
                var left1 = left;
                var right1 = right;
                if (left1.unit.unitType === right1.unit.unitType) {
                    return left1.New(left1.n.div(right1.n));
                }
                if (left1.unit.id !== right1.unit.id) {
                    return left1.New(left1.n.div(right.n));
                }
                return left1.New(left1.n.div(right1.convert(left1.ratio(), left1.bias())));
            }
            return this.New(left.n.div(right.n));
        };
        UnitNumber.prototype.pow = function (value) {
            var left;
            var right;
            if (this.lf) {
                left = this;
                right = value;
            }
            else {
                right = this;
                left = value;
            }
            if (value instanceof UnitNumber) {
                var left1 = left;
                var right1 = right;
                if (left1.unit.unitType === right1.unit.unitType) {
                    return left1.New(left1.n.pow(right1.n));
                }
                if (left1.unit.id !== right1.unit.id) {
                    return left1.New(left1.n.pow(right.n));
                }
                return left1.New(left1.n.pow(right1.convert(left1.ratio(), left1.bias())));
            }
            return this.New(left.n.pow(right.n));
        };
        UnitNumber.prototype.mod = function (value) {
            var left;
            var right;
            if (this.lf) {
                left = this;
                right = value;
            }
            else {
                right = this;
                left = value;
            }
            if (value instanceof UnitNumber) {
                var left1 = left;
                var right1 = right;
                if (left1.unit.id !== right1.unit.id) {
                    return left1.New(left1.n.mod(right1.n));
                }
                if (left1.unit.unitType === right1.unit.unitType) {
                    return left1.New(left1.n.mod(right1.n));
                }
                return left1.New(left1.n.mod(right1.convert(left1.ratio(), left1.bias())));
            }
            return this.New(left.n.mod(right.n));
        };
        UnitNumber.prototype.convert = function (ratio, bias) {
            return this.n
                .mul(this.ratio())
                .add(this.bias())
                .minus(bias)
                .div(ratio);
        };
        UnitNumber.prototype.ratio = function () {
            return this.unit.ratio();
        };
        UnitNumber.prototype.bias = function () {
            return this.unit.bias();
        };
        UnitNumber.prototype.print = function () {
            if (this.n.lessThanOrEqualTo(1) && !this.n.isNegative()) {
                return this.toNumericString() + " " + this.unit.singular;
            }
            return this.toNumericString() + " " + this.unit.plural;
        };
        return UnitNumber;
    }(Numberic));
    Type.UnitNumber = UnitNumber;
})(Type = exports.Type || (exports.Type = {}));
exports.Type = Type;

},{"./numberSystem":15,"decimal.js":18}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberSystem = /** @class */ (function () {
    function NumberSystem(to) {
        this.to = to;
    }
    NumberSystem.Decimal = new NumberSystem(function (num) {
        return num.toString();
    });
    NumberSystem.HexaDecimal = new NumberSystem(function (num) {
        return num.toHexadecimal();
    });
    NumberSystem.Binary = new NumberSystem(function (num) {
        return num.toBinary();
    });
    NumberSystem.Octal = new NumberSystem(function (num) {
        return num.toOctal();
    });
    return NumberSystem;
}());
exports.NumberSystem = NumberSystem;
// // tslint:disable-next-line: no-namespace
// export namespace NumberSystem {
//   class
// }

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FcalError_1 = require("../FcalError");
var Phrases = /** @class */ (function () {
    function Phrases() {
        this.phrases = {};
    }
    Phrases.prototype.push = function (key, phrases) {
        for (var _i = 0, phrases_1 = phrases; _i < phrases_1.length; _i++) {
            var phrase = phrases_1[_i];
            if (this.phrases.hasOwnProperty(phrase.toUpperCase())) {
                FcalError_1.FcalError.throwWithoutCtx("phrases already exits");
            }
            this.phrases[phrase.toUpperCase()] = key;
        }
    };
    Phrases.prototype.get = function (key) {
        return this.phrases[key.toUpperCase()];
    };
    return Phrases;
}());
exports.Phrases = Phrases;

},{"../FcalError":1}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Big = require("decimal.js");
var FcalError_1 = require("../FcalError");
var UnitMeta = /** @class */ (function () {
    function UnitMeta(id, ratio, unitType) {
        this.id = id;
        this.r = ratio;
        this.b = new Big.Decimal(0);
        this.unitType = unitType;
        this.plural = unitType;
        this.singular = unitType;
    }
    UnitMeta.prototype.ratio = function () {
        if (this.r instanceof Big.Decimal) {
            return this.r;
        }
        return this.r();
    };
    UnitMeta.prototype.bias = function () {
        if (this.b instanceof Big.Decimal) {
            return this.b;
        }
        return this.b();
    };
    UnitMeta.prototype.setBias = function (value) {
        this.b = value;
    };
    UnitMeta.prototype.setPlural = function (value) {
        this.plural = value;
    };
    UnitMeta.prototype.setSingular = function (value) {
        this.singular = value;
    };
    return UnitMeta;
}());
exports.UnitMeta = UnitMeta;
/**
 * Represents unit with info
 */
var Unit = /** @class */ (function () {
    function Unit(id, ratio, unitType, phrases) {
        this.phrases = phrases;
        if (ratio instanceof Big.Decimal) {
            this.meta = new UnitMeta(id, ratio, unitType);
            return;
        }
        this.meta = new UnitMeta(id, new Big.Decimal(ratio), unitType);
    }
    Unit.prototype.setBias = function (value) {
        if (value instanceof Big.Decimal) {
            this.meta.setBias(value);
            return this;
        }
        this.meta.setBias(new Big.Decimal(value));
        return this;
    };
    Unit.prototype.Plural = function (value) {
        this.meta.setPlural(value);
        return this;
    };
    Unit.prototype.Singular = function (value) {
        this.meta.setSingular(value);
        return this;
    };
    return Unit;
}());
exports.Unit = Unit;
// tslint:disable-next-line:no-namespace
(function (Unit) {
    Unit.LENGTHID = 'LENGTH';
    Unit.SPEEDID = 'SPEED';
    Unit.TIMEID = 'TIME';
    Unit.TEMPERATUREID = 'TIMERATURE';
    /**
     * List of units
     */
    var List = /** @class */ (function () {
        function List() {
            this.units = {};
        }
        /**
         * Add a new unit
         * @param unit
         * @throws Error if phrases already exists
         */
        List.prototype.push = function (unit) {
            var phrase = this.check(unit.phrases);
            if (phrase) {
                FcalError_1.FcalError.throwWithoutCtx(phrase + " phrase already exists");
            }
            for (var _i = 0, _a = unit.phrases; _i < _a.length; _i++) {
                var phrase1 = _a[_i];
                this.units[phrase1] = unit;
            }
        };
        /**
         * check if unit already exists
         * @param phrases
         */
        List.prototype.check = function (phrases) {
            for (var _i = 0, phrases_1 = phrases; _i < phrases_1.length; _i++) {
                var phrase = phrases_1[_i];
                if (this.units.hasOwnProperty(phrase)) {
                    return phrase;
                }
            }
            return null;
        };
        /**
         * get the unit by its phrase
         * @param phrase
         */
        List.prototype.get = function (phrase) {
            if (this.units.hasOwnProperty(phrase)) {
                return this.units[phrase].meta;
            }
            return null;
        };
        return List;
    }());
    Unit.List = List;
})(Unit = exports.Unit || (exports.Unit = {}));
exports.Unit = Unit;

},{"../FcalError":1,"decimal.js":18}],18:[function(require,module,exports){
;(function (globalScope) {
  'use strict';


  /*
   *  decimal.js v10.2.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */


  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


    // The maximum exponent magnitude.
    // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
  var EXP_LIMIT = 9e15,                      // 0 to 9e15

    // The limit on the value of `precision`, and on the value of the first argument to
    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
    MAX_DIGITS = 1e9,                        // 0 to 1e9

    // Base conversion alphabet.
    NUMERALS = '0123456789abcdef',

    // The natural logarithm of 10 (1025 digits).
    LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

    // Pi (1025 digits).
    PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


    // The initial configuration properties of the Decimal constructor.
    DEFAULTS = {

      // These values must be integers within the stated ranges (inclusive).
      // Most of these values can be changed at run-time using the `Decimal.config` method.

      // The maximum number of significant digits of the result of a calculation or base conversion.
      // E.g. `Decimal.config({ precision: 20 });`
      precision: 20,                         // 1 to MAX_DIGITS

      // The rounding mode used when rounding to `precision`.
      //
      // ROUND_UP         0 Away from zero.
      // ROUND_DOWN       1 Towards zero.
      // ROUND_CEIL       2 Towards +Infinity.
      // ROUND_FLOOR      3 Towards -Infinity.
      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      //
      // E.g.
      // `Decimal.rounding = 4;`
      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
      rounding: 4,                           // 0 to 8

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP         0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN  6 The IEEE 754 remainder function.
      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
      //
      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
      // division (9) are commonly used for the modulus operation. The other rounding modes can also
      // be used, but they may not give useful results.
      modulo: 1,                             // 0 to 9

      // The exponent value at and beneath which `toString` returns exponential notation.
      // JavaScript numbers: -7
      toExpNeg: -7,                          // 0 to -EXP_LIMIT

      // The exponent value at and above which `toString` returns exponential notation.
      // JavaScript numbers: 21
      toExpPos:  21,                         // 0 to EXP_LIMIT

      // The minimum exponent value, beneath which underflow to zero occurs.
      // JavaScript numbers: -324  (5e-324)
      minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

      // The maximum exponent value, above which overflow to Infinity occurs.
      // JavaScript numbers: 308  (1.7976931348623157e+308)
      maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

      // Whether to use cryptographically-secure random number generation, if available.
      crypto: false                          // true/false
    },


  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


    Decimal, inexact, noConflict, quadrant,
    external = true,

    decimalError = '[DecimalError] ',
    invalidArgument = decimalError + 'Invalid argument: ',
    precisionLimitExceeded = decimalError + 'Precision limit exceeded',
    cryptoUnavailable = decimalError + 'crypto unavailable',

    mathfloor = Math.floor,
    mathpow = Math.pow,

    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

    BASE = 1e7,
    LOG_BASE = 7,
    MAX_SAFE_INTEGER = 9007199254740991,

    LN10_PRECISION = LN10.length - 1,
    PI_PRECISION = PI.length - 1,

    // Decimal.prototype object
    P = { name: '[object Decimal]' };


  // Decimal prototype methods


  /*
   *  absoluteValue             abs
   *  ceil
   *  comparedTo                cmp
   *  cosine                    cos
   *  cubeRoot                  cbrt
   *  decimalPlaces             dp
   *  dividedBy                 div
   *  dividedToIntegerBy        divToInt
   *  equals                    eq
   *  floor
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyperbolicCosine          cosh
   *  hyperbolicSine            sinh
   *  hyperbolicTangent         tanh
   *  inverseCosine             acos
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine     asinh
   *  inverseHyperbolicTangent  atanh
   *  inverseSine               asin
   *  inverseTangent            atan
   *  isFinite
   *  isInteger                 isInt
   *  isNaN
   *  isNegative                isNeg
   *  isPositive                isPos
   *  isZero
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 log
   *  [maximum]                 [max]
   *  [minimum]                 [min]
   *  minus                     sub
   *  modulo                    mod
   *  naturalExponential        exp
   *  naturalLogarithm          ln
   *  negated                   neg
   *  plus                      add
   *  precision                 sd
   *  round
   *  sine                      sin
   *  squareRoot                sqrt
   *  tangent                   tan
   *  times                     mul
   *  toBinary
   *  toDecimalPlaces           toDP
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal             toHex
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower                   pow
   *  toPrecision
   *  toSignificantDigits       toSD
   *  toString
   *  truncated                 trunc
   *  valueOf                   toJSON
   */


  /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */
  P.absoluteValue = P.abs = function () {
    var x = new this.constructor(this);
    if (x.s < 0) x.s = 1;
    return finalise(x);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */
  P.ceil = function () {
    return finalise(new this.constructor(this), this.e + 1, 2);
  };


  /*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */
  P.comparedTo = P.cmp = function (y) {
    var i, j, xdL, ydL,
      x = this,
      xd = x.d,
      yd = (y = new x.constructor(y)).d,
      xs = x.s,
      ys = y.s;

    // Either NaN or ±Infinity?
    if (!xd || !yd) {
      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }

    // Either zero?
    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

    // Signs differ?
    if (xs !== ys) return xs;

    // Compare exponents.
    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

    xdL = xd.length;
    ydL = yd.length;

    // Compare digit by digit.
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }

    // Compare lengths.
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };


  /*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)         = 1
   * cos(-0)        = 1
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)       = NaN
   *
   */
  P.cosine = P.cos = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.d) return new Ctor(NaN);

    // cos(0) = cos(-0) = 1
    if (!x.d[0]) return new Ctor(1);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;

    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };


  /*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */
  P.cubeRoot = P.cbrt = function () {
    var e, m, n, r, rep, s, sd, t, t3, t3plusx,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    external = false;

    // Initial estimate.
    s = x.s * mathpow(x.s * x, 1 / 3);

     // Math.cbrt underflow/overflow?
     // Pass x to Math.pow as integer, then adjust the exponent of the result.
    if (!s || Math.abs(s) == 1 / 0) {
      n = digitsToString(x.d);
      e = x.e;

      // Adjust n exponent so it is a multiple of 3 away from x exponent.
      if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
      s = mathpow(n, 1 / 3);

      // Rarely, e may be one less than the result exponent value.
      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
      r.s = x.s;
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3;

    // Halley's method.
    // TODO? Compare Newton's method.
    for (;;) {
      t = r;
      t3 = t.times(t).times(t);
      t3plusx = t3.plus(x);
      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

      // TODO? Replace with for-loop and checkRoundingDigits.
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);

        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
        // , i.e. approaching a rounding boundary, continue the iteration.
        if (n == '9999' || !rep && n == '4999') {

          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {

          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;

    return finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return the number of decimal places of the value of this Decimal.
   *
   */
  P.decimalPlaces = P.dp = function () {
    var w,
      d = this.d,
      n = NaN;

    if (d) {
      w = d.length - 1;
      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last word.
      w = d[w];
      if (w) for (; w % 10 == 0; w /= 10) n--;
      if (n < 0) n = 0;
    }

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedBy = P.div = function (y) {
    return divide(this, new this.constructor(y));
  };


  /*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedToIntegerBy = P.divToInt = function (y) {
    var x = this,
      Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };


  /*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */
  P.equals = P.eq = function (y) {
    return this.cmp(y) === 0;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */
  P.floor = function () {
    return finalise(new this.constructor(this), this.e + 1, 3);
  };


  /*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */
  P.greaterThan = P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */
  P.greaterThanOrEqualTo = P.gte = function (y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
  };


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)         = 1
   * cosh(-0)        = 1
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)       = NaN
   *
   *  x        time taken (ms)   result
   * 1000      9                 9.8503555700852349694e+433
   * 10000     25                4.4034091128314607936e+4342
   * 100000    171               1.4033316802130615897e+43429
   * 1000000   3817              1.5166076984010437725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */
  P.hyperbolicCosine = P.cosh = function () {
    var k, n, pr, rm, len,
      x = this,
      Ctor = x.constructor,
      one = new Ctor(1);

    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero()) return one;

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;

    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

    // Estimate the optimum number of times to use the argument reduction.
    // TODO? Estimation reused from cosine() and may not be optimal here.
    if (len < 32) {
      k = Math.ceil(len / 3);
      n = (1 / tinyPow(4, k)).toString();
    } else {
      k = 16;
      n = '2.3283064365386962890625e-10';
    }

    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

    // Reverse argument reduction
    var cosh2_x,
      i = k,
      d8 = new Ctor(8);
    for (; i--;) {
      cosh2_x = x.times(x);
      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }

    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)         = 0
   * sinh(-0)        = -0
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)       = NaN
   *
   * x        time taken (ms)
   * 10       2 ms
   * 100      5 ms
   * 1000     14 ms
   * 10000    82 ms
   * 100000   886 ms            1.4033316802130615897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms          8.7080643612718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */
  P.hyperbolicSine = P.sinh = function () {
    var k, pr, rm, len,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;

    if (len < 3) {
      x = taylorSeries(Ctor, 2, x, x, true);
    } else {

      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
      // 3 multiplications and 1 addition

      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
      // 4 multiplications and 2 additions

      // Estimate the optimum number of times to use the argument reduction.
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;

      x = x.times(1 / tinyPow(5, k));
      x = taylorSeries(Ctor, 2, x, x, true);

      // Reverse argument reduction
      var sinh2_x,
        d5 = new Ctor(5),
        d16 = new Ctor(16),
        d20 = new Ctor(20);
      for (; k--;) {
        sinh2_x = x.times(x);
        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
    }

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)         = 0
   * tanh(-0)        = -0
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)       = NaN
   *
   */
  P.hyperbolicTangent = P.tanh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(x.s);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;

    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };


  /*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)       = pi/2
   * acos(-0)      = pi/2
   * acos(1)       = 0
   * acos(-1)      = pi
   * acos(1/2)     = pi/3
   * acos(-1/2)    = 2*pi/3
   * acos(|x| > 1) = NaN
   * acos(NaN)     = NaN
   *
   */
  P.inverseCosine = P.acos = function () {
    var halfPi,
      x = this,
      Ctor = x.constructor,
      k = x.abs().cmp(1),
      pr = Ctor.precision,
      rm = Ctor.rounding;

    if (k !== -1) {
      return k === 0
        // |x| is 1
        ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
        // |x| > 1 or x is NaN
        : new Ctor(NaN);
    }

    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

    Ctor.precision = pr + 6;
    Ctor.rounding = 1;

    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return halfPi.minus(x);
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)     = NaN
   * acosh(NaN)       = NaN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)         = NaN
   * acosh(-0)        = NaN
   * acosh(1)         = 0
   * acosh(-1)        = NaN
   *
   */
  P.inverseHyperbolicCosine = P.acosh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;

    x = x.times(x).minus(1).sqrt().plus(x);

    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)       = NaN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)         = 0
   * asinh(-0)        = -0
   *
   */
  P.inverseHyperbolicSine = P.asinh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;

    x = x.times(x).plus(1).sqrt().plus(x);

    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)       = NaN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)         = 0
   * atanh(-0)        = -0
   * atanh(1)         = Infinity
   * atanh(-1)        = -Infinity
   *
   */
  P.inverseHyperbolicTangent = P.atanh = function () {
    var pr, rm, wpr, xsd,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();

    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

    Ctor.precision = wpr = xsd - x.e;

    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

    Ctor.precision = pr + 4;
    Ctor.rounding = 1;

    x = x.ln();

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.times(0.5);
  };


  /*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)       = 0
   * asin(-0)      = -0
   * asin(1/2)     = pi/6
   * asin(-1/2)    = -pi/6
   * asin(1)       = pi/2
   * asin(-1)      = -pi/2
   * asin(|x| > 1) = NaN
   * asin(NaN)     = NaN
   *
   * TODO? Compare performance of Taylor series.
   *
   */
  P.inverseSine = P.asin = function () {
    var halfPi, k,
      pr, rm,
      x = this,
      Ctor = x.constructor;

    if (x.isZero()) return new Ctor(x);

    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;

    if (k !== -1) {

      // |x| is 1
      if (k === 0) {
        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
        halfPi.s = x.s;
        return halfPi;
      }

      // |x| > 1 or x is NaN
      return new Ctor(NaN);
    }

    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

    Ctor.precision = pr + 6;
    Ctor.rounding = 1;

    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.times(2);
  };


  /*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)         = 0
   * atan(-0)        = -0
   * atan(1)         = pi/4
   * atan(-1)        = -pi/4
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)       = NaN
   *
   */
  P.inverseTangent = P.atan = function () {
    var i, j, k, n, px, t, r, wpr, x2,
      x = this,
      Ctor = x.constructor,
      pr = Ctor.precision,
      rm = Ctor.rounding;

    if (!x.isFinite()) {
      if (!x.s) return new Ctor(NaN);
      if (pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.5);
        r.s = x.s;
        return r;
      }
    } else if (x.isZero()) {
      return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.25);
      r.s = x.s;
      return r;
    }

    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;

    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

    // Argument reduction
    // Ensure |x| < 0.42
    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

    k = Math.min(28, wpr / LOG_BASE + 2 | 0);

    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

    external = false;

    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;

    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
    for (; i !== -1;) {
      px = px.times(x2);
      t = r.minus(px.div(n += 2));

      px = px.times(x2);
      r = t.plus(px.div(n += 2));

      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
    }

    if (k) r = r.times(2 << (k - 1));

    external = true;

    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */
  P.isFinite = function () {
    return !!this.d;
  };


  /*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */
  P.isInteger = P.isInt = function () {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };


  /*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */
  P.isNegative = P.isNeg = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */
  P.isPositive = P.isPos = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */
  P.isZero = function () {
    return !!this.d && this.d[0] === 0;
  };


  /*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */
  P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */
  P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */
  P.logarithm = P.log = function (base) {
    var isBase10, d, denominator, k, inf, num, sd, r,
      arg = this,
      Ctor = arg.constructor,
      pr = Ctor.precision,
      rm = Ctor.rounding,
      guard = 5;

    // Default base is 10.
    if (base == null) {
      base = new Ctor(10);
      isBase10 = true;
    } else {
      base = new Ctor(base);
      d = base.d;

      // Return NaN if base is negative, or non-finite, or is 0 or 1.
      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

      isBase10 = base.eq(10);
    }

    d = arg.d;

    // Is arg negative, non-finite, 0 or 1?
    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    }

    // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
    // integer power of 10.
    if (isBase10) {
      if (d.length > 1) {
        inf = true;
      } else {
        for (k = d[0]; k % 10 === 0;) k /= 10;
        inf = k !== 1;
      }
    }

    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

    // The result will have 5 rounding digits.
    r = divide(num, denominator, sd, 1);

    // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
    // calculate 10 further digits.
    //
    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
    // that the result is above or below the boundary. Otherwise, if after calculating the 10
    // further digits, the last 14 are nines, round up and assume the result is exact.
    // Also assume the result is exact if the last 14 are zero.
    //
    // Example of a result that will be incorrectly rounded:
    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
    // place is still 2.6.
    if (checkRoundingDigits(r.d, k = pr, rm)) {

      do {
        sd += 10;
        num = naturalLogarithm(arg, sd);
        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
        r = divide(num, denominator, sd, 1);

        if (!inf) {

          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }

          break;
        }
      } while (checkRoundingDigits(r.d, k += 10, rm));
    }

    external = true;

    return finalise(r, pr, rm);
  };


  /*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'lt');
  };
   */


  /*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'gt');
  };
   */


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.minus = P.sub = function (y) {
    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // If either is not finite...
    if (!x.d || !y.d) {

      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN);

      // Return y negated if x is finite and y is ±Infinity.
      else if (x.d) y.s = -y.s;

      // Return x if y is finite and x is ±Infinity.
      // Return x if both are ±Infinity with different signs.
      // Return NaN if both are ±Infinity with the same sign.
      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

      return y;
    }

    // If signs differ...
    if (x.s != y.s) {
      y.s = -y.s;
      return x.plus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;

    // If either is zero...
    if (!xd[0] || !yd[0]) {

      // Return y negated if x is zero and y is non-zero.
      if (yd[0]) y.s = -y.s;

      // Return x if y is zero and x is non-zero.
      else if (xd[0]) y = new Ctor(x);

      // Return zero if both are zero.
      // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
      else return new Ctor(rm === 3 ? -0 : 0);

      return external ? finalise(y, pr, rm) : y;
    }

    // x and y are finite, non-zero numbers with the same sign.

    // Calculate base 1e7 exponents.
    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);

    xd = xd.slice();
    k = xe - e;

    // If base 1e7 exponents differ...
    if (k) {
      xLTy = k < 0;

      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }

      // Numbers with massively different exponents would result in a very high number of
      // zeros needing to be prepended, but this can be avoided while still ensuring correct
      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

      if (k > i) {
        k = i;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents.
      d.reverse();
      for (i = k; i--;) d.push(0);
      d.reverse();

    // Base 1e7 exponents equal.
    } else {

      // Check digits to determine which is the bigger number.

      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;

      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }

      k = 0;
    }

    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }

    len = xd.length;

    // Append zeros to `xd` if shorter.
    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

    // Subtract yd from xd.
    for (i = yd.length; i > k;) {

      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }

      xd[i] -= yd[i];
    }

    // Remove trailing zeros.
    for (; xd[--len] === 0;) xd.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xd[0] === 0; xd.shift()) --e;

    // Zero?
    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

    y.d = xd;
    y.e = getBase10Exponent(xd, e);

    return external ? finalise(y, pr, rm) : y;
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */
  P.modulo = P.mod = function (y) {
    var q,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

    // Return x if y is ±Infinity or x is ±0.
    if (!y.d || x.d && !x.d[0]) {
      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }

    // Prevent rounding of intermediate calculations.
    external = false;

    if (Ctor.modulo == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // result = x - q * y    where  0 <= result < abs(y)
      q = divide(x, y.abs(), 0, 3, 1);
      q.s *= y.s;
    } else {
      q = divide(x, y, 0, Ctor.modulo, 1);
    }

    q = q.times(y);

    external = true;

    return x.minus(q);
  };


  /*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.naturalExponential = P.exp = function () {
    return naturalExponential(this);
  };


  /*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.naturalLogarithm = P.ln = function () {
    return naturalLogarithm(this);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */
  P.negated = P.neg = function () {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.plus = P.add = function (y) {
    var carry, d, e, i, k, len, pr, rm, xd, yd,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // If either is not finite...
    if (!x.d || !y.d) {

      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN);

      // Return x if y is finite and x is ±Infinity.
      // Return x if both are ±Infinity with the same sign.
      // Return NaN if both are ±Infinity with different signs.
      // Return y if x is finite and y is ±Infinity.
      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

      return y;
    }

     // If signs differ...
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;

    // If either is zero...
    if (!xd[0] || !yd[0]) {

      // Return x if y is zero.
      // Return y if y is non-zero.
      if (!yd[0]) y = new Ctor(x);

      return external ? finalise(y, pr, rm) : y;
    }

    // x and y are finite, non-zero numbers with the same sign.

    // Calculate base 1e7 exponents.
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);

    xd = xd.slice();
    i = k - e;

    // If base 1e7 exponents differ...
    if (i) {

      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }

      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;

      if (i > len) {
        i = len;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
      d.reverse();
      for (; i--;) d.push(0);
      d.reverse();
    }

    len = xd.length;
    i = yd.length;

    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }

    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
    for (carry = 0; i;) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }

    if (carry) {
      xd.unshift(carry);
      ++e;
    }

    // Remove trailing zeros.
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    for (len = xd.length; xd[--len] == 0;) xd.pop();

    y.d = xd;
    y.e = getBase10Exponent(xd, e);

    return external ? finalise(y, pr, rm) : y;
  };


  /*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */
  P.precision = P.sd = function (z) {
    var k,
      x = this;

    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

    if (x.d) {
      k = getPrecision(x.d);
      if (z && x.e + 1 > k) k = x.e + 1;
    } else {
      k = NaN;
    }

    return k;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */
  P.round = function () {
    var x = this,
      Ctor = x.constructor;

    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };


  /*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)         = 0
   * sin(-0)        = -0
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)       = NaN
   *
   */
  P.sine = P.sin = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;

    x = sine(Ctor, toLessThanHalfPi(Ctor, x));

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, sd, r, rep, t,
      x = this,
      d = x.d,
      e = x.e,
      s = x.s,
      Ctor = x.constructor;

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !d || !d[0]) {
      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }

    external = false;

    // Initial estimate.
    s = Math.sqrt(+x);

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(d);

      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3;

    // Newton-Raphson iteration.
    for (;;) {
      t = r;
      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

      // TODO? Replace with for-loop and checkRoundingDigits.
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);

        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
        // 4999, i.e. approaching a rounding boundary, continue the iteration.
        if (n == '9999' || !rep && n == '4999') {

          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {

          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;

    return finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)         = 0
   * tan(-0)        = -0
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)       = NaN
   *
   */
  P.tangent = P.tan = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;

    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */
  P.times = P.mul = function (y) {
    var carry, e, i, k, r, rL, t, xdL, ydL,
      x = this,
      Ctor = x.constructor,
      xd = x.d,
      yd = (y = new Ctor(y)).d;

    y.s *= x.s;

     // If either is NaN, ±Infinity or ±0...
    if (!xd || !xd[0] || !yd || !yd[0]) {

      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

        // Return NaN if either is NaN.
        // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
        ? NaN

        // Return ±Infinity if either is ±Infinity.
        // Return ±0 if either is ±0.
        : !xd || !yd ? y.s / 0 : y.s * 0);
    }

    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;

    // Ensure xd points to the longer array.
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }

    // Initialise the result array with zeros.
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--;) r.push(0);

    // Multiply!
    for (i = ydL; --i >= 0;) {
      carry = 0;
      for (k = xdL + i; k > i;) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }

      r[k] = (r[k] + carry) % BASE | 0;
    }

    // Remove trailing zeros.
    for (; !r[--rL];) r.pop();

    if (carry) ++e;
    else r.shift();

    y.d = r;
    y.e = getBase10Exponent(r, e);

    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };


  /*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toBinary = function (sd, rm) {
    return toStringBinary(this, 2, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toDecimalPlaces = P.toDP = function (dp, rm) {
    var x = this,
      Ctor = x.constructor;

    x = new Ctor(x);
    if (dp === void 0) return x;

    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    return finalise(x, dp + x.e + 1, rm);
  };


  /*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toExponential = function (dp, rm) {
    var str,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = finalise(new Ctor(x), dp + 1, rm);
      str = finiteToString(x, true, dp + 1);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */
  P.toFixed = function (dp, rm) {
    var str, y,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      y = finalise(new Ctor(x), dp + x.e + 1, rm);
      str = finiteToString(y, false, dp + y.e + 1);
    }

    // To determine whether to add the minus sign look at the value before it was rounded,
    // i.e. look at `x` rather than `y`.
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */
  P.toFraction = function (maxD) {
    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
      x = this,
      xd = x.d,
      Ctor = x.constructor;

    if (!xd) return new Ctor(x);

    n1 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);

    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

    if (maxD == null) {

      // d is 10**e, the minimum max-denominator needed.
      maxD = e > 0 ? d : n1;
    } else {
      n = new Ctor(maxD);
      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
    }

    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;

    for (;;)  {
      q = divide(n, d, 0, 1, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.cmp(maxD) == 1) break;
      d0 = d1;
      d1 = d2;
      d2 = n1;
      n1 = n0.plus(q.times(d2));
      n0 = d2;
      d2 = d;
      d = n.minus(q.times(d2));
      n = d2;
    }

    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;

    // Determine which fraction is closer to x, n0/d0 or n1/d1?
    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
        ? [n1, d1] : [n0, d0];

    Ctor.precision = pr;
    external = true;

    return r;
  };


  /*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toHexadecimal = P.toHex = function (sd, rm) {
    return toStringBinary(this, 16, sd, rm);
  };


  /*
   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */
  P.toNearest = function (y, rm) {
    var x = this,
      Ctor = x.constructor;

    x = new Ctor(x);

    if (y == null) {

      // If x is not finite, return x.
      if (!x.d) return x;

      y = new Ctor(1);
      rm = Ctor.rounding;
    } else {
      y = new Ctor(y);
      if (rm === void 0) {
        rm = Ctor.rounding;
      } else {
        checkInt32(rm, 0, 8);
      }

      // If x is not finite, return x if y is not NaN, else NaN.
      if (!x.d) return y.s ? x : y;

      // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
      if (!y.d) {
        if (y.s) y.s = x.s;
        return y;
      }
    }

    // If y is not zero, calculate the nearest multiple of y to x.
    if (y.d[0]) {
      external = false;
      x = divide(x, y, 0, rm, 1).times(y);
      external = true;
      finalise(x);

    // If y is zero, return zero with the sign of x.
    } else {
      y.s = x.s;
      x = y;
    }

    return x;
  };


  /*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */
  P.toNumber = function () {
    return +this;
  };


  /*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toOctal = function (sd, rm) {
    return toStringBinary(this, 8, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)                           = NaN
   *   pow(x, ±0)                            = 1

   *   pow(NaN, non-zero)                    = NaN
   *   pow(abs(x) > 1, +Infinity)            = +Infinity
   *   pow(abs(x) > 1, -Infinity)            = +0
   *   pow(abs(x) == 1, ±Infinity)           = NaN
   *   pow(abs(x) < 1, +Infinity)            = +0
   *   pow(abs(x) < 1, -Infinity)            = +Infinity
   *   pow(+Infinity, y > 0)                 = +Infinity
   *   pow(+Infinity, y < 0)                 = +0
   *   pow(-Infinity, odd integer > 0)       = -Infinity
   *   pow(-Infinity, even integer > 0)      = +Infinity
   *   pow(-Infinity, odd integer < 0)       = -0
   *   pow(-Infinity, even integer < 0)      = +0
   *   pow(+0, y > 0)                        = +0
   *   pow(+0, y < 0)                        = +Infinity
   *   pow(-0, odd integer > 0)              = -0
   *   pow(-0, even integer > 0)             = +0
   *   pow(-0, odd integer < 0)              = -Infinity
   *   pow(-0, even integer < 0)             = +Infinity
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */
  P.toPower = P.pow = function (y) {
    var e, k, pr, r, rm, s,
      x = this,
      Ctor = x.constructor,
      yn = +(y = new Ctor(y));

    // Either ±Infinity, NaN or ±0?
    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

    x = new Ctor(x);

    if (x.eq(1)) return x;

    pr = Ctor.precision;
    rm = Ctor.rounding;

    if (y.eq(1)) return finalise(x, pr, rm);

    // y exponent
    e = mathfloor(y.e / LOG_BASE);

    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = intPow(Ctor, x, k, pr);
      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }

    s = x.s;

    // if x is negative
    if (s < 0) {

      // if y is not an integer
      if (e < y.d.length - 1) return new Ctor(NaN);

      // Result is positive if x is negative and the last digit of integer y is even.
      if ((y.d[e] & 1) == 0) s = 1;

      // if x.eq(-1)
      if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
        x.s = s;
        return x;
      }
    }

    // Estimate result exponent.
    // x^y = 10^e,  where e = y * log10(x)
    // log10(x) = log10(x_significand) + x_exponent
    // log10(x_significand) = ln(x_significand) / ln(10)
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k)
      ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
      : new Ctor(k + '').e;

    // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

    // Overflow/underflow?
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

    external = false;
    Ctor.rounding = x.s = 1;

    // Estimate the extra guard digits needed to ensure five correct rounding digits from
    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
    // new Decimal(2.32456).pow('2087987436534566.46411')
    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
    k = Math.min(12, (e + '').length);

    // r = x^y = exp(y*ln(x))
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

    // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
    if (r.d) {

      // Truncate to the required precision plus five rounding digits.
      r = finalise(r, pr + 5, 1);

      // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
      // the result.
      if (checkRoundingDigits(r.d, pr, rm)) {
        e = pr + 10;

        // Truncate to the increased precision plus five rounding digits.
        r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

        // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
        if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
      }
    }

    r.s = s;
    external = true;
    Ctor.rounding = rm;

    return finalise(r, pr, rm);
  };


  /*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toPrecision = function (sd, rm) {
    var str,
      x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = finalise(new Ctor(x), sd, rm);
      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */
  P.toSignificantDigits = P.toSD = function (sd, rm) {
    var x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    }

    return finalise(new Ctor(x), sd, rm);
  };


  /*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */
  P.toString = function () {
    var x = this,
      Ctor = x.constructor,
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */
  P.truncated = P.trunc = function () {
    return finalise(new this.constructor(this), this.e + 1, 1);
  };


  /*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */
  P.valueOf = P.toJSON = function () {
    var x = this,
      Ctor = x.constructor,
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

    return x.isNeg() ? '-' + str : str;
  };


  /*
  // Add aliases to match BigDecimal method names.
  // P.add = P.plus;
  P.subtract = P.minus;
  P.multiply = P.times;
  P.divide = P.div;
  P.remainder = P.mod;
  P.compareTo = P.cmp;
  P.negate = P.neg;
   */


  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


  /*
   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *                           finiteToString, naturalExponential, naturalLogarithm
   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase              toStringBinary, parseOther
   *  cos                      P.cos
   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
   *                           taylorSeries, atan2, parseOther
   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
   *                           naturalLogarithm, ceil, floor, round, trunc
   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *                           toStringBinary
   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
   *  getLn10                  P.logarithm, naturalLogarithm
   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
   *  getPrecision             P.precision, P.toFraction
   *  getZeroString            digitsToString, finiteToString
   *  intPow                   P.toPower, parseOther
   *  isOdd                    toLessThanHalfPi
   *  maxOrMin                 max, min
   *  naturalExponential       P.naturalExponential, P.toPower
   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *                           P.toPower, naturalExponential
   *  nonFiniteToString        finiteToString, toStringBinary
   *  parseDecimal             Decimal
   *  parseOther               Decimal
   *  sin                      P.sin
   *  taylorSeries             P.cosh, P.sinh, cos, sin
   *  toLessThanHalfPi         P.cos, P.sin
   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
   *  truncate                 intPow
   *
   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
   *                           naturalLogarithm, config, parseOther, random, Decimal
   */


  function digitsToString(d) {
    var i, k, ws,
      indexOfLastWord = d.length - 1,
      str = '',
      w = d[0];

    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + '';
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }

      w = d[i];
      ws = w + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return '0';
    }

    // Remove trailing zeros of last w.
    for (; w % 10 === 0;) w /= 10;

    return str + w;
  }


  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }


  /*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */
  function checkRoundingDigits(d, i, rm, repeating) {
    var di, k, r, rd;

    // Get the length of the first word of the array d.
    for (k = d[0]; k >= 10; k /= 10) --i;

    // Is the rounding digit in the first word of d?
    if (--i < 0) {
      i += LOG_BASE;
      di = 0;
    } else {
      di = Math.ceil((i + 1) / LOG_BASE);
      i %= LOG_BASE;
    }

    // i is the index (0 - 6) of the rounding digit.
    // E.g. if within the word 3487563 the first rounding digit is 5,
    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;

    if (repeating == null) {
      if (i < 3) {
        if (i == 0) rd = rd / 100 | 0;
        else if (i == 1) rd = rd / 10 | 0;
        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
      } else {
        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
          (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
            (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
      }
    } else {
      if (i < 4) {
        if (i == 0) rd = rd / 1000 | 0;
        else if (i == 1) rd = rd / 100 | 0;
        else if (i == 2) rd = rd / 10 | 0;
        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
      } else {
        r = ((repeating || rm < 4) && rd + 1 == k ||
        (!repeating && rm > 3) && rd + 1 == k / 2) &&
          (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
      }
    }

    return r;
  }


  // Convert string of `baseIn` to an array of numbers of `baseOut`.
  // Eg. convertBase('255', 10, 16) returns [15, 15].
  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
  function convertBase(str, baseIn, baseOut) {
    var j,
      arr = [0],
      arrL,
      i = 0,
      strL = str.length;

    for (; i < strL;) {
      for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
      arr[0] += NUMERALS.indexOf(str.charAt(i++));
      for (j = 0; j < arr.length; j++) {
        if (arr[j] > baseOut - 1) {
          if (arr[j + 1] === void 0) arr[j + 1] = 0;
          arr[j + 1] += arr[j] / baseOut | 0;
          arr[j] %= baseOut;
        }
      }
    }

    return arr.reverse();
  }


  /*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */
  function cosine(Ctor, x) {
    var k, y,
      len = x.d.length;

    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

    // Estimate the optimum number of times to use the argument reduction.
    if (len < 32) {
      k = Math.ceil(len / 3);
      y = (1 / tinyPow(4, k)).toString();
    } else {
      k = 16;
      y = '2.3283064365386962890625e-10';
    }

    Ctor.precision += k;

    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

    // Reverse argument reduction
    for (var i = k; i--;) {
      var cos2x = x.times(x);
      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }

    Ctor.precision -= k;

    return x;
  }


  /*
   * Perform division in the specified base.
   */
  var divide = (function () {

    // Assumes non-zero x and k, and hence non-zero result.
    function multiplyInteger(x, k, base) {
      var temp,
        carry = 0,
        i = x.length;

      for (x = x.slice(); i--;) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
      }

      if (carry) x.unshift(carry);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, r;

      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return r;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1;) a.shift();
    }

    return function (x, y, pr, rm, dp, base) {
      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
        yL, yz,
        Ctor = x.constructor,
        sign = x.s == y.s ? 1 : -1,
        xd = x.d,
        yd = y.d;

      // Either NaN, Infinity or 0?
      if (!xd || !xd[0] || !yd || !yd[0]) {

        return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
      }

      if (base) {
        logBase = 1;
        e = x.e - y.e;
      } else {
        base = BASE;
        logBase = LOG_BASE;
        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
      }

      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = [];

      // Result exponent may be one less than e.
      // The digit array of a Decimal from toStringBinary may have trailing zeros.
      for (i = 0; yd[i] == (xd[i] || 0); i++);

      if (yd[i] > (xd[i] || 0)) e--;

      if (pr == null) {
        sd = pr = Ctor.precision;
        rm = Ctor.rounding;
      } else if (dp) {
        sd = pr + (x.e - y.e) + 1;
      } else {
        sd = pr;
      }

      if (sd < 0) {
        qd.push(1);
        more = true;
      } else {

        // Convert precision in number of base 10 digits to base 1e7 digits.
        sd = sd / logBase + 2 | 0;
        i = 0;

        // divisor < 1e7
        if (yL == 1) {
          k = 0;
          yd = yd[0];
          sd++;

          // k is the carry.
          for (; (i < xL || k) && sd--; i++) {
            t = k * base + (xd[i] || 0);
            qd[i] = t / yd | 0;
            k = t % yd | 0;
          }

          more = k || i < xL;

        // divisor >= 1e7
        } else {

          // Normalise xd and yd so highest order digit of yd is >= base/2
          k = base / (yd[0] + 1) | 0;

          if (k > 1) {
            yd = multiplyInteger(yd, k, base);
            xd = multiplyInteger(xd, k, base);
            yL = yd.length;
            xL = xd.length;
          }

          xi = yL;
          rem = xd.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL;) rem[remL++] = 0;

          yz = yd.slice();
          yz.unshift(0);
          yd0 = yd[0];

          if (yd[1] >= base / 2) ++yd0;

          do {
            k = 0;

            // Compare divisor and remainder.
            cmp = compare(yd, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, k.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // k will be how many times the divisor goes into the current remainder.
              k = rem0 / yd0 | 0;

              //  Algorithm:
              //  1. product = divisor * trial digit (k)
              //  2. if product > remainder: product -= divisor, k--
              //  3. remainder -= product
              //  4. if product was < remainder at 2:
              //    5. compare new remainder and divisor
              //    6. If remainder > divisor: remainder -= divisor, k++

              if (k > 1) {
                if (k >= base) k = base - 1;

                // product = divisor * trial digit.
                prod = multiplyInteger(yd, k, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                cmp = compare(prod, rem, prodL, remL);

                // product > remainder.
                if (cmp == 1) {
                  k--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
                }
              } else {

                // cmp is -1.
                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
                if (k == 0) cmp = k = 1;
                prod = yd.slice();
              }

              prodL = prod.length;
              if (prodL < remL) prod.unshift(0);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);

              // If product was < previous remainder.
              if (cmp == -1) {
                remL = rem.length;

                // Compare divisor and new remainder.
                cmp = compare(yd, rem, yL, remL);

                // If divisor < new remainder, subtract divisor from remainder.
                if (cmp < 1) {
                  k++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yd, remL, base);
                }
              }

              remL = rem.length;
            } else if (cmp === 0) {
              k++;
              rem = [0];
            }    // if cmp === 1, k will be 0

            // Add the next digit, k, to the result array.
            qd[i++] = k;

            // Update the remainder.
            if (cmp && rem[0]) {
              rem[remL++] = xd[xi] || 0;
            } else {
              rem = [xd[xi]];
              remL = 1;
            }

          } while ((xi++ < xL || rem[0] !== void 0) && sd--);

          more = rem[0] !== void 0;
        }

        // Leading zero?
        if (!qd[0]) qd.shift();
      }

      // logBase is 1 when divide is being used for base conversion.
      if (logBase == 1) {
        q.e = e;
        inexact = more;
      } else {

        // To calculate q.e, first get the number of digits of qd[0].
        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
        q.e = i + e * logBase - 1;

        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
      }

      return q;
    };
  })();


  /*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */
   function finalise(x, sd, rm, isTruncated) {
    var digits, i, j, k, rd, roundUp, w, xd, xdi,
      Ctor = x.constructor;

    // Don't round if sd is null or undefined.
    out: if (sd != null) {
      xd = x.d;

      // Infinity/NaN.
      if (!xd) return x;

      // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
      // w: the word of xd containing rd, a base 1e7 number.
      // xdi: the index of w within xd.
      // digits: the number of digits of w.
      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
      // they had leading zeros)
      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

      // Get the length of the first word of the digits array xd.
      for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
      i = sd - digits;

      // Is the rounding digit in the first word of xd?
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];

        // Get the rounding digit at index j of w.
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {

            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
            for (; k++ <= xdi;) xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];

          // Get the number of digits of w.
          for (digits = 1; k >= 10; k /= 10) digits++;

          // Get the index of rd within w.
          i %= LOG_BASE;

          // Get the index of rd within w, adjusted for leading zeros.
          // The number of leading zeros of w is given by LOG_BASE - digits.
          j = i - LOG_BASE + digits;

          // Get the rounding digit at index j of w.
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }

      // Are there any non-zero digits after the rounding digit?
      isTruncated = isTruncated || sd < 0 ||
        xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

      // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
      // will give 714.

      roundUp = rm < 4
        ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
        : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
            rm == (x.s < 0 ? 8 : 7));

      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {

          // Convert sd to decimal places.
          sd -= x.e + 1;

          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {

          // Zero.
          xd[0] = x.e = 0;
        }

        return x;
      }

      // Remove excess digits.
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);

        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
        // j > 0 means i > number of leading zeros of w.
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }

      if (roundUp) {
        for (;;) {

          // Is the digit to be rounded up in the first word of xd?
          if (xdi == 0) {

            // i will be the length of xd[0] before k is added.
            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10) k++;

            // if i != k the length has increased.
            if (i != k) {
              x.e++;
              if (xd[0] == BASE) xd[0] = 1;
            }

            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE) break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }

      // Remove trailing zeros.
      for (i = xd.length; xd[--i] === 0;) xd.pop();
    }

    if (external) {

      // Overflow?
      if (x.e > Ctor.maxE) {

        // Infinity.
        x.d = null;
        x.e = NaN;

      // Underflow?
      } else if (x.e < Ctor.minE) {

        // Zero.
        x.e = 0;
        x.d = [0];
        // Ctor.underflow = true;
      } // else Ctor.underflow = false;
    }

    return x;
  }


  function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x);
    var k,
      e = x.e,
      str = digitsToString(x.d),
      len = str.length;

    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + '.' + str.slice(1);
      }

      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
    } else if (e < 0) {
      str = '0.' + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += '.';
        str += getZeroString(k);
      }
    }

    return str;
  }


  // Calculate the base 10 exponent from the base 1e7 exponent.
  function getBase10Exponent(digits, e) {
    var w = digits[0];

    // Add the number of digits of the first word of the digits array.
    for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
    return e;
  }


  function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {

      // Reset global state in case the exception is caught.
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
  }


  function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
  }


  function getPrecision(digits) {
    var w = digits.length - 1,
      len = w * LOG_BASE + 1;

    w = digits[w];

    // If non-zero...
    if (w) {

      // Subtract the number of trailing zeros of the last word.
      for (; w % 10 == 0; w /= 10) len--;

      // Add the number of digits of the first word.
      for (w = digits[0]; w >= 10; w /= 10) len++;
    }

    return len;
  }


  function getZeroString(k) {
    var zs = '';
    for (; k--;) zs += '0';
    return zs;
  }


  /*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */
  function intPow(Ctor, x, n, pr) {
    var isTruncated,
      r = new Ctor(1),

      // Max n of 9007199254740991 takes 53 loop iterations.
      // Maximum digits array length; leaves [28, 34] guard digits.
      k = Math.ceil(pr / LOG_BASE + 4);

    external = false;

    for (;;) {
      if (n % 2) {
        r = r.times(x);
        if (truncate(r.d, k)) isTruncated = true;
      }

      n = mathfloor(n / 2);
      if (n === 0) {

        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
        n = r.d.length - 1;
        if (isTruncated && r.d[n] === 0) ++r.d[n];
        break;
      }

      x = x.times(x);
      truncate(x.d, k);
    }

    external = true;

    return r;
  }


  function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
  }


  /*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */
  function maxOrMin(Ctor, args, ltgt) {
    var y,
      x = new Ctor(args[0]),
      i = 0;

    for (; ++i < args.length;) {
      y = new Ctor(args[i]);
      if (!y.s) {
        x = y;
        break;
      } else if (x[ltgt](y)) {
        x = y;
      }
    }

    return x;
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)       = NaN
   *  exp(±0)        = 1
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */
  function naturalExponential(x, sd) {
    var denominator, guard, j, pow, sum, t, wpr,
      rep = 0,
      i = 0,
      k = 0,
      Ctor = x.constructor,
      rm = Ctor.rounding,
      pr = Ctor.precision;

    // 0/NaN/Infinity?
    if (!x.d || !x.d[0] || x.e > 17) {

      return new Ctor(x.d
        ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
        : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    t = new Ctor(0.03125);

    // while abs(x) >= 0.1
    while (x.e > -2) {

      // x = x / 2^5
      x = x.times(t);
      k += 5;
    }

    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
    // necessary to ensure the first 4 rounding digits are correct.
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(1);
    Ctor.precision = wpr;

    for (;;) {
      pow = finalise(pow.times(x), wpr, 1);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        j = k;
        while (j--) sum = finalise(sum.times(sum), wpr, 1);

        // Check to see if the first 4 rounding digits are [49]999.
        // If so, repeat the summation with a higher precision, otherwise
        // e.g. with precision: 18, rounding: 1
        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
        // `wpr - guard` is the index of first rounding digit.
        if (sd == null) {

          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += 10;
            denominator = pow = t = new Ctor(1);
            i = 0;
            rep++;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
    }
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)        = NaN
   *  ln(0)         = -Infinity
   *  ln(-0)        = -Infinity
   *  ln(1)         = 0
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)       = NaN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */
  function naturalLogarithm(y, sd) {
    var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
      n = 1,
      guard = 10,
      x = y,
      xd = x.d,
      Ctor = x.constructor,
      rm = Ctor.rounding,
      pr = Ctor.precision;

    // Is x negative or Infinity, NaN, 0 or 1?
    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);

    if (Math.abs(e = x.e) < 1.5e15) {

      // Argument reduction.
      // The series converges faster the closer the argument is to 1, so using
      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
      // later be divided by this number, then separate out the power of 10 using
      // ln(a*10^b) = ln(a) + b*ln(10).

      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
      // max n is 6 (gives 0.7 - 1.3)
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }

      e = x.e;

      if (c0 > 1) {
        x = new Ctor('0.' + c);
        e++;
      } else {
        x = new Ctor(c0 + '.' + c.slice(1));
      }
    } else {

      // The argument reduction method above may result in overflow if the argument y is a massive
      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
      // function using ln(x*10^e) = ln(x) + e*ln(10).
      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;

      return sd == null ? finalise(x, pr, rm, external = true) : x;
    }

    // x1 is x reduced to a value near 1.
    x1 = x;

    // Taylor series.
    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
    // where x = (y - 1)/(y + 1)    (|x| < 1)
    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;

    for (;;) {
      numerator = finalise(numerator.times(x2), wpr, 1);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2);

        // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
        sum = divide(sum, new Ctor(n), wpr, 1);

        // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
        // been repeated previously) and the first 4 rounding digits 9999?
        // If so, restart the summation with a higher precision, otherwise
        // e.g. with precision: 12, rounding: 1
        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
        // `wpr - guard` is the index of first rounding digit.
        if (sd == null) {
          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += guard;
            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = rep = 1;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
      denominator += 2;
    }
  }


  // ±Infinity, NaN.
  function nonFiniteToString(x) {
    // Unsigned.
    return String(x.s * x.s / 0);
  }


  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */
  function parseDecimal(x, str) {
    var e, i, len;

    // Decimal point?
    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

    // Exponential form?
    if ((i = str.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
    str = str.slice(i, len);

    if (str) {
      len -= i;
      x.e = e = e - i - 1;
      x.d = [];

      // Transform base

      // e is the base 10 exponent.
      // i is where to slice str to get the first word of the digits array.
      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;

      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }

      for (; i--;) str += '0';
      x.d.push(+str);

      if (external) {

        // Overflow?
        if (x.e > x.constructor.maxE) {

          // Infinity.
          x.d = null;
          x.e = NaN;

        // Underflow?
        } else if (x.e < x.constructor.minE) {

          // Zero.
          x.e = 0;
          x.d = [0];
          // x.constructor.underflow = true;
        } // else x.constructor.underflow = false;
      }
    } else {

      // Zero.
      x.e = 0;
      x.d = [0];
    }

    return x;
  }


  /*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */
  function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

    if (str === 'Infinity' || str === 'NaN') {
      if (!+str) x.s = NaN;
      x.e = NaN;
      x.d = null;
      return x;
    }

    if (isHex.test(str))  {
      base = 16;
      str = str.toLowerCase();
    } else if (isBinary.test(str))  {
      base = 2;
    } else if (isOctal.test(str))  {
      base = 8;
    } else {
      throw Error(invalidArgument + str);
    }

    // Is there a binary exponent part?
    i = str.search(/p/i);

    if (i > 0) {
      p = +str.slice(i + 1);
      str = str.substring(2, i);
    } else {
      str = str.slice(2);
    }

    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
    // fraction part will be restored.
    i = str.indexOf('.');
    isFloat = i >= 0;
    Ctor = x.constructor;

    if (isFloat) {
      str = str.replace('.', '');
      len = str.length;
      i = len - i;

      // log[10](16) = 1.2041... , log[10](88) = 1.9444....
      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }

    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;

    // Remove trailing zeros.
    for (i = xe; xd[i] === 0; --i) xd.pop();
    if (i < 0) return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;

    // At what precision to perform the division to ensure exact conversion?
    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
    // Therefore using 4 * the number of digits of str will always be enough.
    if (isFloat) x = divide(x, divisor, len * 4);

    // Multiply by the binary exponent part if present.
    if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
    external = true;

    return x;
  }


  /*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */
  function sine(Ctor, x) {
    var k,
      len = x.d.length;

    if (len < 3) return taylorSeries(Ctor, 2, x, x);

    // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

    // Estimate the optimum number of times to use the argument reduction.
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;

    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x);

    // Reverse argument reduction
    var sin2_x,
      d5 = new Ctor(5),
      d16 = new Ctor(16),
      d20 = new Ctor(20);
    for (; k--;) {
      sin2_x = x.times(x);
      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }

    return x;
  }


  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j, t, u, x2,
      i = 1,
      pr = Ctor.precision,
      k = Math.ceil(pr / LOG_BASE);

    external = false;
    x2 = x.times(x);
    u = new Ctor(y);

    for (;;) {
      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
      u = isHyperbolic ? y.plus(t) : y.minus(t);
      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
      t = u.plus(y);

      if (t.d[k] !== void 0) {
        for (j = k; t.d[j] === u.d[j] && j--;);
        if (j == -1) break;
      }

      j = u;
      u = y;
      y = t;
      t = j;
      i++;
    }

    external = true;
    t.d.length = k + 1;

    return t;
  }


  // Exponent e must be positive and non-zero.
  function tinyPow(b, e) {
    var n = b;
    while (--e) n *= b;
    return n;
  }


  // Return the absolute value of `x` reduced to less than or equal to half pi.
  function toLessThanHalfPi(Ctor, x) {
    var t,
      isNeg = x.s < 0,
      pi = getPi(Ctor, Ctor.precision, 1),
      halfPi = pi.times(0.5);

    x = x.abs();

    if (x.lte(halfPi)) {
      quadrant = isNeg ? 4 : 1;
      return x;
    }

    t = x.divToInt(pi);

    if (t.isZero()) {
      quadrant = isNeg ? 3 : 2;
    } else {
      x = x.minus(t.times(pi));

      // 0 <= x < pi
      if (x.lte(halfPi)) {
        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
        return x;
      }

      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
    }

    return x.minus(pi).abs();
  }


  /*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */
  function toStringBinary(x, baseOut, sd, rm) {
    var base, e, i, k, len, roundUp, str, xd, y,
      Ctor = x.constructor,
      isExp = sd !== void 0;

    if (isExp) {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    } else {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    }

    if (!x.isFinite()) {
      str = nonFiniteToString(x);
    } else {
      str = finiteToString(x);
      i = str.indexOf('.');

      // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
      // minBinaryExponent = floor(decimalExponent * log[2](10))
      // log[2](10) = 3.321928094887362347870319429489390175864

      if (isExp) {
        base = 2;
        if (baseOut == 16) {
          sd = sd * 4 - 3;
        } else if (baseOut == 8) {
          sd = sd * 3 - 2;
        }
      } else {
        base = baseOut;
      }

      // Convert the number as an integer then divide the result by its base raised to a power such
      // that the fraction part will be restored.

      // Non-integer.
      if (i >= 0) {
        str = str.replace('.', '');
        y = new Ctor(1);
        y.e = str.length - i;
        y.d = convertBase(finiteToString(y), 10, base);
        y.e = y.d.length;
      }

      xd = convertBase(str, 10, base);
      e = len = xd.length;

      // Remove trailing zeros.
      for (; xd[--len] == 0;) xd.pop();

      if (!xd[0]) {
        str = isExp ? '0p+0' : '0';
      } else {
        if (i < 0) {
          e--;
        } else {
          x = new Ctor(x);
          x.d = xd;
          x.e = e;
          x = divide(x, y, sd, rm, 0, base);
          xd = x.d;
          e = x.e;
          roundUp = inexact;
        }

        // The rounding digit, i.e. the digit after the digit that may be rounded up.
        i = xd[sd];
        k = base / 2;
        roundUp = roundUp || xd[sd + 1] !== void 0;

        roundUp = rm < 4
          ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
          : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
            rm === (x.s < 0 ? 8 : 7));

        xd.length = sd;

        if (roundUp) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (; ++xd[--sd] > base - 1;) {
            xd[sd] = 0;
            if (!sd) {
              ++e;
              xd.unshift(1);
            }
          }
        }

        // Determine trailing zeros.
        for (len = xd.length; !xd[len - 1]; --len);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

        // Add binary exponent suffix?
        if (isExp) {
          if (len > 1) {
            if (baseOut == 16 || baseOut == 8) {
              i = baseOut == 16 ? 4 : 3;
              for (--len; len % i; len++) str += '0';
              xd = convertBase(str, base, baseOut);
              for (len = xd.length; !xd[len - 1]; --len);

              // xd[0] will always be be 1
              for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
            } else {
              str = str.charAt(0) + '.' + str.slice(1);
            }
          }

          str =  str + (e < 0 ? 'p' : 'p+') + e;
        } else if (e < 0) {
          for (; ++e;) str = '0' + str;
          str = '0.' + str;
        } else {
          if (++e > len) for (e -= len; e-- ;) str += '0';
          else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
        }
      }

      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
    }

    return x.s < 0 ? '-' + str : str;
  }


  // Does not strip trailing zeros.
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }


  // Decimal methods


  /*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  set
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  tan
   *  tanh
   *  trunc
   */


  /*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function abs(x) {
    return new this(x).abs();
  }


  /*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function acos(x) {
    return new this(x).acos();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function acosh(x) {
    return new this(x).acosh();
  }


  /*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function add(x, y) {
    return new this(x).plus(y);
  }


  /*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function asin(x) {
    return new this(x).asin();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function asinh(x) {
    return new this(x).asinh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function atan(x) {
    return new this(x).atan();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function atanh(x) {
    return new this(x).atanh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)               = ±pi
   * atan2(±0, +0)               = ±0
   * atan2(±0, -x)               = ±pi for x > 0
   * atan2(±0, x)                = ±0 for x > 0
   * atan2(-y, ±0)               = -pi/2 for y > 0
   * atan2(y, ±0)                = pi/2 for y > 0
   * atan2(±y, -Infinity)        = ±pi for finite y > 0
   * atan2(±y, +Infinity)        = ±0 for finite y > 0
   * atan2(±Infinity, x)         = ±pi/2 for finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */
  function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r,
      pr = this.precision,
      rm = this.rounding,
      wpr = pr + 4;

    // Either NaN
    if (!y.s || !x.s) {
      r = new this(NaN);

    // Both ±Infinity
    } else if (!y.d && !x.d) {
      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
      r.s = y.s;

    // x is ±Infinity or y is ±0
    } else if (!x.d || y.isZero()) {
      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
      r.s = y.s;

    // y is ±Infinity or x is ±0
    } else if (!y.d || x.isZero()) {
      r = getPi(this, wpr, 1).times(0.5);
      r.s = y.s;

    // Both non-zero and finite
    } else if (x.s < 0) {
      this.precision = wpr;
      this.rounding = 1;
      r = this.atan(divide(y, x, wpr, 1));
      x = getPi(this, wpr, 1);
      this.precision = pr;
      this.rounding = rm;
      r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
      r = this.atan(divide(y, x, wpr, 1));
    }

    return r;
  }


  /*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function cbrt(x) {
    return new this(x).cbrt();
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */
  function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
  }


  /*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number}
   *   defaults   {true}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */
  function config(obj) {
    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
    var i, p, v,
      useDefaults = obj.defaults === true,
      ps = [
        'precision', 1, MAX_DIGITS,
        'rounding', 0, 8,
        'toExpNeg', -EXP_LIMIT, 0,
        'toExpPos', 0, EXP_LIMIT,
        'maxE', 0, EXP_LIMIT,
        'minE', -EXP_LIMIT, 0,
        'modulo', 0, 9
      ];

    for (i = 0; i < ps.length; i += 3) {
      if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
      if ((v = obj[p]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ': ' + v);
      }
    }

    if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (v === true || v === false || v === 0 || v === 1) {
        if (v) {
          if (typeof crypto != 'undefined' && crypto &&
            (crypto.getRandomValues || crypto.randomBytes)) {
            this[p] = true;
          } else {
            throw Error(cryptoUnavailable);
          }
        } else {
          this[p] = false;
        }
      } else {
        throw Error(invalidArgument + p + ': ' + v);
      }
    }

    return this;
  }


  /*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cos(x) {
    return new this(x).cos();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cosh(x) {
    return new this(x).cosh();
  }


  /*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */
  function clone(obj) {
    var i, p, ps;

    /*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */
    function Decimal(v) {
      var e, i, t,
        x = this;

      // Decimal called without new.
      if (!(x instanceof Decimal)) return new Decimal(v);

      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
      // which points to Object.
      x.constructor = Decimal;

      // Duplicate.
      if (v instanceof Decimal) {
        x.s = v.s;

        if (external) {
          if (!v.d || v.e > Decimal.maxE) {

            // Infinity.
            x.e = NaN;
            x.d = null;
          } else if (v.e < Decimal.minE) {

            // Zero.
            x.e = 0;
            x.d = [0];
          } else {
            x.e = v.e;
            x.d = v.d.slice();
          }
        } else {
          x.e = v.e;
          x.d = v.d ? v.d.slice() : v.d;
        }

        return;
      }

      t = typeof v;

      if (t === 'number') {
        if (v === 0) {
          x.s = 1 / v < 0 ? -1 : 1;
          x.e = 0;
          x.d = [0];
          return;
        }

        if (v < 0) {
          v = -v;
          x.s = -1;
        } else {
          x.s = 1;
        }

        // Fast path for small integers.
        if (v === ~~v && v < 1e7) {
          for (e = 0, i = v; i >= 10; i /= 10) e++;

          if (external) {
            if (e > Decimal.maxE) {
              x.e = NaN;
              x.d = null;
            } else if (e < Decimal.minE) {
              x.e = 0;
              x.d = [0];
            } else {
              x.e = e;
              x.d = [v];
            }
          } else {
            x.e = e;
            x.d = [v];
          }

          return;

        // Infinity, NaN.
        } else if (v * 0 !== 0) {
          if (!v) x.s = NaN;
          x.e = NaN;
          x.d = null;
          return;
        }

        return parseDecimal(x, v.toString());

      } else if (t !== 'string') {
        throw Error(invalidArgument + v);
      }

      // Minus sign?
      if ((i = v.charCodeAt(0)) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        // Plus sign?
        if (i === 43) v = v.slice(1);
        x.s = 1;
      }

      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }

    Decimal.prototype = P;

    Decimal.ROUND_UP = 0;
    Decimal.ROUND_DOWN = 1;
    Decimal.ROUND_CEIL = 2;
    Decimal.ROUND_FLOOR = 3;
    Decimal.ROUND_HALF_UP = 4;
    Decimal.ROUND_HALF_DOWN = 5;
    Decimal.ROUND_HALF_EVEN = 6;
    Decimal.ROUND_HALF_CEIL = 7;
    Decimal.ROUND_HALF_FLOOR = 8;
    Decimal.EUCLID = 9;

    Decimal.config = Decimal.set = config;
    Decimal.clone = clone;
    Decimal.isDecimal = isDecimalInstance;

    Decimal.abs = abs;
    Decimal.acos = acos;
    Decimal.acosh = acosh;        // ES6
    Decimal.add = add;
    Decimal.asin = asin;
    Decimal.asinh = asinh;        // ES6
    Decimal.atan = atan;
    Decimal.atanh = atanh;        // ES6
    Decimal.atan2 = atan2;
    Decimal.cbrt = cbrt;          // ES6
    Decimal.ceil = ceil;
    Decimal.cos = cos;
    Decimal.cosh = cosh;          // ES6
    Decimal.div = div;
    Decimal.exp = exp;
    Decimal.floor = floor;
    Decimal.hypot = hypot;        // ES6
    Decimal.ln = ln;
    Decimal.log = log;
    Decimal.log10 = log10;        // ES6
    Decimal.log2 = log2;          // ES6
    Decimal.max = max;
    Decimal.min = min;
    Decimal.mod = mod;
    Decimal.mul = mul;
    Decimal.pow = pow;
    Decimal.random = random;
    Decimal.round = round;
    Decimal.sign = sign;          // ES6
    Decimal.sin = sin;
    Decimal.sinh = sinh;          // ES6
    Decimal.sqrt = sqrt;
    Decimal.sub = sub;
    Decimal.tan = tan;
    Decimal.tanh = tanh;          // ES6
    Decimal.trunc = trunc;        // ES6

    if (obj === void 0) obj = {};
    if (obj) {
      if (obj.defaults !== true) {
        ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
        for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
      }
    }

    Decimal.config(obj);

    return Decimal;
  }


  /*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function div(x, y) {
    return new this(x).div(y);
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */
  function exp(x) {
    return new this(x).exp();
  }


  /*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */
  function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
  }


  /*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   * arguments {number|string|Decimal}
   *
   */
  function hypot() {
    var i, n,
      t = new this(0);

    external = false;

    for (i = 0; i < arguments.length;) {
      n = new this(arguments[i++]);
      if (!n.d) {
        if (n.s) {
          external = true;
          return new this(1 / 0);
        }
        t = n;
      } else if (t.d) {
        t = t.plus(n.times(n));
      }
    }

    external = true;

    return t.sqrt();
  }


  /*
   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
   * otherwise return false.
   *
   */
  function isDecimalInstance(obj) {
    return obj instanceof Decimal || obj && obj.name === '[object Decimal]' || false;
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function ln(x) {
    return new this(x).ln();
  }


  /*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */
  function log(x, y) {
    return new this(x).log(y);
  }


  /*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log2(x) {
    return new this(x).log(2);
  }


  /*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log10(x) {
    return new this(x).log(10);
  }


  /*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function max() {
    return maxOrMin(this, arguments, 'lt');
  }


  /*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function min() {
    return maxOrMin(this, arguments, 'gt');
  }


  /*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mod(x, y) {
    return new this(x).mod(y);
  }


  /*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mul(x, y) {
    return new this(x).mul(y);
  }


  /*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */
  function pow(x, y) {
    return new this(x).pow(y);
  }


  /*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */
  function random(sd) {
    var d, e, k, n,
      i = 0,
      r = new this(1),
      rd = [];

    if (sd === void 0) sd = this.precision;
    else checkInt32(sd, 1, MAX_DIGITS);

    k = Math.ceil(sd / LOG_BASE);

    if (!this.crypto) {
      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

    // Browsers supporting crypto.getRandomValues.
    } else if (crypto.getRandomValues) {
      d = crypto.getRandomValues(new Uint32Array(k));

      for (; i < k;) {
        n = d[i];

        // 0 <= n < 4294967296
        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
        if (n >= 4.29e9) {
          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
        } else {

          // 0 <= n <= 4289999999
          // 0 <= (n % 1e7) <= 9999999
          rd[i++] = n % 1e7;
        }
      }

    // Node.js supporting crypto.randomBytes.
    } else if (crypto.randomBytes) {

      // buffer
      d = crypto.randomBytes(k *= 4);

      for (; i < k;) {

        // 0 <= n < 2147483648
        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

        // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
        if (n >= 2.14e9) {
          crypto.randomBytes(4).copy(d, i);
        } else {

          // 0 <= n <= 2139999999
          // 0 <= (n % 1e7) <= 9999999
          rd.push(n % 1e7);
          i += 4;
        }
      }

      i = k / 4;
    } else {
      throw Error(cryptoUnavailable);
    }

    k = rd[--i];
    sd %= LOG_BASE;

    // Convert trailing digits to zeros according to sd.
    if (k && sd) {
      n = mathpow(10, LOG_BASE - sd);
      rd[i] = (k / n | 0) * n;
    }

    // Remove trailing words which are zero.
    for (; rd[i] === 0; i--) rd.pop();

    // Zero?
    if (i < 0) {
      e = 0;
      rd = [0];
    } else {
      e = -1;

      // Remove leading words which are zero and adjust exponent accordingly.
      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

      // Count the digits of the first word of rd to determine leading zeros.
      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

      // Adjust the exponent for leading zeros of the first word of rd.
      if (k < LOG_BASE) e -= LOG_BASE - k;
    }

    r.e = e;
    r.d = rd;

    return r;
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */
  function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
  }


  /*
   * Return
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   * x {number|string|Decimal}
   *
   */
  function sign(x) {
    x = new this(x);
    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
  }


  /*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sin(x) {
    return new this(x).sin();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sinh(x) {
    return new this(x).sinh();
  }


  /*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function sqrt(x) {
    return new this(x).sqrt();
  }


  /*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function sub(x, y) {
    return new this(x).sub(y);
  }


  /*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tan(x) {
    return new this(x).tan();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tanh(x) {
    return new this(x).tanh();
  }


  /*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */
  function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
  }


  // Create and configure initial Decimal constructor.
  Decimal = clone(DEFAULTS);

  Decimal['default'] = Decimal.Decimal = Decimal;

  // Create the internal constants from their string values.
  LN10 = new Decimal(LN10);
  PI = new Decimal(PI);


  // Export.


  // AMD.
  if (typeof define == 'function' && define.amd) {
    define(function () {
      return Decimal;
    });

  // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    if (typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
      P[Symbol.for('nodejs.util.inspect.custom')] = P.toString;
      P[Symbol.toStringTag] = 'Decimal';
    }

    module.exports = Decimal;

  // Browser.
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self ? self : window;
    }

    noConflict = globalScope.Decimal;
    Decimal.noConflict = function () {
      globalScope.Decimal = noConflict;
      return Decimal;
    };

    globalScope.Decimal = Decimal;
  }
})(this);

},{}]},{},[4])(4)
});
