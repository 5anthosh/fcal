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
  FLOOR_DIVIDE = '//',
  LESS_EQUAL = '<=',
  GREATER_EQUAL = '>=',
  LESS_EQUAL_EQUAL = '<==',
  GREATER_EQUAL_EQUAL = '>==',
  LESS = '<',
  GREATER = '>',
  EQUAL_EQUAL = '==',
  EQUAL_EQUAL_EQUAL = '===',
  NOT_EQUAL = '!=',
  NOT_EQUAL_EQUAL = '!==',
  NOT = '!',
  AND = '&&',
  OR = '||',
  Q = '?',
}

class Token {
  public static EOL(end: number): Token {
    return new Token(TT.EOL, 'EOL', null, end, end);
  }

  public type: TT;
  public lexeme: string;
  public literal: any;
  public start: number;
  public end: number;

  constructor(type: TT, lexeme: string, literal: any, start: number, end: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.start = start;
    this.end = end;
    if (literal === null) {
      this.literal = '';
      return;
    }
    this.literal = literal;
  }

  public toString(): string {
    return `< ${this.type} ${this.lexeme} ${this.literal} (${this.start}, ${this.end})>`;
  }
}

export { TT, Token };
