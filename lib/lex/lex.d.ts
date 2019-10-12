import { Phrases } from '../types/phrase';
import { TType } from '../types/units';
import { Token } from './token';
export declare class Lexer {
    static notAlpha: string[];
    private static isDigit;
    private static isAlpha;
    private static isSpace;
    ttypes: TType.TTypes;
    private tokens;
    private source;
    private start;
    private current;
    private phrases;
    constructor(source: string, phrases: Phrases, ttypes: TType.TTypes);
    Next(): Token;
    private scan;
    private isAtEnd;
    private advance;
    private peek;
    private string;
    private number;
    private createToken;
    private createTokenWithLiteral;
    private lexeme;
    private space;
}
