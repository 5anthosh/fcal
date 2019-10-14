import { Type } from '../types/datatype';

export class Environment {
  public values: { [index: string]: Type };
  constructor() {
    this.values = {};
  }
  public get(key: string): Type {
    if (this.values.hasOwnProperty(key)) {
      return this.values[key];
    }
    throw new Error(`Undefined variable ${key}`);
  }
  public set(key: string, value: Type | number) {
    if (value instanceof Type) {
      this.values[key] = value;
      return;
    }
    this.values[key] = Type.BNumber.New(value);
  }
}
