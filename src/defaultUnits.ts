import Big = require('decimal.js');
import { Unit } from './types/units';

export function getdefaultUnits(): Unit.Units {
  const units = new Unit.Units();
  setDistanceUnits(units);
  setSpeedUnits(units);
  setTimeUnits(units);
  setTemperatureUnits(units);
  return units;
}

function setDistanceUnits(units: Unit.Units) {
  units.Add(new Unit('LENGTH', new Big.Decimal(1), 'cm', 'cm'));
  units.Add(new Unit('LENGTH', new Big.Decimal(100), 'm', 'm'));
  units.Add(new Unit('LENGTH', new Big.Decimal(0.1), 'mm', 'mm'));
  units.Add(new Unit('LENGTH', new Big.Decimal(100000), 'km', 'km'));
  units.Add(new Unit('LENGTH', new Big.Decimal(2.54), 'inch', 'inch'));
  units.Add(new Unit('LENGTH', new Big.Decimal(30.48), 'foot/feet', 'ft'));
  units.Add(new Unit('LENGTH', new Big.Decimal(91.44), 'yard', 'yd', 'yard'));
  units.Add(new Unit('LENGTH', new Big.Decimal(160934.4), 'mile', 'mi'));
  units.Add(new Unit('LENGTH', new Big.Decimal(185200), 'nautical mile (nmi)', 'nmi'));
}

function setSpeedUnits(units: Unit.Units) {
  units.Add(new Unit('SPEED', new Big.Decimal(1), 'km/h', 'kmh', 'kmph', 'khm', 'kph'));
  units.Add(new Unit('SPEED', new Big.Decimal(1.609344), 'miles/h', 'mph'));
  units.Add(new Unit('SPEED', new Big.Decimal(3.6), 'm/s', 'mps'));
  units.Add(new Unit('SPEED', new Big.Decimal(1.097), 'ft/s', 'fps'));
  units.Add(new Unit('SPEED', new Big.Decimal(1.852), 'kt', 'kts', 'knots'));
}

function setTimeUnits(units: Unit.Units) {
  units.Add(new Unit('TIME', new Big.Decimal(1), 'second(s)', 'sec', 'second'));
  units.Add(new Unit('TIME', new Big.Decimal(60), 'minute(s)', 'min', 'minute'));
  units.Add(new Unit('TIME', new Big.Decimal(3600), 'hour(s)', 'hr', 'hour'));
  units.Add(new Unit('TIME', new Big.Decimal(86400), 'day(s)', 'day', 'day'));
}

function setTemperatureUnits(units: Unit.Units) {
  units.Add(new Unit('TEMPERATURE', new Big.Decimal(1), 'K', 'K', 'kelvin'));
  units.Add(
    new Unit('TEMPERATURE', new Big.Decimal('0.5555555555555555555555555'), '°F', '°F', 'F').setBias(
      new Big.Decimal('255.3722222222222'),
    ),
  );
  units.Add(new Unit('TEMPERATURE', new Big.Decimal(1), '°C', '°C', 'C').setBias(new Big.Decimal(273.15)));
}
