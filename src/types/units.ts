import Big = require('decimal.js');

export class Unit {
  public id: string;
  public ratio: Big.Decimal;
  public unitType: string;
  constructor(id: string, ratio: Big.Decimal, unitType: string) {
    this.id = id;
    this.ratio = ratio;
    this.unitType = unitType;
  }
}

export class TType {
  public phrases: string[];
  public unit: Unit;
  constructor(id: string, ratio: Big.Decimal, unitType: string, ...phrases: string[]) {
    this.unit = new Unit(id, ratio, unitType);
    this.phrases = phrases;
  }
}

// tslint:disable-next-line:no-namespace
export namespace TType {
  /**
   * Represents various Term types
   */

  export class TTypes {
    public ttypes: TType[];
    constructor() {
      this.ttypes = [];
    }
    public Add(ttype: TType) {
      if (this.check(...ttype.phrases)) {
        throw new Error('phrase already exits');
      }
      this.ttypes.push(ttype);
    }
    public check(...phrases: string[]): boolean {
      for (const ttype of this.ttypes) {
        for (const phrase of ttype.phrases) {
          for (const phrase2 of phrases) {
            if (phrase === phrase2) {
              return true;
            }
          }
        }
      }
      return false;
    }
    public get(phrase: string): [Unit, boolean] {
      for (const ttype of this.ttypes) {
        for (const phrase2 of ttype.phrases) {
          if (phrase === phrase2) {
            return [ttype.unit, true];
          }
        }
      }
      return [null, false];
    }
  }
}
