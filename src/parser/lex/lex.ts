import { Converter } from '../../evaluator/converter';
import { Scale } from '../../evaluator/scale';
import { FcalError } from '../../fcal';
import { Type } from '../../types/datatype';
import { NumberSystem } from '../../types/numberSystem';
import { Phrases } from '../../types/phrase';
import { Unit } from '../../types/units';
import { Token, TT } from './token';

class Lexer {
  public static notAlpha: string[] = [
    TT.PLUS,
    TT.MINUS,
    TT.TIMES,
    TT.SLASH,
    TT.OPEN_PAREN,
    TT.CLOSE_PAREN,
    TT.CAP,
    TT.PERCENTAGE,
    TT.EQUAL,
    TT.COMMA,
    TT.DOUBLE_COLON,
    TT.NEWLINE,
    '&',
    '|',
    TT.LESS,
    TT.GREATER,
    '!',
    TT.Q,
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
  private cc: Converter;
  private scale: Scale;

  constructor(source: string, phrases: Phrases, units: Unit.List, cc: Converter, scale: Scale) {
    // Removing the space around expression
    this.source = source.replace(/[ \t]+$/, '');
    this.start = 0;
    this.current = 0;
    this.tokens = Array<Token>();
    this.phrases = phrases;
    this.units = units;
    this.cc = cc;
    this.scale = scale;
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
      case TT.PLUS:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          return this.TT(TT.PLUS_EQUAL);
        }
        return this.TT(TT.PLUS);
      case TT.MINUS:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          return this.TT(TT.MINUS_EQUAL);
        }
        return this.TT(TT.MINUS);
      case TT.TIMES:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          return this.TT(TT.MULTIPLY_EQUAL);
        }
        if (this.peek(0) === TT.TIMES) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.POWER_EQUAL);
          }
          return this.TT(TT.CAP);
        }
        return this.TT(TT.TIMES);
      case TT.SLASH:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          return this.TT(TT.DIVIDE_EQUAL);
        }
        if (this.peek(0) === TT.SLASH) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.FLOOR_DIVIDE_EQUAL);
          }
          return this.TT(TT.FLOOR_DIVIDE);
        }
        return this.TT(TT.SLASH);
      case TT.EQUAL:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.EQUAL_EQUAL_EQUAL);
          }
          return this.TT(TT.EQUAL_EQUAL);
        }
        return this.TT(TT.EQUAL);
      case TT.NOT:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.NOT_EQUAL_EQUAL);
          }
          return this.TT(TT.NOT_EQUAL);
        }
        return this.TT(TT.NOT);
      case TT.GREATER:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.GREATER_EQUAL_EQUAL);
          }
          return this.TT(TT.GREATER_EQUAL);
        }
        return this.TT(TT.GREATER);
      case TT.LESS:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          if (this.peek(0) === TT.EQUAL) {
            this.eat();
            return this.TT(TT.LESS_EQUAL_EQUAL);
          }
          return this.TT(TT.LESS_EQUAL);
        }
        return this.TT(TT.LESS);
      case '&':
        if (this.peek(0) === '&') {
          this.eat();
          return this.TT(TT.AND);
        }
        throw new FcalError('Unexpected character &', this.current);
      case '|':
        if (this.peek(0) === '|') {
          this.eat();
          return this.TT(TT.OR);
        }
        throw new FcalError('Unexpected character |', this.current);
      case TT.COMMA:
        return this.TT(TT.COMMA);
      case TT.DOUBLE_COLON:
        return this.TT(TT.DOUBLE_COLON);
      case TT.OPEN_PAREN:
        return this.TT(TT.OPEN_PAREN);
      case TT.CLOSE_PAREN:
        return this.TT(TT.CLOSE_PAREN);
      case TT.CAP:
        if (this.peek(0) === TT.EQUAL) {
          this.eat();
          return this.TT(TT.POWER_EQUAL);
        }
        return this.TT(TT.CAP);
      case TT.Q:
        return this.TT(TT.Q);
      case TT.PERCENTAGE:
        return this.TT(TT.PERCENTAGE);
      case TT.NEWLINE:
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
    if (type) {
      return this.TT(type);
    }
    const s = this.scale.get(text);
    if (s) {
      return this.TTWithLiteral(TT.SCALE, text);
    }
    const unit = this.units.get(text);
    if (unit) {
      return this.TTWithLiteral(TT.UNIT, text);
    }
    const ns = NumberSystem.get(text);
    if (ns) {
      return this.TTWithLiteral(TT.NS, text);
    }
    const cc = this.cc.get(text);
    if (cc) {
      return this.TTWithLiteral(TT.CC, text);
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
      value.setSystem(NumberSystem.bin);
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
      value.setSystem(NumberSystem.oct);
      return this.TTWithLiteral(TT.Number, value);
    }

    if (this.peek(0) === 'x' || this.peek(0) === 'X') {
      this.eat();
      if (!Lexer.isHexDigit(this.peek(0))) {
        throw new FcalError(`Unexpected '${this.peek(0)}' in Hexadecimal`, this.current);
      }
      while (Lexer.isHexDigit(this.peek(0))) {
        this.eat();
      }
      const value = new Type.BNumber(this.lexeme());
      value.setSystem(NumberSystem.hex);
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
        let peekValue = this.peek(0);
        if (peekValue === '\n') {
          peekValue = 'EOL';
        }
        throw new FcalError(`Expecting number after ${c} but got '${peekValue}'`, this.start, this.current);
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

export { Lexer };

