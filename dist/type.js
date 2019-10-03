"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("accounting");
const Big = require("decimal.js");
class Type {
}
exports.Type = Type;
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
        }
        format() {
            return format.formatNumber(this.number.toNumber());
        }
    }
    Type.Numberic = Numberic;
    class Number extends Numberic {
        constructor(value) {
            super(value);
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
            return new Number(this.number.negated());
        }
        div(value) {
            return new Number(this.number.div(value.number));
        }
        pow(value) {
            return new Number(this.number.pow(value.number));
        }
        mod(value) {
            return new Number(this.number.modulo(value.number));
        }
        mul(value) {
            return new Number(this.number.mul(value.number));
        }
        plus(value) {
            return new Number(this.number.plus(value.number));
        }
        minus(value) {
            return new Number(this.number.minus(value.number));
        }
    }
    Number.ZERO = new Number(new Big.Decimal(0));
    Type.Number = Number;
})(Type = exports.Type || (exports.Type = {}));
//# sourceMappingURL=type.js.map