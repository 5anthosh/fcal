import colors = require('colors');
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
    try {
      const value = fcal.evaluate() as Type.Numberic;
      // tslint:disable-next-line:no-console
      console.log(value.format());
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(colors.red(`Error ${error.message}`));
    }
    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
}

main();