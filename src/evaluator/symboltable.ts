import { FcalError } from '../fcal';

/**
 * SymbolTable maintains registry of words with its types
 */
class SymbolTable {
  private parent?: SymbolTable;
  private readonly registry: Map<string, Entity>;

  /**
   * Create new symbol table
   * @param {SymbolTable | undefined}parent parent of the symbol table
   */
  constructor(parent?: SymbolTable) {
    if (parent) {
      this.registry = new Map<string, Entity>();
      this.parent = parent;
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
    this.registry.set('_', Entity.VARIABLE);
  }

  /**
   * Register new phrase or word in symbol table
   * @param {string} phrase phrase
   * @param {Entity} entity type of the phrase
   * @throws {FcalError} if word is already registered
   */
  public set(phrase: string, entity: Entity): void {
    const c = this.get(phrase);
    if (c) {
      throw new FcalError(`${phrase} is already used in ${c.toLowerCase()}`);
    }
    this.registry.set(phrase, entity);
  }

  /**
   * search symbol table whether phrase is already registered
   * @param {string} phrase phrase or word
   * @returns {Entity} entity or type of the phrase
   */
  public get(phrase: string): Entity | undefined {
    const value = this.registry.get(phrase);
    if (value) {
      return value;
    }
    return this.parent?.get(phrase);
  }
}
enum Entity {
  FUNCTION = 'FUNCTION',
  VARIABLE = 'VARIABLE',
  CONSTANT = 'CONSTANT',
  OPERATION_PHRASE = 'OPERATION PHRASE',
  NS = 'NUMBER SYSTEM',
  UNIT = 'UNIT',
  CONVERTER = 'CONVERTER',
  SCALE = 'SCALE',
}

export { Entity, SymbolTable };
