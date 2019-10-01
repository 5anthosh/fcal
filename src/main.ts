import { Lexer } from "./lex/lex";
import { TokenType } from "./lex/token";

function parser() {
  let lexer = new Lexer("0+234/343/11234.1234123$");
  while (true) {
    try {
      let token = lexer.Next();
      if (token.type == TokenType.EOL) {
        return;
      }
      console.log(token.toString());
    } catch (err) {
      console.log(err.message);
      return;
    }
  }
}

parser();
