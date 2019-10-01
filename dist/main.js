"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter/interpreter");
const type_1 = require("./type");
function main() {
    const value = new interpreter_1.Interpreter('2^2').evaluateExpression();
    // tslint:disable-next-line:no-console
    console.log(value.toString());
    console.log(type_1.Type.Number('-2').pow('0.23'));
}
main();
//# sourceMappingURL=main.js.map