import Big = require('bignumber.js');
export class Type {
  public static Number(value: string): Big.BigNumber {
    return new Big.BigNumber(value);
  }
}
