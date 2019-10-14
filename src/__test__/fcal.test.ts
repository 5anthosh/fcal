import { getdefaultTTypes } from '../defaultUnits';
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
test('Test simple arithmetic operation', () => {
  const expression =
    '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Test Divide By Zero', () => {
  const expression = '1/0';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('Infinity'));
});

test('Test Power result in imaginary number', () => {
  const expression = '(-2)^2.5';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('-5.6568542494923801952'));
});

test('Test phrases', () => {
  const expression =
    '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS 1) + 1.000 / 1.000 + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('test modulo', () => {
  const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5 mod 45   mod 1 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('2.0'));
});

test('test percentage addition', () => {
  const expression = '+(234)% + 1000 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('+3340'));
  const expression1 = '+(234)% + 1000% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.Percentage('1234'));
});

test('test percentage sub', () => {
  const expression = '-(234)% - 1000 - 0.25% ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('1336.65'));
  const expression1 = '-(234)% - (1000+23)% - 0.25% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.Percentage('-1257.25'));
});

test('test percentage divide and mulit', () => {
  const expression = '-24%*34 + (30 - 2*+(-2))%*24 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('-81.6'));

  const expression1 = '44%/600 ----4% + 10%/0.0003 - 23/2% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('-49.4424'));
  const expression2 =
    '1% + 2% + 3% * 5% - 4% * (1% - 2%) / 3.4% - (-1%) + (+1%) + 1.000% / 1.000% + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) * (-1%) + (1.23423%) ^ (2%) ^ 3% ^ -4% ';
  expect(new Fcal().evaluate(expression2)).toStrictEqual(new Type.Percentage('24.412934840534418202'));
});

test('test percentage power and modulo', () => {
  const expression = '24% ^ (2^2%^2%^2) + 34 - 0.0023%^10 + 10^10% ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('44.229046038763679064'));
  const expression1 = '3% mod 500 + (0.23 mod 79%)% mod 7 ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('15.003381'));
  const expression2 =
    '- (-1%) + (+1%) + 1.000% / 1.000% + 1% x (1%) * (0.2%) x (5%) x (-1%) x (--1%) + 4% mod 5% mod 45%   mod 1% ';
  expect(new Fcal().evaluate(expression2)).toStrictEqual(new Type.Percentage('2'));
});

test('test percentage of', () => {
  const expression = '24% of ((39 + 1) of 23) of 77* 34 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('57.80544'));
});

test('test new line', () => {
  // const expression = '    1 + \t 5 \t';
  // expect(() => {
  //   new Fcal().evaluate(expression);
  // }).toThrowError(new Error('Expecting new Line'));

  const expression1 = '1234+12341324123 x 34 \t \n $';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('419605021416'));
});

test('Parser error Expect expression', () => {
  const expression = 'x 123$';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrowError(new Error('Expect expression but found x'));
});

test('Lex error unexpected token', () => {
  const expression = '123 x 123!';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrow(new Error('Unexpected token !'));
});

test('Test Time units addition', () => {
  const expression = '1 day + 23sec + 1hr ';
  let unit;
  [unit] = getdefaultTTypes().get('hr');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('25.006388888888888889', unit));
  }
});

test('Test Time units addition In operator', () => {
  const expression = '1 day + 1day +  23sec + 1hr in sec ';
  let unit;
  [unit] = getdefaultTTypes().get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('176423', unit));
  }
});

test('Test Time units addition In operator', () => {
  const expression = '1 day - 1day*23sec + 23sec + 1hr in sec ';
  let unit;
  [unit] = getdefaultTTypes().get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('-1897177', unit));
  }
});

test('Test invalid unit operations', () => {
  const expression =
    '1km + 2sec + 3mph * 5 - 4minute * (1 - 2) / 3.4inch - (-1) + (+1) + 1.000kmh / 1.000sec + 1 * (1) * (0.2) * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day ';
  let unit;
  [unit] = getdefaultTTypes().get('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('24.412934840534418202', unit));
  }
});

test('Test Time units addition In operator', () => {
  const expression =
    '1 day - 1day*23sec + 23sec + 1hr in sec + 1 sec / 1sec - 1sec * 1sec + 1sec ^ 1sec - 3sec mod 2sec';
  let unit;
  [unit] = getdefaultTTypes().get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('-1897177', unit));
  }
});

test('test percentage of with units', () => {
  const expression = '24% of ((39sec + 1day in sec) of 23min) of 77* 34 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('124916.110704'));
});

test('test percentage sub variable', () => {
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

test('test PI area of the circle', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  expect(fcal.evaluate('radius: 20 ')).toStrictEqual(new Type.BNumber('20'));
  expect(fcal.evaluate(expression)).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Default functions', () => {
  const expression =
    'abs(-23) + log(123) - ln(0.23) * sqrt(12) / cbrt(60) ^ round(1.2344) mod ceil(2.7) + floor(23.6 cm)  ';
  let unit;
  [unit] = getdefaultTTypes().get('cm');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.Units('49.390359524782034541', unit));
  }
});

test('test Expression', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  fcal.setValues({ radius: new Type.BNumber('20') });
  const expr = fcal.expression(expression);
  const expr1 = fcal.expression('radius ');
  expr1.setValues({ radius: new Type.BNumber('21') });
  expect(expr1.evaluate()).toStrictEqual(new Type.BNumber('21'));
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('test set Values decimal', () => {
  const expression = 'l * b';
  const fcal = new Fcal();
  const expr = fcal.expression(expression);
  expr.setValues({ l: 10, b: 20 });
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber(200));
});
