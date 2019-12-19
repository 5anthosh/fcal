import { Token } from '../lex/token';
import { Expr } from '../parser/expr';
import { NumberSystem } from '../types/numberSystem';
import { UnitMeta } from '../types/units';

enum JSON_TYPES {
  BINARY = 'binary',
  GROUP = 'group',
  LITERAL = 'literal',
  UNARY = 'unary',
  PERCENTAGE = 'percentage',
  UNIT = 'unit',
  CONVERSION = 'conversion',
  ASSIGN = 'assign',
  VARIABLE = 'variable',
  CALL = 'call',
  LOGICAL = 'logical',
  TERNARY = 'ternary',
}

// tslint:disable-next-line: interface-name
interface InterfaceJSON {
  type: JSON_TYPES;
  right?: InterfaceJSON;
  left?: InterfaceJSON;
  operator?: Token;
  value?: InterfaceJSON | string;
  phrase?: string;
  unit?: string;
  ns?: string;
  converter?: string;
  variable?: string;
  name?: string;
  main?: InterfaceJSON;
  trueExpr?: InterfaceJSON;
  falseExpr?: InterfaceJSON;
  start?: number;
  end?: number;
  args?: InterfaceJSON[];
}

class ToJSON implements Expr.IVisitor<InterfaceJSON> {
  private ast: Expr;

  constructor(ast: Expr) {
    this.ast = ast;
  }

  public toJSON(): string {
    const astObj = this.toObj();
    return JSON.stringify(astObj);
  }

  public toObj(): object {
    return this.evaluate(this.ast);
  }

  public visitBinaryExpr(expr: Expr.Binary): InterfaceJSON {
    const right = this.evaluate(expr.right);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSON_TYPES.BINARY, right, left, operator };
  }

  public visitGroupingExpr(expr: Expr.Grouping): InterfaceJSON {
    return { type: JSON_TYPES.GROUP, value: this.evaluate(expr.expression) };
  }

  public visitLiteralExpr(expr: Expr.Literal): InterfaceJSON {
    return { type: JSON_TYPES.LITERAL, value: expr.value.print() };
  }

  public visitUnaryExpr(expr: Expr.Unary): InterfaceJSON {
    return { type: JSON_TYPES.UNARY, operator: expr.operator, value: this.evaluate(expr.right) };
  }

  public visitPercentageExpr(expr: Expr.Percentage): InterfaceJSON {
    return { type: JSON_TYPES.PERCENTAGE, value: this.evaluate(expr.expression) };
  }

  public visitUnitExpr(expr: Expr.UnitExpr): InterfaceJSON {
    return { type: JSON_TYPES.UNIT, phrase: expr.phrase, value: this.evaluate(expr.expression) };
  }

  public visitConversionExpr(expr: Expr.ConversionExpr): InterfaceJSON {
    const value = this.evaluate(expr.expression);
    if (expr.to instanceof UnitMeta) {
      return { type: JSON_TYPES.CONVERSION, unit: expr.name, value };
    }
    if (expr.to instanceof NumberSystem) {
      return { type: JSON_TYPES.CONVERSION, ns: expr.name, value };
    }
    return { type: JSON_TYPES.CONVERSION, converter: expr.name, value };
  }

  public visitAssignExpr(expr: Expr.Assign): InterfaceJSON {
    return { type: JSON_TYPES.ASSIGN, variable: expr.name, value: this.evaluate(expr.value) };
  }

  public visitVariableExpr(expr: Expr.Variable): InterfaceJSON {
    return { type: JSON_TYPES.VARIABLE, name: expr.name };
  }

  public visitCallExpr(expr: Expr.Call): InterfaceJSON {
    const args = Array<InterfaceJSON>();
    for (const arg of expr.argument) {
      args.push(this.evaluate(arg));
    }
    return { type: JSON_TYPES.CALL, name: expr.name, args };
  }

  public visitLogicalExpr(expr: Expr.Logical): InterfaceJSON {
    const right = this.evaluate(expr.left);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSON_TYPES.LOGICAL, right, left, operator };
  }

  public visitTernaryExpr(expr: Expr.Ternary): InterfaceJSON {
    const trueExpr = this.evaluate(expr.trueExpr);
    const falseExpr = this.evaluate(expr.falseExpr);
    const main = this.evaluate(expr.main);
    return { type: JSON_TYPES.TERNARY, main, trueExpr, falseExpr };
  }

  private evaluate(expr: Expr): InterfaceJSON {
    const ast = expr.accept(this);
    return { start: expr.start, end: expr.end, ...ast };
  }
}

export { ToJSON, JSON_TYPES, InterfaceJSON };
