import { TokenType } from '../lex/token';

export class Phrase {
  public type: TokenType;
  public phrases: string[];
  constructor(type: TokenType, ...phrases: string[]) {
    this.type = type;
    this.phrases = phrases;
  }
}

export class Phrases {
  public phrases: Phrase[];
  constructor() {
    this.phrases = [];
  }
  public add(...phrases: Phrase[]) {
    this.phrases.push(...phrases);
  }
  public getPhrases(key: TokenType): [string[], boolean] {
    for (const phrase of this.phrases) {
      if (phrase.type === key) {
        return [phrase.phrases, true];
      }
    }
    return [[], false];
  }
  public search(key: string): [TokenType, boolean] {
    key = key.toUpperCase();
    for (const phrase of this.phrases) {
      if (phrase.phrases.find(x => x === key)) {
        return [phrase.type, true];
      }
    }
    return [0, false];
  }
  public addPhrases(type: TokenType, ...phrases: string[]) {
    phrases = phrases.map(x => x.toUpperCase());
    for (const phrase of this.phrases) {
      if (phrase.type === type) {
        phrase.phrases.push(...phrases);
      }
    }
    this.add(new Phrase(type, ...phrases));
  }
}
