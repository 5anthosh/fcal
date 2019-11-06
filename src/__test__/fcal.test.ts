import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Simple arithmetic operation', () => {
  const expression =
    '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Divide By Zero', () => {
  const expression = '1/0';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('Infinity'));
});

test('Power result in imaginary number', () => {
  const expression = '(-2)^2.5';
  const error = 'Pow of operation results in complex number and complex is not supported yet';
  expect(() => {
    Fcal.eval(expression);
  }).toThrow(error);
});

test('Phrases', () => {
  const expression =
    '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS 1) + 1.000 / 1.000\
     + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Modulo Operation', () => {
  const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5 mod 45   mod 1 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('2.0'));
});

test('New line', () => {
  // const expression = '    1 + \t 5 \t';
  // expect(() => {
  //   Fcal.eval(expression);
  // }).toThrowError(new Error('Expecting new Line'));

  const expression1 = '1234+12341324123 * 34 \t \n $';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.BNumber('419605021416'));
});

test('Parser error Expect expression', () => {
  const expression = '* 123$';
  const error = new Error('Expect expression but found *');
  error.name = 'FcalError [0, 1]';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(error);
});

test('Lex error unexpected token', () => {
  const expression = '123 mul 123!';
  const error = new Error('Unexpected token !');
  error.name = 'FcalError [9, 10]';
  expect(() => {
    Fcal.eval(expression);
  }).toThrow(error);
});

test('PI area of the circle', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  expect(fcal.evaluate('radius: 20 ')).toStrictEqual(new Type.BNumber('20'));
  expect(fcal.evaluate(expression)).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Default functions', () => {
  const expression =
    'abs(-23) + log(123) - ln(0.23) * sqrt(12) / cbrt(60) ^ round(1.2344) mod ceil(2.7) + floor(23.6 cm)  ';
  const unit = Fcal.getUnit('cm');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('49.390359524782034541', unit));
  }

  const trigno =
    'cos(23 km) + acos(-0.5) sec + cosh(34cm) * acosh(1) ^ sin(0.23) \
    - asin(0.12341234) + sinh(0 mps) - asinh(8) + tan(45) - atan(45) ^ tanh(0.23 cm ) * atanh(0.7) cm';
  const unit2 = Fcal.getUnit('cm');
  expect(unit2).not.toEqual(null);
  if (unit2 != null) {
    expect(Fcal.eval(trigno)).toStrictEqual(new Type.UnitNumber('-0.67627697424654781499', unit2));
  }
});

test('Expression', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  fcal.setValues({ radius: new Type.BNumber('20') });
  const expr = fcal.expression(expression);
  const expr1 = fcal.expression('radius ');
  expr1.setValues({ radius: new Type.BNumber('21') });
  expect(expr1.evaluate()).toStrictEqual(new Type.BNumber('21'));
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Expression Sync', () => {
  const expression = 'PI2*radius';
  const fcal = new Fcal();
  fcal.setValues({ radius: new Type.BNumber('20') });
  const expr = fcal.expressionSync(expression);
  const expr1 = fcal.expression('radius \n');
  fcal.setValues({ radius: new Type.BNumber('21') });
  expect(expr1.evaluate()).toStrictEqual(new Type.BNumber('20'));
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber('131.94689145077131601'));
});

test('Invalid number literal', () => {
  const expression = '1E + 23';
  const error = new Error("Expecting number after E but got ' '");
  error.name = 'FcalError [0, 2]';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(error);

  const expression1 = '1.23e';
  const error1 = new Error("Expecting number after e but got '\n'");
  error1.name = 'FcalError [0, 5]';
  expect(() => {
    Fcal.eval(expression1);
  }).toThrowError(error1);

  const expression2 = '23.45E+*34';
  const error2 = new Error("Expecting number after + but got '*'");
  error2.name = 'FcalError [0, 7]';
  expect(() => {
    Fcal.eval(expression2);
  }).toThrowError(error2);
});

test('Temperature', () => {
  const expression = '23432 F + 0.2 C * 9 F / 4 K';
  let unit = Fcal.getUnit('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('23431.356333016553583', unit));
  }

  const expression1 = '60F in F';
  unit = Fcal.getUnit('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression1)).toStrictEqual(new Type.UnitNumber('60', unit));
  }

  const expression2 = '0.233452 F in C';
  unit = Fcal.getUnit('C');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression2)).toStrictEqual(new Type.UnitNumber('-17.64808222222224444', unit));
  }

  const expression3 = '273.15 F  + 1 K';
  unit = Fcal.getUnit('K');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression3)).toStrictEqual(new Type.UnitNumber('408.1222222222222', unit));
  }
});

test('Infinity', () => {
  const expression =
    'Infinity + Infinity - (-Infinity) + (1/0)% of 342 * Infinity + 23 / +++ Infinity + 23/0/0 + 45 mod 0xaa / 0.00';
  expect(Fcal.eval(expression).toString()).toStrictEqual('Infinity');

  expect(() => {
    Fcal.eval('---Infinity + 1/0');
  }).toThrowError('Subtraction between Infinity is indeterminate');

  expect(() => {
    Fcal.eval('---Infinity - -(45 * 234 mod 0o0)');
  }).toThrowError('Subtraction between Infinity is indeterminate');

  expect(() => {
    Fcal.eval('(Infinity * -23) / (12 * (Infinity))');
  }).toThrowError('Division between Infinity is indeterminate');

  expect(() => {
    Fcal.eval('(0B10010 % of Infinity) mod (2.2323E-3 ^ Infinity)');
  }).toThrowError('Modulus between Infinity is indeterminate');
});
