export class FcalError extends Error {
  public start?: number;
  public end?: number;
  constructor(message: string, start?: number, end?: number) {
    super(message);
    this.start = start;
    this.end = end;
    this.message = message;
    if (!start) {
      this.name = 'FcalError';
      return;
    }
    if (!end) {
      this.end = start;
    }
    this.name = `FcalError [${this.start}, ${this.end}]`;
  }
}
