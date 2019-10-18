import { FcalError } from '../FcalError';
import { TT } from '../lex/token';

export class Phrases {
  public phrases: { [index: string]: TT };
  constructor() {
    this.phrases = {};
  }
  public push(key: TT, phrases: string[]) {
    for (const phrase of phrases) {
      if (this.phrases.hasOwnProperty(phrase.toUpperCase())) {
        FcalError.throwWithoutCtx(`phrases already exits`);
      }
      this.phrases[phrase.toUpperCase()] = key;
    }
  }
  public get(key: string): TT | undefined {
    return this.phrases[key.toUpperCase()];
  }
}
