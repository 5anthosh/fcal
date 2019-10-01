import { Lexer } from '../lex/lex';
import { Token, TokenType } from '../lex/token';
import { Expr } from './expr';

export class Parser {
  public source: string;
  private lexer: Lexer;
  private ntoken: number;
  private tokens: Token[];
  constructor(source: string) {
    this.source = source;
    this.lexer = new Lexer(this.source);
    this.ntoken = 0;
    this.tokens = [];
  }
  public parse(): Expr {
    return this.expression();
  }
  private expression(): Expr {
    return this.addition();
  }
  private addition(): Expr {
    let expr = this.multiply();
    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.multiply();
      expr = new Expr.Binary(expr, operator, right);
    }
    return expr;
  }
  private multiply(): Expr {
    let expr = this.unary();
    while (this.match(TokenType.TIMES, TokenType.SLASH)) {
      const operator = this.previous();
      const right = this.multiply();
      expr = new Expr.Binary(expr, operator, right);
    }
    return expr;
  }
  private unary(): Expr {
    if (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new Expr.Unary(operator, right);
    }
    return this.term();
  }
  private term(): Expr {
    if (this.match(TokenType.Number)) {
      return new Expr.Literal(this.previous().Literal);
    }
    if (this.match(TokenType.OPEN_PARAN)) {
      const expr = this.expression();
      this.consume(TokenType.CLOSE_PARAN, "Expect ')' after expression");
      return new Expr.Grouping(expr);
    }
    throw new Error('Expect expression');
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.incr();
        return true;
      }
    }
    return false;
  }
  private consume(type: TokenType, message: string) {
    if (this.check(type)) {
      this.incr();
      return;
    }
    throw new Error(message);
  }
  private check(type: TokenType): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }
  private isAtEnd(): boolean {
    const token = this.nextToken();
    return token.type === TokenType.EOL;
  }
  private nextToken(): Token {
    if (this.ntoken < this.tokens.length) {
      return this.tokens[this.ntoken];
    }
    return this.getToken();
  }
  private getToken(): Token {
    const token = this.lexer.Next();
    if (token.type !== TokenType.EOL) {
      this.tokens.push(token);
    }
    return token;
  }
  private previous(): Token {
    return this.tokens[this.ntoken - 1];
  }
  private peek(): Token {
    return this.nextToken();
  }
  private incr() {
    this.ntoken++;
  }
}
