import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { Type } from '../types/datatype';
import { Constant } from './constants';
import { FcalFunction } from './function';
import { Entity, SymbolTable } from './symboltable';

/**
 * Represents runtime variable environment
 * It represents state of fcal
 */
class Environment {
  // simple object is used for variables
  // with key as variable name and value as value
  public readonly functions: FcalFunction.List;
  public readonly symbolTable: SymbolTable;
  public values: Map<string, Type>;
  constructor(functions: FcalFunction.List, symbolTable: SymbolTable, constants: Constant) {
    this.values = new Map<string, Type>(constants.values);
    this.functions = functions;
    this.symbolTable = symbolTable;
  }
  /**
   * Get the value of variable
   * @param {String} key variable name
   * @throws {FcalError} Error if variable is not available
   */
  public get(key: string): Type {
    const v = this.values.get(key);
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
  public set(key: string, value: Type | Decimal | number | string): void {
    if (!this.values.has(key)) {
      this.symbolTable.set(key, Entity.VARIABLE);
    }
    if (value instanceof Type) {
      this.values.set(key, value);
      return;
    }
    this.values.set(key, Type.BNumber.New(value));
  }
}

export { Environment };
