export enum TT {
  PLUS,
  MINUS,
  TIMES,
  MOD,
  SLASH,
  Number,
  OPEN_PARAN,
  CLOSE_PARAN,
  NEWLINE,
  EOL,
  IN,
  NAME,
  EQUAL,
  COMMA,
  PERCENTAGE,
  OF,
  UNIT,
  CAP,
  NS,
}

export function PrintTT(enumNumber: number): string {
  return TT[enumNumber];
}

export class Token {
  public static EOL(end: number): Token {
    return new Token(TT.EOL, '', null, end, end);
  }
  public type: TT;
  public lexeme: string;
  public Literal: any;
  public start: number;
  public end: number;

  constructor(type: TT, lexeme: string, literal: any, start: number, end: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.start = start;
    this.end = end;
    this.Literal = literal;
  }
  public toString(): string {
    let literal = '';
    if (this.Literal !== null) {
      literal = this.Literal.format();
    }
    return `< ${PrintTT(this.type)} ${this.lexeme} ${literal} (${this.start}, ${this.end})>`;
  }
}

// export default { TokenType, Token };
