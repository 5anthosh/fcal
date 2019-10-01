import Big from "../../lib/big.js";
import { TokenType, Token, Char } from "./token";
export class Lexer {
  private source: String;
  tokens: Token[];
  private start: number;
  private current: number;
  constructor(source: String) {
    this.source = source;
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
    let char = this.advance();
    switch (char) {
      case Char.PLUS:
        return this.createToken(TokenType.PLUS, Char.PLUS);
      case Char.MINUS:
        return this.createToken(TokenType.MINUS, Char.MINUS);
      case Char.STAR:
        return this.createToken(TokenType.STAR, Char.STAR);
      case Char.SLASH:
        return this.createToken(TokenType.SLASH, Char.SLASH);
      default:
        if (Lexer.isDigit(char)) {
          return this.number();
        }
        throw new LexerError(`Unexpected character ${char}`);
    }
  }
  private static isDigit(char: String): boolean {
    return char >= "0" && char <= "9";
  }
  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }
  private advance(): String {
    this.current++;
    return this.source.charAt(this.current - 1);
  }
  private peek(n: number): String {
    if (this.current + n >= this.source.length) return "\0";
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
    if (this.peek(0) == "." && Lexer.isDigit(this.peek(1))) {
      this.advance();
      while (Lexer.isDigit(this.peek(0))) {
        this.advance();
      }
    }
    return this.createToken(TokenType.Number, new Big(this.lexeme()));
  }
  private createToken(type: TokenType, literal: any): Token {
    let token = new Token(
      type,
      this.lexeme(),
      literal,
      this.start,
      this.current
    );
    this.start = this.current;
    this.tokens.push(token);
    return token;
  }
  private lexeme(): String {
    return this.source.substring(this.start, this.current);
  }
}

export class LexerError extends Error {
  constructor(message) {
    super(message);
    this.name = "LexerParingrror";
  }
}
