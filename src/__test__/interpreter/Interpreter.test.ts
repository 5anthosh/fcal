import { Interpreter } from '../../interpreter/interpreter';
import { Type } from '../../type';
test('Test simple arithmetic operation', () => {
  const expression = '1+2+3*5-4*(1-2)/3.4 -(-1) +(+1)           +          1.000/1.000 + 1*(1)*(0.2)*(5)*(-1)*(--1)*(-1)';
  expect(new Interpreter(expression).evaluateExpression()).toStrictEqual(Type.Number('23.17647058823529411764'));
});

test('Test', () => {
  const expression = '1/0';
  expect(new Interpreter(expression).evaluateExpression()).toStrictEqual(Infinity);
});
