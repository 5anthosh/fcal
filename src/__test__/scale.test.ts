import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Number Literal', () => {
  expect(Fcal.eval('-7k')).toStrictEqual(Type.BNumber.New(-7000));
  expect(Fcal.eval('-0x14 M')).toStrictEqual(Type.BNumber.New(-200_00_000));
  expect(Fcal.eval('0b0 B + 0')).toStrictEqual(Type.BNumber.New(0));
});

test('Units', () => {
  const cm = Fcal.getUnit('cm');
  expect(cm).not.toBeNull();
  if (cm) {
    expect(Fcal.eval('4.5B cm')).toStrictEqual(Type.UnitNumber.New('45000000', cm));
    expect(Fcal.eval('1k as cm')).toStrictEqual(Type.UnitNumber.New(1000, cm));
  }
});

test('Percentage', () => {
  expect(Fcal.eval('88k%')).toStrictEqual(Type.Percentage.New(88000));
  expect(Fcal.eval('6.7M % + 1')).toStrictEqual(Type.BNumber.New(67_001));
});

test('Register scale', () => {
  const scales = new Map<string, Type>();
  scales.set('sc', Type.BNumber.New(10));
  Fcal.useScales(scales);
  Fcal.useScales({ sc1: Type.BNumber.New(100) });
  expect(Fcal.eval('5sc + 6sc1')).toStrictEqual(Type.BNumber.New(650));
});
