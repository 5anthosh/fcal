export class LexerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LexerParingrror';
  }
}
