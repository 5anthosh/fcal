import { FcalError } from '../FcalError';
import { Type } from '../types/datatype';
import { Environment } from './environment';

export interface ICallable {
  call(environment: Environment, argument: Type[]): Type;
}

type FcalFunctionFmt = (environment: Environment, argument: Type[]) => Type;

/**
 * FcalFunction represents function in fcal
 */
export class FcalFunction implements ICallable {
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
  // evaluate function
  public call(environment: Environment, argument: Type[]): Type {
    const value = this.function(environment, argument);
    if (value === null) {
      // if function does not return no value then
      // Assign basic 0 number
      return Type.BNumber.New('0');
    }
    return value;
  }
}
/**
 * List of fcal functions
 */

// tslint:disable-next-line:no-namespace
export namespace FcalFunction {
  export class List {
    public functions: { [index: string]: FcalFunction };
    constructor() {
      this.functions = {};
    }
    /**
     * Add new fcal function
     * @param fcalFunction
     * @throws Error if function name is already exists
     */
    public push(fcalFunction: FcalFunction) {
      if (this.check(fcalFunction.name)) {
        FcalError.throwWithoutCtx(`${fcalFunction.name} is already registered`);
      }
      this.functions[fcalFunction.name] = fcalFunction;
    }
    /**
     * Call a function by its name
     * @param functionName
     * @param enviroment
     * @param argument
     * @param Type
     */
    public call(functionName: string, enviroment: Environment, argument: Type[]): Type {
      const fcalFunc = this.get(functionName);
      if (fcalFunc !== undefined) {
        return fcalFunc.function(enviroment, argument);
      }
      throw FcalError.ErrorWithoutCtx(`Function ${functionName} is not found`);
    }
    /**
     * Get function implemention by its function name
     * @param name function name
     */
    public get(name: string): FcalFunction | undefined {
      return this.functions[name];
    }
    /**
     * check if function is available
     * @param name function name
     */
    private check(name: string): boolean {
      return this.functions.hasOwnProperty(name);
    }
  }
}
