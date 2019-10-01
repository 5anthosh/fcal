import { Type } from '../type';
import { Char } from './char';
import { LexerError } from './lexError';
import { Token, TokenType } from './token';
export class Lexer {
  private static isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }
  private static isSpace(char: string): boolean {
    return char === '\n' || char === ' ';
  }
  private tokens: Token[];
  private source: string;
  private start: number;
  private current: number;
  constructor(source: string) {
    this.source = source.replace(/[\s\t\n]+$/, '');
    this.start = 0;
    this.current = 0;
    this.tokens = [];
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
      default:
        if (Lexer.isDigit(char)) {
          return this.number();
        }
        throw new LexerError(`Unexpected character ${char}`);
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
    return this.createTokenWithLiteral(TokenType.Number, Type.Number(this.lexeme()));
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
