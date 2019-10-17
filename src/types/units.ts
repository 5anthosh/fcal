import Big = require('decimal.js');
import { FcalError } from '../FcalError';

export class UnitMeta {
  public id: string;
  public ratio: Big.Decimal;
  public bias: Big.Decimal;
  public unitType: string;
  constructor(id: string, ratio: Big.Decimal, unitType: string) {
    this.id = id;
    this.ratio = ratio;
    this.bias = new Big.Decimal(0);
    this.unitType = unitType;
  }
  public setBias(value: Big.Decimal) {
    this.bias = value;
  }
}

/**
 * Represents unit with info
 */
export class Unit {
  public phrases: string[];
  public unit: UnitMeta;
  constructor(id: string, ratio: Big.Decimal, unitType: string, phrases: string[]) {
    this.unit = new UnitMeta(id, ratio, unitType);
    this.phrases = phrases;
  }
  public setBias(value: Big.Decimal): Unit {
    this.unit.setBias(value);
    return this;
  }
}

// tslint:disable-next-line:no-namespace
export namespace Unit {
  /**
   * List of units
   */
  export class Units {
    public units: Unit[];
    constructor() {
      this.units = [];
    }
    /**
     * Add a new unit
     * @param unit
     * @throws Error if phrases already exists
     */
    public Add(unit: Unit) {
      if (this.check(unit.phrases)) {
        FcalError.throwWithoutCtx('phrase already exists');
      }
      this.units.push(unit);
    }
    /**
     * check if unit already exists
     * @param phrases
     */
    public check(phrases: string[]): boolean {
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
    /**
     * get the unit by its phrase
     * @param phrase
     */
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
