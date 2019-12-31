import { Type } from '../types/datatype';
import { Entity, SymbolTable } from './symboltable';

type converterFuncFmt = (value: Type) => Type;

class Converter {
  private readonly st: SymbolTable;
  private readonly c: Map<string, converterFuncFmt>;
  constructor(st: SymbolTable) {
    this.st = st;
    this.c = new Map<string, converterFuncFmt>();
  }
  public get(id: string): converterFuncFmt | undefined {
    return this.c.get(id);
  }
  public set(id: string, func: converterFuncFmt) {
    this.st.set(id, Entity.CONVERTER);
    this.c.set(id, func);
  }
}

export { Converter, converterFuncFmt };
