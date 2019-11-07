import Decimal from 'decimal.js';
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
import { Unit } from '../types/units';

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
  }
});

test('Time units addition In operator', () => {
  const expression =
    '1 day - 1day*23sec + 23sec + 1hr in sec + 1 sec / 1sec - 1sec * 1sec + 1sec ^ 1sec - 3sec mod 2sec';
  const unit = Fcal.getUnit('sec');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('-1897177', unit));
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
  Fcal.UseUnit(new Unit(Unit.TIMEID, 2592000, 'month', ['month', 'months']).Singular('month').Plural('months'));
  const unit = Fcal.getUnit('day');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('1 month in days')).toStrictEqual(new Type.UnitNumber(30, unit));
  }
});

test('Create whole new unit', () => {
  const units = [];

  units.push(
    new Unit(
      'CONTENT',
      (): number => {
        return 1;
      },
      'char',
      ['char', 'chars'],
    )
      .Singular('character')
      .Plural('characters'),
  );
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
