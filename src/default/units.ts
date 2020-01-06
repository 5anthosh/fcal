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
        id: Unit.LENGTH_ID,
        phrases: ['cm', 'centimeter'],
        plural: 'Centimeters',
        ratio: 1,
        singular: 'Centimeter',
        type: 'cm',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['m', 'meter'],
        plural: 'Meters',
        ratio: 100,
        singular: 'Meter',
        type: 'm',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['mm', 'milimeter'],
        plural: 'Milimeters',
        ratio: 0.1,
        singular: 'Milimeter',
        type: 'mm',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['km'],
        plural: 'Kilometers',
        ratio: 100000,
        singular: 'Kilometer',
        type: 'km',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['inch'],
        plural: 'Inches',
        ratio: 2.54,
        singular: 'Inch',
        type: 'inch',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['ft'],
        plural: 'Feet',
        ratio: 30.48,
        singular: 'Foot',
        type: 'foot/feet',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['yd', 'yard'],
        plural: 'Yards',
        ratio: 91.44,
        singular: 'Yard',
        type: 'yard',
      },

      {
        id: Unit.LENGTH_ID,
        phrases: ['mi'],
        plural: 'Miles',
        ratio: 160934.4,
        singular: 'Mile',
        type: 'mile',
      },

      {
        id: Unit.LENGTH_ID,
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
        id: Unit.SPEED_ID,
        phrases: ['kmh', 'kmph', 'khm', 'kph'],
        ratio: 1,
        type: 'km/h',
      },
      {
        id: Unit.SPEED_ID,
        phrases: ['mph'],
        ratio: 1.609344,
        type: 'miles/h',
      },
      {
        id: Unit.SPEED_ID,
        phrases: ['mps'],
        ratio: 3.6,
        type: 'm/s',
      },
      {
        id: Unit.SPEED_ID,
        phrases: ['fps'],
        ratio: 1.097,
        type: 'ft/s',
      },
      {
        id: Unit.SPEED_ID,
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
        id: Unit.TIME_ID,
        phrases: ['nsec', 'nanosecond', 'nanoseconds'],
        plural: 'Nanoseconds',
        ratio: 1e-9,
        singular: 'Nanosecond',
        type: 'nsec',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['msec', 'microsecond', 'microseconds'],
        plural: 'Microseconds',
        ratio: 1e-6,
        singular: 'Microsecond',
        type: 'msec',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['ms', 'millisecond', 'milliseconds'],
        plural: 'Milliseconds',
        ratio: 1e-3,
        singular: 'Millisecond',
        type: 'ms',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['sec', 'second', 'seconds'],
        plural: 'Seconds',
        ratio: 1,
        singular: 'Second',
        type: 'second',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['minute', 'minutes'],
        plural: 'Minutes',
        ratio: 60,
        singular: 'Minute',
        type: 'minute',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['hr', 'hour', 'hours'],
        plural: 'Hours',
        ratio: 3600,
        singular: 'Hour',
        type: 'hour',
      },
      {
        id: Unit.TIME_ID,
        phrases: ['day', 'days'],
        plural: 'Days',
        ratio: 86400,
        singular: 'Day',
        type: 'day',
      },
      {
        id: Unit.TIME_ID,
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
        id: Unit.TEMPERATURE_ID,
        phrases: ['K', 'kelvin'],
        ratio: 1,
        type: 'K',
      },

      {
        bias: '255.3722222222222',
        id: Unit.TEMPERATURE_ID,
        phrases: ['°F', 'F'],
        ratio: '0.55555555555555555556',
        type: '°F',
      },
      {
        bias: 273.15,
        id: Unit.TEMPERATURE_ID,
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
        id: Unit.MASS_ID,
        phrases: ['gram', 'g'],
        ratio: 1,
        type: 'gram',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['tonne'],
        ratio: 1e6,
        type: 'tonne',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['kg', 'kilogram'],
        ratio: 1000,
        type: 'kilogram',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['milligram', 'mg'],
        ratio: 0.001,
        type: 'milligram',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['microgram'],
        ratio: 1e-6,
        type: 'microgram',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['imperialton'],
        ratio: '1.016e+6',
        type: 'imperialton',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['USton'],
        ratio: '907185',
        type: 'USton',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['stone'],
        ratio: '6350.29',
        type: 'stone',
      },
      {
        id: Unit.MASS_ID,
        phrases: ['pound'],
        ratio: '453.592',
        type: 'pound',
      },
      {
        id: Unit.MASS_ID,
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
        id: Unit.DIGITAL_ID,
        phrases: ['bit'],
        ratio: 1,
        type: 'bit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['kilobit', 'kB'],
        ratio: 1000,
        type: 'kilobit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['kibibit', 'kiB'],
        ratio: 1024,
        type: 'kibibit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['megabit', 'mB'],
        ratio: 1e6,
        type: 'megabit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['mebibit', 'miB'],
        ratio: '1.049e+6',
        type: 'mebibit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['gigabit', 'gB'],
        ratio: 1e9,
        type: 'gigabit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['gibibit', 'giB'],
        ratio: '1.074e+9',
        type: 'gibibit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['terabit', 'tB'],
        ratio: 1e12,
        type: 'terabit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['tebibit', 'tiB'],
        ratio: '1.1e+12',
        type: 'tebibit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['petabit', 'pB'],
        ratio: 1e15,
        type: 'petabit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['pebibit', 'piB'],
        ratio: '1.126e+15',
        type: 'pebibit',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['byte', 'b'],
        ratio: 8,
        type: 'byte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['kilobyte', 'kb'],
        ratio: 8000,
        type: 'kilobyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['kibibyte', 'kib'],
        ratio: 8192,
        type: 'kibibyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['megabyte', 'mb'],
        ratio: 8e6,
        type: 'megabyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['mebibyte', 'mib'],
        ratio: '8.389e+6',
        type: 'mebibyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['gigabyte', 'gb'],
        ratio: 8e9,
        type: 'gigabyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['gibibyte', 'gib'],
        ratio: '8.59e+9',
        type: 'gibibyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['terabyte', 'tb'],
        ratio: 8e12,
        type: 'terabyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['tebibyte', 'tib'],
        ratio: '8.796e+12',
        type: 'tebibyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['petabyte', 'pb'],
        ratio: 8e15,
        type: 'petabyte',
      },
      {
        id: Unit.DIGITAL_ID,
        phrases: ['pebibyte', 'pib'],
        ratio: '9.007e+15',
        type: 'pebibyte',
      },
    ],
  );
}
