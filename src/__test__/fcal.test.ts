import { Fcal } from '../fcal';
import { FcalError } from '../FcalError';
import { Environment } from '../interpreter/environment';
import { FcalFunction } from '../interpreter/function';
import { Type } from '../types/datatype';

test('Simple arithmetic operation', () => {
  const expression =
    '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Divide By Zero', () => {
  const expression = '1/0';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('Infinity'));
});

test('Power result in imaginary number', () => {
  const expression = '(-2)^2.5';
  const error = 'Pow of operation results in complex number and complex is not supported yet';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrow(error);
});

test('Phrases', () => {
  const expression =
    '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS 1) + 1.000 / 1.000\
     + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) pow 3 ^ -4';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Modulo Operation', () => {
  const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5 mod 45   mod 1 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('2.0'));
});

test('Percentage addition', () => {
  const expression = '+(234)% + 1000 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('+3340'));
  const expression1 = '+(234)% + 1000% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.Percentage('1234'));
});

test('Percentage sub', () => {
  const expression = '-(234)% - 1000 - 0.25% ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('1336.65'));
  const expression1 = '-(234)% - (1000+23)% - 0.25% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.Percentage('-1257.25'));
});

test('Percentage divide and mulitiplication', () => {
  const expression = '-24%*34 + (30 - 2*+(-2))%*24 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('-81.6'));

  const expression1 = '44%/600 ----4% + 10%/0.0003 - 23/2% ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('-49.4424'));
  const expression2 =
    '1% + 2% + 3% * 5% - 4% * (1% - 2%) / 3.4% - (-1%) + (+1%) + 1.000% / 1.000% \
    + 1% * (1%) * (0.2%) * (5%) * (-1%) * (--1%) * (-1%) + (1.23423%) ^ (2%) ^ 3% ^ -4% ';
  expect(new Fcal().evaluate(expression2)).toStrictEqual(new Type.Percentage('24.412934840534418202'));
});

test('Percentage power and modulo', () => {
  const expression = '24% ^ (2^2%^2%^2) + 34 - 0.0023%^10 + 10^10% ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('44.229046038763679064'));
  const expression1 = '3% mod 500 + (0.23 mod 79%)% mod 7 ';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('15.003381'));
  const expression2 =
    '- (-1%) + (+1%) + 1.000% / 1.000% + 1% mul (1%) * (0.2%) mul (5%) mul (-1%) mul (--1%) + 4% mod 5% mod 45%   mod 1% ';
  expect(new Fcal().evaluate(expression2)).toStrictEqual(new Type.Percentage('2'));
});

test('Percentage of', () => {
  const expression = '24% of ((39 + 1) of 23) of 77* 34 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('57.80544'));
});

test('New line', () => {
  // const expression = '    1 + \t 5 \t';
  // expect(() => {
  //   new Fcal().evaluate(expression);
  // }).toThrowError(new Error('Expecting new Line'));

  const expression1 = '1234+12341324123 * 34 \t \n $';
  expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.BNumber('419605021416'));
});

test('Parser error Expect expression', () => {
  const expression = '* 123$';
  const error = new Error('Expect expression but found *');
  error.name = 'FcalError [0, 1]';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrowError(error);
});

test('Lex error unexpected token', () => {
  const expression = '123 mul 123!';
  const error = new Error('Unexpected token !');
  error.name = 'FcalError [9, 10]';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrow(error);
});

test('Time units addition', () => {
  const expression = '1 day + 23sec + 1hr ';
  const unit = Fcal.units.get('hr');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('25.006388888888888889', unit));
  }
});

test('Time units addition In operator', () => {
  const expression = '1 day + 1day +  23sec + 1hr in sec ';
  const unit = Fcal.units.get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('176423', unit));
  }
});

test('Time units addition as operator', () => {
  const expression = '1 day - 1day*23sec + 23sec + 1hr as sec ';
  const unit = Fcal.units.get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('-1897177', unit));
  }
});

test('Invalid unit operations', () => {
  const expression =
    '1km + 2sec + 3mph * 5 - 4minute * (1 - 2) / 3.4inch - (-1) + (+1) + 1.000kmh /\
     1.000sec + 1 * (1) * (0.2) * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day ';
  const unit = Fcal.units.get('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('24.412934840534418202', unit));
  }
});

test('Time units addition In operator', () => {
  const expression =
    '1 day - 1day*23sec + 23sec + 1hr in sec + 1 sec / 1sec - 1sec * 1sec + 1sec ^ 1sec - 3sec mod 2sec';
  const unit = Fcal.units.get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('-1897177', unit));
  }
});

test('Percentage of with units', () => {
  const expression = '24% of ((39sec + 1day in sec) of 23min) of 77* 34 ';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('124916.110704'));
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

test('PI area of the circle', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  expect(fcal.evaluate('radius: 20 ')).toStrictEqual(new Type.BNumber('20'));
  expect(fcal.evaluate(expression)).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Default functions', () => {
  const expression =
    'abs(-23) + log(123) - ln(0.23) * sqrt(12) / cbrt(60) ^ round(1.2344) mod ceil(2.7) + floor(23.6 cm)  ';
  const unit = Fcal.units.get('cm');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('49.390359524782034541', unit));
  }

  const trigno =
    'cos(23 km) + acos(-0.5) sec + cosh(34cm) * acosh(1) ^ sin(0.23) \
    - asin(0.12341234) + sinh(0 mps) - asinh(8) + tan(45) - atan(45) ^ tanh(0.23 cm ) * atanh(0.7) cm';
  const unit2 = Fcal.units.get('cm');
  expect(unit2).not.toEqual(null);
  if (unit2 != null) {
    expect(new Fcal().evaluate(trigno)).toStrictEqual(new Type.UnitNumber('-0.67627697424654781499', unit2));
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

test('Undefined variable', () => {
  const expression = '34 * PIy ^ 2';
  const fcal = new Fcal();
  const expr = fcal.expression(expression);
  const error = FcalError.ErrorWithoutCtx('Undefined variable PIy');
  error.name = 'FcalError';
  expect(() => {
    expr.evaluate();
  }).toThrow(error);
});

test('Register new function', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('asdfasdf123', 1, function(_environment: Environment, param: Type[]): Type {
    const value = param[0] as Type.Numberic;
    return value.newNumeric(value.number.sinh());
  });
  const error = new Error('asdfasdf123 is already registered');
  error.name = 'FcalError';
  expect(() => {
    Fcal.UseFunction(func);
  }).not.toThrowError(error);
  const fcal = new Fcal();
  expect(fcal.evaluate('asdfasdf123(45) %')).toStrictEqual(new Type.Percentage('17467135528742547674'));
});

test('Function already registered', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('abs', 1, function(_environment: Environment, param: Type[]): Type {
    const value = param[0] as Type.Numberic;
    return value.newNumeric(value.number.abs());
  });
  const error = new Error('abs is already registered');
  error.name = 'FcalError';
  expect(() => {
    Fcal.UseFunction(func);
  }).toThrowError(error);
});

test('Not callable', () => {
  const fcal = new Fcal();
  const error = new Error('PI is not callable');
  error.name = 'FcalError [3, 9]';
  expect(() => {
    fcal.evaluate('23*PI(45)*23%');
  }).toThrowError(error);
});

test('Registered function return null value`', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('dummyFunc', 1, function(_environment: Environment, _param: Type[]): Type {
    return (null as unknown) as Type;
  });
  Fcal.UseFunction(func);
  expect(new Fcal().evaluate('dummyFunc(223434532)')).toStrictEqual(new Type.BNumber(0));
});

test('Registered function return invalid return value`', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('dummyFunc2', 1, function(_environment: Environment, _param: Type[]): Type {
    return ('asdf' as unknown) as Type;
  });
  Fcal.UseFunction(func);
  const error = new Error('dummyFunc2 Function Invalid return type,  Expecting Fcal.Type');
  error.name = 'FcalError';
  expect(() => {
    new Fcal().evaluate('dummyFunc2(223434532)');
  }).toThrowError(error);
});

test('test set Values decimal', () => {
  const expression = 'l * b';
  const fcal = new Fcal();
  const expr = fcal.expression(expression);
  expr.setValues({ l: 10, b: 20 });
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber(200));
});

test('E in number literal', () => {
  const expression = '1E-8 + 1e+3 * 1.23e00 + 1.223E23';
  expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.BNumber('1.223e+23'));
});

test('Invalid number literal', () => {
  const expression = '1E + 23';
  const error = new Error("Expecting number after E but got ' '");
  error.name = 'FcalError [0, 2]';
  expect(() => {
    new Fcal().evaluate(expression);
  }).toThrowError(error);

  const expression1 = '1.23e';
  const error1 = new Error("Expecting number after e but got '\n'");
  error1.name = 'FcalError [0, 5]';
  expect(() => {
    new Fcal().evaluate(expression1);
  }).toThrowError(error1);

  const expression2 = '23.45E+*34';
  const error2 = new Error("Expecting number after + but got '*'");
  error2.name = 'FcalError [0, 7]';
  expect(() => {
    new Fcal().evaluate(expression2);
  }).toThrowError(error2);
});

test('Temperature', () => {
  const expression = '23432 F + 0.2 C * 9 F / 4 K';
  let unit = Fcal.units.get('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('23431.356333016553583', unit));
  }

  const expression1 = '60F in F';
  unit = Fcal.units.get('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression1)).toStrictEqual(new Type.UnitNumber('60', unit));
  }

  const expression2 = '0.233452 F in C';
  unit = Fcal.units.get('C');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression2)).toStrictEqual(new Type.UnitNumber('-17.64808222222224444', unit));
  }

  const expression3 = '273.15 F  + 1 K';
  unit = Fcal.units.get('K');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression3)).toStrictEqual(new Type.UnitNumber('408.1222222222222', unit));
  }
});

test('Singular and Plural units phrases', () => {
  const expression = '0 sec + 1 sec';
  let unit;
  unit = Fcal.units.get('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression).print()).toStrictEqual('1 Second');
  }

  const expression1 = '1 weeks in day';
  unit = Fcal.units.get('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression1).print()).toStrictEqual('7 Days');
  }
});

test('Last created variable _', () => {
  const expression = '2^2 + 4 K + 2 day';
  const unit = Fcal.units.get('day');
  const fcal = new Fcal();
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(fcal.evaluate('_ * 3')).toStrictEqual(new Type.BNumber('0'));
    expect(fcal.evaluate(expression)).toStrictEqual(new Type.UnitNumber('10', unit));
    expect(fcal.evaluate('_ + 1 week in day')).toStrictEqual(new Type.UnitNumber('17', unit));
  }
});

test('Number system', () => {
  const expression =
    '0xaaabbbcccdddeeeffff - 0o12525356746315673673577777 \
    + 0b1km + 0x2sec + 0o3mph * 0b00101 - 0x0004minute * (0b1 - 0o2)\
     / 3.4inch - (-1) + (+1) + 1.000kmh / 1.000sec + 0xA * (0o1) * (0.2) \
     * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day ';
  const unit = Fcal.units.get('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(new Fcal().evaluate(expression)).toStrictEqual(new Type.UnitNumber('33.412934840534418202', unit));
  }
  expect(new Fcal().evaluate('0b11011101101').toString()).toStrictEqual('0b11011101101');
  expect(new Fcal().evaluate('0o445342').toString()).toStrictEqual('0o445342');
  expect(new Fcal().evaluate('0xaaaAaaabbbcddd').toString()).toStrictEqual('0xaaaaaaabbbcddd');
});

test('Infinity', () => {
  const expression =
    'Infinity + Infinity - (-Infinity) + (1/0)% of 342 * Infinity + 23 / +++ Infinity + 23/0/0 + 45 mod 0xaa / 0.00';
  expect(new Fcal().evaluate(expression).toString()).toStrictEqual('Infinity');

  expect(() => {
    new Fcal().evaluate('---Infinity + 1/0');
  }).toThrowError('Subtraction between Infinity is indeterminate');

  expect(() => {
    new Fcal().evaluate('---Infinity - -(45 * 234 mod 0o0)');
  }).toThrowError('Subtraction between Infinity is indeterminate');

  expect(() => {
    new Fcal().evaluate('(Infinity * -23) / (12 * (Infinity))');
  }).toThrowError('Division between Infinity is indeterminate');

  expect(() => {
    new Fcal().evaluate('(0B10010 % of Infinity) mod (2.2323E-3 ^ Infinity)');
  }).toThrowError('Modulus between Infinity is indeterminate');
});
