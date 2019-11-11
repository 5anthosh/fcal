import { FcalError } from './FcalError';

export class SymbolTable {
  private registry: { [index: string]: Entity };
  constructor() {
    this.registry = {
      bin: Entity.NS,
      binary: Entity.NS,
      dec: Entity.NS,
      decimal: Entity.NS,
      hex: Entity.NS,
      hexadecimal: Entity.NS,
      oct: Entity.NS,
      octal: Entity.NS,
    };
  }
  public set(phrase: string, entity: Entity): void {
    if (this.registry.hasOwnProperty(phrase)) {
      throw new FcalError(`${phrase} is already used in ${this.registry[phrase].toLowerCase()}`);
    }
    this.registry[phrase] = entity;
  }
  public get(phrase: string): Entity | undefined {
    return this.registry[phrase];
  }
  public clone(): SymbolTable {
    const clone = new SymbolTable();
    clone.registry = Object.assign({}, this.registry);
    return clone;
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
