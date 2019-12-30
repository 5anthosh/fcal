import { Decimal } from 'decimal.js';
import { getDefaultFunctions } from './default/functions';
import { getDefaultUnits } from './default/units';
import { Constant } from './interpreter/constants';
import { Converter, converterFuncFmt } from './interpreter/converter';
import { EnvInputType, Environment } from './interpreter/environment';
import { FcalFunction, IUseFunction } from './interpreter/function';
import { Interpreter } from './interpreter/interpreter';
import { Scale } from './interpreter/scale';
import { Entity, SymbolTable } from './interpreter/symboltable';
import { JSONParser } from './json/JSONParser';
import { TT } from './lex/token';
import { Type } from './types/datatype';
import { Phrases } from './types/phrase';
import { IUseUnit, Unit, UnitMeta } from './types/units';

/**
 * Math expression evaluator.
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
   * @param {Array<FcalFunction | Object>} functions list of fcal function definitions
   */
  public static UseFunctions(functions: Array<FcalFunction | IUseFunction>): void {
    for (const func of functions) {
      this.UseFunction(func);
    }
  }

  /**
   * Register new Fcal function
   * @param {FcalFunction | Object} function fcal function definitions
   */
  public static UseFunction(func: FcalFunction | IUseFunction): void {
    Fcal.gst.set(func.name, Entity.FUNCTION);
    if (func instanceof FcalFunction) {
      this.functions.push(func);
      return;
    }
    this.functions.push(new FcalFunction(func.name, func.arity, func.func));
  }

  /**
   * Register new units
   * @param {Array<Unit | Object>} units
   */
  public static UseUnits(units: Array<Unit | IUseUnit>): void {
    for (const unit of units) {
      this.UseUnit(unit);
    }
  }

  /**
   * Register new unit
   * @param {Unit | Object} unit
   */
  public static UseUnit(unit: Unit | IUseUnit): void {
    if (unit instanceof Unit) {
      return this.units.push(unit);
    }
    const u = new Unit(unit.id, unit.ratio, unit.type, unit.phrases);
    if (unit.bias) {
      u.setBias(unit.bias);
    }
    if (unit.plural) {
      u.Plural(unit.plural);
    }
    if (unit.singular) {
      u.Singular(unit.singular);
    }
    this.units.push(u);
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
   * useConstants set the constants in fcal
   * @param { { [index: string]: Type | Decimal | number | string } } constants
   */
  public static useConstants(constants: EnvInputType): void {
    this.constants.use(constants);
  }

  /**
   * useScales register new scale in fcal
   * @param { { [index: string]: Type | Decimal | number | string } } scales
   */
  public static useScales(scales: EnvInputType): void {
    this.scale.use(scales);
  }

  public static useConverter(id: string, f: converterFuncFmt): void {
    this.c.set(id, f);
  }

  public static initialize(): void {
    if (!this.gst) {
      this.gst = new SymbolTable();
    }
    if (!this.phrases) {
      this.phrases = this.getDefaultPhrases();
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
    if (!this.c) {
      this.c = new Converter(this.gst);
      this.setDefaultConverter();
    }
    if (!this.scale) {
      this.scale = new Scale(this.gst);
      this.setDefaultScales();
    }
  }

  /*=========================== Private static =================================== */

  private static gst: SymbolTable;
  private static units: Unit.List;
  private static functions: FcalFunction.List;
  private static phrases: Phrases;
  private static constants: Constant;
  private static c: Converter;
  private static scale: Scale;

  private static getDefaultPhrases(): Phrases {
    const phrases = new Phrases(this.gst);
    phrases.push(TT.PLUS, ['PLUS', 'WITH', 'ADD']);
    phrases.push(TT.MINUS, ['MINUS', 'SUBTRACT', 'WITHOUT']);
    phrases.push(TT.TIMES, ['TIMES', 'MULTIPLIEDBY', 'mul']);
    phrases.push(TT.SLASH, ['DIVIDE', 'DIVIDEBY']);
    phrases.push(TT.CAP, ['POW']);
    phrases.push(TT.MOD, ['mod']);
    phrases.push(TT.OF, ['of']);
    phrases.push(TT.IN, ['in', 'as']);
    phrases.push(TT.AND, ['and']);
    phrases.push(TT.OR, ['or']);
    phrases.push(TT.NOT, ['not']);
    return phrases;
  }

  private static setDefaultFunctions(): void {
    this.UseFunctions(getDefaultFunctions());
  }

  private static setDefaultUnits(): void {
    this.UseUnits(getDefaultUnits());
  }

  private static setDefaultConstants(): void {
    this.useConstants({
      E: Type.BNumber.New('2.718281828459045235360287'),
      PI: Type.BNumber.New('3.141592653589793238462645'),
      PI2: Type.BNumber.New('6.2831853071795864769'),
      false: Type.FBoolean.FALSE,
      true: Type.FBoolean.TRUE,
    });
  }

  private static setDefaultScales(): void {
    const thousand = 1000;
    const million = 10_00_000;
    const billion = 1_00_00_000;
    this.useScales({ k: thousand, M: million, B: billion, thousand, million, billion });
  }

  private static setDefaultConverter() {
    const num = (v: Type): Type => {
      return Type.BNumber.New((v as Type.Numeric).n);
    };
    const per = (v: Type): Type => {
      return Type.Percentage.New((v as Type.Numeric).n);
    };
    this.useConverter('number', num);
    this.useConverter('num', num);
    this.useConverter('percentage', per);
    this.useConverter('percent', per);
  }

  /* ========================= Class attributes ===============================  */

  private environment: Environment;
  private lst: SymbolTable;

  constructor() {
    this.lst = Fcal.gst.clone();
    this.environment = new Environment(Fcal.functions, this.lst, Fcal.constants);
  }

  /**
   * Evaluates given expression
   * it appends new line character if not present
   * @param {string} expression Math expression
   * @returns {Type} result of expression
   */
  public evaluate(source: string): Type {
    source = prefixNewLIne(source);
    return this.rawEvaluate(source);
  }

  /**
   * rawEvaluates given expression
   * it does not appends new line character if not present
   * @param {string} expression Math expression
   * @returns {Type} result of expression
   */
  public rawEvaluate(source: string): Type {
    return new Interpreter(source, Fcal.phrases, Fcal.units, this.environment, Fcal.c, Fcal.scale).evaluateExpression();
  }

  /**
   * Create new expression with copy of Fcal.Environment
   * @param {string} source Math  expression
   * @returns {Expression} Expression with parsed AST
   */
  public expression(source: string): Expression {
    const symbolTable = this.lst.clone();
    const env = new Environment(Fcal.functions, symbolTable, Fcal.constants);
    env.values = new Map<string, Type>(this.environment.values);
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, env, Fcal.c, Fcal.scale));
  }

  /**
   * Create new  Expression in sync with Fcal.Environment
   * @param {string} source Math expression
   * @returns {Expression} Expression with parsed AST
   */
  public expressionSync(source: string): Expression {
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(source, Fcal.phrases, Fcal.units, this.environment, Fcal.c, Fcal.scale));
  }

  /**
   * create a new variable with value or assign value to variable
   * @param {Object | EnvInputType} values variables
   */
  public setValues(values: EnvInputType) {
    this.environment.use(values);
  }

  /**
   * Import expression from JSON
   * @param {string} source json
   * @returns {Expression}
   */
  public fromJSON(source: string): Expression {
    const parser = new JSONParser(source, Fcal.units, Fcal.c);
    const symbolTable = this.lst.clone();
    const env = new Environment(Fcal.functions, symbolTable, Fcal.constants);
    env.values = new Map<string, Type>(this.environment.values);
    source = prefixNewLIne(source);
    return new Expression(new Interpreter(parser.parse(), Fcal.phrases, Fcal.units, env, Fcal.c, Fcal.scale));
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
  private readonly interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
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
   * @param {Object | Map} values variables
   */
  public setValues(values: EnvInputType): void {
    this.interpreter.environment.use(values);
  }

  public getAST(): string {
    return this.interpreter.getAST();
  }

  public toJSON(): string {
    return this.interpreter.toJSON();
  }

  public toObj(): object {
    return this.interpreter.toObj();
  }

  public toString(): string {
    return this.getAST();
  }
}

/**
 * FcalError represents Error in Fcal
 */
class FcalError extends Error {
  private static mark(start: number, end: number): string {
    return '^'.repeat(start === end ? 1 : end - start).padStart(end, '.');
  }
  public source?: string;
  public start?: number;
  public end?: number;

  constructor(message: string, start?: number, end?: number) {
    super(message);
    this.start = start;
    this.end = end;
    this.message = message;
    if (!start) {
      this.name = 'FcalError';
      return;
    }
    if (!end) {
      this.end = start;
    }
    this.name = `FcalError [${this.start}, ${this.end}]`;
  }
  /**
   * info gets more information about FcalError
   */
  public info(): string {
    const values: string[] = Array<string>();
    values.push(`err: ${this.message}\n`);
    if (this.source !== undefined && this.start !== undefined && this.end !== undefined) {
      values.push(`| ${this.source}`);
      values.push(`| ${FcalError.mark(this.start, this.end)}\n`);
    }
    return values.join('');
  }
}

/***************************************************************/

Fcal.initialize();

export { Fcal, FcalError, Expression, FcalFunction, Environment, Unit, Type, Decimal };
