import { Type } from '../types/datatype';
import { Entity, SymbolTable } from './symboltable';

type converterFuncFmt = (value: Type) => Type;

/**
 * Converter converts one value into another
 */
class Converter {
  private readonly st: SymbolTable;
  private readonly c: Map<string, converterFuncFmt>;
  /**
   * Create new converter register
   * @param {SymbolTable} st symbol table
   */
  constructor(st: SymbolTable) {
    this.st = st;
    this.c = new Map<string, converterFuncFmt>();
  }
  /**
   * Get the converter by its ID or phrase
   * @param {string} id id of the converter or phrase
   * @returns {converterFuncFmt | undefined} converter function
   */
  public get(id: string): converterFuncFmt | undefined {
    return this.c.get(id);
  }

  /**
   * Register new converter function
   * @param id string
   * @param func converter function
   */
  public set(id: string, func: converterFuncFmt) {
    this.st.set(id, Entity.CONVERTER);
    this.c.set(id, func);
  }
}

export { Converter, converterFuncFmt };
