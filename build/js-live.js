module.exports = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var a = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var a in e)
          n.d(
            r,
            a,
            function(t) {
              return e[t];
            }.bind(null, a)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/"),
    n((n.s = 191))
  );
})([
  function(e, t) {
    var n,
      r,
      a,
      o = ((n = 0),
      (r = {
        util: {
          encode: function(e) {
            return e instanceof a
              ? new a(e.type, r.util.encode(e.content), e.alias)
              : "Array" === r.util.type(e)
              ? e.map(r.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function(e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function(e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function(e, t) {
            var n = r.util.type(e);
            switch (((t = t || {}), n)) {
              case "Object":
                if (t[r.util.objId(e)]) return t[r.util.objId(e)];
                o = {};
                for (var a in ((t[r.util.objId(e)] = o), e))
                  e.hasOwnProperty(a) && (o[a] = r.util.clone(e[a], t));
                return o;
              case "Array":
                if (t[r.util.objId(e)]) return t[r.util.objId(e)];
                var o = [];
                return (
                  (t[r.util.objId(e)] = o),
                  e.forEach(function(e, n) {
                    o[n] = r.util.clone(e, t);
                  }),
                  o
                );
            }
            return e;
          }
        },
        languages: {
          extend: function(e, t) {
            var n = r.util.clone(r.languages[e]);
            for (var a in t) n[a] = t[a];
            return n;
          },
          insertBefore: function(e, t, n, a) {
            var o = (a = a || r.languages)[e];
            if (2 == arguments.length) {
              for (var i in (n = arguments[1]))
                n.hasOwnProperty(i) && (o[i] = n[i]);
              return o;
            }
            var s = {};
            for (var l in o)
              if (o.hasOwnProperty(l)) {
                if (l == t)
                  for (var i in n) n.hasOwnProperty(i) && (s[i] = n[i]);
                s[l] = o[l];
              }
            return (
              r.languages.DFS(r.languages, function(t, n) {
                n === a[e] && t != e && (this[t] = s);
              }),
              (a[e] = s)
            );
          },
          DFS: function(e, t, n, a) {
            for (var o in ((a = a || {}), e))
              e.hasOwnProperty(o) &&
                (t.call(e, o, e[o], n || o),
                "Object" !== r.util.type(e[o]) || a[r.util.objId(e[o])]
                  ? "Array" !== r.util.type(e[o]) ||
                    a[r.util.objId(e[o])] ||
                    ((a[r.util.objId(e[o])] = !0),
                    r.languages.DFS(e[o], t, o, a))
                  : ((a[r.util.objId(e[o])] = !0),
                    r.languages.DFS(e[o], t, null, a)));
          }
        },
        plugins: {},
        highlight: function(e, t, n) {
          var o = { code: e, grammar: t, language: n };
          return (
            (o.tokens = r.tokenize(o.code, o.grammar)),
            a.stringify(r.util.encode(o.tokens), o.language)
          );
        },
        matchGrammar: function(e, t, n, a, o, i, s) {
          var l = r.Token;
          for (var u in n)
            if (n.hasOwnProperty(u) && n[u]) {
              if (u == s) return;
              var c = n[u];
              c = "Array" === r.util.type(c) ? c : [c];
              for (var d = 0; d < c.length; ++d) {
                var p = c[d],
                  f = p.inside,
                  g = !!p.lookbehind,
                  m = !!p.greedy,
                  h = 0,
                  b = p.alias;
                if (m && !p.pattern.global) {
                  var v = p.pattern.toString().match(/[imuy]*$/)[0];
                  p.pattern = RegExp(p.pattern.source, v + "g");
                }
                p = p.pattern || p;
                for (var y = a, _ = o; y < t.length; _ += t[y].length, ++y) {
                  var E = t[y];
                  if (t.length > e.length) return;
                  if (!(E instanceof l)) {
                    if (m && y != t.length - 1) {
                      if (((p.lastIndex = _), !(S = p.exec(e)))) break;
                      for (
                        var w = S.index + (g ? S[1].length : 0),
                          O = S.index + S[0].length,
                          k = y,
                          x = _,
                          T = t.length;
                        k < T && (x < O || (!t[k].type && !t[k - 1].greedy));
                        ++k
                      )
                        w >= (x += t[k].length) && (++y, (_ = x));
                      if (t[y] instanceof l) continue;
                      (A = k - y), (E = e.slice(_, x)), (S.index -= _);
                    } else {
                      p.lastIndex = 0;
                      var S = p.exec(E),
                        A = 1;
                    }
                    if (S) {
                      g && (h = S[1] ? S[1].length : 0);
                      O = (w = S.index + h) + (S = S[0].slice(h)).length;
                      var N = E.slice(0, w),
                        C = E.slice(O),
                        L = [y, A];
                      N && (++y, (_ += N.length), L.push(N));
                      var R = new l(u, f ? r.tokenize(S, f) : S, b, S, m);
                      if (
                        (L.push(R),
                        C && L.push(C),
                        Array.prototype.splice.apply(t, L),
                        1 != A && r.matchGrammar(e, t, n, y, _, !0, u),
                        i)
                      )
                        break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        hooks: { add: function() {} },
        tokenize: function(e, t, n) {
          var a = [e],
            o = t.rest;
          if (o) {
            for (var i in o) t[i] = o[i];
            delete t.rest;
          }
          return r.matchGrammar(e, a, t, 0, 0, !1), a;
        }
      }),
      ((a = r.Token = function(e, t, n, r, a) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (r || "").length),
          (this.greedy = !!a);
      }).stringify = function(e, t, n) {
        if ("string" == typeof e) return e;
        if ("Array" === r.util.type(e))
          return e
            .map(function(n) {
              return a.stringify(n, t, e);
            })
            .join("");
        var o = {
          type: e.type,
          content: a.stringify(e.content, t, n),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: n
        };
        if (e.alias) {
          var i = "Array" === r.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(o.classes, i);
        }
        var s = Object.keys(o.attributes)
          .map(function(e) {
            return (
              e + '="' + (o.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          o.tag +
          ' class="' +
          o.classes.join(" ") +
          '"' +
          (s ? " " + s : "") +
          ">" +
          o.content +
          "</" +
          o.tag +
          ">"
        );
      }),
      r);
    (e.exports = o), (o.default = o);
  },
  function(e, t) {
    e.exports = require("react");
  },
  function(e, t, n) {
    e.exports = n(118)();
  },
  function(e, t, n) {
    e.exports = {
      frame: "WzsBpzaJn44HmlR5KnpGd",
      resultArea: "_24_oCvKsg5GswT0BaLdFNN",
      editorArea: "_2k_tP3aXyWS2ANnPguCjX6",
      header: "_3BFkO_0KOF74msuivp6hFn",
      tabButton: "_2Ct7if_-NZtFsnpGkq6hHr",
      activeTabBtn: "jJ8aYMY_oI2NpPCm3wsF-",
      consoleArea: "_1MxsTWUzoek09ZMgXoU3ve"
    };
  },
  function(e, t) {
    var n = (e.exports = { version: "2.6.3" });
    "number" == typeof __e && (__e = n);
  },
  function(e, t, n) {
    var r = n(55)("wks"),
      a = n(33),
      o = n(8).Symbol,
      i = "function" == typeof o;
    (e.exports = function(e) {
      return r[e] || (r[e] = (i && o[e]) || (i ? o : a)("Symbol." + e));
    }).store = r;
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      a = n(121),
      o = (r = a) && r.__esModule ? r : { default: r };
    t.default =
      o.default ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = i(n(133)),
      a = i(n(143)),
      o =
        "function" == typeof a.default && "symbol" == typeof r.default
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof a.default &&
                e.constructor === a.default &&
                e !== a.default.prototype
                ? "symbol"
                : typeof e;
            };
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default =
      "function" == typeof a.default && "symbol" === o(r.default)
        ? function(e) {
            return void 0 === e ? "undefined" : o(e);
          }
        : function(e) {
            return e &&
              "function" == typeof a.default &&
              e.constructor === a.default &&
              e !== a.default.prototype
              ? "symbol"
              : void 0 === e
              ? "undefined"
              : o(e);
          };
  },
  function(e, t) {
    var n = (e.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
        ? self
        : Function("return this")());
    "number" == typeof __g && (__g = n);
  },
  function(e, t, n) {
    var r = n(13),
      a = n(76),
      o = n(50),
      i = Object.defineProperty;
    t.f = n(14)
      ? Object.defineProperty
      : function(e, t, n) {
          if ((r(e), (t = o(t, !0)), r(n), a))
            try {
              return i(e, t, n);
            } catch (e) {}
          if ("get" in n || "set" in n)
            throw TypeError("Accessors not supported!");
          return "value" in n && (e[t] = n.value), e;
        };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = i(n(7)),
      a = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(81)),
      o = i(n(171));
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var s = Object.keys(a).reduce(function(e, t) {
      return (e[t] = (0, o.default)(a[t])), e;
    }, {});
    t.default = function(e, t) {
      return "string" == typeof t
        ? s[t][e]
        : "object" === (void 0 === t ? "undefined" : (0, r.default)(t))
        ? (0, o.default)(t)[e]
        : s.chromeLight[e];
    };
  },
  function(e, t) {
    var n = (e.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
        ? self
        : Function("return this")());
    "number" == typeof __g && (__g = n);
  },
  function(e, t, n) {
    var r = n(8),
      a = n(4),
      o = n(49),
      i = n(21),
      s = n(15),
      l = function(e, t, n) {
        var u,
          c,
          d,
          p = e & l.F,
          f = e & l.G,
          g = e & l.S,
          m = e & l.P,
          h = e & l.B,
          b = e & l.W,
          v = f ? a : a[t] || (a[t] = {}),
          y = v.prototype,
          _ = f ? r : g ? r[t] : (r[t] || {}).prototype;
        for (u in (f && (n = t), n))
          ((c = !p && _ && void 0 !== _[u]) && s(v, u)) ||
            ((d = c ? _[u] : n[u]),
            (v[u] =
              f && "function" != typeof _[u]
                ? n[u]
                : h && c
                ? o(d, r)
                : b && _[u] == d
                ? (function(e) {
                    var t = function(t, n, r) {
                      if (this instanceof e) {
                        switch (arguments.length) {
                          case 0:
                            return new e();
                          case 1:
                            return new e(t);
                          case 2:
                            return new e(t, n);
                        }
                        return new e(t, n, r);
                      }
                      return e.apply(this, arguments);
                    };
                    return (t.prototype = e.prototype), t;
                  })(d)
                : m && "function" == typeof d
                ? o(Function.call, d)
                : d),
            m &&
              (((v.virtual || (v.virtual = {}))[u] = d),
              e & l.R && y && !y[u] && i(y, u, d)));
      };
    (l.F = 1),
      (l.G = 2),
      (l.S = 4),
      (l.P = 8),
      (l.B = 16),
      (l.W = 32),
      (l.U = 64),
      (l.R = 128),
      (e.exports = l);
  },
  function(e, t, n) {
    var r = n(22);
    e.exports = function(e) {
      if (!r(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  },
  function(e, t, n) {
    e.exports = !n(26)(function() {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return n.call(e, t);
    };
  },
  function(e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      });
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      a = n(82),
      o = (r = a) && r.__esModule ? r : { default: r };
    t.default = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            (0, o.default)(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })();
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      a = n(7),
      o = (r = a) && r.__esModule ? r : { default: r };
    t.default = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t ||
        ("object" !== (void 0 === t ? "undefined" : (0, o.default)(t)) &&
          "function" != typeof t)
        ? e
        : t;
    };
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = i(n(153)),
      a = i(n(157)),
      o = i(n(7));
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " +
            (void 0 === t ? "undefined" : (0, o.default)(t))
        );
      (e.prototype = (0, a.default)(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t && (r.default ? (0, r.default)(e, t) : (e.__proto__ = t));
    };
  },
  function(e, t, n) {
    var r = n(42),
      a = n(70);
    e.exports = n(29)
      ? function(e, t, n) {
          return r.f(e, t, a(1, n));
        }
      : function(e, t, n) {
          return (e[t] = n), e;
        };
  },
  function(e, t, n) {
    var r = n(9),
      a = n(27);
    e.exports = n(14)
      ? function(e, t, n) {
          return r.f(e, t, a(1, n));
        }
      : function(e, t, n) {
          return (e[t] = n), e;
        };
  },
  function(e, t) {
    e.exports = function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    };
  },
  function(e, t, n) {
    var r = n(79),
      a = n(52);
    e.exports = function(e) {
      return r(a(e));
    };
  },
  function(e, t) {
    e.exports = {};
  },
  function(e, t, n) {
    var r = n(66)("wks"),
      a = n(41),
      o = n(11).Symbol,
      i = "function" == typeof o;
    (e.exports = function(e) {
      return r[e] || (r[e] = (i && o[e]) || (i ? o : a)("Symbol." + e));
    }).store = r;
  },
  function(e, t) {
    e.exports = function(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  },
  function(e, t, n) {
    for (
      var r = n(97),
        a = n(72),
        o = n(47),
        i = n(11),
        s = n(20),
        l = n(45),
        u = n(25),
        c = u("iterator"),
        d = u("toStringTag"),
        p = l.Array,
        f = {
          CSSRuleList: !0,
          CSSStyleDeclaration: !1,
          CSSValueList: !1,
          ClientRectList: !1,
          DOMRectList: !1,
          DOMStringList: !1,
          DOMTokenList: !0,
          DataTransferItemList: !1,
          FileList: !1,
          HTMLAllCollection: !1,
          HTMLCollection: !1,
          HTMLFormElement: !1,
          HTMLSelectElement: !1,
          MediaList: !0,
          MimeTypeArray: !1,
          NamedNodeMap: !1,
          NodeList: !0,
          PaintRequestList: !1,
          Plugin: !1,
          PluginArray: !1,
          SVGLengthList: !1,
          SVGNumberList: !1,
          SVGPathSegList: !1,
          SVGPointList: !1,
          SVGStringList: !1,
          SVGTransformList: !1,
          SourceBufferList: !1,
          StyleSheetList: !0,
          TextTrackCueList: !1,
          TextTrackList: !1,
          TouchList: !1
        },
        g = a(f),
        m = 0;
      m < g.length;
      m++
    ) {
      var h,
        b = g[m],
        v = f[b],
        y = i[b],
        _ = y && y.prototype;
      if (_ && (_[c] || s(_, c, p), _[d] || s(_, d, b), (l[b] = p), v))
        for (h in r) _[h] || o(_, h, r[h], !0);
    }
  },
  function(e, t, n) {
    e.exports = !n(68)(function() {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function() {
            return 7;
          }
        }).a
      );
    });
  },
  function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return n.call(e, t);
    };
  },
  function(e, t, n) {
    var r = n(78),
      a = n(56);
    e.exports =
      Object.keys ||
      function(e) {
        return r(e, a);
      };
  },
  function(e, t) {
    e.exports = !0;
  },
  function(e, t) {
    var n = 0,
      r = Math.random();
    e.exports = function(e) {
      return "Symbol(".concat(
        void 0 === e ? "" : e,
        ")_",
        (++n + r).toString(36)
      );
    };
  },
  function(e, t) {
    t.f = {}.propertyIsEnumerable;
  },
  function(e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function(e, t) {
        var n = {};
        for (var r in e)
          t.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
        return n;
      });
  },
  function(e, t, n) {
    "use strict";
    var r = n(135)(!0);
    n(83)(
      String,
      "String",
      function(e) {
        (this._t = String(e)), (this._i = 0);
      },
      function() {
        var e,
          t = this._t,
          n = this._i;
        return n >= t.length
          ? { value: void 0, done: !0 }
          : ((e = r(t, n)), (this._i += e.length), { value: e, done: !1 });
      }
    );
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = s(n(6)),
      a = s(n(1)),
      o = s(n(2)),
      i = s(n(10));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = function(e, t) {
      var n = e.name,
        o = e.dimmed,
        s = e.styles,
        l = t.theme,
        u = (0, i.default)("ObjectName", l),
        c = (0, r.default)({}, u.base, o ? u.dimmed : {}, s);
      return a.default.createElement("span", { style: c }, n);
    };
    (l.propTypes = { name: o.default.string, dimmed: o.default.bool }),
      (l.defaultProps = { dimmed: !1 }),
      (l.contextTypes = {
        theme: o.default.oneOfType([o.default.string, o.default.object])
      }),
      (t.default = l);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = l(n(7)),
      a = l(n(6)),
      o = l(n(1)),
      i = l(n(2)),
      s = l(n(10));
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var u = function(e, t) {
      var n = e.object,
        i = e.styles,
        l = t.theme,
        u = (0, s.default)("ObjectValue", l),
        c = function(e) {
          return (0, a.default)({}, u[e], i);
        };
      switch (void 0 === n ? "undefined" : (0, r.default)(n)) {
        case "number":
          return o.default.createElement(
            "span",
            { style: c("objectValueNumber") },
            String(n)
          );
        case "string":
          return o.default.createElement(
            "span",
            { style: c("objectValueString") },
            '"',
            n,
            '"'
          );
        case "boolean":
          return o.default.createElement(
            "span",
            { style: c("objectValueBoolean") },
            String(n)
          );
        case "undefined":
          return o.default.createElement(
            "span",
            { style: c("objectValueUndefined") },
            "undefined"
          );
        case "object":
          return null === n
            ? o.default.createElement(
                "span",
                { style: c("objectValueNull") },
                "null"
              )
            : n instanceof Date
            ? o.default.createElement("span", null, n.toString())
            : n instanceof RegExp
            ? o.default.createElement(
                "span",
                { style: c("objectValueRegExp") },
                n.toString()
              )
            : Array.isArray(n)
            ? o.default.createElement("span", null, "Array[" + n.length + "]")
            : n.constructor
            ? "function" == typeof n.constructor.isBuffer &&
              n.constructor.isBuffer(n)
              ? o.default.createElement(
                  "span",
                  null,
                  "Buffer[" + n.length + "]"
                )
              : o.default.createElement("span", null, n.constructor.name)
            : o.default.createElement("span", null, "Object");
        case "function":
          return o.default.createElement(
            "span",
            null,
            o.default.createElement(
              "span",
              { style: c("objectValueFunctionKeyword") },
              "function"
            ),
            o.default.createElement(
              "span",
              { style: c("objectValueFunctionName") },
              " ",
              n.name,
              "()"
            )
          );
        case "symbol":
          return o.default.createElement(
            "span",
            { style: c("objectValueSymbol") },
            n.toString()
          );
        default:
          return o.default.createElement("span", null);
      }
    };
    (u.propTypes = { object: i.default.any }),
      (u.contextTypes = {
        theme: i.default.oneOfType([i.default.string, i.default.object])
      }),
      (t.default = u);
  },
  function(e, t) {
    e.exports = {
      plain: { color: "#d6deeb", backgroundColor: "#011627" },
      styles: [
        {
          types: ["changed"],
          style: { color: "rgb(162, 191, 252)", fontStyle: "italic" }
        },
        {
          types: ["deleted"],
          style: { color: "rgba(239, 83, 80, 0.56)", fontStyle: "italic" }
        },
        {
          types: ["inserted", "attr-name"],
          style: { color: "rgb(173, 219, 103)", fontStyle: "italic" }
        },
        {
          types: ["comment"],
          style: { color: "rgb(99, 119, 119)", fontStyle: "italic" }
        },
        { types: ["string", "url"], style: { color: "rgb(173, 219, 103)" } },
        { types: ["variable"], style: { color: "rgb(214, 222, 235)" } },
        { types: ["number"], style: { color: "rgb(247, 140, 108)" } },
        {
          types: ["builtin", "char", "constant", "function"],
          style: { color: "rgb(130, 170, 255)" }
        },
        { types: ["punctuation"], style: { color: "rgb(199, 146, 234)" } },
        {
          types: ["selector", "doctype"],
          style: { color: "rgb(199, 146, 234)", fontStyle: "italic" }
        },
        { types: ["class-name"], style: { color: "rgb(255, 203, 139)" } },
        {
          types: ["tag", "operator", "keyword"],
          style: { color: "rgb(127, 219, 202)" }
        },
        { types: ["boolean"], style: { color: "rgb(255, 88, 116)" } },
        { types: ["property"], style: { color: "rgb(128, 203, 196)" } },
        { types: ["namespace"], style: { color: "rgb(178, 204, 214)" } }
      ]
    };
  },
  function(e, t) {
    var n = (e.exports = { version: "2.6.3" });
    "number" == typeof __e && (__e = n);
  },
  function(e, t) {
    var n = 0,
      r = Math.random();
    e.exports = function(e) {
      return "Symbol(".concat(
        void 0 === e ? "" : e,
        ")_",
        (++n + r).toString(36)
      );
    };
  },
  function(e, t, n) {
    var r = n(43),
      a = n(99),
      o = n(100),
      i = Object.defineProperty;
    t.f = n(29)
      ? Object.defineProperty
      : function(e, t, n) {
          if ((r(e), (t = o(t, !0)), r(n), a))
            try {
              return i(e, t, n);
            } catch (e) {}
          if ("get" in n || "set" in n)
            throw TypeError("Accessors not supported!");
          return "value" in n && (e[t] = n.value), e;
        };
  },
  function(e, t, n) {
    var r = n(44);
    e.exports = function(e) {
      if (!r(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  },
  function(e, t) {
    e.exports = function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    };
  },
  function(e, t) {
    e.exports = {};
  },
  function(e, t, n) {
    var r = n(102),
      a = n(71);
    e.exports = function(e) {
      return r(a(e));
    };
  },
  function(e, t, n) {
    var r = n(11),
      a = n(20),
      o = n(30),
      i = n(41)("src"),
      s = Function.toString,
      l = ("" + s).split("toString");
    (n(40).inspectSource = function(e) {
      return s.call(e);
    }),
      (e.exports = function(e, t, n, s) {
        var u = "function" == typeof n;
        u && (o(n, "name") || a(n, "name", t)),
          e[t] !== n &&
            (u && (o(n, i) || a(n, i, e[t] ? "" + e[t] : l.join(String(t)))),
            e === r
              ? (e[t] = n)
              : s
              ? e[t]
                ? (e[t] = n)
                : a(e, t, n)
              : (delete e[t], a(e, t, n)));
      })(Function.prototype, "toString", function() {
        return ("function" == typeof this && this[i]) || s.call(this);
      });
  },
  function(e, t, n) {
    var r = n(66)("keys"),
      a = n(41);
    e.exports = function(e) {
      return r[e] || (r[e] = a(e));
    };
  },
  function(e, t, n) {
    var r = n(124);
    e.exports = function(e, t, n) {
      if ((r(e), void 0 === t)) return e;
      switch (n) {
        case 1:
          return function(n) {
            return e.call(t, n);
          };
        case 2:
          return function(n, r) {
            return e.call(t, n, r);
          };
        case 3:
          return function(n, r, a) {
            return e.call(t, n, r, a);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    };
  },
  function(e, t, n) {
    var r = n(22);
    e.exports = function(e, t) {
      if (!r(e)) return e;
      var n, a;
      if (t && "function" == typeof (n = e.toString) && !r((a = n.call(e))))
        return a;
      if ("function" == typeof (n = e.valueOf) && !r((a = n.call(e)))) return a;
      if (!t && "function" == typeof (n = e.toString) && !r((a = n.call(e))))
        return a;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
      return n.call(e).slice(8, -1);
    };
  },
  function(e, t) {
    e.exports = function(e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  },
  function(e, t) {
    var n = Math.ceil,
      r = Math.floor;
    e.exports = function(e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? r : n)(e);
    };
  },
  function(e, t, n) {
    var r = n(55)("keys"),
      a = n(33);
    e.exports = function(e) {
      return r[e] || (r[e] = a(e));
    };
  },
  function(e, t, n) {
    var r = n(4),
      a = n(8),
      o = a["__core-js_shared__"] || (a["__core-js_shared__"] = {});
    (e.exports = function(e, t) {
      return o[e] || (o[e] = void 0 !== t ? t : {});
    })("versions", []).push({
      version: r.version,
      mode: n(32) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  },
  function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function(e, t) {
    t.f = Object.getOwnPropertySymbols;
  },
  function(e, t, n) {
    var r = n(52);
    e.exports = function(e) {
      return Object(r(e));
    };
  },
  function(e, t, n) {
    var r = n(13),
      a = n(137),
      o = n(56),
      i = n(54)("IE_PROTO"),
      s = function() {},
      l = function() {
        var e,
          t = n(77)("iframe"),
          r = o.length;
        for (
          t.style.display = "none",
            n(138).appendChild(t),
            t.src = "javascript:",
            (e = t.contentWindow.document).open(),
            e.write("<script>document.F=Object</script>"),
            e.close(),
            l = e.F;
          r--;

        )
          delete l.prototype[o[r]];
        return l();
      };
    e.exports =
      Object.create ||
      function(e, t) {
        var n;
        return (
          null !== e
            ? ((s.prototype = r(e)),
              (n = new s()),
              (s.prototype = null),
              (n[i] = e))
            : (n = l()),
          void 0 === t ? n : a(n, t)
        );
      };
  },
  function(e, t, n) {
    var r = n(9).f,
      a = n(15),
      o = n(5)("toStringTag");
    e.exports = function(e, t, n) {
      e &&
        !a((e = n ? e : e.prototype), o) &&
        r(e, o, { configurable: !0, value: t });
    };
  },
  function(e, t, n) {
    n(140);
    for (
      var r = n(8),
        a = n(21),
        o = n(24),
        i = n(5)("toStringTag"),
        s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(
          ","
        ),
        l = 0;
      l < s.length;
      l++
    ) {
      var u = s[l],
        c = r[u],
        d = c && c.prototype;
      d && !d[i] && a(d, i, u), (o[u] = o.Array);
    }
  },
  function(e, t, n) {
    t.f = n(5);
  },
  function(e, t, n) {
    var r = n(8),
      a = n(4),
      o = n(32),
      i = n(62),
      s = n(9).f;
    e.exports = function(e) {
      var t = a.Symbol || (a.Symbol = o ? {} : r.Symbol || {});
      "_" == e.charAt(0) || e in t || s(t, e, { value: i.f(e) });
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = u(n(16)),
      a = u(n(17)),
      o = u(n(18)),
      i = u(n(19)),
      s = n(1),
      l = u(n(2));
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var c = (function(e) {
      function t() {
        return (
          (0, r.default)(this, t),
          (0, o.default)(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
          )
        );
      }
      return (
        (0, i.default)(t, e),
        (0, a.default)(t, [
          {
            key: "getChildContext",
            value: function() {
              return { theme: this.props.theme };
            }
          },
          {
            key: "render",
            value: function() {
              return this.props.children;
            }
          }
        ]),
        t
      );
    })(s.Component);
    (c.childContextTypes = {
      theme: l.default.oneOfType([l.default.string, l.default.object])
    }),
      (t.default = c);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Inspector = t.ObjectName = t.ObjectValue = t.ObjectRootLabel = t.ObjectLabel = t.DOMInspector = t.TableInspector = t.ObjectInspector = t.chromeDark = t.chromeLight = void 0);
    var r = h(n(6)),
      a = h(n(35)),
      o = n(81);
    Object.defineProperty(t, "chromeLight", {
      enumerable: !0,
      get: function() {
        return o.chromeLight;
      }
    }),
      Object.defineProperty(t, "chromeDark", {
        enumerable: !0,
        get: function() {
          return o.chromeDark;
        }
      });
    var i = h(n(130)),
      s = h(n(175)),
      l = h(n(188)),
      u = h(n(92)),
      c = h(n(91)),
      d = h(n(38)),
      p = h(n(37)),
      f = h(n(1)),
      g = h(n(2)),
      m = h(n(190));
    function h(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.ObjectInspector = i.default),
      (t.TableInspector = s.default),
      (t.DOMInspector = l.default),
      (t.ObjectLabel = u.default),
      (t.ObjectRootLabel = c.default),
      (t.ObjectValue = d.default),
      (t.ObjectName = p.default);
    var b = function(e) {
      var t = e.table,
        n = void 0 !== t && t,
        o = e.data,
        u = (0, a.default)(e, ["table", "data"]);
      return n
        ? f.default.createElement(s.default, (0, r.default)({ data: o }, u))
        : (0, m.default)(o)
        ? f.default.createElement(l.default, (0, r.default)({ data: o }, u))
        : f.default.createElement(i.default, (0, r.default)({ data: o }, u));
    };
    (b.propTypes = {
      data: g.default.any,
      name: g.default.string,
      table: g.default.bool
    }),
      (t.Inspector = b),
      (t.default = b);
  },
  function(e, t, n) {
    var r = n(40),
      a = n(11),
      o = a["__core-js_shared__"] || (a["__core-js_shared__"] = {});
    (e.exports = function(e, t) {
      return o[e] || (o[e] = void 0 !== t ? t : {});
    })("versions", []).push({
      version: r.version,
      mode: n(67) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  },
  function(e, t) {
    e.exports = !1;
  },
  function(e, t) {
    e.exports = function(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  },
  function(e, t, n) {
    var r = n(44),
      a = n(11).document,
      o = r(a) && r(a.createElement);
    e.exports = function(e) {
      return o ? a.createElement(e) : {};
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  },
  function(e, t) {
    e.exports = function(e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  },
  function(e, t, n) {
    var r = n(111),
      a = n(74);
    e.exports =
      Object.keys ||
      function(e) {
        return r(e, a);
      };
  },
  function(e, t) {
    var n = Math.ceil,
      r = Math.floor;
    e.exports = function(e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? r : n)(e);
    };
  },
  function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function(e, t, n) {
    var r = n(42).f,
      a = n(30),
      o = n(25)("toStringTag");
    e.exports = function(e, t, n) {
      e &&
        !a((e = n ? e : e.prototype), o) &&
        r(e, o, { configurable: !0, value: t });
    };
  },
  function(e, t, n) {
    e.exports =
      !n(14) &&
      !n(26)(function() {
        return (
          7 !=
          Object.defineProperty(n(77)("div"), "a", {
            get: function() {
              return 7;
            }
          }).a
        );
      });
  },
  function(e, t, n) {
    var r = n(22),
      a = n(8).document,
      o = r(a) && r(a.createElement);
    e.exports = function(e) {
      return o ? a.createElement(e) : {};
    };
  },
  function(e, t, n) {
    var r = n(15),
      a = n(23),
      o = n(126)(!1),
      i = n(54)("IE_PROTO");
    e.exports = function(e, t) {
      var n,
        s = a(e),
        l = 0,
        u = [];
      for (n in s) n != i && r(s, n) && u.push(n);
      for (; t.length > l; ) r(s, (n = t[l++])) && (~o(u, n) || u.push(n));
      return u;
    };
  },
  function(e, t, n) {
    var r = n(51);
    e.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function(e) {
          return "String" == r(e) ? e.split("") : Object(e);
        };
  },
  function(e, t, n) {
    var r = n(53),
      a = Math.min;
    e.exports = function(e) {
      return e > 0 ? a(r(e), 9007199254740991) : 0;
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.chromeLight = t.chromeDark = void 0);
    var r = o(n(128)),
      a = o(n(129));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.chromeDark = r.default), (t.chromeLight = a.default);
  },
  function(e, t, n) {
    e.exports = { default: n(131), __esModule: !0 };
  },
  function(e, t, n) {
    "use strict";
    var r = n(32),
      a = n(12),
      o = n(84),
      i = n(21),
      s = n(24),
      l = n(136),
      u = n(60),
      c = n(139),
      d = n(5)("iterator"),
      p = !([].keys && "next" in [].keys()),
      f = function() {
        return this;
      };
    e.exports = function(e, t, n, g, m, h, b) {
      l(n, t, g);
      var v,
        y,
        _,
        E = function(e) {
          if (!p && e in x) return x[e];
          switch (e) {
            case "keys":
            case "values":
              return function() {
                return new n(this, e);
              };
          }
          return function() {
            return new n(this, e);
          };
        },
        w = t + " Iterator",
        O = "values" == m,
        k = !1,
        x = e.prototype,
        T = x[d] || x["@@iterator"] || (m && x[m]),
        S = T || E(m),
        A = m ? (O ? E("entries") : S) : void 0,
        N = ("Array" == t && x.entries) || T;
      if (
        (N &&
          (_ = c(N.call(new e()))) !== Object.prototype &&
          _.next &&
          (u(_, w, !0), r || "function" == typeof _[d] || i(_, d, f)),
        O &&
          T &&
          "values" !== T.name &&
          ((k = !0),
          (S = function() {
            return T.call(this);
          })),
        (r && !b) || (!p && !k && x[d]) || i(x, d, S),
        (s[t] = S),
        (s[w] = f),
        m)
      )
        if (
          ((v = {
            values: O ? S : E("values"),
            keys: h ? S : E("keys"),
            entries: A
          }),
          b)
        )
          for (y in v) y in x || o(x, y, v[y]);
        else a(a.P + a.F * (p || k), t, v);
      return v;
    };
  },
  function(e, t, n) {
    e.exports = n(21);
  },
  function(e, t, n) {
    var r = n(78),
      a = n(56).concat("length", "prototype");
    t.f =
      Object.getOwnPropertyNames ||
      function(e) {
        return r(e, a);
      };
  },
  function(e, t, n) {
    var r = n(34),
      a = n(27),
      o = n(23),
      i = n(50),
      s = n(15),
      l = n(76),
      u = Object.getOwnPropertyDescriptor;
    t.f = n(14)
      ? u
      : function(e, t) {
          if (((e = o(e)), (t = i(t, !0)), l))
            try {
              return u(e, t);
            } catch (e) {}
          if (s(e, t)) return a(!r.f.call(e, t), e[t]);
        };
  },
  function(e, t, n) {
    e.exports = n(160);
  },
  function(e, t, n) {
    var r = n(51),
      a = n(5)("toStringTag"),
      o =
        "Arguments" ==
        r(
          (function() {
            return arguments;
          })()
        );
    e.exports = function(e) {
      var t, n, i;
      return void 0 === e
        ? "Undefined"
        : null === e
        ? "Null"
        : "string" ==
          typeof (n = (function(e, t) {
            try {
              return e[t];
            } catch (e) {}
          })((t = Object(e)), a))
        ? n
        : o
        ? r(t)
        : "Object" == (i = r(t)) && "function" == typeof t.callee
        ? "Arguments"
        : i;
    };
  },
  function(e, t, n) {
    var r = n(88),
      a = n(5)("iterator"),
      o = n(24);
    e.exports = n(4).getIteratorMethod = function(e) {
      if (null != e) return e[a] || e["@@iterator"] || o[r(e)];
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = m(n(6)),
      a = m(n(35)),
      o = m(n(16)),
      i = m(n(17)),
      s = m(n(18)),
      l = m(n(19)),
      u = m(n(169)),
      c = n(1),
      d = m(c),
      p = m(n(2)),
      f = m(n(170)),
      g = n(173);
    function m(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var h = (function(e) {
      function t(e, n) {
        (0, o.default)(this, t);
        var r = (0, s.default)(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
        );
        return (r.state = n.store.storeState), r;
      }
      return (
        (0, l.default)(t, e),
        (0, i.default)(t, [
          {
            key: "shouldComponentUpdate",
            value: function(e, t) {
              return (
                !!t.expandedPaths[e.path] !=
                  !!this.state.expandedPaths[this.props.path] ||
                e.data !== this.props.data ||
                e.name !== this.props.name
              );
            }
          },
          {
            key: "handleClick",
            value: function(e) {
              (this.context.store.storeState = (function(e, t) {
                switch (t.type) {
                  case "TOGGLE_EXPAND":
                    var n = t.path,
                      r = !!e.expandedPaths[n];
                    return Object.assign({}, e, {
                      expandedPaths: Object.assign(
                        {},
                        e.expandedPaths,
                        (0, u.default)({}, n, !r)
                      )
                    });
                  default:
                    return e;
                }
              })(this.context.store.storeState, {
                type: "TOGGLE_EXPAND",
                path: e
              })),
                this.setState(this.context.store.storeState);
            }
          },
          {
            key: "renderChildNodes",
            value: function(e, n) {
              var o = this.props.dataIterator,
                i = this.props.depth,
                s = this.props.nodeRenderer,
                l = [],
                u = !0,
                c = !1,
                p = void 0;
              try {
                for (
                  var f, g = o(e)[Symbol.iterator]();
                  !(u = (f = g.next()).done);
                  u = !0
                ) {
                  var m = f.value,
                    h = m.name,
                    b = m.data,
                    v = (0, a.default)(m, ["name", "data"]),
                    y = h,
                    _ = n + "." + y;
                  l.push(
                    d.default.createElement(
                      t,
                      (0, r.default)(
                        {
                          name: h,
                          data: b,
                          depth: i + 1,
                          path: _,
                          key: y,
                          dataIterator: o,
                          nodeRenderer: s
                        },
                        v
                      )
                    )
                  );
                }
              } catch (e) {
                (c = !0), (p = e);
              } finally {
                try {
                  !u && g.return && g.return();
                } finally {
                  if (c) throw p;
                }
              }
              return l;
            }
          },
          {
            key: "render",
            value: function() {
              var e = this.props,
                t = e.data,
                n = e.dataIterator,
                a = e.path,
                o = e.depth,
                i = (0, g.hasChildNodes)(t, n),
                s = !!this.state.expandedPaths[a],
                l = this.props.nodeRenderer;
              return d.default.createElement(
                f.default,
                (0, r.default)(
                  {
                    expanded: s,
                    onClick: i ? this.handleClick.bind(this, a) : function() {},
                    shouldShowArrow: i,
                    shouldShowPlaceholder: o > 0,
                    nodeRenderer: l
                  },
                  this.props
                ),
                s ? this.renderChildNodes(t, a) : void 0
              );
            }
          }
        ]),
        t
      );
    })(c.Component);
    (h.propTypes = {
      name: p.default.string,
      data: p.default.any,
      dataIterator: p.default.func,
      depth: p.default.number,
      expanded: p.default.bool,
      nodeRenderer: p.default.func
    }),
      (h.contextTypes = { store: p.default.any });
    var b = (function(e) {
      function t(e) {
        (0, o.default)(this, t);
        var n = (0, s.default)(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
        );
        return (
          (n.store = {
            storeState: {
              expandedPaths: (0, g.getExpandedPaths)(
                e.data,
                e.dataIterator,
                e.expandPaths,
                e.expandLevel
              )
            }
          }),
          n
        );
      }
      return (
        (0, l.default)(t, e),
        (0, i.default)(t, [
          {
            key: "componentWillReceiveProps",
            value: function(e) {
              this.store = {
                storeState: {
                  expandedPaths: (0, g.getExpandedPaths)(
                    e.data,
                    e.dataIterator,
                    e.expandPaths,
                    e.expandLevel,
                    this.store.storeState.expandedPaths
                  )
                }
              };
            }
          },
          {
            key: "getChildContext",
            value: function() {
              return { store: this.store };
            }
          },
          {
            key: "render",
            value: function() {
              var e = this.props,
                t = e.name,
                n = e.data,
                r = e.dataIterator,
                a = this.props.nodeRenderer,
                o = g.DEFAULT_ROOT_PATH;
              return d.default.createElement(h, {
                name: t,
                data: n,
                dataIterator: r,
                depth: 0,
                path: o,
                nodeRenderer: a
              });
            }
          }
        ]),
        t
      );
    })(c.Component);
    (b.defaultProps = { expandLevel: 0, expandPaths: [] }),
      (b.childContextTypes = { store: p.default.any }),
      (b.propTypes = {
        name: p.default.string,
        data: p.default.any,
        dataIterator: p.default.func,
        nodeRenderer: p.default.func
      }),
      (b.defaultProps = { name: void 0 }),
      (t.default = b);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = i(n(1)),
      a = i(n(37)),
      o = i(n(174));
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default = function(e) {
      var t = e.name,
        n = e.data;
      return "string" == typeof t
        ? r.default.createElement(
            "span",
            null,
            r.default.createElement(a.default, { name: t }),
            r.default.createElement("span", null, ": "),
            r.default.createElement(o.default, { data: n })
          )
        : r.default.createElement(o.default, { data: n });
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = s(n(1)),
      a = s(n(2)),
      o = s(n(37)),
      i = s(n(38));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = function(e) {
      var t = e.name,
        n = e.data,
        a = e.isNonenumerable,
        s = n;
      return r.default.createElement(
        "span",
        null,
        r.default.createElement(o.default, { name: t, dimmed: a }),
        r.default.createElement("span", null, ": "),
        r.default.createElement(i.default, { object: s })
      );
    };
    (l.propTypes = { isNonenumerable: a.default.bool }),
      (l.defaultProps = { isNonenumerable: !1 }),
      (t.default = l);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function(e) {
      return (
        0 === e.childNodes.length ||
        (1 === e.childNodes.length &&
          e.childNodes[0].nodeType === Node.TEXT_NODE &&
          e.textContent.length < 80)
      );
    };
  },
  function(e, t, n) {
    "use strict";
    (function(e) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          },
        a = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return (t.default = e), t;
        })(n(1));
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var s = 13,
        l = 9,
        u = 8,
        c = 89,
        d = 90,
        p = 77,
        f = 57,
        g = 219,
        m = 222,
        h = 192,
        b = 100,
        v = 3e3,
        y = "navigator" in e && /Win/i.test(navigator.platform),
        _ =
          "navigator" in e &&
          /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
        E = "npm__react-simple-code-editor__textarea",
        w = (function(e) {
          function t() {
            var e, n, a;
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
            for (var o = arguments.length, E = Array(o), w = 0; w < o; w++)
              E[w] = arguments[w];
            return (
              (n = a = i(
                this,
                (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                  e,
                  [this].concat(E)
                )
              )),
              (a.state = { capture: !0, ie: !1 }),
              (a._recordCurrentState = function() {
                var e = a._input;
                if (e) {
                  var t = e.value,
                    n = e.selectionStart,
                    r = e.selectionEnd;
                  a._recordChange({
                    value: t,
                    selectionStart: n,
                    selectionEnd: r
                  });
                }
              }),
              (a._getLines = function(e, t) {
                return e.substring(0, t).split("\n");
              }),
              (a._recordChange = function(e) {
                var t =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  n = a._history,
                  o = n.stack,
                  i = n.offset;
                if (o.length && i > -1) {
                  a._history.stack = o.slice(0, i + 1);
                  var s = a._history.stack.length;
                  if (s > b) {
                    var l = s - b;
                    (a._history.stack = o.slice(l, s)),
                      (a._history.offset = Math.max(a._history.offset - l, 0));
                  }
                }
                var u = Date.now();
                if (t) {
                  var c = a._history.stack[a._history.offset];
                  if (c && u - c.timestamp < v) {
                    var d = /[^a-z0-9]([a-z0-9]+)$/i,
                      p = a
                        ._getLines(c.value, c.selectionStart)
                        .pop()
                        .match(d),
                      f = a
                        ._getLines(e.value, e.selectionStart)
                        .pop()
                        .match(d);
                    if (p && f && f[1].startsWith(p[1]))
                      return void (a._history.stack[a._history.offset] = r(
                        {},
                        e,
                        { timestamp: u }
                      ));
                  }
                }
                a._history.stack.push(r({}, e, { timestamp: u })),
                  a._history.offset++;
              }),
              (a._updateInput = function(e) {
                var t = a._input;
                t &&
                  ((t.value = e.value),
                  (t.selectionStart = e.selectionStart),
                  (t.selectionEnd = e.selectionEnd),
                  a.props.onValueChange(e.value));
              }),
              (a._applyEdits = function(e) {
                var t = a._input,
                  n = a._history.stack[a._history.offset];
                n &&
                  t &&
                  (a._history.stack[a._history.offset] = r({}, n, {
                    selectionStart: t.selectionStart,
                    selectionEnd: t.selectionEnd
                  })),
                  a._recordChange(e),
                  a._updateInput(e);
              }),
              (a._undoEdit = function() {
                var e = a._history,
                  t = e.stack,
                  n = e.offset,
                  r = t[n - 1];
                r &&
                  (a._updateInput(r), (a._history.offset = Math.max(n - 1, 0)));
              }),
              (a._redoEdit = function() {
                var e = a._history,
                  t = e.stack,
                  n = e.offset,
                  r = t[n + 1];
                r &&
                  (a._updateInput(r),
                  (a._history.offset = Math.min(n + 1, t.length - 1)));
              }),
              (a._handleKeyDown = function(e) {
                var t = a.props,
                  n = t.tabSize,
                  r = t.insertSpaces,
                  o = t.ignoreTabKey,
                  i = e.target,
                  b = i.value,
                  v = i.selectionStart,
                  E = i.selectionEnd,
                  w = (r ? " " : "     ").repeat(n);
                if (e.keyCode === l && !o && a.state.capture)
                  if ((e.preventDefault(), e.shiftKey)) {
                    var O = a._getLines(b, v),
                      k = O.length - 1,
                      x = a._getLines(b, E).length - 1,
                      T = b
                        .split("\n")
                        .map(function(e, t) {
                          return t >= k && t <= x && e.startsWith(w)
                            ? e.substring(w.length)
                            : e;
                        })
                        .join("\n");
                    if (b !== T) {
                      var S = O[k];
                      a._applyEdits({
                        value: T,
                        selectionStart: S.startsWith(w) ? v - w.length : v,
                        selectionEnd: E - (b.length - T.length)
                      });
                    }
                  } else if (v !== E) {
                    var A = a._getLines(b, v),
                      N = A.length - 1,
                      C = a._getLines(b, E).length - 1,
                      L = A[N];
                    a._applyEdits({
                      value: b
                        .split("\n")
                        .map(function(e, t) {
                          return t >= N && t <= C ? w + e : e;
                        })
                        .join("\n"),
                      selectionStart: /\S/.test(L) ? v + w.length : v,
                      selectionEnd: E + w.length * (C - N + 1)
                    });
                  } else {
                    var R = v + w.length;
                    a._applyEdits({
                      value: b.substring(0, v) + w + b.substring(E),
                      selectionStart: R,
                      selectionEnd: R
                    });
                  }
                else if (e.keyCode === u) {
                  var I = v !== E;
                  if (b.substring(0, v).endsWith(w) && !I) {
                    e.preventDefault();
                    var j = v - w.length;
                    a._applyEdits({
                      value: b.substring(0, v - w.length) + b.substring(E),
                      selectionStart: j,
                      selectionEnd: j
                    });
                  }
                } else if (e.keyCode === s) {
                  if (v === E) {
                    var P = a
                      ._getLines(b, v)
                      .pop()
                      .match(/^\s+/);
                    if (P && P[0]) {
                      e.preventDefault();
                      var M = "\n" + P[0],
                        D = v + M.length;
                      a._applyEdits({
                        value: b.substring(0, v) + M + b.substring(E),
                        selectionStart: D,
                        selectionEnd: D
                      });
                    }
                  }
                } else if (
                  e.keyCode === f ||
                  e.keyCode === g ||
                  e.keyCode === m ||
                  e.keyCode === h
                ) {
                  var B = void 0;
                  e.keyCode === f && e.shiftKey
                    ? (B = ["(", ")"])
                    : e.keyCode === g
                    ? (B = e.shiftKey ? ["{", "}"] : ["[", "]"])
                    : e.keyCode === m
                    ? (B = e.shiftKey ? ['"', '"'] : ["'", "'"])
                    : e.keyCode !== h || e.shiftKey || (B = ["`", "`"]),
                    v !== E &&
                      B &&
                      (e.preventDefault(),
                      a._applyEdits({
                        value:
                          b.substring(0, v) +
                          B[0] +
                          b.substring(v, E) +
                          B[1] +
                          b.substring(E),
                        selectionStart: v,
                        selectionEnd: E + 2
                      }));
                } else
                  (_
                    ? e.metaKey && e.keyCode === d
                    : e.ctrlKey && e.keyCode === d) &&
                  !e.shiftKey &&
                  !e.altKey
                    ? (e.preventDefault(), a._undoEdit())
                    : (_
                        ? e.metaKey && e.keyCode === d && e.shiftKey
                        : y
                        ? e.ctrlKey && e.keyCode === c
                        : e.ctrlKey && e.keyCode === d && e.shiftKey) &&
                      !e.altKey
                    ? (e.preventDefault(), a._redoEdit())
                    : e.keyCode !== p ||
                      !e.ctrlKey ||
                      (_ && !e.shiftKey) ||
                      (e.preventDefault(),
                      a.setState(function(e) {
                        return { capture: !e.capture };
                      }));
              }),
              (a._handleChange = function(e) {
                var t = e.target,
                  n = t.value,
                  r = t.selectionStart,
                  o = t.selectionEnd;
                a._recordChange(
                  { value: n, selectionStart: r, selectionEnd: o },
                  !0
                ),
                  a.props.onValueChange(n);
              }),
              (a._history = { stack: [], offset: -1 }),
              i(a, n)
            );
          }
          return (
            (function(e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function, not " +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, o.Component),
            a(t, [
              {
                key: "componentDidMount",
                value: function() {
                  /Trident/.test(navigator.userAgent) &&
                    this.setState({ ie: !0 }),
                    this._recordCurrentState();
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.value,
                    a = t.style,
                    i = t.padding,
                    s = t.highlight,
                    l = t.autoFocus,
                    u = t.disabled,
                    c = t.form,
                    d = t.maxLength,
                    p = t.minLength,
                    f = t.name,
                    g = t.placeholder,
                    m = t.readOnly,
                    h = t.required,
                    b = t.onFocus,
                    v = t.onBlur,
                    y = (t.onValueChange,
                    t.tabSize,
                    t.insertSpaces,
                    t.ignoreTabKey,
                    (function(e, t) {
                      var n = {};
                      for (var r in e)
                        t.indexOf(r) >= 0 ||
                          (Object.prototype.hasOwnProperty.call(e, r) &&
                            (n[r] = e[r]));
                      return n;
                    })(t, [
                      "value",
                      "style",
                      "padding",
                      "highlight",
                      "autoFocus",
                      "disabled",
                      "form",
                      "maxLength",
                      "minLength",
                      "name",
                      "placeholder",
                      "readOnly",
                      "required",
                      "onFocus",
                      "onBlur",
                      "onValueChange",
                      "tabSize",
                      "insertSpaces",
                      "ignoreTabKey"
                    ])),
                    _ = {
                      paddingTop: i,
                      paddingRight: i,
                      paddingBottom: i,
                      paddingLeft: i
                    },
                    w = s(n);
                  return o.createElement(
                    "div",
                    r({}, y, { style: r({}, O.container, a) }),
                    o.createElement("textarea", {
                      ref: function(t) {
                        return (e._input = t);
                      },
                      style: r({}, O.editor, O.textarea, _),
                      className: E + " " + (this.state.ie ? E + "-ie" : ""),
                      value: n,
                      onChange: this._handleChange,
                      onKeyDown: this._handleKeyDown,
                      onFocus: b,
                      onBlur: v,
                      disabled: u,
                      form: c,
                      maxLength: d,
                      minLength: p,
                      name: f,
                      placeholder: g,
                      readOnly: m,
                      required: h,
                      autoFocus: l,
                      autoCapitalize: "off",
                      autoComplete: "off",
                      autoCorrect: "off",
                      spellCheck: !1,
                      "data-gramm": !1
                    }),
                    o.createElement(
                      "pre",
                      r(
                        {
                          "aria-hidden": "true",
                          style: r({}, O.editor, O.highlight, _)
                        },
                        "string" == typeof w
                          ? {
                              dangerouslySetInnerHTML: { __html: w + "<br />" }
                            }
                          : { children: w }
                      )
                    ),
                    o.createElement(
                      "style",
                      { type: "text/css" },
                      "\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.npm__react-simple-code-editor__textarea:empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * IE doesn't support '-webkit-text-fill-color'\n * So we use 'color: transparent' to make the text transparent on IE\n * Unlike other browsers, it doesn't affect caret color in IE\n */\n.npm__react-simple-code-editor__textarea-ie {\n  color: transparent !important;\n}\n\n.npm__react-simple-code-editor__textarea-ie::selection {\n  background-color: #accef7 !important;\n  color: transparent !important;\n}\n"
                    )
                  );
                }
              },
              {
                key: "session",
                get: function() {
                  return { history: this._history };
                },
                set: function(e) {
                  this._history = e.history;
                }
              }
            ]),
            t
          );
        })();
      (w.defaultProps = {
        tabSize: 2,
        insertSpaces: !0,
        ignoreTabKey: !1,
        padding: 0
      }),
        (t.default = w);
      var O = {
        container: {
          position: "relative",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
          boxSizing: "border-box",
          padding: 0
        },
        textarea: {
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          margin: 0,
          border: 0,
          resize: "none",
          background: "none",
          overflow: "hidden",
          color: "inherit",
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          WebkitTextFillColor: "transparent"
        },
        highlight: {
          position: "relative",
          margin: 0,
          border: 0,
          pointerEvents: "none"
        },
        editor: {
          boxSizing: "inherit",
          display: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontStyle: "inherit",
          fontVariantLigatures: "inherit",
          fontWeight: "inherit",
          letterSpacing: "inherit",
          lineHeight: "inherit",
          tabSize: "inherit",
          textIndent: "inherit",
          textRendering: "inherit",
          textTransform: "inherit",
          whiteSpace: "inherit",
          wordBreak: "inherit"
        }
      };
    }.call(this, n(120)));
  },
  function(e, t) {
    e.exports = {
      plain: { backgroundColor: "#2a2734", color: "#9a86fd" },
      styles: [
        {
          types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
          style: { color: "#6c6783" }
        },
        { types: ["namespace"], style: { opacity: 0.7 } },
        { types: ["tag", "operator", "number"], style: { color: "#e09142" } },
        { types: ["property", "function"], style: { color: "#9a86fd" } },
        {
          types: ["tag-id", "selector", "atrule-id"],
          style: { color: "#eeebff" }
        },
        { types: ["attr-name"], style: { color: "#c4b9fe" } },
        {
          types: [
            "boolean",
            "string",
            "entity",
            "url",
            "attr-value",
            "keyword",
            "control",
            "directive",
            "unit",
            "statement",
            "regex",
            "at-rule",
            "placeholder",
            "variable"
          ],
          style: { color: "#ffcc99" }
        },
        { types: ["deleted"], style: { textDecorationLine: "line-through" } },
        { types: ["inserted"], style: { textDecorationLine: "underline" } },
        { types: ["italic"], style: { fontStyle: "italic" } },
        { types: ["important", "bold"], style: { fontWeight: "bold" } },
        { types: ["important"], style: { color: "#c4b9fe" } }
      ]
    };
  },
  function(e, t, n) {
    var r;
    /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
    /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
    !(function() {
      "use strict";
      var n = {}.hasOwnProperty;
      function a() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var r = arguments[t];
          if (r) {
            var o = typeof r;
            if ("string" === o || "number" === o) e.push(r);
            else if (Array.isArray(r) && r.length) {
              var i = a.apply(null, r);
              i && e.push(i);
            } else if ("object" === o)
              for (var s in r) n.call(r, s) && r[s] && e.push(s);
          }
        }
        return e.join(" ");
      }
      e.exports
        ? ((a.default = a), (e.exports = a))
        : void 0 ===
            (r = function() {
              return a;
            }.apply(t, [])) || (e.exports = r);
    })();
  },
  function(e, t, n) {
    "use strict";
    var r = n(98),
      a = n(101),
      o = n(45),
      i = n(46);
    (e.exports = n(104)(
      Array,
      "Array",
      function(e, t) {
        (this._t = i(e)), (this._i = 0), (this._k = t);
      },
      function() {
        var e = this._t,
          t = this._k,
          n = this._i++;
        return !e || n >= e.length
          ? ((this._t = void 0), a(1))
          : a(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
      },
      "values"
    )),
      (o.Arguments = o.Array),
      r("keys"),
      r("values"),
      r("entries");
  },
  function(e, t, n) {
    var r = n(25)("unscopables"),
      a = Array.prototype;
    null == a[r] && n(20)(a, r, {}),
      (e.exports = function(e) {
        a[r][e] = !0;
      });
  },
  function(e, t, n) {
    e.exports =
      !n(29) &&
      !n(68)(function() {
        return (
          7 !=
          Object.defineProperty(n(69)("div"), "a", {
            get: function() {
              return 7;
            }
          }).a
        );
      });
  },
  function(e, t, n) {
    var r = n(44);
    e.exports = function(e, t) {
      if (!r(e)) return e;
      var n, a;
      if (t && "function" == typeof (n = e.toString) && !r((a = n.call(e))))
        return a;
      if ("function" == typeof (n = e.valueOf) && !r((a = n.call(e)))) return a;
      if (!t && "function" == typeof (n = e.toString) && !r((a = n.call(e))))
        return a;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function(e, t) {
    e.exports = function(e, t) {
      return { value: t, done: !!e };
    };
  },
  function(e, t, n) {
    var r = n(103);
    e.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function(e) {
          return "String" == r(e) ? e.split("") : Object(e);
        };
  },
  function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
      return n.call(e).slice(8, -1);
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(67),
      a = n(105),
      o = n(47),
      i = n(20),
      s = n(45),
      l = n(108),
      u = n(75),
      c = n(116),
      d = n(25)("iterator"),
      p = !([].keys && "next" in [].keys()),
      f = function() {
        return this;
      };
    e.exports = function(e, t, n, g, m, h, b) {
      l(n, t, g);
      var v,
        y,
        _,
        E = function(e) {
          if (!p && e in x) return x[e];
          switch (e) {
            case "keys":
            case "values":
              return function() {
                return new n(this, e);
              };
          }
          return function() {
            return new n(this, e);
          };
        },
        w = t + " Iterator",
        O = "values" == m,
        k = !1,
        x = e.prototype,
        T = x[d] || x["@@iterator"] || (m && x[m]),
        S = T || E(m),
        A = m ? (O ? E("entries") : S) : void 0,
        N = ("Array" == t && x.entries) || T;
      if (
        (N &&
          (_ = c(N.call(new e()))) !== Object.prototype &&
          _.next &&
          (u(_, w, !0), r || "function" == typeof _[d] || i(_, d, f)),
        O &&
          T &&
          "values" !== T.name &&
          ((k = !0),
          (S = function() {
            return T.call(this);
          })),
        (r && !b) || (!p && !k && x[d]) || i(x, d, S),
        (s[t] = S),
        (s[w] = f),
        m)
      )
        if (
          ((v = {
            values: O ? S : E("values"),
            keys: h ? S : E("keys"),
            entries: A
          }),
          b)
        )
          for (y in v) y in x || o(x, y, v[y]);
        else a(a.P + a.F * (p || k), t, v);
      return v;
    };
  },
  function(e, t, n) {
    var r = n(11),
      a = n(40),
      o = n(20),
      i = n(47),
      s = n(106),
      l = function(e, t, n) {
        var u,
          c,
          d,
          p,
          f = e & l.F,
          g = e & l.G,
          m = e & l.S,
          h = e & l.P,
          b = e & l.B,
          v = g ? r : m ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
          y = g ? a : a[t] || (a[t] = {}),
          _ = y.prototype || (y.prototype = {});
        for (u in (g && (n = t), n))
          (d = ((c = !f && v && void 0 !== v[u]) ? v : n)[u]),
            (p =
              b && c
                ? s(d, r)
                : h && "function" == typeof d
                ? s(Function.call, d)
                : d),
            v && i(v, u, d, e & l.U),
            y[u] != d && o(y, u, p),
            h && _[u] != d && (_[u] = d);
      };
    (r.core = a),
      (l.F = 1),
      (l.G = 2),
      (l.S = 4),
      (l.P = 8),
      (l.B = 16),
      (l.W = 32),
      (l.U = 64),
      (l.R = 128),
      (e.exports = l);
  },
  function(e, t, n) {
    var r = n(107);
    e.exports = function(e, t, n) {
      if ((r(e), void 0 === t)) return e;
      switch (n) {
        case 1:
          return function(n) {
            return e.call(t, n);
          };
        case 2:
          return function(n, r) {
            return e.call(t, n, r);
          };
        case 3:
          return function(n, r, a) {
            return e.call(t, n, r, a);
          };
      }
      return function() {
        return e.apply(t, arguments);
      };
    };
  },
  function(e, t) {
    e.exports = function(e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(109),
      a = n(70),
      o = n(75),
      i = {};
    n(20)(i, n(25)("iterator"), function() {
      return this;
    }),
      (e.exports = function(e, t, n) {
        (e.prototype = r(i, { next: a(1, n) })), o(e, t + " Iterator");
      });
  },
  function(e, t, n) {
    var r = n(43),
      a = n(110),
      o = n(74),
      i = n(48)("IE_PROTO"),
      s = function() {},
      l = function() {
        var e,
          t = n(69)("iframe"),
          r = o.length;
        for (
          t.style.display = "none",
            n(115).appendChild(t),
            t.src = "javascript:",
            (e = t.contentWindow.document).open(),
            e.write("<script>document.F=Object</script>"),
            e.close(),
            l = e.F;
          r--;

        )
          delete l.prototype[o[r]];
        return l();
      };
    e.exports =
      Object.create ||
      function(e, t) {
        var n;
        return (
          null !== e
            ? ((s.prototype = r(e)),
              (n = new s()),
              (s.prototype = null),
              (n[i] = e))
            : (n = l()),
          void 0 === t ? n : a(n, t)
        );
      };
  },
  function(e, t, n) {
    var r = n(42),
      a = n(43),
      o = n(72);
    e.exports = n(29)
      ? Object.defineProperties
      : function(e, t) {
          a(e);
          for (var n, i = o(t), s = i.length, l = 0; s > l; )
            r.f(e, (n = i[l++]), t[n]);
          return e;
        };
  },
  function(e, t, n) {
    var r = n(30),
      a = n(46),
      o = n(112)(!1),
      i = n(48)("IE_PROTO");
    e.exports = function(e, t) {
      var n,
        s = a(e),
        l = 0,
        u = [];
      for (n in s) n != i && r(s, n) && u.push(n);
      for (; t.length > l; ) r(s, (n = t[l++])) && (~o(u, n) || u.push(n));
      return u;
    };
  },
  function(e, t, n) {
    var r = n(46),
      a = n(113),
      o = n(114);
    e.exports = function(e) {
      return function(t, n, i) {
        var s,
          l = r(t),
          u = a(l.length),
          c = o(i, u);
        if (e && n != n) {
          for (; u > c; ) if ((s = l[c++]) != s) return !0;
        } else
          for (; u > c; c++)
            if ((e || c in l) && l[c] === n) return e || c || 0;
        return !e && -1;
      };
    };
  },
  function(e, t, n) {
    var r = n(73),
      a = Math.min;
    e.exports = function(e) {
      return e > 0 ? a(r(e), 9007199254740991) : 0;
    };
  },
  function(e, t, n) {
    var r = n(73),
      a = Math.max,
      o = Math.min;
    e.exports = function(e, t) {
      return (e = r(e)) < 0 ? a(e + t, 0) : o(e, t);
    };
  },
  function(e, t, n) {
    var r = n(11).document;
    e.exports = r && r.documentElement;
  },
  function(e, t, n) {
    var r = n(30),
      a = n(117),
      o = n(48)("IE_PROTO"),
      i = Object.prototype;
    e.exports =
      Object.getPrototypeOf ||
      function(e) {
        return (
          (e = a(e)),
          r(e, o)
            ? e[o]
            : "function" == typeof e.constructor && e instanceof e.constructor
            ? e.constructor.prototype
            : e instanceof Object
            ? i
            : null
        );
      };
  },
  function(e, t, n) {
    var r = n(71);
    e.exports = function(e) {
      return Object(r(e));
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(119);
    function a() {}
    e.exports = function() {
      function e(e, t, n, a, o, i) {
        if (i !== r) {
          var s = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
          );
          throw ((s.name = "Invariant Violation"), s);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t
      };
      return (n.checkPropTypes = a), (n.PropTypes = n), n;
    };
  },
  function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  },
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t, n) {
    e.exports = { default: n(122), __esModule: !0 };
  },
  function(e, t, n) {
    n(123), (e.exports = n(4).Object.assign);
  },
  function(e, t, n) {
    var r = n(12);
    r(r.S + r.F, "Object", { assign: n(125) });
  },
  function(e, t) {
    e.exports = function(e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(31),
      a = n(57),
      o = n(34),
      i = n(58),
      s = n(79),
      l = Object.assign;
    e.exports =
      !l ||
      n(26)(function() {
        var e = {},
          t = {},
          n = Symbol(),
          r = "abcdefghijklmnopqrst";
        return (
          (e[n] = 7),
          r.split("").forEach(function(e) {
            t[e] = e;
          }),
          7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != r
        );
      })
        ? function(e, t) {
            for (
              var n = i(e), l = arguments.length, u = 1, c = a.f, d = o.f;
              l > u;

            )
              for (
                var p,
                  f = s(arguments[u++]),
                  g = c ? r(f).concat(c(f)) : r(f),
                  m = g.length,
                  h = 0;
                m > h;

              )
                d.call(f, (p = g[h++])) && (n[p] = f[p]);
            return n;
          }
        : l;
  },
  function(e, t, n) {
    var r = n(23),
      a = n(80),
      o = n(127);
    e.exports = function(e) {
      return function(t, n, i) {
        var s,
          l = r(t),
          u = a(l.length),
          c = o(i, u);
        if (e && n != n) {
          for (; u > c; ) if ((s = l[c++]) != s) return !0;
        } else
          for (; u > c; c++)
            if ((e || c in l) && l[c] === n) return e || c || 0;
        return !e && -1;
      };
    };
  },
  function(e, t, n) {
    var r = n(53),
      a = Math.max,
      o = Math.min;
    e.exports = function(e, t) {
      return (e = r(e)) < 0 ? a(e + t, 0) : o(e, t);
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = {
      BASE_FONT_FAMILY: "Menlo, monospace",
      BASE_FONT_SIZE: "11px",
      BASE_LINE_HEIGHT: "14px",
      BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
      BASE_COLOR: "rgb(213, 213, 213)",
      OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
      OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
      OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
      OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
      OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
      OBJECT_VALUE_FUNCTION_KEYWORD_COLOR: "rgb(242, 85, 217)",
      HTML_TAG_COLOR: "rgb(93, 176, 215)",
      HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
      HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
      HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
      HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
      HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
      HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
      ARROW_COLOR: "rgb(145, 145, 145)",
      ARROW_MARGIN_RIGHT: 3,
      ARROW_FONT_SIZE: 12,
      TREENODE_FONT_FAMILY: "Menlo, monospace",
      TREENODE_FONT_SIZE: "11px",
      TREENODE_LINE_HEIGHT: "14px",
      TREENODE_PADDING_LEFT: 12,
      TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
      TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
      TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
      TABLE_SORT_ICON_COLOR: "black",
      TABLE_DATA_BACKGROUND_IMAGE:
        "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
      TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = {
      BASE_FONT_FAMILY: "Menlo, monospace",
      BASE_FONT_SIZE: "11px",
      BASE_LINE_HEIGHT: "14px",
      BASE_BACKGROUND_COLOR: "white",
      BASE_COLOR: "black",
      OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
      OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
      OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
      OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
      OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
      OBJECT_VALUE_FUNCTION_KEYWORD_COLOR: "rgb(170, 13, 145)",
      HTML_TAG_COLOR: "rgb(168, 148, 166)",
      HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
      HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
      HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
      HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
      HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
      HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
      ARROW_COLOR: "#6e6e6e",
      ARROW_MARGIN_RIGHT: 3,
      ARROW_FONT_SIZE: 12,
      TREENODE_FONT_FAMILY: "Menlo, monospace",
      TREENODE_FONT_SIZE: "11px",
      TREENODE_LINE_HEIGHT: "14px",
      TREENODE_PADDING_LEFT: 12,
      TABLE_BORDER_COLOR: "#aaa",
      TABLE_TH_BACKGROUND_COLOR: "#eee",
      TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
      TABLE_SORT_ICON_COLOR: "#6e6e6e",
      TABLE_DATA_BACKGROUND_IMAGE:
        "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
      TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = y(n(6)),
      a = y(n(35)),
      o = y(n(16)),
      i = y(n(17)),
      s = y(n(18)),
      l = y(n(19)),
      u = y(n(87)),
      c = y(n(162)),
      d = y(n(7)),
      p = n(1),
      f = y(p),
      g = y(n(2)),
      m = y(n(90)),
      h = y(n(91)),
      b = y(n(92)),
      v = y(n(64));
    function y(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var _ = function(e) {
        var t = e.depth,
          n = e.name,
          r = e.data,
          a = e.isNonenumerable;
        return 0 === t
          ? f.default.createElement(h.default, { name: n, data: r })
          : f.default.createElement(b.default, {
              name: n,
              data: r,
              isNonenumerable: a
            });
      },
      E = (function(e) {
        function t() {
          return (
            (0, o.default)(this, t),
            (0, s.default)(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (0, l.default)(t, e),
          (0, i.default)(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.showNonenumerable,
                  n = e.sortObjectKeys,
                  o = e.nodeRenderer,
                  i = (0, a.default)(e, [
                    "showNonenumerable",
                    "sortObjectKeys",
                    "nodeRenderer"
                  ]),
                  s = (function(e, t) {
                    return u.default.mark(function n(r) {
                      var a,
                        o,
                        i,
                        s,
                        l,
                        p,
                        f,
                        g,
                        m,
                        h,
                        b,
                        v,
                        y,
                        _,
                        E,
                        w,
                        O,
                        k,
                        x,
                        T;
                      return u.default.wrap(
                        function(n) {
                          for (;;)
                            switch ((n.prev = n.next)) {
                              case 0:
                                if (
                                  ("object" ===
                                    (void 0 === r
                                      ? "undefined"
                                      : (0, d.default)(r)) &&
                                    null !== r) ||
                                  "function" == typeof r
                                ) {
                                  n.next = 3;
                                  break;
                                }
                                return n.abrupt("return");
                              case 3:
                                if (
                                  (a = Array.isArray(r)) ||
                                  !r[Symbol.iterator]
                                ) {
                                  n.next = 41;
                                  break;
                                }
                                (o = 0),
                                  (i = !0),
                                  (s = !1),
                                  (l = void 0),
                                  (n.prev = 9),
                                  (p = r[Symbol.iterator]());
                              case 11:
                                if ((i = (f = p.next()).done)) {
                                  n.next = 25;
                                  break;
                                }
                                if (
                                  ((g = f.value),
                                  !Array.isArray(g) || 2 !== g.length)
                                ) {
                                  n.next = 19;
                                  break;
                                }
                                return (
                                  (m = (0, c.default)(g, 2)),
                                  (h = m[0]),
                                  (b = m[1]),
                                  (n.next = 17),
                                  { name: h, data: b }
                                );
                              case 17:
                                n.next = 21;
                                break;
                              case 19:
                                return (
                                  (n.next = 21), { name: o.toString(), data: g }
                                );
                              case 21:
                                o++;
                              case 22:
                                (i = !0), (n.next = 11);
                                break;
                              case 25:
                                n.next = 31;
                                break;
                              case 27:
                                (n.prev = 27),
                                  (n.t0 = n.catch(9)),
                                  (s = !0),
                                  (l = n.t0);
                              case 31:
                                (n.prev = 31),
                                  (n.prev = 32),
                                  !i && p.return && p.return();
                              case 34:
                                if (((n.prev = 34), !s)) {
                                  n.next = 37;
                                  break;
                                }
                                throw l;
                              case 37:
                                return n.finish(34);
                              case 38:
                                return n.finish(31);
                              case 39:
                                n.next = 82;
                                break;
                              case 41:
                                (v = Object.getOwnPropertyNames(r)),
                                  !0 !== t || a
                                    ? "function" == typeof t && v.sort(t)
                                    : v.sort(),
                                  (y = !0),
                                  (_ = !1),
                                  (E = void 0),
                                  (n.prev = 46),
                                  (w = v[Symbol.iterator]());
                              case 48:
                                if ((y = (O = w.next()).done)) {
                                  n.next = 65;
                                  break;
                                }
                                if (
                                  ((k = O.value), !r.propertyIsEnumerable(k))
                                ) {
                                  n.next = 56;
                                  break;
                                }
                                return (
                                  (x = r[k]),
                                  (n.next = 54),
                                  { name: k || '""', data: x }
                                );
                              case 54:
                                n.next = 62;
                                break;
                              case 56:
                                if (!e) {
                                  n.next = 62;
                                  break;
                                }
                                T = void 0;
                                try {
                                  T = r[k];
                                } catch (e) {}
                                if (void 0 === T) {
                                  n.next = 62;
                                  break;
                                }
                                return (
                                  (n.next = 62),
                                  { name: k, data: T, isNonenumerable: !0 }
                                );
                              case 62:
                                (y = !0), (n.next = 48);
                                break;
                              case 65:
                                n.next = 71;
                                break;
                              case 67:
                                (n.prev = 67),
                                  (n.t1 = n.catch(46)),
                                  (_ = !0),
                                  (E = n.t1);
                              case 71:
                                (n.prev = 71),
                                  (n.prev = 72),
                                  !y && w.return && w.return();
                              case 74:
                                if (((n.prev = 74), !_)) {
                                  n.next = 77;
                                  break;
                                }
                                throw E;
                              case 77:
                                return n.finish(74);
                              case 78:
                                return n.finish(71);
                              case 79:
                                if (!e || r === Object.prototype) {
                                  n.next = 82;
                                  break;
                                }
                                return (
                                  (n.next = 82),
                                  {
                                    name: "__proto__",
                                    data: Object.getPrototypeOf(r),
                                    isNonenumerable: !0
                                  }
                                );
                              case 82:
                              case "end":
                                return n.stop();
                            }
                        },
                        n,
                        this,
                        [
                          [9, 27, 31, 39],
                          [32, , 34, 38],
                          [46, 67, 71, 79],
                          [72, , 74, 78]
                        ]
                      );
                    });
                  })(t, n),
                  l = o || _;
                return f.default.createElement(
                  v.default,
                  { theme: this.props.theme },
                  f.default.createElement(
                    m.default,
                    (0, r.default)({ nodeRenderer: l, dataIterator: s }, i)
                  )
                );
              }
            }
          ]),
          t
        );
      })(p.Component);
    (E.defaultProps = { showNonenumerable: !1, theme: "chromeLight" }),
      (E.propTypes = {
        expandLevel: g.default.number,
        expandPaths: g.default.oneOfType([g.default.string, g.default.array]),
        name: g.default.string,
        data: g.default.any,
        theme: g.default.oneOfType([g.default.string, g.default.object]),
        showNonenumerable: g.default.bool,
        sortObjectKeys: g.default.oneOfType([g.default.bool, g.default.func]),
        nodeRenderer: g.default.func
      }),
      (t.default = E);
  },
  function(e, t, n) {
    n(132);
    var r = n(4).Object;
    e.exports = function(e, t, n) {
      return r.defineProperty(e, t, n);
    };
  },
  function(e, t, n) {
    var r = n(12);
    r(r.S + r.F * !n(14), "Object", { defineProperty: n(9).f });
  },
  function(e, t, n) {
    e.exports = { default: n(134), __esModule: !0 };
  },
  function(e, t, n) {
    n(36), n(61), (e.exports = n(62).f("iterator"));
  },
  function(e, t, n) {
    var r = n(53),
      a = n(52);
    e.exports = function(e) {
      return function(t, n) {
        var o,
          i,
          s = String(a(t)),
          l = r(n),
          u = s.length;
        return l < 0 || l >= u
          ? e
            ? ""
            : void 0
          : (o = s.charCodeAt(l)) < 55296 ||
            o > 56319 ||
            l + 1 === u ||
            (i = s.charCodeAt(l + 1)) < 56320 ||
            i > 57343
          ? e
            ? s.charAt(l)
            : o
          : e
          ? s.slice(l, l + 2)
          : i - 56320 + ((o - 55296) << 10) + 65536;
      };
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(59),
      a = n(27),
      o = n(60),
      i = {};
    n(21)(i, n(5)("iterator"), function() {
      return this;
    }),
      (e.exports = function(e, t, n) {
        (e.prototype = r(i, { next: a(1, n) })), o(e, t + " Iterator");
      });
  },
  function(e, t, n) {
    var r = n(9),
      a = n(13),
      o = n(31);
    e.exports = n(14)
      ? Object.defineProperties
      : function(e, t) {
          a(e);
          for (var n, i = o(t), s = i.length, l = 0; s > l; )
            r.f(e, (n = i[l++]), t[n]);
          return e;
        };
  },
  function(e, t, n) {
    var r = n(8).document;
    e.exports = r && r.documentElement;
  },
  function(e, t, n) {
    var r = n(15),
      a = n(58),
      o = n(54)("IE_PROTO"),
      i = Object.prototype;
    e.exports =
      Object.getPrototypeOf ||
      function(e) {
        return (
          (e = a(e)),
          r(e, o)
            ? e[o]
            : "function" == typeof e.constructor && e instanceof e.constructor
            ? e.constructor.prototype
            : e instanceof Object
            ? i
            : null
        );
      };
  },
  function(e, t, n) {
    "use strict";
    var r = n(141),
      a = n(142),
      o = n(24),
      i = n(23);
    (e.exports = n(83)(
      Array,
      "Array",
      function(e, t) {
        (this._t = i(e)), (this._i = 0), (this._k = t);
      },
      function() {
        var e = this._t,
          t = this._k,
          n = this._i++;
        return !e || n >= e.length
          ? ((this._t = void 0), a(1))
          : a(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
      },
      "values"
    )),
      (o.Arguments = o.Array),
      r("keys"),
      r("values"),
      r("entries");
  },
  function(e, t) {
    e.exports = function() {};
  },
  function(e, t) {
    e.exports = function(e, t) {
      return { value: t, done: !!e };
    };
  },
  function(e, t, n) {
    e.exports = { default: n(144), __esModule: !0 };
  },
  function(e, t, n) {
    n(145), n(150), n(151), n(152), (e.exports = n(4).Symbol);
  },
  function(e, t, n) {
    "use strict";
    var r = n(8),
      a = n(15),
      o = n(14),
      i = n(12),
      s = n(84),
      l = n(146).KEY,
      u = n(26),
      c = n(55),
      d = n(60),
      p = n(33),
      f = n(5),
      g = n(62),
      m = n(63),
      h = n(147),
      b = n(148),
      v = n(13),
      y = n(22),
      _ = n(23),
      E = n(50),
      w = n(27),
      O = n(59),
      k = n(149),
      x = n(86),
      T = n(9),
      S = n(31),
      A = x.f,
      N = T.f,
      C = k.f,
      L = r.Symbol,
      R = r.JSON,
      I = R && R.stringify,
      j = f("_hidden"),
      P = f("toPrimitive"),
      M = {}.propertyIsEnumerable,
      D = c("symbol-registry"),
      B = c("symbols"),
      F = c("op-symbols"),
      U = Object.prototype,
      G = "function" == typeof L,
      H = r.QObject,
      z = !H || !H.prototype || !H.prototype.findChild,
      $ =
        o &&
        u(function() {
          return (
            7 !=
            O(
              N({}, "a", {
                get: function() {
                  return N(this, "a", { value: 7 }).a;
                }
              })
            ).a
          );
        })
          ? function(e, t, n) {
              var r = A(U, t);
              r && delete U[t], N(e, t, n), r && e !== U && N(U, t, r);
            }
          : N,
      V = function(e) {
        var t = (B[e] = O(L.prototype));
        return (t._k = e), t;
      },
      q =
        G && "symbol" == typeof L.iterator
          ? function(e) {
              return "symbol" == typeof e;
            }
          : function(e) {
              return e instanceof L;
            },
      K = function(e, t, n) {
        return (
          e === U && K(F, t, n),
          v(e),
          (t = E(t, !0)),
          v(n),
          a(B, t)
            ? (n.enumerable
                ? (a(e, j) && e[j][t] && (e[j][t] = !1),
                  (n = O(n, { enumerable: w(0, !1) })))
                : (a(e, j) || N(e, j, w(1, {})), (e[j][t] = !0)),
              $(e, t, n))
            : N(e, t, n)
        );
      },
      W = function(e, t) {
        v(e);
        for (var n, r = h((t = _(t))), a = 0, o = r.length; o > a; )
          K(e, (n = r[a++]), t[n]);
        return e;
      },
      Z = function(e) {
        var t = M.call(this, (e = E(e, !0)));
        return (
          !(this === U && a(B, e) && !a(F, e)) &&
          (!(t || !a(this, e) || !a(B, e) || (a(this, j) && this[j][e])) || t)
        );
      },
      Y = function(e, t) {
        if (((e = _(e)), (t = E(t, !0)), e !== U || !a(B, t) || a(F, t))) {
          var n = A(e, t);
          return (
            !n || !a(B, t) || (a(e, j) && e[j][t]) || (n.enumerable = !0), n
          );
        }
      },
      X = function(e) {
        for (var t, n = C(_(e)), r = [], o = 0; n.length > o; )
          a(B, (t = n[o++])) || t == j || t == l || r.push(t);
        return r;
      },
      J = function(e) {
        for (
          var t, n = e === U, r = C(n ? F : _(e)), o = [], i = 0;
          r.length > i;

        )
          !a(B, (t = r[i++])) || (n && !a(U, t)) || o.push(B[t]);
        return o;
      };
    G ||
      (s(
        (L = function() {
          if (this instanceof L)
            throw TypeError("Symbol is not a constructor!");
          var e = p(arguments.length > 0 ? arguments[0] : void 0),
            t = function(n) {
              this === U && t.call(F, n),
                a(this, j) && a(this[j], e) && (this[j][e] = !1),
                $(this, e, w(1, n));
            };
          return o && z && $(U, e, { configurable: !0, set: t }), V(e);
        }).prototype,
        "toString",
        function() {
          return this._k;
        }
      ),
      (x.f = Y),
      (T.f = K),
      (n(85).f = k.f = X),
      (n(34).f = Z),
      (n(57).f = J),
      o && !n(32) && s(U, "propertyIsEnumerable", Z, !0),
      (g.f = function(e) {
        return V(f(e));
      })),
      i(i.G + i.W + i.F * !G, { Symbol: L });
    for (
      var Q = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
          ","
        ),
        ee = 0;
      Q.length > ee;

    )
      f(Q[ee++]);
    for (var te = S(f.store), ne = 0; te.length > ne; ) m(te[ne++]);
    i(i.S + i.F * !G, "Symbol", {
      for: function(e) {
        return a(D, (e += "")) ? D[e] : (D[e] = L(e));
      },
      keyFor: function(e) {
        if (!q(e)) throw TypeError(e + " is not a symbol!");
        for (var t in D) if (D[t] === e) return t;
      },
      useSetter: function() {
        z = !0;
      },
      useSimple: function() {
        z = !1;
      }
    }),
      i(i.S + i.F * !G, "Object", {
        create: function(e, t) {
          return void 0 === t ? O(e) : W(O(e), t);
        },
        defineProperty: K,
        defineProperties: W,
        getOwnPropertyDescriptor: Y,
        getOwnPropertyNames: X,
        getOwnPropertySymbols: J
      }),
      R &&
        i(
          i.S +
            i.F *
              (!G ||
                u(function() {
                  var e = L();
                  return (
                    "[null]" != I([e]) ||
                    "{}" != I({ a: e }) ||
                    "{}" != I(Object(e))
                  );
                })),
          "JSON",
          {
            stringify: function(e) {
              for (var t, n, r = [e], a = 1; arguments.length > a; )
                r.push(arguments[a++]);
              if (((n = t = r[1]), (y(t) || void 0 !== e) && !q(e)))
                return (
                  b(t) ||
                    (t = function(e, t) {
                      if (
                        ("function" == typeof n && (t = n.call(this, e, t)),
                        !q(t))
                      )
                        return t;
                    }),
                  (r[1] = t),
                  I.apply(R, r)
                );
            }
          }
        ),
      L.prototype[P] || n(21)(L.prototype, P, L.prototype.valueOf),
      d(L, "Symbol"),
      d(Math, "Math", !0),
      d(r.JSON, "JSON", !0);
  },
  function(e, t, n) {
    var r = n(33)("meta"),
      a = n(22),
      o = n(15),
      i = n(9).f,
      s = 0,
      l =
        Object.isExtensible ||
        function() {
          return !0;
        },
      u = !n(26)(function() {
        return l(Object.preventExtensions({}));
      }),
      c = function(e) {
        i(e, r, { value: { i: "O" + ++s, w: {} } });
      },
      d = (e.exports = {
        KEY: r,
        NEED: !1,
        fastKey: function(e, t) {
          if (!a(e))
            return "symbol" == typeof e
              ? e
              : ("string" == typeof e ? "S" : "P") + e;
          if (!o(e, r)) {
            if (!l(e)) return "F";
            if (!t) return "E";
            c(e);
          }
          return e[r].i;
        },
        getWeak: function(e, t) {
          if (!o(e, r)) {
            if (!l(e)) return !0;
            if (!t) return !1;
            c(e);
          }
          return e[r].w;
        },
        onFreeze: function(e) {
          return u && d.NEED && l(e) && !o(e, r) && c(e), e;
        }
      });
  },
  function(e, t, n) {
    var r = n(31),
      a = n(57),
      o = n(34);
    e.exports = function(e) {
      var t = r(e),
        n = a.f;
      if (n)
        for (var i, s = n(e), l = o.f, u = 0; s.length > u; )
          l.call(e, (i = s[u++])) && t.push(i);
      return t;
    };
  },
  function(e, t, n) {
    var r = n(51);
    e.exports =
      Array.isArray ||
      function(e) {
        return "Array" == r(e);
      };
  },
  function(e, t, n) {
    var r = n(23),
      a = n(85).f,
      o = {}.toString,
      i =
        "object" == typeof window && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window)
          : [];
    e.exports.f = function(e) {
      return i && "[object Window]" == o.call(e)
        ? (function(e) {
            try {
              return a(e);
            } catch (e) {
              return i.slice();
            }
          })(e)
        : a(r(e));
    };
  },
  function(e, t) {},
  function(e, t, n) {
    n(63)("asyncIterator");
  },
  function(e, t, n) {
    n(63)("observable");
  },
  function(e, t, n) {
    e.exports = { default: n(154), __esModule: !0 };
  },
  function(e, t, n) {
    n(155), (e.exports = n(4).Object.setPrototypeOf);
  },
  function(e, t, n) {
    var r = n(12);
    r(r.S, "Object", { setPrototypeOf: n(156).set });
  },
  function(e, t, n) {
    var r = n(22),
      a = n(13),
      o = function(e, t) {
        if ((a(e), !r(t) && null !== t))
          throw TypeError(t + ": can't set as prototype!");
      };
    e.exports = {
      set:
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function(e, t, r) {
              try {
                (r = n(49)(
                  Function.call,
                  n(86).f(Object.prototype, "__proto__").set,
                  2
                ))(e, []),
                  (t = !(e instanceof Array));
              } catch (e) {
                t = !0;
              }
              return function(e, n) {
                return o(e, n), t ? (e.__proto__ = n) : r(e, n), e;
              };
            })({}, !1)
          : void 0),
      check: o
    };
  },
  function(e, t, n) {
    e.exports = { default: n(158), __esModule: !0 };
  },
  function(e, t, n) {
    n(159);
    var r = n(4).Object;
    e.exports = function(e, t) {
      return r.create(e, t);
    };
  },
  function(e, t, n) {
    var r = n(12);
    r(r.S, "Object", { create: n(59) });
  },
  function(e, t, n) {
    var r =
        (function() {
          return this;
        })() || Function("return this")(),
      a =
        r.regeneratorRuntime &&
        Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0,
      o = a && r.regeneratorRuntime;
    if (((r.regeneratorRuntime = void 0), (e.exports = n(161)), a))
      r.regeneratorRuntime = o;
    else
      try {
        delete r.regeneratorRuntime;
      } catch (e) {
        r.regeneratorRuntime = void 0;
      }
  },
  function(e, t) {
    !(function(t) {
      "use strict";
      var n,
        r = Object.prototype,
        a = r.hasOwnProperty,
        o = "function" == typeof Symbol ? Symbol : {},
        i = o.iterator || "@@iterator",
        s = o.asyncIterator || "@@asyncIterator",
        l = o.toStringTag || "@@toStringTag",
        u = "object" == typeof e,
        c = t.regeneratorRuntime;
      if (c) u && (e.exports = c);
      else {
        (c = t.regeneratorRuntime = u ? e.exports : {}).wrap = _;
        var d = "suspendedStart",
          p = "suspendedYield",
          f = "executing",
          g = "completed",
          m = {},
          h = {};
        h[i] = function() {
          return this;
        };
        var b = Object.getPrototypeOf,
          v = b && b(b(L([])));
        v && v !== r && a.call(v, i) && (h = v);
        var y = (k.prototype = w.prototype = Object.create(h));
        (O.prototype = y.constructor = k),
          (k.constructor = O),
          (k[l] = O.displayName = "GeneratorFunction"),
          (c.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === O || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (c.mark = function(e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, k)
                : ((e.__proto__ = k), l in e || (e[l] = "GeneratorFunction")),
              (e.prototype = Object.create(y)),
              e
            );
          }),
          (c.awrap = function(e) {
            return { __await: e };
          }),
          x(T.prototype),
          (T.prototype[s] = function() {
            return this;
          }),
          (c.AsyncIterator = T),
          (c.async = function(e, t, n, r) {
            var a = new T(_(e, t, n, r));
            return c.isGeneratorFunction(t)
              ? a
              : a.next().then(function(e) {
                  return e.done ? e.value : a.next();
                });
          }),
          x(y),
          (y[l] = "Generator"),
          (y[i] = function() {
            return this;
          }),
          (y.toString = function() {
            return "[object Generator]";
          }),
          (c.keys = function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return (
              t.reverse(),
              function n() {
                for (; t.length; ) {
                  var r = t.pop();
                  if (r in e) return (n.value = r), (n.done = !1), n;
                }
                return (n.done = !0), n;
              }
            );
          }),
          (c.values = L),
          (C.prototype = {
            constructor: C,
            reset: function(e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = n),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = n),
                this.tryEntries.forEach(N),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    a.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = n);
            },
            stop: function() {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function(e) {
              if (this.done) throw e;
              var t = this;
              function r(r, a) {
                return (
                  (s.type = "throw"),
                  (s.arg = e),
                  (t.next = r),
                  a && ((t.method = "next"), (t.arg = n)),
                  !!a
                );
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var i = this.tryEntries[o],
                  s = i.completion;
                if ("root" === i.tryLoc) return r("end");
                if (i.tryLoc <= this.prev) {
                  var l = a.call(i, "catchLoc"),
                    u = a.call(i, "finallyLoc");
                  if (l && u) {
                    if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                    if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                  } else if (l) {
                    if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                  } else {
                    if (!u)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                  }
                }
              }
            },
            abrupt: function(e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  a.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var o = r;
                  break;
                }
              }
              o &&
                ("break" === e || "continue" === e) &&
                o.tryLoc <= t &&
                t <= o.finallyLoc &&
                (o = null);
              var i = o ? o.completion : {};
              return (
                (i.type = e),
                (i.arg = t),
                o
                  ? ((this.method = "next"), (this.next = o.finallyLoc), m)
                  : this.complete(i)
              );
            },
            complete: function(e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                m
              );
            },
            finish: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.finallyLoc === e)
                  return this.complete(n.completion, n.afterLoc), N(n), m;
              }
            },
            catch: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.tryLoc === e) {
                  var r = n.completion;
                  if ("throw" === r.type) {
                    var a = r.arg;
                    N(n);
                  }
                  return a;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function(e, t, r) {
              return (
                (this.delegate = { iterator: L(e), resultName: t, nextLoc: r }),
                "next" === this.method && (this.arg = n),
                m
              );
            }
          });
      }
      function _(e, t, n, r) {
        var a = t && t.prototype instanceof w ? t : w,
          o = Object.create(a.prototype),
          i = new C(r || []);
        return (
          (o._invoke = (function(e, t, n) {
            var r = d;
            return function(a, o) {
              if (r === f) throw new Error("Generator is already running");
              if (r === g) {
                if ("throw" === a) throw o;
                return R();
              }
              for (n.method = a, n.arg = o; ; ) {
                var i = n.delegate;
                if (i) {
                  var s = S(i, n);
                  if (s) {
                    if (s === m) continue;
                    return s;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if (r === d) throw ((r = g), n.arg);
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                r = f;
                var l = E(e, t, n);
                if ("normal" === l.type) {
                  if (((r = n.done ? g : p), l.arg === m)) continue;
                  return { value: l.arg, done: n.done };
                }
                "throw" === l.type &&
                  ((r = g), (n.method = "throw"), (n.arg = l.arg));
              }
            };
          })(e, n, i)),
          o
        );
      }
      function E(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }
      function w() {}
      function O() {}
      function k() {}
      function x(e) {
        ["next", "throw", "return"].forEach(function(t) {
          e[t] = function(e) {
            return this._invoke(t, e);
          };
        });
      }
      function T(e) {
        var t;
        this._invoke = function(n, r) {
          function o() {
            return new Promise(function(t, o) {
              !(function t(n, r, o, i) {
                var s = E(e[n], e, r);
                if ("throw" !== s.type) {
                  var l = s.arg,
                    u = l.value;
                  return u && "object" == typeof u && a.call(u, "__await")
                    ? Promise.resolve(u.__await).then(
                        function(e) {
                          t("next", e, o, i);
                        },
                        function(e) {
                          t("throw", e, o, i);
                        }
                      )
                    : Promise.resolve(u).then(function(e) {
                        (l.value = e), o(l);
                      }, i);
                }
                i(s.arg);
              })(n, r, t, o);
            });
          }
          return (t = t ? t.then(o, o) : o());
        };
      }
      function S(e, t) {
        var r = e.iterator[t.method];
        if (r === n) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = n),
              S(e, t),
              "throw" === t.method)
            )
              return m;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return m;
        }
        var a = E(r, e.iterator, t.arg);
        if ("throw" === a.type)
          return (t.method = "throw"), (t.arg = a.arg), (t.delegate = null), m;
        var o = a.arg;
        return o
          ? o.done
            ? ((t[e.resultName] = o.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = n)),
              (t.delegate = null),
              m)
            : o
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            m);
      }
      function A(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function N(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function C(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(A, this),
          this.reset(!0);
      }
      function L(e) {
        if (e) {
          var t = e[i];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var r = -1,
              o = function t() {
                for (; ++r < e.length; )
                  if (a.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                return (t.value = n), (t.done = !0), t;
              };
            return (o.next = o);
          }
        }
        return { next: R };
      }
      function R() {
        return { value: n, done: !0 };
      }
    })(
      (function() {
        return this;
      })() || Function("return this")()
    );
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = o(n(163)),
      a = o(n(166));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default = (function() {
      return function(e, t) {
        if (Array.isArray(e)) return e;
        if ((0, r.default)(Object(e)))
          return (function(e, t) {
            var n = [],
              r = !0,
              o = !1,
              i = void 0;
            try {
              for (
                var s, l = (0, a.default)(e);
                !(r = (s = l.next()).done) &&
                (n.push(s.value), !t || n.length !== t);
                r = !0
              );
            } catch (e) {
              (o = !0), (i = e);
            } finally {
              try {
                !r && l.return && l.return();
              } finally {
                if (o) throw i;
              }
            }
            return n;
          })(e, t);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })();
  },
  function(e, t, n) {
    e.exports = { default: n(164), __esModule: !0 };
  },
  function(e, t, n) {
    n(61), n(36), (e.exports = n(165));
  },
  function(e, t, n) {
    var r = n(88),
      a = n(5)("iterator"),
      o = n(24);
    e.exports = n(4).isIterable = function(e) {
      var t = Object(e);
      return void 0 !== t[a] || "@@iterator" in t || o.hasOwnProperty(r(t));
    };
  },
  function(e, t, n) {
    e.exports = { default: n(167), __esModule: !0 };
  },
  function(e, t, n) {
    n(61), n(36), (e.exports = n(168));
  },
  function(e, t, n) {
    var r = n(13),
      a = n(89);
    e.exports = n(4).getIterator = function(e) {
      var t = a(e);
      if ("function" != typeof t) throw TypeError(e + " is not iterable!");
      return r(t.call(e));
    };
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      a = n(82),
      o = (r = a) && r.__esModule ? r : { default: r };
    t.default = function(e, t, n) {
      return (
        t in e
          ? (0, o.default)(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = p(n(16)),
      a = p(n(17)),
      o = p(n(18)),
      i = p(n(19)),
      s = p(n(6)),
      l = n(1),
      u = p(l),
      c = p(n(2)),
      d = p(n(10));
    function p(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var f = function(e) {
        var t = e.expanded,
          n = e.styles;
        return u.default.createElement(
          "span",
          { style: (0, s.default)({}, n.base, t ? n.expanded : n.collapsed) },
          "▶"
        );
      },
      g = (function(e) {
        function t() {
          return (
            (0, r.default)(this, t),
            (0, o.default)(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (0, i.default)(t, e),
          (0, a.default)(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.expanded,
                  n = e.onClick,
                  r = e.children,
                  a = e.nodeRenderer,
                  o = e.title,
                  i = e.shouldShowArrow,
                  s = e.shouldShowPlaceholder,
                  c = this.context.theme,
                  p = (0, d.default)("TreeNode", c),
                  g = (0, l.createElement)(a, this.props),
                  m = t ? r : void 0;
                return u.default.createElement(
                  "li",
                  {
                    "aria-expanded": t,
                    role: "treeitem",
                    style: p.treeNodeBase,
                    title: o
                  },
                  u.default.createElement(
                    "div",
                    { style: p.treeNodePreviewContainer, onClick: n },
                    i || l.Children.count(r) > 0
                      ? u.default.createElement(f, {
                          expanded: t,
                          styles: p.treeNodeArrow
                        })
                      : s &&
                          u.default.createElement(
                            "span",
                            { style: p.treeNodePlaceholder },
                            " "
                          ),
                    g
                  ),
                  u.default.createElement(
                    "ol",
                    { role: "group", style: p.treeNodeChildNodesContainer },
                    m
                  )
                );
              }
            }
          ]),
          t
        );
      })(l.Component);
    (g.propTypes = {
      name: c.default.string,
      data: c.default.any,
      expanded: c.default.bool,
      shouldShowArrow: c.default.bool,
      shouldShowPlaceholder: c.default.bool,
      nodeRenderer: c.default.func,
      onClick: c.default.func
    }),
      (g.defaultProps = {
        name: void 0,
        data: void 0,
        expanded: !0,
        nodeRenderer: function(e) {
          var t = e.name;
          return u.default.createElement("span", null, t);
        },
        onClick: function() {},
        shouldShowArrow: !1,
        shouldShowPlaceholder: !0
      }),
      (g.contextTypes = {
        theme: c.default.oneOfType([c.default.string, c.default.object])
          .isRequired
      }),
      (t.default = g);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = o(n(6)),
      a = o(n(172));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.default = function(e) {
      return {
        DOMNodePreview: {
          htmlOpenTag: {
            base: { color: e.HTML_TAG_COLOR },
            tagName: {
              color: e.HTML_TAGNAME_COLOR,
              textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
            },
            htmlAttributeName: { color: e.HTML_ATTRIBUTE_NAME_COLOR },
            htmlAttributeValue: { color: e.HTML_ATTRIBUTE_VALUE_COLOR }
          },
          htmlCloseTag: {
            base: { color: e.HTML_TAG_COLOR },
            offsetLeft: { marginLeft: -e.TREENODE_PADDING_LEFT },
            tagName: {
              color: e.HTML_TAGNAME_COLOR,
              textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
            }
          },
          htmlComment: { color: e.HTML_COMMENT_COLOR },
          htmlDoctype: { color: e.HTML_DOCTYPE_COLOR }
        },
        ObjectName: {
          base: { color: e.OBJECT_NAME_COLOR },
          dimmed: { opacity: 0.6 }
        },
        ObjectValue: {
          objectValueNull: { color: e.OBJECT_VALUE_NULL_COLOR },
          objectValueUndefined: { color: e.OBJECT_VALUE_UNDEFINED_COLOR },
          objectValueRegExp: { color: e.OBJECT_VALUE_REGEXP_COLOR },
          objectValueString: { color: e.OBJECT_VALUE_STRING_COLOR },
          objectValueSymbol: { color: e.OBJECT_VALUE_SYMBOL_COLOR },
          objectValueNumber: { color: e.OBJECT_VALUE_NUMBER_COLOR },
          objectValueBoolean: { color: e.OBJECT_VALUE_BOOLEAN_COLOR },
          objectValueFunctionKeyword: {
            color: e.OBJECT_VALUE_FUNCTION_KEYWORD_COLOR,
            fontStyle: "italic"
          },
          objectValueFunctionName: { fontStyle: "italic" }
        },
        TreeNode: {
          treeNodeBase: {
            color: e.BASE_COLOR,
            backgroundColor: e.BASE_BACKGROUND_COLOR,
            lineHeight: e.TREENODE_LINE_HEIGHT,
            cursor: "default",
            boxSizing: "border-box",
            listStyle: "none",
            fontFamily: e.TREENODE_FONT_FAMILY,
            fontSize: e.TREENODE_FONT_SIZE
          },
          treeNodePreviewContainer: {},
          treeNodePlaceholder: (0, r.default)(
            {
              whiteSpace: "pre",
              fontSize: e.ARROW_FONT_SIZE,
              marginRight: e.ARROW_MARGIN_RIGHT
            },
            a.default
          ),
          treeNodeArrow: {
            base: (0, r.default)(
              {
                color: e.ARROW_COLOR,
                display: "inline-block",
                fontSize: e.ARROW_FONT_SIZE,
                marginRight: e.ARROW_MARGIN_RIGHT
              },
              a.default
            ),
            expanded: {
              WebkitTransform: "rotateZ(90deg)",
              MozTransform: "rotateZ(90deg)",
              transform: "rotateZ(90deg)"
            },
            collapsed: {
              WebkitTransform: "rotateZ(0deg)",
              MozTransform: "rotateZ(0deg)",
              transform: "rotateZ(0deg)"
            }
          },
          treeNodeChildNodesContainer: {
            margin: 0,
            paddingLeft: e.TREENODE_PADDING_LEFT
          }
        },
        TableInspector: {
          base: {
            color: e.BASE_COLOR,
            position: "relative",
            border: "1px solid " + e.TABLE_BORDER_COLOR,
            fontFamily: e.BASE_FONT_FAMILY,
            fontSize: e.BASE_FONT_SIZE,
            lineHeight: "120%",
            boxSizing: "border-box",
            cursor: "default"
          }
        },
        TableInspectorHeaderContainer: {
          base: {
            top: 0,
            height: "17px",
            left: 0,
            right: 0,
            overflowX: "hidden"
          },
          table: {
            tableLayout: "fixed",
            borderSpacing: 0,
            borderCollapse: "separate",
            height: "100%",
            width: "100%",
            margin: 0
          }
        },
        TableInspectorDataContainer: {
          tr: { display: "table-row" },
          td: {
            boxSizing: "border-box",
            border: "none",
            height: "16px",
            verticalAlign: "top",
            padding: "1px 4px",
            WebkitUserSelect: "text",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: "14px"
          },
          div: {
            position: "static",
            top: "17px",
            bottom: 0,
            overflowY: "overlay",
            transform: "translateZ(0)",
            left: 0,
            right: 0,
            overflowX: "hidden"
          },
          table: {
            positon: "static",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderTop: "0 none transparent",
            margin: 0,
            backgroundImage: e.TABLE_DATA_BACKGROUND_IMAGE,
            backgroundSize: e.TABLE_DATA_BACKGROUND_SIZE,
            tableLayout: "fixed",
            borderSpacing: 0,
            borderCollapse: "separate",
            width: "100%",
            fontSize: e.BASE_FONT_SIZE,
            lineHeight: "120%"
          }
        },
        TableInspectorTH: {
          base: {
            position: "relative",
            height: "auto",
            textAlign: "left",
            backgroundColor: e.TABLE_TH_BACKGROUND_COLOR,
            borderBottom: "1px solid " + e.TABLE_BORDER_COLOR,
            fontWeight: "normal",
            verticalAlign: "middle",
            padding: "0 4px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: "14px",
            ":hover": { backgroundColor: e.TABLE_TH_HOVER_COLOR }
          },
          div: {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: e.BASE_FONT_SIZE,
            lineHeight: "120%"
          }
        },
        TableInspectorLeftBorder: {
          none: { borderLeft: "none" },
          solid: { borderLeft: "1px solid " + e.TABLE_BORDER_COLOR }
        },
        TableInspectorSortIcon: (0, r.default)(
          {
            display: "block",
            marginRight: 3,
            width: 8,
            height: 7,
            marginTop: -7,
            color: e.TABLE_SORT_ICON_COLOR,
            fontSize: 12
          },
          a.default
        )
      };
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = {
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        OUserSelect: "none",
        userSelect: "none"
      });
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.hasChildNodes = a);
    var r = (t.DEFAULT_ROOT_PATH = "$");
    function a(e, t) {
      return !t(e).next().done;
    }
    var o = (t.wildcardPathsFromLevel = function(e) {
      return Array.from({ length: e }, function(e, t) {
        return [r]
          .concat(
            Array.from({ length: t }, function() {
              return "*";
            })
          )
          .join(".");
      });
    });
    t.getExpandedPaths = function(e, t, n, i) {
      var s =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
        l = []
          .concat(o(i))
          .concat(n)
          .filter(function(e) {
            return "string" == typeof e;
          }),
        u = [];
      return (
        l.forEach(function(n) {
          var o = n.split(".");
          !(function e(n, i, s) {
            if (s !== o.length) {
              var l = o[s];
              if (0 === s) !a(n, t) || (l !== r && "*" !== l) || e(n, r, s + 1);
              else if ("*" === l) {
                var c = !0,
                  d = !1,
                  p = void 0;
                try {
                  for (
                    var f, g = t(n)[Symbol.iterator]();
                    !(c = (f = g.next()).done);
                    c = !0
                  ) {
                    var m = f.value,
                      h = m.name,
                      b = m.data;
                    a(b, t) && e(b, i + "." + h, s + 1);
                  }
                } catch (e) {
                  (d = !0), (p = e);
                } finally {
                  try {
                    !c && g.return && g.return();
                  } finally {
                    if (d) throw p;
                  }
                }
              } else {
                var v = n[l];
                a(v, t) && e(v, i + "." + l, s + 1);
              }
            } else u.push(i);
          })(e, "", 0);
        }),
        u.reduce(function(e, t) {
          return (e[t] = !0), e;
        }, s)
      );
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = l(n(7)),
      a = l(n(1)),
      o = l(n(2)),
      i = l(n(38)),
      s = l(n(37));
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var u = { preview: { fontStyle: "italic" } };
    function c(e, t) {
      return 0 === e.length
        ? []
        : e.slice(1).reduce(
            function(e, n) {
              return e.concat([t, n]);
            },
            [e[0]]
          );
    }
    var d = function(e) {
      var t = e.data,
        n = e.maxProperties,
        o = t;
      if (
        "object" !== (void 0 === o ? "undefined" : (0, r.default)(o)) ||
        null === o ||
        o instanceof Date ||
        o instanceof RegExp
      )
        return a.default.createElement(i.default, { object: o });
      if (Array.isArray(o))
        return a.default.createElement(
          "span",
          { style: u.preview },
          "[",
          c(
            o.map(function(e, t) {
              return a.default.createElement(i.default, { key: t, object: e });
            }),
            ", "
          ),
          "]"
        );
      var l = [];
      for (var d in o) {
        var p = o[d];
        if (o.hasOwnProperty(d)) {
          var f = void 0;
          if (
            (l.length === n - 1 &&
              Object.keys(o).length > n &&
              (f = a.default.createElement("span", { key: "ellipsis" }, "…")),
            l.push(
              a.default.createElement(
                "span",
                { key: d },
                a.default.createElement(s.default, { name: d || '""' }),
                ": ",
                a.default.createElement(i.default, { object: p }),
                f
              )
            ),
            f)
          )
            break;
        }
      }
      return a.default.createElement(
        "span",
        { style: u.preview },
        o.constructor.name + " {",
        c(l, ", "),
        "}"
      );
    };
    (d.propTypes = { maxProperties: o.default.number }),
      (d.defaultProps = { maxProperties: 5 }),
      (t.default = d);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = h(n(7)),
      a = h(n(16)),
      o = h(n(17)),
      i = h(n(18)),
      s = h(n(19)),
      l = n(1),
      u = h(l),
      c = h(n(2)),
      d = h(n(64)),
      p = h(n(10)),
      f = h(n(176)),
      g = h(n(185)),
      m = h(n(186));
    function h(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var b = (function(e) {
      function t(e) {
        (0, a.default)(this, t);
        var n = (0, i.default)(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
        );
        return (
          (n.state = {
            sorted: !1,
            sortIndexColumn: !1,
            sortColumn: void 0,
            sortAscending: !1
          }),
          n
        );
      }
      return (
        (0, s.default)(t, e),
        (0, o.default)(t, [
          {
            key: "handleIndexTHClick",
            value: function() {
              this.setState(function(e) {
                var t = e.sortIndexColumn,
                  n = e.sortAscending;
                return {
                  sorted: !0,
                  sortIndexColumn: !0,
                  sortColumn: void 0,
                  sortAscending: !t || !n
                };
              });
            }
          },
          {
            key: "handleTHClick",
            value: function(e) {
              this.setState(function(t) {
                var n = t.sortColumn,
                  r = t.sortAscending;
                return {
                  sorted: !0,
                  sortIndexColumn: !1,
                  sortColumn: e,
                  sortAscending: e !== n || !r
                };
              });
            }
          },
          {
            key: "render",
            value: function() {
              var e = this.props.data,
                t = this.props.columns,
                n = this.props.theme,
                a = (0, p.default)("TableInspector", n);
              if (
                "object" !== (void 0 === e ? "undefined" : (0, r.default)(e)) ||
                null === e
              )
                return u.default.createElement("div", null);
              var o = (0, f.default)(e),
                i = o.rowHeaders,
                s = o.colHeaders;
              void 0 !== t && (s = t);
              var l,
                c,
                h = i.map(function(t) {
                  return e[t];
                }),
                b = this.state.sortIndexColumn,
                v = this.state.sortColumn,
                y = this.state.sortAscending,
                _ = void 0;
              if (
                (void 0 !== v
                  ? (_ = h.map(function(e, t) {
                      return "object" ===
                        (void 0 === e ? "undefined" : (0, r.default)(e)) &&
                        null !== e
                        ? [e[v], t]
                        : [void 0, t];
                    }))
                  : b &&
                    (_ = i.map(function(e, t) {
                      return [i[t], t];
                    })),
                void 0 !== _)
              ) {
                var E = _.sort(
                  ((l = function(e) {
                    return e[0];
                  }),
                  (c = y),
                  function(e, t) {
                    var n = l(e),
                      a = l(t),
                      o = void 0 === n ? "undefined" : (0, r.default)(n),
                      i = void 0 === a ? "undefined" : (0, r.default)(a),
                      s = function(e, t) {
                        return e < t ? -1 : e > t ? 1 : 0;
                      },
                      u = void 0;
                    if (o === i) u = s(n, a);
                    else {
                      var d = {
                        string: 0,
                        number: 1,
                        object: 2,
                        symbol: 3,
                        boolean: 4,
                        undefined: 5,
                        function: 6
                      };
                      u = s(d[o], d[i]);
                    }
                    return c || (u = -u), u;
                  })
                ).map(function(e) {
                  return e[1];
                });
                (i = E.map(function(e) {
                  return i[e];
                })),
                  (h = E.map(function(e) {
                    return h[e];
                  }));
              }
              return u.default.createElement(
                d.default,
                { theme: this.props.theme },
                u.default.createElement(
                  "div",
                  { style: a.base },
                  u.default.createElement(m.default, {
                    columns: s,
                    sorted: this.state.sorted,
                    sortIndexColumn: this.state.sortIndexColumn,
                    sortColumn: this.state.sortColumn,
                    sortAscending: this.state.sortAscending,
                    onTHClick: this.handleTHClick.bind(this),
                    onIndexTHClick: this.handleIndexTHClick.bind(this)
                  }),
                  u.default.createElement(g.default, {
                    rows: i,
                    columns: s,
                    rowsData: h
                  })
                )
              );
            }
          }
        ]),
        t
      );
    })(l.Component);
    (t.default = b),
      (b.propTypes = {
        data: c.default.oneOfType([c.default.array, c.default.object]),
        columns: c.default.array
      }),
      (b.defaultProps = {
        data: void 0,
        columns: void 0,
        theme: "chromeLight"
      });
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = o(n(177)),
      a = o(n(7));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.default = function(e) {
      if ("object" === (void 0 === e ? "undefined" : (0, a.default)(e))) {
        var t = void 0;
        if (Array.isArray(e)) {
          var n = e.length;
          t = [].concat((0, r.default)(Array(n).keys()));
        } else null !== e && (t = Object.keys(e));
        var o = t.reduce(function(t, n) {
          var r = e[n];
          if (
            "object" === (void 0 === r ? "undefined" : (0, a.default)(r)) &&
            null !== r
          ) {
            var o = Object.keys(r);
            o.reduce(function(e, t) {
              return e.includes(t) || e.push(t), e;
            }, t);
          }
          return t;
        }, []);
        return { rowHeaders: t, colHeaders: o };
      }
      return;
    }),
      Array.prototype.includes ||
        (Array.prototype.includes = function(e) {
          var t = Object(this),
            n = parseInt(t.length) || 0;
          if (0 === n) return !1;
          var r,
            a,
            o = parseInt(arguments[1]) || 0;
          for (o >= 0 ? (r = o) : (r = n + o) < 0 && (r = 0); r < n; ) {
            if (e === (a = t[r]) || (e != e && a != a)) return !0;
            r++;
          }
          return !1;
        });
  },
  function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      a = n(178),
      o = (r = a) && r.__esModule ? r : { default: r };
    t.default = function(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return (0, o.default)(e);
    };
  },
  function(e, t, n) {
    e.exports = { default: n(179), __esModule: !0 };
  },
  function(e, t, n) {
    n(36), n(180), (e.exports = n(4).Array.from);
  },
  function(e, t, n) {
    "use strict";
    var r = n(49),
      a = n(12),
      o = n(58),
      i = n(181),
      s = n(182),
      l = n(80),
      u = n(183),
      c = n(89);
    a(
      a.S +
        a.F *
          !n(184)(function(e) {
            Array.from(e);
          }),
      "Array",
      {
        from: function(e) {
          var t,
            n,
            a,
            d,
            p = o(e),
            f = "function" == typeof this ? this : Array,
            g = arguments.length,
            m = g > 1 ? arguments[1] : void 0,
            h = void 0 !== m,
            b = 0,
            v = c(p);
          if (
            (h && (m = r(m, g > 2 ? arguments[2] : void 0, 2)),
            null == v || (f == Array && s(v)))
          )
            for (n = new f((t = l(p.length))); t > b; b++)
              u(n, b, h ? m(p[b], b) : p[b]);
          else
            for (d = v.call(p), n = new f(); !(a = d.next()).done; b++)
              u(n, b, h ? i(d, m, [a.value, b], !0) : a.value);
          return (n.length = b), n;
        }
      }
    );
  },
  function(e, t, n) {
    var r = n(13);
    e.exports = function(e, t, n, a) {
      try {
        return a ? t(r(n)[0], n[1]) : t(n);
      } catch (t) {
        var o = e.return;
        throw (void 0 !== o && r(o.call(e)), t);
      }
    };
  },
  function(e, t, n) {
    var r = n(24),
      a = n(5)("iterator"),
      o = Array.prototype;
    e.exports = function(e) {
      return void 0 !== e && (r.Array === e || o[a] === e);
    };
  },
  function(e, t, n) {
    "use strict";
    var r = n(9),
      a = n(27);
    e.exports = function(e, t, n) {
      t in e ? r.f(e, t, a(0, n)) : (e[t] = n);
    };
  },
  function(e, t, n) {
    var r = n(5)("iterator"),
      a = !1;
    try {
      var o = [7][r]();
      (o.return = function() {
        a = !0;
      }),
        Array.from(o, function() {
          throw 2;
        });
    } catch (e) {}
    e.exports = function(e, t) {
      if (!t && !a) return !1;
      var n = !1;
      try {
        var o = [7],
          i = o[r]();
        (i.next = function() {
          return { done: (n = !0) };
        }),
          (o[r] = function() {
            return i;
          }),
          e(o);
      } catch (e) {}
      return n;
    };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = u(n(7)),
      a = u(n(6)),
      o = u(n(1)),
      i = u(n(2)),
      s = u(n(10)),
      l = u(n(38));
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var c = function(e, t) {
      var n = e.rows,
        i = e.columns,
        u = e.rowsData,
        c = t.theme,
        d = (0, s.default)("TableInspectorDataContainer", c),
        p = (0, s.default)("TableInspectorLeftBorder", c);
      return o.default.createElement(
        "div",
        { style: d.div },
        o.default.createElement(
          "table",
          { style: d.table },
          o.default.createElement("colgroup", null),
          o.default.createElement(
            "tbody",
            null,
            n.map(function(e, t) {
              return o.default.createElement(
                "tr",
                { key: e, style: d.tr },
                o.default.createElement(
                  "td",
                  { style: (0, a.default)({}, d.td, p.none) },
                  e
                ),
                i.map(function(e) {
                  var n = u[t];
                  return "object" ===
                    (void 0 === n ? "undefined" : (0, r.default)(n)) &&
                    null !== n &&
                    n.hasOwnProperty(e)
                    ? o.default.createElement(
                        "td",
                        { key: e, style: (0, a.default)({}, d.td, p.solid) },
                        o.default.createElement(l.default, { object: n[e] })
                      )
                    : o.default.createElement("td", {
                        key: e,
                        style: (0, a.default)({}, d.td, p.solid)
                      });
                })
              );
            })
          )
        )
      );
    };
    (c.contextTypes = {
      theme: i.default.oneOfType([i.default.string, i.default.object])
        .isRequired
    }),
      (t.default = c);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = s(n(1)),
      a = s(n(2)),
      o = s(n(10)),
      i = s(n(187));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = function(e, t) {
      var n = e.indexColumnText,
        a = e.columns,
        s = e.sorted,
        l = e.sortIndexColumn,
        u = e.sortColumn,
        c = e.sortAscending,
        d = e.onTHClick,
        p = e.onIndexTHClick,
        f = t.theme,
        g = (0, o.default)("TableInspectorHeaderContainer", f),
        m = (0, o.default)("TableInspectorLeftBorder", f);
      return r.default.createElement(
        "div",
        { style: g.base },
        r.default.createElement(
          "table",
          { style: g.table },
          r.default.createElement(
            "tbody",
            null,
            r.default.createElement(
              "tr",
              null,
              r.default.createElement(
                i.default,
                {
                  borderStyle: m.none,
                  sorted: s && l,
                  sortAscending: c,
                  onClick: p
                },
                n
              ),
              a.map(function(e) {
                return r.default.createElement(
                  i.default,
                  {
                    borderStyle: m.solid,
                    key: e,
                    sorted: s && u === e,
                    sortAscending: c,
                    onClick: d.bind(void 0, e)
                  },
                  e
                );
              })
            )
          )
        )
      );
    };
    (l.defaultProps = { indexColumnText: "(index)", columns: [] }),
      (l.contextTypes = {
        theme: a.default.oneOfType([a.default.string, a.default.object])
          .isRequired
      }),
      (t.default = l);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = f(n(6)),
      a = f(n(35)),
      o = f(n(16)),
      i = f(n(17)),
      s = f(n(18)),
      l = f(n(19)),
      u = n(1),
      c = f(u),
      d = f(n(2)),
      p = f(n(10));
    function f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var g = function(e) {
        return c.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: 1,
              right: 0,
              bottom: 1,
              display: "flex",
              alignItems: "center"
            }
          },
          e.children
        );
      },
      m = function(e, t) {
        var n = e.sortAscending,
          r = t.theme,
          a = n ? "▲" : "▼",
          o = (0, p.default)("TableInspectorSortIcon", r);
        return c.default.createElement("div", { style: o }, a);
      };
    m.contextTypes = {
      theme: d.default.oneOfType([d.default.string, d.default.object])
        .isRequired
    };
    var h = (function(e) {
      function t() {
        var e, n, r, a;
        (0, o.default)(this, t);
        for (var i = arguments.length, l = Array(i), u = 0; u < i; u++)
          l[u] = arguments[u];
        return (
          (n = r = (0, s.default)(
            this,
            (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
              e,
              [this].concat(l)
            )
          )),
          (r.state = { hovered: !1 }),
          (a = n),
          (0, s.default)(r, a)
        );
      }
      return (
        (0, l.default)(t, e),
        (0, i.default)(t, [
          {
            key: "toggleHovered",
            value: function(e) {
              this.setState({ hovered: e });
            }
          },
          {
            key: "render",
            value: function() {
              var e = this.props,
                t = e.borderStyle,
                n = e.children,
                o = e.onClick,
                i = e.sortAscending,
                s = e.sorted,
                l = (0, a.default)(e, [
                  "borderStyle",
                  "children",
                  "onClick",
                  "sortAscending",
                  "sorted"
                ]),
                u = this.context.theme,
                d = (0, p.default)("TableInspectorTH", u);
              return c.default.createElement(
                "th",
                (0, r.default)({}, l, {
                  style: (0, r.default)(
                    {},
                    d.base,
                    t,
                    this.state.hovered ? d.base[":hover"] : {}
                  ),
                  onMouseEnter: this.toggleHovered.bind(this, !0),
                  onMouseLeave: this.toggleHovered.bind(this, !1),
                  onClick: o
                }),
                c.default.createElement("div", { style: d.div }, n),
                s &&
                  c.default.createElement(
                    g,
                    null,
                    c.default.createElement(m, { sortAscending: i })
                  )
              );
            }
          }
        ]),
        t
      );
    })(u.Component);
    (h.contextTypes = {
      theme: d.default.oneOfType([d.default.string, d.default.object])
        .isRequired
    }),
      (h.defaultProps = { sortAscending: !1, sorted: !1, onClick: void 0 }),
      (t.default = h);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = h(n(6)),
      a = h(n(16)),
      o = h(n(17)),
      i = h(n(18)),
      s = h(n(19)),
      l = h(n(87)),
      u = n(1),
      c = h(u),
      d = h(n(2)),
      p = h(n(189)),
      f = h(n(90)),
      g = h(n(93)),
      m = h(n(64));
    function h(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var b = l.default.mark(function e(t) {
        var n, r;
        return l.default.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (!t || !t.childNodes) {
                    e.next = 17;
                    break;
                  }
                  if (!(0, g.default)(t)) {
                    e.next = 4;
                    break;
                  }
                  return e.abrupt("return");
                case 4:
                  n = 0;
                case 5:
                  if (!(n < t.childNodes.length)) {
                    e.next = 14;
                    break;
                  }
                  if (
                    (r = t.childNodes[n]).nodeType !== Node.TEXT_NODE ||
                    0 !== r.textContent.trim().length
                  ) {
                    e.next = 9;
                    break;
                  }
                  return e.abrupt("continue", 11);
                case 9:
                  return (
                    (e.next = 11), { name: r.tagName + "[" + n + "]", data: r }
                  );
                case 11:
                  n++, (e.next = 5);
                  break;
                case 14:
                  if (!t.tagName) {
                    e.next = 17;
                    break;
                  }
                  return (
                    (e.next = 17),
                    {
                      name: "CLOSE_TAG",
                      data: { tagName: t.tagName },
                      isCloseTag: !0
                    }
                  );
                case 17:
                case "end":
                  return e.stop();
              }
          },
          e,
          this
        );
      }),
      v = (function(e) {
        function t() {
          return (
            (0, a.default)(this, t),
            (0, i.default)(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          (0, s.default)(t, e),
          (0, o.default)(t, [
            {
              key: "render",
              value: function() {
                var e = p.default;
                return c.default.createElement(
                  m.default,
                  { theme: this.props.theme },
                  c.default.createElement(
                    f.default,
                    (0, r.default)(
                      { nodeRenderer: e, dataIterator: b },
                      this.props
                    )
                  )
                );
              }
            }
          ]),
          t
        );
      })(u.Component);
    (v.propTypes = { data: d.default.object.isRequired }),
      (v.defaultProps = { theme: "chromeLight" }),
      (t.default = v);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = s(n(1)),
      a = s(n(2)),
      o = s(n(10)),
      i = s(n(93));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = function(e) {
        var t = e.tagName,
          n = e.attributes,
          a = e.styles;
        return r.default.createElement(
          "span",
          { style: a.base },
          "<",
          r.default.createElement("span", { style: a.tagName }, t),
          (function() {
            if (n) {
              for (var e = [], t = 0; t < n.length; t++) {
                var o = n[t];
                e.push(
                  r.default.createElement(
                    "span",
                    { key: t },
                    " ",
                    r.default.createElement(
                      "span",
                      { style: a.htmlAttributeName },
                      o.name
                    ),
                    '="',
                    r.default.createElement(
                      "span",
                      { style: a.htmlAttributeValue },
                      o.value
                    ),
                    '"'
                  )
                );
              }
              return e;
            }
          })(),
          ">"
        );
      },
      u = function(e) {
        var t = e.tagName,
          n = e.isChildNode,
          a = void 0 !== n && n,
          o = e.styles;
        return r.default.createElement(
          "span",
          { style: Object.assign({}, o.base, a && o.offsetLeft) },
          "</",
          r.default.createElement("span", { style: o.tagName }, t),
          ">"
        );
      },
      c = {
        1: "ELEMENT_NODE",
        3: "TEXT_NODE",
        7: "PROCESSING_INSTRUCTION_NODE",
        8: "COMMENT_NODE",
        9: "DOCUMENT_NODE",
        10: "DOCUMENT_TYPE_NODE",
        11: "DOCUMENT_FRAGMENT_NODE"
      },
      d = function(e, t) {
        var n = e.isCloseTag,
          a = e.data,
          s = e.expanded,
          d = t.theme,
          p = (0, o.default)("DOMNodePreview", d);
        if (n)
          return r.default.createElement(u, {
            styles: p.htmlCloseTag,
            isChildNode: !0,
            tagName: a.tagName
          });
        switch (a.nodeType) {
          case Node.ELEMENT_NODE:
            return r.default.createElement(
              "span",
              null,
              r.default.createElement(l, {
                tagName: a.tagName,
                attributes: a.attributes,
                styles: p.htmlOpenTag
              }),
              (0, i.default)(a) ? a.textContent : !s && "…",
              !s &&
                r.default.createElement(u, {
                  tagName: a.tagName,
                  styles: p.htmlCloseTag
                })
            );
          case Node.TEXT_NODE:
            return r.default.createElement("span", null, a.textContent);
          case Node.CDATA_SECTION_NODE:
            return r.default.createElement(
              "span",
              null,
              "<![CDATA[" + a.textContent + "]]>"
            );
          case Node.COMMENT_NODE:
            return r.default.createElement(
              "span",
              { style: p.htmlComment },
              "\x3c!--",
              a.textContent,
              "--\x3e"
            );
          case Node.PROCESSING_INSTRUCTION_NODE:
            return r.default.createElement("span", null, a.nodeName);
          case Node.DOCUMENT_TYPE_NODE:
            return r.default.createElement(
              "span",
              { style: p.htmlDoctype },
              "<!DOCTYPE ",
              a.name,
              a.publicId ? ' PUBLIC "' + a.publicId + '"' : "",
              !a.publicId && a.systemId ? " SYSTEM" : "",
              a.systemId ? ' "' + a.systemId + '"' : "",
              ">"
            );
          case Node.DOCUMENT_NODE:
          case Node.DOCUMENT_FRAGMENT_NODE:
            return r.default.createElement("span", null, a.nodeName);
          default:
            return r.default.createElement("span", null, c[a.nodeType]);
        }
      };
    (d.propTypes = {
      isCloseTag: a.default.bool,
      name: a.default.string,
      data: a.default.object.isRequired,
      expanded: a.default.bool.isRequired
    }),
      (d.contextTypes = {
        theme: a.default.oneOfType([a.default.string, a.default.object])
          .isRequired
      }),
      (t.default = d);
  },
  function(e, t) {
    e.exports = function(e) {
      return (
        !(!e || "object" != typeof e) &&
        ("object" == typeof window && "object" == typeof window.Node
          ? e instanceof window.Node
          : "number" == typeof e.nodeType && "string" == typeof e.nodeName)
      );
    };
  },
  function(e, t, n) {
    "use strict";
    n.r(t);
    n(28);
    var r,
      a,
      o,
      i,
      s,
      l = n(1),
      u = n.n(l),
      c = n(2),
      d = n.n(c),
      p = n(3),
      f = n.n(p),
      g = n(94),
      m = n.n(g),
      h = n(0),
      b = n.n(h);
    (b.a.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: /<!DOCTYPE[\s\S]+?>/i,
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
          },
          "attr-value": {
            pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
            inside: {
              punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: { namespace: /^[^\s>\/:]+:/ }
          }
        }
      },
      entity: /&#?[\da-z]{1,8};/i
    }),
      (b.a.languages.markup.tag.inside["attr-value"].inside.entity =
        b.a.languages.markup.entity),
      b.a.hooks.add("wrap", function(e) {
        "entity" === e.type &&
          (e.attributes.title = e.content.replace(/&amp;/, "&"));
      }),
      (b.a.languages.xml = b.a.languages.markup),
      (b.a.languages.html = b.a.languages.markup),
      (b.a.languages.mathml = b.a.languages.markup),
      (b.a.languages.svg = b.a.languages.markup),
      (function(e) {
        var t = {
          variable: [
            {
              pattern: /\$?\(\([\s\S]+?\)\)/,
              inside: {
                variable: [
                  { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                  /^\$\(\(/
                ],
                number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/
              }
            },
            {
              pattern: /\$\([^)]+\)|`[^`]+`/,
              greedy: !0,
              inside: { variable: /^\$\(|^`|\)$|`$/ }
            },
            /\$(?:[\w#?*!@]+|\{[^}]+\})/i
          ]
        };
        e.languages.bash = {
          shebang: {
            pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
            alias: "important"
          },
          comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
          string: [
            {
              pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
              lookbehind: !0,
              greedy: !0,
              inside: t
            },
            {
              pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
              greedy: !0,
              inside: t
            }
          ],
          variable: t.variable,
          function: {
            pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
            lookbehind: !0
          },
          keyword: {
            pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
            lookbehind: !0
          },
          boolean: {
            pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
            lookbehind: !0
          },
          operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
          punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
        };
        var n = t.variable[1].inside;
        (n.string = e.languages.bash.string),
          (n.function = e.languages.bash.function),
          (n.keyword = e.languages.bash.keyword),
          (n.boolean = e.languages.bash.boolean),
          (n.operator = e.languages.bash.operator),
          (n.punctuation = e.languages.bash.punctuation),
          (e.languages.shell = e.languages.bash);
      })(b.a),
      (b.a.languages.clike = {
        comment: [
          { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
        ],
        string: {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: !0
        },
        "class-name": {
          pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
          lookbehind: !0,
          inside: { punctuation: /[.\\]/ }
        },
        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /[a-z0-9_]+(?=\()/i,
        number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
        punctuation: /[{}[\];(),.:]/
      }),
      (b.a.languages.c = b.a.languages.extend("clike", {
        keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
        operator: /-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,
        number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
      })),
      b.a.languages.insertBefore("c", "string", {
        macro: {
          pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
          lookbehind: !0,
          alias: "property",
          inside: {
            string: {
              pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
              lookbehind: !0
            },
            directive: {
              pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
              lookbehind: !0,
              alias: "keyword"
            }
          }
        },
        constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
      }),
      delete b.a.languages.c["class-name"],
      delete b.a.languages.c.boolean,
      (b.a.languages.cpp = b.a.languages.extend("c", {
        keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
        boolean: /\b(?:true|false)\b/,
        operator: /--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
      })),
      b.a.languages.insertBefore("cpp", "keyword", {
        "class-name": { pattern: /(class\s+)\w+/i, lookbehind: !0 }
      }),
      b.a.languages.insertBefore("cpp", "string", {
        "raw-string": {
          pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
          alias: "string",
          greedy: !0
        }
      }),
      (b.a.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
          inside: { rule: /@[\w-]+/ }
        },
        url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
        selector: /[^{}\s][^{};]*?(?=\s*\{)/,
        string: {
          pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: !0
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /\B!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:]/
      }),
      (b.a.languages.css.atrule.inside.rest = b.a.languages.css),
      b.a.languages.markup &&
        (b.a.languages.insertBefore("markup", "tag", {
          style: {
            pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
            lookbehind: !0,
            inside: b.a.languages.css,
            alias: "language-css",
            greedy: !0
          }
        }),
        b.a.languages.insertBefore(
          "inside",
          "attr-value",
          {
            "style-attr": {
              pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
              inside: {
                "attr-name": {
                  pattern: /^\s*style/i,
                  inside: b.a.languages.markup.tag.inside
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": { pattern: /.+/i, inside: b.a.languages.css }
              },
              alias: "language-css"
            }
          },
          b.a.languages.markup.tag
        )),
      (b.a.languages.javascript = b.a.languages.extend("clike", {
        keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
        number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
        operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
      })),
      b.a.languages.insertBefore("javascript", "keyword", {
        regex: {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
          lookbehind: !0,
          greedy: !0
        },
        "function-variable": {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
          alias: "function"
        },
        constant: /\b[A-Z][A-Z\d_]*\b/
      }),
      b.a.languages.insertBefore("javascript", "string", {
        "template-string": {
          pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
          greedy: !0,
          inside: {
            interpolation: {
              pattern: /\${[^}]+}/,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\${|}$/,
                  alias: "punctuation"
                },
                rest: null
              }
            },
            string: /[\s\S]+/
          }
        }
      }),
      (b.a.languages.javascript[
        "template-string"
      ].inside.interpolation.inside.rest = b.a.languages.javascript),
      b.a.languages.markup &&
        b.a.languages.insertBefore("markup", "tag", {
          script: {
            pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: !0,
            inside: b.a.languages.javascript,
            alias: "language-javascript",
            greedy: !0
          }
        }),
      (b.a.languages.js = b.a.languages.javascript),
      (function(e) {
        var t = e.util.clone(e.languages.javascript);
        (e.languages.jsx = e.languages.extend("markup", t)),
          (e.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
          (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
          (e.languages.jsx.tag.inside[
            "attr-value"
          ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
          e.languages.insertBefore(
            "inside",
            "attr-name",
            {
              spread: {
                pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
                inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ }
              }
            },
            e.languages.jsx.tag
          ),
          e.languages.insertBefore(
            "inside",
            "attr-value",
            {
              script: {
                pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
                inside: {
                  "script-punctuation": {
                    pattern: /^=(?={)/,
                    alias: "punctuation"
                  },
                  rest: e.languages.jsx
                },
                alias: "language-javascript"
              }
            },
            e.languages.jsx.tag
          );
        var n = function e(t) {
          return t
            ? "string" == typeof t
              ? t
              : "string" == typeof t.content
              ? t.content
              : t.content.map(e).join("")
            : "";
        };
        e.hooks.add("after-tokenize", function(t) {
          ("jsx" !== t.language && "tsx" !== t.language) ||
            (function t(r) {
              for (var a = [], o = 0; o < r.length; o++) {
                var i = r[o],
                  s = !1;
                if (
                  ("string" != typeof i &&
                    ("tag" === i.type &&
                    i.content[0] &&
                    "tag" === i.content[0].type
                      ? "</" === i.content[0].content[0].content
                        ? a.length > 0 &&
                          a[a.length - 1].tagName ===
                            n(i.content[0].content[1]) &&
                          a.pop()
                        : "/>" === i.content[i.content.length - 1].content ||
                          a.push({
                            tagName: n(i.content[0].content[1]),
                            openedBraces: 0
                          })
                      : a.length > 0 &&
                        "punctuation" === i.type &&
                        "{" === i.content
                      ? a[a.length - 1].openedBraces++
                      : a.length > 0 &&
                        a[a.length - 1].openedBraces > 0 &&
                        "punctuation" === i.type &&
                        "}" === i.content
                      ? a[a.length - 1].openedBraces--
                      : (s = !0)),
                  (s || "string" == typeof i) &&
                    a.length > 0 &&
                    0 === a[a.length - 1].openedBraces)
                ) {
                  var l = n(i);
                  o < r.length - 1 &&
                    ("string" == typeof r[o + 1] ||
                      "plain-text" === r[o + 1].type) &&
                    ((l += n(r[o + 1])), r.splice(o + 1, 1)),
                    o > 0 &&
                      ("string" == typeof r[o - 1] ||
                        "plain-text" === r[o - 1].type) &&
                      ((l = n(r[o - 1]) + l), r.splice(o - 1, 1), o--),
                    (r[o] = new e.Token("plain-text", l, null, l));
                }
                i.content && "string" != typeof i.content && t(i.content);
              }
            })(t.tokens);
        });
      })(b.a),
      (r = b.a),
      (a = /#(?!\{).+/),
      (o = { pattern: /#\{[^}]+\}/, alias: "variable" }),
      (r.languages.coffeescript = r.languages.extend("javascript", {
        comment: a,
        string: [
          { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
          {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: !0,
            inside: { interpolation: o }
          }
        ],
        keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
        "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" }
      })),
      r.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
        "block-regex": {
          pattern: /\/{3}[\s\S]*?\/{3}/,
          alias: "regex",
          inside: { comment: a, interpolation: o }
        }
      }),
      r.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: {
            delimiter: { pattern: /^`|`$/, alias: "punctuation" },
            rest: r.languages.javascript
          }
        },
        "multiline-string": [
          { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
          {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: "string",
            inside: { interpolation: o }
          }
        ]
      }),
      r.languages.insertBefore("coffeescript", "keyword", {
        property: /(?!\d)\w+(?=\s*:(?!:))/
      }),
      delete r.languages.coffeescript["template-string"],
      (b.a.languages.actionscript = b.a.languages.extend("javascript", {
        keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
        operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
      })),
      (b.a.languages.actionscript["class-name"].alias = "function"),
      b.a.languages.markup &&
        b.a.languages.insertBefore("actionscript", "string", {
          xml: {
            pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
            lookbehind: !0,
            inside: { rest: b.a.languages.markup }
          }
        }),
      (b.a.languages.css.selector = {
        pattern: /[^{}\s][^{}]*(?=\s*\{)/,
        inside: {
          "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
          "pseudo-class": /:[-\w]+(?:\(.*\))?/,
          class: /\.[-:.\w]+/,
          id: /#[-:.\w]+/,
          attribute: /\[[^\]]+\]/
        }
      }),
      b.a.languages.insertBefore("css", "function", {
        hexcode: /#[\da-f]{3,8}/i,
        entity: /\\[\da-f]{1,8}/i,
        number: /[\d%.]+/
      }),
      (b.a.languages.diff = {
        coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
        deleted: /^[-<].*$/m,
        inserted: /^[+>].*$/m,
        diff: { pattern: /^!(?!!).+$/m, alias: "important" }
      }),
      (b.a.languages.docker = {
        keyword: {
          pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
          lookbehind: !0
        },
        string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        comment: /#.*/,
        punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
      }),
      (b.a.languages.dockerfile = b.a.languages.docker),
      (b.a.languages.elixir = {
        comment: { pattern: /#.*/m, lookbehind: !0 },
        regex: {
          pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
          greedy: !0
        },
        string: [
          {
            pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
            greedy: !0,
            inside: {}
          },
          { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
          {
            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
            inside: {}
          }
        ],
        atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
        "attr-name": /\w+:(?!:)/,
        capture: {
          pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
          lookbehind: !0,
          alias: "function"
        },
        argument: {
          pattern: /(^|[^&])&\d+/,
          lookbehind: !0,
          alias: "variable"
        },
        attribute: { pattern: /@\w+/, alias: "variable" },
        number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
        keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
        boolean: /\b(?:true|false|nil)\b/,
        operator: [
          /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
          { pattern: /([^<])<(?!<)/, lookbehind: !0 },
          { pattern: /([^>])>(?!>)/, lookbehind: !0 }
        ],
        punctuation: /<<|>>|[.,%\[\]{}()]/
      }),
      b.a.languages.elixir.string.forEach(function(e) {
        e.inside = {
          interpolation: {
            pattern: /#\{[^}]+\}/,
            inside: {
              delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
              rest: b.a.languages.elixir
            }
          }
        };
      }),
      (b.a.languages.erlang = {
        comment: /%.+/,
        string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
        "quoted-function": {
          pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
          alias: "function"
        },
        "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
        boolean: /\b(?:true|false)\b/,
        keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
        number: [
          /\$\\?./,
          /\d+#[a-z0-9]+/i,
          /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i
        ],
        function: /\b[a-z][\w@]*(?=\()/,
        variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
        operator: [
          /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
          { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
          { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 }
        ],
        atom: /\b[a-z][\w@]*/,
        punctuation: /[()[\]{}:;,.#|]|<<|>>/
      }),
      (b.a.languages.git = {
        comment: /^#.*/m,
        deleted: /^[-–].*/m,
        inserted: /^\+.*/m,
        string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
        command: {
          pattern: /^.*\$ git .*$/m,
          inside: { parameter: /\s--?\w+/m }
        },
        coord: /^@@.*@@$/m,
        commit_sha1: /^commit \w{40}$/m
      }),
      (b.a.languages.go = b.a.languages.extend("clike", {
        keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
        builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
        boolean: /\b(?:_|iota|nil|true|false)\b/,
        operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
        number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
        string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 }
      })),
      delete b.a.languages.go["class-name"],
      (b.a.languages.graphql = {
        comment: /#.*/,
        string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
        number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        boolean: /\b(?:true|false)\b/,
        variable: /\$[a-z_]\w*/i,
        directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
        "attr-name": /[a-z_]\w*(?=\s*:)/i,
        keyword: [
          {
            pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.{3}\s*)on\b/,
            lookbehind: !0
          },
          /\b(?:query|fragment|mutation)\b/
        ],
        operator: /!|=|\.{3}/,
        punctuation: /[!(){}\[\]:=,]/
      }),
      (b.a.languages["markup-templating"] = {}),
      Object.defineProperties(b.a.languages["markup-templating"], {
        buildPlaceholders: {
          value: function(e, t, n, r) {
            e.language === t &&
              ((e.tokenStack = []),
              (e.code = e.code.replace(n, function(n) {
                if ("function" == typeof r && !r(n)) return n;
                for (
                  var a = e.tokenStack.length;
                  -1 !== e.code.indexOf("___" + t.toUpperCase() + a + "___");

                )
                  ++a;
                return (
                  (e.tokenStack[a] = n), "___" + t.toUpperCase() + a + "___"
                );
              })),
              (e.grammar = b.a.languages.markup));
          }
        },
        tokenizePlaceholders: {
          value: function(e, t) {
            if (e.language === t && e.tokenStack) {
              e.grammar = b.a.languages[t];
              var n = 0,
                r = Object.keys(e.tokenStack);
              !(function a(o) {
                if (!(n >= r.length))
                  for (var i = 0; i < o.length; i++) {
                    var s = o[i];
                    if (
                      "string" == typeof s ||
                      (s.content && "string" == typeof s.content)
                    ) {
                      var l = r[n],
                        u = e.tokenStack[l],
                        c = "string" == typeof s ? s : s.content,
                        d = c.indexOf("___" + t.toUpperCase() + l + "___");
                      if (d > -1) {
                        ++n;
                        var p,
                          f = c.substring(0, d),
                          g = new b.a.Token(
                            t,
                            b.a.tokenize(u, e.grammar, t),
                            "language-" + t,
                            u
                          ),
                          m = c.substring(
                            d + ("___" + t.toUpperCase() + l + "___").length
                          );
                        if (
                          (f || m
                            ? a(
                                (p = [f, g, m].filter(function(e) {
                                  return !!e;
                                }))
                              )
                            : (p = g),
                          "string" == typeof s
                            ? Array.prototype.splice.apply(o, [i, 1].concat(p))
                            : (s.content = p),
                          n >= r.length)
                        )
                          break;
                      }
                    } else
                      s.content && "string" != typeof s.content && a(s.content);
                  }
              })(e.tokens);
            }
          }
        }
      }),
      (function(e) {
        (e.languages.handlebars = {
          comment: /\{\{![\s\S]*?\}\}/,
          delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
          string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
          boolean: /\b(?:true|false)\b/,
          block: {
            pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
            lookbehind: !0,
            alias: "keyword"
          },
          brackets: {
            pattern: /\[[^\]]+\]/,
            inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ }
          },
          punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
          variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/
        }),
          e.hooks.add("before-tokenize", function(t) {
            e.languages["markup-templating"].buildPlaceholders(
              t,
              "handlebars",
              /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
            );
          }),
          e.hooks.add("after-tokenize", function(t) {
            e.languages["markup-templating"].tokenizePlaceholders(
              t,
              "handlebars"
            );
          });
      })(b.a),
      (b.a.languages.haskell = {
        comment: {
          pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
          lookbehind: !0
        },
        char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
        string: {
          pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
          greedy: !0
        },
        keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
        import_statement: {
          pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
          lookbehind: !0,
          inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ }
        },
        builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
        number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
        operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
        hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
        constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
        punctuation: /[{}[\];(),.:]/
      }),
      (b.a.languages.java = b.a.languages.extend("clike", {
        keyword: /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
        number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
        operator: {
          pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
          lookbehind: !0
        }
      })),
      b.a.languages.insertBefore("java", "function", {
        annotation: {
          alias: "punctuation",
          pattern: /(^|[^.])@\w+/,
          lookbehind: !0
        }
      }),
      b.a.languages.insertBefore("java", "class-name", {
        generics: {
          pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
          alias: "function",
          inside: {
            keyword: b.a.languages.java.keyword,
            punctuation: /[<>(),.:]/
          }
        }
      }),
      (b.a.languages.json = {
        property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
        string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        punctuation: /[{}[\]);,]/,
        operator: /:/g,
        boolean: /\b(?:true|false)\b/i,
        null: /\bnull\b/i
      }),
      (b.a.languages.jsonp = b.a.languages.json),
      (s = {
        "equation-command": {
          pattern: (i = /\\(?:[^a-z()[\]]|[a-z*]+)/i),
          alias: "regex"
        }
      }),
      (b.a.languages.latex = {
        comment: /%.*/m,
        cdata: {
          pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
          lookbehind: !0
        },
        equation: [
          {
            pattern: /\$(?:\\[\s\S]|[^\\$])*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
            inside: s,
            alias: "string"
          },
          {
            pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: !0,
            inside: s,
            alias: "string"
          }
        ],
        keyword: {
          pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: !0
        },
        url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
        headline: {
          pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
          lookbehind: !0,
          alias: "class-name"
        },
        function: { pattern: i, alias: "selector" },
        punctuation: /[[\]{}&]/
      }),
      (b.a.languages.less = b.a.languages.extend("css", {
        comment: [
          /\/\*[\s\S]*?\*\//,
          { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }
        ],
        atrule: {
          pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
          inside: { punctuation: /[:()]/ }
        },
        selector: {
          pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
          inside: { variable: /@+[\w-]+/ }
        },
        property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
        punctuation: /[{}();:,]/,
        operator: /[+\-*\/]/
      })),
      b.a.languages.insertBefore("less", "punctuation", {
        function: b.a.languages.less.function
      }),
      b.a.languages.insertBefore("less", "property", {
        variable: [
          { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
          /@@?[\w-]+/
        ],
        "mixin-usage": {
          pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
          lookbehind: !0,
          alias: "function"
        }
      }),
      (b.a.languages.makefile = {
        comment: {
          pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
          lookbehind: !0
        },
        string: {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: !0
        },
        builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
        symbol: {
          pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
          inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ }
        },
        variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
        keyword: [
          /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
          {
            pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
            lookbehind: !0
          }
        ],
        operator: /(?:::|[?:+!])?=|[|@]/,
        punctuation: /[:;(){}]/
      }),
      (b.a.languages.markdown = b.a.languages.extend("markup", {})),
      b.a.languages.insertBefore("markdown", "prolog", {
        blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
        code: [
          { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
          { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" }
        ],
        title: [
          {
            pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
            alias: "important",
            inside: { punctuation: /==+$|--+$/ }
          },
          {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: "important",
            inside: { punctuation: /^#+|#+$/ }
          }
        ],
        hr: {
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: !0,
          alias: "punctuation"
        },
        list: {
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: !0,
          alias: "punctuation"
        },
        "url-reference": {
          pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
          },
          alias: "url"
        },
        bold: {
          pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
          lookbehind: !0,
          inside: { punctuation: /^\*\*|^__|\*\*$|__$/ }
        },
        italic: {
          pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
          lookbehind: !0,
          inside: { punctuation: /^[*_]|[*_]$/ }
        },
        url: {
          pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
          inside: {
            variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
            string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ }
          }
        }
      }),
      (b.a.languages.markdown.bold.inside.url = b.a.languages.markdown.url),
      (b.a.languages.markdown.italic.inside.url = b.a.languages.markdown.url),
      (b.a.languages.markdown.bold.inside.italic =
        b.a.languages.markdown.italic),
      (b.a.languages.markdown.italic.inside.bold = b.a.languages.markdown.bold),
      (b.a.languages.objectivec = b.a.languages.extend("c", {
        keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
        string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
      })),
      (b.a.languages.ocaml = {
        comment: /\(\*[\s\S]*?\*\)/,
        string: [
          { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
          {
            pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
            greedy: !0
          }
        ],
        number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
        type: { pattern: /\B['`]\w*/, alias: "variable" },
        directive: { pattern: /\B#\w+/, alias: "function" },
        keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
        boolean: /\b(?:false|true)\b/,
        operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
        punctuation: /[(){}\[\]|_.,:;]/
      }),
      (function(e) {
        (e.languages.php = e.languages.extend("clike", {
          keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
          constant: /\b[A-Z0-9_]{2,}\b/,
          comment: {
            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
            lookbehind: !0
          }
        })),
          e.languages.insertBefore("php", "string", {
            "shell-comment": {
              pattern: /(^|[^\\])#.*/,
              lookbehind: !0,
              alias: "comment"
            }
          }),
          e.languages.insertBefore("php", "keyword", {
            delimiter: { pattern: /\?>|<\?(?:php|=)?/i, alias: "important" },
            variable: /\$+(?:\w+\b|(?={))/i,
            package: {
              pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
              lookbehind: !0,
              inside: { punctuation: /\\/ }
            }
          }),
          e.languages.insertBefore("php", "operator", {
            property: { pattern: /(->)[\w]+/, lookbehind: !0 }
          }),
          e.languages.insertBefore("php", "string", {
            "nowdoc-string": {
              pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
              greedy: !0,
              alias: "string",
              inside: {
                delimiter: {
                  pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                  alias: "symbol",
                  inside: { punctuation: /^<<<'?|[';]$/ }
                }
              }
            },
            "heredoc-string": {
              pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
              greedy: !0,
              alias: "string",
              inside: {
                delimiter: {
                  pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                  alias: "symbol",
                  inside: { punctuation: /^<<<"?|[";]$/ }
                },
                interpolation: null
              }
            },
            "single-quoted-string": {
              pattern: /'(?:\\[\s\S]|[^\\'])*'/,
              greedy: !0,
              alias: "string"
            },
            "double-quoted-string": {
              pattern: /"(?:\\[\s\S]|[^\\"])*"/,
              greedy: !0,
              alias: "string",
              inside: { interpolation: null }
            }
          }),
          delete e.languages.php.string;
        var t = {
          pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
          lookbehind: !0,
          inside: { rest: e.languages.php }
        };
        (e.languages.php["heredoc-string"].inside.interpolation = t),
          (e.languages.php["double-quoted-string"].inside.interpolation = t),
          e.hooks.add("before-tokenize", function(t) {
            if (/(?:<\?php|<\?)/gi.test(t.code)) {
              e.languages["markup-templating"].buildPlaceholders(
                t,
                "php",
                /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi
              );
            }
          }),
          e.hooks.add("after-tokenize", function(t) {
            e.languages["markup-templating"].tokenizePlaceholders(t, "php");
          });
      })(b.a),
      b.a.languages.insertBefore("php", "variable", {
        this: /\$this\b/,
        global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
        scope: {
          pattern: /\b[\w\\]+::/,
          inside: { keyword: /static|self|parent/, punctuation: /::|\\/ }
        }
      }),
      (b.a.languages.python = {
        comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
        "triple-quoted-string": {
          pattern: /("""|''')[\s\S]+?\1/,
          greedy: !0,
          alias: "string"
        },
        string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
        function: {
          pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
          lookbehind: !0
        },
        "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
        keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
        builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
        boolean: /\b(?:True|False|None)\b/,
        number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
        operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
        punctuation: /[{}[\];(),.:]/
      }),
      (b.a.languages.reason = b.a.languages.extend("clike", {
        comment: { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
        string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
        "class-name": /\b[A-Z]\w*/,
        keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
        operator: /\.{3}|:[:=]|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
      })),
      b.a.languages.insertBefore("reason", "class-name", {
        character: {
          pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
          alias: "string"
        },
        constructor: { pattern: /\b[A-Z]\w*\b(?!\s*\.)/, alias: "variable" },
        label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" }
      }),
      delete b.a.languages.reason.function,
      (function(e) {
        e.languages.ruby = e.languages.extend("clike", {
          comment: [
            /#.*/,
            {
              pattern: /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
              greedy: !0
            }
          ],
          keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
        });
        var t = {
          pattern: /#\{[^}]+\}/,
          inside: {
            delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
            rest: e.languages.ruby
          }
        };
        e.languages.insertBefore("ruby", "keyword", {
          regex: [
            {
              pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
              lookbehind: !0,
              greedy: !0
            }
          ],
          variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
          symbol: {
            pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
            lookbehind: !0
          }
        }),
          e.languages.insertBefore("ruby", "number", {
            builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
            constant: /\b[A-Z]\w*(?:[?!]|\b)/
          }),
          (e.languages.ruby.string = [
            {
              pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
              greedy: !0,
              inside: { interpolation: t }
            },
            {
              pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
              inside: { interpolation: t }
            }
          ]);
      })(b.a),
      (b.a.languages.rust = {
        comment: [
          { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
        ],
        string: [
          { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
          { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 }
        ],
        char: {
          pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
          alias: "string"
        },
        "lifetime-annotation": { pattern: /'[^\s>']+/, alias: "symbol" },
        keyword: /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,
        attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: "attr-name" },
        function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
        "macro-rules": { pattern: /\w+!/, alias: "function" },
        number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
        "closure-params": {
          pattern: /\|[^|]*\|(?=\s*[{-])/,
          inside: { punctuation: /[|:,]/, operator: /[&*]/ }
        },
        punctuation: /[{}[\];(),:]|\.+|->/,
        operator: /[-+*\/%!^]=?|=[=>]?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/
      }),
      (function(e) {
        (e.languages.sass = e.languages.extend("css", {
          comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
            lookbehind: !0
          }
        })),
          e.languages.insertBefore("sass", "atrule", {
            "atrule-line": {
              pattern: /^(?:[ \t]*)[@+=].+/m,
              inside: { atrule: /(?:@[\w-]+|[+=])/m }
            }
          }),
          delete e.languages.sass.atrule;
        var t = /\$[-\w]+|#\{\$[-\w]+\}/,
          n = [
            /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
            { pattern: /(\s+)-(?=\s)/, lookbehind: !0 }
          ];
        e.languages.insertBefore("sass", "property", {
          "variable-line": {
            pattern: /^[ \t]*\$.+/m,
            inside: { punctuation: /:/, variable: t, operator: n }
          },
          "property-line": {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
            inside: {
              property: [
                /[^:\s]+(?=\s*:)/,
                { pattern: /(:)[^:\s]+/, lookbehind: !0 }
              ],
              punctuation: /:/,
              variable: t,
              operator: n,
              important: e.languages.sass.important
            }
          }
        }),
          delete e.languages.sass.property,
          delete e.languages.sass.important,
          delete e.languages.sass.selector,
          e.languages.insertBefore("sass", "punctuation", {
            selector: {
              pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
              lookbehind: !0
            }
          });
      })(b.a),
      (b.a.languages.scss = b.a.languages.extend("css", {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: !0
        },
        atrule: {
          pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
          inside: { rule: /@[\w-]+/ }
        },
        url: /(?:[-a-z]+-)*url(?=\()/i,
        selector: {
          pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
          inside: {
            parent: { pattern: /&/, alias: "important" },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/
          }
        }
      })),
      b.a.languages.insertBefore("scss", "atrule", {
        keyword: [
          /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
          { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 }
        ]
      }),
      (b.a.languages.scss.property = {
        pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }
      }),
      b.a.languages.insertBefore("scss", "important", {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
      }),
      b.a.languages.insertBefore("scss", "function", {
        placeholder: { pattern: /%[-\w]+/, alias: "selector" },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
        boolean: /\b(?:true|false)\b/,
        null: /\bnull\b/,
        operator: {
          pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
          lookbehind: !0
        }
      }),
      (b.a.languages.scss.atrule.inside.rest = b.a.languages.scss),
      (b.a.languages.sql = {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
          lookbehind: !0
        },
        string: {
          pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
          greedy: !0,
          lookbehind: !0
        },
        variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
        function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
        keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
        boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
        number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
        operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
        punctuation: /[;[\]()`,.]/
      }),
      (function(e) {
        var t = {
          url: /url\((["']?).*?\1\)/i,
          string: {
            pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
            greedy: !0
          },
          interpolation: null,
          func: null,
          important: /\B!(?:important|optional)\b/i,
          keyword: {
            pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
            lookbehind: !0
          },
          hexcode: /#[\da-f]{3,6}/i,
          number: /\b\d+(?:\.\d+)?%?/,
          boolean: /\b(?:true|false)\b/,
          operator: [
            /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
          ],
          punctuation: /[{}()\[\];:,]/
        };
        (t.interpolation = {
          pattern: /\{[^\r\n}:]+\}/,
          alias: "variable",
          inside: {
            delimiter: { pattern: /^{|}$/, alias: "punctuation" },
            rest: t
          }
        }),
          (t.func = {
            pattern: /[\w-]+\([^)]*\).*/,
            inside: { function: /^[^(]+/, rest: t }
          }),
          (e.languages.stylus = {
            comment: {
              pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
              lookbehind: !0
            },
            "atrule-declaration": {
              pattern: /(^\s*)@.+/m,
              lookbehind: !0,
              inside: { atrule: /^@[\w-]+/, rest: t }
            },
            "variable-declaration": {
              pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
              lookbehind: !0,
              inside: { variable: /^\S+/, rest: t }
            },
            statement: {
              pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
              lookbehind: !0,
              inside: { keyword: /^\S+/, rest: t }
            },
            "property-declaration": {
              pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
              lookbehind: !0,
              inside: {
                property: {
                  pattern: /^[^\s:]+/,
                  inside: { interpolation: t.interpolation }
                },
                rest: t
              }
            },
            selector: {
              pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
              lookbehind: !0,
              inside: { interpolation: t.interpolation, punctuation: /[{},]/ }
            },
            func: t.func,
            string: t.string,
            interpolation: t.interpolation,
            punctuation: /[{}()\[\];:.]/
          });
      })(b.a),
      (b.a.languages.swift = b.a.languages.extend("clike", {
        string: {
          pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: !0,
          inside: {
            interpolation: {
              pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
              inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } }
            }
          }
        },
        keyword: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
        number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
        constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
        atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
        builtin: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
      })),
      (b.a.languages.swift.string.inside.interpolation.inside.rest =
        b.a.languages.swift),
      (b.a.languages.typescript = b.a.languages.extend("javascript", {
        keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\b/,
        builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/
      })),
      (b.a.languages.ts = b.a.languages.typescript),
      (b.a.languages.vim = {
        string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
        comment: /".*/,
        function: /\w+(?=\()/,
        keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
        builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
        number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
        operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
        punctuation: /[{}[\](),;:]/
      }),
      (b.a.languages.yaml = {
        scalar: {
          pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
          lookbehind: !0,
          alias: "string"
        },
        comment: /#.*/,
        key: {
          pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
          lookbehind: !0,
          alias: "atrule"
        },
        directive: {
          pattern: /(^[ \t]*)%.+/m,
          lookbehind: !0,
          alias: "important"
        },
        datetime: {
          pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
          lookbehind: !0,
          alias: "number"
        },
        boolean: {
          pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
          lookbehind: !0,
          alias: "important"
        },
        null: {
          pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
          lookbehind: !0,
          alias: "important"
        },
        string: {
          pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}))/m,
          lookbehind: !0,
          greedy: !0
        },
        number: {
          pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
          lookbehind: !0
        },
        tag: /![^\s]+/,
        important: /[&*][\w]+/,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
      });
    var v = b.a,
      y = n(95),
      _ = { Prism: v, theme: n.n(y).a },
      E = /\r\n|\r|\n/,
      w = function(e) {
        0 === e.length
          ? e.push({ types: ["plain"], content: "", empty: !0 })
          : 1 === e.length && "" === e[0].content && (e[0].empty = !0);
      },
      O = function(e) {
        for (
          var t = [[]],
            n = [e],
            r = [0],
            a = [e.length],
            o = 0,
            i = 0,
            s = [],
            l = [s];
          i > -1;

        ) {
          for (; (o = r[i]++) < a[i]; ) {
            var u = void 0,
              c = t[i],
              d = n[i][o];
            if (
              ("string" == typeof d
                ? ((c = i > 0 ? c : ["plain"]), (u = d))
                : ((c = c[0] === d.type ? c : c.concat(d.type)),
                  (u = d.content)),
              "string" == typeof u)
            ) {
              var p = u.split(E),
                f = p.length;
              s.push({ types: c, content: p[0] });
              for (var g = 1; g < f; g++)
                w(s), l.push((s = [])), s.push({ types: c, content: p[g] });
            } else i++, t.push(c), n.push(u), r.push(0), a.push(u.length);
          }
          i--, t.pop(), n.pop(), r.pop(), a.pop();
        }
        return w(s), l;
      };
    function k() {
      return (k =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    var x = function(e, t) {
      var n = e.plain,
        r = Object.create(null),
        a = e.styles.reduce(function(e, n) {
          n.types;
          var r = n.languages,
            a = n.style;
          return r && !r.includes(t)
            ? e
            : (n.types.forEach(function(t) {
                var n = k({}, e[t], a);
                e[t] = n;
              }),
              e);
        }, r);
      return (a.root = n), (a.plain = k({}, n, { backgroundColor: null })), a;
    };
    function T() {
      return (T =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function S(e, t) {
      if (null == e) return {};
      var n,
        r,
        a = {},
        o = Object.keys(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
      return a;
    }
    var A = (function(e) {
        var t, n;
        function r(t) {
          var n;
          return (
            ((n = e.call(this, t) || this).themeDict = void 0),
            (n.getLineProps = function(e) {
              var t = e.key,
                r = e.className,
                a = e.style,
                o = (e.line,
                T({}, S(e, ["key", "className", "style", "line"]), {
                  className: "token-line",
                  style: void 0,
                  key: void 0
                }));
              return (
                void 0 !== n.themeDict && (o.style = n.themeDict.plain),
                void 0 !== a &&
                  (o.style = void 0 !== o.style ? T({}, o.style, a) : a),
                void 0 !== t && (o.key = t),
                r && (o.className += " " + r),
                o
              );
            }),
            (n.getStyleForToken = function(e) {
              var t = e.types,
                r = e.empty,
                a = t.length;
              if (void 0 !== n.themeDict) {
                if (1 === a && "plain" === t[0])
                  return r ? { display: "inline-block" } : void 0;
                if (1 === a && !r) return n.themeDict[t[0]];
                var o = r ? { display: "inline-block" } : {},
                  i = t.map(function(e) {
                    return n.themeDict[e];
                  });
                return Object.assign.apply(Object, [o].concat(i));
              }
            }),
            (n.getTokenProps = function(e) {
              var t = e.key,
                r = e.className,
                a = e.style,
                o = e.token,
                i = T({}, S(e, ["key", "className", "style", "token"]), {
                  className: "token " + o.types.join(" "),
                  children: o.content,
                  style: n.getStyleForToken(o),
                  key: void 0
                });
              return (
                void 0 !== a &&
                  (i.style = void 0 !== i.style ? T({}, i.style, a) : a),
                void 0 !== t && (i.key = t),
                r && (i.className += " " + r),
                i
              );
            }),
            t.theme && (n.themeDict = x(t.theme, t.language)),
            n
          );
        }
        return (
          (n = e),
          ((t = r).prototype = Object.create(n.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = n),
          (r.prototype.render = function() {
            var e = this.props,
              t = e.Prism,
              n = e.language,
              r = e.code,
              a = e.children,
              o = t.languages[n],
              i = void 0 !== o ? t.tokenize(r, o, n) : [r];
            return a({
              tokens: O(i),
              className: "prism-code language-" + n,
              style: this.themeDict ? this.themeDict.root : {},
              getLineProps: this.getLineProps,
              getTokenProps: this.getTokenProps
            });
          }),
          r
        );
      })(l.Component),
      N = n(39),
      C = n.n(N),
      L = n(96),
      R = n.n(L);
    function I() {
      return (I =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function j(e, t) {
      if (null == e) return {};
      var n,
        r,
        a = (function(e, t) {
          if (null == e) return {};
          var n,
            r,
            a = {},
            o = Object.keys(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
          return a;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++)
          (n = o[r]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (a[n] = e[n]));
      }
      return a;
    }
    const P = e => {
      let t = e.active,
        n = e.children,
        r = e.onClick,
        a = j(e, ["active", "children", "onClick"]);
      return u.a.createElement(
        "button",
        I(
          {
            className: R()({ [f.a.tabButton]: !0, [f.a.activeTabBtn]: t }),
            onClick: r
          },
          a
        ),
        n
      );
    };
    (P.defaultProps = { active: !1 }),
      (P.propTypes = {
        active: d.a.bool,
        children: d.a.node.isRequired,
        onClick: d.a.func.isRequired
      });
    var M = P;
    class D extends u.a.Component {
      render() {
        const e = this.props,
          t = e.tabs,
          n = e.active,
          r = e.onChange;
        return u.a.createElement(
          "div",
          { className: f.a.header },
          t.map(e =>
            u.a.createElement(
              M,
              {
                key: e.value,
                value: e.value,
                active: e.value === n,
                onClick: r
              },
              e.label
            )
          )
        );
      }
    }
    D.propTypes = {
      active: d.a.oneOf(["html", "css", "js", "result", "console"]).isRequired,
      onChange: d.a.func.isRequired
    };
    var B = D;
    function F() {
      return (F =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }).apply(this, arguments);
    }
    function U(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    const G = {
      root: (function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function(t) {
              U(e, t, n[t]);
            });
        }
        return e;
      })(
        {
          boxSizing: "border-box",
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          height: "calc(100% - 3rem)"
        },
        C.a.plain
      )
    };
    class H extends l.Component {
      constructor() {
        super(...arguments),
          U(this, "snippets", [
            { label: "HTML", value: "html" },
            { label: "CSS", value: "css" },
            { label: "JS", value: "js" }
          ]),
          U(this, "onValueChange", e => {
            this.props.onChange(e, this.props.language);
          }),
          U(this, "onChangeCodeTabs", e => {
            const t = e.target.value;
            this.props.onChangeTab(t, "left");
          }),
          U(this, "highlight", e =>
            u.a.createElement(
              A,
              F({}, _, { theme: C.a, code: e, language: this.props.language }),
              e => {
                e.className, e.style;
                let t = e.tokens,
                  n = e.getLineProps,
                  r = e.getTokenProps;
                return u.a.createElement(
                  l.Fragment,
                  null,
                  t.map((e, t) =>
                    u.a.createElement(
                      "div",
                      n({ line: e, key: t }),
                      e.map((e, t) =>
                        u.a.createElement("span", r({ token: e, key: t }))
                      )
                    )
                  )
                );
              }
            )
          );
      }
      render() {
        const e = this.props,
          t = e.code,
          n = e.language;
        return u.a.createElement(
          "div",
          { className: f.a.editorArea },
          u.a.createElement(B, {
            tabs: this.snippets,
            active: n,
            onChange: this.onChangeCodeTabs
          }),
          u.a.createElement(m.a, {
            value: t,
            onValueChange: this.onValueChange,
            highlight: this.highlight,
            padding: 10,
            style: G.root
          })
        );
      }
    }
    (H.defaultProps = { language: "js", code: "", theme: C.a }),
      (H.propTypes = {
        code: d.a.string,
        language: d.a.oneOf(["html", "css", "js"]),
        onChange: d.a.func.isRequired,
        onChangeTab: d.a.func.isRequired,
        theme: d.a.any
      });
    var z = H;
    var $ = function(e, t) {
        let n = e.html;
        return `\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8"/>\n      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>\n      <title>Document</title>\n      <style>${
          e.css
        }</style>\n    </head>\n    <body>\n      ${n}\n      <span></span>\n      <script>\n        var _privateLog = console.log;\n        console.log = function(...rest) {\n          if(typeof window !== 'undefined') {\n            window.parent.postMessage({\n              source: "frame-${t}",\n              message: rest,\n            }, "*");\n          }\n          _privateLog.apply(console, arguments);\n        }\n      <\/script>\n      <script>\n        ${
          e.js
        }\n      <\/script>\n    </body>\n    </html>\n  `;
      },
      V = n(65),
      q = n.n(V);
    function K(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {},
          r = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols &&
          (r = r.concat(
            Object.getOwnPropertySymbols(n).filter(function(e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })
          )),
          r.forEach(function(t) {
            W(e, t, n[t]);
          });
      }
      return e;
    }
    function W(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    class Z extends u.a.Component {
      render() {
        return u.a.createElement(
          "div",
          { className: f.a.consoleArea },
          this.props.logs.map((e, t) =>
            u.a.createElement(q.a, {
              data: e,
              key: t,
              theme: K({}, V.chromeDark, { BASE_FONT_SIZE: "20px" })
            })
          )
        );
      }
    }
    Z.propTypes = { logs: d.a.array.isRequired };
    var Y = Z;
    function X(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    class J extends l.Component {
      constructor() {
        super(...arguments),
          X(this, "state", { logs: [] }),
          X(this, "tabs", [
            { label: "Result", value: "result" },
            { label: "Console", value: "console" }
          ]),
          X(this, "waitForMessage", () => {
            if ("undefined" != typeof window) {
              const e = this.props.id;
              window.addEventListener("message", t => {
                t.data.source === `frame-${e}` &&
                  this.setState(e => ({
                    logs: [...e.logs, ...t.data.message]
                  }));
              });
            }
          }),
          X(this, "onChangeResultTabs", e => {
            const t = e.target.value;
            this.props.onChangeTab(t, "right");
          }),
          X(this, "frameStyling", () => {
            return "console" === this.props.active
              ? { position: "absolute", opacity: 0, top: -1024, left: -1024 }
              : {};
          });
      }
      componentDidMount() {
        this.waitForMessage();
      }
      render() {
        const e = this.props,
          t = e.id,
          n = e.active,
          r = e.code;
        return u.a.createElement(
          "div",
          { className: f.a.resultArea },
          u.a.createElement(B, {
            tabs: this.tabs,
            active: n,
            onChange: this.onChangeResultTabs
          }),
          u.a.createElement("iframe", {
            height: "100%",
            width: "100%",
            title: t,
            frameBorder: "0",
            srcDoc: r,
            style: this.frameStyling()
          }),
          "console" === n && u.a.createElement(Y, { logs: this.state.logs })
        );
      }
      componentDidUpdate(e) {
        e.code !== this.props.code && this.setState({ logs: [] });
      }
    }
    (J.defaultProps = { active: "result" }),
      (J.propTypes = {
        active: d.a.oneOf(["result", "console"]),
        code: d.a.string.isRequired,
        id: d.a.string.isRequired,
        onChangeTab: d.a.func.isRequired
      });
    var Q = J;
    function ee(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {},
          r = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols &&
          (r = r.concat(
            Object.getOwnPropertySymbols(n).filter(function(e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })
          )),
          r.forEach(function(t) {
            te(e, t, n[t]);
          });
      }
      return e;
    }
    function te(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    class ne extends l.Component {
      constructor(e) {
        super(e),
          te(this, "checkIfMobile", () => {
            window.matchMedia("(min-width: 600px)").matches &&
              this.setState({ isMobile: !1 });
          }),
          te(this, "onChangeCode", (e, t) => {
            this.setState(n => ({ snippets: ee({}, n.snippets, { [t]: e }) }));
          }),
          te(this, "onChangeTab", (e, t) => {
            this.setState(n => ({
              currentTab: ee({}, n.currentTab, { [t]: e })
            }));
          });
        const t = e.snippets,
          n = e.mode,
          r = {
            left: "js" === n ? "js" : "html",
            right: "js" === n ? "console" : "result"
          };
        this.state = { snippets: t, currentTab: r, isMobile: !0 };
      }
      componentDidMount() {
        this.checkIfMobile();
      }
      render() {
        const e = this.props.id,
          t = this.state,
          n = t.snippets,
          r = t.currentTab,
          a = (t.isMobile, $(n, e));
        return u.a.createElement(
          "div",
          { className: f.a.frame },
          u.a.createElement(z, {
            language: r.left,
            code: n[r.left],
            onChange: this.onChangeCode,
            onChangeTab: this.onChangeTab
          }),
          u.a.createElement(Q, {
            id: e,
            active: r.right,
            code: a,
            onChangeTab: this.onChangeTab
          })
        );
      }
    }
    (ne.defaultProps = { snippets: { html: "", css: "", js: "" }, mode: "js" }),
      (ne.propTypes = {
        snippets: d.a.shape({
          html: d.a.string,
          css: d.a.string,
          js: d.a.string
        }),
        mode: d.a.oneOf(["html", "js"]),
        theme: d.a.any,
        id: d.a.string.isRequired
      });
    t.default = ne;
  }
]);
//# sourceMappingURL=js-live.js.map
