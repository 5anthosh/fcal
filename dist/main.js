"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter/interpreter");
function main() {
    const value = new interpreter_1.Interpreter('1/0').evaluateExpression();
    // tslint:disable-next-line:no-console
    console.log(value.toString());
}
main();
//# sourceMappingURL=main.js.map