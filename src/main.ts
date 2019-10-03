// import { Lexer } from './lex/lex';
import { Fcal } from './fcal';
// import { Type } from './datetype';

function main() {
  // const value = new Fcal('2*2*20000000000000').evaluate();
  // // tslint:disable-next-line:no-console
  // console.log(value.format());

  const value1 = new Fcal('2^2%^2%^2 \n').evaluate();
  // tslint:disable-next-line:no-console
  console.debug(value1);
  // console.log(new Type.Number('-4').negated().mod(new Type.Number('0.23')));
  // const lex = new Lexer('20% of 100 of 500 of 1.23', Fcal.getdefaultphrases());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());

  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
  // console.log(lex.Next().toString());
}

main();
