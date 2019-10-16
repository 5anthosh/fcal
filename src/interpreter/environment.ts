import { FcalError } from '../FcalError';
import { Type } from '../types/datatype';

/**
 * Represents runtime variable environment
 * It represents state of fcal
 */
export class Environment {
  // simple object is used for variables
  // with key as variable name and value as value
  public values: { [index: string]: Type };
  constructor() {
    this.values = {};
  }
  /**
   * Get the value of variable
   * @param key variable name
   * @throws Error if variable is not available
   */
  public get(key: string): Type {
    if (this.values.hasOwnProperty(key)) {
      return this.values[key];
    }
    throw FcalError.ErrorWithoutCtx(`Undefined variable ${key}`);
  }
  /**
   * create or assign a variable with value
   * @param key variable name
   * @param value value
   */
  public set(key: string, value: Type | number) {
    if (value instanceof Type) {
      this.values[key] = value;
      return;
    }
    this.values[key] = Type.BNumber.New(value);
  }
}
