import { Phrases } from './types/phrase';
export declare class Fcal {
    static getdefaultphrases(): Phrases;
    private interpreter;
    private phrases;
    private ttypes;
    constructor(source: string);
    evaluate(): any;
}
