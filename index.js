 ! function () {
     function e(t, n, r) {
         function i(a, s) {
             if (!n[a]) {
                 if (!t[a]) {
                     var c = "function" == typeof require && require;
                     if (!s && c) return c(a, !0);
                     if (o) return o(a, !0);
                     var u = new Error("Cannot find module '" + a + "'");
                     throw u.code = "MODULE_NOT_FOUND", u
                 }
                 var f = n[a] = {
                     exports: {}
                 };
                 t[a][0].call(f.exports, function (e) {
                     return i(t[a][1][e] || e)
                 }, f, f.exports, e, t, n, r)
             }
             return n[a].exports
         }
         for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
         return i
     }
     return e
 }()({
     1: [function (e, t, n) {
         var r = e("./util"),
             i = function (e) {
                 return this.ver = "1.5.2", this._conf = r.ext({}, i.dftCon), this.$a5 = {}, this.$a1 = [], this.hash = r.seq(), this.$a6(), this.setConfig(e), this.rip = r.getRandIP(), this.record = 999, this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"], this._common = {}, this
             };
         i.dftCon = {
             sample: 1,
             tag: "",
             imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
             region: null,
             ignore: {
                 ignoreUrls: [],
                 ignoreApis: [],
                 ignoreErrors: []
             },
             release: undefined,
             environment: "production"
         }, i.prototype = {
             constructor: i,
             $a2: function (e) {
                 return e()
             },
             $a7: function () {
                 var e = this._conf.page;
                 return r.$a8(e, [], e + "")
             },
             setPage: function () {},
             setConfig: function (e) {
                 e && "object" == typeof e && (r.$a9(e), e = this.$aa(e), this._conf = r.ext({}, this._conf, e))
             },
             $aa: function (e) {
                 var t = e.region,
                     n = e.imgUrl;
                 if (t) {
                     var i = r.regionMap[t];
                     return e.imgUrl = i || r.defaultImgUrl, e
                 }
                 return n && (e.imgUrl = n), e
             },
             $ab: function (e) {
                 if (this.getConfig("debug")) return !0;
                 var t = r.regionMap,
                     n = !1;
                 for (var i in t)
                     if (t[i] === e) {
                         n = !0;
                         break
                     } return !n && r.warn("[retcode] invalid url: " + e), n
             },
             $ac: function () {},
             $ad: function () {},
             $ae: function () {
                 return {}
             },
             setCommonInfo: function (e) {
                 e && "object" == typeof e && (this._common = r.ext({}, this._common, e))
             },
             $a6: function () {
                 this.session = r.uu(), this.sBegin = Date.now()
             },
             getTraceId: function () {
                 var e = this.rip,
                     t = Date.now(),
                     n = r.getSortNum(this.record),
                     i = e + t + n + r.getRandNum(this._conf.pid);
                 return this["EagleEye-TraceID"] = i, this.record = n, {
                     "EagleEye-TraceID": i
                 }
             },
             getSessionId: function () {
                 return {
                     "EagleEye-SessionID": this.session
                 }
             },
             getConfig: function (e) {
                 return e ? this._conf[e] : r.ext({}, this._conf)
             },
             $af: function (e) {
                 return 1 === e || ("boolean" == typeof this.$a5[e] ? this.$a5[e] : (this.$a5[e] = r.pick(e), this.$a5[e]))
             },
             $a4: function () {
                 var e;
                 for (clearTimeout(this.$a3), this.$a3 = null; e = this.$a1.pop();) "res" === e.t ? this.$ad(e, "res") : "error" === e.t ? this.$ad(e, "err") : this.$ac(e);
                 return this
             },
             _lg: function (e, t, n) {
                 var i = this._conf,
                     o = this.$a7(),
                     a = i.ignore || {},
                     s = a.ignoreErrors,
                     c = a.ignoreUrls,
                     u = a.ignoreApis;
                 return r.$ag(o, c) ? this : "error" === e && r.$ag(t.msg, s) ? this : "api" === e && r.$ag(t.api, u) ? this : this.$ab(i.imgUrl) && t && !i.disabled && i.pid ? n && !this.$af(n) ? this : (t = r.ext({
                     t: e,
                     times: 1,
                     page: o,
                     tag: i.tag || "",
                     begin: Date.now()
                 }, t, this.$ae(), this._common, {
                     pid: i.pid,
                     _v: this.ver,
                     sid: this.session,
                     sampling: n || 1,
                     z: r.seq()
                 }), function (e, t) {
                     var n; {
                         if ("error" !== t.t || !(n = e.$a1[0]) || "error" !== n.t || t.msg !== n.msg) return e.$a1.unshift(t), e.$a2(function () {
                             e.$a3 = r.delay(function () {
                                 e.$a4()
                             }, "error" === t.t ? 3e3 : -1)
                         }), !0;
                         n.times++
                     }
                 }(this, t)) : this
             },
             custom: function (e, t) {
                 if (!e || "object" != typeof e) return this;
                 var n = !1,
                     i = {
                         begin: Date.now()
                     };
                 return r.each(e, function (e, t) {
                     return !(n = t && t.length <= 20) && r.warn("[retcode] invalid key: " + t), i["x-" + t] = e, n
                 }), n ? this._lg("custom", i, t || 1) : this
             }
         }, t.exports = i
     }, {
         "./util": 14
     }],
     2: [function (e, t, n) {
         var r = e("../util"),
             i = e("../reporter"),
             o = e("../common/sender"),
             a = e("../common/post"),
             s = r.win,
             c = s.document,
             u = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig)$/,
             f = function (e) {
                 var t = this;
                 return i.call(t, e), t._initialPage = e.page && r.$a8(e.page, [], e.page + "") || null, t._health = {
                     errcount: 0,
                     apisucc: 0,
                     apifail: 0
                 }, t.$ah = function (e, n) {
                     "error" === e ? t._health.errcount++ : "api" === e && t._health[n.success ? "apisucc" : "apifail"]++
                 }, t.$ai(), t.$aj(), t.$ak(1e4), Object.defineProperty && s.addEventListener && Object.defineProperty(t, "pipe", {
                     set: t.$al
                 }), t
             };
         f.prototype = r.$am(i.prototype), r.ext(i._root.dftCon, {
             uid: null,
             ignoreUrlPath: [{
                 rule: /\/([a-z\-_]+)?\d{2,20}/g,
                 target: "/$1**"
             }, /\/$/],
             ignoreApiPath: {
                 rule: /(\w+)\/\d{2,}/g,
                 target: "$1"
             },
             urlHelper: [{
                 rule: /\/([a-z\-_]+)?\d{2,20}/g,
                 target: "/$1**"
             }, /\/$/],
             apiHelper: {
                 rule: /(\w+)\/\d{2,}/g,
                 target: "$1"
             },
             ignoreUrlCase: !0,
             imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
             disableHook: !1,
             autoSendPv: !0,
             enableSPA: !1,
             enableLinkTrace: !1,
             sendResource: !0,
             parseHash: function (e) {
                 return (e ? r.$ao(e.replace(/^#\/?/, "")) : "") || "[index]"
             },
             parseResponse: function (e) {
                 if (!e || "object" != typeof e) return {};
                 var t = e.code,
                     n = e.msg || e.message || e.subMsg || e.errorMsg || e.ret || e.errorResponse || "";
                 return "object" == typeof n && (t = t || n.code, n = n.msg || n.message || n.info || n.ret || JSON.stringify(n)), {
                     msg: n,
                     code: t,
                     success: !0
                 }
             }
         }), r.ext(f.prototype, {
             constructor: f,
             _super: i,
             $a2: function (e) {
                 var t = this;
                 if (t.hasReady) return e();
                 "complete" === c.readyState ? (t.hasReady = !0, e()) : r.on(s, "load", function () {
                     t.hasReady = !0, e()
                 }, !0)
             },
             $a7: function (e) {
                 var t = this._conf,
                     n = t.page,
                     i = location,
                     o = i.host + i.pathname;
                 return n && !e ? r.$a8(n, [], n + "") : this._initialPage || r.$an(t.ignoreUrlCase ? o.toLowerCase() : o, t.ignoreUrlPath)
             },
             setPage: function (e, t) {
                 var n = this,
                     r = n.$ap;
                 if (!1 !== t) {
                     if (!e || e === r) return n;
                     n.$ap = e, clearTimeout(n.$aq), n.$ar(1), n.$a6(), n.$aq = setTimeout(function () {
                         n.$as()
                     }, 10)
                 } else n.$ap = e;
                 return n._conf.page = e, n
             },
             setConfig: function (e, t) {
                 if (e && "object" == typeof e) {
                     r.$a9(e), e = this.$aa(e);
                     var n = this._conf;
                     if (this._conf = r.ext({}, n, e), !t) {
                         var i = "disableHook";
                         i in e && n[i] !== e[i] && (e[i] ? this.removeHook() : this.addHook()), (i = "enableSPA") in e && n[i] !== e[i] && this.$at(e[i])
                     }
                 }
             },
             $ac: function (e) {
                 o(e, this.getConfig("imgUrl"))
             },
             $ad: function (e, t) {
                 var n = {};
                 n[t] = e[t], delete e[t];
                 var i = "";
                 "object" == typeof e && (i = r.serialize(e)), a(n, this.getConfig("imgUrl") + i + "&post_res=")
             },
             $al: function (e) {
                 var t = this;
                 if (!e || !e.length) return t;
                 try {
                     if ("Array" === r.T(e[0])) return r.each(e, function (e) {
                         return t.$al(e)
                     });
                     if ("Array" !== r.T(e)) return t;
                     var n = e.shift();
                     if (!u.test(n)) return t;
                     t[n].apply(t, e)
                 } catch (i) {
                     return r.warn("[retcode] error in sendPipe", i), t
                 }
             },
             $au: function () {
                 var e = r.ext({}, this._health);
                 e.healthy = e.errcount > 0 ? 0 : 1, e.begin = Date.now();
                 var t = e.begin - this.sBegin;
                 e.stay = t, this._lg("health", e, 1), this._health = {
                     errcount: 0,
                     apisucc: 0,
                     apifail: 0
                 }
             },
             createInstance: function (e) {
                 e = r.ext({
                     pid: this._conf.pid
                 }, e);
                 var t = this.__proto__.constructor(e);
                 return e.page && t.$as(), t
             }
         }), e("./handler")(f, s, c), e("./fmp")(f, s, c), e("./hook")(f, s), e("./hack")(f, s), f._super = i, f._root = i._root, i.Browser = f, t.exports = f
     }, {
         "../common/post": 9,
         "../common/sender": 11,
         "../reporter": 13,
         "../util": 14,
         "./fmp": 3,
         "./hack": 4,
         "./handler": 5,
         "./hook": 6
     }],
     3: [function (e, t, n) {
         var r = e("../util"),
             i = 500;
         t.exports = function (e, t, n) {
             function o(e, t, n) {
                 var r = 0,
                     i = e.tagName;
                 if ("SCRIPT" !== i && "STYLE" !== i && "META" !== i && "HEAD" !== i) {
                     var a = e.children ? e.children.length : 0;
                     if (a > 0)
                         for (var c = e.children, u = a - 1; u >= 0; u--) r += o(c[u], t + 1, r > 0);
                     if (r <= 0 && !n) {
                         if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < s)) return 0
                     }
                     r += 1 + .5 * t
                 }
                 return r
             }

             function a(e) {
                 for (var t = 1; t < e.length; t++)
                     if (e[t].score < e[t - 1].score) return e.splice(t, 1), a(e);
                 return e
             }
             var s = t.innerHeight || 0,
                 c = [],
                 u = null,
                 f = 0;
             r.ext(e.prototype, {
                 $ak: function (e) {
                     var i = this;
                     if (!i._conf || !i._conf.useFmp) return null;
                     if (!t.MutationObserver) return r.warn("[retcode] first meaningful paint can not be retrieved"), i.$av(), null;
                     r.on(t, "beforeunload", function () {
                         i.$aw(0, !0)
                     });
                     var a = t.MutationObserver;
                     return (u = new a(function () {
                         ! function (e) {
                             var t = Date.now() - e,
                                 r = n.querySelector("body");
                             if (r) {
                                 var i = 0;
                                 i += o(r, 1, !1), c.push({
                                     score: i,
                                     t: t
                                 })
                             } else c.push({
                                 score: 0,
                                 t: t
                             })
                         }(i._startTime)
                     })).observe(document, {
                         childList: !0,
                         subtree: !0
                     }), f = 1, i.$a2(function () {
                         i.$aw(e)
                     }), u
                 },
                 $aw: function (e, t) {
                     var n = this;
                     if (u && f)
                         if (t || ! function (e, t) {
                                 var n = Date.now() - e;
                                 return !(n > t || n - (c && c.length && c[c.length - 1].t || 0) > 2 * i)
                             }(n._startTime, e)) {
                             u.disconnect(), f = 0, c = a(c);
                             for (var o = null, s = 1; s < c.length; s++)
                                 if (c[s].t >= c[s - 1].t) {
                                     var l = c[s].score - c[s - 1].score;
                                     (!o || o.rate <= l) && (o = {
                                         t: c[s].t,
                                         rate: l
                                     })
                                 } o && o.t > 0 ? n.$av({
                                 fmp: o.t
                             }) : n.$av()
                         } else r.delay(function () {
                             n.$aw(e)
                         }, i)
                 }
             })
         }
     }, {
         "../util": 14
     }],
     4: [function (e, t, n) {
         t.exports = function (t, n) {
             var r = e("../util"),
                 i = n.history || {},
                 o = n.document,
                 a = function (e, t) {
                     var r;
                     n.CustomEvent ? r = new CustomEvent(e, {
                         detail: t
                     }) : ((r = o.createEvent("HTMLEvents")).initEvent(e, !1, !0), r.detail = t), n.dispatchEvent(r)
                 },
                 s = function (e) {
                     var t = i[e];
                     "function" == typeof t && (i[e] = function (n, o, s) {
                         var c = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                             u = location.href,
                             f = t.apply(i, c);
                         if (!s || "string" != typeof s) return f;
                         if (s === u) return f;
                         try {
                             var l = u.split("#"),
                                 p = s.split("#"),
                                 h = r.$ao(l[0]),
                                 g = r.$ao(p[0]),
                                 d = l[1] && l[1].replace(/^\/?(.*)/, "$1"),
                                 v = p[1] && p[1].replace(/^\/?(.*)/, "$1");
                             h !== g ? a("historystatechange", g) : d !== v && a("historystatechange", v)
                         } catch (y) {
                             r.warn("[retcode] error in " + e + ": " + y)
                         }
                         return f
                     }, i[e].toString = r.$ax(e))
                 };
             r.ext(t.prototype, {
                 $ay: function () {
                     return this.$az ? this : (s("pushState"), s("replaceState"), this.$az = !0, this)
                 }
             })
         }
     }, {
         "../util": 14
     }],
     5: [function (e, t, n) {
         t.exports = function (t, n, r) {
             var i = e("../util"),
                 o = e("../common/perf"),
                 a = e("../common/res"),
                 s = null,
                 c = r.documentElement,
                 u = n.innerWidth || c.clientWidth || r.body.clientWidth,
                 f = n.innerHeight || c.clientHeight || r.body.clientHeight,
                 l = n.navigator.connection,
                 p = {
                     sr: screen.width + "x" + screen.height,
                     vp: u + "x" + f,
                     ct: l ? l.effectiveType || l.type : ""
                 },
                 h = {},
                 g = function (e, t, n, o, a) {
                     if (t === undefined) {
                         var s, c;
                         if (!h[e]) {
                             s = new RegExp(e + "=([^;]+)");
                             try {
                                 c = s.exec(r.cookie)
                             } catch (f) {
                                 return i.warn("[retcode] can not get cookie:", f), null
                             }
                             c && (h[e] = c[1])
                         }
                         return h[e]
                     }
                     var u = e + "=" + t;
                     o && (u += "; domain=" + o), u += "; path=" + (a || "/"), n && (u += "; max-age=" + n);
                     try {
                         return r.cookie = u, !!r.cookie
                     } catch (f) {
                         return i.warn("[retcode] can not set cookie: ", f), !1
                     }
                 },
                 d = function (e) {
                     var t = e._conf.uid || g("_nk_") || g("_bl_uid");
                     if (!t) {
                         t = i.uu();
                         if (!g("_bl_uid", t, 15552e3)) return null
                     }
                     return t
                 };
             return i.ext(t.prototype, {
                 activeErrHandler: function (e) {
                     return s && !e ? this : (s = this, this)
                 },
                 errorHandler: function (e) {
                     if (!e) return this;
                     var t = e.type;
                     return "error" === t ? this.error(e.error || {
                         message: e.message
                     }, e) : "unhandledrejection" === t && i.T(e.reason, "Error") && i.$b0(e.reason) && this.error(e.reason), this
                 },
                 $av: function (e) {
                     var t = this;
                     t.$a2(function () {
                         var n = o();
                         n && (n.page = t.$a7(!0), e && (n = i.ext(n, e)), t._lg("perf", n, t.getConfig("sample")))
                     })
                 },
                 $b1: function (e) {
                     var t = this;
                     t.$a2(function () {
                         var n = a();
                         n && (n.load && n.load <= 2e3 || n.load && n.load <= 8e3 && Math.random() > .05 || (n.page = t.$a7(!0), n.dl = location.href, e && (n = i.ext(n, e)), t._lg("res", n, t.getConfig("sample"))))
                     })
                 },
                 $as: function () {
                     var e = this;
                     e.$a2(function () {
                         var t = function (e) {
                             var t = d(e),
                                 i = n.devicePixelRatio || 1;
                             return {
                                 uid: t,
                                 dt: r.title,
                                 dl: location.href,
                                 dr: r.referrer,
                                 dpr: i.toFixed(2),
                                 de: (r.characterSet || r.defaultCharset || "").toLowerCase(),
                                 ul: c.lang,
                                 begin: Date.now()
                             }
                         }(e);
                         t && t.uid && e._lg("pv", t)
                     })
                 },
                 $ae: function () {
                     return p.uid = d(this), p
                 },
                 $ar: function (e) {
                     var t = Date.now();
                     if (t - this._lastUnload < 200) return this;
                     this._lastUnload = t, this.$au(e), this.$b2 && (this._lg("speed", this.$b2), this.$b2 = null, clearTimeout(this.$b3)), this.$a4()
                 },
                 $at: function (e) {
                     var t = this;
                     if (!e ^ t.$b4) return t;
                     e ? (t.$ay(), t.$b4 = function (e) {
                         var n = t._conf.parseHash(location.hash);
                         n && t.setPage(n, !1 !== e)
                     }, t.$b5 = function (e) {
                         var n = t._conf.parseHash(e.detail);
                         n && t.setPage(n)
                     }, i.on(n, "hashchange", t.$b4), i.on(n, "historystatechange", t.$b5), t.$b4(!1)) : (i.off(n, "hashchange", t.$b4), i.off(n, "historystatechange", t.$b5), t.$b4 = null, t.$b5 = null)
                 },
                 $ai: function () {
                     var e = this;
                     if (e.$b6) return e;
                     var t = e._conf;
                     return i.on(n, "beforeunload", function () {
                         e.$ar(0)
                     }), e.$at(t.enableSPA), e.activeErrHandler(!1), e.$b6 = !0, e
                 }
             }), i.on(n, "error", function (e) {
                 s && s.errorHandler(e)
             }).on(n, "unhandledrejection", function (e) {
                 s && s.errorHandler(e)
             }), t
         }
     }, {
         "../common/perf": 8,
         "../common/res": 10,
         "../util": 14
     }],
     6: [function (e, t, n) {
         t.exports = function (t, n) {
             var r = e("../util"),
                 i = null,
                 o = function (e, t, n, i, o, a, s, c, u, f) {
                     var l = r.J(o) || null,
                         p = r.$a8(t, [l, i], null);
                     if (!p) return !1;
                     var h = p.code || a,
                         g = !("success" in p) || p.success;
                     e.api(n, g, s, h, p.msg, c, u, f)
                 },
                 a = "fetch",
                 s = "__oFetch_",
                 c = "__oXMLHttpRequest_",
                 u = "XMLHttpRequest";
             return r.ext(t.prototype, {
                 removeHook: function (e, t) {
                     return i && (t || this === i) ? (n[s] && (n[a] = n[s], delete n[s]), n[c] && (n[u] = n[c], delete n[c]), i = null, this) : this
                 },
                 addHook: function (e) {
                     return !e && i ? this : (i || (function () {
                         if ("function" == typeof n[a]) {
                             var e = n[a];
                             n[s] = e, n[a] = function (t, a) {
                                 var s = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                                     c = i;
                                 if (!c || !c.api) return e.apply(n, s);
                                 if (a && ("HEAD" === a.method || "no-cors" === a.mode)) return e.apply(n, s);
                                 var u = Date.now(),
                                     f = c._conf,
                                     l = (t && "string" != typeof t ? t.url : t) || "",
                                     p = l;
                                 if (l = r.$ao(l), !r.$b7(l, !0)) return e.apply(n, s);
                                 l = r.$an(l, f.ignoreApiPath);
                                 var h = f.enableLinkTrace,
                                     g = "",
                                     d = "",
                                     v = c.getConfig("pid");
                                 if (h) {
                                     var y = "";
                                     try {
                                         y = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                                     } catch (w) {
                                         y = ""
                                     }
                                     if (r.checkSameOrigin(p, y)) {
                                         if (t && "string" != typeof t) try {
                                             if (s[0].headers && "function" == typeof s[0].headers.get && "function" == typeof s[0].headers.append) {
                                                 var m = s[0].headers.get("EagleEye-TraceID"),
                                                     $ = s[0].headers.get("EagleEye-SessionID"),
                                                     b = s[0].headers.get("EagleEye-pAppName");
                                                 m ? g = m : (g = c.getTraceId()["EagleEye-TraceID"], s[0].headers.append("EagleEye-TraceID", g)), $ ? d = $ : (d = c.getSessionId()["EagleEye-SessionID"], s[0].headers.append("EagleEye-SessionID", d)), b || s[0].headers.append("EagleEye-pAppName", v)
                                             }
                                         } catch (E) {
                                             r.warn("[retcode] fetch failed to set header, exception is :\n" + E)
                                         }
                                         a && (a.headers = a.headers ? a.headers : {}, a.headers["EagleEye-TraceID"] ? g = a.headers["EagleEye-TraceID"] : (g = c.getTraceId()["EagleEye-TraceID"], a.headers["EagleEye-TraceID"] = g), a.headers["EagleEye-SessionID"] ? d = a.headers["EagleEye-SessionID"] : (d = c.getSessionId()["EagleEye-SessionID"], a.headers["EagleEye-SessionID"] = d), a.headers["EagleEye-pAppName"] || (a.headers["EagleEye-pAppName"] = v))
                                     }
                                 }
                                 return e.apply(n, s).then(function (e) {
                                     if (!c || !c.api) return e;
                                     var t = e.clone(),
                                         n = t.headers;
                                     if (n && "function" == typeof n.get) {
                                         var r = n.get("content-type");
                                         if (r && !/(text)|(json)/.test(r)) return e
                                     }
                                     var i = Date.now() - u;
                                     return t.ok ? t.text().then(function (e) {
                                         o(c, f.parseResponse, l, p, e, t.status || 200, i, u, g, d)
                                     }) : c.api(l, !1, i, t.status || 404, t.statusText, u, g, d), e
                                 })["catch"](function (e) {
                                     if (!c || !c.api) throw e;
                                     var t = Date.now() - u;
                                     throw c.api(l, !1, t, e.name || "Error", e.message, u, g, d), e
                                 })
                             }, n[a].toString = r.$ax(a)
                         }
                     }(), function () {
                         if ("function" == typeof n[u]) {
                             var e = n[u];
                             n[c] = e, n[u] = function (t) {
                                 var n = new e(t),
                                     a = i;
                                 if (!a || !a.api || !n.addEventListener) return n;
                                 var s, c, u, f = n.send,
                                     l = n.open,
                                     p = n.setRequestHeader,
                                     h = a._conf,
                                     g = a.getConfig("enableLinkTrace"),
                                     d = "",
                                     v = "",
                                     y = "";
                                 return n.open = function (e, t) {
                                     var i = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                                     if (l.apply(n, i), u = t || "", c = r.$ao(u), c = c ? r.$an(c, h.ignoreApiPath) : "", g) {
                                         var o = "";
                                         try {
                                             o = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                                         } catch (s) {
                                             o = ""
                                         }
                                         r.checkSameOrigin(u, o) && p && "function" == typeof p && (d = a.getTraceId()["EagleEye-TraceID"], p.apply(n, ["EagleEye-TraceID", d]), v = a.getSessionId()["EagleEye-SessionID"], p.apply(n, ["EagleEye-SessionID", v]), y = a.getConfig("pid"), p.apply(n, ["EagleEye-pAppName", y]))
                                     }
                                 }, n.send = function () {
                                     s = Date.now();
                                     var e = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                                     f.apply(n, e)
                                 }, r.on(n, "readystatechange", function () {
                                     if (c && 4 === n.readyState) {
                                         var e = Date.now() - s;
                                         if (n.status >= 200 && n.status <= 299) {
                                             var t = n.status || 200;
                                             if ("function" == typeof n.getResponseHeader) {
                                                 var r = n.getResponseHeader("Content-Type");
                                                 if (r && !/(text)|(json)/.test(r)) return
                                             }
                                             n.responseType && "text" !== n.responseType ? a.api(c, !0, e, t, "", s, d, v) : o(a, h.parseResponse, c, u, n.responseText, t, e, s, d, v)
                                         } else a.api(c, !1, e, n.status || "FAILED", n.statusText, s, d, v)
                                     }
                                 }), n
                             }, n[u].toString = r.$ax(u)
                         }
                     }()), i = this, this)
                 },
                 $aj: function () {
                     return this.$b8 ? this : (this.getConfig("disableHook") || this.addHook(), this.$b8 = !0, this)
                 }
             }), t
         }
     }, {
         "../util": 14
     }],
     7: [function (e, t, n) {
         n.TIMING_KEYS = ["", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "", "domInteractive", "", "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart"]
     }, {}],
     8: [function (e, t, n) {
         var r = e("../util"),
             i = e("./constants").TIMING_KEYS;
         t.exports = function () {
             var e = r.win || {},
                 t = e.performance;
             if (!t || "object" != typeof t) return null;
             var n = {},
                 o = t.timing || {},
                 a = Date.now(),
                 s = 1;
             if ("function" == typeof e.PerformanceNavigationTiming) {
                 var c = t.getEntriesByType("navigation")[0];
                 c && (o = c, s = 2)
             }
             r.each({
                 dns: [3, 2],
                 tcp: [5, 4],
                 ssl: [5, 17],
                 ttfb: [7, 6],
                 trans: [8, 7],
                 dom: [10, 8],
                 res: [14, 12],
                 firstbyte: [7, 2],
                 fpt: [8, 1],
                 tti: [10, 1],
                 ready: [12, 1],
                 load: [14, 1]
             }, function (e, t) {
                 var r = o[i[e[1]]],
                     a = o[i[e[0]]];
                 if (2 === s || r > 0 && a > 0) {
                     var c = Math.round(a - r);
                     c >= 0 && c < 36e5 && (n[t] = c)
                 }
             });
             var u = e.navigator.connection,
                 f = t.navigation || {};
             n.ct = u ? u.effectiveType || u.type : "";
             var l = u ? u.downlinkMax || u.bandwidth || -1 : -1;
             return l = l > 999 ? 999 : l, n.bandwidth = l, n.navtype = 1 === f.type ? "Reload" : "Other", 1 === s && o[i[16]] > 0 && o[i[1]] > 0 && (n.fpt = o[i[16]] - o[i[1]]), 1 === s && o[i[1]] > 0 ? n.begin = o[i[1]] : 2 === s && n.load > 0 ? n.begin = a - n.load : n.begin = a, n
         }
     }, {
         "../util": 14,
         "./constants": 7
     }],
     9: [function (e, t, n) {
         var r = e("../util"),
             i = "object" == typeof window ? window : {},
             o = i.__oXMLHttpRequest_ || i.XMLHttpRequest;
         o = "function" == typeof o ? o : undefined, t.exports = function (e, t) {
             try {
                 var n = new o;
                 n.open("POST", t, !0), n.setRequestHeader("Content-Type", "text/plain"), n.send(JSON.stringify(e))
             } catch (i) {
                 r.warn("[retcode] Failed to log, exception is :\n" + i)
             }
         }
     }, {
         "../util": 14
     }],
     10: [function (e, t, n) {
         var r = e("../util"),
             i = e("./constants").TIMING_KEYS;
         t.exports = function () {
             var e = r.win || {},
                 t = e.performance;
             if (!t || "object" != typeof t || "function" != typeof t.getEntriesByType) return null;
             var n = {},
                 o = t.timing || {},
                 a = t.getEntriesByType("resource") || [];
             if (n.begin = o[i[1]] || Date.now(), "function" == typeof e.PerformanceNavigationTiming) {
                 var s = t.getEntriesByType("navigation")[0];
                 s && (o = s)
             }
             return r.each({
                 dom: [10, 8],
                 load: [14, 1]
             }, function (e, t) {
                 var r = o[i[e[1]]],
                     a = o[i[e[0]]];
                 if (r > 0 && a > 0) {
                     var s = Math.round(a - r);
                     s >= 0 && s < 36e5 && (n[t] = s)
                 }
             }), n.res = JSON.stringify(a), n
         }
     }, {
         "../util": 14,
         "./constants": 7
     }],
     11: [function (e, t, n) {
         var r = e("../util"),
             i = "object" == typeof window ? window : {},
             o = i.__oFetch_ || i.fetch;
         o = "function" == typeof o ? o : undefined, t.exports = function (e, t) {
             var n = -1;
             "object" == typeof e && (n = e.z, e = r.serialize(e));
             var a = t + e;
             if (o) return o(a, {
                 method: "HEAD",
                 mode: "no-cors"
             })["catch"](r.noop);
             if (i.document && i.document.createElement) {
                 var s = "__request_hold_" + n,
                     c = i[s] = new Image;
                 c.onload = c.onerror = function () {
                     i[s] = undefined
                 }, c.src = a, c = null
             }
         }
     }, {
         "../util": 14
     }],
     12: [function (e, t, n) {
         "use strict";

         function r(e, t) {
             var n = i[a] = new o(e);
             n.$al(t);
             var r = n._conf;
             return !1 !== r.autoSendPv && n.$as(), r && r.useFmp || n.$av(), r && r.sendResource && n.$b1(), i[s] = !0, n
         }
         var i = window,
             o = i.BrowserLogger = e("./biz.browser/clazz"),
             a = e("./util").key,
             s = "__hasInitBlSdk";
         o.singleton = function (e, t) {
             return i[s] ? i[a] : r(e, t)
         };
         "object" == typeof window && !!window.navigator && i[a] && (o.bl = function () {
             if (i[s]) return i[a];
             var e = {},
                 t = [];
             return a in i && (e = i[a].config || {}, t = i[a].pipe || []), r(e, t)
         }(i.__hasInitBlSdk)), t.exports = o
     }, {
         "./biz.browser/clazz": 2,
         "./util": 14
     }],
     13: [function (e, t, n) {
         var r = e("./util"),
             i = e("./base"),
             o = ["api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq"],
             a = function (e, t) {
                 var n = e.split("::");
                 return n.length > 1 ? r.ext({
                     group: n[0],
                     key: n[1]
                 }, t) : r.ext({
                     group: "default_group",
                     key: n[0]
                 }, t)
             },
             s = function (e) {
                 i.call(this, e);
                 var t;
                 try {
                     t = "object" == typeof performance ? performance.timing.fetchStart : Date.now()
                 } catch (n) {
                     t = Date.now()
                 }
                 return this._startTime = t, this
             };
         s.prototype = r.$am(i.prototype), r.ext(i.dftCon, {
             startTime: null
         }), r.ext(s.prototype, {
             constructor: s,
             _super: i,
             sum: function (e, t, n) {
                 try {
                     return this._lg("sum", a(e, {
                         val: t || 1,
                         begin: Date.now()
                     }), n)
                 } catch (i) {
                     r.warn("[retcode] can not get parseStatData: " + i)
                 }
             },
             avg: function (e, t, n) {
                 try {
                     return this._lg("avg", a(e, {
                         val: t || 0,
                         begin: Date.now()
                     }), n)
                 } catch (i) {
                     r.warn("[retcode] can not get parseStatData: " + i)
                 }
             },
             percent: function (e, t, n, i) {
                 try {
                     return this._lg("percent", a(e, {
                         subkey: t,
                         val: n || 0,
                         begin: Date.now()
                     }), i)
                 } catch (o) {
                     r.warn("[retcode] can not get parseStatData: " + o)
                 }
             },
             msg: function (e, t) {
                 if (e && !(e.length > 180)) return this.custom({
                     msg: e
                 }, t)
             },
             error: function (e, t) {
                 if (!e) return r.warn("[retcode] invalid param e: " + e), this;
                 1 === arguments.length ? ("string" == typeof e && (e = {
                     message: e
                 }, t = {}), "object" == typeof e && (t = e = e.error || e)) : ("string" == typeof e && (e = {
                     message: e
                 }), "object" != typeof t && (t = {}));
                 var n = e.name || "CustomError",
                     i = e.message,
                     o = e.stack || "";
                 t = t || {};
                 var a = {
                     begin: Date.now(),
                     cate: n,
                     msg: i.substring(0, 1e3),
                     stack: o && o.substring(0, 1e3),
                     file: t.filename || "",
                     line: t.lineno || "",
                     col: t.colno || "",
                     err: {
                         msg_raw: i,
                         stack_raw: o
                     }
                 };
                 return this.$ah && this.$ah("error", a), this._lg("error", a, 1)
             },
             api: function (e, t, n, i, a, s, c, u) {
                 return e ? (e = "string" == typeof e ? {
                     api: e,
                     success: t,
                     time: n,
                     code: i,
                     msg: a,
                     begin: s,
                     traceId: c,
                     sid: u
                 } : r.sub(e, o), r.$b7(e.api) ? (e.code = e.code || "", e.msg = e.msg || "", e.success = e.success ? 1 : 0, e.time = +e.time, e.begin = e.begin, e.traceId = e.traceId || "", e.sid = e.sid || "", !e.api || isNaN(e.time) ? (r.warn("[retcode] invalid time or api"), this) : (this.$ah && this.$ah("api", e), this._lg("api", e, e.success && this.getConfig("sample")))) : this) : (r.warn("[retcode] api is null"), this)
             },
             speed: function (e, t, n) {
                 var i = this,
                     o = this.getConfig("startTime") || this._startTime;
                 return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - o : t >= o ? t - o : t, i.$b2 = i.$b2 || {}, i.$b2[e] = t, i.$b2.begin = o, clearTimeout(i.$b3), i.$b3 = setTimeout(function () {
                     n || (i.$b2.page = i.$a7(!0)), i._lg("speed", i.$b2), i.$b2 = null
                 }, 5e3), i) : (r.warn("[retcode] invalid point: " + e), i)
             }
         }), s._super = i, s._root = i, i.Reporter = s, t.exports = s
     }, {
         "./base": 1,
         "./util": 14
     }],
     14: [function (e, t, n) {
         Date.now = Date.now || function () {
             return (new Date).getTime()
         };
         var r = Date.now(),
             i = function () {},
             o = {
                 noop: i,
                 warn: function () {
                     var e = "object" == typeof console ? console.warn : i;
                     try {
                         var t = {
                             warn: e
                         };
                         t.warn.call(t)
                     } catch (n) {
                         return i
                     }
                     return e
                 }(),
                 key: "__bl",
                 win: "object" == typeof window && window.document ? window : undefined,
                 regionMap: {
                     cn: "https://arms-retcode.aliyuncs.com/r.png?",
                     sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
                     daily: "http://arms-retcode-daily.alibaba.net/r.png?"
                 },
                 defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
                 $am: function (e) {
                     if (Object.create) return Object.create(e);
                     var t = function () {};
                     return t.prototype = e, new t
                 },
                 each: function (e, t) {
                     var n = 0,
                         r = e.length;
                     if (this.T(e, "Array"))
                         for (; n < r && !1 !== t.call(e[n], e[n], n); n++);
                     else
                         for (n in e)
                             if (!1 === t.call(e[n], e[n], n)) break;
                     return e
                 },
                 $a8: function (e, t, n) {
                     if ("function" != typeof e) return n;
                     try {
                         return e.apply(this, t)
                     } catch (r) {
                         return n
                     }
                 },
                 T: function (e, t) {
                     var n = Object.prototype.toString.call(e).substring(8).replace("]", "");
                     return t ? n === t : n
                 },
                 $an: function (e, t) {
                     if (!e) return "";
                     if (!t) return e;
                     var n = this,
                         r = n.T(t);
                     return "Function" === r ? n.$a8(t, [e], e) : "Array" === r ? (this.each(t, function (t) {
                         e = n.$an(e, t)
                     }), e) : "Object" === r ? e.replace(t.rule, t.target || "") : e.replace(t, "")
                 },
                 $ag: function (e, t) {
                     if (!e || !t) return !1;
                     if ((this.isString(t) || t.source || "Function" === this.T(t)) && (t = [t]), !this.isArray(t)) return o.warn("[arms] invalid rules of ignore config, (list of) String/RegExp/Funcitons are available"), !1;
                     for (var n, r = [], i = 0, a = t.length; i < a; i++)
                         if (n = t[i], this.isString(n)) r.push(n.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
                         else if (n && n.source) r.push(n.source);
                     else if (n && "Function" === this.T(n) && !0 === this.$a8(n, [e], !1)) return !0;
                     var s = new RegExp(r.join("|"), "i");
                     return !!(r.length && s.test && s.test(e))
                 },
                 J: function (e) {
                     if (!e || "string" != typeof e) return e;
                     var t = null;
                     try {
                         t = JSON.parse(e)
                     } catch (n) {}
                     return t
                 },
                 pick: function (e) {
                     return 1 === e || 1 === Math.ceil(Math.random() * e)
                 },
                 $a9: function (e) {
                     if ("sample" in e) {
                         var t = e.sample,
                             n = t;
                         t && /^\d+(\.\d+)?%$/.test(t) && (n = parseInt(100 / parseFloat(t))), 0 < n && 1 > n && (n = parseInt(1 / n)), n >= 1 && n <= 100 ? e.sample = n : delete e.sample
                     }
                     return e
                 },
                 on: function (e, t, n, r) {
                     return e.addEventListener ? e.addEventListener(t, function i(o) {
                         r && e.removeEventListener(t, i, !1), n.call(this, o)
                     }, !1) : e.attachEvent && e.attachEvent("on" + t, function o(i) {
                         r && e.detachEvent("on" + t, o), n.call(this, i)
                     }), this
                 },
                 off: function (e, t, n) {
                     return n ? (e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent && e.detachEvent(t, n), this) : this
                 },
                 delay: function (e, t) {
                     return -1 === t ? (e(), null) : setTimeout(e, t || 0)
                 },
                 ext: function (e) {
                     for (var t = 1, n = arguments.length; t < n; t++) {
                         var r = arguments[t];
                         for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i])
                     }
                     return e
                 },
                 sub: function (e, t) {
                     var n = {};
                     return this.each(e, function (e, r) {
                         -1 !== t.indexOf(r) && (n[r] = e)
                     }), n
                 },
                 uu: function () {
                     for (var e, t, n = 20, r = new Array(n), i = Date.now().toString(36).split(""); n-- > 0;) t = (e = 36 * Math.random() | 0).toString(36), r[n] = e % 3 ? t : t.toUpperCase();
                     for (var o = 0; o < 8; o++) r.splice(3 * o + 2, 0, i[o]);
                     return r.join("")
                 },
                 seq: function () {
                     return (r++).toString(36)
                 },
                 encode: function (e, t) {
                     try {
                         e = t ? encodeURIComponent(e).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(e)
                     } catch (n) {}
                     return e
                 },
                 serialize: function (e) {
                     e = e || {};
                     var t = [];
                     for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && e[n] !== undefined && t.push(n + "=" + this.encode(e[n], "msg" === n));
                     return t.join("&")
                 },
                 $b7: function (e, t) {
                     if (!e || "string" != typeof e) return !1;
                     var n = /arms-retcode[\w-]*\.aliyuncs/.test(e);
                     return !n && t && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(e)), !n
                 },
                 $b0: function (e) {
                     return !(!e || !e.message) && !/failed[\w\s]+fetch/i.test(e.message)
                 },
                 $ao: function (e) {
                     return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
                 },
                 $ax: function (e) {
                     return function () {
                         return e + "() { [native code] }"
                     }
                 },
                 checkSameOrigin: function (e, t) {
                     if (!t || !e) return !1;
                     if (/^(http|https):\/\//.test(e)) {
                         var n = e.split("/");
                         return (e = n[0] + "//" + n[2]) === t
                     }
                     return !0
                 },
                 getRandIP: function () {
                     for (var e = [], t = 0; t < 4; t++) {
                         var n = Math.floor(256 * Math.random());
                         e[t] = (n > 15 ? "" : "0") + n.toString(16)
                     }
                     return e.join("")
                 },
                 getSortNum: function (e) {
                     return e ? (e += 1) >= 1e3 && e <= 9999 ? e : e < 1e3 ? e + 1e3 : e % 1e4 + 1e3 : 1e3
                 },
                 getRandNum: function (e) {
                     return e && "string" == typeof e ? e.length < 5 ? this.getNum(5) : e.substring(e.length - 5) : this.getNum(5)
                 },
                 getNum: function (e) {
                     for (var t = [], n = 0; n < e; n++) {
                         var r = Math.floor(16 * Math.random());
                         t[n] = r.toString(16)
                     }
                     return t.join("")
                 },
                 isFunction: function (e) {
                     return "function" == typeof e
                 },
                 isPlainObject: function (e) {
                     return "[object Object]" === Object.prototype.toString.call(e)
                 },
                 isString: function (e) {
                     return "[object String]" === Object.prototype.toString.call(e)
                 },
                 isArray: function (e) {
                     return "[object Array]" === Object.prototype.toString.call(e)
                 },
                 joinRegExp: function (e) {
                     for (var t, n = [], r = 0, i = e.length; r < i; r++) t = e[r], this.isString(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                     return new RegExp(n.join("|"), "i")
                 }
             };
         t.exports = o
     }, {}]
 }, {}, [12]);