"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var Big = require("decimal.js");
var Type = /** @class */ (function () {
    function Type() {
    }
    return Type;
}());
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
    var Numberic = /** @class */ (function (_super) {
        __extends(Numberic, _super);
        function Numberic(value) {
            var _this = _super.call(this) || this;
            if (value instanceof Big.Decimal) {
                _this.number = value;
            }
            else {
                _this.number = new Big.Decimal(value);
            }
            _this.leftflag = false;
            return _this;
        }
        Numberic.prototype.format = function () {
            // if (this.number.isInteger()) {
            //   return format.formatMoney(this.number.toString(), '').green;
            // }
            // return format.formatMoney(this.number.toString(), '', 16).green;
            return this.number.toString().green;
        };
        Numberic.prototype.Add = function (value) {
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
        };
        Numberic.prototype.Sub = function (value) {
            return this.Add(value.negated());
        };
        Numberic.prototype.times = function (value) {
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
        };
        Numberic.prototype.divide = function (value) {
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
        };
        Numberic.prototype.power = function (value) {
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
        };
        Numberic.prototype.modulo = function (value) {
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
        };
        return Numberic;
    }(Type));
    Type.Numberic = Numberic;
    var BNumber = /** @class */ (function (_super) {
        __extends(BNumber, _super);
        function BNumber(value) {
            var _this = _super.call(this, value) || this;
            _this.TYPE = DATATYPE.NUMBER;
            _this.TYPERANK = TYPERANK.NUMBER;
            return _this;
        }
        BNumber.New = function (value) {
            return new BNumber(value);
        };
        BNumber.prototype.isZero = function () {
            return this.number.isZero();
        };
        BNumber.prototype.isNegative = function () {
            return this.number.isNegative();
        };
        BNumber.prototype.isInteger = function () {
            return this.number.isInteger();
        };
        BNumber.prototype.negated = function () {
            return BNumber.New(this.number.negated());
        };
        BNumber.prototype.div = function (value) {
            return BNumber.New(this.number.div(value.number));
        };
        BNumber.prototype.pow = function (value) {
            return BNumber.New(this.number.pow(value.number));
        };
        BNumber.prototype.mod = function (value) {
            return BNumber.New(this.number.modulo(value.number));
        };
        BNumber.prototype.mul = function (value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.number.mul(value.number));
            // return value.mul(value.newNumeric(this.number));
        };
        BNumber.prototype.plus = function (value) {
            // if (value instanceof BNumber) {
            // }
            return BNumber.New(this.number.plus(value.number));
            // return value.plus(value.newNumeric(this.number));
        };
        BNumber.prototype.newNumeric = function (value) {
            return BNumber.New(value);
        };
        BNumber.ZERO = BNumber.New(new Big.Decimal(0));
        return BNumber;
    }(Numberic));
    Type.BNumber = BNumber;
    var Percentage = /** @class */ (function (_super) {
        __extends(Percentage, _super);
        function Percentage(value) {
            var _this = _super.call(this, value) || this;
            _this.TYPE = DATATYPE.PERCENTAGE;
            _this.TYPERANK = TYPERANK.PERCENTAGE;
            return _this;
        }
        Percentage.New = function (value) {
            return new Percentage(value);
        };
        Percentage.prototype.isZero = function () {
            return this.number.isZero();
        };
        Percentage.prototype.isNegative = function () {
            return this.number.isNegative();
        };
        Percentage.prototype.isInteger = function () {
            return this.number.isInteger();
        };
        Percentage.prototype.negated = function () {
            return Percentage.New(this.number.negated());
        };
        Percentage.prototype.plus = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.plus(value.number));
            }
            return Percentage.New(value.number.plus(this.percentageValue(value.number)));
        };
        Percentage.prototype.mul = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.mul(value.number));
            }
            return Percentage.New(value.number.mul(this.percentageValue(value.number)));
        };
        Percentage.prototype.div = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.div(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.div(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).div(value.number));
        };
        Percentage.prototype.pow = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.pow(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.pow(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).pow(value.number));
        };
        Percentage.prototype.mod = function (value) {
            if (value.TYPE === DATATYPE.PERCENTAGE) {
                return Percentage.New(this.number.mod(value.number));
            }
            if (value.leftflag) {
                return Percentage.New(value.number.mod(this.percentageValue(value.number)));
            }
            return Percentage.New(this.percentageValue(value.number).mod(value.number));
        };
        Percentage.prototype.percentageValue = function (value) {
            return value.mul(this.number.div(Percentage.base));
        };
        Percentage.prototype.format = function () {
            return "" + (colors.blue('% ').bold + this.number.toString().green);
        };
        Percentage.prototype.newNumeric = function (value) {
            return Percentage.New(value);
        };
        Percentage.prototype.print = function () {
            return this.format();
        };
        Percentage.base = new Big.Decimal(100);
        return Percentage;
    }(Numberic));
    Type.Percentage = Percentage;
})(Type = exports.Type || (exports.Type = {}));
exports.Type = Type;
// function createNumericBasedOnType(type: DATATYPE, value: Big.Decimal | string): Type.Numberic {
//   switch (type) {
//     case DATATYPE.PERCENTAGE:
//       return Type.Percentage.New(value);
//     default:
//       return Type.BNumber.New(value);
//   }
// }
//# sourceMappingURL=datatype.js.map