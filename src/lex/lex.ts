import { FcalError } from '../FcalError';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';
import { Phrases } from '../types/phrase';
import { Unit } from '../types/units';
import { Char } from './char';
import { Token, TT } from './token';
export class Lexer {
  public static notAlpha: string[] = [
    Char.PLUS,
    Char.MINUS,
    Char.TIMES,
    Char.SLASH,
    Char.OPEN_PARAN,
    Char.CLOSE_PARAN,
    Char.CAP,
    Char.PERCENTAGE,
    Char.EQUAL,
    Char.COMMA,
    Char.DOUBLE_COLON,
    Char.NEWLINE,
  ];
  private static isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  private static isAlpha(char: string): boolean {
    return (
      !Lexer.isDigit(char) && !this.isSpace(char) && char !== '\0' && char !== '\n' && !Lexer.notAlpha.includes(char)
    );
  }
  private static isSpace(char: string): boolean {
    return char === '\t' || char === ' ';
  }
  private static isBinaryDigit(char: string): boolean {
    return char === '0' || char === '1';
  }
  private static isOctalDigit(char: string): boolean {
    return char >= '0' && char <= '8';
  }
  private static isHexDigit(char: string): boolean {
    return (char >= '0' && char <= '9') || (char >= 'a' && char <= 'f') || (char >= 'A' && char <= 'F');
  }
  public units: Unit.List;
  private tokens: Token[];
  private source: string;
  private start: number;
  private current: number;
  private phrases: Phrases;
  constructor(source: string, phrases: Phrases, untis: Unit.List) {
    // Removing the space around expression
    this.source = source.replace(/[ \t]+$/, '');
    this.start = 0;
    this.current = 0;
    this.tokens = [];
    this.phrases = phrases;
    this.units = untis;
  }
  public Next(): Token {
    if (this.isAtEnd()) {
      return Token.EOL(this.current);
    }
    return this.scan();
  }
  private scan(): Token {
    const char = this.space();
    switch (char) {
      case Char.PLUS:
        return this.TT(TT.PLUS);
      case Char.MINUS:
        return this.TT(TT.MINUS);
      case Char.TIMES:
        return this.TT(TT.TIMES);
      case Char.SLASH:
        return this.TT(TT.SLASH);
      case Char.EQUAL:
        return this.TT(TT.EQUAL);
      case Char.COMMA:
        return this.TT(TT.COMMA);
      case Char.DOUBLE_COLON:
        return this.TT(TT.EQUAL);
      case Char.OPEN_PARAN:
        return this.TT(TT.OPEN_PARAN);
      case Char.CLOSE_PARAN:
        return this.TT(TT.CLOSE_PARAN);
      case Char.CAP:
        return this.TT(TT.CAP);
      case Char.PERCENTAGE:
        return this.TT(TT.PERCENTAGE);
      case Char.NEWLINE:
        return this.TT(TT.NEWLINE);
      default:
        if (Lexer.isDigit(char)) {
          return this.number();
        }
        return this.string();
    }
  }
  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }
  private eat(): string {
    this.current++;
    return this.source.charAt(this.current - 1);
  }
  private peek(n: number): string {
    if (this.current + n >= this.source.length) {
      return '\0';
    }
    return this.source.charAt(this.current + n);
  }
  private string(): Token {
    while (Lexer.isAlpha(this.peek(0)) || Lexer.isDigit(this.peek(0))) {
      this.eat();
    }
    const text = this.lexeme();
    let type: TT | undefined;
    if (text === 'Infinity') {
      return this.TTWithLiteral(TT.Number, new Type.BNumber(text));
    }
    type = this.phrases.get(text);
    if (type !== undefined) {
      return this.TT(type);
    }
    const unit = this.units.get(text);
    if (unit) {
      return this.TTWithLiteral(TT.UNIT, text);
    }
    const ns = NumberSystem.get(text);
    if (ns) {
      return this.TTWithLiteral(TT.NS, text);
    }
    return this.TT(TT.NAME);
  }
  private number(): Token {
    if (this.peek(0) === 'b' || this.peek(0) === 'B') {
      this.eat();
      while (Lexer.isDigit(this.peek(0))) {
        if (!Lexer.isBinaryDigit(this.peek(0))) {
          throw new FcalError(`Unexpected '${this.peek(0)}' in binary number`, this.current);
        }
        this.eat();
      }
      const value = new Type.BNumber(this.lexeme());
      value.setSystem(NumberSystem.Binary);
      return this.TTWithLiteral(TT.Number, value);
    }
    if (this.peek(0) === 'o' || this.peek(0) === 'O') {
      this.eat();
      while (Lexer.isDigit(this.peek(0))) {
        if (!Lexer.isOctalDigit(this.peek(0))) {
          throw new FcalError(`Unexpected '${this.peek(0)}' in Octal number`, this.current);
        }
        this.eat();
      }
      const value = new Type.BNumber(this.lexeme());
      value.setSystem(NumberSystem.Octal);
      return this.TTWithLiteral(TT.Number, value);
    }
    if (this.peek(0) === 'x' || this.peek(0) === 'X') {
      this.eat();
      if (!Lexer.isHexDigit(this.peek(0))) {
        throw new FcalError(`Unexpected '${this.peek(0)}' in Hexa decimal`, this.current);
      }
      while (Lexer.isHexDigit(this.peek(0))) {
        this.eat();
      }
      const value = new Type.BNumber(this.lexeme());
      value.setSystem(NumberSystem.HexaDecimal);
      return this.TTWithLiteral(TT.Number, value);
    }
    while (Lexer.isDigit(this.peek(0))) {
      this.eat();
    }
    if (this.peek(0) === '.' && Lexer.isDigit(this.peek(1))) {
      this.eat();
      while (Lexer.isDigit(this.peek(0))) {
        this.eat();
      }
    }
    if (this.peek(0) === 'E' || this.peek(0) === 'e') {
      let c = this.peek(0);
      this.eat();
      if (this.peek(0) === '+' || this.peek(0) === '-') {
        c = this.peek(0);
        this.eat();
      }
      if (!Lexer.isDigit(this.peek(0))) {
        throw new FcalError(`Expecting number after ${c} but got '${this.peek(0)}'`, this.start, this.current);
      }
      while (Lexer.isDigit(this.peek(0))) {
        this.eat();
      }
    }
    return this.TTWithLiteral(TT.Number, new Type.BNumber(this.lexeme()));
  }
  private TT(type: TT): Token {
    return this.TTWithLiteral(type, null);
  }
  private TTWithLiteral(type: TT, literal: any): Token {
    const token = new Token(type, this.lexeme(), literal, this.start, this.current);
    this.start = this.current;
    this.tokens.push(token);
    return token;
  }
  private lexeme(): string {
    return this.source.substring(this.start, this.current);
  }
  private space(): string {
    let char = this.eat();
    while (Lexer.isSpace(char)) {
      this.start = this.current;
      char = this.eat();
    }
    return char;
  }
}
