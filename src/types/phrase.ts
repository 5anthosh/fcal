import { FcalError } from '../FcalError';
import { TokenType } from '../lex/token';
export class Phrase {
  public type: TokenType;
  public phrases: string[];
  constructor(type: TokenType, ...phrases: string[]) {
    this.type = type;
    this.phrases = phrases;
  }
  public add(...phrases: string[]) {
    for (const phrase of phrases) {
      if (this.check(phrase)) {
        FcalError.throwWithoutCtx(`${phrase} already exists`);
      }
    }
    this.phrases.push(...phrases);
  }
  public check(...phrase: string[]): boolean {
    for (const phrase1 of this.phrases) {
      for (const phrase2 of phrase) {
        if (phrase2 === phrase1) {
          return true;
        }
      }
    }
    return false;
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
    if (this.checkPhrase(...phrases)) {
      FcalError.throwWithoutCtx(`phrases already exits`);
    }
    for (const phrase of this.phrases) {
      if (phrase.type === type) {
        phrase.phrases.push(...phrases);
      }
    }
    this.add(new Phrase(type, ...phrases));
  }
  public checkPhrase(...phrase: string[]): boolean {
    for (const phrase1 of this.phrases) {
      if (phrase1.check(...phrase)) {
        return true;
      }
    }
    return false;
  }
}
