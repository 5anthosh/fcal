import { getdefaultTTypes } from './defaultUnits';
import { Interpreter } from './interpreter/interpreter';
import { TokenType } from './lex/token';
import { Phrases } from './types/phrase';
import { TType } from './types/units';

export class Fcal {
  public static getdefaultphrases(): Phrases {
    const phrases = new Phrases();
    phrases.addPhrases(TokenType.PLUS, 'PLUS', 'AND', 'WITH', 'ADD');
    phrases.addPhrases(TokenType.MINUS, 'MINUS', 'SUBTRACT', 'WITHOUT');
    phrases.addPhrases(TokenType.TIMES, 'TIMES', 'x', 'MULTIPLIEDBY', 'mul');
    phrases.addPhrases(TokenType.SLASH, 'DIVIDE', 'DIVIDEBY');
    phrases.addPhrases(TokenType.CAP, 'POW');
    phrases.addPhrases(TokenType.MOD, 'mod');
    phrases.addPhrases(TokenType.OF, 'of');
    phrases.addPhrases(TokenType.IN, 'in');
    return phrases;
  }
  private interpreter: Interpreter;
  private phrases: Phrases;
  private ttypes: TType.TTypes;
  constructor(source: string) {
    this.phrases = Fcal.getdefaultphrases();
    this.ttypes = getdefaultTTypes();
    this.interpreter = new Interpreter(source, this.phrases, this.ttypes);
  }
  public evaluate(): any {
    return this.interpreter.evaluateExpression();
  }
}
