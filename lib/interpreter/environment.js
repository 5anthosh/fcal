"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environment = /** @class */ (function () {
    function Environment() {
        this.values = {};
    }
    Environment.prototype.get = function (key) {
        if (this.values.hasOwnProperty(key)) {
            return this.values[key];
        }
        throw new Error("Undefined variable " + key);
    };
    Environment.prototype.set = function (key, value) {
        this.values[key] = value;
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map