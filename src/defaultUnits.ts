import Big = require('decimal.js');
import { Unit } from './types/units';

export function getdefaultUnits(): Unit[] {
  const units = new Array<Unit>();
  setDistanceUnits(units);
  setSpeedUnits(units);
  setTimeUnits(units);
  setTemperatureUnits(units);
  return units;
}

function setDistanceUnits(units: Unit[]) {
  units.push(
    new Unit(Unit.LENGTHID, new Big.Decimal(1), 'cm', ['cm', 'centimeter'])
      .Singular('Centimeter')
      .Plural('Centimeters'),
  );
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(100), 'm', ['m', 'meter']).Singular('Meter').Plural('Meters'));
  units.push(
    new Unit(Unit.LENGTHID, new Big.Decimal(0.1), 'mm', ['mm', 'milimeter']).Singular('Milimeter').Plural('Milimeters'),
  );
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(100000), 'km', ['km']).Singular('Kilometer').Plural('Kilometers'));
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(2.54), 'inch', ['inch']).Singular('Inch').Plural('Inches'));
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(30.48), 'foot/feet', ['ft']).Singular('Foot').Plural('Feet'));
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(91.44), 'yard', ['yd', 'yard']).Singular('Yard').Plural('Yards'));
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(160934.4), 'mile', ['mi']).Singular('Mile').Plural('Miles'));
  units.push(new Unit(Unit.LENGTHID, new Big.Decimal(185200), 'nautical mile (nmi)', ['nmi']));
}

function setSpeedUnits(units: Unit[]) {
  units.push(new Unit(Unit.SPEEDID, new Big.Decimal(1), 'km/h', ['kmh', 'kmph', 'khm', 'kph']));
  units.push(new Unit(Unit.SPEEDID, new Big.Decimal(1.609344), 'miles/h', ['mph']));
  units.push(new Unit(Unit.SPEEDID, new Big.Decimal(3.6), 'm/s', ['mps']));
  units.push(new Unit(Unit.SPEEDID, new Big.Decimal(1.097), 'ft/s', ['fps']));
  units.push(new Unit(Unit.SPEEDID, new Big.Decimal(1.852), 'kt', ['kts', 'knots']));
}

function setTimeUnits(units: Unit[]) {
  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(1e-9), 'nsec', ['nsec', 'nanosecond', 'nanoseconds'])
      .Singular('Nanosecond')
      .Plural('Nanoseconds'),
  );

  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(1e-6), 'msec', ['msec', 'microsecond', 'microseconds'])
      .Singular('Microsecond')
      .Plural('Microseconds'),
  );

  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(1), 'second(s)', ['sec', 'second', 'seconds'])
      .Singular('Second')
      .Plural('Seconds'),
  );
  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(60), 'minute(s)', ['min', 'minute', 'minutes'])
      .Singular('Minute')
      .Plural('Minutes'),
  );
  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(3600), 'hour(s)', ['hr', 'hour', 'hours']).Singular('Hour').Plural('Hours'),
  );
  units.push(new Unit(Unit.TIMEID, new Big.Decimal(86400), 'day(s)', ['day', 'days']).Singular('Day').Plural('Days'));
  units.push(
    new Unit(Unit.TIMEID, new Big.Decimal(604800), 'week(s)', ['week', 'weeks']).Singular('Week').Plural('Weeks'),
  );
}

function setTemperatureUnits(units: Unit[]) {
  units.push(new Unit(Unit.TEMPERATUREID, new Big.Decimal(1), 'K', ['K', 'kelvin']));
  units.push(
    new Unit(Unit.TEMPERATUREID, new Big.Decimal('0.55555555555555555556'), '°F', ['°F', 'F']).setBias(
      new Big.Decimal('255.3722222222222'),
    ),
  );
  units.push(new Unit(Unit.TEMPERATUREID, new Big.Decimal(1), '°C', ['°C', 'C']).setBias(new Big.Decimal(273.15)));
}
