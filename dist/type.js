"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("bignumber.js");
class Type {
    static Number(value) {
        return new Big.BigNumber(value);
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map