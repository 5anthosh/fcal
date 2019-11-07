import Big = require('decimal.js');
import { NumberSystem } from './numberSystem';
import { UnitMeta } from './units';
export abstract class Type {
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
export namespace Type {
  export abstract class Numberic extends Type {
    public n: Big.Decimal;
    public lf: boolean;
    public ns: NumberSystem;
    constructor(value: string | Big.Decimal | number) {
      super();
      if (value instanceof Big.Decimal) {
        this.n = value;
      } else {
        this.n = new Big.Decimal(value);
      }
      this.ns = NumberSystem.Decimal;
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

    public Add(value: Numberic): Numberic {
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

    public Sub(value: Numberic): Numberic {
      return this.Add(value.negated());
    }

    public times(value: Numberic): Numberic {
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

    public divide(value: Numberic): Numberic {
      // console.log(`DIVIDE ${this.number.toString()} ${value.number.toString()}`);
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.lf = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.New(this.div(value).n);
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

    public power(value: Numberic): Numberic {
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

    public modulo(value: Numberic): Numberic {
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

    public abstract New(value: Big.Decimal): Numberic;
    public abstract isZero(): boolean;
    public abstract isNegative(): boolean;
    public abstract isInteger(): boolean;
    public abstract negated(): Numberic;
    public abstract plus(value: Numberic): Numberic;
    public abstract mul(value: Numberic): Numberic;
    public abstract div(value: Numberic): Numberic;
    public abstract pow(value: Numberic): Numberic;
    public abstract mod(value: Numberic): Numberic;
  }
  /**
   * Basic Number type
   */
  export class BNumber extends Numberic {
    public static ZERO = BNumber.New(new Big.Decimal(0));
    public static New(value: string | Big.Decimal | number) {
      return new BNumber(value);
    }
    public TYPERANK: TYPERANK;
    public TYPE: DATATYPE;
    constructor(value: string | Big.Decimal | number) {
      super(value);
      this.TYPE = DATATYPE.NUMBER;
      this.TYPERANK = TYPERANK.NUMBER;
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
      // if (value instanceof BNumber) {
      // }
      return BNumber.New(this.n.mul(value.n));
      // return value.mul(value.newNumeric(this.number));
    }
    public plus(value: Numberic): Numberic {
      // if (value instanceof BNumber) {
      // }
      return BNumber.New(this.n.plus(value.n));
      // return value.plus(value.newNumeric(this.number));
    }
    public New(value: Big.Decimal): Numberic {
      return BNumber.New(value);
    }
  }
  /**
   * Percentage type
   */
  export class Percentage extends Numberic {
    public static New(value: string | Big.Decimal): Percentage {
      return new Percentage(value);
    }
    private static base = new Big.Decimal(100);
    public TYPE: DATATYPE;
    public TYPERANK: TYPERANK;
    constructor(value: string | Big.Decimal) {
      super(value);
      this.TYPE = DATATYPE.PERCENTAGE;
      this.TYPERANK = TYPERANK.PERCENTAGE;
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
    public percentageValue(value: Big.Decimal): Big.Decimal {
      return value.mul(this.n.div(Percentage.base));
    }
    public print(): string {
      return `% ${this.toNumericString()}`;
    }
    public New(value: Big.Decimal): Numberic {
      return Percentage.New(value);
    }
  }
  /**
   * Number with unit
   */
  export class UnitNumber extends Numberic {
    public static New(value: string | Big.Decimal, unit: UnitMeta): UnitNumber {
      return new UnitNumber(value, unit);
    }
    public static convertToUnit(value: Numberic, unit: UnitMeta): UnitNumber {
      if (value instanceof UnitNumber) {
        const value2 = value as UnitNumber;
        if (value2.unit.id === unit.id && value2.unit.unitType !== unit.unitType) {
          return UnitNumber.New(value2.convert(unit.ratio(), unit.bias()), unit).setSystem(value.ns) as UnitNumber;
        }
      }
      return UnitNumber.New(value.n, unit).setSystem(value.ns) as UnitNumber;
    }
    public TYPE: DATATYPE;
    public TYPERANK: TYPERANK;
    public unit: UnitMeta;
    constructor(value: string | Big.Decimal | number, unit: UnitMeta) {
      super(value);
      this.unit = unit;
      this.TYPE = DATATYPE.UNIT;
      this.TYPERANK = TYPERANK.UNIT;
    }

    public New(value: Big.Decimal): Numberic {
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
    public plus(value: Numberic): Numberic {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
          return this.New(this.n.add(right.n));
        }
        if (this.unit.id !== right.unit.id) {
          return right.New(this.n.add(right.n));
        }
        return right.New(this.convert(right.ratio(), right.bias()).add(right.n));
      }
      return this.New(this.n.plus(value.n));
    }
    public mul(value: Numberic): Numberic {
      if (value instanceof UnitNumber) {
        const right = value as UnitNumber;
        if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
          return this.New(this.n.mul(right.n));
        }
        if (this.unit.id !== right.unit.id) {
          return right.New(this.n.mul(right.n));
        }
        return right.New(this.convert(right.ratio(), right.bias()).mul(right.n));
      }
      return this.New(this.n.mul(value.n));
    }
    public div(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      if (this.lf) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }
      if (value instanceof UnitNumber) {
        const left1: UnitNumber = left as UnitNumber;
        const right1: UnitNumber = right as UnitNumber;
        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.New(left1.n.div(right1.n));
        }
        if (left1.unit.id !== right1.unit.id) {
          return left1.New(left1.n.div(right.n));
        }
        return left1.New(left1.n.div(right1.convert(left1.ratio(), left1.bias())));
      }
      return this.New(left.n.div(right.n));
    }
    public pow(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      if (this.lf) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }
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

      if (this.lf) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }

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

    public convert(ratio: Big.Decimal, bias: Big.Decimal): Big.Decimal {
      return this.n
        .mul(this.ratio())
        .add(this.bias())
        .minus(bias)
        .div(ratio);
    }

    public ratio(): Big.Decimal {
      return this.unit.ratio();
    }

    public bias(): Big.Decimal {
      return this.unit.bias();
    }

    public print(): string {
      if (this.n.lessThanOrEqualTo(1) && !this.n.isNegative()) {
        return `${this.toNumericString()} ${this.unit.singular}`;
      }
      return `${this.toNumericString()} ${this.unit.plural}`;
    }
  }
}
