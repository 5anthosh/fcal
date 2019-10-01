export enum TokenType {
  PLUS,
  MINUS,
  STAR,
  MOD,
  SLASH,
  Number,
  EOL
}

function PrintTT(enumNumber: number): String {
  return TokenType[enumNumber];
}

export class Char {
  static PLUS = "+";
  static MINUS = "-";
  static STAR = "*";
  static MOD = "mod";
  static SLASH = "/";
}
export class Token {
  type: TokenType;
  lexeme: String;
  Literal: any;
  start: number;
  end: number;

  constructor(
    type: TokenType,
    lexeme: String,
    literal: any,
    start: number,
    end: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.start = start;
    this.end = end;
    this.Literal = literal;
  }
  toString(): String {
    return `< ${PrintTT(this.type)} ${this.lexeme} ${this.Literal} (${
      this.start
    }, ${this.end})>`;
  }
  static EOLToken(end: number): Token {
    return new Token(TokenType.EOL, "", null, end, end);
  }
}

// export default { TokenType, Token };
