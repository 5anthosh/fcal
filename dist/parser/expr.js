"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Expr {
}
exports.Expr = Expr;
// tslint:disable-next-line: no-namespace
(function (Expr) {
    class Binary extends Expr {
        constructor(left, operator, right) {
            super();
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitBinaryExpr(this);
        }
    }
    Expr.Binary = Binary;
    class Grouping extends Expr {
        constructor(expression) {
            super();
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitGroupingExpr(this);
        }
    }
    Expr.Grouping = Grouping;
    class Literal extends Expr {
        constructor(value) {
            super();
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitLiteralExpr(this);
        }
    }
    Expr.Literal = Literal;
    class Unary extends Expr {
        constructor(operator, right) {
            super();
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitUnaryExpr(this);
        }
    }
    Expr.Unary = Unary;
})(Expr = exports.Expr || (exports.Expr = {}));
//# sourceMappingURL=expr.js.map