import { FcalError } from '../FcalError';
import { Lexer } from '../lex/lex';
import { Token, TT } from '../lex/token';
import { Phrases } from '../types/phrase';
import { Unit } from '../types/units';
import { Expr } from './expr';
export class Parser {
  public source: string;
  private lexer: Lexer;
  private ntoken: number;
  private tokens: Token[];
  constructor(source: string, phrases: Phrases, units: Unit.List) {
    this.source = source;
    this.lexer = new Lexer(this.source, phrases, units);
    this.ntoken = 0;
    this.tokens = [];
  }
  public parse(): Expr {
    const expr = this.Stmt();
    return expr;
  }

  private Stmt(): Expr {
    const expr = this.assignment();
    if (this.match([TT.NEWLINE])) {
      return expr;
    }
    if (this.peek().type === TT.EOL) {
      FcalError.throw(this.peek().end, 'Expecting new Line');
    }
    throw FcalError.ErrorWithEnd(this.peek().start, this.peek().end, `Unexpected token ${this.peek().lexeme}`);
  }
  private assignment(): Expr {
    const expr = this.expression();
    if (this.match([TT.EQUAL])) {
      const expres = this.expression();
      if (expr instanceof Expr.Variable) {
        const name = (expr as Expr.Variable).name;
        return new Expr.Assign(name, expres, expr.start, expres.end);
      }
    }
    return expr;
  }
  private expression(): Expr {
    return this.percentage();
  }

  private percentage(): Expr {
    let expr = this.addition();
    while (this.match([TT.OF])) {
      const operator = this.previous();
      const right = this.addition();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }
  private addition(): Expr {
    let expr = this.multiply();
    while (this.match([TT.PLUS, TT.MINUS])) {
      const operator = this.previous();
      const right = this.multiply();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private multiply(): Expr {
    let expr = this.unary();
    while (this.match([TT.TIMES, TT.SLASH, TT.MOD, TT.OF])) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private unary(): Expr {
    if (this.match([TT.PLUS, TT.MINUS])) {
      const operator = this.previous();
      const right = this.unary();
      return new Expr.Unary(operator, right, operator.start, right.end);
    }
    return this.exponent();
  }
  private exponent(): Expr {
    let expr = this.unitConvert();
    while (this.match([TT.CAP])) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }
  private unitConvert(): Expr {
    const expr = this.suffix();
    if (this.match([TT.IN])) {
      this.consume(TT.UNIT, 'Expecting unit after in');
      const unit = this.previous();
      const unit2 = this.lexer.units.get(unit.lexeme);
      if (unit2) {
        return new Expr.UnitConvertionExpr(expr, unit2, expr.start, unit.end);
      }
    }
    return expr;
  }
  private suffix(): Expr {
    const expr = this.call();
    if (this.match([TT.PERCENTAGE])) {
      const operator = this.previous();
      return new Expr.Percentage(expr, expr.start, operator.end);
    }
    if (this.match([TT.UNIT])) {
      const unit = this.previous();
      let unit2;
      unit2 = this.lexer.units.get(unit.lexeme);
      if (unit2) {
        return new Expr.UnitExpr(expr, unit2, expr.start, unit.end);
      }
    }
    return expr;
  }
  private call(): Expr {
    const expr = this.term();
    if (this.match([TT.OPEN_PARAN])) {
      if (expr instanceof Expr.Variable) {
        const argument = Array<Expr>();
        if (this.peek().type !== TT.CLOSE_PARAN) {
          do {
            if (argument.length >= 255) {
              FcalError.throwWithEnd(
                expr.start,
                this.peek().end,
                `${expr.name} function cannot have more than 255 arguments`,
              );
            }
            argument.push(this.expression());
          } while (this.match([TT.COMMA]));
        }
        this.consume(TT.CLOSE_PARAN, "Expect ')' after the arguments");
        return new Expr.Call(expr.name, argument, expr.start, this.previous().end);
      }
      FcalError.throwWithEnd(expr.start, this.previous().end, `Not callable`);
    }
    return expr;
  }
  private term(): Expr {
    if (this.match([TT.Number])) {
      return new Expr.Literal(this.previous().Literal, this.previous().start, this.previous().end);
    }
    if (this.match([TT.OPEN_PARAN])) {
      const start = this.previous();
      const expr = this.expression();
      this.consume(TT.CLOSE_PARAN, `Expect ')' after expression but found ${this.peek().lexeme}`);
      return new Expr.Grouping(expr, start.start, this.previous().end);
    }
    if (this.match([TT.NAME])) {
      return new Expr.Variable(this.previous().lexeme, this.previous().start, this.previous().end);
    }
    throw FcalError.ErrorWithEnd(
      this.peek().start,
      this.peek().end,
      `Expect expression but found ${this.peek().lexeme}`,
    );
  }

  private match(types: TT[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.incr();
        return true;
      }
    }
    return false;
  }
  private consume(type: TT, message: string) {
    if (this.check(type)) {
      this.incr();
      return;
    }
    FcalError.throwWithEnd(this.peek().start, this.peek().end, message);
  }
  private check(type: TT): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }
  private isAtEnd(): boolean {
    const token = this.nextToken();
    return token.type === TT.EOL;
  }
  private nextToken(): Token {
    if (this.ntoken < this.tokens.length) {
      return this.tokens[this.ntoken];
    }
    return this.getToken();
  }
  private getToken(): Token {
    const token = this.lexer.Next();
    if (token.type !== TT.EOL) {
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
