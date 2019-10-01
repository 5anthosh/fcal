import Big = require('decimal.js');
export class Type {
  public static Number(value: string): Big.Decimal {
    return new Big.Decimal(value);
  }
}
