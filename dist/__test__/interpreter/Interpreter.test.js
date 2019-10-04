"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datetype_1 = require("../../datetype");
const fcal_1 = require("../../fcal");
const interpreter_1 = require("../../interpreter/interpreter");
test('Test simple arithmetic operation', () => {
    const expression = '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('24.412934840534418202'));
});
test('Test Divide By Zero', () => {
    const expression = '1/0 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('Infinity'));
});
test('Test Power result in imaginary number', () => {
    const expression = '(-2)^2.5 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('-5.6568542494923801952'));
});
test('Test phrases', () => {
    const expression = '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS1) + 1.000 / 1.000 + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('24.412934840534418202'));
});
test('test modulo', () => {
    const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5mod45   mod 1 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('2.0'));
});
test('test percentage addition', () => {
    const expression = '+(234)% + 1000 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('+3340'));
    const expression1 = '+(234)% + 1000% \n';
    expect(new interpreter_1.Interpreter(expression1, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.Percentage('1234'));
});
test('test percentage sub', () => {
    const expression = '-(234)% - 1000 - 0.25% \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('1336.65'));
    const expression1 = '-(234)% - (1000+23)% - 0.25% \n';
    expect(new interpreter_1.Interpreter(expression1, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.Percentage('-1257.25'));
});
test('test percentage divide and mulit', () => {
    const expression = '-24%*34 + (30 - 2*+(-2))%*24 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('-81.6'));
    const expression1 = '44%/600 ----4% + 10%/0.0003 - 23/2% \n';
    expect(new interpreter_1.Interpreter(expression1, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('-49.4424'));
    const expression2 = '1% + 2% + 3% * 5% - 4% * (1% - 2%) / 3.4% - (-1%) + (+1%) + 1.000% / 1.000% + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) * (-1%) + (1.23423%) ^ (2%) ^ 3% ^ -4% \n';
    expect(new interpreter_1.Interpreter(expression2, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.Percentage('24.412934840534418202'));
});
test('test percentage power and modulo', () => {
    const expression = '24% ^ (2^2%^2%^2) + 34 - 0.0023%^10 + 10^10% \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('44.229046038763679064'));
    const expression1 = '3% mod 500 + (0.23 mod 79%)% mod 7 \n';
    expect(new interpreter_1.Interpreter(expression1, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('15.003381'));
    const expression2 = '- (-1%) + (+1%) + 1.000% / 1.000% + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) + 4% mod 5%mod45%   mod 1% \n';
    expect(new interpreter_1.Interpreter(expression2, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.Percentage('2'));
});
test('test percentage of', () => {
    const expression = '24% of ((39 + 1) of 23) of 77* 34 \n';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(new datetype_1.Type.BNumber('57.80544'));
});
//# sourceMappingURL=Interpreter.test.js.map