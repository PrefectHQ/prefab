function t1(y, i) {
  for (var r = 0; r < i.length; r++) {
    const s = i[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const _ in s)
        if (_ !== "default" && !(_ in y)) {
          const M = Object.getOwnPropertyDescriptor(s, _);
          M && Object.defineProperty(y, _, M.get ? M : {
            enumerable: !0,
            get: () => s[_]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(y, Symbol.toStringTag, { value: "Module" }));
}
var hQ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function a1(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var C = { exports: {} }, h = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O;
function h1() {
  if (O) return h;
  O = 1;
  var y = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), N = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), L = Symbol.iterator;
  function W(t) {
    return t === null || typeof t != "object" ? null : (t = L && t[L] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var S = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, P = Object.assign, R = {};
  function x(t, a, c) {
    this.props = t, this.context = a, this.refs = R, this.updater = c || S;
  }
  x.prototype.isReactComponent = {}, x.prototype.setState = function(t, a) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, t, a, "setState");
  }, x.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function T() {
  }
  T.prototype = x.prototype;
  function z(t, a, c) {
    this.props = t, this.context = a, this.refs = R, this.updater = c || S;
  }
  var q = z.prototype = new T();
  q.constructor = z, P(q, x.prototype), q.isPureReactComponent = !0;
  var B = Array.isArray;
  function j() {
  }
  var k = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function H(t, a, c) {
    var o = c.ref;
    return {
      $$typeof: y,
      type: t,
      key: a,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  function X(t, a) {
    return H(t.type, a, t.props);
  }
  function V(t) {
    return typeof t == "object" && t !== null && t.$$typeof === y;
  }
  function K(t) {
    var a = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(c) {
      return a[c];
    });
  }
  var Z = /\/+/g;
  function A(t, a) {
    return typeof t == "object" && t !== null && t.key != null ? K("" + t.key) : a.toString(36);
  }
  function Y(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(j, j) : (t.status = "pending", t.then(
          function(a) {
            t.status === "pending" && (t.status = "fulfilled", t.value = a);
          },
          function(a) {
            t.status === "pending" && (t.status = "rejected", t.reason = a);
          }
        )), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function g(t, a, c, o, d) {
    var n = typeof t;
    (n === "undefined" || n === "boolean") && (t = null);
    var p = !1;
    if (t === null) p = !0;
    else
      switch (n) {
        case "bigint":
        case "string":
        case "number":
          p = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case y:
            case i:
              p = !0;
              break;
            case f:
              return p = t._init, g(
                p(t._payload),
                a,
                c,
                o,
                d
              );
          }
      }
    if (p)
      return d = d(t), p = o === "" ? "." + A(t, 0) : o, B(d) ? (c = "", p != null && (c = p.replace(Z, "$&/") + "/"), g(d, a, c, "", function(e1) {
        return e1;
      })) : d != null && (V(d) && (d = X(
        d,
        c + (d.key == null || t && t.key === d.key ? "" : ("" + d.key).replace(
          Z,
          "$&/"
        ) + "/") + p
      )), a.push(d)), 1;
    p = 0;
    var v = o === "" ? "." : o + ":";
    if (B(t))
      for (var l = 0; l < t.length; l++)
        o = t[l], n = v + A(o, l), p += g(
          o,
          a,
          c,
          n,
          d
        );
    else if (l = W(t), typeof l == "function")
      for (t = l.call(t), l = 0; !(o = t.next()).done; )
        o = o.value, n = v + A(o, l++), p += g(
          o,
          a,
          c,
          n,
          d
        );
    else if (n === "object") {
      if (typeof t.then == "function")
        return g(
          Y(t),
          a,
          c,
          o,
          d
        );
      throw a = String(t), Error(
        "Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return p;
  }
  function w(t, a, c) {
    if (t == null) return t;
    var o = [], d = 0;
    return g(t, o, "", "", function(n) {
      return a.call(c, n, d++);
    }), o;
  }
  function Q(t) {
    if (t._status === -1) {
      var a = t._result;
      a = a(), a.then(
        function(c) {
          (t._status === 0 || t._status === -1) && (t._status = 1, t._result = c);
        },
        function(c) {
          (t._status === 0 || t._status === -1) && (t._status = 2, t._result = c);
        }
      ), t._status === -1 && (t._status = 0, t._result = a);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var F = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, J = {
    map: w,
    forEach: function(t, a, c) {
      w(
        t,
        function() {
          a.apply(this, arguments);
        },
        c
      );
    },
    count: function(t) {
      var a = 0;
      return w(t, function() {
        a++;
      }), a;
    },
    toArray: function(t) {
      return w(t, function(a) {
        return a;
      }) || [];
    },
    only: function(t) {
      if (!V(t))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return t;
    }
  };
  return h.Activity = I, h.Children = J, h.Component = x, h.Fragment = r, h.Profiler = _, h.PureComponent = z, h.StrictMode = s, h.Suspense = $, h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, h.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(t) {
      return k.H.useMemoCache(t);
    }
  }, h.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, h.cacheSignal = function() {
    return null;
  }, h.cloneElement = function(t, a, c) {
    if (t == null)
      throw Error(
        "The argument must be a React element, but you passed " + t + "."
      );
    var o = P({}, t.props), d = t.key;
    if (a != null)
      for (n in a.key !== void 0 && (d = "" + a.key), a)
        !D.call(a, n) || n === "key" || n === "__self" || n === "__source" || n === "ref" && a.ref === void 0 || (o[n] = a[n]);
    var n = arguments.length - 2;
    if (n === 1) o.children = c;
    else if (1 < n) {
      for (var p = Array(n), v = 0; v < n; v++)
        p[v] = arguments[v + 2];
      o.children = p;
    }
    return H(t.type, d, o);
  }, h.createContext = function(t) {
    return t = {
      $$typeof: N,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, t.Provider = t, t.Consumer = {
      $$typeof: M,
      _context: t
    }, t;
  }, h.createElement = function(t, a, c) {
    var o, d = {}, n = null;
    if (a != null)
      for (o in a.key !== void 0 && (n = "" + a.key), a)
        D.call(a, o) && o !== "key" && o !== "__self" && o !== "__source" && (d[o] = a[o]);
    var p = arguments.length - 2;
    if (p === 1) d.children = c;
    else if (1 < p) {
      for (var v = Array(p), l = 0; l < p; l++)
        v[l] = arguments[l + 2];
      d.children = v;
    }
    if (t && t.defaultProps)
      for (o in p = t.defaultProps, p)
        d[o] === void 0 && (d[o] = p[o]);
    return H(t, n, d);
  }, h.createRef = function() {
    return { current: null };
  }, h.forwardRef = function(t) {
    return { $$typeof: u, render: t };
  }, h.isValidElement = V, h.lazy = function(t) {
    return {
      $$typeof: f,
      _payload: { _status: -1, _result: t },
      _init: Q
    };
  }, h.memo = function(t, a) {
    return {
      $$typeof: b,
      type: t,
      compare: a === void 0 ? null : a
    };
  }, h.startTransition = function(t) {
    var a = k.T, c = {};
    k.T = c;
    try {
      var o = t(), d = k.S;
      d !== null && d(c, o), typeof o == "object" && o !== null && typeof o.then == "function" && o.then(j, F);
    } catch (n) {
      F(n);
    } finally {
      a !== null && c.types !== null && (a.types = c.types), k.T = a;
    }
  }, h.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, h.use = function(t) {
    return k.H.use(t);
  }, h.useActionState = function(t, a, c) {
    return k.H.useActionState(t, a, c);
  }, h.useCallback = function(t, a) {
    return k.H.useCallback(t, a);
  }, h.useContext = function(t) {
    return k.H.useContext(t);
  }, h.useDebugValue = function() {
  }, h.useDeferredValue = function(t, a) {
    return k.H.useDeferredValue(t, a);
  }, h.useEffect = function(t, a) {
    return k.H.useEffect(t, a);
  }, h.useEffectEvent = function(t) {
    return k.H.useEffectEvent(t);
  }, h.useId = function() {
    return k.H.useId();
  }, h.useImperativeHandle = function(t, a, c) {
    return k.H.useImperativeHandle(t, a, c);
  }, h.useInsertionEffect = function(t, a) {
    return k.H.useInsertionEffect(t, a);
  }, h.useLayoutEffect = function(t, a) {
    return k.H.useLayoutEffect(t, a);
  }, h.useMemo = function(t, a) {
    return k.H.useMemo(t, a);
  }, h.useOptimistic = function(t, a) {
    return k.H.useOptimistic(t, a);
  }, h.useReducer = function(t, a, c) {
    return k.H.useReducer(t, a, c);
  }, h.useRef = function(t) {
    return k.H.useRef(t);
  }, h.useState = function(t) {
    return k.H.useState(t);
  }, h.useSyncExternalStore = function(t, a, c) {
    return k.H.useSyncExternalStore(
      t,
      a,
      c
    );
  }, h.useTransition = function() {
    return k.H.useTransition();
  }, h.version = "19.2.4", h;
}
var E;
function o1() {
  return E || (E = 1, C.exports = h1()), C.exports;
}
var m = o1();
const c1 = /* @__PURE__ */ a1(m), oQ = /* @__PURE__ */ t1({
  __proto__: null,
  default: c1
}, [m]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = (...y) => y.filter((i, r, s) => !!i && i.trim() !== "" && s.indexOf(i) === r).join(" ").trim();
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d1 = (y) => y.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y1 = (y) => y.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (i, r, s) => s ? s.toUpperCase() : r.toLowerCase()
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U = (y) => {
  const i = y1(y);
  return i.charAt(0).toUpperCase() + i.slice(1);
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var n1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k1 = (y) => {
  for (const i in y)
    if (i.startsWith("aria-") || i === "role" || i === "title")
      return !0;
  return !1;
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p1 = m.forwardRef(
  ({
    color: y = "currentColor",
    size: i = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: s,
    className: _ = "",
    children: M,
    iconNode: N,
    ...u
  }, $) => m.createElement(
    "svg",
    {
      ref: $,
      ...n1,
      width: i,
      height: i,
      stroke: y,
      strokeWidth: s ? Number(r) * 24 / Number(i) : r,
      className: G("lucide", _),
      ...!M && !k1(u) && { "aria-hidden": "true" },
      ...u
    },
    [
      ...N.map(([b, f]) => m.createElement(b, f)),
      ...Array.isArray(M) ? M : [M]
    ]
  )
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e = (y, i) => {
  const r = m.forwardRef(
    ({ className: s, ..._ }, M) => m.createElement(p1, {
      ref: M,
      iconNode: i,
      className: G(
        `lucide-${d1(U(y))}`,
        `lucide-${y}`,
        s
      ),
      ..._
    })
  );
  return r.displayName = U(y), r;
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i1 = [
  ["path", { d: "m14 12 4 4 4-4", key: "buelq4" }],
  ["path", { d: "M18 16V7", key: "ty0viw" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }]
], s1 = e("a-arrow-down", i1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r1 = [
  ["path", { d: "m14 11 4-4 4 4", key: "1pu57t" }],
  ["path", { d: "M18 16V7", key: "ty0viw" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }]
], l1 = e("a-arrow-up", r1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M1 = [
  ["path", { d: "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16", key: "xik6mr" }],
  ["path", { d: "M15.697 14h5.606", key: "1stdlc" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }]
], _1 = e("a-large-small", M1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v1 = [
  ["circle", { cx: "16", cy: "4", r: "1", key: "1grugj" }],
  ["path", { d: "m18 19 1-7-6 1", key: "r0i19z" }],
  ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5", key: "9ptxx2" }],
  ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6", key: "10kmtu" }],
  ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6", key: "2qq6rc" }]
], m1 = e("accessibility", v1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], g1 = e("activity", x1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u1 = [
  ["path", { d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12", key: "yd12zl" }],
  [
    "path",
    {
      d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "larmp2"
    }
  ],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "M6.6 15.572A2 2 0 1 0 10 17v-5", key: "1x1kqn" }]
], f1 = e("air-vent", u1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w1 = [
  [
    "path",
    {
      d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
      key: "ns4c3b"
    }
  ],
  ["path", { d: "m12 15 5 6H7Z", key: "14qnn2" }]
], N1 = e("airplay", w1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $1 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
], b1 = e("alarm-clock-check", $1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z1 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }]
], q1 = e("alarm-clock-minus", z1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j1 = [
  ["path", { d: "M6.87 6.87a8 8 0 1 0 11.26 11.26", key: "3on8tj" }],
  ["path", { d: "M19.9 14.25a8 8 0 0 0-9.15-9.15", key: "15ghsc" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.26 18.67 4 21", key: "yzmioq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M4 4 2 6", key: "1ycko6" }]
], H1 = e("alarm-clock-off", j1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V1 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }]
], A1 = e("alarm-clock-plus", V1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C1 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M12 9v4l2 2", key: "1c63tq" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }]
], L1 = e("alarm-clock", C1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S1 = [
  ["path", { d: "M11 21c0-2.5 2-2.5 2-5", key: "1sicvv" }],
  ["path", { d: "M16 21c0-2.5 2-2.5 2-5", key: "1o3eny" }],
  ["path", { d: "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8", key: "1bvca4" }],
  [
    "path",
    { d: "M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z", key: "x3qr1j" }
  ],
  ["path", { d: "M6 21c0-2.5 2-2.5 2-5", key: "i3w1gp" }]
], P1 = e("alarm-smoke", S1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["polyline", { points: "11 3 11 11 14 8 17 11 17 3", key: "1wcwz3" }]
], T1 = e("album", R1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B1 = [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4", key: "11f1s0" }],
  ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4", key: "t14dx9" }],
  ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1", key: "1w07xs" }],
  ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1", key: "1apec2" }]
], D1 = e("align-center-horizontal", B1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z1 = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4", key: "14d6g8" }],
  ["path", { d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4", key: "1e2lrw" }],
  ["path", { d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1", key: "1fkdwx" }],
  ["path", { d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1", key: "1euafb" }]
], F1 = e("align-center-vertical", Z1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O1 = [
  ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2", key: "z5wdxg" }],
  ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2", key: "um7a8w" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }]
], E1 = e("align-end-horizontal", O1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U1 = [
  ["rect", { width: "16", height: "6", x: "2", y: "4", rx: "2", key: "10wcwx" }],
  ["rect", { width: "9", height: "6", x: "9", y: "14", rx: "2", key: "4p5bwg" }],
  ["path", { d: "M22 22V2", key: "12ipfv" }]
], G1 = e("align-end-vertical", U1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I1 = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2", key: "1wwnby" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2", key: "1fe6j6" }],
  ["path", { d: "M17 22v-5", key: "4b6g73" }],
  ["path", { d: "M17 7V2", key: "hnrr36" }],
  ["path", { d: "M7 22v-3", key: "1r4jpn" }],
  ["path", { d: "M7 5V2", key: "liy1u9" }]
], W1 = e(
  "align-horizontal-distribute-center",
  I1
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X1 = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2", key: "1wwnby" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2", key: "1fe6j6" }],
  ["path", { d: "M10 2v20", key: "uyc634" }],
  ["path", { d: "M20 2v20", key: "1tx262" }]
], K1 = e(
  "align-horizontal-distribute-end",
  X1
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y1 = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2", key: "1wwnby" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2", key: "1fe6j6" }],
  ["path", { d: "M4 2v20", key: "gtpd5x" }],
  ["path", { d: "M14 2v20", key: "tg6bpw" }]
], Q1 = e(
  "align-horizontal-distribute-start",
  Y1
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J1 = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M12 2v20", key: "t6zp3m" }]
], e2 = e(
  "align-horizontal-justify-center",
  J1
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t2 = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2", key: "1ht384" }],
  ["path", { d: "M22 2v20", key: "40qfg1" }]
], a2 = e("align-horizontal-justify-end", t2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h2 = [
  ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2", key: "hsirpf" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M2 2v20", key: "1ivd8o" }]
], o2 = e("align-horizontal-justify-start", h2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c2 = [
  ["rect", { width: "6", height: "10", x: "9", y: "7", rx: "2", key: "yn7j0q" }],
  ["path", { d: "M4 22V2", key: "tsjzd3" }],
  ["path", { d: "M20 22V2", key: "1bnhr8" }]
], d2 = e("align-horizontal-space-around", c2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y2 = [
  ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2", key: "j77dae" }],
  ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2", key: "bq30hj" }],
  ["path", { d: "M3 2v20", key: "1d2pfg" }],
  ["path", { d: "M21 2v20", key: "p059bm" }]
], n2 = e("align-horizontal-space-between", y2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k2 = [
  ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2", key: "1n4dg1" }],
  ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2", key: "17khns" }],
  ["path", { d: "M22 2H2", key: "fhrpnj" }]
], p2 = e("align-start-horizontal", k2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i2 = [
  ["rect", { width: "9", height: "6", x: "6", y: "14", rx: "2", key: "lpm2y7" }],
  ["rect", { width: "16", height: "6", x: "6", y: "4", rx: "2", key: "rdj6ps" }],
  ["path", { d: "M2 2v20", key: "1ivd8o" }]
], s2 = e("align-start-vertical", i2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r2 = [
  ["path", { d: "M22 17h-3", key: "1lwga1" }],
  ["path", { d: "M22 7h-5", key: "o2endc" }],
  ["path", { d: "M5 17H2", key: "1gx9xc" }],
  ["path", { d: "M7 7H2", key: "6bq26l" }],
  ["rect", { x: "5", y: "14", width: "14", height: "6", rx: "2", key: "1qrzuf" }],
  ["rect", { x: "7", y: "4", width: "10", height: "6", rx: "2", key: "we8e9z" }]
], l2 = e(
  "align-vertical-distribute-center",
  r2
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2", key: "jmoj9s" }],
  ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2", key: "aza5on" }],
  ["path", { d: "M2 20h20", key: "owomy5" }],
  ["path", { d: "M2 10h20", key: "1ir3d8" }]
], _2 = e("align-vertical-distribute-end", M2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2", key: "jmoj9s" }],
  ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2", key: "aza5on" }],
  ["path", { d: "M2 14h20", key: "myj16y" }],
  ["path", { d: "M2 4h20", key: "mda7wb" }]
], m2 = e(
  "align-vertical-distribute-start",
  v2
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2", key: "4l4tp2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 22h20", key: "272qi7" }]
], g2 = e("align-vertical-justify-end", x2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], f2 = e("align-vertical-justify-center", u2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2", key: "13squh" }],
  ["path", { d: "M2 2h20", key: "1ennik" }]
], N2 = e("align-vertical-justify-start", w2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $2 = [
  ["rect", { width: "10", height: "6", x: "7", y: "9", rx: "2", key: "b1zbii" }],
  ["path", { d: "M22 20H2", key: "1p1f7z" }],
  ["path", { d: "M22 4H2", key: "1b7qnq" }]
], b2 = e("align-vertical-space-around", $2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z2 = [
  ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2", key: "1w91an" }],
  ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2", key: "17wqzy" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M2 3h20", key: "91anmk" }]
], q2 = e("align-vertical-space-between", z2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j2 = [
  ["path", { d: "M10 10H6", key: "1bsnug" }],
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",
      key: "lrkjwd"
    }
  ],
  ["path", { d: "M8 8v4", key: "1fwk8c" }],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
], H2 = e("ambulance", j2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V2 = [
  ["path", { d: "M16 12h3", key: "4uvgyw" }],
  [
    "path",
    {
      d: "M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",
      key: "nfoe1t"
    }
  ]
], A2 = e("ampersand", V2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C2 = [
  [
    "path",
    {
      d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
      key: "12lh1k"
    }
  ],
  [
    "path",
    {
      d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
      key: "173c68"
    }
  ]
], L2 = e("ampersands", C2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S2 = [
  [
    "path",
    { d: "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8", key: "1h8rid" }
  ],
  ["path", { d: "M10 5H8a2 2 0 0 0 0 4h.68", key: "3ezsi6" }],
  ["path", { d: "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8", key: "yt6q09" }],
  ["path", { d: "M14 5h2a2 2 0 0 1 0 4h-.68", key: "8f95yk" }],
  ["path", { d: "M18 22H6", key: "mg6kv4" }],
  ["path", { d: "M9 2h6", key: "1jrp98" }]
], P2 = e("amphora", S2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2", key: "epbg0q" }],
  ["path", { d: "M7.5 8 10 9", key: "olxxln" }],
  ["path", { d: "m14 9 2.5-1", key: "1j6cij" }],
  ["path", { d: "M9 10h.01", key: "qbtxuw" }],
  ["path", { d: "M15 10h.01", key: "1qmjsl" }]
], T2 = e("angry", R2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = [
  ["path", { d: "M12 6v16", key: "nqf5sj" }],
  ["path", { d: "m19 13 2-1a9 9 0 0 1-18 0l2 1", key: "y7qv08" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }]
], D2 = e("anchor", B2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 15h8", key: "45n4r" }],
  ["path", { d: "M8 9h2", key: "1g203m" }],
  ["path", { d: "M14 9h2", key: "116p9w" }]
], F2 = e("annoyed", Z2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O2 = [
  ["path", { d: "M2 12 7 2", key: "117k30" }],
  ["path", { d: "m7 12 5-10", key: "1tvx22" }],
  ["path", { d: "m12 12 5-10", key: "ev1o1a" }],
  ["path", { d: "m17 12 5-10", key: "1e4ti3" }],
  ["path", { d: "M4.5 7h15", key: "vlsxkz" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
], E2 = e("antenna", O2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U2 = [
  ["path", { d: "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4", key: "1hjpb6" }],
  [
    "path",
    { d: "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z", key: "1qn45f" }
  ],
  ["path", { d: "M9 12v5", key: "3anwtq" }],
  ["path", { d: "M15 12v5", key: "5xh3zn" }],
  [
    "path",
    { d: "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1", key: "1fi4x8" }
  ]
], G2 = e("anvil", U2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m14.31 8 5.74 9.94", key: "1y6ab4" }],
  ["path", { d: "M9.69 8h11.48", key: "1wxppr" }],
  ["path", { d: "m7.38 12 5.74-9.94", key: "1grp0k" }],
  ["path", { d: "M9.69 16 3.95 6.06", key: "libnyf" }],
  ["path", { d: "M14.31 16H2.83", key: "x5fava" }],
  ["path", { d: "m16.62 12-5.74 9.94", key: "1vwawt" }]
], W2 = e("aperture", I2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X2 = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M14 8h.01", key: "1primd" }]
], K2 = e("app-window-mac", X2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = [
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }],
  ["path", { d: "M10 4v4", key: "pp8u80" }],
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["path", { d: "M6 4v4", key: "1svtjw" }]
], Q2 = e("app-window", Y2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J2 = [
  ["path", { d: "M12 6.528V3a1 1 0 0 1 1-1h0", key: "11qiee" }],
  [
    "path",
    {
      d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
      key: "110c12"
    }
  ]
], e0 = e("apple", J2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t0 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h2", key: "tvwodi" }],
  ["path", { d: "M20 8v11a2 2 0 0 1-2 2h-2", key: "1gkqxj" }],
  ["path", { d: "m9 15 3-3 3 3", key: "1pd0qc" }],
  ["path", { d: "M12 12v9", key: "192myk" }]
], a0 = e("archive-restore", t0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h0 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "m9.5 17 5-5", key: "nakeu6" }],
  ["path", { d: "m9.5 12 5 5", key: "1hccrj" }]
], o0 = e("archive-x", h0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c0 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
], d0 = e("archive", c0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y0 = [
  ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3", key: "irtipd" }],
  [
    "path",
    {
      d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      key: "1qyhux"
    }
  ],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
], n0 = e("armchair", y0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k0 = [
  [
    "path",
    {
      d: "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",
      key: "1hy3w3"
    }
  ],
  ["path", { d: "M9 4h6", key: "10am2s" }]
], p0 = e("arrow-big-down-dash", k0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i0 = [
  [
    "path",
    {
      d: "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",
      key: "1eaqc3"
    }
  ]
], s0 = e("arrow-big-down", i0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r0 = [
  [
    "path",
    {
      d: "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
      key: "p8w4w5"
    }
  ],
  ["path", { d: "M20 9v6", key: "14roy0" }]
], l0 = e("arrow-big-left-dash", r0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M0 = [
  [
    "path",
    {
      d: "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
      key: "aztept"
    }
  ]
], _0 = e("arrow-big-left", M0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v0 = [
  [
    "path",
    {
      d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
      key: "67vhrh"
    }
  ],
  ["path", { d: "M4 9v6", key: "bns7oa" }]
], m0 = e("arrow-big-right-dash", v0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x0 = [
  [
    "path",
    {
      d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
      key: "1232du"
    }
  ]
], g0 = e("arrow-big-right", x0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u0 = [
  [
    "path",
    {
      d: "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",
      key: "pnzqmc"
    }
  ],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
], f0 = e("arrow-big-up-dash", u0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w0 = [
  [
    "path",
    {
      d: "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",
      key: "lh0v7k"
    }
  ]
], N0 = e("arrow-big-up", w0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2", key: "1bwicg" }],
  ["path", { d: "M17 20v-6h-2", key: "1qp1so" }],
  ["path", { d: "M15 20h4", key: "1j968p" }]
], b0 = e("arrow-down-0-1", $0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M17 10V4h-2", key: "zcsr5x" }],
  ["path", { d: "M15 10h4", key: "id2lce" }],
  ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2", key: "33xykx" }]
], q0 = e("arrow-down-1-0", z0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
], H0 = e("arrow-down-a-z", j0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V0 = [
  ["path", { d: "M19 3H5", key: "1236rx" }],
  ["path", { d: "M12 21V7", key: "gj6g52" }],
  ["path", { d: "m6 15 6 6 6-6", key: "h15q88" }]
], A0 = e("arrow-down-from-line", V0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C0 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
], L0 = e("arrow-down-left", C0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h4", key: "6d7r33" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h10", key: "1438ji" }]
], P0 = e("arrow-down-narrow-wide", S0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R0 = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
], T0 = e("arrow-down-right", R0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B0 = [
  ["path", { d: "M12 2v14", key: "jyx4ut" }],
  ["path", { d: "m19 9-7 7-7-7", key: "1oe3oy" }],
  ["circle", { cx: "12", cy: "21", r: "1", key: "o0uj5v" }]
], D0 = e("arrow-down-to-dot", B0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z0 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], F0 = e("arrow-down-to-line", Z0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "m21 8-4-4-4 4", key: "1c9v7m" }],
  ["path", { d: "M17 4v16", key: "7dpous" }]
], E0 = e("arrow-down-up", O0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
], G0 = e("arrow-down-wide-narrow", U0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I0 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M15 4h5l-5 6h5", key: "8asdl1" }],
  ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20", key: "r6l5cz" }],
  ["path", { d: "M20 18h-5", key: "18j1r2" }]
], W0 = e("arrow-down-z-a", I0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X0 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], K0 = e("arrow-down", X0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y0 = [
  ["path", { d: "m9 6-6 6 6 6", key: "7v63n9" }],
  ["path", { d: "M3 12h14", key: "13k4hi" }],
  ["path", { d: "M21 19V5", key: "b4bplr" }]
], Q0 = e("arrow-left-from-line", Y0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J0 = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
], ee = e("arrow-left-right", J0);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const te = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], ae = e("arrow-left-to-line", te);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const he = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], oe = e("arrow-left", he);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = [
  ["path", { d: "M3 5v14", key: "1nt18q" }],
  ["path", { d: "M21 12H7", key: "13ipq5" }],
  ["path", { d: "m15 18 6-6-6-6", key: "6tx3qv" }]
], de = e("arrow-right-from-line", ce);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
], ne = e("arrow-right-left", ye);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ke = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], pe = e("arrow-right", ke);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ie = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], se = e("arrow-right-to-line", ie);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2", key: "1bwicg" }],
  ["path", { d: "M17 20v-6h-2", key: "1qp1so" }],
  ["path", { d: "M15 20h4", key: "1j968p" }]
], le = e("arrow-up-0-1", re);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M17 10V4h-2", key: "zcsr5x" }],
  ["path", { d: "M15 10h4", key: "id2lce" }],
  ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2", key: "33xykx" }]
], _e = e("arrow-up-1-0", Me);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ve = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
], me = e("arrow-up-a-z", ve);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
], ge = e("arrow-up-down", xe);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = [
  ["path", { d: "m5 9 7-7 7 7", key: "1hw5ic" }],
  ["path", { d: "M12 16V2", key: "ywoabb" }],
  ["circle", { cx: "12", cy: "21", r: "1", key: "o0uj5v" }]
], fe = e("arrow-up-from-dot", ue);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const we = [
  ["path", { d: "m18 9-6-6-6 6", key: "kcunyi" }],
  ["path", { d: "M12 3v14", key: "7cf3v8" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
], Ne = e("arrow-up-from-line", we);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  ["path", { d: "M7 17V7h10", key: "11bw93" }],
  ["path", { d: "M17 17 7 7", key: "2786uv" }]
], be = e("arrow-up-left", $e);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ze = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
], qe = e("arrow-up-narrow-wide", ze);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], He = e("arrow-up-right", je);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = [
  ["path", { d: "M5 3h14", key: "7usisc" }],
  ["path", { d: "m18 13-6-6-6 6", key: "1kf1n9" }],
  ["path", { d: "M12 7v14", key: "1akyts" }]
], Ae = e("arrow-up-to-line", Ve);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h10", key: "1438ji" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h4", key: "1krc32" }]
], Le = e("arrow-up-wide-narrow", Ce);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M15 4h5l-5 6h5", key: "8asdl1" }],
  ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20", key: "r6l5cz" }],
  ["path", { d: "M20 18h-5", key: "18j1r2" }]
], Pe = e("arrow-up-z-a", Se);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Re = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], Te = e("arrow-up", Re);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Be = [
  ["path", { d: "m4 6 3-3 3 3", key: "9aidw8" }],
  ["path", { d: "M7 17V3", key: "19qxw1" }],
  ["path", { d: "m14 6 3-3 3 3", key: "6iy689" }],
  ["path", { d: "M17 17V3", key: "o0fmgi" }],
  ["path", { d: "M4 21h16", key: "1h09gz" }]
], De = e("arrows-up-from-line", Be);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = [
  ["path", { d: "M12 6v12", key: "1vza4d" }],
  ["path", { d: "M17.196 9 6.804 15", key: "1ah31z" }],
  ["path", { d: "m6.804 9 10.392 6", key: "1b6pxd" }]
], Fe = e("asterisk", Ze);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
], Ee = e("at-sign", Oe);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ue = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
      key: "1l2ple"
    }
  ],
  [
    "path",
    {
      d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
      key: "1wam0m"
    }
  ]
], Ge = e("atom", Ue);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = [
  ["path", { d: "M2 10v3", key: "1fnikh" }],
  ["path", { d: "M6 6v11", key: "11sgs0" }],
  ["path", { d: "M10 3v18", key: "yhl04a" }],
  ["path", { d: "M14 8v7", key: "3a1oy3" }],
  ["path", { d: "M18 5v13", key: "123xd1" }],
  ["path", { d: "M22 10v3", key: "154ddg" }]
], We = e("audio-lines", Ie);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = [
  [
    "path",
    {
      d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
      key: "57tc96"
    }
  ]
], Ke = e("audio-waveform", Xe);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
], Qe = e("award", Ye);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = [
  ["path", { d: "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9", key: "5z9253" }],
  [
    "path",
    {
      d: "M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z",
      key: "19zklq"
    }
  ]
], et = e("axe", Je);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = [
  ["path", { d: "M13.5 10.5 15 9", key: "1nsxvm" }],
  ["path", { d: "M4 4v15a1 1 0 0 0 1 1h15", key: "1w6lkd" }],
  ["path", { d: "M4.293 19.707 6 18", key: "3g1p8c" }],
  ["path", { d: "m9 15 1.5-1.5", key: "1xfbes" }]
], at = e("axis-3d", tt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ht = [
  [
    "path",
    { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", key: "1ol0lm" }
  ],
  ["path", { d: "M8 10h8", key: "c7uz4u" }],
  ["path", { d: "M8 18h8", key: "1no2b1" }],
  ["path", { d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6", key: "1fr6do" }],
  ["path", { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", key: "donm21" }]
], ot = e("backpack", ht);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ct = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
  ["path", { d: "M15 12h.01", key: "1k8ypt" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
      key: "11xh7x"
    }
  ],
  ["path", { d: "M9 12h.01", key: "157uk2" }]
], dt = e("baby", ct);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], nt = e("badge-alert", yt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  ["path", { d: "M15.4 10a4 4 0 1 0 0 4", key: "2eqtx8" }]
], pt = e("badge-cent", kt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const it = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], st = e("badge-check", it);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
], lt = e("badge-dollar-sign", rt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M7 12h5", key: "gblrwe" }],
  ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2", key: "1makmb" }]
], _t = e("badge-euro", Mt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M8 8h8", key: "1bis0t" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m13 17-5-1h1a4 4 0 0 0 0-8", key: "nu2bwa" }]
], mt = e("badge-indian-rupee", vt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "12", key: "1y1yb1" }],
  ["line", { x1: "12", x2: "12.01", y1: "8", y2: "8", key: "110wyk" }]
], gt = e("badge-info", xt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ut = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 8 3 3v7", key: "17yadx" }],
  ["path", { d: "m12 11 3-3", key: "p4cfq1" }],
  ["path", { d: "M9 12h6", key: "1c52cq" }],
  ["path", { d: "M9 16h6", key: "8wimt3" }]
], ft = e("badge-japanese-yen", ut);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
], Nt = e("badge-minus", wt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $t = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
], bt = e("badge-percent", $t);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "16", key: "10p56q" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
], qt = e("badge-plus", zt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M8 12h4", key: "qz6y1c" }],
  ["path", { d: "M10 16V9.5a2.5 2.5 0 0 1 5 0", key: "3mlbjk" }],
  ["path", { d: "M8 16h7", key: "sbedsn" }]
], Ht = e("badge-pound-sterling", jt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17", key: "io3f8k" }]
], At = e("badge-question-mark", Vt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ct = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M9 16h5", key: "1syiyw" }],
  ["path", { d: "M9 12h5a2 2 0 1 0 0-4h-3v9", key: "1ge9c1" }]
], Lt = e("badge-russian-ruble", Ct);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const St = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M11 17V8h4", key: "1bfq6y" }],
  ["path", { d: "M11 12h3", key: "2eqnfz" }],
  ["path", { d: "M9 16h4", key: "1skf3a" }]
], Pt = e("badge-swiss-franc", St);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = [
  ["path", { d: "M11 7v10a5 5 0 0 0 5-5", key: "1ja3ih" }],
  ["path", { d: "m15 8-6 3", key: "4x0uwz" }],
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76",
      key: "18242g"
    }
  ]
], Tt = e("badge-turkish-lira", Rt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bt = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15", key: "f7djnv" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15", key: "1shsy8" }]
], Dt = e("badge-x", Bt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zt = [
  ["path", { d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2", key: "4irg2o" }],
  ["path", { d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10", key: "14fcyx" }],
  ["rect", { width: "13", height: "8", x: "8", y: "6", rx: "1", key: "o6oiis" }],
  ["circle", { cx: "18", cy: "20", r: "2", key: "t9985n" }],
  ["circle", { cx: "9", cy: "20", r: "2", key: "e5v82j" }]
], Ft = e("baggage-claim", Zt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ot = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ]
], Et = e("badge", Ot);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ut = [
  ["path", { d: "M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1", key: "2nz4b" }],
  ["path", { d: "M12 6a2 2 0 0 1 2 2", key: "7y7d82" }],
  ["path", { d: "M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0", key: "vqb5s3" }]
], Gt = e("balloon", Ut);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const It = [
  ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Wt = e("ban", It);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xt = [
  ["path", { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5", key: "1cscit" }],
  [
    "path",
    {
      d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
      key: "1y1nbv"
    }
  ]
], Kt = e("banana", Xt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yt = [
  ["path", { d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5", key: "x6cv4u" }],
  ["path", { d: "m16 19 3 3 3-3", key: "1ibux0" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M6 12h.01", key: "c2rlol" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], Qt = e("banknote-arrow-down", Yt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jt = [
  ["path", { d: "M10 10.01h.01", key: "1e9xi7" }],
  ["path", { d: "M10 14.01h.01", key: "ac23bv" }],
  ["path", { d: "M14 10.01h.01", key: "2wfrvf" }],
  ["path", { d: "M14 14.01h.01", key: "8tw8yn" }],
  ["path", { d: "M18 6v11.5", key: "dkbidh" }],
  ["path", { d: "M6 6v12", key: "vkc79e" }],
  ["rect", { x: "2", y: "6", width: "20", height: "12", rx: "2", key: "1wpnh2" }]
], ea = e("bandage", Jt);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ta = [
  ["path", { d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5", key: "x6cv4u" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  ["path", { d: "M19 22v-6", key: "qhmiwi" }],
  ["path", { d: "m22 19-3-3-3 3", key: "rn6bg2" }],
  ["path", { d: "M6 12h.01", key: "c2rlol" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], aa = e("banknote-arrow-up", ta);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ha = [
  ["path", { d: "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5", key: "16nib6" }],
  ["path", { d: "m17 17 5 5", key: "p7ous7" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  ["path", { d: "m22 17-5 5", key: "gqnmv0" }],
  ["path", { d: "M6 12h.01", key: "c2rlol" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], oa = e("banknote-x", ha);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ca = [
  ["path", { d: "M3 5v14", key: "1nt18q" }],
  ["path", { d: "M8 5v14", key: "1ybrkv" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "M17 5v14", key: "ycjyhj" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], da = e("barcode", ca);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ya = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
], na = e("banknote", ya);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ka = [
  ["path", { d: "M10 3a41 41 0 0 0 0 18", key: "1qcnzb" }],
  ["path", { d: "M14 3a41 41 0 0 1 0 18", key: "547vd4" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z",
      key: "1wepyy"
    }
  ],
  ["path", { d: "M3.84 17h16.32", key: "1wh981" }],
  ["path", { d: "M3.84 7h16.32", key: "19jf4x" }]
], pa = e("barrel", ka);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = [
  ["path", { d: "M4 20h16", key: "14thso" }],
  ["path", { d: "m6 16 6-12 6 12", key: "1b4byz" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], sa = e("baseline", ia);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ra = [
  ["path", { d: "M10 4 8 6", key: "1rru8s" }],
  ["path", { d: "M17 19v2", key: "ts1sot" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M7 19v2", key: "12npes" }],
  [
    "path",
    {
      d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
      key: "14ym8i"
    }
  ]
], la = e("bath", ra);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ma = [
  ["path", { d: "m11 7-3 5h4l-3 5", key: "b4a64w" }],
  ["path", { d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935", key: "lre1cr" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936", key: "13q5k0" }]
], _a = e("battery-charging", Ma);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const va = [
  ["path", { d: "M10 10v4", key: "1mb2ec" }],
  ["path", { d: "M14 10v4", key: "1nt88p" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 10v4", key: "1n77qd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], ma = e("battery-full", va);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xa = [
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], ga = e("battery-low", xa);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ua = [
  ["path", { d: "M10 14v-4", key: "suye4c" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], fa = e("battery-medium", ua);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wa = [
  ["path", { d: "M10 9v6", key: "17i7lo" }],
  ["path", { d: "M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605", key: "o09yah" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M7 12h6", key: "iekk3h" }],
  ["path", { d: "M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606", key: "xyqvf1" }]
], Na = e("battery-plus", wa);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $a = [
  ["path", { d: "M10 17h.01", key: "nbq80n" }],
  ["path", { d: "M10 7v6", key: "nne03l" }],
  ["path", { d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2", key: "1m83kb" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "h8lgfh" }]
], ba = e("battery-warning", $a);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const za = [
  ["path", { d: "M4.5 3h15", key: "c7n0jr" }],
  ["path", { d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3", key: "m1uhx7" }],
  ["path", { d: "M6 14h12", key: "4cwo0f" }]
], qa = e("beaker", za);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ja = [
  ["path", { d: "M 22 14 L 22 10", key: "nqc4tb" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
], Ha = e("battery", ja);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = [
  [
    "path",
    {
      d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1",
      key: "bq3udt"
    }
  ],
  ["path", { d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66", key: "17ccse" }],
  [
    "path",
    {
      d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04",
      key: "18zqgq"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], Aa = e("bean-off", Va);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = [
  [
    "path",
    {
      d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z",
      key: "1tvzk7"
    }
  ],
  ["path", { d: "M5.341 10.62a4 4 0 1 0 5.279-5.28", key: "2cyri2" }]
], La = e("bean", Ca);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sa = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
], Pa = e("bed-double", Sa);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ra = [
  ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8", key: "1wm6mi" }],
  ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4", key: "4k93s5" }],
  ["path", { d: "M3 18h18", key: "1h113x" }]
], Ta = e("bed-single", Ra);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ba = [
  ["path", { d: "M2 4v16", key: "vw9hq8" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10", key: "1dgv2r" }],
  ["path", { d: "M2 17h20", key: "18nfp3" }],
  ["path", { d: "M6 8v9", key: "1yriud" }]
], Da = e("bed", Ba);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Za = [
  [
    "path",
    {
      d: "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
      key: "cisjcv"
    }
  ],
  [
    "path",
    {
      d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
      key: "5byaag"
    }
  ],
  ["circle", { cx: "12.5", cy: "8.5", r: "2.5", key: "9738u8" }]
], Fa = e("beef", Za);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oa = [
  ["path", { d: "M13 13v5", key: "igwfh0" }],
  ["path", { d: "M17 11.47V8", key: "16yw0g" }],
  ["path", { d: "M17 11h1a3 3 0 0 1 2.745 4.211", key: "1xbt65" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3", key: "c55o3e" }],
  [
    "path",
    { d: "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268", key: "1ydug7" }
  ],
  [
    "path",
    {
      d: "M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12",
      key: "q81o7q"
    }
  ],
  ["path", { d: "M9 14.6V18", key: "20ek98" }]
], Ea = e("beer-off", Oa);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ua = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665",
      key: "1tip0g"
    }
  ],
  ["circle", { cx: "18", cy: "8", r: "3", key: "1g0gzu" }]
], Ga = e("bell-dot", Ua);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ia = [
  ["path", { d: "M17 11h1a3 3 0 0 1 0 6h-1", key: "1yp76v" }],
  ["path", { d: "M9 12v6", key: "1u1cab" }],
  ["path", { d: "M13 12v6", key: "1sugkk" }],
  [
    "path",
    {
      d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z",
      key: "1510fo"
    }
  ],
  ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", key: "19jb7n" }]
], Wa = e("beer", Ia);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = [
  ["path", { d: "M18.518 17.347A7 7 0 0 1 14 19", key: "1emhpo" }],
  ["path", { d: "M18.8 4A11 11 0 0 1 20 9", key: "127b67" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["circle", { cx: "20", cy: "16", r: "2", key: "1v9bxh" }],
  ["circle", { cx: "9", cy: "9", r: "7", key: "p2h5vp" }],
  ["rect", { x: "4", y: "16", width: "10", height: "6", rx: "2", key: "bfnviv" }]
], Ka = e("bell-electric", Xa);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ya = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M15 8h6", key: "8ybuxh" }],
  [
    "path",
    {
      d: "M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12",
      key: "bdwj86"
    }
  ]
], Qa = e("bell-minus", Ya);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ja = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
], eh = e("bell-off", Ja);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M15 8h6", key: "8ybuxh" }],
  ["path", { d: "M18 5v6", key: "g5ayrv" }],
  [
    "path",
    {
      d: "M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332",
      key: "1abcvy"
    }
  ]
], ah = e("bell-plus", th);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
], oh = e("bell-ring", hh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ch = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], dh = e("bell", ch);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [
  ["rect", { width: "13", height: "7", x: "3", y: "3", rx: "1", key: "11xb64" }],
  ["path", { d: "m22 15-3-3 3-3", key: "26chmm" }],
  ["rect", { width: "13", height: "7", x: "3", y: "14", rx: "1", key: "k6ky7n" }]
], nh = e("between-horizontal-end", yh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  ["rect", { width: "13", height: "7", x: "8", y: "3", rx: "1", key: "pkso9a" }],
  ["path", { d: "m2 9 3 3-3 3", key: "1agib5" }],
  ["rect", { width: "13", height: "7", x: "8", y: "14", rx: "1", key: "1q5fc1" }]
], ph = e("between-horizontal-start", kh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = [
  ["rect", { width: "7", height: "13", x: "3", y: "3", rx: "1", key: "1fdu0f" }],
  ["path", { d: "m9 22 3-3 3 3", key: "17z65a" }],
  ["rect", { width: "7", height: "13", x: "14", y: "3", rx: "1", key: "1squn4" }]
], sh = e("between-vertical-end", ih);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = [
  ["rect", { width: "7", height: "13", x: "3", y: "8", rx: "1", key: "1fjrkv" }],
  ["path", { d: "m15 2-3 3-3-3", key: "1uh6eb" }],
  ["rect", { width: "7", height: "13", x: "14", y: "8", rx: "1", key: "w3fjg8" }]
], lh = e("between-vertical-start", rh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  [
    "path",
    {
      d: "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1",
      key: "1pmlyh"
    }
  ],
  ["path", { d: "M15 14a5 5 0 0 0-7.584 2", key: "5rb254" }],
  ["path", { d: "M9.964 6.825C8.019 7.977 9.5 13 8 15", key: "kbvsx9" }]
], _h = e("biceps-flexed", Mh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5", key: "15x4ox" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5", key: "1noe27" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2", key: "1npguv" }]
], mh = e("bike", vh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
], gh = e("binary", xh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uh = [
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3", key: "3apit1" }],
  [
    "path",
    {
      d: "M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z",
      key: "rhpgnw"
    }
  ],
  ["path", { d: "M 22 16 L 2 16", key: "14lkq7" }],
  [
    "path",
    {
      d: "M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z",
      key: "104b3k"
    }
  ],
  ["path", { d: "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3", key: "14fczp" }]
], fh = e("binoculars", uh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  ["circle", { cx: "12", cy: "11.9", r: "2", key: "e8h31w" }],
  ["path", { d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6", key: "17bolr" }],
  ["path", { d: "m8.9 10.1 1.4.8", key: "15ezny" }],
  ["path", { d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5", key: "wtwa5u" }],
  ["path", { d: "m15.1 10.1-1.4.8", key: "1r0b28" }],
  ["path", { d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2", key: "m7qszh" }],
  ["path", { d: "M12 13.9v1.6", key: "zfyyim" }],
  ["path", { d: "M13.5 5.4c-1-.2-2-.2-3 0", key: "1bi9q0" }],
  ["path", { d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5", key: "1rhjqw" }],
  ["path", { d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5", key: "8gsud3" }]
], Nh = e("biohazard", wh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20", key: "oj1oa8" }],
  ["path", { d: "m20 7 2 .5-2 .5", key: "12nv4d" }],
  ["path", { d: "M10 18v3", key: "1yea0a" }],
  ["path", { d: "M14 17.75V21", key: "1pymcb" }],
  ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61", key: "1npnn0" }]
], bh = e("bird", $h);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m17 18 1.956-11.468", key: "l5n2ro" }],
  ["path", { d: "m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8", key: "1sy6n7" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M7 18 5.044 6.532", key: "1uqdf2" }],
  ["circle", { cx: "12", cy: "10", r: "2", key: "1yojzk" }]
], qh = e("birdhouse", zh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jh = [
  [
    "path",
    {
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
      key: "yr8idg"
    }
  ]
], Hh = e("bitcoin", jh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [
  ["circle", { cx: "9", cy: "9", r: "7", key: "p2h5vp" }],
  ["circle", { cx: "15", cy: "15", r: "7", key: "19ennj" }]
], Ah = e("blend", Vh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  ["path", { d: "M3 3h18", key: "o7r712" }],
  ["path", { d: "M20 7H8", key: "gd2fo2" }],
  ["path", { d: "M20 11H8", key: "1ynp89" }],
  ["path", { d: "M10 19h10", key: "19hjk5" }],
  ["path", { d: "M8 15h12", key: "1yqzne" }],
  ["path", { d: "M4 3v14", key: "fggqzn" }],
  ["circle", { cx: "4", cy: "19", r: "2", key: "p3m9r0" }]
], Lh = e("blinds", Ch);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  [
    "path",
    {
      d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
      key: "1ah6g2"
    }
  ],
  ["rect", { x: "14", y: "2", width: "8", height: "8", rx: "1", key: "88lufb" }]
], Ph = e("blocks", Sh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [
  ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17", key: "1q5490" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "12", key: "1rsjjs" }],
  ["line", { x1: "3", x2: "6", y1: "12", y2: "12", key: "11yl8c" }]
], Th = e("bluetooth-connected", Rh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
  ["path", { d: "m17 17-5 5V12l-5 5", key: "v5aci6" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M14.5 9.5 17 7l-5-5v4.5", key: "1kddfz" }]
], Dh = e("bluetooth-off", Bh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zh = [
  ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17", key: "1q5490" }],
  ["path", { d: "M20.83 14.83a4 4 0 0 0 0-5.66", key: "k8tn1j" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }]
], Fh = e("bluetooth-searching", Zh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
], Eh = e("bold", Oh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uh = [["path", { d: "m7 7 10 10-5 5V2l5 5L7 17", key: "1q5490" }]], Gh = e("bluetooth", Uh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
], Wh = e("bolt", Ih);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  [
    "path",
    {
      d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
      key: "w610uw"
    }
  ]
], Kh = e("bone", Xh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yh = [
  ["circle", { cx: "11", cy: "13", r: "9", key: "hd149" }],
  [
    "path",
    {
      d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",
      key: "jp4j1b"
    }
  ],
  ["path", { d: "m22 2-1.5 1.5", key: "ay92ug" }]
], Qh = e("bomb", Yh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jh = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m8 13 4-7 4 7", key: "4rari8" }],
  ["path", { d: "M9.1 11h5.7", key: "1gkovt" }]
], eo = e("book-a", Jh);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const to = [
  ["path", { d: "M12 13h.01", key: "y0uutt" }],
  ["path", { d: "M12 6v3", key: "1m4b9j" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], ao = e("book-alert", to);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ho = [
  ["path", { d: "M12 6v7", key: "1f6ttz" }],
  ["path", { d: "M16 8v3", key: "gejaml" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M8 8v3", key: "1qzp49" }]
], oo = e("book-audio", ho);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const co = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9 9.5 2 2 4-4", key: "1dth82" }]
], yo = e("book-check", co);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const no = [
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11", key: "1yhqjt" }],
  ["path", { d: "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21", key: "edzzo5" }],
  [
    "path",
    {
      d: "M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
      key: "1nwzrg"
    }
  ]
], ko = e("book-copy", no);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const po = [
  ["path", { d: "M12 17h1.5", key: "1gkc67" }],
  ["path", { d: "M12 22h1.5", key: "1my7sn" }],
  ["path", { d: "M12 2h1.5", key: "19tvb7" }],
  ["path", { d: "M17.5 22H19a1 1 0 0 0 1-1", key: "10akbh" }],
  ["path", { d: "M17.5 2H19a1 1 0 0 1 1 1v1.5", key: "1vrfjs" }],
  ["path", { d: "M20 14v3h-2.5", key: "1naeju" }],
  ["path", { d: "M20 8.5V10", key: "1ctpfu" }],
  ["path", { d: "M4 10V8.5", key: "1o3zg5" }],
  ["path", { d: "M4 19.5V14", key: "ob81pf" }],
  ["path", { d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8", key: "s8vcyb" }],
  ["path", { d: "M8 22H6.5a1 1 0 0 1 0-5H8", key: "1cu73q" }]
], io = e("book-dashed", po);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const so = [
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9 10 3 3 3-3", key: "zt5b4y" }]
], ro = e("book-down", so);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lo = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M8 12v-2a4 4 0 0 1 8 0v2", key: "1vsqkj" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]
], Mo = e("book-headphones", lo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _o = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  [
    "path",
    {
      d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "9v40y5"
    }
  ]
], vo = e("book-heart", _o);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mo = [
  ["path", { d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17", key: "q6ojf0" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["circle", { cx: "10", cy: "8", r: "2", key: "2qkj4p" }]
], xo = e("book-image", mo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const go = [
  ["path", { d: "m19 3 1 1", key: "ze14oc" }],
  ["path", { d: "m20 2-4.5 4.5", key: "1sppr8" }],
  ["path", { d: "M20 7.898V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20", key: "1xzogz" }],
  ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h7.844", key: "vtdg6h" }],
  ["circle", { cx: "14", cy: "8", r: "2", key: "u49eql" }]
], uo = e("book-key", go);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fo = [
  ["path", { d: "M18 6V4a2 2 0 1 0-4 0v2", key: "1aquzs" }],
  ["path", { d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20", key: "1rkj32" }],
  ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10", key: "18wgow" }],
  ["rect", { x: "12", y: "6", width: "8", height: "5", rx: "1", key: "73l30o" }]
], wo = e("book-lock", fo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const No = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
], $o = e("book-minus", No);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bo = [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], zo = e("book-marked", bo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qo = [
  ["path", { d: "M12 21V7", key: "gj6g52" }],
  ["path", { d: "m16 12 2 2 4-4", key: "mdajum" }],
  [
    "path",
    {
      d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
      key: "8arnkb"
    }
  ]
], jo = e("book-open-check", qo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ho = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], Vo = e("book-open", Ho);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ao = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M16 12h2", key: "7q9ll5" }],
  ["path", { d: "M16 8h2", key: "msurwy" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ],
  ["path", { d: "M6 12h2", key: "32wvfc" }],
  ["path", { d: "M6 8h2", key: "30oboj" }]
], Co = e("book-open-text", Ao);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lo = [
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
], So = e("book-plus", Lo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Po = [
  ["path", { d: "M11 22H5.5a1 1 0 0 1 0-5h4.501", key: "mcbepb" }],
  ["path", { d: "m21 22-1.879-1.878", key: "12q7x1" }],
  ["path", { d: "M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8", key: "olfd5n" }],
  ["circle", { cx: "17", cy: "18", r: "3", key: "82mm0e" }]
], Ro = e("book-search", Po);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const To = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M8 11h8", key: "vwpz6n" }],
  ["path", { d: "M8 7h6", key: "1f0q6e" }]
], Bo = e("book-text", To);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Do = [
  ["path", { d: "M10 13h4", key: "ytezjc" }],
  ["path", { d: "M12 6v7", key: "1f6ttz" }],
  ["path", { d: "M16 8V6H8v2", key: "x8j6u4" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], Zo = e("book-type", Do);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fo = [
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20", key: "161d7n" }],
  ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2", key: "1lorq7" }],
  ["path", { d: "m9 10 3-3 3 3", key: "11gsxs" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], Oo = e("book-up-2", Fo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eo = [
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9 10 3-3 3 3", key: "11gsxs" }]
], Uo = e("book-up", Eo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Go = [
  ["path", { d: "M15 13a3 3 0 1 0-6 0", key: "10j68g" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }]
], Io = e("book-user", Go);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wo = [
  ["path", { d: "m14.5 7-5 5", key: "dy991v" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9.5 7 5 5", key: "s45iea" }]
], Xo = e("book-x", Wo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ko = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], Yo = e("book", Ko);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qo = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
], Jo = e("bookmark-check", Qo);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = [
  ["path", { d: "M15 10H9", key: "o6yqo3" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
], tc = e("bookmark-minus", ec);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ac = [
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M15 10H9", key: "o6yqo3" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
], hc = e("bookmark-plus", ac);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oc = [
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
], cc = e("bookmark-x", oc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dc = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
], yc = e("bookmark", dc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nc = [
  ["path", { d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "vvzvr1" }],
  ["path", { d: "M8 8v1", key: "xcqmfk" }],
  ["path", { d: "M12 8v1", key: "1rj8u4" }],
  ["path", { d: "M16 8v1", key: "1q12zr" }],
  ["rect", { width: "20", height: "12", x: "2", y: "9", rx: "2", key: "igpb89" }],
  ["circle", { cx: "8", cy: "15", r: "2", key: "fa4a8s" }],
  ["circle", { cx: "16", cy: "15", r: "2", key: "14c3ya" }]
], kc = e("boom-box", nc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pc = [
  ["path", { d: "M12 6V2H8", key: "1155em" }],
  ["path", { d: "M15 11v2", key: "i11awn" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  [
    "path",
    {
      d: "M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z",
      key: "11gyqh"
    }
  ],
  ["path", { d: "M9 11v2", key: "1ueba0" }]
], ic = e("bot-message-square", pc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sc = [
  ["path", { d: "M13.67 8H18a2 2 0 0 1 2 2v4.33", key: "7az073" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M22 22 2 2", key: "1r8tn9" }],
  ["path", { d: "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586", key: "s09a7a" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }],
  ["path", { d: "M9.67 4H12v2.33", key: "110xot" }]
], rc = e("bot-off", sc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lc = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], Mc = e("bot", lc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _c = [
  ["path", { d: "M17 3h4v4", key: "19p9u1" }],
  [
    "path",
    { d: "M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17", key: "12t3w9" }
  ],
  ["path", { d: "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05", key: "ogng5l" }],
  [
    "path",
    {
      d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
      key: "8v3fy2"
    }
  ],
  ["path", { d: "M9.707 14.293 21 3", key: "ydm3bn" }]
], vc = e("bow-arrow", _c);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mc = [
  [
    "path",
    {
      d: "M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z",
      key: "blqgoc"
    }
  ],
  ["path", { d: "M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4", key: "43jbee" }]
], xc = e("bottle-wine", mc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gc = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
], uc = e("box", gc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fc = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
], wc = e("boxes", fc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nc = [
  [
    "path",
    { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }
  ],
  [
    "path",
    {
      d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
      key: "e1hn23"
    }
  ]
], $c = e("braces", Nc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bc = [
  ["path", { d: "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3", key: "1kt8lf" }],
  ["path", { d: "M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3", key: "gduv9" }]
], zc = e("brackets", bc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qc = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
], jc = e("brain-circuit", qc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hc = [
  ["path", { d: "m10.852 14.772-.383.923", key: "11vil6" }],
  ["path", { d: "m10.852 9.228-.383-.923", key: "1fjppe" }],
  ["path", { d: "m13.148 14.772.382.924", key: "je3va1" }],
  ["path", { d: "m13.531 8.305-.383.923", key: "18epck" }],
  ["path", { d: "m14.772 10.852.923-.383", key: "k9m8cz" }],
  ["path", { d: "m14.772 13.148.923.383", key: "1xvhww" }],
  [
    "path",
    {
      d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771",
      key: "jcbbz1"
    }
  ],
  ["path", { d: "M17.998 5.125a4 4 0 0 1 2.525 5.771", key: "1kkn7e" }],
  ["path", { d: "M19.505 10.294a4 4 0 0 1-1.5 7.706", key: "18bmuc" }],
  [
    "path",
    {
      d: "M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516",
      key: "uozx0d"
    }
  ],
  ["path", { d: "M4.5 10.291A4 4 0 0 0 6 18", key: "whdemb" }],
  ["path", { d: "M6.002 5.125a3 3 0 0 0 .4 1.375", key: "1kqy2g" }],
  ["path", { d: "m9.228 10.852-.923-.383", key: "1wtb30" }],
  ["path", { d: "m9.228 13.148-.923.383", key: "1a830x" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Vc = e("brain-cog", Hc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ac = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], Cc = e("brain", Ac);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lc = [
  ["path", { d: "M16 3v2.107", key: "gq8xun" }],
  [
    "path",
    {
      d: "M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9",
      key: "1l2pih"
    }
  ],
  [
    "path",
    { d: "M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938", key: "jrnqjp" }
  ],
  ["path", { d: "M3 15h5.253", key: "xqg7rb" }],
  ["path", { d: "M3 9h8.228", key: "1ppb70" }],
  ["path", { d: "M8 15v6", key: "1stoo3" }],
  ["path", { d: "M8 3v6", key: "vlvjmk" }]
], Sc = e("brick-wall-fire", Lc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pc = [
  ["path", { d: "M12 9v1.258", key: "iwpddn" }],
  ["path", { d: "M16 3v5.46", key: "d7ew98" }],
  ["path", { d: "M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75", key: "137t5x" }],
  [
    "path",
    {
      d: "M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z",
      key: "16j3tf"
    }
  ],
  ["path", { d: "M3 15h7", key: "1qldh6" }],
  ["path", { d: "M3 9h12.142", key: "1yjd6m" }],
  ["path", { d: "M8 15v6", key: "1stoo3" }],
  ["path", { d: "M8 3v6", key: "vlvjmk" }]
], Rc = e("brick-wall-shield", Pc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tc = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 9v6", key: "199k2o" }],
  ["path", { d: "M16 15v6", key: "8rj2es" }],
  ["path", { d: "M16 3v6", key: "1j6rpj" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 15v6", key: "1stoo3" }],
  ["path", { d: "M8 3v6", key: "vlvjmk" }]
], Bc = e("brick-wall", Tc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dc = [
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", key: "1ksdt3" }],
  ["path", { d: "M22 13a18.15 18.15 0 0 1-20 0", key: "12hx5q" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], Zc = e("briefcase-business", Dc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fc = [
  ["path", { d: "M10 20v2", key: "1n8e1g" }],
  ["path", { d: "M14 20v2", key: "1lq872" }],
  ["path", { d: "M18 20v2", key: "10uadw" }],
  ["path", { d: "M21 20H3", key: "kdqkdp" }],
  ["path", { d: "M6 20v2", key: "a9bc87" }],
  ["path", { d: "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12", key: "17n9tx" }],
  ["rect", { x: "4", y: "6", width: "16", height: "10", rx: "2", key: "1097i5" }]
], Oc = e("briefcase-conveyor-belt", Fc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ec = [
  ["path", { d: "M12 11v4", key: "a6ujw6" }],
  ["path", { d: "M14 13h-4", key: "1pl8zg" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", key: "1ksdt3" }],
  ["path", { d: "M18 6v14", key: "1mu4gy" }],
  ["path", { d: "M6 6v14", key: "1s15cj" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], Uc = e("briefcase-medical", Ec);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gc = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], Ic = e("briefcase", Gc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wc = [
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "2", key: "yj20xf" }],
  ["path", { d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2", key: "1ltk23" }],
  ["path", { d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2", key: "1q24h9" }]
], Xc = e("bring-to-front", Wc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kc = [
  ["path", { d: "m11 10 3 3", key: "fzmg1i" }],
  [
    "path",
    { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z", key: "p4q2r7" }
  ],
  ["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031", key: "wy6l02" }]
], Yc = e("brush", Kc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qc = [
  ["path", { d: "m16 22-1-4", key: "1ow2iv" }],
  [
    "path",
    {
      d: "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1",
      key: "11gii7"
    }
  ],
  ["path", { d: "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z", key: "bju7h4" }],
  ["path", { d: "m8 22 1-4", key: "s3unb" }]
], Jc = e("brush-cleaning", Qc);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ed = [
  ["path", { d: "M7.001 15.085A1.5 1.5 0 0 1 9 16.5", key: "y44lvh" }],
  ["circle", { cx: "18.5", cy: "8.5", r: "3.5", key: "1wadoa" }],
  ["circle", { cx: "7.5", cy: "16.5", r: "5.5", key: "6mdt3g" }],
  ["circle", { cx: "7.5", cy: "4.5", r: "2.5", key: "637s54" }]
], td = e("bubbles", ed);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ad = [
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2", key: "vl8zik" }],
  ["path", { d: "M18 12.34V11a4 4 0 0 0-4-4h-1.3", key: "sz915m" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-3.34", key: "1y15gv" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13", key: "1njkjs" }]
], hd = e("bug-off", ad);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const od = [
  ["path", { d: "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97", key: "1gnv52" }],
  [
    "path",
    {
      d: "M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
      key: "1weqy9"
    }
  ],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
], cd = e("bug-play", od);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dd = [
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z", key: "uouzyp" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 21a4 4 0 0 0-3.81-4", key: "1b0z45" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
], yd = e("bug", dd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nd = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
], kd = e("building-2", nd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pd = [
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3", key: "cabbwy" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
], id = e("building", pd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sd = [
  ["path", { d: "M4 6 2 7", key: "1mqr15" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "m22 7-2-1", key: "1umjhc" }],
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["path", { d: "M18 21v-2", key: "sqyl04" }]
], rd = e("bus-front", sd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ld = [
  ["path", { d: "M8 6v6", key: "18i7km" }],
  ["path", { d: "M15 6v6", key: "1sg6z9" }],
  ["path", { d: "M2 12h19.6", key: "de5uta" }],
  [
    "path",
    {
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
      key: "1wwztk"
    }
  ],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
  ["path", { d: "M9 18h5", key: "lrx6i" }],
  ["circle", { cx: "16", cy: "18", r: "2", key: "1v4tcr" }]
], Md = e("bus", ld);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _d = [
  ["path", { d: "M10 3h.01", key: "lbucoy" }],
  ["path", { d: "M14 2h.01", key: "1k8aa1" }],
  ["path", { d: "m2 9 20-5", key: "1kz0j5" }],
  ["path", { d: "M12 12V6.5", key: "1vbrij" }],
  ["rect", { width: "16", height: "10", x: "4", y: "12", rx: "3", key: "if91er" }],
  ["path", { d: "M9 12v5", key: "3anwtq" }],
  ["path", { d: "M15 12v5", key: "5xh3zn" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
], vd = e("cable-car", _d);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const md = [
  [
    "path",
    { d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z", key: "trhst0" }
  ],
  ["path", { d: "M17 21v-2", key: "ds4u3f" }],
  ["path", { d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10", key: "1mo9zo" }],
  ["path", { d: "M21 21v-2", key: "eo0ou" }],
  ["path", { d: "M3 5V3", key: "1k5hjh" }],
  [
    "path",
    { d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z", key: "1dd30t" }
  ],
  ["path", { d: "M7 5V3", key: "1t1388" }]
], xd = e("cable", md);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gd = [
  ["path", { d: "M16 13H3", key: "1wpj08" }],
  ["path", { d: "M16 17H3", key: "3lvfcd" }],
  [
    "path",
    {
      d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
      key: "1gmhf7"
    }
  ],
  ["circle", { cx: "9", cy: "7", r: "2", key: "1305pl" }]
], ud = e("cake-slice", gd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = [
  ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8", key: "1w3rig" }],
  ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1", key: "n2jgmb" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M7 8v3", key: "1qtyvj" }],
  ["path", { d: "M12 8v3", key: "hwp4zt" }],
  ["path", { d: "M17 8v3", key: "1i6e5u" }],
  ["path", { d: "M7 4h.01", key: "1bh4kh" }],
  ["path", { d: "M12 4h.01", key: "1ujb9j" }],
  ["path", { d: "M17 4h.01", key: "1upcoc" }]
], wd = e("cake", fd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nd = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
], $d = e("calculator", Nd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bd = [
  ["path", { d: "M11 14h1v4", key: "fy54vd" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", key: "12vinp" }]
], zd = e("calendar-1", bd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = [
  ["path", { d: "m14 18 4 4 4-4", key: "1waygx" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M18 14v8", key: "irew45" }],
  [
    "path",
    { d: "M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343", key: "bse4f3" }
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], jd = e("calendar-arrow-down", qd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hd = [
  ["path", { d: "m14 18 4-4 4 4", key: "ftkppy" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M18 22v-8", key: "su0gjh" }],
  ["path", { d: "M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9", key: "1exg90" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], Vd = e("calendar-arrow-up", Hd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ad = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", key: "bce9hv" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m16 20 2 2 4-4", key: "13tcca" }]
], Cd = e("calendar-check-2", Ad);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
], Sd = e("calendar-clock", Ld);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
], Rd = e("calendar-check", Pd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Td = [
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m15.228 19.148-.923.383", key: "51cr3n" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "m16.47 14.305.382.923", key: "obybxd" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["path", { d: "M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "1pvbig" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], Bd = e("calendar-cog", Td);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dd = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
], Zd = e("calendar-days", Dd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = [
  [
    "path",
    {
      d: "M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      key: "r586nh"
    }
  ],
  ["path", { d: "M15 22v-5a1 1 0 0 1 1-1h5", key: "xl3app" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Od = e("calendar-fold", Fd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ed = [
  [
    "path",
    { d: "M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125", key: "vxdnp4" }
  ],
  [
    "path",
    {
      d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "15cy7q"
    }
  ],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], Ud = e("calendar-heart", Ed);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M10 16h4", key: "17e571" }]
], Id = e("calendar-minus-2", Gd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wd = [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5", key: "1scpom" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], Xd = e("calendar-minus", Wd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = [
  ["path", { d: "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18", key: "16swn3" }],
  ["path", { d: "M21 15.5V6a2 2 0 0 0-2-2H9.5", key: "yhw86o" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h7", key: "1wap6i" }],
  ["path", { d: "M21 10h-5.5", key: "quycpq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], Yd = e("calendar-off", Kd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M10 16h4", key: "17e571" }],
  ["path", { d: "M12 14v4", key: "1thi36" }]
], Jd = e("calendar-plus-2", Qd);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ey = [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5", key: "1glfrc" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], ty = e("calendar-plus", ey);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ay = [
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M17 14h-6", key: "bkmgh3" }],
  ["path", { d: "M13 18H7", key: "bb0bb7" }],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 18h.01", key: "1bdyru" }]
], hy = e("calendar-range", ay);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oy = [
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25", key: "1jrsq6" }],
  ["path", { d: "m22 22-1.875-1.875", key: "13zax7" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], cy = e("calendar-search", oy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dy = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", key: "3spt84" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m17 22 5-5", key: "1k6ppv" }],
  ["path", { d: "m17 17 5 5", key: "p7ous7" }]
], yy = e("calendar-x-2", dy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ny = [
  ["path", { d: "M11 10v4h4", key: "172dkj" }],
  ["path", { d: "m11 14 1.535-1.605a5 5 0 0 1 8 1.5", key: "vu0qm5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "m21 18-1.535 1.605a5 5 0 0 1-8-1.5", key: "1qgeyt" }],
  ["path", { d: "M21 22v-4h-4", key: "hrummi" }],
  ["path", { d: "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3", key: "mctw84" }],
  ["path", { d: "M3 10h4", key: "1el30a" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
], ky = e("calendar-sync", ny);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m14 14-4 4", key: "rymu2i" }],
  ["path", { d: "m10 14 4 4", key: "3sz06r" }]
], iy = e("calendar-x", py);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sy = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], ry = e("calendar", sy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ly = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2", key: "j6srht" }],
  ["path", { d: "M18 2v2", key: "1kh14s" }],
  ["path", { d: "M2 13h2", key: "13gyu8" }],
  ["path", { d: "M8 8h14", key: "12jxz2" }],
  ["rect", { x: "8", y: "3", width: "14", height: "14", rx: "2", key: "nsru6w" }]
], My = e("calendars", ly);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = [
  ["path", { d: "M14.564 14.558a3 3 0 1 1-4.122-4.121", key: "1rnrzw" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    { d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175", key: "1x3arw" }
  ],
  [
    "path",
    {
      d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344",
      key: "1i84u0"
    }
  ]
], vy = e("camera-off", _y);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const my = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
], xy = e("camera", my);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gy = [
  ["path", { d: "M10 10v7.9", key: "m8g9tt" }],
  ["path", { d: "M11.802 6.145a5 5 0 0 1 6.053 6.053", key: "dn87i3" }],
  ["path", { d: "M14 6.1v2.243", key: "1kzysn" }],
  [
    "path",
    { d: "m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965", key: "3sxy18" }
  ],
  [
    "path",
    {
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
      key: "gpb6xx"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
      key: "qexcha"
    }
  ]
], uy = e("candy-off", gy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fy = [
  [
    "path",
    {
      d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z",
      key: "isaq8g"
    }
  ],
  ["path", { d: "M17.75 7 15 2.1", key: "12x7e8" }],
  ["path", { d: "M10.9 4.8 13 9", key: "100a87" }],
  ["path", { d: "m7.9 9.7 2 4.4", key: "ntfhaj" }],
  ["path", { d: "M4.9 14.7 7 18.9", key: "1x43jy" }]
], wy = e("candy-cane", fy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ny = [
  ["path", { d: "M10 7v10.9", key: "1gynux" }],
  ["path", { d: "M14 6.1V17", key: "116kdf" }],
  [
    "path",
    {
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
      key: "gpb6xx"
    }
  ],
  [
    "path",
    {
      d: "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
      key: "1tsln4"
    }
  ],
  [
    "path",
    {
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
      key: "qexcha"
    }
  ]
], $y = e("candy", Ny);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const by = [
  ["path", { d: "M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5", key: "1bqfb7" }],
  [
    "path",
    { d: "M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9", key: "1p520n" }
  ],
  [
    "path",
    {
      d: "M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684",
      key: "q2itvb"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    { d: "M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907", key: "j9amvs" }
  ],
  [
    "path",
    {
      d: "M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3",
      key: "8gmd5g"
    }
  ]
], zy = e("cannabis-off", by);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qy = [
  ["path", { d: "M12 22v-4", key: "1utk9m" }],
  [
    "path",
    {
      d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
      key: "1mezod"
    }
  ]
], jy = e("cannabis", qy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hy = [
  ["path", { d: "M10.5 5H19a2 2 0 0 1 2 2v8.5", key: "jqtk4d" }],
  ["path", { d: "M17 11h-.5", key: "1961ue" }],
  ["path", { d: "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2", key: "1keqsi" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M7 11h4", key: "1o1z6v" }],
  ["path", { d: "M7 15h2.5", key: "1ina1g" }]
], Vy = e("captions-off", Hy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ay = [
  ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2", key: "12ruh7" }],
  ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4", key: "1ueiar" }]
], Cy = e("captions", Ay);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ly = [
  [
    "path",
    { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8", key: "1imjwt" }
  ],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 14h.01", key: "7oqj8z" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2", key: "a7itu8" }],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
], Sy = e("car-front", Ly);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Py = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
], Ry = e("car", Py);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ty = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  [
    "path",
    { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8", key: "1imjwt" }
  ],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 14h.01", key: "7oqj8z" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2", key: "a7itu8" }],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
], By = e("car-taxi-front", Ty);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
  ["path", { d: "M12 14v4", key: "1thi36" }],
  [
    "path",
    {
      d: "M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
      key: "1o66bk"
    }
  ],
  ["path", { d: "M8 14h8", key: "1fgep2" }],
  ["rect", { x: "8", y: "10", width: "8", height: "8", rx: "1", key: "1aonk6" }]
], Zy = e("card-sim", Dy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fy = [
  ["path", { d: "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2", key: "19jm3t" }],
  ["path", { d: "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2", key: "13hakp" }],
  ["path", { d: "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9", key: "1crci8" }],
  ["circle", { cx: "8", cy: "19", r: "2", key: "t8fc5s" }]
], Oy = e("caravan", Fy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = [
  [
    "path",
    {
      d: "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46",
      key: "rfqxbe"
    }
  ],
  ["path", { d: "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z", key: "6b25w4" }],
  ["path", { d: "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z", key: "fn65lo" }]
], Uy = e("carrot", Ey);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = [
  ["path", { d: "M10 9v7", key: "ylp826" }],
  ["path", { d: "M14 6v10", key: "1jy4vg" }],
  ["circle", { cx: "17.5", cy: "12.5", r: "3.5", key: "1a9481" }],
  ["circle", { cx: "6.5", cy: "12.5", r: "3.5", key: "2jlv1r" }]
], Iy = e("case-lower", Gy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wy = [
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M22 9v7", key: "pvm9v3" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }],
  ["circle", { cx: "18.5", cy: "12.5", r: "3.5", key: "z97x68" }]
], Xy = e("case-sensitive", Wy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = [
  [
    "path",
    {
      d: "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5",
      key: "nxs35"
    }
  ],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }]
], Yy = e("case-upper", Ky);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qy = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["circle", { cx: "8", cy: "10", r: "2", key: "1xl4ub" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["circle", { cx: "16", cy: "10", r: "2", key: "r14t7q" }],
  ["path", { d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3", key: "l01ucn" }]
], Jy = e("cassette-tape", Qy);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e4 = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", key: "3zrzxg" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8", key: "g6cvee" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4", key: "1y1dii" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20", key: "xu2jvo" }]
], t4 = e("cast", e4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a4 = [
  ["path", { d: "M10 5V3", key: "1y54qe" }],
  ["path", { d: "M14 5V3", key: "m6isi" }],
  ["path", { d: "M15 21v-3a3 3 0 0 0-6 0v3", key: "lbp5hj" }],
  ["path", { d: "M18 3v8", key: "2ollhf" }],
  ["path", { d: "M18 5H6", key: "98imr9" }],
  ["path", { d: "M22 11H2", key: "1lmjae" }],
  ["path", { d: "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9", key: "1rly83" }],
  ["path", { d: "M6 3v8", key: "csox7g" }]
], h4 = e("castle", a4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o4 = [
  [
    "path",
    {
      d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
      key: "x6xyqk"
    }
  ],
  ["path", { d: "M8 14v.5", key: "1nzgdb" }],
  ["path", { d: "M16 14v.5", key: "1lajdz" }],
  ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z", key: "12kq1m" }]
], c4 = e("cat", o4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d4 = [
  [
    "path",
    {
      d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97",
      key: "ir91b5"
    }
  ],
  [
    "path",
    {
      d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z",
      key: "jlp8i1"
    }
  ],
  ["path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15", key: "19bib8" }],
  ["path", { d: "M2 21v-4", key: "l40lih" }],
  ["path", { d: "M7 9h.01", key: "19b3jx" }]
], y4 = e("cctv", d4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  [
    "path",
    {
      d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
      key: "q0gr47"
    }
  ]
], k4 = e("chart-area", n4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1", key: "1iip1u" }],
  ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1", key: "1anskk" }]
], i4 = e("chart-bar-big", p4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M7 11h8", key: "1feolt" }],
  ["path", { d: "M7 16h3", key: "ur6vzw" }],
  ["path", { d: "M7 6h12", key: "sz5b0d" }]
], r4 = e("chart-bar-decreasing", s4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M7 11h8", key: "1feolt" }],
  ["path", { d: "M7 16h12", key: "wsnu98" }],
  ["path", { d: "M7 6h3", key: "w9rmul" }]
], M4 = e("chart-bar-increasing", l4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _4 = [
  ["path", { d: "M11 13v4", key: "vyy2rb" }],
  ["path", { d: "M15 5v4", key: "1gx88a" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1", key: "1iip1u" }],
  ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1", key: "1anskk" }]
], v4 = e("chart-bar-stacked", _4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M7 16h8", key: "srdodz" }],
  ["path", { d: "M7 11h12", key: "127s9w" }],
  ["path", { d: "M7 6h3", key: "w9rmul" }]
], x4 = e("chart-bar", m4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g4 = [
  ["path", { d: "M9 5v4", key: "14uxtq" }],
  ["rect", { width: "4", height: "6", x: "7", y: "9", rx: "1", key: "f4fvz0" }],
  ["path", { d: "M9 15v2", key: "r5rk32" }],
  ["path", { d: "M17 3v2", key: "1l2re6" }],
  ["rect", { width: "4", height: "8", x: "15", y: "5", rx: "1", key: "z38je5" }],
  ["path", { d: "M17 13v3", key: "5l0wba" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }]
], u4 = e("chart-candlestick", g4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1", key: "q8uenq" }],
  ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1", key: "sr5ea" }]
], w4 = e("chart-column-big", f4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N4 = [
  ["path", { d: "M13 17V9", key: "1fwyjl" }],
  ["path", { d: "M18 17v-3", key: "1sqioe" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M8 17V5", key: "1wzmnc" }]
], $4 = e("chart-column-decreasing", N4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b4 = [
  ["path", { d: "M13 17V9", key: "1fwyjl" }],
  ["path", { d: "M18 17V5", key: "sfb6ij" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], z4 = e("chart-column-increasing", b4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q4 = [
  ["path", { d: "M11 13H7", key: "t0o9gq" }],
  ["path", { d: "M19 9h-4", key: "rera1j" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1", key: "q8uenq" }],
  ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1", key: "sr5ea" }]
], j4 = e("chart-column-stacked", q4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], V4 = e("chart-column", H4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A4 = [
  ["path", { d: "M10 6h8", key: "zvc2xc" }],
  ["path", { d: "M12 16h6", key: "yi5mkt" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M8 11h7", key: "wz2hg0" }]
], C4 = e("chart-gantt", A4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
], S4 = e("chart-line", L4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P4 = [
  ["path", { d: "m13.11 7.664 1.78 2.672", key: "go2gg9" }],
  ["path", { d: "m14.162 12.788-3.324 1.424", key: "11x848" }],
  ["path", { d: "m20 4-6.06 1.515", key: "1wxxh7" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["circle", { cx: "12", cy: "6", r: "2", key: "1jj5th" }],
  ["circle", { cx: "16", cy: "12", r: "2", key: "4ma0v8" }],
  ["circle", { cx: "9", cy: "15", r: "2", key: "lf2ghp" }]
], R4 = e("chart-network", P4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T4 = [
  ["path", { d: "M5 21V3", key: "clc1r8" }],
  ["path", { d: "M12 21V9", key: "uvy0l4" }],
  ["path", { d: "M19 21v-6", key: "tkawy9" }]
], B4 = e("chart-no-axes-column-decreasing", T4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D4 = [
  ["path", { d: "M5 21v-6", key: "1hz6c0" }],
  ["path", { d: "M12 21V9", key: "uvy0l4" }],
  ["path", { d: "M19 21V3", key: "11j9sm" }]
], Z4 = e("chart-no-axes-column-increasing", D4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F4 = [
  ["path", { d: "M5 21v-6", key: "1hz6c0" }],
  ["path", { d: "M12 21V3", key: "1lcnhd" }],
  ["path", { d: "M19 21V9", key: "unv183" }]
], O4 = e("chart-no-axes-column", F4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E4 = [
  ["path", { d: "M12 16v5", key: "zza2cw" }],
  ["path", { d: "M16 14v7", key: "1g90b9" }],
  ["path", { d: "M20 10v11", key: "1iqoj0" }],
  [
    "path",
    { d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15", key: "1fw8x9" }
  ],
  ["path", { d: "M4 18v3", key: "1yp0dc" }],
  ["path", { d: "M8 14v7", key: "n3cwzv" }]
], U4 = e("chart-no-axes-combined", E4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G4 = [
  ["path", { d: "M6 5h12", key: "fvfigv" }],
  ["path", { d: "M4 12h10", key: "oujl3d" }],
  ["path", { d: "M12 19h8", key: "baeox8" }]
], I4 = e("chart-no-axes-gantt", G4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W4 = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
], X4 = e("chart-pie", W4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K4 = [
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }],
  ["circle", { cx: "18.5", cy: "5.5", r: ".5", fill: "currentColor", key: "lysivs" }],
  ["circle", { cx: "11.5", cy: "11.5", r: ".5", fill: "currentColor", key: "byv1b8" }],
  ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor", key: "nkw3mc" }],
  ["circle", { cx: "17.5", cy: "14.5", r: ".5", fill: "currentColor", key: "1gjh6j" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }]
], Y4 = e("chart-scatter", K4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q4 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7", key: "lw07rv" }]
], J4 = e("chart-spline", Q4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e5 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
], t5 = e("check-check", e5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a5 = [
  ["path", { d: "M20 4L9 15", key: "1qkx8z" }],
  ["path", { d: "M21 19L3 19", key: "100sma" }],
  ["path", { d: "M9 15L4 10", key: "9zxff7" }]
], h5 = e("check-line", a5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], c5 = e("check", o5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d5 = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
], y5 = e("chef-hat", d5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n5 = [
  ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "cvxqlc" }],
  ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "1ostrc" }],
  ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12", key: "hqx58h" }],
  ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z", key: "eykp1o" }]
], k5 = e("cherry", n5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p5 = [
  [
    "path",
    { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z", key: "b89hwq" }
  ],
  [
    "path",
    {
      d: "M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18",
      key: "8jdkhx"
    }
  ],
  ["path", { d: "m16 7-2.5 2.5", key: "1jq90w" }],
  ["path", { d: "M9 2h6", key: "1jrp98" }]
], i5 = e("chess-bishop", p5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s5 = [
  [
    "path",
    { d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z", key: "mqzwx6" }
  ],
  [
    "path",
    {
      d: "m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1",
      key: "1gdt1g"
    }
  ],
  ["path", { d: "M10 4h4", key: "1xpv9s" }],
  ["path", { d: "M12 2v6.818", key: "b17a49" }]
], r5 = e("chess-king", s5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l5 = [
  [
    "path",
    { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z", key: "b89hwq" }
  ],
  [
    "path",
    {
      d: "M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456",
      key: "axbnlq"
    }
  ],
  ["path", { d: "m15 5 1.425-1.425", key: "15xz8w" }],
  ["path", { d: "m17 8 1.53-1.53", key: "15zhqh" }],
  ["path", { d: "M9.713 12.185 7 18", key: "1ocm0l" }]
], M5 = e("chess-knight", l5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _5 = [
  [
    "path",
    { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z", key: "b89hwq" }
  ],
  ["path", { d: "m14.5 10 1.5 8", key: "cim3qy" }],
  ["path", { d: "M7 10h10", key: "1101jm" }],
  ["path", { d: "m8 18 1.5-8", key: "ja3yjd" }],
  ["circle", { cx: "12", cy: "6", r: "4", key: "1frrej" }]
], v5 = e("chess-pawn", _5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m5 = [
  [
    "path",
    { d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z", key: "mqzwx6" }
  ],
  ["path", { d: "m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402", key: "1js4gl" }],
  ["path", { d: "m20 9-3 9", key: "r75r3f" }],
  ["path", { d: "m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34", key: "1joj19" }],
  ["path", { d: "M7 18 4 9", key: "1mfzj8" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }],
  ["circle", { cx: "20", cy: "7", r: "2", key: "9w7p1x" }],
  ["circle", { cx: "4", cy: "7", r: "2", key: "1d9wy8" }]
], x5 = e("chess-queen", m5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g5 = [
  [
    "path",
    { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z", key: "b89hwq" }
  ],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  ["path", { d: "m17 18-1-9", key: "10nd7q" }],
  ["path", { d: "M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2", key: "uxf4yx" }],
  ["path", { d: "M6 4h12", key: "1x2ag7" }],
  ["path", { d: "m7 18 1-9", key: "1si9vq" }]
], u5 = e("chess-rook", g5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], w5 = e("chevron-down", f5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N5 = [
  ["path", { d: "m17 18-6-6 6-6", key: "1yerx2" }],
  ["path", { d: "M7 6v12", key: "1p53r6" }]
], $5 = e("chevron-first", N5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b5 = [
  ["path", { d: "m7 18 6-6-6-6", key: "lwmzdw" }],
  ["path", { d: "M17 6v12", key: "1o0aio" }]
], z5 = e("chevron-last", b5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], j5 = e("chevron-left", q5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], V5 = e("chevron-right", H5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A5 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], C5 = e("chevron-up", A5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L5 = [
  ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
  ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
], S5 = e("chevrons-down-up", L5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P5 = [
  ["path", { d: "m7 6 5 5 5-5", key: "1lc07p" }],
  ["path", { d: "m7 13 5 5 5-5", key: "1d48rs" }]
], R5 = e("chevrons-down", P5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T5 = [
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "m17 7 5 5-5 5", key: "1xlxn0" }],
  ["path", { d: "m7 7-5 5 5 5", key: "19njba" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }]
], B5 = e("chevrons-left-right-ellipsis", T5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D5 = [
  ["path", { d: "m9 7-5 5 5 5", key: "j5w590" }],
  ["path", { d: "m15 7 5 5-5 5", key: "1bl6da" }]
], Z5 = e("chevrons-left-right", D5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F5 = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], O5 = e("chevrons-left", F5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E5 = [
  ["path", { d: "m20 17-5-5 5-5", key: "30x0n2" }],
  ["path", { d: "m4 17 5-5-5-5", key: "16spf4" }]
], U5 = e("chevrons-right-left", E5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G5 = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], I5 = e("chevrons-right", G5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W5 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], X5 = e("chevrons-up-down", W5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K5 = [
  ["path", { d: "m17 11-5-5-5 5", key: "e8nh98" }],
  ["path", { d: "m17 18-5-5-5 5", key: "2avn1x" }]
], Y5 = e("chevrons-up", K5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q5 = [
  ["path", { d: "M10.88 21.94 15.46 14", key: "xkve6t" }],
  ["path", { d: "M21.17 8H12", key: "19dcdn" }],
  ["path", { d: "M3.95 6.06 8.54 14", key: "g8jz9m" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
], J5 = e("chromium", Q5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const en = [
  ["path", { d: "M10 9h4", key: "u4k05v" }],
  ["path", { d: "M12 7v5", key: "ma6bk" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
      key: "flvdwo"
    }
  ],
  [
    "path",
    {
      d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
      key: "a5i0n2"
    }
  ]
], tn = e("church", en);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const an = [
  ["path", { d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13", key: "1gdiyg" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5", key: "1il607" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866", key: "166zjj" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5", key: "1gah44" }],
  ["path", { d: "M7 12v4", key: "jqww69" }]
], hn = e("cigarette-off", an);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const on = [
  ["path", { d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14", key: "1mb5g1" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5", key: "1il607" }],
  ["path", { d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "1yl5r7" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5", key: "1gah44" }],
  ["path", { d: "M7 12v4", key: "jqww69" }]
], cn = e("cigarette", on);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], yn = e("circle-alert", dn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "m8 12 4 4 4-4", key: "k98ssh" }]
], kn = e("circle-arrow-down", nn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m12 8-4 4 4 4", key: "15vm53" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }]
], sn = e("circle-arrow-left", pn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rn = [
  ["path", { d: "M2 12a10 10 0 1 1 10 10", key: "1yn6ov" }],
  ["path", { d: "m2 22 10-10", key: "28ilpk" }],
  ["path", { d: "M8 22H2v-6", key: "sulq54" }]
], ln = e("circle-arrow-out-down-left", rn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mn = [
  ["path", { d: "M12 22a10 10 0 1 1 10-10", key: "130bv5" }],
  ["path", { d: "M22 22 12 12", key: "131aw7" }],
  ["path", { d: "M22 16v6h-6", key: "1gvm70" }]
], _n = e("circle-arrow-out-down-right", Mn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vn = [
  ["path", { d: "M2 8V2h6", key: "hiwtdz" }],
  ["path", { d: "m2 2 10 10", key: "1oh8rs" }],
  ["path", { d: "M12 2A10 10 0 1 1 2 12", key: "rrk4fa" }]
], mn = e("circle-arrow-out-up-left", vn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xn = [
  ["path", { d: "M22 12A10 10 0 1 1 12 2", key: "1fm58d" }],
  ["path", { d: "M22 2 12 12", key: "yg2myt" }],
  ["path", { d: "M16 2h6v6", key: "zan5cs" }]
], gn = e("circle-arrow-out-up-right", xn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const un = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m12 16 4-4-4-4", key: "1i9zcv" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], fn = e("circle-arrow-right", un);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
], Nn = e("circle-arrow-up", wn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $n = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], bn = e("circle-check-big", $n);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], qn = e("circle-check", zn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 10-4 4-4-4", key: "894hmk" }]
], Hn = e("circle-chevron-down", jn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m14 16-4-4 4-4", key: "ojs7w8" }]
], An = e("circle-chevron-left", Vn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m10 8 4 4-4 4", key: "1wy4r4" }]
], Ln = e("circle-chevron-right", Cn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m8 14 4-4 4 4", key: "fy2ptz" }]
], Pn = e("circle-chevron-up", Sn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rn = [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0", key: "5ilxe3" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0", key: "11zvb9" }],
  ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7", key: "1iw5b2" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8", key: "c0bmvh" }],
  ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69", key: "1ruxm7" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8", key: "qkgqxc" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69", key: "1mcia2" }],
  ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7", key: "1fvljs" }]
], Tn = e("circle-dashed", Rn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bn = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
], Dn = e("circle-dollar-sign", Bn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zn = [
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "16", key: "aqc6ln" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "8", key: "1mkcni" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Fn = e("circle-divide", Zn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const On = [
  ["path", { d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0", key: "1qdqn0" }],
  ["path", { d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7", key: "1bq7p6" }],
  ["path", { d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8", key: "1rlaqf" }],
  ["path", { d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69", key: "1xk03u" }],
  ["path", { d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0", key: "l7re25" }],
  ["path", { d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7", key: "1v18p6" }],
  ["path", { d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8", key: "xdo6bj" }],
  ["path", { d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69", key: "1jjmaz" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], En = e("circle-dot-dashed", On);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Un = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], Gn = e("circle-dot", Un);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const In = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M17 12h.01", key: "1m0b6t" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M7 12h.01", key: "eqddd0" }]
], Wn = e("circle-ellipsis", In);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xn = [
  ["path", { d: "M7 10h10", key: "1101jm" }],
  ["path", { d: "M7 14h10", key: "1mhdw3" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Kn = e("circle-equal", Xn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yn = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75", key: "175t95" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3", key: "1vce0s" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4", key: "o3fkw4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857", key: "1szpfk" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38", key: "9yhvd4" }]
], Qn = e("circle-fading-arrow-up", Yn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jn = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75", key: "175t95" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3", key: "1vce0s" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4", key: "o3fkw4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857", key: "1szpfk" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38", key: "9yhvd4" }]
], e3 = e("circle-fading-plus", Jn);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  ["path", { d: "M15.6 2.7a10 10 0 1 0 5.7 5.7", key: "1e0p6d" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M13.4 10.6 19 5", key: "1kr7tw" }]
], a3 = e("circle-gauge", t3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], o3 = e("circle-minus", h3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c3 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }]
], d3 = e("circle-off", c3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y3 = [
  ["path", { d: "M12.656 7H13a3 3 0 0 1 2.984 3.307", key: "1sjx87" }],
  ["path", { d: "M13 13H9", key: "e2beee" }],
  ["path", { d: "M19.071 19.071A1 1 0 0 1 4.93 4.93", key: "1kb595" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.357 2.687a10 10 0 0 1 12.956 12.956", key: "5bsfdx" }],
  ["path", { d: "M9 17V9", key: "ojradj" }]
], n3 = e("circle-parking-off", y3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9", key: "1dfk2c" }]
], p3 = e("circle-parking", k3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9", key: "c1nkhi" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9", key: "h65svq" }]
], s3 = e("circle-pause", i3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
], l3 = e("circle-percent", r3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M3 = [
  ["circle", { cx: "12", cy: "19", r: "2", key: "13j0tp" }],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }],
  ["circle", { cx: "16", cy: "12", r: "2", key: "4ma0v8" }],
  ["circle", { cx: "20", cy: "19", r: "2", key: "1obnsp" }],
  ["circle", { cx: "4", cy: "19", r: "2", key: "p3m9r0" }],
  ["circle", { cx: "8", cy: "12", r: "2", key: "1nvbw3" }]
], _3 = e("circle-pile", M3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], m3 = e("circle-plus", v3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x3 = [
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
      key: "kmsa83"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], g3 = e("circle-play", x3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u3 = [
  ["path", { d: "M10 16V9.5a1 1 0 0 1 5 0", key: "1i1are" }],
  ["path", { d: "M8 12h4", key: "qz6y1c" }],
  ["path", { d: "M8 16h7", key: "sbedsn" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], f3 = e("circle-pound-sterling", u3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w3 = [
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005", key: "1pek45" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], N3 = e("circle-power", w3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], b3 = e("circle-question-mark", $3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z3 = [
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], q3 = e("circle-slash-2", z3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "9", x2: "15", y1: "15", y2: "9", key: "1dfufj" }]
], H3 = e("circle-slash", j3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V3 = [
  [
    "path",
    {
      d: "M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
      key: "285bvi"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], A3 = e("circle-star", V3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C3 = [["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }]], L3 = e("circle-small", C3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
], P3 = e("circle-stop", S3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R3 = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], T3 = e("circle-user-round", R3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
], D3 = e("circle-user", B3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], F3 = e("circle-x", Z3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O3 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], E3 = e("circle", O3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3", key: "1ve2rv" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4", key: "1fwkro" }],
  ["circle", { cx: "15", cy: "15", r: "2", key: "3i40o0" }]
], G3 = e("circuit-board", U3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I3 = [
  [
    "path",
    {
      d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",
      key: "4ite01"
    }
  ],
  ["path", { d: "M19.65 15.66A8 8 0 0 1 8.35 4.34", key: "1gxipu" }],
  ["path", { d: "m14 10-5.5 5.5", key: "92pfem" }],
  ["path", { d: "M14 17.85V10H6.15", key: "xqmtsk" }]
], W3 = e("citrus", I3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X3 = [
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z", key: "1tn4o7" }
  ],
  ["path", { d: "m6.2 5.3 3.1 3.9", key: "iuk76l" }],
  ["path", { d: "m12.4 3.4 3.1 4", key: "6hsd6n" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", key: "ltgou9" }]
], K3 = e("clapperboard", X3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y3 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
], Q3 = e("clipboard-check", Y3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J3 = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v.832", key: "1ujtp2" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2", key: "qvpao1" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
], ek = e("clipboard-clock", J3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
], ak = e("clipboard-copy", tk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
], ok = e("clipboard-list", hk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ck = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M9 14h6", key: "159ibu" }]
], dk = e("clipboard-minus", ck);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yk = [
  ["path", { d: "M11 14h10", key: "1w8e9d" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
  ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
], nk = e("clipboard-paste", yk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", key: "1oijnt" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5", key: "1but9f" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 1.73 1", key: "1p8n7l" }],
  ["path", { d: "M8 18h1", key: "13wk12" }],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380"
    }
  ]
], pk = e("clipboard-pen-line", kk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ik = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", key: "1oijnt" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5", key: "cereej" }],
  ["path", { d: "M4 13.5V6a2 2 0 0 1 2-2h2", key: "5ua5vh" }],
  [
    "path",
    {
      d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1y4qbx"
    }
  ]
], sk = e("clipboard-pen", ik);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M9 14h6", key: "159ibu" }],
  ["path", { d: "M12 17v-6", key: "1y8rbf" }]
], lk = e("clipboard-plus", rk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M9 12v-1h6v1", key: "iehl6m" }],
  ["path", { d: "M11 17h2", key: "12w5me" }],
  ["path", { d: "M12 11v6", key: "1bwqyc" }]
], _k = e("clipboard-type", Mk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m15 11-6 6", key: "1toa9n" }],
  ["path", { d: "m9 11 6 6", key: "wlibny" }]
], mk = e("clipboard-x", vk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xk = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ]
], gk = e("clipboard", xk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uk = [
  ["path", { d: "M12 6v6l2-4", key: "miptyd" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], fk = e("clock-1", uk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wk = [
  ["path", { d: "M12 6v6l-4-2", key: "cedpoo" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Nk = e("clock-10", wk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $k = [
  ["path", { d: "M12 6v6l-2-4", key: "ns39ag" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], bk = e("clock-11", $k);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zk = [
  ["path", { d: "M12 6v6", key: "1ipuwl" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], qk = e("clock-12", zk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jk = [
  ["path", { d: "M12 6v6l4-2", key: "1r2kuh" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Hk = e("clock-2", jk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vk = [
  ["path", { d: "M12 6v6h4", key: "135r8i" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Ak = e("clock-3", Vk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ck = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Lk = e("clock-4", Ck);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sk = [
  ["path", { d: "M12 6v6l2 4", key: "1287s9" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Pk = e("clock-5", Sk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rk = [
  ["path", { d: "M12 6v10", key: "wf7rdh" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Tk = e("clock-6", Rk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bk = [
  ["path", { d: "M12 6v6l-2 4", key: "1095bu" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Dk = e("clock-7", Bk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zk = [
  ["path", { d: "M12 6v6l-4 2", key: "imc3wl" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Fk = e("clock-8", Zk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ok = [
  ["path", { d: "M12 6v6H8", key: "u39vzm" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Ek = e("clock-9", Ok);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uk = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["path", { d: "M20 12v5", key: "12wsvk" }],
  ["path", { d: "M20 21h.01", key: "1p6o6n" }],
  ["path", { d: "M21.25 8.2A10 10 0 1 0 16 21.16", key: "17fp9f" }]
], Gk = e("clock-alert", Uk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ik = [
  ["path", { d: "M12 6v6l2 1", key: "19cm8n" }],
  ["path", { d: "M12.337 21.994a10 10 0 1 1 9.588-8.767", key: "28moa" }],
  ["path", { d: "m14 18 4 4 4-4", key: "1waygx" }],
  ["path", { d: "M18 14v8", key: "irew45" }]
], Wk = e("clock-arrow-down", Ik);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xk = [
  ["path", { d: "M12 6v6l1.56.78", key: "14ed3g" }],
  ["path", { d: "M13.227 21.925a10 10 0 1 1 8.767-9.588", key: "jwkls1" }],
  ["path", { d: "m14 18 4-4 4 4", key: "ftkppy" }],
  ["path", { d: "M18 22v-8", key: "su0gjh" }]
], Kk = e("clock-arrow-up", Xk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yk = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["path", { d: "M22 12a10 10 0 1 0-11 9.95", key: "17dhok" }],
  ["path", { d: "m22 16-5.5 5.5L14 19", key: "1eibut" }]
], Qk = e("clock-check", Yk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jk = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75", key: "175t95" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3", key: "1vce0s" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4", key: "o3fkw4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857", key: "1szpfk" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38", key: "9yhvd4" }]
], ep = e("clock-fading", Jk);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tp = [
  ["path", { d: "M12 6v6l3.644 1.822", key: "1jmett" }],
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M21.92 13.267a10 10 0 1 0-8.653 8.653", key: "1u0osk" }]
], ap = e("clock-plus", tp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], op = e("clock", hp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = [
  ["path", { d: "M10 9.17a3 3 0 1 0 0 5.66", key: "h9wayk" }],
  ["path", { d: "M17 9.17a3 3 0 1 0 0 5.66", key: "1v6zke" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
], dp = e("closed-caption", cp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = [
  ["path", { d: "M12 12v4", key: "tww15h" }],
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708", key: "xsb5ju" }]
], np = e("cloud-alert", yp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kp = [
  ["path", { d: "M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607", key: "xpoh9y" }],
  ["path", { d: "M7 11v4h4", key: "q9yh32" }],
  [
    "path",
    {
      d: "M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15",
      key: "1xm8iu"
    }
  ]
], pp = e("cloud-backup", kp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = [
  ["path", { d: "m17 15-5.5 5.5L9 18", key: "15q87x" }],
  ["path", { d: "M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742", key: "9ho6ki" }]
], sp = e("cloud-check", ip);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rp = [
  ["path", { d: "m10.852 19.772-.383.924", key: "r7sl7d" }],
  ["path", { d: "m13.148 14.228.383-.923", key: "1d5zpm" }],
  ["path", { d: "M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923", key: "1ydik7" }],
  ["path", { d: "m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544", key: "1m1vsf" }],
  ["path", { d: "m14.772 15.852.923-.383", key: "660p6e" }],
  ["path", { d: "m14.772 18.148.923.383", key: "hrcpis" }],
  [
    "path",
    {
      d: "M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
      key: "j2q98n"
    }
  ],
  ["path", { d: "m9.228 15.852-.923-.383", key: "1p9ong" }],
  ["path", { d: "m9.228 18.148-.923.383", key: "6558rz" }]
], lp = e("cloud-cog", rp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
], _p = e("cloud-drizzle", Mp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vp = [
  ["path", { d: "M12 13v8l-4-4", key: "1f5nwf" }],
  ["path", { d: "m12 21 4-4", key: "1lfcce" }],
  ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284", key: "ui1hmy" }]
], mp = e("cloud-download", vp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
], gp = e("cloud-fog", xp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const up = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v2", key: "a1is7l" }],
  ["path", { d: "M8 14v2", key: "1e9m6t" }],
  ["path", { d: "M16 20h.01", key: "xwek51" }],
  ["path", { d: "M8 20h.01", key: "1vjney" }],
  ["path", { d: "M12 16v2", key: "z66u1j" }],
  ["path", { d: "M12 22h.01", key: "1urd7a" }]
], fp = e("cloud-hail", up);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wp = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
], Np = e("cloud-lightning", wp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $p = [
  ["path", { d: "M11 20v2", key: "174qtz" }],
  [
    "path",
    {
      d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
      key: "zwnc1e"
    }
  ],
  ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24", key: "1qmrp3" }],
  ["path", { d: "M7 19v2", key: "12npes" }]
], bp = e("cloud-moon-rain", $p);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zp = [
  ["path", { d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z", key: "ie2ih4" }],
  [
    "path",
    {
      d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
      key: "zwnc1e"
    }
  ]
], qp = e("cloud-moon", zp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = [
  ["path", { d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057", key: "1uxyv8" }],
  ["path", { d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78", key: "99tcn7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], Hp = e("cloud-off", jp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m9.2 22 3-7", key: "sb5f6j" }],
  ["path", { d: "m9 13-3 7", key: "500co5" }],
  ["path", { d: "m17 13-3 7", key: "8t2fiy" }]
], Ap = e("cloud-rain-wind", Vp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
], Lp = e("cloud-rain", Cp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sp = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
], Pp = e("cloud-snow", Sp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", key: "dpwdj0" }],
  ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24", key: "1qmrp3" }],
  ["path", { d: "M11 20v2", key: "174qtz" }],
  ["path", { d: "M7 19v2", key: "12npes" }]
], Tp = e("cloud-sun-rain", Rp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bp = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", key: "dpwdj0" }],
  ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z", key: "s09mg5" }]
], Dp = e("cloud-sun", Bp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  ["path", { d: "m17 18-1.535 1.605a5 5 0 0 1-8-1.5", key: "adpv5j" }],
  ["path", { d: "M17 22v-4h-4", key: "ex1ofj" }],
  [
    "path",
    { d: "M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607", key: "ziqt14" }
  ],
  ["path", { d: "M7 10v4h4", key: "1j6gx1" }],
  ["path", { d: "m7 14 1.535-1.605a5 5 0 0 1 8 1.5", key: "19q5h7" }]
], Fp = e("cloud-sync", Zp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Op = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
], Ep = e("cloud-upload", Op);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Gp = e("cloud", Up);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ip = [
  ["path", { d: "M16.17 7.83 2 22", key: "t58vo8" }],
  [
    "path",
    {
      d: "M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12",
      key: "17k36q"
    }
  ],
  ["path", { d: "m7.83 7.83 8.34 8.34", key: "1d7sxk" }]
], Wp = e("clover", Ip);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  ["path", { d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z", key: "44yre2" }],
  ["path", { d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61", key: "leugyv" }]
], Kp = e("cloudy", Xp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yp = [
  [
    "path",
    {
      d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
      key: "27yuqz"
    }
  ],
  ["path", { d: "M12 17.66L12 22", key: "ogfahf" }]
], Qp = e("club", Yp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
], e8 = e("code-xml", Jp);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t8 = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
], a8 = e("code", t8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h8 = [
  ["polygon", { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", key: "srzb37" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "15.5", key: "1t73f2" }],
  ["polyline", { points: "22 8.5 12 15.5 2 8.5", key: "ajlxae" }],
  ["polyline", { points: "2 15.5 12 8.5 22 15.5", key: "susrui" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "8.5", key: "2cldga" }]
], o8 = e("codepen", h8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c8 = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ],
  ["polyline", { points: "7.5 4.21 12 6.81 16.5 4.21", key: "fabo96" }],
  ["polyline", { points: "7.5 19.79 7.5 14.6 3 12", key: "z377f1" }],
  ["polyline", { points: "21 12 16.5 14.6 16.5 19.79", key: "9nrev1" }],
  ["polyline", { points: "3.27 6.96 12 12.01 20.73 6.96", key: "1180pa" }],
  ["line", { x1: "12", x2: "12", y1: "22.08", y2: "12", key: "3z3uq6" }]
], d8 = e("codesandbox", c8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y8 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
], n8 = e("coffee", y8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k8 = [
  ["path", { d: "M11 10.27 7 3.34", key: "16pf9h" }],
  ["path", { d: "m11 13.73-4 6.93", key: "794ttg" }],
  ["path", { d: "M12 22v-2", key: "1osdcq" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M14 12h8", key: "4f43i9" }],
  ["path", { d: "m17 20.66-1-1.73", key: "eq3orb" }],
  ["path", { d: "m17 3.34-1 1.73", key: "2wel8s" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "m20.66 17-1.73-1", key: "sg0v6f" }],
  ["path", { d: "m20.66 7-1.73 1", key: "1ow05n" }],
  ["path", { d: "m3.34 17 1.73-1", key: "nuk764" }],
  ["path", { d: "m3.34 7 1.73 1", key: "1ulond" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }]
], p8 = e("cog", k8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i8 = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
], s8 = e("coins", i8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r8 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
], l8 = e("columns-2", r8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M8 = [
  ["path", { d: "M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5", key: "1g2yzs" }],
  ["path", { d: "m14.3 19.6 1-.4", key: "11sv9r" }],
  ["path", { d: "M15 3v7.5", key: "7lm50a" }],
  ["path", { d: "m15.2 16.9-.9-.3", key: "1t7mvx" }],
  ["path", { d: "m16.6 21.7.3-.9", key: "1j67ps" }],
  ["path", { d: "m16.8 15.3-.4-1", key: "1ei7r6" }],
  ["path", { d: "m19.1 15.2.3-.9", key: "18r7jp" }],
  ["path", { d: "m19.6 21.7-.4-1", key: "z2vh2" }],
  ["path", { d: "m20.7 16.8 1-.4", key: "19m87a" }],
  ["path", { d: "m21.7 19.4-.9-.3", key: "1qgwi9" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], _8 = e("columns-3-cog", M8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v8 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], m8 = e("columns-3", v8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x8 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7.5 3v18", key: "w0wo6v" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M16.5 3v18", key: "10tjh1" }]
], g8 = e("columns-4", x8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u8 = [
  ["path", { d: "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "1l7d7l" }],
  ["path", { d: "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "9955pe" }],
  ["path", { d: "m7 15 3 3", key: "4hkfgk" }],
  ["path", { d: "m7 21 3-3H5a2 2 0 0 1-2-2v-2", key: "1xljwe" }],
  ["rect", { x: "14", y: "14", width: "7", height: "7", rx: "1", key: "1cdgtw" }],
  ["rect", { x: "3", y: "3", width: "7", height: "7", rx: "1", key: "zi3rio" }]
], f8 = e("combine", u8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w8 = [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
], N8 = e("command", w8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $8 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], b8 = e("compass", $8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z8 = [
  [
    "path",
    {
      d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
      key: "1uwlt4"
    }
  ],
  [
    "path",
    {
      d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
      key: "10291m"
    }
  ],
  [
    "path",
    {
      d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
      key: "1tqoq1"
    }
  ],
  [
    "path",
    {
      d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
      key: "1x6lto"
    }
  ]
], q8 = e("component", z8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j8 = [
  ["rect", { width: "14", height: "8", x: "5", y: "2", rx: "2", key: "wc9tft" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h2", key: "rwmk9e" }],
  ["path", { d: "M12 18h6", key: "aqd8w3" }]
], H8 = e("computer", j8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V8 = [
  [
    "path",
    { d: "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z", key: "1pvr1r" }
  ],
  ["path", { d: "M20 16a8 8 0 1 0-16 0", key: "1pa543" }],
  ["path", { d: "M12 4v4", key: "1bq03y" }],
  ["path", { d: "M10 4h4", key: "1xpv9s" }]
], A8 = e("concierge-bell", V8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C8 = [
  ["path", { d: "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98", key: "53pte7" }],
  ["ellipse", { cx: "12", cy: "19", rx: "9", ry: "3", key: "1ji25f" }]
], L8 = e("cone", C8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S8 = [
  ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1", key: "1estib" }],
  ["path", { d: "M17 14v7", key: "7m2elx" }],
  ["path", { d: "M7 14v7", key: "1cm7wv" }],
  ["path", { d: "M17 3v3", key: "1v4jwn" }],
  ["path", { d: "M7 3v3", key: "7o6guu" }],
  ["path", { d: "M10 14 2.3 6.3", key: "1023jk" }],
  ["path", { d: "m14 6 7.7 7.7", key: "1s8pl2" }],
  ["path", { d: "m8 6 8 8", key: "hl96qh" }]
], P8 = e("construction", S8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R8 = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M17.915 22a6 6 0 0 0-12 0", key: "suqz9p" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", key: "12vinp" }]
], T8 = e("contact-round", R8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B8 = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2", key: "1waht3" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "11", r: "3", key: "itu57m" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", key: "12vinp" }]
], D8 = e("contact", B8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z8 = [
  [
    "path",
    {
      d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
      key: "1t2lqe"
    }
  ],
  ["path", { d: "M10 21.9V14L2.1 9.1", key: "o7czzq" }],
  ["path", { d: "m10 14 11.9-6.9", key: "zm5e20" }],
  ["path", { d: "M14 19.8v-8.1", key: "159ecu" }],
  ["path", { d: "M18 17.5V9.4", key: "11uown" }]
], F8 = e("container", Z8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O8 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 18a6 6 0 0 0 0-12v12z", key: "j4l70d" }]
], E8 = e("contrast", O8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U8 = [
  ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5", key: "laymnq" }],
  ["path", { d: "M8.5 8.5v.01", key: "ue8clq" }],
  ["path", { d: "M16 15.5v.01", key: "14dtrp" }],
  ["path", { d: "M12 12v.01", key: "u5ubse" }],
  ["path", { d: "M11 17v.01", key: "1hyl5a" }],
  ["path", { d: "M7 14v.01", key: "uct60s" }]
], G8 = e("cookie", U8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I8 = [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "u0tga0" }],
  ["path", { d: "m4 8 16-4", key: "16g0ng" }],
  [
    "path",
    {
      d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
      key: "12cejc"
    }
  ]
], W8 = e("cooking-pot", I8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X8 = [
  ["path", { d: "m12 15 2 2 4-4", key: "2c609p" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], K8 = e("copy-check", X8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y8 = [
  ["line", { x1: "12", x2: "18", y1: "15", y2: "15", key: "1nscbv" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Q8 = e("copy-minus", Y8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J8 = [
  ["line", { x1: "15", x2: "15", y1: "12", y2: "18", key: "1p7wdc" }],
  ["line", { x1: "12", x2: "18", y1: "15", y2: "15", key: "1nscbv" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], e6 = e("copy-plus", J8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t6 = [
  ["line", { x1: "12", x2: "18", y1: "18", y2: "12", key: "ebkxgr" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], a6 = e("copy-slash", t6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h6 = [
  ["line", { x1: "12", x2: "18", y1: "12", y2: "18", key: "1rg63v" }],
  ["line", { x1: "12", x2: "18", y1: "18", y2: "12", key: "ebkxgr" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], o6 = e("copy-x", h6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.17 14.83a4 4 0 1 0 0-5.66", key: "1sveal" }]
], d6 = e("copyleft", c6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y6 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], n6 = e("copy", y6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M14.83 14.83a4 4 0 1 1 0-5.66", key: "1i56pz" }]
], p6 = e("copyright", k6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i6 = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], s6 = e("corner-down-left", i6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r6 = [
  ["path", { d: "m15 10 5 5-5 5", key: "qqa56n" }],
  ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12", key: "z08zvw" }]
], l6 = e("corner-down-right", r6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M6 = [
  ["path", { d: "m14 15-5 5-5-5", key: "1eia93" }],
  ["path", { d: "M20 4h-7a4 4 0 0 0-4 4v12", key: "nbpdq2" }]
], _6 = e("corner-left-down", M6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v6 = [
  ["path", { d: "M14 9 9 4 4 9", key: "1af5af" }],
  ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4", key: "1blwi3" }]
], m6 = e("corner-left-up", v6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x6 = [
  ["path", { d: "m10 15 5 5 5-5", key: "1hpjnr" }],
  ["path", { d: "M4 4h7a4 4 0 0 1 4 4v12", key: "wcbgct" }]
], g6 = e("corner-right-down", x6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u6 = [
  ["path", { d: "m10 9 5-5 5 5", key: "9ctzwi" }],
  ["path", { d: "M4 20h7a4 4 0 0 0 4-4V4", key: "1plgdj" }]
], f6 = e("corner-right-up", u6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w6 = [
  ["path", { d: "M20 20v-7a4 4 0 0 0-4-4H4", key: "1nkjon" }],
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }]
], N6 = e("corner-up-left", w6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $6 = [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M4 20v-7a4 4 0 0 1 4-4h12", key: "1lu4f8" }]
], b6 = e("corner-up-right", $6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z6 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
], q6 = e("cpu", z6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  [
    "path",
    { d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1", key: "1ss3eq" }
  ],
  [
    "path",
    { d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1", key: "1od56t" }
  ]
], H6 = e("creative-commons", j6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V6 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], A6 = e("credit-card", V6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C6 = [
  ["path", { d: "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487", key: "14kkz9" }],
  ["path", { d: "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132", key: "1g7v07" }],
  ["path", { d: "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42", key: "ratg6b" }],
  ["path", { d: "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14", key: "4454f0" }],
  [
    "path",
    {
      d: "M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676",
      key: "qmemie"
    }
  ]
], L6 = e("croissant", C6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S6 = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
], P6 = e("crop", S6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R6 = [
  [
    "path",
    {
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
      key: "1xbrqy"
    }
  ]
], T6 = e("cross", R6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B6 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
], D6 = e("crown", B6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "22", x2: "18", y1: "12", y2: "12", key: "l9bcsi" }],
  ["line", { x1: "6", x2: "2", y1: "12", y2: "12", key: "13hhkx" }],
  ["line", { x1: "12", x2: "12", y1: "6", y2: "2", key: "10w3f3" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "18", key: "15g9kq" }]
], F6 = e("crosshair", Z6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O6 = [
  [
    "path",
    {
      d: "m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z",
      key: "1u2ovd"
    }
  ],
  ["path", { d: "M10 22v-8L2.25 9.15", key: "11pn4q" }],
  ["path", { d: "m10 14 11.77-6.87", key: "1kt1wh" }]
], E6 = e("cuboid", O6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U6 = [
  ["path", { d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8", key: "8166m8" }],
  ["path", { d: "M5 8h14", key: "pcz4l3" }],
  ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0", key: "yjz344" }],
  ["path", { d: "m12 8 1-6h2", key: "3ybfa4" }]
], G6 = e("cup-soda", U6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I6 = [
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }],
  ["line", { x1: "3", x2: "6", y1: "3", y2: "6", key: "1jkytn" }],
  ["line", { x1: "21", x2: "18", y1: "3", y2: "6", key: "14zfjt" }],
  ["line", { x1: "3", x2: "6", y1: "21", y2: "18", key: "iusuec" }],
  ["line", { x1: "21", x2: "18", y1: "21", y2: "18", key: "yj2dd7" }]
], W6 = e("currency", I6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X6 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5v14a9 3 0 0 0 18 0V5", key: "aqi0yr" }]
], K6 = e("cylinder", X6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y6 = [
  [
    "path",
    { d: "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", key: "157kva" }
  ],
  ["path", { d: "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", key: "d7q6m6" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  [
    "path",
    { d: "M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z", key: "pr6s65" }
  ]
], Q6 = e("dam", Y6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J6 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 12a9 3 0 0 0 5 2.69", key: "1ui2ym" }],
  ["path", { d: "M21 9.3V5", key: "6k6cib" }],
  ["path", { d: "M3 5v14a9 3 0 0 0 6.47 2.88", key: "i62tjy" }],
  ["path", { d: "M12 12v4h4", key: "1bxaet" }],
  [
    "path",
    {
      d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",
      key: "1f4ei9"
    }
  ]
], ei = e("database-backup", J6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ti = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 15 21.84", key: "14ibmq" }],
  ["path", { d: "M21 5V8", key: "1marbg" }],
  ["path", { d: "M21 12L18 17H22L19 22", key: "zafso" }],
  ["path", { d: "M3 12A9 3 0 0 0 14.59 14.87", key: "1y4wr8" }]
], ai = e("database-zap", ti);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hi = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], oi = e("database", hi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ci = [
  ["path", { d: "m13 21-3-3 3-3", key: "s3o1nf" }],
  ["path", { d: "M20 18H10", key: "14r3mt" }],
  ["path", { d: "M3 11h.01", key: "1eifu7" }],
  ["rect", { x: "6", y: "3", width: "5", height: "8", rx: "2.5", key: "v9paqo" }]
], di = e("decimals-arrow-left", ci);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yi = [
  ["path", { d: "M10 18h10", key: "1y5s8o" }],
  ["path", { d: "m17 21 3-3-3-3", key: "1ammt0" }],
  ["path", { d: "M3 11h.01", key: "1eifu7" }],
  ["rect", { x: "15", y: "3", width: "5", height: "8", rx: "2.5", key: "76md6a" }],
  ["rect", { x: "6", y: "3", width: "5", height: "8", rx: "2.5", key: "v9paqo" }]
], ni = e("decimals-arrow-right", yi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ki = [
  [
    "path",
    {
      d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
      key: "1yo7s0"
    }
  ],
  ["path", { d: "m12 9 6 6", key: "anjzzh" }],
  ["path", { d: "m18 9-6 6", key: "1fp51s" }]
], pi = e("delete", ki);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ii = [
  [
    "path",
    {
      d: "M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826",
      key: "xi88qy"
    }
  ],
  ["path", { d: "M20.804 14.869a9 9 0 0 1-17.608 0", key: "1r28rg" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }]
], si = e("dessert", ii);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ri = [
  ["circle", { cx: "19", cy: "19", r: "2", key: "17f5cg" }],
  ["circle", { cx: "5", cy: "5", r: "2", key: "1gwv83" }],
  ["path", { d: "M6.48 3.66a10 10 0 0 1 13.86 13.86", key: "xr8kdq" }],
  ["path", { d: "m6.41 6.41 11.18 11.18", key: "uhpjw7" }],
  ["path", { d: "M3.66 6.48a10 10 0 0 0 13.86 13.86", key: "cldpwv" }]
], li = e("diameter", ri);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mi = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
      key: "1ey20j"
    }
  ],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], _i = e("diamond-minus", Mi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vi = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z",
      key: "1tpxz2"
    }
  ],
  ["path", { d: "M9.2 9.2h.01", key: "1b7bvt" }],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "M14.7 14.8h.01", key: "17nsh4" }]
], mi = e("diamond-percent", vi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xi = [
  ["path", { d: "M12 8v8", key: "napkw2" }],
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
      key: "1ey20j"
    }
  ],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], gi = e("diamond-plus", xi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ui = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      key: "1f1r0c"
    }
  ]
], fi = e("diamond", ui);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wi = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }]
], Ni = e("dice-1", wi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $i = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }],
  ["path", { d: "M9 15h.01", key: "fzyn71" }]
], bi = e("dice-2", $i);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zi = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M16 8h.01", key: "cr5u4v" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
], qi = e("dice-3", zi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ji = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M16 8h.01", key: "cr5u4v" }],
  ["path", { d: "M8 8h.01", key: "1e4136" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }]
], Hi = e("dice-4", ji);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vi = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M16 8h.01", key: "cr5u4v" }],
  ["path", { d: "M8 8h.01", key: "1e4136" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }]
], Ai = e("dice-5", Vi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ci = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M16 8h.01", key: "cr5u4v" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }],
  ["path", { d: "M8 8h.01", key: "1e4136" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
], Li = e("dice-6", Ci);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Si = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
], Pi = e("dices", Si);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ri = [
  ["path", { d: "M12 3v14", key: "7cf3v8" }],
  ["path", { d: "M5 10h14", key: "elsbfy" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
], Ti = e("diff", Ri);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bi = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }]
], Di = e("disc-2", Bi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zi = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2", key: "oqkarx" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2", key: "1eah9h" }]
], Fi = e("disc-3", Zi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oi = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "12", cy: "12", r: "5", key: "nd82uf" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }]
], Ei = e("disc-album", Oi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ui = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], Gi = e("disc", Ui);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ii = [
  ["circle", { cx: "12", cy: "6", r: "1", key: "1bh7o1" }],
  ["line", { x1: "5", x2: "19", y1: "12", y2: "12", key: "13b5wn" }],
  ["circle", { cx: "12", cy: "18", r: "1", key: "lqb9t5" }]
], Wi = e("divide", Ii);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xi = [
  ["path", { d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8", key: "1bivrr" }],
  ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
  ["path", { d: "M2 15c3.333-3 6.667-3 10-3", key: "nxix30" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
  ["path", { d: "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1", key: "18cutr" }],
  ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
  ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
  ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
  ["path", { d: "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16", key: "rlvei3" }]
], Ki = e("dna-off", Xi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yi = [
  ["path", { d: "m10 16 1.5 1.5", key: "11lckj" }],
  ["path", { d: "m14 8-1.5-1.5", key: "1ohn8i" }],
  ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", key: "80uv8i" }],
  ["path", { d: "m16.5 10.5 1 1", key: "696xn5" }],
  ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
  ["path", { d: "M2 15c6.667-6 13.333 0 20-6", key: "1pyr53" }],
  ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
  ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
  ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
  ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
  ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", key: "q3hbxp" }]
], Qi = e("dna", Yi);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ji = [
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M6 16h12", key: "u522kt" }]
], e7 = e("dock", Ji);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t7 = [
  ["path", { d: "M11.25 16.25h1.5L12 17z", key: "w7jh35" }],
  ["path", { d: "M16 14v.5", key: "1lajdz" }],
  [
    "path",
    {
      d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
      key: "u7s9ue"
    }
  ],
  ["path", { d: "M8 14v.5", key: "1nzgdb" }],
  [
    "path",
    {
      d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
      key: "v8hric"
    }
  ]
], a7 = e("dog", t7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h7 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
], o7 = e("dollar-sign", h7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c7 = [
  [
    "path",
    {
      d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",
      key: "19sr3x"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], d7 = e("donut", c7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y7 = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "1bnhmg" }],
  ["path", { d: "M2 20h8", key: "10ntw1" }],
  ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2", key: "pwaxnr" }],
  ["rect", { x: "14", y: "17", width: "8", height: "5", rx: "1", key: "15pjcy" }]
], n7 = e("door-closed-locked", y7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k7 = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }],
  ["path", { d: "M2 20h20", key: "owomy5" }]
], p7 = e("door-closed", k7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i7 = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
], s7 = e("door-open", i7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r7 = [["circle", { cx: "12.1", cy: "12.1", r: "1", key: "18d7e5" }]], l7 = e("dot", r7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M7 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], _7 = e("download", M7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v7 = [
  ["path", { d: "m12.99 6.74 1.93 3.44", key: "iwagvd" }],
  ["path", { d: "M19.136 12a10 10 0 0 1-14.271 0", key: "ppmlo4" }],
  ["path", { d: "m21 21-2.16-3.84", key: "vylbct" }],
  ["path", { d: "m3 21 8.02-14.26", key: "1ssaw4" }],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }]
], m7 = e("drafting-compass", v7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x7 = [
  ["path", { d: "M10 11h.01", key: "d2at3l" }],
  ["path", { d: "M14 6h.01", key: "k028ub" }],
  ["path", { d: "M18 6h.01", key: "1v4wsw" }],
  ["path", { d: "M6.5 13.1h.01", key: "1748ia" }],
  ["path", { d: "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3", key: "172yzv" }],
  ["path", { d: "M17.4 9.9c-.8.8-2 .8-2.8 0", key: "1obv0w" }],
  [
    "path",
    {
      d: "M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",
      key: "rqjl8i"
    }
  ],
  ["path", { d: "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4", key: "1mr6wy" }]
], g7 = e("drama", x7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u7 = [
  [
    "path",
    { d: "M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z", key: "ioqxb1" }
  ],
  [
    "path",
    {
      d: "M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8",
      key: "1rs59n"
    }
  ],
  ["path", { d: "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3", key: "105ega" }],
  ["path", { d: "M18 6h4", key: "66u95g" }],
  ["path", { d: "m5 10-2 8", key: "xt2lic" }],
  ["path", { d: "m7 18 2-8", key: "1bzku2" }]
], f7 = e("drill", u7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94", key: "hpej1" }],
  ["path", { d: "M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32", key: "1tr44o" }],
  ["path", { d: "M8.56 2.75c4.37 6 6 9.42 8 17.72", key: "kbh691" }]
], N7 = e("dribbble", w7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $7 = [
  ["path", { d: "M10 10 7 7", key: "zp14k7" }],
  ["path", { d: "m10 14-3 3", key: "1jrpxk" }],
  ["path", { d: "m14 10 3-3", key: "7tigam" }],
  ["path", { d: "m14 14 3 3", key: "vm23p3" }],
  ["path", { d: "M14.205 4.139a4 4 0 1 1 5.439 5.863", key: "1tm5p2" }],
  ["path", { d: "M19.637 14a4 4 0 1 1-5.432 5.868", key: "16egi2" }],
  ["path", { d: "M4.367 10a4 4 0 1 1 5.438-5.862", key: "1wta6a" }],
  ["path", { d: "M9.795 19.862a4 4 0 1 1-5.429-5.873", key: "q39hpv" }],
  ["rect", { x: "10", y: "8", width: "4", height: "8", rx: "1", key: "phrjt1" }]
], b7 = e("drone", $7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z7 = [
  [
    "path",
    {
      d: "M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586",
      key: "8suz2t"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    { d: "M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208", key: "19dw9m" }
  ]
], q7 = e("droplet-off", z7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j7 = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
], H7 = e("droplet", j7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V7 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
], A7 = e("droplets", V7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C7 = [
  ["path", { d: "m2 2 8 8", key: "1v6059" }],
  ["path", { d: "m22 2-8 8", key: "173r8a" }],
  ["ellipse", { cx: "12", cy: "9", rx: "10", ry: "5", key: "liohsx" }],
  ["path", { d: "M7 13.4v7.9", key: "1yi6u9" }],
  ["path", { d: "M12 14v8", key: "1tn2tj" }],
  ["path", { d: "M17 13.4v7.9", key: "eqz2v3" }],
  ["path", { d: "M2 9v8a10 5 0 0 0 20 0V9", key: "1750ul" }]
], L7 = e("drum", C7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S7 = [
  [
    "path",
    { d: "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23", key: "1dtqwm" }
  ],
  [
    "path",
    {
      d: "m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",
      key: "1oq1fw"
    }
  ]
], P7 = e("drumstick", S7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R7 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
], T7 = e("dumbbell", R7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B7 = [
  ["path", { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0", key: "1dfaln" }],
  ["path", { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4", key: "1qnva7" }]
], D7 = e("ear", B7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z7 = [
  ["path", { d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46", key: "1qngmn" }],
  ["path", { d: "M6 8.5c0-.75.13-1.47.36-2.14", key: "b06bma" }],
  ["path", { d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76", key: "g10hsz" }],
  ["path", { d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18", key: "ygzou7" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], F7 = e("ear-off", Z7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O7 = [
  ["path", { d: "M7 3.34V5a3 3 0 0 0 3 3", key: "w732o8" }],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "f02343" }],
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  ["path", { d: "M12 2a10 10 0 1 0 9.54 13", key: "zjsr6q" }],
  ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2", key: "1of5e8" }],
  ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1", key: "1fmf51" }]
], E7 = e("earth-lock", O7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U7 = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], G7 = e("earth", U7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a7 7 0 1 0 10 10", key: "1yuj32" }]
], W7 = e("eclipse", I7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X7 = [
  ["circle", { cx: "11.5", cy: "12.5", r: "3.5", key: "1cl1mi" }],
  [
    "path",
    {
      d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
      key: "165ef9"
    }
  ]
], K7 = e("egg-fried", X7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y7 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19", key: "13g2jy" }],
  ["path", { d: "M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568", key: "1581id" }]
], Q7 = e("egg-off", Y7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J7 = [
  ["path", { d: "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12", key: "1le142" }]
], es = e("egg", J7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ts = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], as = e("ellipsis-vertical", ts);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], os = e("ellipsis", hs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cs = [
  ["path", { d: "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0", key: "yrdkhy" }],
  ["path", { d: "M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0", key: "gzkvyz" }]
], ds = e("equal-approximately", cs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ys = [
  ["line", { x1: "5", x2: "19", y1: "9", y2: "9", key: "1nwqeh" }],
  ["line", { x1: "5", x2: "19", y1: "15", y2: "15", key: "g8yjpy" }],
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }]
], ns = e("equal-not", ys);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ks = [
  ["line", { x1: "5", x2: "19", y1: "9", y2: "9", key: "1nwqeh" }],
  ["line", { x1: "5", x2: "19", y1: "15", y2: "15", key: "g8yjpy" }]
], ps = e("equal", ks);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = [
  [
    "path",
    {
      d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
      key: "g5wo59"
    }
  ],
  ["path", { d: "m5.082 11.09 8.828 8.828", key: "1wx5vj" }]
], ss = e("eraser", is);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = [
  [
    "path",
    {
      d: "m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z",
      key: "rbahqx"
    }
  ],
  ["path", { d: "M6 8v1", key: "1636ez" }],
  ["path", { d: "M10 8v1", key: "1talb4" }],
  ["path", { d: "M14 8v1", key: "1rsfgr" }],
  ["path", { d: "M18 8v1", key: "gnkwox" }]
], ls = e("ethernet-port", rs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ms = [
  ["path", { d: "M4 10h12", key: "1y6xl8" }],
  ["path", { d: "M4 14h9", key: "1loblj" }],
  [
    "path",
    {
      d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
      key: "1j6lzo"
    }
  ]
], _s = e("euro", Ms);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vs = [
  [
    "path",
    { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5", key: "1wtuz0" }
  ],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" }],
  ["path", { d: "M2 21h13", key: "1x0fut" }],
  ["path", { d: "M3 7h11", key: "19efrr" }],
  ["path", { d: "m9 11-2 3h3l-2 3", key: "lmzxi1" }]
], ms = e("ev-charger", vs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xs = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], gs = e("expand", xs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const us = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], fs = e("external-link", us);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ws = [
  ["path", { d: "m15 18-.722-3.25", key: "1j64jw" }],
  ["path", { d: "M2 8a10.645 10.645 0 0 0 20 0", key: "1e7gxb" }],
  ["path", { d: "m20 15-1.726-2.05", key: "1cnuld" }],
  ["path", { d: "m4 15 1.726-2.05", key: "1dsqqd" }],
  ["path", { d: "m9 18 .722-3.25", key: "ypw2yx" }]
], Ns = e("eye-closed", ws);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $s = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], bs = e("eye-off", $s);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zs = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], qs = e("eye", zs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const js = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], Hs = e("facebook", js);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vs = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }],
  [
    "path",
    {
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      key: "1iv0i2"
    }
  ],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
], As = e("factory", Vs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cs = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
], Ls = e("fan", Cs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ss = [
  [
    "path",
    { d: "M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z", key: "b19h5q" }
  ],
  [
    "path",
    { d: "M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z", key: "h7h5ge" }
  ]
], Ps = e("fast-forward", Ss);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rs = [
  [
    "path",
    {
      d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
      key: "18jl4k"
    }
  ],
  ["path", { d: "M16 8 2 22", key: "vp34q" }],
  ["path", { d: "M17.5 15H9", key: "1oz8nu" }]
], Ts = e("feather", Rs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bs = [
  ["path", { d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "1n2rgs" }],
  ["path", { d: "M6 8h4", key: "utf9t1" }],
  ["path", { d: "M6 18h4", key: "12yh4b" }],
  ["path", { d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "3ha7mj" }],
  ["path", { d: "M14 8h4", key: "1r8wg2" }],
  ["path", { d: "M14 18h4", key: "1t3kbu" }],
  ["path", { d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "dfd4e2" }]
], Ds = e("fence", Bs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zs = [
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m6.8 15-3.5 2", key: "hjy98k" }],
  ["path", { d: "m20.7 7-3.5 2", key: "f08gto" }],
  ["path", { d: "M6.8 9 3.3 7", key: "1aevh4" }],
  ["path", { d: "m20.7 17-3.5-2", key: "1liqo3" }],
  ["path", { d: "m9 22 3-8 3 8", key: "wees03" }],
  ["path", { d: "M8 22h8", key: "rmew8v" }],
  ["path", { d: "M18 18.7a9 9 0 1 0-12 0", key: "dhzg4g" }]
], Fs = e("ferris-wheel", Zs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Os = [
  ["path", { d: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z", key: "1340ok" }],
  ["path", { d: "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z", key: "1hz3m3" }],
  ["path", { d: "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z", key: "1oz8n2" }],
  ["path", { d: "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z", key: "1ff65i" }],
  ["path", { d: "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z", key: "pdip6e" }]
], Es = e("figma", Os);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Us = [
  [
    "path",
    {
      d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
      key: "4pqfef"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 12v-1", key: "1ej8lb" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["path", { d: "M8 7V6", key: "1nbb54" }],
  ["circle", { cx: "8", cy: "20", r: "2", key: "ckkr5m" }]
], Gs = e("file-archive", Us);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Is = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m8 18 4-4", key: "12zab0" }],
  ["path", { d: "M8 10v8h8", key: "tlaukw" }]
], Ws = e("file-axis-3d", Is);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xs = [
  [
    "path",
    {
      d: "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3",
      key: "cvl1xm"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88",
      key: "1ff7gj"
    }
  ],
  ["circle", { cx: "6", cy: "14", r: "3", key: "a1xfv6" }]
], Ks = e("file-badge", Xs);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ys = [
  [
    "path",
    {
      d: "M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8",
      key: "1kchwa"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M11.7 14.2 7 17l-4.7-2.8", key: "1yk8tc" }],
  [
    "path",
    {
      d: "M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z",
      key: "19flxy"
    }
  ],
  ["path", { d: "M7 17v5", key: "1yj1jh" }]
], Qs = e("file-box", Ys);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Js = [
  [
    "path",
    {
      d: "M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
      key: "14cnrg"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    { d: "M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1", key: "sr0ebq" }
  ],
  [
    "path",
    { d: "M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1", key: "w793db" }
  ]
], er = e("file-braces-corner", Js);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1", key: "1oajmo" }
  ],
  [
    "path",
    { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1", key: "mpwhp6" }
  ]
], ar = e("file-braces", tr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 18v-1", key: "zg0ygc" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "M16 18v-3", key: "j5jt4h" }]
], or = e("file-chart-column", hr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["path", { d: "M12 18v-4", key: "q1q25u" }],
  ["path", { d: "M16 18v-6", key: "15y0np" }]
], dr = e("file-chart-column-increasing", cr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m16 13-3.5 3.5-2-2L8 17", key: "zz7yod" }]
], nr = e("file-chart-line", yr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kr = [
  [
    "path",
    {
      d: "M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512",
      key: "13hoie"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M4.017 11.512a6 6 0 1 0 8.466 8.475", key: "s6vs5t" }],
  [
    "path",
    {
      d: "M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",
      key: "1dl6s6"
    }
  ]
], pr = e("file-chart-pie", kr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ir = [
  [
    "path",
    {
      d: "M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6",
      key: "g5mvt7"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m14 20 2 2 4-4", key: "15kota" }]
], sr = e("file-check-corner", ir);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
], lr = e("file-check", rr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mr = [
  [
    "path",
    {
      d: "M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",
      key: "ryk6xj"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 14v2.2l1.6 1", key: "6m4bie" }],
  ["circle", { cx: "8", cy: "16", r: "6", key: "10v15b" }]
], _r = e("file-clock", Mr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = [
  [
    "path",
    {
      d: "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",
      key: "1wthlu"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m5 16-3 3 3 3", key: "331omg" }],
  ["path", { d: "m9 22 3-3-3-3", key: "lsp7cz" }]
], mr = e("file-code-corner", vr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
], gr = e("file-code", xr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ur = [
  [
    "path",
    {
      d: "M13.85 22H18a2 2 0 0 0 2-2V8a2 2 0 0 0-.586-1.414l-4-4A2 2 0 0 0 14 2H6a2 2 0 0 0-2 2v6.6",
      key: "1l4p50"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m3.305 19.53.923-.382", key: "ao1pio" }],
  ["path", { d: "m4.228 16.852-.924-.383", key: "1fv9zy" }],
  ["path", { d: "m5.852 15.228-.383-.923", key: "1a9hc2" }],
  ["path", { d: "m5.852 20.772-.383.924", key: "1sh9ke" }],
  ["path", { d: "m8.148 15.228.383-.923", key: "4yu6lf" }],
  ["path", { d: "m8.53 21.696-.382-.924", key: "18b0s9" }],
  ["path", { d: "m9.773 16.852.922-.383", key: "ti6xop" }],
  ["path", { d: "m9.773 19.148.922.383", key: "rws47d" }],
  ["circle", { cx: "7", cy: "18", r: "3", key: "lvkj7j" }]
], fr = e("file-cog", ur);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wr = [
  [
    "path",
    {
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
      key: "jrl274"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 16h2v6", key: "1bxocy" }],
  ["path", { d: "M10 22h4", key: "ceow96" }],
  ["rect", { x: "2", y: "16", width: "4", height: "6", rx: "2", key: "r45zd0" }]
], Nr = e("file-digit", wr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
], br = e("file-down", $r);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }],
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }]
], qr = e("file-diff", zr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Hr = e("file-exclamation-point", jr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = [
  [
    "path",
    {
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
      key: "1vfytu"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
      key: "1etmh7"
    }
  ]
], Ar = e("file-headphone", Vr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = [
  [
    "path",
    {
      d: "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7",
      key: "oagw2b"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z",
      key: "rg3psg"
    }
  ]
], Lr = e("file-heart", Cr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sr = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
], Pr = e("file-image", Sr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rr = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1",
      key: "1q9hii"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M2 15h10", key: "jfw4w8" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
], Tr = e("file-input", Rr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Br = [
  [
    "path",
    {
      d: "M10.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.1",
      key: "1a2hbp"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m10 15 1 1", key: "1h4vmv" }],
  ["path", { d: "m11 14-4.586 4.586", key: "maylof" }],
  ["circle", { cx: "5", cy: "20", r: "2", key: "860zyv" }]
], Dr = e("file-key", Br);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zr = [
  [
    "path",
    {
      d: "M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3",
      key: "1432pc"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 17v-2a2 2 0 0 0-4 0v2", key: "168m41" }],
  ["rect", { width: "8", height: "5", x: "3", y: "17", rx: "1", key: "o8vfew" }]
], Fr = e("file-lock", Zr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Or = [
  [
    "path",
    {
      d: "M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12",
      key: "l9p8hp"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
], Er = e("file-minus-corner", Or);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ur = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }]
], Gr = e("file-minus", Ur);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = [
  [
    "path",
    {
      d: "M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35",
      key: "5ad7z2"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 20v-7l3 1.474", key: "1ggyb9" }],
  ["circle", { cx: "6", cy: "20", r: "2", key: "j7wjp0" }]
], Wr = e("file-music", Ir);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xr = [
  [
    "path",
    {
      d: "M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127",
      key: "wfxp4w"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m5 11-3 3", key: "1dgrs4" }],
  ["path", { d: "m5 17-3-3h10", key: "1mvvaf" }]
], Kr = e("file-output", Xr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yr = [
  [
    "path",
    {
      d: "m18.226 5.226-2.52-2.52A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.351",
      key: "1k2beg"
    }
  ],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
], Qr = e("file-pen-line", Yr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jr = [
  [
    "path",
    {
      d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34",
      key: "o6klzx"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
      key: "zhnas1"
    }
  ]
], e9 = e("file-pen", Jr);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      key: "1tzo1f"
    }
  ]
], a9 = e("file-play", t9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h9 = [
  [
    "path",
    {
      d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
      key: "17jvcc"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M14 19h6", key: "bvotb8" }],
  ["path", { d: "M17 16v6", key: "18yu1i" }]
], o9 = e("file-plus-corner", h9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
], d9 = e("file-plus", c9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }]
], n9 = e("file-question-mark", y9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k9 = [
  [
    "path",
    {
      d: "M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35",
      key: "1cdjst"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M16 14a2 2 0 0 0-2 2", key: "ceaadl" }],
  ["path", { d: "M16 22a2 2 0 0 1-2-2", key: "1wqh5n" }],
  ["path", { d: "M20 14a2 2 0 0 1 2 2", key: "1ny6zw" }],
  ["path", { d: "M20 22a2 2 0 0 0 2-2", key: "1l9q4k" }]
], p9 = e("file-scan", k9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i9 = [
  [
    "path",
    {
      d: "M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25",
      key: "uh4ikj"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m21 22-2.88-2.88", key: "9dd25w" }],
  ["circle", { cx: "16", cy: "17", r: "3", key: "11br10" }]
], s9 = e("file-search-corner", i9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "11.5", cy: "14.5", r: "2.5", key: "1bq0ko" }],
  ["path", { d: "M13.3 16.3 15 18", key: "2quom7" }]
], l9 = e("file-search", r9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M11.5 13.5a2.5 2.5 0 0 1 0 3", key: "1fccat" }],
  ["path", { d: "M15 12a5 5 0 0 1 0 6", key: "ps46cm" }]
], _9 = e("file-signal", M9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M10 11v2", key: "1s651w" }],
  ["path", { d: "M8 17h8", key: "wh5c61" }],
  ["path", { d: "M14 16v2", key: "12fp5e" }]
], m9 = e("file-sliders", v9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
], g9 = e("file-spreadsheet", x9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u9 = [
  ["path", { d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1", key: "likhh7" }],
  ["path", { d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1", key: "17ky3x" }],
  [
    "path",
    {
      d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
      key: "1hyeo0"
    }
  ]
], f9 = e("file-stack", u9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w9 = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
      key: "huwfnr"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m10 18 3-3-3-3", key: "18f6ys" }]
], N9 = e("file-symlink", w9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m8 16 2-2-2-2", key: "10vzyd" }],
  ["path", { d: "M12 18h4", key: "1wd2n7" }]
], b9 = e("file-terminal", $9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], q9 = e("file-text", z9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j9 = [
  [
    "path",
    {
      d: "M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
      key: "15usau"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16", key: "s1gz5" }],
  ["path", { d: "M6 22h2", key: "194x9m" }],
  ["path", { d: "M7 14v8", key: "11ixej" }]
], H9 = e("file-type-corner", j9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M11 18h2", key: "12mj7e" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5", key: "qbrxap" }]
], A9 = e("file-type", V9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
], L9 = e("file-up", C9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M16 22a4 4 0 0 0-8 0", key: "7a83pg" }],
  ["circle", { cx: "12", cy: "15", r: "3", key: "g36mzq" }]
], P9 = e("file-user", S9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R9 = [
  [
    "path",
    {
      d: "M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95",
      key: "44gpjv"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 15a5 5 0 0 1 0 6", key: "oxg87a" }],
  [
    "path",
    {
      d: "M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z",
      key: "8rtoi1"
    }
  ]
], T9 = e("file-volume", R9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B9 = [
  [
    "path",
    {
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
      key: "jrl274"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157",
      key: "17aeo9"
    }
  ],
  ["rect", { width: "7", height: "6", x: "3", y: "16", rx: "1", key: "s27ndx" }]
], D9 = e("file-video-camera", B9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z9 = [
  [
    "path",
    {
      d: "M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
      key: "1jo35a"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m15 17 5 5", key: "36xl1x" }],
  ["path", { d: "m20 17-5 5", key: "vdz27y" }]
], F9 = e("file-x-corner", Z9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m14.5 12.5-5 5", key: "b62r18" }],
  ["path", { d: "m9.5 12.5 5 5", key: "1rk7el" }]
], E9 = e("file-x", O9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U9 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
], G9 = e("file", U9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I9 = [
  ["path", { d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", key: "14sh0y" }],
  [
    "path",
    {
      d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
      key: "1970lx"
    }
  ],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1", key: "l4dndm" }]
], W9 = e("files", I9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X9 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
], K9 = e("film", X9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y9 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
], Q9 = e("fingerprint-pattern", Y9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J9 = [
  ["path", { d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5", key: "sqyvz" }],
  ["path", { d: "M9 18h8", key: "i7pszb" }],
  ["path", { d: "M18 3h-3", key: "7idoqj" }],
  ["path", { d: "M11 3a6 6 0 0 0-6 6v11", key: "1v5je3" }],
  ["path", { d: "M5 13h4", key: "svpcxo" }],
  ["path", { d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z", key: "vsjego" }]
], el = e("fire-extinguisher", J9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tl = [
  [
    "path",
    {
      d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058",
      key: "1j1hse"
    }
  ],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618",
      key: "1q46z8"
    }
  ],
  [
    "path",
    {
      d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",
      key: "1407gh"
    }
  ]
], al = e("fish-off", tl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hl = [
  ["path", { d: "M2 16s9-15 20-4C11 23 2 8 2 8", key: "h4oh4o" }]
], ol = e("fish-symbol", hl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cl = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
      key: "15baut"
    }
  ],
  ["path", { d: "M18 12v.5", key: "18hhni" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
      key: "l9di03"
    }
  ],
  [
    "path",
    { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4", key: "1kjonw" }
  ],
  [
    "path",
    { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98", key: "1zlm23" }
  ]
], dl = e("fish", cl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yl = [
  [
    "path",
    {
      d: "m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10",
      key: "157y8s"
    }
  ],
  ["path", { d: "M20.414 8.586 22 7", key: "5g2s34" }],
  ["circle", { cx: "19", cy: "10", r: "2", key: "7363ft" }]
], nl = e("fishing-hook", yl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kl = [
  ["path", { d: "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528", key: "1q158e" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M4 22V4", key: "1plyxx" }],
  ["path", { d: "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347", key: "xj1b71" }]
], pl = e("flag-off", kl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const il = [
  [
    "path",
    { d: "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5", key: "rbbtmw" }
  ]
], sl = e("flag-triangle-left", il);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rl = [
  [
    "path",
    { d: "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5", key: "kfjsu0" }
  ]
], ll = e("flag-triangle-right", rl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ml = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
], _l = e("flag", Ml);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vl = [
  [
    "path",
    {
      d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
      key: "1ir223"
    }
  ],
  ["path", { d: "m5 22 14-4", key: "1brv4h" }],
  ["path", { d: "m5 18 14 4", key: "lgyyje" }]
], ml = e("flame-kindling", vl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xl = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], gl = e("flame", xl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ul = [
  ["path", { d: "M11.652 6H18", key: "voqkpr" }],
  ["path", { d: "M12 13v1", key: "176q98" }],
  [
    "path",
    {
      d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6",
      key: "dzyf92"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    { d: "M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007", key: "1hvcfn" }
  ]
], fl = e("flashlight-off", ul);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wl = [
  ["path", { d: "M12 13v1", key: "176q98" }],
  [
    "path",
    {
      d: "M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z",
      key: "17vh7j"
    }
  ],
  ["path", { d: "M6 6h12", key: "n6hhss" }]
], Nl = e("flashlight", wl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $l = [
  ["path", { d: "M10 2v2.343", key: "15t272" }],
  ["path", { d: "M14 2v6.343", key: "sxr80q" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563", key: "k0duyd" }],
  ["path", { d: "M6.453 15H15", key: "1f0z33" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], bl = e("flask-conical-off", $l);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], ql = e("flask-conical", zl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = [
  ["path", { d: "M10 2v6.292a7 7 0 1 0 4 0V2", key: "1s42pc" }],
  ["path", { d: "M5 15h14", key: "m0yey3" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], Hl = e("flask-round", jl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = [
  ["path", { d: "m3 7 5 5-5 5V7", key: "couhi7" }],
  ["path", { d: "m21 7-5 5 5 5V7", key: "6ouia7" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
], Al = e("flip-horizontal-2", Vl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cl = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3", key: "1i73f7" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3", key: "saxlbk" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
], Ll = e("flip-horizontal", Cl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sl = [
  ["path", { d: "m17 3-5 5-5-5h10", key: "1ftt6x" }],
  ["path", { d: "m17 21-5-5-5 5h10", key: "1m0wmu" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }]
], Pl = e("flip-vertical-2", Sl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = [
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3", key: "14bfxa" }],
  ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3", key: "14rx03" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }]
], Tl = e("flip-vertical", Rl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
      key: "3pnvol"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
], Dl = e("flower-2", Bl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zl = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  [
    "path",
    {
      d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5",
      key: "14wa3c"
    }
  ],
  ["path", { d: "M12 7.5V9", key: "1oy5b0" }],
  ["path", { d: "M7.5 12H9", key: "eltsq1" }],
  ["path", { d: "M16.5 12H15", key: "vk5kw4" }],
  ["path", { d: "M12 16.5V15", key: "k7eayi" }],
  ["path", { d: "m8 8 1.88 1.88", key: "nxy4qf" }],
  ["path", { d: "M14.12 9.88 16 8", key: "1lst6k" }],
  ["path", { d: "m8 16 1.88-1.88", key: "h2eex1" }],
  ["path", { d: "M14.12 14.12 16 16", key: "uqkrx3" }]
], Fl = e("flower", Zl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ol = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
], El = e("focus", Ol);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = [
  ["path", { d: "M12 22v-6", key: "6o8u61" }],
  ["path", { d: "M12 8V2", key: "1wkif3" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }],
  ["path", { d: "m15 19-3-3-3 3", key: "e37ymu" }],
  ["path", { d: "m15 5-3 3-3-3", key: "19d6lf" }]
], Gl = e("fold-vertical", Ul);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = [
  ["path", { d: "M2 12h6", key: "1wqiqv" }],
  ["path", { d: "M22 12h-6", key: "1eg9hc" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m19 9-3 3 3 3", key: "12ol22" }],
  ["path", { d: "m5 15 3-3-3-3", key: "1kdhjc" }]
], Wl = e("fold-horizontal", Il);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xl = [
  ["circle", { cx: "15", cy: "19", r: "2", key: "u2pros" }],
  [
    "path",
    {
      d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",
      key: "1jj40k"
    }
  ],
  ["path", { d: "M15 11v-1", key: "cntcp" }],
  ["path", { d: "M15 17v-2", key: "1279jj" }]
], Kl = e("folder-archive", Xl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yl = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
], Ql = e("folder-check", Yl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jl = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  [
    "path",
    {
      d: "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",
      key: "1urifu"
    }
  ],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
], eM = e("folder-clock", Jl);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M2 10h20", key: "1ir3d8" }]
], aM = e("folder-closed", tM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = [
  ["path", { d: "M10 10.5 8 13l2 2.5", key: "m4t9c1" }],
  ["path", { d: "m14 10.5 2 2.5-2 2.5", key: "14w2eb" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
      key: "1u1bxd"
    }
  ]
], oM = e("folder-code", hM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cM = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "1", key: "49l61u" }]
], dM = e("folder-dot", cM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yM = [
  [
    "path",
    {
      d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3",
      key: "128dxu"
    }
  ],
  ["path", { d: "m14.305 19.53.923-.382", key: "3m78fa" }],
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m16.852 15.228-.383-.923", key: "5xggr7" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], nM = e("folder-cog", yM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kM = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "m15 13-3 3-3-3", key: "6j2sf0" }]
], pM = e("folder-down", kM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  ["path", { d: "M18 19a5 5 0 0 1-5-5v8", key: "sz5oeg" }],
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
      key: "1w6njk"
    }
  ],
  ["circle", { cx: "13", cy: "12", r: "2", key: "1j92g6" }],
  ["circle", { cx: "20", cy: "19", r: "2", key: "1obnsp" }]
], sM = e("folder-git-2", iM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rM = [
  ["circle", { cx: "12", cy: "13", r: "2", key: "1c1ljs" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M14 13h3", key: "1dgedf" }],
  ["path", { d: "M7 13h3", key: "1pygq7" }]
], lM = e("folder-git", rM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MM = [
  [
    "path",
    {
      d: "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417",
      key: "10r6g4"
    }
  ],
  [
    "path",
    {
      d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "15cy7q"
    }
  ]
], _M = e("folder-heart", MM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vM = [
  [
    "path",
    {
      d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
      key: "fm4g5t"
    }
  ],
  ["path", { d: "M2 13h10", key: "pgb2dq" }],
  ["path", { d: "m9 16 3-3-3-3", key: "6m91ic" }]
], mM = e("folder-input", vM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xM = [
  ["circle", { cx: "16", cy: "20", r: "2", key: "1vifvg" }],
  [
    "path",
    {
      d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2",
      key: "3hgo9p"
    }
  ],
  ["path", { d: "m22 14-4.5 4.5", key: "1ef6z8" }],
  ["path", { d: "m21 15 1 1", key: "1ejcpy" }]
], gM = e("folder-key", xM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
], fM = e("folder-kanban", uM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wM = [
  ["rect", { width: "8", height: "5", x: "14", y: "17", rx: "1", key: "19aais" }],
  [
    "path",
    {
      d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
      key: "1w6v7t"
    }
  ],
  ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2", key: "pwaxnr" }]
], NM = e("folder-lock", wM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $M = [
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], bM = e("folder-minus", $M);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zM = [
  [
    "path",
    {
      d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2",
      key: "1nmvlm"
    }
  ],
  ["circle", { cx: "14", cy: "15", r: "1", key: "1gm4qj" }]
], qM = e("folder-open-dot", zM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jM = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
], HM = e("folder-open", jM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VM = [
  [
    "path",
    {
      d: "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",
      key: "1yk7aj"
    }
  ],
  ["path", { d: "M2 13h10", key: "pgb2dq" }],
  ["path", { d: "m5 10-3 3 3 3", key: "1r8ie0" }]
], AM = e("folder-output", VM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CM = [
  [
    "path",
    {
      d: "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",
      key: "a8xqs0"
    }
  ],
  [
    "path",
    {
      d: "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1saktj"
    }
  ]
], LM = e("folder-pen", CM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SM = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], PM = e("folder-plus", SM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RM = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "2", key: "1c1ljs" }],
  ["path", { d: "M12 15v5", key: "11xva1" }]
], TM = e("folder-root", RM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BM = [
  ["circle", { cx: "11.5", cy: "12.5", r: "2.5", key: "1ea5ju" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M13.3 14.3 15 16", key: "1y4v1n" }]
], DM = e("folder-search-2", BM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZM = [
  [
    "path",
    {
      d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
      key: "1bw5m7"
    }
  ],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }]
], FM = e("folder-search", ZM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OM = [
  [
    "path",
    {
      d: "M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
      key: "y8kt7d"
    }
  ],
  ["path", { d: "m8 16 3-3-3-3", key: "rlqrt1" }]
], EM = e("folder-symlink", OM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UM = [
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
      key: "1dkoa9"
    }
  ],
  ["path", { d: "M12 10v4h4", key: "1czhmt" }],
  ["path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5", key: "lvuxfi" }],
  ["path", { d: "M22 22v-4h-4", key: "1ewp4q" }],
  ["path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5", key: "14ync0" }]
], GM = e("folder-sync", UM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IM = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
], WM = e("folder-tree", IM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XM = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "m9 13 3-3 3 3", key: "1pxg3c" }]
], KM = e("folder-up", XM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YM = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], QM = e("folder", YM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JM = [
  [
    "path",
    {
      d: "M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z",
      key: "a4852j"
    }
  ],
  [
    "path",
    { d: "M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1", key: "yxbcw3" }
  ]
], e_ = e("folders", JM);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t_ = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "m9.5 10.5 5 5", key: "ra9qjz" }],
  ["path", { d: "m14.5 10.5-5 5", key: "l2rkpq" }]
], a_ = e("folder-x", t_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h_ = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
], o_ = e("footprints", h_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c_ = [
  ["path", { d: "M12 12H5a2 2 0 0 0-2 2v5", key: "7zsz91" }],
  ["circle", { cx: "13", cy: "19", r: "2", key: "wjnkru" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5", key: "13bk1p" }]
], d_ = e("forklift", c_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y_ = [
  ["path", { d: "M4 14h6", key: "77gv2w" }],
  ["path", { d: "M4 2h10", key: "a2b314" }],
  ["rect", { x: "4", y: "18", width: "16", height: "4", rx: "1", key: "sybzq6" }],
  ["rect", { x: "4", y: "6", width: "16", height: "4", rx: "1", key: "1osc9e" }]
], n_ = e("form", y_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k_ = [
  ["path", { d: "m15 17 5-5-5-5", key: "nf172w" }],
  ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12", key: "jmiej9" }]
], p_ = e("forward", k_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i_ = [
  ["line", { x1: "22", x2: "2", y1: "6", y2: "6", key: "15w7dq" }],
  ["line", { x1: "22", x2: "2", y1: "18", y2: "18", key: "1ip48p" }],
  ["line", { x1: "6", x2: "6", y1: "2", y2: "22", key: "a2lnyx" }],
  ["line", { x1: "18", x2: "18", y1: "2", y2: "22", key: "8vb6jd" }]
], s_ = e("frame", i_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r_ = [
  ["path", { d: "M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7", key: "1a2nng" }]
], l_ = e("framer", r_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2", key: "epbg0q" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
], __ = e("frown", M_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v_ = [
  [
    "path",
    { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5", key: "1wtuz0" }
  ],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" }],
  ["path", { d: "M2 21h13", key: "1x0fut" }],
  ["path", { d: "M3 9h11", key: "1p7c0w" }]
], m_ = e("fuel", v_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x_ = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["rect", { width: "10", height: "8", x: "7", y: "8", rx: "1", key: "vys8me" }]
], g_ = e("fullscreen", x_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u_ = [
  [
    "path",
    {
      d: "M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348",
      key: "8mvsmf"
    }
  ],
  ["path", { d: "M16 6h6", key: "1dogtp" }],
  ["path", { d: "M19 3v6", key: "1ytpjt" }]
], f_ = e("funnel-plus", u_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w_ = [
  [
    "path",
    {
      d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
      key: "ol2ft2"
    }
  ],
  ["path", { d: "m16.5 3.5 5 5", key: "15e6fa" }],
  ["path", { d: "m21.5 3.5-5 5", key: "m0lwru" }]
], N_ = e("funnel-x", w_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $_ = [
  ["path", { d: "M2 7v10", key: "a2pl2d" }],
  ["path", { d: "M6 5v14", key: "1kq3d7" }],
  ["rect", { width: "12", height: "18", x: "10", y: "3", rx: "2", key: "13i7bc" }]
], b_ = e("gallery-horizontal-end", $_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z_ = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], q_ = e("funnel", z_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j_ = [
  ["path", { d: "M2 3v18", key: "pzttux" }],
  ["rect", { width: "12", height: "18", x: "6", y: "3", rx: "2", key: "btr8bg" }],
  ["path", { d: "M22 3v18", key: "6jf3v" }]
], H_ = e("gallery-horizontal", j_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V_ = [
  ["rect", { width: "18", height: "14", x: "3", y: "3", rx: "2", key: "74y24f" }],
  ["path", { d: "M4 21h1", key: "16zlid" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M19 21h1", key: "edywat" }]
], A_ = e("gallery-thumbnails", V_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = [
  ["path", { d: "M7 2h10", key: "nczekb" }],
  ["path", { d: "M5 6h14", key: "u2x4p" }],
  ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2", key: "l0tzu3" }]
], L_ = e("gallery-vertical-end", C_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S_ = [
  ["path", { d: "M3 2h18", key: "15qxfx" }],
  ["rect", { width: "18", height: "12", x: "3", y: "6", rx: "2", key: "1439r6" }],
  ["path", { d: "M3 22h18", key: "8prr45" }]
], P_ = e("gallery-vertical", S_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R_ = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      key: "mfqc10"
    }
  ]
], T_ = e("gamepad-2", R_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B_ = [
  [
    "path",
    {
      d: "M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z",
      key: "1re2og"
    }
  ],
  [
    "path",
    {
      d: "M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z",
      key: "1pchrj"
    }
  ],
  [
    "path",
    {
      d: "M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z",
      key: "16mt4c"
    }
  ],
  [
    "path",
    {
      d: "M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z",
      key: "19ox6c"
    }
  ]
], D_ = e("gamepad-directional", B_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z_ = [
  ["line", { x1: "6", x2: "10", y1: "12", y2: "12", key: "161bw2" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13", key: "dqpgro" }],
  ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11", key: "meh2c" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
], F_ = e("gamepad", Z_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O_ = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], E_ = e("gauge", O_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U_ = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      key: "7w4byz"
    }
  ],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
], G_ = e("gem", U_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381", key: "pgg06f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m21.5 10.5-8-8", key: "a17d9x" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m8.5 7.5 8 8", key: "1oyaui" }]
], W_ = e("gavel", I_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X_ = [
  ["path", { d: "M9 10h.01", key: "qbtxuw" }],
  ["path", { d: "M15 10h.01", key: "1qmjsl" }],
  [
    "path",
    {
      d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
      key: "uwwb07"
    }
  ]
], K_ = e("ghost", X_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y_ = [
  ["path", { d: "M11.5 21a7.5 7.5 0 1 1 7.35-9", key: "1gyj8k" }],
  ["path", { d: "M13 12V3", key: "18om2a" }],
  ["path", { d: "M4 21h16", key: "1h09gz" }],
  ["path", { d: "M9 12V3", key: "geutu0" }]
], Q_ = e("georgian-lari", Y_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J_ = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
], ev = e("gift", J_);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tv = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3", key: "1cii5b" }],
  ["path", { d: "M21 18h-6", key: "139f0c" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }]
], av = e("git-branch-minus", tv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hv = [
  ["path", { d: "M6 3v12", key: "qpgusn" }],
  ["path", { d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", key: "1d02ji" }],
  ["path", { d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", key: "chk6ph" }],
  ["path", { d: "M15 6a9 9 0 0 0-9 9", key: "or332x" }],
  ["path", { d: "M18 15v6", key: "9wciyi" }],
  ["path", { d: "M21 18h-6", key: "139f0c" }]
], ov = e("git-branch-plus", hv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cv = [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
], dv = e("git-branch", cv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yv = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["line", { x1: "3", x2: "9", y1: "12", y2: "12", key: "1dyftd" }],
  ["line", { x1: "15", x2: "21", y1: "12", y2: "12", key: "oup4p8" }]
], nv = e("git-commit-horizontal", yv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kv = [
  ["path", { d: "M12 3v6", key: "1holv5" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M12 15v6", key: "a9ows0" }]
], pv = e("git-commit-vertical", kv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iv = [
  ["circle", { cx: "5", cy: "6", r: "3", key: "1qnov2" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7", key: "1yj91y" }],
  ["path", { d: "m15 9-3-3 3-3", key: "1lwv8l" }],
  ["circle", { cx: "19", cy: "18", r: "3", key: "1qljk2" }],
  ["path", { d: "M12 18H7a2 2 0 0 1-2-2V9", key: "16sdep" }],
  ["path", { d: "m9 15 3 3-3 3", key: "1m3kbl" }]
], sv = e("git-compare-arrows", iv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rv = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
], lv = e("git-compare", rv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mv = [
  ["circle", { cx: "12", cy: "18", r: "3", key: "1mpf1b" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9", key: "1uq4wg" }],
  ["path", { d: "M12 12v3", key: "158kv8" }]
], _v = e("git-fork", Mv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vv = [
  ["circle", { cx: "5", cy: "6", r: "3", key: "1qnov2" }],
  ["path", { d: "M5 9v6", key: "158jrl" }],
  ["circle", { cx: "5", cy: "18", r: "3", key: "104gr9" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["circle", { cx: "19", cy: "6", r: "3", key: "108a5v" }],
  ["path", { d: "M16 15.7A9 9 0 0 0 19 9", key: "1e3vqb" }]
], mv = e("git-graph", vv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xv = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9", key: "7kw0sc" }]
], gv = e("git-merge", xv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uv = [
  ["circle", { cx: "5", cy: "6", r: "3", key: "1qnov2" }],
  ["path", { d: "M5 9v12", key: "ih889a" }],
  ["circle", { cx: "19", cy: "18", r: "3", key: "1qljk2" }],
  ["path", { d: "m15 9-3-3 3-3", key: "1lwv8l" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7", key: "1yj91y" }]
], fv = e("git-pull-request-arrow", uv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wv = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 9v12", key: "1sc30k" }],
  ["path", { d: "m21 3-6 6", key: "16nqsk" }],
  ["path", { d: "m21 9-6-6", key: "9j17rh" }],
  ["path", { d: "M18 11.5V15", key: "65xf6f" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], Nv = e("git-pull-request-closed", wv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $v = [
  ["circle", { cx: "5", cy: "6", r: "3", key: "1qnov2" }],
  ["path", { d: "M5 9v12", key: "ih889a" }],
  ["path", { d: "m15 9-3-3 3-3", key: "1lwv8l" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v3", key: "1rbwk6" }],
  ["path", { d: "M19 15v6", key: "10aioa" }],
  ["path", { d: "M22 18h-6", key: "1d5gi5" }]
], bv = e("git-pull-request-create-arrow", $v);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zv = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 9v12", key: "1sc30k" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v3", key: "1jb6z3" }],
  ["path", { d: "M18 15v6", key: "9wciyi" }],
  ["path", { d: "M21 18h-6", key: "139f0c" }]
], qv = e("git-pull-request-create", zv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jv = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M18 6V5", key: "1oao2s" }],
  ["path", { d: "M18 11v-1", key: "11c8tz" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21", key: "rroup" }]
], Hv = e("git-pull-request-draft", jv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vv = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21", key: "rroup" }]
], Av = e("git-pull-request", Vv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cv = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
], Lv = e("github", Cv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sv = [
  [
    "path",
    {
      d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z",
      key: "148pdi"
    }
  ]
], Pv = e("gitlab", Sv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rv = [
  [
    "path",
    {
      d: "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",
      key: "p55z4y"
    }
  ],
  ["path", { d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0", key: "mjntcy" }]
], Tv = e("glass-water", Rv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bv = [
  ["circle", { cx: "6", cy: "15", r: "4", key: "vux9w4" }],
  ["circle", { cx: "18", cy: "15", r: "4", key: "18o8ve" }],
  ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2", key: "1ag4bs" }],
  ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2", key: "1hm1gs" }],
  ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2", key: "1r31ai" }]
], Dv = e("glasses", Bv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zv = [
  [
    "path",
    {
      d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
      key: "qkt0x6"
    }
  ],
  ["path", { d: "M2 12h8.5", key: "ovaggd" }],
  ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2", key: "1of5e8" }],
  ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1", key: "1fmf51" }]
], Fv = e("globe-lock", Zv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ov = [
  ["path", { d: "m16 3 5 5", key: "1husv6" }],
  [
    "path",
    { d: "M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10", key: "46evmv" }
  ],
  ["path", { d: "m21 3-5 5", key: "1g5oa7" }]
], Ev = e("globe-x", Ov);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uv = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], Gv = e("globe", Uv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iv = [
  ["path", { d: "M2 21V3", key: "1bzk4w" }],
  ["path", { d: "M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26", key: "1d64pi" }],
  ["path", { d: "M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3", key: "5hbqbf" }],
  ["circle", { cx: "16", cy: "11", r: "2", key: "qt15rb" }],
  ["circle", { cx: "8", cy: "11", r: "2", key: "ssideg" }]
], Wv = e("gpu", Iv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xv = [
  ["path", { d: "M12 13V2l8 4-8 4", key: "5wlwwj" }],
  ["path", { d: "M20.561 10.222a9 9 0 1 1-12.55-5.29", key: "1c0wjv" }],
  ["path", { d: "M8.002 9.997a5 5 0 1 0 8.9 2.02", key: "gb1g7m" }]
], Kv = e("goal", Xv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yv = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
], Qv = e("graduation-cap", Yv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jv = [
  ["path", { d: "M22 5V2l-5.89 5.89", key: "1eenpo" }],
  ["circle", { cx: "16.6", cy: "15.89", r: "3", key: "xjtalx" }],
  ["circle", { cx: "8.11", cy: "7.4", r: "3", key: "u2fv6i" }],
  ["circle", { cx: "12.35", cy: "11.65", r: "3", key: "i6i8g7" }],
  ["circle", { cx: "13.91", cy: "5.85", r: "3", key: "6ye0dv" }],
  ["circle", { cx: "18.15", cy: "10.09", r: "3", key: "snx9no" }],
  ["circle", { cx: "6.56", cy: "13.2", r: "3", key: "17x4xg" }],
  ["circle", { cx: "10.8", cy: "17.44", r: "3", key: "1hogw9" }],
  ["circle", { cx: "5", cy: "19", r: "3", key: "1sn6vo" }]
], em = e("grape", Jv);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tm = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
      key: "11za1p"
    }
  ],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
], am = e("grid-2x2-check", tm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hm = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
      key: "11za1p"
    }
  ],
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M19 22v-6", key: "qhmiwi" }]
], om = e("grid-2x2-plus", hm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cm = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
      key: "11za1p"
    }
  ],
  ["path", { d: "m16 16 5 5", key: "8tpb07" }],
  ["path", { d: "m16 21 5-5", key: "193jll" }]
], dm = e("grid-2x2-x", cm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ym = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], nm = e("grid-2x2", ym);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const km = [
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], pm = e("grid-3x2", km);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const im = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], sm = e("grid-3x3", im);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rm = [
  ["circle", { cx: "12", cy: "9", r: "1", key: "124mty" }],
  ["circle", { cx: "19", cy: "9", r: "1", key: "1ruzo2" }],
  ["circle", { cx: "5", cy: "9", r: "1", key: "1a8b28" }],
  ["circle", { cx: "12", cy: "15", r: "1", key: "1e56xg" }],
  ["circle", { cx: "19", cy: "15", r: "1", key: "1a92ep" }],
  ["circle", { cx: "5", cy: "15", r: "1", key: "5r1jwy" }]
], lm = e("grip-horizontal", rm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mm = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
], _m = e("grip-vertical", Mm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vm = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "19", cy: "5", r: "1", key: "w8mnmm" }],
  ["circle", { cx: "5", cy: "5", r: "1", key: "lttvr7" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
  ["circle", { cx: "19", cy: "19", r: "1", key: "shf9b7" }],
  ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
], mm = e("grip", vm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xm = [
  ["path", { d: "M3 7V5c0-1.1.9-2 2-2h2", key: "adw53z" }],
  ["path", { d: "M17 3h2c1.1 0 2 .9 2 2v2", key: "an4l38" }],
  ["path", { d: "M21 17v2c0 1.1-.9 2-2 2h-2", key: "144t0e" }],
  ["path", { d: "M7 21H5c-1.1 0-2-.9-2-2v-2", key: "rtnfgi" }],
  ["rect", { width: "7", height: "5", x: "7", y: "7", rx: "1", key: "1eyiv7" }],
  ["rect", { width: "7", height: "5", x: "10", y: "12", rx: "1", key: "1qlmkx" }]
], gm = e("group", xm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const um = [
  ["path", { d: "m11.9 12.1 4.514-4.514", key: "109xqo" }],
  [
    "path",
    {
      d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z",
      key: "txyc8t"
    }
  ],
  ["path", { d: "m6 16 2 2", key: "16qmzd" }],
  [
    "path",
    {
      d: "M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z",
      key: "1de1vg"
    }
  ]
], fm = e("guitar", um);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wm = [
  ["path", { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856", key: "1k1t7q" }],
  [
    "path",
    {
      d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
      key: "153t1g"
    }
  ],
  [
    "path",
    {
      d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
      key: "gzrt0n"
    }
  ],
  ["path", { d: "m8.5 16.5-1-1", key: "otr954" }]
], Nm = e("ham", wm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $m = [
  ["path", { d: "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25", key: "5dloqd" }],
  ["path", { d: "M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2", key: "1vl3my" }],
  [
    "path",
    {
      d: "M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0",
      key: "1us75o"
    }
  ],
  ["path", { d: "m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2", key: "qqzweh" }]
], bm = e("hamburger", $m);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zm = [
  ["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9", key: "1hayfq" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "15ts47"
    }
  ]
], qm = e("hammer", zm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jm = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17", key: "geh8rc" }],
  [
    "path",
    {
      d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "1fto5m"
    }
  ],
  ["path", { d: "m2 16 6 6", key: "1pfhp9" }],
  ["circle", { cx: "16", cy: "9", r: "2.9", key: "1n0dlu" }],
  ["circle", { cx: "6", cy: "5", r: "3", key: "151irh" }]
], Hm = e("hand-coins", jm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vm = [
  [
    "path",
    {
      d: "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0",
      key: "1ff7rl"
    }
  ],
  ["path", { d: "M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5", key: "1xmd21" }],
  ["path", { d: "M9 5A2 2 0 1 0 5 5V10", key: "f3wfjw" }],
  ["path", { d: "M9 7V4A2 2 0 1 1 13 4V7.268", key: "eaoucv" }]
], Am = e("hand-fist", Vm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cm = [
  ["path", { d: "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4", key: "edstyy" }],
  ["path", { d: "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "19wdwo" }],
  ["path", { d: "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5", key: "1lugqo" }],
  ["path", { d: "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1hbeus" }],
  [
    "path",
    { d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0", key: "1etffm" }
  ]
], Lm = e("hand-grab", Cm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sm = [
  ["path", { d: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16", key: "1v1a37" }],
  [
    "path",
    {
      d: "m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95",
      key: "fhfbnt"
    }
  ],
  ["path", { d: "m2 15 6 6", key: "10dquu" }],
  [
    "path",
    {
      d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91",
      key: "1x6kdw"
    }
  ]
], Pm = e("hand-heart", Sm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rm = [
  ["path", { d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14", key: "1j4xps" }],
  [
    "path",
    {
      d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "uospg8"
    }
  ],
  ["path", { d: "m2 13 6 6", key: "16e5sb" }]
], Tm = e("hand-helping", Rm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bm = [
  ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4", key: "wc6myp" }],
  ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2", key: "94qvcw" }],
  ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9", key: "m1ah89" }],
  [
    "path",
    {
      d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
      key: "t1skq1"
    }
  ]
], Dm = e("hand-metal", Bm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zm = [
  ["path", { d: "M12 3V2", key: "ar7q03" }],
  [
    "path",
    {
      d: "m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",
      key: "n2g93r"
    }
  ],
  ["path", { d: "M2 14h12a2 2 0 0 1 0 4h-2", key: "1o2jem" }],
  ["path", { d: "M4 10h16", key: "img6z1" }],
  ["path", { d: "M5 10a7 7 0 0 1 14 0", key: "1ega1o" }],
  ["path", { d: "M5 14v6a1 1 0 0 1-1 1H2", key: "1hescx" }]
], Fm = e("hand-platter", Zm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Om = [
  ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }],
  ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }],
  ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }],
  [
    "path",
    {
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
      key: "1s1gnw"
    }
  ]
], Em = e("hand", Om);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Um = [
  [
    "path",
    {
      d: "M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z",
      key: "1qbui5"
    }
  ],
  ["path", { d: "M8 11V6a4 4 0 0 1 8 0v5", key: "tcht90" }]
], Gm = e("handbag", Um);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Im = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
], Wm = e("handshake", Im);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xm = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
], Km = e("hard-drive-download", Xm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ym = [
  ["path", { d: "m16 6-4-4-4 4", key: "13yo43" }],
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
], Qm = e("hard-drive-upload", Ym);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jm = [
  ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5", key: "1p9q5i" }],
  ["path", { d: "M14 6a6 6 0 0 1 6 6v3", key: "1hnv84" }],
  ["path", { d: "M4 15v-3a6 6 0 0 1 6-6", key: "9ciidu" }],
  ["rect", { x: "2", y: "15", width: "20", height: "4", rx: "1", key: "g3x8cw" }]
], ex = e("hard-hat", Jm);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tx = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
], ax = e("hard-drive", tx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hx = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], ox = e("hash", hx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cx = [
  ["path", { d: "M14 18a2 2 0 0 0-4 0", key: "1v8fkw" }],
  [
    "path",
    {
      d: "m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11",
      key: "1fkr7p"
    }
  ],
  ["path", { d: "M2 11h20", key: "3eubbj" }],
  ["circle", { cx: "17", cy: "18", r: "3", key: "82mm0e" }],
  ["circle", { cx: "7", cy: "18", r: "3", key: "lvkj7j" }]
], dx = e("hat-glasses", cx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yx = [
  ["path", { d: "m5.2 6.2 1.4 1.4", key: "17imol" }],
  ["path", { d: "M2 13h2", key: "13gyu8" }],
  ["path", { d: "M20 13h2", key: "16rner" }],
  ["path", { d: "m17.4 7.6 1.4-1.4", key: "t4xlah" }],
  ["path", { d: "M22 17H2", key: "1gtaj3" }],
  ["path", { d: "M22 21H2", key: "1gy6en" }],
  ["path", { d: "M16 13a4 4 0 0 0-8 0", key: "1dyczq" }],
  ["path", { d: "M12 5V2.5", key: "1vytko" }]
], nx = e("haze", yx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kx = [
  ["path", { d: "M10 12H6", key: "15f2ro" }],
  ["path", { d: "M10 15V9", key: "1lckn7" }],
  [
    "path",
    {
      d: "M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z",
      key: "b3f847"
    }
  ],
  ["path", { d: "M6 15V9", key: "12stmj" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
], px = e("hd", kx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ix = [
  [
    "path",
    {
      d: "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z",
      key: "2128wb"
    }
  ],
  ["path", { d: "M7.5 12h9", key: "1t0ckc" }]
], sx = e("hdmi-port", ix);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rx = [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "m17 12 3-2v8", key: "1hhhft" }]
], lx = e("heading-1", rx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mx = [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1", key: "9jr5yi" }]
], _x = e("heading-2", Mx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vx = [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2", key: "68ncm8" }],
  ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2", key: "1ejuhz" }]
], mx = e("heading-3", vx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xx = [
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M17 10v3a1 1 0 0 0 1 1h3", key: "tj5zdr" }],
  ["path", { d: "M21 10v8", key: "1kdml4" }],
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }]
], gx = e("heading-4", xx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ux = [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M17 13v-3h4", key: "1nvgqp" }],
  [
    "path",
    { d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17", key: "2nebdn" }
  ]
], fx = e("heading-5", ux);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wx = [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["circle", { cx: "19", cy: "16", r: "2", key: "15mx69" }],
  ["path", { d: "M20 10c-2 2-3 3.5-3 6", key: "f35dl0" }]
], Nx = e("heading-6", wx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $x = [
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M6 20V4", key: "1w1bmo" }],
  ["path", { d: "M18 20V4", key: "o2hl4u" }]
], bx = e("heading", $x);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zx = [
  ["path", { d: "M21 14h-1.343", key: "1jdnxi" }],
  ["path", { d: "M9.128 3.47A9 9 0 0 1 21 12v3.343", key: "6kipu2" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3", key: "9x50f4" }],
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364",
      key: "1bkxnm"
    }
  ]
], qx = e("headphone-off", zx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jx = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
], Hx = e("headphones", jx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vx = [
  [
    "path",
    {
      d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",
      key: "12oyoe"
    }
  ],
  ["path", { d: "M21 16v2a4 4 0 0 1-4 4h-5", key: "1x7m43" }]
], Ax = e("headset", Vx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cx = [
  [
    "path",
    {
      d: "M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15",
      key: "idzbju"
    }
  ],
  [
    "path",
    {
      d: "M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z",
      key: "1su70f"
    }
  ]
], Lx = e("heart-crack", Cx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sx = [
  [
    "path",
    {
      d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
      key: "17lmqv"
    }
  ]
], Px = e("heart-handshake", Sx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rx = [
  [
    "path",
    {
      d: "m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572",
      key: "15yztm"
    }
  ],
  ["path", { d: "M15 15h6", key: "1u4692" }]
], Tx = e("heart-minus", Rx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bx = [
  [
    "path",
    {
      d: "M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655",
      key: "1inpfl"
    }
  ],
  [
    "path",
    {
      d: "m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761",
      key: "vbc6x7"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], Dx = e("heart-off", Bx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zx = [
  [
    "path",
    {
      d: "m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49",
      key: "wg5jx"
    }
  ],
  ["path", { d: "M15 15h6", key: "1u4692" }],
  ["path", { d: "M18 12v6", key: "1houu1" }]
], Fx = e("heart-plus", Zx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ox = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]
], Ex = e("heart-pulse", Ox);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ux = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
], Gx = e("heart", Ux);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ix = [
  ["path", { d: "M11 8c2-3-2-3 0-6", key: "1ldv5m" }],
  ["path", { d: "M15.5 8c2-3-2-3 0-6", key: "1otqoz" }],
  ["path", { d: "M6 10h.01", key: "1lbq93" }],
  ["path", { d: "M6 14h.01", key: "zudwn7" }],
  ["path", { d: "M10 16v-4", key: "1c25yv" }],
  ["path", { d: "M14 16v-4", key: "1dkbt8" }],
  ["path", { d: "M18 16v-4", key: "1yg9me" }],
  [
    "path",
    { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3", key: "1ubg90" }
  ],
  ["path", { d: "M5 20v2", key: "1abpe8" }],
  ["path", { d: "M19 20v2", key: "kqn6ft" }]
], Wx = e("heater", Ix);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xx = [
  ["path", { d: "M11 17v4", key: "14wq8k" }],
  ["path", { d: "M14 3v8a2 2 0 0 0 2 2h5.865", key: "12oo5h" }],
  ["path", { d: "M17 17v4", key: "hdt4hh" }],
  [
    "path",
    { d: "M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z", key: "yynif" }
  ],
  ["path", { d: "M2 10v5", key: "sa5akn" }],
  ["path", { d: "M6 3h16", key: "27qw71" }],
  ["path", { d: "M7 21h14", key: "1ugz0u" }],
  ["path", { d: "M8 13H2", key: "1thz1o" }]
], Kx = e("helicopter", Xx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yx = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ]
], Qx = e("hexagon", Yx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jx = [
  ["path", { d: "m9 11-6 6v3h9l3-3", key: "1a3l36" }],
  ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4", key: "14a9rk" }]
], eg = e("highlighter", Jx);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], ag = e("history", tg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  ["path", { d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27", key: "qyzcap" }],
  [
    "path",
    {
      d: "M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28",
      key: "y078lb"
    }
  ],
  ["path", { d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26", key: "1utre3" }],
  [
    "path",
    {
      d: "M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25",
      key: "17o9hm"
    }
  ],
  ["path", { d: "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75", key: "1d1n4p" }],
  [
    "path",
    {
      d: "M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24",
      key: "9uv3tt"
    }
  ],
  [
    "path",
    {
      d: "M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28",
      key: "1292wz"
    }
  ],
  [
    "path",
    {
      d: "M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05",
      key: "7ozu9p"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], og = e("hop-off", hg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [
  [
    "path",
    {
      d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18",
      key: "18lxf1"
    }
  ],
  [
    "path",
    {
      d: "M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88",
      key: "vtfxrw"
    }
  ],
  [
    "path",
    {
      d: "M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36",
      key: "13hl71"
    }
  ],
  [
    "path",
    {
      d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87",
      key: "1sl8oj"
    }
  ],
  [
    "path",
    {
      d: "M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08",
      key: "19c6kt"
    }
  ],
  [
    "path",
    {
      d: "M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57",
      key: "85ghs3"
    }
  ],
  ["path", { d: "M4.93 4.93 3 3a.7.7 0 0 1 0-1", key: "x087yj" }],
  [
    "path",
    {
      d: "M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",
      key: "11xdqo"
    }
  ]
], dg = e("hop", cg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = [
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M14 9h-4", key: "1w2s2s" }],
  [
    "path",
    {
      d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
      key: "1tthqt"
    }
  ],
  ["path", { d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16", key: "dw4p4i" }]
], ng = e("hospital", yg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = [
  ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
  ["path", { d: "M12 11h.01", key: "z322tv" }],
  ["path", { d: "M12 7h.01", key: "1ivr5q" }],
  ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
  ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 7h.01", key: "1vti4s" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
], pg = e("hotel", kg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  ["path", { d: "M5 2h14", key: "pdyrp9" }],
  [
    "path",
    {
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
      key: "1d314k"
    }
  ],
  [
    "path",
    { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2", key: "1vvvr6" }
  ]
], sg = e("hourglass", ig);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rg = [
  [
    "path",
    {
      d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "n9s7kx"
    }
  ],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
], lg = e("house-heart", rg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = [
  ["path", { d: "M10 12V8.964", key: "1vll13" }],
  ["path", { d: "M14 12V8.964", key: "1x3qvg" }],
  [
    "path",
    { d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z", key: "ppykja" }
  ],
  [
    "path",
    {
      d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
      key: "365xoy"
    }
  ]
], _g = e("house-plug", Mg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vg = [
  [
    "path",
    {
      d: "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35",
      key: "8ek5ge"
    }
  ],
  ["path", { d: "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8", key: "1rbg29" }],
  ["path", { d: "M15 18h6", key: "3b3c90" }],
  ["path", { d: "M18 15v6", key: "9wciyi" }]
], mg = e("house-plus", vg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = [
  ["path", { d: "M9.5 13.866a4 4 0 0 1 5 .01", key: "1wy54i" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ],
  ["path", { d: "M7 10.754a8 8 0 0 1 10 0", key: "exoy2g" }]
], gg = e("house-wifi", xg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
], fg = e("house", ug);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  [
    "path",
    {
      d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0",
      key: "1uxfcu"
    }
  ],
  ["path", { d: "M12.14 11a3.5 3.5 0 1 1 6.71 0", key: "4k3m1s" }],
  ["path", { d: "M15.5 6.5a3.5 3.5 0 1 0-7 0", key: "zmuahr" }]
], Ng = e("ice-cream-bowl", wg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $g = [
  ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11", key: "1v6356" }],
  ["path", { d: "M17 7A5 5 0 0 0 7 7", key: "151p3v" }],
  ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4", key: "1sdaij" }]
], bg = e("ice-cream-cone", $g);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zg = [
  ["path", { d: "M13.5 8h-3", key: "xvov4w" }],
  [
    "path",
    {
      d: "m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3",
      key: "16uttc"
    }
  ],
  ["path", { d: "M16.899 22A5 5 0 0 0 7.1 22", key: "1d0ppr" }],
  ["path", { d: "m9 2 3 6", key: "1o7bd9" }],
  ["circle", { cx: "12", cy: "15", r: "3", key: "g36mzq" }]
], qg = e("id-card-lanyard", zg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jg = [
  ["path", { d: "M16 10h2", key: "8sgtl7" }],
  ["path", { d: "M16 14h2", key: "epxaof" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0", key: "n6f512" }],
  ["circle", { cx: "9", cy: "11", r: "2", key: "yxgjnd" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
], Hg = e("id-card", jg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vg = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      key: "9csbqa"
    }
  ],
  ["path", { d: "m14 19 3 3v-5.5", key: "9ldu5r" }],
  ["path", { d: "m17 22 3-3", key: "1nkfve" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], Ag = e("image-down", Vg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  ["path", { d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "m87ecr" }],
  ["line", { x1: "16", x2: "22", y1: "5", y2: "5", key: "ez7e4s" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Lg = e("image-minus", Cg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
], Pg = e("image-off", Sg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = [
  [
    "path",
    {
      d: "M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
      key: "nrt1m3"
    }
  ],
  ["path", { d: "M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "99hgts" }],
  ["path", { d: "m6 21 5-5", key: "1wyjai" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], Tg = e("image-play", Rg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bg = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], Dg = e("image-plus", Bg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zg = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      key: "9csbqa"
    }
  ],
  ["path", { d: "m14 19.5 3-3 3 3", key: "9vmjn0" }],
  ["path", { d: "M17 22v-5.5", key: "1aa6fl" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], Fg = e("image-up", Zg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M17 21h2a2 2 0 0 0 2-2", key: "130fy9" }],
  ["path", { d: "M21 12v3", key: "1wzk3p" }],
  ["path", { d: "m21 3-5 5", key: "1g5oa7" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2", key: "kk3yz1" }],
  ["path", { d: "m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19", key: "fyekpt" }],
  ["path", { d: "M9 3h3", key: "d52fa" }],
  ["rect", { x: "3", y: "11", width: "10", height: "10", rx: "1", key: "1wpmix" }]
], Eg = e("image-upscale", Og);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Gg = e("image", Ug);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ig = [
  ["path", { d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16", key: "9kzy35" }],
  ["path", { d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2", key: "1t0f0t" }],
  ["circle", { cx: "13", cy: "7", r: "1", fill: "currentColor", key: "1obus6" }],
  ["rect", { x: "8", y: "2", width: "14", height: "14", rx: "2", key: "1gvhby" }]
], Wg = e("images", Ig);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xg = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m8 11 4 4 4-4", key: "1dohi6" }],
  [
    "path",
    {
      d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
      key: "1ywtjm"
    }
  ]
], Kg = e("import", Xg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yg = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
], Qg = e("inbox", Yg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jg = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
], eu = e("indian-rupee", Jg);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tu = [
  ["path", { d: "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8", key: "18ogeb" }]
], au = e("infinity", tu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hu = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], ou = e("info", hu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cu = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 7h.01", key: "7u93v4" }],
  ["path", { d: "M17 7h.01", key: "14a9sn" }],
  ["path", { d: "M7 17h.01", key: "19xn7k" }],
  ["path", { d: "M17 17h.01", key: "1sd3ek" }]
], du = e("inspection-panel", cu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yu = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], nu = e("instagram", yu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ku = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
], pu = e("italic", ku);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iu = [
  ["path", { d: "m16 14 4 4-4 4", key: "hkso8o" }],
  ["path", { d: "M20 10a8 8 0 1 0-8 8h8", key: "1bik7b" }]
], su = e("iteration-ccw", iu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ru = [
  ["path", { d: "M4 10a8 8 0 1 1 8 8H4", key: "svv66n" }],
  ["path", { d: "m8 22-4-4 4-4", key: "6g7gki" }]
], lu = e("iteration-cw", ru);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mu = [
  ["path", { d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3", key: "2ej80x" }],
  ["path", { d: "M6 15h12", key: "1hwgt5" }],
  ["path", { d: "M6 11h12", key: "wf4gp6" }]
], _u = e("japanese-yen", Mu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vu = [
  [
    "path",
    {
      d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
      key: "jg2n2t"
    }
  ],
  ["path", { d: "M6 15v-2", key: "gd6mvg" }],
  ["path", { d: "M12 15V9", key: "8c7uyn" }],
  ["circle", { cx: "12", cy: "6", r: "3", key: "1gm2ql" }]
], mu = e("joystick", vu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xu = [
  ["path", { d: "M5 3v14", key: "9nsxs2" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "M19 3v18", key: "1sk56x" }]
], gu = e("kanban", xu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uu = [
  ["path", { d: "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z", key: "skzb1g" }],
  [
    "path",
    {
      d: "M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61",
      key: "cv9jm7"
    }
  ],
  ["path", { d: "m6.707 6.707 10.586 10.586", key: "d2l993" }],
  ["path", { d: "M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z", key: "i0et4n" }]
], fu = e("kayak", uu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wu = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
], Nu = e("key-round", wu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $u = [
  [
    "path",
    {
      d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z",
      key: "165ttr"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  [
    "path",
    {
      d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",
      key: "1ubxi2"
    }
  ]
], bu = e("key-square", $u);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zu = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], qu = e("key", zu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ju = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M6 8h4", key: "utf9t1" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M6 12v4", key: "dy92yo" }],
  ["path", { d: "M10 12v4", key: "1fxnav" }],
  ["path", { d: "M14 12v4", key: "1hft58" }],
  ["path", { d: "M18 12v4", key: "tjjnbz" }]
], Hu = e("keyboard-music", ju);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vu = [
  ["path", { d: "M 20 4 A2 2 0 0 1 22 6", key: "1g1fkt" }],
  ["path", { d: "M 22 6 L 22 16.41", key: "1qjg3w" }],
  ["path", { d: "M 7 16 L 16 16", key: "n0yqwb" }],
  ["path", { d: "M 9.69 4 L 20 4", key: "kbpcgx" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2", key: "s23sx2" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }]
], Au = e("keyboard-off", Vu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cu = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
], Lu = e("keyboard", Cu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Su = [
  ["path", { d: "M12 2v5", key: "nd4vlx" }],
  ["path", { d: "M14.829 15.998a3 3 0 1 1-5.658 0", key: "1pybiy" }],
  [
    "path",
    {
      d: "M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z",
      key: "ma1wor"
    }
  ]
], Pu = e("lamp-ceiling", Su);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ru = [
  [
    "path",
    {
      d: "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z",
      key: "sb8slu"
    }
  ],
  ["path", { d: "m14.207 4.793-3.414 3.414", key: "m2x3oj" }],
  [
    "path",
    { d: "M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", key: "8b3myj" }
  ],
  ["path", { d: "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18", key: "43s6cu" }]
], Tu = e("lamp-desk", Ru);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bu = [
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  [
    "path",
    {
      d: "M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z",
      key: "1o95gh"
    }
  ],
  ["path", { d: "M9 22h6", key: "1rlq3v" }]
], Du = e("lamp-floor", Bu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zu = [
  [
    "path",
    {
      d: "M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z",
      key: "u4w2d7"
    }
  ],
  [
    "path",
    { d: "M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z", key: "15356w" }
  ],
  ["path", { d: "M8 6h4a2 2 0 0 1 2 2v5", key: "1m6m7x" }]
], Fu = e("lamp-wall-down", Zu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ou = [
  [
    "path",
    {
      d: "M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z",
      key: "1uvrbf"
    }
  ],
  [
    "path",
    { d: "M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z", key: "154r2a" }
  ],
  ["path", { d: "M8 18h4a2 2 0 0 0 2-2v-5", key: "z9mbu0" }]
], Eu = e("lamp-wall-up", Ou);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uu = [
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  [
    "path",
    {
      d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
      key: "1l7kg2"
    }
  ],
  [
    "path",
    { d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z", key: "1mmzpi" }
  ]
], Gu = e("lamp", Uu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iu = [
  ["path", { d: "m12 8 6-3-6-3v10", key: "mvpnpy" }],
  [
    "path",
    {
      d: "m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12",
      key: "ek95tt"
    }
  ],
  ["path", { d: "m6.49 12.85 11.02 6.3", key: "1kt42w" }],
  ["path", { d: "M17.51 12.85 6.5 19.15", key: "v55bdg" }]
], Wu = e("land-plot", Iu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xu = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
], Ku = e("landmark", Xu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yu = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
], Qu = e("languages", Yu);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ju = [
  ["path", { d: "M2 20h20", key: "owomy5" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }],
  ["rect", { x: "3", y: "4", width: "18", height: "12", rx: "2", key: "8ur36m" }]
], ef = e("laptop-minimal-check", Ju);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tf = [
  ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2", key: "1qhy41" }],
  ["line", { x1: "2", x2: "22", y1: "20", y2: "20", key: "ni3hll" }]
], af = e("laptop-minimal", tf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hf = [
  [
    "path",
    {
      d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",
      key: "1pdavp"
    }
  ],
  ["path", { d: "M20.054 15.987H3.946", key: "14rxg9" }]
], of = e("laptop", hf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cf = [
  ["path", { d: "M7 22a5 5 0 0 1-2-4", key: "umushi" }],
  ["path", { d: "M7 16.93c.96.43 1.96.74 2.99.91", key: "ybbtv3" }],
  [
    "path",
    {
      d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2",
      key: "gt5e1w"
    }
  ],
  ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", key: "bq3ynw" }],
  [
    "path",
    {
      d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",
      key: "72q637"
    }
  ]
], df = e("lasso-select", cf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yf = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], nf = e("lasso", yf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kf = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z", key: "b2q4dd" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
], pf = e("laugh", kf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sf = [
  [
    "path",
    {
      d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z",
      key: "15q6uc"
    }
  ],
  [
    "path",
    {
      d: "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845",
      key: "byia6g"
    }
  ]
], rf = e("layers-2", sf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lf = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z",
      key: "zzgyd3"
    }
  ],
  ["path", { d: "M16 17h6", key: "1ook5g" }],
  ["path", { d: "M19 14v6", key: "1ckrd5" }],
  ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178", key: "1ia9y3" }],
  ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962", key: "jksky3" }]
], Mf = e("layers-plus", lf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _f = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], vf = e("layers", _f);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mf = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], xf = e("layout-dashboard", mf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gf = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
], uf = e("layout-grid", gf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ff = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
], wf = e("layout-list", ff);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nf = [
  ["rect", { width: "7", height: "18", x: "3", y: "3", rx: "1", key: "2obqm" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }]
], $f = e("layout-panel-left", Nf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bf = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }]
], zf = e("layout-panel-top", bf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qf = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
  ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1", key: "jqznyg" }],
  ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1", key: "q5h2i8" }]
], jf = e("layout-template", qf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hf = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
], Vf = e("leaf", Hf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Af = [
  [
    "path",
    {
      d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22",
      key: "1134nt"
    }
  ],
  ["path", { d: "M2 22 17 7", key: "1q7jp2" }]
], Cf = e("leafy-green", Af);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lf = [
  [
    "path",
    {
      d: "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3",
      key: "13jjxg"
    }
  ],
  ["path", { d: "M18 6V3a1 1 0 0 0-1-1h-3", key: "1550fe" }],
  ["rect", { width: "8", height: "12", x: "8", y: "10", rx: "1", key: "qmu8b6" }]
], Sf = e("lectern", Lf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pf = [
  ["rect", { width: "8", height: "18", x: "3", y: "3", rx: "1", key: "oynpb5" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  [
    "path",
    {
      d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
      key: "1qboyk"
    }
  ]
], Rf = e("library-big", Pf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tf = [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
], Bf = e("library", Tf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Df = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.93 4.93 4.24 4.24", key: "1ymg45" }],
  ["path", { d: "m14.83 9.17 4.24-4.24", key: "1cb5xl" }],
  ["path", { d: "m14.83 14.83 4.24 4.24", key: "q42g0n" }],
  ["path", { d: "m9.17 14.83-4.24 4.24", key: "bqpfvv" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
], Zf = e("life-buoy", Df);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ff = [
  ["path", { d: "M14 12h2v8", key: "c1fccl" }],
  ["path", { d: "M14 20h4", key: "lzx1xo" }],
  ["path", { d: "M6 12h4", key: "a4o3ry" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M8 20V8a4 4 0 0 1 7.464-2", key: "wk9t6r" }]
], Of = e("ligature", Ff);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ef = [
  ["path", { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5", key: "1fkcox" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5", key: "10m8kw" }],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Uf = e("lightbulb-off", Ef);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gf = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], If = e("lightbulb", Gf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wf = [
  [
    "path",
    {
      d: "M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2",
      key: "1lrphd"
    }
  ]
], Xf = e("line-squiggle", Wf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kf = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7", key: "10o201" }],
  ["path", { d: "M15 7h2a5 5 0 0 1 4 8", key: "1d3206" }],
  ["line", { x1: "8", x2: "12", y1: "12", y2: "12", key: "rvw6j4" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], Yf = e("link-2-off", Kf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qf = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
], Jf = e("link-2", Qf);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ew = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
], tw = e("link", ew);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aw = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
], hw = e("linkedin", aw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ow = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M16 12H3", key: "1a2rj7" }],
  ["path", { d: "M11 19H3", key: "zflm78" }],
  ["path", { d: "m15 18 2 2 4-4", key: "1szwhi" }]
], cw = e("list-check", ow);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dw = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }]
], yw = e("list-checks", dw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nw = [
  ["path", { d: "M3 5h8", key: "18g2rq" }],
  ["path", { d: "M3 12h8", key: "1xfjp6" }],
  ["path", { d: "M3 19h8", key: "fpbke4" }],
  ["path", { d: "m15 5 3 3 3-3", key: "1t4thf" }],
  ["path", { d: "m15 19 3-3 3 3", key: "y4ckd2" }]
], kw = e("list-chevrons-down-up", nw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pw = [
  ["path", { d: "M3 5h8", key: "18g2rq" }],
  ["path", { d: "M3 12h8", key: "1xfjp6" }],
  ["path", { d: "M3 19h8", key: "fpbke4" }],
  ["path", { d: "m15 8 3-3 3 3", key: "bc4io6" }],
  ["path", { d: "m15 16 3 3 3-3", key: "9wmg1l" }]
], iw = e("list-chevrons-up-down", pw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sw = [
  ["path", { d: "M10 5h11", key: "1hkqpe" }],
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 19h11", key: "14g2nv" }],
  ["path", { d: "m3 10 3-3-3-3", key: "i7pm08" }],
  ["path", { d: "m3 20 3-3-3-3", key: "20gx1n" }]
], rw = e("list-collapse", sw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lw = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M16 12H3", key: "1a2rj7" }],
  ["path", { d: "M9 19H3", key: "s61nz1" }],
  ["path", { d: "m16 16-3 3 3 3", key: "117b85" }],
  ["path", { d: "M21 5v12a2 2 0 0 1-2 2h-6", key: "hey24a" }]
], Mw = e("list-end", lw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _w = [
  ["path", { d: "M12 5H2", key: "1o22fu" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M9 19h6", key: "456am0" }],
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 8V2", key: "1wcffq" }]
], vw = e("list-filter-plus", _w);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mw = [
  ["path", { d: "M2 5h20", key: "1fs1ex" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M9 19h6", key: "456am0" }]
], xw = e("list-filter", mw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gw = [
  ["path", { d: "M21 5H11", key: "us1j55" }],
  ["path", { d: "M21 12H11", key: "wd7e0v" }],
  ["path", { d: "M21 19H11", key: "saa85w" }],
  ["path", { d: "m7 8-4 4 4 4", key: "o5hrat" }]
], uw = e("list-indent-decrease", gw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fw = [
  ["path", { d: "M21 5H11", key: "us1j55" }],
  ["path", { d: "M21 12H11", key: "wd7e0v" }],
  ["path", { d: "M21 19H11", key: "saa85w" }],
  ["path", { d: "m3 8 4 4-4 4", key: "1a3j6y" }]
], ww = e("list-indent-increase", fw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nw = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "M21 12h-6", key: "bt1uis" }]
], $w = e("list-minus", Nw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bw = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M11 19H3", key: "zflm78" }],
  ["path", { d: "M21 16V5", key: "yxg4q8" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
], zw = e("list-music", bw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qw = [
  ["path", { d: "M11 5h10", key: "1cz7ny" }],
  ["path", { d: "M11 12h10", key: "1438ji" }],
  ["path", { d: "M11 19h10", key: "11t30w" }],
  ["path", { d: "M4 4h1v5", key: "10yrso" }],
  ["path", { d: "M4 9h2", key: "r1h2o0" }],
  ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02", key: "xtkcd5" }]
], jw = e("list-ordered", qw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hw = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "M18 9v6", key: "1twb98" }],
  ["path", { d: "M21 12h-6", key: "bt1uis" }]
], Vw = e("list-plus", Hw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aw = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M7 12H3", key: "13ou7f" }],
  ["path", { d: "M7 19H3", key: "wbqt3n" }],
  [
    "path",
    {
      d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",
      key: "qth677"
    }
  ],
  ["path", { d: "M11 10v4h4", key: "172dkj" }]
], Cw = e("list-restart", Aw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lw = [
  ["path", { d: "M3 5h6", key: "1ltk0q" }],
  ["path", { d: "M3 12h13", key: "ppymz1" }],
  ["path", { d: "M3 19h13", key: "bpdczq" }],
  ["path", { d: "m16 8-3-3 3-3", key: "1pjpp6" }],
  ["path", { d: "M21 19V7a2 2 0 0 0-2-2h-6", key: "4zzq67" }]
], Sw = e("list-start", Lw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pw = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
], Rw = e("list-todo", Pw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tw = [
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "M3 10a2 2 0 0 0 2 2h3", key: "1npucw" }],
  ["path", { d: "M3 5v12a2 2 0 0 0 2 2h3", key: "x1gjn2" }]
], Bw = e("list-tree", Tw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dw = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M10 12H3", key: "1ulcyk" }],
  ["path", { d: "M10 19H3", key: "108z41" }],
  [
    "path",
    {
      d: "M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
      key: "ms4nik"
    }
  ]
], Zw = e("list-video", Dw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fw = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "m15.5 9.5 5 5", key: "ytk86i" }],
  ["path", { d: "m20.5 9.5-5 5", key: "17o44f" }]
], Ow = e("list-x", Fw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ew = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], Uw = e("list", Ew);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gw = [
  ["path", { d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0", key: "1lzz15" }],
  ["path", { d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6", key: "1gnrpi" }],
  ["path", { d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6", key: "u9yy5q" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Iw = e("loader-pinwheel", Gw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ww = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Xw = e("loader-circle", Ww);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kw = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
], Yw = e("loader", Kw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qw = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Jw = e("locate-fixed", Qw);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eN = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M12 2v3", key: "qbqxhf" }],
  ["path", { d: "M18.89 13.24a7 7 0 0 0-8.13-8.13", key: "1v9jrh" }],
  ["path", { d: "M19 12h3", key: "osuazr" }],
  ["path", { d: "M2 12h3", key: "1wrr53" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M7.05 7.05a7 7 0 0 0 9.9 9.9", key: "rc5l2e" }]
], tN = e("locate-off", eN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aN = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }]
], hN = e("locate", aN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oN = [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2", key: "l0tzu3" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 9.33-2.5", key: "car5b7" }]
], cN = e("lock-keyhole-open", oN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dN = [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }]
], yN = e("lock-keyhole", dN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nN = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], kN = e("lock-open", nN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pN = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], iN = e("lock", pN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sN = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
], rN = e("log-in", sN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lN = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], MN = e("log-out", lN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _N = [
  ["path", { d: "M3 5h1", key: "1mv5vm" }],
  ["path", { d: "M3 12h1", key: "lp3yf2" }],
  ["path", { d: "M3 19h1", key: "w6f3n9" }],
  ["path", { d: "M8 5h1", key: "1nxr5w" }],
  ["path", { d: "M8 12h1", key: "1con00" }],
  ["path", { d: "M8 19h1", key: "k7p10e" }],
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }]
], vN = e("logs", _N);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mN = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ["path", { d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0", key: "107gwy" }]
], xN = e("lollipop", mN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gN = [
  [
    "path",
    { d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2", key: "1m57jg" }
  ],
  ["path", { d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14", key: "1l99gc" }],
  ["path", { d: "M10 20h4", key: "ni2waw" }],
  ["circle", { cx: "16", cy: "20", r: "2", key: "1vifvg" }],
  ["circle", { cx: "8", cy: "20", r: "2", key: "ckkr5m" }]
], uN = e("luggage", gN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fN = [
  ["path", { d: "m12 15 4 4", key: "lnac28" }],
  [
    "path",
    {
      d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
      key: "nlhkjb"
    }
  ],
  ["path", { d: "m5 8 4 4", key: "j6kj7e" }]
], wN = e("magnet", fN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NN = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
], $N = e("mail-check", NN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bN = [
  ["path", { d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "fuxbkv" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M16 19h6", key: "xwg31i" }]
], zN = e("mail-minus", bN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qN = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
], jN = e("mail-open", qN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HN = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5", key: "e61zoh" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  [
    "path",
    {
      d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",
      key: "7z9rxb"
    }
  ],
  ["path", { d: "M20 22v.01", key: "12bgn6" }]
], VN = e("mail-question-mark", HN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AN = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M16 19h6", key: "xwg31i" }]
], CN = e("mail-plus", AN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LN = [
  ["path", { d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5", key: "w80f2v" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", key: "8lzu5m" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["path", { d: "m22 22-1.5-1.5", key: "1x83k4" }]
], SN = e("mail-search", LN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PN = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5", key: "e61zoh" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M20 14v4", key: "1hm744" }],
  ["path", { d: "M20 22v.01", key: "12bgn6" }]
], RN = e("mail-warning", PN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TN = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
], BN = e("mail", TN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DN = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9", key: "1j9vog" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m17 17 4 4", key: "1b3523" }],
  ["path", { d: "m21 17-4 4", key: "uinynz" }]
], ZN = e("mail-x", DN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FN = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z",
      key: "1lbycx"
    }
  ],
  ["polyline", { points: "15,9 18,9 18,11", key: "1pm9c0" }],
  ["path", { d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2", key: "15i455" }],
  ["line", { x1: "6", x2: "7", y1: "10", y2: "10", key: "1e2scm" }]
], ON = e("mailbox", FN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EN = [
  ["path", { d: "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732", key: "1vyzll" }],
  ["path", { d: "m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5", key: "k7ramc" }],
  ["rect", { x: "7", y: "3", width: "15", height: "12", rx: "2", key: "17196g" }]
], UN = e("mails", EN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GN = [
  [
    "path",
    {
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14",
      key: "40pylx"
    }
  ],
  ["path", { d: "M15 5.764V14", key: "1bab71" }],
  ["path", { d: "M21 18h-6", key: "139f0c" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
], IN = e("map-minus", GN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WN = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
], XN = e("map-pin-check-inside", WN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KN = [
  [
    "path",
    {
      d: "M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728",
      key: "1dq61d"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "m16 18 2 2 4-4", key: "1mkfmb" }]
], YN = e("map-pin-check", KN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QN = [
  [
    "path",
    {
      d: "M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z",
      key: "1p1rcz"
    }
  ],
  [
    "path",
    {
      d: "M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2",
      key: "mcbcs9"
    }
  ],
  ["path", { d: "M18 22v-3", key: "1t1ugv" }],
  ["circle", { cx: "10", cy: "10", r: "3", key: "1ns7v1" }]
], JN = e("map-pin-house", QN);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e$ = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
], t$ = e("map-pin-minus-inside", e$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a$ = [
  [
    "path",
    {
      d: "M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
      key: "11uxia"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M16 18h6", key: "987eiv" }]
], h$ = e("map-pin-minus", a$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o$ = [
  ["path", { d: "M12.75 7.09a3 3 0 0 1 2.16 2.16", key: "1d4wjd" }],
  [
    "path",
    {
      d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",
      key: "12yil7"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533", key: "lhrkcz" }],
  ["path", { d: "M9.13 9.13a3 3 0 0 0 3.74 3.74", key: "13wojd" }]
], c$ = e("map-pin-off", o$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d$ = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
], y$ = e("map-pin-plus-inside", d$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n$ = [
  ["path", { d: "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468", key: "1fahp3" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1817ys"
    }
  ],
  ["circle", { cx: "10", cy: "10", r: "3", key: "1ns7v1" }]
], k$ = e("map-pin-pen", n$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p$ = [
  [
    "path",
    {
      d: "M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
      key: "fcdtly"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M16 18h6", key: "987eiv" }],
  ["path", { d: "M19 15v6", key: "10aioa" }]
], i$ = e("map-pin-plus", p$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s$ = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
], r$ = e("map-pin-x-inside", s$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l$ = [
  [
    "path",
    {
      d: "M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077",
      key: "y0ewhp"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "m21.5 15.5-5 5", key: "11iqnx" }],
  ["path", { d: "m21.5 20.5-5-5", key: "1bylgx" }]
], M$ = e("map-pin-x", l$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _$ = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], v$ = e("map-pin", _$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m$ = [
  [
    "path",
    {
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
      key: "11u0oz"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  [
    "path",
    {
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
      key: "q8zwxj"
    }
  ]
], x$ = e("map-pinned", m$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g$ = [
  [
    "path",
    {
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12",
      key: "svfegj"
    }
  ],
  ["path", { d: "M15 5.764V12", key: "1ocw4k" }],
  ["path", { d: "M18 15v6", key: "9wciyi" }],
  ["path", { d: "M21 18h-6", key: "139f0c" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
], u$ = e("map-plus", g$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f$ = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
], w$ = e("map", f$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N$ = [
  ["path", { d: "m14 6 4 4", key: "1q72g9" }],
  ["path", { d: "M17 3h4v4", key: "19p9u1" }],
  ["path", { d: "m21 3-7.75 7.75", key: "1cjbfd" }],
  ["circle", { cx: "9", cy: "15", r: "6", key: "bx5svt" }]
], $$ = e("mars-stroke", N$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b$ = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "m21 3-6.75 6.75", key: "pv0uzu" }],
  ["circle", { cx: "10", cy: "14", r: "6", key: "1qwbdc" }]
], z$ = e("mars", b$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q$ = [
  ["path", { d: "M8 22h8", key: "rmew8v" }],
  ["path", { d: "M12 11v11", key: "ur9y6a" }],
  ["path", { d: "m19 3-7 8-7-8Z", key: "1sgpiw" }]
], j$ = e("martini", q$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H$ = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], V$ = e("maximize-2", H$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A$ = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], C$ = e("maximize", A$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L$ = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
], S$ = e("medal", L$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P$ = [
  ["path", { d: "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344", key: "bycexp" }],
  [
    "path",
    { d: "M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1", key: "1t17s6" }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
  ["path", { d: "M8 8v6", key: "aieo6v" }]
], R$ = e("megaphone-off", P$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T$ = [
  [
    "path",
    {
      d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      key: "q8bfy3"
    }
  ],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
  ["path", { d: "M8 6v8", key: "15ugcq" }]
], B$ = e("megaphone", T$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D$ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "8", x2: "16", y1: "15", y2: "15", key: "1xb1d9" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
], Z$ = e("meh", D$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F$ = [
  ["path", { d: "M12 12v-2", key: "fwoke6" }],
  ["path", { d: "M12 18v-2", key: "qj6yno" }],
  ["path", { d: "M16 12v-2", key: "heuere" }],
  ["path", { d: "M16 18v-2", key: "s1ct0w" }],
  ["path", { d: "M2 11h1.5", key: "15p63e" }],
  ["path", { d: "M20 18v-2", key: "12ehxp" }],
  ["path", { d: "M20.5 11H22", key: "khsy7a" }],
  ["path", { d: "M4 18v-2", key: "1c3oqr" }],
  ["path", { d: "M8 12v-2", key: "1mwtfd" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["rect", { x: "2", y: "6", width: "20", height: "10", rx: "2", key: "1qcswk" }]
], O$ = e("memory-stick", F$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E$ = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], U$ = e("menu", E$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G$ = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
], I$ = e("merge", G$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W$ = [
  ["path", { d: "m10 9-3 3 3 3", key: "1oro0q" }],
  ["path", { d: "m14 15 3-3-3-3", key: "bz13h7" }],
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
], X$ = e("message-circle-code", W$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K$ = [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0", key: "5ilxe3" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0", key: "11zvb9" }],
  ["path", { d: "M17.609 3.72a10 10 0 0 1 2.69 2.7", key: "jiglxs" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8", key: "c0bmvh" }],
  ["path", { d: "M20.28 17.61a10 10 0 0 1-2.7 2.69", key: "elg7ff" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8", key: "qkgqxc" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69", key: "1mcia2" }],
  ["path", { d: "m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98", key: "1qsu07" }]
], Y$ = e("message-circle-dashed", K$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q$ = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  [
    "path",
    {
      d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z",
      key: "hoo97p"
    }
  ]
], J$ = e("message-circle-heart", Q$);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eb = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }]
], tb = e("message-circle-more", eb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ab = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989",
      key: "7il5tn"
    }
  ],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }]
], hb = e("message-circle-off", ab);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ob = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], cb = e("message-circle-plus", ob);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const db = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], yb = e("message-circle-question-mark", db);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nb = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "m10 15-3-3 3-3", key: "1pgupc" }],
  ["path", { d: "M7 12h8a2 2 0 0 1 2 2v1", key: "89sh1g" }]
], kb = e("message-circle-reply", nb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pb = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
], ib = e("message-circle-warning", pb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sb = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], rb = e("message-circle-x", sb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lb = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
], Mb = e("message-circle", lb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _b = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "m10 8-3 3 3 3", key: "fp6dz7" }],
  ["path", { d: "m14 14 3-3-3-3", key: "1yrceu" }]
], vb = e("message-square-code", _b);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mb = [
  ["path", { d: "M14 3h2", key: "1d12a5" }],
  ["path", { d: "M16 19h-2", key: "1agirb" }],
  ["path", { d: "M2 12v-2", key: "1ey295" }],
  ["path", { d: "M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149", key: "120k8q" }],
  ["path", { d: "M20 19a2 2 0 0 0 2-2v-1", key: "ior8tn" }],
  ["path", { d: "M22 10v2", key: "rmlecy" }],
  ["path", { d: "M22 6V5a2 2 0 0 0-2-2", key: "sp3k6r" }],
  ["path", { d: "M4 3a2 2 0 0 0-2 2v1", key: "11zt7s" }],
  ["path", { d: "M8 19h2", key: "jnunrx" }],
  ["path", { d: "M8 3h2", key: "ysbsee" }]
], xb = e("message-square-dashed", mb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M10 15h4", key: "192ueg" }],
  ["path", { d: "M10 9h4", key: "u4k05v" }],
  ["path", { d: "M12 7v4", key: "xawao1" }]
], ub = e("message-square-diff", gb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fb = [
  [
    "path",
    {
      d: "M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7",
      key: "wjb7ig"
    }
  ],
  ["circle", { cx: "19", cy: "6", r: "3", key: "108a5v" }]
], wb = e("message-square-dot", fb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  [
    "path",
    {
      d: "M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5",
      key: "1faxuh"
    }
  ]
], $b = e("message-square-heart", Nb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bb = [
  [
    "path",
    {
      d: "M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10",
      key: "fu6chl"
    }
  ],
  ["path", { d: "M20 15v-2a2 2 0 0 0-4 0v2", key: "vl8a78" }],
  ["rect", { x: "14", y: "15", width: "8", height: "5", rx: "1", key: "37aafw" }]
], zb = e("message-square-lock", bb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qb = [
  [
    "path",
    {
      d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826",
      key: "1wyg69"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.656 3H20a2 2 0 0 1 2 2v11.344", key: "mhl4k6" }]
], jb = e("message-square-off", qb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M12 11h.01", key: "z322tv" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }]
], Vb = e("message-square-more", Hb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ab = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M12 8v6", key: "1ib9pf" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }]
], Cb = e("message-square-plus", Ab);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lb = [
  ["path", { d: "M14 14a2 2 0 0 0 2-2V8h-2", key: "1r06pg" }],
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M8 14a2 2 0 0 0 2-2V8H8", key: "1jzu5j" }]
], Sb = e("message-square-quote", Lb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "m10 8-3 3 3 3", key: "fp6dz7" }],
  ["path", { d: "M17 14v-1a2 2 0 0 0-2-2H7", key: "1tkjnz" }]
], Rb = e("message-square-reply", Pb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M7 11h10", key: "1twpyw" }],
  ["path", { d: "M7 15h6", key: "d9of3u" }],
  ["path", { d: "M7 7h8", key: "af5zfr" }]
], Bb = e("message-square-text", Tb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Db = [
  [
    "path",
    {
      d: "M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4",
      key: "11da1y"
    }
  ],
  ["path", { d: "M16 3h6v6", key: "1bx56c" }],
  ["path", { d: "m16 9 6-6", key: "m4dnic" }]
], Zb = e("message-square-share", Db);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M12 15h.01", key: "q59x07" }],
  ["path", { d: "M12 7v4", key: "xawao1" }]
], Ob = e("message-square-warning", Fb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "m14.5 8.5-5 5", key: "19tnj2" }],
  ["path", { d: "m9.5 8.5 5 5", key: "1oa8ql" }]
], Ub = e("message-square-x", Eb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gb = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
], Ib = e("message-square", Gb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wb = [
  [
    "path",
    {
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
      key: "1n2ejm"
    }
  ],
  [
    "path",
    {
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
      key: "1qfcsi"
    }
  ]
], Xb = e("messages-square", Wb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kb = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M16.95 16.95A7 7 0 0 1 5 12v-2", key: "cqa7eg" }],
  ["path", { d: "M18.89 13.23A7 7 0 0 0 19 12v-2", key: "16hl24" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }]
], Yb = e("mic-off", Kb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qb = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
], Jb = e("mic", Qb);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ez = [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
], tz = e("mic-vocal", ez);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const az = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 17h4", key: "pvmtpo" }],
  ["path", { d: "M10 7h4", key: "1vgcok" }],
  ["path", { d: "M18 12h2", key: "quuxs7" }],
  ["path", { d: "M18 18h2", key: "4scel" }],
  ["path", { d: "M18 6h2", key: "1ptzki" }],
  ["path", { d: "M4 12h2", key: "1ltxp0" }],
  ["path", { d: "M4 18h2", key: "1xrofg" }],
  ["path", { d: "M4 6h2", key: "1cx33n" }],
  ["rect", { x: "6", y: "2", width: "12", height: "20", rx: "2", key: "749fme" }]
], hz = e("microchip", az);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oz = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
], cz = e("microscope", oz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dz = [
  ["rect", { width: "20", height: "15", x: "2", y: "4", rx: "2", key: "2no95f" }],
  ["rect", { width: "8", height: "7", x: "6", y: "8", rx: "1", key: "zh9wx" }],
  ["path", { d: "M18 8v7", key: "o5zi4n" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["path", { d: "M18 19v2", key: "1dawf0" }]
], yz = e("microwave", dz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nz = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M12 3v3", key: "1n5kay" }],
  [
    "path",
    {
      d: "M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z",
      key: "1btarq"
    }
  ]
], kz = e("milestone", nz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pz = [
  ["path", { d: "M8 2h8", key: "1ssgc1" }],
  [
    "path",
    {
      d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3",
      key: "y0ejgx"
    }
  ],
  ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435", key: "iaxqsy" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], iz = e("milk-off", pz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sz = [
  ["path", { d: "M8 2h8", key: "1ssgc1" }],
  [
    "path",
    {
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
      key: "qtp12x"
    }
  ],
  ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0", key: "ygeh44" }]
], rz = e("milk", sz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lz = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
], Mz = e("minimize-2", lz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _z = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], vz = e("minimize", _z);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mz = [
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], xz = e("monitor-check", mz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gz = [["path", { d: "M5 12h14", key: "1ays0h" }]], uz = e("minus", gz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fz = [
  ["path", { d: "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z", key: "1da4q6" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
], wz = e("monitor-cloud", fz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nz = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m14.305 7.53.923-.382", key: "1mlnsw" }],
  ["path", { d: "m15.228 4.852-.923-.383", key: "82mpwg" }],
  ["path", { d: "m16.852 3.228-.383-.924", key: "ln4sir" }],
  ["path", { d: "m16.852 8.772-.383.923", key: "1dejw0" }],
  ["path", { d: "m19.148 3.228.383-.924", key: "192kgf" }],
  ["path", { d: "m19.53 9.696-.382-.924", key: "fiavlr" }],
  ["path", { d: "m20.772 4.852.924-.383", key: "1j8mgp" }],
  ["path", { d: "m20.772 7.148.924.383", key: "zix9be" }],
  ["path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "1tnzv8" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }]
], $z = e("monitor-cog", Nz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bz = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  [
    "path",
    { d: "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693", key: "1dx6ho" }
  ],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["circle", { cx: "19", cy: "6", r: "3", key: "108a5v" }]
], zz = e("monitor-dot", bz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qz = [
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["path", { d: "m15 10-3 3-3-3", key: "lzhmyn" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], jz = e("monitor-down", qz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hz = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826", key: "cv7jms" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042", key: "z8ni2w" }]
], Vz = e("monitor-off", Hz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Az = [
  ["path", { d: "M10 13V7", key: "1u13u9" }],
  ["path", { d: "M14 13V7", key: "1vj9om" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], Cz = e("monitor-pause", Az);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lz = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
      key: "vbtd3f"
    }
  ],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
], Sz = e("monitor-play", Lz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pz = [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8", key: "10dyio" }],
  ["path", { d: "M10 19v-3.96 3.15", key: "1irgej" }],
  ["path", { d: "M7 19h5", key: "qswx4l" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2", key: "1egngj" }]
], Rz = e("monitor-smartphone", Pz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tz = [
  ["path", { d: "M5.5 20H8", key: "1k40s5" }],
  ["path", { d: "M17 9h.01", key: "1j24nn" }],
  ["rect", { width: "10", height: "16", x: "12", y: "4", rx: "2", key: "ixliua" }],
  ["path", { d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4", key: "1mp6e1" }],
  ["circle", { cx: "17", cy: "15", r: "1", key: "tqvash" }]
], Bz = e("monitor-speaker", Tz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dz = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }],
  ["rect", { x: "9", y: "7", width: "6", height: "6", rx: "1", key: "5m2oou" }]
], Zz = e("monitor-stop", Dz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fz = [
  ["path", { d: "m14.5 12.5-5-5", key: "1jahn5" }],
  ["path", { d: "m9.5 12.5 5-5", key: "1k2t7b" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], Oz = e("monitor-x", Fz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ez = [
  ["path", { d: "m9 10 3-3 3 3", key: "11gsxs" }],
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], Uz = e("monitor-up", Ez);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gz = [
  ["path", { d: "M18 5h4", key: "1lhgn2" }],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], Iz = e("moon-star", Gz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wz = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], Xz = e("monitor", Wz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kz = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], Yz = e("moon", Kz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qz = [
  ["path", { d: "m18 14-1-3", key: "bdajw9" }],
  ["path", { d: "m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81", key: "f5fotj" }],
  [
    "path",
    { d: "M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5", key: "3i90e2" }
  ],
  ["circle", { cx: "19", cy: "17", r: "3", key: "1otbdv" }],
  ["circle", { cx: "5", cy: "17", r: "3", key: "1d8p0c" }]
], Jz = e("motorbike", Qz);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eq = [
  ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z", key: "otkl63" }],
  [
    "path",
    { d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19", key: "1pvmmp" }
  ]
], tq = e("mountain-snow", eq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aq = [["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z", key: "otkl63" }]], hq = e("mountain", aq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oq = [
  ["path", { d: "M12 6v.343", key: "1gyhex" }],
  ["path", { d: "M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218", key: "ukzz01" }],
  ["path", { d: "M19 13.343V9A7 7 0 0 0 8.56 2.902", key: "104jy9" }],
  ["path", { d: "M22 22 2 2", key: "1r8tn9" }]
], cq = e("mouse-off", oq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dq = [
  [
    "path",
    {
      d: "m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551",
      key: "1qoshx"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  ["path", { d: "m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779", key: "mymuvk" }]
], yq = e("mouse-pointer-2-off", dq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nq = [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
      key: "edeuup"
    }
  ]
], kq = e("mouse-pointer-2", nq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pq = [
  [
    "path",
    {
      d: "M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z",
      key: "11pp1i"
    }
  ],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }],
  ["path", { d: "m11.8 11.8 8.4 8.4", key: "oogvdj" }]
], iq = e("mouse-pointer-ban", pq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sq = [
  ["path", { d: "M14 4.1 12 6", key: "ita8i4" }],
  ["path", { d: "m5.1 8-2.9-.8", key: "1go3kf" }],
  ["path", { d: "m6 12-1.9 2", key: "mnht97" }],
  ["path", { d: "M7.2 2.2 8 5.1", key: "1cfko1" }],
  [
    "path",
    {
      d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      key: "s0h3yz"
    }
  ]
], rq = e("mouse-pointer-click", sq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lq = [
  ["path", { d: "M12.586 12.586 19 19", key: "ea5xo7" }],
  [
    "path",
    {
      d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
      key: "277e5u"
    }
  ]
], Mq = e("mouse-pointer", lq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _q = [
  ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7", key: "11ol66" }],
  ["path", { d: "M12 6v4", key: "16clxf" }]
], vq = e("mouse", _q);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mq = [
  ["path", { d: "M5 3v16h16", key: "1mqmf9" }],
  ["path", { d: "m5 19 6-6", key: "jh6hbb" }],
  ["path", { d: "m2 6 3-3 3 3", key: "tkyvxa" }],
  ["path", { d: "m18 16 3 3-3 3", key: "1d4glt" }]
], xq = e("move-3d", mq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gq = [
  ["path", { d: "M19 13v6h-6", key: "1hxl6d" }],
  ["path", { d: "M5 11V5h6", key: "12e2xe" }],
  ["path", { d: "m5 5 14 14", key: "11anup" }]
], uq = e("move-diagonal-2", gq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fq = [
  ["path", { d: "M11 19H5v-6", key: "8awifj" }],
  ["path", { d: "M13 5h6v6", key: "7voy1q" }],
  ["path", { d: "M19 5 5 19", key: "wwaj1z" }]
], wq = e("move-diagonal", fq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nq = [
  ["path", { d: "M11 19H5V13", key: "1akmht" }],
  ["path", { d: "M19 5L5 19", key: "72u4yj" }]
], $q = e("move-down-left", Nq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bq = [
  ["path", { d: "M19 13V19H13", key: "10vkzq" }],
  ["path", { d: "M5 5L19 19", key: "5zm2fv" }]
], zq = e("move-down-right", bq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qq = [
  ["path", { d: "M8 18L12 22L16 18", key: "cskvfv" }],
  ["path", { d: "M12 2V22", key: "r89rzk" }]
], jq = e("move-down", qq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hq = [
  ["path", { d: "m18 8 4 4-4 4", key: "1ak13k" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }]
], Vq = e("move-horizontal", Hq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aq = [
  ["path", { d: "M6 8L2 12L6 16", key: "kyvwex" }],
  ["path", { d: "M2 12H22", key: "1m8cig" }]
], Cq = e("move-left", Aq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lq = [
  ["path", { d: "M18 8L22 12L18 16", key: "1r0oui" }],
  ["path", { d: "M2 12H22", key: "1m8cig" }]
], Sq = e("move-right", Lq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pq = [
  ["path", { d: "M5 11V5H11", key: "3q78g9" }],
  ["path", { d: "M5 5L19 19", key: "5zm2fv" }]
], Rq = e("move-up-left", Pq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tq = [
  ["path", { d: "M8 6L12 2L16 6", key: "1yvkyx" }],
  ["path", { d: "M12 2V22", key: "r89rzk" }]
], Bq = e("move-up", Tq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dq = [
  ["path", { d: "M13 5H19V11", key: "1n1gyv" }],
  ["path", { d: "M19 5L5 19", key: "72u4yj" }]
], Zq = e("move-up-right", Dq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fq = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], Oq = e("move", Fq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eq = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m8 18 4 4 4-4", key: "bh5tu3" }],
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }]
], Uq = e("move-vertical", Eq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gq = [
  ["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }],
  ["path", { d: "M12 18V2l7 4", key: "g04rme" }]
], Iq = e("music-2", Gq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wq = [
  ["circle", { cx: "12", cy: "18", r: "4", key: "m3r9ws" }],
  ["path", { d: "M16 18V2", key: "40x2m5" }]
], Xq = e("music-3", Wq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kq = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["path", { d: "m9 9 12-2", key: "1e64n2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
], Yq = e("music-4", Kq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qq = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
], Jq = e("music", Qq);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ej = [
  ["path", { d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17", key: "qoq2o2" }],
  ["path", { d: "M14.53 8.88 12 2l-1.17 3.17", key: "k3sjzy" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], tj = e("navigation-2-off", ej);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aj = [
  ["polygon", { points: "12 2 19 21 12 17 5 21 12 2", key: "x8c0qg" }]
], hj = e("navigation-2", aj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oj = [
  ["path", { d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43", key: "1vdtb7" }],
  ["path", { d: "M17.39 11.73 22 2l-9.73 4.61", key: "tya3r6" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], cj = e("navigation-off", oj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dj = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
], yj = e("navigation", dj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nj = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], kj = e("network", nj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pj = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
], ij = e("newspaper", pj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sj = [
  ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36", key: "9iaqei" }],
  ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58", key: "1yha7l" }],
  ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8", key: "4iu2gk" }],
  ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20", key: "sap9u2" }]
], rj = e("nfc", sj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lj = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "m8.5 4 7 4", key: "m1xjk3" }],
  ["path", { d: "m8.5 8 7-4", key: "t0m5j6" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }]
], Mj = e("non-binary", lj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _j = [
  ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4", key: "re6nr2" }],
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  [
    "path",
    {
      d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "pqwjuv"
    }
  ]
], vj = e("notebook-pen", _j);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mj = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M15 2v20", key: "dcj49h" }],
  ["path", { d: "M15 7h5", key: "1xj5lc" }],
  ["path", { d: "M15 12h5", key: "w5shd9" }],
  ["path", { d: "M15 17h5", key: "1qaofu" }]
], xj = e("notebook-tabs", mj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gj = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M9.5 8h5", key: "11mslq" }],
  ["path", { d: "M9.5 12H16", key: "ktog6x" }],
  ["path", { d: "M9.5 16H14", key: "p1seyn" }]
], uj = e("notebook-text", gj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fj = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M16 2v20", key: "rotuqe" }]
], wj = e("notebook", fj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nj = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v2", key: "j91f56" }],
  ["path", { d: "M20 12v2", key: "w8o0tu" }],
  ["path", { d: "M20 18v2a2 2 0 0 1-2 2h-1", key: "1c9ggx" }],
  ["path", { d: "M13 22h-2", key: "191ugt" }],
  ["path", { d: "M7 22H6a2 2 0 0 1-2-2v-2", key: "1rt9px" }],
  ["path", { d: "M4 14v-2", key: "1v0sqh" }],
  ["path", { d: "M4 8V6a2 2 0 0 1 2-2h2", key: "1mwabg" }],
  ["path", { d: "M8 10h6", key: "3oa6kw" }],
  ["path", { d: "M8 14h8", key: "1fgep2" }],
  ["path", { d: "M8 18h5", key: "17enja" }]
], $j = e("notepad-text-dashed", Nj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bj = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "16", height: "18", x: "4", y: "4", rx: "2", key: "1u9h20" }],
  ["path", { d: "M8 10h6", key: "3oa6kw" }],
  ["path", { d: "M8 14h8", key: "1fgep2" }],
  ["path", { d: "M8 18h5", key: "17enja" }]
], zj = e("notepad-text", bj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qj = [
  ["path", { d: "M12 4V2", key: "1k5q1u" }],
  [
    "path",
    {
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939",
      key: "1xcvy9"
    }
  ],
  ["path", { d: "M19 10v3.343", key: "163tfc" }],
  [
    "path",
    {
      d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192",
      key: "17914v"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], jj = e("nut-off", qj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hj = [
  ["path", { d: "M12 4V2", key: "1k5q1u" }],
  [
    "path",
    {
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
      key: "1tgyif"
    }
  ],
  [
    "path",
    {
      d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
      key: "tnsqj"
    }
  ]
], Vj = e("nut", Hj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aj = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], Cj = e("octagon-alert", Aj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lj = [
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], Sj = e("octagon-minus", Lj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pj = [
  ["path", { d: "M10 15V9", key: "1lckn7" }],
  ["path", { d: "M14 15V9", key: "1muqhk" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ]
], Rj = e("octagon-pause", Pj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tj = [
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Bj = e("octagon-x", Tj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dj = [
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ]
], Zj = e("octagon", Dj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fj = [
  [
    "path",
    {
      d: "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",
      key: "1x94xo"
    }
  ]
], Oj = e("omega", Fj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ej = [
  ["path", { d: "M3 3h6l6 18h6", key: "ph9rgk" }],
  ["path", { d: "M14 3h7", key: "16f0ms" }]
], Uj = e("option", Ej);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gj = [
  ["path", { d: "M20.341 6.484A10 10 0 0 1 10.266 21.85", key: "1enhxb" }],
  ["path", { d: "M3.659 17.516A10 10 0 0 1 13.74 2.152", key: "1crzgf" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }]
], Ij = e("orbit", Gj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wj = [
  ["path", { d: "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025", key: "1bx4vc" }],
  [
    "path",
    {
      d: "m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009",
      key: "1h3km6"
    }
  ],
  [
    "path",
    {
      d: "m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",
      key: "1hj4wg"
    }
  ]
], Xj = e("origami", Wj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kj = [
  ["path", { d: "M12 3v6", key: "1holv5" }],
  [
    "path",
    {
      d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
      key: "187q7i"
    }
  ],
  ["path", { d: "M3.054 9.013h17.893", key: "grwhos" }]
], Yj = e("package-2", Kj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qj = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
], Jj = e("package-check", Qj);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eH = [
  ["path", { d: "M16 16h6", key: "100bgy" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
], tH = e("package-minus", eH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aH = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
], hH = e("package-open", aH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oH = [
  ["path", { d: "M16 16h6", key: "100bgy" }],
  ["path", { d: "M19 13v6", key: "85cyf1" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
], cH = e("package-plus", oH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dH = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
], yH = e("package-search", dH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nH = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["path", { d: "m17 13 5 5m-5 0 5-5", key: "im3w4b" }]
], kH = e("package-x", nH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pH = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], iH = e("package", pH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sH = [
  ["path", { d: "M11 7 6 2", key: "1jwth8" }],
  ["path", { d: "M18.992 12H2.041", key: "xw1gg" }],
  [
    "path",
    {
      d: "M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595",
      key: "1nkol4"
    }
  ],
  [
    "path",
    {
      d: "m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33",
      key: "1nk1rd"
    }
  ]
], rH = e("paint-bucket", sH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lH = [
  ["rect", { width: "16", height: "6", x: "2", y: "2", rx: "2", key: "jcyz7m" }],
  ["path", { d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", key: "1b9h7c" }],
  ["rect", { width: "4", height: "6", x: "8", y: "16", rx: "1", key: "d6e7yl" }]
], MH = e("paint-roller", lH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _H = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v4", key: "qmzblu" }],
  ["path", { d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z", key: "ycvu00" }],
  [
    "path",
    {
      d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
      key: "iw4wnp"
    }
  ]
], vH = e("paintbrush-vertical", _H);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mH = [
  ["path", { d: "m14.622 17.897-10.68-2.913", key: "vj2p1u" }],
  [
    "path",
    {
      d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
      key: "18tc5c"
    }
  ],
  [
    "path",
    {
      d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
      key: "ytzfxy"
    }
  ]
], xH = e("paintbrush", mH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gH = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], uH = e("palette", gH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fH = [
  ["path", { d: "M11.25 17.25h1.5L12 18z", key: "1wmwwj" }],
  ["path", { d: "m15 12 2 2", key: "k60wz4" }],
  ["path", { d: "M18 6.5a.5.5 0 0 0-.5-.5", key: "1ch4h4" }],
  [
    "path",
    {
      d: "M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83",
      key: "1c660l"
    }
  ],
  ["path", { d: "M6 6.5a.495.495 0 0 1 .5-.5", key: "eviuep" }],
  ["path", { d: "m9 12-2 2", key: "326nkw" }]
], wH = e("panda", fH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "m15 8-3 3-3-3", key: "1oxy1z" }]
], $H = e("panel-bottom-close", NH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M14 15h1", key: "171nev" }],
  ["path", { d: "M19 15h2", key: "1vnucp" }],
  ["path", { d: "M3 15h2", key: "8bym0q" }],
  ["path", { d: "M9 15h1", key: "1tg3ks" }]
], zH = e("panel-bottom-dashed", bH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "m9 10 3-3 3 3", key: "11gsxs" }]
], jH = e("panel-bottom-open", qH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], VH = e("panel-bottom", HH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
], CH = e("panel-left-close", AH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 14v1", key: "askpd8" }],
  ["path", { d: "M9 19v2", key: "16tejx" }],
  ["path", { d: "M9 3v2", key: "1noubl" }],
  ["path", { d: "M9 9v1", key: "19ebxg" }]
], SH = e("panel-left-dashed", LH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
], RH = e("panel-left-open", PH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TH = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  ["path", { d: "M15 15v-1", key: "6a4afx" }],
  ["path", { d: "M15 21v-2", key: "1qshmc" }],
  ["path", { d: "M15 5V3", key: "1fk0mb" }],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["path", { d: "M9 15v-1", key: "9lx740" }],
  ["path", { d: "M9 21v-2", key: "1fwk0n" }],
  ["path", { d: "M9 5V3", key: "2q8zi6" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], BH = e("panel-left-right-dashed", TH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
], ZH = e("panel-left", DH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["path", { d: "m8 9 3 3-3 3", key: "12hl5m" }]
], OH = e("panel-right-close", FH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 14v1", key: "ilsfch" }],
  ["path", { d: "M15 19v2", key: "1fst2f" }],
  ["path", { d: "M15 3v2", key: "z204g4" }],
  ["path", { d: "M15 9v1", key: "z2a8b1" }]
], UH = e("panel-right-dashed", EH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["path", { d: "m10 15-3-3 3-3", key: "1pgupc" }]
], IH = e("panel-right-open", GH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], XH = e("panel-right", WH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KH = [
  ["path", { d: "M14 15h1", key: "171nev" }],
  ["path", { d: "M14 9h1", key: "l0svgy" }],
  ["path", { d: "M19 15h2", key: "1vnucp" }],
  ["path", { d: "M19 9h2", key: "te2zfg" }],
  ["path", { d: "M3 15h2", key: "8bym0q" }],
  ["path", { d: "M3 9h2", key: "1h4ldw" }],
  ["path", { d: "M9 15h1", key: "1tg3ks" }],
  ["path", { d: "M9 9h1", key: "15jzuz" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], YH = e("panel-top-bottom-dashed", KH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QH = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "m9 16 3-3 3 3", key: "1idcnm" }]
], JH = e("panel-top-close", QH);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M14 9h1", key: "l0svgy" }],
  ["path", { d: "M19 9h2", key: "te2zfg" }],
  ["path", { d: "M3 9h2", key: "1h4ldw" }],
  ["path", { d: "M9 9h1", key: "15jzuz" }]
], tV = e("panel-top-dashed", eV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "m15 14-3 3-3-3", key: "g215vf" }]
], hV = e("panel-top-open", aV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }]
], cV = e("panel-top", oV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M9 15h12", key: "5ijen5" }]
], yV = e("panels-left-bottom", dV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h12", key: "1wkqb3" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], kV = e("panels-right-bottom", nV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pV = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }
  ]
], iV = e("paperclip", pV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sV = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
], rV = e("panels-top-left", sV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lV = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9", key: "uto9ud" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9", key: "4w2vsq" }]
], MV = e("parentheses", lV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _V = [
  ["path", { d: "M11 15h2", key: "199qp6" }],
  ["path", { d: "M12 12v3", key: "158kv8" }],
  ["path", { d: "M12 19v3", key: "npa21l" }],
  [
    "path",
    {
      d: "M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",
      key: "1jofit"
    }
  ],
  ["path", { d: "M9 9a3 3 0 1 1 6 0", key: "jdoeu8" }]
], vV = e("parking-meter", _V);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mV = [
  ["path", { d: "M5.8 11.3 2 22l10.7-3.79", key: "gwxi1d" }],
  ["path", { d: "M4 3h.01", key: "1vcuye" }],
  ["path", { d: "M22 8h.01", key: "1mrtc2" }],
  ["path", { d: "M15 2h.01", key: "1cjtqr" }],
  ["path", { d: "M22 20h.01", key: "1mrys2" }],
  [
    "path",
    {
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
      key: "hbicv8"
    }
  ],
  [
    "path",
    { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17", key: "1i94pl" }
  ],
  ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7", key: "1cofks" }],
  [
    "path",
    {
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
      key: "4kbmks"
    }
  ]
], xV = e("party-popper", mV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gV = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], uV = e("pause", gV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fV = [
  ["circle", { cx: "11", cy: "4", r: "2", key: "vol9p0" }],
  ["circle", { cx: "18", cy: "8", r: "2", key: "17gozi" }],
  ["circle", { cx: "20", cy: "16", r: "2", key: "1v9bxh" }],
  [
    "path",
    {
      d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
      key: "1ydw1z"
    }
  ]
], wV = e("paw-print", fV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NV = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", key: "1uq1d7" }],
  ["path", { d: "M15 14h.01", key: "1kp3bh" }],
  ["path", { d: "M9 6h6", key: "dgm16u" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
], $V = e("pc-case", NV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bV = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], zV = e("pen-line", bV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qV = [
  [
    "path",
    {
      d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
      key: "bjo8r8"
    }
  ],
  ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353", key: "16h5ne" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], jV = e("pen-off", qV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HV = [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
], VV = e("pen-tool", HV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AV = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], CV = e("pen", AV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LV = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], SV = e("pencil-line", LV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PV = [
  [
    "path",
    {
      d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
      key: "bjo8r8"
    }
  ],
  ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353", key: "16h5ne" }],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], RV = e("pencil-off", PV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TV = [
  [
    "path",
    { d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13", key: "orapub" }
  ],
  ["path", { d: "m8 6 2-2", key: "115y1s" }],
  ["path", { d: "m18 16 2-2", key: "ee94s4" }],
  [
    "path",
    {
      d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
      key: "cfq27r"
    }
  ],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], BV = e("pencil-ruler", TV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DV = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], ZV = e("pencil", DV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FV = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], OV = e("pentagon", FV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EV = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
], UV = e("percent", EV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GV = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["path", { d: "m9 20 3-6 3 6", key: "se2kox" }],
  ["path", { d: "m6 8 6 2 6-2", key: "4o3us4" }],
  ["path", { d: "M12 10v4", key: "1kjpxc" }]
], IV = e("person-standing", GV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WV = [
  ["path", { d: "M20 11H4", key: "6ut86h" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7", key: "1ana5r" }]
], XV = e("philippine-peso", WV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KV = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], YV = e("phone-call", KV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QV = [
  ["path", { d: "M14 6h8", key: "yd68k4" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], JV = e("phone-forwarded", QV);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eA = [
  ["path", { d: "M16 2v6h6", key: "1mfrl5" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], tA = e("phone-incoming", eA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aA = [
  ["path", { d: "m16 2 6 6", key: "1gw87d" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], hA = e("phone-missed", aA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oA = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
], cA = e("phone-off", oA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dA = [
  ["path", { d: "m16 8 6-6", key: "oawc05" }],
  ["path", { d: "M22 8V2h-6", key: "oqy2zc" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], yA = e("phone-outgoing", dA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nA = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
], kA = e("phone", nA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pA = [
  ["line", { x1: "9", x2: "9", y1: "4", y2: "20", key: "ovs5a5" }],
  ["path", { d: "M4 7c0-1.7 1.3-3 3-3h13", key: "10pag4" }],
  ["path", { d: "M18 20c-1.7 0-3-1.3-3-3V4", key: "1gaosr" }]
], iA = e("pi", pA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sA = [
  [
    "path",
    {
      d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8",
      key: "lag0yf"
    }
  ],
  ["path", { d: "M2 14h20", key: "myj16y" }],
  ["path", { d: "M6 14v4", key: "9ng0ue" }],
  ["path", { d: "M10 14v4", key: "1v8uk5" }],
  ["path", { d: "M14 14v4", key: "1tqops" }],
  ["path", { d: "M18 14v4", key: "18uqwm" }]
], rA = e("piano", sA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lA = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999", key: "1lw9ds" }],
  [
    "path",
    {
      d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024",
      key: "ffj4ej"
    }
  ],
  [
    "path",
    {
      d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069",
      key: "8tj4zw"
    }
  ],
  [
    "path",
    {
      d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
      key: "hh6h97"
    }
  ]
], MA = e("pickaxe", lA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _A = [
  ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4", key: "daa4of" }],
  ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2", key: "1nb8gs" }]
], vA = e("picture-in-picture-2", _A);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mA = [
  ["path", { d: "M2 10h6V4", key: "zwrco" }],
  ["path", { d: "m2 4 6 6", key: "ug085t" }],
  ["path", { d: "M21 10V7a2 2 0 0 0-2-2h-7", key: "git5jr" }],
  ["path", { d: "M3 14v2a2 2 0 0 0 2 2h3", key: "1f7fh3" }],
  ["rect", { x: "12", y: "14", width: "10", height: "7", rx: "1", key: "1wjs3o" }]
], xA = e("picture-in-picture", mA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gA = [
  [
    "path",
    {
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
      key: "1piglc"
    }
  ],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M2 8v1a2 2 0 0 0 2 2h1", key: "1env43" }]
], uA = e("piggy-bank", gA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fA = [
  ["path", { d: "M14 3v11", key: "mlfb7b" }],
  ["path", { d: "M14 9h-3a3 3 0 0 1 0-6h9", key: "1ulc19" }],
  ["path", { d: "M18 3v11", key: "1phi0r" }],
  ["path", { d: "M22 18H2l4-4", key: "yt65j9" }],
  ["path", { d: "m6 22-4-4", key: "6jgyf5" }]
], wA = e("pilcrow-left", fA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NA = [
  ["path", { d: "M10 3v11", key: "o3l5kj" }],
  ["path", { d: "M10 9H7a1 1 0 0 1 0-6h8", key: "1wb1nc" }],
  ["path", { d: "M14 3v11", key: "mlfb7b" }],
  ["path", { d: "m18 14 4 4H2", key: "4r8io1" }],
  ["path", { d: "m22 18-4 4", key: "1hjjrd" }]
], $A = e("pilcrow-right", NA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bA = [
  ["path", { d: "M13 4v16", key: "8vvj80" }],
  ["path", { d: "M17 4v16", key: "7dpous" }],
  ["path", { d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13", key: "sh4n9v" }]
], zA = e("pilcrow", bA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qA = [
  ["path", { d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4", key: "17ldeb" }],
  ["path", { d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7", key: "nc37y6" }],
  ["rect", { width: "16", height: "5", x: "4", y: "2", rx: "1", key: "3jeezo" }]
], jA = e("pill-bottle", qA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HA = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
], VA = e("pill", HA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AA = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
], CA = e("pin-off", AA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LA = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
], SA = e("pin", LA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PA = [
  [
    "path",
    {
      d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
      key: "1y3wsu"
    }
  ],
  [
    "path",
    {
      d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
      key: "110lr1"
    }
  ],
  ["path", { d: "m2 22 .414-.414", key: "jhxm08" }]
], RA = e("pipette", PA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TA = [
  ["path", { d: "m12 14-1 1", key: "11onhr" }],
  ["path", { d: "m13.75 18.25-1.25 1.42", key: "1yisr3" }],
  ["path", { d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12", key: "1qtqk6" }],
  ["path", { d: "M18.8 9.3a1 1 0 0 0 2.1 7.7", key: "fbbbr2" }],
  [
    "path",
    {
      d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
      key: "1hyfdd"
    }
  ]
], BA = e("pizza", TA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DA = [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
      key: "1ma21e"
    }
  ]
], ZA = e("plane-landing", DA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FA = [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
      key: "fkigj9"
    }
  ]
], OA = e("plane-takeoff", FA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EA = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
], UA = e("plane", EA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GA = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], IA = e("play", GA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WA = [
  ["path", { d: "M9 2v6", key: "17ngun" }],
  ["path", { d: "M15 2v6", key: "s7yy2p" }],
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M5 8h14", key: "pcz4l3" }],
  ["path", { d: "M6 11V8h12v3a6 6 0 1 1-12 0Z", key: "wtfw2c" }]
], XA = e("plug-2", WA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KA = [
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  ["path", { d: "m18 3-4 4h6l-4 4", key: "16psg9" }]
], YA = e("plug-zap", KA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QA = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  [
    "path",
    { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
  ],
  ["path", { d: "M9 8V2", key: "14iosj" }]
], JA = e("plug", QA);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eC = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], tC = e("plus", eC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aC = [
  ["path", { d: "M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z", key: "1uodqw" }],
  ["path", { d: "m8 10 4 4 4-4", key: "1mxd5q" }]
], hC = e("pocket", aC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oC = [
  ["path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2", key: "19w3oe" }],
  ["path", { d: "M18 6h.01", key: "1v4wsw" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z", key: "6fykxj" }],
  ["path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6", key: "1utzek" }]
], cC = e("pocket-knife", oC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dC = [
  [
    "path",
    { d: "M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z", fill: "currentColor", key: "x1mxqr" }
  ],
  ["path", { d: "M16.85 18.58a9 9 0 1 0-9.7 0", key: "d71mpg" }],
  ["path", { d: "M8 14a5 5 0 1 1 8 0", key: "fc81rn" }],
  ["circle", { cx: "12", cy: "11", r: "1", fill: "currentColor", key: "vqiwd" }]
], yC = e("podcast", dC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nC = [
  ["path", { d: "M10 4.5V4a2 2 0 0 0-2.41-1.957", key: "jsi14n" }],
  ["path", { d: "M13.9 8.4a2 2 0 0 0-1.26-1.295", key: "hirc7f" }],
  [
    "path",
    { d: "M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158", key: "1jxb2e" }
  ],
  [
    "path",
    {
      d: "m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343",
      key: "10r7hm"
    }
  ],
  ["path", { d: "M6 6v8", key: "tv5xkp" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], kC = e("pointer-off", nC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pC = [
  ["path", { d: "M22 14a8 8 0 0 1-8 8", key: "56vcr3" }],
  ["path", { d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1agjmk" }],
  ["path", { d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1", key: "wdbh2u" }],
  ["path", { d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10", key: "1ibuk9" }],
  [
    "path",
    {
      d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
      key: "g6ys72"
    }
  ]
], iC = e("pointer", pC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sC = [
  [
    "path",
    {
      d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",
      key: "10td1f"
    }
  ],
  ["path", { d: "M10 22 9 8", key: "yjptiv" }],
  ["path", { d: "m14 22 1-14", key: "8jwc8b" }],
  [
    "path",
    {
      d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
      key: "1qo33t"
    }
  ]
], rC = e("popcorn", sC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lC = [
  [
    "path",
    {
      d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z",
      key: "1o68ps"
    }
  ],
  ["path", { d: "m22 22-5.5-5.5", key: "17o70y" }]
], MC = e("popsicle", lC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _C = [
  ["path", { d: "M18 7c0-5.333-8-5.333-8 0", key: "1prm2n" }],
  ["path", { d: "M10 7v14", key: "18tmcs" }],
  ["path", { d: "M6 21h12", key: "4dkmi1" }],
  ["path", { d: "M6 13h10", key: "ybwr4a" }]
], vC = e("pound-sterling", _C);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mC = [
  ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15", key: "dxknvb" }],
  ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68", key: "1x7qb5" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], xC = e("power-off", mC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gC = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], uC = e("power", gC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fC = [
  ["path", { d: "M2 3h20", key: "91anmk" }],
  ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", key: "2k9sn8" }],
  ["path", { d: "m7 21 5-5 5 5", key: "bip4we" }]
], wC = e("presentation", fC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NC = [
  ["path", { d: "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5", key: "qeb09x" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2", key: "1md90i" }],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }]
], $C = e("printer-check", NC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bC = [
  ["path", { d: "M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377", key: "1w39xo" }],
  ["path", { d: "m16.5 16.5 5 5", key: "zc9lw7" }],
  ["path", { d: "m16.5 21.5 5-5", key: "1fr29m" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5", key: "18he39" }],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }]
], zC = e("printer-x", bC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qC = [
  ["path", { d: "M5 7 3 5", key: "1yys58" }],
  ["path", { d: "M9 6V3", key: "1ptz9u" }],
  ["path", { d: "m13 7 2-2", key: "1w3vmq" }],
  ["circle", { cx: "9", cy: "13", r: "3", key: "1mma13" }],
  [
    "path",
    {
      d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",
      key: "2frwzc"
    }
  ],
  ["path", { d: "M16 16h2", key: "dnq2od" }]
], jC = e("projector", qC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HC = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
], VC = e("printer", HC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AC = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M12 9v11", key: "1fnkrn" }],
  ["path", { d: "M2 9h13a2 2 0 0 1 2 2v9", key: "11z3ex" }]
], CC = e("proportions", AC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LC = [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
], SC = e("puzzle", LC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PC = [
  [
    "path",
    {
      d: "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",
      key: "aenxs0"
    }
  ],
  ["path", { d: "M12 2v20", key: "t6zp3m" }]
], RC = e("pyramid", PC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TC = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
], BC = e("qr-code", TC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DC = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
], ZC = e("quote", DC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FC = [
  ["path", { d: "M13 16a3 3 0 0 1 2.24 5", key: "1epib5" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  [
    "path",
    {
      d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3",
      key: "ue9ozu"
    }
  ],
  ["path", { d: "M20 8.54V4a2 2 0 1 0-4 0v3", key: "49iql8" }],
  ["path", { d: "M7.612 12.524a3 3 0 1 0-1.6 4.3", key: "1e33i0" }]
], OC = e("rabbit", FC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EC = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
], UC = e("radar", EC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GC = [
  [
    "path",
    {
      d: "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",
      key: "1mqj8i"
    }
  ]
], IC = e("radical", GC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WC = [
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  [
    "path",
    {
      d: "M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z",
      key: "1y4lzb"
    }
  ],
  [
    "path",
    {
      d: "M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z",
      key: "163ggk"
    }
  ],
  [
    "path",
    {
      d: "M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z",
      key: "1l9i0b"
    }
  ]
], XC = e("radiation", WC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KC = [
  ["path", { d: "M5 16v2", key: "g5qcv5" }],
  ["path", { d: "M19 16v2", key: "1gbaio" }],
  ["rect", { width: "20", height: "8", x: "2", y: "8", rx: "2", key: "vjsjur" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }]
], YC = e("radio-receiver", KC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QC = [
  ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9", key: "s0qx1y" }],
  ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5", key: "1idnkw" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }],
  ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47", key: "ojru2q" }],
  ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1", key: "rhi7fg" }],
  ["path", { d: "M9.5 18h5", key: "mfy3pd" }],
  ["path", { d: "m8 22 4-11 4 11", key: "25yftu" }]
], JC = e("radio-tower", QC);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eL = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], tL = e("radio", eL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aL = [
  ["path", { d: "M20.34 17.52a10 10 0 1 0-2.82 2.82", key: "fydyku" }],
  ["circle", { cx: "19", cy: "19", r: "2", key: "17f5cg" }],
  ["path", { d: "m13.41 13.41 4.18 4.18", key: "1gqbwc" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], hL = e("radius", aL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oL = [
  ["path", { d: "M22 17a10 10 0 0 0-20 0", key: "ozegv" }],
  ["path", { d: "M6 17a6 6 0 0 1 12 0", key: "5giftw" }],
  ["path", { d: "M10 17a2 2 0 0 1 4 0", key: "gnsikk" }]
], cL = e("rainbow", oL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dL = [
  ["path", { d: "M5 15h14", key: "m0yey3" }],
  ["path", { d: "M5 9h14", key: "7tsvo6" }],
  ["path", { d: "m14 20-5-5 6-6-5-5", key: "1jo42i" }]
], yL = e("rail-symbol", dL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nL = [
  ["path", { d: "M13 22H4a2 2 0 0 1 0-4h12", key: "bt3f23" }],
  ["path", { d: "M13.236 18a3 3 0 0 0-2.2-5", key: "1tbvmo" }],
  ["path", { d: "M16 9h.01", key: "1bdo4e" }],
  [
    "path",
    {
      d: "M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3",
      key: "9ch7kn"
    }
  ],
  ["path", { d: "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18", key: "3s7e9i" }]
], kL = e("rat", nL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pL = [
  ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2", key: "1oxtiu" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
], iL = e("ratio", pL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M12 6.5v11", key: "ecfhkf" }],
  ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2", key: "1makmb" }]
], rL = e("receipt-cent", sL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M8 12h5", key: "1g6qi8" }],
  ["path", { d: "M16 9.5a4 4 0 1 0 0 5.2", key: "b2px4r" }]
], ML = e("receipt-euro", lL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _L = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["path", { d: "M12 17.5 8 15h1a4 4 0 0 0 0-8", key: "grpkl4" }],
  ["path", { d: "M8 11h8", key: "vwpz6n" }]
], vL = e("receipt-indian-rupee", _L);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "m12 10 3-3", key: "1mc12w" }],
  ["path", { d: "m9 7 3 3v7.5", key: "39i0xv" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }]
], xL = e("receipt-japanese-yen", mL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M8 13h5", key: "1k9z8w" }],
  ["path", { d: "M10 17V9.5a2.5 2.5 0 0 1 5 0", key: "1dzgp0" }],
  ["path", { d: "M8 17h7", key: "8mjdqu" }]
], uL = e("receipt-pound-sterling", gL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M8 15h5", key: "vxg57a" }],
  ["path", { d: "M8 11h5a2 2 0 1 0 0-4h-3v10", key: "1usi5u" }]
], wL = e("receipt-russian-ruble", fL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M10 17V7h5", key: "k7jq18" }],
  ["path", { d: "M10 11h4", key: "1i0mka" }],
  ["path", { d: "M8 15h5", key: "vxg57a" }]
], $L = e("receipt-swiss-franc", NL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bL = [
  ["path", { d: "M13 16H8", key: "wsln4y" }],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
      key: "ycz6yz"
    }
  ]
], zL = e("receipt-text", bL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qL = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
], jL = e("receipt", qL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HL = [
  ["path", { d: "M10 6.5v11a5.5 5.5 0 0 0 5.5-5.5", key: "nw10mp" }],
  ["path", { d: "m14 8-6 3", key: "2tb98i" }],
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z", key: "io9ry0" }
  ]
], VL = e("receipt-turkish-lira", HL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AL = [
  ["path", { d: "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z", key: "1m5n7q" }],
  ["circle", { cx: "14", cy: "12", r: "8", key: "1pag6k" }]
], CL = e("rectangle-circle", AL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LL = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M17 12h.01", key: "1m0b6t" }],
  ["path", { d: "M7 12h.01", key: "eqddd0" }]
], SL = e("rectangle-ellipsis", LL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PL = [
  [
    "path",
    {
      d: "M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      key: "d5y1f"
    }
  ]
], RL = e("rectangle-goggles", PL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TL = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
], BL = e("rectangle-horizontal", TL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DL = [
  ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2", key: "1oxtiu" }]
], ZL = e("rectangle-vertical", DL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FL = [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
], OL = e("redo-2", FL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EL = [
  ["circle", { cx: "12", cy: "17", r: "1", key: "1ixnty" }],
  ["path", { d: "M21 7v6h-6", key: "3ptur4" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]
], UL = e("redo-dot", EL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GL = [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu"
    }
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5"
    }
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }]
], IL = e("recycle", GL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WL = [
  ["path", { d: "M21 7v6h-6", key: "3ptur4" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]
], XL = e("redo", WL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KL = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], YL = e("refresh-ccw-dot", KL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QL = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
], JL = e("refresh-ccw", QL);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eS = [
  ["path", { d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47", key: "1krf6h" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ["path", { d: "M3 12C3 9.51 4 7.26 5.64 5.64", key: "ruvoct" }],
  ["path", { d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64", key: "19q130" }],
  ["path", { d: "M21 12c0 1-.16 1.97-.47 2.87", key: "4w8emr" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M22 22 2 2", key: "1r8tn9" }]
], tS = e("refresh-cw-off", eS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], hS = e("refresh-cw", aS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oS = [
  [
    "path",
    { d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z", key: "fpq118" }
  ],
  ["path", { d: "M5 10h14", key: "elsbfy" }],
  ["path", { d: "M15 7v6", key: "1nx30x" }]
], cS = e("refrigerator", oS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dS = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], yS = e("regex", dS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nS = [
  ["path", { d: "M4 7V4h16v3", key: "9msm58" }],
  ["path", { d: "M5 20h6", key: "1h6pxn" }],
  ["path", { d: "M13 4 8 20", key: "kqq6aj" }],
  ["path", { d: "m15 15 5 5", key: "me55sn" }],
  ["path", { d: "m20 15-5 5", key: "11p7ol" }]
], kS = e("remove-formatting", nS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pS = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }],
  ["path", { d: "M11 10h1v4", key: "70cz1p" }]
], iS = e("repeat-1", pS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sS = [
  ["path", { d: "m2 9 3-3 3 3", key: "1ltn5i" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6", key: "1r6tfw" }],
  ["path", { d: "m22 15-3 3-3-3", key: "4rnwn2" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10", key: "2f72bc" }]
], rS = e("repeat-2", sS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lS = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
], MS = e("repeat", lS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _S = [
  ["path", { d: "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "zg1ipl" }],
  ["path", { d: "M14 4a1 1 0 0 1 1-1", key: "dhj8ez" }],
  ["path", { d: "M15 10a1 1 0 0 1-1-1", key: "1mnyi5" }],
  ["path", { d: "M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "txt6k4" }],
  ["path", { d: "M21 4a1 1 0 0 0-1-1", key: "sfs9ap" }],
  ["path", { d: "M21 9a1 1 0 0 1-1 1", key: "mp6qeo" }],
  ["path", { d: "m3 7 3 3 3-3", key: "x25e72" }],
  ["path", { d: "M6 10V5a2 2 0 0 1 2-2h2", key: "15xut4" }],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }]
], vS = e("replace-all", _S);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mS = [
  ["path", { d: "M14 4a1 1 0 0 1 1-1", key: "dhj8ez" }],
  ["path", { d: "M15 10a1 1 0 0 1-1-1", key: "1mnyi5" }],
  ["path", { d: "M21 4a1 1 0 0 0-1-1", key: "sfs9ap" }],
  ["path", { d: "M21 9a1 1 0 0 1-1 1", key: "mp6qeo" }],
  ["path", { d: "m3 7 3 3 3-3", key: "x25e72" }],
  ["path", { d: "M6 10V5a2 2 0 0 1 2-2h2", key: "15xut4" }],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }]
], xS = e("replace", mS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gS = [
  ["path", { d: "m12 17-5-5 5-5", key: "1s3y5u" }],
  ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7", key: "1fcyog" }],
  ["path", { d: "m7 17-5-5 5-5", key: "1ed8i2" }]
], uS = e("reply-all", gS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fS = [
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }],
  ["path", { d: "m9 17-5-5 5-5", key: "nvlc11" }]
], wS = e("reply", fS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NS = [
  [
    "path",
    { d: "M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z", key: "2a1g8i" }
  ],
  [
    "path",
    { d: "M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z", key: "rg3s36" }
  ]
], $S = e("rewind", NS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bS = [
  [
    "path",
    { d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22", key: "1rnhq3" }
  ],
  ["path", { d: "m12 18 2.57-3.5", key: "116vt7" }],
  ["path", { d: "M6.243 9.016a7 7 0 0 1 11.507-.009", key: "10dq0b" }],
  ["path", { d: "M9.35 14.53 12 11.22", key: "tdsyp2" }],
  [
    "path",
    {
      d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
      key: "nmifey"
    }
  ]
], zS = e("ribbon", bS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qS = [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
], jS = e("rocket", qS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HS = [
  ["polyline", { points: "3.5 2 6.5 12.5 18 12.5", key: "y3iy52" }],
  ["line", { x1: "9.5", x2: "5.5", y1: "12.5", y2: "20", key: "19vg5i" }],
  ["line", { x1: "15", x2: "18.5", y1: "12.5", y2: "20", key: "1inpmv" }],
  ["path", { d: "M2.75 18a13 13 0 0 0 18.5 0", key: "1nquas" }]
], VS = e("rocking-chair", HS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AS = [
  ["path", { d: "M6 19V5", key: "1r845m" }],
  ["path", { d: "M10 19V6.8", key: "9j2tfs" }],
  ["path", { d: "M14 19v-7.8", key: "10s8qv" }],
  ["path", { d: "M18 5v4", key: "1tajlv" }],
  ["path", { d: "M18 19v-6", key: "ielfq3" }],
  ["path", { d: "M22 19V9", key: "158nzp" }],
  ["path", { d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65", key: "1930oh" }]
], CS = e("roller-coaster", AS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LS = [
  ["path", { d: "M17 10h-1a4 4 0 1 1 4-4v.534", key: "7qf5zm" }],
  [
    "path",
    { d: "M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31", key: "1et29u" }
  ],
  [
    "path",
    {
      d: "M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2",
      key: "kiv2lz"
    }
  ],
  ["path", { d: "M9.77 12C4 15 2 22 2 22", key: "h28rw0" }],
  ["circle", { cx: "17", cy: "8", r: "2", key: "1330xn" }]
], SS = e("rose", LS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PS = [
  [
    "path",
    {
      d: "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",
      key: "10n0gc"
    }
  ],
  ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814", key: "16shm9" }],
  [
    "path",
    {
      d: "M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",
      key: "1lxi77"
    }
  ]
], RS = e("rotate-3d", PS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TS = [
  ["path", { d: "m14.5 9.5 1 1", key: "159eiq" }],
  ["path", { d: "m15.5 8.5-4 4", key: "iirg3q" }],
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8", key: "g2jlw" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["circle", { cx: "10", cy: "14", r: "2", key: "1239so" }]
], BS = e("rotate-ccw-key", TS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DS = [
  ["path", { d: "M20 9V7a2 2 0 0 0-2-2h-6", key: "19z8uc" }],
  ["path", { d: "m15 2-3 3 3 3", key: "177bxs" }],
  ["path", { d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2", key: "d36hnl" }]
], ZS = e("rotate-ccw-square", DS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], OS = e("rotate-ccw", FS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ES = [
  ["path", { d: "M12 5H6a2 2 0 0 0-2 2v3", key: "l96uqu" }],
  ["path", { d: "m9 8 3-3-3-3", key: "1gzgc3" }],
  ["path", { d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", key: "1w2k5h" }]
], US = e("rotate-cw-square", ES);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GS = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
], IS = e("rotate-cw", GS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WS = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5c.4 0 .9-.1 1.3-.2", key: "1effex" }],
  ["path", { d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12", key: "k9y2ds" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3", key: "11nlu2" }],
  ["path", { d: "M15 5h-4.3", key: "6537je" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], XS = e("route-off", WS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KS = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
], YS = e("route", KS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QS = [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6.01 18H6", key: "19vcac" }],
  ["path", { d: "M10.01 18H10", key: "uamcmx" }],
  ["path", { d: "M15 10v4", key: "qjz1xs" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0", key: "1rif40" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0", key: "6a5xfq" }]
], JS = e("router", QS);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eP = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }]
], tP = e("rows-2", eP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aP = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 9H3", key: "1338ky" }],
  ["path", { d: "M21 15H3", key: "9uk58r" }]
], hP = e("rows-3", aP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oP = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 7.5H3", key: "1hm9pq" }],
  ["path", { d: "M21 12H3", key: "2avoz0" }],
  ["path", { d: "M21 16.5H3", key: "n7jzkj" }]
], cP = e("rows-4", oP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dP = [
  ["path", { d: "M4 11a9 9 0 0 1 9 9", key: "pv89mb" }],
  ["path", { d: "M4 4a16 16 0 0 1 16 16", key: "k0647b" }],
  ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
], yP = e("rss", dP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nP = [
  ["path", { d: "M10 15v-3", key: "1pjskw" }],
  ["path", { d: "M14 15v-3", key: "1o1mqj" }],
  ["path", { d: "M18 15v-3", key: "cws6he" }],
  ["path", { d: "M2 8V4", key: "3jv1jz" }],
  ["path", { d: "M22 6H2", key: "1iqbfk" }],
  ["path", { d: "M22 8V4", key: "16f4ou" }],
  ["path", { d: "M6 15v-3", key: "1ij1qe" }],
  ["rect", { x: "2", y: "12", width: "20", height: "8", rx: "2", key: "1tqiko" }]
], kP = e("ruler-dimension-line", nP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pP = [
  ["path", { d: "M6 11h8a4 4 0 0 0 0-8H9v18", key: "18ai8t" }],
  ["path", { d: "M6 15h8", key: "1y8f6l" }]
], iP = e("russian-ruble", pP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sP = [
  ["path", { d: "M10 2v15", key: "1qf71f" }],
  [
    "path",
    { d: "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z", key: "1pxcvx" }
  ],
  [
    "path",
    {
      d: "M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z",
      key: "5oog16"
    }
  ]
], rP = e("sailboat", sP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lP = [
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z", key: "4rw317" }],
  [
    "path",
    {
      d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",
      key: "10xrj0"
    }
  ],
  ["path", { d: "m13 12 4-4", key: "1hckqy" }],
  ["path", { d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2", key: "1p4srx" }]
], MP = e("salad", lP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _P = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
], vP = e("ruler", _P);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mP = [
  ["path", { d: "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777", key: "f1wd0e" }],
  ["path", { d: "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25", key: "1pfu07" }],
  ["path", { d: "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9", key: "1oq9qw" }],
  ["path", { d: "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2", key: "1fnwu5" }],
  ["rect", { width: "20", height: "4", x: "2", y: "11", rx: "1", key: "itshg" }]
], xP = e("sandwich", mP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gP = [
  ["path", { d: "M4 10a7.31 7.31 0 0 0 10 10Z", key: "1fzpp3" }],
  ["path", { d: "m9 15 3-3", key: "88sc13" }],
  ["path", { d: "M17 13a6 6 0 0 0-6-6", key: "15cc6u" }],
  ["path", { d: "M21 13A10 10 0 0 0 11 3", key: "11nf8s" }]
], uP = e("satellite-dish", gP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fP = [
  [
    "path",
    {
      d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
      key: "dzhfyz"
    }
  ],
  ["path", { d: "M16.5 7.5 19 5", key: "1ltcjm" }],
  [
    "path",
    {
      d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
      key: "nfoymv"
    }
  ],
  ["path", { d: "M9 21a6 6 0 0 0-6-6", key: "1iajcf" }],
  [
    "path",
    {
      d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
      key: "nv9zqy"
    }
  ]
], wP = e("satellite", fP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NP = [
  ["path", { d: "m20 19.5-5.5 1.2", key: "1aenhr" }],
  ["path", { d: "M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2", key: "2rtezt" }],
  ["path", { d: "m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2", key: "1kbm92" }],
  ["path", { d: "M20 10 4 13.5", key: "8nums9" }]
], $P = e("saudi-riyal", NP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bP = [
  ["path", { d: "M13 13H8a1 1 0 0 0-1 1v7", key: "h8g396" }],
  ["path", { d: "M14 8h1", key: "1lfen6" }],
  ["path", { d: "M17 21v-4", key: "1yknxs" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    { d: "M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41", key: "1t4vdl" }
  ],
  ["path", { d: "M29.5 11.5s5 5 4 5", key: "zzn4i6" }],
  ["path", { d: "M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15", key: "24cby9" }]
], zP = e("save-off", bP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qP = [
  ["path", { d: "M10 2v3a1 1 0 0 0 1 1h5", key: "1xspal" }],
  ["path", { d: "M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6", key: "1ra60u" }],
  ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }],
  [
    "path",
    {
      d: "M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z",
      key: "1yve0x"
    }
  ]
], jP = e("save-all", qP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HP = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], VP = e("save", HP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AP = [
  ["path", { d: "M5 7v11a1 1 0 0 0 1 1h11", key: "13dt1j" }],
  ["path", { d: "M5.293 18.707 11 13", key: "ezgbsx" }],
  ["circle", { cx: "19", cy: "19", r: "2", key: "17f5cg" }],
  ["circle", { cx: "5", cy: "5", r: "2", key: "1gwv83" }]
], CP = e("scale-3d", AP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LP = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7", key: "zcdpyk" }],
  ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1", key: "1yorad" }],
  ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7", key: "eua70x" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }]
], SP = e("scale", LP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PP = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  ["path", { d: "M14 15H9v-5", key: "pi4jk9" }],
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M21 3 9 15", key: "15kdhq" }]
], RP = e("scaling", PP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 7v10", key: "23sfjj" }],
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  ["path", { d: "M17 7v10", key: "578dap" }]
], BP = e("scan-barcode", TP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
      key: "11ak4c"
    }
  ]
], ZP = e("scan-eye", DP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
], OP = e("scan-face", FP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EP = [
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  [
    "path",
    {
      d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z",
      key: "1ak1ef"
    }
  ]
], UP = e("scan-heart", EP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], IP = e("scan-line", GP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WP = [
  ["path", { d: "M17 12v4a1 1 0 0 1-1 1h-4", key: "uk4fdo" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M17 8V7", key: "q2g9wo" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M7 17h.01", key: "19xn7k" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["rect", { x: "7", y: "7", width: "5", height: "5", rx: "1", key: "m9kyts" }]
], XP = e("scan-qr-code", WP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m16 16-1.9-1.9", key: "1dq9hf" }]
], YP = e("scan-search", KP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QP = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
], JP = e("scan", QP);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eR = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 8h8", key: "1jbsf9" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h6", key: "1vyc9m" }]
], tR = e("scan-text", eR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aR = [
  ["path", { d: "M5.42 9.42 8 12", key: "12pkuq" }],
  ["circle", { cx: "4", cy: "8", r: "2", key: "107mxr" }],
  ["path", { d: "m14 6-8.58 8.58", key: "gvzu5l" }],
  ["circle", { cx: "4", cy: "16", r: "2", key: "1ehqvc" }],
  ["path", { d: "M10.8 14.8 14 18", key: "ax7m9r" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }]
], hR = e("scissors-line-dashed", aR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oR = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M18 5v16", key: "1ethyx" }],
  ["path", { d: "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6", key: "zywc2d" }],
  [
    "path",
    {
      d: "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",
      key: "1d4ql0"
    }
  ],
  ["path", { d: "M6 5v16", key: "1sn0nx" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }]
], cR = e("school", oR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dR = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], yR = e("scissors", dR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nR = [
  ["path", { d: "M21 4h-3.5l2 11.05", key: "1gktiw" }],
  [
    "path",
    { d: "M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009", key: "1bq3u3" }
  ],
  ["circle", { cx: "19.5", cy: "17.5", r: "2.5", key: "e4zhv9" }],
  ["circle", { cx: "4.5", cy: "17.5", r: "2.5", key: "50vk4p" }]
], kR = e("scooter", nR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pR = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3", key: "i8wdob" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m22 3-5 5", key: "12jva0" }],
  ["path", { d: "m17 3 5 5", key: "k36vhe" }]
], iR = e("screen-share-off", pR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sR = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3", key: "i8wdob" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m17 8 5-5", key: "fqif7o" }],
  ["path", { d: "M17 3h5v5", key: "1o3tu8" }]
], rR = e("screen-share", sR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lR = [
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
], MR = e("scroll", lR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _R = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ["path", { d: "M11 7v4", key: "m2edmq" }],
  ["path", { d: "M11 15h.01", key: "k85uqc" }]
], vR = e("search-alert", _R);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mR = [
  ["path", { d: "M15 12h-5", key: "r7krc0" }],
  ["path", { d: "M15 8h-5", key: "1khuty" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
], xR = e("scroll-text", mR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gR = [
  ["path", { d: "m8 11 2 2 4-4", key: "1sed1v" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], uR = e("search-check", gR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fR = [
  ["path", { d: "m13 13.5 2-2.5-2-2.5", key: "1rvxrh" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ["path", { d: "M9 8.5 7 11l2 2.5", key: "6ffwbx" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], wR = e("search-code", fR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NR = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], $R = e("search-slash", NR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bR = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], zR = e("search-x", bR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qR = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], jR = e("search", qR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HR = [
  ["path", { d: "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0", key: "vqan6v" }],
  ["path", { d: "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0", key: "wdjd8o" }]
], VR = e("section", HR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AR = [
  [
    "path",
    {
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
      key: "117uat"
    }
  ],
  ["path", { d: "M6 12h16", key: "s4cdu5" }]
], CR = e("send-horizontal", AR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LR = [
  ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2", key: "1b0bso" }],
  ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2", key: "1x09vl" }],
  ["path", { d: "M7 14v1a2 2 0 0 0 2 2h1", key: "pao6x6" }],
  ["path", { d: "M14 7h1a2 2 0 0 1 2 2v1", key: "19tdru" }]
], SR = e("send-to-back", LR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PR = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], RR = e("send", PR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TR = [
  ["path", { d: "m16 16-4 4-4-4", key: "3dv8je" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "m8 8 4-4 4 4", key: "2bscm2" }]
], BR = e("separator-horizontal", TR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DR = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "m16 16 4-4-4-4", key: "1js579" }],
  ["path", { d: "m8 8-4 4 4 4", key: "1whems" }]
], ZR = e("separator-vertical", DR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FR = [
  ["path", { d: "m10.852 14.772-.383.923", key: "11vil6" }],
  ["path", { d: "M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923", key: "1v3clb" }],
  ["path", { d: "m13.148 9.228.383-.923", key: "t2zzyc" }],
  ["path", { d: "m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544", key: "1bxfiv" }],
  ["path", { d: "m14.772 10.852.923-.383", key: "k9m8cz" }],
  ["path", { d: "m14.772 13.148.923.383", key: "1xvhww" }],
  [
    "path",
    {
      d: "M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",
      key: "tn8das"
    }
  ],
  [
    "path",
    {
      d: "M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",
      key: "1g2pve"
    }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "m9.228 10.852-.923-.383", key: "1wtb30" }],
  ["path", { d: "m9.228 13.148-.923.383", key: "1a830x" }]
], OR = e("server-cog", FR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ER = [
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
      key: "4b9dqc"
    }
  ],
  [
    "path",
    {
      d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
      key: "22nnkd"
    }
  ],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m13 6-4 6h6l-4 6", key: "14hqih" }]
], UR = e("server-crash", ER);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GR = [
  ["path", { d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5", key: "bt2siv" }],
  ["path", { d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z", key: "1hjrv1" }],
  ["path", { d: "M22 17v-1a2 2 0 0 0-2-2h-1", key: "1iynyr" }],
  ["path", { d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z", key: "161ggg" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], IR = e("server-off", GR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WR = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], XR = e("server", WR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KR = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], YR = e("settings-2", KR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QR = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], JR = e("settings", QR);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eT = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], tT = e("shapes", eT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aT = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
], hT = e("share-2", aT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oT = [
  ["path", { d: "M12 2v13", key: "1km8f5" }],
  ["path", { d: "m16 6-4-4-4 4", key: "13yo43" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }]
], cT = e("share", oT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dT = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["line", { x1: "3", x2: "21", y1: "9", y2: "9", key: "1vqk6q" }],
  ["line", { x1: "3", x2: "21", y1: "15", y2: "15", key: "o2sbyz" }],
  ["line", { x1: "9", x2: "9", y1: "9", y2: "21", key: "1ib60c" }],
  ["line", { x1: "15", x2: "15", y1: "9", y2: "21", key: "1n26ft" }]
], yT = e("sheet", dT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nT = [
  [
    "path",
    {
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
      key: "1cn552"
    }
  ]
], kT = e("shell", nT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
], iT = e("shield-alert", pT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m4.243 5.21 14.39 12.472", key: "1c9a7c" }]
], rT = e("shield-ban", sT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], MT = e("shield-check", lT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _T = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 22V2", key: "zs6s6o" }]
], vT = e("shield-half", _T);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }]
], xT = e("shield-ellipsis", mT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }]
], uT = e("shield-minus", gT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fT = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
], wT = e("shield-off", fT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }],
  ["path", { d: "M12 9v6", key: "199k2o" }]
], $T = e("shield-plus", NT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], zT = e("shield-question-mark", bT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M6.376 18.91a6 6 0 0 1 11.249.003", key: "hnjrf2" }],
  ["circle", { cx: "12", cy: "11", r: "4", key: "1gt34v" }]
], jT = e("shield-user", qT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
], VT = e("shield-x", HT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AT = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], CT = e("shield", AT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LT = [
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }],
  ["path", { d: "M12 2v7.5", key: "1e5rl5" }],
  ["path", { d: "m19 5-5.23 5.23", key: "1ezxxf" }],
  ["path", { d: "M22 12h-7.5", key: "le1719" }],
  ["path", { d: "m19 19-5.23-5.23", key: "p3fmgn" }],
  ["path", { d: "M12 14.5V22", key: "dgcmos" }],
  ["path", { d: "M10.23 13.77 5 19", key: "qwopd4" }],
  ["path", { d: "M9.5 12H2", key: "r7bup8" }],
  ["path", { d: "M10.23 10.23 5 5", key: "k2y7lj" }],
  ["circle", { cx: "12", cy: "12", r: "2.5", key: "ix0uyj" }]
], ST = e("ship-wheel", LT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PT = [
  ["path", { d: "M12 10.189V14", key: "1p8cqu" }],
  ["path", { d: "M12 2v3", key: "qbqxhf" }],
  ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6", key: "qpkstq" }],
  [
    "path",
    {
      d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
      key: "7tigtc"
    }
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "1924j5"
    }
  ]
], RT = e("ship", PT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TT = [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "1wgbhj"
    }
  ]
], BT = e("shirt", TT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DT = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
], ZT = e("shopping-bag", DT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FT = [
  ["path", { d: "m15 11-1 9", key: "5wnq3a" }],
  ["path", { d: "m19 11-4-7", key: "cnml18" }],
  ["path", { d: "M2 11h20", key: "3eubbj" }],
  ["path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4", key: "yiazzp" }],
  ["path", { d: "M4.5 15.5h15", key: "13mye1" }],
  ["path", { d: "m5 11 4-7", key: "116ra9" }],
  ["path", { d: "m9 11 1 9", key: "1ojof7" }]
], OT = e("shopping-basket", FT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ET = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
], UT = e("shopping-cart", ET);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GT = [
  [
    "path",
    {
      d: "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z",
      key: "1gcedi"
    }
  ],
  [
    "path",
    {
      d: "M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z",
      key: "pg9kv3"
    }
  ],
  ["path", { d: "m9 15 7.879-7.878", key: "1o1zgh" }]
], IT = e("shovel", GT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WT = [
  ["path", { d: "m4 4 2.5 2.5", key: "uv2vmf" }],
  ["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7", key: "frdkwv" }],
  ["path", { d: "M15 5 5 15", key: "1ag8rq" }],
  ["path", { d: "M14 17v.01", key: "eokfpp" }],
  ["path", { d: "M10 16v.01", key: "14uyyl" }],
  ["path", { d: "M13 13v.01", key: "1v1k97" }],
  ["path", { d: "M16 10v.01", key: "5169yg" }],
  ["path", { d: "M11 20v.01", key: "cj92p8" }],
  ["path", { d: "M17 14v.01", key: "11cswd" }],
  ["path", { d: "M20 11v.01", key: "19e0od" }]
], XT = e("shower-head", WT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KT = [
  [
    "path",
    {
      d: "M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
      key: "1eob4r"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 22v-5", key: "sfixh4" }],
  ["path", { d: "M14 19v-2", key: "pdve8j" }],
  ["path", { d: "M18 20v-3", key: "uox2gk" }],
  ["path", { d: "M2 13h20", key: "5evz65" }],
  ["path", { d: "M6 20v-3", key: "c6pdcb" }]
], YT = e("shredder", KT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QT = [
  ["path", { d: "M11 12h.01", key: "1lr4k6" }],
  ["path", { d: "M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1", key: "fatpdi" }],
  [
    "path",
    {
      d: "M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8",
      key: "kehrqe"
    }
  ],
  ["path", { d: "M14 8a8.5 8.5 0 0 1 0 8", key: "1imjx2" }],
  ["path", { d: "M16 16c2 0 4.5-4 4-6", key: "z0nejz" }]
], JT = e("shrimp", QT);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eB = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], tB = e("shrink", eB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aB = [
  ["path", { d: "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5", key: "1p17fm" }],
  ["path", { d: "M14.5 14.5 12 17", key: "dy5w4y" }],
  ["path", { d: "M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z", key: "6z7b3o" }]
], hB = e("shrub", aB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oB = [
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", key: "1ailkh" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2", key: "km57vx" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45", key: "os18l9" }]
], cB = e("shuffle", oB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dB = [
  [
    "path",
    {
      d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
      key: "wuwx1p"
    }
  ]
], yB = e("sigma", dB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nB = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }]
], kB = e("signal-high", nB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pB = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }]
], iB = e("signal-low", pB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sB = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }]
], rB = e("signal-medium", sB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lB = [["path", { d: "M2 20h.01", key: "4haj6o" }]], MB = e("signal-zero", lB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _B = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
], vB = e("signal", _B);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mB = [
  [
    "path",
    {
      d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284",
      key: "y32ogt"
    }
  ],
  ["path", { d: "M3 21h18", key: "itz85i" }]
], xB = e("signature", mB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gB = [
  ["path", { d: "M10 9H4L2 7l2-2h6", key: "1hq7x2" }],
  ["path", { d: "M14 5h6l2 2-2 2h-6", key: "bv62ej" }],
  ["path", { d: "M10 22V4a2 2 0 1 1 4 0v18", key: "eqpcf2" }],
  ["path", { d: "M8 22h8", key: "rmew8v" }]
], uB = e("signpost-big", gB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fB = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M12 3v3", key: "1n5kay" }],
  [
    "path",
    {
      d: "M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z",
      key: "gqqp9m"
    }
  ]
], wB = e("signpost", fB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NB = [
  ["path", { d: "M7 18v-6a5 5 0 1 1 10 0v6", key: "pcx96s" }],
  [
    "path",
    { d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z", key: "1b4s83" }
  ],
  ["path", { d: "M21 12h1", key: "jtio3y" }],
  ["path", { d: "M18.5 4.5 18 5", key: "g5sp9y" }],
  ["path", { d: "M2 12h1", key: "1uaihz" }],
  ["path", { d: "M12 2v1", key: "11qlp1" }],
  ["path", { d: "m4.929 4.929.707.707", key: "1i51kw" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }]
], $B = e("siren", NB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bB = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], zB = e("skip-back", bB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qB = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], jB = e("skip-forward", qB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HB = [
  ["path", { d: "m12.5 17-.5-1-.5 1h1z", key: "3me087" }],
  [
    "path",
    {
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
      key: "1o5pge"
    }
  ],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]
], VB = e("skull", HB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AB = [
  ["rect", { width: "3", height: "8", x: "13", y: "2", rx: "1.5", key: "diqz80" }],
  ["path", { d: "M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5", key: "183iwg" }],
  ["rect", { width: "3", height: "8", x: "8", y: "14", rx: "1.5", key: "hqg7r1" }],
  ["path", { d: "M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5", key: "76g71w" }],
  ["rect", { width: "8", height: "3", x: "14", y: "13", rx: "1.5", key: "1kmz0a" }],
  ["path", { d: "M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5", key: "jc4sz0" }],
  ["rect", { width: "8", height: "3", x: "2", y: "8", rx: "1.5", key: "1omvl4" }],
  ["path", { d: "M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5", key: "16f3cl" }]
], CB = e("slack", AB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LB = [["path", { d: "M22 2 2 22", key: "y4kqgn" }]], SB = e("slash", LB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PB = [
  [
    "path",
    {
      d: "M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",
      key: "1sllp5"
    }
  ]
], RB = e("slice", PB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TB = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
], BB = e("sliders-horizontal", TB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DB = [
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M12 21v-9", key: "17s77i" }],
  ["path", { d: "M12 8V3", key: "13r4qs" }],
  ["path", { d: "M17 16h4", key: "h1uq16" }],
  ["path", { d: "M19 12V3", key: "o1uvq1" }],
  ["path", { d: "M19 21v-5", key: "qua636" }],
  ["path", { d: "M3 14h4", key: "bcjad9" }],
  ["path", { d: "M5 10V3", key: "cb8scm" }],
  ["path", { d: "M5 21v-7", key: "1w1uti" }]
], ZB = e("sliders-vertical", DB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FB = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12.667 8 10 12h4l-2.667 4", key: "h9lk2d" }]
], OB = e("smartphone-charging", FB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EB = [
  ["rect", { width: "7", height: "12", x: "2", y: "6", rx: "1", key: "5nje8w" }],
  ["path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36", key: "1g306n" }],
  ["path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58", key: "uqvjvo" }],
  ["path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8", key: "ujntz3" }]
], UB = e("smartphone-nfc", EB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GB = [
  ["path", { d: "M22 11v1a10 10 0 1 1-9-10", key: "ew0xw9" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }],
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }]
], IB = e("smile-plus", GB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WB = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
], XB = e("smartphone", WB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KB = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
], YB = e("smile", KB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QB = [
  ["path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0", key: "hneq2s" }],
  ["circle", { cx: "10", cy: "13", r: "8", key: "194lz3" }],
  ["path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6", key: "ixqyt7" }],
  ["path", { d: "M18 3 19.1 5.2", key: "9tjm43" }],
  ["path", { d: "M22 3 20.9 5.2", key: "j3odrs" }]
], JB = e("snail", QB);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eD = [
  ["path", { d: "m10 20-1.25-2.5L6 18", key: "18frcb" }],
  ["path", { d: "M10 4 8.75 6.5 6 6", key: "7mghy3" }],
  ["path", { d: "m14 20 1.25-2.5L18 18", key: "1chtki" }],
  ["path", { d: "m14 4 1.25 2.5L18 6", key: "1b4wsy" }],
  ["path", { d: "m17 21-3-6h-4", key: "15hhxa" }],
  ["path", { d: "m17 3-3 6 1.5 3", key: "11697g" }],
  ["path", { d: "M2 12h6.5L10 9", key: "kv9z4n" }],
  ["path", { d: "m20 10-1.5 2 1.5 2", key: "1swlpi" }],
  ["path", { d: "M22 12h-6.5L14 15", key: "1mxi28" }],
  ["path", { d: "m4 10 1.5 2L4 14", key: "k9enpj" }],
  ["path", { d: "m7 21 3-6-1.5-3", key: "j8hb9u" }],
  ["path", { d: "m7 3 3 6h4", key: "1otusx" }]
], tD = e("snowflake", eD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aD = [
  ["path", { d: "M10.5 2v4", key: "1xt6in" }],
  ["path", { d: "M14 2H7a2 2 0 0 0-2 2", key: "e6xig3" }],
  [
    "path",
    {
      d: "M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19",
      key: "adq7uc"
    }
  ],
  [
    "path",
    {
      d: "M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
      key: "t9hm96"
    }
  ]
], hD = e("soap-dispenser-droplet", aD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oD = [
  ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", key: "1dgpiv" }],
  [
    "path",
    {
      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      key: "xacw8m"
    }
  ],
  ["path", { d: "M4 18v2", key: "jwo5n2" }],
  ["path", { d: "M20 18v2", key: "1ar1qi" }],
  ["path", { d: "M12 4v9", key: "oqhhn3" }]
], cD = e("sofa", oD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dD = [
  ["path", { d: "M11 2h2", key: "isr7bz" }],
  ["path", { d: "m14.28 14-4.56 8", key: "4anwcf" }],
  ["path", { d: "m21 22-1.558-4H4.558", key: "enk13h" }],
  ["path", { d: "M3 10v2", key: "w8mti9" }],
  [
    "path",
    {
      d: "M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z",
      key: "pouggg"
    }
  ],
  ["path", { d: "M7 2a4 4 0 0 1-4 4", key: "78s8of" }],
  ["path", { d: "m8.66 7.66 1.41 1.41", key: "1vaqj8" }]
], yD = e("solar-panel", dD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nD = [
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z", key: "4rw317" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M19.5 12 22 6", key: "shfsr5" }],
  [
    "path",
    {
      d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",
      key: "rpc6vp"
    }
  ],
  [
    "path",
    {
      d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",
      key: "1lf63m"
    }
  ],
  [
    "path",
    { d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62", key: "97tijn" }
  ]
], kD = e("soup", nD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pD = [
  ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1", key: "lt2kga" }]
], iD = e("space", pD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sD = [
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  [
    "path",
    {
      d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
      key: "1aw2pz"
    }
  ]
], rD = e("spade", sD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lD = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], MD = e("sparkles", lD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _D = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ]
], vD = e("sparkle", _D);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mD = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["circle", { cx: "12", cy: "14", r: "4", key: "1jruaj" }],
  ["path", { d: "M12 14h.01", key: "1etili" }]
], xD = e("speaker", mD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gD = [
  [
    "path",
    {
      d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20",
      key: "11atix"
    }
  ],
  ["path", { d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603", key: "yol142" }],
  ["path", { d: "M17 15a3.5 3.5 0 0 0-.025-4.975", key: "ssbmkc" }]
], uD = e("speech", gD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fD = [
  ["path", { d: "m6 16 6-12 6 12", key: "1b4byz" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  [
    "path",
    {
      d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1",
      key: "8mdmtu"
    }
  ]
], wD = e("spell-check-2", fD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ND = [
  ["path", { d: "m6 16 6-12 6 12", key: "1b4byz" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m16 20 2 2 4-4", key: "13tcca" }]
], $D = e("spell-check", ND);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bD = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
      key: "xwnzip"
    }
  ],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }],
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }]
], zD = e("spline-pointer", bD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qD = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], jD = e("spline", qD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HD = [
  [
    "path",
    {
      d: "M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66",
      key: "13vns8"
    }
  ],
  [
    "path",
    {
      d: "m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178",
      key: "s8x3u0"
    }
  ]
], VD = e("spool", HD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AD = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
], CD = e("split", AD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LD = [
  ["path", { d: "M15.295 19.562 16 22", key: "31jsb7" }],
  ["path", { d: "m17 16 3.758 2.098", key: "121ar7" }],
  ["path", { d: "m19 12.5 3.026-.598", key: "19ukd3" }],
  [
    "path",
    {
      d: "M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z",
      key: "lwb9l9"
    }
  ],
  ["path", { d: "M8 9V2", key: "1xa0v7" }]
], SD = e("spotlight", LD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PD = [
  ["path", { d: "M3 3h.01", key: "159qn6" }],
  ["path", { d: "M7 5h.01", key: "1hq22a" }],
  ["path", { d: "M11 7h.01", key: "1osv80" }],
  ["path", { d: "M3 7h.01", key: "1xzrh3" }],
  ["path", { d: "M7 9h.01", key: "19b3jx" }],
  ["path", { d: "M3 11h.01", key: "1eifu7" }],
  ["rect", { width: "4", height: "4", x: "15", y: "5", key: "mri9e4" }],
  ["path", { d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2", key: "aib6hk" }],
  ["path", { d: "m13 14 8-2", key: "1d7bmk" }],
  ["path", { d: "m13 19 8-2", key: "1y2vml" }]
], RD = e("spray-can", PD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TD = [
  [
    "path",
    {
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
      key: "139s4v"
    }
  ],
  ["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4", key: "1dlkgp" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
], BD = e("sprout", TD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DD = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M17 12h-2l-2 5-2-10-2 5H7", key: "15hlnc" }]
], ZD = e("square-activity", DD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FD = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m16 8-8 8", key: "166keh" }],
  ["path", { d: "M16 16H8V8", key: "1w2ppm" }]
], OD = e("square-arrow-down-left", FD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ED = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "m8 12 4 4 4-4", key: "k98ssh" }]
], UD = e("square-arrow-down", ED);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GD = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m8 8 8 8", key: "1imecy" }],
  ["path", { d: "M16 8v8H8", key: "1lbpgo" }]
], ID = e("square-arrow-down-right", GD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WD = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m12 8-4 4 4 4", key: "15vm53" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }]
], XD = e("square-arrow-left", WD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KD = [
  ["path", { d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6", key: "14qz4y" }],
  ["path", { d: "m3 21 9-9", key: "1jfql5" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], YD = e("square-arrow-out-down-left", KD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QD = [
  ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "14rsvq" }],
  ["path", { d: "m21 21-9-9", key: "1et2py" }],
  ["path", { d: "M21 15v6h-6", key: "1jko0i" }]
], JD = e("square-arrow-out-down-right", QD);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eZ = [
  ["path", { d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6", key: "14mv1t" }],
  ["path", { d: "m3 3 9 9", key: "rks13r" }],
  ["path", { d: "M3 9V3h6", key: "ira0h2" }]
], tZ = e("square-arrow-out-up-left", eZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aZ = [
  ["path", { d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6", key: "y09zxi" }],
  ["path", { d: "m21 3-9 9", key: "mpx6sq" }],
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }]
], hZ = e("square-arrow-out-up-right", aZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m12 16 4-4-4-4", key: "1i9zcv" }]
], cZ = e("square-arrow-right", oZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 16V8h8", key: "19xb1h" }],
  ["path", { d: "M16 16 8 8", key: "1qdy8n" }]
], yZ = e("square-arrow-up-left", dZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 8h8v8", key: "b65dnt" }],
  ["path", { d: "m8 16 8-8", key: "13b9ih" }]
], kZ = e("square-arrow-up-right", nZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
], iZ = e("square-arrow-up", pZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "m8.5 14 7-4", key: "12hpby" }],
  ["path", { d: "m8.5 10 7 4", key: "wwy2dy" }]
], rZ = e("square-asterisk", sZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lZ = [
  ["line", { x1: "5", y1: "3", x2: "19", y2: "3", key: "x74652" }],
  ["line", { x1: "3", y1: "5", x2: "3", y2: "19", key: "31ivqu" }],
  ["line", { x1: "21", y1: "5", x2: "21", y2: "19", key: "1am4cd" }],
  ["line", { x1: "9", y1: "21", x2: "10", y2: "21", key: "sb02er" }],
  ["line", { x1: "14", y1: "21", x2: "15", y2: "21", key: "1bvb1m" }],
  ["path", { d: "M 3 5 A2 2 0 0 1 5 3", key: "dbypyf" }],
  ["path", { d: "M 19 3 A2 2 0 0 1 21 5", key: "y6haui" }],
  ["path", { d: "M 5 21 A2 2 0 0 1 3 19", key: "kb75wq" }],
  ["path", { d: "M 21 19 A2 2 0 0 1 19 21", key: "1p3zbf" }],
  ["circle", { cx: "8.5", cy: "8.5", r: "1.5", key: "cn5opk" }],
  ["line", { x1: "9.56066", y1: "9.56066", x2: "12", y2: "12", key: "mksg6j" }],
  ["line", { x1: "17", y1: "17", x2: "14.82", y2: "14.82", key: "1lwi1d" }],
  ["circle", { cx: "8.5", cy: "15.5", r: "1.5", key: "12hfy1" }],
  ["line", { x1: "9.56066", y1: "14.43934", x2: "17", y2: "7", key: "4jyfgs" }]
], MZ = e("square-bottom-dashed-scissors", lZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _Z = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 8h7", key: "kbo1nt" }],
  ["path", { d: "M8 12h6", key: "ikassy" }],
  ["path", { d: "M11 16h5", key: "oq65wt" }]
], vZ = e("square-chart-gantt", _Z);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mZ = [
  [
    "path",
    { d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344", key: "2acyp4" }
  ],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], xZ = e("square-check-big", mZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], uZ = e("square-check", gZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m16 10-4 4-4-4", key: "894hmk" }]
], wZ = e("square-chevron-down", fZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m14 16-4-4 4-4", key: "ojs7w8" }]
], $Z = e("square-chevron-left", NZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m10 8 4 4-4 4", key: "1wy4r4" }]
], zZ = e("square-chevron-right", bZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m8 14 4-4 4 4", key: "fy2ptz" }]
], jZ = e("square-chevron-up", qZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HZ = [
  ["path", { d: "m10 9-3 3 3 3", key: "1oro0q" }],
  ["path", { d: "m14 15 3-3-3-3", key: "bz13h7" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], VZ = e("square-code", HZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AZ = [
  ["path", { d: "M10 9.5 8 12l2 2.5", key: "3mjy60" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "m14 9.5 2 2.5-2 2.5", key: "1bir2l" }],
  [
    "path",
    { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2", key: "as5y1o" }
  ],
  ["path", { d: "M9 21h1", key: "15o7lz" }]
], CZ = e("square-dashed-bottom-code", AZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LZ = [
  [
    "path",
    { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2", key: "as5y1o" }
  ],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }]
], SZ = e("square-dashed-bottom", LZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PZ = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
      key: "xwnzip"
    }
  ],
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M9 3h1", key: "1yesri" }],
  ["path", { d: "M9 21h2", key: "1qve2z" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M21 9v2", key: "p14lih" }],
  ["path", { d: "M3 14v1", key: "vnatye" }]
], RZ = e("square-dashed-mouse-pointer", PZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TZ = [
  ["path", { d: "M8 7v7", key: "1x2jlm" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M16 7v9", key: "1hp2iy" }],
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M9 3h1", key: "1yesri" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M21 14v1", key: "169vum" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }]
], BZ = e("square-dashed-kanban", TZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DZ = [
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M21 14v1", key: "169vum" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "89voep" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }]
], ZZ = e("square-dashed-top-solid", DZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FZ = [
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M9 3h1", key: "1yesri" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M21 14v1", key: "169vum" }]
], OZ = e("square-dashed", FZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "16", key: "aqc6ln" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "8", key: "1mkcni" }]
], UZ = e("square-divide", EZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], IZ = e("square-dot", GZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 10h10", key: "1101jm" }],
  ["path", { d: "M7 14h10", key: "1mhdw3" }]
], XZ = e("square-equal", WZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3", key: "m1af9g" }],
  ["path", { d: "M9 11.2h5.7", key: "3zgcl2" }]
], YZ = e("square-function", KZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QZ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 7v10", key: "d5nglc" }],
  ["path", { d: "M11 7v10", key: "pptsnr" }],
  ["path", { d: "m15 7 2 10", key: "1m7qm5" }]
], JZ = e("square-library", QZ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 7v7", key: "1x2jlm" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M16 7v9", key: "1hp2iy" }]
], tF = e("square-kanban", eF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aF = [
  [
    "path",
    {
      d: "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16",
      key: "1ywlsj"
    }
  ],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], hF = e("square-m", aF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 8h10", key: "1jw688" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h10", key: "wp8him" }]
], cF = e("square-menu", oF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
], yF = e("square-minus", dF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nF = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
      key: "xwnzip"
    }
  ],
  ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "14rsvq" }]
], kF = e("square-mouse-pointer", nF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pF = [
  ["path", { d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41", key: "9l1ft6" }],
  ["path", { d: "M3 8.7V19a2 2 0 0 0 2 2h10.3", key: "17knke" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2", key: "uoagbd" }],
  ["path", { d: "M9 17v-2.3", key: "1jxgo2" }]
], iF = e("square-parking-off", pF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9", key: "1dfk2c" }]
], rF = e("square-parking", sF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9", key: "c1nkhi" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9", key: "h65svq" }]
], MF = e("square-pause", lF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _F = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
], vF = e("square-pen", _F);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
], xF = e("square-percent", mF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 7h10", key: "udp07y" }],
  ["path", { d: "M10 7v10", key: "i1d9ee" }],
  ["path", { d: "M16 17a2 2 0 0 1-2-2V7", key: "ftwdc7" }]
], uF = e("square-pi", gF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17", key: "1l9586" }],
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  ["path", { d: "M16 7v10", key: "lavkr4" }]
], wF = e("square-pilcrow", fF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NF = [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
      key: "kmsa83"
    }
  ]
], $F = e("square-play", NF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], zF = e("square-plus", bF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qF = [
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005", key: "1pek45" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], jF = e("square-power", qF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HF = [
  ["path", { d: "M7 12h2l2 5 2-10h4", key: "1fxv6h" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], VF = e("square-radical", HF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AF = [
  ["path", { d: "M21 11a8 8 0 0 0-8-8", key: "1lxwo5" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1dv2y5" }]
], CF = e("square-round-corner", AF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "8.5", cy: "8.5", r: "1.5", key: "cn5opk" }],
  ["line", { x1: "9.56066", y1: "9.56066", x2: "12", y2: "12", key: "mksg6j" }],
  ["line", { x1: "17", y1: "17", x2: "14.82", y2: "14.82", key: "1lwi1d" }],
  ["circle", { cx: "8.5", cy: "15.5", r: "1.5", key: "12hfy1" }],
  ["line", { x1: "9.56066", y1: "14.43934", x2: "17", y2: "7", key: "4jyfgs" }]
], SF = e("square-scissors", LF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M16 8.9V7H8l4 5-4 5h8v-1.9", key: "9nih0i" }]
], RF = e("square-sigma", PF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["line", { x1: "9", x2: "15", y1: "15", y2: "9", key: "1dfufj" }]
], BF = e("square-slash", TF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DF = [
  ["path", { d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3", key: "lubmu8" }],
  ["path", { d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3", key: "1ag34g" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]
], ZF = e("square-split-horizontal", DF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FF = [
  ["path", { d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3", key: "1pi83i" }],
  ["path", { d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3", key: "ido5k7" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
], OF = e("square-split-vertical", FF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EF = [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
], UF = e("square-square", EF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GF = [
  ["path", { d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2", key: "4i38lg" }],
  ["path", { d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2", key: "mlte4a" }],
  ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2", key: "1fa9i4" }]
], IF = e("square-stack", GF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WF = [
  [
    "path",
    {
      d: "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
      key: "13edca"
    }
  ],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
], XF = e("square-star", WF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KF = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
], YF = e("square-stop", KF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QF = [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
], JF = e("square-terminal", QF);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eO = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2", key: "1m6ac2" }]
], tO = e("square-user", eO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aO = [
  ["path", { d: "M18 21a6 6 0 0 0-12 0", key: "kaz2du" }],
  ["circle", { cx: "12", cy: "11", r: "4", key: "1gt34v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], hO = e("square-user-round", aO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oO = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], cO = e("square-x", oO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dO = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], yO = e("square", dO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nO = [
  [
    "path",
    {
      d: "M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0",
      key: "1mcohs"
    }
  ],
  [
    "path",
    {
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2",
      key: "1r1efp"
    }
  ]
], kO = e("squares-exclude", nO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pO = [
  ["path", { d: "M10 22a2 2 0 0 1-2-2", key: "i7yj1i" }],
  ["path", { d: "M14 2a2 2 0 0 1 2 2", key: "170a0m" }],
  ["path", { d: "M16 22h-2", key: "18d249" }],
  ["path", { d: "M2 10V8", key: "7yj4fe" }],
  ["path", { d: "M2 4a2 2 0 0 1 2-2", key: "ddgnws" }],
  ["path", { d: "M20 8a2 2 0 0 1 2 2", key: "1770vt" }],
  ["path", { d: "M22 14v2", key: "iot8ja" }],
  ["path", { d: "M22 20a2 2 0 0 1-2 2", key: "qj8q6g" }],
  ["path", { d: "M4 16a2 2 0 0 1-2-2", key: "1dnafg" }],
  [
    "path",
    { d: "M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z", key: "ci6f0b" }
  ],
  ["path", { d: "M8 2h2", key: "1gmkwm" }]
], iO = e("squares-intersect", pO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sO = [
  [
    "path",
    {
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z",
      key: "17jnth"
    }
  ]
], rO = e("squares-unite", sO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lO = [
  ["path", { d: "M10 22a2 2 0 0 1-2-2", key: "i7yj1i" }],
  ["path", { d: "M16 22h-2", key: "18d249" }],
  [
    "path",
    {
      d: "M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z",
      key: "1njgbb"
    }
  ],
  ["path", { d: "M20 8a2 2 0 0 1 2 2", key: "1770vt" }],
  ["path", { d: "M22 14v2", key: "iot8ja" }],
  ["path", { d: "M22 20a2 2 0 0 1-2 2", key: "qj8q6g" }]
], MO = e("squares-subtract", lO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _O = [
  ["path", { d: "M13.77 3.043a34 34 0 0 0-3.54 0", key: "1oaobr" }],
  ["path", { d: "M13.771 20.956a33 33 0 0 1-3.541.001", key: "95iq0j" }],
  ["path", { d: "M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44", key: "1u6qty" }],
  ["path", { d: "M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438", key: "1ew6g6" }],
  ["path", { d: "M20.957 10.23a33 33 0 0 1 0 3.54", key: "1l9npr" }],
  ["path", { d: "M3.043 10.23a34 34 0 0 0 .001 3.541", key: "1it6jm" }],
  ["path", { d: "M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438", key: "14uchd" }],
  ["path", { d: "M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44", key: "8k4agb" }]
], vO = e("squircle-dashed", _O);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mO = [
  ["path", { d: "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9", key: "garfkc" }]
], xO = e("squircle", mO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gO = [
  ["path", { d: "M15.236 22a3 3 0 0 0-2.2-5", key: "21bitc" }],
  ["path", { d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4", key: "oh0fg0" }],
  ["path", { d: "M18 13h.01", key: "9veqaj" }],
  [
    "path",
    {
      d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
      key: "980v8a"
    }
  ]
], uO = e("squirrel", gO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fO = [
  ["path", { d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13", key: "i9gjdv" }],
  [
    "path",
    {
      d: "M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
      key: "1vzg3v"
    }
  ],
  ["path", { d: "M5 22h14", key: "ehvnwv" }]
], wO = e("stamp", fO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NO = [
  [
    "path",
    {
      d: "m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152",
      key: "19ctli"
    }
  ],
  [
    "path",
    {
      d: "m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099",
      key: "ptqqvy"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], $O = e("star-off", NO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bO = [
  [
    "path",
    {
      d: "M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",
      key: "2ksp49"
    }
  ]
], zO = e("star-half", bO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qO = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], jO = e("star", qO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HO = [
  [
    "path",
    {
      d: "M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "19qhus"
    }
  ],
  ["path", { d: "M21 20V4", key: "cb8qj8" }]
], VO = e("step-back", HO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AO = [
  [
    "path",
    {
      d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "1ystz2"
    }
  ],
  ["path", { d: "M3 4v16", key: "1ph11n" }]
], CO = e("step-forward", AO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LO = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
], SO = e("stethoscope", LO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PO = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
      key: "1dfntj"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5", key: "6s6qgf" }],
  ["path", { d: "M8 13h.01", key: "1sbv64" }],
  ["path", { d: "M16 13h.01", key: "wip0gl" }],
  ["path", { d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1", key: "1vvgv3" }]
], RO = e("sticker", PO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TO = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
      key: "1dfntj"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5", key: "6s6qgf" }]
], BO = e("sticky-note", TO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DO = [
  [
    "path",
    {
      d: "M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z",
      key: "1si4ox"
    }
  ],
  ["path", { d: "M11.99 22 14 12l7.822 3.184", key: "1u8to0" }],
  ["path", { d: "M14 12 8.47 2.302", key: "guo3d5" }]
], ZO = e("stone", DO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FO = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
], OO = e("store", FO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EO = [
  ["rect", { width: "20", height: "6", x: "2", y: "4", rx: "2", key: "qdearl" }],
  ["rect", { width: "20", height: "6", x: "2", y: "14", rx: "2", key: "1xrn6j" }]
], UO = e("stretch-horizontal", EO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GO = [
  ["rect", { width: "6", height: "20", x: "4", y: "2", rx: "2", key: "19qu7m" }],
  ["rect", { width: "6", height: "20", x: "14", y: "2", rx: "2", key: "24v0nk" }]
], IO = e("stretch-vertical", GO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WO = [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
], XO = e("strikethrough", WO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KO = [
  ["path", { d: "m4 5 8 8", key: "1eunvl" }],
  ["path", { d: "m12 5-8 8", key: "1ah0jp" }],
  [
    "path",
    {
      d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
      key: "e8ta8j"
    }
  ]
], YO = e("subscript", KO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QO = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 4h.01", key: "1ujb9j" }],
  ["path", { d: "M20 12h.01", key: "1ykeid" }],
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M4 12h.01", key: "158zrr" }],
  ["path", { d: "M17.657 6.343h.01", key: "31pqzk" }],
  ["path", { d: "M17.657 17.657h.01", key: "jehnf4" }],
  ["path", { d: "M6.343 17.657h.01", key: "gdk6ow" }],
  ["path", { d: "M6.343 6.343h.01", key: "1uurf0" }]
], JO = e("sun-dim", QO);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eE = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  [
    "path",
    {
      d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715",
      key: "xlf6rm"
    }
  ],
  ["path", { d: "M16 12a4 4 0 0 0-4-4", key: "6vsxu" }],
  ["path", { d: "m19 5-1.256 1.256", key: "1yg6a6" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }]
], tE = e("sun-moon", eE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aE = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 3v1", key: "1asbbs" }],
  ["path", { d: "M12 20v1", key: "1wcdkc" }],
  ["path", { d: "M3 12h1", key: "lp3yf2" }],
  ["path", { d: "M20 12h1", key: "1vloll" }],
  ["path", { d: "m18.364 5.636-.707.707", key: "1hakh0" }],
  ["path", { d: "m6.343 17.657-.707.707", key: "18m9nf" }],
  ["path", { d: "m5.636 5.636.707.707", key: "1xv1c5" }],
  ["path", { d: "m17.657 17.657.707.707", key: "vl76zb" }]
], hE = e("sun-medium", aE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oE = [
  ["path", { d: "M10 21v-1", key: "1u8rkd" }],
  ["path", { d: "M10 4V3", key: "pkzwkn" }],
  ["path", { d: "M10 9a3 3 0 0 0 0 6", key: "gv75dk" }],
  ["path", { d: "m14 20 1.25-2.5L18 18", key: "1chtki" }],
  ["path", { d: "m14 4 1.25 2.5L18 6", key: "1b4wsy" }],
  ["path", { d: "m17 21-3-6 1.5-3H22", key: "o5qa3v" }],
  ["path", { d: "m17 3-3 6 1.5 3", key: "11697g" }],
  ["path", { d: "M2 12h1", key: "1uaihz" }],
  ["path", { d: "m20 10-1.5 2 1.5 2", key: "1swlpi" }],
  ["path", { d: "m3.64 18.36.7-.7", key: "105rm9" }],
  ["path", { d: "m4.34 6.34-.7-.7", key: "d3unjp" }]
], cE = e("sun-snow", oE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dE = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], yE = e("sun", dE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nE = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
], kE = e("sunrise", nE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pE = [
  ["path", { d: "M12 10V2", key: "16sf7g" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
], iE = e("sunset", pE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sE = [
  ["path", { d: "m4 19 8-8", key: "hr47gm" }],
  ["path", { d: "m12 19-8-8", key: "1dhhmo" }],
  [
    "path",
    {
      d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
      key: "1dfcux"
    }
  ]
], rE = e("superscript", sE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lE = [
  ["path", { d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z", key: "1ldrpk" }],
  ["path", { d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7", key: "11i5po" }],
  ["path", { d: "M 7 17h.01", key: "1euzgo" }],
  [
    "path",
    {
      d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
      key: "o2gii7"
    }
  ]
], ME = e("swatch-book", lE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _E = [
  ["path", { d: "M10 21V3h8", key: "br2l0g" }],
  ["path", { d: "M6 16h9", key: "2py0wn" }],
  ["path", { d: "M10 9.5h7", key: "13dmhz" }]
], vE = e("swiss-franc", _E);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mE = [
  ["path", { d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5", key: "mtk2lu" }],
  ["path", { d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5", key: "120jsl" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m18 22-3-3 3-3", key: "kgdoj7" }],
  ["path", { d: "m6 2 3 3-3 3", key: "1fnbkv" }]
], xE = e("switch-camera", mE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gE = [
  ["path", { d: "m11 19-6-6", key: "s7kpr" }],
  ["path", { d: "m5 21-2-2", key: "1kw20b" }],
  ["path", { d: "m8 16-4 4", key: "1oqv8h" }],
  ["path", { d: "M9.5 17.5 21 6V3h-3L6.5 14.5", key: "pkxemp" }]
], uE = e("sword", gE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fE = [
  ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", key: "1hfsw2" }],
  ["line", { x1: "13", x2: "19", y1: "19", y2: "13", key: "1vrmhu" }],
  ["line", { x1: "16", x2: "20", y1: "16", y2: "20", key: "1bron3" }],
  ["line", { x1: "19", x2: "21", y1: "21", y2: "19", key: "13pww6" }],
  ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5", key: "hbey2j" }],
  ["line", { x1: "5", x2: "9", y1: "14", y2: "18", key: "1hf58s" }],
  ["line", { x1: "7", x2: "4", y1: "17", y2: "20", key: "pidxm4" }],
  ["line", { x1: "3", x2: "5", y1: "19", y2: "21", key: "1pehsh" }]
], wE = e("swords", fE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NE = [
  ["path", { d: "m18 2 4 4", key: "22kx64" }],
  ["path", { d: "m17 7 3-3", key: "1w1zoj" }],
  ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", key: "1exhtz" }],
  ["path", { d: "m9 11 4 4", key: "rovt3i" }],
  ["path", { d: "m5 19-3 3", key: "59f2uf" }],
  ["path", { d: "m14 4 6 6", key: "yqp9t2" }]
], $E = e("syringe", NE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bE = [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83"
    }
  ]
], zE = e("table-2", bE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qE = [
  ["path", { d: "M12 21v-6", key: "lihzve" }],
  ["path", { d: "M12 9V3", key: "da5inc" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], jE = e("table-cells-merge", qE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HE = [
  ["path", { d: "M12 15V9", key: "8c7uyn" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], VE = e("table-cells-split", HE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AE = [
  ["path", { d: "M14 14v2", key: "w2a1xv" }],
  ["path", { d: "M14 20v2", key: "1lq872" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  ["path", { d: "M14 8v2", key: "i67w9a" }],
  ["path", { d: "M2 15h8", key: "82wtch" }],
  ["path", { d: "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2", key: "up0l64" }],
  ["path", { d: "M2 9h8", key: "yelfik" }],
  ["path", { d: "M22 15h-4", key: "1es58f" }],
  ["path", { d: "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2", key: "pdjoqf" }],
  ["path", { d: "M22 9h-4", key: "1luja7" }],
  ["path", { d: "M5 3v18", key: "14hmio" }]
], CE = e("table-columns-split", AE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LE = [
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 9H3", key: "1338ky" }],
  ["path", { d: "M21 15H3", key: "9uk58r" }]
], SE = e("table-properties", LE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PE = [
  ["path", { d: "M14 10h2", key: "1lstlu" }],
  ["path", { d: "M15 22v-8", key: "1fwwgm" }],
  ["path", { d: "M15 2v4", key: "1044rn" }],
  ["path", { d: "M2 10h2", key: "1r8dkt" }],
  ["path", { d: "M20 10h2", key: "1ug425" }],
  ["path", { d: "M3 19h18", key: "awlh7x" }],
  ["path", { d: "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6", key: "ibqhof" }],
  ["path", { d: "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2", key: "1uenja" }],
  ["path", { d: "M8 10h2", key: "66od0" }],
  ["path", { d: "M9 22v-8", key: "fmnu31" }],
  ["path", { d: "M9 2v4", key: "j1yeou" }]
], RE = e("table-rows-split", PE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TE = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M16 12H3", key: "1a2rj7" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "M21 5h.01", key: "wa75ra" }],
  ["path", { d: "M21 12h.01", key: "msek7k" }],
  ["path", { d: "M21 19h.01", key: "qvbq2j" }]
], BE = e("table-of-contents", TE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DE = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], ZE = e("table", DE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FE = [
  ["rect", { width: "10", height: "14", x: "3", y: "8", rx: "2", key: "1vrsiq" }],
  ["path", { d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4", key: "1j4zmg" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
], OE = e("tablet-smartphone", FE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EE = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18", key: "1dp563" }]
], UE = e("tablet", EE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GE = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
], IE = e("tag", GE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WE = [
  ["circle", { cx: "7", cy: "7", r: "5", key: "x29byf" }],
  ["circle", { cx: "17", cy: "17", r: "5", key: "1op1d2" }],
  ["path", { d: "M12 17h10", key: "ls21zv" }],
  ["path", { d: "m3.46 10.54 7.08-7.08", key: "1rehiu" }]
], XE = e("tablets", WE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KE = [
  [
    "path",
    {
      d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
      key: "16rjxf"
    }
  ],
  [
    "path",
    { d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193", key: "178nd4" }
  ],
  ["circle", { cx: "10.5", cy: "6.5", r: ".5", fill: "currentColor", key: "12ikhr" }]
], YE = e("tags", KE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QE = [["path", { d: "M4 4v16", key: "6qkkli" }]], JE = e("tally-1", QE);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eU = [
  ["path", { d: "M4 4v16", key: "6qkkli" }],
  ["path", { d: "M9 4v16", key: "81ygyz" }]
], tU = e("tally-2", eU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aU = [
  ["path", { d: "M4 4v16", key: "6qkkli" }],
  ["path", { d: "M9 4v16", key: "81ygyz" }],
  ["path", { d: "M14 4v16", key: "12vmem" }]
], hU = e("tally-3", aU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oU = [
  ["path", { d: "M4 4v16", key: "6qkkli" }],
  ["path", { d: "M9 4v16", key: "81ygyz" }],
  ["path", { d: "M14 4v16", key: "12vmem" }],
  ["path", { d: "M19 4v16", key: "8ij5ei" }]
], cU = e("tally-4", oU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dU = [
  ["path", { d: "M4 4v16", key: "6qkkli" }],
  ["path", { d: "M9 4v16", key: "81ygyz" }],
  ["path", { d: "M14 4v16", key: "12vmem" }],
  ["path", { d: "M19 4v16", key: "8ij5ei" }],
  ["path", { d: "M22 6 2 18", key: "h9moai" }]
], yU = e("tally-5", dU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nU = [
  ["circle", { cx: "17", cy: "4", r: "2", key: "y5j2s2" }],
  ["path", { d: "M15.59 5.41 5.41 15.59", key: "l0vprr" }],
  ["circle", { cx: "4", cy: "17", r: "2", key: "9p4efm" }],
  ["path", { d: "M12 22s-4-9-1.5-11.5S22 12 22 12", key: "1twk4o" }]
], kU = e("tangent", nU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pU = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], iU = e("target", pU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sU = [
  [
    "path",
    {
      d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",
      key: "k4qptu"
    }
  ],
  ["path", { d: "m13.56 11.747 4.332-.924", key: "19l80z" }],
  ["path", { d: "m16 21-3.105-6.21", key: "7oh9d" }],
  [
    "path",
    {
      d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",
      key: "m7xp4m"
    }
  ],
  ["path", { d: "m6.158 8.633 1.114 4.456", key: "74o979" }],
  ["path", { d: "m8 21 3.105-6.21", key: "1fvxut" }],
  ["circle", { cx: "12", cy: "13", r: "2", key: "1c1ljs" }]
], rU = e("telescope", sU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lU = [
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
  ["path", { d: "m14 5 3-3 3 3", key: "1sorif" }],
  ["path", { d: "m14 10 3-3 3 3", key: "1jyi9h" }],
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  ["path", { d: "M17 14H7l-5 8h20Z", key: "13ar7p" }],
  ["path", { d: "M8 14v8", key: "1ghmqk" }],
  ["path", { d: "m9 14 5 8", key: "13pgi6" }]
], MU = e("tent-tree", lU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _U = [
  ["path", { d: "M3.5 21 14 3", key: "1szst5" }],
  ["path", { d: "M20.5 21 10 3", key: "1310c3" }],
  ["path", { d: "M15.5 21 12 15l-3.5 6", key: "1ddtfw" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }]
], vU = e("tent", _U);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mU = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], xU = e("terminal", mU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gU = [
  [
    "path",
    { d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3", key: "1ub6xw" }
  ],
  ["path", { d: "m16 2 6 6", key: "1gw87d" }],
  ["path", { d: "M12 16H4", key: "1cjfip" }]
], uU = e("test-tube-diagonal", gU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fU = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M14.5 16h-5", key: "1ox875" }]
], wU = e("test-tube", fU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NU = [
  ["path", { d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2", key: "1hjrqt" }],
  ["path", { d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2", key: "16lc8n" }],
  ["path", { d: "M3 2h7", key: "7s29d5" }],
  ["path", { d: "M14 2h7", key: "7sicin" }],
  ["path", { d: "M9 16H4", key: "1bfye3" }],
  ["path", { d: "M20 16h-5", key: "ddnjpe" }]
], $U = e("test-tubes", NU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bU = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M17 12H7", key: "16if0g" }],
  ["path", { d: "M19 19H5", key: "vjpgq2" }]
], zU = e("text-align-center", bU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qU = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M21 19H7", key: "4cu937" }]
], jU = e("text-align-end", qU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HU = [
  ["path", { d: "M3 5h18", key: "1u36vt" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 19h18", key: "awlh7x" }]
], VU = e("text-align-justify", HU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AU = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M17 19H3", key: "z6ezky" }]
], CU = e("text-align-start", AU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LU = [
  ["path", { d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6", key: "1528k5" }],
  ["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7", key: "13ksps" }],
  ["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1", key: "1n9rhb" }],
  ["path", { d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1", key: "1mj8rg" }],
  ["path", { d: "M9 6v12", key: "velyjx" }]
], SU = e("text-cursor-input", LU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PU = [
  ["path", { d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1", key: "uvaxm9" }],
  ["path", { d: "M7 22h1a4 4 0 0 0 4-4v-1", key: "11xy8d" }],
  ["path", { d: "M7 2h1a4 4 0 0 1 4 4v1", key: "1uw06m" }]
], RU = e("text-cursor", PU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TU = [
  ["path", { d: "M15 5h6", key: "1pr8yx" }],
  ["path", { d: "M15 12h6", key: "upa0zy" }],
  ["path", { d: "M3 19h18", key: "awlh7x" }],
  ["path", { d: "m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12", key: "6lvno8" }],
  ["path", { d: "M3.92 10h6.16", key: "1tl8ex" }]
], BU = e("text-initial", TU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DU = [
  ["path", { d: "M17 5H3", key: "1cn7zz" }],
  ["path", { d: "M21 12H8", key: "scolzb" }],
  ["path", { d: "M21 19H8", key: "13qgcb" }],
  ["path", { d: "M3 12v7", key: "1ri8j3" }]
], ZU = e("text-quote", DU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FU = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M10 12H3", key: "1ulcyk" }],
  ["path", { d: "M10 19H3", key: "108z41" }],
  ["circle", { cx: "17", cy: "15", r: "3", key: "1upz2a" }],
  ["path", { d: "m21 19-1.9-1.9", key: "dwi7p8" }]
], OU = e("text-search", FU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EU = [
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M14 3h1", key: "1ec4yj" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
  ["path", { d: "M21 14v1", key: "169vum" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
  ["path", { d: "M21 9v1", key: "mxsmne" }],
  ["path", { d: "M3 14v1", key: "vnatye" }],
  ["path", { d: "M3 9v1", key: "1r0deq" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
  ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h6", key: "1vyc9m" }],
  ["path", { d: "M7 8h8", key: "1jbsf9" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M9 3h1", key: "1yesri" }]
], UU = e("text-select", EU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GU = [
  ["path", { d: "m16 16-3 3 3 3", key: "117b85" }],
  ["path", { d: "M3 12h14.5a1 1 0 0 1 0 7H13", key: "18xa6z" }],
  ["path", { d: "M3 19h6", key: "1ygdsz" }],
  ["path", { d: "M3 5h18", key: "1u36vt" }]
], IU = e("text-wrap", GU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WU = [
  ["path", { d: "M2 10s3-3 3-8", key: "3xiif0" }],
  ["path", { d: "M22 10s-3-3-3-8", key: "ioaa5q" }],
  ["path", { d: "M10 2c0 4.4-3.6 8-8 8", key: "16fkpi" }],
  ["path", { d: "M14 2c0 4.4 3.6 8 8 8", key: "b9eulq" }],
  ["path", { d: "M2 10s2 2 2 5", key: "1au1lb" }],
  ["path", { d: "M22 10s-2 2-2 5", key: "qi2y5e" }],
  ["path", { d: "M8 15h8", key: "45n4r" }],
  ["path", { d: "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1", key: "1vsc2m" }],
  ["path", { d: "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1", key: "hrha4u" }]
], XU = e("theater", WU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KU = [
  ["path", { d: "m10 20-1.25-2.5L6 18", key: "18frcb" }],
  ["path", { d: "M10 4 8.75 6.5 6 6", key: "7mghy3" }],
  ["path", { d: "M10.585 15H10", key: "4nqulp" }],
  ["path", { d: "M2 12h6.5L10 9", key: "kv9z4n" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z", key: "yu0u2z" }],
  ["path", { d: "m4 10 1.5 2L4 14", key: "k9enpj" }],
  ["path", { d: "m7 21 3-6-1.5-3", key: "j8hb9u" }],
  ["path", { d: "m7 3 3 6h2", key: "1bbqgq" }]
], YU = e("thermometer-snowflake", KU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QU = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 8a4 4 0 0 0-1.645 7.647", key: "wz5p04" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z", key: "yu0u2z" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }]
], JU = e("thermometer-sun", QU);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eG = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], tG = e("thermometer", eG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aG = [
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ],
  ["path", { d: "M17 14V2", key: "8ymqnk" }]
], hG = e("thumbs-down", aG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oG = [
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ],
  ["path", { d: "M7 10v12", key: "1qc93n" }]
], cG = e("thumbs-up", oG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], yG = e("ticket-check", dG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }]
], kG = e("ticket-minus", nG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "1l48ns"
    }
  ],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
], iG = e("ticket-percent", pG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }],
  ["path", { d: "M12 9v6", key: "199k2o" }]
], rG = e("ticket-plus", sG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "m9.5 14.5 5-5", key: "qviqfa" }]
], MG = e("ticket-slash", lG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _G = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "m9.5 14.5 5-5", key: "qviqfa" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
], vG = e("ticket-x", _G);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mG = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
], xG = e("ticket", mG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gG = [
  ["path", { d: "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12", key: "16muxl" }],
  ["path", { d: "m12 13.5 3.794.506", key: "6v5z87" }],
  ["path", { d: "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8", key: "15hfpj" }],
  ["path", { d: "M6 10V8", key: "1y41hn" }],
  ["path", { d: "M6 14v1", key: "cao2tf" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2", key: "p3bz5l" }]
], uG = e("tickets-plane", gG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fG = [
  ["path", { d: "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8", key: "15hfpj" }],
  ["path", { d: "M6 10V8", key: "1y41hn" }],
  ["path", { d: "M6 14v1", key: "cao2tf" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2", key: "p3bz5l" }]
], wG = e("tickets", fG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NG = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  ["path", { d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7", key: "10he05" }],
  ["path", { d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2", key: "15f7sh" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M12 12v-2", key: "fwoke6" }]
], $G = e("timer-off", NG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bG = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
], zG = e("timer", bG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qG = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  ["path", { d: "M12 14v-4", key: "1evpnu" }],
  ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6", key: "1ts96g" }],
  ["path", { d: "M9 17H4v5", key: "8t5av" }]
], jG = e("timer-reset", qG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HG = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
], VG = e("toggle-left", HG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AG = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
], CG = e("toggle-right", AG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LG = [
  [
    "path",
    {
      d: "M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18",
      key: "kc4kqr"
    }
  ],
  ["path", { d: "M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8", key: "1tqs57" }]
], SG = e("toilet", LG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PG = [
  ["path", { d: "M10 15h4", key: "192ueg" }],
  [
    "path",
    {
      d: "m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27",
      key: "xbnumr"
    }
  ],
  [
    "path",
    {
      d: "m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122",
      key: "eaw7gc"
    }
  ],
  [
    "path",
    {
      d: "M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
      key: "1vaooh"
    }
  ]
], RG = e("tool-case", PG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TG = [
  ["path", { d: "M21 4H3", key: "1hwok0" }],
  ["path", { d: "M18 8H6", key: "41n648" }],
  ["path", { d: "M19 12H9", key: "1g4lpz" }],
  ["path", { d: "M16 16h-6", key: "1j5d54" }],
  ["path", { d: "M11 20H9", key: "39obr8" }]
], BG = e("tornado", TG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DG = [
  ["path", { d: "M16 12v4", key: "vf1vip" }],
  [
    "path",
    {
      d: "M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z",
      key: "1h1rvn"
    }
  ],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", key: "1ksdt3" }],
  ["path", { d: "M2 14h20", key: "myj16y" }],
  ["path", { d: "M8 12v4", key: "1w4uao" }]
], ZG = e("toolbox", DG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FG = [
  ["ellipse", { cx: "12", cy: "11", rx: "3", ry: "2", key: "1b2qxu" }],
  ["ellipse", { cx: "12", cy: "12.5", rx: "10", ry: "8.5", key: "h8emeu" }]
], OG = e("torus", FG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EG = [
  ["path", { d: "M12 20v-6", key: "1rm09r" }],
  ["path", { d: "M19.656 14H22", key: "170xzr" }],
  ["path", { d: "M2 14h12", key: "d8icqz" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2", key: "s23sx2" }],
  ["path", { d: "M9.656 4H20a2 2 0 0 1 2 2v10.344", key: "ovjcvl" }]
], UG = e("touchpad-off", EG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GG = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M2 14h20", key: "myj16y" }],
  ["path", { d: "M12 20v-6", key: "1rm09r" }]
], IG = e("touchpad", GG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WG = [
  [
    "path",
    { d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z", key: "1pledb" }
  ],
  ["path", { d: "M8 13v9", key: "hmv0ci" }],
  ["path", { d: "M16 22v-9", key: "ylnf1u" }],
  ["path", { d: "m9 6 1 7", key: "dpdgam" }],
  ["path", { d: "m15 6-1 7", key: "ls7zgu" }],
  ["path", { d: "M12 6V2", key: "1pj48d" }],
  ["path", { d: "M13 2h-2", key: "mj6ths" }]
], XG = e("tower-control", WG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KG = [
  ["rect", { width: "18", height: "12", x: "3", y: "8", rx: "1", key: "158fvp" }],
  ["path", { d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3", key: "s0042v" }],
  ["path", { d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3", key: "9wmeh2" }]
], YG = e("toy-brick", KG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QG = [
  ["path", { d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20", key: "she1j9" }],
  ["path", { d: "M16 18h-5", key: "bq60fd" }],
  ["path", { d: "M18 5a1 1 0 0 0-1 1v5.573", key: "1kv8ia" }],
  ["path", { d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246", key: "1q1ert" }],
  ["path", { d: "M4 11V4", key: "9ft8pt" }],
  ["path", { d: "M7 15h.01", key: "k5ht0j" }],
  ["path", { d: "M8 10.1V4", key: "1jgyzo" }],
  ["circle", { cx: "18", cy: "18", r: "2", key: "1emm8v" }],
  ["circle", { cx: "7", cy: "15", r: "5", key: "ddtuc" }]
], JG = e("tractor", QG);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eI = [
  ["path", { d: "M16.05 10.966a5 2.5 0 0 1-8.1 0", key: "m5jpwb" }],
  [
    "path",
    {
      d: "m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04",
      key: "rbg3g8"
    }
  ],
  ["path", { d: "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z", key: "vap8c8" }],
  ["path", { d: "M9.194 6.57a5 2.5 0 0 0 5.61 0", key: "15hn5c" }]
], tI = e("traffic-cone", eI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aI = [
  ["path", { d: "M2 22V12a10 10 0 1 1 20 0v10", key: "o0fyp0" }],
  ["path", { d: "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8", key: "m8q3n9" }],
  ["path", { d: "M10 15h.01", key: "44in9x" }],
  ["path", { d: "M14 15h.01", key: "5mohn5" }],
  ["path", { d: "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z", key: "hckbmu" }],
  ["path", { d: "m9 19-2 3", key: "iij7hm" }],
  ["path", { d: "m15 19 2 3", key: "npx8sa" }]
], hI = e("train-front-tunnel", aI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oI = [
  ["path", { d: "M8 3.1V7a4 4 0 0 0 8 0V3.1", key: "1v71zp" }],
  ["path", { d: "m9 15-1-1", key: "1yrq24" }],
  ["path", { d: "m15 15 1-1", key: "1t0d6s" }],
  ["path", { d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z", key: "1p0hjs" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m16 19 2 3", key: "xo31yx" }]
], cI = e("train-front", oI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dI = [
  ["path", { d: "M2 17 17 2", key: "18b09t" }],
  ["path", { d: "m2 14 8 8", key: "1gv9hu" }],
  ["path", { d: "m5 11 8 8", key: "189pqp" }],
  ["path", { d: "m8 8 8 8", key: "1imecy" }],
  ["path", { d: "m11 5 8 8", key: "ummqn6" }],
  ["path", { d: "m14 2 8 8", key: "1vk7dn" }],
  ["path", { d: "M7 22 22 7", key: "15mb1i" }]
], yI = e("train-track", dI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nI = [
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m18 22-2-3", key: "1p0ohu" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }]
], kI = e("tram-front", nI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pI = [
  ["path", { d: "M12 16v6", key: "c8a4gj" }],
  ["path", { d: "M14 20h-4", key: "m8m19d" }],
  ["path", { d: "M18 2h4v4", key: "1341mj" }],
  ["path", { d: "m2 2 7.17 7.17", key: "13q8l2" }],
  ["path", { d: "M2 5.355V2h3.357", key: "18136r" }],
  ["path", { d: "m22 2-7.17 7.17", key: "1epvy4" }],
  ["path", { d: "M8 5 5 8", key: "mgbjhz" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
], iI = e("transgender", pI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sI = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], rI = e("trash-2", sI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lI = [
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], MI = e("trash", lI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _I = [
  [
    "path",
    {
      d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",
      key: "oadzkq"
    }
  ],
  ["path", { d: "M12 19v3", key: "npa21l" }]
], vI = e("tree-deciduous", _I);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mI = [
  ["path", { d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4", key: "foxbe7" }],
  [
    "path",
    { d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3", key: "18arnh" }
  ],
  [
    "path",
    {
      d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",
      key: "ywahnh"
    }
  ],
  ["path", { d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14", key: "ft0feo" }]
], xI = e("tree-palm", mI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gI = [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
], uI = e("tree-pine", gI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fI = [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", key: "1l6gj6" }],
  ["path", { d: "M7 16v6", key: "1a82de" }],
  ["path", { d: "M13 19v3", key: "13sx9i" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
      key: "1sj9kv"
    }
  ]
], wI = e("trees", fI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NI = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["rect", { width: "3", height: "9", x: "7", y: "7", key: "14n3xi" }],
  ["rect", { width: "3", height: "5", x: "14", y: "7", key: "s4azjd" }]
], $I = e("trello", NI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bI = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
], zI = e("trending-down", bI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qI = [
  ["path", { d: "M14.828 14.828 21 21", key: "ar5fw7" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "m21 3-9 9-4-4-6 6", key: "1h02xo" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }]
], jI = e("trending-up-down", qI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HI = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], VI = e("trending-up", HI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AI = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], CI = e("triangle-alert", AI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LI = [
  ["path", { d: "M10.17 4.193a2 2 0 0 1 3.666.013", key: "pltmmw" }],
  ["path", { d: "M14 21h2", key: "v4qezv" }],
  ["path", { d: "m15.874 7.743 1 1.732", key: "10m0iw" }],
  ["path", { d: "m18.849 12.952 1 1.732", key: "zadnam" }],
  ["path", { d: "M21.824 18.18a2 2 0 0 1-1.835 2.824", key: "fvwuk4" }],
  ["path", { d: "M4.024 21a2 2 0 0 1-1.839-2.839", key: "1e1kah" }],
  ["path", { d: "m5.136 12.952-1 1.732", key: "1u4ldi" }],
  ["path", { d: "M8 21h2", key: "i9zjee" }],
  ["path", { d: "m8.102 7.743-1 1.732", key: "1zzo4u" }]
], SI = e("triangle-dashed", LI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PI = [
  [
    "path",
    {
      d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z",
      key: "183wce"
    }
  ]
], RI = e("triangle-right", PI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TI = [
  [
    "path",
    { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", key: "14u9p9" }
  ]
], BI = e("triangle", TI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DI = [
  ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }],
  ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }],
  ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
  ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]
], ZI = e("trophy", DI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FI = [
  ["path", { d: "M14 19V7a2 2 0 0 0-2-2H9", key: "15peso" }],
  ["path", { d: "M15 19H9", key: "18q6dt" }],
  [
    "path",
    {
      d: "M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14",
      key: "1dkp3j"
    }
  ],
  ["path", { d: "M2 13v5a1 1 0 0 0 1 1h2", key: "pkmmzz" }],
  [
    "path",
    { d: "M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02", key: "1n26pd" }
  ],
  ["circle", { cx: "17", cy: "19", r: "2", key: "1nxcgd" }],
  ["circle", { cx: "7", cy: "19", r: "2", key: "gzo7y7" }]
], OI = e("truck-electric", FI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EI = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
], UI = e("truck", EI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GI = [
  ["path", { d: "M15 4 5 9", key: "14bkc9" }],
  ["path", { d: "m15 8.5-10 5", key: "1grtsx" }],
  ["path", { d: "M18 12a9 9 0 0 1-9 9V3", key: "1sst7f" }]
], II = e("turkish-lira", GI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WI = [
  ["path", { d: "M10 12.01h.01", key: "7rp0yl" }],
  ["path", { d: "M18 8v4a8 8 0 0 1-1.07 4", key: "1st48v" }],
  ["circle", { cx: "10", cy: "12", r: "4", key: "19levz" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
], XI = e("turntable", WI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KI = [
  [
    "path",
    {
      d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",
      key: "1lbbv7"
    }
  ],
  ["path", { d: "M4.82 7.9 8 10", key: "m9wose" }],
  ["path", { d: "M15.18 7.9 12 10", key: "p8dp2u" }],
  ["path", { d: "M16.93 10H20a2 2 0 0 1 0 4H2", key: "12nsm7" }]
], YI = e("turtle", KI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QI = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
      key: "vbtd3f"
    }
  ],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }]
], JI = e("tv-minimal-play", QI);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eW = [
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }]
], tW = e("tv-minimal", eW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aW = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
], hW = e("tv", aW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oW = [
  ["path", { d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7", key: "c0yzno" }]
], cW = e("twitch", oW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dW = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
], yW = e("twitter", dW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nW = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
], kW = e("type", nW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pW = [
  [
    "path",
    {
      d: "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",
      key: "1reda3"
    }
  ]
], iW = e("type-outline", pW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sW = [
  ["path", { d: "M12 13v7a2 2 0 0 0 4 0", key: "rpgb42" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  [
    "path",
    { d: "M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51", key: "yawknk" }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10", key: "5sfalc" }]
], rW = e("umbrella-off", sW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lW = [
  ["path", { d: "M12 13v7a2 2 0 0 0 4 0", key: "rpgb42" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  [
    "path",
    {
      d: "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
      key: "124nyo"
    }
  ]
], MW = e("umbrella", lW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _W = [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
], vW = e("underline", _W);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mW = [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
], xW = e("undo-2", mW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gW = [
  ["path", { d: "M21 17a9 9 0 0 0-15-6.7L3 13", key: "8mp6z9" }],
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["circle", { cx: "12", cy: "17", r: "1", key: "1ixnty" }]
], uW = e("undo-dot", gW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fW = [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
], wW = e("undo", fW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NW = [
  ["path", { d: "M16 12h6", key: "15xry1" }],
  ["path", { d: "M8 12H2", key: "1jqql6" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m19 15 3-3-3-3", key: "wjy7rq" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }]
], $W = e("unfold-horizontal", NW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bW = [
  ["path", { d: "M12 22v-6", key: "6o8u61" }],
  ["path", { d: "M12 8V2", key: "1wkif3" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m15 5-3-3-3 3", key: "itvq4r" }]
], zW = e("unfold-vertical", bW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qW = [
  ["rect", { width: "8", height: "6", x: "5", y: "4", rx: "1", key: "nzclkv" }],
  ["rect", { width: "8", height: "6", x: "11", y: "14", rx: "1", key: "4tytwb" }]
], jW = e("ungroup", qW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HW = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  ["path", { d: "M18 16h.01", key: "plv8zi" }],
  [
    "path",
    {
      d: "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z",
      key: "1ogmi3"
    }
  ],
  ["path", { d: "M6 12h.01", key: "c2rlol" }],
  ["path", { d: "M6 16h.01", key: "1pmjb7" }],
  ["circle", { cx: "12", cy: "10", r: "2", key: "1yojzk" }]
], VW = e("university", HW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AW = [
  ["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2", key: "1re2ne" }]
], CW = e("unlink-2", AW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LW = [
  [
    "path",
    {
      d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
      key: "yqzxt4"
    }
  ],
  [
    "path",
    {
      d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
      key: "4qinb0"
    }
  ],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "5", key: "1041cp" }],
  ["line", { x1: "2", x2: "5", y1: "8", y2: "8", key: "14m1p5" }],
  ["line", { x1: "16", x2: "16", y1: "19", y2: "22", key: "rzdirn" }],
  ["line", { x1: "19", x2: "22", y1: "16", y2: "16", key: "ox905f" }]
], SW = e("unlink", LW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PW = [
  ["path", { d: "m19 5 3-3", key: "yk6iyv" }],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  [
    "path",
    { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z", key: "1snsnr" }
  ]
], RW = e("unplug", PW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TW = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], BW = e("upload", TW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DW = [
  ["circle", { cx: "10", cy: "7", r: "1", key: "dypaad" }],
  ["circle", { cx: "4", cy: "20", r: "1", key: "22iqad" }],
  ["path", { d: "M4.7 19.3 19 5", key: "1enqfc" }],
  ["path", { d: "m21 3-3 1 2 2Z", key: "d3ov82" }],
  ["path", { d: "M9.26 7.68 5 12l2 5", key: "1esawj" }],
  ["path", { d: "m10 14 5 2 3.5-3.5", key: "v8oal5" }],
  ["path", { d: "m18 12 1-1 1 1-1 1Z", key: "1bh22v" }]
], ZW = e("usb", DW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FW = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], OW = e("user-check", FW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EW = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m14.305 16.53.923-.382", key: "1itpsq" }],
  ["path", { d: "m15.228 13.852-.923-.383", key: "eplpkm" }],
  ["path", { d: "m16.852 12.228-.383-.923", key: "13v3q0" }],
  ["path", { d: "m16.852 17.772-.383.924", key: "1i8mnm" }],
  ["path", { d: "m19.148 12.228.383-.923", key: "1q8j1v" }],
  ["path", { d: "m19.53 18.696-.382-.924", key: "vk1qj3" }],
  ["path", { d: "m20.772 13.852.924-.383", key: "n880s0" }],
  ["path", { d: "m20.772 16.148.924.383", key: "1g6xey" }],
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], UW = e("user-cog", EW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GW = [
  ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }],
  ["path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2", key: "3bnktk" }],
  ["path", { d: "M15 15.5V14a2 2 0 0 1 4 0v1.5", key: "12ym5i" }],
  ["rect", { width: "8", height: "5", x: "13", y: "16", rx: ".899", key: "4p176n" }]
], IW = e("user-lock", GW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WW = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
], XW = e("user-minus", WW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KW = [
  ["path", { d: "M11.5 15H7a4 4 0 0 0-4 4v2", key: "15lzij" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1817ys"
    }
  ],
  ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }]
], YW = e("user-pen", KW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QW = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
], JW = e("user-plus", QW);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eX = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
], tX = e("user-round-check", eX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aX = [
  ["path", { d: "m14.305 19.53.923-.382", key: "3m78fa" }],
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m16.852 15.228-.383-.923", key: "5xggr7" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62", key: "1yezr2" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], hX = e("user-round-cog", aX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oX = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 19h-6", key: "vcuq98" }]
], cX = e("user-round-minus", oX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dX = [
  ["path", { d: "M2 21a8 8 0 0 1 10.821-7.487", key: "1c8h7z" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1817ys"
    }
  ],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }]
], yX = e("user-round-pen", dX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nX = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M22 19h-6", key: "vcuq98" }]
], kX = e("user-round-plus", nX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pX = [
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62", key: "1yezr2" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["path", { d: "m22 22-1.9-1.9", key: "1e5ubv" }]
], iX = e("user-round-search", pX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sX = [
  ["path", { d: "M2 21a8 8 0 0 1 11.873-7", key: "74fkxq" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "m17 17 5 5", key: "p7ous7" }],
  ["path", { d: "m22 17-5 5", key: "gqnmv0" }]
], rX = e("user-round-x", sX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lX = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
], MX = e("user-round", lX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _X = [
  ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }],
  ["path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2", key: "3bnktk" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }]
], vX = e("user-search", _X);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mX = [
  [
    "path",
    {
      d: "M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
      key: "1m8t9f"
    }
  ],
  ["path", { d: "M8 15H7a4 4 0 0 0-4 4v2", key: "l9tmp8" }],
  ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }]
], xX = e("user-star", mX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gX = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
], uX = e("user-x", gX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fX = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], wX = e("user", fX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NX = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
], $X = e("users-round", NX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bX = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
], zX = e("utensils-crossed", bX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qX = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], jX = e("users", qX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HX = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
], VX = e("utensils", HX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AX = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "M2 5h20", key: "1fs1ex" }],
  ["path", { d: "M3 3v2", key: "9imdir" }],
  ["path", { d: "M7 3v2", key: "n0os7" }],
  ["path", { d: "M17 3v2", key: "1l2re6" }],
  ["path", { d: "M21 3v2", key: "1duuac" }],
  ["path", { d: "m19 5-7 7-7-7", key: "133zxf" }]
], CX = e("utility-pole", AX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LX = [
  [
    "path",
    {
      d: "M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3",
      key: "k3s650"
    }
  ],
  [
    "path",
    { d: "M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2", key: "fnd93u" }
  ],
  ["path", { d: "M9 18h5", key: "lrx6i" }],
  ["circle", { cx: "16", cy: "18", r: "2", key: "1v4tcr" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
], SX = e("van", LX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PX = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9", key: "uto9ud" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9", key: "4w2vsq" }],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15", key: "f7djnv" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15", key: "1shsy8" }]
], RX = e("variable", PX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TX = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }],
  ["path", { d: "m7.9 7.9 2.7 2.7", key: "hpeyl3" }],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }],
  ["path", { d: "m13.4 10.6 2.7-2.7", key: "264c1n" }],
  ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor", key: "nkw3mc" }],
  ["path", { d: "m7.9 16.1 2.7-2.7", key: "p81g5e" }],
  ["circle", { cx: "16.5", cy: "16.5", r: ".5", fill: "currentColor", key: "fubopw" }],
  ["path", { d: "m13.4 13.4 2.7 2.7", key: "abhel3" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], BX = e("vault", TX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DX = [
  ["path", { d: "M19.5 7a24 24 0 0 1 0 10", key: "8n60xe" }],
  ["path", { d: "M4.5 7a24 24 0 0 0 0 10", key: "2lmadr" }],
  ["path", { d: "M7 19.5a24 24 0 0 0 10 0", key: "1q94o2" }],
  ["path", { d: "M7 4.5a24 24 0 0 1 10 0", key: "2z8ypa" }],
  ["rect", { x: "17", y: "17", width: "5", height: "5", rx: "1", key: "1ac74s" }],
  ["rect", { x: "17", y: "2", width: "5", height: "5", rx: "1", key: "1e7h5j" }],
  ["rect", { x: "2", y: "17", width: "5", height: "5", rx: "1", key: "1t4eah" }],
  ["rect", { x: "2", y: "2", width: "5", height: "5", rx: "1", key: "940dhs" }]
], ZX = e("vector-square", DX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FX = [
  ["path", { d: "M16 8q6 0 6-6-6 0-6 6", key: "qsyyc4" }],
  ["path", { d: "M17.41 3.59a10 10 0 1 0 3 3", key: "41m9h7" }],
  ["path", { d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14", key: "qiv7li" }]
], OX = e("vegan", FX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EX = [
  ["path", { d: "M18 11c-1.5 0-2.5.5-3 2", key: "1fod00" }],
  [
    "path",
    {
      d: "M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",
      key: "d70hit"
    }
  ],
  ["path", { d: "M6 11c1.5 0 2.5.5 3 2", key: "136fht" }]
], UX = e("venetian-mask", EX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GX = [
  ["path", { d: "M10 20h4", key: "ni2waw" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }],
  ["path", { d: "M17 2h4v4", key: "vhe59" }],
  ["path", { d: "m21 2-5.46 5.46", key: "19kypf" }],
  ["circle", { cx: "12", cy: "11", r: "5", key: "16gxyc" }]
], IX = e("venus-and-mars", GX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WX = [
  ["path", { d: "M12 15v7", key: "t2xh3l" }],
  ["path", { d: "M9 19h6", key: "456am0" }],
  ["circle", { cx: "12", cy: "9", r: "6", key: "1nw4tq" }]
], XX = e("venus", WX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KX = [
  ["path", { d: "m2 8 2 2-2 2 2 2-2 2", key: "sv1b1" }],
  ["path", { d: "m22 8-2 2 2 2-2 2 2 2", key: "101i4y" }],
  ["path", { d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2", key: "1hbad5" }],
  ["path", { d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34", key: "1x5tf0" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], YX = e("vibrate-off", KX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QX = [
  ["path", { d: "m2 8 2 2-2 2 2 2-2 2", key: "sv1b1" }],
  ["path", { d: "m22 8-2 2 2 2-2 2 2 2", key: "101i4y" }],
  ["rect", { width: "8", height: "14", x: "8", y: "5", rx: "1", key: "1oyrl4" }]
], JX = e("vibrate", QX);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eK = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], tK = e("video-off", eK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aK = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M2 8h20", key: "d11cs7" }],
  ["circle", { cx: "8", cy: "14", r: "2", key: "1k2qr5" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["circle", { cx: "16", cy: "14", r: "2", key: "14k7lr" }]
], hK = e("videotape", aK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oK = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], cK = e("video", oK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dK = [
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2", key: "mrq65r" }],
  ["path", { d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2", key: "be3xqs" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
      key: "11ak4c"
    }
  ]
], yK = e("view", dK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nK = [
  ["circle", { cx: "6", cy: "12", r: "4", key: "1ehtga" }],
  ["circle", { cx: "18", cy: "12", r: "4", key: "4vafl8" }],
  ["line", { x1: "6", x2: "18", y1: "16", y2: "16", key: "pmt8us" }]
], kK = e("voicemail", nK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pK = [
  ["path", { d: "M11.1 7.1a16.55 16.55 0 0 1 10.9 4", key: "2880wi" }],
  ["path", { d: "M12 12a12.6 12.6 0 0 1-8.7 5", key: "113sja" }],
  ["path", { d: "M16.8 13.6a16.55 16.55 0 0 1-9 7.5", key: "1qmsgl" }],
  ["path", { d: "M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10", key: "1bmeqp" }],
  ["path", { d: "M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5", key: "iekzv9" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], iK = e("volleyball", pK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sK = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }]
], rK = e("volume-1", sK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lK = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], MK = e("volume-2", lK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _K = [
  ["path", { d: "M16 9a5 5 0 0 1 .95 2.293", key: "1fgyg8" }],
  ["path", { d: "M19.364 5.636a9 9 0 0 1 1.889 9.96", key: "l3zxae" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11",
      key: "1gbwow"
    }
  ],
  ["path", { d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686", key: "s2je0y" }]
], vK = e("volume-off", _K);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mK = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], xK = e("volume-x", mK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gK = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ]
], uK = e("volume", gK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fK = [
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ["path", { d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z", key: "1ezoue" }],
  ["path", { d: "M22 19H2", key: "nuriw5" }]
], wK = e("vote", fK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NK = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "4125el" }],
  [
    "path",
    {
      d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
      key: "1dpki6"
    }
  ]
], $K = e("wallet-cards", NK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bK = [
  ["path", { d: "M17 14h.01", key: "7oqj8z" }],
  [
    "path",
    {
      d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",
      key: "u1rqew"
    }
  ]
], zK = e("wallet-minimal", bK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qK = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
], jK = e("wallet", qK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HK = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15", key: "1sl52q" }],
  ["circle", { cx: "8", cy: "9", r: "2", key: "gjzl9d" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
], VK = e("wallpaper", HK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AK = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
], CK = e("wand-sparkles", AK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LK = [
  ["path", { d: "M15 4V2", key: "z1p9b7" }],
  ["path", { d: "M15 16v-2", key: "px0unx" }],
  ["path", { d: "M8 9h2", key: "1g203m" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M17.8 11.8 19 13", key: "yihg8r" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }],
  ["path", { d: "M17.8 6.2 19 5", key: "fd4us0" }],
  ["path", { d: "m3 21 9-9", key: "1jfql5" }],
  ["path", { d: "M12.2 6.2 11 5", key: "i3da3b" }]
], SK = e("wand", LK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PK = [
  ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11", key: "pb2vm6" }],
  [
    "path",
    {
      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
      key: "doq5xv"
    }
  ],
  ["path", { d: "M6 13h12", key: "yf64js" }],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
], RK = e("warehouse", PK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TK = [
  ["path", { d: "M3 6h3", key: "155dbl" }],
  ["path", { d: "M17 6h.01", key: "e2y6kg" }],
  ["rect", { width: "18", height: "20", x: "3", y: "2", rx: "2", key: "od3kk9" }],
  ["circle", { cx: "12", cy: "13", r: "5", key: "nlbqau" }],
  ["path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5", key: "17lach" }]
], BK = e("washing-machine", TK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DK = [
  ["path", { d: "M12 10L12 2", key: "jvb0aw" }],
  ["path", { d: "M16 6L12 10L8 6", key: "9j6vje" }],
  [
    "path",
    {
      d: "M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15",
      key: "s2zepw"
    }
  ],
  [
    "path",
    {
      d: "M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21",
      key: "u68omc"
    }
  ]
], ZK = e("waves-arrow-down", DK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FK = [
  ["path", { d: "M12 10v2.2l1.6 1", key: "n3r21l" }],
  [
    "path",
    { d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05", key: "18k57s" }
  ],
  ["path", { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05", key: "16ny36" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }]
], OK = e("watch", FK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EK = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  [
    "path",
    {
      d: "M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "1p9f19"
    }
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "vbxynw"
    }
  ],
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }]
], UK = e("waves-arrow-up", EK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GK = [
  ["path", { d: "M19 5a2 2 0 0 0-2 2v11", key: "s41o68" }],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "rd2r6e"
    }
  ],
  ["path", { d: "M7 13h10", key: "1rwob1" }],
  ["path", { d: "M7 9h10", key: "12czzb" }],
  ["path", { d: "M9 5a2 2 0 0 0-2 2v11", key: "x0q4gh" }]
], IK = e("waves-ladder", GK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WK = [
  [
    "path",
    {
      d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "knzxuh"
    }
  ],
  [
    "path",
    {
      d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "2jd2cc"
    }
  ],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "rd2r6e"
    }
  ]
], XK = e("waves", WK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KK = [
  ["path", { d: "m10.586 5.414-5.172 5.172", key: "4mc350" }],
  ["path", { d: "m18.586 13.414-5.172 5.172", key: "8c96vv" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["circle", { cx: "12", cy: "20", r: "2", key: "144qzu" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }],
  ["circle", { cx: "20", cy: "12", r: "2", key: "1xzzfp" }],
  ["circle", { cx: "4", cy: "12", r: "2", key: "1hvhnz" }]
], YK = e("waypoints", KK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QK = [
  ["circle", { cx: "12", cy: "10", r: "8", key: "1gshiw" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 22h10", key: "10w4w3" }],
  ["path", { d: "M12 22v-4", key: "1utk9m" }]
], JK = e("webcam", QK);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eY = [
  ["path", { d: "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15", key: "1tvl6x" }],
  ["path", { d: "M9 3.4a4 4 0 0 1 6.52.66", key: "q04jfq" }],
  ["path", { d: "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05", key: "azowf0" }],
  ["path", { d: "M20.3 20.3a4 4 0 0 1-2.3.7", key: "5joiws" }],
  ["path", { d: "M18.6 13a4 4 0 0 1 3.357 3.414", key: "cangb8" }],
  ["path", { d: "m12 6 .6 1", key: "tpjl1n" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], tY = e("webhook-off", eY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aY = [
  [
    "path",
    {
      d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",
      key: "q3hayz"
    }
  ],
  ["path", { d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06", key: "1go1hn" }],
  ["path", { d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8", key: "qlwsc0" }]
], hY = e("webhook", aY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oY = [
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z",
      key: "1wl739"
    }
  ],
  ["path", { d: "M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0", key: "1egezo" }],
  ["circle", { cx: "12", cy: "5", r: "3", key: "rqqgnr" }]
], cY = e("weight-tilde", oY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dY = [
  ["circle", { cx: "12", cy: "5", r: "3", key: "rqqgnr" }],
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
      key: "56o5sh"
    }
  ]
], yY = e("weight", dY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nY = [
  ["path", { d: "m2 22 10-10", key: "28ilpk" }],
  ["path", { d: "m16 8-1.17 1.17", key: "1qqm82" }],
  [
    "path",
    {
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1rdhi6"
    }
  ],
  [
    "path",
    { d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97", key: "4wz8re" }
  ],
  [
    "path",
    { d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62", key: "rves66" }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z", key: "19rau1" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "tc8ph9"
    }
  ],
  [
    "path",
    {
      d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98",
      key: "ak46r"
    }
  ],
  [
    "path",
    {
      d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28",
      key: "1tw520"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], kY = e("wheat-off", nY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pY = [
  ["path", { d: "M2 22 16 8", key: "60hf96" }],
  [
    "path",
    {
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1rdhi6"
    }
  ],
  [
    "path",
    {
      d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1sdzmb"
    }
  ],
  [
    "path",
    {
      d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "eoatbi"
    }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z", key: "19rau1" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "tc8ph9"
    }
  ],
  [
    "path",
    {
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "2m8kc5"
    }
  ],
  [
    "path",
    {
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "vex3ng"
    }
  ]
], iY = e("wheat", pY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sY = [
  ["circle", { cx: "7", cy: "12", r: "3", key: "12clwm" }],
  ["path", { d: "M10 9v6", key: "17i7lo" }],
  ["circle", { cx: "17", cy: "12", r: "3", key: "gl7c2s" }],
  ["path", { d: "M14 7v8", key: "dl84cr" }],
  ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1", key: "lt2kga" }]
], rY = e("whole-word", sY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lY = [
  ["path", { d: "m14.305 19.53.923-.382", key: "3m78fa" }],
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m16.852 15.228-.383-.923", key: "5xggr7" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "M2 7.82a15 15 0 0 1 20 0", key: "1ovjuk" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["path", { d: "M5 11.858a10 10 0 0 1 11.5-1.785", key: "3sn16i" }],
  ["path", { d: "M8.5 15.429a5 5 0 0 1 2.413-1.31", key: "1pxovh" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
], MY = e("wifi-cog", lY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _Y = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], vY = e("wifi-high", _Y);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mY = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], xY = e("wifi-low", mY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gY = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], uY = e("wifi-off", gY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fY = [
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1817ys"
    }
  ],
  ["path", { d: "M5 12.859a10 10 0 0 1 10.5-2.222", key: "rpb7oy" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 3-1.406", key: "r8bmzl" }]
], wY = e("wifi-pen", fY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NY = [
  ["path", { d: "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5", key: "1immaq" }],
  ["path", { d: "M11.965 14.105h4", key: "uejny8" }],
  ["path", { d: "M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5", key: "1i3a7e" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M21.965 22.105v-4", key: "1ku6vx" }],
  ["path", { d: "M5 12.86a10 10 0 0 1 3-2.032", key: "pemdtu" }],
  ["path", { d: "M8.5 16.429h.01", key: "2bm739" }]
], $Y = e("wifi-sync", NY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bY = [["path", { d: "M12 20h.01", key: "zekei9" }]], zY = e("wifi-zero", bY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qY = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], jY = e("wifi", qY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HY = [
  ["path", { d: "M10 2v8", key: "d4bbey" }],
  ["path", { d: "M12.8 21.6A2 2 0 1 0 14 18H2", key: "19kp1d" }],
  ["path", { d: "M17.5 10a2.5 2.5 0 1 1 2 4H2", key: "19kpjc" }],
  ["path", { d: "m6 6 4 4 4-4", key: "k13n16" }]
], VY = e("wind-arrow-down", HY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AY = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
], CY = e("wind", AY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LY = [
  ["path", { d: "M8 22h8", key: "rmew8v" }],
  ["path", { d: "M7 10h3m7 0h-1.343", key: "v48bem" }],
  ["path", { d: "M12 15v7", key: "t2xh3l" }],
  [
    "path",
    {
      d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198",
      key: "1ymjlu"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
], SY = e("wine-off", LY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PY = [
  ["path", { d: "M8 22h8", key: "rmew8v" }],
  ["path", { d: "M7 10h10", key: "1101jm" }],
  ["path", { d: "M12 15v7", key: "t2xh3l" }],
  [
    "path",
    { d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z", key: "10ffi3" }
  ]
], RY = e("wine", PY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TY = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
], BY = e("workflow", TY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DY = [
  ["path", { d: "m19 12-1.5 3", key: "9bcu4o" }],
  ["path", { d: "M19.63 18.81 22 20", key: "121v98" }],
  [
    "path",
    {
      d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
      key: "1tij6q"
    }
  ]
], ZY = e("worm", DY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FY = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      key: "1ngwbx"
    }
  ]
], OY = e("wrench", FY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EY = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], UY = e("x", EY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GY = [
  ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317", key: "193nxd" }],
  ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773", key: "27a7lr" }],
  [
    "path",
    {
      d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
      key: "1e0qe9"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], IY = e("zap-off", GY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WY = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
], XY = e("youtube", WY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KY = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], YY = e("zap", KY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QY = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
], JY = e("zoom-in", QY);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eQ = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
], tQ = e("zoom-out", eQ);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AArrowDown: s1,
  AArrowUp: l1,
  ALargeSmall: _1,
  Accessibility: m1,
  Activity: g1,
  AirVent: f1,
  Airplay: N1,
  AlarmClock: L1,
  AlarmClockCheck: b1,
  AlarmClockMinus: q1,
  AlarmClockOff: H1,
  AlarmClockPlus: A1,
  AlarmSmoke: P1,
  Album: T1,
  AlignCenterHorizontal: D1,
  AlignCenterVertical: F1,
  AlignEndHorizontal: E1,
  AlignEndVertical: G1,
  AlignHorizontalDistributeCenter: W1,
  AlignHorizontalDistributeEnd: K1,
  AlignHorizontalDistributeStart: Q1,
  AlignHorizontalJustifyCenter: e2,
  AlignHorizontalJustifyEnd: a2,
  AlignHorizontalJustifyStart: o2,
  AlignHorizontalSpaceAround: d2,
  AlignHorizontalSpaceBetween: n2,
  AlignStartHorizontal: p2,
  AlignStartVertical: s2,
  AlignVerticalDistributeCenter: l2,
  AlignVerticalDistributeEnd: _2,
  AlignVerticalDistributeStart: m2,
  AlignVerticalJustifyCenter: f2,
  AlignVerticalJustifyEnd: g2,
  AlignVerticalJustifyStart: N2,
  AlignVerticalSpaceAround: b2,
  AlignVerticalSpaceBetween: q2,
  Ambulance: H2,
  Ampersand: A2,
  Ampersands: L2,
  Amphora: P2,
  Anchor: D2,
  Angry: T2,
  Annoyed: F2,
  Antenna: E2,
  Anvil: G2,
  Aperture: W2,
  AppWindow: Q2,
  AppWindowMac: K2,
  Apple: e0,
  Archive: d0,
  ArchiveRestore: a0,
  ArchiveX: o0,
  Armchair: n0,
  ArrowBigDown: s0,
  ArrowBigDownDash: p0,
  ArrowBigLeft: _0,
  ArrowBigLeftDash: l0,
  ArrowBigRight: g0,
  ArrowBigRightDash: m0,
  ArrowBigUp: N0,
  ArrowBigUpDash: f0,
  ArrowDown: K0,
  ArrowDown01: b0,
  ArrowDown10: q0,
  ArrowDownAZ: H0,
  ArrowDownFromLine: A0,
  ArrowDownLeft: L0,
  ArrowDownNarrowWide: P0,
  ArrowDownRight: T0,
  ArrowDownToDot: D0,
  ArrowDownToLine: F0,
  ArrowDownUp: E0,
  ArrowDownWideNarrow: G0,
  ArrowDownZA: W0,
  ArrowLeft: oe,
  ArrowLeftFromLine: Q0,
  ArrowLeftRight: ee,
  ArrowLeftToLine: ae,
  ArrowRight: pe,
  ArrowRightFromLine: de,
  ArrowRightLeft: ne,
  ArrowRightToLine: se,
  ArrowUp: Te,
  ArrowUp01: le,
  ArrowUp10: _e,
  ArrowUpAZ: me,
  ArrowUpDown: ge,
  ArrowUpFromDot: fe,
  ArrowUpFromLine: Ne,
  ArrowUpLeft: be,
  ArrowUpNarrowWide: qe,
  ArrowUpRight: He,
  ArrowUpToLine: Ae,
  ArrowUpWideNarrow: Le,
  ArrowUpZA: Pe,
  ArrowsUpFromLine: De,
  Asterisk: Fe,
  AtSign: Ee,
  Atom: Ge,
  AudioLines: We,
  AudioWaveform: Ke,
  Award: Qe,
  Axe: et,
  Axis3d: at,
  Baby: dt,
  Backpack: ot,
  Badge: Et,
  BadgeAlert: nt,
  BadgeCent: pt,
  BadgeCheck: st,
  BadgeDollarSign: lt,
  BadgeEuro: _t,
  BadgeIndianRupee: mt,
  BadgeInfo: gt,
  BadgeJapaneseYen: ft,
  BadgeMinus: Nt,
  BadgePercent: bt,
  BadgePlus: qt,
  BadgePoundSterling: Ht,
  BadgeQuestionMark: At,
  BadgeRussianRuble: Lt,
  BadgeSwissFranc: Pt,
  BadgeTurkishLira: Tt,
  BadgeX: Dt,
  BaggageClaim: Ft,
  Balloon: Gt,
  Ban: Wt,
  Banana: Kt,
  Bandage: ea,
  Banknote: na,
  BanknoteArrowDown: Qt,
  BanknoteArrowUp: aa,
  BanknoteX: oa,
  Barcode: da,
  Barrel: pa,
  Baseline: sa,
  Bath: la,
  Battery: Ha,
  BatteryCharging: _a,
  BatteryFull: ma,
  BatteryLow: ga,
  BatteryMedium: fa,
  BatteryPlus: Na,
  BatteryWarning: ba,
  Beaker: qa,
  Bean: La,
  BeanOff: Aa,
  Bed: Da,
  BedDouble: Pa,
  BedSingle: Ta,
  Beef: Fa,
  Beer: Wa,
  BeerOff: Ea,
  Bell: dh,
  BellDot: Ga,
  BellElectric: Ka,
  BellMinus: Qa,
  BellOff: eh,
  BellPlus: ah,
  BellRing: oh,
  BetweenHorizontalEnd: nh,
  BetweenHorizontalStart: ph,
  BetweenVerticalEnd: sh,
  BetweenVerticalStart: lh,
  BicepsFlexed: _h,
  Bike: mh,
  Binary: gh,
  Binoculars: fh,
  Biohazard: Nh,
  Bird: bh,
  Birdhouse: qh,
  Bitcoin: Hh,
  Blend: Ah,
  Blinds: Lh,
  Blocks: Ph,
  Bluetooth: Gh,
  BluetoothConnected: Th,
  BluetoothOff: Dh,
  BluetoothSearching: Fh,
  Bold: Eh,
  Bolt: Wh,
  Bomb: Qh,
  Bone: Kh,
  Book: Yo,
  BookA: eo,
  BookAlert: ao,
  BookAudio: oo,
  BookCheck: yo,
  BookCopy: ko,
  BookDashed: io,
  BookDown: ro,
  BookHeadphones: Mo,
  BookHeart: vo,
  BookImage: xo,
  BookKey: uo,
  BookLock: wo,
  BookMarked: zo,
  BookMinus: $o,
  BookOpen: Vo,
  BookOpenCheck: jo,
  BookOpenText: Co,
  BookPlus: So,
  BookSearch: Ro,
  BookText: Bo,
  BookType: Zo,
  BookUp: Uo,
  BookUp2: Oo,
  BookUser: Io,
  BookX: Xo,
  Bookmark: yc,
  BookmarkCheck: Jo,
  BookmarkMinus: tc,
  BookmarkPlus: hc,
  BookmarkX: cc,
  BoomBox: kc,
  Bot: Mc,
  BotMessageSquare: ic,
  BotOff: rc,
  BottleWine: xc,
  BowArrow: vc,
  Box: uc,
  Boxes: wc,
  Braces: $c,
  Brackets: zc,
  Brain: Cc,
  BrainCircuit: jc,
  BrainCog: Vc,
  BrickWall: Bc,
  BrickWallFire: Sc,
  BrickWallShield: Rc,
  Briefcase: Ic,
  BriefcaseBusiness: Zc,
  BriefcaseConveyorBelt: Oc,
  BriefcaseMedical: Uc,
  BringToFront: Xc,
  Brush: Yc,
  BrushCleaning: Jc,
  Bubbles: td,
  Bug: yd,
  BugOff: hd,
  BugPlay: cd,
  Building: id,
  Building2: kd,
  Bus: Md,
  BusFront: rd,
  Cable: xd,
  CableCar: vd,
  Cake: wd,
  CakeSlice: ud,
  Calculator: $d,
  Calendar: ry,
  Calendar1: zd,
  CalendarArrowDown: jd,
  CalendarArrowUp: Vd,
  CalendarCheck: Rd,
  CalendarCheck2: Cd,
  CalendarClock: Sd,
  CalendarCog: Bd,
  CalendarDays: Zd,
  CalendarFold: Od,
  CalendarHeart: Ud,
  CalendarMinus: Xd,
  CalendarMinus2: Id,
  CalendarOff: Yd,
  CalendarPlus: ty,
  CalendarPlus2: Jd,
  CalendarRange: hy,
  CalendarSearch: cy,
  CalendarSync: ky,
  CalendarX: iy,
  CalendarX2: yy,
  Calendars: My,
  Camera: xy,
  CameraOff: vy,
  Candy: $y,
  CandyCane: wy,
  CandyOff: uy,
  Cannabis: jy,
  CannabisOff: zy,
  Captions: Cy,
  CaptionsOff: Vy,
  Car: Ry,
  CarFront: Sy,
  CarTaxiFront: By,
  Caravan: Oy,
  CardSim: Zy,
  Carrot: Uy,
  CaseLower: Iy,
  CaseSensitive: Xy,
  CaseUpper: Yy,
  CassetteTape: Jy,
  Cast: t4,
  Castle: h4,
  Cat: c4,
  Cctv: y4,
  ChartArea: k4,
  ChartBar: x4,
  ChartBarBig: i4,
  ChartBarDecreasing: r4,
  ChartBarIncreasing: M4,
  ChartBarStacked: v4,
  ChartCandlestick: u4,
  ChartColumn: V4,
  ChartColumnBig: w4,
  ChartColumnDecreasing: $4,
  ChartColumnIncreasing: z4,
  ChartColumnStacked: j4,
  ChartGantt: C4,
  ChartLine: S4,
  ChartNetwork: R4,
  ChartNoAxesColumn: O4,
  ChartNoAxesColumnDecreasing: B4,
  ChartNoAxesColumnIncreasing: Z4,
  ChartNoAxesCombined: U4,
  ChartNoAxesGantt: I4,
  ChartPie: X4,
  ChartScatter: Y4,
  ChartSpline: J4,
  Check: c5,
  CheckCheck: t5,
  CheckLine: h5,
  ChefHat: y5,
  Cherry: k5,
  ChessBishop: i5,
  ChessKing: r5,
  ChessKnight: M5,
  ChessPawn: v5,
  ChessQueen: x5,
  ChessRook: u5,
  ChevronDown: w5,
  ChevronFirst: $5,
  ChevronLast: z5,
  ChevronLeft: j5,
  ChevronRight: V5,
  ChevronUp: C5,
  ChevronsDown: R5,
  ChevronsDownUp: S5,
  ChevronsLeft: O5,
  ChevronsLeftRight: Z5,
  ChevronsLeftRightEllipsis: B5,
  ChevronsRight: I5,
  ChevronsRightLeft: U5,
  ChevronsUp: Y5,
  ChevronsUpDown: X5,
  Chromium: J5,
  Church: tn,
  Cigarette: cn,
  CigaretteOff: hn,
  Circle: E3,
  CircleAlert: yn,
  CircleArrowDown: kn,
  CircleArrowLeft: sn,
  CircleArrowOutDownLeft: ln,
  CircleArrowOutDownRight: _n,
  CircleArrowOutUpLeft: mn,
  CircleArrowOutUpRight: gn,
  CircleArrowRight: fn,
  CircleArrowUp: Nn,
  CircleCheck: qn,
  CircleCheckBig: bn,
  CircleChevronDown: Hn,
  CircleChevronLeft: An,
  CircleChevronRight: Ln,
  CircleChevronUp: Pn,
  CircleDashed: Tn,
  CircleDivide: Fn,
  CircleDollarSign: Dn,
  CircleDot: Gn,
  CircleDotDashed: En,
  CircleEllipsis: Wn,
  CircleEqual: Kn,
  CircleFadingArrowUp: Qn,
  CircleFadingPlus: e3,
  CircleGauge: a3,
  CircleMinus: o3,
  CircleOff: d3,
  CircleParking: p3,
  CircleParkingOff: n3,
  CirclePause: s3,
  CirclePercent: l3,
  CirclePile: _3,
  CirclePlay: g3,
  CirclePlus: m3,
  CirclePoundSterling: f3,
  CirclePower: N3,
  CircleQuestionMark: b3,
  CircleSlash: H3,
  CircleSlash2: q3,
  CircleSmall: L3,
  CircleStar: A3,
  CircleStop: P3,
  CircleUser: D3,
  CircleUserRound: T3,
  CircleX: F3,
  CircuitBoard: G3,
  Citrus: W3,
  Clapperboard: K3,
  Clipboard: gk,
  ClipboardCheck: Q3,
  ClipboardClock: ek,
  ClipboardCopy: ak,
  ClipboardList: ok,
  ClipboardMinus: dk,
  ClipboardPaste: nk,
  ClipboardPen: sk,
  ClipboardPenLine: pk,
  ClipboardPlus: lk,
  ClipboardType: _k,
  ClipboardX: mk,
  Clock: op,
  Clock1: fk,
  Clock10: Nk,
  Clock11: bk,
  Clock12: qk,
  Clock2: Hk,
  Clock3: Ak,
  Clock4: Lk,
  Clock5: Pk,
  Clock6: Tk,
  Clock7: Dk,
  Clock8: Fk,
  Clock9: Ek,
  ClockAlert: Gk,
  ClockArrowDown: Wk,
  ClockArrowUp: Kk,
  ClockCheck: Qk,
  ClockFading: ep,
  ClockPlus: ap,
  ClosedCaption: dp,
  Cloud: Gp,
  CloudAlert: np,
  CloudBackup: pp,
  CloudCheck: sp,
  CloudCog: lp,
  CloudDownload: mp,
  CloudDrizzle: _p,
  CloudFog: gp,
  CloudHail: fp,
  CloudLightning: Np,
  CloudMoon: qp,
  CloudMoonRain: bp,
  CloudOff: Hp,
  CloudRain: Lp,
  CloudRainWind: Ap,
  CloudSnow: Pp,
  CloudSun: Dp,
  CloudSunRain: Tp,
  CloudSync: Fp,
  CloudUpload: Ep,
  Cloudy: Kp,
  Clover: Wp,
  Club: Qp,
  Code: a8,
  CodeXml: e8,
  Codepen: o8,
  Codesandbox: d8,
  Coffee: n8,
  Cog: p8,
  Coins: s8,
  Columns2: l8,
  Columns3: m8,
  Columns3Cog: _8,
  Columns4: g8,
  Combine: f8,
  Command: N8,
  Compass: b8,
  Component: q8,
  Computer: H8,
  ConciergeBell: A8,
  Cone: L8,
  Construction: P8,
  Contact: D8,
  ContactRound: T8,
  Container: F8,
  Contrast: E8,
  Cookie: G8,
  CookingPot: W8,
  Copy: n6,
  CopyCheck: K8,
  CopyMinus: Q8,
  CopyPlus: e6,
  CopySlash: a6,
  CopyX: o6,
  Copyleft: d6,
  Copyright: p6,
  CornerDownLeft: s6,
  CornerDownRight: l6,
  CornerLeftDown: _6,
  CornerLeftUp: m6,
  CornerRightDown: g6,
  CornerRightUp: f6,
  CornerUpLeft: N6,
  CornerUpRight: b6,
  Cpu: q6,
  CreativeCommons: H6,
  CreditCard: A6,
  Croissant: L6,
  Crop: P6,
  Cross: T6,
  Crosshair: F6,
  Crown: D6,
  Cuboid: E6,
  CupSoda: G6,
  Currency: W6,
  Cylinder: K6,
  Dam: Q6,
  Database: oi,
  DatabaseBackup: ei,
  DatabaseZap: ai,
  DecimalsArrowLeft: di,
  DecimalsArrowRight: ni,
  Delete: pi,
  Dessert: si,
  Diameter: li,
  Diamond: fi,
  DiamondMinus: _i,
  DiamondPercent: mi,
  DiamondPlus: gi,
  Dice1: Ni,
  Dice2: bi,
  Dice3: qi,
  Dice4: Hi,
  Dice5: Ai,
  Dice6: Li,
  Dices: Pi,
  Diff: Ti,
  Disc: Gi,
  Disc2: Di,
  Disc3: Fi,
  DiscAlbum: Ei,
  Divide: Wi,
  Dna: Qi,
  DnaOff: Ki,
  Dock: e7,
  Dog: a7,
  DollarSign: o7,
  Donut: d7,
  DoorClosed: p7,
  DoorClosedLocked: n7,
  DoorOpen: s7,
  Dot: l7,
  Download: _7,
  DraftingCompass: m7,
  Drama: g7,
  Dribbble: N7,
  Drill: f7,
  Drone: b7,
  Droplet: H7,
  DropletOff: q7,
  Droplets: A7,
  Drum: L7,
  Drumstick: P7,
  Dumbbell: T7,
  Ear: D7,
  EarOff: F7,
  Earth: G7,
  EarthLock: E7,
  Eclipse: W7,
  Egg: es,
  EggFried: K7,
  EggOff: Q7,
  Ellipsis: os,
  EllipsisVertical: as,
  Equal: ps,
  EqualApproximately: ds,
  EqualNot: ns,
  Eraser: ss,
  EthernetPort: ls,
  Euro: _s,
  EvCharger: ms,
  Expand: gs,
  ExternalLink: fs,
  Eye: qs,
  EyeClosed: Ns,
  EyeOff: bs,
  Facebook: Hs,
  Factory: As,
  Fan: Ls,
  FastForward: Ps,
  Feather: Ts,
  Fence: Ds,
  FerrisWheel: Fs,
  Figma: Es,
  File: G9,
  FileArchive: Gs,
  FileAxis3d: Ws,
  FileBadge: Ks,
  FileBox: Qs,
  FileBraces: ar,
  FileBracesCorner: er,
  FileChartColumn: or,
  FileChartColumnIncreasing: dr,
  FileChartLine: nr,
  FileChartPie: pr,
  FileCheck: lr,
  FileCheckCorner: sr,
  FileClock: _r,
  FileCode: gr,
  FileCodeCorner: mr,
  FileCog: fr,
  FileDiff: qr,
  FileDigit: Nr,
  FileDown: br,
  FileExclamationPoint: Hr,
  FileHeadphone: Ar,
  FileHeart: Lr,
  FileImage: Pr,
  FileInput: Tr,
  FileKey: Dr,
  FileLock: Fr,
  FileMinus: Gr,
  FileMinusCorner: Er,
  FileMusic: Wr,
  FileOutput: Kr,
  FilePen: e9,
  FilePenLine: Qr,
  FilePlay: a9,
  FilePlus: d9,
  FilePlusCorner: o9,
  FileQuestionMark: n9,
  FileScan: p9,
  FileSearch: l9,
  FileSearchCorner: s9,
  FileSignal: _9,
  FileSliders: m9,
  FileSpreadsheet: g9,
  FileStack: f9,
  FileSymlink: N9,
  FileTerminal: b9,
  FileText: q9,
  FileType: A9,
  FileTypeCorner: H9,
  FileUp: L9,
  FileUser: P9,
  FileVideoCamera: D9,
  FileVolume: T9,
  FileX: E9,
  FileXCorner: F9,
  Files: W9,
  Film: K9,
  FingerprintPattern: Q9,
  FireExtinguisher: el,
  Fish: dl,
  FishOff: al,
  FishSymbol: ol,
  FishingHook: nl,
  Flag: _l,
  FlagOff: pl,
  FlagTriangleLeft: sl,
  FlagTriangleRight: ll,
  Flame: gl,
  FlameKindling: ml,
  Flashlight: Nl,
  FlashlightOff: fl,
  FlaskConical: ql,
  FlaskConicalOff: bl,
  FlaskRound: Hl,
  FlipHorizontal: Ll,
  FlipHorizontal2: Al,
  FlipVertical: Tl,
  FlipVertical2: Pl,
  Flower: Fl,
  Flower2: Dl,
  Focus: El,
  FoldHorizontal: Wl,
  FoldVertical: Gl,
  Folder: QM,
  FolderArchive: Kl,
  FolderCheck: Ql,
  FolderClock: eM,
  FolderClosed: aM,
  FolderCode: oM,
  FolderCog: nM,
  FolderDot: dM,
  FolderDown: pM,
  FolderGit: lM,
  FolderGit2: sM,
  FolderHeart: _M,
  FolderInput: mM,
  FolderKanban: fM,
  FolderKey: gM,
  FolderLock: NM,
  FolderMinus: bM,
  FolderOpen: HM,
  FolderOpenDot: qM,
  FolderOutput: AM,
  FolderPen: LM,
  FolderPlus: PM,
  FolderRoot: TM,
  FolderSearch: FM,
  FolderSearch2: DM,
  FolderSymlink: EM,
  FolderSync: GM,
  FolderTree: WM,
  FolderUp: KM,
  FolderX: a_,
  Folders: e_,
  Footprints: o_,
  Forklift: d_,
  Form: n_,
  Forward: p_,
  Frame: s_,
  Framer: l_,
  Frown: __,
  Fuel: m_,
  Fullscreen: g_,
  Funnel: q_,
  FunnelPlus: f_,
  FunnelX: N_,
  GalleryHorizontal: H_,
  GalleryHorizontalEnd: b_,
  GalleryThumbnails: A_,
  GalleryVertical: P_,
  GalleryVerticalEnd: L_,
  Gamepad: F_,
  Gamepad2: T_,
  GamepadDirectional: D_,
  Gauge: E_,
  Gavel: W_,
  Gem: G_,
  GeorgianLari: Q_,
  Ghost: K_,
  Gift: ev,
  GitBranch: dv,
  GitBranchMinus: av,
  GitBranchPlus: ov,
  GitCommitHorizontal: nv,
  GitCommitVertical: pv,
  GitCompare: lv,
  GitCompareArrows: sv,
  GitFork: _v,
  GitGraph: mv,
  GitMerge: gv,
  GitPullRequest: Av,
  GitPullRequestArrow: fv,
  GitPullRequestClosed: Nv,
  GitPullRequestCreate: qv,
  GitPullRequestCreateArrow: bv,
  GitPullRequestDraft: Hv,
  Github: Lv,
  Gitlab: Pv,
  GlassWater: Tv,
  Glasses: Dv,
  Globe: Gv,
  GlobeLock: Fv,
  GlobeX: Ev,
  Goal: Kv,
  Gpu: Wv,
  GraduationCap: Qv,
  Grape: em,
  Grid2x2: nm,
  Grid2x2Check: am,
  Grid2x2Plus: om,
  Grid2x2X: dm,
  Grid3x2: pm,
  Grid3x3: sm,
  Grip: mm,
  GripHorizontal: lm,
  GripVertical: _m,
  Group: gm,
  Guitar: fm,
  Ham: Nm,
  Hamburger: bm,
  Hammer: qm,
  Hand: Em,
  HandCoins: Hm,
  HandFist: Am,
  HandGrab: Lm,
  HandHeart: Pm,
  HandHelping: Tm,
  HandMetal: Dm,
  HandPlatter: Fm,
  Handbag: Gm,
  Handshake: Wm,
  HardDrive: ax,
  HardDriveDownload: Km,
  HardDriveUpload: Qm,
  HardHat: ex,
  Hash: ox,
  HatGlasses: dx,
  Haze: nx,
  Hd: px,
  HdmiPort: sx,
  Heading: bx,
  Heading1: lx,
  Heading2: _x,
  Heading3: mx,
  Heading4: gx,
  Heading5: fx,
  Heading6: Nx,
  HeadphoneOff: qx,
  Headphones: Hx,
  Headset: Ax,
  Heart: Gx,
  HeartCrack: Lx,
  HeartHandshake: Px,
  HeartMinus: Tx,
  HeartOff: Dx,
  HeartPlus: Fx,
  HeartPulse: Ex,
  Heater: Wx,
  Helicopter: Kx,
  Hexagon: Qx,
  Highlighter: eg,
  History: ag,
  Hop: dg,
  HopOff: og,
  Hospital: ng,
  Hotel: pg,
  Hourglass: sg,
  House: fg,
  HouseHeart: lg,
  HousePlug: _g,
  HousePlus: mg,
  HouseWifi: gg,
  IceCreamBowl: Ng,
  IceCreamCone: bg,
  IdCard: Hg,
  IdCardLanyard: qg,
  Image: Gg,
  ImageDown: Ag,
  ImageMinus: Lg,
  ImageOff: Pg,
  ImagePlay: Tg,
  ImagePlus: Dg,
  ImageUp: Fg,
  ImageUpscale: Eg,
  Images: Wg,
  Import: Kg,
  Inbox: Qg,
  IndianRupee: eu,
  Infinity: au,
  Info: ou,
  InspectionPanel: du,
  Instagram: nu,
  Italic: pu,
  IterationCcw: su,
  IterationCw: lu,
  JapaneseYen: _u,
  Joystick: mu,
  Kanban: gu,
  Kayak: fu,
  Key: qu,
  KeyRound: Nu,
  KeySquare: bu,
  Keyboard: Lu,
  KeyboardMusic: Hu,
  KeyboardOff: Au,
  Lamp: Gu,
  LampCeiling: Pu,
  LampDesk: Tu,
  LampFloor: Du,
  LampWallDown: Fu,
  LampWallUp: Eu,
  LandPlot: Wu,
  Landmark: Ku,
  Languages: Qu,
  Laptop: of,
  LaptopMinimal: af,
  LaptopMinimalCheck: ef,
  Lasso: nf,
  LassoSelect: df,
  Laugh: pf,
  Layers: vf,
  Layers2: rf,
  LayersPlus: Mf,
  LayoutDashboard: xf,
  LayoutGrid: uf,
  LayoutList: wf,
  LayoutPanelLeft: $f,
  LayoutPanelTop: zf,
  LayoutTemplate: jf,
  Leaf: Vf,
  LeafyGreen: Cf,
  Lectern: Sf,
  Library: Bf,
  LibraryBig: Rf,
  LifeBuoy: Zf,
  Ligature: Of,
  Lightbulb: If,
  LightbulbOff: Uf,
  LineSquiggle: Xf,
  Link: tw,
  Link2: Jf,
  Link2Off: Yf,
  Linkedin: hw,
  List: Uw,
  ListCheck: cw,
  ListChecks: yw,
  ListChevronsDownUp: kw,
  ListChevronsUpDown: iw,
  ListCollapse: rw,
  ListEnd: Mw,
  ListFilter: xw,
  ListFilterPlus: vw,
  ListIndentDecrease: uw,
  ListIndentIncrease: ww,
  ListMinus: $w,
  ListMusic: zw,
  ListOrdered: jw,
  ListPlus: Vw,
  ListRestart: Cw,
  ListStart: Sw,
  ListTodo: Rw,
  ListTree: Bw,
  ListVideo: Zw,
  ListX: Ow,
  Loader: Yw,
  LoaderCircle: Xw,
  LoaderPinwheel: Iw,
  Locate: hN,
  LocateFixed: Jw,
  LocateOff: tN,
  Lock: iN,
  LockKeyhole: yN,
  LockKeyholeOpen: cN,
  LockOpen: kN,
  LogIn: rN,
  LogOut: MN,
  Logs: vN,
  Lollipop: xN,
  Luggage: uN,
  Magnet: wN,
  Mail: BN,
  MailCheck: $N,
  MailMinus: zN,
  MailOpen: jN,
  MailPlus: CN,
  MailQuestionMark: VN,
  MailSearch: SN,
  MailWarning: RN,
  MailX: ZN,
  Mailbox: ON,
  Mails: UN,
  Map: w$,
  MapMinus: IN,
  MapPin: v$,
  MapPinCheck: YN,
  MapPinCheckInside: XN,
  MapPinHouse: JN,
  MapPinMinus: h$,
  MapPinMinusInside: t$,
  MapPinOff: c$,
  MapPinPen: k$,
  MapPinPlus: i$,
  MapPinPlusInside: y$,
  MapPinX: M$,
  MapPinXInside: r$,
  MapPinned: x$,
  MapPlus: u$,
  Mars: z$,
  MarsStroke: $$,
  Martini: j$,
  Maximize: C$,
  Maximize2: V$,
  Medal: S$,
  Megaphone: B$,
  MegaphoneOff: R$,
  Meh: Z$,
  MemoryStick: O$,
  Menu: U$,
  Merge: I$,
  MessageCircle: Mb,
  MessageCircleCode: X$,
  MessageCircleDashed: Y$,
  MessageCircleHeart: J$,
  MessageCircleMore: tb,
  MessageCircleOff: hb,
  MessageCirclePlus: cb,
  MessageCircleQuestionMark: yb,
  MessageCircleReply: kb,
  MessageCircleWarning: ib,
  MessageCircleX: rb,
  MessageSquare: Ib,
  MessageSquareCode: vb,
  MessageSquareDashed: xb,
  MessageSquareDiff: ub,
  MessageSquareDot: wb,
  MessageSquareHeart: $b,
  MessageSquareLock: zb,
  MessageSquareMore: Vb,
  MessageSquareOff: jb,
  MessageSquarePlus: Cb,
  MessageSquareQuote: Sb,
  MessageSquareReply: Rb,
  MessageSquareShare: Zb,
  MessageSquareText: Bb,
  MessageSquareWarning: Ob,
  MessageSquareX: Ub,
  MessagesSquare: Xb,
  Mic: Jb,
  MicOff: Yb,
  MicVocal: tz,
  Microchip: hz,
  Microscope: cz,
  Microwave: yz,
  Milestone: kz,
  Milk: rz,
  MilkOff: iz,
  Minimize: vz,
  Minimize2: Mz,
  Minus: uz,
  Monitor: Xz,
  MonitorCheck: xz,
  MonitorCloud: wz,
  MonitorCog: $z,
  MonitorDot: zz,
  MonitorDown: jz,
  MonitorOff: Vz,
  MonitorPause: Cz,
  MonitorPlay: Sz,
  MonitorSmartphone: Rz,
  MonitorSpeaker: Bz,
  MonitorStop: Zz,
  MonitorUp: Uz,
  MonitorX: Oz,
  Moon: Yz,
  MoonStar: Iz,
  Motorbike: Jz,
  Mountain: hq,
  MountainSnow: tq,
  Mouse: vq,
  MouseOff: cq,
  MousePointer: Mq,
  MousePointer2: kq,
  MousePointer2Off: yq,
  MousePointerBan: iq,
  MousePointerClick: rq,
  Move: Oq,
  Move3d: xq,
  MoveDiagonal: wq,
  MoveDiagonal2: uq,
  MoveDown: jq,
  MoveDownLeft: $q,
  MoveDownRight: zq,
  MoveHorizontal: Vq,
  MoveLeft: Cq,
  MoveRight: Sq,
  MoveUp: Bq,
  MoveUpLeft: Rq,
  MoveUpRight: Zq,
  MoveVertical: Uq,
  Music: Jq,
  Music2: Iq,
  Music3: Xq,
  Music4: Yq,
  Navigation: yj,
  Navigation2: hj,
  Navigation2Off: tj,
  NavigationOff: cj,
  Network: kj,
  Newspaper: ij,
  Nfc: rj,
  NonBinary: Mj,
  Notebook: wj,
  NotebookPen: vj,
  NotebookTabs: xj,
  NotebookText: uj,
  NotepadText: zj,
  NotepadTextDashed: $j,
  Nut: Vj,
  NutOff: jj,
  Octagon: Zj,
  OctagonAlert: Cj,
  OctagonMinus: Sj,
  OctagonPause: Rj,
  OctagonX: Bj,
  Omega: Oj,
  Option: Uj,
  Orbit: Ij,
  Origami: Xj,
  Package: iH,
  Package2: Yj,
  PackageCheck: Jj,
  PackageMinus: tH,
  PackageOpen: hH,
  PackagePlus: cH,
  PackageSearch: yH,
  PackageX: kH,
  PaintBucket: rH,
  PaintRoller: MH,
  Paintbrush: xH,
  PaintbrushVertical: vH,
  Palette: uH,
  Panda: wH,
  PanelBottom: VH,
  PanelBottomClose: $H,
  PanelBottomDashed: zH,
  PanelBottomOpen: jH,
  PanelLeft: ZH,
  PanelLeftClose: CH,
  PanelLeftDashed: SH,
  PanelLeftOpen: RH,
  PanelLeftRightDashed: BH,
  PanelRight: XH,
  PanelRightClose: OH,
  PanelRightDashed: UH,
  PanelRightOpen: IH,
  PanelTop: cV,
  PanelTopBottomDashed: YH,
  PanelTopClose: JH,
  PanelTopDashed: tV,
  PanelTopOpen: hV,
  PanelsLeftBottom: yV,
  PanelsRightBottom: kV,
  PanelsTopLeft: rV,
  Paperclip: iV,
  Parentheses: MV,
  ParkingMeter: vV,
  PartyPopper: xV,
  Pause: uV,
  PawPrint: wV,
  PcCase: $V,
  Pen: CV,
  PenLine: zV,
  PenOff: jV,
  PenTool: VV,
  Pencil: ZV,
  PencilLine: SV,
  PencilOff: RV,
  PencilRuler: BV,
  Pentagon: OV,
  Percent: UV,
  PersonStanding: IV,
  PhilippinePeso: XV,
  Phone: kA,
  PhoneCall: YV,
  PhoneForwarded: JV,
  PhoneIncoming: tA,
  PhoneMissed: hA,
  PhoneOff: cA,
  PhoneOutgoing: yA,
  Pi: iA,
  Piano: rA,
  Pickaxe: MA,
  PictureInPicture: xA,
  PictureInPicture2: vA,
  PiggyBank: uA,
  Pilcrow: zA,
  PilcrowLeft: wA,
  PilcrowRight: $A,
  Pill: VA,
  PillBottle: jA,
  Pin: SA,
  PinOff: CA,
  Pipette: RA,
  Pizza: BA,
  Plane: UA,
  PlaneLanding: ZA,
  PlaneTakeoff: OA,
  Play: IA,
  Plug: JA,
  Plug2: XA,
  PlugZap: YA,
  Plus: tC,
  Pocket: hC,
  PocketKnife: cC,
  Podcast: yC,
  Pointer: iC,
  PointerOff: kC,
  Popcorn: rC,
  Popsicle: MC,
  PoundSterling: vC,
  Power: uC,
  PowerOff: xC,
  Presentation: wC,
  Printer: VC,
  PrinterCheck: $C,
  PrinterX: zC,
  Projector: jC,
  Proportions: CC,
  Puzzle: SC,
  Pyramid: RC,
  QrCode: BC,
  Quote: ZC,
  Rabbit: OC,
  Radar: UC,
  Radiation: XC,
  Radical: IC,
  Radio: tL,
  RadioReceiver: YC,
  RadioTower: JC,
  Radius: hL,
  RailSymbol: yL,
  Rainbow: cL,
  Rat: kL,
  Ratio: iL,
  Receipt: jL,
  ReceiptCent: rL,
  ReceiptEuro: ML,
  ReceiptIndianRupee: vL,
  ReceiptJapaneseYen: xL,
  ReceiptPoundSterling: uL,
  ReceiptRussianRuble: wL,
  ReceiptSwissFranc: $L,
  ReceiptText: zL,
  ReceiptTurkishLira: VL,
  RectangleCircle: CL,
  RectangleEllipsis: SL,
  RectangleGoggles: RL,
  RectangleHorizontal: BL,
  RectangleVertical: ZL,
  Recycle: IL,
  Redo: XL,
  Redo2: OL,
  RedoDot: UL,
  RefreshCcw: JL,
  RefreshCcwDot: YL,
  RefreshCw: hS,
  RefreshCwOff: tS,
  Refrigerator: cS,
  Regex: yS,
  RemoveFormatting: kS,
  Repeat: MS,
  Repeat1: iS,
  Repeat2: rS,
  Replace: xS,
  ReplaceAll: vS,
  Reply: wS,
  ReplyAll: uS,
  Rewind: $S,
  Ribbon: zS,
  Rocket: jS,
  RockingChair: VS,
  RollerCoaster: CS,
  Rose: SS,
  Rotate3d: RS,
  RotateCcw: OS,
  RotateCcwKey: BS,
  RotateCcwSquare: ZS,
  RotateCw: IS,
  RotateCwSquare: US,
  Route: YS,
  RouteOff: XS,
  Router: JS,
  Rows2: tP,
  Rows3: hP,
  Rows4: cP,
  Rss: yP,
  Ruler: vP,
  RulerDimensionLine: kP,
  RussianRuble: iP,
  Sailboat: rP,
  Salad: MP,
  Sandwich: xP,
  Satellite: wP,
  SatelliteDish: uP,
  SaudiRiyal: $P,
  Save: VP,
  SaveAll: jP,
  SaveOff: zP,
  Scale: SP,
  Scale3d: CP,
  Scaling: RP,
  Scan: JP,
  ScanBarcode: BP,
  ScanEye: ZP,
  ScanFace: OP,
  ScanHeart: UP,
  ScanLine: IP,
  ScanQrCode: XP,
  ScanSearch: YP,
  ScanText: tR,
  School: cR,
  Scissors: yR,
  ScissorsLineDashed: hR,
  Scooter: kR,
  ScreenShare: rR,
  ScreenShareOff: iR,
  Scroll: MR,
  ScrollText: xR,
  Search: jR,
  SearchAlert: vR,
  SearchCheck: uR,
  SearchCode: wR,
  SearchSlash: $R,
  SearchX: zR,
  Section: VR,
  Send: RR,
  SendHorizontal: CR,
  SendToBack: SR,
  SeparatorHorizontal: BR,
  SeparatorVertical: ZR,
  Server: XR,
  ServerCog: OR,
  ServerCrash: UR,
  ServerOff: IR,
  Settings: JR,
  Settings2: YR,
  Shapes: tT,
  Share: cT,
  Share2: hT,
  Sheet: yT,
  Shell: kT,
  Shield: CT,
  ShieldAlert: iT,
  ShieldBan: rT,
  ShieldCheck: MT,
  ShieldEllipsis: xT,
  ShieldHalf: vT,
  ShieldMinus: uT,
  ShieldOff: wT,
  ShieldPlus: $T,
  ShieldQuestionMark: zT,
  ShieldUser: jT,
  ShieldX: VT,
  Ship: RT,
  ShipWheel: ST,
  Shirt: BT,
  ShoppingBag: ZT,
  ShoppingBasket: OT,
  ShoppingCart: UT,
  Shovel: IT,
  ShowerHead: XT,
  Shredder: YT,
  Shrimp: JT,
  Shrink: tB,
  Shrub: hB,
  Shuffle: cB,
  Sigma: yB,
  Signal: vB,
  SignalHigh: kB,
  SignalLow: iB,
  SignalMedium: rB,
  SignalZero: MB,
  Signature: xB,
  Signpost: wB,
  SignpostBig: uB,
  Siren: $B,
  SkipBack: zB,
  SkipForward: jB,
  Skull: VB,
  Slack: CB,
  Slash: SB,
  Slice: RB,
  SlidersHorizontal: BB,
  SlidersVertical: ZB,
  Smartphone: XB,
  SmartphoneCharging: OB,
  SmartphoneNfc: UB,
  Smile: YB,
  SmilePlus: IB,
  Snail: JB,
  Snowflake: tD,
  SoapDispenserDroplet: hD,
  Sofa: cD,
  SolarPanel: yD,
  Soup: kD,
  Space: iD,
  Spade: rD,
  Sparkle: vD,
  Sparkles: MD,
  Speaker: xD,
  Speech: uD,
  SpellCheck: $D,
  SpellCheck2: wD,
  Spline: jD,
  SplinePointer: zD,
  Split: CD,
  Spool: VD,
  Spotlight: SD,
  SprayCan: RD,
  Sprout: BD,
  Square: yO,
  SquareActivity: ZD,
  SquareArrowDown: UD,
  SquareArrowDownLeft: OD,
  SquareArrowDownRight: ID,
  SquareArrowLeft: XD,
  SquareArrowOutDownLeft: YD,
  SquareArrowOutDownRight: JD,
  SquareArrowOutUpLeft: tZ,
  SquareArrowOutUpRight: hZ,
  SquareArrowRight: cZ,
  SquareArrowUp: iZ,
  SquareArrowUpLeft: yZ,
  SquareArrowUpRight: kZ,
  SquareAsterisk: rZ,
  SquareBottomDashedScissors: MZ,
  SquareChartGantt: vZ,
  SquareCheck: uZ,
  SquareCheckBig: xZ,
  SquareChevronDown: wZ,
  SquareChevronLeft: $Z,
  SquareChevronRight: zZ,
  SquareChevronUp: jZ,
  SquareCode: VZ,
  SquareDashed: OZ,
  SquareDashedBottom: SZ,
  SquareDashedBottomCode: CZ,
  SquareDashedKanban: BZ,
  SquareDashedMousePointer: RZ,
  SquareDashedTopSolid: ZZ,
  SquareDivide: UZ,
  SquareDot: IZ,
  SquareEqual: XZ,
  SquareFunction: YZ,
  SquareKanban: tF,
  SquareLibrary: JZ,
  SquareM: hF,
  SquareMenu: cF,
  SquareMinus: yF,
  SquareMousePointer: kF,
  SquareParking: rF,
  SquareParkingOff: iF,
  SquarePause: MF,
  SquarePen: vF,
  SquarePercent: xF,
  SquarePi: uF,
  SquarePilcrow: wF,
  SquarePlay: $F,
  SquarePlus: zF,
  SquarePower: jF,
  SquareRadical: VF,
  SquareRoundCorner: CF,
  SquareScissors: SF,
  SquareSigma: RF,
  SquareSlash: BF,
  SquareSplitHorizontal: ZF,
  SquareSplitVertical: OF,
  SquareSquare: UF,
  SquareStack: IF,
  SquareStar: XF,
  SquareStop: YF,
  SquareTerminal: JF,
  SquareUser: tO,
  SquareUserRound: hO,
  SquareX: cO,
  SquaresExclude: kO,
  SquaresIntersect: iO,
  SquaresSubtract: MO,
  SquaresUnite: rO,
  Squircle: xO,
  SquircleDashed: vO,
  Squirrel: uO,
  Stamp: wO,
  Star: jO,
  StarHalf: zO,
  StarOff: $O,
  StepBack: VO,
  StepForward: CO,
  Stethoscope: SO,
  Sticker: RO,
  StickyNote: BO,
  Stone: ZO,
  Store: OO,
  StretchHorizontal: UO,
  StretchVertical: IO,
  Strikethrough: XO,
  Subscript: YO,
  Sun: yE,
  SunDim: JO,
  SunMedium: hE,
  SunMoon: tE,
  SunSnow: cE,
  Sunrise: kE,
  Sunset: iE,
  Superscript: rE,
  SwatchBook: ME,
  SwissFranc: vE,
  SwitchCamera: xE,
  Sword: uE,
  Swords: wE,
  Syringe: $E,
  Table: ZE,
  Table2: zE,
  TableCellsMerge: jE,
  TableCellsSplit: VE,
  TableColumnsSplit: CE,
  TableOfContents: BE,
  TableProperties: SE,
  TableRowsSplit: RE,
  Tablet: UE,
  TabletSmartphone: OE,
  Tablets: XE,
  Tag: IE,
  Tags: YE,
  Tally1: JE,
  Tally2: tU,
  Tally3: hU,
  Tally4: cU,
  Tally5: yU,
  Tangent: kU,
  Target: iU,
  Telescope: rU,
  Tent: vU,
  TentTree: MU,
  Terminal: xU,
  TestTube: wU,
  TestTubeDiagonal: uU,
  TestTubes: $U,
  TextAlignCenter: zU,
  TextAlignEnd: jU,
  TextAlignJustify: VU,
  TextAlignStart: CU,
  TextCursor: RU,
  TextCursorInput: SU,
  TextInitial: BU,
  TextQuote: ZU,
  TextSearch: OU,
  TextSelect: UU,
  TextWrap: IU,
  Theater: XU,
  Thermometer: tG,
  ThermometerSnowflake: YU,
  ThermometerSun: JU,
  ThumbsDown: hG,
  ThumbsUp: cG,
  Ticket: xG,
  TicketCheck: yG,
  TicketMinus: kG,
  TicketPercent: iG,
  TicketPlus: rG,
  TicketSlash: MG,
  TicketX: vG,
  Tickets: wG,
  TicketsPlane: uG,
  Timer: zG,
  TimerOff: $G,
  TimerReset: jG,
  ToggleLeft: VG,
  ToggleRight: CG,
  Toilet: SG,
  ToolCase: RG,
  Toolbox: ZG,
  Tornado: BG,
  Torus: OG,
  Touchpad: IG,
  TouchpadOff: UG,
  TowerControl: XG,
  ToyBrick: YG,
  Tractor: JG,
  TrafficCone: tI,
  TrainFront: cI,
  TrainFrontTunnel: hI,
  TrainTrack: yI,
  TramFront: kI,
  Transgender: iI,
  Trash: MI,
  Trash2: rI,
  TreeDeciduous: vI,
  TreePalm: xI,
  TreePine: uI,
  Trees: wI,
  Trello: $I,
  TrendingDown: zI,
  TrendingUp: VI,
  TrendingUpDown: jI,
  Triangle: BI,
  TriangleAlert: CI,
  TriangleDashed: SI,
  TriangleRight: RI,
  Trophy: ZI,
  Truck: UI,
  TruckElectric: OI,
  TurkishLira: II,
  Turntable: XI,
  Turtle: YI,
  Tv: hW,
  TvMinimal: tW,
  TvMinimalPlay: JI,
  Twitch: cW,
  Twitter: yW,
  Type: kW,
  TypeOutline: iW,
  Umbrella: MW,
  UmbrellaOff: rW,
  Underline: vW,
  Undo: wW,
  Undo2: xW,
  UndoDot: uW,
  UnfoldHorizontal: $W,
  UnfoldVertical: zW,
  Ungroup: jW,
  University: VW,
  Unlink: SW,
  Unlink2: CW,
  Unplug: RW,
  Upload: BW,
  Usb: ZW,
  User: wX,
  UserCheck: OW,
  UserCog: UW,
  UserLock: IW,
  UserMinus: XW,
  UserPen: YW,
  UserPlus: JW,
  UserRound: MX,
  UserRoundCheck: tX,
  UserRoundCog: hX,
  UserRoundMinus: cX,
  UserRoundPen: yX,
  UserRoundPlus: kX,
  UserRoundSearch: iX,
  UserRoundX: rX,
  UserSearch: vX,
  UserStar: xX,
  UserX: uX,
  Users: jX,
  UsersRound: $X,
  Utensils: VX,
  UtensilsCrossed: zX,
  UtilityPole: CX,
  Van: SX,
  Variable: RX,
  Vault: BX,
  VectorSquare: ZX,
  Vegan: OX,
  VenetianMask: UX,
  Venus: XX,
  VenusAndMars: IX,
  Vibrate: JX,
  VibrateOff: YX,
  Video: cK,
  VideoOff: tK,
  Videotape: hK,
  View: yK,
  Voicemail: kK,
  Volleyball: iK,
  Volume: uK,
  Volume1: rK,
  Volume2: MK,
  VolumeOff: vK,
  VolumeX: xK,
  Vote: wK,
  Wallet: jK,
  WalletCards: $K,
  WalletMinimal: zK,
  Wallpaper: VK,
  Wand: SK,
  WandSparkles: CK,
  Warehouse: RK,
  WashingMachine: BK,
  Watch: OK,
  Waves: XK,
  WavesArrowDown: ZK,
  WavesArrowUp: UK,
  WavesLadder: IK,
  Waypoints: YK,
  Webcam: JK,
  Webhook: hY,
  WebhookOff: tY,
  Weight: yY,
  WeightTilde: cY,
  Wheat: iY,
  WheatOff: kY,
  WholeWord: rY,
  Wifi: jY,
  WifiCog: MY,
  WifiHigh: vY,
  WifiLow: xY,
  WifiOff: uY,
  WifiPen: wY,
  WifiSync: $Y,
  WifiZero: zY,
  Wind: CY,
  WindArrowDown: VY,
  Wine: RY,
  WineOff: SY,
  Workflow: BY,
  Worm: ZY,
  Wrench: OY,
  X: UY,
  Youtube: XY,
  Zap: YY,
  ZapOff: IY,
  ZoomIn: JY,
  ZoomOut: tQ
}, Symbol.toStringTag, { value: "Module" })), cQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  icons: aQ
}, Symbol.toStringTag, { value: "Module" }));
export {
  yn as C,
  ou as I,
  Xw as L,
  c1 as R,
  CI as T,
  BW as U,
  UY as X,
  m as a,
  oQ as b,
  E3 as c,
  X5 as d,
  C5 as e,
  V5 as f,
  a1 as g,
  j5 as h,
  w5 as i,
  c5 as j,
  ry as k,
  hQ as l,
  cQ as m,
  o1 as r
};
