import { Decimal } from 'decimal.js';
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('create new Constant', () => {
  expect(() => {
    Fcal.useConstants({ c1: 123.1234, c2: 234e-23 });
  }).not.toThrow();
  const unit = Fcal.getUnit('kmh');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('c1 + c2 kmh * 0.3')).toStrictEqual(new Type.UnitNumber('123.1234', unit));
  }
  const values = new Map<string, string | number | Decimal | Type>();
  values.set('v1', '3.67');
  values.set('v5', 67);
  expect(() => Fcal.useConstants(values)).not.toThrowError();
  expect(Fcal.eval('v1 + v5')).toStrictEqual(new Type.BNumber(70.67));
});

test('create already created constant', () => {
  expect(() => {
    Fcal.useConstants({ c1: 2355 });
  }).toThrowError('c1 is already used in constant');
});

test('Reassign the constants', () => {
  expect(() => Fcal.eval('PI = 45')).toThrowError("Can't reassign constant PI");
});
