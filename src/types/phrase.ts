import { Entity, SymbolTable } from '../interpreter/symboltable';
import { TT } from '../lex/token';

class Phrases {
  public phrases: Map<string, TT>;
  private symbolTable: SymbolTable;
  constructor(symbolTable: SymbolTable) {
    this.symbolTable = symbolTable;
    this.phrases = new Map<string, TT>();
  }
  public push(key: TT, phrases: string[]) {
    for (const phrase of phrases) {
      this.symbolTable.set(phrase.toUpperCase(), Entity.OPERATION_PHRASE);
      this.phrases.set(phrase.toUpperCase(), key);
    }
  }
  public get(key: string): TT | undefined {
    return this.phrases.get(key.toUpperCase());
  }
}

export { Phrases };
