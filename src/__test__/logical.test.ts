import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Decimal number equality', () => {
  expect(Fcal.eval('4545 == 343')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('4545 !== 343')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('+0 == -0')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('+0 === -0')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('-46 == (-23 -23)')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('4 != 343')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('0xe9 == 0o351')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('0xe9 == -0o351')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('0xe9 != 0o351')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('555 === 0b1000101011')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('555 !== 0b1000101011')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('true == false')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('false === true')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('false == false')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('true === true')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1212 + (3 == 3.00)')).toStrictEqual(Type.BNumber.New(1213));
  expect(Fcal.eval('(0 == 1) + 0')).toStrictEqual(Type.BNumber.New(0));
  expect(Fcal.eval('23 + 4 !== 0 + 27')).toStrictEqual(new Type.FBoolean(false));
});

test('Decimal number not', () => {
  expect(Fcal.eval('!PI')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!0')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('!0.223')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!-2.0')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!-0.01')).toStrictEqual(Type.FBoolean.FALSE);
});

test('Decimal number comparison', () => {
  expect(Fcal.eval('E > 2')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('E >= 2')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('E >== 2')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('E < 2')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('E <= 2')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('E <== 2')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0x2d >= 45')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0x2d >= 46')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0x2d <= 45')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0x2d <= 44')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0x2d >== 45')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0x2d >== 46')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0x2d <== 45')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0x2d <== 44')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('-3.34 < 0')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('-0.2323 > -34')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0xe9 >== 0o351')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0xe9 <== -0o351')).toStrictEqual(new Type.FBoolean(false));
});

test('Probability equality', () => {
  expect(Fcal.eval('0o130 == 100%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0o130 != 100%')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('100% == 0o130')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('100% != 0o130')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('0o130 === 88%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0o130 !== 88%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('67% != 67%')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('0b101 + (56%===56) + 6')).toStrictEqual(Type.BNumber.New(12));
  expect(Fcal.eval('67 + (-56 != 100%)')).toStrictEqual(Type.BNumber.New(67));
});

test('Probability not', () => {
  expect(Fcal.eval('!45%')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!0%')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('!-23%')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!-0.23%')).toStrictEqual(Type.FBoolean.FALSE);
});

test('Probability comparison', () => {
  expect(Fcal.eval('101% > 23')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('10% > 0.23')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('1.23 > 45%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0x123 > 102%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('99% > 99%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('99% > 45.7%').toString()).toStrictEqual('true');

  expect(Fcal.eval('101% >= 0o130')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0.12% >= 88').toString()).toStrictEqual('false');
  expect(Fcal.eval('0o130 >= 103%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('88 >= 0.12%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('100% >= 0.45')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0.45 >= 100%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('99% >= 99%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('45.23% >= 34%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0.104% >= 17%')).toStrictEqual(new Type.FBoolean(false));

  expect(Fcal.eval('99% < 87')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('100% < 67')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('89 < 34%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('45% < 45.000000000001%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('454% < 2%')).toStrictEqual(new Type.FBoolean(false));

  expect(Fcal.eval('45% <= 102')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('100% <= 1')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('343 <= 102%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('99 <= 100%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('56% <= 66%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('9.9% <= 9.9%')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('209% <= 45')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0.99 <= 60%')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('76% <= 4%')).toStrictEqual(new Type.FBoolean(false));
});

test('Units equality', () => {
  expect(Fcal.eval('7 days == 1 week')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('67 days == 1.1 week')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('7 days != 1 week')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('60 seconds == 1 minutes')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1.1 hours == 60 minutes')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('60 seconds != 1 minutes')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('60 == 60 bit')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('170 != 0 bit')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('60 != 60 bit')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('60 != 61 bit')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('1 m == 100 cm')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 m != 100 cm')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('1.0001 m != 100 cm')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('63.6 km ==  63.6 sec')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('63.6 km !=  63.6 sec')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('63.6 km !=  63.61 sec')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('1 kmh == 0.27777777777777777778mps')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 kmh != 0.27777777777777777778mps')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('1.5 kmh != 0.27777777777777777778mps')).toStrictEqual(Type.FBoolean.TRUE);
});

test('units not', () => {
  expect(Fcal.eval('!4cm')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!0kmph')).toStrictEqual(Type.FBoolean.TRUE);
  expect(Fcal.eval('!-9weeks')).toStrictEqual(Type.FBoolean.FALSE);
  expect(Fcal.eval('!-0.99bit')).toStrictEqual(Type.FBoolean.FALSE);
});

test('Units comparison', () => {
  expect(Fcal.eval('201 cm > 2 m')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('26days > 5 weeks')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('12.3 > 12 cm')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('-56 > 67 tonne')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('88 K > 69')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0 stone > 0.00001')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('45 cm  > 44.999999999999999 kB')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('82 ft  > 300 kib')).toStrictEqual(new Type.FBoolean(false));

  expect(Fcal.eval('201 cm >= 2 m')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('26days >= 5 weeks')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('12.3 >= 12 cm')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('-56 >= 67 tonne')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('88 K >= 69')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('0 stone >= 0.00001')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('45 cm  >= 44.999999999999999 kB')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('82 ft  >= 300 kib')).toStrictEqual(new Type.FBoolean(false));

  expect(Fcal.eval('7 days >= 1 week')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1.1 week >= 67 days')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('60 seconds >= 1 minutes')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('60 minutes  >= 1.1 hours')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('60 >= 60 bit')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 m >= 100 cm')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('63.6 km >=  63.6 sec')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 kmh >= 0.27777777777777777778mps')).toStrictEqual(new Type.FBoolean(true));

  expect(Fcal.eval('201 cm < 2 m')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('26days < 5 weeks')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('12.3 < 12 cm')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('-56 < 67 tonne')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('88 K < 69')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0 stone < 0.00001')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('45 cm  < 44.999999999999999 kB')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('82 ft  < 300 kib')).toStrictEqual(new Type.FBoolean(true));

  expect(Fcal.eval('201 cm <= 2 m')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('26days <= 5 weeks')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('12.3 <= 12 cm')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('-56 <= 67 tonne')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('88 K <= 69')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('0 stone <= 0.00001')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('45 cm  <= 44.999999999999999 kB')).toStrictEqual(new Type.FBoolean(false));
  expect(Fcal.eval('82 ft  <= 300 kib')).toStrictEqual(new Type.FBoolean(true));

  expect(Fcal.eval('7 days <= 1 week')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1.1 week <= 67 days')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('60 seconds <= 1 minutes')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('60 minutes  <= 1.1 hours')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('60 <= 60 bit')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 m <= 100 cm')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('63.6 km <=  63.6 sec')).toStrictEqual(new Type.FBoolean(true));
  expect(Fcal.eval('1 kmh <= 0.27777777777777777778mps')).toStrictEqual(new Type.FBoolean(true));
});

test('Logical and or', () => {
  expect(() => Fcal.eval('4 & 5')).toThrowError('Unexpected character &');
  expect(() => Fcal.eval('0x1 cm | 90%')).toThrowError('Unexpected character |');
  const cmUnit = Fcal.getUnit('cm');
  expect(cmUnit).not.toBeNull();
  if (cmUnit) {
    expect(Fcal.eval('45 % && 55 cm')).toStrictEqual(Type.UnitNumber.New(55, cmUnit));
    expect(Fcal.eval('0 cm && -23 ')).toStrictEqual(Type.UnitNumber.New(0, cmUnit));
    expect(Fcal.eval('false or 0 || 0.12 cm')).toStrictEqual(Type.UnitNumber.New(0.12, cmUnit));
  }
  expect(Fcal.eval('-34 && true and -6 ')).toStrictEqual(Type.BNumber.New(-6));
  expect(Fcal.eval('-88 || 9')).toStrictEqual(Type.BNumber.New(-88));
  expect(Fcal.eval('false or -9')).toStrictEqual(Type.BNumber.New(-9));

  const fcal = new Fcal();
  expect(fcal.evaluate('89 && false && (tt = 3)')).toStrictEqual(Type.FBoolean.FALSE);
  expect(() => fcal.evaluate('67 * tt')).toThrowError('Undefined variable tt');
  expect(fcal.evaluate('false || 0 || (kk = 0.384%)')).toStrictEqual(Type.Percentage.New(0.384));
  expect(fcal.evaluate('kk + 5%')).toStrictEqual(Type.Percentage.New(5.384));
});

test('Test ternary operation', () => {
  expect(Fcal.eval('5?4+34:5')).toStrictEqual(Type.BNumber.New(38));
  expect(Fcal.eval('false?100:(tt = 67.1%)')).toStrictEqual(Type.Percentage.New(67.1));
  expect(() => Fcal.eval('45?45')).toThrowError("Expecting ':' in ternary operation but found EOL");
});
