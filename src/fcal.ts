import { getDefaultFunction } from './defaultFunctions';
import { getdefaultTTypes } from './defaultUnits';
import { Environment } from './interpreter/environment';
import { FcalFunctions } from './interpreter/function';
import { Interpreter } from './interpreter/interpreter';
import { TokenType } from './lex/token';
import { Type } from './types/datatype';
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
  private phrases: Phrases;
  private ttypes: TType.TTypes;
  private environment: Environment;
  private functions: FcalFunctions;
  constructor() {
    this.phrases = Fcal.getdefaultphrases();
    this.ttypes = getdefaultTTypes();
    this.environment = new Environment();
    this.setDefaultValues();
    this.functions = new FcalFunctions();
    this.setDefaultFunctions();
  }
  public evaluate(source: string): Type {
    return new Interpreter(source, this.phrases, this.ttypes, this.environment, this.functions).evaluateExpression();
  }
  public expression(source: string): Expression {
    const env = new Environment();
    env.values = Object.assign({}, this.environment.values);
    return new Expression(new Interpreter(source, this.phrases, this.ttypes, env, this.functions));
  }

  public expressionWithContext(source: string): Expression {
    return new Expression(new Interpreter(source, this.phrases, this.ttypes, this.environment, this.functions));
  }
  public setValues(values: { [index: string]: Type }) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
  }
  public setFunctions(functions: FcalFunctions) {
    for (const func of functions.functions) {
      this.functions.add(func);
    }
  }
  private setDefaultValues() {
    this.setValues({ PI: Type.BNumber.New('3.141592653589793238462643383279502884197169399375105') });
  }
  private setDefaultFunctions() {
    this.setFunctions(getDefaultFunction());
  }
}

export class Expression {
  private interpreter: Interpreter;
  constructor(interpeter: Interpreter) {
    this.interpreter = interpeter;
  }
  public evaluate(): Type {
    return this.interpreter.evaluateExpression();
  }
  public setValues(values: { [index: string]: Type }) {
    this.interpreter.setValues(values);
  }
}
