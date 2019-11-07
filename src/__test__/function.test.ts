import { Fcal } from '../fcal';
import { Environment } from '../interpreter/environment';
import { FcalFunction } from '../interpreter/function';
import { Type } from '../types/datatype';

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

  const sigexpr = 'sigma(1,100)';
  expect(Fcal.eval(sigexpr)).toStrictEqual(new Type.BNumber(5050));
});

test('Register new function', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('asdfasdf123', 1, function(_environment: Environment, param: Type[]): Type {
    const value = param[0] as Type.Numberic;
    return value.New(value.n.sinh());
  });
  const error = new Error('asdfasdf123 is already registered');
  error.name = 'FcalError';
  expect(() => {
    Fcal.UseFunction(func);
  }).not.toThrowError(error);
  const fcal = new Fcal();
  expect(fcal.evaluate('asdfasdf123(45) %')).toStrictEqual(new Type.Percentage('17467135528742547674'));
});

test('Register function with number return ', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('random', 0, function(_environment: Environment, _param: Type[]): number {
    return Math.random();
  });
  expect(() => {
    Fcal.UseFunction(func);
  }).not.toThrowError('random is already registered');
  const fcal = new Fcal();
  expect(fcal.evaluate('random() %')).toBeInstanceOf(Type.Percentage);
});

test('Function already registered', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('abs', 1, function(_environment: Environment, param: Type[]): Type {
    const value = param[0] as Type.Numberic;
    return value.New(value.n.abs());
  });
  const error = new Error('abs is already used in function');
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
  expect(Fcal.eval('dummyFunc(223434532)')).toStrictEqual(new Type.BNumber(0));
});

test('Registered function return invalid return value`', () => {
  // tslint:disable-next-line: only-arrow-functions variable-name
  const func = new FcalFunction('dummyFunc2', 1, function(_environment: Environment, _param: Type[]): Type {
    return ('asdf' as unknown) as Type;
  });
  Fcal.UseFunction(func);
  const error = new Error('dummyFunc2 Function Invalid return type,  Expecting Fcal.Type but got string');
  error.name = 'FcalError';
  expect(() => {
    Fcal.eval('dummyFunc2(223434532)');
  }).toThrowError(error);
});
