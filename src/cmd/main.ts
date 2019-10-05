import readline = require('readline');
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.setPrompt('fcal> ');
  rl.prompt();
  rl.on('line', line => {
    if (line === '.exit') {
      rl.close();
    }
    const fcal = new Fcal(line + '\n');
    console.log((fcal.evaluate() as Type.Numberic).format());
    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
}

main();
