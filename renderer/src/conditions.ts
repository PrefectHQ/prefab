/**
 * Safe expression evaluator for `visibleWhen` conditions.
 *
 * MCP Apps CSP blocks `eval()` and `new Function()`, so we need a
 * hand-rolled parser. This is a recursive descent evaluator supporting
 * a small but practical grammar:
 *
 *   expr       → or
 *   or         → and ('||' and)*
 *   and        → not ('&&' not)*
 *   not        → '!' comp | comp
 *   comp       → primary (('==' | '!=' | '>' | '>=' | '<' | '<=') primary)?
 *   primary    → '(' expr ')' | number | string | 'true' | 'false' | 'null' | identifier
 *   identifier → name ('.' name)*
 *
 * Identifiers resolve from the context via dot-path. Strings use single
 * quotes: `role == 'admin'`. Bare identifiers are truthy-checked when
 * not part of a comparison.
 *
 * On parse error, falls back to simple `!!ctx[expr]` (legacy behavior)
 * with a console.warn.
 */

/** Evaluate a visibility expression against a context object. */
export function evaluateCondition(
  expr: string,
  ctx: Record<string, unknown>,
): boolean {
  const trimmed = expr.trim();
  if (!trimmed) return false;

  try {
    const parser = new Parser(trimmed, ctx);
    const result = parser.parseExpr();
    parser.expectEnd();
    return !!result;
  } catch {
    // Fallback: treat as simple state key lookup (pre-expression behavior)
    console.warn(
      `[Prefab] Failed to parse visibleWhen expression: "${expr}". Falling back to key lookup.`,
    );
    return !!ctx[trimmed];
  }
}

// ── Tokenizer ────────────────────────────────────────────────────────

type TokenType =
  | "string"
  | "number"
  | "ident"
  | "bool"
  | "null"
  | "op"
  | "paren"
  | "not"
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

    // Two-char operators
    const two = input.slice(i, i + 2);
    if (["==", "!=", ">=", "<=", "||", "&&"].includes(two)) {
      tokens.push({ type: "op", value: two });
      i += 2;
      continue;
    }

    // Single-char operators
    const ch = input[i];
    if (ch === ">" || ch === "<") {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    if (ch === "!") {
      tokens.push({ type: "not", value: "!" });
      i++;
      continue;
    }
    if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch });
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

    // Number (integer or float, including negative sign handled by parser)
    if (/\d/.test(ch) || (ch === "." && i + 1 < input.length && /\d/.test(input[i + 1]))) {
      let num = "";
      while (i < input.length && /[\d.]/.test(input[i])) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Identifier or keyword (true, false, null)
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

// ── Parser ───────────────────────────────────────────────────────────

class Parser {
  private tokens: Token[];
  private pos = 0;
  private ctx: Record<string, unknown>;

  constructor(input: string, ctx: Record<string, unknown>) {
    this.tokens = tokenize(input);
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
      throw new Error(`Expected ${type}${value ? ` '${value}'` : ""}, got ${tok.type} '${tok.value}'`);
    }
    return tok;
  }

  expectEnd(): void {
    if (this.peek().type !== "end") {
      throw new Error(`Unexpected token: ${this.peek().value}`);
    }
  }

  // expr → or
  parseExpr(): unknown {
    return this.parseOr();
  }

  // or → and ('||' and)*
  private parseOr(): unknown {
    let left = this.parseAnd();
    while (this.peek().type === "op" && this.peek().value === "||") {
      this.advance();
      const right = this.parseAnd();
      left = left || right;
    }
    return left;
  }

  // and → not ('&&' not)*
  private parseAnd(): unknown {
    let left = this.parseNot();
    while (this.peek().type === "op" && this.peek().value === "&&") {
      this.advance();
      const right = this.parseNot();
      left = left && right;
    }
    return left;
  }

  // not → '!' comp | comp
  // not → '!' not | comp  (recursive to allow !!value)
  private parseNot(): unknown {
    if (this.peek().type === "not") {
      this.advance();
      return !this.parseNot();
    }
    return this.parseComp();
  }

  // comp → primary (op primary)?
  private parseComp(): unknown {
    const left = this.parsePrimary();

    const tok = this.peek();
    if (tok.type === "op" && ["==", "!=", ">", ">=", "<", "<="].includes(tok.value)) {
      this.advance();
      const right = this.parsePrimary();
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

  // primary → '(' expr ')' | number | string | bool | null | identifier
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
    // Handle .length on arrays/strings
    const parts = path.split(".");
    let current: unknown = this.ctx;
    for (const part of parts) {
      if (current == null) return undefined;
      if (part === "length" && (Array.isArray(current) || typeof current === "string")) {
        return (current as string | unknown[]).length;
      }
      if (typeof current !== "object") return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }
}
