"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const Big = require("decimal.js");
class Type {
}
exports.Type = Type;
var DATATYPE;
(function (DATATYPE) {
    DATATYPE[DATATYPE["NUMBER"] = 0] = "NUMBER";
    DATATYPE[DATATYPE["PERCENTAGE"] = 1] = "PERCENTAGE";
})(DATATYPE = exports.DATATYPE || (exports.DATATYPE = {}));
var TYPERANK;
(function (TYPERANK) {
    TYPERANK[TYPERANK["PERCENTAGE"] = 0] = "PERCENTAGE";
    TYPERANK[TYPERANK["NUMBER"] = 1] = "NUMBER";
})(TYPERANK = exports.TYPERANK || (exports.TYPERANK = {}));
// tslint:disable-next-line:no-namespace
(function (Type) {
    class Numberic extends Type {
        constructor(value) {
            super();
            if (value instanceof Big.Decimal) {
                this.number = value;
            }
            else {
                this.number = new Big.Decimal(value);
            }
            this.leftflag = false;
        }
        format() {
            // if (this.number.isInteger()) {
            //   return format.formatMoney(this.number.toString(), '').green;
            // }
            // return format.formatMoney(this.number.toString(), '', 16).green;
            return this.number.toString().green;
        }
        Add(value) {
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
        Sub(value) {
            return this.Add(value.negated());
        }
        times(value) {
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
        divide(value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.leftflag = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    return value.newNumeric(this.div(value).number);
                }
                return this.div(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.div(this);
            }
            return this.newNumeric(value.div(this).number);
        }
        power(value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.leftflag = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    return value.newNumeric(this.pow(value).number);
                }
                return this.pow(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.pow(this);
            }
            return this.newNumeric(value.pow(this).number);
        }
        modulo(value) {
            // check type to see which datatype operation
            // if both type is same na right variable operation
            this.leftflag = true;
            if (this.TYPE >= value.TYPE) {
                // check typerandk to see which will be the return type
                if (this.TYPERANK <= value.TYPERANK) {
                    return value.newNumeric(this.mod(value).number);
                }
                return this.mod(value);
            }
            if (value.TYPERANK >= this.TYPERANK) {
                return value.mod(this);
            }
            return this.newNumeric(value.mod(this).number);
        }
    }
    Type.Numberic = Numberic;
    class BNumber extends Numberic {
        constructor(value) {
            super(value);
            this.TYPE = DATATYPE.NUMBER;
            this.TYPERANK = TYPERANK.NUMBER;
        }
        static New(value) {
            return new BNumber(value);
        }
        isZero() {
            return this.number.isZero();
        }
        isNegative() {
            return this.number.isNegative();
        }
        isInteger() {
            return this.number.isInteger();
        }
        negated() {
            return BNumber.New(this.number.negated());
        }
        div(value) {
            return BNumber.New(this.number.div(value.number));
        }
        pow(value) {
            return BNumber.New(this.number.pow(value.number));
        }
        mod(value) {
            return BNumber.New(this.number.modulo(value.number));
        }
        mul(value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.number.mul(value.number));
            // return value.mul(value.newNumeric(this.number));
        }
        plus(value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.number.plus(value.number));
            // return value.plus(value.newNumeric(this.number));
        }
        newNumeric(value) {
            return BNumber.New(value);
        }
    }
    BNumber.ZERO = BNumber.New(new Big.Decimal(0));
    Type.BNumber = BNumber;
    class Percentage extends Numberic {
        constructor(value) {
            super(value);
            this.TYPE = DATATYPE.PERCENTAGE;
            this.TYPERANK = TYPERANK.PERCENTAGE;
        }
        static New(value) {
            return new Percentage(value);
        }
        isZero() {
            return this.number.isZero();
        }
        isNegative() {
            return this.number.isNegative();
        }
        isInteger() {
            return this.number.isInteger();
        }
        negated() {
            return Percentage.New(this.number.negated());
        }
        plus(value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.plus(value.number));
            }
            return Percentage.New(value.number.plus(this.percentageValue(value.number)));
        }
        mul(value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.mul(value.number));
            }
            return Percentage.New(value.number.mul(this.percentageValue(value.number)));
        }
        div(value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.div(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.div(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).div(value.number));
        }
        pow(value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.pow(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.pow(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).pow(value.number));
        }
        mod(value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.mod(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.mod(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).mod(value.number));
        }
        percentageValue(value) {
            return value.mul(this.number.div(Percentage.base));
        }
        format() {
            return `${colors.blue('% ') + this.number.toString().green}`;
        }
        newNumeric(value) {
            return Percentage.New(value);
        }
        print() {
            return this.format();
        }
    }
    Percentage.base = new Big.Decimal(100);
    Type.Percentage = Percentage;
})(Type = exports.Type || (exports.Type = {}));
// function createNumericBasedOnType(type: DATATYPE, value: Big.Decimal | string): Type.Numberic {
//   switch (type) {
//     case DATATYPE.PERCENTAGE:
//       return Type.Percentage.New(value);
//     default:
//       return Type.BNumber.New(value);
//   }
// }
//# sourceMappingURL=datetype.js.map