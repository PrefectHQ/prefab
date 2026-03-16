import { a as Y, j as D, c as rt } from "./embed-CGSdzR6S.mjs";
import { n as ca, g as ce, a as R, R as _ } from "./icons-CImNZgDa.mjs";
var pu, Qh;
function Ke() {
  if (Qh) return pu;
  Qh = 1;
  var e = Array.isArray;
  return pu = e, pu;
}
var hu, ed;
function cx() {
  if (ed) return hu;
  ed = 1;
  var e = typeof ca == "object" && ca && ca.Object === Object && ca;
  return hu = e, hu;
}
var du, td;
function _t() {
  if (td) return du;
  td = 1;
  var e = cx(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return du = r, du;
}
var vu, rd;
function Gi() {
  if (rd) return vu;
  rd = 1;
  var e = _t(), t = e.Symbol;
  return vu = t, vu;
}
var yu, nd;
function VA() {
  if (nd) return yu;
  nd = 1;
  var e = Gi(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
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
  return yu = a, yu;
}
var mu, id;
function XA() {
  if (id) return mu;
  id = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return mu = r, mu;
}
var gu, ad;
function Lt() {
  if (ad) return gu;
  ad = 1;
  var e = Gi(), t = VA(), r = XA(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? i : n : a && a in Object(u) ? t(u) : r(u);
  }
  return gu = o, gu;
}
var bu, od;
function qt() {
  if (od) return bu;
  od = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return bu = e, bu;
}
var xu, ud;
function Tn() {
  if (ud) return xu;
  ud = 1;
  var e = Lt(), t = qt(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return xu = n, xu;
}
var Ou, cd;
function Hp() {
  if (cd) return Ou;
  cd = 1;
  var e = Ke(), t = Tn(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, o) {
    if (e(a))
      return !1;
    var u = typeof a;
    return u == "number" || u == "symbol" || u == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || o != null && a in Object(o);
  }
  return Ou = i, Ou;
}
var wu, sd;
function Jt() {
  if (sd) return wu;
  sd = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return wu = e, wu;
}
var Au, ld;
function Gp() {
  if (ld) return Au;
  ld = 1;
  var e = Lt(), t = Jt(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var c = e(u);
    return c == n || c == i || c == r || c == a;
  }
  return Au = o, Au;
}
var _u, fd;
function YA() {
  if (fd) return _u;
  fd = 1;
  var e = _t(), t = e["__core-js_shared__"];
  return _u = t, _u;
}
var Pu, pd;
function ZA() {
  if (pd) return Pu;
  pd = 1;
  var e = YA(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return Pu = r, Pu;
}
var Su, hd;
function sx() {
  if (hd) return Su;
  hd = 1;
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
  return Su = r, Su;
}
var ju, dd;
function JA() {
  if (dd) return ju;
  dd = 1;
  var e = Gp(), t = ZA(), r = Jt(), n = sx(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, c = o.toString, s = u.hasOwnProperty, f = RegExp(
    "^" + c.call(s).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(p) {
    if (!r(p) || t(p))
      return !1;
    var h = e(p) ? f : a;
    return h.test(n(p));
  }
  return ju = l, ju;
}
var Eu, vd;
function QA() {
  if (vd) return Eu;
  vd = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return Eu = e, Eu;
}
var Tu, yd;
function Tr() {
  if (yd) return Tu;
  yd = 1;
  var e = JA(), t = QA();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return Tu = r, Tu;
}
var $u, md;
function Mo() {
  if (md) return $u;
  md = 1;
  var e = Tr(), t = e(Object, "create");
  return $u = t, $u;
}
var Mu, gd;
function e_() {
  if (gd) return Mu;
  gd = 1;
  var e = Mo();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Mu = t, Mu;
}
var Iu, bd;
function t_() {
  if (bd) return Iu;
  bd = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return Iu = e, Iu;
}
var Cu, xd;
function r_() {
  if (xd) return Cu;
  xd = 1;
  var e = Mo(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var o = this.__data__;
    if (e) {
      var u = o[a];
      return u === t ? void 0 : u;
    }
    return n.call(o, a) ? o[a] : void 0;
  }
  return Cu = i, Cu;
}
var ku, Od;
function n_() {
  if (Od) return ku;
  Od = 1;
  var e = Mo(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return ku = n, ku;
}
var Ru, wd;
function i_() {
  if (wd) return Ru;
  wd = 1;
  var e = Mo(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return Ru = r, Ru;
}
var Du, Ad;
function a_() {
  if (Ad) return Du;
  Ad = 1;
  var e = e_(), t = t_(), r = r_(), n = n_(), i = i_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Du = a, Du;
}
var Nu, _d;
function o_() {
  if (_d) return Nu;
  _d = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Nu = e, Nu;
}
var Lu, Pd;
function Vp() {
  if (Pd) return Lu;
  Pd = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return Lu = e, Lu;
}
var qu, Sd;
function Io() {
  if (Sd) return qu;
  Sd = 1;
  var e = Vp();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return qu = t, qu;
}
var Bu, jd;
function u_() {
  if (jd) return Bu;
  jd = 1;
  var e = Io(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, o = e(a, i);
    if (o < 0)
      return !1;
    var u = a.length - 1;
    return o == u ? a.pop() : r.call(a, o, 1), --this.size, !0;
  }
  return Bu = n, Bu;
}
var Fu, Ed;
function c_() {
  if (Ed) return Fu;
  Ed = 1;
  var e = Io();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return Fu = t, Fu;
}
var zu, Td;
function s_() {
  if (Td) return zu;
  Td = 1;
  var e = Io();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return zu = t, zu;
}
var Wu, $d;
function l_() {
  if ($d) return Wu;
  $d = 1;
  var e = Io();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return Wu = t, Wu;
}
var Ku, Md;
function Co() {
  if (Md) return Ku;
  Md = 1;
  var e = o_(), t = u_(), r = c_(), n = s_(), i = l_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Ku = a, Ku;
}
var Uu, Id;
function Xp() {
  if (Id) return Uu;
  Id = 1;
  var e = Tr(), t = _t(), r = e(t, "Map");
  return Uu = r, Uu;
}
var Hu, Cd;
function f_() {
  if (Cd) return Hu;
  Cd = 1;
  var e = a_(), t = Co(), r = Xp();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return Hu = n, Hu;
}
var Gu, kd;
function p_() {
  if (kd) return Gu;
  kd = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return Gu = e, Gu;
}
var Vu, Rd;
function ko() {
  if (Rd) return Vu;
  Rd = 1;
  var e = p_();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return Vu = t, Vu;
}
var Xu, Dd;
function h_() {
  if (Dd) return Xu;
  Dd = 1;
  var e = ko();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return Xu = t, Xu;
}
var Yu, Nd;
function d_() {
  if (Nd) return Yu;
  Nd = 1;
  var e = ko();
  function t(r) {
    return e(this, r).get(r);
  }
  return Yu = t, Yu;
}
var Zu, Ld;
function v_() {
  if (Ld) return Zu;
  Ld = 1;
  var e = ko();
  function t(r) {
    return e(this, r).has(r);
  }
  return Zu = t, Zu;
}
var Ju, qd;
function y_() {
  if (qd) return Ju;
  qd = 1;
  var e = ko();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return Ju = t, Ju;
}
var Qu, Bd;
function Yp() {
  if (Bd) return Qu;
  Bd = 1;
  var e = f_(), t = h_(), r = d_(), n = v_(), i = y_();
  function a(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Qu = a, Qu;
}
var ec, Fd;
function lx() {
  if (Fd) return ec;
  Fd = 1;
  var e = Yp(), t = "Expected a function";
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
  return r.Cache = e, ec = r, ec;
}
var tc, zd;
function m_() {
  if (zd) return tc;
  zd = 1;
  var e = lx(), t = 500;
  function r(n) {
    var i = e(n, function(o) {
      return a.size === t && a.clear(), o;
    }), a = i.cache;
    return i;
  }
  return tc = r, tc;
}
var rc, Wd;
function g_() {
  if (Wd) return rc;
  Wd = 1;
  var e = m_(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(o, u, c, s) {
      a.push(c ? s.replace(r, "$1") : u || o);
    }), a;
  });
  return rc = n, rc;
}
var nc, Kd;
function Zp() {
  if (Kd) return nc;
  Kd = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return nc = e, nc;
}
var ic, Ud;
function b_() {
  if (Ud) return ic;
  Ud = 1;
  var e = Gi(), t = Zp(), r = Ke(), n = Tn(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
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
  return ic = o, ic;
}
var ac, Hd;
function fx() {
  if (Hd) return ac;
  Hd = 1;
  var e = b_();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return ac = t, ac;
}
var oc, Gd;
function px() {
  if (Gd) return oc;
  Gd = 1;
  var e = Ke(), t = Hp(), r = g_(), n = fx();
  function i(a, o) {
    return e(a) ? a : t(a, o) ? [a] : r(n(a));
  }
  return oc = i, oc;
}
var uc, Vd;
function Ro() {
  if (Vd) return uc;
  Vd = 1;
  var e = Tn();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return uc = t, uc;
}
var cc, Xd;
function Jp() {
  if (Xd) return cc;
  Xd = 1;
  var e = px(), t = Ro();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, o = i.length; n != null && a < o; )
      n = n[t(i[a++])];
    return a && a == o ? n : void 0;
  }
  return cc = r, cc;
}
var sc, Yd;
function hx() {
  if (Yd) return sc;
  Yd = 1;
  var e = Jp();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return sc = t, sc;
}
var x_ = hx();
const Ye = /* @__PURE__ */ ce(x_);
var lc, Zd;
function O_() {
  if (Zd) return lc;
  Zd = 1;
  function e(t) {
    return t == null;
  }
  return lc = e, lc;
}
var w_ = O_();
const V = /* @__PURE__ */ ce(w_);
var fc, Jd;
function A_() {
  if (Jd) return fc;
  Jd = 1;
  var e = Lt(), t = Ke(), r = qt(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return fc = i, fc;
}
var __ = A_();
const _r = /* @__PURE__ */ ce(__);
var P_ = Gp();
const G = /* @__PURE__ */ ce(P_);
var S_ = Jt();
const $n = /* @__PURE__ */ ce(S_);
var pc = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qd;
function j_() {
  if (Qd) return ae;
  Qd = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function v(d) {
    if (typeof d == "object" && d !== null) {
      var g = d.$$typeof;
      switch (g) {
        case e:
          switch (d = d.type, d) {
            case r:
            case i:
            case n:
            case s:
            case f:
              return d;
            default:
              switch (d = d && d.$$typeof, d) {
                case u:
                case o:
                case c:
                case p:
                case l:
                case a:
                  return d;
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
  }, ae.isContextConsumer = function(d) {
    return v(d) === o;
  }, ae.isContextProvider = function(d) {
    return v(d) === a;
  }, ae.isElement = function(d) {
    return typeof d == "object" && d !== null && d.$$typeof === e;
  }, ae.isForwardRef = function(d) {
    return v(d) === c;
  }, ae.isFragment = function(d) {
    return v(d) === r;
  }, ae.isLazy = function(d) {
    return v(d) === p;
  }, ae.isMemo = function(d) {
    return v(d) === l;
  }, ae.isPortal = function(d) {
    return v(d) === t;
  }, ae.isProfiler = function(d) {
    return v(d) === i;
  }, ae.isStrictMode = function(d) {
    return v(d) === n;
  }, ae.isSuspense = function(d) {
    return v(d) === s;
  }, ae.isSuspenseList = function(d) {
    return v(d) === f;
  }, ae.isValidElementType = function(d) {
    return typeof d == "string" || typeof d == "function" || d === r || d === i || d === n || d === s || d === f || d === h || typeof d == "object" && d !== null && (d.$$typeof === p || d.$$typeof === l || d.$$typeof === a || d.$$typeof === o || d.$$typeof === c || d.$$typeof === y || d.getModuleId !== void 0);
  }, ae.typeOf = v, ae;
}
var ev;
function E_() {
  return ev || (ev = 1, pc.exports = j_()), pc.exports;
}
var T_ = E_(), hc, tv;
function dx() {
  if (tv) return hc;
  tv = 1;
  var e = Lt(), t = qt(), r = "[object Number]";
  function n(i) {
    return typeof i == "number" || t(i) && e(i) == r;
  }
  return hc = n, hc;
}
var dc, rv;
function $_() {
  if (rv) return dc;
  rv = 1;
  var e = dx();
  function t(r) {
    return e(r) && r != +r;
  }
  return dc = t, dc;
}
var M_ = $_();
const Mn = /* @__PURE__ */ ce(M_);
var I_ = dx();
const C_ = /* @__PURE__ */ ce(I_);
var Me = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, vr = function(t) {
  return _r(t) && t.indexOf("%") === t.length - 1;
}, q = function(t) {
  return C_(t) && !Mn(t);
}, k_ = function(t) {
  return V(t);
}, Se = function(t) {
  return q(t) || _r(t);
}, R_ = 0, Qt = function(t) {
  var r = ++R_;
  return "".concat(t || "").concat(r);
}, Le = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!q(t) && !_r(t))
    return n;
  var a;
  if (vr(t)) {
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Mn(a) && (a = n), i && a > r && (a = r), a;
}, Ut = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, D_ = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, i = 0; i < r; i++)
    if (!n[t[i]])
      n[t[i]] = !0;
    else
      return !0;
  return !1;
}, ue = function(t, r) {
  return q(t) && q(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function Aa(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : Ye(n, t)) === r;
  });
}
var N_ = function(t) {
  if (!t || !t.length)
    return null;
  for (var r = t.length, n = 0, i = 0, a = 0, o = 0, u = 1 / 0, c = -1 / 0, s = 0, f = 0, l = 0; l < r; l++)
    s = t[l].cx || 0, f = t[l].cy || 0, n += s, i += f, a += s * f, o += s * s, u = Math.min(u, s), c = Math.max(c, s);
  var p = r * o !== n * n ? (r * a - n * i) / (r * o - n * n) : 0;
  return {
    xmin: u,
    xmax: c,
    a: p,
    b: (i - p * n) / r
  };
}, L_ = function(t, r) {
  return q(t) && q(r) ? t - r : _r(t) && _r(r) ? t.localeCompare(r) : t instanceof Date && r instanceof Date ? t.getTime() - r.getTime() : String(t).localeCompare(String(r));
};
function Vr(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function gf(e) {
  "@babel/helpers - typeof";
  return gf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gf(e);
}
var q_ = ["viewBox", "children"], B_ = [
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
], nv = ["points", "pathLength"], vc = {
  svg: q_,
  polygon: nv,
  polyline: nv
}, Qp = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], _a = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ R.isValidElement(t) && (n = t.props), !$n(n))
    return null;
  var i = {};
  return Object.keys(n).forEach(function(a) {
    Qp.includes(a) && (i[a] = r || function(o) {
      return n[a](n, o);
    });
  }), i;
}, F_ = function(t, r, n) {
  return function(i) {
    return t(r, n, i), null;
  };
}, Ot = function(t, r, n) {
  if (!$n(t) || gf(t) !== "object")
    return null;
  var i = null;
  return Object.keys(t).forEach(function(a) {
    var o = t[a];
    Qp.includes(a) && typeof o == "function" && (i || (i = {}), i[a] = F_(o, r, n));
  }), i;
}, z_ = ["children"], W_ = ["children"];
function iv(e, t) {
  if (e == null) return {};
  var r = K_(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function K_(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function bf(e) {
  "@babel/helpers - typeof";
  return bf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bf(e);
}
var av = {
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
}, It = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, ov = null, yc = null, eh = function e(t) {
  if (t === ov && Array.isArray(yc))
    return yc;
  var r = [];
  return R.Children.forEach(t, function(n) {
    V(n) || (T_.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), yc = r, ov = t, r;
};
function De(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(i) {
    return It(i);
  }) : n = [It(t)], eh(e).forEach(function(i) {
    var a = Ye(i, "type.displayName") || Ye(i, "type.name");
    n.indexOf(a) !== -1 && r.push(i);
  }), r;
}
function Ve(e, t) {
  var r = De(e, t);
  return r && r[0];
}
var uv = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, i = r.height;
  return !(!q(n) || n <= 0 || !q(i) || i <= 0);
}, U_ = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], H_ = function(t) {
  return t && t.type && _r(t.type) && U_.indexOf(t.type) >= 0;
}, vx = function(t) {
  return t && bf(t) === "object" && "clipDot" in t;
}, G_ = function(t, r, n, i) {
  var a, o = (a = vc == null ? void 0 : vc[i]) !== null && a !== void 0 ? a : [];
  return r.startsWith("data-") || !G(t) && (i && o.includes(r) || B_.includes(r)) || n && Qp.includes(r);
}, W = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var i = t;
  if (/* @__PURE__ */ R.isValidElement(t) && (i = t.props), !$n(i))
    return null;
  var a = {};
  return Object.keys(i).forEach(function(o) {
    var u;
    G_((u = i) === null || u === void 0 ? void 0 : u[o], o, r, n) && (a[o] = i[o]);
  }), a;
}, xf = function e(t, r) {
  if (t === r)
    return !0;
  var n = R.Children.count(t);
  if (n !== R.Children.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return cv(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var i = 0; i < n; i++) {
    var a = t[i], o = r[i];
    if (Array.isArray(a) || Array.isArray(o)) {
      if (!e(a, o))
        return !1;
    } else if (!cv(a, o))
      return !1;
  }
  return !0;
}, cv = function(t, r) {
  if (V(t) && V(r))
    return !0;
  if (!V(t) && !V(r)) {
    var n = t.props || {}, i = n.children, a = iv(n, z_), o = r.props || {}, u = o.children, c = iv(o, W_);
    return i && u ? Vr(a, c) && xf(i, u) : !i && !u ? Vr(a, c) : !1;
  }
  return !1;
}, sv = function(t, r) {
  var n = [], i = {};
  return eh(t).forEach(function(a, o) {
    if (H_(a))
      n.push(a);
    else if (a) {
      var u = It(a.type), c = r[u] || {}, s = c.handler, f = c.once;
      if (s && (!f || !i[u])) {
        var l = s(a, u, o);
        n.push(l), i[u] = !0;
      }
    }
  }), n;
}, V_ = function(t) {
  var r = t && t.type;
  return r && av[r] ? av[r] : null;
}, X_ = function(t, r) {
  return eh(r).indexOf(t);
}, Y_ = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Of() {
  return Of = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Of.apply(this, arguments);
}
function Z_(e, t) {
  if (e == null) return {};
  var r = J_(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function J_(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function wf(e) {
  var t = e.children, r = e.width, n = e.height, i = e.viewBox, a = e.className, o = e.style, u = e.title, c = e.desc, s = Z_(e, Y_), f = i || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, l = Y("recharts-surface", a);
  return /* @__PURE__ */ _.createElement("svg", Of({}, W(s, !0, "svg"), {
    className: l,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), /* @__PURE__ */ _.createElement("title", null, u), /* @__PURE__ */ _.createElement("desc", null, c), t);
}
var Q_ = ["children", "className"];
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
function eP(e, t) {
  if (e == null) return {};
  var r = tP(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function tP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var J = /* @__PURE__ */ _.forwardRef(function(e, t) {
  var r = e.children, n = e.className, i = eP(e, Q_), a = Y("recharts-layer", n);
  return /* @__PURE__ */ _.createElement("g", Af({
    className: a
  }, W(i, !0), {
    ref: t
  }), r);
}), ft = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
}, mc, lv;
function rP() {
  if (lv) return mc;
  lv = 1;
  function e(t, r, n) {
    var i = -1, a = t.length;
    r < 0 && (r = -r > a ? 0 : a + r), n = n > a ? a : n, n < 0 && (n += a), a = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(a); ++i < a; )
      o[i] = t[i + r];
    return o;
  }
  return mc = e, mc;
}
var gc, fv;
function nP() {
  if (fv) return gc;
  fv = 1;
  var e = rP();
  function t(r, n, i) {
    var a = r.length;
    return i = i === void 0 ? a : i, !n && i >= a ? r : e(r, n, i);
  }
  return gc = t, gc;
}
var bc, pv;
function yx() {
  if (pv) return bc;
  pv = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + e + i + a + "]");
  function c(s) {
    return u.test(s);
  }
  return bc = c, bc;
}
var xc, hv;
function iP() {
  if (hv) return xc;
  hv = 1;
  function e(t) {
    return t.split("");
  }
  return xc = e, xc;
}
var Oc, dv;
function aP() {
  if (dv) return Oc;
  dv = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", o = "[" + e + "]", u = "[" + i + "]", c = "\\ud83c[\\udffb-\\udfff]", s = "(?:" + u + "|" + c + ")", f = "[^" + e + "]", l = "(?:\\ud83c[\\udde6-\\uddff]){2}", p = "[\\ud800-\\udbff][\\udc00-\\udfff]", h = "\\u200d", y = s + "?", v = "[" + a + "]?", d = "(?:" + h + "(?:" + [f, l, p].join("|") + ")" + v + y + ")*", g = v + y + d, b = "(?:" + [f + u + "?", u, l, p, o].join("|") + ")", O = RegExp(c + "(?=" + c + ")|" + b + g, "g");
  function w(m) {
    return m.match(O) || [];
  }
  return Oc = w, Oc;
}
var wc, vv;
function oP() {
  if (vv) return wc;
  vv = 1;
  var e = iP(), t = yx(), r = aP();
  function n(i) {
    return t(i) ? r(i) : e(i);
  }
  return wc = n, wc;
}
var Ac, yv;
function uP() {
  if (yv) return Ac;
  yv = 1;
  var e = nP(), t = yx(), r = oP(), n = fx();
  function i(a) {
    return function(o) {
      o = n(o);
      var u = t(o) ? r(o) : void 0, c = u ? u[0] : o.charAt(0), s = u ? e(u, 1).join("") : o.slice(1);
      return c[a]() + s;
    };
  }
  return Ac = i, Ac;
}
var _c, mv;
function cP() {
  if (mv) return _c;
  mv = 1;
  var e = uP(), t = e("toUpperCase");
  return _c = t, _c;
}
var sP = cP();
const Do = /* @__PURE__ */ ce(sP);
function he(e) {
  return function() {
    return e;
  };
}
const mx = Math.cos, Pa = Math.sin, dt = Math.sqrt, Sa = Math.PI, No = 2 * Sa, _f = Math.PI, Pf = 2 * _f, pr = 1e-6, lP = Pf - pr;
function gx(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function fP(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return gx;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class pP {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? gx : fP(t);
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
    else if (p > pr) if (!(Math.abs(l * c - s * f) > pr) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, y = i - u, v = c * c + s * s, d = h * h + y * y, g = Math.sqrt(v), b = Math.sqrt(p), O = a * Math.tan((_f - Math.acos((v + p - d) / (2 * g * b))) / 2), w = O / b, m = O / g;
      Math.abs(w - 1) > pr && this._append`L${t + w * f},${r + w * l}`, this._append`A${a},${a},0,0,${+(l * h > f * y)},${this._x1 = t + m * c},${this._y1 = r + m * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i), c = n * Math.sin(i), s = t + u, f = r + c, l = 1 ^ o, p = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${f}` : (Math.abs(this._x1 - s) > pr || Math.abs(this._y1 - f) > pr) && this._append`L${s},${f}`, n && (p < 0 && (p = p % Pf + Pf), p > lP ? this._append`A${n},${n},0,1,${l},${t - u},${r - c}A${n},${n},0,1,${l},${this._x1 = s},${this._y1 = f}` : p > pr && this._append`A${n},${n},0,${+(p >= _f)},${l},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function th(e) {
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
  }, () => new pP(t);
}
function rh(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function bx(e) {
  this._context = e;
}
bx.prototype = {
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
function Lo(e) {
  return new bx(e);
}
function xx(e) {
  return e[0];
}
function Ox(e) {
  return e[1];
}
function wx(e, t) {
  var r = he(!0), n = null, i = Lo, a = null, o = th(u);
  e = typeof e == "function" ? e : e === void 0 ? xx : he(e), t = typeof t == "function" ? t : t === void 0 ? Ox : he(t);
  function u(c) {
    var s, f = (c = rh(c)).length, l, p = !1, h;
    for (n == null && (a = i(h = o())), s = 0; s <= f; ++s)
      !(s < f && r(l = c[s], s, c)) === p && ((p = !p) ? a.lineStart() : a.lineEnd()), p && a.point(+e(l, s, c), +t(l, s, c));
    if (h) return a = null, h + "" || null;
  }
  return u.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : he(+c), u) : e;
  }, u.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : he(+c), u) : t;
  }, u.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : he(!!c), u) : r;
  }, u.curve = function(c) {
    return arguments.length ? (i = c, n != null && (a = i(n)), u) : i;
  }, u.context = function(c) {
    return arguments.length ? (c == null ? n = a = null : a = i(n = c), u) : n;
  }, u;
}
function sa(e, t, r) {
  var n = null, i = he(!0), a = null, o = Lo, u = null, c = th(s);
  e = typeof e == "function" ? e : e === void 0 ? xx : he(+e), t = typeof t == "function" ? t : he(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? Ox : he(+r);
  function s(l) {
    var p, h, y, v = (l = rh(l)).length, d, g = !1, b, O = new Array(v), w = new Array(v);
    for (a == null && (u = o(b = c())), p = 0; p <= v; ++p) {
      if (!(p < v && i(d = l[p], p, l)) === g)
        if (g = !g)
          h = p, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = p - 1; y >= h; --y)
            u.point(O[y], w[y]);
          u.lineEnd(), u.areaEnd();
        }
      g && (O[p] = +e(d, p, l), w[p] = +t(d, p, l), u.point(n ? +n(d, p, l) : O[p], r ? +r(d, p, l) : w[p]));
    }
    if (b) return u = null, b + "" || null;
  }
  function f() {
    return wx().defined(i).curve(o).context(a);
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : he(+l), n = null, s) : e;
  }, s.x0 = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : he(+l), s) : e;
  }, s.x1 = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : he(+l), s) : n;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : he(+l), r = null, s) : t;
  }, s.y0 = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : he(+l), s) : t;
  }, s.y1 = function(l) {
    return arguments.length ? (r = l == null ? null : typeof l == "function" ? l : he(+l), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return f().x(e).y(t);
  }, s.lineY1 = function() {
    return f().x(e).y(r);
  }, s.lineX1 = function() {
    return f().x(n).y(t);
  }, s.defined = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : he(!!l), s) : i;
  }, s.curve = function(l) {
    return arguments.length ? (o = l, a != null && (u = o(a)), s) : o;
  }, s.context = function(l) {
    return arguments.length ? (l == null ? a = u = null : u = o(a = l), s) : a;
  }, s;
}
class Ax {
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
function hP(e) {
  return new Ax(e, !0);
}
function dP(e) {
  return new Ax(e, !1);
}
const nh = {
  draw(e, t) {
    const r = dt(t / Sa);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, No);
  }
}, vP = {
  draw(e, t) {
    const r = dt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, _x = dt(1 / 3), yP = _x * 2, mP = {
  draw(e, t) {
    const r = dt(t / yP), n = r * _x;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, gP = {
  draw(e, t) {
    const r = dt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, bP = 0.8908130915292852, Px = Pa(Sa / 10) / Pa(7 * Sa / 10), xP = Pa(No / 10) * Px, OP = -mx(No / 10) * Px, wP = {
  draw(e, t) {
    const r = dt(t * bP), n = xP * r, i = OP * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = No * a / 5, u = mx(o), c = Pa(o);
      e.lineTo(c * r, -u * r), e.lineTo(u * n - c * i, c * n + u * i);
    }
    e.closePath();
  }
}, Pc = dt(3), AP = {
  draw(e, t) {
    const r = -dt(t / (Pc * 3));
    e.moveTo(0, r * 2), e.lineTo(-Pc * r, -r), e.lineTo(Pc * r, -r), e.closePath();
  }
}, Je = -0.5, Qe = dt(3) / 2, Sf = 1 / dt(12), _P = (Sf / 2 + 1) * 3, PP = {
  draw(e, t) {
    const r = dt(t / _P), n = r / 2, i = r * Sf, a = n, o = r * Sf + r, u = -a, c = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, c), e.lineTo(Je * n - Qe * i, Qe * n + Je * i), e.lineTo(Je * a - Qe * o, Qe * a + Je * o), e.lineTo(Je * u - Qe * c, Qe * u + Je * c), e.lineTo(Je * n + Qe * i, Je * i - Qe * n), e.lineTo(Je * a + Qe * o, Je * o - Qe * a), e.lineTo(Je * u + Qe * c, Je * c - Qe * u), e.closePath();
  }
};
function SP(e, t) {
  let r = null, n = th(i);
  e = typeof e == "function" ? e : he(e || nh), t = typeof t == "function" ? t : he(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : he(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : he(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function ja() {
}
function Ea(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Sx(e) {
  this._context = e;
}
Sx.prototype = {
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
        Ea(this, this._x1, this._y1);
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
        Ea(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function jP(e) {
  return new Sx(e);
}
function jx(e) {
  this._context = e;
}
jx.prototype = {
  areaStart: ja,
  areaEnd: ja,
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
        Ea(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function EP(e) {
  return new jx(e);
}
function Ex(e) {
  this._context = e;
}
Ex.prototype = {
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
        Ea(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function TP(e) {
  return new Ex(e);
}
function Tx(e) {
  this._context = e;
}
Tx.prototype = {
  areaStart: ja,
  areaEnd: ja,
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
function $P(e) {
  return new Tx(e);
}
function gv(e) {
  return e < 0 ? -1 : 1;
}
function bv(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), u = (a * i + o * n) / (n + i);
  return (gv(a) + gv(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function xv(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Sc(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function Ta(e) {
  this._context = e;
}
Ta.prototype = {
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
        Sc(this, this._t0, xv(this, this._t0));
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
          this._point = 3, Sc(this, xv(this, r = bv(this, e, t)), r);
          break;
        default:
          Sc(this, this._t0, r = bv(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function $x(e) {
  this._context = new Mx(e);
}
($x.prototype = Object.create(Ta.prototype)).point = function(e, t) {
  Ta.prototype.point.call(this, t, e);
};
function Mx(e) {
  this._context = e;
}
Mx.prototype = {
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
function MP(e) {
  return new Ta(e);
}
function IP(e) {
  return new $x(e);
}
function Ix(e) {
  this._context = e;
}
Ix.prototype = {
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
        for (var n = Ov(e), i = Ov(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Ov(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function CP(e) {
  return new Ix(e);
}
function qo(e, t) {
  this._context = e, this._t = t;
}
qo.prototype = {
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
function kP(e) {
  return new qo(e, 0.5);
}
function RP(e) {
  return new qo(e, 0);
}
function DP(e) {
  return new qo(e, 1);
}
function Zr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function jf(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function NP(e, t) {
  return e[t];
}
function LP(e) {
  const t = [];
  return t.key = e, t;
}
function qP() {
  var e = he([]), t = jf, r = Zr, n = NP;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), LP), u, c = o.length, s = -1, f;
    for (const l of a)
      for (u = 0, ++s; u < c; ++u)
        (o[u][s] = [0, +n(l, o[u].key, s, a)]).data = l;
    for (u = 0, f = rh(t(o)); u < c; ++u)
      o[f[u]].index = u;
    return r(o, f), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : he(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : he(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? jf : typeof a == "function" ? a : he(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Zr, i) : r;
  }, i;
}
function BP(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Zr(e, t);
  }
}
function FP(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Zr(e, t);
  }
}
function zP(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, c = 0, s = 0; u < o; ++u) {
        for (var f = e[t[u]], l = f[n][1] || 0, p = f[n - 1][1] || 0, h = (l - p) / 2, y = 0; y < u; ++y) {
          var v = e[t[y]], d = v[n][1] || 0, g = v[n - 1][1] || 0;
          h += d - g;
        }
        c += l, s += h * l;
      }
      i[n - 1][1] += i[n - 1][0] = r, c && (r -= s / c);
    }
    i[n - 1][1] += i[n - 1][0] = r, Zr(e, t);
  }
}
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
var WP = ["type", "size", "sizeType"];
function Ef() {
  return Ef = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ef.apply(this, arguments);
}
function wv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Av(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wv(Object(r), !0).forEach(function(n) {
      KP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function KP(e, t, r) {
  return t = UP(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UP(e) {
  var t = HP(e, "string");
  return ci(t) == "symbol" ? t : t + "";
}
function HP(e, t) {
  if (ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function GP(e, t) {
  if (e == null) return {};
  var r = VP(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function VP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var Cx = {
  symbolCircle: nh,
  symbolCross: vP,
  symbolDiamond: mP,
  symbolSquare: gP,
  symbolStar: wP,
  symbolTriangle: AP,
  symbolWye: PP
}, XP = Math.PI / 180, YP = function(t) {
  var r = "symbol".concat(Do(t));
  return Cx[r] || nh;
}, ZP = function(t, r, n) {
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
      var i = 18 * XP;
      return 1.25 * t * t * (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, JP = function(t, r) {
  Cx["symbol".concat(Do(t))] = r;
}, Bo = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, i = t.size, a = i === void 0 ? 64 : i, o = t.sizeType, u = o === void 0 ? "area" : o, c = GP(t, WP), s = Av(Av({}, c), {}, {
    type: n,
    size: a,
    sizeType: u
  }), f = function() {
    var d = YP(n), g = SP().type(d).size(ZP(a, u, n));
    return g();
  }, l = s.className, p = s.cx, h = s.cy, y = W(s, !0);
  return p === +p && h === +h && a === +a ? /* @__PURE__ */ _.createElement("path", Ef({}, y, {
    className: Y("recharts-symbols", l),
    transform: "translate(".concat(p, ", ").concat(h, ")"),
    d: f()
  })) : null;
};
Bo.registerSymbol = JP;
function Jr(e) {
  "@babel/helpers - typeof";
  return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jr(e);
}
function Tf() {
  return Tf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Tf.apply(this, arguments);
}
function _v(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function QP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _v(Object(r), !0).forEach(function(n) {
      si(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _v(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function e1(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function t1(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Rx(n.key), n);
  }
}
function r1(e, t, r) {
  return t && t1(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function n1(e, t, r) {
  return t = $a(t), i1(e, kx() ? Reflect.construct(t, r || [], $a(e).constructor) : t.apply(e, r));
}
function i1(e, t) {
  if (t && (Jr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return a1(e);
}
function a1(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function kx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (kx = function() {
    return !!e;
  })();
}
function $a(e) {
  return $a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $a(e);
}
function o1(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && $f(e, t);
}
function $f(e, t) {
  return $f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, $f(e, t);
}
function si(e, t, r) {
  return t = Rx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rx(e) {
  var t = u1(e, "string");
  return Jr(t) == "symbol" ? t : t + "";
}
function u1(e, t) {
  if (Jr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var et = 32, ih = /* @__PURE__ */ (function(e) {
  function t() {
    return e1(this, t), n1(this, t, arguments);
  }
  return o1(t, e), r1(t, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(n) {
        var i = this.props.inactiveColor, a = et / 2, o = et / 6, u = et / 3, c = n.inactive ? i : n.color;
        if (n.type === "plainline")
          return /* @__PURE__ */ _.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            strokeDasharray: n.payload.strokeDasharray,
            x1: 0,
            y1: a,
            x2: et,
            y2: a,
            className: "recharts-legend-icon"
          });
        if (n.type === "line")
          return /* @__PURE__ */ _.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: c,
            d: "M0,".concat(a, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(a, `
            H`).concat(et, "M").concat(2 * u, ",").concat(a, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(a),
            className: "recharts-legend-icon"
          });
        if (n.type === "rect")
          return /* @__PURE__ */ _.createElement("path", {
            stroke: "none",
            fill: c,
            d: "M0,".concat(et / 8, "h").concat(et, "v").concat(et * 3 / 4, "h").concat(-et, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ _.isValidElement(n.legendIcon)) {
          var s = QP({}, n);
          return delete s.legendIcon, /* @__PURE__ */ _.cloneElement(n.legendIcon, s);
        }
        return /* @__PURE__ */ _.createElement(Bo, {
          fill: c,
          cx: a,
          cy: a,
          size: et,
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
        width: et,
        height: et
      }, l = {
        display: u === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, p = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return a.map(function(h, y) {
        var v = h.formatter || c, d = Y(si(si({
          "recharts-legend-item": !0
        }, "legend-item-".concat(y), !0), "inactive", h.inactive));
        if (h.type === "none")
          return null;
        var g = G(h.value) ? null : h.value;
        ft(
          !G(h.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var b = h.inactive ? s : h.color;
        return /* @__PURE__ */ _.createElement("li", Tf({
          className: d,
          style: l,
          key: "legend-item-".concat(y)
        }, Ot(n.props, h, y)), /* @__PURE__ */ _.createElement(wf, {
          width: o,
          height: o,
          viewBox: f,
          style: p
        }, n.renderIcon(h)), /* @__PURE__ */ _.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: b
          }
        }, v ? v(g, h, y) : g));
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
      return /* @__PURE__ */ _.createElement("ul", {
        className: "recharts-default-legend",
        style: u
      }, this.renderItems());
    }
  }]);
})(R.PureComponent);
si(ih, "displayName", "Legend");
si(ih, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var jc, Pv;
function c1() {
  if (Pv) return jc;
  Pv = 1;
  var e = Co();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return jc = t, jc;
}
var Ec, Sv;
function s1() {
  if (Sv) return Ec;
  Sv = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Ec = e, Ec;
}
var Tc, jv;
function l1() {
  if (jv) return Tc;
  jv = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Tc = e, Tc;
}
var $c, Ev;
function f1() {
  if (Ev) return $c;
  Ev = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return $c = e, $c;
}
var Mc, Tv;
function p1() {
  if (Tv) return Mc;
  Tv = 1;
  var e = Co(), t = Xp(), r = Yp(), n = 200;
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
  return Mc = i, Mc;
}
var Ic, $v;
function Dx() {
  if ($v) return Ic;
  $v = 1;
  var e = Co(), t = c1(), r = s1(), n = l1(), i = f1(), a = p1();
  function o(u) {
    var c = this.__data__ = new e(u);
    this.size = c.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = i, o.prototype.set = a, Ic = o, Ic;
}
var Cc, Mv;
function h1() {
  if (Mv) return Cc;
  Mv = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return Cc = t, Cc;
}
var kc, Iv;
function d1() {
  if (Iv) return kc;
  Iv = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return kc = e, kc;
}
var Rc, Cv;
function Nx() {
  if (Cv) return Rc;
  Cv = 1;
  var e = Yp(), t = h1(), r = d1();
  function n(i) {
    var a = -1, o = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < o; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Rc = n, Rc;
}
var Dc, kv;
function Lx() {
  if (kv) return Dc;
  kv = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return Dc = e, Dc;
}
var Nc, Rv;
function qx() {
  if (Rv) return Nc;
  Rv = 1;
  function e(t, r) {
    return t.has(r);
  }
  return Nc = e, Nc;
}
var Lc, Dv;
function Bx() {
  if (Dv) return Lc;
  Dv = 1;
  var e = Nx(), t = Lx(), r = qx(), n = 1, i = 2;
  function a(o, u, c, s, f, l) {
    var p = c & n, h = o.length, y = u.length;
    if (h != y && !(p && y > h))
      return !1;
    var v = l.get(o), d = l.get(u);
    if (v && d)
      return v == u && d == o;
    var g = -1, b = !0, O = c & i ? new e() : void 0;
    for (l.set(o, u), l.set(u, o); ++g < h; ) {
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
        if (!t(u, function(A, P) {
          if (!r(O, P) && (w === A || f(w, A, c, s, l)))
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
  return Lc = a, Lc;
}
var qc, Nv;
function v1() {
  if (Nv) return qc;
  Nv = 1;
  var e = _t(), t = e.Uint8Array;
  return qc = t, qc;
}
var Bc, Lv;
function y1() {
  if (Lv) return Bc;
  Lv = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return Bc = e, Bc;
}
var Fc, qv;
function ah() {
  if (qv) return Fc;
  qv = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return Fc = e, Fc;
}
var zc, Bv;
function m1() {
  if (Bv) return zc;
  Bv = 1;
  var e = Gi(), t = v1(), r = Vp(), n = Bx(), i = y1(), a = ah(), o = 1, u = 2, c = "[object Boolean]", s = "[object Date]", f = "[object Error]", l = "[object Map]", p = "[object Number]", h = "[object RegExp]", y = "[object Set]", v = "[object String]", d = "[object Symbol]", g = "[object ArrayBuffer]", b = "[object DataView]", O = e ? e.prototype : void 0, w = O ? O.valueOf : void 0;
  function m(x, A, P, S, T, E, j) {
    switch (P) {
      case b:
        if (x.byteLength != A.byteLength || x.byteOffset != A.byteOffset)
          return !1;
        x = x.buffer, A = A.buffer;
      case g:
        return !(x.byteLength != A.byteLength || !E(new t(x), new t(A)));
      case c:
      case s:
      case p:
        return r(+x, +A);
      case f:
        return x.name == A.name && x.message == A.message;
      case h:
      case v:
        return x == A + "";
      case l:
        var $ = i;
      case y:
        var I = S & o;
        if ($ || ($ = a), x.size != A.size && !I)
          return !1;
        var M = j.get(x);
        if (M)
          return M == A;
        S |= u, j.set(x, A);
        var k = n($(x), $(A), S, T, E, j);
        return j.delete(x), k;
      case d:
        if (w)
          return w.call(x) == w.call(A);
    }
    return !1;
  }
  return zc = m, zc;
}
var Wc, Fv;
function Fx() {
  if (Fv) return Wc;
  Fv = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return Wc = e, Wc;
}
var Kc, zv;
function g1() {
  if (zv) return Kc;
  zv = 1;
  var e = Fx(), t = Ke();
  function r(n, i, a) {
    var o = i(n);
    return t(n) ? o : e(o, a(n));
  }
  return Kc = r, Kc;
}
var Uc, Wv;
function b1() {
  if (Wv) return Uc;
  Wv = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, o = []; ++n < i; ) {
      var u = t[n];
      r(u, n, t) && (o[a++] = u);
    }
    return o;
  }
  return Uc = e, Uc;
}
var Hc, Kv;
function x1() {
  if (Kv) return Hc;
  Kv = 1;
  function e() {
    return [];
  }
  return Hc = e, Hc;
}
var Gc, Uv;
function O1() {
  if (Uv) return Gc;
  Uv = 1;
  var e = b1(), t = x1(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(o) {
    return o == null ? [] : (o = Object(o), e(i(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return Gc = a, Gc;
}
var Vc, Hv;
function w1() {
  if (Hv) return Vc;
  Hv = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return Vc = e, Vc;
}
var Xc, Gv;
function A1() {
  if (Gv) return Xc;
  Gv = 1;
  var e = Lt(), t = qt(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return Xc = n, Xc;
}
var Yc, Vv;
function oh() {
  if (Vv) return Yc;
  Vv = 1;
  var e = A1(), t = qt(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !i.call(o, "callee");
  };
  return Yc = a, Yc;
}
var Yn = { exports: {} }, Zc, Xv;
function _1() {
  if (Xv) return Zc;
  Xv = 1;
  function e() {
    return !1;
  }
  return Zc = e, Zc;
}
Yn.exports;
var Yv;
function zx() {
  return Yv || (Yv = 1, (function(e, t) {
    var r = _t(), n = _1(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, u = o ? r.Buffer : void 0, c = u ? u.isBuffer : void 0, s = c || n;
    e.exports = s;
  })(Yn, Yn.exports)), Yn.exports;
}
var Jc, Zv;
function uh() {
  if (Zv) return Jc;
  Zv = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return Jc = r, Jc;
}
var Qc, Jv;
function ch() {
  if (Jv) return Qc;
  Jv = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return Qc = t, Qc;
}
var es, Qv;
function P1() {
  if (Qv) return es;
  Qv = 1;
  var e = Lt(), t = ch(), r = qt(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", o = "[object Date]", u = "[object Error]", c = "[object Function]", s = "[object Map]", f = "[object Number]", l = "[object Object]", p = "[object RegExp]", h = "[object Set]", y = "[object String]", v = "[object WeakMap]", d = "[object ArrayBuffer]", g = "[object DataView]", b = "[object Float32Array]", O = "[object Float64Array]", w = "[object Int8Array]", m = "[object Int16Array]", x = "[object Int32Array]", A = "[object Uint8Array]", P = "[object Uint8ClampedArray]", S = "[object Uint16Array]", T = "[object Uint32Array]", E = {};
  E[b] = E[O] = E[w] = E[m] = E[x] = E[A] = E[P] = E[S] = E[T] = !0, E[n] = E[i] = E[d] = E[a] = E[g] = E[o] = E[u] = E[c] = E[s] = E[f] = E[l] = E[p] = E[h] = E[y] = E[v] = !1;
  function j($) {
    return r($) && t($.length) && !!E[e($)];
  }
  return es = j, es;
}
var ts, ey;
function Wx() {
  if (ey) return ts;
  ey = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return ts = e, ts;
}
var Zn = { exports: {} };
Zn.exports;
var ty;
function S1() {
  return ty || (ty = 1, (function(e, t) {
    var r = cx(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a && r.process, u = (function() {
      try {
        var c = i && i.require && i.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(Zn, Zn.exports)), Zn.exports;
}
var rs, ry;
function Kx() {
  if (ry) return rs;
  ry = 1;
  var e = P1(), t = Wx(), r = S1(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return rs = i, rs;
}
var ns, ny;
function j1() {
  if (ny) return ns;
  ny = 1;
  var e = w1(), t = oh(), r = Ke(), n = zx(), i = uh(), a = Kx(), o = Object.prototype, u = o.hasOwnProperty;
  function c(s, f) {
    var l = r(s), p = !l && t(s), h = !l && !p && n(s), y = !l && !p && !h && a(s), v = l || p || h || y, d = v ? e(s.length, String) : [], g = d.length;
    for (var b in s)
      (f || u.call(s, b)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      y && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      i(b, g))) && d.push(b);
    return d;
  }
  return ns = c, ns;
}
var is, iy;
function E1() {
  if (iy) return is;
  iy = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return is = t, is;
}
var as, ay;
function Ux() {
  if (ay) return as;
  ay = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return as = e, as;
}
var os, oy;
function T1() {
  if (oy) return os;
  oy = 1;
  var e = Ux(), t = e(Object.keys, Object);
  return os = t, os;
}
var us, uy;
function $1() {
  if (uy) return us;
  uy = 1;
  var e = E1(), t = T1(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var o = [];
    for (var u in Object(a))
      n.call(a, u) && u != "constructor" && o.push(u);
    return o;
  }
  return us = i, us;
}
var cs, cy;
function Vi() {
  if (cy) return cs;
  cy = 1;
  var e = Gp(), t = ch();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return cs = r, cs;
}
var ss, sy;
function Fo() {
  if (sy) return ss;
  sy = 1;
  var e = j1(), t = $1(), r = Vi();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return ss = n, ss;
}
var ls, ly;
function M1() {
  if (ly) return ls;
  ly = 1;
  var e = g1(), t = O1(), r = Fo();
  function n(i) {
    return e(i, r, t);
  }
  return ls = n, ls;
}
var fs, fy;
function I1() {
  if (fy) return fs;
  fy = 1;
  var e = M1(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, o, u, c, s, f) {
    var l = u & t, p = e(a), h = p.length, y = e(o), v = y.length;
    if (h != v && !l)
      return !1;
    for (var d = h; d--; ) {
      var g = p[d];
      if (!(l ? g in o : n.call(o, g)))
        return !1;
    }
    var b = f.get(a), O = f.get(o);
    if (b && O)
      return b == o && O == a;
    var w = !0;
    f.set(a, o), f.set(o, a);
    for (var m = l; ++d < h; ) {
      g = p[d];
      var x = a[g], A = o[g];
      if (c)
        var P = l ? c(A, x, g, o, a, f) : c(x, A, g, a, o, f);
      if (!(P === void 0 ? x === A || s(x, A, u, c, f) : P)) {
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
  return fs = i, fs;
}
var ps, py;
function C1() {
  if (py) return ps;
  py = 1;
  var e = Tr(), t = _t(), r = e(t, "DataView");
  return ps = r, ps;
}
var hs, hy;
function k1() {
  if (hy) return hs;
  hy = 1;
  var e = Tr(), t = _t(), r = e(t, "Promise");
  return hs = r, hs;
}
var ds, dy;
function Hx() {
  if (dy) return ds;
  dy = 1;
  var e = Tr(), t = _t(), r = e(t, "Set");
  return ds = r, ds;
}
var vs, vy;
function R1() {
  if (vy) return vs;
  vy = 1;
  var e = Tr(), t = _t(), r = e(t, "WeakMap");
  return vs = r, vs;
}
var ys, yy;
function D1() {
  if (yy) return ys;
  yy = 1;
  var e = C1(), t = Xp(), r = k1(), n = Hx(), i = R1(), a = Lt(), o = sx(), u = "[object Map]", c = "[object Object]", s = "[object Promise]", f = "[object Set]", l = "[object WeakMap]", p = "[object DataView]", h = o(e), y = o(t), v = o(r), d = o(n), g = o(i), b = a;
  return (e && b(new e(new ArrayBuffer(1))) != p || t && b(new t()) != u || r && b(r.resolve()) != s || n && b(new n()) != f || i && b(new i()) != l) && (b = function(O) {
    var w = a(O), m = w == c ? O.constructor : void 0, x = m ? o(m) : "";
    if (x)
      switch (x) {
        case h:
          return p;
        case y:
          return u;
        case v:
          return s;
        case d:
          return f;
        case g:
          return l;
      }
    return w;
  }), ys = b, ys;
}
var ms, my;
function N1() {
  if (my) return ms;
  my = 1;
  var e = Dx(), t = Bx(), r = m1(), n = I1(), i = D1(), a = Ke(), o = zx(), u = Kx(), c = 1, s = "[object Arguments]", f = "[object Array]", l = "[object Object]", p = Object.prototype, h = p.hasOwnProperty;
  function y(v, d, g, b, O, w) {
    var m = a(v), x = a(d), A = m ? f : i(v), P = x ? f : i(d);
    A = A == s ? l : A, P = P == s ? l : P;
    var S = A == l, T = P == l, E = A == P;
    if (E && o(v)) {
      if (!o(d))
        return !1;
      m = !0, S = !1;
    }
    if (E && !S)
      return w || (w = new e()), m || u(v) ? t(v, d, g, b, O, w) : r(v, d, A, g, b, O, w);
    if (!(g & c)) {
      var j = S && h.call(v, "__wrapped__"), $ = T && h.call(d, "__wrapped__");
      if (j || $) {
        var I = j ? v.value() : v, M = $ ? d.value() : d;
        return w || (w = new e()), O(I, M, g, b, w);
      }
    }
    return E ? (w || (w = new e()), n(v, d, g, b, O, w)) : !1;
  }
  return ms = y, ms;
}
var gs, gy;
function sh() {
  if (gy) return gs;
  gy = 1;
  var e = N1(), t = qt();
  function r(n, i, a, o, u) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, o, r, u);
  }
  return gs = r, gs;
}
var bs, by;
function L1() {
  if (by) return bs;
  by = 1;
  var e = Dx(), t = sh(), r = 1, n = 2;
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
      var h = p[0], y = a[h], v = p[1];
      if (l && p[2]) {
        if (y === void 0 && !(h in a))
          return !1;
      } else {
        var d = new e();
        if (c)
          var g = c(y, v, h, a, o, d);
        if (!(g === void 0 ? t(v, y, r | n, c, d) : g))
          return !1;
      }
    }
    return !0;
  }
  return bs = i, bs;
}
var xs, xy;
function Gx() {
  if (xy) return xs;
  xy = 1;
  var e = Jt();
  function t(r) {
    return r === r && !e(r);
  }
  return xs = t, xs;
}
var Os, Oy;
function q1() {
  if (Oy) return Os;
  Oy = 1;
  var e = Gx(), t = Fo();
  function r(n) {
    for (var i = t(n), a = i.length; a--; ) {
      var o = i[a], u = n[o];
      i[a] = [o, u, e(u)];
    }
    return i;
  }
  return Os = r, Os;
}
var ws, wy;
function Vx() {
  if (wy) return ws;
  wy = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return ws = e, ws;
}
var As, Ay;
function B1() {
  if (Ay) return As;
  Ay = 1;
  var e = L1(), t = q1(), r = Vx();
  function n(i) {
    var a = t(i);
    return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : function(o) {
      return o === i || e(o, i, a);
    };
  }
  return As = n, As;
}
var _s, _y;
function F1() {
  if (_y) return _s;
  _y = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return _s = e, _s;
}
var Ps, Py;
function z1() {
  if (Py) return Ps;
  Py = 1;
  var e = px(), t = oh(), r = Ke(), n = uh(), i = ch(), a = Ro();
  function o(u, c, s) {
    c = e(c, u);
    for (var f = -1, l = c.length, p = !1; ++f < l; ) {
      var h = a(c[f]);
      if (!(p = u != null && s(u, h)))
        break;
      u = u[h];
    }
    return p || ++f != l ? p : (l = u == null ? 0 : u.length, !!l && i(l) && n(h, l) && (r(u) || t(u)));
  }
  return Ps = o, Ps;
}
var Ss, Sy;
function W1() {
  if (Sy) return Ss;
  Sy = 1;
  var e = F1(), t = z1();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return Ss = r, Ss;
}
var js, jy;
function K1() {
  if (jy) return js;
  jy = 1;
  var e = sh(), t = hx(), r = W1(), n = Hp(), i = Gx(), a = Vx(), o = Ro(), u = 1, c = 2;
  function s(f, l) {
    return n(f) && i(l) ? a(o(f), l) : function(p) {
      var h = t(p, f);
      return h === void 0 && h === l ? r(p, f) : e(l, h, u | c);
    };
  }
  return js = s, js;
}
var Es, Ey;
function In() {
  if (Ey) return Es;
  Ey = 1;
  function e(t) {
    return t;
  }
  return Es = e, Es;
}
var Ts, Ty;
function U1() {
  if (Ty) return Ts;
  Ty = 1;
  function e(t) {
    return function(r) {
      return r == null ? void 0 : r[t];
    };
  }
  return Ts = e, Ts;
}
var $s, $y;
function H1() {
  if ($y) return $s;
  $y = 1;
  var e = Jp();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return $s = t, $s;
}
var Ms, My;
function G1() {
  if (My) return Ms;
  My = 1;
  var e = U1(), t = H1(), r = Hp(), n = Ro();
  function i(a) {
    return r(a) ? e(n(a)) : t(a);
  }
  return Ms = i, Ms;
}
var Is, Iy;
function Pt() {
  if (Iy) return Is;
  Iy = 1;
  var e = B1(), t = K1(), r = In(), n = Ke(), i = G1();
  function a(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? t(o[0], o[1]) : e(o) : i(o);
  }
  return Is = a, Is;
}
var Cs, Cy;
function Xx() {
  if (Cy) return Cs;
  Cy = 1;
  function e(t, r, n, i) {
    for (var a = t.length, o = n + (i ? 1 : -1); i ? o-- : ++o < a; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return Cs = e, Cs;
}
var ks, ky;
function V1() {
  if (ky) return ks;
  ky = 1;
  function e(t) {
    return t !== t;
  }
  return ks = e, ks;
}
var Rs, Ry;
function X1() {
  if (Ry) return Rs;
  Ry = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return Rs = e, Rs;
}
var Ds, Dy;
function Y1() {
  if (Dy) return Ds;
  Dy = 1;
  var e = Xx(), t = V1(), r = X1();
  function n(i, a, o) {
    return a === a ? r(i, a, o) : e(i, t, o);
  }
  return Ds = n, Ds;
}
var Ns, Ny;
function Z1() {
  if (Ny) return Ns;
  Ny = 1;
  var e = Y1();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return Ns = t, Ns;
}
var Ls, Ly;
function J1() {
  if (Ly) return Ls;
  Ly = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return Ls = e, Ls;
}
var qs, qy;
function Q1() {
  if (qy) return qs;
  qy = 1;
  function e() {
  }
  return qs = e, qs;
}
var Bs, By;
function eS() {
  if (By) return Bs;
  By = 1;
  var e = Hx(), t = Q1(), r = ah(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return Bs = i, Bs;
}
var Fs, Fy;
function tS() {
  if (Fy) return Fs;
  Fy = 1;
  var e = Nx(), t = Z1(), r = J1(), n = qx(), i = eS(), a = ah(), o = 200;
  function u(c, s, f) {
    var l = -1, p = t, h = c.length, y = !0, v = [], d = v;
    if (f)
      y = !1, p = r;
    else if (h >= o) {
      var g = s ? null : i(c);
      if (g)
        return a(g);
      y = !1, p = n, d = new e();
    } else
      d = s ? [] : v;
    e:
      for (; ++l < h; ) {
        var b = c[l], O = s ? s(b) : b;
        if (b = f || b !== 0 ? b : 0, y && O === O) {
          for (var w = d.length; w--; )
            if (d[w] === O)
              continue e;
          s && d.push(O), v.push(b);
        } else p(d, O, f) || (d !== v && d.push(O), v.push(b));
      }
    return v;
  }
  return Fs = u, Fs;
}
var zs, zy;
function rS() {
  if (zy) return zs;
  zy = 1;
  var e = Pt(), t = tS();
  function r(n, i) {
    return n && n.length ? t(n, e(i, 2)) : [];
  }
  return zs = r, zs;
}
var nS = rS();
const Wy = /* @__PURE__ */ ce(nS);
function Yx(e, t, r) {
  return t === !0 ? Wy(e, r) : G(t) ? Wy(e, t) : e;
}
function Qr(e) {
  "@babel/helpers - typeof";
  return Qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qr(e);
}
var iS = ["ref"];
function Ky(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function St(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ky(Object(r), !0).forEach(function(n) {
      zo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ky(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aS(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Uy(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Jx(n.key), n);
  }
}
function oS(e, t, r) {
  return t && Uy(e.prototype, t), r && Uy(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function uS(e, t, r) {
  return t = Ma(t), cS(e, Zx() ? Reflect.construct(t, r || [], Ma(e).constructor) : t.apply(e, r));
}
function cS(e, t) {
  if (t && (Qr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return sS(e);
}
function sS(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Zx() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Zx = function() {
    return !!e;
  })();
}
function Ma(e) {
  return Ma = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ma(e);
}
function lS(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Mf(e, t);
}
function Mf(e, t) {
  return Mf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Mf(e, t);
}
function zo(e, t, r) {
  return t = Jx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jx(e) {
  var t = fS(e, "string");
  return Qr(t) == "symbol" ? t : t + "";
}
function fS(e, t) {
  if (Qr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Qr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function pS(e, t) {
  if (e == null) return {};
  var r = hS(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function hS(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function dS(e) {
  return e.value;
}
function vS(e, t) {
  if (/* @__PURE__ */ _.isValidElement(e))
    return /* @__PURE__ */ _.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ _.createElement(e, t);
  t.ref;
  var r = pS(t, iS);
  return /* @__PURE__ */ _.createElement(ih, r);
}
var Hy = 1, xr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    aS(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = uS(this, t, [].concat(i)), zo(r, "lastBoundingBox", {
      width: -1,
      height: -1
    }), r;
  }
  return lS(t, e), oS(t, [{
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
      i ? (Math.abs(i.width - this.lastBoundingBox.width) > Hy || Math.abs(i.height - this.lastBoundingBox.height) > Hy) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, n && n(i)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? St({}, this.lastBoundingBox) : {
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
          var h = this.getBBoxSnapshot();
          l = {
            left: ((s || 0) - h.width) / 2
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
      return St(St({}, l), p);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.content, o = i.width, u = i.height, c = i.wrapperStyle, s = i.payloadUniqBy, f = i.payload, l = St(St({
        position: "absolute",
        width: o || "auto",
        height: u || "auto"
      }, this.getDefaultPosition(c)), c);
      return /* @__PURE__ */ _.createElement("div", {
        className: "recharts-legend-wrapper",
        style: l,
        ref: function(h) {
          n.wrapperNode = h;
        }
      }, vS(a, St(St({}, this.props), {}, {
        payload: Yx(f, s, dS)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(n, i) {
      var a = St(St({}, this.defaultProps), n.props), o = a.layout;
      return o === "vertical" && q(n.props.height) ? {
        height: n.props.height
      } : o === "horizontal" ? {
        width: n.props.width || i
      } : null;
    }
  }]);
})(R.PureComponent);
zo(xr, "displayName", "Legend");
zo(xr, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var Ws, Gy;
function yS() {
  if (Gy) return Ws;
  Gy = 1;
  var e = Gi(), t = oh(), r = Ke(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return Ws = i, Ws;
}
var Ks, Vy;
function Qx() {
  if (Vy) return Ks;
  Vy = 1;
  var e = Fx(), t = yS();
  function r(n, i, a, o, u) {
    var c = -1, s = n.length;
    for (a || (a = t), u || (u = []); ++c < s; ) {
      var f = n[c];
      i > 0 && a(f) ? i > 1 ? r(f, i - 1, a, o, u) : e(u, f) : o || (u[u.length] = f);
    }
    return u;
  }
  return Ks = r, Ks;
}
var Us, Xy;
function mS() {
  if (Xy) return Us;
  Xy = 1;
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
  return Us = e, Us;
}
var Hs, Yy;
function gS() {
  if (Yy) return Hs;
  Yy = 1;
  var e = mS(), t = e();
  return Hs = t, Hs;
}
var Gs, Zy;
function eO() {
  if (Zy) return Gs;
  Zy = 1;
  var e = gS(), t = Fo();
  function r(n, i) {
    return n && e(n, i, t);
  }
  return Gs = r, Gs;
}
var Vs, Jy;
function bS() {
  if (Jy) return Vs;
  Jy = 1;
  var e = Vi();
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
  return Vs = t, Vs;
}
var Xs, Qy;
function lh() {
  if (Qy) return Xs;
  Qy = 1;
  var e = eO(), t = bS(), r = t(e);
  return Xs = r, Xs;
}
var Ys, em;
function tO() {
  if (em) return Ys;
  em = 1;
  var e = lh(), t = Vi();
  function r(n, i) {
    var a = -1, o = t(n) ? Array(n.length) : [];
    return e(n, function(u, c, s) {
      o[++a] = i(u, c, s);
    }), o;
  }
  return Ys = r, Ys;
}
var Zs, tm;
function xS() {
  if (tm) return Zs;
  tm = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return Zs = e, Zs;
}
var Js, rm;
function OS() {
  if (rm) return Js;
  rm = 1;
  var e = Tn();
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
  return Js = t, Js;
}
var Qs, nm;
function wS() {
  if (nm) return Qs;
  nm = 1;
  var e = OS();
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
  return Qs = t, Qs;
}
var el, im;
function AS() {
  if (im) return el;
  im = 1;
  var e = Zp(), t = Jp(), r = Pt(), n = tO(), i = xS(), a = Wx(), o = wS(), u = In(), c = Ke();
  function s(f, l, p) {
    l.length ? l = e(l, function(v) {
      return c(v) ? function(d) {
        return t(d, v.length === 1 ? v[0] : v);
      } : v;
    }) : l = [u];
    var h = -1;
    l = e(l, a(r));
    var y = n(f, function(v, d, g) {
      var b = e(l, function(O) {
        return O(v);
      });
      return { criteria: b, index: ++h, value: v };
    });
    return i(y, function(v, d) {
      return o(v, d, p);
    });
  }
  return el = s, el;
}
var tl, am;
function _S() {
  if (am) return tl;
  am = 1;
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
  return tl = e, tl;
}
var rl, om;
function PS() {
  if (om) return rl;
  om = 1;
  var e = _S(), t = Math.max;
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
  return rl = r, rl;
}
var nl, um;
function SS() {
  if (um) return nl;
  um = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return nl = e, nl;
}
var il, cm;
function rO() {
  if (cm) return il;
  cm = 1;
  var e = Tr(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return il = t, il;
}
var al, sm;
function jS() {
  if (sm) return al;
  sm = 1;
  var e = SS(), t = rO(), r = In(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return al = n, al;
}
var ol, lm;
function ES() {
  if (lm) return ol;
  lm = 1;
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
  return ol = n, ol;
}
var ul, fm;
function TS() {
  if (fm) return ul;
  fm = 1;
  var e = jS(), t = ES(), r = t(e);
  return ul = r, ul;
}
var cl, pm;
function $S() {
  if (pm) return cl;
  pm = 1;
  var e = In(), t = PS(), r = TS();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return cl = n, cl;
}
var sl, hm;
function Wo() {
  if (hm) return sl;
  hm = 1;
  var e = Vp(), t = Vi(), r = uh(), n = Jt();
  function i(a, o, u) {
    if (!n(u))
      return !1;
    var c = typeof o;
    return (c == "number" ? t(u) && r(o, u.length) : c == "string" && o in u) ? e(u[o], a) : !1;
  }
  return sl = i, sl;
}
var ll, dm;
function MS() {
  if (dm) return ll;
  dm = 1;
  var e = Qx(), t = AS(), r = $S(), n = Wo(), i = r(function(a, o) {
    if (a == null)
      return [];
    var u = o.length;
    return u > 1 && n(a, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), t(a, e(o, 1), []);
  });
  return ll = i, ll;
}
var IS = MS();
const fh = /* @__PURE__ */ ce(IS);
function li(e) {
  "@babel/helpers - typeof";
  return li = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, li(e);
}
function If() {
  return If = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, If.apply(this, arguments);
}
function CS(e, t) {
  return NS(e) || DS(e, t) || RS(e, t) || kS();
}
function kS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function RS(e, t) {
  if (e) {
    if (typeof e == "string") return vm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return vm(e, t);
  }
}
function vm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function DS(e, t) {
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
function NS(e) {
  if (Array.isArray(e)) return e;
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
function fl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ym(Object(r), !0).forEach(function(n) {
      LS(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ym(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function LS(e, t, r) {
  return t = qS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qS(e) {
  var t = BS(e, "string");
  return li(t) == "symbol" ? t : t + "";
}
function BS(e, t) {
  if (li(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (li(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function FS(e) {
  return Array.isArray(e) && Se(e[0]) && Se(e[1]) ? e.join(" ~ ") : e;
}
var zS = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, i = t.contentStyle, a = i === void 0 ? {} : i, o = t.itemStyle, u = o === void 0 ? {} : o, c = t.labelStyle, s = c === void 0 ? {} : c, f = t.payload, l = t.formatter, p = t.itemSorter, h = t.wrapperClassName, y = t.labelClassName, v = t.label, d = t.labelFormatter, g = t.accessibilityLayer, b = g === void 0 ? !1 : g, O = function() {
    if (f && f.length) {
      var j = {
        padding: 0,
        margin: 0
      }, $ = (p ? fh(f, p) : f).map(function(I, M) {
        if (I.type === "none")
          return null;
        var k = fl({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: I.color || "#000"
        }, u), N = I.formatter || l || FS, B = I.value, F = I.name, U = B, Z = F;
        if (N && U != null && Z != null) {
          var K = N(B, F, I, M, f);
          if (Array.isArray(K)) {
            var Q = CS(K, 2);
            U = Q[0], Z = Q[1];
          } else
            U = K;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ _.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(M),
            style: k
          }, Se(Z) ? /* @__PURE__ */ _.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, Z) : null, Se(Z) ? /* @__PURE__ */ _.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ _.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, U), /* @__PURE__ */ _.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, I.unit || ""))
        );
      });
      return /* @__PURE__ */ _.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: j
      }, $);
    }
    return null;
  }, w = fl({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, a), m = fl({
    margin: 0
  }, s), x = !V(v), A = x ? v : "", P = Y("recharts-default-tooltip", h), S = Y("recharts-tooltip-label", y);
  x && d && f !== void 0 && f !== null && (A = d(v, f));
  var T = b ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ _.createElement("div", If({
    className: P,
    style: w
  }, T), /* @__PURE__ */ _.createElement("p", {
    className: S,
    style: m
  }, /* @__PURE__ */ _.isValidElement(A) ? A : "".concat(A)), O());
};
function fi(e) {
  "@babel/helpers - typeof";
  return fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fi(e);
}
function la(e, t, r) {
  return t = WS(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WS(e) {
  var t = KS(e, "string");
  return fi(t) == "symbol" ? t : t + "";
}
function KS(e, t) {
  if (fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Fn = "recharts-tooltip-wrapper", US = {
  visibility: "hidden"
};
function HS(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return Y(Fn, la(la(la(la({}, "".concat(Fn, "-right"), q(r) && t && q(t.x) && r >= t.x), "".concat(Fn, "-left"), q(r) && t && q(t.x) && r < t.x), "".concat(Fn, "-bottom"), q(n) && t && q(t.y) && n >= t.y), "".concat(Fn, "-top"), q(n) && t && q(t.y) && n < t.y));
}
function mm(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, i = e.offsetTopLeft, a = e.position, o = e.reverseDirection, u = e.tooltipDimension, c = e.viewBox, s = e.viewBoxDimension;
  if (a && q(a[n]))
    return a[n];
  var f = r[n] - u - i, l = r[n] + i;
  if (t[n])
    return o[n] ? f : l;
  if (o[n]) {
    var p = f, h = c[n];
    return p < h ? Math.max(l, c[n]) : Math.max(f, c[n]);
  }
  var y = l + u, v = c[n] + s;
  return y > v ? Math.max(f, c[n]) : Math.max(l, c[n]);
}
function GS(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function VS(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, i = e.position, a = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, c = e.viewBox, s, f, l;
  return o.height > 0 && o.width > 0 && r ? (f = mm({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), l = mm({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: i,
    reverseDirection: a,
    tooltipDimension: o.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), s = GS({
    translateX: f,
    translateY: l,
    useTranslate3d: u
  })) : s = US, {
    cssProperties: s,
    cssClasses: HS({
      translateX: f,
      translateY: l,
      coordinate: r
    })
  };
}
function en(e) {
  "@babel/helpers - typeof";
  return en = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, en(e);
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
function bm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gm(Object(r), !0).forEach(function(n) {
      kf(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XS(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function YS(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, iO(n.key), n);
  }
}
function ZS(e, t, r) {
  return t && YS(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function JS(e, t, r) {
  return t = Ia(t), QS(e, nO() ? Reflect.construct(t, r || [], Ia(e).constructor) : t.apply(e, r));
}
function QS(e, t) {
  if (t && (en(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return ej(e);
}
function ej(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function nO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (nO = function() {
    return !!e;
  })();
}
function Ia(e) {
  return Ia = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ia(e);
}
function tj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cf(e, t);
}
function Cf(e, t) {
  return Cf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Cf(e, t);
}
function kf(e, t, r) {
  return t = iO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iO(e) {
  var t = rj(e, "string");
  return en(t) == "symbol" ? t : t + "";
}
function rj(e, t) {
  if (en(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (en(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var xm = 1, nj = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    XS(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = JS(this, t, [].concat(i)), kf(r, "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      },
      lastBoundingBox: {
        width: -1,
        height: -1
      }
    }), kf(r, "handleKeyDown", function(o) {
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
  return tj(t, e), ZS(t, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var n = this.wrapperNode.getBoundingClientRect();
        (Math.abs(n.width - this.state.lastBoundingBox.width) > xm || Math.abs(n.height - this.state.lastBoundingBox.height) > xm) && this.setState({
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
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.children, f = i.coordinate, l = i.hasPayload, p = i.isAnimationActive, h = i.offset, y = i.position, v = i.reverseDirection, d = i.useTranslate3d, g = i.viewBox, b = i.wrapperStyle, O = VS({
        allowEscapeViewBox: o,
        coordinate: f,
        offsetTopLeft: h,
        position: y,
        reverseDirection: v,
        tooltipBox: this.state.lastBoundingBox,
        useTranslate3d: d,
        viewBox: g
      }), w = O.cssClasses, m = O.cssProperties, x = bm(bm({
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
        /* @__PURE__ */ _.createElement("div", {
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
})(R.PureComponent), ij = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, vt = {
  isSsr: ij()
};
function tn(e) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tn(e);
}
function Om(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wm(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Om(Object(r), !0).forEach(function(n) {
      ph(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Om(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function oj(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, oO(n.key), n);
  }
}
function uj(e, t, r) {
  return t && oj(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cj(e, t, r) {
  return t = Ca(t), sj(e, aO() ? Reflect.construct(t, r || [], Ca(e).constructor) : t.apply(e, r));
}
function sj(e, t) {
  if (t && (tn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lj(e);
}
function lj(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function aO() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (aO = function() {
    return !!e;
  })();
}
function Ca(e) {
  return Ca = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ca(e);
}
function fj(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rf(e, t);
}
function Rf(e, t) {
  return Rf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Rf(e, t);
}
function ph(e, t, r) {
  return t = oO(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oO(e) {
  var t = pj(e, "string");
  return tn(t) == "symbol" ? t : t + "";
}
function pj(e, t) {
  if (tn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (tn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function hj(e) {
  return e.dataKey;
}
function dj(e, t) {
  return /* @__PURE__ */ _.isValidElement(e) ? /* @__PURE__ */ _.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ _.createElement(e, t) : /* @__PURE__ */ _.createElement(zS, t);
}
var yt = /* @__PURE__ */ (function(e) {
  function t() {
    return aj(this, t), cj(this, t, arguments);
  }
  return fj(t, e), uj(t, [{
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.active, o = i.allowEscapeViewBox, u = i.animationDuration, c = i.animationEasing, s = i.content, f = i.coordinate, l = i.filterNull, p = i.isAnimationActive, h = i.offset, y = i.payload, v = i.payloadUniqBy, d = i.position, g = i.reverseDirection, b = i.useTranslate3d, O = i.viewBox, w = i.wrapperStyle, m = y ?? [];
      l && m.length && (m = Yx(y.filter(function(A) {
        return A.value != null && (A.hide !== !0 || n.props.includeHidden);
      }), v, hj));
      var x = m.length > 0;
      return /* @__PURE__ */ _.createElement(nj, {
        allowEscapeViewBox: o,
        animationDuration: u,
        animationEasing: c,
        isAnimationActive: p,
        active: a,
        coordinate: f,
        hasPayload: x,
        offset: h,
        position: d,
        reverseDirection: g,
        useTranslate3d: b,
        viewBox: O,
        wrapperStyle: w
      }, dj(s, wm(wm({}, this.props), {}, {
        payload: m
      })));
    }
  }]);
})(R.PureComponent);
ph(yt, "displayName", "Tooltip");
ph(yt, "defaultProps", {
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
  isAnimationActive: !vt.isSsr,
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
var pl, Am;
function vj() {
  if (Am) return pl;
  Am = 1;
  var e = _t(), t = function() {
    return e.Date.now();
  };
  return pl = t, pl;
}
var hl, _m;
function yj() {
  if (_m) return hl;
  _m = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return hl = t, hl;
}
var dl, Pm;
function mj() {
  if (Pm) return dl;
  Pm = 1;
  var e = yj(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return dl = r, dl;
}
var vl, Sm;
function uO() {
  if (Sm) return vl;
  Sm = 1;
  var e = mj(), t = Jt(), r = Tn(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
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
  return vl = c, vl;
}
var yl, jm;
function gj() {
  if (jm) return yl;
  jm = 1;
  var e = Jt(), t = vj(), r = uO(), n = "Expected a function", i = Math.max, a = Math.min;
  function o(u, c, s) {
    var f, l, p, h, y, v, d = 0, g = !1, b = !1, O = !0;
    if (typeof u != "function")
      throw new TypeError(n);
    c = r(c) || 0, e(s) && (g = !!s.leading, b = "maxWait" in s, p = b ? i(r(s.maxWait) || 0, c) : p, O = "trailing" in s ? !!s.trailing : O);
    function w($) {
      var I = f, M = l;
      return f = l = void 0, d = $, h = u.apply(M, I), h;
    }
    function m($) {
      return d = $, y = setTimeout(P, c), g ? w($) : h;
    }
    function x($) {
      var I = $ - v, M = $ - d, k = c - I;
      return b ? a(k, p - M) : k;
    }
    function A($) {
      var I = $ - v, M = $ - d;
      return v === void 0 || I >= c || I < 0 || b && M >= p;
    }
    function P() {
      var $ = t();
      if (A($))
        return S($);
      y = setTimeout(P, x($));
    }
    function S($) {
      return y = void 0, O && f ? w($) : (f = l = void 0, h);
    }
    function T() {
      y !== void 0 && clearTimeout(y), d = 0, f = v = l = y = void 0;
    }
    function E() {
      return y === void 0 ? h : S(t());
    }
    function j() {
      var $ = t(), I = A($);
      if (f = arguments, l = this, v = $, I) {
        if (y === void 0)
          return m(v);
        if (b)
          return clearTimeout(y), y = setTimeout(P, c), w(v);
      }
      return y === void 0 && (y = setTimeout(P, c)), h;
    }
    return j.cancel = T, j.flush = E, j;
  }
  return yl = o, yl;
}
var ml, Em;
function bj() {
  if (Em) return ml;
  Em = 1;
  var e = gj(), t = Jt(), r = "Expected a function";
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
  return ml = n, ml;
}
var xj = bj();
const cO = /* @__PURE__ */ ce(xj);
function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pi(e);
}
function Tm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tm(Object(r), !0).forEach(function(n) {
      Oj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Oj(e, t, r) {
  return t = wj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wj(e) {
  var t = Aj(e, "string");
  return pi(t) == "symbol" ? t : t + "";
}
function Aj(e, t) {
  if (pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _j(e, t) {
  return Ej(e) || jj(e, t) || Sj(e, t) || Pj();
}
function Pj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Sj(e, t) {
  if (e) {
    if (typeof e == "string") return $m(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $m(e, t);
  }
}
function $m(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function jj(e, t) {
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
function Ej(e) {
  if (Array.isArray(e)) return e;
}
var Tj = /* @__PURE__ */ R.forwardRef(function(e, t) {
  var r = e.aspect, n = e.initialDimension, i = n === void 0 ? {
    width: -1,
    height: -1
  } : n, a = e.width, o = a === void 0 ? "100%" : a, u = e.height, c = u === void 0 ? "100%" : u, s = e.minWidth, f = s === void 0 ? 0 : s, l = e.minHeight, p = e.maxHeight, h = e.children, y = e.debounce, v = y === void 0 ? 0 : y, d = e.id, g = e.className, b = e.onResize, O = e.style, w = O === void 0 ? {} : O, m = R.useRef(null), x = R.useRef();
  x.current = b, R.useImperativeHandle(t, function() {
    return Object.defineProperty(m.current, "current", {
      get: function() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), m.current;
      },
      configurable: !0
    });
  });
  var A = R.useState({
    containerWidth: i.width,
    containerHeight: i.height
  }), P = _j(A, 2), S = P[0], T = P[1], E = R.useCallback(function($, I) {
    T(function(M) {
      var k = Math.round($), N = Math.round(I);
      return M.containerWidth === k && M.containerHeight === N ? M : {
        containerWidth: k,
        containerHeight: N
      };
    });
  }, []);
  R.useEffect(function() {
    var $ = function(F) {
      var U, Z = F[0].contentRect, K = Z.width, Q = Z.height;
      E(K, Q), (U = x.current) === null || U === void 0 || U.call(x, K, Q);
    };
    v > 0 && ($ = cO($, v, {
      trailing: !0,
      leading: !1
    }));
    var I = new ResizeObserver($), M = m.current.getBoundingClientRect(), k = M.width, N = M.height;
    return E(k, N), I.observe(m.current), function() {
      I.disconnect();
    };
  }, [E, v]);
  var j = R.useMemo(function() {
    var $ = S.containerWidth, I = S.containerHeight;
    if ($ < 0 || I < 0)
      return null;
    ft(vr(o) || vr(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), ft(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var M = vr(o) ? $ : o, k = vr(c) ? I : c;
    r && r > 0 && (M ? k = M / r : k && (M = k * r), p && k > p && (k = p)), ft(M > 0 || k > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, M, k, o, c, f, l, r);
    var N = !Array.isArray(h) && It(h.type).endsWith("Chart");
    return _.Children.map(h, function(B) {
      return /* @__PURE__ */ _.isValidElement(B) ? /* @__PURE__ */ R.cloneElement(B, fa({
        width: M,
        height: k
      }, N ? {
        style: fa({
          height: "100%",
          width: "100%",
          maxHeight: k,
          maxWidth: M
        }, B.props.style)
      } : {})) : B;
    });
  }, [r, h, c, p, l, f, S, o]);
  return /* @__PURE__ */ _.createElement("div", {
    id: d ? "".concat(d) : void 0,
    className: Y("recharts-responsive-container", g),
    style: fa(fa({}, w), {}, {
      width: o,
      height: c,
      minWidth: f,
      minHeight: l,
      maxHeight: p
    }),
    ref: m
  }, j);
}), Xi = function(t) {
  return null;
};
Xi.displayName = "Cell";
function hi(e) {
  "@babel/helpers - typeof";
  return hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hi(e);
}
function Mm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Df(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mm(Object(r), !0).forEach(function(n) {
      $j(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mm(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $j(e, t, r) {
  return t = Mj(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Mj(e) {
  var t = Ij(e, "string");
  return hi(t) == "symbol" ? t : t + "";
}
function Ij(e, t) {
  if (hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var qr = {
  widthCache: {},
  cacheCount: 0
}, Cj = 2e3, kj = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Im = "recharts_measurement_span";
function Rj(e) {
  var t = Df({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var Qn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || vt.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = Rj(r), i = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (qr.widthCache[i])
    return qr.widthCache[i];
  try {
    var a = document.getElementById(Im);
    a || (a = document.createElement("span"), a.setAttribute("id", Im), a.setAttribute("aria-hidden", "true"), document.body.appendChild(a));
    var o = Df(Df({}, kj), n);
    Object.assign(a.style, o), a.textContent = "".concat(t);
    var u = a.getBoundingClientRect(), c = {
      width: u.width,
      height: u.height
    };
    return qr.widthCache[i] = c, ++qr.cacheCount > Cj && (qr.cacheCount = 0, qr.widthCache = {}), c;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, Dj = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function di(e) {
  "@babel/helpers - typeof";
  return di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, di(e);
}
function ka(e, t) {
  return Bj(e) || qj(e, t) || Lj(e, t) || Nj();
}
function Nj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Lj(e, t) {
  if (e) {
    if (typeof e == "string") return Cm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Cm(e, t);
  }
}
function Cm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function qj(e, t) {
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
function Bj(e) {
  if (Array.isArray(e)) return e;
}
function Fj(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function km(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Wj(n.key), n);
  }
}
function zj(e, t, r) {
  return t && km(e.prototype, t), r && km(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Wj(e) {
  var t = Kj(e, "string");
  return di(t) == "symbol" ? t : t + "";
}
function Kj(e, t) {
  if (di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Rm = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Dm = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Uj = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, Hj = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, sO = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, Gj = Object.keys(sO), Wr = "NaN";
function Vj(e, t) {
  return e * sO[t];
}
var pa = /* @__PURE__ */ (function() {
  function e(t, r) {
    Fj(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !Uj.test(r) && (this.num = NaN, this.unit = ""), Gj.includes(r) && (this.num = Vj(t, r), this.unit = "px");
  }
  return zj(e, [{
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
      var n, i = (n = Hj.exec(r)) !== null && n !== void 0 ? n : [], a = ka(i, 3), o = a[1], u = a[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]);
})();
function lO(e) {
  if (e.includes(Wr))
    return Wr;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = Rm.exec(t)) !== null && r !== void 0 ? r : [], i = ka(n, 4), a = i[1], o = i[2], u = i[3], c = pa.parse(a ?? ""), s = pa.parse(u ?? ""), f = o === "*" ? c.multiply(s) : c.divide(s);
    if (f.isNaN())
      return Wr;
    t = t.replace(Rm, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var l, p = (l = Dm.exec(t)) !== null && l !== void 0 ? l : [], h = ka(p, 4), y = h[1], v = h[2], d = h[3], g = pa.parse(y ?? ""), b = pa.parse(d ?? ""), O = v === "+" ? g.add(b) : g.subtract(b);
    if (O.isNaN())
      return Wr;
    t = t.replace(Dm, O.toString());
  }
  return t;
}
var Nm = /\(([^()]*)\)/;
function Xj(e) {
  for (var t = e; t.includes("("); ) {
    var r = Nm.exec(t), n = ka(r, 2), i = n[1];
    t = t.replace(Nm, lO(i));
  }
  return t;
}
function Yj(e) {
  var t = e.replace(/\s+/g, "");
  return t = Xj(t), t = lO(t), t;
}
function Zj(e) {
  try {
    return Yj(e);
  } catch {
    return Wr;
  }
}
function gl(e) {
  var t = Zj(e.slice(5, -1));
  return t === Wr ? "" : t;
}
var Jj = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], Qj = ["dx", "dy", "angle", "className", "breakAll"];
function Nf() {
  return Nf = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nf.apply(this, arguments);
}
function Lm(e, t) {
  if (e == null) return {};
  var r = eE(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function eE(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function qm(e, t) {
  return iE(e) || nE(e, t) || rE(e, t) || tE();
}
function tE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rE(e, t) {
  if (e) {
    if (typeof e == "string") return Bm(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Bm(e, t);
  }
}
function Bm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function nE(e, t) {
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
function iE(e) {
  if (Array.isArray(e)) return e;
}
var fO = /[ \f\n\r\t\v\u2028\u2029]+/, pO = function(t) {
  var r = t.children, n = t.breakAll, i = t.style;
  try {
    var a = [];
    V(r) || (n ? a = r.toString().split("") : a = r.toString().split(fO));
    var o = a.map(function(c) {
      return {
        word: c,
        width: Qn(c, i).width
      };
    }), u = n ? 0 : Qn(" ", i).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, aE = function(t, r, n, i, a) {
  var o = t.maxLines, u = t.children, c = t.style, s = t.breakAll, f = q(o), l = u, p = function() {
    var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return M.reduce(function(k, N) {
      var B = N.word, F = N.width, U = k[k.length - 1];
      if (U && (i == null || a || U.width + F + n < Number(i)))
        U.words.push(B), U.width += F + n;
      else {
        var Z = {
          words: [B],
          width: F
        };
        k.push(Z);
      }
      return k;
    }, []);
  }, h = p(r), y = function(M) {
    return M.reduce(function(k, N) {
      return k.width > N.width ? k : N;
    });
  };
  if (!f)
    return h;
  for (var v = "…", d = function(M) {
    var k = l.slice(0, M), N = pO({
      breakAll: s,
      style: c,
      children: k + v
    }).wordsWithComputedWidth, B = p(N), F = B.length > o || y(B).width > Number(i);
    return [F, B];
  }, g = 0, b = l.length - 1, O = 0, w; g <= b && O <= l.length - 1; ) {
    var m = Math.floor((g + b) / 2), x = m - 1, A = d(x), P = qm(A, 2), S = P[0], T = P[1], E = d(m), j = qm(E, 1), $ = j[0];
    if (!S && !$ && (g = m + 1), S && $ && (b = m - 1), !S && $) {
      w = T;
      break;
    }
    O++;
  }
  return w || h;
}, Fm = function(t) {
  var r = V(t) ? [] : t.toString().split(fO);
  return [{
    words: r
  }];
}, oE = function(t) {
  var r = t.width, n = t.scaleToFit, i = t.children, a = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !vt.isSsr) {
    var c, s, f = pO({
      breakAll: o,
      children: i,
      style: a
    });
    if (f) {
      var l = f.wordsWithComputedWidth, p = f.spaceWidth;
      c = l, s = p;
    } else
      return Fm(i);
    return aE({
      breakAll: o,
      children: i,
      maxLines: u,
      style: a
    }, c, s, r, n);
  }
  return Fm(i);
}, zm = "#808080", Pr = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.lineHeight, u = o === void 0 ? "1em" : o, c = t.capHeight, s = c === void 0 ? "0.71em" : c, f = t.scaleToFit, l = f === void 0 ? !1 : f, p = t.textAnchor, h = p === void 0 ? "start" : p, y = t.verticalAnchor, v = y === void 0 ? "end" : y, d = t.fill, g = d === void 0 ? zm : d, b = Lm(t, Jj), O = R.useMemo(function() {
    return oE({
      breakAll: b.breakAll,
      children: b.children,
      maxLines: b.maxLines,
      scaleToFit: l,
      style: b.style,
      width: b.width
    });
  }, [b.breakAll, b.children, b.maxLines, l, b.style, b.width]), w = b.dx, m = b.dy, x = b.angle, A = b.className, P = b.breakAll, S = Lm(b, Qj);
  if (!Se(n) || !Se(a))
    return null;
  var T = n + (q(w) ? w : 0), E = a + (q(m) ? m : 0), j;
  switch (v) {
    case "start":
      j = gl("calc(".concat(s, ")"));
      break;
    case "middle":
      j = gl("calc(".concat((O.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
      break;
    default:
      j = gl("calc(".concat(O.length - 1, " * -").concat(u, ")"));
      break;
  }
  var $ = [];
  if (l) {
    var I = O[0].width, M = b.width;
    $.push("scale(".concat((q(M) ? M / I : 1) / I, ")"));
  }
  return x && $.push("rotate(".concat(x, ", ").concat(T, ", ").concat(E, ")")), $.length && (S.transform = $.join(" ")), /* @__PURE__ */ _.createElement("text", Nf({}, W(S, !0), {
    x: T,
    y: E,
    className: Y("recharts-text", A),
    textAnchor: h,
    fill: g.includes("url") ? zm : g
  }), O.map(function(k, N) {
    var B = k.words.join(P ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ _.createElement("tspan", {
        x: T,
        dy: N === 0 ? j : u,
        key: "".concat(B, "-").concat(N)
      }, B)
    );
  }));
};
function Xt(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function uE(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function hh(e) {
  let t, r, n;
  e.length !== 2 ? (t = Xt, r = (u, c) => Xt(e(u), c), n = (u, c) => e(u) - c) : (t = e === Xt || e === uE ? e : cE, r = e, n = e);
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
function cE() {
  return 0;
}
function hO(e) {
  return e === null ? NaN : +e;
}
function* sE(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const lE = hh(Xt), Yi = lE.right;
hh(hO).center;
class Wm extends Map {
  constructor(t, r = hE) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Km(this, t));
  }
  has(t) {
    return super.has(Km(this, t));
  }
  set(t, r) {
    return super.set(fE(this, t), r);
  }
  delete(t) {
    return super.delete(pE(this, t));
  }
}
function Km({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function fE({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function pE({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function hE(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function dE(e = Xt) {
  if (e === Xt) return dO;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function dO(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const vE = Math.sqrt(50), yE = Math.sqrt(10), mE = Math.sqrt(2);
function Ra(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= vE ? 10 : a >= yE ? 5 : a >= mE ? 2 : 1;
  let u, c, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, u = Math.round(e * s), c = Math.round(t * s), u / s < e && ++u, c / s > t && --c, s = -s) : (s = Math.pow(10, i) * o, u = Math.round(e / s), c = Math.round(t / s), u * s < e && ++u, c * s > t && --c), c < u && 0.5 <= r && r < 2 ? Ra(e, t, r * 2) : [u, c, s];
}
function Lf(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? Ra(t, e, r) : Ra(e, t, r);
  if (!(a >= i)) return [];
  const u = a - i + 1, c = new Array(u);
  if (n)
    if (o < 0) for (let s = 0; s < u; ++s) c[s] = (a - s) / -o;
    else for (let s = 0; s < u; ++s) c[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < u; ++s) c[s] = (i + s) / -o;
  else for (let s = 0; s < u; ++s) c[s] = (i + s) * o;
  return c;
}
function qf(e, t, r) {
  return t = +t, e = +e, r = +r, Ra(e, t, r)[2];
}
function Bf(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? qf(t, e, r) : qf(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Um(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Hm(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function vO(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? dO : dE(i); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1, s = t - r + 1, f = Math.log(c), l = 0.5 * Math.exp(2 * f / 3), p = 0.5 * Math.sqrt(f * l * (c - l) / c) * (s - c / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - s * l / c + p)), y = Math.min(n, Math.floor(t + (c - s) * l / c + p));
      vO(e, t, h, y, i);
    }
    const a = e[t];
    let o = r, u = n;
    for (zn(e, r, t), i(e[n], a) > 0 && zn(e, r, n); o < u; ) {
      for (zn(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
      for (; i(e[u], a) > 0; ) --u;
    }
    i(e[r], a) === 0 ? zn(e, r, u) : (++u, zn(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function zn(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function gE(e, t, r) {
  if (e = Float64Array.from(sE(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return Hm(e);
    if (t >= 1) return Um(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = Um(vO(e, a).subarray(0, a + 1)), u = Hm(e.subarray(a + 1));
    return o + (u - o) * (i - a);
  }
}
function bE(e, t, r = hO) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a);
  }
}
function xE(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function ot(e, t) {
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
function Bt(e, t) {
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
const Ff = Symbol("implicit");
function dh() {
  var e = new Wm(), t = [], r = [], n = Ff;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Ff) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Wm();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return dh(t, r).unknown(n);
  }, ot.apply(i, arguments), i;
}
function vi() {
  var e = dh().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, u = !1, c = 0, s = 0, f = 0.5;
  delete e.unknown;
  function l() {
    var p = t().length, h = i < n, y = h ? i : n, v = h ? n : i;
    a = (v - y) / Math.max(1, p - c + s * 2), u && (a = Math.floor(a)), y += (v - y - a * (p - c)) * f, o = a * (1 - c), u && (y = Math.round(y), o = Math.round(o));
    var d = xE(p).map(function(g) {
      return y + a * g;
    });
    return r(h ? d.reverse() : d);
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
    return vi(t(), [n, i]).round(u).paddingInner(c).paddingOuter(s).align(f);
  }, ot.apply(l(), arguments);
}
function yO(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return yO(t());
  }, e;
}
function ei() {
  return yO(vi.apply(null, arguments).paddingInner(1));
}
function vh(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function mO(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Zi() {
}
var yi = 0.7, Da = 1 / yi, Xr = "\\s*([+-]?\\d+)\\s*", mi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", OE = /^#([0-9a-f]{3,8})$/, wE = new RegExp(`^rgb\\(${Xr},${Xr},${Xr}\\)$`), AE = new RegExp(`^rgb\\(${bt},${bt},${bt}\\)$`), _E = new RegExp(`^rgba\\(${Xr},${Xr},${Xr},${mi}\\)$`), PE = new RegExp(`^rgba\\(${bt},${bt},${bt},${mi}\\)$`), SE = new RegExp(`^hsl\\(${mi},${bt},${bt}\\)$`), jE = new RegExp(`^hsla\\(${mi},${bt},${bt},${mi}\\)$`), Gm = {
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
vh(Zi, gi, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Vm,
  // Deprecated! Use color.formatHex.
  formatHex: Vm,
  formatHex8: EE,
  formatHsl: TE,
  formatRgb: Xm,
  toString: Xm
});
function Vm() {
  return this.rgb().formatHex();
}
function EE() {
  return this.rgb().formatHex8();
}
function TE() {
  return gO(this).formatHsl();
}
function Xm() {
  return this.rgb().formatRgb();
}
function gi(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = OE.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Ym(t) : r === 3 ? new ze(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ha(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ha(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = wE.exec(e)) ? new ze(t[1], t[2], t[3], 1) : (t = AE.exec(e)) ? new ze(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = _E.exec(e)) ? ha(t[1], t[2], t[3], t[4]) : (t = PE.exec(e)) ? ha(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = SE.exec(e)) ? Qm(t[1], t[2] / 100, t[3] / 100, 1) : (t = jE.exec(e)) ? Qm(t[1], t[2] / 100, t[3] / 100, t[4]) : Gm.hasOwnProperty(e) ? Ym(Gm[e]) : e === "transparent" ? new ze(NaN, NaN, NaN, 0) : null;
}
function Ym(e) {
  return new ze(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ha(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new ze(e, t, r, n);
}
function $E(e) {
  return e instanceof Zi || (e = gi(e)), e ? (e = e.rgb(), new ze(e.r, e.g, e.b, e.opacity)) : new ze();
}
function zf(e, t, r, n) {
  return arguments.length === 1 ? $E(e) : new ze(e, t, r, n ?? 1);
}
function ze(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
vh(ze, zf, mO(Zi, {
  brighter(e) {
    return e = e == null ? Da : Math.pow(Da, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? yi : Math.pow(yi, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ze(Or(this.r), Or(this.g), Or(this.b), Na(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zm,
  // Deprecated! Use color.formatHex.
  formatHex: Zm,
  formatHex8: ME,
  formatRgb: Jm,
  toString: Jm
}));
function Zm() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}`;
}
function ME() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}${yr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Jm() {
  const e = Na(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Or(this.r)}, ${Or(this.g)}, ${Or(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Na(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Or(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function yr(e) {
  return e = Or(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Qm(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new lt(e, t, r, n);
}
function gO(e) {
  if (e instanceof lt) return new lt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Zi || (e = gi(e)), !e) return new lt();
  if (e instanceof lt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, u = a - i, c = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= c < 0.5 ? a + i : 2 - a - i, o *= 60) : u = c > 0 && c < 1 ? 0 : o, new lt(o, u, c, e.opacity);
}
function IE(e, t, r, n) {
  return arguments.length === 1 ? gO(e) : new lt(e, t, r, n ?? 1);
}
function lt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
vh(lt, IE, mO(Zi, {
  brighter(e) {
    return e = e == null ? Da : Math.pow(Da, e), new lt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? yi : Math.pow(yi, e), new lt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new ze(
      bl(e >= 240 ? e - 240 : e + 120, i, n),
      bl(e, i, n),
      bl(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new lt(eg(this.h), da(this.s), da(this.l), Na(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Na(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${eg(this.h)}, ${da(this.s) * 100}%, ${da(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function eg(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function da(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function bl(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const yh = (e) => () => e;
function CE(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function kE(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function RE(e) {
  return (e = +e) == 1 ? bO : function(t, r) {
    return r - t ? kE(t, r, e) : yh(isNaN(t) ? r : t);
  };
}
function bO(e, t) {
  var r = t - e;
  return r ? CE(e, r) : yh(isNaN(e) ? t : e);
}
const tg = (function e(t) {
  var r = RE(t);
  function n(i, a) {
    var o = r((i = zf(i)).r, (a = zf(a)).r), u = r(i.g, a.g), c = r(i.b, a.b), s = bO(i.opacity, a.opacity);
    return function(f) {
      return i.r = o(f), i.g = u(f), i.b = c(f), i.opacity = s(f), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function DE(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function NE(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function LE(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = Cn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a;
  };
}
function qE(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function La(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function BE(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = Cn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var Wf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xl = new RegExp(Wf.source, "g");
function FE(e) {
  return function() {
    return e;
  };
}
function zE(e) {
  return function(t) {
    return e(t) + "";
  };
}
function WE(e, t) {
  var r = Wf.lastIndex = xl.lastIndex = 0, n, i, a, o = -1, u = [], c = [];
  for (e = e + "", t = t + ""; (n = Wf.exec(e)) && (i = xl.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, c.push({ i: o, x: La(n, i) })), r = xl.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? c[0] ? zE(c[0].x) : FE(t) : (t = c.length, function(s) {
    for (var f = 0, l; f < t; ++f) u[(l = c[f]).i] = l.x(s);
    return u.join("");
  });
}
function Cn(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? yh(t) : (r === "number" ? La : r === "string" ? (n = gi(t)) ? (t = n, tg) : WE : t instanceof gi ? tg : t instanceof Date ? qE : NE(t) ? DE : Array.isArray(t) ? LE : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? BE : La)(e, t);
}
function mh(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function KE(e, t) {
  t === void 0 && (t = e, e = Cn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u);
  };
}
function UE(e) {
  return function() {
    return e;
  };
}
function qa(e) {
  return +e;
}
var rg = [0, 1];
function qe(e) {
  return e;
}
function Kf(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : UE(isNaN(t) ? NaN : 0.5);
}
function HE(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function GE(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = Kf(i, n), a = r(o, a)) : (n = Kf(n, i), a = r(a, o)), function(u) {
    return a(n(u));
  };
}
function VE(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = Kf(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var c = Yi(e, u, 1, n) - 1;
    return a[c](i[c](u));
  };
}
function Ji(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Ko() {
  var e = rg, t = rg, r = Cn, n, i, a, o = qe, u, c, s;
  function f() {
    var p = Math.min(e.length, t.length);
    return o !== qe && (o = HE(e[0], e[p - 1])), u = p > 2 ? VE : GE, c = s = null, l;
  }
  function l(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = u(e.map(n), t, r)))(n(o(p)));
  }
  return l.invert = function(p) {
    return o(i((s || (s = u(t, e.map(n), La)))(p)));
  }, l.domain = function(p) {
    return arguments.length ? (e = Array.from(p, qa), f()) : e.slice();
  }, l.range = function(p) {
    return arguments.length ? (t = Array.from(p), f()) : t.slice();
  }, l.rangeRound = function(p) {
    return t = Array.from(p), r = mh, f();
  }, l.clamp = function(p) {
    return arguments.length ? (o = p ? !0 : qe, f()) : o !== qe;
  }, l.interpolate = function(p) {
    return arguments.length ? (r = p, f()) : r;
  }, l.unknown = function(p) {
    return arguments.length ? (a = p, l) : a;
  }, function(p, h) {
    return n = p, i = h, f();
  };
}
function gh() {
  return Ko()(qe, qe);
}
function XE(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function Ba(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function rn(e) {
  return e = Ba(Math.abs(e)), e ? e[1] : NaN;
}
function YE(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], c = 0; i > 0 && u > 0 && (c + u + 1 > n && (u = Math.max(1, n - c)), a.push(r.substring(i -= u, i + u)), !((c += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function ZE(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var JE = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function bi(e) {
  if (!(t = JE.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new bh({
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
bi.prototype = bh.prototype;
function bh(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
bh.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function QE(e) {
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
var Fa;
function eT(e, t) {
  var r = Ba(e, t);
  if (!r) return Fa = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (Fa = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + Ba(e, Math.max(0, t + a - 1))[0];
}
function ng(e, t) {
  var r = Ba(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const ig = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: XE,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => ng(e * 100, t),
  r: ng,
  s: eT,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function ag(e) {
  return e;
}
var og = Array.prototype.map, ug = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function tT(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? ag : YE(og.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? ag : ZE(og.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(l, p) {
    l = bi(l);
    var h = l.fill, y = l.align, v = l.sign, d = l.symbol, g = l.zero, b = l.width, O = l.comma, w = l.precision, m = l.trim, x = l.type;
    x === "n" ? (O = !0, x = "g") : ig[x] || (w === void 0 && (w = 12), m = !0, x = "g"), (g || h === "0" && y === "=") && (g = !0, h = "0", y = "=");
    var A = (p && p.prefix !== void 0 ? p.prefix : "") + (d === "$" ? r : d === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : ""), P = (d === "$" ? n : /[%p]/.test(x) ? o : "") + (p && p.suffix !== void 0 ? p.suffix : ""), S = ig[x], T = /[defgprs%]/.test(x);
    w = w === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function E(j) {
      var $ = A, I = P, M, k, N;
      if (x === "c")
        I = S(j) + I, j = "";
      else {
        j = +j;
        var B = j < 0 || 1 / j < 0;
        if (j = isNaN(j) ? c : S(Math.abs(j), w), m && (j = QE(j)), B && +j == 0 && v !== "+" && (B = !1), $ = (B ? v === "(" ? v : u : v === "-" || v === "(" ? "" : v) + $, I = (x === "s" && !isNaN(j) && Fa !== void 0 ? ug[8 + Fa / 3] : "") + I + (B && v === "(" ? ")" : ""), T) {
          for (M = -1, k = j.length; ++M < k; )
            if (N = j.charCodeAt(M), 48 > N || N > 57) {
              I = (N === 46 ? i + j.slice(M + 1) : j.slice(M)) + I, j = j.slice(0, M);
              break;
            }
        }
      }
      O && !g && (j = t(j, 1 / 0));
      var F = $.length + j.length + I.length, U = F < b ? new Array(b - F + 1).join(h) : "";
      switch (O && g && (j = t(U + j, U.length ? b - I.length : 1 / 0), U = ""), y) {
        case "<":
          j = $ + j + I + U;
          break;
        case "=":
          j = $ + U + j + I;
          break;
        case "^":
          j = U.slice(0, F = U.length >> 1) + $ + j + I + U.slice(F);
          break;
        default:
          j = U + $ + j + I;
          break;
      }
      return a(j);
    }
    return E.toString = function() {
      return l + "";
    }, E;
  }
  function f(l, p) {
    var h = Math.max(-8, Math.min(8, Math.floor(rn(p) / 3))) * 3, y = Math.pow(10, -h), v = s((l = bi(l), l.type = "f", l), { suffix: ug[8 + h / 3] });
    return function(d) {
      return v(y * d);
    };
  }
  return {
    format: s,
    formatPrefix: f
  };
}
var va, xh, xO;
rT({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function rT(e) {
  return va = tT(e), xh = va.format, xO = va.formatPrefix, va;
}
function nT(e) {
  return Math.max(0, -rn(Math.abs(e)));
}
function iT(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(rn(t) / 3))) * 3 - rn(Math.abs(e)));
}
function aT(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, rn(t) - rn(e)) + 1;
}
function OO(e, t, r, n) {
  var i = Bf(e, t, r), a;
  switch (n = bi(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = iT(i, o)) && (n.precision = a), xO(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = aT(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = nT(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return xh(n);
}
function er(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Lf(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return OO(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], u = n[a], c, s, f = 10;
    for (u < o && (s = o, o = u, u = s, s = i, i = a, a = s); f-- > 0; ) {
      if (s = qf(o, u, r), s === c)
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
function za() {
  var e = gh();
  return e.copy = function() {
    return Ji(e, za());
  }, ot.apply(e, arguments), er(e);
}
function wO(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, qa), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return wO(e).unknown(t);
  }, e = arguments.length ? Array.from(e, qa) : [0, 1], er(r);
}
function AO(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function cg(e) {
  return Math.log(e);
}
function sg(e) {
  return Math.exp(e);
}
function oT(e) {
  return -Math.log(-e);
}
function uT(e) {
  return -Math.exp(-e);
}
function cT(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function sT(e) {
  return e === 10 ? cT : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function lT(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function lg(e) {
  return (t, r) => -e(-t, r);
}
function Oh(e) {
  const t = e(cg, sg), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = lT(n), a = sT(n), r()[0] < 0 ? (i = lg(i), a = lg(a), e(oT, uT)) : e(cg, sg), t;
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
    let p = i(s), h = i(f), y, v;
    const d = u == null ? 10 : +u;
    let g = [];
    if (!(n % 1) && h - p < d) {
      if (p = Math.floor(p), h = Math.ceil(h), s > 0) {
        for (; p <= h; ++p)
          for (y = 1; y < n; ++y)
            if (v = p < 0 ? y / a(-p) : y * a(p), !(v < s)) {
              if (v > f) break;
              g.push(v);
            }
      } else for (; p <= h; ++p)
        for (y = n - 1; y >= 1; --y)
          if (v = p > 0 ? y / a(-p) : y * a(p), !(v < s)) {
            if (v > f) break;
            g.push(v);
          }
      g.length * 2 < d && (g = Lf(s, f, d));
    } else
      g = Lf(p, h, Math.min(h - p, d)).map(a);
    return l ? g.reverse() : g;
  }, t.tickFormat = (u, c) => {
    if (u == null && (u = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = bi(c)).precision == null && (c.trim = !0), c = xh(c)), u === 1 / 0) return c;
    const s = Math.max(1, n * u / t.ticks().length);
    return (f) => {
      let l = f / a(Math.round(i(f)));
      return l * n < n - 0.5 && (l *= n), l <= s ? c(f) : "";
    };
  }, t.nice = () => r(AO(r(), {
    floor: (u) => a(Math.floor(i(u))),
    ceil: (u) => a(Math.ceil(i(u)))
  })), t;
}
function _O() {
  const e = Oh(Ko()).domain([1, 10]);
  return e.copy = () => Ji(e, _O()).base(e.base()), ot.apply(e, arguments), e;
}
function fg(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function pg(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function wh(e) {
  var t = 1, r = e(fg(t), pg(t));
  return r.constant = function(n) {
    return arguments.length ? e(fg(t = +n), pg(t)) : t;
  }, er(r);
}
function PO() {
  var e = wh(Ko());
  return e.copy = function() {
    return Ji(e, PO()).constant(e.constant());
  }, ot.apply(e, arguments);
}
function hg(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function fT(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function pT(e) {
  return e < 0 ? -e * e : e * e;
}
function Ah(e) {
  var t = e(qe, qe), r = 1;
  function n() {
    return r === 1 ? e(qe, qe) : r === 0.5 ? e(fT, pT) : e(hg(r), hg(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, er(t);
}
function _h() {
  var e = Ah(Ko());
  return e.copy = function() {
    return Ji(e, _h()).exponent(e.exponent());
  }, ot.apply(e, arguments), e;
}
function hT() {
  return _h.apply(null, arguments).exponent(0.5);
}
function dg(e) {
  return Math.sign(e) * e * e;
}
function dT(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function SO() {
  var e = gh(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = dT(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(dg(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, qa)).map(dg)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return SO(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, ot.apply(i, arguments), er(i);
}
function jO() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = bE(e, o / u);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[Yi(r, o)];
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
    return e.sort(Xt), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return jO().domain(e).range(t).unknown(n);
  }, ot.apply(a, arguments);
}
function EO() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(c) {
    return c != null && c <= c ? i[Yi(n, c, 0, r)] : a;
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
    return EO().domain([e, t]).range(i).unknown(a);
  }, ot.apply(er(o), arguments);
}
function TO() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[Yi(e, a, 0, n)] : r;
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
    return TO().domain(e).range(t).unknown(r);
  }, ot.apply(i, arguments);
}
const Ol = /* @__PURE__ */ new Date(), wl = /* @__PURE__ */ new Date();
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
  }), r && (i.count = (a, o) => (Ol.setTime(+a), wl.setTime(+o), e(Ol), e(wl), Math.floor(r(Ol, wl))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const Wa = je(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Wa.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? je((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Wa);
Wa.range;
const Tt = 1e3, it = Tt * 60, $t = it * 60, kt = $t * 24, Ph = kt * 7, vg = kt * 30, Al = kt * 365, mr = je((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Tt);
}, (e, t) => (t - e) / Tt, (e) => e.getUTCSeconds());
mr.range;
const Sh = je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Tt);
}, (e, t) => {
  e.setTime(+e + t * it);
}, (e, t) => (t - e) / it, (e) => e.getMinutes());
Sh.range;
const jh = je((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * it);
}, (e, t) => (t - e) / it, (e) => e.getUTCMinutes());
jh.range;
const Eh = je((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Tt - e.getMinutes() * it);
}, (e, t) => {
  e.setTime(+e + t * $t);
}, (e, t) => (t - e) / $t, (e) => e.getHours());
Eh.range;
const Th = je((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * $t);
}, (e, t) => (t - e) / $t, (e) => e.getUTCHours());
Th.range;
const Qi = je(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * it) / kt,
  (e) => e.getDate() - 1
);
Qi.range;
const Uo = je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / kt, (e) => e.getUTCDate() - 1);
Uo.range;
const $O = je((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / kt, (e) => Math.floor(e / kt));
$O.range;
function $r(e) {
  return je((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * it) / Ph);
}
const Ho = $r(0), Ka = $r(1), vT = $r(2), yT = $r(3), nn = $r(4), mT = $r(5), gT = $r(6);
Ho.range;
Ka.range;
vT.range;
yT.range;
nn.range;
mT.range;
gT.range;
function Mr(e) {
  return je((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Ph);
}
const Go = Mr(0), Ua = Mr(1), bT = Mr(2), xT = Mr(3), an = Mr(4), OT = Mr(5), wT = Mr(6);
Go.range;
Ua.range;
bT.range;
xT.range;
an.range;
OT.range;
wT.range;
const $h = je((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
$h.range;
const Mh = je((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Mh.range;
const Rt = je((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Rt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : je((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Rt.range;
const Dt = je((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Dt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : je((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Dt.range;
function MO(e, t, r, n, i, a) {
  const o = [
    [mr, 1, Tt],
    [mr, 5, 5 * Tt],
    [mr, 15, 15 * Tt],
    [mr, 30, 30 * Tt],
    [a, 1, it],
    [a, 5, 5 * it],
    [a, 15, 15 * it],
    [a, 30, 30 * it],
    [i, 1, $t],
    [i, 3, 3 * $t],
    [i, 6, 6 * $t],
    [i, 12, 12 * $t],
    [n, 1, kt],
    [n, 2, 2 * kt],
    [r, 1, Ph],
    [t, 1, vg],
    [t, 3, 3 * vg],
    [e, 1, Al]
  ];
  function u(s, f, l) {
    const p = f < s;
    p && ([s, f] = [f, s]);
    const h = l && typeof l.range == "function" ? l : c(s, f, l), y = h ? h.range(s, +f + 1) : [];
    return p ? y.reverse() : y;
  }
  function c(s, f, l) {
    const p = Math.abs(f - s) / l, h = hh(([, , d]) => d).right(o, p);
    if (h === o.length) return e.every(Bf(s / Al, f / Al, l));
    if (h === 0) return Wa.every(Math.max(Bf(s, f, l), 1));
    const [y, v] = o[p / o[h - 1][2] < o[h][2] / p ? h - 1 : h];
    return y.every(v);
  }
  return [u, c];
}
const [AT, _T] = MO(Dt, Mh, Go, $O, Th, jh), [PT, ST] = MO(Rt, $h, Ho, Qi, Eh, Sh);
function _l(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Pl(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Wn(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function jT(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, u = e.months, c = e.shortMonths, s = Kn(i), f = Un(i), l = Kn(a), p = Un(a), h = Kn(o), y = Un(o), v = Kn(u), d = Un(u), g = Kn(c), b = Un(c), O = {
    a: N,
    A: B,
    b: F,
    B: U,
    c: null,
    d: Og,
    e: Og,
    f: YT,
    g: o$,
    G: c$,
    H: GT,
    I: VT,
    j: XT,
    L: IO,
    m: ZT,
    M: JT,
    p: Z,
    q: K,
    Q: _g,
    s: Pg,
    S: QT,
    u: e$,
    U: t$,
    V: r$,
    w: n$,
    W: i$,
    x: null,
    X: null,
    y: a$,
    Y: u$,
    Z: s$,
    "%": Ag
  }, w = {
    a: Q,
    A: de,
    b: be,
    B: Ue,
    c: null,
    d: wg,
    e: wg,
    f: h$,
    g: A$,
    G: P$,
    H: l$,
    I: f$,
    j: p$,
    L: kO,
    m: d$,
    M: v$,
    p: or,
    q: Be,
    Q: _g,
    s: Pg,
    S: y$,
    u: m$,
    U: g$,
    V: b$,
    w: x$,
    W: O$,
    x: null,
    X: null,
    y: w$,
    Y: _$,
    Z: S$,
    "%": Ag
  }, m = {
    a: T,
    A: E,
    b: j,
    B: $,
    c: I,
    d: bg,
    e: bg,
    f: WT,
    g: gg,
    G: mg,
    H: xg,
    I: xg,
    j: qT,
    L: zT,
    m: LT,
    M: BT,
    p: S,
    q: NT,
    Q: UT,
    s: HT,
    S: FT,
    u: IT,
    U: CT,
    V: kT,
    w: MT,
    W: RT,
    x: M,
    X: k,
    y: gg,
    Y: mg,
    Z: DT,
    "%": KT
  };
  O.x = x(r, O), O.X = x(n, O), O.c = x(t, O), w.x = x(r, w), w.X = x(n, w), w.c = x(t, w);
  function x(z, ee) {
    return function(te) {
      var L = [], me = -1, re = 0, we = z.length, Ae, Fe, zt;
      for (te instanceof Date || (te = /* @__PURE__ */ new Date(+te)); ++me < we; )
        z.charCodeAt(me) === 37 && (L.push(z.slice(re, me)), (Fe = yg[Ae = z.charAt(++me)]) != null ? Ae = z.charAt(++me) : Fe = Ae === "e" ? " " : "0", (zt = ee[Ae]) && (Ae = zt(te, Fe)), L.push(Ae), re = me + 1);
      return L.push(z.slice(re, me)), L.join("");
    };
  }
  function A(z, ee) {
    return function(te) {
      var L = Wn(1900, void 0, 1), me = P(L, z, te += "", 0), re, we;
      if (me != te.length) return null;
      if ("Q" in L) return new Date(L.Q);
      if ("s" in L) return new Date(L.s * 1e3 + ("L" in L ? L.L : 0));
      if (ee && !("Z" in L) && (L.Z = 0), "p" in L && (L.H = L.H % 12 + L.p * 12), L.m === void 0 && (L.m = "q" in L ? L.q : 0), "V" in L) {
        if (L.V < 1 || L.V > 53) return null;
        "w" in L || (L.w = 1), "Z" in L ? (re = Pl(Wn(L.y, 0, 1)), we = re.getUTCDay(), re = we > 4 || we === 0 ? Ua.ceil(re) : Ua(re), re = Uo.offset(re, (L.V - 1) * 7), L.y = re.getUTCFullYear(), L.m = re.getUTCMonth(), L.d = re.getUTCDate() + (L.w + 6) % 7) : (re = _l(Wn(L.y, 0, 1)), we = re.getDay(), re = we > 4 || we === 0 ? Ka.ceil(re) : Ka(re), re = Qi.offset(re, (L.V - 1) * 7), L.y = re.getFullYear(), L.m = re.getMonth(), L.d = re.getDate() + (L.w + 6) % 7);
      } else ("W" in L || "U" in L) && ("w" in L || (L.w = "u" in L ? L.u % 7 : "W" in L ? 1 : 0), we = "Z" in L ? Pl(Wn(L.y, 0, 1)).getUTCDay() : _l(Wn(L.y, 0, 1)).getDay(), L.m = 0, L.d = "W" in L ? (L.w + 6) % 7 + L.W * 7 - (we + 5) % 7 : L.w + L.U * 7 - (we + 6) % 7);
      return "Z" in L ? (L.H += L.Z / 100 | 0, L.M += L.Z % 100, Pl(L)) : _l(L);
    };
  }
  function P(z, ee, te, L) {
    for (var me = 0, re = ee.length, we = te.length, Ae, Fe; me < re; ) {
      if (L >= we) return -1;
      if (Ae = ee.charCodeAt(me++), Ae === 37) {
        if (Ae = ee.charAt(me++), Fe = m[Ae in yg ? ee.charAt(me++) : Ae], !Fe || (L = Fe(z, te, L)) < 0) return -1;
      } else if (Ae != te.charCodeAt(L++))
        return -1;
    }
    return L;
  }
  function S(z, ee, te) {
    var L = s.exec(ee.slice(te));
    return L ? (z.p = f.get(L[0].toLowerCase()), te + L[0].length) : -1;
  }
  function T(z, ee, te) {
    var L = h.exec(ee.slice(te));
    return L ? (z.w = y.get(L[0].toLowerCase()), te + L[0].length) : -1;
  }
  function E(z, ee, te) {
    var L = l.exec(ee.slice(te));
    return L ? (z.w = p.get(L[0].toLowerCase()), te + L[0].length) : -1;
  }
  function j(z, ee, te) {
    var L = g.exec(ee.slice(te));
    return L ? (z.m = b.get(L[0].toLowerCase()), te + L[0].length) : -1;
  }
  function $(z, ee, te) {
    var L = v.exec(ee.slice(te));
    return L ? (z.m = d.get(L[0].toLowerCase()), te + L[0].length) : -1;
  }
  function I(z, ee, te) {
    return P(z, t, ee, te);
  }
  function M(z, ee, te) {
    return P(z, r, ee, te);
  }
  function k(z, ee, te) {
    return P(z, n, ee, te);
  }
  function N(z) {
    return o[z.getDay()];
  }
  function B(z) {
    return a[z.getDay()];
  }
  function F(z) {
    return c[z.getMonth()];
  }
  function U(z) {
    return u[z.getMonth()];
  }
  function Z(z) {
    return i[+(z.getHours() >= 12)];
  }
  function K(z) {
    return 1 + ~~(z.getMonth() / 3);
  }
  function Q(z) {
    return o[z.getUTCDay()];
  }
  function de(z) {
    return a[z.getUTCDay()];
  }
  function be(z) {
    return c[z.getUTCMonth()];
  }
  function Ue(z) {
    return u[z.getUTCMonth()];
  }
  function or(z) {
    return i[+(z.getUTCHours() >= 12)];
  }
  function Be(z) {
    return 1 + ~~(z.getUTCMonth() / 3);
  }
  return {
    format: function(z) {
      var ee = x(z += "", O);
      return ee.toString = function() {
        return z;
      }, ee;
    },
    parse: function(z) {
      var ee = A(z += "", !1);
      return ee.toString = function() {
        return z;
      }, ee;
    },
    utcFormat: function(z) {
      var ee = x(z += "", w);
      return ee.toString = function() {
        return z;
      }, ee;
    },
    utcParse: function(z) {
      var ee = A(z += "", !0);
      return ee.toString = function() {
        return z;
      }, ee;
    }
  };
}
var yg = { "-": "", _: " ", 0: "0" }, Ie = /^\s*\d+/, ET = /^%/, TT = /[\\^$*+?|[\]().{}]/g;
function ie(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function $T(e) {
  return e.replace(TT, "\\$&");
}
function Kn(e) {
  return new RegExp("^(?:" + e.map($T).join("|") + ")", "i");
}
function Un(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function MT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function IT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function CT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function kT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function RT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function mg(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function gg(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function DT(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function NT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function LT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function bg(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function qT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function xg(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function BT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function FT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function zT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function WT(e, t, r) {
  var n = Ie.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function KT(e, t, r) {
  var n = ET.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function UT(e, t, r) {
  var n = Ie.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function HT(e, t, r) {
  var n = Ie.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Og(e, t) {
  return ie(e.getDate(), t, 2);
}
function GT(e, t) {
  return ie(e.getHours(), t, 2);
}
function VT(e, t) {
  return ie(e.getHours() % 12 || 12, t, 2);
}
function XT(e, t) {
  return ie(1 + Qi.count(Rt(e), e), t, 3);
}
function IO(e, t) {
  return ie(e.getMilliseconds(), t, 3);
}
function YT(e, t) {
  return IO(e, t) + "000";
}
function ZT(e, t) {
  return ie(e.getMonth() + 1, t, 2);
}
function JT(e, t) {
  return ie(e.getMinutes(), t, 2);
}
function QT(e, t) {
  return ie(e.getSeconds(), t, 2);
}
function e$(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function t$(e, t) {
  return ie(Ho.count(Rt(e) - 1, e), t, 2);
}
function CO(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? nn(e) : nn.ceil(e);
}
function r$(e, t) {
  return e = CO(e), ie(nn.count(Rt(e), e) + (Rt(e).getDay() === 4), t, 2);
}
function n$(e) {
  return e.getDay();
}
function i$(e, t) {
  return ie(Ka.count(Rt(e) - 1, e), t, 2);
}
function a$(e, t) {
  return ie(e.getFullYear() % 100, t, 2);
}
function o$(e, t) {
  return e = CO(e), ie(e.getFullYear() % 100, t, 2);
}
function u$(e, t) {
  return ie(e.getFullYear() % 1e4, t, 4);
}
function c$(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? nn(e) : nn.ceil(e), ie(e.getFullYear() % 1e4, t, 4);
}
function s$(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + ie(t / 60 | 0, "0", 2) + ie(t % 60, "0", 2);
}
function wg(e, t) {
  return ie(e.getUTCDate(), t, 2);
}
function l$(e, t) {
  return ie(e.getUTCHours(), t, 2);
}
function f$(e, t) {
  return ie(e.getUTCHours() % 12 || 12, t, 2);
}
function p$(e, t) {
  return ie(1 + Uo.count(Dt(e), e), t, 3);
}
function kO(e, t) {
  return ie(e.getUTCMilliseconds(), t, 3);
}
function h$(e, t) {
  return kO(e, t) + "000";
}
function d$(e, t) {
  return ie(e.getUTCMonth() + 1, t, 2);
}
function v$(e, t) {
  return ie(e.getUTCMinutes(), t, 2);
}
function y$(e, t) {
  return ie(e.getUTCSeconds(), t, 2);
}
function m$(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function g$(e, t) {
  return ie(Go.count(Dt(e) - 1, e), t, 2);
}
function RO(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? an(e) : an.ceil(e);
}
function b$(e, t) {
  return e = RO(e), ie(an.count(Dt(e), e) + (Dt(e).getUTCDay() === 4), t, 2);
}
function x$(e) {
  return e.getUTCDay();
}
function O$(e, t) {
  return ie(Ua.count(Dt(e) - 1, e), t, 2);
}
function w$(e, t) {
  return ie(e.getUTCFullYear() % 100, t, 2);
}
function A$(e, t) {
  return e = RO(e), ie(e.getUTCFullYear() % 100, t, 2);
}
function _$(e, t) {
  return ie(e.getUTCFullYear() % 1e4, t, 4);
}
function P$(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? an(e) : an.ceil(e), ie(e.getUTCFullYear() % 1e4, t, 4);
}
function S$() {
  return "+0000";
}
function Ag() {
  return "%";
}
function _g(e) {
  return +e;
}
function Pg(e) {
  return Math.floor(+e / 1e3);
}
var Br, DO, NO;
j$({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function j$(e) {
  return Br = jT(e), DO = Br.format, Br.parse, NO = Br.utcFormat, Br.utcParse, Br;
}
function E$(e) {
  return new Date(e);
}
function T$(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Ih(e, t, r, n, i, a, o, u, c, s) {
  var f = gh(), l = f.invert, p = f.domain, h = s(".%L"), y = s(":%S"), v = s("%I:%M"), d = s("%I %p"), g = s("%a %d"), b = s("%b %d"), O = s("%B"), w = s("%Y");
  function m(x) {
    return (c(x) < x ? h : u(x) < x ? y : o(x) < x ? v : a(x) < x ? d : n(x) < x ? i(x) < x ? g : b : r(x) < x ? O : w)(x);
  }
  return f.invert = function(x) {
    return new Date(l(x));
  }, f.domain = function(x) {
    return arguments.length ? p(Array.from(x, T$)) : p().map(E$);
  }, f.ticks = function(x) {
    var A = p();
    return e(A[0], A[A.length - 1], x ?? 10);
  }, f.tickFormat = function(x, A) {
    return A == null ? m : s(A);
  }, f.nice = function(x) {
    var A = p();
    return (!x || typeof x.range != "function") && (x = t(A[0], A[A.length - 1], x ?? 10)), x ? p(AO(A, x)) : f;
  }, f.copy = function() {
    return Ji(f, Ih(e, t, r, n, i, a, o, u, c, s));
  }, f;
}
function $$() {
  return ot.apply(Ih(PT, ST, Rt, $h, Ho, Qi, Eh, Sh, mr, DO).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function M$() {
  return ot.apply(Ih(AT, _T, Dt, Mh, Go, Uo, Th, jh, mr, NO).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Vo() {
  var e = 0, t = 1, r, n, i, a, o = qe, u = !1, c;
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
      var h, y;
      return arguments.length ? ([h, y] = p, o = l(h, y), s) : [o(0), o(1)];
    };
  }
  return s.range = f(Cn), s.rangeRound = f(mh), s.unknown = function(l) {
    return arguments.length ? (c = l, s) : c;
  }, function(l) {
    return a = l, r = l(e), n = l(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function tr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function LO() {
  var e = er(Vo()(qe));
  return e.copy = function() {
    return tr(e, LO());
  }, Bt.apply(e, arguments);
}
function qO() {
  var e = Oh(Vo()).domain([1, 10]);
  return e.copy = function() {
    return tr(e, qO()).base(e.base());
  }, Bt.apply(e, arguments);
}
function BO() {
  var e = wh(Vo());
  return e.copy = function() {
    return tr(e, BO()).constant(e.constant());
  }, Bt.apply(e, arguments);
}
function Ch() {
  var e = Ah(Vo());
  return e.copy = function() {
    return tr(e, Ch()).exponent(e.exponent());
  }, Bt.apply(e, arguments);
}
function I$() {
  return Ch.apply(null, arguments).exponent(0.5);
}
function FO() {
  var e = [], t = qe;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((Yi(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(Xt), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => gE(e, a / n));
  }, r.copy = function() {
    return FO(t).domain(e);
  }, Bt.apply(r, arguments);
}
function Xo() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, u, c, s = qe, f, l = !1, p;
  function h(v) {
    return isNaN(v = +v) ? p : (v = 0.5 + ((v = +f(v)) - a) * (n * v < n * a ? u : c), s(l ? Math.max(0, Math.min(1, v)) : v));
  }
  h.domain = function(v) {
    return arguments.length ? ([e, t, r] = v, i = f(e = +e), a = f(t = +t), o = f(r = +r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(v) {
    return arguments.length ? (l = !!v, h) : l;
  }, h.interpolator = function(v) {
    return arguments.length ? (s = v, h) : s;
  };
  function y(v) {
    return function(d) {
      var g, b, O;
      return arguments.length ? ([g, b, O] = d, s = KE(v, [g, b, O]), h) : [s(0), s(0.5), s(1)];
    };
  }
  return h.range = y(Cn), h.rangeRound = y(mh), h.unknown = function(v) {
    return arguments.length ? (p = v, h) : p;
  }, function(v) {
    return f = v, i = v(e), a = v(t), o = v(r), u = i === a ? 0 : 0.5 / (a - i), c = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h;
  };
}
function zO() {
  var e = er(Xo()(qe));
  return e.copy = function() {
    return tr(e, zO());
  }, Bt.apply(e, arguments);
}
function WO() {
  var e = Oh(Xo()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return tr(e, WO()).base(e.base());
  }, Bt.apply(e, arguments);
}
function KO() {
  var e = wh(Xo());
  return e.copy = function() {
    return tr(e, KO()).constant(e.constant());
  }, Bt.apply(e, arguments);
}
function kh() {
  var e = Ah(Xo());
  return e.copy = function() {
    return tr(e, kh()).exponent(e.exponent());
  }, Bt.apply(e, arguments);
}
function C$() {
  return kh.apply(null, arguments).exponent(0.5);
}
const Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: vi,
  scaleDiverging: zO,
  scaleDivergingLog: WO,
  scaleDivergingPow: kh,
  scaleDivergingSqrt: C$,
  scaleDivergingSymlog: KO,
  scaleIdentity: wO,
  scaleImplicit: Ff,
  scaleLinear: za,
  scaleLog: _O,
  scaleOrdinal: dh,
  scalePoint: ei,
  scalePow: _h,
  scaleQuantile: jO,
  scaleQuantize: EO,
  scaleRadial: SO,
  scaleSequential: LO,
  scaleSequentialLog: qO,
  scaleSequentialPow: Ch,
  scaleSequentialQuantile: FO,
  scaleSequentialSqrt: I$,
  scaleSequentialSymlog: BO,
  scaleSqrt: hT,
  scaleSymlog: PO,
  scaleThreshold: TO,
  scaleTime: $$,
  scaleUtc: M$,
  tickFormat: OO
}, Symbol.toStringTag, { value: "Module" }));
var Sl, jg;
function Yo() {
  if (jg) return Sl;
  jg = 1;
  var e = Tn();
  function t(r, n, i) {
    for (var a = -1, o = r.length; ++a < o; ) {
      var u = r[a], c = n(u);
      if (c != null && (s === void 0 ? c === c && !e(c) : i(c, s)))
        var s = c, f = u;
    }
    return f;
  }
  return Sl = t, Sl;
}
var jl, Eg;
function UO() {
  if (Eg) return jl;
  Eg = 1;
  function e(t, r) {
    return t > r;
  }
  return jl = e, jl;
}
var El, Tg;
function k$() {
  if (Tg) return El;
  Tg = 1;
  var e = Yo(), t = UO(), r = In();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return El = n, El;
}
var R$ = k$();
const Ht = /* @__PURE__ */ ce(R$);
var Tl, $g;
function HO() {
  if ($g) return Tl;
  $g = 1;
  function e(t, r) {
    return t < r;
  }
  return Tl = e, Tl;
}
var $l, Mg;
function D$() {
  if (Mg) return $l;
  Mg = 1;
  var e = Yo(), t = HO(), r = In();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return $l = n, $l;
}
var N$ = D$();
const Zo = /* @__PURE__ */ ce(N$);
var Ml, Ig;
function L$() {
  if (Ig) return Ml;
  Ig = 1;
  var e = Zp(), t = Pt(), r = tO(), n = Ke();
  function i(a, o) {
    var u = n(a) ? e : r;
    return u(a, t(o, 3));
  }
  return Ml = i, Ml;
}
var Il, Cg;
function q$() {
  if (Cg) return Il;
  Cg = 1;
  var e = Qx(), t = L$();
  function r(n, i) {
    return e(t(n, i), 1);
  }
  return Il = r, Il;
}
var B$ = q$();
const F$ = /* @__PURE__ */ ce(B$);
var Cl, kg;
function z$() {
  if (kg) return Cl;
  kg = 1;
  var e = sh();
  function t(r, n) {
    return e(r, n);
  }
  return Cl = t, Cl;
}
var W$ = z$();
const wt = /* @__PURE__ */ ce(W$);
var kn = 1e9, K$ = {
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
}, Dh, ye = !0, at = "[DecimalError] ", wr = at + "Invalid argument: ", Rh = at + "Exponent out of range: ", Rn = Math.floor, hr = Math.pow, U$ = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Xe, Te = 1e7, ve = 7, GO = 9007199254740991, Ha = Rn(GO / ve), H = {};
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
  var e = this, t = e.d.length - 1, r = (t - e.e) * ve;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
H.dividedBy = H.div = function(e) {
  return Ct(this, new this.constructor(e));
};
H.dividedToIntegerBy = H.idiv = function(e) {
  var t = this, r = t.constructor;
  return fe(Ct(t, new r(e), 0, 1), r.precision);
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
  else if (e = new n(e), e.s < 1 || e.eq(Xe)) throw Error(at + "NaN");
  if (r.s < 1) throw Error(at + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Xe) ? new n(0) : (ye = !1, t = Ct(xi(r, a), xi(e, a), a), ye = !0, fe(t, i));
};
H.minus = H.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? YO(t, e) : VO(t, (e.s = -e.s, e));
};
H.modulo = H.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(at + "NaN");
  return r.s ? (ye = !1, t = Ct(r, e, 0, 1).times(e), ye = !0, r.minus(t)) : fe(new n(r), i);
};
H.naturalExponential = H.exp = function() {
  return XO(this);
};
H.naturalLogarithm = H.ln = function() {
  return xi(this);
};
H.negated = H.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
H.plus = H.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? VO(t, e) : YO(t, (e.s = -e.s, e));
};
H.precision = H.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(wr + e);
  if (t = Oe(i) + 1, n = i.d.length - 1, r = n * ve + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
H.squareRoot = H.sqrt = function() {
  var e, t, r, n, i, a, o, u = this, c = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new c(0);
    throw Error(at + "NaN");
  }
  for (e = Oe(u), ye = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = mt(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Rn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(i.toString()), r = c.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(Ct(u, a, o + 2)).times(0.5), mt(a.d).slice(0, o) === (t = mt(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (fe(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return ye = !0, fe(n, r);
};
H.times = H.mul = function(e) {
  var t, r, n, i, a, o, u, c, s, f = this, l = f.constructor, p = f.d, h = (e = new l(e)).d;
  if (!f.s || !e.s) return new l(0);
  for (e.s *= f.s, r = f.e + e.e, c = p.length, s = h.length, c < s && (a = p, p = h, h = a, o = c, c = s, s = o), a = [], o = c + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = c + n; i > n; )
      u = a[i] + h[n] * p[i - n - 1] + t, a[i--] = u % Te | 0, t = u / Te | 0;
    a[i] = (a[i] + t) % Te | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, ye ? fe(e, l.precision) : e;
};
H.toDecimalPlaces = H.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (At(e, 0, kn), t === void 0 ? t = n.rounding : At(t, 0, 8), fe(r, e + Oe(r) + 1, t));
};
H.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = Sr(n, !0) : (At(e, 0, kn), t === void 0 ? t = i.rounding : At(t, 0, 8), n = fe(new i(n), e + 1, t), r = Sr(n, !0, e + 1)), r;
};
H.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? Sr(i) : (At(e, 0, kn), t === void 0 ? t = a.rounding : At(t, 0, 8), n = fe(new a(i), e + Oe(i) + 1, t), r = Sr(n.abs(), !1, e + Oe(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
H.toInteger = H.toint = function() {
  var e = this, t = e.constructor;
  return fe(new t(e), Oe(e) + 1, t.rounding);
};
H.toNumber = function() {
  return +this;
};
H.toPower = H.pow = function(e) {
  var t, r, n, i, a, o, u = this, c = u.constructor, s = 12, f = +(e = new c(e));
  if (!e.s) return new c(Xe);
  if (u = new c(u), !u.s) {
    if (e.s < 1) throw Error(at + "Infinity");
    return u;
  }
  if (u.eq(Xe)) return u;
  if (n = c.precision, e.eq(Xe)) return fe(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = f < 0 ? -f : f) <= GO) {
      for (i = new c(Xe), t = Math.ceil(n / ve + 4), ye = !1; r % 2 && (i = i.times(u), Dg(i.d, t)), r = Rn(r / 2), r !== 0; )
        u = u.times(u), Dg(u.d, t);
      return ye = !0, e.s < 0 ? new c(Xe).div(i) : fe(i, n);
    }
  } else if (a < 0) throw Error(at + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, ye = !1, i = e.times(xi(u, n + s)), ye = !0, i = XO(i), i.s = a, i;
};
H.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = Oe(i), n = Sr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (At(e, 1, kn), t === void 0 ? t = a.rounding : At(t, 0, 8), i = fe(new a(i), e, t), r = Oe(i), n = Sr(i, e <= r || r <= a.toExpNeg, e)), n;
};
H.toSignificantDigits = H.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (At(e, 1, kn), t === void 0 ? t = n.rounding : At(t, 0, 8)), fe(new n(r), e, t);
};
H.toString = H.valueOf = H.val = H.toJSON = H[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = Oe(e), r = e.constructor;
  return Sr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function VO(e, t) {
  var r, n, i, a, o, u, c, s, f = e.constructor, l = f.precision;
  if (!e.s || !t.s)
    return t.s || (t = new f(e)), ye ? fe(t, l) : t;
  if (c = e.d, s = t.d, o = e.e, i = t.e, c = c.slice(), a = o - i, a) {
    for (a < 0 ? (n = c, a = -a, u = s.length) : (n = s, i = o, u = c.length), o = Math.ceil(l / ve), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (u = c.length, a = s.length, u - a < 0 && (a = u, n = s, s = c, c = n), r = 0; a; )
    r = (c[--a] = c[a] + s[a] + r) / Te | 0, c[a] %= Te;
  for (r && (c.unshift(r), ++i), u = c.length; c[--u] == 0; ) c.pop();
  return t.d = c, t.e = i, ye ? fe(t, l) : t;
}
function At(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(wr + e);
}
function mt(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = ve - n.length, r && (a += Kt(r)), a += n;
    o = e[t], n = o + "", r = ve - n.length, r && (a += Kt(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var Ct = /* @__PURE__ */ (function() {
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
    var u, c, s, f, l, p, h, y, v, d, g, b, O, w, m, x, A, P, S = n.constructor, T = n.s == i.s ? 1 : -1, E = n.d, j = i.d;
    if (!n.s) return new S(n);
    if (!i.s) throw Error(at + "Division by zero");
    for (c = n.e - i.e, A = j.length, m = E.length, h = new S(T), y = h.d = [], s = 0; j[s] == (E[s] || 0); ) ++s;
    if (j[s] > (E[s] || 0) && --c, a == null ? b = a = S.precision : o ? b = a + (Oe(n) - Oe(i)) + 1 : b = a, b < 0) return new S(0);
    if (b = b / ve + 2 | 0, s = 0, A == 1)
      for (f = 0, j = j[0], b++; (s < m || f) && b--; s++)
        O = f * Te + (E[s] || 0), y[s] = O / j | 0, f = O % j | 0;
    else {
      for (f = Te / (j[0] + 1) | 0, f > 1 && (j = e(j, f), E = e(E, f), A = j.length, m = E.length), w = A, v = E.slice(0, A), d = v.length; d < A; ) v[d++] = 0;
      P = j.slice(), P.unshift(0), x = j[0], j[1] >= Te / 2 && ++x;
      do
        f = 0, u = t(j, v, A, d), u < 0 ? (g = v[0], A != d && (g = g * Te + (v[1] || 0)), f = g / x | 0, f > 1 ? (f >= Te && (f = Te - 1), l = e(j, f), p = l.length, d = v.length, u = t(l, v, p, d), u == 1 && (f--, r(l, A < p ? P : j, p))) : (f == 0 && (u = f = 1), l = j.slice()), p = l.length, p < d && l.unshift(0), r(v, l, d), u == -1 && (d = v.length, u = t(j, v, A, d), u < 1 && (f++, r(v, A < d ? P : j, d))), d = v.length) : u === 0 && (f++, v = [0]), y[s++] = f, u && v[0] ? v[d++] = E[w] || 0 : (v = [E[w]], d = 1);
      while ((w++ < m || v[0] !== void 0) && b--);
    }
    return y[0] || y.shift(), h.e = c, fe(h, o ? a + Oe(h) + 1 : a);
  };
})();
function XO(e, t) {
  var r, n, i, a, o, u, c = 0, s = 0, f = e.constructor, l = f.precision;
  if (Oe(e) > 16) throw Error(Rh + Oe(e));
  if (!e.s) return new f(Xe);
  for (ye = !1, u = l, o = new f(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(hr(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new f(Xe), f.precision = u; ; ) {
    if (i = fe(i.times(e), u), r = r.times(++c), o = a.plus(Ct(i, r, u)), mt(o.d).slice(0, u) === mt(a.d).slice(0, u)) {
      for (; s--; ) a = fe(a.times(a), u);
      return f.precision = l, t == null ? (ye = !0, fe(a, l)) : a;
    }
    a = o;
  }
}
function Oe(e) {
  for (var t = e.e * ve, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function kl(e, t, r) {
  if (t > e.LN10.sd())
    throw ye = !0, r && (e.precision = r), Error(at + "LN10 precision limit exceeded");
  return fe(new e(e.LN10), t);
}
function Kt(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function xi(e, t) {
  var r, n, i, a, o, u, c, s, f, l = 1, p = 10, h = e, y = h.d, v = h.constructor, d = v.precision;
  if (h.s < 1) throw Error(at + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Xe)) return new v(0);
  if (t == null ? (ye = !1, s = d) : s = t, h.eq(10))
    return t == null && (ye = !0), kl(v, s);
  if (s += p, v.precision = s, r = mt(y), n = r.charAt(0), a = Oe(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = mt(h.d), n = r.charAt(0), l++;
    a = Oe(h), n > 1 ? (h = new v("0." + r), a++) : h = new v(n + "." + r.slice(1));
  } else
    return c = kl(v, s + 2, d).times(a + ""), h = xi(new v(n + "." + r.slice(1)), s - p).plus(c), v.precision = d, t == null ? (ye = !0, fe(h, d)) : h;
  for (u = o = h = Ct(h.minus(Xe), h.plus(Xe), s), f = fe(h.times(h), s), i = 3; ; ) {
    if (o = fe(o.times(f), s), c = u.plus(Ct(o, new v(i), s)), mt(c.d).slice(0, s) === mt(u.d).slice(0, s))
      return u = u.times(2), a !== 0 && (u = u.plus(kl(v, s + 2, d).times(a + ""))), u = Ct(u, new v(l), s), v.precision = d, t == null ? (ye = !0, fe(u, d)) : u;
    u = c, i += 2;
  }
}
function Rg(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = Rn(r / ve), e.d = [], n = (r + 1) % ve, r < 0 && (n += ve), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= ve; n < i; ) e.d.push(+t.slice(n, n += ve));
      t = t.slice(n), n = ve - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), ye && (e.e > Ha || e.e < -Ha)) throw Error(Rh + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function fe(e, t, r) {
  var n, i, a, o, u, c, s, f, l = e.d;
  for (o = 1, a = l[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += ve, i = t, s = l[f = 0];
  else {
    if (f = Math.ceil((n + 1) / ve), a = l.length, f >= a) return e;
    for (s = a = l[f], o = 1; a >= 10; a /= 10) o++;
    n %= ve, i = n - ve + o;
  }
  if (r !== void 0 && (a = hr(10, o - i - 1), u = s / a % 10 | 0, c = t < 0 || l[f + 1] !== void 0 || s % a, c = r < 4 ? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / hr(10, o - i) : 0 : l[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !l[0])
    return c ? (a = Oe(e), l.length = 1, t = t - a - 1, l[0] = hr(10, (ve - t % ve) % ve), e.e = Rn(-t / ve) || 0) : (l.length = 1, l[0] = e.e = e.s = 0), e;
  if (n == 0 ? (l.length = f, a = 1, f--) : (l.length = f + 1, a = hr(10, ve - n), l[f] = i > 0 ? (s / hr(10, o - i) % hr(10, i) | 0) * a : 0), c)
    for (; ; )
      if (f == 0) {
        (l[0] += a) == Te && (l[0] = 1, ++e.e);
        break;
      } else {
        if (l[f] += a, l[f] != Te) break;
        l[f--] = 0, a = 1;
      }
  for (n = l.length; l[--n] === 0; ) l.pop();
  if (ye && (e.e > Ha || e.e < -Ha))
    throw Error(Rh + Oe(e));
  return e;
}
function YO(e, t) {
  var r, n, i, a, o, u, c, s, f, l, p = e.constructor, h = p.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new p(e), ye ? fe(t, h) : t;
  if (c = e.d, l = t.d, n = t.e, s = e.e, c = c.slice(), o = s - n, o) {
    for (f = o < 0, f ? (r = c, o = -o, u = l.length) : (r = l, n = s, u = c.length), i = Math.max(Math.ceil(h / ve), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
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
  return c[0] ? (t.d = c, t.e = n, ye ? fe(t, h) : t) : new p(0);
}
function Sr(e, t, r) {
  var n, i = Oe(e), a = mt(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Kt(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Kt(-i - 1) + a, r && (n = r - o) > 0 && (a += Kt(n))) : i >= o ? (a += Kt(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Kt(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Kt(n))), e.s < 0 ? "-" + a : a;
}
function Dg(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function ZO(e) {
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
        throw Error(wr + a);
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
      return Rg(o, a.toString());
    } else if (typeof a != "string")
      throw Error(wr + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, U$.test(a)) Rg(o, a);
    else throw Error(wr + a);
  }
  if (i.prototype = H, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = ZO, i.config = i.set = H$, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function H$(e) {
  if (!e || typeof e != "object")
    throw Error(at + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    kn,
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
      if (Rn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(wr + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(wr + r + ": " + n);
  return this;
}
var Dh = ZO(K$);
Xe = new Dh(1);
const se = Dh;
function G$(e) {
  return Z$(e) || Y$(e) || X$(e) || V$();
}
function V$() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function X$(e, t) {
  if (e) {
    if (typeof e == "string") return Uf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Uf(e, t);
  }
}
function Y$(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function Z$(e) {
  if (Array.isArray(e)) return Uf(e);
}
function Uf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var J$ = function(t) {
  return t;
}, JO = {}, QO = function(t) {
  return t === JO;
}, Ng = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && QO(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, Q$ = function e(t, r) {
  return t === 1 ? r : Ng(function() {
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    var o = i.filter(function(u) {
      return u !== JO;
    }).length;
    return o >= t ? r.apply(void 0, i) : e(t - o, Ng(function() {
      for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
        c[s] = arguments[s];
      var f = i.map(function(l) {
        return QO(l) ? c.shift() : l;
      });
      return r.apply(void 0, G$(f).concat(c));
    }));
  });
}, Jo = function(t) {
  return Q$(t.length, t);
}, Hf = function(t, r) {
  for (var n = [], i = t; i < r; ++i)
    n[i - t] = i;
  return n;
}, eM = Jo(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), tM = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return J$;
  var i = r.reverse(), a = i[0], o = i.slice(1);
  return function() {
    return o.reduce(function(u, c) {
      return c(u);
    }, a.apply(void 0, arguments));
  };
}, Gf = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, ew = function(t) {
  var r = null, n = null;
  return function() {
    for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return r && a.every(function(u, c) {
      return u === r[c];
    }) || (r = a, n = t.apply(void 0, a)), n;
  };
};
function rM(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new se(e).abs().log(10).toNumber()) + 1, t;
}
function nM(e, t, r) {
  for (var n = new se(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var iM = Jo(function(e, t, r) {
  var n = +e, i = +t;
  return n + r * (i - n);
}), aM = Jo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), oM = Jo(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const Qo = {
  rangeStep: nM,
  getDigitCount: rM,
  interpolateNumber: iM,
  uninterpolateNumber: aM,
  uninterpolateTruncation: oM
};
function Vf(e) {
  return sM(e) || cM(e) || tw(e) || uM();
}
function uM() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cM(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e)) return Array.from(e);
}
function sM(e) {
  if (Array.isArray(e)) return Xf(e);
}
function Oi(e, t) {
  return pM(e) || fM(e, t) || tw(e, t) || lM();
}
function lM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tw(e, t) {
  if (e) {
    if (typeof e == "string") return Xf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xf(e, t);
  }
}
function Xf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function fM(e, t) {
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
function pM(e) {
  if (Array.isArray(e)) return e;
}
function rw(e) {
  var t = Oi(e, 2), r = t[0], n = t[1], i = r, a = n;
  return r > n && (i = n, a = r), [i, a];
}
function nw(e, t, r) {
  if (e.lte(0))
    return new se(0);
  var n = Qo.getDigitCount(e.toNumber()), i = new se(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, u = new se(Math.ceil(a.div(o).toNumber())).add(r).mul(o), c = u.mul(i);
  return t ? c : new se(Math.ceil(c));
}
function hM(e, t, r) {
  var n = 1, i = new se(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new se(10).pow(Qo.getDigitCount(e) - 1), i = new se(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new se(Math.floor(e)));
  } else e === 0 ? i = new se(Math.floor((t - 1) / 2)) : r || (i = new se(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = tM(eM(function(c) {
    return i.add(new se(c - o).mul(n)).toNumber();
  }), Hf);
  return u(0, t);
}
function iw(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new se(0),
      tickMin: new se(0),
      tickMax: new se(0)
    };
  var a = nw(new se(t).sub(e).div(r - 1), n, i), o;
  e <= 0 && t >= 0 ? o = new se(0) : (o = new se(e).add(t).div(2), o = o.sub(new se(o).mod(a)));
  var u = Math.ceil(o.sub(e).div(a).toNumber()), c = Math.ceil(new se(t).sub(o).div(a).toNumber()), s = u + c + 1;
  return s > r ? iw(e, t, r, n, i + 1) : (s < r && (c = t > 0 ? c + (r - s) : c, u = t > 0 ? u : u + (r - s)), {
    step: a,
    tickMin: o.sub(new se(u).mul(a)),
    tickMax: o.add(new se(c).mul(a))
  });
}
function dM(e) {
  var t = Oi(e, 2), r = t[0], n = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(i, 2), u = rw([r, n]), c = Oi(u, 2), s = c[0], f = c[1];
  if (s === -1 / 0 || f === 1 / 0) {
    var l = f === 1 / 0 ? [s].concat(Vf(Hf(0, i - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Vf(Hf(0, i - 1).map(function() {
      return -1 / 0;
    })), [f]);
    return r > n ? Gf(l) : l;
  }
  if (s === f)
    return hM(s, i, a);
  var p = iw(s, f, o, a), h = p.step, y = p.tickMin, v = p.tickMax, d = Qo.rangeStep(y, v.add(new se(0.1).mul(h)), h);
  return r > n ? Gf(d) : d;
}
function vM(e, t) {
  var r = Oi(e, 2), n = r[0], i = r[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = rw([n, i]), u = Oi(o, 2), c = u[0], s = u[1];
  if (c === -1 / 0 || s === 1 / 0)
    return [n, i];
  if (c === s)
    return [c];
  var f = Math.max(t, 2), l = nw(new se(s).sub(c).div(f - 1), a, 0), p = [].concat(Vf(Qo.rangeStep(new se(c), new se(s).sub(new se(0.99).mul(l)), l)), [s]);
  return n > i ? Gf(p) : p;
}
var yM = ew(dM), mM = ew(vM), gM = "Invariant failed";
function jr(e, t) {
  throw new Error(gM);
}
var bM = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function on(e) {
  "@babel/helpers - typeof";
  return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, on(e);
}
function Ga() {
  return Ga = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ga.apply(this, arguments);
}
function xM(e, t) {
  return _M(e) || AM(e, t) || wM(e, t) || OM();
}
function OM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function wM(e, t) {
  if (e) {
    if (typeof e == "string") return Lg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Lg(e, t);
  }
}
function Lg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function AM(e, t) {
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
function _M(e) {
  if (Array.isArray(e)) return e;
}
function PM(e, t) {
  if (e == null) return {};
  var r = SM(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function SM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function jM(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function EM(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, uw(n.key), n);
  }
}
function TM(e, t, r) {
  return t && EM(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $M(e, t, r) {
  return t = Va(t), MM(e, aw() ? Reflect.construct(t, r || [], Va(e).constructor) : t.apply(e, r));
}
function MM(e, t) {
  if (t && (on(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return IM(e);
}
function IM(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function aw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (aw = function() {
    return !!e;
  })();
}
function Va(e) {
  return Va = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Va(e);
}
function CM(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Yf(e, t);
}
function Yf(e, t) {
  return Yf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Yf(e, t);
}
function ow(e, t, r) {
  return t = uw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uw(e) {
  var t = kM(e, "string");
  return on(t) == "symbol" ? t : t + "";
}
function kM(e, t) {
  if (on(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (on(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Dn = /* @__PURE__ */ (function(e) {
  function t() {
    return jM(this, t), $M(this, t, arguments);
  }
  return CM(t, e), TM(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.offset, a = n.layout, o = n.width, u = n.dataKey, c = n.data, s = n.dataPointFormatter, f = n.xAxis, l = n.yAxis, p = PM(n, bM), h = W(p, !1);
      this.props.direction === "x" && f.type !== "number" && jr();
      var y = c.map(function(v) {
        var d = s(v, u), g = d.x, b = d.y, O = d.value, w = d.errorVal;
        if (!w)
          return null;
        var m = [], x, A;
        if (Array.isArray(w)) {
          var P = xM(w, 2);
          x = P[0], A = P[1];
        } else
          x = A = w;
        if (a === "vertical") {
          var S = f.scale, T = b + i, E = T + o, j = T - o, $ = S(O - x), I = S(O + A);
          m.push({
            x1: I,
            y1: E,
            x2: I,
            y2: j
          }), m.push({
            x1: $,
            y1: T,
            x2: I,
            y2: T
          }), m.push({
            x1: $,
            y1: E,
            x2: $,
            y2: j
          });
        } else if (a === "horizontal") {
          var M = l.scale, k = g + i, N = k - o, B = k + o, F = M(O - x), U = M(O + A);
          m.push({
            x1: N,
            y1: U,
            x2: B,
            y2: U
          }), m.push({
            x1: k,
            y1: F,
            x2: k,
            y2: U
          }), m.push({
            x1: N,
            y1: F,
            x2: B,
            y2: F
          });
        }
        return /* @__PURE__ */ _.createElement(J, Ga({
          className: "recharts-errorBar",
          key: "bar-".concat(m.map(function(Z) {
            return "".concat(Z.x1, "-").concat(Z.x2, "-").concat(Z.y1, "-").concat(Z.y2);
          }))
        }, h), m.map(function(Z) {
          return /* @__PURE__ */ _.createElement("line", Ga({}, Z, {
            key: "line-".concat(Z.x1, "-").concat(Z.x2, "-").concat(Z.y1, "-").concat(Z.y2)
          }));
        }));
      });
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-errorBars"
      }, y);
    }
  }]);
})(_.Component);
ow(Dn, "defaultProps", {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
});
ow(Dn, "displayName", "ErrorBar");
function wi(e) {
  "@babel/helpers - typeof";
  return wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wi(e);
}
function qg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qg(Object(r), !0).forEach(function(n) {
      RM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RM(e, t, r) {
  return t = DM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DM(e) {
  var t = NM(e, "string");
  return wi(t) == "symbol" ? t : t + "";
}
function NM(e, t) {
  if (wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var cw = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, i = t.legendWidth, a = t.legendContent, o = Ve(r, xr);
  if (!o)
    return null;
  var u = xr.defaultProps, c = u !== void 0 ? sr(sr({}, u), o.props) : {}, s;
  return o.props && o.props.payload ? s = o.props && o.props.payload : a === "children" ? s = (n || []).reduce(function(f, l) {
    var p = l.item, h = l.props, y = h.sectors || h.data || [];
    return f.concat(y.map(function(v) {
      return {
        type: o.props.iconType || p.props.legendType,
        value: v.name,
        color: v.fill,
        payload: v
      };
    }));
  }, []) : s = (n || []).map(function(f) {
    var l = f.item, p = l.type.defaultProps, h = p !== void 0 ? sr(sr({}, p), l.props) : {}, y = h.dataKey, v = h.name, d = h.legendType, g = h.hide;
    return {
      inactive: g,
      dataKey: y,
      type: c.iconType || d || "square",
      color: Nh(l),
      value: v || y,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: h
    };
  }), sr(sr(sr({}, c), xr.getWithHeight(o, i)), {}, {
    payload: s,
    item: o
  });
};
function Ai(e) {
  "@babel/helpers - typeof";
  return Ai = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ai(e);
}
function Bg(e) {
  return FM(e) || BM(e) || qM(e) || LM();
}
function LM() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qM(e, t) {
  if (e) {
    if (typeof e == "string") return Zf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zf(e, t);
  }
}
function BM(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function FM(e) {
  if (Array.isArray(e)) return Zf(e);
}
function Zf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
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
function ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fg(Object(r), !0).forEach(function(n) {
      Yr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Yr(e, t, r) {
  return t = zM(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zM(e) {
  var t = WM(e, "string");
  return Ai(t) == "symbol" ? t : t + "";
}
function WM(e, t) {
  if (Ai(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ai(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function le(e, t, r) {
  return V(e) || V(t) ? r : Se(t) ? Ye(e, t, r) : G(t) ? t(e) : r;
}
function ti(e, t, r, n) {
  var i = F$(e, function(u) {
    return le(u, t);
  });
  if (r === "number") {
    var a = i.filter(function(u) {
      return q(u) || parseFloat(u);
    });
    return a.length ? [Zo(a), Ht(a)] : [1 / 0, -1 / 0];
  }
  var o = n ? i.filter(function(u) {
    return !V(u);
  }) : i;
  return o.map(function(u) {
    return Se(u) || u instanceof Date ? u : "";
  });
}
var KM = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], i = arguments.length > 2 ? arguments[2] : void 0, a = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1)
    return 0;
  if (a && a.axisType === "angleAxis" && Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6)
    for (var c = a.range, s = 0; s < u; s++) {
      var f = s > 0 ? i[s - 1].coordinate : i[u - 1].coordinate, l = i[s].coordinate, p = s >= u - 1 ? i[0].coordinate : i[s + 1].coordinate, h = void 0;
      if (Me(l - f) !== Me(p - l)) {
        var y = [];
        if (Me(p - l) === Me(c[1] - c[0])) {
          h = p;
          var v = l + c[1] - c[0];
          y[0] = Math.min(v, (v + f) / 2), y[1] = Math.max(v, (v + f) / 2);
        } else {
          h = f;
          var d = p + c[1] - c[0];
          y[0] = Math.min(l, (d + l) / 2), y[1] = Math.max(l, (d + l) / 2);
        }
        var g = [Math.min(l, (h + l) / 2), Math.max(l, (h + l) / 2)];
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
}, Nh = function(t) {
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
}, UM = function(t) {
  var r = t.barSize, n = t.totalSize, i = t.stackGroups, a = i === void 0 ? {} : i;
  if (!a)
    return {};
  for (var o = {}, u = Object.keys(a), c = 0, s = u.length; c < s; c++)
    for (var f = a[u[c]].stackGroups, l = Object.keys(f), p = 0, h = l.length; p < h; p++) {
      var y = f[l[p]], v = y.items, d = y.cateAxisId, g = v.filter(function(A) {
        return It(A.type).indexOf("Bar") >= 0;
      });
      if (g && g.length) {
        var b = g[0].type.defaultProps, O = b !== void 0 ? ge(ge({}, b), g[0].props) : g[0].props, w = O.barSize, m = O[d];
        o[m] || (o[m] = []);
        var x = V(w) ? r : w;
        o[m].push({
          item: g[0],
          stackList: g.slice(1),
          barSize: V(x) ? void 0 : Le(x, n, 0)
        });
      }
    }
  return o;
}, HM = function(t) {
  var r = t.barGap, n = t.barCategoryGap, i = t.bandSize, a = t.sizeList, o = a === void 0 ? [] : a, u = t.maxBarSize, c = o.length;
  if (c < 1) return null;
  var s = Le(r, i, 0, !0), f, l = [];
  if (o[0].barSize === +o[0].barSize) {
    var p = !1, h = i / c, y = o.reduce(function(w, m) {
      return w + m.barSize || 0;
    }, 0);
    y += (c - 1) * s, y >= i && (y -= (c - 1) * s, s = 0), y >= i && h > 0 && (p = !0, h *= 0.9, y = c * h);
    var v = (i - y) / 2 >> 0, d = {
      offset: v - s,
      size: 0
    };
    f = o.reduce(function(w, m) {
      var x = {
        item: m.item,
        position: {
          offset: d.offset + d.size + s,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: p ? h : m.barSize
        }
      }, A = [].concat(Bg(w), [x]);
      return d = A[A.length - 1].position, m.stackList && m.stackList.length && m.stackList.forEach(function(P) {
        A.push({
          item: P,
          position: d
        });
      }), A;
    }, l);
  } else {
    var g = Le(n, i, 0, !0);
    i - 2 * g - (c - 1) * s <= 0 && (s = 0);
    var b = (i - 2 * g - (c - 1) * s) / c;
    b > 1 && (b >>= 0);
    var O = u === +u ? Math.min(b, u) : b;
    f = o.reduce(function(w, m, x) {
      var A = [].concat(Bg(w), [{
        item: m.item,
        position: {
          offset: g + (b + s) * x + (b - O) / 2,
          size: O
        }
      }]);
      return m.stackList && m.stackList.length && m.stackList.forEach(function(P) {
        A.push({
          item: P,
          position: A[A.length - 1].position
        });
      }), A;
    }, l);
  }
  return f;
}, GM = function(t, r, n, i) {
  var a = n.children, o = n.width, u = n.margin, c = o - (u.left || 0) - (u.right || 0), s = cw({
    children: a,
    legendWidth: c
  });
  if (s) {
    var f = i || {}, l = f.width, p = f.height, h = s.align, y = s.verticalAlign, v = s.layout;
    if ((v === "vertical" || v === "horizontal" && y === "middle") && h !== "center" && q(t[h]))
      return ge(ge({}, t), {}, Yr({}, h, t[h] + (l || 0)));
    if ((v === "horizontal" || v === "vertical" && h === "center") && y !== "middle" && q(t[y]))
      return ge(ge({}, t), {}, Yr({}, y, t[y] + (p || 0)));
  }
  return t;
}, VM = function(t, r, n) {
  return V(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, sw = function(t, r, n, i, a) {
  var o = r.props.children, u = De(o, Dn).filter(function(s) {
    return VM(i, a, s.props.direction);
  });
  if (u && u.length) {
    var c = u.map(function(s) {
      return s.props.dataKey;
    });
    return t.reduce(function(s, f) {
      var l = le(f, n);
      if (V(l)) return s;
      var p = Array.isArray(l) ? [Zo(l), Ht(l)] : [l, l], h = c.reduce(function(y, v) {
        var d = le(f, v, 0), g = p[0] - Math.abs(Array.isArray(d) ? d[0] : d), b = p[1] + Math.abs(Array.isArray(d) ? d[1] : d);
        return [Math.min(g, y[0]), Math.max(b, y[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(h[0], s[0]), Math.max(h[1], s[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, XM = function(t, r, n, i, a) {
  var o = r.map(function(u) {
    return sw(t, u, n, a, i);
  }).filter(function(u) {
    return !V(u);
  });
  return o && o.length ? o.reduce(function(u, c) {
    return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
  }, [1 / 0, -1 / 0]) : null;
}, lw = function(t, r, n, i, a) {
  var o = r.map(function(c) {
    var s = c.props.dataKey;
    return n === "number" && s && sw(t, c, s, i) || ti(t, s, n, a);
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
}, fw = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, pw = function(t, r, n, i) {
  if (i)
    return t.map(function(c) {
      return c.coordinate;
    });
  var a, o, u = t.map(function(c) {
    return c.coordinate === r && (a = !0), c.coordinate === n && (o = !0), c.coordinate;
  });
  return a || u.push(r), o || u.push(n), u;
}, Mt = function(t, r, n) {
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
      return !Mn(l.coordinate);
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
}, Rl = /* @__PURE__ */ new WeakMap(), ya = function(t, r) {
  if (typeof r != "function")
    return t;
  Rl.has(t) || Rl.set(t, /* @__PURE__ */ new WeakMap());
  var n = Rl.get(t);
  if (n.has(r))
    return n.get(r);
  var i = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, i), i;
}, hw = function(t, r, n) {
  var i = t.scale, a = t.type, o = t.layout, u = t.axisType;
  if (i === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: vi(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: za(),
      realScaleType: "linear"
    } : a === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: ei(),
      realScaleType: "point"
    } : a === "category" ? {
      scale: vi(),
      realScaleType: "band"
    } : {
      scale: za(),
      realScaleType: "linear"
    };
  if (_r(i)) {
    var c = "scale".concat(Do(i));
    return {
      scale: (Sg[c] || ei)(),
      realScaleType: Sg[c] ? c : "point"
    };
  }
  return G(i) ? {
    scale: i
  } : {
    scale: ei(),
    realScaleType: "point"
  };
}, zg = 1e-4, dw = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, i = t.range(), a = Math.min(i[0], i[1]) - zg, o = Math.max(i[0], i[1]) + zg, u = t(r[0]), c = t(r[n - 1]);
    (u < a || u > o || c < a || c > o) && t.domain([r[0], r[n - 1]]);
  }
}, vw = function(t, r) {
  if (!t)
    return null;
  for (var n = 0, i = t.length; n < i; n++)
    if (t[n].item === r)
      return t[n].position;
  return null;
}, yw = function(t, r) {
  if (!r || r.length !== 2 || !q(r[0]) || !q(r[1]))
    return t;
  var n = Math.min(r[0], r[1]), i = Math.max(r[0], r[1]), a = [t[0], t[1]];
  return (!q(t[0]) || t[0] < n) && (a[0] = n), (!q(t[1]) || t[1] > i) && (a[1] = i), a[0] > i && (a[0] = i), a[1] < n && (a[1] = n), a;
}, YM = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0, u = 0; u < r; ++u) {
        var c = Mn(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        c >= 0 ? (t[u][n][0] = a, t[u][n][1] = a + c, a = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + c, o = t[u][n][1]);
      }
}, ZM = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, i = t[0].length; n < i; ++n)
      for (var a = 0, o = 0; o < r; ++o) {
        var u = Mn(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = a, t[o][n][1] = a + u, a = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, JM = {
  sign: YM,
  // @ts-expect-error definitelytyped types are incorrect
  expand: BP,
  // @ts-expect-error definitelytyped types are incorrect
  none: Zr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: FP,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: zP,
  positive: ZM
}, QM = function(t, r, n) {
  var i = r.map(function(u) {
    return u.props.dataKey;
  }), a = JM[n], o = qP().keys(i).value(function(u, c) {
    return +le(u, c, 0);
  }).order(jf).offset(a);
  return o(t);
}, eI = function(t, r, n, i, a, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, c = {}, s = u.reduce(function(l, p) {
    var h, y = (h = p.type) !== null && h !== void 0 && h.defaultProps ? ge(ge({}, p.type.defaultProps), p.props) : p.props, v = y.stackId, d = y.hide;
    if (d)
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
      b.stackGroups[Qt("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: i,
        items: [p]
      };
    return ge(ge({}, l), {}, Yr({}, g, b));
  }, c), f = {};
  return Object.keys(s).reduce(function(l, p) {
    var h = s[p];
    if (h.hasStack) {
      var y = {};
      h.stackGroups = Object.keys(h.stackGroups).reduce(function(v, d) {
        var g = h.stackGroups[d];
        return ge(ge({}, v), {}, Yr({}, d, {
          numericAxisId: n,
          cateAxisId: i,
          items: g.items,
          stackedData: QM(t, g.items, a)
        }));
      }, y);
    }
    return ge(ge({}, l), {}, Yr({}, p, h));
  }, f);
}, mw = function(t, r) {
  var n = r.realScaleType, i = r.type, a = r.tickCount, o = r.originalDomain, u = r.allowDecimals, c = n || r.scale;
  if (c !== "auto" && c !== "linear")
    return null;
  if (a && i === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var s = t.domain();
    if (!s.length)
      return null;
    var f = yM(s, a, u);
    return t.domain([Zo(f), Ht(f)]), {
      niceTicks: f
    };
  }
  if (a && i === "number") {
    var l = t.domain(), p = mM(l, a, u);
    return {
      niceTicks: p
    };
  }
  return null;
};
function un(e) {
  var t = e.axis, r = e.ticks, n = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !V(i[t.dataKey])) {
      var u = Aa(r, "value", i[t.dataKey]);
      if (u)
        return u.coordinate + n / 2;
    }
    return r[a] ? r[a].coordinate + n / 2 : null;
  }
  var c = le(i, V(o) ? t.dataKey : o);
  return V(c) ? null : t.scale(c);
}
var Xa = function(t) {
  var r = t.axis, n = t.ticks, i = t.offset, a = t.bandSize, o = t.entry, u = t.index;
  if (r.type === "category")
    return n[u] ? n[u].coordinate + i : null;
  var c = le(o, r.dataKey, r.domain[u]);
  return V(c) ? null : r.scale(c) - a / 2 + i;
}, gw = function(t) {
  var r = t.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var i = Math.min(n[0], n[1]), a = Math.max(n[0], n[1]);
    return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i;
  }
  return n[0];
}, tI = function(t, r) {
  var n, i = (n = t.type) !== null && n !== void 0 && n.defaultProps ? ge(ge({}, t.type.defaultProps), t.props) : t.props, a = i.stackId;
  if (Se(a)) {
    var o = r[a];
    if (o) {
      var u = o.items.indexOf(t);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, rI = function(t) {
  return t.reduce(function(r, n) {
    return [Zo(n.concat([r[0]]).filter(q)), Ht(n.concat([r[1]]).filter(q))];
  }, [1 / 0, -1 / 0]);
}, bw = function(t, r, n) {
  return Object.keys(t).reduce(function(i, a) {
    var o = t[a], u = o.stackedData, c = u.reduce(function(s, f) {
      var l = rI(f.slice(r, n + 1));
      return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(c[0], i[0]), Math.max(c[1], i[1])];
  }, [1 / 0, -1 / 0]).map(function(i) {
    return i === 1 / 0 || i === -1 / 0 ? 0 : i;
  });
}, Wg = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Kg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Jf = function(t, r, n) {
  if (G(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var i = [];
  if (q(t[0]))
    i[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (Wg.test(t[0])) {
    var a = +Wg.exec(t[0])[1];
    i[0] = r[0] - a;
  } else G(t[0]) ? i[0] = t[0](r[0]) : i[0] = r[0];
  if (q(t[1]))
    i[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (Kg.test(t[1])) {
    var o = +Kg.exec(t[1])[1];
    i[1] = r[1] + o;
  } else G(t[1]) ? i[1] = t[1](r[1]) : i[1] = r[1];
  return i;
}, Ya = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var i = t.scale.bandwidth();
    if (!n || i > 0)
      return i;
  }
  if (t && r && r.length >= 2) {
    for (var a = fh(r, function(l) {
      return l.coordinate;
    }), o = 1 / 0, u = 1, c = a.length; u < c; u++) {
      var s = a[u], f = a[u - 1];
      o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, Ug = function(t, r, n) {
  return !t || !t.length || wt(t, Ye(n, "type.defaultProps.domain")) ? r : t;
}, Lh = function(t, r) {
  var n = t.type.defaultProps ? ge(ge({}, t.type.defaultProps), t.props) : t.props, i = n.dataKey, a = n.name, o = n.unit, u = n.formatter, c = n.tooltipType, s = n.chartType, f = n.hide;
  return ge(ge({}, W(t, !1)), {}, {
    dataKey: i,
    unit: o,
    formatter: u,
    name: a || i,
    color: Nh(t),
    value: le(r, i),
    type: c,
    payload: r,
    chartType: s,
    hide: f
  });
};
function _i(e) {
  "@babel/helpers - typeof";
  return _i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _i(e);
}
function Hg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hg(Object(r), !0).forEach(function(n) {
      xw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xw(e, t, r) {
  return t = nI(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nI(e) {
  var t = iI(e, "string");
  return _i(t) == "symbol" ? t : t + "";
}
function iI(e, t) {
  if (_i(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_i(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function aI(e, t) {
  return sI(e) || cI(e, t) || uI(e, t) || oI();
}
function oI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function uI(e, t) {
  if (e) {
    if (typeof e == "string") return Gg(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Gg(e, t);
  }
}
function Gg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function cI(e, t) {
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
function sI(e) {
  if (Array.isArray(e)) return e;
}
var Za = Math.PI / 180, lI = function(t) {
  return t * 180 / Math.PI;
}, ne = function(t, r, n, i) {
  return {
    x: t + Math.cos(-Za * i) * n,
    y: r + Math.sin(-Za * i) * n
  };
}, Ow = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, qh = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.startAngle, s = t.endAngle, f = Le(t.cx, o, o / 2), l = Le(t.cy, u, u / 2), p = Ow(o, u, n), h = Le(t.innerRadius, p, 0), y = Le(t.outerRadius, p, p * 0.8), v = Object.keys(r);
  return v.reduce(function(d, g) {
    var b = r[g], O = b.domain, w = b.reversed, m;
    if (V(b.range))
      i === "angleAxis" ? m = [c, s] : i === "radiusAxis" && (m = [h, y]), w && (m = [m[1], m[0]]);
    else {
      m = b.range;
      var x = m, A = aI(x, 2);
      c = A[0], s = A[1];
    }
    var P = hw(b, a), S = P.realScaleType, T = P.scale;
    T.domain(O).range(m), dw(T);
    var E = mw(T, jt(jt({}, b), {}, {
      realScaleType: S
    })), j = jt(jt(jt({}, b), E), {}, {
      range: m,
      radius: y,
      realScaleType: S,
      scale: T,
      cx: f,
      cy: l,
      innerRadius: h,
      outerRadius: y,
      startAngle: c,
      endAngle: s
    });
    return jt(jt({}, d), {}, xw({}, g, j));
  }, {});
}, fI = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2));
}, pI = function(t, r) {
  var n = t.x, i = t.y, a = r.cx, o = r.cy, u = fI({
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
    angle: lI(s),
    angleInRadian: s
  };
}, hI = function(t) {
  var r = t.startAngle, n = t.endAngle, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, dI = function(t, r) {
  var n = r.startAngle, i = r.endAngle, a = Math.floor(n / 360), o = Math.floor(i / 360), u = Math.min(a, o);
  return t + u * 360;
}, Vg = function(t, r) {
  var n = t.x, i = t.y, a = pI({
    x: n,
    y: i
  }, r), o = a.radius, u = a.angle, c = r.innerRadius, s = r.outerRadius;
  if (o < c || o > s)
    return !1;
  if (o === 0)
    return !0;
  var f = hI(r), l = f.startAngle, p = f.endAngle, h = u, y;
  if (l <= p) {
    for (; h > p; )
      h -= 360;
    for (; h < l; )
      h += 360;
    y = h >= l && h <= p;
  } else {
    for (; h > l; )
      h -= 360;
    for (; h < p; )
      h += 360;
    y = h >= p && h <= l;
  }
  return y ? jt(jt({}, r), {}, {
    radius: o,
    angle: dI(h, r)
  }) : null;
}, ww = function(t) {
  return !/* @__PURE__ */ R.isValidElement(t) && !G(t) && typeof t != "boolean" ? t.className : "";
};
function Pi(e) {
  "@babel/helpers - typeof";
  return Pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pi(e);
}
var vI = ["offset"];
function yI(e) {
  return xI(e) || bI(e) || gI(e) || mI();
}
function mI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gI(e, t) {
  if (e) {
    if (typeof e == "string") return Qf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qf(e, t);
  }
}
function bI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function xI(e) {
  if (Array.isArray(e)) return Qf(e);
}
function Qf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function OI(e, t) {
  if (e == null) return {};
  var r = wI(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function wI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Xg(e, t) {
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
    t % 2 ? Xg(Object(r), !0).forEach(function(n) {
      AI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function AI(e, t, r) {
  return t = _I(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _I(e) {
  var t = PI(e, "string");
  return Pi(t) == "symbol" ? t : t + "";
}
function PI(e, t) {
  if (Pi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Si() {
  return Si = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Si.apply(this, arguments);
}
var SI = function(t) {
  var r = t.value, n = t.formatter, i = V(t.children) ? r : t.children;
  return G(n) ? n(i) : i;
}, jI = function(t, r) {
  var n = Me(r - t), i = Math.min(Math.abs(r - t), 360);
  return n * i;
}, EI = function(t, r, n) {
  var i = t.position, a = t.viewBox, o = t.offset, u = t.className, c = a, s = c.cx, f = c.cy, l = c.innerRadius, p = c.outerRadius, h = c.startAngle, y = c.endAngle, v = c.clockWise, d = (l + p) / 2, g = jI(h, y), b = g >= 0 ? 1 : -1, O, w;
  i === "insideStart" ? (O = h + b * o, w = v) : i === "insideEnd" ? (O = y - b * o, w = !v) : i === "end" && (O = y + b * o, w = v), w = g <= 0 ? w : !w;
  var m = ne(s, f, d, O), x = ne(s, f, d, O + (w ? 1 : -1) * 359), A = "M".concat(m.x, ",").concat(m.y, `
    A`).concat(d, ",").concat(d, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(x.x, ",").concat(x.y), P = V(t.id) ? Qt("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ _.createElement("text", Si({}, n, {
    dominantBaseline: "central",
    className: Y("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("path", {
    id: P,
    d: A
  })), /* @__PURE__ */ _.createElement("textPath", {
    xlinkHref: "#".concat(P)
  }, r));
}, TI = function(t) {
  var r = t.viewBox, n = t.offset, i = t.position, a = r, o = a.cx, u = a.cy, c = a.innerRadius, s = a.outerRadius, f = a.startAngle, l = a.endAngle, p = (f + l) / 2;
  if (i === "outside") {
    var h = ne(o, u, s + n, p), y = h.x, v = h.y;
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
  var d = (c + s) / 2, g = ne(o, u, d, p), b = g.x, O = g.y;
  return {
    x: b,
    y: O,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, $I = function(t) {
  var r = t.viewBox, n = t.parentViewBox, i = t.offset, a = t.position, o = r, u = o.x, c = o.y, s = o.width, f = o.height, l = f >= 0 ? 1 : -1, p = l * i, h = l > 0 ? "end" : "start", y = l > 0 ? "start" : "end", v = s >= 0 ? 1 : -1, d = v * i, g = v > 0 ? "end" : "start", b = v > 0 ? "start" : "end";
  if (a === "top") {
    var O = {
      x: u + s / 2,
      y: c - l * i,
      textAnchor: "middle",
      verticalAnchor: h
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
      x: u - d,
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
      x: u + s + d,
      y: c + f / 2,
      textAnchor: b,
      verticalAnchor: "middle"
    };
    return Pe(Pe({}, x), n ? {
      width: Math.max(n.x + n.width - x.x, 0),
      height: f
    } : {});
  }
  var A = n ? {
    width: s,
    height: f
  } : {};
  return a === "insideLeft" ? Pe({
    x: u + d,
    y: c + f / 2,
    textAnchor: b,
    verticalAnchor: "middle"
  }, A) : a === "insideRight" ? Pe({
    x: u + s - d,
    y: c + f / 2,
    textAnchor: g,
    verticalAnchor: "middle"
  }, A) : a === "insideTop" ? Pe({
    x: u + s / 2,
    y: c + p,
    textAnchor: "middle",
    verticalAnchor: y
  }, A) : a === "insideBottom" ? Pe({
    x: u + s / 2,
    y: c + f - p,
    textAnchor: "middle",
    verticalAnchor: h
  }, A) : a === "insideTopLeft" ? Pe({
    x: u + d,
    y: c + p,
    textAnchor: b,
    verticalAnchor: y
  }, A) : a === "insideTopRight" ? Pe({
    x: u + s - d,
    y: c + p,
    textAnchor: g,
    verticalAnchor: y
  }, A) : a === "insideBottomLeft" ? Pe({
    x: u + d,
    y: c + f - p,
    textAnchor: b,
    verticalAnchor: h
  }, A) : a === "insideBottomRight" ? Pe({
    x: u + s - d,
    y: c + f - p,
    textAnchor: g,
    verticalAnchor: h
  }, A) : $n(a) && (q(a.x) || vr(a.x)) && (q(a.y) || vr(a.y)) ? Pe({
    x: u + Le(a.x, s),
    y: c + Le(a.y, f),
    textAnchor: "end",
    verticalAnchor: "end"
  }, A) : Pe({
    x: u + s / 2,
    y: c + f / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, A);
}, MI = function(t) {
  return "cx" in t && q(t.cx);
};
function $e(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = OI(e, vI), i = Pe({
    offset: r
  }, n), a = i.viewBox, o = i.position, u = i.value, c = i.children, s = i.content, f = i.className, l = f === void 0 ? "" : f, p = i.textBreakAll;
  if (!a || V(u) && V(c) && !/* @__PURE__ */ R.isValidElement(s) && !G(s))
    return null;
  if (/* @__PURE__ */ R.isValidElement(s))
    return /* @__PURE__ */ R.cloneElement(s, i);
  var h;
  if (G(s)) {
    if (h = /* @__PURE__ */ R.createElement(s, i), /* @__PURE__ */ R.isValidElement(h))
      return h;
  } else
    h = SI(i);
  var y = MI(a), v = W(i, !0);
  if (y && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return EI(i, h, v);
  var d = y ? TI(i) : $I(i);
  return /* @__PURE__ */ _.createElement(Pr, Si({
    className: Y("recharts-label", l)
  }, v, d, {
    breakAll: p
  }), h);
}
$e.displayName = "Label";
var Aw = function(t) {
  var r = t.cx, n = t.cy, i = t.angle, a = t.startAngle, o = t.endAngle, u = t.r, c = t.radius, s = t.innerRadius, f = t.outerRadius, l = t.x, p = t.y, h = t.top, y = t.left, v = t.width, d = t.height, g = t.clockWise, b = t.labelViewBox;
  if (b)
    return b;
  if (q(v) && q(d)) {
    if (q(l) && q(p))
      return {
        x: l,
        y: p,
        width: v,
        height: d
      };
    if (q(h) && q(y))
      return {
        x: h,
        y,
        width: v,
        height: d
      };
  }
  return q(l) && q(p) ? {
    x: l,
    y: p,
    width: 0,
    height: 0
  } : q(r) && q(n) ? {
    cx: r,
    cy: n,
    startAngle: a || i || 0,
    endAngle: o || i || 0,
    innerRadius: s || 0,
    outerRadius: f || c || u || 0,
    clockWise: g
  } : t.viewBox ? t.viewBox : {};
}, II = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ _.createElement($e, {
    key: "label-implicit",
    viewBox: r
  }) : Se(t) ? /* @__PURE__ */ _.createElement($e, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ R.isValidElement(t) ? t.type === $e ? /* @__PURE__ */ R.cloneElement(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ _.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : G(t) ? /* @__PURE__ */ _.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : $n(t) ? /* @__PURE__ */ _.createElement($e, Si({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, CI = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var i = t.children, a = Aw(t), o = De(i, $e).map(function(c, s) {
    return /* @__PURE__ */ R.cloneElement(c, {
      viewBox: r || a,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(s)
    });
  });
  if (!n)
    return o;
  var u = II(t.label, r || a);
  return [u].concat(yI(o));
};
$e.parseViewBox = Aw;
$e.renderCallByParent = CI;
var Dl, Yg;
function kI() {
  if (Yg) return Dl;
  Yg = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return Dl = e, Dl;
}
var RI = kI();
const _w = /* @__PURE__ */ ce(RI);
function ji(e) {
  "@babel/helpers - typeof";
  return ji = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ji(e);
}
var DI = ["valueAccessor"], NI = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function LI(e) {
  return zI(e) || FI(e) || BI(e) || qI();
}
function qI() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function BI(e, t) {
  if (e) {
    if (typeof e == "string") return ep(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ep(e, t);
  }
}
function FI(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function zI(e) {
  if (Array.isArray(e)) return ep(e);
}
function ep(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Ja() {
  return Ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ja.apply(this, arguments);
}
function Zg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zg(Object(r), !0).forEach(function(n) {
      WI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function WI(e, t, r) {
  return t = KI(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KI(e) {
  var t = UI(e, "string");
  return ji(t) == "symbol" ? t : t + "";
}
function UI(e, t) {
  if (ji(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ji(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Qg(e, t) {
  if (e == null) return {};
  var r = HI(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function HI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var GI = function(t) {
  return Array.isArray(t.value) ? _w(t.value) : t.value;
};
function Ze(e) {
  var t = e.valueAccessor, r = t === void 0 ? GI : t, n = Qg(e, DI), i = n.data, a = n.dataKey, o = n.clockWise, u = n.id, c = n.textBreakAll, s = Qg(n, NI);
  return !i || !i.length ? null : /* @__PURE__ */ _.createElement(J, {
    className: "recharts-label-list"
  }, i.map(function(f, l) {
    var p = V(a) ? r(f, l) : le(f && f.payload, a), h = V(u) ? {} : {
      id: "".concat(u, "-").concat(l)
    };
    return /* @__PURE__ */ _.createElement($e, Ja({}, W(f, !0), s, h, {
      parentViewBox: f.parentViewBox,
      value: p,
      textBreakAll: c,
      viewBox: $e.parseViewBox(V(o) ? f : Jg(Jg({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(l),
      index: l
    }));
  }));
}
Ze.displayName = "LabelList";
function VI(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ _.createElement(Ze, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ _.isValidElement(e) || G(e) ? /* @__PURE__ */ _.createElement(Ze, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : $n(e) ? /* @__PURE__ */ _.createElement(Ze, Ja({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function XI(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, i = De(n, Ze).map(function(o, u) {
    return /* @__PURE__ */ R.cloneElement(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(u)
    });
  });
  if (!r)
    return i;
  var a = VI(e.label, t);
  return [a].concat(LI(i));
}
Ze.renderCallByParent = XI;
function Ei(e) {
  "@babel/helpers - typeof";
  return Ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ei(e);
}
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
function eb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eb(Object(r), !0).forEach(function(n) {
      YI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function YI(e, t, r) {
  return t = ZI(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZI(e) {
  var t = JI(e, "string");
  return Ei(t) == "symbol" ? t : t + "";
}
function JI(e, t) {
  if (Ei(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ei(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QI = function(t, r) {
  var n = Me(r - t), i = Math.min(Math.abs(r - t), 359.999);
  return n * i;
}, ma = function(t) {
  var r = t.cx, n = t.cy, i = t.radius, a = t.angle, o = t.sign, u = t.isExternal, c = t.cornerRadius, s = t.cornerIsExternal, f = c * (u ? 1 : -1) + i, l = Math.asin(c / f) / Za, p = s ? a : a + o * l, h = ne(r, n, f, p), y = ne(r, n, i, p), v = s ? a - o * l : a, d = ne(r, n, f * Math.cos(l * Za), v);
  return {
    center: h,
    circleTangency: y,
    lineTangency: d,
    theta: l
  };
}, Pw = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.startAngle, u = t.endAngle, c = QI(o, u), s = o + c, f = ne(r, n, a, o), l = ne(r, n, a, s), p = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(a, ",").concat(a, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
  if (i > 0) {
    var h = ne(r, n, i, o), y = ne(r, n, i, s);
    p += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(i, ",").concat(i, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(h.x, ",").concat(h.y, " Z");
  } else
    p += "L ".concat(r, ",").concat(n, " Z");
  return p;
}, eC = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, c = t.cornerIsExternal, s = t.startAngle, f = t.endAngle, l = Me(f - s), p = ma({
    cx: r,
    cy: n,
    radius: a,
    angle: s,
    sign: l,
    cornerRadius: o,
    cornerIsExternal: c
  }), h = p.circleTangency, y = p.lineTangency, v = p.theta, d = ma({
    cx: r,
    cy: n,
    radius: a,
    angle: f,
    sign: -l,
    cornerRadius: o,
    cornerIsExternal: c
  }), g = d.circleTangency, b = d.lineTangency, O = d.theta, w = c ? Math.abs(s - f) : Math.abs(s - f) - v - O;
  if (w < 0)
    return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : Pw({
      cx: r,
      cy: n,
      innerRadius: i,
      outerRadius: a,
      startAngle: s,
      endAngle: f
    });
  var m = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(a, ",").concat(a, ",0,").concat(+(w > 180), ",").concat(+(l < 0), ",").concat(g.x, ",").concat(g.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(b.x, ",").concat(b.y, `
  `);
  if (i > 0) {
    var x = ma({
      cx: r,
      cy: n,
      radius: i,
      angle: s,
      sign: l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), A = x.circleTangency, P = x.lineTangency, S = x.theta, T = ma({
      cx: r,
      cy: n,
      radius: i,
      angle: f,
      sign: -l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), E = T.circleTangency, j = T.lineTangency, $ = T.theta, I = c ? Math.abs(s - f) : Math.abs(s - f) - S - $;
    if (I < 0 && o === 0)
      return "".concat(m, "L").concat(r, ",").concat(n, "Z");
    m += "L".concat(j.x, ",").concat(j.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(E.x, ",").concat(E.y, `
      A`).concat(i, ",").concat(i, ",0,").concat(+(I > 180), ",").concat(+(l > 0), ",").concat(A.x, ",").concat(A.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(P.x, ",").concat(P.y, "Z");
  } else
    m += "L".concat(r, ",").concat(n, "Z");
  return m;
}, tC = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, Sw = function(t) {
  var r = tb(tb({}, tC), t), n = r.cx, i = r.cy, a = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, c = r.forceCornerRadius, s = r.cornerIsExternal, f = r.startAngle, l = r.endAngle, p = r.className;
  if (o < a || f === l)
    return null;
  var h = Y("recharts-sector", p), y = o - a, v = Le(u, y, 0, !0), d;
  return v > 0 && Math.abs(f - l) < 360 ? d = eC({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    cornerRadius: Math.min(v, y / 2),
    forceCornerRadius: c,
    cornerIsExternal: s,
    startAngle: f,
    endAngle: l
  }) : d = Pw({
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    startAngle: f,
    endAngle: l
  }), /* @__PURE__ */ _.createElement("path", tp({}, W(r, !0), {
    className: h,
    d,
    role: "img"
  }));
};
function Ti(e) {
  "@babel/helpers - typeof";
  return Ti = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ti(e);
}
function rp() {
  return rp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rp.apply(this, arguments);
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
      rC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function rC(e, t, r) {
  return t = nC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nC(e) {
  var t = iC(e, "string");
  return Ti(t) == "symbol" ? t : t + "";
}
function iC(e, t) {
  if (Ti(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ti(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ib = {
  curveBasisClosed: EP,
  curveBasisOpen: TP,
  curveBasis: jP,
  curveBumpX: hP,
  curveBumpY: dP,
  curveLinearClosed: $P,
  curveLinear: Lo,
  curveMonotoneX: MP,
  curveMonotoneY: IP,
  curveNatural: CP,
  curveStep: kP,
  curveStepAfter: DP,
  curveStepBefore: RP
}, ga = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Hn = function(t) {
  return t.x;
}, Gn = function(t) {
  return t.y;
}, aC = function(t, r) {
  if (G(t))
    return t;
  var n = "curve".concat(Do(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? ib["".concat(n).concat(r === "vertical" ? "Y" : "X")] : ib[n] || Lo;
}, oC = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, i = t.points, a = i === void 0 ? [] : i, o = t.baseLine, u = t.layout, c = t.connectNulls, s = c === void 0 ? !1 : c, f = aC(n, u), l = s ? a.filter(function(v) {
    return ga(v);
  }) : a, p;
  if (Array.isArray(o)) {
    var h = s ? o.filter(function(v) {
      return ga(v);
    }) : o, y = l.map(function(v, d) {
      return nb(nb({}, v), {}, {
        base: h[d]
      });
    });
    return u === "vertical" ? p = sa().y(Gn).x1(Hn).x0(function(v) {
      return v.base.x;
    }) : p = sa().x(Hn).y1(Gn).y0(function(v) {
      return v.base.y;
    }), p.defined(ga).curve(f), p(y);
  }
  return u === "vertical" && q(o) ? p = sa().y(Gn).x1(Hn).x0(o) : q(o) ? p = sa().x(Hn).y1(Gn).y0(o) : p = wx().x(Hn).y(Gn), p.defined(ga).curve(f), p(l);
}, Yt = function(t) {
  var r = t.className, n = t.points, i = t.path, a = t.pathRef;
  if ((!n || !n.length) && !i)
    return null;
  var o = n && n.length ? oC(t) : i;
  return /* @__PURE__ */ R.createElement("path", rp({}, W(t, !1), _a(t), {
    className: Y("recharts-curve", r),
    d: o,
    ref: a
  }));
}, Nl = { exports: {} }, Ll, ab;
function uC() {
  if (ab) return Ll;
  ab = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ll = e, Ll;
}
var ql, ob;
function cC() {
  if (ob) return ql;
  ob = 1;
  var e = /* @__PURE__ */ uC();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ql = function() {
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
  }, ql;
}
var ub;
function sC() {
  return ub || (ub = 1, Nl.exports = /* @__PURE__ */ cC()()), Nl.exports;
}
var lC = /* @__PURE__ */ sC();
const oe = /* @__PURE__ */ ce(lC), { getOwnPropertyNames: fC, getOwnPropertySymbols: pC } = Object, { hasOwnProperty: hC } = Object.prototype;
function Bl(e, t) {
  return function(n, i, a) {
    return e(n, i, a) && t(n, i, a);
  };
}
function ba(e) {
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
function dC(e) {
  return e != null ? e[Symbol.toStringTag] : void 0;
}
function cb(e) {
  return fC(e).concat(pC(e));
}
const vC = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((e, t) => hC.call(e, t))
);
function Ir(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
const yC = "__v", mC = "__o", gC = "_owner", { getOwnPropertyDescriptor: sb, keys: lb } = Object;
function bC(e, t) {
  return e.byteLength === t.byteLength && Qa(new Uint8Array(e), new Uint8Array(t));
}
function xC(e, t, r) {
  let n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function OC(e, t) {
  return e.byteLength === t.byteLength && Qa(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}
function wC(e, t) {
  return Ir(e.getTime(), t.getTime());
}
function AC(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function _C(e, t) {
  return e === t;
}
function fb(e, t, r) {
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
      const p = o.value, h = u.value;
      if (r.equals(p[0], h[0], c, l, e, t, r) && r.equals(p[1], h[1], p[0], h[0], e, t, r)) {
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
const PC = Ir;
function SC(e, t, r) {
  const n = lb(e);
  let i = n.length;
  if (lb(t).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!jw(e, t, r, n[i]))
      return !1;
  return !0;
}
function Vn(e, t, r) {
  const n = cb(e);
  let i = n.length;
  if (cb(t).length !== i)
    return !1;
  let a, o, u;
  for (; i-- > 0; )
    if (a = n[i], !jw(e, t, r, a) || (o = sb(e, a), u = sb(t, a), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function jC(e, t) {
  return Ir(e.valueOf(), t.valueOf());
}
function EC(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function pb(e, t, r) {
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
function Qa(e, t) {
  let r = e.byteLength;
  if (t.byteLength !== r || e.byteOffset !== t.byteOffset)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function TC(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function jw(e, t, r, n) {
  return (n === gC || n === mC || n === yC) && (e.$$typeof || t.$$typeof) ? !0 : vC(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
const $C = "[object ArrayBuffer]", MC = "[object Arguments]", IC = "[object Boolean]", CC = "[object DataView]", kC = "[object Date]", RC = "[object Error]", DC = "[object Map]", NC = "[object Number]", LC = "[object Object]", qC = "[object RegExp]", BC = "[object Set]", FC = "[object String]", zC = {
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
}, WC = "[object URL]", KC = Object.prototype.toString;
function UC({ areArrayBuffersEqual: e, areArraysEqual: t, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: i, areFunctionsEqual: a, areMapsEqual: o, areNumbersEqual: u, areObjectsEqual: c, arePrimitiveWrappersEqual: s, areRegExpsEqual: f, areSetsEqual: l, areTypedArraysEqual: p, areUrlsEqual: h, unknownTagComparators: y }) {
  return function(d, g, b) {
    if (d === g)
      return !0;
    if (d == null || g == null)
      return !1;
    const O = typeof d;
    if (O !== typeof g)
      return !1;
    if (O !== "object")
      return O === "number" ? u(d, g, b) : O === "function" ? a(d, g, b) : !1;
    const w = d.constructor;
    if (w !== g.constructor)
      return !1;
    if (w === Object)
      return c(d, g, b);
    if (Array.isArray(d))
      return t(d, g, b);
    if (w === Date)
      return n(d, g, b);
    if (w === RegExp)
      return f(d, g, b);
    if (w === Map)
      return o(d, g, b);
    if (w === Set)
      return l(d, g, b);
    const m = KC.call(d);
    if (m === kC)
      return n(d, g, b);
    if (m === qC)
      return f(d, g, b);
    if (m === DC)
      return o(d, g, b);
    if (m === BC)
      return l(d, g, b);
    if (m === LC)
      return typeof d.then != "function" && typeof g.then != "function" && c(d, g, b);
    if (m === WC)
      return h(d, g, b);
    if (m === RC)
      return i(d, g, b);
    if (m === MC)
      return c(d, g, b);
    if (zC[m])
      return p(d, g, b);
    if (m === $C)
      return e(d, g, b);
    if (m === CC)
      return r(d, g, b);
    if (m === IC || m === NC || m === FC)
      return s(d, g, b);
    if (y) {
      let x = y[m];
      if (!x) {
        const A = dC(d);
        A && (x = y[A]);
      }
      if (x)
        return x(d, g, b);
    }
    return !1;
  };
}
function HC({ circular: e, createCustomConfig: t, strict: r }) {
  let n = {
    areArrayBuffersEqual: bC,
    areArraysEqual: r ? Vn : xC,
    areDataViewsEqual: OC,
    areDatesEqual: wC,
    areErrorsEqual: AC,
    areFunctionsEqual: _C,
    areMapsEqual: r ? Bl(fb, Vn) : fb,
    areNumbersEqual: PC,
    areObjectsEqual: r ? Vn : SC,
    arePrimitiveWrappersEqual: jC,
    areRegExpsEqual: EC,
    areSetsEqual: r ? Bl(pb, Vn) : pb,
    areTypedArraysEqual: r ? Bl(Qa, Vn) : Qa,
    areUrlsEqual: TC,
    unknownTagComparators: void 0
  };
  if (t && (n = Object.assign({}, n, t(n))), e) {
    const i = ba(n.areArraysEqual), a = ba(n.areMapsEqual), o = ba(n.areObjectsEqual), u = ba(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: i,
      areMapsEqual: a,
      areObjectsEqual: o,
      areSetsEqual: u
    });
  }
  return n;
}
function GC(e) {
  return function(t, r, n, i, a, o, u) {
    return e(t, r, u);
  };
}
function VC({ circular: e, comparator: t, createState: r, equals: n, strict: i }) {
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
const XC = rr();
rr({ strict: !0 });
rr({ circular: !0 });
rr({
  circular: !0,
  strict: !0
});
rr({
  createInternalComparator: () => Ir
});
rr({
  strict: !0,
  createInternalComparator: () => Ir
});
rr({
  circular: !0,
  createInternalComparator: () => Ir
});
rr({
  circular: !0,
  createInternalComparator: () => Ir,
  strict: !0
});
function rr(e = {}) {
  const { circular: t = !1, createInternalComparator: r, createState: n, strict: i = !1 } = e, a = HC(e), o = UC(a), u = r ? r(o) : GC(o);
  return VC({ circular: t, comparator: o, createState: n, equals: u, strict: i });
}
function YC(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function hb(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function i(a) {
    r < 0 && (r = a), a - r > t ? (e(a), r = -1) : YC(i);
  };
  requestAnimationFrame(n);
}
function np(e) {
  "@babel/helpers - typeof";
  return np = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, np(e);
}
function ZC(e) {
  return tk(e) || ek(e) || QC(e) || JC();
}
function JC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QC(e, t) {
  if (e) {
    if (typeof e == "string") return db(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return db(e, t);
  }
}
function db(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ek(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function tk(e) {
  if (Array.isArray(e)) return e;
}
function rk() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function i(a) {
    if (!r) {
      if (Array.isArray(a)) {
        if (!a.length)
          return;
        var o = a, u = ZC(o), c = u[0], s = u.slice(1);
        if (typeof c == "number") {
          hb(i.bind(null, s), c);
          return;
        }
        i(c), hb(i.bind(null, s));
        return;
      }
      np(a) === "object" && (e = a, t(e)), typeof a == "function" && a();
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
function $i(e) {
  "@babel/helpers - typeof";
  return $i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $i(e);
}
function vb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function yb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vb(Object(r), !0).forEach(function(n) {
      Ew(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ew(e, t, r) {
  return t = nk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function nk(e) {
  var t = ik(e, "string");
  return $i(t) === "symbol" ? t : String(t);
}
function ik(e, t) {
  if ($i(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if ($i(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ak = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, i) {
    return n.filter(function(a) {
      return i.includes(a);
    });
  });
}, ok = function(t) {
  return t;
}, uk = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, ri = function(t, r) {
  return Object.keys(r).reduce(function(n, i) {
    return yb(yb({}, n), {}, Ew({}, i, t(i, r[i])));
  }, {});
}, mb = function(t, r, n) {
  return t.map(function(i) {
    return "".concat(uk(i), " ").concat(r, "ms ").concat(n);
  }).join(",");
};
function ck(e, t) {
  return fk(e) || lk(e, t) || Tw(e, t) || sk();
}
function sk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function lk(e, t) {
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
function fk(e) {
  if (Array.isArray(e)) return e;
}
function pk(e) {
  return vk(e) || dk(e) || Tw(e) || hk();
}
function hk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tw(e, t) {
  if (e) {
    if (typeof e == "string") return ip(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ip(e, t);
  }
}
function dk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function vk(e) {
  if (Array.isArray(e)) return ip(e);
}
function ip(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var eo = 1e-4, $w = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, Mw = function(t, r) {
  return t.map(function(n, i) {
    return n * Math.pow(r, i);
  }).reduce(function(n, i) {
    return n + i;
  });
}, gb = function(t, r) {
  return function(n) {
    var i = $w(t, r);
    return Mw(i, n);
  };
}, yk = function(t, r) {
  return function(n) {
    var i = $w(t, r), a = [].concat(pk(i.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return Mw(a, n);
  };
}, bb = function() {
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
          var s = c[1].split(")")[0].split(",").map(function(d) {
            return parseFloat(d);
          }), f = ck(s, 4);
          i = f[0], a = f[1], o = f[2], u = f[3];
        }
      }
    }
  var l = gb(i, o), p = gb(a, u), h = yk(i, o), y = function(g) {
    return g > 1 ? 1 : g < 0 ? 0 : g;
  }, v = function(g) {
    for (var b = g > 1 ? 1 : g, O = b, w = 0; w < 8; ++w) {
      var m = l(O) - b, x = h(O);
      if (Math.abs(m - b) < eo || x < eo)
        return p(O);
      O = y(O - m / x);
    }
    return p(O);
  };
  return v.isStepper = !1, v;
}, mk = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, i = t.damping, a = i === void 0 ? 8 : i, o = t.dt, u = o === void 0 ? 17 : o, c = function(f, l, p) {
    var h = -(f - l) * n, y = p * a, v = p + (h - y) * u / 1e3, d = p * u / 1e3 + f;
    return Math.abs(d - l) < eo && Math.abs(v) < eo ? [l, 0] : [d, v];
  };
  return c.isStepper = !0, c.dt = u, c;
}, gk = function() {
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
        return bb(i);
      case "spring":
        return mk();
      default:
        if (i.split("(")[0] === "cubic-bezier")
          return bb(i);
    }
  return typeof i == "function" ? i : null;
};
function Mi(e) {
  "@babel/helpers - typeof";
  return Mi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mi(e);
}
function xb(e) {
  return Ok(e) || xk(e) || Iw(e) || bk();
}
function bk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ok(e) {
  if (Array.isArray(e)) return op(e);
}
function Ob(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ce(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ob(Object(r), !0).forEach(function(n) {
      ap(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ob(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ap(e, t, r) {
  return t = wk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wk(e) {
  var t = Ak(e, "string");
  return Mi(t) === "symbol" ? t : String(t);
}
function Ak(e, t) {
  if (Mi(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Mi(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _k(e, t) {
  return jk(e) || Sk(e, t) || Iw(e, t) || Pk();
}
function Pk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Iw(e, t) {
  if (e) {
    if (typeof e == "string") return op(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return op(e, t);
  }
}
function op(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Sk(e, t) {
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
function jk(e) {
  if (Array.isArray(e)) return e;
}
var to = function(t, r, n) {
  return t + (r - t) * n;
}, up = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, Ek = function e(t, r, n) {
  var i = ri(function(a, o) {
    if (up(o)) {
      var u = t(o.from, o.to, o.velocity), c = _k(u, 2), s = c[0], f = c[1];
      return Ce(Ce({}, o), {}, {
        from: s,
        velocity: f
      });
    }
    return o;
  }, r);
  return n < 1 ? ri(function(a, o) {
    return up(o) ? Ce(Ce({}, o), {}, {
      velocity: to(o.velocity, i[a].velocity, n),
      from: to(o.from, i[a].from, n)
    }) : o;
  }, r) : e(t, i, n - 1);
};
const Tk = (function(e, t, r, n, i) {
  var a = ak(e, t), o = a.reduce(function(d, g) {
    return Ce(Ce({}, d), {}, ap({}, g, [e[g], t[g]]));
  }, {}), u = a.reduce(function(d, g) {
    return Ce(Ce({}, d), {}, ap({}, g, {
      from: e[g],
      velocity: 0,
      to: t[g]
    }));
  }, {}), c = -1, s, f, l = function() {
    return null;
  }, p = function() {
    return ri(function(g, b) {
      return b.from;
    }, u);
  }, h = function() {
    return !Object.values(u).filter(up).length;
  }, y = function(g) {
    s || (s = g);
    var b = g - s, O = b / r.dt;
    u = Ek(r, u, O), i(Ce(Ce(Ce({}, e), t), p())), s = g, h() || (c = requestAnimationFrame(l));
  }, v = function(g) {
    f || (f = g);
    var b = (g - f) / n, O = ri(function(m, x) {
      return to.apply(void 0, xb(x).concat([r(b)]));
    }, o);
    if (i(Ce(Ce(Ce({}, e), t), O)), b < 1)
      c = requestAnimationFrame(l);
    else {
      var w = ri(function(m, x) {
        return to.apply(void 0, xb(x).concat([r(1)]));
      }, o);
      i(Ce(Ce(Ce({}, e), t), w));
    }
  };
  return l = r.isStepper ? y : v, function() {
    return requestAnimationFrame(l), function() {
      cancelAnimationFrame(c);
    };
  };
});
function cn(e) {
  "@babel/helpers - typeof";
  return cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cn(e);
}
var $k = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function Mk(e, t) {
  if (e == null) return {};
  var r = Ik(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Ik(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function Fl(e) {
  return Dk(e) || Rk(e) || kk(e) || Ck();
}
function Ck() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kk(e, t) {
  if (e) {
    if (typeof e == "string") return cp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return cp(e, t);
  }
}
function Rk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Dk(e) {
  if (Array.isArray(e)) return cp(e);
}
function cp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function wb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ut(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wb(Object(r), !0).forEach(function(n) {
      Jn(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Jn(e, t, r) {
  return t = Cw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nk(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Lk(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Cw(n.key), n);
  }
}
function qk(e, t, r) {
  return t && Lk(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Cw(e) {
  var t = Bk(e, "string");
  return cn(t) === "symbol" ? t : String(t);
}
function Bk(e, t) {
  if (cn(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (cn(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fk(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && sp(e, t);
}
function sp(e, t) {
  return sp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, sp(e, t);
}
function zk(e) {
  var t = Wk();
  return function() {
    var n = ro(e), i;
    if (t) {
      var a = ro(this).constructor;
      i = Reflect.construct(n, arguments, a);
    } else
      i = n.apply(this, arguments);
    return lp(this, i);
  };
}
function lp(e, t) {
  if (t && (cn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return fp(e);
}
function fp(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Wk() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function ro(e) {
  return ro = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ro(e);
}
var We = /* @__PURE__ */ (function(e) {
  Fk(r, e);
  var t = zk(r);
  function r(n, i) {
    var a;
    Nk(this, r), a = t.call(this, n, i);
    var o = a.props, u = o.isActive, c = o.attributeName, s = o.from, f = o.to, l = o.steps, p = o.children, h = o.duration;
    if (a.handleStyleChange = a.handleStyleChange.bind(fp(a)), a.changeStyle = a.changeStyle.bind(fp(a)), !u || h <= 0)
      return a.state = {
        style: {}
      }, typeof p == "function" && (a.state = {
        style: f
      }), lp(a);
    if (l && l.length)
      a.state = {
        style: l[0].style
      };
    else if (s) {
      if (typeof p == "function")
        return a.state = {
          style: s
        }, lp(a);
      a.state = {
        style: c ? Jn({}, c, s) : s
      };
    } else
      a.state = {
        style: {}
      };
    return a;
  }
  return qk(r, [{
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
          var h = {
            style: c ? Jn({}, c, f) : f
          };
          this.state && p && (c && p[c] !== f || !c && p !== f) && this.setState(h);
          return;
        }
        if (!(XC(i.to, f) && i.canBegin && i.isActive)) {
          var y = !i.canBegin || !i.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var v = y || s ? l : i.to;
          if (this.state && p) {
            var d = {
              style: c ? Jn({}, c, v) : v
            };
            (c && p[c] !== v || !c && p !== v) && this.setState(d);
          }
          this.runAnimation(ut(ut({}, this.props), {}, {
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
      var a = this, o = i.from, u = i.to, c = i.duration, s = i.easing, f = i.begin, l = i.onAnimationEnd, p = i.onAnimationStart, h = Tk(o, u, gk(s), c, this.changeStyle), y = function() {
        a.stopJSAnimation = h();
      };
      this.manager.start([p, f, y, c, l]);
    }
  }, {
    key: "runStepAnimation",
    value: function(i) {
      var a = this, o = i.steps, u = i.begin, c = i.onAnimationStart, s = o[0], f = s.style, l = s.duration, p = l === void 0 ? 0 : l, h = function(v, d, g) {
        if (g === 0)
          return v;
        var b = d.duration, O = d.easing, w = O === void 0 ? "ease" : O, m = d.style, x = d.properties, A = d.onAnimationEnd, P = g > 0 ? o[g - 1] : d, S = x || Object.keys(m);
        if (typeof w == "function" || w === "spring")
          return [].concat(Fl(v), [a.runJSAnimation.bind(a, {
            from: P.style,
            to: m,
            duration: b,
            easing: w
          }), b]);
        var T = mb(S, b, w), E = ut(ut(ut({}, P.style), m), {}, {
          transition: T
        });
        return [].concat(Fl(v), [E, b, A]).filter(ok);
      };
      return this.manager.start([c].concat(Fl(o.reduce(h, [f, Math.max(p, u)])), [i.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(i) {
      this.manager || (this.manager = rk());
      var a = i.begin, o = i.duration, u = i.attributeName, c = i.to, s = i.easing, f = i.onAnimationStart, l = i.onAnimationEnd, p = i.steps, h = i.children, y = this.manager;
      if (this.unSubscribe = y.subscribe(this.handleStyleChange), typeof s == "function" || typeof h == "function" || s === "spring") {
        this.runJSAnimation(i);
        return;
      }
      if (p.length > 1) {
        this.runStepAnimation(i);
        return;
      }
      var v = u ? Jn({}, u, c) : c, d = mb(Object.keys(v), o, s);
      y.start([f, a, ut(ut({}, v), {}, {
        transition: d
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
      var c = Mk(i, $k), s = R.Children.count(a), f = this.state.style;
      if (typeof a == "function")
        return a(f);
      if (!u || s === 0 || o <= 0)
        return a;
      var l = function(h) {
        var y = h.props, v = y.style, d = v === void 0 ? {} : v, g = y.className, b = /* @__PURE__ */ R.cloneElement(h, ut(ut({}, c), {}, {
          style: ut(ut({}, d), f),
          className: g
        }));
        return b;
      };
      return s === 1 ? l(R.Children.only(a)) : /* @__PURE__ */ _.createElement("div", null, R.Children.map(a, function(p) {
        return l(p);
      }));
    }
  }]), r;
})(R.PureComponent);
We.displayName = "Animate";
We.defaultProps = {
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
We.propTypes = {
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
function Ii(e) {
  "@babel/helpers - typeof";
  return Ii = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ii(e);
}
function no() {
  return no = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, no.apply(this, arguments);
}
function Kk(e, t) {
  return Vk(e) || Gk(e, t) || Hk(e, t) || Uk();
}
function Uk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hk(e, t) {
  if (e) {
    if (typeof e == "string") return Ab(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ab(e, t);
  }
}
function Ab(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Gk(e, t) {
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
function Vk(e) {
  if (Array.isArray(e)) return e;
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
function Pb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _b(Object(r), !0).forEach(function(n) {
      Xk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Xk(e, t, r) {
  return t = Yk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Yk(e) {
  var t = Zk(e, "string");
  return Ii(t) == "symbol" ? t : t + "";
}
function Zk(e, t) {
  if (Ii(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ii(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Sb = function(t, r, n, i, a) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2), u = i >= 0 ? 1 : -1, c = n >= 0 ? 1 : -1, s = i >= 0 && n >= 0 || i < 0 && n < 0 ? 1 : 0, f;
  if (o > 0 && a instanceof Array) {
    for (var l = [0, 0, 0, 0], p = 0, h = 4; p < h; p++)
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
}, Jk = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, i = t.y, a = r.x, o = r.y, u = r.width, c = r.height;
  if (Math.abs(u) > 0 && Math.abs(c) > 0) {
    var s = Math.min(a, a + u), f = Math.max(a, a + u), l = Math.min(o, o + c), p = Math.max(o, o + c);
    return n >= s && n <= f && i >= l && i <= p;
  }
  return !1;
}, Qk = {
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
}, Bh = function(t) {
  var r = Pb(Pb({}, Qk), t), n = R.useRef(), i = R.useState(-1), a = Kk(i, 2), o = a[0], u = a[1];
  R.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var w = n.current.getTotalLength();
        w && u(w);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.width, l = r.height, p = r.radius, h = r.className, y = r.animationEasing, v = r.animationDuration, d = r.animationBegin, g = r.isAnimationActive, b = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0)
    return null;
  var O = Y("recharts-rectangle", h);
  return b ? /* @__PURE__ */ _.createElement(We, {
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
    var m = w.width, x = w.height, A = w.x, P = w.y;
    return /* @__PURE__ */ _.createElement(We, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: d,
      duration: v,
      isActive: g,
      easing: y
    }, /* @__PURE__ */ _.createElement("path", no({}, W(r, !0), {
      className: O,
      d: Sb(A, P, m, x, p),
      ref: n
    })));
  }) : /* @__PURE__ */ _.createElement("path", no({}, W(r, !0), {
    className: O,
    d: Sb(c, s, f, l, p)
  }));
}, eR = ["points", "className", "baseLinePoints", "connectNulls"];
function Kr() {
  return Kr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Kr.apply(this, arguments);
}
function tR(e, t) {
  if (e == null) return {};
  var r = rR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function rR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function jb(e) {
  return oR(e) || aR(e) || iR(e) || nR();
}
function nR() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iR(e, t) {
  if (e) {
    if (typeof e == "string") return pp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return pp(e, t);
  }
}
function aR(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function oR(e) {
  if (Array.isArray(e)) return pp(e);
}
function pp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Eb = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, uR = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    Eb(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), Eb(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, ni = function(t, r) {
  var n = uR(t);
  r && (n = [n.reduce(function(a, o) {
    return [].concat(jb(a), jb(o));
  }, [])]);
  var i = n.map(function(a) {
    return a.reduce(function(o, u, c) {
      return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(i, "Z") : i;
}, cR = function(t, r, n) {
  var i = ni(t, n);
  return "".concat(i.slice(-1) === "Z" ? i.slice(0, -1) : i, "L").concat(ni(r.reverse(), n).slice(1));
}, kw = function(t) {
  var r = t.points, n = t.className, i = t.baseLinePoints, a = t.connectNulls, o = tR(t, eR);
  if (!r || !r.length)
    return null;
  var u = Y("recharts-polygon", n);
  if (i && i.length) {
    var c = o.stroke && o.stroke !== "none", s = cR(r, i, a);
    return /* @__PURE__ */ _.createElement("g", {
      className: u
    }, /* @__PURE__ */ _.createElement("path", Kr({}, W(o, !0), {
      fill: s.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: s
    })), c ? /* @__PURE__ */ _.createElement("path", Kr({}, W(o, !0), {
      fill: "none",
      d: ni(r, a)
    })) : null, c ? /* @__PURE__ */ _.createElement("path", Kr({}, W(o, !0), {
      fill: "none",
      d: ni(i, a)
    })) : null);
  }
  var f = ni(r, a);
  return /* @__PURE__ */ _.createElement("path", Kr({}, W(o, !0), {
    fill: f.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: f
  }));
};
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
var Nn = function(t) {
  var r = t.cx, n = t.cy, i = t.r, a = t.className, o = Y("recharts-dot", a);
  return r === +r && n === +n && i === +i ? /* @__PURE__ */ R.createElement("circle", hp({}, W(t, !1), _a(t), {
    className: o,
    cx: r,
    cy: n,
    r: i
  })) : null;
};
function Ci(e) {
  "@babel/helpers - typeof";
  return Ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ci(e);
}
var sR = ["x", "y", "top", "left", "width", "height", "className"];
function dp() {
  return dp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, dp.apply(this, arguments);
}
function Tb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lR(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tb(Object(r), !0).forEach(function(n) {
      fR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fR(e, t, r) {
  return t = pR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pR(e) {
  var t = hR(e, "string");
  return Ci(t) == "symbol" ? t : t + "";
}
function hR(e, t) {
  if (Ci(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ci(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dR(e, t) {
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
var yR = function(t, r, n, i, a, o) {
  return "M".concat(t, ",").concat(a, "v").concat(i, "M").concat(o, ",").concat(r, "h").concat(n);
}, mR = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, i = t.y, a = i === void 0 ? 0 : i, o = t.top, u = o === void 0 ? 0 : o, c = t.left, s = c === void 0 ? 0 : c, f = t.width, l = f === void 0 ? 0 : f, p = t.height, h = p === void 0 ? 0 : p, y = t.className, v = dR(t, sR), d = lR({
    x: n,
    y: a,
    top: u,
    left: s,
    width: l,
    height: h
  }, v);
  return !q(n) || !q(a) || !q(l) || !q(h) || !q(u) || !q(s) ? null : /* @__PURE__ */ _.createElement("path", dp({}, W(d, !0), {
    className: Y("recharts-cross", y),
    d: yR(n, a, l, h, u, s)
  }));
}, gR = ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"];
function ki(e) {
  "@babel/helpers - typeof";
  return ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ki(e);
}
function bR(e, t) {
  if (e == null) return {};
  var r = xR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function xR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Nt() {
  return Nt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nt.apply(this, arguments);
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
function Ri(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $b(Object(r), !0).forEach(function(n) {
      OR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $b(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OR(e, t, r) {
  return t = wR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wR(e) {
  var t = AR(e, "string");
  return ki(t) == "symbol" ? t : t + "";
}
function AR(e, t) {
  if (ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _R = function(t, r, n, i) {
  var a = "";
  return i.forEach(function(o, u) {
    var c = ne(r, n, t, o);
    u ? a += "L ".concat(c.x, ",").concat(c.y) : a += "M ".concat(c.x, ",").concat(c.y);
  }), a += "Z", a;
}, PR = function(t) {
  var r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.polarAngles, u = t.radialLines;
  if (!o || !o.length || !u)
    return null;
  var c = Ri({
    stroke: "#ccc"
  }, W(t, !1));
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-polar-grid-angle"
  }, o.map(function(s) {
    var f = ne(r, n, i, s), l = ne(r, n, a, s);
    return /* @__PURE__ */ _.createElement("line", Nt({}, c, {
      key: "line-".concat(s),
      x1: f.x,
      y1: f.y,
      x2: l.x,
      y2: l.y
    }));
  }));
}, SR = function(t) {
  var r = t.cx, n = t.cy, i = t.radius, a = t.index, o = Ri(Ri({
    stroke: "#ccc"
  }, W(t, !1)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ _.createElement("circle", Nt({}, o, {
    className: Y("recharts-polar-grid-concentric-circle", t.className),
    key: "circle-".concat(a),
    cx: r,
    cy: n,
    r: i
  }));
}, jR = function(t) {
  var r = t.radius, n = t.index, i = Ri(Ri({
    stroke: "#ccc"
  }, W(t, !1)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ _.createElement("path", Nt({}, i, {
    className: Y("recharts-polar-grid-concentric-polygon", t.className),
    key: "path-".concat(n),
    d: _R(r, t.cx, t.cy, t.polarAngles)
  }));
}, ER = function(t) {
  var r = t.polarRadius, n = t.gridType;
  return !r || !r.length ? null : /* @__PURE__ */ _.createElement("g", {
    className: "recharts-polar-grid-concentric"
  }, r.map(function(i, a) {
    var o = a;
    return n === "circle" ? /* @__PURE__ */ _.createElement(SR, Nt({
      key: o
    }, t, {
      radius: i,
      index: a
    })) : /* @__PURE__ */ _.createElement(jR, Nt({
      key: o
    }, t, {
      radius: i,
      index: a
    }));
  }));
}, Rw = function(t) {
  var r = t.cx, n = r === void 0 ? 0 : r, i = t.cy, a = i === void 0 ? 0 : i, o = t.innerRadius, u = o === void 0 ? 0 : o, c = t.outerRadius, s = c === void 0 ? 0 : c, f = t.gridType, l = f === void 0 ? "polygon" : f, p = t.radialLines, h = p === void 0 ? !0 : p, y = bR(t, gR);
  return s <= 0 ? null : /* @__PURE__ */ _.createElement("g", {
    className: "recharts-polar-grid"
  }, /* @__PURE__ */ _.createElement(PR, Nt({
    cx: n,
    cy: a,
    innerRadius: u,
    outerRadius: s,
    gridType: l,
    radialLines: h
  }, y)), /* @__PURE__ */ _.createElement(ER, Nt({
    cx: n,
    cy: a,
    innerRadius: u,
    outerRadius: s,
    gridType: l,
    radialLines: h
  }, y)));
};
Rw.displayName = "PolarGrid";
var zl, Mb;
function TR() {
  if (Mb) return zl;
  Mb = 1;
  var e = Yo(), t = UO(), r = Pt();
  function n(i, a) {
    return i && i.length ? e(i, r(a, 2), t) : void 0;
  }
  return zl = n, zl;
}
var $R = TR();
const MR = /* @__PURE__ */ ce($R);
var Wl, Ib;
function IR() {
  if (Ib) return Wl;
  Ib = 1;
  var e = Yo(), t = Pt(), r = HO();
  function n(i, a) {
    return i && i.length ? e(i, t(a, 2), r) : void 0;
  }
  return Wl = n, Wl;
}
var CR = IR();
const kR = /* @__PURE__ */ ce(CR);
var RR = ["cx", "cy", "angle", "ticks", "axisLine"], DR = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function ii() {
  return ii = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ii.apply(this, arguments);
}
function Cb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cb(Object(r), !0).forEach(function(n) {
      eu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kb(e, t) {
  if (e == null) return {};
  var r = NR(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function NR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function LR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Rb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Nw(n.key), n);
  }
}
function qR(e, t, r) {
  return t && Rb(e.prototype, t), r && Rb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function BR(e, t, r) {
  return t = io(t), FR(e, Dw() ? Reflect.construct(t, r || [], io(e).constructor) : t.apply(e, r));
}
function FR(e, t) {
  if (t && (sn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return zR(e);
}
function zR(e) {
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
function io(e) {
  return io = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, io(e);
}
function WR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && vp(e, t);
}
function vp(e, t) {
  return vp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, vp(e, t);
}
function eu(e, t, r) {
  return t = Nw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nw(e) {
  var t = KR(e, "string");
  return sn(t) == "symbol" ? t : t + "";
}
function KR(e, t) {
  if (sn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ln = /* @__PURE__ */ (function(e) {
  function t() {
    return LR(this, t), BR(this, t, arguments);
  }
  return WR(t, e), qR(t, [{
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
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = MR(u, function(f) {
        return f.coordinate || 0;
      }), s = kR(u, function(f) {
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
      var n = this.props, i = n.cx, a = n.cy, o = n.angle, u = n.ticks, c = n.axisLine, s = kb(n, RR), f = u.reduce(function(y, v) {
        return [Math.min(y[0], v.coordinate), Math.max(y[1], v.coordinate)];
      }, [1 / 0, -1 / 0]), l = ne(i, a, f[0], o), p = ne(i, a, f[1], o), h = lr(lr(lr({}, W(s, !1)), {}, {
        fill: "none"
      }, W(c, !1)), {}, {
        x1: l.x,
        y1: l.y,
        x2: p.x,
        y2: p.y
      });
      return /* @__PURE__ */ _.createElement("line", ii({
        className: "recharts-polar-radius-axis-line"
      }, h));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.angle, c = i.tickFormatter, s = i.stroke, f = kb(i, DR), l = this.getTickTextAnchor(), p = W(f, !1), h = W(o, !1), y = a.map(function(v, d) {
        var g = n.getTickValueCoord(v), b = lr(lr(lr(lr({
          textAnchor: l,
          transform: "rotate(".concat(90 - u, ", ").concat(g.x, ", ").concat(g.y, ")")
        }, p), {}, {
          stroke: "none",
          fill: s
        }, h), {}, {
          index: d
        }, g), {}, {
          payload: v
        });
        return /* @__PURE__ */ _.createElement(J, ii({
          className: Y("recharts-polar-radius-axis-tick", ww(o)),
          key: "tick-".concat(v.coordinate)
        }, Ot(n.props, v, d)), t.renderTickItem(o, b, c ? c(v.value, d) : v.value));
      });
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-polar-radius-axis-ticks"
      }, y);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.axisLine, o = n.tick;
      return !i || !i.length ? null : /* @__PURE__ */ _.createElement(J, {
        className: Y("recharts-polar-radius-axis", this.props.className)
      }, a && this.renderAxisLine(), o && this.renderTicks(), $e.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ _.isValidElement(n) ? o = /* @__PURE__ */ _.cloneElement(n, i) : G(n) ? o = n(i) : o = /* @__PURE__ */ _.createElement(Pr, ii({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), a), o;
    }
  }]);
})(R.PureComponent);
eu(Ln, "displayName", "PolarRadiusAxis");
eu(Ln, "axisType", "radiusAxis");
eu(Ln, "defaultProps", {
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
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function dr() {
  return dr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, dr.apply(this, arguments);
}
function Db(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Db(Object(r), !0).forEach(function(n) {
      tu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Db(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UR(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Nb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, qw(n.key), n);
  }
}
function HR(e, t, r) {
  return t && Nb(e.prototype, t), r && Nb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function GR(e, t, r) {
  return t = ao(t), VR(e, Lw() ? Reflect.construct(t, r || [], ao(e).constructor) : t.apply(e, r));
}
function VR(e, t) {
  if (t && (ln(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return XR(e);
}
function XR(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Lw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Lw = function() {
    return !!e;
  })();
}
function ao(e) {
  return ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ao(e);
}
function YR(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && yp(e, t);
}
function yp(e, t) {
  return yp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, yp(e, t);
}
function tu(e, t, r) {
  return t = qw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qw(e) {
  var t = ZR(e, "string");
  return ln(t) == "symbol" ? t : t + "";
}
function ZR(e, t) {
  if (ln(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (ln(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var JR = Math.PI / 180, Lb = 1e-5, Cr = /* @__PURE__ */ (function(e) {
  function t() {
    return UR(this, t), GR(this, t, arguments);
  }
  return YR(t, e), HR(t, [{
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
      var i = this.props.orientation, a = Math.cos(-n.coordinate * JR), o;
      return a > Lb ? o = i === "outer" ? "start" : "end" : a < -Lb ? o = i === "outer" ? "end" : "start" : o = "middle", o;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var n = this.props, i = n.cx, a = n.cy, o = n.radius, u = n.axisLine, c = n.axisLineType, s = fr(fr({}, W(this.props, !1)), {}, {
        fill: "none"
      }, W(u, !1));
      if (c === "circle")
        return /* @__PURE__ */ _.createElement(Nn, dr({
          className: "recharts-polar-angle-axis-line"
        }, s, {
          cx: i,
          cy: a,
          r: o
        }));
      var f = this.props.ticks, l = f.map(function(p) {
        return ne(i, a, o, p.coordinate);
      });
      return /* @__PURE__ */ _.createElement(kw, dr({
        className: "recharts-polar-angle-axis-line"
      }, s, {
        points: l
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var n = this, i = this.props, a = i.ticks, o = i.tick, u = i.tickLine, c = i.tickFormatter, s = i.stroke, f = W(this.props, !1), l = W(o, !1), p = fr(fr({}, f), {}, {
        fill: "none"
      }, W(u, !1)), h = a.map(function(y, v) {
        var d = n.getTickLineCoord(y), g = n.getTickTextAnchor(y), b = fr(fr(fr({
          textAnchor: g
        }, f), {}, {
          stroke: "none",
          fill: s
        }, l), {}, {
          index: v,
          payload: y,
          x: d.x2,
          y: d.y2
        });
        return /* @__PURE__ */ _.createElement(J, dr({
          className: Y("recharts-polar-angle-axis-tick", ww(o)),
          key: "tick-".concat(y.coordinate)
        }, Ot(n.props, y, v)), u && /* @__PURE__ */ _.createElement("line", dr({
          className: "recharts-polar-angle-axis-tick-line"
        }, p, d)), o && t.renderTickItem(o, b, c ? c(y.value, v) : y.value));
      });
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-polar-angle-axis-ticks"
      }, h);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.ticks, a = n.radius, o = n.axisLine;
      return a <= 0 || !i || !i.length ? null : /* @__PURE__ */ _.createElement(J, {
        className: Y("recharts-polar-angle-axis", this.props.className)
      }, o && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o;
      return /* @__PURE__ */ _.isValidElement(n) ? o = /* @__PURE__ */ _.cloneElement(n, i) : G(n) ? o = n(i) : o = /* @__PURE__ */ _.createElement(Pr, dr({}, i, {
        className: "recharts-polar-angle-axis-tick-value"
      }), a), o;
    }
  }]);
})(R.PureComponent);
tu(Cr, "displayName", "PolarAngleAxis");
tu(Cr, "axisType", "angleAxis");
tu(Cr, "defaultProps", {
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
var Kl, qb;
function QR() {
  if (qb) return Kl;
  qb = 1;
  var e = Ux(), t = e(Object.getPrototypeOf, Object);
  return Kl = t, Kl;
}
var Ul, Bb;
function eD() {
  if (Bb) return Ul;
  Bb = 1;
  var e = Lt(), t = QR(), r = qt(), n = "[object Object]", i = Function.prototype, a = Object.prototype, o = i.toString, u = a.hasOwnProperty, c = o.call(Object);
  function s(f) {
    if (!r(f) || e(f) != n)
      return !1;
    var l = t(f);
    if (l === null)
      return !0;
    var p = u.call(l, "constructor") && l.constructor;
    return typeof p == "function" && p instanceof p && o.call(p) == c;
  }
  return Ul = s, Ul;
}
var tD = eD();
const rD = /* @__PURE__ */ ce(tD);
var Hl, Fb;
function nD() {
  if (Fb) return Hl;
  Fb = 1;
  var e = Lt(), t = qt(), r = "[object Boolean]";
  function n(i) {
    return i === !0 || i === !1 || t(i) && e(i) == r;
  }
  return Hl = n, Hl;
}
var iD = nD();
const aD = /* @__PURE__ */ ce(iD);
function Di(e) {
  "@babel/helpers - typeof";
  return Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Di(e);
}
function oo() {
  return oo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, oo.apply(this, arguments);
}
function oD(e, t) {
  return lD(e) || sD(e, t) || cD(e, t) || uD();
}
function uD() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cD(e, t) {
  if (e) {
    if (typeof e == "string") return zb(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zb(e, t);
  }
}
function zb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function sD(e, t) {
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
function lD(e) {
  if (Array.isArray(e)) return e;
}
function Wb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wb(Object(r), !0).forEach(function(n) {
      fD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fD(e, t, r) {
  return t = pD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pD(e) {
  var t = hD(e, "string");
  return Di(t) == "symbol" ? t : t + "";
}
function hD(e, t) {
  if (Di(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Di(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ub = function(t, r, n, i, a) {
  var o = n - i, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + a), u += "L ".concat(t + n - o / 2 - i, ",").concat(r + a), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, dD = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, vD = function(t) {
  var r = Kb(Kb({}, dD), t), n = R.useRef(), i = R.useState(-1), a = oD(i, 2), o = a[0], u = a[1];
  R.useEffect(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var O = n.current.getTotalLength();
        O && u(O);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.upperWidth, l = r.lowerWidth, p = r.height, h = r.className, y = r.animationEasing, v = r.animationDuration, d = r.animationBegin, g = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || p !== +p || f === 0 && l === 0 || p === 0)
    return null;
  var b = Y("recharts-trapezoid", h);
  return g ? /* @__PURE__ */ _.createElement(We, {
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
    var w = O.upperWidth, m = O.lowerWidth, x = O.height, A = O.x, P = O.y;
    return /* @__PURE__ */ _.createElement(We, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: d,
      duration: v,
      easing: y
    }, /* @__PURE__ */ _.createElement("path", oo({}, W(r, !0), {
      className: b,
      d: Ub(A, P, w, m, x),
      ref: n
    })));
  }) : /* @__PURE__ */ _.createElement("g", null, /* @__PURE__ */ _.createElement("path", oo({}, W(r, !0), {
    className: b,
    d: Ub(c, s, f, l, p)
  })));
}, yD = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Ni(e) {
  "@babel/helpers - typeof";
  return Ni = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ni(e);
}
function mD(e, t) {
  if (e == null) return {};
  var r = gD(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Hb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hb(Object(r), !0).forEach(function(n) {
      bD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bD(e, t, r) {
  return t = xD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xD(e) {
  var t = OD(e, "string");
  return Ni(t) == "symbol" ? t : t + "";
}
function OD(e, t) {
  if (Ni(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ni(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wD(e, t) {
  return uo(uo({}, t), e);
}
function AD(e, t) {
  return e === "symbols";
}
function Gb(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ _.createElement(Bh, r);
    case "trapezoid":
      return /* @__PURE__ */ _.createElement(vD, r);
    case "sector":
      return /* @__PURE__ */ _.createElement(Sw, r);
    case "symbols":
      if (AD(t))
        return /* @__PURE__ */ _.createElement(Bo, r);
      break;
    default:
      return null;
  }
}
function _D(e) {
  return /* @__PURE__ */ R.isValidElement(e) ? e.props : e;
}
function Li(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, i = n === void 0 ? wD : n, a = e.activeClassName, o = a === void 0 ? "recharts-active-shape" : a, u = e.isActive, c = mD(e, yD), s;
  if (/* @__PURE__ */ R.isValidElement(t))
    s = /* @__PURE__ */ R.cloneElement(t, uo(uo({}, c), _D(t)));
  else if (G(t))
    s = t(c);
  else if (rD(t) && !aD(t)) {
    var f = i(t, c);
    s = /* @__PURE__ */ _.createElement(Gb, {
      shapeType: r,
      elementProps: f
    });
  } else {
    var l = c;
    s = /* @__PURE__ */ _.createElement(Gb, {
      shapeType: r,
      elementProps: l
    });
  }
  return u ? /* @__PURE__ */ _.createElement(J, {
    className: o
  }, s) : s;
}
function ru(e, t) {
  return t != null && "trapezoids" in e.props;
}
function nu(e, t) {
  return t != null && "sectors" in e.props;
}
function qi(e, t) {
  return t != null && "points" in e.props;
}
function PD(e, t) {
  var r, n, i = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, a = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return i && a;
}
function SD(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function jD(e, t) {
  var r = e.x === t.x, n = e.y === t.y, i = e.z === t.z;
  return r && n && i;
}
function ED(e, t) {
  var r;
  return ru(e, t) ? r = PD : nu(e, t) ? r = SD : qi(e, t) && (r = jD), r;
}
function TD(e, t) {
  var r;
  return ru(e, t) ? r = "trapezoids" : nu(e, t) ? r = "sectors" : qi(e, t) && (r = "points"), r;
}
function $D(e, t) {
  if (ru(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (nu(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return qi(e, t) ? t.payload : {};
}
function MD(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, i = TD(r, t), a = $D(r, t), o = n.filter(function(c, s) {
    var f = wt(a, c), l = r.props[i].filter(function(y) {
      var v = ED(r, t);
      return v(y, t);
    }), p = r.props[i].indexOf(l[l.length - 1]), h = s === p;
    return f && h;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var wa;
function fn(e) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function Ur() {
  return Ur = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ur.apply(this, arguments);
}
function Vb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vb(Object(r), !0).forEach(function(n) {
      nt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ID(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Xb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Fw(n.key), n);
  }
}
function CD(e, t, r) {
  return t && Xb(e.prototype, t), r && Xb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function kD(e, t, r) {
  return t = co(t), RD(e, Bw() ? Reflect.construct(t, r || [], co(e).constructor) : t.apply(e, r));
}
function RD(e, t) {
  if (t && (fn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return DD(e);
}
function DD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Bw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Bw = function() {
    return !!e;
  })();
}
function co(e) {
  return co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, co(e);
}
function ND(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mp(e, t);
}
function mp(e, t) {
  return mp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, mp(e, t);
}
function nt(e, t, r) {
  return t = Fw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Fw(e) {
  var t = LD(e, "string");
  return fn(t) == "symbol" ? t : t + "";
}
function LD(e, t) {
  if (fn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var Ft = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return ID(this, t), n = kD(this, t, [r]), nt(n, "pieRef", null), nt(n, "sectorRefs", []), nt(n, "id", Qt("recharts-pie-")), nt(n, "handleAnimationEnd", function() {
      var i = n.props.onAnimationEnd;
      n.setState({
        isAnimationFinished: !0
      }), G(i) && i();
    }), nt(n, "handleAnimationStart", function() {
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
  return ND(t, e), CD(t, [{
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
      var a = this.props, o = a.label, u = a.labelLine, c = a.dataKey, s = a.valueKey, f = W(this.props, !1), l = W(o, !1), p = W(u, !1), h = o && o.offsetRadius || 20, y = n.map(function(v, d) {
        var g = (v.startAngle + v.endAngle) / 2, b = ne(v.cx, v.cy, v.outerRadius + h, g), O = pe(pe(pe(pe({}, f), v), {}, {
          stroke: "none"
        }, l), {}, {
          index: d,
          textAnchor: t.getTextAnchor(b.x, v.cx)
        }, b), w = pe(pe(pe(pe({}, f), v), {}, {
          fill: "none",
          stroke: v.fill
        }, p), {}, {
          index: d,
          points: [ne(v.cx, v.cy, v.outerRadius, g), b]
        }), m = c;
        return V(c) && V(s) ? m = "value" : V(c) && (m = s), // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ _.createElement(J, {
          key: "label-".concat(v.startAngle, "-").concat(v.endAngle, "-").concat(v.midAngle, "-").concat(d)
        }, u && t.renderLabelLineItem(u, w, "line"), t.renderLabelItem(o, O, le(v, m)));
      });
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-pie-labels"
      }, y);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.activeShape, u = a.blendStroke, c = a.inactiveShape;
      return n.map(function(s, f) {
        if ((s == null ? void 0 : s.startAngle) === 0 && (s == null ? void 0 : s.endAngle) === 0 && n.length !== 1) return null;
        var l = i.isActiveIndex(f), p = c && i.hasActiveIndex() ? c : null, h = l ? o : p, y = pe(pe({}, s), {}, {
          stroke: u ? s.fill : s.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ _.createElement(J, Ur({
          ref: function(d) {
            d && !i.sectorRefs.includes(d) && i.sectorRefs.push(d);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, Ot(i.props, s, f), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(s == null ? void 0 : s.startAngle, "-").concat(s == null ? void 0 : s.endAngle, "-").concat(s.midAngle, "-").concat(f)
        }), /* @__PURE__ */ _.createElement(Li, Ur({
          option: h,
          isActive: l,
          shapeType: "sector"
        }, y)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.sectors, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state, p = l.prevSectors, h = l.prevIsAnimationActive;
      return /* @__PURE__ */ _.createElement(We, {
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
        key: "pie-".concat(f, "-").concat(h),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(y) {
        var v = y.t, d = [], g = a && a[0], b = g.startAngle;
        return a.forEach(function(O, w) {
          var m = p && p[w], x = w > 0 ? Ye(O, "paddingAngle", 0) : 0;
          if (m) {
            var A = ue(m.endAngle - m.startAngle, O.endAngle - O.startAngle), P = pe(pe({}, O), {}, {
              startAngle: b + x,
              endAngle: b + A(v) + x
            });
            d.push(P), b = P.endAngle;
          } else {
            var S = O.endAngle, T = O.startAngle, E = ue(0, S - T), j = E(v), $ = pe(pe({}, O), {}, {
              startAngle: b + x,
              endAngle: b + j + x
            });
            d.push($), b = $.endAngle;
          }
        }), /* @__PURE__ */ _.createElement(J, null, n.renderSectorsStatically(d));
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
      return a && i && i.length && (!o || !wt(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var n = this, i = this.props, a = i.hide, o = i.sectors, u = i.className, c = i.label, s = i.cx, f = i.cy, l = i.innerRadius, p = i.outerRadius, h = i.isAnimationActive, y = this.state.isAnimationFinished;
      if (a || !o || !o.length || !q(s) || !q(f) || !q(l) || !q(p))
        return null;
      var v = Y("recharts-pie", u);
      return /* @__PURE__ */ _.createElement(J, {
        tabIndex: this.props.rootTabIndex,
        className: v,
        ref: function(g) {
          n.pieRef = g;
        }
      }, this.renderSectors(), c && this.renderLabels(o), $e.renderCallByParent(this.props, null, !1), (!h || y) && Ze.renderCallByParent(this.props, o, !1));
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
      if (/* @__PURE__ */ _.isValidElement(n))
        return /* @__PURE__ */ _.cloneElement(n, i);
      if (G(n))
        return n(i);
      var o = Y("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
      return /* @__PURE__ */ _.createElement(Yt, Ur({}, i, {
        key: a,
        type: "linear",
        className: o
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(n, i, a) {
      if (/* @__PURE__ */ _.isValidElement(n))
        return /* @__PURE__ */ _.cloneElement(n, i);
      var o = a;
      if (G(n) && (o = n(i), /* @__PURE__ */ _.isValidElement(o)))
        return o;
      var u = Y("recharts-pie-label-text", typeof n != "boolean" && !G(n) ? n.className : "");
      return /* @__PURE__ */ _.createElement(Pr, Ur({}, i, {
        alignmentBaseline: "middle",
        className: u
      }), o);
    }
  }]);
})(R.PureComponent);
wa = Ft;
nt(Ft, "displayName", "Pie");
nt(Ft, "defaultProps", {
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
  isAnimationActive: !vt.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
nt(Ft, "parseDeltaAngle", function(e, t) {
  var r = Me(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
nt(Ft, "getRealPieData", function(e) {
  var t = e.data, r = e.children, n = W(e, !1), i = De(r, Xi);
  return t && t.length ? t.map(function(a, o) {
    return pe(pe(pe({
      payload: a
    }, n), a), i && i[o] && i[o].props);
  }) : i && i.length ? i.map(function(a) {
    return pe(pe({}, n), a.props);
  }) : [];
});
nt(Ft, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, i = t.width, a = t.height, o = Ow(i, a), u = n + Le(e.cx, i, i / 2), c = r + Le(e.cy, a, a / 2), s = Le(e.innerRadius, o, 0), f = Le(e.outerRadius, o, o * 0.8), l = e.maxRadius || Math.sqrt(i * i + a * a) / 2;
  return {
    cx: u,
    cy: c,
    innerRadius: s,
    outerRadius: f,
    maxRadius: l
  };
});
nt(Ft, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = t.type.defaultProps !== void 0 ? pe(pe({}, t.type.defaultProps), t.props) : t.props, i = wa.getRealPieData(n);
  if (!i || !i.length)
    return null;
  var a = n.cornerRadius, o = n.startAngle, u = n.endAngle, c = n.paddingAngle, s = n.dataKey, f = n.nameKey, l = n.valueKey, p = n.tooltipType, h = Math.abs(n.minAngle), y = wa.parseCoordinateOfPie(n, r), v = wa.parseDeltaAngle(o, u), d = Math.abs(v), g = s;
  V(s) && V(l) ? (ft(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = "value") : V(s) && (ft(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), g = l);
  var b = i.filter(function(P) {
    return le(P, g, 0) !== 0;
  }).length, O = (d >= 360 ? b : b - 1) * c, w = d - b * h - O, m = i.reduce(function(P, S) {
    var T = le(S, g, 0);
    return P + (q(T) ? T : 0);
  }, 0), x;
  if (m > 0) {
    var A;
    x = i.map(function(P, S) {
      var T = le(P, g, 0), E = le(P, f, S), j = (q(T) ? T : 0) / m, $;
      S ? $ = A.endAngle + Me(v) * c * (T !== 0 ? 1 : 0) : $ = o;
      var I = $ + Me(v) * ((T !== 0 ? h : 0) + j * w), M = ($ + I) / 2, k = (y.innerRadius + y.outerRadius) / 2, N = [{
        name: E,
        value: T,
        payload: P,
        dataKey: g,
        type: p
      }], B = ne(y.cx, y.cy, k, M);
      return A = pe(pe(pe({
        percent: j,
        cornerRadius: a,
        name: E,
        tooltipPayload: N,
        midAngle: M,
        middleRadius: k,
        tooltipPosition: B
      }, P), y), {}, {
        value: le(P, g),
        startAngle: $,
        endAngle: I,
        payload: P,
        paddingAngle: Me(v) * c
      }), A;
    });
  }
  return pe(pe({}, y), {}, {
    sectors: x,
    data: i
  });
});
var Gl, Yb;
function qD() {
  if (Yb) return Gl;
  Yb = 1;
  function e(t) {
    return t && t.length ? t[0] : void 0;
  }
  return Gl = e, Gl;
}
var Vl, Zb;
function BD() {
  return Zb || (Zb = 1, Vl = qD()), Vl;
}
var FD = BD();
const zD = /* @__PURE__ */ ce(FD);
var WD = ["key"];
function pn(e) {
  "@babel/helpers - typeof";
  return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pn(e);
}
function KD(e, t) {
  if (e == null) return {};
  var r = UD(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function UD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function so() {
  return so = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, so.apply(this, arguments);
}
function Jb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ne(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jb(Object(r), !0).forEach(function(n) {
      Et(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function HD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Qb(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ww(n.key), n);
  }
}
function GD(e, t, r) {
  return t && Qb(e.prototype, t), r && Qb(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function VD(e, t, r) {
  return t = lo(t), XD(e, zw() ? Reflect.construct(t, r || [], lo(e).constructor) : t.apply(e, r));
}
function XD(e, t) {
  if (t && (pn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return YD(e);
}
function YD(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function zw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zw = function() {
    return !!e;
  })();
}
function lo(e) {
  return lo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, lo(e);
}
function ZD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && gp(e, t);
}
function gp(e, t) {
  return gp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, gp(e, t);
}
function Et(e, t, r) {
  return t = Ww(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ww(e) {
  var t = JD(e, "string");
  return pn(t) == "symbol" ? t : t + "";
}
function JD(e, t) {
  if (pn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ea = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    HD(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = VD(this, t, [].concat(i)), Et(r, "state", {
      isAnimationFinished: !1
    }), Et(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), Et(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), Et(r, "handleMouseEnter", function(o) {
      var u = r.props.onMouseEnter;
      u && u(r.props, o);
    }), Et(r, "handleMouseLeave", function(o) {
      var u = r.props.onMouseLeave;
      u && u(r.props, o);
    }), r;
  }
  return ZD(t, e), GD(t, [{
    key: "renderDots",
    value: function(n) {
      var i = this.props, a = i.dot, o = i.dataKey, u = W(this.props, !1), c = W(a, !0), s = n.map(function(f, l) {
        var p = Ne(Ne(Ne({
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
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-radar-dots"
      }, s);
    }
  }, {
    key: "renderPolygonStatically",
    value: function(n) {
      var i = this.props, a = i.shape, o = i.dot, u = i.isRange, c = i.baseLinePoints, s = i.connectNulls, f;
      return /* @__PURE__ */ _.isValidElement(a) ? f = /* @__PURE__ */ _.cloneElement(a, Ne(Ne({}, this.props), {}, {
        points: n
      })) : G(a) ? f = a(Ne(Ne({}, this.props), {}, {
        points: n
      })) : f = /* @__PURE__ */ _.createElement(kw, so({}, W(this.props, !0), {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        points: n,
        baseLinePoints: u ? c : null,
        connectNulls: s
      })), /* @__PURE__ */ _.createElement(J, {
        className: "recharts-radar-polygon"
      }, f, o ? this.renderDots(n) : null);
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.points, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state.prevPoints;
      return /* @__PURE__ */ _.createElement(We, {
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
        var h = p.t, y = l && l.length / a.length, v = a.map(function(d, g) {
          var b = l && l[Math.floor(g * y)];
          if (b) {
            var O = ue(b.x, d.x), w = ue(b.y, d.y);
            return Ne(Ne({}, d), {}, {
              x: O(h),
              y: w(h)
            });
          }
          var m = ue(d.cx, d.x), x = ue(d.cy, d.y);
          return Ne(Ne({}, d), {}, {
            x: m(h),
            y: x(h)
          });
        });
        return n.renderPolygonStatically(v);
      });
    }
  }, {
    key: "renderPolygon",
    value: function() {
      var n = this.props, i = n.points, a = n.isAnimationActive, o = n.isRange, u = this.state.prevPoints;
      return a && i && i.length && !o && (!u || !wt(u, i)) ? this.renderPolygonWithAnimation() : this.renderPolygonStatically(i);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.className, o = n.points, u = n.isAnimationActive;
      if (i || !o || !o.length)
        return null;
      var c = this.state.isAnimationFinished, s = Y("recharts-radar", a);
      return /* @__PURE__ */ _.createElement(J, {
        className: s
      }, this.renderPolygon(), (!u || c) && Ze.renderCallByParent(this.props, o));
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
      if (/* @__PURE__ */ _.isValidElement(n))
        a = /* @__PURE__ */ _.cloneElement(n, i);
      else if (G(n))
        a = n(i);
      else {
        var o = i.key, u = KD(i, WD);
        a = /* @__PURE__ */ _.createElement(Nn, so({}, u, {
          key: o,
          className: Y("recharts-radar-dot", typeof n != "boolean" ? n.className : "")
        }));
      }
      return a;
    }
  }]);
})(R.PureComponent);
Et(ea, "displayName", "Radar");
Et(ea, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: !1,
  activeDot: !0,
  dot: !1,
  legendType: "rect",
  isAnimationActive: !vt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
Et(ea, "getComposedData", function(e) {
  var t = e.radiusAxis, r = e.angleAxis, n = e.displayedData, i = e.dataKey, a = e.bandSize, o = r.cx, u = r.cy, c = !1, s = [], f = r.type !== "number" ? a ?? 0 : 0;
  n.forEach(function(p, h) {
    var y = le(p, r.dataKey, h), v = le(p, i), d = r.scale(y) + f, g = Array.isArray(v) ? _w(v) : v, b = V(g) ? void 0 : t.scale(g);
    Array.isArray(v) && v.length >= 2 && (c = !0), s.push(Ne(Ne({}, ne(o, u, b, d)), {}, {
      name: y,
      value: v,
      cx: o,
      cy: u,
      radius: b,
      angle: d,
      payload: p
    }));
  });
  var l = [];
  return c && s.forEach(function(p) {
    if (Array.isArray(p.value)) {
      var h = zD(p.value), y = V(h) ? void 0 : t.scale(h);
      l.push(Ne(Ne({}, p), {}, {
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
function Bi(e) {
  "@babel/helpers - typeof";
  return Bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bi(e);
}
function bp() {
  return bp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, bp.apply(this, arguments);
}
function e0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? e0(Object(r), !0).forEach(function(n) {
      QD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : e0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function QD(e, t, r) {
  return t = eN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eN(e) {
  var t = tN(e, "string");
  return Bi(t) == "symbol" ? t : t + "";
}
function tN(e, t) {
  if (Bi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Bi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function t0(e) {
  return typeof e == "string" ? parseInt(e, 10) : e;
}
function rN(e, t) {
  var r = "".concat(t.cx || e.cx), n = Number(r), i = "".concat(t.cy || e.cy), a = Number(i);
  return Xl(Xl(Xl({}, t), e), {}, {
    cx: n,
    cy: a
  });
}
function r0(e) {
  return /* @__PURE__ */ _.createElement(Li, bp({
    shapeType: "sector",
    propTransformer: rN
  }, e));
}
var nN = ["shape", "activeShape", "activeIndex", "cornerRadius"], iN = ["value", "background"];
function hn(e) {
  "@babel/helpers - typeof";
  return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hn(e);
}
function fo() {
  return fo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, fo.apply(this, arguments);
}
function n0(e, t) {
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
    t % 2 ? n0(Object(r), !0).forEach(function(n) {
      Ar(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function i0(e, t) {
  if (e == null) return {};
  var r = aN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function aN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function oN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function a0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Uw(n.key), n);
  }
}
function uN(e, t, r) {
  return t && a0(e.prototype, t), r && a0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cN(e, t, r) {
  return t = po(t), sN(e, Kw() ? Reflect.construct(t, r || [], po(e).constructor) : t.apply(e, r));
}
function sN(e, t) {
  if (t && (hn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lN(e);
}
function lN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Kw() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Kw = function() {
    return !!e;
  })();
}
function po(e) {
  return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, po(e);
}
function fN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && xp(e, t);
}
function xp(e, t) {
  return xp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, xp(e, t);
}
function Ar(e, t, r) {
  return t = Uw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Uw(e) {
  var t = pN(e, "string");
  return hn(t) == "symbol" ? t : t + "";
}
function pN(e, t) {
  if (hn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (hn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ta = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    oN(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = cN(this, t, [].concat(i)), Ar(r, "state", {
      isAnimationFinished: !1
    }), Ar(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), Ar(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), r;
  }
  return fN(t, e), uN(t, [{
    key: "getDeltaAngle",
    value: function() {
      var n = this.props, i = n.startAngle, a = n.endAngle, o = Me(a - i), u = Math.min(Math.abs(a - i), 360);
      return o * u;
    }
  }, {
    key: "renderSectorsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.activeShape, c = a.activeIndex, s = a.cornerRadius, f = i0(a, nN), l = W(f, !1);
      return n.map(function(p, h) {
        var y = h === c, v = Ee(Ee(Ee(Ee({}, l), {}, {
          cornerRadius: t0(s)
        }, p), Ot(i.props, p, h)), {}, {
          className: "recharts-radial-bar-sector ".concat(p.className),
          forceCornerRadius: f.forceCornerRadius,
          cornerIsExternal: f.cornerIsExternal,
          isActive: y,
          option: y ? u : o
        });
        return /* @__PURE__ */ _.createElement(r0, fo({}, v, {
          key: "sector-".concat(h)
        }));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state.prevData;
      return /* @__PURE__ */ _.createElement(We, {
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
        var h = p.t, y = a.map(function(v, d) {
          var g = l && l[d];
          if (g) {
            var b = ue(g.startAngle, v.startAngle), O = ue(g.endAngle, v.endAngle);
            return Ee(Ee({}, v), {}, {
              startAngle: b(h),
              endAngle: O(h)
            });
          }
          var w = v.endAngle, m = v.startAngle, x = ue(m, w);
          return Ee(Ee({}, v), {}, {
            endAngle: x(h)
          });
        });
        return /* @__PURE__ */ _.createElement(J, null, n.renderSectorsStatically(y));
      });
    }
  }, {
    key: "renderSectors",
    value: function() {
      var n = this.props, i = n.data, a = n.isAnimationActive, o = this.state.prevData;
      return a && i && i.length && (!o || !wt(o, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "renderBackground",
    value: function(n) {
      var i = this, a = this.props.cornerRadius, o = W(this.props.background, !1);
      return n.map(function(u, c) {
        u.value;
        var s = u.background, f = i0(u, iN);
        if (!s)
          return null;
        var l = Ee(Ee(Ee(Ee(Ee({
          cornerRadius: t0(a)
        }, f), {}, {
          fill: "#eee"
        }, s), o), Ot(i.props, u, c)), {}, {
          index: c,
          className: Y("recharts-radial-bar-background-sector", o == null ? void 0 : o.className),
          option: s,
          isActive: !1
        });
        return /* @__PURE__ */ _.createElement(r0, fo({}, l, {
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
      return /* @__PURE__ */ _.createElement(J, {
        className: f
      }, u && /* @__PURE__ */ _.createElement(J, {
        className: "recharts-radial-bar-background"
      }, this.renderBackground(a)), /* @__PURE__ */ _.createElement(J, {
        className: "recharts-radial-bar-sectors"
      }, this.renderSectors()), (!c || s) && Ze.renderCallByParent(Ee({}, this.props), a));
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
})(R.PureComponent);
Ar(ta, "displayName", "RadialBar");
Ar(ta, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  minPointSize: 0,
  hide: !1,
  legendType: "rect",
  data: [],
  isAnimationActive: !vt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  forceCornerRadius: !1,
  cornerIsExternal: !1
});
Ar(ta, "getComposedData", function(e) {
  var t = e.item, r = e.props, n = e.radiusAxis, i = e.radiusAxisTicks, a = e.angleAxis, o = e.angleAxisTicks, u = e.displayedData, c = e.dataKey, s = e.stackedData, f = e.barPosition, l = e.bandSize, p = e.dataStartIndex, h = vw(f, t);
  if (!h)
    return null;
  var y = a.cx, v = a.cy, d = r.layout, g = t.props, b = g.children, O = g.minPointSize, w = d === "radial" ? a : n, m = s ? w.scale.domain() : null, x = gw({
    numericAxis: w
  }), A = De(b, Xi), P = u.map(function(S, T) {
    var E, j, $, I, M, k;
    if (s ? E = yw(s[p + T], m) : (E = le(S, c), Array.isArray(E) || (E = [x, E])), d === "radial") {
      j = Xa({
        axis: n,
        ticks: i,
        bandSize: l,
        offset: h.offset,
        entry: S,
        index: T
      }), M = a.scale(E[1]), I = a.scale(E[0]), $ = j + h.size;
      var N = M - I;
      if (Math.abs(O) > 0 && Math.abs(N) < Math.abs(O)) {
        var B = Me(N || O) * (Math.abs(O) - Math.abs(N));
        M += B;
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
      j = n.scale(E[0]), $ = n.scale(E[1]), I = Xa({
        axis: a,
        ticks: o,
        bandSize: l,
        offset: h.offset,
        entry: S,
        index: T
      }), M = I + h.size;
      var F = $ - j;
      if (Math.abs(O) > 0 && Math.abs(F) < Math.abs(O)) {
        var U = Me(F || O) * (Math.abs(O) - Math.abs(F));
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
      startAngle: I,
      endAngle: M
    }, A && A[T] && A[T].props), {}, {
      tooltipPayload: [Lh(t, S)],
      tooltipPosition: ne(y, v, (j + $) / 2, (I + M) / 2)
    });
  });
  return {
    data: P,
    layout: d
  };
});
var Yl, o0;
function hN() {
  if (o0) return Yl;
  o0 = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, i, a, o) {
    for (var u = -1, c = t(e((i - n) / (a || 1)), 0), s = Array(c); c--; )
      s[o ? c : ++u] = n, n += a;
    return s;
  }
  return Yl = r, Yl;
}
var Zl, u0;
function Hw() {
  if (u0) return Zl;
  u0 = 1;
  var e = uO(), t = 1 / 0, r = 17976931348623157e292;
  function n(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = e(i), i === t || i === -t) {
      var a = i < 0 ? -1 : 1;
      return a * r;
    }
    return i === i ? i : 0;
  }
  return Zl = n, Zl;
}
var Jl, c0;
function dN() {
  if (c0) return Jl;
  c0 = 1;
  var e = hN(), t = Wo(), r = Hw();
  function n(i) {
    return function(a, o, u) {
      return u && typeof u != "number" && t(a, o, u) && (o = u = void 0), a = r(a), o === void 0 ? (o = a, a = 0) : o = r(o), u = u === void 0 ? a < o ? 1 : -1 : r(u), e(a, o, u, i);
    };
  }
  return Jl = n, Jl;
}
var Ql, s0;
function vN() {
  if (s0) return Ql;
  s0 = 1;
  var e = dN(), t = e();
  return Ql = t, Ql;
}
var yN = vN();
const ho = /* @__PURE__ */ ce(yN);
function Fi(e) {
  "@babel/helpers - typeof";
  return Fi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fi(e);
}
function l0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function f0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? l0(Object(r), !0).forEach(function(n) {
      Gw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : l0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gw(e, t, r) {
  return t = mN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mN(e) {
  var t = gN(e, "string");
  return Fi(t) == "symbol" ? t : t + "";
}
function gN(e, t) {
  if (Fi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Fi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bN = ["Webkit", "Moz", "O", "ms"], xN = function(t, r) {
  var n = t.replace(/(\w)/, function(a) {
    return a.toUpperCase();
  }), i = bN.reduce(function(a, o) {
    return f0(f0({}, a), {}, Gw({}, o + n, r));
  }, {});
  return i[t] = r, i;
};
function dn(e) {
  "@babel/helpers - typeof";
  return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, dn(e);
}
function vo() {
  return vo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vo.apply(this, arguments);
}
function p0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ef(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? p0(Object(r), !0).forEach(function(n) {
      Ge(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ON(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function h0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Xw(n.key), n);
  }
}
function wN(e, t, r) {
  return t && h0(e.prototype, t), r && h0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function AN(e, t, r) {
  return t = yo(t), _N(e, Vw() ? Reflect.construct(t, r || [], yo(e).constructor) : t.apply(e, r));
}
function _N(e, t) {
  if (t && (dn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return PN(e);
}
function PN(e) {
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
function yo(e) {
  return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, yo(e);
}
function SN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Op(e, t);
}
function Op(e, t) {
  return Op = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Op(e, t);
}
function Ge(e, t, r) {
  return t = Xw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xw(e) {
  var t = jN(e, "string");
  return dn(t) == "symbol" ? t : t + "";
}
function jN(e, t) {
  if (dn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (dn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var EN = function(t) {
  var r = t.data, n = t.startIndex, i = t.endIndex, a = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var c = r.length, s = ei().domain(ho(0, c)).range([a, a + o - u]), f = s.domain().map(function(l) {
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
}, d0 = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, vn = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return ON(this, t), n = AN(this, t, [r]), Ge(n, "handleDrag", function(i) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(i) : n.state.isSlideMoving && n.handleSlideDrag(i);
    }), Ge(n, "handleTouchMove", function(i) {
      i.changedTouches != null && i.changedTouches.length > 0 && n.handleDrag(i.changedTouches[0]);
    }), Ge(n, "handleDragEnd", function() {
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
    }), Ge(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), Ge(n, "handleEnterSlideOrTraveller", function() {
      n.setState({
        isTextActive: !0
      });
    }), Ge(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({
        isTextActive: !1
      });
    }), Ge(n, "handleSlideDragStart", function(i) {
      var a = d0(i) ? i.changedTouches[0] : i;
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
  return SN(t, e), wN(t, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var i = n.startX, a = n.endX, o = this.state.scaleValues, u = this.props, c = u.gap, s = u.data, f = s.length - 1, l = Math.min(i, a), p = Math.max(i, a), h = t.getIndexInRange(o, l), y = t.getIndexInRange(o, p);
      return {
        startIndex: h - h % c,
        endIndex: y === f ? f : y - y % c
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(n) {
      var i = this.props, a = i.data, o = i.tickFormatter, u = i.dataKey, c = le(a[n], u, n);
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
      var i = this.state, a = i.slideMoveStartX, o = i.startX, u = i.endX, c = this.props, s = c.x, f = c.width, l = c.travellerWidth, p = c.startIndex, h = c.endIndex, y = c.onChange, v = n.pageX - a;
      v > 0 ? v = Math.min(v, s + f - l - u, s + f - l - o) : v < 0 && (v = Math.max(v, s - o, s - u));
      var d = this.getIndex({
        startX: o + v,
        endX: u + v
      });
      (d.startIndex !== p || d.endIndex !== h) && y && y(d), this.setState({
        startX: o + v,
        endX: u + v,
        slideMoveStartX: n.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(n, i) {
      var a = d0(i) ? i.changedTouches[0] : i;
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
      var i = this.state, a = i.brushMoveStartX, o = i.movingTravellerId, u = i.endX, c = i.startX, s = this.state[o], f = this.props, l = f.x, p = f.width, h = f.travellerWidth, y = f.onChange, v = f.gap, d = f.data, g = {
        startX: this.state.startX,
        endX: this.state.endX
      }, b = n.pageX - a;
      b > 0 ? b = Math.min(b, l + p - h - s) : b < 0 && (b = Math.max(b, l - s)), g[o] = s + b;
      var O = this.getIndex(g), w = O.startIndex, m = O.endIndex, x = function() {
        var P = d.length - 1;
        return o === "startX" && (u > c ? w % v === 0 : m % v === 0) || u < c && m === P || o === "endX" && (u > c ? m % v === 0 : w % v === 0) || u > c && m === P;
      };
      this.setState(Ge(Ge({}, o, s + b), "brushMoveStartX", n.pageX), function() {
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
          var h = u[p];
          i === "startX" && h >= s || i === "endX" && h <= c || this.setState(Ge({}, i, h), function() {
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
      return /* @__PURE__ */ _.createElement("rect", {
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
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.data, s = n.children, f = n.padding, l = R.Children.only(s);
      return l ? /* @__PURE__ */ _.cloneElement(l, {
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
      var a, o, u = this, c = this.props, s = c.y, f = c.travellerWidth, l = c.height, p = c.traveller, h = c.ariaLabel, y = c.data, v = c.startIndex, d = c.endIndex, g = Math.max(n, this.props.x), b = ef(ef({}, W(this.props, !1)), {}, {
        x: g,
        y: s,
        width: f,
        height: l
      }), O = h || "Min value: ".concat((a = y[v]) === null || a === void 0 ? void 0 : a.name, ", Max value: ").concat((o = y[d]) === null || o === void 0 ? void 0 : o.name);
      return /* @__PURE__ */ _.createElement(J, {
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
      return /* @__PURE__ */ _.createElement("rect", {
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
      var n = this.props, i = n.startIndex, a = n.endIndex, o = n.y, u = n.height, c = n.travellerWidth, s = n.stroke, f = this.state, l = f.startX, p = f.endX, h = 5, y = {
        pointerEvents: "none",
        fill: s
      };
      return /* @__PURE__ */ _.createElement(J, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ _.createElement(Pr, vo({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(l, p) - h,
        y: o + u / 2
      }, y), this.getTextOfTick(i)), /* @__PURE__ */ _.createElement(Pr, vo({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(l, p) + c + h,
        y: o + u / 2
      }, y), this.getTextOfTick(a)));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.data, a = n.className, o = n.children, u = n.x, c = n.y, s = n.width, f = n.height, l = n.alwaysShowText, p = this.state, h = p.startX, y = p.endX, v = p.isTextActive, d = p.isSlideMoving, g = p.isTravellerMoving, b = p.isTravellerFocused;
      if (!i || !i.length || !q(u) || !q(c) || !q(s) || !q(f) || s <= 0 || f <= 0)
        return null;
      var O = Y("recharts-brush", a), w = _.Children.count(o) === 1, m = xN("userSelect", "none");
      return /* @__PURE__ */ _.createElement(J, {
        className: O,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: m
      }, this.renderBackground(), w && this.renderPanorama(), this.renderSlide(h, y), this.renderTravellerLayer(h, "startX"), this.renderTravellerLayer(y, "endX"), (v || d || g || b || l) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(n) {
      var i = n.x, a = n.y, o = n.width, u = n.height, c = n.stroke, s = Math.floor(a + u / 2) - 1;
      return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("rect", {
        x: i,
        y: a,
        width: o,
        height: u,
        fill: c,
        stroke: "none"
      }), /* @__PURE__ */ _.createElement("line", {
        x1: i + 1,
        y1: s,
        x2: i + o - 1,
        y2: s,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ _.createElement("line", {
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
      return /* @__PURE__ */ _.isValidElement(n) ? a = /* @__PURE__ */ _.cloneElement(n, i) : G(n) ? a = n(i) : a = t.renderDefaultTraveller(i), a;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(n, i) {
      var a = n.data, o = n.width, u = n.x, c = n.travellerWidth, s = n.updateId, f = n.startIndex, l = n.endIndex;
      if (a !== i.prevData || s !== i.prevUpdateId)
        return ef({
          prevData: a,
          prevTravellerWidth: c,
          prevUpdateId: s,
          prevX: u,
          prevWidth: o
        }, a && a.length ? EN({
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
        var p = i.scale.domain().map(function(h) {
          return i.scale(h);
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
})(R.PureComponent);
Ge(vn, "displayName", "Brush");
Ge(vn, "defaultProps", {
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
var tf, v0;
function TN() {
  if (v0) return tf;
  v0 = 1;
  var e = lh();
  function t(r, n) {
    var i;
    return e(r, function(a, o, u) {
      return i = n(a, o, u), !i;
    }), !!i;
  }
  return tf = t, tf;
}
var rf, y0;
function $N() {
  if (y0) return rf;
  y0 = 1;
  var e = Lx(), t = Pt(), r = TN(), n = Ke(), i = Wo();
  function a(o, u, c) {
    var s = n(o) ? e : r;
    return c && i(o, u, c) && (u = void 0), s(o, t(u, 3));
  }
  return rf = a, rf;
}
var MN = $N();
const IN = /* @__PURE__ */ ce(MN);
var xt = function(t, r) {
  var n = t.alwaysShow, i = t.ifOverflow;
  return n && (i = "extendDomain"), i === r;
}, nf, m0;
function CN() {
  if (m0) return nf;
  m0 = 1;
  var e = rO();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return nf = t, nf;
}
var af, g0;
function kN() {
  if (g0) return af;
  g0 = 1;
  var e = CN(), t = eO(), r = Pt();
  function n(i, a) {
    var o = {};
    return a = r(a, 3), t(i, function(u, c, s) {
      e(o, c, a(u, c, s));
    }), o;
  }
  return af = n, af;
}
var RN = kN();
const DN = /* @__PURE__ */ ce(RN);
var of, b0;
function NN() {
  if (b0) return of;
  b0 = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (!r(t[n], n, t))
        return !1;
    return !0;
  }
  return of = e, of;
}
var uf, x0;
function LN() {
  if (x0) return uf;
  x0 = 1;
  var e = lh();
  function t(r, n) {
    var i = !0;
    return e(r, function(a, o, u) {
      return i = !!n(a, o, u), i;
    }), i;
  }
  return uf = t, uf;
}
var cf, O0;
function qN() {
  if (O0) return cf;
  O0 = 1;
  var e = NN(), t = LN(), r = Pt(), n = Ke(), i = Wo();
  function a(o, u, c) {
    var s = n(o) ? e : t;
    return c && i(o, u, c) && (u = void 0), s(o, r(u, 3));
  }
  return cf = a, cf;
}
var BN = qN();
const Yw = /* @__PURE__ */ ce(BN);
var FN = ["x", "y"];
function zi(e) {
  "@babel/helpers - typeof";
  return zi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zi(e);
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
function w0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? w0(Object(r), !0).forEach(function(n) {
      zN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zN(e, t, r) {
  return t = WN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WN(e) {
  var t = KN(e, "string");
  return zi(t) == "symbol" ? t : t + "";
}
function KN(e, t) {
  if (zi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (zi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function UN(e, t) {
  if (e == null) return {};
  var r = HN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function HN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function GN(e, t) {
  var r = e.x, n = e.y, i = UN(e, FN), a = "".concat(r), o = parseInt(a, 10), u = "".concat(n), c = parseInt(u, 10), s = "".concat(t.height || i.height), f = parseInt(s, 10), l = "".concat(t.width || i.width), p = parseInt(l, 10);
  return Xn(Xn(Xn(Xn(Xn({}, t), i), o ? {
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
function A0(e) {
  return /* @__PURE__ */ _.createElement(Li, wp({
    shapeType: "rectangle",
    propTransformer: GN,
    activeClassName: "recharts-active-bar"
  }, e));
}
var VN = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, i) {
    if (typeof t == "number") return t;
    var a = q(n) || k_(n);
    return a ? t(n, i) : (a || jr(), r);
  };
}, XN = ["value", "background"], Zw;
function yn(e) {
  "@babel/helpers - typeof";
  return yn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yn(e);
}
function YN(e, t) {
  if (e == null) return {};
  var r = ZN(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function ZN(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function mo() {
  return mo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, mo.apply(this, arguments);
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
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _0(Object(r), !0).forEach(function(n) {
      Gt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function P0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Qw(n.key), n);
  }
}
function QN(e, t, r) {
  return t && P0(e.prototype, t), r && P0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function e2(e, t, r) {
  return t = go(t), t2(e, Jw() ? Reflect.construct(t, r || [], go(e).constructor) : t.apply(e, r));
}
function t2(e, t) {
  if (t && (yn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return r2(e);
}
function r2(e) {
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
function go(e) {
  return go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, go(e);
}
function n2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ap(e, t);
}
function Ap(e, t) {
  return Ap = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Ap(e, t);
}
function Gt(e, t, r) {
  return t = Qw(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Qw(e) {
  var t = i2(e, "string");
  return yn(t) == "symbol" ? t : t + "";
}
function i2(e, t) {
  if (yn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var kr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    JN(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = e2(this, t, [].concat(i)), Gt(r, "state", {
      isAnimationFinished: !1
    }), Gt(r, "id", Qt("recharts-bar-")), Gt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), o && o();
    }), Gt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), o && o();
    }), r;
  }
  return n2(t, e), QN(t, [{
    key: "renderRectanglesStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.dataKey, c = a.activeIndex, s = a.activeBar, f = W(this.props, !1);
      return n && n.map(function(l, p) {
        var h = p === c, y = h ? s : o, v = xe(xe(xe({}, f), l), {}, {
          isActive: h,
          option: y,
          index: p,
          dataKey: u,
          onAnimationStart: i.handleAnimationStart,
          onAnimationEnd: i.handleAnimationEnd
        });
        return /* @__PURE__ */ _.createElement(J, mo({
          className: "recharts-bar-rectangle"
        }, Ot(i.props, l, p), {
          // https://github.com/recharts/recharts/issues/5415
          // eslint-disable-next-line react/no-array-index-key
          key: "rectangle-".concat(l == null ? void 0 : l.x, "-").concat(l == null ? void 0 : l.y, "-").concat(l == null ? void 0 : l.value, "-").concat(p)
        }), /* @__PURE__ */ _.createElement(A0, v));
      });
    }
  }, {
    key: "renderRectanglesWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.layout, u = i.isAnimationActive, c = i.animationBegin, s = i.animationDuration, f = i.animationEasing, l = i.animationId, p = this.state.prevData;
      return /* @__PURE__ */ _.createElement(We, {
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
      }, function(h) {
        var y = h.t, v = a.map(function(d, g) {
          var b = p && p[g];
          if (b) {
            var O = ue(b.x, d.x), w = ue(b.y, d.y), m = ue(b.width, d.width), x = ue(b.height, d.height);
            return xe(xe({}, d), {}, {
              x: O(y),
              y: w(y),
              width: m(y),
              height: x(y)
            });
          }
          if (o === "horizontal") {
            var A = ue(0, d.height), P = A(y);
            return xe(xe({}, d), {}, {
              y: d.y + d.height - P,
              height: P
            });
          }
          var S = ue(0, d.width), T = S(y);
          return xe(xe({}, d), {}, {
            width: T
          });
        });
        return /* @__PURE__ */ _.createElement(J, null, n.renderRectanglesStatically(v));
      });
    }
  }, {
    key: "renderRectangles",
    value: function() {
      var n = this.props, i = n.data, a = n.isAnimationActive, o = this.state.prevData;
      return a && i && i.length && (!o || !wt(o, i)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(i);
    }
  }, {
    key: "renderBackground",
    value: function() {
      var n = this, i = this.props, a = i.data, o = i.dataKey, u = i.activeIndex, c = W(this.props.background, !1);
      return a.map(function(s, f) {
        s.value;
        var l = s.background, p = YN(s, XN);
        if (!l)
          return null;
        var h = xe(xe(xe(xe(xe({}, p), {}, {
          fill: "#eee"
        }, l), c), Ot(n.props, s, f)), {}, {
          onAnimationStart: n.handleAnimationStart,
          onAnimationEnd: n.handleAnimationEnd,
          dataKey: o,
          index: f,
          className: "recharts-bar-background-rectangle"
        });
        return /* @__PURE__ */ _.createElement(A0, mo({
          key: "background-bar-".concat(f),
          option: n.props.background,
          isActive: f === u
        }, h));
      });
    }
  }, {
    key: "renderErrorBar",
    value: function(n, i) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished)
        return null;
      var a = this.props, o = a.data, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = De(f, Dn);
      if (!l)
        return null;
      var p = s === "vertical" ? o[0].height / 2 : o[0].width / 2, h = function(d, g) {
        var b = Array.isArray(d.value) ? d.value[1] : d.value;
        return {
          x: d.x,
          y: d.y,
          value: b,
          errorVal: le(d, g)
        };
      }, y = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ _.createElement(J, y, l.map(function(v) {
        return /* @__PURE__ */ _.cloneElement(v, {
          key: "error-bar-".concat(i, "-").concat(v.props.dataKey),
          data: o,
          xAxis: u,
          yAxis: c,
          layout: s,
          offset: p,
          dataPointFormatter: h
        });
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.data, o = n.className, u = n.xAxis, c = n.yAxis, s = n.left, f = n.top, l = n.width, p = n.height, h = n.isAnimationActive, y = n.background, v = n.id;
      if (i || !a || !a.length)
        return null;
      var d = this.state.isAnimationFinished, g = Y("recharts-bar", o), b = u && u.allowDataOverflow, O = c && c.allowDataOverflow, w = b || O, m = V(v) ? this.id : v;
      return /* @__PURE__ */ _.createElement(J, {
        className: g
      }, b || O ? /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-".concat(m)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: b ? s : s - l / 2,
        y: O ? f : f - p / 2,
        width: b ? l : l * 2,
        height: O ? p : p * 2
      }))) : null, /* @__PURE__ */ _.createElement(J, {
        className: "recharts-bar-rectangles",
        clipPath: w ? "url(#clipPath-".concat(m, ")") : null
      }, y ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(w, m), (!h || d) && Ze.renderCallByParent(this.props, a));
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
})(R.PureComponent);
Zw = kr;
Gt(kr, "displayName", "Bar");
Gt(kr, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  legendType: "rect",
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: "vertical",
  activeBar: !1,
  isAnimationActive: !vt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease"
});
Gt(kr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.barPosition, i = e.bandSize, a = e.xAxis, o = e.yAxis, u = e.xAxisTicks, c = e.yAxisTicks, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, p = e.offset, h = vw(n, r);
  if (!h)
    return null;
  var y = t.layout, v = r.type.defaultProps, d = v !== void 0 ? xe(xe({}, v), r.props) : r.props, g = d.dataKey, b = d.children, O = d.minPointSize, w = y === "horizontal" ? o : a, m = s ? w.scale.domain() : null, x = gw({
    numericAxis: w
  }), A = De(b, Xi), P = l.map(function(S, T) {
    var E, j, $, I, M, k;
    s ? E = yw(s[f + T], m) : (E = le(S, g), Array.isArray(E) || (E = [x, E]));
    var N = VN(O, Zw.defaultProps.minPointSize)(E[1], T);
    if (y === "horizontal") {
      var B, F = [o.scale(E[0]), o.scale(E[1])], U = F[0], Z = F[1];
      j = Xa({
        axis: a,
        ticks: u,
        bandSize: i,
        offset: h.offset,
        entry: S,
        index: T
      }), $ = (B = Z ?? U) !== null && B !== void 0 ? B : void 0, I = h.size;
      var K = U - Z;
      if (M = Number.isNaN(K) ? 0 : K, k = {
        x: j,
        y: o.y,
        width: I,
        height: o.height
      }, Math.abs(N) > 0 && Math.abs(M) < Math.abs(N)) {
        var Q = Me(M || N) * (Math.abs(N) - Math.abs(M));
        $ -= Q, M += Q;
      }
    } else {
      var de = [a.scale(E[0]), a.scale(E[1])], be = de[0], Ue = de[1];
      if (j = be, $ = Xa({
        axis: o,
        ticks: c,
        bandSize: i,
        offset: h.offset,
        entry: S,
        index: T
      }), I = Ue - be, M = h.size, k = {
        x: a.x,
        y: $,
        width: a.width,
        height: M
      }, Math.abs(N) > 0 && Math.abs(I) < Math.abs(N)) {
        var or = Me(I || N) * (Math.abs(N) - Math.abs(I));
        I += or;
      }
    }
    return xe(xe(xe({}, S), {}, {
      x: j,
      y: $,
      width: I,
      height: M,
      value: s ? E : E[1],
      payload: S,
      background: k
    }, A && A[T] && A[T].props), {}, {
      tooltipPayload: [Lh(r, S)],
      tooltipPosition: {
        x: j + I / 2,
        y: $ + M / 2
      }
    });
  });
  return xe({
    data: P,
    layout: y
  }, p);
});
function Wi(e) {
  "@babel/helpers - typeof";
  return Wi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wi(e);
}
function a2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function S0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, eA(n.key), n);
  }
}
function o2(e, t, r) {
  return t && S0(e.prototype, t), r && S0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
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
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? j0(Object(r), !0).forEach(function(n) {
      iu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : j0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iu(e, t, r) {
  return t = eA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function eA(e) {
  var t = u2(e, "string");
  return Wi(t) == "symbol" ? t : t + "";
}
function u2(e, t) {
  if (Wi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Wi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var au = function(t, r, n, i, a) {
  var o = t.width, u = t.height, c = t.layout, s = t.children, f = Object.keys(r), l = {
    left: n.left,
    leftMirror: n.left,
    right: o - n.right,
    rightMirror: o - n.right,
    top: n.top,
    topMirror: n.top,
    bottom: u - n.bottom,
    bottomMirror: u - n.bottom
  }, p = !!Ve(s, kr);
  return f.reduce(function(h, y) {
    var v = r[y], d = v.orientation, g = v.domain, b = v.padding, O = b === void 0 ? {} : b, w = v.mirror, m = v.reversed, x = "".concat(d).concat(w ? "Mirror" : ""), A, P, S, T, E;
    if (v.type === "number" && (v.padding === "gap" || v.padding === "no-gap")) {
      var j = g[1] - g[0], $ = 1 / 0, I = v.categoricalDomain.sort(L_);
      if (I.forEach(function(de, be) {
        be > 0 && ($ = Math.min((de || 0) - (I[be - 1] || 0), $));
      }), Number.isFinite($)) {
        var M = $ / j, k = v.layout === "vertical" ? n.height : n.width;
        if (v.padding === "gap" && (A = M * k / 2), v.padding === "no-gap") {
          var N = Le(t.barCategoryGap, M * k), B = M * k / 2;
          A = B - N - (B - N) / k * N;
        }
      }
    }
    i === "xAxis" ? P = [n.left + (O.left || 0) + (A || 0), n.left + n.width - (O.right || 0) - (A || 0)] : i === "yAxis" ? P = c === "horizontal" ? [n.top + n.height - (O.bottom || 0), n.top + (O.top || 0)] : [n.top + (O.top || 0) + (A || 0), n.top + n.height - (O.bottom || 0) - (A || 0)] : P = v.range, m && (P = [P[1], P[0]]);
    var F = hw(v, a, p), U = F.scale, Z = F.realScaleType;
    U.domain(g).range(P), dw(U);
    var K = mw(U, ct(ct({}, v), {}, {
      realScaleType: Z
    }));
    i === "xAxis" ? (E = d === "top" && !w || d === "bottom" && w, S = n.left, T = l[x] - E * v.height) : i === "yAxis" && (E = d === "left" && !w || d === "right" && w, S = l[x] - E * v.width, T = n.top);
    var Q = ct(ct(ct({}, v), K), {}, {
      realScaleType: Z,
      x: S,
      y: T,
      scale: U,
      width: i === "xAxis" ? n.width : v.width,
      height: i === "yAxis" ? n.height : v.height
    });
    return Q.bandSize = Ya(Q, K), !v.hide && i === "xAxis" ? l[x] += (E ? -1 : 1) * Q.height : v.hide || (l[x] += (E ? -1 : 1) * Q.width), ct(ct({}, h), {}, iu({}, y, Q));
  }, {});
}, tA = function(t, r) {
  var n = t.x, i = t.y, a = r.x, o = r.y;
  return {
    x: Math.min(n, a),
    y: Math.min(i, o),
    width: Math.abs(a - n),
    height: Math.abs(o - i)
  };
}, c2 = function(t) {
  var r = t.x1, n = t.y1, i = t.x2, a = t.y2;
  return tA({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
}, rA = /* @__PURE__ */ (function() {
  function e(t) {
    a2(this, e), this.scale = t;
  }
  return o2(e, [{
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
iu(rA, "EPS", 1e-4);
var Fh = function(t) {
  var r = Object.keys(t).reduce(function(n, i) {
    return ct(ct({}, n), {}, iu({}, i, rA.create(t[i])));
  }, {});
  return ct(ct({}, r), {}, {
    apply: function(i) {
      var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = a.bandAware, u = a.position;
      return DN(i, function(c, s) {
        return r[s].apply(c, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(i) {
      return Yw(i, function(a, o) {
        return r[o].isInRange(a);
      });
    }
  });
};
function s2(e) {
  return (e % 180 + 180) % 180;
}
var l2 = function(t) {
  var r = t.width, n = t.height, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = s2(i), o = a * Math.PI / 180, u = Math.atan(n / r), c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(c);
}, sf, E0;
function f2() {
  if (E0) return sf;
  E0 = 1;
  var e = Pt(), t = Vi(), r = Fo();
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
  return sf = n, sf;
}
var lf, T0;
function p2() {
  if (T0) return lf;
  T0 = 1;
  var e = Hw();
  function t(r) {
    var n = e(r), i = n % 1;
    return n === n ? i ? n - i : n : 0;
  }
  return lf = t, lf;
}
var ff, $0;
function h2() {
  if ($0) return ff;
  $0 = 1;
  var e = Xx(), t = Pt(), r = p2(), n = Math.max;
  function i(a, o, u) {
    var c = a == null ? 0 : a.length;
    if (!c)
      return -1;
    var s = u == null ? 0 : r(u);
    return s < 0 && (s = n(c + s, 0)), e(a, t(o, 3), s);
  }
  return ff = i, ff;
}
var pf, M0;
function d2() {
  if (M0) return pf;
  M0 = 1;
  var e = f2(), t = h2(), r = e(t);
  return pf = r, pf;
}
var v2 = d2();
const y2 = /* @__PURE__ */ ce(v2);
var m2 = lx();
const g2 = /* @__PURE__ */ ce(m2);
var b2 = g2(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
}), zh = /* @__PURE__ */ R.createContext(void 0), Wh = /* @__PURE__ */ R.createContext(void 0), nA = /* @__PURE__ */ R.createContext(void 0), iA = /* @__PURE__ */ R.createContext({}), aA = /* @__PURE__ */ R.createContext(void 0), oA = /* @__PURE__ */ R.createContext(0), uA = /* @__PURE__ */ R.createContext(0), I0 = function(t) {
  var r = t.state, n = r.xAxisMap, i = r.yAxisMap, a = r.offset, o = t.clipPathId, u = t.children, c = t.width, s = t.height, f = b2(a);
  return /* @__PURE__ */ _.createElement(zh.Provider, {
    value: n
  }, /* @__PURE__ */ _.createElement(Wh.Provider, {
    value: i
  }, /* @__PURE__ */ _.createElement(iA.Provider, {
    value: a
  }, /* @__PURE__ */ _.createElement(nA.Provider, {
    value: f
  }, /* @__PURE__ */ _.createElement(aA.Provider, {
    value: o
  }, /* @__PURE__ */ _.createElement(oA.Provider, {
    value: s
  }, /* @__PURE__ */ _.createElement(uA.Provider, {
    value: c
  }, u)))))));
}, x2 = function() {
  return R.useContext(aA);
}, cA = function(t) {
  var r = R.useContext(zh);
  r == null && jr();
  var n = r[t];
  return n == null && jr(), n;
}, O2 = function() {
  var t = R.useContext(zh);
  return Ut(t);
}, w2 = function() {
  var t = R.useContext(Wh), r = y2(t, function(n) {
    return Yw(n.domain, Number.isFinite);
  });
  return r || Ut(t);
}, sA = function(t) {
  var r = R.useContext(Wh);
  r == null && jr();
  var n = r[t];
  return n == null && jr(), n;
}, A2 = function() {
  var t = R.useContext(nA);
  return t;
}, _2 = function() {
  return R.useContext(iA);
}, Kh = function() {
  return R.useContext(uA);
}, Uh = function() {
  return R.useContext(oA);
};
function mn(e) {
  "@babel/helpers - typeof";
  return mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mn(e);
}
function P2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function S2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, fA(n.key), n);
  }
}
function j2(e, t, r) {
  return t && S2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function E2(e, t, r) {
  return t = bo(t), T2(e, lA() ? Reflect.construct(t, r || [], bo(e).constructor) : t.apply(e, r));
}
function T2(e, t) {
  if (t && (mn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $2(e);
}
function $2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function lA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (lA = function() {
    return !!e;
  })();
}
function bo(e) {
  return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, bo(e);
}
function M2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && _p(e, t);
}
function _p(e, t) {
  return _p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, _p(e, t);
}
function C0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function k0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? C0(Object(r), !0).forEach(function(n) {
      Hh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : C0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Hh(e, t, r) {
  return t = fA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fA(e) {
  var t = I2(e, "string");
  return mn(t) == "symbol" ? t : t + "";
}
function I2(e, t) {
  if (mn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (mn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function C2(e, t) {
  return N2(e) || D2(e, t) || R2(e, t) || k2();
}
function k2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function R2(e, t) {
  if (e) {
    if (typeof e == "string") return R0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return R0(e, t);
  }
}
function R0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function D2(e, t) {
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
function N2(e) {
  if (Array.isArray(e)) return e;
}
function Pp() {
  return Pp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pp.apply(this, arguments);
}
var L2 = function(t, r) {
  var n;
  return /* @__PURE__ */ _.isValidElement(t) ? n = /* @__PURE__ */ _.cloneElement(t, r) : G(t) ? n = t(r) : n = /* @__PURE__ */ _.createElement("line", Pp({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, q2 = function(t, r, n, i, a, o, u, c, s) {
  var f = a.x, l = a.y, p = a.width, h = a.height;
  if (n) {
    var y = s.y, v = t.y.apply(y, {
      position: o
    });
    if (xt(s, "discard") && !t.y.isInRange(v))
      return null;
    var d = [{
      x: f + p,
      y: v
    }, {
      x: f,
      y: v
    }];
    return c === "left" ? d.reverse() : d;
  }
  if (r) {
    var g = s.x, b = t.x.apply(g, {
      position: o
    });
    if (xt(s, "discard") && !t.x.isInRange(b))
      return null;
    var O = [{
      x: b,
      y: l + h
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
    return xt(s, "discard") && IN(m, function(x) {
      return !t.isInRange(x);
    }) ? null : m;
  }
  return null;
};
function B2(e) {
  var t = e.x, r = e.y, n = e.segment, i = e.xAxisId, a = e.yAxisId, o = e.shape, u = e.className, c = e.alwaysShow, s = x2(), f = cA(i), l = sA(a), p = A2();
  if (!s || !p)
    return null;
  ft(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = Fh({
    x: f.scale,
    y: l.scale
  }), y = Se(t), v = Se(r), d = n && n.length === 2, g = q2(h, y, v, d, p, e.position, f.orientation, l.orientation, e);
  if (!g)
    return null;
  var b = C2(g, 2), O = b[0], w = O.x, m = O.y, x = b[1], A = x.x, P = x.y, S = xt(e, "hidden") ? "url(#".concat(s, ")") : void 0, T = k0(k0({
    clipPath: S
  }, W(e, !0)), {}, {
    x1: w,
    y1: m,
    x2: A,
    y2: P
  });
  return /* @__PURE__ */ _.createElement(J, {
    className: Y("recharts-reference-line", u)
  }, L2(o, T), $e.renderCallByParent(e, c2({
    x1: w,
    y1: m,
    x2: A,
    y2: P
  })));
}
var Gh = /* @__PURE__ */ (function(e) {
  function t() {
    return P2(this, t), E2(this, t, arguments);
  }
  return M2(t, e), j2(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ _.createElement(B2, this.props);
    }
  }]);
})(_.Component);
Hh(Gh, "displayName", "ReferenceLine");
Hh(Gh, "defaultProps", {
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
function Sp() {
  return Sp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Sp.apply(this, arguments);
}
function gn(e) {
  "@babel/helpers - typeof";
  return gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gn(e);
}
function D0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function N0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? D0(Object(r), !0).forEach(function(n) {
      ou(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : D0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function F2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function z2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, hA(n.key), n);
  }
}
function W2(e, t, r) {
  return t && z2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function K2(e, t, r) {
  return t = xo(t), U2(e, pA() ? Reflect.construct(t, r || [], xo(e).constructor) : t.apply(e, r));
}
function U2(e, t) {
  if (t && (gn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return H2(e);
}
function H2(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function pA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (pA = function() {
    return !!e;
  })();
}
function xo(e) {
  return xo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xo(e);
}
function G2(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && jp(e, t);
}
function jp(e, t) {
  return jp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, jp(e, t);
}
function ou(e, t, r) {
  return t = hA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function hA(e) {
  var t = V2(e, "string");
  return gn(t) == "symbol" ? t : t + "";
}
function V2(e, t) {
  if (gn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var X2 = function(t) {
  var r = t.x, n = t.y, i = t.xAxis, a = t.yAxis, o = Fh({
    x: i.scale,
    y: a.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return xt(t, "discard") && !o.isInRange(u) ? null : u;
}, uu = /* @__PURE__ */ (function(e) {
  function t() {
    return F2(this, t), K2(this, t, arguments);
  }
  return G2(t, e), W2(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x, a = n.y, o = n.r, u = n.alwaysShow, c = n.clipPathId, s = Se(i), f = Se(a);
      if (ft(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !s || !f)
        return null;
      var l = X2(this.props);
      if (!l)
        return null;
      var p = l.x, h = l.y, y = this.props, v = y.shape, d = y.className, g = xt(this.props, "hidden") ? "url(#".concat(c, ")") : void 0, b = N0(N0({
        clipPath: g
      }, W(this.props, !0)), {}, {
        cx: p,
        cy: h
      });
      return /* @__PURE__ */ _.createElement(J, {
        className: Y("recharts-reference-dot", d)
      }, t.renderDot(v, b), $e.renderCallByParent(this.props, {
        x: p - o,
        y: h - o,
        width: 2 * o,
        height: 2 * o
      }));
    }
  }]);
})(_.Component);
ou(uu, "displayName", "ReferenceDot");
ou(uu, "defaultProps", {
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
ou(uu, "renderDot", function(e, t) {
  var r;
  return /* @__PURE__ */ _.isValidElement(e) ? r = /* @__PURE__ */ _.cloneElement(e, t) : G(e) ? r = e(t) : r = /* @__PURE__ */ _.createElement(Nn, Sp({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
});
function Ep() {
  return Ep = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ep.apply(this, arguments);
}
function bn(e) {
  "@babel/helpers - typeof";
  return bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bn(e);
}
function L0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function q0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? L0(Object(r), !0).forEach(function(n) {
      cu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : L0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y2(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Z2(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, vA(n.key), n);
  }
}
function J2(e, t, r) {
  return t && Z2(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Q2(e, t, r) {
  return t = Oo(t), eL(e, dA() ? Reflect.construct(t, r || [], Oo(e).constructor) : t.apply(e, r));
}
function eL(e, t) {
  if (t && (bn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return tL(e);
}
function tL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function dA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (dA = function() {
    return !!e;
  })();
}
function Oo(e) {
  return Oo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Oo(e);
}
function rL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Tp(e, t);
}
function Tp(e, t) {
  return Tp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Tp(e, t);
}
function cu(e, t, r) {
  return t = vA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vA(e) {
  var t = nL(e, "string");
  return bn(t) == "symbol" ? t : t + "";
}
function nL(e, t) {
  if (bn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (bn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var iL = function(t, r, n, i, a) {
  var o = a.x1, u = a.x2, c = a.y1, s = a.y2, f = a.xAxis, l = a.yAxis;
  if (!f || !l) return null;
  var p = Fh({
    x: f.scale,
    y: l.scale
  }), h = {
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
  return xt(a, "discard") && (!p.isInRange(h) || !p.isInRange(y)) ? null : tA(h, y);
}, su = /* @__PURE__ */ (function(e) {
  function t() {
    return Y2(this, t), Q2(this, t, arguments);
  }
  return rL(t, e), J2(t, [{
    key: "render",
    value: function() {
      var n = this.props, i = n.x1, a = n.x2, o = n.y1, u = n.y2, c = n.className, s = n.alwaysShow, f = n.clipPathId;
      ft(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
      var l = Se(i), p = Se(a), h = Se(o), y = Se(u), v = this.props.shape;
      if (!l && !p && !h && !y && !v)
        return null;
      var d = iL(l, p, h, y, this.props);
      if (!d && !v)
        return null;
      var g = xt(this.props, "hidden") ? "url(#".concat(f, ")") : void 0;
      return /* @__PURE__ */ _.createElement(J, {
        className: Y("recharts-reference-area", c)
      }, t.renderRect(v, q0(q0({
        clipPath: g
      }, W(this.props, !0)), d)), $e.renderCallByParent(this.props, d));
    }
  }]);
})(_.Component);
cu(su, "displayName", "ReferenceArea");
cu(su, "defaultProps", {
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
cu(su, "renderRect", function(e, t) {
  var r;
  return /* @__PURE__ */ _.isValidElement(e) ? r = /* @__PURE__ */ _.cloneElement(e, t) : G(e) ? r = e(t) : r = /* @__PURE__ */ _.createElement(Bh, Ep({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
});
function yA(e, t, r) {
  if (t < 1)
    return [];
  if (t === 1 && r === void 0)
    return e;
  for (var n = [], i = 0; i < e.length; i += t)
    n.push(e[i]);
  return n;
}
function aL(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return l2(n, r);
}
function oL(e, t, r) {
  var n = r === "width", i = e.x, a = e.y, o = e.width, u = e.height;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + u
  } : {
    start: n ? i + o : a + u,
    end: n ? i : a
  };
}
function wo(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function uL(e, t) {
  return yA(e, t + 1);
}
function cL(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = t.start, u = t.end, c = 0, s = 1, f = o, l = function() {
    var y = n == null ? void 0 : n[c];
    if (y === void 0)
      return {
        v: yA(n, s)
      };
    var v = c, d, g = function() {
      return d === void 0 && (d = r(y, v)), d;
    }, b = y.coordinate, O = c === 0 || wo(e, b, g, f, u);
    O || (c = 0, f = o, s += 1), O && (f = b + e * (g() / 2 + i), c += s);
  }, p; s <= a.length; )
    if (p = l(), p) return p.v;
  return [];
}
function Ki(e) {
  "@babel/helpers - typeof";
  return Ki = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ki(e);
}
function B0(e, t) {
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
    t % 2 ? B0(Object(r), !0).forEach(function(n) {
      sL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : B0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sL(e, t, r) {
  return t = lL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function lL(e) {
  var t = fL(e, "string");
  return Ki(t) == "symbol" ? t : t + "";
}
function fL(e, t) {
  if (Ki(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ki(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function pL(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, u = t.start, c = t.end, s = function(p) {
    var h = a[p], y, v = function() {
      return y === void 0 && (y = r(h, p)), y;
    };
    if (p === o - 1) {
      var d = e * (h.coordinate + e * v() / 2 - c);
      a[p] = h = ke(ke({}, h), {}, {
        tickCoord: d > 0 ? h.coordinate - d * e : h.coordinate
      });
    } else
      a[p] = h = ke(ke({}, h), {}, {
        tickCoord: h.coordinate
      });
    var g = wo(e, h.tickCoord, v, u, c);
    g && (c = h.tickCoord - e * (v() / 2 + i), a[p] = ke(ke({}, h), {}, {
      isShow: !0
    }));
  }, f = o - 1; f >= 0; f--)
    s(f);
  return a;
}
function hL(e, t, r, n, i, a) {
  var o = (n || []).slice(), u = o.length, c = t.start, s = t.end;
  if (a) {
    var f = n[u - 1], l = r(f, u - 1), p = e * (f.coordinate + e * l / 2 - s);
    o[u - 1] = f = ke(ke({}, f), {}, {
      tickCoord: p > 0 ? f.coordinate - p * e : f.coordinate
    });
    var h = wo(e, f.tickCoord, function() {
      return l;
    }, c, s);
    h && (s = f.tickCoord - e * (l / 2 + i), o[u - 1] = ke(ke({}, f), {}, {
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
    var A = wo(e, O.tickCoord, m, c, s);
    A && (c = O.tickCoord + e * (m() / 2 + i), o[b] = ke(ke({}, O), {}, {
      isShow: !0
    }));
  }, d = 0; d < y; d++)
    v(d);
  return o;
}
function Vh(e, t, r) {
  var n = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, u = e.orientation, c = e.interval, s = e.tickFormatter, f = e.unit, l = e.angle;
  if (!i || !i.length || !n)
    return [];
  if (q(c) || vt.isSsr)
    return uL(i, typeof c == "number" && q(c) ? c : 0);
  var p = [], h = u === "top" || u === "bottom" ? "width" : "height", y = f && h === "width" ? Qn(f, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, v = function(O, w) {
    var m = G(s) ? s(O.value, w) : O.value;
    return h === "width" ? aL(Qn(m, {
      fontSize: t,
      letterSpacing: r
    }), y, l) : Qn(m, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, d = i.length >= 2 ? Me(i[1].coordinate - i[0].coordinate) : 1, g = oL(a, d, h);
  return c === "equidistantPreserveStart" ? cL(d, g, v, i, o) : (c === "preserveStart" || c === "preserveStartEnd" ? p = hL(d, g, v, i, o, c === "preserveStartEnd") : p = pL(d, g, v, i, o), p.filter(function(b) {
    return b.isShow;
  }));
}
var dL = ["viewBox"], vL = ["viewBox"], yL = ["ticks"];
function xn(e) {
  "@babel/helpers - typeof";
  return xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xn(e);
}
function Hr() {
  return Hr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hr.apply(this, arguments);
}
function F0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? F0(Object(r), !0).forEach(function(n) {
      Xh(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : F0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hf(e, t) {
  if (e == null) return {};
  var r = mL(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function mL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function gL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function z0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, gA(n.key), n);
  }
}
function bL(e, t, r) {
  return t && z0(e.prototype, t), r && z0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function xL(e, t, r) {
  return t = Ao(t), OL(e, mA() ? Reflect.construct(t, r || [], Ao(e).constructor) : t.apply(e, r));
}
function OL(e, t) {
  if (t && (xn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return wL(e);
}
function wL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function mA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (mA = function() {
    return !!e;
  })();
}
function Ao(e) {
  return Ao = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ao(e);
}
function AL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && $p(e, t);
}
function $p(e, t) {
  return $p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, $p(e, t);
}
function Xh(e, t, r) {
  return t = gA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gA(e) {
  var t = _L(e, "string");
  return xn(t) == "symbol" ? t : t + "";
}
function _L(e, t) {
  if (xn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (xn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var qn = /* @__PURE__ */ (function(e) {
  function t(r) {
    var n;
    return gL(this, t), n = xL(this, t, [r]), n.state = {
      fontSize: "",
      letterSpacing: ""
    }, n;
  }
  return AL(t, e), bL(t, [{
    key: "shouldComponentUpdate",
    value: function(n, i) {
      var a = n.viewBox, o = hf(n, dL), u = this.props, c = u.viewBox, s = hf(u, vL);
      return !Vr(a, c) || !Vr(o, s) || !Vr(i, this.state);
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
      var i = this.props, a = i.x, o = i.y, u = i.width, c = i.height, s = i.orientation, f = i.tickSize, l = i.mirror, p = i.tickMargin, h, y, v, d, g, b, O = l ? -1 : 1, w = n.tickSize || f, m = q(n.tickCoord) ? n.tickCoord : n.coordinate;
      switch (s) {
        case "top":
          h = y = n.coordinate, d = o + +!l * c, v = d - O * w, b = v - O * p, g = m;
          break;
        case "left":
          v = d = n.coordinate, y = a + +!l * u, h = y - O * w, g = h - O * p, b = m;
          break;
        case "right":
          v = d = n.coordinate, y = a + +l * u, h = y + O * w, g = h + O * p, b = m;
          break;
        default:
          h = y = n.coordinate, d = o + +l * c, v = d + O * w, b = v + O * p, g = m;
          break;
      }
      return {
        line: {
          x1: h,
          y1: v,
          x2: y,
          y2: d
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
      var n = this.props, i = n.x, a = n.y, o = n.width, u = n.height, c = n.orientation, s = n.mirror, f = n.axisLine, l = _e(_e(_e({}, W(this.props, !1)), W(f, !1)), {}, {
        fill: "none"
      });
      if (c === "top" || c === "bottom") {
        var p = +(c === "top" && !s || c === "bottom" && s);
        l = _e(_e({}, l), {}, {
          x1: i,
          y1: a + p * u,
          x2: i + o,
          y2: a + p * u
        });
      } else {
        var h = +(c === "left" && !s || c === "right" && s);
        l = _e(_e({}, l), {}, {
          x1: i + h * o,
          y1: a,
          x2: i + h * o,
          y2: a + u
        });
      }
      return /* @__PURE__ */ _.createElement("line", Hr({}, l, {
        className: Y("recharts-cartesian-axis-line", Ye(f, "className"))
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
        var o = this, u = this.props, c = u.tickLine, s = u.stroke, f = u.tick, l = u.tickFormatter, p = u.unit, h = Vh(_e(_e({}, this.props), {}, {
          ticks: n
        }), i, a), y = this.getTickTextAnchor(), v = this.getTickVerticalAnchor(), d = W(this.props, !1), g = W(f, !1), b = _e(_e({}, d), {}, {
          fill: "none"
        }, W(c, !1)), O = h.map(function(w, m) {
          var x = o.getTickLineCoord(w), A = x.line, P = x.tick, S = _e(_e(_e(_e({
            textAnchor: y,
            verticalAnchor: v
          }, d), {}, {
            stroke: "none",
            fill: s
          }, g), P), {}, {
            index: m,
            payload: w,
            visibleTicksCount: h.length,
            tickFormatter: l
          });
          return /* @__PURE__ */ _.createElement(J, Hr({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(w.value, "-").concat(w.coordinate, "-").concat(w.tickCoord)
          }, Ot(o.props, w, m)), c && /* @__PURE__ */ _.createElement("line", Hr({}, b, A, {
            className: Y("recharts-cartesian-axis-tick-line", Ye(c, "className"))
          })), f && t.renderTickItem(f, S, "".concat(G(l) ? l(w.value, m) : w.value).concat(p || "")));
        });
        return /* @__PURE__ */ _.createElement("g", {
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
      var l = this.props, p = l.ticks, h = hf(l, yL), y = p;
      return G(c) && (y = p && p.length > 0 ? c(this.props) : c(h)), o <= 0 || u <= 0 || !y || !y.length ? null : /* @__PURE__ */ _.createElement(J, {
        className: Y("recharts-cartesian-axis", s),
        ref: function(d) {
          n.layerReference = d;
        }
      }, a && this.renderAxisLine(), this.renderTicks(y, this.state.fontSize, this.state.letterSpacing), $e.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function(n, i, a) {
      var o, u = Y(i.className, "recharts-cartesian-axis-tick-value");
      return /* @__PURE__ */ _.isValidElement(n) ? o = /* @__PURE__ */ _.cloneElement(n, _e(_e({}, i), {}, {
        className: u
      })) : G(n) ? o = n(_e(_e({}, i), {}, {
        className: u
      })) : o = /* @__PURE__ */ _.createElement(Pr, Hr({}, i, {
        className: "recharts-cartesian-axis-tick-value"
      }), a), o;
    }
  }]);
})(R.Component);
Xh(qn, "displayName", "CartesianAxis");
Xh(qn, "defaultProps", {
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
var PL = ["x1", "y1", "x2", "y2", "key"], SL = ["offset"];
function Er(e) {
  "@babel/helpers - typeof";
  return Er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Er(e);
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
function Re(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? W0(Object(r), !0).forEach(function(n) {
      jL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : W0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function jL(e, t, r) {
  return t = EL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EL(e) {
  var t = TL(e, "string");
  return Er(t) == "symbol" ? t : t + "";
}
function TL(e, t) {
  if (Er(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Er(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gr() {
  return gr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gr.apply(this, arguments);
}
function K0(e, t) {
  if (e == null) return {};
  var r = $L(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function $L(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
var ML = function(t) {
  var r = t.fill;
  if (!r || r === "none")
    return null;
  var n = t.fillOpacity, i = t.x, a = t.y, o = t.width, u = t.height, c = t.ry;
  return /* @__PURE__ */ _.createElement("rect", {
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
function bA(e, t) {
  var r;
  if (/* @__PURE__ */ _.isValidElement(e))
    r = /* @__PURE__ */ _.cloneElement(e, t);
  else if (G(e))
    r = e(t);
  else {
    var n = t.x1, i = t.y1, a = t.x2, o = t.y2, u = t.key, c = K0(t, PL), s = W(c, !1);
    s.offset;
    var f = K0(s, SL);
    r = /* @__PURE__ */ _.createElement("line", gr({}, f, {
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
function IL(e) {
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
    return bA(i, s);
  });
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, o);
}
function CL(e) {
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
    return bA(i, s);
  });
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, o);
}
function kL(e) {
  var t = e.horizontalFill, r = e.fillOpacity, n = e.x, i = e.y, a = e.width, o = e.height, u = e.horizontalPoints, c = e.horizontal, s = c === void 0 ? !0 : c;
  if (!s || !t || !t.length)
    return null;
  var f = u.map(function(p) {
    return Math.round(p + i - i);
  }).sort(function(p, h) {
    return p - h;
  });
  i !== f[0] && f.unshift(0);
  var l = f.map(function(p, h) {
    var y = !f[h + 1], v = y ? i + o - p : f[h + 1] - p;
    if (v <= 0)
      return null;
    var d = h % t.length;
    return /* @__PURE__ */ _.createElement("rect", {
      key: "react-".concat(h),
      y: p,
      x: n,
      height: v,
      width: a,
      stroke: "none",
      fill: t[d],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, l);
}
function RL(e) {
  var t = e.vertical, r = t === void 0 ? !0 : t, n = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, u = e.width, c = e.height, s = e.verticalPoints;
  if (!r || !n || !n.length)
    return null;
  var f = s.map(function(p) {
    return Math.round(p + a - a);
  }).sort(function(p, h) {
    return p - h;
  });
  a !== f[0] && f.unshift(0);
  var l = f.map(function(p, h) {
    var y = !f[h + 1], v = y ? a + u - p : f[h + 1] - p;
    if (v <= 0)
      return null;
    var d = h % n.length;
    return /* @__PURE__ */ _.createElement("rect", {
      key: "react-".concat(h),
      x: p,
      y: o,
      width: v,
      height: c,
      stroke: "none",
      fill: n[d],
      fillOpacity: i,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, l);
}
var DL = function(t, r) {
  var n = t.xAxis, i = t.width, a = t.height, o = t.offset;
  return pw(Vh(Re(Re(Re({}, qn.defaultProps), n), {}, {
    ticks: Mt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.left, o.left + o.width, r);
}, NL = function(t, r) {
  var n = t.yAxis, i = t.width, a = t.height, o = t.offset;
  return pw(Vh(Re(Re(Re({}, qn.defaultProps), n), {}, {
    ticks: Mt(n, !0),
    viewBox: {
      x: 0,
      y: 0,
      width: i,
      height: a
    }
  })), o.top, o.top + o.height, r);
}, Fr = {
  horizontal: !0,
  vertical: !0,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function ra(e) {
  var t, r, n, i, a, o, u = Kh(), c = Uh(), s = _2(), f = Re(Re({}, e), {}, {
    stroke: (t = e.stroke) !== null && t !== void 0 ? t : Fr.stroke,
    fill: (r = e.fill) !== null && r !== void 0 ? r : Fr.fill,
    horizontal: (n = e.horizontal) !== null && n !== void 0 ? n : Fr.horizontal,
    horizontalFill: (i = e.horizontalFill) !== null && i !== void 0 ? i : Fr.horizontalFill,
    vertical: (a = e.vertical) !== null && a !== void 0 ? a : Fr.vertical,
    verticalFill: (o = e.verticalFill) !== null && o !== void 0 ? o : Fr.verticalFill,
    x: q(e.x) ? e.x : s.left,
    y: q(e.y) ? e.y : s.top,
    width: q(e.width) ? e.width : s.width,
    height: q(e.height) ? e.height : s.height
  }), l = f.x, p = f.y, h = f.width, y = f.height, v = f.syncWithTicks, d = f.horizontalValues, g = f.verticalValues, b = O2(), O = w2();
  if (!q(h) || h <= 0 || !q(y) || y <= 0 || !q(l) || l !== +l || !q(p) || p !== +p)
    return null;
  var w = f.verticalCoordinatesGenerator || DL, m = f.horizontalCoordinatesGenerator || NL, x = f.horizontalPoints, A = f.verticalPoints;
  if ((!x || !x.length) && G(m)) {
    var P = d && d.length, S = m({
      yAxis: O ? Re(Re({}, O), {}, {
        ticks: P ? d : O.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, P ? !0 : v);
    ft(Array.isArray(S), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(Er(S), "]")), Array.isArray(S) && (x = S);
  }
  if ((!A || !A.length) && G(w)) {
    var T = g && g.length, E = w({
      xAxis: b ? Re(Re({}, b), {}, {
        ticks: T ? g : b.ticks
      }) : void 0,
      width: u,
      height: c,
      offset: s
    }, T ? !0 : v);
    ft(Array.isArray(E), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(Er(E), "]")), Array.isArray(E) && (A = E);
  }
  return /* @__PURE__ */ _.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ _.createElement(ML, {
    fill: f.fill,
    fillOpacity: f.fillOpacity,
    x: f.x,
    y: f.y,
    width: f.width,
    height: f.height,
    ry: f.ry
  }), /* @__PURE__ */ _.createElement(IL, gr({}, f, {
    offset: s,
    horizontalPoints: x,
    xAxis: b,
    yAxis: O
  })), /* @__PURE__ */ _.createElement(CL, gr({}, f, {
    offset: s,
    verticalPoints: A,
    xAxis: b,
    yAxis: O
  })), /* @__PURE__ */ _.createElement(kL, gr({}, f, {
    horizontalPoints: x
  })), /* @__PURE__ */ _.createElement(RL, gr({}, f, {
    verticalPoints: A
  })));
}
ra.displayName = "CartesianGrid";
var LL = ["type", "layout", "connectNulls", "ref"], qL = ["key"];
function On(e) {
  "@babel/helpers - typeof";
  return On = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, On(e);
}
function U0(e, t) {
  if (e == null) return {};
  var r = BL(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function BL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function ai() {
  return ai = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ai.apply(this, arguments);
}
function H0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function He(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? H0(Object(r), !0).forEach(function(n) {
      st(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : H0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zr(e) {
  return KL(e) || WL(e) || zL(e) || FL();
}
function FL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zL(e, t) {
  if (e) {
    if (typeof e == "string") return Mp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Mp(e, t);
  }
}
function WL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function KL(e) {
  if (Array.isArray(e)) return Mp(e);
}
function Mp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function UL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function G0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, OA(n.key), n);
  }
}
function HL(e, t, r) {
  return t && G0(e.prototype, t), r && G0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function GL(e, t, r) {
  return t = _o(t), VL(e, xA() ? Reflect.construct(t, r || [], _o(e).constructor) : t.apply(e, r));
}
function VL(e, t) {
  if (t && (On(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return XL(e);
}
function XL(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xA = function() {
    return !!e;
  })();
}
function _o(e) {
  return _o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, _o(e);
}
function YL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ip(e, t);
}
function Ip(e, t) {
  return Ip = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Ip(e, t);
}
function st(e, t, r) {
  return t = OA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OA(e) {
  var t = ZL(e, "string");
  return On(t) == "symbol" ? t : t + "";
}
function ZL(e, t) {
  if (On(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (On(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var na = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    UL(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = GL(this, t, [].concat(i)), st(r, "state", {
      isAnimationFinished: !0,
      totalLength: 0
    }), st(r, "generateSimpleStrokeDasharray", function(o, u) {
      return "".concat(u, "px ").concat(o - u, "px");
    }), st(r, "getStrokeDasharray", function(o, u, c) {
      var s = c.reduce(function(g, b) {
        return g + b;
      });
      if (!s)
        return r.generateSimpleStrokeDasharray(u, o);
      for (var f = Math.floor(o / s), l = o % s, p = u - o, h = [], y = 0, v = 0; y < c.length; v += c[y], ++y)
        if (v + c[y] > l) {
          h = [].concat(zr(c.slice(0, y)), [l - v]);
          break;
        }
      var d = h.length % 2 === 0 ? [0, p] : [p];
      return [].concat(zr(t.repeat(c, f)), zr(h), d).map(function(g) {
        return "".concat(g, "px");
      }).join(", ");
    }), st(r, "id", Qt("recharts-line-")), st(r, "pathRef", function(o) {
      r.mainCurve = o;
    }), st(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      }), r.props.onAnimationEnd && r.props.onAnimationEnd();
    }), st(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      }), r.props.onAnimationStart && r.props.onAnimationStart();
    }), r;
  }
  return YL(t, e), HL(t, [{
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
      var a = this.props, o = a.points, u = a.xAxis, c = a.yAxis, s = a.layout, f = a.children, l = De(f, Dn);
      if (!l)
        return null;
      var p = function(v, d) {
        return {
          x: v.x,
          y: v.y,
          value: v.value,
          errorVal: le(v.payload, d)
        };
      }, h = {
        clipPath: n ? "url(#clipPath-".concat(i, ")") : null
      };
      return /* @__PURE__ */ _.createElement(J, h, l.map(function(y) {
        return /* @__PURE__ */ _.cloneElement(y, {
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
      var u = this.props, c = u.dot, s = u.points, f = u.dataKey, l = W(this.props, !1), p = W(c, !0), h = s.map(function(v, d) {
        var g = He(He(He({
          key: "dot-".concat(d),
          r: 3
        }, l), p), {}, {
          index: d,
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
      return /* @__PURE__ */ _.createElement(J, ai({
        className: "recharts-line-dots",
        key: "dots"
      }, y), h);
    }
  }, {
    key: "renderCurveStatically",
    value: function(n, i, a, o) {
      var u = this.props, c = u.type, s = u.layout, f = u.connectNulls;
      u.ref;
      var l = U0(u, LL), p = He(He(He({}, W(l, !0)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: i ? "url(#clipPath-".concat(a, ")") : null,
        points: n
      }, o), {}, {
        type: c,
        layout: s,
        connectNulls: f
      });
      return /* @__PURE__ */ _.createElement(Yt, ai({}, p, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function(n, i) {
      var a = this, o = this.props, u = o.points, c = o.strokeDasharray, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, p = o.animationEasing, h = o.animationId, y = o.animateNewValues, v = o.width, d = o.height, g = this.state, b = g.prevPoints, O = g.totalLength;
      return /* @__PURE__ */ _.createElement(We, {
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
        key: "line-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(w) {
        var m = w.t;
        if (b) {
          var x = b.length / u.length, A = u.map(function(j, $) {
            var I = Math.floor($ * x);
            if (b[I]) {
              var M = b[I], k = ue(M.x, j.x), N = ue(M.y, j.y);
              return He(He({}, j), {}, {
                x: k(m),
                y: N(m)
              });
            }
            if (y) {
              var B = ue(v * 2, j.x), F = ue(d / 2, j.y);
              return He(He({}, j), {}, {
                x: B(m),
                y: F(m)
              });
            }
            return He(He({}, j), {}, {
              x: j.x,
              y: j.y
            });
          });
          return a.renderCurveStatically(A, n, i);
        }
        var P = ue(0, O), S = P(m), T;
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
      return u && o && o.length && (!s && f > 0 || !wt(s, o)) ? this.renderCurveWithAnimation(n, i) : this.renderCurveStatically(o, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.xAxis, f = i.yAxis, l = i.top, p = i.left, h = i.width, y = i.height, v = i.isAnimationActive, d = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, b = u.length === 1, O = Y("recharts-line", c), w = s && s.allowDataOverflow, m = f && f.allowDataOverflow, x = w || m, A = V(d) ? this.id : d, P = (n = W(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, S = P.r, T = S === void 0 ? 3 : S, E = P.strokeWidth, j = E === void 0 ? 2 : E, $ = vx(o) ? o : {}, I = $.clipDot, M = I === void 0 ? !0 : I, k = T * 2 + j;
      return /* @__PURE__ */ _.createElement(J, {
        className: O
      }, w || m ? /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-".concat(A)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: w ? p : p - h / 2,
        y: m ? l : l - y / 2,
        width: w ? h : h * 2,
        height: m ? y : y * 2
      })), !M && /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-dots-".concat(A)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: p - k / 2,
        y: l - k / 2,
        width: h + k,
        height: y + k
      }))) : null, !b && this.renderCurve(x, A), this.renderErrorBar(x, A), (b || o) && this.renderDots(x, M, A), (!v || g) && Ze.renderCallByParent(this.props, u));
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
      for (var a = n.length % 2 !== 0 ? [].concat(zr(n), [0]) : n, o = [], u = 0; u < i; ++u)
        o = [].concat(zr(o), zr(a));
      return o;
    }
  }, {
    key: "renderDotItem",
    value: function(n, i) {
      var a;
      if (/* @__PURE__ */ _.isValidElement(n))
        a = /* @__PURE__ */ _.cloneElement(n, i);
      else if (G(n))
        a = n(i);
      else {
        var o = i.key, u = U0(i, qL), c = Y("recharts-line-dot", typeof n != "boolean" ? n.className : "");
        a = /* @__PURE__ */ _.createElement(Nn, ai({
          key: o
        }, u, {
          className: c
        }));
      }
      return a;
    }
  }]);
})(R.PureComponent);
st(na, "displayName", "Line");
st(na, "defaultProps", {
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
  isAnimationActive: !vt.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: !1,
  label: !1
});
st(na, "getComposedData", function(e) {
  var t = e.props, r = e.xAxis, n = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, u = e.bandSize, c = e.displayedData, s = e.offset, f = t.layout, l = c.map(function(p, h) {
    var y = le(p, o);
    return f === "horizontal" ? {
      x: un({
        axis: r,
        ticks: i,
        bandSize: u,
        entry: p,
        index: h
      }),
      y: V(y) ? null : n.scale(y),
      value: y,
      payload: p
    } : {
      x: V(y) ? null : r.scale(y),
      y: un({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: p,
        index: h
      }),
      value: y,
      payload: p
    };
  });
  return He({
    points: l,
    layout: f
  }, s);
});
var JL = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], QL = ["key"], wA;
function wn(e) {
  "@babel/helpers - typeof";
  return wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, wn(e);
}
function AA(e, t) {
  if (e == null) return {};
  var r = eq(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function eq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function br() {
  return br = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, br.apply(this, arguments);
}
function V0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? V0(Object(r), !0).forEach(function(n) {
      gt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : V0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function X0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, PA(n.key), n);
  }
}
function rq(e, t, r) {
  return t && X0(e.prototype, t), r && X0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nq(e, t, r) {
  return t = Po(t), iq(e, _A() ? Reflect.construct(t, r || [], Po(e).constructor) : t.apply(e, r));
}
function iq(e, t) {
  if (t && (wn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return aq(e);
}
function aq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _A() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_A = function() {
    return !!e;
  })();
}
function Po(e) {
  return Po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Po(e);
}
function oq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Cp(e, t);
}
function Cp(e, t) {
  return Cp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Cp(e, t);
}
function gt(e, t, r) {
  return t = PA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PA(e) {
  var t = uq(e, "string");
  return wn(t) == "symbol" ? t : t + "";
}
function uq(e, t) {
  if (wn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (wn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var nr = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    tq(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = nq(this, t, [].concat(i)), gt(r, "state", {
      isAnimationFinished: !0
    }), gt(r, "id", Qt("recharts-area-")), gt(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({
        isAnimationFinished: !0
      }), G(o) && o();
    }), gt(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({
        isAnimationFinished: !1
      }), G(o) && o();
    }), r;
  }
  return oq(t, e), rq(t, [{
    key: "renderDots",
    value: function(n, i, a) {
      var o = this.props.isAnimationActive, u = this.state.isAnimationFinished;
      if (o && !u)
        return null;
      var c = this.props, s = c.dot, f = c.points, l = c.dataKey, p = W(this.props, !1), h = W(s, !0), y = f.map(function(d, g) {
        var b = Wt(Wt(Wt({
          key: "dot-".concat(g),
          r: 3
        }, p), h), {}, {
          index: g,
          cx: d.x,
          cy: d.y,
          dataKey: l,
          value: d.value,
          payload: d.payload,
          points: f
        });
        return t.renderDotItem(s, b);
      }), v = {
        clipPath: n ? "url(#clipPath-".concat(i ? "" : "dots-").concat(a, ")") : null
      };
      return /* @__PURE__ */ _.createElement(J, br({
        className: "recharts-area-dots"
      }, v), y);
    }
  }, {
    key: "renderHorizontalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].x, s = o[o.length - 1].x, f = n * Math.abs(c - s), l = Ht(o.map(function(p) {
        return p.y || 0;
      }));
      return q(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Ht(a.map(function(p) {
        return p.y || 0;
      })), l)), q(l) ? /* @__PURE__ */ _.createElement("rect", {
        x: c < s ? c : c - f,
        y: 0,
        width: f,
        height: Math.floor(l + (u ? parseInt("".concat(u), 10) : 1))
      }) : null;
    }
  }, {
    key: "renderVerticalRect",
    value: function(n) {
      var i = this.props, a = i.baseLine, o = i.points, u = i.strokeWidth, c = o[0].y, s = o[o.length - 1].y, f = n * Math.abs(c - s), l = Ht(o.map(function(p) {
        return p.x || 0;
      }));
      return q(a) && typeof a == "number" ? l = Math.max(a, l) : a && Array.isArray(a) && a.length && (l = Math.max(Ht(a.map(function(p) {
        return p.x || 0;
      })), l)), q(l) ? /* @__PURE__ */ _.createElement("rect", {
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
      var h = AA(u, JL);
      return /* @__PURE__ */ _.createElement(J, {
        clipPath: a ? "url(#clipPath-".concat(o, ")") : null
      }, /* @__PURE__ */ _.createElement(Yt, br({}, W(h, !0), {
        points: n,
        connectNulls: l,
        type: s,
        baseLine: i,
        layout: c,
        stroke: "none",
        className: "recharts-area-area"
      })), f !== "none" && /* @__PURE__ */ _.createElement(Yt, br({}, W(this.props, !1), {
        className: "recharts-area-curve",
        layout: c,
        type: s,
        connectNulls: l,
        fill: "none",
        points: n
      })), f !== "none" && p && /* @__PURE__ */ _.createElement(Yt, br({}, W(this.props, !1), {
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
      var a = this, o = this.props, u = o.points, c = o.baseLine, s = o.isAnimationActive, f = o.animationBegin, l = o.animationDuration, p = o.animationEasing, h = o.animationId, y = this.state, v = y.prevPoints, d = y.prevBaseLine;
      return /* @__PURE__ */ _.createElement(We, {
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
        key: "area-".concat(h),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(g) {
        var b = g.t;
        if (v) {
          var O = v.length / u.length, w = u.map(function(P, S) {
            var T = Math.floor(S * O);
            if (v[T]) {
              var E = v[T], j = ue(E.x, P.x), $ = ue(E.y, P.y);
              return Wt(Wt({}, P), {}, {
                x: j(b),
                y: $(b)
              });
            }
            return P;
          }), m;
          if (q(c) && typeof c == "number") {
            var x = ue(d, c);
            m = x(b);
          } else if (V(c) || Mn(c)) {
            var A = ue(d, 0);
            m = A(b);
          } else
            m = c.map(function(P, S) {
              var T = Math.floor(S * O);
              if (d[T]) {
                var E = d[T], j = ue(E.x, P.x), $ = ue(E.y, P.y);
                return Wt(Wt({}, P), {}, {
                  x: j(b),
                  y: $(b)
                });
              }
              return P;
            });
          return a.renderAreaStatically(w, m, n, i);
        }
        return /* @__PURE__ */ _.createElement(J, null, /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
          id: "animationClipPath-".concat(i)
        }, a.renderClipRect(b))), /* @__PURE__ */ _.createElement(J, {
          clipPath: "url(#animationClipPath-".concat(i, ")")
        }, a.renderAreaStatically(u, c, n, i)));
      });
    }
  }, {
    key: "renderArea",
    value: function(n, i) {
      var a = this.props, o = a.points, u = a.baseLine, c = a.isAnimationActive, s = this.state, f = s.prevPoints, l = s.prevBaseLine, p = s.totalLength;
      return c && o && o.length && (!f && p > 0 || !wt(f, o) || !wt(l, u)) ? this.renderAreaWithAnimation(n, i) : this.renderAreaStatically(o, u, n, i);
    }
  }, {
    key: "render",
    value: function() {
      var n, i = this.props, a = i.hide, o = i.dot, u = i.points, c = i.className, s = i.top, f = i.left, l = i.xAxis, p = i.yAxis, h = i.width, y = i.height, v = i.isAnimationActive, d = i.id;
      if (a || !u || !u.length)
        return null;
      var g = this.state.isAnimationFinished, b = u.length === 1, O = Y("recharts-area", c), w = l && l.allowDataOverflow, m = p && p.allowDataOverflow, x = w || m, A = V(d) ? this.id : d, P = (n = W(o, !1)) !== null && n !== void 0 ? n : {
        r: 3,
        strokeWidth: 2
      }, S = P.r, T = S === void 0 ? 3 : S, E = P.strokeWidth, j = E === void 0 ? 2 : E, $ = vx(o) ? o : {}, I = $.clipDot, M = I === void 0 ? !0 : I, k = T * 2 + j;
      return /* @__PURE__ */ _.createElement(J, {
        className: O
      }, w || m ? /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-".concat(A)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: w ? f : f - h / 2,
        y: m ? s : s - y / 2,
        width: w ? h : h * 2,
        height: m ? y : y * 2
      })), !M && /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-dots-".concat(A)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: f - k / 2,
        y: s - k / 2,
        width: h + k,
        height: y + k
      }))) : null, b ? null : this.renderArea(x, A), (o || b) && this.renderDots(x, M, A), (!v || g) && Ze.renderCallByParent(this.props, u));
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
})(R.PureComponent);
wA = nr;
gt(nr, "displayName", "Area");
gt(nr, "defaultProps", {
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
  isAnimationActive: !vt.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
gt(nr, "getBaseValue", function(e, t, r, n) {
  var i = e.layout, a = e.baseValue, o = t.props.baseValue, u = o ?? a;
  if (q(u) && typeof u == "number")
    return u;
  var c = i === "horizontal" ? n : r, s = c.scale.domain();
  if (c.type === "number") {
    var f = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
    return u === "dataMin" ? l : u === "dataMax" || f < 0 ? f : Math.max(Math.min(s[0], s[1]), 0);
  }
  return u === "dataMin" ? s[0] : u === "dataMax" ? s[1] : s[0];
});
gt(nr, "getComposedData", function(e) {
  var t = e.props, r = e.item, n = e.xAxis, i = e.yAxis, a = e.xAxisTicks, o = e.yAxisTicks, u = e.bandSize, c = e.dataKey, s = e.stackedData, f = e.dataStartIndex, l = e.displayedData, p = e.offset, h = t.layout, y = s && s.length, v = wA.getBaseValue(t, r, n, i), d = h === "horizontal", g = !1, b = l.map(function(w, m) {
    var x;
    y ? x = s[f + m] : (x = le(w, c), Array.isArray(x) ? g = !0 : x = [v, x]);
    var A = x[1] == null || y && le(w, c) == null;
    return d ? {
      x: un({
        axis: n,
        ticks: a,
        bandSize: u,
        entry: w,
        index: m
      }),
      y: A ? null : i.scale(x[1]),
      value: x,
      payload: w
    } : {
      x: A ? null : n.scale(x[1]),
      y: un({
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
    return d ? {
      x: w.x,
      y: m != null && w.y != null ? i.scale(m) : null
    } : {
      x: m != null ? n.scale(m) : null,
      y: w.y
    };
  }) : O = d ? i.scale(v) : n.scale(v), Wt({
    points: b,
    baseLine: O,
    layout: h,
    isRange: g
  }, p);
});
gt(nr, "renderDotItem", function(e, t) {
  var r;
  if (/* @__PURE__ */ _.isValidElement(e))
    r = /* @__PURE__ */ _.cloneElement(e, t);
  else if (G(e))
    r = e(t);
  else {
    var n = Y("recharts-area-dot", typeof e != "boolean" ? e.className : ""), i = t.key, a = AA(t, QL);
    r = /* @__PURE__ */ _.createElement(Nn, br({}, a, {
      key: i,
      className: n
    }));
  }
  return r;
});
function An(e) {
  "@babel/helpers - typeof";
  return An = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, An(e);
}
function cq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function sq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, EA(n.key), n);
  }
}
function lq(e, t, r) {
  return t && sq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function fq(e, t, r) {
  return t = So(t), pq(e, SA() ? Reflect.construct(t, r || [], So(e).constructor) : t.apply(e, r));
}
function pq(e, t) {
  if (t && (An(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return hq(e);
}
function hq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function SA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (SA = function() {
    return !!e;
  })();
}
function So(e) {
  return So = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, So(e);
}
function dq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && kp(e, t);
}
function kp(e, t) {
  return kp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, kp(e, t);
}
function jA(e, t, r) {
  return t = EA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function EA(e) {
  var t = vq(e, "string");
  return An(t) == "symbol" ? t : t + "";
}
function vq(e, t) {
  if (An(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (An(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var ia = /* @__PURE__ */ (function(e) {
  function t() {
    return cq(this, t), fq(this, t, arguments);
  }
  return dq(t, e), lq(t, [{
    key: "render",
    value: function() {
      return null;
    }
  }]);
})(R.Component);
jA(ia, "displayName", "ZAxis");
jA(ia, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var yq = ["option", "isActive"];
function oi() {
  return oi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, oi.apply(this, arguments);
}
function mq(e, t) {
  if (e == null) return {};
  var r = gq(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function gq(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function bq(e) {
  var t = e.option, r = e.isActive, n = mq(e, yq);
  return typeof t == "string" ? /* @__PURE__ */ R.createElement(Li, oi({
    option: /* @__PURE__ */ R.createElement(Bo, oi({
      type: t
    }, n)),
    isActive: r,
    shapeType: "symbols"
  }, n)) : /* @__PURE__ */ R.createElement(Li, oi({
    option: t,
    isActive: r,
    shapeType: "symbols"
  }, n));
}
function _n(e) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _n(e);
}
function ui() {
  return ui = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ui.apply(this, arguments);
}
function Y0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Y0(Object(r), !0).forEach(function(n) {
      Vt(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Y0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Z0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $A(n.key), n);
  }
}
function Oq(e, t, r) {
  return t && Z0(e.prototype, t), r && Z0(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function wq(e, t, r) {
  return t = jo(t), Aq(e, TA() ? Reflect.construct(t, r || [], jo(e).constructor) : t.apply(e, r));
}
function Aq(e, t) {
  if (t && (_n(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _q(e);
}
function _q(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function TA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (TA = function() {
    return !!e;
  })();
}
function jo(e) {
  return jo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, jo(e);
}
function Pq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Rp(e, t);
}
function Rp(e, t) {
  return Rp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Rp(e, t);
}
function Vt(e, t, r) {
  return t = $A(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $A(e) {
  var t = Sq(e, "string");
  return _n(t) == "symbol" ? t : t + "";
}
function Sq(e, t) {
  if (_n(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (_n(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var aa = /* @__PURE__ */ (function(e) {
  function t() {
    var r;
    xq(this, t);
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    return r = wq(this, t, [].concat(i)), Vt(r, "state", {
      isAnimationFinished: !1
    }), Vt(r, "handleAnimationEnd", function() {
      r.setState({
        isAnimationFinished: !0
      });
    }), Vt(r, "handleAnimationStart", function() {
      r.setState({
        isAnimationFinished: !1
      });
    }), Vt(r, "id", Qt("recharts-scatter-")), r;
  }
  return Pq(t, e), Oq(t, [{
    key: "renderSymbolsStatically",
    value: function(n) {
      var i = this, a = this.props, o = a.shape, u = a.activeShape, c = a.activeIndex, s = W(this.props, !1);
      return n.map(function(f, l) {
        var p = c === l, h = p ? u : o, y = tt(tt({}, s), f);
        return /* @__PURE__ */ _.createElement(J, ui({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(f == null ? void 0 : f.cx, "-").concat(f == null ? void 0 : f.cy, "-").concat(f == null ? void 0 : f.size, "-").concat(l)
        }, Ot(i.props, f, l), {
          role: "img"
        }), /* @__PURE__ */ _.createElement(bq, ui({
          option: h,
          isActive: p,
          key: "symbol-".concat(l)
        }, y)));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function() {
      var n = this, i = this.props, a = i.points, o = i.isAnimationActive, u = i.animationBegin, c = i.animationDuration, s = i.animationEasing, f = i.animationId, l = this.state.prevPoints;
      return /* @__PURE__ */ _.createElement(We, {
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
        key: "pie-".concat(f),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(p) {
        var h = p.t, y = a.map(function(v, d) {
          var g = l && l[d];
          if (g) {
            var b = ue(g.cx, v.cx), O = ue(g.cy, v.cy), w = ue(g.size, v.size);
            return tt(tt({}, v), {}, {
              cx: b(h),
              cy: O(h),
              size: w(h)
            });
          }
          var m = ue(0, v.size);
          return tt(tt({}, v), {}, {
            size: m(h)
          });
        });
        return /* @__PURE__ */ _.createElement(J, null, n.renderSymbolsStatically(y));
      });
    }
  }, {
    key: "renderSymbols",
    value: function() {
      var n = this.props, i = n.points, a = n.isAnimationActive, o = this.state.prevPoints;
      return a && i && i.length && (!o || !wt(o, i)) ? this.renderSymbolsWithAnimation() : this.renderSymbolsStatically(i);
    }
  }, {
    key: "renderErrorBar",
    value: function() {
      var n = this.props.isAnimationActive;
      if (n && !this.state.isAnimationFinished)
        return null;
      var i = this.props, a = i.points, o = i.xAxis, u = i.yAxis, c = i.children, s = De(c, Dn);
      return s ? s.map(function(f, l) {
        var p = f.props, h = p.direction, y = p.dataKey;
        return /* @__PURE__ */ _.cloneElement(f, {
          key: "".concat(h, "-").concat(y, "-").concat(a[l]),
          data: a,
          xAxis: o,
          yAxis: u,
          layout: h === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function(d, g) {
            return {
              x: d.cx,
              y: d.cy,
              value: h === "x" ? +d.node.x : +d.node.y,
              errorVal: le(d, g)
            };
          }
        });
      }) : null;
    }
  }, {
    key: "renderLine",
    value: function() {
      var n = this.props, i = n.points, a = n.line, o = n.lineType, u = n.lineJointType, c = W(this.props, !1), s = W(a, !1), f, l;
      if (o === "joint")
        f = i.map(function(O) {
          return {
            x: O.cx,
            y: O.cy
          };
        });
      else if (o === "fitting") {
        var p = N_(i), h = p.xmin, y = p.xmax, v = p.a, d = p.b, g = function(w) {
          return v * w + d;
        };
        f = [{
          x: h,
          y: g(h)
        }, {
          x: y,
          y: g(y)
        }];
      }
      var b = tt(tt(tt({}, c), {}, {
        fill: "none",
        stroke: c && c.fill
      }, s), {}, {
        points: f
      });
      return /* @__PURE__ */ _.isValidElement(a) ? l = /* @__PURE__ */ _.cloneElement(a, b) : G(a) ? l = a(b) : l = /* @__PURE__ */ _.createElement(Yt, ui({}, b, {
        type: u
      })), /* @__PURE__ */ _.createElement(J, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, l);
    }
  }, {
    key: "render",
    value: function() {
      var n = this.props, i = n.hide, a = n.points, o = n.line, u = n.className, c = n.xAxis, s = n.yAxis, f = n.left, l = n.top, p = n.width, h = n.height, y = n.id, v = n.isAnimationActive;
      if (i || !a || !a.length)
        return null;
      var d = this.state.isAnimationFinished, g = Y("recharts-scatter", u), b = c && c.allowDataOverflow, O = s && s.allowDataOverflow, w = b || O, m = V(y) ? this.id : y;
      return /* @__PURE__ */ _.createElement(J, {
        className: g,
        clipPath: w ? "url(#clipPath-".concat(m, ")") : null
      }, b || O ? /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
        id: "clipPath-".concat(m)
      }, /* @__PURE__ */ _.createElement("rect", {
        x: b ? f : f - p / 2,
        y: O ? l : l - h / 2,
        width: b ? p : p * 2,
        height: O ? h : h * 2
      }))) : null, o && this.renderLine(), this.renderErrorBar(), /* @__PURE__ */ _.createElement(J, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!v || d) && Ze.renderCallByParent(this.props, a));
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
  }]);
})(R.PureComponent);
Vt(aa, "displayName", "Scatter");
Vt(aa, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  data: [],
  shape: "circle",
  hide: !1,
  isAnimationActive: !vt.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear"
});
Vt(aa, "getComposedData", function(e) {
  var t = e.xAxis, r = e.yAxis, n = e.zAxis, i = e.item, a = e.displayedData, o = e.xAxisTicks, u = e.yAxisTicks, c = e.offset, s = i.props.tooltipType, f = De(i.props.children, Xi), l = V(t.dataKey) ? i.props.dataKey : t.dataKey, p = V(r.dataKey) ? i.props.dataKey : r.dataKey, h = n && n.dataKey, y = n ? n.range : ia.defaultProps.range, v = y && y[0], d = t.scale.bandwidth ? t.scale.bandwidth() : 0, g = r.scale.bandwidth ? r.scale.bandwidth() : 0, b = a.map(function(O, w) {
    var m = le(O, l), x = le(O, p), A = !V(h) && le(O, h) || "-", P = [{
      name: V(t.dataKey) ? i.props.name : t.name || t.dataKey,
      unit: t.unit || "",
      value: m,
      payload: O,
      dataKey: l,
      type: s
    }, {
      name: V(r.dataKey) ? i.props.name : r.name || r.dataKey,
      unit: r.unit || "",
      value: x,
      payload: O,
      dataKey: p,
      type: s
    }];
    A !== "-" && P.push({
      name: n.name || n.dataKey,
      unit: n.unit || "",
      value: A,
      payload: O,
      dataKey: h,
      type: s
    });
    var S = un({
      axis: t,
      ticks: o,
      bandSize: d,
      entry: O,
      index: w,
      dataKey: l
    }), T = un({
      axis: r,
      ticks: u,
      bandSize: g,
      entry: O,
      index: w,
      dataKey: p
    }), E = A !== "-" ? n.scale(A) : v, j = Math.sqrt(Math.max(E, 0) / Math.PI);
    return tt(tt({}, O), {}, {
      cx: S,
      cy: T,
      x: S - j,
      y: T - j,
      xAxis: t,
      yAxis: r,
      zAxis: n,
      width: 2 * j,
      height: 2 * j,
      size: E,
      node: {
        x: m,
        y: x,
        z: A
      },
      tooltipPayload: P,
      tooltipPosition: {
        x: S,
        y: T
      },
      payload: O
    }, f && f[w] && f[w].props);
  });
  return tt({
    points: b
  }, c);
});
function Pn(e) {
  "@babel/helpers - typeof";
  return Pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pn(e);
}
function jq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Eq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, CA(n.key), n);
  }
}
function Tq(e, t, r) {
  return t && Eq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function $q(e, t, r) {
  return t = Eo(t), Mq(e, MA() ? Reflect.construct(t, r || [], Eo(e).constructor) : t.apply(e, r));
}
function Mq(e, t) {
  if (t && (Pn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Iq(e);
}
function Iq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function MA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (MA = function() {
    return !!e;
  })();
}
function Eo(e) {
  return Eo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Eo(e);
}
function Cq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Dp(e, t);
}
function Dp(e, t) {
  return Dp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Dp(e, t);
}
function IA(e, t, r) {
  return t = CA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CA(e) {
  var t = kq(e, "string");
  return Pn(t) == "symbol" ? t : t + "";
}
function kq(e, t) {
  if (Pn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Pn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Np() {
  return Np = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Np.apply(this, arguments);
}
function Rq(e) {
  var t = e.xAxisId, r = Kh(), n = Uh(), i = cA(t);
  return i == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ R.createElement(qn, Np({}, i, {
      className: Y("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className),
      viewBox: {
        x: 0,
        y: 0,
        width: r,
        height: n
      },
      ticksGenerator: function(o) {
        return Mt(o, !0);
      }
    }))
  );
}
var pt = /* @__PURE__ */ (function(e) {
  function t() {
    return jq(this, t), $q(this, t, arguments);
  }
  return Cq(t, e), Tq(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ R.createElement(Rq, this.props);
    }
  }]);
})(R.Component);
IA(pt, "displayName", "XAxis");
IA(pt, "defaultProps", {
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
function Sn(e) {
  "@babel/helpers - typeof";
  return Sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Sn(e);
}
function Dq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Nq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, DA(n.key), n);
  }
}
function Lq(e, t, r) {
  return t && Nq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qq(e, t, r) {
  return t = To(t), Bq(e, kA() ? Reflect.construct(t, r || [], To(e).constructor) : t.apply(e, r));
}
function Bq(e, t) {
  if (t && (Sn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Fq(e);
}
function Fq(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function kA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (kA = function() {
    return !!e;
  })();
}
function To(e) {
  return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, To(e);
}
function zq(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Lp(e, t);
}
function Lp(e, t) {
  return Lp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Lp(e, t);
}
function RA(e, t, r) {
  return t = DA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DA(e) {
  var t = Wq(e, "string");
  return Sn(t) == "symbol" ? t : t + "";
}
function Wq(e, t) {
  if (Sn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Sn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function qp() {
  return qp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qp.apply(this, arguments);
}
var Kq = function(t) {
  var r = t.yAxisId, n = Kh(), i = Uh(), a = sA(r);
  return a == null ? null : (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ R.createElement(qn, qp({}, a, {
      className: Y("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className),
      viewBox: {
        x: 0,
        y: 0,
        width: n,
        height: i
      },
      ticksGenerator: function(u) {
        return Mt(u, !0);
      }
    }))
  );
}, ht = /* @__PURE__ */ (function(e) {
  function t() {
    return Dq(this, t), qq(this, t, arguments);
  }
  return zq(t, e), Lq(t, [{
    key: "render",
    value: function() {
      return /* @__PURE__ */ R.createElement(Kq, this.props);
    }
  }]);
})(R.Component);
RA(ht, "displayName", "YAxis");
RA(ht, "defaultProps", {
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
function J0(e) {
  return Vq(e) || Gq(e) || Hq(e) || Uq();
}
function Uq() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Hq(e, t) {
  if (e) {
    if (typeof e == "string") return Bp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Bp(e, t);
  }
}
function Gq(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Vq(e) {
  if (Array.isArray(e)) return Bp(e);
}
function Bp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var Fp = function(t, r, n, i, a) {
  var o = De(t, Gh), u = De(t, uu), c = [].concat(J0(o), J0(u)), s = De(t, su), f = "".concat(i, "Id"), l = i[0], p = r;
  if (c.length && (p = c.reduce(function(v, d) {
    if (d.props[f] === n && xt(d.props, "extendDomain") && q(d.props[l])) {
      var g = d.props[l];
      return [Math.min(v[0], g), Math.max(v[1], g)];
    }
    return v;
  }, p)), s.length) {
    var h = "".concat(l, "1"), y = "".concat(l, "2");
    p = s.reduce(function(v, d) {
      if (d.props[f] === n && xt(d.props, "extendDomain") && q(d.props[h]) && q(d.props[y])) {
        var g = d.props[h], b = d.props[y];
        return [Math.min(v[0], g, b), Math.max(v[1], g, b)];
      }
      return v;
    }, p);
  }
  return a && a.length && (p = a.reduce(function(v, d) {
    return q(d) ? [Math.min(v[0], d), Math.max(v[1], d)] : v;
  }, p)), p;
}, df = { exports: {} }, Q0;
function Xq() {
  return Q0 || (Q0 = 1, (function(e) {
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
      var h = new i(f, l || c, p), y = r ? r + s : s;
      return c._events[y] ? c._events[y].fn ? c._events[y] = [c._events[y], h] : c._events[y].push(h) : (c._events[y] = h, c._eventsCount++), c;
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
      for (var p = 0, h = l.length, y = new Array(h); p < h; p++)
        y[p] = l[p].fn;
      return y;
    }, u.prototype.listenerCount = function(s) {
      var f = r ? r + s : s, l = this._events[f];
      return l ? l.fn ? 1 : l.length : 0;
    }, u.prototype.emit = function(s, f, l, p, h, y) {
      var v = r ? r + s : s;
      if (!this._events[v]) return !1;
      var d = this._events[v], g = arguments.length, b, O;
      if (d.fn) {
        switch (d.once && this.removeListener(s, d.fn, void 0, !0), g) {
          case 1:
            return d.fn.call(d.context), !0;
          case 2:
            return d.fn.call(d.context, f), !0;
          case 3:
            return d.fn.call(d.context, f, l), !0;
          case 4:
            return d.fn.call(d.context, f, l, p), !0;
          case 5:
            return d.fn.call(d.context, f, l, p, h), !0;
          case 6:
            return d.fn.call(d.context, f, l, p, h, y), !0;
        }
        for (O = 1, b = new Array(g - 1); O < g; O++)
          b[O - 1] = arguments[O];
        d.fn.apply(d.context, b);
      } else {
        var w = d.length, m;
        for (O = 0; O < w; O++)
          switch (d[O].once && this.removeListener(s, d[O].fn, void 0, !0), g) {
            case 1:
              d[O].fn.call(d[O].context);
              break;
            case 2:
              d[O].fn.call(d[O].context, f);
              break;
            case 3:
              d[O].fn.call(d[O].context, f, l);
              break;
            case 4:
              d[O].fn.call(d[O].context, f, l, p);
              break;
            default:
              if (!b) for (m = 1, b = new Array(g - 1); m < g; m++)
                b[m - 1] = arguments[m];
              d[O].fn.apply(d[O].context, b);
          }
      }
      return !0;
    }, u.prototype.on = function(s, f, l) {
      return a(this, s, f, l, !1);
    }, u.prototype.once = function(s, f, l) {
      return a(this, s, f, l, !0);
    }, u.prototype.removeListener = function(s, f, l, p) {
      var h = r ? r + s : s;
      if (!this._events[h]) return this;
      if (!f)
        return o(this, h), this;
      var y = this._events[h];
      if (y.fn)
        y.fn === f && (!p || y.once) && (!l || y.context === l) && o(this, h);
      else {
        for (var v = 0, d = [], g = y.length; v < g; v++)
          (y[v].fn !== f || p && !y[v].once || l && y[v].context !== l) && d.push(y[v]);
        d.length ? this._events[h] = d.length === 1 ? d[0] : d : o(this, h);
      }
      return this;
    }, u.prototype.removeAllListeners = function(s) {
      var f;
      return s ? (f = r ? r + s : s, this._events[f] && o(this, f)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(df)), df.exports;
}
var Yq = Xq();
const Zq = /* @__PURE__ */ ce(Yq);
var vf = new Zq(), yf = "recharts.syncMouseEvents";
function Ui(e) {
  "@babel/helpers - typeof";
  return Ui = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ui(e);
}
function Jq(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Qq(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, NA(n.key), n);
  }
}
function eB(e, t, r) {
  return t && Qq(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function mf(e, t, r) {
  return t = NA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NA(e) {
  var t = tB(e, "string");
  return Ui(t) == "symbol" ? t : t + "";
}
function tB(e, t) {
  if (Ui(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ui(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var rB = /* @__PURE__ */ (function() {
  function e() {
    Jq(this, e), mf(this, "activeIndex", 0), mf(this, "coordinateList", []), mf(this, "layout", "horizontal");
  }
  return eB(e, [{
    key: "setDetails",
    value: function(r) {
      var n, i = r.coordinateList, a = i === void 0 ? null : i, o = r.container, u = o === void 0 ? null : o, c = r.layout, s = c === void 0 ? null : c, f = r.offset, l = f === void 0 ? null : f, p = r.mouseHandlerCallback, h = p === void 0 ? null : p;
      this.coordinateList = (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = l ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
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
function nB(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0], i = e == null ? void 0 : e[1];
    if (n && i && q(n) && q(i))
      return !0;
  }
  return !1;
}
function iB(e, t, r, n) {
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
function LA(e) {
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
function aB(e, t, r) {
  var n, i, a, o;
  if (e === "horizontal")
    n = t.x, a = n, i = r.top, o = r.top + r.height;
  else if (e === "vertical")
    i = t.y, o = i, n = r.left, a = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx, c = t.cy, s = t.innerRadius, f = t.outerRadius, l = t.angle, p = ne(u, c, s, l), h = ne(u, c, f, l);
      n = p.x, i = p.y, a = h.x, o = h.y;
    } else
      return LA(t);
  return [{
    x: n,
    y: i
  }, {
    x: a,
    y: o
  }];
}
function Hi(e) {
  "@babel/helpers - typeof";
  return Hi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Hi(e);
}
function ex(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ex(Object(r), !0).forEach(function(n) {
      oB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ex(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function oB(e, t, r) {
  return t = uB(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uB(e) {
  var t = cB(e, "string");
  return Hi(t) == "symbol" ? t : t + "";
}
function cB(e, t) {
  if (Hi(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Hi(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sB(e) {
  var t, r, n = e.element, i = e.tooltipEventType, a = e.isActive, o = e.activeCoordinate, u = e.activePayload, c = e.offset, s = e.activeTooltipIndex, f = e.tooltipAxisBandSize, l = e.layout, p = e.chartName, h = (t = n.props.cursor) !== null && t !== void 0 ? t : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !h || !a || !o || p !== "ScatterChart" && i !== "axis")
    return null;
  var y, v = Yt;
  if (p === "ScatterChart")
    y = o, v = mR;
  else if (p === "BarChart")
    y = iB(l, o, c, f), v = Bh;
  else if (l === "radial") {
    var d = LA(o), g = d.cx, b = d.cy, O = d.radius, w = d.startAngle, m = d.endAngle;
    y = {
      cx: g,
      cy: b,
      startAngle: w,
      endAngle: m,
      innerRadius: O,
      outerRadius: O
    }, v = Sw;
  } else
    y = {
      points: aB(l, o, c)
    }, v = Yt;
  var x = xa(xa(xa(xa({
    stroke: "#ccc",
    pointerEvents: "none"
  }, c), y), W(h, !1)), {}, {
    payload: u,
    payloadIndex: s,
    className: Y("recharts-tooltip-cursor", h.className)
  });
  return /* @__PURE__ */ R.isValidElement(h) ? /* @__PURE__ */ R.cloneElement(h, x) : /* @__PURE__ */ R.createElement(v, x);
}
var lB = ["item"], fB = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function jn(e) {
  "@babel/helpers - typeof";
  return jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, jn(e);
}
function Gr() {
  return Gr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gr.apply(this, arguments);
}
function tx(e, t) {
  return dB(e) || hB(e, t) || BA(e, t) || pB();
}
function pB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hB(e, t) {
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
function dB(e) {
  if (Array.isArray(e)) return e;
}
function rx(e, t) {
  if (e == null) return {};
  var r = vB(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function vB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function yB(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function mB(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, FA(n.key), n);
  }
}
function gB(e, t, r) {
  return t && mB(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function bB(e, t, r) {
  return t = $o(t), xB(e, qA() ? Reflect.construct(t, r || [], $o(e).constructor) : t.apply(e, r));
}
function xB(e, t) {
  if (t && (jn(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return OB(e);
}
function OB(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function qA() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (qA = function() {
    return !!e;
  })();
}
function $o(e) {
  return $o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $o(e);
}
function wB(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && zp(e, t);
}
function zp(e, t) {
  return zp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, zp(e, t);
}
function En(e) {
  return PB(e) || _B(e) || BA(e) || AB();
}
function AB() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function BA(e, t) {
  if (e) {
    if (typeof e == "string") return Wp(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Wp(e, t);
  }
}
function _B(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function PB(e) {
  if (Array.isArray(e)) return Wp(e);
}
function Wp(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function nx(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function C(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nx(Object(r), !0).forEach(function(n) {
      X(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nx(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X(e, t, r) {
  return t = FA(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FA(e) {
  var t = SB(e, "string");
  return jn(t) == "symbol" ? t : t + "";
}
function SB(e, t) {
  if (jn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (jn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jB = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, EB = {
  width: "100%",
  height: "100%"
}, zA = {
  x: 0,
  y: 0
};
function Oa(e) {
  return e;
}
var TB = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, $B = function(t, r, n, i) {
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
      return C(C(C({}, i), ne(i.cx, i.cy, u, o)), {}, {
        angle: o,
        radius: u
      });
    }
    var c = a.coordinate, s = i.angle;
    return C(C(C({}, i), ne(i.cx, i.cy, c, s)), {}, {
      angle: s,
      radius: c
    });
  }
  return zA;
}, lu = function(t, r) {
  var n = r.graphicalItems, i = r.dataStartIndex, a = r.dataEndIndex, o = (n ?? []).reduce(function(u, c) {
    var s = c.props.data;
    return s && s.length ? [].concat(En(u), En(s)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && q(i) && q(a) ? t.slice(i, a + 1) : [];
};
function WA(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var Kp = function(t, r, n, i) {
  var a = t.graphicalItems, o = t.tooltipAxis, u = lu(r, t);
  return n < 0 || !a || !a.length || n >= u.length ? null : a.reduce(function(c, s) {
    var f, l = (f = s.props.data) !== null && f !== void 0 ? f : r;
    l && t.dataStartIndex + t.dataEndIndex !== 0 && // https://github.com/recharts/recharts/issues/4717
    // The data is sliced only when the active index is within the start/end index range.
    t.dataEndIndex - t.dataStartIndex >= n && (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var p;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var h = l === void 0 ? u : l;
      p = Aa(h, o.dataKey, i);
    } else
      p = l && l[n] || u[n];
    return p ? [].concat(En(c), [Lh(s, p)]) : c;
  }, []);
}, ix = function(t, r, n, i) {
  var a = i || {
    x: t.chartX,
    y: t.chartY
  }, o = TB(a, n), u = t.orderedTooltipTicks, c = t.tooltipAxis, s = t.tooltipTicks, f = KM(o, u, s, c);
  if (f >= 0 && s) {
    var l = s[f] && s[f].value, p = Kp(t, r, f, l), h = $B(n, u, f, a);
    return {
      activeTooltipIndex: f,
      activeLabel: l,
      activePayload: p,
      activeCoordinate: h
    };
  }
  return null;
}, MB = function(t, r) {
  var n = r.axes, i = r.graphicalItems, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, p = t.stackOffset, h = fw(f, a);
  return n.reduce(function(y, v) {
    var d, g = v.type.defaultProps !== void 0 ? C(C({}, v.type.defaultProps), v.props) : v.props, b = g.type, O = g.dataKey, w = g.allowDataOverflow, m = g.allowDuplicatedCategory, x = g.scale, A = g.ticks, P = g.includeHidden, S = g[o];
    if (y[S])
      return y;
    var T = lu(t.data, {
      graphicalItems: i.filter(function(K) {
        var Q, de = o in K.props ? K.props[o] : (Q = K.type.defaultProps) === null || Q === void 0 ? void 0 : Q[o];
        return de === S;
      }),
      dataStartIndex: c,
      dataEndIndex: s
    }), E = T.length, j, $, I;
    nB(g.domain, w, b) && (j = Jf(g.domain, null, w), h && (b === "number" || x !== "auto") && (I = ti(T, O, "category")));
    var M = WA(b);
    if (!j || j.length === 0) {
      var k, N = (k = g.domain) !== null && k !== void 0 ? k : M;
      if (O) {
        if (j = ti(T, O, b), b === "category" && h) {
          var B = D_(j);
          m && B ? ($ = j, j = ho(0, E)) : m || (j = Ug(N, j, v).reduce(function(K, Q) {
            return K.indexOf(Q) >= 0 ? K : [].concat(En(K), [Q]);
          }, []));
        } else if (b === "category")
          m ? j = j.filter(function(K) {
            return K !== "" && !V(K);
          }) : j = Ug(N, j, v).reduce(function(K, Q) {
            return K.indexOf(Q) >= 0 || Q === "" || V(Q) ? K : [].concat(En(K), [Q]);
          }, []);
        else if (b === "number") {
          var F = XM(T, i.filter(function(K) {
            var Q, de, be = o in K.props ? K.props[o] : (Q = K.type.defaultProps) === null || Q === void 0 ? void 0 : Q[o], Ue = "hide" in K.props ? K.props.hide : (de = K.type.defaultProps) === null || de === void 0 ? void 0 : de.hide;
            return be === S && (P || !Ue);
          }), O, a, f);
          F && (j = F);
        }
        h && (b === "number" || x !== "auto") && (I = ti(T, O, "category"));
      } else h ? j = ho(0, E) : u && u[S] && u[S].hasStack && b === "number" ? j = p === "expand" ? [0, 1] : bw(u[S].stackGroups, c, s) : j = lw(T, i.filter(function(K) {
        var Q = o in K.props ? K.props[o] : K.type.defaultProps[o], de = "hide" in K.props ? K.props.hide : K.type.defaultProps.hide;
        return Q === S && (P || !de);
      }), b, f, !0);
      if (b === "number")
        j = Fp(l, j, S, a, A), N && (j = Jf(N, j, w));
      else if (b === "category" && N) {
        var U = N, Z = j.every(function(K) {
          return U.indexOf(K) >= 0;
        });
        Z && (j = U);
      }
    }
    return C(C({}, y), {}, X({}, S, C(C({}, g), {}, {
      axisType: a,
      domain: j,
      categoricalDomain: I,
      duplicateDomain: $,
      originalDomain: (d = g.domain) !== null && d !== void 0 ? d : M,
      isCategorical: h,
      layout: f
    })));
  }, {});
}, IB = function(t, r) {
  var n = r.graphicalItems, i = r.Axis, a = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, p = lu(t.data, {
    graphicalItems: n,
    dataStartIndex: c,
    dataEndIndex: s
  }), h = p.length, y = fw(f, a), v = -1;
  return n.reduce(function(d, g) {
    var b = g.type.defaultProps !== void 0 ? C(C({}, g.type.defaultProps), g.props) : g.props, O = b[o], w = WA("number");
    if (!d[O]) {
      v++;
      var m;
      return y ? m = ho(0, h) : u && u[O] && u[O].hasStack ? (m = bw(u[O].stackGroups, c, s), m = Fp(l, m, O, a)) : (m = Jf(w, lw(p, n.filter(function(x) {
        var A, P, S = o in x.props ? x.props[o] : (A = x.type.defaultProps) === null || A === void 0 ? void 0 : A[o], T = "hide" in x.props ? x.props.hide : (P = x.type.defaultProps) === null || P === void 0 ? void 0 : P.hide;
        return S === O && !T;
      }), "number", f), i.defaultProps.allowDataOverflow), m = Fp(l, m, O, a)), C(C({}, d), {}, X({}, O, C(C({
        axisType: a
      }, i.defaultProps), {}, {
        hide: !0,
        orientation: Ye(jB, "".concat(a, ".").concat(v % 2), null),
        domain: m,
        originalDomain: w,
        isCategorical: y,
        layout: f
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return d;
  }, {});
}, CB = function(t, r) {
  var n = r.axisType, i = n === void 0 ? "xAxis" : n, a = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.children, l = "".concat(i, "Id"), p = De(f, a), h = {};
  return p && p.length ? h = MB(t, {
    axes: p,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  }) : o && o.length && (h = IB(t, {
    Axis: a,
    graphicalItems: o,
    axisType: i,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  })), h;
}, kB = function(t) {
  var r = Ut(t), n = Mt(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: fh(n, function(i) {
      return i.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: Ya(r, n)
  };
}, ax = function(t) {
  var r = t.children, n = t.defaultShowTooltip, i = Ve(r, vn), a = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), i && i.props && (i.props.startIndex >= 0 && (a = i.props.startIndex), i.props.endIndex >= 0 && (o = i.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: a,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, RB = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = It(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, ox = function(t) {
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
}, DB = function(t, r) {
  var n = t.props, i = t.graphicalItems, a = t.xAxisMap, o = a === void 0 ? {} : a, u = t.yAxisMap, c = u === void 0 ? {} : u, s = n.width, f = n.height, l = n.children, p = n.margin || {}, h = Ve(l, vn), y = Ve(l, xr), v = Object.keys(c).reduce(function(m, x) {
    var A = c[x], P = A.orientation;
    return !A.mirror && !A.hide ? C(C({}, m), {}, X({}, P, m[P] + A.width)) : m;
  }, {
    left: p.left || 0,
    right: p.right || 0
  }), d = Object.keys(o).reduce(function(m, x) {
    var A = o[x], P = A.orientation;
    return !A.mirror && !A.hide ? C(C({}, m), {}, X({}, P, Ye(m, "".concat(P)) + A.height)) : m;
  }, {
    top: p.top || 0,
    bottom: p.bottom || 0
  }), g = C(C({}, d), v), b = g.bottom;
  h && (g.bottom += h.props.height || vn.defaultProps.height), y && r && (g = GM(g, i, n, r));
  var O = s - g.left - g.right, w = f - g.top - g.bottom;
  return C(C({
    brushBottom: b
  }, g), {}, {
    // never return negative values for height and width
    width: Math.max(O, 0),
    height: Math.max(w, 0)
  });
}, NB = function(t, r) {
  if (r === "xAxis")
    return t[r].width;
  if (r === "yAxis")
    return t[r].height;
}, Rr = function(t) {
  var r = t.chartName, n = t.GraphicalChild, i = t.defaultTooltipEventType, a = i === void 0 ? "axis" : i, o = t.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, c = t.axisComponents, s = t.legendContent, f = t.formatAxisMap, l = t.defaultProps, p = function(g, b) {
    var O = b.graphicalItems, w = b.stackGroups, m = b.offset, x = b.updateId, A = b.dataStartIndex, P = b.dataEndIndex, S = g.barSize, T = g.layout, E = g.barGap, j = g.barCategoryGap, $ = g.maxBarSize, I = ox(T), M = I.numericAxisName, k = I.cateAxisName, N = RB(O), B = [];
    return O.forEach(function(F, U) {
      var Z = lu(g.data, {
        graphicalItems: [F],
        dataStartIndex: A,
        dataEndIndex: P
      }), K = F.type.defaultProps !== void 0 ? C(C({}, F.type.defaultProps), F.props) : F.props, Q = K.dataKey, de = K.maxBarSize, be = K["".concat(M, "Id")], Ue = K["".concat(k, "Id")], or = {}, Be = c.reduce(function(ur, cr) {
        var fu = b["".concat(cr.axisType, "Map")], Zh = K["".concat(cr.axisType, "Id")];
        fu && fu[Zh] || cr.axisType === "zAxis" || jr();
        var Jh = fu[Zh];
        return C(C({}, ur), {}, X(X({}, cr.axisType, Jh), "".concat(cr.axisType, "Ticks"), Mt(Jh)));
      }, or), z = Be[k], ee = Be["".concat(k, "Ticks")], te = w && w[be] && w[be].hasStack && tI(F, w[be].stackGroups), L = It(F.type).indexOf("Bar") >= 0, me = Ya(z, ee), re = [], we = N && UM({
        barSize: S,
        stackGroups: w,
        totalSize: NB(Be, k)
      });
      if (L) {
        var Ae, Fe, zt = V(de) ? $ : de, Lr = (Ae = (Fe = Ya(z, ee, !0)) !== null && Fe !== void 0 ? Fe : zt) !== null && Ae !== void 0 ? Ae : 0;
        re = HM({
          barGap: E,
          barCategoryGap: j,
          bandSize: Lr !== me ? Lr : me,
          sizeList: we[Ue],
          maxBarSize: zt
        }), Lr !== me && (re = re.map(function(ur) {
          return C(C({}, ur), {}, {
            position: C(C({}, ur.position), {}, {
              offset: ur.position.offset - Lr / 2
            })
          });
        }));
      }
      var ua = F && F.type && F.type.getComposedData;
      ua && B.push({
        props: C(C({}, ua(C(C({}, Be), {}, {
          displayedData: Z,
          props: g,
          dataKey: Q,
          item: F,
          bandSize: me,
          barPosition: re,
          offset: m,
          stackedData: te,
          layout: T,
          dataStartIndex: A,
          dataEndIndex: P
        }))), {}, X(X(X({
          key: F.key || "item-".concat(U)
        }, M, Be[M]), k, Be[k]), "animationId", x)),
        childIndex: X_(F, g.children),
        item: F
      });
    }), B;
  }, h = function(g, b) {
    var O = g.props, w = g.dataStartIndex, m = g.dataEndIndex, x = g.updateId;
    if (!uv({
      props: O
    }))
      return null;
    var A = O.children, P = O.layout, S = O.stackOffset, T = O.data, E = O.reverseStackOrder, j = ox(P), $ = j.numericAxisName, I = j.cateAxisName, M = De(A, n), k = eI(T, M, "".concat($, "Id"), "".concat(I, "Id"), S, E), N = c.reduce(function(K, Q) {
      var de = "".concat(Q.axisType, "Map");
      return C(C({}, K), {}, X({}, de, CB(O, C(C({}, Q), {}, {
        graphicalItems: M,
        stackGroups: Q.axisType === $ && k,
        dataStartIndex: w,
        dataEndIndex: m
      }))));
    }, {}), B = DB(C(C({}, N), {}, {
      props: O,
      graphicalItems: M
    }), b == null ? void 0 : b.legendBBox);
    Object.keys(N).forEach(function(K) {
      N[K] = f(O, N[K], B, K.replace("Map", ""), r);
    });
    var F = N["".concat(I, "Map")], U = kB(F), Z = p(O, C(C({}, N), {}, {
      dataStartIndex: w,
      dataEndIndex: m,
      updateId: x,
      graphicalItems: M,
      stackGroups: k,
      offset: B
    }));
    return C(C({
      formattedGraphicalItems: Z,
      graphicalItems: M,
      offset: B,
      stackGroups: k
    }, U), N);
  }, y = /* @__PURE__ */ (function(d) {
    function g(b) {
      var O, w, m;
      return yB(this, g), m = bB(this, g, [b]), X(m, "eventEmitterSymbol", Symbol("rechartsEventEmitter")), X(m, "accessibilityManager", new rB()), X(m, "handleLegendBBoxUpdate", function(x) {
        if (x) {
          var A = m.state, P = A.dataStartIndex, S = A.dataEndIndex, T = A.updateId;
          m.setState(C({
            legendBBox: x
          }, h({
            props: m.props,
            dataStartIndex: P,
            dataEndIndex: S,
            updateId: T
          }, C(C({}, m.state), {}, {
            legendBBox: x
          }))));
        }
      }), X(m, "handleReceiveSyncEvent", function(x, A, P) {
        if (m.props.syncId === x) {
          if (P === m.eventEmitterSymbol && typeof m.props.syncMethod != "function")
            return;
          m.applySyncEvent(A);
        }
      }), X(m, "handleBrushChange", function(x) {
        var A = x.startIndex, P = x.endIndex;
        if (A !== m.state.dataStartIndex || P !== m.state.dataEndIndex) {
          var S = m.state.updateId;
          m.setState(function() {
            return C({
              dataStartIndex: A,
              dataEndIndex: P
            }, h({
              props: m.props,
              dataStartIndex: A,
              dataEndIndex: P,
              updateId: S
            }, m.state));
          }), m.triggerSyncEvent({
            dataStartIndex: A,
            dataEndIndex: P
          });
        }
      }), X(m, "handleMouseEnter", function(x) {
        var A = m.getMouseInfo(x);
        if (A) {
          var P = C(C({}, A), {}, {
            isTooltipActive: !0
          });
          m.setState(P), m.triggerSyncEvent(P);
          var S = m.props.onMouseEnter;
          G(S) && S(P, x);
        }
      }), X(m, "triggeredAfterMouseMove", function(x) {
        var A = m.getMouseInfo(x), P = A ? C(C({}, A), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        m.setState(P), m.triggerSyncEvent(P);
        var S = m.props.onMouseMove;
        G(S) && S(P, x);
      }), X(m, "handleItemMouseEnter", function(x) {
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
      }), X(m, "handleItemMouseLeave", function() {
        m.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), X(m, "handleMouseMove", function(x) {
        x.persist(), m.throttleTriggeredAfterMouseMove(x);
      }), X(m, "handleMouseLeave", function(x) {
        m.throttleTriggeredAfterMouseMove.cancel();
        var A = {
          isTooltipActive: !1
        };
        m.setState(A), m.triggerSyncEvent(A);
        var P = m.props.onMouseLeave;
        G(P) && P(A, x);
      }), X(m, "handleOuterEvent", function(x) {
        var A = V_(x), P = Ye(m.props, "".concat(A));
        if (A && G(P)) {
          var S, T;
          /.*touch.*/i.test(A) ? T = m.getMouseInfo(x.changedTouches[0]) : T = m.getMouseInfo(x), P((S = T) !== null && S !== void 0 ? S : {}, x);
        }
      }), X(m, "handleClick", function(x) {
        var A = m.getMouseInfo(x);
        if (A) {
          var P = C(C({}, A), {}, {
            isTooltipActive: !0
          });
          m.setState(P), m.triggerSyncEvent(P);
          var S = m.props.onClick;
          G(S) && S(P, x);
        }
      }), X(m, "handleMouseDown", function(x) {
        var A = m.props.onMouseDown;
        if (G(A)) {
          var P = m.getMouseInfo(x);
          A(P, x);
        }
      }), X(m, "handleMouseUp", function(x) {
        var A = m.props.onMouseUp;
        if (G(A)) {
          var P = m.getMouseInfo(x);
          A(P, x);
        }
      }), X(m, "handleTouchMove", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.throttleTriggeredAfterMouseMove(x.changedTouches[0]);
      }), X(m, "handleTouchStart", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.handleMouseDown(x.changedTouches[0]);
      }), X(m, "handleTouchEnd", function(x) {
        x.changedTouches != null && x.changedTouches.length > 0 && m.handleMouseUp(x.changedTouches[0]);
      }), X(m, "handleDoubleClick", function(x) {
        var A = m.props.onDoubleClick;
        if (G(A)) {
          var P = m.getMouseInfo(x);
          A(P, x);
        }
      }), X(m, "handleContextMenu", function(x) {
        var A = m.props.onContextMenu;
        if (G(A)) {
          var P = m.getMouseInfo(x);
          A(P, x);
        }
      }), X(m, "triggerSyncEvent", function(x) {
        m.props.syncId !== void 0 && vf.emit(yf, m.props.syncId, x, m.eventEmitterSymbol);
      }), X(m, "applySyncEvent", function(x) {
        var A = m.props, P = A.layout, S = A.syncMethod, T = m.state.updateId, E = x.dataStartIndex, j = x.dataEndIndex;
        if (x.dataStartIndex !== void 0 || x.dataEndIndex !== void 0)
          m.setState(C({
            dataStartIndex: E,
            dataEndIndex: j
          }, h({
            props: m.props,
            dataStartIndex: E,
            dataEndIndex: j,
            updateId: T
          }, m.state)));
        else if (x.activeTooltipIndex !== void 0) {
          var $ = x.chartX, I = x.chartY, M = x.activeTooltipIndex, k = m.state, N = k.offset, B = k.tooltipTicks;
          if (!N)
            return;
          if (typeof S == "function")
            M = S(B, x);
          else if (S === "value") {
            M = -1;
            for (var F = 0; F < B.length; F++)
              if (B[F].value === x.activeLabel) {
                M = F;
                break;
              }
          }
          var U = C(C({}, N), {}, {
            x: N.left,
            y: N.top
          }), Z = Math.min($, U.x + U.width), K = Math.min(I, U.y + U.height), Q = B[M] && B[M].value, de = Kp(m.state, m.props.data, M), be = B[M] ? {
            x: P === "horizontal" ? B[M].coordinate : Z,
            y: P === "horizontal" ? K : B[M].coordinate
          } : zA;
          m.setState(C(C({}, x), {}, {
            activeLabel: Q,
            activeCoordinate: be,
            activePayload: de,
            activeTooltipIndex: M
          }));
        } else
          m.setState(x);
      }), X(m, "renderCursor", function(x) {
        var A, P = m.state, S = P.isTooltipActive, T = P.activeCoordinate, E = P.activePayload, j = P.offset, $ = P.activeTooltipIndex, I = P.tooltipAxisBandSize, M = m.getTooltipEventType(), k = (A = x.props.active) !== null && A !== void 0 ? A : S, N = m.props.layout, B = x.key || "_recharts-cursor";
        return /* @__PURE__ */ _.createElement(sB, {
          key: B,
          activeCoordinate: T,
          activePayload: E,
          activeTooltipIndex: $,
          chartName: r,
          element: x,
          isActive: k,
          layout: N,
          offset: j,
          tooltipAxisBandSize: I,
          tooltipEventType: M
        });
      }), X(m, "renderPolarAxis", function(x, A, P) {
        var S = Ye(x, "type.axisType"), T = Ye(m.state, "".concat(S, "Map")), E = x.type.defaultProps, j = E !== void 0 ? C(C({}, E), x.props) : x.props, $ = T && T[j["".concat(S, "Id")]];
        return /* @__PURE__ */ R.cloneElement(x, C(C({}, $), {}, {
          className: Y(S, $.className),
          key: x.key || "".concat(A, "-").concat(P),
          ticks: Mt($, !0)
        }));
      }), X(m, "renderPolarGrid", function(x) {
        var A = x.props, P = A.radialLines, S = A.polarAngles, T = A.polarRadius, E = m.state, j = E.radiusAxisMap, $ = E.angleAxisMap, I = Ut(j), M = Ut($), k = M.cx, N = M.cy, B = M.innerRadius, F = M.outerRadius;
        return /* @__PURE__ */ R.cloneElement(x, {
          polarAngles: Array.isArray(S) ? S : Mt(M, !0).map(function(U) {
            return U.coordinate;
          }),
          polarRadius: Array.isArray(T) ? T : Mt(I, !0).map(function(U) {
            return U.coordinate;
          }),
          cx: k,
          cy: N,
          innerRadius: B,
          outerRadius: F,
          key: x.key || "polar-grid",
          radialLines: P
        });
      }), X(m, "renderLegend", function() {
        var x = m.state.formattedGraphicalItems, A = m.props, P = A.children, S = A.width, T = A.height, E = m.props.margin || {}, j = S - (E.left || 0) - (E.right || 0), $ = cw({
          children: P,
          formattedGraphicalItems: x,
          legendWidth: j,
          legendContent: s
        });
        if (!$)
          return null;
        var I = $.item, M = rx($, lB);
        return /* @__PURE__ */ R.cloneElement(I, C(C({}, M), {}, {
          chartWidth: S,
          chartHeight: T,
          margin: E,
          onBBoxUpdate: m.handleLegendBBoxUpdate
        }));
      }), X(m, "renderTooltip", function() {
        var x, A = m.props, P = A.children, S = A.accessibilityLayer, T = Ve(P, yt);
        if (!T)
          return null;
        var E = m.state, j = E.isTooltipActive, $ = E.activeCoordinate, I = E.activePayload, M = E.activeLabel, k = E.offset, N = (x = T.props.active) !== null && x !== void 0 ? x : j;
        return /* @__PURE__ */ R.cloneElement(T, {
          viewBox: C(C({}, k), {}, {
            x: k.left,
            y: k.top
          }),
          active: N,
          label: M,
          payload: N ? I : [],
          coordinate: $,
          accessibilityLayer: S
        });
      }), X(m, "renderBrush", function(x) {
        var A = m.props, P = A.margin, S = A.data, T = m.state, E = T.offset, j = T.dataStartIndex, $ = T.dataEndIndex, I = T.updateId;
        return /* @__PURE__ */ R.cloneElement(x, {
          key: x.key || "_recharts-brush",
          onChange: ya(m.handleBrushChange, x.props.onChange),
          data: S,
          x: q(x.props.x) ? x.props.x : E.left,
          y: q(x.props.y) ? x.props.y : E.top + E.height + E.brushBottom - (P.bottom || 0),
          width: q(x.props.width) ? x.props.width : E.width,
          startIndex: j,
          endIndex: $,
          updateId: "brush-".concat(I)
        });
      }), X(m, "renderReferenceElement", function(x, A, P) {
        if (!x)
          return null;
        var S = m, T = S.clipPathId, E = m.state, j = E.xAxisMap, $ = E.yAxisMap, I = E.offset, M = x.type.defaultProps || {}, k = x.props, N = k.xAxisId, B = N === void 0 ? M.xAxisId : N, F = k.yAxisId, U = F === void 0 ? M.yAxisId : F;
        return /* @__PURE__ */ R.cloneElement(x, {
          key: x.key || "".concat(A, "-").concat(P),
          xAxis: j[B],
          yAxis: $[U],
          viewBox: {
            x: I.left,
            y: I.top,
            width: I.width,
            height: I.height
          },
          clipPathId: T
        });
      }), X(m, "renderActivePoints", function(x) {
        var A = x.item, P = x.activePoint, S = x.basePoint, T = x.childIndex, E = x.isRange, j = [], $ = A.props.key, I = A.item.type.defaultProps !== void 0 ? C(C({}, A.item.type.defaultProps), A.item.props) : A.item.props, M = I.activeDot, k = I.dataKey, N = C(C({
          index: T,
          dataKey: k,
          cx: P.x,
          cy: P.y,
          r: 4,
          fill: Nh(A.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: P.payload,
          value: P.value
        }, W(M, !1)), _a(M));
        return j.push(g.renderActiveDot(M, N, "".concat($, "-activePoint-").concat(T))), S ? j.push(g.renderActiveDot(M, C(C({}, N), {}, {
          cx: S.x,
          cy: S.y
        }), "".concat($, "-basePoint-").concat(T))) : E && j.push(null), j;
      }), X(m, "renderGraphicChild", function(x, A, P) {
        var S = m.filterFormatItem(x, A, P);
        if (!S)
          return null;
        var T = m.getTooltipEventType(), E = m.state, j = E.isTooltipActive, $ = E.tooltipAxis, I = E.activeTooltipIndex, M = E.activeLabel, k = m.props.children, N = Ve(k, yt), B = S.props, F = B.points, U = B.isRange, Z = B.baseLine, K = S.item.type.defaultProps !== void 0 ? C(C({}, S.item.type.defaultProps), S.item.props) : S.item.props, Q = K.activeDot, de = K.hide, be = K.activeBar, Ue = K.activeShape, or = !!(!de && j && N && (Q || be || Ue)), Be = {};
        T !== "axis" && N && N.props.trigger === "click" ? Be = {
          onClick: ya(m.handleItemMouseEnter, x.props.onClick)
        } : T !== "axis" && (Be = {
          onMouseLeave: ya(m.handleItemMouseLeave, x.props.onMouseLeave),
          onMouseEnter: ya(m.handleItemMouseEnter, x.props.onMouseEnter)
        });
        var z = /* @__PURE__ */ R.cloneElement(x, C(C({}, S.props), Be));
        function ee(cr) {
          return typeof $.dataKey == "function" ? $.dataKey(cr.payload) : null;
        }
        if (or)
          if (I >= 0) {
            var te, L;
            if ($.dataKey && !$.allowDuplicatedCategory) {
              var me = typeof $.dataKey == "function" ? ee : "payload.".concat($.dataKey.toString());
              te = Aa(F, me, M), L = U && Z && Aa(Z, me, M);
            } else
              te = F == null ? void 0 : F[I], L = U && Z && Z[I];
            if (Ue || be) {
              var re = x.props.activeIndex !== void 0 ? x.props.activeIndex : I;
              return [/* @__PURE__ */ R.cloneElement(x, C(C(C({}, S.props), Be), {}, {
                activeIndex: re
              })), null, null];
            }
            if (!V(te))
              return [z].concat(En(m.renderActivePoints({
                item: S,
                activePoint: te,
                basePoint: L,
                childIndex: I,
                isRange: U
              })));
          } else {
            var we, Ae = (we = m.getItemByXY(m.state.activeCoordinate)) !== null && we !== void 0 ? we : {
              graphicalItem: z
            }, Fe = Ae.graphicalItem, zt = Fe.item, Lr = zt === void 0 ? x : zt, ua = Fe.childIndex, ur = C(C(C({}, S.props), Be), {}, {
              activeIndex: ua
            });
            return [/* @__PURE__ */ R.cloneElement(Lr, ur), null, null];
          }
        return U ? [z, null, null] : [z, null];
      }), X(m, "renderCustomized", function(x, A, P) {
        return /* @__PURE__ */ R.cloneElement(x, C(C({
          key: "recharts-customized-".concat(P)
        }, m.props), m.state));
      }), X(m, "renderMap", {
        CartesianGrid: {
          handler: Oa,
          once: !0
        },
        ReferenceArea: {
          handler: m.renderReferenceElement
        },
        ReferenceLine: {
          handler: Oa
        },
        ReferenceDot: {
          handler: m.renderReferenceElement
        },
        XAxis: {
          handler: Oa
        },
        YAxis: {
          handler: Oa
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
      }), m.clipPathId = "".concat((O = b.id) !== null && O !== void 0 ? O : Qt("recharts"), "-clip"), m.throttleTriggeredAfterMouseMove = cO(m.triggeredAfterMouseMove, (w = b.throttleDelay) !== null && w !== void 0 ? w : 1e3 / 60), m.state = {}, m;
    }
    return wB(g, d), gB(g, [{
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
        var O = this.props, w = O.children, m = O.data, x = O.height, A = O.layout, P = Ve(w, yt);
        if (P) {
          var S = P.props.defaultIndex;
          if (!(typeof S != "number" || S < 0 || S > this.state.tooltipTicks.length - 1)) {
            var T = this.state.tooltipTicks[S] && this.state.tooltipTicks[S].value, E = Kp(this.state, m, S, T), j = this.state.tooltipTicks[S].coordinate, $ = (this.state.offset.top + x) / 2, I = A === "horizontal", M = I ? {
              x: j,
              y: $
            } : {
              y: j,
              x: $
            }, k = this.state.formattedGraphicalItems.find(function(B) {
              var F = B.item;
              return F.type.name === "Scatter";
            });
            k && (M = C(C({}, M), k.props.points[S].tooltipPosition), E = k.props.points[S].tooltipPayload);
            var N = {
              activeTooltipIndex: S,
              isTooltipActive: !0,
              activeLabel: T,
              activePayload: E,
              activeCoordinate: M
            };
            this.setState(N), this.renderCursor(P), this.accessibilityManager.setIndex(S);
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
        xf([Ve(O.children, yt)], [Ve(this.props.children, yt)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var O = Ve(this.props.children, yt);
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
        var w = this.container, m = w.getBoundingClientRect(), x = Dj(m), A = {
          chartX: Math.round(O.pageX - x.left),
          chartY: Math.round(O.pageY - x.top)
        }, P = m.width / w.offsetWidth || 1, S = this.inRange(A.chartX, A.chartY, P);
        if (!S)
          return null;
        var T = this.state, E = T.xAxisMap, j = T.yAxisMap, $ = this.getTooltipEventType(), I = ix(this.state, this.props.data, this.props.layout, S);
        if ($ !== "axis" && E && j) {
          var M = Ut(E).scale, k = Ut(j).scale, N = M && M.invert ? M.invert(A.chartX) : null, B = k && k.invert ? k.invert(A.chartY) : null;
          return C(C({}, A), {}, {
            xValue: N,
            yValue: B
          }, I);
        }
        return I ? C(C({}, A), I) : null;
      }
    }, {
      key: "inRange",
      value: function(O, w) {
        var m = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, x = this.props.layout, A = O / m, P = w / m;
        if (x === "horizontal" || x === "vertical") {
          var S = this.state.offset, T = A >= S.left && A <= S.left + S.width && P >= S.top && P <= S.top + S.height;
          return T ? {
            x: A,
            y: P
          } : null;
        }
        var E = this.state, j = E.angleAxisMap, $ = E.radiusAxisMap;
        if (j && $) {
          var I = Ut(j);
          return Vg({
            x: A,
            y: P
          }, I);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var O = this.props.children, w = this.getTooltipEventType(), m = Ve(O, yt), x = {};
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
        var A = _a(this.props, this.handleOuterEvent);
        return C(C({}, A), x);
      }
    }, {
      key: "addListener",
      value: function() {
        vf.on(yf, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        vf.removeListener(yf, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(O, w, m) {
        for (var x = this.state.formattedGraphicalItems, A = 0, P = x.length; A < P; A++) {
          var S = x[A];
          if (S.item === O || S.props.key === O.key || w === It(S.item.type) && m === S.childIndex)
            return S;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var O = this.clipPathId, w = this.state.offset, m = w.left, x = w.top, A = w.height, P = w.width;
        return /* @__PURE__ */ _.createElement("defs", null, /* @__PURE__ */ _.createElement("clipPath", {
          id: O
        }, /* @__PURE__ */ _.createElement("rect", {
          x: m,
          y: x,
          height: A,
          width: P
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var O = this.state.xAxisMap;
        return O ? Object.entries(O).reduce(function(w, m) {
          var x = tx(m, 2), A = x[0], P = x[1];
          return C(C({}, w), {}, X({}, A, P.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var O = this.state.yAxisMap;
        return O ? Object.entries(O).reduce(function(w, m) {
          var x = tx(m, 2), A = x[0], P = x[1];
          return C(C({}, w), {}, X({}, A, P.scale));
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
          for (var A = 0, P = m.length; A < P; A++) {
            var S = m[A], T = S.props, E = S.item, j = E.type.defaultProps !== void 0 ? C(C({}, E.type.defaultProps), E.props) : E.props, $ = It(E.type);
            if ($ === "Bar") {
              var I = (T.data || []).find(function(B) {
                return Jk(O, B);
              });
              if (I)
                return {
                  graphicalItem: S,
                  payload: I
                };
            } else if ($ === "RadialBar") {
              var M = (T.data || []).find(function(B) {
                return Vg(O, B);
              });
              if (M)
                return {
                  graphicalItem: S,
                  payload: M
                };
            } else if (ru(S, x) || nu(S, x) || qi(S, x)) {
              var k = MD({
                graphicalItem: S,
                activeTooltipItem: x,
                itemData: j.data
              }), N = j.activeIndex === void 0 ? k : j.activeIndex;
              return {
                graphicalItem: C(C({}, S), {}, {
                  childIndex: N
                }),
                payload: qi(S, x) ? j.data[k] : S.props.data[k]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var O = this;
        if (!uv(this))
          return null;
        var w = this.props, m = w.children, x = w.className, A = w.width, P = w.height, S = w.style, T = w.compact, E = w.title, j = w.desc, $ = rx(w, fB), I = W($, !1);
        if (T)
          return /* @__PURE__ */ _.createElement(I0, {
            state: this.state,
            width: this.props.width,
            height: this.props.height,
            clipPathId: this.clipPathId
          }, /* @__PURE__ */ _.createElement(wf, Gr({}, I, {
            width: A,
            height: P,
            title: E,
            desc: j
          }), this.renderClipPath(), sv(m, this.renderMap)));
        if (this.props.accessibilityLayer) {
          var M, k;
          I.tabIndex = (M = this.props.tabIndex) !== null && M !== void 0 ? M : 0, I.role = (k = this.props.role) !== null && k !== void 0 ? k : "application", I.onKeyDown = function(B) {
            O.accessibilityManager.keyboardEvent(B);
          }, I.onFocus = function() {
            O.accessibilityManager.focus();
          };
        }
        var N = this.parseEventsOfWrapper();
        return /* @__PURE__ */ _.createElement(I0, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ _.createElement("div", Gr({
          className: Y("recharts-wrapper", x),
          style: C({
            position: "relative",
            cursor: "default",
            width: A,
            height: P
          }, S)
        }, N, {
          ref: function(F) {
            O.container = F;
          }
        }), /* @__PURE__ */ _.createElement(wf, Gr({}, I, {
          width: A,
          height: P,
          title: E,
          desc: j,
          style: EB
        }), this.renderClipPath(), sv(m, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]);
  })(R.Component);
  X(y, "displayName", r), X(y, "defaultProps", C({
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
  }, l)), X(y, "getDerivedStateFromProps", function(d, g) {
    var b = d.dataKey, O = d.data, w = d.children, m = d.width, x = d.height, A = d.layout, P = d.stackOffset, S = d.margin, T = g.dataStartIndex, E = g.dataEndIndex;
    if (g.updateId === void 0) {
      var j = ax(d);
      return C(C(C({}, j), {}, {
        updateId: 0
      }, h(C(C({
        props: d
      }, j), {}, {
        updateId: 0
      }), g)), {}, {
        prevDataKey: b,
        prevData: O,
        prevWidth: m,
        prevHeight: x,
        prevLayout: A,
        prevStackOffset: P,
        prevMargin: S,
        prevChildren: w
      });
    }
    if (b !== g.prevDataKey || O !== g.prevData || m !== g.prevWidth || x !== g.prevHeight || A !== g.prevLayout || P !== g.prevStackOffset || !Vr(S, g.prevMargin)) {
      var $ = ax(d), I = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: g.chartX,
        chartY: g.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: g.isTooltipActive
      }, M = C(C({}, ix(g, O, A)), {}, {
        updateId: g.updateId + 1
      }), k = C(C(C({}, $), I), M);
      return C(C(C({}, k), h(C({
        props: d
      }, k), g)), {}, {
        prevDataKey: b,
        prevData: O,
        prevWidth: m,
        prevHeight: x,
        prevLayout: A,
        prevStackOffset: P,
        prevMargin: S,
        prevChildren: w
      });
    }
    if (!xf(w, g.prevChildren)) {
      var N, B, F, U, Z = Ve(w, vn), K = Z && (N = (B = Z.props) === null || B === void 0 ? void 0 : B.startIndex) !== null && N !== void 0 ? N : T, Q = Z && (F = (U = Z.props) === null || U === void 0 ? void 0 : U.endIndex) !== null && F !== void 0 ? F : E, de = K !== T || Q !== E, be = !V(O), Ue = be && !de ? g.updateId : g.updateId + 1;
      return C(C({
        updateId: Ue
      }, h(C(C({
        props: d
      }, g), {}, {
        updateId: Ue,
        dataStartIndex: K,
        dataEndIndex: Q
      }), g)), {}, {
        prevChildren: w,
        dataStartIndex: K,
        dataEndIndex: Q
      });
    }
    return null;
  }), X(y, "renderActiveDot", function(d, g, b) {
    var O;
    return /* @__PURE__ */ R.isValidElement(d) ? O = /* @__PURE__ */ R.cloneElement(d, g) : G(d) ? O = d(g) : O = /* @__PURE__ */ _.createElement(Nn, g), /* @__PURE__ */ _.createElement(J, {
      className: "recharts-active-dot",
      key: b
    }, O);
  });
  var v = /* @__PURE__ */ R.forwardRef(function(g, b) {
    return /* @__PURE__ */ _.createElement(y, Gr({}, g, {
      ref: b
    }));
  });
  return v.displayName = y.displayName, v;
}, LB = Rr({
  chartName: "LineChart",
  GraphicalChild: na,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: pt
  }, {
    axisType: "yAxis",
    AxisComp: ht
  }],
  formatAxisMap: au
}), qB = Rr({
  chartName: "BarChart",
  GraphicalChild: kr,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: pt
  }, {
    axisType: "yAxis",
    AxisComp: ht
  }],
  formatAxisMap: au
}), BB = Rr({
  chartName: "PieChart",
  GraphicalChild: Ft,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Cr
  }, {
    axisType: "radiusAxis",
    AxisComp: Ln
  }],
  formatAxisMap: qh,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), FB = Rr({
  chartName: "RadarChart",
  GraphicalChild: ea,
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Cr
  }, {
    axisType: "radiusAxis",
    AxisComp: Ln
  }],
  formatAxisMap: qh,
  defaultProps: {
    layout: "centric",
    startAngle: 90,
    endAngle: -270,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
}), zB = Rr({
  chartName: "ScatterChart",
  GraphicalChild: aa,
  defaultTooltipEventType: "item",
  validateTooltipEventTypes: ["item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: pt
  }, {
    axisType: "yAxis",
    AxisComp: ht
  }, {
    axisType: "zAxis",
    AxisComp: ia
  }],
  formatAxisMap: au
}), WB = Rr({
  chartName: "AreaChart",
  GraphicalChild: nr,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: pt
  }, {
    axisType: "yAxis",
    AxisComp: ht
  }],
  formatAxisMap: au
}), KB = Rr({
  chartName: "RadialBarChart",
  GraphicalChild: ta,
  legendContent: "children",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Cr
  }, {
    axisType: "radiusAxis",
    AxisComp: Ln
  }],
  formatAxisMap: qh,
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
const UB = { light: "", dark: ".dark" }, KA = R.createContext(null);
function UA() {
  const e = R.useContext(KA);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const ir = R.forwardRef(({ id: e, className: t, children: r, config: n, ...i }, a) => {
  const o = R.useId(), u = `chart-${e || o.replace(/:/g, "")}`;
  return R.useEffect(() => {
    const c = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(c);
  }, []), /* @__PURE__ */ D.jsx(KA.Provider, { value: { config: n }, children: /* @__PURE__ */ D.jsxs(
    "div",
    {
      "data-chart": u,
      ref: a,
      className: rt(
        "flex w-full min-w-0 aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        t
      ),
      ...i,
      children: [
        /* @__PURE__ */ D.jsx(GB, {}),
        /* @__PURE__ */ D.jsx(VB, { id: u, config: n }),
        /* @__PURE__ */ D.jsx(Tj, { children: r })
      ]
    }
  ) });
});
ir.displayName = "Chart";
const HB = [
  "[data-chart] .recharts-cartesian-grid line[stroke='#ccc'] { stroke: color-mix(in oklch, var(--color-border) 50%, transparent); }",
  "[data-chart] .recharts-dot[stroke='#fff'] { stroke: transparent; }",
  "[data-chart] .recharts-polar-grid [stroke='#ccc'] { stroke: var(--color-border); }",
  "[data-chart] .recharts-reference-line [stroke='#ccc'] { stroke: var(--color-border); }",
  "[data-chart] .recharts-sector[stroke='#fff'] { stroke: transparent; }"
].join(`
`);
function GB() {
  return /* @__PURE__ */ D.jsx("style", { dangerouslySetInnerHTML: { __html: HB } });
}
const VB = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme || n.color
  );
  return r.length ? /* @__PURE__ */ D.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(UB).map(
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
}, Dr = yt, ar = R.forwardRef(
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
  }, h) => {
    const { config: y } = UA(), v = R.useMemo(() => {
      var m;
      if (i || !(t != null && t.length))
        return null;
      const [g] = t, b = `${p || (g == null ? void 0 : g.dataKey) || (g == null ? void 0 : g.name) || "value"}`, O = Up(y, g, b), w = !p && typeof o == "string" ? ((m = y[o]) == null ? void 0 : m.label) || o : O == null ? void 0 : O.label;
      return u ? /* @__PURE__ */ D.jsx("div", { className: rt("font-medium", c), children: u(w, t) }) : w ? /* @__PURE__ */ D.jsx("div", { className: rt("font-medium", c), children: w }) : null;
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
    const d = t.length === 1 && n !== "dot";
    return /* @__PURE__ */ D.jsxs(
      "div",
      {
        ref: h,
        className: rt(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          r
        ),
        children: [
          d ? null : v,
          /* @__PURE__ */ D.jsx("div", { className: "grid gap-1.5", children: t.filter((g) => g.type !== "none").map((g, b) => {
            const O = `${l || g.name || g.dataKey || "value"}`, w = Up(y, g, O), m = f || g.payload.fill || g.color;
            return /* @__PURE__ */ D.jsx(
              "div",
              {
                className: rt(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  n === "dot" && "items-center"
                ),
                children: s && (g == null ? void 0 : g.value) !== void 0 && g.name ? s(g.value, g.name, g, b, g.payload) : /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
                  w != null && w.icon ? /* @__PURE__ */ D.jsx(w.icon, {}) : !a && /* @__PURE__ */ D.jsx(
                    "div",
                    {
                      className: rt(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": n === "dot",
                          "w-1": n === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                          "my-0.5": d && n === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": m,
                        "--color-border": m
                      }
                    }
                  ),
                  /* @__PURE__ */ D.jsxs(
                    "div",
                    {
                      className: rt(
                        "flex flex-1 justify-between leading-none",
                        d ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ D.jsxs("div", { className: "grid gap-1.5", children: [
                          d ? v : null,
                          /* @__PURE__ */ D.jsx("span", { className: "text-muted-foreground", children: (w == null ? void 0 : w.label) || g.name })
                        ] }),
                        g.value && /* @__PURE__ */ D.jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: g.value.toLocaleString() })
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
ar.displayName = "ChartTooltip";
const Bn = xr, Nr = R.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: r, verticalAlign: n = "bottom", nameKey: i }, a) => {
    const { config: o } = UA();
    return r != null && r.length ? /* @__PURE__ */ D.jsx(
      "div",
      {
        ref: a,
        className: rt(
          "flex flex-wrap items-center justify-center gap-4",
          n === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: r.filter((u) => u.type !== "none").map((u) => {
          const c = `${i || u.dataKey || "value"}`, s = Up(o, u, c);
          return /* @__PURE__ */ D.jsxs(
            "div",
            {
              className: rt(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                s != null && s.icon && !t ? /* @__PURE__ */ D.jsx(s.icon, {}) : /* @__PURE__ */ D.jsx(
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
Nr.displayName = "ChartLegend";
function Up(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
const ux = {
  default: "cn-sparkline-variant-default",
  success: "cn-sparkline-variant-success",
  warning: "cn-sparkline-variant-warning",
  destructive: "cn-sparkline-variant-destructive",
  info: "cn-sparkline-variant-info",
  muted: "cn-sparkline-variant-muted"
};
function XB(e, t, r, n) {
  const i = Math.min(...e), o = Math.max(...e) - i || 1, u = n / 2, c = r * 0.7 - u, s = u;
  return e.map((f, l) => {
    const p = e.length === 1 ? t / 2 : l / (e.length - 1) * t, h = s + c * (1 - (f - i) / o);
    return `${p},${h}`;
  }).join(" ");
}
function YB(e, t, r, n) {
  const i = Math.min(...e), o = Math.max(...e) - i || 1, u = n / 2, c = r * 0.7 - u, s = u, f = [];
  for (let l = 0; l < e.length; l++) {
    const p = e.length === 1 ? t / 2 : l / (e.length - 1) * t, h = s + c * (1 - (e[l] - i) / o);
    if (l > 0) {
      const y = s + c * (1 - (e[l - 1] - i) / o);
      f.push(`${p},${y}`);
    }
    f.push(`${p},${h}`);
  }
  return f.join(" ");
}
function ZB(e, t, r, n) {
  if (e.length < 2) {
    const h = t / 2, y = e[0], d = e[0] - y || 1, g = n / 2, b = r * 0.7 - g, w = g + b * (1 - (e[0] - y) / d);
    return `M ${h},${w}`;
  }
  const i = Math.min(...e), o = Math.max(...e) - i || 1, u = n / 2, c = r * 0.7 - u, s = u, f = e.map((h, y) => y / (e.length - 1) * t), l = e.map((h) => s + c * (1 - (h - i) / o));
  let p = `M ${f[0]},${l[0]}`;
  for (let h = 0; h < e.length - 1; h++) {
    const y = f[Math.max(0, h - 1)], v = l[Math.max(0, h - 1)], d = f[h], g = l[h], b = f[h + 1], O = l[h + 1], w = f[Math.min(e.length - 1, h + 2)], m = l[Math.min(e.length - 1, h + 2)], x = d + (b - y) / 6, A = g + (O - v) / 6, P = b - (w - d) / 6, S = O - (m - g) / 6;
    p += ` C ${x},${A} ${P},${S} ${b},${O}`;
  }
  return p;
}
let JB = 0;
function tF({
  data: e = [],
  height: t,
  variant: r = "default",
  indicatorClass: n,
  fill: i = !1,
  curve: a = "linear",
  strokeWidth: o = 1.5,
  mode: u = "line",
  className: c,
  cssClass: s
}) {
  if (typeof e == "string" || e.length === 0) return null;
  const f = ux[r ?? "default"] ?? ux.default, l = `spark-${++JB}`, p = 100, h = 40;
  if (u === "bar") {
    const m = Math.min(0, ...e), A = Math.max(...e) - m || 1, P = 1, S = (p - P * (e.length - 1)) / e.length;
    return /* @__PURE__ */ D.jsx(
      "svg",
      {
        className: rt(
          "cn-sparkline w-full",
          t == null && "h-6",
          f,
          c,
          s
        ),
        viewBox: `0 0 ${p} ${h}`,
        preserveAspectRatio: "none",
        style: t != null ? { height: t } : void 0,
        children: e.map((T, E) => {
          const j = (T - m) / A * (h - 1);
          return /* @__PURE__ */ D.jsx(
            "rect",
            {
              x: E * (S + P),
              y: h - j,
              width: S,
              height: j,
              fill: "currentColor",
              opacity: 0.7,
              rx: 0.5,
              className: n
            },
            E
          );
        })
      }
    );
  }
  const y = a === "smooth", v = a === "step", d = y ? ZB(e, p, h, o) : "", g = y ? "" : v ? YB(e, p, h, o) : XB(e, p, h, o), b = y ? `${d} L ${p},${h} L 0,${h} Z` : "", O = i && !y ? `${g} ${p},${h} 0,${h}` : "", w = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: o,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke",
    className: rt("cn-sparkline-line", n)
  };
  return /* @__PURE__ */ D.jsxs(
    "svg",
    {
      className: rt("cn-sparkline w-full", f, c, s),
      viewBox: `0 0 ${p} ${h}`,
      preserveAspectRatio: "none",
      style: { height: t },
      children: [
        i && /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
          /* @__PURE__ */ D.jsx("defs", { children: /* @__PURE__ */ D.jsxs("linearGradient", { id: l, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ D.jsx("stop", { offset: "0%", className: "cn-sparkline-fill-stop-start" }),
            /* @__PURE__ */ D.jsx("stop", { offset: "100%", className: "cn-sparkline-fill-stop-end" })
          ] }) }),
          y ? /* @__PURE__ */ D.jsx("path", { d: b, fill: `url(#${l})`, stroke: "none" }) : /* @__PURE__ */ D.jsx("polygon", { points: O, fill: `url(#${l})` })
        ] }),
        y ? /* @__PURE__ */ D.jsx("path", { d, ...w }) : /* @__PURE__ */ D.jsx("polyline", { points: g, ...w })
      ]
    }
  );
}
const Yh = (e) => new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1
}).format(e), Zt = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)"
];
function oa(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t[n.dataKey] = {
      label: n.label ?? n.dataKey,
      color: n.color ?? Zt[r % Zt.length]
    };
  }
  return t;
}
function HA(e, t) {
  const r = {};
  for (let n = 0; n < e.length; n++) {
    const i = String(e[n][t] ?? `item-${n}`);
    r[i] = {
      label: i,
      color: Zt[n % Zt.length]
    };
  }
  return r;
}
function rF({
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
  showYAxis: f = !0,
  yAxisFormat: l = "auto",
  className: p
}) {
  if (typeof e == "string") return null;
  const h = oa(t);
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: h,
      className: p,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(qB, { data: e, layout: a ? "vertical" : "horizontal", children: [
        s && /* @__PURE__ */ D.jsx(ra, { vertical: a, horizontal: !a }),
        a && r && /* @__PURE__ */ D.jsx(
          ht,
          {
            dataKey: r,
            type: "category",
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        a && /* @__PURE__ */ D.jsx(pt, { type: "number", hide: !0 }),
        !a && r && /* @__PURE__ */ D.jsx(
          pt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        !a && f && /* @__PURE__ */ D.jsx(
          ht,
          {
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8,
            tickFormatter: l === "compact" ? Yh : void 0
          }
        ),
        c && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, {}) }),
        u && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, {}) }),
        t.map((y) => /* @__PURE__ */ D.jsx(
          kr,
          {
            dataKey: y.dataKey,
            fill: `var(--color-${y.dataKey})`,
            radius: o,
            stackId: i ? "stack" : void 0
          },
          y.dataKey
        ))
      ] })
    }
  );
}
const GA = {
  linear: "linear",
  smooth: "monotone",
  step: "step"
};
function nF({
  data: e = [],
  series: t,
  xAxis: r,
  height: n = 300,
  curve: i = "linear",
  showDots: a = !1,
  showLegend: o = !1,
  showTooltip: u = !0,
  showGrid: c = !0,
  showYAxis: s = !0,
  yAxisFormat: f = "auto",
  className: l
}) {
  if (typeof e == "string") return null;
  const p = oa(t);
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: p,
      className: l,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(LB, { data: e, children: [
        c && /* @__PURE__ */ D.jsx(ra, { vertical: !1 }),
        r && /* @__PURE__ */ D.jsx(
          pt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        s && /* @__PURE__ */ D.jsx(
          ht,
          {
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8,
            tickFormatter: f === "compact" ? Yh : void 0
          }
        ),
        u && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, {}) }),
        o && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, {}) }),
        t.map((h) => /* @__PURE__ */ D.jsx(
          na,
          {
            dataKey: h.dataKey,
            type: GA[i] ?? i,
            stroke: `var(--color-${h.dataKey})`,
            strokeWidth: 2,
            dot: a
          },
          h.dataKey
        ))
      ] })
    }
  );
}
function iF({
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
  showYAxis: f = !0,
  yAxisFormat: l = "auto",
  className: p
}) {
  if (typeof e == "string") return null;
  const h = oa(t);
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: h,
      className: p,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(WB, { data: e, children: [
        s && /* @__PURE__ */ D.jsx(ra, { vertical: !1 }),
        r && /* @__PURE__ */ D.jsx(
          pt,
          {
            dataKey: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        f && /* @__PURE__ */ D.jsx(
          ht,
          {
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8,
            tickFormatter: l === "compact" ? Yh : void 0
          }
        ),
        c && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, {}) }),
        u && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, {}) }),
        t.map((y) => /* @__PURE__ */ D.jsx(
          nr,
          {
            dataKey: y.dataKey,
            type: GA[a] ?? a,
            fill: `var(--color-${y.dataKey})`,
            stroke: `var(--color-${y.dataKey})`,
            fillOpacity: 0.4,
            dot: o,
            stackId: i ? "stack" : void 0
          },
          y.dataKey
        ))
      ] })
    }
  );
}
function aF({
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
  const f = HA(e, r), l = e.map((v, d) => ({
    ...v,
    fill: Zt[d % Zt.length]
  })), p = a ? "60%" : "80%", h = i > 0 ? `${Math.round(i / 100 * (a ? 60 : 80))}%` : 0, y = u ? n - 36 : n;
  return /* @__PURE__ */ D.jsxs("div", { className: s, children: [
    /* @__PURE__ */ D.jsx(
      ir,
      {
        config: f,
        style: { height: y, aspectRatio: "auto" },
        children: /* @__PURE__ */ D.jsxs(BB, { children: [
          c && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, { nameKey: r }) }),
          /* @__PURE__ */ D.jsx(
            Ft,
            {
              data: l,
              dataKey: t,
              nameKey: r,
              innerRadius: h,
              outerRadius: p,
              label: a,
              paddingAngle: o
            }
          )
        ] })
      }
    ),
    u && /* @__PURE__ */ D.jsx(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          paddingTop: "8px",
          fontSize: "12px"
        },
        children: l.map((v, d) => /* @__PURE__ */ D.jsxs(
          "div",
          {
            style: { display: "flex", alignItems: "center", gap: "6px" },
            children: [
              /* @__PURE__ */ D.jsx(
                "div",
                {
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "2px",
                    backgroundColor: v.fill,
                    flexShrink: 0
                  }
                }
              ),
              String(v[r] ?? "")
            ]
          },
          d
        ))
      }
    )
  ] });
}
function oF({
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
  const f = oa(t);
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(FB, { data: e, children: [
        c && /* @__PURE__ */ D.jsx(Rw, {}),
        r && /* @__PURE__ */ D.jsx(Cr, { dataKey: r }),
        u && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, {}) }),
        o && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, {}) }),
        t.map((l) => /* @__PURE__ */ D.jsx(
          ea,
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
function uF({
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
  const f = HA(e, r), l = e.map((p, h) => ({
    ...p,
    fill: Zt[h % Zt.length]
  }));
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: f,
      className: s,
      style: { height: n, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(
        KB,
        {
          data: l,
          innerRadius: i,
          startAngle: a,
          endAngle: o,
          children: [
            c && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, { nameKey: r }) }),
            u && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, { nameKey: r }) }),
            /* @__PURE__ */ D.jsx(ta, { dataKey: t })
          ]
        }
      )
    }
  );
}
function cF({
  data: e = [],
  series: t,
  xAxis: r,
  yAxis: n,
  zAxis: i,
  height: a = 300,
  showLegend: o = !1,
  showTooltip: u = !0,
  showGrid: c = !0,
  className: s
}) {
  if (typeof e == "string") return null;
  const f = oa(t);
  return /* @__PURE__ */ D.jsx(
    ir,
    {
      config: f,
      className: s,
      style: { height: a, aspectRatio: "auto" },
      children: /* @__PURE__ */ D.jsxs(zB, { children: [
        c && /* @__PURE__ */ D.jsx(ra, {}),
        /* @__PURE__ */ D.jsx(
          pt,
          {
            dataKey: r,
            type: "number",
            name: r,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        /* @__PURE__ */ D.jsx(
          ht,
          {
            dataKey: n,
            type: "number",
            name: n,
            tickLine: !1,
            axisLine: !1,
            tickMargin: 8
          }
        ),
        i && /* @__PURE__ */ D.jsx(ia, { dataKey: i, type: "number", name: i, range: [40, 400] }),
        u && /* @__PURE__ */ D.jsx(Dr, { content: /* @__PURE__ */ D.jsx(ar, {}) }),
        o && /* @__PURE__ */ D.jsx(Bn, { content: /* @__PURE__ */ D.jsx(Nr, {}) }),
        t.map((l) => {
          const p = t.length === 1 ? e : e.filter(
            (h) => h._series === l.dataKey
          );
          return /* @__PURE__ */ D.jsx(
            aa,
            {
              name: l.label ?? l.dataKey,
              data: p,
              fill: `var(--color-${l.dataKey})`
            },
            l.dataKey
          );
        })
      ] })
    }
  );
}
export {
  iF as PrefabAreaChart,
  rF as PrefabBarChart,
  nF as PrefabLineChart,
  aF as PrefabPieChart,
  oF as PrefabRadarChart,
  uF as PrefabRadialChart,
  cF as PrefabScatterChart,
  tF as PrefabSparkline
};
