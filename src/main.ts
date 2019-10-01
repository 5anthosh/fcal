import { Interpreter } from './interpreter/interpreter';
import { Type } from './type';

function main() {
  const value = new Interpreter('2^2').evaluateExpression();
  // tslint:disable-next-line:no-console
  console.log(value.toString());
  console.log(Type.Number('-2').pow('0.23'));
}

main();
