import { Lexer } from '../lex/lex';
import { Token, TokenType } from '../lex/token';
import { Phrases } from '../phrase';
import { Expr } from './expr';

export class Parser {
  public source: string;
  private lexer: Lexer;
  private ntoken: number;
  private tokens: Token[];
  private depth: number;
  constructor(source: string, phrases: Phrases) {
    this.source = source;
    this.lexer = new Lexer(this.source, phrases);
    this.ntoken = 0;
    this.depth = 0;
    this.tokens = [];
  }
  public parse(): Expr {
    const expr = this.expressionStmt();
    return expr;
  }

  private expressionStmt(): Expr {
    const expr = this.expression();
    this.consume(TokenType.NEWLINE, 'Expecting new Line ');
    return expr;
  }
  private expression(): Expr {
    return this.percentage();
  }

  private percentage(): Expr {
    let expr = this.addition();
    while (this.match(TokenType.OF)) {
      const operator = this.previous();
      this.depth += 1;
      expr.increaseDepth();
      const right = this.addition();
      this.depth -= 1;
      expr = new Expr.Binary(this.depth, expr, operator, right, expr.start, right.end);
    }
    return expr;
  }
  private addition(): Expr {
    let expr = this.multiply();
    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      this.depth += 1;
      expr.increaseDepth();
      const right = this.multiply();
      this.depth -= 1;
      expr = new Expr.Binary(this.depth, expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private multiply(): Expr {
    let expr = this.unary();
    while (this.match(TokenType.TIMES, TokenType.SLASH, TokenType.MOD, TokenType.OF)) {
      const operator = this.previous();
      this.depth += 1;
      expr.increaseDepth();
      const right = this.unary();
      this.depth -= 1;
      expr = new Expr.Binary(this.depth, expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private unary(): Expr {
    if (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      this.depth += 1;
      const right = this.unary();
      this.depth -= 1;
      return new Expr.Unary(this.depth, operator, right, operator.start, right.end);
    }
    return this.exponent();
  }
  private exponent(): Expr {
    let expr = this.percent();
    while (this.match(TokenType.CAP)) {
      const operator = this.previous();
      this.depth += 1;
      expr.increaseDepth();
      const right = this.unary();
      this.depth -= 1;
      expr = new Expr.Binary(this.depth, expr, operator, right, expr.start, right.end);
    }
    return expr;
  }
  private percent(): Expr {
    let expr = this.term();
    if (this.match(TokenType.PERCENTAGE)) {
      const operator = this.previous();
      expr = new Expr.Percentage(this.depth, expr, expr.start, operator.end);
    }
    return expr;
  }
  private term(): Expr {
    if (this.match(TokenType.Number)) {
      return new Expr.Literal(this.depth, this.previous().Literal, this.previous().start, this.previous().end);
    }
    if (this.match(TokenType.OPEN_PARAN)) {
      const start = this.previous();
      this.depth += 1;
      const expr = this.expression();
      this.depth -= 1;
      this.consume(TokenType.CLOSE_PARAN, "Expect ')' after expression");
      return new Expr.Grouping(this.depth, expr, start.start, expr.end);
    }
    throw new Error(`Expect expression but found ${this.peek().lexeme}`);
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
    console.debug(`CONSUMED TOKEN ${token}`);
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
