import { Interpreter } from './interpreter/interpreter';

function main() {
  const value = new Interpreter('1/0').evaluateExpression();
  // tslint:disable-next-line:no-console
  console.log(value.toString());
}

main();
