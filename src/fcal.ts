import { Decimal } from 'decimal.js';
import { getDefaultFunction } from './defaultFunctions';
import { getdefaultUnits } from './defaultUnits';
import { Constant } from './interpreter/constants';
import { Environment } from './interpreter/environment';
import { FcalFunction } from './interpreter/function';
import { Interpreter } from './interpreter/interpreter';
import { TT } from './lex/token';
import { Entity, SymbolTable } from './symboltable';
import { Type } from './types/datatype';
import { Phrases } from './types/phrase';
import { Unit, UnitMeta } from './types/units';

/**
 * Math expression evaluator
 * It evaluates various arithmetic operations, percentage operations,
 * variables and functions with units
 */
class Fcal {
  /**
   * Quick math expression evaluator
   * @param {string} source expression
   * @returns {Type} result
   */
  public static eval(source: string): Type {
    return new Fcal().evaluate(source);
  }
  /**
   * register new fcal Functions
   * @param {Array<FcalFunction>} functions list of fcal function definitions
   */
  public static UseFunctions(functions: FcalFunction[]) {
    for (const func of functions) {
      this.UseFunction(func);
    }
  }
  /**
   * Register new Fcal function
   * @param {FcalFunction} function fcal function definitions
   */
  public static UseFunction(func: FcalFunction) {
    Fcal.gst.set(func.name, Entity.FUNCTION);
    this.functions.push(func);
  }
  /**
   * Register new units
   * @param {Array<Unit>} units
   */
  public static UseUnits(units: Unit[]) {
    for (const unit of units) {
      this.UseUnit(unit);
    }
  }

  /**
   * Register new unit
   * @param {Unit} unit
   */
  public static UseUnit(unit: Unit) {
    this.units.push(unit);
  }

  /**
   * Get unit meta by its phrase
   * @param {string} unit phrase
   * @returns {UnitMeta | null}
   */
  public static getUnit(unit: string): UnitMeta | null {
    return this.units.get(unit);
  }

  /**
   * useConstants
   */
  public static useConstants(constants: { [index: string]: Type | Decimal | number | string }) {
    for (const key in constants) {
      if (constants.hasOwnProperty(key)) {
        const element = constants[key];
        this.constants.set(key, element);
      }
    }
  }

  public static IntialiseStaticValues() {
    this.gst = new SymbolTable();
    if (!this.phrases) {
      this.phrases = this.getdefaultphrases();
    }
    if (!this.units) {
      this.units = new Unit.List(Fcal.gst);
      this.setDefaultUnits();
    }
    if (!this.functions) {
      this.functions = new FcalFunction.List();
      this.setDefaultFunctions();
    }
    if (!this.constants) {
      this.constants = new Constant(this.gst);
      this.setDefaultConstants();
    }
  }
  private static gst: SymbolTable;
  private static units: Unit.List;
  private static functions: FcalFunction.List;
  private static phrases: Phrases;
  private static constants: Constant;
  private static getdefaultphrases(): Phrases {
    const phrases = new Phrases(this.gst);
    phrases.push(TT.PLUS, ['PLUS', 'AND', 'WITH', 'ADD']);
    phrases.push(TT.MINUS, ['MINUS', 'SUBTRACT', 'WITHOUT']);
    phrases.push(TT.TIMES, ['TIMES', 'MULTIPLIEDBY', 'mul']);
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

  private static setDefaultConstants() {
    this.useConstants({
      E: Type.BNumber.New('2.718281828459045235360287'),
      PI: Type.BNumber.New('3.141592653589793238462645'),
      PI2: Type.BNumber.New('6.2831853071795864769'),
      _: Type.BNumber.ZERO,
    });
  }

  /* ========================================================  */

  private environment: Environment;
  private lst: SymbolTable;
  constructor() {
    this.lst = Fcal.gst.clone();
    this.environment = new Environment(Fcal.functions, this.lst, Fcal.constants);
  }
  /**
   * Evaluates given expression
   * @param {String} expression Math expression
   * @returns {Type} result of expression
   */
  public evaluate(source: string): Type {
    source = prefixNewLIne(source);
    return new Interpreter(source, Fcal.phrases, Fcal.units, this.environment).evaluateExpression();
  }
  /**
   * Create new expression with copy of Fcal.Environment
   * @param {String} source Math  expression
   * @returns {Expression} Expression with parsed AST
   */
  public expression(source: string): Expression {
    const symbolTable = this.lst.clone();
    const env = new Environment(Fcal.functions, symbolTable, Fcal.constants);
    env.values = Object.assign({}, this.environment.values);
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, env));
  }
  /**
   * Create new  Expression in sync with Fcal.Environment
   * @param {Strign} source Math expression
   * @returns {Expression} Expression with parsed AST
   */
  public expressionSync(source: string): Expression {
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, this.environment));
  }
  /**
   * create a new variable with value or assign value to variable
   * @param {{[index:string]: Type | number | string | Decimal}} values vairbles
   */
  public setValues(values: { [index: string]: Type | number | string | Decimal }) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.environment.set(key, element);
      }
    }
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
   * Evaluate AST of Math expression
   * @returns {Type}  result of Math expression
   */
  public evaluate(): Type {
    return this.interpreter.evaluateExpression();
  }
  /**
   * Change state of variables
   * if variable is not found,  it will create a new variable
   * @param {{[index:string]: Type | number}} values variables
   */
  public setValues(values: { [index: string]: Type | number | string | Decimal }) {
    this.interpreter.setValues(values);
  }
  public getAST(): string {
    return this.interpreter.getAST();
  }
}
Fcal.IntialiseStaticValues();

export { Fcal, Expression, FcalFunction, Environment, Unit, Type, Decimal };
