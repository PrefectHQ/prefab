/**
 * Unified expression engine for templates ({{ }}) and conditions (visibleWhen).
 *
 * A recursive descent evaluator supporting arithmetic, comparisons, boolean
 * logic, ternaries, string concatenation, and pipe transforms. CSP-safe:
 * no eval() or new Function().
 *
 * Grammar (lowest to highest precedence):
 *
 *   expr       → pipe
 *   pipe       → ternary ( '|' ( IDENT ( ':' pipeArg )? | literal ) )*
 *   ternary    → or ( '?' expr ':' expr )?
 *   or         → and ( '||' and )*
 *   and        → not ( '&&' not )*
 *   not        → '!' not | comp
 *   comp       → add ( ( '==' | '!=' | '>' | '>=' | '<' | '<=' ) add )?
 *   add        → mul ( ( '+' | '-' ) mul )*
 *   mul        → unary ( ( '*' | '/' ) unary )*
 *   unary      → ( '-' | '+' ) unary | primary
 *   primary    → '(' expr ')' | NUMBER | STRING | 'true' | 'false' | 'null' | IDENT
 *   IDENT      → name ( '.' name )*
 *
 * Pipe is lowest precedence so `price * quantity | currency` means
 * `(price * quantity) | currency`.
 *
 * A bare literal after `|` is a default value shorthand:
 *   `name | 'Anonymous'` → use 'Anonymous' if name is null/undefined.
 */

// ── Pipe Registry ──────────────────────────────────────────────────────

type PipeFn = (value: unknown, arg?: string) => unknown;

const pipes: Record<string, PipeFn> = {
  percent(value, arg) {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    const decimals = arg ? parseInt(arg) : 0;
    return `${(num * 100).toFixed(decimals)}%`;
  },

  number(value, arg) {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    const decimals = arg ? parseInt(arg) : undefined;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  currency(value, arg) {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    const currency = arg ?? "USD";
    return num.toLocaleString("en-US", { style: "currency", currency });
  },

  date(value, arg) {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    const style = (arg ?? "medium") as "short" | "medium" | "long";
    if (style === "short") return d.toLocaleDateString("en-US");
    if (style === "long")
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  time(value) {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) {
      const t = new Date(`1970-01-01T${value}`);
      if (!isNaN(t.getTime()))
        return t.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      return String(value);
    }
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  },

  datetime(value) {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  },

  upper(value) {
    return String(value).toUpperCase();
  },

  lower(value) {
    return String(value).toLowerCase();
  },

  length(value) {
    if (Array.isArray(value)) return value.length;
    if (typeof value === "string") return value.length;
    return 0;
  },

  join(value, arg) {
    if (Array.isArray(value)) return value.join(arg ?? ", ");
    return String(value);
  },

  truncate(value, arg) {
    const s = String(value);
    const n = arg ? parseInt(arg) : 0;
    if (n > 0 && s.length > n) return s.slice(0, n) + "...";
    return s;
  },

  default(value, arg) {
    if (value == null) return arg ?? "";
    return value;
  },

  first(value) {
    if (Array.isArray(value)) return value[0];
    return value;
  },

  last(value) {
    if (Array.isArray(value)) return value[value.length - 1];
    return value;
  },

  abs(value) {
    const num = Number(value);
    if (isNaN(num)) return value;
    return Math.abs(num);
  },
};

// ── Tokenizer ──────────────────────────────────────────────────────────

type TokenType =
  | "string"
  | "number"
  | "ident"
  | "bool"
  | "null"
  | "op"
  | "paren"
  | "not"
  | "pipe"
  | "question"
  | "colon"
  | "end";

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    // Skip whitespace
    if (/\s/.test(input[i])) {
      i++;
      continue;
    }

    // Two-char operators (must check before single-char)
    const two = input.slice(i, i + 2);
    if (["==", "!=", ">=", "<=", "||", "&&"].includes(two)) {
      tokens.push({ type: "op", value: two });
      i += 2;
      continue;
    }

    const ch = input[i];

    // Comparison operators
    if (ch === ">" || ch === "<") {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    // Arithmetic operators
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    // Not
    if (ch === "!") {
      tokens.push({ type: "not", value: "!" });
      i++;
      continue;
    }

    // Parens
    if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch });
      i++;
      continue;
    }

    // Pipe
    if (ch === "|") {
      tokens.push({ type: "pipe", value: "|" });
      i++;
      continue;
    }

    // Ternary
    if (ch === "?") {
      tokens.push({ type: "question", value: "?" });
      i++;
      continue;
    }

    if (ch === ":") {
      tokens.push({ type: "colon", value: ":" });
      i++;
      continue;
    }

    // Single-quoted string
    if (ch === "'") {
      let str = "";
      i++; // skip opening quote
      while (i < input.length && input[i] !== "'") {
        str += input[i];
        i++;
      }
      i++; // skip closing quote
      tokens.push({ type: "string", value: str });
      continue;
    }

    // Number
    if (
      /\d/.test(ch) ||
      (ch === "." && i + 1 < input.length && /\d/.test(input[i + 1]))
    ) {
      let num = "";
      while (i < input.length && /[\d.]/.test(input[i])) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_$]/.test(ch)) {
      let ident = "";
      while (i < input.length && /[a-zA-Z0-9_.$]/.test(input[i])) {
        ident += input[i];
        i++;
      }
      if (ident === "true" || ident === "false") {
        tokens.push({ type: "bool", value: ident });
      } else if (ident === "null") {
        tokens.push({ type: "null", value: ident });
      } else {
        tokens.push({ type: "ident", value: ident });
      }
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  tokens.push({ type: "end", value: "" });
  return tokens;
}

// ── Parser ─────────────────────────────────────────────────────────────

class Parser {
  private tokens: Token[];
  private pos = 0;
  private ctx: Record<string, unknown>;

  constructor(tokens: Token[], ctx: Record<string, unknown>) {
    this.tokens = tokens;
    this.ctx = ctx;
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    return this.tokens[this.pos++];
  }

  private expect(type: TokenType, value?: string): Token {
    const tok = this.advance();
    if (tok.type !== type || (value !== undefined && tok.value !== value)) {
      throw new Error(
        `Expected ${type}${value ? ` '${value}'` : ""}, got ${tok.type} '${
          tok.value
        }'`,
      );
    }
    return tok;
  }

  expectEnd(): void {
    if (this.peek().type !== "end") {
      throw new Error(`Unexpected token: ${this.peek().value}`);
    }
  }

  // expr → pipe
  parseExpr(): unknown {
    return this.parsePipe();
  }

  // pipe → ternary ( '|' ( IDENT ( ':' pipeArg )? | literal ) )*
  private parsePipe(): unknown {
    let value = this.parseTernary();

    while (this.peek().type === "pipe") {
      this.advance(); // consume '|'
      const next = this.peek();

      if (next.type === "ident") {
        // Named pipe transform
        const name = this.advance().value;
        let arg: string | undefined;
        if (this.peek().type === "colon") {
          this.advance(); // consume ':'
          const argTok = this.advance();
          arg = argTok.value;
        }
        const fn = pipes[name];
        if (fn) {
          value = fn(value, arg);
        }
        // Unknown pipe: pass through unchanged
      } else if (
        next.type === "string" ||
        next.type === "number" ||
        next.type === "bool" ||
        next.type === "null"
      ) {
        // Default value shorthand: value | 'fallback'
        const tok = this.advance();
        if (value == null) {
          if (tok.type === "number") value = parseFloat(tok.value);
          else if (tok.type === "bool") value = tok.value === "true";
          else if (tok.type === "null") value = null;
          else value = tok.value; // string
        }
      } else {
        throw new Error(
          `Expected pipe name or default value, got ${next.type}`,
        );
      }
    }

    return value;
  }

  // ternary → or ( '?' expr ':' expr )?
  private parseTernary(): unknown {
    const condition = this.parseOr();

    if (this.peek().type === "question") {
      this.advance(); // consume '?'
      const consequent = this.parseExpr();
      this.expect("colon");
      const alternate = this.parseExpr();
      return condition ? consequent : alternate;
    }

    return condition;
  }

  // or → and ( '||' and )*
  private parseOr(): unknown {
    let left = this.parseAnd();
    while (this.peek().type === "op" && this.peek().value === "||") {
      this.advance();
      const right = this.parseAnd();
      left = left || right;
    }
    return left;
  }

  // and → not ( '&&' not )*
  private parseAnd(): unknown {
    let left = this.parseNot();
    while (this.peek().type === "op" && this.peek().value === "&&") {
      this.advance();
      const right = this.parseNot();
      left = left && right;
    }
    return left;
  }

  // not → '!' not | comp
  private parseNot(): unknown {
    if (this.peek().type === "not") {
      this.advance();
      return !this.parseNot();
    }
    return this.parseComp();
  }

  // comp → add ( compOp add )?
  private parseComp(): unknown {
    const left = this.parseAdd();

    const tok = this.peek();
    if (
      tok.type === "op" &&
      ["==", "!=", ">", ">=", "<", "<="].includes(tok.value)
    ) {
      this.advance();
      const right = this.parseAdd();
      switch (tok.value) {
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case ">":
          return (left as number) > (right as number);
        case ">=":
          return (left as number) >= (right as number);
        case "<":
          return (left as number) < (right as number);
        case "<=":
          return (left as number) <= (right as number);
      }
    }

    return left;
  }

  // add → mul ( ( '+' | '-' ) mul )*
  private parseAdd(): unknown {
    let left = this.parseMul();

    while (
      this.peek().type === "op" &&
      (this.peek().value === "+" || this.peek().value === "-")
    ) {
      const op = this.advance().value;
      const right = this.parseMul();
      if (op === "+") {
        // String concatenation if either side is a string
        if (typeof left === "string" || typeof right === "string") {
          left = String(left) + String(right);
        } else {
          left = Number(left) + Number(right);
        }
      } else {
        left = Number(left) - Number(right);
      }
    }

    return left;
  }

  // mul → unary ( ( '*' | '/' ) unary )*
  private parseMul(): unknown {
    let left = this.parseUnary();

    while (
      this.peek().type === "op" &&
      (this.peek().value === "*" || this.peek().value === "/")
    ) {
      const op = this.advance().value;
      const right = this.parseUnary();
      if (op === "*") {
        left = Number(left) * Number(right);
      } else {
        left = Number(left) / Number(right);
      }
    }

    return left;
  }

  // unary → ( '-' | '+' ) unary | primary
  private parseUnary(): unknown {
    const tok = this.peek();
    if (tok.type === "op" && (tok.value === "-" || tok.value === "+")) {
      this.advance();
      const val = this.parseUnary();
      return tok.value === "-" ? -Number(val) : +Number(val);
    }
    return this.parsePrimary();
  }

  // primary → '(' expr ')' | NUMBER | STRING | 'true' | 'false' | 'null' | IDENT
  private parsePrimary(): unknown {
    const tok = this.peek();

    if (tok.type === "paren" && tok.value === "(") {
      this.advance();
      const val = this.parseExpr();
      this.expect("paren", ")");
      return val;
    }

    if (tok.type === "number") {
      this.advance();
      return parseFloat(tok.value);
    }

    if (tok.type === "string") {
      this.advance();
      return tok.value;
    }

    if (tok.type === "bool") {
      this.advance();
      return tok.value === "true";
    }

    if (tok.type === "null") {
      this.advance();
      return null;
    }

    if (tok.type === "ident") {
      this.advance();
      return this.resolve(tok.value);
    }

    throw new Error(`Unexpected token: ${tok.type} '${tok.value}'`);
  }

  /** Resolve a dot-path identifier from context. */
  private resolve(path: string): unknown {
    const parts = path.split(".");
    let current: unknown = this.ctx;
    for (const part of parts) {
      if (current == null) return undefined;
      if (
        part === "length" &&
        (Array.isArray(current) || typeof current === "string")
      ) {
        return (current as string | unknown[]).length;
      }
      if (typeof current !== "object") return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }
}

// ── Public API ─────────────────────────────────────────────────────────

/**
 * Evaluate an expression string against a context object.
 * Returns the evaluated value (preserves types).
 * Throws on parse/evaluation errors.
 */
export function evaluate(expr: string, ctx: Record<string, unknown>): unknown {
  const tokens = tokenize(expr);
  const parser = new Parser(tokens, ctx);
  const result = parser.parseExpr();
  parser.expectEnd();
  return result;
}
