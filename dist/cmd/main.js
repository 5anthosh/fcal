"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const fcal_1 = require("../fcal");
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.setPrompt('fcal> ');
    rl.prompt();
    rl.on('line', line => {
        if (line === '.exit') {
            process.exit(0);
        }
        const fcal = new fcal_1.Fcal(line + '\n');
        console.log(fcal.evaluate().format());
        if (line === 'right') {
            rl.close();
        }
        rl.prompt();
    }).on('close', () => {
        process.exit(0);
    });
}
main();
//# sourceMappingURL=main.js.map