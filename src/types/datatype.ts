import colors = require('colors');
import Big = require('decimal.js');
import { Unit } from './units';
export abstract class Type {
  public abstract TYPE: DATATYPE;
  public abstract TYPERANK: TYPERANK;
  public abstract format(): string;
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

// tslint:disable-next-line:no-namespace
export namespace Type {
  export abstract class Numberic extends Type {
    public number: Big.Decimal;
    public leftflag: boolean;
    constructor(value: string | Big.Decimal) {
      super();
      if (value instanceof Big.Decimal) {
        this.number = value;
      } else {
        this.number = new Big.Decimal(value);
      }
      this.leftflag = false;
    }
    public format(): string {
      // if (this.number.isInteger()) {
      //   return format.formatMoney(this.number.toString(), '').green;
      // }
      // return format.formatMoney(this.number.toString(), '', 16).green;
      return this.number.toString().green;
    }

    public Add(value: Numberic): Numberic {
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.leftflag = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          return value.newNumeric(this.plus(value).number);
        }
        return this.plus(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.plus(this);
      }
      return this.newNumeric(value.plus(this).number);
    }
    public Sub(value: Numberic): Numberic {
      return this.Add(value.negated());
    }
    public times(value: Numberic): Numberic {
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.leftflag = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          return value.newNumeric(this.mul(value).number);
        }
        return this.mul(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.mul(this);
      }
      return this.newNumeric(value.mul(this).number);
    }

    public divide(value: Numberic): Numberic {
      // console.log(`DIVIDE ${this.number.toString()} ${value.number.toString()}`);
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.leftflag = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.newNumeric(this.div(value).number);
          }
          return value.newNumeric(this.div(value).number);
        }
        return this.div(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.div(this);
      }
      return this.newNumeric(value.div(this).number);
    }

    public power(value: Numberic): Numberic {
      // console.log(`CAP ${this.number.toString()} ${value.number.toString()}`);
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.leftflag = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.newNumeric(this.pow(value).number);
          }
          return value.newNumeric(this.pow(value).number);
        }
        return this.pow(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.pow(this);
      }
      return this.newNumeric(value.pow(this).number);
    }

    public modulo(value: Numberic): Numberic {
      // check type to see which datatype operation
      // if both type is same na right variable operation
      this.leftflag = true;
      if (this.TYPE >= value.TYPE) {
        // check typerandk to see which will be the return type
        if (this.TYPERANK <= value.TYPERANK) {
          if (this.TYPERANK === value.TYPERANK) {
            return this.newNumeric(this.mod(value).number);
          }
          return value.newNumeric(this.mod(value).number);
        }
        return this.mod(value);
      }
      if (value.TYPERANK >= this.TYPERANK) {
        return value.mod(this);
      }
      return this.newNumeric(value.mod(this).number);
    }

    public abstract newNumeric(value: Big.Decimal): Numberic;
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
  export class BNumber extends Numberic {
    public static ZERO = BNumber.New(new Big.Decimal(0));
    public static New(value: string | Big.Decimal) {
      return new BNumber(value);
    }
    public TYPERANK: TYPERANK;
    public TYPE: DATATYPE;
    constructor(value: string | Big.Decimal) {
      super(value);
      this.TYPE = DATATYPE.NUMBER;
      this.TYPERANK = TYPERANK.NUMBER;
    }
    public isZero(): boolean {
      return this.number.isZero();
    }
    public isNegative(): boolean {
      return this.number.isNegative();
    }
    public isInteger(): boolean {
      return this.number.isInteger();
    }
    public negated(): Numberic {
      return BNumber.New(this.number.negated());
    }
    public div(value: Numberic): Numberic {
      return BNumber.New(this.number.div(value.number));
    }
    public pow(value: Numberic): Numberic {
      return BNumber.New(this.number.pow(value.number));
    }
    public mod(value: Numberic): Numberic {
      return BNumber.New(this.number.modulo(value.number));
    }
    public mul(value: Numberic): Numberic {
      // if (value instanceof BNumber) {
      // }
      return BNumber.New(this.number.mul(value.number));
      // return value.mul(value.newNumeric(this.number));
    }
    public plus(value: Numberic): Numberic {
      // if (value instanceof BNumber) {
      // }
      return BNumber.New(this.number.plus(value.number));
      // return value.plus(value.newNumeric(this.number));
    }
    public newNumeric(value: Big.Decimal): Numberic {
      return BNumber.New(value);
    }
  }
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
      return this.number.isZero();
    }
    public isNegative(): boolean {
      return this.number.isNegative();
    }
    public isInteger(): boolean {
      return this.number.isInteger();
    }
    public negated(): Numberic {
      return Percentage.New(this.number.negated());
    }
    public plus(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.number.plus(value.number));
      }
      return Percentage.New(value.number.plus(this.percentageValue(value.number)));
    }
    public mul(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.number.mul(value.number));
      }
      return Percentage.New(value.number.mul(this.percentageValue(value.number)));
    }
    public div(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.number.div(value.number));
      }
      if (value.leftflag) {
        return Percentage.New(value.number.div(this.percentageValue(value.number)));
      }
      return Percentage.New(this.percentageValue(value.number).div(value.number));
    }
    public pow(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.number.pow(value.number));
      }
      if (value.leftflag) {
        return Percentage.New(value.number.pow(this.percentageValue(value.number)));
      }
      return Percentage.New(this.percentageValue(value.number).pow(value.number));
    }
    public mod(value: Numberic): Numberic {
      if (value.TYPE === DATATYPE.PERCENTAGE) {
        return Percentage.New(this.number.mod(value.number));
      }
      if (value.leftflag) {
        return Percentage.New(value.number.mod(this.percentageValue(value.number)));
      }
      return Percentage.New(this.percentageValue(value.number).mod(value.number));
    }
    public percentageValue(value: Big.Decimal): Big.Decimal {
      return value.mul(this.number.div(Percentage.base));
    }
    public format(): string {
      return `${colors.blue('% ').bold + this.number.toString().green}`;
    }
    public newNumeric(value: Big.Decimal): Numberic {
      return Percentage.New(value);
    }
    public print(): string {
      return this.format();
    }
  }
  export class Units extends Numberic {
    public static New(value: string | Big.Decimal, unit: Unit): Units {
      return new Units(value, unit);
    }
    public static convertToUnit(value: Numberic, unit: Unit): Units {
      if (value instanceof Units) {
        const value2 = value as Units;
        if (value2.unit.id === unit.id) {
          return Units.New(value2.convert(unit.ratio), unit);
        }
      }
      return Units.New(value.number, unit);
    }
    public TYPE: DATATYPE;
    public TYPERANK: TYPERANK;
    public unit: Unit;
    constructor(value: string | Big.Decimal, unit: Unit) {
      super(value);
      this.unit = unit;
      this.TYPE = DATATYPE.UNIT;
      this.TYPERANK = TYPERANK.UNIT;
    }

    public newNumeric(value: Big.Decimal): Numberic {
      return new Units(value, this.unit);
    }
    public isZero(): boolean {
      return this.number.isZero();
    }
    public isNegative(): boolean {
      return this.number.isNegative();
    }
    public isInteger(): boolean {
      return this.number.isInteger();
    }
    public negated(): Numberic {
      return this.newNumeric(this.number.negated());
    }
    public plus(value: Numberic): Numberic {
      if (value instanceof Units) {
        const right = value as Units;
        if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
          return this.newNumeric(this.number.add(right.number));
        }
        if (this.unit.id !== right.unit.id) {
          return right.newNumeric(this.number.add(right.number));
        }
        return right.newNumeric(this.convert(right.unit.ratio).add(right.number));
      }
      return this.newNumeric(this.number.plus(value.number));
    }
    public mul(value: Numberic): Numberic {
      if (value instanceof Units) {
        const right = value as Units;
        if (this.unit.id === right.unit.id && this.unit.unitType === right.unit.unitType) {
          return this.newNumeric(this.number.mul(right.number));
        }
        if (this.unit.id !== right.unit.id) {
          return right.newNumeric(this.number.mul(right.number));
        }
        return right.newNumeric(this.convert(right.unit.ratio).mul(right.number));
      }
      return this.newNumeric(this.number.mul(value.number));
    }
    public div(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      if (this.leftflag) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }
      if (value instanceof Units) {
        const left1: Units = left as Units;
        const right1: Units = right as Units;
        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.newNumeric(left1.number.div(right1.number));
        }
        if (left1.unit.id !== right1.unit.id) {
          return left1.newNumeric(left1.number.div(right.number));
        }
        return left1.newNumeric(left1.number.div(right1.convert(left1.unit.ratio)));
      }
      return this.newNumeric(left.number.div(right.number));
    }
    public pow(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;
      if (this.leftflag) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }
      if (value instanceof Units) {
        const left1: Units = left as Units;
        const right1: Units = right as Units;
        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.newNumeric(left1.number.pow(right1.number));
        }

        if (left1.unit.id !== right1.unit.id) {
          return left1.newNumeric(left1.number.pow(right.number));
        }

        return left1.newNumeric(left1.number.pow(right1.convert(left1.unit.ratio)));
      }

      return this.newNumeric(left.number.pow(right.number));
    }
    public mod(value: Numberic): Numberic {
      let left: Numberic;
      let right: Numberic;

      if (this.leftflag) {
        left = this;
        right = value;
      } else {
        right = this;
        left = value;
      }

      if (value instanceof Units) {
        const left1: Units = left as Units;
        const right1: Units = right as Units;

        if (left1.unit.id !== right1.unit.id) {
          return left1.newNumeric(left1.number.mod(right1.number));
        }

        if (left1.unit.unitType === right1.unit.unitType) {
          return left1.newNumeric(left1.number.mod(right1.number));
        }

        return left1.newNumeric(left1.number.mod(right1.convert(left1.unit.ratio)));
      }

      return this.newNumeric(left.number.mod(right.number));
    }
    public convert(ration: Big.Decimal): Big.Decimal {
      return this.number.div(ration).mul(this.unit.ratio);
    }
    public format(): string {
      return `${this.number.toString().green} ${colors.blue(this.unit.unitType).bold}`;
    }
  }
}
