import { j as ce, a as bi } from "./embed-DNN8TWNC.mjs";
import { g as Zt, a as il } from "./icons-xEV2Rqfo.mjs";
var kt, Cr;
function ol() {
  if (Cr) return kt;
  Cr = 1;
  function e(d) {
    return d instanceof Map ? d.clear = d.delete = d.set = function() {
      throw new Error("map is read-only");
    } : d instanceof Set && (d.add = d.clear = d.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(d), Object.getOwnPropertyNames(d).forEach((S) => {
      const R = d[S], W = typeof R;
      (W === "object" || W === "function") && !Object.isFrozen(R) && e(R);
    }), d;
  }
  class t {
    /**
     * @param {CompiledMode} mode
     */
    constructor(S) {
      S.data === void 0 && (S.data = {}), this.data = S.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function n(d) {
    return d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(d, ...S) {
    const R = /* @__PURE__ */ Object.create(null);
    for (const W in d)
      R[W] = d[W];
    return S.forEach(function(W) {
      for (const de in W)
        R[de] = W[de];
    }), /** @type {T} */
    R;
  }
  const i = "</span>", l = (d) => !!d.scope, o = (d, { prefix: S }) => {
    if (d.startsWith("language:"))
      return d.replace("language:", "language-");
    if (d.includes(".")) {
      const R = d.split(".");
      return [
        `${S}${R.shift()}`,
        ...R.map((W, de) => `${W}${"_".repeat(de + 1)}`)
      ].join(" ");
    }
    return `${S}${d}`;
  };
  class a {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(S, R) {
      this.buffer = "", this.classPrefix = R.classPrefix, S.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(S) {
      this.buffer += n(S);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(S) {
      if (!l(S)) return;
      const R = o(
        S.scope,
        { prefix: this.classPrefix }
      );
      this.span(R);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(S) {
      l(S) && (this.buffer += i);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(S) {
      this.buffer += `<span class="${S}">`;
    }
  }
  const u = (d = {}) => {
    const S = { children: [] };
    return Object.assign(S, d), S;
  };
  class s {
    constructor() {
      this.rootNode = u(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(S) {
      this.top.children.push(S);
    }
    /** @param {string} scope */
    openNode(S) {
      const R = u({ scope: S });
      this.add(R), this.stack.push(R);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(S) {
      return this.constructor._walk(S, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(S, R) {
      return typeof R == "string" ? S.addText(R) : R.children && (S.openNode(R), R.children.forEach((W) => this._walk(S, W)), S.closeNode(R)), S;
    }
    /**
     * @param {Node} node
     */
    static _collapse(S) {
      typeof S != "string" && S.children && (S.children.every((R) => typeof R == "string") ? S.children = [S.children.join("")] : S.children.forEach((R) => {
        s._collapse(R);
      }));
    }
  }
  class f extends s {
    /**
     * @param {*} options
     */
    constructor(S) {
      super(), this.options = S;
    }
    /**
     * @param {string} text
     */
    addText(S) {
      S !== "" && this.add(S);
    }
    /** @param {string} scope */
    startScope(S) {
      this.openNode(S);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(S, R) {
      const W = S.root;
      R && (W.scope = `language:${R}`), this.add(W);
    }
    toHTML() {
      return new a(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function c(d) {
    return d ? typeof d == "string" ? d : d.source : null;
  }
  function h(d) {
    return k("(?=", d, ")");
  }
  function p(d) {
    return k("(?:", d, ")*");
  }
  function b(d) {
    return k("(?:", d, ")?");
  }
  function k(...d) {
    return d.map((R) => c(R)).join("");
  }
  function _(d) {
    const S = d[d.length - 1];
    return typeof S == "object" && S.constructor === Object ? (d.splice(d.length - 1, 1), S) : {};
  }
  function y(...d) {
    return "(" + (_(d).capture ? "" : "?:") + d.map((W) => c(W)).join("|") + ")";
  }
  function C(d) {
    return new RegExp(d.toString() + "|").exec("").length - 1;
  }
  function A(d, S) {
    const R = d && d.exec(S);
    return R && R.index === 0;
  }
  const $ = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function D(d, { joinWith: S }) {
    let R = 0;
    return d.map((W) => {
      R += 1;
      const de = R;
      let me = c(W), B = "";
      for (; me.length > 0; ) {
        const L = $.exec(me);
        if (!L) {
          B += me;
          break;
        }
        B += me.substring(0, L.index), me = me.substring(L.index + L[0].length), L[0][0] === "\\" && L[1] ? B += "\\" + String(Number(L[1]) + de) : (B += L[0], L[0] === "(" && R++);
      }
      return B;
    }).map((W) => `(${W})`).join(S);
  }
  const E = /\b\B/, V = "[a-zA-Z]\\w*", K = "[a-zA-Z_]\\w*", j = "\\b\\d+(\\.\\d+)?", x = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", M = "\\b(0b[01]+)", P = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", te = (d = {}) => {
    const S = /^#![ ]*\//;
    return d.binary && (d.begin = k(
      S,
      /.*\b/,
      d.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: S,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (R, W) => {
        R.index !== 0 && W.ignoreMatch();
      }
    }, d);
  }, z = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, N = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [z]
  }, ne = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [z]
  }, pe = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, Y = function(d, S, R = {}) {
    const W = r(
      {
        scope: "comment",
        begin: d,
        end: S,
        contains: []
      },
      R
    );
    W.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const de = y(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return W.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: k(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          de,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), W;
  }, he = Y("//", "$"), g = Y("/\\*", "\\*/"), ge = Y("#", "$"), ke = {
    scope: "number",
    begin: j,
    relevance: 0
  }, m = {
    scope: "number",
    begin: x,
    relevance: 0
  }, Oe = {
    scope: "number",
    begin: M,
    relevance: 0
  }, Ke = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      z,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [z]
      }
    ]
  }, Ee = {
    scope: "title",
    begin: V,
    relevance: 0
  }, ln = {
    scope: "title",
    begin: K,
    relevance: 0
  }, je = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + K,
    relevance: 0
  };
  var Fe = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: N,
    BACKSLASH_ESCAPE: z,
    BINARY_NUMBER_MODE: Oe,
    BINARY_NUMBER_RE: M,
    COMMENT: Y,
    C_BLOCK_COMMENT_MODE: g,
    C_LINE_COMMENT_MODE: he,
    C_NUMBER_MODE: m,
    C_NUMBER_RE: x,
    END_SAME_AS_BEGIN: function(d) {
      return Object.assign(
        d,
        {
          /** @type {ModeCallback} */
          "on:begin": (S, R) => {
            R.data._beginMatch = S[1];
          },
          /** @type {ModeCallback} */
          "on:end": (S, R) => {
            R.data._beginMatch !== S[1] && R.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: ge,
    IDENT_RE: V,
    MATCH_NOTHING_RE: E,
    METHOD_GUARD: je,
    NUMBER_MODE: ke,
    NUMBER_RE: j,
    PHRASAL_WORDS_MODE: pe,
    QUOTE_STRING_MODE: ne,
    REGEXP_MODE: Ke,
    RE_STARTERS_RE: P,
    SHEBANG: te,
    TITLE_MODE: Ee,
    UNDERSCORE_IDENT_RE: K,
    UNDERSCORE_TITLE_MODE: ln
  });
  function hn(d, S) {
    d.input[d.index - 1] === "." && S.ignoreMatch();
  }
  function st(d, S) {
    d.className !== void 0 && (d.scope = d.className, delete d.className);
  }
  function ut(d, S) {
    S && d.beginKeywords && (d.begin = "\\b(" + d.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", d.__beforeBegin = hn, d.keywords = d.keywords || d.beginKeywords, delete d.beginKeywords, d.relevance === void 0 && (d.relevance = 0));
  }
  function ct(d, S) {
    Array.isArray(d.illegal) && (d.illegal = y(...d.illegal));
  }
  function Pn(d, S) {
    if (d.match) {
      if (d.begin || d.end) throw new Error("begin & end are not supported with match");
      d.begin = d.match, delete d.match;
    }
  }
  function zn(d, S) {
    d.relevance === void 0 && (d.relevance = 1);
  }
  const Bn = (d, S) => {
    if (!d.beforeMatch) return;
    if (d.starts) throw new Error("beforeMatch cannot be used with starts");
    const R = Object.assign({}, d);
    Object.keys(d).forEach((W) => {
      delete d[W];
    }), d.keywords = R.keywords, d.begin = k(R.beforeMatch, h(R.begin)), d.starts = {
      relevance: 0,
      contains: [
        Object.assign(R, { endsParent: !0 })
      ]
    }, d.relevance = 0, delete R.beforeMatch;
  }, ft = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Fn = "keyword";
  function wn(d, S, R = Fn) {
    const W = /* @__PURE__ */ Object.create(null);
    return typeof d == "string" ? de(R, d.split(" ")) : Array.isArray(d) ? de(R, d) : Object.keys(d).forEach(function(me) {
      Object.assign(
        W,
        wn(d[me], S, me)
      );
    }), W;
    function de(me, B) {
      S && (B = B.map((L) => L.toLowerCase())), B.forEach(function(L) {
        const G = L.split("|");
        W[G[0]] = [me, pt(G[0], G[1])];
      });
    }
  }
  function pt(d, S) {
    return S ? Number(S) : ht(d) ? 0 : 1;
  }
  function ht(d) {
    return ft.includes(d.toLowerCase());
  }
  const Un = {}, Ze = (d) => {
    console.error(d);
  }, $n = (d, ...S) => {
    console.log(`WARN: ${d}`, ...S);
  }, w = (d, S) => {
    Un[`${d}/${S}`] || (console.log(`Deprecated as of ${d}. ${S}`), Un[`${d}/${S}`] = !0);
  }, I = new Error();
  function q(d, S, { key: R }) {
    let W = 0;
    const de = d[R], me = {}, B = {};
    for (let L = 1; L <= S.length; L++)
      B[L + W] = de[L], me[L + W] = !0, W += C(S[L - 1]);
    d[R] = B, d[R]._emit = me, d[R]._multi = !0;
  }
  function J(d) {
    if (Array.isArray(d.begin)) {
      if (d.skip || d.excludeBegin || d.returnBegin)
        throw Ze("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), I;
      if (typeof d.beginScope != "object" || d.beginScope === null)
        throw Ze("beginScope must be object"), I;
      q(d, d.begin, { key: "beginScope" }), d.begin = D(d.begin, { joinWith: "" });
    }
  }
  function oe(d) {
    if (Array.isArray(d.end)) {
      if (d.skip || d.excludeEnd || d.returnEnd)
        throw Ze("skip, excludeEnd, returnEnd not compatible with endScope: {}"), I;
      if (typeof d.endScope != "object" || d.endScope === null)
        throw Ze("endScope must be object"), I;
      q(d, d.end, { key: "endScope" }), d.end = D(d.end, { joinWith: "" });
    }
  }
  function Me(d) {
    d.scope && typeof d.scope == "object" && d.scope !== null && (d.beginScope = d.scope, delete d.scope);
  }
  function Ye(d) {
    Me(d), typeof d.beginScope == "string" && (d.beginScope = { _wrap: d.beginScope }), typeof d.endScope == "string" && (d.endScope = { _wrap: d.endScope }), J(d), oe(d);
  }
  function Ue(d) {
    function S(B, L) {
      return new RegExp(
        c(B),
        "m" + (d.case_insensitive ? "i" : "") + (d.unicodeRegex ? "u" : "") + (L ? "g" : "")
      );
    }
    class R {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(L, G) {
        G.position = this.position++, this.matchIndexes[this.matchAt] = G, this.regexes.push([G, L]), this.matchAt += C(L) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const L = this.regexes.map((G) => G[1]);
        this.matcherRe = S(D(L, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(L) {
        this.matcherRe.lastIndex = this.lastIndex;
        const G = this.matcherRe.exec(L);
        if (!G)
          return null;
        const _e = G.findIndex((_n, gt) => gt > 0 && _n !== void 0), be = this.matchIndexes[_e];
        return G.splice(0, _e), Object.assign(G, be);
      }
    }
    class W {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(L) {
        if (this.multiRegexes[L]) return this.multiRegexes[L];
        const G = new R();
        return this.rules.slice(L).forEach(([_e, be]) => G.addRule(_e, be)), G.compile(), this.multiRegexes[L] = G, G;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(L, G) {
        this.rules.push([L, G]), G.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(L) {
        const G = this.getMatcher(this.regexIndex);
        G.lastIndex = this.lastIndex;
        let _e = G.exec(L);
        if (this.resumingScanAtSamePosition() && !(_e && _e.index === this.lastIndex)) {
          const be = this.getMatcher(0);
          be.lastIndex = this.lastIndex + 1, _e = be.exec(L);
        }
        return _e && (this.regexIndex += _e.position + 1, this.regexIndex === this.count && this.considerAll()), _e;
      }
    }
    function de(B) {
      const L = new W();
      return B.contains.forEach((G) => L.addRule(G.begin, { rule: G, type: "begin" })), B.terminatorEnd && L.addRule(B.terminatorEnd, { type: "end" }), B.illegal && L.addRule(B.illegal, { type: "illegal" }), L;
    }
    function me(B, L) {
      const G = (
        /** @type CompiledMode */
        B
      );
      if (B.isCompiled) return G;
      [
        st,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Pn,
        Ye,
        Bn
      ].forEach((be) => be(B, L)), d.compilerExtensions.forEach((be) => be(B, L)), B.__beforeBegin = null, [
        ut,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        ct,
        // default to 1 relevance if not specified
        zn
      ].forEach((be) => be(B, L)), B.isCompiled = !0;
      let _e = null;
      return typeof B.keywords == "object" && B.keywords.$pattern && (B.keywords = Object.assign({}, B.keywords), _e = B.keywords.$pattern, delete B.keywords.$pattern), _e = _e || /\w+/, B.keywords && (B.keywords = wn(B.keywords, d.case_insensitive)), G.keywordPatternRe = S(_e, !0), L && (B.begin || (B.begin = /\B|\b/), G.beginRe = S(G.begin), !B.end && !B.endsWithParent && (B.end = /\B|\b/), B.end && (G.endRe = S(G.end)), G.terminatorEnd = c(G.end) || "", B.endsWithParent && L.terminatorEnd && (G.terminatorEnd += (B.end ? "|" : "") + L.terminatorEnd)), B.illegal && (G.illegalRe = S(
        /** @type {RegExp | string} */
        B.illegal
      )), B.contains || (B.contains = []), B.contains = [].concat(...B.contains.map(function(be) {
        return sn(be === "self" ? B : be);
      })), B.contains.forEach(function(be) {
        me(
          /** @type Mode */
          be,
          G
        );
      }), B.starts && me(B.starts, L), G.matcher = de(G), G;
    }
    if (d.compilerExtensions || (d.compilerExtensions = []), d.contains && d.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return d.classNameAliases = r(d.classNameAliases || {}), me(
      /** @type Mode */
      d
    );
  }
  function Je(d) {
    return d ? d.endsWithParent || Je(d.starts) : !1;
  }
  function sn(d) {
    return d.variants && !d.cachedVariants && (d.cachedVariants = d.variants.map(function(S) {
      return r(d, { variants: null }, S);
    })), d.cachedVariants ? d.cachedVariants : Je(d) ? r(d, { starts: d.starts ? r(d.starts) : null }) : Object.isFrozen(d) ? r(d) : d;
  }
  var ve = "11.11.1";
  class en extends Error {
    constructor(S, R) {
      super(S), this.name = "HTMLInjectionError", this.html = R;
    }
  }
  const Le = n, dr = r, mr = Symbol("nomatch"), Fo = 7, br = function(d) {
    const S = /* @__PURE__ */ Object.create(null), R = /* @__PURE__ */ Object.create(null), W = [];
    let de = !0;
    const me = "Could not find the language '{}', did you forget to load/include a language module?", B = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let L = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: f
    };
    function G(v) {
      return L.noHighlightRe.test(v);
    }
    function _e(v) {
      let U = v.className + " ";
      U += v.parentNode ? v.parentNode.className : "";
      const re = L.languageDetectRe.exec(U);
      if (re) {
        const se = nn(re[1]);
        return se || ($n(me.replace("{}", re[1])), $n("Falling back to no-highlight mode for this block.", v)), se ? re[1] : "no-highlight";
      }
      return U.split(/\s+/).find((se) => G(se) || nn(se));
    }
    function be(v, U, re) {
      let se = "", we = "";
      typeof U == "object" ? (se = v, re = U.ignoreIllegals, we = U.language) : (w("10.7.0", "highlight(lang, code, ...args) has been deprecated."), w("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), we = v, se = U), re === void 0 && (re = !0);
      const $e = {
        code: se,
        language: we
      };
      jn("before:highlight", $e);
      const tn = $e.result ? $e.result : _n($e.language, $e.code, re);
      return tn.code = $e.code, jn("after:highlight", tn), tn;
    }
    function _n(v, U, re, se) {
      const we = /* @__PURE__ */ Object.create(null);
      function $e(O, F) {
        return O.keywords[F];
      }
      function tn() {
        if (!Z.keywords) {
          Se.addText(ue);
          return;
        }
        let O = 0;
        Z.keywordPatternRe.lastIndex = 0;
        let F = Z.keywordPatternRe.exec(ue), Q = "";
        for (; F; ) {
          Q += ue.substring(O, F.index);
          const le = Ge.case_insensitive ? F[0].toLowerCase() : F[0], Ae = $e(Z, le);
          if (Ae) {
            const [Xe, tl] = Ae;
            if (Se.addText(Q), Q = "", we[le] = (we[le] || 0) + 1, we[le] <= Fo && (Vn += tl), Xe.startsWith("_"))
              Q += F[0];
            else {
              const rl = Ge.classNameAliases[Xe] || Xe;
              qe(F[0], rl);
            }
          } else
            Q += F[0];
          O = Z.keywordPatternRe.lastIndex, F = Z.keywordPatternRe.exec(ue);
        }
        Q += ue.substring(O), Se.addText(Q);
      }
      function qn() {
        if (ue === "") return;
        let O = null;
        if (typeof Z.subLanguage == "string") {
          if (!S[Z.subLanguage]) {
            Se.addText(ue);
            return;
          }
          O = _n(Z.subLanguage, ue, !0, Ar[Z.subLanguage]), Ar[Z.subLanguage] = /** @type {CompiledMode} */
          O._top;
        } else
          O = dt(ue, Z.subLanguage.length ? Z.subLanguage : null);
        Z.relevance > 0 && (Vn += O.relevance), Se.__addSublanguage(O._emitter, O.language);
      }
      function De() {
        Z.subLanguage != null ? qn() : tn(), ue = "";
      }
      function qe(O, F) {
        O !== "" && (Se.startScope(F), Se.addText(O), Se.endScope());
      }
      function Er(O, F) {
        let Q = 1;
        const le = F.length - 1;
        for (; Q <= le; ) {
          if (!O._emit[Q]) {
            Q++;
            continue;
          }
          const Ae = Ge.classNameAliases[O[Q]] || O[Q], Xe = F[Q];
          Ae ? qe(Xe, Ae) : (ue = Xe, tn(), ue = ""), Q++;
        }
      }
      function wr(O, F) {
        return O.scope && typeof O.scope == "string" && Se.openNode(Ge.classNameAliases[O.scope] || O.scope), O.beginScope && (O.beginScope._wrap ? (qe(ue, Ge.classNameAliases[O.beginScope._wrap] || O.beginScope._wrap), ue = "") : O.beginScope._multi && (Er(O.beginScope, F), ue = "")), Z = Object.create(O, { parent: { value: Z } }), Z;
      }
      function _r(O, F, Q) {
        let le = A(O.endRe, Q);
        if (le) {
          if (O["on:end"]) {
            const Ae = new t(O);
            O["on:end"](F, Ae), Ae.isMatchIgnored && (le = !1);
          }
          if (le) {
            for (; O.endsParent && O.parent; )
              O = O.parent;
            return O;
          }
        }
        if (O.endsWithParent)
          return _r(O.parent, F, Q);
      }
      function Xo(O) {
        return Z.matcher.regexIndex === 0 ? (ue += O[0], 1) : (xt = !0, 0);
      }
      function Qo(O) {
        const F = O[0], Q = O.rule, le = new t(Q), Ae = [Q.__beforeBegin, Q["on:begin"]];
        for (const Xe of Ae)
          if (Xe && (Xe(O, le), le.isMatchIgnored))
            return Xo(F);
        return Q.skip ? ue += F : (Q.excludeBegin && (ue += F), De(), !Q.returnBegin && !Q.excludeBegin && (ue = F)), wr(Q, O), Q.returnBegin ? 0 : F.length;
      }
      function Jo(O) {
        const F = O[0], Q = U.substring(O.index), le = _r(Z, O, Q);
        if (!le)
          return mr;
        const Ae = Z;
        Z.endScope && Z.endScope._wrap ? (De(), qe(F, Z.endScope._wrap)) : Z.endScope && Z.endScope._multi ? (De(), Er(Z.endScope, O)) : Ae.skip ? ue += F : (Ae.returnEnd || Ae.excludeEnd || (ue += F), De(), Ae.excludeEnd && (ue = F));
        do
          Z.scope && Se.closeNode(), !Z.skip && !Z.subLanguage && (Vn += Z.relevance), Z = Z.parent;
        while (Z !== le.parent);
        return le.starts && wr(le.starts, O), Ae.returnEnd ? 0 : F.length;
      }
      function el() {
        const O = [];
        for (let F = Z; F !== Ge; F = F.parent)
          F.scope && O.unshift(F.scope);
        O.forEach((F) => Se.openNode(F));
      }
      let Gn = {};
      function Sr(O, F) {
        const Q = F && F[0];
        if (ue += O, Q == null)
          return De(), 0;
        if (Gn.type === "begin" && F.type === "end" && Gn.index === F.index && Q === "") {
          if (ue += U.slice(F.index, F.index + 1), !de) {
            const le = new Error(`0 width match regex (${v})`);
            throw le.languageName = v, le.badRule = Gn.rule, le;
          }
          return 1;
        }
        if (Gn = F, F.type === "begin")
          return Qo(F);
        if (F.type === "illegal" && !re) {
          const le = new Error('Illegal lexeme "' + Q + '" for mode "' + (Z.scope || "<unnamed>") + '"');
          throw le.mode = Z, le;
        } else if (F.type === "end") {
          const le = Jo(F);
          if (le !== mr)
            return le;
        }
        if (F.type === "illegal" && Q === "")
          return ue += `
`, 1;
        if (yt > 1e5 && yt > F.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return ue += Q, Q.length;
      }
      const Ge = nn(v);
      if (!Ge)
        throw Ze(me.replace("{}", v)), new Error('Unknown language: "' + v + '"');
      const nl = Ue(Ge);
      let bt = "", Z = se || nl;
      const Ar = {}, Se = new L.__emitter(L);
      el();
      let ue = "", Vn = 0, un = 0, yt = 0, xt = !1;
      try {
        if (Ge.__emitTokens)
          Ge.__emitTokens(U, Se);
        else {
          for (Z.matcher.considerAll(); ; ) {
            yt++, xt ? xt = !1 : Z.matcher.considerAll(), Z.matcher.lastIndex = un;
            const O = Z.matcher.exec(U);
            if (!O) break;
            const F = U.substring(un, O.index), Q = Sr(F, O);
            un = O.index + Q;
          }
          Sr(U.substring(un));
        }
        return Se.finalize(), bt = Se.toHTML(), {
          language: v,
          value: bt,
          relevance: Vn,
          illegal: !1,
          _emitter: Se,
          _top: Z
        };
      } catch (O) {
        if (O.message && O.message.includes("Illegal"))
          return {
            language: v,
            value: Le(U),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: O.message,
              index: un,
              context: U.slice(un - 100, un + 100),
              mode: O.mode,
              resultSoFar: bt
            },
            _emitter: Se
          };
        if (de)
          return {
            language: v,
            value: Le(U),
            illegal: !1,
            relevance: 0,
            errorRaised: O,
            _emitter: Se,
            _top: Z
          };
        throw O;
      }
    }
    function gt(v) {
      const U = {
        value: Le(v),
        illegal: !1,
        relevance: 0,
        _top: B,
        _emitter: new L.__emitter(L)
      };
      return U._emitter.addText(v), U;
    }
    function dt(v, U) {
      U = U || L.languages || Object.keys(S);
      const re = gt(v), se = U.filter(nn).filter(kr).map(
        (De) => _n(De, v, !1)
      );
      se.unshift(re);
      const we = se.sort((De, qe) => {
        if (De.relevance !== qe.relevance) return qe.relevance - De.relevance;
        if (De.language && qe.language) {
          if (nn(De.language).supersetOf === qe.language)
            return 1;
          if (nn(qe.language).supersetOf === De.language)
            return -1;
        }
        return 0;
      }), [$e, tn] = we, qn = $e;
      return qn.secondBest = tn, qn;
    }
    function Uo(v, U, re) {
      const se = U && R[U] || re;
      v.classList.add("hljs"), v.classList.add(`language-${se}`);
    }
    function mt(v) {
      let U = null;
      const re = _e(v);
      if (G(re)) return;
      if (jn(
        "before:highlightElement",
        { el: v, language: re }
      ), v.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", v);
        return;
      }
      if (v.children.length > 0 && (L.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(v)), L.throwUnescapedHTML))
        throw new en(
          "One of your code blocks includes unescaped HTML.",
          v.innerHTML
        );
      U = v;
      const se = U.textContent, we = re ? be(se, { language: re, ignoreIllegals: !0 }) : dt(se);
      v.innerHTML = we.value, v.dataset.highlighted = "yes", Uo(v, re, we.language), v.result = {
        language: we.language,
        // TODO: remove with version 11.0
        re: we.relevance,
        relevance: we.relevance
      }, we.secondBest && (v.secondBest = {
        language: we.secondBest.language,
        relevance: we.secondBest.relevance
      }), jn("after:highlightElement", { el: v, result: we, text: se });
    }
    function $o(v) {
      L = dr(L, v);
    }
    const Ho = () => {
      Hn(), w("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function jo() {
      Hn(), w("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let yr = !1;
    function Hn() {
      function v() {
        Hn();
      }
      if (document.readyState === "loading") {
        yr || window.addEventListener("DOMContentLoaded", v, !1), yr = !0;
        return;
      }
      document.querySelectorAll(L.cssSelector).forEach(mt);
    }
    function qo(v, U) {
      let re = null;
      try {
        re = U(d);
      } catch (se) {
        if (Ze("Language definition for '{}' could not be registered.".replace("{}", v)), de)
          Ze(se);
        else
          throw se;
        re = B;
      }
      re.name || (re.name = v), S[v] = re, re.rawDefinition = U.bind(null, d), re.aliases && xr(re.aliases, { languageName: v });
    }
    function Go(v) {
      delete S[v];
      for (const U of Object.keys(R))
        R[U] === v && delete R[U];
    }
    function Vo() {
      return Object.keys(S);
    }
    function nn(v) {
      return v = (v || "").toLowerCase(), S[v] || S[R[v]];
    }
    function xr(v, { languageName: U }) {
      typeof v == "string" && (v = [v]), v.forEach((re) => {
        R[re.toLowerCase()] = U;
      });
    }
    function kr(v) {
      const U = nn(v);
      return U && !U.disableAutodetect;
    }
    function Wo(v) {
      v["before:highlightBlock"] && !v["before:highlightElement"] && (v["before:highlightElement"] = (U) => {
        v["before:highlightBlock"](
          Object.assign({ block: U.el }, U)
        );
      }), v["after:highlightBlock"] && !v["after:highlightElement"] && (v["after:highlightElement"] = (U) => {
        v["after:highlightBlock"](
          Object.assign({ block: U.el }, U)
        );
      });
    }
    function Ko(v) {
      Wo(v), W.push(v);
    }
    function Zo(v) {
      const U = W.indexOf(v);
      U !== -1 && W.splice(U, 1);
    }
    function jn(v, U) {
      const re = v;
      W.forEach(function(se) {
        se[re] && se[re](U);
      });
    }
    function Yo(v) {
      return w("10.7.0", "highlightBlock will be removed entirely in v12.0"), w("10.7.0", "Please use highlightElement now."), mt(v);
    }
    Object.assign(d, {
      highlight: be,
      highlightAuto: dt,
      highlightAll: Hn,
      highlightElement: mt,
      // TODO: Remove with v12 API
      highlightBlock: Yo,
      configure: $o,
      initHighlighting: Ho,
      initHighlightingOnLoad: jo,
      registerLanguage: qo,
      unregisterLanguage: Go,
      listLanguages: Vo,
      getLanguage: nn,
      registerAliases: xr,
      autoDetection: kr,
      inherit: dr,
      addPlugin: Ko,
      removePlugin: Zo
    }), d.debugMode = function() {
      de = !1;
    }, d.safeMode = function() {
      de = !0;
    }, d.versionString = ve, d.regex = {
      concat: k,
      lookahead: h,
      either: y,
      optional: b,
      anyNumberOfTimes: p
    };
    for (const v in Fe)
      typeof Fe[v] == "object" && e(Fe[v]);
    return Object.assign(d, Fe), d;
  }, gn = br({});
  return gn.newInstance = () => br({}), kt = gn, gn.HighlightJS = gn, gn.default = gn, kt;
}
var ll = /* @__PURE__ */ ol();
const xe = /* @__PURE__ */ Zt(ll);
function al(e) {
  const t = e.regex, n = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), r = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ], a = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: r,
    built_in: [
      "__import__",
      "abs",
      "all",
      "any",
      "ascii",
      "bin",
      "bool",
      "breakpoint",
      "bytearray",
      "bytes",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "print",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip"
    ],
    literal: [
      "__debug__",
      "Ellipsis",
      "False",
      "None",
      "NotImplemented",
      "True"
    ],
    type: [
      "Any",
      "Callable",
      "Coroutine",
      "Dict",
      "List",
      "Literal",
      "Generic",
      "Optional",
      "Sequence",
      "Set",
      "Tuple",
      "Type",
      "Union"
    ]
  }, u = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  }, s = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: a,
    illegal: /#/
  }, f = {
    begin: /\{\{/,
    relevance: 0
  }, c = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u,
          f,
          s
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          u,
          f,
          s
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          e.BACKSLASH_ESCAPE,
          f,
          s
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          f,
          s
        ]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  }, h = "[0-9](_?[0-9])*", p = `(\\b(${h}))?\\.(${h})|\\b(${h})\\.`, b = `\\b|${r.join("|")}`, k = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${h})|(${p}))[eE][+-]?(${h})[jJ]?(?=${b})`
      },
      {
        begin: `(${p})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${b})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${b})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${b})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${b})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${h})[jJ](?=${b})`
      }
    ]
  }, _ = {
    className: "comment",
    begin: t.lookahead(/# type:/),
    end: /$/,
    keywords: a,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: !0
      }
    ]
  }, y = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: !0
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: a,
        contains: [
          "self",
          u,
          k,
          c,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return s.contains = [
    c,
    k,
    u
  ], {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: !0,
    keywords: a,
    illegal: /(<\/|\?)|=>/,
    contains: [
      u,
      k,
      {
        // very common convention
        scope: "variable.language",
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      c,
      _,
      e.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          n
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [y]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              n,
              /\s*/,
              /\(\s*/,
              n,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              n
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          k,
          y,
          c
        ]
      }
    ]
  };
}
const Tr = "[A-Za-z$_][0-9A-Za-z$_]*", sl = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], ul = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], yi = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], xi = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], ki = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], cl = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], fl = [].concat(
  ki,
  yi,
  xi
);
function Ei(e) {
  const t = e.regex, n = (Y, { after: he }) => {
    const g = "</" + Y[0].slice(1);
    return Y.input.indexOf(g, he) !== -1;
  }, r = Tr, i = {
    begin: "<>",
    end: "</>"
  }, l = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (Y, he) => {
      const g = Y[0].length + Y.index, ge = Y.input[g];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ge === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ge === ","
      ) {
        he.ignoreMatch();
        return;
      }
      ge === ">" && (n(Y, { after: g }) || he.ignoreMatch());
      let ke;
      const m = Y.input.substring(g);
      if (ke = m.match(/^\s*=/)) {
        he.ignoreMatch();
        return;
      }
      if ((ke = m.match(/^\s+extends\s+/)) && ke.index === 0) {
        he.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: Tr,
    keyword: sl,
    literal: ul,
    built_in: fl,
    "variable.language": cl
  }, u = "[0-9](_?[0-9])*", s = `\\.(${u})`, f = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", c = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${f})((${s})|\\.)?|(${s}))[eE][+-]?(${u})\\b` },
      { begin: `\\b(${f})\\b((${s})\\b|\\.)?|(${s})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, h = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, p = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "xml"
    }
  }, b = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "css"
    }
  }, k = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "graphql"
    }
  }, _ = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      h
    ]
  }, C = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, A = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    p,
    b,
    k,
    _,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    c
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  h.contains = A.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(A)
  });
  const $ = [].concat(C, h.contains), D = $.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat($)
    }
  ]), E = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: D
  }, V = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, K = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...yi,
        ...xi
      ]
    }
  }, j = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, x = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [E],
    illegal: /%/
  }, M = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function P(Y) {
    return t.concat("(?!", Y.join("|"), ")");
  }
  const te = {
    match: t.concat(
      /\b/,
      P([
        ...ki,
        "super",
        "import"
      ].map((Y) => `${Y}\\s*\\(`)),
      r,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, z = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, N = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      E
    ]
  }, ne = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", pe = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(ne)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      E
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: D, CLASS_REFERENCE: K },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      j,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      p,
      b,
      k,
      _,
      C,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      c,
      K,
      {
        scope: "attr",
        match: r + t.lookahead(":"),
        relevance: 0
      },
      pe,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          C,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ne,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: D
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: i.begin, end: i.end },
              { match: l },
              {
                begin: o.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": o.isTrulyOpeningTag,
                end: o.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: o.begin,
                end: o.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      x,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          E,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      z,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [E]
      },
      te,
      M,
      V,
      N,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const Qn = "[A-Za-z$_][0-9A-Za-z$_]*", wi = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], _i = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Si = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Ai = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Ci = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], Ti = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], vi = [].concat(
  Ci,
  Si,
  Ai
);
function pl(e) {
  const t = e.regex, n = (Y, { after: he }) => {
    const g = "</" + Y[0].slice(1);
    return Y.input.indexOf(g, he) !== -1;
  }, r = Qn, i = {
    begin: "<>",
    end: "</>"
  }, l = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (Y, he) => {
      const g = Y[0].length + Y.index, ge = Y.input[g];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ge === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ge === ","
      ) {
        he.ignoreMatch();
        return;
      }
      ge === ">" && (n(Y, { after: g }) || he.ignoreMatch());
      let ke;
      const m = Y.input.substring(g);
      if (ke = m.match(/^\s*=/)) {
        he.ignoreMatch();
        return;
      }
      if ((ke = m.match(/^\s+extends\s+/)) && ke.index === 0) {
        he.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: Qn,
    keyword: wi,
    literal: _i,
    built_in: vi,
    "variable.language": Ti
  }, u = "[0-9](_?[0-9])*", s = `\\.(${u})`, f = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", c = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${f})((${s})|\\.)?|(${s}))[eE][+-]?(${u})\\b` },
      { begin: `\\b(${f})\\b((${s})\\b|\\.)?|(${s})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, h = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, p = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "xml"
    }
  }, b = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "css"
    }
  }, k = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        h
      ],
      subLanguage: "graphql"
    }
  }, _ = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      h
    ]
  }, C = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, A = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    p,
    b,
    k,
    _,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    c
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  h.contains = A.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(A)
  });
  const $ = [].concat(C, h.contains), D = $.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat($)
    }
  ]), E = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: D
  }, V = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, K = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Si,
        ...Ai
      ]
    }
  }, j = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, x = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [E],
    illegal: /%/
  }, M = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function P(Y) {
    return t.concat("(?!", Y.join("|"), ")");
  }
  const te = {
    match: t.concat(
      /\b/,
      P([
        ...Ci,
        "super",
        "import"
      ].map((Y) => `${Y}\\s*\\(`)),
      r,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, z = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, N = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      E
    ]
  }, ne = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", pe = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(ne)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      E
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: D, CLASS_REFERENCE: K },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      j,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      p,
      b,
      k,
      _,
      C,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      c,
      K,
      {
        scope: "attr",
        match: r + t.lookahead(":"),
        relevance: 0
      },
      pe,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          C,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: ne,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: D
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: i.begin, end: i.end },
              { match: l },
              {
                begin: o.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": o.isTrulyOpeningTag,
                end: o.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: o.begin,
                end: o.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      x,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          E,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      z,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [E]
      },
      te,
      M,
      V,
      N,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Ii(e) {
  const t = e.regex, n = pl(e), r = Qn, i = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], l = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, o = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: i
    },
    contains: [n.exports.CLASS_REFERENCE]
  }, a = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, u = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], s = {
    $pattern: Qn,
    keyword: wi.concat(u),
    literal: _i,
    built_in: vi.concat(i),
    "variable.language": Ti
  }, f = {
    className: "meta",
    begin: "@" + r
  }, c = (k, _, y) => {
    const C = k.contains.findIndex((A) => A.label === _);
    if (C === -1)
      throw new Error("can not find mode to replace");
    k.contains.splice(C, 1, y);
  };
  Object.assign(n.keywords, s), n.exports.PARAMS_CONTAINS.push(f);
  const h = n.contains.find((k) => k.scope === "attr"), p = Object.assign(
    {},
    h,
    { match: t.concat(r, t.lookahead(/\s*\?:/)) }
  );
  n.exports.PARAMS_CONTAINS.push([
    n.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    h,
    // highlight the params key
    p
    // Added for optional property assignment highlighting
  ]), n.contains = n.contains.concat([
    f,
    l,
    o,
    p
    // Added for optional property assignment highlighting
  ]), c(n, "shebang", e.SHEBANG()), c(n, "use_strict", a);
  const b = n.contains.find((k) => k.label === "func.def");
  return b.relevance = 0, Object.assign(n, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), n;
}
function hl(e) {
  const t = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, n = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, r = [
    "true",
    "false",
    "null"
  ], i = {
    scope: "literal",
    beginKeywords: r.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: r
    },
    contains: [
      t,
      n,
      e.QUOTE_STRING_MODE,
      i,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function Yt(e) {
  const t = e.regex, n = {}, r = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [n]
      }
      // default values
    ]
  };
  Object.assign(n, {
    className: "variable",
    variants: [
      { begin: t.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      r
    ]
  });
  const i = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, l = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), o = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, a = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      n,
      i
    ]
  };
  i.contains.push(a);
  const u = {
    match: /\\"/
  }, s = {
    className: "string",
    begin: /'/,
    end: /'/
  }, f = {
    match: /\\'/
  }, c = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      n
    ]
  }, h = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], p = e.SHEBANG({
    binary: `(${h.join("|")})`,
    relevance: 10
  }), b = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, k = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], _ = [
    "true",
    "false"
  ], y = { match: /(\/[a-z._-]+)+/ }, C = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], A = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], $ = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], D = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: k,
      literal: _,
      built_in: [
        ...C,
        ...A,
        // Shell modifiers
        "set",
        "shopt",
        ...$,
        ...D
      ]
    },
    contains: [
      p,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      b,
      c,
      l,
      o,
      y,
      a,
      u,
      s,
      f,
      n
    ]
  };
}
function gl(e) {
  const t = e.regex, n = e.COMMENT("--", "$"), r = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  }, i = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  }, l = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], o = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], a = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ], u = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], s = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ], f = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ], c = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ], h = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ], p = f, b = [
    ...s,
    ...u
  ].filter((D) => !f.includes(D)), k = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, _ = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, y = {
    match: t.concat(/\b/, t.either(...p), /\s*\(/),
    relevance: 0,
    keywords: { built_in: p }
  };
  function C(D) {
    return t.concat(
      /\b/,
      t.either(...D.map((E) => E.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const A = {
    scope: "keyword",
    match: C(h),
    relevance: 0
  };
  function $(D, {
    exceptions: E,
    when: V
  } = {}) {
    const K = V;
    return E = E || [], D.map((j) => j.match(/\|\d+$/) || E.includes(j) ? j : K(j) ? `${j}|0` : j);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: $(b, { when: (D) => D.length < 3 }),
      literal: l,
      type: a,
      built_in: c
    },
    contains: [
      {
        scope: "type",
        match: C(o)
      },
      A,
      y,
      k,
      r,
      i,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      n,
      _
    ]
  };
}
function Ni(e) {
  const t = e.regex, n = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, i = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, l = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, o = e.inherit(l, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), u = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), s = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [i]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [i]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          l,
          u,
          a,
          o,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  l,
                  o,
                  u,
                  a
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      i,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              u
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [s],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [s],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: t.concat(
          /</,
          t.lookahead(t.concat(
            n,
            // <tag/>
            // <tag>
            // <tag ...
            t.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0,
            starts: s
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: t.concat(
          /<\//,
          t.lookahead(t.concat(
            n,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const dl = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), ml = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], bl = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], yl = [
  ...ml,
  ...bl
], xl = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), kl = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), El = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), wl = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function _l(e) {
  const t = e.regex, n = dl(e), r = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, i = "and or not only", l = /@-?\w[\w]*(-\w+)*/, o = "[a-zA-Z-][a-zA-Z0-9_-]*", a = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      n.BLOCK_COMMENT,
      r,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      n.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + o,
        relevance: 0
      },
      n.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + kl.join("|") + ")" },
          { begin: ":(:)?(" + El.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      n.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + wl.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          n.BLOCK_COMMENT,
          n.HEXCOLOR,
          n.IMPORTANT,
          n.CSS_NUMBER_MODE,
          ...a,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...a,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          n.FUNCTION_DISPATCH
        ]
      },
      {
        begin: t.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: l
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: i,
              attribute: xl.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...a,
              n.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + yl.join("|") + ")\\b"
      }
    ]
  };
}
function Ri(e) {
  const t = "true false yes no null", n = "[\\w#;/?:@&=+$,.~*'()[\\]]+", r = {
    className: "attr",
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      {
        // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/
      },
      {
        // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/
      }
    ]
  }, i = {
    className: "template-variable",
    variants: [
      {
        // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  }, l = {
    className: "string",
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: "char.escape",
        relevance: 0
      }
    ]
  }, o = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      i
    ]
  }, a = e.inherit(o, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] }), h = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, p = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, b = {
    begin: /\{/,
    end: /\}/,
    contains: [p],
    illegal: "\\n",
    relevance: 0
  }, k = {
    begin: "\\[",
    end: "\\]",
    contains: [p],
    illegal: "\\n",
    relevance: 0
  }, _ = [
    r,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + n
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + n + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + n
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + n
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: t,
      keywords: { literal: t }
    },
    h,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    b,
    k,
    l,
    o
  ], y = [..._];
  return y.pop(), y.push(a), p.contains = y, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: _
  };
}
function Oi(e) {
  const t = e.regex, n = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, r = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, i = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
      { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      { begin: "`.+?`" },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  }, l = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, o = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: !0,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: !0
      }
    ]
  }, a = /[A-Za-z][A-Za-z0-9+.-]*/, u = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: t.concat(/\[.+?\]\(/, a, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: !0,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/
      },
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: !0,
        returnEnd: !0
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: !0,
        excludeEnd: !0
      }
    ]
  }, s = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  }, f = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  }, c = e.inherit(s, { contains: [] }), h = e.inherit(f, { contains: [] });
  s.contains.push(h), f.contains.push(c);
  let p = [
    n,
    u
  ];
  return [
    s,
    f,
    c,
    h
  ].forEach((y) => {
    y.contains = y.contains.concat(p);
  }), p = p.concat(s, f), {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: p
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: p
              }
            ]
          }
        ]
      },
      n,
      l,
      s,
      f,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: p,
        end: "$"
      },
      i,
      r,
      u,
      o,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
function Sl(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Al = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Cl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Tl = {};
function vr(e, t) {
  return (Tl.jsx ? Cl : Al).test(e);
}
const vl = /[ \t\n\f\r]/g;
function Il(e) {
  return typeof e == "object" ? e.type === "text" ? Ir(e.value) : !1 : Ir(e);
}
function Ir(e) {
  return e.replace(vl, "") === "";
}
class Mn {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
Mn.prototype.normal = {};
Mn.prototype.property = {};
Mn.prototype.space = void 0;
function Mi(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Mn(n, r, t);
}
function Bt(e) {
  return e.toLowerCase();
}
class Re {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
Re.prototype.attribute = "";
Re.prototype.booleanish = !1;
Re.prototype.boolean = !1;
Re.prototype.commaOrSpaceSeparated = !1;
Re.prototype.commaSeparated = !1;
Re.prototype.defined = !1;
Re.prototype.mustUseProperty = !1;
Re.prototype.number = !1;
Re.prototype.overloadedBoolean = !1;
Re.prototype.property = "";
Re.prototype.spaceSeparated = !1;
Re.prototype.space = void 0;
let Nl = 0;
const X = pn(), ye = pn(), Ft = pn(), T = pn(), fe = pn(), yn = pn(), Pe = pn();
function pn() {
  return 2 ** ++Nl;
}
const Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: X,
  booleanish: ye,
  commaOrSpaceSeparated: Pe,
  commaSeparated: yn,
  number: T,
  overloadedBoolean: Ft,
  spaceSeparated: fe
}, Symbol.toStringTag, { value: "Module" })), Et = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Ut)
);
class Xt extends Re {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(t, n, r, i) {
    let l = -1;
    if (super(t, n), Nr(this, "space", i), typeof r == "number")
      for (; ++l < Et.length; ) {
        const o = Et[l];
        Nr(this, Et[l], (r & Ut[o]) === Ut[o]);
      }
  }
}
Xt.prototype.defined = !0;
function Nr(e, t, n) {
  n && (e[t] = n);
}
function kn(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Xt(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), t[r] = l, n[Bt(r)] = r, n[Bt(l.attribute)] = r;
  }
  return new Mn(t, n, e.space);
}
const Li = kn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ye,
    ariaAutoComplete: null,
    ariaBusy: ye,
    ariaChecked: ye,
    ariaColCount: T,
    ariaColIndex: T,
    ariaColSpan: T,
    ariaControls: fe,
    ariaCurrent: null,
    ariaDescribedBy: fe,
    ariaDetails: null,
    ariaDisabled: ye,
    ariaDropEffect: fe,
    ariaErrorMessage: null,
    ariaExpanded: ye,
    ariaFlowTo: fe,
    ariaGrabbed: ye,
    ariaHasPopup: null,
    ariaHidden: ye,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: fe,
    ariaLevel: T,
    ariaLive: null,
    ariaModal: ye,
    ariaMultiLine: ye,
    ariaMultiSelectable: ye,
    ariaOrientation: null,
    ariaOwns: fe,
    ariaPlaceholder: null,
    ariaPosInSet: T,
    ariaPressed: ye,
    ariaReadOnly: ye,
    ariaRelevant: null,
    ariaRequired: ye,
    ariaRoleDescription: fe,
    ariaRowCount: T,
    ariaRowIndex: T,
    ariaRowSpan: T,
    ariaSelected: ye,
    ariaSetSize: T,
    ariaSort: null,
    ariaValueMax: T,
    ariaValueMin: T,
    ariaValueNow: T,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Di(e, t) {
  return t in e ? e[t] : t;
}
function Pi(e, t) {
  return Di(e, t.toLowerCase());
}
const Rl = kn({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: yn,
    acceptCharset: fe,
    accessKey: fe,
    action: null,
    allow: null,
    allowFullScreen: X,
    allowPaymentRequest: X,
    allowUserMedia: X,
    alt: null,
    as: null,
    async: X,
    autoCapitalize: null,
    autoComplete: fe,
    autoFocus: X,
    autoPlay: X,
    blocking: fe,
    capture: null,
    charSet: null,
    checked: X,
    cite: null,
    className: fe,
    cols: T,
    colSpan: null,
    content: null,
    contentEditable: ye,
    controls: X,
    controlsList: fe,
    coords: T | yn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: X,
    defer: X,
    dir: null,
    dirName: null,
    disabled: X,
    download: Ft,
    draggable: ye,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: X,
    formTarget: null,
    headers: fe,
    height: T,
    hidden: Ft,
    high: T,
    href: null,
    hrefLang: null,
    htmlFor: fe,
    httpEquiv: fe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: X,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: X,
    itemId: null,
    itemProp: fe,
    itemRef: fe,
    itemScope: X,
    itemType: fe,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: X,
    low: T,
    manifest: null,
    max: null,
    maxLength: T,
    media: null,
    method: null,
    min: null,
    minLength: T,
    multiple: X,
    muted: X,
    name: null,
    nonce: null,
    noModule: X,
    noValidate: X,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: X,
    optimum: T,
    pattern: null,
    ping: fe,
    placeholder: null,
    playsInline: X,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: X,
    referrerPolicy: null,
    rel: fe,
    required: X,
    reversed: X,
    rows: T,
    rowSpan: T,
    sandbox: fe,
    scope: null,
    scoped: X,
    seamless: X,
    selected: X,
    shadowRootClonable: X,
    shadowRootDelegatesFocus: X,
    shadowRootMode: null,
    shape: null,
    size: T,
    sizes: null,
    slot: null,
    span: T,
    spellCheck: ye,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: T,
    step: null,
    style: null,
    tabIndex: T,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: X,
    useMap: null,
    value: ye,
    width: T,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: fe,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: T,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: T,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: X,
    // Lists. Use CSS to reduce space between items instead
    declare: X,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: T,
    // `<img>` and `<object>`
    leftMargin: T,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: T,
    // `<body>`
    marginWidth: T,
    // `<body>`
    noResize: X,
    // `<frame>`
    noHref: X,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: X,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: X,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: T,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ye,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: T,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: T,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: X,
    disableRemotePlayback: X,
    prefix: null,
    property: null,
    results: T,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Pi
}), Ol = kn({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Pe,
    accentHeight: T,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: T,
    amplitude: T,
    arabicForm: null,
    ascent: T,
    attributeName: null,
    attributeType: null,
    azimuth: T,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: T,
    by: null,
    calcMode: null,
    capHeight: T,
    className: fe,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: T,
    diffuseConstant: T,
    direction: null,
    display: null,
    dur: null,
    divisor: T,
    dominantBaseline: null,
    download: X,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: T,
    enableBackground: null,
    end: null,
    event: null,
    exponent: T,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: T,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: yn,
    g2: yn,
    glyphName: yn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: T,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: T,
    horizOriginX: T,
    horizOriginY: T,
    id: null,
    ideographic: T,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: T,
    k: T,
    k1: T,
    k2: T,
    k3: T,
    k4: T,
    kernelMatrix: Pe,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: T,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: T,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: T,
    overlineThickness: T,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: T,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: fe,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: T,
    pointsAtY: T,
    pointsAtZ: T,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Pe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Pe,
    rev: Pe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Pe,
    requiredFeatures: Pe,
    requiredFonts: Pe,
    requiredFormats: Pe,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: T,
    specularExponent: T,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: T,
    strikethroughThickness: T,
    string: null,
    stroke: null,
    strokeDashArray: Pe,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: T,
    strokeOpacity: T,
    strokeWidth: null,
    style: null,
    surfaceScale: T,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Pe,
    tabIndex: T,
    tableValues: null,
    target: null,
    targetX: T,
    targetY: T,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Pe,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: T,
    underlineThickness: T,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: T,
    values: null,
    vAlphabetic: T,
    vMathematical: T,
    vectorEffect: null,
    vHanging: T,
    vIdeographic: T,
    version: null,
    vertAdvY: T,
    vertOriginX: T,
    vertOriginY: T,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: T,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Di
}), zi = kn({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Bi = kn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Pi
}), Fi = kn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), Ml = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Ll = /[A-Z]/g, Rr = /-[a-z]/g, Dl = /^data[-\w.:]+$/i;
function Pl(e, t) {
  const n = Bt(t);
  let r = t, i = Re;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Dl.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(Rr, Bl);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!Rr.test(l)) {
        let o = l.replace(Ll, zl);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Xt;
  }
  return new i(r, t);
}
function zl(e) {
  return "-" + e.toLowerCase();
}
function Bl(e) {
  return e.charAt(1).toUpperCase();
}
const Fl = Mi([Li, Rl, zi, Bi, Fi], "html"), Qt = Mi([Li, Ol, zi, Bi, Fi], "svg");
function Ul(e) {
  return e.join(" ").trim();
}
var dn = {}, wt, Or;
function $l() {
  if (Or) return wt;
  Or = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, t = /\n/g, n = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, i = /^:\s*/, l = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, o = /^[;\s]*/, a = /^\s+|\s+$/g, u = `
`, s = "/", f = "*", c = "", h = "comment", p = "declaration";
  function b(_, y) {
    if (typeof _ != "string")
      throw new TypeError("First argument must be a string");
    if (!_) return [];
    y = y || {};
    var C = 1, A = 1;
    function $(z) {
      var N = z.match(t);
      N && (C += N.length);
      var ne = z.lastIndexOf(u);
      A = ~ne ? z.length - ne : A + z.length;
    }
    function D() {
      var z = { line: C, column: A };
      return function(N) {
        return N.position = new E(z), j(), N;
      };
    }
    function E(z) {
      this.start = z, this.end = { line: C, column: A }, this.source = y.source;
    }
    E.prototype.content = _;
    function V(z) {
      var N = new Error(
        y.source + ":" + C + ":" + A + ": " + z
      );
      if (N.reason = z, N.filename = y.source, N.line = C, N.column = A, N.source = _, !y.silent) throw N;
    }
    function K(z) {
      var N = z.exec(_);
      if (N) {
        var ne = N[0];
        return $(ne), _ = _.slice(ne.length), N;
      }
    }
    function j() {
      K(n);
    }
    function x(z) {
      var N;
      for (z = z || []; N = M(); )
        N !== !1 && z.push(N);
      return z;
    }
    function M() {
      var z = D();
      if (!(s != _.charAt(0) || f != _.charAt(1))) {
        for (var N = 2; c != _.charAt(N) && (f != _.charAt(N) || s != _.charAt(N + 1)); )
          ++N;
        if (N += 2, c === _.charAt(N - 1))
          return V("End of comment missing");
        var ne = _.slice(2, N - 2);
        return A += 2, $(ne), _ = _.slice(N), A += 2, z({
          type: h,
          comment: ne
        });
      }
    }
    function P() {
      var z = D(), N = K(r);
      if (N) {
        if (M(), !K(i)) return V("property missing ':'");
        var ne = K(l), pe = z({
          type: p,
          property: k(N[0].replace(e, c)),
          value: ne ? k(ne[0].replace(e, c)) : c
        });
        return K(o), pe;
      }
    }
    function te() {
      var z = [];
      x(z);
      for (var N; N = P(); )
        N !== !1 && (z.push(N), x(z));
      return z;
    }
    return j(), te();
  }
  function k(_) {
    return _ ? _.replace(a, c) : c;
  }
  return wt = b, wt;
}
var Mr;
function Hl() {
  if (Mr) return dn;
  Mr = 1;
  var e = dn && dn.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(dn, "__esModule", { value: !0 }), dn.default = n;
  const t = e($l());
  function n(r, i) {
    let l = null;
    if (!r || typeof r != "string")
      return l;
    const o = (0, t.default)(r), a = typeof i == "function";
    return o.forEach((u) => {
      if (u.type !== "declaration")
        return;
      const { property: s, value: f } = u;
      a ? i(s, f, u) : f && (l = l || {}, l[s] = f);
    }), l;
  }
  return dn;
}
var Sn = {}, Lr;
function jl() {
  if (Lr) return Sn;
  Lr = 1, Object.defineProperty(Sn, "__esModule", { value: !0 }), Sn.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, t = /-([a-z])/g, n = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, i = /^-(ms)-/, l = function(s) {
    return !s || n.test(s) || e.test(s);
  }, o = function(s, f) {
    return f.toUpperCase();
  }, a = function(s, f) {
    return "".concat(f, "-");
  }, u = function(s, f) {
    return f === void 0 && (f = {}), l(s) ? s : (s = s.toLowerCase(), f.reactCompat ? s = s.replace(i, a) : s = s.replace(r, a), s.replace(t, o));
  };
  return Sn.camelCase = u, Sn;
}
var An, Dr;
function ql() {
  if (Dr) return An;
  Dr = 1;
  var e = An && An.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  }, t = e(Hl()), n = jl();
  function r(i, l) {
    var o = {};
    return !i || typeof i != "string" || (0, t.default)(i, function(a, u) {
      a && u && (o[(0, n.camelCase)(a, l)] = u);
    }), o;
  }
  return r.default = r, An = r, An;
}
var Gl = ql();
const Vl = /* @__PURE__ */ Zt(Gl), Ui = $i("end"), Jt = $i("start");
function $i(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Wl(e) {
  const t = Jt(e), n = Ui(e);
  if (t && n)
    return { start: t, end: n };
}
function vn(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Pr(e.position) : "start" in e || "end" in e ? Pr(e) : "line" in e || "column" in e ? $t(e) : "";
}
function $t(e) {
  return zr(e && e.line) + ":" + zr(e && e.column);
}
function Pr(e) {
  return $t(e && e.start) + "-" + $t(e && e.end);
}
function zr(e) {
  return e && typeof e == "number" ? e : 1;
}
class Te extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", l = {}, o = !1;
    if (n && ("line" in n && "column" in n ? l = { place: n } : "start" in n && "end" in n ? l = { place: n } : "type" in n ? l = {
      ancestors: [n],
      place: n.position
    } : l = { ...n }), typeof t == "string" ? i = t : !l.cause && t && (o = !0, i = t.message, l.cause = t), !l.ruleId && !l.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? l.ruleId = r : (l.source = r.slice(0, u), l.ruleId = r.slice(u + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const u = l.ancestors[l.ancestors.length - 1];
      u && (l.place = u.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = vn(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Te.prototype.file = "";
Te.prototype.name = "";
Te.prototype.reason = "";
Te.prototype.message = "";
Te.prototype.stack = "";
Te.prototype.column = void 0;
Te.prototype.line = void 0;
Te.prototype.ancestors = void 0;
Te.prototype.cause = void 0;
Te.prototype.fatal = void 0;
Te.prototype.place = void 0;
Te.prototype.ruleId = void 0;
Te.prototype.source = void 0;
const er = {}.hasOwnProperty, Kl = /* @__PURE__ */ new Map(), Zl = /[A-Z]/g, Yl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Xl = /* @__PURE__ */ new Set(["td", "th"]), Hi = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ql(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = la(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = oa(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? Qt : Fl,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, l = ji(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function ji(e, t, n) {
  if (t.type === "element")
    return Jl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return ea(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return ta(e, t, n);
  if (t.type === "mdxjsEsm")
    return na(e, t);
  if (t.type === "root")
    return ra(e, t, n);
  if (t.type === "text")
    return ia(e, t);
}
function Jl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Qt, e.schema = i), e.ancestors.push(t);
  const l = Gi(e, t.tagName, !1), o = aa(e, t);
  let a = tr(e, t);
  return Yl.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !Il(u) : !0;
  })), qi(e, o, l, t), nr(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function ea(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Rn(e, t.position);
}
function na(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Rn(e, t.position);
}
function ta(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Qt, e.schema = i), e.ancestors.push(t);
  const l = t.name === null ? e.Fragment : Gi(e, t.name, !0), o = sa(e, t), a = tr(e, t);
  return qi(e, o, l, t), nr(o, a), e.ancestors.pop(), e.schema = r, e.create(t, l, o, n);
}
function ra(e, t, n) {
  const r = {};
  return nr(r, tr(e, t)), e.create(t, e.Fragment, r, n);
}
function ia(e, t) {
  return t.value;
}
function qi(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function nr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function oa(e, t, n) {
  return r;
  function r(i, l, o, a) {
    const s = Array.isArray(o.children) ? n : t;
    return a ? s(l, o, a) : s(l, o);
  }
}
function la(e, t) {
  return n;
  function n(r, i, l, o) {
    const a = Array.isArray(l.children), u = Jt(r);
    return t(
      i,
      l,
      o,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function aa(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && er.call(t.properties, i)) {
      const l = ua(e, i, t.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Xl.has(t.tagName) ? r = a : n[o] = a;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function sa(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const a = o.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Rn(e, t.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, l = e.evaluater.evaluateExpression(a.expression);
        } else
          Rn(e, t.position);
      else
        l = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return n;
}
function tr(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Kl;
  for (; ++r < t.children.length; ) {
    const l = t.children[r];
    let o;
    if (e.passKeys) {
      const u = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (u) {
        const s = i.get(u) || 0;
        o = u + "-" + s, i.set(u, s + 1);
      }
    }
    const a = ji(e, l, o);
    a !== void 0 && n.push(a);
  }
  return n;
}
function ua(e, t, n) {
  const r = Pl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Sl(n) : Ul(n)), r.property === "style") {
      let i = typeof n == "object" ? n : ca(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = fa(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? Ml[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function ca(e, t) {
  try {
    return Vl(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new Te("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Hi + "#cannot-parse-style-attribute", i;
  }
}
function Gi(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = vr(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: a,
        computed: !!(l && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = o;
  } else
    r = vr(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return er.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Rn(e);
}
function Rn(e, t) {
  const n = new Te(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Hi + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function fa(e) {
  const t = {};
  let n;
  for (n in e)
    er.call(e, n) && (t[pa(n)] = e[n]);
  return t;
}
function pa(e) {
  let t = e.replace(Zl, ha);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function ha(e) {
  return "-" + e.toLowerCase();
}
const _t = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, ga = {};
function rr(e, t) {
  const n = ga, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Vi(e, r, i);
}
function Vi(e, t, n) {
  if (da(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Br(e.children, t, n);
  }
  return Array.isArray(e) ? Br(e, t, n) : "";
}
function Br(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Vi(e[i], t, n);
  return r.join("");
}
function da(e) {
  return !!(e && typeof e == "object");
}
const Fr = document.createElement("i");
function ir(e) {
  const t = "&" + e + ";";
  Fr.innerHTML = t;
  const n = Fr.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
function ze(e, t, n, r) {
  const i = e.length;
  let l = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(t, 0), e.splice(...o), l += 1e4, t += 1e4;
}
function Be(e, t) {
  return e.length > 0 ? (ze(e, e.length, 0, t), e) : t;
}
const Ur = {}.hasOwnProperty;
function Wi(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    ma(t, e[n]);
  return t;
}
function ma(e, t) {
  let n;
  for (n in t) {
    const i = (Ur.call(e, n) ? e[n] : void 0) || (e[n] = {}), l = t[n];
    let o;
    if (l)
      for (o in l) {
        Ur.call(i, o) || (i[o] = []);
        const a = l[o];
        ba(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function ba(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  ze(e, 0, 0, r);
}
function Ki(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function He(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ie = on(/[A-Za-z]/), Ce = on(/[\dA-Za-z]/), ya = on(/[#-'*+\--9=?A-Z^-~]/);
function Jn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Ht = on(/\d/), xa = on(/[\dA-Fa-f]/), ka = on(/[!-/:-@[-`{-~]/);
function H(e) {
  return e !== null && e < -2;
}
function ae(e) {
  return e !== null && (e < 0 || e === 32);
}
function ee(e) {
  return e === -2 || e === -1 || e === 32;
}
const rt = on(new RegExp("\\p{P}|\\p{S}", "u")), fn = on(/\s/);
function on(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function En(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && Ce(e.charCodeAt(n + 1)) && Ce(e.charCodeAt(n + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(n + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function ie(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(u) {
    return ee(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return ee(u) && l++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
const Ea = {
  tokenize: wa
};
function wa(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const u = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = u), n = u, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return H(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const _a = {
  tokenize: Sa
}, $r = {
  tokenize: Aa
};
function Sa(e) {
  const t = this, n = [];
  let r = 0, i, l, o;
  return a;
  function a(A) {
    if (r < n.length) {
      const $ = n[r];
      return t.containerState = $[1], e.attempt($[0].continuation, u, s)(A);
    }
    return s(A);
  }
  function u(A) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && C();
      const $ = t.events.length;
      let D = $, E;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          E = t.events[D][1].end;
          break;
        }
      y(r);
      let V = $;
      for (; V < t.events.length; )
        t.events[V][1].end = {
          ...E
        }, V++;
      return ze(t.events, D + 1, 0, t.events.slice($)), t.events.length = V, s(A);
    }
    return a(A);
  }
  function s(A) {
    if (r === n.length) {
      if (!i)
        return h(A);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return b(A);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check($r, f, c)(A);
  }
  function f(A) {
    return i && C(), y(r), h(A);
  }
  function c(A) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, b(A);
  }
  function h(A) {
    return t.containerState = {}, e.attempt($r, p, b)(A);
  }
  function p(A) {
    return r++, n.push([t.currentConstruct, t.containerState]), h(A);
  }
  function b(A) {
    if (A === null) {
      i && C(), y(0), e.consume(A);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), k(A);
  }
  function k(A) {
    if (A === null) {
      _(e.exit("chunkFlow"), !0), y(0), e.consume(A);
      return;
    }
    return H(A) ? (e.consume(A), _(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(A), k);
  }
  function _(A, $) {
    const D = t.sliceStream(A);
    if ($ && D.push(null), A.previous = l, l && (l.next = A), l = A, i.defineSkip(A.start), i.write(D), t.parser.lazy[A.start.line]) {
      let E = i.events.length;
      for (; E--; )
        if (
          // The token starts before the line ending…
          i.events[E][1].start.offset < o && // …and either is not ended yet…
          (!i.events[E][1].end || // …or ends after it.
          i.events[E][1].end.offset > o)
        )
          return;
      const V = t.events.length;
      let K = V, j, x;
      for (; K--; )
        if (t.events[K][0] === "exit" && t.events[K][1].type === "chunkFlow") {
          if (j) {
            x = t.events[K][1].end;
            break;
          }
          j = !0;
        }
      for (y(r), E = V; E < t.events.length; )
        t.events[E][1].end = {
          ...x
        }, E++;
      ze(t.events, K + 1, 0, t.events.slice(V)), t.events.length = E;
    }
  }
  function y(A) {
    let $ = n.length;
    for (; $-- > A; ) {
      const D = n[$];
      t.containerState = D[1], D[0].exit.call(t, e);
    }
    n.length = A;
  }
  function C() {
    i.write([null]), l = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Aa(e, t, n) {
  return ie(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function xn(e) {
  if (e === null || ae(e) || fn(e))
    return 1;
  if (rt(e))
    return 2;
}
function it(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (t = l(t, n), r.push(l));
  }
  return t;
}
const jt = {
  name: "attention",
  resolveAll: Ca,
  tokenize: Ta
};
function Ca(e, t) {
  let n = -1, r, i, l, o, a, u, s, f;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          u = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, h = {
            ...e[n][1].start
          };
          Hr(c, -u), Hr(h, u), o = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: h
          }, l = {
            type: u > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: u > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...a.end
          }, s = [], e[r][1].end.offset - e[r][1].start.offset && (s = Be(s, [["enter", e[r][1], t], ["exit", e[r][1], t]])), s = Be(s, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", l, t]]), s = Be(s, it(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), s = Be(s, [["exit", l, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (f = 2, s = Be(s, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : f = 0, ze(e, r - 1, n - r + 3, s), n = r + s.length - f - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Ta(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = xn(r);
  let l;
  return o;
  function o(u) {
    return l = u, e.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === l)
      return e.consume(u), a;
    const s = e.exit("attentionSequence"), f = xn(u), c = !f || f === 2 && i || n.includes(u), h = !i || i === 2 && f || n.includes(r);
    return s._open = !!(l === 42 ? c : c && (i || !h)), s._close = !!(l === 42 ? h : h && (f || !c)), t(u);
  }
}
function Hr(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const va = {
  name: "autolink",
  tokenize: Ia
};
function Ia(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return Ie(p) ? (e.consume(p), o) : p === 64 ? n(p) : s(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || Ce(p) ? (r = 1, a(p)) : s(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, u) : (p === 43 || p === 45 || p === 46 || Ce(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, s(p));
  }
  function u(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || Jn(p) ? n(p) : (e.consume(p), u);
  }
  function s(p) {
    return p === 64 ? (e.consume(p), f) : ya(p) ? (e.consume(p), s) : n(p);
  }
  function f(p) {
    return Ce(p) ? c(p) : n(p);
  }
  function c(p) {
    return p === 46 ? (e.consume(p), r = 0, f) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : h(p);
  }
  function h(p) {
    if ((p === 45 || Ce(p)) && r++ < 63) {
      const b = p === 45 ? h : c;
      return e.consume(p), b;
    }
    return n(p);
  }
}
const Ln = {
  partial: !0,
  tokenize: Na
};
function Na(e, t, n) {
  return r;
  function r(l) {
    return ee(l) ? ie(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || H(l) ? t(l) : n(l);
  }
}
const Zi = {
  continuation: {
    tokenize: Oa
  },
  exit: Ma,
  name: "blockQuote",
  tokenize: Ra
};
function Ra(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return n(o);
  }
  function l(o) {
    return ee(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function Oa(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return ee(o) ? ie(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(Zi, t, n)(o);
  }
}
function Ma(e) {
  e.exit("blockQuote");
}
const Yi = {
  name: "characterEscape",
  tokenize: La
};
function La(e, t, n) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return ka(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(l);
  }
}
const Xi = {
  name: "characterReference",
  tokenize: Da
};
function Da(e, t, n) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), u;
  }
  function u(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), l = 31, o = Ce, f(c));
  }
  function s(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = xa, f) : (e.enter("characterReferenceValue"), l = 7, o = Ht, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const h = e.exit("characterReferenceValue");
      return o === Ce && !ir(r.sliceSerialize(h)) ? n(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(c) && i++ < l ? (e.consume(c), f) : n(c);
  }
}
const jr = {
  partial: !0,
  tokenize: za
}, qr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Pa
};
function Pa(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: D
  };
  let l = 0, o = 0, a;
  return u;
  function u(E) {
    return s(E);
  }
  function s(E) {
    const V = r.events[r.events.length - 1];
    return l = V && V[1].type === "linePrefix" ? V[2].sliceSerialize(V[1], !0).length : 0, a = E, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(E);
  }
  function f(E) {
    return E === a ? (o++, e.consume(E), f) : o < 3 ? n(E) : (e.exit("codeFencedFenceSequence"), ee(E) ? ie(e, c, "whitespace")(E) : c(E));
  }
  function c(E) {
    return E === null || H(E) ? (e.exit("codeFencedFence"), r.interrupt ? t(E) : e.check(jr, k, $)(E)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(E));
  }
  function h(E) {
    return E === null || H(E) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(E)) : ee(E) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ie(e, p, "whitespace")(E)) : E === 96 && E === a ? n(E) : (e.consume(E), h);
  }
  function p(E) {
    return E === null || H(E) ? c(E) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), b(E));
  }
  function b(E) {
    return E === null || H(E) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(E)) : E === 96 && E === a ? n(E) : (e.consume(E), b);
  }
  function k(E) {
    return e.attempt(i, $, _)(E);
  }
  function _(E) {
    return e.enter("lineEnding"), e.consume(E), e.exit("lineEnding"), y;
  }
  function y(E) {
    return l > 0 && ee(E) ? ie(e, C, "linePrefix", l + 1)(E) : C(E);
  }
  function C(E) {
    return E === null || H(E) ? e.check(jr, k, $)(E) : (e.enter("codeFlowValue"), A(E));
  }
  function A(E) {
    return E === null || H(E) ? (e.exit("codeFlowValue"), C(E)) : (e.consume(E), A);
  }
  function $(E) {
    return e.exit("codeFenced"), t(E);
  }
  function D(E, V, K) {
    let j = 0;
    return x;
    function x(N) {
      return E.enter("lineEnding"), E.consume(N), E.exit("lineEnding"), M;
    }
    function M(N) {
      return E.enter("codeFencedFence"), ee(N) ? ie(E, P, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(N) : P(N);
    }
    function P(N) {
      return N === a ? (E.enter("codeFencedFenceSequence"), te(N)) : K(N);
    }
    function te(N) {
      return N === a ? (j++, E.consume(N), te) : j >= o ? (E.exit("codeFencedFenceSequence"), ee(N) ? ie(E, z, "whitespace")(N) : z(N)) : K(N);
    }
    function z(N) {
      return N === null || H(N) ? (E.exit("codeFencedFence"), V(N)) : K(N);
    }
  }
}
function za(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const St = {
  name: "codeIndented",
  tokenize: Fa
}, Ba = {
  partial: !0,
  tokenize: Ua
};
function Fa(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("codeIndented"), ie(e, l, "linePrefix", 5)(s);
  }
  function l(s) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? o(s) : n(s);
  }
  function o(s) {
    return s === null ? u(s) : H(s) ? e.attempt(Ba, o, u)(s) : (e.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || H(s) ? (e.exit("codeFlowValue"), o(s)) : (e.consume(s), a);
  }
  function u(s) {
    return e.exit("codeIndented"), t(s);
  }
}
function Ua(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : H(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : ie(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : H(o) ? i(o) : n(o);
  }
}
const $a = {
  name: "codeText",
  previous: ja,
  resolve: Ha,
  tokenize: qa
};
function Ha(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function ja(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function qa(e, t, n) {
  let r = 0, i, l;
  return o;
  function o(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === null ? n(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), u) : c === 96 ? (l = e.enter("codeTextSequence"), i = 0, f(c)) : H(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), u) : (e.enter("codeTextData"), s(c));
  }
  function s(c) {
    return c === null || c === 32 || c === 96 || H(c) ? (e.exit("codeTextData"), u(c)) : (e.consume(c), s);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(c)) : (l.type = "codeTextData", s(c));
  }
}
class Ga {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Cn(this.left, r), l.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Cn(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), Cn(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Cn(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Cn(this.left, n.reverse());
      }
  }
}
function Cn(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Qi(e) {
  const t = {};
  let n = -1, r, i, l, o, a, u, s;
  const f = new Ga(e);
  for (; ++n < f.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, l = 0, l < u.length && u[l][1].type === "lineEndingBlank" && (l += 2), l < u.length && u[l][1].type === "content"))
      for (; ++l < u.length && u[l][1].type !== "content"; )
        u[l][1].type === "chunkText" && (u[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Va(f, n)), n = t[n], s = !0);
    else if (r[1]._container) {
      for (l = n, i = void 0; l--; )
        if (o = f.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return ze(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !s;
}
function Va(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, u = [], s = {};
  let f, c, h = -1, p = n, b = 0, k = 0;
  const _ = [k];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (f = r.sliceStream(p), p.next || f.push(null), c && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(f), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = n; ++h < a.length; )
    // Find a void token that includes a break.
    a[h][0] === "exit" && a[h - 1][0] === "enter" && a[h][1].type === a[h - 1][1].type && a[h][1].start.line !== a[h][1].end.line && (k = h + 1, _.push(k), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : _.pop(), h = _.length; h--; ) {
    const y = a.slice(_[h], _[h + 1]), C = l.pop();
    u.push([C, C + y.length - 1]), e.splice(C, 2, y);
  }
  for (u.reverse(), h = -1; ++h < u.length; )
    s[b + u[h][0]] = b + u[h][1], b += u[h][1] - u[h][0] - 1;
  return s;
}
const Wa = {
  resolve: Za,
  tokenize: Ya
}, Ka = {
  partial: !0,
  tokenize: Xa
};
function Za(e) {
  return Qi(e), e;
}
function Ya(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : H(a) ? e.check(Ka, o, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Xa(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ie(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || H(o))
      return n(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Ji(e, t, n, r, i, l, o, a, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(y), e.exit(l), h) : y === null || y === 32 || y === 41 || Jn(y) ? n(y) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(y));
  }
  function h(y) {
    return y === 62 ? (e.enter(l), e.consume(y), e.exit(l), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(y));
  }
  function p(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(a), h(y)) : y === null || y === 60 || H(y) ? n(y) : (e.consume(y), y === 92 ? b : p);
  }
  function b(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), p) : p(y);
  }
  function k(y) {
    return !f && (y === null || y === 41 || ae(y)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), t(y)) : f < s && y === 40 ? (e.consume(y), f++, k) : y === 41 ? (e.consume(y), f--, k) : y === null || y === 32 || y === 40 || Jn(y) ? n(y) : (e.consume(y), y === 92 ? _ : k);
  }
  function _(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), k) : k(y);
  }
}
function eo(e, t, n, r, i, l) {
  const o = this;
  let a = 0, u;
  return s;
  function s(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), f;
  }
  function f(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : H(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || H(p) || a++ > 999 ? (e.exit("chunkString"), f(p)) : (e.consume(p), u || (u = !ee(p)), p === 92 ? h : c);
  }
  function h(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, c) : c(p);
  }
}
function no(e, t, n, r, i, l) {
  let o;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(i), e.consume(h), e.exit(i), o = h === 40 ? 41 : h, u) : n(h);
  }
  function u(h) {
    return h === o ? (e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : (e.enter(l), s(h));
  }
  function s(h) {
    return h === o ? (e.exit(l), u(o)) : h === null ? n(h) : H(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), ie(e, s, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === o || h === null || H(h) ? (e.exit("chunkString"), s(h)) : (e.consume(h), h === 92 ? c : f);
  }
  function c(h) {
    return h === o || h === 92 ? (e.consume(h), f) : f(h);
  }
}
function In(e, t) {
  let n;
  return r;
  function r(i) {
    return H(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : ee(i) ? ie(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Qa = {
  name: "definition",
  tokenize: es
}, Ja = {
  partial: !0,
  tokenize: ns
};
function es(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return eo.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = He(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), u) : n(p);
  }
  function u(p) {
    return ae(p) ? In(e, s)(p) : s(p);
  }
  function s(p) {
    return Ji(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function f(p) {
    return e.attempt(Ja, c, c)(p);
  }
  function c(p) {
    return ee(p) ? ie(e, h, "whitespace")(p) : h(p);
  }
  function h(p) {
    return p === null || H(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function ns(e, t, n) {
  return r;
  function r(a) {
    return ae(a) ? In(e, i)(a) : n(a);
  }
  function i(a) {
    return no(e, l, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return ee(a) ? ie(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || H(a) ? t(a) : n(a);
  }
}
const ts = {
  name: "hardBreakEscape",
  tokenize: rs
};
function rs(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return H(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const is = {
  name: "headingAtx",
  resolve: os,
  tokenize: ls
};
function os(e, t) {
  let n = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, ze(e, r, n - r + 1, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]])), e;
}
function ls(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), l(f);
  }
  function l(f) {
    return e.enter("atxHeadingSequence"), o(f);
  }
  function o(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), o) : f === null || ae(f) ? (e.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), u(f)) : f === null || H(f) ? (e.exit("atxHeading"), t(f)) : ee(f) ? ie(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), s(f));
  }
  function u(f) {
    return f === 35 ? (e.consume(f), u) : (e.exit("atxHeadingSequence"), a(f));
  }
  function s(f) {
    return f === null || f === 35 || ae(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), s);
  }
}
const as = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Gr = ["pre", "script", "style", "textarea"], ss = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: fs,
  tokenize: ps
}, us = {
  partial: !0,
  tokenize: gs
}, cs = {
  partial: !0,
  tokenize: hs
};
function fs(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function ps(e, t, n) {
  const r = this;
  let i, l, o, a, u;
  return s;
  function s(m) {
    return f(m);
  }
  function f(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), c;
  }
  function c(m) {
    return m === 33 ? (e.consume(m), h) : m === 47 ? (e.consume(m), l = !0, k) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? t : g) : Ie(m) ? (e.consume(m), o = String.fromCharCode(m), _) : n(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), i = 2, p) : m === 91 ? (e.consume(m), i = 5, a = 0, b) : Ie(m) ? (e.consume(m), i = 4, r.interrupt ? t : g) : n(m);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? t : g) : n(m);
  }
  function b(m) {
    const Oe = "CDATA[";
    return m === Oe.charCodeAt(a++) ? (e.consume(m), a === Oe.length ? r.interrupt ? t : P : b) : n(m);
  }
  function k(m) {
    return Ie(m) ? (e.consume(m), o = String.fromCharCode(m), _) : n(m);
  }
  function _(m) {
    if (m === null || m === 47 || m === 62 || ae(m)) {
      const Oe = m === 47, Ke = o.toLowerCase();
      return !Oe && !l && Gr.includes(Ke) ? (i = 1, r.interrupt ? t(m) : P(m)) : as.includes(o.toLowerCase()) ? (i = 6, Oe ? (e.consume(m), y) : r.interrupt ? t(m) : P(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(m) : l ? C(m) : A(m));
    }
    return m === 45 || Ce(m) ? (e.consume(m), o += String.fromCharCode(m), _) : n(m);
  }
  function y(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? t : P) : n(m);
  }
  function C(m) {
    return ee(m) ? (e.consume(m), C) : x(m);
  }
  function A(m) {
    return m === 47 ? (e.consume(m), x) : m === 58 || m === 95 || Ie(m) ? (e.consume(m), $) : ee(m) ? (e.consume(m), A) : x(m);
  }
  function $(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || Ce(m) ? (e.consume(m), $) : D(m);
  }
  function D(m) {
    return m === 61 ? (e.consume(m), E) : ee(m) ? (e.consume(m), D) : A(m);
  }
  function E(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? n(m) : m === 34 || m === 39 ? (e.consume(m), u = m, V) : ee(m) ? (e.consume(m), E) : K(m);
  }
  function V(m) {
    return m === u ? (e.consume(m), u = null, j) : m === null || H(m) ? n(m) : (e.consume(m), V);
  }
  function K(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || ae(m) ? D(m) : (e.consume(m), K);
  }
  function j(m) {
    return m === 47 || m === 62 || ee(m) ? A(m) : n(m);
  }
  function x(m) {
    return m === 62 ? (e.consume(m), M) : n(m);
  }
  function M(m) {
    return m === null || H(m) ? P(m) : ee(m) ? (e.consume(m), M) : n(m);
  }
  function P(m) {
    return m === 45 && i === 2 ? (e.consume(m), ne) : m === 60 && i === 1 ? (e.consume(m), pe) : m === 62 && i === 4 ? (e.consume(m), ge) : m === 63 && i === 3 ? (e.consume(m), g) : m === 93 && i === 5 ? (e.consume(m), he) : H(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(us, ke, te)(m)) : m === null || H(m) ? (e.exit("htmlFlowData"), te(m)) : (e.consume(m), P);
  }
  function te(m) {
    return e.check(cs, z, ke)(m);
  }
  function z(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), N;
  }
  function N(m) {
    return m === null || H(m) ? te(m) : (e.enter("htmlFlowData"), P(m));
  }
  function ne(m) {
    return m === 45 ? (e.consume(m), g) : P(m);
  }
  function pe(m) {
    return m === 47 ? (e.consume(m), o = "", Y) : P(m);
  }
  function Y(m) {
    if (m === 62) {
      const Oe = o.toLowerCase();
      return Gr.includes(Oe) ? (e.consume(m), ge) : P(m);
    }
    return Ie(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), Y) : P(m);
  }
  function he(m) {
    return m === 93 ? (e.consume(m), g) : P(m);
  }
  function g(m) {
    return m === 62 ? (e.consume(m), ge) : m === 45 && i === 2 ? (e.consume(m), g) : P(m);
  }
  function ge(m) {
    return m === null || H(m) ? (e.exit("htmlFlowData"), ke(m)) : (e.consume(m), ge);
  }
  function ke(m) {
    return e.exit("htmlFlow"), t(m);
  }
}
function hs(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return H(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function gs(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Ln, t, n);
  }
}
const ds = {
  name: "htmlText",
  tokenize: ms
};
function ms(e, t, n) {
  const r = this;
  let i, l, o;
  return a;
  function a(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), u;
  }
  function u(g) {
    return g === 33 ? (e.consume(g), s) : g === 47 ? (e.consume(g), D) : g === 63 ? (e.consume(g), A) : Ie(g) ? (e.consume(g), K) : n(g);
  }
  function s(g) {
    return g === 45 ? (e.consume(g), f) : g === 91 ? (e.consume(g), l = 0, b) : Ie(g) ? (e.consume(g), C) : n(g);
  }
  function f(g) {
    return g === 45 ? (e.consume(g), p) : n(g);
  }
  function c(g) {
    return g === null ? n(g) : g === 45 ? (e.consume(g), h) : H(g) ? (o = c, pe(g)) : (e.consume(g), c);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), p) : c(g);
  }
  function p(g) {
    return g === 62 ? ne(g) : g === 45 ? h(g) : c(g);
  }
  function b(g) {
    const ge = "CDATA[";
    return g === ge.charCodeAt(l++) ? (e.consume(g), l === ge.length ? k : b) : n(g);
  }
  function k(g) {
    return g === null ? n(g) : g === 93 ? (e.consume(g), _) : H(g) ? (o = k, pe(g)) : (e.consume(g), k);
  }
  function _(g) {
    return g === 93 ? (e.consume(g), y) : k(g);
  }
  function y(g) {
    return g === 62 ? ne(g) : g === 93 ? (e.consume(g), y) : k(g);
  }
  function C(g) {
    return g === null || g === 62 ? ne(g) : H(g) ? (o = C, pe(g)) : (e.consume(g), C);
  }
  function A(g) {
    return g === null ? n(g) : g === 63 ? (e.consume(g), $) : H(g) ? (o = A, pe(g)) : (e.consume(g), A);
  }
  function $(g) {
    return g === 62 ? ne(g) : A(g);
  }
  function D(g) {
    return Ie(g) ? (e.consume(g), E) : n(g);
  }
  function E(g) {
    return g === 45 || Ce(g) ? (e.consume(g), E) : V(g);
  }
  function V(g) {
    return H(g) ? (o = V, pe(g)) : ee(g) ? (e.consume(g), V) : ne(g);
  }
  function K(g) {
    return g === 45 || Ce(g) ? (e.consume(g), K) : g === 47 || g === 62 || ae(g) ? j(g) : n(g);
  }
  function j(g) {
    return g === 47 ? (e.consume(g), ne) : g === 58 || g === 95 || Ie(g) ? (e.consume(g), x) : H(g) ? (o = j, pe(g)) : ee(g) ? (e.consume(g), j) : ne(g);
  }
  function x(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ce(g) ? (e.consume(g), x) : M(g);
  }
  function M(g) {
    return g === 61 ? (e.consume(g), P) : H(g) ? (o = M, pe(g)) : ee(g) ? (e.consume(g), M) : j(g);
  }
  function P(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), i = g, te) : H(g) ? (o = P, pe(g)) : ee(g) ? (e.consume(g), P) : (e.consume(g), z);
  }
  function te(g) {
    return g === i ? (e.consume(g), i = void 0, N) : g === null ? n(g) : H(g) ? (o = te, pe(g)) : (e.consume(g), te);
  }
  function z(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? n(g) : g === 47 || g === 62 || ae(g) ? j(g) : (e.consume(g), z);
  }
  function N(g) {
    return g === 47 || g === 62 || ae(g) ? j(g) : n(g);
  }
  function ne(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(g);
  }
  function pe(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), Y;
  }
  function Y(g) {
    return ee(g) ? ie(e, he, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : he(g);
  }
  function he(g) {
    return e.enter("htmlTextData"), o(g);
  }
}
const or = {
  name: "labelEnd",
  resolveAll: ks,
  resolveTo: Es,
  tokenize: ws
}, bs = {
  tokenize: _s
}, ys = {
  tokenize: Ss
}, xs = {
  tokenize: As
};
function ks(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && ze(e, 0, e.length, n), e;
}
function Es(e, t) {
  let n = e.length, r = 0, i, l, o, a;
  for (; n--; )
    if (i = e[n][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
  const u = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return a = [["enter", u, t], ["enter", s, t]], a = Be(a, e.slice(l + 1, l + r + 3)), a = Be(a, [["enter", f, t]]), a = Be(a, it(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t)), a = Be(a, [["exit", f, t], e[o - 2], e[o - 1], ["exit", s, t]]), a = Be(a, e.slice(o + 1)), a = Be(a, [["exit", u, t]]), ze(e, l, e.length, a), e;
}
function ws(e, t, n) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(h) {
    return l ? l._inactive ? c(h) : (o = r.parser.defined.includes(He(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), u) : n(h);
  }
  function u(h) {
    return h === 40 ? e.attempt(bs, f, o ? f : c)(h) : h === 91 ? e.attempt(ys, f, o ? s : c)(h) : o ? f(h) : c(h);
  }
  function s(h) {
    return e.attempt(xs, f, c)(h);
  }
  function f(h) {
    return t(h);
  }
  function c(h) {
    return l._balanced = !0, n(h);
  }
}
function _s(e, t, n) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return ae(c) ? In(e, l)(c) : l(c);
  }
  function l(c) {
    return c === 41 ? f(c) : Ji(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function o(c) {
    return ae(c) ? In(e, u)(c) : f(c);
  }
  function a(c) {
    return n(c);
  }
  function u(c) {
    return c === 34 || c === 39 || c === 40 ? no(e, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function s(c) {
    return ae(c) ? In(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), t) : n(c);
  }
}
function Ss(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return eo.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(He(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function As(e, t, n) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), t) : n(l);
  }
}
const Cs = {
  name: "labelStartImage",
  resolveAll: or.resolveAll,
  tokenize: Ts
};
function Ts(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : n(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const vs = {
  name: "labelStartLink",
  resolveAll: or.resolveAll,
  tokenize: Is
};
function Is(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const At = {
  name: "lineEnding",
  tokenize: Ns
};
function Ns(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
}
const Xn = {
  name: "thematicBreak",
  tokenize: Rs
};
function Rs(e, t, n) {
  let r = 0, i;
  return l;
  function l(s) {
    return e.enter("thematicBreak"), o(s);
  }
  function o(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (e.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || H(s)) ? (e.exit("thematicBreak"), t(s)) : n(s);
  }
  function u(s) {
    return s === i ? (e.consume(s), r++, u) : (e.exit("thematicBreakSequence"), ee(s) ? ie(e, a, "whitespace")(s) : a(s));
  }
}
const Ne = {
  continuation: {
    tokenize: Ds
  },
  exit: zs,
  name: "list",
  tokenize: Ls
}, Os = {
  partial: !0,
  tokenize: Bs
}, Ms = {
  partial: !0,
  tokenize: Ps
};
function Ls(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const b = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (b === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Ht(p)) {
      if (r.containerState.type || (r.containerState.type = b, e.enter(b, {
        _container: !0
      })), b === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Xn, n, s)(p) : s(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), u(p);
    }
    return n(p);
  }
  function u(p) {
    return Ht(p) && ++o < 10 ? (e.consume(p), u) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), s(p)) : n(p);
  }
  function s(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Ln,
      // Can’t be empty when interrupting.
      r.interrupt ? n : f,
      e.attempt(Os, h, c)
    );
  }
  function f(p) {
    return r.containerState.initialBlankLine = !0, l++, h(p);
  }
  function c(p) {
    return ee(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), h) : n(p);
  }
  function h(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Ds(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Ln, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ie(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !ee(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ms, t, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ie(e, e.attempt(Ne, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Ps(e, t, n) {
  const r = this;
  return ie(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(l) : n(l);
  }
}
function zs(e) {
  e.exit(this.containerState.type);
}
function Bs(e, t, n) {
  const r = this;
  return ie(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !ee(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const Vr = {
  name: "setextUnderline",
  resolveTo: Fs,
  tokenize: Us
};
function Fs(e, t) {
  let n = e.length, r, i, l;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !l && e[n][1].type === "definition" && (l = n);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, t]), e.splice(l + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function Us(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(s) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = s, o(s)) : n(s);
  }
  function o(s) {
    return e.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === i ? (e.consume(s), a) : (e.exit("setextHeadingLineSequence"), ee(s) ? ie(e, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || H(s) ? (e.exit("setextHeadingLine"), t(s)) : n(s);
  }
}
const $s = {
  tokenize: Hs
};
function Hs(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Ln,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, ie(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Wa, i)), "linePrefix"))
  );
  return n;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const js = {
  resolveAll: ro()
}, qs = to("string"), Gs = to("text");
function to(e) {
  return {
    resolveAll: ro(e === "text" ? Vs : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], l = n.attempt(i, o, a);
    return o;
    function o(f) {
      return s(f) ? l(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return n.enter("data"), n.consume(f), u;
    }
    function u(f) {
      return s(f) ? (n.exit("data"), l(f)) : (n.consume(f), u);
    }
    function s(f) {
      if (f === null)
        return !0;
      const c = i[f];
      let h = -1;
      if (c)
        for (; ++h < c.length; ) {
          const p = c[h];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ro(e) {
  return t;
  function t(n, r) {
    let i = -1, l;
    for (; ++i <= n.length; )
      l === void 0 ? n[i] && n[i][1].type === "data" && (l = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== l + 2 && (n[l][1].end = n[i - 1][1].end, n.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(n, r) : n;
  }
}
function Vs(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let l = i.length, o = -1, a = 0, u;
      for (; l--; ) {
        const s = i[l];
        if (typeof s == "string") {
          for (o = s.length; s.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o) break;
          o = -1;
        } else if (s === -2)
          u = !0, a++;
        else if (s !== -1) {
          l++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const s = {
          type: n === e.length || u || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (e.splice(n, 0, ["enter", s, t], ["exit", s, t]), n += 2);
      }
      n++;
    }
  return e;
}
const Ws = {
  42: Ne,
  43: Ne,
  45: Ne,
  48: Ne,
  49: Ne,
  50: Ne,
  51: Ne,
  52: Ne,
  53: Ne,
  54: Ne,
  55: Ne,
  56: Ne,
  57: Ne,
  62: Zi
}, Ks = {
  91: Qa
}, Zs = {
  [-2]: St,
  [-1]: St,
  32: St
}, Ys = {
  35: is,
  42: Xn,
  45: [Vr, Xn],
  60: ss,
  61: Vr,
  95: Xn,
  96: qr,
  126: qr
}, Xs = {
  38: Xi,
  92: Yi
}, Qs = {
  [-5]: At,
  [-4]: At,
  [-3]: At,
  33: Cs,
  38: Xi,
  42: jt,
  60: [va, ds],
  91: vs,
  92: [ts, Yi],
  93: or,
  95: jt,
  96: $a
}, Js = {
  null: [jt, js]
}, eu = {
  null: [42, 95]
}, nu = {
  null: []
}, tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: eu,
  contentInitial: Ks,
  disable: nu,
  document: Ws,
  flow: Ys,
  flowInitial: Zs,
  insideSpan: Js,
  string: Xs,
  text: Qs
}, Symbol.toStringTag, { value: "Module" }));
function ru(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, l = [];
  let o = [], a = [];
  const u = {
    attempt: V(D),
    check: V(E),
    consume: C,
    enter: A,
    exit: $,
    interrupt: V(E, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: b,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: p,
    write: c
  };
  let f = t.tokenize.call(s, u);
  return t.resolveAll && l.push(t), s;
  function c(M) {
    return o = Be(o, M), _(), o[o.length - 1] !== null ? [] : (K(t, 0), s.events = it(l, s.events, s), s.events);
  }
  function h(M, P) {
    return ou(p(M), P);
  }
  function p(M) {
    return iu(o, M);
  }
  function b() {
    const {
      _bufferIndex: M,
      _index: P,
      line: te,
      column: z,
      offset: N
    } = r;
    return {
      _bufferIndex: M,
      _index: P,
      line: te,
      column: z,
      offset: N
    };
  }
  function k(M) {
    i[M.line] = M.column, x();
  }
  function _() {
    let M;
    for (; r._index < o.length; ) {
      const P = o[r._index];
      if (typeof P == "string")
        for (M = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === M && r._bufferIndex < P.length; )
          y(P.charCodeAt(r._bufferIndex));
      else
        y(P);
    }
  }
  function y(M) {
    f = f(M);
  }
  function C(M) {
    H(M) ? (r.line++, r.column = 1, r.offset += M === -3 ? 2 : 1, x()) : M !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = M;
  }
  function A(M, P) {
    const te = P || {};
    return te.type = M, te.start = b(), s.events.push(["enter", te, s]), a.push(te), te;
  }
  function $(M) {
    const P = a.pop();
    return P.end = b(), s.events.push(["exit", P, s]), P;
  }
  function D(M, P) {
    K(M, P.from);
  }
  function E(M, P) {
    P.restore();
  }
  function V(M, P) {
    return te;
    function te(z, N, ne) {
      let pe, Y, he, g;
      return Array.isArray(z) ? (
        /* c8 ignore next 1 */
        ke(z)
      ) : "tokenize" in z ? (
        // Looks like a construct.
        ke([
          /** @type {Construct} */
          z
        ])
      ) : ge(z);
      function ge(Ee) {
        return ln;
        function ln(je) {
          const an = je !== null && Ee[je], Fe = je !== null && Ee.null, hn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(an) ? an : an ? [an] : [],
            ...Array.isArray(Fe) ? Fe : Fe ? [Fe] : []
          ];
          return ke(hn)(je);
        }
      }
      function ke(Ee) {
        return pe = Ee, Y = 0, Ee.length === 0 ? ne : m(Ee[Y]);
      }
      function m(Ee) {
        return ln;
        function ln(je) {
          return g = j(), he = Ee, Ee.partial || (s.currentConstruct = Ee), Ee.name && s.parser.constructs.disable.null.includes(Ee.name) ? Ke() : Ee.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            P ? Object.assign(Object.create(s), P) : s,
            u,
            Oe,
            Ke
          )(je);
        }
      }
      function Oe(Ee) {
        return M(he, g), N;
      }
      function Ke(Ee) {
        return g.restore(), ++Y < pe.length ? m(pe[Y]) : ne;
      }
    }
  }
  function K(M, P) {
    M.resolveAll && !l.includes(M) && l.push(M), M.resolve && ze(s.events, P, s.events.length - P, M.resolve(s.events.slice(P), s)), M.resolveTo && (s.events = M.resolveTo(s.events, s));
  }
  function j() {
    const M = b(), P = s.previous, te = s.currentConstruct, z = s.events.length, N = Array.from(a);
    return {
      from: z,
      restore: ne
    };
    function ne() {
      r = M, s.previous = P, s.currentConstruct = te, s.events.length = z, a = N, x();
    }
  }
  function x() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function iu(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, l = t.end._bufferIndex;
  let o;
  if (n === i)
    o = [e[n].slice(r, l)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function ou(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const l = e[n];
    let o;
    if (typeof l == "string")
      o = l;
    else switch (l) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(l);
    }
    i = l === -2, r.push(o);
  }
  return r.join("");
}
function lu(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Wi([tu, ...(e || {}).extensions || []])
    ),
    content: i(Ea),
    defined: [],
    document: i(_a),
    flow: i($s),
    lazy: {},
    string: i(qs),
    text: i(Gs)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return ru(r, l, a);
    }
  }
}
function au(e) {
  for (; !Qi(e); )
    ;
  return e;
}
const Wr = /[\0\t\n\r]/g;
function su() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(l, o, a) {
    const u = [];
    let s, f, c, h, p;
    for (l = t + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), c = 0, t = "", n && (l.charCodeAt(0) === 65279 && c++, n = void 0); c < l.length; ) {
      if (Wr.lastIndex = c, s = Wr.exec(l), h = s && s.index !== void 0 ? s.index : l.length, p = l.charCodeAt(h), !s) {
        t = l.slice(c);
        break;
      }
      if (p === 10 && c === h && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), c < h && (u.push(l.slice(c, h)), e += h - c), p) {
          case 0: {
            u.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, u.push(-2); e++ < f; ) u.push(-1);
            break;
          }
          case 10: {
            u.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = h + 1;
    }
    return a && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const uu = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function cu(e) {
  return e.replace(uu, fu);
}
function fu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), l = i === 120 || i === 88;
    return Ki(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return ir(n) || e;
}
const io = {}.hasOwnProperty;
function pu(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), hu(n)(au(lu(n).document().write(su()(e, t, !0))));
}
function hu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Fn),
      autolinkProtocol: j,
      autolinkEmail: j,
      atxHeading: l(Pn),
      blockQuote: l(Fe),
      characterEscape: j,
      characterReference: j,
      codeFenced: l(hn),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(hn, o),
      codeText: l(st, o),
      codeTextData: j,
      data: j,
      codeFlowValue: j,
      definition: l(ut),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(ct),
      hardBreakEscape: l(zn),
      hardBreakTrailing: l(zn),
      htmlFlow: l(Bn, o),
      htmlFlowData: j,
      htmlText: l(Bn, o),
      htmlTextData: j,
      image: l(ft),
      label: o,
      link: l(Fn),
      listItem: l(pt),
      listItemValue: h,
      listOrdered: l(wn, c),
      listUnordered: l(wn),
      paragraph: l(ht),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Pn),
      strong: l(Un),
      thematicBreak: l($n)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: D,
      autolink: u(),
      autolinkEmail: an,
      autolinkProtocol: je,
      blockQuote: u(),
      characterEscapeValue: x,
      characterReferenceMarkerHexadecimal: Ke,
      characterReferenceMarkerNumeric: Ke,
      characterReferenceValue: Ee,
      characterReference: ln,
      codeFenced: u(_),
      codeFencedFence: k,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: b,
      codeFlowValue: x,
      codeIndented: u(y),
      codeText: u(N),
      codeTextData: x,
      data: x,
      definition: u(),
      definitionDestinationString: $,
      definitionLabelString: C,
      definitionTitleString: A,
      emphasis: u(),
      hardBreakEscape: u(P),
      hardBreakTrailing: u(P),
      htmlFlow: u(te),
      htmlFlowData: x,
      htmlText: u(z),
      htmlTextData: x,
      image: u(pe),
      label: he,
      labelText: Y,
      lineEnding: M,
      link: u(ne),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: Oe,
      resourceDestinationString: g,
      resourceTitleString: ge,
      resource: ke,
      setextHeading: u(K),
      setextHeadingLineSequence: V,
      setextHeadingText: E,
      strong: u(),
      thematicBreak: u()
    }
  };
  oo(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(w) {
    let I = {
      type: "root",
      children: []
    };
    const q = {
      stack: [I],
      tokenStack: [],
      config: t,
      enter: a,
      exit: s,
      buffer: o,
      resume: f,
      data: n
    }, J = [];
    let oe = -1;
    for (; ++oe < w.length; )
      if (w[oe][1].type === "listOrdered" || w[oe][1].type === "listUnordered")
        if (w[oe][0] === "enter")
          J.push(oe);
        else {
          const Me = J.pop();
          oe = i(w, Me, oe);
        }
    for (oe = -1; ++oe < w.length; ) {
      const Me = t[w[oe][0]];
      io.call(Me, w[oe][1].type) && Me[w[oe][1].type].call(Object.assign({
        sliceSerialize: w[oe][2].sliceSerialize
      }, q), w[oe][1]);
    }
    if (q.tokenStack.length > 0) {
      const Me = q.tokenStack[q.tokenStack.length - 1];
      (Me[1] || Kr).call(q, void 0, Me[0]);
    }
    for (I.position = {
      start: rn(w.length > 0 ? w[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: rn(w.length > 0 ? w[w.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, oe = -1; ++oe < t.transforms.length; )
      I = t.transforms[oe](I) || I;
    return I;
  }
  function i(w, I, q) {
    let J = I - 1, oe = -1, Me = !1, Ye, Ue, Je, sn;
    for (; ++J <= q; ) {
      const ve = w[J];
      switch (ve[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ve[0] === "enter" ? oe++ : oe--, sn = void 0;
          break;
        }
        case "lineEndingBlank": {
          ve[0] === "enter" && (Ye && !sn && !oe && !Je && (Je = J), sn = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          sn = void 0;
      }
      if (!oe && ve[0] === "enter" && ve[1].type === "listItemPrefix" || oe === -1 && ve[0] === "exit" && (ve[1].type === "listUnordered" || ve[1].type === "listOrdered")) {
        if (Ye) {
          let en = J;
          for (Ue = void 0; en--; ) {
            const Le = w[en];
            if (Le[1].type === "lineEnding" || Le[1].type === "lineEndingBlank") {
              if (Le[0] === "exit") continue;
              Ue && (w[Ue][1].type = "lineEndingBlank", Me = !0), Le[1].type = "lineEnding", Ue = en;
            } else if (!(Le[1].type === "linePrefix" || Le[1].type === "blockQuotePrefix" || Le[1].type === "blockQuotePrefixWhitespace" || Le[1].type === "blockQuoteMarker" || Le[1].type === "listItemIndent")) break;
          }
          Je && (!Ue || Je < Ue) && (Ye._spread = !0), Ye.end = Object.assign({}, Ue ? w[Ue][1].start : ve[1].end), w.splice(Ue || J, 0, ["exit", Ye, ve[2]]), J++, q++;
        }
        if (ve[1].type === "listItemPrefix") {
          const en = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ve[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Ye = en, w.splice(J, 0, ["enter", en, ve[2]]), J++, q++, Je = void 0, sn = !0;
        }
      }
    }
    return w[I][1]._spread = Me, q;
  }
  function l(w, I) {
    return q;
    function q(J) {
      a.call(this, w(J), J), I && I.call(this, J);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(w, I, q) {
    this.stack[this.stack.length - 1].children.push(w), this.stack.push(w), this.tokenStack.push([I, q || void 0]), w.position = {
      start: rn(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(w) {
    return I;
    function I(q) {
      w && w.call(this, q), s.call(this, q);
    }
  }
  function s(w, I) {
    const q = this.stack.pop(), J = this.tokenStack.pop();
    if (J)
      J[0].type !== w.type && (I ? I.call(this, w, J[0]) : (J[1] || Kr).call(this, w, J[0]));
    else throw new Error("Cannot close `" + w.type + "` (" + vn({
      start: w.start,
      end: w.end
    }) + "): it’s not open");
    q.position.end = rn(w.end);
  }
  function f() {
    return rr(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(w) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(w), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = w;
  }
  function b() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = w;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function _() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = w.replace(/(\r?\n|\r)$/g, "");
  }
  function C(w) {
    const I = this.resume(), q = this.stack[this.stack.length - 1];
    q.label = I, q.identifier = He(this.sliceSerialize(w)).toLowerCase();
  }
  function A() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = w;
  }
  function $() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = w;
  }
  function D(w) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const q = this.sliceSerialize(w).length;
      I.depth = q;
    }
  }
  function E() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function V(w) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(w).codePointAt(0) === 61 ? 1 : 2;
  }
  function K() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function j(w) {
    const q = this.stack[this.stack.length - 1].children;
    let J = q[q.length - 1];
    (!J || J.type !== "text") && (J = Ze(), J.position = {
      start: rn(w.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, q.push(J)), this.stack.push(J);
  }
  function x(w) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(w), I.position.end = rn(w.end);
  }
  function M(w) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const q = I.children[I.children.length - 1];
      q.position.end = rn(w.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(I.type) && (j.call(this, w), x.call(this, w));
  }
  function P() {
    this.data.atHardBreak = !0;
  }
  function te() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = w;
  }
  function z() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = w;
  }
  function N() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = w;
  }
  function ne() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = I, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function pe() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = I, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function Y(w) {
    const I = this.sliceSerialize(w), q = this.stack[this.stack.length - 2];
    q.label = cu(I), q.identifier = He(I).toLowerCase();
  }
  function he() {
    const w = this.stack[this.stack.length - 1], I = this.resume(), q = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, q.type === "link") {
      const J = w.children;
      q.children = J;
    } else
      q.alt = I;
  }
  function g() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = w;
  }
  function ge() {
    const w = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = w;
  }
  function ke() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function Oe(w) {
    const I = this.resume(), q = this.stack[this.stack.length - 1];
    q.label = I, q.identifier = He(this.sliceSerialize(w)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ke(w) {
    this.data.characterReferenceType = w.type;
  }
  function Ee(w) {
    const I = this.sliceSerialize(w), q = this.data.characterReferenceType;
    let J;
    q ? (J = Ki(I, q === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : J = ir(I);
    const oe = this.stack[this.stack.length - 1];
    oe.value += J;
  }
  function ln(w) {
    const I = this.stack.pop();
    I.position.end = rn(w.end);
  }
  function je(w) {
    x.call(this, w);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(w);
  }
  function an(w) {
    x.call(this, w);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(w);
  }
  function Fe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function hn() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function st() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function ut() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ct() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Pn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function zn() {
    return {
      type: "break"
    };
  }
  function Bn() {
    return {
      type: "html",
      value: ""
    };
  }
  function ft() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Fn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function wn(w) {
    return {
      type: "list",
      ordered: w.type === "listOrdered",
      start: null,
      spread: w._spread,
      children: []
    };
  }
  function pt(w) {
    return {
      type: "listItem",
      spread: w._spread,
      checked: null,
      children: []
    };
  }
  function ht() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Un() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ze() {
    return {
      type: "text",
      value: ""
    };
  }
  function $n() {
    return {
      type: "thematicBreak"
    };
  }
}
function rn(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function oo(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? oo(e, r) : gu(e, r);
  }
}
function gu(e, t) {
  let n;
  for (n in t)
    if (io.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function Kr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + vn({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + vn({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + vn({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function du(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return pu(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function mu(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function bu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function yu(e, t) {
  const n = t.value ? t.value + `
` : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let l = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (l.data = { meta: t.meta }), e.patch(t, l), l = e.applyData(t, l), l = { type: "element", tagName: "pre", properties: {}, children: [l] }, e.patch(t, l), l;
}
function xu(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ku(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Eu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = En(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, a += 1, e.footnoteCounts.set(r, a);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(t, u);
  const s = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, s), e.applyData(t, s);
}
function wu(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function _u(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function lo(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Su(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return lo(e, t);
  const i = { src: En(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, l), e.applyData(t, l);
}
function Au(e, t) {
  const n = { src: En(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Cu(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Tu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return lo(e, t);
  const i = { href: En(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function vu(e, t) {
  const n = { href: En(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Iu(e, t, n) {
  const r = e.all(t), i = n ? Nu(n) : ao(t), l = {}, o = [];
  if (typeof t.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && o.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? o.push(...f.children) : o.push(f);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(t, s), e.applyData(t, s);
}
function Nu(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ao(n[r]);
  }
  return t;
}
function ao(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Ru(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Ou(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Mu(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Lu(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Du(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], o), i.push(o);
  }
  if (n.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, a = Jt(t.children[1]), u = Ui(t.children[t.children.length - 1]);
    a && u && (o.position = { start: a, end: u }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, l), e.applyData(t, l);
}
function Pu(e, t, n) {
  const r = n ? n.children : void 0, l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let u = -1;
  const s = [];
  for (; ++u < a; ) {
    const c = t.children[u], h = {}, p = o ? o[u] : void 0;
    p && (h.align = p);
    let b = { type: "element", tagName: l, properties: h, children: [] };
    c && (b.children = e.all(c), e.patch(c, b), b = e.applyData(c, b)), s.push(b);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(t, f), e.applyData(t, f);
}
function zu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Zr = 9, Yr = 32;
function Bu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Xr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return l.push(Xr(t.slice(i), i > 0, !1)), l.join("");
}
function Xr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === Zr || l === Yr; )
      r++, l = e.codePointAt(r);
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === Zr || l === Yr; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Fu(e, t) {
  const n = { type: "text", value: Bu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Uu(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const $u = {
  blockquote: mu,
  break: bu,
  code: yu,
  delete: xu,
  emphasis: ku,
  footnoteReference: Eu,
  heading: wu,
  html: _u,
  imageReference: Su,
  image: Au,
  inlineCode: Cu,
  linkReference: Tu,
  link: vu,
  listItem: Iu,
  list: Ru,
  paragraph: Ou,
  // @ts-expect-error: root is different, but hard to type.
  root: Mu,
  strong: Lu,
  table: Du,
  tableCell: zu,
  tableRow: Pu,
  text: Fu,
  thematicBreak: Uu,
  toml: Wn,
  yaml: Wn,
  definition: Wn,
  footnoteDefinition: Wn
};
function Wn() {
}
const so = -1, ot = 0, Nn = 1, et = 2, lr = 3, ar = 4, sr = 5, ur = 6, uo = 7, co = 8, Qr = typeof self == "object" ? self : globalThis, Hu = (e, t) => {
  const n = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = t[i];
    switch (l) {
      case ot:
      case so:
        return n(o, i);
      case Nn: {
        const a = n([], i);
        for (const u of o)
          a.push(r(u));
        return a;
      }
      case et: {
        const a = n({}, i);
        for (const [u, s] of o)
          a[r(u)] = r(s);
        return a;
      }
      case lr:
        return n(new Date(o), i);
      case ar: {
        const { source: a, flags: u } = o;
        return n(new RegExp(a, u), i);
      }
      case sr: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of o)
          a.set(r(u), r(s));
        return a;
      }
      case ur: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of o)
          a.add(r(u));
        return a;
      }
      case uo: {
        const { name: a, message: u } = o;
        return n(new Qr[a](u), i);
      }
      case co:
        return n(BigInt(o), i);
      case "BigInt":
        return n(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return n(new DataView(a), o);
      }
    }
    return n(new Qr[l](o), i);
  };
  return r;
}, Jr = (e) => Hu(/* @__PURE__ */ new Map(), e)(0), mn = "", { toString: ju } = {}, { keys: qu } = Object, Tn = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [ot, t];
  const n = ju.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Nn, mn];
    case "Object":
      return [et, mn];
    case "Date":
      return [lr, mn];
    case "RegExp":
      return [ar, mn];
    case "Map":
      return [sr, mn];
    case "Set":
      return [ur, mn];
    case "DataView":
      return [Nn, n];
  }
  return n.includes("Array") ? [Nn, n] : n.includes("Error") ? [uo, n] : [et, n];
}, Kn = ([e, t]) => e === ot && (t === "function" || t === "symbol"), Gu = (e, t, n, r) => {
  const i = (o, a) => {
    const u = r.push(o) - 1;
    return n.set(a, u), u;
  }, l = (o) => {
    if (n.has(o))
      return n.get(o);
    let [a, u] = Tn(o);
    switch (a) {
      case ot: {
        let f = o;
        switch (u) {
          case "bigint":
            a = co, f = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            f = null;
            break;
          case "undefined":
            return i([so], o);
        }
        return i([a, f], o);
      }
      case Nn: {
        if (u) {
          let h = o;
          return u === "DataView" ? h = new Uint8Array(o.buffer) : u === "ArrayBuffer" && (h = new Uint8Array(o)), i([u, [...h]], o);
        }
        const f = [], c = i([a, f], o);
        for (const h of o)
          f.push(l(h));
        return c;
      }
      case et: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return l(o.toJSON());
        const f = [], c = i([a, f], o);
        for (const h of qu(o))
          (e || !Kn(Tn(o[h]))) && f.push([l(h), l(o[h])]);
        return c;
      }
      case lr:
        return i([a, o.toISOString()], o);
      case ar: {
        const { source: f, flags: c } = o;
        return i([a, { source: f, flags: c }], o);
      }
      case sr: {
        const f = [], c = i([a, f], o);
        for (const [h, p] of o)
          (e || !(Kn(Tn(h)) || Kn(Tn(p)))) && f.push([l(h), l(p)]);
        return c;
      }
      case ur: {
        const f = [], c = i([a, f], o);
        for (const h of o)
          (e || !Kn(Tn(h))) && f.push(l(h));
        return c;
      }
    }
    const { message: s } = o;
    return i([a, { name: u, message: s }], o);
  };
  return l;
}, ei = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Gu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, nt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Jr(ei(e, t)) : structuredClone(e)
) : (e, t) => Jr(ei(e, t));
function Vu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Wu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Ku(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Vu, r = e.options.footnoteBackLabel || Wu, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const s = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!s)
      continue;
    const f = e.all(s), c = String(s.identifier).toUpperCase(), h = En(c.toLowerCase());
    let p = 0;
    const b = [], k = e.footnoteCounts.get(c);
    for (; k !== void 0 && ++p <= k; ) {
      b.length > 0 && b.push({ type: "text", value: " " });
      let C = typeof n == "string" ? n : n(u, p);
      typeof C == "string" && (C = { type: "text", value: C }), b.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + h + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(C) ? C : [C]
      });
    }
    const _ = f[f.length - 1];
    if (_ && _.type === "element" && _.tagName === "p") {
      const C = _.children[_.children.length - 1];
      C && C.type === "text" ? C.value += " " : _.children.push({ type: "text", value: " " }), _.children.push(...b);
    } else
      f.push(...b);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + h },
      children: e.wrap(f, !0)
    };
    e.patch(s, y), a.push(y);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...nt(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const lt = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return Qu;
    if (typeof e == "function")
      return at(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Zu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Yu(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Xu(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function Zu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = lt(e[n]);
  return at(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; )
      if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function Yu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return at(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== t[l]) return !1;
    return !0;
  }
}
function Xu(e) {
  return at(t);
  function t(n) {
    return n && n.type === e;
  }
}
function at(e) {
  return t;
  function t(n, r, i) {
    return !!(Ju(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Qu() {
  return !0;
}
function Ju(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const fo = [], ec = !0, qt = !1, nc = "skip";
function po(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const l = lt(i), o = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, s, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof c.type == "string") {
      const p = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (u.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let p = fo, b, k, _;
      if ((!t || l(u, s, f[f.length - 1] || void 0)) && (p = tc(n(u, f)), p[0] === qt))
        return p;
      if ("children" in u && u.children) {
        const y = (
          /** @type {UnistParent} */
          u
        );
        if (y.children && p[0] !== nc)
          for (k = (r ? y.children.length : -1) + o, _ = f.concat(y); k > -1 && k < y.children.length; ) {
            const C = y.children[k];
            if (b = a(C, k, _)(), b[0] === qt)
              return b;
            k = typeof b[1] == "number" ? b[1] : k + o;
          }
      }
      return p;
    }
  }
}
function tc(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [ec, e] : e == null ? fo : [e];
}
function cr(e, t, n, r) {
  let i, l, o;
  typeof t == "function" && typeof n != "function" ? (l = void 0, o = t, i = n) : (l = t, o = n, i = r), po(e, l, a, i);
  function a(u, s) {
    const f = s[s.length - 1], c = f ? f.children.indexOf(u) : void 0;
    return o(u, c, f);
  }
}
const Gt = {}.hasOwnProperty, rc = {};
function ic(e, t) {
  const n = t || rc, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...$u, ...n.handlers }, a = {
    all: s,
    applyData: lc,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: u,
    options: n,
    patch: oc,
    wrap: sc
  };
  return cr(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, h = String(f.identifier).toUpperCase();
      c.has(h) || c.set(h, f);
    }
  }), a;
  function u(f, c) {
    const h = f.type, p = a.handlers[h];
    if (Gt.call(a.handlers, h) && p)
      return p(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in f) {
        const { children: k, ..._ } = f, y = nt(_);
        return y.children = a.all(f), y;
      }
      return nt(f);
    }
    return (a.options.unknownHandler || ac)(a, f, c);
  }
  function s(f) {
    const c = [];
    if ("children" in f) {
      const h = f.children;
      let p = -1;
      for (; ++p < h.length; ) {
        const b = a.one(h[p], f);
        if (b) {
          if (p && h[p - 1].type === "break" && (!Array.isArray(b) && b.type === "text" && (b.value = ni(b.value)), !Array.isArray(b) && b.type === "element")) {
            const k = b.children[0];
            k && k.type === "text" && (k.value = ni(k.value));
          }
          Array.isArray(b) ? c.push(...b) : c.push(b);
        }
      }
    }
    return c;
  }
}
function oc(e, t) {
  e.position && (t.position = Wl(e));
}
function lc(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && l && Object.assign(n.properties, nt(l)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function ac(e, t) {
  const n = t.data || {}, r = "value" in t && !(Gt.call(n, "hProperties") || Gt.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function sc(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function ni(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function ti(e, t) {
  const n = ic(e, t), r = n.one(e, void 0), i = Ku(n), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function uc(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      ti(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      ti(n, { file: r, ...e || t })
    );
  };
}
function ri(e) {
  if (e)
    throw e;
}
var Ct, ii;
function cc() {
  if (ii) return Ct;
  ii = 1;
  var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(s) {
    return typeof Array.isArray == "function" ? Array.isArray(s) : t.call(s) === "[object Array]";
  }, l = function(s) {
    if (!s || t.call(s) !== "[object Object]")
      return !1;
    var f = e.call(s, "constructor"), c = s.constructor && s.constructor.prototype && e.call(s.constructor.prototype, "isPrototypeOf");
    if (s.constructor && !f && !c)
      return !1;
    var h;
    for (h in s)
      ;
    return typeof h > "u" || e.call(s, h);
  }, o = function(s, f) {
    n && f.name === "__proto__" ? n(s, f.name, {
      enumerable: !0,
      configurable: !0,
      value: f.newValue,
      writable: !0
    }) : s[f.name] = f.newValue;
  }, a = function(s, f) {
    if (f === "__proto__")
      if (e.call(s, f)) {
        if (r)
          return r(s, f).value;
      } else return;
    return s[f];
  };
  return Ct = function u() {
    var s, f, c, h, p, b, k = arguments[0], _ = 1, y = arguments.length, C = !1;
    for (typeof k == "boolean" && (C = k, k = arguments[1] || {}, _ = 2), (k == null || typeof k != "object" && typeof k != "function") && (k = {}); _ < y; ++_)
      if (s = arguments[_], s != null)
        for (f in s)
          c = a(k, f), h = a(s, f), k !== h && (C && h && (l(h) || (p = i(h))) ? (p ? (p = !1, b = c && i(c) ? c : []) : b = c && l(c) ? c : {}, o(k, { name: f, newValue: u(C, b, h) })) : typeof h < "u" && o(k, { name: f, newValue: h }));
    return k;
  }, Ct;
}
var fc = cc();
const Tt = /* @__PURE__ */ Zt(fc);
function Vt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function pc() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(u, ...s) {
      const f = e[++l];
      let c = -1;
      if (u) {
        o(u);
        return;
      }
      for (; ++c < i.length; )
        (s[c] === null || s[c] === void 0) && (s[c] = i[c]);
      i = s, f ? hc(f, a)(...s) : o(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function hc(e, t) {
  let n;
  return r;
  function r(...o) {
    const a = e.length > o.length;
    let u;
    a && o.push(i);
    try {
      u = e.apply(this, o);
    } catch (s) {
      const f = (
        /** @type {Error} */
        s
      );
      if (a && n)
        throw f;
      return i(f);
    }
    a || (u && u.then && typeof u.then == "function" ? u.then(l, i) : u instanceof Error ? i(u) : l(u));
  }
  function i(o, ...a) {
    n || (n = !0, t(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const Ve = { basename: gc, dirname: dc, extname: mc, join: bc, sep: "/" };
function gc(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Dn(e);
  let n = 0, r = -1, i = e.length, l;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          n = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let o = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        n = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function dc(e) {
  if (Dn(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function mc(e) {
  Dn(e);
  let t = e.length, n = -1, r = 0, i = -1, l = 0, o;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), a === 46 ? i < 0 ? i = t : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function bc(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Dn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : yc(n);
}
function yc(e) {
  Dn(e);
  const t = e.codePointAt(0) === 47;
  let n = xc(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function xc(e, t) {
  let n = "", r = 0, i = -1, l = 0, o = -1, a, u;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      a = e.codePointAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === o - 1 || l === 1)) if (i !== o - 1 && l === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else a === 46 && l > -1 ? l++ : l = -1;
  }
  return n;
}
function Dn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const kc = { cwd: Ec };
function Ec() {
  return "/";
}
function Wt(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function wc(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Wt(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return _c(e);
}
function _c(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const vt = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ho {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? Wt(t) ? n = { path: t } : typeof t == "string" || Sc(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : kc.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < vt.length; ) {
      const l = vt[r];
      l in n && n[l] !== void 0 && n[l] !== null && (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n)
      vt.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Ve.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    Nt(t, "basename"), It(t, "basename"), this.path = Ve.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Ve.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    oi(this.basename, "dirname"), this.path = Ve.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Ve.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (It(t, "extname"), oi(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Ve.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    Wt(t) && (t = wc(t)), Nt(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Ve.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    Nt(t, "stem"), It(t, "stem"), this.path = Ve.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new Te(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function It(e, t) {
  if (e && e.includes(Ve.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Ve.sep + "`"
    );
}
function Nt(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function oi(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Sc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ac = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  })
), Cc = {}.hasOwnProperty;
class fr extends Ac {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = pc();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new fr()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Tt(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (Mt("data", this.frozen), this.namespace[t] = n, this) : Cc.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Mt("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = Zn(t), r = this.parser || this.Parser;
    return Rt("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), Rt("process", this.parser || this.Parser), Ot("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(l, o) {
      const a = Zn(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(u, a, function(f, c, h) {
        if (f || !c || !h)
          return s(f);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), b = r.stringify(p, h);
        Ic(b) ? h.value = b : h.result = b, s(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function s(f, c) {
        f || !c ? o(f) : l ? l(c) : n(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), Rt("processSync", this.parser || this.Parser), Ot("processSync", this.compiler || this.Compiler), this.process(t, i), ai("processSync", "process", n), r;
    function i(l, o) {
      n = !0, ri(l), r = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    li(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const u = Zn(n);
      i.run(t, u, s);
      function s(f, c, h) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || t
        );
        f ? a(f) : o ? o(p) : r(void 0, p, h);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, l), ai("runSync", "run", r), i;
    function l(o, a) {
      ri(o), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = Zn(n), i = this.compiler || this.Compiler;
    return Ot("stringify", i), li(t), i(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (Mt("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function l(s) {
      if (typeof s == "function")
        u(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          u(f, c);
        } else
          o(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function o(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(s.plugins), s.settings && (i.settings = Tt(!0, i.settings, s.settings));
    }
    function a(s) {
      let f = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++f < s.length; ) {
          const c = s[f];
          l(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function u(s, f) {
      let c = -1, h = -1;
      for (; ++c < r.length; )
        if (r[c][0] === s) {
          h = c;
          break;
        }
      if (h === -1)
        r.push([s, ...f]);
      else if (f.length > 0) {
        let [p, ...b] = f;
        const k = r[h][1];
        Vt(k) && Vt(p) && (p = Tt(!0, k, p)), r[h] = [s, p, ...b];
      }
    }
  }
}
const Tc = new fr().freeze();
function Rt(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Ot(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Mt(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function li(e) {
  if (!Vt(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ai(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Zn(e) {
  return vc(e) ? e : new ho(e);
}
function vc(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ic(e) {
  return typeof e == "string" || Nc(e);
}
function Nc(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Rc = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", si = [], ui = { allowDangerousHtml: !0 }, Oc = /^(https?|ircs?|mailto|xmpp)$/i, Mc = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Lc(e) {
  const t = Dc(e), n = Pc(e);
  return zc(t.runSync(t.parse(n), n), e);
}
function Dc(e) {
  const t = e.rehypePlugins || si, n = e.remarkPlugins || si, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ui } : ui;
  return Tc().use(du).use(n).use(uc, r).use(t);
}
function Pc(e) {
  const t = e.children || "", n = new ho();
  return typeof t == "string" && (n.value = t), n;
}
function zc(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, l = t.disallowedElements, o = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || Bc;
  for (const f of Mc)
    Object.hasOwn(t, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + Rc + f.id, void 0);
  return cr(e, s), Ql(e, {
    Fragment: ce.Fragment,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: ce.jsx,
    jsxs: ce.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function s(f, c, h) {
    if (f.type === "raw" && h && typeof c == "number")
      return o ? h.children.splice(c, 1) : h.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let p;
      for (p in _t)
        if (Object.hasOwn(_t, p) && Object.hasOwn(f.properties, p)) {
          const b = f.properties[p], k = _t[p];
          (k === null || k.includes(f.tagName)) && (f.properties[p] = u(String(b || ""), p, f));
        }
    }
    if (f.type === "element") {
      let p = n ? !n.includes(f.tagName) : l ? l.includes(f.tagName) : !1;
      if (!p && r && typeof c == "number" && (p = !r(f, c, h)), p && h && typeof c == "number")
        return a && f.children ? h.children.splice(c, 1, ...f.children) : h.children.splice(c, 1), c;
    }
  }
}
function Bc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Oc.test(e.slice(0, t)) ? e : ""
  );
}
function ci(e, t) {
  const n = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; )
    r++, i = n.indexOf(t, i + t.length);
  return r;
}
function Fc(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Uc(e, t, n) {
  const i = lt((n || {}).ignore || []), l = $c(t);
  let o = -1;
  for (; ++o < l.length; )
    po(e, "text", a);
  function a(s, f) {
    let c = -1, h;
    for (; ++c < f.length; ) {
      const p = f[c], b = h ? h.children : void 0;
      if (i(
        p,
        b ? b.indexOf(p) : void 0,
        h
      ))
        return;
      h = p;
    }
    if (h)
      return u(s, f);
  }
  function u(s, f) {
    const c = f[f.length - 1], h = l[o][0], p = l[o][1];
    let b = 0;
    const _ = c.children.indexOf(s);
    let y = !1, C = [];
    h.lastIndex = 0;
    let A = h.exec(s.value);
    for (; A; ) {
      const $ = A.index, D = {
        index: A.index,
        input: A.input,
        stack: [...f, s]
      };
      let E = p(...A, D);
      if (typeof E == "string" && (E = E.length > 0 ? { type: "text", value: E } : void 0), E === !1 ? h.lastIndex = $ + 1 : (b !== $ && C.push({
        type: "text",
        value: s.value.slice(b, $)
      }), Array.isArray(E) ? C.push(...E) : E && C.push(E), b = $ + A[0].length, y = !0), !h.global)
        break;
      A = h.exec(s.value);
    }
    return y ? (b < s.value.length && C.push({ type: "text", value: s.value.slice(b) }), c.children.splice(_, 1, ...C)) : C = [s], _ + C.length;
  }
}
function $c(e) {
  const t = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([Hc(i[0]), jc(i[1])]);
  }
  return t;
}
function Hc(e) {
  return typeof e == "string" ? new RegExp(Fc(e), "g") : e;
}
function jc(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Lt = "phrasing", Dt = ["autolink", "link", "image", "label"];
function qc() {
  return {
    transforms: [Xc],
    enter: {
      literalAutolink: Vc,
      literalAutolinkEmail: Pt,
      literalAutolinkHttp: Pt,
      literalAutolinkWww: Pt
    },
    exit: {
      literalAutolink: Yc,
      literalAutolinkEmail: Zc,
      literalAutolinkHttp: Wc,
      literalAutolinkWww: Kc
    }
  };
}
function Gc() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Lt,
        notInConstruct: Dt
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Lt,
        notInConstruct: Dt
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Lt,
        notInConstruct: Dt
      }
    ]
  };
}
function Vc(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Pt(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Wc(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Kc(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Zc(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function Yc(e) {
  this.exit(e);
}
function Xc(e) {
  Uc(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Qc],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Jc]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Qc(e, t, n, r, i) {
  let l = "";
  if (!go(i) || (/^w/i.test(t) && (n = t + n, t = "", l = "http://"), !ef(n)))
    return !1;
  const o = nf(n + r);
  if (!o[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: l + t + o[0],
    children: [{ type: "text", value: t + o[0] }]
  };
  return o[1] ? [a, { type: "text", value: o[1] }] : a;
}
function Jc(e, t, n, r) {
  return (
    // Not an expected previous character.
    !go(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(n) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + t + "@" + n,
      children: [{ type: "text", value: t + "@" + n }]
    }
  );
}
function ef(e) {
  const t = e.split(".");
  return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function nf(e) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!t)
    return [e, void 0];
  e = e.slice(0, t.index);
  let n = t[0], r = n.indexOf(")");
  const i = ci(e, "(");
  let l = ci(e, ")");
  for (; r !== -1 && i > l; )
    e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), l++;
  return [e, n];
}
function go(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || fn(n) || rt(n)) && // If it’s an email, the previous character should not be a slash.
  (!t || n !== 47);
}
mo.peek = ff;
function tf() {
  this.buffer();
}
function rf(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function of() {
  this.buffer();
}
function lf(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function af(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = He(
    this.sliceSerialize(e)
  ).toLowerCase(), n.label = t;
}
function sf(e) {
  this.exit(e);
}
function uf(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = He(
    this.sliceSerialize(e)
  ).toLowerCase(), n.label = t;
}
function cf(e) {
  this.exit(e);
}
function ff() {
  return "[";
}
function mo(e, t, n, r) {
  const i = n.createTracker(r);
  let l = i.move("[^");
  const o = n.enter("footnoteReference"), a = n.enter("reference");
  return l += i.move(
    n.safe(n.associationId(e), { after: "]", before: l })
  ), a(), o(), l += i.move("]"), l;
}
function pf() {
  return {
    enter: {
      gfmFootnoteCallString: tf,
      gfmFootnoteCall: rf,
      gfmFootnoteDefinitionLabelString: of,
      gfmFootnoteDefinition: lf
    },
    exit: {
      gfmFootnoteCallString: af,
      gfmFootnoteCall: sf,
      gfmFootnoteDefinitionLabelString: uf,
      gfmFootnoteDefinition: cf
    }
  };
}
function hf(e) {
  let t = !1;
  return e && e.firstLineBlank && (t = !0), {
    handlers: { footnoteDefinition: n, footnoteReference: mo },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function n(r, i, l, o) {
    const a = l.createTracker(o);
    let u = a.move("[^");
    const s = l.enter("footnoteDefinition"), f = l.enter("label");
    return u += a.move(
      l.safe(l.associationId(r), { before: u, after: "]" })
    ), f(), u += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), u += a.move(
      (t ? `
` : " ") + l.indentLines(
        l.containerFlow(r, a.current()),
        t ? bo : gf
      )
    )), s(), u;
  }
}
function gf(e, t, n) {
  return t === 0 ? e : bo(e, t, n);
}
function bo(e, t, n) {
  return (n ? "" : "    ") + e;
}
const df = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
yo.peek = kf;
function mf() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: yf },
    exit: { strikethrough: xf }
  };
}
function bf() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: df
      }
    ],
    handlers: { delete: yo }
  };
}
function yf(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function xf(e) {
  this.exit(e);
}
function yo(e, t, n, r) {
  const i = n.createTracker(r), l = n.enter("strikethrough");
  let o = i.move("~~");
  return o += n.containerPhrasing(e, {
    ...i.current(),
    before: o,
    after: "~"
  }), o += i.move("~~"), l(), o;
}
function kf() {
  return "~";
}
function Ef(e) {
  return e.length;
}
function wf(e, t) {
  const n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Ef, l = [], o = [], a = [], u = [];
  let s = 0, f = -1;
  for (; ++f < e.length; ) {
    const k = [], _ = [];
    let y = -1;
    for (e[f].length > s && (s = e[f].length); ++y < e[f].length; ) {
      const C = _f(e[f][y]);
      if (n.alignDelimiters !== !1) {
        const A = i(C);
        _[y] = A, (u[y] === void 0 || A > u[y]) && (u[y] = A);
      }
      k.push(C);
    }
    o[f] = k, a[f] = _;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < s; )
      l[c] = fi(r[c]);
  else {
    const k = fi(r);
    for (; ++c < s; )
      l[c] = k;
  }
  c = -1;
  const h = [], p = [];
  for (; ++c < s; ) {
    const k = l[c];
    let _ = "", y = "";
    k === 99 ? (_ = ":", y = ":") : k === 108 ? _ = ":" : k === 114 && (y = ":");
    let C = n.alignDelimiters === !1 ? 1 : Math.max(
      1,
      u[c] - _.length - y.length
    );
    const A = _ + "-".repeat(C) + y;
    n.alignDelimiters !== !1 && (C = _.length + C + y.length, C > u[c] && (u[c] = C), p[c] = C), h[c] = A;
  }
  o.splice(1, 0, h), a.splice(1, 0, p), f = -1;
  const b = [];
  for (; ++f < o.length; ) {
    const k = o[f], _ = a[f];
    c = -1;
    const y = [];
    for (; ++c < s; ) {
      const C = k[c] || "";
      let A = "", $ = "";
      if (n.alignDelimiters !== !1) {
        const D = u[c] - (_[c] || 0), E = l[c];
        E === 114 ? A = " ".repeat(D) : E === 99 ? D % 2 ? (A = " ".repeat(D / 2 + 0.5), $ = " ".repeat(D / 2 - 0.5)) : (A = " ".repeat(D / 2), $ = A) : $ = " ".repeat(D);
      }
      n.delimiterStart !== !1 && !c && y.push("|"), n.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(n.alignDelimiters === !1 && C === "") && (n.delimiterStart !== !1 || c) && y.push(" "), n.alignDelimiters !== !1 && y.push(A), y.push(C), n.alignDelimiters !== !1 && y.push($), n.padding !== !1 && y.push(" "), (n.delimiterEnd !== !1 || c !== s - 1) && y.push("|");
    }
    b.push(
      n.delimiterEnd === !1 ? y.join("").replace(/ +$/, "") : y.join("")
    );
  }
  return b.join(`
`);
}
function _f(e) {
  return e == null ? "" : String(e);
}
function fi(e) {
  const t = typeof e == "string" ? e.codePointAt(0) : 0;
  return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function Sf(e, t, n, r) {
  const i = n.enter("blockquote"), l = n.createTracker(r);
  l.move("> "), l.shift(2);
  const o = n.indentLines(
    n.containerFlow(e, l.current()),
    Af
  );
  return i(), o;
}
function Af(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function Cf(e, t) {
  return pi(e, t.inConstruct, !0) && !pi(e, t.notInConstruct, !1);
}
function pi(e, t, n) {
  if (typeof t == "string" && (t = [t]), !t || t.length === 0)
    return n;
  let r = -1;
  for (; ++r < t.length; )
    if (e.includes(t[r]))
      return !0;
  return !1;
}
function hi(e, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; )
    if (n.unsafe[i].character === `
` && Cf(n.stack, n.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Tf(e, t) {
  const n = String(e);
  let r = n.indexOf(t), i = r, l = 0, o = 0;
  if (typeof t != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++l > o && (o = l) : l = 1, i = r + t.length, r = n.indexOf(t, i);
  return o;
}
function vf(e, t) {
  return !!(t.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function If(e) {
  const t = e.options.fence || "`";
  if (t !== "`" && t !== "~")
    throw new Error(
      "Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return t;
}
function Nf(e, t, n, r) {
  const i = If(n), l = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
  if (vf(e, n)) {
    const c = n.enter("codeIndented"), h = n.indentLines(l, Rf);
    return c(), h;
  }
  const a = n.createTracker(r), u = i.repeat(Math.max(Tf(l, i) + 1, 3)), s = n.enter("codeFenced");
  let f = a.move(u);
  if (e.lang) {
    const c = n.enter(`codeFencedLang${o}`);
    f += a.move(
      n.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = n.enter(`codeFencedMeta${o}`);
    f += a.move(" "), f += a.move(
      n.safe(e.meta, {
        before: f,
        after: `
`,
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  return f += a.move(`
`), l && (f += a.move(l + `
`)), f += a.move(u), s(), f;
}
function Rf(e, t, n) {
  return (n ? "" : "    ") + e;
}
function pr(e) {
  const t = e.options.quote || '"';
  if (t !== '"' && t !== "'")
    throw new Error(
      "Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`"
    );
  return t;
}
function Of(e, t, n, r) {
  const i = pr(n), l = i === '"' ? "Quote" : "Apostrophe", o = n.enter("definition");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("[");
  return s += u.move(
    n.safe(n.associationId(e), {
      before: s,
      after: "]",
      ...u.current()
    })
  ), s += u.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(
    n.safe(e.url, { before: s, after: ">", ...u.current() })
  ), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : `
`,
      ...u.current()
    })
  )), a(), e.title && (a = n.enter(`title${l}`), s += u.move(" " + i), s += u.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...u.current()
    })
  ), s += u.move(i), a()), o(), s;
}
function Mf(e) {
  const t = e.options.emphasis || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return t;
}
function On(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function tt(e, t, n) {
  const r = xn(e), i = xn(t);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    n === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
xo.peek = Lf;
function xo(e, t, n, r) {
  const i = Mf(n), l = n.enter("emphasis"), o = n.createTracker(r), a = o.move(i);
  let u = o.move(
    n.containerPhrasing(e, {
      after: i,
      before: a,
      ...o.current()
    })
  );
  const s = u.charCodeAt(0), f = tt(
    r.before.charCodeAt(r.before.length - 1),
    s,
    i
  );
  f.inside && (u = On(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), h = tt(r.after.charCodeAt(0), c, i);
  h.inside && (u = u.slice(0, -1) + On(c));
  const p = o.move(i);
  return l(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + u + p;
}
function Lf(e, t, n) {
  return n.options.emphasis || "*";
}
function Df(e, t) {
  let n = !1;
  return cr(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return n = !0, qt;
  }), !!((!e.depth || e.depth < 3) && rr(e) && (t.options.setext || n));
}
function Pf(e, t, n, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), l = n.createTracker(r);
  if (Df(e, n)) {
    const f = n.enter("headingSetext"), c = n.enter("phrasing"), h = n.containerPhrasing(e, {
      ...l.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), h + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      h.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(h.lastIndexOf("\r"), h.lastIndexOf(`
`)) + 1)
    );
  }
  const o = "#".repeat(i), a = n.enter("headingAtx"), u = n.enter("phrasing");
  l.move(o + " ");
  let s = n.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...l.current()
  });
  return /^[\t ]/.test(s) && (s = On(s.charCodeAt(0)) + s.slice(1)), s = s ? o + " " + s : o, n.options.closeAtx && (s += " " + o), u(), a(), s;
}
ko.peek = zf;
function ko(e) {
  return e.value || "";
}
function zf() {
  return "<";
}
Eo.peek = Bf;
function Eo(e, t, n, r) {
  const i = pr(n), l = i === '"' ? "Quote" : "Apostrophe", o = n.enter("image");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("![");
  return s += u.move(
    n.safe(e.alt, { before: s, after: "]", ...u.current() })
  ), s += u.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(
    n.safe(e.url, { before: s, after: ">", ...u.current() })
  ), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : ")",
      ...u.current()
    })
  )), a(), e.title && (a = n.enter(`title${l}`), s += u.move(" " + i), s += u.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...u.current()
    })
  ), s += u.move(i), a()), s += u.move(")"), o(), s;
}
function Bf() {
  return "!";
}
wo.peek = Ff;
function wo(e, t, n, r) {
  const i = e.referenceType, l = n.enter("imageReference");
  let o = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("![");
  const s = n.safe(e.alt, {
    before: u,
    after: "]",
    ...a.current()
  });
  u += a.move(s + "]["), o();
  const f = n.stack;
  n.stack = [], o = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: u,
    after: "]",
    ...a.current()
  });
  return o(), n.stack = f, l(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function Ff() {
  return "!";
}
_o.peek = Uf;
function _o(e, t, n) {
  let r = e.value || "", i = "`", l = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++l < n.unsafe.length; ) {
    const o = n.unsafe[l], a = n.compilePattern(o);
    let u;
    if (o.atBreak)
      for (; u = a.exec(r); ) {
        let s = u.index;
        r.charCodeAt(s) === 10 && r.charCodeAt(s - 1) === 13 && s--, r = r.slice(0, s) + " " + r.slice(u.index + 1);
      }
  }
  return i + r + i;
}
function Uf() {
  return "`";
}
function So(e, t) {
  const n = rr(e);
  return !!(!t.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (n === e.url || "mailto:" + n === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
Ao.peek = $f;
function Ao(e, t, n, r) {
  const i = pr(n), l = i === '"' ? "Quote" : "Apostrophe", o = n.createTracker(r);
  let a, u;
  if (So(e, n)) {
    const f = n.stack;
    n.stack = [], a = n.enter("autolink");
    let c = o.move("<");
    return c += o.move(
      n.containerPhrasing(e, {
        before: c,
        after: ">",
        ...o.current()
      })
    ), c += o.move(">"), a(), n.stack = f, c;
  }
  a = n.enter("link"), u = n.enter("label");
  let s = o.move("[");
  return s += o.move(
    n.containerPhrasing(e, {
      before: s,
      after: "](",
      ...o.current()
    })
  ), s += o.move("]("), u(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (u = n.enter("destinationLiteral"), s += o.move("<"), s += o.move(
    n.safe(e.url, { before: s, after: ">", ...o.current() })
  ), s += o.move(">")) : (u = n.enter("destinationRaw"), s += o.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : ")",
      ...o.current()
    })
  )), u(), e.title && (u = n.enter(`title${l}`), s += o.move(" " + i), s += o.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...o.current()
    })
  ), s += o.move(i), u()), s += o.move(")"), a(), s;
}
function $f(e, t, n) {
  return So(e, n) ? "<" : "[";
}
Co.peek = Hf;
function Co(e, t, n, r) {
  const i = e.referenceType, l = n.enter("linkReference");
  let o = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("[");
  const s = n.containerPhrasing(e, {
    before: u,
    after: "]",
    ...a.current()
  });
  u += a.move(s + "]["), o();
  const f = n.stack;
  n.stack = [], o = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: u,
    after: "]",
    ...a.current()
  });
  return o(), n.stack = f, l(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function Hf() {
  return "[";
}
function hr(e) {
  const t = e.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return t;
}
function jf(e) {
  const t = hr(e), n = e.options.bulletOther;
  if (!n)
    return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (n === t)
    throw new Error(
      "Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different"
    );
  return n;
}
function qf(e) {
  const t = e.options.bulletOrdered || ".";
  if (t !== "." && t !== ")")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return t;
}
function To(e) {
  const t = e.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_")
    throw new Error(
      "Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return t;
}
function Gf(e, t, n, r) {
  const i = n.enter("list"), l = n.bulletCurrent;
  let o = e.ordered ? qf(n) : hr(n);
  const a = e.ordered ? o === "." ? ")" : "." : jf(n);
  let u = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (o === "*" || o === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && // That are each the first child.
      n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (u = !0), To(n) === o && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const h = e.children[c];
        if (h && h.type === "listItem" && h.children && h.children[0] && h.children[0].type === "thematicBreak") {
          u = !0;
          break;
        }
      }
    }
  }
  u && (o = a), n.bulletCurrent = o;
  const s = n.containerFlow(e, r);
  return n.bulletLastUsed = o, n.bulletCurrent = l, i(), s;
}
function Vf(e) {
  const t = e.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return t;
}
function Wf(e, t, n, r) {
  const i = Vf(n);
  let l = n.bulletCurrent || hr(n);
  t && t.type === "list" && t.ordered && (l = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + l);
  let o = l.length + 1;
  (i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
  const a = n.createTracker(r);
  a.move(l + " ".repeat(o - l.length)), a.shift(o);
  const u = n.enter("listItem"), s = n.indentLines(
    n.containerFlow(e, a.current()),
    f
  );
  return u(), s;
  function f(c, h, p) {
    return h ? (p ? "" : " ".repeat(o)) + c : (p ? l : l + " ".repeat(o - l.length)) + c;
  }
}
function Kf(e, t, n, r) {
  const i = n.enter("paragraph"), l = n.enter("phrasing"), o = n.containerPhrasing(e, r);
  return l(), i(), o;
}
const Zf = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  lt([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function Yf(e, t, n, r) {
  return (e.children.some(function(o) {
    return Zf(o);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
function Xf(e) {
  const t = e.options.strong || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`"
    );
  return t;
}
vo.peek = Qf;
function vo(e, t, n, r) {
  const i = Xf(n), l = n.enter("strong"), o = n.createTracker(r), a = o.move(i + i);
  let u = o.move(
    n.containerPhrasing(e, {
      after: i,
      before: a,
      ...o.current()
    })
  );
  const s = u.charCodeAt(0), f = tt(
    r.before.charCodeAt(r.before.length - 1),
    s,
    i
  );
  f.inside && (u = On(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), h = tt(r.after.charCodeAt(0), c, i);
  h.inside && (u = u.slice(0, -1) + On(c));
  const p = o.move(i + i);
  return l(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + u + p;
}
function Qf(e, t, n) {
  return n.options.strong || "*";
}
function Jf(e, t, n, r) {
  return n.safe(e.value, r);
}
function ep(e) {
  const t = e.options.ruleRepetition || 3;
  if (t < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return t;
}
function np(e, t, n) {
  const r = (To(n) + (n.options.ruleSpaces ? " " : "")).repeat(ep(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Io = {
  blockquote: Sf,
  break: hi,
  code: Nf,
  definition: Of,
  emphasis: xo,
  hardBreak: hi,
  heading: Pf,
  html: ko,
  image: Eo,
  imageReference: wo,
  inlineCode: _o,
  link: Ao,
  linkReference: Co,
  list: Gf,
  listItem: Wf,
  paragraph: Kf,
  root: Yf,
  strong: vo,
  text: Jf,
  thematicBreak: np
};
function tp() {
  return {
    enter: {
      table: rp,
      tableData: gi,
      tableHeader: gi,
      tableRow: op
    },
    exit: {
      codeText: lp,
      table: ip,
      tableData: zt,
      tableHeader: zt,
      tableRow: zt
    }
  };
}
function rp(e) {
  const t = e._align;
  this.enter(
    {
      type: "table",
      align: t.map(function(n) {
        return n === "none" ? null : n;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function ip(e) {
  this.exit(e), this.data.inTable = void 0;
}
function op(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function zt(e) {
  this.exit(e);
}
function gi(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function lp(e) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, ap));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e);
}
function ap(e, t) {
  return t === "|" ? t : e;
}
function sp(e) {
  const t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, l = n ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: h,
      table: o,
      tableCell: u,
      tableRow: a
    }
  };
  function o(p, b, k, _) {
    return s(f(p, k, _), p.align);
  }
  function a(p, b, k, _) {
    const y = c(p, k, _), C = s([y]);
    return C.slice(0, C.indexOf(`
`));
  }
  function u(p, b, k, _) {
    const y = k.enter("tableCell"), C = k.enter("phrasing"), A = k.containerPhrasing(p, {
      ..._,
      before: l,
      after: l
    });
    return C(), y(), A;
  }
  function s(p, b) {
    return wf(p, {
      align: b,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: n,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(p, b, k) {
    const _ = p.children;
    let y = -1;
    const C = [], A = b.enter("table");
    for (; ++y < _.length; )
      C[y] = c(_[y], b, k);
    return A(), C;
  }
  function c(p, b, k) {
    const _ = p.children;
    let y = -1;
    const C = [], A = b.enter("tableRow");
    for (; ++y < _.length; )
      C[y] = u(_[y], p, b, k);
    return A(), C;
  }
  function h(p, b, k) {
    let _ = Io.inlineCode(p, b, k);
    return k.stack.includes("tableCell") && (_ = _.replace(/\|/g, "\\$&")), _;
  }
}
function up() {
  return {
    exit: {
      taskListCheckValueChecked: di,
      taskListCheckValueUnchecked: di,
      paragraph: fp
    }
  };
}
function cp() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: pp }
  };
}
function di(e) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function fp(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = t.children;
      let l = -1, o;
      for (; ++l < i.length; ) {
        const a = i[l];
        if (a.type === "paragraph") {
          o = a;
          break;
        }
      }
      o === n && (r.value = r.value.slice(1), r.value.length === 0 ? n.children.shift() : n.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, n.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function pp(e, t, n, r) {
  const i = e.children[0], l = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", a = n.createTracker(r);
  l && a.move(o);
  let u = Io.listItem(e, t, n, {
    ...r,
    ...a.current()
  });
  return l && (u = u.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, s)), u;
  function s(f) {
    return f + o;
  }
}
function hp() {
  return [
    qc(),
    pf(),
    mf(),
    tp(),
    up()
  ];
}
function gp(e) {
  return {
    extensions: [
      Gc(),
      hf(e),
      bf(),
      sp(e),
      cp()
    ]
  };
}
const dp = {
  tokenize: Ep,
  partial: !0
}, No = {
  tokenize: wp,
  partial: !0
}, Ro = {
  tokenize: _p,
  partial: !0
}, Oo = {
  tokenize: Sp,
  partial: !0
}, mp = {
  tokenize: Ap,
  partial: !0
}, Mo = {
  name: "wwwAutolink",
  tokenize: xp,
  previous: Do
}, Lo = {
  name: "protocolAutolink",
  tokenize: kp,
  previous: Po
}, Qe = {
  name: "emailAutolink",
  tokenize: yp,
  previous: zo
}, We = {};
function bp() {
  return {
    text: We
  };
}
let cn = 48;
for (; cn < 123; )
  We[cn] = Qe, cn++, cn === 58 ? cn = 65 : cn === 91 && (cn = 97);
We[43] = Qe;
We[45] = Qe;
We[46] = Qe;
We[95] = Qe;
We[72] = [Qe, Lo];
We[104] = [Qe, Lo];
We[87] = [Qe, Mo];
We[119] = [Qe, Mo];
function yp(e, t, n) {
  const r = this;
  let i, l;
  return o;
  function o(c) {
    return !Kt(c) || !zo.call(r, r.previous) || gr(r.events) ? n(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return Kt(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), u) : n(c);
  }
  function u(c) {
    return c === 46 ? e.check(mp, f, s)(c) : c === 45 || c === 95 || Ce(c) ? (l = !0, e.consume(c), u) : f(c);
  }
  function s(c) {
    return e.consume(c), i = !0, u;
  }
  function f(c) {
    return l && i && Ie(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(c)) : n(c);
  }
}
function xp(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o !== 87 && o !== 119 || !Do.call(r, r.previous) || gr(r.events) ? n(o) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(dp, e.attempt(No, e.attempt(Ro, l), n), n)(o));
  }
  function l(o) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(o);
  }
}
function kp(e, t, n) {
  const r = this;
  let i = "", l = !1;
  return o;
  function o(c) {
    return (c === 72 || c === 104) && Po.call(r, r.previous) && !gr(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), a) : n(c);
  }
  function a(c) {
    if (Ie(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const h = i.toLowerCase();
      if (h === "http" || h === "https")
        return e.consume(c), u;
    }
    return n(c);
  }
  function u(c) {
    return c === 47 ? (e.consume(c), l ? s : (l = !0, u)) : n(c);
  }
  function s(c) {
    return c === null || Jn(c) || ae(c) || fn(c) || rt(c) ? n(c) : e.attempt(No, e.attempt(Ro, f), n)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(c);
  }
}
function Ep(e, t, n) {
  let r = 0;
  return i;
  function i(o) {
    return (o === 87 || o === 119) && r < 3 ? (r++, e.consume(o), i) : o === 46 && r === 3 ? (e.consume(o), l) : n(o);
  }
  function l(o) {
    return o === null ? n(o) : t(o);
  }
}
function wp(e, t, n) {
  let r, i, l;
  return o;
  function o(s) {
    return s === 46 || s === 95 ? e.check(Oo, u, a)(s) : s === null || ae(s) || fn(s) || s !== 45 && rt(s) ? u(s) : (l = !0, e.consume(s), o);
  }
  function a(s) {
    return s === 95 ? r = !0 : (i = r, r = void 0), e.consume(s), o;
  }
  function u(s) {
    return i || r || !l ? n(s) : t(s);
  }
}
function _p(e, t) {
  let n = 0, r = 0;
  return i;
  function i(o) {
    return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? l(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(Oo, t, l)(o) : o === null || ae(o) || fn(o) ? t(o) : (e.consume(o), i);
  }
  function l(o) {
    return o === 41 && r++, e.consume(o), i;
  }
}
function Sp(e, t, n) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), l) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || ae(a) || fn(a) ? t(a) : n(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || ae(a) || fn(a) ? t(a) : r(a);
  }
  function l(a) {
    return Ie(a) ? o(a) : n(a);
  }
  function o(a) {
    return a === 59 ? (e.consume(a), r) : Ie(a) ? (e.consume(a), o) : n(a);
  }
}
function Ap(e, t, n) {
  return r;
  function r(l) {
    return e.consume(l), i;
  }
  function i(l) {
    return Ce(l) ? n(l) : t(l);
  }
}
function Do(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || ae(e);
}
function Po(e) {
  return !Ie(e);
}
function zo(e) {
  return !(e === 47 || Kt(e));
}
function Kt(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || Ce(e);
}
function gr(e) {
  let t = e.length, n = !1;
  for (; t--; ) {
    const r = e[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
const Cp = {
  tokenize: Lp,
  partial: !0
};
function Tp() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Rp,
        continuation: {
          tokenize: Op
        },
        exit: Mp
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Np
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: vp,
        resolveTo: Ip
      }
    }
  };
}
function vp(e, t, n) {
  const r = this;
  let i = r.events.length;
  const l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o;
  for (; i--; ) {
    const u = r.events[i][1];
    if (u.type === "labelImage") {
      o = u;
      break;
    }
    if (u.type === "gfmFootnoteCall" || u.type === "labelLink" || u.type === "label" || u.type === "image" || u.type === "link")
      break;
  }
  return a;
  function a(u) {
    if (!o || !o._balanced)
      return n(u);
    const s = He(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }));
    return s.codePointAt(0) !== 94 || !l.includes(s.slice(1)) ? n(u) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(u), e.exit("gfmFootnoteCallLabelMarker"), t(u));
  }
}
function Ip(e, t) {
  let n = e.length;
  for (; n--; )
    if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
      e[n][1];
      break;
    }
  e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[n + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[n + 3][1].end),
    end: Object.assign({}, e[n + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const l = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, o = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, l.start),
    end: Object.assign({}, l.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[n + 1],
    e[n + 2],
    ["enter", r, t],
    // The `[`
    e[n + 3],
    e[n + 4],
    // The `^`.
    ["enter", i, t],
    ["exit", i, t],
    // Everything in between.
    ["enter", l, t],
    ["enter", o, t],
    ["exit", o, t],
    ["exit", l, t],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, t]
  ];
  return e.splice(n, e.length - n + 1, ...a), e;
}
function Np(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l = 0, o;
  return a;
  function a(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), u;
  }
  function u(c) {
    return c !== 94 ? n(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", s);
  }
  function s(c) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      c === 93 && !o || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || ae(c)
    )
      return n(c);
    if (c === 93) {
      e.exit("chunkString");
      const h = e.exit("gfmFootnoteCallString");
      return i.includes(He(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(c);
    }
    return ae(c) || (o = !0), l++, e.consume(c), c === 92 ? f : s;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, s) : s(c);
  }
}
function Rp(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l, o = 0, a;
  return u;
  function u(b) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(b), e.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(b) {
    return b === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(b), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : n(b);
  }
  function f(b) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      b === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      b === null || b === 91 || ae(b)
    )
      return n(b);
    if (b === 93) {
      e.exit("chunkString");
      const k = e.exit("gfmFootnoteDefinitionLabelString");
      return l = He(r.sliceSerialize(k)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(b), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return ae(b) || (a = !0), o++, e.consume(b), b === 92 ? c : f;
  }
  function c(b) {
    return b === 91 || b === 92 || b === 93 ? (e.consume(b), o++, f) : f(b);
  }
  function h(b) {
    return b === 58 ? (e.enter("definitionMarker"), e.consume(b), e.exit("definitionMarker"), i.includes(l) || i.push(l), ie(e, p, "gfmFootnoteDefinitionWhitespace")) : n(b);
  }
  function p(b) {
    return t(b);
  }
}
function Op(e, t, n) {
  return e.check(Ln, t, e.attempt(Cp, t, n));
}
function Mp(e) {
  e.exit("gfmFootnoteDefinition");
}
function Lp(e, t, n) {
  const r = this;
  return ie(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "gfmFootnoteDefinitionIndent" && o[2].sliceSerialize(o[1], !0).length === 4 ? t(l) : n(l);
  }
}
function Dp(e) {
  let n = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: l,
    resolveAll: i
  };
  return n == null && (n = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(o, a) {
    let u = -1;
    for (; ++u < o.length; )
      if (o[u][0] === "enter" && o[u][1].type === "strikethroughSequenceTemporary" && o[u][1]._close) {
        let s = u;
        for (; s--; )
          if (o[s][0] === "exit" && o[s][1].type === "strikethroughSequenceTemporary" && o[s][1]._open && // If the sizes are the same:
          o[u][1].end.offset - o[u][1].start.offset === o[s][1].end.offset - o[s][1].start.offset) {
            o[u][1].type = "strikethroughSequence", o[s][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, o[s][1].start),
              end: Object.assign({}, o[u][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, o[s][1].end),
              end: Object.assign({}, o[u][1].start)
            }, h = [["enter", f, a], ["enter", o[s][1], a], ["exit", o[s][1], a], ["enter", c, a]], p = a.parser.constructs.insideSpan.null;
            p && ze(h, h.length, 0, it(p, o.slice(s + 1, u), a)), ze(h, h.length, 0, [["exit", c, a], ["enter", o[u][1], a], ["exit", o[u][1], a], ["exit", f, a]]), ze(o, s - 1, u - s + 3, h), u = s + h.length - 2;
            break;
          }
      }
    for (u = -1; ++u < o.length; )
      o[u][1].type === "strikethroughSequenceTemporary" && (o[u][1].type = "data");
    return o;
  }
  function l(o, a, u) {
    const s = this.previous, f = this.events;
    let c = 0;
    return h;
    function h(b) {
      return s === 126 && f[f.length - 1][1].type !== "characterEscape" ? u(b) : (o.enter("strikethroughSequenceTemporary"), p(b));
    }
    function p(b) {
      const k = xn(s);
      if (b === 126)
        return c > 1 ? u(b) : (o.consume(b), c++, p);
      if (c < 2 && !n) return u(b);
      const _ = o.exit("strikethroughSequenceTemporary"), y = xn(b);
      return _._open = !y || y === 2 && !!k, _._close = !k || k === 2 && !!y, a(b);
    }
  }
}
class Pp {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(t, n, r) {
    zp(this, t, n, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(t) {
    if (this.map.sort(function(l, o) {
      return l[0] - o[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      n -= 1, r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), t.length = this.map[n][0];
    r.push(t.slice()), t.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const l of i)
        t.push(l);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function zp(e, t, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === t) {
        e.map[i][1] += n, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([t, n, r]);
  }
}
function Bp(e, t) {
  let n = !1;
  const r = [];
  for (; t < e.length; ) {
    const i = e[t];
    if (n) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[t - 1][1].type === "tableDelimiterMarker") {
          const l = r.length - 1;
          r[l] = r[l] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
    t += 1;
  }
  return r;
}
function Fp() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Up,
        resolveAll: $p
      }
    }
  };
}
function Up(e, t, n) {
  const r = this;
  let i = 0, l = 0, o;
  return a;
  function a(x) {
    let M = r.events.length - 1;
    for (; M > -1; ) {
      const z = r.events[M][1].type;
      if (z === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      z === "linePrefix") M--;
      else break;
    }
    const P = M > -1 ? r.events[M][1].type : null, te = P === "tableHead" || P === "tableRow" ? E : u;
    return te === E && r.parser.lazy[r.now().line] ? n(x) : te(x);
  }
  function u(x) {
    return e.enter("tableHead"), e.enter("tableRow"), s(x);
  }
  function s(x) {
    return x === 124 || (o = !0, l += 1), f(x);
  }
  function f(x) {
    return x === null ? n(x) : H(x) ? l > 1 ? (l = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), p) : n(x) : ee(x) ? ie(e, f, "whitespace")(x) : (l += 1, o && (o = !1, i += 1), x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), o = !0, f) : (e.enter("data"), c(x)));
  }
  function c(x) {
    return x === null || x === 124 || ae(x) ? (e.exit("data"), f(x)) : (e.consume(x), x === 92 ? h : c);
  }
  function h(x) {
    return x === 92 || x === 124 ? (e.consume(x), c) : c(x);
  }
  function p(x) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(x) : (e.enter("tableDelimiterRow"), o = !1, ee(x) ? ie(e, b, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : b(x));
  }
  function b(x) {
    return x === 45 || x === 58 ? _(x) : x === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), k) : D(x);
  }
  function k(x) {
    return ee(x) ? ie(e, _, "whitespace")(x) : _(x);
  }
  function _(x) {
    return x === 58 ? (l += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), y) : x === 45 ? (l += 1, y(x)) : x === null || H(x) ? $(x) : D(x);
  }
  function y(x) {
    return x === 45 ? (e.enter("tableDelimiterFiller"), C(x)) : D(x);
  }
  function C(x) {
    return x === 45 ? (e.consume(x), C) : x === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), A) : (e.exit("tableDelimiterFiller"), A(x));
  }
  function A(x) {
    return ee(x) ? ie(e, $, "whitespace")(x) : $(x);
  }
  function $(x) {
    return x === 124 ? b(x) : x === null || H(x) ? !o || i !== l ? D(x) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(x)) : D(x);
  }
  function D(x) {
    return n(x);
  }
  function E(x) {
    return e.enter("tableRow"), V(x);
  }
  function V(x) {
    return x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), V) : x === null || H(x) ? (e.exit("tableRow"), t(x)) : ee(x) ? ie(e, V, "whitespace")(x) : (e.enter("data"), K(x));
  }
  function K(x) {
    return x === null || x === 124 || ae(x) ? (e.exit("data"), V(x)) : (e.consume(x), x === 92 ? j : K);
  }
  function j(x) {
    return x === 92 || x === 124 ? (e.consume(x), K) : K(x);
  }
}
function $p(e, t) {
  let n = -1, r = !0, i = 0, l = [0, 0, 0, 0], o = [0, 0, 0, 0], a = !1, u = 0, s, f, c;
  const h = new Pp();
  for (; ++n < e.length; ) {
    const p = e[n], b = p[1];
    p[0] === "enter" ? b.type === "tableHead" ? (a = !1, u !== 0 && (mi(h, t, u, s, f), f = void 0, u = 0), s = {
      type: "table",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, h.add(n, 0, [["enter", s, t]])) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (r = !0, c = void 0, l = [0, 0, 0, 0], o = [0, n + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, b.start),
      // Note: correct end is set later.
      end: Object.assign({}, b.end)
    }, h.add(n, 0, [["enter", f, t]])), i = b.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (l[1] !== 0 && (o[0] = o[1], c = Yn(h, t, l, i, void 0, c), l = [0, 0, 0, 0]), o[2] = n)) : b.type === "tableCellDivider" && (r ? r = !1 : (l[1] !== 0 && (o[0] = o[1], c = Yn(h, t, l, i, void 0, c)), l = o, o = [l[1], n, 0, 0])) : b.type === "tableHead" ? (a = !0, u = n) : b.type === "tableRow" || b.type === "tableDelimiterRow" ? (u = n, l[1] !== 0 ? (o[0] = o[1], c = Yn(h, t, l, i, n, c)) : o[1] !== 0 && (c = Yn(h, t, o, i, n, c)), i = 0) : i && (b.type === "data" || b.type === "tableDelimiterMarker" || b.type === "tableDelimiterFiller") && (o[3] = n);
  }
  for (u !== 0 && mi(h, t, u, s, f), h.consume(t.events), n = -1; ++n < t.events.length; ) {
    const p = t.events[n];
    p[0] === "enter" && p[1].type === "table" && (p[1]._align = Bp(t.events, n));
  }
  return e;
}
function Yn(e, t, n, r, i, l) {
  const o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  n[0] !== 0 && (l.end = Object.assign({}, bn(t.events, n[0])), e.add(n[0], 0, [["exit", l, t]]));
  const u = bn(t.events, n[1]);
  if (l = {
    type: o,
    start: Object.assign({}, u),
    // Note: correct end is set later.
    end: Object.assign({}, u)
  }, e.add(n[1], 0, [["enter", l, t]]), n[2] !== 0) {
    const s = bn(t.events, n[2]), f = bn(t.events, n[3]), c = {
      type: a,
      start: Object.assign({}, s),
      end: Object.assign({}, f)
    };
    if (e.add(n[2], 0, [["enter", c, t]]), r !== 2) {
      const h = t.events[n[2]], p = t.events[n[3]];
      if (h[1].end = Object.assign({}, p[1].end), h[1].type = "chunkText", h[1].contentType = "text", n[3] > n[2] + 1) {
        const b = n[2] + 1, k = n[3] - n[2] - 1;
        e.add(b, k, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return i !== void 0 && (l.end = Object.assign({}, bn(t.events, i)), e.add(i, 0, [["exit", l, t]]), l = void 0), l;
}
function mi(e, t, n, r, i) {
  const l = [], o = bn(t.events, n);
  i && (i.end = Object.assign({}, o), l.push(["exit", i, t])), r.end = Object.assign({}, o), l.push(["exit", r, t]), e.add(n + 1, 0, l);
}
function bn(e, t) {
  const n = e[t], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const Hp = {
  name: "tasklistCheck",
  tokenize: qp
};
function jp() {
  return {
    text: {
      91: Hp
    }
  };
}
function qp(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(u) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(u), e.exit("taskListCheckMarker"), l)
    );
  }
  function l(u) {
    return ae(u) ? (e.enter("taskListCheckValueUnchecked"), e.consume(u), e.exit("taskListCheckValueUnchecked"), o) : u === 88 || u === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(u), e.exit("taskListCheckValueChecked"), o) : n(u);
  }
  function o(u) {
    return u === 93 ? (e.enter("taskListCheckMarker"), e.consume(u), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : n(u);
  }
  function a(u) {
    return H(u) ? t(u) : ee(u) ? e.check({
      tokenize: Gp
    }, t, n)(u) : n(u);
  }
}
function Gp(e, t, n) {
  return ie(e, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function Vp(e) {
  return Wi([
    bp(),
    Tp(),
    Dp(e),
    Fp(),
    jp()
  ]);
}
const Wp = {};
function Kp(e) {
  const t = (
    /** @type {Processor<Root>} */
    this
  ), n = e || Wp, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(Vp(n)), l.push(hp()), o.push(gp(n));
}
xe.registerLanguage("python", al);
xe.registerLanguage("javascript", Ei);
xe.registerLanguage("js", Ei);
xe.registerLanguage("typescript", Ii);
xe.registerLanguage("ts", Ii);
xe.registerLanguage("json", hl);
xe.registerLanguage("bash", Yt);
xe.registerLanguage("sh", Yt);
xe.registerLanguage("shell", Yt);
xe.registerLanguage("sql", gl);
xe.registerLanguage("html", Ni);
xe.registerLanguage("xml", Ni);
xe.registerLanguage("css", _l);
xe.registerLanguage("yaml", Ri);
xe.registerLanguage("yml", Ri);
xe.registerLanguage("markdown", Oi);
xe.registerLanguage("md", Oi);
function Bo(e, t) {
  return t && xe.getLanguage(t) ? xe.highlight(e, { language: t }).value : xe.highlightAuto(e).value;
}
function Xp({
  code: e,
  content: t,
  language: n,
  className: r,
  cssClass: i
}) {
  const l = e ?? t ?? "", o = il.useMemo(
    () => Bo(l, n),
    [l, n]
  );
  return /* @__PURE__ */ ce.jsx(
    "pre",
    {
      className: bi(
        "rounded-md bg-muted p-4 text-sm overflow-x-auto font-mono",
        r,
        i
      ),
      children: /* @__PURE__ */ ce.jsx(
        "code",
        {
          className: n ? `language-${n}` : void 0,
          dangerouslySetInnerHTML: { __html: o }
        }
      )
    }
  );
}
function Qp({
  content: e,
  text: t,
  className: n,
  cssClass: r
}) {
  const i = e ?? t ?? "";
  return /* @__PURE__ */ ce.jsx("div", { className: bi("max-w-none", n, r), children: /* @__PURE__ */ ce.jsx(
    Lc,
    {
      remarkPlugins: [Kp],
      components: {
        h1: ({ children: l }) => /* @__PURE__ */ ce.jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4", children: l }),
        h2: ({ children: l }) => /* @__PURE__ */ ce.jsx("h2", { className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4", children: l }),
        h3: ({ children: l }) => /* @__PURE__ */ ce.jsx("h3", { className: "scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3", children: l }),
        h4: ({ children: l }) => /* @__PURE__ */ ce.jsx("h4", { className: "scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2", children: l }),
        p: ({ children: l }) => /* @__PURE__ */ ce.jsx("p", { className: "leading-7 [&:not(:first-child)]:mt-4", children: l }),
        blockquote: ({ children: l }) => /* @__PURE__ */ ce.jsx("blockquote", { className: "mt-6 border-l-2 pl-6 italic text-muted-foreground", children: l }),
        ul: ({ children: l }) => /* @__PURE__ */ ce.jsx("ul", { className: "my-4 ml-6 list-disc [&>li]:mt-2", children: l }),
        ol: ({ children: l }) => /* @__PURE__ */ ce.jsx("ol", { className: "my-4 ml-6 list-decimal [&>li]:mt-2", children: l }),
        code: ({ children: l, className: o }) => {
          if (o) {
            const a = o.replace("language-", ""), u = String(l).replace(/\n$/, ""), s = Bo(u, a);
            return /* @__PURE__ */ ce.jsx("pre", { className: "rounded-md bg-muted p-4 text-sm overflow-x-auto my-4 font-mono", children: /* @__PURE__ */ ce.jsx("code", { dangerouslySetInnerHTML: { __html: s } }) });
          }
          return /* @__PURE__ */ ce.jsx("code", { className: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", children: l });
        },
        pre: ({ children: l }) => /* @__PURE__ */ ce.jsx(ce.Fragment, { children: l }),
        table: ({ children: l }) => /* @__PURE__ */ ce.jsx("div", { className: "my-6 w-full overflow-y-auto", children: /* @__PURE__ */ ce.jsx("table", { className: "w-full", children: l }) }),
        th: ({ children: l }) => /* @__PURE__ */ ce.jsx("th", { className: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", children: l }),
        td: ({ children: l }) => /* @__PURE__ */ ce.jsx("td", { className: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", children: l }),
        hr: () => /* @__PURE__ */ ce.jsx("hr", { className: "my-6" }),
        a: ({ href: l, children: o }) => /* @__PURE__ */ ce.jsx(
          "a",
          {
            href: l,
            className: "font-medium text-primary underline underline-offset-4",
            target: "_blank",
            rel: "noopener noreferrer",
            children: o
          }
        )
      },
      children: i
    }
  ) });
}
export {
  Xp as Code,
  Qp as Markdown
};
