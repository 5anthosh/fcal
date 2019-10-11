"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultUnits_1 = require("../defaultUnits");
var fcal_1 = require("../fcal");
var lexError_1 = require("../lex/lexError");
var datatype_1 = require("../types/datatype");
test('Test simple arithmetic operation', function () {
    var expression = '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('24.412934840534418202'));
});
test('Test Divide By Zero', function () {
    var expression = '1/0 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('Infinity'));
});
test('Test Power result in imaginary number', function () {
    var expression = '(-2)^2.5 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('-5.6568542494923801952'));
});
test('Test phrases', function () {
    var expression = '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS1) + 1.000 / 1.000 + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('24.412934840534418202'));
});
test('test modulo', function () {
    var expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5mod45   mod 1 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('2.0'));
});
test('test percentage addition', function () {
    var expression = '+(234)% + 1000 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('+3340'));
    var expression1 = '+(234)% + 1000% \n';
    expect(new fcal_1.Fcal(expression1).evaluate()).toStrictEqual(new datatype_1.Type.Percentage('1234'));
});
test('test percentage sub', function () {
    var expression = '-(234)% - 1000 - 0.25% \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('1336.65'));
    var expression1 = '-(234)% - (1000+23)% - 0.25% \n';
    expect(new fcal_1.Fcal(expression1).evaluate()).toStrictEqual(new datatype_1.Type.Percentage('-1257.25'));
});
test('test percentage divide and mulit', function () {
    var expression = '-24%*34 + (30 - 2*+(-2))%*24 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('-81.6'));
    var expression1 = '44%/600 ----4% + 10%/0.0003 - 23/2% \n';
    expect(new fcal_1.Fcal(expression1).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('-49.4424'));
    var expression2 = '1% + 2% + 3% * 5% - 4% * (1% - 2%) / 3.4% - (-1%) + (+1%) + 1.000% / 1.000% + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) * (-1%) + (1.23423%) ^ (2%) ^ 3% ^ -4% \n';
    expect(new fcal_1.Fcal(expression2).evaluate()).toStrictEqual(new datatype_1.Type.Percentage('24.412934840534418202'));
});
test('test percentage power and modulo', function () {
    var expression = '24% ^ (2^2%^2%^2) + 34 - 0.0023%^10 + 10^10% \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('44.229046038763679064'));
    var expression1 = '3% mod 500 + (0.23 mod 79%)% mod 7 \n';
    expect(new fcal_1.Fcal(expression1).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('15.003381'));
    var expression2 = '- (-1%) + (+1%) + 1.000% / 1.000% + 1% x (1%) * (0.2%) x (5%) x (-1%) x (--1%) + 4% mod 5%mod45%   mod 1% \n';
    expect(new fcal_1.Fcal(expression2).evaluate()).toStrictEqual(new datatype_1.Type.Percentage('2'));
});
test('test percentage of', function () {
    var expression = '24% of ((39 + 1) of 23) of 77* 34 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('57.80544'));
});
test('test new line', function () {
    var expression = '    1 + \t 5 \t';
    expect(function () {
        new fcal_1.Fcal(expression).evaluate();
    }).toThrowError(new Error('Expecting new Line'));
    var expression1 = '1234+12341324123x34 \t \n $';
    expect(new fcal_1.Fcal(expression1).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('419605021416'));
});
test('Parser error Expect expression', function () {
    var expression = 'x123$\n';
    expect(function () {
        new fcal_1.Fcal(expression).evaluate();
    }).toThrowError(new Error('Expect expression but found x'));
});
test('Lex error unexpected character', function () {
    var expression = '123x123!\n';
    expect(function () {
        new fcal_1.Fcal(expression).evaluate();
    }).toThrow(new lexError_1.LexerError('Unexpected Identifier "!"'));
});
test('Test Time units addition', function () {
    var expression = '1 day + 23sec + 1hr \n';
    var unit;
    unit = defaultUnits_1.getdefaultTTypes().get('hr')[0];
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.Units('25.006388888888888889', unit));
});
test('Test Time units addition In operator', function () {
    var expression = '1 day + 1day +  23sec + 1hr in sec \n';
    var unit;
    unit = defaultUnits_1.getdefaultTTypes().get('sec')[0];
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.Units('176423', unit));
});
test('Test Time units addition In operator', function () {
    var expression = '1 day - 1day*23sec + 23sec + 1hr in sec \n';
    var unit;
    unit = defaultUnits_1.getdefaultTTypes().get('sec')[0];
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.Units('-1897177', unit));
});
test('Test invalid unit operations', function () {
    var expression = '1km + 2sec + 3mph * 5 - 4minute * (1 - 2) / 3.4inch - (-1) + (+1) + 1.000kmh / 1.000sec + 1 * (1) * (0.2) * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day \n';
    var unit;
    unit = defaultUnits_1.getdefaultTTypes().get('day')[0];
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.Units('24.412934840534418202', unit));
});
test('Test Time units addition In operator', function () {
    var expression = '1 day - 1day*23sec + 23sec + 1hr in sec + 1 sec / 1sec - 1sec * 1sec + 1sec ^ 1sec - 3sec mod 2sec\n';
    var unit;
    unit = defaultUnits_1.getdefaultTTypes().get('sec')[0];
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.Units('-1897177', unit));
});
test('test percentage of', function () {
    var expression = '24% of ((39sec + 1day in sec) of 23min) of 77* 34 \n';
    expect(new fcal_1.Fcal(expression).evaluate()).toStrictEqual(new datatype_1.Type.BNumber('124916.110704'));
});
//# sourceMappingURL=fcal.test.js.map