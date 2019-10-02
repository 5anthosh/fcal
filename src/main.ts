import { Lexer } from './lex/lex';
import { Fcal } from './parser/fcal';
import { Type } from './type';

function main() {
  const value = new Fcal('2*2*2').evaluate();
  // tslint:disable-next-line:no-console
  console.log(value.toString());
  console.log(
    Type.Number('-4')
      .negated()
      .mod(Type.Number('0.23')),
  );
  const lex = new Lexer('23 add 23 + 3 pow 2', Fcal.getdefaultphrases());
  console.log(lex.Next().toString());
  console.log(lex.Next().toString());
  console.log(lex.Next().toString());
  console.log(lex.Next().toString());

  console.log(lex.Next().toString());
  console.log(lex.Next().toString());
  console.log(lex.Next().toString());
}

main();
