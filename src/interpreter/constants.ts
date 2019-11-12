import { Decimal } from 'decimal.js';
import { Type } from '../types/datatype';
import { Entity, SymbolTable } from './symboltable';

class Constant {
  // simple object is used for variables
  // with key as variable name and value as value
  public readonly symbolTable: SymbolTable;
  public readonly values: Map<string, Type>;
  constructor(symbolTable: SymbolTable) {
    this.values = new Map<string, Type>();
    this.symbolTable = symbolTable;
  }
  /**
   * create or assign a constant with value
   * @param {string} key constatn name
   * @param  {Type | Big.Decimal | number | string} value value
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

export { Constant };
