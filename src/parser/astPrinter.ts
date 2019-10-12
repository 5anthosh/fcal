import colors from 'colors';
import { Expr } from './expr';
export class ASTPrinter implements Expr.IVisitor<string> {
  private static tab: number = 2;
  private static prefixchar = '+';
  private static createPrefix(depth: number, type: string): string {
    return `${this.prefixchar}${'-'.repeat(depth * this.tab)} (${depth / this.tab})${colors.blue(type)}`;
  }
  private depth: number;
  constructor() {
    this.depth = 0;
  }
  public visitAssignExpr(expr: Expr.Assign): string {
    this.depth += ASTPrinter.tab;
    const value = this.evaluate(expr.value);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'ASSIGN')} \n|\n${value}`;
  }
  public visitVariableExpr(expr: Expr.Variable): string {
    return `${ASTPrinter.createPrefix(this.depth, 'VARIABLE')} ${expr.name}\n|\n`;
  }
  public visitUnitExpr(expr: Expr.UnitExpr): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'UNIT')} ${expr.unit.unitType} \n|\n${expression}`;
  }

  public visitUnitConvertionExpr(expr: Expr.UnitConvertionExpr): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'UNIT CONVERT')} ${expr.unit.unitType} \n|\n${expression}`;
  }

  public visitBinaryExpr(expr: Expr.Binary): string {
    this.depth += ASTPrinter.tab;
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'BINARY')}  ${expr.operator} \n|\n${left}${right}`;
  }
  public visitGroupingExpr(expr: Expr.Grouping): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'Grouping')} \n|\n${expression}`;
  }
  public visitLiteralExpr(expr: Expr.Literal): string {
    return `${ASTPrinter.createPrefix(this.depth, 'LITERAL')} ${expr.value.format()}\n|\n`;
  }
  public visitUnaryExpr(expr: Expr.Unary): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'UNARY')} ${expr.operator} \n|\n${expression}`;
  }
  public visitPercentageExpr(expr: Expr.Percentage): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'PERCENTAGE')} \n|\n${expression}`;
  }
  public print(expr: Expr): string {
    return this.evaluate(expr);
  }
  private evaluate(expr: Expr): string {
    const ast = expr.accept(this);
    return ast;
  }
}
