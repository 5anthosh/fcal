import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';

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

test('Conversion sync', () => {
  const fcal = new Fcal();
  fcal.setValues({ total: 78 });
  expect(fcal.evaluate('total as hex')).toStrictEqual(Type.BNumber.New(78).setSystem(NumberSystem.hex));
  expect(fcal.evaluate('total')).toStrictEqual(Type.BNumber.New(78));
});
