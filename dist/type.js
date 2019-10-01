"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("decimal.js");
class Type {
    static Number(value) {
        return new Big.Decimal(value);
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map