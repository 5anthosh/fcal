import { Type } from '../types/datatype';

export class Environment {
  private values: object;
  constructor() {
    this.values = {};
  }
  public get(key: string): Type {
    if (this.values.hasOwnProperty(key)) {
      return this.values[key];
    }
    throw new Error(`Undefined variable ${key}`);
  }
  public set(key: string, value: Type) {
    this.values[key] = value;
  }
}
