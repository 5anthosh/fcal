import { Decimal } from 'decimal.js';
import { Type } from '../types/datatype';
import { EnvInputType } from './environment';
import { Entity, SymbolTable } from './symboltable';

/**
 * Scale is used to define scale of number literal
 */
class Scale {
  public readonly symbolTable: SymbolTable;
  public readonly values: Map<string, Type>;

  constructor(symbolTable: SymbolTable) {
    this.values = new Map<string, Type>();
    this.symbolTable = symbolTable;
  }

  public get(key: string): Type | undefined {
    return this.values.get(key);
  }
  /**
   * create new scale
   * @param {string} key scale name
   * @param  {Type | Big.Decimal | number | string} value value
   */
  public set(key: string, value: Type | Decimal | number | string): void {
    this.symbolTable.set(key, Entity.SCALE);
    if (value instanceof Type) {
      this.values.set(key, value);
      return;
    }
    this.values.set(key, Type.BNumber.New(value));
  }

  /**
   * import values from Object or map into scale
   * @param {Object | Map} values
   */
  public use(values: EnvInputType): void {
    if (values instanceof Map) {
      values.forEach((value: Type | Decimal | number | string, key: string) => {
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

export { Scale };
