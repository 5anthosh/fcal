import Big = require('big.js');
export class Type {
  public static Number(value: string): Big.Big {
    return new Big.Big(value);
  }
}
