import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Percentage addition', () => {
  const expression = '+(234)% + 1000 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('+3340'));
  const expression1 = '+(234)% + 1000% ';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.Percentage('1234'));
});

test('Percentage sub', () => {
  const expression = '-(234)% - 1000 - 0.25% ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('1336.65'));
  const expression1 = '-(234)% - (1000+23)% - 0.25% ';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.Percentage('-1257.25'));
});

test('Percentage divide and mulitiplication', () => {
  const expression = '-24%*34 + (30 - 2*+(-2))%*24 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('-81.6'));

  const expression1 = '44%/600 ----4% + 10%/0.0003 - 23/2% ';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.BNumber('-49.4424'));

  expect(Fcal.eval('23 % // -1000')).toStrictEqual(Type.BNumber.New(0));

  expect(Fcal.eval('16%//10%/5%')).toStrictEqual(Type.Percentage.New(0.2));

  expect(Fcal.eval('120.3% // -1234')).toStrictEqual(Type.BNumber.New(1));

  const expression2 =
    '1% + 2% + 3% * 5% - 4% * (1% - 2%) / 3.4% - (-1%) + (+1%) + 1.000% / 1.000% \
    + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) * (-1%) + (1.23423%) ^ (2%) ^ 3% ^ -4% ';
  expect(Fcal.eval(expression2)).toStrictEqual(new Type.Percentage('24.412934840534418202'));
});

test('Percentage power and modulo', () => {
  const expression = '24% ^ (2^2%^2%^2) + 34 - 0.0023%^10 + 10^10% ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('44.229046038763679064'));
  const expression1 = '3% mod 500 + (0.23 mod 79%)% mod 7 ';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.BNumber('15.003381'));
  const expression2 =
    '- (-1%) + (+1%) + 1.000% / 1.000% + 1% mul (1%) * (0.2%) mul (5%) mul (-1%) mul (--1%) + 4% mod 5% mod 45%   mod 1% ';
  expect(Fcal.eval(expression2)).toStrictEqual(new Type.Percentage('2'));
});

test('Percentage of', () => {
  const expression = '24% of ((39 + 1) of 23) of 77* 34 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('57.80544'));
});
test('Percentage of with units', () => {
  const expression = '24% of ((39sec + 1day in sec) of 23min) of 77* 34 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('124916.110704'));
});

test('Percentage sub variable', () => {
  const expression = '-(f1)% - f2 - f3 ';
  const fcal = new Fcal();
  expect(fcal.evaluate('f1 : 234 ')).toStrictEqual(new Type.BNumber('234'));
  expect(fcal.evaluate('f2 : 1000 ')).toStrictEqual(new Type.BNumber('1000'));
  expect(fcal.evaluate('f3 = 0.25% ')).toStrictEqual(new Type.Percentage('0.25'));
  expect(fcal.evaluate(expression)).toStrictEqual(new Type.BNumber('1336.65'));
  expect(fcal.evaluate('f2 = (1000+23)% ')).toStrictEqual(new Type.Percentage('1023'));
  const expression1 = '-f1% - f2 - f3 ';
  expect(fcal.evaluate(expression1)).toStrictEqual(new Type.Percentage('-1257.25'));
});
