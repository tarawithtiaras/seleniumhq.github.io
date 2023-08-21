/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+bash+csharp+css-extras+docker+go+java+json+kotlin+markdown+python+ruby+toml+typescript+yaml&plugins=toolbar+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            e = {},
            M = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++n
                        }), e.__id
                    },
                    clone: function t(e, r) {
                        var a, n;
                        switch (r = r || {}, M.util.type(e)) {
                            case "Object":
                                if (n = M.util.objId(e), r[n]) return r[n];
                                for (var i in a = {}, r[n] = a, e) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                                return a;
                            case "Array":
                                return n = M.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function (e, n) {
                                    a[n] = t(e, r)
                                }), a);
                            default:
                                return e
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !c.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function () {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1];
                            if (n) {
                                var t = document.getElementsByTagName("script");
                                for (var r in t)
                                    if (t[r].src == n) return t[r]
                            }
                            return null
                        }
                    },
                    isActive: function (e, n, t) {
                        for (var r = "no-" + n; e;) {
                            var a = e.classList;
                            if (a.contains(n)) return !0;
                            if (a.contains(r)) return !1;
                            e = e.parentElement
                        }
                        return !!t
                    }
                },
                languages: {
                    plain: e,
                    plaintext: e,
                    text: e,
                    txt: e,
                    extend: function (e, n) {
                        var t = M.util.clone(M.languages[e]);
                        for (var r in n) t[r] = n[r];
                        return t
                    },
                    insertBefore: function (t, e, n, r) {
                        var a = (r = r || M.languages)[t],
                            i = {};
                        for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                if (l == e)
                                    for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                                n.hasOwnProperty(l) || (i[l] = a[l])
                            } var s = r[t];
                        return r[t] = i, M.languages.DFS(M.languages, function (e, n) {
                            n === s && e != t && (this[e] = i)
                        }), i
                    },
                    DFS: function e(n, t, r, a) {
                        a = a || {};
                        var i = M.util.objId;
                        for (var l in n)
                            if (n.hasOwnProperty(l)) {
                                t.call(n, l, n[l], r || l);
                                var o = n[l],
                                    s = M.util.type(o);
                                "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a)) : (a[i(o)] = !0, e(o, t, null, a))
                            }
                    }
                },
                plugins: {},
                highlightAll: function (e, n) {
                    M.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function (e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    M.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), M.hooks.run("before-all-elements-highlight", r);
                    for (var a, i = 0; a = r.elements[i++];) M.highlightElement(a, !0 === n, r.callback)
                },
                highlightElement: function (e, n, t) {
                    var r = M.util.getLanguage(e),
                        a = M.languages[r];
                    e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
                    var i = e.parentElement;
                    i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
                    var l = {
                        element: e,
                        language: r,
                        grammar: a,
                        code: e.textContent
                    };

                    function o(e) {
                        l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t && t.call(l.element)
                    }
                    if (M.hooks.run("before-sanity-check", l), (i = l.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !l.code) return M.hooks.run("complete", l), void(t && t.call(l.element));
                    if (M.hooks.run("before-highlight", l), l.grammar)
                        if (n && u.Worker) {
                            var s = new Worker(M.filename);
                            s.onmessage = function (e) {
                                o(e.data)
                            }, s.postMessage(JSON.stringify({
                                language: l.language,
                                code: l.code,
                                immediateClose: !0
                            }))
                        } else o(M.highlight(l.code, l.grammar, l.language));
                    else o(M.util.encode(l.code))
                },
                highlight: function (e, n, t) {
                    var r = {
                        code: e,
                        grammar: n,
                        language: t
                    };
                    return M.hooks.run("before-tokenize", r), r.tokens = M.tokenize(r.code, r.grammar), M.hooks.run("after-tokenize", r), W.stringify(M.util.encode(r.tokens), r.language)
                },
                tokenize: function (e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest
                    }
                    var a = new i;
                    return I(a, a.head, e),
                        function e(n, t, r, a, i, l) {
                            for (var o in r)
                                if (r.hasOwnProperty(o) && r[o]) {
                                    var s = r[o];
                                    s = Array.isArray(s) ? s : [s];
                                    for (var u = 0; u < s.length; ++u) {
                                        if (l && l.cause == o + "," + u) return;
                                        var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = c.alias;
                                        if (h && !c.pattern.global) {
                                            var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                                            c.pattern = RegExp(c.pattern.source, p + "g")
                                        }
                                        for (var v = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                                            var b = m.value;
                                            if (t.length > n.length) return;
                                            if (!(b instanceof W)) {
                                                var k, x = 1;
                                                if (h) {
                                                    if (!(k = z(v, y, n, f)) || k.index >= n.length) break;
                                                    var w = k.index,
                                                        A = k.index + k[0].length,
                                                        P = y;
                                                    for (P += m.value.length; P <= w;) m = m.next, P += m.value.length;
                                                    if (P -= m.value.length, y = P, m.value instanceof W) continue;
                                                    for (var E = m; E !== t.tail && (P < A || "string" == typeof E.value); E = E.next) x++, P += E.value.length;
                                                    x--, b = n.slice(y, P), k.index -= y
                                                } else if (!(k = z(v, 0, b, f))) continue;
                                                var w = k.index,
                                                    S = k[0],
                                                    O = b.slice(0, w),
                                                    L = b.slice(w + S.length),
                                                    N = y + b.length;
                                                l && N > l.reach && (l.reach = N);
                                                var j = m.prev;
                                                O && (j = I(t, j, O), y += O.length), q(t, j, x);
                                                var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                                                if (m = I(t, j, C), L && I(t, m, L), 1 < x) {
                                                    var _ = {
                                                        cause: o + "," + u,
                                                        reach: N
                                                    };
                                                    e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                                                }
                                            }
                                        }
                                    }
                                }
                        }(e, a, n, a.head, 0),
                        function (e) {
                            var n = [],
                                t = e.head.next;
                            for (; t !== e.tail;) n.push(t.value), t = t.next;
                            return n
                        }(a)
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var t = M.hooks.all;
                        t[e] = t[e] || [], t[e].push(n)
                    },
                    run: function (e, n) {
                        var t = M.hooks.all[e];
                        if (t && t.length)
                            for (var r, a = 0; r = t[a++];) r(n)
                    }
                },
                Token: W
            };

        function W(e, n, t, r) {
            this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length
        }

        function z(e, n, t, r) {
            e.lastIndex = n;
            var a = e.exec(t);
            if (a && r && a[1]) {
                var i = a[1].length;
                a.index += i, a[0] = a[0].slice(i)
            }
            return a
        }

        function i() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                n = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = n, this.head = e, this.tail = n, this.length = 0
        }

        function I(e, n, t) {
            var r = n.next,
                a = {
                    value: t,
                    prev: n,
                    next: r
                };
            return n.next = a, r.prev = a, e.length++, a
        }

        function q(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            (n.next = r).prev = n, e.length -= a
        }
        if (u.Prism = M, W.stringify = function n(e, t) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) {
                    var r = "";
                    return e.forEach(function (e) {
                        r += n(e, t)
                    }), r
                }
                var a = {
                        type: e.type,
                        content: n(e.content, t),
                        tag: "span",
                        classes: ["token", e.type],
                        attributes: {},
                        language: t
                    },
                    i = e.alias;
                i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a);
                var l = "";
                for (var o in a.attributes) l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
                return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">"
            }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
            var n = JSON.parse(e.data),
                t = n.language,
                r = n.code,
                a = n.immediateClose;
            u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
        }, !1)), M;
        var t = M.util.currentScript();

        function r() {
            M.manual || M.highlightAll()
        }
        if (t && (M.filename = t.src, t.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) {
            var a = document.readyState;
            "loading" === a || "interactive" === a && t && t.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16)
        }
        return M
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
    },
    prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
    },
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            name: /[^\s<>'"]+/
        }
    },
    cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
    },
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, /"|'/]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        t["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var n = {};
        n[a] = {
            pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
                return a
            }), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: t
        }, Prism.languages.insertBefore("markup", "cdata", n)
    }
}), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
        Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
            lookbehind: !0,
            inside: {
                "attr-name": /^[^\s=]+/,
                "attr-value": {
                    pattern: /=[\s\S]+/,
                    inside: {
                        value: {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: !0,
                            alias: [e, "language-" + e],
                            inside: Prism.languages[e]
                        },
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, /"|'/]
                    }
                }
            }
        })
    }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function (s) {
    var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
                rule: /^@[\w-]+/,
                "selector-function-argument": {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: "selector"
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0
                }
            }
        },
        url: {
            pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: {
                    pattern: RegExp("^" + e.source + "$"),
                    alias: "url"
                }
            }
        },
        selector: {
            pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"),
            lookbehind: !0
        },
        string: {
            pattern: e,
            greedy: !0
        },
        property: {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: !0
        },
        important: /!important\b/i,
        function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: !0
        },
        punctuation: /[(){};:,]/
    }, s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
            "regex-source": {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: !0,
                alias: "language-regex",
                inside: Prism.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
        }
    },
    "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
    },
    "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    },
    "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
    }
}), Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
    }
}), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
! function (e) {
    var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
        n = {
            pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
            lookbehind: !0,
            alias: "punctuation",
            inside: null
        },
        a = {
            bash: n,
            environment: {
                pattern: RegExp("\\$" + t),
                alias: "constant"
            },
            variable: [{
                pattern: /\$?\(\([\s\S]+?\)\)/,
                greedy: !0,
                inside: {
                    variable: [{
                        pattern: /(^\$\(\([\s\S]+)\)\)/,
                        lookbehind: !0
                    }, /^\$\(\(/],
                    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                    operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
                    punctuation: /\(\(?|\)\)?|,|;/
                }
            }, {
                pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                greedy: !0,
                inside: {
                    variable: /^\$\(|^`|\)$|`$/
                }
            }, {
                pattern: /\$\{[^}]+\}/,
                greedy: !0,
                inside: {
                    operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                    punctuation: /[\[\]]/,
                    environment: {
                        pattern: RegExp("(\\{)" + t),
                        lookbehind: !0,
                        alias: "constant"
                    }
                }
            }, /\$(?:\w+|[#?*!@$])/],
            entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
        };
    e.languages.bash = {
        shebang: {
            pattern: /^#!\s*\/.*/,
            alias: "important"
        },
        comment: {
            pattern: /(^|[^"{\\$])#.*/,
            lookbehind: !0
        },
        "function-name": [{
            pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: !0,
            alias: "function"
        }, {
            pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
        }],
        "for-or-select": {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: "variable",
            lookbehind: !0
        },
        "assign-left": {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
                    lookbehind: !0,
                    alias: "constant"
                }
            },
            alias: "variable",
            lookbehind: !0
        },
        string: [{
            pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: !0,
            greedy: !0,
            inside: a
        }, {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                bash: n
            }
        }, {
            pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
            lookbehind: !0,
            greedy: !0,
            inside: a
        }, {
            pattern: /(^|[^$\\])'[^']*'/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
            greedy: !0,
            inside: {
                entity: a.entity
            }
        }],
        environment: {
            pattern: RegExp("\\$?" + t),
            alias: "constant"
        },
        variable: a.variable,
        function: {
            pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        builtin: {
            pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: "class-name"
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        "file-descriptor": {
            pattern: /\B&\d\b/,
            alias: "important"
        },
        operator: {
            pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
            inside: {
                "file-descriptor": {
                    pattern: /^\d/,
                    alias: "important"
                }
            }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0
        }
    }, n.inside = e.languages.bash;
    for (var s = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], i = a.variable[1].inside, o = 0; o < s.length; o++) i[s[o]] = e.languages.bash[s[o]];
    e.languages.shell = e.languages.bash
}(Prism);
! function (s) {
    function a(e, s) {
        return e.replace(/<<(\d+)>>/g, function (e, n) {
            return "(?:" + s[+n] + ")"
        })
    }

    function t(e, n, s) {
        return RegExp(a(e, n), s || "")
    }

    function e(e, n) {
        for (var s = 0; s < n; s++) e = e.replace(/<<self>>/g, function () {
            return "(?:" + e + ")"
        });
        return e.replace(/<<self>>/g, "[^\\s\\S]")
    }
    var n = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
        r = "class enum interface record struct",
        i = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
        o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";

    function l(e) {
        return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
    }
    var d = l(r),
        p = RegExp(l(n + " " + r + " " + i + " " + o)),
        c = l(r + " " + i + " " + o),
        u = l(n + " " + r + " " + o),
        g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
        b = e("\\((?:[^()]|<<self>>)*\\)", 2),
        h = "@?\\b[A-Za-z_]\\w*\\b",
        f = a("<<0>>(?:\\s*<<1>>)?", [h, g]),
        m = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
        k = "\\[\\s*(?:,\\s*)*\\]",
        y = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
        w = a("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [a("\\(<<0>>+(?:,<<0>>+)+\\)", [a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k])]), m, k]),
        v = {
            keyword: p,
            punctuation: /[<>()?,.:[\]]/
        },
        x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
        $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
    s.languages.csharp = s.languages.extend("clike", {
        string: [{
            pattern: t("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: t("(^|[^@$\\\\])<<0>>", [$]),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: RegExp(x),
            greedy: !0,
            alias: "character"
        }],
        "class-name": [{
            pattern: t("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, w]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
            lookbehind: !0
        }, {
            pattern: t("(\\b<<0>>\\s+)<<1>>", [d, f]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\bwhere\\s+)<<0>>", [h]),
            lookbehind: !0
        }, {
            pattern: t("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [w, u, h]),
            inside: v
        }],
        keyword: p,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
    }), s.languages.insertBefore("csharp", "number", {
        range: {
            pattern: /\.\./,
            alias: "operator"
        }
    }), s.languages.insertBefore("csharp", "punctuation", {
        "named-parameter": {
            pattern: t("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
            lookbehind: !0,
            alias: "punctuation"
        }
    }), s.languages.insertBefore("csharp", "class-name", {
        namespace: {
            pattern: t("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        },
        "type-expression": {
            pattern: t("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [b]),
            lookbehind: !0,
            alias: "class-name",
            inside: v
        },
        "return-type": {
            pattern: t("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [w, m]),
            inside: v,
            alias: "class-name"
        },
        "constructor-invocation": {
            pattern: t("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
            lookbehind: !0,
            inside: v,
            alias: "class-name"
        },
        "generic-method": {
            pattern: t("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
            inside: {
                function: t("^<<0>>", [h]),
                generic: {
                    pattern: RegExp(g),
                    alias: "class-name",
                    inside: v
                }
            }
        },
        "type-list": {
            pattern: t("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, w, p.source, b, "\\bnew\\s*\\(\\s*\\)"]),
            lookbehind: !0,
            inside: {
                "record-arguments": {
                    pattern: t("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]),
                    lookbehind: !0,
                    greedy: !0,
                    inside: s.languages.csharp
                },
                keyword: p,
                "class-name": {
                    pattern: RegExp(w),
                    greedy: !0,
                    inside: v
                },
                punctuation: /[,()]/
            }
        },
        preprocessor: {
            pattern: /(^[\t ]*)#.*/m,
            lookbehind: !0,
            alias: "property",
            inside: {
                directive: {
                    pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        }
    });
    var _ = $ + "|" + x,
        B = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [_]),
        E = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
        R = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
        z = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, E]);
    s.languages.insertBefore("csharp", "class-name", {
        attribute: {
            pattern: t("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [R, z]),
            lookbehind: !0,
            greedy: !0,
            inside: {
                target: {
                    pattern: t("^<<0>>(?=\\s*:)", [R]),
                    alias: "keyword"
                },
                "attribute-arguments": {
                    pattern: t("\\(<<0>>*\\)", [E]),
                    inside: s.languages.csharp
                },
                "class-name": {
                    pattern: RegExp(m),
                    inside: {
                        punctuation: /\./
                    }
                },
                punctuation: /[:,]/
            }
        }
    });
    var S = ":[^}\r\n]+",
        j = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
        A = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [j, S]),
        F = e(a("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [_]), 2),
        P = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, S]);

    function U(e, n) {
        return {
            interpolation: {
                pattern: t("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
                lookbehind: !0,
                inside: {
                    "format-string": {
                        pattern: t("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [n, S]),
                        lookbehind: !0,
                        inside: {
                            punctuation: /^:/
                        }
                    },
                    punctuation: /^\{|\}$/,
                    expression: {
                        pattern: /[\s\S]+/,
                        alias: "language-csharp",
                        inside: s.languages.csharp
                    }
                }
            },
            string: /[\s\S]+/
        }
    }
    s.languages.insertBefore("csharp", "string", {
        "interpolation-string": [{
            pattern: t('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [A]),
            lookbehind: !0,
            greedy: !0,
            inside: U(A, j)
        }, {
            pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [P]),
            lookbehind: !0,
            greedy: !0,
            inside: U(P, F)
        }]
    }), s.languages.dotnet = s.languages.cs = s.languages.csharp
}(Prism);
! function (e) {
    var a, n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    e.languages.css.selector = {
        pattern: e.languages.css.selector.pattern,
        lookbehind: !0,
        inside: a = {
            "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+/,
            class: /\.[-\w]+/,
            id: /#[-\w]+/,
            attribute: {
                pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
                greedy: !0,
                inside: {
                    punctuation: /^\[|\]$/,
                    "case-sensitivity": {
                        pattern: /(\s)[si]$/i,
                        lookbehind: !0,
                        alias: "keyword"
                    },
                    namespace: {
                        pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                        lookbehind: !0,
                        inside: {
                            punctuation: /\|$/
                        }
                    },
                    "attr-name": {
                        pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
                        lookbehind: !0
                    },
                    "attr-value": [n, {
                        pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                        lookbehind: !0
                    }],
                    operator: /[|~*^$]?=/
                }
            },
            "n-th": [{
                pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                lookbehind: !0,
                inside: {
                    number: /[\dn]+/,
                    operator: /[+-]/
                }
            }, {
                pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
                lookbehind: !0
            }],
            combinator: />|\+|~|\|\|/,
            punctuation: /[(),]/
        }
    }, e.languages.css.atrule.inside["selector-function-argument"].inside = a, e.languages.insertBefore("css", "property", {
        variable: {
            pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
            lookbehind: !0
        }
    });
    var r = {
            pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
            lookbehind: !0
        },
        i = {
            pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
            lookbehind: !0
        };
    e.languages.insertBefore("css", "function", {
        operator: {
            pattern: /(\s)[+\-*\/](?=\s)/,
            lookbehind: !0
        },
        hexcode: {
            pattern: /\B#[\da-f]{3,8}\b/i,
            alias: "color"
        },
        color: [{
            pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
            lookbehind: !0
        }, {
            pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: {
                unit: r,
                number: i,
                function: /[\w-]+(?=\()/,
                punctuation: /[(),]/
            }
        }],
        entity: /\\[\da-f]{1,8}/i,
        unit: r,
        number: i
    })
}(Prism);
! function (e) {
    var r = "(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)".replace(/<SP_BS>/g, function () {
            return "\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])"
        }),
        n = "\"(?:[^\"\\\\\r\n]|\\\\(?:\r\n|[^]))*\"|'(?:[^'\\\\\r\n]|\\\\(?:\r\n|[^]))*'",
        t = "--[\\w-]+=(?:<STR>|(?![\"'])(?:[^\\s\\\\]|\\\\.)+)".replace(/<STR>/g, function () {
            return n
        }),
        o = {
            pattern: RegExp(n),
            greedy: !0
        },
        i = {
            pattern: /(^[ \t]*)#.*/m,
            lookbehind: !0,
            greedy: !0
        };

    function a(e, n) {
        return e = e.replace(/<OPT>/g, function () {
            return t
        }).replace(/<SP>/g, function () {
            return r
        }), RegExp(e, n)
    }
    e.languages.docker = {
        instruction: {
            pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
            lookbehind: !0,
            greedy: !0,
            inside: {
                options: {
                    pattern: a("(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*", "i"),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        property: {
                            pattern: /(^|\s)--[\w-]+/,
                            lookbehind: !0
                        },
                        string: [o, {
                            pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
                            lookbehind: !0
                        }],
                        operator: /\\$/m,
                        punctuation: /=/
                    }
                },
                keyword: [{
                    pattern: a("(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b", "i"),
                    lookbehind: !0,
                    greedy: !0
                }, {
                    pattern: a("(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS", "i"),
                    lookbehind: !0,
                    greedy: !0
                }, {
                    pattern: a("(^ONBUILD<SP>)\\w+", "i"),
                    lookbehind: !0,
                    greedy: !0
                }, {
                    pattern: /^\w+/,
                    greedy: !0
                }],
                comment: i,
                string: o,
                variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
                operator: /\\$/m
            }
        },
        comment: i
    }, e.languages.dockerfile = e.languages.docker
}(Prism);
Prism.languages.go = Prism.languages.extend("clike", {
    string: {
        pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: !0
    },
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|false|iota|nil|true)\b/,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
}), delete Prism.languages.go["class-name"];
! function (e) {
    var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
        n = "(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",
        a = {
            pattern: RegExp(n + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
            lookbehind: !0,
            inside: {
                namespace: {
                    pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
                    inside: {
                        punctuation: /\./
                    }
                },
                punctuation: /\./
            }
        };
    e.languages.java = e.languages.extend("clike", {
        "class-name": [a, {
            pattern: RegExp(n + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])"),
            lookbehind: !0,
            inside: a.inside
        }],
        keyword: t,
        function: [e.languages.clike.function, {
            pattern: /(::\s*)[a-z_]\w*/,
            lookbehind: !0
        }],
        number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: {
            pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
            lookbehind: !0
        }
    }), e.languages.insertBefore("java", "string", {
        "triple-quoted-string": {
            pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
            greedy: !0,
            alias: "string"
        }
    }), e.languages.insertBefore("java", "class-name", {
        annotation: {
            pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
            lookbehind: !0,
            alias: "punctuation"
        },
        generics: {
            pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
            inside: {
                "class-name": a,
                keyword: t,
                punctuation: /[<>(),.:]/,
                operator: /[?&|]/
            }
        },
        namespace: {
            pattern: RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g, function () {
                return t.source
            })),
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        }
    })
}(Prism);
Prism.languages.json = {
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0
    },
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0
    },
    comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0
    },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: {
        pattern: /\bnull\b/,
        alias: "keyword"
    }
}, Prism.languages.webmanifest = Prism.languages.json;
! function (e) {
    e.languages.kotlin = e.languages.extend("clike", {
        keyword: {
            pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
            lookbehind: !0
        },
        function: [{
            pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
            greedy: !0
        }, {
            pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
            lookbehind: !0,
            greedy: !0
        }],
        number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
        operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
    }), delete e.languages.kotlin["class-name"], e.languages.insertBefore("kotlin", "string", {
        "raw-string": {
            pattern: /("""|''')[\s\S]*?\1/,
            alias: "string"
        }
    }), e.languages.insertBefore("kotlin", "keyword", {
        annotation: {
            pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
            alias: "builtin"
        }
    }), e.languages.insertBefore("kotlin", "function", {
        label: {
            pattern: /\b\w+@|@\w+\b/,
            alias: "symbol"
        }
    });
    var n = [{
        pattern: /\$\{[^}]+\}/,
        inside: {
            delimiter: {
                pattern: /^\$\{|\}$/,
                alias: "variable"
            },
            rest: e.languages.kotlin
        }
    }, {
        pattern: /\$\w+/,
        alias: "variable"
    }];
    e.languages.kotlin.string.inside = e.languages.kotlin["raw-string"].inside = {
        interpolation: n
    }, e.languages.kt = e.languages.kotlin, e.languages.kts = e.languages.kotlin
}(Prism);
! function (s) {
    function n(n) {
        return n = n.replace(/<inner>/g, function () {
            return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))"
        }), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
    }
    var e = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
        t = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(/__/g, function () {
            return e
        }),
        a = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
    s.languages.markdown = s.languages.extend("markup", {}), s.languages.insertBefore("markdown", "prolog", {
        "front-matter-block": {
            pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                punctuation: /^---|---$/,
                "front-matter": {
                    pattern: /\S+(?:\s+\S+)*/,
                    alias: ["yaml", "language-yaml"],
                    inside: s.languages.yaml
                }
            }
        },
        blockquote: {
            pattern: /^>(?:[\t ]*>)*/m,
            alias: "punctuation"
        },
        table: {
            pattern: RegExp("^" + t + a + "(?:" + t + ")*", "m"),
            inside: {
                "table-data-rows": {
                    pattern: RegExp("^(" + t + a + ")(?:" + t + ")*$"),
                    lookbehind: !0,
                    inside: {
                        "table-data": {
                            pattern: RegExp(e),
                            inside: s.languages.markdown
                        },
                        punctuation: /\|/
                    }
                },
                "table-line": {
                    pattern: RegExp("^(" + t + ")" + a + "$"),
                    lookbehind: !0,
                    inside: {
                        punctuation: /\||:?-{3,}:?/
                    }
                },
                "table-header-row": {
                    pattern: RegExp("^" + t + "$"),
                    inside: {
                        "table-header": {
                            pattern: RegExp(e),
                            alias: "important",
                            inside: s.languages.markdown
                        },
                        punctuation: /\|/
                    }
                }
            }
        },
        code: [{
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: "keyword"
        }, {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
                "code-block": {
                    pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                    lookbehind: !0
                },
                "code-language": {
                    pattern: /^(```).+/,
                    lookbehind: !0
                },
                punctuation: /```/
            }
        }],
        title: [{
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: {
                punctuation: /==+$|--+$/
            }
        }, {
            pattern: /(^\s*)#.+/m,
            lookbehind: !0,
            alias: "important",
            inside: {
                punctuation: /^#+|#+$/
            }
        }],
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
                variable: {
                    pattern: /^(!?\[)[^\]]+/,
                    lookbehind: !0
                },
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/
            },
            alias: "url"
        },
        bold: {
            pattern: n("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^..)[\s\S]+(?=..$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /\*\*|__/
            }
        },
        italic: {
            pattern: n("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^.)[\s\S]+(?=.$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /[*_]/
            }
        },
        strike: {
            pattern: n("(~~?)(?:(?!~)<inner>)+\\2"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                content: {
                    pattern: /(^~~?)[\s\S]+(?=\1$)/,
                    lookbehind: !0,
                    inside: {}
                },
                punctuation: /~~?/
            }
        },
        "code-snippet": {
            pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
            lookbehind: !0,
            greedy: !0,
            alias: ["code", "keyword"]
        },
        url: {
            pattern: n('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
            lookbehind: !0,
            greedy: !0,
            inside: {
                operator: /^!/,
                content: {
                    pattern: /(^\[)[^\]]+(?=\])/,
                    lookbehind: !0,
                    inside: {}
                },
                variable: {
                    pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                    lookbehind: !0
                },
                url: {
                    pattern: /(^\]\()[^\s)]+/,
                    lookbehind: !0
                },
                string: {
                    pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                    lookbehind: !0
                }
            }
        }
    }), ["url", "bold", "italic", "strike"].forEach(function (e) {
        ["url", "bold", "italic", "strike", "code-snippet"].forEach(function (n) {
            e !== n && (s.languages.markdown[e].inside.content.inside[n] = s.languages.markdown[n])
        })
    }), s.hooks.add("after-tokenize", function (n) {
        "markdown" !== n.language && "md" !== n.language || ! function n(e) {
            if (e && "string" != typeof e)
                for (var t = 0, a = e.length; t < a; t++) {
                    var r = e[t];
                    if ("code" === r.type) {
                        var i = r.content[1],
                            o = r.content[3];
                        if (i && o && "code-language" === i.type && "code-block" === o.type && "string" == typeof i.content) {
                            var l = i.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"),
                                s = "language-" + (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
                            o.alias ? "string" == typeof o.alias ? o.alias = [o.alias, s] : o.alias.push(s) : o.alias = [s]
                        }
                    } else n(r.content)
                }
        }(n.tokens)
    }), s.hooks.add("wrap", function (n) {
        if ("code-block" === n.type) {
            for (var e = "", t = 0, a = n.classes.length; t < a; t++) {
                var r = n.classes[t],
                    i = /language-(.+)/.exec(r);
                if (i) {
                    e = i[1];
                    break
                }
            }
            var o = s.languages[e];
            if (o) n.content = s.highlight(function (n) {
                var e = n.replace(d, "");
                return e = e.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (n, e) {
                    var t;
                    if ("#" === (e = e.toLowerCase())[0]) return t = "x" === e[1] ? parseInt(e.slice(2), 16) : Number(e.slice(1)), u(t);
                    var a = p[e];
                    return a || n
                })
            }(n.content), o, e);
            else if (e && "none" !== e && s.plugins.autoloader) {
                var l = "md-" + (new Date).valueOf() + "-" + Math.floor(1e16 * Math.random());
                n.attributes.id = l, s.plugins.autoloader.loadLanguages(e, function () {
                    var n = document.getElementById(l);
                    n && (n.innerHTML = s.highlight(n.textContent, s.languages[e], e))
                })
            }
        }
    });
    var d = RegExp(s.languages.markup.tag.pattern.source, "gi"),
        p = {
            amp: "&",
            lt: "<",
            gt: ">",
            quot: '"'
        },
        u = String.fromCodePoint || String.fromCharCode;
    s.languages.md = s.languages.markdown
}(Prism);
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0
    },
    "string-interpolation": {
        pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                lookbehind: !0,
                inside: {
                    "format-spec": {
                        pattern: /(:)[^:(){}]+(?=\}$)/,
                        lookbehind: !0
                    },
                    "conversion-option": {
                        pattern: /![sra](?=[:}]$)/,
                        alias: "punctuation"
                    },
                    rest: null
                }
            },
            string: /[\s\S]+/
        }
    },
    "triple-quoted-string": {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: "string"
    },
    string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0
    },
    "class-name": {
        pattern: /(\bclass\s+)\w+/i,
        lookbehind: !0
    },
    decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/im,
        lookbehind: !0,
        alias: ["annotation", "punctuation"],
        inside: {
            punctuation: /\./
        }
    },
    keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:False|None|True)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
}, Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python;
! function (e) {
    e.languages.ruby = e.languages.extend("clike", {
        comment: [/#.*/, {
            pattern: /^=begin\s[\s\S]*?^=end/m,
            greedy: !0
        }],
        "class-name": {
            pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
    });
    var n = {
        pattern: /#\{[^}]+\}/,
        inside: {
            delimiter: {
                pattern: /^#\{|\}$/,
                alias: "tag"
            },
            rest: e.languages.ruby
        }
    };
    delete e.languages.ruby.function, e.languages.insertBefore("ruby", "keyword", {
        regex: [{
            pattern: RegExp("%r(?:" + ["([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1", "\\((?:[^()\\\\]|\\\\[^])*\\)", "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}", "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]", "<(?:[^<>\\\\]|\\\\[^])*>"].join("|") + ")[egimnosux]{0,6}"),
            greedy: !0,
            inside: {
                interpolation: n
            }
        }, {
            pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                interpolation: n
            }
        }],
        variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
        symbol: {
            pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
            lookbehind: !0
        },
        "method-definition": {
            pattern: /(\bdef\s+)[\w.]+/,
            lookbehind: !0,
            inside: {
                function: /\w+$/,
                rest: e.languages.ruby
            }
        }
    }), e.languages.insertBefore("ruby", "number", {
        builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
        constant: /\b[A-Z]\w*(?:[?!]|\b)/
    }), e.languages.ruby.string = [{
        pattern: RegExp("%[qQiIwWxs]?(?:" + ["([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1", "\\((?:[^()\\\\]|\\\\[^])*\\)", "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}", "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]", "<(?:[^<>\\\\]|\\\\[^])*>"].join("|") + ")"),
        greedy: !0,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
        greedy: !0,
        inside: {
            interpolation: n
        }
    }, {
        pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
        alias: "heredoc-string",
        greedy: !0,
        inside: {
            delimiter: {
                pattern: /^<<[-~]?[a-z_]\w*|[a-z_]\w*$/i,
                alias: "symbol",
                inside: {
                    punctuation: /^<<[-~]?/
                }
            },
            interpolation: n
        }
    }, {
        pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
        alias: "heredoc-string",
        greedy: !0,
        inside: {
            delimiter: {
                pattern: /^<<[-~]?'[a-z_]\w*'|[a-z_]\w*$/i,
                alias: "symbol",
                inside: {
                    punctuation: /^<<[-~]?'|'$/
                }
            }
        }
    }], e.languages.rb = e.languages.ruby
}(Prism);
! function (e) {
    function n(e) {
        return e.replace(/__/g, function () {
            return "(?:[\\w-]+|'[^'\n\r]*'|\"(?:\\\\.|[^\\\\\"\r\n])*\")"
        })
    }
    e.languages.toml = {
        comment: {
            pattern: /#.*/,
            greedy: !0
        },
        table: {
            pattern: RegExp(n("(^[\t ]*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])"), "m"),
            lookbehind: !0,
            greedy: !0,
            alias: "class-name"
        },
        key: {
            pattern: RegExp(n("(^[\t ]*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)"), "m"),
            lookbehind: !0,
            greedy: !0,
            alias: "property"
        },
        string: {
            pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
            greedy: !0
        },
        date: [{
            pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
            alias: "number"
        }, {
            pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
            alias: "number"
        }],
        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
        boolean: /\b(?:false|true)\b/,
        punctuation: /[.,=[\]{}]/
    }
}(Prism);
! function (e) {
    e.languages.typescript = e.languages.extend("javascript", {
        "class-name": {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: !0,
            greedy: !0,
            inside: null
        },
        builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
    }), e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/), delete e.languages.typescript.parameter, delete e.languages.typescript["literal-property"];
    var s = e.languages.extend("typescript", {});
    delete s["class-name"], e.languages.typescript["class-name"].inside = s, e.languages.insertBefore("typescript", "function", {
        decorator: {
            pattern: /@[$\w\xA0-\uFFFF]+/,
            inside: {
                at: {
                    pattern: /^@/,
                    alias: "operator"
                },
                function: /^[\s\S]+/
            }
        },
        "generic-function": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
            greedy: !0,
            inside: {
                function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                generic: {
                    pattern: /<[\s\S]+/,
                    alias: "class-name",
                    inside: s
                }
            }
        }
    }), e.languages.ts = e.languages.typescript
}(Prism);
! function (e) {
    var n = /[*&][^\s[\]{},]+/,
        r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
        t = "(?:" + r.source + "(?:[ \t]+" + n.source + ")?|" + n.source + "(?:[ \t]+" + r.source + ")?)",
        a = "(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*".replace(/<PLAIN>/g, function () {
            return "[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]"
        }),
        d = "\"(?:[^\"\\\\\r\n]|\\\\.)*\"|'(?:[^'\\\\\r\n]|\\\\.)*'";

    function o(e, n) {
        n = (n || "").replace(/m/g, "") + "m";
        var r = "([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))".replace(/<<prop>>/g, function () {
            return t
        }).replace(/<<value>>/g, function () {
            return e
        });
        return RegExp(r, n)
    }
    e.languages.yaml = {
        scalar: {
            pattern: RegExp("([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)".replace(/<<prop>>/g, function () {
                return t
            })),
            lookbehind: !0,
            alias: "string"
        },
        comment: /#.*/,
        key: {
            pattern: RegExp("((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)".replace(/<<prop>>/g, function () {
                return t
            }).replace(/<<key>>/g, function () {
                return "(?:" + a + "|" + d + ")"
            })),
            lookbehind: !0,
            greedy: !0,
            alias: "atrule"
        },
        directive: {
            pattern: /(^[ \t]*)%.+/m,
            lookbehind: !0,
            alias: "important"
        },
        datetime: {
            pattern: o("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"),
            lookbehind: !0,
            alias: "number"
        },
        boolean: {
            pattern: o("false|true", "i"),
            lookbehind: !0,
            alias: "important"
        },
        null: {
            pattern: o("null|~", "i"),
            lookbehind: !0,
            alias: "important"
        },
        string: {
            pattern: o(d),
            lookbehind: !0,
            greedy: !0
        },
        number: {
            pattern: o("[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)", "i"),
            lookbehind: !0
        },
        tag: r,
        important: n,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
    }, e.languages.yml = e.languages.yaml
}(Prism);
! function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
        var i = [],
            l = {},
            d = function () {};
        Prism.plugins.toolbar = {};
        var e = Prism.plugins.toolbar.registerButton = function (e, n) {
                var t;
                t = "function" == typeof n ? n : function (e) {
                    var t;
                    return "function" == typeof n.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", function () {
                        n.onClick.call(this, e)
                    })) : "string" == typeof n.url ? (t = document.createElement("a")).href = n.url : t = document.createElement("span"), n.className && t.classList.add(n.className), t.textContent = n.text, t
                }, e in l ? console.warn('There is a button with the key "' + e + '" registered already.') : i.push(l[e] = t)
            },
            t = Prism.plugins.toolbar.hook = function (a) {
                var e = a.element.parentNode;
                if (e && /pre/i.test(e.nodeName) && !e.parentNode.classList.contains("code-toolbar")) {
                    var t = document.createElement("div");
                    t.classList.add("code-toolbar"), e.parentNode.insertBefore(t, e), t.appendChild(e);
                    var r = document.createElement("div");
                    r.classList.add("toolbar");
                    var n = i,
                        o = function (e) {
                            for (; e;) {
                                var t = e.getAttribute("data-toolbar-order");
                                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                                e = e.parentElement
                            }
                        }(a.element);
                    o && (n = o.map(function (e) {
                        return l[e] || d
                    })), n.forEach(function (e) {
                        var t = e(a);
                        if (t) {
                            var n = document.createElement("div");
                            n.classList.add("toolbar-item"), n.appendChild(t), r.appendChild(n)
                        }
                    }), t.appendChild(r)
                }
            };
        e("label", function (e) {
            var t = e.element.parentNode;
            if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
                var n, a, r = t.getAttribute("data-label");
                try {
                    a = document.querySelector("template#" + r)
                } catch (e) {}
                return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = r), n
            }
        }), Prism.hooks.add("complete", t)
    }
}();
! function () {
    function u(t, e) {
        t.addEventListener("click", function () {
            ! function (t) {
                navigator.clipboard ? navigator.clipboard.writeText(t.getText()).then(t.success, function () {
                    o(t)
                }) : o(t)
            }(e)
        })
    }

    function o(e) {
        var t = document.createElement("textarea");
        t.value = e.getText(), t.style.top = "0", t.style.left = "0", t.style.position = "fixed", document.body.appendChild(t), t.focus(), t.select();
        try {
            var o = document.execCommand("copy");
            setTimeout(function () {
                o ? e.success() : e.error()
            }, 1)
        } catch (t) {
            setTimeout(function () {
                e.error(t)
            }, 1)
        }
        document.body.removeChild(t)
    }
    "undefined" != typeof Prism && "undefined" != typeof document && (Prism.plugins.toolbar ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
        var e = t.element,
            o = function (t) {
                var e = {
                    copy: "Copy",
                    "copy-error": "Press Ctrl+C to copy",
                    "copy-success": "Copied!",
                    "copy-timeout": 5e3
                };
                for (var o in e) {
                    for (var n = "data-prismjs-" + o, c = t; c && !c.hasAttribute(n);) c = c.parentElement;
                    c && (e[o] = c.getAttribute(n))
                }
                return e
            }(e),
            n = document.createElement("button");
        n.className = "copy-to-clipboard-button", n.setAttribute("type", "button");
        var c = document.createElement("span");
        return n.appendChild(c), i("copy"), u(n, {
            getText: function () {
                return e.textContent
            },
            success: function () {
                i("copy-success"), r()
            },
            error: function () {
                i("copy-error"), setTimeout(function () {
                    ! function (t) {
                        window.getSelection().selectAllChildren(t)
                    }(e)
                }, 1), r()
            }
        }), n;

        function r() {
            setTimeout(function () {
                i("copy")
            }, o["copy-timeout"])
        }

        function i(t) {
            c.textContent = o[t], n.setAttribute("data-copy-state", t)
        }
    }) : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."))
}();