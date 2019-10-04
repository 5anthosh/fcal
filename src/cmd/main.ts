import readline = require('readline');
import { Fcal } from '../fcal';
import { Type } from '../types/datetype';
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
    const fcal = new Fcal(line + '\n');
    console.log((fcal.evaluate() as Type.Numberic).format());
    if (line === 'right') {
      rl.close();
    }
    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
}

main();
