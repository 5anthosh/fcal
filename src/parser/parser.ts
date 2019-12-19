import { FcalError } from '../fcal';
import { Converter } from '../interpreter/converter';
import { Scale } from '../interpreter/scale';
import { SymbolTable } from '../interpreter/symboltable';
import { Lexer } from '../lex/lex';
import { Token, TT } from '../lex/token';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';
import { Phrases } from '../types/phrase';
import { Unit } from '../types/units';
import { Expr } from './expr';

class Parser {
  public source: string;
  private lexer: Lexer;
  private n: number;
  private tokens: Token[];
  private symbolTable: SymbolTable;
  private c: Converter;
  private scale: Scale;

  constructor(
    source: string,
    phrases: Phrases,
    units: Unit.List,
    cc: Converter,
    scale: Scale,
    symbolTable: SymbolTable,
  ) {
    this.source = source;
    this.lexer = new Lexer(this.source, phrases, units, cc, scale);
    this.n = 0;
    this.tokens = [];
    this.c = cc;
    this.scale = scale;
    this.symbolTable = symbolTable;
  }

  public parse(): Expr {
    try {
      const expr = this.Stmt();
      return expr;
    } catch (E) {
      if (E instanceof FcalError) {
        E.source = this.source;
      }
      throw E;
    }
  }

  private Stmt(): Expr {
    const expr = this.assignment();
    if (this.match([TT.NEWLINE])) {
      return expr;
    }
    if (this.peek().type === TT.EOL) {
      throw new FcalError('Expecting EOL', this.peek().end);
    }
    throw new FcalError(`Unexpected token ${this.peek().lexeme}`, this.peek().start, this.peek().end);
  }

  private expression(): Expr {
    return this.assignment();
  }

  private assignment(): Expr {
    const expr = this.ternary();
    if (this.match([TT.EQUAL, TT.DOUBLE_COLON])) {
      const leftExpr = this.assignment();
      if (expr instanceof Expr.Variable) {
        const name = (expr as Expr.Variable).name;
        return new Expr.Assign(name, leftExpr, expr.start, leftExpr.end);
      }
      throw new FcalError('Expecting variable in left side of assignment', expr.start, expr.end);
    }
    if (
      this.match([
        TT.PLUS_EQUAL,
        TT.MINUS_EQUAL,
        TT.MULTIPLY_EQUAL,
        TT.DIVIDE_EQUAL,
        TT.FLOOR_DIVIDE_EQUAL,
        TT.POWER_EQUAL,
      ])
    ) {
      const operator = this.previous();
      const leftExpr = this.assignment();
      if (expr instanceof Expr.Variable) {
        let tt: TT;
        switch (operator.type) {
          case TT.PLUS_EQUAL:
            tt = TT.PLUS;
            break;
          case TT.MINUS_EQUAL:
            tt = TT.MINUS;
            break;
          case TT.MULTIPLY_EQUAL:
            tt = TT.TIMES;
            break;
          case TT.DIVIDE_EQUAL:
            tt = TT.SLASH;
            break;
          case TT.FLOOR_DIVIDE_EQUAL:
            tt = TT.FLOOR_DIVIDE;
            break;
          default:
            tt = TT.CAP;
            break;
        }
        return new Expr.Assign(
          (expr as Expr.Variable).name,
          new Expr.Binary(
            expr,
            new Token(tt, operator.lexeme, operator.literal, operator.start, operator.start),
            leftExpr,
            expr.start,
            leftExpr.end,
          ),
        );
      }
      throw new FcalError('Expecting variable in left side of assignment', expr.start, expr.end);
    }
    return expr;
  }

  private ternary(): Expr {
    let expr = this.logical();
    if (this.match([TT.Q])) {
      const trueExpr = this.ternary();
      this.consume(
        TT.DOUBLE_COLON,
        `Expecting ':' in ternary operation but found ${this.peek().type === '\n' ? 'EOL' : this.peek().type}`,
      );
      const falseExpr = this.ternary();
      expr = new Expr.Ternary(expr, trueExpr, falseExpr, expr.start, falseExpr.end);
    }
    return expr;
  }

  private logical(): Expr {
    let expr = this.equality();
    while (this.match([TT.OR, TT.AND])) {
      const operator = this.previous();
      const right = this.equality();
      expr = new Expr.Logical(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private equality(): Expr {
    let expr = this.comparison();
    while (this.match([TT.EQUAL_EQUAL, TT.EQUAL_EQUAL_EQUAL, TT.NOT_EQUAL, TT.NOT_EQUAL_EQUAL])) {
      const operator = this.previous();
      const right = this.comparison();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private comparison(): Expr {
    let expr = this.addition();
    while (
      this.match([TT.GREATER, TT.GREATER_EQUAL, TT.GREATER_EQUAL_EQUAL, TT.LESS, TT.LESS_EQUAL, TT.LESS_EQUAL_EQUAL])
    ) {
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
    let expr = this.unitConvert();
    while (this.match([TT.TIMES, TT.SLASH, TT.MOD, TT.OF, TT.FLOOR_DIVIDE])) {
      const operator = this.previous();
      const right = this.unitConvert();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
    }
    return expr;
  }

  private unitConvert(): Expr {
    const expr = this.unary();
    if (this.match([TT.IN])) {
      if (this.match([TT.UNIT])) {
        const unit = this.previous();
        const unit2 = this.lexer.units.get(unit.lexeme);
        if (unit2) {
          return new Expr.ConversionExpr(expr, unit2, unit.lexeme, expr.start, unit.end);
        }
      }
      if (this.match([TT.NS])) {
        const token = this.previous();
        const ns = NumberSystem.get(token.lexeme);
        if (ns) {
          return new Expr.ConversionExpr(expr, ns, token.lexeme, expr.start, token.end);
        }
      }
      if (this.match([TT.CC])) {
        const token = this.previous();
        const c = this.c.get(token.lexeme);
        if (c) {
          return new Expr.ConversionExpr(expr, c, token.lexeme, expr.start, token.end);
        }
      }
      throw new FcalError('Expecting unit after in');
    }
    return expr;
  }

  private unary(): Expr {
    if (this.match([TT.PLUS, TT.MINUS, TT.NOT])) {
      const operator = this.previous();
      const right = this.unary();
      return new Expr.Unary(operator, right, operator.start, right.end);
    }
    return this.exponent();
  }

  private exponent(): Expr {
    let expr = this.suffix();
    while (this.match([TT.CAP])) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Expr.Binary(expr, operator, right, expr.start, right.end);
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
        return new Expr.UnitExpr(expr, unit.lexeme, unit2, expr.start, unit.end);
      }
    }
    return expr;
  }

  private call(): Expr {
    const expr = this.term();
    if (this.match([TT.OPEN_PAREN])) {
      if (expr instanceof Expr.Variable) {
        const argument = Array<Expr>();
        if (this.peek().type !== TT.CLOSE_PAREN) {
          do {
            argument.push(this.expression());
          } while (this.match([TT.COMMA]));
        }
        this.consume(TT.CLOSE_PAREN, "Expect ')' after the arguments");
        return new Expr.Call(expr.name, argument, expr.start, this.previous().end);
      }
      throw new FcalError(`Not callable`, expr.start, this.previous().end);
    }
    return expr;
  }

  private term(): Expr {
    if (this.match([TT.Number])) {
      const numToken = this.previous();
      const num = numToken.literal as Type.BNumber;
      if (this.match([TT.SCALE])) {
        const s = this.previous().literal;
        const scaleC = this.scale.get(s) as Type.Numeric;
        if (s) {
          num.n = num.n.mul(scaleC.n);
          return new Expr.Literal(num, numToken.start, this.previous().end);
        }
      }
      return new Expr.Literal(num, numToken.start, numToken.end);
    }
    if (this.match([TT.OPEN_PAREN])) {
      const start = this.previous();
      const expr = this.expression();
      this.consume(TT.CLOSE_PAREN, `Expect ')' after expression but found ${this.peek().lexeme}`);
      return new Expr.Grouping(expr, start.start, this.previous().end);
    }
    if (this.match([TT.NAME])) {
      return new Expr.Variable(this.previous().lexeme, this.previous().start, this.previous().end);
    }
    const lexeme = this.peek().lexeme;
    const entity = this.symbolTable.get(lexeme);
    if (entity) {
      throw new FcalError(
        `Expect expression but found ${lexeme} [${entity.toLowerCase()}]`,
        this.peek().start,
        this.peek().end,
      );
    }
    throw new FcalError(
      `Expect expression but found ${lexeme === '\n' ? 'EOL' : lexeme}`,
      this.peek().start,
      this.peek().end,
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
    throw new FcalError(message, this.peek().start, this.peek().end);
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
    if (this.n < this.tokens.length) {
      return this.tokens[this.n];
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
    return this.tokens[this.n - 1];
  }
  private peek(): Token {
    return this.nextToken();
  }
  private incr(): void {
    this.n++;
  }
}

export { Parser };
