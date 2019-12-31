import { Decimal } from 'decimal.js';
import { FcalError } from '../fcal';
import { Type } from '../types/datatype';
import { Environment } from './environment';

interface ICallable {
  call(environment: Environment, argument: Type[]): Type | number | Decimal;
}

export type FcalFunctionFmt = (environment: Environment, argument: Type[]) => Type | number | Decimal;

/**
 * IUseFunction
 * Interface for UseFunction
 */
interface IUseFunction {
  name: string;
  arity: number;
  func: FcalFunctionFmt;
}

/**
 * FcalFunction represents function in fcal
 */
class FcalFunction implements ICallable {
  // no of arguments
  public readonly arity: number;
  // name of the function
  public readonly name: string;
  // function implementation
  public readonly function: FcalFunctionFmt;

  constructor(name: string, arity: number, func: FcalFunctionFmt) {
    this.arity = arity;
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
    public readonly functions: Map<string, FcalFunction>;

    constructor() {
      this.functions = new Map<string, FcalFunction>();
    }

    /**
     * Add new fcal function
     * @param {FcalFunction} fcalFunction
     * @throws {FcalError} Error if function name is already exists
     */
    public push(ff: FcalFunction): void {
      if (ff.arity < -1) {
        throw new FcalError(
          `Can not register ${ff.name}, arity should be greater than or equal to -1 but got ${ff.arity}`,
        );
      }
      if (ff.arity >= 255) {
        throw new FcalError(`Can not register ${ff.name}, function cannot have more than 254 arguments`);
      }
      if (ff.arity % 1 !== 0) {
        throw new FcalError(`Can not register ${ff.name}, arity should be Integer`);
      }
      this.functions.set(ff.name, ff);
    }

    /**
     * Call a function by its name
     * @param {string} name name of the function
     * @param {Environment} environment state of fcal
     * @param {Array<Type>} argument arguments for the function
     * @param {Type} Type result of the function
     * @throws {FcalError} Error if function is not found
     */
    public call(name: string, environment: Environment, argument: Type[]): Type | number | Decimal {
      const fcalFunc = this.get(name);
      if (fcalFunc) {
        return fcalFunc.function(environment, argument);
      }
      throw new FcalError(`Function ${name} is not found`);
    }

    /**
     * Get function implementation by its function name
     * @param {string} name function name
     * @returns {FcalFunction | undefined} function
     */
    public get(name: string): FcalFunction | undefined {
      return this.functions.get(name);
    }
  }
}

export { FcalFunction, IUseFunction };
