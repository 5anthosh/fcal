import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Number system', () => {
  const expression =
    '0xaaabbbcccdddeeeffff - 0o12525356746315673673577777 \
    + 0b1km + 0x2sec + 0o3mph * 0b00101 - 0x0004minute * (0b1 - 0o2)\
     / 3.4inch - (-1) + (+1) + 1.000kmh / 1.000sec + 0xA * (0o1) * (0.2) \
     * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day ';
  const unit = Fcal.getUnit('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('33.412934840534418202', unit));
  }
  expect(Fcal.eval('0b11011101101 day ').toString()).toStrictEqual('0b11011101101 Days');
  expect(Fcal.eval('0o445342').toString()).toStrictEqual('0o445342');
  expect(Fcal.eval('0xaaaAaaabbbcddd sec').toString()).toStrictEqual('0xaaaaaaabbbcddd Seconds');
});

test('Invalid number literal (Number system)', () => {
  expect(() => {
    Fcal.eval('0b11130');
  }).toThrowError("Unexpected '3' in binary number");
  expect(() => {
    Fcal.eval('0o24234988');
  }).toThrowError("Unexpected '9' in Octal number");
  expect(() => {
    Fcal.eval('0xz11122aaa');
  }).toThrowError("Unexpected 'z' in Hexadecimal");

  expect(() => {
    Fcal.eval('0x123011z11122aaa');
  }).toThrowError('Unexpected token z11122aaa');
});

test('Number system conversion', () => {
  expect(Fcal.eval('-342 cm in bin').toString()).toStrictEqual('-0b101010110 Centimeters');
  expect(Fcal.eval('0b110010111011 % in hex').toString()).toStrictEqual('% 0xcbb');
  expect(Fcal.eval('(3 + 0.14) in oct').toString()).toStrictEqual('0o3.1075341217270243656');
  expect(Fcal.eval('0o21436 sec as bin').toString()).toStrictEqual('0b10001100011110 Seconds');
  expect(Fcal.eval('-0xD7A day as decimal').toString()).toStrictEqual('-3450 Days');
  expect(Fcal.eval('---23.44 kmh as oct').toString()).toStrictEqual('-0o27.341217270243656051 km/h');
});
