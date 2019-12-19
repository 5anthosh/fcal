import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { NumberSystem } from './numberSystem';
import { UnitMeta } from './units';

abstract class Type {
  public abstract TYPE: DATATYPE;
  public abstract TYPE_RANK: TYPE_RANK;
  public abstract print(): string;
  public abstract toNumber(): number;
  public abstract trusty(): boolean;
  public toString(): string {
    return this.print();
  }
}

export enum DATATYPE {
  NUMBER,
  UNIT,
  PERCENTAGE,
}
export enum TYPE_RANK {
  PERCENTAGE,
  NUMBER,
  UNIT,
}

/**
 * Represents a type of variable or value
 */
// tslint:disable-next-line:no-namespace
namespace Type {
  export abstract class Numeric extends Type {
    public n: Decimal;
    public lf: boolean;
    public ns: NumberSystem;
    public start?: number;
    public end?: number;

    constructor(value: string | Decimal | number) {
      super();
      if (value instanceof Decimal) {
        this.n = value;
      } else {
        this.n = new Decimal(value);
      }
      this.ns = NumberSystem.dec;
      this.lf = false;
    }

    public setSystem(numberSys: NumberSystem): Numeric {
      this.ns = numberSys;
      return this;
    }

    public toNumericString(): string {
      return this.ns.to(this.n);
    }

    public print(): string {
      return this.toNumericString();
    }

    public GT(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.gt(value);
      }
      return value.gt(this);
    }
    public GTE(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.gte(value);
      }
      return value.gte(this);
    }

    public LT(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.lt(value);
      }
      return value.lt(this);
    }

    public LTE(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.lte(value);
      }
      return value.lte(this);
    }

    public EQ(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.eq(value);
      }
      return value.eq(this);
    }

    public NEQ(value: Numeric): Numeric {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.nEq(value);
      }
      return value.nEq(this);
    }

    public Add(value: Numeric, start?: number, end?: number): Numeric {
      this.start = start;
      this.end = end;
      if (!this.n.isFinite() && !value.n.isFinite()) {
        if (!((this.n.isNegative() && value.n.isNegative()) || (this.n.isPositive() && value.n.isPositive()))) {
          // console.log(left.number, right.number);
          throw new FcalError('Subtraction between Infinity is indeterminate', start, end);
        }
      }
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check type rank to see which will be the return type
        if (this.TYPE_RANK <= value.TYPE_RANK) {
          return value.New(this.plus(value).n);
        }
        return this.plus(value);
      }
      if (value.TYPE_RANK >= this.TYPE_RANK) {
        return value.plus(this);
      }
      return this.New(value.plus(this).n);
    }

    public Sub(value: Numeric, start?: number, end?: number): Numeric {
      return this.Add(value.negated(), start, end);
    }

    public times(value: Numeric, start?: number, end?: number): Numeric {
      this.start = start;
      this.end = end;
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check type rank to see which will be the return type
        if (this.TYPE_RANK <= value.TYPE_RANK) {
          return value.New(this.mul(value).n);
        }
        return this.mul(value);
      }
      if (value.TYPE_RANK >= this.TYPE_RANK) {
        return value.mul(this);
      }
      return this.New(value.mul(this).n);
    }

    public divide(value: Numeric, start?: number, end?: number): Numeric {
      this.start = start;
      this.end = end;
      if (!this.n.isFinite() && !value.n.isFinite()) {
        throw new FcalError('Division between Infinity is indeterminate', start, end);
      }
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check type rank to see which will be the return type
        if (this.TYPE_RANK <= value.TYPE_RANK) {
          if (this.TYPE_RANK === value.TYPE_RANK) {
            return this.div(value);
          }
          return value.New(this.div(value).n);
        }
        return this.div(value);
      }
      if (value.TYPE_RANK >= this.TYPE_RANK) {
        return value.div(this);
      }
      return this.New(value.div(this).n);
    }

    public power(value: Numeric, start?: number, end?: number): Numeric {
      this.start = start;
      this.end = end;
      if (this.isNegative()) {
        if (!value.n.isInt()) {
          throw new FcalError(
            `Pow of operation results in complex number and complex number is not supported yet`,
            start,
            end,
          );
        }
      }
      // console.log(`CAP ${this.number.toString()} ${value.number.toString()}`);
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check type rank to see which will be the return type
        if (this.TYPE_RANK <= value.TYPE_RANK) {
          if (this.TYPE_RANK === value.TYPE_RANK) {
            return this.New(this.pow(value).n);
          }
          return value.New(this.pow(value).n);
        }
        return this.pow(value);
      }
      if (value.TYPE_RANK >= this.TYPE_RANK) {
        return value.pow(this);
      }
      return this.New(value.pow(this).n);
    }

    public modulo(value: Numeric, start?: number, end?: number): Numeric {
      this.start = start;
      this.end = end;
      if (!this.n.isFinite()) {
        throw new FcalError('Modulus with Infinity is indeterminate', start, end);
      }
      if (value.isZero()) {
        return new Type.BNumber('Infinity');
      }
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check type rank to see which will be the return type
        if (this.TYPE_RANK <= value.TYPE_RANK) {
          if (this.TYPE_RANK === value.TYPE_RANK) {
            return this.New(this.mod(value).n);
          }
          return value.New(this.mod(value).n);
        }
        return this.mod(value);
      }
      if (value.TYPE_RANK >= this.TYPE_RANK) {
        return value.mod(this);
      }
      return this.New(value.mod(this).n);
    }

    public toNumber(): number {
      return this.n.toNumber();
    }

    public trusty(): boolean {
      return !this.n.isZero();
    }

    public not(): Numeric {
      return new FBoolean(this.n).not();
    }
    public abstract New(value: Decimal): Numeric;
    public abstract isZero(): boolean;
    public abstract isNegative(): boolean;
    public abstract negated(): Numeric;
    public abstract plus(value: Numeric): Numeric;
    public abstract mul(value: Numeric): Numeric;
    public abstract div(value: Numeric): Numeric;
    public abstract pow(value: Numeric): Numeric;
    public abstract mod(value: Numeric): Numeric;
    public abstract gt(value: Numeric): Numeric;
    public abstract gte(value: Numeric): Numeric;
    public abstract lt(value: Numeric): Numeric;
    public abstract lte(value: Numeric): Numeric;
    public abstract eq(value: Numeric): Numeric;
    public abstract nEq(value: Numeric): Numeric;
  }
  /**
   * Basic Number type
   */
  export class BNumber extends Numeric {
    public static ZERO = BNumber.New(new Decimal(0));

    public static New(value: string | Decimal | number) {
      return new BNumber(value);
    }

    public TYPE_RANK: TYPE_RANK;
    public TYPE: DATATYPE;

    constructor(value: string | Decimal | number) {
      super(value);
      this.TYPE = DATATYPE.NUMBER;
      this.TYPE_RANK = TYPE_RANK.NUMBER;
    }

    public gt(value: Numeric): Numeric {
      return new FBoolean(this.n.gt(value.n));
    }
    public gte(value: Numeric): Numeric {
      return new FBoolean(this.n.gte(value.n));
    }
    public lt(value: Numeric): Numeric {
      return new FBoolean(this.n.lt(value.n));
    }
    public lte(value: Numeric): Numeric {
      return new FBoolean(this.n.lte(value.n));
    }
    public eq(value: Numeric): Numeric {
      return new FBoolean(this.n.eq(value.n));
    }
    public nEq(value: Numeric): Numeric {
      return this.eq(value).not();
    }
    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public negated(): Numeric {
      return BNumber.New(this.n.negated());
    }

    public div(value: Numeric): Numeric {
      return BNumber.New(this.n.div(value.n));
    }

    public pow(value: Numeric): Numeric {
      return BNumber.New(this.n.pow(value.n));
    }

    public mod(value: Numeric): Numeric {
      return BNumber.New(this.n.modulo(value.n));
    }

    public mul(value: Numeric): Numeric {
      return BNumber.New(this.n.mul(value.n));
    }

    public plus(value: Numeric): Numeric {
      return BNumber.New(this.n.plus(value.n));
    }

    public New(value: Decimal): Numeric {
      return BNumber.New(value);
    }
  }
  /**
   * Percentage type
   */
  export class Percentage extends Numeric {
    public static New(value: string | Decimal | number): Percentage {
      return new Percentage(value);
    }

    private static base = new Decimal(100);
    public TYPE: DATATYPE;
    public TYPE_RANK: TYPE_RANK;

    constructor(value: string | Decimal | number) {
      super(value);
      this.TYPE = DATATYPE.PERCENTAGE;
      this.TYPE_RANK = TYPE_RANK.PERCENTAGE;
    }
    public gt(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.gt(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.gt(this.percentageValue(value.n)));
      }
      return new FBoolean(this.percentageValue(value.n).gt(value.n));
    }
    public gte(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.gte(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.gte(this.percentageValue(value.n)));
      }
      return new FBoolean(this.percentageValue(value.n).gte(value.n));
    }
    public lt(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.lt(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.lt(this.percentageValue(value.n)));
      }
      return new FBoolean(this.percentageValue(value.n).lt(value.n));
    }
    public lte(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.lte(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.lte(this.percentageValue(value.n)));
      }
      return new FBoolean(this.percentageValue(value.n).lte(value.n));
    }
    public eq(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.eq(value.n));
      }
      return new FBoolean(value.n.eq(this.percentageValue(value.n)));
    }
    public nEq(value: Numeric): Numeric {
      return this.eq(value).not();
    }

    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public negated(): Numeric {
      return Percentage.New(this.n.negated());
    }

    public plus(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.plus(value.n));
      }
      return Percentage.New(value.n.plus(this.percentageValue(value.n)));
    }

    public mul(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.mul(value.n));
      }
      return Percentage.New(value.n.mul(this.percentageValue(value.n)));
    }

    public div(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.div(value.n));
      }
      if (value.lf) {
        return Percentage.New(value.n.div(this.percentageValue(value.n)));
      }
      return Percentage.New(this.percentageValue(value.n).div(value.n));
    }

    public pow(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.pow(value.n));
      }
      if (value.lf) {
        return Percentage.New(value.n.pow(this.percentageValue(value.n)));
      }
      return Percentage.New(this.percentageValue(value.n).pow(value.n));
    }

    public mod(value: Numeric): Numeric {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.mod(value.n));
      }
      if (value.lf) {
        return Percentage.New(value.n.mod(this.percentageValue(value.n)));
      }
      return Percentage.New(this.percentageValue(value.n).mod(value.n));
    }

    public percentageValue(value: Decimal): Decimal {
      return value.mul(this.n.div(Percentage.base));
    }

    public print(): string {
      return `% ${this.toNumericString()}`;
    }

    public New(value: Decimal): Numeric {
      return Percentage.New(value);
    }
  }
  /**
   * Number with unit
   */
  export class UnitNumber extends Numeric {
    public static New(value: string | Decimal | number, unit: UnitMeta): UnitNumber {
      return new UnitNumber(value, unit);
    }

    public static convertToUnit(value: Numeric, unit: UnitMeta): UnitNumber {
      if (value instanceof UnitNumber) {
        const value2 = value as UnitNumber;
        if (value2.unit.id === unit.id && value2.unit.unitType !== unit.unitType) {
          return UnitNumber.New(value2.convert(unit.ratio, unit.bias), unit).setSystem(value.ns) as UnitNumber;
        }
      }
      return UnitNumber.New(value.n, unit).setSystem(value.ns) as UnitNumber;
    }

    public TYPE: DATATYPE;
    public TYPE_RANK: TYPE_RANK;
    public unit: UnitMeta;

    constructor(value: string | Decimal | number, unit: UnitMeta) {
      super(value);
      this.unit = unit;
      this.TYPE = DATATYPE.UNIT;
      this.TYPE_RANK = TYPE_RANK.UNIT;
    }

    public New(value: Decimal): Numeric {
      return new UnitNumber(value, this.unit);
    }

    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public negated(): Numeric {
      return this.New(this.n.negated());
    }

    public gt(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).gt(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public gte(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).gte(right1.n));
        }
      }
      return new FBoolean(left.n.gte(right.n));
    }

    public lt(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).lt(right1.n));
        }
      }
      return new FBoolean(left.n.lt(right.n));
    }

    public lte(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).lte(right1.n));
        }
      }
      return new FBoolean(left.n.lte(right.n));
    }

    public eq(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).eq(right1.n));
        }
      }
      return new FBoolean(left.n.eq(right.n));
    }

    public nEq(value: Numeric): Numeric {
      return this.eq(value).not();
    }

    public plus(value: Numeric): Numeric {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === value.unit.id) {
          return right.New(this.convert(right.ratio(), right.bias()).add(right.n));
        }
        return value.New(this.n.plus(value.n));
      }
      return this.New(this.n.plus(value.n));
    }

    public mul(value: Numeric): Numeric {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === value.unit.id) {
          return right.New(this.convert(right.ratio(), right.bias()).mul(right.n));
        }
        return value.New(this.n.mul(value.n));
      }
      return this.New(this.n.mul(value.n));
    }

    public div(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.unitType === right1.unit.unitType) {
          return new Type.BNumber(left1.n.div(right1.n));
        }
        if (left1.unit.id !== right1.unit.id) {
          return left1.New(left1.n.div(right.n));
        }
        return new Type.BNumber(left1.n.div(right1.convert(left1.ratio(), left1.bias())));
      }
      return this.New(left.n.div(right.n));
    }

    public pow(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;
      [left, right] = this.lf ? [this, value] : [value, this];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.New(left1.n.pow(right1.n));
        }

        if (left1.unit.id !== right1.unit.id) {
          return left1.New(left1.n.pow(right.n));
        }

        return left1.New(left1.n.pow(right1.convert(left1.ratio(), left1.bias())));
      }

      return this.New(left.n.pow(right.n));
    }

    public mod(value: Numeric): Numeric {
      let left: Numeric;
      let right: Numeric;

      [left, right] = this.lf ? [this, value] : [value, this];

      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;

        if (left1.unit.id !== right1.unit.id) {
          return left1.New(left1.n.mod(right1.n));
        }

        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.New(left1.n.mod(right1.n));
        }

        return left1.New(left1.n.mod(right1.convert(left1.ratio(), left1.bias())));
      }

      return this.New(left.n.mod(right.n));
    }

    public convert(ratio: Decimal, bias: Decimal): Decimal {
      return this.n
        .mul(this.ratio())
        .add(this.bias())
        .minus(bias)
        .div(ratio);
    }

    public ratio(): Decimal {
      return this.unit.ratio;
    }

    public bias(): Decimal {
      return this.unit.bias;
    }

    public print(): string {
      if (this.n.lessThanOrEqualTo(1) && !this.n.isNegative()) {
        return `${this.toNumericString()} ${this.unit.singular}`;
      }
      return `${this.toNumericString()} ${this.unit.plural}`;
    }
  }

  export class FBoolean extends BNumber {
    public static TRUE: FBoolean = new FBoolean(1);
    public static FALSE: FBoolean = new FBoolean(0);
    private v: boolean;
    constructor(value: string | number | Decimal | boolean) {
      if (typeof value === 'boolean') {
        super(value ? 1 : 0);
        this.v = value;
        return;
      }
      super(value);
      this.v = !this.n.isZero();
    }
    public print(): string {
      return this.v + '';
    }
    public not(): BNumber {
      return this.v ? FBoolean.FALSE : FBoolean.TRUE;
    }
  }
}

export { Type };
