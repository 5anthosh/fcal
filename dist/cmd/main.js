"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fcal_1 = require("../fcal");
function main() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.setPrompt('fcal> ');
    rl.prompt();
    rl.on('line', function (line) {
        if (line === '.exit') {
            rl.close();
        }
        var fcal = new fcal_1.Fcal(line + '\n');
        console.log(fcal.evaluate().format());
        rl.prompt();
    }).on('close', function () {
        process.exit(0);
    });
}
main();
//# sourceMappingURL=main.js.map