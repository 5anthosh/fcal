"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var readline = require("readline");
var fcal_1 = require("../fcal");
function main() {
    var fcal = new fcal_1.Fcal();
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
        try {
            var value = fcal.evaluate(line + '\n');
            // tslint:disable-next-line:no-console
            console.log(value.format());
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.error(colors.red("Error " + error.stack));
        }
        rl.prompt();
    }).on('close', function () {
        process.exit(0);
    });
}
main();
//# sourceMappingURL=fcal-cli.js.map