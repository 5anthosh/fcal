import Big = require('decimal.js');
import { FcalError } from '../FcalError';

export class UnitMeta {
  public id: string;
  public ratio: Big.Decimal;
  public bias: Big.Decimal;
  public unitType: string;
  public singular: string;
  public plural: string;
  constructor(id: string, ratio: Big.Decimal, unitType: string) {
    this.id = id;
    this.ratio = ratio;
    this.bias = new Big.Decimal(0);
    this.unitType = unitType;
    this.plural = unitType;
    this.singular = unitType;
  }
  public setBias(value: Big.Decimal) {
    this.bias = value;
  }
  public setPlural(value: string) {
    this.plural = value;
  }
  public setSingular(value: string) {
    this.singular = value;
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
  public Plural(value: string): Unit {
    this.unit.setPlural(value);
    return this;
  }
  public Singular(value: string): Unit {
    this.unit.setSingular(value);
    return this;
  }
}

// tslint:disable-next-line:no-namespace
export namespace Unit {
  export const LENGTHID = 'LENGTH';
  export const SPEEDID = 'SPEED';
  export const TIMEID = 'TIME';
  export const TEMPERATUREID = 'TIMERATURE';
  /**
   * List of units
   */
  export class List {
    public units: { [index: string]: Unit };
    constructor() {
      this.units = {};
    }
    /**
     * Add a new unit
     * @param unit
     * @throws Error if phrases already exists
     */
    public push(unit: Unit) {
      const phrase = this.check(unit.phrases);
      if (phrase !== null) {
        FcalError.throwWithoutCtx(`${phrase} phrase already exists`);
      }
      for (const phrase1 of unit.phrases) {
        this.units[phrase1] = unit;
      }
    }
    /**
     * check if unit already exists
     * @param phrases
     */
    public check(phrases: string[]): string | null {
      for (const phrase of phrases) {
        if (this.units.hasOwnProperty(phrase)) {
          return phrase;
        }
      }
      return null;
    }
    /**
     * get the unit by its phrase
     * @param phrase
     */
    public get(phrase: string): UnitMeta | null {
      if (this.units.hasOwnProperty(phrase)) {
        return this.units[phrase].unit;
      }
      return null;
    }
  }
}
