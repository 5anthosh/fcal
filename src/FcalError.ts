export class FcalError extends Error {
  public static throw(start: number, message: string) {
    throw FcalError.Error(start, message);
  }
  public static throwWithEnd(start: number, end: number, message: string) {
    throw FcalError.ErrorWithEnd(start, end, message);
  }
  public static throwWithoutCtx(message: string) {
    FcalError.throw(-1, message);
  }

  public static Error(start: number, message: string): FcalError {
    return new FcalError(start, start, message);
  }
  public static ErrorWithEnd(start: number, end: number, message: string): FcalError {
    return new FcalError(start, end, message);
  }
  public static ErrorWithoutCtx(message: string): FcalError {
    return FcalError.Error(-1, message);
  }
  public start: number;
  public end: number;
  constructor(start: number, end: number, message: string) {
    super(message);
    this.start = start;
    this.end = end;
    this.message = message;
    if (start === -1) {
      this.name = 'FcalError';
    } else {
      this.name = `FcalError [${start}, ${end}]`;
    }
  }
}
