import Decimal from 'decimal.js';
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
import { IUseUnit, Unit } from '../types/units';

test('Time units addition', () => {
  const expression = '1 day + 23sec + 1hr ';
  const unit = Fcal.getUnit('hr');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('25.006388888888888889', unit));
  }
});

test('Time units addition In operator', () => {
  const expression = '1 day + 1day +  23sec + 1hr in sec ';
  const unit = Fcal.getUnit('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('176423', unit));
  }
  expect(() => Fcal.eval('45 cm in ')).toThrowError('Expecting unit after in');
});
test('Time units addition as operator', () => {
  const expression = '1 day - 1day*23sec + 23sec + 1hr as sec ';
  const unit = Fcal.getUnit('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('-1897177', unit));
  }
});

test('Invalid unit operations', () => {
  const expression =
    '1km + 2sec + 3mph * 5 - 4minute * (1 - 2) / 3.4inch - (-1) + (+1) + 1.000kmh /\
     1.000sec + 1 * (1) * (0.2) * (5) * (-1km) * (--1) * (-1) + (1.23423) ^ (2) ^ 3 ^ -4day ';
  const unit = Fcal.getUnit('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('24.412934840534418202', unit));
    expect(Fcal.eval('45 km * 60 day')).toStrictEqual(new Type.UnitNumber(2700, unit));
  }
});

test('Time units addition In operator', () => {
  const expression =
    '1 day - 1day*23sec + 23sec + 1hr in sec + 1 sec / 1sec - 1sec * 1sec + 1sec ^ 1sec - 3sec mod 2sec';
  const unit = Fcal.getUnit('sec');
  expect(unit).not.toEqual(null);
  if (unit) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('-1897177', unit));
    expect(Fcal.eval('45 sec * 10 %')).toStrictEqual(new Type.UnitNumber(202.5, unit));
  }
});

test('units division', () => {
  expect(Fcal.eval('34 km / 1 km + 120%')).toStrictEqual(Type.BNumber.New(74.8));
  const unit = Fcal.getUnit('cm');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('(0x23 km / 0b101 m)  in cm')).toStrictEqual(new Type.UnitNumber(7000, unit));
    expect(Fcal.eval('(45 km / 5.2 km) ')).toStrictEqual(Type.BNumber.New('8.6538461538461538462'));
    expect(Fcal.eval('(45 km // 5.2 km) ')).toStrictEqual(Type.BNumber.New('8'));
    expect(Fcal.eval('23.23 cm / 3 days')).toStrictEqual(new Type.UnitNumber('7.7433333333333333333', unit));
    expect(Fcal.eval('23.23 cm // 3 days')).toStrictEqual(new Type.UnitNumber('7', unit));
    expect(Fcal.eval('(100 km / 45)  in cm')).toStrictEqual(new Type.UnitNumber('222222.22222222222222', unit));
    expect(Fcal.eval('(100 km // 45)  in cm')).toStrictEqual(new Type.UnitNumber('200000', unit));
    expect(Fcal.eval('(0o127 / 0.4e-2 m)  in cm')).toStrictEqual(new Type.UnitNumber('2175000', unit));
  }
});

test('units power and modulo', () => {
  const unit = Fcal.getUnit('kph');
  expect(unit).not.toBeNull();
  const unit1 = Fcal.getUnit('day');
  expect(unit1).not.toBeNull();
  const unit2 = Fcal.getUnit('C');
  expect(unit2).not.toBeNull();
  if (unit && unit1 && unit2) {
    expect(Fcal.eval('45 kph ** 2 seconds')).toStrictEqual(new Type.UnitNumber(2025, unit));
    expect(Fcal.eval('23 days ** 1 weeks')).toStrictEqual(new Type.UnitNumber(3404825447, unit1));
    expect(Fcal.eval('(-60 C )** 20')).toStrictEqual(new Type.UnitNumber('3.656158440062976e+35', unit2));
    expect(Fcal.eval('45 days mod 5 kb')).toStrictEqual(new Type.UnitNumber(0, unit1));
    expect(Fcal.eval('17 C mod 3 K')).toStrictEqual(new Type.UnitNumber(17, unit2));
    expect(Fcal.eval('17 C mod 3 ')).toStrictEqual(new Type.UnitNumber(2, unit2));
    expect(Fcal.eval('78 mod 2 kph ')).toStrictEqual(new Type.UnitNumber(0, unit));
  }
});
test('Singular and Plural units phrases', () => {
  const expression = '0 sec + 1 sec';
  let unit;
  unit = Fcal.getUnit('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression).print()).toStrictEqual('1 Second');
  }

  const expression1 = '1 weeks in day';
  unit = Fcal.getUnit('day');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression1).print()).toStrictEqual('7 Days');
  }
});

test('Add new unit type to Existing Unit', () => {
  Fcal.UseUnit(
    new Unit(Unit.TIMEID, 2592000, 'month', ['month', 'months'])
      .Singular('month')
      .Plural('months')
      .setBias((): number => 0),
  );
  const unit = Fcal.getUnit('day');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('1 month in days')).toStrictEqual(new Type.UnitNumber(30, unit));
  }
  expect(() =>
    Fcal.UseUnit({
      bias: (): Decimal => new Decimal(0),
      id: Unit.LENGTHID,
      phrases: ['news', 'news2'],
      ratio: 1.2,
      type: 'new-length',
    }),
  ).not.toThrow();
  const unit1 = Fcal.getUnit('cm');
  expect(unit1).not.toBeNull();
  if (unit1) {
    expect(Fcal.eval('2 news in cm')).toStrictEqual(new Type.UnitNumber('2.4', unit1));
  }
});

test('Create whole new unit', () => {
  const units = Array<Unit | IUseUnit>();
  units.push({
    bias: new Decimal(0),
    id: 'CONTENT',
    phrases: ['char', 'chars'],
    plural: 'characters',
    ratio: (): number => {
      return 1;
    },
    singular: 'character',
    type: 'char',
  });

  units.push(
    new Unit(
      'CONTENT',
      (): Decimal => {
        return new Decimal(5);
      },
      'word',
      ['word', 'words'],
    )
      .Singular('word')
      .Plural('words'),
  );
  units.push(new Unit('CONTENT', 100, 'page', ['page', 'pages']).Singular('page').Plural('pages'));

  Fcal.UseUnits(units);
  const unit = Fcal.getUnit('chars');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('34 word + 3 pages in chars')).toStrictEqual(new Type.UnitNumber(470, unit));
  }
});

test('Add already existing unit', () => {
  expect(() => {
    Fcal.UseUnit(new Unit(Unit.TIMEID, 2592000, 'month', ['month', 'months']).Singular('month').Plural('months'));
  }).toThrowError('month is already used in unit');
});

test('Mass units', () => {
  const mgU = Fcal.getUnit('mg');
  expect(mgU).not.toBeNull();
  if (mgU) {
    expect(Fcal.eval('45 kg + 3 tonne in mg')).toStrictEqual(Type.UnitNumber.New(3045000000, mgU));
    expect(Fcal.eval('1 pound + 2 ounce + 3 USton + 4 stone + 5 imperialton + 6 microgram + 6 g in mg')).toStrictEqual(
      Type.UnitNumber.New('7827472451.006', mgU),
    );
  }
});
