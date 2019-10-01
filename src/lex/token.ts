export enum TokenType {
  PLUS,
  MINUS,
  TIMES,
  MOD,
  SLASH,
  Number,
  OPEN_PARAN,
  CLOSE_PARAN,
  EOL,
}

function PrintTT(enumNumber: number): string {
  return TokenType[enumNumber];
}

export class Token {
  public static EOLToken(end: number): Token {
    return new Token(TokenType.EOL, '', null, end, end);
  }
  public type: TokenType;
  public lexeme: string;
  public Literal: any;
  public start: number;
  public end: number;

  constructor(type: TokenType, lexeme: string, literal: any, start: number, end: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.start = start;
    this.end = end;
    this.Literal = literal;
  }
  public toString(): string {
    return `< ${PrintTT(this.type)} ${this.lexeme} ${this.Literal} (${this.start}, ${this.end})>`;
  }
}

// export default { TokenType, Token };
