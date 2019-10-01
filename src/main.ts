import { Interpreter } from './interpreter/interpreter';

function main() {
  const value = new Interpreter('(0+2+3)/1.333     + 2').evaluateExpression();
  // tslint:disable-next-line:no-console
  console.log(value.toString());
}

main();
