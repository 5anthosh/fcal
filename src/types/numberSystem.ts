import Decimal from 'decimal.js';

export class NumberSystem {
  public static Decimal = new NumberSystem('Decimal', (num: Decimal) => {
    return num.toString();
  });

  public static HexaDecimal = new NumberSystem('HexaDecimal', (num: Decimal) => {
    return num.toHexadecimal();
  });

  public static Binary = new NumberSystem('Binary', (num: Decimal) => {
    return num.toBinary();
  });

  public static Octal = new NumberSystem('Octal', (num: Decimal) => {
    return num.toOctal();
  });
  public static get(ns: string): NumberSystem | undefined {
    return NumberSystem.ns[ns];
  }
  private static ns: { [index: string]: NumberSystem } = {
    bin: NumberSystem.Binary,
    binary: NumberSystem.Binary,
    dec: NumberSystem.Decimal,
    decimal: NumberSystem.Decimal,
    hex: NumberSystem.HexaDecimal,
    hexadecimal: NumberSystem.HexaDecimal,
    oct: NumberSystem.Octal,
    octal: NumberSystem.Octal,
  };
  public name: string;
  public to: (num: Decimal) => string;
  constructor(name: string, to: (num: Decimal) => string) {
    this.to = to;
    this.name = name;
  }
}

// // tslint:disable-next-line: no-namespace
// export namespace NumberSystem {
//   class
// }
