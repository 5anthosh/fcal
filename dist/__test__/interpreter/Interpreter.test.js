"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../../interpreter/interpreter");
const fcal_1 = require("../../parser/fcal");
const type_1 = require("../../type");
test('Test simple arithmetic operation', () => {
    const expression = '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(type_1.Type.Number('24.412934840534418202'));
});
test('Test Divide By Zero', () => {
    const expression = '1/0';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(type_1.Type.Number('Infinity'));
});
test('Test Power result in imaginary number', () => {
    const expression = '(-2)^2.5';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(type_1.Type.Number('-5.6568542494923801952'));
});
test('Test phrases', () => {
    const expression = '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS1) + 1.000 / 1.000 + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(type_1.Type.Number('24.412934840534418202'));
});
test('test modulo', () => {
    const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5mod45   mod 1';
    expect(new interpreter_1.Interpreter(expression, fcal_1.Fcal.getdefaultphrases()).evaluateExpression()).toStrictEqual(type_1.Type.Number('2.0'));
});
//# sourceMappingURL=Interpreter.test.js.map