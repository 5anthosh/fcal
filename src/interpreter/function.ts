import { Type } from '../types/datatype';
import { Environment } from './environment';

export interface ICallable {
  call(environment: Environment, ...argument: Type[]): Type;
}

/**
 * FcalFunction represents function in fcal
 */
export class FcalFunction implements ICallable {
  // no of arguments
  public arbity: number;
  // name of the function
  public name: string;
  // function implemention
  public function: (environment: Environment, ...argument: Type[]) => Type;
  constructor(name: string, arbity: number) {
    this.arbity = arbity;
    this.name = name;
  }
  // evaluate function
  public call(environment: Environment, ...argument: Type[]): Type {
    const value = this.function(environment, ...argument);
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
export class FcalFunctions {
  public functions: FcalFunction[];
  constructor() {
    this.functions = Array<FcalFunction>();
  }
  /**
   * Add new fcal function
   * @param fcalFunction
   * @throws Error if function name is already exists
   */
  public add(fcalFunction: FcalFunction) {
    if (this.check(fcalFunction.name)) {
      throw new Error(`${fcalFunction.name} is already registered`);
    }
    this.functions.push(fcalFunction);
  }
  /**
   * Get function implemention by its function name
   * @param name function name
   */
  public get(name: string): [FcalFunction | null, boolean] {
    for (const func of this.functions) {
      if (func.name === name) {
        return [func, true];
      }
    }
    return [null, false];
  }
  /**
   * check if function is available
   * @param name function name
   */
  private check(name: string): boolean {
    for (const funcs of this.functions) {
      if (funcs.name === name) {
        return true;
      }
    }
    return false;
  }
}
