import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { NumberSystem } from './numberSystem';
import { UnitMeta } from './units';

abstract class Type {
  public abstract TYPE: DATATYPE;
  public abstract TYPERANK: TYPERANK;
  public abstract print(): string;
  public abstract toNumber(): number;
  public toString(): string {
    return this.print();
  }
}

export enum DATATYPE {
  NUMBER,
  UNIT,
  PERCENTAGE,
}
export enum TYPERANK {
  PERCENTAGE,
  NUMBER,
  UNIT,
}

/**
 * Represents a type of variable or value
 */
// tslint:disable-next-line:no-namespace
namespace Type {
  export abstract class Numberic extends Type {
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

    public setSystem(numberSys: NumberSystem): Numberic {
      this.ns = numberSys;
      return this;
    }

    public toNumericString(): string {
      return this.ns.to(this.n);
    }

    public print(): string {
      return this.toNumericString();
    }

    public GT(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.gt(value);
      }
      return value.gt(value);
    }
    public GTE(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.gte(value);
      }
      return value.gte(value);
    }

    public LT(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.lt(value);
      }
      return value.lte(value);
    }

    public LTE(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.lte(value);
      }
      return value.lte(value);
    }

    public EQ(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.eq(value);
      }
      return value.eq(value);
    }

    public NEQ(value: Numberic): Numberic {
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        return this.nEq(value);
      }
      return value.nEq(value);
    }

    public Add(value: Numberic, start?: number, end?: number): Numberic {
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
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          return value.New(this.plus(value).n);
        }
        return this.plus(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.plus(this);
      }
      return this.New(value.plus(this).n);
    }

    public Sub(value: Numberic, start?: number, end?: number): Numberic {
      return this.Add(value.negated(), start, end);
    }

    public times(value: Numberic, start?: number, end?: number): Numberic {
      this.start = start;
      this.end = end;
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          return value.New(this.mul(value).n);
        }
        return this.mul(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.mul(this);
      }
      return this.New(value.mul(this).n);
    }

    public divide(value: Numberic, start?: number, end?: number): Numberic {
      this.start = start;
      this.end = end;
      if (!this.n.isFinite() && !value.n.isFinite()) {
        throw new FcalError('Division between Infinity is indeterminate', start, end);
      }
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.div(value);
          }
          return value.New(this.div(value).n);
        }
        return this.div(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.div(this);
      }
      return this.New(value.div(this).n);
    }

    public power(value: Numberic, start?: number, end?: number): Numberic {
      this.start = start;
      this.end = end;
      if (this.isNegative()) {
        if (!value.isInteger()) {
          throw new FcalError(
            `Pow of operation results in complex number and complex is not supported yet`,
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
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.New(this.pow(value).n);
          }
          return value.New(this.pow(value).n);
        }
        return this.pow(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.pow(this);
      }
      return this.New(value.pow(this).n);
    }

    public modulo(value: Numberic, start?: number, end?: number): Numberic {
      this.start = start;
      this.end = end;
      if (!this.n.isFinite()) {
        throw new FcalError('Modulus between Infinity is indeterminate', start, end);
      }
      if (value.isZero()) {
        return new Type.BNumber('Infinity');
      }
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.New(this.mod(value).n);
          }
          return value.New(this.mod(value).n);
        }
        return this.mod(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.mod(this);
      }
      return this.New(value.mod(this).n);
    }

    public toNumber(): number {
      return this.n.toNumber();
    }
    public not(): Numberic {
      return new FBoolean(this.n).not();
    }
    public abstract New(value: Decimal): Numberic;
    public abstract isZero(): boolean;
    public abstract isNegative(): boolean;
    public abstract isInteger(): boolean;
    public abstract negated(): Numberic;
    public abstract plus(value: Numberic): Numberic;
    public abstract mul(value: Numberic): Numberic;
    public abstract div(value: Numberic): Numberic;
    public abstract pow(value: Numberic): Numberic;
    public abstract mod(value: Numberic): Numberic;
    public abstract gt(value: Numberic): Numberic;
    public abstract gte(value: Numberic): Numberic;
    public abstract lt(value: Numberic): Numberic;
    public abstract lte(value: Numberic): Numberic;
    public abstract eq(value: Numberic): Numberic;
    public abstract nEq(value: Numberic): Numberic;
  }
  /**
   * Basic Number type
   */
  export class BNumber extends Numberic {
    public static ZERO = BNumber.New(new Decimal(0));

    public static New(value: string | Decimal | number) {
      return new BNumber(value);
    }

    public TYPERANK: TYPERANK;
    public TYPE: DATATYPE;

    constructor(value: string | Decimal | number) {
      super(value);
      this.TYPE = DATATYPE.NUMBER;
      this.TYPERANK = TYPERANK.NUMBER;
    }

    public gt(value: Numberic): Numberic {
      return new FBoolean(this.n.gt(value.n));
    }
    public gte(value: Numberic): Numberic {
      return new FBoolean(this.n.gte(value.n));
    }
    public lt(value: Numberic): Numberic {
      return new FBoolean(this.n.lt(value.n));
    }
    public lte(value: Numberic): Numberic {
      return new FBoolean(this.n.lte(value.n));
    }
    public eq(value: Numberic): Numberic {
      return new FBoolean(this.n.eq(value.n));
    }
    public nEq(value: Numberic): Numberic {
      return this.eq(value).not();
    }
    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public isInteger(): boolean {
      return this.n.isInteger();
    }

    public negated(): Numberic {
      return BNumber.New(this.n.negated());
    }

    public div(value: Numberic): Numberic {
      return BNumber.New(this.n.div(value.n));
    }

    public pow(value: Numberic): Numberic {
      return BNumber.New(this.n.pow(value.n));
    }

    public mod(value: Numberic): Numberic {
      return BNumber.New(this.n.modulo(value.n));
    }

    public mul(value: Numberic): Numberic {
      return BNumber.New(this.n.mul(value.n));
    }

    public plus(value: Numberic): Numberic {
      return BNumber.New(this.n.plus(value.n));
    }

    public New(value: Decimal): Numberic {
      return BNumber.New(value);
    }
  }
  /**
   * Percentage type
   */
  export class Percentage extends Numberic {
    public static New(value: string | Decimal | number): Percentage {
      return new Percentage(value);
    }

    private static base = new Decimal(100);
    public TYPE: DATATYPE;
    public TYPERANK: TYPERANK;

    constructor(value: string | Decimal | number) {
      super(value);
      this.TYPE = DATATYPE.PERCENTAGE;
      this.TYPERANK = TYPERANK.PERCENTAGE;
    }
    public gt(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.gt(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.gt(this.percentageValue(this.n)));
      }
      return new FBoolean(this.n.gt(this.percentageValue(value.n)));
    }
    public gte(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.gte(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.gte(this.percentageValue(this.n)));
      }
      return new FBoolean(this.n.gte(this.percentageValue(value.n)));
    }
    public lt(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.lt(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.lt(this.percentageValue(this.n)));
      }
      return new FBoolean(this.n.lt(this.percentageValue(value.n)));
    }
    public lte(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.lte(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.lte(this.percentageValue(this.n)));
      }
      return new FBoolean(this.n.lte(this.percentageValue(value.n)));
    }
    public eq(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return new FBoolean(this.n.eq(value.n));
      }
      if (value.lf) {
        return new FBoolean(value.n.eq(this.percentageValue(this.n)));
      }
      return new FBoolean(this.n.eq(this.percentageValue(value.n)));
    }
    public nEq(value: Numberic): Numberic {
      return this.eq(value).not();
    }

    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public isInteger(): boolean {
      return this.n.isInteger();
    }

    public negated(): Numberic {
      return Percentage.New(this.n.negated());
    }

    public plus(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.plus(value.n));
      }
      return Percentage.New(value.n.plus(this.percentageValue(value.n)));
    }

    public mul(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.mul(value.n));
      }
      return Percentage.New(value.n.mul(this.percentageValue(value.n)));
    }

    public div(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.div(value.n));
      }
      if (value.lf) {
        return Percentage.New(value.n.div(this.percentageValue(value.n)));
      }
      return Percentage.New(this.percentageValue(value.n).div(value.n));
    }

    public pow(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.n.pow(value.n));
      }
      if (value.lf) {
        return Percentage.New(value.n.pow(this.percentageValue(value.n)));
      }
      return Percentage.New(this.percentageValue(value.n).pow(value.n));
    }

    public mod(value: Numberic): Numberic {
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

    public New(value: Decimal): Numberic {
      return Percentage.New(value);
    }
  }
  /**
   * Number with unit
   */
  export class UnitNumber extends Numberic {
    public static New(value: string | Decimal | number, unit: UnitMeta): UnitNumber {
      return new UnitNumber(value, unit);
    }

    public static convertToUnit(value: Numberic, unit: UnitMeta): UnitNumber {
      if (value instanceof UnitNumber) {
        const value2 = value as UnitNumber;
        if (value2.unit.id === unit.id && value2.unit.unitType !== unit.unitType) {
          return UnitNumber.New(value2.convert(unit.ratio, unit.bias), unit).setSystem(value.ns) as UnitNumber;
        }
      }
      return UnitNumber.New(value.n, unit).setSystem(value.ns) as UnitNumber;
    }

    public TYPE: DATATYPE;
    public TYPERANK: TYPERANK;
    public unit: UnitMeta;

    constructor(value: string | Decimal | number, unit: UnitMeta) {
      super(value);
      this.unit = unit;
      this.TYPE = DATATYPE.UNIT;
      this.TYPERANK = TYPERANK.UNIT;
    }

    public New(value: Decimal): Numberic {
      return new UnitNumber(value, this.unit);
    }

    public isZero(): boolean {
      return this.n.isZero();
    }

    public isNegative(): boolean {
      return this.n.isNegative();
    }

    public isInteger(): boolean {
      return this.n.isInteger();
    }

    public negated(): Numberic {
      return this.New(this.n.negated());
    }

    public gt(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      [left, right] = this.lf ? [this, value] : [value, value];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).gt(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public gte(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      [left, right] = this.lf ? [this, value] : [value, value];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).gte(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public lt(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      [left, right] = this.lf ? [this, value] : [value, value];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).lt(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public lte(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      [left, right] = this.lf ? [this, value] : [value, value];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).lte(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public eq(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      [left, right] = this.lf ? [this, value] : [value, value];
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.id === right1.unit.id) {
          return new FBoolean(left1.convert(right1.ratio(), right1.bias()).eq(right1.n));
        }
      }
      return new FBoolean(left.n.gt(right.n));
    }

    public nEq(value: Numberic): Numberic {
      return this.eq(value).not();
    }

    public plus(value: Numberic): Numberic {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === value.unit.id) {
          return right.New(this.convert(right.ratio(), right.bias()).add(right.n));
        }
        return value.New(this.n.plus(value.n));
      }
      return this.New(this.n.plus(value.n));
    }

    public mul(value: Numberic): Numberic {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === value.unit.id) {
          return right.New(this.convert(right.ratio(), right.bias()).mul(right.n));
        }
        return value.New(this.n.mul(value.n));
      }
      return this.New(this.n.mul(value.n));
    }

    public div(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
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

    public pow(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
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

    public mod(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;

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
      this.v = !this.v;
      return this;
    }
  }
}

export { Type };
