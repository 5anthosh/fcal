import { IUseUnit } from '../types/units';
import { Unit } from '../types/units';

export function getDefaultUnits(): IUseUnit[] {
  const units = new Array<IUseUnit>();
  setDistanceUnits(units);
  setSpeedUnits(units);
  setTimeUnits(units);
  setTemperatureUnits(units);
  setMassUnits(units);
  setDigitalStorageUnits(units);
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
        phrases: ['minute', 'minutes'],
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

function setMassUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.MASSID,
        phrases: ['gram', 'g'],
        ratio: 1,
        type: 'gram',
      },
      {
        id: Unit.MASSID,
        phrases: ['tonne'],
        ratio: 1e6,
        type: 'tonne',
      },
      {
        id: Unit.MASSID,
        phrases: ['kg', 'kilogram'],
        ratio: 1000,
        type: 'kilogram',
      },
      {
        id: Unit.MASSID,
        phrases: ['milligram', 'mg'],
        ratio: 0.001,
        type: 'milligram',
      },
      {
        id: Unit.MASSID,
        phrases: ['microgram'],
        ratio: 1e-6,
        type: 'microgram',
      },
      {
        id: Unit.MASSID,
        phrases: ['imperialton'],
        ratio: '1.016e+6',
        type: 'imperialton',
      },
      {
        id: Unit.MASSID,
        phrases: ['USton'],
        ratio: '907185',
        type: 'USton',
      },
      {
        id: Unit.MASSID,
        phrases: ['stone'],
        ratio: '6350.29',
        type: 'stone',
      },
      {
        id: Unit.MASSID,
        phrases: ['pound'],
        ratio: '453.592',
        type: 'pound',
      },
      {
        id: Unit.MASSID,
        phrases: ['ounce'],
        ratio: '28.3495',
        type: 'ounce',
      },
    ],
  );
}

function setDigitalStorageUnits(units: IUseUnit[]): void {
  units.push(
    ...[
      {
        id: Unit.DIGITAL,
        phrases: ['bit'],
        ratio: 1,
        type: 'bit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['kilobit'],
        ratio: 1000,
        type: 'kilobit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['kibibit'],
        ratio: 1024,
        type: 'kibibit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['megabit'],
        ratio: 1e6,
        type: 'megabit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['mebibit'],
        ratio: '1.049e+6',
        type: 'mebibit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['gigabit'],
        ratio: 1e9,
        type: 'gigabit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['gibibit'],
        ratio: '1.074e+9',
        type: 'gibibit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['terabit'],
        ratio: 1e12,
        type: 'terabit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['tebibit'],
        ratio: '1.1e+12',
        type: 'tebibit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['petabit'],
        ratio: 1e15,
        type: 'petabit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['pebibit'],
        ratio: '1.126e+15',
        type: 'pebibit',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['byte'],
        ratio: 8,
        type: 'byte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['kilobyte'],
        ratio: 8000,
        type: 'kilobyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['kibibyte'],
        ratio: 8192,
        type: 'kibibyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['megabyte'],
        ratio: 8e6,
        type: 'megabyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['mebibyte'],
        ratio: '8.389e+6',
        type: 'mebibyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['gigabyte'],
        ratio: 8e9,
        type: 'gigabyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['gibibyte'],
        ratio: '8.59e+9',
        type: 'gibibyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['terabyte'],
        ratio: 8e12,
        type: 'terabyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['tebibyte'],
        ratio: '8.796e+12',
        type: 'tebibyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['petabyte'],
        ratio: 8e15,
        type: 'petabyte',
      },
      {
        id: Unit.DIGITAL,
        phrases: ['pebibyte'],
        ratio: '9.007e+15',
        type: 'pebibyte',
      },
    ],
  );
}
