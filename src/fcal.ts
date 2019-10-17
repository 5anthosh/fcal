import { Decimal } from 'decimal.js';
import { getDefaultFunction } from './defaultFunctions';
import { getdefaultUnits } from './defaultUnits';
import { Environment } from './interpreter/environment';
import { FcalFunction, FcalFunctions } from './interpreter/function';
import { Interpreter } from './interpreter/interpreter';
import { TokenType } from './lex/token';
import { Type } from './types/datatype';
import { Phrases } from './types/phrase';
import { Unit } from './types/units';

/**
 * Formula evaluation engine.
 * It evaluates various arithmetic operations, percentage operations,
 * variables and functions with units
 */
class Fcal {
  public static getdefaultphrases(): Phrases {
    const phrases = new Phrases();
    phrases.addPhrases(TokenType.PLUS, ['PLUS', 'AND', 'WITH', 'ADD']);
    phrases.addPhrases(TokenType.MINUS, ['MINUS', 'SUBTRACT', 'WITHOUT']);
    phrases.addPhrases(TokenType.TIMES, ['TIMES', 'x', 'MULTIPLIEDBY', 'mul']);
    phrases.addPhrases(TokenType.SLASH, ['DIVIDE', 'DIVIDEBY']);
    phrases.addPhrases(TokenType.CAP, ['POW']);
    phrases.addPhrases(TokenType.MOD, ['mod']);
    phrases.addPhrases(TokenType.OF, ['of']);
    phrases.addPhrases(TokenType.IN, ['in', 'as']);
    return phrases;
  }
  private phrases: Phrases;
  private units: Unit.Units;
  private environment: Environment;
  private functions: FcalFunctions;
  constructor() {
    this.phrases = Fcal.getdefaultphrases();
    this.units = getdefaultUnits();
    this.environment = new Environment();
    this.setDefaultValues();
    this.functions = new FcalFunctions();
    this.setDefaultFunctions();
  }
  /**
   * Evaluates given expression
   * @param source expression
   * @returns result of expression
   */
  public evaluate(source: string): Type {
    source = prefixNewLIne(source);
    return new Interpreter(source, this.phrases, this.units, this.environment, this.functions).evaluateExpression();
  }
  /**
   * Create new  @class Expression with copy of Fcal.Environment
   * @param source expression
   */
  public expression(source: string): Expression {
    const env = new Environment();
    env.values = Object.assign({}, this.environment.values);
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, this.phrases, this.units, env, this.functions));
  }
  /**
   * Create new  @class Expression in sync with Fcal.Environment
   * @param source
   */
  public expressionSync(source: string): Expression {
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, this.phrases, this.units, this.environment, this.functions));
  }
  /**
   * create a new variable with value or assign value to variable
   * @param values
   */
  public setValues(values: { [index: string]: Type | number }) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
  }
  /**
   * register new fcal Functions
   * @param functions
   */
  public setFunctions(functions: FcalFunctions) {
    for (const func of functions.functions) {
      this.functions.add(func);
    }
  }
  private setDefaultValues() {
    this.setValues({
      E: Type.BNumber.New('2.718281828459045235360287'),
      PI: Type.BNumber.New('3.141592653589793238462645'),
      PI2: Type.BNumber.New('6.28318530718'),
    });
  }
  private setDefaultFunctions() {
    this.setFunctions(getDefaultFunction());
  }
}

function prefixNewLIne(source: string): string {
  if (source.endsWith('\n')) {
    return source;
  }
  return source + '\n';
}
/**
 * Expression takes AST created from Parser and
 * evaluate AST with its state
 */
class Expression {
  private interpreter: Interpreter;
  constructor(interpeter: Interpreter) {
    this.interpreter = interpeter;
  }
  /**
   * Evaluate AST
   */
  public evaluate(): Type {
    return this.interpreter.evaluateExpression();
  }
  /**
   * Change state of variables
   * @param values
   */
  public setValues(values: { [index: string]: Type | number }) {
    this.interpreter.setValues(values);
  }
}

export { Fcal, Expression, FcalFunctions, FcalFunction, Environment, Unit, Type, Decimal };
