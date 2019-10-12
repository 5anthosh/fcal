import Big = require('decimal.js');
export declare class Unit {
    id: string;
    ratio: Big.Decimal;
    unitType: string;
    constructor(id: string, ratio: Big.Decimal, unitType: string);
}
export declare class TType {
    phrases: string[];
    unit: Unit;
    constructor(id: string, ratio: Big.Decimal, unitType: string, ...phrases: string[]);
}
export declare namespace TType {
    /**
     * Represents various Term types
     */
    class TTypes {
        ttypes: TType[];
        constructor();
        Add(ttype: TType): void;
        check(...phrases: string[]): boolean;
        get(phrase: string): [Unit, boolean];
    }
}
