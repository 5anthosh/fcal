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

  expect(Fcal.eval('max() + min()')).toStrictEqual(Type.BNumber.New(0));
  if (unit2) {
    expect(Fcal.eval('min(1000, 23, 34, 1 cm, 1%,  2, 4, 008) + max(1 cm , 3 cm, 3 day, -3 , 1.2)')).toStrictEqual(
      Type.UnitNumber.New(4, unit2),
    );
  }
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
  expect(() =>
    Fcal.UseFunction({
      arity: -1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        return args[0];
      },
      name: 'newFunc',
    }),
  ).not.toThrowError();
  expect(Fcal.eval('newFunc(09.4,2,3,4,56,67)')).toStrictEqual(new Type.BNumber(9.4));
});

test('Register function with invalid arity', () => {
  expect(() =>
    Fcal.UseFunction({
      arity: -2,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        return args[0];
      },
      name: 'newFunc1',
    }),
  ).toThrowError('Can not register newFunc1, arity should be greater than or equal to -1 but got -2');
  expect(() =>
    Fcal.UseFunction({
      arity: 34.56,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        return args[0];
      },
      name: 'newFunc2',
    }),
  ).toThrowError('Can not register newFunc2, arity should be Integer');
  expect(() =>
    Fcal.UseFunction({
      arity: 255,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        return args[0];
      },
      name: 'newFunc3',
    }),
  ).toThrowError('Can not register newFunc3, function cannot have more than 254 arguments');
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

test('function call from another function', () => {
  expect(() =>
    Fcal.UseFunction({
      arity: 1,
      func: (env: Environment, args: Type[]) => {
        return env.functions.call('sin', env, args);
      },
      name: 'sudoSin',
    }),
  ).not.toThrowError();

  expect(Fcal.eval('sudoSin(23.4)')).toStrictEqual(Fcal.eval('sin(23.4)'));

  expect(() =>
    Fcal.UseFunction({
      arity: 1,
      func: (env: Environment, args: Type[]) => {
        return env.functions.call('sin123', env, args);
      },
      name: 'sudoSin1',
    }),
  ).not.toThrowError();

  expect(() => Fcal.eval('sudoSin1(23)')).toThrowError('Function sin123 is not found');
});

test('function call with differenct args', () => {
  expect(() => Fcal.eval('sigma(1)')).toThrowError('function sigma expected 2 args but got 1');
  expect(() => Fcal.eval('log(1,2,3)')).toThrowError('function log expected 1 args but got 3');
  expect(() => Fcal.eval('sinh()')).toThrowError('function sinh expected 1 args but got 0');
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
