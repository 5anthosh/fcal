"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../../interpreter/interpreter");
const type_1 = require("../../type");
test('Test simple arithmetic operation', () => {
    const expression = '1+2+3*5-4*(1-2)/3.4 -(-1) +(+1)           +          1.000/1.000 + 1*(1)*(0.2)*(5)*(-1)*(--1)*(-1)';
    expect(new interpreter_1.Interpreter(expression).evaluateExpression()).toStrictEqual(type_1.Type.Number('23.17647058823529411764'));
});
test('Test', () => {
    const expression = '1/0';
    expect(new interpreter_1.Interpreter(expression).evaluateExpression()).toStrictEqual(Infinity);
});
//# sourceMappingURL=Interpreter.test.js.map