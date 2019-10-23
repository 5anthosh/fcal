import Big = require('decimal.js');
import { FcalError } from '../FcalError';
import { Type } from '../types/datatype';
import { FcalFunction } from './function';

/**
 * Represents runtime variable environment
 * It represents state of fcal
 */
export class Environment {
  // simple object is used for variables
  // with key as variable name and value as value
  public functions: FcalFunction.List;
  public values: { [index: string]: Type };
  constructor(functions: FcalFunction.List) {
    this.values = {};
    this.functions = functions;
  }
  /**
   * Get the value of variable
   * @param {String} key variable name
   * @throws {FcalError} Error if variable is not available
   */
  public get(key: string): Type {
    if (this.values.hasOwnProperty(key)) {
      return this.values[key];
    }
    throw FcalError.ErrorWithoutCtx(`Undefined variable ${key}`);
  }
  /**
   * create or assign a variable with value
   * @param {} key variable name
   * @param value value
   */
  public set(key: string, value: Type | Big.Decimal | number | string) {
    if (value instanceof Type) {
      this.values[key] = value;
      return;
    }
    this.values[key] = Type.BNumber.New(value);
  }
}
