import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Conversion number', () => {
  expect(Fcal.eval('454 cm as number')).toStrictEqual(Type.BNumber.New(454));
  expect(Fcal.eval('454% as num')).toStrictEqual(Type.BNumber.New(454));
  expect(Fcal.eval('0.12 as number')).toStrictEqual(Type.BNumber.New(0.12));
});

test('Conversion percentage', () => {
  expect(Fcal.eval('454 cm as percentage')).toStrictEqual(Type.Percentage.New(454));
  expect(Fcal.eval('454% as percentage')).toStrictEqual(Type.Percentage.New(454));
  expect(Fcal.eval('0.12 as percent')).toStrictEqual(Type.Percentage.New(0.12));
});
