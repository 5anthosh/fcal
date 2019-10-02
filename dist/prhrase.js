"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Phrase {
    constructor(type, ...phrases) {
        this.type = type;
        this.phrases = phrases;
    }
}
exports.Phrase = Phrase;
class Phrases {
    constructor() {
        this.phrases = [];
    }
    add(...phrases) {
        this.phrases.push(...phrases);
    }
    getPhrases(key) {
        for (const phrase of this.phrases) {
            if (phrase.type === key) {
                return [phrase.phrases, true];
            }
        }
        return [[], false];
    }
    search(key) {
        key = key.toUpperCase();
        for (const phrase of this.phrases) {
            if (phrase.phrases.find(x => x === key)) {
                return [phrase.type, true];
            }
        }
        return [0, false];
    }
    addPhrases(type, ...phrases) {
        phrases = phrases.map(x => x.toUpperCase());
        for (const phrase of this.phrases) {
            if (phrase.type === type) {
                phrase.phrases.push(...phrases);
            }
        }
        this.add(new Phrase(type, ...phrases));
    }
}
exports.Phrases = Phrases;
//# sourceMappingURL=prhrase.js.map