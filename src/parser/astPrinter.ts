import { Expr } from './expr';

export class ASTPrinter implements Expr.IVisitor<string> {
  private static tab: number = 3;
  private static prefixchar = '+';
  private static createPrefix(depth: number): string {
    return `${this.prefixchar}${'-'.repeat(depth)} (${depth / 2})`;
  }
  private depth: number;
  constructor() {
    this.depth = 0;
  }
  public visitBinaryExpr(expr: Expr.Binary): string {
    this.depth += ASTPrinter.tab;
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth)}EXPR BINARY  ${expr.operator} \n|\n${left}${right}`;
  }
  public visitGroupingExpr(expr: Expr.Grouping): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth)}EXPR Grouping \n|\n${expression}`;
  }
  public visitLiteralExpr(expr: Expr.Literal): string {
    return `${ASTPrinter.createPrefix(this.depth)}EXPR LITERAL ${expr.value.format()}\n|\n`;
  }
  public visitUnaryExpr(expr: Expr.Unary): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth)}EXPR UNARY ${expr.operator} \n|\n${expression}`;
  }
  public visitPercentageExpr(expr: Expr.Percentage): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth)}EXPR PERCENTAGE \n|\n${expression}`;
  }
  public print(expr: Expr): string {
    return this.evaluate(expr);
  }
  private evaluate(expr: Expr): string {
    const ast = expr.accept(this);
    return ast;
  }
}
