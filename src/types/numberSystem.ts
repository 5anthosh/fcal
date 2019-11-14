import { Decimal } from 'decimal.js';

class NumberSystem {
  public static dec = new NumberSystem('Decimal', (num: Decimal) => {
    return num.toString();
  });

  public static hex = new NumberSystem('HexaDecimal', (num: Decimal) => {
    return num.toHexadecimal();
  });

  public static bin = new NumberSystem('Binary', (num: Decimal) => {
    return num.toBinary();
  });

  public static oct = new NumberSystem('Octal', (num: Decimal) => {
    return num.toOctal();
  });

  public static get(ns: string): NumberSystem | undefined {
    return NumberSystem.ns[ns];
  }

  private static ns: { [index: string]: NumberSystem } = {
    bin: NumberSystem.bin,
    binary: NumberSystem.bin,
    dec: NumberSystem.dec,
    decimal: NumberSystem.dec,
    hex: NumberSystem.hex,
    hexadecimal: NumberSystem.hex,
    oct: NumberSystem.oct,
    octal: NumberSystem.oct,
  };

  public name: string;
  public to: (num: Decimal) => string;

  constructor(name: string, to: (num: Decimal) => string) {
    this.to = to;
    this.name = name;
  }
}

export { NumberSystem };
