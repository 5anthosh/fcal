import { Decimal } from 'decimal.js';
import { getDefaultFunction } from './defaultFunctions';
import { getdefaultUnits } from './defaultUnits';
import { Environment } from './interpreter/environment';
import { FcalFunction } from './interpreter/function';
import { Interpreter } from './interpreter/interpreter';
import { TT } from './lex/token';
import { Type } from './types/datatype';
import { Phrases } from './types/phrase';
import { Unit } from './types/units';

/**
 * Formula evaluation engine.
 * It evaluates various arithmetic operations, percentage operations,
 * variables and functions with units
 */
class Fcal {
  public static units: Unit.List = new Unit.List();
  public static functions: FcalFunction.List = new FcalFunction.List();
  /**
   * register new fcal Functions
   * @param functions
   */
  public static UseFunctions(functions: FcalFunction[]) {
    for (const func of functions) {
      this.UseFunction(func);
    }
  }
  /**
   * Register new Fcal function
   * @param func
   */
  public static UseFunction(func: FcalFunction) {
    this.functions.push(func);
  }
  /**
   * Register new units
   * @param units
   */
  public static UseUnits(units: Unit[]) {
    for (const unit of units) {
      this.UseUnit(unit);
    }
  }
  /**
   * Register new unit
   * @param unit
   */
  public static UseUnit(unit: Unit) {
    this.units.push(unit);
  }

  public static IntialiseStaticValues() {
    this.phrases = this.getdefaultphrases();
    this.setDefaultUnits();
    this.setDefaultFunctions();
  }
  private static phrases: Phrases;
  private static getdefaultphrases(): Phrases {
    const phrases = new Phrases();
    phrases.push(TT.PLUS, ['PLUS', 'AND', 'WITH', 'ADD']);
    phrases.push(TT.MINUS, ['MINUS', 'SUBTRACT', 'WITHOUT']);
    phrases.push(TT.TIMES, ['TIMES', 'x', 'MULTIPLIEDBY', 'mul']);
    phrases.push(TT.SLASH, ['DIVIDE', 'DIVIDEBY']);
    phrases.push(TT.CAP, ['POW']);
    phrases.push(TT.MOD, ['mod']);
    phrases.push(TT.OF, ['of']);
    phrases.push(TT.IN, ['in', 'as']);
    return phrases;
  }
  private static setDefaultFunctions() {
    this.UseFunctions(getDefaultFunction());
  }
  private static setDefaultUnits() {
    this.UseUnits(getdefaultUnits());
  }
  private environment: Environment;
  constructor() {
    this.environment = new Environment(Fcal.functions);
    this.setDefaultValues();
  }
  /**
   * Evaluates given expression
   * @param source expression
   * @returns result of expression
   */
  public evaluate(source: string): Type {
    source = prefixNewLIne(source);
    return new Interpreter(source, Fcal.phrases, Fcal.units, this.environment).evaluateExpression();
  }
  /**
   * Create new  @class Expression with copy of Fcal.Environment
   * @param source expression
   */
  public expression(source: string): Expression {
    const env = new Environment(Fcal.functions);
    env.values = Object.assign({}, this.environment.values);
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, env));
  }
  /**
   * Create new  @class Expression in sync with Fcal.Environment
   * @param source
   */
  public expressionSync(source: string): Expression {
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, this.environment));
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
  private setDefaultValues() {
    this.setValues({
      E: Type.BNumber.New('2.718281828459045235360287'),
      PI: Type.BNumber.New('3.141592653589793238462645'),
      PI2: Type.BNumber.New('6.2831853071795864769'),
      _: Type.BNumber.ZERO,
    });
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
Fcal.IntialiseStaticValues();
export { Fcal, Expression, FcalFunction, Environment, Unit, Type, Decimal };
