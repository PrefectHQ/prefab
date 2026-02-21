import { R as m, r as x, j as A, C as En, b as Y, d as Fn, e as In, f as lt, B as St, P as Bn, h as Hn, i as jn, k as An } from "./embed-Bvc4tioC.mjs";
const Ct = 6048e5, qn = 864e5, pt = 6e4, xt = 36e5, ht = Symbol.for("constructDateFrom");
function H(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ht in e ? e[ht](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function P(e, t) {
  return H(t || e, e);
}
function Yt(e, t, n) {
  const r = P(e, n == null ? void 0 : n.in);
  return isNaN(t) ? H(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Tt(e, t, n) {
  const r = P(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return H(e, NaN);
  if (!t)
    return r;
  const a = r.getDate(), o = H(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const s = o.getDate();
  return a >= s ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    a
  ), r);
}
let zn = {};
function Ne() {
  return zn;
}
function me(e, t) {
  var c, i, u, d;
  const n = Ne(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((i = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : i.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, a = P(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? 7 : 0) + o - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function ve(e, t) {
  return me(e, { ...t, weekStartsOn: 1 });
}
function _t(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = H(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const o = ve(a), s = H(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const c = ve(s);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function mt(e) {
  const t = P(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function ye(e, ...t) {
  const n = H.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function We(e, t) {
  const n = P(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ze(e, t, n) {
  const [r, a] = ye(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = We(r), s = We(a), c = +o - mt(o), i = +s - mt(s);
  return Math.round((c - i) / qn);
}
function $n(e, t) {
  const n = _t(e, t), r = H(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ve(r);
}
function Rn(e, t, n) {
  return Yt(e, t * 7, n);
}
function Gn(e, t, n) {
  return Tt(e, t * 12, n);
}
function Un(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = H.bind(null, a));
    const o = P(a, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), H(r, n || NaN);
}
function Qn(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = H.bind(null, a));
    const o = P(a, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), H(r, n || NaN);
}
function Xn(e, t, n) {
  const [r, a] = ye(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +We(r) == +We(a);
}
function Pt(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Vn(e) {
  return !(!Pt(e) && typeof e != "number" || isNaN(+P(e)));
}
function Et(e, t, n) {
  const [r, a] = ye(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return o * 12 + s;
}
function Jn(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ft(e, t) {
  const [n, r] = ye(e, t.start, t.end);
  return { start: n, end: r };
}
function Zn(e, t) {
  const { start: n, end: r } = Ft(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let c = 1;
  const i = [];
  for (; +s <= o; )
    i.push(H(n, s)), s.setMonth(s.getMonth() + c);
  return a ? i.reverse() : i;
}
function Kn(e, t) {
  const n = P(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ln(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function It(e, t) {
  const n = P(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function er(e, t) {
  const { start: n, end: r } = Ft(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let c = 1;
  const i = [];
  for (; +s <= o; )
    i.push(H(n, s)), s.setFullYear(s.getFullYear() + c);
  return a ? i.reverse() : i;
}
function Bt(e, t) {
  var c, i, u, d;
  const n = Ne(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((i = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : i.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, a = P(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? -7 : 0) + 6 - (o - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function tr(e, t) {
  return Bt(e, { ...t, weekStartsOn: 1 });
}
const nr = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, rr = (e, t, n) => {
  let r;
  const a = nr[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function $e(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const ar = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, or = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, sr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ir = {
  date: $e({
    formats: ar,
    defaultWidth: "full"
  }),
  time: $e({
    formats: or,
    defaultWidth: "full"
  }),
  dateTime: $e({
    formats: sr,
    defaultWidth: "full"
  })
}, cr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ur = (e, t, n, r) => cr[e];
function be(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, c = n != null && n.width ? String(n.width) : s;
      a = e.formattingValues[c] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, c = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[c] || e.values[s];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[o];
  };
}
const dr = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, fr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, lr = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, hr = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, mr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, yr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, gr = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, wr = {
  ordinalNumber: gr,
  era: be({
    values: dr,
    defaultWidth: "wide"
  }),
  quarter: be({
    values: fr,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: be({
    values: lr,
    defaultWidth: "wide"
  }),
  day: be({
    values: hr,
    defaultWidth: "wide"
  }),
  dayPeriod: be({
    values: mr,
    defaultWidth: "wide",
    formattingValues: yr,
    defaultFormattingWidth: "wide"
  })
};
function Me(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    const s = o[0], c = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], i = Array.isArray(c) ? Mr(c, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      br(c, (f) => f.test(s))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(i) : i, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const d = t.slice(s.length);
    return { value: u, rest: d };
  };
}
function br(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Mr(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Dr(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const a = r[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const c = t.slice(a.length);
    return { value: s, rest: c };
  };
}
const kr = /^(\d+)(th|st|nd|rd)?/i, Or = /\d+/i, vr = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Wr = {
  any: [/^b/i, /^(a|c)/i]
}, Nr = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Sr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Cr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, pr = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, xr = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Yr = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Tr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, _r = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Pr = {
  ordinalNumber: Dr({
    matchPattern: kr,
    parsePattern: Or,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Me({
    matchPatterns: vr,
    defaultMatchWidth: "wide",
    parsePatterns: Wr,
    defaultParseWidth: "any"
  }),
  quarter: Me({
    matchPatterns: Nr,
    defaultMatchWidth: "wide",
    parsePatterns: Sr,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Me({
    matchPatterns: Cr,
    defaultMatchWidth: "wide",
    parsePatterns: pr,
    defaultParseWidth: "any"
  }),
  day: Me({
    matchPatterns: xr,
    defaultMatchWidth: "wide",
    parsePatterns: Yr,
    defaultParseWidth: "any"
  }),
  dayPeriod: Me({
    matchPatterns: Tr,
    defaultMatchWidth: "any",
    parsePatterns: _r,
    defaultParseWidth: "any"
  })
}, le = {
  code: "en-US",
  formatDistance: rr,
  formatLong: ir,
  formatRelative: ur,
  localize: wr,
  match: Pr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Er(e, t) {
  const n = P(e, t == null ? void 0 : t.in);
  return Ze(n, It(n)) + 1;
}
function Ke(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = +ve(n) - +$n(n);
  return Math.round(r / Ct) + 1;
}
function Ht(e, t) {
  var d, f, h, g;
  const n = P(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Ne(), o = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((g = (h = a.locale) == null ? void 0 : h.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, s = H((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, o), s.setHours(0, 0, 0, 0);
  const c = me(s, t), i = H((t == null ? void 0 : t.in) || e, 0);
  i.setFullYear(r, 0, o), i.setHours(0, 0, 0, 0);
  const u = me(i, t);
  return +n >= +c ? r + 1 : +n >= +u ? r : r - 1;
}
function Fr(e, t) {
  var c, i, u, d;
  const n = Ne(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((i = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : i.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, a = Ht(e, t), o = H((t == null ? void 0 : t.in) || e, 0);
  return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), me(o, t);
}
function Le(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = +me(n, t) - +Fr(n, t);
  return Math.round(r / Ct) + 1;
}
function E(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const se = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return E(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : E(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return E(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return E(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return E(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return E(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return E(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return E(a, t.length);
  }
}, de = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yt = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: "year" });
    }
    return se.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = Ht(e, r), o = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = o % 100;
      return E(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : E(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = _t(e);
    return E(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return E(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return E(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return E(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return se.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return E(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const a = Le(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : E(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ke(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : E(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : se.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Er(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : E(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const a = e.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(o);
      // Padded numerical value
      case "ee":
        return E(o, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
      case "eee":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const a = e.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(o);
      // Padded numerical value
      case "cc":
        return E(o, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return n.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(a, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(a, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), a = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(a);
      // 02
      case "ii":
        return E(a, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(a, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const a = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r === 12 ? a = de.noon : r === 0 ? a = de.midnight : a = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r >= 17 ? a = de.evening : r >= 12 ? a = de.afternoon : r >= 4 ? a = de.morning : a = de.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return se.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : se.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : E(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : E(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : se.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : se.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return se.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return wt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return ie(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return ie(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return wt(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return ie(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return ie(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + gt(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + ie(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + gt(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ie(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return E(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return E(+e, t.length);
  }
};
function gt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(a) : n + String(a) + t + E(o, 2);
}
function wt(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + E(Math.abs(e) / 60, 2) : ie(e, t);
}
function ie(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = E(Math.trunc(r / 60), 2), o = E(r % 60, 2);
  return n + a + t + o;
}
const bt = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, jt = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Ir = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return bt(e, t);
  let o;
  switch (r) {
    case "P":
      o = t.dateTime({ width: "short" });
      break;
    case "PP":
      o = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = t.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", bt(r, t)).replace("{{time}}", jt(a, t));
}, Br = {
  p: jt,
  P: Ir
}, Hr = /^D+$/, jr = /^Y+$/, Ar = ["D", "DD", "YY", "YYYY"];
function qr(e) {
  return Hr.test(e);
}
function zr(e) {
  return jr.test(e);
}
function $r(e, t, n) {
  const r = Rr(e, t, n);
  if (console.warn(r), Ar.includes(e)) throw new RangeError(r);
}
function Rr(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ur = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Qr = /^'([^]*?)'?$/, Xr = /''/g, Vr = /[a-zA-Z]/;
function he(e, t, n) {
  var d, f, h, g, v, N, k, M;
  const r = Ne(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? le, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((g = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((N = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : N.weekStartsOn) ?? r.weekStartsOn ?? ((M = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : M.weekStartsOn) ?? 0, c = P(e, n == null ? void 0 : n.in);
  if (!Vn(c))
    throw new RangeError("Invalid time value");
  let i = t.match(Ur).map((O) => {
    const y = O[0];
    if (y === "p" || y === "P") {
      const C = Br[y];
      return C(O, a.formatLong);
    }
    return O;
  }).join("").match(Gr).map((O) => {
    if (O === "''")
      return { isToken: !1, value: "'" };
    const y = O[0];
    if (y === "'")
      return { isToken: !1, value: Jr(O) };
    if (yt[y])
      return { isToken: !0, value: O };
    if (y.match(Vr))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: O };
  });
  a.localize.preprocessor && (i = a.localize.preprocessor(c, i));
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: s,
    locale: a
  };
  return i.map((O) => {
    if (!O.isToken) return O.value;
    const y = O.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && zr(y) || !(n != null && n.useAdditionalDayOfYearTokens) && qr(y)) && $r(y, t, String(e));
    const C = yt[y[0]];
    return C(c, y, a.localize, u);
  }).join("");
}
function Jr(e) {
  const t = e.match(Qr);
  return t ? t[1].replace(Xr, "'") : e;
}
function Zr(e, t) {
  const n = P(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), o = H(n, 0);
  return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Kr(e, t) {
  return P(e, t == null ? void 0 : t.in).getMonth();
}
function Lr(e, t) {
  return P(e, t == null ? void 0 : t.in).getFullYear();
}
function ea(e, t) {
  return +P(e) > +P(t);
}
function ta(e, t) {
  return +P(e) < +P(t);
}
function na(e, t, n) {
  const [r, a] = ye(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function ra(e, t, n) {
  const [r, a] = ye(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function ke(e, t) {
  const n = () => H(t == null ? void 0 : t.in, NaN), a = ia(e);
  let o;
  if (a.date) {
    const u = ca(a.date, 2);
    o = ua(u.restDateString, u.year);
  }
  if (!o || isNaN(+o)) return n();
  const s = +o;
  let c = 0, i;
  if (a.time && (c = da(a.time), isNaN(c)))
    return n();
  if (a.timezone) {
    if (i = fa(a.timezone), isNaN(i)) return n();
  } else {
    const u = new Date(s + c), d = P(0, t == null ? void 0 : t.in);
    return d.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), d.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), d;
  }
  return P(s + c + i, t == null ? void 0 : t.in);
}
const _e = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, aa = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, oa = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, sa = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ia(e) {
  const t = {}, n = e.split(_e.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], _e.timeZoneDelimiter.test(t.date) && (t.date = e.split(_e.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const a = _e.timezone.exec(r);
    a ? (t.time = r.replace(a[1], ""), t.timezone = a[1]) : t.time = r;
  }
  return t;
}
function ca(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), r = e.match(n);
  if (!r) return { year: NaN, restDateString: "" };
  const a = r[1] ? parseInt(r[1]) : null, o = r[2] ? parseInt(r[2]) : null;
  return {
    year: o === null ? a : o * 100,
    restDateString: e.slice((r[1] || r[2]).length)
  };
}
function ua(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(aa);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], a = De(n[1]), o = De(n[2]) - 1, s = De(n[3]), c = De(n[4]), i = De(n[5]) - 1;
  if (r)
    return ga(t, c, i) ? la(t, c, i) : /* @__PURE__ */ new Date(NaN);
  {
    const u = /* @__PURE__ */ new Date(0);
    return !ma(t, o, s) || !ya(t, a) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, o, Math.max(a, s)), u);
  }
}
function De(e) {
  return e ? parseInt(e) : 1;
}
function da(e) {
  const t = e.match(oa);
  if (!t) return NaN;
  const n = Re(t[1]), r = Re(t[2]), a = Re(t[3]);
  return wa(n, r, a) ? n * xt + r * pt + a * 1e3 : NaN;
}
function Re(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function fa(e) {
  if (e === "Z") return 0;
  const t = e.match(sa);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), a = t[3] && parseInt(t[3]) || 0;
  return ba(r, a) ? n * (r * xt + a * pt) : NaN;
}
function la(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const a = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - a;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const ha = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function At(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function ma(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (ha[t] || (At(e) ? 29 : 28));
}
function ya(e, t) {
  return t >= 1 && t <= (At(e) ? 366 : 365);
}
function ga(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function wa(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function ba(e, t) {
  return t >= 0 && t <= 59;
}
function Ma(e, t, n) {
  const r = P(e, n == null ? void 0 : n.in), a = r.getFullYear(), o = r.getDate(), s = H(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const c = Zr(s);
  return r.setMonth(t, Math.min(o, c)), r;
}
function Da(e, t, n) {
  const r = P(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? H(e, NaN) : (r.setFullYear(t), r);
}
function ka(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ge = {}, Oe = {};
function ce(e, t) {
  try {
    const r = (Ge[e] || (Ge[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Oe ? Oe[r] : Mt(r, r.split(":"));
  } catch {
    if (e in Oe) return Oe[e];
    const n = e == null ? void 0 : e.match(Oa);
    return n ? Mt(e, n.slice(1)) : NaN;
  }
}
const Oa = /([+-]\d\d):?(\d\d)?/;
function Mt(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Oe[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class L extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ce(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), qt(this), Je(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new L(...n, t) : new L(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new L(+this, t);
  }
  getTimezoneOffset() {
    const t = -ce(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Je(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new L(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Dt = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Dt.test(e)) return;
  const t = e.replace(Dt, "$1UTC");
  L.prototype[t] && (e.startsWith("get") ? L.prototype[e] = function() {
    return this.internal[t]();
  } : (L.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), va(this), +this;
  }, L.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Je(this), +this;
  }));
});
function Je(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-ce(e.timeZone, e) * 60));
}
function va(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), qt(e);
}
function qt(e) {
  const t = ce(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const a = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = a - o, c = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && c && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const i = a - n;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const d = a > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, f = Math.round(-(ce(e.timeZone, e) * 60)) % 60;
  (f || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + f + d));
  const h = ce(e.timeZone, e), g = h > 0 ? Math.floor(h) : Math.ceil(h), N = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - g, k = g !== n, M = N - i;
  if (k && M) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + M);
    const O = ce(e.timeZone, e), y = O > 0 ? Math.floor(O) : Math.ceil(O), C = g - y;
    C && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + C), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + C));
  }
}
class q extends L {
  //#region static
  static tz(t, ...n) {
    return n.length ? new q(...n, t) : new q(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), a = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + a;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, a] = this.internal.toUTCString().split(" ");
    return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${a}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, a] = this.tzComponents();
    return `${t} GMT${n}${r}${a} (${ka(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), a = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, a];
  }
  //#endregion
  withTimeZone(t) {
    return new q(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new q(+new Date(t), this.timeZone);
  }
  //#endregion
}
const kt = 5, Wa = 4;
function Na(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), o = t.addDays(a, kt * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? kt : Wa;
}
function zt(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Sa(e, t) {
  const n = zt(e, t), r = Na(e, t);
  return t.addDays(n, r * 7 - 1);
}
const $t = {
  ...le,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => he(s, c, { locale: le, ...n });
      let o = a(e, "PPPP");
      return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => he(a, o, { locale: le, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => he(s, c, { locale: le, ...n });
      let o = a(e, "PPPP");
      return t != null && t.today && (o = `Today, ${o}`), o;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => he(a, o, { locale: le, ...t }), r(e, "cccc");
    }
  }
};
class R {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? q.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, a, o) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, a, o) : this.options.timeZone ? new q(r, a, o, this.options.timeZone) : new Date(r, a, o);
    }, this.addDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addDays ? this.overrides.addDays(r, a) : Yt(r, a);
    }, this.addMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addMonths ? this.overrides.addMonths(r, a) : Tt(r, a);
    }, this.addWeeks = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addWeeks ? this.overrides.addWeeks(r, a) : Rn(r, a);
    }, this.addYears = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addYears ? this.overrides.addYears(r, a) : Gn(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : Ze(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Et(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Zn(r);
    }, this.eachYearOfInterval = (r) => {
      var c;
      const a = (c = this.overrides) != null && c.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : er(r), o = new Set(a.map((i) => this.getYear(i)));
      if (o.size === a.length)
        return a;
      const s = [];
      return o.forEach((i) => {
        s.push(new Date(i, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Sa(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : tr(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : Jn(r);
    }, this.endOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.endOfWeek ? this.overrides.endOfWeek(r, a) : Bt(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : Ln(r);
    }, this.format = (r, a, o) => {
      var c;
      const s = (c = this.overrides) != null && c.format ? this.overrides.format(r, a, this.options) : he(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : Ke(r);
    }, this.getMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getMonth ? this.overrides.getMonth(r, this.options) : Kr(r, this.options);
    }, this.getYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getYear ? this.overrides.getYear(r, this.options) : Lr(r, this.options);
    }, this.getWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getWeek ? this.overrides.getWeek(r, this.options) : Le(r, this.options);
    }, this.isAfter = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isAfter ? this.overrides.isAfter(r, a) : ea(r, a);
    }, this.isBefore = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isBefore ? this.overrides.isBefore(r, a) : ta(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Pt(r);
    }, this.isSameDay = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameDay ? this.overrides.isSameDay(r, a) : Xn(r, a);
    }, this.isSameMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameMonth ? this.overrides.isSameMonth(r, a) : na(r, a);
    }, this.isSameYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameYear ? this.overrides.isSameYear(r, a) : ra(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : Un(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Qn(r);
    }, this.setMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setMonth ? this.overrides.setMonth(r, a) : Ma(r, a);
    }, this.setYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setYear ? this.overrides.setYear(r, a) : Da(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : zt(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : We(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ve(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : Kn(r);
    }, this.startOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfWeek ? this.overrides.startOfWeek(r, this.options) : me(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : It(r);
    }, this.options = { locale: $t, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let a = 0; a < 10; a++)
      r[a.toString()] = n.format(a);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var n;
    const t = (n = this.options.locale) == null ? void 0 : n.code;
    return t && R.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: a } = this.options, o = n == null ? void 0 : n.code;
    if (o && R.yearFirstLocales.has(o))
      try {
        return new Intl.DateTimeFormat(o, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: a
        }).format(t);
      } catch {
      }
    const s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, s);
  }
}
R.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const ee = new R();
class Rt {
  constructor(t, n, r = ee) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r, this.isoDate = r.format(t, "yyyy-MM-dd"), this.displayMonthId = r.format(n, "yyyy-MM"), this.dateMonthId = r.format(t, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class Ca {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class pa {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function xa(e) {
  return m.createElement("button", { ...e });
}
function Ya(e) {
  return m.createElement("span", { ...e });
}
function Ta(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    m.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && m.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && m.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && m.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && m.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function _a(e) {
  const { day: t, modifiers: n, ...r } = e;
  return m.createElement("td", { ...r });
}
function Pa(e) {
  const { day: t, modifiers: n, ...r } = e, a = m.useRef(null);
  return m.useEffect(() => {
    var o;
    n.focused && ((o = a.current) == null || o.focus());
  }, [n.focused]), m.createElement("button", { ref: a, ...r });
}
var w;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(w || (w = {}));
var I;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(I || (I = {}));
var Z;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Z || (Z = {}));
var $;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})($ || ($ = {}));
function Ea(e) {
  const { options: t, className: n, components: r, classNames: a, ...o } = e, s = [a[w.Dropdown], n].join(" "), c = t == null ? void 0 : t.find(({ value: i }) => i === o.value);
  return m.createElement(
    "span",
    { "data-disabled": o.disabled, className: a[w.DropdownRoot] },
    m.createElement(r.Select, { className: s, ...o }, t == null ? void 0 : t.map(({ value: i, label: u, disabled: d }) => m.createElement(r.Option, { key: i, value: i, disabled: d }, u))),
    m.createElement(
      "span",
      { className: a[w.CaptionLabel], "aria-hidden": !0 },
      c == null ? void 0 : c.label,
      m.createElement(r.Chevron, { orientation: "down", size: 18, className: a[w.Chevron] })
    )
  );
}
function Fa(e) {
  return m.createElement("div", { ...e });
}
function Ia(e) {
  return m.createElement("div", { ...e });
}
function Ba(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return m.createElement("div", { ...r }, e.children);
}
function Ha(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return m.createElement("div", { ...r });
}
function ja(e) {
  return m.createElement("table", { ...e });
}
function Aa(e) {
  return m.createElement("div", { ...e });
}
const Gt = x.createContext(void 0);
function Se() {
  const e = x.useContext(Gt);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function qa(e) {
  const { components: t } = Se();
  return m.createElement(t.Dropdown, { ...e });
}
function za(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...o } = e, { components: s, classNames: c, labels: { labelPrevious: i, labelNext: u } } = Se(), d = x.useCallback((h) => {
    a && (n == null || n(h));
  }, [a, n]), f = x.useCallback((h) => {
    r && (t == null || t(h));
  }, [r, t]);
  return m.createElement(
    "nav",
    { ...o },
    m.createElement(
      s.PreviousMonthButton,
      { type: "button", className: c[w.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": i(r), onClick: f },
      m.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: c[w.Chevron], orientation: "left" })
    ),
    m.createElement(
      s.NextMonthButton,
      { type: "button", className: c[w.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": u(a), onClick: d },
      m.createElement(s.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: c[w.Chevron] })
    )
  );
}
function $a(e) {
  const { components: t } = Se();
  return m.createElement(t.Button, { ...e });
}
function Ra(e) {
  return m.createElement("option", { ...e });
}
function Ga(e) {
  const { components: t } = Se();
  return m.createElement(t.Button, { ...e });
}
function Ua(e) {
  const { rootRef: t, ...n } = e;
  return m.createElement("div", { ...n, ref: t });
}
function Qa(e) {
  return m.createElement("select", { ...e });
}
function Xa(e) {
  const { week: t, ...n } = e;
  return m.createElement("tr", { ...n });
}
function Va(e) {
  return m.createElement("th", { ...e });
}
function Ja(e) {
  return m.createElement(
    "thead",
    { "aria-hidden": !0 },
    m.createElement("tr", { ...e })
  );
}
function Za(e) {
  const { week: t, ...n } = e;
  return m.createElement("th", { ...n });
}
function Ka(e) {
  return m.createElement("th", { ...e });
}
function La(e) {
  return m.createElement("tbody", { ...e });
}
function eo(e) {
  const { components: t } = Se();
  return m.createElement(t.Dropdown, { ...e });
}
const to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: xa,
  CaptionLabel: Ya,
  Chevron: Ta,
  Day: _a,
  DayButton: Pa,
  Dropdown: Ea,
  DropdownNav: Fa,
  Footer: Ia,
  Month: Ba,
  MonthCaption: Ha,
  MonthGrid: ja,
  Months: Aa,
  MonthsDropdown: qa,
  Nav: za,
  NextMonthButton: $a,
  Option: Ra,
  PreviousMonthButton: Ga,
  Root: Ua,
  Select: Qa,
  Week: Xa,
  WeekNumber: Za,
  WeekNumberHeader: Ka,
  Weekday: Va,
  Weekdays: Ja,
  Weeks: La,
  YearsDropdown: eo
}, Symbol.toStringTag, { value: "Module" }));
function re(e, t, n = !1, r = ee) {
  let { from: a, to: o } = e;
  const { differenceInCalendarDays: s, isSameDay: c } = r;
  return a && o ? (s(o, a) < 0 && ([a, o] = [o, a]), s(t, a) >= (n ? 1 : 0) && s(o, t) >= (n ? 1 : 0)) : !n && o ? c(o, t) : !n && a ? c(a, t) : !1;
}
function et(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ee(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function tt(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function nt(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Ut(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Qt(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ae(e, t, n = ee) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: o, isAfter: s } = n;
  return r.some((c) => {
    if (typeof c == "boolean")
      return c;
    if (n.isDate(c))
      return a(e, c);
    if (Qt(c, n))
      return c.some((i) => a(e, i));
    if (Ee(c))
      return re(c, e, !1, n);
    if (Ut(c))
      return Array.isArray(c.dayOfWeek) ? c.dayOfWeek.includes(e.getDay()) : c.dayOfWeek === e.getDay();
    if (et(c)) {
      const i = o(c.before, e), u = o(c.after, e), d = i > 0, f = u < 0;
      return s(c.before, c.after) ? f && d : d || f;
    }
    return tt(c) ? o(e, c.after) > 0 : nt(c) ? o(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function no(e, t, n, r, a) {
  const { disabled: o, hidden: s, modifiers: c, showOutsideDays: i, broadcastCalendar: u, today: d = a.today() } = t, { isSameDay: f, isSameMonth: h, startOfMonth: g, isBefore: v, endOfMonth: N, isAfter: k } = a, M = n && g(n), O = r && N(r), y = {
    [I.focused]: [],
    [I.outside]: [],
    [I.disabled]: [],
    [I.hidden]: [],
    [I.today]: []
  }, C = {};
  for (const D of e) {
    const { date: l, displayMonth: S } = D, F = !!(S && !h(l, S)), j = !!(M && v(l, M)), B = !!(O && k(l, O)), G = !!(o && ae(l, o, a)), oe = !!(s && ae(l, s, a)) || j || B || // Broadcast calendar will show outside days as default
    !u && !i && F || u && i === !1 && F, te = f(l, d);
    F && y.outside.push(D), G && y.disabled.push(D), oe && y.hidden.push(D), te && y.today.push(D), c && Object.keys(c).forEach((U) => {
      const ue = c == null ? void 0 : c[U];
      ue && ae(l, ue, a) && (C[U] ? C[U].push(D) : C[U] = [D]);
    });
  }
  return (D) => {
    const l = {
      [I.focused]: !1,
      [I.disabled]: !1,
      [I.hidden]: !1,
      [I.outside]: !1,
      [I.today]: !1
    }, S = {};
    for (const F in y) {
      const j = y[F];
      l[F] = j.some((B) => B === D);
    }
    for (const F in C)
      S[F] = C[F].some((j) => j === D);
    return {
      ...l,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function ro(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [o]) => (n[o] ? a.push(n[o]) : t[I[o]] ? a.push(t[I[o]]) : t[Z[o]] && a.push(t[Z[o]]), a), [t[w.Day]]);
}
function ao(e) {
  return {
    ...to,
    ...e
  };
}
function oo(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function rt() {
  const e = {};
  for (const t in w)
    e[w[t]] = `rdp-${w[t]}`;
  for (const t in I)
    e[I[t]] = `rdp-${I[t]}`;
  for (const t in Z)
    e[Z[t]] = `rdp-${Z[t]}`;
  for (const t in $)
    e[$[t]] = `rdp-${$[t]}`;
  return e;
}
function Xt(e, t, n) {
  return (n ?? new R(t)).formatMonthYear(e);
}
const so = Xt;
function io(e, t, n) {
  return (n ?? new R(t)).format(e, "d");
}
function co(e, t = ee) {
  return t.format(e, "LLLL");
}
function uo(e, t, n) {
  return (n ?? new R(t)).format(e, "cccccc");
}
function fo(e, t = ee) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function lo() {
  return "";
}
function Vt(e, t = ee) {
  return t.format(e, "yyyy");
}
const ho = Vt, mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Xt,
  formatDay: io,
  formatMonthCaption: so,
  formatMonthDropdown: co,
  formatWeekNumber: fo,
  formatWeekNumberHeader: lo,
  formatWeekdayName: uo,
  formatYearCaption: ho,
  formatYearDropdown: Vt
}, Symbol.toStringTag, { value: "Module" }));
function yo(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...mo,
    ...e
  };
}
function at(e, t, n, r) {
  let a = (r ?? new R(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
const go = at;
function ot(e, t, n) {
  return (n ?? new R(t)).formatMonthYear(e);
}
const wo = ot;
function Jt(e, t, n, r) {
  let a = (r ?? new R(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function Zt(e) {
  return "Choose the Month";
}
function Kt() {
  return "";
}
const bo = "Go to the Next Month";
function Lt(e, t) {
  return bo;
}
function en(e) {
  return "Go to the Previous Month";
}
function tn(e, t, n) {
  return (n ?? new R(t)).format(e, "cccc");
}
function nn(e, t) {
  return `Week ${e}`;
}
function rn(e) {
  return "Week Number";
}
function an(e) {
  return "Choose the Year";
}
const Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: wo,
  labelDay: go,
  labelDayButton: at,
  labelGrid: ot,
  labelGridcell: Jt,
  labelMonthDropdown: Zt,
  labelNav: Kt,
  labelNext: Lt,
  labelPrevious: en,
  labelWeekNumber: nn,
  labelWeekNumberHeader: rn,
  labelWeekday: tn,
  labelYearDropdown: an
}, Symbol.toStringTag, { value: "Module" })), J = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Do(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Mo,
    ...e ?? {},
    labelDayButton: J(at, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: J(Zt, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: J(Lt, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: J(en, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: J(nn, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: J(an, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: J(ot, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: J(Jt, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: J(Kt, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: J(rn, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: J(tn, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function ko(e, t, n, r, a) {
  const { startOfMonth: o, startOfYear: s, endOfYear: c, eachMonthOfInterval: i, getMonth: u } = a;
  return i({
    start: s(e),
    end: c(e)
  }).map((h) => {
    const g = r.formatMonthDropdown(h, a), v = u(h), N = t && h < o(t) || n && h > o(n) || !1;
    return { value: v, label: g, disabled: N };
  });
}
function Oo(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[w.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function vo(e, t, n, r) {
  const a = r ?? e.today(), o = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let c = 0; c < 7; c++) {
    const i = e.addDays(o, c);
    s.push(i);
  }
  return s;
}
function Wo(e, t, n, r, a = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: s, eachYearOfInterval: c, getYear: i } = r, u = o(e), d = s(t), f = c({ start: u, end: d });
  return a && f.reverse(), f.map((h) => {
    const g = n.formatYearDropdown(h, r);
    return {
      value: i(h),
      label: g,
      disabled: !1
    };
  });
}
function No(e, t = {}) {
  var c;
  const { weekStartsOn: n, locale: r } = t, a = n ?? ((c = r == null ? void 0 : r.options) == null ? void 0 : c.weekStartsOn) ?? 0, o = (i) => {
    const u = typeof i == "number" || typeof i == "string" ? new Date(i) : i;
    return new q(u.getFullYear(), u.getMonth(), u.getDate(), 12, 0, 0, e);
  }, s = (i) => {
    const u = o(i);
    return new Date(u.getFullYear(), u.getMonth(), u.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => o(q.tz(e)),
    newDate: (i, u, d) => new q(i, u, d, 12, 0, 0, e),
    startOfDay: (i) => o(i),
    startOfWeek: (i, u) => {
      const d = o(i), f = (u == null ? void 0 : u.weekStartsOn) ?? a, h = (d.getDay() - f + 7) % 7;
      return d.setDate(d.getDate() - h), d;
    },
    startOfISOWeek: (i) => {
      const u = o(i), d = (u.getDay() - 1 + 7) % 7;
      return u.setDate(u.getDate() - d), u;
    },
    startOfMonth: (i) => {
      const u = o(i);
      return u.setDate(1), u;
    },
    startOfYear: (i) => {
      const u = o(i);
      return u.setMonth(0, 1), u;
    },
    endOfWeek: (i, u) => {
      const d = o(i), g = ((((u == null ? void 0 : u.weekStartsOn) ?? a) + 6) % 7 - d.getDay() + 7) % 7;
      return d.setDate(d.getDate() + g), d;
    },
    endOfISOWeek: (i) => {
      const u = o(i), d = (7 - u.getDay()) % 7;
      return u.setDate(u.getDate() + d), u;
    },
    endOfMonth: (i) => {
      const u = o(i);
      return u.setMonth(u.getMonth() + 1, 0), u;
    },
    endOfYear: (i) => {
      const u = o(i);
      return u.setMonth(11, 31), u;
    },
    eachMonthOfInterval: (i) => {
      const u = o(i.start), d = o(i.end), f = [], h = new q(u.getFullYear(), u.getMonth(), 1, 12, 0, 0, e), g = d.getFullYear() * 12 + d.getMonth();
      for (; h.getFullYear() * 12 + h.getMonth() <= g; )
        f.push(new q(h, e)), h.setMonth(h.getMonth() + 1, 1);
      return f;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (i, u) => {
      const d = o(i);
      return d.setDate(d.getDate() + u), d;
    },
    addWeeks: (i, u) => {
      const d = o(i);
      return d.setDate(d.getDate() + u * 7), d;
    },
    addMonths: (i, u) => {
      const d = o(i);
      return d.setMonth(d.getMonth() + u), d;
    },
    addYears: (i, u) => {
      const d = o(i);
      return d.setFullYear(d.getFullYear() + u), d;
    },
    eachYearOfInterval: (i) => {
      const u = o(i.start), d = o(i.end), f = [], h = new q(u.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; h.getFullYear() <= d.getFullYear(); )
        f.push(new q(h, e)), h.setFullYear(h.getFullYear() + 1, 0, 1);
      return f;
    },
    getWeek: (i, u) => {
      var f;
      const d = s(i);
      return Le(d, {
        weekStartsOn: (u == null ? void 0 : u.weekStartsOn) ?? a,
        firstWeekContainsDate: (u == null ? void 0 : u.firstWeekContainsDate) ?? ((f = r == null ? void 0 : r.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (i) => {
      const u = s(i);
      return Ke(u);
    },
    differenceInCalendarDays: (i, u) => {
      const d = s(i), f = s(u);
      return Ze(d, f);
    },
    differenceInCalendarMonths: (i, u) => {
      const d = s(i), f = s(u);
      return Et(d, f);
    }
  };
}
const Ce = (e) => e instanceof HTMLElement ? e : null, Ue = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], So = (e) => Ce(e.querySelector("[data-animated-month]")), Qe = (e) => Ce(e.querySelector("[data-animated-caption]")), Xe = (e) => Ce(e.querySelector("[data-animated-weeks]")), Co = (e) => Ce(e.querySelector("[data-animated-nav]")), po = (e) => Ce(e.querySelector("[data-animated-weekdays]"));
function xo(e, t, { classNames: n, months: r, focused: a, dateLib: o }) {
  const s = x.useRef(null), c = x.useRef(r), i = x.useRef(!1);
  x.useLayoutEffect(() => {
    const u = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const d = o.isSameMonth(r[0].date, u[0].date), f = o.isAfter(r[0].date, u[0].date), h = f ? n[$.caption_after_enter] : n[$.caption_before_enter], g = f ? n[$.weeks_after_enter] : n[$.weeks_before_enter], v = s.current, N = e.current.cloneNode(!0);
    if (N instanceof HTMLElement ? (Ue(N).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const C = So(y);
      C && y.contains(C) && y.removeChild(C);
      const D = Qe(y);
      D && D.classList.remove(h);
      const l = Xe(y);
      l && l.classList.remove(g);
    }), s.current = N) : s.current = null, i.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const k = v instanceof HTMLElement ? Ue(v) : [], M = Ue(e.current);
    if (M != null && M.every((O) => O instanceof HTMLElement) && k && k.every((O) => O instanceof HTMLElement)) {
      i.current = !0, e.current.style.isolation = "isolate";
      const O = Co(e.current);
      O && (O.style.zIndex = "1"), M.forEach((y, C) => {
        const D = k[C];
        if (!D)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const l = Qe(y);
        l && l.classList.add(h);
        const S = Xe(y);
        S && S.classList.add(g);
        const F = () => {
          i.current = !1, e.current && (e.current.style.isolation = ""), O && (O.style.zIndex = ""), l && l.classList.remove(h), S && S.classList.remove(g), y.style.position = "", y.style.overflow = "", y.contains(D) && y.removeChild(D);
        };
        D.style.pointerEvents = "none", D.style.position = "absolute", D.style.overflow = "hidden", D.setAttribute("aria-hidden", "true");
        const j = po(D);
        j && (j.style.opacity = "0");
        const B = Qe(D);
        B && (B.classList.add(f ? n[$.caption_before_exit] : n[$.caption_after_exit]), B.addEventListener("animationend", F));
        const G = Xe(D);
        G && G.classList.add(f ? n[$.weeks_before_exit] : n[$.weeks_after_exit]), y.insertBefore(D, y.firstChild);
      });
    }
  });
}
function Yo(e, t, n, r) {
  const a = e[0], o = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: i } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: f, endOfBroadcastWeek: h, endOfISOWeek: g, endOfMonth: v, endOfWeek: N, isAfter: k, startOfBroadcastWeek: M, startOfISOWeek: O, startOfWeek: y } = r, C = i ? M(a, r) : s ? O(a) : y(a), D = i ? h(o) : s ? g(v(o)) : N(v(o)), l = t && (i ? h(t) : s ? g(t) : N(t)), S = l && k(D, l) ? l : D, F = d(S, C), j = f(o, a) + 1, B = [];
  for (let te = 0; te <= F; te++) {
    const U = u(C, te);
    B.push(U);
  }
  const oe = (i ? 35 : 42) * j;
  if (c && B.length < oe) {
    const te = oe - B.length;
    for (let U = 0; U < te; U++) {
      const ue = u(B[B.length - 1], 1);
      B.push(ue);
    }
  }
  return B;
}
function To(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((o, s) => o.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function _o(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, o = [];
  for (let s = 0; s < a; s++) {
    const c = r.addMonths(e, s);
    if (t && c > t)
      break;
    o.push(c);
  }
  return o;
}
function Ot(e, t, n, r) {
  const { month: a, defaultMonth: o, today: s = r.today(), numberOfMonths: c = 1 } = e;
  let i = a || o || s;
  const { differenceInCalendarMonths: u, addMonths: d, startOfMonth: f } = r;
  if (n && u(n, i) < c - 1) {
    const h = -1 * (c - 1);
    i = d(n, h);
  }
  return t && u(i, t) < 0 && (i = t), f(i);
}
function Po(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: o, endOfISOWeek: s, endOfMonth: c, endOfWeek: i, getISOWeek: u, getWeek: d, startOfBroadcastWeek: f, startOfISOWeek: h, startOfWeek: g } = r, v = e.reduce((N, k) => {
    const M = n.broadcastCalendar ? f(k, r) : n.ISOWeek ? h(k) : g(k), O = n.broadcastCalendar ? o(k) : n.ISOWeek ? s(c(k)) : i(c(k)), y = t.filter((S) => S >= M && S <= O), C = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < C) {
      const S = t.filter((F) => {
        const j = C - y.length;
        return F > O && F <= a(O, j);
      });
      y.push(...S);
    }
    const D = y.reduce((S, F) => {
      const j = n.ISOWeek ? u(F) : d(F), B = S.find((oe) => oe.weekNumber === j), G = new Rt(F, k, r);
      return B ? B.days.push(G) : S.push(new pa(j, [G])), S;
    }, []), l = new Ca(k, D);
    return N.push(l), N;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function Eo(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: o, startOfMonth: s, endOfMonth: c, addYears: i, endOfYear: u, newDate: d, today: f } = t, { fromYear: h, toYear: g, fromMonth: v, toMonth: N } = e;
  !n && v && (n = v), !n && h && (n = t.newDate(h, 0, 1)), !r && N && (r = N), !r && g && (r = d(g, 11, 31));
  const k = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : h ? n = d(h, 0, 1) : !n && k && (n = a(i(e.today ?? f(), -100))), r ? r = c(r) : g ? r = d(g, 11, 31) : !r && k && (r = u(e.today ?? f())), [
    n && o(n),
    r && o(r)
  ];
}
function Fo(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: i } = r, u = a ? o : 1, d = s(e);
  if (!t)
    return c(d, u);
  if (!(i(t, e) < o))
    return c(d, u);
}
function Io(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: i } = r, u = a ? o ?? 1 : 1, d = s(e);
  if (!t)
    return c(d, -u);
  if (!(i(d, t) <= 0))
    return c(d, -u);
}
function Bo(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Fe(e, t) {
  const [n, r] = x.useState(e);
  return [t === void 0 ? n : t, r];
}
function Ho(e, t) {
  var C;
  const [n, r] = Eo(e, t), { startOfMonth: a, endOfMonth: o } = t, s = Ot(e, n, r, t), [c, i] = Fe(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  x.useEffect(() => {
    const D = Ot(e, n, r, t);
    i(D);
  }, [e.timeZone]);
  const { months: u, weeks: d, days: f, previousMonth: h, nextMonth: g } = x.useMemo(() => {
    const D = _o(c, r, { numberOfMonths: e.numberOfMonths }, t), l = Yo(D, e.endMonth ? o(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), S = Po(D, l, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), F = Bo(S), j = To(S), B = Io(c, n, e, t), G = Fo(c, r, e, t);
    return {
      months: S,
      weeks: F,
      days: j,
      previousMonth: B,
      nextMonth: G
    };
  }, [
    t,
    c.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (C = e.endMonth) == null ? void 0 : C.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: v, onMonthChange: N } = e, k = (D) => d.some((l) => l.days.some((S) => S.isEqualTo(D))), M = (D) => {
    if (v)
      return;
    let l = a(D);
    n && l < a(n) && (l = a(n)), r && l > a(r) && (l = a(r)), i(l), N == null || N(l);
  };
  return {
    months: u,
    weeks: d,
    days: f,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: g,
    goToMonth: M,
    goToDay: (D) => {
      k(D) || M(D.date);
    }
  };
}
var K;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(K || (K = {}));
function vt(e) {
  return !e[I.disabled] && !e[I.hidden] && !e[I.outside];
}
function jo(e, t, n, r) {
  let a, o = -1;
  for (const s of e) {
    const c = t(s);
    vt(c) && (c[I.focused] && o < K.FocusedModifier ? (a = s, o = K.FocusedModifier) : r != null && r.isEqualTo(s) && o < K.LastFocused ? (a = s, o = K.LastFocused) : n(s.date) && o < K.Selected ? (a = s, o = K.Selected) : c[I.today] && o < K.Today && (a = s, o = K.Today));
  }
  return a || (a = e.find((s) => vt(t(s)))), a;
}
function Ao(e, t, n, r, a, o, s) {
  const { ISOWeek: c, broadcastCalendar: i } = o, { addDays: u, addMonths: d, addWeeks: f, addYears: h, endOfBroadcastWeek: g, endOfISOWeek: v, endOfWeek: N, max: k, min: M, startOfBroadcastWeek: O, startOfISOWeek: y, startOfWeek: C } = s;
  let l = {
    day: u,
    week: f,
    month: d,
    year: h,
    startOfWeek: (S) => i ? O(S, s) : c ? y(S) : C(S),
    endOfWeek: (S) => i ? g(S) : c ? v(S) : N(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? l = k([r, l]) : t === "after" && a && (l = M([a, l])), l;
}
function on(e, t, n, r, a, o, s, c = 0) {
  if (c > 365)
    return;
  const i = Ao(e, t, n.date, r, a, o, s), u = !!(o.disabled && ae(i, o.disabled, s)), d = !!(o.hidden && ae(i, o.hidden, s)), f = i, h = new Rt(i, f, s);
  return !u && !d ? h : on(e, t, h, r, a, o, s, c + 1);
}
function qo(e, t, n, r, a) {
  const { autoFocus: o } = e, [s, c] = x.useState(), i = jo(t.days, n, r || (() => !1), s), [u, d] = x.useState(o ? i : void 0);
  return {
    isFocusTarget: (N) => !!(i != null && i.isEqualTo(N)),
    setFocused: d,
    focused: u,
    blur: () => {
      c(u), d(void 0);
    },
    moveFocus: (N, k) => {
      if (!u)
        return;
      const M = on(N, k, u, t.navStart, t.navEnd, e, a);
      M && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(M)) || (t.goToDay(M), d(M)));
    }
  };
}
function zo(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = Fe(n, a ? n : void 0), c = a ? n : o, { isSameDay: i } = t, u = (g) => (c == null ? void 0 : c.some((v) => i(v, g))) ?? !1, { min: d, max: f } = e;
  return {
    selected: c,
    select: (g, v, N) => {
      let k = [...c ?? []];
      if (u(g)) {
        if ((c == null ? void 0 : c.length) === d || r && (c == null ? void 0 : c.length) === 1)
          return;
        k = c == null ? void 0 : c.filter((M) => !i(M, g));
      } else
        (c == null ? void 0 : c.length) === f ? k = [g] : k = [...k, g];
      return a || s(k), a == null || a(k, g, v, N), k;
    },
    isSelected: u
  };
}
function $o(e, t, n = 0, r = 0, a = !1, o = ee) {
  const { from: s, to: c } = t || {}, { isSameDay: i, isAfter: u, isBefore: d } = o;
  let f;
  if (!s && !c)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !c)
    i(s, e) ? n === 0 ? f = { from: s, to: e } : a ? f = { from: s, to: void 0 } : f = void 0 : d(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && c)
    if (i(s, e) && i(c, e))
      a ? f = { from: s, to: c } : f = void 0;
    else if (i(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (i(c, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      f = { from: e, to: c };
    else if (u(e, s))
      f = { from: s, to: e };
    else if (u(e, c))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const h = o.differenceInCalendarDays(f.to, f.from);
    r > 0 && h > r ? f = { from: e, to: void 0 } : n > 1 && h < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function Ro(e, t, n = ee) {
  const r = Array.isArray(t) ? t : [t];
  let a = e.from;
  const o = n.differenceInCalendarDays(e.to, e.from), s = Math.min(o, 6);
  for (let c = 0; c <= s; c++) {
    if (r.includes(a.getDay()))
      return !0;
    a = n.addDays(a, 1);
  }
  return !1;
}
function Wt(e, t, n = ee) {
  return re(e, t.from, !1, n) || re(e, t.to, !1, n) || re(t, e.from, !1, n) || re(t, e.to, !1, n);
}
function Go(e, t, n = ee) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((c) => typeof c != "function").some((c) => typeof c == "boolean" ? c : n.isDate(c) ? re(e, c, !1, n) : Qt(c, n) ? c.some((i) => re(e, i, !1, n)) : Ee(c) ? c.from && c.to ? Wt(e, { from: c.from, to: c.to }, n) : !1 : Ut(c) ? Ro(e, c.dayOfWeek, n) : et(c) ? n.isAfter(c.before, c.after) ? Wt(e, {
    from: n.addDays(c.after, 1),
    to: n.addDays(c.before, -1)
  }, n) : ae(e.from, c, n) || ae(e.to, c, n) : tt(c) || nt(c) ? ae(e.from, c, n) || ae(e.to, c, n) : !1))
    return !0;
  const s = r.filter((c) => typeof c == "function");
  if (s.length) {
    let c = e.from;
    const i = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= i; u++) {
      if (s.some((d) => d(c)))
        return !0;
      c = n.addDays(c, 1);
    }
  }
  return !1;
}
function Uo(e, t) {
  const { disabled: n, excludeDisabled: r, selected: a, required: o, onSelect: s } = e, [c, i] = Fe(a, s ? a : void 0), u = s ? a : c;
  return {
    selected: u,
    select: (h, g, v) => {
      const { min: N, max: k } = e, M = h ? $o(h, u, N, k, o, t) : void 0;
      return r && n && (M != null && M.from) && M.to && Go({ from: M.from, to: M.to }, n, t) && (M.from = h, M.to = void 0), s || i(M), s == null || s(M, h, g, v), M;
    },
    isSelected: (h) => u && re(u, h, !1, t)
  };
}
function Qo(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = Fe(n, a ? n : void 0), c = a ? n : o, { isSameDay: i } = t;
  return {
    selected: c,
    select: (f, h, g) => {
      let v = f;
      return !r && c && c && i(f, c) && (v = void 0), a || s(v), a == null || a(v, f, h, g), v;
    },
    isSelected: (f) => c ? i(c, f) : !1
  };
}
function Xo(e, t) {
  const n = Qo(e, t), r = zo(e, t), a = Uo(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return a;
    default:
      return;
  }
}
function Q(e, t) {
  return e instanceof q && e.timeZone === t ? e : new q(e, t);
}
function fe(e, t, n) {
  return Q(e, t);
}
function Nt(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? fe(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? fe(r, t) : r) : Ee(e) ? {
    ...e,
    from: e.from ? Q(e.from, t) : e.from,
    to: e.to ? Q(e.to, t) : e.to
  } : et(e) ? {
    before: fe(e.before, t),
    after: fe(e.after, t)
  } : tt(e) ? {
    after: fe(e.after, t)
  } : nt(e) ? {
    before: fe(e.before, t)
  } : e;
}
function Ve(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => Nt(r, t)) : Nt(e, t));
}
function Vo(e) {
  var ft;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Q(t.today, n)), t.month && (t.month = Q(t.month, n)), t.defaultMonth && (t.defaultMonth = Q(t.defaultMonth, n)), t.startMonth && (t.startMonth = Q(t.startMonth, n)), t.endMonth && (t.endMonth = Q(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Q(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (ft = t.selected) == null ? void 0 : ft.map((W) => Q(W, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Q(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Q(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Ve(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Ve(t.hidden, n)), t.modifiers)) {
    const W = {};
    Object.keys(t.modifiers).forEach((_) => {
      var b;
      W[_] = Ve((b = t.modifiers) == null ? void 0 : b[_], n);
    }), t.modifiers = W;
  }
  const { components: r, formatters: a, labels: o, dateLib: s, locale: c, classNames: i } = x.useMemo(() => {
    const W = { ...$t, ...t.locale }, _ = t.broadcastCalendar ? 1 : t.weekStartsOn, b = t.noonSafe && t.timeZone ? No(t.timeZone, {
      weekStartsOn: _,
      locale: W
    }) : void 0, T = t.dateLib && b ? { ...b, ...t.dateLib } : t.dateLib ?? b, z = new R({
      locale: W,
      weekStartsOn: _,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, T);
    return {
      dateLib: z,
      components: ao(t.components),
      formatters: yo(t.formatters),
      labels: Do(t.labels, z.options),
      locale: W,
      classNames: { ...rt(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]);
  t.today || (t = { ...t, today: s.today() });
  const { captionLayout: u, mode: d, navLayout: f, numberOfMonths: h = 1, onDayBlur: g, onDayClick: v, onDayFocus: N, onDayKeyDown: k, onDayMouseEnter: M, onDayMouseLeave: O, onNextClick: y, onPrevClick: C, showWeekNumber: D, styles: l } = t, { formatCaption: S, formatDay: F, formatMonthDropdown: j, formatWeekNumber: B, formatWeekNumberHeader: G, formatWeekdayName: oe, formatYearDropdown: te } = a, U = Ho(t, s), { days: ue, months: pe, navStart: Ie, navEnd: Be, previousMonth: X, nextMonth: V, goToMonth: ne } = U, He = no(ue, t, Ie, Be, s), { isSelected: ge, select: we, selected: xe } = Xo(t, s) ?? {}, { blur: st, focused: Ye, isFocusTarget: sn, moveFocus: it, setFocused: Te } = qo(t, U, He, ge ?? (() => !1), s), { labelDayButton: cn, labelGridcell: un, labelGrid: dn, labelMonthDropdown: fn, labelNav: ct, labelPrevious: ln, labelNext: hn, labelWeekday: mn, labelWeekNumber: yn, labelWeekNumberHeader: gn, labelYearDropdown: wn } = o, bn = x.useMemo(() => vo(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), ut = d !== void 0 || v !== void 0, je = x.useCallback(() => {
    X && (ne(X), C == null || C(X));
  }, [X, ne, C]), Ae = x.useCallback(() => {
    V && (ne(V), y == null || y(V));
  }, [ne, V, y]), Mn = x.useCallback((W, _) => (b) => {
    b.preventDefault(), b.stopPropagation(), Te(W), !_.disabled && (we == null || we(W.date, _, b), v == null || v(W.date, _, b));
  }, [we, v, Te]), Dn = x.useCallback((W, _) => (b) => {
    Te(W), N == null || N(W.date, _, b);
  }, [N, Te]), kn = x.useCallback((W, _) => (b) => {
    st(), g == null || g(W.date, _, b);
  }, [st, g]), On = x.useCallback((W, _) => (b) => {
    const T = {
      ArrowLeft: [
        b.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        b.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [b.shiftKey ? "year" : "week", "after"],
      ArrowUp: [b.shiftKey ? "year" : "week", "before"],
      PageUp: [b.shiftKey ? "year" : "month", "before"],
      PageDown: [b.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (T[b.key]) {
      b.preventDefault(), b.stopPropagation();
      const [z, p] = T[b.key];
      it(z, p);
    }
    k == null || k(W.date, _, b);
  }, [it, k, t.dir]), vn = x.useCallback((W, _) => (b) => {
    M == null || M(W.date, _, b);
  }, [M]), Wn = x.useCallback((W, _) => (b) => {
    O == null || O(W.date, _, b);
  }, [O]), Nn = x.useCallback((W) => (_) => {
    const b = Number(_.target.value), T = s.setMonth(s.startOfMonth(W), b);
    ne(T);
  }, [s, ne]), Sn = x.useCallback((W) => (_) => {
    const b = Number(_.target.value), T = s.setYear(s.startOfMonth(W), b);
    ne(T);
  }, [s, ne]), { className: Cn, style: pn } = x.useMemo(() => ({
    className: [i[w.Root], t.className].filter(Boolean).join(" "),
    style: { ...l == null ? void 0 : l[w.Root], ...t.style }
  }), [i, t.className, t.style, l]), xn = oo(t), dt = x.useRef(null);
  xo(dt, !!t.animate, {
    classNames: i,
    months: pe,
    focused: Ye,
    dateLib: s
  });
  const Yn = {
    dayPickerProps: t,
    selected: xe,
    select: we,
    isSelected: ge,
    months: pe,
    nextMonth: V,
    previousMonth: X,
    goToMonth: ne,
    getModifiers: He,
    components: r,
    classNames: i,
    styles: l,
    labels: o,
    formatters: a
  };
  return m.createElement(
    Gt.Provider,
    { value: Yn },
    m.createElement(
      r.Root,
      { rootRef: t.animate ? dt : void 0, className: Cn, style: pn, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...xn },
      m.createElement(
        r.Months,
        { className: i[w.Months], style: l == null ? void 0 : l[w.Months] },
        !t.hideNavigation && !f && m.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[w.Nav], style: l == null ? void 0 : l[w.Nav], "aria-label": ct(), onPreviousClick: je, onNextClick: Ae, previousMonth: X, nextMonth: V }),
        pe.map((W, _) => m.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[w.Month],
            style: l == null ? void 0 : l[w.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: _,
            displayIndex: _,
            calendarMonth: W
          },
          f === "around" && !t.hideNavigation && _ === 0 && m.createElement(
            r.PreviousMonthButton,
            { type: "button", className: i[w.PreviousMonthButton], tabIndex: X ? void 0 : -1, "aria-disabled": X ? void 0 : !0, "aria-label": ln(X), onClick: je, "data-animated-button": t.animate ? "true" : void 0 },
            m.createElement(r.Chevron, { disabled: X ? void 0 : !0, className: i[w.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          m.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[w.MonthCaption], style: l == null ? void 0 : l[w.MonthCaption], calendarMonth: W, displayIndex: _ }, u != null && u.startsWith("dropdown") ? m.createElement(
            r.DropdownNav,
            { className: i[w.Dropdowns], style: l == null ? void 0 : l[w.Dropdowns] },
            (() => {
              const b = u === "dropdown" || u === "dropdown-months" ? m.createElement(r.MonthsDropdown, { key: "month", className: i[w.MonthsDropdown], "aria-label": fn(), classNames: i, components: r, disabled: !!t.disableNavigation, onChange: Nn(W.date), options: ko(W.date, Ie, Be, a, s), style: l == null ? void 0 : l[w.Dropdown], value: s.getMonth(W.date) }) : m.createElement("span", { key: "month" }, j(W.date, s)), T = u === "dropdown" || u === "dropdown-years" ? m.createElement(r.YearsDropdown, { key: "year", className: i[w.YearsDropdown], "aria-label": wn(s.options), classNames: i, components: r, disabled: !!t.disableNavigation, onChange: Sn(W.date), options: Wo(Ie, Be, a, s, !!t.reverseYears), style: l == null ? void 0 : l[w.Dropdown], value: s.getYear(W.date) }) : m.createElement("span", { key: "year" }, te(W.date, s));
              return s.getMonthYearOrder() === "year-first" ? [T, b] : [b, T];
            })(),
            m.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, S(W.date, s.options, s))
          ) : m.createElement(r.CaptionLabel, { className: i[w.CaptionLabel], role: "status", "aria-live": "polite" }, S(W.date, s.options, s))),
          f === "around" && !t.hideNavigation && _ === h - 1 && m.createElement(
            r.NextMonthButton,
            { type: "button", className: i[w.NextMonthButton], tabIndex: V ? void 0 : -1, "aria-disabled": V ? void 0 : !0, "aria-label": hn(V), onClick: Ae, "data-animated-button": t.animate ? "true" : void 0 },
            m.createElement(r.Chevron, { disabled: V ? void 0 : !0, className: i[w.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          _ === h - 1 && f === "after" && !t.hideNavigation && m.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[w.Nav], style: l == null ? void 0 : l[w.Nav], "aria-label": ct(), onPreviousClick: je, onNextClick: Ae, previousMonth: X, nextMonth: V }),
          m.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": dn(W.date, s.options, s) || void 0, className: i[w.MonthGrid], style: l == null ? void 0 : l[w.MonthGrid] },
            !t.hideWeekdays && m.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[w.Weekdays], style: l == null ? void 0 : l[w.Weekdays] },
              D && m.createElement(r.WeekNumberHeader, { "aria-label": gn(s.options), className: i[w.WeekNumberHeader], style: l == null ? void 0 : l[w.WeekNumberHeader], scope: "col" }, G()),
              bn.map((b) => m.createElement(r.Weekday, { "aria-label": mn(b, s.options, s), className: i[w.Weekday], key: String(b), style: l == null ? void 0 : l[w.Weekday], scope: "col" }, oe(b, s.options, s)))
            ),
            m.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[w.Weeks], style: l == null ? void 0 : l[w.Weeks] }, W.weeks.map((b) => m.createElement(
              r.Week,
              { className: i[w.Week], key: b.weekNumber, style: l == null ? void 0 : l[w.Week], week: b },
              D && m.createElement(r.WeekNumber, { week: b, style: l == null ? void 0 : l[w.WeekNumber], "aria-label": yn(b.weekNumber, {
                locale: c
              }), className: i[w.WeekNumber], scope: "row", role: "rowheader" }, B(b.weekNumber, s)),
              b.days.map((T) => {
                const { date: z } = T, p = He(T);
                if (p[I.focused] = !p.hidden && !!(Ye != null && Ye.isEqualTo(T)), p[Z.selected] = (ge == null ? void 0 : ge(z)) || p.selected, Ee(xe)) {
                  const { from: qe, to: ze } = xe;
                  p[Z.range_start] = !!(qe && ze && s.isSameDay(z, qe)), p[Z.range_end] = !!(qe && ze && s.isSameDay(z, ze)), p[Z.range_middle] = re(xe, z, !0, s);
                }
                const Tn = Oo(p, l, t.modifiersStyles), _n = ro(p, i, t.modifiersClassNames), Pn = !ut && !p.hidden ? un(z, p, s.options, s) : void 0;
                return m.createElement(r.Day, { key: `${T.isoDate}_${T.displayMonthId}`, day: T, modifiers: p, className: _n.join(" "), style: Tn, role: "gridcell", "aria-selected": p.selected || void 0, "aria-label": Pn, "data-day": T.isoDate, "data-month": T.outside ? T.dateMonthId : void 0, "data-selected": p.selected || void 0, "data-disabled": p.disabled || void 0, "data-hidden": p.hidden || void 0, "data-outside": T.outside || void 0, "data-focused": p.focused || void 0, "data-today": p.today || void 0 }, !p.hidden && ut ? m.createElement(r.DayButton, { className: i[w.DayButton], style: l == null ? void 0 : l[w.DayButton], type: "button", day: T, modifiers: p, disabled: !p.focused && p.disabled || void 0, "aria-disabled": p.focused && p.disabled || void 0, tabIndex: sn(T) ? 0 : -1, "aria-label": cn(z, p, s.options, s), onClick: Mn(T, p), onBlur: kn(T, p), onFocus: Dn(T, p), onKeyDown: On(T, p), onMouseEnter: vn(T, p), onMouseLeave: Wn(T, p) }, F(z, s.options, s)) : !p.hidden && F(T.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && m.createElement(r.Footer, { className: i[w.Footer], style: l == null ? void 0 : l[w.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Pe({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: a = "ghost",
  formatters: o,
  components: s,
  ...c
}) {
  const i = rt();
  return /* @__PURE__ */ A.jsx(
    Vo,
    {
      showOutsideDays: n,
      className: Y(
        "cn-calendar bg-background group/calendar [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
        ...o
      },
      classNames: {
        root: Y("w-fit", i.root),
        months: Y(
          "relative flex flex-col gap-4 md:flex-row",
          i.months
        ),
        month: Y("flex w-full flex-col gap-4", i.month),
        nav: Y(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          i.nav
        ),
        button_previous: Y(
          lt({ variant: a }),
          "h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 aria-disabled:opacity-50",
          i.button_previous
        ),
        button_next: Y(
          lt({ variant: a }),
          "h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 aria-disabled:opacity-50",
          i.button_next
        ),
        month_caption: Y(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          i.month_caption
        ),
        dropdowns: Y(
          "flex h-[var(--cell-size)] w-full items-center justify-center gap-1.5 text-sm font-medium",
          i.dropdowns
        ),
        dropdown_root: Y(
          "cn-calendar-dropdown-root shadow-xs relative rounded-md",
          i.dropdown_root
        ),
        dropdown: Y(
          "bg-popover absolute inset-0 opacity-0",
          i.dropdown
        ),
        caption_label: Y(
          "cn-calendar-caption-label select-none font-medium",
          r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md text-sm [&>svg]:size-3.5",
          i.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: Y("flex", i.weekdays),
        weekday: Y(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          i.weekday
        ),
        week: Y("mt-2 flex w-full", i.week),
        week_number_header: Y(
          "w-[var(--cell-size)] select-none",
          i.week_number_header
        ),
        week_number: Y(
          "text-muted-foreground select-none text-[0.8rem]",
          i.week_number
        ),
        day: Y(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.day
        ),
        range_start: Y(
          "bg-accent rounded-l-md",
          i.range_start
        ),
        range_middle: Y("rounded-none", i.range_middle),
        range_end: Y("bg-accent rounded-r-md", i.range_end),
        today: Y(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          i.today
        ),
        outside: Y(
          "text-muted-foreground aria-selected:text-muted-foreground",
          i.outside
        ),
        disabled: Y(
          "text-muted-foreground opacity-50",
          i.disabled
        ),
        hidden: Y("invisible", i.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: d, ...f }) => /* @__PURE__ */ A.jsx(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: Y(u),
            ...f
          }
        ),
        Chevron: ({ className: u, orientation: d, ...f }) => d === "left" ? /* @__PURE__ */ A.jsx(En, { className: Y("size-4", u), ...f }) : d === "right" ? /* @__PURE__ */ A.jsx(
          Fn,
          {
            className: Y("size-4", u),
            ...f
          }
        ) : /* @__PURE__ */ A.jsx(In, { className: Y("size-4", u), ...f }),
        DayButton: Jo,
        WeekNumber: ({ children: u, ...d }) => /* @__PURE__ */ A.jsx("td", { ...d, children: /* @__PURE__ */ A.jsx("div", { className: "flex size-[var(--cell-size)] items-center justify-center text-center", children: u }) }),
        ...s
      },
      ...c
    }
  );
}
function Jo({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const a = rt(), o = x.useRef(null);
  return x.useEffect(() => {
    var s;
    n.focused && ((s = o.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ A.jsx(
    St,
    {
      ref: o,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: Y(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[var(--cell-size)] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        a.day,
        e
      ),
      ...r
    }
  );
}
function Ko({
  mode: e = "single",
  value: t,
  onSelect: n,
  className: r
}) {
  const a = x.useMemo(() => {
    if (t) {
      if (e === "range")
        try {
          const u = JSON.parse(t);
          return {
            from: u.from ? ke(u.from) : void 0,
            to: u.to ? ke(u.to) : void 0
          };
        } catch {
          return;
        }
      if (e === "multiple")
        try {
          return JSON.parse(t).map((d) => ke(d));
        } catch {
          return;
        }
      return ke(t);
    }
  }, [t, e]), o = x.useMemo(() => {
    if (a)
      return e === "range" ? a.from : e === "multiple" ? a[0] : a;
  }, [a, e]), [s, c] = x.useState(() => {
    if (e !== "range" || !a) return !1;
    const u = a;
    return !!u.from && !!u.to;
  }), i = Y("rounded-lg border", r);
  return e === "range" ? /* @__PURE__ */ A.jsx(
    Pe,
    {
      mode: "range",
      numberOfMonths: 2,
      defaultMonth: o,
      selected: a,
      onSelect: (u, d) => {
        var f, h;
        if (n) {
          if (s) {
            n(JSON.stringify({ from: d.toISOString() })), c(!1);
            return;
          }
          u && (n(
            JSON.stringify({
              from: (f = u.from) == null ? void 0 : f.toISOString(),
              to: (h = u.to) == null ? void 0 : h.toISOString()
            })
          ), c(!!u.from && !!u.to));
        }
      },
      className: i
    }
  ) : e === "multiple" ? /* @__PURE__ */ A.jsx(
    Pe,
    {
      mode: "multiple",
      defaultMonth: o,
      selected: a,
      onSelect: (u) => {
        n && u && n(JSON.stringify(u.map((d) => d.toISOString())));
      },
      className: i
    }
  ) : /* @__PURE__ */ A.jsx(
    Pe,
    {
      mode: "single",
      defaultMonth: o,
      selected: a,
      onSelect: (u) => {
        u && n && n(u.toISOString());
      },
      className: i
    }
  );
}
function Lo({
  placeholder: e = "Pick a date",
  value: t,
  onSelect: n,
  className: r
}) {
  const [a, o] = x.useState(!1), s = x.useMemo(() => {
    if (t)
      return ke(t);
  }, [t]), c = (i) => {
    const u = i;
    u && n && n(u.toISOString()), o(!1);
  };
  return /* @__PURE__ */ A.jsxs(Bn, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ A.jsx(Hn, { asChild: !0, children: /* @__PURE__ */ A.jsxs(
      St,
      {
        variant: "outline",
        className: Y(
          "w-[240px] justify-start text-left font-normal",
          !s && "text-muted-foreground",
          r
        ),
        children: [
          /* @__PURE__ */ A.jsx(jn, { className: "size-4" }),
          s ? he(s, "PPP") : e
        ]
      }
    ) }),
    /* @__PURE__ */ A.jsx(An, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ A.jsx(
      Pe,
      {
        mode: "single",
        selected: s,
        onSelect: c
      }
    ) })
  ] });
}
export {
  Ko as PrefabCalendar,
  Lo as PrefabDatePicker
};
