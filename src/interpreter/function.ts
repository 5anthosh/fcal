import { Type } from '../types/datatype';
import { Environment } from './environment';

export interface ICallable {
  call(environment: Environment, ...argument: Type[]): Type;
}

export class FcalFunction implements ICallable {
  public arbity: number;
  public name: string;
  public function: (environment: Environment, ...argument: Type[]) => Type;
  constructor(name: string, arbity: number) {
    this.arbity = arbity;
    this.name = name;
  }
  public call(environment: Environment, ...argument: Type[]): Type {
    const value = this.function(environment, ...argument);
    if (value === null) {
      return Type.BNumber.New('0');
    }
    return value;
  }
}

export class FcalFunctions {
  public functions: FcalFunction[];
  constructor() {
    this.functions = Array<FcalFunction>();
  }
  public add(fcalFunction: FcalFunction) {
    if (this.check(fcalFunction.name)) {
      throw new Error(`${fcalFunction.name} is already registered`);
    }
    this.functions.push(fcalFunction);
  }
  public get(name: string): [FcalFunction, boolean] {
    for (const func of this.functions) {
      if (func.name === name) {
        return [func, true];
      }
    }
    return [null, false];
  }
  private check(name: string): boolean {
    for (const funcs of this.functions) {
      if (funcs.name === name) {
        return true;
      }
    }
    return false;
  }
}
