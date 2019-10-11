import Big = require('decimal.js');
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
    return phrases;
  }
  public static getdefaultTTypes(): TType.TTypes {
    const ttypes = new TType.TTypes();
    ttypes.Add(new TType('DISTANCE', new Big.Decimal(1), 'cm', 'cm'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal(0.01), 'm', 'm'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal(10), 'mm', 'mm'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal(0.00001), 'km', 'km'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal('0.39370078740157'), 'inch', 'inch'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal('0.032808398950131'), 'foot/feet', 'ft'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal('0.010936132983377'), 'yard', 'yd', 'yard'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal('0.0000062137119223733'), 'mile', 'mi'));
    ttypes.Add(new TType('DISTANCE', new Big.Decimal('0.0000053995680345572'), 'nautical mile (nmi)', 'nmi'));
    return ttypes;
  }
  private interpreter: Interpreter;
  private phrases: Phrases;
  private ttypes: TType.TTypes;
  constructor(source: string) {
    this.phrases = Fcal.getdefaultphrases();
    this.ttypes = Fcal.getdefaultTTypes();
    this.interpreter = new Interpreter(source, this.phrases, this.ttypes);
  }
  public evaluate(): any {
    return this.interpreter.evaluateExpression();
  }
}
