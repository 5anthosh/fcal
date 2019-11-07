import Decimal from 'decimal.js';
import { Entity, SymbolTable } from '../symboltable';
import { Type } from '../types/datatype';

export class Constant {
  // simple object is used for variables
  // with key as variable name and value as value
  public symbolTable: SymbolTable;
  public values: { [index: string]: Type };
  constructor(symbolTable: SymbolTable) {
    this.values = {};
    this.symbolTable = symbolTable;
  }
  /**
   * create or assign a constant with value
   * @param {string} key constatn name
   * @param  {Type | Big.Decimal | number | string} value value
   */
  public set(key: string, value: Type | Decimal | number | string) {
    if (!this.values.hasOwnProperty(key)) {
      this.symbolTable.set(key, Entity.VARIABLE);
    }
    if (value instanceof Type) {
      this.values[key] = value;
      return;
    }
    this.values[key] = Type.BNumber.New(value);
  }
}
