! function() {
    "use strict";

    function t(t, e) {
        e ? (d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, this.blocks = d) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = t
    }

    function i(e, i, a) {
        var n, o = typeof e;
        if ("string" === o) {
            var r, d = [],
                l = e.length,
                s = 0;
            for (n = 0; n < l; ++n)(r = e.charCodeAt(n)) < 128 ? d[s++] = r : r < 2048 ? (d[s++] = 192 | r >> 6, d[s++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (d[s++] = 224 | r >> 12, d[s++] = 128 | r >> 6 & 63, d[s++] = 128 | 63 & r) : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++n)), d[s++] = 240 | r >> 18, d[s++] = 128 | r >> 12 & 63, d[s++] = 128 | r >> 6 & 63, d[s++] = 128 | 63 & r);
            e = d
        } else {
            if ("object" !== o) throw new Error(h);
            if (null === e) throw new Error(h);
            if (f && e.constructor === ArrayBuffer) e = new Uint8Array(e);
            else if (!(Array.isArray(e) || f && ArrayBuffer.isView(e))) throw new Error(h)
        }
        e.length > 64 && (e = new t(i, !0).update(e).array());
        var c = [],
            u = [];
        for (n = 0; n < 64; ++n) {
            var p = e[n] || 0;
            c[n] = 92 ^ p, u[n] = 54 ^ p
        }
        t.call(this, i, a), this.update(u), this.oKeyPad = c, this.inner = !0, this.sharedMemory = a
    }
    var h = "input is invalid type",
        r = "object" == typeof window,
        s = r ? window : {};
    s.JS_SHA256_NO_WINDOW && (r = !1);
    var e = !r && "object" == typeof self,
        n = !s.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
    n ? s = global : e && (s = self);
    var o = !s.JS_SHA256_NO_COMMON_JS && "object" == typeof module && module.exports,
        a = "function" == typeof define && define.amd,
        f = !s.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
        u = "0123456789abcdef".split(""),
        c = [-2147483648, 8388608, 32768, 128],
        y = [24, 16, 8, 0],
        p = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        l = ["hex", "array", "digest", "arrayBuffer"],
        d = [];
    !s.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), !f || !s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
        return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
    });
    var A = function(e, i) {
            return function(a) {
                return new t(i, !0).update(a)[e]()
            }
        },
        w = function(e) {
            var i = A("hex", e);
            n && (i = b(i, e)), i.create = function() {
                return new t(e)
            }, i.update = function(t) {
                return i.create().update(t)
            };
            for (var a = 0; a < l.length; ++a) {
                var o = l[a];
                i[o] = A(o, e)
            }
            return i
        },
        b = function(t, i) {
            var r = eval("require('crypto')"),
                s = eval("require('buffer').Buffer"),
                e = i ? "sha224" : "sha256",
                n = function(i) {
                    if ("string" == typeof i) return r.createHash(e).update(i, "utf8").digest("hex");
                    if (null === i || void 0 === i) throw new Error(h);
                    return i.constructor === ArrayBuffer && (i = new Uint8Array(i)), Array.isArray(i) || ArrayBuffer.isView(i) || i.constructor === s ? r.createHash(e).update(new s(i)).digest("hex") : t(i)
                };
            return n
        },
        v = function(t, e) {
            return function(a, n) {
                return new i(a, e, !0).update(n)[t]()
            }
        },
        _ = function(t) {
            var e = v("hex", t);
            e.create = function(e) {
                return new i(e, t)
            }, e.update = function(t, i) {
                return e.create(t).update(i)
            };
            for (var a = 0; a < l.length; ++a) {
                var n = l[a];
                e[n] = v(n, t)
            }
            return e
        };
    t.prototype.update = function(t) {
        if (!this.finalized) {
            var e, i = typeof t;
            if ("string" !== i) {
                if ("object" !== i) throw new Error(h);
                if (null === t) throw new Error(h);
                if (f && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                else if (!(Array.isArray(t) || f && ArrayBuffer.isView(t))) throw new Error(h);
                e = !0
            }
            for (var a, n, o = 0, r = t.length, d = this.blocks; o < r;) {
                if (this.hashed && (this.hashed = !1, d[0] = this.block, d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0), e)
                    for (n = this.start; o < r && n < 64; ++o) d[n >> 2] |= t[o] << y[3 & n++];
                else
                    for (n = this.start; o < r && n < 64; ++o)(a = t.charCodeAt(o)) < 128 ? d[n >> 2] |= a << y[3 & n++] : a < 2048 ? (d[n >> 2] |= (192 | a >> 6) << y[3 & n++], d[n >> 2] |= (128 | 63 & a) << y[3 & n++]) : a < 55296 || a >= 57344 ? (d[n >> 2] |= (224 | a >> 12) << y[3 & n++], d[n >> 2] |= (128 | a >> 6 & 63) << y[3 & n++], d[n >> 2] |= (128 | 63 & a) << y[3 & n++]) : (a = 65536 + ((1023 & a) << 10 | 1023 & t.charCodeAt(++o)), d[n >> 2] |= (240 | a >> 18) << y[3 & n++], d[n >> 2] |= (128 | a >> 12 & 63) << y[3 & n++], d[n >> 2] |= (128 | a >> 6 & 63) << y[3 & n++], d[n >> 2] |= (128 | 63 & a) << y[3 & n++]);
                this.lastByteIndex = n, this.bytes += n - this.start, n >= 64 ? (this.block = d[16], this.start = n - 64, this.hash(), this.hashed = !0) : this.start = n
            }
            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
        }
    }, t.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks,
                e = this.lastByteIndex;
            t[16] = this.block, t[e >> 2] |= c[3 & e], this.block = t[16], e >= 56 && (this.hashed || this.hash(), t[0] = this.block, t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.hBytes << 3 | this.bytes >>> 29, t[15] = this.bytes << 3, this.hash()
        }
    }, t.prototype.hash = function() {
        var t, e, i, a, n, o, r, d, l, s = this.h0,
            c = this.h1,
            u = this.h2,
            m = this.h3,
            _ = this.h4,
            g = this.h5,
            y = this.h6,
            h = this.h7,
            f = this.blocks;
        for (t = 16; t < 64; ++t) e = ((n = f[t - 15]) >>> 7 | n << 25) ^ (n >>> 18 | n << 14) ^ n >>> 3, i = ((n = f[t - 2]) >>> 17 | n << 15) ^ (n >>> 19 | n << 13) ^ n >>> 10, f[t] = f[t - 16] + e + f[t - 7] + i << 0;
        for (l = c & u, t = 0; t < 64; t += 4) this.first ? (this.is224 ? (o = 300032, h = (n = f[0] - 1413257819) - 150054599 << 0, m = n + 24177077 << 0) : (o = 704751109, h = (n = f[0] - 210244248) - 1521486534 << 0, m = n + 143694565 << 0), this.first = !1) : (e = (s >>> 2 | s << 30) ^ (s >>> 13 | s << 19) ^ (s >>> 22 | s << 10), a = (o = s & c) ^ s & u ^ l, h = m + (n = h + (i = (_ >>> 6 | _ << 26) ^ (_ >>> 11 | _ << 21) ^ (_ >>> 25 | _ << 7)) + (_ & g ^ ~_ & y) + p[t] + f[t]) << 0, m = n + (e + a) << 0), e = (m >>> 2 | m << 30) ^ (m >>> 13 | m << 19) ^ (m >>> 22 | m << 10), a = (r = m & s) ^ m & c ^ o, y = u + (n = y + (i = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7)) + (h & _ ^ ~h & g) + p[t + 1] + f[t + 1]) << 0, e = ((u = n + (e + a) << 0) >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10), a = (d = u & m) ^ u & s ^ r, g = c + (n = g + (i = (y >>> 6 | y << 26) ^ (y >>> 11 | y << 21) ^ (y >>> 25 | y << 7)) + (y & h ^ ~y & _) + p[t + 2] + f[t + 2]) << 0, e = ((c = n + (e + a) << 0) >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10), a = (l = c & u) ^ c & m ^ d, _ = s + (n = _ + (i = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & y ^ ~g & h) + p[t + 3] + f[t + 3]) << 0, s = n + (e + a) << 0;
        this.h0 = this.h0 + s << 0, this.h1 = this.h1 + c << 0, this.h2 = this.h2 + u << 0, this.h3 = this.h3 + m << 0, this.h4 = this.h4 + _ << 0, this.h5 = this.h5 + g << 0, this.h6 = this.h6 + y << 0, this.h7 = this.h7 + h << 0
    }, t.prototype.hex = function() {
        this.finalize();
        var t = this.h0,
            e = this.h1,
            i = this.h2,
            a = this.h3,
            n = this.h4,
            o = this.h5,
            r = this.h6,
            d = this.h7,
            l = u[t >> 28 & 15] + u[t >> 24 & 15] + u[t >> 20 & 15] + u[t >> 16 & 15] + u[t >> 12 & 15] + u[t >> 8 & 15] + u[t >> 4 & 15] + u[15 & t] + u[e >> 28 & 15] + u[e >> 24 & 15] + u[e >> 20 & 15] + u[e >> 16 & 15] + u[e >> 12 & 15] + u[e >> 8 & 15] + u[e >> 4 & 15] + u[15 & e] + u[i >> 28 & 15] + u[i >> 24 & 15] + u[i >> 20 & 15] + u[i >> 16 & 15] + u[i >> 12 & 15] + u[i >> 8 & 15] + u[i >> 4 & 15] + u[15 & i] + u[a >> 28 & 15] + u[a >> 24 & 15] + u[a >> 20 & 15] + u[a >> 16 & 15] + u[a >> 12 & 15] + u[a >> 8 & 15] + u[a >> 4 & 15] + u[15 & a] + u[n >> 28 & 15] + u[n >> 24 & 15] + u[n >> 20 & 15] + u[n >> 16 & 15] + u[n >> 12 & 15] + u[n >> 8 & 15] + u[n >> 4 & 15] + u[15 & n] + u[o >> 28 & 15] + u[o >> 24 & 15] + u[o >> 20 & 15] + u[o >> 16 & 15] + u[o >> 12 & 15] + u[o >> 8 & 15] + u[o >> 4 & 15] + u[15 & o] + u[r >> 28 & 15] + u[r >> 24 & 15] + u[r >> 20 & 15] + u[r >> 16 & 15] + u[r >> 12 & 15] + u[r >> 8 & 15] + u[r >> 4 & 15] + u[15 & r];
        return this.is224 || (l += u[d >> 28 & 15] + u[d >> 24 & 15] + u[d >> 20 & 15] + u[d >> 16 & 15] + u[d >> 12 & 15] + u[d >> 8 & 15] + u[d >> 4 & 15] + u[15 & d]), l
    }, t.prototype.toString = t.prototype.hex, t.prototype.digest = function() {
        this.finalize();
        var t = this.h0,
            e = this.h1,
            i = this.h2,
            a = this.h3,
            n = this.h4,
            o = this.h5,
            r = this.h6,
            d = this.h7,
            l = [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r];
        return this.is224 || l.push(d >> 24 & 255, d >> 16 & 255, d >> 8 & 255, 255 & d), l
    }, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function() {
        this.finalize();
        var t = new ArrayBuffer(this.is224 ? 28 : 32),
            e = new DataView(t);
        return e.setUint32(0, this.h0), e.setUint32(4, this.h1), e.setUint32(8, this.h2), e.setUint32(12, this.h3), e.setUint32(16, this.h4), e.setUint32(20, this.h5), e.setUint32(24, this.h6), this.is224 || e.setUint32(28, this.h7), t
    }, i.prototype = new t, i.prototype.finalize = function() {
        if (t.prototype.finalize.call(this), this.inner) {
            this.inner = !1;
            var e = this.array();
            t.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(e), t.prototype.finalize.call(this)
        }
    };
    var B = w();
    B.sha256 = B, B.sha224 = w(!0), B.sha256.hmac = _(), B.sha224.hmac = _(!0), o ? module.exports = B : (s.sha256 = B.sha256, s.sha224 = B.sha224, a && define(function() {
        return B
    }))
}(), "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(t) {
    return 0 === this.lastIndexOf(t, 0)
}), "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(t) {
    return -1 !== this.indexOf(t, this.length - t.length)
}), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}), "function" != typeof Array.prototype.find && (Array.prototype.find = function(t) {
    if (null == this) throw new TypeError('"this" is null or not defined');
    var e = Object(this),
        i = e.length >>> 0;
    if ("function" != typeof t) throw new TypeError("callback must be a function");
    for (var a = arguments[1], n = 0; n < i;) {
        var o = e[n];
        if (t.call(a, o, n, e)) return o;
        n++
    }
}), "function" != typeof Array.prototype.findIndex && Object.defineProperty(Array.prototype, "findIndex", {
    value: function(t) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var e = Object(this),
            i = e.length >>> 0;
        if ("function" != typeof t) throw new TypeError("predicate must be a function");
        for (var a = arguments[1], n = 0; n < i;) {
            var o = e[n];
            if (t.call(a, o, n, e)) return n;
            n++
        }
        return -1
    },
    configurable: !0,
    writable: !0
}), "function" != typeof Array.prototype.filter && (Array.prototype.filter = function(t, e) {
    "use strict";
    if ("function" != typeof t || !this) throw new TypeError;
    var i = this.length >>> 0,
        a = new Array(i),
        n = this,
        o = 0,
        r = -1;
    if (void 0 === e)
        for (; ++r !== i;)
            if (r in this)
                if (t(n[r], r, n)) a[o++] = n[r];
                else
                    for (; ++r !== i;) r in this && t.call(e, n[r], r, n) && (a[o++] = n[r]);
    return a.length = o, a
}), "function" != typeof Array.prototype.map && (Array.prototype.map = function(t) {
    var e, i, a;
    if (null == this) throw new TypeError("this is null or not defined");
    var n = Object(this),
        o = n.length >>> 0;
    if ("function" != typeof t) throw new TypeError(t + " is not a function");
    for (arguments.length > 1 && (e = arguments[1]), i = new Array(o), a = 0; a < o;) {
        var r, d;
        a in n && (r = n[a], d = t.call(e, r, a, n), i[a] = d), a++
    }
    return i
}), "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function(t) {
    if (null === this) throw new TypeError("Array.prototype.reduce called on null or undefined");
    if ("function" != typeof t) throw new TypeError(t + " is not a function");
    var e, i = Object(this),
        a = i.length >>> 0,
        n = 0;
    if (arguments.length >= 2) e = arguments[1];
    else {
        for (; n < a && !(n in i);) n++;
        if (n >= a) throw new TypeError("Reduce of empty array with no initial value");
        e = i[n++]
    }
    for (; n < a;) n in i && (e = t(e, i[n], n, i)), n++;
    return e
}), "function" != typeof Object.keys && (Object.keys = function() {
    "use strict";
    var t = Object.prototype.hasOwnProperty,
        e = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        a = i.length;
    return function(n) {
        if ("function" != typeof n && ("object" != typeof n || null === n)) throw new TypeError("Object.keys called on non-object");
        var o, r, d = [];
        for (o in n) t.call(n, o) && d.push(o);
        if (e)
            for (r = 0; r < a; r++) t.call(n, i[r]) && d.push(i[r]);
        return d
    }
}()), String.prototype.replaceAll = function(t, e) {
    return this.valueOf().split(t).join(e)
}, String.prototype.encode = function() {
    return this.valueOf().replaceAll(/&/g, "&#38;").replaceAll(/>/g, "&#62;").replaceAll(/</g, "&#60;").replaceAll(/'/g, "&#39;").replaceAll(/"/g, "&#34;").replaceAll(/\\/g, "&#165;").replaceAll(/{/g, "&#123;").replaceAll(/}/g, "&#125;")
}, String.prototype.decode = function() {
    return this.valueOf().replaceAll(/&#38;/g, "&").replaceAll(/&#62;/g, ">").replaceAll(/&#60;/g, "<").replaceAll(/&#39;/g, "'").replaceAll(/&#34;/g, '"').replaceAll(/&#165;/g, "\\").replaceAll(/&#123;/g, "{").replaceAll(/&#125;/g, "}")
}, String.prototype.format = function() {
    for (var t = this, e = 0; e < arguments.length; e++) {
        var i = new RegExp("\\{" + e + "\\}", "gi");
        t = t.replace(i, arguments[e])
    }
    return t.valueOf()
}, Array.prototype.removeSpace = function() {
    var t = [];
    return this.forEach(function(e) {
        (e = e.trim()).length > 0 && t.push(e)
    }), t
}, Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}, Array.prototype.unique = function() {
    return Array.from(new Set(this))
}, Array.prototype.except = function(t) {
    var e = this;
    return Array.isArray(t) && t.forEach(function(t) {
        var i = e.indexOf(t); - 1 != i && e.splice(i, 1)
    }), e
}, Array.prototype.only = function(t) {
    var e = [];
    return Array.isArray(t) && this.forEach(function(i) {
        -1 != t.indexOf(i) && e.push(i)
    }), e
}, Array.prototype.insert = function(t, e) {
    this.splice(t, 0, e)
};
var equalsLadiPage = function(t, e) {
        return isObjectLadiPage(window.angular) && isFunctionLadiPage(window.angular.equals) ? window.angular.equals(t, e) : Object.prototype.toString.call(t) == Object.prototype.toString.call(e) && JSON.stringify(t) == JSON.stringify(e)
    },
    isObjectLadiPage = function(t) {
        return "[object Object]" == Object.prototype.toString.call(t)
    },
    isArrayLadiPage = function(t) {
        return "[object Array]" == Object.prototype.toString.call(t)
    },
    isFunctionLadiPage = function(t) {
        return "[object Function]" == Object.prototype.toString.call(t) || "[object AsyncFunction]" == Object.prototype.toString.call(t)
    },
    isBooleanLadiPage = function(t) {
        return "[object Boolean]" == Object.prototype.toString.call(t)
    },
    isStringLadiPage = function(t) {
        return "[object String]" == Object.prototype.toString.call(t)
    },
    isEmptyLadiPage = function(t) {
        return !!isNullLadiPage(t) || (isStringLadiPage(t) ? 0 == (t = t.trim().toLowerCase()).length || "undefined" == t || "null" == t : !!isArrayLadiPage(t) && 0 == t.length)
    },
    isNullLadiPage = function(t) {
        return "[object Null]" == Object.prototype.toString.call(t) || "[object Undefined]" == Object.prototype.toString.call(t)
    },
    parseFloatLadiPage = function(t, e) {
        var i = parseFloat(t);
        try {
            return parseFloat(LadiPageScript.formatNumber(i, 21, null, e || 6))
        } catch (t) {
            return NaN
        }
    },
    decodeURIComponentLadiPage = function(t) {
        try {
            return decodeURIComponent(t)
        } catch (e) {
            return t
        }
    },
    fbqCustom = function(t, e, i, a) {
        return isNullLadiPage(a) ? isNullLadiPage(i) ? isNullLadiPage(e) ? isNullLadiPage(t) ? void 0 : (window.fbq(t), void console.log(`fbq(${JSON.stringify(t)})`)) : (window.fbq(t, e), void console.log(`fbq(${JSON.stringify(t)}, ${JSON.stringify(e)})`)) : (window.fbq(t, e, i), void console.log(`fbq(${JSON.stringify(t)}, ${JSON.stringify(e)}, ${JSON.stringify(i)})`)) : (isNullLadiPage(i) && (i = {}), window.fbq(t, e, i, a), void console.log(`fbq(${JSON.stringify(t)}, ${JSON.stringify(e)}, ${JSON.stringify(i)}, ${JSON.stringify(a)})`))
    },
    formatNumber = function(t, e, i, a) {
        (isEmptyLadiPage(i) || isEmptyLadiPage(a)) && (i = "", a = 0), isEmptyLadiPage(e) && (e = "");
        var n = LadiPageScript.formatNumber(t, null, null, a);
        return n = (n = n.replaceAll(",", "LADIPAGE_NUMBER_COMMA").replaceAll(".", "LADIPAGE_NUMBER_DOT")).replaceAll("LADIPAGE_NUMBER_COMMA", e).replaceAll("LADIPAGE_NUMBER_DOT", i)
    },
    textToNumber = function(t, e, i, a) {
        (isEmptyLadiPage(i) || isEmptyLadiPage(a)) && (a = 0);
        var n = String(t);
        return isEmptyLadiPage(e) || (n = n.replaceAll(e, "")), isEmptyLadiPage(i) || (n = n.replaceAll(i, ".")), n = n.split("."), n = a <= 0 || 1 == n.length ? n[0] : n[0] + "." + n[1].substring(0, a), parseFloatLadiPage(n) || 0
    },
    formatNumberComma = function(t, e) {
        return formatNumber(t, ",", ".", e)
    },
    textToNumberComma = function(t, e) {
        return textToNumber(t, ",", ".", e)
    },
    formatNumberDot = function(t, e) {
        return formatNumber(t, ".", ",", e)
    },
    textToNumberDot = function(t, e) {
        return textToNumber(t, ".", ",", e)
    },
    Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(t) {
            var e, i, a, n, o, r, d, l = "",
                s = 0;
            for (t = Base64._utf8_encode(t); s < t.length;) n = (e = t.charCodeAt(s++)) >> 2, o = (3 & e) << 4 | (i = t.charCodeAt(s++)) >> 4, r = (15 & i) << 2 | (a = t.charCodeAt(s++)) >> 6, d = 63 & a, isNaN(i) ? r = d = 64 : isNaN(a) && (d = 64), l = l + Base64._keyStr.charAt(n) + Base64._keyStr.charAt(o) + Base64._keyStr.charAt(r) + Base64._keyStr.charAt(d);
            return l
        },
        decode: function(t) {
            var e, i, a, n, o, r, d = "",
                l = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length;) e = Base64._keyStr.indexOf(t.charAt(l++)) << 2 | (n = Base64._keyStr.indexOf(t.charAt(l++))) >> 4, i = (15 & n) << 4 | (o = Base64._keyStr.indexOf(t.charAt(l++))) >> 2, a = (3 & o) << 6 | (r = Base64._keyStr.indexOf(t.charAt(l++))), d += String.fromCharCode(e), 64 != o && (d += String.fromCharCode(i)), 64 != r && (d += String.fromCharCode(a));
            return d = Base64._utf8_decode(d)
        },
        _utf8_encode: function(t) {
            t = t.replace(/\r\n/g, "\n");
            for (var e = "", i = 0; i < t.length; i++) {
                var a = t.charCodeAt(i);
                a < 128 ? e += String.fromCharCode(a) : a > 127 && a < 2048 ? (e += String.fromCharCode(a >> 6 | 192), e += String.fromCharCode(63 & a | 128)) : (e += String.fromCharCode(a >> 12 | 224), e += String.fromCharCode(a >> 6 & 63 | 128), e += String.fromCharCode(63 & a | 128))
            }
            return e
        },
        _utf8_decode: function(t) {
            for (var e = "", i = 0, a = 0, n = 0, o = 0; i < t.length;)(a = t.charCodeAt(i)) < 128 ? (e += String.fromCharCode(a), i++) : a > 191 && a < 224 ? (o = t.charCodeAt(i + 1), e += String.fromCharCode((31 & a) << 6 | 63 & o), i += 2) : (o = t.charCodeAt(i + 1), n = t.charCodeAt(i + 2), e += String.fromCharCode((15 & a) << 12 | (63 & o) << 6 | 63 & n), i += 3);
            return e
        }
    },
    LadiPageScriptV2 = LadiPageScriptV2 || function() {};
LadiPageScriptV2.prototype.init = function() {
    this.const = {
        DESKTOP: "desktop",
        MOBILE: "mobile",
        DEVICE: "device",
        DOMAIN_GOOGLE_DOCS: "docs.google.com",
        POWERED_BY_IMAGE: "https://w.ladicdn.com/source/v3/by/ladipage.svg?v=1.0",
        STATIC_W_DOMAIN: "w.ladicdn.com",
        STATIC_S_DOMAIN: "s.ladicdn.com",
        APP_RUNTIME_PREFIX: "_runtime",
        SCRIPT_LADI_FONT: "ladi-font",
        SCRIPT_LADI_VARIABLE: "ladi-variable",
        META_VERSION: {
            two: 2
        },
        OPTIMIZE_EXCEPT_EVENT_DATA_KEY_LIST: ["custom_style", "custom_css", "option.form_api_data", "option.spinlucky_setting.list_value"],
        OPTIMIZE_EVENT_DATA_KEY_LIST: ["option.is_form_checkout", "option.website_list_post_by_category_id", "option.website_list_post_by_tag_id", "device.option.collection_setting.list_type", "scrolling", "seller_name", "seller_content", "seller_like", "form_data", "value", "operator", "form_item_value", "form_item_type", "form_item_type", "conditions", "dataset_id", "sheet_id", "image", "content", "name", "verify", "time", "like", "list", "text_operator_2", "text_operator_1", "text_sort_2", "text_sort_1", "text_description", "total", "star", "star_review", "text_unit", "star_max", "title", "link_mapping", "color", "background_color", "border_color", "opacity", "transform_scale", "custom_css", "dropbox", "padding", "animation_duration", "str", "is_clipboard", "link_mapping_custom", "change_index_type", "change_index_number", "collapse_start_is_show", "lightbox_type", "hidden_ids", "show_ids", "image_url", "video_url", "video_type", "iframe_url", "ontop", "action", "target", "nofollow", "position", "animation_name", "action_type", "background-class", "background-style", "background-image", "background-color", "background-position", "background-repeat", "background-size", "is_multiple_otp", "otp_config_id", "is_multiple", "is_caption", "is_input_label", "mapping_form_id", "next_button_text", "mapping_form_name", "input_name", "input_required", "input_placeholder", "show_label", "input_tabindex", "input_standard", "input_checkbox_type", "product_setting", "ladisale_store_id", "form_account_id", "options", "option.data_formula.is_enable", "option.data_formula.text", "option.meta_data.version", "device.option.carousel_crop.margin_item", "device.option.carousel_setting.display_type", "option.carousel_setting.autoplay_type", "option.only_facebook_widget", "option.sync_ladichat_form_account_id", "option.sync_ladishare_form_account_id", "option.sync_ladiflow_form_account_id", "option.sync_ladisales_form_account_id", "option.spinlucky_setting.list_value", "option.spinlucky_setting.result_popup_id", "option.spinlucky_setting.result_message", "option.spinlucky_setting.max_turn", "option.sheet_id", "option.time_show", "option.time_delay", "option.data_event", "option.action_funnel", "option.data_tooltip.text", "option.data_tooltip.type", "option.data_tooltip.position", "option.data_tooltip.size", "option.conversion_name", "option.google_ads_conversion", "option.google_ads_label", "option.event_custom_script", "option.video_value", "option.video_type", "option.video_control", "option.background_video.video_value", "option.background_video.video_type", "option.show_popup_welcome_page", "option.delay_popup_welcome_page", "option.show_popup_exit_page", "option.popup_welcome_page_scroll_to", "option.countdown_item_type", "option.countdown_type", "option.countdown_minute", "option.countdown_daily_start", "option.countdown_daily_end", "option.countdown_endtime", "option.input_type", "option.input_default_value", "option.input_tabindex", "option.form_config_id", "option.ladisale_store_id", "option.product_tag_id", "option.form_send_ladipage", "option.data_submit_form_id", "option.thankyou_type", "option.thankyou_value", "option.deeplink_value", "option.form_thankyou_funnel", "option.form_api_data", "option.form_conversion_name", "option.form_google_ads_conversion", "option.form_purchase_value", "option.form_google_ads_label", "option.form_event_custom_script", "option.form_auto_funnel", "option.form_captcha", "option.form_auto_complete", "option.form_auto_capture", "option.input_country", "option.is_add_to_cart", "option.is_form_coupon", "option.is_form_login", "option.is_form_otp", "option.is_submit_form", "option.is_buy_now", "option.is_buy_now_ladisales", "option.is_add_to_cart_ladisales", "option.form_account_id", "option.product_type", "option.product_id", "option.product_variant_id", "option.product_mapping_name", "option.product_mapping_name_custom", "option.product_variant", "option.product_variant_type", "option.product_variant_title", "option.product_variant_price", "option.message_no_product", "option.cart_layout", "option.collection_setting.type", "option.data_setting.type", "option.data_setting.type_dataset", "option.data_setting.value", "option.data_setting.sort_name", "option.data_setting.sort_by", "option.combobox_type", "option.survey_setting.is_multiple", "option.survey_setting", "option.form_setting", "option.tabs_setting.current_tab", "option.shape_setting.2nd_click", "option.shape_setting.source_2nd_click", "option.survey_setting.input_name", "option.survey_setting.input_required", "option.sync_ladisales", "option.sync_ladiflow", "option.sync_ladishare", "option.sync_ladichat", "device.option.auto_scroll", "device.option.sticky", "device.option.sticky_position", "device.option.sticky_position_top", "device.option.sticky_position_left", "device.option.sticky_position_bottom", "device.option.sticky_position_right", "device.option.readmore_range", "device.option.gallery_control.autoplay", "device.option.gallery_control.autoplay_time", "device.option.video_autoplay", "device.option.popup_position", "device.option.popup_backdrop", "device.option.carousel_setting.autoplay", "device.option.carousel_setting.autoplay_time", "device.option.carousel_crop.width", "device.option.carousel_crop.width_item", "device.style.animation-name", "device.style.animation-delay", "device.option.collection_setting.row", "device.option.collection_setting.column", "device.option.collection_setting.margin", "device.option.image_setting.2nd_click", "device.option.image_setting.source_2nd_click", "device.option.position", "device.option.shape_setting.source_2nd_click", "device.option.background-style"],
        ACTION_TYPE: {
            menu: "menu",
            action: "action",
            "1st_click": "1st_click",
            "2nd_click": "2nd_click",
            hover: "hover",
            complete: "complete",
            open_popup: "open_popup",
            close_popup: "close_popup"
        },
        DATA_ACTION_TYPE: {
            link: "link",
            page: "page",
            category: "category",
            post: "post",
            section: "section",
            email: "email",
            phone: "phone",
            popup: "popup",
            dropbox: "dropbox",
            hidden_show: "hidden_show",
            collapse: "collapse",
            set_value: "set_value",
            tracking: "tracking",
            custom_script: "custom_script",
            copy_clipboard: "copy_clipboard",
            change_index: "change_index",
            set_style: "set_style",
            set_value_2nd: "set_value_2nd",
            lightbox: "lightbox",
            popup_cart: "popup_cart",
            popup_checkout: "popup_checkout",
            next_funnelx: "next_funnelx",
            set_goal: "set_goal",
            set_finish: "set_finish"
        },
        DATA_ACTION_LIGHTBOX_TYPE: {
            image: "image",
            video: "video",
            iframe: "iframe"
        },
        WEBSITE_PATH_DNS: {
            category: "c",
            tag: "t",
            post: "p",
            page: "",
            policy: "",
            news: "",
            search: ""
        },
        COUNTDOWN_TYPE: {
            countdown: "countdown",
            daily: "daily",
            endtime: "endtime"
        },
        COUNTDOWN_ITEM_TYPE: {
            day: "day",
            hour: "hour",
            minute: "minute",
            seconds: "seconds"
        },
        CAROUSEL_DISPLAY_TYPE: {
            vertical: "vertical",
            horizontal: "horizontal"
        },
        CAROUSEL_INDICATORS_TYPE_TYPE: {
            none: "none",
            circle: "circle",
            number: "number"
        },
        CAROUSEL_AUTOPLAY_TYPE: {
            type_ab: "type_ab",
            type_abab: "type_abab",
            type_abba: "type_abba"
        },
        GALLERY_SOURCE_TYPE: {
            ladisales: "ladisales",
            default: "default"
        },
        VIDEO_TYPE: {
            youtube: "youtube",
            direct: "direct"
        },
        BACKGROUND_STYLE: {
            solid: "solid",
            gradient: "gradient",
            image: "image",
            video: "video"
        },
        PUBLISH_PLATFORM: {
            ladipage: "LADIPAGE",
            ladipagedns: "LADIPAGEDNS",
            wordpress: "WORDPRESS",
            haravan: "HARAVAN",
            sapo: "SAPO",
            shopify: "SHOPIFY",
            itop: "ITOPWEBSITE",
            ftp: "FTP",
            other: "OTHER"
        },
        SECTION_TYPE: {
            default: "DEFAULT",
            global: "GLOBAL",
            ai: "AI"
        },
        FUNNELX_DISPLAY_SETTING_SHOW_TYPE: {
            time: "time",
            leave_page: "leave_page",
            scroll: "scroll",
            first_click: "first_click",
            loaded: "loaded"
        },
        FUNNELX_DISPLAY_SETTING_SCROLL_TYPE: {
            ontop: "ontop",
            onmiddle: "onmiddle",
            onbottom: "onbottom"
        },
        FUNNELX_DISPLAY_SETTING_HIDE_TYPE: {
            disable: "disable",
            hour: "hour",
            day: "day"
        },
        TRACKING_NAME: "ladicid",
        ACCESS_KEY_NAME: "ladiack",
        LADIFLOW_DATA_KEY_NAME: "ladifd",
        REF_NAME: "ref",
        OTP_TYPE: {
            send: "OTP_SEND",
            resend: "OTP_RESEND",
            sms: "OTP_SMS",
            voice: "OTP_VOICE",
            zns: "OTP_ZNS"
        },
        STATUS_SEND: {
            capture: 1,
            otp: 1,
            sendform: 2
        },
        PUBLISH_STYLE: {
            desktop_min_width: 768,
            mobile_small_min_width: 320
        },
        ANIMATED_LIST: ["rotate-1", "rotate-2", "rotate-3", "type", "scale", "loading-bar", "slide", "clip", "zoom", "push"],
        POSITION_TYPE: {
            default: "default",
            top: "top",
            bottom: "bottom",
            top_left: "top_left",
            top_center: "top_center",
            top_right: "top_right",
            center_left: "center_left",
            center_right: "center_right",
            bottom_left: "bottom_left",
            bottom_center: "bottom_center",
            bottom_right: "bottom_right"
        },
        COLLECTION_TYPE: {
            carousel: "carousel",
            readmore: "readmore"
        },
        COLLECTION_LIST_TYPE: {
            horizontal: "horizontal",
            vertical: "vertical"
        },
        INPUT_TYPE: {
            tel: "tel",
            password: "password",
            text: "text",
            date: "date",
            select_multiple: "select_multiple",
            number: "number",
            email: "email",
            textarea: "textarea",
            select: "select",
            radio: "radio",
            checkbox: "checkbox",
            facebook_checkbox_plugin_transactional: "facebook_checkbox_plugin_transactional",
            facebook_checkbox_plugin_promotional: "facebook_checkbox_plugin_promotional",
            file: "file",
            image_choices: "image_choices",
            product_variant: "product_variant",
            checkout_product: "checkout_product",
            checkout_total_price: "checkout_total_price",
            checkout_bump_offer: "checkout_bump_offer",
            checkout_coupon_code: "checkout_coupon_code",
            checkout_fee_shipping: "checkout_fee_shipping",
            checkout_payment: "checkout_payment"
        },
        CONTENT_TYPE: {
            form_data: "FORM_DATA",
            form_urlencoded: "X_WWW_FORM_URLENCODED",
            json: "JSON"
        },
        SORT_BY_TYPE: {
            asc: "asc",
            desc: "desc"
        },
        PRODUCT_VARIANT_TYPE: {
            combined: "combined",
            combobox: "combobox",
            label: "label"
        },
        PRODUCT_VARIANT_OPTION_TYPE: {
            color: 1,
            image: 2
        },
        PRODUCT_VARIANT_DISPLAY_TYPE: {
            text: 1,
            visual_watch: 2
        },
        PRODUCT_VARIANT_TITLE: {
            left: "left",
            top: "top"
        },
        FORM_THANKYOU_TYPE: {
            default: "default",
            url: "url",
            popup: "popup",
            section: "section",
            url_default: "url_default"
        },
        GAME_RESULT_TYPE: {
            default: "default",
            popup: "popup",
            popup_end_of_turn: "popup_end_of_turn"
        },
        PERCENT_TRACKING_SCROLL: [0, 25, 50, 75, 100],
        TIME_ONPAGE_TRACKING: [10, 30, 60, 120, 180, 300, 600],
        FORM_CONFIG_TYPE: {
            email: "EMAIL",
            mail_chimp: "MAIL_CHIMP",
            infusion_soft: "INFUSION_SOFT",
            infusion_soft_ladi: "INFUSION_SOFT_LADI",
            active_campaign: "ACTIVE_CAMPAIGN",
            sendgrid: "SENDGRID",
            hubspot: "HUBSPOT",
            smtp: "SMTP",
            esms: "ESMS",
            get_response: "GET_RESPONSE",
            convertkit: "CONVERTKIT",
            ladiflow: "LADIFLOW",
            telegram: "TELEGRAM",
            slack: "SLACK",
            zalo_zns: "ZALO_ZNS",
            mautic: "MAUTIC",
            google_sheet: "GOOGLE_SHEET",
            google_form: "GOOGLE_FORM",
            custom_api: "CUSTOM_API",
            ladisales: "LADISALES",
            ladishare: "LADISHARE",
            haravan: "HARAVAN",
            sapo: "SAPO",
            shopify: "SHOPIFY",
            nhanh_vn: "NHANH_VN",
            google_recaptcha: "GOOGLE_RECAPTCHA",
            google_recaptcha_checkbox: "GOOGLE_RECAPTCHA_CHECKBOX",
            google_recaptcha_enterprise: "GOOGLE_RECAPTCHA_ENTERPRISE",
            google_places_autocomplete: "GOOGLE_PLACES_AUTOCOMPLETE",
            kiotviet: "KIOTVIET",
            wordpress: "WORDPRESS",
            metu: "METU",
            ladichat: "LADICHAT",
            shopping: "SHOPPING",
            blog: "BLOG",
            conversion_api: "CONVERSION_API",
            tiktok_conversion_api: "TIKTOK_CONVERSION_API",
            popupx: "POPUPX"
        },
        FORM_UPLOAD_FILE_LENGTH: 20,
        FORM_UPLOAD_FILE_SIZE: 25,
        CART_LAYOUT: {
            editable: "editable",
            viewonly: "viewonly"
        },
        WIDTH_SECTION_RESIZE: {},
        RESIZE_ADD_PIXEL: 300,
        RESIZE_ADD_PIXEL_THUMB: 50,
        RESIZE_RANGE: 50,
        TOOLTIP_TYPE: {
            default: "default",
            info: "info",
            success: "success",
            error: "error",
            notice: "notice"
        },
        TOOLTIP_POSITION: {
            top_left: "top_left",
            top_middle: "top_middle",
            top_right: "top_right",
            bottom_left: "bottom_left",
            bottom_middle: "bottom_middle",
            bottom_right: "bottom_right",
            left_top: "left_top",
            left_middle: "left_middle",
            left_bottom: "left_bottom",
            right_top: "right_top",
            right_middle: "right_middle",
            right_bottom: "right_bottom"
        },
        TOOLTIP_SIZE: {
            small: "small",
            medium: "medium",
            big: "big"
        },
        OPTION_OTHER_KEY: "LADIPAGE_OTHER",
        STORY_PAGE: {
            horizontal: "horizontal",
            vertical: "vertical",
            none: "none"
        },
        COMBOBOX_TYPE: {
            delivery_method: "delivery_method"
        },
        PRODUCT_TYPE: {
            event: "Event",
            service: "Service",
            physical: "Physical",
            digital: "Digital",
            f_b: "F_B",
            combo: "COMBO",
            course: "Course"
        }
    }, this.runtime = {
        backdrop_popup_id: "backdrop-popup",
        backdrop_dropbox_id: "backdrop-dropbox",
        lightbox_screen_id: "lightbox-screen",
        builder_section_popup_id: "SECTION_POPUP",
        builder_section_background_id: "BODY_BACKGROUND",
        builder_popup_menu_mobile_id: "POPUP_MENU_MOBILE",
        ladipage_powered_by_classname: "ladipage_powered_by",
        current_element_mouse_down_image_compare: null,
        current_element_mouse_down_image_compare_position_x: 0,
        mouse_down_diff_touch_action: 10,
        current_element_mouse_down_carousel: null,
        current_element_mouse_down_carousel_position_x: 0,
        current_element_mouse_down_carousel_position_y: 0,
        current_element_mouse_down_carousel_diff: 40,
        current_element_mouse_down_gallery_control: null,
        current_element_mouse_down_gallery_control_time: 0,
        current_element_mouse_down_gallery_control_time_click: 300,
        current_element_mouse_down_gallery_control_position_x: 0,
        current_element_mouse_down_gallery_view: null,
        current_element_mouse_down_gallery_view_position_x: 0,
        current_element_mouse_down_gallery_view_position_y: 0,
        current_element_mouse_down_gallery_view_diff: 40,
        country_state_sort: {
            VN: ["201", "202", "224", "220", "203"]
        },
        location_state_sort: {
            VN: ["HN", "SG", "HP", "CT", "DN"]
        },
        scroll_show_popup: {},
        scroll_depth: [],
        scroll_to_section: {},
        send_request_response: {},
        is_mobile_only: !1,
        interval_countdown: null,
        interval_gallery: null,
        timeout_gallery: {},
        interval_carousel: null,
        count_click_dom: {},
        timenext_carousel: {},
        time_click_dom: {},
        time_click: 300,
        time_otp: 6e4,
        time_delay_click_button: 300,
        isGenerateHtml: !1,
        isClient: !1,
        isDesktop: !0,
        isBrowserDesktop: !0,
        isIE: !1,
        isLoadHtmlGlobal: !1,
        isYouTubeIframeAPIReady: !1,
        isLoadYouTubeIframeAPI: !1,
        isVideoButtonUnmute: !0,
        device: this.const.DESKTOP,
        ladipage_id: null,
        func_get_code_otp: {},
        list_scroll_func: {},
        list_loaded_func: [],
        list_show_popup_func: {},
        list_youtube_ready_exec: [],
        list_scrolling_exec: {},
        list_scrolled_exec: {},
        list_lightbox_id: {},
        list_set_value_name_country: ["ward", "district", "state", "country"],
        tmp: {},
        tabindexForm: 0,
        eventData: {},
        eventDataGlobal: {},
        timenow: 0,
        timerefresh: Date.now(),
        widthScrollBar: 0,
        replaceStr: {},
        replacePrefixStart: "{{",
        replacePrefixEnd: "}}",
        replaceNewPrefixStart: "!::",
        replaceNewPrefixEnd: "::!"
    }, this.const.WIDTH_SECTION_RESIZE[this.const.DESKTOP] = 1440, this.const.WIDTH_SECTION_RESIZE[this.const.MOBILE] = 768
}, "undefined" != typeof window && ["isObject", "isArray", "isFunction", "isBoolean", "isString", "isEmpty", "isNull"].forEach(function(t) {
    LadiPageScriptV2.prototype[t] = function(e) {
        return window[t + "LadiPage"](e)
    }
}), LadiPageScriptV2.prototype.copy = function(t) {
    if ("[object Object]" == Object.prototype.toString.call(t)) {
        var e = {};
        return Object.keys(t).forEach(i => {
            e[i] = this.copy(t[i])
        }), e
    }
    if ("[object Array]" == Object.prototype.toString.call(t)) {
        var i = [];
        return t.forEach(t => {
            i.push(this.copy(t))
        }), i
    }
    return t
};
var LadiPageScript = LadiPageScript || new LadiPageScriptV2;
LadiPageScript.init();
var LadiFormulaData = {},
    LadiFormApi = LadiFormApi || {},
    LadiPageCommand = LadiPageCommand || [],
    LadiPageLocation = LadiPageLocation || [],
    LadiPageShopping = LadiPageShopping || [],
    LadiPageFormData = LadiPageFormData || [],
    LadiPageQueueCommandList = LadiPageQueueCommandList || [],
    LadiPageQueueCommand = {
        push: function(t, e) {
            isFunctionLadiPage(t) && isFunctionLadiPage(e) && (t() ? e() : LadiPageQueueCommandList.push({
                callback1: t,
                callback2: e
            }))
        }
    };
LadiPageScriptV2.prototype.getCheckoutProductVariantIndex = function(t, e) {
    var i = this,
        a = -1,
        n = {},
        o = Array.from(e.querySelectorAll(".ladi-checkout-product-variant > .ladi-frame > .ladi-element .ladi-button-group"));
    o.forEach(function(t) {
        var e = t.querySelector(".ladi-element.selected");
        if (!isEmptyLadiPage(e)) {
            var a = i.findAncestor(t, ["ladi-frame", "ladi-element"]).querySelector(".ladi-frame > .ladi-element > .ladi-paragraph").textContent;
            n[a] = e.textContent
        }
    });
    var r = Object.keys(n);
    return r.length == o.length && isArrayLadiPage(t.variants) && (a = t.variants.findIndex(function(t) {
        var e = !0;
        return r.forEach(function(i, a) {
            t["option" + (a + 1)] != n[i] && (e = !1)
        }), e
    })), a
}, LadiPageScriptV2.prototype.getInfoDetailProductLadiSales = function(t, e, i) {
    var a = this,
        n = e ? a.runtime.store_id : window.$rootScope.getStoreId(),
        o = e ? a.runtime.store_ladiuid : window.$rootScope.store.ladi_uid,
        r = n + "_" + t;
    isObjectLadiPage(a.runtime.tmp.product_info_ladisales) || (a.runtime.tmp.product_info_ladisales = {});
    var d = a.runtime.tmp.product_info_ladisales[r];
    if (isObjectLadiPage(d)) ! function(t) {
        200 == t.code && isFunctionLadiPage(i) && i(t.data.product)
    }(d);
    else if (!0 !== d) {
        var l = {
                product_id: t,
                ladi_uid: o
            },
            s = null;
        a.runtime.tmp.product_info_ladisales[r] = !0, a.runLimitRequest(20, function() {
            var o = a.const.API_LADISALE_SHOW_PRODUCT_LDP;
            (s = {
                "Content-Type": "application/json"
            })["Store-Id"] = n, l = JSON.stringify(l), a.sendRequest("POST", o, l, !0, s, function(n, o, l) {
                if (l.readyState == XMLHttpRequest.DONE) try {
                    d = JSON.parse(n), a.runtime.tmp.product_info_ladisales[r] = d, a.getInfoDetailProductLadiSales(t, e, i)
                } catch (t) {}
            })
        })
    } else a.runTimeout(function() {
        a.getInfoDetailProductLadiSales(t, e, i)
    }, 100)
}, LadiPageScriptV2.prototype.frequencyFormDataByKey = function(t) {
    var e = {
            page_view: "pv",
            submit_form: "sf",
            view: "v",
            guest: "g",
            session: "s",
            hour: "h",
            day: "d",
            week: "w",
            month: "m"
        } [t.key] || t.key,
        i = 0,
        a = window.ladi("LADI_FFD").get_cookie();
    try {
        if (a = Base64.decode(a), a = JSON.parse(a), !isObjectLadiPage(a)) throw new TypeError("json error")
    } catch (t) {
        a = {}
    }
    if (t.getValue) return "session" == t.key ? i = parseFloatLadiPage(window.ladi("LADI_SSFFD").get_cookie()) || 0 : "view" == t.key ? i = parseFloatLadiPage(this.runtime.tmp.frequency_form_data_view) || 0 : isObjectLadiPage(a[e]) && parseFloatLadiPage(a[e].e) >= Math.floor(Date.now() / 1e3) && (i = parseFloatLadiPage(a[e].v) || 0), i;
    if (t.addValue >= 1)
        if (i = this.frequencyFormDataByKey({
                getValue: !0,
                key: t.key
            }), i += t.addValue, "session" == t.key) window.ladi("LADI_SSFFD").set_cookie(i, new Date, null, null, !0);
        else if ("view" == t.key) this.runtime.tmp.frequency_form_data_view = i;
    else {
        var n = new Date;
        n.setTime(n.getTime() + 24 * t.expires * 60 * 60 * 1e3), a[e] = {
            e: Math.floor(n.getTime() / 1e3),
            v: i
        }, window.ladi("LADI_FFD").set_cookie(Base64.encode(JSON.stringify(a)), 365)
    }
}, LadiPageScriptV2.prototype.convertEventDataDevice = function(t, e, i) {
    var a = this;
    if (isObjectLadiPage(e)) {
        var n = null,
            o = null;
        Object.keys(e).forEach(function(r) {
            r.toLowerCase().startsWith(a.const.DEVICE) && (n = a.const.DESKTOP + r.substring(a.const.DEVICE.length), o = a.const.MOBILE + r.substring(a.const.DEVICE.length), e[n] = e[r], e[o] = e[r], delete e[r]), isObjectLadiPage(i) && !i.is_check_convert_device || (t && r.toLowerCase().startsWith(a.const.DESKTOP) && (o = a.const.MOBILE + r.substring(a.const.DESKTOP.length), e[o] = e[r]), !t && r.toLowerCase().startsWith(a.const.MOBILE) && (n = a.const.DESKTOP + r.substring(a.const.MOBILE.length), e[n] = e[r]))
        })
    }
    return e
}, LadiPageScriptV2.prototype.loadHtmlGlobal = function(t, e, i) {
    var a = this,
        n = 0,
        o = [],
        r = document;
    if (!isEmptyLadiPage(t)) {
        var d = new window.DOMParser;
        r = d.parseFromString(t, "text/html")
    }
    for (var l = r.querySelectorAll(".ladi-section[data-global-id]"), s = 0; s < l.length; s++) {
        var c = l[s],
            u = c.getAttribute("data-global-id"),
            p = c.getAttribute("data-store-id");
        isEmptyLadiPage(u) || "true" == c.getAttribute("data-loaded") || o.push({
            id: c.id,
            data_global_id: u,
            store_id: p
        })
    }
    var m = function(d) {
            if (isEmptyLadiPage(t) || n != o.length) {
                if (isObjectLadiPage(d)) Object.keys(d).forEach(function(t) {
                    a.runtime.eventDataGlobal[t] = d[t]
                });
                n == o.length && (_(), g(), y(), a.runtime.isLoadHtmlGlobal = !0, a.run(e, i))
            } else isFunctionLadiPage(i) && (o.forEach(function(t) {
                var e = r.getElementById(t.id);
                isEmptyLadiPage(e) || e.setAttribute("data-loaded", !0)
            }), i(r.head.innerHTML + r.body.innerHTML))
        },
        _ = function() {
            a.runtime.shopping || 0 != r.querySelectorAll('div.ladi-section-global[data-shopping="true"]').length && (a.runtime.shopping = !0)
        },
        g = function() {
            a.runtime.formdata || 0 != r.querySelectorAll('div.ladi-section-global[data-formdata="true"]').length && (a.runtime.formdata = !0)
        },
        y = function() {
            for (var t = [], e = r.querySelectorAll("div.ladi-section-global[data-country-file]"), i = 0; i < e.length; i++) {
                var n = e[i].getAttribute("data-country-file");
                isEmptyLadiPage(n) || (n = (n = n.split(";")).removeSpace(), t = t.concat(n))
            }
            a.runtime.list_country = a.runtime.list_country || [];
            var o = (t = t.unique()).except(a.runtime.list_country);
            a.runtime.list_country = a.runtime.list_country.concat(o), o.length > 0 && a.runtime.hasOwnProperty("cdn_url") && a.runtime.hasOwnProperty("version") && o.forEach(function(t) {
                var e = a.runtime.cdn_url + t + ".js?v=" + a.runtime.version;
                a.loadScript(e, {
                    defer: !0
                }, null, function(t) {
                    a.runAfterLocation()
                })
            })
        };
    o.forEach(function(t) {
        var e = t.id,
            i = r.getElementById(e),
            o = a.runtime.store_id;
        isEmptyLadiPage(t.store_id) || (o = t.store_id);
        var d = a.runtime.isGenerateHtml,
            l = a.const.API_SECTION_GLOBAL_HTML.format(o, t.data_global_id);
        a.runtime.isGenerateHtml = !1, a.sendRequest("GET", l, null, !0, null, function(o, d, l) {
            if (l.readyState == XMLHttpRequest.DONE) {
                var s = document.createElement("div");
                if (s.innerHTML = o, isEmptyLadiPage(s.querySelector('div.ladi-section-global[data-id="' + t.id + '"] .ladi-section[data-global-id="' + t.data_global_id + '"]'))) try {
                    i.parentElement.removeChild(i)
                } catch (t) {} else {
                    var c = a.findAncestor(i, "ladi-section-global");
                    isEmptyLadiPage(c) || (i = c);
                    var u = s.querySelector('[id^="POPUP_MENU_MOBILE_"][data-dropbox="true"]');
                    if (!isEmptyLadiPage(u)) {
                        var p = u.outerHTML,
                            _ = u.id;
                        u.parentElement.removeChild(u);
                        var g = document.getElementById("SECTION_POPUP");
                        isEmptyLadiPage(g) && ((g = document.createElement("div")).id = "SECTION_POPUP", g.innerHTML = '<div class="ladi-section-background"></div><div class="ladi-container"></div>', document.getElementsByClassName("ladi-wraper")[0].appendChild(g));
                        var y = document.getElementById(_);
                        isEmptyLadiPage(y) && (y = document.createElement("div"), g.getElementsByClassName("ladi-container")[0].appendChild(y), y.outerHTML = p)
                    }
                    var h = function(t, e) {
                        var i = s.querySelector("style#" + t);
                        isEmptyLadiPage(i) || i.parentElement.removeChild(i), i = s.querySelector("style#" + e), isEmptyLadiPage(i) || i.removeAttribute("media")
                    };
                    a.runtime.is_mobile_only || a.runtime.is_adaptive_design && a.runtime.adaptive_design_is_mobile ? h("style_section_global_desktop", "style_section_global_mobile") : a.runtime.is_adaptive_design && !a.runtime.adaptive_design_is_mobile && h("style_section_global_mobile", "style_section_global_desktop"), s = function(t) {
                        return isFunctionLadiPage(window.lazyload_run) && (t = window.lazyload_run(t, !1, !1)), t.innerHTML
                    }(s);
                    try {
                        var f = document.createRange().createContextualFragment(s);
                        i.parentElement.replaceChild(f, i)
                    } catch (t) {
                        i.outerHTML = s
                    }
                }! function(t) {
                    n++;
                    var e = r.querySelector('.ladi-section-global[data-id="' + t + '"] > script');
                    if (isEmptyLadiPage(e)) m();
                    else {
                        var i = null;
                        try {
                            i = JSON.parse(e.innerHTML), Object.keys(i).forEach(function(t) {
                                i[t] = a.deOptimizeEventData(a.copy(i[t]), a.const.OPTIMIZE_EVENT_DATA_KEY_LIST, "OPTIMIZE_EVENT_DATA_KEY_LIST"), i[t] = a.decodeValue(i[t])
                            })
                        } catch (t) {}
                        e.parentElement.removeChild(e), m(i)
                    }
                }(e)
            }
        }), a.runtime.isGenerateHtml = d
    }), m()
}, LadiPageScriptV2.prototype.checkHover = function() {
    var t = "ladi_check_hover",
        e = document.getElementById(t);
    return isEmptyLadiPage(e) && ((e = document.createElement("div")).id = t, e.className = "ladi-check-hover", e.style.setProperty("display", "none", "important"), document.body.appendChild(e)), 0 == getComputedStyle(e).opacity
}, LadiPageScriptV2.prototype.setLadiVariable = function() {
    for (var t = document.querySelectorAll("script." + this.const.SCRIPT_LADI_VARIABLE), e = 0; e < t.length; e++) try {
        for (var i = JSON.parse(t[e].innerHTML), a = Object.keys(i), n = 0; n < a.length; n++) {
            var o = a[n];
            this.setDataReplaceStr(o, i[o])
        }
    } catch (t) {}
}, LadiPageScriptV2.prototype.getOptimizeSourceKey = function(t) {
    var e = {};
    t = (t = this.copy(t)).reverse();
    for (var i = [], a = "a".charCodeAt(); a < "z".charCodeAt(); a++) i.push(String.fromCharCode(a));
    for (var n = "A".charCodeAt(); n < "Z".charCodeAt(); n++) i.push(String.fromCharCode(n));
    for (a = "a".charCodeAt(); a < "z".charCodeAt(); a++) {
        for (n = "a".charCodeAt(); n < "z".charCodeAt(); n++) i.push(String.fromCharCode(a) + String.fromCharCode(n));
        for (n = "A".charCodeAt(); n < "Z".charCodeAt(); n++) i.push(String.fromCharCode(a) + String.fromCharCode(n))
    }
    for (a = "A".charCodeAt(); a < "Z".charCodeAt(); a++) {
        for (n = "a".charCodeAt(); n < "z".charCodeAt(); n++) i.push(String.fromCharCode(a) + String.fromCharCode(n));
        for (n = "A".charCodeAt(); n < "Z".charCodeAt(); n++) i.push(String.fromCharCode(a) + String.fromCharCode(n))
    }
    var o = 0,
        r = function(t) {
            var a = i[o % i.length],
                n = Math.floor(o / i.length);
            n > 0 && (a += n), e[t] = a, o++, "id" == a && r(t)
        };
    return t.forEach(r), e
}, LadiPageScriptV2.prototype.optimizeEventData = function(t, e, i) {
    var a = this,
        n = a.runtime.tmp["DATA_O_" + i];
    if (isArrayLadiPage(e) && isNullLadiPage(n)) {
        var o = [];
        "OPTIMIZE_EVENT_DATA_KEY_LIST" == i ? (e.forEach(function(t) {
            o.push(t), t.startsWith(a.const.DEVICE + ".") && (o.push(a.const.DESKTOP + t.substring(a.const.DEVICE.length)), o.push(a.const.MOBILE + t.substring(a.const.DEVICE.length)))
        }), o.push("type")) : o = e, n = a.getOptimizeSourceKey(o), a.runtime.tmp["DATA_O_" + i] = n
    }
    isObjectLadiPage(t) && Object.keys(t).forEach(function(e) {
        -1 == a.const.OPTIMIZE_EXCEPT_EVENT_DATA_KEY_LIST.indexOf(e) ? isNullLadiPage(n[e]) ? t[e] = a.optimizeEventData(t[e], null, i) : (t[n[e]] = a.optimizeEventData(t[e], null, i), delete t[e]) : isNullLadiPage(n[e]) || (t[n[e]] = t[e], delete t[e])
    });
    return isArrayLadiPage(t) && t.forEach(function(e, n) {
        t[n] = a.optimizeEventData(e, null, i)
    }), t
}, LadiPageScriptV2.prototype.deOptimizeEventData = function(t, e, i) {
    var a = this,
        n = a.runtime.tmp["DATA_D_" + i];
    if (isArrayLadiPage(e) && isNullLadiPage(n)) {
        n = {}, a.optimizeEventData(null, e, i);
        var o = a.runtime.tmp["DATA_O_" + i];
        Object.keys(o).forEach(function(t) {
            n[o[t]] = t
        }), a.runtime.tmp["DATA_D_" + i] = n
    }
    return isObjectLadiPage(t) && Object.keys(t).forEach(function(e) {
        -1 == a.const.OPTIMIZE_EXCEPT_EVENT_DATA_KEY_LIST.indexOf(e) ? isNullLadiPage(n[e]) ? t[e] = a.deOptimizeEventData(t[e], null, i) : (t[n[e]] = a.deOptimizeEventData(t[e], null, i), delete t[e]) : isNullLadiPage(n[e]) || (t[n[e]] = t[e], delete t[e])
    }), isArrayLadiPage(t) && t.forEach(function(e, n) {
        t[n] = a.deOptimizeEventData(e, null, i)
    }), t
}, LadiPageScriptV2.prototype.postMessageWindow = function(t, e, i) {
    t.postMessage(JSON.stringify(e), i)
}, LadiPageScriptV2.prototype.updateHeightElement = function(t, e, i, a, n, o) {
    var r = this;
    if (a != n) {
        var d = "style_update_height_element",
            l = !0;
        if ("fixed" == getComputedStyle(e).position && (l = !1), t) {
            r.runtime.tmp.dimension_element_new = {};
            var s = "#" + r.runtime.builder_section_popup_id + " > .ladi-container > .ladi-element { max-height: none !important;}";
            r.createStyleElement(d, s)
        }
        for (var c, u, p = function(t, i) {
                return t.id == e.id && "height" == i ? n : isEmptyLadiPage(r.runtime.tmp.dimension_element_new[t.id + i]) ? parseFloatLadiPage(getComputedStyle(t)[i]) || 0 : r.runtime.tmp.dimension_element_new[t.id + i]
            }, m = function(t, e, i) {
                var a = p(t, e) + i;
                if (o) {
                    var n = "transition-parent-collapse-" + e;
                    t.classList.add(n);
                    var d = 1e3 * parseFloatLadiPage(getComputedStyle(t).transitionDuration);
                    r.runTimeout(function() {
                        t.classList.remove(n)
                    }, d)
                }
                t.style.setProperty(e, a + "px"), r.runtime.tmp.dimension_element_new[t.id + e] = a
            }, _ = function(t) {
                for (var e = [], i = 0; i < t.parentElement.children.length; i++)(t.parentElement.children[i].classList.contains("ladi-element") || t.parentElement.children[i].classList.contains("ladi-section")) && e.push(t.parentElement.children[i]);
                return e
            }, g = n - a, y = p(e, "top") + a, h = _(e), f = 0; f < h.length; f++) {
            var v = h[f];
            v.id != e.id && (p(v, "top") >= y && m(v, "top", g))
        }
        if (!isEmptyLadiPage(i) && i.id != r.runtime.builder_section_popup_id) {
            var E = p(i, "height"),
                P = function() {
                    for (var t = 0, i = _(e), a = 0; a < i.length; a++) {
                        var n = i[a];
                        if ("none" != getComputedStyle(n).display && 0 != p(n, "height")) {
                            var o = p(n, "top") + p(n, "height");
                            o > t && (t = o)
                        }
                    }
                    return t
                }();
            if ((i.classList.contains("ladi-section") || i.getElementsByClassName("ladi-popup").length > 0) && (P = E + g), m(i, "height", P - E), l) {
                var L = (c = i, u = r.findAncestor(c.parentElement, "ladi-element"), isEmptyLadiPage(u) && (u = r.findAncestor(c.parentElement, "ladi-section")), u);
                this.updateHeightElement(!1, i, L, E, P, o)
            }
        }
        if (t) {
            if (this.runtime.tmp.is_loaded_func_done) {
                var b = document.getElementById(d);
                isEmptyLadiPage(b) || b.parentElement.removeChild(b)
            }
            delete r.runtime.tmp.dimension_element_new, r.runtime.tmp.is_window_resize || r.fireEvent(window, "resize", {
                set_viewport: !1
            })
        }
    }
}, LadiPageScriptV2.prototype.showParentVisibility = function(t, e) {
    var i = this.findAncestor(t, "ladi-popup");
    if (!isEmptyLadiPage(i) && (i = this.findAncestor(i, "ladi-element"), !isEmptyLadiPage(i))) return "none" == getComputedStyle(i).display && i.classList.add("hide-visibility"), isFunctionLadiPage(e) && e(), void i.classList.remove("hide-visibility");
    isFunctionLadiPage(e) && e()
}, LadiPageScriptV2.prototype.pauseAllVideo = function(t) {
    var e = document.getElementById(this.runtime.lightbox_screen_id).getElementsByClassName("lightbox-close")[0];
    if (!isEmptyLadiPage(e)) return e.click(), this.pauseAllVideo(t);
    delete this.runtime.tmp.gallery_playing_video;
    for (var i = (t = t || document).querySelectorAll(".iframe-video-preload:not(.no-pause)"), a = 0; a < i.length; a++) this.runEventReplayVideo(i[a].id, i[a].getAttribute("data-video-type"), !1)
}, LadiPageScriptV2.prototype.runEventReplayVideo = function(t, e, i) {
    var a = this,
        n = document.getElementById(t),
        o = null;
    if (!isEmptyLadiPage(n)) {
        var r = document.getElementById(t + "_button_unmute"),
            d = isEmptyLadiPage(r);
        if (e == a.const.VIDEO_TYPE.youtube) {
            o = i ? "playVideo" : "pauseVideo";
            var l = !1;
            if (a.runtime.isYouTubeIframeAPIReady) {
                var s = window.YT.get(t);
                if (!isEmptyLadiPage(s)) {
                    if (d && i && isFunctionLadiPage(s.unMute) && s.unMute(), !d && i && isFunctionLadiPage(s.mute) && s.mute(), !isFunctionLadiPage(s[o])) return void a.runTimeout(function() {
                        a.runEventReplayVideo(t, e, i)
                    }, 100);
                    s[o](), l = !0
                }
            }
            l || (d && i && a.postMessageWindow(n.contentWindow, {
                event: "command",
                func: "unMute",
                args: []
            }, "*"), !d && i && a.postMessageWindow(n.contentWindow, {
                event: "command",
                func: "mute",
                args: []
            }, "*"), a.postMessageWindow(n.contentWindow, {
                event: "command",
                func: o,
                args: []
            }, "*"))
        }
        e == a.const.VIDEO_TYPE.direct && (o = i ? "play" : "pause", d && i && (n.muted = !1), !d && i && (n.muted = !0), isFunctionLadiPage(n[o]) && n[o]()), i ? (n.classList.remove("ladi-hidden"), isEmptyLadiPage(r) || r.style.removeProperty("display")) : (n.classList.add("ladi-hidden"), isEmptyLadiPage(r) || r.style.setProperty("display", "none"))
    }
}, LadiPageScriptV2.prototype.runEventPlayVideo = function(t, e, i, a, n, o, r, d, l, s) {
    var c = this,
        u = c.runtime.isVideoButtonUnmute;
    (c.runtime.isDesktop || r || d || n || a) && (u = !1);
    var p = function(t, i) {
            if (u && !t.hasAttribute("data-remove-button-unmute")) {
                var a = t.id + "_button_unmute",
                    n = document.getElementById(a);
                isEmptyLadiPage(n) && ((n = document.createElement("div")).id = a, n.innerHTML = "<div></div>", n.className = "button-unmute ladi-hidden", n.addEventListener("click", function(i) {
                    if (i.stopPropagation(), t = document.getElementById(t.id), e == c.const.VIDEO_TYPE.youtube) {
                        var a = !1;
                        if (c.runtime.isYouTubeIframeAPIReady) {
                            var o = window.YT.get(t.id);
                            !isEmptyLadiPage(o) && isFunctionLadiPage(o.unMute) && (o.unMute(), a = !0)
                        }
                        a || c.postMessageWindow(t.contentWindow, {
                            event: "command",
                            func: "unMute",
                            args: []
                        }, "*")
                    }
                    e == c.const.VIDEO_TYPE.direct && (t.muted = !1), n.parentElement.removeChild(n), t.setAttribute("data-remove-button-unmute", !0)
                }), t.parentElement.appendChild(n)), i && n.classList.remove("ladi-hidden");
                var o = c.findAncestor(t, "lightbox-screen");
                isEmptyLadiPage(o) || (n.style.setProperty("width", getComputedStyle(t).width), n.style.setProperty("height", getComputedStyle(t).height))
            }
        },
        m = document.getElementById(t);
    if (!isEmptyLadiPage(m)) {
        var _ = c.findAncestor(m, "ladi-video");
        isEmptyLadiPage(_) || (_ = c.findAncestor(_, "ladi-element")), !a || o || isEmptyLadiPage(_) || (_.classList.add("pointer-events-none"), m.classList.add("no-pause")), r && m.classList.add("ladi-hidden");
        var g = "";
        if (!isEmptyLadiPage(_)) {
            var y = _.getElementsByClassName("ladi-video-background")[0];
            if (!isEmptyLadiPage(y)) {
                var h = getComputedStyle(y).backgroundImage;
                h.toLowerCase().startsWith('url("') && h.toLowerCase().endsWith('")') && (h = (h = h.substr('url("'.length)).substr(0, h.length - '")'.length), isEmptyLadiPage(h) || (g = h))
            }
        }
        if (e == c.const.VIDEO_TYPE.youtube) {
            var f = c.getVideoId(e, i),
                v = function() {
                    try {
                        if (c.runtime.isLoadYouTubeIframeAPI && c.runtime.isYouTubeIframeAPIReady || !isObjectLadiPage(window.YT) || !isFunctionLadiPage(window.YT.Player) || (c.runtime.isLoadYouTubeIframeAPI = !0, c.runtime.isYouTubeIframeAPIReady = !0), c.runtime.isLoadYouTubeIframeAPI || (c.runtime.isLoadYouTubeIframeAPI = !0, window.onYouTubeIframeAPIReady = function() {
                                c.runtime.isYouTubeIframeAPIReady = !0;
                                for (; c.runtime.list_youtube_ready_exec.length > 0;) c.runtime.list_youtube_ready_exec.shift()()
                            }, c.loadScript("https://www.youtube.com/iframe_api")), !c.runtime.isYouTubeIframeAPIReady) return void c.runtime.list_youtube_ready_exec.push(v);
                        m.outerHTML = m.outerHTML.replaceAll("<iframe", "<div").replaceAll("</iframe>", "</div>"), m = document.getElementById(t), n && m.classList.add("opacity-0");
                        var e = function() {
                                n && (m = document.getElementById(t)).classList.remove("opacity-0")
                            },
                            i = e,
                            _ = function(e) {
                                m = document.getElementById(t);
                                var i = window.YT.get(t);
                                isEmptyLadiPage(i) || isEmptyLadiPage(m) ? c.runTimeout(_, 100) : (c.runResizeAll(), a || u ? i.mute() : i.unMute(), r || d || i.playVideo(), isFunctionLadiPage(s) && s(), p(m))
                            };
                        new window.YT.Player(t, {
                            videoId: f,
                            playerVars: {
                                rel: 0,
                                modestbranding: 0,
                                playsinline: n || a || l || u ? 1 : 0,
                                controls: !n && o ? 1 : 0
                            },
                            events: {
                                onReady: _,
                                onStateChange: function(i) {
                                    if (i.data == window.YT.PlayerState.PLAYING) {
                                        if (m = document.getElementById(t), n) {
                                            var a = function() {
                                                window.YT.get(t).getCurrentTime() >= .1 ? e() : c.runTimeout(a, 100)
                                            };
                                            a()
                                        }
                                        p(m, !0);
                                        var o = document.getElementById(t + "_button_unmute");
                                        isEmptyLadiPage(o) || window.YT.get(t).mute()
                                    }
                                    i.data == window.YT.PlayerState.ENDED && window.YT.get(t).playVideo()
                                },
                                onError: i
                            }
                        })
                    } catch (t) {}
                };
            v()
        }
        if (e == c.const.VIDEO_TYPE.direct) {
            isEmptyLadiPage(g) || m.setAttribute("poster", g), m.setAttribute("preload", "auto"), m.setAttribute("controlslist", "nodownload"), m.setAttribute("loop", ""), r || d || m.setAttribute("autoplay", ""), (n || a || l || u) && (m.setAttribute("playsinline", ""), m.setAttribute("webkit-playsinline", "")), !n && o && m.setAttribute("controls", ""), a || u ? m.setAttribute("muted", "") : m.removeAttribute("muted"), n && m.classList.add("opacity-0");
            var E = function() {
                n && (m = document.getElementById(t)).classList.remove("opacity-0")
            };
            m.removeAttribute("src"), m.setAttribute("data-src", i), m.outerHTML = m.outerHTML.replaceAll("data-src=", "src="), m = document.getElementById(t), isFunctionLadiPage(s) && s(m), m.addEventListener("loadedmetadata", function(t) {
                p(m)
            }), m.addEventListener("error", E), m.addEventListener("playing", function(t) {
                if (n) {
                    var e = function() {
                        m.currentTime >= .1 ? E() : c.runTimeout(e, 100)
                    };
                    e()
                }
                p(m, !0);
                var i = document.getElementById(m.id + "_button_unmute");
                isEmptyLadiPage(i) || (m.muted = !0)
            })
        }
    }
}, LadiPageScriptV2.prototype.playVideo = function(t, e, i, a, n, o) {
    var r = document.getElementById(t);
    if (!isEmptyLadiPage(r)) {
        var d = document.getElementById(t + "_player");
        if (o || n || this.pauseAllVideo(), isEmptyLadiPage(d)) {
            var l = r.getElementsByClassName("ladi-video")[0],
                s = t + "_player";
            e == this.const.VIDEO_TYPE.youtube && (!n && r.hasAttribute("data-video-played") || (l.innerHTML = l.innerHTML + '<iframe id="' + s + '" class="iframe-video-preload" data-video-type="' + e + '" data-autoplay="' + n + '" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', this.runEventPlayVideo(s, e, i, n, !1, a, o))), e == this.const.VIDEO_TYPE.direct && (l.innerHTML = l.innerHTML + '<video id="' + s + '" class="iframe-video-preload" data-video-type="' + e + '" data-autoplay="' + n + '" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; object-fit: cover;"></video>', this.runEventPlayVideo(s, e, i, n, !1, a, o))
        } else this.runEventReplayVideo(d.id, e, !0)
    }
}, LadiPageScriptV2.prototype.checkResizeImage = function(t) {
    var e = [".jpg", ".jpeg", ".png"],
        i = function(t) {
            for (var i = !1, a = 0; a < e.length; a++)
                if (t.endsWith(e[a])) {
                    i = !0;
                    break
                } return i
        };
    if (!i(t.toLowerCase())) {
        var a = this.getElementAHref(t, !0);
        return a.search = "", i(a.href)
    }
    return !0
}, LadiPageScriptV2.prototype.getOptimizeImage = function(t, e, i, a, n, o, r) {
    if (isEmptyLadiPage(t) || !isStringLadiPage(t)) return t;
    var d = t.split("/"),
        l = d.indexOf("");
    if (-1 != l && d.length > l + 1 && (d[l + 1] = d[l + 1].toLowerCase()), l = d.indexOf(this.const.STATIC_W_DOMAIN.toLowerCase()), this.checkResizeImage(t) && -1 != l && (d.length == l + 3 || d.length == l + 6 && "ls" == d[3] && "product" == d[5] || d.length == l + 4 && "luid" == d[3] && "avatar" == d[4] || d.length == l + 4 && "rbg" == d[4])) {
        var s = d[l + 1].toLowerCase(),
            c = !0;
        if (s.startsWith("s")) {
            var u = s.split("x");
            2 == u.length && parseFloatLadiPage(u[1]) == u[1] && (c = !1)
        }
        if (c) {
            if (r || n) {
                if (e = parseInt(e) || 0, i = parseInt(i) || 0, a) {
                    var p = this.const.RESIZE_RANGE + (o ? this.const.RESIZE_ADD_PIXEL_THUMB : this.const.RESIZE_ADD_PIXEL);
                    (e <= 0 || i <= 0) && (p *= 2), e = e - e % this.const.RESIZE_RANGE + p, i = i - i % this.const.RESIZE_RANGE + p
                }
            } else e = this.const.WIDTH_SECTION_RESIZE[LadiPage.data.device_screen], i = this.const.WIDTH_SECTION_RESIZE[LadiPage.data.device_screen];
            d.insert(l + 1, "s" + e + "x" + i)
        }
    }
    return t = d.join("/")
}, LadiPageScriptV2.prototype.historyReplaceState = function(t) {
    try {
        window.history.replaceState(null, null, t)
    } catch (t) {}
}, LadiPageScriptV2.prototype.resetViewport = function() {}, LadiPageScriptV2.prototype.runStoryPage = function() {
    var t = this,
        e = t.runtime.story_page;
    if (isObjectLadiPage(e)) {
        var i = document.getElementsByClassName("ladi-wraper")[0];
        if (!isEmptyLadiPage(i)) {
            var a = document.getElementsByClassName("ladi-story-page-progress-bar")[0];
            isEmptyLadiPage(a) || a.parentElement.removeChild(a);
            var n = document.querySelectorAll('.ladi-section:not([id="' + this.runtime.builder_section_popup_id + '"]):not([id="' + this.runtime.builder_section_background_id + '"])');
            if (0 != n.length) {
                (a = document.createElement("div")).className = "ladi-story-page-progress-bar";
                for (var o = null, r = (n[0], function(e, i) {
                        e.addEventListener("click", function(e) {
                            e.stopPropagation(), t.removeTimeout(t.runtime.tmp.story_page_next_timeout_id), window.ladi(i.id, i).scroll()
                        })
                    }), d = 0; d < n.length; d++) {
                    var l = document.createElement("div");
                    l.className = "ladi-story-page-progress-bar-item", l.style.setProperty("width", "calc(100% / " + n.length + " - 10px)"), r(l, n[d]), a.appendChild(l), 0 == d && (o = l)
                }
                i.appendChild(a), t.runtime.tmp.story_page_mouse_down = !1, t.runtime.tmp.story_page_current_page = 1;
                var s = function(t, i) {
                        if (!isEmptyLadiPage(t)) {
                            i && t.click();
                            for (var a = t; !isEmptyLadiPage(a.previousElementSibling);)(a = a.previousElementSibling).classList.add("active");
                            for (var n = t; !isEmptyLadiPage(n.nextElementSibling);)(n = n.nextElementSibling).classList.remove("active");
                            t.classList.remove("active");
                            var o = t.parentElement.getElementsByTagName("span")[0];
                            isEmptyLadiPage(o) || o.parentElement.removeChild(o), o = document.createElement("span"), t.appendChild(o), e.is_autoplay || o.style.setProperty("width", "100%")
                        }
                    },
                    c = function() {
                        if (e.is_autoplay) {
                            var i = 300,
                                a = null;
                            if (isEmptyLadiPage(t.runtime.tmp.current_default_popup_id) && !t.runtime.tmp.story_page_mouse_down && !t.runtime.tmp.story_page_scroll && (a = document.querySelector(".ladi-story-page-progress-bar-item span"), !isEmptyLadiPage(a))) {
                                var n = parseFloatLadiPage(a.style.getPropertyValue("width")) || 0;
                                n = (n = ((n = 1e3 * e.autoplay_time / (100 / n)) + i) / (1e3 * e.autoplay_time) * 100) > 100 ? 100 : n, a.style.setProperty("width", n + "%"), n >= 100 && (t.runtime.tmp.story_page_next_timeout_id = t.runTimeout(function() {
                                    isEmptyLadiPage(a.parentElement) || s(a.parentElement.nextElementSibling, !0)
                                }, i), i *= 2)
                            }
                            t.runtime.tmp.story_page_timeout_id = t.runTimeout(c, i)
                        }
                    };
                s(o, !1), t.runtime.tmp.story_page_timeout_id = t.runTimeout(c, 300), document.addEventListener("mousedown", function(e) {
                    t.runtime.tmp.story_page_mouse_down = !0
                }), document.addEventListener("touchstart", function(e) {
                    t.runtime.tmp.story_page_mouse_down = !0
                }, t.runtime.scrollEventPassive), document.addEventListener("mouseup", function(e) {
                    t.runtime.tmp.story_page_mouse_down = !1
                }), document.addEventListener("touchend", function(e) {
                    t.runtime.tmp.story_page_mouse_down = !1
                }), i.addEventListener("scroll", function(a) {
                    isEmptyLadiPage(t.runtime.tmp.current_default_popup_id) && (t.runtime.tmp.story_page_scroll = !0, t.removeTimeout(t.runtime.tmp.story_page_scroll_timeout_id), t.removeTimeout(t.runtime.tmp.story_page_timeout_id), t.runtime.tmp.story_page_scroll_timeout_id = t.runTimeout(function() {
                        var a = 0,
                            n = e.type == t.const.STORY_PAGE.horizontal ? i.scrollLeft / i.clientWidth : i.scrollTop / i.clientHeight;
                        if ((n = Math.floor(n + 1.5)) != t.runtime.tmp.story_page_current_page) {
                            t.runtime.tmp.story_page_current_page = n;
                            var o = document.querySelector(".ladi-story-page-progress-bar-item:nth-child(" + n + ")");
                            t.removeTimeout(t.runtime.tmp.story_page_next_timeout_id), s(o, !1), a = 100
                        }
                        t.runtime.tmp.story_page_scroll = !1, delete t.runtime.tmp.story_page_scroll_timeout_id, t.runtime.tmp.story_page_timeout_id = t.runTimeout(c, a)
                    }, 300))
                }, t.runtime.scrollEventPassive)
            }
        }
    }
}, LadiPageScriptV2.prototype.runThankyouPage = function() {
    var t = this,
        e = t.runtime.thankyou_page;
    if (isObjectLadiPage(e)) {
        var i = {
            is_custom: !0
        };
        i.conversion_name = e.event_value, i.google_ads_conversion = e.event_id, i.google_ads_label = e.event_label, i.purchase_value = e.purchase_value, i.event_category = "LadiPageThankYouPage";
        var a = null;
        ["phone", "email"].forEach(function(e) {
            var i = t.getDataReplaceStr(e);
            isEmptyLadiPage(i) || (isObjectLadiPage(a) || (a = {}), a[e] = i)
        }), t.runEventTracking(null, i, a), delete t.runtime.thankyou_page
    }
}, LadiPageScriptV2.prototype.runResizeSectionBackground = function() {
    var t = this;
    t instanceof LadiPageScriptV2 || (t = LadiPageScript);
    try {
        for (var e = document.querySelectorAll(".ladi-section .ladi-section-background iframe.ladi-section-background-video"), i = 0; i < e.length; i++) {
            var a = e[i],
                n = parseFloatLadiPage(a.getAttribute("width")) || 0,
                o = parseFloatLadiPage(a.getAttribute("height")) || 0;
            if (!(n <= 0 || o <= 0)) {
                var r = t.findAncestor(a, "ladi-section-background"),
                    d = r.clientWidth,
                    l = o / n * d;
                l < r.clientHeight && (d = r.clientHeight / l * d, l = r.clientHeight);
                var s = (r.clientHeight - l) / 2,
                    c = (r.clientWidth - d) / 2;
                a.style.setProperty("top", (parseFloatLadiPage(s) || 0) + "px"), a.style.setProperty("left", (parseFloatLadiPage(c) || 0) + "px"), a.style.setProperty("width", (parseFloatLadiPage(d) || 0) + "px"), a.style.setProperty("height", (parseFloatLadiPage(l) || 0) + "px")
            }
        }
    } catch (t) {}
}, LadiPageScriptV2.prototype.runResizeAll = function(t) {
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), e.removeTimeout(e.runtime.tmp.timeout_is_resize_all_id), e.runtime.tmp.is_window_resize = !0;
    try {
        LadiPageShopping.push(function() {
            e.runtime.tmp.generateCart()
        });
        for (var i = document.querySelectorAll("#" + e.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"), a = 0; a < i.length; a++) "none" != getComputedStyle(i[a]).display && (e.runtime.tmp.is_resize_all = !0, window.ladi(i[a].id).show(!0, {
            checkHidePopupOther: !1
        }));
        e.runResizeSectionBackground()
    } catch (t) {}
    e.runtime.tmp.timeout_is_resize_all_id = e.runTimeout(function() {
        delete e.runtime.tmp.is_resize_all, delete e.runtime.tmp.is_window_resize
    }, 200)
}, LadiPageScriptV2.prototype.runEventResize = function(t) {
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), isEmptyLadiPage(e.runtime.tmp.timeoutResizeAll) || e.removeTimeout(e.runtime.tmp.timeoutResizeAll), e.runtime.tmp.timeoutResizeAll = e.runTimeout(function() {
        e.runResizeAll(t)
    }, 10)
}, LadiPageScriptV2.prototype.runEventOrientationChange = function(t) {
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), isEmptyLadiPage(e.runtime.tmp.timeoutOrientationAll) || e.removeTimeout(e.runtime.tmp.timeoutOrientationAll), e.runtime.tmp.timeoutOrientationAll = e.runTimeout(function() {
        e.runResizeAll(t)
    }, 10)
}, LadiPageScriptV2.prototype.runAfterLocation = function() {
    var t = this;
    if (t instanceof LadiPageScriptV2 || (t = LadiPageScript), !t.runtime.isRun) return t.runTimeout(t.runAfterLocation, 100);
    if (t.runtime.list_country = t.runtime.list_country || [], !isObjectLadiPage(window.LadiLocation) || Object.keys(window.LadiLocation).length < t.runtime.list_country.length) return t.runTimeout(t.runAfterLocation, 100);
    var e = t.copy(LadiPageLocation);
    (LadiPageLocation = {}).push = function(t) {
        isFunctionLadiPage(t) && t()
    }, isArrayLadiPage(e) && e.forEach(function(t) {
        LadiPageLocation.push(t)
    }), LadiPageShopping.push(function() {
        t.reloadFeeShipping()
    })
}, LadiPageScriptV2.prototype.removeLazyloadPopup = function(t) {
    var e = document.getElementById(t);
    if (!isEmptyLadiPage(e))
        for (var i = e.getElementsByClassName("ladi-lazyload"); i.length > 0;) i[0].classList.remove("ladi-lazyload")
}, LadiPageScriptV2.prototype.reloadLazyload = function(t) {
    var e = this;
    if (e instanceof LadiPageScriptV2 || (e = LadiPageScript), e.runtime.tmp.is_loaded_func_done) {
        var i = [];
        if (t && isObjectLadiPage(e.runtime.story_page)) {
            var a = document.getElementsByClassName("ladi-section")[0];
            if (!isEmptyLadiPage(a))
                for (i = a.getElementsByClassName("ladi-lazyload"); i.length > 0;) i[0].classList.remove("ladi-lazyload")
        } else {
            i = document.getElementsByClassName("ladi-lazyload");
            for (var n = [], o = 0; o < i.length; o++) {
                var r = e.getElementBoundingClientRect(i[o]).y + window.scrollY;
                window.scrollY + e.getHeightDevice() > r && r + i[o].offsetHeight > window.scrollY && n.push(i[o])
            }
            n.forEach(function(t) {
                t.classList.remove("ladi-lazyload")
            });
            for (var d = document.querySelectorAll(".ladi-gallery .ladi-gallery-view-item.selected:not(.ladi-lazyload)"), l = 0; l < d.length; l++)
                if (isEmptyLadiPage(d[l].getAttribute("data-lazyload"))) {
                    d[l].setAttribute("data-lazyload", !0);
                    for (var s = d[l].parentElement.getElementsByClassName("ladi-lazyload"); s.length > 0;) s[0].classList.remove("ladi-lazyload")
                }
        }
    }
}, LadiPageScriptV2.prototype.documentLoaded = function() {
    var t = this;
    t instanceof LadiPageScriptV2 || (t = LadiPageScript);
    var e = document.getElementById("style_animation");
    if (isEmptyLadiPage(e) || e.parentElement.removeChild(e), LadiPageApp.review_callback_loaded(!0, t.documentLoaded)) {
        t.const.LANG = JSON.stringify(t.const.LANG), t.const.LANG = t.convertReplacePrefixStr(t.const.LANG), t.const.LANG = JSON.parse(t.const.LANG);
        try {
            t.runtime.payment_setting = JSON.stringify(t.runtime.payment_setting), t.runtime.payment_setting = t.convertReplacePrefixStr(t.runtime.payment_setting), t.runtime.payment_setting = JSON.parse(t.runtime.payment_setting)
        } catch (e) {
            t.runtime.payment_setting = {}
        }
        t.runtime.tmp.lang_loaded = !0;
        var i = t.getURLSearchParams(null, null, !0),
            a = i.ladishow,
            n = i.ladihide,
            o = i.laditop,
            r = window.location.hash;
        isEmptyLadiPage(a) ? a = [] : isArrayLadiPage(a) || (a = a.split(",").removeSpace()), isEmptyLadiPage(n) ? n = [] : isArrayLadiPage(n) || (n = n.split(",").removeSpace()), isEmptyLadiPage(o) ? o = [] : isArrayLadiPage(o) || (o = o.split(",").removeSpace().reverse());
        try {
            var d = window.ladi("LADI_CAMP_END_DATE").get_cookie(),
                l = window.ladi("LADI_CAMP_CONFIG").get_cookie();
            if (!isEmptyLadiPage(d) && !isEmptyLadiPage(l)) {
                l = JSON.parse(Base64.decode(l));
                var s = ((d = parseInt(d) || 0) - Date.now()) / 24 / 60 / 60 / 1e3;
                if (s > 0 && isArrayLadiPage(l.dynamic_content.cookie)) {
                    var c = [];
                    l.dynamic_content.cookie.forEach(function(t) {
                        var e = t.split("=");
                        2 != (e = e.removeSpace()).length || isEmptyLadiPage(e[0]) || isEmptyLadiPage(e[1]) || c.push({
                            name: e[0],
                            value: e[1]
                        })
                    }), c.forEach(function(t) {
                        window.ladi(t.name).set_cookie(t.value, s)
                    })
                }
                n = l.dynamic_content.hide || [], a = l.dynamic_content.show || [], o = l.dynamic_content.top || [], isArrayLadiPage(l.dynamic_content.scroll) && l.dynamic_content.scroll.length > 0 && (r = "#" + l.dynamic_content.scroll.pop())
            }
        } catch (t) {}
        var u = null,
            p = [];
        if (a.forEach(function(t) {
                var e = document.getElementById(t);
                isEmptyLadiPage(e) || e.getElementsByClassName("ladi-popup").length > 0 && p.push(t)
            }), p.length > 0 && !isEmptyLadiPage(r)) try {
            u = document.querySelector(r), isEmptyLadiPage(u) || isEmptyLadiPage(u.id) || !u.classList.contains("ladi-section") || (r = null, a = a.except(p), t.runTimeout(function() {
                window.ladi(u.id).scroll(!1, !0), p.forEach(function(t) {
                    window.ladi(t).show()
                })
            }, 300))
        } catch (t) {}
        if (n.forEach(function(t) {
                window.ladi(t).hide()
            }), a.forEach(function(t) {
                window.ladi(t).show()
            }), o.forEach(function(t) {
                window.ladi(t).top()
            }), !isEmptyLadiPage(r)) try {
            u = document.querySelector(r), isEmptyLadiPage(u) || isEmptyLadiPage(u.id) || t.runTimeout(function() {
                window.ladi(u.id).scroll()
            }, 300)
        } catch (t) {}
        if (t.resetViewport(), t.runEventScroll(), !isEmptyLadiPage(t.runtime.tracking_global_url)) {
            var m = !1,
                _ = window;
            isObjectLadiPage(t.runtime.story_page) && (_ = document.getElementsByClassName("ladi-wraper")[0]);
            var g = function() {
                m || (m = !0, t.loadScript(t.runtime.tracking_global_url + "?v=" + Date.now(), {
                    defer: !0
                }, null, function() {
                    t.runtime.tmp.tracking_global_loaded = !0
                }), _.removeEventListener("scroll", g), document.removeEventListener("mousemove", g), document.removeEventListener("touchstart", g))
            };
            _.addEventListener("scroll", g, t.runtime.scrollEventPassive), document.addEventListener("mousemove", g), document.addEventListener("touchstart", g, t.runtime.scrollEventPassive), t.runTimeout(g, t.runtime.tracking_global_delay)
        }
        for (; t.runtime.list_loaded_func.length > 0;) {
            t.runtime.list_loaded_func.shift()()
        }
        t.runtime.tmp.is_loaded_func_done = !0;
        var y = document.getElementById("style_update_height_element");
        isEmptyLadiPage(y) || y.parentElement.removeChild(y), t.reloadLazyload(!1)
    }
}, LadiPageScriptV2.prototype.runConversionApi = function(t, e, i, a) {
    var n = this;
    a = isObjectLadiPage(a) ? a : {}, isFunctionLadiPage(n.runtime.tmp.runTrackingAnalytics) ? LadiPageQueueCommand.push(function() {
        return "facebook" == t ? isFunctionLadiPage(window.fbq) : "tiktok" == t ? !isNullLadiPage(window.ttq) : void 0
    }, function() {
        if (!isEmptyLadiPage(t) && !isEmptyLadiPage(e) && isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api[t]) && (window.ladi_conversion_api[t][e] = i), isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api[t]) && isArrayLadiPage(window.ladi_conversion_api[t].pixels) && isArrayLadiPage(window.ladi_conversion_api[t].events)) {
            window.ladi_conversion_api[t].pixels = window.ladi_conversion_api[t].pixels.unique();
            var o = Date.now() + 3e3,
                r = function(t, e) {
                    var i = [],
                        d = !0;
                    t.forEach(function(t) {
                        var e = window.ladi(t).get_cookie();
                        isEmptyLadiPage(e) && (d = !1), i.push(e)
                    }), !a.is_return_string && !d && Date.now() < o ? n.runTimeout(function() {
                        r(t, e)
                    }, 100) : isFunctionLadiPage(e) && e(i)
                },
                d = n.copy(window.ladi_conversion_api);
            "facebook" == t && r(["_fbc", "_fbp"], function(e) {
                d[t].fbc = e[0], d[t].fbp = e[1];
                for (var i = 0; i < d[t].events.length; i++) {
                    var o = d[t].events[i].data;
                    o.event_id = o.eventID, delete o.eventID, d[t].events[i].data = o
                }
                a.is_return_string ? n.runtime.tmp.runTrackingAnalytics("ConversionApiString", {
                    data: d
                }) : n.runtime.tmp.runTrackingAnalytics("ConversionApi", {
                    data: d
                }), delete d[t].fbc, delete d[t].fbp, delete d[t].events, window.ladi_conversion_api = d
            }), "tiktok" == t && r(["_ttp", "ttclid"], function(e) {
                d[t].ttp = e[0], d[t].ttclid = e[1];
                var i = new URL(window.location.href);
                isEmptyLadiPage(i.searchParams.get("ttclid")) || (d[t].ttclid = i.searchParams.get("ttclid")), isObjectLadiPage(a.ttq_identify_data) && (d[t].phone_number = a.ttq_identify_data.sha256_phone_number, d[t].email = a.ttq_identify_data.sha256_email);
                try {
                    d[t].external_id = window.sha256(window.ladi("LADI_UNIQUE_ID").get_cookie())
                } catch (t) {}
                a.is_return_string ? n.runtime.tmp.runTrackingAnalytics("TikTokConversionApiString", {
                    data: d
                }) : n.runtime.tmp.runTrackingAnalytics("TikTokConversionApi", {
                    data: d
                }), delete d[t].ttp, delete d[t].ttclid, delete d[t].events, window.ladi_conversion_api = d
            })
        }
    }) : n.runTimeout(function() {
        n.runConversionApi(t, e, i, a)
    }, 100)
}, LadiPageScriptV2.prototype.getWidthDevice = function(t) {
    if (this.runtime.is_mobile_only) {
        var e = document.getElementsByClassName("ladi-wraper")[0];
        if (!isEmptyLadiPage(e)) return e.clientWidth
    }
    return t ? window.innerWidth > 0 ? window.innerWidth : window.screen.width : window.outerWidth > 0 ? window.outerWidth : window.screen.width
}, LadiPageScriptV2.prototype.getHeightDevice = function(t) {
    return window.outerHeight > 0 && !this.runtime.isDesktop && (t && window.outerHeight > window.innerHeight || !t && window.innerHeight > window.outerHeight) ? window.outerHeight : window.innerHeight
}, LadiPageScriptV2.prototype.startAutoScroll = function(t, e, i, a) {
    if (this.runtime.isDesktop ? i : a) {
        var n = document.getElementById(t);
        if (!isEmptyLadiPage(n) && !n.classList.contains("ladi-auto-scroll")) {
            var o = 0;
            if ("section" != e) {
                if ((parseFloatLadiPage(getComputedStyle(n).width) || 0) <= this.getWidthDevice()) return;
                o = (o = parseFloatLadiPage(getComputedStyle(n).left) || 0) > 0 ? 0 : -1 * o
            } else {
                for (var r = n.querySelectorAll(".ladi-container > .ladi-element"), d = 0; d < r.length; d++) {
                    var l = parseFloatLadiPage(getComputedStyle(r[d]).left) || 0;
                    l < o && (o = l)
                }
                o = o > 0 ? 0 : -1 * o, n.querySelector(".ladi-container").style.setProperty("margin-left", o + "px")
            }
            n.classList.add("ladi-auto-scroll"), n.scrollLeft = o
        }
    }
}, LadiPageScriptV2.prototype.getLinkUTMRedirect = function(t, e) {
    var i = this.createTmpElement("a", "", {
            href: t
        }),
        a = this.getURLSearchParams(e, null, !1),
        n = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    if (n.push(this.const.LADIFLOW_DATA_KEY_NAME), n.push(this.const.REF_NAME), !isEmptyLadiPage(i.href) && !isEmptyLadiPage(i.host)) {
        var o = this.getURLSearchParams(i.search, null, !1),
            r = [];
        isArrayLadiPage(window.LadiPageURLSearchParamsCustom) && (r = window.LadiPageURLSearchParamsCustom), isStringLadiPage(window.LadiPageURLSearchParamsCustom) && (r = [window.LadiPageURLSearchParamsCustom]), (n = (n = n.concat(r)).unique()).forEach(function(t) {
            isEmptyLadiPage(o[t]) && !isEmptyLadiPage(a[t]) && (i.search = i.search + (isEmptyLadiPage(i.search) ? "?" : "&") + t + "=" + encodeURIComponent(a[t]), o[t] = a[t])
        })
    }
    return i.href
}, LadiPageScriptV2.prototype.randomInt = function(t, e) {
    return t = Math.ceil(t), e = Math.floor(e), Math.floor(Math.random() * (e - t + 1)) + t
}, LadiPageScriptV2.prototype.randomString = function(t) {
    for (var e = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", a = i.length, n = 0; n < t; n++) e += i.charAt(Math.floor(Math.random() * a));
    return e
}, LadiPageScriptV2.prototype.runCallback = function(t, e) {
    if (isFunctionLadiPage(e)) {
        var i = this;
        if (t) {
            var a = i.runInterval(function() {
                i.removeInterval(a), i.runCallback(!1, e)
            }, 0);
            return
        }
        e()
    }
}, LadiPageScriptV2.prototype.runTimeout = function(t, e) {
    if (isFunctionLadiPage(t)) {
        if (!0 === e) return setTimeout(t, 0);
        if (!isEmptyLadiPage(e) && e > 0) return setTimeout(t, e);
        t()
    }
}, LadiPageScriptV2.prototype.removeTimeout = function(t) {
    return clearTimeout(t)
}, LadiPageScriptV2.prototype.removeInterval = function(t) {
    return clearInterval(t)
}, LadiPageScriptV2.prototype.runInterval = function(t, e) {
    if (isFunctionLadiPage(t)) return setInterval(t, e)
}, LadiPageScriptV2.prototype.getURLSearchParams = function(t, e, i) {
    var a = {},
        n = isNullLadiPage(t);
    if (t = n ? window.location.search : t, !isEmptyLadiPage(t))
        for (var o = t.substr(1).split("&"), r = 0; r < o.length; ++r) {
            var d = o[r].split("=", 2);
            if (isNullLadiPage(a[d[0]])) {
                1 == d.length ? a[d[0]] = "" : a[d[0]] = decodeURIComponentLadiPage(d[1].replace(/\+/g, " "));
                try {
                    if (i) {
                        var l = JSON.parse(a[d[0]]);
                        Number.isInteger(l) || (a[d[0]] = l, 0 == a[d[0]].length ? a[d[0]] = "" : 1 == a[d[0]].length && (a[d[0]] = a[d[0]][0]))
                    }
                } catch (t) {}
            } else i && (isArrayLadiPage(a[d[0]]) || (a[d[0]] = [a[d[0]]]), 1 == d.length ? a[d[0]].push("") : a[d[0]].push(decodeURIComponentLadiPage(d[1].replace(/\+/g, " "))))
        }
    return n && ["email", "phone"].forEach(function(t) {
        try {
            var e = a[t];
            if (!isEmptyLadiPage(e)) {
                var i = Base64.decode(e);
                e == Base64.encode(i) && (a[t] = i)
            }
        } catch (t) {}
    }), isEmptyLadiPage(e) ? a : a[e]
}, LadiPageScriptV2.prototype.getVideoId = function(t, e) {
    if (isEmptyLadiPage(e)) return e;
    if (t == this.const.VIDEO_TYPE.youtube) {
        var i = this.createTmpElement("a", "", {
            href: e
        }); - 1 != e.toLowerCase().indexOf("watch") ? e = this.getURLSearchParams(i.search, "v", !1) : -1 != e.toLowerCase().indexOf("embed/") ? e = i.pathname.substring("/embed/".length) : -1 != e.toLowerCase().indexOf("shorts/") ? e = i.pathname.substring("/shorts/".length) : -1 != e.toLowerCase().indexOf("youtu.be") && (e = i.pathname.substring("/".length))
    }
    return e
}, LadiPageScriptV2.prototype.sendRequest = function(t, e, i, a, n, o) {
    var r = this,
        d = function(l) {
            var s = l[e],
                c = function(l, u) {
                    if (s.list.length <= l) 0 == l ? d({}) : isFunctionLadiPage(o) && o(r.const.LANG.REQUEST_SEND_ERROR, 0, u, e);
                    else {
                        var p = {};
                        p.timeout = s.timeout, p.onreadystatechange = function() {
                            this.readyState == XMLHttpRequest.DONE && (200 == this.status ? isFunctionLadiPage(o) && o(this.responseText, this.status, this, e) : c(l + 1, this))
                        }, r.sendRequestWithOption(t, s.list[l], i, a, n, p)
                    }
                };
            if (isObjectLadiPage(s)) return c(0, null);
            r.sendRequestWithOption(t, e, i, a, n, null, o)
        },
        l = function() {
            var t = r.runtime.tmp.send_request_configs;
            if (!isObjectLadiPage(t)) {
                var e = r.const.API_FORM_DATA_LIST;
                return r.runtime.tmp.send_request_configs = {}, isArrayLadiPage(e) && e.length > 0 && (r.runtime.tmp.send_request_configs[r.const.API_FORM_DATA] = {
                    timeout: r.const.API_FORM_DATA_TIMEOUT,
                    list: e
                }), void l()
            }
            d(t)
        };
    l()
}, LadiPageScriptV2.prototype.sendRequestWithOption = function(t, e, i, a, n, o, r) {
    if (!this.runtime.isGenerateHtml) {
        if (this.runtime.has_popupx && this.runtime.request_through_parent) {
            var d = this.randomId();
            return this.runtime.tmp["request_callback_id_" + d] = r, void this.runtime.tmp.runActionPopupX({
                request_data: {
                    method: t,
                    url: e,
                    data: i,
                    async: a,
                    headers: n,
                    options: o,
                    callback_id: d
                },
                action: {
                    type: "send_request_with_option"
                }
            })
        }
        var l = new XMLHttpRequest;
        if (isFunctionLadiPage(this.runtime.send_request_response[e])) {
            var s = this.runtime.send_request_response[e](e, i, r);
            if (!0 === s) return;
            i = s
        }
        isFunctionLadiPage(r) && (l.onreadystatechange = function() {
            var t = null;
            try {
                t = this.responseText
            } catch (t) {}
            r(t, this.status, this, e)
        }), l.open(t, e, a);
        isObjectLadiPage(n) && Object.keys(n).forEach(function(t) {
            l.setRequestHeader(t, n[t])
        }), isObjectLadiPage(o) && Object.keys(o).forEach(function(t) {
            l[t] = o[t]
        }), l.send(i)
    }
}, LadiPageScriptV2.prototype.setCookieDomains = function(t, e, i) {
    window.ladi(t).set_cookie(e, i, "/", window.location.host), isArrayLadiPage(this.runtime.DOMAIN_SET_COOKIE) && this.runtime.DOMAIN_SET_COOKIE.forEach(function(a) {
        a != window.location.host && window.ladi(t).set_cookie(e, i, "/", a)
    })
}, LadiPageScriptV2.prototype.removeCookieDomains = function(t) {
    window.ladi(t).set_cookie(null, -365, "/", window.location.host), isArrayLadiPage(this.runtime.DOMAIN_SET_COOKIE) && this.runtime.DOMAIN_SET_COOKIE.forEach(function(e) {
        e != window.location.host && window.ladi(t).set_cookie(null, -365, "/", e)
    })
}, LadiPageScriptV2.prototype.deleteCookie = function(t) {
    return window.ladi(t).delete_cookie()
}, LadiPageScriptV2.prototype.setCookie = function(t, e, i, a, n, o) {
    return window.ladi(e).set_cookie(i, a, o, t, n)
}, LadiPageScriptV2.prototype.getCookie = function(t) {
    return window.ladi(t).get_cookie()
}, LadiPageScriptV2.prototype.convertDataDate = function(t, e) {
    function i(t) {
        return (t >= 10 ? "" : "0") + t
    }
    return e.forEach(function(e) {
        try {
            var a = new Date(t[e]);
            a.toISOString() == t[e] && (t[e] = a.getFullYear() + "-" + i(a.getMonth() + 1) + "-" + i(a.getDate()) + " " + i(a.getHours()) + ":" + i(a.getMinutes()) + ":" + i(a.getSeconds()))
        } catch (t) {}
    }), t
}, LadiPageScriptV2.prototype.runFormItemOtherChange = function(t, e) {
    var i = this,
        a = i.findAncestor(t, "ladi-element");
    if (!isEmptyLadiPage(a)) {
        var n = function(i) {
                var n = null;
                if (e)
                    for (var o = a.querySelectorAll('.ladi-form-checkbox-item input[data-other="true"]'), d = 0; d < o.length; d++) r(o[d], i);
                else n = t.querySelector('input[data-other="true"]'), isEmptyLadiPage(n) && (n = a.querySelector('.ladi-form-checkbox-item input[data-other="true"]')), r(n, i)
            },
            o = function(t, e, i, a, n) {
                var o = e.parentElement.getElementsByClassName("ladi-editing")[0];
                isEmptyLadiPage(o) && ((o = document.createElement("input")).type = "text", e.parentElement.appendChild(o)), o.removeAttribute("style"), o.className = "ladi-editing", o.style.setProperty("background-color", "transparent"), o.style.setProperty("width", "100%"), o.style.setProperty("height", getComputedStyle(e).height), o.setAttribute("placeholder", n), i ? (o.oninput = function(e) {
                    t.value = e.target.value
                }, o.style.removeProperty("display"), e.classList.add("ladi-hidden"), o.focus()) : (o.oninput = null, o.style.setProperty("display", "none", "important"), e.classList.remove("ladi-hidden")), o.value = a, e.textContent = a
            },
            r = function(t, a) {
                var n = t.getAttribute("data-value-old");
                isEmptyLadiPage(n) && (n = t.getAttribute("value"), t.setAttribute("data-value-old", n));
                var r = i.findAncestor(t, "ladi-form-checkbox-item").getElementsByTagName("span")[0];
                if (!isEmptyLadiPage(r)) {
                    var d = r.getAttribute("data-text-old");
                    if (isEmptyLadiPage(d) && (d = r.textContent, r.setAttribute("data-text-old", d), r.setAttribute("placeholder", d)), e) o(t, r, !1, d, d), t.setAttribute("value", n);
                    else if (a && !r.classList.contains("ladi-hidden")) {
                        o(t, r, !0, "", d), t.setAttribute("value", "")
                    }
                }
            };
        try {
            var d = window.ladi(a.id).value(),
                l = i.runtime.eventData[a.id];
            if ("survey" == l.type && (d == i.const.OPTION_OTHER_KEY || isArrayLadiPage(d) && -1 != d.indexOf(i.const.OPTION_OTHER_KEY) ? n(!0) : n(!1)), "form_item" == l.type) {
                if (isArrayLadiPage(d)) {
                    var s = [];
                    d.forEach(function(t) {
                        t = String(t).split("|")[0], s.push(t)
                    }), d = s
                } else d = String(d).split("|")[0];
                d == i.const.OPTION_OTHER_KEY || isArrayLadiPage(d) && -1 != d.indexOf(i.const.OPTION_OTHER_KEY) ? n(!0) : n(!1)
            }
        } catch (t) {}
    }
}, LadiPageScriptV2.prototype.updateProductVariantSelectOptionFirst = function(t, e, i) {
    var a = this,
        n = a.generateVariantProduct(t, !1, null, null, null, null, !0, !0, function() {
            a.updateProductVariantSelectOptionFirst(t, e, i)
        });
    if (isObjectLadiPage(n) && isObjectLadiPage(n.product)) {
        var o = i.querySelectorAll("select.ladi-form-control"),
            r = i.querySelectorAll(".ladi-form-label-container"),
            d = 0;
        if (isArrayLadiPage(n.product.variants) && 0 != n.product.variants.length) {
            var l = null,
                s = null;
            if (isEmptyLadiPage(t["option.product_variant_id"]) || (l = n.product.variants.find(function(e) {
                    return e.product_variant_id == t["option.product_variant_id"]
                })), isEmptyLadiPage(l) && (l = n.product.variants[0]), e["option.product_variant_type"] == a.const.PRODUCT_VARIANT_TYPE.combined)
                for (d = 0; d < o.length; d++) s = o[d].querySelector('option[data-product-variant-id="' + l.product_variant_id + '"]'), isEmptyLadiPage(s) || (o[d].value = s.getAttribute("value"), a.fireEvent(o[d], "change"));
            e["option.product_variant_type"] == a.const.PRODUCT_VARIANT_TYPE.combobox && isStringLadiPage(l.option_ids) && l.option_ids.split("/").forEach(function(t, e) {
                for (d = 0; d < o.length; d++) o[d].getAttribute("data-product-option-id") == t && (o[d].value = l["option" + (e + 1)] || "", a.fireEvent(o[d], "change"))
            }), e["option.product_variant_type"] == a.const.PRODUCT_VARIANT_TYPE.label && isStringLadiPage(l.option_ids) && l.option_ids.split("/").forEach(function(t, e) {
                for (d = 0; d < r.length; d++) r[d].getAttribute("data-product-option-id") == t && (a.runtime.tmp.updateLabelValue(r[d], l["option" + (e + 1)] || ""), a.runtime.tmp.fireEventLabelChange(r[d]))
            })
        } else {
            for (d = 0; d < o.length; d++) o[d].value = "", a.fireEvent(o[d], "change");
            for (d = 0; d < r.length; d++) a.runtime.tmp.updateLabelValue(r[d], null), a.runtime.tmp.fireEventLabelChange(r[d])
        }
    }
}, LadiPageScriptV2.prototype.updateProductVariantSelectOption = function(t, e, i, a, n) {
    var o = this,
        r = t.target,
        d = o.generateVariantProduct(e, !1, null, null, null, null, !0, !0, function(r) {
            o.updateProductVariantSelectOption(t, e, i, a, n)
        });
    if (isObjectLadiPage(d)) {
        var l = o.getProductVariantId(r, d.product),
            s = o.findAncestor(r, "ladi-collection-item"),
            c = [],
            u = 0;
        if (isEmptyLadiPage(s))
            for (var p = document.querySelectorAll('[data-variant="true"]'), m = 0; m < p.length; m++) {
                var _ = o.findAncestor(p[m], "ladi-form");
                if (!isEmptyLadiPage(_) && (_ = o.findAncestor(_, "ladi-element"), isEmptyLadiPage(o.findAncestor(_, "ladi-collection")))) {
                    var g = o.runtime.eventData[_.id];
                    isEmptyLadiPage(g) || g["option.product_type"] != e["option.product_type"] || g["option.product_id"] != e["option.product_id"] || c.push(p[m])
                }
            } else c = s.querySelectorAll('[data-variant="true"]');
        var y = [];
        for (u = 0; u < c.length; u++) {
            if (a) {
                var h = o.findAncestor(c[u], "ladi-popup");
                if (isEmptyLadiPage(h)) continue;
                if ("POPUP_PRODUCT" != (h = o.findAncestor(h, "ladi-element")).id && "POPUP_BLOG" != h.id) continue
            }
            y.push(c[u])
        }
        var f = r.getAttribute("data-product-option-id"),
            v = null,
            E = null,
            P = null;
        if (isArrayLadiPage(d.product.variants) && 0 != d.product.variants.length) {
            if (isStringLadiPage(d.product.variants[0].option_ids)) {
                for (P = d.product.variants[0].option_ids.split("/"), u = 0; u < P.length; u++)
                    if (P[u] == f) {
                        E = u;
                        break
                    } if (!isEmptyLadiPage(E)) {
                    v = {};
                    var L = r.value;
                    r.classList.contains("ladi-form-label-container") && (L = o.runtime.tmp.getLabelValue(r)), d.product.variants.forEach(function(t) {
                        if (isEmptyLadiPage(L) || L == t["option" + (E + 1)])
                            for (u = 0; u < P.length; u++) isArrayLadiPage(v[P[u]]) || (v[P[u]] = []), u != E && v[P[u]].push(t["option" + (u + 1)])
                    })
                }
            }
            for (var b = v, A = [], T = [], S = null, w = 0; w < y.length; w++) {
                var O = o.runtime.eventData[y[w].id];
                if (!isEmptyLadiPage(O)) {
                    v = o.copy(b);
                    var C = 0,
                        k = 0,
                        I = 0,
                        N = 0,
                        D = null,
                        R = null,
                        x = null,
                        B = null;
                    if (O["option.product_variant_type"] == o.const.PRODUCT_VARIANT_TYPE.combobox) {
                        if (S = y[w].querySelectorAll("select[data-product-option-id]"), isObjectLadiPage(v)) {
                            for (C = 0; C < S.length; C++)
                                if ((D = S[C].getAttribute("data-product-option-id")) != f)
                                    for (isArrayLadiPage(v[D]) && -1 != v[D].indexOf(S[C].value) || (S[C].value = ""), R = S[C].getElementsByTagName("option"), k = 0; k < R.length; k++) isEmptyLadiPage(R[k].getAttribute("value")) || R[k].removeAttribute("disabled");
                            for (C = 0; C < S.length; C++) {
                                for (D = S[C].getAttribute("data-product-option-id"), v = {}, I = 0; I < d.product.variants.length; I++)
                                    if (B = d.product.variants[I], P = B.option_ids.split("/"), -1 != (E = P.indexOf(D)) && (isEmptyLadiPage(S[C].value) || S[C].value == B["option" + (E + 1)]))
                                        for (u = 0; u < P.length; u++) isArrayLadiPage(v[P[u]]) || (v[P[u]] = []), u != E && v[P[u]].push(B["option" + (u + 1)]);
                                for (N = 0; N < S.length; N++)
                                    if ((x = S[N].getAttribute("data-product-option-id")) != D)
                                        for (R = S[N].getElementsByTagName("option"), k = 0; k < R.length; k++) isEmptyLadiPage(R[k].getAttribute("value")) || isArrayLadiPage(v[x]) && -1 != v[x].indexOf(R[k].getAttribute("value")) || R[k].setAttribute("disabled", "")
                            }
                        }
                        if (!isObjectLadiPage(v))
                            for (C = 0; C < S.length; C++) A.push(S[C])
                    }
                    if (O["option.product_variant_type"] == o.const.PRODUCT_VARIANT_TYPE.label) {
                        if (S = y[w].querySelectorAll(".ladi-form-label-container[data-product-option-id]"), isObjectLadiPage(v)) {
                            for (C = 0; C < S.length; C++)
                                if ((D = S[C].getAttribute("data-product-option-id")) != f) {
                                    var M = o.runtime.tmp.getLabelValue(S[C]);
                                    for (isArrayLadiPage(v[D]) && -1 != v[D].indexOf(M) || o.runtime.tmp.updateLabelValue(S[C], null), R = S[C].getElementsByClassName("ladi-form-label-item"), k = 0; k < R.length; k++) R[k].classList.contains("no-value") || R[k].classList.remove("disabled")
                                } for (C = 0; C < S.length; C++) {
                                for (D = S[C].getAttribute("data-product-option-id"), v = {}, I = 0; I < d.product.variants.length; I++)
                                    if (B = d.product.variants[I], P = B.option_ids.split("/"), -1 != (E = P.indexOf(D))) {
                                        var q = o.runtime.tmp.getLabelValue(S[C]);
                                        if (isEmptyLadiPage(q) || q == B["option" + (E + 1)])
                                            for (u = 0; u < P.length; u++) isArrayLadiPage(v[P[u]]) || (v[P[u]] = []), u != E && v[P[u]].push(B["option" + (u + 1)])
                                    } for (N = 0; N < S.length; N++)
                                    if ((x = S[N].getAttribute("data-product-option-id")) != D)
                                        for (R = S[N].getElementsByClassName("ladi-form-label-item"), k = 0; k < R.length; k++)
                                            if (!R[k].classList.contains("no-value")) {
                                                var F = o.runtime.tmp.getOptionLabelValue(R[k]);
                                                isArrayLadiPage(v[x]) && -1 != v[x].indexOf(F) || R[k].classList.add("disabled")
                                            }
                            }
                        }
                        if (!isObjectLadiPage(v))
                            for (C = 0; C < S.length; C++) T.push(S[C])
                    }
                }
            }!isEmptyLadiPage(l) && isFunctionLadiPage(n) && n();
            for (var U = null; A.length > 0;) U = A.shift(), o.fireEvent(U, "change");
            for (; T.length > 0;) U = T.shift(), o.runtime.tmp.fireEventLabelChange(U);
            for (S = document.querySelectorAll(".ladi-form .ladi-form-label-container"), w = 0; w < S.length; w++) {
                var V = o.runtime.tmp.getLabelValue(S[w]);
                if (!isEmptyLadiPage(V)) o.findAncestor(S[w], "ladi-element").getAttribute("data-title-type") == o.const.PRODUCT_VARIANT_TITLE.top && (V = ": " + V);
                var Y = o.findAncestor(S[w], "ladi-form-item-box");
                isEmptyLadiPage(Y) || (Y = Y.querySelector(".ladi-form-item-title-value"), isEmptyLadiPage(Y) || (Y.innerHTML = V))
            }
        }
    }
}, LadiPageScriptV2.prototype.getProductVariantIndex = function(t, e) {
    var i = this,
        a = -1,
        n = e["option.product_type"],
        o = e["option.ladisale_store_id"] || null,
        r = e["option.product_id"],
        d = i.generateVariantProduct(e, !1, null, null, null, null, !0, !0);
    if (!isObjectLadiPage(d) || !isObjectLadiPage(d.store_info) || !isObjectLadiPage(d.product) || !isArrayLadiPage(d.product.variants) || d.product.variants.length <= 0) return a;
    this.runtime.isClient ? Object.keys(this.runtime.eventData).forEach(function(e) {
        if ((isEmptyLadiPage(t) || t == e) && -1 == a) {
            var l = i.runtime.eventData[e];
            if ("form" == l.type && l["option.is_add_to_cart"] && l["option.product_type"] == n && l["option.product_id"] == r && l["option.ladisale_store_id"] == o) {
                var s = document.getElementById(e);
                if (!isEmptyLadiPage(s)) {
                    var c = s.querySelector('[data-variant="true"]');
                    if (!isEmptyLadiPage(c)) {
                        var u = i.runtime.eventData[c.id];
                        if (!isEmptyLadiPage(u)) {
                            var p = null;
                            if (u["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.combobox && (p = c.querySelectorAll(".ladi-form-item select[data-product-option-id]"), a = d.product.variants.findIndex(function(t) {
                                    for (var e = !0, i = null, a = function(t) {
                                            return t == i
                                        }, n = 0; n < p.length; n++)
                                        if (p[n].getAttribute("data-store-id") == d.store_info.id && p[n].getAttribute("data-product-id") == t.product_id) {
                                            i = p[n].getAttribute("data-product-option-id");
                                            var o = p[n].value;
                                            if (isStringLadiPage(t.option_ids)) {
                                                var r = t.option_ids.split("/").findIndex(a);
                                                if (-1 != r && t["option" + (r + 1)] != o) {
                                                    e = !1;
                                                    break
                                                }
                                            }
                                        } return e
                                })), u["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.label && (p = c.querySelectorAll(".ladi-form-label-container[data-product-option-id]"), a = d.product.variants.findIndex(function(t) {
                                    for (var e = !0, a = null, n = function(t) {
                                            return t == a
                                        }, o = 0; o < p.length; o++)
                                        if (p[o].getAttribute("data-store-id") == d.store_info.id && p[o].getAttribute("data-product-id") == t.product_id) {
                                            a = p[o].getAttribute("data-product-option-id");
                                            var r = i.runtime.tmp.getLabelValue(p[o]);
                                            if (isStringLadiPage(t.option_ids)) {
                                                var l = t.option_ids.split("/").findIndex(n);
                                                if (-1 != l && t["option" + (l + 1)] != r) {
                                                    e = !1;
                                                    break
                                                }
                                            }
                                        } return e
                                })), u["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.combined) {
                                var m = c.querySelector(".ladi-form-control");
                                if (isEmptyLadiPage(m) || m.getAttribute("data-store-id") != d.store_info.id || m.getAttribute("data-product-id") != d.product.product_id) return;
                                if (a = m.value, a = isEmptyLadiPage(a) ? -1 : parseInt(a), "none" == getComputedStyle(c).display) {
                                    var _ = null; - 1 == a && (isEmptyLadiPage(l["option.product_variant_id"]) || (_ = m.querySelector('option[data-product-variant-id="' + l["option.product_variant_id"] + '"]'), isEmptyLadiPage(_) || (a = parseInt(_.getAttribute("value")) || -1))), -1 == a && (_ = m.querySelector('option[value="0"]'), isEmptyLadiPage(_) || (a = 0))
                                }
                            }
                        }
                    }
                }
            }
        }
    }) : a = 0;
    return a
}, LadiPageScriptV2.prototype.getProductVariantId = function(t, e) {
    var i = null,
        a = this.findAncestor(t, "ladi-element");
    if (!isEmptyLadiPage(a)) {
        var n = this.runtime.eventData[a.id];
        if (!isEmptyLadiPage(n) && n["option.product_variant_type"] == this.const.PRODUCT_VARIANT_TYPE.combined) {
            var o = a.querySelector("select.ladi-form-control");
            if (!isEmptyLadiPage(o)) {
                var r = o.value;
                isEmptyLadiPage(r) && (r = 0);
                var d = o.querySelector('option[value="' + r + '"]');
                isEmptyLadiPage(d) || (i = d.getAttribute("data-product-variant-id"))
            }
        }
        var l = null,
            s = null;
        if (!isEmptyLadiPage(n) && (n["option.product_variant_type"] == this.const.PRODUCT_VARIANT_TYPE.combobox || n["option.product_variant_type"] == this.const.PRODUCT_VARIANT_TYPE.label)) {
            s = {}, l = a.querySelectorAll(".ladi-form-item select[data-product-option-id]");
            for (var c = 0; c < l.length; c++) s[l[c].getAttribute("data-product-option-id")] = (isEmptyLadiPage(l[c].value) ? "" : l[c].value).trim();
            for (l = a.querySelectorAll(".ladi-form-label-container[data-product-option-id]"), c = 0; c < l.length; c++) s[l[c].getAttribute("data-product-option-id")] = this.runtime.tmp.getLabelValue(l[c]).trim();
            isArrayLadiPage(e.variants) && e.variants.forEach(function(t) {
                if (isEmptyLadiPage(i)) {
                    var e = !0;
                    if (isStringLadiPage(t.option_ids))
                        for (var a = t.option_ids.split("/"), n = 0; n < a.length; n++)
                            if (s[a[n].trim()] != (t["option" + (n + 1)] || "").trim()) {
                                e = !1;
                                break
                            } e && (i = t.product_variant_id)
                }
            })
        }
    }
    return i
}, LadiPageScriptV2.prototype.generateProductKey = function(t, e, i, a, n, o, r, d) {
    var l = this;
    isEmptyLadiPage(r) || (a["option.product_id"] = r.product_id);
    var s = a["option.product_type"],
        c = a["option.product_mapping_name"],
        u = l.generateVariantProduct(a, !1, null, null, null, null, !0, !0, function(i) {
            l.generateProductKey(t, e, !1, a, n, o, r, d)
        }),
        p = null;
    if (isObjectLadiPage(u) && isObjectLadiPage(u.product)) {
        var m = null,
            _ = null;
        u.product.type == l.const.PRODUCT_TYPE.event || (u.product.type, l.const.PRODUCT_TYPE.service);
        var g = function() {
            if (-1 != [l.const.FORM_CONFIG_TYPE.ladisales, l.const.FORM_CONFIG_TYPE.sapo, l.const.FORM_CONFIG_TYPE.haravan, l.const.FORM_CONFIG_TYPE.shopify, l.const.FORM_CONFIG_TYPE.wordpress].indexOf(s)) {
                var t = !1;
                if (-1 != ["name", "description", "content", "location", "timezone", "external_link"].indexOf(c) && (m = u.product[c], e = m, t = !0), -1 != ["start_date", "end_date", "created_at", "updated_at"].indexOf(c) && (_ = LadiPageScript.convertDataDate({
                        date: u.product[c]
                    }, ["date"]), m = _.date, e = m, t = !0), -1 != ["image"].indexOf(c) && (m = u.product[c], isObjectLadiPage(m) && (e = m.src, isEmptyLadiPage(e) || !isStringLadiPage(e) || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("//") || (e = "https://" + l.const.STATIC_W_DOMAIN + "/" + e), t = !0)), -1 != ["images"].indexOf(c) && (m = u.product[c], isArrayLadiPage(m) && (e = [], m.forEach(function(t) {
                        isEmptyLadiPage(t.src) || (!isStringLadiPage(t.src) || t.src.startsWith("http://") || t.src.startsWith("https://") || t.src.startsWith("//") ? e.push({
                            src: t.src
                        }) : e.push({
                            src: "https://" + l.const.STATIC_W_DOMAIN + "/" + t.src
                        }))
                    }), t = !0)), t && (t = !isEmptyLadiPage(e)), isArrayLadiPage(u.product.variants) && u.product.variants.length > 0) {
                    var r = n ? 0 : l.getProductVariantIndex(null, a);
                    isEmptyLadiPage(o) || (r = u.product.variants.findIndex(function(t) {
                        return t.product_variant_id == o
                    }));
                    var y = null;
                    if (-1 != r && (y = u.product.variants[r], p = y), !t)
                        if (-1 != r)
                            if (-1 != ["variant_start_date", "variant_end_date"].indexOf(c)) _ = LadiPageScript.convertDataDate({
                                date: y[c]
                            }, ["date"]), m = _.date, e = m;
                            else if (-1 != ["sku", "variant_timezone"].indexOf(c)) m = y[c], e = m;
                    else if (-1 != ["title"].indexOf(c)) m = y[c] || y.product_name, e = m;
                    else if (-1 != ["text_quantity"].indexOf(c)) m = 1 == y.inventory_checked ? y[c] : "haravan" == y.inventory_checked ? y.quantity : "", e = m;
                    else if (-1 != ["weight"].indexOf(c)) m = y[c], isEmptyLadiPage(y.weight_unit) || (m += y.weight_unit), e = m;
                    else if (-1 != ["price", "compare_price"].indexOf(c)) isEmptyLadiPage(y[c]) ? m = "" : (m = l.formatNumber(y[c], 3), isObjectLadiPage(u.store_info) && isObjectLadiPage(u.store_info.currency) && !isEmptyLadiPage(u.store_info.currency.symbol) && (m = l.formatCurrency(y[c], u.store_info.currency.symbol, !0))), e = m;
                    else if (-1 != ["price_sale"].indexOf(c)) {
                        var h = 0;
                        isEmptyLadiPage(y.price) || isEmptyLadiPage(y.compare_price) || (h = y.compare_price - y.price), 0 != h ? (m = l.formatNumber(h, 3), isObjectLadiPage(u.store_info) && isObjectLadiPage(u.store_info.currency) && !isEmptyLadiPage(u.store_info.currency.symbol) && (m = l.formatCurrency(h, u.store_info.currency.symbol, !0))) : m = "", e = m
                    } else if (-1 != ["price_sale_percent"].indexOf(c)) {
                        var f = 0;
                        isEmptyLadiPage(y.price) || isEmptyLadiPage(y.compare_price) || (f = Math.floor((y.compare_price - y.price) / y.compare_price * 100)), e = m = 0 != f ? f + "%" : ""
                    } else if (-1 != ["src"].indexOf(c)) {
                        if (m = y[c], isEmptyLadiPage(m)) return c = "image", g();
                        !isStringLadiPage(m) || m.startsWith("http://") || m.startsWith("https://") || m.startsWith("//") || (m = "https://" + l.const.STATIC_W_DOMAIN + "/" + m), e = m
                    } else ["description"].indexOf(c), m = y[c], isEmptyLadiPage(m) || (e = m);
                    else e = m = ""
                }
            } else m = u.product[c], isBooleanLadiPage(m) ? m = m ? l.const.LANG.OPTION_TRUE : l.const.LANG.OPTION_FALSE : (_ = LadiPageScript.convertDataDate({
                date: m
            }, ["date"]), m = _.date), e = m;
            !i && isFunctionLadiPage(d) && d(e)
        };
        g()
    }
    return t ? {
        product: u,
        variant: p,
        value: e
    } : e
}, LadiPageScriptV2.prototype.generateVariantProduct = function(t, e, i, a, n, o, r, d, l) {
    var s = e ? "" : null,
        c = this,
        u = function(t) {
            if (!e) return isObjectLadiPage(t) ? t : null;
            var d = "";
            if (isObjectLadiPage(t)) {
                if (!isObjectLadiPage(t.product)) return d;
                i == c.const.PRODUCT_VARIANT_TYPE.combined && (d += '<div class="ladi-form-item-container"><div class="ladi-form-item-background"></div><div class="ladi-form-item"><select' + (isObjectLadiPage(t.store_info) && !isNullLadiPage(t.store_info.id) ? ' data-store-id="' + t.store_info.id + '"' : "") + ' data-product-id="' + t.product.product_id + '" required tabindex="' + o + '" class="ladi-form-control ladi-form-control-select" data-selected=""' + (r ? "" : ' onmousedown="javascript: event.preventDefault();"') + ">", c.runtime.isClient && (d += '<option value="" data-product-variant-id="">' + c.const.LANG.OPTION_NO_SELECT + "</option>"), isArrayLadiPage(t.product.variants) && t.product.variants.forEach(function(e, i) {
                    var a = e.title || e.product_name;
                    if (n) {
                        var o = c.formatNumber(e.price, 3);
                        isObjectLadiPage(t.store_info) && isObjectLadiPage(t.store_info.currency) && !isEmptyLadiPage(t.store_info.currency.symbol) && (o = c.formatCurrency(e.price, t.store_info.currency.symbol, !0)), a += " - " + o
                    }
                    d += '<option value="' + i + '" data-product-variant-id="' + e.product_variant_id + '">' + a + "</option>"
                }), d += "</select></div></div>"), i == c.const.PRODUCT_VARIANT_TYPE.combobox && isArrayLadiPage(t.product.options) && t.product.options.forEach(function(e) {
                    if (e.is_tmp) d += '<div class="ladi-form-item-box"></div>';
                    else if (isArrayLadiPage(e.values) && 0 != e.values.length) {
                        d += '<div class="ladi-form-item-box">', isEmptyLadiPage(a) || (d += '<div class="ladi-form-item-title"><span>' + e.name + "</span></div>"), d += '<div class="ladi-form-item-container"><div class="ladi-form-item-background"></div><div class="ladi-form-item"><select' + (isObjectLadiPage(t.store_info) && !isNullLadiPage(t.store_info.id) ? ' data-store-id="' + t.store_info.id + '"' : "") + ' data-product-id="' + e.product_id + '" data-product-option-id="' + e.product_option_id + '" required tabindex="' + o + '" class="ladi-form-control ladi-form-control-select" data-selected=""' + (r ? "" : ' onmousedown="javascript: event.preventDefault();"') + ">", c.runtime.isClient && (d += '<option value="">' + c.const.LANG.OPTION_NO_SELECT + "</option>");
                        var i = null;
                        isArrayLadiPage(t.product.variants) && (i = t.product.variants[0]);
                        var n = null;
                        isEmptyLadiPage(i) || isStringLadiPage(i.option_ids) && (n = i.option_ids.split("/"));
                        e.values.forEach(function(t) {
                            var a = function(t) {
                                var a = "";
                                return isArrayLadiPage(n) && n.forEach(function(n, o) {
                                    e.product_option_id == n && t == i["option" + (o + 1)] && (a = " selected")
                                }), a
                            }(t.name);
                            d += "<option" + a + ' value="' + t.name + '">' + (t.name_new || t.name) + "</option>"
                        }), d += "</select></div></div></div>"
                    }
                }), i == c.const.PRODUCT_VARIANT_TYPE.label && isArrayLadiPage(t.product.options) && t.product.options.forEach(function(e) {
                    if (isArrayLadiPage(e.values) && 0 != e.values.length) {
                        d += '<div class="ladi-form-item-box">', isEmptyLadiPage(a) || (d += '<div class="ladi-form-item-title">', d += "<span>" + e.name + "</span>", d += '<span class="ladi-form-item-title-value">' + (r ? "" : e.values[0].name) + "</span>", d += "</div>"), d += '<div class="ladi-form-label-container"' + (isObjectLadiPage(t.store_info) && !isNullLadiPage(t.store_info.id) ? ' data-store-id="' + t.store_info.id + '"' : "") + ' data-product-id="' + e.product_id + '" data-product-option-id="' + e.product_option_id + '" data-selected="">';
                        var i = null;
                        isArrayLadiPage(t.product.variants) && (i = t.product.variants[0]);
                        var n = null;
                        isEmptyLadiPage(i) || isStringLadiPage(i.option_ids) && (n = i.option_ids.split("/"));
                        e.values.forEach(function(t, a) {
                            0 == a && (t.type == c.const.PRODUCT_VARIANT_OPTION_TYPE.image ? d += '<div class="ladi-form-label-item image no-value" data-value=""></div>' : t.type == c.const.PRODUCT_VARIANT_OPTION_TYPE.color ? d += '<div class="ladi-form-label-item color no-value" data-value=""></div>' : d += '<div class="ladi-form-label-item text no-value" data-value="">&nbsp;</div>');
                            var o = function(t) {
                                var a = "";
                                return isArrayLadiPage(n) && n.forEach(function(n, o) {
                                    e.product_option_id == n && t == i["option" + (o + 1)] && (a = " selected")
                                }), a
                            }(t.name);
                            if (e.type == c.const.PRODUCT_VARIANT_DISPLAY_TYPE.visual_watch && t.type == c.const.PRODUCT_VARIANT_OPTION_TYPE.image) {
                                var r = t.value;
                                isEmptyLadiPage(r) || !isStringLadiPage(r) || r.startsWith("http://") || r.startsWith("https://") || r.startsWith("//") || (r = "https://" + c.const.STATIC_W_DOMAIN + "/" + r), r = c.getOptimizeImage(r, 500, 500, !1, !1, !1, !0), d += `<div class="ladi-form-label-item image${o}" style='background-image: url("${r}");' title="` + (t.name_new || t.name) + '" data-value="' + t.name + '"></div>'
                            } else e.type == c.const.PRODUCT_VARIANT_DISPLAY_TYPE.visual_watch && t.type == c.const.PRODUCT_VARIANT_OPTION_TYPE.color ? d += '<div class="ladi-form-label-item color' + o + "\" style='background-color: " + t.value + ";' title=\"" + (t.name_new || t.name) + '" data-value="' + t.name + '"></div>' : d += '<div class="ladi-form-label-item text' + o + '" data-value="' + t.name + '">' + (t.name_new || t.name) + "</div>"
                        }), d += "</div></div>"
                    }
                })
            }
            return d
        };
    if (!isNullLadiPage(t.dataProduct)) return u(t.dataProduct);
    var p = t["option.form_account_id"],
        m = t["option.product_type"],
        _ = t["option.ladisale_store_id"] || null,
        g = t["option.product_id"],
        y = t["option.data_setting.value"],
        h = t["option.data_setting.type_dataset"],
        f = t["option.data_setting.sort_name"],
        v = t["option.data_setting.sort_by"],
        E = null,
        P = null;
    if (-1 != [c.const.FORM_CONFIG_TYPE.ladisales, c.const.FORM_CONFIG_TYPE.sapo, c.const.FORM_CONFIG_TYPE.haravan, c.const.FORM_CONFIG_TYPE.shopify, c.const.FORM_CONFIG_TYPE.wordpress].indexOf(m)) {
        if (!isEmptyLadiPage(g)) {
            isEmptyLadiPage(c.runtime.tmp.product_info[m]) && (c.runtime.tmp.product_info[m] = {}), isEmptyLadiPage(c.runtime.tmp.timeout_product_info[m]) && (c.runtime.tmp.timeout_product_info[m] = {});
            var L = g;
            if (g = parseInt(g) || g, E = c.runtime.tmp.product_info[m][g], P = function() {
                    return u(E)
                }, isNullLadiPage(E)) {
                c.runtime.tmp.product_info[m][g] = !0;
                var b = function() {
                        c.runtime.tmp.product_info[m][g] = !1, isEmptyLadiPage(c.runtime.tmp.timeout_product_info[m][g]) || (c.removeTimeout(c.runtime.tmp.timeout_product_info[m][g]), delete c.runtime.tmp.timeout_product_info[m][g])
                    },
                    A = function(t) {
                        if (E = isObjectLadiPage(c.runtime.tmp.product_info[m][g]) ? c.runtime.tmp.product_info[m][g] : t.data, isObjectLadiPage(E)) {
                            if (!isObjectLadiPage(E.store_info)) {
                                var e = c.runtime.currency;
                                c.runtime.isClient || (e = window.$rootScope.getStoreCurrency()), E.store_info = {
                                    currency: {
                                        code: e,
                                        symbol: c.formatCurrency(null, e, !1, !0)
                                    }
                                }
                            }
                            if (m != c.const.FORM_CONFIG_TYPE.ladisales && (E.store_info.id = -1), isObjectLadiPage(E.store_info.currency) && !isEmptyLadiPage(E.store_info.currency.code) && (E.store_info.currency.symbol = c.formatCurrency(null, E.store_info.currency.code, !1, !0)), isObjectLadiPage(E.product) && isArrayLadiPage(E.product.options) && isArrayLadiPage(E.product.variants)) {
                                var i = E.product.options.map(function(t) {
                                    return t.product_option_id
                                });
                                if (i = i.join("/"), -1 != [c.const.FORM_CONFIG_TYPE.ladisales].indexOf(m) && 1 == E.product.options.length && isObjectLadiPage(E.product.options[0]) && isArrayLadiPage(E.product.options[0].values) && E.product.variants.length == E.product.options[0].values.length && (E.product.type == c.const.PRODUCT_TYPE.event || E.product.type == c.const.PRODUCT_TYPE.service)) {
                                    for (var a = [], n = 0; n < E.product.variants.length; n++)
                                        for (var o = 0; o < E.product.options[0].values.length; o++)
                                            if (isObjectLadiPage(E.product.options[0].values[o]) && E.product.options[0].values[o].name == E.product.variants[n].option1) {
                                                a.push(E.product.options[0].values[o]);
                                                break
                                            } E.product.options[0].values = a
                                }
                                for (var r = 0; r < E.product.variants.length; r++) - 1 != [c.const.FORM_CONFIG_TYPE.ladisales].indexOf(m) && 1 == E.product.variants[r].allow_sold_out && (E.product.variants[r].inventory_checked = 0), isNullLadiPage(E.product.variants[r].compare_price) && (E.product.variants[r].compare_price = E.product.variants[r].price_compare), isNullLadiPage(E.product.variants[r].variant_start_date) && (E.product.variants[r].variant_start_date = E.product.variants[r].start_date), isNullLadiPage(E.product.variants[r].variant_end_date) && (E.product.variants[r].variant_end_date = E.product.variants[r].end_date), isNullLadiPage(E.product.variants[r].variant_timezone) && (E.product.variants[r].variant_timezone = E.product.variants[r].timezone), isEmptyLadiPage(E.product.variants[r].option_ids) && (E.product.variants[r].option_ids = i), -1 != [c.const.FORM_CONFIG_TYPE.sapo, c.const.FORM_CONFIG_TYPE.haravan, c.const.FORM_CONFIG_TYPE.shopify].indexOf(m) && 1 == E.product.variants.length && "Default Title" == E.product.variants[r].title && (E.product.variants[r].title = null, E.product.variants[r].option1 = null, E.product.options = []), -1 != [c.const.FORM_CONFIG_TYPE.wordpress].indexOf(m) && 1 == E.product.variants.length && E.product.variants[r].title == E.product.variants[r].product_name && (E.product.variants[r].title = null, E.product.variants[r].option1 = null, E.product.options = []), isEmptyLadiPage(E.product.variants[r].package_quantity) || isEmptyLadiPage(E.product.variants[r].package_quantity_unit) || (isNullLadiPage(E.product.variants[r].title_old) && (E.product.variants[r].title_old = E.product.variants[r].title), E.product.variants[r].title = E.product.variants[r].title_old + " (" + E.product.variants[r].package_quantity + " " + E.product.variants[r].package_quantity_unit + ")");
                                if (isArrayLadiPage(E.product.options) && 1 == E.product.options.length && isArrayLadiPage(E.product.options[0].values))
                                    for (var d = null, u = function(t) {
                                            return t.option1 == d
                                        }, p = 0; p < E.product.options[0].values.length; p++) {
                                        d = E.product.options[0].values[p].name;
                                        var _ = E.product.variants.find(u);
                                        E.product.options[0].values[p].name_new = E.product.options[0].values[p].label || E.product.options[0].values[p].name, isEmptyLadiPage(_) || isEmptyLadiPage(_.package_quantity) || isEmptyLadiPage(_.package_quantity_unit) || (E.product.options[0].values[p].name_new = E.product.options[0].values[p].name_new + " (" + _.package_quantity + " " + _.package_quantity_unit + ")")
                                    }
                            }
                            c.runtime.tmp.product_info[m][g] = E, s = P(), isFunctionLadiPage(l) && l(s)
                        } else b()
                    },
                    T = {
                        product_id: g
                    },
                    S = null,
                    w = "POST";
                return c.runLimitRequest(20, function() {
                    if (c.runtime.isClient) {
                        var t = "",
                            e = c.const.API_LADISALE_SHOW_PRODUCT;
                        m == c.const.FORM_CONFIG_TYPE.ladisales ? ((S = {
                            "Content-Type": "application/json"
                        })["Store-Id"] = _, t = JSON.stringify([L, m, _]), T = JSON.stringify(T)) : m == c.const.FORM_CONFIG_TYPE.wordpress ? (w = "GET", e = window.location.origin + "/ladipage/api?action=product_info&product_id=" + g, T = null) : (S = {
                            "Content-Type": "application/json"
                        }, e = c.const.API_SHOW_PRODUCT, T = {
                            form_account_id: p,
                            product_id: g
                        }, t = JSON.stringify([T.form_account_id, L, m]), T = JSON.stringify(T)), !isEmptyLadiPage(t) && isObjectLadiPage(c.runtime.tmp.product_data_website) && isObjectLadiPage(c.runtime.tmp.product_data_website[t]) ? A({
                            data: c.runtime.tmp.product_data_website[t]
                        }) : c.sendRequest(w, e, T, !0, S, function(t, e, i) {
                            if (i.readyState == XMLHttpRequest.DONE) try {
                                var a = JSON.parse(t);
                                A(a)
                            } catch (t) {
                                b()
                            }
                        })
                    } else {
                        var i = function(t) {
                                isNullLadiPage(t) || A({
                                    data: t
                                })
                            },
                            a = LadiPage.getProductInfo(p, g, function(t) {
                                i(t)
                            });
                        i(a)
                    }
                }), s
            }!0 === E ? c.runtime.tmp.timeout_product_info[m][g] = c.runTimeout(function() {
                c.generateVariantProduct(t, e, i, a, n, o, r, !1, l)
            }, 100) : (s = P(), !d && isFunctionLadiPage(l) && l(s))
        }
    } else if (!isEmptyLadiPage(g)) {
        if (isEmptyLadiPage(c.runtime.tmp.product_info[m]) && (c.runtime.tmp.product_info[m] = {}), isEmptyLadiPage(c.runtime.tmp.timeout_product_info[m]) && (c.runtime.tmp.timeout_product_info[m] = {}), g = String(g), E = c.runtime.tmp.product_info[m][g], P = function() {
                return e ? "" : isObjectLadiPage(E) ? E : null
            }, isNullLadiPage(E)) return c.runtime.tmp.product_info[m][g] = !0, c.loadDataset(y, y, h, f, v, !0, c.runtime.isClient, function(t) {
            s = P(), isFunctionLadiPage(l) && l(s)
        }), s;
        !0 === E ? c.runtime.tmp.timeout_product_info[m][g] = c.runTimeout(function() {
            c.generateVariantProduct(t, e, i, a, n, o, r, !1, l)
        }, 100) : (s = P(), !d && isFunctionLadiPage(l) && l(s))
    }
    return s
}, LadiPageScriptV2.prototype.generateVariantContentString = function(t, e, i, a) {
    var n = [];
    i = isEmptyLadiPage(i) ? " | " : i;
    try {
        isEmptyLadiPage(t) || (e && (t = Base64.decode(t)), t = JSON.parse(t), isArrayLadiPage(t.dynamic_content.hide) && t.dynamic_content.hide.length > 0 && n.push(this.const.LANG.HIDE_ELEMENT + " " + t.dynamic_content.hide.join(", ")), isArrayLadiPage(t.dynamic_content.show) && t.dynamic_content.show.length > 0 && n.push(this.const.LANG.SHOW_ELEMENT + " " + t.dynamic_content.show.join(", ")), isArrayLadiPage(t.dynamic_content.top) && t.dynamic_content.top.length > 0 && n.push(this.const.LANG.TOP_ELEMENT + " " + t.dynamic_content.top.join(", ")), isArrayLadiPage(t.dynamic_content.scroll) && t.dynamic_content.scroll.length > 0 && n.push(this.const.LANG.SCROLL_ELEMENT + " " + t.dynamic_content.scroll.join(", ")), isArrayLadiPage(t.dynamic_content.cookie) && t.dynamic_content.cookie.length > 0 && n.push(this.const.LANG.SET_COOKIE + " " + t.dynamic_content.cookie.join("; ")))
    } catch (t) {}
    return a ? n : n.join(i)
}, LadiPageScriptV2.prototype.checkDataTypeWebsiteValue = function(t) {
    return t == this.const.DATA_TYPE.list_category || t == this.const.DATA_TYPE.list_tag || t == this.const.DATA_TYPE.list_post_by_category || t == this.const.DATA_TYPE.list_post_by_tag || t == this.const.DATA_TYPE.list_post_by_keyword
}, LadiPageScriptV2.prototype.loadCollectionData = function(t, e, i, a, n, o) {
    var r = this,
        d = function(t, e, i, a, n, o) {
            var l = !isEmptyLadiPage(e["option.product_mapping_name"]),
                s = JSON.stringify(e),
                c = null,
                u = null;
            if (l)
                if (a && isEmptyLadiPage(i)) c = "";
                else if (!isEmptyLadiPage(e["option.product_id"]) && s === (c = (u = r.generateProductKey(!0, s, !0, e, !0, i, null, function(r) {
                    d(t, e, i, a, n, o)
                })).value)) return;
            var p = e.type,
                m = null,
                _ = null;
            if (l && "headline" == p && (_ = t.getElementsByClassName("ladi-headline")[0], isEmptyLadiPage(_) || (_.innerHTML = isNullLadiPage(c) ? "" : c)), l && "paragraph" == p && (_ = t.getElementsByClassName("ladi-paragraph")[0], isEmptyLadiPage(_) || (_.innerHTML = isNullLadiPage(c) ? "" : c)), l && "image" == p) {
                m = r.getOptimizeImage(c, t.clientWidth, t.clientHeight, !0, !1, !1, !0);
                var g = t.getElementsByClassName("ladi-image-background")[0];
                isEmptyLadiPage(g) || (isEmptyLadiPage(m) ? g.style.setProperty("background-image", "none") : g.style.setProperty("background-image", 'url("' + m + '")'))
            }
            if ("gallery" == p) {
                if (l && !isArrayLadiPage(c)) return;
                if (o && !n && "true" == t.getAttribute("data-collection")) return void r.runtime.tmp.updateImageGalleryProduct(t, u, e);
                t.setAttribute("data-collection", !0), t.removeAttribute("data-stop"), t.removeAttribute("data-loaded"), t.removeAttribute("data-scrolled"), t.removeAttribute("data-current"), t.removeAttribute("data-is-next"), t.removeAttribute("data-runtime-id"), t.removeAttribute("data-next-time");
                var y = t.querySelector(".ladi-gallery-view-item.selected");
                isEmptyLadiPage(y) || y.classList.remove("selected");
                var h = t.querySelector(".ladi-gallery-control-item.selected");
                isEmptyLadiPage(h) || h.classList.remove("selected");
                var f = t.getElementsByClassName("ladi-gallery-view")[0];
                h = t.getElementsByClassName("ladi-gallery-control-item")[0], y = t.getElementsByClassName("ladi-gallery-view-item")[0], isEmptyLadiPage(y) || y.classList.add("selected"), isEmptyLadiPage(h) || h.classList.add("selected");
                var v = t.getElementsByClassName("ladi-gallery-control-box")[0];
                if (isEmptyLadiPage(v) || v.style.removeProperty("left"), l) {
                    for (var E = t.getElementsByClassName("ladi-gallery-view-item"); E.length < c.length;) {
                        var P = r.createTmpElement("div", '<div class="ladi-gallery-view-item" data-index="' + E.length + '"></div>', null, !0);
                        t.getElementsByClassName("ladi-gallery-view")[0].appendChild(P)
                    }
                    for (; E.length > c.length;) E[E.length - 1].parentElement.removeChild(E[E.length - 1]);
                    for (var L = t.getElementsByClassName("ladi-gallery-control-item"), b = function(e) {
                            r.runtime.tmp.eventClickGalleryControlItem(e, t)
                        }; L.length < c.length;) {
                        var A = r.createTmpElement("div", '<div class="ladi-gallery-control-item" data-index="' + L.length + '"></div>', null, !0);
                        A.addEventListener("click", b), t.getElementsByClassName("ladi-gallery-control-box")[0].appendChild(A)
                    }
                    for (; L.length > c.length;) L[L.length - 1].parentElement.removeChild(L[L.length - 1]);
                    for (var T = t.querySelectorAll(".ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow"), S = 0; S < T.length; S++) c.length <= 1 ? T[S].style.setProperty("display", "none") : T[S].style.removeProperty("display");
                    for (T = t.querySelectorAll(".ladi-gallery > .ladi-gallery-control"), S = 0; S < T.length; S++) c.length <= 1 ? T[S].style.setProperty("display", "none") : T[S].style.removeProperty("display");
                    for (T = t.querySelectorAll(".ladi-gallery > .ladi-gallery-view"), S = 0; S < T.length; S++) c.length <= 1 ? T[S].style.setProperty("height", "100%") : T[S].style.removeProperty("height");
                    c.forEach(function(e, i) {
                        m = e.src, isEmptyLadiPage(f) || (m = r.getOptimizeImage(e.src, f.clientWidth, f.clientHeight, !0, !1, !1, r.runtime.isClient));
                        var a = t.querySelector('.ladi-gallery .ladi-gallery-view-item[data-index="' + i + '"]');
                        isEmptyLadiPage(a) || a.style.setProperty("background-image", 'url("' + m + '")'), isEmptyLadiPage(h) || (m = r.getOptimizeImage(e.src, h.clientWidth, h.clientHeight, !0, !1, !1, r.runtime.isClient)), a = t.querySelector('.ladi-gallery .ladi-gallery-control-item[data-index="' + i + '"]'), isEmptyLadiPage(a) || a.style.setProperty("background-image", 'url("' + m + '")')
                    }), r.runTimeout(function() {
                        t.setAttribute("data-loaded", !0)
                    }, 300)
                }
                r.runtime.tmp.runGallery(t.id, t, !0, p), r.runtime.tmp.setGalleryStart(t.id, t)
            }
            "countdown_item" == p && r.runtime.tmp.runOptionCountdownItem(t.id, t, p, e["option.countdown_item_type"]), "countdown" == p && r.runtime.tmp.runOptionCountdown(t.id, t, p, e["option.countdown_type"], e["option.countdown_minute"], e["option.countdown_daily_start"], e["option.countdown_daily_end"], e["option.countdown_endtime"])
        };
    if ((o = isObjectLadiPage(o) ? o : {}).only_set_value_doc) return d(o.docItem, o.elementJ, o.product_variant_id, o.is_product_variant_id, o.isFirst, o.is_select_change);
    var l = e["option.product_type"],
        s = e["option.ladisale_store_id"],
        c = e["option.product_tag_id"],
        u = e["option.collection_setting.type"],
        p = e["option.data_setting.type"],
        m = document,
        _ = r.runtime.eventData[t];
    if (o.is_generate_template && (m = o.dom, _ = o.getEventData(t)), !isEmptyLadiPage(_) && "collection" == _.type) {
        var g = this.runtime.isDesktop ? this.const.DESKTOP : this.const.MOBILE;
        o.is_generate_template && (g = o.device);
        var y = _[g + ".option.collection_setting.list_type"],
            h = parseFloatLadiPage(_[g + ".option.collection_setting.row"]) || 0,
            f = parseFloatLadiPage(_[g + ".option.collection_setting.column"]) || 0,
            v = parseFloatLadiPage(_[g + ".option.collection_setting.margin"]) || 0,
            E = function(t, e, i, a, n, d) {
                if (i = r.copy(i), Object.keys(a).forEach(function(t) {
                        i[t] = a[t]
                    }), a["option.input_type"] == r.const.INPUT_TYPE.product_variant) {
                    var l = r.generateVariantProduct(i, !0, a["option.product_variant_type"], a["option.product_variant_title"], a["option.product_variant_price"], a["option.input_tabindex"], r.runtime.isClient, !0, function(o) {
                            E(t, e, i, a, n, d)
                        }),
                        s = function(e) {
                            r.updateProductVariantSelectOption(e, i, a, !1, function() {
                                var i = r.getProductVariantId(e.target, n),
                                    a = n.variants.findIndex(function(t) {
                                        return t.product_variant_id == i
                                    }),
                                    l = r.findAncestor(e.target, "ladi-element");
                                if (!isEmptyLadiPage(l)) {
                                    var s = r.findAncestor(l, "ladi-collection-item");
                                    if (!isEmptyLadiPage(s))
                                        for (var c = s.querySelectorAll('[data-variant="true"]'), u = 0; u < c.length; u++)
                                            if (c[u].id != l.id) {
                                                var p = r.runtime.eventData[c[u].id];
                                                o.is_generate_template && (p = o.getEventData(c[u].id));
                                                var m = null,
                                                    _ = null,
                                                    g = null,
                                                    y = 0;
                                                if (p["option.product_variant_type"] == r.const.PRODUCT_VARIANT_TYPE.combobox && (_ = n.variants[a], isObjectLadiPage(_) && isStringLadiPage(_.option_ids)))
                                                    for (g = _.option_ids.split("/"), y = 0; y < g.length; y++) m = c[u].querySelector('select[data-product-option-id="' + g[y] + '"]'), isEmptyLadiPage(m) || (m.value = _["option" + (y + 1)]);
                                                if (p["option.product_variant_type"] == r.const.PRODUCT_VARIANT_TYPE.label && (_ = n.variants[a], isObjectLadiPage(_) && isStringLadiPage(_.option_ids)))
                                                    for (g = _.option_ids.split("/"), y = 0; y < g.length; y++) m = c[u].querySelector('.ladi-form-label-container[data-product-option-id="' + g[y] + '"]'), isEmptyLadiPage(m) || r.runtime.tmp.updateLabelValue(m, _["option" + (y + 1)]);
                                                if (p["option.product_variant_type"] == r.const.PRODUCT_VARIANT_TYPE.combined) {
                                                    if (m = c[u].querySelector("select.ladi-form-control"), !isEmptyLadiPage(i)) {
                                                        var h = m.querySelector('option[data-product-variant-id="' + i + '"]');
                                                        isEmptyLadiPage(h) || (a = h.getAttribute("value"))
                                                    }
                                                    m.value = (-1 == a ? "" : a) + ""
                                                }
                                            }
                                }
                                d(t, n, !1, i, !0, !0)
                            })
                        },
                        c = r.runtime.tmp.getOptionLabelValue,
                        u = r.runtime.tmp.updateLabelValue,
                        p = r.runtime.tmp.getLabelValue,
                        m = function(t) {
                            r.runtime.tmp.clickLabelProductChangeCallback(t, function(t) {
                                s({
                                    target: t
                                })
                            })
                        };
                    r.showParentVisibility(e, function() {
                        for (var t = e.clientHeight, n = t, o = e.querySelectorAll("select.ladi-form-control"), d = {}, _ = 0; _ < o.length; _++) d[o[_].getAttribute("data-store-id") + "_" + o[_].getAttribute("data-product-id") + "_" + o[_].getAttribute("data-product-option-id")] = o[_].value;
                        var g = e.querySelectorAll(".ladi-form-label-container");
                        for (_ = 0; _ < g.length; _++) d[g[_].getAttribute("data-store-id") + "_" + g[_].getAttribute("data-product-id") + "_" + g[_].getAttribute("data-product-option-id")] = p(g[_]);
                        e.innerHTML = l;
                        for (var y = e.querySelectorAll("select.ladi-form-control"), h = null, f = null, v = 0; v < y.length; v++) y[v].removeEventListener("change", s), y[v].addEventListener("change", s), h = d[y[v].getAttribute("data-store-id") + "_" + y[v].getAttribute("data-product-id") + "_" + y[v].getAttribute("data-product-option-id")], isNullLadiPage(h) && (f = y[v].querySelector("option"), isEmptyLadiPage(f) || (h = f.getAttribute("value"))), y[v].value = h;
                        var E = e.querySelectorAll(".ladi-form-label-container");
                        for (v = 0; v < E.length; v++) {
                            for (var P = E[v].querySelectorAll(".ladi-form-label-item"), L = 0; L < P.length; L++) r.tapEventListener(P[L], m);
                            h = d[E[v].getAttribute("data-store-id") + "_" + E[v].getAttribute("data-product-id") + "_" + E[v].getAttribute("data-product-option-id")], isNullLadiPage(h) && (f = P[1], isEmptyLadiPage(f) || (h = c(f))), u(E[v], h)
                        }
                        if (r.updateProductVariantSelectOptionFirst(i, a, e), a["option.product_variant_type"] != r.const.PRODUCT_VARIANT_TYPE.combined && (e.style.setProperty("height", "auto"), n = e.clientHeight, e.style.removeProperty("height"), n > 0 && t != n)) {
                            e.style.setProperty("height", n + "px");
                            var b = r.findAncestor(e, "ladi-form");
                            isEmptyLadiPage(b) || (b = r.findAncestor(b, "ladi-element"), r.updateHeightElement(!0, e, b, t, n))
                        }
                    })
                }
                if (a["option.input_type"] == r.const.INPUT_TYPE.number) {
                    var _ = e.querySelector('input[name="quantity"]'),
                        g = function(t) {
                            if (!isEmptyLadiPage(t.target.value)) {
                                var e = r.generateVariantProduct(i, !1, null, null, null, null, !0, !0, function() {
                                    g(t)
                                });
                                if (!(isEmptyLadiPage(e) || isEmptyLadiPage(e.store_info) || isEmptyLadiPage(e.product))) {
                                    var a = t.target;
                                    a = (a = r.findAncestor(a, "ladi-form")).querySelector('[data-variant="true"]');
                                    var n = r.getProductVariantId(a, e.product),
                                        o = e.product.variants.findIndex(function(t) {
                                            return t.product_variant_id == n
                                        });
                                    if (-1 != o) {
                                        var d = e.product.variants[o].quantity,
                                            l = e.product.variants[o].quantity_stock;
                                        d = isNullLadiPage(l) ? d : l;
                                        var s = parseInt(t.target.value) || 0,
                                            c = 1;
                                        c = e.product.variants[o].min_buy || c;
                                        var u = e.product.variants[o].max_buy,
                                            p = 0,
                                            m = r.runtime.tmp.cart.findIndex(function(t) {
                                                return t.product_id == e.product.variants[o].product_id && t.product_variant_id == e.product.variants[o].product_variant_id
                                            }); - 1 != m && (p = r.runtime.tmp.cart[m].quantity), c > s + p && (s = c - p), 1 == e.product.variants[o].inventory_checked && s + p > d && (s = d - p), !isEmptyLadiPage(u) && s + p > u && (s = u - p), s = s < 1 ? 1 : s, t.target.setAttribute("min", c), isEmptyLadiPage(u) || t.target.setAttribute("max", u), t.target.value = s
                                    }
                                }
                            }
                        };
                    _.addEventListener("input", g), r.fireEvent(_, "input");
                    var y = e.querySelectorAll(".button")[0],
                        h = e.querySelectorAll(".button")[1];
                    if (isEmptyLadiPage(y) || isEmptyLadiPage(h)) return;
                    y.addEventListener("click", function(t) {
                        r.removeTimeout(r.runtime.tmp.timeout_button_quantity_cart_id), r.runtime.tmp.timeout_button_quantity_cart_id = r.runTimeout(function() {
                            _.value = (parseFloatLadiPage(_.value) || 0) - 1, r.fireEvent(_, "input")
                        }, 10)
                    }), h.addEventListener("click", function(t) {
                        r.removeTimeout(r.runtime.tmp.timeout_button_quantity_cart_id), r.runtime.tmp.timeout_button_quantity_cart_id = r.runTimeout(function() {
                            _.value = (parseFloatLadiPage(_.value) || 0) + 1, r.fireEvent(_, "input")
                        }, 10)
                    })
                }
                if ("button" == a.type && (a["option.is_buy_now"] || a["option.is_add_to_cart"])) {
                    var f = function() {
                        var t = i["option.data_event"];
                        if (!isArrayLadiPage(t) && (t = [], isObjectLadiPage(i["option.data_action"]))) {
                            var a = r.copy(i["option.data_action"]);
                            a.action_type = r.const.ACTION_TYPE.action, t.push(a)
                        }
                        t.forEach(function(t) {
                            t.action_type == r.const.ACTION_TYPE.action && (t.type == r.const.DATA_ACTION_TYPE.popup_cart && (window.ladi("POPUP_CART").show(), r.runEventTracking(e.id, {
                                is_form: !1
                            })), t.type == r.const.DATA_ACTION_TYPE.popup_checkout && (r.runtime.shopping_third_party ? r.getThirdPartyCheckoutUrl(!0, null, {
                                event: {
                                    target: e
                                }
                            }) : window.ladi("POPUP_CHECKOUT").show(!1, {
                                event: {
                                    target: e
                                }
                            }), r.runEventTracking(e.id, {
                                is_form: !1
                            })))
                        })
                    };
                    e.setAttribute("data-click", !1), e.addEventListener("click", function(t) {
                        r.runtime.tmp.buttonAddToCartClick(t, !0, i, f)
                    })
                }
            },
            P = function(t, e) {
                var _ = h * f;
                r.checkDataTypeWebsiteValue(p) && isEmptyLadiPage(u) && (y != r.const.COLLECTION_LIST_TYPE.horizontal && y != r.const.COLLECTION_LIST_TYPE.vertical || (_ = 1e3));
                var g = null;
                if (g = r.getListProductByTagId(e, _, i, !0, function() {
                        P(t, e)
                    }), isObjectLadiPage(g) && isArrayLadiPage(g.products)) {
                    var L = m.getElementById(t);
                    if (isEmptyLadiPage(L)) return;
                    if (L.getAttribute("data-page") == i && 1 != i) return;
                    var b = i,
                        A = !1,
                        T = !1;
                    if (!isEmptyLadiPage(g.total_record) && i * _ >= g.total_record) {
                        if (u == r.const.COLLECTION_TYPE.readmore) {
                            var S = L.getElementsByClassName("ladi-collection-button-next")[0];
                            isEmptyLadiPage(S) || S.setAttribute("data-opacity", "0")
                        }
                        L.setAttribute("data-max-page", b), A = !0, i * _ > g.total_record && (T = !0)
                    }
                    L.setAttribute("data-page", i > b ? b : i);
                    var w = L.getElementsByClassName("ladi-collection-arrow-left")[0],
                        O = L.getElementsByClassName("ladi-collection-arrow-right")[0],
                        C = L.getElementsByClassName("ladi-collection-button-next")[0];
                    if (isEmptyLadiPage(w) || w.classList.remove("opacity-0"), isEmptyLadiPage(O) || O.classList.remove("opacity-0"), isEmptyLadiPage(C) || C.classList.remove("opacity-0"), 1 == L.getAttribute("data-page") && u == r.const.COLLECTION_TYPE.carousel && (isEmptyLadiPage(w) || w.classList.add("opacity-0")), L.getAttribute("data-page") == L.getAttribute("data-max-page") && (u == r.const.COLLECTION_TYPE.readmore && (isEmptyLadiPage(C) || C.classList.add("opacity-0")), u == r.const.COLLECTION_TYPE.carousel && (isEmptyLadiPage(O) || O.classList.add("opacity-0"))), b < i) return;
                    var k = L.getElementsByClassName("ladi-collection-item");
                    if (0 == k.length) return;
                    var I = 0,
                        N = 0;
                    if (L.hasAttribute("data-max-option-length")) I = parseFloatLadiPage(L.getAttribute("data-max-option-length"));
                    else {
                        var D = L.querySelectorAll('.ladi-form [data-variant="true"]');
                        for (N = 0; N < D.length; N++) {
                            var R = D[N].getElementsByClassName("ladi-form-item-box");
                            R.length > I && (I = R.length)
                        }
                    }
                    var x = L.getElementsByClassName("ladi-collection-content")[0],
                        B = {
                            className: k[0].className,
                            innerHTML: k[0].innerHTML
                        };
                    a && k[0].parentElement.removeChild(k[0]);
                    for (var M = x.getElementsByClassName("ladi-collection-page"); M.length < i;) {
                        var q = document.createElement("div");
                        q.className = "ladi-collection-page", x.appendChild(q)
                    }
                    var F = M[i - 1],
                        U = F.getElementsByClassName("ladi-collection-item");
                    if (U.length != g.products.length)
                        for (; U.length > 0;) U[0].parentElement.removeChild(U[0]);
                    var V = function(t, i, a, n, u, p) {
                        isEmptyLadiPage(i.id) && !isEmptyLadiPage(i.product_id) && (i.id = i.product_id);
                        for (var m = 0; m < t.length; m++) {
                            a && isFunctionLadiPage(r.runtime.tmp.runElementClickSelected) && r.runtime.tmp.runElementClickSelected(t[m], !0);
                            var _ = r.copy(r.runtime.eventData[t[m].id]);
                            o.is_generate_template && (_ = o.getEventData(t[m].id)), isEmptyLadiPage(_) || (r.runAnimationDoc(t[m], _, {
                                element_type: _.type
                            }), _["option.product_type"] = l, _["option.ladisale_store_id"] = s, _["option.product_tag_id"] = c, _["option.product_id"] = i.id, a && (isFunctionLadiPage(r.runtime.tmp.runOptionAction) && r.runtime.tmp.runOptionAction(t[m], t[m].id, _.type, _), isFunctionLadiPage(r.runtime.tmp.runOptionHover) && r.runtime.tmp.runOptionHover(t[m], t[m].id, _.type, _["option.data_event"] || _["option.data_hover"]), E(t, t[m], e, _, i, V)), d(t[m], _, n, u, a, p))
                        }
                    };
                    for (N = 0; N < g.products.length; N++) isArrayLadiPage(g.products[N].options) && g.products[N].options.length > I && (I = g.products[N].options.length);
                    for (L.setAttribute("data-max-option-length", I), N = 0; N < g.products.length; N++)
                        if (!(U.length > N)) {
                            var Y = document.createElement("div");
                            Y.className = B.className, F.appendChild(Y), Y.innerHTML = B.innerHTML;
                            for (var H = Y.getElementsByClassName("ladi-element"); isArrayLadiPage(g.products[N].options) && g.products[N].options.length < I;) g.products[N].options.push({
                                is_tmp: !0
                            });
                            V(H, g.products[N], !0, null, !1, !1)
                        } A && (F.classList.add("last"), T && F.classList.add("not-full")), u == r.const.COLLECTION_TYPE.carousel && function(t) {
                        var e = m.getElementById(t);
                        if (!isEmptyLadiPage(e) && e.hasAttribute("data-page")) {
                            var i = "0",
                                a = getComputedStyle(e).width,
                                n = a,
                                o = parseFloatLadiPage(e.getAttribute("data-page")) || 1,
                                d = e.getElementsByClassName("ladi-collection-content")[0].getElementsByClassName("ladi-collection-page"),
                                l = d[d.length - 1].getElementsByClassName("ladi-collection-item"),
                                s = f - l.length,
                                c = "",
                                u = "";
                            s > 0 ? (n = "calc(" + a + " * " + d.length + " - (" + a + " / " + f + " * " + s + ") + calc(" + v + "px / " + f + " * " + l.length + "))", o > 1 && (o != d.length ? i = "calc(-" + a + " * " + (o - 1) + ")" : (i = "calc(-" + a + " * " + (o - 1) + " + (" + a + " / " + f + " * " + s + "))", u = "margin-left: calc(-" + v + "px / " + f + " * " + l.length + ");")), c += "#" + t + " .ladi-collection .ladi-collection-content .ladi-collection-page.last.not-full .ladi-collection-item:first-child {", c += "margin-left: " + v + "px;", c += "}", c += "#" + t + " .ladi-collection-content .ladi-collection-page.last {", c += "width: calc(" + getComputedStyle(e).width + " / " + f + " * " + l.length + " + calc(" + v + "px / " + f + " * " + l.length + ")) !important;", c += "}") : (o > 1 && (i = "calc(-" + a + " * " + (o - 1) + ")"), n = "calc(" + a + " * " + d.length + ")");
                            var p = "style_collection_" + t,
                                _ = m.getElementById(p);
                            isEmptyLadiPage(_) || _.parentElement.removeChild(_);
                            var g = "#" + t + " .ladi-collection-content {";
                            g += "width: " + n + ";", g += "left: " + i + ";", g += u, g += "}", g += c, r.createStyleElement(p, g)
                        }
                    }(t), n && u == r.const.COLLECTION_TYPE.readmore && function(t) {
                        var e = m.getElementById(t);
                        if (!isEmptyLadiPage(e)) {
                            var i = e.getElementsByClassName("ladi-collection-content")[0];
                            if (e.hasAttribute("data-max-page")) {
                                var a = i.querySelector(".ladi-collection-page.last"),
                                    n = a.getElementsByClassName("ladi-collection-item"),
                                    o = Math.ceil(n.length / f);
                                if (h == o) a.style.removeProperty("height");
                                else {
                                    var d = parseFloatLadiPage((parseFloatLadiPage(getComputedStyle(a).height) || 0) * o / h) || 0;
                                    d -= parseFloatLadiPage(v * (h - o) / h) || 0, a.style.setProperty("height", d + "px")
                                }
                            }
                            var l = parseFloatLadiPage(getComputedStyle(e).height) || 0,
                                s = i.scrollHeight;
                            if (l != s) {
                                e.style.setProperty("height", s + "px");
                                var c = r.findAncestor(e.parentElement, "ladi-element");
                                isEmptyLadiPage(c) && (c = r.findAncestor(e.parentElement, "ladi-section")), r.updateHeightElement(!0, e, c, l, s)
                            }
                        }
                    }(t), r.runEventScroll(), r.runResizeAll()
                }
            },
            L = _["option.product_tag_id"],
            b = _["option.data_setting.value"];
        (o.is_generate_template || isArrayLadiPage(L) || !isEmptyLadiPage(b)) && P(t, _)
    }
}, LadiPageScriptV2.prototype.getListProductByTagId = function(t, e, i, a, n) {
    var o = this,
        r = t["option.form_account_id"],
        d = t["option.product_type"],
        l = t["option.ladisale_store_id"] || null,
        s = t["option.product_tag_id"],
        c = t["option.data_setting.value"],
        u = t["option.data_setting.type_dataset"],
        p = t["option.collection_setting.type"],
        m = t["option.data_setting.sort_name"],
        _ = t["option.data_setting.sort_by"],
        g = null,
        y = null,
        h = null,
        f = null,
        v = null;
    if (isArrayLadiPage(s) && s.length > 0) {
        if (isEmptyLadiPage(o.runtime.tmp.product_tag_info[d]) && (o.runtime.tmp.product_tag_info[d] = {}), isEmptyLadiPage(o.runtime.tmp.timeout_product_tag_info[d]) && (o.runtime.tmp.timeout_product_tag_info[d] = {}), s.sort(), h = JSON.stringify(s) + "_page_" + i + "_limit_" + e, f = o.runtime.tmp.product_tag_info[d][h], -1 != [o.const.FORM_CONFIG_TYPE.ladisales, o.const.FORM_CONFIG_TYPE.sapo, o.const.FORM_CONFIG_TYPE.haravan, o.const.FORM_CONFIG_TYPE.shopify, o.const.FORM_CONFIG_TYPE.wordpress].indexOf(d)) {
            y = function() {
                var t = null;
                return isObjectLadiPage(f) && isArrayLadiPage(f.products) && (t = {
                    products: f.products,
                    total_record: f.total_record
                }, isEmptyLadiPage(o.runtime.tmp.product_info[d]) && (o.runtime.tmp.product_info[d] = {}), t.products.forEach(function(t) {
                    o.runtime.tmp.product_info[d][t.product_id] = {
                        store_info: f.store_info,
                        product: t
                    }
                })), t
            };
            var E = null;
            if (isStringLadiPage(f) && (E = f, f = null), isNullLadiPage(f)) {
                o.runtime.tmp.product_tag_info[d][h] = !0;
                var P = function() {
                        o.runtime.tmp.product_tag_info[d][h] = !1, isEmptyLadiPage(o.runtime.tmp.timeout_product_tag_info[d][h]) || (o.removeTimeout(o.runtime.tmp.timeout_product_tag_info[d][h]), delete o.runtime.tmp.timeout_product_tag_info[d][h])
                    },
                    L = function(t) {
                        if (f = t.data, isObjectLadiPage(f)) {
                            if (!isObjectLadiPage(f.store_info)) {
                                var a = o.runtime.currency;
                                o.runtime.isClient || (a = window.$rootScope.getStoreCurrency()), f.store_info = {
                                    currency: {
                                        code: a,
                                        symbol: o.formatCurrency(null, a, !1, !0)
                                    }
                                }
                            }
                            if (d != o.const.FORM_CONFIG_TYPE.ladisales && (f.store_info.id = -1), isObjectLadiPage(f.store_info.currency) && !isEmptyLadiPage(f.store_info.currency.code) && (f.store_info.currency.symbol = o.formatCurrency(null, f.store_info.currency.code, !1, !0)), isArrayLadiPage(f.products))
                                for (var r = null, l = function(t) {
                                        return t.option1 == r
                                    }, c = 0; c < f.products.length; c++)
                                    if (isArrayLadiPage(f.products[c].options) && isArrayLadiPage(f.products[c].variants)) {
                                        var u = f.products[c].options.map(function(t) {
                                            return t.product_option_id
                                        });
                                        if (u = u.join("/"), -1 != [o.const.FORM_CONFIG_TYPE.ladisales].indexOf(d) && 1 == f.products[c].options.length && isObjectLadiPage(f.products[c].options[0]) && isArrayLadiPage(f.products[c].options[0].values) && f.products[c].variants.length == f.products[c].options[0].values.length && (f.products[c].type == o.const.PRODUCT_TYPE.event || f.products[c].type == o.const.PRODUCT_TYPE.service)) {
                                            for (var p = [], v = 0; v < f.products[c].variants.length; v++)
                                                for (var E = 0; E < f.products[c].options[0].values.length; E++)
                                                    if (isObjectLadiPage(f.products[c].options[0].values[E]) && f.products[c].options[0].values[E].name == f.products[c].variants[v].option1) {
                                                        p.push(f.products[c].options[0].values[E]);
                                                        break
                                                    } f.products[c].options[0].values = p
                                        }
                                        for (var L = 0; L < f.products[c].variants.length; L++) - 1 != [o.const.FORM_CONFIG_TYPE.ladisales].indexOf(d) && 1 == f.products[c].variants[L].allow_sold_out && (f.products[c].variants[L].inventory_checked = 0), isNullLadiPage(f.products[c].variants[L].compare_price) && (f.products[c].variants[L].compare_price = f.products[c].variants[L].price_compare), isNullLadiPage(f.products[c].variants[L].variant_start_date) && (f.products[c].variants[L].variant_start_date = f.products[c].variants[L].start_date), isNullLadiPage(f.products[c].variants[L].variant_end_date) && (f.products[c].variants[L].variant_end_date = f.products[c].variants[L].end_date), isNullLadiPage(f.products[c].variants[L].variant_timezone) && (f.products[c].variants[L].variant_timezone = f.products[c].variants[L].timezone), isEmptyLadiPage(f.products[c].variants[L].option_ids) && (f.products[c].variants[L].option_ids = u), -1 != [o.const.FORM_CONFIG_TYPE.sapo, o.const.FORM_CONFIG_TYPE.haravan, o.const.FORM_CONFIG_TYPE.shopify].indexOf(d) && 1 == f.products[c].variants.length && "Default Title" == f.products[c].variants[L].title && (f.products[c].variants[L].title = null, f.products[c].variants[L].option1 = null, f.products[c].options = []), -1 != [o.const.FORM_CONFIG_TYPE.wordpress].indexOf(d) && 1 == f.products[c].variants.length && f.products[c].variants[L].title == f.products[c].variants[L].product_name && (f.products[c].variants[L].title = null, f.products[c].variants[L].option1 = null, f.products[c].options = []), isEmptyLadiPage(f.products[c].variants[L].package_quantity) || isEmptyLadiPage(f.products[c].variants[L].package_quantity_unit) || (isNullLadiPage(f.products[c].variants[L].title_old) && (f.products[c].variants[L].title_old = f.products[c].variants[L].title), f.products[c].variants[L].title = f.products[c].variants[L].title_old + " (" + f.products[c].variants[L].package_quantity + " " + f.products[c].variants[L].package_quantity_unit + ")");
                                        if (isArrayLadiPage(f.products[c].options) && 1 == f.products[c].options.length && isArrayLadiPage(f.products[c].options[0].values))
                                            for (var b = 0; b < f.products[c].options[0].values.length; b++) {
                                                r = f.products[c].options[0].values[b].name;
                                                var A = f.products[c].variants.find(l);
                                                f.products[c].options[0].values[b].name_new = f.products[c].options[0].values[b].label || f.products[c].options[0].values[b].name, isEmptyLadiPage(A) || isEmptyLadiPage(A.package_quantity) || isEmptyLadiPage(A.package_quantity_unit) || (f.products[c].options[0].values[b].name_new = f.products[c].options[0].values[b].name_new + " (" + A.package_quantity + " " + A.package_quantity_unit + ")")
                                            }
                                    } if (isStringLadiPage(f.page_next)) {
                                var T = JSON.stringify(s) + "_page_" + (i + 1) + "_limit_" + e;
                                o.runtime.tmp.product_tag_info[d][T] = f.page_next
                            }
                            o.runtime.tmp.product_tag_info[d][h] = (S = f, isEmptyLadiPage(m) || isEmptyLadiPage(_) || isObjectLadiPage(S) && isArrayLadiPage(S.products) && S.products.sort(function(t, e) {
                                return isArrayLadiPage(t.variants) && t.variants.length > 0 && isArrayLadiPage(e.variants) && e.variants.length > 0 && isObjectLadiPage(t.variants[0]) && t.variants[0].hasOwnProperty(m) && isObjectLadiPage(e.variants[0]) && e.variants[0].hasOwnProperty(m) ? _ == o.const.SORT_BY_TYPE.asc ? t.variants[0][m] - e.variants[0][m] : e.variants[0][m] - t.variants[0][m] : 0
                            }), S), g = y(), isFunctionLadiPage(n) && n(g)
                        } else P();
                        var S
                    },
                    b = {
                        product_tag_ids: s,
                        limit: e
                    };
                isEmptyLadiPage(p) ? b.type = "group" : b.paged = i, isEmptyLadiPage(m) || isEmptyLadiPage(_) || (b.sort = {}, b.sort[m] = _ == o.const.SORT_BY_TYPE.desc ? -1 : 1);
                var A = null,
                    T = "POST";
                return o.runLimitRequest(20, function() {
                    if (o.runtime.isClient) {
                        var a = "",
                            n = o.const.API_LADISALE_COLLECTION_PRODUCT;
                        d == o.const.FORM_CONFIG_TYPE.ladisales ? (a = JSON.stringify([b.product_tag_ids, b.limit, b.type, b.paged, l, d]), (A = {
                            "Content-Type": "application/json"
                        })["Store-Id"] = l, b = JSON.stringify(b)) : d == o.const.FORM_CONFIG_TYPE.wordpress ? (T = "GET", n = window.location.origin + "/ladipage/api?action=product_list&category_ids=" + s.join("|") + "&page=" + i + "&limit=" + e, b = null) : (A = {
                            "Content-Type": "application/json"
                        }, n = o.const.API_COLLECTION_PRODUCT, b = {
                            form_account_id: r,
                            tags: s,
                            limit: e
                        }, isEmptyLadiPage(E) ? b.page = i : b.page_info = E, a = JSON.stringify([b.form_account_id, b.tags, b.limit, b.page_info, b.page, d]), b = JSON.stringify(b)), !isEmptyLadiPage(a) && isObjectLadiPage(o.runtime.tmp.product_data_website) && isObjectLadiPage(o.runtime.tmp.product_data_website[a]) ? L({
                            data: o.runtime.tmp.product_data_website[a]
                        }) : o.sendRequest(T, n, b, !0, A, function(t, e, i) {
                            if (i.readyState == XMLHttpRequest.DONE) try {
                                var a = JSON.parse(t);
                                L(a)
                            } catch (t) {
                                P()
                            }
                        })
                    } else {
                        var c = function(t) {
                                if (isArrayLadiPage(t) && t.length > 1) {
                                    var e = {
                                        products: []
                                    };
                                    t.forEach(function(t) {
                                        if (isNullLadiPage(t.product) && !isNullLadiPage(t.store_info) && !isNullLadiPage(t.total_record)) return e.store_info = t.store_info, void(e.total_record = t.total_record);
                                        isNullLadiPage(t.product) || e.products.push(t.product)
                                    }), L({
                                        data: e
                                    })
                                }
                            },
                            u = LadiPage.mapping_attribute_option_product_id(t.element, "", !1, s, e, i, !0, function(t) {
                                c(t)
                            });
                        c(u)
                    }
                }), g
            }
        }
    } else isEmptyLadiPage(c) || (y = function() {
        var t = null;
        if (isArrayLadiPage(v)) {
            var a = o.copy(v);
            t = {
                products: a = a.splice((i - 1) * e, e),
                total_record: v.length
            }, isEmptyLadiPage(o.runtime.tmp.product_info[d]) && (o.runtime.tmp.product_info[d] = {}), v.forEach(function(t) {
                o.runtime.tmp.product_info[d][t.id] = {
                    store_info: {},
                    product: t
                }
            })
        }
        return t
    }, v = o.loadDataset(c, c, u, m, _, !0, o.runtime.isClient, function(t) {
        v = t, g = y(), isFunctionLadiPage(n) && n(g)
    }));
    return isFunctionLadiPage(y) && (!0 === f ? o.runtime.tmp.timeout_product_tag_info[d][h] = o.runTimeout(function() {
        o.getListProductByTagId(t, e, i, !1, n)
    }, 100) : (g = y(), !a && isFunctionLadiPage(n) && n(g))), g
}, LadiPageScriptV2.prototype.getListLadiSalesProductByIds = function(t, e) {
    var i = this,
        a = JSON.stringify(t);
    isObjectLadiPage(i.runtime.tmp.list_product_ladisales_by_ids) || (i.runtime.tmp.list_product_ladisales_by_ids = {});
    var n = i.runtime.tmp.list_product_ladisales_by_ids[a];
    if (isArrayLadiPage(n)) return i.copy(n);
    if (!0 !== n) {
        var o = i.const.API_LADISALE_PRODUCT_SHOW_LIST,
            r = {
                product_variants_ids: t,
                ladi_uid: $rootScope.store.ladi_uid
            };
        i.runtime.tmp.list_product_ladisales_by_ids[a] = !0;
        var d = {
            "Content-Type": "application/json"
        };
        i.runLimitRequest(20, function() {
            i.sendRequest("POST", o, JSON.stringify(r), !0, d, function(o, r, d) {
                if (d.readyState == XMLHttpRequest.DONE) {
                    try {
                        var l = JSON.parse(o);
                        n = 200 == l.code ? l.data : []
                    } catch (t) {}
                    isFunctionLadiPage(e) && e(n), i.runtime.tmp.list_product_ladisales_by_ids[a] = n, i.getListLadiSalesProductByIds(t, e)
                }
            })
        })
    } else i.runTimeout(function() {
        i.getListLadiSalesProductByIds(t, e)
    }, 100)
}, LadiPageScriptV2.prototype.changeTotalPriceCart = function(t) {
    var e = 0,
        i = 0;
    this.runtime.tmp.cart.forEach(function(t) {
        i += t.quantity, isObjectLadiPage(t.promotion) ? e += t.promotion.total : e += t.price * t.quantity
    }), e = e < 0 ? 0 : e;
    var a = this.runtime.tmp.add_to_cart_fee_shipping || 0,
        n = this.runtime.tmp.add_to_cart_discount || 0,
        o = e + a - n;
    if (o = o < 0 ? 0 : o, t) return {
        cart_price: e,
        cart_checkout_price: o,
        cart_fee_shipping: a,
        cart_discount: n,
        total_quantity: i
    };
    var r = this.formatNumber(e, 3),
        d = this.formatNumber(o, 3),
        l = this.formatNumber(a, 3),
        s = this.formatNumber(n, 3);
    if (this.runtime.tmp.cart.length > 0 && !isEmptyLadiPage(this.runtime.tmp.cart[0].currency) && !isEmptyLadiPage(this.runtime.tmp.cart[0].currency.symbol)) {
        var c = this.runtime.tmp.cart[0].currency.symbol;
        r = this.formatCurrency(e, c, !0), d = this.formatCurrency(o, c, !0), l = this.formatCurrency(a, c, !0), s = this.formatCurrency(n, c, !0)
    }
    this.setDataReplaceStr("cart_price", r), this.setDataReplaceStr("cart_checkout_price", d), this.setDataReplaceStr("cart_fee_shipping", l), this.setDataReplaceStr("cart_discount", s), this.setDataReplaceStr("cart_quantity", i), this.setDataReplaceElement(!1)
}, LadiPageScriptV2.prototype.runAnimationDoc = function(t, e, i) {
    var a = this;
    if (!isEmptyLadiPage(t)) {
        if (isEmptyLadiPage(e) && !isEmptyLadiPage(t.id) && (e = a.runtime.eventData[t.id]), isNullLadiPage(i.is_child) && (i.is_child = !1), isNullLadiPage(i.run_timeout) && (i.run_timeout = !0), "carousel" == i.element_type) {
            var n = a.findAncestor(t, "ladi-carousel");
            if (n = isEmptyLadiPage(n) ? t : a.findAncestor(n, "ladi-element"), i.is_child && !isEmptyLadiPage(n) && i.run_timeout) {
                var o = n.getElementsByClassName("ladi-carousel-content")[0],
                    r = a.runtime.eventData[n.id],
                    d = null,
                    l = null,
                    s = getComputedStyle(o).transitionProperty.split(",");
                s = s.removeSpace();
                var c = getComputedStyle(o).transitionDuration.split(",");
                c = c.removeSpace();
                var u = {};
                return s.forEach(function(t, e) {
                    u[t] = 1e3 * (parseFloatLadiPage(c[e]) || 0)
                }), void(isEmptyLadiPage(r) || r[a.runtime.device + ".option.carousel_setting.display_type"] != a.const.CAROUSEL_DISPLAY_TYPE.vertical ? a.runTimeout(function() {
                    d = a.getElementBoundingClientRect(t), l = a.getElementBoundingClientRect(n), (d.x >= l.x && d.x <= l.x + l.width || d.x + d.width >= l.x && d.x + d.width <= l.x + l.width) && (i.run_timeout = !1, a.runAnimationDoc(t, e, i))
                }, u.left + 100) : a.runTimeout(function() {
                    d = a.getElementBoundingClientRect(t), l = a.getElementBoundingClientRect(n), (d.y >= l.y && d.y <= l.y + l.height || d.y + d.width >= l.y && d.y + d.width <= l.y + l.height) && (i.run_timeout = !1, a.runAnimationDoc(t, e, i))
                }, u.top + 100))
            }
        } else t.classList.contains("ladi-animation") && t.classList.add("ladi-animation-hidden");
        if (t.classList.contains("ladi-animation-hidden")) {
            var p = isObjectLadiPage(e) && parseFloatLadiPage(e[a.runtime.device + ".style.animation-delay"]) || 0;
            t.classList.add("ladi-animation"), a.runTimeout(function() {
                t.classList.remove("ladi-animation-hidden")
            }, 1e3 * p)
        }
        if (i.is_multiple) {
            var m = [];
            m = "carousel" == i.element_type ? t.querySelectorAll(".ladi-carousel .ladi-animation, .ladi-animation-hidden") : t.querySelectorAll(".ladi-animation, .ladi-animation-hidden"), i.is_child = !0;
            for (var _ = 0; _ < m.length; _++) a.runAnimationDoc(m[_], null, i)
        }
    }
}, LadiPageScriptV2.prototype.removeSticky = function() {
    var t = this;
    t instanceof LadiPageScriptV2 || (t = LadiPageScript);
    for (var e = document.querySelectorAll('[data-sticky="true"]'), i = 0; i < e.length; i++) e[i].removeAttribute("data-top"), e[i].removeAttribute("data-left"), e[i].style.removeProperty("top"), e[i].style.removeProperty("left"), e[i].style.removeProperty("width"), e[i].style.removeProperty("position"), e[i].style.removeProperty("z-index");
    t.runEventScroll()
}, LadiPageScriptV2.prototype.runEventBackdropPopupClick = function(t) {
    t.stopPropagation();
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript);
    for (var i = null, a = document.querySelectorAll('[data-popup-backdrop="true"]'), n = 0; n < a.length; n++) "none" != getComputedStyle(a[n]).display && (i = a[n].id);
    if (!isEmptyLadiPage(i)) {
        var o = document.querySelector("#" + i + " .popup-close");
        if (!isEmptyLadiPage(o) && "none" == getComputedStyle(o).display) return
    }
    e.runtime.tmp["popup_closing_" + i] = !0, e.runRemovePopup(i, e.runtime.isClient), e.runTimeout(function() {
        delete e.runtime.tmp["popup_closing_" + i]
    }, 500)
}, LadiPageScriptV2.prototype.runEventBackdropDropboxClick = function(t) {
    t.stopPropagation();
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript);
    for (var i = document.querySelectorAll('[data-dropbox-backdrop="true"]'), a = 0; a < i.length; a++) window.ladi(i[a].id).hide();
    document.getElementById(e.runtime.backdrop_dropbox_id).style.removeProperty("display")
}, LadiPageScriptV2.prototype.runEventMouseDown = function(t) {
    t.stopPropagation();
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), delete e.runtime.tmp.is_grab, document.body.classList.remove("grab")
}, LadiPageScriptV2.prototype.runEventMouseMove = function(t) {
    t.stopPropagation();
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), t = e.getEventCursorData(t);
    var i = null,
        a = 0,
        n = 0,
        o = 0,
        r = 0,
        d = 0,
        l = null,
        s = 0;
    if (!isEmptyLadiPage(e.runtime.current_element_mouse_down_image_compare)) {
        i = document.getElementById(e.runtime.current_element_mouse_down_image_compare), a = t.pageX - e.runtime.current_element_mouse_down_image_compare_position_x;
        var c = i.getElementsByClassName("ladi-image-compare")[0],
            u = i.getElementsByClassName("ladi-image-compare-line")[0],
            p = parseFloatLadiPage(c.getAttribute("data-width")) || 0,
            m = parseFloatLadiPage(c.getAttribute("data-max-width")) || 0;
        p = (p = (p += a) < 0 ? 0 : p) > m ? m : p, c.style.setProperty("width", p + "px"), u.style.setProperty("left", "calc(" + p + "px - " + u.clientWidth + "px / 2 - 3px / 2)")
    }
    return isEmptyLadiPage(e.runtime.current_element_mouse_down_carousel) || (i = document.getElementById(e.runtime.current_element_mouse_down_carousel), l = e.runtime.eventData[i.id], isObjectLadiPage(l) && isEmptyLadiPage(l["option.meta_data.version"]) && (((a = t.pageX - e.runtime.current_element_mouse_down_carousel_position_x) >= e.runtime.mouse_down_diff_touch_action || -1 * a >= e.runtime.mouse_down_diff_touch_action) && (e.runtime.tmp.is_grab = !0), n = parseFloatLadiPage(i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-left")) || 0, (n += a) < (r = -((parseFloatLadiPage(e.runtime.eventData[e.runtime.current_element_mouse_down_carousel][e.runtime.device + ".option.carousel_crop.width"]) || 0) - i.clientWidth)) && (n = r), n > 0 && (n = 0), a >= e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-left")[0].click()) : a <= -e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-right")[0].click()) : i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("left", n + "px")), isObjectLadiPage(l) && l["option.meta_data.version"] == e.const.META_VERSION.two && (l[e.runtime.device + ".option.carousel_setting.display_type"] == e.const.CAROUSEL_DISPLAY_TYPE.horizontal && (((a = t.pageX - e.runtime.current_element_mouse_down_carousel_position_x) >= e.runtime.mouse_down_diff_touch_action || -1 * a >= e.runtime.mouse_down_diff_touch_action) && (e.runtime.tmp.is_grab = !0), n = parseFloatLadiPage(i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-left")) || 0, (n += a) < (r = -((parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-carousel-content")[0]).width) || 0) - i.clientWidth)) && (n = r), n > 0 && (n = 0), a >= e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-left")[0].click()) : a <= -e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-right")[0].click()) : i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("left", n + "px")), l[e.runtime.device + ".option.carousel_setting.display_type"] == e.const.CAROUSEL_DISPLAY_TYPE.vertical && (((a = t.pageY - e.runtime.current_element_mouse_down_carousel_position_y) >= e.runtime.mouse_down_diff_touch_action || -1 * a >= e.runtime.mouse_down_diff_touch_action) && (e.runtime.tmp.is_grab = !0), o = parseFloatLadiPage(i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-top")) || 0, (o += a) < (d = -((parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-carousel-content")[0]).height) || 0) - i.clientHeight)) && (o = d), o > 0 && (o = 0), a >= e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-left")[0].click()) : a <= -e.runtime.current_element_mouse_down_carousel_diff ? (delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, i.getElementsByClassName("ladi-carousel-arrow-right")[0].click()) : i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("top", o + "px")))), isEmptyLadiPage(e.runtime.current_element_mouse_down_gallery_view) || (i = document.querySelector('[data-runtime-id="' + e.runtime.current_element_mouse_down_gallery_view + '"]'), ((a = t.pageX - e.runtime.current_element_mouse_down_gallery_view_position_x) >= e.runtime.mouse_down_diff_touch_action || -1 * a >= e.runtime.mouse_down_diff_touch_action) && (e.runtime.tmp.is_grab = !0), (s = parseFloatLadiPage(i.getAttribute("data-current")) || 0) == (parseFloatLadiPage(i.getAttribute("data-max-item")) || 0) - 1 && a < 0 && (a = 0), a > 0 && 0 == s && (a = 0), a >= e.runtime.current_element_mouse_down_gallery_view_diff ? (e.runtime.current_element_mouse_down_gallery_view = null, e.runtime.current_element_mouse_down_gallery_view_position_x = 0, e.runtime.current_element_mouse_down_gallery_view_position_y = 0, i.getElementsByClassName("ladi-gallery-view-arrow-left")[0].click()) : a <= -e.runtime.current_element_mouse_down_gallery_view_diff ? (e.runtime.current_element_mouse_down_gallery_view = null, e.runtime.current_element_mouse_down_gallery_view_position_x = 0, e.runtime.current_element_mouse_down_gallery_view_position_y = 0, i.getElementsByClassName("ladi-gallery-view-arrow-right")[0].click()) : i.querySelectorAll(".ladi-gallery-view-item.selected").length > 0 && i.querySelectorAll(".ladi-gallery-view-item.selected")[0].style.setProperty("left", a + "px")), isEmptyLadiPage(e.runtime.current_element_mouse_down_gallery_control) || (i = document.querySelector('[data-runtime-id="' + e.runtime.current_element_mouse_down_gallery_control + '"]'), ((a = t.pageX - e.runtime.current_element_mouse_down_gallery_control_position_x) >= e.runtime.mouse_down_diff_touch_action || -1 * a >= e.runtime.mouse_down_diff_touch_action) && (e.runtime.tmp.is_grab = !0), n = parseFloatLadiPage(i.getElementsByClassName("ladi-gallery-control-box")[0].getAttribute("data-left")) || 0, (n += a) < (r = (parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control")[0]).width) || 0) - (parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0)) && (n = r), n > 0 && (n = 0), i.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("left", n + "px")), e.runtime.isDesktop || e.runtime.isBrowserDesktop || document.body.classList.add("grab"), !e.runtime.tmp.is_grab || (t.preventDefault(), !1)
}, LadiPageScriptV2.prototype.runEventMouseUp = function(t) {
    t.stopPropagation();
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript), t = e.getEventCursorData(t);
    var i = null,
        a = null;
    if (delete e.runtime.tmp.is_grab, document.body.classList.remove("grab"), isEmptyLadiPage(e.runtime.current_element_mouse_down_carousel) || (i = document.getElementById(e.runtime.current_element_mouse_down_carousel), a = e.runtime.eventData[i.id], isObjectLadiPage(a) && isEmptyLadiPage(a["option.meta_data.version"]) && i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("left", i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-left")), isObjectLadiPage(a) && a["option.meta_data.version"] == e.const.META_VERSION.two && (a[e.runtime.device + ".option.carousel_setting.display_type"] == e.const.CAROUSEL_DISPLAY_TYPE.horizontal && i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("left", i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-left")), a[e.runtime.device + ".option.carousel_setting.display_type"] == e.const.CAROUSEL_DISPLAY_TYPE.vertical && i.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("top", i.getElementsByClassName("ladi-carousel-content")[0].getAttribute("data-top")))), isEmptyLadiPage(e.runtime.current_element_mouse_down_gallery_view) || (i = document.querySelector('[data-runtime-id="' + e.runtime.current_element_mouse_down_gallery_view + '"]')).querySelectorAll(".ladi-gallery-view-item.selected").length > 0 && i.querySelectorAll(".ladi-gallery-view-item.selected")[0].style.removeProperty("left"), !isEmptyLadiPage(e.runtime.current_element_mouse_down_gallery_control))
        if ((i = document.querySelector('[data-runtime-id="' + e.runtime.current_element_mouse_down_gallery_control + '"]')).getElementsByClassName("ladi-gallery-control-box")[0].removeAttribute("data-left"), i.getElementsByClassName("ladi-gallery-control-box")[0].style.removeProperty("transition-duration"), i.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.remove("opacity-0"), i.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.remove("opacity-0"), i.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-top") || i.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-bottom")) {
            var n = parseFloatLadiPage(i.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("left")) || 0,
                o = parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0;
            o = (o = -(o -= parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control")[0]).width) || 0)) > 0 ? 0 : o, n > 0 && (n = 0), n >= 0 && i.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), n <= o && i.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
        } else {
            var r = parseFloatLadiPage(i.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("top")) || 0,
                d = parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control-box")[0]).height) || 0;
            d = (d = -(d -= parseFloatLadiPage(getComputedStyle(i.getElementsByClassName("ladi-gallery-control")[0]).height) || 0)) > 0 ? 0 : d, r > 0 && (r = 0), r >= 0 && i.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), r <= d && i.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
        } e.runtime.current_element_mouse_down_image_compare = null, e.runtime.current_element_mouse_down_image_compare_position_x = 0, delete e.runtime.timenext_carousel[e.runtime.current_element_mouse_down_carousel], e.runtime.current_element_mouse_down_carousel = null, e.runtime.current_element_mouse_down_carousel_position_x = 0, e.runtime.current_element_mouse_down_carousel_position_y = 0, e.runtime.current_element_mouse_down_gallery_view = null, e.runtime.current_element_mouse_down_gallery_view_position_x = 0, e.runtime.current_element_mouse_down_gallery_view_position_y = 0;
    var l = 0;
    e.runtime.current_element_mouse_down_gallery_control_time + e.runtime.current_element_mouse_down_gallery_control_time_click < Date.now() && (l = 5), e.runTimeout(function() {
        e.runtime.current_element_mouse_down_gallery_control = null, e.runtime.current_element_mouse_down_gallery_control_time = 0, e.runtime.current_element_mouse_down_gallery_control_position_x = 0
    }, l)
}, LadiPageScriptV2.prototype.runEventMouseLeave = function(t) {
    var e = this;
    e instanceof LadiPageScriptV2 || (e = LadiPageScript);
    var i = !1;
    Object.keys(e.runtime.eventData).forEach(function(t) {
        var a = e.runtime.eventData[t];
        if ("popup" == a.type && a["option.show_popup_exit_page"]) {
            if (isObjectLadiPage(e.runtime.tmp.popup_leave_show) || (e.runtime.tmp.popup_leave_show = {}), e.runtime.tmp.popup_leave_show[t]) return;
            if (a[e.runtime.device + ".option.popup_position"] == e.const.POSITION_TYPE.default) {
                if (i) return void(e.runtime.tmp.popup_leave_show[t] = !0);
                i = !0
            }
            e.runtime.tmp.popup_leave_show[t] = !0, window.ladi(t).show()
        }
    })
}, LadiPageScriptV2.prototype.runActionPopupHide = function(t) {
    var e = this;
    isObjectLadiPage(e.runtime.tmp.timeout_run_popup_hide) || (e.runtime.tmp.timeout_run_popup_hide = {}), e.removeTimeout(e.runtime.tmp.timeout_run_popup_hide[t]), e.runtime.tmp.timeout_run_popup_hide[t] = e.runTimeout(function() {
        var i = e.runtime.eventData[t];
        if (!isEmptyLadiPage(i) && isArrayLadiPage(i["option.data_event"])) {
            var a = document.getElementById(t);
            isEmptyLadiPage(a) || e.runtime.tmp.runDataEventNow(a, i["option.data_event"], {
                action_type: e.const.ACTION_TYPE.close_popup
            })
        }
    }, 100)
}, LadiPageScriptV2.prototype.runActionPopupShow = function(t) {
    var e = this.runtime.eventData[t];
    if (!isEmptyLadiPage(e) && isArrayLadiPage(e["option.data_event"])) {
        var i = document.getElementById(t);
        isEmptyLadiPage(i) || this.runtime.tmp.runDataEventNow(i, e["option.data_event"], {
            action_type: this.const.ACTION_TYPE.open_popup
        })
    }
}, LadiPageScriptV2.prototype.runEventScroll = function(t) {
    var e = this;
    if (e instanceof LadiPageScriptV2 || (e = LadiPageScript), e.runtime.isRun) {
        if (!isEmptyLadiPage(t) && !e.runtime.tmp.isRunScrollEvent) {
            for (var i = document.getElementsByClassName("ladi-lazyload"); i.length > 0;) i[0].classList.remove("ladi-lazyload");
            e.runtime.tmp.isRunScrollEvent = !0
        }
        if (!isEmptyLadiPage(e.runtime.eventData) && !e.runtime.tmp.is_run_show_popup) {
            for (var a = null, n = document.querySelectorAll('[data-popup-backdrop="true"]'), o = 0; o < n.length; o++) "none" != getComputedStyle(n[o]).display && (a = n[o].id);
            var r = [];
            if (!isEmptyLadiPage(a))
                for (var d = document.querySelectorAll("#" + a + " .ladi-element"), l = 0; l < d.length; l++) r.push(d[l].id);
            if (Object.keys(e.runtime.eventData).forEach(function(t) {
                    var i = e.runtime.eventData[t],
                        n = null,
                        o = null,
                        d = null,
                        l = Object.keys(e.runtime.list_scroll_func),
                        s = [];
                    s = "gallery" == i.type ? document.querySelectorAll("#" + t) : [d = document.getElementById(t)];
                    for (var c = 0; c < s.length; c++)
                        if (d = s[c], !isEmptyLadiPage(d)) {
                            var u = "gallery" == i.type ? d.getAttribute("data-runtime-id") : d.getAttribute("id");
                            if (-1 != l.indexOf(u)) {
                                var p = !1;
                                "section" == i.type ? (n = d.offsetTop, (window.scrollY >= n && window.scrollY <= n + d.offsetHeight || window.scrollY + e.getHeightDevice() >= n && window.scrollY + e.getHeightDevice() <= n + d.offsetHeight || n >= window.scrollY && window.scrollY + e.getHeightDevice() >= n) && (p = !0)) : (n = e.getElementBoundingClientRect(d).y + window.scrollY, (window.scrollY >= n && window.scrollY <= n + d.offsetHeight || window.scrollY + e.getHeightDevice(!0) >= n && window.scrollY + e.getHeightDevice(!0) <= n + d.offsetHeight || n >= window.scrollY && window.scrollY + e.getHeightDevice(!0) >= n) && (p = !0)), p && (o = e.runtime.list_scroll_func[u], delete e.runtime.list_scroll_func[u], o())
                            }
                        } var m = i[e.runtime.device + ".style.animation-name"];
                    if (!isEmptyLadiPage(m) && (d = document.getElementById(t), !isEmptyLadiPage(d) && !d.classList.contains("ladi-animation"))) {
                        var _ = e.findAncestor(d, "ladi-popup"),
                            g = parseFloatLadiPage(i[e.runtime.device + ".style.animation-delay"]) || 0;
                        n = e.getElementBoundingClientRect(d).y + window.scrollY;
                        var y = window.scrollY >= n && window.scrollY <= n + d.offsetHeight || window.scrollY + e.getHeightDevice(!0) >= n && window.scrollY + e.getHeightDevice(!0) <= n + d.offsetHeight || n >= window.scrollY && window.scrollY + e.getHeightDevice(!0) >= n;
                        if (e.runtime.tmp.isFirstScroll && g > 0 && d.classList.add("ladi-animation-hidden"), y)
                            if (isEmptyLadiPage(_)) {
                                var h = e.findAncestor(d, "ladi-carousel");
                                isEmptyLadiPage(h) ? (d.classList.add("ladi-animation"), e.runTimeout(function() {
                                    d.classList.remove("ladi-animation-hidden")
                                }, 1e3 * g)) : (d.classList.add("ladi-animation-hidden"), h = e.findAncestor(h, "ladi-element"), e.runAnimationDoc(h, null, {
                                    is_multiple: !0,
                                    element_type: "carousel"
                                }))
                            } else d.classList.add("ladi-animation-hidden")
                    }
                    if (isEmptyLadiPage(a) || -1 != r.indexOf(t)) {
                        var f = null,
                            v = null,
                            E = null;
                        if (i[e.runtime.device + ".option.sticky"] && (f = i[e.runtime.device + ".option.sticky_position"], v = parseFloatLadiPage(i[e.runtime.device + ".option.sticky_position_top"]), E = parseFloatLadiPage(i[e.runtime.device + ".option.sticky_position_bottom"])), !e.runtime.has_popupx && !isEmptyLadiPage(f)) {
                            var P = document.getElementById(t);
                            if (!isEmptyLadiPage(P) && P.clientWidth > 0 && P.clientHeight > 0 && -1 != ["default", "top", "bottom"].indexOf(f)) {
                                var L = e.getElementBoundingClientRect(P),
                                    b = P.getAttribute("data-top"),
                                    A = P.getAttribute("data-left");
                                isEmptyLadiPage(b) ? (P.setAttribute("data-top", L.y + window.scrollY), b = L.y) : b = parseFloatLadiPage(b), isEmptyLadiPage(A) ? (P.setAttribute("data-left", L.x + window.scrollX), A = L.x) : A = parseFloatLadiPage(A);
                                var T = null,
                                    S = null,
                                    w = e.getHeightDevice(),
                                    O = document.getElementsByClassName("ladi-wraper")[0],
                                    C = 0,
                                    k = 0,
                                    I = 0,
                                    N = 0;
                                if ("default" == f && (v >= b - window.scrollY ? (T = v + "px", S = A + "px", v <= 0 && (C = P.clientHeight), I = P.clientHeight) : w - E - P.clientHeight <= b - window.scrollY && (T = "calc(100% - " + (E + P.clientHeight) + "px)", S = A + "px", E <= 0 && (k = P.clientHeight), N = P.clientHeight)), "top" == f && (v >= b - window.scrollY || w - 0 < b - window.scrollY) && (T = v + "px", S = A + "px", v <= 0 && (C = P.clientHeight), I = P.clientHeight), "bottom" == f && (w - E - P.clientHeight <= b - window.scrollY || 0 > b + P.clientHeight - window.scrollY) && (T = "calc(100% - " + (E + P.clientHeight) + "px)", S = A + "px", E <= 0 && (k = P.clientHeight), N = P.clientHeight), isEmptyLadiPage(T) || isEmptyLadiPage(S)) P.style.removeProperty("top"), P.style.removeProperty("left"), P.style.removeProperty("width"), P.style.removeProperty("position"), P.style.removeProperty("z-index"), O.getAttribute("data-padding-top-id") == t && (O.removeAttribute("data-padding-top-id"), O.style.removeProperty("padding-top")), O.getAttribute("data-padding-bottom-id") == t && (O.removeAttribute("data-padding-bottom-id"), O.style.removeProperty("padding-bottom"));
                                else if ("section" == i.type && (e.runtime.is_mobile_only ? P.style.setProperty("width", O.clientWidth + "px") : e.runtime.isDesktop && P.style.setProperty("width", "100%"), C > 0 && (O.setAttribute("data-padding-top-id", t), O.style.setProperty("padding-top", C + "px")), k > 0 && (O.setAttribute("data-padding-bottom-id", t), O.style.setProperty("padding-bottom", k + "px")), I > 0 && O.setAttribute("data-scroll-padding-top", I), N > 0 && O.setAttribute("data-scroll-padding-bottom", N)), P.style.setProperty("top", T), P.style.setProperty("left", S), P.style.setProperty("position", "fixed"), P.style.setProperty("z-index", "90000050"), !P.hasAttribute("data-sticky")) {
                                    P.setAttribute("data-sticky", !0);
                                    var D = parseFloatLadiPage(i[e.runtime.device + ".style.animation-delay"]) || 0;
                                    P.classList.contains("ladi-animation") && (D = 0), e.runTimeout(function() {
                                        P.classList.contains("ladi-animation-hidden") && (P.classList.remove("ladi-animation-hidden"), P.classList.add("ladi-animation"));
                                        for (var t = P.getElementsByClassName("ladi-animation-hidden"); t.length > 0;) t[0].classList.add("ladi-animation"), t[0].classList.remove("ladi-animation-hidden");
                                        P.classList.remove("ladi-lazyload");
                                        for (var e = P.getElementsByClassName("ladi-lazyload"); e.length > 0;) e[0].classList.remove("ladi-lazyload")
                                    }, 1e3 * D)
                                }
                            }
                        }
                    }
                    if ("popup" == i.type) {
                        if (!isEmptyLadiPage(e.runtime.scroll_show_popup[t])) return;
                        isEmptyLadiPage(i["option.popup_welcome_page_scroll_to"]) || (d = document.getElementById(i["option.popup_welcome_page_scroll_to"]), !isEmptyLadiPage(d) && d.offsetHeight > 0 && (n = d.offsetTop, (window.scrollY >= n && window.scrollY <= n + d.offsetHeight || window.scrollY + e.getHeightDevice() >= n && window.scrollY + e.getHeightDevice() <= n + d.offsetHeight || n >= window.scrollY && window.scrollY + e.getHeightDevice() >= n) && (e.runtime.scroll_show_popup[t] = !0, window.ladi(t).show())))
                    }
                    if ("section" == i.type) {
                        if (!isEmptyLadiPage(e.runtime.scroll_to_section[t])) return;
                        d = document.getElementById(t), !isEmptyLadiPage(d) && d.offsetHeight > 0 && (n = d.offsetTop, (window.scrollY >= n && window.scrollY <= n + d.offsetHeight || window.scrollY + e.getHeightDevice() >= n && window.scrollY + e.getHeightDevice() <= n + d.offsetHeight || n >= window.scrollY && window.scrollY + e.getHeightDevice() >= n) && (e.runtime.scroll_to_section[t] = !0, e.runEventTracking(t, {
                            is_form: !1
                        })))
                    }
                }), e.runtime.isClient && document.body.clientHeight > 0) {
                var s = Math.round((window.scrollY + e.getHeightDevice()) / document.body.clientHeight * 100);
                s = s > 100 ? 100 : s;
                var c = function(t) {
                        var i = function(t) {
                                if (t || isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api.tiktok) && isArrayLadiPage(window.ladi_conversion_api.tiktok.pixels)) return {
                                    event_id: "ladi." + Date.now() + "." + (Math.floor(9e10 * Math.random()) + 1e10)
                                };
                                return {}
                            }(e.runtime.is_popupx),
                            a = null;
                        e.runtime.is_popupx ? e.runLadiPageCommand(function(n) {
                            if ("ViewContent" == n.name && t >= n.scrollPercent) return a = [{
                                name: n.name,
                                custom_data: {},
                                data: i
                            }], e.runtime.tmp.runActionPopupX({
                                conversion_name: n.name,
                                ttq_data: {},
                                ttq_event_data: i,
                                action: {
                                    type: "run_tracking_ttq"
                                }
                            }), e.runtime.tmp.runActionPopupX({
                                type: "tiktok",
                                key: "events",
                                keyData: a,
                                action: {
                                    type: "run_conversion_api"
                                }
                            }), !0
                        }) : LadiPageQueueCommand.push(function() {
                            return !isNullLadiPage(window.ttq)
                        }, function() {
                            e.runLadiPageCommand(function(n) {
                                if ("ViewContent" == n.name && t >= n.scrollPercent) return a = [{
                                    name: n.name,
                                    custom_data: {},
                                    data: i
                                }], window.ttq.track(n.name, {}, i), e.runConversionApi("tiktok", "events", a), !0
                            })
                        })
                    },
                    u = function(t) {
                        LadiPageQueueCommand.push(function() {
                            return isFunctionLadiPage(window.fbq)
                        }, function() {
                            fbqCustom("trackCustom", "ScrollDepth_" + t + "_percent")
                        })
                    },
                    p = function(t) {
                        LadiPageQueueCommand.push(function() {
                            return isFunctionLadiPage(window.gtag)
                        }, function() {
                            window.gtag("event", "ScrollDepth_" + t + "_percent", {
                                event_category: "LadiPageScrollDepth",
                                event_label: window.location.host + window.location.pathname,
                                non_interaction: !0
                            })
                        })
                    };
                if (!e.runtime.is_popupx)
                    for (var m = 1; m < e.const.PERCENT_TRACKING_SCROLL.length; m++) {
                        var _ = e.const.PERCENT_TRACKING_SCROLL[m];
                        s > e.const.PERCENT_TRACKING_SCROLL[m - 1] && s <= _ && -1 == e.runtime.scroll_depth.indexOf(_) && (e.runtime.scroll_depth.push(_), u(_), p(_), c(s))
                    }
            }
            if (e.runtime.tmp.isFirstScroll = !1, !isEmptyLadiPage(t)) {
                var g = 0,
                    y = Object.values(e.runtime.list_scrolling_exec);
                if (isEmptyLadiPage(e.runtime.tmp.timeout_scrolling_id))
                    for (g = 0; g < y.length; g++) y[g]();
                e.removeTimeout(e.runtime.tmp.timeout_scrolling_id), e.runtime.tmp.timeout_scrolling_id = e.runTimeout(function() {
                    for (delete e.runtime.tmp.timeout_scrolling_id, y = Object.values(e.runtime.list_scrolled_exec), g = 0; g < y.length; g++) y[g]()
                }, 1e3)
            }
        }
    } else e.runTimeout(function() {
        e.runEventScroll(t)
    }, 100)
}, LadiPageScriptV2.prototype.runRemovePopup = function(t, e, i, a, n) {
    var o = this,
        r = document.querySelectorAll("#" + this.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"),
        d = !1,
        l = !1;
    e || (LadiPagePlugin.getPlugin("popup").removeStyleShowPopupBuilder(), LadiPagePlugin.getPlugin("popup").removeStyleShowPopupBuilderScroll());
    var s = function() {
            if (!o.runtime.tmp.is_resize_all && !o.runtime.tmp.is_wait_popup) {
                var t = document.getElementById("style_popup");
                isEmptyLadiPage(t) || t.parentElement.removeChild(t)
            }
        },
        c = [],
        u = 0;
    if (isEmptyLadiPage(t))
        for (u = 0; u < r.length; u++) c.push(r[u].id);
    else c.push(t);
    if (c.forEach(function(t) {
            var i = document.getElementById(t);
            if (!isEmptyLadiPage(i)) {
                o.runtime.has_popupx && ("none" != getComputedStyle(i).display && (l = !0), document.body.style.removeProperty("height"));
                var a = parseFloatLadiPage(i.getAttribute("data-timeout-id")) || null;
                o.removeTimeout(a), i.removeAttribute("data-timeout-id"), a = parseFloatLadiPage(i.getAttribute("data-timeout-id-2")) || null, o.removeTimeout(a), i.removeAttribute("data-timeout-id-2"), a = parseFloatLadiPage(i.getAttribute("data-timeout-id-3")) || null, o.removeTimeout(a), i.removeAttribute("data-timeout-id-3");
                var n = i.getElementsByClassName("popup-close")[0];
                isEmptyLadiPage(n) || (a = parseFloatLadiPage(n.getAttribute("data-timeout-id")) || null, o.removeTimeout(a), n.removeAttribute("data-timeout-id")), o.pauseAllVideo(i), isEmptyLadiPage(i.style.getPropertyValue("display")) || (d = !0, o.runActionPopupHide(t)), i.style.removeProperty("display"), i.style.removeProperty("z-index");
                var c = i.hasAttribute("data-popup-backdrop"),
                    u = o.runtime.eventData[t];
                if (isObjectLadiPage(u) && u[o.runtime.device + ".option.popup_position"] == o.const.POSITION_TYPE.default && (c = !0), c) {
                    s(), e && (isEmptyLadiPage(o.runtime.tmp.bodyScrollY) || window.scrollTo(0, o.runtime.tmp.bodyScrollY)), o.runtime.tmp.bodyScrollY = null;
                    for (var p = 0; p < r.length; p++) r[p].style.removeProperty("z-index")
                }
                i.removeAttribute("data-scroll"), i.removeAttribute("data-fixed-close"), i.style.removeProperty("overflow-y"), i.style.removeProperty("overflow-x");
                var m = i.getElementsByClassName("ladi-popup")[0];
                isEmptyLadiPage(m) || m.style.removeProperty("height"), i.style.removeProperty("max-height")
            }
        }), d && isFunctionLadiPage(i) && i(), a && s(), !n && l) {
        o.runtime.tmp.runActionPopupX({
            id: t,
            dimension: {
                display: "none"
            },
            action: {
                type: "set_iframe_dimension"
            }
        })
    }
    delete this.runtime.tmp.current_default_popup_id
}, LadiPageScriptV2.prototype.runShowPopup = function(t, e, i, a, n, o) {
    var r = this;
    if (!isEmptyLadiPage(e) && !r.runtime.tmp["popup_closing_" + e]) {
        var d = document.getElementById(e);
        if (!n || !isEmptyLadiPage(d) && isObjectLadiPage(r.runtime.eventData) && !isEmptyLadiPage(r.runtime.eventData[e])) {
            n && (i = r.runtime.eventData[e][r.runtime.device + ".option.popup_position"], a = r.runtime.eventData[e][r.runtime.device + ".option.popup_backdrop"]);
            var l = function(t) {
                    r.runtime.tmp.is_run_show_popup = !0;
                    var s = 0,
                        c = "";
                    n || LadiPagePlugin.getPlugin("popup").showStyleShowPopupBuilder(e);
                    isEmptyLadiPage(a) ? c += n ? "#" + r.runtime.backdrop_popup_id + " { display: none !important;}" : "#" + r.runtime.backdrop_popup_id + " { display: block !important;}" : (c += "#" + r.runtime.backdrop_popup_id + " { display: block !important; " + a + "}", d.setAttribute("data-popup-backdrop", !0)), i == r.const.POSITION_TYPE.default && "true" != d.getAttribute("data-dropbox") && (! function() {
                        if (!r.runtime.has_popupx && n) {
                            var t = window.scrollY;
                            if (!isEmptyLadiPage(r.runtime.tmp.bodyScrollY)) {
                                var i = getComputedStyle(document.body);
                                "fixed" == i.position && (parseFloatLadiPage(i.top) || 0) == -1 * r.runtime.tmp.bodyScrollY && (t = r.runtime.tmp.bodyScrollY)
                            }
                            "block" != d.style.getPropertyValue("display") || isEmptyLadiPage(r.runtime.tmp.bodyScrollY) || (t = r.runtime.tmp.bodyScrollY), c += "body {", 0 == d.getElementsByClassName("ladi-google-recaptcha-checkbox").length && (c += "position: fixed !important;"), c += "width: 100% !important;", c += "top: -" + t + "px !important;", c += "}", r.runtime.tmp.bodyScrollY = t
                        }
                        for (var a = document.querySelectorAll("#" + r.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"), o = 0; o < a.length; o++) a[o].id != e && a[o].style.setProperty("z-index", "1", "important");
                        s = 500
                    }(), r.runtime.tmp.current_default_popup_id = e);
                    var u = "block" == d.style.getPropertyValue("display");
                    if (isArrayLadiPage(r.runtime.list_show_popup_func[e]))
                        for (; r.runtime.list_show_popup_func[e].length > 0;) {
                            r.runtime.list_show_popup_func[e].shift()()
                        }
                    var p = d.hasAttribute("data-scroll"),
                        m = d.hasAttribute("data-fixed-close"),
                        _ = !1,
                        g = d.getElementsByClassName("ladi-popup")[0],
                        y = 1e3 * (parseFloatLadiPage(getComputedStyle(g).animationDuration) || 0),
                        h = 1e3 * (parseFloatLadiPage(getComputedStyle(g).animationDelay) || 0),
                        f = parseFloatLadiPage(d.getAttribute("data-timeout-id")) || null;
                    r.removeTimeout(f), f = parseFloatLadiPage(d.getAttribute("data-timeout-id-2")) || null, r.removeTimeout(f), !n || "true" == d.getAttribute("data-dropbox") || r.runtime.tmp.is_resize_all || r.runtime.tmp.is_wait_popup || isEmptyLadiPage(d.style.getPropertyValue("max-height")) && (r.runtime.has_popupx || d.style.setProperty("visibility", "hidden"));
                    if (d.classList.add("ladi-animation-hidden"), "block" != getComputedStyle(d).display && d.style.setProperty("display", "block", "important"), f = r.runTimeout(function() {
                            d.classList.remove("ladi-animation-hidden"), d.removeAttribute("data-timeout-id"),
                                function() {
                                    for (var t = g.getElementsByClassName("ladi-animation"); t.length > 0;) t[0].classList.add("ladi-animation-hidden"), t[0].classList.remove("ladi-animation");
                                    isObjectLadiPage(r.runtime.tmp.list_timeout_popup_id) || (r.runtime.tmp.list_timeout_popup_id = {}), isArrayLadiPage(r.runtime.tmp.list_timeout_popup_id[e]) || (r.runtime.tmp.list_timeout_popup_id[e] = []), r.runtime.tmp.list_timeout_popup_id[e].forEach(function(t) {
                                        r.removeTimeout(t)
                                    }), r.runtime.tmp.list_timeout_popup_id[e] = []
                                }(), f = r.runTimeout(function() {
                                    ! function() {
                                        for (var t = function(t) {
                                                var i = r.findAncestor(t, "ladi-element"),
                                                    a = 0;
                                                if (!isEmptyLadiPage(i)) {
                                                    var n = r.runtime.eventData[i.id];
                                                    isEmptyLadiPage(n) || (a = parseFloatLadiPage(n[r.runtime.device + ".style.animation-delay"]) || 0)
                                                }
                                                t.classList.add("ladi-animation");
                                                var o = r.runTimeout(function() {
                                                    t.classList.remove("ladi-animation-hidden")
                                                }, 1e3 * a);
                                                r.runtime.tmp.list_timeout_popup_id[e].push(o)
                                            }, i = function() {
                                                for (var t = [], e = g.getElementsByClassName("ladi-animation-hidden"), i = 0; i < e.length; i++) t.push(e[i]);
                                                return t
                                            }(), a = 0; a < i.length; a++) t(i[a])
                                    }(), d.removeAttribute("data-timeout-id")
                                }, y), isEmptyLadiPage(f) || d.setAttribute("data-timeout-id", f)
                        }, h), isEmptyLadiPage(f) || d.setAttribute("data-timeout-id", f), t && (!p && d.clientHeight > .8 * r.getHeightDevice() && (n ? r.runtime.has_popupx ? _ = !0 : (d.setAttribute("data-scroll", !0), d.style.setProperty("overflow-y", "auto", "important"), d.style.setProperty("overflow-x", "hidden", "important"), p = !0) : m = !0), r.runtime.has_popupx && (_ ? (d.setAttribute("data-fixed-close", !0), document.body.style.setProperty("height", d.clientHeight + "px")) : document.body.style.removeProperty("height")), p && n)) {
                        var v = d.scrollTop;
                        d.getElementsByClassName("ladi-popup")[0].style.removeProperty("height"), d.style.removeProperty("max-height"), d.getElementsByClassName("ladi-popup")[0].style.setProperty("height", d.clientHeight + "px", "important"), d.style.setProperty("max-height", "80vh"), d.scrollTop = v
                    }!n && m && LadiPagePlugin.getPlugin("popup").styleShowPopupBuilderScroll(e), r.runtime.has_popupx && (c += n ? "#" + r.runtime.backdrop_popup_id + " { display: none !important;}" : "#" + r.runtime.backdrop_popup_id + " { display: block !important;}", d.style.removeProperty("max-height"), d.style.removeProperty("overflow-y"), d.style.removeProperty("overflow-x")), isEmptyLadiPage(c) || r.runtime.tmp.is_resize_all || r.runtime.tmp.is_wait_popup || r.createStyleElement("style_popup", c);
                    var E = null;
                    if (n && !isEmptyLadiPage(d) && "true" != d.getAttribute("data-dropbox")) {
                        var P = d.getElementsByClassName("popup-close")[0];
                        isEmptyLadiPage(P) && ((P = document.createElement("div")).className = "popup-close", d.appendChild(P), P.addEventListener("click", function(t) {
                            t.stopPropagation(), r.runtime.tmp["popup_closing_" + e] = !0, r.runRemovePopup(e, n), r.runTimeout(function() {
                                delete r.runtime.tmp["popup_closing_" + e]
                            }, 500)
                        })), f = parseFloatLadiPage(P.getAttribute("data-timeout-id")) || null, r.removeTimeout(f), "true" == d.getAttribute("data-scroll") && (P.style.removeProperty("right"), P.style.removeProperty("top"), P.style.removeProperty("position")), r.runtime.has_popupx && r.runtime.tmp.popupx_is_inline && P.classList.add("ladi-hidden");
                        var L = function() {
                            if (P = d.getElementsByClassName("popup-close")[0], !isEmptyLadiPage(P))
                                if ("true" == d.getAttribute("data-scroll")) {
                                    var t = r.getElementBoundingClientRect(d),
                                        e = t.y,
                                        i = window.innerWidth - t.x - t.width;
                                    (p || _) && (i += r.runtime.widthScrollBar), P.style.setProperty("right", i + "px"), P.style.setProperty("top", e + "px"), P.style.setProperty("position", "fixed")
                                } else P.style.removeProperty("right"), P.style.removeProperty("top"), P.style.removeProperty("position")
                        };
                        L(), E = function() {
                            f = r.runTimeout(function() {
                                L(), P.removeAttribute("data-timeout-id")
                            }, y + h + 100), P.setAttribute("data-timeout-id", f)
                        }, (p || _) && (d.hasAttribute("data-resize-scroll") || (d.setAttribute("data-resize-scroll", !0), window.addEventListener("resize", L)))
                    }
                    n && !u && (r.runEventTracking(e, {
                        is_form: !1,
                        is_open_popup: !0,
                        is_custom: !0,
                        event: o.event
                    }), r.runActionPopupShow(e));
                    var b = function() {
                        var t = s;
                        f = r.runTimeout(function() {
                            delete r.runtime.tmp.is_run_show_popup, r.runEventScroll(), isFunctionLadiPage(E) && E(), d.removeAttribute("data-timeout-id-2")
                        }, t), isEmptyLadiPage(f) || d.setAttribute("data-timeout-id-2", f), d.style.removeProperty("visibility")
                    };
                    if (t) b();
                    else {
                        f = r.runTimeout(function() {
                            "none" == getComputedStyle(d).display ? (s -= 100, b()) : l(!0), d.removeAttribute("data-timeout-id-2")
                        }, 100), d.setAttribute("data-timeout-id-2", f)
                    }
                    d.removeAttribute("data-timeout-id-3")
                },
                s = 0;
            i == r.const.POSITION_TYPE.default && (s = 100);
            var c = r.runTimeout(function() {
                l(t)
            }, s);
            isEmptyLadiPage(d) || d.setAttribute("data-timeout-id-3", c)
        }
    }
}, LadiPageScriptV2.prototype.convertPhoneNumberFormData = function(t) {
    for (var e = null, i = [{
            startStr: "+84",
            endStr: "(9|8|7|5|3)[0-9]{8}",
            listRegex: [{
                str_start: "0",
                str_input: "0"
            }, {
                str_start: "\\+84",
                str_input: "+84"
            }]
        }], a = 0; a < i.length; a++)
        for (var n = 0; n < i[a].listRegex.length; n++) {
            new RegExp("^(" + i[a].listRegex[n].str_start + ")" + i[a].endStr + "$", "gi").test(t) && (e = i[a].startStr + t.substring(i[a].listRegex[n].str_input.length))
        }
    return e
}, LadiPageScriptV2.prototype.runGlobalTrackingScript = function() {
    if (isObjectLadiPage(window.ladi_global_tracking) && isArrayLadiPage(window.ladi_global_tracking.thankyou_page))
        for (; window.ladi_global_tracking.thankyou_page.length > 0;) {
            var t = window.ladi_global_tracking.thankyou_page.shift();
            this.runEventTracking(null, t)
        }
}, LadiPageScriptV2.prototype.runLadiPageCommand = function(t) {
    if (isArrayLadiPage(LadiPageCommand))
        for (var e = 0; e < LadiPageCommand.length; e++)
            if (isFunctionLadiPage(t) && t(LadiPageCommand[e])) {
                LadiPageCommand.splice(e, 1), this.runLadiPageCommand(t);
                break
            }
}, LadiPageScriptV2.prototype.generateTrackingJS = function(t, e) {
    null != e && void 0 != e && "object" == typeof e || (e = {}), null != e.zalo_ads_pixel_ladipage_id && void 0 != e.zalo_ads_pixel_ladipage_id || (e.zalo_ads_pixel_ladipage_id = "7056840457216708608"), !1 !== t.zalo_ads_pixel_ladipage && 0 == t.zalo_ads_pixel_ladipage && (t.zalo_ads_pixel_ladipage = !1, t.zalo_ads_pixel = null);
    var i = "",
        a = "",
        n = [];
    if (null != t.facebook_pixel && void 0 != t.facebook_pixel && t.facebook_pixel.length > 0 && (n = t.facebook_pixel.split(",").removeSpace()).length > 0) {
        i += "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');";
        var o = [];
        n.forEach(function(t) {
            var e = t.split("|API");
            i += 'fbq("init", "' + e[0].trim() + '"); console.log(`fbq("init", "' + e[0].trim() + '")`);', 2 == e.length && o.push(e[0].trim())
        }), o.length > 0 ? (i += "window.ladi_conversion_api = window.ladi_conversion_api || {};", i += "window.ladi_conversion_api.facebook = window.ladi_conversion_api.facebook || {pixels: []};", o.forEach(function(t) {
            i += "window.ladi_conversion_api.facebook.pixels.push('" + t + "');"
        }), i += 'window.ladi_fbq("track", "PageView");', t.is_view_content && (i += 'window.ladi_fbq("track", "ViewContent");')) : (i += 'fbq("track", "PageView"); console.log(`fbq("track", "PageView")`);', t.is_view_content && (i += 'fbq("track", "ViewContent"); console.log(`fbq("track", "ViewContent")`);')), i += "<\/script>", n.forEach(function(t) {
            var e = t.split("|API");
            i += '<noscript><img height="1" width="1" style="display:none;" src="https://www.facebook.com/tr?id=' + e[0].trim() + '&ev=PageView&noscript=1" /></noscript>'
        })
    }
    var r = [],
        d = [];
    null != t.google_ads_id && void 0 != t.google_ads_id && t.google_ads_id.length > 0 && (d = t.google_ads_id.split(",").removeSpace()), null != t.google_analytics_id && void 0 != t.google_analytics_id && t.google_analytics_id.length > 0 && (r = t.google_analytics_id.split(",").removeSpace()), (r.length > 0 || d.length > 0) && (i += '<script async src="https://www.googletagmanager.com/gtag/js?id=' + (r.length > 0 ? r[0] : d[0]) + '"><\/script>', i += "<script>window.dataLayer = window.dataLayer || [];", i += 'function gtag(){dataLayer.push(arguments);}gtag("js", new Date());', r.forEach(function(t) {
        i += 'gtag("config", "' + t + '", {allow_enhanced_conversions: true});'
    }), d.forEach(function(t) {
        i += 'gtag("config", "' + t + '", {allow_enhanced_conversions: true});'
    }), i += "<\/script>");
    var l = [];
    if (null != t.tiktok_pixel && void 0 != t.tiktok_pixel && t.tiktok_pixel.length > 0) {
        l = t.tiktok_pixel.split(",").removeSpace(), i += '<script>!function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};';
        var s = [];
        l.forEach(function(t) {
            var e = t.split("|API");
            i += 'ttq.load("' + e[0].trim() + '");', 2 == e.length && s.push(e[0].trim())
        }), s.length > 0 && (i += "window.ladi_conversion_api = window.ladi_conversion_api || {};", i += "window.ladi_conversion_api.tiktok = window.ladi_conversion_api.tiktok || {pixels: []};", s.forEach(function(t) {
            i += "window.ladi_conversion_api.tiktok.pixels.push('" + t + "');"
        })), t.is_view_content && (i += 'window.ladi_ttq("track", "ViewContent");'), i += 'window.ladi_ttq("track", "PageView");', i += 'ttq.page();}(window, document, "ttq");<\/script>'
    }
    t.zalo_ads_pixel_ladipage && (t.zalo_ads_pixel = e.zalo_ads_pixel_ladipage_id), null != t.zalo_ads_pixel && void 0 != t.zalo_ads_pixel && t.zalo_ads_pixel.length > 0 && (i += '<script>!function(e,t,r,n,c){if(!e.ztrq){c=e.ztrq=function(){c.queue?c.queue.push(arguments): c.call(c,arguments)},e._ztrk||(e._ztrk=c),c.queue=[];var u=t.createElement(r);u.async=!0, u.src=n;var a=t.getElementsByTagName(r)[0];a.parentNode.insertBefore(u,a)}}(window,document,"script","https://s.zzcdn.me/ztr/ztracker.js?id=' + t.zalo_ads_pixel + '");', t.zalo_ads_pixel_ladipage && (i += "window.LadiPageZaloAds = {auto_tracking: true};", t.is_view_content && (i += 'ztrq("track", "ViewContent");')), i += "<\/script>");
    var c = [];
    return null != t.google_tag_manager_id && void 0 != t.google_tag_manager_id && t.google_tag_manager_id.length > 0 && ((c = t.google_tag_manager_id.split(",").removeSpace()).length > 0 && (i += "<script>function gtm(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}", c.forEach(function(t) {
        i += "gtm(window,document,'script','dataLayer','" + t + "');"
    }), i += "<\/script>"), c.forEach(function(t) {
        a += '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' + t + '" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>'
    })), {
        template: i,
        template_body: a
    }
}, LadiPageScriptV2.prototype.customScriptDelayInit = function() {
    var t = this;
    if (t instanceof LadiPageScriptV2 || (t = LadiPageScript), !isEmptyLadiPage(t.runtime.tracking_global_url) && !t.runtime.tmp.tracking_global_loaded) return t.runTimeout(t.customScriptDelayInit, 100);
    var e = document.createElement("div");
    [{
        id: "script_html_head",
        elm: "head"
    }, {
        id: "script_html_body",
        elm: "body"
    }].forEach(function(t) {
        try {
            var i = document.getElementById(t.id);
            isEmptyLadiPage(i) || (e.innerHTML = i.innerHTML, isEmptyLadiPage(e.textContent) || (i = document.createRange().createContextualFragment(e.textContent), document[t.elm].appendChild(i)))
        } catch (t) {}
    })
}, LadiPageScriptV2.prototype.trackingInit = function(t) {
    if (isObjectLadiPage(t)) {
        var e = this.generateTrackingJS(t);
        [{
            str: e.template,
            elm: "head"
        }, {
            str: e.template_body,
            elm: "body"
        }].forEach(function(t) {
            try {
                if (!isEmptyLadiPage(t.str)) {
                    var e = document.createRange().createContextualFragment(t.str);
                    document[t.elm].appendChild(e)
                }
            } catch (t) {}
        })
    }
}, LadiPageScriptV2.prototype.runEventTracking = function(t, e, i, a, n) {
    var o = this;
    if (this.runtime.isClient) {
        var r = null,
            d = null,
            l = null,
            s = null,
            c = null,
            u = o.runtime.currency,
            p = o.runtime.eventData[t],
            m = null,
            _ = e.is_form,
            g = e.is_click && e.count_data_event > 0 && o.runtime.tracking_button_click,
            y = e.is_custom,
            h = e.is_return_string;
        h && (o.runtime.tmp.form_checkout_tracking_script = [], o.runtime.tmp.form_checkout_tracking_conversion_api = []);
        var f = !0,
            v = !0,
            E = !0,
            P = !0;
        if (e.only_facebook && (v = !1, E = !1, P = !1), e.only_tiktok && (f = !1, v = !1, P = !1), y) r = e.conversion_name, d = e.google_ads_conversion, l = e.google_ads_label, c = isEmptyLadiPage(e.purchase_value) ? null : parseFloatLadiPage(e.purchase_value) || 0;
        else {
            if (isEmptyLadiPage(t) || !isObjectLadiPage(p)) return;
            if (m = p.type, _ && "form" == m) {
                if (r = p["option.form_conversion_name"], d = p["option.form_google_ads_conversion"], l = p["option.form_google_ads_label"], s = p["option.form_event_custom_script"], c = isEmptyLadiPage(p["option.form_purchase_value"]) ? null : parseFloatLadiPage(p["option.form_purchase_value"]) || 0, o.runtime.shopping) {
                    var L = document.querySelector('#POPUP_CHECKOUT .ladi-element[id="' + t + '"]');
                    isEmptyLadiPage(L) || (c = o.getCartCheckoutPrice(c))
                }
            } else r = p["option.conversion_name"], d = p["option.google_ads_conversion"], l = p["option.google_ads_label"], s = p["option.event_custom_script"]
        }
        var b = function(t) {
            if (t || isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api.facebook) && isArrayLadiPage(window.ladi_conversion_api.facebook.pixels)) {
                return {
                    eventID: "ladi." + Date.now() + "." + (Math.floor(9e10 * Math.random()) + 1e10)
                }
            }
        };
        isNullLadiPage(o.runtime.tmp.ttq_click_button_tracking) && (o.runtime.tmp.ttq_click_button_tracking = 0);
        var A = function(i) {
                if (E) {
                    try {
                        "ViewContent" == i.conversion_name || isEmptyLadiPage(e.event) || (isObjectLadiPage(i.data) || (i.data = {}), i.data.content_id = e.event.target.id, i.data.content_name = e.event.target.textContent, isNullLadiPage(o.runtime.tmp.form_button_headline) && (o.runtime.tmp.form_button_headline = {}), isNullLadiPage(o.runtime.tmp.form_button_headline[t]) || (i.data.content_name = o.runtime.tmp.form_button_headline[t]))
                    } catch (t) {}
                    var a = [{
                        name: i.conversion_name,
                        custom_data: i.data,
                        data: i.ttq_event_data
                    }];
                    h ? (o.runtime.tmp.form_checkout_tracking_script.push(`window.ttq.track(${JSON.stringify(i.conversion_name)}, ${JSON.stringify(i.data)}, ${JSON.stringify(i.ttq_event_data)});`), o.runConversionApi("tiktok", "events", a, {
                        is_return_string: !0,
                        ttq_identify_data: i.ttq_identify_data
                    })) : o.runtime.is_popupx ? (o.runtime.tmp.runActionPopupX({
                        conversion_name: i.conversion_name,
                        ttq_data: i.data,
                        ttq_event_data: i.ttq_event_data,
                        action: {
                            type: "run_tracking_ttq"
                        }
                    }), o.runtime.tmp.runActionPopupX({
                        type: "tiktok",
                        key: "events",
                        keyData: a,
                        options: {
                            ttq_identify_data: i.ttq_identify_data
                        },
                        action: {
                            type: "run_conversion_api"
                        }
                    })) : LadiPageQueueCommand.push(function() {
                        return !isNullLadiPage(window.ttq)
                    }, function() {
                        window.ttq.track(i.conversion_name, i.data, i.ttq_event_data), o.runConversionApi("tiktok", "events", a, {
                            ttq_identify_data: i.ttq_identify_data
                        })
                    })
                }
            },
            T = function(t) {
                if (t || isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api.tiktok) && isArrayLadiPage(window.ladi_conversion_api.tiktok.pixels)) {
                    return {
                        event_id: "ladi." + Date.now() + "." + (Math.floor(9e10 * Math.random()) + 1e10)
                    }
                }
                return {}
            },
            S = function(i, a) {
                if (P) {
                    try {
                        isEmptyLadiPage(e.event) || (isObjectLadiPage(a.data) || (a.data = {}), a.data.content_id = e.event.target.id, a.data.content_name = e.event.target.textContent, isNullLadiPage(o.runtime.tmp.form_button_headline) && (o.runtime.tmp.form_button_headline = {}), isNullLadiPage(o.runtime.tmp.form_button_headline[t]) || (a.data.content_name = o.runtime.tmp.form_button_headline[t]))
                    } catch (t) {}
                    h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.ztrq(${JSON.stringify(a.track_name)}, ${JSON.stringify(a.conversion_name)}, ${JSON.stringify(a.data)});`) : o.runtime.is_popupx ? o.runtime.tmp.runActionPopupX({
                        is_auto_tracking: i,
                        track_name: a.track_name,
                        conversion_name: a.conversion_name,
                        ztrq_data: a.data,
                        action: {
                            type: "run_tracking_ztrq"
                        }
                    }) : LadiPageQueueCommand.push(function() {
                        return isFunctionLadiPage(window.ztrq)
                    }, function() {
                        (!i || isObjectLadiPage(window.LadiPageZaloAds) && window.LadiPageZaloAds.auto_tracking) && window.ztrq(a.track_name, a.conversion_name, a.data)
                    })
                }
            };
        if ((e.is_place_an_order || e.is_complete_payment) && isObjectLadiPage(e.payment_info)) {
            var w = null;
            try {
                w = {
                    sha256_phone_number: window.sha256(o.convertPhoneNumberFormData(e.payment_info.phone))
                }, isEmptyLadiPage(e.payment_info.email) || (w.sha256_email = window.sha256(e.payment_info.email)), w.external_id = window.sha256(window.ladi("LADI_UNIQUE_ID").get_cookie())
            } catch (t) {}
            isObjectLadiPage(w) && !isEmptyLadiPage(w.sha256_phone_number) && (o.runtime.is_popupx ? o.runtime.tmp.runActionPopupX({
                ttq_identify_data: w,
                action: {
                    type: "run_identify_ttq"
                }
            }) : LadiPageQueueCommand.push(function() {
                return !isNullLadiPage(window.ttq)
            }, function() {
                window.ttq.identify(w)
            })), e.is_place_an_order && A({
                conversion_name: "PlaceAnOrder",
                ttq_identify_data: w,
                data: {
                    value: e.payment_info.total_price,
                    currency: e.payment_info.currency_code,
                    content_id: o.runtime.ladipage_id,
                    content_type: "product"
                },
                ttq_event_data: T(o.runtime.is_popupx)
            }), e.is_complete_payment && (A({
                conversion_name: "CompletePayment",
                ttq_identify_data: w,
                data: {
                    value: e.payment_info.total_price,
                    currency: e.payment_info.currency_code,
                    content_id: o.runtime.ladipage_id,
                    content_type: "product"
                },
                ttq_event_data: T(o.runtime.is_popupx)
            }), S(!0, {
                track_name: "track",
                conversion_name: "Purchase"
            }))
        }
        if ((e.is_click_buy_now || e.is_open_popup && "POPUP_CHECKOUT" == t) && (o.runtime.tmp.ttq_click_button_tracking = Date.now(), A({
                conversion_name: "InitiateCheckout",
                data: {},
                ttq_event_data: T(o.runtime.is_popupx)
            }), S(!0, {
                track_name: "track",
                conversion_name: "InitiateCheckout"
            })), e.is_add_to_cart) return o.runtime.tmp.ttq_click_button_tracking = Date.now(), A({
            conversion_name: "AddToCart",
            data: {
                content_type: "product",
                quantity: e.cart_quantity,
                currency: e.cart_currency,
                value: e.cart_value
            },
            ttq_event_data: T(o.runtime.is_popupx)
        }), void S(!0, {
            track_name: "track",
            conversion_name: "AddToCart",
            data: {
                content_type: "product",
                quantity: e.cart_quantity,
                currency: e.cart_currency,
                value: e.cart_value
            }
        });
        if (isArrayLadiPage(e.data_event_run)) - 1 != e.data_event_run.findIndex(function(t) {
            return t.type == o.const.DATA_ACTION_TYPE.phone || t.type == o.const.DATA_ACTION_TYPE.email
        }) && (isEmptyLadiPage(a) || a.addEventListener("click", function(t) {
            isFunctionLadiPage(n) && !n(a, t) || (o.runtime.tmp.ttq_click_button_tracking = Date.now(), A({
                conversion_name: "Contact",
                data: {},
                ttq_event_data: T(o.runtime.is_popupx)
            }), S(!0, {
                track_name: "track",
                conversion_name: "Contact"
            }))
        }));
        if (!isEmptyLadiPage(a)) {
            var O = !1;
            return isEmptyLadiPage(d) || isEmptyLadiPage(l) || (O = !0), isEmptyLadiPage(r) || (O = !0), isEmptyLadiPage(s) || (O = !0), g && (O = !0), -1 != ["section", "popup", "countdown"].indexOf(m) && (O = !1), void(O && a.addEventListener("click", function(r) {
                isFunctionLadiPage(n) && !n(a, r) || o.runEventTracking(t, e, i)
            }))
        }! function(t) {
            if (f) {
                var e = null,
                    a = null,
                    n = "trackCustom",
                    d = [],
                    l = null;
                isEmptyLadiPage(r) || (-1 != ["AddPaymentInfo", "AddToCart", "AddToWishlist", "CompleteRegistration", "Contact", "CustomizeProduct", "Donate", "FindLocation", "InitiateCheckout", "Lead", "PageView", "Purchase", "Schedule", "Search", "StartTrial", "SubmitApplication", "Subscribe", "ViewContent"].indexOf(r) && (n = "track"), isEmptyLadiPage(c) || isEmptyLadiPage(u) || ((e = {}).value = c, e.currency = u), a = b(t), d.push({
                    fbq_track_name: n,
                    conversion_name: r,
                    fbq_data: e,
                    fbq_event_data: a
                }), d.forEach(function(e) {
                    h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.fbq(${JSON.stringify(e.fbq_track_name)}, ${JSON.stringify(e.conversion_name)}, ${JSON.stringify(e.fbq_data)}, ${JSON.stringify(e.fbq_event_data)});`) : t ? o.runtime.tmp.runActionPopupX({
                        fbq_track_name: e.fbq_track_name,
                        conversion_name: e.conversion_name,
                        fbq_data: e.fbq_data,
                        fbq_event_data: e.fbq_event_data,
                        action: {
                            type: "run_tracking_fbq"
                        }
                    }) : LadiPageQueueCommand.push(function() {
                        return isFunctionLadiPage(window.fbq)
                    }, function() {
                        fbqCustom(e.fbq_track_name, e.conversion_name, e.fbq_data, e.fbq_event_data)
                    });
                    var a = o.copy(e.fbq_event_data);
                    if (o.runtime.shopping && _) {
                        var n = o.getCartProducts();
                        isNullLadiPage(n) || (isObjectLadiPage(a) || (a = {}), a.cart_products = n)
                    }
                    isObjectLadiPage(i) && ["phone", "email"].forEach(function(t) {
                        var e = i[t];
                        isEmptyLadiPage(e) || (isObjectLadiPage(a) || (a = {}), a[t] = e)
                    }), l = [{
                        key: e.fbq_track_name,
                        name: e.conversion_name,
                        custom_data: e.fbq_data,
                        data: a
                    }], h ? o.runConversionApi("facebook", "events", l, {
                        is_return_string: !0
                    }) : t ? o.runtime.tmp.runActionPopupX({
                        type: "facebook",
                        key: "events",
                        keyData: l,
                        action: {
                            type: "run_conversion_api"
                        }
                    }) : o.runConversionApi("facebook", "events", l)
                })), g && (n = "trackCustom", e = null, a = b(t), (d = []).push({
                    fbq_track_name: n,
                    conversion_name: "ClickButton",
                    fbq_data: e,
                    fbq_event_data: a
                }), d.forEach(function(e) {
                    h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.fbq(${JSON.stringify(e.fbq_track_name)}, ${JSON.stringify(e.conversion_name)}, ${JSON.stringify(e.fbq_data)}, ${JSON.stringify(e.fbq_event_data)});`) : t ? o.runtime.tmp.runActionPopupX({
                        fbq_track_name: e.fbq_track_name,
                        conversion_name: e.conversion_name,
                        fbq_data: e.fbq_data,
                        fbq_event_data: e.fbq_event_data,
                        action: {
                            type: "run_tracking_fbq"
                        }
                    }) : LadiPageQueueCommand.push(function() {
                        return isFunctionLadiPage(window.fbq)
                    }, function() {
                        fbqCustom(e.fbq_track_name, e.conversion_name, e.fbq_data, e.fbq_event_data)
                    }), l = [{
                        key: e.fbq_track_name,
                        name: e.conversion_name,
                        custom_data: e.fbq_data,
                        data: e.fbq_event_data
                    }], h ? o.runConversionApi("facebook", "events", l, {
                        is_return_string: !0
                    }) : t ? o.runtime.tmp.runActionPopupX({
                        type: "facebook",
                        key: "events",
                        keyData: l,
                        action: {
                            type: "run_conversion_api"
                        }
                    }) : o.runConversionApi("facebook", "events", l)
                }))
            }
        }(o.runtime.is_popupx),
        function(t) {
            if (v) {
                if (isObjectLadiPage(i)) {
                    var a = o.convertPhoneNumberFormData(i.phone),
                        n = {};
                    isEmptyLadiPage(i.email) || (n.email = i.email), isEmptyLadiPage(a) ? isEmptyLadiPage(i.phone) || (n.phone_number = i.phone) : n.phone_number = a, Object.keys(n).length > 0 && (h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.gtag('set', 'user_data', ${JSON.stringify(n)});`) : t ? o.runtime.tmp.runActionPopupX({
                        conversion_name: "user_data",
                        gtag_data: n,
                        action: {
                            type: "run_tracking_gtag_set"
                        }
                    }) : LadiPageQueueCommand.push(function() {
                        return isFunctionLadiPage(window.gtag)
                    }, function() {
                        window.gtag("set", "user_data", n)
                    }))
                }
                isEmptyLadiPage(d) || isEmptyLadiPage(l) || (h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.gtag('event', 'conversion', {'send_to': 'AW-${d}/${l}'});`) : t ? o.runtime.tmp.runActionPopupX({
                    conversion_name: "conversion",
                    gtag_data: {
                        send_to: "AW-" + d + "/" + l
                    },
                    action: {
                        type: "run_tracking_gtag"
                    }
                }) : LadiPageQueueCommand.push(function() {
                    return isFunctionLadiPage(window.gtag)
                }, function() {
                    window.gtag("event", "conversion", {
                        send_to: "AW-" + d + "/" + l
                    })
                }));
                var s = null;
                if (!isEmptyLadiPage(r)) {
                    var _ = "";
                    _ = "section" == m ? "LadiPageSection" : "popup" == m ? "LadiPagePopup" : "form" == m ? "LadiPageConversion" : "LadiPageClick", y && (_ = e.event_category);
                    var g = LadiPageApp[m + o.const.APP_RUNTIME_PREFIX];
                    if (!isEmptyLadiPage(g)) {
                        var f = g(p, o.runtime.isClient);
                        isFunctionLadiPage(f.getEventTrackingCategory) && (_ = g(p, o.runtime.isClient).getEventTrackingCategory())
                    }
                    s = {
                        event_category: _,
                        event_label: window.location.host + window.location.pathname
                    }, isEmptyLadiPage(c) || isEmptyLadiPage(u) || (s.value = c, s.currency = u), h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.gtag('event', ${JSON.stringify(r)}, ${JSON.stringify(s)});`) : t ? o.runtime.tmp.runActionPopupX({
                        conversion_name: r,
                        gtag_data: s,
                        action: {
                            type: "run_tracking_gtag"
                        }
                    }) : LadiPageQueueCommand.push(function() {
                        return isFunctionLadiPage(window.gtag)
                    }, function() {
                        window.gtag("event", r, s)
                    })
                }
            }
        }(o.runtime.is_popupx),
        function(t) {
            if (E) {
                var e = null;
                if (isObjectLadiPage(i)) try {
                    e = {
                        sha256_phone_number: window.sha256(o.convertPhoneNumberFormData(i.phone))
                    }, isEmptyLadiPage(i.email) || (e.sha256_email = window.sha256(i.email)), e.external_id = window.sha256(window.ladi("LADI_UNIQUE_ID").get_cookie())
                } catch (t) {}
                isObjectLadiPage(e) && !isEmptyLadiPage(e.sha256_phone_number) && (h ? o.runtime.tmp.form_checkout_tracking_script.push(`window.ttq.identify(${JSON.stringify(e)});`) : t ? o.runtime.tmp.runActionPopupX({
                    ttq_identify_data: e,
                    action: {
                        type: "run_identify_ttq"
                    }
                }) : LadiPageQueueCommand.push(function() {
                    return !isNullLadiPage(window.ttq)
                }, function() {
                    window.ttq.identify(e)
                }));
                var a = null;
                if (!isEmptyLadiPage(r) && -1 == ["Purchase", "Lead"].indexOf(r)) {
                    var n = {};
                    "CompletePayment" != r || isEmptyLadiPage(c) || isEmptyLadiPage(u) || ((n = {
                        content_id: o.runtime.ladipage_id,
                        content_type: "product"
                    }).value = c, n.currency = u), a = T(t), A({
                        conversion_name: r,
                        data: n,
                        ttq_event_data: a,
                        ttq_identify_data: e
                    })
                }
                g && (o.runLadiPageCommand(function(e) {
                    if ("ViewContent" == e.name && e.clickButton) return a = T(t), o.runtime.tmp.ttq_click_button_tracking = Date.now(), A({
                        conversion_name: e.name,
                        data: {},
                        ttq_event_data: a
                    }), !0
                }), o.runTimeout(function() {
                    a = T(t), A({
                        conversion_name: "ClickButton",
                        data: {},
                        ttq_event_data: a
                    })
                }, o.runtime.tmp.ttq_click_button_tracking + o.runtime.time_delay_click_button < Date.now() ? 0 : o.runtime.time_delay_click_button))
            }
        }(o.runtime.is_popupx),
        function(a) {
            if (P && !e.is_facebook_widget && !e.is_form_multiple && _ && isObjectLadiPage(i))
                if (isEmptyLadiPage(i.phone)) isEmptyLadiPage(i.email) || S(!0, {
                    track_name: "track",
                    conversion_name: "CompleteRegistration"
                });
                else {
                    var n = null;
                    isEmptyLadiPage(u) || isEmptyLadiPage(c) || (n = {
                        content_type: "product",
                        currency: u,
                        value: c
                    }), !isNullLadiPage(n) || !isEmptyLadiPage(i.address) && function(e) {
                        var i = document.querySelector("#" + t + ' .ladi-form-item [name="' + e + '"]');
                        if (isEmptyLadiPage(i)) return !1;
                        var a = o.findAncestor(i, "ladi-form-item");
                        return a.hasAttribute("ladi-checkbox-required") ? "true" == a.getAttribute("ladi-checkbox-required") : !!i.required
                    }("address") ? S(!0, {
                        track_name: "track",
                        conversion_name: "Purchase",
                        data: n
                    }) : S(!0, {
                        track_name: "track",
                        conversion_name: "Lead"
                    })
                }
        }(o.runtime.is_popupx), isEmptyLadiPage(s) || (h ? o.runtime.tmp.form_checkout_tracking_script.push(s) : o.runtime.is_popupx ? o.runtime.tmp.runActionPopupX({
            script: s,
            action: {
                type: "event_custom_script"
            }
        }) : o.runFunctionString(s))
    }
}, LadiPageScriptV2.prototype.runFunctionString = function(t) {
    try {
        return new Function(t)()
    } catch (t) {}
}, LadiPageScriptV2.prototype.convertReplacePrefixStr = function(t, e) {
    var i = t,
        a = this.runtime.replacePrefixStart,
        n = this.runtime.replacePrefixEnd,
        o = this.runtime.replaceNewPrefixStart,
        r = this.runtime.replaceNewPrefixEnd;
    if (e) {
        var d = o;
        o = a, a = d, d = r, r = n, n = d
    }
    for (var l = new RegExp(a + "[^" + a + "$" + n + "]*" + n, "gi"), s = null, c = function(t) {
            i = i.replaceAll(t, t.replaceAll(a, o).replaceAll(n, r))
        }; null !== (s = l.exec(t));) s.index === l.lastIndex && l.lastIndex++, s.forEach(c);
    return i
}, LadiPageScriptV2.prototype.formatCurrency = function(t, e, i, a) {
    var n = {
        VND: "{0}đ",
        KHR: "{0}៛",
        USD: "${0}",
        EUR: "€{0}",
        GBP: "£{0}",
        THB: "฿{0}",
        LAK: "₭{0}",
        PHP: "₱{0}",
        SGD: "S${0}",
        HKD: "HK${0}",
        TWD: "NT${0}",
        MYR: "RM{0}",
        IDR: "Rp{0}",
        INR: "₹{0}",
        AUD: "A${0}"
    };
    if (Object.keys(n).forEach(function(t) {
            var i = n[t].replaceAll("{0}", "");
            (i = i.trim()) == e && (e = t)
        }), a) return isEmptyLadiPage(n[e]) ? e : n[e].format("").trim();
    var o = this.formatNumber(t, 3, null, {
        VND: 0,
        USD: 2,
        EUR: 2,
        GBP: 2,
        SGD: 2,
        MYR: 2,
        HKD: 2,
        TWD: 0,
        THB: 0,
        PHP: 0,
        KHR: 0,
        LAK: 0,
        IDR: 0,
        INR: 0,
        AUD: 2
    } [e] || 0);
    return i && (o = isEmptyLadiPage(n[e]) ? o + " " + e : n[e].format(o)), o
}, LadiPageScriptV2.prototype.formatNumber = function(t, e, i, a) {
    if (void 0 != t) {
        void 0 == i && (i = 0), void 0 == a && (a = 0);
        var n = "\\d(?=(\\d{" + (e || 3) + "})+" + (a > 0 ? "\\." : "$") + ")";
        t = t.toFixed(Math.max(0, ~~a)).replace(new RegExp(n, "g"), "$&,");
        var o = null,
            r = null;
        i >= 1 && (r = (o = t.split("."))[0], t = r = new Array(i - r.length + 1).join("0") + r, 2 == o.length && (t += "." + o[1])), a >= 1 && 2 == (o = t.split(".")).length && (r = o[1], r = new Array(a - r.length + 1).join("0") + r, t = o[0] + "." + r)
    }
    return t
}, LadiPageScriptV2.prototype.setDataReplaceStr = function(t, e) {
    this.runtime.replaceStr[t] = e
}, LadiPageScriptV2.prototype.getDataReplaceStr = function(t, e) {
    var i = null;
    return isNullLadiPage(e) || (i = e[t]), isNullLadiPage(i) && (i = this.runtime.replaceStr[t]), i
}, LadiPageScriptV2.prototype.highlightText = function(t, e, i, a) {
    if (!isEmptyLadiPage(t) && 0 != e.length) {
        var n = i ? "gi" : "g",
            o = [];
        e.forEach(function(t) {
            o.push(t.replaceAll("|", "\\|"))
        }), o.sort(function(t, e) {
            return e.length - t.length
        });
        for (var r = this, d = function(t) {
                var d = new RegExp(o.join("|"), n);
                if (3 !== t.nodeType) r.highlightText(t, e, i, a);
                else if (d.test(t.textContent)) {
                    var l = document.createDocumentFragment(),
                        s = 0;
                    t.textContent.replace(d, function(e, i) {
                        var n = document.createTextNode(t.textContent.slice(s, i)),
                            o = null;
                        isFunctionLadiPage(a) ? o = a(e) : (o = document.createElement("span")).textContent = e, l.appendChild(n), l.appendChild(o), s = i + e.length
                    });
                    var c = document.createTextNode(t.textContent.slice(s));
                    l.appendChild(c), t.parentNode.replaceChild(l, t)
                }
            }, l = 0; l < t.childNodes.length; l++) {
            d(t.childNodes[l])
        }
    }
}, LadiPageScriptV2.prototype.convertDataReplaceStr = function(t, e, i, a, n, o, r) {
    var d = this,
        l = d.runtime.replacePrefixStart,
        s = d.runtime.replacePrefixEnd;
    d.runtime.convert_replace_str && (l = d.runtime.replaceNewPrefixStart, s = d.runtime.replaceNewPrefixEnd);
    for (var c = t = isEmptyLadiPage(t) ? "" : t, u = new RegExp(l + "[^" + l + "$" + s + "]*" + s, "gi"), p = null, m = [], _ = !1, g = function(t) {
            if (a) m.push(t);
            else {
                var i = t,
                    u = i.split("|");
                i = u[0].substr(l.length), 1 == u.length && (i = i.substr(0, i.length - s.length)), isObjectLadiPage(r) && isArrayLadiPage(r.list_only_key) && r.list_only_key.length > 0 && -1 == r.list_only_key.indexOf(i) && (_ = !0);
                var p = d.getDataReplaceStr(i, n);
                if (isEmptyLadiPage(p))
                    if (u.length > 1) {
                        var g = d.randomInt(1, u.length - 1);
                        p = u[g], g == u.length - 1 && (p = p.substr(0, p.length - s.length))
                    } else p = "";
                e && (isArrayLadiPage(p) && p.length > 1 && (p = JSON.stringify(p)), p = encodeURIComponent(p)), c = o && isArrayLadiPage(p) && p.length > 1 ? p : c.replaceAll(t, p)
            }
        }; null !== (p = u.exec(t));) p.index === u.lastIndex && u.lastIndex++, p.forEach(g);
    return m = m.unique(), isObjectLadiPage(r) && r.return_list_match ? m : _ ? r.old_value : (d.highlightText(i, m, !0, function(t) {
        var e = document.createElement("span");
        return e.setAttribute("data-replace-str", t), e
    }), d.runtime.isDesktop && e && !isEmptyLadiPage(c) && ["fb://profile/", "fb://profile/?id=", "fb://page/?id=", "fb://page/", "fb://group/?id=", "fb://group/"].forEach(function(t) {
        c.startsWith(t) && (c = c.replaceAll(t, "https://www.facebook.com/"))
    }), c)
}, LadiPageScriptV2.prototype.runFormulaData = function(t) {
    var e = this;
    if (e instanceof LadiPageScriptV2 || (e = LadiPageScript), isEmptyLadiPage(t) || !isArrayLadiPage(e.runtime.tmp.list_set_formula_data_watch) || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t) || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".value") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".label") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".country.value") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".country.label") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".state.value") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".state.label") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".district.value") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".district.label") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".ward.value") || -1 != e.runtime.tmp.list_set_formula_data_watch.indexOf(t + ".ward.label")) {
        var i;
        isNullLadiPage(e.runtime.tmp.list_set_formula_data) && (e.runtime.tmp.list_set_formula_data = (i = {}, Object.keys(e.runtime.eventData).forEach(function(t) {
            var a = e.runtime.eventData[t];
            isObjectLadiPage(a) && a["option.data_formula.is_enable"] && !isEmptyLadiPage(a["option.data_formula.text"]) && (i[t] = a["option.data_formula.text"])
        }), i));
        var a = Object.keys(e.runtime.tmp.list_set_formula_data);
        if (0 != a.length) {
            var n = function(t, e, i, a) {
                    return isNullLadiPage(a) && (e != parseFloatLadiPage(e) && e != parseFloatLadiPage(window.ladi(t).value()) || (a = !0)), a ? parseFloatLadiPage(e) || 0 : "`" + (isEmptyLadiPage(e) ? "" : e) + "`"
                },
                o = function(t) {
                    var e = 0;
                    return t.forEach(function(t) {
                        e += parseFloatLadiPage(t) || 0
                    }), e
                },
                r = function(t, i) {
                    var a = e.getDataReplaceStr(i);
                    return n(t, a)
                },
                d = function(i, a) {
                    if (i != t) {
                        var d = [];
                        e.convertDataReplaceStr(a, !1, null, !0, null, !1, {
                            return_list_match: !0
                        }).forEach(function(t) {
                            var l = t.replaceAll(e.runtime.replaceNewPrefixStart, "").replaceAll(e.runtime.replaceNewPrefixEnd, "");
                            a = a.replaceAll(t, 'LadiFormulaData["' + l + '"]'), d.push('LadiFormulaData["' + l + '"] = ' + function(t, i) {
                                try {
                                    var a = 0,
                                        d = null,
                                        l = null,
                                        s = null,
                                        c = [],
                                        u = null,
                                        p = i.split(".")[0],
                                        m = i.split(".")[1],
                                        _ = i.split(".")[2];
                                    if (("country" == m || "state" == m || "district" == m || "ward" == m) && (d = document.querySelector("#" + p + ' .ladi-form-item [name="' + m + '"]'), !isEmptyLadiPage(d))) return u = "", isEmptyLadiPage(d.value) || ((isEmptyLadiPage(_) || "value" == _) && (u = d.value.split(":")[0]), "label" == _ && (u = d.value.split(":")[1])), "`" + (isEmptyLadiPage(u) ? "" : u) + "`";
                                    m = i.split(".")[0], _ = i.split(".")[1];
                                    var g = !1;
                                    if (d = document.getElementById(m), isEmptyLadiPage(d)) return r(t, i);
                                    if ((s = d.querySelectorAll(".ladi-form-item.ladi-form-checkbox .ladi-form-checkbox-item input")).length > 0) {
                                        for (c = [], g = !0, a = 0; a < s.length; a++) {
                                            if ((isEmptyLadiPage(_) || "value" == _) && !isEmptyLadiPage(s[a].value) && parseFloatLadiPage(s[a].value) != s[a].value) {
                                                g = !1;
                                                break
                                            }
                                            if ("label" == _ && (l = (l = e.findAncestor(s[a], "ladi-form-checkbox-item")).getElementsByTagName("span")[0], !isEmptyLadiPage(l) && !isEmptyLadiPage(l.textContent) && parseFloatLadiPage(l.textContent) != l.textContent)) {
                                                g = !1;
                                                break
                                            }
                                        }
                                        for (a = 0; a < s.length; a++) s[a].checked && ((isEmptyLadiPage(_) || "value" == _) && (isEmptyLadiPage(s[a].value) || c.push(s[a].value)), "label" == _ && (l = (l = e.findAncestor(s[a], "ladi-form-checkbox-item")).getElementsByTagName("span")[0], isEmptyLadiPage(l) || isEmptyLadiPage(l.textContent) || c.push(l.textContent)));
                                        return u = c.length <= 1 ? c[0] : g ? o(c) : c.join("; "), n(t, u, 0, g)
                                    }
                                    if (s = d.querySelector(".ladi-form-item select"), !isEmptyLadiPage(s)) {
                                        for (c = [], g = !0, l = s.getElementsByTagName("option"), a = 0; a < l.length; a++) {
                                            if ((isEmptyLadiPage(_) || "value" == _) && !isEmptyLadiPage(l[a].value) && parseFloatLadiPage(l[a].value) != l[a].value) {
                                                g = !1;
                                                break
                                            }
                                            if ("label" == _ && !isEmptyLadiPage(l[a].textContent) && parseFloatLadiPage(l[a].textContent) != l[a].textContent) {
                                                g = !1;
                                                break
                                            }
                                        }
                                        return isEmptyLadiPage(s.value) || ((isEmptyLadiPage(_) || "value" == _) && c.push(s.value), "label" == _ && (l = s.querySelector('option[value="' + s.value + '"]'), isEmptyLadiPage(l) || c.push(l.textContent))), u = c.length <= 1 ? c[0] : g ? o(c) : c.join("; "), n(t, u, 0, g)
                                    }
                                    if ((s = d.querySelectorAll(".ladi-survey .ladi-survey-option")).length > 0) {
                                        for (c = [], g = !0, a = 0; a < s.length; a++) {
                                            if ((isEmptyLadiPage(_) || "value" == _) && !isEmptyLadiPage(s[a].getAttribute("data-value")) && parseFloatLadiPage(s[a].getAttribute("data-value")) != s[a].getAttribute("data-value")) {
                                                g = !1;
                                                break
                                            }
                                            if ("label" == _) {
                                                if (l = s[a].getElementsByClassName("ladi-survey-option-label")[0], isEmptyLadiPage(l)) {
                                                    g = !1;
                                                    break
                                                }
                                                if (!isEmptyLadiPage(s[a].textContent) && parseFloatLadiPage(s[a].textContent) != s[a].textContent) {
                                                    g = !1;
                                                    break
                                                }
                                            }
                                        }
                                        for (a = 0; a < s.length; a++) s[a].classList.contains("selected") && ((isEmptyLadiPage(_) || "value" == _) && (isEmptyLadiPage(s[a].getAttribute("data-value")) || c.push(s[a].getAttribute("data-value"))), "label" == _ && (l = s[a].getElementsByClassName("ladi-survey-option-label")[0], isEmptyLadiPage(l) || isEmptyLadiPage(s[a].textContent) || c.push(s[a].textContent)));
                                        return u = c.length <= 1 ? c[0] : g ? o(c) : c.join("; "), n(t, u, 0, g)
                                    }
                                    return s = d.querySelector('.ladi-form-item input[type="number"]'), isEmptyLadiPage(s) ? (u = window.ladi(i).value(null, null, {
                                        only_text: !0,
                                        text_trim: !0
                                    }), isArrayLadiPage(u) && (u = u.join("; ")), n(t, u)) : (u = s.value, n(t, u, 0, !0))
                                } catch (e) {
                                    return r(t, i)
                                }
                            }(i, l) + ";")
                        }), d.push("return " + a + ";");
                        var l = e.runFunctionString(d.join(""));
                        window.ladi(i).value(l, null, {
                            running_formula_data: !0
                        })
                    }
                };
            e.removeTimeout(e.runtime.tmp.timeout_set_formula_data_id), e.runtime.tmp.timeout_set_formula_data_id = e.runTimeout(function() {
                a.forEach(function(t) {
                    d(t, e.runtime.tmp.list_set_formula_data[t])
                })
            }, 50)
        }
    }
}, LadiPageScriptV2.prototype.setDataReplaceElement = function(t, e, i, a, n, o) {
    var r = isEmptyLadiPage(a) ? document : document.getElementById(a);
    if (!isEmptyLadiPage(r)) {
        for (var d = {
                list_only_key: o = isArrayLadiPage(o) ? o : []
            }, l = r.querySelectorAll("span[data-replace-str]"), s = 0; s < l.length; s++) {
            var c = l[s].getAttribute("data-replace-str");
            d.old_value = l[s].innerHTML, l[s].innerHTML = this.convertDataReplaceStr(c, !1, null, !1, i, !1, d)
        }
        for (var u = r.querySelectorAll("a[data-replace-href]"), p = 0; p < u.length; p++) {
            var m = u[p].getAttribute("data-replace-href");
            d.old_value = m, m = this.convertDataReplaceStr(m, !0, null, !1, i, !1, d), u[p].href = m
        }
        for (var _ = r.querySelectorAll(".ladi-element .ladi-form-item-container [name]"), g = 0; g < _.length; g++) {
            var y = null,
                h = null,
                f = !1,
                v = null,
                E = _[g].getAttribute("type");
            if (E = isEmptyLadiPage(E) ? E : E.trim(), t) {
                var P = _[g].getAttribute("name").trim();
                (f = !0) && -1 == n.indexOf(P) && (f = !1), f && "country" == P && "true" == _[g].getAttribute("data-is-select-country") && (f = !1), f && (y = this.getDataReplaceStr(P, i))
            }
            if (!f) {
                if (v = this.findAncestor(_[g], "ladi-element"), isEmptyLadiPage(v)) continue;
                var L = this.runtime.eventData[v.id];
                if (isEmptyLadiPage(L)) continue;
                var b = L["option.input_default_value"];
                if (isEmptyLadiPage(b)) continue;
                var A = !1;
                "INPUT" == _[g].tagName && "checkbox" == E && (A = !0), d.old_value = null, y = this.convertDataReplaceStr(b, !1, null, !1, i, A, d)
            }
            if (!isNullLadiPage(y)) {
                if (h = isArrayLadiPage(y) ? y[0] : y, h = isNullLadiPage(h) ? "" : h, h = String(h), "INPUT" == _[g].tagName)
                    if ("checkbox" == E || "radio" == E) {
                        var T = !1;
                        if ("checkbox" == E) {
                            var S = y;
                            isArrayLadiPage(S) || (S = [S]), T = -1 != S.indexOf(_[g].getAttribute("value"))
                        }
                        "radio" == E && (T = _[g].getAttribute("value") == h.trim()), T ? (_[g].checked = !0, e && _[g].setAttribute("checked", "checked")) : (_[g].checked = !1, e && _[g].removeAttribute("checked"));
                        var w = this.findAncestor(_[g], "ladi-form-checkbox-item");
                        if (!isEmptyLadiPage(w)) {
                            var O = w.querySelector("span");
                            isEmptyLadiPage(O) || O.setAttribute("data-checked", _[g].checked)
                        }
                    } else v = this.findAncestor(_[g], "ladi-element"), (isEmptyLadiPage(v) || "true" != v.getAttribute("data-quantity")) && (_[g].value = h.trim(), e && _[g].setAttribute("value", _[g].value));
                if ("TEXTAREA" == _[g].tagName && (_[g].value = h.trim(), e && (_[g].innerHTML = _[g].value)), "SELECT" == _[g].tagName) {
                    var C = _[g].querySelector('option[value="' + h.trim().replaceAll('"', '\\"') + '"]');
                    if (!isEmptyLadiPage(C) && (_[g].value = C.getAttribute("value"), e && !C.hasAttribute("selected"))) {
                        for (var k = _[g].querySelectorAll("option"), I = 0; I < k.length; I++) k[I].removeAttribute("selected");
                        C.setAttribute("selected", "selected")
                    }
                }
            }
        }
        for (var N = document.querySelectorAll(".ladi-element .ladi-image-background[data-replace-" + this.runtime.device + "-src]"), D = 0; D < N.length; D++) {
            var R = N[D].getAttribute("data-replace-" + this.runtime.device + "-src");
            d.old_value = R, R = this.convertDataReplaceStr(R, !0, null, !1, i, !1, d), R = decodeURIComponentLadiPage(R);
            this.findAncestor(N[D], "ladi-element");
            if (isEmptyLadiPage(R)) N[D].style.setProperty("background-image", "none");
            else {
                var x = this.findAncestor(N[D], "ladi-element");
                R = this.getOptimizeImage(R, x.clientWidth, x.clientHeight, !0, !1, !1, !0), N[D].style.setProperty("background-image", 'url("' + R + '")')
            }
        }
        this.runFormulaData()
    }
}, LadiPageScriptV2.prototype.setDataReplaceStart = function() {
    for (var t = this, e = document.querySelectorAll(".ladi-headline, .ladi-paragraph, .ladi-list-paragraph ul"), i = 0; i < e.length; i++) this.convertDataReplaceStr(e[i].innerHTML, !1, e[i], !0);
    var a = null,
        n = [];
    Object.keys(t.runtime.eventData).forEach(function(e) {
        var i = t.runtime.eventData[e];
        isObjectLadiPage(i) && i["option.data_formula.is_enable"] && !isEmptyLadiPage(i["option.data_formula.text"]) && t.convertDataReplaceStr(i["option.data_formula.text"], !1, null, !0, null, !1, {
            return_list_match: !0
        }).forEach(function(e) {
            var i = e.replaceAll(t.runtime.replaceNewPrefixStart, "").replaceAll(t.runtime.replaceNewPrefixEnd, "");
            n.push(i)
        })
    }), t.runtime.tmp.list_set_formula_data_watch = n;
    for (var o = function(e) {
            a = t.findAncestor(e.target, "ladi-element"), t.runFormulaData(a.id)
        }, r = document.querySelectorAll(".ladi-form > .ladi-element .ladi-form-item input, .ladi-form > .ladi-element .ladi-form-item textarea"), d = 0; d < r.length; d++) a = t.findAncestor(r[d], "ladi-element"), -1 == n.indexOf(a.id) && -1 == n.indexOf(a.id + ".value") && -1 == n.indexOf(a.id + ".label") && -1 == n.indexOf(a.id + ".country.value") && -1 == n.indexOf(a.id + ".country.label") || (r[d].addEventListener("input", o), r[d].addEventListener("change", o));
    var l = document.querySelectorAll(".ladi-form > .ladi-element .ladi-form-item select");
    for (d = 0; d < l.length; d++) a = t.findAncestor(l[d], "ladi-element"), -1 == n.indexOf(a.id) && -1 == n.indexOf(a.id + ".value") && -1 == n.indexOf(a.id + ".label") && -1 == n.indexOf(a.id + ".state.value") && -1 == n.indexOf(a.id + ".state.label") && -1 == n.indexOf(a.id + ".district.value") && -1 == n.indexOf(a.id + ".district.label") && -1 == n.indexOf(a.id + ".ward.value") && -1 == n.indexOf(a.id + ".ward.label") || l[d].addEventListener("change", o);
    this.setDataReplaceElement(!0, !0, null, null, Object.keys(this.runtime.replaceStr))
}, LadiPageScriptV2.prototype.runLimitRequest = function(t, e) {
    var i = this,
        a = 1e3 / t;
    if (i.runtime.tmp.time_limit_request_next > Date.now()) return i.runTimeout(function() {
        i.runLimitRequest(t, e)
    }, a / 5);
    i.runtime.tmp.time_limit_request_next = Date.now() + a, isFunctionLadiPage(e) && e()
}, LadiPageScriptV2.prototype.showMessage = function(t, e, i) {
    t = this.convertDataReplaceStr(t, !1, null, !1, e), this.showMessageModal(t, i)
}, LadiPageScriptV2.prototype.showMessageModal = function(t, e) {
    if (this.runtime.has_popupx) this.runtime.tmp.popupx_show_message_callback = e, this.runtime.tmp.runActionPopupX({
        lang: this.const.LANG,
        message: t,
        action: {
            type: "show_message"
        }
    });
    else {
        var i = document.getElementsByClassName("ladipage-message")[0];
        if (isEmptyLadiPage(i) || i.parentElement.removeChild(i), isEmptyLadiPage(t)) return void(isFunctionLadiPage(e) && e());
        (i = document.createElement("div")).className = "ladipage-message", document.body.appendChild(i);
        var a = document.createElement("div");
        a.className = "ladipage-message-box", i.appendChild(a);
        var n = document.createElement("span");
        a.appendChild(n), n.textContent = this.const.LANG.ALERT_TITLE;
        var o = document.createElement("div");
        o.className = "ladipage-message-text", a.appendChild(o), o.innerHTML = t;
        var r = document.createElement("button");
        r.className = "ladipage-message-close", a.appendChild(r), r.textContent = this.const.LANG.ALERT_BUTTON_TEXT, r.focus(), r.addEventListener("click", function(t) {
            t.stopPropagation(), i.parentElement.removeChild(i), isFunctionLadiPage(e) && e()
        })
    }
}, LadiPageScriptV2.prototype.getTextClipboard = function(t, e) {
    var i = function(i) {
            isFunctionLadiPage(e) && (i = isEmptyLadiPage(i) ? isEmptyLadiPage(t) ? "" : t : i, e(!0, i))
        },
        a = function() {
            try {
                var t = document.createElement("textarea");
                t.setAttribute("style", "position: fixed; top: 0, left: 0, width: 1px; height: 1px; opacity: 0;"), document.body.appendChild(t), t.focus();
                var a = document.execCommand("paste"),
                    n = t.value;
                if (t.parentElement.removeChild(t), a) return void i(n)
            } catch (t) {}
            isFunctionLadiPage(e) && e(!1, null)
        };
    window.navigator.clipboard ? window.navigator.clipboard.readText().then(i).catch(a) : a()
}, LadiPageScriptV2.prototype.copyTextClipboard = function(t, e) {
    var i = function() {
            isFunctionLadiPage(e) && e(!0, t)
        },
        a = function() {
            try {
                var a = document.createElement("textarea");
                a.setAttribute("style", "position: fixed; top: 0, left: 0, width: 1px; height: 1px; opacity: 0;"), document.body.appendChild(a), a.value = t, a.select();
                var n = document.execCommand("copy");
                if (a.parentElement.removeChild(a), n) return void i()
            } catch (t) {}
            isFunctionLadiPage(e) && e(!1, null)
        };
    window.navigator.clipboard ? window.navigator.clipboard.writeText(t).then(i).catch(a) : a()
}, LadiPageScriptV2.prototype.fireEvent = function(t, e, i) {
    t = isStringLadiPage(t) ? document.querySelector(t) : t;
    var a = document.createEvent("HTMLEvents");
    (a.initEvent(e, !0, !0), isObjectLadiPage(i)) && Object.keys(i).forEach(function(t) {
        a[t] = i[t]
    });
    return !t.dispatchEvent(a)
}, LadiPageScriptV2.prototype.tapEventListener = function(t, e) {
    var i = this,
        a = function(t) {
            isFunctionLadiPage(e) && e(t)
        };
    if (t.addEventListener("click", a), "ontouchstart" in window) {
        var n = 0,
            o = 0,
            r = i.getWidthDevice(),
            d = Math.max(1, Math.floor(.01 * r)),
            l = null;
        t.addEventListener("touchstart", function(e) {
            e = i.getEventCursorData(e), i.removeTimeout(l), n = e.screenX, o = e.screenY, t.removeEventListener("click", a)
        }, i.runtime.scrollEventPassive), t.addEventListener("touchend", function(e) {
            e = i.getEventCursorData(e), Math.abs(e.screenX - n) <= d && Math.abs(e.screenY - o) <= d && a(e), l = i.runTimeout(function() {
                t.addEventListener("click", a)
            }, i.runtime.time_click)
        })
    }
}, LadiPageScriptV2.prototype.findAncestor = function(t, e) {
    e = isArrayLadiPage(e) ? e : [e];
    for (var i = function(t, e) {
            if (!isNullLadiPage(t) && (isNullLadiPage(t.classList) || !t.classList.contains(e)))
                for (;
                    (t = t.parentElement) && !t.classList.contains(e););
            return t
        }, a = 0; a < e.length && (t = i(t, e[a]), !isEmptyLadiPage(t)); a++);
    return t
}, LadiPageScriptV2.prototype.disableStyleElement = function(t) {
    var e = document.getElementById(t);
    isEmptyLadiPage(e) || e.setAttribute("media", "print")
}, LadiPageScriptV2.prototype.enableStyleElement = function(t) {
    var e = document.getElementById(t);
    isEmptyLadiPage(e) || e.removeAttribute("media")
}, LadiPageScriptV2.prototype.createStyleElement = function(t, e) {
    var i = document.getElementById(t);
    return isEmptyLadiPage(i) && ((i = document.createElement("style")).id = t, i.type = "text/css", document.head.appendChild(i)), i.innerHTML != e && (i.innerHTML = e), i
}, LadiPageScriptV2.prototype.createTmpElement = function(t, e, i, a, n) {
    var o = null;
    (o = "svg" == t.toLowerCase() ? document.createElementNS("http://www.w3.org/2000/svg", t) : document.createElement(t), isEmptyLadiPage(i)) || Object.keys(i).forEach(function(t) {
        o.setAttribute(t, i[t])
    });
    var r = document.createElement("div");
    return r.appendChild(o), a ? o.outerHTML = e : o.innerHTML = e, n ? r : r.firstChild
}, LadiPageScriptV2.prototype.getSource2ndClick = function(t) {
    var e = this.runtime.eventData[t];
    if (!isEmptyLadiPage(e)) return "image" == e.type && e[this.runtime.device + ".option.image_setting.2nd_click"] ? e[this.runtime.device + ".option.image_setting.source_2nd_click"] : "shape" == e.type && e["option.shape_setting.2nd_click"] ? e[this.runtime.device + ".option.shape_setting.source_2nd_click"] : void 0
}, LadiPageScriptV2.prototype.getCountdownTime = function(t, e) {
    var i = Math.floor(t / 1e3),
        a = i % 86400,
        n = a % 3600,
        o = Math.floor(i / 86400),
        r = Math.floor(a / 3600),
        d = Math.floor(n / 60),
        l = n % 60;
    o = o < 0 ? 0 : o, r = r < 0 ? 0 : r, d = d < 0 ? 0 : d, l = l < 0 ? 0 : l, o = o < 10 ? "0" + o : o, r = r < 10 ? "0" + r : r, d = d < 10 ? "0" + d : d, l = l < 10 ? "0" + l : l;
    var s = {};
    return s[this.const.COUNTDOWN_ITEM_TYPE.day] = o, s[this.const.COUNTDOWN_ITEM_TYPE.hour] = r, s[this.const.COUNTDOWN_ITEM_TYPE.minute] = d, s[this.const.COUNTDOWN_ITEM_TYPE.seconds] = l, isEmptyLadiPage(e) ? s : s[e]
}, LadiPageScriptV2.prototype.getElementBoundingClientRect = function(t) {
    isStringLadiPage(t) && (t = document.getElementById(t));
    var e = t.getBoundingClientRect();
    return (isNullLadiPage(e.x) || isNullLadiPage(e.y)) && (e.x = e.left, e.y = e.top), e
}, LadiPageScriptV2.prototype.getElementViewBox = function(t) {
    var e = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        i = t.getAttribute("viewBox").split(" ");
    return e.x = parseFloatLadiPage(i[0]) || 0, e.y = parseFloatLadiPage(i[1]) || 0, e.width = parseFloatLadiPage(i[2]) || 0, e.height = parseFloatLadiPage(i[3]) || 0, e
}, LadiPageScriptV2.prototype.getEventCursorData = function(t) {
    return ["pageX", "pageY", "screenX", "screenY"].forEach(function(e) {
        isNullLadiPage(t[e]) && (!isEmptyLadiPage(t.touches) && t.touches.length > 0 ? t[e] = t.touches[0][e] : !isEmptyLadiPage(t.targetTouches) && t.targetTouches.length > 0 ? t[e] = t.targetTouches[0][e] : !isEmptyLadiPage(t.changedTouches) && t.changedTouches.length > 0 && (t[e] = t.changedTouches[0][e]))
    }), t
}, LadiPageScriptV2.prototype.getElementAHref = function(t, e) {
    var i = document.createElement("a");
    return !e || t.toLowerCase().startsWith("http://") || t.toLowerCase().startsWith("https://") || t.startsWith("//") || (t = "http://" + t), i.href = t, i
}, LadiPageScriptV2.prototype.loadScript = function(t, e, i, a, n) {
    var o = document.createElement("script");
    (o.type = "text/javascript", isFunctionLadiPage(i) && (a = i, i = e, e = null), i && (o.async = !0), isObjectLadiPage(e)) && Object.keys(e).forEach(function(t) {
        "defer" == t || "async" == t ? o[t] = e[t] : o.setAttribute(t, e[t])
    });
    o.addEventListener("load", a), o.src = t, isObjectLadiPage(n) && n.hasOwnProperty("elm") ? n.elm.appendChild(o) : document.head.appendChild(o)
}, LadiPageScriptV2.prototype.loadCss = function(t, e) {
    var i = document.createElement("link");
    (i.rel = "stylesheet", isObjectLadiPage(e)) && Object.keys(e).forEach(function(t) {
        i.setAttribute(t, e[t])
    });
    i.href = t, document.head.appendChild(i)
}, LadiPageScriptV2.prototype.showLoadingBlur = function() {
    var t = this;
    t instanceof LadiPageScriptV2 || (t = LadiPageScript);
    var e = document.getElementsByClassName("ladi-loading")[0];
    isEmptyLadiPage(e) && ((e = document.createElement("div")).className = "ladi-loading", e.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>', document.body.appendChild(e))
}, LadiPageScriptV2.prototype.hideLoadingBlur = function() {
    var t = this;
    t instanceof LadiPageScriptV2 || (t = LadiPageScript);
    var e = document.getElementsByClassName("ladi-loading")[0];
    isEmptyLadiPage(e) || e.parentElement.removeChild(e)
}, LadiPageScriptV2.prototype.isLoadingBlur = function() {
    var t = document.getElementsByClassName("ladi-loading")[0];
    return !isEmptyLadiPage(t)
}, LadiPageScriptV2.prototype.randomId = function() {
    var t = Date.now(),
        e = window.performance && window.performance.now && 1e3 * window.performance.now() || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(i) {
        var a = 16 * Math.random();
        return t > 0 ? (a = (t + a) % 16 | 0, t = Math.floor(t / 16)) : (a = (e + a) % 16 | 0, e = Math.floor(e / 16)), ("x" === i ? a : 3 & a | 8).toString(16)
    })
}, LadiPageScriptV2.prototype.decodeValue = function(t) {
    var e = this;
    isObjectLadiPage(t) && Object.keys(t).forEach(function(i) {
        t[i] = e.decodeValue(t[i])
    });
    if (isArrayLadiPage(t))
        for (var i = 0; i < t.length; i++) t[i] = e.decodeValue(t[i]);
    return isStringLadiPage(t) && (t = t.decode()), t
}, LadiPageScriptV2.prototype.convertInfoDetailProductLadiSales = function(t, e) {
    var i = null;
    if (!isEmptyLadiPage(t))
        if (t.hasAttribute("data-product-id") && t.hasAttribute("data-product-active")) i = t.getAttribute("data-product-active");
        else {
            var a = this.findAncestor(t, ["ladi-checkout-product", "ladi-element"]);
            isEmptyLadiPage(a) || (i = a.getAttribute("data-product-active"))
        } if (!isEmptyLadiPage(i)) try {
        i = JSON.parse(i);
        var n = this.copy(e);
        return n.variants = n.variants.filter(function(t) {
            return i.includes(t.product_variant_id)
        }), n
    } catch (t) {}
    return e
}, LadiPageScriptV2.prototype.handleActionProductTemplate = function() {
    var t = this,
        e = function() {
            let e = t.runtime.tmp.list_product_details || [],
                i = t.runtime.tmp.discount_info_cart_detail || {},
                a = t.runtime.tmp.promotions_info_sample_product || [],
                n = document.getElementById("estimated-total-in-cart"),
                o = document.getElementById("product-qty-in-cart"),
                r = document.getElementById("total-amount-in-cart"),
                d = document.getElementById("price-final-cart"),
                l = document.getElementById("value-discount-price-in-cart"),
                s = document.getElementById("value-discount-coupon-code-in-cart"),
                c = 0,
                u = 0,
                p = 0,
                m = 0,
                _ = 0;
            e && e.length > 0 ? (e.forEach(t => {
                c += t.quantity * t.price, _ += t.quantity
            }), i && i.discount_price ? (u = c - i.discount_price, m = i.discount_price) : u = c, a && a.length > 0 && (u -= p = i && 0 == i.allow_promotion ? 0 : a.reduce((t, e) => e.discount ? 1 == e.discount.type ? e.price <= e.discount.value ? t : t + e.price * (e.discount.value / 100) * e.quantity : e.price <= e.discount.value ? t : t + e.discount.value * e.quantity : t, 0)), u <= 0 && (u = 0), n.innerHTML = t.formatCurrency(c, t.runtime.currency, !0), o.innerHTML = _ + " " + t.const.LANG.PRODUCT, r.innerHTML = t.formatCurrency(u, t.runtime.currency, !0), d.innerHTML = t.formatCurrency(u, t.runtime.currency, !0), l.innerHTML = "-" + t.formatCurrency(p, t.runtime.currency, !0), s.innerHTML = "-" + t.formatCurrency(m, t.runtime.currency, !0)) : (n.innerHTML = t.formatCurrency(0, t.runtime.currency, !0), o.innerHTML = _ + " " + t.const.LANG.PRODUCT, r.innerHTML = t.formatCurrency(u, t.runtime.currency, !0), d.innerHTML = t.formatCurrency(u, t.runtime.currency, !0), l.innerHTML = "-" + t.formatCurrency(0, t.runtime.currency, !0), s.innerHTML = "-" + t.formatCurrency(0, t.runtime.currency, !0))
        },
        i = function(e) {
            let i = document.querySelector("#popup-detail-cart-checkout .list-products .list");
            if (e && e.length > 0) {
                let a = e.map(e => {
                    return `\n                    <div class="product-item" data-product-id="${e.product_id}">\n                        <div class="product-image">\n                             <img src="${renderImageProduct(e.src)}" alt="">\n                        </div>\n                        <div class="product-info">\n                            <div class="flex items-start gap-8 space-between">\n                                <p class="pr-name">${e.product_name}</p>\n                                <div class="action-delete-product" onclick="handleDeleteProductItem(event,${e.product_variant_id})">\n                                    <i class="ldicon icon-delete"></i>\n                                </div>\n                            </div>\n                            <div class="pr-variants" style="display: ${e.options&&e.options.length>0?"block":"none"}">\n                                ${renderOptionsProduct(e.options)}\n                            </div>\n                            <div class="group-quantity-price">\n                                <div class="quantity">\n                                    <div class="btn down" onclick="increateQtyCartProduct(event, -1, ${e.product_variant_id})">\n                                        <i class="ldicon icon-remove"></i>\n                                    </div>\n                                    <input type="number" value="${e.quantity}" onChange="handleChangeQtyProductItem(event, ${e.product_variant_id})">\n                                    <div class="btn up" onclick="increateQtyCartProduct(event, 1, ${e.product_variant_id})">\n                                        <i class="ldicon icon-add"></i>\n                                    </div>\n                                </div>\n                                <div class="price">\n                                    ${e.price_compare>0?`<span class="price-compare">${t.formatCurrency(e.price_compare,t.runtime.currency,!0)}</span>`:""}\n                                    <span>${t.formatCurrency(e.price,t.runtime.currency,!0)}</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                `
                }).join("");
                i ? i.innerHTML = a : console.log(t.const.LANG.ELEMENT_NOT_FOUND)
            } else {
                let e = `\n                <div class="empty-cart-product">\n                    <div class="image-empty-cart">\n                        <img src="https://w.ladicdn.com/ladiui/icons/cart-empty.svg" width="128" height="128" alt="">\n                    </div>\n                    <p>${t.const.LANG.NO_PRODUCTS_IN_CART}</p>\n                </div>\n            `;
                i.innerHTML = e
            }
            let a = document.getElementById("count-qty-product-in-cart"),
                n = document.getElementById("title-cart-quantity"),
                o = 0;
            e.forEach(t => {
                t.quantity && (o += t.quantity)
            }), a && (a.innerHTML = o || 0), n && o > 0 && (n.innerHTML = `(${o})`)
        },
        a = function(i, a) {
            let n = [];
            if (a && a.length > 0 && (a.forEach(t => {
                    let e = {
                        product_variant_id: t && t.product_variant_id ? t.product_variant_id : null,
                        quantity: t && t.quantity ? t.quantity : null
                    };
                    n.push(e)
                }), n && n.length > 0)) {
                var o = window.ladi("_cart_token").get_cookie(),
                    r = {
                        "Content-Type": "application/json"
                    };
                isEmptyLadiPage(o) || (r["cart-token"] = o), t.sendRequest("POST", t.const.API_LADISALE_PROMOTION, JSON.stringify({
                    variants: n
                }), !0, r, function(a, n, o) {
                    if (o.readyState == XMLHttpRequest.DONE) try {
                        var r = JSON.parse(a);
                        if (200 == n && 200 == r.code && isObjectLadiPage(r.data) && isArrayLadiPage(r.data.variants)) return r.data && r.data.variants.length > 0 && (t.runtime.tmp.promotions_info_sample_product = r.data.variants), void(i ? W() : e());
                        200 == n && 201 == n || t.showMessage(r.message)
                    } catch (t) {
                        console.log("catch error promotion", t)
                    }
                })
            }
        },
        n = function(n) {
            let o = (n || []).filter(t => t.quantity >= 1);
            if (i(o), t.runtime.tmp.list_product_details = o, a(!1, o), !o || 0 == o.length) {
                e(), document.getElementById("title-cart-quantity").innerHTML = ""
            }
            let r = 0;
            o.forEach(t => {
                t.quantity && (r += t.quantity)
            }), LadiPageScript.setDataReplaceStr("cart_quantity", r), LadiPageScript.setDataReplaceElement(!1);
            let d = document.getElementById("button-cart-buy-now");
            d && (o && 0 != o.length ? (d.style.opacity = 1, d.style.pointerEvents = "unset") : (d.style.opacity = .5, d.style.pointerEvents = "none")), localStorage.setItem("data_checkout_products" + t.runtime.ladipage_id, JSON.stringify(o))
        };
    window.increateQtyCartProduct = function(e, i, a) {
        e.preventDefault(), e.stopPropagation();
        let o = t.runtime.tmp.list_product_details || [];
        o && o.length > 0 && o.forEach(e => {
            if (e.product_variant_id == a)
                if (-1 == i && 1 == e.quantity) {
                    t.showMessage(`\n                        <style>\n                            .ladipage-message-close {\n                                display: none !important;\n                            }\n                            .ladipage-message .ladipage-message-box>span {\n                                display: none;\n                            }\n                            .top-header-modal-waring-delete-product {\n                                padding-bottom: 16px;\n                            }\n                            .top-header-modal-waring-delete-product h3 {\n                                font-weight: bold;\n                                font-size: 1.125rem;\n                                line-height: 20px;\n                                color: #0E233C;\n                                \n                            }\n                            .content-modal-waring-delete-product {\n                                padding: 24px 0;\n                                border-top: 1px solid #E7E9EB;\n                            }\n                            \n                            .ladipage-message .ladipage-message-box {\n                                height: max-content;\n                            }\n                            \n                            .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product {\n                                display: flex;\n                                justify-content: end;\n                                padding: 20px 0;\n                                border-top: 1px solid #E7E9EB;\n                            }\n                            \n                            .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn {\n                                display: flex;\n                                align-items: center;\n                                gap: 16px;\n                            }\n                            \n                            .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn button {\n                                padding: 10px 16px;\n                                border-radius: 4px;\n                                font-weight: 400;\n                                font-size: 14px;\n                                line-height: 20px;\n                                cursor: pointer;\n                            }\n                            \n                            .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn .cancel {\n                                background-color: #F3F4F5;\n                                color: #0E233C;\n                            }\n                            .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn .confirm {\n                                background-color: #1C00C2;\n                                color: #fff;\n                            }\n                            \n                            @media screen and (max-width: 768px) {\n                                .ladipage-message .ladipage-message-box .ladipage-message-text {\n                                    display: inline-block !important;\n                                }\n                            }\n                            \n                            \n                            \n                        </style>\n                        \n                        <div class="top-header-modal-waring-delete-product">\n                            <h3>${t.const.LANG.NOTIFICATION}</h3>\n                            <div class="close-icon" id="action-close-modal-waring-delete-product">\n                                <i class="ldicon-circle-close-fill"></i>\n                            </div>\n                        </div>\n                        <div class="content-modal-waring-delete-product">\n                            <p>${t.const.LANG.MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART}</p>\n                        </div>\n                        <div class="footer-modal-waring-delete-product">\n                            <div class="group-btn">\n                                <button class="cancel" id="btn-cancel-increaseQty" type="button">${t.const.LANG.CANCEL}</button>\n                                <button class="confirm" type="button" id="btn-confirm-increaseQty">${t.const.LANG.CONFIRM}</button>\n                            </div>\n                        </div>\n                    `);
                    let a = document.getElementById("btn-cancel-increaseQty"),
                        r = document.getElementById("btn-confirm-increaseQty");
                    a && a.addEventListener("click", function(t) {
                        t.stopPropagation();
                        let e = document.querySelectorAll(".ladipage-message-close");
                        e && e.forEach(function(t) {
                            t.click()
                        })
                    }), r && r.addEventListener("click", function(t) {
                        t.stopPropagation(), e.quantity += i, n(o);
                        let a = document.querySelectorAll(".ladipage-message-close");
                        a && a.forEach(function(t) {
                            t.click()
                        })
                    })
                } else e.quantity += i, n(o)
        })
    }, window.renderImageProduct = function(t) {
        let e = "";
        return t ? e = t && t.includes("https://w.ladicdn.com") ? t : `https://w.ladicdn.com/${t}` : "https://w.ladicdn.com/ladiui/icons/new-ldicon-photo.svg"
    }, window.renderOptionsProduct = function(t) {
        if (t && t.length > 0) return t.map(t => `\n                    <span>${t.option_value_value.name}</span>\n                `).join(",")
    }, window.handleDeleteProductItem = function(n, o) {
        n.preventDefault(), n.stopPropagation();
        let r = t.runtime.tmp.list_product_details || [];
        t.showMessage(`\n            <style>\n                .ladipage-message-close {\n                    display: none !important;\n                }\n                .ladipage-message .ladipage-message-box>span {\n                    display: none;\n                }\n                .top-header-modal-waring-delete-product {\n                    padding-bottom: 16px;\n                }\n                .top-header-modal-waring-delete-product h3 {\n                    font-weight: bold;\n                    font-size: 1.125rem;\n                    line-height: 20px;\n                    color: #0E233C;\n                    \n                }\n                .content-modal-waring-delete-product {\n                    padding: 24px 0;\n                    border-top: 1px solid #E7E9EB;\n                }\n                \n                .ladipage-message .ladipage-message-box {\n                    height: max-content;\n                }\n                \n                .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product {\n                    display: flex;\n                    justify-content: end;\n                    padding: 20px 0;\n                    border-top: 1px solid #E7E9EB;\n                }\n                \n                .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn {\n                    display: flex;\n                    align-items: center;\n                    gap: 16px;\n                }\n                \n                .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn button {\n                    padding: 10px 16px;\n                    border-radius: 4px;\n                    font-weight: 400;\n                    font-size: 14px;\n                    line-height: 20px;\n                    cursor: pointer;\n                }\n                \n                .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn .cancel {\n                    background-color: #F3F4F5;\n                    color: #0E233C;\n                }\n                .ladipage-message .ladipage-message-box .footer-modal-waring-delete-product .group-btn .confirm {\n                    background-color: #1C00C2;\n                    color: #fff;\n                }\n                \n                @media screen and (max-width: 768px) {\n                    .ladipage-message .ladipage-message-box .ladipage-message-text {\n                        display: inline-block !important;\n                    }\n                }\n                \n                \n            </style>\n            \n            <div class="top-header-modal-waring-delete-product">\n                <h3>${t.const.LANG.NOTIFICATION}</h3>\n                <div class="close-icon" id="action-close-modal-waring-delete-product">\n                    <i class="ldicon-circle-close-fill"></i>\n                </div>\n            </div>\n            <div class="content-modal-waring-delete-product">\n                <p>${t.const.LANG.MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART}</p>\n            </div>\n            <div class="footer-modal-waring-delete-product">\n                <div class="group-btn">\n                    <button class="cancel" id="btn-cancel-delete-product" type="button">${t.const.LANG.CANCEL}</button>\n                    <button class="confirm" type="button" id="btn-confirm-delete-product">${t.const.LANG.CONFIRM}</button>\n                </div>\n            </div>\n        `);
        let d = document.getElementById("btn-confirm-delete-product");
        d && d.addEventListener("click", function(n) {
            n.stopPropagation();
            let d = r.filter(t => t.product_variant_id != o);
            if (i(d), t.runtime.tmp.list_product_details = d, a(!1, d), !d || 0 == d.length) {
                e(), document.getElementById("title-cart-quantity").innerHTML = ""
            }
            let l = 0;
            d.forEach(t => {
                t.quantity && (l += t.quantity)
            }), LadiPageScript.setDataReplaceStr("cart_quantity", l), LadiPageScript.setDataReplaceElement(!1);
            let s = document.getElementById("button-cart-buy-now");
            s && (d && 0 != d.length ? (s.style.opacity = 1, s.style.pointerEvents = "unset") : (s.style.opacity = .5, s.style.pointerEvents = "none")), localStorage.setItem("data_checkout_products" + t.runtime.ladipage_id, JSON.stringify(d));
            let c = document.querySelectorAll(".ladipage-message-close");
            c && c.forEach(function(t) {
                t.click()
            })
        });
        let l = document.getElementById("btn-cancel-delete-product");
        l && l.addEventListener("click", function(t) {
            t.stopPropagation();
            let e = document.querySelectorAll(".ladipage-message-close");
            e && e.forEach(function(t) {
                t.click()
            })
        })
    }, window.handleChangeQtyProductItem = function(e, i) {
        e.preventDefault(), e.stopPropagation();
        let a = Number(e.target.value),
            o = t.runtime.tmp.list_product_details || [];
        o && o.length > 0 && i && (o.forEach(t => {
            t.product_variant_id == i && (t.quantity = a && a > 0 ? a : 1)
        }), n(o))
    };
    let o = document.querySelectorAll(".ladi-checkout-product");
    o.length > 0 && o.forEach(e => {
        let n = e.getElementsByClassName("ladi-checkout-product-add-to-cart"),
            o = e.getElementsByClassName("overlay-checkout-product");
        o.length > 0 && Array.from(o).forEach(t => t.remove()), n.length > 0 && (n[0].style.cursor = "pointer", n[0].addEventListener("click", function(n) {
            let o = null,
                r = JSON.parse(localStorage.getItem("data_checkout_products" + t.runtime.ladipage_id)),
                d = r && r.length > 0 ? r : [];
            var l = t.findAncestor(n.target, ["ladi-checkout-product", "ladi-element"]);
            let s = e.getElementsByClassName("ladi-checkout-quantity-input");
            l && (o = l.getAttribute("data-product-id")), t.getInfoDetailProductLadiSales(o, !0, function(o) {
                o = t.convertInfoDetailProductLadiSales(e, o);
                let r = null;
                if (-1 == (r = o.options && 0 != o.options.length ? t.getCheckoutProductVariantIndex(o, t.findAncestor(e, "ladi-element")) : 0)) return void t.showMessage(t.const.LANG.PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART);
                document.querySelector(".ladi-checkout-product-add-to-cart");
                let l = n.currentTarget;
                l.querySelector(".ladi-element.ladi-button-headline");
                if (l) {
                    l.style.pointerEvents = "none";
                    let t = l.querySelector(".ladi-button .ladi-button-shape"),
                        e = l.querySelector(".ladi-button .ladi-button-headline"),
                        i = l.querySelector(".ladi-button");
                    if (t && (t.style.display = "none"), e && (e.style.display = "none"), i) {
                        const t = document.createElement("div");
                        t.innerHTML = '\n                            <div class="loading-dots">\n                              <p>•</p>\n                              <p>•</p>\n                              <p>•</p>\n                            </div>\n                       ', i.appendChild(t.firstElementChild)
                    }
                }
                setTimeout(() => {
                    let e = o.variants[r],
                        n = {
                            product_name: e ? e.product_name : "",
                            product_variant_id: e ? e.product_variant_id : null,
                            price: e ? e.price : 0,
                            price_compare: e ? e.price_compare : 0,
                            product_type: e ? e.product_type : "",
                            option_name: e && e.option_name ? e.option_name : "",
                            product_id: e ? e.product_id : null,
                            quantity: s && s[0].value ? Number(s[0].value) : 1,
                            src: e ? e.src : "",
                            options: e && e.options ? e.options : [],
                            min_buy: e ? e.min_buy : "",
                            max_buy: e ? e.max_buy : ""
                        };
                    e && "Service" == e.product_type && (n.min_buy = 1, n.max_buy = null, 1 == e.inventory_checked && (n.max_buy = e.total_quantity));
                    let c = d.find(t => t.product_variant_id == n.product_variant_id);
                    c ? d.forEach(t => {
                        t.product_variant_id === c.product_variant_id && (t.quantity = t.quantity + n.quantity)
                    }) : d.push(n), i(d), t.runtime.tmp.list_product_details = d;
                    let u = 0;
                    d.forEach(t => {
                        t.quantity && (u += t.quantity)
                    });
                    let p = document.getElementById("popup-detail-cart-checkout");
                    var m = document.getElementById("backdrop-detail-cart-container");
                    if (p && (p.classList.toggle("show"), p.style.visibility = "visible", document.body.classList.toggle("open-cart-hidden-overflow")), "none" === m.style.display || "" == m.style.display ? m.style.display = "block" : m.style.display = "none", LadiPageScript.setDataReplaceStr("cart_quantity", u), LadiPageScript.setDataReplaceElement(!1), localStorage.setItem("data_checkout_products" + t.runtime.ladipage_id, JSON.stringify(d)), a(!1, d), l) {
                        let t = l.querySelector(".ladi-button .ladi-button-shape"),
                            e = l.querySelector(".ladi-button .ladi-button-headline"),
                            i = l.querySelector(".ladi-button .loading-dots");
                        t && (t.style.display = "table"), e && (e.style.display = "table"), i && i.remove(), l.style.pointerEvents = "unset"
                    }
                    let _ = document.getElementById("button-cart-buy-now");
                    _ && (d && 0 != d.length ? (_.style.opacity = 1, _.style.pointerEvents = "unset") : (_.style.opacity = .5, _.style.pointerEvents = "none"))
                }, 1e3)
            })
        }));
        let r = e.getElementsByClassName("ladi-checkout-product-buy-now");
        r && (r[0].style.cursor = "pointer", r[0].addEventListener("click", i => {
            let n = document.getElementById("backdrop-modal-payment-order"),
                o = null,
                r = [];
            var d = t.findAncestor(i.target, ["ladi-checkout-product", "ladi-element"]);
            let l = e.getElementsByClassName("ladi-checkout-quantity-input");
            d && (o = d.getAttribute("data-product-id")), isEmptyLadiPage(o) && t.showMessage(t.const.LANG.PLEASE_CONFIGURE_YOUR_PRODUCT), t.getInfoDetailProductLadiSales(o, !0, function(i) {
                let o = null;
                if (-1 == (o = (i = t.convertInfoDetailProductLadiSales(e, i)).options && 0 != i.options.length ? t.getCheckoutProductVariantIndex(i, t.findAncestor(e, "ladi-element")) : 0)) return void t.showMessage(t.const.LANG.PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BUY);
                let d = i.variants[o],
                    s = {
                        product_name: d ? d.product_name : "",
                        product_variant_id: d ? d.product_variant_id : null,
                        price: d ? d.price : 0,
                        price_compare: d ? d.price_compare : 0,
                        product_type: d ? d.product_type : "",
                        option_name: d ? d.option_name : "",
                        product_id: d ? d.product_id : null,
                        quantity: l && l[0].value ? Number(l[0].value) : 1,
                        src: d ? d.src : "",
                        options: d && d.options ? d.options : [],
                        min_buy: d ? d.min_buy : "",
                        max_buy: d ? d.max_buy : ""
                    };
                d && "Service" == d.product_type && (s.min_buy = 1, s.max_buy = null, 1 == d.inventory_checked && (s.max_buy = d.total_quantity)), r = [s], t.runtime.tmp.list_product_details = r, a(!0, r), n && (n.style.display = "flex", document.body.style.overflow = "hidden", z())
            });
            var s = document.getElementById("popup-detail-cart-checkout");
            s && s.classList.remove("show");
            let c = LadiPageScript.runtime.payment_setting.list_payment || [],
                u = LadiPageScript.runtime.list_payment_gateways || [];
            document.getElementById("list-payment-methods-modal-payment-order");
            D = u.find(t => "VN_PAY" == t.code), R = u.find(t => "APPOTA" == t.code), x = u.find(t => "ALE_PAY" == t.code), B = u.find(t => "VNPT_EPAY" == t.code), LadiPageScript.runtime.tmp.is_buy_now_cart_sample_product = !0, V(c)
        }))
    });
    var r = function(i, a) {
        try {
            let n = window.ladi("_cart_token").get_cookie(),
                o = {
                    "Content-Type": "application/json"
                };
            isEmptyLadiPage(n) || (o["cart-token"] = n);
            let r = t.runtime.tmp.list_product_details || [],
                d = document.getElementById("city-modal-payment-order").value,
                l = document.getElementById("district-modal-payment-order").value,
                s = document.querySelector("#list-shipping-methods-modal-payment .shipping-method-item.checked"),
                c = null;
            s && (c = s.getAttribute("shipping-method-id"));
            let u = {
                domain: "",
                path: "",
                path_type: "product",
                discount_code: i,
                discount_shipping_code: a,
                shipping_state_id: d || null,
                shipping_district_id: l || null,
                shipping_method_id: c || null,
                variants: r
            };
            t.sendRequest("POST", t.const.API_LADISALE_VALIDATE_COUPON_CODE, JSON.stringify(u), !0, o, function(i, a, n) {
                if (n.readyState == XMLHttpRequest.DONE) try {
                    var o = JSON.parse(i);
                    if (200 == a) {
                        if (200 == o.code) {
                            let i = t.runtime.tmp.is_choose_discount_type,
                                a = document.getElementById("cart-block-discount-coupon"),
                                n = document.getElementById("title-coupon-code"),
                                r = document.getElementById("value-coupon-code-slide-cart"),
                                d = document.getElementById("payment-block-discount-coupon"),
                                l = (document.getElementById("title-coupon-code-payment"), document.getElementById("value-coupon-code-payment"));
                            if (isObjectLadiPage(o.data) && i)
                                if ("Cart" == i) a && a.setAttribute("data-coupon-code", o.data.discount_code), n && (n.textContent = o.data.discount_code), r && (r.textContent = "-" + t.formatCurrency(o.data.discount_price, t.runtime.currency, !0));
                                else if (d && (o.data.discount_code && d.setAttribute("data-coupon-code", o.data.discount_code), o.data.discount_shipping ? d.setAttribute("data-coupon-shipping-code", o.data.discount_shipping.code) : d.removeAttribute("data-coupon-shipping-code")), l) {
                                if (o.data.discount_price) {
                                    let e = l.querySelector("span.title");
                                    e && e.remove();
                                    let i = l.querySelector("span.value-discount.order");
                                    if (i) i.textContent = `-${t.formatCurrency(o.data.discount_price,t.runtime.currency,!0)}`;
                                    else {
                                        let e = `<span class="value-discount order">-${t.formatCurrency(o.data.discount_price,t.runtime.currency,!0)}</span>`;
                                        l.innerHTML += e
                                    }
                                }
                                if (o.data.discount_shipping) {
                                    let e = l.querySelector("span.title");
                                    e && e.remove();
                                    let i = l.querySelector("span.value-discount.shipping");
                                    if (i) i.innerHTML = `<img src="https://w.ladicdn.com/ladiui/icons/ldicon-shipping-2.svg" width="16" height="16" /> -${t.formatCurrency(o.data.discount_shipping.fee,t.runtime.currency,!0)}`;
                                    else {
                                        let e = `<span class="value-discount shipping">\n                                                            <img src="https://w.ladicdn.com/ladiui/icons/ldicon-shipping-2.svg" width="16" height="16" />\n                                                            -${t.formatCurrency(o.data.discount_shipping.fee,t.runtime.currency,!0)}\n                                                        </span>`;
                                        l.innerHTML = e + l.innerHTML
                                    }
                                }
                            }
                            if (t.runtime.tmp.discount_info_cart_detail = o.data, i)
                                if ("Cart" == i) {
                                    e();
                                    let t = document.getElementById("popup-detail-discount-cart-checkout-product"),
                                        i = document.getElementById("backdrop-slide-discount-cart-checkout-product");
                                    t && t.classList.toggle("show"), i && (i.style.display = "none"), t.addEventListener("transitionend", v)
                                } else {
                                    let t = document.getElementById("backdrop-modal-coupon-payment-order");
                                    t && (t.style.display = "none"), W()
                                } return document.getElementById("input-enter-coupon-code-slide-cart").value = "", void(document.getElementById("input-enter-coupon-code").value = "")
                        }
                        t.showMessage(o.message)
                    }
                    200 == a && 201 == a || t.showMessage(o.message)
                } catch (t) {
                    console.log("err", t)
                }
            })
        } catch (t) {
            console.log("err validateCouponCode", t)
        }
    };
    window.handleClickCouponItemOrderPayment = function(t, e) {
        document.querySelectorAll(".coupon-item.order").forEach(function(t) {
            t.classList.remove("checked")
        }), t.classList.add("checked")
    }, window.handleClickCouponItemShippingPayment = function(t, e) {
        document.querySelectorAll(".coupon-item.shipping").forEach(function(t) {
            t.classList.remove("checked")
        }), t.classList.add("checked")
    };
    var d = async function(e) {
        e.stopPropagation();
        let i = document.getElementById("backdrop-modal-coupon-payment-order");
        i && (i.style.display = "flex");
        let a = LadiPageScript.runtime.isUseShippingMethodCheckoutProduct,
            n = document.querySelector(".modal-coupon-payment-order .list-coupons.shipping"),
            o = document.getElementById("city-modal-payment-order").value,
            r = document.getElementById("district-modal-payment-order").value,
            d = document.querySelector("#list-shipping-methods-modal-payment .shipping-method-item.checked"),
            l = null;
        d && (l = d.getAttribute("shipping-method-id")), a ? o && r && l && n && (n.style.display = "block") : n && (n.style.display = "none");
        let s = t.runtime.store_id_int;
        t.runtime.tmp.is_choose_discount_type = "Payment";
        let c = window.ladi("_cart_token").get_cookie(),
            u = {
                "Content-Type": "application/json"
            };
        isEmptyLadiPage(c) || (u["cart-token"] = c);
        let _ = {
                store_id: s
            },
            g = [],
            y = [];
        await t.sendRequest("POST", t.const.API_LADISALE_LIST_COUPON_CODE, JSON.stringify(_), !0, u, function(e, i, a) {
            try {
                if (a.readyState == XMLHttpRequest.DONE && 200 == i) {
                    var n = JSON.parse(e);
                    200 == n.code && isObjectLadiPage(n.data) && (g = n.data.discounts || [], y = n.data.discountsShipping || [], function() {
                        let t = document.querySelector(".modal-coupon-payment-order #list-coupons-order-modal-payment"),
                            e = null,
                            i = document.getElementById("payment-block-discount-coupon");
                        if (i && (e = i.getAttribute("data-coupon-code")), g && g.length > 0) {
                            let i = g.map(t => `\n                        <div class="coupon-item order ${e&&e===t.code?"checked":""}"  data-coupon-code=${t.code} onclick="handleClickCouponItemOrderPayment(this, '${t.code}')">\n                            <div class="title-desc">\n                                <h3>${t.code}</h3>\n                                ${p(t)}\n                            </div>\n                            <div class="action">\n                                <div class="radio-custom"></div>\n                            </div>\n                        </div>\n                    `).join("");
                            t && (t.innerHTML = i)
                        }
                    }(), function() {
                        let e = document.querySelector(".modal-coupon-payment-order #list-coupons-shipping-modal-payment"),
                            i = null,
                            a = document.getElementById("payment-block-discount-coupon");
                        if (a && (i = a.getAttribute("data-coupon-shipping-code")), y && y.length > 0) {
                            let t = y.map(t => `\n                        <div class="coupon-item shipping ${i&&i===t.code?"checked":""}"  data-coupon-code=${t.code} onclick="handleClickCouponItemShippingPayment(this, '${t.code}')">\n                            <div class="title-desc">\n                                <h3>${t.code}</h3>\n                                ${m(t)}\n                            </div>\n                            <div class="action">\n                                <div class="radio-custom"></div>\n                            </div>\n                        </div>\n                    `).join("");
                            e && (e.innerHTML = t)
                        } else t.const.LANG.NOTHING_DISCOUNT_COUPON_CODE
                    }())
                }
                throw new TypeError("error")
            } catch (t) {}
        })
    };
    let l = document.getElementById("action-close-modal-coupon-payment-order");
    l && l.addEventListener("click", function() {
        let t = document.getElementById("backdrop-modal-coupon-payment-order");
        t && (t.style.display = "none")
    });
    let s = document.getElementById("btn-confirm-coupon-code");
    s && s.addEventListener("click", function(e) {
        e.stopPropagation();
        let i = null,
            a = null,
            n = document.querySelector("#list-coupons-order-modal-payment .coupon-item.checked"),
            o = document.querySelector("#list-coupons-shipping-modal-payment .coupon-item.checked");
        if (n && (i = n.getAttribute("data-coupon-code")), o && (a = o.getAttribute("data-coupon-code")), !i && !a) return t.showMessage(t.const.LANG.PLEASE_SELECT_DISCOUNT_COUPON_CODE);
        r(i, a)
    });
    const c = document.getElementById("button-apply-coupon-code-input");
    c && c.addEventListener("click", t => {
        t.stopPropagation();
        let e = document.getElementById("input-enter-coupon-code").value;
        r(e.toUpperCase(), null)
    }), window.handleClickCouponItemCart = function(t, e) {
        document.querySelectorAll(".coupon-item").forEach(function(t) {
            t.classList.remove("checked")
        }), t.classList.add("checked")
    };
    var u = function(e) {
            return 1 == e.type ? t.formatCurrency(e.value, "%", !0) : t.formatCurrency(e.value, t.runtime.currency, !0)
        },
        p = function(e) {
            let i = null;
            return i = e.apply_to[1] ? `<p>${t.const.LANG.DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART.format(u(e))}</p>` : e.apply_to[2] ? `<p>${t.const.LANG.DISCOUNT_TYPE_TAG_PRODUCT_IN_CART.format(u(e))}</p>` : `<p>${t.const.LANG.DISCOUNT_TYPE_PRODUCT_IN_CART.format(u(e))}</p>`
        },
        m = function(e) {
            return `<p>${t.const.LANG.DISCOUNT_VALUE_SHIPPING_FEE.format(u(e))}</p>`
        },
        _ = document.getElementById("btn-apply-coupon-slide-cart");
    _ && _.addEventListener("click", function() {
        let t = document.querySelector("#list-coupons-slide-cart-product-checkout .coupon-item.checked");
        if (t) {
            let e = t.getAttribute("data-coupon-code");
            r(e, null)
        }
    });
    var g = document.getElementById("button-apply-input-coupon-code-slide-cart");
    g && g.addEventListener("click", t => {
        t.stopPropagation();
        let e = document.getElementById("input-enter-coupon-code-slide-cart").value;
        r(e.toUpperCase(), null)
    });
    var y = document.getElementById("action-show-popup-coupon-code-slide-cart");
    y && y.addEventListener("click", function(e) {
        e.stopPropagation(), e.preventDefault(), t.runtime.tmp.is_choose_discount_type = "Cart";
        let i = document.getElementById("popup-detail-discount-cart-checkout-product"),
            a = document.getElementById("backdrop-slide-discount-cart-checkout-product");
        i && (i.classList.toggle("show"), i.style.visibility = "visible"), a && (a.style.display = "block");
        let n = window.ladi("_cart_token").get_cookie(),
            o = {
                "Content-Type": "application/json"
            };
        isEmptyLadiPage(n) || (o["cart-token"] = n);
        let r = {
            store_id: t.runtime.store_id_int
        };
        t.sendRequest("POST", t.const.API_LADISALE_LIST_COUPON_CODE, JSON.stringify(r), !0, o, function(e, i, a) {
            try {
                if (a.readyState == XMLHttpRequest.DONE && 200 == i) {
                    var n = JSON.parse(e);
                    if (200 == n.code && isObjectLadiPage(n.data)) {
                        ! function(e) {
                            let i = document.getElementById("list-coupons-slide-cart-product-checkout"),
                                a = null,
                                n = document.getElementById("cart-block-discount-coupon");
                            if (n && (a = n.getAttribute("data-coupon-code")), e && e.length > 0) {
                                let t = e.map(t => `\n                        <div class="coupon-item ${a&&a===t.code?"checked":""}"  data-coupon-code=${t.code} onclick="handleClickCouponItemCart(this, '${t.code}')">\n                            <div class="title-desc">\n                                <h3>${t.code}</h3>\n                                ${p(t)}\n                            </div>\n                            <div class="action">\n                                <div class="radio-custom"></div>\n                            </div>\n                        </div>\n                    `).join("");
                                i && (i.innerHTML = t)
                            } else t.const.LANG.NOTHING_DISCOUNT_COUPON_CODE
                        }(n.data.discounts || [])
                    }
                }
                throw new TypeError("error")
            } catch (t) {}
        })
    });
    var h = document.getElementById("action-close-slide-discount-cart");
    h && h.addEventListener("click", function(t) {
        t.preventDefault(), t.stopPropagation();
        let e = document.getElementById("popup-detail-discount-cart-checkout-product"),
            i = document.getElementById("backdrop-slide-discount-cart-checkout-product");
        e && e.classList.toggle("show"), i && (i.style.display = "none"), e.addEventListener("transitionend", v)
    });
    var f = document.getElementById("action-close-slide-discount-cart-bottom");
    f && f.addEventListener("click", function(t) {
        t.preventDefault(), t.stopPropagation();
        let e = document.getElementById("popup-detail-discount-cart-checkout-product"),
            i = document.getElementById("backdrop-slide-discount-cart-checkout-product");
        e && e.classList.toggle("show"), i && (i.style.display = "none"), e.addEventListener("transitionend", v)
    });
    var v = function(t) {
            let e = document.getElementById("popup-detail-discount-cart-checkout-product");
            "right" !== t.propertyName && "opacity" !== t.propertyName || (e.style.visibility = "hidden", e.removeEventListener("transitionend", v))
        },
        E = document.getElementById("payment-action-show-popup-coupon-code");
    E && E.addEventListener("click", t => d(t));
    var P = document.getElementById("close-popup-detail-cart-checkout");
    P && P.addEventListener("click", function(t) {
        t.stopPropagation(), t.preventDefault();
        var e = document.getElementById("popup-detail-cart-checkout"),
            i = document.getElementById("backdrop-detail-cart-container");
        e && (e.classList.toggle("show"), document.body.classList.remove("open-cart-hidden-overflow")), i && (i.style.display = "none"), e.addEventListener("transitionend", L)
    });
    var L = function(t) {
        var e = document.getElementById("popup-detail-cart-checkout");
        "right" !== t.propertyName && "opacity" !== t.propertyName || (e.style.visibility = "hidden", e.removeEventListener("transitionend", L))
    };
    let b = LadiPageScript.runtime.isUseShippingMethodCheckoutProduct,
        A = document.getElementById("payment-block-shipping-methods"),
        T = document.querySelector(".modal-payment-order-checkout .block-address-shipping-payment"),
        S = document.getElementById("cart-item-shipping-methods-fee"),
        w = document.getElementById("cart-item-value-discout-shipping-methods");
    b ? T && (T.style.display = "block") : (T && (T.style.display = "none"), A && (A.style.display = "none"), S && (S.style.display = "none"), w && (w.style.display = "none"));
    var O = null,
        C = null,
        k = null,
        I = null,
        N = null,
        D = null,
        R = null,
        x = null,
        B = null,
        M = null,
        q = function(t) {
            let e = LadiPageScript.runtime.list_payment_gateways || [];
            if (e && e.length > 0) return e.find(function(e) {
                return e.code == t.payment_code
            })
        };
    window.handleClickPaymentMethodItem = function(t, e) {
        if (t) t.stopPropagation();
        else {
            let i = document.querySelector(".payment-method-item");
            i && (e = encodeURIComponent(JSON.stringify(q({
                code: i.getAttribute("payment-method-code")
            }))), t = {
                currentTarget: i,
                stopPropagation: function() {}
            })
        }
        let i = document.querySelectorAll(".payment-method-item"),
            a = JSON.parse(decodeURIComponent(e));
        i.forEach(function(t) {
            t.classList.remove("checked");
            let e = t.querySelector(".payment-method-item-detail .detail-content");
            e && (e.style.display = "none")
        });
        let n = t.currentTarget;
        if (n) {
            n.classList.add("checked");
            let t = n.querySelector(".payment-method-item-detail .detail-content");
            t && (t.style.display = "block")
        }
        a && (M = a, "COD" === a.code ? (I = "Thanh toán khi giao hàng (COD)", N = null) : "MOMO" === a.code ? (I = "Thanh toán qua ví MOMO", N = null) : "BANK" === a.code ? (I = "Chuyển khoản qua ngân hàng", N = null) : "SHOPEE_PAY" === a.code ? (I = "Thanh toán qua ShopeePay", N = null) : "PAYPAL" === a.code ? (I = "Thanh toán qua PayPal", N = null) : "STRIPE" === a.code && (I = "Thanh toán qua Stripe", N = null)), F()
    };
    var F = function() {
        const t = document.querySelector(`div[data-method="${M.code}"]`);
        if (t) {
            const e = t.querySelector(".payment-guide");
            e && (e.style.display = "block")
        }
        Y()
    };
    window.handleClickDetailPaymentItem = function(t) {
        let e = t.currentTarget;
        t.stopPropagation(), "LABEL" === t.target.tagName && t.preventDefault(), document.querySelectorAll(".ladiui-checkout-payment-item").forEach(t => {
            t.classList.remove("selected")
        }), document.querySelectorAll('.ladiui-checkout-payment-item input[type="radio"]').forEach(t => {
            t.checked = !1
        }), document.querySelectorAll(".ladiui-checkout-payment-body-list-bank").forEach(t => {
            t.style.display = "none"
        }), e.classList.add("selected");
        const i = e.querySelector('input[type="radio"]');
        i && (i.checked = !0);
        const a = e.querySelector(".ladiui-checkout-payment-body-list-bank");
        if (a) {
            a.style.display = "block";
            const t = a.querySelector("li"),
                e = a.querySelector("li.active");
            t && !e && t.classList.add("active");
            const i = a.querySelector("li.active");
            k = i ? i.getAttribute("data-value") : null
        } else k = null;
        const n = e.querySelector("label");
        n && (N = n.textContent.trim()), C = U('input[name="item-payment-method-radio"]:checked')
    };
    var U = function(t) {
        const e = document.querySelector(t);
        return e ? e.id : null
    };
    var V = function(t) {
            let e = document.getElementById("list-payment-methods-modal-payment-order");
            if (t && t.length > 0) {
                let i = t.map(t => {
                    let e = q(t);
                    return `\n                    <div class="payment-method-item" payment-method-code="${e.code}" onclick="handleClickPaymentMethodItem(event, '${encodeURIComponent(JSON.stringify(e))}')">\n                        <div class="content">\n                            <div class="icon-name-payment">\n                                <div class="image">\n                                    <img src="${e.src}" alt="" />\n                                </div>\n                                <div class="name">\n                                    <p>${e.display_name}</p>\n                                </div>\n                            </div>\n                            <span class="action-payment-check"></span>\n                        </div>\n                        ${function(t){switch(t.code){case"VN_PAY":return'\n           <div class="payment-method-item-detail" data-method="VN_PAY">\n                <div class="detail-content" data-method-detail="VN_PAY" style="display: none;">\n                    <div class="ladiui-checkout-payment-item" data-attribute="VNPAYQR" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                        <div\n                            class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                            <span class="flex items-center">\n                                <div class="flex items-center">\n                                    <input type="radio" id="VNPAYQR" name="item-payment-method-radio"\n                                        class="ladiui form-check-input m-0">\n                                </div>\n                                <label class="ml-8" for="VNPAYQR">Sử dụng mã QR Code</label>\n                            </span>\n                        </div>\n                    </div>\n                    <div class="ladiui-checkout-payment-item border-top" data-attribute="bank_code" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                        <div\n                            class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                            <span class="flex items-center">\n                                <div class="flex items-center">\n                                    <input type="radio" id="bank_code" name="item-payment-method-radio"\n                                        class="ladiui form-check-input m-0 ">\n                                </div>\n                                <label class="ml-8" for="bank_code"> Thanh toán bằng mã thẻ ATM</label>\n                            </span>\n                        </div>\n                        <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                            <div class="ladiui-checkout-list-payments">\n                                <ul id="bankListVnPay"></ul>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="ladiui-checkout-payment-item border-top" data-attribute="INTCARD" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                        <div\n                            class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                            <span class="flex items-center">\n                                <div class="flex items-center"><input type="radio" id="INTCARD"\n                                        name="item-payment-method-radio" class="ladiui form-check-input m-0 ">\n                                </div>\n                                <label class="ml-8" for="INTCARD">Thanh toán bằng thẻ Visa / Master Card</label>\n                            </span>\n                        </div>\n                        <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                            <div class="ladiui-checkout-list-payments">\n                                <ul>\n                                    <li href="#" class="ladiui-checkout-bank-1" data-value="VISA"><img\n                                            src="https://w.ladicdn.com/ladisales/banks/bank-visa.svg"\n                                            alt=""><span>Visa</span></li>\n                                    <li href="#" class="ladiui-checkout-bank-2" data-value="MASTERCARD"><img\n                                            src="https://w.ladicdn.com/ladisales/banks/bank-mastercard.svg"\n                                            alt=""><span>Master Card</span></li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ';case"APPOTA":return'\n                    <div class="payment-method-item-detail" data-method="APPOTA">\n                        <div class="detail-content" data-method-detail="APPOTA" style="display: none;">\n\n                            <div class="ladiui-checkout-payment-item border-top" data-attribute="QRCODE" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center">\n                                            <input type="radio" id="QRCODE" name="item-payment-method-radio"\n                                                class="ladiui form-check-input m-0 ">\n                                        </div>\n                                        <label class="ml-8" for="QRCODE">Thanh toán qua QR Code động</label>\n                                    </span>\n                                </div>\n                            </div>\n\n                            <div class="ladiui-checkout-payment-item" data-attribute="ATM" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center">\n                                            <input type="radio" id="ATM" name="item-payment-method-radio"\n                                                class="ladiui form-check-input m-0 ">\n                                        </div>\n                                        <label class="ml-8" for="ATM">Thanh toán qua iBanking/thẻ ATM</label>\n                                    </span>\n                                </div>\n                                <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                    <div class="ladiui-checkout-list-payments">\n                                        <ul id="bankListAppotaPay"></ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="ladiui-checkout-payment-item border-top" data-attribute="CC" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center">\n                                            <input type="radio" id="CC" name="item-payment-method-radio"\n                                                class="ladiui form-check-input m-0 ">\n                                        </div>\n                                        <label class="ml-8" for="CC">Thanh toán qua thẻ Visa/Master Card</label>\n                                    </span>\n                                </div>\n                                <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                    <div class="ladiui-checkout-list-payments">\n                                        <ul>\n                                            <li href="#" class="ladiui-checkout-bank-1" data-value="VISA"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-visa.svg"\n                                                    alt=""><span>Visa</span></li>\n                                            <li href="#" class="ladiui-checkout-bank-2" data-value="MASTERCARD"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-mastercard.svg"\n                                                    alt=""><span>Master Card</span></li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="ladiui-checkout-payment-item border-top" data-attribute="EWALLET" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center">\n                                            <input type="radio" id="EWALLET" name="item-payment-method-radio"\n                                                class="ladiui form-check-input m-0 ">\n                                        </div>\n                                        <label class="ml-8" for="EWALLET">Thanh toán qua ví điện tử</label>\n                                    </span>\n                                </div>\n                                <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                    <div class="ladiui-checkout-list-payments">\n                                        <ul>\n                                            <li href="#" class="ladiui-checkout-bank-1" data-value="APPOTA"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-appota-wallet.svg"\n                                                    alt=""><span>Ví Appota</span>\n                                            </li>\n                                            <li href="#" class="ladiui-checkout-bank-2" data-value="MOMO"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-momo-wallet.svg"\n                                                    alt=""><span>Ví Momo</span>\n                                            </li>\n                                            <li href="#" class="ladiui-checkout-bank-3" data-value="SHOPEEPAY">\n                                                <img src="https://w.ladicdn.com/ladisales/banks/bank-shopee-wallet.svg"\n                                                    alt="">\n                                                <span>Ví ShopeePay</span>\n                                            </li>\n                                            <li href="#" class="ladiui-checkout-bank-4" data-value="VNPTPAY"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-vnpt-wallet.svg"\n                                                    alt=""><span>Ví VNPT Pay</span>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="ladiui-checkout-payment-item border-top" data-attribute="VA" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center">\n                                            <input type="radio" id="VA" name="item-payment-method-radio"\n                                                class="ladiui form-check-input m-0 ">\n                                        </div>\n                                        <label class="ml-8" for="VA">Chuyển khoản qua ngân hàng (tự động xác nhận\n                                            đơn)</label>\n                                    </span>\n                                </div>\n                                <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                    <div class="ladiui-checkout-list-payments">\n                                        <ul>\n                                            <li href="#" class="ladiui-checkout-bank-1" data-value="MARITIMEBANK"><img\n                                                    src="https://w.ladicdn.com/ladisales/banks/bank-msb.svg"\n                                                    alt=""><span>MARITIMEBANK</span></li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class="ladiui-checkout-payment-item border-top" data-attribute="MM" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                <div\n                                    class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer">\n                                    <span class="flex items-center">\n                                        <div class="flex items-center"><input type="radio" id="MM"\n                                                name="item-payment-method-radio" class="ladiui form-check-input m-0 ">\n                                        </div><label class="ml-8" for="MM">Mobile Money</label>\n                                    </span></div>\n                                <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                    <div class="ladiui-checkout-list-payments">\n                                        <ul>\n                                            <li href="#" class="ladiui-checkout-bank-1" data-value="VINAPHONE">\n                                                <img src="https://w.ladicdn.com/ladisales/banks/bank-vinaphone.svg"\n                                                    alt="">\n                                                <span>Nhà mạng Vinaphone</span>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                ';case"ALE_PAY":return'\n                    <div class="payment-method-item-detail" data-method="ALE_PAY">\n                            <div class="detail-content" data-method-detail="ALE_PAY" style="display: none;">\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="VISA" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="VISA" class="ladiui form-check-input m-0"\n                                                                                  name="item-payment-method-radio"></div><label class="ml-8" for="VISA">Thanh\n                                                toán bằng thẻ Visa / Master Card</label>\n                                        </span>\n                                    </div>\n                                    <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                        <div class="ladiui-checkout-list-payments">\n                                            <ul>\n                                                <li href="#" class="ladiui-checkout-bank-1" data-value="VISA"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-visa.svg"\n                                                        alt=""><span>Visa</span></li>\n                                                <li href="#" class="ladiui-checkout-bank-2" data-value="MASTERCARD"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-mastercard.svg"\n                                                        alt=""><span>Master Card</span></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item alepay" data-attribute="ATM" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="ATM" class="ladiui form-check-input alepay m-0"\n                                                        name="item-payment-method-radio"></div><label class="ml-8" for="ATM"> Thanh toán\n                                                bằng mã thẻ ATM</label>\n                                        </span></div>\n                                    <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                        <div class="ladiui-checkout-list-payments">\n                                            <ul id="bankListAlePay"></ul>\n\n                                        </div>\n                                    </div>\n                                </div>\n                                \n                                \x3c!-- <div class="ladiui-checkout-payment-item border-top" data-attribute="INSTALLMENT" style="display: none;">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center">\n                                                <input type="radio" id="payment-zalopay-INSTALLMENT" class="ladiui form-check-input m-0"\n                                                       name="item-payment-method-radio">\n                                            </div>\n                                            <label class="ml-8" for="payment-zalopay-INSTALLMENT">Thanh toán trả góp</label>\n                                        </span>\n                                    </div>\n                                    \n                                </div> --\x3e\n                            </div>\n                    </div>\n                ';case"VNPT_EPAY":return'\n                    <div class="payment-method-item-detail" data-method="VNPT_EPAY">\n                            <div class="detail-content" data-method-detail="VNPT_EPAY" style="display: none;">\n                                <div class="ladiui-checkout-payment-item " data-attribute="ZALO" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="ZALO" name="item-payment-method-radio" class="ladiui form-check-input m-0">\n                                            </div><label class="ml-8" for="ZALO">Thanh toán qua ví ZaloPay</label>\n                                        </span></div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="MOMO" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="MOMO" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="MOMO">Thanh toán qua ví Momo</label>\n                                        </span></div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="MOCA" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="MOCA" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="MOCA">Thanh toán qua ví Moca/ Grab Pay</label>\n                                        </span></div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="DC" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="DC" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="DC"> Thanh toán thẻ ATM/ Internet Banking</label>\n                                        </span></div>\n                                    <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                        <div class="ladiui-checkout-list-payments">\n                                            <ul id="bankListVNPTEPay"></ul>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="IC" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="IC" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="IC">Thanh toán thẻ Visa/ Master Card/ JCB</label>\n                                        </span>\n                                    </div>\n                                    <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                        <div class="ladiui-checkout-list-payments">\n                                            <ul>\n                                                <li href="#" class="ladiui-checkout-bank-1" data-value="VISA"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-visa.svg"\n                                                        alt=""><span>Visa</span></li>\n                                                <li href="#" class="ladiui-checkout-bank-2" data-value="MASTERCARD"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-mastercard.svg"\n                                                        alt=""><span>Master Card</span></li>\n                                                <li href="#" class="ladiui-checkout-bank-2" data-value="JCB"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-jcb.svg"\n                                                        alt=""><span>JCB</span></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item vnpt_epay border-top" data-attribute="VA" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="VA" name="item-payment-method-radio" class="ladiui form-check-input vnpt_epay m-0 "></div><label\n                                            class="ml-8" for="VA">Chuyển khoản ngân hàng (kích hoạt ngay lập tức)</label>\n                                        </span></div>\n                                    <div class="ladiui-checkout-payment-body-list-bank" style="display: none;">\n                                        <div class="ladiui-checkout-list-payments">\n                                            <ul>\n                                                <li href="#" class="ladiui-checkout-bank-1" data-value="WRIM"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-woori.svg" alt=""><span>Woori Việt\n                                                        Nam</span></li>\n                                                <li href="#" class="ladiui-checkout-bank-2" data-value="BIDV"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-bidv.svg" alt=""><span>BIDV</span></li>\n                                                <li href="#" class="ladiui-checkout-bank-3" data-value="SHBM"><img\n                                                        src="https://w.ladicdn.com/ladisales/banks/bank-shinhan.svg" alt=""><span>Shinhan Bank\n                                                    </span></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="SHPP" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="SHPP" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="SHPP">Thanh toán qua ví ShopeePay</label>\n                                        </span></div>\n                                </div>\n                                <div class="ladiui-checkout-payment-item border-top" data-attribute="VTTP" style="display: none;" onclick="handleClickDetailPaymentItem(event)">\n                                    <div class="ladiui-checkout-payment-item-header ladiui-checkout-payment-item-header-show-2 cursor-pointer"><span class="flex items-center">\n                                            <div class="flex items-center"><input type="radio" id="VTTP" name="item-payment-method-radio" class="ladiui form-check-input m-0 "></div><label\n                                            class="ml-8" for="VTTP">Thanh toán qua ví ViettelPay</label>\n                                        </span></div>\n                                </div>\n                            </div>\n                    </div>\n                ';default:return""}}(e)}\n                    </div>\n                `
                }).join("");
                if (e) {
                    e.innerHTML = i;
                    const a = e.querySelector(".payment-method-item"),
                        n = q(t[0]);
                    if (a) {
                        const t = {
                            currentTarget: a,
                            stopPropagation: function() {}
                        };
                        window.handleClickPaymentMethodItem(t, encodeURIComponent(JSON.stringify(n)))
                    }
                } else console.log("Cannot find element")
            } else e.innerHTML = "";
            Y()
        },
        Y = function() {
            const t = document.getElementById("bankListVnPay"),
                e = document.getElementById("bankListAppotaPay"),
                i = document.getElementById("bankListAlePay"),
                a = document.getElementById("bankListVNPTEPay");
            t && (t.innerHTML = ""), e && (e.innerHTML = ""), i && (i.innerHTML = ""), a && (a.innerHTML = ""), t && D && D.banks && D.banks.forEach((e, i) => {
                const a = document.createElement("li");
                a.setAttribute("href", "#"), a.classList.add(`ladiui-checkout-bank-${i%4+1}`), a.setAttribute("data-value", e.bank_code), a.innerHTML = `\n                            <img src="${e.src}" alt="">\n                            <span>${e.name}</span>\n                            `, t.appendChild(a)
            }), e && R && R.appota_atm && R.appota_atm.forEach((t, i) => {
                const a = document.createElement("li");
                a.setAttribute("href", "#"), a.classList.add(`ladiui-checkout-bank-${i%4+1}`), a.setAttribute("data-value", t.bank_code), a.innerHTML = `\n                            <img src="${t.src}" alt="">\n                            <span>${t.name}</span>\n                            `, e.appendChild(a)
            }), i && x && x.banks && x.banks.forEach((t, e) => {
                const a = document.createElement("li");
                a.setAttribute("href", "#"), a.classList.add(`ladiui-checkout-bank-${e%4+1}`), a.setAttribute("data-value", t.bank_code), a.innerHTML = `\n                            <img src="${t.src}" alt="">\n                            <span>${t.name}</span>\n                            `, i.appendChild(a)
            }), a && B && B.banks && B.banks.forEach((t, e) => {
                const i = document.createElement("li");
                i.setAttribute("href", "#"), i.classList.add(`ladiui-checkout-bank-${e%4+1}`), i.setAttribute("data-value", t.bank_code), i.innerHTML = `\n                            <img src="${t.src}" alt="">\n                            <span>${t.name}</span>\n                            `, a.appendChild(i)
            }), document.querySelectorAll('.payment-method-item-detail[data-method="VN_PAY"] .ladiui-checkout-payment-item').forEach(t => {
                const e = t.getAttribute("data-attribute");
                D && D.config && D.config.active_payment_methods.includes(e) ? t.style.display = "block" : t.style.display = "none"
            }), document.querySelectorAll('.payment-method-item-detail[data-method="ALE_PAY"] .ladiui-checkout-payment-item').forEach(t => {
                const e = t.getAttribute("data-attribute");
                x && x.config && x.config.active_payment_methods.includes(e) ? t.style.display = "block" : t.style.display = "none"
            }), document.querySelectorAll('.payment-method-item-detail[data-method="APPOTA"] .ladiui-checkout-payment-item').forEach(t => {
                const e = t.getAttribute("data-attribute");
                R && R.config && R.config.active_payment_methods.includes(e) ? t.style.display = "block" : t.style.display = "none"
            }), document.querySelectorAll('.payment-method-item-detail[data-method="VNPT_EPAY"] .ladiui-checkout-payment-item').forEach(t => {
                const e = t.getAttribute("data-attribute");
                B && B.config && B.config.active_payment_methods.includes(e) ? t.style.display = "block" : t.style.display = "none"
            });
            const n = document.getElementById("bankListVnPay");
            n && n.addEventListener("click", function(t) {
                const e = t.target.closest("li");
                if (e) {
                    n.querySelectorAll("li").forEach(t => t.classList.remove("active")), e.classList.add("active");
                    const t = n.querySelector("li.active");
                    if (t) k = t.getAttribute("data-value");
                    else {
                        k = null;
                        const t = n.querySelector("li");
                        t && t.classList.add("active")
                    }
                }
            });
            const o = document.getElementById("bankListAppotaPay");
            o && o.addEventListener("click", function(t) {
                const e = t.target.closest("li");
                if (e) {
                    o.querySelectorAll("li").forEach(t => t.classList.remove("active")), e.classList.add("active");
                    const t = o.querySelector("li.active");
                    if (t) k = t.getAttribute("data-value");
                    else {
                        k = null;
                        const t = o.querySelector("li");
                        t && t.classList.add("active")
                    }
                }
            });
            const r = document.getElementById("bankListAlePay");
            r && r.addEventListener("click", function(t) {
                const e = t.target.closest("li");
                if (e) {
                    r.querySelectorAll("li").forEach(t => t.classList.remove("active")), e.classList.add("active");
                    const t = r.querySelector("li.active");
                    if (t) k = t.getAttribute("data-value");
                    else {
                        k = null;
                        const t = r.querySelector("li");
                        t && t.classList.add("active")
                    }
                }
            });
            const d = document.getElementById("bankListVNPTEPay");
            if (d && d.addEventListener("click", function(t) {
                    const e = t.target.closest("li");
                    if (e) {
                        d.querySelectorAll("li").forEach(t => t.classList.remove("active")), e.classList.add("active");
                        const t = d.querySelector("li.active");
                        if (t) k = t.getAttribute("data-value");
                        else {
                            k = null;
                            const t = d.querySelector("li");
                            t && t.classList.add("active")
                        }
                    }
                }), M && M.code) {
                const t = M.code.toLowerCase(),
                    e = M[t];
                e && e.type ? (O = M.code || null, C = e.type || null, k = e.bank_code || null, function() {
                    const t = document.getElementById(M.code);
                    t && (t.checked = !0);
                    const e = M.code.toLowerCase(),
                        i = M[e],
                        a = i && i.type ? document.getElementById(i.type) : null,
                        n = document.querySelector(`div[data-method="${M.code}"]`);
                    if (n) {
                        n.classList.add("select");
                        const t = n.querySelector(".detail-content");
                        t && (t.style.display = "block");
                        const e = n.querySelector(".payment-guide");
                        if (e && (e.style.display = "block"), "ALE_PAY" == M.code && i && "ATM" == i.type) {
                            const t = document.querySelector(".ladiui-checkout-payment-item.alepay");
                            if (t) {
                                const e = t.querySelector("input#ATM");
                                e.checked = !0, t.classList.add("selected");
                                const i = t.querySelector(".ladiui-checkout-payment-body-list-bank");
                                if (i) {
                                    i.style.display = "block";
                                    const t = i.querySelector(`li[data-value="${k}"]`);
                                    t && t.classList.add("active")
                                }
                            }
                        }
                        if ("VNPT_EPAY" == M.code && i && "VA" == i.type) {
                            const t = document.querySelector(".ladiui-checkout-payment-item.vnpt_epay");
                            if (t) {
                                const e = t.querySelector("input#VA");
                                e.checked = !0, t.classList.add("selected");
                                const i = t.querySelector(".ladiui-checkout-payment-body-list-bank");
                                if (i) {
                                    i.style.display = "block";
                                    const t = i.querySelector(`li[data-value="${k}"]`);
                                    t && t.classList.add("active")
                                }
                            }
                        } else if (a) {
                            a.checked = !0;
                            const t = a.closest(".ladiui-checkout-payment-item");
                            if (t) {
                                t.classList.add("selected");
                                const e = t.querySelector(".ladiui-checkout-payment-body-list-bank");
                                if (e) {
                                    e.style.display = "block";
                                    const t = e.querySelector(`li[data-value="${k}"]`);
                                    t && t.classList.add("active")
                                }
                            }
                        }
                    }
                }()) : (O = M.code || null, C = null, k = null, function() {
                    let t = null;
                    const e = document.querySelector(`div[data-method="${M.code}"]`);
                    if (e) {
                        e.classList.add("select");
                        const i = `.detail-content[data-method-detail="${M.code}"]`,
                            a = document.querySelectorAll(i);
                        if (a.forEach(e => {
                                if (e) {
                                    e.style.display = "block";
                                    const i = function() {
                                        const t = document.querySelector(`.detail-content[data-method-detail="${M.code}"]`);
                                        if (t) return t.querySelectorAll(".ladiui-checkout-payment-item");
                                        return []
                                    }();
                                    for (const e of i)
                                        if ("block" === window.getComputedStyle(e).display) {
                                            t = e;
                                            break
                                        }
                                }
                            }), t) {
                            t.classList.add("selected");
                            const e = t.querySelector('input[type="radio"]');
                            e && (e.checked = !0);
                            const i = t.querySelector("label");
                            i && (N = i.textContent.trim());
                            const a = t.querySelector(".ladiui-checkout-payment-body-list-bank");
                            if (a) {
                                a.style.display = "block";
                                const t = a.querySelector("li");
                                t && t.classList.add("active");
                                const e = a.querySelector("li.active");
                                k = e ? e.getAttribute("data-value") : null
                            }
                            C = U('input[name="item-payment-method-radio"]:checked')
                        }
                        const n = e.querySelector(".payment-guide");
                        n && (n.style.display = "block")
                    }
                }())
            }
            document.querySelectorAll(".ladiui-checkout-payment-body-list-bank li").forEach(t => {
                t.addEventListener("click", function(t) {
                    let e = t.currentTarget;
                    document.querySelectorAll(".ladiui-checkout-payment-body-list-bank li").forEach(t => t.classList.remove("active")), e.classList.add("active");
                    const i = e.closest(".ladiui-checkout-payment-body-list-bank");
                    if (i) {
                        i.style.display = "block";
                        const t = i.querySelector("li");
                        if (t) {
                            i.querySelector("li.active") || t.classList.add("active")
                        }
                        const e = i.querySelector("li.active");
                        k = e ? e.getAttribute("data-value") : null
                    }
                })
            })
        };
    let H = document.getElementById("action-close-modal-payment-order");
    H && H.addEventListener("click", e => {
        let i = document.getElementById("backdrop-modal-payment-order");
        JSON.parse(localStorage.getItem("data_checkout_products" + t.runtime.ladipage_id));
        i && (i.style.display = "none", document.body.style.overflow = "")
    });
    let j = document.getElementById("button-payment-order");
    j && j.addEventListener("click", e => {
        let i = document.getElementById("input-enter-fullname-customer"),
            a = document.getElementById("input-enter-email-customer"),
            n = document.getElementById("input-enter-phone-customer"),
            o = document.getElementById("input-enter-address-customer"),
            r = document.getElementById("city-modal-payment-order").value,
            d = document.getElementById("district-modal-payment-order").value,
            l = document.getElementById("ward-modal-payment-order").value,
            s = LadiPageScript.runtime.isUseShippingMethodCheckoutProduct;
        if (!i.value || !a.value || !n.value) {
            const t = document.querySelector(".modal-payment-order-checkout"),
                e = document.querySelector(".backdrop-modal-payment-order");
            return t.scrollTo({
                top: 0,
                behavior: "smooth"
            }), void e.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        if (s && !(r && d && l && o.value)) {
            const t = document.querySelector(".modal-payment-order-checkout"),
                e = document.querySelector(".backdrop-modal-payment-order");
            return t.scrollTo({
                top: 0,
                behavior: "smooth"
            }), void e.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        if (isEmptyLadiPage(O)) return t.showMessage("Vui lòng chọn phương thức thanh toán!");
        const c = {
                method_name: I,
                method_title: N,
                code: O || "",
                [O.toLowerCase()]: {
                    type: C || "",
                    bank_code: k || ""
                }
            },
            u = {
                name: i.value.trim(),
                email: a.value.trim(),
                phone: n.value.trim(),
                address: o.value.trim()
            };
        t.sendFormPaymentOrderSampleProduct(t.runtime.tmp.list_product_details, u, c)
    });
    let G = JSON.parse(localStorage.getItem("data_checkout_products" + t.runtime.ladipage_id));
    if (G && G.length > 0) {
        t.runtime.tmp.list_product_details = G, i(G);
        let e = 0;
        G.forEach(t => {
            t.quantity && (e += t.quantity)
        }), setTimeout(() => {
            LadiPageScript.setDataReplaceStr("cart_quantity", e), LadiPageScript.setDataReplaceElement(!1)
        }, 100)
    }
    var W = function() {
            let e = t.runtime.tmp.list_product_details || [],
                i = t.runtime.tmp.discount_info_cart_detail || {},
                a = t.runtime.tmp.promotions_info_sample_product || [],
                n = document.getElementById("total-amount-order-payment-product"),
                o = document.getElementById("estimated-total-in-payment"),
                r = document.getElementById("product-qty-in-payment"),
                d = document.getElementById("total-amount-in-payment"),
                l = document.getElementById("value-discount-price-in-payment"),
                s = document.getElementById("value-discount-coupon-code-in-payment"),
                c = document.getElementById("value-shipping-methods-fee"),
                u = document.getElementById("value-discount-code-shipping-methods"),
                p = document.querySelector("#list-shipping-methods-modal-payment .shipping-method-item.checked"),
                m = 0,
                _ = 0,
                g = 0,
                y = 0,
                h = 0;
            if (e && e.length > 0) {
                if (e.forEach(t => {
                        m += t.quantity * t.price, h += t.quantity
                    }), _ = m, i && i.discount_price && (_ -= i.discount_price, y = i.discount_price), i && i.discount_shipping && (_ -= i.discount_shipping.fee, u && (u.innerHTML = t.formatCurrency(i.discount_shipping.fee, t.runtime.currency, !0))), a && a.length > 0 && (_ -= g = i && 0 == i.allow_promotion ? 0 : a.reduce((t, e) => e.discount ? 1 == e.discount.type ? e.price <= e.discount.value ? t : t + e.price * (e.discount.value / 100) * e.quantity : e.price <= e.discount.value ? t : t + e.discount.value * e.quantity : t, 0)), p) {
                    let e = Number(p.getAttribute("value-shipping-method"));
                    _ += e, c && (c.innerHTML = t.formatCurrency(e, t.runtime.currency, !0))
                }
                _ <= 0 && (_ = 0), o.innerHTML = t.formatCurrency(m, t.runtime.currency, !0), r.innerHTML = h + " " + t.const.LANG.PRODUCT, n.innerHTML = t.formatCurrency(_, t.runtime.currency, !0), d.innerHTML = t.formatCurrency(_, t.runtime.currency, !0), l.innerHTML = "-" + t.formatCurrency(g, t.runtime.currency, !0), s.innerHTML = "-" + t.formatCurrency(y, t.runtime.currency, !0)
            } else o.innerHTML = t.formatCurrency(0, t.runtime.currency, !0), r.innerHTML = h + " " + t.const.LANG.PRODUCT, n.innerHTML = t.formatCurrency(_, t.runtime.currency, !0), d.innerHTML = t.formatCurrency(_, t.runtime.currency, !0), l.innerHTML = "-" + t.formatCurrency(0, t.runtime.currency, !0), s.innerHTML = "-" + t.formatCurrency(0, t.runtime.currency, !0)
        },
        z = function() {
            let e = t.runtime.tmp.list_product_details || [],
                i = document.getElementById("list-products-payment-order");
            if (e && e.length > 0) {
                let a = e.map(e => {
                    return `\n                    <div class="product-selected-item">\n                        <div>\n                            <div class="image">\n                                <img src="${renderImageProduct(e.src)}" alt="" />\n                            </div>\n                        </div>\n                        <div class="info-product">\n                            <div class="name-qty">\n                                <h3>${e.product_name}</h3>\n                                <span>x ${e.quantity}</span>\n                            </div>\n                            <div class="variants-price">\n                                <div class="variants" style="display: ${e.options&&e.options.length>0?"block":"none"}">\n                                    ${renderOptionsProduct(e.options)}\n                                </div>\n                                <strong class="price">${t.formatCurrency(e.price,t.runtime.currency,!0)}</strong>\n                            </div>\n                        </div>\n                        \n                    </div>\n                `
                }).join("");
                i && (i.innerHTML = a)
            }
            W()
        };
    let X = document.getElementById("button-cart-buy-now");
    X && X.addEventListener("click", function(e) {
        e.stopPropagation(), e.preventDefault();
        let i = document.getElementById("backdrop-modal-payment-order");
        if (i) {
            let e = t.runtime.tmp.discount_info_cart_detail;
            if (e && isObjectLadiPage(e)) {
                let i = document.getElementById("payment-block-discount-coupon"),
                    a = document.getElementById("title-coupon-code-payment"),
                    n = document.getElementById("value-coupon-code-payment");
                if (i && i.setAttribute("data-coupon-code", e.discount_code), a && (a.textContent = e.discount_code), n) {
                    let i = n.querySelector("span.title");
                    i && i.remove();
                    let a = n.querySelector("span.value-discount.order");
                    if (a) a.textContent = `-${t.formatCurrency(e.discount_price,t.runtime.currency,!0)}`;
                    else {
                        let i = `<span class="value-discount order">-${t.formatCurrency(e.discount_price,t.runtime.currency,!0)}</span>`;
                        n.innerHTML += i
                    }
                }
            }
            i.style.display = "flex", document.body.style.overflow = "hidden";
            let a = JSON.parse(localStorage.getItem("data_checkout_products" + t.runtime.ladipage_id));
            a && a.length > 0 && (t.runtime.tmp.list_product_details = a), z()
        }
        var a = document.getElementById("popup-detail-cart-checkout"),
            n = document.getElementById("backdrop-detail-cart-container");
        n && (n.style.display = "none"), a && a.classList.remove("show");
        let o = LadiPageScript.runtime.payment_setting.list_payment || [],
            r = LadiPageScript.runtime.list_payment_gateways || [];
        document.getElementById("list-payment-methods-modal-payment-order");
        D = r.find(t => "VN_PAY" == t.code), R = r.find(t => "APPOTA" == t.code), x = r.find(t => "ALE_PAY" == t.code), B = r.find(t => "VNPT_EPAY" == t.code), LadiPageScript.runtime.tmp.is_buy_now_cart_sample_product = !1, V(o)
    });
    const $ = document.getElementById("city-modal-payment-order"),
        K = document.getElementById("district-modal-payment-order"),
        J = document.getElementById("ward-modal-payment-order");
    let Q = {};
    var Z = function() {
        Object.values(Q).forEach(t => {
            const e = document.createElement("option");
            e.value = t.id, e.textContent = t.name, $.appendChild(e)
        })
    };
    $ && $ && $.addEventListener("change", function() {
        const t = this.value;
        let e = document.getElementById("payment-block-shipping-methods");
        e && (e.style.display = "none"),
            function(t) {
                const e = Object.values(Q).find(e => e.id == t);
                K.innerHTML = '<option value="">Chọn quận/huyện</option>', J.innerHTML = '<option value="">Chọn phường/xã</option>', e && e.data && Object.values(e.data).forEach(t => {
                    const e = document.createElement("option");
                    e.value = t.id, e.textContent = t.name, K.appendChild(e)
                })
            }(t)
    }), K && K.addEventListener("change", function() {
        ! function(t, e) {
            const i = Object.values(Q).find(t => t.id == e),
                a = Object.values(i.data).find(e => e.id == t);
            J.innerHTML = '<option value="">Chọn phường/xã</option>', a && a.data && Object.values(a.data).forEach(t => {
                const e = document.createElement("option");
                e.value = t.id, e.textContent = t.name, J.appendChild(e)
            })
        }(this.value, $.value), tt()
    });
    var tt = function() {
            try {
                let e = window.ladi("_cart_token").get_cookie(),
                    i = {
                        "Content-Type": "application/json"
                    };
                isEmptyLadiPage(e) || (i["cart-token"] = e);
                let a = null,
                    n = null;
                $ && $.value && (a = $.value), K && K.value && (n = K.value);
                let o = t.runtime.tmp.list_product_details || [],
                    r = {
                        store_id: LadiPageScript.runtime.store_id_int || null,
                        state_id: a,
                        district_id: n,
                        discount_code: "",
                        lang: "vi",
                        variants: o
                    };
                t.sendRequest("POST", t.const.API_LADISALE_GET_SHIPPING_METHODS, JSON.stringify(r), !0, i, function(e, i, a) {
                    if (a.readyState == XMLHttpRequest.DONE) try {
                        var n = JSON.parse(e);
                        if (200 == i) {
                            if (200 == n.code) {
                                let t = n.data.shipping_methods;
                                if (t && t.length > 0) {
                                    let e = document.getElementById("payment-block-shipping-methods");
                                    e && (e.style.display = "block"), et(t)
                                } else {
                                    let t = document.getElementById("payment-block-shipping-methods");
                                    t && (t.style.display = "none")
                                }
                                return
                            }
                            t.showMessage(n.message)
                        }
                        200 == i && 201 == i || t.showMessage(n.message)
                    } catch (t) {
                        console.log("err", t)
                    }
                })
            } catch (t) {
                console.log("err get shipping methods", t)
            }
        },
        et = function(e) {
            let i = document.getElementById("list-shipping-methods-modal-payment"),
                a = e.map((e, i) => {
                    return `\n                    <div class="shipping-method-item ${0===i?"checked":""}" shipping-method-id="${e.shipping_method_id}" value-shipping-method="${e.fee}" onclick="handleClickShippingMethodItem(event)">\n                        <div class="action-check-name">\n                            <div class="action-check"></div>\n                            <p class="name">${e.name}</p>\n                        </div>\n                        <div class="shipping-fee">${t.formatCurrency(e.fee,t.runtime.currency,!0)}</div>\n                    </div>\n                `
                }).join("");
            i ? (i.innerHTML = a, W()) : console.log("Cannot find element")
        };
    window.handleClickShippingMethodItem = function(t) {
        t.stopPropagation(), document.querySelectorAll("#list-shipping-methods-modal-payment .shipping-method-item").forEach(function(t) {
            t.classList.remove("checked")
        });
        let e = t.currentTarget;
        e && e.classList.add("checked"), W()
    }, LadiPageScript.runtime.isUseShippingMethodCheckoutProduct && async function() {
        try {
            const t = await fetch("https://w.ladicdn.com/v4/source/location.vn.min.js"),
                e = await t.text(),
                i = document.createElement("script");
            i.textContent = e, document.body.appendChild(i), Q = window.LadiLocation.VN.data || {}, document.body.removeChild(i), Z()
        } catch (t) {
            console.error("Error upload data:", t)
        }
    }(), LadiPageScript.setDataReplaceStr("cart_quantity", 0), LadiPageScript.setDataReplaceElement(!1);
    const it = document.querySelector(".ladi-checkout-product-cart-icon");
    let at = document.getElementById("popup-detail-cart-checkout"),
        nt = document.getElementById("backdrop-detail-cart-container");
    it && (it.style.cursor = "pointer", it.addEventListener("click", function() {
        if (at) {
            let e = JSON.parse(localStorage.getItem("data_checkout_products" + t.runtime.ladipage_id)),
                n = e && e.length > 0 ? e : [];
            n && n.length > 0 ? (t.runtime.tmp.list_product_details = n, i(n), a(!1, n)) : i([]), at.classList.toggle("show"), at.style.visibility = "visible", document.body.classList.toggle("open-cart-hidden-overflow"), "none" === nt.style.display || "" == nt.style.display ? nt.style.display = "block" : nt.style.display = "none"
        }
    }));
    let ot = document.querySelector(".ladi-checkout-product-cart-icon"),
        rt = document.querySelector(".popup-detail-cart-checkout .title-text-cart-header"),
        dt = document.getElementById("button-cart-buy-now"),
        lt = document.getElementById("popup-detail-discount-cart-checkout-product"),
        st = document.querySelector("#backdrop-modal-payment-order .modal-payment-order-checkout");
    if (ot) {
        let t = ot.getAttribute("data-setting-cart-sample-product");
        if (t) {
            let e = JSON.parse(decodeURIComponent(atob(t)));
            e && isObjectLadiPage(e) && (rt && e.title_popup && (rt.innerHTML = e.title_popup), dt && (e.background_button && (dt.style.backgroundColor = e.background_button), e.color_button_buy_now && (dt.style.color = e.color_button_buy_now), e.opacity_button_buy_now && (G && 0 != G.length ? (dt.style.opacity = e.opacity_button_buy_now, dt.style.pointerEvents = "unset") : (dt.style.opacity = .5, dt.style.pointerEvents = "none"))), at && e.font_family && (at.style.fontFamily = e.font_family), lt && e.font_family && (lt.style.fontFamily = e.font_family), st && e.font_family && (st.style.fontFamily = e.font_family))
        }
    }
    let ct = document.querySelectorAll(".ladi-checkout-product-variant .ladi-button-group .ladi-element");
    ct && ct.length > 0 && ct.forEach(t => {
        t.style.cursor = "pointer"
    });
    let ut = document.getElementById("toggle-block-summary-cart-price");
    ut && (ut.style.cursor = "pointer", ut.addEventListener("click", function(t) {
        t.preventDefault(), t.stopPropagation();
        let e = document.getElementById("total-summary-cart-checkout-product"),
            i = ut.querySelector("img"),
            a = document.querySelector("#popup-detail-cart-checkout .list-products");
        e && ("flex" == e.style.display ? (e.style.display = "none", i.src = "https://w.ladicdn.com/ladiui/icons/new-ldicon-arrow-up.svg", a && (a.style.height = "calc(100vh - 210px)")) : (e.style.display = "flex", i.src = "https://w.ladicdn.com/ladiui/icons/new-ldicon-arrow-down.svg", a && (a.style.height = "calc(100vh - 350px)")))
    }));
    const pt = document.getElementById("popup-detail-cart-checkout"),
        mt = document.getElementById("popup-detail-discount-cart-checkout-product"),
        _t = document.getElementById("backdrop-slide-discount-cart-checkout-product"),
        gt = document.querySelector(".ladi-checkout-product-add-to-cart"),
        yt = document.querySelector(".ladi-checkout-product-cart-icon");
    document.querySelector(".ladipage-message");
    document.addEventListener("click", t => {
        pt && pt.contains(t.target) || gt && gt.contains(t.target) || mt && mt.contains(t.target) || _t && _t.contains(t.target) || yt && yt.contains(t.target) || (pt && pt.classList.remove("show"), nt && (nt.style.display = "none"), document.body.classList.remove("open-cart-hidden-overflow"))
    }), document.addEventListener("click", t => {
        mt && mt.contains(t.target) || (mt && mt.classList.remove("show"), _t && (_t.style.display = "none"))
    });
    var ht = document.querySelectorAll(".ladi-gallery .ladi-gallery-view");
    ht && ht.length > 0 && ht.forEach(t => {
        t.style.cursor = "pointer", t.addEventListener("click", function() {
            let e = t.querySelector(".ladi-gallery-view-item.selected");
            if (e) {
                let t = window.getComputedStyle(e).backgroundImage.slice(5, -2);
                t && lightbox_image(t)
            }
        })
    });
    let ft = document.querySelectorAll(".ladi-checkout-quantity");
    ft && ft.forEach(t => {
        const e = t.querySelector(".ladi-checkout-quantity-sub"),
            i = t.querySelector(".ladi-checkout-quantity-add"),
            a = t.querySelector(".ladi-checkout-quantity-input");
        e && a && e.addEventListener("click", () => {
            let t = parseInt(a.value, 10);
            t > 1 && (a.value = t - 1)
        }), i && a && i.addEventListener("click", () => {
            let t = parseInt(a.value, 10);
            a.value = t + 1
        })
    });
    var vt = function(e) {
        var i = t.findAncestor(e.target, ["ladi-checkout-product", "ladi-element"]),
            a = i.getAttribute("data-product-id");
        t.getInfoDetailProductLadiSales(a, !0, function(e) {
            e = t.convertInfoDetailProductLadiSales(i, e);
            let a = t.getCheckoutProductVariantIndex(e, t.findAncestor(i, "ladi-element"));
            t.renderPriceCheckoutProduct(i, e, a), t.renderInventoryCheckoutProduct(i, e, a), t.changeImageGallery(i, e, a)
        })
    };
    Array.from(document.querySelectorAll(".ladi-checkout-product-variant > .ladi-frame > .ladi-element .ladi-button-group > .ladi-element")).forEach(function(t) {
        t.style.setProperty("cursor", "pointer"), t.addEventListener("click", vt)
    }), Array.from(document.querySelectorAll(".ladi-element .ladi-checkout-product")).forEach(function(e) {
        var i = t.findAncestor(e, "ladi-element"),
            a = i.getAttribute("data-product-id");
        t.getInfoDetailProductLadiSales(a, !0, function(e) {
            e = t.convertInfoDetailProductLadiSales(i, e), t.renderPriceCheckoutProduct(i, e, -1), t.renderInventoryCheckoutProduct(i, e, -1, !0)
        })
    });
    let Et = document.querySelector(".ladi-checkout-product.ladi-checkout-product-no-variant .ladi-checkout-product-variant");
    Et && (Et.style.display = "none")
}, LadiPageScriptV2.prototype.renderInventoryCheckoutProduct = function(t, e, i, a) {
    var n = this;
    a && Array.from(t.querySelectorAll(".ladi-checkout-product-stock [data-replace-str]")).forEach(function(e) {
        isEmptyLadiPage(e.getAttribute("data-replace-str")) || e.setAttribute("data-replace-str", e.getAttribute("data-replace-str").replaceAll("inventory", t.id + "_inventory"))
    });
    if (-1 == i) return n.setDataReplaceStr(t.id + "_inventory", null), void n.setDataReplaceElement(!1);
    var o = e.variants[i],
        r = isNullLadiPage(o.quantity) ? o.quantity_stock : o.quantity;
    r = 1 == o.inventory_checked ? r : null, r = !isNullLadiPage(r) && r < 0 ? 0 : r, n.setDataReplaceStr(t.id + "_inventory", r), n.setDataReplaceElement(!1)
}, LadiPageScriptV2.prototype.renderPriceCheckoutProduct = function(t, e, i) {
    var a = this;
    if (-1 == i) return function() {
        var i = -1,
            n = -1,
            o = 0,
            r = 0,
            d = 0,
            l = 0;
        if (e.variants && e.variants.length > 0) {
            e.variants.forEach(function(t, a) {
                (-1 == i || e.variants[i].price > t.price) && (i = a), (-1 == n || e.variants[n].price < t.price) && (n = a), t.price_compare && t.price_compare > 0 ? t.price_compare : t.price;
                let o = t.price;
                o < d && (d = o), o > l && (l = o)
            });
            const t = function(t) {
                let e = 1 / 0,
                    i = -1 / 0,
                    a = 1 / 0,
                    n = -1 / 0;
                return t.forEach(t => {
                    let o = null === t.price_compare || 0 === t.price_compare ? t.price : t.price_compare;
                    e = Math.min(e, o), i = Math.max(i, o), a = Math.min(a, o), n = Math.max(n, o)
                }), {
                    minPrice: e == 1 / 0 ? null : e,
                    maxPrice: i == -1 / 0 ? null : i,
                    minPriceCompare: a == 1 / 0 ? null : a,
                    maxPriceCompare: n == -1 / 0 ? null : n
                }
            }(e.variants);
            o = t.minPriceCompare, r = t.maxPriceCompare
        }
        var s = t.querySelector(".ladi-checkout-product-compare-price");
        s.style.setProperty("display", "block", "important"), (s = t.querySelector(".ladi-checkout-product-is-sale")).style.setProperty("display", "none", "important");
        var c = t.querySelector(".ladi-checkout-product-compare-price .ladi-headline"),
            u = t.querySelector(".ladi-checkout-product-is-sale .ladi-headline");
        if ((c && o > 0 || r > 0) && (c.parentElement.style.setProperty("width", "max-content"), c.parentElement.style.removeProperty("display"), o && r && (c.textContent = o == r ? LadiPageScript.formatCurrency(r, a.runtime.currency, !0) : LadiPageScript.formatCurrency(o, a.runtime.currency, !0) + " - " + LadiPageScript.formatCurrency(r, a.runtime.currency, !0))), u && l > 0 && r > 0) {
            var p = -1 * Math.ceil(100 * (1 - l / r));
            p = p < 0 ? p : "+" + p, u.parentElement.parentElement.parentElement.style.removeProperty("display"), u.textContent = p + "%"
        }
        var m = t.querySelector(".ladi-checkout-product-final-price .ladi-headline");
        m.parentElement.style.setProperty("width", "max-content"), i == n ? m.textContent = LadiPageScript.formatCurrency(e.variants[i].price, a.runtime.currency, !0) : (o == e.variants[i].price && r == e.variants[n].price && c.parentElement.style.setProperty("display", "none"), m.textContent = `${LadiPageScript.formatCurrency(e.variants[i].price,a.runtime.currency,!0)} - ${LadiPageScript.formatCurrency(e.variants[n].price,a.runtime.currency,!0)}`)
    }();
    var n = e.variants[i],
        o = t.querySelector(".ladi-checkout-product-compare-price .ladi-headline"),
        r = t.querySelector(".ladi-checkout-product-is-sale .ladi-headline");
    if (n.price_compare > 0 && n.price_compare != n.price) {
        o.parentElement.style.setProperty("width", "max-content"), o.parentElement.style.removeProperty("display"), o.textContent = LadiPageScript.formatCurrency(n.price_compare, a.runtime.currency, !0);
        var d = -1 * Math.ceil(100 * (1 - n.price / n.price_compare));
        d = d < 0 ? d : "+" + d, r.parentElement.parentElement.parentElement.style.removeProperty("display"), r.textContent = d + "%"
    } else o.parentElement.style.setProperty("display", "none", "important"), r.parentElement.parentElement.parentElement.style.setProperty("display", "none", "important");
    (o = t.querySelector(".ladi-checkout-product-final-price .ladi-headline")).parentElement.style.setProperty("width", "max-content"), o.textContent = LadiPageScript.formatCurrency(n.price, a.runtime.currency, !0)
}, LadiPageScriptV2.prototype.changeImageGallery = function(t, e, i) {
    const a = t.querySelectorAll(".ladi-gallery-control-item");
    if (-1 != i && isObjectLadiPage(e)) {
        let t = e.variants[i];
        t && isObjectLadiPage(t) && a && a.length > 0 && a.forEach(e => {
            const i = window.getComputedStyle(e).backgroundImage.replace(/url\(["']?(.*?)["']?\)/, "$1");
            t.src && i && i.includes(t.src) && e.click()
        })
    }
}, LadiPageScriptV2.prototype.validateProductMinBuy = function(t) {
    if (!Array.isArray(t)) return !0;
    for (const e of t)
        if (e.min_buy && e.quantity < e.min_buy) return this.showMessage(this.const.LANG.MESSAGE_MIN_BUY_PRODUCT, {
            product_name: e ? e.product_name : "",
            option_name: e.option_name ? e.option_name : "",
            min_buy: e ? e.min_buy : ""
        }), !1;
    return !0
}, LadiPageScriptV2.prototype.validateProductMaxBuy = function(t) {
    if (!Array.isArray(t)) return !0;
    for (const e of t)
        if (e.max_buy && e.quantity > e.max_buy) return this.showMessage(this.const.LANG.MESSAGE_MAX_BUY_PRODUCT, {
            product_name: e ? e.product_name : "",
            option_name: e.option_name ? e.option_name : "",
            max_buy: e ? e.max_buy : ""
        }), !1;
    return !0
}, LadiPageScriptV2.prototype.sendFormPaymentOrderSampleProduct = function(t, e, i) {
    var a = this,
        n = !1,
        o = !1,
        r = !1,
        d = !0,
        l = 0,
        s = "",
        c = isObjectLadiPage(window.LadiPageScript.runtime.payment_setting) ? window.LadiPageScript.runtime.payment_setting : {},
        u = window.LadiPageScript.runtime.store_id_int;
    if (a.validateProductMinBuy(t) && a.validateProductMaxBuy(t)) {
        var p = function(t) {
                var e, i, n, o = c.thankyou_type,
                    r = c.thankyou_value;
                o == LadiPageScript.const.FORM_THANKYOU_TYPE.default && isEmptyLadiPage(r), o != LadiPageScript.const.FORM_THANKYOU_TYPE.url && o != LadiPageScript.const.FORM_THANKYOU_TYPE.url_default || isEmptyLadiPage(t) || (r = window.ladi(t).encode_thankyou_url(), e = r, i = !0, n = {}, n = Object.assign(n, {
                    qr_code: a.runtime.tmp.current_qr_code_link
                }), r = e = window.ladi(e).get_url(n, i, !1), LadiPageScript.runTimeout(function() {
                    window.ladi(r).open_url()
                }, 0)), LadiPageScript.runtime.tmp.is_buy_now_cart_sample_product || localStorage.removeItem("data_checkout_products" + LadiPageScript.runtime.ladipage_id)
            },
            m = function(t) {
                a.showMessage(a.const.LANG.FORM_CHECKOUT_ORDER_CANCEL)
            };
        window.formCheckoutClosePopupQRCode = function() {
            n = !0;
            var t = document.querySelector(".ladipage-message");
            t && t.remove();
            var e = document.querySelector("body .ladi-wraper");
            e && (e.style.display = "block"), LadiPageScript.removeTimeout(l), l = null
        }, window.formPaymentDownloadQRCode = function() {
            const t = document.getElementById("form-checkout-bank-qr2").src;
            fetch(t).then(t => t.blob()).then(t => {
                const e = new FileReader;
                e.onloadend = function() {
                    const t = e.result,
                        i = document.createElement("a");
                    i.href = t, i.download = "qr_code.png", document.body.appendChild(i), i.click(), document.body.removeChild(i)
                }, e.readAsDataURL(t)
            }).catch(t => console.error("Error downloading image:", t))
        };
        var _ = function(t, e) {
                e && delete a.runtime.tmp.current_qr_code_link, n = !1;
                var i = "form-checkout-bank-qr2",
                    s = t.bank_info.banks[0].autoConfirmPayment;
                const c = document.querySelector("body .ladi-wraper"),
                    u = window.innerWidth <= 768;
                if (c && u ? c.style.display = "none" : c && (c.style.display = ""), isEmptyLadiPage(document.getElementById(i))) {
                    LadiPageScript.showMessage(`\n            <style>\n                #backdrop-popup {\n                    opacity: 0 !important; \n                    pointer-events: none !important;\n                }\n                body {\n                    position: initial !important;\n                    width: initial !important;\n                }\n                .ladipage-message-box {\n                    font-family: "Roboto", sans-serif;\n                    border-radius: 0 !important;\n                    width: 100% !important;\n                    max-width: 100% !important;\n                    height: 100% !important;\n                    top: 0 !important;\n                    left: 0 !important;\n                    background: transparent !important;\n                    display: flex !important;\n                    justify-content: center;\n                    align-items: center;\n                }\n                .ladipage-message-box > span {\n                   display: none !important;\n                }\n                .ladipage-message-text {\n                    display: block !important;\n                    width: fit-content;\n                    height: fit-content;\n                    margin-top: 0 !important;\n                    padding: 24px !important;\n                    background: #fff;\n                    border-radius: 8px;\n                    position: relative;\n                }\n                .cursor {\n                    cursor: pointer;\n                }\n                .ladipage-message-text .ladipage-message-title {\n                    display: flex;\n                    justify-content: center;\n                    align-items: center;\n                    flex-direction: column;\n                    row-gap: 8px;\n                }\n                .ladipage-message-text .text-title {\n                    color: #3B3B44;\n                    font-weight: 600;\n                    font-size: 18px;\n                }\n                .ladipage-message-text .text-sub-title {\n                    font-weight: 400;\n                    font-size: 14px;\n                    color: #3C72F9;\n                }\n                .ladipage-message-text .sub-title {\n                    display: flex;\n                    align-items: center;\n                    gap: 8px;\n                }\n                .ladipage-message-title .count-down {\n                    display: flex;\n                    gap: 8px;\n                }\n\n                .ladipage-message-title .close-popup {\n                    color: #8A3FFC;\n                }\n                .ladipage-message-text .ladipage-message-content {\n                    display: flex;\n                    gap: 16px;\n                    padding-top: 12px;\n                }\n                .ladipage-message-text .form-qr-code {\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    row-gap: 12px;\n                    max-width: 300px;\n                }\n\n                .ladipage-message-text .form-qr-code .text-qr-code {\n                    color: #3B3B44;\n                    font-weight: 600;\n                    font-size: 14px;\n                }\n\n                .ladipage-message-content .download-qr-code {\n                    display: flex;\n                    gap: 4px;\n                }\n                .ladipage-message-content .download-qr-code img {\n                    filter: invert(6%) sepia(40%) saturate(5000%) hue-rotate(242deg) brightness(89%) contrast(90%);\n                }\n                .ladipage-message-content .form-qr-code .qr-text-document {\n                    color: #566577;\n                    font-size: 14px;\n                    font-weight: 400;\n                    text-align: center;\n                }\n                .ladipage-message-content .form-qr-code .qr-text-document span {\n                    font-size: 14px;\n                    color: #566577;\n                }\n                .ladipage-message-text .form-qr-code .text-download-qr {\n                    color: #7C4AF2;\n                    font-size: 12px;\n                }\n\n                .ladipage-message-content .form-bank-content {\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    row-gap: 14px;\n                    max-width: 396px;\n                }\n\n                .ladipage-message-content .form-bank-content .title {\n                    color: #3B3B44;\n                    font-weight: 400;\n                    font-size: 14px;\n                }\n                .ladipage-message-content .form-bank-content .title span {\n                    font-weight: 600;\n                    color: #3B3B44;\n                    font-size: 14px;\n                }\n                \n                .ladipage-message-text span { \n                    text-align: center;\n                    display: inline !important;\n                    background-color: transparent !important;\n                    padding: 0 !important;\n                    margin-top: 10px;\n                }\n                .text-not-config {\n                    font-size: 14px;\n                    color: #3B3B44;\n                    text-align: center;\n                    max-width: 632px;\n                }\n                \n                .transfer-container {\n                    border: 1px solid #e0e0e0;\n                    border-radius: 8px;\n                    padding: 0 12px 12px;\n                    background-color: #fff;\n                    min-width: 396px;\n                }\n                .transfer-container .logo-bank {\n                    display: flex;\n                    justify-content: center;\n                    align-items: center;\n                }\n                .transfer-header {\n                    text-align: center;\n                    font-size: 16px;\n                    font-weight: 600;\n                    margin-bottom: 20px;\n                }\n                .info-row {\n                    display: flex;\n                    justify-content: start;\n                    align-items: center;\n                    padding: 8px 0;\n                    border-bottom: 1px solid #F1F1F1;\n                }\n                .info-row:last-child {\n                    border-bottom: none;\n                }\n                .info-label {\n                    color: #64768D;\n                    font-size: 14px;\n                    font-weight: 400;\n                    min-width: 80px;\n                }\n                .info-value {\n                    color: #3B3B44;\n                    font-weight: 600;\n                    font-size: 14px;\n                    margin-left: 24px;\n                }\n                .note {\n                    background-color: #FFF3D0;\n                    padding: 12px;\n                    border-radius: 4px;\n                    margin-top: 12px;\n                    font-size: 14px;\n                    font-weight: 400;\n                    color: #000000;\n                }\n                .note span {\n                    color: #000;\n                    font-weight: 600;\n                }\n                .copy-button {\n                    margin-left: 10px;\n                    background-color: #F1F1F1;\n                    width: 28px;\n                    display: flex;\n                    justify-content: center;\n                    border-radius: 4px;\n                    padding: 2px;\n                    position: relative;\n                }\n                \n                .tooltiptext.right {\n                    visibility: hidden;\n                    border-radius: 2px;\n                    padding: 5px 0;\n                    position: absolute;\n                    z-index: 900000090;\n                    width: 100%;\n                    height: 100%;\n                    top: 0;\n                    left: 0;\n                    pointer-events: none;\n                    line-height: 20px;\n                    opacity: 0;\n                    transition: opacity 1s;\n                }\n                .tooltiptext {\n                    font-size: 14px;\n                }\n                .tooltiptext.right::before {\n                    content: attr(tooltiptext);\n                    position: absolute;\n                    right: -6px;\n                    top: -6px;\n                    background: #0E233C;\n                    color: #fff;\n                    padding: 5px 10px;\n                    min-width: 20px;\n                    max-width: 200px;\n                    margin: auto;\n                    width: max-content;\n                    text-align: center;\n                    transform: translateX(100%) translateY(0%);\n                    word-break: break-all;\n                    border-radius: 6px;\n                }\n                .tooltiptext.right::after {\n                    content: "";\n                    position: absolute;\n                    top: 4px;\n                    right: -7px;\n                    border-width: 6px;\n                    border-style: solid;\n                    border-color: transparent black transparent transparent;\n                }\n\n                .copy-button:hover .tooltiptext.right {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                }\n                .ldicon-circle-close-fill {\n                    width: 18px;\n                    height: 18px;\n                    cursor: pointer;\n                    pointer-events: unset !important;\n                    background-color: #566577;\n                    mask-image: url(https://w.ladicdn.com/ladiui/icons/new-ldicon-close-fill-2.svg);\n                    mask-size: contain;\n                    mask-repeat: no-repeat;\n                    mask-position: center;\n                    position: absolute;\n                    top: 2%;\n                    right: 3%;\n                }\n                .ladipage-message-close {\n                    display: none !important;\n                }\n                \n                .btn-confirm {\n                    background-color: #1C00C2;\n                    color: #fff;\n                    padding: 8px 12px;\n                    border-radius: 4px;\n                    cursor: pointer;\n                }\n\n                #payment-guide {\n                    max-width: 712px;\n                    text-align: center;\n                }\n                @media only screen and (max-width: 768px) {\n                    .ladipage-message {\n                        height: auto;\n                        position: absolute;\n                    }\n                    .ladipage-message-text {\n                        margin: auto;\n                        overflow-y: scroll !important;\n                        max-height: 100vh;\n                    }\n\n                    .ladipage-message .ladipage-message-box {\n                        position: absolute !important;\n                        border: none;\n                    }\n                    .ladipage-message-text .ladipage-message-content {\n                        flex-direction: column-reverse;\n                        justify-content: center;\n                        align-items: center;\n                    }\n                }\n            </style>\n            <div class="ladipage-message-title">\n                    <i onclick="formCheckoutClosePopupQRCode()" class="close-popup ladiui icon close ldicon-circle-close-fill"></i>\n                    <div class="text-title">Thanh toán chuyển khoản ngân hàng</div>\n                    ${s?'\n                        <div class="sub-title">\n                            <div class="text-sub-title">Đang chờ thanh toán</div>\n                            <div class="count-down">\n                                <div id="countdown-timer"></div>\n                            </div>\n                            <img src="https://w.ladicdn.com/ladiui/icons/ldicon-loading2.svg" width="20" height="20" alt="Loading" />\n                        </div>\n\n                        <div id="countdown-message" style="display: none;">\n                            Có vẻ như tiến trình xác nhận thanh toán tự động diễn ra lâu hơn bình thường hoặc phát sinh sự cố ngoài ý muốn. Bạn có thể liên hệ người bán để được hỗ trợ thông tin.\n                        </div>\n\n                    ':""}\n                    ${'<div id="payment-guide">'+t.bank_info.payment_guide.replace(/\n/g,"<br>")+"</div>"}\n            </div>\n\n            <div class="ladipage-message-content">\n                <div class="form-qr-code">\n                            <div class="text-qr-code">Quét mã QR thanh toán</div>\n                            ${function(){if(isObjectLadiPage(t.bank_info)){var e=t.bank_info.base_64_qrCode?"data:image/png;base64,"+t.bank_info.base_64_qrCode:t.bank_info.qr_url;return a.runtime.tmp.current_qr_code_link=e,`<img id="${i}" src="${e}" width="212" height="212" alt="QRCode">`}return""}()}\n                            <div class="download-qr-code cursor" onclick="formPaymentDownloadQRCode()">\n                                <div class="text-download-qr">Tải xuống mã QR</div>\n                                <img width="14" height="14" src="https://w.ladicdn.com/ladiui/icons/ldicon-download.svg" />\n                            </div>\n                            <div class="qr-text-document">Mở app ngân hàng hoặc ví điện tử của bạn sau đó chọn <span>quét mã QR</span> để thực hiện thanh toán.</div>\n                </div>\n                ${function(){try{return`\n                        <div class="form-bank-content">\n                        <div class="title">\n                            <span>Chuyển khoản thủ công</span> theo thông tin\n                        </div>\n                        \n                        <div class="transfer-container">\n                            <div class="tranfer-content-detail">\n                                <div class="logo-bank">\n                                    <img src="${t.bank_info.banks[0].bank.logo}" width="128" height="48" />\n\n                                </div>\n                                <div class="info-row">\n                                    <div class="info-label">Ngân hàng</div>\n                                    <div class="info-value">${t.bank_info.banks[0].bank.shortName}</div>\n                                </div>\n                                <div class="info-row">\n                                    <div class="info-label">Thụ hưởng</div>\n                                    <div class="info-value">${t.bank_info.banks[0].accountName}</div>\n                                </div>\n                                <div class="info-row">\n                                    <div class="info-label">Số tài khoản</div>\n                                    <div class="info-value">${t.bank_info.banks[0].accountNumber}</div>\n                                    <div class="copy-button cursor" onclick="formCheckoutCopyToClipboard(this)">\n                                        <img src="https://w.ladicdn.com/ladiui/icons/ldicon-copy.svg" width="16" height="16" alt="Copy" />\n                                        <div class="tooltiptext right" tooltiptext="Copy"></div>\n                                    </div>\n                                </div>\n                                <div class="info-row">\n                                    <div class="info-label">Số tiền</div>\n                                    <div class="info-value">${LadiPageScript.formatCurrency(t.bank_info.amount,t.bank_info.currency_symbol,!0)}</div>\n                                    <div class="copy-button cursor" onclick="formCheckoutCopyToClipboard(this)">\n                                        <img src="https://w.ladicdn.com/ladiui/icons/ldicon-copy.svg" width="16" height="16" alt="Copy" />\n                                        <div class="tooltiptext right" tooltiptext="Copy"></div>\n                                    </div>\n                                </div>\n                                <div class="info-row">\n                                    <div class="info-label">Nội dung CK</div>\n                                    <div class="info-value">${t.bank_info.banks[0].transferContentPrefix}${t.bank_info.reference_no}</div>\n                                    <div class="copy-button cursor" onclick="formCheckoutCopyToClipboard(this)">\n                                        <img src="https://w.ladicdn.com/ladiui/icons/ldicon-copy.svg" width="16" height="16" alt="Copy" />\n                                        <div class="tooltiptext right" tooltiptext="Copy"></div>\n                                    </div>\n                                </div>\n                                ${s?`\n                                    <div class="note">\n                                        Lưu ý: Vui lòng giữ nguyên nội dung <span>${t.bank_info.banks[0].transferContentPrefix}${t.bank_info.reference_no}</span> để xác nhận thanh toán tự động\n                                    </div>\n                                    `:""}\n    \n                            </div>\n                        </div>\n                        \n                    </div>\n                    `}catch(t){return""}}()}\n            </div>\n        `)
                }!o && s && (! function(t) {
                    const e = document.querySelector(".count-down"),
                        i = document.getElementById("countdown-timer"),
                        a = document.getElementById("countdown-message"),
                        n = document.querySelector(".close-popup"),
                        o = document.querySelector(".sub-title");
                    let d = Date.now() + 60 * t * 1e3;
                    i.style.display = "block", a.style.display = "none", n.style.display = "block",
                        function t() {
                            const s = Math.max(0, d - Date.now()),
                                c = Math.floor(s / 6e4),
                                u = Math.floor(s % 6e4 / 1e3);
                            i.textContent = `${String(c).padStart(2,"0")} phút ${String(u).padStart(2,"0")} giây`, s > 0 ? l = LadiPageScript.runTimeout(t, 1e3) : (a.style.textAlign = "center", a.style.display = "block", a.style.color = "#E01A1A", a.style.maxWidth = "632px", n.style.display = "block", e.style.display = "none", o.style.display = "none", r = !0)
                        }()
                }(5), o = !0);
                var g = new XMLHttpRequest;
                g.open("POST", LadiPageScript.const.API_LADISALE_CHECKOUT_GET_ORDER_STATUS), g.addEventListener("readystatechange", function() {
                    if (4 === this.readyState) try {
                        var e = JSON.parse(this.responseText);
                        if (200 != e.code) throw new TypeError("api error");
                        if ("Pending" == e.data.payment_status || "OnHold" == e.data.payment_status) throw new TypeError("fetch api");
                        ! function(t, e) {
                            "Success" == t && p(e.thanks_url), "Canceled" == t && m(e)
                        }(e.data.payment_status, t)
                    } catch (e) {
                        setTimeout(function() {
                            n || _(t, !1)
                        }, 1e4)
                    }
                }), g.setRequestHeader("content-type", "application/json"), !d || n || r || (d = s, g.send(JSON.stringify({
                    ls_data: t.ls_data
                })))
            },
            g = localStorage.getItem("previousSubmissionPaymentOrderSampleProduct"),
            y = {
                customer_name: "",
                customer_email: "",
                customer_phone: "",
                variants: [],
                data_payment: {
                    code: null,
                    type: null,
                    bank_code: null
                }
            };
        g && (y = JSON.parse(g)), LadiPageScript.showLoadingBlur();
        try {
            c && c.thankyou_type == a.const.FORM_THANKYOU_TYPE.url && (s = c.thankyou_value);
            var h = t.map(function(t) {
                    return {
                        product_id: t.product_id,
                        product_variant_id: t.product_variant_id,
                        quantity: t.quantity,
                        store_id: u
                    }
                }),
                f = {
                    code: i.code || null,
                    method_name: i.method_name || null
                },
                v = y.variants.length !== h.length;
            if (!v)
                for (var E = 0; E < h.length; E++) !y.variants[E] || y.variants[E].product_id === h[E].product_id && y.variants[E].product_variant_id === h[E].product_variant_id && y.variants[E].quantity === h[E].quantity || (v = !0);
            var P = function(t) {
                var e = {
                    type: null,
                    bank_code: null
                };
                for (var i in t) t.hasOwnProperty(i) && "object" == typeof t[i] && null !== t[i] && ("type" in t[i] && (e.type = t[i].type), "bank_code" in t[i] && (e.bank_code = t[i].bank_code));
                return e
            }(i);
            f.type = P.type, f.bank_code = P.bank_code;
            var L = y.customer_name !== e.name || y.customer_email !== e.email || y.customer_phone !== e.phone,
                b = y.data_payment.code !== f.code || y.data_payment.type !== f.type || y.data_payment.bank_code !== f.bank_code;
            v && (L = !0);
            var A = L;
            !L && b && (A = !1);
            let o = LadiPageScript.runtime.tmp.discount_info_cart_detail || null,
                r = document.getElementById("city-modal-payment-order").value,
                d = document.getElementById("district-modal-payment-order").value,
                l = document.getElementById("ward-modal-payment-order").value,
                m = document.querySelector("#list-shipping-methods-modal-payment .shipping-method-item.checked"),
                g = null;
            m && (g = m.getAttribute("shipping-method-id"));
            var T = JSON.stringify({
                    thank_url: s,
                    source_from: "LP",
                    invoiceInfo: {
                        isEnable: !1
                    },
                    url: window.location.href,
                    gateway: i,
                    product_one_page: !0,
                    lang: "vi",
                    domain: window.location.hostname,
                    path: window.location.pathname.substring("/".length),
                    path_type: "product",
                    discount_code: o && isObjectLadiPage(o) ? o.discount_code : null,
                    discount_shipping_code: o && isObjectLadiPage(o) && o.discount_shipping ? o.discount_shipping.code : null,
                    cart_token: !A && window.ladi("CART_TOKEN_FORM_CHECKOUT_SAMPLE_PRODUCT").get_cookie(),
                    checkout_token: !A && window.ladi("CHECKOUT_TOKEN_FORM_CHECKOUT_SAMPLE_PRODUCT").get_cookie(),
                    customer_first_name: e.name,
                    customer_email: e.email,
                    customer_phone: e.phone,
                    customer_address: e.address,
                    shipping_state_id: r || null,
                    shipping_district_id: d || null,
                    shipping_ward_id: l || null,
                    shipping_method_id: g ? parseFloatLadiPage(g) : null,
                    is_export_invoice: !1,
                    variants: h,
                    utm: {
                        url_pathname: window.location.pathname,
                        url_search: window.location.search,
                        url_page: window.location.href
                    },
                    custom_fields_checkout: []
                }),
                S = new XMLHttpRequest;
            S.addEventListener("readystatechange", function() {
                4 === this.readyState && (! function(t) {
                    try {
                        var e = JSON.parse(t);
                        if (200 != e.code || !isObjectLadiPage(e.data)) return LadiPageScript.showMessage(e.message);
                        if (e.data, !isEmptyLadiPage(e.data.redirect_url) && isEmptyLadiPage(e.data.vnptEPayData) && (!isObjectLadiPage(e.data.bank_info) || isEmptyLadiPage(e.data.bank_info.base_64_qrCode))) return void(window.location.href = e.data.redirect_url);
                        if (isObjectLadiPage(e.data.bank_info) && !e.data.bank_info.qr_url && !isEmptyLadiPage(e.data.bank_info.base_64_qrCode)) return void _(e.data, !0);
                        if (isObjectLadiPage(e.data.bank_info) && !isEmptyLadiPage(e.data.bank_info.qr_url) && !isEmptyLadiPage(e.data.ls_data) && !n) return window.ladi("CART_TOKEN_FORM_CHECKOUT_SAMPLE_PRODUCT").set_cookie(e.data.cart_token, 3), window.ladi("CHECKOUT_TOKEN_FORM_CHECKOUT_SAMPLE_PRODUCT").set_cookie(e.data.checkout_token, 3), void(0 !== e.data.bank_info.amount ? _(e.data, !0) : p(e.data.thanks_url));
                        if (e.data.vnptEPayData) {
                            var i = document.createElement("div");
                            i.style.display = "none", i.appendChild(function(t = {}) {
                                var e = document.createElement("form");
                                return e.id = "megapayForm", e.name = "megapayForm", e.method = "POST", [{
                                    name: "invoiceNo",
                                    value: t.invoice_no
                                }, {
                                    name: "amount",
                                    value: t.amount
                                }, {
                                    name: "currency",
                                    value: t.currency || "VND"
                                }, {
                                    name: "goodsNm",
                                    value: t.product_name
                                }, {
                                    name: "buyerPhone",
                                    value: t.buyer_phone
                                }, {
                                    name: "buyerAddr",
                                    value: ""
                                }, {
                                    name: "buyerCity",
                                    value: ""
                                }, {
                                    name: "buyerState",
                                    value: ""
                                }, {
                                    name: "buyerPostCd",
                                    value: ""
                                }, {
                                    name: "buyerCountry",
                                    value: ""
                                }, {
                                    name: "fee",
                                    value: ""
                                }, {
                                    name: "receiverFirstNm",
                                    value: ""
                                }, {
                                    name: "receiverLastNm",
                                    value: ""
                                }, {
                                    name: "receiverPhone",
                                    value: ""
                                }, {
                                    name: "receiverAddr",
                                    value: ""
                                }, {
                                    name: "receiverCity",
                                    value: ""
                                }, {
                                    name: "receiverState",
                                    value: ""
                                }, {
                                    name: "receiverPostCd",
                                    value: ""
                                }, {
                                    name: "receiverCountry",
                                    value: "VN"
                                }, {
                                    name: "description",
                                    value: t.description
                                }, {
                                    name: "callBackUrl",
                                    value: t.redirect_url
                                }, {
                                    name: "notiUrl",
                                    value: t.notify_url
                                }, {
                                    name: "merId",
                                    value: t.mer_id
                                }, {
                                    name: "reqDomain",
                                    value: t.url
                                }, {
                                    name: "userLanguage",
                                    value: t.user_language
                                }, {
                                    name: "merchantToken",
                                    value: t.token
                                }, {
                                    name: "payToken",
                                    value: ""
                                }, {
                                    name: "timeStamp",
                                    value: t.time_stamp
                                }, {
                                    name: "merTrxId",
                                    value: t.mer_trx_id
                                }, {
                                    name: "windowType",
                                    value: "1"
                                }, {
                                    name: "windowColor",
                                    value: "#0B3B39"
                                }, {
                                    name: "userFee",
                                    value: ""
                                }, {
                                    name: "vaCondition",
                                    value: "03"
                                }, {
                                    name: "payType",
                                    value: t.type
                                }, {
                                    name: "payOption",
                                    value: ""
                                }, {
                                    name: "bankCode",
                                    value: t.bank_code
                                }, {
                                    name: "goodsAmount",
                                    value: ""
                                }, {
                                    name: "buyerLastNm",
                                    value: ""
                                }, {
                                    name: "buyerFirstNm",
                                    value: ""
                                }, {
                                    name: "buyerEmail",
                                    value: t.buyer_email
                                }, {
                                    name: "vaStartDt",
                                    value: t.va_start_date
                                }, {
                                    name: "vaEndDt",
                                    value: t.va_end_date
                                }].forEach(function(t) {
                                    var i = document.createElement("input");
                                    i.type = "hidden", i.name = t.name, i.value = t.value, e.appendChild(i)
                                }), e
                            }(e.data.vnptEPayData)), document.body.appendChild(i), window.openPayment(1, e.data.vnptEPayData.domain)
                        }
                        p(e.data.thanks_url), LadiPageScript.runtime.tmp.is_buy_now_cart_sample_product || localStorage.removeItem("data_checkout_products" + LadiPageScript.runtime.ladipage_id)
                    } catch (t) {
                        return LadiPageScript.showMessage(LadiPageScript.const.LANG.REQUEST_SEND_ERROR)
                    }
                }(this.responseText), LadiPageScript.hideLoadingBlur())
            }), S.open("POST", LadiPageScript.const.API_LADISALE_CHECKOUT_PAYMENT), S.setRequestHeader("Content-Type", "application/json"), S.send(T), y = {
                customer_name: e.name || "",
                customer_email: e.email || "",
                customer_phone: e.phone || "",
                customer_address: e.address || "",
                variants: h,
                data_payment: f
            }, localStorage.setItem("previousSubmissionPaymentOrderSampleProduct", JSON.stringify(y))
        } catch (t) {
            LadiPageScript.hideLoadingBlur()
        }
    }
}, LadiPageScriptV2.prototype.run = function(t, e) {
    var i = this;
    if (i.runtime.isLoadHtmlGlobal) {
        i.runTimeout(function() {
            i.runtime.formdata && isNullLadiPage(i.runFormData) && i.loadScript(i.const.CDN_LIBRARY_JS_URL + "ladipage.formdata.min.js?v=" + i.runtime.version, {
                defer: !0
            }, null, null, {
                elm: document.body
            }), i.runtime.shopping && isNullLadiPage(i.runShopping) && i.loadScript(i.const.CDN_LIBRARY_JS_URL + "ladipage.shopping.min.js?v=" + i.runtime.version, {
                defer: !0
            }, null, null, {
                elm: document.body
            }), i.trackingInit(i.runtime.data_delay_js), i.customScriptDelayInit()
        }, i.runtime.time_delay_js), language_set(i.const["LANG" + i.runtime.lang], !0), i.runtime.isIE = !!document.documentMode, i.runtime.isIE = i.runtime.isIE ? i.runtime.isIE : !i.runtime.isIE && !!window.StyleMedia, i.runtime.scrollEventPassive = null;
        try {
            var a = Object.defineProperty({}, "passive", {
                get: function() {
                    i.runtime.scrollEventPassive = {
                        passive: !0
                    }
                }
            });
            window.addEventListener("testPassive", null, a), window.removeEventListener("testPassive", null, a)
        } catch (t) {}
        i.runtime.isClient = t, i.runtime.timenow = window.ladi("_timenow").get_cookie(), isEmptyLadiPage(i.runtime.timenow) ? (i.runtime.timenow = Date.now(), window.ladi("_timenow").set_cookie(i.runtime.timenow, 1)) : i.runtime.timenow = parseFloatLadiPage(i.runtime.timenow) || 0;
        try {
            i.runtime.widthScrollBar = window.innerWidth - document.documentElement.clientWidth
        } catch (t) {}
        try {
            var n = window.ladi("_fbc").get_cookie();
            if (isEmptyLadiPage(n))
                if (n = new URLSearchParams(window.location.search).get("fbclid"), !isEmptyLadiPage(n)) n = `fb.${window.location.hostname.split(".").length-1}.${Date.now()}.${n}`, window.ladi("_fbc").set_cookie(n, 90)
        } catch (t) {}
        if (isStringLadiPage(i.runtime.eventData)) try {
            var o = decodeURIComponentLadiPage(i.runtime.eventData);
            i.runtime.eventData = JSON.parse(o)
        } catch (t) {
            var r = i.runtime.eventData.replaceAll(/&amp;/g, "&").replaceAll(/&gt;/g, ">").replaceAll(/&lt;/g, "<").replaceAll(/&quot;/g, '"');
            r = r.replaceAll("\r\n", "").replaceAll("\n", ""), i.runtime.eventData = JSON.parse(r)
        } else {
            var d = document.getElementById("script_event_data");
            if (!isEmptyLadiPage(d)) try {
                i.runtime.eventData = JSON.parse(d.innerHTML), Object.keys(i.runtime.eventData).forEach(function(t) {
                    i.runtime.eventData[t] = i.deOptimizeEventData(i.copy(i.runtime.eventData[t]), i.const.OPTIMIZE_EVENT_DATA_KEY_LIST, "OPTIMIZE_EVENT_DATA_KEY_LIST"), i.runtime.eventData[t] = i.decodeValue(i.runtime.eventData[t])
                })
            } catch (t) {
                i.runtime.eventData = {}
            }
        }
        var l = document.getElementById("script_event_data_website");
        if (!isEmptyLadiPage(l)) try {
            var s = JSON.parse(l.innerHTML);
            Object.keys(s).forEach(function(t) {
                s[t] = i.deOptimizeEventData(s[t], i.const.OPTIMIZE_EVENT_DATA_KEY_LIST, "OPTIMIZE_EVENT_DATA_KEY_LIST"), s[t] = i.decodeValue(s[t])
            }), i.runtime.eventData = Object.assign(i.runtime.eventData, s)
        } catch (t) {}
        var c = document.getElementById("script_dataset_data_website");
        if (!isEmptyLadiPage(c)) try {
            i.runtime.tmp.dataset_data_website = JSON.parse(c.innerHTML)
        } catch (t) {}
        var u = document.getElementById("script_product_data_website");
        if (!isEmptyLadiPage(u)) try {
            i.runtime.tmp.product_data_website = JSON.parse(u.innerHTML)
        } catch (t) {}
        var p = document.getElementById("script_category_detail_data");
        if (!isEmptyLadiPage(p)) try {
            i.runtime.tmp.category_detail_data = JSON.parse(p.innerHTML)
        } catch (t) {}
        var m = document.getElementById("script_tag_detail_data");
        if (!isEmptyLadiPage(m)) try {
            i.runtime.tmp.tag_detail_data = JSON.parse(m.innerHTML)
        } catch (t) {}
        var _ = document.getElementById("script_post_detail_data");
        if (!isEmptyLadiPage(_)) try {
            i.runtime.tmp.post_detail_data = JSON.parse(_.innerHTML)
        } catch (t) {}
        isNullLadiPage(window.ladi_is_desktop) ? i.runtime.isDesktop = t ? !/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(window.navigator.userAgent.toLowerCase()) : LadiPage.isDesktop() : i.runtime.isDesktop = t ? window.ladi_is_desktop : LadiPage.isDesktop(), i.runtime.isBrowserDesktop = !("ontouchstart" in window), i.runtime.device = i.runtime.isDesktop ? i.const.DESKTOP : i.const.MOBILE, i.runtime.tmp.isFirstScroll = !0, i.runtime.tmp.capture_form_data_last = {}, i.runtime.tmp.product_info = {}, i.runtime.tmp.timeout_product_info = {}, i.runtime.tmp.product_tag_info = {}, i.runtime.tmp.timeout_product_tag_info = {}, i.runtime.tmp.dataset_check_load = !1, i.runtime.tmp.dataset_data = {}, i.runtime.tmp.timeout_dataset_data = {}, i.runtime.tmp.cart = [], i.runtime.tmp.add_to_cart_discount = 0, i.runtime.tmp.add_to_cart_fee_shipping = 0, i.runtime.tmp.is_click_add_to_cart = !1, i.runtime.tmp.is_click_check_price_discount = !1, i.runtime.tmp.current_use_coupon = null;
        var g = Object.keys(i.runtime.eventDataGlobal);
        g.forEach(function(t) {
            i.runtime.eventData[t] = i.runtime.eventDataGlobal[t], delete i.runtime.eventDataGlobal[t]
        }), (g = Object.keys(i.runtime.eventData)).forEach(function(t) {
            i.runtime.eventData[t] = i.convertEventDataDevice(i.runtime.isDesktop, i.runtime.eventData[t], {
                is_check_convert_device: !i.runtime.is_funnelx && !i.runtime.is_popupx
            })
        }), i.setLadiVariable();
        try {
            var y = window.ladi("LADI_DATA").get_cookie();
            i.runtime.tmp.cookie_ladi_data = y, y = JSON.parse(Base64.decode(y || Base64.encode("{}"))), Object.keys(y).forEach(function(t) {
                i.setDataReplaceStr(t, y[t])
            })
        } catch (t) {}
        i.runtime.tmp.convertFormDataObjectCountry = function(t) {
            var e = i.copy(t);
            return isObjectLadiPage(e) && i.runtime.list_set_value_name_country.forEach(function(t) {
                if (!isEmptyLadiPage(e[t])) {
                    var i = e[t].split(":");
                    i.length > 1 && i.shift(), e[t] = i.join(":")
                }
            }), e
        };
        var h = i.getURLSearchParams(null, null, !0),
            f = i.getURLSearchParams(window.location.search, null, !0),
            v = i.runtime.tmp.convertFormDataObjectCountry(h),
            E = Object.keys(v),
            P = "";
        E.forEach(function(t) {
            if (t != i.const.TRACKING_NAME && t != i.const.ACCESS_KEY_NAME) {
                if (i.setDataReplaceStr(t, v[t]), "products" == t && isStringLadiPage(v[t])) {
                    var e = v[t].split("|");
                    2 == e.length && -1 == E.indexOf("product_id") && i.setDataReplaceStr("product_value", e[0]), 2 == e.length && -1 == E.indexOf("product_name") && i.setDataReplaceStr("product_name", e[1])
                }(isArrayLadiPage(f[t]) ? f[t] : [f[t]]).forEach(function(e) {
                    isEmptyLadiPage(P) ? P += "?" : P += "&", isObjectLadiPage(e) && (e = JSON.stringify(e)), P += t + "=" + encodeURIComponent(e)
                })
            }
        }), window.ladi(i.const.TRACKING_NAME).delete_cookie("/"), P != window.location.search && i.historyReplaceState(window.location.pathname + P + window.location.hash);
        var L = f[i.const.REF_NAME];
        isEmptyLadiPage(L) ? L = window.ladi("ladi_ref").get_cookie() : i.setCookieDomains("ladi_ref", L, 90);
        var b = Object.keys(i.runtime.eventData),
            A = [],
            T = window.ladi("LADI_UNIQUE_ID").get_cookie(),
            S = window.ladi("LADI_CLIENT_ID").get_cookie(),
            w = parseFloatLadiPage(window.ladi("LADI_PAGE_VIEW").get_cookie()) || 0,
            O = parseFloatLadiPage(window.ladi("LADI_FORM_SUBMIT").get_cookie()) || 0,
            C = window.ladi("LADI_FUNNEL_NEXT_URL").get_cookie(),
            k = window.ladi("LADI_CAMP_ID").get_cookie(),
            I = window.ladi("LADI_CAMP_NAME").get_cookie(),
            N = window.ladi("LADI_CAMP_TYPE").get_cookie(),
            D = window.ladi("LADI_CAMP_TARGET_URL").get_cookie(),
            R = window.ladi("LADI_CAMP_ORIGIN_URL").get_cookie(),
            x = parseFloatLadiPage(window.ladi("LADI_CAMP_PAGE_VIEW").get_cookie()) || 0,
            B = parseFloatLadiPage(window.ladi("LADI_CAMP_FORM_SUBMIT").get_cookie()) || 0;
        isEmptyLadiPage(T) && (T = i.randomId(), window.ladi("LADI_UNIQUE_ID").set_cookie(T, 365)), i.frequencyFormDataByKey({
            addValue: 1,
            expires: 365,
            key: "page_view"
        });
        var M = function(t, e, a) {
                if ("FormSubmit" == t && isEmptyLadiPage(S)) isFunctionLadiPage(a) && a();
                else if (!i.runtime.is_popupx || i.runtime.has_popupx) {
                    var n = i.runtime.publish_platform,
                        o = i.runtime.time_zone,
                        r = window.location.host,
                        d = window.location.href,
                        l = i.runtime.ladipage_id,
                        s = {
                            event: t,
                            store_id: i.runtime.store_id,
                            time_zone: o,
                            domain: r,
                            url: d,
                            ladipage_id: l,
                            publish_platform: n,
                            data: []
                        };
                    if ("FormSubmit" != t && "PageView" != t || (s.tracking_page = "false" != i.runtime.tracking_page), s = Object.assign(s, i.copy(e)), "ConversionApiString" == t || "TikTokConversionApiString" == t) return s.event = t.substring(0, t.length - "String".length), void i.runtime.tmp.form_checkout_tracking_conversion_api.push(s);
                    if (i.runtime.is_popupx && (s.type = "POPUPX", s.origin_store_id = i.runtime.tmp.popupx_origin_store_id, s.origin_referer = i.runtime.tmp.popupx_origin_referer, s.origin_domain = i.runtime.tmp.popupx_origin_domain, s.origin_url = i.runtime.tmp.popupx_origin_url, s.element_id = i.runtime.tmp.popupx_current_element_id, isEmptyLadiPage(s.element_id))) i.runTimeout(function() {
                        M(t, e, a)
                    }, 100);
                    else {
                        "FormSubmit" == t && (isEmptyLadiPage(k) ? O++ : (D == R && O++, B++), window.ladi("LADI_CAMP_FORM_SUBMIT").set_cookie(B, 365), window.ladi("LADI_FORM_SUBMIT").set_cookie(O, 365), i.runtime.is_popupx && i.runtime.tmp.runActionPopupX({
                            action: {
                                type: "set_submit_form"
                            }
                        })), "PageView" == t && i.runtime.has_popupx && (w++, window.ladi("LADI_PAGE_VIEW").set_cookie(w, 365)), "FormSubmit" != t && "PageView" != t || isEmptyLadiPage(i.runtime.tmp.cookie_ladi_data) || !i.runtime.is_popupx && isEmptyLadiPage(k) || (s.ladi_data = i.runtime.tmp.cookie_ladi_data);
                        var c = i.const.API_ANALYTICS_EVENT;
                        "ConversionApi" != t && "TikTokConversionApi" != t || (c = i.const.API_ANALYTICS_CONFIG, console.log(t, JSON.stringify(s.data))), i.sendRequest("POST", c, JSON.stringify(s), !0, {
                            "Content-Type": "application/json",
                            LADI_CLIENT_ID: S,
                            LADI_PAGE_VIEW: w,
                            LADI_FORM_SUBMIT: O,
                            LADI_CAMP_ID: k,
                            LADI_CAMP_NAME: I,
                            LADI_CAMP_TYPE: N,
                            LADI_CAMP_TARGET_URL: D,
                            LADI_CAMP_ORIGIN_URL: R,
                            LADI_CAMP_PAGE_VIEW: x,
                            LADI_CAMP_FORM_SUBMIT: B
                        }, function(t, e, i) {
                            i.readyState == XMLHttpRequest.DONE && isFunctionLadiPage(a) && a(e, t)
                        })
                    }
                } else i.runTimeout(function() {
                    M(t, e, a)
                }, 100)
            },
            q = function(t, e, a, n) {
                var o = null,
                    r = null,
                    d = null,
                    l = 0;
                if (isEmptyLadiPage(e) || "POPUP_PRODUCT" != e.id)
                    if (isEmptyLadiPage(e) || "POPUP_BLOG" != e.id) isFunctionLadiPage(n) && n();
                    else {
                        if (o = i.generateVariantProduct(a, !1, null, null, null, null, !0, !0, function(i) {
                                q(t, e, a, n)
                            }), !isObjectLadiPage(o) || !isObjectLadiPage(o.product) || !isObjectLadiPage(o.store_info)) return;
                        var s = function() {
                            var a = !0;
                            if (Object.keys(o.product).forEach(function(t) {
                                    if (a && isStringLadiPage(o.product[t]) && o.product[t].startsWith(i.const.DATASET_CONTENT_SOURCE_URL) && o.product[t].endsWith(i.const.DATASET_CONTENT_SOURCE_ENDSWITH)) {
                                        var e = o.product[t].replaceAll(i.const.DATASET_CONTENT_SOURCE_URL, i.const.API_DATASET_BLOG);
                                        a = !1, i.showLoadingBlur(), i.sendRequest("GET", e, null, !0, null, function(e, i, a) {
                                            a.readyState == XMLHttpRequest.DONE && (o.product[t] = e, s())
                                        })
                                    }
                                }), a) {
                                i.hideLoadingBlur(), e.classList.add("opacity-0"), r = document.querySelectorAll("#" + e.id + " .ladi-element");
                                var c = null,
                                    u = function(a) {
                                        i.removeTimeout(c);
                                        var n = function(t, e) {
                                            var a = i.findAncestor(t.parentElement, "ladi-element");
                                            i.updateHeightElement(!0, t, a, e, t.clientHeight)
                                        };
                                        c = i.runTimeout(function() {
                                            i.showParentVisibility(r[0], function() {
                                                for (l = 0; l < r.length; l++) {
                                                    if (r[l].querySelectorAll(".ladi-headline, .ladi-paragraph").length > 0 && r[l].hasAttribute("data-height")) {
                                                        var t = parseFloatLadiPage(r[l].getAttribute("data-height")) || 0;
                                                        t != r[l].clientHeight && (r[l].setAttribute("data-height", r[l].clientHeight), n(r[l], t))
                                                    }
                                                }
                                            }), i.runShowPopup(!0, e.id, null, null, !0, {
                                                event: {
                                                    target: t
                                                }
                                            })
                                        }, isEmptyLadiPage(a) ? 0 : 100)
                                    };
                                i.showParentVisibility(r[0], function() {
                                    for (l = 0; l < r.length; l++) {
                                        r[l].querySelectorAll(".ladi-headline, .ladi-paragraph").length > 0 && !r[l].hasAttribute("data-height") && r[l].setAttribute("data-height", r[l].clientHeight)
                                    }
                                });
                                var p = function(t) {
                                        var e = i.runtime.eventData[t.id];
                                        isFunctionLadiPage(i.runtime.tmp.runOptionAction) && isObjectLadiPage(e) && i.runtime.tmp.runOptionAction(t, t.id, e.type, e, o)
                                    },
                                    m = function(t) {
                                        (!i.runtime.isDesktop || isEmptyLadiPage(t.getAttribute("height")) && isEmptyLadiPage(t.style.getPropertyValue("height"))) && (t.addEventListener("load", u), t.addEventListener("error", u))
                                    };
                                for (l = 0; l < r.length; l++) i.runtime.tmp.runLadiSaleProductKey(r[l].id, !1, !1, d, o, !0, null, !0), p(r[l]);
                                for (l = 0; l < r.length; l++)
                                    for (var _ = r[l].querySelectorAll(".ladi-headline img, .ladi-paragraph img"), g = 0; g < _.length; g++) m(_[g]);
                                isFunctionLadiPage(n) && n(), u(), i.runTimeout(function() {
                                    e.classList.remove("opacity-0")
                                }, 150)
                            }
                        };
                        s()
                    }
                else {
                    if (o = i.generateVariantProduct(a, !1, null, null, null, null, !0, !0, function(i) {
                            q(t, e, a, n)
                        }), !isObjectLadiPage(o) || !isObjectLadiPage(o.store_info) || !isObjectLadiPage(o.product) || !isArrayLadiPage(o.product.variants) || o.product.variants.length <= 0) return;
                    if (isEmptyLadiPage(a["option.product_variant_id"])) {
                        d = o.product.variants[0];
                        var c = i.findAncestor(t, "ladi-collection-item"),
                            u = null;
                        if (isEmptyLadiPage(c)) {
                            for (var p = document.querySelectorAll('[data-variant="true"] select[data-store-id="' + o.store_info.id + '"][data-product-id="' + o.product.product_id + '"]'), m = 0; m < p.length; m++)
                                if (isEmptyLadiPage(i.findAncestor(p[m], "ladi-collection-item"))) {
                                    u = p[m];
                                    break
                                }
                        } else u = c.querySelector('[data-variant="true"]');
                        if (!isEmptyLadiPage(u)) {
                            u = i.findAncestor(u, "ladi-element");
                            var _ = i.getProductVariantId(u, o.product);
                            isEmptyLadiPage(_) || (d = o.product.variants.find(function(t) {
                                return t.product_variant_id == _
                            }))
                        }
                    } else d = o.product.variants.find(function(t) {
                        return t.product_variant_id == a["option.product_variant_id"]
                    });
                    if (isEmptyLadiPage(d)) return;
                    var g = function(t) {
                        var e = i.runtime.eventData[t.id];
                        isFunctionLadiPage(i.runtime.tmp.runOptionAction) && isObjectLadiPage(e) && i.runtime.tmp.runOptionAction(t, t.id, e.type, e, o)
                    };
                    for (r = document.querySelectorAll("#" + e.id + " .ladi-element"), l = 0; l < r.length; l++) i.runtime.tmp.runLadiSaleProductKey(r[l].id, !1, !1, d, o), g(r[l]);
                    isFunctionLadiPage(n) && n()
                }
            },
            F = function(t, e, a) {
                e = isArrayLadiPage(e) ? e : [];
                var n = i.runtime.eventData[t.id],
                    o = e.findIndex(function(t) {
                        return t.action_type == a.action_type && (t.type == i.const.DATA_ACTION_TYPE.popup || t.type == i.const.DATA_ACTION_TYPE.popup_cart || t.type == i.const.DATA_ACTION_TYPE.popup_checkout)
                    });
                o = -1 != o, e.forEach(function(e) {
                    if (e.action_type == a.action_type) {
                        var r = null,
                            d = null;
                        if (e.type == i.const.DATA_ACTION_TYPE.section) {
                            var l = 0,
                                s = document.getElementById(e.action);
                            if (!isEmptyLadiPage(s)) {
                                if (o) return void window.ladi(s.id).scroll(!1, !0);
                                if (r = i.findAncestor(t, "ladi-popup"), !isEmptyLadiPage(r)) {
                                    var c = i.findAncestor(r, "ladi-element");
                                    c.hasAttribute("data-popup-backdrop") && (window.ladi(c.id).hide(), l = 100)
                                }
                                i.runTimeout(function() {
                                    window.ladi(s.id).scroll()
                                }, l)
                            }
                        }
                        if (e.type == i.const.DATA_ACTION_TYPE.popup && (r = document.getElementById(e.action), isEmptyLadiPage(r) || q(t, r, n, function() {
                                window.ladi(e.action).show()
                            })), e.type == i.const.DATA_ACTION_TYPE.hidden_show && (isArrayLadiPage(e.hidden_ids) && e.hidden_ids.forEach(function(t) {
                                window.ladi(t).hide()
                            }), isArrayLadiPage(e.show_ids) && e.show_ids.forEach(function(t) {
                                window.ladi(t).show()
                            })), e.type == i.const.DATA_ACTION_TYPE.change_index && (d = window.ladi(e.action), isFunctionLadiPage(d[e.change_index_type]) ? d[e.change_index_type]() : d.index(e.change_index_number || 1)), e.type == i.const.DATA_ACTION_TYPE.set_value && (d = window.ladi(e.action), isEmptyLadiPage(d) || (e.is_clipboard ? i.getTextClipboard(e.str, function(i, a) {
                                d.value(i ? a : e.str), U(t, i, !0)
                            }) : d.value(e.str))), e.type == i.const.DATA_ACTION_TYPE.link) {
                            var u = e.action;
                            isEmptyLadiPage(u) || (u = i.getLinkUTMRedirect(u, null), u = i.convertDataReplaceStr(u, !0), window.ladi(u).open_url(e.target, e.nofollow))
                        }
                        if (e.type == i.const.DATA_ACTION_TYPE.collapse) {
                            var p = document.getElementById(e.action);
                            isEmptyLadiPage(p) || window.ladi(e.action).collapse()
                        }
                        if (e.type == i.const.DATA_ACTION_TYPE.set_style && (d = window.ladi(e.action), isEmptyLadiPage(d) || d.set_style(t, e)), e.type == i.const.DATA_ACTION_TYPE.dropbox) {
                            var m = document.getElementById(e.action);
                            isEmptyLadiPage(m) || window.ladi(e.action).showDropbox(t, e.dropbox, !1)
                        }
                        if (e.type == i.const.DATA_ACTION_TYPE.lightbox) {
                            if (a.lightbox_type == i.const.DATA_ACTION_LIGHTBOX_TYPE.image) {
                                var _ = e.image_url;
                                isEmptyLadiPage(_) && (_ = e["image_url_" + i.runtime.device]), lightbox_image(_)
                            }
                            a.lightbox_type == i.const.DATA_ACTION_LIGHTBOX_TYPE.video && lightbox_video(e.video_url, e.video_type, !1), a.lightbox_type == i.const.DATA_ACTION_LIGHTBOX_TYPE.iframe && lightbox_iframe(e.iframe_url)
                        }
                        if (e.type == i.const.DATA_ACTION_TYPE.tracking) {
                            var g = {
                                is_custom: !0
                            };
                            g.conversion_name = e.conversion_name, g.google_ads_conversion = e.google_ads_conversion, g.google_ads_label = e.google_ads_label, g.event_category = "", e.action_type != i.const.ACTION_TYPE.open_popup && e.action_type != i.const.ACTION_TYPE.close_popup || (g.event_category = "LadiPagePopup"), i.runEventTracking(null, g), isEmptyLadiPage(e.event_custom_script) || (i.runtime.is_popupx ? i.runtime.tmp.runActionPopupX({
                                script: e.event_custom_script,
                                action: {
                                    type: "event_custom_script"
                                }
                            }) : i.runFunctionString(e.event_custom_script))
                        }
                        e.type == i.const.DATA_ACTION_TYPE.custom_script && (isEmptyLadiPage(e.event_custom_script) || (i.runtime.is_popupx ? i.runtime.tmp.runActionPopupX({
                            script: e.event_custom_script,
                            action: {
                                type: "event_custom_script"
                            }
                        }) : i.runFunctionString(e.event_custom_script)))
                    }
                })
            },
            U = function(t, e, a) {
                var n = parseFloatLadiPage(t.getAttribute("data-timeout-id-copied")) || 0;
                i.removeTimeout(n);
                var o = "hint-{0}-middle-s-small-hint-anim-d-short",
                    r = !0;
                i.getElementBoundingClientRect(t).y < 35 && (r = !1), r ? (t.classList.add(o.format("top")), t.classList.remove(o.format("bottom"))) : (t.classList.remove(o.format("top")), t.classList.add(o.format("bottom"))), e ? a ? t.setAttribute("data-hint", i.const.LANG.PASTED) : t.setAttribute("data-hint", i.const.LANG.COPIED) : t.setAttribute("data-hint", i.const.LANG.FAILED), n = i.runTimeout(function() {
                    t.classList.remove(o.format("top")), t.classList.remove(o.format("bottom")), t.removeAttribute("data-hint"), t.removeAttribute("data-timeout-id-copied")
                }, 1e3), t.setAttribute("data-timeout-id-copied", n)
            },
            V = function(t, e, a, n, o) {
                if (t = t || document.getElementById(e), !isEmptyLadiPage(t)) {
                    var r = function(t) {
                            if (!isEmptyLadiPage(t)) return "true" == t.getAttribute("data-dropbox") ? t : r(t.parentElement)
                        },
                        d = function(t, e) {
                            if ("false" == t.getAttribute("data-click")) return !1;
                            var i = r(e.target);
                            if (!isEmptyLadiPage(i)) {
                                var a = document.getElementById(i.getAttribute("data-from-doc-id"));
                                if (!isEmptyLadiPage(a)) return a.id != t.id && d(t, {
                                    target: a
                                })
                            }
                            return !0
                        },
                        l = function() {
                            return i.runtime.count_click_dom[t.id] || 0
                        },
                        s = function(t) {
                            var e = l();
                            return t.action_type == i.const.ACTION_TYPE.action || (t.action_type == i.const.ACTION_TYPE["1st_click"] && e % 2 == 1 || (t.action_type == i.const.ACTION_TYPE["2nd_click"] && e % 2 == 0 || void 0))
                        };
                    t.addEventListener("click", function() {
                        i.runtime.count_click_dom[t.id] = l() + 1
                    });
                    var c = n["option.is_submit_form"],
                        u = n["option.data_submit_form_id"];
                    if (!n["option.action_funnel"] || isEmptyLadiPage(C))
                        if (!c || isEmptyLadiPage(u)) {
                            var p = n["option.data_event"];
                            if (!isArrayLadiPage(p) && (p = [], isObjectLadiPage(n["option.data_action"]))) {
                                var m = i.copy(n["option.data_action"]);
                                m.action_type = i.const.ACTION_TYPE.action, p.push(m)
                            }
                            var _ = i.getSource2ndClick(t.id);
                            isEmptyLadiPage(_) || (t.classList.add("is-2nd-click"), p.push({
                                action_type: i.const.ACTION_TYPE.action,
                                type: i.const.DATA_ACTION_TYPE.set_value_2nd,
                                source: _
                            }));
                            var g = function(e, i) {
                                    return U(t, e, !1)
                                },
                                y = p.findIndex(function(t) {
                                    return t.action_type == i.const.ACTION_TYPE.action && (t.type == i.const.DATA_ACTION_TYPE.popup || t.type == i.const.DATA_ACTION_TYPE.popup_cart || t.type == i.const.DATA_ACTION_TYPE.popup_checkout)
                                });
                            y = -1 != y;
                            var h = 0,
                                f = [];
                            p.forEach(function(a) {
                                if (a.action_type == i.const.ACTION_TYPE.action || a.action_type == i.const.ACTION_TYPE["1st_click"] || a.action_type == i.const.ACTION_TYPE["2nd_click"]) {
                                    if (h++, f.push(a), a.type == i.const.DATA_ACTION_TYPE.set_value_2nd && t.addEventListener("click", function(e) {
                                            if (d(t, e) && s(a)) {
                                                var i = window.ladi(t.id, t);
                                                isEmptyLadiPage(i) || i.set_value_2nd(a.source)
                                            }
                                        }), a.type == i.const.DATA_ACTION_TYPE.link) {
                                        var r = null;
                                        t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && "true" == t.getAttribute("data-action") && (r = a.action, isEmptyLadiPage(a.action_mapping) || (r = a.action_mapping), isEmptyLadiPage(r) || (r = i.getLinkUTMRedirect(r, null), r = i.convertDataReplaceStr(r, !0), window.ladi(r).open_url(a.target, a.nofollow)))
                                        });
                                        var l = function() {
                                            r = a.action;
                                            var e = a.link_mapping;
                                            isEmptyLadiPage(e) && (e = a.link_mapping_custom);
                                            var d = null;
                                            if (n["option.data_setting.type"] == i.const.DATA_TYPE.detail_category) d = i.runtime.tmp.category_detail_data, isObjectLadiPage(d) && ((d = i.copy(d)).url = window.location.origin + (isEmptyLadiPage(i.const.WEBSITE_PATH_DNS.category) ? "" : "/" + i.const.WEBSITE_PATH_DNS.category) + "/" + d.url);
                                            else if (n["option.data_setting.type"] == i.const.DATA_TYPE.detail_tag) d = i.runtime.tmp.tag_detail_data, isObjectLadiPage(d) && ((d = i.copy(d)).url = window.location.origin + (isEmptyLadiPage(i.const.WEBSITE_PATH_DNS.tag) ? "" : "/" + i.const.WEBSITE_PATH_DNS.tag) + "/" + d.url);
                                            else if (n["option.data_setting.type"] == i.const.DATA_TYPE.detail_post) d = i.runtime.tmp.post_detail_data, isObjectLadiPage(d) && ((d = i.copy(d)).url = window.location.origin + (isEmptyLadiPage(i.const.WEBSITE_PATH_DNS.post) ? "" : "/" + i.const.WEBSITE_PATH_DNS.post) + "/" + d.url);
                                            else {
                                                if (isNullLadiPage(o) && (o = i.generateVariantProduct(n, !1, null, null, null, null, !0, !0, l)), !isObjectLadiPage(o) || !isObjectLadiPage(o.store_info) || !isObjectLadiPage(o.product)) return;
                                                d = o.product
                                            }
                                            d = isObjectLadiPage(d) ? d : {}, isEmptyLadiPage(e) || (a.action_mapping = d[e], isEmptyLadiPage(a.action_mapping) || (r = a.action_mapping)), isEmptyLadiPage(r) ? (t.removeAttribute("data-replace-href"), t.removeAttribute("href")) : (r = i.getLinkUTMRedirect(r, null), t.setAttribute("data-replace-href", r), t.href = i.convertDataReplaceStr(r, !0))
                                        };
                                        l()
                                    }
                                    if (a.type == i.const.DATA_ACTION_TYPE.email && t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && ("true" != t.getAttribute("data-action") || isEmptyLadiPage(a.action) || window.ladi("mailto:" + a.action).open_url())
                                        }), a.type == i.const.DATA_ACTION_TYPE.phone && t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && ("true" != t.getAttribute("data-action") || isEmptyLadiPage(a.action) || window.ladi("tel:" + a.action).open_url())
                                        }), a.type == i.const.DATA_ACTION_TYPE.collapse && t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && F(t, [a], {
                                                action_type: a.action_type
                                            })
                                        }), a.type == i.const.DATA_ACTION_TYPE.section && t.addEventListener("click", function(e) {
                                            if (d(t, e) && s(a)) {
                                                var n = 0,
                                                    o = document.getElementById(a.action);
                                                if (!isEmptyLadiPage(o)) {
                                                    if (y) return void window.ladi(o.id).scroll(!1, !0);
                                                    var r = i.findAncestor(t, "ladi-popup");
                                                    if (!isEmptyLadiPage(r)) {
                                                        var l = i.findAncestor(r, "ladi-element");
                                                        l.hasAttribute("data-popup-backdrop") && (window.ladi(l.id).hide(), n = 100)
                                                    }
                                                    i.runTimeout(function() {
                                                        window.ladi(o.id).scroll()
                                                    }, n)
                                                }
                                            }
                                        }), a.type == i.const.DATA_ACTION_TYPE.popup && t.addEventListener("click", function(e) {
                                            if (d(t, e) && s(a)) {
                                                var i = document.getElementById(a.action);
                                                isEmptyLadiPage(i) || q(t, i, n, function() {
                                                    window.ladi(a.action).show()
                                                })
                                            }
                                        }), a.type == i.const.DATA_ACTION_TYPE.dropbox && t.addEventListener("click", function(e) {
                                            if (d(t, e) && s(a)) {
                                                var i = document.getElementById(a.action);
                                                isEmptyLadiPage(i) || window.ladi(a.action).showDropbox(t, a.dropbox, !1)
                                            }
                                        }), a.type == i.const.DATA_ACTION_TYPE.hidden_show && t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && (isArrayLadiPage(a.hidden_ids) && a.hidden_ids.forEach(function(t) {
                                                window.ladi(t).hide()
                                            }), isArrayLadiPage(a.show_ids) && a.show_ids.forEach(function(t) {
                                                window.ladi(t).show()
                                            }))
                                        }), a.type == i.const.DATA_ACTION_TYPE.change_index && t.addEventListener("click", function(e) {
                                            if (d(t, e) && s(a)) {
                                                var i = window.ladi(a.action);
                                                isEmptyLadiPage(i) || (isFunctionLadiPage(i[a.change_index_type]) ? i[a.change_index_type]() : i.index(a.change_index_number || 1))
                                            }
                                        }), a.type == i.const.DATA_ACTION_TYPE.set_style) {
                                        var c = window.ladi(a.action);
                                        isEmptyLadiPage(c) || c.set_style(t, a, !0), t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && F(t, [a], {
                                                action_type: a.action_type
                                            })
                                        })
                                    }
                                    a.type == i.const.DATA_ACTION_TYPE.set_value && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var n = window.ladi(a.action);
                                            isEmptyLadiPage(n) || (a.is_clipboard ? i.getTextClipboard(a.str, function(e, i) {
                                                n.value(e ? i : a.str), U(t, e, !0)
                                            }) : n.value(a.str))
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.next_funnelx && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var i = window.ladi(a.funnelx_id);
                                            isEmptyLadiPage(i) || i.next_funnelx(a.step_id)
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.set_goal && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var i = window.ladi(t.id);
                                            isEmptyLadiPage(i) || i.set_goal(a.value_goal)
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.set_finish && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var i = window.ladi(t.id);
                                            isEmptyLadiPage(i) || i.set_finish()
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.copy_clipboard && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var n = null,
                                                o = window.ladi(a.action);
                                            isEmptyLadiPage(o) || (n = o.value(null, null, {
                                                only_text: !0,
                                                text_trim: !0
                                            })), n = isEmptyLadiPage(n) ? a.str : n, isEmptyLadiPage(n) || i.copyTextClipboard(n, g)
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.custom_script && t.addEventListener("click", function(e) {
                                        d(t, e) && s(a) && F(t, [a], {
                                            action_type: a.action_type
                                        })
                                    });
                                    var u = null;
                                    if (a.type == i.const.DATA_ACTION_TYPE.lightbox ? u = a.lightbox_type : "lightbox_image" == a.type ? u = i.const.DATA_ACTION_LIGHTBOX_TYPE.image : "lightbox_video" == a.type ? u = i.const.DATA_ACTION_LIGHTBOX_TYPE.video : "lightbox_iframe" == a.type && (u = i.const.DATA_ACTION_LIGHTBOX_TYPE.iframe), u == i.const.DATA_ACTION_LIGHTBOX_TYPE.image && t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && F(t, [a], {
                                                action_type: a.action_type,
                                                lightbox_type: u
                                            })
                                        }), u == i.const.DATA_ACTION_LIGHTBOX_TYPE.video) {
                                        var p = document.querySelectorAll("#" + e + ".preload").length > 0;
                                        p && lightbox_video(a.video_url, a.video_type, p), t.addEventListener("click", function(e) {
                                            d(t, e) && s(a) && F(t, [a], {
                                                action_type: a.action_type,
                                                lightbox_type: u
                                            })
                                        })
                                    }
                                    u == i.const.DATA_ACTION_LIGHTBOX_TYPE.iframe && t.addEventListener("click", function(e) {
                                        d(t, e) && s(a) && F(t, [a], {
                                            action_type: a.action_type,
                                            lightbox_type: u
                                        })
                                    }), a.type == i.const.DATA_ACTION_TYPE.popup_cart && t.addEventListener("click", function(e) {
                                        if (d(t, e) && s(a)) {
                                            var i = document.getElementById("POPUP_CART");
                                            isEmptyLadiPage(i) || window.ladi(i.id).show()
                                        }
                                    }), a.type == i.const.DATA_ACTION_TYPE.popup_checkout && t.addEventListener("click", function(e) {
                                        d(t, e) && s(a) && (isArrayLadiPage(i.runtime.tmp.cart) && i.runtime.tmp.cart.length > 0 ? i.runtime.shopping_third_party ? i.getThirdPartyCheckoutUrl(!0, null, {
                                            event: {
                                                target: t
                                            }
                                        }) : window.ladi("POPUP_CHECKOUT").show(!1, {
                                            event: {
                                                target: t
                                            }
                                        }) : i.showMessage(i.const.LANG.ADD_TO_CART_NO_CART))
                                    })
                                }
                            }), i.runEventTracking(e, {
                                count_data_event: h,
                                is_click: !0,
                                is_form: !1,
                                event: {
                                    target: t
                                },
                                data_event_run: f
                            }, null, t, d)
                        } else t.addEventListener("click", function(e) {
                            if (d(t, e)) {
                                var i = document.getElementById(u);
                                isEmptyLadiPage(i) || i.setAttribute("data-button-submit-other", t.id), window.ladi(u).submit()
                            }
                        });
                    else t.addEventListener("click", function(a) {
                        if (d(t, a)) {
                            a.preventDefault();
                            var n = C;
                            n = i.getLinkUTMRedirect(n, null), n = i.convertDataReplaceStr(n, !0), window.ladi(n).open_url(), i.runEventTracking(e, {
                                is_form: !1
                            })
                        }
                    })
                }
            },
            Y = function(t, e, a, n) {
                if (t = t || document.getElementById(e), !isEmptyLadiPage(t)) {
                    if (!isArrayLadiPage(n)) {
                        var o = i.copy(n);
                        n = [], isObjectLadiPage(o) && (o.action_type = i.const.ACTION_TYPE.hover, n.push(o))
                    }
                    n.forEach(function(e) {
                        if (e.action_type == i.const.ACTION_TYPE.hover && (e.type == i.const.DATA_ACTION_TYPE.dropbox && (t.addEventListener("mouseenter", function(a) {
                                i.checkHover() && window.ladi(e.action).showDropbox(t, e.dropbox, !0)
                            }), t.addEventListener("mouseleave", function(t) {
                                i.checkHover() && window.ladi(e.action).hide()
                            })), e.type == i.const.DATA_ACTION_TYPE.hidden_show && (t.addEventListener("mouseenter", function(t) {
                                i.checkHover() && (isArrayLadiPage(e.hidden_ids) && e.hidden_ids.forEach(function(t) {
                                    window.ladi(t).hide()
                                }), isArrayLadiPage(e.show_ids) && e.show_ids.forEach(function(t) {
                                    window.ladi(t).show()
                                }))
                            }), t.addEventListener("mouseleave", function(t) {
                                i.checkHover() && (isArrayLadiPage(e.hidden_ids) && e.hidden_ids.forEach(function(t) {
                                    window.ladi(t).show()
                                }), isArrayLadiPage(e.show_ids) && e.show_ids.forEach(function(t) {
                                    window.ladi(t).hide()
                                }))
                            })), e.type == i.const.DATA_ACTION_TYPE.change_index && t.addEventListener("mouseenter", function(t) {
                                if (i.checkHover()) {
                                    var a = window.ladi(e.action);
                                    isFunctionLadiPage(a[e.change_index_type]) ? a[e.change_index_type]() : a.index(e.change_index_number || 1)
                                }
                            }), e.type == i.const.DATA_ACTION_TYPE.set_style)) {
                            var a = window.ladi(e.action);
                            isEmptyLadiPage(a) || a.set_style(t, e, !0), t.addEventListener("mouseenter", function(a) {
                                i.checkHover() && window.ladi(e.action).set_style(t, e)
                            }), t.addEventListener("mouseleave", function(a) {
                                i.checkHover() && window.ladi(e.action).remove_style(t, e)
                            })
                        }
                    })
                }
            },
            H = function(t) {
                var e = document.getElementById(t);
                if (!isEmptyLadiPage(e) && t != i.runtime.builder_section_popup_id && t != i.runtime.builder_section_background_id) {
                    var a = e.classList.contains("ladi-section") ? "section" : null;
                    if (i.runtime.is_popupx && "section" == a) {
                        var n = document.createElement("div");
                        n.className = "ladi-section-close", n.addEventListener("click", function(e) {
                            e.stopPropagation(), window.ladi(t).hide()
                        }), e.appendChild(n)
                    }
                }
            },
            j = function(t, e, a, n, o, r, d, l) {
                "countdown" != a || isEmptyLadiPage(n) || (e = e || document.getElementById(t), isEmptyLadiPage(e) || (e.setAttribute("data-type", n), n != i.const.COUNTDOWN_TYPE.countdown || isEmptyLadiPage(o) || e.setAttribute("data-minute", o), n != i.const.COUNTDOWN_TYPE.endtime || isEmptyLadiPage(l) || e.setAttribute("data-endtime", l), n != i.const.COUNTDOWN_TYPE.daily || isEmptyLadiPage(r) || isEmptyLadiPage(d) || (e.setAttribute("data-daily-start", r), e.setAttribute("data-daily-end", d))))
            },
            G = function(t, e, i, a) {
                "countdown_item" != i || isEmptyLadiPage(a) || (e = e || document.getElementById(t), isEmptyLadiPage(e) || e.setAttribute("data-item-type", a))
            },
            W = function() {
                b.forEach(function(t) {
                    var e = document.getElementById(t);
                    if (!isEmptyLadiPage(e) && "true" != e.getAttribute("data-action")) {
                        var a = i.runtime.eventData[t],
                            n = a["option.data_event"];
                        if (!isArrayLadiPage(n) && (n = [], isObjectLadiPage(a["option.data_action"]))) {
                            var o = i.copy(a["option.data_action"]);
                            o.action_type = i.const.ACTION_TYPE.action, n.push(o)
                        }! function(t, e) {
                            e.forEach(function(e) {
                                if (e.action_type == i.const.ACTION_TYPE.action && e.type == i.const.DATA_ACTION_TYPE.link)
                                    if (isEmptyLadiPage(t.getAttribute("href"))) t.removeAttribute("href");
                                    else {
                                        var a = i.getLinkUTMRedirect(t.href, null);
                                        t.setAttribute("data-replace-href", a), t.href = i.convertDataReplaceStr(a, !0)
                                    }
                            })
                        }(e, n)
                    }
                });
                for (var t = document.querySelectorAll(".ladi-headline a[href], .ladi-paragraph a[href], .ladi-list-paragraph a[href]"), e = 0; e < t.length; e++)
                    if (isEmptyLadiPage(t[e].getAttribute("href"))) t[e].removeAttribute("href");
                    else {
                        var a = i.getLinkUTMRedirect(t[e].href, null);
                        t[e].setAttribute("data-replace-href", a), t[e].href = i.convertDataReplaceStr(a, !0)
                    }
            },
            z = function() {
                for (var t = 1e3, e = 0; e < LadiPageQueueCommandList.length; e++) {
                    var a = LadiPageQueueCommandList[e];
                    if (isFunctionLadiPage(a.callback1) && a.callback1()) {
                        try {
                            isFunctionLadiPage(a.callback2) && a.callback2()
                        } catch (t) {}
                        LadiPageQueueCommandList.splice(e, 1), t = 0;
                        break
                    }
                }
                i.runTimeout(z, t)
            },
            X = function() {
                if (t) {
                    var e = function() {
                            // if (i.runtime.ladipage_powered_by_classname = i.randomString(i.randomInt(6, 32)), i.runtime.isClient) {
                            //     var t = document.createElement("div");
                            //     document.body.insertBefore(t, document.body.childNodes[i.randomInt(0, document.body.childNodes.length)]), t.className = i.runtime.ladipage_powered_by_classname;
                            //     var e = "." + i.runtime.ladipage_powered_by_classname + ' {width: 140px; height: 30px; position: fixed; bottom: -40px; left: 10px; z-index: 10000000000; background: url("' + i.const.POWERED_BY_IMAGE + '") no-repeat center #fafafa; background-size: 90% 70%; border-radius: 4px 4px 0 0; display: block; animation: ' + i.runtime.ladipage_powered_by_classname + " 10s;} @keyframes " + i.runtime.ladipage_powered_by_classname + " {0% {bottom: -40px;} 10% {bottom: 0;} 90% {bottom: 0;} 100% {bottom: -40px;}}",
                            //         a = document.createElement("style");
                            //     a.type = "text/css", document.head.insertBefore(a, document.head.childNodes[i.randomInt(0, document.head.childNodes.length)]), a.innerHTML = e, i.runTimeout(function() {
                            //         isEmptyLadiPage(t) || t.parentElement.removeChild(t), isEmptyLadiPage(a) || a.parentElement.removeChild(a)
                            //     }, 1e4)
                            // }
                        },
                        a = !1,
                        n = isArrayLadiPage(i.runtime.DOMAIN_FREE) ? i.runtime.DOMAIN_FREE : [],
                        o = window.location.href;
                    ["/", ".", "/"].forEach(function(t) {
                        for (; o.endsWith(t);) o = o.substr(0, o.length - t.length)
                    });
                    var r = i.getElementAHref(o).host.toLowerCase();
                    n.forEach(function(t) {
                        a || (a = r.endsWith(t.toLowerCase()))
                    }), a && i.runTimeout(e, 3e3);
                    M("PageView", {}, function(t, n) {
                        if (-1 != t || a || i.runTimeout(e, 3e3), 200 == t) {
                            var o = JSON.parse(n),
                                r = !1,
                                d = null,
                                l = null,
                                s = !1;
                            isObjectLadiPage(o.data) ? (r = 1 == o.data.verified_domain, d = o.data.google_captcha, l = o.data.places_autocomplete, s = o.data.is_expires) : r = 1 == o.data, a || r || i.runTimeout(e, 3e3), isObjectLadiPage(d) && function(t, e, a) {
                                if (!isEmptyLadiPage(t)) {
                                    var n = !1;
                                    a.type == i.const.FORM_CONFIG_TYPE.google_recaptcha_enterprise && (e = !0), a.type == i.const.FORM_CONFIG_TYPE.google_recaptcha_checkbox && (n = !0), i.runtime.tmp.google_captcha = {
                                        api_key: t,
                                        enterprise: e,
                                        checkbox: n,
                                        type: a.type
                                    }, window.onloadRecaptchaCheckboxCallback = function() {
                                        for (var e = function(e) {
                                                var i = document.createElement("div");
                                                i.className = "ladi-google-recaptcha-checkbox", e.insertBefore(i, a[n]);
                                                var o = window.grecaptcha.render(i, {
                                                    sitekey: t
                                                });
                                                i.setAttribute("data-widget-id", o)
                                            }, a = document.querySelectorAll(".ladi-form .ladi-button"), n = 0; n < a.length; n++) {
                                            var o = i.findAncestor(a[n], "ladi-element"),
                                                r = i.findAncestor(o, "ladi-form");
                                            if (!isEmptyLadiPage(r)) {
                                                r = i.findAncestor(r, "ladi-element");
                                                var d = i.runtime.eventData[r.id];
                                                if (!isEmptyLadiPage(d)) {
                                                    if (d["option.is_form_login"] || d["option.is_form_otp"] || d["option.is_form_coupon"] || d["option.is_add_to_cart"]) continue;
                                                    if (isObjectLadiPage(d["option.form_setting"]) && d["option.form_setting"].is_multiple && !d["option.form_setting"].is_multiple_otp) continue
                                                }
                                            }
                                            e(o)
                                        }
                                        for (var l = document.querySelectorAll("#POPUP_CHECKOUT .ladi-button"), s = 0; s < l.length; s++) {
                                            var c = i.findAncestor(l[s], "ladi-element"),
                                                u = i.runtime.eventData[c.id];
                                            isEmptyLadiPage(u) || isEmptyLadiPage(u["option.data_submit_form_id"]) || !u["option.is_submit_form"] || e(c)
                                        }
                                    }, e ? i.loadScript("https://www.google.com/recaptcha/enterprise.js?render=" + t + "&hl=" + i.runtime.lang) : n ? i.loadScript("https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCheckboxCallback&render=explicit&hl=" + i.runtime.lang) : i.loadScript("https://www.google.com/recaptcha/api.js?render=" + t)
                                }
                            }(d.site_key, d.enterprise, d), isObjectLadiPage(l) && (c = l.api_key, isEmptyLadiPage(c) || (window.onloadGooglePlacesAutocompleteCallback = function() {
                                var t = document.querySelectorAll("[data-places-autocomplete-country]"),
                                    e = null,
                                    i = 0,
                                    a = {},
                                    n = function(n) {
                                        for (i = 0; i < t.length; i++)(e = t[i].querySelector('input[name="address"]')).removeAttribute("data-focus");
                                        (e = n.target).setAttribute("data-focus", !0), a = e.getAttribute("data-attrs"), isEmptyLadiPage(a) && ((a = {
                                            style: e.getAttribute("style"),
                                            placeholder: e.getAttribute("placeholder"),
                                            disabled: e.disabled
                                        }).style = isEmptyLadiPage(a.style) ? "" : a.style, a.placeholder = isEmptyLadiPage(a.placeholder) ? "" : a.placeholder, a.disabled = !isNullLadiPage(a.disabled) && a.disabled, e.setAttribute("data-attrs", encodeURIComponent(JSON.stringify(a))))
                                    };
                                for (i = 0; i < t.length; i++) {
                                    var o = t[i].getAttribute("data-places-autocomplete-country"),
                                        r = {
                                            types: ["address"]
                                        };
                                    (o = isEmptyLadiPage(o) ? [] : (o = (o = o.split(",")).removeSpace()).unique()).length > 0 && (r.componentRestrictions = {
                                        country: o
                                    }), (e = t[i].querySelector('input[name="address"]')).addEventListener("focus", n), new google.maps.places.Autocomplete(e, r)
                                }
                                t.length > 0 && (window.gm_authFailure = function() {
                                    for (i = 0; i < t.length; i++) e = t[i].querySelector('input[name="address"]'), a = e.getAttribute("data-attrs"), a = isEmptyLadiPage(a) ? {
                                        style: "",
                                        placeholder: "",
                                        disabled: !1
                                    } : JSON.parse(decodeURIComponentLadiPage(a)), e.setAttribute("style", a.style), e.setAttribute("placeholder", a.placeholder), e.disabled = a.disabled, "true" == e.getAttribute("data-focus") && e.focus()
                                })
                            }, i.loadScript("https://maps.googleapis.com/maps/api/js?key=" + c + "&libraries=places&callback=onloadGooglePlacesAutocompleteCallback"))), s && function() {
                                if (!window.next && !isEmptyLadiPage(S)) {
                                    var t = i.const.LANG.EXPIRES_TITLE,
                                        e = i.const.LANG.EXPIRES_DESC;
                                    i.showMessage(`\n            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&amp;display=swap" rel="stylesheet" type="text/css">\n            <style>\n                .ladipage-message-box > span, .ladipage-message-close {display: none !important;}\n                .ladipage-message-box {border:none; border-radius: 20px; background: linear-gradient(59deg, #5036DA 27.6%, #9382F0 129.38%); width: 480px !important; height: auto !important; font-family: 'Roboto';}\n                .ladipage-message-box .ladipage-message-text {display: flex !important; justify-content: center; align-items: center; flex-flow: column; margin-top: 0 !important; padding: 48px 24px 12px !important; text-align: center;}\n                .ladipage-message-box img {width: 120px; height: 120px;}\n                .ladipage-message-box h3 {font-size: 24px; position: relative; text-transform: uppercase; font-weight: 500; line-height: 26px; margin-top: 12px; color: #fff;}\n                .ladipage-message-box h3:before {content: ""; background: #D3C9FB; width: 90%; height: 2px; position: absolute; bottom: -8px; left: 0; right: 0; margin: auto;}\n                .ladipage-message-box p {font-size: 16px; margin-top: 24px; font-weight: 400; line-height: 20px; color: #fff;}\n                .ladipage-message-box a {width: 117px; height: 20px; background-color: #fff; --url: url("https://w.ladicdn.com/ladiui/icons/ldicon-brand-powered-ladipage.svg"); margin-top: 40px; mask: var(--url); -webkit-mask: var(--url);}\n            </style>\n            <img src="https://w.ladicdn.com/ladiui/icons/expired-landing-page.svg" />\n            <h3>${t}</h3>\n            <p>${e}</p>\n            <a></a>\n        `), window.LadiPageScript = null, window.LadiPageScriptV2 = null, window.ladi = null, window.LadiPageLibraryV2 = null, window.isNullLadiPage = null, window.isEmptyLadiPage = null
                                }
                            }()
                        }
                        var c
                    })
                }
            },
            $ = function(t, e, a, n) {
                if (isEmptyLadiPage(i.runtime.current_element_mouse_down_gallery_view) && isEmptyLadiPage(i.runtime.current_element_mouse_down_gallery_control)) {
                    var o = t.getAttribute("data-runtime-id");
                    if (isEmptyLadiPage(i.runtime.timeout_gallery[o]) && (!i.runtime.tmp.gallery_playing_video || !e)) {
                        var r = t.getElementsByClassName("ladi-gallery-view-item"),
                            d = t.getElementsByClassName("ladi-gallery-control-item");
                        if (e && t.getElementsByClassName("ladi-gallery-control-box")[0].style.removeProperty("transition-duration"), 0 != r.length && 0 != r.length) {
                            var l = t.getAttribute("data-is-next") || "true";
                            l = "true" == l.toLowerCase();
                            var s = parseFloatLadiPage(t.getAttribute("data-current")) || 0,
                                c = parseFloatLadiPage(t.getAttribute("data-max-item")) || 0;
                            e ? s >= c - 1 ? s = 0 : s++ : l ? ++s >= c && (s = 0) : --s < 0 && (s = c - 1), s < 0 && (s = 0), s >= c - 1 && (s = c - 1), isEmptyLadiPage(a) && (a = l ? "next" : "prev"), isEmptyLadiPage(n) && (n = l ? "left" : "right"), i.runtime.tmp.gallery_playing_video && !r[s].classList.contains("selected") && i.pauseAllVideo(), r[s].classList.add(a);
                            var u = t.querySelectorAll(".ladi-gallery-view-item.selected")[0];
                            isEmptyLadiPage(u) || u.classList.add(n);
                            var p = 1e3 * (parseFloatLadiPage(getComputedStyle(r[s]).transitionDuration) || 0);
                            i.runtime.timeout_gallery[o] = i.runTimeout(function() {
                                r[s].classList.add(n), i.runtime.timeout_gallery[o] = i.runTimeout(function() {
                                    for (var t = 0; t < r.length; t++) t == s ? r[t].classList.add("selected") : r[t].classList.remove("selected"), r[t].style.removeProperty("left"), r[t].classList.remove(a), r[t].classList.remove(n);
                                    delete i.runtime.timeout_gallery[o]
                                }, p - 5)
                            }, 5);
                            for (var m = 0; m < d.length; m++)(parseFloatLadiPage(d[m].getAttribute("data-index")) || 0) == s ? d[m].classList.add("selected") : d[m].classList.remove("selected");
                            var _ = i.getElementBoundingClientRect(t),
                                g = i.getElementBoundingClientRect(t.getElementsByClassName("ladi-gallery-control-item")[s]);
                            if (t.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.remove("opacity-0"), t.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.remove("opacity-0"), t.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-top") || t.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-bottom")) {
                                var y = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control")[0]).width) || 0,
                                    h = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control-item")[s]).width) || 0,
                                    f = g.x - _.x - (y - h) / 2;
                                f = -(f -= parseFloatLadiPage(t.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("left")) || 0) > 0 ? 0 : -f;
                                var v = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0;
                                f < (v = (v = -(v -= parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control")[0]).width) || 0)) > 0 ? 0 : v) && (f = v), t.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("left", f + "px"), f >= 0 && t.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), f <= v && t.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            } else {
                                var E = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control")[0]).height) || 0,
                                    P = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control-item")[s]).height) || 0,
                                    L = g.y - _.y - (E - P) / 2;
                                L = -(L -= parseFloatLadiPage(t.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("top")) || 0) > 0 ? 0 : -L;
                                var b = parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control-box")[0]).height) || 0;
                                L < (b = (b = -(b -= parseFloatLadiPage(getComputedStyle(t.getElementsByClassName("ladi-gallery-control")[0]).height) || 0)) > 0 ? 0 : b) && (L = b), t.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("top", L + "px"), L >= 0 && t.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), L <= b && t.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            }
                            t.setAttribute("data-is-next", l), t.setAttribute("data-current", s), c <= 1 ? (t.getElementsByClassName("ladi-gallery-view-arrow-left")[0].classList.add("opacity-0"), t.getElementsByClassName("ladi-gallery-view-arrow-right")[0].classList.add("opacity-0")) : (t.getElementsByClassName("ladi-gallery-view-arrow-left")[0].classList.remove("opacity-0"), t.getElementsByClassName("ladi-gallery-view-arrow-right")[0].classList.remove("opacity-0")), (t.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-left") || t.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-right")) && i.reloadLazyload(!1), !e && t.hasAttribute("data-loaded") && t.setAttribute("data-stop", !0)
                        }
                    }
                }
            },
            K = function(t, e, a) {
                var n = e.getAttribute("data-video-type"),
                    o = e.getAttribute("data-video-url"),
                    r = e.getAttribute("data-index"),
                    d = t.getAttribute("data-runtime-id") + "_" + r + "_player",
                    l = document.getElementById(d);
                a || (i.pauseAllVideo(), i.runtime.tmp.gallery_playing_video = !0), isEmptyLadiPage(l) ? (n == i.const.VIDEO_TYPE.youtube && (l = document.createElement("iframe"), e.parentElement.insertBefore(l, e.nextSibling), l.outerHTML = '<iframe id="' + d + '" class="iframe-video-preload" data-video-type="' + n + '" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', i.runEventPlayVideo(d, n, o, !1, !1, !0, a, !1, !0)), n == i.const.VIDEO_TYPE.direct && (l = document.createElement("video"), e.parentElement.insertBefore(l, e.nextSibling), l.outerHTML = '<video id="' + d + '" class="iframe-video-preload" data-video-type="' + n + '" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; object-fit: cover;"></video>', i.runEventPlayVideo(d, n, o, !1, !1, !0, a, !1, !0))) : i.runEventReplayVideo(d, n, !0)
            },
            J = function(t, e, a, n) {
                if ("gallery" == n && (a || (e = document.getElementById(t)), !isEmptyLadiPage(e))) {
                    var o = e.getElementsByClassName("ladi-gallery-control-item").length;
                    e.setAttribute("data-max-item", o), e.setAttribute("data-runtime-id", i.randomString(10));
                    var r = function(t) {
                            t.stopPropagation(), K(e, t.target, !1)
                        },
                        d = e.classList.contains("preload");
                    if (o > 0) {
                        for (var l = 0; l < o; l++) {
                            var s = e.getElementsByClassName("ladi-gallery-view-item")[l];
                            isEmptyLadiPage(s) || (d && K(e, s, d), s.classList.contains("play-video") && s.addEventListener("click", r))
                        }
                        e.setAttribute("data-current", 0), e.setAttribute("data-is-next", !0)
                    }
                    for (var c = e.getElementsByClassName("ladi-gallery-view-arrow"), u = 0; u < c.length; u++) o <= 1 ? c[u].classList.add("ladi-hidden") : c[u].classList.remove("ladi-hidden")
                }
            },
            Q = function(t, e) {
                t.stopPropagation();
                var a = i.runtime.eventData[e.id],
                    n = a[i.runtime.device + ".option.gallery_control.autoplay"],
                    o = a[i.runtime.device + ".option.gallery_control.autoplay_time"],
                    r = 0;
                n && !isEmptyLadiPage(o) && (r = o);
                var d = parseFloatLadiPage(t.target.getAttribute("data-index")) || 0,
                    l = null,
                    s = null;
                (parseFloatLadiPage(e.getAttribute("data-current")) || 0) > d ? (l = "prev", s = "right") : (l = "next", s = "left");
                var c = e.getAttribute("data-is-next") || "true";
                (c = "true" == c.toLowerCase()) ? d-- : d++, e.setAttribute("data-current", d), e.setAttribute("data-next-time", Date.now() + 1e3 * r), $(e, !1, l, s)
            },
            Z = function() {
                b.forEach(function(t) {
                    var e = i.runtime.eventData[t];
                    if ("gallery" == e.type)
                        for (var a = document.querySelectorAll("#" + t), n = 0; n < a.length; n++) {
                            var o = a[n];
                            if ("true" == o.getAttribute("data-scrolled") && "true" != o.getAttribute("data-stop")) {
                                var r = e[i.runtime.device + ".option.gallery_control.autoplay"],
                                    d = e[i.runtime.device + ".option.gallery_control.autoplay_time"],
                                    l = 0;
                                if (r && !isEmptyLadiPage(d) && (l = d), l > 0) {
                                    var s = o.getAttribute("data-next-time"),
                                        c = Date.now();
                                    isEmptyLadiPage(s) && (s = c + 1e3 * (l - 1), o.setAttribute("data-next-time", s)), c >= s && ($(o, !0), o.setAttribute("data-next-time", c + 1e3 * l))
                                }
                            }
                        }
                })
            },
            tt = function(t, e) {
                var a = i.runtime.eventData[t];
                if ("gallery" == a.type) {
                    var n = e.getAttribute("data-runtime-id");
                    if (!e.hasAttribute("data-scrolled")) {
                        e.setAttribute("data-scrolled", !1);
                        i.runtime.list_scroll_func[n] = function() {
                            e.setAttribute("data-scrolled", !0)
                        }
                    }
                    var o = a[i.runtime.device + ".option.gallery_control.autoplay"],
                        r = a[i.runtime.device + ".option.gallery_control.autoplay_time"],
                        d = 0;
                    o && !isEmptyLadiPage(r) && (d = r);
                    var l = function(t) {
                            Q(t, e)
                        },
                        s = function(t) {
                            if (t.stopPropagation(), !(t = i.getEventCursorData(t)).target.classList.contains("ladi-gallery-view-arrow")) {
                                var a = e.getAttribute("data-runtime-id");
                                isEmptyLadiPage(i.runtime.timeout_gallery[a]) && (i.runtime.current_element_mouse_down_gallery_view = a, i.runtime.current_element_mouse_down_gallery_view_position_x = t.pageX, i.runtime.current_element_mouse_down_gallery_view_position_y = t.pageY)
                            }
                        },
                        c = function(t) {
                            t.stopPropagation(), t = i.getEventCursorData(t), (e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-top") || e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-bottom")) && (t.target.classList.contains("ladi-gallery-control-arrow") || (i.runtime.current_element_mouse_down_gallery_control = n, i.runtime.current_element_mouse_down_gallery_control_time = Date.now(), i.runtime.current_element_mouse_down_gallery_control_position_x = t.pageX, e.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("transition-duration", "0ms"), e.getElementsByClassName("ladi-gallery-control-box")[0].setAttribute("data-left", getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).left)))
                        };
                    e.getElementsByClassName("ladi-gallery-view-arrow-left")[0].addEventListener("click", function(t) {
                        t.stopPropagation(), e.setAttribute("data-is-next", !1), e.setAttribute("data-next-time", Date.now() + 1e3 * d), $(e, !1)
                    }), e.getElementsByClassName("ladi-gallery-view-item").length > 1 && (e.getElementsByClassName("ladi-gallery-view-arrow-left")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery-view-arrow-right")[0].classList.remove("opacity-0")), e.getElementsByClassName("ladi-gallery-view-arrow-right")[0].addEventListener("click", function(t) {
                        t.stopPropagation(), e.setAttribute("data-is-next", !0), e.setAttribute("data-next-time", Date.now() + 1e3 * d), $(e, !1)
                    }), e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].addEventListener("click", function(t) {
                        t.stopPropagation();
                        var i = e.getElementsByClassName("ladi-gallery-control-item")[0];
                        if (!isEmptyLadiPage(i)) {
                            var a = getComputedStyle(i);
                            if (e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-top") || e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-bottom")) {
                                var n = (parseFloatLadiPage(a.width) || 0) + (parseFloatLadiPage(a.marginRight) || 0);
                                n += parseFloatLadiPage(e.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("left")) || 0;
                                var o = parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0;
                                o = (o = -(o -= parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control")[0]).width) || 0)) > 0 ? 0 : o, n > 0 && (n = 0), e.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("left", n + "px"), n >= 0 && e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), n <= o && e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            } else {
                                var r = (parseFloatLadiPage(a.height) || 0) + (parseFloatLadiPage(a.marginBottom) || 0);
                                r += parseFloatLadiPage(e.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("top")) || 0;
                                var l = parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).height) || 0;
                                l = (l = -(l -= parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control")[0]).height) || 0)) > 0 ? 0 : l, r > 0 && (r = 0), e.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("top", r + "px"), r >= 0 && e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), r <= l && e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            }
                            e.setAttribute("data-next-time", Date.now() + 1e3 * d)
                        }
                    }), (parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0) > (parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control")[0]).width) || 0) && e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].addEventListener("click", function(t) {
                        t.stopPropagation();
                        var i = e.getElementsByClassName("ladi-gallery-control-item")[0];
                        if (!isEmptyLadiPage(i)) {
                            var a = getComputedStyle(i);
                            if (e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.remove("opacity-0"), e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-top") || e.getElementsByClassName("ladi-gallery")[0].classList.contains("ladi-gallery-bottom")) {
                                var n = (parseFloatLadiPage(a.width) || 0) + (parseFloatLadiPage(a.marginRight) || 0);
                                n = -n + (parseFloatLadiPage(e.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("left")) || 0);
                                var o = parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).width) || 0;
                                n < (o = (o = -(o -= parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control")[0]).width) || 0)) > 0 ? 0 : o) && (n = o), e.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("left", n + "px"), n >= 0 && e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), n <= o && e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            } else {
                                var r = (parseFloatLadiPage(a.height) || 0) + (parseFloatLadiPage(a.marginBottom) || 0);
                                r = -r + (parseFloatLadiPage(e.getElementsByClassName("ladi-gallery-control-box")[0].style.getPropertyValue("top")) || 0);
                                var l = parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control-box")[0]).height) || 0;
                                r < (l = (l = -(l -= parseFloatLadiPage(getComputedStyle(e.getElementsByClassName("ladi-gallery-control")[0]).height) || 0)) > 0 ? 0 : l) && (r = l), e.getElementsByClassName("ladi-gallery-control-box")[0].style.setProperty("top", r + "px"), r >= 0 && e.getElementsByClassName("ladi-gallery-control-arrow-left")[0].classList.add("opacity-0"), r <= l && e.getElementsByClassName("ladi-gallery-control-arrow-right")[0].classList.add("opacity-0")
                            }
                            e.setAttribute("data-next-time", Date.now() + 1e3 * d)
                        }
                    }), e.getElementsByClassName("ladi-gallery-view")[0].addEventListener("mousedown", s), e.getElementsByClassName("ladi-gallery-view")[0].addEventListener("touchstart", s, i.runtime.scrollEventPassive), e.getElementsByClassName("ladi-gallery-control")[0].addEventListener("mousedown", c), e.getElementsByClassName("ladi-gallery-control")[0].addEventListener("touchstart", c, i.runtime.scrollEventPassive);
                    for (var u = e.getElementsByClassName("ladi-gallery-control-item"), p = 0; p < u.length; p++) u[p].addEventListener("click", l);
                    isEmptyLadiPage(a["option.product_mapping_name"]) && !e.hasAttribute("data-loaded") && i.runTimeout(function() {
                        e.setAttribute("data-loaded", !0)
                    }, 300)
                }
            },
            et = function(t, e) {
                if ((isEmptyLadiPage(i.runtime.timenext_carousel[t]) || !(i.runtime.timenext_carousel[t] > Date.now())) && isEmptyLadiPage(i.runtime.current_element_mouse_down_carousel)) {
                    var a = document.getElementById(t);
                    if (!isEmptyLadiPage(a)) {
                        var n = i.runtime.eventData[t];
                        if ("carousel" == n.type) {
                            var o = a.getElementsByClassName("ladi-carousel-arrow-left")[0],
                                r = a.getElementsByClassName("ladi-carousel-arrow-right")[0];
                            isEmptyLadiPage(o) || o.classList.remove("opacity-0"), isEmptyLadiPage(r) || r.classList.remove("opacity-0");
                            var d = a.getAttribute("data-is-next") || "true";
                            d = "true" == d.toLowerCase();
                            var l = parseFloatLadiPage(a.getAttribute("data-current")) || 0,
                                s = l,
                                c = 0,
                                u = 0,
                                p = 0,
                                m = 0,
                                _ = 0,
                                g = 0,
                                y = 0,
                                h = 0,
                                f = 0,
                                v = 0,
                                E = a.getElementsByClassName("ladi-carousel-content")[0];
                            e && E.style.removeProperty("transition-duration");
                            var P = 1e3 * (parseFloatLadiPage(getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).transitionDuration) || 0);
                            i.runtime.timenext_carousel[t] = Date.now() + P;
                            var L = !1;
                            if (isEmptyLadiPage(n["option.meta_data.version"])) {
                                if (c = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.width"]) || 0, (parseFloatLadiPage(getComputedStyle(a).width) || 0) >= c) return o.classList.add("opacity-0"), void r.classList.add("opacity-0");
                                (p = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.width_item"]) || 0) > a.clientWidth && (p = a.clientWidth), _ = Math.ceil(c / p), e ? d ? l > _ - 2 ? (l = _ - 2, d = !1) : l++ : l < 1 ? (l = 1, d = !0) : l-- : d ? l++ : l--, l < 0 && (l = 0), l > _ - 1 && (l = _ - 1);
                                var b = i.getElementBoundingClientRect(a);
                                (y = -(y = b.x + l * p - b.x - (a.clientWidth - p) / 2) > 0 ? 0 : -y) < (f = -(c - a.clientWidth)) && (y = f), E.style.setProperty("left", y + "px"), y >= 0 && o.classList.add("opacity-0"), y <= f && r.classList.add("opacity-0")
                            }
                            if (n["option.meta_data.version"] == i.const.META_VERSION.two) {
                                if (n[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.horizontal) {
                                    if (c = parseFloatLadiPage(getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).width) || 0, (parseFloatLadiPage(getComputedStyle(a).width) || 0) >= c) return o.classList.add("opacity-0"), void r.classList.add("opacity-0");
                                    g = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.margin_item"]) || 0, p = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.width_item"]) || 0, _ = a.querySelectorAll(".ladi-carousel-content > .ladi-element").length
                                }
                                if (n[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.vertical) {
                                    if (u = parseFloatLadiPage(getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).height) || 0, (parseFloatLadiPage(getComputedStyle(a).height) || 0) >= u) return o.classList.add("opacity-0"), void r.classList.add("opacity-0");
                                    g = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.margin_item"]) || 0, m = parseFloatLadiPage(i.runtime.eventData[t][i.runtime.device + ".option.carousel_crop.width_item"]) || 0, _ = a.querySelectorAll(".ladi-carousel-content > .ladi-element").length
                                }
                                if (e) {
                                    if (n["option.carousel_setting.autoplay_type"] == i.const.CAROUSEL_AUTOPLAY_TYPE.type_ab && (++l < 0 && (l = 0), l >= _)) return;
                                    n["option.carousel_setting.autoplay_type"] == i.const.CAROUSEL_AUTOPLAY_TYPE.type_abab && (l > _ - 2 ? l = 0 : l++, l < 0 && (l = 0), l > _ - 1 && (l = _ - 1)), n["option.carousel_setting.autoplay_type"] == i.const.CAROUSEL_AUTOPLAY_TYPE.type_abba && (d ? l > _ - 2 ? (l = _ - 2, d = !1) : l++ : l < 1 ? (l = 1, d = !0) : l--, l < 0 && (l = 0), l > _ - 1 && (l = _ - 1))
                                } else d ? ++l >= _ && (l = 0) : --l < 0 && (l = _ - 1);
                                n[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.horizontal && (y = -(p * l + g * l), (y = (y += (a.clientWidth - p) / 2) > 0 ? 0 : y) < (f = -(c - a.clientWidth)) && (y = f), s != l && parseFloatLadiPage(getComputedStyle(E).left) == y && (L = !0), E.style.setProperty("left", y + "px")), n[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.vertical && (h = -(m * l + g * l), (h = (h += (a.clientHeight - m) / 2) > 0 ? 0 : h) < (v = -(u - a.clientHeight)) && (h = v), s != l && parseFloatLadiPage(getComputedStyle(E).top) == h && (L = !0), E.style.setProperty("top", h + "px"))
                            }
                            a.setAttribute("data-is-next", d), a.setAttribute("data-current", l);
                            var A = a.querySelector(".ladi-carousel-indicators-circle .item.selected, .ladi-carousel-indicators-number .item.selected");
                            isEmptyLadiPage(A) || A.classList.remove("selected"), A = a.querySelector('.ladi-carousel-indicators-circle .item[data-index="' + l + '"], .ladi-carousel-indicators-number .item[data-index="' + l + '"]'), isEmptyLadiPage(A) || A.classList.add("selected"), e || a.setAttribute("data-stop", !0), i.runAnimationDoc(a, null, {
                                is_multiple: !0,
                                element_type: n.type
                            }), L && !e && (delete i.runtime.timenext_carousel[t], et(t, e))
                        }
                    }
                }
            },
            it = function(t, e) {
                var a = function(t) {
                        t.addEventListener("click", function(e) {
                            e.stopPropagation(), t.classList.contains("accordion-menu") && i.runtime.time_click_dom[t.id] > Date.now() || (i.runtime.time_click_dom[t.id] = Date.now() + 250, t.classList.contains("selected") ? t.classList.remove("selected") : t.classList.add("selected"))
                        })
                    },
                    n = [];
                e ? t.classList.contains("element-click-selected") && n.push(t) : n = document.getElementsByClassName("element-click-selected");
                for (var o = 0; o < n.length; o++) a(n[o])
            },
            at = function(t) {
                if (i.runtime.isClient && !i.runtime.isDesktop && !isEmptyLadiPage(i.runtime.bodyFontSize)) {
                    var e = (parseFloatLadiPage(getComputedStyle(document.body).fontSize) || 0) / i.runtime.bodyFontSize;
                    if (1 != e)
                        for (var a = document.querySelectorAll('.ladi-paragraph, .ladi-list-paragraph, .ladi-headline, .ladi-countdown, .ladi-form, .ladi-table, .ladi-spin-lucky, .ladi-form-checkout-title, [data-form-checkout-item="coupon_code"], [data-form-checkout-item="total_price"], [data-form-checkout-item="payment"] .ladi-form-item, [data-form-checkout-item="product"] .ladi-form-item, [data-form-checkout-item="fee_shipping"] .ladi-form-item, .ladi-form-checkout-payment-quantity input, [data-form-checkout-item="bump_offer"]'), n = 0; n < a.length; n++) {
                            var o = (parseFloatLadiPage(getComputedStyle(a[n]).fontSize) || 0) / (e * e);
                            a[n].style.setProperty("font-size", o + "px")
                        } else t > Date.now() && i.runTimeout(function() {
                            at(t)
                        }, 100)
                }
            },
            nt = function(t) {
                var e = null;
                return isEmptyLadiPage(t) || (e = t.classList.contains("no-value") ? null : t.getAttribute("data-value")), e = isEmptyLadiPage(e) ? "" : e
            },
            ot = function(t, e) {
                var i = t.querySelectorAll(".ladi-form-label-item");
                e = isEmptyLadiPage(e) ? "" : e;
                for (var a = 0; a < i.length; a++) {
                    nt(i[a]) == e ? i[a].classList.add("selected") : i[a].classList.remove("selected")
                }
            },
            rt = function(t) {
                var e = t.querySelector(".ladi-form-label-item.selected");
                return nt(e)
            },
            dt = function(t, e) {
                var a = t.target;
                if (a.classList.contains("disabled"))
                    for (var n = i.findAncestor(a, "ladi-element").querySelectorAll(".ladi-form-label-item"), o = 0; o < n.length; o++) n[o].classList.contains("no-value") ? n[o].classList.add("selected") : n[o].classList.remove("selected"), n[o].classList.remove("disabled");
                var r = nt(a);
                !t.is_fire_event && a.classList.contains("selected") && (r = "");
                var d = i.findAncestor(a, "ladi-form-label-container");
                ot(d, r), isFunctionLadiPage(e) && e(d)
            },
            lt = function(e, a, n, o) {
                if ("form" == a) {
                    var r = i.runtime.eventData[e];
                    if (!isEmptyLadiPage(r) && r["option.is_add_to_cart"]) {
                        var d = document.getElementById(e);
                        if (!isEmptyLadiPage(d) && (!n || isEmptyLadiPage(i.findAncestor(d, "ladi-collection-item")))) {
                            var l = d.querySelector('[data-variant="true"]');
                            if (!isEmptyLadiPage(l)) {
                                var s = i.runtime.eventData[l.id];
                                if (!isEmptyLadiPage(s)) {
                                    var c = r["option.product_type"],
                                        u = r["option.product_id"];
                                    if (!isEmptyLadiPage(c) && !isEmptyLadiPage(u)) {
                                        var p = i.generateVariantProduct(r, !1, null, null, null, null, !0, !0, function(t) {
                                            lt(e, a, n, o)
                                        });
                                        if (!(isEmptyLadiPage(p) || isEmptyLadiPage(p.store_info) || isEmptyLadiPage(p.product))) {
                                            var m = i.generateVariantProduct(r, !0, s["option.product_variant_type"], s["option.product_variant_title"], s["option.product_variant_price"], s["option.input_tabindex"], t, !0, function(t) {
                                                    lt(e, a, n, o)
                                                }),
                                                _ = function(t) {
                                                    i.updateProductVariantSelectOption(t, r, s, o, function() {
                                                        if (o) {
                                                            var a = i.generateVariantProduct(r, !1, null, null, null, null, !0, !0),
                                                                n = i.getProductVariantId(t.target, a.product);
                                                            if (!isArrayLadiPage(a.product.variants)) return;
                                                            var d = a.product.variants.find(function(t) {
                                                                return t.product_variant_id == n
                                                            });
                                                            if (isEmptyLadiPage(d)) return;
                                                            for (var l = document.querySelectorAll("#POPUP_PRODUCT .ladi-element"), s = 0; s < l.length; s++) l[s].id != e && i.runtime.tmp.runLadiSaleProductKey(l[s].id, !1, !0, d, a)
                                                        } else i.runtime.tmp.generateLadiSaleProduct(!1, !0, t)
                                                    })
                                                },
                                                g = function(t) {
                                                    dt(t, function(t) {
                                                        _({
                                                            target: t
                                                        })
                                                    })
                                                };
                                            i.showParentVisibility(l, function() {
                                                for (var t = l.clientHeight, e = t, a = l.querySelectorAll("select.ladi-form-control"), n = {}, o = 0; o < a.length; o++) n[a[o].getAttribute("data-store-id") + "_" + a[o].getAttribute("data-product-id") + "_" + a[o].getAttribute("data-product-option-id")] = a[o].value;
                                                var c = l.querySelectorAll(".ladi-form-label-container");
                                                for (o = 0; o < c.length; o++) n[c[o].getAttribute("data-store-id") + "_" + c[o].getAttribute("data-product-id") + "_" + c[o].getAttribute("data-product-option-id")] = rt(c[o]);
                                                l.innerHTML = m;
                                                for (var u = null, p = null, y = l.querySelectorAll("select.ladi-form-control"), h = 0; h < y.length; h++) y[h].addEventListener("change", _), u = n[y[h].getAttribute("data-store-id") + "_" + y[h].getAttribute("data-product-id") + "_" + y[h].getAttribute("data-product-option-id")], isNullLadiPage(u) && (p = y[h].querySelector("option"), isEmptyLadiPage(p) || (u = p.getAttribute("value"))), y[h].value = u;
                                                var f = l.querySelectorAll(".ladi-form-label-container");
                                                for (h = 0; h < f.length; h++) {
                                                    for (var v = f[h].querySelectorAll(".ladi-form-label-item"), E = 0; E < v.length; E++) i.tapEventListener(v[E], g);
                                                    u = n[f[h].getAttribute("data-store-id") + "_" + f[h].getAttribute("data-product-id") + "_" + f[h].getAttribute("data-product-option-id")], isNullLadiPage(u) && (p = v[1], isEmptyLadiPage(p) || (u = nt(p))), ot(f[h], u)
                                                }
                                                if (i.updateProductVariantSelectOptionFirst(r, s, l), s["option.product_variant_type"] != i.const.PRODUCT_VARIANT_TYPE.combined) l.style.setProperty("height", "auto"), e = l.clientHeight, l.style.removeProperty("height"), e > 0 && t != e && (l.style.setProperty("height", e + "px"), i.updateHeightElement(!0, l, d, t, e));
                                                else if (!isEmptyLadiPage(r["option.product_variant_id"]))
                                                    for (var P = 0; P < y.length; P++) {
                                                        var L = y[P].querySelector('option[data-product-variant-id="' + r["option.product_variant_id"] + '"]');
                                                        isEmptyLadiPage(L) || y[P].value == L.getAttribute("value") || (y[P].value = L.getAttribute("value"), i.fireEvent(y[P], "change"))
                                                    }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            st = function(e, a, n) {
                if (isObjectLadiPage(a) && isObjectLadiPage(a.variant) && isObjectLadiPage(a.product)) {
                    var o = a.variant.src;
                    if (isEmptyLadiPage(o) && (o = a.product.image, isObjectLadiPage(o) && (o = o.src)), !isEmptyLadiPage(o)) {
                        !isStringLadiPage(o) || o.startsWith("http://") || o.startsWith("https://") || o.startsWith("//") || (o = "https://" + i.const.STATIC_W_DOMAIN + "/" + o);
                        var r = i.findAncestor(e, "ladi-collection-item"),
                            d = [],
                            l = 0,
                            s = null;
                        if (isEmptyLadiPage(r)) {
                            var c = document.querySelectorAll("[data-runtime-id]");
                            for (l = 0; l < c.length; l++) r = i.findAncestor(c[l], "ladi-collection-item"), isEmptyLadiPage(r) && (s = i.runtime.eventData[c[l].id], isEmptyLadiPage(s) || s["option.product_type"] != n["option.product_type"] || s["option.product_id"] != n["option.product_id"] || d.push(c[l]))
                        } else d = r.querySelectorAll("[data-runtime-id]");
                        for (l = 0; l < d.length; l++)
                            if (s = i.runtime.eventData[d[l].id], !isEmptyLadiPage(s) && !isEmptyLadiPage(s["option.product_mapping_name"])) {
                                var u = d[l].getElementsByClassName("ladi-gallery-view")[0],
                                    p = i.getOptimizeImage(o, u.clientWidth, u.clientHeight, !0, !1, !1, t);
                                p = 'url("' + p + '")';
                                var m = i.getOptimizeImage(o, 0, 0, !0, !1, !1, t);
                                m = 'url("' + m + '")';
                                for (var _ = u.getElementsByClassName("ladi-gallery-view-item"), g = 0; g < _.length; g++)
                                    if (p == getComputedStyle(_[g]).backgroundImage || m == getComputedStyle(_[g]).backgroundImage) {
                                        var y = (parseFloatLadiPage(_[g].getAttribute("data-index")) || 0) + 1;
                                        window.ladi(d[l].id, d[l]).index(y)
                                    }
                            }
                    }
                }
            },
            ct = function(e, a, n, o, r, d, l, s, c) {
                var u = i.runtime.eventData[e];
                if (!isEmptyLadiPage(u)) {
                    var p = u["option.product_mapping_name"],
                        m = !isEmptyLadiPage(p),
                        _ = u.type,
                        g = JSON.stringify(u),
                        y = null,
                        h = null;
                    if (d) y = r.product[p];
                    else if (isEmptyLadiPage(o)) {
                        if (isEmptyLadiPage(u) || isEmptyLadiPage(u["option.product_type"]) || isEmptyLadiPage(u["option.product_id"]) || isEmptyLadiPage(p)) return;
                        var f = u["option.product_variant_id"],
                            v = !1;
                        if (isEmptyLadiPage(f) && (a && (v = ! function() {
                                for (var t = !1, e = 0; e < b.length; e++) {
                                    var a = i.runtime.eventData[b[e]];
                                    if ("form" == a.type && a["option.product_type"] == u["option.product_type"] && a["option.product_id"] == u["option.product_id"]) {
                                        t = !0;
                                        break
                                    }
                                }
                                return t
                            }()), !isEmptyLadiPage(l))) {
                            if (u["option.product_id"] != l.target.getAttribute("data-product-id")) return;
                            var E = i.generateVariantProduct(u, !1, null, null, null, null, !0, !0, function(t) {
                                ct(e, a, n, o, r, !1, l)
                            });
                            isObjectLadiPage(E) && (f = i.getProductVariantId(l.target, E.product))
                        }
                        if (g === (y = (h = i.generateProductKey(!0, g, !0, u, v, f, o, function(t) {
                                ct(e, a, n, o, r, d, l)
                            })).value)) return
                    } else {
                        if ("form" == _ && u["option.is_add_to_cart"]) return u["option.product_id"] = o.product_id, u["option.product_variant_id"] = o.product_variant_id, void lt(e, _, !1, !0);
                        if (!m) return;
                        y = (y = (h = i.generateProductKey(!0, null, !0, u, !1, o.product_variant_id, o)).value) || ""
                    }
                    var P = null,
                        L = null,
                        A = null;
                    if ("headline" == _ || "paragraph" == _) {
                        var T = s ? "ladi-html" : null;
                        window.ladi(e).value(isNullLadiPage(y) ? "" : y, T)
                    }
                    if ("image" == _) {
                        if (P = document.getElementById(e), isEmptyLadiPage(P)) return;
                        A = i.getOptimizeImage(y, P.clientWidth, P.clientHeight, !0, !1, !1, t), L = "style_add_to_cart_image_" + e;
                        var S = "";
                        S = isEmptyLadiPage(A) ? "#" + e + "  > .ladi-image > .ladi-image-background {background-image: none;}" : "#" + e + '  > .ladi-image > .ladi-image-background {background-image: url("' + A + '");}', i.createStyleElement(L, S)
                    }
                    if ("gallery" == _) {
                        if (!isArrayLadiPage(y)) return;
                        if (P = document.getElementById(e), isEmptyLadiPage(P)) return;
                        if (n && "true" == P.getAttribute("data-loaded")) return void st(P, h, u);
                        for (var w = P.getElementsByClassName("ladi-gallery-view")[0], O = P.getElementsByClassName("ladi-gallery-view-item"); O.length < y.length;) {
                            var C = i.createTmpElement("div", '<div class="ladi-gallery-view-item" data-index="' + O.length + '"></div>', null, !0);
                            P.getElementsByClassName("ladi-gallery-view")[0].appendChild(C)
                        }
                        for (; O.length > y.length;) O[O.length - 1].parentElement.removeChild(O[O.length - 1]);
                        for (var k = P.getElementsByClassName("ladi-gallery-control-item"), I = function(t) {
                                Q(t, P)
                            }; k.length < y.length;) {
                            var N = i.createTmpElement("div", '<div class="ladi-gallery-control-item" data-index="' + k.length + '"></div>', null, !0);
                            N.addEventListener("click", I), P.getElementsByClassName("ladi-gallery-control-box")[0].appendChild(N)
                        }
                        for (; k.length > y.length;) k[k.length - 1].parentElement.removeChild(k[k.length - 1]);
                        L = "style_add_to_cart_gallery_" + e;
                        var D = "";
                        y.length <= 1 && (D += "#" + e + " .ladi-gallery .ladi-gallery-view .ladi-gallery-view-arrow {display: none;}", D += "#" + e + " > .ladi-gallery > .ladi-gallery-view {height: 100%;}", D += "#" + e + " > .ladi-gallery > .ladi-gallery-control {display: none;}");
                        var R = P.getElementsByClassName("ladi-gallery-control-item")[0];
                        y.forEach(function(a, n) {
                            A = i.getOptimizeImage(a.src, w.clientWidth, w.clientHeight, !0, !1, !1, t), D += "#" + e + ' .ladi-gallery .ladi-gallery-view-item[data-index="' + n + '"] {background-image: url("' + A + '");}', A = i.getOptimizeImage(a.src, R.clientWidth, R.clientHeight, !0, !1, !1, t), D += "#" + e + ' .ladi-gallery .ladi-gallery-control-item[data-index="' + n + '"] {background-image: url("' + A + '");}'
                        }), P.setAttribute("data-max-item", y.length), P.setAttribute("data-loaded", !0), i.createStyleElement(L, D)
                    }
                }
            },
            ut = function() {
                var t = ["phone", "email", "coupon"],
                    e = document.querySelectorAll(".ladi-form .ladi-button");
                i.runtime.tmp.list_form_checkout = [];
                for (var a = function(t, e) {
                        var a = i.findAncestor(t.target, "ladi-form");
                        if (!isEmptyLadiPage(a) && (a = a.querySelector("[data-submit-form-id]"), !isEmptyLadiPage(a))) {
                            var n = a.getAttribute("data-submit-form-id");
                            if (!isEmptyLadiPage(n)) {
                                var o = document.querySelector("#" + n + ' .ladi-form-item input[name="coupon"]');
                                isEmptyLadiPage(o) || (o.value = t.target.value, i.fireEvent(o, e))
                            }
                        }
                    }, n = function(t) {
                        a(t, "change")
                    }, o = function(t) {
                        a(t, "input")
                    }, r = function(t) {
                        if (isEmptyLadiPage(i.runtime.tmp.current_use_coupon)) {
                            var e = i.findAncestor(t.target, "ladi-form"),
                                a = e.querySelector('input[name="coupon"]');
                            isEmptyLadiPage(a) || a.setAttribute("required", "required"), e.reportValidity() && i.reloadPriceDiscount(t)
                        }
                    }, d = 0; d < e.length; d++) {
                    var l = i.findAncestor(e[d], "ladi-element");
                    if (!isEmptyLadiPage(l)) {
                        var s = i.findAncestor(e[d], "ladi-form");
                        if (!isEmptyLadiPage(s)) {
                            var c = i.findAncestor(s, "ladi-element");
                            if (!isEmptyLadiPage(c)) {
                                var u = i.runtime.eventData[c.id];
                                if (!isEmptyLadiPage(u)) {
                                    var p = i.runtime.eventData[l.id];
                                    if (isObjectLadiPage(p) && !isEmptyLadiPage(p["option.data_submit_form_id"])) {
                                        if (u["option.is_form_coupon"]) {
                                            l.setAttribute("data-submit-form-id", p["option.data_submit_form_id"]), l.addEventListener("click", r), s.onsubmit = function() {
                                                return !1
                                            };
                                            var m = s.querySelector('.ladi-form-item input[name="coupon"]');
                                            if (!isEmptyLadiPage(m)) {
                                                m.addEventListener("change", n), m.addEventListener("input", o);
                                                var _ = document.querySelector("#" + p["option.data_submit_form_id"] + ' .ladi-form-item input[name="coupon"]');
                                                isEmptyLadiPage(_) || _.setAttribute("data-replace-coupon", !0)
                                            }
                                            i.runtime.tmp.list_form_checkout.push(p["option.data_submit_form_id"])
                                        }
                                    } else if (!u["option.is_form_login"] && !u["option.is_form_coupon"]) {
                                        var g = i.findAncestor(c, "ladi-popup");
                                        isEmptyLadiPage(g) || (g = i.findAncestor(g, "ladi-element")), isEmptyLadiPage(g) || "POPUP_CHECKOUT" != g.id || i.runtime.tmp.list_form_checkout.push(c.id)
                                    }
                                }
                            }
                        }
                    }
                }
                i.runtime.tmp.list_form_checkout = i.runtime.tmp.list_form_checkout.unique();
                for (var y = function(t) {
                        -1 == [i.const.FORM_CONFIG_TYPE.sapo, i.const.FORM_CONFIG_TYPE.haravan, i.const.FORM_CONFIG_TYPE.shopify, i.const.FORM_CONFIG_TYPE.wordpress].indexOf(i.runtime.shopping_product_type) && i.reloadPriceDiscount()
                    }, h = 0; h < i.runtime.tmp.list_form_checkout.length; h++)
                    for (var f = document.querySelectorAll("#" + i.runtime.tmp.list_form_checkout[h] + " .ladi-form-item input.ladi-form-control"), v = 0; v < f.length; v++) - 1 != t.indexOf(f[v].getAttribute("name")) && (f[v].addEventListener("change", y), f[v].addEventListener("input", y))
            },
            pt = function() {
                for (var t = document.getElementById(i.runtime.backdrop_dropbox_id), e = 0, a = function(e) {
                        e.stopPropagation();
                        var a = i.findAncestor(e.target, "ladi-element"),
                            n = document.querySelector("#" + i.runtime.builder_section_popup_id + " > .ladi-container > #" + i.runtime.builder_popup_menu_mobile_id + "_" + a.id);
                        if (!isEmptyLadiPage(n)) {
                            n.setAttribute("data-menu-id", a.id), n.classList.add("popup-menu-mobile");
                            var o = n.getElementsByClassName("popup-close")[0];
                            isEmptyLadiPage(o) && ((o = document.createElement("div")).className = "popup-close", o.addEventListener("click", function(e) {
                                e.stopPropagation(), i.fireEvent(t, "click")
                            }), n.appendChild(o)), window.ladi(n.id, n).showDropbox(document.body)
                        }
                    }, n = function(t) {
                        if (t.hasAttribute("data-item")) return t.getAttribute("data-item");
                        var e = t.getElementsByTagName("a")[0];
                        return isEmptyLadiPage(e) ? void 0 : e.getAttribute("data-item")
                    }, o = function(t) {
                        isObjectLadiPage(i.runtime.tmp.menu_item_event) || (i.runtime.tmp.menu_item_event = {});
                        var a = String(++e);
                        i.runtime.tmp.menu_item_event[a] = n(t),
                            function(t, e) {
                                var i = t.getElementsByTagName("a")[0];
                                isEmptyLadiPage(i) ? t.setAttribute("data-item", e) : i.setAttribute("data-item", e)
                            }(t, a)
                    }, r = function(e) {
                        e.stopPropagation();
                        var a = i.findAncestor(e.target, "ladi-menu-item");
                        if ("true" != a.getAttribute("data-child")) {
                            var o = null;
                            try {
                                o = decodeURIComponentLadiPage(i.runtime.tmp.menu_item_event[n(a)]), o = JSON.parse(o)
                            } catch (t) {}
                            isObjectLadiPage(o) && !isEmptyLadiPage(o.type) && i.fireEvent(t, "click")
                        }
                    }, d = function(t) {
                        t.stopPropagation();
                        var e = i.findAncestor(t.target, "ladi-menu-item");
                        if ("true" == e.getAttribute("data-child")) {
                            e.classList.toggle("open");
                            var a = i.findAncestor(e, "popup-menu-mobile");
                            if (!isEmptyLadiPage(a)) return
                        }
                        var o = null;
                        try {
                            o = decodeURIComponentLadiPage(i.runtime.tmp.menu_item_event[n(e)]), o = JSON.parse(o)
                        } catch (t) {}
                        if ("true" == e.getAttribute("data-child")) {
                            var r = function(t, e) {
                                if (t.hasAttribute(e)) return t;
                                var i = t.getElementsByTagName("a")[0];
                                return !isEmptyLadiPage(i) && i.hasAttribute(e) ? i : void 0
                            }(e, "href");
                            isEmptyLadiPage(r) || r.click()
                        }
                        if (isObjectLadiPage(o)) {
                            o.action_type = i.const.ACTION_TYPE.action;
                            var d = i.findAncestor(e, "ladi-element");
                            i.runtime.tmp.runDataEventNow(d, [o], o)
                        }
                    }, l = document.querySelectorAll(".ladi-element .ladi-menu.menu-icon-item"), s = 0; s < l.length; s++) l[s].addEventListener("click", a);
                var c = document.querySelectorAll("#" + i.runtime.builder_section_popup_id + ' > .ladi-container > .ladi-element[id^="' + i.runtime.builder_popup_menu_mobile_id + '"][data-dropbox="true"] .ladi-element .ladi-menu.list-menu-items .ladi-menu-item');
                for (s = 0; s < c.length; s++) c[s].addEventListener("click", r);
                for (c = document.querySelectorAll(".ladi-element .ladi-menu.list-menu-items .ladi-menu-item"), s = 0; s < c.length; s++) o(c[s]), c[s].addEventListener("click", d), c[s].origin == window.location.origin && c[s].pathname == window.location.pathname && c[s].classList.add("selected")
            },
            mt = function(t) {
                var e = {
                    type: "POPUPX",
                    iframe_id: i.runtime.tmp.popupx_iframe_id
                };
                Object.keys(t).forEach(function(i) {
                    e[i] = t[i]
                }), i.postMessageWindow(window.parent, e, "*")
            },
            _t = function(t) {
                if (!i.runtime.tmp.popupx_is_desktop && !isEmptyLadiPage(t)) {
                    var e = parseFloatLadiPage(t);
                    window.innerWidth = e, window.outerWidth = e, isFunctionLadiPage(window.ladi_viewport) && window.ladi_viewport()
                }
            },
            gt = function(t, e, a, n) {
                var o = isEmptyLadiPage(i.runtime.tmp.popupx_current_element_id);
                i.runtime.tmp.popupx_current_element_id = t, !e || o || a || n || M("PageView", {})
            },
            yt = function(t, e) {
                for (var a = !1, n = !1, o = document.querySelectorAll("#" + i.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"), r = 0; r < o.length; r++) "none" != getComputedStyle(o[r]).display && (o[r].id == t && (a = !0), i.runRemovePopup(o[r].id, !0, null, !1, !0));
                for (o = document.querySelectorAll(".ladi-section:not(#" + i.runtime.builder_section_popup_id + ")"), r = 0; r < o.length; r++) "none" != getComputedStyle(o[r]).display && (o[r].id == t && (n = !0), window.ladi(o[r].id).hide(!0));
                return {
                    isCurrentPopup: a,
                    isCurrentSection: n
                }
            },
            ht = function(t, e, a) {
                var n = i.runtime.eventData[t],
                    o = document.getElementById(t),
                    r = null,
                    d = null,
                    l = !1,
                    s = !1,
                    c = {
                        width_device: i.runtime.desktop_width
                    },
                    u = document.getElementById("style_container_desktop");
                if ((isEmptyLadiPage(u) || "print" == u.getAttribute("media")) && (c = {
                        width_device: i.runtime.mobile_width
                    }), isObjectLadiPage(n) && !isEmptyLadiPage(o)) {
                    var p = getComputedStyle(o);
                    if ("popup" == n.type) {
                        r = {};
                        var m = n[i.runtime.device + ".option.popup_position"],
                            _ = !1;
                        if (isObjectLadiPage(a) && !isNullLadiPage(a.formThankyouPopupXInline) && (_ = a.formThankyouPopupXInline), _) return m == i.const.POSITION_TYPE.default ? mt({
                            group_id: i.runtime.tmp.popupx_iframe_id,
                            popupx_url: window.location.origin + window.location.pathname,
                            ladipage_id: i.runtime.ladipage_id,
                            action_type: "show_popupx",
                            action_value: t,
                            action: {
                                type: "run_action_force"
                            }
                        }) : ft(t, e), !0;
                        l = (d = yt(t)).isCurrentPopup, s = d.isCurrentSection;
                        ["width", "height", "position", "margin", "top", "left", "bottom", "right", "z-index"].forEach(function(t) {
                            r[t] = p[t]
                        }), _t(r.width), c.width = r.width;
                        var g = n[i.runtime.device + ".option.popup_backdrop"];
                        return mt({
                            id: t,
                            position: m,
                            data_backdrop: g,
                            data_scale: c,
                            is_opacity: !l,
                            set_scroll_popup: !0,
                            dimension: r,
                            action: {
                                type: "set_iframe_dimension"
                            }
                        }), window.ladi(t).show(!0), gt(t, e, l, s), !0
                    }
                    if ("section" == n.type) {
                        if (l = (d = yt(t)).isCurrentPopup, s = d.isCurrentSection, n[i.runtime.device + ".option.sticky"]) {
                            r = {
                                height: p.height
                            };
                            var y = o.getElementsByClassName("ladi-container")[0],
                                h = getComputedStyle(y);
                            _t(h.width), c.width = h.width, c.is_sticky_bar = !0, mt({
                                id: t,
                                data_scale: c,
                                dimension: r,
                                element: n,
                                device: i.runtime.device,
                                action: {
                                    type: "set_iframe_sticky"
                                }
                            }), window.ladi(t).show(!0), gt(t, e, l, s)
                        }
                        return !0
                    }
                }
                return !1
            },
            ft = function(t, e) {
                var a = i.runtime.eventData[t],
                    n = document.getElementById(t),
                    o = null;
                if (isObjectLadiPage(a) && !isEmptyLadiPage(n)) {
                    var r = getComputedStyle(n),
                        d = yt(t),
                        l = d.isCurrentPopup,
                        s = d.isCurrentSection,
                        c = {
                            width_device: i.runtime.desktop_width
                        },
                        u = document.getElementById("style_container_desktop");
                    if ((isEmptyLadiPage(u) || "print" == u.getAttribute("media")) && (c = {
                            width_device: i.runtime.mobile_width
                        }), o = {
                            width: r.width,
                            height: r.height
                        }, "popup" == a.type && (c.width = o.width), "section" == a.type) {
                        var p = n.getElementsByClassName("ladi-container")[0],
                            m = getComputedStyle(p);
                        o.width = m.width, c.width = m.width, c.is_sticky_bar = !0
                    }
                    return _t(o.width), mt({
                        id: t,
                        data_scale: c,
                        dimension: o,
                        action: {
                            type: "set_iframe_dimension"
                        }
                    }), window.ladi(t).show(!0), gt(t, e, l, s), !0
                }
                return !1
            },
            vt = function(t, e, a) {
                var n = isObjectLadiPage(e) && isObjectLadiPage(e.action) && isObjectLadiPage(e.action.form_data) ? e.action.form_data : {};
                isFunctionLadiPage(i.runtime.tmp.formMappingFunnelX) && i.runtime.tmp.formMappingFunnelX(t, e, n, a), isFunctionLadiPage(i.runtime.tmp.multipleFormRunFormParent) && i.runtime.tmp.multipleFormRunFormParent(t)
            },
            Et = function(t, e) {
                var a = document.getElementById(t);
                isEmptyLadiPage(a) || Array.from(a.querySelectorAll(".ladi-element .ladi-form")).forEach(function(t) {
                    t = i.findAncestor(t, "ladi-element"), vt(t.id, e, !1)
                })
            },
            Pt = function(t) {
                for (var e = ["style_element_desktop", "style_container_desktop", "style_ladi_media_desktop"], i = ["style_element_mobile", "style_container_mobile", "style_ladi_media_mobile"], a = 0; a < e.length; a++) {
                    var n = document.getElementById(e[a]);
                    isEmptyLadiPage(n) || (t ? n.removeAttribute("media") : n.setAttribute("media", "print"))
                }
                for (a = 0; a < i.length; a++) {
                    var o = document.getElementById(i[a]);
                    isEmptyLadiPage(o) || (t ? o.setAttribute("media", "print") : o.removeAttribute("media"))
                }
            },
            Lt = function() {
                var t = document.querySelectorAll('[data-buy-now-ladisales="true"], [data-add-to-cart-ladisales="true"]');
                if (0 != t.length) {
                    var e = i.runtime.shopping_ladisales_page_checkout_api_key,
                        a = i.runtime.shopping_ladisales_checkout_config_id;
                    if (!isEmptyLadiPage(e)) {
                        for (var n = function(t) {
                                t.style.setProperty("cursor", "pointer"), t.addEventListener("click", function(e) {
                                    e.stopPropagation(),
                                        function(t) {
                                            if (isObjectLadiPage(window.LadiSales)) {
                                                var e = {
                                                    productID: t.getAttribute("data-product-id"),
                                                    productVariantID: t.getAttribute("data-product-variant-id"),
                                                    quantity: 1
                                                };
                                                "true" == t.getAttribute("data-buy-now-ladisales") && isFunctionLadiPage(window.LadiSales.buyNow) && window.LadiSales.buyNow(e, {
                                                    callback: function(a) {
                                                        isObjectLadiPage(a) && (i.runEventTracking(null, {
                                                            cart_quantity: e.quantity,
                                                            cart_currency: a.currency_code,
                                                            cart_value: a.price,
                                                            is_form: !1,
                                                            is_add_to_cart: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        }), i.runTimeout(function() {
                                                            i.runEventTracking(null, {
                                                                is_form: !1,
                                                                is_click_buy_now: !0,
                                                                is_custom: !0,
                                                                event: {
                                                                    target: t
                                                                }
                                                            })
                                                        }, i.runtime.time_delay_click_button))
                                                    },
                                                    callback_order: function(e) {
                                                        i.runEventTracking(null, {
                                                            is_form: !1,
                                                            payment_info: e,
                                                            is_place_an_order: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        })
                                                    },
                                                    callback_payment: function(e) {
                                                        i.runEventTracking(null, {
                                                            is_form: !1,
                                                            payment_info: e,
                                                            is_complete_payment: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        })
                                                    }
                                                }), "true" == t.getAttribute("data-add-to-cart-ladisales") && isFunctionLadiPage(window.LadiSales.cartAdd) && window.LadiSales.cartAdd(e, {
                                                    callback: function(a) {
                                                        isObjectLadiPage(a) && i.runEventTracking(null, {
                                                            cart_quantity: e.quantity,
                                                            cart_currency: a.currency_code,
                                                            cart_value: a.price,
                                                            is_form: !1,
                                                            is_add_to_cart: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        })
                                                    },
                                                    callback_order: function(e) {
                                                        i.runEventTracking(null, {
                                                            is_form: !1,
                                                            payment_info: e,
                                                            is_place_an_order: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        })
                                                    },
                                                    callback_payment: function(e) {
                                                        i.runEventTracking(null, {
                                                            is_form: !1,
                                                            payment_info: e,
                                                            is_complete_payment: !0,
                                                            is_custom: !0,
                                                            event: {
                                                                target: t
                                                            }
                                                        })
                                                    },
                                                    callback_close: function() {}
                                                })
                                            }
                                        }(t)
                                })
                            }, o = 0; o < t.length; o++) n(t[o]);
                        var r = document.querySelector('script[src^="' + i.const.LADISALES_SDK + '"][data-time="' + i.runtime.timenow + '"]');
                        if (isEmptyLadiPage(r)) {
                            var d = e;
                            isEmptyLadiPage(a) || (d += "_" + a), i.loadScript(i.const.LADISALES_SDK, {
                                id: d,
                                "data-time": i.runtime.timenow
                            }, !0)
                        }
                    }
                }
            },
            bt = function() {
                var e;
                LadiPageShopping.push(function() {
                        i.changeTotalPriceCart()
                    }), i.runtime.tmp.generateLadiSaleProduct(!0), LadiPageShopping.push(function() {
                        i.createCartData()
                    }), i.loadDataset(null, null, null, null, null, !0, t), b.forEach(function(e) {
                        var a = i.runtime.eventData[e],
                            n = LadiPageApp[a.type + i.const.APP_RUNTIME_PREFIX];
                        isEmptyLadiPage(n) ? (function(t, e, a, n, o, r) {
                            var d = document.getElementById(t);
                            if (!isEmptyLadiPage(d) && (H(t), "section" == e && !isEmptyLadiPage(o) && !isEmptyLadiPage(r))) {
                                var l = d.getElementsByClassName("ladi-section-background")[0];
                                isEmptyLadiPage(l) || (i.runtime.list_scroll_func[t] = function() {
                                    if ((!i.runtime.isDesktop || a == i.const.BACKGROUND_STYLE.video) && (i.runtime.isDesktop || n == i.const.BACKGROUND_STYLE.video)) {
                                        var e = "",
                                            d = t + "_background_video";
                                        o == i.const.VIDEO_TYPE.youtube && (e = '<iframe id="' + d + '" class="ladi-section-background-video" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>', l.innerHTML += e, i.runEventPlayVideo(d, o, r, !0, !0, !1)), o == i.const.VIDEO_TYPE.direct && (e = '<video id="' + d + '" class="ladi-section-background-video" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"></video>', l.innerHTML += e, i.runEventPlayVideo(d, o, r, !0, !0, !1))
                                    }
                                })
                            }
                        }(e, a.type, a[i.const.DESKTOP + ".option.background-style"], a[i.const.MOBILE + ".option.background-style"], a["option.background_video.video_type"], a["option.background_video.video_value"]), V(null, e, a.type, a), function(t, e, a) {
                            i.runtime.list_loaded_func.push(function() {
                                var n = 0;
                                if (-1 != ["headline", "paragraph", "list_paragraph"].indexOf(e) && (n = 1e3), !isArrayLadiPage(a)) {
                                    var o = i.copy(a);
                                    a = [], isObjectLadiPage(o) && (o.action_type = i.const.ACTION_TYPE.action, a.push(o))
                                }
                                i.runTimeout(function() {
                                    a.forEach(function(e) {
                                        if (e.action_type == i.const.ACTION_TYPE.action && e.type == i.const.DATA_ACTION_TYPE.collapse && !isEmptyLadiPage(e.action) && (isNullLadiPage(e.collapse_start_is_show) || !e.collapse_start_is_show)) {
                                            window.ladi(e.action).collapse(!1);
                                            for (var a = document.querySelectorAll("#" + t + " > .ladi-frame > .ladi-element.ladi-accordion-shape"), n = 0; n < a.length; n++) {
                                                var o = i.getSource2ndClick(a[n].id);
                                                isEmptyLadiPage(o) || window.ladi(a[n].id, a[n]).set_value_2nd(o)
                                            }
                                        }
                                    })
                                }, n)
                            })
                        }(e, a.type, a["option.data_event"] || a["option.data_action"]), Y(null, e, a.type, a["option.data_event"] || a["option.data_hover"]), function(t, e, a, n, o, r, d) {
                            if ("video" == e && !isEmptyLadiPage(a)) {
                                var l = document.getElementById(t);
                                if (!isEmptyLadiPage(l)) {
                                    var s = function() {
                                            var e = i.runtime.eventData[t];
                                            isObjectLadiPage(e) && (n = e["option.video_type"], a = e["option.video_value"], o = e["option.video_control"])
                                        },
                                        c = i.runtime.isDesktop && r || !i.runtime.isDesktop && d;
                                    if (c) {
                                        var u = function() {
                                                s(), i.playVideo(t, n, a, o, c)
                                            },
                                            p = i.findAncestor(l, "ladi-popup");
                                        isEmptyLadiPage(p) ? i.runtime.list_scroll_func[t] = u : (p = i.findAncestor(p, "ladi-element"), isArrayLadiPage(i.runtime.list_show_popup_func[p.id]) || (i.runtime.list_show_popup_func[p.id] = []), i.runtime.list_show_popup_func[p.id].push(u))
                                    } else {
                                        var m = document.querySelectorAll("#" + t + ".preload").length > 0;
                                        m && i.playVideo(t, n, a, o, !1, m)
                                    }
                                    l.addEventListener("click", function(e) {
                                        e.stopPropagation(), s(), n == i.const.VIDEO_TYPE.direct && "VIDEO" == e.target.tagName || n == i.const.VIDEO_TYPE.youtube && "IFRAME" == e.target.tagName || i.playVideo(t, n, a, o)
                                    })
                                }
                            }
                        }(e, a.type, a["option.video_value"], a["option.video_type"], a["option.video_control"], a[i.const.DESKTOP + ".option.video_autoplay"], a[i.const.MOBILE + ".option.video_autoplay"]), function(t, e, a, n) {
                            isObjectLadiPage(window.LadiPageHidePopup) && window.LadiPageHidePopup[t] && (a = !1), "popup" == e && a && ((isEmptyLadiPage(n) || n < 0) && (n = 0), n = n <= 0 ? 1 : n, i.runTimeout(function() {
                                window.ladi(t).show()
                            }, 1e3 * n))
                        }(e, a.type, a["option.show_popup_welcome_page"], a["option.delay_popup_welcome_page"]), j(e, null, a.type, a["option.countdown_type"], a["option.countdown_minute"], a["option.countdown_daily_start"], a["option.countdown_daily_end"], a["option.countdown_endtime"]), G(e, null, a.type, a["option.countdown_item_type"]), function(t, e, a, n) {
                            if ("section" == e) {
                                var o = document.getElementById(t);
                                if (!isEmptyLadiPage(o)) {
                                    var r = o.getElementsByClassName("ladi-section-arrow-down")[0];
                                    A.push(function() {
                                        if (isEmptyLadiPage(r)) {
                                            if (i.runtime.isDesktop) {
                                                if (isEmptyLadiPage(a)) return void o.removeAttribute("data-opacity");
                                                var t = (parseFloatLadiPage(a) || 0) + 50;
                                                if (t > o.clientHeight) return void o.removeAttribute("data-opacity");
                                                o.setAttribute("data-height", o.clientHeight), o.style.setProperty("height", t + "px"), o.classList.add("overflow-hidden")
                                            } else {
                                                if (isEmptyLadiPage(n)) return void o.removeAttribute("data-opacity");
                                                var e = (parseFloatLadiPage(n) || 0) + 50;
                                                if (e > o.clientHeight) return void o.removeAttribute("data-opacity");
                                                o.setAttribute("data-height", o.clientHeight), o.style.setProperty("height", e + "px"), o.classList.add("overflow-hidden")
                                            }(r = document.createElement("div")).className = "ladi-section-arrow-down", o.appendChild(r), o.removeAttribute("data-opacity"), r.addEventListener("click", function(t) {
                                                t.stopPropagation(), o.classList.add("transition-readmore"), r.parentElement.removeChild(r), o.clientHeight != o.getAttribute("data-height") ? o.style.setProperty("height", o.getAttribute("data-height") + "px") : o.style.removeProperty("height"), o.removeAttribute("data-height"), i.runTimeout(function() {
                                                    o.classList.remove("transition-readmore"), o.classList.remove("overflow-hidden"), i.runTimeout(i.removeSticky, 100)
                                                }, 1e3 * parseFloatLadiPage(getComputedStyle(o).transitionDuration))
                                            })
                                        }
                                    })
                                }
                            }
                        }(e, a.type, a[i.const.DESKTOP + ".option.readmore_range"], a[i.const.MOBILE + ".option.readmore_range"]), LadiPageFormData.push(function() {
                            i.runFormItem(e, a.type, a["option.input_type"])
                        }), J(e, null, !1, a.type), i.startAutoScroll(e, a.type, a[i.const.DESKTOP + ".option.auto_scroll"], a[i.const.MOBILE + ".option.auto_scroll"]), LadiPageShopping.push(function() {
                            lt(e, a.type, !0, !1)
                        }), LadiPageShopping.push(function() {
                            ! function(t, e) {
                                if ("form" == e) {
                                    var a = document.getElementById(t);
                                    if (!isEmptyLadiPage(a)) {
                                        var n = a.querySelector('input[name="quantity"]');
                                        if (!isEmptyLadiPage(n)) {
                                            var o = function(e) {
                                                if (!isEmptyLadiPage(e.target.value)) {
                                                    var a = i.runtime.eventData[t];
                                                    if (!isEmptyLadiPage(a) && a["option.is_add_to_cart"]) {
                                                        var n = i.generateVariantProduct(a, !1, null, null, null, null, !0, !0, function() {
                                                            o(e)
                                                        });
                                                        if (!(isEmptyLadiPage(n) || isEmptyLadiPage(n.store_info) || isEmptyLadiPage(n.product))) {
                                                            var r = i.getProductVariantIndex(t, a);
                                                            if (-1 != r) {
                                                                var d = n.product.variants[r].quantity,
                                                                    l = n.product.variants[r].quantity_stock;
                                                                d = isNullLadiPage(l) ? d : l;
                                                                var s = parseInt(e.target.value) || 0,
                                                                    c = 1;
                                                                c = n.product.variants[r].min_buy || c;
                                                                var u = n.product.variants[r].max_buy,
                                                                    p = 0,
                                                                    m = i.runtime.tmp.cart.findIndex(function(t) {
                                                                        return t.product_id == n.product.variants[r].product_id && t.product_variant_id == n.product.variants[r].product_variant_id
                                                                    }); - 1 != m && (p = i.runtime.tmp.cart[m].quantity), c > s + p && (s = c - p), 1 == n.product.variants[r].inventory_checked && s + p > d && (s = d - p), !isEmptyLadiPage(u) && s + p > u && (s = u - p), s = s < 1 ? 1 : s, e.target.setAttribute("min", c), isEmptyLadiPage(u) || e.target.setAttribute("max", u), e.target.value = s
                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            n.addEventListener("input", o), i.fireEvent(n, "input");
                                            var r = a.querySelectorAll(".button")[0],
                                                d = a.querySelectorAll(".button")[1];
                                            isEmptyLadiPage(r) || isEmptyLadiPage(d) || (r.addEventListener("click", function(t) {
                                                i.removeTimeout(i.runtime.tmp.timeout_button_quantity_cart_id), i.runtime.tmp.timeout_button_quantity_cart_id = i.runTimeout(function() {
                                                    n.value = (parseFloatLadiPage(n.value) || 0) - 1, i.fireEvent(n, "input")
                                                }, 10)
                                            }), d.addEventListener("click", function(t) {
                                                i.removeTimeout(i.runtime.tmp.timeout_button_quantity_cart_id), i.runtime.tmp.timeout_button_quantity_cart_id = i.runTimeout(function() {
                                                    n.value = (parseFloatLadiPage(n.value) || 0) + 1, i.fireEvent(n, "input")
                                                }, 10)
                                            }))
                                        }
                                    }
                                }
                            }(e, a.type)
                        }), function(t, e) {
                            if ("collection" == e) {
                                var a = document.getElementById(t);
                                if (!isEmptyLadiPage(a)) {
                                    var n = i.runtime.eventData[t];
                                    if (!isEmptyLadiPage(n)) {
                                        var o = n["option.collection_setting.type"],
                                            r = a.getElementsByClassName("ladi-collection")[0];
                                        if (o == i.const.COLLECTION_TYPE.carousel) {
                                            r.classList.add("carousel");
                                            var d = document.createElement("div");
                                            d.className = "ladi-collection-arrow ladi-collection-arrow-left opacity-0";
                                            var l = document.createElement("div");
                                            l.className = "ladi-collection-arrow ladi-collection-arrow-right opacity-0", r.appendChild(d), r.appendChild(l), d.addEventListener("click", function(e) {
                                                e.stopPropagation();
                                                var o = parseFloatLadiPage(a.getAttribute("data-page")) || 1;
                                                o = (o -= 1) < 1 ? 1 : o, i.loadCollectionData(t, n, o, !1)
                                            }), l.addEventListener("click", function(e) {
                                                e.stopPropagation();
                                                var o = parseFloatLadiPage(a.getAttribute("data-page")) || 1;
                                                if (o += 1, a.hasAttribute("data-max-page")) {
                                                    var r = parseFloatLadiPage(a.getAttribute("data-max-page")) || 1;
                                                    o = o > r ? r : o
                                                }
                                                i.loadCollectionData(t, n, o, !1)
                                            })
                                        }
                                        if (o == i.const.COLLECTION_TYPE.readmore) {
                                            r.classList.add("readmore");
                                            var s = document.createElement("div");
                                            s.className = "ladi-collection-button-next opacity-0", r.appendChild(s), s.addEventListener("click", function(e) {
                                                e.stopPropagation();
                                                var o = parseFloatLadiPage(a.getAttribute("data-page")) || 1;
                                                if (o += 1, a.hasAttribute("data-max-page")) {
                                                    var r = parseFloatLadiPage(a.getAttribute("data-max-page")) || 1;
                                                    o = o > r ? r : o
                                                }
                                                i.loadCollectionData(t, n, o, !1, !0)
                                            })
                                        }
                                        i.loadCollectionData(t, n, 1, !0)
                                    }
                                }
                            }
                        }(e, a.type), function(t, e, a, n) {
                            if ("survey" == e) {
                                var o = document.getElementById(t);
                                if (!isEmptyLadiPage(o)) {
                                    a && o.setAttribute("data-multiple", !0);
                                    for (var r, d = o.getElementsByClassName("ladi-survey-select-item")[0], l = o.getElementsByClassName("ladi-survey-radio-item"), s = o.getElementsByClassName("ladi-survey-checkbox-item"), c = o.getElementsByClassName("ladi-survey-option"), u = o.querySelector(".ladi-survey-button-next button"), p = [], m = n.mapping_form_name, _ = n.mapping_form_id, g = n.input_name, y = i.findAncestor(o, ["ladi-form", "ladi-element"]), h = i.runtime.eventData[t]["option.data_event"], f = function() {
                                            var e = window.ladi(t).value(),
                                                n = m || "";
                                            _.forEach(function(t) {
                                                var o = document.getElementById(t);
                                                if (!isEmptyLadiPage(o)) {
                                                    for (var r = null; 0 != (r = o.querySelectorAll('.ladi-form-item-survey[data-name="' + n + '"]')).length;) r[0].parentElement.removeChild(r[0]);
                                                    var d = [],
                                                        l = o.querySelectorAll(".ladi-element .ladi-form-item-container [name]"),
                                                        s = null,
                                                        c = 0;
                                                    for (T = 0; T < l.length; T++) {
                                                        l[T].getAttribute("name") == n && (s = i.findAncestor(l[T], "ladi-element"), d.push(s.id));
                                                        var u = parseFloatLadiPage(l[T].getAttribute("tabindex")) || 0;
                                                        u > c && (c = u)
                                                    }
                                                    if (0 == (d = d.unique()).length) {
                                                        c++, (s = document.createElement("div")).className = "ladi-element ladi-hidden ladi-form-item-survey", s.id = i.randomString(10), s.setAttribute("data-name", n);
                                                        var m = "";
                                                        if (m += '<div class="ladi-form-item-container">', m += '   <div class="ladi-form-item-background"></div>', a) {
                                                            m += '   <div class="ladi-form-item ladi-form-checkbox ladi-form-checkbox-vertical">', m += '       <div class="ladi-form-checkbox-box-item">';
                                                            for (var _ = 0; _ < p.length; _++) m += '       <div class="ladi-form-checkbox-item"><input tabindex="' + c + '" name="' + n + '" type="checkbox" value="' + p[_] + '"><span data-checked="false">' + p[_] + "</span></div>";
                                                            m += "       </div>", m += "   </div>"
                                                        } else m += '   <div class="ladi-form-item">', m += '       <input autocomplete="off" tabindex="' + c + '" name="' + n + '" class="ladi-form-control" type="text">', m += "   </div>";
                                                        m += "</div>", s.innerHTML = m, o.getElementsByClassName("ladi-form")[0].appendChild(s), d.push(s.id)
                                                    }
                                                    for (T = 0; T < d.length; T++) window.ladi(d[T]).value(e)
                                                }
                                            })
                                        }, v = function() {
                                            for (var t = !1, e = 0; e < c.length; e++)
                                                if (c[e].classList.contains("selected")) {
                                                    t = !0;
                                                    break
                                                } return t
                                        }, E = function() {
                                            if (!(!isEmptyLadiPage(d) || l.length > 0 || s.length > 0)) {
                                                for (var t = [], e = 0; e < c.length; e++) c[e].classList.contains("selected") && t.push(c[e].getAttribute("data-value"));
                                                for (var n = null; 0 != (n = y.querySelectorAll('.ladi-form-item-survey[data-name="' + g + '"]')).length;) n[0].parentElement.removeChild(n[0]);
                                                var r = document.createElement("div");
                                                r.className = "ladi-element ladi-hidden ladi-form-item-survey", r.id = i.randomString(10), r.setAttribute("data-name", g);
                                                var u = o.getAttribute("data-tabindex"),
                                                    m = "";
                                                if (m += '<div class="ladi-form-item-container">', m += '   <div class="ladi-form-item-background"></div>', a) {
                                                    m += '   <div class="ladi-form-item ladi-form-checkbox ladi-form-checkbox-vertical">', m += '       <div class="ladi-form-checkbox-box-item">';
                                                    for (var _ = 0; _ < p.length; _++) m += '       <div class="ladi-form-checkbox-item"><input tabindex="' + u + '" name="' + g + '" type="checkbox" value="' + p[_] + '"><span data-checked="false">' + p[_] + "</span></div>";
                                                    m += "       </div>", m += "   </div>"
                                                } else m += '   <div class="ladi-form-item">', m += '       <input autocomplete="off" tabindex="' + u + '" name="' + g + '" class="ladi-form-control" type="text">', m += "   </div>";
                                                m += "</div>", r.innerHTML = m, y.getElementsByClassName("ladi-form")[0].appendChild(r), window.ladi(r.id).value(a ? t : t[0])
                                            }
                                        }, P = function() {
                                            v() && F(o, h, {
                                                action_type: i.const.ACTION_TYPE.complete
                                            }), f()
                                        }, L = function(e) {
                                            i.tapEventListener(e, function(n) {
                                                if (n.stopPropagation(), a) e.classList.contains("selected") ? e.classList.remove("selected") : e.classList.add("selected");
                                                else
                                                    for (var o = e.parentElement.getElementsByClassName("ladi-survey-option"), r = 0; r < o.length; r++) o[r] === e ? o[r].classList.add("selected") : o[r].classList.remove("selected");
                                                isEmptyLadiPage(y) ? (A(), isEmptyLadiPage(u) && P()) : E(), i.runFormulaData(t)
                                            })
                                        }, b = function(e) {
                                            var a = e.getElementsByTagName("input")[0],
                                                n = e.getElementsByTagName("span")[0];
                                            isEmptyLadiPage(a) || (a.addEventListener("change", function(e) {
                                                isEmptyLadiPage(n) || n.setAttribute("data-checked", e.target.checked), i.runFormulaData(t);
                                                var a = i.findAncestor(e.target, "ladi-form-checkbox-item");
                                                i.runFormItemOtherChange(a)
                                            }), isEmptyLadiPage(n) || n.addEventListener("click", function(t) {
                                                t.stopPropagation(), a.click()
                                            }))
                                        }, A = function() {
                                            isEmptyLadiPage(u) || (v() ? u.parentElement.classList.remove("no-select") : u.parentElement.classList.add("no-select"))
                                        }, T = 0; T < c.length; T++) p.push(c[T].getAttribute("data-value")), L(c[T]);
                                    for (isEmptyLadiPage(d) || d.addEventListener("change", function(e) {
                                            e.target.setAttribute("data-selected", e.target.value), i.runFormulaData(t)
                                        }), T = 0; T < l.length; T++) p.push(l[T].getElementsByTagName("input")[0].value), b(l[T]);
                                    for (i.runFormItemOtherChange(l[0]), T = 0; T < s.length; T++) p.push(s[T].getElementsByTagName("input")[0].value), r = s[T], b(r);
                                    if (i.runFormItemOtherChange(s[0]), isEmptyLadiPage(y)) {
                                        if (!isArrayLadiPage(h)) {
                                            var S = i.copy(n);
                                            if (h = [], isObjectLadiPage(S) && !isEmptyLadiPage(S.value)) {
                                                if (S.type != i.const.DATA_ACTION_TYPE.section && S.type != i.const.DATA_ACTION_TYPE.popup || h.push({
                                                        action_type: i.const.ACTION_TYPE.complete,
                                                        type: S.type,
                                                        action: S.value
                                                    }), S.type == i.const.DATA_ACTION_TYPE.section && S.is_hide_parent || S.type == i.const.DATA_ACTION_TYPE.popup) {
                                                    var w = i.findAncestor(o, "ladi-popup"),
                                                        O = i.findAncestor(o, "ladi-section"),
                                                        C = null;
                                                    isEmptyLadiPage(w) ? isEmptyLadiPage(O) || (C = O.id) : C = (w = i.findAncestor(w, "ladi-element")).id, isEmptyLadiPage(C) || h.push({
                                                        action_type: i.const.ACTION_TYPE.complete,
                                                        type: i.const.DATA_ACTION_TYPE.hidden_show,
                                                        hidden_ids: [C],
                                                        show_ids: []
                                                    })
                                                }
                                                S.type == i.const.DATA_ACTION_TYPE.change_index && h.push({
                                                    action_type: i.const.ACTION_TYPE.complete,
                                                    type: S.type,
                                                    action: S.value,
                                                    change_index_type: S.change_index_type,
                                                    change_index_number: S.change_index_number
                                                })
                                            }
                                        }
                                        isEmptyLadiPage(u) || u.addEventListener("click", function(t) {
                                            t.stopPropagation(), P()
                                        }), A(), i.runtime.list_loaded_func.push(f)
                                    } else E()
                                }
                            }
                        }(e, a.type, a["option.survey_setting.is_multiple"], a["option.survey_setting"] || a["option.survey_setting.event"])) : n(a, t).run(e, i.runtime.isDesktop)
                    }), at(Date.now() + 1e3), LadiPageFormData.push(function() {
                        i.runOptionForm(t, h, L)
                    }), LadiPageFormData.push(function() {
                        i.setInputFile()
                    }), LadiPageFormData.push(function() {
                        i.setInputOtp()
                    }), (e = function() {
                        b.forEach(function(t) {
                            var e = i.runtime.eventData[t];
                            if ("countdown" == e.type)
                                for (var a = document.querySelectorAll("#" + t), n = 0; n < a.length; n++) {
                                    var o = a[n],
                                        r = o.getAttribute("data-type"),
                                        d = 0,
                                        l = 0,
                                        s = Date.now();
                                    if (o.hasAttribute("data-date-start") || o.hasAttribute("data-date-end")) d = parseFloatLadiPage(o.getAttribute("data-date-start")) || 0, l = parseFloatLadiPage(o.getAttribute("data-date-end")) || 0;
                                    else {
                                        if (r == i.const.COUNTDOWN_TYPE.countdown) {
                                            var c = parseInt(o.getAttribute("data-minute")) || 0;
                                            if (c <= 0) return;
                                            for (l = i.runtime.timenow; l <= s;) l += 60 * c * 1e3
                                        }
                                        if (r == i.const.COUNTDOWN_TYPE.endtime && (l = parseInt(o.getAttribute("data-endtime")) || 0), r == i.const.COUNTDOWN_TYPE.daily) {
                                            var u = o.getAttribute("data-daily-start"),
                                                p = o.getAttribute("data-daily-end");
                                            if (!isEmptyLadiPage(u) && !isEmptyLadiPage(p)) {
                                                var m = (new Date).toDateString();
                                                d = new Date(m + " " + u).getTime(), l = new Date(m + " " + p).getTime()
                                            }
                                        }
                                        o.setAttribute("data-date-start", d), o.setAttribute("data-date-end", l)
                                    }
                                    if (d > s) return;
                                    var _ = l - s;
                                    if (_ < 0) {
                                        if (_ = 0, "true" == o.getAttribute("data-end")) return;
                                        "true" != o.getAttribute("data-end") && (o.setAttribute("data-end", !0), F(o, e["option.data_event"], {
                                            action_type: i.const.ACTION_TYPE.complete
                                        }), i.runEventTracking(o.id, {
                                            is_form: !1
                                        }))
                                    }
                                    for (var g = i.getCountdownTime(_), y = o.querySelectorAll("[data-item-type]"), h = 0; h < y.length; h++) y[h].querySelectorAll(".ladi-countdown-text span")[0].textContent = g[y[h].getAttribute("data-item-type")]
                                }
                        })
                    })(), i.runtime.interval_countdown = i.runInterval(e, 1e3), b.forEach(function(t) {
                        var e = document.getElementById(t);
                        isEmptyLadiPage(e) || tt(t, e)
                    }), i.runtime.interval_gallery = i.runInterval(Z, 300), b.forEach(function(t) {
                        var e = i.runtime.eventData[t];
                        if ("carousel" == e.type) {
                            var a = document.getElementById(t);
                            if (!isEmptyLadiPage(a)) {
                                a.hasAttribute("data-scrolled") || (a.setAttribute("data-scrolled", !1), i.runtime.list_scroll_func[t] = function() {
                                    a.setAttribute("data-scrolled", !0)
                                });
                                var n = e[i.runtime.device + ".option.carousel_setting.autoplay"],
                                    o = e[i.runtime.device + ".option.carousel_setting.autoplay_time"],
                                    r = 0;
                                n && !isEmptyLadiPage(o) && (r = o);
                                var d = function(e) {
                                        e.stopPropagation();
                                        var i = e.target.getAttribute("data-index");
                                        i = parseFloatLadiPage(i) || 0, window.ladi(t).index(i + 1)
                                    },
                                    l = function(e) {
                                        e.stopPropagation(), e = i.getEventCursorData(e), !isEmptyLadiPage(i.runtime.timenext_carousel[t]) && i.runtime.timenext_carousel[t] > Date.now() || e.target.classList.contains("ladi-carousel-arrow") || (i.runtime.timenext_carousel[t] = Date.now() + 864e5, i.runtime.current_element_mouse_down_carousel = t, i.runtime.current_element_mouse_down_carousel_position_x = e.pageX, i.runtime.current_element_mouse_down_carousel_position_y = e.pageY, a.getElementsByClassName("ladi-carousel-content")[0].style.setProperty("transition-duration", "0ms"), a.getElementsByClassName("ladi-carousel-content")[0].setAttribute("data-left", getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).left), a.getElementsByClassName("ladi-carousel-content")[0].setAttribute("data-top", getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).top))
                                    };
                                if (a.getElementsByClassName("ladi-carousel-arrow-left")[0].addEventListener("click", function(e) {
                                        e.stopPropagation(), a.getElementsByClassName("ladi-carousel-content")[0].style.removeProperty("transition-duration"), a.setAttribute("data-is-next", !1), a.setAttribute("data-next-time", Date.now() + 1e3 * r), et(t, !1)
                                    }), isEmptyLadiPage(e["option.meta_data.version"]) && -((parseFloatLadiPage(e[i.runtime.device + ".option.carousel_crop.width"]) || 0) - a.clientWidth) < 0 && a.getElementsByClassName("ladi-carousel-arrow-right")[0].classList.remove("opacity-0"), e["option.meta_data.version"] == i.const.META_VERSION.two) {
                                    e[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.horizontal && -((parseFloatLadiPage(getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).width) || 0) - a.clientWidth) < 0 && (a.getElementsByClassName("ladi-carousel-arrow-left")[0].classList.remove("opacity-0"), a.getElementsByClassName("ladi-carousel-arrow-right")[0].classList.remove("opacity-0")), e[i.runtime.device + ".option.carousel_setting.display_type"] == i.const.CAROUSEL_DISPLAY_TYPE.vertical && -((parseFloatLadiPage(getComputedStyle(a.getElementsByClassName("ladi-carousel-content")[0]).height) || 0) - a.clientHeight) < 0 && (a.getElementsByClassName("ladi-carousel-arrow-left")[0].classList.remove("opacity-0"), a.getElementsByClassName("ladi-carousel-arrow-right")[0].classList.remove("opacity-0"));
                                    for (var s = a.querySelectorAll(".ladi-carousel-indicators-number .item, .ladi-carousel-indicators-circle .item"), c = 0; c < s.length; c++) s[c].setAttribute("data-index", c), s[c].addEventListener("click", d)
                                }
                                a.getElementsByClassName("ladi-carousel-arrow-right")[0].addEventListener("click", function(e) {
                                    e.stopPropagation(), a.getElementsByClassName("ladi-carousel-content")[0].style.removeProperty("transition-duration"), a.setAttribute("data-is-next", !0), a.setAttribute("data-next-time", Date.now() + 1e3 * r), et(t, !1)
                                }), a.getElementsByClassName("ladi-carousel")[0].addEventListener("mousedown", l), a.getElementsByClassName("ladi-carousel")[0].addEventListener("touchstart", l, i.runtime.scrollEventPassive)
                            }
                        }
                    }), i.runtime.interval_carousel = i.runInterval(function() {
                        b.forEach(function(t) {
                            var e = i.runtime.eventData[t];
                            if ("carousel" == e.type) {
                                var a = document.getElementById(t);
                                if (!isEmptyLadiPage(a) && "true" == a.getAttribute("data-scrolled") && "true" != a.getAttribute("data-stop") && 0 != a.clientWidth && 0 != a.clientHeight) {
                                    var n = e[i.runtime.device + ".option.carousel_setting.autoplay"],
                                        o = e[i.runtime.device + ".option.carousel_setting.autoplay_time"],
                                        r = 0;
                                    if (n && !isEmptyLadiPage(o) && (r = o), r > 0) {
                                        var d = a.getAttribute("data-next-time"),
                                            l = Date.now();
                                        isEmptyLadiPage(d) && (d = l + 1e3 * (r - 1), a.setAttribute("data-next-time", d)), l >= d && (et(t, !0), a.setAttribute("data-next-time", l + 1e3 * r))
                                    }
                                }
                            }
                        })
                    }, 300), LadiPageShopping.push(ut), pt(), W(), t && (i.runtime.is_popupx || i.const.TIME_ONPAGE_TRACKING.forEach(function(t) {
                        i.runTimeout(function() {
                            LadiPageQueueCommand.push(function() {
                                return isFunctionLadiPage(window.gtag)
                            }, function() {
                                window.gtag("event", "TimeOnPage_" + t + "_seconds", {
                                    event_category: "LadiPageTimeOnPage",
                                    event_label: window.location.host + window.location.pathname,
                                    non_interaction: !0
                                })
                            }), LadiPageQueueCommand.push(function() {
                                return isFunctionLadiPage(window.fbq)
                            }, function() {
                                fbqCustom("trackCustom", "TimeOnPage_" + t + "_seconds")
                            })
                        }, 1e3 * t)
                    })), b.forEach(function(t) {
                        var e = document.getElementById(t);
                        if (!isEmptyLadiPage(e)) {
                            var a = i.runtime.eventData[t],
                                n = a["option.data_tooltip.text"];
                            if (!isEmptyLadiPage(n)) {
                                var o = a["option.data_tooltip.type"] || i.const.TOOLTIP_TYPE.default,
                                    r = a["option.data_tooltip.position"] || i.const.TOOLTIP_POSITION.top_middle,
                                    d = a["option.data_tooltip.size"] || i.const.TOOLTIP_SIZE.medium;
                                e.setAttribute("data-hint", n);
                                var l = "hint";
                                r == i.const.TOOLTIP_POSITION.top_middle && (l += "-top-middle"), r == i.const.TOOLTIP_POSITION.top_left && (l += "-top-left"), r == i.const.TOOLTIP_POSITION.top_right && (l += "-top-right"), r == i.const.TOOLTIP_POSITION.bottom_middle && (l += "-bottom-middle"), r == i.const.TOOLTIP_POSITION.bottom_left && (l += "-bottom-left"), r == i.const.TOOLTIP_POSITION.bottom_right && (l += "-bottom-right"), r == i.const.TOOLTIP_POSITION.left_middle && (l += "-left-middle"), r == i.const.TOOLTIP_POSITION.left_top && (l += "-left-top"), r == i.const.TOOLTIP_POSITION.left_bottom && (l += "-left-bottom"), r == i.const.TOOLTIP_POSITION.right_middle && (l += "-right-middle"), r == i.const.TOOLTIP_POSITION.right_top && (l += "-right-top"), r == i.const.TOOLTIP_POSITION.right_bottom && (l += "-right-bottom"), o == i.const.TOOLTIP_TYPE.info && (l += "-t-info"), o == i.const.TOOLTIP_TYPE.success && (l += "-t-success"), o == i.const.TOOLTIP_TYPE.error && (l += "-t-error"), o == i.const.TOOLTIP_TYPE.notice && (l += "-t-notice"), d == i.const.TOOLTIP_SIZE.small && (l += "-s-small"), d == i.const.TOOLTIP_SIZE.medium && (l += "-s-med"), d == i.const.TOOLTIP_SIZE.big && (l += "-s-big"), l += "-hint-anim-d-short", e.classList.add(l)
                            }
                        }
                    }),
                    function() {
                        for (var t = function(t) {
                                t.stopPropagation();
                                var e = i.findAncestor(t.target, "ladi-search").getElementsByTagName("input")[0].value;
                                e = isEmptyLadiPage(e) ? "" : e;
                                var a = new window.URLSearchParams(window.location.search).get("keyword");
                                if (e != (a = isEmptyLadiPage(a) ? "" : a)) {
                                    var n = "/?keyword=" + (e = encodeURIComponent(e));
                                    window.location.href = n
                                }
                            }, e = document.querySelectorAll(".ladi-search button"), a = 0; a < e.length; a++) e[a].style.setProperty("cursor", "pointer"), e[a].addEventListener("click", t);
                        var n = function(t) {
                                13 == t.keyCode && i.findAncestor(t.target, "ladi-search").getElementsByTagName("button")[0].click()
                            },
                            o = document.querySelectorAll(".ladi-search input");
                        for (a = 0; a < o.length; a++) o[a].addEventListener("keydown", n), o[a].value = isEmptyLadiPage(h.keyword) ? "" : h.keyword
                    }(),
                    function() {
                        var t = 2500,
                            e = 3800,
                            a = 800,
                            n = 50,
                            o = 150,
                            r = 500,
                            d = 1300,
                            l = 600,
                            s = 1500,
                            c = t,
                            u = function(u) {
                                var p = !1;
                                if (i.const.ANIMATED_LIST.forEach(function(t) {
                                        u.classList.contains(t) && (p = !0)
                                    }), p) {
                                    var m = u.getElementsByClassName("ladipage-animated-words-wrapper")[0];
                                    if (!isEmptyLadiPage(m)) {
                                        var _ = isEmptyLadiPage(m.getAttribute("data-word")) ? [] : JSON.parse(m.getAttribute("data-word"));
                                        if (0 != _.length) {
                                            var g = !1,
                                                y = i.randomId(),
                                                h = function(e, a, n, o) {
                                                    if (!g) {
                                                        isEmptyLadiPage(e) || (e.classList.remove("in"), e.classList.add("out"));
                                                        var r = isEmptyLadiPage(e) ? null : e.nextSibling;
                                                        if (isEmptyLadiPage(r) ? n && i.runTimeout(function() {
                                                                L(v(a))
                                                            }, t) : i.runTimeout(function() {
                                                                h(r, a, n, o)
                                                            }, o), isEmptyLadiPage(r) && document.querySelectorAll("html")[0].classList.contains("no-csstransitions")) {
                                                            var d = v(a);
                                                            E(a, d)
                                                        }
                                                    }
                                                },
                                                f = function(e, a, n, o) {
                                                    if (!g) {
                                                        var r = a.parentElement,
                                                            d = r.parentElement;
                                                        d.classList.contains("ladipage-animated-headline") || (d = d.parentElement), isEmptyLadiPage(e) || (e.classList.add("in"), e.classList.remove("out"));
                                                        var l = isEmptyLadiPage(e) ? null : e.nextSibling;
                                                        isEmptyLadiPage(l) ? ((d.classList.contains("rotate-2") || d.classList.contains("rotate-3") || d.classList.contains("scale")) && r.style.setProperty("width", a.clientWidth + "px"), isEmptyLadiPage(i.findAncestor(a, "type")) || i.runTimeout(function() {
                                                            var t = i.findAncestor(a, "ladipage-animated-words-wrapper");
                                                            isEmptyLadiPage(t) || t.classList.add("waiting")
                                                        }, 200), n || i.runTimeout(function() {
                                                            L(a)
                                                        }, t)) : i.runTimeout(function() {
                                                            f(l, a, n, o)
                                                        }, o)
                                                    }
                                                },
                                                v = function(t) {
                                                    if (!g) {
                                                        var e = t.nextSibling;
                                                        return isEmptyLadiPage(e) || e.classList.contains("after") ? t.parentElement.firstChild : e
                                                    }
                                                },
                                                E = function(t, e) {
                                                    g || (t.classList.remove("is-visible"), t.classList.add("is-hidden"), e.classList.remove("is-hidden"), e.classList.add("is-visible"))
                                                },
                                                P = function(t, e) {
                                                    g || (isEmptyLadiPage(i.findAncestor(t, "type")) ? isEmptyLadiPage(i.findAncestor(t, "clip")) || (i.findAncestor(t, "ladipage-animated-words-wrapper").style.setProperty("width", t.clientWidth + 5 + "px"), i.runTimeout(function() {
                                                        L(t)
                                                    }, l + s)) : (f(t.querySelectorAll("i")[0], t, !1, e), t.classList.add("is-visible"), t.classList.remove("is-hidden")))
                                                },
                                                L = function(s) {
                                                    if (!g && !isEmptyLadiPage(s)) {
                                                        var c = v(s);
                                                        if (isEmptyLadiPage(i.findAncestor(s, "type")))
                                                            if (isEmptyLadiPage(i.findAncestor(s, "letters"))) isEmptyLadiPage(i.findAncestor(s, "clip")) ? isEmptyLadiPage(i.findAncestor(s, "loading-bar")) ? (E(s, c), i.runTimeout(function() {
                                                                L(c)
                                                            }, t)) : (i.findAncestor(s, "ladipage-animated-words-wrapper").classList.remove("is-loading"), E(s, c), i.runTimeout(function() {
                                                                L(c)
                                                            }, e), i.runTimeout(function() {
                                                                i.findAncestor(s, "ladipage-animated-words-wrapper").classList.add("is-loading")
                                                            }, a)) : (i.findAncestor(s, "ladipage-animated-words-wrapper").style.setProperty("width", "2px"), i.runTimeout(function() {
                                                                E(s, c), P(c)
                                                            }, l));
                                                            else {
                                                                var u = s.querySelectorAll("i").length >= c.querySelectorAll("i").length;
                                                                h(s.querySelectorAll("i")[0], s, u, n), f(c.querySelectorAll("i")[0], c, u, n)
                                                            }
                                                        else {
                                                            var p = i.findAncestor(s, "ladipage-animated-words-wrapper");
                                                            p.classList.add("selected"), p.classList.remove("waiting"), i.runTimeout(function() {
                                                                p.classList.remove("selected"), s.classList.remove("is-visible"), s.classList.add("is-hidden");
                                                                for (var t = s.querySelectorAll("i"), e = 0; e < t.length; e++) t[e].classList.remove("in"), t[e].classList.add("out")
                                                            }, r), i.runTimeout(function() {
                                                                P(c, o)
                                                            }, d)
                                                        }
                                                    }
                                                },
                                                b = document.createElement(u.tagName);
                                            u.parentElement.insertBefore(b, u.nextSibling), b.outerHTML = u.outerHTML, (b = u.nextSibling).classList.add("ladipage-animated-headline-duplicate"), i.runtime.list_scrolling_exec[y] = function() {
                                                u.parentElement.removeChild(u), b.classList.remove("ladipage-animated-headline-duplicate"), g = !0, delete i.runtime.list_scrolling_exec[y]
                                            };
                                            var A = m.textContent.trim();
                                            if (m.textContent = "", m.innerHTML = m.innerHTML + '<b class="is-visible">' + A + "</b>", _.forEach(function(t) {
                                                    isEmptyLadiPage(t) ? m.innerHTML = m.innerHTML + "<b>" + A + "</b>" : m.innerHTML = m.innerHTML + "<b>" + t.trim() + "</b>"
                                                }), !isEmptyLadiPage(i.findAncestor(m, "type")) || !isEmptyLadiPage(i.findAncestor(m, "loading-bar")) || !isEmptyLadiPage(i.findAncestor(m, "clip"))) {
                                                m.innerHTML = m.innerHTML + '<div class="after"></div>';
                                                for (var T = getComputedStyle(m).color, S = m.getElementsByClassName("after"), w = 0; w < S.length; w++) S[w].style.setProperty("background-color", T)
                                            }
                                            if (u.classList.contains("type") && m.classList.add("waiting"), (u.classList.contains("type") || u.classList.contains("rotate-2") || u.classList.contains("rotate-3") || u.classList.contains("scale")) && u.classList.add("letters"), function(t) {
                                                    if (!g)
                                                        for (var e = 0; e < t.length; e++) {
                                                            var a = t[e],
                                                                n = a.textContent.trim().split(""),
                                                                o = a.classList.contains("is-visible");
                                                            for (var r in n) {
                                                                " " == n[r] && (n[r] = "&nbsp;");
                                                                var d = i.findAncestor(a, "rotate-2");
                                                                isEmptyLadiPage(d) || (n[r] = "<em>" + n[r] + "</em>"), n[r] = o ? '<i class="in">' + n[r] + "</i>" : "<i>" + n[r] + "</i>"
                                                            }
                                                            var l = n.join("");
                                                            a.innerHTML = l, a.style.setProperty("opacity", 1)
                                                        }
                                                }(document.querySelectorAll(".letters b")), u.classList.contains("loading-bar")) c = e, i.runTimeout(function() {
                                                m.classList.add("is-loading")
                                            }, a);
                                            else if (u.classList.contains("clip")) {
                                                var O = m.clientWidth + 5;
                                                m.style.setProperty("width", O + "px")
                                            }
                                            i.runTimeout(function() {
                                                L(u.getElementsByClassName("is-visible")[0])
                                            }, c)
                                        }
                                    }
                                }
                            },
                            p = function() {
                                for (var t = document.getElementsByClassName("ladipage-animated-headline"), e = [], i = 0; i < t.length; i++) e.push(t[i]);
                                e.forEach(u)
                            };
                        p();
                        var m = i.randomId();
                        i.runtime.list_scrolled_exec[m] = p
                    }(),
                    function() {
                        for (var t = document.querySelectorAll(".ladi-button-group > .ladi-element"), e = function(t) {
                                var e = i.findAncestor(t.target, "ladi-button");
                                (e = isEmptyLadiPage(e) ? t.target : i.findAncestor(e, "ladi-element")).classList.add("selected");
                                var a = i.findAncestor(t.target, "ladi-button-group");
                                if (!isEmptyLadiPage(a))
                                    for (var n = (a = i.findAncestor(a, "ladi-element")).querySelectorAll(".ladi-button-group > .ladi-element"), o = 0; o < n.length; o++) n[o].id != e.id && n[o].classList.remove("selected")
                            }, a = 0; a < t.length; a++) t[a].addEventListener("click", e)
                    }(),
                    function() {
                        for (var t = function(t) {
                                t.stopPropagation(), t = i.getEventCursorData(t);
                                var e = i.findAncestor(t.target, "ladi-element");
                                if (!isEmptyLadiPage(e)) {
                                    i.runtime.current_element_mouse_down_image_compare = e.id, i.runtime.current_element_mouse_down_image_compare_position_x = t.pageX;
                                    var a = e.getElementsByClassName("ladi-image-compare")[0],
                                        n = e.getElementsByClassName("ladi-image-background")[0];
                                    a.setAttribute("data-width", parseFloatLadiPage(getComputedStyle(a).width) || 0), a.setAttribute("data-max-width", parseFloatLadiPage(getComputedStyle(n).width) || 0)
                                }
                            }, e = document.querySelectorAll(".ladi-element .ladi-image .ladi-image-compare-line"), a = 0; a < e.length; a++) e[a].addEventListener("mousedown", t), e[a].addEventListener("touchstart", t, i.runtime.scrollEventPassive)
                    }(),
                    function() {
                        if (0 != document.getElementsByClassName("ladiflow-widget").length) {
                            var t = document.querySelector('script[src^="' + i.const.LADIFLOW_SDK + '"][data-time="' + i.runtime.timenow + '"]');
                            isEmptyLadiPage(t) && i.loadScript(i.const.LADIFLOW_SDK, {
                                "data-time": i.runtime.timenow
                            }, !0)
                        }
                    }(), Lt(), it(null, !1), z(),
                    function() {
                        var t = document.getElementById(i.runtime.builder_section_popup_id);
                        if (!isEmptyLadiPage(t)) {
                            var e = document.createElement("div");
                            if (e.className = "popup-close", e.style.setProperty("position", "fixed"), e.style.setProperty("opacity", "0"), t.appendChild(e), "none" == getComputedStyle(e).display) {
                                var a = document.getElementById("style_fix_css");
                                if (isEmptyLadiPage(a)) {
                                    (a = document.createElement("style")).id = "style_fix_css", a.type = "text/css", a.innerHTML = "#SECTION_POPUP .popup-close {display: initial;}";
                                    var n = document.getElementById("style_ladi");
                                    isEmptyLadiPage(n) ? document.head.appendChild(a) : n.parentNode.insertBefore(a, n.nextElementSibling)
                                }
                            }
                            e.parentElement.removeChild(e)
                        }
                    }();
                try {
                    i.handleActionProductTemplate()
                } catch (t) {}! function() {
                    document.addEventListener("mouseleave", i.runEventMouseLeave), document.addEventListener("mousedown", i.runEventMouseDown), document.addEventListener("touchstart", i.runEventMouseDown, i.runtime.scrollEventPassive), document.addEventListener("mousemove", i.runEventMouseMove), document.addEventListener("touchmove", i.runEventMouseMove, {
                        passive: !1
                    }), document.addEventListener("mouseup", i.runEventMouseUp), document.addEventListener("touchend", i.runEventMouseUp);
                    var t = window;
                    isObjectLadiPage(i.runtime.story_page) && (t = document.getElementsByClassName("ladi-wraper")[0]), t.addEventListener("scroll", i.runEventScroll, i.runtime.scrollEventPassive), window.addEventListener("resize", i.runEventResize), window.addEventListener("orientationchange", i.runEventOrientationChange), window.addEventListener("pageshow", function(t) {
                        (t.persisted || void 0 !== window.performance && 2 === window.performance.navigation.type) && window.location.reload()
                    });
                    var e = document.getElementById(i.runtime.backdrop_popup_id);
                    isEmptyLadiPage(e) || e.addEventListener("click", i.runEventBackdropPopupClick);
                    var a = document.getElementById(i.runtime.backdrop_dropbox_id);
                    isEmptyLadiPage(a) || a.addEventListener("click", i.runEventBackdropDropboxClick)
                }(), i.reloadLazyload(!0), X(), i.setDataReplaceStart(), i.resetViewport(), i.runConversionApi(), i.runStoryPage(), i.runThankyouPage(), i.runGlobalTrackingScript(), i.runtime.list_loaded_func = i.runtime.list_loaded_func.concat(A), console.log(document.readyState), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? i.documentLoaded() : document.addEventListener("DOMContentLoaded", i.documentLoaded)
            };
        i.runtime.tmp.runDataEventNow = F, i.runtime.tmp.generateLadiSaleProduct = function(t, e, a) {
            var n = function() {
                    b.forEach(function(i) {
                        ct(i, t, e, null, null, !1, a)
                    })
                },
                o = function(t) {
                    if (t && isEmptyLadiPage(a)) n();
                    else {
                        var e = a.target,
                            r = i.findAncestor(e, "ladi-element");
                        if (!isEmptyLadiPage(r)) {
                            var d = i.findAncestor(r, "ladi-form");
                            if (!isEmptyLadiPage(d)) {
                                var l = i.findAncestor(d, "ladi-element");
                                if (!isEmptyLadiPage(l)) {
                                    var s = i.runtime.eventData[l.id];
                                    if (!isEmptyLadiPage(s)) {
                                        var c = s["option.product_id"];
                                        if (!isEmptyLadiPage(c)) {
                                            var u = i.generateVariantProduct(s, !1, null, null, null, null, !0, !0, function(t) {
                                                o(!1)
                                            });
                                            if (isObjectLadiPage(u) && isObjectLadiPage(u.store_info) && isObjectLadiPage(u.product)) {
                                                var p = i.getProductVariantIndex(l.id, s),
                                                    m = document.querySelectorAll('[data-variant="true"]');
                                                if (-1 != p)
                                                    for (var _ = 0; _ < m.length; _++)
                                                        if (m[_].id != r.id && isEmptyLadiPage(i.findAncestor(m[_], "ladi-collection"))) {
                                                            var g = i.runtime.eventData[m[_].id];
                                                            if (!isEmptyLadiPage(g)) {
                                                                var y = i.findAncestor(m[_], "ladi-form");
                                                                if (!isEmptyLadiPage(y)) {
                                                                    var h = i.findAncestor(y, "ladi-element");
                                                                    if (!isEmptyLadiPage(h)) {
                                                                        var f = i.runtime.eventData[h.id];
                                                                        if (!isEmptyLadiPage(f) && !isEmptyLadiPage(f["option.product_variant_id"])) continue
                                                                    }
                                                                    var v = null,
                                                                        E = null,
                                                                        P = null,
                                                                        L = 0;
                                                                    if (g["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.combobox) {
                                                                        if (!isArrayLadiPage(u.product.variants)) continue;
                                                                        if (E = u.product.variants[p], isStringLadiPage(E.option_ids))
                                                                            for (P = E.option_ids.split("/"), L = 0; L < P.length; L++) v = document.querySelector("#" + m[_].id + ' .ladi-form-item select[data-product-option-id="' + P[L] + '"]'), isEmptyLadiPage(v) || v.getAttribute("data-store-id") != u.store_info.id || v.getAttribute("data-product-id") != E.product_id || (v.value = E["option" + (L + 1)])
                                                                    }
                                                                    if (g["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.label) {
                                                                        if (!isArrayLadiPage(u.product.variants)) continue;
                                                                        if (E = u.product.variants[p], isStringLadiPage(E.option_ids))
                                                                            for (P = E.option_ids.split("/"), L = 0; L < P.length; L++) v = document.querySelector("#" + m[_].id + ' .ladi-form-label-container[data-product-option-id="' + P[L] + '"]'), isEmptyLadiPage(v) || v.getAttribute("data-store-id") != u.store_info.id || v.getAttribute("data-product-id") != E.product_id || i.runtime.tmp.updateLabelValue(v, E["option" + (L + 1)])
                                                                    }
                                                                    if (g["option.product_variant_type"] == i.const.PRODUCT_VARIANT_TYPE.combined) {
                                                                        if (v = m[_].querySelector("select.ladi-form-control"), isEmptyLadiPage(v) || v.getAttribute("data-store-id") != u.store_info.id || v.getAttribute("data-product-id") != u.product.product_id) continue;
                                                                        var b = i.getProductVariantId(r, u);
                                                                        if (!isEmptyLadiPage(b)) {
                                                                            var A = v.querySelector('option[data-product-variant-id="' + b + '"]');
                                                                            isEmptyLadiPage(A) || (p = A.getAttribute("value"))
                                                                        }
                                                                        v.value = p + ""
                                                                    }
                                                                }
                                                            }
                                                        } for (var T = 0; T < m.length; T++) {
                                                    var S = i.findAncestor(m[T], "ladi-form");
                                                    if (!isEmptyLadiPage(S)) {
                                                        var w = S.querySelector('input[name="quantity"]');
                                                        isEmptyLadiPage(w) || i.fireEvent(w, "input")
                                                    }
                                                }
                                                n()
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            o(!0)
        }, i.runtime.tmp.generateCart = function() {
            b.forEach(function(e) {
                ! function(e, a) {
                    if ("cart" == a) {
                        var n = i.runtime.eventData[e];
                        if (!isEmptyLadiPage(n)) {
                            var o = document.getElementById(e);
                            isEmptyLadiPage(o) || i.showParentVisibility(o, function() {
                                var e = parseFloatLadiPage(getComputedStyle(o).height) || 0,
                                    a = parseFloatLadiPage(o.getAttribute("data-height")) || 0;
                                o.hasAttribute("data-height") || (o.setAttribute("data-height", e), a = e);
                                var r = i.generateHtmlCart(n["option.cart_layout"], n["option.message_no_product"], t);
                                o.getElementsByClassName("ladi-cart")[0].innerHTML = r;
                                var d = o.getElementsByClassName("ladi-cart")[0].scrollHeight;
                                if (e != (d = d < a ? a : d)) {
                                    o.style.setProperty("height", d + "px");
                                    var l = i.findAncestor(o.parentElement, "ladi-element");
                                    isEmptyLadiPage(l) && (l = i.findAncestor(o.parentElement, "ladi-section")), i.updateHeightElement(!0, o, l, e, d)
                                }
                            })
                        }
                    }
                }(e, i.runtime.eventData[e].type)
            })
        }, i.runtime.tmp.runButtonSectionClose = H, i.runtime.tmp.runOptionAction = V, i.runtime.tmp.runOptionHover = Y, i.runtime.tmp.runElementClickSelected = it, i.runtime.tmp.runTrackingAnalytics = M, i.runtime.tmp.runLadiSaleProductKey = ct, i.runtime.tmp.eventClickGalleryControlItem = Q, i.runtime.tmp.runGallery = J, i.runtime.tmp.setGalleryStart = tt, i.runtime.tmp.updateImageGalleryProduct = st, i.runtime.tmp.runOptionCountdown = j, i.runtime.tmp.runOptionCountdownItem = G, i.runtime.tmp.getOptionLabelValue = nt, i.runtime.tmp.updateLabelValue = ot, i.runtime.tmp.getLabelValue = rt, i.runtime.tmp.clickLabelProductChangeCallback = dt, i.runtime.tmp.fireEventLabelChange = function(t) {
            var e = t.querySelector(".ladi-form-label-item.selected");
            isEmptyLadiPage(e) || i.fireEvent(e, "click", {
                is_fire_event: !0
            })
        }, i.runtime.tmp.showPopupX = ht, i.runtime.tmp.runActionPopupX = mt, i.runtime.is_popupx ? (i.runtime.tmp.popupx_iframe_id = i.randomId(), mt({
            ladipage_id: i.runtime.ladipage_id,
            funnelx_type: i.runtime.funnelx_type,
            action: {
                type: "set_iframe_loaded"
            }
        }), document.body.classList.add("ladi-popupx"), window.addEventListener("message", function(t) {
            try {
                var e = JSON.parse(t.data);
                if ("POPUPX" != e.type) return;
                e.iframe_id == i.runtime.tmp.popupx_iframe_id && e.action.value.forEach(function(t) {
                    ! function(t, e, a) {
                        var n = null,
                            o = null;
                        if ("callback_request_with_option" == t && isFunctionLadiPage(i.runtime.tmp["request_callback_id_" + e.callback_id]) && i.runtime.tmp["request_callback_id_" + e.callback_id](e.responseText, e.status, e.httpRequest, e.url), "set_style_device" == t) {
                            if (Pt(e.is_desktop), o = document.getElementById(i.runtime.tmp.popupx_current_element_id), isEmptyLadiPage(o)) return;
                            "none" != getComputedStyle(o).display && (i.runtime.tmp.popupx_is_inline ? ft(i.runtime.tmp.popupx_current_element_id, !1) : ht(i.runtime.tmp.popupx_current_element_id, !1))
                        }
                        if ("set_iframe_info" == t) {
                            isEmptyLadiPage(S) && (S = e.ladi_client_id || i.randomId(), window.ladi("LADI_CLIENT_ID").set_cookie(S, 365)), i.runtime.tmp.popupx_is_desktop = e.is_desktop, i.runtime.isDesktop = e.is_desktop, i.runtime.device = i.runtime.isDesktop ? i.const.DESKTOP : i.const.MOBILE, i.runtime.tmp.popupx_origin_store_id = e.origin_store_id, i.runtime.tmp.popupx_origin_referer = e.origin_referer, i.runtime.tmp.popupx_origin_domain = e.origin_domain, i.runtime.tmp.popupx_origin_url = e.origin_url, i.runtime.tmp.popupx_is_inline = e.is_inline, Pt(e.is_desktop);
                            var r = "#" + i.runtime.builder_section_popup_id + " .ladi-container {width: 100% !important;}";
                            i.runtime.tmp.popupx_is_inline && (r += ".ladi-section > .ladi-section-close {display: none !important;}"), i.createStyleElement("style_popup_container", r), i.runtime.has_popupx = !0, bt()
                        }
                        "hide_popupx" == t && (n = i.runtime.eventData[e], o = document.getElementById(e), isObjectLadiPage(n) && !isEmptyLadiPage(o) && window.ladi(e).hide()), "show_popupx" == t && (ht(e, !0), Et(e, a)), "show_popupx_inline_iframe" == t && (ft(e, !0), Et(e, a)), "mapping_form" == t && vt(e, a, !0), "show_message_callback" == t && (isFunctionLadiPage(i.runtime.tmp.popupx_show_message_callback) && i.runtime.tmp.popupx_show_message_callback(), delete i.runtime.tmp.popupx_show_message_callback)
                    }(e.action.type, t, e)
                })
            } catch (t) {}
        })) : bt(), i.runtime.isRun = !0, isFunctionLadiPage(e) && e()
    } else i.loadHtmlGlobal(null, t, e)
}, LadiPageScript.const.API_FORM_DATA_ERROR_RESPONSE = "https://apiv5.ladipage.com/2.0/send-form-data", LadiPageScript.const.API_FORM_DATA = "https://api1.ldpform.com/sendform", LadiPageScript.const.API_FORM_DATA_LIST = ["https://api1.ldpform.com/sendform", "https://api2.ldpform.com/sendform", "https://api1.ldpform.net/sendform", "https://api2.ldpform.net/sendform"], LadiPageScript.const.API_FORM_DATA_TIMEOUT = 5e3, LadiPageScript.const.API_ANALYTICS_EVENT = "https://a.ladipage.com/event", LadiPageScript.const.API_ANALYTICS_CONFIG = "https://a.ladipage.com/config", LadiPageScript.const.API_ACCESS_KEY_LOGIN = "https://apiv5.ladipage.com/2.0/access-key-login", LadiPageScript.const.API_COLLECTION_PRODUCT = "https://api.checkout.ladisales.com/1.0/product-list", LadiPageScript.const.API_SHOW_PRODUCT = "https://api.checkout.ladisales.com/1.0/product-detail", LadiPageScript.const.API_LADISALE_COLLECTION_PRODUCT = "https://api.sales.ldpform.net/2.0/public/collections/products", LadiPageScript.const.API_LADISALE_SHOW_PRODUCT_LDP = "https://apiv5.sales.ldpform.net/2.0/product/show-products-detail-ldp", LadiPageScript.const.API_LADISALE_SHOW_PRODUCT = "https://api.sales.ldpform.net/2.0/public/product/show", LadiPageScript.const.API_LADISALE_LIST_GATEWAY = "https://apiv5.sales.ldpform.net/2.0/payment/list-gateways-by-ldp", LadiPageScript.const.API_LADISALE_PRODUCT_SHOW_LIST = "https://apiv5.sales.ldpform.net/2.0/public/product/show-list", LadiPageScript.const.API_LADISALE_CHECKOUT_PAYMENT = "https://api.checkout.ladisales.com/1.0/checkout/payment-v2", LadiPageScript.const.API_LADISALE_CHECKOUT_GET_ORDER_STATUS = "https://api.checkout.ladisales.com/1.0/payment/get-order-status", LadiPageScript.const.API_LADISALE_ADD = "https://api.sales.ldpform.net/2.0/cart/add", LadiPageScript.const.API_LADISALE_UPDATE = "https://api.sales.ldpform.net/2.0/cart/update", LadiPageScript.const.API_LADISALE_SHOW = "https://api.sales.ldpform.net/2.0/cart/show", LadiPageScript.const.API_LADISALE_GET_SHIPPING = "https://api.sales.ldpform.net/2.0/checkout/{0}/get-shipping", LadiPageScript.const.API_LADISALE_VALIDATE_DISCOUNT = "https://api.sales.ldpform.net/2.0/checkout/{0}/validate-discount", LadiPageScript.const.API_LADISALE_PROMOTION = "https://api.checkout.ladisales.com/1.0/checkout/get-promotion", LadiPageScript.const.API_LADISALE_CHECKOUT_CREATE = "https://api.checkout.ladisales.com/1.0/checkout/create", LadiPageScript.const.API_FILE_UPLOAD = "https://api.files.ladicdn.com/2.0/ladipage-upload-file", LadiPageScript.const.API_DATASET_DATA = "https://g.ladicdn.com/dataset/{0}.json?id={1}", LadiPageScript.const.API_DATASET_BLOG = "https://g.ladicdn.com/blog-", LadiPageScript.const.API_SECTION_GLOBAL_HTML = "https://g.ladicdn.com/section/{0}-{1}.html", LadiPageScript.const.LADIFLOW_SDK = "https://w.ladicdn.com/ladiflow/sdk.js?v=1.0", LadiPageScript.const.LADISALES_SDK = "https://w.ladicdn.com/ladisales/sdk/sdk.js?v=1.1", LadiPageScript.const.CDN_LIBRARY_JS_URL = "https://w.ladicdn.com/v5/source/", LadiPageScript.const.CDN_LIBRARY_CSS_URL = "https://w.ladicdn.com/v5/source/", LadiPageScript.const.API_LADISALE_LIST_COUPON_CODE = "https://apiv5.sales.ldpform.net/2.0/coupons/list-by-ldp", LadiPageScript.const.API_LADISALE_VALIDATE_COUPON_CODE = "https://api.checkout.ladisales.com/1.0/checkout/validate-discount", LadiPageScript.const.API_LADISALE_GET_SHIPPING_METHODS = "https://api.checkout.ladisales.com/1.0/checkout/shipping-methods-by-ldp", LadiPageScript.const.API_LADISALE_CUSTOMER_CHECK_UNIQUE = "https://api.checkout.ladisales.com/1.0/checkout/customer-check", LadiPageScript.const.URL_LADI_PAYMENT = function() {
    return "https://w.ladicdn.com/v5/ladiui/ladipage/ladi-payment.html"
};
var lightbox_run = function(t, e, i, a, n, o, r, d) {
        var l = document.getElementById(LadiPageScript.runtime.lightbox_screen_id);
        if (!isEmptyLadiPage(l)) {
            var s = function() {
                isEmptyLadiPage(window.$rootScope) || !isFunctionLadiPage(window.$rootScope.hideBuilderLoadingBlur) ? LadiPageScript.hideLoadingBlur() : window.$rootScope.hideBuilderLoadingBlur()
            };
            d || (isEmptyLadiPage(window.$rootScope) || !isFunctionLadiPage(window.$rootScope.showBuilderLoadingBlur) ? LadiPageScript.showLoadingBlur() : window.$rootScope.showBuilderLoadingBlur());
            var c = JSON.stringify({
                    html: t,
                    url: e,
                    is_video: i,
                    video_type: o,
                    video_value: r
                }),
                u = Object.keys(LadiPageScript.runtime.list_lightbox_id); - 1 == u.indexOf(c) && (LadiPageScript.runtime.list_lightbox_id[c] = u.length + 1);
            var p = LadiPageScript.runtime.list_lightbox_id[c];
            n = n + "_" + p;
            var m = document.getElementById(n),
                _ = !1;
            isEmptyLadiPage(m) ? (m = document.createElement("div"), l.appendChild(m), m.outerHTML = t, m = l.lastChild, _ = !0) : i && LadiPageScript.runEventReplayVideo(n, o, !0);
            var g = document.createElement("div");
            g.className = "lightbox-close", g.setAttribute("data-opacity", 0), l.appendChild(g), m.setAttribute("id", n), m.setAttribute("data-opacity", 0), m.classList.remove("lightbox-hidden");
            var y = function() {
                    if (m = document.getElementById(n), !isEmptyLadiPage(m)) {
                        if ("IFRAME" == m.tagName) {
                            var t = parseFloatLadiPage(getComputedStyle(m).width) || 0,
                                e = parseFloatLadiPage(getComputedStyle(m).height) || 0;
                            if (t > 0 || e > 0) {
                                var i = .8 * document.body.clientWidth,
                                    a = .8 * LadiPageScript.getHeightDevice(),
                                    o = i,
                                    r = e / t * o;
                                r > a && (o = (r = a) * (t / e)), m.style.setProperty("width", (parseFloatLadiPage(o) || 0) + "px"), m.style.setProperty("height", (parseFloatLadiPage(r) || 0) + "px")
                            }
                        }
                        if (g = l.getElementsByClassName("lightbox-close")[0], !isEmptyLadiPage(g)) {
                            var d = LadiPageScript.getElementBoundingClientRect(m),
                                s = 10,
                                c = 10;
                            d.x - 5 - g.clientWidth > c && (c = d.x - 5 - g.clientWidth), d.y - 5 - g.clientHeight > s && (s = d.y - 5 - g.clientHeight), c += LadiPageScript.runtime.widthScrollBar, s -= 6, c -= 6, g.style.setProperty("right", c + "px"), g.style.setProperty("top", s + "px")
                        }
                        var u = document.getElementById(m.id + "_button_unmute");
                        isEmptyLadiPage(u) || (u.style.setProperty("width", getComputedStyle(m).width), u.style.setProperty("height", getComputedStyle(m).height))
                    }
                },
                h = function() {
                    LadiPageScript.runTimeout(function() {
                        s(), m = document.getElementById(n), g = l.getElementsByClassName("lightbox-close")[0], y(), isEmptyLadiPage(m) || m.removeAttribute("data-opacity"), isEmptyLadiPage(g) || g.removeAttribute("data-opacity")
                    }, 100)
                };
            g.style.setProperty("top", "-100px"), g.style.setProperty("right", "-100px");
            var f = "load";
            if (i && o == LadiPageScript.const.VIDEO_TYPE.direct && (f = "loadedmetadata"), _ && (m.addEventListener(f, h), m.addEventListener("error", h)), i) {
                var v = e;
                o == LadiPageScript.const.VIDEO_TYPE.youtube && (e = null, v = r), _ ? LadiPageScript.runEventPlayVideo(n, o, v, !1, !1, !0, !1, d, !1, function(t) {
                    isEmptyLadiPage(t) ? h() : (t.addEventListener(f, h), t.addEventListener("error", h))
                }) : h()
            }
            d || l.style.setProperty("display", "block"), isEmptyLadiPage(e) || (_ ? m.src = e : h());
            var E = function() {
                    var t = document.getElementById(LadiPageScript.runtime.backdrop_popup_id);
                    return isEmptyLadiPage(t) || "none" == getComputedStyle(t).display
                },
                P = 0;
            E() ? (P = window.scrollY, LadiPageScript.runtime.tmp.bodyScrollY = P) : P = LadiPageScript.runtime.tmp.bodyScrollY;
            var L = function() {
                s(), l.style.removeProperty("display"), m = document.getElementById(n), isEmptyLadiPage(m) || (a && !i ? m.parentElement.removeChild(m) : (m.classList.add("lightbox-hidden"), i && LadiPageScript.runEventReplayVideo(n, o, !1))), g = l.getElementsByClassName("lightbox-close")[0], isEmptyLadiPage(g) || g.parentElement.removeChild(g);
                var t = document.getElementById("style_lightbox");
                isEmptyLadiPage(t) || t.parentElement.removeChild(t);
                var e = E();
                e && !isEmptyLadiPage(LadiPageScript.runtime.tmp.bodyScrollY) && window.scrollTo(0, LadiPageScript.runtime.tmp.bodyScrollY), e && (LadiPageScript.runtime.tmp.bodyScrollY = null)
            };
            if (g.addEventListener("click", function(t) {
                    t.stopPropagation(), L()
                }), !d) {
                var b = "body {";
                b += "position: fixed !important;", b += "width: 100% !important;", b += "top: -" + P + "px !important;", b += "}", LadiPageScript.createStyleElement("style_lightbox", b)
            }
            isEmptyLadiPage(l.getAttribute("data-load-event")) && (l.setAttribute("data-load-event", !0), l.addEventListener("click", function(t) {
                t.stopPropagation(), t.target.id == l.id && (g = l.getElementsByClassName("lightbox-close")[0], isEmptyLadiPage(g) || g.click())
            }), window.addEventListener("resize", y)), d && L()
        }
    },
    lightbox_iframe = function(t, e, i, a, n, o) {
        if (!isEmptyLadiPage(t)) {
            var r = "margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; max-width: 80%; max-height: 80%;",
                d = '<iframe id="' + (i = i || "lightbox_iframe") + '" class="lightbox-item" style="' + r + '" frameborder="0" allowfullscreen></iframe>',
                l = t,
                s = LadiPageScript.createTmpElement("iframe", l, null, !0);
            isEmptyLadiPage(s) || "IFRAME" != s.tagName || (l = s.src, i = s.id || i, s.removeAttribute("src"), s.setAttribute("style", r), s.classList.add("lightbox-item"), d = s.outerHTML), lightbox_run(d, l, e, !0, i, a, n, o)
        }
    },
    lightbox_image = function(t) {
        if (!isEmptyLadiPage(t)) {
            lightbox_run('<img class="lightbox-item" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; object-fit: scale-down; max-width: 80%; max-height: 80%;" />', t, !1, !1, "lightbox_image")
        }
    },
    lightbox_video = function(t, e, i) {
        if (!isEmptyLadiPage(t) && !isEmptyLadiPage(e)) {
            LadiPageScript.pauseAllVideo();
            var a = "lightbox_player";
            if (e == LadiPageScript.const.VIDEO_TYPE.youtube && lightbox_iframe('<iframe id="' + a + '" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>', !0, a, e, t, i), e == LadiPageScript.const.VIDEO_TYPE.direct) {
                lightbox_run('<video class="lightbox-item" id="lightbox_player" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; max-width: 80%; max-height: 80%; object-fit: cover;"></video>', t, !0, !1, a, e, null, i)
            }
        }
    },
    language_set = function(t, e) {
        isObjectLadiPage(t) && (e ? LadiPageScript.const.LANG = t : LadiPageScript.runtime.tmp.lang_loaded ? (t = JSON.stringify(t), t = LadiPageScript.convertReplacePrefixStr(t), t = JSON.parse(t), Object.keys(t).forEach(function(e) {
            LadiPageScript.const.LANG[e] = t[e]
        })) : LadiPageScript.runTimeout(function() {
            language_set(t, e)
        }, 100))
    },
    LadiPageLibraryV2 = LadiPageLibraryV2 || function() {};
LadiPageLibraryV2.prototype.encode_thankyou_url = function() {
    if (!isEmptyLadiPage(this.id)) try {
        var t = this.id,
            e = [LadiPageScript.runtime.replacePrefixStart, LadiPageScript.runtime.replacePrefixEnd, LadiPageScript.runtime.replaceNewPrefixStart, LadiPageScript.runtime.replaceNewPrefixEnd],
            i = {};
        e.forEach(function(e) {
            i[e] = LadiPageScript.randomId(), t = t.replaceAll(e, i[e])
        });
        var a = new URL(t);
        if ("m.me" == a.hostname && a.searchParams.has("ref")) {
            var n = a.searchParams.get("ref");
            return a.searchParams.set("ref", n), t = a.href, e.forEach(function(e) {
                t = t.replaceAll(i[e], e)
            }), t
        }
    } catch (t) {}
    return this.id
}, LadiPageLibraryV2.prototype.get_url = function(t, e, i) {
    if (!isEmptyLadiPage(this.id)) {
        var a = this.id,
            n = "";
        if (isObjectLadiPage(t))
            if (t = LadiPageScript.copy(t), Object.keys(t).forEach(function(e) {
                    ["country", "state", "district", "ward"].includes(e) && !isEmptyLadiPage(t[e]) && (t[e + "_id"] = t[e].split(":")[0], t[e + "_name"] = t[e].split(":")[1])
                }), e) Object.keys(t).forEach(function(e) {
                if (! function(t) {
                        try {
                            var e = new URLSearchParams(new URL(a).search).get(t);
                            return !isNullLadiPage(e)
                        } catch (t) {
                            return !1
                        }
                    }(e)) {
                    isEmptyLadiPage(n) || (n += "&");
                    var o = t[e];
                    i && -1 != ["email", "phone"].indexOf(e) && (o = Base64.encode(o)), isArrayLadiPage(o) && o.length > 1 && (o = JSON.stringify(o)), o = encodeURIComponent(o), n += e + "=" + o
                }
            });
        if (!isEmptyLadiPage(n)) {
            var o = LadiPageScript.createTmpElement("a", "", {
                href: a
            });
            o.search = o.search + (isEmptyLadiPage(o.search) ? "?" : "&") + n, a = o.href
        }
        return a = LadiPageScript.getLinkUTMRedirect(a, null), a = LadiPageScript.convertDataReplaceStr(a, !0, null, !1, t)
    }
}, LadiPageLibraryV2.prototype.open_url = function(t, e) {
    if (!isEmptyLadiPage(this.id))
        if (LadiPageScript.runtime.has_popupx) LadiPageScript.runtime.tmp.runActionPopupX({
            url: this.id,
            target: t,
            nofollow: e,
            action: {
                type: "open_url"
            }
        });
        else {
            var i = this.id,
                a = null;
            e && ((a = LadiPageScript.getElementAHref(i, !1)).setAttribute("rel", "nofollow"), document.body.appendChild(a)), isEmptyLadiPage(t) || "_self" == t.toLowerCase() ? e ? a.click() : window.location.href = i : e ? (a.setAttribute("target", t), a.click()) : window.open(i, t), e && a.parentElement.removeChild(a)
        }
}, LadiPageLibraryV2.prototype.get_cookie = function() {
    if (!isEmptyLadiPage(this.id)) {
        var t = "";
        try {
            for (var e = this.id + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
                for (var n = i[a];
                    " " == n.charAt(0);) n = n.substring(1);
                if (0 == n.indexOf(e)) {
                    t = n.substring(e.length, n.length);
                    break
                }
            }
        } catch (t) {}
        return decodeURIComponentLadiPage(t)
    }
}, LadiPageLibraryV2.prototype.delete_cookie = function(t, e) {
    this.set_cookie(null, -365, t, e, !1)
}, LadiPageLibraryV2.prototype.set_cookie = function(t, e, i, a, n) {
    if (!isEmptyLadiPage(this.id)) try {
        var o = "";
        if (n) o = "expires = 0";
        else {
            var r = new Date;
            !isNullLadiPage(e) && e instanceof Date ? r = e : (e = isEmptyLadiPage(e) ? 365 : e, r.setTime(r.getTime() + 24 * e * 60 * 60 * 1e3)), o = "expires = " + r.toUTCString()
        }
        t = isEmptyLadiPage(t) ? "" : t;
        var d = this.id + " = " + t;
        isEmptyLadiPage(o) || (d += "; " + o), isEmptyLadiPage(a) || (d += "; domain = " + a), i = i || window.location.pathname, LadiPageScript.runtime.isIE || (d += "; path = " + i), "https:" == window.location.protocol && (d += "; SameSite = None; secure"), document.cookie = d
    } catch (t) {}
}, LadiPageLibraryV2.prototype.jquery_scroll = function(t, e) {
    var i = (t, e, a) => {
        if (!window.jQuery) {
            let n = document.createElement("script");
            return n.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js", n.onload = (() => {
                i(t, e, a)
            }), void document.head.appendChild(n)
        }
        let n = null;
        $("html, body").animate({
            scrollTop: $(`#${t}`).offset().top
        }, e, () => {
            clearTimeout(n), n = setTimeout(a, 10)
        })
    };
    e = isEmptyLadiPage(e) ? 1e3 : e, i(this.id, e, t)
}, LadiPageLibraryV2.prototype.submit = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t)) {
        var e = t.querySelector('.ladi-form button[type="submit"]');
        isEmptyLadiPage(e) || e.click()
    }
}, LadiPageLibraryV2.prototype.scroll = function(t, e) {
    var i = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(i))
        if (LadiPageScript.runtime.has_popupx) this.show();
        else {
            t && "none" == getComputedStyle(i).display && this.show();
            for (var a = document.querySelectorAll("#" + LadiPageScript.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"), n = 0; n < a.length; n++)
                if (a[n].id != this.id && a[n].hasAttribute("data-popup-backdrop") && "none" != getComputedStyle(a[n]).display) {
                    var o = LadiPageScript.findAncestor(i, "ladi-popup");
                    isEmptyLadiPage(o) || (o = LadiPageScript.findAncestor(o, "ladi-element")), (isEmptyLadiPage(o) || o.id != a[n].id) && (LadiPageScript.runRemovePopup(a[n].id, !0), 100)
                } var r = isObjectLadiPage(LadiPageScript.runtime.story_page),
                d = function(t, e, i) {
                    LadiPageScript.removeTimeout(LadiPageScript.runtime.tmp.scroll_timeout_id);
                    var a = function(t, e, i, a) {
                            return (t /= a / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
                        },
                        n = 0;
                    n = r ? "left" == t ? e.scrollLeft : e.scrollTop : "left" == t ? e.scrollX : e.scrollY;
                    var o = "left" == t ? window.innerWidth : window.innerHeight,
                        d = i - n;
                    if (0 != d) {
                        var l = d < 0 ? -1 * d : d,
                            s = 0,
                            c = 1e3;
                        c = l <= 4 * o ? 750 : c, c = l <= 2 * o ? 525 : c, c = l <= o ? 300 : c, c = r ? 300 : c;
                        var u = "left" == t ? "scrollLeft" : "scrollTop",
                            p = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame,
                            m = null,
                            _ = null,
                            g = function(i) {
                                r ? e[u] = i : "left" == t ? e.scrollTo(i, e.scrollY) : e.scrollTo(e.scrollX, i)
                            };
                        if (p) {
                            var y = Date.now() + c;
                            p(m = function() {
                                s = c - (y - Date.now()), _ = a(s, n, d, c), g(_), s < c ? p(m) : g(i)
                            })
                        } else(m = function() {
                            _ = a(s += 20, n, d, c), g(_), s < c ? LadiPageScript.runtime.tmp.scroll_timeout_id = LadiPageScript.runTimeout(m, 20) : g(i)
                        })()
                    }
                },
                l = function(t) {
                    var e = document.getElementsByClassName("ladi-wraper")[0],
                        a = LadiPageScript.getElementBoundingClientRect(i).top + (r ? t.scrollTop : t.scrollY);
                    return {
                        scrollTop: a -= parseFloatLadiPage(e.getAttribute("data-scroll-padding-top") || 0) || 0
                    }
                },
                s = null,
                c = null,
                u = null;
            if (e) r ? i.scrollIntoView() : (s = l(window), window.scrollTo({
                top: s.scrollTop
            }));
            else {
                var p = function() {
                    u = window, s = l(u), LadiPageScript.runtime.isDesktop || LadiPageScript.runtime.isBrowserDesktop ? window.scrollTo({
                        top: s.scrollTop,
                        behavior: "smooth"
                    }) : d("top", u, s.scrollTop)
                };
                LadiPageScript.runTimeout(function() {
                    if (r) LadiPageScript.runtime.isDesktop || LadiPageScript.runtime.isBrowserDesktop ? i.scrollIntoView({
                        behavior: "smooth"
                    }) : (u = document.getElementsByClassName("ladi-wraper")[0], LadiPageScript.runtime.story_page.type == LadiPageScript.const.STORY_PAGE.horizontal && (t = u, c = {
                        scrollLeft: LadiPageScript.getElementBoundingClientRect(i).left + (r ? t.scrollLeft : t.scrollX)
                    }, d("left", u, c.scrollLeft)), LadiPageScript.runtime.story_page.type == LadiPageScript.const.STORY_PAGE.vertical && (s = l(u), d("top", u, s.scrollTop)));
                    else try {
                        if (u = window, s = l(u), !isNullLadiPage(window.jQuery)) return void $("html, body").animate({
                            scrollTop: s.scrollTop
                        });
                        p()
                    } catch (t) {
                        p()
                    }
                    var t
                }, 100)
            }
        }
}, LadiPageLibraryV2.prototype.value = function(t, e, i) {
    var a = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(a)) {
        var n = [],
            o = !1,
            r = 0,
            d = isArrayLadiPage(t) ? t : [t],
            l = a.querySelectorAll('.ladi-form-item > [data-is-select-country="true"]');
        if (4 == l.length)
            if (isNullLadiPage(t)) {
                for (r = 0; r < l.length; r++) n.push(l[r].value);
                o = !0
            } else d.forEach(function(t, e) {
                isEmptyLadiPage(l[e]) || (l[e].value = t, LadiPageScript.fireEvent(l[e], "change"))
            });
        else {
            var s = document.querySelectorAll("#" + this.id + " > ." + ["ladi-button .ladi-headline", "ladi-headline", "ladi-paragraph", "ladi-list-paragraph"].join(", #" + this.id + " > .")),
                c = document.querySelectorAll("#" + this.id + " > ." + ["ladi-form-item-container .ladi-form-item > input", "ladi-form-item-container .ladi-form-item > textarea", "ladi-form-item-container .ladi-form-item > select"].join(", #" + this.id + " > .")),
                u = document.querySelectorAll("#" + this.id + " > ." + ["ladi-form-item-container .ladi-form-checkbox-item > input"].join(", #" + this.id + " > .")),
                p = document.querySelectorAll("#" + this.id + " > .ladi-image .ladi-image-background"),
                m = document.querySelectorAll("#" + this.id + " > .ladi-shape"),
                _ = document.querySelectorAll("#" + this.id + " > .ladi-video"),
                g = document.querySelectorAll("#" + this.id + " > .ladi-survey > .ladi-survey-option"),
                y = function(t) {
                    var e = [];
                    return isArrayLadiPage(t) && t.forEach(function(t) {
                        e.push(t.name)
                    }), e = e.length > 0 ? "[" + e.join(", ") + "]" : ""
                };
            for (r = 0; r < s.length; r++)
                if (isNullLadiPage(t)) isObjectLadiPage(i) && i.only_text ? i.text_trim ? n.push(s[r].innerText.trim()) : n.push(s[r].innerText) : n.push(s[r].innerHTML);
                else if (s[r].innerHTML = t, !isEmptyLadiPage(e)) {
                var h = LadiPageScript.findAncestor(s[r], "ladi-element");
                isEmptyLadiPage(h) || h.classList.add(e)
            }
            for (r = 0; r < c.length; r++)
                if (isNullLadiPage(t))
                    if (c[r].classList.contains("ladi-form-control-file")) {
                        var f = c[r].getAttribute("data-path-file") || "[]";
                        f = JSON.parse(f), n.push(f)
                    } else n.push(c[r].value);
            else c[r].classList.contains("ladi-form-control-file") ? (c[r].setAttribute("data-path-file", JSON.stringify(t)), c[r].value = y(t)) : (c[r].value = t, "date" == c[r].getAttribute("data-type") && (isEmptyLadiPage(t) ? c[r].setAttribute("type", "text") : c[r].setAttribute("type", "date")));
            var v = !1;
            for (r = 0; r < u.length; r++) isNullLadiPage(t) ? (u[r].checked && n.push(u[r].value), "checkbox" == u[r].getAttribute("type").toLowerCase() && (o = !0)) : (v = !1, "checkbox" == u[r].getAttribute("type").toLowerCase() && -1 != d.indexOf(u[r].value) && (v = !0), "radio" == u[r].getAttribute("type").toLowerCase() && d.length > 0 && d[0] == u[r].value && (v = !0), v ? u[r].checked || u[r].click() : u[r].checked && u[r].click());
            for (r = 0; r < p.length; r++)
                if (isNullLadiPage(t)) {
                    var E = getComputedStyle(p[r]).backgroundImage;
                    (E = E || "").startsWith('url("') && (E = E.substring('url("'.length)), E.endsWith('")') && (E = E.substring(0, E.length - '")'.length)), n.push(E)
                } else if (isEmptyLadiPage(t)) p[r].style.setProperty("background-image", "none");
            else {
                var P = LadiPageScript.findAncestor(p[r], "ladi-element"),
                    L = LadiPageScript.getOptimizeImage(t, P.clientWidth, P.clientHeight, !0, !1, !1, !0);
                p[r].style.setProperty("background-image", 'url("' + L + '")')
            }
            for (r = 0; r < m.length; r++)
                if (isNullLadiPage(t)) n.push(m[r].innerHTML);
                else try {
                    "svg" == LadiPageScript.createTmpElement("svg", t, null, !0).tagName && (m[r].innerHTML = t)
                } catch (t) {}
            for (r = 0; r < _.length; r++) {
                var b = LadiPageScript.runtime.eventData[this.id];
                if (isNullLadiPage(t)) isObjectLadiPage(b) && n.push({
                    type: b["option.video_type"],
                    value: b["option.video_value"]
                });
                else {
                    b["option.video_value"] = t;
                    var A = _[r].getElementsByClassName("iframe-video-preload")[0],
                        T = null;
                    if (b["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.youtube) {
                        var S = "https://img.youtube.com/vi/" + (T = LadiPageScript.getVideoId(b["option.video_type"], t)) + "/hqdefault.jpg",
                            w = _[r].getElementsByClassName("ladi-video-background")[0];
                        isEmptyLadiPage(w) || w.style.setProperty("background-image", 'url("' + S + '")')
                    }
                    if (isEmptyLadiPage(A)) LadiPageScript.playVideo(this.id, b["option.video_type"], b["option.video_value"], b["option.video_control"]);
                    else {
                        LadiPageScript.pauseAllVideo();
                        var O = !1;
                        if (b["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.youtube) {
                            var C = window.YT.get(A.id);
                            !isEmptyLadiPage(C) && isFunctionLadiPage(C.loadVideoById) && (C.loadVideoById(T, 0), C.seekTo(0), O = !0)
                        }
                        b["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.direct && isFunctionLadiPage(A.play) && (A.src = t, A.currentTime = 0, O = !0), O && LadiPageScript.runEventReplayVideo(A.id, b["option.video_type"], !0)
                    }
                }
            }
            for (r = 0; r < g.length; r++) isNullLadiPage(t) ? (g[r].classList.contains("selected") && n.push(g[r].getAttribute("data-value")), "true" == a.getAttribute("data-multiple") && (o = !0)) : (v = !1, -1 != d.indexOf(g[r].getAttribute("data-value")) && (v = !0), v ? g[r].classList.contains("selected") || g[r].click() : g[r].classList.contains("selected") && g[r].click())
        }
        return isNullLadiPage(t) || isObjectLadiPage(i) && i.running_formula_data || LadiPageScript.runFormulaData(this.id), o ? n : n.length > 0 ? n[0] : null
    }
}, LadiPageLibraryV2.prototype.set_value_2nd = function(t) {
    var e = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(e)) {
        isObjectLadiPage(LadiPageScript.runtime.tmp.value_2nd_source) || (LadiPageScript.runtime.tmp.value_2nd_source = {}), isObjectLadiPage(LadiPageScript.runtime.tmp.value_2nd_click_time) || (LadiPageScript.runtime.tmp.value_2nd_click_time = {});
        var i = e.getAttribute("data-source-id");
        if (isEmptyLadiPage(i) && (i = LadiPageScript.randomString(10), e.setAttribute("data-source-id", i)), e.classList.contains("ladi-accordion-shape")) {
            if ((LadiPageScript.runtime.tmp.value_2nd_click_time[i] || 0) + 250 > Date.now()) return;
            LadiPageScript.runtime.tmp.value_2nd_click_time[i] = Date.now()
        }
        var a = LadiPageScript.runtime.tmp.value_2nd_source[i] || this.value(),
            n = parseFloatLadiPage(e.getAttribute("data-count-click")) || 0;
        n++, LadiPageScript.runtime.tmp.value_2nd_source[i] = a, e.setAttribute("data-count-click", n), n % 2 == 0 ? this.value(a) : this.value(t)
    }
}, LadiPageLibraryV2.prototype.top = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t) && t.classList.contains("ladi-section")) {
        t.parentElement.classList.contains("ladi-section-global") && (t = t.parentElement);
        try {
            var e = t.parentElement.firstChild;
            isEmptyLadiPage(e) || e.id != LadiPageScript.runtime.builder_section_background_id || (e = e.nextElementSibling), t.parentElement.insertBefore(t, e), LadiPageScript.reloadLazyload(!1)
        } catch (t) {}
    }
}, LadiPageLibraryV2.prototype.pause = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t)) {
        var e = LadiPageScript.runtime.eventData[this.id];
        if (!isEmptyLadiPage(e) && "video" == e.type) {
            var i = t.querySelector(".iframe-video-preload:not(.no-pause)");
            isEmptyLadiPage(i) || LadiPageScript.runEventReplayVideo(i.id, i.getAttribute("data-video-type"), !1)
        }
    }
}, LadiPageLibraryV2.prototype.play = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t)) {
        var e = LadiPageScript.runtime.eventData[this.id];
        if (!isEmptyLadiPage(e) && "video" == e.type) {
            var i = e["option.video_type"],
                a = e["option.video_value"],
                n = e["option.video_control"];
            LadiPageScript.playVideo(this.id, i, a, n)
        }
    }
}, LadiPageLibraryV2.prototype.prevSectionTabs = function() {
    var t = document.querySelectorAll('.ladi-section[data-tab-id="' + this.id + '"]');
    if (0 != t.length)
        for (var e = 0; e < t.length; e++)
            if (t[e].classList.contains("selected")) {
                var i = e - 1;
                i = i < 0 ? 0 : i, this.doc = t[i], this.show();
                break
            }
}, LadiPageLibraryV2.prototype.nextSectionTabs = function() {
    var t = document.querySelectorAll('.ladi-section[data-tab-id="' + this.id + '"]');
    if (0 != t.length)
        for (var e = 0; e < t.length; e++)
            if (t[e].classList.contains("selected")) {
                var i = e + 1;
                i = i >= t.length ? t.length - 1 : i, this.doc = t[i], this.show();
                break
            }
}, LadiPageLibraryV2.prototype.indexSectionTabs = function(t) {
    var e = document.querySelectorAll('.ladi-section[data-tab-id="' + this.id + '"]');
    e.length < t || (this.doc = e[t - 1], this.show())
}, LadiPageLibraryV2.prototype.prev = function() {
    var t = this.doc || document.getElementById(this.id);
    if (isEmptyLadiPage(t)) this.prevSectionTabs();
    else {
        var e = LadiPageScript.runtime.eventData[this.id];
        if (!isEmptyLadiPage(e)) {
            var i = null;
            if ("gallery" == e.type && (i = t.querySelector(".ladi-gallery-view-arrow.ladi-gallery-view-arrow-left")), "carousel" == e.type && (i = t.querySelector(".ladi-carousel-arrow.ladi-carousel-arrow-left")), "collection" == e.type && (i = t.querySelector(".ladi-collection-arrow.ladi-collection-arrow-left")), "tabs" == e.type) {
                var a = t.querySelector(".ladi-tabs > .ladi-element.selected[data-index]");
                return isEmptyLadiPage(a) && (a = t.querySelector(".ladi-tabs > .ladi-element")), void(isEmptyLadiPage(a) || isEmptyLadiPage(a.previousElementSibling) || (a.previousElementSibling.classList.add("selected"), a.classList.remove("selected"), checkVideoInTabForAutoplay(t), LadiPageScript.runAnimationDoc(a.previousElementSibling, null, {
                    is_multiple: !0,
                    element_type: e.type
                }), LadiPageScript.reloadLazyload(!1)))
            }
            isEmptyLadiPage(i) || i.click()
        }
    }
};
var checkVideoInTabForAutoplay = function(t) {
    var e = t.querySelectorAll(".ladi-element[data-index]"),
        i = t.querySelector(".ladi-element.selected[data-index]");
    e.forEach(function(t) {
        var e = t.querySelector("iframe.iframe-video-preload");
        if (e) {
            var a = isEmptyLadiPage(e.src) ? null : new URL(e.src),
                n = e.getAttribute("data-autoplay");
            if (t !== i) a && (a.searchParams.set("autoplay", "0"), e.src = a.toString()), t.querySelector(".ladi-video") && "true" !== n && e.remove();
            else "true" === n ? a && (a.searchParams.set("autoplay", "1"), e.src = a.toString(), e.classList.remove("ladi-hidden")) : e.classList.remove("ladi-hidden")
        }
    })
};
LadiPageLibraryV2.prototype.next = function() {
    var t = this.doc || document.getElementById(this.id);
    if (isEmptyLadiPage(t)) this.nextSectionTabs();
    else {
        var e = LadiPageScript.runtime.eventData[this.id];
        if (!isEmptyLadiPage(e)) {
            var i = null;
            if ("gallery" == e.type && (i = t.querySelector(".ladi-gallery-view-arrow.ladi-gallery-view-arrow-right")), "carousel" == e.type && (i = t.querySelector(".ladi-carousel-arrow.ladi-carousel-arrow-right")), "collection" == e.type && (i = t.querySelector(".ladi-collection-arrow.ladi-collection-arrow-right, .ladi-collection-button-next")), "survey" == e.type && (i = t.querySelector(".ladi-survey-button-next button")), "tabs" == e.type) {
                var a = t.querySelector(".ladi-tabs > .ladi-element.selected[data-index]");
                return isEmptyLadiPage(a) && (a = t.querySelector(".ladi-tabs > .ladi-element")), void(isEmptyLadiPage(a) || isEmptyLadiPage(a.nextElementSibling) || (a.nextElementSibling.classList.add("selected"), a.classList.remove("selected"), checkVideoInTabForAutoplay(t), LadiPageScript.runAnimationDoc(a.nextElementSibling, null, {
                    is_multiple: !0,
                    element_type: e.type
                }), LadiPageScript.reloadLazyload(!1)))
            }
            isEmptyLadiPage(i) || i.click()
        }
    }
}, LadiPageLibraryV2.prototype.index = function(t) {
    var e = this.doc || document.getElementById(this.id);
    if (isEmptyLadiPage(e)) this.indexSectionTabs(t);
    else {
        var i = LadiPageScript.runtime.eventData[this.id];
        if (!isEmptyLadiPage(i)) {
            var a = 0;
            "gallery" != i.type && "carousel" != i.type || (a = parseFloatLadiPage(e.getAttribute("data-current")) || 0, a += 1), "collection" == i.type && (a = parseFloatLadiPage(e.getAttribute("data-page")) || 1);
            var n = null;
            if ("tabs" == i.type && (n = e.querySelector(".ladi-tabs > .ladi-element.selected[data-index]"), isEmptyLadiPage(n) && (n = e.querySelector(".ladi-tabs > .ladi-element")), isEmptyLadiPage(n) || (a = parseFloatLadiPage(n.getAttribute("data-index")) || 1)), isEmptyLadiPage(t)) return a;
            if ("tabs" != i.type) {
                if ("gallery" != i.type && "carousel" != i.type || (t -= 1, a -= 1), t == a) return "carousel" == i.type && e.setAttribute("data-stop", !0), void("gallery" == i.type && e.hasAttribute("data-loaded") && e.setAttribute("data-stop", !0));
                t > a ? ("gallery" != i.type && "carousel" != i.type || e.setAttribute("data-current", t - 1), "collection" == i.type && e.setAttribute("data-page", t - 1), this.next()) : ("gallery" != i.type && "carousel" != i.type || e.setAttribute("data-current", t + 1), "collection" == i.type && e.setAttribute("data-page", t + 1), this.prev())
            } else {
                var o = e.querySelector('.ladi-tabs > .ladi-element[data-index="' + t + '"]');
                isEmptyLadiPage(o) || (isEmptyLadiPage(n) || n.classList.remove("selected"), o.classList.add("selected"), LadiPageScript.runAnimationDoc(o, null, {
                    is_multiple: !0,
                    element_type: i.type
                }), LadiPageScript.reloadLazyload(!1))
            }
        }
    }
}, LadiPageLibraryV2.prototype.readmore = function(t) {
    var e = this,
        i = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(i)) {
        var a = null;
        if (i.classList.contains("ladi-section")) a = i.getElementsByClassName("ladi-section-arrow-down")[0], isEmptyLadiPage(a) || a.click();
        else {
            var n = i.parentElement.querySelector("#" + i.id + " > .ladi-collection.readmore");
            if (!isEmptyLadiPage(n)) {
                var o = i.querySelector(".ladi-collection .ladi-collection-page.last");
                if (!isEmptyLadiPage(o)) return;
                a = i.querySelector(".ladi-collection .ladi-collection-button-next"), isEmptyLadiPage(a) || 0 == getComputedStyle(a).opacity || a.click(), t && i.classList.contains("dataset") && LadiPageScript.runTimeout(function() {
                    e.readmore(t)
                }, 1)
            }
        }
    }
}, LadiPageLibraryV2.prototype.collapse = function(t) {
    var e = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(e) && !e.classList.contains("ladi-section")) {
        var i = e.getElementsByClassName("ladi-popup")[0];
        if (isEmptyLadiPage(i)) {
            var a = isNullLadiPage(t),
                n = document.querySelector(["#" + this.id + " > .ladi-headline", "#" + this.id + " > .ladi-paragraph", "#" + this.id + " > .ladi-list-paragraph"].join(", ")),
                o = isEmptyLadiPage(n),
                r = 0,
                d = 0,
                l = null,
                s = this,
                c = function(t) {
                    var i = LadiPageScript.findAncestor(e.parentElement, "ladi-element");
                    isEmptyLadiPage(i) && (i = LadiPageScript.findAncestor(e.parentElement, "ladi-section")), o || (t = !1), LadiPageScript.updateHeightElement(!0, e, i, r, d, t)
                };
            if ("none" == getComputedStyle(e).display) {
                if (a || t)
                    if (a && o) {
                        if (l = parseFloatLadiPage(e.getAttribute("data-timeout-id")) || null, !isEmptyLadiPage(l)) return;
                        e.classList.remove("height-0"), e.classList.remove("overflow-hidden"), e.classList.remove("transition-collapse"), s.show(), d = parseFloatLadiPage(getComputedStyle(e).height) || 0, e.classList.add("overflow-hidden"), e.classList.add("height-0"), l = LadiPageScript.runTimeout(function() {
                            e.classList.add("transition-collapse"), e.classList.remove("height-0"), l = LadiPageScript.runTimeout(function() {
                                e.classList.remove("overflow-hidden"), e.classList.remove("transition-collapse"), e.removeAttribute("data-timeout-id")
                            }, 1e3 * parseFloatLadiPage(getComputedStyle(e).transitionDuration)), e.setAttribute("data-timeout-id", l), c(!0)
                        }, 100), e.setAttribute("data-timeout-id", l)
                    } else s.show(), d = parseFloatLadiPage(getComputedStyle(e).height) || 0, c()
            } else if (a || !t)
                if (a && o) {
                    if (l = parseFloatLadiPage(e.getAttribute("data-timeout-id")) || null, !isEmptyLadiPage(l)) return;
                    e.classList.remove("height-0"), e.classList.remove("overflow-hidden"), e.classList.remove("transition-collapse"), r = parseFloatLadiPage(getComputedStyle(e).height) || 0, e.classList.add("overflow-hidden"), l = LadiPageScript.runTimeout(function() {
                        e.classList.add("transition-collapse"), e.classList.add("height-0"), l = LadiPageScript.runTimeout(function() {
                            e.classList.remove("overflow-hidden"), e.classList.remove("transition-collapse"), e.classList.remove("height-0"), e.removeAttribute("data-timeout-id"), s.hide()
                        }, 1e3 * parseFloatLadiPage(getComputedStyle(e).transitionDuration)), e.setAttribute("data-timeout-id", l), c(!0)
                    }, 100), e.setAttribute("data-timeout-id", l)
                } else r = parseFloatLadiPage(getComputedStyle(e).height) || 0, s.hide(), c()
        }
    }
}, LadiPageLibraryV2.prototype.hide = function(t) {
    var e = this,
        i = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(i)) {
        var a = !1;
        if (0 == i.getElementsByClassName("ladi-popup").length) {
            if (LadiPageScript.runtime.has_popupx && i.classList.contains("ladi-section") && "none" != getComputedStyle(i).display && (a = !0), i.style.setProperty("display", "none", "important"), LadiPageScript.reloadLazyload(!1), !t && a) {
                LadiPageScript.runtime.tmp.runActionPopupX({
                    id: this.id,
                    dimension: {
                        display: "none"
                    },
                    action: {
                        type: "set_iframe_dimension"
                    }
                })
            }
        } else LadiPageScript.runRemovePopup(this.id, !0, function() {
            for (var t = document.querySelectorAll("#" + LadiPageScript.runtime.builder_section_popup_id + " .ladi-container > .ladi-element"), i = 0; i < t.length; i++) t[i].id != e.id && t[i].hasAttribute("data-popup-backdrop") && "none" != getComputedStyle(t[i]).display && LadiPageScript.runRemovePopup(t[i].id, !0)
        });
        e.hideDropbox()
    }
}, LadiPageLibraryV2.prototype.show = function(t, e) {
    var i = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(i)) {
        e = isObjectLadiPage(e) ? e : {};
        var a = 0;
        if (i.classList.contains("ladi-section")) {
            var n = i.getAttribute("data-tab-id");
            if (!isEmptyLadiPage(n)) {
                var o = document.querySelectorAll('.ladi-section[data-tab-id="' + n + '"]');
                for (a = 0; a < o.length; a++) o[a].id == i.id ? o[a].classList.add("selected") : (o[a].classList.remove("selected"), window.ladi(o[a].id).hide())
            }
        }
        var r = this,
            d = function() {
                if (isObjectLadiPage(LadiPageScript.runtime.eventData)) {
                    var t = LadiPageScript.runtime.eventData[r.id];
                    isObjectLadiPage(t) && LadiPageScript.startAutoScroll(r.id, t.type, t[LadiPageScript.const.DESKTOP + ".option.auto_scroll"], t[LadiPageScript.const.MOBILE + ".option.auto_scroll"]);
                    for (var e = i.getElementsByClassName("ladi-element"), a = 0; a < e.length; a++) {
                        var n = LadiPageScript.runtime.eventData[e[a].id];
                        isEmptyLadiPage(n) || LadiPageScript.startAutoScroll(e[a].id, n.type, n[LadiPageScript.const.DESKTOP + ".option.auto_scroll"], n[LadiPageScript.const.MOBILE + ".option.auto_scroll"])
                    }
                }
            },
            l = function() {
                for (var t = i.getElementsByClassName("ladi-element"), e = -1; e < t.length; e++) {
                    var a = -1 == e ? i : t[e];
                    "true" == a.getAttribute("data-sticky") && (a.removeAttribute("data-top"), a.removeAttribute("data-left"), a.removeAttribute("data-sticky"), a.style.removeProperty("top"), a.style.removeProperty("left"), a.style.removeProperty("width"), a.style.removeProperty("position"), a.style.removeProperty("z-index"))
                }
                LadiPageScript.runEventScroll()
            };
        if (t) {
            if (i.getElementsByClassName("ladi-popup").length > 0) {
                LadiPageScript.runtime.is_funnelx && LadiPageScript.runtime.tmp.runActionPopupX({
                    id: i.id,
                    ladipage_id: LadiPageScript.runtime.ladipage_id,
                    action: {
                        type: "set_current_funnelx_id"
                    }
                });
                var s = !0;
                if (isObjectLadiPage(e) && !isNullLadiPage(e.checkHidePopupOther) && (s = e.checkHidePopupOther), s) {
                    var c = document.querySelectorAll("#" + LadiPageScript.runtime.builder_section_popup_id + " .ladi-container > .ladi-element");
                    for (a = 0; a < c.length; a++) c[a].id != r.id && c[a].hasAttribute("data-popup-backdrop") && "none" != getComputedStyle(c[a]).display && LadiPageScript.runRemovePopup(c[a].id, !0)
                }
                LadiPageScript.runShowPopup(!1, this.id, null, null, !0, {
                    event: e.event
                }), LadiPageScript.removeLazyloadPopup(this.id), d(), l(), LadiPageScript.runResizeSectionBackground()
            } else i.style.setProperty("display", "block", "important"), d(), l(), LadiPageScript.runResizeSectionBackground(), LadiPageScript.reloadLazyload(!1)
        } else {
            if (LadiPageScript.runtime.has_popupx && LadiPageScript.runtime.tmp.showPopupX(i.id, !0, e)) return;
            r.show(!0)
        }
    }
}, LadiPageLibraryV2.prototype.showDropbox = function(t, e, i) {
    var a = this.doc || document.getElementById(this.id);
    if (!(isEmptyLadiPage(a) || "true" != a.getAttribute("data-dropbox") || i && a.getAttribute("data-from-doc-id") == t.id && "true" != a.getAttribute("data-dropbox-backdrop") && "block" == getComputedStyle(a).display)) {
        a.classList.add("opacity-0"), this.show(), a.style.removeProperty("display"), a.style.removeProperty("top"), a.style.removeProperty("left"), a.style.removeProperty("bottom"), a.style.removeProperty("right"), isObjectLadiPage(e) || (e = {}), e.padding = parseFloatLadiPage(e.padding) || 0, e.animation_duration = parseFloatLadiPage(e.animation_duration) || 0, t.insertBefore(a, t.firstChild), a.setAttribute("data-from-doc-id", t.id), a.setAttribute("data-style", a.getAttribute("style") || ""), isEmptyLadiPage(a.getAttribute("data-style")) && a.removeAttribute("data-style"), t.setAttribute("data-style", t.getAttribute("style") || ""), isEmptyLadiPage(t.getAttribute("data-style")) && t.removeAttribute("data-style");
        var n = a.getElementsByClassName("ladi-popup")[0];
        isEmptyLadiPage(n) || (n.setAttribute("data-style", n.getAttribute("style") || ""), isEmptyLadiPage(n.getAttribute("data-style")) && n.removeAttribute("data-style"));
        var o = LadiPageScript.getElementBoundingClientRect(t),
            r = LadiPageScript.getElementBoundingClientRect(a),
            d = "";
        e.position != LadiPageScript.const.TOOLTIP_POSITION.top_left && e.position != LadiPageScript.const.TOOLTIP_POSITION.top_middle && e.position != LadiPageScript.const.TOOLTIP_POSITION.top_right || (a.style.setProperty("top", "auto"), a.style.setProperty("bottom", o.height + e.padding + "px"), e.padding > 0 && (d += 'content: ""; position: absolute; width: 100%; height: ' + e.padding + "px; bottom: " + -e.padding + "px; left: 0;")), e.position == LadiPageScript.const.TOOLTIP_POSITION.top_middle && a.style.setProperty("left", (o.width - r.width) / 2 + "px"), e.position == LadiPageScript.const.TOOLTIP_POSITION.top_right && (a.style.setProperty("left", "auto"), a.style.setProperty("right", "0")), e.position != LadiPageScript.const.TOOLTIP_POSITION.bottom_left && e.position != LadiPageScript.const.TOOLTIP_POSITION.bottom_middle && e.position != LadiPageScript.const.TOOLTIP_POSITION.bottom_right || (a.style.setProperty("bottom", "auto"), a.style.setProperty("top", o.height + e.padding + "px"), e.padding > 0 && (d += 'content: ""; position: absolute; width: 100%; height: ' + e.padding + "px; top: " + -e.padding + "px; left: 0;")), e.position == LadiPageScript.const.TOOLTIP_POSITION.bottom_middle && a.style.setProperty("left", (o.width - r.width) / 2 + "px"), e.position == LadiPageScript.const.TOOLTIP_POSITION.bottom_right && (a.style.setProperty("left", "auto"), a.style.setProperty("right", "0")), e.position != LadiPageScript.const.TOOLTIP_POSITION.left_top && e.position != LadiPageScript.const.TOOLTIP_POSITION.left_middle && e.position != LadiPageScript.const.TOOLTIP_POSITION.left_bottom || (a.style.setProperty("left", "auto"), a.style.setProperty("right", o.width + e.padding + "px"), e.padding > 0 && (d += 'content: ""; position: absolute; width: ' + e.padding + "px; height: 100%; top: 0; right: " + -e.padding + "px;")), e.position == LadiPageScript.const.TOOLTIP_POSITION.left_top && a.style.setProperty("bottom", "auto"), e.position == LadiPageScript.const.TOOLTIP_POSITION.left_bottom && a.style.setProperty("top", "auto"), e.position != LadiPageScript.const.TOOLTIP_POSITION.right_top && e.position != LadiPageScript.const.TOOLTIP_POSITION.right_middle && e.position != LadiPageScript.const.TOOLTIP_POSITION.right_bottom || (a.style.setProperty("right", "auto"), a.style.setProperty("left", o.width + e.padding + "px"), e.padding > 0 && (d += 'content: ""; position: absolute; width: ' + e.padding + "px; height: 100%; top: 0; left: " + -e.padding + "px;")), e.position == LadiPageScript.const.TOOLTIP_POSITION.right_top && a.style.setProperty("bottom", "auto"), e.position == LadiPageScript.const.TOOLTIP_POSITION.right_bottom && a.style.setProperty("top", "auto"), a.style.setProperty("z-index", "90000090"), "fixed" == getComputedStyle(t).position && t.style.setProperty("z-index", "90000090");
        var l = "dropbox-" + a.id;
        if (i && !isEmptyLadiPage(d)) d = "#" + a.id + ":before {" + d + "}", LadiPageScript.createStyleElement(l, d);
        else {
            var s = document.getElementById(l);
            isEmptyLadiPage(s) || s.parentElement.removeChild(s)
        }
        if (i) a.removeAttribute("data-dropbox-backdrop");
        else a.setAttribute("data-dropbox-backdrop", !0), document.getElementById(LadiPageScript.runtime.backdrop_dropbox_id).style.setProperty("display", "block");
        isEmptyLadiPage(e.animation_name) || isEmptyLadiPage(n) || (n.style.setProperty("animation-name", e.animation_name), n.style.setProperty("-webkit-animation-name", e.animation_name), n.style.setProperty("animation-duration", e.animation_duration + "s"), n.style.setProperty("-webkit-animation-duration", e.animation_duration + "s")), a.classList.remove("opacity-0")
    }
}, LadiPageLibraryV2.prototype.hideDropbox = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t) && "true" == t.getAttribute("data-dropbox")) {
        t.setAttribute("style", t.getAttribute("data-style") || ""), t.removeAttribute("data-style");
        var e = document.getElementById(t.getAttribute("data-from-doc-id"));
        isEmptyLadiPage(e) || (e.setAttribute("style", e.getAttribute("data-style") || ""), e.removeAttribute("data-style"));
        var i = t.getElementsByClassName("ladi-popup")[0];
        isEmptyLadiPage(i) || i.setAttribute("style", i.getAttribute("data-style") || "");
        var a = "dropbox-" + t.id,
            n = document.getElementById(a);
        isEmptyLadiPage(n) || n.parentElement.removeChild(n);
        for (var o = t.querySelectorAll('[data-dropbox-backdrop="true"]'), r = 0; r < o.length; r++) window.ladi(o[r].id).hide();
        if (t.removeAttribute("data-dropbox-backdrop"), 0 == (o = document.querySelectorAll('[data-dropbox-backdrop="true"]')).length) document.getElementById(LadiPageScript.runtime.backdrop_dropbox_id).style.removeProperty("display");
        document.querySelector("#" + LadiPageScript.runtime.builder_section_popup_id + " > .ladi-container").appendChild(t)
    }
}, LadiPageLibraryV2.prototype.set_goal = function(t) {
    var e = this.id;
    isEmptyLadiPage(e) || isEmptyLadiPage(t) || LadiPageScript.runtime.tmp.runActionPopupX({
        value_goal: t,
        element_id: e,
        ladipage_id: LadiPageScript.runtime.ladipage_id,
        action: {
            type: "set_goal"
        }
    })
}, LadiPageLibraryV2.prototype.set_finish = function() {
    var t = this.id;
    isEmptyLadiPage(t) || LadiPageScript.runtime.tmp.runActionPopupX({
        element_id: t,
        ladipage_id: LadiPageScript.runtime.ladipage_id,
        action: {
            type: "set_finish"
        }
    })
}, LadiPageLibraryV2.prototype.next_funnelx = function(t) {
    var e = this.id;
    isEmptyLadiPage(e) || isEmptyLadiPage(t) || LadiPageScript.runtime.tmp.runActionPopupX({
        funnelx_id: e,
        step_id: t,
        action: {
            type: "next_funnelx"
        }
    })
}, LadiPageLibraryV2.prototype.toggle = function(t) {
    var e = this.doc || document.getElementById(this.id);
    isEmptyLadiPage(e) || ("none" == getComputedStyle(e).display ? this.show(t) : this.hide(t))
}, LadiPageLibraryV2.prototype.set_style = function(t, e, i) {
    var a = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(a)) {
        var n = e.action_type,
            o = "set-style-" + t.id + "-" + a.id + "-" + n,
            r = "set-style-" + t.id + "-" + a.id + "-" + n + "-transition",
            d = document.getElementById(i ? r : o);
        isEmptyLadiPage(d) || d.parentElement.removeChild(d), a.classList.remove(o);
        var l = {};
        isEmptyLadiPage(e.color) || (l.color = e.color), isEmptyLadiPage(e.background_color) || (l.background = "none", l["background-color"] = e.background_color), isEmptyLadiPage(e.border_color) || (l["border-color"] = e.border_color), isEmptyLadiPage(e.opacity) || (l.opacity = e.opacity / 100), isEmptyLadiPage(e.transform_scale) || (l.transform = "scale(" + e.transform_scale / 100 + ")"), e.ontop && (l["z-index"] = "9000000090 !important"), isObjectLadiPage(e.custom_css) && Object.keys(e.custom_css).forEach(function(t) {
            l[t] = e.custom_css[t]
        });
        var s = [],
            c = "",
            u = "",
            p = "",
            m = "",
            _ = "",
            g = "",
            y = !1;
        Object.keys(l).forEach(function(t) {
            "z-index" != t.toLowerCase() ? "background" == t.toLowerCase() || t.toLowerCase().startsWith("background-") ? p += t + ": " + l[t] + ";" : "color" == t.toLowerCase() || "font" == t.toLowerCase() || t.toLowerCase().startsWith("font-") || t.toLowerCase().startsWith("text-") || t.toLowerCase().startsWith("line-") ? m += t + ": " + l[t] + ";" : u += t + ": " + l[t] + ";" : g += t + ": " + l[t] + ";"
        });
        var h = function(t) {
            for (var e = !1, n = 0; n < s.length; n++) {
                var r = s[n];
                if (isEmptyLadiPage(r)) {
                    i && (y || (_ += "#" + a.id + " {transition: all 150ms linear 0s;}")), c += "#" + a.id + "." + o + " {" + t + "}", e = !0;
                    break
                }
                if (document.querySelectorAll("#" + a.id + " > " + r).length > 0) {
                    i && (_ += "#" + a.id + " > " + r + " {transition: all 150ms linear 0s;}"), c += "#" + a.id + "." + o + " > " + r + " {" + t + "}", e = !0;
                    break
                }
            }
            return e
        };
        if (!isEmptyLadiPage(m)) {
            var f = function(t) {
                t = isEmptyLadiPage(t) ? "" : "." + t;
                var e = "";
                return e += "#" + a.id + t + ", ", e += "#" + a.id + t + " .ladi-headline, ", e += "#" + a.id + t + " .ladi-paragraph, ", e += "#" + a.id + t + " .ladi-list-paragraph"
            };
            document.querySelectorAll(f()).length > 0 && (i && (y = !0, _ += f() + " {transition: all 150ms linear 0s;}"), c += f(o) + " {" + m + "}")
        }
        isEmptyLadiPage(p) || (s = [".ladi-section-background", ".ladi-popup .ladi-popup-background", ".ladi-button .ladi-button-background", ".ladi-box", ".ladi-video .ladi-video-background", ".ladi-form .ladi-form-item-background", ".ladi-frame-bg .ladi-frame-background", ".ladi-survey .ladi-survey-option-background", ".ladi-combobox .ladi-combobox-item-background", ".ladi-countdown .ladi-countdown-background", ".ladi-notify"], h(p) || (u += p)), isEmptyLadiPage(u) || (s = [".ladi-group", ".ladi-accordion", ".ladi-popup", ".ladi-image", ".ladi-gallery", ".ladi-button", ".ladi-button-group", ".ladi-headline", ".ladi-paragraph", ".ladi-list-paragraph", ".ladi-line", ".ladi-box", ".ladi-collection", ".ladi-tabs", ".ladi-shape", ".ladi-video", ".ladi-form", ".ladi-carousel", ".ladi-html-code", ".ladi-frame", ".ladi-table", ".ladi-survey", ".ladi-combobox", ".ladi-countdown", ".ladi-notify", ".ladi-spin-lucky"], h(u) || (g += u)), isEmptyLadiPage(g) || (s = [""], h(g)), i ? LadiPageScript.createStyleElement(r, _) : LadiPageScript.createStyleElement(o, c), i || a.classList.add(o)
    }
}, LadiPageLibraryV2.prototype.remove_style = function(t, e) {
    var i = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(i)) {
        var a = e.action_type,
            n = "set-style-" + t.id + "-" + i.id + "-" + a;
        i.classList.remove(n);
        var o = document.getElementById(n);
        isEmptyLadiPage(o) || o.parentElement.removeChild(o)
    }
}, LadiPageLibraryV2.prototype.disable_submit = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t)) {
        var e = t.querySelector("form.ladi-form");
        isEmptyLadiPage(e) || t.setAttribute("data-submit", !1)
    }
}, LadiPageLibraryV2.prototype.enable_submit = function() {
    var t = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(t)) {
        var e = t.querySelector("form.ladi-form");
        isEmptyLadiPage(e) || t.removeAttribute("data-submit")
    }
}, LadiPageLibraryV2.prototype.set_submit = function(t) {
    var e = this.doc || document.getElementById(this.id);
    if (!isEmptyLadiPage(e)) {
        var i = e.querySelector("form.ladi-form");
        isEmptyLadiPage(i) || LadiPageFormData.push(function() {
            i.addEventListener("submit", t)
        })
    }
}, LadiPageLibraryV2.prototype.set_data = function(t) {
    LadiPageScript.setDataReplaceStr(this.id, t), LadiPageScript.setDataReplaceElement(!1, !1, null, null, null, [this.id])
}, LadiPageLibraryV2.prototype.element = function() {
    return this.doc || document.getElementById(this.id)
}, ["start", "add_turn"].forEach(function(t) {
    LadiPageLibraryV2.prototype[t] = function() {
        var e = LadiPageScript.runtime.eventData[this.id];
        if (isObjectLadiPage(e)) {
            var i = LadiPageApp[e.type + LadiPageScript.const.APP_RUNTIME_PREFIX];
            if (!isEmptyLadiPage(i)) {
                var a = i(e, !0);
                isFunctionLadiPage(a[t]) && a[t](this.id)
            }
        }
    }
});
var ladi = ladi || function(t, e) {
        if (!isEmptyLadiPage(t)) {
            var i = new LadiPageLibraryV2;
            return i.id = t, i.doc = e, i
        }
    },
    ladi_fbq = function() {
        var t = arguments[0],
            e = arguments[1],
            i = arguments[2],
            a = arguments[3];
        if (isObjectLadiPage(window.ladi_conversion_api) && isObjectLadiPage(window.ladi_conversion_api.facebook) && isArrayLadiPage(window.ladi_conversion_api.facebook.pixels)) {
            isObjectLadiPage(a) || (a = {});
            a.eventID = "ladi." + Date.now() + "." + (Math.floor(9e10 * Math.random()) + 1e10)
        }
        LadiPageQueueCommand.push(function() {
            return isFunctionLadiPage(window.fbq) && isObjectLadiPage(window.LadiPageScript)
        }, function() {
            fbqCustom(t, e, i, a), LadiPageScript.runConversionApi("facebook", "events", [{
                key: t,
                name: e,
                custom_data: i,
                data: a
            }])
        })
    };
isArrayLadiPage(window.ladi_fbq_data) && (window.ladi_fbq_data.forEach(function(t) {
    ladi_fbq(t[0], t[1], t[2], t[3])
}), delete window.ladi_fbq_data);
var ladi_ttq = function() {
    var t = arguments[0],
        e = arguments[1],
        i = arguments[2],
        a = arguments[3],
        n = arguments[4];
    "ViewContent" == e ? LadiPageCommand.push({
        name: e,
        clickButton: !0,
        scrollPercent: 50
    }) : LadiPageQueueCommand.push(function() {
        return !isNullLadiPage(window.ttq) && isObjectLadiPage(window.LadiPageScript)
    }, function() {
        i = isObjectLadiPage(i) ? i : {}, a = isObjectLadiPage(a) ? a : {}, n = isObjectLadiPage(n) ? n : {}, Object.keys(n).length > 0 && window.ttq.identify(n), "PageView" != e && window.ttq[t](e, i, a), LadiPageScript.runConversionApi("tiktok", "events", [{
            name: e,
            custom_data: i,
            data: a
        }], {
            ttq_identify_data: n
        })
    })
};
isArrayLadiPage(window.ladi_ttq_data) && (window.ladi_ttq_data.forEach(function(t) {
    ladi_ttq(t[0], t[1], t[2], t[3], t[4])
}), delete window.ladi_ttq_data);
var ladi_api_fbq = function() {
        var t = arguments[0],
            e = isObjectLadiPage(arguments[1]) ? arguments[1] : {};
        LadiPageQueueCommand.push(function() {
            return isFunctionLadiPage(window.fbq) && isObjectLadiPage(window.LadiPageScript)
        }, function() {
            var i = LadiPageScript.runtime.currency;
            LadiPageScript.runtime.currency = e.currency;
            var a = {
                is_custom: !0,
                only_facebook: !0
            };
            a.conversion_name = t, a.purchase_value = e.value, a.event_category = "LadiPageCustom";
            var n = null;
            ["phone", "email"].forEach(function(t) {
                var e = LadiPageScript.getDataReplaceStr(t);
                isEmptyLadiPage(e) || (isObjectLadiPage(n) || (n = {}), n[t] = e)
            }), LadiPageScript.runEventTracking(null, a, n), LadiPageScript.runtime.currency = i
        })
    },
    ladi_api_ttq = function() {
        var t = arguments[0],
            e = isObjectLadiPage(arguments[1]) ? arguments[1] : {};
        LadiPageQueueCommand.push(function() {
            return !isNullLadiPage(window.ttq) && isObjectLadiPage(window.LadiPageScript)
        }, function() {
            var i = LadiPageScript.runtime.currency;
            LadiPageScript.runtime.currency = e.currency;
            var a = {
                is_custom: !0,
                only_tiktok: !0
            };
            a.conversion_name = t, a.purchase_value = e.value, a.event_category = "LadiPageCustom";
            var n = null;
            ["phone", "email"].forEach(function(t) {
                var e = LadiPageScript.getDataReplaceStr(t);
                isEmptyLadiPage(e) || (isObjectLadiPage(n) || (n = {}), n[t] = e)
            }), LadiPageScript.runEventTracking(null, a, n), LadiPageScript.runtime.currency = i
        })
    };
LadiPageScript.const.DATA_TYPE = {
    default: "default",
    dataset: "dataset",
    list_category: "list_category",
    list_tag: "list_tag",
    detail_category: "detail_category",
    detail_tag: "detail_tag",
    list_post_by_keyword: "list_post_by_keyword",
    list_post_by_category: "list_post_by_category",
    list_post_by_tag: "list_post_by_tag",
    detail_post: "detail_post"
}, LadiPageScript.const.DATASET_TYPE = {
    notify: "NOTIFY",
    spin_lucky: "SPIN_LUCKY",
    review: "REVIEW",
    collection: "COLLECTION",
    blog: "BLOG",
    voucher: "VOUCHER",
    website: "WEBSITE"
}, LadiPageScript.const.DATASET_FIELD_TYPE = {
    text: "TEXT",
    number: "NUMBER",
    boolean: "BOOLEAN",
    image: "IMAGE",
    link: "LINK",
    html: "HTML",
    date_time: "DATE_TIME"
}, LadiPageScript.const.DATASET_ID_LENGTH = 24, LadiPageScript.const.DATASET_CONTENT_SOURCE_URL = "ladisources/global/dataset/", LadiPageScript.const.DATASET_CONTENT_SOURCE_ENDSWITH = ".html", LadiPageScriptV2.prototype.convertDataset = function(t, e) {
    var i;
    if (isArrayLadiPage(e)) {
        var a = {};
        (e = e.sort(function(t, e) {
            var i = new Date(t.updated_at).getTime(),
                a = new Date(e.updated_at).getTime();
            return (i = isNaN(i) ? t.updated_at : i) > (a = isNaN(a) ? e.updated_at : a) ? 1 : -1
        })).forEach(function(t) {
            a[t.id] = function(t) {
                return Object.keys(t).forEach(function(e) {
                    try {
                        if ("created_at" == e || "updated_at" == e || 24 != t[e].length || !t[e].endsWith(".000Z") || isNaN(new Date(t[e]).getTime())) return;
                        var i = new Date(t[e].substring(0, t[e].length - ".000Z".length));
                        isNaN(i.getTime()) || (t[e] = i.toISOString())
                    } catch (t) {}
                }), t
            }(t)
        }), e = Object.values(a)
    }
    return t == this.const.DATASET_TYPE.notify ? (i = [], e.forEach(function(t) {
        i.push({
            gsx$title: {
                $t: t.title
            },
            gsx$content: {
                $t: t.content
            },
            gsx$time: {
                $t: t.time
            },
            gsx$image: {
                $t: t.image
            }
        })
    }), i) : t == this.const.DATASET_TYPE.spin_lucky ? function(t) {
        var e = [];
        return t.forEach(function(t) {
            var i = [encodeURIComponent(t.coupon_code), encodeURIComponent(t.coupon_text), encodeURIComponent(t.percent + "%")].join("|");
            i = Base64.encode(i), e.push(i)
        }), e
    }(e) : t == this.const.DATASET_TYPE.review ? function(t) {
        return t
    }(e) : t == this.const.DATASET_TYPE.blog ? function(t) {
        return t
    }(e) : t == this.const.DATASET_TYPE.website ? function(t) {
        return t
    }(e) : t == this.const.DATASET_TYPE.collection ? function(t) {
        return t
    }(e) : t == this.const.DATASET_TYPE.voucher ? function(t) {
        return t
    }(e) : void 0
}, LadiPageScriptV2.prototype.loadDataset = function(t, e, i, a, n, o, r, d) {
    var l = this,
        s = function(t, e, i) {
            return isArrayLadiPage(t) && t.length > 0 && !isEmptyLadiPage(e) && !isEmptyLadiPage(i) && t.sort(function(t, a) {
                var n = t[e],
                    o = a[e];
                return parseFloatLadiPage(n) == n && parseFloatLadiPage(o) == o && (n = parseFloatLadiPage(n), o = parseFloatLadiPage(o)), l.const.SORT_BY_TYPE.asc == i ? n > o ? 1 : -1 : n < o ? 1 : -1
            }), t
        };
    if (l.runtime.tmp.dataset_check_load) l.runtime.tmp.timeout_dataset_data[e] = l.runTimeout(function() {
        l.loadDataset(t, e, i, a, n, !1, r, d)
    }, 100);
    else {
        var c = [],
            u = [];
        if (isEmptyLadiPage(t)) {
            Object.keys(l.runtime.eventData).forEach(function(t) {
                var e = l.runtime.eventData[t];
                isEmptyLadiPage(e["option.data_setting.value"]) || (c.push({
                    element_id: t,
                    id: e["option.data_setting.value"],
                    type: e["option.data_setting.type_dataset"],
                    sort_name: e["option.data_setting.sort_name"],
                    sort_by: e["option.data_setting.sort_by"]
                }), u.push(e["option.data_setting.value"]))
            }), u = u.unique(), isObjectLadiPage(l.runtime.tmp.dataset_data_website) && Object.keys(l.runtime.tmp.dataset_data_website).forEach(function(t) {
                l.runtime.tmp.dataset_data[t] = l.runtime.tmp.dataset_data_website[t], delete l.runtime.tmp.dataset_data_website[t], u = u.except([t])
            })
        } else {
            if (isEmptyLadiPage(e) || e.length != l.const.DATASET_ID_LENGTH) return;
            if (!isNullLadiPage(l.runtime.tmp.dataset_data[e])) return !0 === l.runtime.tmp.dataset_data[e] ? void(l.runtime.tmp.timeout_dataset_data[e] = l.runTimeout(function() {
                l.loadDataset(t, e, i, a, n, !1, r, d)
            }, 100)) : (!o && isFunctionLadiPage(d) && d(s(l.runtime.tmp.dataset_data[e], a, n)), s(l.runtime.tmp.dataset_data[e], a, n));
            l.runtime.tmp.dataset_data[e] = !0, c = [{
                element_id: t,
                id: e,
                type: i,
                sort_name: a,
                sort_by: n
            }], u = [e]
        }
        if (0 != u.length) {
            var p = r ? l.runtime.store_id : window.$rootScope.getStoreId(),
                m = l.const.API_DATASET_DATA.format(p, u.join(","));
            l.runtime.tmp.dataset_check_load = !0, l.sendRequest("GET", m, null, !0, null, function(i, a, n) {
                if (n.readyState == XMLHttpRequest.DONE) {
                    try {
                        var o = JSON.parse(i);
                        Object.keys(o).forEach(function(t) {
                            for (var e = 0; e < c.length; e++) c[e].id == t && (c[e].dataset = l.convertDataset(c[e].type, o[t]))
                        }), c.forEach(function(i) {
                            if (isNullLadiPage(i.dataset)) return l.runtime.tmp.dataset_data[i.id] = !1, void(isEmptyLadiPage(l.runtime.tmp.timeout_dataset_data[e]) || (l.removeTimeout(l.runtime.tmp.timeout_dataset_data[e]), delete l.runtime.tmp.timeout_dataset_data[e]));
                            if (l.runtime.tmp.dataset_data[i.id] = i.dataset, isEmptyLadiPage(t)) {
                                var a = l.runtime.eventData[i.element_id],
                                    n = LadiPageApp[a.type + l.const.APP_RUNTIME_PREFIX];
                                isEmptyLadiPage(n) ? "table" == a.type && function(t, e) {
                                    var i = document.getElementById(t);
                                    if (!isEmptyLadiPage(i)) {
                                        for (var a = i.getElementsByTagName("tbody")[0], n = [], o = {}, r = i.querySelectorAll("thead td"), d = 0; d < r.length; d++) {
                                            var s = {
                                                name: r[d].getAttribute("data-name"),
                                                type: r[d].getAttribute("data-type"),
                                                is_show: !0
                                            };
                                            n.push(s), o[s.name] = r[d].getAttribute("data-width")
                                        }
                                        var c = l.generateTableTbodyDataset(i, n, o, e);
                                        a.outerHTML != c && (a.outerHTML = c);
                                        for (var u = function(t) {
                                                t.stopPropagation(), lightbox_image(t.target.getAttribute("data-src"))
                                            }, p = i.querySelectorAll("table td img"), m = 0; m < p.length; m++) p[m].addEventListener("click", u)
                                    }
                                }(i.element_id, s(i.dataset, i.sort_name, i.sort_by)) : ((a = l.copy(a)).dataset_value = s(i.dataset, i.sort_name, i.sort_by), n(a, r).run(i.element_id, l.runtime.isDesktop))
                            } else isFunctionLadiPage(d) && d(s(i.dataset, i.sort_name, i.sort_by))
                        })
                    } catch (t) {
                        l.runtime.tmp.dataset_data[e] = !1, isEmptyLadiPage(l.runtime.tmp.timeout_dataset_data[e]) || (l.removeTimeout(l.runtime.tmp.timeout_dataset_data[e]), delete l.runtime.tmp.timeout_dataset_data[e])
                    }
                    l.runtime.tmp.dataset_check_load = !1
                }
            })
        }
    }
}, LadiPageScriptV2.prototype.generateTableTheadDataset = function(t, e) {
    var i = "<thead><tr>",
        a = "";
    return isArrayLadiPage(t) && (t = t.filter(function(t) {
        return !t.is_delete && t.is_show
    })).forEach(function(t) {
        var n = parseFloatLadiPage(e[t.name]) || 0;
        n = n > 0 ? n : "", i += '<td data-name="' + t.name + '" data-type="' + t.type + '"' + (isEmptyLadiPage(n) ? "" : ' data-width="' + n + '"') + ">" + t.label + "</td>", a += '<col data-name="' + t.name + '" />'
    }), i += "</tr></thead>", i += "<colgroup>" + a + "</colgroup>"
}, LadiPageScriptV2.prototype.generateTableTbodyDataset = function(t, e, i, a) {
    var n = "<tbody>",
        o = this;
    return isArrayLadiPage(e) && (e = e.filter(function(t) {
        return !t.is_delete && t.is_show
    }), isArrayLadiPage(a) && a.forEach(function(t) {
        n += "<tr>", e.forEach(function(e) {
            var a = t[e.name];
            if (isEmptyLadiPage(a)) a = "";
            else {
                if (e.type == o.const.DATASET_FIELD_TYPE.link && (a = '<a href="' + a + '" target="_blank">' + a + "</a>"), e.type == o.const.DATASET_FIELD_TYPE.image) {
                    var r = parseFloatLadiPage(i[e.name]) || 0;
                    r = r > 0 ? r : 100, a = '<img data-src="' + a + '" src="' + o.getOptimizeImage(a, r, r, !0, !0, !0, !0) + '" />'
                }
                if (e.type == o.const.DATASET_FIELD_TYPE.date_time) a = LadiPageScript.convertDataDate({
                    date: a
                }, ["date"]).date;
                e.type == o.const.DATASET_FIELD_TYPE.boolean && (a = a ? o.const.LANG.OPTION_TRUE : o.const.LANG.OPTION_FALSE)
            }
            n += "<td>" + a + "</td>"
        }), n += "</tr>"
    })), n += "</tbody>"
};
// var LadiPageAppV2 = LadiPageAppV2 || function() {};
// LadiPageAppV2.prototype.notify_runtime = function(t, e) {
//     var i = function() {},
//         a = "top_left",
//         n = "top_center",
//         o = "top_right",
//         r = "bottom_left",
//         d = "bottom_center",
//         l = "bottom_right";
//     return i.prototype.run = function(e, i) {
//         isObjectLadiPage(LadiPageScript.runtime.tmp.timeout_notify) || (LadiPageScript.runtime.tmp.timeout_notify = {});
//         var s = t["option.sheet_id"],
//             c = t.dataset_value,
//             u = document.getElementById(e);
//         if (u.classList.add("ladi-hidden"), !isEmptyLadiPage(s) || !isEmptyLadiPage(c)) {
//             var p = i ? LadiPageScript.const.DESKTOP : LadiPageScript.const.MOBILE,
//                 m = t[p + ".option.position"],
//                 _ = 1e3 * (parseFloatLadiPage(t["option.time_show"]) || 5),
//                 g = 1e3 * (parseFloatLadiPage(t["option.time_delay"]) || 10);
//             g = g < 501 ? 501 : g;
//             var y = "https://w.ladicdn.com/source/notify.svg?v=1.0",
//                 h = [{
//                     key: "gsx$title",
//                     className: ".ladi-notify-title"
//                 }, {
//                     key: "gsx$content",
//                     className: ".ladi-notify-content"
//                 }, {
//                     key: "gsx$time",
//                     className: ".ladi-notify-time"
//                 }, {
//                     key: "gsx$image",
//                     className: ".ladi-notify-image img"
//                 }];
//             u.classList.remove("ladi-hidden");
//             var f = function() {
//                 u.style.setProperty("opacity", 0), m != a && m != n && m != o || u.style.setProperty("top", -u.clientHeight - 100 + "px"), m != r && m != d && m != l || u.style.setProperty("bottom", -u.clientHeight - 100 + "px")
//             };
//             f(), h.forEach(function(t) {
//                 "gsx$image" == t.key ? u.querySelectorAll(t.className)[0].src = y : u.querySelectorAll(t.className)[0].textContent = ""
//             });
//             var v = function(t) {
//                     t = t.sort(function() {
//                         return .5 - Math.random()
//                     });
//                     var i = -1,
//                         s = function() {
//                             if (i + 1 < t.length) {
//                                 var c = t[++i],
//                                     p = Object.keys(c);
//                                 u.style.removeProperty("opacity"), m != a && m != n && m != o || u.style.removeProperty("top"), m != r && m != d && m != l || u.style.removeProperty("bottom"), h.forEach(function(t) {
//                                     -1 != p.indexOf(t.key) && ("gsx$image" == t.key ? u.querySelectorAll(t.className)[0].src = isEmptyLadiPage(c[t.key].$t) ? y : c[t.key].$t : u.querySelectorAll(t.className)[0].textContent = c[t.key].$t)
//                                 });
//                                 var E = function() {
//                                     var a = h.findIndex(function(t) {
//                                         return "gsx$image" == t.key
//                                     });
//                                     if (-1 != a) {
//                                         var n = t[i + 1 >= t.length ? 0 : i + 1];
//                                         n.hasOwnProperty(h[a].key) && (u.querySelectorAll(h[a].className)[0].src = isEmptyLadiPage(n[h[a].key].$t) ? y : n[h[a].key].$t)
//                                     }
//                                     LadiPageScript.runtime.tmp.timeout_notify[e] = LadiPageScript.runTimeout(s, g - 500)
//                                 };
//                                 LadiPageScript.runtime.tmp.timeout_notify[e] = LadiPageScript.runTimeout(function() {
//                                     f(), LadiPageScript.runtime.tmp.timeout_notify[e] = LadiPageScript.runTimeout(E, 500)
//                                 }, _)
//                             } else v(t)
//                         };
//                     LadiPageScript.runtime.tmp.timeout_notify[e] = LadiPageScript.runTimeout(s, g)
//                 },
//                 E = function(t) {
//                     u.querySelector(".ladi-notify").classList.remove("ladi-hidden"), u.classList.add("ladi-notify-transition"), v(t)
//                 };
//             isEmptyLadiPage(c) || E(c), isEmptyLadiPage(s) || LadiPageScript.sendRequest("GET", "https://docs.google.com/spreadsheets/d/" + s + "/gviz/tq?tqx=out:json", null, !0, null, function(t, e, i) {
//                 if (i.readyState == XMLHttpRequest.DONE && 200 == e) {
//                     t = (t = t.substr(t.indexOf('"table":{') + '"table":'.length)).substr(0, t.indexOf("});"));
//                     var a = JSON.parse(t),
//                         n = [],
//                         o = a.cols;
//                     isObjectLadiPage(a) && 0 == a.parsedNumHeaders && isArrayLadiPage(a.rows) && a.rows.length > 0 && isObjectLadiPage(a.rows[0]) && isArrayLadiPage(a.rows[0].c) && a.rows[0].c.length > 0 && (o = [], a.rows[0].c.forEach(function(t) {
//                         o.push({
//                             label: isObjectLadiPage(t) ? t.v : ""
//                         })
//                     }), a.rows.shift()), isObjectLadiPage(a) && isArrayLadiPage(a.rows) && isArrayLadiPage(o) && a.rows.forEach(function(t) {
//                         if (isObjectLadiPage(t)) {
//                             var e = {};
//                             o.forEach(function(i, a) {
//                                 if (isArrayLadiPage(t.c)) {
//                                     var n = t.c[a];
//                                     isObjectLadiPage(i) && !isEmptyLadiPage(i.label) && isObjectLadiPage(n) && (e["gsx$" + i.label.trim().toLowerCase()] = {
//                                         $t: n.v
//                                     })
//                                 }
//                             }), n.push(e)
//                         }
//                     }), E(n)
//                 }
//             })
//         }
//     }, new i
// };
var LadiPageAppV2 = LadiPageAppV2 || function() {};
LadiPageAppV2.prototype.spinlucky_runtime = function(t, e) {
    var i = function() {},
        a = function(t) {
            return parseFloatLadiPage(window.ladi("_total_turn_" + t).get_cookie()) || 0
        };
    return i.prototype.getEventTrackingCategory = function() {
        return "LadiPageFinish"
    }, i.prototype.run = function(e, i) {
        var n = t["option.spinlucky_setting.list_value"],
            o = t.dataset_value,
            r = t["option.spinlucky_setting.result_popup_id"],
            d = t["option.spinlucky_setting.result_popup_end_of_turn_id"],
            l = t["option.spinlucky_setting.result_message"],
            s = t["option.spinlucky_setting.result_message_popup_end_of_turn"],
            c = t["option.spinlucky_setting.max_turn"],
            u = a(e);
        if (!isEmptyLadiPage(n) || !isEmptyLadiPage(o)) {
            n = n || o, LadiPageScript.setDataReplaceStr("spin_turn_left", c - u);
            var p = document.getElementById(e),
                m = p.getElementsByClassName("ladi-spin-lucky-start")[0],
                _ = p.getElementsByClassName("ladi-spin-lucky-screen")[0],
                g = "";
            n.forEach(function(t, e) {
                var i = Base64.decode(t).split("|");
                if (3 == i.length) {
                    var a = 360 / n.length * e + 180 / n.length,
                        o = "rotate(" + (a *= -1) + "deg) translateY(-50%)";
                    g += '<div class="ladi-spin-lucky-label" style="transform: ' + o + "; -webkit-transform: " + o + ';">' + decodeURIComponentLadiPage(i[1].trim()) + "</div>"
                }
            }), _.innerHTML = g;
            var y = !1;
            m.addEventListener("click", function(t) {
                if (t.stopPropagation(), !y)
                    if ((u = a(e)) >= c) d == LadiPageScript.const.GAME_RESULT_TYPE.default ? LadiPageScript.showMessage(s.format(c)) : window.ladi(d).show();
                    else {
                        y = !0;
                        var i = [],
                            o = 0,
                            p = 1;
                        n.forEach(function(t, e) {
                            var a = Base64.decode(t).split("|"),
                                n = decodeURIComponentLadiPage(a[0].trim()),
                                r = decodeURIComponentLadiPage(a[1].trim()),
                                d = parseFloatLadiPage(decodeURIComponentLadiPage(a[2].trim())) || 0;
                            i.push({
                                min: p,
                                max: p + d - 1,
                                value: n,
                                text: r,
                                percent: d,
                                index: e
                            }), p += d, o += d
                        });
                        for (var m = LadiPageScript.randomInt(1, o), g = null, h = 0; h < i.length; h++)
                            if (i[h].min <= m && i[h].max >= m) {
                                g = i[h];
                                break
                            } if (isEmptyLadiPage(g)) y = !1;
                        else {
                            var f = parseFloatLadiPage(_.getAttribute("data-rotate")) || 0,
                                v = g.index * (360 / i.length) + 360 * (4 + Math.ceil(f / 360)) + 180 / i.length,
                                E = "rotate(" + v + "deg)";
                            _.setAttribute("data-rotate", v), _.style.setProperty("transform", E), _.style.setProperty("-webkit-transform", E), "NEXT_TURN" != g.value.toUpperCase() && (u++, window.ladi("_total_turn_" + e).set_cookie(u, 1));
                            LadiPageScript.runTimeout(function() {
                                "NEXT_TURN" == g.value.toUpperCase() ? isEmptyLadiPage(g.text) || LadiPageScript.showMessage(g.text) : (LadiPageScript.setDataReplaceStr("coupon", g.value), LadiPageScript.setDataReplaceStr("coupon_code", g.value), LadiPageScript.setDataReplaceStr("coupon_text", g.text), LadiPageScript.setDataReplaceStr("spin_turn_left", c - u), LadiPageScript.setDataReplaceElement(!0, !1, null, null, ["coupon", "coupon_code", "coupon_text", "spin_turn_left"]), r == LadiPageScript.const.GAME_RESULT_TYPE.default ? isEmptyLadiPage(l) || LadiPageScript.showMessage(l) : window.ladi(r).show(), LadiPageScript.runEventTracking(e, {
                                    is_form: !1
                                })), y = !1
                            }, 1e3 * parseFloatLadiPage(getComputedStyle(_).transitionDuration) + 1e3)
                        }
                    }
            })
        }
    }, i.prototype.start = function(t) {
        var e = document.getElementById(t);
        if (!isEmptyLadiPage(e) && e.getElementsByClassName("ladi-spin-lucky").length > 0) {
            var i = e.getElementsByClassName("ladi-spin-lucky-start")[0];
            isEmptyLadiPage(i) || i.click()
        }
    }, i.prototype.add_turn = function(e) {
        var i = t["option.spinlucky_setting.max_turn"],
            n = a(e);
        n > 0 && n--, window.ladi("_total_turn_" + e).set_cookie(n, 1), LadiPageScript.setDataReplaceStr("spin_turn_left", i - n), LadiPageScript.setDataReplaceElement(!1)
    }, new i
};
var LadiPageAppV2 = LadiPageAppV2 || function() {};
LadiPageAppV2.prototype.review_runtime = function(t, e) {
    var i = function() {};
    return i.prototype.run = function(i, a) {
        if (isObjectLadiPage(t) && !isEmptyLadiPage(t["option.data_setting.value"]) && isArrayLadiPage(t.dataset_value)) {
            var n = document.getElementById(i);
            if (!isEmptyLadiPage(n)) {
                var o = n.getElementsByTagName("iframe")[0];
                LadiPageApp.review_onload(o, t["option.data_setting.value"], t.dataset_value, e)
            }
        }
    }, new i
}, LadiPageAppV2.prototype.review_callback_loaded = function(t, e) {
    for (var i = !0, a = document.querySelectorAll("iframe.ladi-review-iframe"), n = 0; n < a.length; n++)
        if (!a[n].classList.contains("loaded")) {
            i = !1;
            break
        } if (isArrayLadiPage(LadiPageScript.runtime.tmp.list_review_callback_loaded) || (LadiPageScript.runtime.tmp.list_review_callback_loaded = []), i)
        for (; !t && LadiPageScript.runtime.tmp.list_review_callback_loaded.length > 0;) {
            LadiPageScript.runtime.tmp.list_review_callback_loaded.shift()()
        } else isFunctionLadiPage(e) && LadiPageScript.runtime.tmp.list_review_callback_loaded.push(e);
    return i
}, LadiPageAppV2.prototype.review_list = function(t, e) {
    var i = [],
        a = LadiPageScript.runtime.isClient,
        n = t.sheet_id,
        o = t.dataset_id,
        r = t.dataset_value;
    n = isEmptyLadiPage(n) ? "" : n, o = isEmptyLadiPage(o) ? "" : o, r = isEmptyLadiPage(r) ? [] : r;
    var d = n + o;
    isObjectLadiPage(LadiPageScript.runtime.tmp.review_data) || (LadiPageScript.runtime.tmp.review_data = {});
    if (!isEmptyLadiPage(n) || !isEmptyLadiPage(o)) {
        var l = function() {
            if (!0 === LadiPageScript.runtime.tmp.review_data[d]) return LadiPageScript.runTimeout(l, 100);
            isFunctionLadiPage(e) && e(LadiPageScript.runtime.tmp.review_data[d])
        };
        return a && !isEmptyLadiPage(o) && isArrayLadiPage(r) ? (isFunctionLadiPage(e) && e(r), r) : !0 === LadiPageScript.runtime.tmp.review_data[d] ? (l(), i) : isArrayLadiPage(LadiPageScript.runtime.tmp.review_data[d]) ? LadiPageScript.runtime.tmp.review_data[d] : (isEmptyLadiPage(n) || (LadiPageScript.runtime.tmp.review_data[d] = !0, l(), LadiPageScript.sendRequest("GET", "https://docs.google.com/spreadsheets/d/" + n + "/gviz/tq?tqx=out:json", null, !0, null, function(t, e, i) {
            if (i.readyState == XMLHttpRequest.DONE && 200 == e) {
                t = (t = t.substr(t.indexOf('"table":{') + '"table":'.length)).substr(0, t.indexOf("});"));
                var a = JSON.parse(t),
                    n = [],
                    o = a.cols;
                isObjectLadiPage(a) && 0 == a.parsedNumHeaders && isArrayLadiPage(a.rows) && a.rows.length > 0 && isObjectLadiPage(a.rows[0]) && isArrayLadiPage(a.rows[0].c) && a.rows[0].c.length > 0 && (o = [], a.rows[0].c.forEach(function(t) {
                        o.push({
                            label: isObjectLadiPage(t) ? t.v : ""
                        })
                    }), a.rows.shift()), isObjectLadiPage(a) && isArrayLadiPage(a.rows) && isArrayLadiPage(o) && a.rows.forEach(function(t) {
                        if (isObjectLadiPage(t)) {
                            var e = {};
                            o.forEach(function(i, a) {
                                if (isArrayLadiPage(t.c)) {
                                    var n = t.c[a];
                                    isObjectLadiPage(i) && !isEmptyLadiPage(i.label) && isObjectLadiPage(n) && (e["gsx$" + i.label.trim().toLowerCase()] = {
                                        $t: n.v
                                    })
                                }
                            }), n.push(e)
                        }
                    }),
                    function(t) {
                        var e = [];
                        try {
                            t.forEach(function(t) {
                                e.push({
                                    name: t.gsx$name.$t,
                                    content: t.gsx$content.$t,
                                    image: t.gsx$image.$t,
                                    star: t.gsx$star.$t,
                                    like: t.gsx$like.$t,
                                    time: t.gsx$time.$t,
                                    verify: t.gsx$verify.$t,
                                    seller_name: t.gsx$sellername.$t,
                                    seller_content: t.gsx$sellercontent.$t,
                                    seller_like: t.gsx$sellerlike.$t
                                })
                            })
                        } catch (t) {}
                        LadiPageScript.runtime.tmp.review_data[d] = e
                    }(n)
            }
        })), i)
    }
}, LadiPageAppV2.prototype.review_onload = function(t, e, i, a) {
    if (!isEmptyLadiPage(t))
        if (!a || LadiPageScript.runtime.isRun) {
            var n = t.parentElement,
                o = n.querySelector('.ladi-review-css, [type="text/css"]'),
                r = n.querySelector('.ladi-review-script, [type="application/json"]');
            if (!isEmptyLadiPage(o) && !isEmptyLadiPage(r)) {
                var d = o.innerHTML,
                    l = document.getElementById("style_preview");
                isEmptyLadiPage(l) || (d += l.innerHTML);
                var s = null;
                try {
                    s = JSON.parse(r.innerHTML), s = LadiPageScript.deOptimizeEventData(LadiPageScript.copy(s), LadiPageScript.const.OPTIMIZE_EVENT_DATA_KEY_LIST, "OPTIMIZE_EVENT_DATA_KEY_LIST"), s = LadiPageScript.decodeValue(s)
                } catch (t) {}
                if (isObjectLadiPage(s)) {
                    s.dataset_id = e, s.dataset_value = i;
                    var c = LadiPageScript.runtime.lang;
                    a || (c = LadiPage.generateLanguagePublish());
                    var u = LadiPageScript.const["LANG" + c];
                    s.text_unit = u.REVIEW_TEXT_UNIT, s.text_description = u.REVIEW_TEXT_DESCRIPTION, s.text_sort_1 = u.REVIEW_TEXT_SORT_1, s.text_sort_2 = u.REVIEW_TEXT_SORT_2, s.text_operator_1 = u.REVIEW_TEXT_OPERATOR_1, s.text_operator_2 = u.REVIEW_TEXT_OPERATOR_2;
                    var p = function(e) {
                        var i, a, o, r, l = t.contentWindow.document.documentElement,
                            c = (isEmptyLadiPage(s.title) ? "" : '<div class="ladi-review-title">' + s.title + "</div>") + (a = 0, o = 0, r = 0, s.star_review.forEach(function(t) {
                                a += t.total, o += t.star * t.total
                            }), r = o / a, '<div class="ladi-review-rating">\n            <div class="ladi-review-rating-left">\n                <div class="ladi-review-rating-summary">\n                    <span class="ladi-review-rating-num1">' + (r = Math.floor(10 * r) / 10) + '</span><span\n                        class="ladi-review-rating-num2">/' + s.star_max + '</span>\n                </div>\n                <div class="ladi-review-rating-star">' + function() {
                                for (var t = [], e = 0; e < Math.floor(r); e++) t.push('<i class="ladi-review-star-big ladi-review-star-full"></i>');
                                if (r > Math.floor(r)) {
                                    var i = parseFloatLadiPage(100 * (r - Math.floor(r)), 4);
                                    t.push('<i class="ladi-review-star-big ladi-review-star-width"><a style="width: ' + i + '%;"></a></i>')
                                }
                                for (e = 0; e < s.star_max - Math.ceil(r); e++) t.push('<i class="ladi-review-star-big ladi-review-star-none"></i>');
                                return t.join("")
                            }() + '</div>\n                <span class="ladi-review-rating-total">' + a + " " + s.text_unit + '</span>\n            </div>\n            <div class="ladi-review-rating-right">' + (i = [], s.star_review.forEach(function(t) {
                                var e = parseFloatLadiPage(t.total / a * 100, 4);
                                i.push('<div class="ladi-review-rating-detail">\n                        <div class="ladi-review-rating-detail-star">' + function() {
                                    for (var e = [], i = 0; i < t.star; i++) e.push('<i class="ladi-review-star-full"></i>');
                                    for (i = 0; i < s.star_max - t.star; i++) e.push('<i class="ladi-review-star-none"></i>');
                                    return e.join("")
                                }() + '</div>\n                        <div class="ladi-review-rating-detail-progress">\n                            <div class="ladi-review-rating-detail-progress-bg1" style="width: ' + e + '%;"></div>\n                            <div class="ladi-review-rating-detail-progress-bg2"></div>\n                        </div>\n                        <div class="ladi-review-rating-detail-total">' + t.total + "</div>\n                    </div>")
                            }), i.join("")) + "</div>\n        </div>") + function() {
                                var t = [];
                                return isEmptyLadiPage(s.text_description) || t.push('<span class="ladi-review-sort-title">' + s.text_description + "</span>"), isEmptyLadiPage(s.text_operator_1) && isEmptyLadiPage(s.text_operator_2) || t.push('<div class="ladi-review-sort-operator-1">\n                <svg class="ladi-review-sort-operator-svg" xmlns="http://www.w3.org/2000/svg" width="20px"\n                     height="20px" preserveAspectRatio="none" viewBox="0 0 1024 1024">\n                    <path d="M887.466667 725.333333l-192 192-12.8 12.8c-4.266667 4.266667-12.8 8.533333-17.066667 8.533334-8.533333 0-12.8-4.266667-21.333333-8.533334l-8.533334-8.533333-192-192c-8.533333-12.8-8.533333-29.866667 0-38.4l12.8-12.8c12.8-12.8 34.133333-8.533333 42.666667 4.266667l128 128v-345.6c0-21.333333 17.066667-38.4 38.4-38.4s38.4 17.066667 38.4 38.4V810.666667l128-132.266667c8.533333-12.8 29.866667-12.8 38.4 0l12.8 12.8c12.8 8.533333 17.066667 21.333333 4.266667 34.133333z m-320-375.466666c-12.8 12.8-34.133333 8.533333-42.666667-4.266667l-128-128v345.6c0 21.333333-17.066667 38.4-38.4 38.4s-38.4-17.066667-38.4-38.4V217.6l-128 128c-8.533333 12.8-29.866667 12.8-38.4 0l-17.066667-8.533333c-8.533333-12.8-12.8-25.6 0-38.4l192-192 8.533334-12.8c8.533333-4.266667 12.8-8.533333 21.333333-8.533334s12.8 4.266667 21.333333 8.533334l4.266667 8.533333 196.266667 192c8.533333 12.8 8.533333 29.866667 0 38.4l-12.8 17.066667z"></path>\n                </svg>\n                <span class="ladi-review-sort-operator-title">' + (s.text_operator_1 || "") + '</span>\n                <span class="ladi-review-sort-operator-value">' + (s.text_operator_2 || "") + "</span>\n            </div>"), isEmptyLadiPage(s.text_sort_1) && isEmptyLadiPage(s.text_sort_2) || t.push('<div class="ladi-review-sort-operator-2">\n                <svg class="ladi-review-sort-operator-svg" xmlns="http://www.w3.org/2000/svg" width="20px"\n                     height="20px" preserveAspectRatio="none" viewBox="0 0 1024 1024">\n                    <path d="M918.75555522 201.95555522c-4.266667-8.533333-17.066667-17.066667-25.6-17.066666H129.42222222c-12.8 0-21.333333 8.533333-25.6 17.066666-4.266667 12.8-4.266667 25.6 4.266667 34.133334L411.02222222 611.55555522v256c0 17.066667 12.8 29.866667 29.866667 29.866667 17.066667 0 29.866667-12.8 29.866666-29.866667v-277.333333l-277.333333-341.333333H824.88888922l-277.333334 341.333333V867.55555522c0 17.066667 12.8 29.866667 29.866667 29.866667s29.866667-12.8 29.866667-29.866667v-256L910.22222222 236.08888922c12.8-8.533333 12.8-21.333333 8.533333-34.133334"></path>\n                </svg>\n                <span class="ladi-review-sort-operator-title">' + (s.text_sort_1 || "") + '</span>\n                <span class="ladi-review-sort-operator-value">' + (s.text_sort_2 || "") + "</span>\n            </div>"), 0 == t.length ? "" : '<div class="ladi-review-sort">' + t.join("") + "</div>"
                            }() + function() {
                                var t = [];
                                return isArrayLadiPage(s.list) && s.list.forEach(function(e) {
                                    var i;
                                    e.star = e.star < 1 ? 1 : e.star, e.star = e.star > s.star_max ? s.star_max : e.star, t.push('<div class="ladi-review-item">\n                <div class="ladi-review-item-star">' + function() {
                                        for (var t = [], i = 0; i < e.star; i++) t.push('<i class="ladi-review-star-full"></i>');
                                        for (i = 0; i < s.star_max - e.star; i++) t.push('<i class="ladi-review-star-none"></i>');
                                        return t.join("")
                                    }() + '</div>\n                <div class="ladi-review-item-customer">\n                    <span>' + (isEmptyLadiPage(e.name) ? "" : e.name) + "</span>" + (i = "", isEmptyLadiPage(e.verify) || (i = '<span class="ladi-review-item-verify">' + e.verify + "</span>"), i) + '</div>\n                <div class="ladi-review-item-content">' + (isEmptyLadiPage(e.content) ? "" : e.content) + function() {
                                        var t = [];
                                        if (!isEmptyLadiPage(e.image)) {
                                            var i = e.image.split(",");
                                            t.push("<br />"), i.forEach(function(e) {
                                                t.push('<div class="ladi-review-item-image" style="background-image: url(\'' + e + "');\"></div>")
                                            })
                                        }
                                        return t.join("")
                                    }() + function() {
                                        var t = "";
                                        return isEmptyLadiPage(e.seller_name) || isEmptyLadiPage(e.seller_content) || (t += '<div class="ladi-review-item-seller">\n                            <div class="ladi-review-item-seller-name">' + e.seller_name + '</div>\n                            <div class="ladi-review-item-seller-body">' + e.seller_content + '</div>\n                            <div class="ladi-review-item-like">' + (isEmptyLadiPage(e.seller_like) ? "" : e.seller_like) + "</div>\n                        </div>"), t
                                    }() + "</div>" + function() {
                                        var t = "";
                                        return isEmptyLadiPage(e.like) || (t = '<div class="ladi-review-item-like">' + e.like + "</div>"), t
                                    }() + '<div class="ladi-review-item-time">' + (isEmptyLadiPage(e.time) ? "" : e.time) + "</div>\n            </div>")
                                }), '<div class="ladi-review-list">' + t.join("") + "</div>"
                            }(),
                            u = '<!DOCTYPE html>\n        <html>\n            <head>\n                <meta charset="UTF-8">\n                <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">\n                <style type="text/css">' + d + '</style>\n            </head>\n            <body>\n                <div class="ladi-review">' + c + "</div>\n            </body>\n        </html>";
                        l.innerHTML = u;
                        var p = l.getElementsByClassName("ladi-review")[0],
                            m = 0,
                            _ = 0;
                        t.hasAttribute("data-height-display") ? m = parseFloatLadiPage(t.getAttribute("data-height-display")) || 0 : (m = parseFloatLadiPage(getComputedStyle(p).height) || 0, t.setAttribute("data-height-display", m)), t.hasAttribute("data-height-all") ? _ = parseFloatLadiPage(t.getAttribute("data-height-all")) || 0 : (p.style.setProperty("height", "auto"), _ = parseFloatLadiPage(getComputedStyle(p).height) || 0, p.style.removeProperty("height"), t.setAttribute("data-height-all", _));
                        var g = !1,
                            y = s.scrolling;
                        y ? g = !0 : (_ = m, g = !1);
                        var h = _;
                        if (g) t.removeAttribute("scrolling"), p.style.setProperty("height", "auto"), t.classList.add("loaded");
                        else if (t.setAttribute("scrolling", "no"), p.style.removeProperty("height"), e && !y) {
                            p.style.setProperty("height", "auto");
                            var f = parseFloatLadiPage(getComputedStyle(p).height) || 0;
                            if (p.style.removeProperty("height"), h != f) {
                                n.style.setProperty("height", f + "px");
                                var v = LadiPageScript.findAncestor(n.parentElement, "ladi-element");
                                isEmptyLadiPage(v) && (v = LadiPageScript.findAncestor(n.parentElement, "ladi-section")), LadiPageScript.updateHeightElement(!0, n, v, h, f)
                            }
                        }
                        e && t.classList.add("loaded"), LadiPageApp.review_callback_loaded(!1)
                    };
                    if (p(!1), a) {
                        t.onload = null, t.removeAttribute("onload");
                        var m = this.review_list(s, function(t) {
                            o.parentElement.removeChild(o), r.parentElement.removeChild(r), s.list = t, p(!0)
                        });
                        isNullLadiPage(m) && (t.classList.add("loaded"), LadiPageApp.review_callback_loaded(!1))
                    }
                }
            }
        } else LadiPageScript.runTimeout(function() {
            LadiPageApp.review_onload(t, e, i, a)
        }, 100)
}, LadiPageScript.const.LANGen = {
    ALERT_TITLE: "Alert",
    ALERT_BUTTON_TEXT: "OK",
    GET_CODE_BUTTON_TEXT: "Resend code",
    COPIED: "Copied!",
    PASTED: "Pasted!",
    FAILED: "Failed!",
    OPTION_NO_SELECT: "Blank",
    OPTION_TRUE: "Yes",
    OPTION_FALSE: "No",
    REQUEST_SEND_ERROR: "An error occurred, please try again!",
    FORM_LOGIN_SEND_ERROR: "Your key is invalid or has expired!",
    FORM_VALIDATE_CHECKOUT_PRODUCT: "Please select a product!",
    FORM_VALIDATE_CHECKOUT_PAYMENT: "Please select payment method!",
    FORM_SEND_DATA_NO_CONFIG: "Please re-check your Form settings!",
    FORM_UPLOAD_FILE_MAX_SIZE_ERROR: "You can only upload file with the maximum size of {{max_size}}MB.",
    FORM_UPLOAD_FILE_MAX_LENGTH_ERROR: "You can only upload {{max_length}} files at once.",
    FORM_CAPTCHA_ERROR: "Please let us know that you're not a robot!",
    FORM_CAPTCHA_LOADING: "Please wait while we're checking your identity!",
    FORM_THANKYOU_MESSAGE_DEFAULT: "Thank you for your attention!",
    FORM_INPUT_REQUIRED_ERROR: "Please input all required information!",
    FORM_INPUT_COMMON_VALIDATE: "Invalid data input format!",
    FORM_INPUT_NAME_ERROR: "Name exceeds the allowed length of {{max_length}} characters!",
    FORM_INPUT_MESSAGE_ERROR: "Message exceeds the allowed length of {{max_length}} characters!",
    FORM_INPUT_PHONE_ERROR: "Invalid phone number format!",
    FORM_INPUT_EMAIL_ERROR: "Invalid email address format!",
    FORM_INPUT_LOCATE_ERROR: "The address field exceeds the allowed length of {{max_length}} characters!",
    FORM_INPUT_TYPE_TEXT_ERROR: "The information field {{field_name}} exceeds the allowed length of {{max_length}} characters!",
    FORM_INPUT_TYPE_NUMBER_ERROR: "Field {{field_name}} must use number format!",
    FORM_INPUT_EMAIL_REGEX: "Please input valid email format!",
    FORM_INPUT_TEXT_REGEX: "Please input with valid format!",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_CHECKOUT: "Please select product and set up payment to be able to use",
    SELECT_PRODUCT: "Select product",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_GALLERY: "Please select product and set up payment to be able to use",
    SETTING_PAYMENT: "Setting up payment",
    PRODUCT: "Product",
    SERVICE: "Service",
    TICKET: "Ticket",
    EXPIRES_TITLE: "The page is temporarily down!",
    EXPIRES_DESC: "Landing page is temporarily inaccessible due to expiration date. Please renew your account to restore activity.",
    REVIEW_TEXT_UNIT: "reviews",
    REVIEW_TEXT_DESCRIPTION: "Product Reviews",
    REVIEW_TEXT_SORT_1: "Sort by:",
    REVIEW_TEXT_SORT_2: "Latest",
    REVIEW_TEXT_OPERATOR_1: "Filter by:",
    REVIEW_TEXT_OPERATOR_2: "All Star",
    ADD_TO_CART_NO_CART: "Your cart is empty",
    ADD_TO_CART_QUANTITY_REQUIRED: "Please input your quanity!",
    ADD_TO_CART_NO_PRODUCT: "Information not found {{name}}, try again!",
    ADD_TO_CART_PRODUCT_REQUIRED: "Please select {{name}}!",
    ADD_TO_CART_NO_QUANTITY: "{{name}} is out of stocks!",
    ADD_TO_CART_MAX_QUANTITY: "You can only purchase with the maximum of {{max}} {{name}}.",
    ADD_TO_CART_PRODUCT_BEFORE_START_DATE: "It's not the opening time of {{name}} yet!!",
    ADD_TO_CART_PRODUCT_AFTER_END_DATE: "Opening time of {{name}} has ended!",
    ADD_TO_CART_PRODUCT_ONLY_ONE: "You can only purchase up to 1 {{name}} at once.",
    GAME_RESULT_MESSAGE: "Congrats! You have been gifted with {{coupon_text}}. Please insert your coupon code: {{coupon_code}}. You have {{spin_turn_left}} turns remaining.",
    GAME_MAX_TURN_MESSAGE: "You're out of turns.",
    HIDE_ELEMENT: "Hide element",
    SHOW_ELEMENT: "Show element",
    TOP_ELEMENT: "Pull Section to top",
    SCROLL_ELEMENT: "Scroll to Section",
    SET_COOKIE: "Add Cookie",
    MESSAGE_NETWORK_ERROR: "Network error! Please check your connection and try again in a moment!",
    MESSAGE_NETWORK_HAS_CONNECT_BUT_NO_CODE_DATA: "Data could not be sent! Please check and try again in a moment! HTTP status code: {{status}}",
    MESSAGE_WARNING_SELECT_PRODUCT_BUMP_OFFER: "Please select main product before selecting Bump Offer product!",
    ELEMENT_NOT_FOUND: "Element not found",
    NO_PRODUCTS_IN_CART: "There are no products in the cart!",
    NOTIFICATION: "Notification",
    MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART: "Are you sure you want to remove the product from the cart?",
    CANCEL: "Cancel",
    CONFIRM: "Confirm",
    PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART: "Please select a variant before adding the product to the cart!",
    PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BUY: "Please select the product variant you want to buy!",
    NOTHING_DISCOUNT_COUPON_CODE: "There is no discount code yet!",
    PLEASE_SELECT_DISCOUNT_COUPON_CODE: "Please Please select a discount code!",
    DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART: "Get {0} off your entire order",
    DISCOUNT_TYPE_TAG_PRODUCT_IN_CART: "Get {0} off your product tag",
    DISCOUNT_TYPE_PRODUCT_IN_CART: "Get {0} off your specific product",
    DISCOUNT_VALUE_SHIPPING_FEE: "Discount {0} on shipping fee",
    PLEASE_CONFIGURE_YOUR_PRODUCT: "PLEASE_CONFIGURE_YOUR_PRODUCT !",
    APPLY_DISCOUNT_CODE: "Apply Discount Code",
    ENTER_DISCOUNT_CODE: "Enter Discount Code",
    APPLY_COUPON_DISCOUNT: "Apply",
    SHIPPING_DISCOUNT_FEE: "Shipping Discount",
    YOU_CAN_CHOOSE_ONLY_ONE_DISCOUNT_CODE: "(You can choose 1 discount code)",
    COUPON_DISCOUNT_CODE: "Discount Code",
    MESSAGE_MIN_BUY_PRODUCT: "Product {{product_name}} ({{option_name}}) must buy at least {{min_buy}} products!",
    MESSAGE_MAX_BUY_PRODUCT: "Product {{product_name}} ({{option_name}}) can only be purchased up to {{max_buy}} products",
    MESSAGE_WARNING_IMPORT_FILE_DATA_SET: "Note: Uploaded data may be incomplete if the data fields are left blank. Please fill in the information and follow the steps."
}, LadiPageScript.const.LANGvi = {
    ALERT_TITLE: "Alert",
    ALERT_BUTTON_TEXT: "OK",
    GET_CODE_BUTTON_TEXT: "Gửi lại",
    COPIED: "Copied!",
    PASTED: "Pasted!",
    FAILED: "Failed!",
    OPTION_NO_SELECT: "Không chọn",
    OPTION_TRUE: "Có",
    OPTION_FALSE: "Không",
    REQUEST_SEND_ERROR: "Đã xảy ra lỗi, vui lòng thử lại!",
    FORM_LOGIN_SEND_ERROR: "Mã của bạn không đúng hoặc đã hết hạn!",
    FORM_VALIDATE_CHECKOUT_PRODUCT: "Vui lòng chọn sản phẩm!",
    FORM_VALIDATE_CHECKOUT_PAYMENT: "Vui lòng chọn phương thức thanh toán!",
    FORM_CHECKOUT_ORDER_CANCEL: "Đơn hàng của bạn bị huỷ!",
    FORM_SEND_DATA_NO_CONFIG: "Vui lòng kiểm tra lại cấu hình Form!",
    FORM_UPLOAD_FILE_MAX_SIZE_ERROR: "Bạn chỉ được upload file tổng dung lượng tối đa {{max_size}}MB.",
    FORM_UPLOAD_FILE_MAX_LENGTH_ERROR: "Bạn chỉ được upload tối đa {{max_length}} file.",
    FORM_CAPTCHA_ERROR: "Vui lòng xác minh rằng bạn không phải người máy!",
    FORM_CAPTCHA_LOADING: "Vui lòng chờ xác minh rằng bạn không phải người máy!",
    FORM_THANKYOU_MESSAGE_DEFAULT: "Cảm ơn bạn đã quan tâm!",
    FORM_INPUT_REQUIRED_ERROR: "Vui lòng nhập đầy đủ các trường thông tin!",
    FORM_INPUT_COMMON_VALIDATE: "Định dạng dữ liệu vừa nhập chưa hợp lệ!",
    FORM_INPUT_NAME_ERROR: "Họ tên vượt quá độ dài cho phép là {{max_length}} ký tự!",
    FORM_INPUT_MESSAGE_ERROR: "Message vượt quá độ dài cho phép là {{max_length}} ký tự!",
    FORM_INPUT_PHONE_ERROR: "Định dạng số điện thoại không hợp lệ!",
    FORM_INPUT_EMAIL_ERROR: "Định dạng email không hợp lệ!",
    FORM_INPUT_LOCATE_ERROR: "Tên địa điểm vừa nhập vượt quá độ dài cho phép. (Tối đa {{max_length}} ký tự)!",
    FORM_INPUT_TYPE_TEXT_ERROR: "Trường thông tin {{field_name}} vượt quá độ dài cho phép là {{max_length}} ký tự!",
    FORM_INPUT_TYPE_NUMBER_ERROR: "Trường {{field_name}} phải sử dụng định dạng số!",
    FORM_INPUT_EMAIL_REGEX: "Vui lòng nhập đúng định dạng email!",
    FORM_INPUT_TEXT_REGEX: "Vui lòng nhập đúng định dạng!",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_CHECKOUT: "Vui lòng chọn sản phẩm và thiết lập thanh toán để có thể sử dụng",
    SELECT_PRODUCT: "Chọn sản phẩm",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_GALLERY: "Vui lòng chọn sản phẩm và thiết lập thanh toán để có thể sử dụng",
    SETTING_PAYMENT: "Thiết lập thanh toán",
    PRODUCT: "Sản phẩm",
    SERVICE: "Dịch vụ",
    TICKET: "Vé",
    EXPIRES_TITLE: "Trang tạm ngừng hoạt động!",
    EXPIRES_DESC: "Landing page tạm thời không thể truy cập do quá hạn sử dụng. Vui lòng gia hạn tài khoản để khôi phục hoạt động.",
    REVIEW_TEXT_UNIT: "đánh giá",
    REVIEW_TEXT_DESCRIPTION: "Nhận xét về sản phẩm",
    REVIEW_TEXT_SORT_1: "Sắp xếp:",
    REVIEW_TEXT_SORT_2: "Mới nhất",
    REVIEW_TEXT_OPERATOR_1: "Bộ lọc:",
    REVIEW_TEXT_OPERATOR_2: "Tất cả Sao",
    ADD_TO_CART_NO_CART: "Giỏ hàng của bạn đang trống",
    ADD_TO_CART_QUANTITY_REQUIRED: "Vui lòng nhập số lượng!",
    ADD_TO_CART_NO_PRODUCT: "Không tìm thấy thông tin {{name}}, vui lòng thử lại sau!",
    ADD_TO_CART_PRODUCT_REQUIRED: "Vui lòng chọn {{name}}!",
    ADD_TO_CART_NO_QUANTITY: "{{name}} đã hết số lượng!",
    ADD_TO_CART_MAX_QUANTITY: "Bạn chỉ được mua tối đa {{max}} {{name}}.",
    ADD_TO_CART_PRODUCT_BEFORE_START_DATE: "Chưa đến thời gian mở bán {{name}}!",
    ADD_TO_CART_PRODUCT_AFTER_END_DATE: "Thời gian mua {{name}} đã hết!",
    ADD_TO_CART_PRODUCT_ONLY_ONE: "Bạn chỉ được mua 1 {{name}} cùng lúc.",
    GAME_RESULT_MESSAGE: "Chúc mừng bạn nhận được {{coupon_text}}. Nhập mã: {{coupon_code}} để sử dụng. Bạn còn {{spin_turn_left}} lượt quay.",
    GAME_MAX_TURN_MESSAGE: "Bạn đã hết lượt quay.",
    HIDE_ELEMENT: "Ẩn phần tử",
    SHOW_ELEMENT: "Hiện phần tử",
    TOP_ELEMENT: "Kéo Section lên đầu",
    SCROLL_ELEMENT: "Kéo tới Section",
    SET_COOKIE: "Thiết lập Cookie",
    MESSAGE_NETWORK_ERROR: "Lỗi mạng! Vui lòng kiểm tra lại đường truyền và thử lại sau giây lát!",
    MESSAGE_NETWORK_HAS_CONNECT_BUT_NO_CODE_DATA: "Không gửi được dữ liệu! Vui lòng kiểm tra và thử lại sau giây lát! HTTP status code: {{status}}",
    MESSAGE_WARNING_SELECT_PRODUCT_BUMP_OFFER: "Vui lòng chọn sản phẩm chính trước khi chọn sản phẩm Bump Offer!",
    ELEMENT_NOT_FOUND: "Không tìm thấy phần tử",
    NO_PRODUCTS_IN_CART: "Chưa có sản phẩm nào trong giỏ hàng!",
    NOTIFICATION: "Thông báo",
    MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART: "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng ?",
    CANCEL: "Hủy bỏ",
    CONFIRM: "Xác nhận",
    PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART: "Vui lòng chọn biến thể trước khi thêm sản phẩm vào giỏ hàng !",
    PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BUY: "Vui lòng chọn biến thể sản phẩm mà bạn muốn mua !",
    NOTHING_DISCOUNT_COUPON_CODE: "Chưa có mã giảm giá nào!",
    PLEASE_SELECT_DISCOUNT_COUPON_CODE: "Vui lòng chọn mã giảm giá!",
    DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART: "Giảm giá {0} toàn bộ đơn hàng",
    DISCOUNT_TYPE_TAG_PRODUCT_IN_CART: "Giảm giá {0} tag sản phẩm",
    DISCOUNT_TYPE_PRODUCT_IN_CART: "Giảm giá {0} sản phẩm cụ thể",
    DISCOUNT_VALUE_SHIPPING_FEE: "Giảm giá {0} trên phí vận chuyển",
    PLEASE_CONFIGURE_YOUR_PRODUCT: "Vui lòng cấu hình sản phẩm của bạn !",
    APPLY_DISCOUNT_CODE: "Áp dụng mã giảm giá",
    ENTER_DISCOUNT_CODE: "Nhập mã giảm giá",
    APPLY_COUPON_DISCOUNT: "Áp dụng",
    SHIPPING_DISCOUNT_FEE: "Ưu đãi phí vận chuyển",
    YOU_CAN_CHOOSE_ONLY_ONE_DISCOUNT_CODE: "(Bạn có thể chọn 1 mã giảm giá)",
    COUPON_DISCOUNT_CODE: "Mã giảm giá",
    MESSAGE_MIN_BUY_PRODUCT: "Sản phẩm {{product_name}} ({{option_name}}) phải mua tối thiểu {{min_buy}} sản phẩm!",
    MESSAGE_MAX_BUY_PRODUCT: "Sản phẩm {{product_name}} ({{option_name}}) chỉ được mua tối đa {{max_buy}} sản phẩm!",
    MESSAGE_WARNING_IMPORT_FILE_DATA_SET: "Lưu ý: Dữ liệu tải lên có thể không hoàn chỉnh nếu nội dung các trường dữ liệu để trống. Vui lòng điền đầy đủ thông tin và thao tác"
}, LadiPageScript.const.LANGth = {
    ALERT_TITLE: "แจ้งเตือน",
    ALERT_BUTTON_TEXT: "ตกลง",
    GET_CODE_BUTTON_TEXT: "ส่งรหัสใหม่",
    COPIED: "คัดลอก!",
    PASTED: "วางแล้ว!",
    FAILED: "ล้มเหลว!",
    OPTION_NO_SELECT: "ว่าง",
    OPTION_TRUE: "ใช่",
    OPTION_FALSE: "ไม่",
    REQUEST_SEND_ERROR: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง!",
    FORM_LOGIN_SEND_ERROR: "คีย์ของคุณไม่ถูกต้องหรือหมดอายุแล้ว!",
    FORM_VALIDATE_CHECKOUT_PRODUCT: "กรุณาเลือกผลิตภัณฑ์!",
    FORM_VALIDATE_CHECKOUT_PAYMENT: "กรุณาเลือกวิธีการชำระเงิน!",
    FORM_CHECKOUT_ORDER_CANCEL: "คำสั่งซื้อของคุณถูกยกเลิก!",
    FORM_SEND_DATA_NO_CONFIG: "โปรดตรวจสอบการตั้งค่าแบบฟอร์มของคุณอีกครั้ง!",
    FORM_UPLOAD_FILE_MAX_SIZE_ERROR: "คุณสามารถอัปโหลดไฟล์ที่มีขนาดสูงสุด {{max_size}} MB เท่านั้น",
    FORM_UPLOAD_FILE_MAX_LENGTH_ERROR: "คุณสามารถอัปโหลดไฟล์ได้ครั้งละ {{max_length}} ไฟล์เท่านั้น",
    FORM_CAPTCHA_ERROR: "โปรดแจ้งให้เราทราบว่าคุณไม่ใช่หุ่นยนต์!",
    FORM_CAPTCHA_LOADING: "โปรดรอในขณะที่เรากำลังตรวจสอบตัวตนของคุณ!",
    FORM_THANKYOU_MESSAGE_DEFAULT: "ขอบคุณที่ให้ความสนใจ!",
    FORM_INPUT_REQUIRED_ERROR: "กรุณาป้อนข้อมูลที่จำเป็นทั้งหมด!",
    FORM_INPUT_COMMON_VALIDATE: "รูปแบบข้อมูลที่เพิ่งป้อนไม่ถูกต้อง!",
    FORM_INPUT_NAME_ERROR: "ชื่อเต็มเกินความยาวที่อนุญาต {{max_length}} ตัวอักษร!",
    FORM_INPUT_MESSAGE_ERROR: "ข้อความเกินความยาวที่อนุญาต {{max_length}} อักขระ!",
    FORM_INPUT_PHONE_ERROR: "รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง!",
    FORM_INPUT_EMAIL_ERROR: "รูปแบบอีเมลไม่ถูกต้อง!",
    FORM_INPUT_LOCATE_ERROR: "ชื่อสถานที่ที่ป้อนเกินความยาวที่อนุญาต (สูงสุด {{max_length}} ตัวอักษร)!",
    FORM_INPUT_TYPE_TEXT_ERROR: "ช่องข้อมูล {{field_name}} เกินความยาวที่อนุญาต {{max_length}} ตัวอักษร!",
    FORM_INPUT_TYPE_NUMBER_ERROR: "ฟิลด์ {{field_name}} ต้องใช้รูปแบบตัวเลข!",
    FORM_INPUT_EMAIL_REGEX: "โปรดป้อนรูปแบบอีเมลที่ถูกต้อง!",
    FORM_INPUT_TEXT_REGEX: "โปรดป้อนข้อมูลด้วยรูปแบบที่ถูกต้อง!",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_CHECKOUT: "โปรดเลือกผลิตภัณฑ์และตั้งค่าการชำระเงินเพื่อใช้งาน",
    SELECT_PRODUCT: "เลือกผลิตภัณฑ์",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_GALLERY: "โปรดเลือกผลิตภัณฑ์และตั้งค่าการชำระเงินเพื่อใช้งาน",
    SETTING_PAYMENT: "ตั้งค่าการชำระเงิน",
    PRODUCT: "สินค้า",
    SERVICE: "บริการ",
    TICKET: "ตั๋ว",
    EXPIRES_TITLE: "หน้านี้หยุดให้บริการชั่วคราว!",
    EXPIRES_DESC: "ไม่สามารถเข้าถึงหน้า Landing Page ได้ชั่วคราวเนื่องจากวันหมดอายุ โปรดต่ออายุบัญชีของคุณเพื่อเรียกคืนกิจกรรม",
    REVIEW_TEXT_UNIT: "บทวิจารณ์",
    REVIEW_TEXT_DESCRIPTION: "บทวิจารณ์ผลิตภัณฑ์",
    REVIEW_TEXT_SORT_1: "จัดเรียงตาม:",
    REVIEW_TEXT_SORT_2: "ล่าสุด",
    REVIEW_TEXT_OPERATOR_1: "กรองโดย:",
    REVIEW_TEXT_OPERATOR_2: "ออลสตาร์",
    ADD_TO_CART_NO_CART: "รถเข็นของคุณว่างเปล่า",
    ADD_TO_CART_QUANTITY_REQUIRED: "กรุณาระบุคุณภาพของคุณ!",
    ADD_TO_CART_NO_PRODUCT: "ไม่พบข้อมูล {{name}} โปรดลองอีกครั้ง!",
    ADD_TO_CART_PRODUCT_REQUIRED: "โปรดเลือก {{name}}!",
    ADD_TO_CART_NO_QUANTITY: "{{name}} สินค้าหมด!",
    ADD_TO_CART_MAX_QUANTITY: "คุณสามารถซื้อได้สูงสุด {{max}} {{name}} เท่านั้น",
    ADD_TO_CART_PRODUCT_BEFORE_START_DATE: "ยังไม่ถึงเวลาเปิดทำการของ {{name}} yet!",
    ADD_TO_CART_PRODUCT_AFTER_END_DATE: "เวลาเปิดของ {{name}} สิ้นสุดลงแล้ว!",
    ADD_TO_CART_PRODUCT_ONLY_ONE: "คุณสามารถซื้อได้สูงสุด 1 {{name}} ต่อครั้ง",
    GAME_RESULT_MESSAGE: "ขอแสดงความยินดี! คุณได้รับ {{coupon_text}} เป็นของขวัญ โปรดใส่รหัสคูปองของคุณ: {{coupon_code}} คุณเหลืออีก {{spin_turn_left}} เลี้ยว",
    GAME_MAX_TURN_MESSAGE: "กรอกข้อความว่าการหมุนสิ้นสุดลงแล้ว",
    HIDE_ELEMENT: "ซ่อนองค์ประกอบ",
    SHOW_ELEMENT: "แสดงองค์ประกอบ",
    TOP_ELEMENT: "ดึงส่วนขึ้นด้านบน",
    SCROLL_ELEMENT: "เลื่อนไปที่ส่วน",
    SET_COOKIE: "เพิ่มคุกกี้",
    MESSAGE_NETWORK_ERROR: "เครือข่ายผิดพลาด! โปรดตรวจสอบการเชื่อมต่อของคุณแล้วลองอีกครั้งในอีกสักครู่!",
    MESSAGE_NETWORK_HAS_CONNECT_BUT_NO_CODE_DATA: "ไม่สามารถส่งข้อมูลได้! โปรดตรวจสอบและลองอีกครั้งในอีกสักครู่! รหัสสถานะ HTTP: {{status}}",
    MESSAGE_WARNING_SELECT_PRODUCT_BUMP_OFFER: "กรุณาเลือกผลิตภัณฑ์หลักก่อนเลือกผลิตภัณฑ์ Bump Offer!",
    ELEMENT_NOT_FOUND: "ไม่พบองค์ประกอบ",
    NO_PRODUCTS_IN_CART: "ไม่มีสินค้าในรถเข็น!",
    NOTIFICATION: "การแจ้งเตือน",
    MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART: "คุณแน่ใจหรือไม่ว่าต้องการลบผลิตภัณฑ์ออกจากรถเข็น",
    CANCEL: "ยกเลิก",
    CONFIRM: "ยืนยัน",
    PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART: "โปรดเลือกรูปแบบก่อนที่จะเพิ่มผลิตภัณฑ์ลงตะกร้า!",
    PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BUY: "โปรดเลือกรูปแบบผลิตภัณฑ์ที่คุณต้องการซื้อ!",
    NOTHING_DISCOUNT_COUPON_CODE: "ยังไม่มีรหัสส่วนลด!",
    PLEASE_SELECT_DISCOUNT_COUPON_CODE: "โปรดเลือกรหัสส่วนลด!",
    DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART: "ส่วนลด {0} คำสั่งซื้อทั้งหมด",
    DISCOUNT_TYPE_TAG_PRODUCT_IN_CART: "ส่วนลด {0} แท็กสินค้า",
    DISCOUNT_TYPE_PRODUCT_IN_CART: "ส่วนลดสำหรับผลิตภัณฑ์เฉพาะ {0} รายการ",
    DISCOUNT_VALUE_SHIPPING_FEE: "ส่วนลด {0} สำหรับค่าธรรมเนียมการจัดส่ง",
    PLEASE_CONFIGURE_YOUR_PRODUCT: "กรุณากำหนดค่าผลิตภัณฑ์ของคุณ!",
    APPLY_DISCOUNT_CODE: "ใช้รหัสส่วนลด",
    ENTER_DISCOUNT_CODE: "กรอกรหัสส่วนลด",
    APPLY_COUPON_DISCOUNT: "สมัคร",
    SHIPPING_DISCOUNT_FEE: "ส่วนลดค่าจัดส่ง",
    YOU_CAN_CHOOSE_ONLY_ONE_DISCOUNT_CODE: "(คุณสามารถเลือกรหัสส่วนลดได้ 1 รหัส)",
    COUPON_DISCOUNT_CODE: "รหัสส่วนลด",
    MESSAGE_MIN_BUY_PRODUCT: "สินค้า {{product_name}} ({{option_name}}) ต้องซื้ออย่างน้อย {{min_buy}} ผลิตภัณฑ์!",
    MESSAGE_MAX_BUY_PRODUCT: "สินค้า {{product_name}} ({{option_name}}) สามารถซื้อได้ครั้งละ {{max_buy}} ชิ้นเท่านั้น",
    MESSAGE_WARNING_IMPORT_FILE_DATA_SET: "หมายเหตุ: ข้อมูลที่อัพโหลดอาจไม่สมบูรณ์หากปล่อยให้ช่องข้อมูลว่างเปล่า กรุณากรอกข้อมูลและดำเนินการให้ครบถ้วน"
}, LadiPageScript.const.LANGid = {
    ALERT_TITLE: "Peringatan",
    ALERT_BUTTON_TEXT: "Oke",
    GET_CODE_BUTTON_TEXT: "Kirim ulang kode",
    COPIED: "Disalin!",
    PASTED: "Ditempelkan!",
    FAILED: "Gagal!",
    OPTION_NO_SELECT: "Kosong",
    OPTION_TRUE: "Ya",
    OPTION_FALSE: "Tidak",
    REQUEST_SEND_ERROR: "Terjadi kesalahan, harap coba lagi!",
    FORM_LOGIN_SEND_ERROR: "Kunci Anda tidak valid atau telah kedaluwarsa!",
    FORM_VALIDATE_CHECKOUT_PRODUCT: "Silakan pilih produk!",
    FORM_VALIDATE_CHECKOUT_PAYMENT: "Silakan pilih metode pembayaran!",
    FORM_CHECKOUT_ORDER_CANCEL: "Pesanan Anda dibatalkan!",
    FORM_SEND_DATA_NO_CONFIG: "Silakan periksa kembali pengaturan Formulir Anda!",
    FORM_UPLOAD_FILE_MAX_SIZE_ERROR: "Anda hanya dapat mengupload file dengan ukuran maksimal {{max_size}}MB.",
    FORM_UPLOAD_FILE_MAX_LENGTH_ERROR: "Anda hanya dapat mengupload {{max_length}} file sekaligus.",
    FORM_CAPTCHA_ERROR: "Harap beri tahu kami bahwa Anda bukan robot!",
    FORM_CAPTCHA_LOADING: "Harap tunggu sementara kami sedang memeriksa identitas Anda!",
    FORM_THANKYOU_MESSAGE_DEFAULT: "Terima kasih atas perhatian Anda!",
    FORM_INPUT_REQUIRED_ERROR: "Masukkan semua informasi yang diperlukan!",
    FORM_INPUT_COMMON_VALIDATE: "Format data yang baru dimasukkan tidak valid!",
    FORM_INPUT_NAME_ERROR: "Nama lengkap melebihi panjang {{max_length}} karakter yang diperbolehkan!",
    FORM_INPUT_MESSAGE_ERROR: "Pesan melebihi panjang yang diizinkan yaitu {{max_length}} karakter!",
    FORM_INPUT_PHONE_ERROR: "Format nomor telepon tidak valid!",
    FORM_INPUT_EMAIL_ERROR: "Format email salah!",
    FORM_INPUT_LOCATE_ERROR: "Nama lokasi yang dimasukkan melebihi panjang yang diperbolehkan. (Maksimal {{max_length}} karakter)!",
    FORM_INPUT_TYPE_TEXT_ERROR: "Bidang informasi {{field_name}} melebihi panjang yang diizinkan yaitu {{max_length}} karakter!",
    FORM_INPUT_TYPE_NUMBER_ERROR: "Kolom {{field_name}} harus menggunakan format angka!",
    FORM_INPUT_EMAIL_REGEX: "Masukkan format email yang valid!",
    FORM_INPUT_TEXT_REGEX: "Masukkan dengan format yang valid!",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_CHECKOUT: "Silakan pilih produk dan atur pembayaran untuk menggunakannya",
    SELECT_PRODUCT: "Pilih produk",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_GALLERY: "Silakan pilih produk dan atur pembayaran untuk menggunakannya",
    SETTING_PAYMENT: "Siapkan pembayaran",
    PRODUCT: "Produk",
    SERVICE: "Layanan",
    TICKET: "Tiket",
    EXPIRES_TITLE: "Halaman sementara tidak aktif!",
    EXPIRES_DESC: "Halaman arahan untuk sementara tidak dapat diakses karena tanggal kedaluwarsa. Harap perbarui akun Anda untuk memulihkan aktivitas.",
    REVIEW_TEXT_UNIT: "ulasan",
    REVIEW_TEXT_DESCRIPTION: "Ulasan Produk",
    REVIEW_TEXT_SORT_1: "Urutkan menurut:",
    REVIEW_TEXT_SORT_2: "Terbaru",
    REVIEW_TEXT_OPERATOR_1: "Filter menurut:",
    REVIEW_TEXT_OPERATOR_2: "Semua Bintang",
    ADD_TO_CART_NO_CART: "Keranjang Anda kosong",
    ADD_TO_CART_QUANTITY_REQUIRED: "Masukkan jumlah Anda!",
    ADD_TO_CART_NO_PRODUCT: "Informasi tidak ditemukan {{name}}, coba lagi!",
    ADD_TO_CART_PRODUCT_REQUIRED: "Silakan pilih {{name}}!",
    ADD_TO_CART_NO_QUANTITY: "{{name}} kehabisan stok!",
    ADD_TO_CART_MAX_QUANTITY: "Anda hanya dapat membeli dengan maksimum {{max}} {{name}}.",
    ADD_TO_CART_PRODUCT_BEFORE_START_DATE: "Ini belum jam buka {{name}} belum!",
    ADD_TO_CART_PRODUCT_AFTER_END_DATE: "Waktu buka {{name}} telah berakhir!",
    ADD_TO_CART_PRODUCT_ONLY_ONE: "Anda hanya dapat membeli hingga 1 {{name}} sekaligus.",
    GAME_RESULT_MESSAGE: "Selamat! Anda telah diberikan {{coupon_text}}. Masukkan kode kupon Anda: {{coupon_code}}. Anda memiliki {{spin_turn_left}} putaran tersisa.",
    GAME_MAX_TURN_MESSAGE: "Anda kehabisan giliran.",
    HIDE_ELEMENT: "Sembunyikan elemen",
    SHOW_ELEMENT: "Tampilkan elemen",
    TOP_ELEMENT: "Tarik Bagian ke atas",
    SCROLL_ELEMENT: "Gulir ke Bagian",
    SET_COOKIE: "Tambahkan Cookie",
    MESSAGE_NETWORK_ERROR: "Kesalahan jaringan! Silakan periksa koneksi Anda dan coba lagi sebentar lagi!",
    MESSAGE_NETWORK_HAS_CONNECT_BUT_NO_CODE_DATA: "Tidak dapat mengirim data! Silakan periksa dan coba lagi sebentar lagi! Kode status HTTP: {{status}}",
    MESSAGE_WARNING_SELECT_PRODUCT_BUMP_OFFER: "Silakan pilih produk utama sebelum memilih produk Bump Offer!",
    ELEMENT_NOT_FOUND: "Elemen tidak ditemukan",
    NO_PRODUCTS_IN_CART: "Tidak ada produk di keranjang!",
    NOTIFICATION: "Pemberitahuan",
    MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART: "Apakah Anda yakin ingin menghapus produk dari keranjang?",
    CANCEL: "Batal",
    CONFIRM: "Konfirmasi",
    PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART: "Silakan pilih variasi sebelum menambahkan produk ke keranjang!",
    PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BUY: "Silakan pilih varian produk yang ingin dibeli!",
    NOTHING_DISCOUNT_COUPON_CODE: "Belum ada kode diskon!",
    PLEASE_SELECT_DISCOUNT_COUPON_CODE: "Silakan pilih kode diskon!",
    DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART: "Diskon {0} seluruh pesanan",
    DISCOUNT_TYPE_TAG_PRODUCT_IN_CART: "Diskon {0} tag produk",
    DISCOUNT_TYPE_PRODUCT_IN_CART: "Diskon untuk {0} produk tertentu",
    DISCOUNT_VALUE_SHIPPING_FEE: "Diskon {0} untuk biaya pengiriman",
    PLEASE_CONFIGURE_YOUR_PRODUCT: "Silakan konfigurasikan produk Anda!",
    APPLY_DISCOUNT_CODE: "Terapkan kode diskon",
    ENTER_DISCOUNT_CODE: "Masukkan kode diskon",
    APPLY_COUPON_DISCOUNT: "Terapkan",
    SHIPPING_DISCOUNT_FEE: "Diskon biaya pengiriman",
    YOU_CAN_CHOOSE_ONLY_ONE_DISCOUNT_CODE: "(Anda dapat memilih 1 kode diskon)",
    COUPON_DISCOUNT_CODE: "Kode diskon",
    MESSAGE_MIN_BUY_PRODUCT: "Produk {{product_name}} ({{option_name}}) harus membeli minimal {{min_buy}} produk!",
    MESSAGE_MAX_BUY_PRODUCT: "Produk {{product_name}} ({{option_name}}) hanya dapat dibeli hingga {{max_buy}} produk",
    MESSAGE_WARNING_IMPORT_FILE_DATA_SET: "Catatan: Data yang diunggah mungkin tidak lengkap jika bidang data dibiarkan kosong. Harap isi semua informasi dan operasi."
}, LadiPageScript.const.LANGms = {
    ALERT_TITLE: "Amaran",
    ALERT_BUTTON_TEXT: "OK",
    GET_CODE_BUTTON_TEXT: "Hantar semula kod",
    COPIED: "Disalin!",
    PASTED: "Tampal!",
    FAILED: "Gagal!",
    OPTION_NO_SELECT: "Kosong",
    OPTION_TRUE: "Ya",
    OPTION_FALSE: "Tidak",
    REQUEST_SEND_ERROR: "Ralat telah berlaku, sila cuba lagi!",
    FORM_LOGIN_SEND_ERROR: "Kunci anda tidak sah atau telah tamat tempoh!",
    FORM_VALIDATE_CHECKOUT_PRODUCT: "Sila pilih produk!",
    FORM_VALIDATE_CHECKOUT_PAYMENT: "Sila pilih kaedah pembayaran!",
    FORM_CHECKOUT_ORDER_CANCEL: "Pesanan anda dibatalkan!",
    FORM_SEND_DATA_NO_CONFIG: "Sila semak semula tetapan Borang anda!",
    FORM_UPLOAD_FILE_MAX_SIZE_ERROR: "Anda hanya boleh memuat naik fail dengan saiz maksimum {{max_size}}MB.",
    FORM_UPLOAD_FILE_MAX_LENGTH_ERROR: "Anda hanya boleh memuat naik {{max_length}} fail sekali gus.",
    FORM_CAPTCHA_ERROR: "Sila maklumkan kepada kami bahawa anda bukan robot!",
    FORM_CAPTCHA_LOADING: "Sila tunggu sementara kami menyemak identiti anda!",
    FORM_THANKYOU_MESSAGE_DEFAULT: "Terima kasih atas perhatian anda!",
    FORM_INPUT_REQUIRED_ERROR: "Sila masukkan semua maklumat yang diperlukan!",
    FORM_INPUT_COMMON_VALIDATE: "Format data yang baru dimasukkan tidak sah!",
    FORM_INPUT_NAME_ERROR: "Nama penuh melebihi panjang yang dibenarkan iaitu {{max_length}} aksara!",
    FORM_INPUT_MESSAGE_ERROR: "Mesej melebihi panjang yang dibenarkan iaitu {{max_length}} aksara!",
    FORM_INPUT_PHONE_ERROR: "Format nombor telefon tidak sah!",
    FORM_INPUT_EMAIL_ERROR: "Format e-mel tidak sah!",
    FORM_INPUT_LOCATE_ERROR: "Nama tempat yang baru dimasuki melebihi panjang yang dibenarkan. (Maksimum {{max_length}} aksara)!",
    FORM_INPUT_TYPE_TEXT_ERROR: "Medan maklumat {{field_name}} melebihi panjang yang dibenarkan iaitu {{max_length}} aksara!",
    FORM_INPUT_TYPE_NUMBER_ERROR: "Medan {{field_name}} mesti menggunakan format nombor!",
    FORM_INPUT_EMAIL_REGEX: "Sila masukkan format e-mel yang sah!",
    FORM_INPUT_TEXT_REGEX: "Sila masukkan dengan format yang sah!",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_CHECKOUT: "Sila pilih produk dan sediakan pembayaran untuk menggunakannya",
    SELECT_PRODUCT: "Pilih produk",
    PLEASE_SELECT_PRODUCT_DISPLAY_FORM_GALLERY: "Sila pilih produk dan sediakan pembayaran untuk menggunakannya",
    SETTING_PAYMENT: "Sediakan pembayaran",
    PRODUCT: "Produk",
    SERVICE: "Perkhidmatan",
    TICKET: "Tiket",
    EXPIRES_TITLE: "Halaman ditutup buat sementara waktu!",
    EXPIRES_DESC: "Halaman pendaratan tidak boleh diakses buat sementara waktu kerana tarikh tamat tempoh. Sila perbaharui akaun anda untuk memulihkan aktiviti.",
    REVIEW_TEXT_UNIT: "ulasan",
    REVIEW_TEXT_DESCRIPTION: "Ulasan Produk",
    REVIEW_TEXT_SORT_1: "Isih mengikut:",
    REVIEW_TEXT_SORT_2: "Terbaru",
    REVIEW_TEXT_OPERATOR_1: "Tapis mengikut:",
    REVIEW_TEXT_OPERATOR_2: "All Star",
    ADD_TO_CART_NO_CART: "Keranjang anda kosong",
    ADD_TO_CART_QUANTITY_REQUIRED: "Sila masukkan kuantiti anda!",
    ADD_TO_CART_NO_PRODUCT: "Maklumat tidak ditemui {{name}}, cuba lagi!",
    ADD_TO_CART_PRODUCT_REQUIRED: "Sila pilih {{name}}!",
    ADD_TO_CART_NO_QUANTITY: "{{name}} kehabisan stok!",
    ADD_TO_CART_MAX_QUANTITY: "Anda hanya boleh membeli dengan maksimum {{max}} {{name}}.",
    ADD_TO_CART_PRODUCT_BEFORE_START_DATE: "Ini bukan masa pembukaan {{name}} lagi!",
    ADD_TO_CART_PRODUCT_AFTER_END_DATE: "Masa pembukaan {{name}} telah tamat!",
    ADD_TO_CART_PRODUCT_ONLY_ONE: "Anda hanya boleh membeli sehingga 1 {{name}} sekali gus.",
    GAME_RESULT_MESSAGE: "Tahniah! Anda telah dikurniakan {{coupon_text}}. Sila masukkan kod kupon anda: {{coupon_code}}. Anda mempunyai baki {{spin_turn_left}} pusingan.",
    GAME_MAX_TURN_MESSAGE: "Anda kehabisan giliran.",
    HIDE_ELEMENT: "Sembunyikan elemen",
    SHOW_ELEMENT: "Tunjukkan elemen",
    TOP_ELEMENT: "Tarik Bahagian ke atas",
    SCROLL_ELEMENT: "Tatal ke Bahagian",
    SET_COOKIE: "Tambah Kuki",
    MESSAGE_NETWORK_ERROR: "Ralat rangkaian! Sila semak sambungan anda dan cuba sebentar lagi!",
    MESSAGE_NETWORK_HAS_CONNECT_BUT_NO_CODE_DATA: "Tidak dapat menghantar data! Sila semak dan cuba lagi sebentar lagi! Kod status HTTP: {{status}}",
    MESSAGE_WARNING_SELECT_PRODUCT_BUMP_OFFER: "Sila pilih produk utama sebelum memilih produk Bump Offer!",
    ELEMENT_NOT_FOUND: "Unsur tidak ditemui",
    NO_PRODUCTS_IN_CART: "Tiada produk dalam troli!",
    NOTIFICATION: "Pemberitahuan",
    MESSAGE_CONFIRM_DELETE_PRODUCT_IN_CART: "Adakah anda pasti mahu memadamkan produk daripada troli?",
    CANCEL: "Batal",
    CONFIRM: "Sahkan",
    PLEASE_SELECT_VARIANT_BEFORE_ADD_TO_CART: "Sila pilih variasi sebelum menambah produk ke troli!",
    PLEASE_SELECT_PRODUCT_VARIANT_YOU_WANT_TO_BELY: "Sila pilih varian produk yang anda ingin beli!",
    NOTHING_DISCOUNT_COUPON_CODE: "Belum ada kod diskaun!",
    PLEASE_SELECT_DISCOUNT_COUPON_CODE: "Sila pilih kod diskaun!",
    DISCOUNT_TYPE_ORDER_PRODUCT_IN_CART: "Diskaun {0} keseluruhan pesanan",
    DISCOUNT_TYPE_TAG_PRODUCT_IN_CART: "Diskaun {0} teg produk",
    DISCOUNT_TYPE_PRODUCT_IN_CART: "Diskaun pada {0} produk tertentu",
    DISCOUNT_VALUE_SHIPPING_FEE: "Diskaun {0} pada yuran penghantaran",
    PLEASE_CONFIGURE_YOUR_PRODUCT: "Sila konfigurasikan produk anda!",
    APPLY_DISCOUNT_CODE: "Gunakan kod diskaun",
    ENTER_DISCOUNT_CODE: "Masukkan kod diskaun",
    APPLY_COUPON_DISCOUNT: "Mohon",
    SHIPPING_DISCOUNT_FEE: "Yuran penghantaran diskaun",
    YOU_CAN_CHOOSE_ONLY_ONE_DISCOUNT_CODE: "(Anda boleh memilih 1 kod diskaun)",
    COUPON_DISCOUNT_CODE: "Kod diskaun",
    MESSAGE_MIN_BUY_PRODUCT: "Produk {{product_name}} ({{option_name}}) mesti membeli sekurang-kurangnya {{min_buy}} produk!",
    MESSAGE_MAX_BUY_PRODUCT: "Produk {{product_name}} ({{option_name}}) hanya boleh dibeli sehingga {{max_buy}} produk",
    MESSAGE_WARNING_IMPORT_FILE_DATA_SET: "Nota: Data yang dimuat naik mungkin tidak lengkap jika medan data dibiarkan kosong. Sila isi semua maklumat dan operasi."
};
