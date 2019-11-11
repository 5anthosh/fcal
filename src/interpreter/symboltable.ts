import { FcalError } from '../fcal';

export class SymbolTable {
  private registry: Map<string, Entity>;
  constructor(entries?: Map<string, Entity>) {
    if (entries) {
      this.registry = new Map<string, Entity>(entries);
      return;
    }
    this.registry = new Map<string, Entity>();
    this.registry.set('bin', Entity.NS);
    this.registry.set('binary', Entity.NS);
    this.registry.set('dec', Entity.NS);
    this.registry.set('decimal', Entity.NS);
    this.registry.set('hex', Entity.NS);
    this.registry.set('hexadecimal', Entity.NS);
    this.registry.set('oct', Entity.NS);
    this.registry.set('octal', Entity.NS);
  }
  public set(phrase: string, entity: Entity): void {
    const c = this.registry.get(phrase);
    if (c) {
      throw new FcalError(`${phrase} is already used in ${c.toLowerCase()}`);
    }
    this.registry.set(phrase, entity);
  }
  public get(phrase: string): Entity | undefined {
    return this.registry.get(phrase);
  }
  public clone(): SymbolTable {
    return new SymbolTable(this.registry);
  }
}
export enum Entity {
  FUNCTION = 'FUNCTION',
  VARIABLE = 'VARIABLE',
  CONSTANT = 'CONSTANT',
  OPERATION_PHRASE = 'OPERATION PHRASE',
  NS = 'NUMBER SYSTEM',
  UNIT = 'UNIT',
}
