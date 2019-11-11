enum TT {
  PLUS = '+',
  MINUS = '-',
  TIMES = '*',
  MOD = 'mod',
  SLASH = '/',
  Number = 'number',
  OPEN_PARAN = '(',
  CLOSE_PARAN = ')',
  NEWLINE = '\n',
  EOL = 'EOL',
  IN = 'in',
  NAME = 'name',
  EQUAL = '=',
  COMMA = ',',
  PERCENTAGE = '%',
  OF = 'of',
  UNIT = 'unit',
  CAP = '^',
  NS = 'ns',
  DOUBLE_COLON = ':',
}

class Token {
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
    return `< ${this.type} ${this.lexeme} ${literal} (${this.start}, ${this.end})>`;
  }
}

export { TT, Token };
