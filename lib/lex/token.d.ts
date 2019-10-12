export declare enum TokenType {
    PLUS = 0,
    MINUS = 1,
    TIMES = 2,
    MOD = 3,
    SLASH = 4,
    Number = 5,
    OPEN_PARAN = 6,
    CLOSE_PARAN = 7,
    NEWLINE = 8,
    EOL = 9,
    IN = 10,
    PERCENTAGE = 11,
    OF = 12,
    UNIT = 13,
    CAP = 14
}
export declare function PrintTT(enumNumber: number): string;
export declare class Token {
    static EOLToken(end: number): Token;
    type: TokenType;
    lexeme: string;
    Literal: any;
    start: number;
    end: number;
    constructor(type: TokenType, lexeme: string, literal: any, start: number, end: number);
    toString(): string;
}
