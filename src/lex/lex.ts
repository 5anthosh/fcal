import { Type as any } from '../types/datatype';
import { Phrases } from '../types/phrase';
import { TType } from '../types/units';
import { Char } from './char';
import { LexerError } from './lexError';
import { Token, TokenType } from './token';
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
  public ttypes: TType.TTypes;
  private tokens: Token[];
  private source: string;
  private start: number;
  private current: number;
  private phrases: Phrases;
  constructor(source: string, phrases: Phrases, ttypes: TType.TTypes) {
    this.source = source.replace(/[ \t]+$/, '');
    this.start = 0;
    this.current = 0;
    this.tokens = [];
    this.phrases = phrases;
    this.ttypes = ttypes;
  }
  public Next(): Token {
    if (this.isAtEnd()) {
      return Token.EOLToken(this.current);
    }
    return this.scan();
  }
  private scan(): Token {
    const char = this.space();
    switch (char) {
      case Char.PLUS:
        return this.createToken(TokenType.PLUS);
      case Char.MINUS:
        return this.createToken(TokenType.MINUS);
      case Char.TIMES:
        return this.createToken(TokenType.TIMES);
      case Char.SLASH:
        return this.createToken(TokenType.SLASH);
      case Char.OPEN_PARAN:
        return this.createToken(TokenType.OPEN_PARAN);
      case Char.CLOSE_PARAN:
        return this.createToken(TokenType.CLOSE_PARAN);
      case Char.CAP:
        return this.createToken(TokenType.CAP);
      case Char.PERCENTAGE:
        return this.createToken(TokenType.PERCENTAGE);
      case Char.NEWLINE:
        return this.createToken(TokenType.NEWLINE);
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
  private advance(): string {
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
    while (Lexer.isAlpha(this.peek(0))) {
      this.advance();
    }
    const text = this.lexeme();
    let type: TokenType;
    let ok: boolean;
    [type, ok] = this.phrases.search(text);
    if (ok) {
      return this.createToken(type);
    }

    [, ok] = this.ttypes.get(text);
    if (ok) {
      return this.createTokenWithLiteral(TokenType.UNIT, text);
    }

    throw new LexerError(`Unexpected Identifier "${text}"`);
  }
  // private match(expected: String): boolean {
  //   if (this.isAtEnd()) {
  //     return false;
  //   }
  //   if (this.source.charAt(this.current) != expected) {
  //     return false;
  //   }
  //   this.current++;
  //   return true;
  // }
  private number(): Token {
    while (Lexer.isDigit(this.peek(0))) {
      this.advance();
    }
    if (this.peek(0) === '.' && Lexer.isDigit(this.peek(1))) {
      this.advance();
      while (Lexer.isDigit(this.peek(0))) {
        this.advance();
      }
    }
    return this.createTokenWithLiteral(TokenType.Number, new any.BNumber(this.lexeme()));
  }
  private createToken(type: TokenType): Token {
    return this.createTokenWithLiteral(type, null);
  }
  private createTokenWithLiteral(type: TokenType, literal: any): Token {
    const token = new Token(type, this.lexeme(), literal, this.start, this.current);
    this.start = this.current;
    this.tokens.push(token);
    return token;
  }
  private lexeme(): string {
    return this.source.substring(this.start, this.current);
  }
  private space(): string {
    let char = this.advance();
    while (Lexer.isSpace(char)) {
      this.start = this.current;
      char = this.advance();
    }
    return char;
  }
}
