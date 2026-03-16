import { j as Yt, c as jt } from "./embed-CGSdzR6S.mjs";
import { a as Xt } from "./icons-CImNZgDa.mjs";
/*! @license DOMPurify 3.3.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.2/LICENSE */
const {
  entries: _t,
  setPrototypeOf: ct,
  isFrozen: Vt,
  getPrototypeOf: $t,
  getOwnPropertyDescriptor: qt
} = Object;
let {
  freeze: R,
  seal: L,
  create: me
} = Object, {
  apply: ke,
  construct: Ue
} = typeof Reflect < "u" && Reflect;
R || (R = function(n) {
  return n;
});
L || (L = function(n) {
  return n;
});
ke || (ke = function(n, l) {
  for (var a = arguments.length, c = new Array(a > 2 ? a - 2 : 0), _ = 2; _ < a; _++)
    c[_ - 2] = arguments[_];
  return n.apply(l, c);
});
Ue || (Ue = function(n) {
  for (var l = arguments.length, a = new Array(l > 1 ? l - 1 : 0), c = 1; c < l; c++)
    a[c - 1] = arguments[c];
  return new n(...a);
});
const fe = O(Array.prototype.forEach), Kt = O(Array.prototype.lastIndexOf), ft = O(Array.prototype.pop), q = O(Array.prototype.push), Zt = O(Array.prototype.splice), pe = O(String.prototype.toLowerCase), Ce = O(String.prototype.toString), Me = O(String.prototype.match), K = O(String.prototype.replace), Jt = O(String.prototype.indexOf), Qt = O(String.prototype.trim), y = O(Object.prototype.hasOwnProperty), S = O(RegExp.prototype.test), Z = en(TypeError);
function O(r) {
  return function(n) {
    n instanceof RegExp && (n.lastIndex = 0);
    for (var l = arguments.length, a = new Array(l > 1 ? l - 1 : 0), c = 1; c < l; c++)
      a[c - 1] = arguments[c];
    return ke(r, n, a);
  };
}
function en(r) {
  return function() {
    for (var n = arguments.length, l = new Array(n), a = 0; a < n; a++)
      l[a] = arguments[a];
    return Ue(r, l);
  };
}
function s(r, n) {
  let l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : pe;
  ct && ct(r, null);
  let a = n.length;
  for (; a--; ) {
    let c = n[a];
    if (typeof c == "string") {
      const _ = l(c);
      _ !== c && (Vt(n) || (n[a] = _), c = _);
    }
    r[c] = !0;
  }
  return r;
}
function tn(r) {
  for (let n = 0; n < r.length; n++)
    y(r, n) || (r[n] = null);
  return r;
}
function C(r) {
  const n = me(null);
  for (const [l, a] of _t(r))
    y(r, l) && (Array.isArray(a) ? n[l] = tn(a) : a && typeof a == "object" && a.constructor === Object ? n[l] = C(a) : n[l] = a);
  return n;
}
function J(r, n) {
  for (; r !== null; ) {
    const a = qt(r, n);
    if (a) {
      if (a.get)
        return O(a.get);
      if (typeof a.value == "function")
        return O(a.value);
    }
    r = $t(r);
  }
  function l() {
    return null;
  }
  return l;
}
const ut = R(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), we = R(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), xe = R(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), nn = R(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Pe = R(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), on = R(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), mt = R(["#text"]), pt = R(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), ve = R(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Tt = R(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ue = R(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), an = L(/\{\{[\w\W]*|[\w\W]*\}\}/gm), rn = L(/<%[\w\W]*|[\w\W]*%>/gm), sn = L(/\$\{[\w\W]*/gm), ln = L(/^data-[\-\w.\u00B7-\uFFFF]+$/), cn = L(/^aria-[\-\w]+$/), gt = L(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), fn = L(/^(?:\w+script|data):/i), un = L(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), At = L(/^html$/i), mn = L(/^[a-z][.\w]*(-[.\w]+)+$/i);
var dt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: cn,
  ATTR_WHITESPACE: un,
  CUSTOM_ELEMENT: mn,
  DATA_ATTR: ln,
  DOCTYPE_NAME: At,
  ERB_EXPR: rn,
  IS_ALLOWED_URI: gt,
  IS_SCRIPT_OR_DATA: fn,
  MUSTACHE_EXPR: an,
  TMPLIT_EXPR: sn
});
const Q = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, pn = function() {
  return typeof window > "u" ? null : window;
}, Tn = function(n, l) {
  if (typeof n != "object" || typeof n.createPolicy != "function")
    return null;
  let a = null;
  const c = "data-tt-policy-suffix";
  l && l.hasAttribute(c) && (a = l.getAttribute(c));
  const _ = "dompurify" + (a ? "#" + a : "");
  try {
    return n.createPolicy(_, {
      createHTML(b) {
        return b;
      },
      createScriptURL(b) {
        return b;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + _ + " could not be created."), null;
  }
}, Et = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function ht() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : pn();
  const n = (i) => ht(i);
  if (n.version = "3.3.2", n.removed = [], !r || !r.document || r.document.nodeType !== Q.document || !r.Element)
    return n.isSupported = !1, n;
  let {
    document: l
  } = r;
  const a = l, c = a.currentScript, {
    DocumentFragment: _,
    HTMLTemplateElement: b,
    Node: Te,
    Element: Fe,
    NodeFilter: B,
    NamedNodeMap: St = r.NamedNodeMap || r.MozNamedAttrMap,
    HTMLFormElement: Rt,
    DOMParser: Ot,
    trustedTypes: ee
  } = r, Y = Fe.prototype, Dt = J(Y, "cloneNode"), yt = J(Y, "remove"), Lt = J(Y, "nextSibling"), bt = J(Y, "childNodes"), te = J(Y, "parentNode");
  if (typeof b == "function") {
    const i = l.createElement("template");
    i.content && i.content.ownerDocument && (l = i.content.ownerDocument);
  }
  let A, j = "";
  const {
    implementation: de,
    createNodeIterator: Nt,
    createDocumentFragment: It,
    getElementsByTagName: Ct
  } = l, {
    importNode: Mt
  } = a;
  let h = Et();
  n.isSupported = typeof _t == "function" && typeof te == "function" && de && de.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Ee,
    ERB_EXPR: _e,
    TMPLIT_EXPR: ge,
    DATA_ATTR: wt,
    ARIA_ATTR: xt,
    IS_SCRIPT_OR_DATA: Pt,
    ATTR_WHITESPACE: He,
    CUSTOM_ELEMENT: vt
  } = dt;
  let {
    IS_ALLOWED_URI: ze
  } = dt, T = null;
  const Ge = s({}, [...ut, ...we, ...xe, ...Pe, ...mt]);
  let d = null;
  const We = s({}, [...pt, ...ve, ...Tt, ...ue]);
  let u = Object.seal(me(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), X = null, ne = null;
  const P = Object.seal(me(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Be = !0, Ae = !0, Ye = !1, je = !0, U = !1, oe = !0, v = !1, he = !1, Se = !1, F = !1, ie = !1, ae = !1, Xe = !0, Ve = !1;
  const kt = "user-content-";
  let Re = !0, V = !1, H = {}, N = null;
  const Oe = s({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $e = null;
  const qe = s({}, ["audio", "video", "img", "source", "image", "track"]);
  let De = null;
  const Ke = s({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), re = "http://www.w3.org/1998/Math/MathML", se = "http://www.w3.org/2000/svg", M = "http://www.w3.org/1999/xhtml";
  let z = M, ye = !1, Le = null;
  const Ut = s({}, [re, se, M], Ce);
  let le = s({}, ["mi", "mo", "mn", "ms", "mtext"]), ce = s({}, ["annotation-xml"]);
  const Ft = s({}, ["title", "style", "font", "a", "script"]);
  let $ = null;
  const Ht = ["application/xhtml+xml", "text/html"], zt = "text/html";
  let p = null, G = null;
  const Gt = l.createElement("form"), Ze = function(e) {
    return e instanceof RegExp || e instanceof Function;
  }, be = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(G && G === e)) {
      if ((!e || typeof e != "object") && (e = {}), e = C(e), $ = // eslint-disable-next-line unicorn/prefer-includes
      Ht.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? zt : e.PARSER_MEDIA_TYPE, p = $ === "application/xhtml+xml" ? Ce : pe, T = y(e, "ALLOWED_TAGS") ? s({}, e.ALLOWED_TAGS, p) : Ge, d = y(e, "ALLOWED_ATTR") ? s({}, e.ALLOWED_ATTR, p) : We, Le = y(e, "ALLOWED_NAMESPACES") ? s({}, e.ALLOWED_NAMESPACES, Ce) : Ut, De = y(e, "ADD_URI_SAFE_ATTR") ? s(C(Ke), e.ADD_URI_SAFE_ATTR, p) : Ke, $e = y(e, "ADD_DATA_URI_TAGS") ? s(C(qe), e.ADD_DATA_URI_TAGS, p) : qe, N = y(e, "FORBID_CONTENTS") ? s({}, e.FORBID_CONTENTS, p) : Oe, X = y(e, "FORBID_TAGS") ? s({}, e.FORBID_TAGS, p) : C({}), ne = y(e, "FORBID_ATTR") ? s({}, e.FORBID_ATTR, p) : C({}), H = y(e, "USE_PROFILES") ? e.USE_PROFILES : !1, Be = e.ALLOW_ARIA_ATTR !== !1, Ae = e.ALLOW_DATA_ATTR !== !1, Ye = e.ALLOW_UNKNOWN_PROTOCOLS || !1, je = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, U = e.SAFE_FOR_TEMPLATES || !1, oe = e.SAFE_FOR_XML !== !1, v = e.WHOLE_DOCUMENT || !1, F = e.RETURN_DOM || !1, ie = e.RETURN_DOM_FRAGMENT || !1, ae = e.RETURN_TRUSTED_TYPE || !1, Se = e.FORCE_BODY || !1, Xe = e.SANITIZE_DOM !== !1, Ve = e.SANITIZE_NAMED_PROPS || !1, Re = e.KEEP_CONTENT !== !1, V = e.IN_PLACE || !1, ze = e.ALLOWED_URI_REGEXP || gt, z = e.NAMESPACE || M, le = e.MATHML_TEXT_INTEGRATION_POINTS || le, ce = e.HTML_INTEGRATION_POINTS || ce, u = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && Ze(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (u.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Ze(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (u.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (u.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), U && (Ae = !1), ie && (F = !0), H && (T = s({}, mt), d = me(null), H.html === !0 && (s(T, ut), s(d, pt)), H.svg === !0 && (s(T, we), s(d, ve), s(d, ue)), H.svgFilters === !0 && (s(T, xe), s(d, ve), s(d, ue)), H.mathMl === !0 && (s(T, Pe), s(d, Tt), s(d, ue))), y(e, "ADD_TAGS") || (P.tagCheck = null), y(e, "ADD_ATTR") || (P.attributeCheck = null), e.ADD_TAGS && (typeof e.ADD_TAGS == "function" ? P.tagCheck = e.ADD_TAGS : (T === Ge && (T = C(T)), s(T, e.ADD_TAGS, p))), e.ADD_ATTR && (typeof e.ADD_ATTR == "function" ? P.attributeCheck = e.ADD_ATTR : (d === We && (d = C(d)), s(d, e.ADD_ATTR, p))), e.ADD_URI_SAFE_ATTR && s(De, e.ADD_URI_SAFE_ATTR, p), e.FORBID_CONTENTS && (N === Oe && (N = C(N)), s(N, e.FORBID_CONTENTS, p)), e.ADD_FORBID_CONTENTS && (N === Oe && (N = C(N)), s(N, e.ADD_FORBID_CONTENTS, p)), Re && (T["#text"] = !0), v && s(T, ["html", "head", "body"]), T.table && (s(T, ["tbody"]), delete X.tbody), e.TRUSTED_TYPES_POLICY) {
        if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Z('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Z('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        A = e.TRUSTED_TYPES_POLICY, j = A.createHTML("");
      } else
        A === void 0 && (A = Tn(ee, c)), A !== null && typeof j == "string" && (j = A.createHTML(""));
      R && R(e), G = e;
    }
  }, Je = s({}, [...we, ...xe, ...nn]), Qe = s({}, [...Pe, ...on]), Wt = function(e) {
    let t = te(e);
    (!t || !t.tagName) && (t = {
      namespaceURI: z,
      tagName: "template"
    });
    const o = pe(e.tagName), f = pe(t.tagName);
    return Le[e.namespaceURI] ? e.namespaceURI === se ? t.namespaceURI === M ? o === "svg" : t.namespaceURI === re ? o === "svg" && (f === "annotation-xml" || le[f]) : !!Je[o] : e.namespaceURI === re ? t.namespaceURI === M ? o === "math" : t.namespaceURI === se ? o === "math" && ce[f] : !!Qe[o] : e.namespaceURI === M ? t.namespaceURI === se && !ce[f] || t.namespaceURI === re && !le[f] ? !1 : !Qe[o] && (Ft[o] || !Je[o]) : !!($ === "application/xhtml+xml" && Le[e.namespaceURI]) : !1;
  }, I = function(e) {
    q(n.removed, {
      element: e
    });
    try {
      te(e).removeChild(e);
    } catch {
      yt(e);
    }
  }, k = function(e, t) {
    try {
      q(n.removed, {
        attribute: t.getAttributeNode(e),
        from: t
      });
    } catch {
      q(n.removed, {
        attribute: null,
        from: t
      });
    }
    if (t.removeAttribute(e), e === "is")
      if (F || ie)
        try {
          I(t);
        } catch {
        }
      else
        try {
          t.setAttribute(e, "");
        } catch {
        }
  }, et = function(e) {
    let t = null, o = null;
    if (Se)
      e = "<remove></remove>" + e;
    else {
      const m = Me(e, /^[\r\n\t ]+/);
      o = m && m[0];
    }
    $ === "application/xhtml+xml" && z === M && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
    const f = A ? A.createHTML(e) : e;
    if (z === M)
      try {
        t = new Ot().parseFromString(f, $);
      } catch {
      }
    if (!t || !t.documentElement) {
      t = de.createDocument(z, "template", null);
      try {
        t.documentElement.innerHTML = ye ? j : f;
      } catch {
      }
    }
    const g = t.body || t.documentElement;
    return e && o && g.insertBefore(l.createTextNode(o), g.childNodes[0] || null), z === M ? Ct.call(t, v ? "html" : "body")[0] : v ? t.documentElement : g;
  }, tt = function(e) {
    return Nt.call(
      e.ownerDocument || e,
      e,
      // eslint-disable-next-line no-bitwise
      B.SHOW_ELEMENT | B.SHOW_COMMENT | B.SHOW_TEXT | B.SHOW_PROCESSING_INSTRUCTION | B.SHOW_CDATA_SECTION,
      null
    );
  }, Ne = function(e) {
    return e instanceof Rt && (typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || !(e.attributes instanceof St) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function");
  }, nt = function(e) {
    return typeof Te == "function" && e instanceof Te;
  };
  function w(i, e, t) {
    fe(i, (o) => {
      o.call(n, e, t, G);
    });
  }
  const ot = function(e) {
    let t = null;
    if (w(h.beforeSanitizeElements, e, null), Ne(e))
      return I(e), !0;
    const o = p(e.nodeName);
    if (w(h.uponSanitizeElement, e, {
      tagName: o,
      allowedTags: T
    }), oe && e.hasChildNodes() && !nt(e.firstElementChild) && S(/<[/\w!]/g, e.innerHTML) && S(/<[/\w!]/g, e.textContent) || e.nodeType === Q.progressingInstruction || oe && e.nodeType === Q.comment && S(/<[/\w]/g, e.data))
      return I(e), !0;
    if (!(P.tagCheck instanceof Function && P.tagCheck(o)) && (!T[o] || X[o])) {
      if (!X[o] && at(o) && (u.tagNameCheck instanceof RegExp && S(u.tagNameCheck, o) || u.tagNameCheck instanceof Function && u.tagNameCheck(o)))
        return !1;
      if (Re && !N[o]) {
        const f = te(e) || e.parentNode, g = bt(e) || e.childNodes;
        if (g && f) {
          const m = g.length;
          for (let D = m - 1; D >= 0; --D) {
            const x = Dt(g[D], !0);
            x.__removalCount = (e.__removalCount || 0) + 1, f.insertBefore(x, Lt(e));
          }
        }
      }
      return I(e), !0;
    }
    return e instanceof Fe && !Wt(e) || (o === "noscript" || o === "noembed" || o === "noframes") && S(/<\/no(script|embed|frames)/i, e.innerHTML) ? (I(e), !0) : (U && e.nodeType === Q.text && (t = e.textContent, fe([Ee, _e, ge], (f) => {
      t = K(t, f, " ");
    }), e.textContent !== t && (q(n.removed, {
      element: e.cloneNode()
    }), e.textContent = t)), w(h.afterSanitizeElements, e, null), !1);
  }, it = function(e, t, o) {
    if (ne[t] || Xe && (t === "id" || t === "name") && (o in l || o in Gt))
      return !1;
    if (!(Ae && !ne[t] && S(wt, t))) {
      if (!(Be && S(xt, t))) {
        if (!(P.attributeCheck instanceof Function && P.attributeCheck(t, e))) {
          if (!d[t] || ne[t]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(at(e) && (u.tagNameCheck instanceof RegExp && S(u.tagNameCheck, e) || u.tagNameCheck instanceof Function && u.tagNameCheck(e)) && (u.attributeNameCheck instanceof RegExp && S(u.attributeNameCheck, t) || u.attributeNameCheck instanceof Function && u.attributeNameCheck(t, e)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              t === "is" && u.allowCustomizedBuiltInElements && (u.tagNameCheck instanceof RegExp && S(u.tagNameCheck, o) || u.tagNameCheck instanceof Function && u.tagNameCheck(o)))
            ) return !1;
          } else if (!De[t]) {
            if (!S(ze, K(o, He, ""))) {
              if (!((t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Jt(o, "data:") === 0 && $e[e])) {
                if (!(Ye && !S(Pt, K(o, He, "")))) {
                  if (o)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, at = function(e) {
    return e !== "annotation-xml" && Me(e, vt);
  }, rt = function(e) {
    w(h.beforeSanitizeAttributes, e, null);
    const {
      attributes: t
    } = e;
    if (!t || Ne(e))
      return;
    const o = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: d,
      forceKeepAttr: void 0
    };
    let f = t.length;
    for (; f--; ) {
      const g = t[f], {
        name: m,
        namespaceURI: D,
        value: x
      } = g, W = p(m), Ie = x;
      let E = m === "value" ? Ie : Qt(Ie);
      if (o.attrName = W, o.attrValue = E, o.keepAttr = !0, o.forceKeepAttr = void 0, w(h.uponSanitizeAttribute, e, o), E = o.attrValue, Ve && (W === "id" || W === "name") && (k(m, e), E = kt + E), oe && S(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, E)) {
        k(m, e);
        continue;
      }
      if (W === "attributename" && Me(E, "href")) {
        k(m, e);
        continue;
      }
      if (o.forceKeepAttr)
        continue;
      if (!o.keepAttr) {
        k(m, e);
        continue;
      }
      if (!je && S(/\/>/i, E)) {
        k(m, e);
        continue;
      }
      U && fe([Ee, _e, ge], (lt) => {
        E = K(E, lt, " ");
      });
      const st = p(e.nodeName);
      if (!it(st, W, E)) {
        k(m, e);
        continue;
      }
      if (A && typeof ee == "object" && typeof ee.getAttributeType == "function" && !D)
        switch (ee.getAttributeType(st, W)) {
          case "TrustedHTML": {
            E = A.createHTML(E);
            break;
          }
          case "TrustedScriptURL": {
            E = A.createScriptURL(E);
            break;
          }
        }
      if (E !== Ie)
        try {
          D ? e.setAttributeNS(D, m, E) : e.setAttribute(m, E), Ne(e) ? I(e) : ft(n.removed);
        } catch {
          k(m, e);
        }
    }
    w(h.afterSanitizeAttributes, e, null);
  }, Bt = function i(e) {
    let t = null;
    const o = tt(e);
    for (w(h.beforeSanitizeShadowDOM, e, null); t = o.nextNode(); )
      w(h.uponSanitizeShadowNode, t, null), ot(t), rt(t), t.content instanceof _ && i(t.content);
    w(h.afterSanitizeShadowDOM, e, null);
  };
  return n.sanitize = function(i) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = null, o = null, f = null, g = null;
    if (ye = !i, ye && (i = "<!-->"), typeof i != "string" && !nt(i))
      if (typeof i.toString == "function") {
        if (i = i.toString(), typeof i != "string")
          throw Z("dirty is not a string, aborting");
      } else
        throw Z("toString is not a function");
    if (!n.isSupported)
      return i;
    if (he || be(e), n.removed = [], typeof i == "string" && (V = !1), V) {
      if (i.nodeName) {
        const x = p(i.nodeName);
        if (!T[x] || X[x])
          throw Z("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (i instanceof Te)
      t = et("<!---->"), o = t.ownerDocument.importNode(i, !0), o.nodeType === Q.element && o.nodeName === "BODY" || o.nodeName === "HTML" ? t = o : t.appendChild(o);
    else {
      if (!F && !U && !v && // eslint-disable-next-line unicorn/prefer-includes
      i.indexOf("<") === -1)
        return A && ae ? A.createHTML(i) : i;
      if (t = et(i), !t)
        return F ? null : ae ? j : "";
    }
    t && Se && I(t.firstChild);
    const m = tt(V ? i : t);
    for (; f = m.nextNode(); )
      ot(f), rt(f), f.content instanceof _ && Bt(f.content);
    if (V)
      return i;
    if (F) {
      if (ie)
        for (g = It.call(t.ownerDocument); t.firstChild; )
          g.appendChild(t.firstChild);
      else
        g = t;
      return (d.shadowroot || d.shadowrootmode) && (g = Mt.call(a, g, !0)), g;
    }
    let D = v ? t.outerHTML : t.innerHTML;
    return v && T["!doctype"] && t.ownerDocument && t.ownerDocument.doctype && t.ownerDocument.doctype.name && S(At, t.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + t.ownerDocument.doctype.name + `>
` + D), U && fe([Ee, _e, ge], (x) => {
      D = K(D, x, " ");
    }), A && ae ? A.createHTML(D) : D;
  }, n.setConfig = function() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    be(i), he = !0;
  }, n.clearConfig = function() {
    G = null, he = !1;
  }, n.isValidAttribute = function(i, e, t) {
    G || be({});
    const o = p(i), f = p(e);
    return it(o, f, t);
  }, n.addHook = function(i, e) {
    typeof e == "function" && q(h[i], e);
  }, n.removeHook = function(i, e) {
    if (e !== void 0) {
      const t = Kt(h[i], e);
      return t === -1 ? void 0 : Zt(h[i], t, 1)[0];
    }
    return ft(h[i]);
  }, n.removeHooks = function(i) {
    h[i] = [];
  }, n.removeAllHooks = function() {
    h = Et();
  }, n;
}
var dn = ht();
function gn({ content: r, width: n, height: l, className: a, cssClass: c }) {
  const _ = Xt.useMemo(
    () => dn.sanitize(r, {
      USE_PROFILES: { svg: !0, svgFilters: !0 }
    }),
    [r]
  ), b = {};
  return n && (b.width = n), l && (b.height = l), /* @__PURE__ */ Yt.jsx(
    "div",
    {
      style: Object.keys(b).length > 0 ? b : void 0,
      className: jt(a, c),
      dangerouslySetInnerHTML: { __html: _ }
    }
  );
}
export {
  gn as Svg
};
