import Big = require('decimal.js');
import { Unit } from './units';
export declare abstract class Type {
    abstract TYPE: DATATYPE;
    abstract TYPERANK: TYPERANK;
    abstract format(): string;
}
export declare enum DATATYPE {
    NUMBER = 0,
    UNIT = 1,
    PERCENTAGE = 2
}
export declare enum TYPERANK {
    PERCENTAGE = 0,
    NUMBER = 1,
    UNIT = 2
}
export declare namespace Type {
    abstract class Numberic extends Type {
        number: Big.Decimal;
        leftflag: boolean;
        constructor(value: string | Big.Decimal);
        format(): string;
        Add(value: Numberic): Numberic;
        Sub(value: Numberic): Numberic;
        times(value: Numberic): Numberic;
        divide(value: Numberic): Numberic;
        power(value: Numberic): Numberic;
        modulo(value: Numberic): Numberic;
        abstract newNumeric(value: Big.Decimal): Numberic;
        abstract isZero(): boolean;
        abstract isNegative(): boolean;
        abstract isInteger(): boolean;
        abstract negated(): Numberic;
        abstract plus(value: Numberic): Numberic;
        abstract mul(value: Numberic): Numberic;
        abstract div(value: Numberic): Numberic;
        abstract pow(value: Numberic): Numberic;
        abstract mod(value: Numberic): Numberic;
    }
    class BNumber extends Numberic {
        static ZERO: BNumber;
        static New(value: string | Big.Decimal): BNumber;
        TYPERANK: TYPERANK;
        TYPE: DATATYPE;
        constructor(value: string | Big.Decimal);
        isZero(): boolean;
        isNegative(): boolean;
        isInteger(): boolean;
        negated(): Numberic;
        div(value: Numberic): Numberic;
        pow(value: Numberic): Numberic;
        mod(value: Numberic): Numberic;
        mul(value: Numberic): Numberic;
        plus(value: Numberic): Numberic;
        newNumeric(value: Big.Decimal): Numberic;
    }
    class Percentage extends Numberic {
        static New(value: string | Big.Decimal): Percentage;
        private static base;
        TYPE: DATATYPE;
        TYPERANK: TYPERANK;
        constructor(value: string | Big.Decimal);
        isZero(): boolean;
        isNegative(): boolean;
        isInteger(): boolean;
        negated(): Numberic;
        plus(value: Numberic): Numberic;
        mul(value: Numberic): Numberic;
        div(value: Numberic): Numberic;
        pow(value: Numberic): Numberic;
        mod(value: Numberic): Numberic;
        percentageValue(value: Big.Decimal): Big.Decimal;
        format(): string;
        newNumeric(value: Big.Decimal): Numberic;
        print(): string;
    }
    class Units extends Numberic {
        static New(value: string | Big.Decimal, unit: Unit): Units;
        static convertToUnit(value: Numberic, unit: Unit): Units;
        TYPE: DATATYPE;
        TYPERANK: TYPERANK;
        unit: Unit;
        constructor(value: string | Big.Decimal, unit: Unit);
        newNumeric(value: Big.Decimal): Numberic;
        isZero(): boolean;
        isNegative(): boolean;
        isInteger(): boolean;
        negated(): Numberic;
        plus(value: Numberic): Numberic;
        mul(value: Numberic): Numberic;
        div(value: Numberic): Numberic;
        pow(value: Numberic): Numberic;
        mod(value: Numberic): Numberic;
        convert(ration: Big.Decimal): Big.Decimal;
        format(): string;
    }
}
