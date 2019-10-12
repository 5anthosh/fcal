import { TokenType } from '../lex/token';
export declare class Phrase {
    type: TokenType;
    phrases: string[];
    constructor(type: TokenType, ...phrases: string[]);
    add(...phrases: string[]): void;
    check(...phrase: string[]): boolean;
}
export declare class Phrases {
    phrases: Phrase[];
    constructor();
    add(...phrases: Phrase[]): void;
    getPhrases(key: TokenType): [string[], boolean];
    search(key: string): [TokenType, boolean];
    addPhrases(type: TokenType, ...phrases: string[]): void;
    checkPhrase(...phrase: string[]): boolean;
}
