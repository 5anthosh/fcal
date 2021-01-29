import { Fcal } from '../fcal';

test('Number format', () => {
  const expression = '34535345323452345.3345345';
  expect(Fcal.eval(expression).toFormat()).toStrictEqual('34,535,345,323,452,345.3345345');
});

test('Percentage format', () => {
  const expression = '34535345323452345.3345345%';
  expect(Fcal.eval(expression).toFormat()).toStrictEqual('% 34,535,345,323,452,345.3345345');
});

test('Unit format', () => {
  const expression = '34535345323452345.3345345 cm';
  expect(Fcal.eval(expression).toFormat()).toStrictEqual('34,535,345,323,452,345.3345345 Centimeters');
});
