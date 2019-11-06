import { Fcal } from '../fcal';
import { FcalError } from '../FcalError';
import { Type } from '../types/datatype';

test('Assignment', () => {
  const fc = new Fcal();
  const unit = Fcal.getUnit('cm');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(fc.evaluate('v1 = 0o234 cm + sigma(1, 10)')).toStrictEqual(new Type.UnitNumber(211, unit));
    expect(fc.evaluate('v5=v4=v3=v2=v1-11')).toStrictEqual(new Type.UnitNumber(200, unit));
    expect(fc.evaluate('v3')).toStrictEqual(new Type.UnitNumber(200, unit));
    expect(fc.evaluate('v5')).toStrictEqual(new Type.UnitNumber(200, unit));
  }
});

test('Invalid assignment', () => {
  const expression = '0x3 = 5';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError('Execting variable in left side of assignment');
});

test('Undefined variable', () => {
  const expression = '34 * PIy ^ 2';
  const fcal = new Fcal();
  const expr = fcal.expression(expression);
  const error = new FcalError('Undefined variable PIy');
  error.name = 'FcalError';
  expect(() => {
    expr.evaluate();
  }).toThrow(error);
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
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('1.223e+23'));
});

test('Last created variable _', () => {
  const expression = '2^2 + 4 K + 2 day';
  const unit = Fcal.getUnit('day');
  const fcal = new Fcal();
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(fcal.evaluate('_ * 3')).toStrictEqual(new Type.BNumber('0'));
    expect(fcal.evaluate(expression)).toStrictEqual(new Type.UnitNumber('10', unit));
    expect(fcal.evaluate('_ + 1 week in day')).toStrictEqual(new Type.UnitNumber('17', unit));
  }
});
