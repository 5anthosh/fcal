import Big = require('decimal.js');

export class UnitMeta {
  public id: string;
  public ratio: Big.Decimal;
  public unitType: string;
  constructor(id: string, ratio: Big.Decimal, unitType: string) {
    this.id = id;
    this.ratio = ratio;
    this.unitType = unitType;
  }
}

export class Unit {
  public phrases: string[];
  public unit: UnitMeta;
  constructor(id: string, ratio: Big.Decimal, unitType: string, ...phrases: string[]) {
    this.unit = new UnitMeta(id, ratio, unitType);
    this.phrases = phrases;
  }
}

// tslint:disable-next-line:no-namespace
export namespace Unit {
  /**
   * Represents various Term types
   */

  export class Units {
    public units: Unit[];
    constructor() {
      this.units = [];
    }
    public Add(unit: Unit) {
      if (this.check(...unit.phrases)) {
        throw new Error('phrase already exits');
      }
      this.units.push(unit);
    }
    public check(...phrases: string[]): boolean {
      for (const unit of this.units) {
        for (const phrase of unit.phrases) {
          for (const phrase2 of phrases) {
            if (phrase === phrase2) {
              return true;
            }
          }
        }
      }
      return false;
    }
    public get(phrase: string): [UnitMeta | null, boolean] {
      for (const unit of this.units) {
        for (const phrase2 of unit.phrases) {
          if (phrase === phrase2) {
            return [unit.unit, true];
          }
        }
      }
      return [null, false];
    }
  }
}
