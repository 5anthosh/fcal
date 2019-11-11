import { TT } from '../lex/token';
import { Entity, SymbolTable } from '../symboltable';

class Phrases {
  public phrases: { [index: string]: TT };
  private symbolTable: SymbolTable;
  constructor(symbolTable: SymbolTable) {
    this.symbolTable = symbolTable;
    this.phrases = {};
  }
  public push(key: TT, phrases: string[]) {
    for (const phrase of phrases) {
      this.symbolTable.set(phrase.toUpperCase(), Entity.OPERATION_PHRASE);
      this.phrases[phrase.toUpperCase()] = key;
    }
  }
  public get(key: string): TT | undefined {
    return this.phrases[key.toUpperCase()];
  }
}

export { Phrases };
