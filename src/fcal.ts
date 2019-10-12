import { getdefaultTTypes } from './defaultUnits';
import { Environment } from './environment';
import { Interpreter } from './interpreter/interpreter';
import { TokenType } from './lex/token';
import { Phrases } from './types/phrase';
import { TType } from './types/units';
import { Type } from './types/datatype';

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
  private phrases: Phrases;
  private ttypes: TType.TTypes;
  private environment: Environment;
  constructor() {
    this.phrases = Fcal.getdefaultphrases();
    this.ttypes = getdefaultTTypes();
    this.environment = new Environment();
    this.defaultValues();
  }
  public evaluate(source: string): any {
    return new Interpreter(source, this.phrases, this.ttypes, this.environment).evaluateExpression();
  }
  public setValues(values: object) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
  }
  private defaultValues() {
    this.setValues({ PI: Type.BNumber.New('3.141592653589793238462643383279502884197169399375105') });
  }
}
