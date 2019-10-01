import { Interpreter } from '../../interpreter/interpreter';
import { Type } from '../../type';
test('Test simple arithmetic operation', () => {
  const expression =
    '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4';
  expect(new Interpreter(expression).evaluateExpression()).toStrictEqual(Type.Number('24.412934840534418202'));
});

test('Test Divide By Zero', () => {
  const expression = '1/0';
  expect(new Interpreter(expression).evaluateExpression()).toStrictEqual(Type.Number('Infinity'));
});

test('Test Power result in imaginary number', () => {
  const expression = '(-2)^2.5';
  expect(new Interpreter(expression).evaluateExpression()).toStrictEqual(Type.Number('-5.6568542494923801952'));
});
