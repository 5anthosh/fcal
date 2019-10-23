import Decimal from 'decimal.js';

export class NumberSystem {
  public static Decimal = new NumberSystem((num: Decimal) => {
    return num.toString();
  });

  public static HexaDecimal = new NumberSystem((num: Decimal) => {
    return num.toHexadecimal();
  });

  public static Binary = new NumberSystem((num: Decimal) => {
    return num.toBinary();
  });

  public static Octal = new NumberSystem((num: Decimal) => {
    return num.toOctal();
  });

  public to: (num: Decimal) => string;
  constructor(to: (num: Decimal) => string) {
    this.to = to;
  }
}

// // tslint:disable-next-line: no-namespace
// export namespace NumberSystem {
//   class
// }
