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
});

test('create already created constant', () => {
  expect(() => {
    Fcal.useConstants({ c1: 2355 });
  }).not.toThrowError();
});
