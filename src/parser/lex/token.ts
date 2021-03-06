enum TT {
  PLUS = '+',
  MINUS = '-',
  TIMES = '*',
  MOD = 'mod',
  SLASH = '/',
  Number = 'number',
  OPEN_PAREN = '(',
  CLOSE_PAREN = ')',
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
  CC = 'cc',
  PLUS_EQUAL = '+=',
  MINUS_EQUAL = '-=',
  DIVIDE_EQUAL = '/=',
  FLOOR_DIVIDE_EQUAL = '//=',
  MULTIPLY_EQUAL = '*=',
  POWER_EQUAL = '^=',
  SCALE = 'scale',
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
    this.literal = literal;
  }
}

export { TT, Token };
