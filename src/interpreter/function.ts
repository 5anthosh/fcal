import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { Type } from '../types/datatype';
import { Environment } from './environment';

interface ICallable {
  call(environment: Environment, argument: Type[]): Type | number | Decimal;
}

export type FcalFunctionFmt = (environment: Environment, argument: Type[]) => Type | number | Decimal;

/**
 * FcalFunction represents function in fcal
 */
class FcalFunction implements ICallable {
  // no of arguments
  public arbity: number;
  // name of the function
  public name: string;
  // function implemention
  public function: FcalFunctionFmt;
  constructor(name: string, arbity: number, func: FcalFunctionFmt) {
    this.arbity = arbity;
    this.function = func;
    this.name = name;
  }
  /**
   * call the function
   * @param {Environment} environment state of fcal
   * @param {Array<Type>} argument arguments of the function
   * @returns {Type} function result
   * @throws {FcalError} Error if function return invalid return type
   */
  public call(environment: Environment, argument: Type[]): Type {
    const value = this.function(environment, argument);
    if (!value) {
      // if function does not return no value then
      // Assign basic 0 number
      return Type.BNumber.New(0);
    }
    if (typeof value === 'number' || value instanceof Decimal) {
      return Type.BNumber.New(value);
    }
    if (!(value instanceof Type)) {
      throw new FcalError(`${this.name} Function Invalid return type,  Expecting Fcal.Type but got ${typeof value}`);
    }
    return value;
  }
}
/**
 * List of fcal functions
 */

// tslint:disable-next-line:no-namespace
namespace FcalFunction {
  export class List {
    public functions: Map<string, FcalFunction>;
    constructor() {
      this.functions = new Map<string, FcalFunction>();
    }
    /**
     * Add new fcal function
     * @param {FcalFunction} fcalFunction
     * @throws {FcalError} Error if function name is already exists
     */
    public push(ff: FcalFunction): void {
      if (this.check(ff.name)) {
        throw new FcalError(`${ff.name} is already registered`);
      }
      if (ff.arbity < -1) {
        throw new FcalError(
          `Can not register ${ff.name}, invalid arbity should be greater than or equal to -1 but got ${ff.arbity}`,
        );
      }
      if (ff.arbity >= 255) {
        throw new FcalError(`Can not register ${ff.name}, function cannot have more than 254 arguments`);
      }
      if (ff.arbity % 1 !== 0) {
        throw new FcalError(`Can not register ${ff.name}, arbity should be Integer`);
      }
      this.functions.set(ff.name, ff);
    }
    /**
     * Call a function by its name
     * @param {string} name name of the function
     * @param {Environment} enviroment state of fcal
     * @param {Array<Type>} argument arguments for the function
     * @param {Type} Type resullt of the function
     * @throws {FcalError} Error if function is not found
     */
    public call(name: string, enviroment: Environment, argument: Type[]): Type | number | Decimal {
      const fcalFunc = this.get(name);
      if (fcalFunc) {
        return fcalFunc.function(enviroment, argument);
      }
      throw new FcalError(`Function ${name} is not found`);
    }
    /**
     * Get function implemention by its function name
     * @param {string} name function name
     * @returns {FcalFunction | undefined} function
     */
    public get(name: string): FcalFunction | undefined {
      return this.functions.get(name);
    }
    /**
     * check if function is available
     * @param {name} name function name
     * @returns {boolean} if function is available
     */
    private check(name: string): boolean {
      return this.functions.hasOwnProperty(name);
    }
  }
}

export { FcalFunction };
