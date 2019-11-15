import { IUseUnit } from '../types/units';
import { Unit } from '../types/units';

export function getDefaultUnits(): IUseUnit[] {
  const units = new Array<IUseUnit>();
  setDistanceUnits(units);
  setSpeedUnits(units);
  setTimeUnits(units);
  setTemperatureUnits(units);
  return units;
}

function setDistanceUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.LENGTHID,
        phrases: ['cm', 'centimeter'],
        plural: 'Centimeters',
        ratio: 1,
        singular: 'Centimeter',
        type: 'cm',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['m', 'meter'],
        plural: 'Meters',
        ratio: 100,
        singular: 'Meter',
        type: 'm',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['mm', 'milimeter'],
        plural: 'Milimeters',
        ratio: 0.1,
        singular: 'Milimeter',
        type: 'mm',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['km'],
        plural: 'Kilometers',
        ratio: 100000,
        singular: 'Kilometer',
        type: 'km',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['inch'],
        plural: 'Inches',
        ratio: 2.54,
        singular: 'Inch',
        type: 'inch',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['ft'],
        plural: 'Feet',
        ratio: 30.48,
        singular: 'Foot',
        type: 'foot/feet',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['yd', 'yard'],
        plural: 'Yards',
        ratio: 91.44,
        singular: 'Yard',
        type: 'yard',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['mi'],
        plural: 'Miles',
        ratio: 160934.4,
        singular: 'Mile',
        type: 'mile',
      },

      {
        id: Unit.LENGTHID,
        phrases: ['nmi'],
        ratio: 185200,
        type: 'nautical mile (nmi)',
      },
    ],
  );
}

function setSpeedUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.SPEEDID,
        phrases: ['kmh', 'kmph', 'khm', 'kph'],
        ratio: 1,
        type: 'km/h',
      },
      {
        id: Unit.SPEEDID,
        phrases: ['mph'],
        ratio: 1.609344,
        type: 'miles/h',
      },
      {
        id: Unit.SPEEDID,
        phrases: ['mps'],
        ratio: 3.6,
        type: 'm/s',
      },
      {
        id: Unit.SPEEDID,
        phrases: ['fps'],
        ratio: 1.097,
        type: 'ft/s',
      },
      {
        id: Unit.SPEEDID,
        phrases: ['kts', 'knots'],
        ratio: 1.852,
        type: 'kt',
      },
    ],
  );
}

function setTimeUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.TIMEID,
        phrases: ['nsec', 'nanosecond', 'nanoseconds'],
        plural: 'Nanoseconds',
        ratio: 1e-9,
        singular: 'Nanosecond',
        type: 'nsec',
      },
      {
        id: Unit.TIMEID,
        phrases: ['msec', 'microsecond', 'microseconds'],
        plural: 'Microseconds',
        ratio: 1e-6,
        singular: 'Microsecond',
        type: 'msec',
      },
      {
        id: Unit.TIMEID,
        phrases: ['sec', 'second', 'seconds'],
        plural: 'Seconds',
        ratio: 1,
        singular: 'Second',
        type: 'second',
      },
      {
        id: Unit.TIMEID,
        phrases: ['min', 'minute', 'minutes'],
        plural: 'Minutes',
        ratio: 60,
        singular: 'Minute',
        type: 'minute',
      },
      {
        id: Unit.TIMEID,
        phrases: ['hr', 'hour', 'hours'],
        plural: 'Hours',
        ratio: 3600,
        singular: 'Hour',
        type: 'hour',
      },
      {
        id: Unit.TIMEID,
        phrases: ['day', 'days'],
        plural: 'Days',
        ratio: 86400,
        singular: 'Day',
        type: 'day',
      },
      {
        id: Unit.TIMEID,
        phrases: ['week', 'weeks'],
        plural: 'Weeks',
        ratio: 604800,
        singular: 'Week',
        type: 'week',
      },
    ],
  );
}

function setTemperatureUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.TEMPERATUREID,
        phrases: ['K', 'kelvin'],
        ratio: 1,
        type: 'K',
      },

      {
        bias: '255.3722222222222',
        id: Unit.TEMPERATUREID,
        phrases: ['°F', 'F'],
        ratio: '0.55555555555555555556',
        type: '°F',
      },
      {
        bias: 273.15,
        id: Unit.TEMPERATUREID,
        phrases: ['°C', 'C'],
        ratio: 1,
        type: '°C',
      },
    ],
  );
}
