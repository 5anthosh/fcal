import { Interpreter } from '../interpreter/interpreter';
import { TokenType } from '../lex/token';
import { Phrases } from '../phrase';

export class Fcal {
  public static getdefaultphrases(): Phrases {
    const phrases = new Phrases();
    phrases.addPhrases(TokenType.PLUS, 'PLUS', 'AND', 'WITH', 'ADD');
    phrases.addPhrases(TokenType.MINUS, 'MINUS', 'SUBTRACT', 'WITHOUT');
    phrases.addPhrases(TokenType.TIMES, 'TIMES', 'MULTIPLIEDBY', 'mul');
    phrases.addPhrases(TokenType.SLASH, 'DIVIDE', 'DIVIDEBY');
    phrases.addPhrases(TokenType.CAP, 'POW');
    phrases.addPhrases(TokenType.MOD, 'mod');
    return phrases;
  }
  private interpreter: Interpreter;
  private phrases: Phrases;

  constructor(source: string) {
    this.phrases = Fcal.getdefaultphrases();
    this.interpreter = new Interpreter(source, this.phrases);
  }
  public evaluate(): any {
    return this.interpreter.evaluateExpression();
  }
}
