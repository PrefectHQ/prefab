import { c as Xi, g as ue, r as D, a as Y, R as A, j as F, b as wt } from "./embed-Bvc4tioC.mjs";
var Qo, Bh;
function ze() {
  if (Bh) return Qo;
  Bh = 1;
  var e = Array.isArray;
  return Qo = e, Qo;
}
var eu, Fh;
function H0() {
  if (Fh) return eu;
  Fh = 1;
  var e = typeof Xi == "object" && Xi && Xi.Object === Object && Xi;
  return eu = e, eu;
}
var tu, Wh;
function mt() {
  if (Wh) return tu;
  Wh = 1;
  var e = H0(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return tu = r, tu;
}
var ru, zh;
function Li() {
  if (zh) return ru;
  zh = 1;
  var e = mt(), t = e.Symbol;
  return ru = t, ru;
}
var nu, Uh;
function j_() {
  if (Uh) return nu;
  Uh = 1;
  var e = Li(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
  function a(o) {
    var u = r.call(o, i), c = o[i];
    try {
      o[i] = void 0;
      var s = !0;
    } catch {
    }
    var f = n.call(o);
    return s && (u ? o[i] = c : delete o[i]), f;
  }
  return nu = a, nu;
}
var iu, Kh;
function E_() {
  if (Kh) return iu;
  Kh = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return iu = r, iu;
}
var au, Hh;
function Dt() {
  if (Hh) return au;
  Hh = 1;
  var e = Li(), t = j_(), r = E_(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? i : n : a && a in Object(u) ? t(u) : r(u);
  }
  return au = o, au;
}
var ou, Gh;
function Nt() {
  if (Gh) return ou;
  Gh = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return ou = e, ou;
}
var uu, Vh;
function On() {
  if (Vh) return uu;
  Vh = 1;
  var e = Dt(), t = Nt(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return uu = n, uu;
}
var cu, Xh;
function Mp() {
  if (Xh) return cu;
  Xh = 1;
  var e = ze(), t = On(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, o) {
    if (e(a))
      return !1;
    var u = typeof a;
    return u == "number" || u == "symbol" || u == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || o != null && a in Object(o);
  }
  return cu = i, cu;
}
var su, Yh;
function Vt() {
  if (Yh) return su;
  Yh = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return su = e, su;
}
var lu, Zh;
function Cp() {
  if (Zh) return lu;
  Zh = 1;
  var e = Dt(), t = Vt(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var c = e(u);
    return c == n || c == i || c == r || c == a;
  }
  return lu = o, lu;
}
var fu, Jh;
function T_() {
  if (Jh) return fu;
  Jh = 1;
  var e = mt(), t = e["__core-js_shared__"];
  return fu = t, fu;
}
var pu, Qh;
function $_() {
  if (Qh) return pu;
  Qh = 1;
  var e = T_(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return pu = r, pu;
}
var hu, ed;
function G0() {
  if (ed) return hu;
  ed = 1;
  var e = Function.prototype, t = e.toString;
  function r(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return hu = r, hu;
}
var du, td;
function M_() {
  if (td) return du;
  td = 1;
  var e = Cp(), t = $_(), r = Vt(), n = G0(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, c = o.toString, s = u.hasOwnProperty, f = RegExp(
    "^" + c.call(s).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(p) {
    if (!r(p) || t(p))
      return !1;
    var d = e(p) ? f : a;
    return d.test(n(p));
  }
  return du = l, du;
}
var vu, rd;
function C_() {
  if (rd) return vu;
  rd = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return vu = e, vu;
}
var yu, nd;
function _r() {
  if (nd) return yu;
  nd = 1;
  var e = M_(), t = C_();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return yu = r, yu;
}
var mu, id;
function mo() {
  if (id) return mu;
  id = 1;
  var e = _r(), t = e(Object, "create");
  return mu = t, mu;
}
var gu, ad;
function I_() {
  if (ad) return gu;
  ad = 1;
  var e = mo();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return gu = t, gu;
}
var bu, od;
function k_() {
  if (od) return bu;
  od = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return bu = e, bu;
}
var xu, ud;
function R_() {
  if (ud) return xu;
  ud = 1;
  var e = mo(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var o = this.__data__;
    if (e) {
      var u = o[a];
      return u === t ? void 0 : u;
    }
    return n.call(o, a) ? o[a] : void 0;
  }
  return xu = i, xu;
}
var Ou, cd;
function D_() {
  if (cd) return Ou;
  cd = 1;
  var e = mo(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return Ou = n, Ou;
}
var wu, sd;
function N_() {
  if (sd) return wu;
  sd = 1;
  var e = mo(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return wu = r, wu;
}
var _u, ld;
function L_() {
  if (ld) return _u;
  ld = 1;
  var e = I_(), t = k_(), r = R_(), n = D_(), i = N_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, _u = a, _u;
}
var Au, fd;
function q_() {
  if (fd) return Au;
  fd = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Au = e, Au;
}
var Pu, pd;
function Ip() {
  if (pd) return Pu;
  pd = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return Pu = e, Pu;
}
var Su, hd;
function go() {
  if (hd) return Su;
  hd = 1;
  var e = Ip();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return Su = t, Su;
}
var ju, dd;
function B_() {
  if (dd) return ju;
  dd = 1;
  var e = go(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, o = e(a, i);
    if (o < 0)
      return !1;
    var u = a.length - 1;
    return o == u ? a.pop() : r.call(a, o, 1), --this.size, !0;
  }
  return ju = n, ju;
}
var Eu, vd;
function F_() {
  if (vd) return Eu;
  vd = 1;
  var e = go();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return Eu = t, Eu;
}
var Tu, yd;
function W_() {
  if (yd) return Tu;
  yd = 1;
  var e = go();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return Tu = t, Tu;
}
var $u, md;
function z_() {
  if (md) return $u;
  md = 1;
  var e = go();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return $u = t, $u;
}
var Mu, gd;
function bo() {
  if (gd) return Mu;
  gd = 1;
  var e = q_(), t = B_(), r = F_(), n = W_(), i = z_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Mu = a, Mu;
}
var Cu, bd;
function kp() {
  if (bd) return Cu;
  bd = 1;
  var e = _r(), t = mt(), r = e(t, "Map");
  return Cu = r, Cu;
}
var Iu, xd;
function U_() {
  if (xd) return Iu;
  xd = 1;
  var e = L_(), t = bo(), r = kp();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return Iu = n, Iu;
}
var ku, Od;
function K_() {
  if (Od) return ku;
  Od = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return ku = e, ku;
}
var Ru, wd;
function xo() {
  if (wd) return Ru;
  wd = 1;
  var e = K_();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return Ru = t, Ru;
}
var Du, _d;
function H_() {
  if (_d) return Du;
  _d = 1;
  var e = xo();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return Du = t, Du;
}
var Nu, Ad;
function G_() {
  if (Ad) return Nu;
  Ad = 1;
  var e = xo();
  function t(r) {
    return e(this, r).get(r);
  }
  return Nu = t, Nu;
}
var Lu, Pd;
function V_() {
  if (Pd) return Lu;
  Pd = 1;
  var e = xo();
  function t(r) {
    return e(this, r).has(r);
  }
  return Lu = t, Lu;
}
var qu, Sd;
function X_() {
  if (Sd) return qu;
  Sd = 1;
  var e = xo();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return qu = t, qu;
}
var Bu, jd;
function Rp() {
  if (jd) return Bu;
  jd = 1;
  var e = U_(), t = H_(), r = G_(), n = V_(), i = X_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Bu = a, Bu;
}
var Fu, Ed;
function V0() {
  if (Ed) return Fu;
  Ed = 1;
  var e = Rp(), t = "Expected a function";
  function r(n, i) {
    if (typeof n != "function" || i != null && typeof i != "function")
      throw new TypeError(t);
    var a = function() {
      var o = arguments, u = i ? i.apply(this, o) : o[0], c = a.cache;
      if (c.has(u))
        return c.get(u);
      var s = n.apply(this, o);
      return a.cache = c.set(u, s) || c, s;
    };
    return a.cache = new (r.Cache || e)(), a;
  }
  return r.Cache = e, Fu = r, Fu;
}
var Wu, Td;
function Y_() {
  if (Td) return Wu;
  Td = 1;
  var e = V0(), t = 500;
  function r(n) {
    var i = e(n, function(o) {
      return a.size === t && a.clear(), o;
    }), a = i.cache;
    return i;
  }
  return Wu = r, Wu;
}
var zu, $d;
function Z_() {
  if ($d) return zu;
  $d = 1;
  var e = Y_(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(o, u, c, s) {
      a.push(c ? s.replace(r, "$1") : u || o);
    }), a;
  });
  return zu = n, zu;
}
var Uu, Md;
function Dp() {
  if (Md) return Uu;
  Md = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return Uu = e, Uu;
}
var Ku, Cd;
function J_() {
  if (Cd) return Ku;
  Cd = 1;
  var e = Li(), t = Dp(), r = ze(), n = On(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
  function o(u) {
    if (typeof u == "string")
      return u;
    if (r(u))
      return t(u, o) + "";
    if (n(u))
      return a ? a.call(u) : "";
    var c = u + "";
    return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
  }
  return Ku = o, Ku;
}
var Hu, Id;
function X0() {
  if (Id) return Hu;
  Id = 1;
  var e = J_();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return Hu = t, Hu;
}
var Gu, kd;
function Y0() {
  if (kd) return Gu;
  kd = 1;
  var e = ze(), t = Mp(), r = Z_(), n = X0();
  function i(a, o) {
    return e(a) ? a : t(a, o) ? [a] : r(n(a));
  }
  return Gu = i, Gu;
}
var Vu, Rd;
function Oo() {
  if (Rd) return Vu;
  Rd = 1;
  var e = On();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Vu = t, Vu;
}
var Xu, Dd;
function Np() {
  if (Dd) return Xu;
  Dd = 1;
  var e = Y0(), t = Oo();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, o = i.length; n != null && a < o; )
      n = n[t(i[a++])];
    return a && a == o ? n : void 0;
  }
  return Xu = r, Xu;
}
var Yu, Nd;
function Z0() {
  if (Nd) return Yu;
  Nd = 1;
  var e = Np();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return Yu = t, Yu;
}
var Q_ = Z0();
const Xe = /* @__PURE__ */ ue(Q_);
var Zu, Ld;
function eA() {
  if (Ld) return Zu;
  Ld = 1;
  function e(t) {
    return t == null;
  }
  return Zu = e, Zu;
}
var tA = eA();
const J = /* @__PURE__ */ ue(tA);
var Ju, qd;
function rA() {
  if (qd) return Ju;
  qd = 1;
  var e = Dt(), t = ze(), r = Nt(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return Ju = i, Ju;
}
var nA = rA();
const gr = /* @__PURE__ */ ue(nA);
var iA = Cp();
const G = /* @__PURE__ */ ue(iA);
var aA = Vt();
const wn = /* @__PURE__ */ ue(aA);
var Qu = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bd;
function oA() {
  if (Bd) return ae;
  Bd = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function v(h) {
    if (typeof h == "object" && h !== null) {
      var g = h.$$typeof;
      switch (g) {
        case e:
          switch (h = h.type, h) {
            case r:
            case i:
            case n:
            case s:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case u:
                case o:
                case c:
                case p:
                case l:
                case a:
                  return h;
                default:
                  return g;
              }
          }
        case t:
          return g;
      }
    }
  }
  return ae.ContextConsumer = o, ae.ContextProvider = a, ae.Element = e, ae.ForwardRef = c, ae.Fragment = r, ae.Lazy = p, ae.Memo = l, ae.Portal = t, ae.Profiler = i, ae.StrictMode = n, ae.Suspense = s, ae.SuspenseList = f, ae.isAsyncMode = function() {
    return !1;
  }, ae.isConcurrentMode = function() {
    return !1;
  }, ae.isContextConsumer = function(h) {
    return v(h) === o;
  }, ae.isContextProvider = function(h) {
    return v(h) === a;
  }, ae.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ae.isForwardRef = function(h) {
    return v(h) === c;
  }, ae.isFragment = function(h) {
    return v(h) === r;
  }, ae.isLazy = function(h) {
    return v(h) === p;
  }, ae.isMemo = function(h) {
    return v(h) === l;
  }, ae.isPortal = function(h) {
    return v(h) === t;
  }, ae.isProfiler = function(h) {
    return v(h) === i;
  }, ae.isStrictMode = function(h) {
    return v(h) === n;
  }, ae.isSuspense = function(h) {
    return v(h) === s;
  }, ae.isSuspenseList = function(h) {
    return v(h) === f;
  }, ae.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === i || h === n || h === s || h === f || h === d || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === l || h.$$typeof === a || h.$$typeof === o || h.$$typeof === c || h.$$typeof === y || h.getModuleId !== void 0);
  }, ae.typeOf = v, ae;
}
var Fd;
function uA() {
  return Fd || (Fd = 1, Qu.exports = oA()), Qu.exports;
}
var cA = uA(), ec, Wd;
function J0() {
  if (Wd) return ec;
  Wd = 1;
  var e = Dt(), t = Nt(), r = "[object Number]";
  function n(i) {
    return typeof i == "number" || t(i) && e(i) == r;
  }
  return ec = n, ec;
}
var tc, zd;
function sA() {
  if (zd) return tc;
  zd = 1;
  var e = J0();
  function t(r) {
    return e(r) && r != +r;
  }
  return tc = t, tc;
}
var lA = sA();
const _n = /* @__PURE__ */ ue(lA);
var fA = J0();
const pA = /* @__PURE__ */ ue(fA);
var Me = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, cr = function(t) {
  return gr(t) && t.indexOf("%") === t.length - 1;
}, L = function(t) {
  return pA(t) && !_n(t);
}, hA = function(t) {
  return J(t);
}, Se = function(t) {
  return L(t) || gr(t);
}, dA = 0, Ar = function(t) {
  var r = ++dA;
  return "".concat(t || "").concat(r);
}, Ne = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!L(t) && !gr(t))
    return n;
  var a;
  if (cr(t)) {
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return _n(a) && (a = n), i && a > r && (a = r), a;
}, zt = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, vA = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, i = 0; i < r; i++)
    if (!n[t[i]])
      n[t[i]] = !0;
    else
      return !0;
  return !1;
}, pe = function(t, r) {
  return L(t) && L(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function la(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : Xe(n, t)) === r;
  });
}
var yA = function(t, r) {
  return L(t) && L(r) ? t - r : gr(t) && gr(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function zr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function af(e) {
  "@babel/helpers - typeof";
  return af = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, af(e);
}
var mA = ["viewBox", "children"], gA = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], Ud = ["points", "pathLength"], rc = {
  svg: mA,
  polygon: Ud,
  polyline: Ud
}, Lp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], fa = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ D.isValidElement(t) && (n = t.props), !wn(n))
    return null;
  var i = {};
  return Object.keys(n).forEach(function(a) {
    Lp.includes(a) && (i[a] = r || function(o) {
      return n[a](n, o);
    });
  }), i;
}, bA = function(t, r, n) {
  return function(i) {
    return t(r, n, i), null;
  };
}, Tt = function(t, r, n) {
  if (!wn(t) || af(t) !== "object")
    return null;
  var i = null;
  return Object.keys(t).forEach(function(a) {
    var o = t[a];
    Lp.includes(a) && typeof o == "function" && (i || (i = {}), i[a] = bA(o, r, n));
  }), i;
}, xA = ["children"], OA = ["children"];
function Kd(e, t) {
  if (e == null) return {};
  var r = wA(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function wA(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function of(e) {
  "@babel/helpers - typeof";
  return of = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, of(e);
}
var Hd = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick"
}, jt = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, Gd = null, nc = null, qp = function e(t) {
  if (t === Gd && Array.isArray(nc))
    return nc;
  var r = [];
  return D.Children.forEach(t, function(n) {
    J(n) || (cA.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), nc = r, Gd = t, r;
};
function We(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return jt(i);
  }) : n = [jt(t)], qp(e).forEach(function(i) {
    var a = Xe(i, "type.displayName") || Xe(i, "type.name");
    n.indexOf(a) !== -1 && r.push(i);
  }), r;
}
function Ge(e, t) {
  var r = We(e, t);
  return r && r[0];
}
var Vd = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, i = r.height;
  return !(!L(n) || n <= 0 || !L(i) || i <= 0);
}, _A = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], AA = function(t) {
  return t && t.type && gr(t.type) && _A.indexOf(t.type) >= 0;
}, Q0 = function(t) {
  return t && of(t) === "object" && "clipDot" in t;
}, PA = function(t, r, n, i) {
  var a, o = (a = rc == null ? void 0 : rc[i]) !== null && a !== void 0 ? a : [];
  return r.startsWith("data-") || !G(t) && (i && o.includes(r) || gA.includes(r)) || n && Lp.includes(r);
}, K = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var i = t;
  if (/* @__PURE__ */ D.isValidElement(t) && (i = t.props), !wn(i))
    return null;
  var a = {};
  return Object.keys(i).forEach(function(o) {
    var u;
    PA((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) && (a[o] = i[o]);
  }), a;
}, uf = function e(t, r) {
  if (t === r)
    return !0;
  var n = D.Children.count(t);
  if (n !== D.Children.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return Xd(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var i = 0; i < n; i++) {
    var a = t[i], o = r[i];
    if (Array.isArray(a) || Array.isArray(o)) {
      if (!e(a, o))
        return !1;
    } else if (!Xd(a, o))
      return !1;
  }
  return !0;
}, Xd = function(t, r) {
  if (J(t) && J(r))
    return !0;
  if (!J(t) && !J(r)) {
    var n = t.props || {}, i = n.children, a = Kd(n, xA), o = r.props || {}, u = o.children, c = Kd(o, OA);
    return i && u ? zr(a, c) && uf(i, u) : !i && !u ? zr(a, c) : !1;
  }
  return !1;
}, Yd = function(t, r) {
  var n = [], i = {};
  return qp(t).forEach(function(a, o) {
    if (AA(a))
      n.push(a);
    else if (a) {
      var u = jt(a.type), c = r[u] || {}, s = c.handler, f = c.once;
      if (s && (!f || !i[u])) {
        var l = s(a, u, o);
        n.push(l), i[u] = !0;
      }
    }
  }), n;
}, SA = function(t) {
  var r = t && t.type;
  return r && Hd[r] ? Hd[r] : null;
}, jA = function(t, r) {
  return qp(r).indexOf(t);
}, EA = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function cf() {
  return cf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, cf.apply(this, arguments);
}
function TA(e, t) {
  if (e == null) return {};
  var r = $A(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $A(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function sf(e) {
  var t = e.children, r = e.width, n = e.height, i = e.viewBox, a = e.className, o = e.style, u = e.title, c = e.desc, s = TA(e, EA), f = i || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, l = Y("recharts-surface", a);
  return /* @__PURE__ */ A.createElement("svg", cf({}, K(s, !0, "svg"), {
    className: l,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), /* @__PURE__ */ A.createElement("title", null, u), /* @__PURE__ */ A.createElement("desc", null, c), t);
}
var MA = ["children", "className"];
function lf() {
  return lf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, lf.apply(this, arguments);
}
function CA(e, t) {
  if (e == null) return {};
  var r = IA(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function IA(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Q = /* @__PURE__ */ A.forwardRef(function(e, t) {
  var r = e.children, n = e.className, i = CA(e, MA), a = Y("recharts-layer", n);
  return /* @__PURE__ */ A.createElement("g", lf({
    className: a
  }, K(i, !0), {
    ref: t
  }), r);
}), st = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
}, ic, Zd;
function kA() {
  if (Zd) return ic;
  Zd = 1;
  function e(t, r, n) {
    var i = -1, a = t.length;
    r < 0 && (r = -r > a ? 0 : a + r), n = n > a ? a : n, n < 0 && (n += a), a = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(a); ++i < a; )
      o[i] = t[i + r];
    return o;
  }
  return ic = e, ic;
}
var ac, Jd;
function RA() {
  if (Jd) return ac;
  Jd = 1;
  var e = kA();
  function t(r, n, i) {
    var a = r.length;
    return i = i === void 0 ? a : i, !n && i >= a ? r : e(r, n, i);
  }
  return ac = t, ac;
}
var oc, Qd;
function ex() {
  if (Qd) return oc;
  Qd = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + e + i + a + "]");
  function c(s) {
    return u.test(s);
  }
  return oc = c, oc;
}
var uc, ev;
function DA() {
  if (ev) return uc;
  ev = 1;
  function e(t) {
    return t.split("");
  }
  return uc = e, uc;
}
var cc, tv;
function NA() {
  if (tv) return cc;
  tv = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "[" + e + "]", u = "[" + i + "]", c = "\\ud83c[\\udffb-\\udfff]", s = "(?:" + u + "|" + c + ")", f = "[^" + e + "]", l = "(?:\\ud83c[\\udde6-\\uddff]){2}", p = "[\\ud800-\\udbff][\\udc00-\\udfff]", d = "\\u200d", y = s + "?", v = "[" + a + "]?", h = "(?:" + d + "(?:" + [f, l, p].join("|") + ")" + v + y + ")*", g = v + y + h, b = "(?:" + [f + u + "?", u, l, p, o].join("|") + ")", O = RegExp(c + "(?=" + c + ")|" + b + g, "g");
  function w(m) {
    return m.match(O) || [];
  }
  return cc = w, cc;
}
var sc, rv;
function LA() {
  if (rv) return sc;
  rv = 1;
  var e = DA(), t = ex(), r = NA();
  function n(i) {
    return t(i) ? r(i) : e(i);
  }
  return sc = n, sc;
}
var lc, nv;
function qA() {
  if (nv) return lc;
  nv = 1;
  var e = RA(), t = ex(), r = LA(), n = X0();
  function i(a) {
    return function(o) {
      o = n(o);
      var u = t(o) ? r(o) : void 0, c = u ? u[0] : o.charAt(0), s = u ? e(u, 1).join("") : o.slice(1);
      return c[a]() + s;
    };
  }
  return lc = i, lc;
}
var fc, iv;
function BA() {
  if (iv) return fc;
  iv = 1;
  var e = qA(), t = e("toUpperCase");
  return fc = t, fc;
}
var FA = BA();
const wo = /* @__PURE__ */ ue(FA);
function fe(e) {
  return function() {
    return e;
  };
}
const tx = Math.cos, pa = Math.sin, lt = Math.sqrt, ha = Math.PI, _o = 2 * ha, ff = Math.PI, pf = 2 * ff, ar = 1e-6, WA = pf - ar;
function rx(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function zA(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return rx;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class UA {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? rx : zA(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, u = this._y1, c = n - t, s = i - r, f = o - t, l = u - r, p = f * f + l * l;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (p > ar) if (!(Math.abs(l * c - s * f) > ar) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let d = n - o, y = i - u, v = c * c + s * s, h = d * d + y * y, g = Math.sqrt(v), b = Math.sqrt(p), O = a * Math.tan((ff - Math.acos((v + p - h) / (2 * g * b))) / 2), w = O / b, m = O / g;
      Math.abs(w - 1) > ar && this._append`L${t + w * f},${r + w * l}`, this._append`A${a},${a},0,0,${+(l * d > f * y)},${this._x1 = t + m * c},${this._y1 = r + m * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i), c = n * Math.sin(i), s = t + u, f = r + c, l = 1 ^ o, p = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${f}` : (Math.abs(this._x1 - s) > ar || Math.abs(this._y1 - f) > ar) && this._append`L${s},${f}`, n && (p < 0 && (p = p % pf + pf), p > WA ? this._append`A${n},${n},0,1,${l},${t - u},${r - c}A${n},${n},0,1,${l},${this._x1 = s},${this._y1 = f}` : p > ar && this._append`A${n},${n},0,${+(p >= ff)},${l},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Bp(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new UA(t);
}
function Fp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function nx(e) {
  this._context = e;
}
nx.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function Ao(e) {
  return new nx(e);
}
function ix(e) {
  return e[0];
}
function ax(e) {
  return e[1];
}
function ox(e, t) {
  var r = fe(!0), n = null, i = Ao, a = null, o = Bp(u);
  e = typeof e == "function" ? e : e === void 0 ? ix : fe(e), t = typeof t == "function" ? t : t === void 0 ? ax : fe(t);
  function u(c) {
    var s, f = (c = Fp(c)).length, l, p = !1, d;
    for (n == null && (a = i(d = o())), s = 0; s <= f; ++s)
      !(s < f && r(l = c[s], s, c)) === p && ((p = !p) ? a.lineStart() : a.lineEnd()), p && a.point(+e(l, s, c), +t(l, s, c));
    if (d) return a = null, d + "" || null;
  }
  return u.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : fe(+c), u) : e;
  }, u.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : fe(+c), u) : t;
  }, u.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : fe(!!c), u) : r;
  }, u.curve = function(c) {
    return arguments.length ? (i = c, n != null && (a = i(n)), u) : i;
  }, u.context = function(c) {
    return arguments.length ? (c == null ? n = a = null : a = i(n = c), u) : n;
  }, u;
}
function Yi(e, t, r) {
  var n = null, i = fe(!0), a = null, o = Ao, u = null, c = Bp(s);
  e = typeof e == "function" ? e : e === void 0 ? ix : fe(+e), t = typeof t == "function" ? t : fe(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? ax : fe(+r);
  function s(l) {
    var p, d, y, v = (l = Fp(l)).length, h, g = !1, b, O = new Array(v), w = new Array(v);
    for (a == null && (u = o(b = c())), p = 0; p <= v; ++p) {
      if (!(p < v && i(h = l[p], p, l)) === g)
        if (g = !g)
          d = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= d; --y)
            u.point(O[y], w[y]);
          u.lineEnd(), u.areaEnd();
        }
      g && (O[p] = +e(h, p, l), w[p] = +t(h, p, l), u.point(n ? +n(h, p, l) : O[p], r ? +r(h, p, l) : w[p]));
    }
    if (b) return u = null, b + "" || null;
  }
  function f() {
    return ox().defined(i).curve(o).context(a);
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : fe(+l), n = null, s) : e;
  }, s.x0 = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : fe(+l), s) : e;
  }, s.x1 = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : fe(+l), s) : n;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : fe(+l), r = null, s) : t;
  }, s.y0 = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : fe(+l), s) : t;
  }, s.y1 = function(l) {
    return arguments.length ? (r = l == null ? null : typeof l == "function" ? l : fe(+l), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return f().x(e).y(t);
  }, s.lineY1 = function() {
    return f().x(e).y(r);
  }, s.lineX1 = function() {
    return f().x(n).y(t);
  }, s.defined = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : fe(!!l), s) : i;
  }, s.curve = function(l) {
    return arguments.length ? (o = l, a != null && (u = o(a)), s) : o;
  }, s.context = function(l) {
    return arguments.length ? (l == null ? a = u = null : u = o(a = l), s) : a;
  }, s;
}
class ux {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function KA(e) {
  return new ux(e, !0);
}
function HA(e) {
  return new ux(e, !1);
}
const Wp = {
  draw(e, t) {
    const r = lt(t / ha);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, _o);
  }
}, GA = {
  draw(e, t) {
    const r = lt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, cx = lt(1 / 3), VA = cx * 2, XA = {
  draw(e, t) {
    const r = lt(t / VA), n = r * cx;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, YA = {
  draw(e, t) {
    const r = lt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, ZA = 0.8908130915292852, sx = pa(ha / 10) / pa(7 * ha / 10), JA = pa(_o / 10) * sx, QA = -tx(_o / 10) * sx, e1 = {
  draw(e, t) {
    const r = lt(t * ZA), n = JA * r, i = QA * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = _o * a / 5, u = tx(o), c = pa(o);
      e.lineTo(c * r, -u * r), e.lineTo(u * n - c * i, c * n + u * i);
    }
    e.closePath();
  }
}, pc = lt(3), t1 = {
  draw(e, t) {
    const r = -lt(t / (pc * 3));
    e.moveTo(0, r * 2), e.lineTo(-pc * r, -r), e.lineTo(pc * r, -r), e.closePath();
  }
}, Ze = -0.5, Je = lt(3) / 2, hf = 1 / lt(12), r1 = (hf / 2 + 1) * 3, n1 = {
  draw(e, t) {
    const r = lt(t / r1), n = r / 2, i = r * hf, a = n, o = r * hf + r, u = -a, c = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, c), e.lineTo(Ze * n - Je * i, Je * n + Ze * i), e.lineTo(Ze * a - Je * o, Je * a + Ze * o), e.lineTo(Ze * u - Je * c, Je * u + Ze * c), e.lineTo(Ze * n + Je * i, Ze * i - Je * n), e.lineTo(Ze * a + Je * o, Ze * o - Je * a), e.lineTo(Ze * u + Je * c, Ze * c - Je * u), e.closePath();
  }
};
function i1(e, t) {
  let r = null, n = Bp(i);
  e = typeof e == "function" ? e : fe(e || Wp), t = typeof t == "function" ? t : fe(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : fe(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : fe(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function da() {
}
function va(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function lx(e) {
  this._context = e;
}
lx.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        va(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        va(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function a1(e) {
  return new lx(e);
}
function fx(e) {
  this._context = e;
}
fx.prototype = {
  areaStart: da,
  areaEnd: da,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        va(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function o1(e) {
  return new fx(e);
}
function px(e) {
  this._context = e;
}
px.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        va(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function u1(e) {
  return new px(e);
}
function hx(e) {
  this._context = e;
}
hx.prototype = {
  areaStart: da,
  areaEnd: da,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function c1(e) {
  return new hx(e);
}
function av(e) {
  return e < 0 ? -1 : 1;
}
function ov(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), u = (a * i + o * n) / (n + i);
  return (av(a) + av(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function uv(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function hc(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function ya(e) {
  this._context = e;
}
ya.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        hc(this, this._t0, uv(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, hc(this, uv(this, r = ov(this, e, t)), r);
          break;
        default:
          hc(this, this._t0, r = ov(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function dx(e) {
  this._context = new vx(e);
}
(dx.prototype = Object.create(ya.prototype)).point = function(e, t) {
  ya.prototype.point.call(this, t, e);
};
function vx(e) {
  this._context = e;
}
vx.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i);
  }
};
function s1(e) {
  return new ya(e);
}
function l1(e) {
  return new dx(e);
}
function yx(e) {
  this._context = e;
}
yx.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = cv(e), i = cv(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function cv(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function f1(e) {
  return new yx(e);
}
function Po(e, t) {
  this._context = e, this._t = t;
}
Po.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function p1(e) {
  return new Po(e, 0.5);
}
function h1(e) {
  return new Po(e, 0);
}
function d1(e) {
  return new Po(e, 1);
}
function Hr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function df(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function v1(e, t) {
  return e[t];
}
function y1(e) {
  const t = [];
  return t.key = e, t;
}
function m1() {
  var e = fe([]), t = df, r = Hr, n = v1;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), y1), u, c = o.length, s = -1, f;
    for (const l of a)
      for (u = 0, ++s; u < c; ++u)
        (o[u][s] = [0, +n(l, o[u].key, s, a)]).data = l;
    for (u = 0, f = Fp(t(o)); u < c; ++u)
      o[f[u]].index = u;
    return r(o, f), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : fe(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : fe(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? df : typeof a == "function" ? a : fe(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Hr, i) : r;
  }, i;
}
function g1(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Hr(e, t);
  }
}
function b1(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Hr(e, t);
  }
}
function x1(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, c = 0, s = 0; u < o; ++u) {
        for (var f = e[t[u]], l = f[n][1] || 0, p = f[n - 1][1] || 0, d = (l - p) / 2, y = 0; y < u; ++y) {
          var v = e[t[y]], h = v[n][1] || 0, g = v[n - 1][1] || 0;
          d += h - g;
        }
        c += l, s += d * l;
      }
      i[n - 1][1] += i[n - 1][0] = r, c && (r -= s / c);
    }
    i[n - 1][1] += i[n - 1][0] = r, Hr(e, t);
  }
}
function ei(e) {
  "@babel/helpers - typeof";
  return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ei(e);
}
var O1 = ["type", "size", "sizeType"];
function vf() {
  return vf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vf.apply(this, arguments);
}
function sv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sv(Object(r), !0).forEach(function(n) {
      w1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function w1(e, t, r) {
  return t = _1(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _1(e) {
  var t = A1(e, "string");
  return ei(t) == "symbol" ? t : t + "";
}
function A1(e, t) {
  if (ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function P1(e, t) {
  if (e == null) return {};
  var r = S1(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function S1(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var mx = {
  symbolCircle: Wp,
  symbolCross: GA,
  symbolDiamond: XA,
  symbolSquare: YA,
  symbolStar: e1,
  symbolTriangle: t1,
  symbolWye: n1
}, j1 = Math.PI / 180, E1 = function(t) {
  var r = "symbol".concat(wo(t));
  return mx[r] || Wp;
}, T1 = function(t, r, n) {
  if (r === "area")
    return t;
  switch (n) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var i = 18 * j1;
      return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, $1 = function(t, r) {
  mx["symbol".concat(wo(t))] = r;
}, zp = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, i = t.size, a = i === void 0 ? 64 : i, o = t.sizeType, u = o === void 0 ? "area" : o, c = P1(t, O1), s = lv(lv({}, c), {}, {
    type: n,
    size: a,
    sizeType: u
  }), f = function() {
    var h = E1(n), g = i1().type(h).size(T1(a, u, n));
    return g();
  }, l = s.className, p = s.cx, d = s.cy, y = K(s, !0);
  return p === +p && d === +d && a === +a ? /* @__PURE__ */ A.createElement("path", vf({}, y, {
    className: Y("recharts-symbols", l),
    transform: "translate(".concat(p, ", ").concat(d, ")"),
    d: f()
  })) : null;
};
zp.registerSymbol = $1;
function Gr(e) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gr(e);
}
function yf() {
  return yf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yf.apply(this, arguments);
}
function fv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function M1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fv(Object(r), !0).forEach(function(n) {
      ti(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function C1(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function I1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bx(n.key), n);
  }
}
function k1(e, t, r) {
  return t && I1(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function R1(e, t, r) {
  return t = ma(t), D1(e, gx() ? Reflect.construct(t, r || [], ma(e).constructor) : t.apply(e, r));
}
function D1(e, t) {
  if (t && (Gr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return N1(e);
}
function N1(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function gx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (gx = function() {
    return !!e;
  })();
}
function ma(e) {
  return ma = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ma(e);
}
function L1(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mf(e, t);
}
function mf(e, t) {
  return mf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, mf(e, t);
}
function ti(e, t, r) {
  return t = bx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bx(e) {
  var t = q1(e, "string");
  return Gr(t) == "symbol" ? t : t + "";
}
function q1(e, t) {
  if (Gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Qe = 32, Up = /* @__PURE__ */ (function(e) {
  function t() {
    return C1(this, t), R1(this, t, arguments);
  }
  return L1(t, e), k1(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var i = this.props.inactiveColor, a = Qe / 2, o = Qe / 6, u = Qe / 3, c = n.inactive ? i : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ A.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: a,
            x2: Qe,
            y2: a,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ A.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            d: "M0,".concat(a, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(a, `
            H`).concat(Qe, "M").concat(2 * u, ",").concat(a, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(a),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ A.createElement("path", {
            stroke: "none",
            fill: c,
            d: "M0,".concat(Qe / 8, "h").concat(Qe, "v").concat(Qe * 3 / 4, "h").concat(-Qe, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ A.isValidElement(n.legendIcon)) {
          var s = M1({}, n);
          return delete s.legendIcon, /* @__PURE__ */ A.cloneElement(n.legendIcon, s);
        }
        return /* @__PURE__ */ A.createElement(zp, {
          fill: c,
          cx: a,
          cy: a,
          size: Qe,
          sizeType: "diameter",
          type: n.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var n = this, i = this.props, a = i.payload, o = i.iconSize, u = i.layout, c = i.formatter, s = i.inactiveColor, f = {
        x: 0,
        y: 0,
        width: Qe,
        height: Qe
      }, l = {
        display: u === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, p = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return a.map(function(d, y) {
        var v = d.formatter || c, h = Y(ti(ti({
          "recharts-legend-item": !0
        }, "legend-item-".concat(y), !0), "inactive", d.inactive));
        if (d.type === "none")
          return null;
        var g = G(d.value) ? null : d.value;
        st(
          !G(d.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var b = d.inactive ? s : d.color;
        return /* @__PURE__ */ A.createElement("li", yf({
          className: h,
          style: l,
          key: "legend-item-".concat(y)
        }, Tt(n.props, d, y)), /* @__PURE__ */ A.createElement(sf, {
          width: o,
          height: o,
          viewBox: f,
          style: p
        }, n.renderIcon(d)), /* @__PURE__ */ A.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: b
          }
        }, v ? v(g, d, y) : g));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.payload, a = n.layout, o = n.align;
      if (!i || !i.length)
        return null;
      var u = {
        padding: 0,
        margin: 0,
        textAlign: a === "horizontal" ? o : "left"
      };
      return /* @__PURE__ */ A.createElement("ul", {
        className: "recharts-default-legend",
        style: u
      }, this.renderItems());
    }
  }]);
})(D.PureComponent);
ti(Up, "displayName", "Legend");
ti(Up, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var dc, pv;
function B1() {
  if (pv) return dc;
  pv = 1;
  var e = bo();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return dc = t, dc;
}
var vc, hv;
function F1() {
  if (hv) return vc;
  hv = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return vc = e, vc;
}
var yc, dv;
function W1() {
  if (dv) return yc;
  dv = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return yc = e, yc;
}
var mc, vv;
function z1() {
  if (vv) return mc;
  vv = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return mc = e, mc;
}
var gc, yv;
function U1() {
  if (yv) return gc;
  yv = 1;
  var e = bo(), t = kp(), r = Rp(), n = 200;
  function i(a, o) {
    var u = this.__data__;
    if (u instanceof e) {
      var c = u.__data__;
      if (!t || c.length < n - 1)
        return c.push([a, o]), this.size = ++u.size, this;
      u = this.__data__ = new r(c);
    }
    return u.set(a, o), this.size = u.size, this;
  }
  return gc = i, gc;
}
var bc, mv;
function xx() {
  if (mv) return bc;
  mv = 1;
  var e = bo(), t = B1(), r = F1(), n = W1(), i = z1(), a = U1();
  function o(u) {
    var c = this.__data__ = new e(u);
    this.size = c.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = i, o.prototype.set = a, bc = o, bc;
}
var xc, gv;
function K1() {
  if (gv) return xc;
  gv = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return xc = t, xc;
}
var Oc, bv;
function H1() {
  if (bv) return Oc;
  bv = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Oc = e, Oc;
}
var wc, xv;
function Ox() {
  if (xv) return wc;
  xv = 1;
  var e = Rp(), t = K1(), r = H1();
  function n(i) {
    var a = -1, o = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < o; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, wc = n, wc;
}
var _c, Ov;
function wx() {
  if (Ov) return _c;
  Ov = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return _c = e, _c;
}
var Ac, wv;
function _x() {
  if (wv) return Ac;
  wv = 1;
  function e(t, r) {
    return t.has(r);
  }
  return Ac = e, Ac;
}
var Pc, _v;
function Ax() {
  if (_v) return Pc;
  _v = 1;
  var e = Ox(), t = wx(), r = _x(), n = 1, i = 2;
  function a(o, u, c, s, f, l) {
    var p = c & n, d = o.length, y = u.length;
    if (d != y && !(p && y > d))
      return !1;
    var v = l.get(o), h = l.get(u);
    if (v && h)
      return v == u && h == o;
    var g = -1, b = !0, O = c & i ? new e() : void 0;
    for (l.set(o, u), l.set(u, o); ++g < d; ) {
      var w = o[g], m = u[g];
      if (s)
        var x = p ? s(m, w, g, u, o, l) : s(w, m, g, o, u, l);
      if (x !== void 0) {
        if (x)
          continue;
        b = !1;
        break;
      }
      if (O) {
        if (!t(u, function(_, P) {
          if (!r(O, P) && (w === _ || f(w, _, c, s, l)))
            return O.push(P);
        })) {
          b = !1;
          break;
        }
      } else if (!(w === m || f(w, m, c, s, l))) {
        b = !1;
        break;
      }
    }
    return l.delete(o), l.delete(u), b;
  }
  return Pc = a, Pc;
}
var Sc, Av;
function G1() {
  if (Av) return Sc;
  Av = 1;
  var e = mt(), t = e.Uint8Array;
  return Sc = t, Sc;
}
var jc, Pv;
function V1() {
  if (Pv) return jc;
  Pv = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return jc = e, jc;
}
var Ec, Sv;
function Kp() {
  if (Sv) return Ec;
  Sv = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return Ec = e, Ec;
}
var Tc, jv;
function X1() {
  if (jv) return Tc;
  jv = 1;
  var e = Li(), t = G1(), r = Ip(), n = Ax(), i = V1(), a = Kp(), o = 1, u = 2, c = "[object Boolean]", s = "[object Date]", f = "[object Error]", l = "[object Map]", p = "[object Number]", d = "[object RegExp]", y = "[object Set]", v = "[object String]", h = "[object Symbol]", g = "[object ArrayBuffer]", b = "[object DataView]", O = e ? e.prototype : void 0, w = O ? O.valueOf : void 0;
  function m(x, _, P, S, T, E, j) {
    switch (P) {
      case b:
        if (x.byteLength != _.byteLength || x.byteOffset != _.byteOffset)
          return !1;
        x = x.buffer, _ = _.buffer;
      case g:
        return !(x.byteLength != _.byteLength || !E(new t(x), new t(_)));
      case c:
      case s:
      case p:
        return r(+x, +_);
      case f:
        return x.name == _.name && x.message == _.message;
      case d:
      case v:
        return x == _ + "";
      case l:
        var $ = i;
      case y:
        var C = S & o;
        if ($ || ($ = a), x.size != _.size && !C)
          return !1;
        var M = j.get(x);
        if (M)
          return M == _;
        S |= u, j.set(x, _);
        var k = n($(x), $(_), S, T, E, j);
        return j.delete(x), k;
      case h:
        if (w)
          return w.call(x) == w.call(_);
    }
    return !1;
  }
  return Tc = m, Tc;
}
var $c, Ev;
function Px() {
  if (Ev) return $c;
  Ev = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return $c = e, $c;
}
var Mc, Tv;
function Y1() {
  if (Tv) return Mc;
  Tv = 1;
  var e = Px(), t = ze();
  function r(n, i, a) {
    var o = i(n);
    return t(n) ? o : e(o, a(n));
  }
  return Mc = r, Mc;
}
var Cc, $v;
function Z1() {
  if ($v) return Cc;
  $v = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, o = []; ++n < i; ) {
      var u = t[n];
      r(u, n, t) && (o[a++] = u);
    }
    return o;
  }
  return Cc = e, Cc;
}
var Ic, Mv;
function J1() {
  if (Mv) return Ic;
  Mv = 1;
  function e() {
    return [];
  }
  return Ic = e, Ic;
}
var kc, Cv;
function Q1() {
  if (Cv) return kc;
  Cv = 1;
  var e = Z1(), t = J1(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(o) {
    return o == null ? [] : (o = Object(o), e(i(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return kc = a, kc;
}
var Rc, Iv;
function eP() {
  if (Iv) return Rc;
  Iv = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return Rc = e, Rc;
}
var Dc, kv;
function tP() {
  if (kv) return Dc;
  kv = 1;
  var e = Dt(), t = Nt(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return Dc = n, Dc;
}
var Nc, Rv;
function Hp() {
  if (Rv) return Nc;
  Rv = 1;
  var e = tP(), t = Nt(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !i.call(o, "callee");
  };
  return Nc = a, Nc;
}
var Un = { exports: {} }, Lc, Dv;
function rP() {
  if (Dv) return Lc;
  Dv = 1;
  function e() {
    return !1;
  }
  return Lc = e, Lc;
}
Un.exports;
var Nv;
function Sx() {
  return Nv || (Nv = 1, (function(e, t) {
    var r = mt(), n = rP(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, u = o ? r.Buffer : void 0, c = u ? u.isBuffer : void 0, s = c || n;
    e.exports = s;
  })(Un, Un.exports)), Un.exports;
}
var qc, Lv;
function Gp() {
  if (Lv) return qc;
  Lv = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return qc = r, qc;
}
var Bc, qv;
function Vp() {
  if (qv) return Bc;
  qv = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return Bc = t, Bc;
}
var Fc, Bv;
function nP() {
  if (Bv) return Fc;
  Bv = 1;
  var e = Dt(), t = Vp(), r = Nt(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", o = "[object Date]", u = "[object Error]", c = "[object Function]", s = "[object Map]", f = "[object Number]", l = "[object Object]", p = "[object RegExp]", d = "[object Set]", y = "[object String]", v = "[object WeakMap]", h = "[object ArrayBuffer]", g = "[object DataView]", b = "[object Float32Array]", O = "[object Float64Array]", w = "[object Int8Array]", m = "[object Int16Array]", x = "[object Int32Array]", _ = "[object Uint8Array]", P = "[object Uint8ClampedArray]", S = "[object Uint16Array]", T = "[object Uint32Array]", E = {};
  E[b] = E[O] = E[w] = E[m] = E[x] = E[_] = E[P] = E[S] = E[T] = !0, E[n] = E[i] = E[h] = E[a] = E[g] = E[o] = E[u] = E[c] = E[s] = E[f] = E[l] = E[p] = E[d] = E[y] = E[v] = !1;
  function j($) {
    return r($) && t($.length) && !!E[e($)];
  }
  return Fc = j, Fc;
}
var Wc, Fv;
function jx() {
  if (Fv) return Wc;
  Fv = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Wc = e, Wc;
}
var Kn = { exports: {} };
Kn.exports;
var Wv;
function iP() {
  return Wv || (Wv = 1, (function(e, t) {
    var r = H0(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a && r.process, u = (function() {
      try {
        var c = i && i.require && i.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(Kn, Kn.exports)), Kn.exports;
}
var zc, zv;
function Ex() {
  if (zv) return zc;
  zv = 1;
  var e = nP(), t = jx(), r = iP(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return zc = i, zc;
}
var Uc, Uv;
function aP() {
  if (Uv) return Uc;
  Uv = 1;
  var e = eP(), t = Hp(), r = ze(), n = Sx(), i = Gp(), a = Ex(), o = Object.prototype, u = o.hasOwnProperty;
  function c(s, f) {
    var l = r(s), p = !l && t(s), d = !l && !p && n(s), y = !l && !p && !d && a(s), v = l || p || d || y, h = v ? e(s.length, String) : [], g = h.length;
    for (var b in s)
      (f || u.call(s, b)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      d && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      y && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      i(b, g))) && h.push(b);
    return h;
  }
  return Uc = c, Uc;
}
var Kc, Kv;
function oP() {
  if (Kv) return Kc;
  Kv = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return Kc = t, Kc;
}
var Hc, Hv;
function Tx() {
  if (Hv) return Hc;
  Hv = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return Hc = e, Hc;
}
var Gc, Gv;
function uP() {
  if (Gv) return Gc;
  Gv = 1;
  var e = Tx(), t = e(Object.keys, Object);
  return Gc = t, Gc;
}
var Vc, Vv;
function cP() {
  if (Vv) return Vc;
  Vv = 1;
  var e = oP(), t = uP(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var o = [];
    for (var u in Object(a))
      n.call(a, u) && u != "constructor" && o.push(u);
    return o;
  }
  return Vc = i, Vc;
}
var Xc, Xv;
function qi() {
  if (Xv) return Xc;
  Xv = 1;
  var e = Cp(), t = Vp();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Xc = r, Xc;
}
var Yc, Yv;
function So() {
  if (Yv) return Yc;
  Yv = 1;
  var e = aP(), t = cP(), r = qi();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return Yc = n, Yc;
}
var Zc, Zv;
function sP() {
  if (Zv) return Zc;
  Zv = 1;
  var e = Y1(), t = Q1(), r = So();
  function n(i) {
    return e(i, r, t);
  }
  return Zc = n, Zc;
}
var Jc, Jv;
function lP() {
  if (Jv) return Jc;
  Jv = 1;
  var e = sP(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, o, u, c, s, f) {
    var l = u & t, p = e(a), d = p.length, y = e(o), v = y.length;
    if (d != v && !l)
      return !1;
    for (var h = d; h--; ) {
      var g = p[h];
      if (!(l ? g in o : n.call(o, g)))
        return !1;
    }
    var b = f.get(a), O = f.get(o);
    if (b && O)
      return b == o && O == a;
    var w = !0;
    f.set(a, o), f.set(o, a);
    for (var m = l; ++h < d; ) {
      g = p[h];
      var x = a[g], _ = o[g];
      if (c)
        var P = l ? c(_, x, g, o, a, f) : c(x, _, g, a, o, f);
      if (!(P === void 0 ? x === _ || s(x, _, u, c, f) : P)) {
        w = !1;
        break;
      }
      m || (m = g == "constructor");
    }
    if (w && !m) {
      var S = a.constructor, T = o.constructor;
      S != T && "constructor" in a && "constructor" in o && !(typeof S == "function" && S instanceof S && typeof T == "function" && T instanceof T) && (w = !1);
    }
    return f.delete(a), f.delete(o), w;
  }
  return Jc = i, Jc;
}
var Qc, Qv;
function fP() {
  if (Qv) return Qc;
  Qv = 1;
  var e = _r(), t = mt(), r = e(t, "DataView");
  return Qc = r, Qc;
}
var es, ey;
function pP() {
  if (ey) return es;
  ey = 1;
  var e = _r(), t = mt(), r = e(t, "Promise");
  return es = r, es;
}
var ts, ty;
function $x() {
  if (ty) return ts;
  ty = 1;
  var e = _r(), t = mt(), r = e(t, "Set");
  return ts = r, ts;
}
var rs, ry;
function hP() {
  if (ry) return rs;
  ry = 1;
  var e = _r(), t = mt(), r = e(t, "WeakMap");
  return rs = r, rs;
}
var ns, ny;
function dP() {
  if (ny) return ns;
  ny = 1;
  var e = fP(), t = kp(), r = pP(), n = $x(), i = hP(), a = Dt(), o = G0(), u = "[object Map]", c = "[object Object]", s = "[object Promise]", f = "[object Set]", l = "[object WeakMap]", p = "[object DataView]", d = o(e), y = o(t), v = o(r), h = o(n), g = o(i), b = a;
  return (e && b(new e(new ArrayBuffer(1))) != p || t && b(new t()) != u || r && b(r.resolve()) != s || n && b(new n()) != f || i && b(new i()) != l) && (b = function(O) {
    var w = a(O), m = w == c ? O.constructor : void 0, x = m ? o(m) : "";
    if (x)
      switch (x) {
        case d:
          return p;
        case y:
          return u;
        case v:
          return s;
        case h:
          return f;
        case g:
          return l;
      }
    return w;
  }), ns = b, ns;
}
var is, iy;
function vP() {
  if (iy) return is;
  iy = 1;
  var e = xx(), t = Ax(), r = X1(), n = lP(), i = dP(), a = ze(), o = Sx(), u = Ex(), c = 1, s = "[object Arguments]", f = "[object Array]", l = "[object Object]", p = Object.prototype, d = p.hasOwnProperty;
  function y(v, h, g, b, O, w) {
    var m = a(v), x = a(h), _ = m ? f : i(v), P = x ? f : i(h);
    _ = _ == s ? l : _, P = P == s ? l : P;
    var S = _ == l, T = P == l, E = _ == P;
    if (E && o(v)) {
      if (!o(h))
        return !1;
      m = !0, S = !1;
    }
    if (E && !S)
      return w || (w = new e()), m || u(v) ? t(v, h, g, b, O, w) : r(v, h, _, g, b, O, w);
    if (!(g & c)) {
      var j = S && d.call(v, "__wrapped__"), $ = T && d.call(h, "__wrapped__");
      if (j || $) {
        var C = j ? v.value() : v, M = $ ? h.value() : h;
        return w || (w = new e()), O(C, M, g, b, w);
      }
    }
    return E ? (w || (w = new e()), n(v, h, g, b, O, w)) : !1;
  }
  return is = y, is;
}
var as, ay;
function Xp() {
  if (ay) return as;
  ay = 1;
  var e = vP(), t = Nt();
  function r(n, i, a, o, u) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, o, r, u);
  }
  return as = r, as;
}
var os, oy;
function yP() {
  if (oy) return os;
  oy = 1;
  var e = xx(), t = Xp(), r = 1, n = 2;
  function i(a, o, u, c) {
    var s = u.length, f = s, l = !c;
    if (a == null)
      return !f;
    for (a = Object(a); s--; ) {
      var p = u[s];
      if (l && p[2] ? p[1] !== a[p[0]] : !(p[0] in a))
        return !1;
    }
    for (; ++s < f; ) {
      p = u[s];
      var d = p[0], y = a[d], v = p[1];
      if (l && p[2]) {
        if (y === void 0 && !(d in a))
          return !1;
      } else {
        var h = new e();
        if (c)
          var g = c(y, v, d, a, o, h);
        if (!(g === void 0 ? t(v, y, r | n, c, h) : g))
          return !1;
      }
    }
    return !0;
  }
  return os = i, os;
}
var us, uy;
function Mx() {
  if (uy) return us;
  uy = 1;
  var e = Vt();
  function t(r) {
    return r === r && !e(r);
  }
  return us = t, us;
}
var cs, cy;
function mP() {
  if (cy) return cs;
  cy = 1;
  var e = Mx(), t = So();
  function r(n) {
    for (var i = t(n), a = i.length; a--; ) {
      var o = i[a], u = n[o];
      i[a] = [o, u, e(u)];
    }
    return i;
  }
  return cs = r, cs;
}
var ss, sy;
function Cx() {
  if (sy) return ss;
  sy = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return ss = e, ss;
}
var ls, ly;
function gP() {
  if (ly) return ls;
  ly = 1;
  var e = yP(), t = mP(), r = Cx();
  function n(i) {
    var a = t(i);
    return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : function(o) {
      return o === i || e(o, i, a);
    };
  }
  return ls = n, ls;
}
var fs, fy;
function bP() {
  if (fy) return fs;
  fy = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return fs = e, fs;
}
var ps, py;
function xP() {
  if (py) return ps;
  py = 1;
  var e = Y0(), t = Hp(), r = ze(), n = Gp(), i = Vp(), a = Oo();
  function o(u, c, s) {
    c = e(c, u);
    for (var f = -1, l = c.length, p = !1; ++f < l; ) {
      var d = a(c[f]);
      if (!(p = u != null && s(u, d)))
        break;
      u = u[d];
    }
    return p || ++f != l ? p : (l = u == null ? 0 : u.length, !!l && i(l) && n(d, l) && (r(u) || t(u)));
  }
  return ps = o, ps;
}
var hs, hy;
function OP() {
  if (hy) return hs;
  hy = 1;
  var e = bP(), t = xP();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return hs = r, hs;
}
var ds, dy;
function wP() {
  if (dy) return ds;
  dy = 1;
  var e = Xp(), t = Z0(), r = OP(), n = Mp(), i = Mx(), a = Cx(), o = Oo(), u = 1, c = 2;
  function s(f, l) {
    return n(f) && i(l) ? a(o(f), l) : function(p) {
      var d = t(p, f);
      return d === void 0 && d === l ? r(p, f) : e(l, d, u | c);
    };
  }
  return ds = s, ds;
}
var vs, vy;
function An() {
  if (vy) return vs;
  vy = 1;
  function e(t) {
    return t;
  }
  return vs = e, vs;
}
var ys, yy;
function _P() {
  if (yy) return ys;
  yy = 1;
  function e(t) {
    return function(r) {
      return r == null ? void 0 : r[t];
    };
  }
  return ys = e, ys;
}
var ms, my;
function AP() {
  if (my) return ms;
  my = 1;
  var e = Np();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return ms = t, ms;
}
var gs, gy;
function PP() {
  if (gy) return gs;
  gy = 1;
  var e = _P(), t = AP(), r = Mp(), n = Oo();
  function i(a) {
    return r(a) ? e(n(a)) : t(a);
  }
  return gs = i, gs;
}
var bs, by;
function gt() {
  if (by) return bs;
  by = 1;
  var e = gP(), t = wP(), r = An(), n = ze(), i = PP();
  function a(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? t(o[0], o[1]) : e(o) : i(o);
  }
  return bs = a, bs;
}
var xs, xy;
function Ix() {
  if (xy) return xs;
  xy = 1;
  function e(t, r, n, i) {
    for (var a = t.length, o = n + (i ? 1 : -1); i ? o-- : ++o < a; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return xs = e, xs;
}
var Os, Oy;
function SP() {
  if (Oy) return Os;
  Oy = 1;
  function e(t) {
    return t !== t;
  }
  return Os = e, Os;
}
var ws, wy;
function jP() {
  if (wy) return ws;
  wy = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return ws = e, ws;
}
var _s, _y;
function EP() {
  if (_y) return _s;
  _y = 1;
  var e = Ix(), t = SP(), r = jP();
  function n(i, a, o) {
    return a === a ? r(i, a, o) : e(i, t, o);
  }
  return _s = n, _s;
}
var As, Ay;
function TP() {
  if (Ay) return As;
  Ay = 1;
  var e = EP();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return As = t, As;
}
var Ps, Py;
function $P() {
  if (Py) return Ps;
  Py = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return Ps = e, Ps;
}
var Ss, Sy;
function MP() {
  if (Sy) return Ss;
  Sy = 1;
  function e() {
  }
  return Ss = e, Ss;
}
var js, jy;
function CP() {
  if (jy) return js;
  jy = 1;
  var e = $x(), t = MP(), r = Kp(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return js = i, js;
}
var Es, Ey;
function IP() {
  if (Ey) return Es;
  Ey = 1;
  var e = Ox(), t = TP(), r = $P(), n = _x(), i = CP(), a = Kp(), o = 200;
  function u(c, s, f) {
    var l = -1, p = t, d = c.length, y = !0, v = [], h = v;
    if (f)
      y = !1, p = r;
    else if (d >= o) {
      var g = s ? null : i(c);
      if (g)
        return a(g);
      y = !1, p = n, h = new e();
    } else
      h = s ? [] : v;
    e:
      for (; ++l < d; ) {
        var b = c[l], O = s ? s(b) : b;
        if (b = f || b !== 0 ? b : 0, y && O === O) {
          for (var w = h.length; w--; )
            if (h[w] === O)
              continue e;
          s && h.push(O), v.push(b);
        } else p(h, O, f) || (h !== v && h.push(O), v.push(b));
      }
    return v;
  }
  return Es = u, Es;
}
var Ts, Ty;
function kP() {
  if (Ty) return Ts;
  Ty = 1;
  var e = gt(), t = IP();
  function r(n, i) {
    return n && n.length ? t(n, e(i, 2)) : [];
  }
  return Ts = r, Ts;
}
var RP = kP();
const $y = /* @__PURE__ */ ue(RP);
function kx(e, t, r) {
  return t === !0 ? $y(e, r) : G(t) ? $y(e, t) : e;
}
function Vr(e) {
  "@babel/helpers - typeof";
  return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vr(e);
}
var DP = ["ref"];
function My(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? My(Object(r), !0).forEach(function(n) {
      jo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : My(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NP(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Cy(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Dx(n.key), n);
  }
}
function LP(e, t, r) {
  return t && Cy(e.prototype, t), r && Cy(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qP(e, t, r) {
  return t = ga(t), BP(e, Rx() ? Reflect.construct(t, r || [], ga(e).constructor) : t.apply(e, r));
}
function BP(e, t) {
  if (t && (Vr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return FP(e);
}
function FP(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Rx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Rx = function() {
    return !!e;
  })();
}
function ga(e) {
  return ga = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ga(e);
}
function WP(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gf(e, t);
}
function gf(e, t) {
  return gf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, gf(e, t);
}
function jo(e, t, r) {
  return t = Dx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Dx(e) {
  var t = zP(e, "string");
  return Vr(t) == "symbol" ? t : t + "";
}
function zP(e, t) {
  if (Vr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Vr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function UP(e, t) {
  if (e == null) return {};
  var r = KP(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function KP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function HP(e) {
  return e.value;
}
function GP(e, t) {
  if (/* @__PURE__ */ A.isValidElement(e))
    return /* @__PURE__ */ A.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ A.createElement(e, t);
  t.ref;
  var r = UP(t, DP);
  return /* @__PURE__ */ A.createElement(Up, r);
}
var Iy = 1, hr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    NP(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = qP(this, t, [].concat(i)), jo(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return WP(t, e), LP(t, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n;
      }
      return null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var n = this.props.onBBoxUpdate, i = this.getBBox();
      i ? (Math.abs(i.width - this.lastBoundingBox.width) > Iy || Math.abs(i.height - this.lastBoundingBox.height) > Iy) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? xt({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(n) {
      var i = this.props, a = i.layout, o = i.align, u = i.verticalAlign, c = i.margin, s = i.chartWidth, f = i.chartHeight, l, p;
      if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null))
        if (o === "center" && a === "vertical") {
          var d = this.getBBoxSnapshot();
          l = {
            left: ((s || 0) - d.width) / 2
          };
        } else
          l = o === "right" ? {
            right: c && c.right || 0
          } : {
            left: c && c.left || 0
          };
      if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null))
        if (u === "middle") {
          var y = this.getBBoxSnapshot();
          p = {
            top: ((f || 0) - y.height) / 2
          };
        } else
          p = u === "bottom" ? {
            bottom: c && c.bottom || 0
          } : {
            top: c && c.top || 0
          };
      return xt(xt({}, l), p);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.content, o = i.width, u = i.height, c = i.wrapperStyle, s = i.payloadUniqBy, f = i.payload, l = xt(xt({
        position: "absolute",
        width: o || "auto",
        height: u || "auto"
      }, this.getDefaultPosition(c)), c);
      return /* @__PURE__ */ A.createElement("div", {
        className: "recharts-legend-wrapper",
        style: l,
        ref: function(d) {
          n.wrapperNode = d;
        }
      }, GP(a, xt(xt({}, this.props), {}, {
        payload: kx(f, s, HP)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, i) {
      var a = xt(xt({}, this.defaultProps), n.props), o = a.layout;
      return o === "vertical" && L(n.props.height) ? {
        height: n.props.height
      } : o === "horizontal" ? {
        width: n.props.width || i
      } : null;
    }
  }]);
})(D.PureComponent);
jo(hr, "displayName", "Legend");
jo(hr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var $s, ky;
function VP() {
  if (ky) return $s;
  ky = 1;
  var e = Li(), t = Hp(), r = ze(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return $s = i, $s;
}
var Ms, Ry;
function Nx() {
  if (Ry) return Ms;
  Ry = 1;
  var e = Px(), t = VP();
  function r(n, i, a, o, u) {
    var c = -1, s = n.length;
    for (a || (a = t), u || (u = []); ++c < s; ) {
      var f = n[c];
      i > 0 && a(f) ? i > 1 ? r(f, i - 1, a, o, u) : e(u, f) : o || (u[u.length] = f);
    }
    return u;
  }
  return Ms = r, Ms;
}
var Cs, Dy;
function XP() {
  if (Dy) return Cs;
  Dy = 1;
  function e(t) {
    return function(r, n, i) {
      for (var a = -1, o = Object(r), u = i(r), c = u.length; c--; ) {
        var s = u[t ? c : ++a];
        if (n(o[s], s, o) === !1)
          break;
      }
      return r;
    };
  }
  return Cs = e, Cs;
}
var Is, Ny;
function YP() {
  if (Ny) return Is;
  Ny = 1;
  var e = XP(), t = e();
  return Is = t, Is;
}
var ks, Ly;
function Lx() {
  if (Ly) return ks;
  Ly = 1;
  var e = YP(), t = So();
  function r(n, i) {
    return n && e(n, i, t);
  }
  return ks = r, ks;
}
var Rs, qy;
function ZP() {
  if (qy) return Rs;
  qy = 1;
  var e = qi();
  function t(r, n) {
    return function(i, a) {
      if (i == null)
        return i;
      if (!e(i))
        return r(i, a);
      for (var o = i.length, u = n ? o : -1, c = Object(i); (n ? u-- : ++u < o) && a(c[u], u, c) !== !1; )
        ;
      return i;
    };
  }
  return Rs = t, Rs;
}
var Ds, By;
function Yp() {
  if (By) return Ds;
  By = 1;
  var e = Lx(), t = ZP(), r = t(e);
  return Ds = r, Ds;
}
var Ns, Fy;
function qx() {
  if (Fy) return Ns;
  Fy = 1;
  var e = Yp(), t = qi();
  function r(n, i) {
    var a = -1, o = t(n) ? Array(n.length) : [];
    return e(n, function(u, c, s) {
      o[++a] = i(u, c, s);
    }), o;
  }
  return Ns = r, Ns;
}
var Ls, Wy;
function JP() {
  if (Wy) return Ls;
  Wy = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return Ls = e, Ls;
}
var qs, zy;
function QP() {
  if (zy) return qs;
  zy = 1;
  var e = On();
  function t(r, n) {
    if (r !== n) {
      var i = r !== void 0, a = r === null, o = r === r, u = e(r), c = n !== void 0, s = n === null, f = n === n, l = e(n);
      if (!s && !l && !u && r > n || u && c && f && !s && !l || a && c && f || !i && f || !o)
        return 1;
      if (!a && !u && !l && r < n || l && i && o && !a && !u || s && i && o || !c && o || !f)
        return -1;
    }
    return 0;
  }
  return qs = t, qs;
}
var Bs, Uy;
function eS() {
  if (Uy) return Bs;
  Uy = 1;
  var e = QP();
  function t(r, n, i) {
    for (var a = -1, o = r.criteria, u = n.criteria, c = o.length, s = i.length; ++a < c; ) {
      var f = e(o[a], u[a]);
      if (f) {
        if (a >= s)
          return f;
        var l = i[a];
        return f * (l == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return Bs = t, Bs;
}
var Fs, Ky;
function tS() {
  if (Ky) return Fs;
  Ky = 1;
  var e = Dp(), t = Np(), r = gt(), n = qx(), i = JP(), a = jx(), o = eS(), u = An(), c = ze();
  function s(f, l, p) {
    l.length ? l = e(l, function(v) {
      return c(v) ? function(h) {
        return t(h, v.length === 1 ? v[0] : v);
      } : v;
    }) : l = [u];
    var d = -1;
    l = e(l, a(r));
    var y = n(f, function(v, h, g) {
      var b = e(l, function(O) {
        return O(v);
      });
      return { criteria: b, index: ++d, value: v };
    });
    return i(y, function(v, h) {
      return o(v, h, p);
    });
  }
  return Fs = s, Fs;
}
var Ws, Hy;
function rS() {
  if (Hy) return Ws;
  Hy = 1;
  function e(t, r, n) {
    switch (n.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, n[0]);
      case 2:
        return t.call(r, n[0], n[1]);
      case 3:
        return t.call(r, n[0], n[1], n[2]);
    }
    return t.apply(r, n);
  }
  return Ws = e, Ws;
}
var zs, Gy;
function nS() {
  if (Gy) return zs;
  Gy = 1;
  var e = rS(), t = Math.max;
  function r(n, i, a) {
    return i = t(i === void 0 ? n.length - 1 : i, 0), function() {
      for (var o = arguments, u = -1, c = t(o.length - i, 0), s = Array(c); ++u < c; )
        s[u] = o[i + u];
      u = -1;
      for (var f = Array(i + 1); ++u < i; )
        f[u] = o[u];
      return f[i] = a(s), e(n, this, f);
    };
  }
  return zs = r, zs;
}
var Us, Vy;
function iS() {
  if (Vy) return Us;
  Vy = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Us = e, Us;
}
var Ks, Xy;
function Bx() {
  if (Xy) return Ks;
  Xy = 1;
  var e = _r(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return Ks = t, Ks;
}
var Hs, Yy;
function aS() {
  if (Yy) return Hs;
  Yy = 1;
  var e = iS(), t = Bx(), r = An(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return Hs = n, Hs;
}
var Gs, Zy;
function oS() {
  if (Zy) return Gs;
  Zy = 1;
  var e = 800, t = 16, r = Date.now;
  function n(i) {
    var a = 0, o = 0;
    return function() {
      var u = r(), c = t - (u - o);
      if (o = u, c > 0) {
        if (++a >= e)
          return arguments[0];
      } else
        a = 0;
      return i.apply(void 0, arguments);
    };
  }
  return Gs = n, Gs;
}
var Vs, Jy;
function uS() {
  if (Jy) return Vs;
  Jy = 1;
  var e = aS(), t = oS(), r = t(e);
  return Vs = r, Vs;
}
var Xs, Qy;
function cS() {
  if (Qy) return Xs;
  Qy = 1;
  var e = An(), t = nS(), r = uS();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return Xs = n, Xs;
}
var Ys, em;
function Eo() {
  if (em) return Ys;
  em = 1;
  var e = Ip(), t = qi(), r = Gp(), n = Vt();
  function i(a, o, u) {
    if (!n(u))
      return !1;
    var c = typeof o;
    return (c == "number" ? t(u) && r(o, u.length) : c == "string" && o in u) ? e(u[o], a) : !1;
  }
  return Ys = i, Ys;
}
var Zs, tm;
function sS() {
  if (tm) return Zs;
  tm = 1;
  var e = Nx(), t = tS(), r = cS(), n = Eo(), i = r(function(a, o) {
    if (a == null)
      return [];
    var u = o.length;
    return u > 1 && n(a, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(a, e(o, 1), []);
  });
  return Zs = i, Zs;
}
var lS = sS();
const Zp = /* @__PURE__ */ ue(lS);
function ri(e) {
  "@babel/helpers - typeof";
  return ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ri(e);
}
function bf() {
  return bf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, bf.apply(this, arguments);
}
function fS(e, t) {
  return vS(e) || dS(e, t) || hS(e, t) || pS();
}
function pS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hS(e, t) {
  if (e) {
    if (typeof e == "string") return rm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rm(e, t);
  }
}
function rm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function dS(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function vS(e) {
  if (Array.isArray(e)) return e;
}
function nm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Js(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nm(Object(r), !0).forEach(function(n) {
      yS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yS(e, t, r) {
  return t = mS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mS(e) {
  var t = gS(e, "string");
  return ri(t) == "symbol" ? t : t + "";
}
function gS(e, t) {
  if (ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bS(e) {
  return Array.isArray(e) && Se(e[0]) && Se(e[1]) ? e.join(" ~ ") : e;
}
var xS = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, i = t.contentStyle, a = i === void 0 ? {} : i, o = t.itemStyle, u = o === void 0 ? {} : o, c = t.labelStyle, s = c === void 0 ? {} : c, f = t.payload, l = t.formatter, p = t.itemSorter, d = t.wrapperClassName, y = t.labelClassName, v = t.label, h = t.labelFormatter, g = t.accessibilityLayer, b = g === void 0 ? !1 : g, O = function() {
    if (f && f.length) {
      var j = {
        padding: 0,
        margin: 0
      }, $ = (p ? Zp(f, p) : f).map(function(C, M) {
        if (C.type === "none")
          return null;
        var k = Js({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: C.color || "#000"
        }, u), R = C.formatter || l || bS, q = C.value, B = C.name, U = q, X = B;
        if (R && U != null && X != null) {
          var z = R(q, B, C, M, f);
          if (Array.isArray(z)) {
            var Z = fS(z, 2);
            U = Z[0], X = Z[1];
          } else
            U = z;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ A.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(M),
            style: k
          }, Se(X) ? /* @__PURE__ */ A.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, X) : null, Se(X) ? /* @__PURE__ */ A.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ A.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, U), /* @__PURE__ */ A.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, C.unit || ""))
        );
      });
      return /* @__PURE__ */ A.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: j
      }, $);
    }
    return null;
  }, w = Js({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, a), m = Js({
    margin: 0
  }, s), x = !J(v), _ = x ? v : "", P = Y("recharts-default-tooltip", d), S = Y("recharts-tooltip-label", y);
  x && h && f !== void 0 && f !== null && (_ = h(v, f));
  var T = b ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ A.createElement("div", bf({
    className: P,
    style: w
  }, T), /* @__PURE__ */ A.createElement("p", {
    className: S,
    style: m
  }, /* @__PURE__ */ A.isValidElement(_) ? _ : "".concat(_)), O());
};
function ni(e) {
  "@babel/helpers - typeof";
  return ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ni(e);
}
function Zi(e, t, r) {
  return t = OS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OS(e) {
  var t = wS(e, "string");
  return ni(t) == "symbol" ? t : t + "";
}
function wS(e, t) {
  if (ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rn = "recharts-tooltip-wrapper", _S = {
  visibility: "hidden"
};
function AS(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return Y(Rn, Zi(Zi(Zi(Zi({}, "".concat(Rn, "-right"), L(r) && t && L(t.x) && r >= t.x), "".concat(Rn, "-left"), L(r) && t && L(t.x) && r < t.x), "".concat(Rn, "-bottom"), L(n) && t && L(t.y) && n >= t.y), "".concat(Rn, "-top"), L(n) && t && L(t.y) && n < t.y));
}
function im(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, i = e.offsetTopLeft, a = e.position, o = e.reverseDirection, u = e.tooltipDimension, c = e.viewBox, s = e.viewBoxDimension;
  if (a && L(a[n]))
    return a[n];
  var f = r[n] - u - i, l = r[n] + i;
  if (t[n])
    return o[n] ? f : l;
  if (o[n]) {
    var p = f, d = c[n];
    return p < d ? Math.max(l, c[n]) : Math.max(f, c[n]);
  }
  var y = l + u, v = c[n] + s;
  return y > v ? Math.max(f, c[n]) : Math.max(l, c[n]);
}
function PS(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function SS(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, i = e.position, a = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, c = e.viewBox, s, f, l;
  return o.height > 0 && o.width > 0 && r ? (f = im({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), l = im({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), s = PS({
    translateX: f,
    translateY: l,
    useTranslate3d: u
  })) : s = _S, {
    cssProperties: s,
    cssClasses: AS({
      translateX: f,
      translateY: l,
      coordinate: r
    })
  };
}
function Xr(e) {
  "@babel/helpers - typeof";
  return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xr(e);
}
function am(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function om(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? am(Object(r), !0).forEach(function(n) {
      Of(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : am(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function jS(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ES(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Wx(n.key), n);
  }
}
function TS(e, t, r) {
  return t && ES(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $S(e, t, r) {
  return t = ba(t), MS(e, Fx() ? Reflect.construct(t, r || [], ba(e).constructor) : t.apply(e, r));
}
function MS(e, t) {
  if (t && (Xr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return CS(e);
}
function CS(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Fx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Fx = function() {
    return !!e;
  })();
}
function ba(e) {
  return ba = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ba(e);
}
function IS(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xf(e, t);
}
function xf(e, t) {
  return xf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, xf(e, t);
}
function Of(e, t, r) {
  return t = Wx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Wx(e) {
  var t = kS(e, "string");
  return Xr(t) == "symbol" ? t : t + "";
}
function kS(e, t) {
  if (Xr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Xr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var um = 1, RS = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    jS(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = $S(this, t, [].concat(i)), Of(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), Of(r, "handleKeyDown", function(o) {
      if (o.key === "Escape") {
        var u, c, s, f;
        r.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (u = (c = r.props.coordinate) === null || c === void 0 ? void 0 : c.x) !== null && u !== void 0 ? u : 0,
            y: (s = (f = r.props.coordinate) === null || f === void 0 ? void 0 : f.y) !== null && s !== void 0 ? s : 0
          }
        });
      }
    }), r;
  }
  return IS(t, e), TS(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > um || Math.abs(n.height - this.state.lastBoundingBox.height) > um) && this.setState({
          lastBoundingBox: {
            width: n.width,
            height: n.height
          }
        });
      } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({
        lastBoundingBox: {
          width: -1,
          height: -1
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var n, i;
      this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.children, f = i.coordinate, l = i.hasPayload, p = i.isAnimationActive, d = i.offset, y = i.position, v = i.reverseDirection, h = i.useTranslate3d, g = i.viewBox, b = i.wrapperStyle, O = SS({
        allowEscapeViewBox: o,
        coordinate: f,
        offsetTopLeft: d,
        position: y,
        reverseDirection: v,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: h,
        viewBox: g
      }), w = O.cssClasses, m = O.cssProperties, x = om(om({
        transition: p && a ? "transform ".concat(u, "ms ").concat(c) : void 0
      }, m), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && a && l ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, b);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ A.createElement("div", {
          tabIndex: -1,
          className: w,
          style: x,
          ref: function(P) {
            n.wrapperNode = P;
          }
        }, s)
      );
    }
  }]);
})(D.PureComponent), DS = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, bt = {
  isSsr: DS()
};
function Yr(e) {
  "@babel/helpers - typeof";
  return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Yr(e);
}
function cm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cm(Object(r), !0).forEach(function(n) {
      Jp(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function NS(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function LS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ux(n.key), n);
  }
}
function qS(e, t, r) {
  return t && LS(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function BS(e, t, r) {
  return t = xa(t), FS(e, zx() ? Reflect.construct(t, r || [], xa(e).constructor) : t.apply(e, r));
}
function FS(e, t) {
  if (t && (Yr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return WS(e);
}
function WS(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function zx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zx = function() {
    return !!e;
  })();
}
function xa(e) {
  return xa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xa(e);
}
function zS(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && wf(e, t);
}
function wf(e, t) {
  return wf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, wf(e, t);
}
function Jp(e, t, r) {
  return t = Ux(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ux(e) {
  var t = US(e, "string");
  return Yr(t) == "symbol" ? t : t + "";
}
function US(e, t) {
  if (Yr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Yr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function KS(e) {
  return e.dataKey;
}
function HS(e, t) {
  return /* @__PURE__ */ A.isValidElement(e) ? /* @__PURE__ */ A.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ A.createElement(e, t) : /* @__PURE__ */ A.createElement(xS, t);
}
var ft = /* @__PURE__ */ (function(e) {
  function t() {
    return NS(this, t), BS(this, t, arguments);
  }
  return zS(t, e), qS(t, [{
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.content, f = i.coordinate, l = i.filterNull, p = i.isAnimationActive, d = i.offset, y = i.payload, v = i.payloadUniqBy, h = i.position, g = i.reverseDirection, b = i.useTranslate3d, O = i.viewBox, w = i.wrapperStyle, m = y ?? [];
      l && m.length && (m = kx(y.filter(function(_) {
        return _.value != null && (_.hide !== !0 || n.props.includeHidden);
      }), v, KS));
      var x = m.length > 0;
      return /* @__PURE__ */ A.createElement(RS, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: c,
        isAnimationActive: p,
        active: a,
        coordinate: f,
        hasPayload: x,
        offset: d,
        position: h,
        reverseDirection: g,
        useTranslate3d: b,
        viewBox: O,
        wrapperStyle: w
      }, HS(s, sm(sm({}, this.props), {}, {
        payload: m
      })));
    }
  }]);
})(D.PureComponent);
Jp(ft, "displayName", "Tooltip");
Jp(ft, "defaultProps", {
  accessibilityLayer: !1,
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !bt.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var Qs, lm;
function GS() {
  if (lm) return Qs;
  lm = 1;
  var e = mt(), t = function() {
    return e.Date.now();
  };
  return Qs = t, Qs;
}
var el, fm;
function VS() {
  if (fm) return el;
  fm = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return el = t, el;
}
var tl, pm;
function XS() {
  if (pm) return tl;
  pm = 1;
  var e = VS(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return tl = r, tl;
}
var rl, hm;
function Kx() {
  if (hm) return rl;
  hm = 1;
  var e = XS(), t = Vt(), r = On(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
  function c(s) {
    if (typeof s == "number")
      return s;
    if (r(s))
      return n;
    if (t(s)) {
      var f = typeof s.valueOf == "function" ? s.valueOf() : s;
      s = t(f) ? f + "" : f;
    }
    if (typeof s != "string")
      return s === 0 ? s : +s;
    s = e(s);
    var l = a.test(s);
    return l || o.test(s) ? u(s.slice(2), l ? 2 : 8) : i.test(s) ? n : +s;
  }
  return rl = c, rl;
}
var nl, dm;
function YS() {
  if (dm) return nl;
  dm = 1;
  var e = Vt(), t = GS(), r = Kx(), n = "Expected a function", i = Math.max, a = Math.min;
  function o(u, c, s) {
    var f, l, p, d, y, v, h = 0, g = !1, b = !1, O = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    c = r(c) || 0, e(s) && (g = !!s.leading, b = "maxWait" in s, p = b ? i(r(s.maxWait) || 0, c) : p, O = "trailing" in s ? !!s.trailing : O);
    function w($) {
      var C = f, M = l;
      return f = l = void 0, h = $, d = u.apply(M, C), d;
    }
    function m($) {
      return h = $, y = setTimeout(P, c), g ? w($) : d;
    }
    function x($) {
      var C = $ - v, M = $ - h, k = c - C;
      return b ? a(k, p - M) : k;
    }
    function _($) {
      var C = $ - v, M = $ - h;
      return v === void 0 || C >= c || C < 0 || b && M >= p;
    }
    function P() {
      var $ = t();
      if (_($))
        return S($);
      y = setTimeout(P, x($));
    }
    function S($) {
      return y = void 0, O && f ? w($) : (f = l = void 0, d);
    }
    function T() {
      y !== void 0 && clearTimeout(y), h = 0, f = v = l = y = void 0;
    }
    function E() {
      return y === void 0 ? d : S(t());
    }
    function j() {
      var $ = t(), C = _($);
      if (f = arguments, l = this, v = $, C) {
        if (y === void 0)
          return m(v);
        if (b)
          return clearTimeout(y), y = setTimeout(P, c), w(v);
      }
      return y === void 0 && (y = setTimeout(P, c)), d;
    }
    return j.cancel = T, j.flush = E, j;
  }
  return nl = o, nl;
}
var il, vm;
function ZS() {
  if (vm) return il;
  vm = 1;
  var e = YS(), t = Vt(), r = "Expected a function";
  function n(i, a, o) {
    var u = !0, c = !0;
    if (typeof i != "function")
      throw new TypeError(r);
    return t(o) && (u = "leading" in o ? !!o.leading : u, c = "trailing" in o ? !!o.trailing : c), e(i, a, {
      leading: u,
      maxWait: a,
      trailing: c
    });
  }
  return il = n, il;
}
var JS = ZS();
const Hx = /* @__PURE__ */ ue(JS);
function ii(e) {
  "@babel/helpers - typeof";
  return ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ii(e);
}
function ym(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ji(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ym(Object(r), !0).forEach(function(n) {
      QS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function QS(e, t, r) {
  return t = ej(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ej(e) {
  var t = tj(e, "string");
  return ii(t) == "symbol" ? t : t + "";
}
function tj(e, t) {
  if (ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rj(e, t) {
  return oj(e) || aj(e, t) || ij(e, t) || nj();
}
function nj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ij(e, t) {
  if (e) {
    if (typeof e == "string") return mm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return mm(e, t);
  }
}
function mm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function aj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function oj(e) {
  if (Array.isArray(e)) return e;
}
var uj = /* @__PURE__ */ D.forwardRef(function(e, t) {
  var r = e.aspect, n = e.initialDimension, i = n === void 0 ? {
    width: -1,
    height: -1
  } : n, a = e.width, o = a === void 0 ? "100%" : a, u = e.height, c = u === void 0 ? "100%" : u, s = e.minWidth, f = s === void 0 ? 0 : s, l = e.minHeight, p = e.maxHeight, d = e.children, y = e.debounce, v = y === void 0 ? 0 : y, h = e.id, g = e.className, b = e.onResize, O = e.style, w = O === void 0 ? {} : O, m = D.useRef(null), x = D.useRef();
  x.current = b, D.useImperativeHandle(t, function() {
    return Object.defineProperty(m.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), m.current;
      },
      configurable: !0
    });
  });
  var _ = D.useState({
    containerWidth: i.width,
    containerHeight: i.height
  }), P = rj(_, 2), S = P[0], T = P[1], E = D.useCallback(function($, C) {
    T(function(M) {
      var k = Math.round($), R = Math.round(C);
      return M.containerWidth === k && M.containerHeight === R ? M : {
        containerWidth: k,
        containerHeight: R
      };
    });
  }, []);
  D.useEffect(function() {
    var $ = function(B) {
      var U, X = B[0].contentRect, z = X.width, Z = X.height;
      E(z, Z), (U = x.current) === null || U === void 0 || U.call(x, z, Z);
    };
    v > 0 && ($ = Hx($, v, {
      trailing: !0,
      leading: !1
    }));
    var C = new ResizeObserver($), M = m.current.getBoundingClientRect(), k = M.width, R = M.height;
    return E(k, R), C.observe(m.current), function() {
      C.disconnect();
    };
  }, [E, v]);
  var j = D.useMemo(function() {
    var $ = S.containerWidth, C = S.containerHeight;
    if ($ < 0 || C < 0)
      return null;
    st(cr(o) || cr(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), st(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var M = cr(o) ? $ : o, k = cr(c) ? C : c;
    r && r > 0 && (M ? k = M / r : k && (M = k * r), p && k > p && (k = p)), st(M > 0 || k > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, M, k, o, c, f, l, r);
    var R = !Array.isArray(d) && jt(d.type).endsWith("Chart");
    return A.Children.map(d, function(q) {
      return /* @__PURE__ */ A.isValidElement(q) ? /* @__PURE__ */ D.cloneElement(q, Ji({
        width: M,
        height: k
      }, R ? {
        style: Ji({
          height: "100%",
          width: "100%",
          maxHeight: k,
          maxWidth: M
        }, q.props.style)
      } : {})) : q;
    });
  }, [r, d, c, p, l, f, S, o]);
  return /* @__PURE__ */ A.createElement("div", {
    id: h ? "".concat(h) : void 0,
    className: Y("recharts-responsive-container", g),
    style: Ji(Ji({}, w), {}, {
      width: o,
      height: c,
      minWidth: f,
      minHeight: l,
      maxHeight: p
    }),
    ref: m
  }, j);
}), To = function(t) {
  return null;
};
To.displayName = "Cell";
function ai(e) {
  "@babel/helpers - typeof";
  return ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ai(e);
}
function gm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _f(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gm(Object(r), !0).forEach(function(n) {
      cj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cj(e, t, r) {
  return t = sj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sj(e) {
  var t = lj(e, "string");
  return ai(t) == "symbol" ? t : t + "";
}
function lj(e, t) {
  if (ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kr = {
  widthCache: {},
  cacheCount: 0
}, fj = 2e3, pj = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, bm = "recharts_measurement_span";
function hj(e) {
  var t = _f({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var Gn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || bt.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = hj(r), i = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (kr.widthCache[i])
    return kr.widthCache[i];
  try {
    var a = document.getElementById(bm);
    a || (a = document.createElement("span"), a.setAttribute("id", bm), a.setAttribute("aria-hidden", "true"), document.body.appendChild(a));
    var o = _f(_f({}, pj), n);
    Object.assign(a.style, o), a.textContent = "".concat(t);
    var u = a.getBoundingClientRect(), c = {
      width: u.width,
      height: u.height
    };
    return kr.widthCache[i] = c, ++kr.cacheCount > fj && (kr.cacheCount = 0, kr.widthCache = {}), c;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, dj = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function oi(e) {
  "@babel/helpers - typeof";
  return oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, oi(e);
}
function Oa(e, t) {
  return gj(e) || mj(e, t) || yj(e, t) || vj();
}
function vj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yj(e, t) {
  if (e) {
    if (typeof e == "string") return xm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return xm(e, t);
  }
}
function xm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function mj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1;
      } else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function gj(e) {
  if (Array.isArray(e)) return e;
}
function bj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Om(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Oj(n.key), n);
  }
}
function xj(e, t, r) {
  return t && Om(e.prototype, t), r && Om(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Oj(e) {
  var t = wj(e, "string");
  return oi(t) == "symbol" ? t : t + "";
}
function wj(e, t) {
  if (oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var wm = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, _m = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, _j = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, Aj = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, Gx = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, Pj = Object.keys(Gx), Lr = "NaN";
function Sj(e, t) {
  return e * Gx[t];
}
var Qi = /* @__PURE__ */ (function() {
  function e(t, r) {
    bj(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !_j.test(r) && (this.num = NaN, this.unit = ""), Pj.includes(r) && (this.num = Sj(t, r), this.unit = "px");
  }
  return xj(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit);
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, i = (n = Aj.exec(r)) !== null && n !== void 0 ? n : [], a = Oa(i, 3), o = a[1], u = a[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]);
})();
function Vx(e) {
  if (e.includes(Lr))
    return Lr;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = wm.exec(t)) !== null && r !== void 0 ? r : [], i = Oa(n, 4), a = i[1], o = i[2], u = i[3], c = Qi.parse(a ?? ""), s = Qi.parse(u ?? ""), f = o === "*" ? c.multiply(s) : c.divide(s);
    if (f.isNaN())
      return Lr;
    t = t.replace(wm, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var l, p = (l = _m.exec(t)) !== null && l !== void 0 ? l : [], d = Oa(p, 4), y = d[1], v = d[2], h = d[3], g = Qi.parse(y ?? ""), b = Qi.parse(h ?? ""), O = v === "+" ? g.add(b) : g.subtract(b);
    if (O.isNaN())
      return Lr;
    t = t.replace(_m, O.toString());
  }
  return t;
}
var Am = /\(([^()]*)\)/;
function jj(e) {
  for (var t = e; t.includes("("); ) {
    var r = Am.exec(t), n = Oa(r, 2), i = n[1];
    t = t.replace(Am, Vx(i));
  }
  return t;
}
function Ej(e) {
  var t = e.replace(/\s+/g, "");
  return t = jj(t), t = Vx(t), t;
}
function Tj(e) {
  try {
    return Ej(e);
  } catch {
    return Lr;
  }
}
function al(e) {
  var t = Tj(e.slice(5, -1));
  return t === Lr ? "" : t;
}
var $j = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], Mj = ["dx", "dy", "angle", "className", "breakAll"];
function Af() {
  return Af = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Af.apply(this, arguments);
}
function Pm(e, t) {
  if (e == null) return {};
  var r = Cj(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Cj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Sm(e, t) {
  return Dj(e) || Rj(e, t) || kj(e, t) || Ij();
}
function Ij() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kj(e, t) {
  if (e) {
    if (typeof e == "string") return jm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return jm(e, t);
  }
}
function jm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Rj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        c = !1;
      } else for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function Dj(e) {
  if (Array.isArray(e)) return e;
}
var Xx = /[ \f\n\r\t\v\u2028\u2029]+/, Yx = function(t) {
  var r = t.children, n = t.breakAll, i = t.style;
  try {
    var a = [];
    J(r) || (n ? a = r.toString().split("") : a = r.toString().split(Xx));
    var o = a.map(function(c) {
      return {
        word: c,
        width: Gn(c, i).width
      };
    }), u = n ? 0 : Gn(" ", i).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, Nj = function(t, r, n, i, a) {
  var o = t.maxLines, u = t.children, c = t.style, s = t.breakAll, f = L(o), l = u, p = function() {
    var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return M.reduce(function(k, R) {
      var q = R.word, B = R.width, U = k[k.length - 1];
      if (U && (i == null || a || U.width + B + n < Number(i)))
        U.words.push(q), U.width += B + n;
      else {
        var X = {
          words: [q],
          width: B
        };
        k.push(X);
      }
      return k;
    }, []);
  }, d = p(r), y = function(M) {
    return M.reduce(function(k, R) {
      return k.width > R.width ? k : R;
    });
  };
  if (!f)
    return d;
  for (var v = "…", h = function(M) {
    var k = l.slice(0, M), R = Yx({
      breakAll: s,
      style: c,
      children: k + v
    }).wordsWithComputedWidth, q = p(R), B = q.length > o || y(q).width > Number(i);
    return [B, q];
  }, g = 0, b = l.length - 1, O = 0, w; g <= b && O <= l.length - 1; ) {
    var m = Math.floor((g + b) / 2), x = m - 1, _ = h(x), P = Sm(_, 2), S = P[0], T = P[1], E = h(m), j = Sm(E, 1), $ = j[0];
    if (!S && !$ && (g = m + 1), S && $ && (b = m - 1), !S && $) {
      w = T;
      break;
    }
    O++;
  }
  return w || d;
}, Em = function(t) {
  var r = J(t) ? [] : t.toString().split(Xx);
  return [{
    words: r
  }];
}, Lj = function(t) {
  var r = t.width, n = t.scaleToFit, i = t.children, a = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !bt.isSsr) {
    var c, s, f = Yx({
      breakAll: o,
      children: i,
      style: a
    });
    if (f) {
      var l = f.wordsWithComputedWidth, p = f.spaceWidth;
      c = l, s = p;
    } else
      return Em(i);
    return Nj({
      breakAll: o,
      children: i,
      maxLines: u,
      style: a
    }, c, s, r, n);
  }
  return Em(i);
}, Tm = "#808080", br = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.lineHeight, u = o === void 0 ? "1em" : o, c = t.capHeight, s = c === void 0 ? "0.71em" : c, f = t.scaleToFit, l = f === void 0 ? !1 : f, p = t.textAnchor, d = p === void 0 ? "start" : p, y = t.verticalAnchor, v = y === void 0 ? "end" : y, h = t.fill, g = h === void 0 ? Tm : h, b = Pm(t, $j), O = D.useMemo(function() {
    return Lj({
      breakAll: b.breakAll,
      children: b.children,
      maxLines: b.maxLines,
      scaleToFit: l,
      style: b.style,
      width: b.width
    });
  }, [b.breakAll, b.children, b.maxLines, l, b.style, b.width]), w = b.dx, m = b.dy, x = b.angle, _ = b.className, P = b.breakAll, S = Pm(b, Mj);
  if (!Se(n) || !Se(a))
    return null;
  var T = n + (L(w) ? w : 0), E = a + (L(m) ? m : 0), j;
  switch (v) {
    case "start":
      j = al("calc(".concat(s, ")"));
      break;
    case "middle":
      j = al("calc(".concat((O.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
      break;
    default:
      j = al("calc(".concat(O.length - 1, " * -").concat(u, ")"));
      break;
  }
  var $ = [];
  if (l) {
    var C = O[0].width, M = b.width;
    $.push("scale(".concat((L(M) ? M / C : 1) / C, ")"));
  }
  return x && $.push("rotate(".concat(x, ", ").concat(T, ", ").concat(E, ")")), $.length && (S.transform = $.join(" ")), /* @__PURE__ */ A.createElement("text", Af({}, K(S, !0), {
    x: T,
    y: E,
    className: Y("recharts-text", _),
    textAnchor: d,
    fill: g.includes("url") ? Tm : g
  }), O.map(function(k, R) {
    var q = k.words.join(P ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ A.createElement("tspan", {
        x: T,
        dy: R === 0 ? j : u,
        key: "".concat(q, "-").concat(R)
      }, q)
    );
  }));
};
function Ht(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function qj(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Qp(e) {
  let t, r, n;
  e.length !== 2 ? (t = Ht, r = (u, c) => Ht(e(u), c), n = (u, c) => e(u) - c) : (t = e === Ht || e === qj ? e : Bj, r = e, n = e);
  function i(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) < 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function a(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0) return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) <= 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function o(u, c, s = 0, f = u.length) {
    const l = i(u, c, s, f - 1);
    return l > s && n(u[l - 1], c) > -n(u[l], c) ? l - 1 : l;
  }
  return { left: i, center: o, right: a };
}
function Bj() {
  return 0;
}
function Zx(e) {
  return e === null ? NaN : +e;
}
function* Fj(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const Wj = Qp(Ht), Bi = Wj.right;
Qp(Zx).center;
class $m extends Map {
  constructor(t, r = Kj) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Mm(this, t));
  }
  has(t) {
    return super.has(Mm(this, t));
  }
  set(t, r) {
    return super.set(zj(this, t), r);
  }
  delete(t) {
    return super.delete(Uj(this, t));
  }
}
function Mm({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function zj({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function Uj({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function Kj(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function Hj(e = Ht) {
  if (e === Ht) return Jx;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function Jx(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const Gj = Math.sqrt(50), Vj = Math.sqrt(10), Xj = Math.sqrt(2);
function wa(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= Gj ? 10 : a >= Vj ? 5 : a >= Xj ? 2 : 1;
  let u, c, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, u = Math.round(e * s), c = Math.round(t * s), u / s < e && ++u, c / s > t && --c, s = -s) : (s = Math.pow(10, i) * o, u = Math.round(e / s), c = Math.round(t / s), u * s < e && ++u, c * s > t && --c), c < u && 0.5 <= r && r < 2 ? wa(e, t, r * 2) : [u, c, s];
}
function Pf(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? wa(t, e, r) : wa(e, t, r);
  if (!(a >= i)) return [];
  const u = a - i + 1, c = new Array(u);
  if (n)
    if (o < 0) for (let s = 0; s < u; ++s) c[s] = (a - s) / -o;
    else for (let s = 0; s < u; ++s) c[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < u; ++s) c[s] = (i + s) / -o;
  else for (let s = 0; s < u; ++s) c[s] = (i + s) * o;
  return c;
}
function Sf(e, t, r) {
  return t = +t, e = +e, r = +r, wa(e, t, r)[2];
}
function jf(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? Sf(t, e, r) : Sf(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Cm(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Im(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Qx(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? Jx : Hj(i); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1, s = t - r + 1, f = Math.log(c), l = 0.5 * Math.exp(2 * f / 3), p = 0.5 * Math.sqrt(f * l * (c - l) / c) * (s - c / 2 < 0 ? -1 : 1), d = Math.max(r, Math.floor(t - s * l / c + p)), y = Math.min(n, Math.floor(t + (c - s) * l / c + p));
      Qx(e, t, d, y, i);
    }
    const a = e[t];
    let o = r, u = n;
    for (Dn(e, r, t), i(e[n], a) > 0 && Dn(e, r, n); o < u; ) {
      for (Dn(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
      for (; i(e[u], a) > 0; ) --u;
    }
    i(e[r], a) === 0 ? Dn(e, r, u) : (++u, Dn(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function Dn(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function Yj(e, t, r) {
  if (e = Float64Array.from(Fj(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Im(e);
    if (t >= 1) return Cm(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = Cm(Qx(e, a).subarray(0, a + 1)), u = Im(e.subarray(a + 1));
    return o + (u - o) * (i - a);
  }
}
function Zj(e, t, r = Zx) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a);
  }
}
function Jj(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function it(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Lt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const Ef = Symbol("implicit");
function eh() {
  var e = new $m(), t = [], r = [], n = Ef;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Ef) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new $m();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return eh(t, r).unknown(n);
  }, it.apply(i, arguments), i;
}
function ui() {
  var e = eh().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, u = !1, c = 0, s = 0, f = 0.5;
  delete e.unknown;
  function l() {
    var p = t().length, d = i < n, y = d ? i : n, v = d ? n : i;
    a = (v - y) / Math.max(1, p - c + s * 2), u && (a = Math.floor(a)), y += (v - y - a * (p - c)) * f, o = a * (1 - c), u && (y = Math.round(y), o = Math.round(o));
    var h = Jj(p).map(function(g) {
      return y + a * g;
    });
    return r(d ? h.reverse() : h);
  }
  return e.domain = function(p) {
    return arguments.length ? (t(p), l()) : t();
  }, e.range = function(p) {
    return arguments.length ? ([n, i] = p, n = +n, i = +i, l()) : [n, i];
  }, e.rangeRound = function(p) {
    return [n, i] = p, n = +n, i = +i, u = !0, l();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(p) {
    return arguments.length ? (u = !!p, l()) : u;
  }, e.padding = function(p) {
    return arguments.length ? (c = Math.min(1, s = +p), l()) : c;
  }, e.paddingInner = function(p) {
    return arguments.length ? (c = Math.min(1, p), l()) : c;
  }, e.paddingOuter = function(p) {
    return arguments.length ? (s = +p, l()) : s;
  }, e.align = function(p) {
    return arguments.length ? (f = Math.max(0, Math.min(1, p)), l()) : f;
  }, e.copy = function() {
    return ui(t(), [n, i]).round(u).paddingInner(c).paddingOuter(s).align(f);
  }, it.apply(l(), arguments);
}
function eO(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return eO(t());
  }, e;
}
function Vn() {
  return eO(ui.apply(null, arguments).paddingInner(1));
}
function th(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function tO(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Fi() {
}
var ci = 0.7, _a = 1 / ci, Ur = "\\s*([+-]?\\d+)\\s*", si = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", dt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Qj = /^#([0-9a-f]{3,8})$/, eE = new RegExp(`^rgb\\(${Ur},${Ur},${Ur}\\)$`), tE = new RegExp(`^rgb\\(${dt},${dt},${dt}\\)$`), rE = new RegExp(`^rgba\\(${Ur},${Ur},${Ur},${si}\\)$`), nE = new RegExp(`^rgba\\(${dt},${dt},${dt},${si}\\)$`), iE = new RegExp(`^hsl\\(${si},${dt},${dt}\\)$`), aE = new RegExp(`^hsla\\(${si},${dt},${dt},${si}\\)$`), km = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
th(Fi, li, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Rm,
  // Deprecated! Use color.formatHex.
  formatHex: Rm,
  formatHex8: oE,
  formatHsl: uE,
  formatRgb: Dm,
  toString: Dm
});
function Rm() {
  return this.rgb().formatHex();
}
function oE() {
  return this.rgb().formatHex8();
}
function uE() {
  return rO(this).formatHsl();
}
function Dm() {
  return this.rgb().formatRgb();
}
function li(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = Qj.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Nm(t) : r === 3 ? new Fe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ea(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ea(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = eE.exec(e)) ? new Fe(t[1], t[2], t[3], 1) : (t = tE.exec(e)) ? new Fe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = rE.exec(e)) ? ea(t[1], t[2], t[3], t[4]) : (t = nE.exec(e)) ? ea(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = iE.exec(e)) ? Bm(t[1], t[2] / 100, t[3] / 100, 1) : (t = aE.exec(e)) ? Bm(t[1], t[2] / 100, t[3] / 100, t[4]) : km.hasOwnProperty(e) ? Nm(km[e]) : e === "transparent" ? new Fe(NaN, NaN, NaN, 0) : null;
}
function Nm(e) {
  return new Fe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ea(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Fe(e, t, r, n);
}
function cE(e) {
  return e instanceof Fi || (e = li(e)), e ? (e = e.rgb(), new Fe(e.r, e.g, e.b, e.opacity)) : new Fe();
}
function Tf(e, t, r, n) {
  return arguments.length === 1 ? cE(e) : new Fe(e, t, r, n ?? 1);
}
function Fe(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
th(Fe, Tf, tO(Fi, {
  brighter(e) {
    return e = e == null ? _a : Math.pow(_a, e), new Fe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ci : Math.pow(ci, e), new Fe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Fe(dr(this.r), dr(this.g), dr(this.b), Aa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Lm,
  // Deprecated! Use color.formatHex.
  formatHex: Lm,
  formatHex8: sE,
  formatRgb: qm,
  toString: qm
}));
function Lm() {
  return `#${sr(this.r)}${sr(this.g)}${sr(this.b)}`;
}
function sE() {
  return `#${sr(this.r)}${sr(this.g)}${sr(this.b)}${sr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function qm() {
  const e = Aa(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${dr(this.r)}, ${dr(this.g)}, ${dr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Aa(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function dr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function sr(e) {
  return e = dr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Bm(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ct(e, t, r, n);
}
function rO(e) {
  if (e instanceof ct) return new ct(e.h, e.s, e.l, e.opacity);
  if (e instanceof Fi || (e = li(e)), !e) return new ct();
  if (e instanceof ct) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, u = a - i, c = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= c < 0.5 ? a + i : 2 - a - i, o *= 60) : u = c > 0 && c < 1 ? 0 : o, new ct(o, u, c, e.opacity);
}
function lE(e, t, r, n) {
  return arguments.length === 1 ? rO(e) : new ct(e, t, r, n ?? 1);
}
function ct(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
th(ct, lE, tO(Fi, {
  brighter(e) {
    return e = e == null ? _a : Math.pow(_a, e), new ct(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ci : Math.pow(ci, e), new ct(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new Fe(
      ol(e >= 240 ? e - 240 : e + 120, i, n),
      ol(e, i, n),
      ol(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new ct(Fm(this.h), ta(this.s), ta(this.l), Aa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Aa(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Fm(this.h)}, ${ta(this.s) * 100}%, ${ta(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Fm(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ta(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ol(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const rh = (e) => () => e;
function fE(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function pE(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function hE(e) {
  return (e = +e) == 1 ? nO : function(t, r) {
    return r - t ? pE(t, r, e) : rh(isNaN(t) ? r : t);
  };
}
function nO(e, t) {
  var r = t - e;
  return r ? fE(e, r) : rh(isNaN(e) ? t : e);
}
const Wm = (function e(t) {
  var r = hE(t);
  function n(i, a) {
    var o = r((i = Tf(i)).r, (a = Tf(a)).r), u = r(i.g, a.g), c = r(i.b, a.b), s = nO(i.opacity, a.opacity);
    return function(f) {
      return i.r = o(f), i.g = u(f), i.b = c(f), i.opacity = s(f), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function dE(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function vE(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function yE(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = Pn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a;
  };
}
function mE(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Pa(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function gE(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = Pn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var $f = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ul = new RegExp($f.source, "g");
function bE(e) {
  return function() {
    return e;
  };
}
function xE(e) {
  return function(t) {
    return e(t) + "";
  };
}
function OE(e, t) {
  var r = $f.lastIndex = ul.lastIndex = 0, n, i, a, o = -1, u = [], c = [];
  for (e = e + "", t = t + ""; (n = $f.exec(e)) && (i = ul.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, c.push({ i: o, x: Pa(n, i) })), r = ul.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? c[0] ? xE(c[0].x) : bE(t) : (t = c.length, function(s) {
    for (var f = 0, l; f < t; ++f) u[(l = c[f]).i] = l.x(s);
    return u.join("");
  });
}
function Pn(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? rh(t) : (r === "number" ? Pa : r === "string" ? (n = li(t)) ? (t = n, Wm) : OE : t instanceof li ? Wm : t instanceof Date ? mE : vE(t) ? dE : Array.isArray(t) ? yE : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? gE : Pa)(e, t);
}
function nh(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function wE(e, t) {
  t === void 0 && (t = e, e = Pn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u);
  };
}
function _E(e) {
  return function() {
    return e;
  };
}
function Sa(e) {
  return +e;
}
var zm = [0, 1];
function Le(e) {
  return e;
}
function Mf(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : _E(isNaN(t) ? NaN : 0.5);
}
function AE(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function PE(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = Mf(i, n), a = r(o, a)) : (n = Mf(n, i), a = r(a, o)), function(u) {
    return a(n(u));
  };
}
function SE(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = Mf(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var c = Bi(e, u, 1, n) - 1;
    return a[c](i[c](u));
  };
}
function Wi(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function $o() {
  var e = zm, t = zm, r = Pn, n, i, a, o = Le, u, c, s;
  function f() {
    var p = Math.min(e.length, t.length);
    return o !== Le && (o = AE(e[0], e[p - 1])), u = p > 2 ? SE : PE, c = s = null, l;
  }
  function l(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = u(e.map(n), t, r)))(n(o(p)));
  }
  return l.invert = function(p) {
    return o(i((s || (s = u(t, e.map(n), Pa)))(p)));
  }, l.domain = function(p) {
    return arguments.length ? (e = Array.from(p, Sa), f()) : e.slice();
  }, l.range = function(p) {
    return arguments.length ? (t = Array.from(p), f()) : t.slice();
  }, l.rangeRound = function(p) {
    return t = Array.from(p), r = nh, f();
  }, l.clamp = function(p) {
    return arguments.length ? (o = p ? !0 : Le, f()) : o !== Le;
  }, l.interpolate = function(p) {
    return arguments.length ? (r = p, f()) : r;
  }, l.unknown = function(p) {
    return arguments.length ? (a = p, l) : a;
  }, function(p, d) {
    return n = p, i = d, f();
  };
}
function ih() {
  return $o()(Le, Le);
}
function jE(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function ja(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Zr(e) {
  return e = ja(Math.abs(e)), e ? e[1] : NaN;
}
function EE(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], c = 0; i > 0 && u > 0 && (c + u + 1 > n && (u = Math.max(1, n - c)), a.push(r.substring(i -= u, i + u)), !((c += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function TE(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var $E = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function fi(e) {
  if (!(t = $E.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new ah({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
fi.prototype = ah.prototype;
function ah(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
ah.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ME(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), i = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var Ea;
function CE(e, t) {
  var r = ja(e, t);
  if (!r) return Ea = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (Ea = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + ja(e, Math.max(0, t + a - 1))[0];
}
function Um(e, t) {
  var r = ja(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Km = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: jE,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Um(e * 100, t),
  r: Um,
  s: CE,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Hm(e) {
  return e;
}
var Gm = Array.prototype.map, Vm = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function IE(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Hm : EE(Gm.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Hm : TE(Gm.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(l, p) {
    l = fi(l);
    var d = l.fill, y = l.align, v = l.sign, h = l.symbol, g = l.zero, b = l.width, O = l.comma, w = l.precision, m = l.trim, x = l.type;
    x === "n" ? (O = !0, x = "g") : Km[x] || (w === void 0 && (w = 12), m = !0, x = "g"), (g || d === "0" && y === "=") && (g = !0, d = "0", y = "=");
    var _ = (p && p.prefix !== void 0 ? p.prefix : "") + (h === "$" ? r : h === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : ""), P = (h === "$" ? n : /[%p]/.test(x) ? o : "") + (p && p.suffix !== void 0 ? p.suffix : ""), S = Km[x], T = /[defgprs%]/.test(x);
    w = w === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function E(j) {
      var $ = _, C = P, M, k, R;
      if (x === "c")
        C = S(j) + C, j = "";
      else {
        j = +j;
        var q = j < 0 || 1 / j < 0;
        if (j = isNaN(j) ? c : S(Math.abs(j), w), m && (j = ME(j)), q && +j == 0 && v !== "+" && (q = !1), $ = (q ? v === "(" ? v : u : v === "-" || v === "(" ? "" : v) + $, C = (x === "s" && !isNaN(j) && Ea !== void 0 ? Vm[8 + Ea / 3] : "") + C + (q && v === "(" ? ")" : ""), T) {
          for (M = -1, k = j.length; ++M < k; )
            if (R = j.charCodeAt(M), 48 > R || R > 57) {
              C = (R === 46 ? i + j.slice(M + 1) : j.slice(M)) + C, j = j.slice(0, M);
              break;
            }
        }
      }
      O && !g && (j = t(j, 1 / 0));
      var B = $.length + j.length + C.length, U = B < b ? new Array(b - B + 1).join(d) : "";
      switch (O && g && (j = t(U + j, U.length ? b - C.length : 1 / 0), U = ""), y) {
        case "<":
          j = $ + j + C + U;
          break;
        case "=":
          j = $ + U + j + C;
          break;
        case "^":
          j = U.slice(0, B = U.length >> 1) + $ + j + C + U.slice(B);
          break;
        default:
          j = U + $ + j + C;
          break;
      }
      return a(j);
    }
    return E.toString = function() {
      return l + "";
    }, E;
  }
  function f(l, p) {
    var d = Math.max(-8, Math.min(8, Math.floor(Zr(p) / 3))) * 3, y = Math.pow(10, -d), v = s((l = fi(l), l.type = "f", l), { suffix: Vm[8 + d / 3] });
    return function(h) {
      return v(y * h);
    };
  }
  return {
    format: s,
    formatPrefix: f
  };
}
var ra, oh, iO;
kE({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function kE(e) {
  return ra = IE(e), oh = ra.format, iO = ra.formatPrefix, ra;
}
function RE(e) {
  return Math.max(0, -Zr(Math.abs(e)));
}
function DE(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Zr(t) / 3))) * 3 - Zr(Math.abs(e)));
}
function NE(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Zr(t) - Zr(e)) + 1;
}
function aO(e, t, r, n) {
  var i = jf(e, t, r), a;
  switch (n = fi(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = DE(i, o)) && (n.precision = a), iO(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = NE(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = RE(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return oh(n);
}
function Xt(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Pf(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return aO(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], u = n[a], c, s, f = 10;
    for (u < o && (s = o, o = u, u = s, s = i, i = a, a = s); f-- > 0; ) {
      if (s = Sf(o, u, r), s === c)
        return n[i] = o, n[a] = u, t(n);
      if (s > 0)
        o = Math.floor(o / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0)
        o = Math.ceil(o * s) / s, u = Math.floor(u * s) / s;
      else
        break;
      c = s;
    }
    return e;
  }, e;
}
function Ta() {
  var e = ih();
  return e.copy = function() {
    return Wi(e, Ta());
  }, it.apply(e, arguments), Xt(e);
}
function oO(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Sa), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return oO(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Sa) : [0, 1], Xt(r);
}
function uO(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Xm(e) {
  return Math.log(e);
}
function Ym(e) {
  return Math.exp(e);
}
function LE(e) {
  return -Math.log(-e);
}
function qE(e) {
  return -Math.exp(-e);
}
function BE(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function FE(e) {
  return e === 10 ? BE : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function WE(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Zm(e) {
  return (t, r) => -e(-t, r);
}
function uh(e) {
  const t = e(Xm, Ym), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = WE(n), a = FE(n), r()[0] < 0 ? (i = Zm(i), a = Zm(a), e(LE, qE)) : e(Xm, Ym), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const c = r();
    let s = c[0], f = c[c.length - 1];
    const l = f < s;
    l && ([s, f] = [f, s]);
    let p = i(s), d = i(f), y, v;
    const h = u == null ? 10 : +u;
    let g = [];
    if (!(n % 1) && d - p < h) {
      if (p = Math.floor(p), d = Math.ceil(d), s > 0) {
        for (; p <= d; ++p)
          for (y = 1; y < n; ++y)
            if (v = p < 0 ? y / a(-p) : y * a(p), !(v < s)) {
              if (v > f) break;
              g.push(v);
            }
      } else for (; p <= d; ++p)
        for (y = n - 1; y >= 1; --y)
          if (v = p > 0 ? y / a(-p) : y * a(p), !(v < s)) {
            if (v > f) break;
            g.push(v);
          }
      g.length * 2 < h && (g = Pf(s, f, h));
    } else
      g = Pf(p, d, Math.min(d - p, h)).map(a);
    return l ? g.reverse() : g;
  }, t.tickFormat = (u, c) => {
    if (u == null && (u = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = fi(c)).precision == null && (c.trim = !0), c = oh(c)), u === 1 / 0) return c;
    const s = Math.max(1, n * u / t.ticks().length);
    return (f) => {
      let l = f / a(Math.round(i(f)));
      return l * n < n - 0.5 && (l *= n), l <= s ? c(f) : "";
    };
  }, t.nice = () => r(uO(r(), {
    floor: (u) => a(Math.floor(i(u))),
    ceil: (u) => a(Math.ceil(i(u)))
  })), t;
}
function cO() {
  const e = uh($o()).domain([1, 10]);
  return e.copy = () => Wi(e, cO()).base(e.base()), it.apply(e, arguments), e;
}
function Jm(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Qm(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function ch(e) {
  var t = 1, r = e(Jm(t), Qm(t));
  return r.constant = function(n) {
    return arguments.length ? e(Jm(t = +n), Qm(t)) : t;
  }, Xt(r);
}
function sO() {
  var e = ch($o());
  return e.copy = function() {
    return Wi(e, sO()).constant(e.constant());
  }, it.apply(e, arguments);
}
function eg(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function zE(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function UE(e) {
  return e < 0 ? -e * e : e * e;
}
function sh(e) {
  var t = e(Le, Le), r = 1;
  function n() {
    return r === 1 ? e(Le, Le) : r === 0.5 ? e(zE, UE) : e(eg(r), eg(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, Xt(t);
}
function lh() {
  var e = sh($o());
  return e.copy = function() {
    return Wi(e, lh()).exponent(e.exponent());
  }, it.apply(e, arguments), e;
}
function KE() {
  return lh.apply(null, arguments).exponent(0.5);
}
function tg(e) {
  return Math.sign(e) * e * e;
}
function HE(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function lO() {
  var e = ih(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = HE(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(tg(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, Sa)).map(tg)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return lO(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, it.apply(i, arguments), Xt(i);
}
function fO() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = Zj(e, o / u);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[Bi(r, o)];
  }
  return a.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(Ht), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return fO().domain(e).range(t).unknown(n);
  }, it.apply(a, arguments);
}
function pO() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(c) {
    return c != null && c <= c ? i[Bi(n, c, 0, r)] : a;
  }
  function u() {
    var c = -1;
    for (n = new Array(r); ++c < r; ) n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(c) {
    return arguments.length ? ([e, t] = c, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(c) {
    return arguments.length ? (r = (i = Array.from(c)).length - 1, u()) : i.slice();
  }, o.invertExtent = function(c) {
    var s = i.indexOf(c);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
  }, o.unknown = function(c) {
    return arguments.length && (a = c), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return pO().domain([e, t]).range(i).unknown(a);
  }, it.apply(Xt(o), arguments);
}
function hO() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[Bi(e, a, 0, n)] : r;
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice();
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]];
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return hO().domain(e).range(t).unknown(r);
  }, it.apply(i, arguments);
}
const cl = /* @__PURE__ */ new Date(), sl = /* @__PURE__ */ new Date();
function je(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), u = i.ceil(a);
    return a - o < u - a ? o : u;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, u) => {
    const c = [];
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return c;
    let s;
    do
      c.push(s = /* @__PURE__ */ new Date(+a)), t(a, u), e(a);
    while (s < a && a < o);
    return c;
  }, i.filter = (a) => je((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0) for (; ++u <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --u >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (cl.setTime(+a), sl.setTime(+o), e(cl), e(sl), Math.floor(r(cl, sl))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const $a = je(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
$a.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? je((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : $a);
$a.range;
const At = 1e3, tt = At * 60, Pt = tt * 60, $t = Pt * 24, fh = $t * 7, rg = $t * 30, ll = $t * 365, lr = je((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * At);
}, (e, t) => (t - e) / At, (e) => e.getUTCSeconds());
lr.range;
const ph = je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * At);
}, (e, t) => {
  e.setTime(+e + t * tt);
}, (e, t) => (t - e) / tt, (e) => e.getMinutes());
ph.range;
const hh = je((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * tt);
}, (e, t) => (t - e) / tt, (e) => e.getUTCMinutes());
hh.range;
const dh = je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * At - e.getMinutes() * tt);
}, (e, t) => {
  e.setTime(+e + t * Pt);
}, (e, t) => (t - e) / Pt, (e) => e.getHours());
dh.range;
const vh = je((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Pt);
}, (e, t) => (t - e) / Pt, (e) => e.getUTCHours());
vh.range;
const zi = je(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * tt) / $t,
  (e) => e.getDate() - 1
);
zi.range;
const Mo = je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / $t, (e) => e.getUTCDate() - 1);
Mo.range;
const dO = je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / $t, (e) => Math.floor(e / $t));
dO.range;
function Pr(e) {
  return je((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * tt) / fh);
}
const Co = Pr(0), Ma = Pr(1), GE = Pr(2), VE = Pr(3), Jr = Pr(4), XE = Pr(5), YE = Pr(6);
Co.range;
Ma.range;
GE.range;
VE.range;
Jr.range;
XE.range;
YE.range;
function Sr(e) {
  return je((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / fh);
}
const Io = Sr(0), Ca = Sr(1), ZE = Sr(2), JE = Sr(3), Qr = Sr(4), QE = Sr(5), eT = Sr(6);
Io.range;
Ca.range;
ZE.range;
JE.range;
Qr.range;
QE.range;
eT.range;
const yh = je((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
yh.range;
const mh = je((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
mh.range;
const Mt = je((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Mt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : je((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Mt.range;
const Ct = je((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Ct.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : je((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Ct.range;
function vO(e, t, r, n, i, a) {
  const o = [
    [lr, 1, At],
    [lr, 5, 5 * At],
    [lr, 15, 15 * At],
    [lr, 30, 30 * At],
    [a, 1, tt],
    [a, 5, 5 * tt],
    [a, 15, 15 * tt],
    [a, 30, 30 * tt],
    [i, 1, Pt],
    [i, 3, 3 * Pt],
    [i, 6, 6 * Pt],
    [i, 12, 12 * Pt],
    [n, 1, $t],
    [n, 2, 2 * $t],
    [r, 1, fh],
    [t, 1, rg],
    [t, 3, 3 * rg],
    [e, 1, ll]
  ];
  function u(s, f, l) {
    const p = f < s;
    p && ([s, f] = [f, s]);
    const d = l && typeof l.range == "function" ? l : c(s, f, l), y = d ? d.range(s, +f + 1) : [];
    return p ? y.reverse() : y;
  }
  function c(s, f, l) {
    const p = Math.abs(f - s) / l, d = Qp(([, , h]) => h).right(o, p);
    if (d === o.length) return e.every(jf(s / ll, f / ll, l));
    if (d === 0) return $a.every(Math.max(jf(s, f, l), 1));
    const [y, v] = o[p / o[d - 1][2] < o[d][2] / p ? d - 1 : d];
    return y.every(v);
  }
  return [u, c];
}
const [tT, rT] = vO(Ct, mh, Io, dO, vh, hh), [nT, iT] = vO(Mt, yh, Co, zi, dh, ph);
function fl(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function pl(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Nn(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function aT(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, u = e.months, c = e.shortMonths, s = Ln(i), f = qn(i), l = Ln(a), p = qn(a), d = Ln(o), y = qn(o), v = Ln(u), h = qn(u), g = Ln(c), b = qn(c), O = {
    a: R,
    A: q,
    b: B,
    B: U,
    c: null,
    d: cg,
    e: cg,
    f: ET,
    g: LT,
    G: BT,
    H: PT,
    I: ST,
    j: jT,
    L: yO,
    m: TT,
    M: $T,
    p: X,
    q: z,
    Q: fg,
    s: pg,
    S: MT,
    u: CT,
    U: IT,
    V: kT,
    w: RT,
    W: DT,
    x: null,
    X: null,
    y: NT,
    Y: qT,
    Z: FT,
    "%": lg
  }, w = {
    a: Z,
    A: he,
    b: be,
    B: Ue,
    c: null,
    d: sg,
    e: sg,
    f: KT,
    g: t$,
    G: n$,
    H: WT,
    I: zT,
    j: UT,
    L: gO,
    m: HT,
    M: GT,
    p: Qt,
    q: qe,
    Q: fg,
    s: pg,
    S: VT,
    u: XT,
    U: YT,
    V: ZT,
    w: JT,
    W: QT,
    x: null,
    X: null,
    y: e$,
    Y: r$,
    Z: i$,
    "%": lg
  }, m = {
    a: T,
    A: E,
    b: j,
    B: $,
    c: C,
    d: og,
    e: og,
    f: OT,
    g: ag,
    G: ig,
    H: ug,
    I: ug,
    j: mT,
    L: xT,
    m: yT,
    M: gT,
    p: S,
    q: vT,
    Q: _T,
    s: AT,
    S: bT,
    u: lT,
    U: fT,
    V: pT,
    w: sT,
    W: hT,
    x: M,
    X: k,
    y: ag,
    Y: ig,
    Z: dT,
    "%": wT
  };
  O.x = x(r, O), O.X = x(n, O), O.c = x(t, O), w.x = x(r, w), w.X = x(n, w), w.c = x(t, w);
  function x(W, ee) {
    return function(te) {
      var N = [], me = -1, re = 0, we = W.length, _e, Be, Bt;
      for (te instanceof Date || (te = /* @__PURE__ */ new Date(+te)); ++me < we; )
        W.charCodeAt(me) === 37 && (N.push(W.slice(re, me)), (Be = ng[_e = W.charAt(++me)]) != null ? _e = W.charAt(++me) : Be = _e === "e" ? " " : "0", (Bt = ee[_e]) && (_e = Bt(te, Be)), N.push(_e), re = me + 1);
      return N.push(W.slice(re, me)), N.join("");
    };
  }
  function _(W, ee) {
    return function(te) {
      var N = Nn(1900, void 0, 1), me = P(N, W, te += "", 0), re, we;
      if (me != te.length) return null;
      if ("Q" in N) return new Date(N.Q);
      if ("s" in N) return new Date(N.s * 1e3 + ("L" in N ? N.L : 0));
      if (ee && !("Z" in N) && (N.Z = 0), "p" in N && (N.H = N.H % 12 + N.p * 12), N.m === void 0 && (N.m = "q" in N ? N.q : 0), "V" in N) {
        if (N.V < 1 || N.V > 53) return null;
        "w" in N || (N.w = 1), "Z" in N ? (re = pl(Nn(N.y, 0, 1)), we = re.getUTCDay(), re = we > 4 || we === 0 ? Ca.ceil(re) : Ca(re), re = Mo.offset(re, (N.V - 1) * 7), N.y = re.getUTCFullYear(), N.m = re.getUTCMonth(), N.d = re.getUTCDate() + (N.w + 6) % 7) : (re = fl(Nn(N.y, 0, 1)), we = re.getDay(), re = we > 4 || we === 0 ? Ma.ceil(re) : Ma(re), re = zi.offset(re, (N.V - 1) * 7), N.y = re.getFullYear(), N.m = re.getMonth(), N.d = re.getDate() + (N.w + 6) % 7);
      } else ("W" in N || "U" in N) && ("w" in N || (N.w = "u" in N ? N.u % 7 : "W" in N ? 1 : 0), we = "Z" in N ? pl(Nn(N.y, 0, 1)).getUTCDay() : fl(Nn(N.y, 0, 1)).getDay(), N.m = 0, N.d = "W" in N ? (N.w + 6) % 7 + N.W * 7 - (we + 5) % 7 : N.w + N.U * 7 - (we + 6) % 7);
      return "Z" in N ? (N.H += N.Z / 100 | 0, N.M += N.Z % 100, pl(N)) : fl(N);
    };
  }
  function P(W, ee, te, N) {
    for (var me = 0, re = ee.length, we = te.length, _e, Be; me < re; ) {
      if (N >= we) return -1;
      if (_e = ee.charCodeAt(me++), _e === 37) {
        if (_e = ee.charAt(me++), Be = m[_e in ng ? ee.charAt(me++) : _e], !Be || (N = Be(W, te, N)) < 0) return -1;
      } else if (_e != te.charCodeAt(N++))
        return -1;
    }
    return N;
  }
  function S(W, ee, te) {
    var N = s.exec(ee.slice(te));
    return N ? (W.p = f.get(N[0].toLowerCase()), te + N[0].length) : -1;
  }
  function T(W, ee, te) {
    var N = d.exec(ee.slice(te));
    return N ? (W.w = y.get(N[0].toLowerCase()), te + N[0].length) : -1;
  }
  function E(W, ee, te) {
    var N = l.exec(ee.slice(te));
    return N ? (W.w = p.get(N[0].toLowerCase()), te + N[0].length) : -1;
  }
  function j(W, ee, te) {
    var N = g.exec(ee.slice(te));
    return N ? (W.m = b.get(N[0].toLowerCase()), te + N[0].length) : -1;
  }
  function $(W, ee, te) {
    var N = v.exec(ee.slice(te));
    return N ? (W.m = h.get(N[0].toLowerCase()), te + N[0].length) : -1;
  }
  function C(W, ee, te) {
    return P(W, t, ee, te);
  }
  function M(W, ee, te) {
    return P(W, r, ee, te);
  }
  function k(W, ee, te) {
    return P(W, n, ee, te);
  }
  function R(W) {
    return o[W.getDay()];
  }
  function q(W) {
    return a[W.getDay()];
  }
  function B(W) {
    return c[W.getMonth()];
  }
  function U(W) {
    return u[W.getMonth()];
  }
  function X(W) {
    return i[+(W.getHours() >= 12)];
  }
  function z(W) {
    return 1 + ~~(W.getMonth() / 3);
  }
  function Z(W) {
    return o[W.getUTCDay()];
  }
  function he(W) {
    return a[W.getUTCDay()];
  }
  function be(W) {
    return c[W.getUTCMonth()];
  }
  function Ue(W) {
    return u[W.getUTCMonth()];
  }
  function Qt(W) {
    return i[+(W.getUTCHours() >= 12)];
  }
  function qe(W) {
    return 1 + ~~(W.getUTCMonth() / 3);
  }
  return {
    format: function(W) {
      var ee = x(W += "", O);
      return ee.toString = function() {
        return W;
      }, ee;
    },
    parse: function(W) {
      var ee = _(W += "", !1);
      return ee.toString = function() {
        return W;
      }, ee;
    },
    utcFormat: function(W) {
      var ee = x(W += "", w);
      return ee.toString = function() {
        return W;
      }, ee;
    },
    utcParse: function(W) {
      var ee = _(W += "", !0);
      return ee.toString = function() {
        return W;
      }, ee;
    }
  };
}
var ng = { "-": "", _: " ", 0: "0" }, Ce = /^\s*\d+/, oT = /^%/, uT = /[\\^$*+?|[\]().{}]/g;
function ie(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function cT(e) {
  return e.replace(uT, "\\$&");
}
function Ln(e) {
  return new RegExp("^(?:" + e.map(cT).join("|") + ")", "i");
}
function qn(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function sT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function lT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function fT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function pT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function hT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function ig(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function ag(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function dT(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function vT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function yT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function og(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function mT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function ug(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function gT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function bT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function xT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function OT(e, t, r) {
  var n = Ce.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function wT(e, t, r) {
  var n = oT.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function _T(e, t, r) {
  var n = Ce.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function AT(e, t, r) {
  var n = Ce.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function cg(e, t) {
  return ie(e.getDate(), t, 2);
}
function PT(e, t) {
  return ie(e.getHours(), t, 2);
}
function ST(e, t) {
  return ie(e.getHours() % 12 || 12, t, 2);
}
function jT(e, t) {
  return ie(1 + zi.count(Mt(e), e), t, 3);
}
function yO(e, t) {
  return ie(e.getMilliseconds(), t, 3);
}
function ET(e, t) {
  return yO(e, t) + "000";
}
function TT(e, t) {
  return ie(e.getMonth() + 1, t, 2);
}
function $T(e, t) {
  return ie(e.getMinutes(), t, 2);
}
function MT(e, t) {
  return ie(e.getSeconds(), t, 2);
}
function CT(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function IT(e, t) {
  return ie(Co.count(Mt(e) - 1, e), t, 2);
}
function mO(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Jr(e) : Jr.ceil(e);
}
function kT(e, t) {
  return e = mO(e), ie(Jr.count(Mt(e), e) + (Mt(e).getDay() === 4), t, 2);
}
function RT(e) {
  return e.getDay();
}
function DT(e, t) {
  return ie(Ma.count(Mt(e) - 1, e), t, 2);
}
function NT(e, t) {
  return ie(e.getFullYear() % 100, t, 2);
}
function LT(e, t) {
  return e = mO(e), ie(e.getFullYear() % 100, t, 2);
}
function qT(e, t) {
  return ie(e.getFullYear() % 1e4, t, 4);
}
function BT(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Jr(e) : Jr.ceil(e), ie(e.getFullYear() % 1e4, t, 4);
}
function FT(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ie(t / 60 | 0, "0", 2) + ie(t % 60, "0", 2);
}
function sg(e, t) {
  return ie(e.getUTCDate(), t, 2);
}
function WT(e, t) {
  return ie(e.getUTCHours(), t, 2);
}
function zT(e, t) {
  return ie(e.getUTCHours() % 12 || 12, t, 2);
}
function UT(e, t) {
  return ie(1 + Mo.count(Ct(e), e), t, 3);
}
function gO(e, t) {
  return ie(e.getUTCMilliseconds(), t, 3);
}
function KT(e, t) {
  return gO(e, t) + "000";
}
function HT(e, t) {
  return ie(e.getUTCMonth() + 1, t, 2);
}
function GT(e, t) {
  return ie(e.getUTCMinutes(), t, 2);
}
function VT(e, t) {
  return ie(e.getUTCSeconds(), t, 2);
}
function XT(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function YT(e, t) {
  return ie(Io.count(Ct(e) - 1, e), t, 2);
}
function bO(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Qr(e) : Qr.ceil(e);
}
function ZT(e, t) {
  return e = bO(e), ie(Qr.count(Ct(e), e) + (Ct(e).getUTCDay() === 4), t, 2);
}
function JT(e) {
  return e.getUTCDay();
}
function QT(e, t) {
  return ie(Ca.count(Ct(e) - 1, e), t, 2);
}
function e$(e, t) {
  return ie(e.getUTCFullYear() % 100, t, 2);
}
function t$(e, t) {
  return e = bO(e), ie(e.getUTCFullYear() % 100, t, 2);
}
function r$(e, t) {
  return ie(e.getUTCFullYear() % 1e4, t, 4);
}
function n$(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Qr(e) : Qr.ceil(e), ie(e.getUTCFullYear() % 1e4, t, 4);
}
function i$() {
  return "+0000";
}
function lg() {
  return "%";
}
function fg(e) {
  return +e;
}
function pg(e) {
  return Math.floor(+e / 1e3);
}
var Rr, xO, OO;
a$({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function a$(e) {
  return Rr = aT(e), xO = Rr.format, Rr.parse, OO = Rr.utcFormat, Rr.utcParse, Rr;
}
function o$(e) {
  return new Date(e);
}
function u$(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function gh(e, t, r, n, i, a, o, u, c, s) {
  var f = ih(), l = f.invert, p = f.domain, d = s(".%L"), y = s(":%S"), v = s("%I:%M"), h = s("%I %p"), g = s("%a %d"), b = s("%b %d"), O = s("%B"), w = s("%Y");
  function m(x) {
    return (c(x) < x ? d : u(x) < x ? y : o(x) < x ? v : a(x) < x ? h : n(x) < x ? i(x) < x ? g : b : r(x) < x ? O : w)(x);
  }
  return f.invert = function(x) {
    return new Date(l(x));
  }, f.domain = function(x) {
    return arguments.length ? p(Array.from(x, u$)) : p().map(o$);
  }, f.ticks = function(x) {
    var _ = p();
    return e(_[0], _[_.length - 1], x ?? 10);
  }, f.tickFormat = function(x, _) {
    return _ == null ? m : s(_);
  }, f.nice = function(x) {
    var _ = p();
    return (!x || typeof x.range != "function") && (x = t(_[0], _[_.length - 1], x ?? 10)), x ? p(uO(_, x)) : f;
  }, f.copy = function() {
    return Wi(f, gh(e, t, r, n, i, a, o, u, c, s));
  }, f;
}
function c$() {
  return it.apply(gh(nT, iT, Mt, yh, Co, zi, dh, ph, lr, xO).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function s$() {
  return it.apply(gh(tT, rT, Ct, mh, Io, Mo, vh, hh, lr, OO).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function ko() {
  var e = 0, t = 1, r, n, i, a, o = Le, u = !1, c;
  function s(l) {
    return l == null || isNaN(l = +l) ? c : o(i === 0 ? 0.5 : (l = (a(l) - r) * i, u ? Math.max(0, Math.min(1, l)) : l));
  }
  s.domain = function(l) {
    return arguments.length ? ([e, t] = l, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), s) : [e, t];
  }, s.clamp = function(l) {
    return arguments.length ? (u = !!l, s) : u;
  }, s.interpolator = function(l) {
    return arguments.length ? (o = l, s) : o;
  };
  function f(l) {
    return function(p) {
      var d, y;
      return arguments.length ? ([d, y] = p, o = l(d, y), s) : [o(0), o(1)];
    };
  }
  return s.range = f(Pn), s.rangeRound = f(nh), s.unknown = function(l) {
    return arguments.length ? (c = l, s) : c;
  }, function(l) {
    return a = l, r = l(e), n = l(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function Yt(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function wO() {
  var e = Xt(ko()(Le));
  return e.copy = function() {
    return Yt(e, wO());
  }, Lt.apply(e, arguments);
}
function _O() {
  var e = uh(ko()).domain([1, 10]);
  return e.copy = function() {
    return Yt(e, _O()).base(e.base());
  }, Lt.apply(e, arguments);
}
function AO() {
  var e = ch(ko());
  return e.copy = function() {
    return Yt(e, AO()).constant(e.constant());
  }, Lt.apply(e, arguments);
}
function bh() {
  var e = sh(ko());
  return e.copy = function() {
    return Yt(e, bh()).exponent(e.exponent());
  }, Lt.apply(e, arguments);
}
function l$() {
  return bh.apply(null, arguments).exponent(0.5);
}
function PO() {
  var e = [], t = Le;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Bi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(Ht), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => Yj(e, a / n));
  }, r.copy = function() {
    return PO(t).domain(e);
  }, Lt.apply(r, arguments);
}
function Ro() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, u, c, s = Le, f, l = !1, p;
  function d(v) {
    return isNaN(v = +v) ? p : (v = 0.5 + ((v = +f(v)) - a) * (n * v < n * a ? u : c), s(l ? Math.max(0, Math.min(1, v)) : v));
  }
  d.domain = function(v) {
    return arguments.length ? ([e, t, r] = v, i = f(e = +e), a = f(t = +t), o = f(r = +r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, d) : [e, t, r];
  }, d.clamp = function(v) {
    return arguments.length ? (l = !!v, d) : l;
  }, d.interpolator = function(v) {
    return arguments.length ? (s = v, d) : s;
  };
  function y(v) {
    return function(h) {
      var g, b, O;
      return arguments.length ? ([g, b, O] = h, s = wE(v, [g, b, O]), d) : [s(0), s(0.5), s(1)];
    };
  }
  return d.range = y(Pn), d.rangeRound = y(nh), d.unknown = function(v) {
    return arguments.length ? (p = v, d) : p;
  }, function(v) {
    return f = v, i = v(e), a = v(t), o = v(r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, d;
  };
}
function SO() {
  var e = Xt(Ro()(Le));
  return e.copy = function() {
    return Yt(e, SO());
  }, Lt.apply(e, arguments);
}
function jO() {
  var e = uh(Ro()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return Yt(e, jO()).base(e.base());
  }, Lt.apply(e, arguments);
}
function EO() {
  var e = ch(Ro());
  return e.copy = function() {
    return Yt(e, EO()).constant(e.constant());
  }, Lt.apply(e, arguments);
}
function xh() {
  var e = sh(Ro());
  return e.copy = function() {
    return Yt(e, xh()).exponent(e.exponent());
  }, Lt.apply(e, arguments);
}
function f$() {
  return xh.apply(null, arguments).exponent(0.5);
}
const hg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: ui,
  scaleDiverging: SO,
  scaleDivergingLog: jO,
  scaleDivergingPow: xh,
  scaleDivergingSqrt: f$,
  scaleDivergingSymlog: EO,
  scaleIdentity: oO,
  scaleImplicit: Ef,
  scaleLinear: Ta,
  scaleLog: cO,
  scaleOrdinal: eh,
  scalePoint: Vn,
  scalePow: lh,
  scaleQuantile: fO,
  scaleQuantize: pO,
  scaleRadial: lO,
  scaleSequential: wO,
  scaleSequentialLog: _O,
  scaleSequentialPow: bh,
  scaleSequentialQuantile: PO,
  scaleSequentialSqrt: l$,
  scaleSequentialSymlog: AO,
  scaleSqrt: KE,
  scaleSymlog: sO,
  scaleThreshold: hO,
  scaleTime: c$,
  scaleUtc: s$,
  tickFormat: aO
}, Symbol.toStringTag, { value: "Module" }));
var hl, dg;
function Do() {
  if (dg) return hl;
  dg = 1;
  var e = On();
  function t(r, n, i) {
    for (var a = -1, o = r.length; ++a < o; ) {
      var u = r[a], c = n(u);
      if (c != null && (s === void 0 ? c === c && !e(c) : i(c, s)))
        var s = c, f = u;
    }
    return f;
  }
  return hl = t, hl;
}
var dl, vg;
function TO() {
  if (vg) return dl;
  vg = 1;
  function e(t, r) {
    return t > r;
  }
  return dl = e, dl;
}
var vl, yg;
function p$() {
  if (yg) return vl;
  yg = 1;
  var e = Do(), t = TO(), r = An();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return vl = n, vl;
}
var h$ = p$();
const Ut = /* @__PURE__ */ ue(h$);
var yl, mg;
function $O() {
  if (mg) return yl;
  mg = 1;
  function e(t, r) {
    return t < r;
  }
  return yl = e, yl;
}
var ml, gg;
function d$() {
  if (gg) return ml;
  gg = 1;
  var e = Do(), t = $O(), r = An();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return ml = n, ml;
}
var v$ = d$();
const No = /* @__PURE__ */ ue(v$);
var gl, bg;
function y$() {
  if (bg) return gl;
  bg = 1;
  var e = Dp(), t = gt(), r = qx(), n = ze();
  function i(a, o) {
    var u = n(a) ? e : r;
    return u(a, t(o, 3));
  }
  return gl = i, gl;
}
var bl, xg;
function m$() {
  if (xg) return bl;
  xg = 1;
  var e = Nx(), t = y$();
  function r(n, i) {
    return e(t(n, i), 1);
  }
  return bl = r, bl;
}
var g$ = m$();
const b$ = /* @__PURE__ */ ue(g$);
var xl, Og;
function x$() {
  if (Og) return xl;
  Og = 1;
  var e = Xp();
  function t(r, n) {
    return e(r, n);
  }
  return xl = t, xl;
}
var O$ = x$();
const It = /* @__PURE__ */ ue(O$);
var Sn = 1e9, w$ = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, wh, ye = !0, nt = "[DecimalError] ", vr = nt + "Invalid argument: ", Oh = nt + "Exponent out of range: ", jn = Math.floor, or = Math.pow, _$ = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ve, Te = 1e7, de = 7, MO = 9007199254740991, Ia = jn(MO / de), H = {};
H.absoluteValue = H.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
H.comparedTo = H.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
H.decimalPlaces = H.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * de;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
H.dividedBy = H.div = function(e) {
  return Et(this, new this.constructor(e));
};
H.dividedToIntegerBy = H.idiv = function(e) {
  var t = this, r = t.constructor;
  return se(Et(t, new r(e), 0, 1), r.precision);
};
H.equals = H.eq = function(e) {
  return !this.cmp(e);
};
H.exponent = function() {
  return Oe(this);
};
H.greaterThan = H.gt = function(e) {
  return this.cmp(e) > 0;
};
H.greaterThanOrEqualTo = H.gte = function(e) {
  return this.cmp(e) >= 0;
};
H.isInteger = H.isint = function() {
  return this.e > this.d.length - 2;
};
H.isNegative = H.isneg = function() {
  return this.s < 0;
};
H.isPositive = H.ispos = function() {
  return this.s > 0;
};
H.isZero = function() {
  return this.s === 0;
};
H.lessThan = H.lt = function(e) {
  return this.cmp(e) < 0;
};
H.lessThanOrEqualTo = H.lte = function(e) {
  return this.cmp(e) < 1;
};
H.logarithm = H.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ve)) throw Error(nt + "NaN");
  if (r.s < 1) throw Error(nt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ve) ? new n(0) : (ye = !1, t = Et(pi(r, a), pi(e, a), a), ye = !0, se(t, i));
};
H.minus = H.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? kO(t, e) : CO(t, (e.s = -e.s, e));
};
H.modulo = H.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(nt + "NaN");
  return r.s ? (ye = !1, t = Et(r, e, 0, 1).times(e), ye = !0, r.minus(t)) : se(new n(r), i);
};
H.naturalExponential = H.exp = function() {
  return IO(this);
};
H.naturalLogarithm = H.ln = function() {
  return pi(this);
};
H.negated = H.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
H.plus = H.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? CO(t, e) : kO(t, (e.s = -e.s, e));
};
H.precision = H.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(vr + e);
  if (t = Oe(i) + 1, n = i.d.length - 1, r = n * de + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
H.squareRoot = H.sqrt = function() {
  var e, t, r, n, i, a, o, u = this, c = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new c(0);
    throw Error(nt + "NaN");
  }
  for (e = Oe(u), ye = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = pt(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = jn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(i.toString()), r = c.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(Et(u, a, o + 2)).times(0.5), pt(a.d).slice(0, o) === (t = pt(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (se(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return ye = !0, se(n, r);
};
H.times = H.mul = function(e) {
  var t, r, n, i, a, o, u, c, s, f = this, l = f.constructor, p = f.d, d = (e = new l(e)).d;
  if (!f.s || !e.s) return new l(0);
  for (e.s *= f.s, r = f.e + e.e, c = p.length, s = d.length, c < s && (a = p, p = d, d = a, o = c, c = s, s = o), a = [], o = c + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = c + n; i > n; )
      u = a[i] + d[n] * p[i - n - 1] + t, a[i--] = u % Te | 0, t = u / Te | 0;
    a[i] = (a[i] + t) % Te | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, ye ? se(e, l.precision) : e;
};
H.toDecimalPlaces = H.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (yt(e, 0, Sn), t === void 0 ? t = n.rounding : yt(t, 0, 8), se(r, e + Oe(r) + 1, t));
};
H.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = xr(n, !0) : (yt(e, 0, Sn), t === void 0 ? t = i.rounding : yt(t, 0, 8), n = se(new i(n), e + 1, t), r = xr(n, !0, e + 1)), r;
};
H.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? xr(i) : (yt(e, 0, Sn), t === void 0 ? t = a.rounding : yt(t, 0, 8), n = se(new a(i), e + Oe(i) + 1, t), r = xr(n.abs(), !1, e + Oe(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
H.toInteger = H.toint = function() {
  var e = this, t = e.constructor;
  return se(new t(e), Oe(e) + 1, t.rounding);
};
H.toNumber = function() {
  return +this;
};
H.toPower = H.pow = function(e) {
  var t, r, n, i, a, o, u = this, c = u.constructor, s = 12, f = +(e = new c(e));
  if (!e.s) return new c(Ve);
  if (u = new c(u), !u.s) {
    if (e.s < 1) throw Error(nt + "Infinity");
    return u;
  }
  if (u.eq(Ve)) return u;
  if (n = c.precision, e.eq(Ve)) return se(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = f < 0 ? -f : f) <= MO) {
      for (i = new c(Ve), t = Math.ceil(n / de + 4), ye = !1; r % 2 && (i = i.times(u), _g(i.d, t)), r = jn(r / 2), r !== 0; )
        u = u.times(u), _g(u.d, t);
      return ye = !0, e.s < 0 ? new c(Ve).div(i) : se(i, n);
    }
  } else if (a < 0) throw Error(nt + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, ye = !1, i = e.times(pi(u, n + s)), ye = !0, i = IO(i), i.s = a, i;
};
H.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = Oe(i), n = xr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (yt(e, 1, Sn), t === void 0 ? t = a.rounding : yt(t, 0, 8), i = se(new a(i), e, t), r = Oe(i), n = xr(i, e <= r || r <= a.toExpNeg, e)), n;
};
H.toSignificantDigits = H.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (yt(e, 1, Sn), t === void 0 ? t = n.rounding : yt(t, 0, 8)), se(new n(r), e, t);
};
H.toString = H.valueOf = H.val = H.toJSON = H[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Oe(e), r = e.constructor;
  return xr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function CO(e, t) {
  var r, n, i, a, o, u, c, s, f = e.constructor, l = f.precision;
  if (!e.s || !t.s)
    return t.s || (t = new f(e)), ye ? se(t, l) : t;
  if (c = e.d, s = t.d, o = e.e, i = t.e, c = c.slice(), a = o - i, a) {
    for (a < 0 ? (n = c, a = -a, u = s.length) : (n = s, i = o, u = c.length), o = Math.ceil(l / de), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (u = c.length, a = s.length, u - a < 0 && (a = u, n = s, s = c, c = n), r = 0; a; )
    r = (c[--a] = c[a] + s[a] + r) / Te | 0, c[a] %= Te;
  for (r && (c.unshift(r), ++i), u = c.length; c[--u] == 0; ) c.pop();
  return t.d = c, t.e = i, ye ? se(t, l) : t;
}
function yt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(vr + e);
}
function pt(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = de - n.length, r && (a += Wt(r)), a += n;
    o = e[t], n = o + "", r = de - n.length, r && (a += Wt(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var Et = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      a = n[u] * i + o, n[u] = a % Te | 0, o = a / Te | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var u, c;
    if (a != o)
      c = a > o ? 1 : -1;
    else
      for (u = c = 0; u < a; u++)
        if (n[u] != i[u]) {
          c = n[u] > i[u] ? 1 : -1;
          break;
        }
    return c;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * Te + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var u, c, s, f, l, p, d, y, v, h, g, b, O, w, m, x, _, P, S = n.constructor, T = n.s == i.s ? 1 : -1, E = n.d, j = i.d;
    if (!n.s) return new S(n);
    if (!i.s) throw Error(nt + "Division by zero");
    for (c = n.e - i.e, _ = j.length, m = E.length, d = new S(T), y = d.d = [], s = 0; j[s] == (E[s] || 0); ) ++s;
    if (j[s] > (E[s] || 0) && --c, a == null ? b = a = S.precision : o ? b = a + (Oe(n) - Oe(i)) + 1 : b = a, b < 0) return new S(0);
    if (b = b / de + 2 | 0, s = 0, _ == 1)
      for (f = 0, j = j[0], b++; (s < m || f) && b--; s++)
        O = f * Te + (E[s] || 0), y[s] = O / j | 0, f = O % j | 0;
    else {
      for (f = Te / (j[0] + 1) | 0, f > 1 && (j = e(j, f), E = e(E, f), _ = j.length, m = E.length), w = _, v = E.slice(0, _), h = v.length; h < _; ) v[h++] = 0;
      P = j.slice(), P.unshift(0), x = j[0], j[1] >= Te / 2 && ++x;
      do
        f = 0, u = t(j, v, _, h), u < 0 ? (g = v[0], _ != h && (g = g * Te + (v[1] || 0)), f = g / x | 0, f > 1 ? (f >= Te && (f = Te - 1), l = e(j, f), p = l.length, h = v.length, u = t(l, v, p, h), u == 1 && (f--, r(l, _ < p ? P : j, p))) : (f == 0 && (u = f = 1), l = j.slice()), p = l.length, p < h && l.unshift(0), r(v, l, h), u == -1 && (h = v.length, u = t(j, v, _, h), u < 1 && (f++, r(v, _ < h ? P : j, h))), h = v.length) : u === 0 && (f++, v = [0]), y[s++] = f, u && v[0] ? v[h++] = E[w] || 0 : (v = [E[w]], h = 1);
      while ((w++ < m || v[0] !== void 0) && b--);
    }
    return y[0] || y.shift(), d.e = c, se(d, o ? a + Oe(d) + 1 : a);
  };
})();
function IO(e, t) {
  var r, n, i, a, o, u, c = 0, s = 0, f = e.constructor, l = f.precision;
  if (Oe(e) > 16) throw Error(Oh + Oe(e));
  if (!e.s) return new f(Ve);
  for (ye = !1, u = l, o = new f(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(or(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new f(Ve), f.precision = u; ; ) {
    if (i = se(i.times(e), u), r = r.times(++c), o = a.plus(Et(i, r, u)), pt(o.d).slice(0, u) === pt(a.d).slice(0, u)) {
      for (; s--; ) a = se(a.times(a), u);
      return f.precision = l, t == null ? (ye = !0, se(a, l)) : a;
    }
    a = o;
  }
}
function Oe(e) {
  for (var t = e.e * de, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Ol(e, t, r) {
  if (t > e.LN10.sd())
    throw ye = !0, r && (e.precision = r), Error(nt + "LN10 precision limit exceeded");
  return se(new e(e.LN10), t);
}
function Wt(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function pi(e, t) {
  var r, n, i, a, o, u, c, s, f, l = 1, p = 10, d = e, y = d.d, v = d.constructor, h = v.precision;
  if (d.s < 1) throw Error(nt + (d.s ? "NaN" : "-Infinity"));
  if (d.eq(Ve)) return new v(0);
  if (t == null ? (ye = !1, s = h) : s = t, d.eq(10))
    return t == null && (ye = !0), Ol(v, s);
  if (s += p, v.precision = s, r = pt(y), n = r.charAt(0), a = Oe(d), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      d = d.times(e), r = pt(d.d), n = r.charAt(0), l++;
    a = Oe(d), n > 1 ? (d = new v("0." + r), a++) : d = new v(n + "." + r.slice(1));
  } else
    return c = Ol(v, s + 2, h).times(a + ""), d = pi(new v(n + "." + r.slice(1)), s - p).plus(c), v.precision = h, t == null ? (ye = !0, se(d, h)) : d;
  for (u = o = d = Et(d.minus(Ve), d.plus(Ve), s), f = se(d.times(d), s), i = 3; ; ) {
    if (o = se(o.times(f), s), c = u.plus(Et(o, new v(i), s)), pt(c.d).slice(0, s) === pt(u.d).slice(0, s))
      return u = u.times(2), a !== 0 && (u = u.plus(Ol(v, s + 2, h).times(a + ""))), u = Et(u, new v(l), s), v.precision = h, t == null ? (ye = !0, se(u, h)) : u;
    u = c, i += 2;
  }
}
function wg(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = jn(r / de), e.d = [], n = (r + 1) % de, r < 0 && (n += de), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= de; n < i; ) e.d.push(+t.slice(n, n += de));
      t = t.slice(n), n = de - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), ye && (e.e > Ia || e.e < -Ia)) throw Error(Oh + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function se(e, t, r) {
  var n, i, a, o, u, c, s, f, l = e.d;
  for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += de, i = t, s = l[f = 0];
  else {
    if (f = Math.ceil((n + 1) / de), a = l.length, f >= a) return e;
    for (s = a = l[f], o = 1; a >= 10; a /= 10) o++;
    n %= de, i = n - de + o;
  }
  if (r !== void 0 && (a = or(10, o - i - 1), u = s / a % 10 | 0, c = t < 0 || l[f + 1] !== void 0 || s % a, c = r < 4 ? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / or(10, o - i) : 0 : l[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !l[0])
    return c ? (a = Oe(e), l.length = 1, t = t - a - 1, l[0] = or(10, (de - t % de) % de), e.e = jn(-t / de) || 0) : (l.length = 1, l[0] = e.e = e.s = 0), e;
  if (n == 0 ? (l.length = f, a = 1, f--) : (l.length = f + 1, a = or(10, de - n), l[f] = i > 0 ? (s / or(10, o - i) % or(10, i) | 0) * a : 0), c)
    for (; ; )
      if (f == 0) {
        (l[0] += a) == Te && (l[0] = 1, ++e.e);
        break;
      } else {
        if (l[f] += a, l[f] != Te) break;
        l[f--] = 0, a = 1;
      }
  for (n = l.length; l[--n] === 0; ) l.pop();
  if (ye && (e.e > Ia || e.e < -Ia))
    throw Error(Oh + Oe(e));
  return e;
}
function kO(e, t) {
  var r, n, i, a, o, u, c, s, f, l, p = e.constructor, d = p.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new p(e), ye ? se(t, d) : t;
  if (c = e.d, l = t.d, n = t.e, s = e.e, c = c.slice(), o = s - n, o) {
    for (f = o < 0, f ? (r = c, o = -o, u = l.length) : (r = l, n = s, u = c.length), i = Math.max(Math.ceil(d / de), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = c.length, u = l.length, f = i < u, f && (u = i), i = 0; i < u; i++)
      if (c[i] != l[i]) {
        f = c[i] < l[i];
        break;
      }
    o = 0;
  }
  for (f && (r = c, c = l, l = r, t.s = -t.s), u = c.length, i = l.length - u; i > 0; --i) c[u++] = 0;
  for (i = l.length; i > o; ) {
    if (c[--i] < l[i]) {
      for (a = i; a && c[--a] === 0; ) c[a] = Te - 1;
      --c[a], c[i] += Te;
    }
    c[i] -= l[i];
  }
  for (; c[--u] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? (t.d = c, t.e = n, ye ? se(t, d) : t) : new p(0);
}
function xr(e, t, r) {
  var n, i = Oe(e), a = pt(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Wt(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Wt(-i - 1) + a, r && (n = r - o) > 0 && (a += Wt(n))) : i >= o ? (a += Wt(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Wt(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Wt(n))), e.s < 0 ? "-" + a : a;
}
function _g(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function RO(e) {
  var t, r, n;
  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(vr + a);
      if (a > 0)
        o.s = 1;
      else if (a < 0)
        a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return;
      }
      return wg(o, a.toString());
    } else if (typeof a != "string")
      throw Error(vr + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, _$.test(a)) wg(o, a);
    else throw Error(vr + a);
  }
  if (i.prototype = H, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = RO, i.config = i.set = A$, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function A$(e) {
  if (!e || typeof e != "object")
    throw Error(nt + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    Sn,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (jn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(vr + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(vr + r + ": " + n);
  return this;
}
var wh = RO(w$);
Ve = new wh(1);
const ce = wh;
function P$(e) {
  return T$(e) || E$(e) || j$(e) || S$();
}
function S$() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j$(e, t) {
  if (e) {
    if (typeof e == "string") return Cf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Cf(e, t);
  }
}
function E$(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function T$(e) {
  if (Array.isArray(e)) return Cf(e);
}
function Cf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var $$ = function(t) {
  return t;
}, DO = {}, NO = function(t) {
  return t === DO;
}, Ag = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && NO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, M$ = function e(t, r) {
  return t === 1 ? r : Ag(function() {
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    var o = i.filter(function(u) {
      return u !== DO;
    }).length;
    return o >= t ? r.apply(void 0, i) : e(t - o, Ag(function() {
      for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
        c[s] = arguments[s];
      var f = i.map(function(l) {
        return NO(l) ? c.shift() : l;
      });
      return r.apply(void 0, P$(f).concat(c));
    }));
  });
}, Lo = function(t) {
  return M$(t.length, t);
}, If = function(t, r) {
  for (var n = [], i = t; i < r; ++i)
    n[i - t] = i;
  return n;
}, C$ = Lo(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), I$ = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return $$;
  var i = r.reverse(), a = i[0], o = i.slice(1);
  return function() {
    return o.reduce(function(u, c) {
      return c(u);
    }, a.apply(void 0, arguments));
  };
}, kf = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, LO = function(t) {
  var r = null, n = null;
  return function() {
    for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return r && a.every(function(u, c) {
      return u === r[c];
    }) || (r = a, n = t.apply(void 0, a)), n;
  };
};
function k$(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new ce(e).abs().log(10).toNumber()) + 1, t;
}
function R$(e, t, r) {
  for (var n = new ce(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var D$ = Lo(function(e, t, r) {
  var n = +e, i = +t;
  return n + r * (i - n);
}), N$ = Lo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), L$ = Lo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const qo = {
  rangeStep: R$,
  getDigitCount: k$,
  interpolateNumber: D$,
  uninterpolateNumber: N$,
  uninterpolateTruncation: L$
};
function Rf(e) {
  return F$(e) || B$(e) || qO(e) || q$();
}
function q$() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function B$(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function F$(e) {
  if (Array.isArray(e)) return Df(e);
}
function hi(e, t) {
  return U$(e) || z$(e, t) || qO(e, t) || W$();
}
function W$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qO(e, t) {
  if (e) {
    if (typeof e == "string") return Df(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Df(e, t);
  }
}
function Df(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function z$(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, i = !1, a = void 0;
    try {
      for (var o = e[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (c) {
      i = !0, a = c;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (i) throw a;
      }
    }
    return r;
  }
}
function U$(e) {
  if (Array.isArray(e)) return e;
}
function BO(e) {
  var t = hi(e, 2), r = t[0], n = t[1], i = r, a = n;
  return r > n && (i = n, a = r), [i, a];
}
function FO(e, t, r) {
  if (e.lte(0))
    return new ce(0);
  var n = qo.getDigitCount(e.toNumber()), i = new ce(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, u = new ce(Math.ceil(a.div(o).toNumber())).add(r).mul(o), c = u.mul(i);
  return t ? c : new ce(Math.ceil(c));
}
function K$(e, t, r) {
  var n = 1, i = new ce(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new ce(10).pow(qo.getDigitCount(e) - 1), i = new ce(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new ce(Math.floor(e)));
  } else e === 0 ? i = new ce(Math.floor((t - 1) / 2)) : r || (i = new ce(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = I$(C$(function(c) {
    return i.add(new ce(c - o).mul(n)).toNumber();
  }), If);
  return u(0, t);
}
function WO(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new ce(0),
      tickMin: new ce(0),
      tickMax: new ce(0)
    };
  var a = FO(new ce(t).sub(e).div(r - 1), n, i), o;
  e <= 0 && t >= 0 ? o = new ce(0) : (o = new ce(e).add(t).div(2), o = o.sub(new ce(o).mod(a)));
  var u = Math.ceil(o.sub(e).div(a).toNumber()), c = Math.ceil(new ce(t).sub(o).div(a).toNumber()), s = u + c + 1;
  return s > r ? WO(e, t, r, n, i + 1) : (s < r && (c = t > 0 ? c + (r - s) : c, u = t > 0 ? u : u + (r - s)), {
    step: a,
    tickMin: o.sub(new ce(u).mul(a)),
    tickMax: o.add(new ce(c).mul(a))
  });
}
function H$(e) {
  var t = hi(e, 2), r = t[0], n = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(i, 2), u = BO([r, n]), c = hi(u, 2), s = c[0], f = c[1];
  if (s === -1 / 0 || f === 1 / 0) {
    var l = f === 1 / 0 ? [s].concat(Rf(If(0, i - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Rf(If(0, i - 1).map(function() {
      return -1 / 0;
    })), [f]);
    return r > n ? kf(l) : l;
  }
  if (s === f)
    return K$(s, i, a);
  var p = WO(s, f, o, a), d = p.step, y = p.tickMin, v = p.tickMax, h = qo.rangeStep(y, v.add(new ce(0.1).mul(d)), d);
  return r > n ? kf(h) : h;
}
function G$(e, t) {
  var r = hi(e, 2), n = r[0], i = r[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = BO([n, i]), u = hi(o, 2), c = u[0], s = u[1];
  if (c === -1 / 0 || s === 1 / 0)
    return [n, i];
  if (c === s)
    return [c];
  var f = Math.max(t, 2), l = FO(new ce(s).sub(c).div(f - 1), a, 0), p = [].concat(Rf(qo.rangeStep(new ce(c), new ce(s).sub(new ce(0.99).mul(l)), l)), [s]);
  return n > i ? kf(p) : p;
}
var V$ = LO(H$), X$ = LO(G$), Y$ = "Invariant failed";
function Or(e, t) {
  throw new Error(Y$);
}
var Z$ = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function en(e) {
  "@babel/helpers - typeof";
  return en = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, en(e);
}
function ka() {
  return ka = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ka.apply(this, arguments);
}
function J$(e, t) {
  return rM(e) || tM(e, t) || eM(e, t) || Q$();
}
function Q$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function eM(e, t) {
  if (e) {
    if (typeof e == "string") return Pg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pg(e, t);
  }
}
function Pg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function tM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function rM(e) {
  if (Array.isArray(e)) return e;
}
function nM(e, t) {
  if (e == null) return {};
  var r = iM(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function iM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function aM(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oM(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, KO(n.key), n);
  }
}
function uM(e, t, r) {
  return t && oM(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cM(e, t, r) {
  return t = Ra(t), sM(e, zO() ? Reflect.construct(t, r || [], Ra(e).constructor) : t.apply(e, r));
}
function sM(e, t) {
  if (t && (en(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lM(e);
}
function lM(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function zO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zO = function() {
    return !!e;
  })();
}
function Ra(e) {
  return Ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ra(e);
}
function fM(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Nf(e, t);
}
function Nf(e, t) {
  return Nf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Nf(e, t);
}
function UO(e, t, r) {
  return t = KO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KO(e) {
  var t = pM(e, "string");
  return en(t) == "symbol" ? t : t + "";
}
function pM(e, t) {
  if (en(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (en(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ui = /* @__PURE__ */ (function(e) {
  function t() {
    return aM(this, t), cM(this, t, arguments);
  }
  return fM(t, e), uM(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.offset, a = n.layout, o = n.width, u = n.dataKey, c = n.data, s = n.dataPointFormatter, f = n.xAxis, l = n.yAxis, p = nM(n, Z$), d = K(p, !1);
      this.props.direction === "x" && f.type !== "number" && Or();
      var y = c.map(function(v) {
        var h = s(v, u), g = h.x, b = h.y, O = h.value, w = h.errorVal;
        if (!w)
          return null;
        var m = [], x, _;
        if (Array.isArray(w)) {
          var P = J$(w, 2);
          x = P[0], _ = P[1];
        } else
          x = _ = w;
        if (a === "vertical") {
          var S = f.scale, T = b + i, E = T + o, j = T - o, $ = S(O - x), C = S(O + _);
          m.push({
            x1: C,
            y1: E,
            x2: C,
            y2: j
          }), m.push({
            x1: $,
            y1: T,
            x2: C,
            y2: T
          }), m.push({
            x1: $,
            y1: E,
            x2: $,
            y2: j
          });
        } else if (a === "horizontal") {
          var M = l.scale, k = g + i, R = k - o, q = k + o, B = M(O - x), U = M(O + _);
          m.push({
            x1: R,
            y1: U,
            x2: q,
            y2: U
          }), m.push({
            x1: k,
            y1: B,
            x2: k,
            y2: U
          }), m.push({
            x1: R,
            y1: B,
            x2: q,
            y2: B
          });
        }
        return /* @__PURE__ */ A.createElement(Q, ka({
          className: "recharts-errorBar",
          key: "bar-".concat(m.map(function(X) {
            return "".concat(X.x1, "-").concat(X.x2, "-").concat(X.y1, "-").concat(X.y2);
          }))
        }, d), m.map(function(X) {
          return /* @__PURE__ */ A.createElement("line", ka({}, X, {
            key: "line-".concat(X.x1, "-").concat(X.x2, "-").concat(X.y1, "-").concat(X.y2)
          }));
        }));
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-errorBars"
      }, y);
    }
  }]);
})(A.Component);
UO(Ui, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
UO(Ui, "displayName", "ErrorBar");
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function Sg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sg(Object(r), !0).forEach(function(n) {
      hM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hM(e, t, r) {
  return t = dM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dM(e) {
  var t = vM(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function vM(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var HO = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, i = t.legendWidth, a = t.legendContent, o = Ge(r, hr);
  if (!o)
    return null;
  var u = hr.defaultProps, c = u !== void 0 ? rr(rr({}, u), o.props) : {}, s;
  return o.props && o.props.payload ? s = o.props && o.props.payload : a === "children" ? s = (n || []).reduce(function(f, l) {
    var p = l.item, d = l.props, y = d.sectors || d.data || [];
    return f.concat(y.map(function(v) {
      return {
        type: o.props.iconType || p.props.legendType,
        value: v.name,
        color: v.fill,
        payload: v
      };
    }));
  }, []) : s = (n || []).map(function(f) {
    var l = f.item, p = l.type.defaultProps, d = p !== void 0 ? rr(rr({}, p), l.props) : {}, y = d.dataKey, v = d.name, h = d.legendType, g = d.hide;
    return {
      inactive: g,
      dataKey: y,
      type: c.iconType || h || "square",
      color: _h(l),
      value: v || y,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: d
    };
  }), rr(rr(rr({}, c), hr.getWithHeight(o, i)), {}, {
    payload: s,
    item: o
  });
};
function vi(e) {
  "@babel/helpers - typeof";
  return vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vi(e);
}
function jg(e) {
  return bM(e) || gM(e) || mM(e) || yM();
}
function yM() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mM(e, t) {
  if (e) {
    if (typeof e == "string") return Lf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lf(e, t);
  }
}
function gM(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function bM(e) {
  if (Array.isArray(e)) return Lf(e);
}
function Lf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Eg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Eg(Object(r), !0).forEach(function(n) {
      Kr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Eg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Kr(e, t, r) {
  return t = xM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xM(e) {
  var t = OM(e, "string");
  return vi(t) == "symbol" ? t : t + "";
}
function OM(e, t) {
  if (vi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ve(e, t, r) {
  return J(e) || J(t) ? r : Se(t) ? Xe(e, t, r) : G(t) ? t(e) : r;
}
function Xn(e, t, r, n) {
  var i = b$(e, function(u) {
    return ve(u, t);
  });
  if (r === "number") {
    var a = i.filter(function(u) {
      return L(u) || parseFloat(u);
    });
    return a.length ? [No(a), Ut(a)] : [1 / 0, -1 / 0];
  }
  var o = n ? i.filter(function(u) {
    return !J(u);
  }) : i;
  return o.map(function(u) {
    return Se(u) || u instanceof Date ? u : "";
  });
}
var wM = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], i = arguments.length > 2 ? arguments[2] : void 0, a = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1)
    return 0;
  if (a && a.axisType === "angleAxis" && Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6)
    for (var c = a.range, s = 0; s < u; s++) {
      var f = s > 0 ? i[s - 1].coordinate : i[u - 1].coordinate, l = i[s].coordinate, p = s >= u - 1 ? i[0].coordinate : i[s + 1].coordinate, d = void 0;
      if (Me(l - f) !== Me(p - l)) {
        var y = [];
        if (Me(p - l) === Me(c[1] - c[0])) {
          d = p;
          var v = l + c[1] - c[0];
          y[0] = Math.min(v, (v + f) / 2), y[1] = Math.max(v, (v + f) / 2);
        } else {
          d = f;
          var h = p + c[1] - c[0];
          y[0] = Math.min(l, (h + l) / 2), y[1] = Math.max(l, (h + l) / 2);
        }
        var g = [Math.min(l, (d + l) / 2), Math.max(l, (d + l) / 2)];
        if (t > g[0] && t <= g[1] || t >= y[0] && t <= y[1]) {
          o = i[s].index;
          break;
        }
      } else {
        var b = Math.min(f, p), O = Math.max(f, p);
        if (t > (b + l) / 2 && t <= (O + l) / 2) {
          o = i[s].index;
          break;
        }
      }
    }
  else
    for (var w = 0; w < u; w++)
      if (w === 0 && t <= (n[w].coordinate + n[w + 1].coordinate) / 2 || w > 0 && w < u - 1 && t > (n[w].coordinate + n[w - 1].coordinate) / 2 && t <= (n[w].coordinate + n[w + 1].coordinate) / 2 || w === u - 1 && t > (n[w].coordinate + n[w - 1].coordinate) / 2) {
        o = n[w].index;
        break;
      }
  return o;
}, _h = function(t) {
  var r, n = t, i = n.type.displayName, a = (r = t.type) !== null && r !== void 0 && r.defaultProps ? ge(ge({}, t.type.defaultProps), t.props) : t.props, o = a.stroke, u = a.fill, c;
  switch (i) {
    case "Line":
      c = o;
      break;
    case "Area":
    case "Radar":
      c = o && o !== "none" ? o : u;
      break;
    default:
      c = u;
      break;
  }
  return c;
}, _M = function(t) {
  var r = t.barSize, n = t.totalSize, i = t.stackGroups, a = i === void 0 ? {} : i;
  if (!a)
    return {};
  for (var o = {}, u = Object.keys(a), c = 0, s = u.length; c < s; c++)
    for (var f = a[u[c]].stackGroups, l = Object.keys(f), p = 0, d = l.length; p < d; p++) {
      var y = f[l[p]], v = y.items, h = y.cateAxisId, g = v.filter(function(_) {
        return jt(_.type).indexOf("Bar") >= 0;
      });
      if (g && g.length) {
        var b = g[0].type.defaultProps, O = b !== void 0 ? ge(ge({}, b), g[0].props) : g[0].props, w = O.barSize, m = O[h];
        o[m] || (o[m] = []);
        var x = J(w) ? r : w;
        o[m].push({
          item: g[0],
          stackList: g.slice(1),
          barSize: J(x) ? void 0 : Ne(x, n, 0)
        });
      }
    }
  return o;
}, AM = function(t) {
  var r = t.barGap, n = t.barCategoryGap, i = t.bandSize, a = t.sizeList, o = a === void 0 ? [] : a, u = t.maxBarSize, c = o.length;
  if (c < 1) return null;
  var s = Ne(r, i, 0, !0), f, l = [];
  if (o[0].barSize === +o[0].barSize) {
    var p = !1, d = i / c, y = o.reduce(function(w, m) {
      return w + m.barSize || 0;
    }, 0);
    y += (c - 1) * s, y >= i && (y -= (c - 1) * s, s = 0), y >= i && d > 0 && (p = !0, d *= 0.9, y = c * d);
    var v = (i - y) / 2 >> 0, h = {
      offset: v - s,
      size: 0
    };
    f = o.reduce(function(w, m) {
      var x = {
        item: m.item,
        position: {
          offset: h.offset + h.size + s,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: p ? d : m.barSize
        }
      }, _ = [].concat(jg(w), [x]);
      return h = _[_.length - 1].position, m.stackList && m.stackList.length && m.stackList.forEach(function(P) {
        _.push({
          item: P,
          position: h
        });
      }), _;
    }, l);
  } else {
    var g = Ne(n, i, 0, !0);
    i - 2 * g - (c - 1) * s <= 0 && (s = 0);
    var b = (i - 2 * g - (c - 1) * s) / c;
    b > 1 && (b >>= 0);
    var O = u === +u ? Math.min(b, u) : b;
    f = o.reduce(function(w, m, x) {
      var _ = [].concat(jg(w), [{
        item: m.item,
        position: {
          offset: g + (b + s) * x + (b - O) / 2,
          size: O
        }
      }]);
      return m.stackList && m.stackList.length && m.stackList.forEach(function(P) {
        _.push({
          item: P,
          position: _[_.length - 1].position
        });
      }), _;
    }, l);
  }
  return f;
}, PM = function(t, r, n, i) {
  var a = n.children, o = n.width, u = n.margin, c = o - (u.left || 0) - (u.right || 0), s = HO({
    children: a,
    legendWidth: c
  });
  if (s) {
    var f = i || {}, l = f.width, p = f.height, d = s.align, y = s.verticalAlign, v = s.layout;
    if ((v === "vertical" || v === "horizontal" && y === "middle") && d !== "center" && L(t[d]))
      return ge(ge({}, t), {}, Kr({}, d, t[d] + (l || 0)));
    if ((v === "horizontal" || v === "vertical" && d === "center") && y !== "middle" && L(t[y]))
      return ge(ge({}, t), {}, Kr({}, y, t[y] + (p || 0)));
  }
  return t;
}, SM = function(t, r, n) {
  return J(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, GO = function(t, r, n, i, a) {
  var o = r.props.children, u = We(o, Ui).filter(function(s) {
    return SM(i, a, s.props.direction);
  });
  if (u && u.length) {
    var c = u.map(function(s) {
      return s.props.dataKey;
    });
    return t.reduce(function(s, f) {
      var l = ve(f, n);
      if (J(l)) return s;
      var p = Array.isArray(l) ? [No(l), Ut(l)] : [l, l], d = c.reduce(function(y, v) {
        var h = ve(f, v, 0), g = p[0] - Math.abs(Array.isArray(h) ? h[0] : h), b = p[1] + Math.abs(Array.isArray(h) ? h[1] : h);
        return [Math.min(g, y[0]), Math.max(b, y[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(d[0], s[0]), Math.max(d[1], s[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, jM = function(t, r, n, i, a) {
  var o = r.map(function(u) {
    return GO(t, u, n, a, i);
  }).filter(function(u) {
    return !J(u);
  });
  return o && o.length ? o.reduce(function(u, c) {
    return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
  }, [1 / 0, -1 / 0]) : null;
}, VO = function(t, r, n, i, a) {
  var o = r.map(function(c) {
    var s = c.props.dataKey;
    return n === "number" && s && GO(t, c, s, i) || Xn(t, s, n, a);
  });
  if (n === "number")
    return o.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(c, s) {
        return [Math.min(c[0], s[0]), Math.max(c[1], s[1])];
      },
      [1 / 0, -1 / 0]
    );
  var u = {};
  return o.reduce(function(c, s) {
    for (var f = 0, l = s.length; f < l; f++)
      u[s[f]] || (u[s[f]] = !0, c.push(s[f]));
    return c;
  }, []);
}, XO = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, YO = function(t, r, n, i) {
  if (i)
    return t.map(function(c) {
      return c.coordinate;
    });
  var a, o, u = t.map(function(c) {
    return c.coordinate === r && (a = !0), c.coordinate === n && (o = !0), c.coordinate;
  });
  return a || u.push(r), o || u.push(n), u;
}, St = function(t, r, n) {
  if (!t) return null;
  var i = t.scale, a = t.duplicateDomain, o = t.type, u = t.range, c = t.realScaleType === "scaleBand" ? i.bandwidth() / 2 : 2, s = (r || n) && o === "category" && i.bandwidth ? i.bandwidth() / c : 0;
  if (s = t.axisType === "angleAxis" && (u == null ? void 0 : u.length) >= 2 ? Me(u[0] - u[1]) * 2 * s : s, r && (t.ticks || t.niceTicks)) {
    var f = (t.ticks || t.niceTicks).map(function(l) {
      var p = a ? a.indexOf(l) : l;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: i(p) + s,
        value: l,
        offset: s
      };
    });
    return f.filter(function(l) {
      return !_n(l.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(l, p) {
    return {
      coordinate: i(l) + s,
      value: l,
      index: p,
      offset: s
    };
  }) : i.ticks && !n ? i.ticks(t.tickCount).map(function(l) {
    return {
      coordinate: i(l) + s,
      value: l,
      offset: s
    };
  }) : i.domain().map(function(l, p) {
    return {
      coordinate: i(l) + s,
      value: a ? a[l] : l,
      index: p,
      offset: s
    };
  });
}, wl = /* @__PURE__ */ new WeakMap(), na = function(t, r) {
  if (typeof r != "function")
    return t;
  wl.has(t) || wl.set(t, /* @__PURE__ */ new WeakMap());
  var n = wl.get(t);
  if (n.has(r))
    return n.get(r);
  var i = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, i), i;
}, ZO = function(t, r, n) {
  var i = t.scale, a = t.type, o = t.layout, u = t.axisType;
  if (i === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: ui(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: Ta(),
      realScaleType: "linear"
    } : a === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: Vn(),
      realScaleType: "point"
    } : a === "category" ? {
      scale: ui(),
      realScaleType: "band"
    } : {
      scale: Ta(),
      realScaleType: "linear"
    };
  if (gr(i)) {
    var c = "scale".concat(wo(i));
    return {
      scale: (hg[c] || Vn)(),
      realScaleType: hg[c] ? c : "point"
    };
  }
  return G(i) ? {
    scale: i
  } : {
    scale: Vn(),
    realScaleType: "point"
  };
}, Tg = 1e-4, JO = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, i = t.range(), a = Math.min(i[0], i[1]) - Tg, o = Math.max(i[0], i[1]) + Tg, u = t(r[0]), c = t(r[n - 1]);
    (u < a || u > o || c < a || c > o) && t.domain([r[0], r[n - 1]]);
  }
}, QO = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, i = t.length; n < i; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, ew = function(t, r) {
  if (!r || r.length !== 2 || !L(r[0]) || !L(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]), a = [t[0], t[1]];
  return (!L(t[0]) || t[0] < n) && (a[0] = n), (!L(t[1]) || t[1] > i) && (a[1] = i), a[0] > i && (a[0] = i), a[1] < n && (a[1] = n), a;
}, EM = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0, u = 0; u < r; ++u) {
        var c = _n(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        c >= 0 ? (t[u][n][0] = a, t[u][n][1] = a + c, a = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + c, o = t[u][n][1]);
      }
}, TM = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0; o < r; ++o) {
        var u = _n(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = a, t[o][n][1] = a + u, a = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, $M = {
  sign: EM,
  // @ts-expect-error definitelytyped types are incorrect
  expand: g1,
  // @ts-expect-error definitelytyped types are incorrect
  none: Hr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: b1,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: x1,
  positive: TM
}, MM = function(t, r, n) {
  var i = r.map(function(u) {
    return u.props.dataKey;
  }), a = $M[n], o = m1().keys(i).value(function(u, c) {
    return +ve(u, c, 0);
  }).order(df).offset(a);
  return o(t);
}, CM = function(t, r, n, i, a, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, c = {}, s = u.reduce(function(l, p) {
    var d, y = (d = p.type) !== null && d !== void 0 && d.defaultProps ? ge(ge({}, p.type.defaultProps), p.props) : p.props, v = y.stackId, h = y.hide;
    if (h)
      return l;
    var g = y[n], b = l[g] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (Se(v)) {
      var O = b.stackGroups[v] || {
        numericAxisId: n,
        cateAxisId: i,
        items: []
      };
      O.items.push(p), b.hasStack = !0, b.stackGroups[v] = O;
    } else
      b.stackGroups[Ar("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: i,
        items: [p]
      };
    return ge(ge({}, l), {}, Kr({}, g, b));
  }, c), f = {};
  return Object.keys(s).reduce(function(l, p) {
    var d = s[p];
    if (d.hasStack) {
      var y = {};
      d.stackGroups = Object.keys(d.stackGroups).reduce(function(v, h) {
        var g = d.stackGroups[h];
        return ge(ge({}, v), {}, Kr({}, h, {
          numericAxisId: n,
          cateAxisId: i,
          items: g.items,
          stackedData: MM(t, g.items, a)
        }));
      }, y);
    }
    return ge(ge({}, l), {}, Kr({}, p, d));
  }, f);
}, tw = function(t, r) {
  var n = r.realScaleType, i = r.type, a = r.tickCount, o = r.originalDomain, u = r.allowDecimals, c = n || r.scale;
  if (c !== "auto" && c !== "linear")
    return null;
  if (a && i === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var s = t.domain();
    if (!s.length)
      return null;
    var f = V$(s, a, u);
    return t.domain([No(f), Ut(f)]), {
      niceTicks: f
    };
  }
  if (a && i === "number") {
    var l = t.domain(), p = X$(l, a, u);
    return {
      niceTicks: p
    };
  }
  return null;
};
function Da(e) {
  var t = e.axis, r = e.ticks, n = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !J(i[t.dataKey])) {
      var u = la(r, "value", i[t.dataKey]);
      if (u)
        return u.coordinate + n / 2;
    }
    return r[a] ? r[a].coordinate + n / 2 : null;
  }
  var c = ve(i, J(o) ? t.dataKey : o);
  return J(c) ? null : t.scale(c);
}
var Na = function(t) {
  var r = t.axis, n = t.ticks, i = t.offset, a = t.bandSize, o = t.entry, u = t.index;
  if (r.type === "category")
    return n[u] ? n[u].coordinate + i : null;
  var c = ve(o, r.dataKey, r.domain[u]);
  return J(c) ? null : r.scale(c) - a / 2 + i;
}, rw = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var i = Math.min(n[0], n[1]), a = Math.max(n[0], n[1]);
    return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i;
  }
  return n[0];
}, IM = function(t, r) {
  var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? ge(ge({}, t.type.defaultProps), t.props) : t.props, a = i.stackId;
  if (Se(a)) {
    var o = r[a];
    if (o) {
      var u = o.items.indexOf(t);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, kM = function(t) {
  return t.reduce(function(r, n) {
    return [No(n.concat([r[0]]).filter(L)), Ut(n.concat([r[1]]).filter(L))];
  }, [1 / 0, -1 / 0]);
}, nw = function(t, r, n) {
  return Object.keys(t).reduce(function(i, a) {
    var o = t[a], u = o.stackedData, c = u.reduce(function(s, f) {
      var l = kM(f.slice(r, n + 1));
      return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(c[0], i[0]), Math.max(c[1], i[1])];
  }, [1 / 0, -1 / 0]).map(function(i) {
    return i === 1 / 0 || i === -1 / 0 ? 0 : i;
  });
}, $g = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Mg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, qf = function(t, r, n) {
  if (G(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var i = [];
  if (L(t[0]))
    i[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if ($g.test(t[0])) {
    var a = +$g.exec(t[0])[1];
    i[0] = r[0] - a;
  } else G(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
  if (L(t[1]))
    i[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (Mg.test(t[1])) {
    var o = +Mg.exec(t[1])[1];
    i[1] = r[1] + o;
  } else G(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
  return i;
}, La = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var i = t.scale.bandwidth();
    if (!n || i > 0)
      return i;
  }
  if (t && r && r.length >= 2) {
    for (var a = Zp(r, function(l) {
      return l.coordinate;
    }), o = 1 / 0, u = 1, c = a.length; u < c; u++) {
      var s = a[u], f = a[u - 1];
      o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, Cg = function(t, r, n) {
  return !t || !t.length || It(t, Xe(n, "type.defaultProps.domain")) ? r : t;
}, Ah = function(t, r) {
  var n = t.type.defaultProps ? ge(ge({}, t.type.defaultProps), t.props) : t.props, i = n.dataKey, a = n.name, o = n.unit, u = n.formatter, c = n.tooltipType, s = n.chartType, f = n.hide;
  return ge(ge({}, K(t, !1)), {}, {
    dataKey: i,
    unit: o,
    formatter: u,
    name: a || i,
    color: _h(t),
    value: ve(r, i),
    type: c,
    payload: r,
    chartType: s,
    hide: f
  });
};
function yi(e) {
  "@babel/helpers - typeof";
  return yi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yi(e);
}
function Ig(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ig(Object(r), !0).forEach(function(n) {
      iw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ig(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iw(e, t, r) {
  return t = RM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RM(e) {
  var t = DM(e, "string");
  return yi(t) == "symbol" ? t : t + "";
}
function DM(e, t) {
  if (yi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function NM(e, t) {
  return FM(e) || BM(e, t) || qM(e, t) || LM();
}
function LM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qM(e, t) {
  if (e) {
    if (typeof e == "string") return kg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return kg(e, t);
  }
}
function kg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function BM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function FM(e) {
  if (Array.isArray(e)) return e;
}
var qa = Math.PI / 180, WM = function(t) {
  return t * 180 / Math.PI;
}, ne = function(t, r, n, i) {
  return {
    x: t + Math.cos(-qa * i) * n,
    y: r + Math.sin(-qa * i) * n
  };
}, aw = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, Ph = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.startAngle, s = t.endAngle, f = Ne(t.cx, o, o / 2), l = Ne(t.cy, u, u / 2), p = aw(o, u, n), d = Ne(t.innerRadius, p, 0), y = Ne(t.outerRadius, p, p * 0.8), v = Object.keys(r);
  return v.reduce(function(h, g) {
    var b = r[g], O = b.domain, w = b.reversed, m;
    if (J(b.range))
      i === "angleAxis" ? m = [c, s] : i === "radiusAxis" && (m = [d, y]), w && (m = [m[1], m[0]]);
    else {
      m = b.range;
      var x = m, _ = NM(x, 2);
      c = _[0], s = _[1];
    }
    var P = ZO(b, a), S = P.realScaleType, T = P.scale;
    T.domain(O).range(m), JO(T);
    var E = tw(T, Ot(Ot({}, b), {}, {
      realScaleType: S
    })), j = Ot(Ot(Ot({}, b), E), {}, {
      range: m,
      radius: y,
      realScaleType: S,
      scale: T,
      cx: f,
      cy: l,
      innerRadius: d,
      outerRadius: y,
      startAngle: c,
      endAngle: s
    });
    return Ot(Ot({}, h), {}, iw({}, g, j));
  }, {});
}, zM = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2));
}, UM = function(t, r) {
  var n = t.x, i = t.y, a = r.cx, o = r.cy, u = zM({
    x: n,
    y: i
  }, {
    x: a,
    y: o
  });
  if (u <= 0)
    return {
      radius: u
    };
  var c = (n - a) / u, s = Math.acos(c);
  return i > o && (s = 2 * Math.PI - s), {
    radius: u,
    angle: WM(s),
    angleInRadian: s
  };
}, KM = function(t) {
  var r = t.startAngle, n = t.endAngle, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, HM = function(t, r) {
  var n = r.startAngle, i = r.endAngle, a = Math.floor(n / 360), o = Math.floor(i / 360), u = Math.min(a, o);
  return t + u * 360;
}, Rg = function(t, r) {
  var n = t.x, i = t.y, a = UM({
    x: n,
    y: i
  }, r), o = a.radius, u = a.angle, c = r.innerRadius, s = r.outerRadius;
  if (o < c || o > s)
    return !1;
  if (o === 0)
    return !0;
  var f = KM(r), l = f.startAngle, p = f.endAngle, d = u, y;
  if (l <= p) {
    for (; d > p; )
      d -= 360;
    for (; d < l; )
      d += 360;
    y = d >= l && d <= p;
  } else {
    for (; d > l; )
      d -= 360;
    for (; d < p; )
      d += 360;
    y = d >= p && d <= l;
  }
  return y ? Ot(Ot({}, r), {}, {
    radius: o,
    angle: HM(d, r)
  }) : null;
}, ow = function(t) {
  return !/* @__PURE__ */ D.isValidElement(t) && !G(t) && typeof t != "boolean" ? t.className : "";
};
function mi(e) {
  "@babel/helpers - typeof";
  return mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mi(e);
}
var GM = ["offset"];
function VM(e) {
  return JM(e) || ZM(e) || YM(e) || XM();
}
function XM() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YM(e, t) {
  if (e) {
    if (typeof e == "string") return Bf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Bf(e, t);
  }
}
function ZM(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function JM(e) {
  if (Array.isArray(e)) return Bf(e);
}
function Bf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function QM(e, t) {
  if (e == null) return {};
  var r = eC(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function eC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Dg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Dg(Object(r), !0).forEach(function(n) {
      tC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tC(e, t, r) {
  return t = rC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rC(e) {
  var t = nC(e, "string");
  return mi(t) == "symbol" ? t : t + "";
}
function nC(e, t) {
  if (mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gi() {
  return gi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gi.apply(this, arguments);
}
var iC = function(t) {
  var r = t.value, n = t.formatter, i = J(t.children) ? r : t.children;
  return G(n) ? n(i) : i;
}, aC = function(t, r) {
  var n = Me(r - t), i = Math.min(Math.abs(r - t), 360);
  return n * i;
}, oC = function(t, r, n) {
  var i = t.position, a = t.viewBox, o = t.offset, u = t.className, c = a, s = c.cx, f = c.cy, l = c.innerRadius, p = c.outerRadius, d = c.startAngle, y = c.endAngle, v = c.clockWise, h = (l + p) / 2, g = aC(d, y), b = g >= 0 ? 1 : -1, O, w;
  i === "insideStart" ? (O = d + b * o, w = v) : i === "insideEnd" ? (O = y - b * o, w = !v) : i === "end" && (O = y + b * o, w = v), w = g <= 0 ? w : !w;
  var m = ne(s, f, h, O), x = ne(s, f, h, O + (w ? 1 : -1) * 359), _ = "M".concat(m.x, ",").concat(m.y, `
    A`).concat(h, ",").concat(h, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(x.x, ",").concat(x.y), P = J(t.id) ? Ar("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ A.createElement("text", gi({}, n, {
    dominantBaseline: "central",
    className: Y("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("path", {
    id: P,
    d: _
  })), /* @__PURE__ */ A.createElement("textPath", {
    xlinkHref: "#".concat(P)
  }, r));
}, uC = function(t) {
  var r = t.viewBox, n = t.offset, i = t.position, a = r, o = a.cx, u = a.cy, c = a.innerRadius, s = a.outerRadius, f = a.startAngle, l = a.endAngle, p = (f + l) / 2;
  if (i === "outside") {
    var d = ne(o, u, s + n, p), y = d.x, v = d.y;
    return {
      x: y,
      y: v,
      textAnchor: y >= o ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (i === "center")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (i === "centerTop")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (i === "centerBottom")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var h = (c + s) / 2, g = ne(o, u, h, p), b = g.x, O = g.y;
  return {
    x: b,
    y: O,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, cC = function(t) {
  var r = t.viewBox, n = t.parentViewBox, i = t.offset, a = t.position, o = r, u = o.x, c = o.y, s = o.width, f = o.height, l = f >= 0 ? 1 : -1, p = l * i, d = l > 0 ? "end" : "start", y = l > 0 ? "start" : "end", v = s >= 0 ? 1 : -1, h = v * i, g = v > 0 ? "end" : "start", b = v > 0 ? "start" : "end";
  if (a === "top") {
    var O = {
      x: u + s / 2,
      y: c - l * i,
      textAnchor: "middle",
      verticalAnchor: d
    };
    return Pe(Pe({}, O), n ? {
      height: Math.max(c - n.y, 0),
      width: s
    } : {});
  }
  if (a === "bottom") {
    var w = {
      x: u + s / 2,
      y: c + f + p,
      textAnchor: "middle",
      verticalAnchor: y
    };
    return Pe(Pe({}, w), n ? {
      height: Math.max(n.y + n.height - (c + f), 0),
      width: s
    } : {});
  }
  if (a === "left") {
    var m = {
      x: u - h,
      y: c + f / 2,
      textAnchor: g,
      verticalAnchor: "middle"
    };
    return Pe(Pe({}, m), n ? {
      width: Math.max(m.x - n.x, 0),
      height: f
    } : {});
  }
  if (a === "right") {
    var x = {
      x: u + s + h,
      y: c + f / 2,
      textAnchor: b,
      verticalAnchor: "middle"
    };
    return Pe(Pe({}, x), n ? {
      width: Math.max(n.x + n.width - x.x, 0),
      height: f
    } : {});
  }
  var _ = n ? {
    width: s,
    height: f
  } : {};
  return a === "insideLeft" ? Pe({
    x: u + h,
    y: c + f / 2,
    textAnchor: b,
    verticalAnchor: "middle"
  }, _) : a === "insideRight" ? Pe({
    x: u + s - h,
    y: c + f / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, _) : a === "insideTop" ? Pe({
    x: u + s / 2,
    y: c + p,
    textAnchor: "middle",
    verticalAnchor: y
  }, _) : a === "insideBottom" ? Pe({
    x: u + s / 2,
    y: c + f - p,
    textAnchor: "middle",
    verticalAnchor: d
  }, _) : a === "insideTopLeft" ? Pe({
    x: u + h,
    y: c + p,
    textAnchor: b,
    verticalAnchor: y
  }, _) : a === "insideTopRight" ? Pe({
    x: u + s - h,
    y: c + p,
    textAnchor: g,
    verticalAnchor: y
  }, _) : a === "insideBottomLeft" ? Pe({
    x: u + h,
    y: c + f - p,
    textAnchor: b,
    verticalAnchor: d
  }, _) : a === "insideBottomRight" ? Pe({
    x: u + s - h,
    y: c + f - p,
    textAnchor: g,
    verticalAnchor: d
  }, _) : wn(a) && (L(a.x) || cr(a.x)) && (L(a.y) || cr(a.y)) ? Pe({
    x: u + Ne(a.x, s),
    y: c + Ne(a.y, f),
    textAnchor: "end",
    verticalAnchor: "end"
  }, _) : Pe({
    x: u + s / 2,
    y: c + f / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, _);
}, sC = function(t) {
  return "cx" in t && L(t.cx);
};
function $e(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = QM(e, GM), i = Pe({
    offset: r
  }, n), a = i.viewBox, o = i.position, u = i.value, c = i.children, s = i.content, f = i.className, l = f === void 0 ? "" : f, p = i.textBreakAll;
  if (!a || J(u) && J(c) && !/* @__PURE__ */ D.isValidElement(s) && !G(s))
    return null;
  if (/* @__PURE__ */ D.isValidElement(s))
    return /* @__PURE__ */ D.cloneElement(s, i);
  var d;
  if (G(s)) {
    if (d = /* @__PURE__ */ D.createElement(s, i), /* @__PURE__ */ D.isValidElement(d))
      return d;
  } else
    d = iC(i);
  var y = sC(a), v = K(i, !0);
  if (y && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return oC(i, d, v);
  var h = y ? uC(i) : cC(i);
  return /* @__PURE__ */ A.createElement(br, gi({
    className: Y("recharts-label", l)
  }, v, h, {
    breakAll: p
  }), d);
}
$e.displayName = "Label";
var uw = function(t) {
  var r = t.cx, n = t.cy, i = t.angle, a = t.startAngle, o = t.endAngle, u = t.r, c = t.radius, s = t.innerRadius, f = t.outerRadius, l = t.x, p = t.y, d = t.top, y = t.left, v = t.width, h = t.height, g = t.clockWise, b = t.labelViewBox;
  if (b)
    return b;
  if (L(v) && L(h)) {
    if (L(l) && L(p))
      return {
        x: l,
        y: p,
        width: v,
        height: h
      };
    if (L(d) && L(y))
      return {
        x: d,
        y,
        width: v,
        height: h
      };
  }
  return L(l) && L(p) ? {
    x: l,
    y: p,
    width: 0,
    height: 0
  } : L(r) && L(n) ? {
    cx: r,
    cy: n,
    startAngle: a || i || 0,
    endAngle: o || i || 0,
    innerRadius: s || 0,
    outerRadius: f || c || u || 0,
    clockWise: g
  } : t.viewBox ? t.viewBox : {};
}, lC = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ A.createElement($e, {
    key: "label-implicit",
    viewBox: r
  }) : Se(t) ? /* @__PURE__ */ A.createElement($e, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ D.isValidElement(t) ? t.type === $e ? /* @__PURE__ */ D.cloneElement(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ A.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : G(t) ? /* @__PURE__ */ A.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : wn(t) ? /* @__PURE__ */ A.createElement($e, gi({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, fC = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var i = t.children, a = uw(t), o = We(i, $e).map(function(c, s) {
    return /* @__PURE__ */ D.cloneElement(c, {
      viewBox: r || a,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(s)
    });
  });
  if (!n)
    return o;
  var u = lC(t.label, r || a);
  return [u].concat(VM(o));
};
$e.parseViewBox = uw;
$e.renderCallByParent = fC;
var _l, Ng;
function pC() {
  if (Ng) return _l;
  Ng = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return _l = e, _l;
}
var hC = pC();
const cw = /* @__PURE__ */ ue(hC);
function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bi(e);
}
var dC = ["valueAccessor"], vC = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function yC(e) {
  return xC(e) || bC(e) || gC(e) || mC();
}
function mC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gC(e, t) {
  if (e) {
    if (typeof e == "string") return Ff(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ff(e, t);
  }
}
function bC(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function xC(e) {
  if (Array.isArray(e)) return Ff(e);
}
function Ff(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Ba() {
  return Ba = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ba.apply(this, arguments);
}
function Lg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lg(Object(r), !0).forEach(function(n) {
      OC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OC(e, t, r) {
  return t = wC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wC(e) {
  var t = _C(e, "string");
  return bi(t) == "symbol" ? t : t + "";
}
function _C(e, t) {
  if (bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bg(e, t) {
  if (e == null) return {};
  var r = AC(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function AC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var PC = function(t) {
  return Array.isArray(t.value) ? cw(t.value) : t.value;
};
function rt(e) {
  var t = e.valueAccessor, r = t === void 0 ? PC : t, n = Bg(e, dC), i = n.data, a = n.dataKey, o = n.clockWise, u = n.id, c = n.textBreakAll, s = Bg(n, vC);
  return !i || !i.length ? null : /* @__PURE__ */ A.createElement(Q, {
    className: "recharts-label-list"
  }, i.map(function(f, l) {
    var p = J(a) ? r(f, l) : ve(f && f.payload, a), d = J(u) ? {} : {
      id: "".concat(u, "-").concat(l)
    };
    return /* @__PURE__ */ A.createElement($e, Ba({}, K(f, !0), s, d, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: c,
      viewBox: $e.parseViewBox(J(o) ? f : qg(qg({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(l),
      index: l
    }));
  }));
}
rt.displayName = "LabelList";
function SC(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ A.createElement(rt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ A.isValidElement(e) || G(e) ? /* @__PURE__ */ A.createElement(rt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : wn(e) ? /* @__PURE__ */ A.createElement(rt, Ba({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function jC(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, i = We(n, rt).map(function(o, u) {
    return /* @__PURE__ */ D.cloneElement(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(u)
    });
  });
  if (!r)
    return i;
  var a = SC(e.label, t);
  return [a].concat(yC(i));
}
rt.renderCallByParent = jC;
function xi(e) {
  "@babel/helpers - typeof";
  return xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xi(e);
}
function Wf() {
  return Wf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wf.apply(this, arguments);
}
function Fg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fg(Object(r), !0).forEach(function(n) {
      EC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EC(e, t, r) {
  return t = TC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function TC(e) {
  var t = $C(e, "string");
  return xi(t) == "symbol" ? t : t + "";
}
function $C(e, t) {
  if (xi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var MC = function(t, r) {
  var n = Me(r - t), i = Math.min(Math.abs(r - t), 359.999);
  return n * i;
}, ia = function(t) {
  var r = t.cx, n = t.cy, i = t.radius, a = t.angle, o = t.sign, u = t.isExternal, c = t.cornerRadius, s = t.cornerIsExternal, f = c * (u ? 1 : -1) + i, l = Math.asin(c / f) / qa, p = s ? a : a + o * l, d = ne(r, n, f, p), y = ne(r, n, i, p), v = s ? a - o * l : a, h = ne(r, n, f * Math.cos(l * qa), v);
  return {
    center: d,
    circleTangency: y,
    lineTangency: h,
    theta: l
  };
}, sw = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.startAngle, u = t.endAngle, c = MC(o, u), s = o + c, f = ne(r, n, a, o), l = ne(r, n, a, s), p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(a, ",").concat(a, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
  if (i > 0) {
    var d = ne(r, n, i, o), y = ne(r, n, i, s);
    p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(d.x, ",").concat(d.y, " Z");
  } else
    p += "L ".concat(r, ",").concat(n, " Z");
  return p;
}, CC = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, c = t.cornerIsExternal, s = t.startAngle, f = t.endAngle, l = Me(f - s), p = ia({
    cx: r,
    cy: n,
    radius: a,
    angle: s,
    sign: l,
    cornerRadius: o,
    cornerIsExternal: c
  }), d = p.circleTangency, y = p.lineTangency, v = p.theta, h = ia({
    cx: r,
    cy: n,
    radius: a,
    angle: f,
    sign: -l,
    cornerRadius: o,
    cornerIsExternal: c
  }), g = h.circleTangency, b = h.lineTangency, O = h.theta, w = c ? Math.abs(s - f) : Math.abs(s - f) - v - O;
  if (w < 0)
    return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : sw({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: a,
      startAngle: s,
      endAngle: f
    });
  var m = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(d.x, ",").concat(d.y, `
    A`).concat(a, ",").concat(a, ",0,").concat(+(w > 180), ",").concat(+(l < 0), ",").concat(g.x, ",").concat(g.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(b.x, ",").concat(b.y, `
  `);
  if (i > 0) {
    var x = ia({
      cx: r,
      cy: n,
      radius: i,
      angle: s,
      sign: l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), _ = x.circleTangency, P = x.lineTangency, S = x.theta, T = ia({
      cx: r,
      cy: n,
      radius: i,
      angle: f,
      sign: -l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), E = T.circleTangency, j = T.lineTangency, $ = T.theta, C = c ? Math.abs(s - f) : Math.abs(s - f) - S - $;
    if (C < 0 && o === 0)
      return "".concat(m, "L").concat(r, ",").concat(n, "Z");
    m += "L".concat(j.x, ",").concat(j.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(E.x, ",").concat(E.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(C > 180), ",").concat(+(l > 0), ",").concat(_.x, ",").concat(_.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(P.x, ",").concat(P.y, "Z");
  } else
    m += "L".concat(r, ",").concat(n, "Z");
  return m;
}, IC = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, lw = function(t) {
  var r = Wg(Wg({}, IC), t), n = r.cx, i = r.cy, a = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, c = r.forceCornerRadius, s = r.cornerIsExternal, f = r.startAngle, l = r.endAngle, p = r.className;
  if (o < a || f === l)
    return null;
  var d = Y("recharts-sector", p), y = o - a, v = Ne(u, y, 0, !0), h;
  return v > 0 && Math.abs(f - l) < 360 ? h = CC({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    cornerRadius: Math.min(v, y / 2),
    forceCornerRadius: c,
    cornerIsExternal: s,
    startAngle: f,
    endAngle: l
  }) : h = sw({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    startAngle: f,
    endAngle: l
  }), /* @__PURE__ */ A.createElement("path", Wf({}, K(r, !0), {
    className: d,
    d: h,
    role: "img"
  }));
};
function Oi(e) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Oi(e);
}
function zf() {
  return zf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zf.apply(this, arguments);
}
function zg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ug(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zg(Object(r), !0).forEach(function(n) {
      kC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kC(e, t, r) {
  return t = RC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RC(e) {
  var t = DC(e, "string");
  return Oi(t) == "symbol" ? t : t + "";
}
function DC(e, t) {
  if (Oi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Oi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Kg = {
  curveBasisClosed: o1,
  curveBasisOpen: u1,
  curveBasis: a1,
  curveBumpX: KA,
  curveBumpY: HA,
  curveLinearClosed: c1,
  curveLinear: Ao,
  curveMonotoneX: s1,
  curveMonotoneY: l1,
  curveNatural: f1,
  curveStep: p1,
  curveStepAfter: d1,
  curveStepBefore: h1
}, aa = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Bn = function(t) {
  return t.x;
}, Fn = function(t) {
  return t.y;
}, NC = function(t, r) {
  if (G(t))
    return t;
  var n = "curve".concat(wo(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? Kg["".concat(n).concat(r === "vertical" ? "Y" : "X")] : Kg[n] || Ao;
}, LC = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, i = t.points, a = i === void 0 ? [] : i, o = t.baseLine, u = t.layout, c = t.connectNulls, s = c === void 0 ? !1 : c, f = NC(n, u), l = s ? a.filter(function(v) {
    return aa(v);
  }) : a, p;
  if (Array.isArray(o)) {
    var d = s ? o.filter(function(v) {
      return aa(v);
    }) : o, y = l.map(function(v, h) {
      return Ug(Ug({}, v), {}, {
        base: d[h]
      });
    });
    return u === "vertical" ? p = Yi().y(Fn).x1(Bn).x0(function(v) {
      return v.base.x;
    }) : p = Yi().x(Bn).y1(Fn).y0(function(v) {
      return v.base.y;
    }), p.defined(aa).curve(f), p(y);
  }
  return u === "vertical" && L(o) ? p = Yi().y(Fn).x1(Bn).x0(o) : L(o) ? p = Yi().x(Bn).y1(Fn).y0(o) : p = ox().x(Bn).y(Fn), p.defined(aa).curve(f), p(l);
}, yr = function(t) {
  var r = t.className, n = t.points, i = t.path, a = t.pathRef;
  if ((!n || !n.length) && !i)
    return null;
  var o = n && n.length ? LC(t) : i;
  return /* @__PURE__ */ D.createElement("path", zf({}, K(t, !1), fa(t), {
    className: Y("recharts-curve", r),
    d: o,
    ref: a
  }));
}, Al = { exports: {} }, Pl, Hg;
function qC() {
  if (Hg) return Pl;
  Hg = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Pl = e, Pl;
}
var Sl, Gg;
function BC() {
  if (Gg) return Sl;
  Gg = 1;
  var e = /* @__PURE__ */ qC();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Sl = function() {
    function n(o, u, c, s, f, l) {
      if (l !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    n.isRequired = n;
    function i() {
      return n;
    }
    var a = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: i,
      element: n,
      elementType: n,
      instanceOf: i,
      node: n,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, Sl;
}
var Vg;
function FC() {
  return Vg || (Vg = 1, Al.exports = /* @__PURE__ */ BC()()), Al.exports;
}
var WC = /* @__PURE__ */ FC();
const oe = /* @__PURE__ */ ue(WC), { getOwnPropertyNames: zC, getOwnPropertySymbols: UC } = Object, { hasOwnProperty: KC } = Object.prototype;
function jl(e, t) {
  return function(n, i, a) {
    return e(n, i, a) && t(n, i, a);
  };
}
function oa(e) {
  return function(r, n, i) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, i);
    const { cache: a } = i, o = a.get(r), u = a.get(n);
    if (o && u)
      return o === n && u === r;
    a.set(r, n), a.set(n, r);
    const c = e(r, n, i);
    return a.delete(r), a.delete(n), c;
  };
}
function HC(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function Xg(e) {
  return zC(e).concat(UC(e));
}
const GC = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => KC.call(e, t))
);
function jr(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const VC = "__v", XC = "__o", YC = "_owner", { getOwnPropertyDescriptor: Yg, keys: Zg } = Object;
function ZC(e, t) {
  return e.byteLength === t.byteLength && Fa(new Uint8Array(e), new Uint8Array(t));
}
function JC(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function QC(e, t) {
  return e.byteLength === t.byteLength && Fa(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function eI(e, t) {
  return jr(e.getTime(), t.getTime());
}
function tI(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function rI(e, t) {
  return e === t;
}
function Jg(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const i = new Array(n), a = e.entries();
  let o, u, c = 0;
  for (; (o = a.next()) && !o.done; ) {
    const s = t.entries();
    let f = !1, l = 0;
    for (; (u = s.next()) && !u.done; ) {
      if (i[l]) {
        l++;
        continue;
      }
      const p = o.value, d = u.value;
      if (r.equals(p[0], d[0], c, l, e, t, r) && r.equals(p[1], d[1], p[0], d[0], e, t, r)) {
        f = i[l] = !0;
        break;
      }
      l++;
    }
    if (!f)
      return !1;
    c++;
  }
  return !0;
}
const nI = jr;
function iI(e, t, r) {
  const n = Zg(e);
  let i = n.length;
  if (Zg(t).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!fw(e, t, r, n[i]))
      return !1;
  return !0;
}
function Wn(e, t, r) {
  const n = Xg(e);
  let i = n.length;
  if (Xg(t).length !== i)
    return !1;
  let a, o, u;
  for (; i-- > 0; )
    if (a = n[i], !fw(e, t, r, a) || (o = Yg(e, a), u = Yg(t, a), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function aI(e, t) {
  return jr(e.valueOf(), t.valueOf());
}
function oI(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Qg(e, t, r) {
  const n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  const i = new Array(n), a = e.values();
  let o, u;
  for (; (o = a.next()) && !o.done; ) {
    const c = t.values();
    let s = !1, f = 0;
    for (; (u = c.next()) && !u.done; ) {
      if (!i[f] && r.equals(o.value, u.value, o.value, u.value, e, t, r)) {
        s = i[f] = !0;
        break;
      }
      f++;
    }
    if (!s)
      return !1;
  }
  return !0;
}
function Fa(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function uI(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function fw(e, t, r, n) {
  return (n === YC || n === XC || n === VC) && (e.$$typeof || t.$$typeof) ? !0 : GC(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const cI = "[object ArrayBuffer]", sI = "[object Arguments]", lI = "[object Boolean]", fI = "[object DataView]", pI = "[object Date]", hI = "[object Error]", dI = "[object Map]", vI = "[object Number]", yI = "[object Object]", mI = "[object RegExp]", gI = "[object Set]", bI = "[object String]", xI = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, OI = "[object URL]", wI = Object.prototype.toString;
function _I({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: i, areFunctionsEqual: a, areMapsEqual: o, areNumbersEqual: u, areObjectsEqual: c, arePrimitiveWrappersEqual: s, areRegExpsEqual: f, areSetsEqual: l, areTypedArraysEqual: p, areUrlsEqual: d, unknownTagComparators: y }) {
  return function(h, g, b) {
    if (h === g)
      return !0;
    if (h == null || g == null)
      return !1;
    const O = typeof h;
    if (O !== typeof g)
      return !1;
    if (O !== "object")
      return O === "number" ? u(h, g, b) : O === "function" ? a(h, g, b) : !1;
    const w = h.constructor;
    if (w !== g.constructor)
      return !1;
    if (w === Object)
      return c(h, g, b);
    if (Array.isArray(h))
      return t(h, g, b);
    if (w === Date)
      return n(h, g, b);
    if (w === RegExp)
      return f(h, g, b);
    if (w === Map)
      return o(h, g, b);
    if (w === Set)
      return l(h, g, b);
    const m = wI.call(h);
    if (m === pI)
      return n(h, g, b);
    if (m === mI)
      return f(h, g, b);
    if (m === dI)
      return o(h, g, b);
    if (m === gI)
      return l(h, g, b);
    if (m === yI)
      return typeof h.then != "function" && typeof g.then != "function" && c(h, g, b);
    if (m === OI)
      return d(h, g, b);
    if (m === hI)
      return i(h, g, b);
    if (m === sI)
      return c(h, g, b);
    if (xI[m])
      return p(h, g, b);
    if (m === cI)
      return e(h, g, b);
    if (m === fI)
      return r(h, g, b);
    if (m === lI || m === vI || m === bI)
      return s(h, g, b);
    if (y) {
      let x = y[m];
      if (!x) {
        const _ = HC(h);
        _ && (x = y[_]);
      }
      if (x)
        return x(h, g, b);
    }
    return !1;
  };
}
function AI({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: ZC,
    areArraysEqual: r ? Wn : JC,
    areDataViewsEqual: QC,
    areDatesEqual: eI,
    areErrorsEqual: tI,
    areFunctionsEqual: rI,
    areMapsEqual: r ? jl(Jg, Wn) : Jg,
    areNumbersEqual: nI,
    areObjectsEqual: r ? Wn : iI,
    arePrimitiveWrappersEqual: aI,
    areRegExpsEqual: oI,
    areSetsEqual: r ? jl(Qg, Wn) : Qg,
    areTypedArraysEqual: r ? jl(Fa, Wn) : Fa,
    areUrlsEqual: uI,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const i = oa(n.areArraysEqual), a = oa(n.areMapsEqual), o = oa(n.areObjectsEqual), u = oa(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: a,
      areObjectsEqual: o,
      areSetsEqual: u
    });
  }
  return n;
}
function PI(e) {
  return function(t, r, n, i, a, o, u) {
    return e(t, r, u);
  };
}
function SI({ circular: e, comparator: t, createState: r, equals: n, strict: i }) {
  if (r)
    return function(u, c) {
      const { cache: s = e ? /* @__PURE__ */ new WeakMap() : void 0, meta: f } = r();
      return t(u, c, {
        cache: s,
        equals: n,
        meta: f,
        strict: i
      });
    };
  if (e)
    return function(u, c) {
      return t(u, c, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: i
      });
    };
  const a = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: i
  };
  return function(u, c) {
    return t(u, c, a);
  };
}
const jI = Zt();
Zt({ strict: !0 });
Zt({ circular: !0 });
Zt({
  circular: !0,
  strict: !0
});
Zt({
  createInternalComparator: () => jr
});
Zt({
  strict: !0,
  createInternalComparator: () => jr
});
Zt({
  circular: !0,
  createInternalComparator: () => jr
});
Zt({
  circular: !0,
  createInternalComparator: () => jr,
  strict: !0
});
function Zt(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: i = !1 } = e, a = AI(e), o = _I(a), u = r ? r(o) : PI(o);
  return SI({ circular: t, comparator: o, createState: n, equals: u, strict: i });
}
function EI(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function eb(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function i(a) {
    r < 0 && (r = a), a - r > t ? (e(a), r = -1) : EI(i);
  };
  requestAnimationFrame(n);
}
function Uf(e) {
  "@babel/helpers - typeof";
  return Uf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Uf(e);
}
function TI(e) {
  return II(e) || CI(e) || MI(e) || $I();
}
function $I() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function MI(e, t) {
  if (e) {
    if (typeof e == "string") return tb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return tb(e, t);
  }
}
function tb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function CI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function II(e) {
  if (Array.isArray(e)) return e;
}
function kI() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function i(a) {
    if (!r) {
      if (Array.isArray(a)) {
        if (!a.length)
          return;
        var o = a, u = TI(o), c = u[0], s = u.slice(1);
        if (typeof c == "number") {
          eb(i.bind(null, s), c);
          return;
        }
        i(c), eb(i.bind(null, s));
        return;
      }
      Uf(a) === "object" && (e = a, t(e)), typeof a == "function" && a();
    }
  };
  return {
    stop: function() {
      r = !0;
    },
    start: function(a) {
      r = !1, n(a);
    },
    subscribe: function(a) {
      return t = a, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wi(e);
}
function rb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rb(Object(r), !0).forEach(function(n) {
      pw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pw(e, t, r) {
  return t = RI(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RI(e) {
  var t = DI(e, "string");
  return wi(t) === "symbol" ? t : String(t);
}
function DI(e, t) {
  if (wi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var NI = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
    return n.filter(function(a) {
      return i.includes(a);
    });
  });
}, LI = function(t) {
  return t;
}, qI = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Yn = function(t, r) {
  return Object.keys(r).reduce(function(n, i) {
    return nb(nb({}, n), {}, pw({}, i, t(i, r[i])));
  }, {});
}, ib = function(t, r, n) {
  return t.map(function(i) {
    return "".concat(qI(i), " ").concat(r, "ms ").concat(n);
  }).join(",");
};
function BI(e, t) {
  return zI(e) || WI(e, t) || hw(e, t) || FI();
}
function FI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function WI(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function zI(e) {
  if (Array.isArray(e)) return e;
}
function UI(e) {
  return GI(e) || HI(e) || hw(e) || KI();
}
function KI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hw(e, t) {
  if (e) {
    if (typeof e == "string") return Kf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kf(e, t);
  }
}
function HI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function GI(e) {
  if (Array.isArray(e)) return Kf(e);
}
function Kf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Wa = 1e-4, dw = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, vw = function(t, r) {
  return t.map(function(n, i) {
    return n * Math.pow(r, i);
  }).reduce(function(n, i) {
    return n + i;
  });
}, ab = function(t, r) {
  return function(n) {
    var i = dw(t, r);
    return vw(i, n);
  };
}, VI = function(t, r) {
  return function(n) {
    var i = dw(t, r), a = [].concat(UI(i.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return vw(a, n);
  };
}, ob = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r[0], a = r[1], o = r[2], u = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        i = 0, a = 0, o = 1, u = 1;
        break;
      case "ease":
        i = 0.25, a = 0.1, o = 0.25, u = 1;
        break;
      case "ease-in":
        i = 0.42, a = 0, o = 1, u = 1;
        break;
      case "ease-out":
        i = 0.42, a = 0, o = 0.58, u = 1;
        break;
      case "ease-in-out":
        i = 0, a = 0, o = 0.58, u = 1;
        break;
      default: {
        var c = r[0].split("(");
        if (c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4) {
          var s = c[1].split(")")[0].split(",").map(function(h) {
            return parseFloat(h);
          }), f = BI(s, 4);
          i = f[0], a = f[1], o = f[2], u = f[3];
        }
      }
    }
  var l = ab(i, o), p = ab(a, u), d = VI(i, o), y = function(g) {
    return g > 1 ? 1 : g < 0 ? 0 : g;
  }, v = function(g) {
    for (var b = g > 1 ? 1 : g, O = b, w = 0; w < 8; ++w) {
      var m = l(O) - b, x = d(O);
      if (Math.abs(m - b) < Wa || x < Wa)
        return p(O);
      O = y(O - m / x);
    }
    return p(O);
  };
  return v.isStepper = !1, v;
}, XI = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, i = t.damping, a = i === void 0 ? 8 : i, o = t.dt, u = o === void 0 ? 17 : o, c = function(f, l, p) {
    var d = -(f - l) * n, y = p * a, v = p + (d - y) * u / 1e3, h = p * u / 1e3 + f;
    return Math.abs(h - l) < Wa && Math.abs(v) < Wa ? [l, 0] : [h, v];
  };
  return c.isStepper = !0, c.dt = u, c;
}, YI = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r[0];
  if (typeof i == "string")
    switch (i) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return ob(i);
      case "spring":
        return XI();
      default:
        if (i.split("(")[0] === "cubic-bezier")
          return ob(i);
    }
  return typeof i == "function" ? i : null;
};
function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _i(e);
}
function ub(e) {
  return QI(e) || JI(e) || yw(e) || ZI();
}
function ZI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function JI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function QI(e) {
  if (Array.isArray(e)) return Gf(e);
}
function cb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cb(Object(r), !0).forEach(function(n) {
      Hf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Hf(e, t, r) {
  return t = ek(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ek(e) {
  var t = tk(e, "string");
  return _i(t) === "symbol" ? t : String(t);
}
function tk(e, t) {
  if (_i(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_i(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rk(e, t) {
  return ak(e) || ik(e, t) || yw(e, t) || nk();
}
function nk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yw(e, t) {
  if (e) {
    if (typeof e == "string") return Gf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Gf(e, t);
  }
}
function Gf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ik(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function ak(e) {
  if (Array.isArray(e)) return e;
}
var za = function(t, r, n) {
  return t + (r - t) * n;
}, Vf = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, ok = function e(t, r, n) {
  var i = Yn(function(a, o) {
    if (Vf(o)) {
      var u = t(o.from, o.to, o.velocity), c = rk(u, 2), s = c[0], f = c[1];
      return Ie(Ie({}, o), {}, {
        from: s,
        velocity: f
      });
    }
    return o;
  }, r);
  return n < 1 ? Yn(function(a, o) {
    return Vf(o) ? Ie(Ie({}, o), {}, {
      velocity: za(o.velocity, i[a].velocity, n),
      from: za(o.from, i[a].from, n)
    }) : o;
  }, r) : e(t, i, n - 1);
};
const uk = (function(e, t, r, n, i) {
  var a = NI(e, t), o = a.reduce(function(h, g) {
    return Ie(Ie({}, h), {}, Hf({}, g, [e[g], t[g]]));
  }, {}), u = a.reduce(function(h, g) {
    return Ie(Ie({}, h), {}, Hf({}, g, {
      from: e[g],
      velocity: 0,
      to: t[g]
    }));
  }, {}), c = -1, s, f, l = function() {
    return null;
  }, p = function() {
    return Yn(function(g, b) {
      return b.from;
    }, u);
  }, d = function() {
    return !Object.values(u).filter(Vf).length;
  }, y = function(g) {
    s || (s = g);
    var b = g - s, O = b / r.dt;
    u = ok(r, u, O), i(Ie(Ie(Ie({}, e), t), p())), s = g, d() || (c = requestAnimationFrame(l));
  }, v = function(g) {
    f || (f = g);
    var b = (g - f) / n, O = Yn(function(m, x) {
      return za.apply(void 0, ub(x).concat([r(b)]));
    }, o);
    if (i(Ie(Ie(Ie({}, e), t), O)), b < 1)
      c = requestAnimationFrame(l);
    else {
      var w = Yn(function(m, x) {
        return za.apply(void 0, ub(x).concat([r(1)]));
      }, o);
      i(Ie(Ie(Ie({}, e), t), w));
    }
  };
  return l = r.isStepper ? y : v, function() {
    return requestAnimationFrame(l), function() {
      cancelAnimationFrame(c);
    };
  };
});
function tn(e) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tn(e);
}
var ck = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function sk(e, t) {
  if (e == null) return {};
  var r = lk(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function lk(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function El(e) {
  return dk(e) || hk(e) || pk(e) || fk();
}
function fk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pk(e, t) {
  if (e) {
    if (typeof e == "string") return Xf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xf(e, t);
  }
}
function hk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function dk(e) {
  if (Array.isArray(e)) return Xf(e);
}
function Xf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function sb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sb(Object(r), !0).forEach(function(n) {
      Hn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Hn(e, t, r) {
  return t = mw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vk(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yk(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, mw(n.key), n);
  }
}
function mk(e, t, r) {
  return t && yk(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function mw(e) {
  var t = gk(e, "string");
  return tn(t) === "symbol" ? t : String(t);
}
function gk(e, t) {
  if (tn(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (tn(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yf(e, t);
}
function Yf(e, t) {
  return Yf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Yf(e, t);
}
function xk(e) {
  var t = Ok();
  return function() {
    var n = Ua(e), i;
    if (t) {
      var a = Ua(this).constructor;
      i = Reflect.construct(n, arguments, a);
    } else
      i = n.apply(this, arguments);
    return Zf(this, i);
  };
}
function Zf(e, t) {
  if (t && (tn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Jf(e);
}
function Jf(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ok() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ua(e) {
  return Ua = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ua(e);
}
var Ye = /* @__PURE__ */ (function(e) {
  bk(r, e);
  var t = xk(r);
  function r(n, i) {
    var a;
    vk(this, r), a = t.call(this, n, i);
    var o = a.props, u = o.isActive, c = o.attributeName, s = o.from, f = o.to, l = o.steps, p = o.children, d = o.duration;
    if (a.handleStyleChange = a.handleStyleChange.bind(Jf(a)), a.changeStyle = a.changeStyle.bind(Jf(a)), !u || d <= 0)
      return a.state = {
        style: {}
      }, typeof p == "function" && (a.state = {
        style: f
      }), Zf(a);
    if (l && l.length)
      a.state = {
        style: l[0].style
      };
    else if (s) {
      if (typeof p == "function")
        return a.state = {
          style: s
        }, Zf(a);
      a.state = {
        style: c ? Hn({}, c, s) : s
      };
    } else
      a.state = {
        style: {}
      };
    return a;
  }
  return mk(r, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.isActive, o = i.canBegin;
      this.mounted = !0, !(!a || !o) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(i) {
      var a = this.props, o = a.isActive, u = a.canBegin, c = a.attributeName, s = a.shouldReAnimate, f = a.to, l = a.from, p = this.state.style;
      if (u) {
        if (!o) {
          var d = {
            style: c ? Hn({}, c, f) : f
          };
          this.state && p && (c && p[c] !== f || !c && p !== f) && this.setState(d);
          return;
        }
        if (!(jI(i.to, f) && i.canBegin && i.isActive)) {
          var y = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var v = y || s ? l : i.to;
          if (this.state && p) {
            var h = {
              style: c ? Hn({}, c, v) : v
            };
            (c && p[c] !== v || !c && p !== v) && this.setState(h);
          }
          this.runAnimation(at(at({}, this.props), {}, {
            from: v,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var i = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), i && i();
    }
  }, {
    key: "handleStyleChange",
    value: function(i) {
      this.changeStyle(i);
    }
  }, {
    key: "changeStyle",
    value: function(i) {
      this.mounted && this.setState({
        style: i
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(i) {
      var a = this, o = i.from, u = i.to, c = i.duration, s = i.easing, f = i.begin, l = i.onAnimationEnd, p = i.onAnimationStart, d = uk(o, u, YI(s), c, this.changeStyle), y = function() {
        a.stopJSAnimation = d();
      };
      this.manager.start([p, f, y, c, l]);
    }
  }, {
    key: "runStepAnimation",
    value: function(i) {
      var a = this, o = i.steps, u = i.begin, c = i.onAnimationStart, s = o[0], f = s.style, l = s.duration, p = l === void 0 ? 0 : l, d = function(v, h, g) {
        if (g === 0)
          return v;
        var b = h.duration, O = h.easing, w = O === void 0 ? "ease" : O, m = h.style, x = h.properties, _ = h.onAnimationEnd, P = g > 0 ? o[g - 1] : h, S = x || Object.keys(m);
        if (typeof w == "function" || w === "spring")
          return [].concat(El(v), [a.runJSAnimation.bind(a, {
            from: P.style,
            to: m,
            duration: b,
            easing: w
          }), b]);
        var T = ib(S, b, w), E = at(at(at({}, P.style), m), {}, {
          transition: T
        });
        return [].concat(El(v), [E, b, _]).filter(LI);
      };
      return this.manager.start([c].concat(El(o.reduce(d, [f, Math.max(p, u)])), [i.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = kI());
      var a = i.begin, o = i.duration, u = i.attributeName, c = i.to, s = i.easing, f = i.onAnimationStart, l = i.onAnimationEnd, p = i.steps, d = i.children, y = this.manager;
      if (this.unSubscribe = y.subscribe(this.handleStyleChange), typeof s == "function" || typeof d == "function" || s === "spring") {
        this.runJSAnimation(i);
        return;
      }
      if (p.length > 1) {
        this.runStepAnimation(i);
        return;
      }
      var v = u ? Hn({}, u, c) : c, h = ib(Object.keys(v), o, s);
      y.start([f, a, at(at({}, v), {}, {
        transition: h
      }), o, l]);
    }
  }, {
    key: "render",
    value: function() {
      var i = this.props, a = i.children;
      i.begin;
      var o = i.duration;
      i.attributeName, i.easing;
      var u = i.isActive;
      i.steps, i.from, i.to, i.canBegin, i.onAnimationEnd, i.shouldReAnimate, i.onAnimationReStart;
      var c = sk(i, ck), s = D.Children.count(a), f = this.state.style;
      if (typeof a == "function")
        return a(f);
      if (!u || s === 0 || o <= 0)
        return a;
      var l = function(d) {
        var y = d.props, v = y.style, h = v === void 0 ? {} : v, g = y.className, b = /* @__PURE__ */ D.cloneElement(d, at(at({}, c), {}, {
          style: at(at({}, h), f),
          className: g
        }));
        return b;
      };
      return s === 1 ? l(D.Children.only(a)) : /* @__PURE__ */ A.createElement("div", null, D.Children.map(a, function(p) {
        return l(p);
      }));
    }
  }]), r;
})(D.PureComponent);
Ye.displayName = "Animate";
Ye.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
Ye.propTypes = {
  from: oe.oneOfType([oe.object, oe.string]),
  to: oe.oneOfType([oe.object, oe.string]),
  attributeName: oe.string,
  // animation duration
  duration: oe.number,
  begin: oe.number,
  easing: oe.oneOfType([oe.string, oe.func]),
  steps: oe.arrayOf(oe.shape({
    duration: oe.number.isRequired,
    style: oe.object.isRequired,
    easing: oe.oneOfType([oe.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), oe.func]),
    // transition css properties(dash case), optional
    properties: oe.arrayOf("string"),
    onAnimationEnd: oe.func
  })),
  children: oe.oneOfType([oe.node, oe.func]),
  isActive: oe.bool,
  canBegin: oe.bool,
  onAnimationEnd: oe.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: oe.bool,
  onAnimationStart: oe.func,
  onAnimationReStart: oe.func
};
function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ai(e);
}
function Ka() {
  return Ka = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ka.apply(this, arguments);
}
function wk(e, t) {
  return Sk(e) || Pk(e, t) || Ak(e, t) || _k();
}
function _k() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ak(e, t) {
  if (e) {
    if (typeof e == "string") return lb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return lb(e, t);
  }
}
function lb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Pk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function Sk(e) {
  if (Array.isArray(e)) return e;
}
function fb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fb(Object(r), !0).forEach(function(n) {
      jk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function jk(e, t, r) {
  return t = Ek(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ek(e) {
  var t = Tk(e, "string");
  return Ai(t) == "symbol" ? t : t + "";
}
function Tk(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var hb = function(t, r, n, i, a) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2), u = i >= 0 ? 1 : -1, c = n >= 0 ? 1 : -1, s = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0, f;
  if (o > 0 && a instanceof Array) {
    for (var l = [0, 0, 0, 0], p = 0, d = 4; p < d; p++)
      l[p] = a[p] > o ? o : a[p];
    f = "M".concat(t, ",").concat(r + u * l[0]), l[0] > 0 && (f += "A ".concat(l[0], ",").concat(l[0], ",0,0,").concat(s, ",").concat(t + c * l[0], ",").concat(r)), f += "L ".concat(t + n - c * l[1], ",").concat(r), l[1] > 0 && (f += "A ".concat(l[1], ",").concat(l[1], ",0,0,").concat(s, `,
        `).concat(t + n, ",").concat(r + u * l[1])), f += "L ".concat(t + n, ",").concat(r + i - u * l[2]), l[2] > 0 && (f += "A ".concat(l[2], ",").concat(l[2], ",0,0,").concat(s, `,
        `).concat(t + n - c * l[2], ",").concat(r + i)), f += "L ".concat(t + c * l[3], ",").concat(r + i), l[3] > 0 && (f += "A ".concat(l[3], ",").concat(l[3], ",0,0,").concat(s, `,
        `).concat(t, ",").concat(r + i - u * l[3])), f += "Z";
  } else if (o > 0 && a === +a && a > 0) {
    var y = Math.min(o, a);
    f = "M ".concat(t, ",").concat(r + u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + c * y, ",").concat(r, `
            L `).concat(t + n - c * y, ",").concat(r, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + n, ",").concat(r + u * y, `
            L `).concat(t + n, ",").concat(r + i - u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + n - c * y, ",").concat(r + i, `
            L `).concat(t + c * y, ",").concat(r + i, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t, ",").concat(r + i - u * y, " Z");
  } else
    f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(i, " h ").concat(-n, " Z");
  return f;
}, $k = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, i = t.y, a = r.x, o = r.y, u = r.width, c = r.height;
  if (Math.abs(u) > 0 && Math.abs(c) > 0) {
    var s = Math.min(a, a + u), f = Math.max(a, a + u), l = Math.min(o, o + c), p = Math.max(o, o + c);
    return n >= s && n <= f && i >= l && i <= p;
  }
  return !1;
}, Mk = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, Sh = function(t) {
  var r = pb(pb({}, Mk), t), n = D.useRef(), i = D.useState(-1), a = wk(i, 2), o = a[0], u = a[1];
  D.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var w = n.current.getTotalLength();
        w && u(w);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.width, l = r.height, p = r.radius, d = r.className, y = r.animationEasing, v = r.animationDuration, h = r.animationBegin, g = r.isAnimationActive, b = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0)
    return null;
  var O = Y("recharts-rectangle", d);
  return b ? /* @__PURE__ */ A.createElement(Ye, {
    canBegin: o > 0,
    from: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    to: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    duration: v,
    animationEasing: y,
    isActive: b
  }, function(w) {
    var m = w.width, x = w.height, _ = w.x, P = w.y;
    return /* @__PURE__ */ A.createElement(Ye, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: h,
      duration: v,
      isActive: g,
      easing: y
    }, /* @__PURE__ */ A.createElement("path", Ka({}, K(r, !0), {
      className: O,
      d: hb(_, P, m, x, p),
      ref: n
    })));
  }) : /* @__PURE__ */ A.createElement("path", Ka({}, K(r, !0), {
    className: O,
    d: hb(c, s, f, l, p)
  }));
}, Ck = ["points", "className", "baseLinePoints", "connectNulls"];
function qr() {
  return qr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qr.apply(this, arguments);
}
function Ik(e, t) {
  if (e == null) return {};
  var r = kk(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function kk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function db(e) {
  return Lk(e) || Nk(e) || Dk(e) || Rk();
}
function Rk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Dk(e, t) {
  if (e) {
    if (typeof e == "string") return Qf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qf(e, t);
  }
}
function Nk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Lk(e) {
  if (Array.isArray(e)) return Qf(e);
}
function Qf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var vb = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, qk = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    vb(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), vb(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, Zn = function(t, r) {
  var n = qk(t);
  r && (n = [n.reduce(function(a, o) {
    return [].concat(db(a), db(o));
  }, [])]);
  var i = n.map(function(a) {
    return a.reduce(function(o, u, c) {
      return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(i, "Z") : i;
}, Bk = function(t, r, n) {
  var i = Zn(t, n);
  return "".concat(i.slice(-1) === "Z" ? i.slice(0, -1) : i, "L").concat(Zn(r.reverse(), n).slice(1));
}, gw = function(t) {
  var r = t.points, n = t.className, i = t.baseLinePoints, a = t.connectNulls, o = Ik(t, Ck);
  if (!r || !r.length)
    return null;
  var u = Y("recharts-polygon", n);
  if (i && i.length) {
    var c = o.stroke && o.stroke !== "none", s = Bk(r, i, a);
    return /* @__PURE__ */ A.createElement("g", {
      className: u
    }, /* @__PURE__ */ A.createElement("path", qr({}, K(o, !0), {
      fill: s.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: s
    })), c ? /* @__PURE__ */ A.createElement("path", qr({}, K(o, !0), {
      fill: "none",
      d: Zn(r, a)
    })) : null, c ? /* @__PURE__ */ A.createElement("path", qr({}, K(o, !0), {
      fill: "none",
      d: Zn(i, a)
    })) : null);
  }
  var f = Zn(r, a);
  return /* @__PURE__ */ A.createElement("path", qr({}, K(o, !0), {
    fill: f.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: f
  }));
};
function ep() {
  return ep = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ep.apply(this, arguments);
}
var En = function(t) {
  var r = t.cx, n = t.cy, i = t.r, a = t.className, o = Y("recharts-dot", a);
  return r === +r && n === +n && i === +i ? /* @__PURE__ */ D.createElement("circle", ep({}, K(t, !1), fa(t), {
    className: o,
    cx: r,
    cy: n,
    r: i
  })) : null;
};
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
}
var Fk = ["x", "y", "top", "left", "width", "height", "className"];
function tp() {
  return tp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, tp.apply(this, arguments);
}
function yb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wk(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yb(Object(r), !0).forEach(function(n) {
      zk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zk(e, t, r) {
  return t = Uk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Uk(e) {
  var t = Kk(e, "string");
  return Pi(t) == "symbol" ? t : t + "";
}
function Kk(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hk(e, t) {
  if (e == null) return {};
  var r = Gk(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Gk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Vk = function(t, r, n, i, a, o) {
  return "M".concat(t, ",").concat(a, "v").concat(i, "M").concat(o, ",").concat(r, "h").concat(n);
}, Xk = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.top, u = o === void 0 ? 0 : o, c = t.left, s = c === void 0 ? 0 : c, f = t.width, l = f === void 0 ? 0 : f, p = t.height, d = p === void 0 ? 0 : p, y = t.className, v = Hk(t, Fk), h = Wk({
    x: n,
    y: a,
    top: u,
    left: s,
    width: l,
    height: d
  }, v);
  return !L(n) || !L(a) || !L(l) || !L(d) || !L(u) || !L(s) ? null : /* @__PURE__ */ A.createElement("path", tp({}, K(h, !0), {
    className: Y("recharts-cross", y),
    d: Vk(n, a, l, d, u, s)
  }));
}, Yk = ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"];
function Si(e) {
  "@babel/helpers - typeof";
  return Si = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Si(e);
}
function Zk(e, t) {
  if (e == null) return {};
  var r = Jk(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Jk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function kt() {
  return kt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kt.apply(this, arguments);
}
function mb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ji(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mb(Object(r), !0).forEach(function(n) {
      Qk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Qk(e, t, r) {
  return t = eR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eR(e) {
  var t = tR(e, "string");
  return Si(t) == "symbol" ? t : t + "";
}
function tR(e, t) {
  if (Si(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Si(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var rR = function(t, r, n, i) {
  var a = "";
  return i.forEach(function(o, u) {
    var c = ne(r, n, t, o);
    u ? a += "L ".concat(c.x, ",").concat(c.y) : a += "M ".concat(c.x, ",").concat(c.y);
  }), a += "Z", a;
}, nR = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.polarAngles, u = t.radialLines;
  if (!o || !o.length || !u)
    return null;
  var c = ji({
    stroke: "#ccc"
  }, K(t, !1));
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-polar-grid-angle"
  }, o.map(function(s) {
    var f = ne(r, n, i, s), l = ne(r, n, a, s);
    return /* @__PURE__ */ A.createElement("line", kt({}, c, {
      key: "line-".concat(s),
      x1: f.x,
      y1: f.y,
      x2: l.x,
      y2: l.y
    }));
  }));
}, iR = function(t) {
  var r = t.cx, n = t.cy, i = t.radius, a = t.index, o = ji(ji({
    stroke: "#ccc"
  }, K(t, !1)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ A.createElement("circle", kt({}, o, {
    className: Y("recharts-polar-grid-concentric-circle", t.className),
    key: "circle-".concat(a),
    cx: r,
    cy: n,
    r: i
  }));
}, aR = function(t) {
  var r = t.radius, n = t.index, i = ji(ji({
    stroke: "#ccc"
  }, K(t, !1)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ A.createElement("path", kt({}, i, {
    className: Y("recharts-polar-grid-concentric-polygon", t.className),
    key: "path-".concat(n),
    d: rR(r, t.cx, t.cy, t.polarAngles)
  }));
}, oR = function(t) {
  var r = t.polarRadius, n = t.gridType;
  return !r || !r.length ? null : /* @__PURE__ */ A.createElement("g", {
    className: "recharts-polar-grid-concentric"
  }, r.map(function(i, a) {
    var o = a;
    return n === "circle" ? /* @__PURE__ */ A.createElement(iR, kt({
      key: o
    }, t, {
      radius: i,
      index: a
    })) : /* @__PURE__ */ A.createElement(aR, kt({
      key: o
    }, t, {
      radius: i,
      index: a
    }));
  }));
}, bw = function(t) {
  var r = t.cx, n = r === void 0 ? 0 : r, i = t.cy, a = i === void 0 ? 0 : i, o = t.innerRadius, u = o === void 0 ? 0 : o, c = t.outerRadius, s = c === void 0 ? 0 : c, f = t.gridType, l = f === void 0 ? "polygon" : f, p = t.radialLines, d = p === void 0 ? !0 : p, y = Zk(t, Yk);
  return s <= 0 ? null : /* @__PURE__ */ A.createElement("g", {
    className: "recharts-polar-grid"
  }, /* @__PURE__ */ A.createElement(nR, kt({
    cx: n,
    cy: a,
    innerRadius: u,
    outerRadius: s,
    gridType: l,
    radialLines: d
  }, y)), /* @__PURE__ */ A.createElement(oR, kt({
    cx: n,
    cy: a,
    innerRadius: u,
    outerRadius: s,
    gridType: l,
    radialLines: d
  }, y)));
};
bw.displayName = "PolarGrid";
var Tl, gb;
function uR() {
  if (gb) return Tl;
  gb = 1;
  var e = Do(), t = TO(), r = gt();
  function n(i, a) {
    return i && i.length ? e(i, r(a, 2), t) : void 0;
  }
  return Tl = n, Tl;
}
var cR = uR();
const sR = /* @__PURE__ */ ue(cR);
var $l, bb;
function lR() {
  if (bb) return $l;
  bb = 1;
  var e = Do(), t = gt(), r = $O();
  function n(i, a) {
    return i && i.length ? e(i, t(a, 2), r) : void 0;
  }
  return $l = n, $l;
}
var fR = lR();
const pR = /* @__PURE__ */ ue(fR);
var hR = ["cx", "cy", "angle", "ticks", "axisLine"], dR = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function rn(e) {
  "@babel/helpers - typeof";
  return rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rn(e);
}
function Jn() {
  return Jn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jn.apply(this, arguments);
}
function xb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xb(Object(r), !0).forEach(function(n) {
      Bo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ob(e, t) {
  if (e == null) return {};
  var r = vR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function vR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function yR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ow(n.key), n);
  }
}
function mR(e, t, r) {
  return t && wb(e.prototype, t), r && wb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function gR(e, t, r) {
  return t = Ha(t), bR(e, xw() ? Reflect.construct(t, r || [], Ha(e).constructor) : t.apply(e, r));
}
function bR(e, t) {
  if (t && (rn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return xR(e);
}
function xR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xw = function() {
    return !!e;
  })();
}
function Ha(e) {
  return Ha = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ha(e);
}
function OR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && rp(e, t);
}
function rp(e, t) {
  return rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, rp(e, t);
}
function Bo(e, t, r) {
  return t = Ow(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ow(e) {
  var t = wR(e, "string");
  return rn(t) == "symbol" ? t : t + "";
}
function wR(e, t) {
  if (rn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (rn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Tn = /* @__PURE__ */ (function(e) {
  function t() {
    return yR(this, t), gR(this, t, arguments);
  }
  return OR(t, e), mR(t, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(n) {
        var i = n.coordinate, a = this.props, o = a.angle, u = a.cx, c = a.cy;
        return ne(u, c, i, o);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props.orientation, i;
      switch (n) {
        case "left":
          i = "end";
          break;
        case "right":
          i = "start";
          break;
        default:
          i = "middle";
          break;
      }
      return i;
    }
  }, {
    key: "getViewBox",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = sR(u, function(f) {
        return f.coordinate || 0;
      }), s = pR(u, function(f) {
        return f.coordinate || 0;
      });
      return {
        cx: i,
        cy: a,
        startAngle: o,
        endAngle: o,
        innerRadius: s.coordinate || 0,
        outerRadius: c.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = n.axisLine, s = Ob(n, hR), f = u.reduce(function(y, v) {
        return [Math.min(y[0], v.coordinate), Math.max(y[1], v.coordinate)];
      }, [1 / 0, -1 / 0]), l = ne(i, a, f[0], o), p = ne(i, a, f[1], o), d = nr(nr(nr({}, K(s, !1)), {}, {
        fill: "none"
      }, K(c, !1)), {}, {
        x1: l.x,
        y1: l.y,
        x2: p.x,
        y2: p.y
      });
      return /* @__PURE__ */ A.createElement("line", Jn({
        className: "recharts-polar-radius-axis-line"
      }, d));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.angle, c = i.tickFormatter, s = i.stroke, f = Ob(i, dR), l = this.getTickTextAnchor(), p = K(f, !1), d = K(o, !1), y = a.map(function(v, h) {
        var g = n.getTickValueCoord(v), b = nr(nr(nr(nr({
          textAnchor: l,
          transform: "rotate(".concat(90 - u, ", ").concat(g.x, ", ").concat(g.y, ")")
        }, p), {}, {
          stroke: "none",
          fill: s
        }, d), {}, {
          index: h
        }, g), {}, {
          payload: v
        });
        return /* @__PURE__ */ A.createElement(Q, Jn({
          className: Y("recharts-polar-radius-axis-tick", ow(o)),
          key: "tick-".concat(v.coordinate)
        }, Tt(n.props, v, h)), t.renderTickItem(o, b, c ? c(v.value, h) : v.value));
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-polar-radius-axis-ticks"
      }, y);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.axisLine, o = n.tick;
      return !i || !i.length ? null : /* @__PURE__ */ A.createElement(Q, {
        className: Y("recharts-polar-radius-axis", this.props.className)
      }, a && this.renderAxisLine(), o && this.renderTicks(), $e.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ A.isValidElement(n) ? o = /* @__PURE__ */ A.cloneElement(n, i) : G(n) ? o = n(i) : o = /* @__PURE__ */ A.createElement(br, Jn({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), a), o;
    }
  }]);
})(D.PureComponent);
Bo(Tn, "displayName", "PolarRadiusAxis");
Bo(Tn, "axisType", "radiusAxis");
Bo(Tn, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
function nn(e) {
  "@babel/helpers - typeof";
  return nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nn(e);
}
function ur() {
  return ur = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ur.apply(this, arguments);
}
function _b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _b(Object(r), !0).forEach(function(n) {
      Fo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _R(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ab(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _w(n.key), n);
  }
}
function AR(e, t, r) {
  return t && Ab(e.prototype, t), r && Ab(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function PR(e, t, r) {
  return t = Ga(t), SR(e, ww() ? Reflect.construct(t, r || [], Ga(e).constructor) : t.apply(e, r));
}
function SR(e, t) {
  if (t && (nn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jR(e);
}
function jR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ww() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (ww = function() {
    return !!e;
  })();
}
function Ga(e) {
  return Ga = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ga(e);
}
function ER(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && np(e, t);
}
function np(e, t) {
  return np = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, np(e, t);
}
function Fo(e, t, r) {
  return t = _w(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _w(e) {
  var t = TR(e, "string");
  return nn(t) == "symbol" ? t : t + "";
}
function TR(e, t) {
  if (nn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (nn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var $R = Math.PI / 180, Pb = 1e-5, Er = /* @__PURE__ */ (function(e) {
  function t() {
    return _R(this, t), PR(this, t, arguments);
  }
  return ER(t, e), AR(t, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function(n) {
        var i = this.props, a = i.cx, o = i.cy, u = i.radius, c = i.orientation, s = i.tickSize, f = s || 8, l = ne(a, o, u, n.coordinate), p = ne(a, o, u + (c === "inner" ? -1 : 1) * f, n.coordinate);
        return {
          x1: l.x,
          y1: l.y,
          x2: p.x,
          y2: p.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function(n) {
      var i = this.props.orientation, a = Math.cos(-n.coordinate * $R), o;
      return a > Pb ? o = i === "outer" ? "start" : "end" : a < -Pb ? o = i === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.radius, u = n.axisLine, c = n.axisLineType, s = ir(ir({}, K(this.props, !1)), {}, {
        fill: "none"
      }, K(u, !1));
      if (c === "circle")
        return /* @__PURE__ */ A.createElement(En, ur({
          className: "recharts-polar-angle-axis-line"
        }, s, {
          cx: i,
          cy: a,
          r: o
        }));
      var f = this.props.ticks, l = f.map(function(p) {
        return ne(i, a, o, p.coordinate);
      });
      return /* @__PURE__ */ A.createElement(gw, ur({
        className: "recharts-polar-angle-axis-line"
      }, s, {
        points: l
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.tickLine, c = i.tickFormatter, s = i.stroke, f = K(this.props, !1), l = K(o, !1), p = ir(ir({}, f), {}, {
        fill: "none"
      }, K(u, !1)), d = a.map(function(y, v) {
        var h = n.getTickLineCoord(y), g = n.getTickTextAnchor(y), b = ir(ir(ir({
          textAnchor: g
        }, f), {}, {
          stroke: "none",
          fill: s
        }, l), {}, {
          index: v,
          payload: y,
          x: h.x2,
          y: h.y2
        });
        return /* @__PURE__ */ A.createElement(Q, ur({
          className: Y("recharts-polar-angle-axis-tick", ow(o)),
          key: "tick-".concat(y.coordinate)
        }, Tt(n.props, y, v)), u && /* @__PURE__ */ A.createElement("line", ur({
          className: "recharts-polar-angle-axis-tick-line"
        }, p, h)), o && t.renderTickItem(o, b, c ? c(y.value, v) : y.value));
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-polar-angle-axis-ticks"
      }, d);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.radius, o = n.axisLine;
      return a <= 0 || !i || !i.length ? null : /* @__PURE__ */ A.createElement(Q, {
        className: Y("recharts-polar-angle-axis", this.props.className)
      }, o && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ A.isValidElement(n) ? o = /* @__PURE__ */ A.cloneElement(n, i) : G(n) ? o = n(i) : o = /* @__PURE__ */ A.createElement(br, ur({}, i, {
        className: "recharts-polar-angle-axis-tick-value"
      }), a), o;
    }
  }]);
})(D.PureComponent);
Fo(Er, "displayName", "PolarAngleAxis");
Fo(Er, "axisType", "angleAxis");
Fo(Er, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var Ml, Sb;
function MR() {
  if (Sb) return Ml;
  Sb = 1;
  var e = Tx(), t = e(Object.getPrototypeOf, Object);
  return Ml = t, Ml;
}
var Cl, jb;
function CR() {
  if (jb) return Cl;
  jb = 1;
  var e = Dt(), t = MR(), r = Nt(), n = "[object Object]", i = Function.prototype, a = Object.prototype, o = i.toString, u = a.hasOwnProperty, c = o.call(Object);
  function s(f) {
    if (!r(f) || e(f) != n)
      return !1;
    var l = t(f);
    if (l === null)
      return !0;
    var p = u.call(l, "constructor") && l.constructor;
    return typeof p == "function" && p instanceof p && o.call(p) == c;
  }
  return Cl = s, Cl;
}
var IR = CR();
const kR = /* @__PURE__ */ ue(IR);
var Il, Eb;
function RR() {
  if (Eb) return Il;
  Eb = 1;
  var e = Dt(), t = Nt(), r = "[object Boolean]";
  function n(i) {
    return i === !0 || i === !1 || t(i) && e(i) == r;
  }
  return Il = n, Il;
}
var DR = RR();
const NR = /* @__PURE__ */ ue(DR);
function Ei(e) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ei(e);
}
function Va() {
  return Va = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Va.apply(this, arguments);
}
function LR(e, t) {
  return WR(e) || FR(e, t) || BR(e, t) || qR();
}
function qR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function BR(e, t) {
  if (e) {
    if (typeof e == "string") return Tb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Tb(e, t);
  }
}
function Tb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function FR(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function WR(e) {
  if (Array.isArray(e)) return e;
}
function $b(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Mb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $b(Object(r), !0).forEach(function(n) {
      zR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zR(e, t, r) {
  return t = UR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UR(e) {
  var t = KR(e, "string");
  return Ei(t) == "symbol" ? t : t + "";
}
function KR(e, t) {
  if (Ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Cb = function(t, r, n, i, a) {
  var o = n - i, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + a), u += "L ".concat(t + n - o / 2 - i, ",").concat(r + a), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, HR = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, GR = function(t) {
  var r = Mb(Mb({}, HR), t), n = D.useRef(), i = D.useState(-1), a = LR(i, 2), o = a[0], u = a[1];
  D.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var O = n.current.getTotalLength();
        O && u(O);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.upperWidth, l = r.lowerWidth, p = r.height, d = r.className, y = r.animationEasing, v = r.animationDuration, h = r.animationBegin, g = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || p !== +p || f === 0 && l === 0 || p === 0)
    return null;
  var b = Y("recharts-trapezoid", d);
  return g ? /* @__PURE__ */ A.createElement(Ye, {
    canBegin: o > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: p,
      x: c,
      y: s
    },
    to: {
      upperWidth: f,
      lowerWidth: l,
      height: p,
      x: c,
      y: s
    },
    duration: v,
    animationEasing: y,
    isActive: g
  }, function(O) {
    var w = O.upperWidth, m = O.lowerWidth, x = O.height, _ = O.x, P = O.y;
    return /* @__PURE__ */ A.createElement(Ye, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: h,
      duration: v,
      easing: y
    }, /* @__PURE__ */ A.createElement("path", Va({}, K(r, !0), {
      className: b,
      d: Cb(_, P, w, m, x),
      ref: n
    })));
  }) : /* @__PURE__ */ A.createElement("g", null, /* @__PURE__ */ A.createElement("path", Va({}, K(r, !0), {
    className: b,
    d: Cb(c, s, f, l, p)
  })));
}, VR = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ti(e);
}
function XR(e, t) {
  if (e == null) return {};
  var r = YR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function YR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Ib(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ib(Object(r), !0).forEach(function(n) {
      ZR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ib(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZR(e, t, r) {
  return t = JR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function JR(e) {
  var t = QR(e, "string");
  return Ti(t) == "symbol" ? t : t + "";
}
function QR(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function eD(e, t) {
  return Xa(Xa({}, t), e);
}
function tD(e, t) {
  return e === "symbols";
}
function kb(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ A.createElement(Sh, r);
    case "trapezoid":
      return /* @__PURE__ */ A.createElement(GR, r);
    case "sector":
      return /* @__PURE__ */ A.createElement(lw, r);
    case "symbols":
      if (tD(t))
        return /* @__PURE__ */ A.createElement(zp, r);
      break;
    default:
      return null;
  }
}
function rD(e) {
  return /* @__PURE__ */ D.isValidElement(e) ? e.props : e;
}
function jh(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, i = n === void 0 ? eD : n, a = e.activeClassName, o = a === void 0 ? "recharts-active-shape" : a, u = e.isActive, c = XR(e, VR), s;
  if (/* @__PURE__ */ D.isValidElement(t))
    s = /* @__PURE__ */ D.cloneElement(t, Xa(Xa({}, c), rD(t)));
  else if (G(t))
    s = t(c);
  else if (kR(t) && !NR(t)) {
    var f = i(t, c);
    s = /* @__PURE__ */ A.createElement(kb, {
      shapeType: r,
      elementProps: f
    });
  } else {
    var l = c;
    s = /* @__PURE__ */ A.createElement(kb, {
      shapeType: r,
      elementProps: l
    });
  }
  return u ? /* @__PURE__ */ A.createElement(Q, {
    className: o
  }, s) : s;
}
function Wo(e, t) {
  return t != null && "trapezoids" in e.props;
}
function zo(e, t) {
  return t != null && "sectors" in e.props;
}
function $i(e, t) {
  return t != null && "points" in e.props;
}
function nD(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, a = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && a;
}
function iD(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function aD(e, t) {
  var r = e.x === t.x, n = e.y === t.y, i = e.z === t.z;
  return r && n && i;
}
function oD(e, t) {
  var r;
  return Wo(e, t) ? r = nD : zo(e, t) ? r = iD : $i(e, t) && (r = aD), r;
}
function uD(e, t) {
  var r;
  return Wo(e, t) ? r = "trapezoids" : zo(e, t) ? r = "sectors" : $i(e, t) && (r = "points"), r;
}
function cD(e, t) {
  if (Wo(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (zo(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return $i(e, t) ? t.payload : {};
}
function sD(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, i = uD(r, t), a = cD(r, t), o = n.filter(function(c, s) {
    var f = It(a, c), l = r.props[i].filter(function(y) {
      var v = oD(r, t);
      return v(y, t);
    }), p = r.props[i].indexOf(l[l.length - 1]), d = s === p;
    return f && d;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var sa;
function an(e) {
  "@babel/helpers - typeof";
  return an = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, an(e);
}
function Br() {
  return Br = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Br.apply(this, arguments);
}
function Rb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function le(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rb(Object(r), !0).forEach(function(n) {
      et(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Db(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Pw(n.key), n);
  }
}
function fD(e, t, r) {
  return t && Db(e.prototype, t), r && Db(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function pD(e, t, r) {
  return t = Ya(t), hD(e, Aw() ? Reflect.construct(t, r || [], Ya(e).constructor) : t.apply(e, r));
}
function hD(e, t) {
  if (t && (an(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return dD(e);
}
function dD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Aw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Aw = function() {
    return !!e;
  })();
}
function Ya(e) {
  return Ya = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ya(e);
}
function vD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ip(e, t);
}
function ip(e, t) {
  return ip = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, ip(e, t);
}
function et(e, t, r) {
  return t = Pw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pw(e) {
  var t = yD(e, "string");
  return an(t) == "symbol" ? t : t + "";
}
function yD(e, t) {
  if (an(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (an(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var qt = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return lD(this, t), n = pD(this, t, [r]), et(n, "pieRef", null), et(n, "sectorRefs", []), et(n, "id", Ar("recharts-pie-")), et(n, "handleAnimationEnd", function() {
      var i = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), G(i) && i();
    }), et(n, "handleAnimationStart", function() {
      var i = n.props.onAnimationStart;
      n.setState({
        isAnimationFinished: !1
      }), G(i) && i();
    }), n.state = {
      isAnimationFinished: !r.isAnimationActive,
      prevIsAnimationActive: r.isAnimationActive,
      prevAnimationId: r.animationId,
      sectorToFocus: 0
    }, n;
  }
  return vD(t, e), fD(t, [{
    key: "isActiveIndex",
    value: function(n) {
      var i = this.props.activeIndex;
      return Array.isArray(i) ? i.indexOf(n) !== -1 : n === i;
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var n = this.props.activeIndex;
      return Array.isArray(n) ? n.length !== 0 : n || n === 0;
    }
  }, {
    key: "renderLabels",
    value: function(n) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.label, u = a.labelLine, c = a.dataKey, s = a.valueKey, f = K(this.props, !1), l = K(o, !1), p = K(u, !1), d = o && o.offsetRadius || 20, y = n.map(function(v, h) {
        var g = (v.startAngle + v.endAngle) / 2, b = ne(v.cx, v.cy, v.outerRadius + d, g), O = le(le(le(le({}, f), v), {}, {
          stroke: "none"
        }, l), {}, {
          index: h,
          textAnchor: t.getTextAnchor(b.x, v.cx)
        }, b), w = le(le(le(le({}, f), v), {}, {
          fill: "none",
          stroke: v.fill
        }, p), {}, {
          index: h,
          points: [ne(v.cx, v.cy, v.outerRadius, g), b]
        }), m = c;
        return J(c) && J(s) ? m = "value" : J(c) && (m = s), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ A.createElement(Q, {
          key: "label-".concat(v.startAngle, "-").concat(v.endAngle, "-").concat(v.midAngle, "-").concat(h)
        }, u && t.renderLabelLineItem(u, w, "line"), t.renderLabelItem(o, O, ve(v, m)));
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-pie-labels"
      }, y);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.activeShape, u = a.blendStroke, c = a.inactiveShape;
      return n.map(function(s, f) {
        if ((s == null ? void 0 : s.startAngle) === 0 && (s == null ? void 0 : s.endAngle) === 0 && n.length !== 1) return null;
        var l = i.isActiveIndex(f), p = c && i.hasActiveIndex() ? c : null, d = l ? o : p, y = le(le({}, s), {}, {
          stroke: u ? s.fill : s.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ A.createElement(Q, Br({
          ref: function(h) {
            h && !i.sectorRefs.includes(h) && i.sectorRefs.push(h);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, Tt(i.props, s, f), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(s == null ? void 0 : s.startAngle, "-").concat(s == null ? void 0 : s.endAngle, "-").concat(s.midAngle, "-").concat(f)
        }), /* @__PURE__ */ A.createElement(jh, Br({
          option: d,
          isActive: l,
          shapeType: "sector"
        }, y)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.sectors, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state, p = l.prevSectors, d = l.prevIsAnimationActive;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(f, "-").concat(d),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(y) {
        var v = y.t, h = [], g = a && a[0], b = g.startAngle;
        return a.forEach(function(O, w) {
          var m = p && p[w], x = w > 0 ? Xe(O, "paddingAngle", 0) : 0;
          if (m) {
            var _ = pe(m.endAngle - m.startAngle, O.endAngle - O.startAngle), P = le(le({}, O), {}, {
              startAngle: b + x,
              endAngle: b + _(v) + x
            });
            h.push(P), b = P.endAngle;
          } else {
            var S = O.endAngle, T = O.startAngle, E = pe(0, S - T), j = E(v), $ = le(le({}, O), {}, {
              startAngle: b + x,
              endAngle: b + j + x
            });
            h.push($), b = $.endAngle;
          }
        }), /* @__PURE__ */ A.createElement(Q, null, n.renderSectorsStatically(h));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(n) {
      var i = this;
      n.onkeydown = function(a) {
        if (!a.altKey)
          switch (a.key) {
            case "ArrowLeft": {
              var o = ++i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[o].focus(), i.setState({
                sectorToFocus: o
              });
              break;
            }
            case "ArrowRight": {
              var u = --i.state.sectorToFocus < 0 ? i.sectorRefs.length - 1 : i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[u].focus(), i.setState({
                sectorToFocus: u
              });
              break;
            }
            case "Escape": {
              i.sectorRefs[i.state.sectorToFocus].blur(), i.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
      };
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, i = n.sectors, a = n.isAnimationActive, o = this.state.prevSectors;
      return a && i && i.length && (!o || !It(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.hide, o = i.sectors, u = i.className, c = i.label, s = i.cx, f = i.cy, l = i.innerRadius, p = i.outerRadius, d = i.isAnimationActive, y = this.state.isAnimationFinished;
      if (a || !o || !o.length || !L(s) || !L(f) || !L(l) || !L(p))
        return null;
      var v = Y("recharts-pie", u);
      return /* @__PURE__ */ A.createElement(Q, {
        tabIndex: this.props.rootTabIndex,
        className: v,
        ref: function(g) {
          n.pieRef = g;
        }
      }, this.renderSectors(), c && this.renderLabels(o), $e.renderCallByParent(this.props, null, !1), (!d || y) && rt.renderCallByParent(this.props, o, !1));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return i.prevIsAnimationActive !== n.isAnimationActive ? {
        prevIsAnimationActive: n.isAnimationActive,
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : n.isAnimationActive && n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curSectors: n.sectors,
        prevSectors: i.curSectors,
        isAnimationFinished: !0
      } : n.sectors !== i.curSectors ? {
        curSectors: n.sectors,
        isAnimationFinished: !0
      } : null;
    }
  }, {
    key: "getTextAnchor",
    value: function(n, i) {
      return n > i ? "start" : n < i ? "end" : "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function(n, i, a) {
      if (/* @__PURE__ */ A.isValidElement(n))
        return /* @__PURE__ */ A.cloneElement(n, i);
      if (G(n))
        return n(i);
      var o = Y("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ A.createElement(yr, Br({}, i, {
        key: a,
        type: "linear",
        className: o
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, i, a) {
      if (/* @__PURE__ */ A.isValidElement(n))
        return /* @__PURE__ */ A.cloneElement(n, i);
      var o = a;
      if (G(n) && (o = n(i), /* @__PURE__ */ A.isValidElement(o)))
        return o;
      var u = Y("recharts-pie-label-text", typeof n != "boolean" && !G(n) ? n.className : "");
      return /* @__PURE__ */ A.createElement(br, Br({}, i, {
        alignmentBaseline: "middle",
        className: u
      }), o);
    }
  }]);
})(D.PureComponent);
sa = qt;
et(qt, "displayName", "Pie");
et(qt, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !bt.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
et(qt, "parseDeltaAngle", function(e, t) {
  var r = Me(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
et(qt, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = K(e, !1), i = We(r, To);
  return t && t.length ? t.map(function(a, o) {
    return le(le(le({
      payload: a
    }, n), a), i && i[o] && i[o].props);
  }) : i && i.length ? i.map(function(a) {
    return le(le({}, n), a.props);
  }) : [];
});
et(qt, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, i = t.width, a = t.height, o = aw(i, a), u = n + Ne(e.cx, i, i / 2), c = r + Ne(e.cy, a, a / 2), s = Ne(e.innerRadius, o, 0), f = Ne(e.outerRadius, o, o * 0.8), l = e.maxRadius || Math.sqrt(i * i + a * a) / 2;
  return {
    cx: u,
    cy: c,
    innerRadius: s,
    outerRadius: f,
    maxRadius: l
  };
});
et(qt, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? le(le({}, t.type.defaultProps), t.props) : t.props, i = sa.getRealPieData(n);
  if (!i || !i.length)
    return null;
  var a = n.cornerRadius, o = n.startAngle, u = n.endAngle, c = n.paddingAngle, s = n.dataKey, f = n.nameKey, l = n.valueKey, p = n.tooltipType, d = Math.abs(n.minAngle), y = sa.parseCoordinateOfPie(n, r), v = sa.parseDeltaAngle(o, u), h = Math.abs(v), g = s;
  J(s) && J(l) ? (st(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = "value") : J(s) && (st(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = l);
  var b = i.filter(function(P) {
    return ve(P, g, 0) !== 0;
  }).length, O = (h >= 360 ? b : b - 1) * c, w = h - b * d - O, m = i.reduce(function(P, S) {
    var T = ve(S, g, 0);
    return P + (L(T) ? T : 0);
  }, 0), x;
  if (m > 0) {
    var _;
    x = i.map(function(P, S) {
      var T = ve(P, g, 0), E = ve(P, f, S), j = (L(T) ? T : 0) / m, $;
      S ? $ = _.endAngle + Me(v) * c * (T !== 0 ? 1 : 0) : $ = o;
      var C = $ + Me(v) * ((T !== 0 ? d : 0) + j * w), M = ($ + C) / 2, k = (y.innerRadius + y.outerRadius) / 2, R = [{
        name: E,
        value: T,
        payload: P,
        dataKey: g,
        type: p
      }], q = ne(y.cx, y.cy, k, M);
      return _ = le(le(le({
        percent: j,
        cornerRadius: a,
        name: E,
        tooltipPayload: R,
        midAngle: M,
        middleRadius: k,
        tooltipPosition: q
      }, P), y), {}, {
        value: ve(P, g),
        startAngle: $,
        endAngle: C,
        payload: P,
        paddingAngle: Me(v) * c
      }), _;
    });
  }
  return le(le({}, y), {}, {
    sectors: x,
    data: i
  });
});
var kl, Nb;
function mD() {
  if (Nb) return kl;
  Nb = 1;
  function e(t) {
    return t && t.length ? t[0] : void 0;
  }
  return kl = e, kl;
}
var Rl, Lb;
function gD() {
  return Lb || (Lb = 1, Rl = mD()), Rl;
}
var bD = gD();
const xD = /* @__PURE__ */ ue(bD);
var OD = ["key"];
function on(e) {
  "@babel/helpers - typeof";
  return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, on(e);
}
function wD(e, t) {
  if (e == null) return {};
  var r = _D(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function _D(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Za() {
  return Za = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Za.apply(this, arguments);
}
function qb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qb(Object(r), !0).forEach(function(n) {
      _t(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Bb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, jw(n.key), n);
  }
}
function PD(e, t, r) {
  return t && Bb(e.prototype, t), r && Bb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function SD(e, t, r) {
  return t = Ja(t), jD(e, Sw() ? Reflect.construct(t, r || [], Ja(e).constructor) : t.apply(e, r));
}
function jD(e, t) {
  if (t && (on(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return ED(e);
}
function ED(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Sw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Sw = function() {
    return !!e;
  })();
}
function Ja(e) {
  return Ja = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ja(e);
}
function TD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ap(e, t);
}
function ap(e, t) {
  return ap = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, ap(e, t);
}
function _t(e, t, r) {
  return t = jw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jw(e) {
  var t = $D(e, "string");
  return on(t) == "symbol" ? t : t + "";
}
function $D(e, t) {
  if (on(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (on(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ki = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    AD(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = SD(this, t, [].concat(i)), _t(r, "state", {
      isAnimationFinished: !1
    }), _t(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), _t(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), _t(r, "handleMouseEnter", function(o) {
      var u = r.props.onMouseEnter;
      u && u(r.props, o);
    }), _t(r, "handleMouseLeave", function(o) {
      var u = r.props.onMouseLeave;
      u && u(r.props, o);
    }), r;
  }
  return TD(t, e), PD(t, [{
    key: "renderDots",
    value: function(n) {
      var i = this.props, a = i.dot, o = i.dataKey, u = K(this.props, !1), c = K(a, !0), s = n.map(function(f, l) {
        var p = De(De(De({
          key: "dot-".concat(l),
          r: 3
        }, u), c), {}, {
          dataKey: o,
          cx: f.x,
          cy: f.y,
          index: l,
          payload: f
        });
        return t.renderDotItem(a, p);
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-radar-dots"
      }, s);
    }
  }, {
    key: "renderPolygonStatically",
    value: function(n) {
      var i = this.props, a = i.shape, o = i.dot, u = i.isRange, c = i.baseLinePoints, s = i.connectNulls, f;
      return /* @__PURE__ */ A.isValidElement(a) ? f = /* @__PURE__ */ A.cloneElement(a, De(De({}, this.props), {}, {
        points: n
      })) : G(a) ? f = a(De(De({}, this.props), {}, {
        points: n
      })) : f = /* @__PURE__ */ A.createElement(gw, Za({}, K(this.props, !0), {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        points: n,
        baseLinePoints: u ? c : null,
        connectNulls: s
      })), /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-radar-polygon"
      }, f, o ? this.renderDots(n) : null);
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.points, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state.prevPoints;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radar-".concat(f),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var d = p.t, y = l && l.length / a.length, v = a.map(function(h, g) {
          var b = l && l[Math.floor(g * y)];
          if (b) {
            var O = pe(b.x, h.x), w = pe(b.y, h.y);
            return De(De({}, h), {}, {
              x: O(d),
              y: w(d)
            });
          }
          var m = pe(h.cx, h.x), x = pe(h.cy, h.y);
          return De(De({}, h), {}, {
            x: m(d),
            y: x(d)
          });
        });
        return n.renderPolygonStatically(v);
      });
    }
  }, {
    key: "renderPolygon",
    value: function() {
      var n = this.props, i = n.points, a = n.isAnimationActive, o = n.isRange, u = this.state.prevPoints;
      return a && i && i.length && !o && (!u || !It(u, i)) ? this.renderPolygonWithAnimation() : this.renderPolygonStatically(i);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.className, o = n.points, u = n.isAnimationActive;
      if (i || !o || !o.length)
        return null;
      var c = this.state.isAnimationFinished, s = Y("recharts-radar", a);
      return /* @__PURE__ */ A.createElement(Q, {
        className: s
      }, this.renderPolygon(), (!u || c) && rt.renderCallByParent(this.props, o));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null;
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (/* @__PURE__ */ A.isValidElement(n))
        a = /* @__PURE__ */ A.cloneElement(n, i);
      else if (G(n))
        a = n(i);
      else {
        var o = i.key, u = wD(i, OD);
        a = /* @__PURE__ */ A.createElement(En, Za({}, u, {
          key: o,
          className: Y("recharts-radar-dot", typeof n != "boolean" ? n.className : "")
        }));
      }
      return a;
    }
  }]);
})(D.PureComponent);
_t(Ki, "displayName", "Radar");
_t(Ki, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: !1,
  activeDot: !0,
  dot: !1,
  legendType: "rect",
  isAnimationActive: !bt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_t(Ki, "getComposedData", function(e) {
  var t = e.radiusAxis, r = e.angleAxis, n = e.displayedData, i = e.dataKey, a = e.bandSize, o = r.cx, u = r.cy, c = !1, s = [], f = r.type !== "number" ? a ?? 0 : 0;
  n.forEach(function(p, d) {
    var y = ve(p, r.dataKey, d), v = ve(p, i), h = r.scale(y) + f, g = Array.isArray(v) ? cw(v) : v, b = J(g) ? void 0 : t.scale(g);
    Array.isArray(v) && v.length >= 2 && (c = !0), s.push(De(De({}, ne(o, u, b, h)), {}, {
      name: y,
      value: v,
      cx: o,
      cy: u,
      radius: b,
      angle: h,
      payload: p
    }));
  });
  var l = [];
  return c && s.forEach(function(p) {
    if (Array.isArray(p.value)) {
      var d = xD(p.value), y = J(d) ? void 0 : t.scale(d);
      l.push(De(De({}, p), {}, {
        radius: y
      }, ne(o, u, y, p.angle)));
    } else
      l.push(p);
  }), {
    points: s,
    isRange: c,
    baseLinePoints: l
  };
});
function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mi(e);
}
function op() {
  return op = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, op.apply(this, arguments);
}
function Fb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fb(Object(r), !0).forEach(function(n) {
      MD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function MD(e, t, r) {
  return t = CD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CD(e) {
  var t = ID(e, "string");
  return Mi(t) == "symbol" ? t : t + "";
}
function ID(e, t) {
  if (Mi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Wb(e) {
  return typeof e == "string" ? parseInt(e, 10) : e;
}
function kD(e, t) {
  var r = "".concat(t.cx || e.cx), n = Number(r), i = "".concat(t.cy || e.cy), a = Number(i);
  return Dl(Dl(Dl({}, t), e), {}, {
    cx: n,
    cy: a
  });
}
function zb(e) {
  return /* @__PURE__ */ A.createElement(jh, op({
    shapeType: "sector",
    propTransformer: kD
  }, e));
}
var RD = ["shape", "activeShape", "activeIndex", "cornerRadius"], DD = ["value", "background"];
function un(e) {
  "@babel/helpers - typeof";
  return un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, un(e);
}
function Qa() {
  return Qa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qa.apply(this, arguments);
}
function Ub(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ee(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ub(Object(r), !0).forEach(function(n) {
      mr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ub(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Kb(e, t) {
  if (e == null) return {};
  var r = ND(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function ND(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function LD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Hb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Tw(n.key), n);
  }
}
function qD(e, t, r) {
  return t && Hb(e.prototype, t), r && Hb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function BD(e, t, r) {
  return t = eo(t), FD(e, Ew() ? Reflect.construct(t, r || [], eo(e).constructor) : t.apply(e, r));
}
function FD(e, t) {
  if (t && (un(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return WD(e);
}
function WD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ew() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Ew = function() {
    return !!e;
  })();
}
function eo(e) {
  return eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, eo(e);
}
function zD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && up(e, t);
}
function up(e, t) {
  return up = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, up(e, t);
}
function mr(e, t, r) {
  return t = Tw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Tw(e) {
  var t = UD(e, "string");
  return un(t) == "symbol" ? t : t + "";
}
function UD(e, t) {
  if (un(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (un(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Hi = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    LD(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = BD(this, t, [].concat(i)), mr(r, "state", {
      isAnimationFinished: !1
    }), mr(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), mr(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), r;
  }
  return zD(t, e), qD(t, [{
    key: "getDeltaAngle",
    value: function() {
      var n = this.props, i = n.startAngle, a = n.endAngle, o = Me(a - i), u = Math.min(Math.abs(a - i), 360);
      return o * u;
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.activeShape, c = a.activeIndex, s = a.cornerRadius, f = Kb(a, RD), l = K(f, !1);
      return n.map(function(p, d) {
        var y = d === c, v = Ee(Ee(Ee(Ee({}, l), {}, {
          cornerRadius: Wb(s)
        }, p), Tt(i.props, p, d)), {}, {
          className: "recharts-radial-bar-sector ".concat(p.className),
          forceCornerRadius: f.forceCornerRadius,
          cornerIsExternal: f.cornerIsExternal,
          isActive: y,
          option: y ? u : o
        });
        return /* @__PURE__ */ A.createElement(zb, Qa({}, v, {
          key: "sector-".concat(d)
        }));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state.prevData;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: u,
        duration: c,
        isActive: o,
        easing: s,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radialBar-".concat(f),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(p) {
        var d = p.t, y = a.map(function(v, h) {
          var g = l && l[h];
          if (g) {
            var b = pe(g.startAngle, v.startAngle), O = pe(g.endAngle, v.endAngle);
            return Ee(Ee({}, v), {}, {
              startAngle: b(d),
              endAngle: O(d)
            });
          }
          var w = v.endAngle, m = v.startAngle, x = pe(m, w);
          return Ee(Ee({}, v), {}, {
            endAngle: x(d)
          });
        });
        return /* @__PURE__ */ A.createElement(Q, null, n.renderSectorsStatically(y));
      });
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, i = n.data, a = n.isAnimationActive, o = this.state.prevData;
      return a && i && i.length && (!o || !It(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "renderBackground",
    value: function(n) {
      var i = this, a = this.props.cornerRadius, o = K(this.props.background, !1);
      return n.map(function(u, c) {
        u.value;
        var s = u.background, f = Kb(u, DD);
        if (!s)
          return null;
        var l = Ee(Ee(Ee(Ee(Ee({
          cornerRadius: Wb(a)
        }, f), {}, {
          fill: "#eee"
        }, s), o), Tt(i.props, u, c)), {}, {
          index: c,
          className: Y("recharts-radial-bar-background-sector", o == null ? void 0 : o.className),
          option: s,
          isActive: !1
        });
        return /* @__PURE__ */ A.createElement(zb, Qa({}, l, {
          key: "sector-".concat(c)
        }));
      });
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.data, o = n.className, u = n.background, c = n.isAnimationActive;
      if (i || !a || !a.length)
        return null;
      var s = this.state.isAnimationFinished, f = Y("recharts-area", o);
      return /* @__PURE__ */ A.createElement(Q, {
        className: f
      }, u && /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-radial-bar-background"
      }, this.renderBackground(a)), /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-radial-bar-sectors"
      }, this.renderSectors()), (!c || s) && rt.renderCallByParent(Ee({}, this.props), a));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: i.curData
      } : n.data !== i.curData ? {
        curData: n.data
      } : null;
    }
  }]);
})(D.PureComponent);
mr(Hi, "displayName", "RadialBar");
mr(Hi, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  minPointSize: 0,
  hide: !1,
  legendType: "rect",
  data: [],
  isAnimationActive: !bt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  forceCornerRadius: !1,
  cornerIsExternal: !1
});
mr(Hi, "getComposedData", function(e) {
  var t = e.item, r = e.props, n = e.radiusAxis, i = e.radiusAxisTicks, a = e.angleAxis, o = e.angleAxisTicks, u = e.displayedData, c = e.dataKey, s = e.stackedData, f = e.barPosition, l = e.bandSize, p = e.dataStartIndex, d = QO(f, t);
  if (!d)
    return null;
  var y = a.cx, v = a.cy, h = r.layout, g = t.props, b = g.children, O = g.minPointSize, w = h === "radial" ? a : n, m = s ? w.scale.domain() : null, x = rw({
    numericAxis: w
  }), _ = We(b, To), P = u.map(function(S, T) {
    var E, j, $, C, M, k;
    if (s ? E = ew(s[p + T], m) : (E = ve(S, c), Array.isArray(E) || (E = [x, E])), h === "radial") {
      j = Na({
        axis: n,
        ticks: i,
        bandSize: l,
        offset: d.offset,
        entry: S,
        index: T
      }), M = a.scale(E[1]), C = a.scale(E[0]), $ = j + d.size;
      var R = M - C;
      if (Math.abs(O) > 0 && Math.abs(R) < Math.abs(O)) {
        var q = Me(R || O) * (Math.abs(O) - Math.abs(R));
        M += q;
      }
      k = {
        background: {
          cx: y,
          cy: v,
          innerRadius: j,
          outerRadius: $,
          startAngle: r.startAngle,
          endAngle: r.endAngle
        }
      };
    } else {
      j = n.scale(E[0]), $ = n.scale(E[1]), C = Na({
        axis: a,
        ticks: o,
        bandSize: l,
        offset: d.offset,
        entry: S,
        index: T
      }), M = C + d.size;
      var B = $ - j;
      if (Math.abs(O) > 0 && Math.abs(B) < Math.abs(O)) {
        var U = Me(B || O) * (Math.abs(O) - Math.abs(B));
        $ += U;
      }
    }
    return Ee(Ee(Ee(Ee({}, S), k), {}, {
      payload: S,
      value: s ? E : E[1],
      cx: y,
      cy: v,
      innerRadius: j,
      outerRadius: $,
      startAngle: C,
      endAngle: M
    }, _ && _[T] && _[T].props), {}, {
      tooltipPayload: [Ah(t, S)],
      tooltipPosition: ne(y, v, (j + $) / 2, (C + M) / 2)
    });
  });
  return {
    data: P,
    layout: h
  };
});
var Nl, Gb;
function KD() {
  if (Gb) return Nl;
  Gb = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, i, a, o) {
    for (var u = -1, c = t(e((i - n) / (a || 1)), 0), s = Array(c); c--; )
      s[o ? c : ++u] = n, n += a;
    return s;
  }
  return Nl = r, Nl;
}
var Ll, Vb;
function $w() {
  if (Vb) return Ll;
  Vb = 1;
  var e = Kx(), t = 1 / 0, r = 17976931348623157e292;
  function n(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = e(i), i === t || i === -t) {
      var a = i < 0 ? -1 : 1;
      return a * r;
    }
    return i === i ? i : 0;
  }
  return Ll = n, Ll;
}
var ql, Xb;
function HD() {
  if (Xb) return ql;
  Xb = 1;
  var e = KD(), t = Eo(), r = $w();
  function n(i) {
    return function(a, o, u) {
      return u && typeof u != "number" && t(a, o, u) && (o = u = void 0), a = r(a), o === void 0 ? (o = a, a = 0) : o = r(o), u = u === void 0 ? a < o ? 1 : -1 : r(u), e(a, o, u, i);
    };
  }
  return ql = n, ql;
}
var Bl, Yb;
function GD() {
  if (Yb) return Bl;
  Yb = 1;
  var e = HD(), t = e();
  return Bl = t, Bl;
}
var VD = GD();
const to = /* @__PURE__ */ ue(VD);
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
}
function Zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zb(Object(r), !0).forEach(function(n) {
      Mw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mw(e, t, r) {
  return t = XD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XD(e) {
  var t = YD(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function YD(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZD = ["Webkit", "Moz", "O", "ms"], JD = function(t, r) {
  var n = t.replace(/(\w)/, function(a) {
    return a.toUpperCase();
  }), i = ZD.reduce(function(a, o) {
    return Jb(Jb({}, a), {}, Mw({}, o + n, r));
  }, {});
  return i[t] = r, i;
};
function cn(e) {
  "@babel/helpers - typeof";
  return cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cn(e);
}
function ro() {
  return ro = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ro.apply(this, arguments);
}
function Qb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qb(Object(r), !0).forEach(function(n) {
      He(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function QD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function e0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Iw(n.key), n);
  }
}
function eN(e, t, r) {
  return t && e0(e.prototype, t), r && e0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function tN(e, t, r) {
  return t = no(t), rN(e, Cw() ? Reflect.construct(t, r || [], no(e).constructor) : t.apply(e, r));
}
function rN(e, t) {
  if (t && (cn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return nN(e);
}
function nN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Cw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Cw = function() {
    return !!e;
  })();
}
function no(e) {
  return no = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, no(e);
}
function iN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && cp(e, t);
}
function cp(e, t) {
  return cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, cp(e, t);
}
function He(e, t, r) {
  return t = Iw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Iw(e) {
  var t = aN(e, "string");
  return cn(t) == "symbol" ? t : t + "";
}
function aN(e, t) {
  if (cn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (cn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var oN = function(t) {
  var r = t.data, n = t.startIndex, i = t.endIndex, a = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var c = r.length, s = Vn().domain(to(0, c)).range([a, a + o - u]), f = s.domain().map(function(l) {
    return s(l);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: s(n),
    endX: s(i),
    scale: s,
    scaleValues: f
  };
}, t0 = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, sn = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return QD(this, t), n = tN(this, t, [r]), He(n, "handleDrag", function(i) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i);
    }), He(n, "handleTouchMove", function(i) {
      i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0]);
    }), He(n, "handleDragEnd", function() {
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var i = n.props, a = i.endIndex, o = i.onDragEnd, u = i.startIndex;
        o == null || o({
          endIndex: a,
          startIndex: u
        });
      }), n.detachDragEndListener();
    }), He(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), He(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), He(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), He(n, "handleSlideDragStart", function(i) {
      var a = t0(i) ? i.changedTouches[0] : i;
      n.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: a.pageX
      }), n.attachDragEndListener();
    }), n.travellerDragStartHandlers = {
      startX: n.handleTravellerDragStart.bind(n, "startX"),
      endX: n.handleTravellerDragStart.bind(n, "endX")
    }, n.state = {}, n;
  }
  return iN(t, e), eN(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var i = n.startX, a = n.endX, o = this.state.scaleValues, u = this.props, c = u.gap, s = u.data, f = s.length - 1, l = Math.min(i, a), p = Math.max(i, a), d = t.getIndexInRange(o, l), y = t.getIndexInRange(o, p);
      return {
        startIndex: d - d % c,
        endIndex: y === f ? f : y - y % c
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var i = this.props, a = i.data, o = i.tickFormatter, u = i.dataKey, c = ve(a[n], u, n);
      return G(o) ? o(c, n) : c;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(n) {
      var i = this.state, a = i.slideMoveStartX, o = i.startX, u = i.endX, c = this.props, s = c.x, f = c.width, l = c.travellerWidth, p = c.startIndex, d = c.endIndex, y = c.onChange, v = n.pageX - a;
      v > 0 ? v = Math.min(v, s + f - l - u, s + f - l - o) : v < 0 && (v = Math.max(v, s - o, s - u));
      var h = this.getIndex({
        startX: o + v,
        endX: u + v
      });
      (h.startIndex !== p || h.endIndex !== d) && y && y(h), this.setState({
        startX: o + v,
        endX: u + v,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, i) {
      var a = t0(i) ? i.changedTouches[0] : i;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: n,
        brushMoveStartX: a.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(n) {
      var i = this.state, a = i.brushMoveStartX, o = i.movingTravellerId, u = i.endX, c = i.startX, s = this.state[o], f = this.props, l = f.x, p = f.width, d = f.travellerWidth, y = f.onChange, v = f.gap, h = f.data, g = {
        startX: this.state.startX,
        endX: this.state.endX
      }, b = n.pageX - a;
      b > 0 ? b = Math.min(b, l + p - d - s) : b < 0 && (b = Math.max(b, l - s)), g[o] = s + b;
      var O = this.getIndex(g), w = O.startIndex, m = O.endIndex, x = function() {
        var P = h.length - 1;
        return o === "startX" && (u > c ? w % v === 0 : m % v === 0) || u < c && m === P || o === "endX" && (u > c ? m % v === 0 : w % v === 0) || u > c && m === P;
      };
      this.setState(He(He({}, o, s + b), "brushMoveStartX", n.pageX), function() {
        y && x() && y(O);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(n, i) {
      var a = this, o = this.state, u = o.scaleValues, c = o.startX, s = o.endX, f = this.state[i], l = u.indexOf(f);
      if (l !== -1) {
        var p = l + n;
        if (!(p === -1 || p >= u.length)) {
          var d = u[p];
          i === "startX" && d >= s || i === "endX" && d <= c || this.setState(He({}, i, d), function() {
            a.props.onChange(a.getIndex({
              startX: a.state.startX,
              endX: a.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.fill, s = n.stroke;
      return /* @__PURE__ */ A.createElement("rect", {
        stroke: s,
        fill: c,
        x: i,
        y: a,
        width: o,
        height: u
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.data, s = n.children, f = n.padding, l = D.Children.only(s);
      return l ? /* @__PURE__ */ A.cloneElement(l, {
        x: i,
        y: a,
        width: o,
        height: u,
        margin: f,
        compact: !0,
        data: c
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(n, i) {
      var a, o, u = this, c = this.props, s = c.y, f = c.travellerWidth, l = c.height, p = c.traveller, d = c.ariaLabel, y = c.data, v = c.startIndex, h = c.endIndex, g = Math.max(n, this.props.x), b = Fl(Fl({}, K(this.props, !1)), {}, {
        x: g,
        y: s,
        width: f,
        height: l
      }), O = d || "Min value: ".concat((a = y[v]) === null || a === void 0 ? void 0 : a.name, ", Max value: ").concat((o = y[h]) === null || o === void 0 ? void 0 : o.name);
      return /* @__PURE__ */ A.createElement(Q, {
        tabIndex: 0,
        role: "slider",
        "aria-label": O,
        "aria-valuenow": n,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[i],
        onTouchStart: this.travellerDragStartHandlers[i],
        onKeyDown: function(m) {
          ["ArrowLeft", "ArrowRight"].includes(m.key) && (m.preventDefault(), m.stopPropagation(), u.handleTravellerMoveKeyboard(m.key === "ArrowRight" ? 1 : -1, i));
        },
        onFocus: function() {
          u.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          u.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, t.renderTraveller(p, b));
    }
  }, {
    key: "renderSlide",
    value: function(n, i) {
      var a = this.props, o = a.y, u = a.height, c = a.stroke, s = a.travellerWidth, f = Math.min(n, i) + s, l = Math.max(Math.abs(i - n) - s, 0);
      return /* @__PURE__ */ A.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: c,
        fillOpacity: 0.2,
        x: f,
        y: o,
        width: l,
        height: u
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var n = this.props, i = n.startIndex, a = n.endIndex, o = n.y, u = n.height, c = n.travellerWidth, s = n.stroke, f = this.state, l = f.startX, p = f.endX, d = 5, y = {
        pointerEvents: "none",
        fill: s
      };
      return /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ A.createElement(br, ro({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(l, p) - d,
        y: o + u / 2
      }, y), this.getTextOfTick(i)), /* @__PURE__ */ A.createElement(br, ro({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(l, p) + c + d,
        y: o + u / 2
      }, y), this.getTextOfTick(a)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.data, a = n.className, o = n.children, u = n.x, c = n.y, s = n.width, f = n.height, l = n.alwaysShowText, p = this.state, d = p.startX, y = p.endX, v = p.isTextActive, h = p.isSlideMoving, g = p.isTravellerMoving, b = p.isTravellerFocused;
      if (!i || !i.length || !L(u) || !L(c) || !L(s) || !L(f) || s <= 0 || f <= 0)
        return null;
      var O = Y("recharts-brush", a), w = A.Children.count(o) === 1, m = JD("userSelect", "none");
      return /* @__PURE__ */ A.createElement(Q, {
        className: O,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: m
      }, this.renderBackground(), w && this.renderPanorama(), this.renderSlide(d, y), this.renderTravellerLayer(d, "startX"), this.renderTravellerLayer(y, "endX"), (v || h || g || b || l) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var i = n.x, a = n.y, o = n.width, u = n.height, c = n.stroke, s = Math.floor(a + u / 2) - 1;
      return /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("rect", {
        x: i,
        y: a,
        width: o,
        height: u,
        fill: c,
        stroke: "none"
      }), /* @__PURE__ */ A.createElement("line", {
        x1: i + 1,
        y1: s,
        x2: i + o - 1,
        y2: s,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ A.createElement("line", {
        x1: i + 1,
        y1: s + 2,
        x2: i + o - 1,
        y2: s + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(n, i) {
      var a;
      return /* @__PURE__ */ A.isValidElement(n) ? a = /* @__PURE__ */ A.cloneElement(n, i) : G(n) ? a = n(i) : a = t.renderDefaultTraveller(i), a;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      var a = n.data, o = n.width, u = n.x, c = n.travellerWidth, s = n.updateId, f = n.startIndex, l = n.endIndex;
      if (a !== i.prevData || s !== i.prevUpdateId)
        return Fl({
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o
        }, a && a.length ? oN({
          data: a,
          width: o,
          x: u,
          travellerWidth: c,
          startIndex: f,
          endIndex: l
        }) : {
          scale: null,
          scaleValues: null
        });
      if (i.scale && (o !== i.prevWidth || u !== i.prevX || c !== i.prevTravellerWidth)) {
        i.scale.range([u, u + o - c]);
        var p = i.scale.domain().map(function(d) {
          return i.scale(d);
        });
        return {
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o,
          startX: i.scale(n.startIndex),
          endX: i.scale(n.endIndex),
          scaleValues: p
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(n, i) {
      for (var a = n.length, o = 0, u = a - 1; u - o > 1; ) {
        var c = Math.floor((o + u) / 2);
        n[c] > i ? u = c : o = c;
      }
      return i >= n[u] ? u : o;
    }
  }]);
})(D.PureComponent);
He(sn, "displayName", "Brush");
He(sn, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var Wl, r0;
function uN() {
  if (r0) return Wl;
  r0 = 1;
  var e = Yp();
  function t(r, n) {
    var i;
    return e(r, function(a, o, u) {
      return i = n(a, o, u), !i;
    }), !!i;
  }
  return Wl = t, Wl;
}
var zl, n0;
function cN() {
  if (n0) return zl;
  n0 = 1;
  var e = wx(), t = gt(), r = uN(), n = ze(), i = Eo();
  function a(o, u, c) {
    var s = n(o) ? e : r;
    return c && i(o, u, c) && (u = void 0), s(o, t(u, 3));
  }
  return zl = a, zl;
}
var sN = cN();
const lN = /* @__PURE__ */ ue(sN);
var vt = function(t, r) {
  var n = t.alwaysShow, i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r;
}, Ul, i0;
function fN() {
  if (i0) return Ul;
  i0 = 1;
  var e = Bx();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return Ul = t, Ul;
}
var Kl, a0;
function pN() {
  if (a0) return Kl;
  a0 = 1;
  var e = fN(), t = Lx(), r = gt();
  function n(i, a) {
    var o = {};
    return a = r(a, 3), t(i, function(u, c, s) {
      e(o, c, a(u, c, s));
    }), o;
  }
  return Kl = n, Kl;
}
var hN = pN();
const dN = /* @__PURE__ */ ue(hN);
var Hl, o0;
function vN() {
  if (o0) return Hl;
  o0 = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return Hl = e, Hl;
}
var Gl, u0;
function yN() {
  if (u0) return Gl;
  u0 = 1;
  var e = Yp();
  function t(r, n) {
    var i = !0;
    return e(r, function(a, o, u) {
      return i = !!n(a, o, u), i;
    }), i;
  }
  return Gl = t, Gl;
}
var Vl, c0;
function mN() {
  if (c0) return Vl;
  c0 = 1;
  var e = vN(), t = yN(), r = gt(), n = ze(), i = Eo();
  function a(o, u, c) {
    var s = n(o) ? e : t;
    return c && i(o, u, c) && (u = void 0), s(o, r(u, 3));
  }
  return Vl = a, Vl;
}
var gN = mN();
const kw = /* @__PURE__ */ ue(gN);
var bN = ["x", "y"];
function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ii(e);
}
function sp() {
  return sp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, sp.apply(this, arguments);
}
function s0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? s0(Object(r), !0).forEach(function(n) {
      xN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xN(e, t, r) {
  return t = ON(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ON(e) {
  var t = wN(e, "string");
  return Ii(t) == "symbol" ? t : t + "";
}
function wN(e, t) {
  if (Ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _N(e, t) {
  if (e == null) return {};
  var r = AN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function AN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function PN(e, t) {
  var r = e.x, n = e.y, i = _N(e, bN), a = "".concat(r), o = parseInt(a, 10), u = "".concat(n), c = parseInt(u, 10), s = "".concat(t.height || i.height), f = parseInt(s, 10), l = "".concat(t.width || i.width), p = parseInt(l, 10);
  return zn(zn(zn(zn(zn({}, t), i), o ? {
    x: o
  } : {}), c ? {
    y: c
  } : {}), {}, {
    height: f,
    width: p,
    name: t.name,
    radius: t.radius
  });
}
function l0(e) {
  return /* @__PURE__ */ A.createElement(jh, sp({
    shapeType: "rectangle",
    propTransformer: PN,
    activeClassName: "recharts-active-bar"
  }, e));
}
var SN = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var a = L(n) || hA(n);
    return a ? t(n, i) : (a || Or(), r);
  };
}, jN = ["value", "background"], Rw;
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function EN(e, t) {
  if (e == null) return {};
  var r = TN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function TN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function io() {
  return io = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, io.apply(this, arguments);
}
function f0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? f0(Object(r), !0).forEach(function(n) {
      Kt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : f0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $N(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function p0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Nw(n.key), n);
  }
}
function MN(e, t, r) {
  return t && p0(e.prototype, t), r && p0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function CN(e, t, r) {
  return t = ao(t), IN(e, Dw() ? Reflect.construct(t, r || [], ao(e).constructor) : t.apply(e, r));
}
function IN(e, t) {
  if (t && (ln(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kN(e);
}
function kN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Dw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Dw = function() {
    return !!e;
  })();
}
function ao(e) {
  return ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ao(e);
}
function RN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && lp(e, t);
}
function lp(e, t) {
  return lp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, lp(e, t);
}
function Kt(e, t, r) {
  return t = Nw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nw(e) {
  var t = DN(e, "string");
  return ln(t) == "symbol" ? t : t + "";
}
function DN(e, t) {
  if (ln(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Tr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    $N(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = CN(this, t, [].concat(i)), Kt(r, "state", {
      isAnimationFinished: !1
    }), Kt(r, "id", Ar("recharts-bar-")), Kt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o();
    }), Kt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o();
    }), r;
  }
  return RN(t, e), MN(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.dataKey, c = a.activeIndex, s = a.activeBar, f = K(this.props, !1);
      return n && n.map(function(l, p) {
        var d = p === c, y = d ? s : o, v = xe(xe(xe({}, f), l), {}, {
          isActive: d,
          option: y,
          index: p,
          dataKey: u,
          onAnimationStart: i.handleAnimationStart,
          onAnimationEnd: i.handleAnimationEnd
        });
        return /* @__PURE__ */ A.createElement(Q, io({
          className: "recharts-bar-rectangle"
        }, Tt(i.props, l, p), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(l == null ? void 0 : l.x, "-").concat(l == null ? void 0 : l.y, "-").concat(l == null ? void 0 : l.value, "-").concat(p)
        }), /* @__PURE__ */ A.createElement(l0, v));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.layout, u = i.isAnimationActive, c = i.animationBegin, s = i.animationDuration, f = i.animationEasing, l = i.animationId, p = this.state.prevData;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: c,
        duration: s,
        isActive: u,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "bar-".concat(l),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(d) {
        var y = d.t, v = a.map(function(h, g) {
          var b = p && p[g];
          if (b) {
            var O = pe(b.x, h.x), w = pe(b.y, h.y), m = pe(b.width, h.width), x = pe(b.height, h.height);
            return xe(xe({}, h), {}, {
              x: O(y),
              y: w(y),
              width: m(y),
              height: x(y)
            });
          }
          if (o === "horizontal") {
            var _ = pe(0, h.height), P = _(y);
            return xe(xe({}, h), {}, {
              y: h.y + h.height - P,
              height: P
            });
          }
          var S = pe(0, h.width), T = S(y);
          return xe(xe({}, h), {}, {
            width: T
          });
        });
        return /* @__PURE__ */ A.createElement(Q, null, n.renderRectanglesStatically(v));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, i = n.data, a = n.isAnimationActive, o = this.state.prevData;
      return a && i && i.length && (!o || !It(o, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.dataKey, u = i.activeIndex, c = K(this.props.background, !1);
      return a.map(function(s, f) {
        s.value;
        var l = s.background, p = EN(s, jN);
        if (!l)
          return null;
        var d = xe(xe(xe(xe(xe({}, p), {}, {
          fill: "#eee"
        }, l), c), Tt(n.props, s, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ A.createElement(l0, io({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, d));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.data, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = We(f, Ui);
      if (!l)
        return null;
      var p = s === "vertical" ? o[0].height / 2 : o[0].width / 2, d = function(h, g) {
        var b = Array.isArray(h.value) ? h.value[1] : h.value;
        return {
          x: h.x,
          y: h.y,
          value: b,
          errorVal: ve(h, g)
        };
      }, y = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ A.createElement(Q, y, l.map(function(v) {
        return /* @__PURE__ */ A.cloneElement(v, {
          key: "error-bar-".concat(i, "-").concat(v.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          offset: p,
          dataPointFormatter: d
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.data, o = n.className, u = n.xAxis, c = n.yAxis, s = n.left, f = n.top, l = n.width, p = n.height, d = n.isAnimationActive, y = n.background, v = n.id;
      if (i || !a || !a.length)
        return null;
      var h = this.state.isAnimationFinished, g = Y("recharts-bar", o), b = u && u.allowDataOverflow, O = c && c.allowDataOverflow, w = b || O, m = J(v) ? this.id : v;
      return /* @__PURE__ */ A.createElement(Q, {
        className: g
      }, b || O ? /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("clipPath", {
        id: "clipPath-".concat(m)
      }, /* @__PURE__ */ A.createElement("rect", {
        x: b ? s : s - l / 2,
        y: O ? f : f - p / 2,
        width: b ? l : l * 2,
        height: O ? p : p * 2
      }))) : null, /* @__PURE__ */ A.createElement(Q, {
        className: "recharts-bar-rectangles",
        clipPath: w ? "url(#clipPath-".concat(m, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(w, m), (!d || h) && rt.renderCallByParent(this.props, a));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curData: n.data,
        prevData: i.curData
      } : n.data !== i.curData ? {
        curData: n.data
      } : null;
    }
  }]);
})(D.PureComponent);
Rw = Tr;
Kt(Tr, "displayName", "Bar");
Kt(Tr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !bt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Kt(Tr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, i = e.bandSize, a = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, p = e.offset, d = QO(n, r);
  if (!d)
    return null;
  var y = t.layout, v = r.type.defaultProps, h = v !== void 0 ? xe(xe({}, v), r.props) : r.props, g = h.dataKey, b = h.children, O = h.minPointSize, w = y === "horizontal" ? o : a, m = s ? w.scale.domain() : null, x = rw({
    numericAxis: w
  }), _ = We(b, To), P = l.map(function(S, T) {
    var E, j, $, C, M, k;
    s ? E = ew(s[f + T], m) : (E = ve(S, g), Array.isArray(E) || (E = [x, E]));
    var R = SN(O, Rw.defaultProps.minPointSize)(E[1], T);
    if (y === "horizontal") {
      var q, B = [o.scale(E[0]), o.scale(E[1])], U = B[0], X = B[1];
      j = Na({
        axis: a,
        ticks: u,
        bandSize: i,
        offset: d.offset,
        entry: S,
        index: T
      }), $ = (q = X ?? U) !== null && q !== void 0 ? q : void 0, C = d.size;
      var z = U - X;
      if (M = Number.isNaN(z) ? 0 : z, k = {
        x: j,
        y: o.y,
        width: C,
        height: o.height
      }, Math.abs(R) > 0 && Math.abs(M) < Math.abs(R)) {
        var Z = Me(M || R) * (Math.abs(R) - Math.abs(M));
        $ -= Z, M += Z;
      }
    } else {
      var he = [a.scale(E[0]), a.scale(E[1])], be = he[0], Ue = he[1];
      if (j = be, $ = Na({
        axis: o,
        ticks: c,
        bandSize: i,
        offset: d.offset,
        entry: S,
        index: T
      }), C = Ue - be, M = d.size, k = {
        x: a.x,
        y: $,
        width: a.width,
        height: M
      }, Math.abs(R) > 0 && Math.abs(C) < Math.abs(R)) {
        var Qt = Me(C || R) * (Math.abs(R) - Math.abs(C));
        C += Qt;
      }
    }
    return xe(xe(xe({}, S), {}, {
      x: j,
      y: $,
      width: C,
      height: M,
      value: s ? E : E[1],
      payload: S,
      background: k
    }, _ && _[T] && _[T].props), {}, {
      tooltipPayload: [Ah(r, S)],
      tooltipPosition: {
        x: j + C / 2,
        y: $ + M / 2
      }
    });
  });
  return xe({
    data: P,
    layout: y
  }, p);
});
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
}
function NN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function h0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Lw(n.key), n);
  }
}
function LN(e, t, r) {
  return t && h0(e.prototype, t), r && h0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function d0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ot(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? d0(Object(r), !0).forEach(function(n) {
      Uo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Uo(e, t, r) {
  return t = Lw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Lw(e) {
  var t = qN(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function qN(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Eh = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.layout, s = t.children, f = Object.keys(r), l = {
    left: n.left,
    leftMirror: n.left,
    right: o - n.right,
    rightMirror: o - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: u - n.bottom,
    bottomMirror: u - n.bottom
  }, p = !!Ge(s, Tr);
  return f.reduce(function(d, y) {
    var v = r[y], h = v.orientation, g = v.domain, b = v.padding, O = b === void 0 ? {} : b, w = v.mirror, m = v.reversed, x = "".concat(h).concat(w ? "Mirror" : ""), _, P, S, T, E;
    if (v.type === "number" && (v.padding === "gap" || v.padding === "no-gap")) {
      var j = g[1] - g[0], $ = 1 / 0, C = v.categoricalDomain.sort(yA);
      if (C.forEach(function(he, be) {
        be > 0 && ($ = Math.min((he || 0) - (C[be - 1] || 0), $));
      }), Number.isFinite($)) {
        var M = $ / j, k = v.layout === "vertical" ? n.height : n.width;
        if (v.padding === "gap" && (_ = M * k / 2), v.padding === "no-gap") {
          var R = Ne(t.barCategoryGap, M * k), q = M * k / 2;
          _ = q - R - (q - R) / k * R;
        }
      }
    }
    i === "xAxis" ? P = [n.left + (O.left || 0) + (_ || 0), n.left + n.width - (O.right || 0) - (_ || 0)] : i === "yAxis" ? P = c === "horizontal" ? [n.top + n.height - (O.bottom || 0), n.top + (O.top || 0)] : [n.top + (O.top || 0) + (_ || 0), n.top + n.height - (O.bottom || 0) - (_ || 0)] : P = v.range, m && (P = [P[1], P[0]]);
    var B = ZO(v, a, p), U = B.scale, X = B.realScaleType;
    U.domain(g).range(P), JO(U);
    var z = tw(U, ot(ot({}, v), {}, {
      realScaleType: X
    }));
    i === "xAxis" ? (E = h === "top" && !w || h === "bottom" && w, S = n.left, T = l[x] - E * v.height) : i === "yAxis" && (E = h === "left" && !w || h === "right" && w, S = l[x] - E * v.width, T = n.top);
    var Z = ot(ot(ot({}, v), z), {}, {
      realScaleType: X,
      x: S,
      y: T,
      scale: U,
      width: i === "xAxis" ? n.width : v.width,
      height: i === "yAxis" ? n.height : v.height
    });
    return Z.bandSize = La(Z, z), !v.hide && i === "xAxis" ? l[x] += (E ? -1 : 1) * Z.height : v.hide || (l[x] += (E ? -1 : 1) * Z.width), ot(ot({}, d), {}, Uo({}, y, Z));
  }, {});
}, qw = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return {
    x: Math.min(n, a),
    y: Math.min(i, o),
    width: Math.abs(a - n),
    height: Math.abs(o - i)
  };
}, BN = function(t) {
  var r = t.x1, n = t.y1, i = t.x2, a = t.y2;
  return qw({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
}, Bw = /* @__PURE__ */ (function() {
  function e(t) {
    NN(this, e), this.scale = t;
  }
  return LN(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.bandAware, a = n.position;
      if (r !== void 0) {
        if (a)
          switch (a) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o;
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u;
            }
            default:
              return this.scale(r);
          }
        if (i) {
          var c = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + c;
        }
        return this.scale(r);
      }
    }
  }, {
    key: "isInRange",
    value: function(r) {
      var n = this.range(), i = n[0], a = n[n.length - 1];
      return i <= a ? r >= i && r <= a : r >= a && r <= i;
    }
  }], [{
    key: "create",
    value: function(r) {
      return new e(r);
    }
  }]);
})();
Uo(Bw, "EPS", 1e-4);
var Th = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return ot(ot({}, n), {}, Uo({}, i, Bw.create(t[i])));
  }, {});
  return ot(ot({}, r), {}, {
    apply: function(i) {
      var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = a.bandAware, u = a.position;
      return dN(i, function(c, s) {
        return r[s].apply(c, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(i) {
      return kw(i, function(a, o) {
        return r[o].isInRange(a);
      });
    }
  });
};
function FN(e) {
  return (e % 180 + 180) % 180;
}
var WN = function(t) {
  var r = t.width, n = t.height, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = FN(i), o = a * Math.PI / 180, u = Math.atan(n / r), c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(c);
}, Xl, v0;
function zN() {
  if (v0) return Xl;
  v0 = 1;
  var e = gt(), t = qi(), r = So();
  function n(i) {
    return function(a, o, u) {
      var c = Object(a);
      if (!t(a)) {
        var s = e(o, 3);
        a = r(a), o = function(l) {
          return s(c[l], l, c);
        };
      }
      var f = i(a, o, u);
      return f > -1 ? c[s ? a[f] : f] : void 0;
    };
  }
  return Xl = n, Xl;
}
var Yl, y0;
function UN() {
  if (y0) return Yl;
  y0 = 1;
  var e = $w();
  function t(r) {
    var n = e(r), i = n % 1;
    return n === n ? i ? n - i : n : 0;
  }
  return Yl = t, Yl;
}
var Zl, m0;
function KN() {
  if (m0) return Zl;
  m0 = 1;
  var e = Ix(), t = gt(), r = UN(), n = Math.max;
  function i(a, o, u) {
    var c = a == null ? 0 : a.length;
    if (!c)
      return -1;
    var s = u == null ? 0 : r(u);
    return s < 0 && (s = n(c + s, 0)), e(a, t(o, 3), s);
  }
  return Zl = i, Zl;
}
var Jl, g0;
function HN() {
  if (g0) return Jl;
  g0 = 1;
  var e = zN(), t = KN(), r = e(t);
  return Jl = r, Jl;
}
var GN = HN();
const VN = /* @__PURE__ */ ue(GN);
var XN = V0();
const YN = /* @__PURE__ */ ue(XN);
var ZN = YN(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), $h = /* @__PURE__ */ D.createContext(void 0), Mh = /* @__PURE__ */ D.createContext(void 0), Fw = /* @__PURE__ */ D.createContext(void 0), Ww = /* @__PURE__ */ D.createContext({}), zw = /* @__PURE__ */ D.createContext(void 0), Uw = /* @__PURE__ */ D.createContext(0), Kw = /* @__PURE__ */ D.createContext(0), b0 = function(t) {
  var r = t.state, n = r.xAxisMap, i = r.yAxisMap, a = r.offset, o = t.clipPathId, u = t.children, c = t.width, s = t.height, f = ZN(a);
  return /* @__PURE__ */ A.createElement($h.Provider, {
    value: n
  }, /* @__PURE__ */ A.createElement(Mh.Provider, {
    value: i
  }, /* @__PURE__ */ A.createElement(Ww.Provider, {
    value: a
  }, /* @__PURE__ */ A.createElement(Fw.Provider, {
    value: f
  }, /* @__PURE__ */ A.createElement(zw.Provider, {
    value: o
  }, /* @__PURE__ */ A.createElement(Uw.Provider, {
    value: s
  }, /* @__PURE__ */ A.createElement(Kw.Provider, {
    value: c
  }, u)))))));
}, JN = function() {
  return D.useContext(zw);
}, Hw = function(t) {
  var r = D.useContext($h);
  r == null && Or();
  var n = r[t];
  return n == null && Or(), n;
}, QN = function() {
  var t = D.useContext($h);
  return zt(t);
}, e2 = function() {
  var t = D.useContext(Mh), r = VN(t, function(n) {
    return kw(n.domain, Number.isFinite);
  });
  return r || zt(t);
}, Gw = function(t) {
  var r = D.useContext(Mh);
  r == null && Or();
  var n = r[t];
  return n == null && Or(), n;
}, t2 = function() {
  var t = D.useContext(Fw);
  return t;
}, r2 = function() {
  return D.useContext(Ww);
}, Ch = function() {
  return D.useContext(Kw);
}, Ih = function() {
  return D.useContext(Uw);
};
function fn(e) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function n2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function i2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xw(n.key), n);
  }
}
function a2(e, t, r) {
  return t && i2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function o2(e, t, r) {
  return t = oo(t), u2(e, Vw() ? Reflect.construct(t, r || [], oo(e).constructor) : t.apply(e, r));
}
function u2(e, t) {
  if (t && (fn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return c2(e);
}
function c2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Vw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Vw = function() {
    return !!e;
  })();
}
function oo(e) {
  return oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, oo(e);
}
function s2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && fp(e, t);
}
function fp(e, t) {
  return fp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, fp(e, t);
}
function x0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function O0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? x0(Object(r), !0).forEach(function(n) {
      kh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : x0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kh(e, t, r) {
  return t = Xw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xw(e) {
  var t = l2(e, "string");
  return fn(t) == "symbol" ? t : t + "";
}
function l2(e, t) {
  if (fn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function f2(e, t) {
  return v2(e) || d2(e, t) || h2(e, t) || p2();
}
function p2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function h2(e, t) {
  if (e) {
    if (typeof e == "string") return w0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return w0(e, t);
  }
}
function w0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function d2(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function v2(e) {
  if (Array.isArray(e)) return e;
}
function pp() {
  return pp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pp.apply(this, arguments);
}
var y2 = function(t, r) {
  var n;
  return /* @__PURE__ */ A.isValidElement(t) ? n = /* @__PURE__ */ A.cloneElement(t, r) : G(t) ? n = t(r) : n = /* @__PURE__ */ A.createElement("line", pp({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, m2 = function(t, r, n, i, a, o, u, c, s) {
  var f = a.x, l = a.y, p = a.width, d = a.height;
  if (n) {
    var y = s.y, v = t.y.apply(y, {
      position: o
    });
    if (vt(s, "discard") && !t.y.isInRange(v))
      return null;
    var h = [{
      x: f + p,
      y: v
    }, {
      x: f,
      y: v
    }];
    return c === "left" ? h.reverse() : h;
  }
  if (r) {
    var g = s.x, b = t.x.apply(g, {
      position: o
    });
    if (vt(s, "discard") && !t.x.isInRange(b))
      return null;
    var O = [{
      x: b,
      y: l + d
    }, {
      x: b,
      y: l
    }];
    return u === "top" ? O.reverse() : O;
  }
  if (i) {
    var w = s.segment, m = w.map(function(x) {
      return t.apply(x, {
        position: o
      });
    });
    return vt(s, "discard") && lN(m, function(x) {
      return !t.isInRange(x);
    }) ? null : m;
  }
  return null;
};
function g2(e) {
  var t = e.x, r = e.y, n = e.segment, i = e.xAxisId, a = e.yAxisId, o = e.shape, u = e.className, c = e.alwaysShow, s = JN(), f = Hw(i), l = Gw(a), p = t2();
  if (!s || !p)
    return null;
  st(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var d = Th({
    x: f.scale,
    y: l.scale
  }), y = Se(t), v = Se(r), h = n && n.length === 2, g = m2(d, y, v, h, p, e.position, f.orientation, l.orientation, e);
  if (!g)
    return null;
  var b = f2(g, 2), O = b[0], w = O.x, m = O.y, x = b[1], _ = x.x, P = x.y, S = vt(e, "hidden") ? "url(#".concat(s, ")") : void 0, T = O0(O0({
    clipPath: S
  }, K(e, !0)), {}, {
    x1: w,
    y1: m,
    x2: _,
    y2: P
  });
  return /* @__PURE__ */ A.createElement(Q, {
    className: Y("recharts-reference-line", u)
  }, y2(o, T), $e.renderCallByParent(e, BN({
    x1: w,
    y1: m,
    x2: _,
    y2: P
  })));
}
var Rh = /* @__PURE__ */ (function(e) {
  function t() {
    return n2(this, t), o2(this, t, arguments);
  }
  return s2(t, e), a2(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ A.createElement(g2, this.props);
    }
  }]);
})(A.Component);
kh(Rh, "displayName", "ReferenceLine");
kh(Rh, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
});
function hp() {
  return hp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, hp.apply(this, arguments);
}
function pn(e) {
  "@babel/helpers - typeof";
  return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pn(e);
}
function _0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function A0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _0(Object(r), !0).forEach(function(n) {
      Ko(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function b2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function x2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Zw(n.key), n);
  }
}
function O2(e, t, r) {
  return t && x2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function w2(e, t, r) {
  return t = uo(t), _2(e, Yw() ? Reflect.construct(t, r || [], uo(e).constructor) : t.apply(e, r));
}
function _2(e, t) {
  if (t && (pn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return A2(e);
}
function A2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Yw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Yw = function() {
    return !!e;
  })();
}
function uo(e) {
  return uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, uo(e);
}
function P2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && dp(e, t);
}
function dp(e, t) {
  return dp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, dp(e, t);
}
function Ko(e, t, r) {
  return t = Zw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Zw(e) {
  var t = S2(e, "string");
  return pn(t) == "symbol" ? t : t + "";
}
function S2(e, t) {
  if (pn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var j2 = function(t) {
  var r = t.x, n = t.y, i = t.xAxis, a = t.yAxis, o = Th({
    x: i.scale,
    y: a.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return vt(t, "discard") && !o.isInRange(u) ? null : u;
}, Ho = /* @__PURE__ */ (function(e) {
  function t() {
    return b2(this, t), w2(this, t, arguments);
  }
  return P2(t, e), O2(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.r, u = n.alwaysShow, c = n.clipPathId, s = Se(i), f = Se(a);
      if (st(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !s || !f)
        return null;
      var l = j2(this.props);
      if (!l)
        return null;
      var p = l.x, d = l.y, y = this.props, v = y.shape, h = y.className, g = vt(this.props, "hidden") ? "url(#".concat(c, ")") : void 0, b = A0(A0({
        clipPath: g
      }, K(this.props, !0)), {}, {
        cx: p,
        cy: d
      });
      return /* @__PURE__ */ A.createElement(Q, {
        className: Y("recharts-reference-dot", h)
      }, t.renderDot(v, b), $e.renderCallByParent(this.props, {
        x: p - o,
        y: d - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
})(A.Component);
Ko(Ho, "displayName", "ReferenceDot");
Ko(Ho, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
});
Ko(Ho, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ A.isValidElement(e) ? r = /* @__PURE__ */ A.cloneElement(e, t) : G(e) ? r = e(t) : r = /* @__PURE__ */ A.createElement(En, hp({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function vp() {
  return vp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vp.apply(this, arguments);
}
function hn(e) {
  "@babel/helpers - typeof";
  return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hn(e);
}
function P0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function S0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? P0(Object(r), !0).forEach(function(n) {
      Go(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : P0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function E2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function T2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Qw(n.key), n);
  }
}
function $2(e, t, r) {
  return t && T2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function M2(e, t, r) {
  return t = co(t), C2(e, Jw() ? Reflect.construct(t, r || [], co(e).constructor) : t.apply(e, r));
}
function C2(e, t) {
  if (t && (hn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return I2(e);
}
function I2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Jw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Jw = function() {
    return !!e;
  })();
}
function co(e) {
  return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, co(e);
}
function k2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && yp(e, t);
}
function yp(e, t) {
  return yp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, yp(e, t);
}
function Go(e, t, r) {
  return t = Qw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Qw(e) {
  var t = R2(e, "string");
  return hn(t) == "symbol" ? t : t + "";
}
function R2(e, t) {
  if (hn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var D2 = function(t, r, n, i, a) {
  var o = a.x1, u = a.x2, c = a.y1, s = a.y2, f = a.xAxis, l = a.yAxis;
  if (!f || !l) return null;
  var p = Th({
    x: f.scale,
    y: l.scale
  }), d = {
    x: t ? p.x.apply(o, {
      position: "start"
    }) : p.x.rangeMin,
    y: n ? p.y.apply(c, {
      position: "start"
    }) : p.y.rangeMin
  }, y = {
    x: r ? p.x.apply(u, {
      position: "end"
    }) : p.x.rangeMax,
    y: i ? p.y.apply(s, {
      position: "end"
    }) : p.y.rangeMax
  };
  return vt(a, "discard") && (!p.isInRange(d) || !p.isInRange(y)) ? null : qw(d, y);
}, Vo = /* @__PURE__ */ (function(e) {
  function t() {
    return E2(this, t), M2(this, t, arguments);
  }
  return k2(t, e), $2(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x1, a = n.x2, o = n.y1, u = n.y2, c = n.className, s = n.alwaysShow, f = n.clipPathId;
      st(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var l = Se(i), p = Se(a), d = Se(o), y = Se(u), v = this.props.shape;
      if (!l && !p && !d && !y && !v)
        return null;
      var h = D2(l, p, d, y, this.props);
      if (!h && !v)
        return null;
      var g = vt(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
      return /* @__PURE__ */ A.createElement(Q, {
        className: Y("recharts-reference-area", c)
      }, t.renderRect(v, S0(S0({
        clipPath: g
      }, K(this.props, !0)), h)), $e.renderCallByParent(this.props, h));
    }
  }]);
})(A.Component);
Go(Vo, "displayName", "ReferenceArea");
Go(Vo, "defaultProps", {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
});
Go(Vo, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ A.isValidElement(e) ? r = /* @__PURE__ */ A.cloneElement(e, t) : G(e) ? r = e(t) : r = /* @__PURE__ */ A.createElement(Sh, vp({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function e_(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], i = 0; i < e.length; i += t)
    n.push(e[i]);
  return n;
}
function N2(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return WN(n, r);
}
function L2(e, t, r) {
  var n = r === "width", i = e.x, a = e.y, o = e.width, u = e.height;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + u
  } : {
    start: n ? i + o : a + u,
    end: n ? i : a
  };
}
function so(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function q2(e, t) {
  return e_(e, t + 1);
}
function B2(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = t.start, u = t.end, c = 0, s = 1, f = o, l = function() {
    var y = n == null ? void 0 : n[c];
    if (y === void 0)
      return {
        v: e_(n, s)
      };
    var v = c, h, g = function() {
      return h === void 0 && (h = r(y, v)), h;
    }, b = y.coordinate, O = c === 0 || so(e, b, g, f, u);
    O || (c = 0, f = o, s += 1), O && (f = b + e * (g() / 2 + i), c += s);
  }, p; s <= a.length; )
    if (p = l(), p) return p.v;
  return [];
}
function Ri(e) {
  "@babel/helpers - typeof";
  return Ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ri(e);
}
function j0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? j0(Object(r), !0).forEach(function(n) {
      F2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : j0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function F2(e, t, r) {
  return t = W2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function W2(e) {
  var t = z2(e, "string");
  return Ri(t) == "symbol" ? t : t + "";
}
function z2(e, t) {
  if (Ri(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ri(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function U2(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, u = t.start, c = t.end, s = function(p) {
    var d = a[p], y, v = function() {
      return y === void 0 && (y = r(d, p)), y;
    };
    if (p === o - 1) {
      var h = e * (d.coordinate + e * v() / 2 - c);
      a[p] = d = ke(ke({}, d), {}, {
        tickCoord: h > 0 ? d.coordinate - h * e : d.coordinate
      });
    } else
      a[p] = d = ke(ke({}, d), {}, {
        tickCoord: d.coordinate
      });
    var g = so(e, d.tickCoord, v, u, c);
    g && (c = d.tickCoord - e * (v() / 2 + i), a[p] = ke(ke({}, d), {}, {
      isShow: !0
    }));
  }, f = o - 1; f >= 0; f--)
    s(f);
  return a;
}
function K2(e, t, r, n, i, a) {
  var o = (n || []).slice(), u = o.length, c = t.start, s = t.end;
  if (a) {
    var f = n[u - 1], l = r(f, u - 1), p = e * (f.coordinate + e * l / 2 - s);
    o[u - 1] = f = ke(ke({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var d = so(e, f.tickCoord, function() {
      return l;
    }, c, s);
    d && (s = f.tickCoord - e * (l / 2 + i), o[u - 1] = ke(ke({}, f), {}, {
      isShow: !0
    }));
  }
  for (var y = a ? u - 1 : u, v = function(b) {
    var O = o[b], w, m = function() {
      return w === void 0 && (w = r(O, b)), w;
    };
    if (b === 0) {
      var x = e * (O.coordinate - e * m() / 2 - c);
      o[b] = O = ke(ke({}, O), {}, {
        tickCoord: x < 0 ? O.coordinate - x * e : O.coordinate
      });
    } else
      o[b] = O = ke(ke({}, O), {}, {
        tickCoord: O.coordinate
      });
    var _ = so(e, O.tickCoord, m, c, s);
    _ && (c = O.tickCoord + e * (m() / 2 + i), o[b] = ke(ke({}, O), {}, {
      isShow: !0
    }));
  }, h = 0; h < y; h++)
    v(h);
  return o;
}
function Dh(e, t, r) {
  var n = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, u = e.orientation, c = e.interval, s = e.tickFormatter, f = e.unit, l = e.angle;
  if (!i || !i.length || !n)
    return [];
  if (L(c) || bt.isSsr)
    return q2(i, typeof c == "number" && L(c) ? c : 0);
  var p = [], d = u === "top" || u === "bottom" ? "width" : "height", y = f && d === "width" ? Gn(f, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, v = function(O, w) {
    var m = G(s) ? s(O.value, w) : O.value;
    return d === "width" ? N2(Gn(m, {
      fontSize: t,
      letterSpacing: r
    }), y, l) : Gn(m, {
      fontSize: t,
      letterSpacing: r
    })[d];
  }, h = i.length >= 2 ? Me(i[1].coordinate - i[0].coordinate) : 1, g = L2(a, h, d);
  return c === "equidistantPreserveStart" ? B2(h, g, v, i, o) : (c === "preserveStart" || c === "preserveStartEnd" ? p = K2(h, g, v, i, o, c === "preserveStartEnd") : p = U2(h, g, v, i, o), p.filter(function(b) {
    return b.isShow;
  }));
}
var H2 = ["viewBox"], G2 = ["viewBox"], V2 = ["ticks"];
function dn(e) {
  "@babel/helpers - typeof";
  return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, dn(e);
}
function Fr() {
  return Fr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fr.apply(this, arguments);
}
function E0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? E0(Object(r), !0).forEach(function(n) {
      Nh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : E0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ql(e, t) {
  if (e == null) return {};
  var r = X2(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function X2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Y2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function T0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, r_(n.key), n);
  }
}
function Z2(e, t, r) {
  return t && T0(e.prototype, t), r && T0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function J2(e, t, r) {
  return t = lo(t), Q2(e, t_() ? Reflect.construct(t, r || [], lo(e).constructor) : t.apply(e, r));
}
function Q2(e, t) {
  if (t && (dn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return eL(e);
}
function eL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function t_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (t_ = function() {
    return !!e;
  })();
}
function lo(e) {
  return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, lo(e);
}
function tL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mp(e, t);
}
function mp(e, t) {
  return mp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, mp(e, t);
}
function Nh(e, t, r) {
  return t = r_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function r_(e) {
  var t = rL(e, "string");
  return dn(t) == "symbol" ? t : t + "";
}
function rL(e, t) {
  if (dn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (dn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var $n = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return Y2(this, t), n = J2(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return tL(t, e), Z2(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var a = n.viewBox, o = Ql(n, H2), u = this.props, c = u.viewBox, s = Ql(u, G2);
      return !zr(a, c) || !zr(o, s) || !zr(i, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var n = this.layerReference;
      if (n) {
        var i = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
        i && this.setState({
          fontSize: window.getComputedStyle(i).fontSize,
          letterSpacing: window.getComputedStyle(i).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function(n) {
      var i = this.props, a = i.x, o = i.y, u = i.width, c = i.height, s = i.orientation, f = i.tickSize, l = i.mirror, p = i.tickMargin, d, y, v, h, g, b, O = l ? -1 : 1, w = n.tickSize || f, m = L(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (s) {
        case "top":
          d = y = n.coordinate, h = o + +!l * c, v = h - O * w, b = v - O * p, g = m;
          break;
        case "left":
          v = h = n.coordinate, y = a + +!l * u, d = y - O * w, g = d - O * p, b = m;
          break;
        case "right":
          v = h = n.coordinate, y = a + +l * u, d = y + O * w, g = d + O * p, b = m;
          break;
        default:
          d = y = n.coordinate, h = o + +l * c, v = h + O * w, b = v + O * p, g = m;
          break;
      }
      return {
        line: {
          x1: d,
          y1: v,
          x2: y,
          y2: h
        },
        tick: {
          x: g,
          y: b
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var n = this.props, i = n.orientation, a = n.mirror, o;
      switch (i) {
        case "left":
          o = a ? "start" : "end";
          break;
        case "right":
          o = a ? "end" : "start";
          break;
        default:
          o = "middle";
          break;
      }
      return o;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function() {
      var n = this.props, i = n.orientation, a = n.mirror, o = "end";
      switch (i) {
        case "left":
        case "right":
          o = "middle";
          break;
        case "top":
          o = a ? "start" : "end";
          break;
        default:
          o = a ? "end" : "start";
          break;
      }
      return o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.orientation, s = n.mirror, f = n.axisLine, l = Ae(Ae(Ae({}, K(this.props, !1)), K(f, !1)), {}, {
        fill: "none"
      });
      if (c === "top" || c === "bottom") {
        var p = +(c === "top" && !s || c === "bottom" && s);
        l = Ae(Ae({}, l), {}, {
          x1: i,
          y1: a + p * u,
          x2: i + o,
          y2: a + p * u
        });
      } else {
        var d = +(c === "left" && !s || c === "right" && s);
        l = Ae(Ae({}, l), {}, {
          x1: i + d * o,
          y1: a,
          x2: i + d * o,
          y2: a + u
        });
      }
      return /* @__PURE__ */ A.createElement("line", Fr({}, l, {
        className: Y("recharts-cartesian-axis-line", Xe(f, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function(n, i, a) {
        var o = this, u = this.props, c = u.tickLine, s = u.stroke, f = u.tick, l = u.tickFormatter, p = u.unit, d = Dh(Ae(Ae({}, this.props), {}, {
          ticks: n
        }), i, a), y = this.getTickTextAnchor(), v = this.getTickVerticalAnchor(), h = K(this.props, !1), g = K(f, !1), b = Ae(Ae({}, h), {}, {
          fill: "none"
        }, K(c, !1)), O = d.map(function(w, m) {
          var x = o.getTickLineCoord(w), _ = x.line, P = x.tick, S = Ae(Ae(Ae(Ae({
            textAnchor: y,
            verticalAnchor: v
          }, h), {}, {
            stroke: "none",
            fill: s
          }, g), P), {}, {
            index: m,
            payload: w,
            visibleTicksCount: d.length,
            tickFormatter: l
          });
          return /* @__PURE__ */ A.createElement(Q, Fr({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(w.value, "-").concat(w.coordinate, "-").concat(w.tickCoord)
          }, Tt(o.props, w, m)), c && /* @__PURE__ */ A.createElement("line", Fr({}, b, _, {
            className: Y("recharts-cartesian-axis-tick-line", Xe(c, "className"))
          })), f && t.renderTickItem(f, S, "".concat(G(l) ? l(w.value, m) : w.value).concat(p || "")));
        });
        return /* @__PURE__ */ A.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, O);
      }
    )
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.axisLine, o = i.width, u = i.height, c = i.ticksGenerator, s = i.className, f = i.hide;
      if (f)
        return null;
      var l = this.props, p = l.ticks, d = Ql(l, V2), y = p;
      return G(c) && (y = p && p.length > 0 ? c(this.props) : c(d)), o <= 0 || u <= 0 || !y || !y.length ? null : /* @__PURE__ */ A.createElement(Q, {
        className: Y("recharts-cartesian-axis", s),
        ref: function(h) {
          n.layerReference = h;
        }
      }, a && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), $e.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o, u = Y(i.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ A.isValidElement(n) ? o = /* @__PURE__ */ A.cloneElement(n, Ae(Ae({}, i), {}, {
        className: u
      })) : G(n) ? o = n(Ae(Ae({}, i), {}, {
        className: u
      })) : o = /* @__PURE__ */ A.createElement(br, Fr({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), a), o;
    }
  }]);
})(D.Component);
Nh($n, "displayName", "CartesianAxis");
Nh($n, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var nL = ["x1", "y1", "x2", "y2", "key"], iL = ["offset"];
function wr(e) {
  "@babel/helpers - typeof";
  return wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wr(e);
}
function $0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $0(Object(r), !0).forEach(function(n) {
      aL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aL(e, t, r) {
  return t = oL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oL(e) {
  var t = uL(e, "string");
  return wr(t) == "symbol" ? t : t + "";
}
function uL(e, t) {
  if (wr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fr() {
  return fr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fr.apply(this, arguments);
}
function M0(e, t) {
  if (e == null) return {};
  var r = cL(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function cL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var sL = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, i = t.x, a = t.y, o = t.width, u = t.height, c = t.ry;
  return /* @__PURE__ */ A.createElement("rect", {
    x: i,
    y: a,
    ry: c,
    width: o,
    height: u,
    stroke: "none",
    fill: r,
    fillOpacity: n,
    className: "recharts-cartesian-grid-bg"
  });
};
function n_(e, t) {
  var r;
  if (/* @__PURE__ */ A.isValidElement(e))
    r = /* @__PURE__ */ A.cloneElement(e, t);
  else if (G(e))
    r = e(t);
  else {
    var n = t.x1, i = t.y1, a = t.x2, o = t.y2, u = t.key, c = M0(t, nL), s = K(c, !1);
    s.offset;
    var f = M0(s, iL);
    r = /* @__PURE__ */ A.createElement("line", fr({}, f, {
      x1: n,
      y1: i,
      x2: a,
      y2: o,
      fill: "none",
      key: u
    }));
  }
  return r;
}
function lL(e) {
  var t = e.x, r = e.width, n = e.horizontal, i = n === void 0 ? !0 : n, a = e.horizontalPoints;
  if (!i || !a || !a.length)
    return null;
  var o = a.map(function(u, c) {
    var s = Re(Re({}, e), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(c),
      index: c
    });
    return n_(i, s);
  });
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function fL(e) {
  var t = e.y, r = e.height, n = e.vertical, i = n === void 0 ? !0 : n, a = e.verticalPoints;
  if (!i || !a || !a.length)
    return null;
  var o = a.map(function(u, c) {
    var s = Re(Re({}, e), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return n_(i, s);
  });
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function pL(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, i = e.y, a = e.width, o = e.height, u = e.horizontalPoints, c = e.horizontal, s = c === void 0 ? !0 : c;
  if (!s || !t || !t.length)
    return null;
  var f = u.map(function(p) {
    return Math.round(p + i - i);
  }).sort(function(p, d) {
    return p - d;
  });
  i !== f[0] && f.unshift(0);
  var l = f.map(function(p, d) {
    var y = !f[d + 1], v = y ? i + o - p : f[d + 1] - p;
    if (v <= 0)
      return null;
    var h = d % t.length;
    return /* @__PURE__ */ A.createElement("rect", {
      key: "react-".concat(d),
      y: p,
      x: n,
      height: v,
      width: a,
      stroke: "none",
      fill: t[h],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, l);
}
function hL(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, u = e.width, c = e.height, s = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var f = s.map(function(p) {
    return Math.round(p + a - a);
  }).sort(function(p, d) {
    return p - d;
  });
  a !== f[0] && f.unshift(0);
  var l = f.map(function(p, d) {
    var y = !f[d + 1], v = y ? a + u - p : f[d + 1] - p;
    if (v <= 0)
      return null;
    var h = d % n.length;
    return /* @__PURE__ */ A.createElement("rect", {
      key: "react-".concat(d),
      x: p,
      y: o,
      width: v,
      height: c,
      stroke: "none",
      fill: n[h],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, l);
}
var dL = function(t, r) {
  var n = t.xAxis, i = t.width, a = t.height, o = t.offset;
  return YO(Dh(Re(Re(Re({}, $n.defaultProps), n), {}, {
    ticks: St(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.left, o.left + o.width, r);
}, vL = function(t, r) {
  var n = t.yAxis, i = t.width, a = t.height, o = t.offset;
  return YO(Dh(Re(Re(Re({}, $n.defaultProps), n), {}, {
    ticks: St(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.top, o.top + o.height, r);
}, Dr = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function Xo(e) {
  var t, r, n, i, a, o, u = Ch(), c = Ih(), s = r2(), f = Re(Re({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Dr.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Dr.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Dr.horizontal,
    horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : Dr.horizontalFill,
    vertical: (a = e.vertical) !== null && a !== void 0 ? a : Dr.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : Dr.verticalFill,
    x: L(e.x) ? e.x : s.left,
    y: L(e.y) ? e.y : s.top,
    width: L(e.width) ? e.width : s.width,
    height: L(e.height) ? e.height : s.height
  }), l = f.x, p = f.y, d = f.width, y = f.height, v = f.syncWithTicks, h = f.horizontalValues, g = f.verticalValues, b = QN(), O = e2();
  if (!L(d) || d <= 0 || !L(y) || y <= 0 || !L(l) || l !== +l || !L(p) || p !== +p)
    return null;
  var w = f.verticalCoordinatesGenerator || dL, m = f.horizontalCoordinatesGenerator || vL, x = f.horizontalPoints, _ = f.verticalPoints;
  if ((!x || !x.length) && G(m)) {
    var P = h && h.length, S = m({
      yAxis: O ? Re(Re({}, O), {}, {
        ticks: P ? h : O.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, P ? !0 : v);
    st(Array.isArray(S), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(wr(S), "]")), Array.isArray(S) && (x = S);
  }
  if ((!_ || !_.length) && G(w)) {
    var T = g && g.length, E = w({
      xAxis: b ? Re(Re({}, b), {}, {
        ticks: T ? g : b.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, T ? !0 : v);
    st(Array.isArray(E), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(wr(E), "]")), Array.isArray(E) && (_ = E);
  }
  return /* @__PURE__ */ A.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ A.createElement(sL, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), /* @__PURE__ */ A.createElement(lL, fr({}, f, {
    offset: s,
    horizontalPoints: x,
    xAxis: b,
    yAxis: O
  })), /* @__PURE__ */ A.createElement(fL, fr({}, f, {
    offset: s,
    verticalPoints: _,
    xAxis: b,
    yAxis: O
  })), /* @__PURE__ */ A.createElement(pL, fr({}, f, {
    horizontalPoints: x
  })), /* @__PURE__ */ A.createElement(hL, fr({}, f, {
    verticalPoints: _
  })));
}
Xo.displayName = "CartesianGrid";
var yL = ["type", "layout", "connectNulls", "ref"], mL = ["key"];
function vn(e) {
  "@babel/helpers - typeof";
  return vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vn(e);
}
function C0(e, t) {
  if (e == null) return {};
  var r = gL(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Qn() {
  return Qn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qn.apply(this, arguments);
}
function I0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ke(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? I0(Object(r), !0).forEach(function(n) {
      ut(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Nr(e) {
  return wL(e) || OL(e) || xL(e) || bL();
}
function bL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xL(e, t) {
  if (e) {
    if (typeof e == "string") return gp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return gp(e, t);
  }
}
function OL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function wL(e) {
  if (Array.isArray(e)) return gp(e);
}
function gp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _L(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function k0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, a_(n.key), n);
  }
}
function AL(e, t, r) {
  return t && k0(e.prototype, t), r && k0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function PL(e, t, r) {
  return t = fo(t), SL(e, i_() ? Reflect.construct(t, r || [], fo(e).constructor) : t.apply(e, r));
}
function SL(e, t) {
  if (t && (vn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jL(e);
}
function jL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function i_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (i_ = function() {
    return !!e;
  })();
}
function fo(e) {
  return fo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, fo(e);
}
function EL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && bp(e, t);
}
function bp(e, t) {
  return bp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, bp(e, t);
}
function ut(e, t, r) {
  return t = a_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function a_(e) {
  var t = TL(e, "string");
  return vn(t) == "symbol" ? t : t + "";
}
function TL(e, t) {
  if (vn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (vn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Gi = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    _L(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = PL(this, t, [].concat(i)), ut(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), ut(r, "generateSimpleStrokeDasharray", function(o, u) {
      return "".concat(u, "px ").concat(o - u, "px");
    }), ut(r, "getStrokeDasharray", function(o, u, c) {
      var s = c.reduce(function(g, b) {
        return g + b;
      });
      if (!s)
        return r.generateSimpleStrokeDasharray(u, o);
      for (var f = Math.floor(o / s), l = o % s, p = u - o, d = [], y = 0, v = 0; y < c.length; v += c[y], ++y)
        if (v + c[y] > l) {
          d = [].concat(Nr(c.slice(0, y)), [l - v]);
          break;
        }
      var h = d.length % 2 === 0 ? [0, p] : [p];
      return [].concat(Nr(t.repeat(c, f)), Nr(d), h).map(function(g) {
        return "".concat(g, "px");
      }).join(", ");
    }), ut(r, "id", Ar("recharts-line-")), ut(r, "pathRef", function(o) {
      r.mainCurve = o;
    }), ut(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd();
    }), ut(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart();
    }), r;
  }
  return EL(t, e), AL(t, [{
    key: "componentDidMount",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        this.setState({
          totalLength: n
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      if (this.props.isAnimationActive) {
        var n = this.getTotalLength();
        n !== this.state.totalLength && this.setState({
          totalLength: n
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function() {
      var n = this.mainCurve;
      try {
        return n && n.getTotalLength && n.getTotalLength() || 0;
      } catch {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.points, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = We(f, Ui);
      if (!l)
        return null;
      var p = function(v, h) {
        return {
          x: v.x,
          y: v.y,
          value: v.value,
          errorVal: ve(v.payload, h)
        };
      }, d = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ A.createElement(Q, d, l.map(function(y) {
        return /* @__PURE__ */ A.cloneElement(y, {
          key: "bar-".concat(y.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          dataPointFormatter: p
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive;
      if (o && !this.state.isAnimationFinished)
        return null;
      var u = this.props, c = u.dot, s = u.points, f = u.dataKey, l = K(this.props, !1), p = K(c, !0), d = s.map(function(v, h) {
        var g = Ke(Ke(Ke({
          key: "dot-".concat(h),
          r: 3
        }, l), p), {}, {
          index: h,
          cx: v.x,
          cy: v.y,
          value: v.value,
          dataKey: f,
          payload: v.payload,
          points: s
        });
        return t.renderDotItem(c, g);
      }), y = {
        clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
      };
      return /* @__PURE__ */ A.createElement(Q, Qn({
        className: "recharts-line-dots",
        key: "dots"
      }, y), d);
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, a, o) {
      var u = this.props, c = u.type, s = u.layout, f = u.connectNulls;
      u.ref;
      var l = C0(u, yL), p = Ke(Ke(Ke({}, K(l, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: i ? "url(#clipPath-".concat(a, ")") : null,
        points: n
      }, o), {}, {
        type: c,
        layout: s,
        connectNulls: f
      });
      return /* @__PURE__ */ A.createElement(yr, Qn({}, p, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(n, i) {
      var a = this, o = this.props, u = o.points, c = o.strokeDasharray, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, p = o.animationEasing, d = o.animationId, y = o.animateNewValues, v = o.width, h = o.height, g = this.state, b = g.prevPoints, O = g.totalLength;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: f,
        duration: l,
        isActive: s,
        easing: p,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(d),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(w) {
        var m = w.t;
        if (b) {
          var x = b.length / u.length, _ = u.map(function(j, $) {
            var C = Math.floor($ * x);
            if (b[C]) {
              var M = b[C], k = pe(M.x, j.x), R = pe(M.y, j.y);
              return Ke(Ke({}, j), {}, {
                x: k(m),
                y: R(m)
              });
            }
            if (y) {
              var q = pe(v * 2, j.x), B = pe(h / 2, j.y);
              return Ke(Ke({}, j), {}, {
                x: q(m),
                y: B(m)
              });
            }
            return Ke(Ke({}, j), {}, {
              x: j.x,
              y: j.y
            });
          });
          return a.renderCurveStatically(_, n, i);
        }
        var P = pe(0, O), S = P(m), T;
        if (c) {
          var E = "".concat(c).split(/[,\s]+/gim).map(function(j) {
            return parseFloat(j);
          });
          T = a.getStrokeDasharray(S, O, E);
        } else
          T = a.generateSimpleStrokeDasharray(O, S);
        return a.renderCurveStatically(u, n, i, {
          strokeDasharray: T
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function(n, i) {
      var a = this.props, o = a.points, u = a.isAnimationActive, c = this.state, s = c.prevPoints, f = c.totalLength;
      return u && o && o.length && (!s && f > 0 || !It(s, o)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(o, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.xAxis, f = i.yAxis, l = i.top, p = i.left, d = i.width, y = i.height, v = i.isAnimationActive, h = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, b = u.length === 1, O = Y("recharts-line", c), w = s && s.allowDataOverflow, m = f && f.allowDataOverflow, x = w || m, _ = J(h) ? this.id : h, P = (n = K(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, S = P.r, T = S === void 0 ? 3 : S, E = P.strokeWidth, j = E === void 0 ? 2 : E, $ = Q0(o) ? o : {}, C = $.clipDot, M = C === void 0 ? !0 : C, k = T * 2 + j;
      return /* @__PURE__ */ A.createElement(Q, {
        className: O
      }, w || m ? /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, /* @__PURE__ */ A.createElement("rect", {
        x: w ? p : p - d / 2,
        y: m ? l : l - y / 2,
        width: w ? d : d * 2,
        height: m ? y : y * 2
      })), !M && /* @__PURE__ */ A.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, /* @__PURE__ */ A.createElement("rect", {
        x: p - k / 2,
        y: l - k / 2,
        width: d + k,
        height: y + k
      }))) : null, !b && this.renderCurve(x, _), this.renderErrorBar(x, _), (b || o) && this.renderDots(x, M, _), (!v || g) && rt.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        prevPoints: i.curPoints
      } : n.points !== i.curPoints ? {
        curPoints: n.points
      } : null;
    }
  }, {
    key: "repeat",
    value: function(n, i) {
      for (var a = n.length % 2 !== 0 ? [].concat(Nr(n), [0]) : n, o = [], u = 0; u < i; ++u)
        o = [].concat(Nr(o), Nr(a));
      return o;
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (/* @__PURE__ */ A.isValidElement(n))
        a = /* @__PURE__ */ A.cloneElement(n, i);
      else if (G(n))
        a = n(i);
      else {
        var o = i.key, u = C0(i, mL), c = Y("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        a = /* @__PURE__ */ A.createElement(En, Qn({
          key: o
        }, u, {
          className: c
        }));
      }
      return a;
    }
  }]);
})(D.PureComponent);
ut(Gi, "displayName", "Line");
ut(Gi, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !bt.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
ut(Gi, "getComposedData", function(e) {
  var t = e.props, r = e.xAxis, n = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, u = e.bandSize, c = e.displayedData, s = e.offset, f = t.layout, l = c.map(function(p, d) {
    var y = ve(p, o);
    return f === "horizontal" ? {
      x: Da({
        axis: r,
        ticks: i,
        bandSize: u,
        entry: p,
        index: d
      }),
      y: J(y) ? null : n.scale(y),
      value: y,
      payload: p
    } : {
      x: J(y) ? null : r.scale(y),
      y: Da({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: p,
        index: d
      }),
      value: y,
      payload: p
    };
  });
  return Ke({
    points: l,
    layout: f
  }, s);
});
var $L = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], ML = ["key"], o_;
function yn(e) {
  "@babel/helpers - typeof";
  return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yn(e);
}
function u_(e, t) {
  if (e == null) return {};
  var r = CL(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function CL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function pr() {
  return pr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pr.apply(this, arguments);
}
function R0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ft(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? R0(Object(r), !0).forEach(function(n) {
      ht(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : R0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function IL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function D0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, s_(n.key), n);
  }
}
function kL(e, t, r) {
  return t && D0(e.prototype, t), r && D0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function RL(e, t, r) {
  return t = po(t), DL(e, c_() ? Reflect.construct(t, r || [], po(e).constructor) : t.apply(e, r));
}
function DL(e, t) {
  if (t && (yn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return NL(e);
}
function NL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function c_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (c_ = function() {
    return !!e;
  })();
}
function po(e) {
  return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, po(e);
}
function LL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xp(e, t);
}
function xp(e, t) {
  return xp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, xp(e, t);
}
function ht(e, t, r) {
  return t = s_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function s_(e) {
  var t = qL(e, "string");
  return yn(t) == "symbol" ? t : t + "";
}
function qL(e, t) {
  if (yn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Jt = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    IL(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = RL(this, t, [].concat(i)), ht(r, "state", {
      isAnimationFinished: !0
    }), ht(r, "id", Ar("recharts-area-")), ht(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), ht(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), r;
  }
  return LL(t, e), kL(t, [{
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive, u = this.state.isAnimationFinished;
      if (o && !u)
        return null;
      var c = this.props, s = c.dot, f = c.points, l = c.dataKey, p = K(this.props, !1), d = K(s, !0), y = f.map(function(h, g) {
        var b = Ft(Ft(Ft({
          key: "dot-".concat(g),
          r: 3
        }, p), d), {}, {
          index: g,
          cx: h.x,
          cy: h.y,
          dataKey: l,
          value: h.value,
          payload: h.payload,
          points: f
        });
        return t.renderDotItem(s, b);
      }), v = {
        clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
      };
      return /* @__PURE__ */ A.createElement(Q, pr({
        className: "recharts-area-dots"
      }, v), y);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].x, s = o[o.length - 1].x, f = n * Math.abs(c - s), l = Ut(o.map(function(p) {
        return p.y || 0;
      }));
      return L(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Ut(a.map(function(p) {
        return p.y || 0;
      })), l)), L(l) ? /* @__PURE__ */ A.createElement("rect", {
        x: c < s ? c : c - f,
        y: 0,
        width: f,
        height: Math.floor(l + (u ? parseInt("".concat(u), 10) : 1))
      }) : null;
    }
  }, {
    key: "renderVerticalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].y, s = o[o.length - 1].y, f = n * Math.abs(c - s), l = Ut(o.map(function(p) {
        return p.x || 0;
      }));
      return L(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Ut(a.map(function(p) {
        return p.x || 0;
      })), l)), L(l) ? /* @__PURE__ */ A.createElement("rect", {
        x: 0,
        y: c < s ? c : c - f,
        width: l + (u ? parseInt("".concat(u), 10) : 1),
        height: Math.floor(f)
      }) : null;
    }
  }, {
    key: "renderClipRect",
    value: function(n) {
      var i = this.props.layout;
      return i === "vertical" ? this.renderVerticalRect(n) : this.renderHorizontalRect(n);
    }
  }, {
    key: "renderAreaStatically",
    value: function(n, i, a, o) {
      var u = this.props, c = u.layout, s = u.type, f = u.stroke, l = u.connectNulls, p = u.isRange;
      u.ref;
      var d = u_(u, $L);
      return /* @__PURE__ */ A.createElement(Q, {
        clipPath: a ? "url(#clipPath-".concat(o, ")") : null
      }, /* @__PURE__ */ A.createElement(yr, pr({}, K(d, !0), {
        points: n,
        connectNulls: l,
        type: s,
        baseLine: i,
        layout: c,
        stroke: "none",
        className: "recharts-area-area"
      })), f !== "none" && /* @__PURE__ */ A.createElement(yr, pr({}, K(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: n
      })), f !== "none" && p && /* @__PURE__ */ A.createElement(yr, pr({}, K(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: i
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function(n, i) {
      var a = this, o = this.props, u = o.points, c = o.baseLine, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, p = o.animationEasing, d = o.animationId, y = this.state, v = y.prevPoints, h = y.prevBaseLine;
      return /* @__PURE__ */ A.createElement(Ye, {
        begin: f,
        duration: l,
        isActive: s,
        easing: p,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(d),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(g) {
        var b = g.t;
        if (v) {
          var O = v.length / u.length, w = u.map(function(P, S) {
            var T = Math.floor(S * O);
            if (v[T]) {
              var E = v[T], j = pe(E.x, P.x), $ = pe(E.y, P.y);
              return Ft(Ft({}, P), {}, {
                x: j(b),
                y: $(b)
              });
            }
            return P;
          }), m;
          if (L(c) && typeof c == "number") {
            var x = pe(h, c);
            m = x(b);
          } else if (J(c) || _n(c)) {
            var _ = pe(h, 0);
            m = _(b);
          } else
            m = c.map(function(P, S) {
              var T = Math.floor(S * O);
              if (h[T]) {
                var E = h[T], j = pe(E.x, P.x), $ = pe(E.y, P.y);
                return Ft(Ft({}, P), {}, {
                  x: j(b),
                  y: $(b)
                });
              }
              return P;
            });
          return a.renderAreaStatically(w, m, n, i);
        }
        return /* @__PURE__ */ A.createElement(Q, null, /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("clipPath", {
          id: "animationClipPath-".concat(i)
        }, a.renderClipRect(b))), /* @__PURE__ */ A.createElement(Q, {
          clipPath: "url(#animationClipPath-".concat(i, ")")
        }, a.renderAreaStatically(u, c, n, i)));
      });
    }
  }, {
    key: "renderArea",
    value: function(n, i) {
      var a = this.props, o = a.points, u = a.baseLine, c = a.isAnimationActive, s = this.state, f = s.prevPoints, l = s.prevBaseLine, p = s.totalLength;
      return c && o && o.length && (!f && p > 0 || !It(f, o) || !It(l, u)) ? this.renderAreaWithAnimation(n, i) : this.renderAreaStatically(o, u, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.top, f = i.left, l = i.xAxis, p = i.yAxis, d = i.width, y = i.height, v = i.isAnimationActive, h = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, b = u.length === 1, O = Y("recharts-area", c), w = l && l.allowDataOverflow, m = p && p.allowDataOverflow, x = w || m, _ = J(h) ? this.id : h, P = (n = K(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, S = P.r, T = S === void 0 ? 3 : S, E = P.strokeWidth, j = E === void 0 ? 2 : E, $ = Q0(o) ? o : {}, C = $.clipDot, M = C === void 0 ? !0 : C, k = T * 2 + j;
      return /* @__PURE__ */ A.createElement(Q, {
        className: O
      }, w || m ? /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("clipPath", {
        id: "clipPath-".concat(_)
      }, /* @__PURE__ */ A.createElement("rect", {
        x: w ? f : f - d / 2,
        y: m ? s : s - y / 2,
        width: w ? d : d * 2,
        height: m ? y : y * 2
      })), !M && /* @__PURE__ */ A.createElement("clipPath", {
        id: "clipPath-dots-".concat(_)
      }, /* @__PURE__ */ A.createElement("rect", {
        x: f - k / 2,
        y: s - k / 2,
        width: d + k,
        height: y + k
      }))) : null, b ? null : this.renderArea(x, _), (o || b) && this.renderDots(x, M, _), (!v || g) && rt.renderCallByParent(this.props, u));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      return n.animationId !== i.prevAnimationId ? {
        prevAnimationId: n.animationId,
        curPoints: n.points,
        curBaseLine: n.baseLine,
        prevPoints: i.curPoints,
        prevBaseLine: i.curBaseLine
      } : n.points !== i.curPoints || n.baseLine !== i.curBaseLine ? {
        curPoints: n.points,
        curBaseLine: n.baseLine
      } : null;
    }
  }]);
})(D.PureComponent);
o_ = Jt;
ht(Jt, "displayName", "Area");
ht(Jt, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: !1,
  // points of area
  points: [],
  dot: !1,
  activeDot: !0,
  hide: !1,
  isAnimationActive: !bt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
ht(Jt, "getBaseValue", function(e, t, r, n) {
  var i = e.layout, a = e.baseValue, o = t.props.baseValue, u = o ?? a;
  if (L(u) && typeof u == "number")
    return u;
  var c = i === "horizontal" ? n : r, s = c.scale.domain();
  if (c.type === "number") {
    var f = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
    return u === "dataMin" ? l : u === "dataMax" || f < 0 ? f : Math.max(Math.min(s[0], s[1]), 0);
  }
  return u === "dataMin" ? s[0] : u === "dataMax" ? s[1] : s[0];
});
ht(Jt, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.xAxis, i = e.yAxis, a = e.xAxisTicks, o = e.yAxisTicks, u = e.bandSize, c = e.dataKey, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, p = e.offset, d = t.layout, y = s && s.length, v = o_.getBaseValue(t, r, n, i), h = d === "horizontal", g = !1, b = l.map(function(w, m) {
    var x;
    y ? x = s[f + m] : (x = ve(w, c), Array.isArray(x) ? g = !0 : x = [v, x]);
    var _ = x[1] == null || y && ve(w, c) == null;
    return h ? {
      x: Da({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: w,
        index: m
      }),
      y: _ ? null : i.scale(x[1]),
      value: x,
      payload: w
    } : {
      x: _ ? null : n.scale(x[1]),
      y: Da({
        axis: i,
        ticks: o,
        bandSize: u,
        entry: w,
        index: m
      }),
      value: x,
      payload: w
    };
  }), O;
  return y || g ? O = b.map(function(w) {
    var m = Array.isArray(w.value) ? w.value[0] : null;
    return h ? {
      x: w.x,
      y: m != null && w.y != null ? i.scale(m) : null
    } : {
      x: m != null ? n.scale(m) : null,
      y: w.y
    };
  }) : O = h ? i.scale(v) : n.scale(v), Ft({
    points: b,
    baseLine: O,
    layout: d,
    isRange: g
  }, p);
});
ht(Jt, "renderDotItem", function(e, t) {
  var r;
  if (/* @__PURE__ */ A.isValidElement(e))
    r = /* @__PURE__ */ A.cloneElement(e, t);
  else if (G(e))
    r = e(t);
  else {
    var n = Y("recharts-area-dot", typeof e != "boolean" ? e.className : ""), i = t.key, a = u_(t, ML);
    r = /* @__PURE__ */ A.createElement(En, pr({}, a, {
      key: i,
      className: n
    }));
  }
  return r;
});
function mn(e) {
  "@babel/helpers - typeof";
  return mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mn(e);
}
function BL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function FL(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, p_(n.key), n);
  }
}
function WL(e, t, r) {
  return t && FL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function zL(e, t, r) {
  return t = ho(t), UL(e, l_() ? Reflect.construct(t, r || [], ho(e).constructor) : t.apply(e, r));
}
function UL(e, t) {
  if (t && (mn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return KL(e);
}
function KL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function l_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (l_ = function() {
    return !!e;
  })();
}
function ho(e) {
  return ho = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ho(e);
}
function HL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Op(e, t);
}
function Op(e, t) {
  return Op = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Op(e, t);
}
function f_(e, t, r) {
  return t = p_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function p_(e) {
  var t = GL(e, "string");
  return mn(t) == "symbol" ? t : t + "";
}
function GL(e, t) {
  if (mn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function wp() {
  return wp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, wp.apply(this, arguments);
}
function VL(e) {
  var t = e.xAxisId, r = Ch(), n = Ih(), i = Hw(t);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ D.createElement($n, wp({}, i, {
      className: Y("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(o) {
        return St(o, !0);
      }
    }))
  );
}
var Rt = /* @__PURE__ */ (function(e) {
  function t() {
    return BL(this, t), zL(this, t, arguments);
  }
  return HL(t, e), WL(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ D.createElement(VL, this.props);
    }
  }]);
})(D.Component);
f_(Rt, "displayName", "XAxis");
f_(Rt, "defaultProps", {
  allowDecimals: !0,
  hide: !1,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1,
  allowDuplicatedCategory: !0
});
function gn(e) {
  "@babel/helpers - typeof";
  return gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gn(e);
}
function XL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function YL(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, v_(n.key), n);
  }
}
function ZL(e, t, r) {
  return t && YL(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function JL(e, t, r) {
  return t = vo(t), QL(e, h_() ? Reflect.construct(t, r || [], vo(e).constructor) : t.apply(e, r));
}
function QL(e, t) {
  if (t && (gn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return eq(e);
}
function eq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function h_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (h_ = function() {
    return !!e;
  })();
}
function vo(e) {
  return vo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, vo(e);
}
function tq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _p(e, t);
}
function _p(e, t) {
  return _p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, _p(e, t);
}
function d_(e, t, r) {
  return t = v_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v_(e) {
  var t = rq(e, "string");
  return gn(t) == "symbol" ? t : t + "";
}
function rq(e, t) {
  if (gn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Ap() {
  return Ap = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ap.apply(this, arguments);
}
var nq = function(t) {
  var r = t.yAxisId, n = Ch(), i = Ih(), a = Gw(r);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ D.createElement($n, Ap({}, a, {
      className: Y("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return St(u, !0);
      }
    }))
  );
}, Mn = /* @__PURE__ */ (function(e) {
  function t() {
    return XL(this, t), JL(this, t, arguments);
  }
  return tq(t, e), ZL(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ D.createElement(nq, this.props);
    }
  }]);
})(D.Component);
d_(Mn, "displayName", "YAxis");
d_(Mn, "defaultProps", {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: !1,
  scale: "auto",
  reversed: !1
});
function N0(e) {
  return uq(e) || oq(e) || aq(e) || iq();
}
function iq() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aq(e, t) {
  if (e) {
    if (typeof e == "string") return Pp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pp(e, t);
  }
}
function oq(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function uq(e) {
  if (Array.isArray(e)) return Pp(e);
}
function Pp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Sp = function(t, r, n, i, a) {
  var o = We(t, Rh), u = We(t, Ho), c = [].concat(N0(o), N0(u)), s = We(t, Vo), f = "".concat(i, "Id"), l = i[0], p = r;
  if (c.length && (p = c.reduce(function(v, h) {
    if (h.props[f] === n && vt(h.props, "extendDomain") && L(h.props[l])) {
      var g = h.props[l];
      return [Math.min(v[0], g), Math.max(v[1], g)];
    }
    return v;
  }, p)), s.length) {
    var d = "".concat(l, "1"), y = "".concat(l, "2");
    p = s.reduce(function(v, h) {
      if (h.props[f] === n && vt(h.props, "extendDomain") && L(h.props[d]) && L(h.props[y])) {
        var g = h.props[d], b = h.props[y];
        return [Math.min(v[0], g, b), Math.max(v[1], g, b)];
      }
      return v;
    }, p);
  }
  return a && a.length && (p = a.reduce(function(v, h) {
    return L(h) ? [Math.min(v[0], h), Math.max(v[1], h)] : v;
  }, p)), p;
}, ef = { exports: {} }, L0;
function cq() {
  return L0 || (L0 = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(c, s, f) {
      this.fn = c, this.context = s, this.once = f || !1;
    }
    function a(c, s, f, l, p) {
      if (typeof f != "function")
        throw new TypeError("The listener must be a function");
      var d = new i(f, l || c, p), y = r ? r + s : s;
      return c._events[y] ? c._events[y].fn ? c._events[y] = [c._events[y], d] : c._events[y].push(d) : (c._events[y] = d, c._eventsCount++), c;
    }
    function o(c, s) {
      --c._eventsCount === 0 ? c._events = new n() : delete c._events[s];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var s = [], f, l;
      if (this._eventsCount === 0) return s;
      for (l in f = this._events)
        t.call(f, l) && s.push(r ? l.slice(1) : l);
      return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(f)) : s;
    }, u.prototype.listeners = function(s) {
      var f = r ? r + s : s, l = this._events[f];
      if (!l) return [];
      if (l.fn) return [l.fn];
      for (var p = 0, d = l.length, y = new Array(d); p < d; p++)
        y[p] = l[p].fn;
      return y;
    }, u.prototype.listenerCount = function(s) {
      var f = r ? r + s : s, l = this._events[f];
      return l ? l.fn ? 1 : l.length : 0;
    }, u.prototype.emit = function(s, f, l, p, d, y) {
      var v = r ? r + s : s;
      if (!this._events[v]) return !1;
      var h = this._events[v], g = arguments.length, b, O;
      if (h.fn) {
        switch (h.once && this.removeListener(s, h.fn, void 0, !0), g) {
          case 1:
            return h.fn.call(h.context), !0;
          case 2:
            return h.fn.call(h.context, f), !0;
          case 3:
            return h.fn.call(h.context, f, l), !0;
          case 4:
            return h.fn.call(h.context, f, l, p), !0;
          case 5:
            return h.fn.call(h.context, f, l, p, d), !0;
          case 6:
            return h.fn.call(h.context, f, l, p, d, y), !0;
        }
        for (O = 1, b = new Array(g - 1); O < g; O++)
          b[O - 1] = arguments[O];
        h.fn.apply(h.context, b);
      } else {
        var w = h.length, m;
        for (O = 0; O < w; O++)
          switch (h[O].once && this.removeListener(s, h[O].fn, void 0, !0), g) {
            case 1:
              h[O].fn.call(h[O].context);
              break;
            case 2:
              h[O].fn.call(h[O].context, f);
              break;
            case 3:
              h[O].fn.call(h[O].context, f, l);
              break;
            case 4:
              h[O].fn.call(h[O].context, f, l, p);
              break;
            default:
              if (!b) for (m = 1, b = new Array(g - 1); m < g; m++)
                b[m - 1] = arguments[m];
              h[O].fn.apply(h[O].context, b);
          }
      }
      return !0;
    }, u.prototype.on = function(s, f, l) {
      return a(this, s, f, l, !1);
    }, u.prototype.once = function(s, f, l) {
      return a(this, s, f, l, !0);
    }, u.prototype.removeListener = function(s, f, l, p) {
      var d = r ? r + s : s;
      if (!this._events[d]) return this;
      if (!f)
        return o(this, d), this;
      var y = this._events[d];
      if (y.fn)
        y.fn === f && (!p || y.once) && (!l || y.context === l) && o(this, d);
      else {
        for (var v = 0, h = [], g = y.length; v < g; v++)
          (y[v].fn !== f || p && !y[v].once || l && y[v].context !== l) && h.push(y[v]);
        h.length ? this._events[d] = h.length === 1 ? h[0] : h : o(this, d);
      }
      return this;
    }, u.prototype.removeAllListeners = function(s) {
      var f;
      return s ? (f = r ? r + s : s, this._events[f] && o(this, f)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(ef)), ef.exports;
}
var sq = cq();
const lq = /* @__PURE__ */ ue(sq);
var tf = new lq(), rf = "recharts.syncMouseEvents";
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function fq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, y_(n.key), n);
  }
}
function hq(e, t, r) {
  return t && pq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nf(e, t, r) {
  return t = y_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function y_(e) {
  var t = dq(e, "string");
  return Di(t) == "symbol" ? t : t + "";
}
function dq(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var vq = /* @__PURE__ */ (function() {
  function e() {
    fq(this, e), nf(this, "activeIndex", 0), nf(this, "coordinateList", []), nf(this, "layout", "horizontal");
  }
  return hq(e, [{
    key: "setDetails",
    value: function(r) {
      var n, i = r.coordinateList, a = i === void 0 ? null : i, o = r.container, u = o === void 0 ? null : o, c = r.layout, s = c === void 0 ? null : c, f = r.offset, l = f === void 0 ? null : f, p = r.mouseHandlerCallback, d = p === void 0 ? null : p;
      this.coordinateList = (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = l ?? this.offset, this.mouseHandlerCallback = d ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0)
        switch (r.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var i = this.container.getBoundingClientRect(), a = i.x, o = i.y, u = i.height, c = this.coordinateList[this.activeIndex].coordinate, s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, l = a + c + s, p = o + this.offset.top + u / 2 + f;
        this.mouseHandlerCallback({
          pageX: l,
          pageY: p
        });
      }
    }
  }]);
})();
function yq(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0], i = e == null ? void 0 : e[1];
    if (n && i && L(n) && L(i))
      return !0;
  }
  return !1;
}
function mq(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function m_(e) {
  var t = e.cx, r = e.cy, n = e.radius, i = e.startAngle, a = e.endAngle, o = ne(t, r, n, i), u = ne(t, r, n, a);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
function gq(e, t, r) {
  var n, i, a, o;
  if (e === "horizontal")
    n = t.x, a = n, i = r.top, o = r.top + r.height;
  else if (e === "vertical")
    i = t.y, o = i, n = r.left, a = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx, c = t.cy, s = t.innerRadius, f = t.outerRadius, l = t.angle, p = ne(u, c, s, l), d = ne(u, c, f, l);
      n = p.x, i = p.y, a = d.x, o = d.y;
    } else
      return m_(t);
  return [{
    x: n,
    y: i
  }, {
    x: a,
    y: o
  }];
}
function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ni(e);
}
function q0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ua(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? q0(Object(r), !0).forEach(function(n) {
      bq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : q0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bq(e, t, r) {
  return t = xq(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xq(e) {
  var t = Oq(e, "string");
  return Ni(t) == "symbol" ? t : t + "";
}
function Oq(e, t) {
  if (Ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wq(e) {
  var t, r, n = e.element, i = e.tooltipEventType, a = e.isActive, o = e.activeCoordinate, u = e.activePayload, c = e.offset, s = e.activeTooltipIndex, f = e.tooltipAxisBandSize, l = e.layout, p = e.chartName, d = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !d || !a || !o || p !== "ScatterChart" && i !== "axis")
    return null;
  var y, v = yr;
  if (p === "ScatterChart")
    y = o, v = Xk;
  else if (p === "BarChart")
    y = mq(l, o, c, f), v = Sh;
  else if (l === "radial") {
    var h = m_(o), g = h.cx, b = h.cy, O = h.radius, w = h.startAngle, m = h.endAngle;
    y = {
      cx: g,
      cy: b,
      startAngle: w,
      endAngle: m,
      innerRadius: O,
      outerRadius: O
    }, v = lw;
  } else
    y = {
      points: gq(l, o, c)
    }, v = yr;
  var x = ua(ua(ua(ua({
    stroke: "#ccc",
    pointerEvents: "none"
  }, c), y), K(d, !1)), {}, {
    payload: u,
    payloadIndex: s,
    className: Y("recharts-tooltip-cursor", d.className)
  });
  return /* @__PURE__ */ D.isValidElement(d) ? /* @__PURE__ */ D.cloneElement(d, x) : /* @__PURE__ */ D.createElement(v, x);
}
var _q = ["item"], Aq = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function bn(e) {
  "@babel/helpers - typeof";
  return bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bn(e);
}
function Wr() {
  return Wr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wr.apply(this, arguments);
}
function B0(e, t) {
  return jq(e) || Sq(e, t) || b_(e, t) || Pq();
}
function Pq() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Sq(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], c = !0, s = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(c = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); c = !0) ;
    } catch (f) {
      s = !0, i = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return u;
  }
}
function jq(e) {
  if (Array.isArray(e)) return e;
}
function F0(e, t) {
  if (e == null) return {};
  var r = Eq(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Eq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Tq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function $q(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, x_(n.key), n);
  }
}
function Mq(e, t, r) {
  return t && $q(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Cq(e, t, r) {
  return t = yo(t), Iq(e, g_() ? Reflect.construct(t, r || [], yo(e).constructor) : t.apply(e, r));
}
function Iq(e, t) {
  if (t && (bn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kq(e);
}
function kq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function g_() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (g_ = function() {
    return !!e;
  })();
}
function yo(e) {
  return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, yo(e);
}
function Rq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && jp(e, t);
}
function jp(e, t) {
  return jp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, jp(e, t);
}
function xn(e) {
  return Lq(e) || Nq(e) || b_(e) || Dq();
}
function Dq() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function b_(e, t) {
  if (e) {
    if (typeof e == "string") return Ep(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ep(e, t);
  }
}
function Nq(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Lq(e) {
  if (Array.isArray(e)) return Ep(e);
}
function Ep(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function W0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function I(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? W0(Object(r), !0).forEach(function(n) {
      V(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : W0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function V(e, t, r) {
  return t = x_(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function x_(e) {
  var t = qq(e, "string");
  return bn(t) == "symbol" ? t : t + "";
}
function qq(e, t) {
  if (bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bq = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, Fq = {
  width: "100%",
  height: "100%"
}, O_ = {
  x: 0,
  y: 0
};
function ca(e) {
  return e;
}
var Wq = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, zq = function(t, r, n, i) {
  var a = r.find(function(f) {
    return f && f.index === n;
  });
  if (a) {
    if (t === "horizontal")
      return {
        x: a.coordinate,
        y: i.y
      };
    if (t === "vertical")
      return {
        x: i.x,
        y: a.coordinate
      };
    if (t === "centric") {
      var o = a.coordinate, u = i.radius;
      return I(I(I({}, i), ne(i.cx, i.cy, u, o)), {}, {
        angle: o,
        radius: u
      });
    }
    var c = a.coordinate, s = i.angle;
    return I(I(I({}, i), ne(i.cx, i.cy, c, s)), {}, {
      angle: s,
      radius: c
    });
  }
  return O_;
}, Yo = function(t, r) {
  var n = r.graphicalItems, i = r.dataStartIndex, a = r.dataEndIndex, o = (n ?? []).reduce(function(u, c) {
    var s = c.props.data;
    return s && s.length ? [].concat(xn(u), xn(s)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && L(i) && L(a) ? t.slice(i, a + 1) : [];
};
function w_(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var Tp = function(t, r, n, i) {
  var a = t.graphicalItems, o = t.tooltipAxis, u = Yo(r, t);
  return n < 0 || !a || !a.length || n >= u.length ? null : a.reduce(function(c, s) {
    var f, l = (f = s.props.data) !== null && f !== void 0 ? f : r;
    l && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var p;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var d = l === void 0 ? u : l;
      p = la(d, o.dataKey, i);
    } else
      p = l && l[n] || u[n];
    return p ? [].concat(xn(c), [Ah(s, p)]) : c;
  }, []);
}, z0 = function(t, r, n, i) {
  var a = i || {
    x: t.chartX,
    y: t.chartY
  }, o = Wq(a, n), u = t.orderedTooltipTicks, c = t.tooltipAxis, s = t.tooltipTicks, f = wM(o, u, s, c);
  if (f >= 0 && s) {
    var l = s[f] && s[f].value, p = Tp(t, r, f, l), d = zq(n, u, f, a);
    return {
      activeTooltipIndex: f,
      activeLabel: l,
      activePayload: p,
      activeCoordinate: d
    };
  }
  return null;
}, Uq = function(t, r) {
  var n = r.axes, i = r.graphicalItems, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, p = t.stackOffset, d = XO(f, a);
  return n.reduce(function(y, v) {
    var h, g = v.type.defaultProps !== void 0 ? I(I({}, v.type.defaultProps), v.props) : v.props, b = g.type, O = g.dataKey, w = g.allowDataOverflow, m = g.allowDuplicatedCategory, x = g.scale, _ = g.ticks, P = g.includeHidden, S = g[o];
    if (y[S])
      return y;
    var T = Yo(t.data, {
      graphicalItems: i.filter(function(z) {
        var Z, he = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o];
        return he === S;
      }),
      dataStartIndex: c,
      dataEndIndex: s
    }), E = T.length, j, $, C;
    yq(g.domain, w, b) && (j = qf(g.domain, null, w), d && (b === "number" || x !== "auto") && (C = Xn(T, O, "category")));
    var M = w_(b);
    if (!j || j.length === 0) {
      var k, R = (k = g.domain) !== null && k !== void 0 ? k : M;
      if (O) {
        if (j = Xn(T, O, b), b === "category" && d) {
          var q = vA(j);
          m && q ? ($ = j, j = to(0, E)) : m || (j = Cg(R, j, v).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 ? z : [].concat(xn(z), [Z]);
          }, []));
        } else if (b === "category")
          m ? j = j.filter(function(z) {
            return z !== "" && !J(z);
          }) : j = Cg(R, j, v).reduce(function(z, Z) {
            return z.indexOf(Z) >= 0 || Z === "" || J(Z) ? z : [].concat(xn(z), [Z]);
          }, []);
        else if (b === "number") {
          var B = jM(T, i.filter(function(z) {
            var Z, he, be = o in z.props ? z.props[o] : (Z = z.type.defaultProps) === null || Z === void 0 ? void 0 : Z[o], Ue = "hide" in z.props ? z.props.hide : (he = z.type.defaultProps) === null || he === void 0 ? void 0 : he.hide;
            return be === S && (P || !Ue);
          }), O, a, f);
          B && (j = B);
        }
        d && (b === "number" || x !== "auto") && (C = Xn(T, O, "category"));
      } else d ? j = to(0, E) : u && u[S] && u[S].hasStack && b === "number" ? j = p === "expand" ? [0, 1] : nw(u[S].stackGroups, c, s) : j = VO(T, i.filter(function(z) {
        var Z = o in z.props ? z.props[o] : z.type.defaultProps[o], he = "hide" in z.props ? z.props.hide : z.type.defaultProps.hide;
        return Z === S && (P || !he);
      }), b, f, !0);
      if (b === "number")
        j = Sp(l, j, S, a, _), R && (j = qf(R, j, w));
      else if (b === "category" && R) {
        var U = R, X = j.every(function(z) {
          return U.indexOf(z) >= 0;
        });
        X && (j = U);
      }
    }
    return I(I({}, y), {}, V({}, S, I(I({}, g), {}, {
      axisType: a,
      domain: j,
      categoricalDomain: C,
      duplicateDomain: $,
      originalDomain: (h = g.domain) !== null && h !== void 0 ? h : M,
      isCategorical: d,
      layout: f
    })));
  }, {});
}, Kq = function(t, r) {
  var n = r.graphicalItems, i = r.Axis, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, p = Yo(t.data, {
    graphicalItems: n,
    dataStartIndex: c,
    dataEndIndex: s
  }), d = p.length, y = XO(f, a), v = -1;
  return n.reduce(function(h, g) {
    var b = g.type.defaultProps !== void 0 ? I(I({}, g.type.defaultProps), g.props) : g.props, O = b[o], w = w_("number");
    if (!h[O]) {
      v++;
      var m;
      return y ? m = to(0, d) : u && u[O] && u[O].hasStack ? (m = nw(u[O].stackGroups, c, s), m = Sp(l, m, O, a)) : (m = qf(w, VO(p, n.filter(function(x) {
        var _, P, S = o in x.props ? x.props[o] : (_ = x.type.defaultProps) === null || _ === void 0 ? void 0 : _[o], T = "hide" in x.props ? x.props.hide : (P = x.type.defaultProps) === null || P === void 0 ? void 0 : P.hide;
        return S === O && !T;
      }), "number", f), i.defaultProps.allowDataOverflow), m = Sp(l, m, O, a)), I(I({}, h), {}, V({}, O, I(I({
        axisType: a
      }, i.defaultProps), {}, {
        hide: !0,
        orientation: Xe(Bq, "".concat(a, ".").concat(v % 2), null),
        domain: m,
        originalDomain: w,
        isCategorical: y,
        layout: f
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return h;
  }, {});
}, Hq = function(t, r) {
  var n = r.axisType, i = n === void 0 ? "xAxis" : n, a = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.children, l = "".concat(i, "Id"), p = We(f, a), d = {};
  return p && p.length ? d = Uq(t, {
    axes: p,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  }) : o && o.length && (d = Kq(t, {
    Axis: a,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  })), d;
}, Gq = function(t) {
  var r = zt(t), n = St(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: Zp(n, function(i) {
      return i.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: La(r, n)
  };
}, U0 = function(t) {
  var r = t.children, n = t.defaultShowTooltip, i = Ge(r, sn), a = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (a = i.props.startIndex), i.props.endIndex >= 0 && (o = i.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: a,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, Vq = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = jt(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, K0 = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, Xq = function(t, r) {
  var n = t.props, i = t.graphicalItems, a = t.xAxisMap, o = a === void 0 ? {} : a, u = t.yAxisMap, c = u === void 0 ? {} : u, s = n.width, f = n.height, l = n.children, p = n.margin || {}, d = Ge(l, sn), y = Ge(l, hr), v = Object.keys(c).reduce(function(m, x) {
    var _ = c[x], P = _.orientation;
    return !_.mirror && !_.hide ? I(I({}, m), {}, V({}, P, m[P] + _.width)) : m;
  }, {
    left: p.left || 0,
    right: p.right || 0
  }), h = Object.keys(o).reduce(function(m, x) {
    var _ = o[x], P = _.orientation;
    return !_.mirror && !_.hide ? I(I({}, m), {}, V({}, P, Xe(m, "".concat(P)) + _.height)) : m;
  }, {
    top: p.top || 0,
    bottom: p.bottom || 0
  }), g = I(I({}, h), v), b = g.bottom;
  d && (g.bottom += d.props.height || sn.defaultProps.height), y && r && (g = PM(g, i, n, r));
  var O = s - g.left - g.right, w = f - g.top - g.bottom;
  return I(I({
    brushBottom: b
  }, g), {}, {
    // never return negative values for height and width
    width: Math.max(O, 0),
    height: Math.max(w, 0)
  });
}, Yq = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, Cn = function(t) {
  var r = t.chartName, n = t.GraphicalChild, i = t.defaultTooltipEventType, a = i === void 0 ? "axis" : i, o = t.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, c = t.axisComponents, s = t.legendContent, f = t.formatAxisMap, l = t.defaultProps, p = function(g, b) {
    var O = b.graphicalItems, w = b.stackGroups, m = b.offset, x = b.updateId, _ = b.dataStartIndex, P = b.dataEndIndex, S = g.barSize, T = g.layout, E = g.barGap, j = g.barCategoryGap, $ = g.maxBarSize, C = K0(T), M = C.numericAxisName, k = C.cateAxisName, R = Vq(O), q = [];
    return O.forEach(function(B, U) {
      var X = Yo(g.data, {
        graphicalItems: [B],
        dataStartIndex: _,
        dataEndIndex: P
      }), z = B.type.defaultProps !== void 0 ? I(I({}, B.type.defaultProps), B.props) : B.props, Z = z.dataKey, he = z.maxBarSize, be = z["".concat(M, "Id")], Ue = z["".concat(k, "Id")], Qt = {}, qe = c.reduce(function(er, tr) {
        var Jo = b["".concat(tr.axisType, "Map")], Lh = z["".concat(tr.axisType, "Id")];
        Jo && Jo[Lh] || tr.axisType === "zAxis" || Or();
        var qh = Jo[Lh];
        return I(I({}, er), {}, V(V({}, tr.axisType, qh), "".concat(tr.axisType, "Ticks"), St(qh)));
      }, Qt), W = qe[k], ee = qe["".concat(k, "Ticks")], te = w && w[be] && w[be].hasStack && IM(B, w[be].stackGroups), N = jt(B.type).indexOf("Bar") >= 0, me = La(W, ee), re = [], we = R && _M({
        barSize: S,
        stackGroups: w,
        totalSize: Yq(qe, k)
      });
      if (N) {
        var _e, Be, Bt = J(he) ? $ : he, Ir = (_e = (Be = La(W, ee, !0)) !== null && Be !== void 0 ? Be : Bt) !== null && _e !== void 0 ? _e : 0;
        re = AM({
          barGap: E,
          barCategoryGap: j,
          bandSize: Ir !== me ? Ir : me,
          sizeList: we[Ue],
          maxBarSize: Bt
        }), Ir !== me && (re = re.map(function(er) {
          return I(I({}, er), {}, {
            position: I(I({}, er.position), {}, {
              offset: er.position.offset - Ir / 2
            })
          });
        }));
      }
      var Vi = B && B.type && B.type.getComposedData;
      Vi && q.push({
        props: I(I({}, Vi(I(I({}, qe), {}, {
          displayedData: X,
          props: g,
          dataKey: Z,
          item: B,
          bandSize: me,
          barPosition: re,
          offset: m,
          stackedData: te,
          layout: T,
          dataStartIndex: _,
          dataEndIndex: P
        }))), {}, V(V(V({
          key: B.key || "item-".concat(U)
        }, M, qe[M]), k, qe[k]), "animationId", x)),
        childIndex: jA(B, g.children),
        item: B
      });
    }), q;
  }, d = function(g, b) {
    var O = g.props, w = g.dataStartIndex, m = g.dataEndIndex, x = g.updateId;
    if (!Vd({
      props: O
    }))
      return null;
    var _ = O.children, P = O.layout, S = O.stackOffset, T = O.data, E = O.reverseStackOrder, j = K0(P), $ = j.numericAxisName, C = j.cateAxisName, M = We(_, n), k = CM(T, M, "".concat($, "Id"), "".concat(C, "Id"), S, E), R = c.reduce(function(z, Z) {
      var he = "".concat(Z.axisType, "Map");
      return I(I({}, z), {}, V({}, he, Hq(O, I(I({}, Z), {}, {
        graphicalItems: M,
        stackGroups: Z.axisType === $ && k,
        dataStartIndex: w,
        dataEndIndex: m
      }))));
    }, {}), q = Xq(I(I({}, R), {}, {
      props: O,
      graphicalItems: M
    }), b == null ? void 0 : b.legendBBox);
    Object.keys(R).forEach(function(z) {
      R[z] = f(O, R[z], q, z.replace("Map", ""), r);
    });
    var B = R["".concat(C, "Map")], U = Gq(B), X = p(O, I(I({}, R), {}, {
      dataStartIndex: w,
      dataEndIndex: m,
      updateId: x,
      graphicalItems: M,
      stackGroups: k,
      offset: q
    }));
    return I(I({
      formattedGraphicalItems: X,
      graphicalItems: M,
      offset: q,
      stackGroups: k
    }, U), R);
  }, y = /* @__PURE__ */ (function(h) {
    function g(b) {
      var O, w, m;
      return Tq(this, g), m = Cq(this, g, [b]), V(m, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), V(m, "accessibilityManager", new vq()), V(m, "handleLegendBBoxUpdate", function(x) {
        if (x) {
          var _ = m.state, P = _.dataStartIndex, S = _.dataEndIndex, T = _.updateId;
          m.setState(I({
            legendBBox: x
          }, d({
            props: m.props,
            dataStartIndex: P,
            dataEndIndex: S,
            updateId: T
          }, I(I({}, m.state), {}, {
            legendBBox: x
          }))));
        }
      }), V(m, "handleReceiveSyncEvent", function(x, _, P) {
        if (m.props.syncId === x) {
          if (P === m.eventEmitterSymbol && typeof m.props.syncMethod != "function")
            return;
          m.applySyncEvent(_);
        }
      }), V(m, "handleBrushChange", function(x) {
        var _ = x.startIndex, P = x.endIndex;
        if (_ !== m.state.dataStartIndex || P !== m.state.dataEndIndex) {
          var S = m.state.updateId;
          m.setState(function() {
            return I({
              dataStartIndex: _,
              dataEndIndex: P
            }, d({
              props: m.props,
              dataStartIndex: _,
              dataEndIndex: P,
              updateId: S
            }, m.state));
          }), m.triggerSyncEvent({
            dataStartIndex: _,
            dataEndIndex: P
          });
        }
      }), V(m, "handleMouseEnter", function(x) {
        var _ = m.getMouseInfo(x);
        if (_) {
          var P = I(I({}, _), {}, {
            isTooltipActive: !0
          });
          m.setState(P), m.triggerSyncEvent(P);
          var S = m.props.onMouseEnter;
          G(S) && S(P, x);
        }
      }), V(m, "triggeredAfterMouseMove", function(x) {
        var _ = m.getMouseInfo(x), P = _ ? I(I({}, _), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        m.setState(P), m.triggerSyncEvent(P);
        var S = m.props.onMouseMove;
        G(S) && S(P, x);
      }), V(m, "handleItemMouseEnter", function(x) {
        m.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: x,
            activePayload: x.tooltipPayload,
            activeCoordinate: x.tooltipPosition || {
              x: x.cx,
              y: x.cy
            }
          };
        });
      }), V(m, "handleItemMouseLeave", function() {
        m.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), V(m, "handleMouseMove", function(x) {
        x.persist(), m.throttleTriggeredAfterMouseMove(x);
      }), V(m, "handleMouseLeave", function(x) {
        m.throttleTriggeredAfterMouseMove.cancel();
        var _ = {
          isTooltipActive: !1
        };
        m.setState(_), m.triggerSyncEvent(_);
        var P = m.props.onMouseLeave;
        G(P) && P(_, x);
      }), V(m, "handleOuterEvent", function(x) {
        var _ = SA(x), P = Xe(m.props, "".concat(_));
        if (_ && G(P)) {
          var S, T;
          /.*touch.*/i.test(_) ? T = m.getMouseInfo(x.changedTouches[0]) : T = m.getMouseInfo(x), P((S = T) !== null && S !== void 0 ? S : {}, x);
        }
      }), V(m, "handleClick", function(x) {
        var _ = m.getMouseInfo(x);
        if (_) {
          var P = I(I({}, _), {}, {
            isTooltipActive: !0
          });
          m.setState(P), m.triggerSyncEvent(P);
          var S = m.props.onClick;
          G(S) && S(P, x);
        }
      }), V(m, "handleMouseDown", function(x) {
        var _ = m.props.onMouseDown;
        if (G(_)) {
          var P = m.getMouseInfo(x);
          _(P, x);
        }
      }), V(m, "handleMouseUp", function(x) {
        var _ = m.props.onMouseUp;
        if (G(_)) {
          var P = m.getMouseInfo(x);
          _(P, x);
        }
      }), V(m, "handleTouchMove", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.throttleTriggeredAfterMouseMove(x.changedTouches[0]);
      }), V(m, "handleTouchStart", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.handleMouseDown(x.changedTouches[0]);
      }), V(m, "handleTouchEnd", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.handleMouseUp(x.changedTouches[0]);
      }), V(m, "handleDoubleClick", function(x) {
        var _ = m.props.onDoubleClick;
        if (G(_)) {
          var P = m.getMouseInfo(x);
          _(P, x);
        }
      }), V(m, "handleContextMenu", function(x) {
        var _ = m.props.onContextMenu;
        if (G(_)) {
          var P = m.getMouseInfo(x);
          _(P, x);
        }
      }), V(m, "triggerSyncEvent", function(x) {
        m.props.syncId !== void 0 && tf.emit(rf, m.props.syncId, x, m.eventEmitterSymbol);
      }), V(m, "applySyncEvent", function(x) {
        var _ = m.props, P = _.layout, S = _.syncMethod, T = m.state.updateId, E = x.dataStartIndex, j = x.dataEndIndex;
        if (x.dataStartIndex !== void 0 || x.dataEndIndex !== void 0)
          m.setState(I({
            dataStartIndex: E,
            dataEndIndex: j
          }, d({
            props: m.props,
            dataStartIndex: E,
            dataEndIndex: j,
            updateId: T
          }, m.state)));
        else if (x.activeTooltipIndex !== void 0) {
          var $ = x.chartX, C = x.chartY, M = x.activeTooltipIndex, k = m.state, R = k.offset, q = k.tooltipTicks;
          if (!R)
            return;
          if (typeof S == "function")
            M = S(q, x);
          else if (S === "value") {
            M = -1;
            for (var B = 0; B < q.length; B++)
              if (q[B].value === x.activeLabel) {
                M = B;
                break;
              }
          }
          var U = I(I({}, R), {}, {
            x: R.left,
            y: R.top
          }), X = Math.min($, U.x + U.width), z = Math.min(C, U.y + U.height), Z = q[M] && q[M].value, he = Tp(m.state, m.props.data, M), be = q[M] ? {
            x: P === "horizontal" ? q[M].coordinate : X,
            y: P === "horizontal" ? z : q[M].coordinate
          } : O_;
          m.setState(I(I({}, x), {}, {
            activeLabel: Z,
            activeCoordinate: be,
            activePayload: he,
            activeTooltipIndex: M
          }));
        } else
          m.setState(x);
      }), V(m, "renderCursor", function(x) {
        var _, P = m.state, S = P.isTooltipActive, T = P.activeCoordinate, E = P.activePayload, j = P.offset, $ = P.activeTooltipIndex, C = P.tooltipAxisBandSize, M = m.getTooltipEventType(), k = (_ = x.props.active) !== null && _ !== void 0 ? _ : S, R = m.props.layout, q = x.key || "_recharts-cursor";
        return /* @__PURE__ */ A.createElement(wq, {
          key: q,
          activeCoordinate: T,
          activePayload: E,
          activeTooltipIndex: $,
          chartName: r,
          element: x,
          isActive: k,
          layout: R,
          offset: j,
          tooltipAxisBandSize: C,
          tooltipEventType: M
        });
      }), V(m, "renderPolarAxis", function(x, _, P) {
        var S = Xe(x, "type.axisType"), T = Xe(m.state, "".concat(S, "Map")), E = x.type.defaultProps, j = E !== void 0 ? I(I({}, E), x.props) : x.props, $ = T && T[j["".concat(S, "Id")]];
        return /* @__PURE__ */ D.cloneElement(x, I(I({}, $), {}, {
          className: Y(S, $.className),
          key: x.key || "".concat(_, "-").concat(P),
          ticks: St($, !0)
        }));
      }), V(m, "renderPolarGrid", function(x) {
        var _ = x.props, P = _.radialLines, S = _.polarAngles, T = _.polarRadius, E = m.state, j = E.radiusAxisMap, $ = E.angleAxisMap, C = zt(j), M = zt($), k = M.cx, R = M.cy, q = M.innerRadius, B = M.outerRadius;
        return /* @__PURE__ */ D.cloneElement(x, {
          polarAngles: Array.isArray(S) ? S : St(M, !0).map(function(U) {
            return U.coordinate;
          }),
          polarRadius: Array.isArray(T) ? T : St(C, !0).map(function(U) {
            return U.coordinate;
          }),
          cx: k,
          cy: R,
          innerRadius: q,
          outerRadius: B,
          key: x.key || "polar-grid",
          radialLines: P
        });
      }), V(m, "renderLegend", function() {
        var x = m.state.formattedGraphicalItems, _ = m.props, P = _.children, S = _.width, T = _.height, E = m.props.margin || {}, j = S - (E.left || 0) - (E.right || 0), $ = HO({
          children: P,
          formattedGraphicalItems: x,
          legendWidth: j,
          legendContent: s
        });
        if (!$)
          return null;
        var C = $.item, M = F0($, _q);
        return /* @__PURE__ */ D.cloneElement(C, I(I({}, M), {}, {
          chartWidth: S,
          chartHeight: T,
          margin: E,
          onBBoxUpdate: m.handleLegendBBoxUpdate
        }));
      }), V(m, "renderTooltip", function() {
        var x, _ = m.props, P = _.children, S = _.accessibilityLayer, T = Ge(P, ft);
        if (!T)
          return null;
        var E = m.state, j = E.isTooltipActive, $ = E.activeCoordinate, C = E.activePayload, M = E.activeLabel, k = E.offset, R = (x = T.props.active) !== null && x !== void 0 ? x : j;
        return /* @__PURE__ */ D.cloneElement(T, {
          viewBox: I(I({}, k), {}, {
            x: k.left,
            y: k.top
          }),
          active: R,
          label: M,
          payload: R ? C : [],
          coordinate: $,
          accessibilityLayer: S
        });
      }), V(m, "renderBrush", function(x) {
        var _ = m.props, P = _.margin, S = _.data, T = m.state, E = T.offset, j = T.dataStartIndex, $ = T.dataEndIndex, C = T.updateId;
        return /* @__PURE__ */ D.cloneElement(x, {
          key: x.key || "_recharts-brush",
          onChange: na(m.handleBrushChange, x.props.onChange),
          data: S,
          x: L(x.props.x) ? x.props.x : E.left,
          y: L(x.props.y) ? x.props.y : E.top + E.height + E.brushBottom - (P.bottom || 0),
          width: L(x.props.width) ? x.props.width : E.width,
          startIndex: j,
          endIndex: $,
          updateId: "brush-".concat(C)
        });
      }), V(m, "renderReferenceElement", function(x, _, P) {
        if (!x)
          return null;
        var S = m, T = S.clipPathId, E = m.state, j = E.xAxisMap, $ = E.yAxisMap, C = E.offset, M = x.type.defaultProps || {}, k = x.props, R = k.xAxisId, q = R === void 0 ? M.xAxisId : R, B = k.yAxisId, U = B === void 0 ? M.yAxisId : B;
        return /* @__PURE__ */ D.cloneElement(x, {
          key: x.key || "".concat(_, "-").concat(P),
          xAxis: j[q],
          yAxis: $[U],
          viewBox: {
            x: C.left,
            y: C.top,
            width: C.width,
            height: C.height
          },
          clipPathId: T
        });
      }), V(m, "renderActivePoints", function(x) {
        var _ = x.item, P = x.activePoint, S = x.basePoint, T = x.childIndex, E = x.isRange, j = [], $ = _.props.key, C = _.item.type.defaultProps !== void 0 ? I(I({}, _.item.type.defaultProps), _.item.props) : _.item.props, M = C.activeDot, k = C.dataKey, R = I(I({
          index: T,
          dataKey: k,
          cx: P.x,
          cy: P.y,
          r: 4,
          fill: _h(_.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: P.payload,
          value: P.value
        }, K(M, !1)), fa(M));
        return j.push(g.renderActiveDot(M, R, "".concat($, "-activePoint-").concat(T))), S ? j.push(g.renderActiveDot(M, I(I({}, R), {}, {
          cx: S.x,
          cy: S.y
        }), "".concat($, "-basePoint-").concat(T))) : E && j.push(null), j;
      }), V(m, "renderGraphicChild", function(x, _, P) {
        var S = m.filterFormatItem(x, _, P);
        if (!S)
          return null;
        var T = m.getTooltipEventType(), E = m.state, j = E.isTooltipActive, $ = E.tooltipAxis, C = E.activeTooltipIndex, M = E.activeLabel, k = m.props.children, R = Ge(k, ft), q = S.props, B = q.points, U = q.isRange, X = q.baseLine, z = S.item.type.defaultProps !== void 0 ? I(I({}, S.item.type.defaultProps), S.item.props) : S.item.props, Z = z.activeDot, he = z.hide, be = z.activeBar, Ue = z.activeShape, Qt = !!(!he && j && R && (Z || be || Ue)), qe = {};
        T !== "axis" && R && R.props.trigger === "click" ? qe = {
          onClick: na(m.handleItemMouseEnter, x.props.onClick)
        } : T !== "axis" && (qe = {
          onMouseLeave: na(m.handleItemMouseLeave, x.props.onMouseLeave),
          onMouseEnter: na(m.handleItemMouseEnter, x.props.onMouseEnter)
        });
        var W = /* @__PURE__ */ D.cloneElement(x, I(I({}, S.props), qe));
        function ee(tr) {
          return typeof $.dataKey == "function" ? $.dataKey(tr.payload) : null;
        }
        if (Qt)
          if (C >= 0) {
            var te, N;
            if ($.dataKey && !$.allowDuplicatedCategory) {
              var me = typeof $.dataKey == "function" ? ee : "payload.".concat($.dataKey.toString());
              te = la(B, me, M), N = U && X && la(X, me, M);
            } else
              te = B == null ? void 0 : B[C], N = U && X && X[C];
            if (Ue || be) {
              var re = x.props.activeIndex !== void 0 ? x.props.activeIndex : C;
              return [/* @__PURE__ */ D.cloneElement(x, I(I(I({}, S.props), qe), {}, {
                activeIndex: re
              })), null, null];
            }
            if (!J(te))
              return [W].concat(xn(m.renderActivePoints({
                item: S,
                activePoint: te,
                basePoint: N,
                childIndex: C,
                isRange: U
              })));
          } else {
            var we, _e = (we = m.getItemByXY(m.state.activeCoordinate)) !== null && we !== void 0 ? we : {
              graphicalItem: W
            }, Be = _e.graphicalItem, Bt = Be.item, Ir = Bt === void 0 ? x : Bt, Vi = Be.childIndex, er = I(I(I({}, S.props), qe), {}, {
              activeIndex: Vi
            });
            return [/* @__PURE__ */ D.cloneElement(Ir, er), null, null];
          }
        return U ? [W, null, null] : [W, null];
      }), V(m, "renderCustomized", function(x, _, P) {
        return /* @__PURE__ */ D.cloneElement(x, I(I({
          key: "recharts-customized-".concat(P)
        }, m.props), m.state));
      }), V(m, "renderMap", {
        CartesianGrid: {
          handler: ca,
          once: !0
        },
        ReferenceArea: {
          handler: m.renderReferenceElement
        },
        ReferenceLine: {
          handler: ca
        },
        ReferenceDot: {
          handler: m.renderReferenceElement
        },
        XAxis: {
          handler: ca
        },
        YAxis: {
          handler: ca
        },
        Brush: {
          handler: m.renderBrush,
          once: !0
        },
        Bar: {
          handler: m.renderGraphicChild
        },
        Line: {
          handler: m.renderGraphicChild
        },
        Area: {
          handler: m.renderGraphicChild
        },
        Radar: {
          handler: m.renderGraphicChild
        },
        RadialBar: {
          handler: m.renderGraphicChild
        },
        Scatter: {
          handler: m.renderGraphicChild
        },
        Pie: {
          handler: m.renderGraphicChild
        },
        Funnel: {
          handler: m.renderGraphicChild
        },
        Tooltip: {
          handler: m.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: m.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: m.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: m.renderPolarAxis
        },
        Customized: {
          handler: m.renderCustomized
        }
      }), m.clipPathId = "".concat((O = b.id) !== null && O !== void 0 ? O : Ar("recharts"), "-clip"), m.throttleTriggeredAfterMouseMove = Hx(m.triggeredAfterMouseMove, (w = b.throttleDelay) !== null && w !== void 0 ? w : 1e3 / 60), m.state = {}, m;
    }
    return Rq(g, h), Mq(g, [{
      key: "componentDidMount",
      value: function() {
        var O, w;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (O = this.props.margin.left) !== null && O !== void 0 ? O : 0,
            top: (w = this.props.margin.top) !== null && w !== void 0 ? w : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var O = this.props, w = O.children, m = O.data, x = O.height, _ = O.layout, P = Ge(w, ft);
        if (P) {
          var S = P.props.defaultIndex;
          if (!(typeof S != "number" || S < 0 || S > this.state.tooltipTicks.length - 1)) {
            var T = this.state.tooltipTicks[S] && this.state.tooltipTicks[S].value, E = Tp(this.state, m, S, T), j = this.state.tooltipTicks[S].coordinate, $ = (this.state.offset.top + x) / 2, C = _ === "horizontal", M = C ? {
              x: j,
              y: $
            } : {
              y: j,
              x: $
            }, k = this.state.formattedGraphicalItems.find(function(q) {
              var B = q.item;
              return B.type.name === "Scatter";
            });
            k && (M = I(I({}, M), k.props.points[S].tooltipPosition), E = k.props.points[S].tooltipPayload);
            var R = {
              activeTooltipIndex: S,
              isTooltipActive: !0,
              activeLabel: T,
              activePayload: E,
              activeCoordinate: M
            };
            this.setState(R), this.renderCursor(P), this.accessibilityManager.setIndex(S);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(O, w) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== w.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== O.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== O.margin) {
          var m, x;
          this.accessibilityManager.setDetails({
            offset: {
              left: (m = this.props.margin.left) !== null && m !== void 0 ? m : 0,
              top: (x = this.props.margin.top) !== null && x !== void 0 ? x : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(O) {
        uf([Ge(O.children, ft)], [Ge(this.props.children, ft)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var O = Ge(this.props.children, ft);
        if (O && typeof O.props.shared == "boolean") {
          var w = O.props.shared ? "axis" : "item";
          return u.indexOf(w) >= 0 ? w : a;
        }
        return a;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(O) {
        if (!this.container)
          return null;
        var w = this.container, m = w.getBoundingClientRect(), x = dj(m), _ = {
          chartX: Math.round(O.pageX - x.left),
          chartY: Math.round(O.pageY - x.top)
        }, P = m.width / w.offsetWidth || 1, S = this.inRange(_.chartX, _.chartY, P);
        if (!S)
          return null;
        var T = this.state, E = T.xAxisMap, j = T.yAxisMap, $ = this.getTooltipEventType(), C = z0(this.state, this.props.data, this.props.layout, S);
        if ($ !== "axis" && E && j) {
          var M = zt(E).scale, k = zt(j).scale, R = M && M.invert ? M.invert(_.chartX) : null, q = k && k.invert ? k.invert(_.chartY) : null;
          return I(I({}, _), {}, {
            xValue: R,
            yValue: q
          }, C);
        }
        return C ? I(I({}, _), C) : null;
      }
    }, {
      key: "inRange",
      value: function(O, w) {
        var m = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, x = this.props.layout, _ = O / m, P = w / m;
        if (x === "horizontal" || x === "vertical") {
          var S = this.state.offset, T = _ >= S.left && _ <= S.left + S.width && P >= S.top && P <= S.top + S.height;
          return T ? {
            x: _,
            y: P
          } : null;
        }
        var E = this.state, j = E.angleAxisMap, $ = E.radiusAxisMap;
        if (j && $) {
          var C = zt(j);
          return Rg({
            x: _,
            y: P
          }, C);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var O = this.props.children, w = this.getTooltipEventType(), m = Ge(O, ft), x = {};
        m && w === "axis" && (m.props.trigger === "click" ? x = {
          onClick: this.handleClick
        } : x = {
          onMouseEnter: this.handleMouseEnter,
          onDoubleClick: this.handleDoubleClick,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onContextMenu: this.handleContextMenu
        });
        var _ = fa(this.props, this.handleOuterEvent);
        return I(I({}, _), x);
      }
    }, {
      key: "addListener",
      value: function() {
        tf.on(rf, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        tf.removeListener(rf, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(O, w, m) {
        for (var x = this.state.formattedGraphicalItems, _ = 0, P = x.length; _ < P; _++) {
          var S = x[_];
          if (S.item === O || S.props.key === O.key || w === jt(S.item.type) && m === S.childIndex)
            return S;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var O = this.clipPathId, w = this.state.offset, m = w.left, x = w.top, _ = w.height, P = w.width;
        return /* @__PURE__ */ A.createElement("defs", null, /* @__PURE__ */ A.createElement("clipPath", {
          id: O
        }, /* @__PURE__ */ A.createElement("rect", {
          x: m,
          y: x,
          height: _,
          width: P
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var O = this.state.xAxisMap;
        return O ? Object.entries(O).reduce(function(w, m) {
          var x = B0(m, 2), _ = x[0], P = x[1];
          return I(I({}, w), {}, V({}, _, P.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var O = this.state.yAxisMap;
        return O ? Object.entries(O).reduce(function(w, m) {
          var x = B0(m, 2), _ = x[0], P = x[1];
          return I(I({}, w), {}, V({}, _, P.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(O) {
        var w;
        return (w = this.state.xAxisMap) === null || w === void 0 || (w = w[O]) === null || w === void 0 ? void 0 : w.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(O) {
        var w;
        return (w = this.state.yAxisMap) === null || w === void 0 || (w = w[O]) === null || w === void 0 ? void 0 : w.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(O) {
        var w = this.state, m = w.formattedGraphicalItems, x = w.activeItem;
        if (m && m.length)
          for (var _ = 0, P = m.length; _ < P; _++) {
            var S = m[_], T = S.props, E = S.item, j = E.type.defaultProps !== void 0 ? I(I({}, E.type.defaultProps), E.props) : E.props, $ = jt(E.type);
            if ($ === "Bar") {
              var C = (T.data || []).find(function(q) {
                return $k(O, q);
              });
              if (C)
                return {
                  graphicalItem: S,
                  payload: C
                };
            } else if ($ === "RadialBar") {
              var M = (T.data || []).find(function(q) {
                return Rg(O, q);
              });
              if (M)
                return {
                  graphicalItem: S,
                  payload: M
                };
            } else if (Wo(S, x) || zo(S, x) || $i(S, x)) {
              var k = sD({
                graphicalItem: S,
                activeTooltipItem: x,
                itemData: j.data
              }), R = j.activeIndex === void 0 ? k : j.activeIndex;
              return {
                graphicalItem: I(I({}, S), {}, {
                  childIndex: R
                }),
                payload: $i(S, x) ? j.data[k] : S.props.data[k]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var O = this;
        if (!Vd(this))
          return null;
        var w = this.props, m = w.children, x = w.className, _ = w.width, P = w.height, S = w.style, T = w.compact, E = w.title, j = w.desc, $ = F0(w, Aq), C = K($, !1);
        if (T)
          return /* @__PURE__ */ A.createElement(b0, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ A.createElement(sf, Wr({}, C, {
            width: _,
            height: P,
            title: E,
            desc: j
          }), this.renderClipPath(), Yd(m, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var M, k;
          C.tabIndex = (M = this.props.tabIndex) !== null && M !== void 0 ? M : 0, C.role = (k = this.props.role) !== null && k !== void 0 ? k : "application", C.onKeyDown = function(q) {
            O.accessibilityManager.keyboardEvent(q);
          }, C.onFocus = function() {
            O.accessibilityManager.focus();
          };
        }
        var R = this.parseEventsOfWrapper();
        return /* @__PURE__ */ A.createElement(b0, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ A.createElement("div", Wr({
          className: Y("recharts-wrapper", x),
          style: I({
            position: "relative",
            cursor: "default",
            width: _,
            height: P
          }, S)
        }, R, {
          ref: function(B) {
            O.container = B;
          }
        }), /* @__PURE__ */ A.createElement(sf, Wr({}, C, {
          width: _,
          height: P,
          title: E,
          desc: j,
          style: Fq
        }), this.renderClipPath(), Yd(m, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(D.Component);
  V(y, "displayName", r), V(y, "defaultProps", I({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, l)), V(y, "getDerivedStateFromProps", function(h, g) {
    var b = h.dataKey, O = h.data, w = h.children, m = h.width, x = h.height, _ = h.layout, P = h.stackOffset, S = h.margin, T = g.dataStartIndex, E = g.dataEndIndex;
    if (g.updateId === void 0) {
      var j = U0(h);
      return I(I(I({}, j), {}, {
        updateId: 0
      }, d(I(I({
        props: h
      }, j), {}, {
        updateId: 0
      }), g)), {}, {
        prevDataKey: b,
        prevData: O,
        prevWidth: m,
        prevHeight: x,
        prevLayout: _,
        prevStackOffset: P,
        prevMargin: S,
        prevChildren: w
      });
    }
    if (b !== g.prevDataKey || O !== g.prevData || m !== g.prevWidth || x !== g.prevHeight || _ !== g.prevLayout || P !== g.prevStackOffset || !zr(S, g.prevMargin)) {
      var $ = U0(h), C = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: g.chartX,
        chartY: g.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: g.isTooltipActive
      }, M = I(I({}, z0(g, O, _)), {}, {
        updateId: g.updateId + 1
      }), k = I(I(I({}, $), C), M);
      return I(I(I({}, k), d(I({
        props: h
      }, k), g)), {}, {
        prevDataKey: b,
        prevData: O,
        prevWidth: m,
        prevHeight: x,
        prevLayout: _,
        prevStackOffset: P,
        prevMargin: S,
        prevChildren: w
      });
    }
    if (!uf(w, g.prevChildren)) {
      var R, q, B, U, X = Ge(w, sn), z = X && (R = (q = X.props) === null || q === void 0 ? void 0 : q.startIndex) !== null && R !== void 0 ? R : T, Z = X && (B = (U = X.props) === null || U === void 0 ? void 0 : U.endIndex) !== null && B !== void 0 ? B : E, he = z !== T || Z !== E, be = !J(O), Ue = be && !he ? g.updateId : g.updateId + 1;
      return I(I({
        updateId: Ue
      }, d(I(I({
        props: h
      }, g), {}, {
        updateId: Ue,
        dataStartIndex: z,
        dataEndIndex: Z
      }), g)), {}, {
        prevChildren: w,
        dataStartIndex: z,
        dataEndIndex: Z
      });
    }
    return null;
  }), V(y, "renderActiveDot", function(h, g, b) {
    var O;
    return /* @__PURE__ */ D.isValidElement(h) ? O = /* @__PURE__ */ D.cloneElement(h, g) : G(h) ? O = h(g) : O = /* @__PURE__ */ A.createElement(En, g), /* @__PURE__ */ A.createElement(Q, {
      className: "recharts-active-dot",
      key: b
    }, O);
  });
  var v = /* @__PURE__ */ D.forwardRef(function(g, b) {
    return /* @__PURE__ */ A.createElement(y, Wr({}, g, {
      ref: b
    }));
  });
  return v.displayName = y.displayName, v;
}, Zq = Cn({
  chartName: "LineChart",
  GraphicalChild: Gi,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Rt
  }, {
    axisType: "yAxis",
    AxisComp: Mn
  }],
  formatAxisMap: Eh
}), Jq = Cn({
  chartName: "BarChart",
  GraphicalChild: Tr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Rt
  }, {
    axisType: "yAxis",
    AxisComp: Mn
  }],
  formatAxisMap: Eh
}), Qq = Cn({
  chartName: "PieChart",
  GraphicalChild: qt,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Er
  }, {
    axisType: "radiusAxis",
    AxisComp: Tn
  }],
  formatAxisMap: Ph,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), eB = Cn({
  chartName: "RadarChart",
  GraphicalChild: Ki,
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Er
  }, {
    axisType: "radiusAxis",
    AxisComp: Tn
  }],
  formatAxisMap: Ph,
  defaultProps: {
    layout: "centric",
    startAngle: 90,
    endAngle: -270,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), tB = Cn({
  chartName: "AreaChart",
  GraphicalChild: Jt,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: Rt
  }, {
    axisType: "yAxis",
    AxisComp: Mn
  }],
  formatAxisMap: Eh
}), rB = Cn({
  chartName: "RadialBarChart",
  GraphicalChild: Hi,
  legendContent: "children",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Er
  }, {
    axisType: "radiusAxis",
    AxisComp: Tn
  }],
  formatAxisMap: Ph,
  defaultProps: {
    layout: "radial",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const nB = { light: "", dark: ".dark" }, __ = D.createContext(null);
function A_() {
  const e = D.useContext(__);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const $r = D.forwardRef(({ id: e, className: t, children: r, config: n, ...i }, a) => {
  const o = D.useId(), u = `chart-${e || o.replace(/:/g, "")}`;
  return /* @__PURE__ */ F.jsx(__.Provider, { value: { config: n }, children: /* @__PURE__ */ F.jsxs(
    "div",
    {
      "data-chart": u,
      ref: a,
      className: wt(
        "flex w-full min-w-0 aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        t
      ),
      ...i,
      children: [
        /* @__PURE__ */ F.jsx(aB, {}),
        /* @__PURE__ */ F.jsx(oB, { id: u, config: n }),
        /* @__PURE__ */ F.jsx(uj, { children: r })
      ]
    }
  ) });
});
$r.displayName = "Chart";
const iB = [
  "[data-chart] .recharts-cartesian-grid line[stroke='#ccc'] { stroke: color-mix(in oklch, var(--color-border) 50%, transparent); }",
  "[data-chart] .recharts-dot[stroke='#fff'] { stroke: transparent; }",
  "[data-chart] .recharts-polar-grid [stroke='#ccc'] { stroke: var(--color-border); }",
  "[data-chart] .recharts-reference-line [stroke='#ccc'] { stroke: var(--color-border); }",
  "[data-chart] .recharts-sector[stroke='#fff'] { stroke: transparent; }"
].join(`
`);
function aB() {
  return /* @__PURE__ */ F.jsx("style", { dangerouslySetInnerHTML: { __html: iB } });
}
const oB = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme || n.color
  );
  return r.length ? /* @__PURE__ */ F.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(nB).map(
          ([n, i]) => `
${i} [data-chart=${e}] {
${r.map(([a, o]) => {
            var c;
            const u = ((c = o.theme) == null ? void 0 : c[n]) || o.color;
            return u ? `  --color-${a}: ${u};` : null;
          }).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, In = ft, Mr = D.forwardRef(
  ({
    active: e,
    payload: t,
    className: r,
    indicator: n = "dot",
    hideLabel: i = !1,
    hideIndicator: a = !1,
    label: o,
    labelFormatter: u,
    labelClassName: c,
    formatter: s,
    color: f,
    nameKey: l,
    labelKey: p
  }, d) => {
    const { config: y } = A_(), v = D.useMemo(() => {
      var m;
      if (i || !(t != null && t.length))
        return null;
      const [g] = t, b = `${p || (g == null ? void 0 : g.dataKey) || (g == null ? void 0 : g.name) || "value"}`, O = $p(y, g, b), w = !p && typeof o == "string" ? ((m = y[o]) == null ? void 0 : m.label) || o : O == null ? void 0 : O.label;
      return u ? /* @__PURE__ */ F.jsx("div", { className: wt("font-medium", c), children: u(w, t) }) : w ? /* @__PURE__ */ F.jsx("div", { className: wt("font-medium", c), children: w }) : null;
    }, [
      o,
      u,
      t,
      i,
      c,
      y,
      p
    ]);
    if (!e || !(t != null && t.length))
      return null;
    const h = t.length === 1 && n !== "dot";
    return /* @__PURE__ */ F.jsxs(
      "div",
      {
        ref: d,
        className: wt(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          r
        ),
        children: [
          h ? null : v,
          /* @__PURE__ */ F.jsx("div", { className: "grid gap-1.5", children: t.filter((g) => g.type !== "none").map((g, b) => {
            const O = `${l || g.name || g.dataKey || "value"}`, w = $p(y, g, O), m = f || g.payload.fill || g.color;
            return /* @__PURE__ */ F.jsx(
              "div",
              {
                className: wt(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  n === "dot" && "items-center"
                ),
                children: s && (g == null ? void 0 : g.value) !== void 0 && g.name ? s(g.value, g.name, g, b, g.payload) : /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
                  w != null && w.icon ? /* @__PURE__ */ F.jsx(w.icon, {}) : !a && /* @__PURE__ */ F.jsx(
                    "div",
                    {
                      className: wt(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": n === "dot",
                          "w-1": n === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                          "my-0.5": h && n === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": m,
                        "--color-border": m
                      }
                    }
                  ),
                  /* @__PURE__ */ F.jsxs(
                    "div",
                    {
                      className: wt(
                        "flex flex-1 justify-between leading-none",
                        h ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ F.jsxs("div", { className: "grid gap-1.5", children: [
                          h ? v : null,
                          /* @__PURE__ */ F.jsx("span", { className: "text-muted-foreground", children: (w == null ? void 0 : w.label) || g.name })
                        ] }),
                        g.value && /* @__PURE__ */ F.jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: g.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              g.dataKey
            );
          }) })
        ]
      }
    );
  }
);
Mr.displayName = "ChartTooltip";
const kn = hr, Cr = D.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: r, verticalAlign: n = "bottom", nameKey: i }, a) => {
    const { config: o } = A_();
    return r != null && r.length ? /* @__PURE__ */ F.jsx(
      "div",
      {
        ref: a,
        className: wt(
          "flex items-center justify-center gap-4",
          n === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: r.filter((u) => u.type !== "none").map((u) => {
          const c = `${i || u.dataKey || "value"}`, s = $p(o, u, c);
          return /* @__PURE__ */ F.jsxs(
            "div",
            {
              className: wt(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                s != null && s.icon && !t ? /* @__PURE__ */ F.jsx(s.icon, {}) : /* @__PURE__ */ F.jsx(
                  "div",
                  {
                    className: "h-2 w-2 shrink-0 rounded-[2px]",
                    style: {
                      backgroundColor: u.color
                    }
                  }
                ),
                s == null ? void 0 : s.label
              ]
            },
            u.value
          );
        })
      }
    ) : null;
  }
);
Cr.displayName = "ChartLegend";
function $p(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
const Gt = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)"
];
function Zo(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t[n.dataKey] = {
      label: n.label ?? n.dataKey,
      color: n.color ?? Gt[r % Gt.length]
    };
  }
  return t;
}
function P_(e, t) {
  const r = {};
  for (let n = 0; n < e.length; n++) {
    const i = String(e[n][t] ?? `item-${n}`);
    r[i] = {
      label: i,
      color: Gt[n % Gt.length]
    };
  }
  return r;
}
function cB({
  data: e = [],
  series: t,
  xAxis: r,
  height: n = 300,
  stacked: i = !1,
  horizontal: a = !1,
  barRadius: o = 4,
  showLegend: u = !1,
  showTooltip: c = !0,
  showGrid: s = !0,
  className: f
}) {
  if (typeof e == "string") return null;
  const l = Zo(t);
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: l,
      className: f,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(Jq, { data: e, layout: a ? "vertical" : "horizontal", children: [
        s && /* @__PURE__ */ F.jsx(Xo, { vertical: a, horizontal: !a }),
        a && r && /* @__PURE__ */ F.jsx(
          Mn,
          {
            dataKey: r,
            type: "category",
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        a && /* @__PURE__ */ F.jsx(Rt, { type: "number", hide: !0 }),
        !a && r && /* @__PURE__ */ F.jsx(
          Rt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        c && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, {}) }),
        u && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, {}) }),
        t.map((p) => /* @__PURE__ */ F.jsx(
          Tr,
          {
            dataKey: p.dataKey,
            fill: `var(--color-${p.dataKey})`,
            radius: o,
            stackId: i ? "stack" : void 0
          },
          p.dataKey
        ))
      ] })
    }
  );
}
const S_ = {
  linear: "linear",
  smooth: "monotone",
  step: "step"
};
function sB({
  data: e = [],
  series: t,
  xAxis: r,
  height: n = 300,
  curve: i = "linear",
  showDots: a = !1,
  showLegend: o = !1,
  showTooltip: u = !0,
  showGrid: c = !0,
  className: s
}) {
  if (typeof e == "string") return null;
  const f = Zo(t);
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(Zq, { data: e, children: [
        c && /* @__PURE__ */ F.jsx(Xo, { vertical: !1 }),
        r && /* @__PURE__ */ F.jsx(
          Rt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        u && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, {}) }),
        o && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, {}) }),
        t.map((l) => /* @__PURE__ */ F.jsx(
          Gi,
          {
            dataKey: l.dataKey,
            type: S_[i] ?? i,
            stroke: `var(--color-${l.dataKey})`,
            strokeWidth: 2,
            dot: a
          },
          l.dataKey
        ))
      ] })
    }
  );
}
function lB({
  data: e = [],
  series: t,
  xAxis: r,
  height: n = 300,
  stacked: i = !1,
  curve: a = "linear",
  showDots: o = !1,
  showLegend: u = !1,
  showTooltip: c = !0,
  showGrid: s = !0,
  className: f
}) {
  if (typeof e == "string") return null;
  const l = Zo(t);
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: l,
      className: f,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(tB, { data: e, children: [
        s && /* @__PURE__ */ F.jsx(Xo, { vertical: !1 }),
        r && /* @__PURE__ */ F.jsx(
          Rt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        c && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, {}) }),
        u && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, {}) }),
        t.map((p) => /* @__PURE__ */ F.jsx(
          Jt,
          {
            dataKey: p.dataKey,
            type: S_[a] ?? a,
            fill: `var(--color-${p.dataKey})`,
            stroke: `var(--color-${p.dataKey})`,
            fillOpacity: 0.4,
            dot: o,
            stackId: i ? "stack" : void 0
          },
          p.dataKey
        ))
      ] })
    }
  );
}
function fB({
  data: e = [],
  dataKey: t,
  nameKey: r,
  height: n = 300,
  innerRadius: i = 0,
  showLabel: a = !1,
  paddingAngle: o = 0,
  showLegend: u = !1,
  showTooltip: c = !0,
  className: s
}) {
  if (typeof e == "string") return null;
  const f = P_(e, r), l = e.map((p, d) => ({
    ...p,
    fill: Gt[d % Gt.length]
  }));
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(Qq, { children: [
        c && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, { nameKey: r }) }),
        u && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, { nameKey: r }) }),
        /* @__PURE__ */ F.jsx(
          qt,
          {
            data: l,
            dataKey: t,
            nameKey: r,
            innerRadius: i,
            label: a,
            paddingAngle: o
          }
        )
      ] })
    }
  );
}
function pB({
  data: e = [],
  series: t,
  axisKey: r,
  height: n = 300,
  filled: i = !0,
  showDots: a = !1,
  showLegend: o = !1,
  showTooltip: u = !0,
  showGrid: c = !0,
  className: s
}) {
  if (typeof e == "string") return null;
  const f = Zo(t);
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(eB, { data: e, children: [
        c && /* @__PURE__ */ F.jsx(bw, {}),
        r && /* @__PURE__ */ F.jsx(Er, { dataKey: r }),
        u && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, {}) }),
        o && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, {}) }),
        t.map((l) => /* @__PURE__ */ F.jsx(
          Ki,
          {
            dataKey: l.dataKey,
            fill: `var(--color-${l.dataKey})`,
            fillOpacity: i ? 0.3 : 0,
            stroke: `var(--color-${l.dataKey})`,
            strokeWidth: 2,
            dot: a
          },
          l.dataKey
        ))
      ] })
    }
  );
}
function hB({
  data: e = [],
  dataKey: t,
  nameKey: r,
  height: n = 300,
  innerRadius: i = 30,
  startAngle: a = 180,
  endAngle: o = 0,
  showLegend: u = !1,
  showTooltip: c = !0,
  className: s
}) {
  if (typeof e == "string") return null;
  const f = P_(e, r), l = e.map((p, d) => ({
    ...p,
    fill: Gt[d % Gt.length]
  }));
  return /* @__PURE__ */ F.jsx(
    $r,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ F.jsxs(
        rB,
        {
          data: l,
          innerRadius: i,
          startAngle: a,
          endAngle: o,
          children: [
            c && /* @__PURE__ */ F.jsx(In, { content: /* @__PURE__ */ F.jsx(Mr, { nameKey: r }) }),
            u && /* @__PURE__ */ F.jsx(kn, { content: /* @__PURE__ */ F.jsx(Cr, { nameKey: r }) }),
            /* @__PURE__ */ F.jsx(Hi, { dataKey: t })
          ]
        }
      )
    }
  );
}
export {
  lB as PrefabAreaChart,
  cB as PrefabBarChart,
  sB as PrefabLineChart,
  fB as PrefabPieChart,
  pB as PrefabRadarChart,
  hB as PrefabRadialChart
};
