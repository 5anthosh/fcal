import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { Type } from '../types/datatype';
import { Constant } from './constants';
import { FcalFunction } from './function';
import { Entity, SymbolTable } from './symboltable';

type ValInputType = string | number | Decimal | Type;

type EnvInputType = { [index: string]: ValInputType } | Map<string, ValInputType>;

/**
 * Represents runtime variable environment
 * It represents state of fcal
 */
class Environment {
  // simple object is used for variables
  // with key as variable name and value as value
  public readonly functions: FcalFunction.List;
  public readonly symbolTable: SymbolTable;
  public readonly constants: Constant;
  public values: Map<string, Type>;

  constructor(functions: FcalFunction.List, symbolTable: SymbolTable, constants: Constant) {
    this.values = new Map<string, Type>();
    this.functions = functions;
    this.symbolTable = symbolTable;
    this.constants = constants;
    this.values.set('_', new Type.BNumber(0));
  }

  /**
   * Get the value of variable
   * @param {String} key variable name
   * @throws {FcalError} Error if variable is not available
   */
  public get(key: string): Type {
    const v = this.values.get(key) || this.constants.get(key);
    if (v) {
      return v;
    }
    throw new FcalError(`Undefined variable ${key}`);
  }

  /**
   * create or assign a variable with value
   * @param {} key variable name
   * @param value value
   */
  public set(key: string, value: ValInputType): void {
    const en = this.symbolTable.get(key);
    if (en && en === Entity.CONSTANT) {
      throw new FcalError(`Can't reassign constant ${key}`);
    }
    if (!this.values.has(key)) {
      this.symbolTable.set(key, Entity.VARIABLE);
    }
    if (value instanceof Type) {
      this.values.set(key, value);
      return;
    }
    this.values.set(key, Type.BNumber.New(value));
  }
  /**
   * import values from  Object or Map
   * @param {Object | Map} values
   */
  public use(values: EnvInputType): void {
    if (values instanceof Map) {
      values.forEach((value: ValInputType, key: string) => {
        this.set(key, value);
      });
      return;
    }
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        this.set(key, element);
      }
    }
  }
}

export { Environment, EnvInputType };
