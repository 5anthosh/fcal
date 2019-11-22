import { Token } from '../lex/token';
import { Expr } from '../parser/expr';
import { NumberSystem } from '../types/numberSystem';
import { UnitMeta } from '../types/units';

enum JSONTYPES {
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

interface IJSON {
  type: JSONTYPES;
  right?: IJSON;
  left?: IJSON;
  operator?: Token;
  value?: IJSON | string;
  phrase?: string;
  unit?: string;
  ns?: string;
  converter?: string;
  variable?: string;
  name?: string;
  main?: IJSON;
  texpr?: IJSON;
  fexpr?: IJSON;
  start?: number;
  end?: number;
  args?: IJSON[];
}

class ToJSON implements Expr.IVisitor<IJSON> {
  private ast: Expr;

  constructor(ast: Expr) {
    this.ast = ast;
  }

  public toJSON(): string {
    const astObj = this.evaluate(this.ast);
    return JSON.stringify(astObj);
  }

  public toObj(): object {
    return this.evaluate(this.ast);
  }

  public visitBinaryExpr(expr: Expr.Binary): IJSON {
    const right = this.evaluate(expr.right);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSONTYPES.BINARY, right, left, operator };
  }

  public visitGroupingExpr(expr: Expr.Grouping): IJSON {
    return { type: JSONTYPES.GROUP, value: this.evaluate(expr.expression) };
  }

  public visitLiteralExpr(expr: Expr.Literal): IJSON {
    return { type: JSONTYPES.LITERAL, value: expr.value.print() };
  }

  public visitUnaryExpr(expr: Expr.Unary): IJSON {
    return { type: JSONTYPES.UNARY, operator: expr.operator, value: this.evaluate(expr.right) };
  }

  public visitPercentageExpr(expr: Expr.Percentage): IJSON {
    return { type: JSONTYPES.PERCENTAGE, value: this.evaluate(expr.expression) };
  }

  public visitUnitExpr(expr: Expr.UnitExpr): IJSON {
    return { type: JSONTYPES.UNIT, phrase: expr.phrase, value: this.evaluate(expr.expression) };
  }

  public visitUnitConvertionExpr(expr: Expr.ConvertionExpr): IJSON {
    const value = this.evaluate(expr.expression);
    if (expr.to instanceof UnitMeta) {
      return { type: JSONTYPES.CONVERSION, unit: expr.name, value };
    }
    if (expr.to instanceof NumberSystem) {
      return { type: JSONTYPES.CONVERSION, ns: expr.name, value };
    }
    return { type: JSONTYPES.CONVERSION, converter: expr.name, value };
  }

  public visitAssignExpr(expr: Expr.Assign): IJSON {
    return { type: JSONTYPES.ASSIGN, variable: expr.name, value: this.evaluate(expr.value) };
  }

  public visitVariableExpr(expr: Expr.Variable): IJSON {
    return { type: JSONTYPES.VARIABLE, name: expr.name };
  }

  public visitCallExpr(expr: Expr.Call): IJSON {
    const args = Array<IJSON>();
    for (const arg of expr.argument) {
      args.push(this.evaluate(arg));
    }
    return { type: JSONTYPES.CALL, name: expr.name, args };
  }

  public visitLogicalExpr(expr: Expr.Logical): IJSON {
    const right = this.evaluate(expr.left);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSONTYPES.LOGICAL, right, left, operator };
  }

  public visitTernaryExpr(expr: Expr.Ternary): IJSON {
    const texpr = this.evaluate(expr.texpr);
    const fexpr = this.evaluate(expr.fexpr);
    const main = this.evaluate(expr.main);
    return { type: JSONTYPES.TERNARY, main, texpr, fexpr };
  }

  private evaluate(expr: Expr): IJSON {
    const ast = expr.accept(this);
    return { start: expr.start, end: expr.end, ...ast };
  }
}

export { ToJSON, JSONTYPES, IJSON };
