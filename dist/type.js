"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("big.js");
class Type {
    static Number(value) {
        return new Big.Big(value);
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map