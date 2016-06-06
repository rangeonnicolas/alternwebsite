(function () {
  define('app.ini', [
  ], function () {
    var e;
    return e = {
      version: {
        main: 4,
        sub: 0
      },
      namespace: {
        prefix: '_Paletton',
        widgetPrefix: '_Paletton_Widget',
        prefixID: 'paletton'
      },
      cookie: {
        settings: 'Paletton',
        settingsExp: 35,
        returning: 'rv'
      },
      lang: {
        def: 'en',
        active: null,
        path: '/js/lang/',
        list: {
          en: {
            title: 'English',
            abbr: 'EN',
            enabled: !0
          },
          cs: {
            title: 'ÄŒesky',
            abbr: 'CS',
            enabled: !0
          },
          es: {
            title: 'EspaÃ±ol',
            abbr: 'ES',
            enabled: !1
          }
        }
      },
      urls: {
        'export': {
          url: 'export/index.php'
        },
        palette: {
          url: '/palette.php'
        },
        about: {
          url: 'http://www.colorschemedesigner.com/blog/usage/'
        },
        versions: {
          url: 'http://colorschemedesigner.com/previous/'
        },
        version_prev: {
          url: 'http://colorschemedesigner.com/csd-3.5/'
        },
        social_fb: {
          url: 'https://www.facebook.com/Paletton'
        },
        social_tw: {
          url: 'https://twitter.com/PalettonCom'
        },
        social_gplus: {
          url: 'https://plus.google.com/118420217375686132904'
        },
        link_widget: {
          url: '/widget/'
        },
        link_mobile: {
          url: '',
          str: 'app.header.mobile.desc'
        },
        link_more: {
          url: '',
          str: 'app.header.more.desc'
        },
        email: {
          url: 'info@paletton.com'
        }
      },
      GA: {
        view: {
          prefix: '/view/',
          title: 'App',
          def: 'default',
          presets: 'presets',
          wheel: 'wheel',
          example: 'example',
          coltable: 'coltable'
        },
        event: {
          enterRGB: 'Enter RGB',
          enterHue: 'Enter hue',
          enterDist: 'Enter angle',
          preset: 'Apply Preset',
          randomize: 'Randomize',
          preview: 'Set Preview',
          reset: 'Reset',
          converter: 'Vision sim.',
          adjust: 'Fine tuner',
          redirect: 'Redirect',
          language: 'Language switch'
        }
      }
    },
    e
  })
}).call(this),
function () {
  define('app.events', [
  ], function () {
    var e,
    t;
    return t = 'PALETTON',
    e = {
      init: function (e) {
        this.$rootElm = e
      },
      register: function (e, n) {
        if (!this.$rootElm) return;
        return this.$rootElm.on(t + ':' + e, n)
      },
      trigger: function (e, n) {
        if (!this.$rootElm) return;
        return this.$rootElm.triggerHandler(t + ':' + e, n)
      },
      listenMessages: function (t) {
        if (!this.$rootElm) return;
        return t = function (t) {
          if (!t || !t.data) return;
          return e.trigger(t.data.id, t.data.data)
        },
        window.addEventListener('message', t)
      },
      sendMessage: function (e, t, n, r) {
        var i;
        if (!this.$rootElm) return;
        return i = {
          id: n,
          data: r
        },
        e.postMessage(i, t)
      }
    },
    e
  })
}.call(this),
function () {
  define('app.locale', [
  ], function () {
    return function (e, t) {
      var n,
      r,
      i,
      s,
      o,
      u;
      try {
        n = e.split('.'),
        s = _Paletton_Strings;
        for (o = 0, u = n.length; o < u; o++) i = n[o],
        s = s[i];
        return t === 1 ? s.toLocaleLowerCase()  : t === 2 ? s.toLocaleUpperCase()  : s
      } catch (a) {
        return r = a,
        '???'
      }
    }
  })
}.call(this),
function () {
  define('app.history', [
    'app.events',
    'app.locale'
  ], function (e, t) {
    var n,
    r;
    return r = function (e) {
      var t;
      return t = window.location.href.split('#'),
      window.location.replace(t[0] + e)
    },
    n = {
      init: function () {
        var n,
        r;
        n = document.location.hash.substring(1),
        r = this,
        $(window).hashchange(function () {
          return r.processState()
        }),
        this.states = [
        ],
        this.blockedStates = [
        ],
        this.statePtr = - 1,
        this.maxPtr = - 1,
        e.register('history/setstate', function (e, t) {
          return r.setState(t)
        }),
        e.register('history/back', function () {
          return r.back()
        }),
        e.register('history/fwd', function () {
          return r.fwd()
        }),
        e.register('history/block', function () {
          return r.blockState()
        }),
        this.processState();
        if (n && n.indexOf('=') === - 1 && confirm(t('app.confirmOldUID'))) return e.trigger('app/dispatch', {
          id: 'version_prev',
          query: '#' + n
        })
      },
      getState: function () {
        var e,
        t;
        return t = document.location.hash.substring(1),
        e = this.parseHash(t),
        e
      },
      setState: function (e) {
        var t;
        if (this.statePtr < 0 || e.uid !== this.states[this.statePtr].uid) return this.maxPtr = ++this.statePtr,
        this.states[this.maxPtr] = e,
        t = this.getUrlByUID(e.uid),
        r(t)
      },
      gotoState: function (e) {
        var t,
        n;
        if (e >= 0 && e <= this.maxPtr) return this.statePtr = e,
        t = this.states[e],
        n = this.getUrlByUID(t.uid),
        r(n)
      },
      setDefaultState: function () {
      },
      blockState: function () {
        if (this.statePtr === - 1) return;
        return this.blockedStates[this.statePtr] = !0
      },
      processState: function () {
        var t;
        return t = this.getState(),
        t.uid ? this.statePtr < 0 && (this.statePtr = 0, this.states[0] = t)  : t = null,
        e.trigger('history/changed', {
          data: t
        })
      },
      getUrlByUID: function (e) {
        return e ? '#uid=' + e : ''
      },
      parseHash: function (e) {
        var t,
        n,
        r,
        i,
        s,
        o,
        u,
        a,
        f;
        n = e.split('&'),
        i = {
        };
        for (r = u = 0, a = n.length; u < a; r = ++u) t = n[r],
        f = t.split('='),
        s = f[0],
        o = f[1],
        i[s] = o;
        return i
      },
      hasBack: function () {
        return this.statePtr > 0 && !this.blockedStates[this.statePtr]
      },
      hasFwd: function () {
        return this.statePtr > - 1 && this.statePtr < this.maxPtr
      },
      back: function () {
        return this.gotoState(this.statePtr - 1)
      },
      fwd: function () {
        return this.gotoState(this.statePtr + 1)
      }
    },
    n
  })
}.call(this),
function () {
  define('util', [
  ], function () {
    var e,
    t,
    n,
    r,
    i,
    s,
    o,
    u;
    return s = function (e) {
      return $ && $.extend ? $.extend(!0, {
      }, e)  : n(e) ? t(e)  : r(e) ? u({
      }, e)  : e
    },
    t = function (e) {
      var t,
      n,
      r,
      i;
      t = [
      ];
      for (r = 0, i = e.length; r < i; r++) n = e[r],
      t.push(s(n));
      return t
    },
    u = function (e, s) {
      var o,
      a;
      if (!r(e)) return {
      };
      if (!r(s || i(s))) return e;
      for (o in s) a = s[o],
      n(a) ? e[o] = t(a)  : r(a) ? (r(e[o]) || (e[o] = {
      }), e[o] = u(e[o], a))  : e[o] = a;
      return e
    },
    r = function (e) {
      return e && e.constructor && e.constructor === Object
    },
    i = function (e) {
      var t;
      if (!r(e)) return !1;
      for (t in e) return !1;
      return !0
    },
    o = function (e, t) {
      return $ && $.extend ? $.extend({
      }, e, t)  : u(s(e), t)
    },
    n = function (e) {
      return $ && $.extend ? $.isArray(e)  : e === null || typeof e != 'object' ? !1 : toString.call(e) === '[object Array]'
    },
    e = {
      dec2hex: function (e, t) {
        var n;
        t || (t = 2),
        n = e.toString(16);
        while (n.length < t) n = '0' + n;
        return n.toUpperCase()
      },
      hex2dec: function (e) {
        return parseInt(e, 16)
      },
      hex2rgb: function (e) {
        var t,
        n,
        r;
        return e && e.match(/^\s*[0-9a-fA-F]{6}\s*$/) ? (r = this.hex2dec(e.substring(0, 2)), n = this.hex2dec(e.substring(2, 4)), t = this.hex2dec(e.substring(4, 6)), [
          r,
          n,
          t
        ])  : [
          0,
          0,
          0
        ]
      },
      intervalNorm: function (e, t, n) {
        return e < t ? t : e > n ? n : e
      },
      round: function (e, t) {
        var n;
        return n = Math.pow(10, t),
        Math.round(e * n) / n
      },
      rnd: function (e, t) {
        return e + Math.floor((t - e + 1) * Math.random())
      },
      rndSign: function () {
        return Math.random() < 0.5 ? 1 : - 1
      },
      rndBool: function () {
        return Math.random() < 0.5
      },
      angleNorm: function (e) {
        return e < 0 ? (e = - e, e %= 360, e = 360 - e)  : e %= 360,
        e
      },
      angleDiff: function (e, t) {
        var n,
        r;
        return n = this.angleNorm(e),
        r = this.angleNorm(t),
        r - n > 180 ? n += 360 : n - r > 180 && (r += 360),
        r - n
      },
      angleDiffRad: function (e, t) {
        var n,
        r;
        return n = this.rad2deg(e),
        r = this.rad2deg(t),
        this.deg2rad(this.angleDiff(n, r))
      },
      angleAdd: function (e, t) {
        var n;
        return n = e + t,
        this.angleNorm(n)
      },
      rad2deg: function (e) {
        return e * 180 / Math.PI
      },
      deg2rad: function (e) {
        return e * Math.PI / 180
      },
      xy2polar: function (e, t) {
        var n,
        r;
        return n = Math.sqrt(e * e + t * t),
        r = Math.atan2(t, e),
        r < 0 && (r += 2 * Math.PI),
        [
          n,
          r
        ]
      },
      polar2xy: function (e, t) {
        var n,
        r;
        return n = e * Math.cos(t),
        r = e * Math.sin(t),
        [
          n,
          r
        ]
      },
      normalizeCoords: function (e, t) {
        return [e[0] / t,
        e[1] / t]
      },
      unNormalizeCoords: function (e, t) {
        return [e[0] * t,
        e[1] * t]
      },
      objMerge: function (e, t) {
        return o(e, t)
      },
      objCopy: function (e) {
        return e === null ? null : n(e) ? e.slice()  : s(e)
      },
      myB64: {
        _key: '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ+',
        _pad: '0000000000000000',
        encodeInt: function (e, t) {
          var n,
          r,
          i;
          r = '',
          i = e,
          e || (r = '0');
          while (i) n = i & 63,
          r = this._key.charAt(n) + r,
          i >>= 6;
          return t && (r = this._pad + r, r = r.substring(r.length - t)),
          r
        },
        decodeInt: function (e) {
          var t,
          n,
          r,
          i,
          s;
          r = 0;
          if (!e) return 0;
          for (n = i = 0, s = e.length - 1; 0 <= s ? i <= s : i >= s; n = 0 <= s ? ++i : --i) r <<= 6,
          t = this._key.indexOf(e.charAt(n)),
          r |= t;
          return r
        },
        encodeFloat: function (e, t) {
          var n;
          return t || (t = 1),
          n = Math.round((Math.pow(64, t) - 1) * e),
          this.encodeInt(n, t)
        },
        decodeFloat: function (e, t, n) {
          var r,
          i,
          s;
          return i = this.decodeInt(e),
          i ? (s = i / (Math.pow(64, t) - 1), n && (r = Math.pow(10, n), s = Math.round(s * r) / r), s)  : 0
        },
        encodeFlags: function (e) {
          var t,
          n,
          r,
          i;
          r = 0;
          for (t = i = 0; i <= 5; t = ++i) !e[t] || (n = 1 << t, r |= n);
          return this.encodeInt(r, 1)
        },
        decodeFlags: function (e) {
          var t,
          n,
          r,
          i,
          s;
          i = this.decodeInt(e),
          t = [
          ];
          for (n = s = 0; s <= 5; n = ++s) r = 1 << n,
          t.push(!!(i & r));
          return t
        },
        isValidString: function (e) {
          var t,
          n,
          r;
          for (n = 0, r = e.length; n < r; n++) {
            t = e[n];
            if (this._key.indexOf(t) === - 1) return !1
          }
          return !0
        }
      },
      sendRequest: function (e, t, n, r) {
        var i,
        s,
        o,
        u;
        s = $('<form>', {
          action: e,
          method: t
        }),
        r && s.attr('target', r),
        $('body').append(s);
        for (o in n) u = n[o],
        i = $('<INPUT>', {
          type: 'hidden',
          name: o
        }),
        i.val(u),
        s.append(i);
        return s.submit(),
        s.remove()
      },
      colorTooltip: function (e) {
        return e.tooltip({
          position: {
            my: 'left+5 top+5',
            at: 'left bottom'
          },
          track: !0,
          show: {
            effect: 'fadeIn',
            delay: 0
          },
          hide: {
            effect: 'fadeOut',
            delay: 0
          },
          content: function () {
            return '<p>' + $(this).attr('title') + '</p><p class="info">Click for more info</p>'
          }
        })
      }
    },
    e
  })
}.call(this),
function () {
  define('color.hsv.class', [
    'util'
  ], function (e) {
    var t;
    return t = function () {
      function t(e, t, n) {
        this.set(e, t, n)
      }
      return t.prototype.set = function (e, t, n) {
        this.h = e,
        this.s = t,
        this.v = n
      },
      t.prototype.copy = function () {
        return new this(this.h, this.s, this.v)
      },
      t.prototype.setH = function (t) {
        return this.h = e.angleNormalize(t)
      },
      t.prototype.setS = function (t) {
        return this.s = e.intervalNorm(t, 0, 1)
      },
      t.prototype.setV = function (t) {
        return this.v = e.intervalNorm(t, 0, 1)
      },
      t
    }(),
    t
  })
}.call(this),
function () {
  define('color.cmyk.class', [
    'color.rgb.class',
    'util'
  ], function (e, t) {
    var n;
    return n = function () {
      function n(e, t, n, r) {
        this.set(e, t, n, r)
      }
      return n.prototype.set = function (e, t, n, r) {
        this.c = e,
        this.m = t,
        this.y = n,
        this.k = r
      },
      n.prototype.setByRGB = function (e) {
        var t,
        n,
        r,
        i,
        s,
        o,
        u;
        return n = 1 - e.r / 255,
        s = 1 - e.g / 255,
        u = 1 - e.b / 255,
        r = Math.min(n, Math.min(s, u)),
        r === 1 ? t = i = o = 0 : (t = (n - r) / (1 - r), i = (s - r) / (1 - r), o = (u - r) / (1 - r)),
        this.set(t, i, o, r)
      },
      n.prototype.toRGB = function () {
        var t,
        n,
        r;
        return r = 255 * (1 - this.c) * (1 - this.k),
        n = 255 * (1 - this.m) * (1 - this.k),
        t = 255 * (1 - this.y) * (1 - this.k),
        new e(r, n, t)
      },
      n.prototype.getTextPerc = function (e, n, r) {
        var i;
        return e || (e = 0),
        n ? (i = '', r == null && (r = 'â€“'))  : (i = 'Â %', r == null && (r = ' â€“ ')),
        t.round(this.c * 100, e) + i + r + t.round(this.m * 100, e) + i + r + t.round(this.y * 100, e) + i + r + t.round(this.k * 100, e) + i
      },
      n.prototype.copy = function () {
        return new this(this.l, this.a, this.b)
      },
      n
    }(),
    n
  })
}.call(this),
function () {
  define('color.lab.class', [
  ], function () {
    var e;
    return e = function () {
      function e(e, t, n) {
        this.set(e, t, n)
      }
      return e.prototype.set = function (e, t, n) {
        this.l = e,
        this.a = t,
        this.b = n
      },
      e.prototype.setByRGB = function (e) {
        var t,
        n,
        r,
        i,
        s,
        o;
        return r = e.r / 255,
        n = e.g / 255,
        t = e.b / 255,
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4)  : r / 12.92,
        r *= 100,
        n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4)  : n / 12.92,
        n *= 100,
        t = t > 0.04045 ? Math.pow((t + 0.055) / 1.055, 2.4)  : t / 12.92,
        t *= 100,
        i = r * 0.412424 + n * 0.357579 + t * 0.180464,
        s = r * 0.212656 + n * 0.715158 + t * 0.0721856,
        o = r * 0.0193324 + n * 0.119193 + t * 0.950444,
        i /= 95.047,
        s /= 100,
        o /= 108.883,
        i = i > 0.008856 ? Math.pow(i, 1 / 3)  : 7.787 * i + 16 / 116,
        s = s > 0.008856 ? Math.pow(s, 1 / 3)  : 7.787 * s + 16 / 116,
        o = o > 0.008856 ? Math.pow(o, 1 / 3)  : 7.787 * o + 16 / 116,
        this.set(116 * s - 16, 500 * (i - s), 200 * (s - o))
      },
      e.prototype.copy = function () {
        return new this(this.l, this.a, this.b)
      },
      e
    }(),
    e
  })
}.call(this),
function () {
  define('color.rgb.class', [
    'color.cmyk.class',
    'color.lab.class',
    'util'
  ], function (e, t, n) {
    var r;
    return r = function () {
      function r(e, t, n) {
        this.set(e, t, n)
      }
      return r.prototype.set = function (e, t, n) {
        return this.r = Math.round(e > 255 ? 255 : e > 0 ? e : 0),
        this.g = Math.round(t > 255 ? 255 : t > 0 ? t : 0),
        this.b = Math.round(n > 255 ? 255 : n > 0 ? n : 0)
      },
      r.prototype.setNormalized = function (e, t, n) {
        var r,
        i;
        return i = Math.max(e, t, n),
        i > 255 && (r = 255 / i, e = Math.round(e * r), t = Math.round(t * r), n = Math.round(n * r)),
        this.set(e, t, n)
      },
      r.prototype.setByHex = function (e) {
        var t,
        r,
        i,
        s;
        return s = n.hex2rgb(e),
        i = s[0],
        r = s[1],
        t = s[2],
        this.set(i, r, t)
      },
      r.prototype.copy = function () {
        return new r(this.r, this.g, this.b)
      },
      r.prototype.getCSS = function (e) {
        return e != null ? 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + e + ')' : 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')'
      },
      r.prototype.getTextVal = function (e) {
        return e == null && (e = 'â€“'),
        this.r + e + this.g + e + this.b
      },
      r.prototype.getTextPerc = function (e, t, r) {
        var i;
        return e || (e = 0),
        t ? (i = '', r == null && (r = 'â€“'))  : (i = 'Â %', r == null && (r = ' â€“ ')),
        n.round(this.r / 255 * 100, e) + i + r + n.round(this.g / 255 * 100, e) + i + r + n.round(this.b / 255 * 100, e) + i
      },
      r.prototype.getHex = function (e) {
        var t;
        return t = '',
        e && (t = '#'),
        t += n.dec2hex(this.r) + n.dec2hex(this.g) + n.dec2hex(this.b),
        t
      },
      r.prototype.getLum = function () {
        return (this.r * 0.299 + this.g * 0.587 + this.b * 0.114) / 255
      },
      r.prototype.getLumWCAG = function () {
        var e;
        return e = function (e) {
          var t;
          return t = e / 255,
          t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)
        },
        e(this.r) * 0.2126 + e(this.g) * 0.7152 + e(this.b) * 0.0722
      },
      r.prototype.getLAB = function () {
        var e;
        return e = new t(0, 0, 0),
        e.setByRGB(this),
        e
      },
      r.prototype.getCMYK = function () {
        var t;
        return t = new e(0, 0, 0, 0),
        t.setByRGB(this),
        t
      },
      r.prototype.getConverted = function (e, t) {
        return e(this, t)
      },
      r
    }(),
    r
  })
}.call(this),
function () {
  define('color.wheel', [
    'color.hsv.class',
    'color.rgb.class'
  ], function (e, t) {
    var n,
    r,
    i,
    s,
    o,
    u,
    a,
    f,
    l,
    c,
    h;
    return s = function (e, t, n) {
      return n === - 1 ? e : e + (t - e) / (1 + n)
    },
    i = function (e, t, n) {
      return n === - 1 ? t : t + (e - t) / (1 + n)
    },
    f = {
      r: {
        rgb: new t(255, 0, 0),
        hsv: new e(0, 1, 1)
      },
      rg: {
        rgb: new t(255, 255, 0),
        hsv: new e(120, 1, 1)
      },
      g: {
        rgb: new t(0, 255, 0),
        hsv: new e(180, 1, 0.8)
      },
      gb: {
        rgb: new t(0, 255, 255),
        hsv: new e(210, 1, 0.6)
      },
      b: {
        rgb: new t(0, 0, 255),
        hsv: new e(255, 0.85, 0.7)
      },
      br: {
        rgb: new t(255, 0, 255),
        hsv: new e(315, 1, 0.65)
      }
    },
    u = function (e) {
      return e < 120 ? h : e < 180 ? c : e < 210 ? a : e < 255 ? o : e < 315 ? n : r
    },
    h = {
      a: f.r,
      b: f.rg,
      f: function (e) {
        return e === 0 ? - 1 : Math.tan((120 - e) / 120 * Math.PI / 2) * 0.5
      },
      fi: function (e) {
        return e === - 1 ? 0 : 120 - Math.atan(e / 0.5) * 120 / Math.PI * 2
      },
      g: s,
      orderRGB: function (e, n, r) {
        return new t(e, n, r)
      }
    },
    c = {
      a: f.rg,
      b: f.g,
      f: function (e) {
        return e === 180 ? - 1 : Math.tan((e - 120) / 60 * Math.PI / 2) * 0.5
      },
      fi: function (e) {
        return e === - 1 ? 180 : 120 + Math.atan(e / 0.5) * 60 / Math.PI * 2
      },
      g: i,
      orderRGB: function (e, n, r) {
        return new t(n, e, r)
      }
    },
    a = {
      a: f.g,
      b: f.gb,
      f: function (e) {
        return e === 180 ? - 1 : Math.tan((210 - e) / 30 * Math.PI / 2) * 0.75
      },
      fi: function (e) {
        return e === - 1 ? 180 : 210 - Math.atan(e / 0.75) * 30 / Math.PI * 2
      },
      g: s,
      orderRGB: function (e, n, r) {
        return new t(r, e, n)
      }
    },
    o = {
      a: f.gb,
      b: f.b,
      f: function (e) {
        return e === 255 ? - 1 : Math.tan((e - 210) / 45 * Math.PI / 2) * 1.33
      },
      fi: function (e) {
        return e === - 1 ? 255 : 210 + Math.atan(e / 1.33) * 45 / Math.PI * 2
      },
      g: i,
      orderRGB: function (e, n, r) {
        return new t(r, n, e)
      }
    },
    n = {
      a: f.b,
      b: f.br,
      f: function (e) {
        return e === 255 ? - 1 : Math.tan((315 - e) / 60 * Math.PI / 2) * 1.33
      },
      fi: function (e) {
        return e === - 1 ? 255 : 315 - Math.atan(e / 1.33) * 60 / Math.PI * 2
      },
      g: s,
      orderRGB: function (e, n, r) {
        return new t(n, r, e)
      }
    },
    r = {
      a: f.br,
      b: f.r,
      f: function (e) {
        return e === 0 ? - 1 : Math.tan((e - 315) / 45 * Math.PI / 2) * 1.33
      },
      fi: function (e) {
        return e === - 1 ? 0 : 315 + Math.atan(e / 1.33) * 45 / Math.PI * 2
      },
      g: i,
      orderRGB: function (e, n, r) {
        return new t(e, r, n)
      }
    },
    l = {
      getBaseColorByHue: function (t) {
        var n,
        r,
        i,
        s;
        return t %= 360,
        n = u(t),
        r = n.f(t),
        s = n.g(n.a.hsv.v, n.b.hsv.v, r),
        i = n.g(n.a.hsv.s, n.b.hsv.s, r),
        new e(t, i, s)
      },
      hsv2rgb: function (e) {
        var t,
        n,
        r,
        i,
        s,
        o;
        return t = u(e.h),
        n = t.f(e.h),
        o = t.a.rgb,
        r = Math.max(o.r, Math.max(o.g, o.b)),
        r *= e.v,
        s = r * (1 - e.s),
        n === - 1 ? i = s : i = (r + s * n) / (1 + n),
        t.orderRGB(r, i, s)
      },
      rgb2hsv: function (t) {
        var i,
        s,
        u,
        f,
        l,
        p,
        d,
        v;
        return t.r === t.b && t.r === t.g ? (s = 0, d = 0, v = t.getLum())  : (f = Math.max(t.r, Math.max(t.g, t.b)), p = Math.min(t.r, Math.min(t.g, t.b)), f === t.r ? p === t.b ? (l = t.g, i = h)  : (l = t.b, i = r)  : f === t.g ? p === t.r ? (l = t.b, i = a)  : (l = t.r, i = c)  : p === t.r ? (l = t.g, i = o)  : (l = t.r, i = n), l === p ? u = - 1 : u = (f - l) / (l - p), s = i.fi(u), d = (f - p) / f, v = f / 255),
        new e(s, d, v)
      }
    },
    l
  })
}.call(this),
function () {
  define('color.presets', [
    'util'
  ], function (e) {
    var t,
    n,
    r,
    i,
    s;
    i = {
      'pale-light': {
        val: [
          [0.24649,
          1.78676],
          [
            0.09956,
            1.95603
          ],
          [
            0.17209,
            1.88583
          ],
          [
            0.32122,
            1.65929
          ],
          [
            0.39549,
            1.50186
          ]
        ]
      },
      'pastels-bright': {
        val: [
          [0.65667,
          1.86024],
          [
            0.04738,
            1.99142
          ],
          [
            0.39536,
            1.89478
          ],
          [
            0.90297,
            1.85419
          ],
          [
            1.86422,
            1.8314
          ]
        ]
      },
      shiny: {
        val: [
          [1.00926,
          2],
          [
            0.3587,
            2
          ],
          [
            0.5609,
            2
          ],
          [
            2,
            0.8502
          ],
          [
            2,
            0.65438
          ]
        ]
      },
      'pastels-lightest': {
        val: [
          [0.34088,
          1.09786],
          [
            0.13417,
            1.62645
          ],
          [
            0.23137,
            1.38072
          ],
          [
            0.45993,
            0.92696
          ],
          [
            0.58431,
            0.81098
          ]
        ]
      },
      'pastels-very-light': {
        val: [
          [0.58181,
          1.32382],
          [
            0.27125,
            1.81913
          ],
          [
            0.44103,
            1.59111
          ],
          [
            0.70192,
            1.02722
          ],
          [
            0.84207,
            0.91425
          ]
        ]
      },
      full: {
        val: [
          [1,
          1],
          [
            0.61056,
            1.24992
          ],
          [
            0.77653,
            1.05996
          ],
          [
            1.06489,
            0.77234
          ],
          [
            1.25783,
            0.60685
          ]
        ]
      },
      'pastels-light': {
        val: [
          [0.37045,
          0.90707],
          [
            0.15557,
            1.28367
          ],
          [
            0.25644,
            1.00735
          ],
          [
            0.49686,
            0.809
          ],
          [
            0.64701,
            0.69855
          ]
        ]
      },
      'pastels-med': {
        val: [
          [0.66333,
          0.8267],
          [
            0.36107,
            1.30435
          ],
          [
            0.52846,
            0.95991
          ],
          [
            0.78722,
            0.70882
          ],
          [
            0.91265,
            0.5616
          ]
        ]
      },
      darker: {
        val: [
          [0.93741,
          0.68672],
          [
            0.68147,
            0.88956
          ],
          [
            0.86714,
            0.82989
          ],
          [
            1.12072,
            0.5673
          ],
          [
            1.44641,
            0.42034
          ]
        ]
      },
      'pastels-mid-pale': {
        val: [
          [0.38302,
          0.68001],
          [
            0.15521,
            0.98457
          ],
          [
            0.26994,
            0.81586
          ],
          [
            0.46705,
            0.54194
          ],
          [
            0.64065,
            0.44875
          ]
        ]
      },
      pastels: {
        val: [
          [0.66667,
          0.66667],
          [
            0.33333,
            1
          ],
          [
            0.5,
            0.83333
          ],
          [
            0.83333,
            0.5
          ],
          [
            1,
            0.33333
          ]
        ]
      },
      'dark-neon': {
        val: [
          [0.94645,
          0.59068],
          [
            0.99347,
            0.91968
          ],
          [
            0.93954,
            0.7292
          ],
          [
            1.01481,
            0.41313
          ],
          [
            1.04535,
            0.24368
          ]
        ]
      },
      'pastels-dark': {
        val: [
          [0.36687,
          0.39819],
          [
            0.25044,
            0.65561
          ],
          [
            0.319,
            0.54623
          ],
          [
            0.55984,
            0.37953
          ],
          [
            0.70913,
            0.3436
          ]
        ]
      },
      'pastels-very-dark': {
        val: [
          [0.60117,
          0.41845],
          [
            0.36899,
            0.59144
          ],
          [
            0.42329,
            0.44436
          ],
          [
            0.72826,
            0.35958
          ],
          [
            0.88393,
            0.27004
          ]
        ]
      },
      dark: {
        val: [
          [1.31883,
          0.40212],
          [
            0.9768,
            0.25402
          ],
          [
            1.27265,
            0.30941
          ],
          [
            1.21289,
            0.60821
          ],
          [
            1.29837,
            0.82751
          ]
        ]
      },
      'pastels-mid-dark': {
        val: [
          [0.26952,
          0.22044],
          [
            0.23405,
            0.52735
          ],
          [
            0.23104,
            0.37616
          ],
          [
            0.42324,
            0.20502
          ],
          [
            0.54424,
            0.18483
          ]
        ]
      },
      'pastels-darkest': {
        val: [
          [0.53019,
          0.23973],
          [
            0.48102,
            0.50306
          ],
          [
            0.50001,
            0.36755
          ],
          [
            0.6643,
            0.32778
          ],
          [
            0.77714,
            0.3761
          ]
        ]
      },
      darkest: {
        val: [
          [1.46455,
          0.21042],
          [
            0.99797,
            0.16373
          ],
          [
            0.96326,
            0.274
          ],
          [
            1.56924,
            0.45022
          ],
          [
            1.23016,
            0.66
          ]
        ]
      },
      'almost black': {
        val: [
          [0.12194,
          0.15399],
          [
            0.34224,
            0.50742
          ],
          [
            0.24211,
            0.34429
          ],
          [
            0.31846,
            0.24986
          ],
          [
            0.52251,
            0.33869
          ]
        ]
      },
      'almost-gray-dark': {
        val: [
          [0.10266,
          0.24053],
          [
            0.13577,
            0.39387
          ],
          [
            0.11716,
            0.30603
          ],
          [
            0.14993,
            0.22462
          ],
          [
            0.29809,
            0.19255
          ]
        ]
      },
      'almost-gray-darker': {
        val: [
          [0.07336,
          0.36815],
          [
            0.18061,
            0.50026
          ],
          [
            0.09777,
            0.314
          ],
          [
            0.12238,
            0.25831
          ],
          [
            0.14388,
            0.1883
          ]
        ]
      },
      'almost-gray-mid': {
        val: [
          [0.07291,
          0.59958],
          [
            0.19602,
            0.74092
          ],
          [
            0.10876,
            0.5366
          ],
          [
            0.15632,
            0.48229
          ],
          [
            0.20323,
            0.42268
          ]
        ]
      },
      'almost-gray-lighter': {
        val: [
          [0.06074,
          0.82834],
          [
            0.14546,
            0.97794
          ],
          [
            0.10798,
            0.76459
          ],
          [
            0.15939,
            0.68697
          ],
          [
            0.22171,
            0.62926
          ]
        ]
      },
      'almost-gray-light': {
        val: [
          [0.03501,
          1.59439],
          [
            0.23204,
            1.10483
          ],
          [
            0.14935,
            1.33784
          ],
          [
            0.07371,
            1.04897
          ],
          [
            0.09635,
            0.91368
          ]
        ]
      }
    },
    r = [
    ];
    for (t in i) n = i[t],
    r.push(t);
    return s = {
      presetList: i,
      getPresetCount: function () {
        return r.length
      },
      getPresetId: function (e) {
        return r[e]
      }
    },
    s
  })
}.call(this),
function () {
  define('color.class', [
    'color.rgb.class',
    'color.hsv.class',
    'color.wheel',
    'util'
  ], function (e, t, n, r) {
    var i;
    return i = function () {
      function e(e) {
        this._setHue(e),
        this._setSV(0, 0),
        this.hsv = new t(0, 0, 0),
        this._update()
      }
      return e.prototype._setHue = function (e) {
        return e = Math.round(r.angleNorm(e)),
        this.baseHSV = n.getBaseColorByHue(e)
      },
      e.prototype._setSV = function (e, t) {
        return this.kS = r.intervalNorm(e, 0, 2),
        this.kV = r.intervalNorm(t, 0, 2)
      },
      e.prototype._update = function () {
        var e;
        return e = function (e, t) {
          return t <= 1 ? e * t : e + (1 - e) * (t - 1)
        },
        this.hsv.set(this.baseHSV.h, e(this.baseHSV.s, this.kS), e(this.baseHSV.v, this.kV)),
        this.rgb = n.hsv2rgb(this.hsv)
      },
      e.prototype.setHue = function (e) {
        return this._setHue(e),
        this._update()
      },
      e.prototype.setSV = function (e, t) {
        return this._setSV(e, t),
        this._update()
      },
      e.prototype.setByHSV = function (e) {
        var t,
        n,
        r;
        return t = function (e, t) {
          return e === 0 ? 0 : t <= e ? t / e : (t - e) / (1 - e) + 1
        },
        this._setHue(e.h),
        n = t(this.baseHSV.s, e.s),
        r = t(this.baseHSV.v, e.v),
        this._setSV(n, r),
        this._update()
      },
      e.prototype.setByRGB = function (e) {
        return this.setByHSV(n.rgb2hsv(e))
      },
      e.prototype.rotate = function (e) {
        var t;
        return t = r.angleAdd(this.baseHSV.h, e),
        this.setHue(t)
      },
      e.prototype.getCSS = function (e) {
        return this.rgb.getCSS(e)
      },
      e.prototype.getTextVal = function (e) {
        return this.rgb.getTextVal(e)
      },
      e.prototype.getTextPerc = function (e, t, n) {
        return this.rgb.getTextPerc(e, t, n)
      },
      e.prototype.getHex = function (e) {
        return this.rgb.getHex(e)
      },
      e.prototype.getLum = function () {
        return this.rgb.getLum()
      },
      e.prototype.getLumWCAG = function () {
        return this.rgb.getLumWCAG()
      },
      e.prototype.getCMYK = function () {
        return this.rgb.getCMYK()
      },
      e.prototype.getTextCMYK = function (e, t, n) {
        var r;
        return r = this.rgb.getCMYK(),
        r.getTextPerc(e, t, n)
      },
      e.prototype.getConverted = function (e, t) {
        return this.rgb.getConverted(e, t)
      },
      e
    }(),
    i
  })
}.call(this),
function () {
  define('color.models.class', [
    'util',
    'color.class'
  ], function (e, t) {
    var n,
    r,
    i,
    s,
    o,
    u,
    a,
    f,
    l,
    c;
    return l = function (t) {
      return e.angleAdd(t, 180)
    },
    u = function (t, n) {
      return e.angleAdd(t, n)
    },
    o = function (t, n) {
      return e.angleAdd(t, - n)
    },
    f = function (t, n) {
      return e.angleAdd(t + 180, n)
    },
    a = function (t, n) {
      return e.angleAdd(t + 180, - n)
    },
    s = function (e) {
      return e < 0 ? - e : e
    },
    i = function (e) {
      return e < 0 ? 180 + e : 180 - e
    },
    r = function (e) {
      return e < 0 ? - e : 180 - e
    },
    n = function () {
      function t(e, t, n, r) {
        this.fnGetCompl = e,
        this.fnGetSecCW = t,
        this.fnGetSecCCW = n,
        this.fnFixAngle = r,
        this.minD = 5,
        this.maxD = 175,
        this.swapped = !1
      }
      return t.prototype.getAngle = function (t) {
        return this.fnFixAngle && (t = this.fnFixAngle(t)),
        e.intervalNorm(t, this.minD, this.maxD)
      },
      t.prototype.getComplement = function (e) {
        return this.fnGetCompl ? this.fnGetCompl(e)  : null
      },
      t.prototype.swapSecs = function () {
        return this.swapped = !this.swapped
      },
      t.prototype.getSec1 = function (t, n) {
        var r;
        return r = this.fnGetSecCW,
        this.swapped && (r = this.fnGetSecCCW),
        r ? r(t, e.intervalNorm(n, this.minD, this.maxD))  : null
      },
      t.prototype.getSec2 = function (t, n) {
        var r;
        return r = this.fnGetSecCCW,
        this.swapped && (r = this.fnGetSecCW),
        r ? r(t, e.intervalNorm(n, this.minD, this.maxD))  : null
      },
      t
    }(),
    c = {
      mono: new n(null, null, null, null),
      monocompl: new n(l, null, null, null),
      triad: new n(null, f, a, i),
      triadcompl: new n(l, f, a, i),
      analog: new n(null, u, o, s),
      analogcompl: new n(l, u, o, s),
      tetrad: new n(l, u, f, r)
    },
    c
  })
}.call(this),
function () {
  define('geometry.point.class', [
    'util'
  ], function (e) {
    var t;
    return t = function () {
      function t(e) {
        this.plane = e,
        this.x = 0,
        this.y = 0,
        this.r = 0,
        this.theta = 0,
        this.limit = {
          type: 'radius',
          value: {
            min: 0,
            max: 1
          }
        }
      }
      return t.prototype.setLimit = function (e) {
        this.limit = e
      },
      t.prototype.setXY = function (t, n) {
        var r;
        return this.x = t,
        this.y = n,
        r = e.xy2polar(this.x, this.y),
        this.r = r[0],
        this.theta = r[1],
        r
      },
      t.prototype.setPolar = function (t, n) {
        var r;
        return this.r = t,
        n > 2 * Math.PI && (n -= 2 * Math.PI),
        n < 0 && (n += 2 * Math.PI),
        this.theta = n,
        r = e.polar2xy(this.r, this.theta),
        this.x = r[0],
        this.y = r[1],
        r
      },
      t.prototype.getSqrXY = function (t) {
        var n,
        r,
        i;
        return t || (t = 1),
        i = this.getSqrPolar(),
        n = i[0],
        r = i[1],
        e.polar2xy(n / t, r)
      },
      t.prototype.setSqrXY = function (t, n, r) {
        var i,
        s,
        o;
        return r || (r = 1),
        o = e.xy2polar(t, n),
        i = o[0],
        s = o[1],
        this.setSqrPolar(i * r, s)
      },
      t.prototype.getSqrPolar = function () {
        var e;
        return e = Math.max(Math.abs(Math.sin(this.theta)), Math.abs(Math.cos(this.theta))),
        [
          this.r / e,
          this.theta
        ]
      },
      t.prototype.setSqrPolar = function (e, t) {
        var n;
        return n = Math.max(Math.abs(Math.sin(t)), Math.abs(Math.cos(t))),
        this.setPolar(e * n, t)
      },
      t.prototype.getXY = function () {
        return [this.x,
        this.y]
      },
      t.prototype.getPolar = function () {
        return [this.r,
        this.theta]
      },
      t.prototype.getCopy = function () {
        var e;
        return e = new t,
        e.x = this.x,
        e.y = this.y,
        e.r = this.r,
        e.theta = this.theta,
        e
      },
      t.prototype.getLimited = function () {
        var e;
        return this.limit ? (e = new t(this.plane), e.setXY(this.x, this.y), e.setLimit(this.limit), e.doLimit(), e)  : this
      },
      t.prototype.getCanvasPos = function () {
        return this.plane.getCanvasPos(this.x, this.y)
      },
      t.prototype.getPagePos = function () {
        return this.plane.getPagePos(this.x, this.y)
      },
      t.prototype.setXYByCanvasPos = function (e) {
        var t;
        return t = this.plane.getXYbyCanvasPos(e),
        this.setXY(t.x, t.y)
      },
      t.prototype.setXYByPagePos = function (e) {
        var t;
        return t = this.plane.getXYbyPagePos(e),
        this.setXY(t.x, t.y)
      },
      t.prototype.doLimit = function () {
        var e,
        t,
        n;
        if (this.limit.type === 'radius') return e = Math.min(Math.max(this.r, this.limit.value.min), this.limit.value.max),
        this.setPolar(e, this.theta, !0);
        if (this.limit.type === 'bounds') return t = Math.min(Math.max(this.x, this.limit.value.xMin), this.limit.value.xMax),
        n = Math.min(Math.max(this.y, this.limit.value.yMin), this.limit.value.yMax),
        this.setXY(t, n, !0)
      },
      t.prototype.getDistance = function (e) {
        var t,
        n;
        return t = this.x - e.x,
        n = this.y - e.y,
        Math.sqrt(t * t + n * n)
      },
      t.prototype.getAngle = function (e, n) {
        var r,
        i,
        s;
        return i = new t(this.plane),
        s = new t(this.plane),
        i.setXY(e.x - this.x, e.y - this.y),
        s.setXY(n.x - this.x, n.y - this.y),
        r = i.theta - s.theta
      },
      t
    }(),
    t
  })
}.call(this),
function () {
  define('lib.point.follower', [
  ], function () {
    var e,
    t,
    n;
    return t = function () {
      function t(e, t) {
        this.x = Math.max( - 1, Math.min(1, e)),
        this.y = Math.max( - 1, Math.min(1, t))
      }
      return t.prototype.toDef = function () {
        var t,
        n,
        r,
        i,
        s;
        return r = this.rot_z(Math.PI / 4),
        r.x < 1 ? (t = r.y / Math.sqrt(1 - r.x * r.x), t = Math.max( - 1, Math.min(1, t)), i = Math.asin(t))  : i = 0,
        r.y < 1 ? (n = r.x, n = Math.max( - 1, Math.min(1, n)), s = Math.asin(n))  : s = 0,
        new e(s, i)
      },
      t.prototype.rot_z = function (e) {
        return new t(this.x * Math.cos(e) + this.y * Math.sin(e), - this.x * Math.sin(e) + this.y * Math.cos(e))
      },
      t
    }(),
    e = function () {
      function e(e, t) {
        this.psi = e,
        this.phi = t
      }
      return e.prototype.toLoc = function () {
        var e,
        n,
        r,
        i,
        s;
        return r = Math.min(Math.max(this.psi, - Math.PI / 2), Math.PI / 2),
        n = Math.min(Math.max(this.phi, - Math.PI / 2), Math.PI / 2),
        i = Math.sin(r),
        s = Math.sin(n) * Math.cos(r),
        e = new t(i, s),
        e.rot_z( - Math.PI / 4)
      },
      e.prototype.rot_x = function (t) {
        var n,
        r;
        return n = Math.cos(this.psi),
        r = n ? (this.phi / n + t) * n : this.phi,
        new e(this.psi, r)
      },
      e.prototype.rot_y = function (t) {
        return new e(this.psi + t, this.phi)
      },
      e
    }(),
    n = {
      createLoc: function (e, n) {
        return new t(e, n)
      },
      createDef: function (t, n) {
        return new e(t, n)
      },
      getLoc: function (e, t) {
        return t.rot_x(e.toDef().phi).rot_y(e.toDef().psi).toLoc()
      },
      getDef: function (e, t) {
        return t.toDef().rot_y( - e.toDef().psi).rot_x( - e.toDef().phi)
      }
    },
    n
  })
}.call(this),
function () {
  define('color.variator1.class', [
    'color.wheel',
    'color.presets',
    'geometry.point.class',
    'lib.point.follower',
    'app.events',
    'util'
  ], function (e, t, n, r, i, s) {
    var o,
    u;
    return u = [
      [0.66667,
      0.66667],
      [
        0.33333,
        1
      ],
      [
        0.5,
        0.83333
      ],
      [
        0.83333,
        0.5
      ],
      [
        1,
        0.33333
      ]
    ],
    o = function () {
      function e(e, t, n) {
        var r,
        i;
        this.palette = e,
        r = {
          treshold: 0.5,
          minDistance: 0.05,
          onChange: null
        },
        i = this,
        this.options = s.objMerge(r, n),
        this.defs = [
        ],
        this.point = [
        ],
        this.values = [
        ],
        this.setPreset(t),
        this.inited = !0
      }
      return e.prototype.getVal = function (e) {
        return this.values[e]
      },
      e.prototype.getVals = function (e) {
        return s.objCopy(this.values)
      },
      e.prototype.setVals = function (e) {
        return this.values = e,
        this.calcPoints()
      },
      e.prototype.setValsTransformed = function (e) {
        var t,
        n,
        r,
        i,
        s;
        r = [
        ];
        for (t = i = 0, s = e.length; i < s; t = ++i) n = e[t],
        r.push(this.getValueTransform(n[0], n[1]));
        return this.setVals(r)
      },
      e.prototype.getDef = function (e) {
        return this.defs[e]
      },
      e.prototype.setDef = function (e, t) {
        return this.defs[e] = t
      },
      e.prototype.getPoint = function (e) {
        return this.point[e]
      },
      e.prototype.getSerialized = function () {
        var e,
        t,
        n,
        r,
        i,
        o;
        t = '',
        o = this.values;
        for (e = r = 0, i = o.length; r < i; e = ++r) n = o[e],
        t += s.myB64.encodeFloat(n[0] / 2, 2),
        t += s.myB64.encodeFloat(n[1] / 2, 2);
        return t
      },
      e.prototype.setSerialized = function (e) {
        var t,
        n,
        r,
        i;
        r = [
        ];
        for (t = i = 0; i <= 4; t = ++i) r[t] = [
        ],
        n = e.substring(t * 4, t * 4 + 2),
        r[t][0] = s.myB64.decodeFloat(n, 2, 6) * 2,
        n = e.substring(t * 4 + 2, t * 4 + 4),
        r[t][1] = s.myB64.decodeFloat(n, 2, 6) * 2;
        return this.setVals(r)
      },
      e.prototype.setMainVal = function (e) {
        var t;
        return t = this.valToPoint(e),
        this.moveMain(t.x, t.y)
      },
      e.prototype.setValueTransform = function (e, t) {
        var n,
        r,
        i,
        s;
        return r = this.options.treshold,
        n = function (e) {
          return e < 1 ? e * (r + 1) - 1 : (e - 1) * (1 - r) + r
        },
        i = n(e),
        s = n(t),
        [
          i,
          - s
        ]
      },
      e.prototype.getValueTransform = function (e, t) {
        var n,
        r,
        i,
        o;
        return r = this.options.treshold,
        n = function (e) {
          return e < r ? (e + 1) / (r + 1)  : (e - r) / (1 - r) + 1
        },
        i = s.round(n(e), 5),
        o = s.round(n( - t), 5),
        [
          i,
          o
        ]
      },
      e.prototype.valToPoint = function (e) {
        var t,
        r,
        i,
        s;
        return s = this.setValueTransform(e[0], e[1]),
        r = s[0],
        i = s[1],
        t = new n(null),
        t.setSqrXY(r, i, this.radius),
        t
      },
      e.prototype.pointToVal = function (e) {
        var t,
        n,
        r;
        return r = e.getLimited().getSqrXY(this.radius),
        t = r[0],
        n = r[1],
        this.getValueTransform(t, n)
      },
      e.prototype.calcVals = function () {
        var e,
        t,
        n;
        n = [
        ];
        for (e = t = 0; t <= 4; e = ++t) n.push(this.values[e] = this.pointToVal(this.point[e]));
        return n
      },
      e.prototype.calcPoints = function () {
        var e,
        t,
        n,
        i,
        s;
        s = [
        ];
        for (e = i = 0; i <= 4; e = ++i) this.point[e] = this.valToPoint(this.values[e]),
        e === 0 ? s.push(n = this.pointToLoc(this.point[0]))  : (t = this.pointToLoc(this.point[e]), s.push(this.setDef(e, r.getDef(n, t))));
        return s
      },
      e.prototype.pointToLoc = function (e) {
        return r.createLoc(e.x, e.y)
      },
      e.prototype.locToPoint = function (e, t) {
        return e.setXY(t.x, t.y)
      },
      e.prototype.moveMain = function (e, t, n) {
        var i,
        s,
        o,
        u;
        this.point[0].setXY(e, t),
        this.point[0].doLimit(),
        o = this.pointToLoc(this.point[0]);
        for (i = u = 1; u <= 4; i = ++u) n ? (s = this.pointToLoc(this.point[i]), this.setDef(i, r.getDef(o, s)))  : (s = r.getLoc(o, this.getDef(i)), this.locToPoint(this.point[i], s));
        return this.calcVals(),
        this.onChange()
      },
      e.prototype.moveSec = function (e, t, n, i) {
        var s,
        o,
        u,
        a,
        f,
        l,
        c,
        h;
        if (i) return this.point[e].setXY(t, n),
        this.point[e].doLimit(),
        l = this.pointToLoc(this.point[0]),
        f = this.pointToLoc(this.point[e]),
        this.setDef(e, r.getDef(l, f)),
        this.calcVals(),
        this.onChange();
        c = this.point[e].getCopy(),
        h = this.point[e].getCopy(),
        h.setXY(t, n),
        h.doLimit(),
        o = this.point[0].getDistance(c),
        u = this.point[0].getDistance(h),
        o < this.options.minDistance && (o = this.options.minDistance),
        u < this.options.minDistance && (u = this.options.minDistance),
        s = this.point[0].getAngle(h, c),
        a = o > 0 ? u / o : 1;
        if (u < 1) return this.rotate(s, a)
      },
      e.prototype.rotate2 = function (e, t) {
        var n,
        i,
        s,
        o,
        u,
        a;
        u = this.point[0],
        s = this.pointToLoc(u),
        console.log('rotate:');
        for (n = a = 1; a <= 4; n = ++a) o = this.point[n],
        o.setXY(o.x - u.x, o.y - u.y),
        o.setPolar(o.r * t, o.theta + e),
        o.setXY(o.x + u.x, o.y + u.y),
        i = this.pointToLoc(o),
        console.log(n, t, o.r, o.theta),
        this.setDef(n, r.getDef(s, i));
        return this.calcVals(),
        this.onChange()
      },
      e.prototype.rotate = function (e, t) {
        var n,
        i,
        s,
        o,
        u,
        a,
        f;
        a = this.point[0].getCopy(),
        this.point[0].setXY(0, 0),
        s = this.pointToLoc(this.point[0]);
        for (n = f = 1; f <= 4; n = ++f) o = this.point[n],
        u = o.getCopy(),
        i = r.getLoc(s, this.getDef(n)),
        this.locToPoint(o, i),
        o.setPolar(o.r * t, o.theta + e),
        i = this.pointToLoc(o),
        this.setDef(n, r.getDef(s, i));
        return this.moveMain(a.x, a.y, !1)
      },
      e.prototype.setPreset = function (e) {
        return t.presetList[e] != null ? this.setVals(s.objCopy(t.presetList[e].val))  : this.setVals(s.objCopy(u)),
        this.onChange()
      },
      e.prototype.addSaturation = function (e) {
        return this.moveMain(this.point[0].x + e, this.point[0].y)
      },
      e.prototype.addBright = function (e) {
        return this.moveMain(this.point[0].x, this.point[0].y - e)
      },
      e.prototype.addContrast = function (e) {
        return e /= 100,
        this.rotate(0, e)
      },
      e.prototype.onChange = function () {
        if (this.inited) return this.palette.varsChanged()
      },
      e
    }(),
    o
  })
}.call(this),
function () {
  define('color.convert', [
    'color.rgb.class',
    'util'
  ], function (e, t) {
    var n,
    r;
    return n = {
      protanope: {
        x: 0.7465,
        y: 0.2535,
        m: 1.273463,
        yint: - 0.073894
      },
      deuteranope: {
        x: 1.4,
        y: - 0.4,
        m: 0.968437,
        yint: 0.003331
      },
      tritanope: {
        x: 0.1748,
        y: 0,
        m: 0.062921,
        yint: 0.292119
      }
    },
    r = {
      convert: function (r, i) {
        var s,
        o,
        u,
        a,
        f,
        l,
        c,
        h,
        p,
        d,
        v,
        m,
        g,
        y,
        b,
        w,
        E,
        S,
        x,
        T,
        N,
        C,
        k,
        L,
        A,
        O,
        M,
        _,
        D,
        P,
        H,
        B,
        j,
        F,
        I,
        q,
        R,
        U,
        z,
        W;
        return g = {
          type: 'none',
          amount: 1
        },
        B = t.objMerge(g, i),
        z = B.type,
        f = B.amount,
        f > 1 && (f = 1),
        f < 0 && (f = 0),
        U = r.r,
        R = r.g,
        q = r.b,
        C = U,
        w = C,
        m = C,
        z === 'webcolor' ? (C = Math.round(U / 51) * 51, w = Math.round(R / 51) * 51, m = Math.round(q / 51) * 51, new e(C, w, m))  : z === 'gamma' ? (O = f * 3, C = 255 * Math.pow(U / 255, O), w = 255 * Math.pow(R / 255, O), m = 255 * Math.pow(q / 255, O), new e(C >> 0, w >> 0, m >> 0))  : z === 'gray' ? (_ = Math.round(r.getLum() * 255), C = U * (1 - f) + _ * f, w = R * (1 - f) + _ * f, m = q * (1 - f) + _ * f, new e(C >> 0, w >> 0, m >> 0))  : z === 'achromatope' ? (C = U * 0.212656 + R * 0.715158 + q * 0.072186, C = U * (1 - f) + C * f, w = R * (1 - f) + C * f, m = q * (1 - f) + C * f, new e(C >> 0, w >> 0, m >> 0))  : (z === 'custom' ? (p = B.x, d = B.y, h = B.m, v = B.yint)  : (M = n[B.type]) ? (p = M.x, d = M.y, h = M.m, v = M.yint)  : z = 'none', B.type === 'none' ? r : (I = Math.pow(U, 2.2), F = Math.pow(R, 2.2), j = Math.pow(q, 2.2), s = I * 0.412424 + F * 0.357579 + j * 0.180464, o = I * 0.212656 + F * 0.715158 + j * 0.0721856, u = I * 0.0193324 + F * 0.119193 + j * 0.950444, l = s / (s + o + u), c = o / (s + o + u), D = (c - d) / (l - p), W = c - l * D, y = (v - W) / (D - h), b = D * y + W, s = y * o / b, u = (1 - (y + b)) * o / b, P = 0.312713 * o / 0.329016, H = 0.358271 * o / 0.329016, E = P - s, S = H - u, N = E * 3.24071 + S * - 0.498571, T = E * - 0.969258 + S * 0.0415557, x = E * 0.0556352 + S * 1.05707, C = s * 3.24071 + o * - 1.53726 + u * - 0.498571, w = s * - 0.969258 + o * 1.87599 + u * 0.0415557, m = s * 0.0556352 + o * - 0.203996 + u * 1.05707, A = ((C < 0 ? 0 : 1) - C) / N, L = ((w < 0 ? 0 : 1) - w) / T, k = ((m < 0 ? 0 : 1) - m) / x, a = Math.max(A > 1 || A < 0 ? 0 : A, L > 1 || L < 0 ? 0 : L, k > 1 || k < 0 ? 0 : k), C += a * N, w += a * T, m += a * x, C = Math.pow(C, 1 / 2.2), w = Math.pow(w, 1 / 2.2), m = Math.pow(m, 1 / 2.2), C = U * (1 - f) + C * f, w = R * (1 - f) + w * f, m = q * (1 - f) + m * f, new e(C >> 0, w >> 0, m >> 0)))
      }
    },
    r
  })
}.call(this),
function () {
  define('ui.control.palette.class', [
    'app.events',
    'util'
  ], function (e, t) {
    var n;
    return n = function () {
      function n(n, r, i) {
        var s,
        o;
        this.palette = n,
        this.$container = r,
        s = {
          className: '',
          asStatic: !1
        },
        this.options = t.objMerge(s, i),
        o = this,
        this.options.asStatic || (e.register('palette/colors/changed', function () {
          return o.colorize()
        }), e.register('palette/model/changed', function () {
          return o.draw()
        })),
        this.draw()
      }
      return n.prototype.draw = function () {
        var e,
        t,
        n,
        r,
        i,
        s;
        return s = this,
        this.$e = $('<DIV>', {
          'class': 'control-palette ' + this.options.className
        }),
        this.$container.empty().append(this.$e),
        t = $('<TABLE>'),
        this.$e.append(t),
        e = $('<TBODY>'),
        t.append(e),
        n = $('<TR>'),
        e.append(n),
        r = function (e) {
          var t,
          r,
          i,
          o,
          u,
          a;
          r = $('<TD>', {
            'class': 'bgcol-' + e + '-0'
          }),
          s.options.asStatic && (i = s.palette.colorTable.sorted[e][0], r.css('background', i.getCSS())),
          n.append(r),
          a = [
          ];
          for (o = u = 1; u <= 4; o = ++u) t = $('<SPAN>', {
            'class': 'var var-' + o + ' bgcol-' + e + '-' + o
          }),
          r.append(t),
          s.options.asStatic ? (i = s.palette.colorTable.sorted[e][o], a.push(t.css('background', i.getCSS())))  : a.push(void 0);
          return a
        },
        r('pri'),
        this.palette.hasSecs() && (r('sec1'), r('sec2')),
        this.palette.hasCompl() && r('compl'),
        i = this.palette.getColCnt(),
        n.find('.bgcol-pri-0').addClass('span' + (5 - i))
      },
      n.prototype.colorize = function () {
        return e.trigger('palette/colorize', {
          $e: this.$e,
          sorted: !0,
          converted: !1
        })
      },
      n
    }(),
    n
  })
}.call(this),
function () {
  define('ui.control.dialog.class', [
    'util'
  ], function (e) {
    var t;
    return t = function () {
      function t(t, n, r) {
        var i,
        s;
        this.$parent = t,
        i = {
          className: '',
          title: '',
          width: 300,
          height: 'auto',
          modal: !0,
          draggable: !0,
          resizable: !1,
          autoOpen: !0,
          buttons: null,
          destroyOnClose: !0,
          onClose: null,
          position: {
            my: 'center',
            at: 'center',
            of: this.$parent
          }
        };
        if (!this.$parent) return;
        s = this,
        this.options = e.objMerge(i, r),
        this.dlgInited = !1,
        this.$e = $('<DIV>', {
          'class': 'control control-dlg ' + this.options.className
        }),
        this.$parent.append(this.$e),
        this.$e.append(n),
        this.$e.dialog({
          title: this.options.title,
          modal: this.options.modal,
          width: this.options.width,
          height: this.options.height,
          draggable: this.options.draggable,
          resizable: this.options.resizable,
          autoOpen: this.options.autoOpen,
          buttons: this.options.buttons,
          position: this.options.position,
          close: function () {
            var e;
            typeof (e = s.options).onClose == 'function' && e.onClose();
            if (s.options.destroyOnClose) return $(this).dialog('destroy'),
            s.dlgInited = !1,
            s.$e.remove()
          }
        }),
        this.dlgInited = !0
      }
      return t.prototype.open = function () {
        if (this.dlgInited) return this.$e.dialog('open')
      },
      t.prototype.close = function () {
        if (this.dlgInited) return this.$e.dialog('close')
      },
      t
    }(),
    t
  })
}.call(this),
function () {
  define('ui.control.paletteimg.class', [
    'app.events',
    'app.locale',
    'util',
    'ui.control.palette.class',
    'ui.control.dialog.class'
  ], function (e, t, n, r, i) {
    var s;
    return s = function () {
      function e(e, r, s) {
        var o,
        u,
        a,
        f,
        l;
        this.palette = e,
        this.$parent = r,
        a = {
          somethin: null
        };
        if (!this.$parent) return;
        l = this,
        this.options = n.objMerge(a, s),
        o = $('<DIV>'),
        f = new i(this.$parent, o, {
          className: 'dlg-paletteimg',
          title: t('palette.img.title'),
          width: 450,
          modal: !0,
          position: {
            my: 'center',
            at: 'center',
            of: this.$parent
          }
        }),
        u = function (e) {
          var n,
          r,
          i,
          s,
          u,
          a,
          f,
          c,
          h,
          p,
          d;
          return a = 4 * e,
          u = 3 * e,
          n = $('<CANVAS>', {
            css: {
              width: 4 * a + 'px',
              height: u + 'px'
            }
          }),
          o.append(n),
          c = n.get(0),
          c.width = 4 * a,
          c.height = u,
          f = c.getContext('2d'),
          s = function (t, n, r) {
            var i,
            s,
            o,
            c,
            h;
            f.fillStyle = l.palette.getColorCode(t, 0, 'sorted', !1),
            f.fillRect(n, 0, n + r * a, u),
            s = n,
            o = u - e,
            h = [
            ];
            for (i = c = 1; c <= 4; i = ++c) f.fillStyle = l.palette.getColorCode(t, i, 'sorted', !1),
            f.fillRect(s, o, s + r * e, o + e),
            h.push(s += r * e);
            return h
          },
          h = l.palette.getColCnt(),
          d = 0,
          s('pri', 0, 5 - h),
          d += (5 - h) * a,
          l.palette.hasSecs() && (s('sec1', d, 1), d += a, s('sec2', d, 1), d += a),
          l.palette.hasCompl() && s('compl', d, 1),
          p = c.toDataURL('image/png'),
          n.remove(),
          r = $('<P>'),
          o.append(r),
          r.html(t('palette.img.label') + ' ' + 4 * a + ' &times; ' + u + '<br>'),
          i = $('<IMG>', {
            src: p,
            width: 4 * a,
            height: u,
            css: {
              cursor: 'pointer'
            }
          }),
          r.append(i),
          i.click(function () {
            return window.open(p)
          })
        },
        u(25),
        u(16),
        u(8),
        u(4)
      }
      return e
    }(),
    s
  })
}.call(this),
function () {
  define('color.palette.class', [
    'app.ini',
    'app.events',
    'app.locale',
    'util',
    'color.wheel',
    'color.presets',
    'color.class',
    'color.models.class',
    'color.rgb.class',
    'color.hsv.class',
    'color.variator1.class',
    'color.convert',
    'ui.control.paletteimg.class'
  ], function (e, t, n, r, i, s, o, u, a, f, l, c, h) {
    var p,
    d,
    v,
    m;
    return m = {
      mono: 1,
      monocompl: 2,
      triad: 3,
      triadcompl: 4,
      analog: 5,
      analogcompl: 6,
      tetrad: 7,
      free: 10
    },
    v = function (e) {
      var t,
      n;
      for (t in m) {
        n = m[t];
        if (n === e) return t
      }
      return 'mono'
    },
    d = {
      model: 'mono',
      hue: 0,
      angle: 30,
      preset: 'pastels'
    },
    p = function () {
      function i(e, n, r, i) {
        var s;
        this.hue = n,
        this.angle = r,
        this.hidden = i,
        this.uid = '',
        this.inited = !1,
        this.lock(),
        this.col = {
        },
        this.col.pri = new o(this.hue),
        this.setModel(e),
        this.preset = 'null',
        this.vars = new l(this, 'default'),
        this.varsMulti = {
          pri: new l(this, 'default'),
          compl: new l(this, 'default'),
          sec1: new l(this, 'default'),
          sec2: new l(this, 'default')
        },
        this.varsMultiOn = !1,
        this.converter = {
          on: !1,
          type: 'none',
          amount: 1
        },
        this.inited = !0,
        this.unlock(),
        this.modelChanged(),
        this.colorChanged(),
        s = this,
        this.hidden || (t.register('history/changed', function (e, t) {
          return s.loadPalette(t.data)
        }), t.register('palette/load', function (e, t) {
          return s.loadPalette(t)
        }), t.register('palette/reset', function () {
          return s.loadPalette(null)
        }), t.register('palette/colors/update', function () {
          return s.colorChanged()
        }), t.register('palette/model/free', function (e, t) {
          return s.setModelFree(t.id)
        }), t.register('drag/start', function () {
          return s.lock()
        }), t.register('drag/stop', function () {
          return s.unlock(),
          s.storePalette()
        }), t.register('palette/set/base', function (e, t) {
          return s.setBase(t.color)
        }), t.register('palette/switchvars/same', function () {
          return s.switchVars(!1)
        }), t.register('palette/switchvars/multi', function () {
          return s.switchVars(!0)
        }), t.register('palette/switchvars/active', function (e, t) {
          return s.setVarsActive(t.colId)
        }), t.register('palette/adjust/hue', function (e, t) {
          return s.addHue(t.val),
          s.storePalette()
        }), t.register('palette/adjust/saturation', function (e, t) {
          return s.addSaturation(t.val),
          s.storePalette()
        }), t.register('palette/adjust/bright', function (e, t) {
          return s.addBright(t.val),
          s.storePalette()
        }), t.register('palette/adjust/contrast', function (e, t) {
          return s.addContrast(t.val),
          s.storePalette()
        }), t.register('palette/swapsecs', function () {
          return s.swapSecs()
        }), t.register('palette/colorize', function (e, t) {
          return s.colorize(t.$e, t.sorted, t.converted)
        }), t.register('convert/set', function (e, t) {
          return s.setConverter(t.data)
        }), t.register('export/html', function () {
          return s['export']('html')
        }), t.register('export/css', function () {
          return s['export']('css')
        }), t.register('export/less', function () {
          return s['export']('less')
        }), t.register('export/sass', function () {
          return s['export']('sass')
        }), t.register('export/xml', function () {
          return s['export']('xml')
        }), t.register('export/text', function () {
          return s['export']('txt')
        }), t.register('export/aco', function () {
          return s['export']('aco')
        }), t.register('export/gpl', function () {
          return s['export']('gpl')
        }), t.register('export/png', function () {
          return s.exportImg()
        }))
      }
      return i.prototype.modelChanged = function () {
        if (!this.hidden) return t.trigger('palette/model/changed')
      },
      i.prototype.colorChanged = function () {
        this.calcColorTable();
        if (!this.hidden) return t.trigger('palette/colors/changed'),
        this.storePalette()
      },
      i.prototype.varsChanged = function () {
        this.calcColorTable();
        if (!this.hidden) return t.trigger('palette/colors/changed'),
        this.storePalette()
      },
      i.prototype.setModel = function (e, t) {
        this.modelID = e,
        this.model = u[e],
        t && !this.model.swapped && this.model.swapSecs(),
        this.hueCompl = this.model.getComplement(this.hue),
        this.hueCompl != null ? this.col.compl = new o(this.hueCompl)  : this.col.compl = null,
        this.hueSec1 = this.model.getSec1(this.hue, this.angle),
        this.hueSec1 != null ? this.col.sec1 = new o(this.hueSec1)  : this.col.sec1 = null,
        this.hueSec2 = this.model.getSec2(this.hue, this.angle),
        this.hueSec2 != null ? this.col.sec2 = new o(this.hueSec2)  : this.col.sec2 = null,
        this.hueCnt = 1,
        this.hasCompl() && this.hueCnt++,
        this.hasSecs() && (this.hueCnt += 2),
        this.hueCnt === 1 && (this.varsMultiOn = !1),
        this.varsMultiOn && (!this.hasCompl() && this.varsActive === 'compl' || !this.hasSecs() && (this.varsActive === 'sec1' || this.varsActive === 'sec2')) && this.setVarsActive('pri'),
        this.inited && this.modelChanged();
        if (this.inited) return this.colorChanged()
      },
      i.prototype.setModelFree = function (e) {
        this.modelID = 'free',
        this.model = null;
        if (!e || e < 2 || e > 4) e = 2;
        this.hueCnt = e,
        e === 2 && (this.hueSec1 = this.hueSec2 = this.col.sec1 = this.col.sec2 = null),
        e === 3 && (this.hueCompl = this.col.compl = null);
        if (e === 2 || e === 4) this.hueCompl == null && (this.hueCompl = r.angleNorm(this.hue + 180)),
        this.col.compl = new o(this.hueCompl);
        e >= 3 && (this.hueSec1 == null && (this.hueSec1 = r.angleNorm(this.hue + 30)), this.col.sec1 = new o(this.hueSec1), this.hueSec2 == null && (this.hueSec2 = r.angleNorm(this.hue - 30)), this.col.sec2 = new o(this.hueSec2)),
        this.locked || this.modelChanged();
        if (this.inited) return this.colorChanged()
      },
      i.prototype.setHue = function (e, t) {
        var n;
        return n = e - this.hue,
        this.isModelFree() && !t ? this.addHueAll(n)  : (this.hue = r.angleNorm(e), this.col.pri.setHue(Math.round(this.hue)), this.updateCompl(), this.updateSecs(), this.colorChanged())
      },
      i.prototype.addHue = function (e) {
        return this.setHue(this.hue + e)
      },
      i.prototype.addHueAll = function (e) {
        return this.hue = r.angleNorm(this.hue + e),
        this.col.pri.setHue(Math.round(this.hue)),
        this.hasCompl() && (this.hueCompl = r.angleNorm(this.hueCompl + e), this.updateCompl()),
        this.hasSecs() && (this.hueSec1 = r.angleNorm(this.hueSec1 + e), this.hueSec2 = r.angleNorm(this.hueSec2 + e), this.updateSecs()),
        this.colorChanged()
      },
      i.prototype.setHueCompl = function (e, t) {
        var n;
        return this.isModelFree() ? t ? (this.hueCompl = r.angleNorm(e), this.updateCompl(), this.colorChanged())  : (n = e - this.hueCompl, this.addHueAll(n))  : this.setHue(this.model.getComplement(e))
      },
      i.prototype.setHueSec = function (e, t, n) {
        var i,
        s,
        o;
        return this.isModelFree() ? n ? (o = r.angleNorm(e), t === 1 ? this.hueSec1 = o : this.hueSec2 = o, this.updateSecs(), this.colorChanged())  : (s = e - (t === 1 ? this.hueSec1 : this.hueSec2), this.addHueAll(s))  : (i = r.angleDiff(e, this.hue), i = this.model.getAngle(i), this.setAngle(i))
      },
      i.prototype.setAngle = function (e) {
        var t;
        this.angle = r.angleNorm(e);
        if (this.angle > 90) {
          t = '',
          this.modelID === 'analog' ? t = 'triad' : this.modelID === 'triad' ? t = 'analog' : this.modelID === 'analogcompl' ? t = 'triadcompl' : this.modelID === 'triadcompl' && (t = 'analogcompl');
          if (t) {
            this.angle = 180 - this.angle,
            this.setModel(t, !this.model.swapped);
            return
          }
        }
        return this.updateSecs(),
        this.colorChanged()
      },
      i.prototype.swapSecs = function (e) {
        if (this.model) return this.model.swapSecs(),
        this.updateSecs(),
        this.colorChanged()
      },
      i.prototype.setPreset = function (e) {
        return this.preset = e,
        this.vars.setPreset(e)
      },
      i.prototype.switchVars = function (e) {
        if (this.varsMultiOn === !!e) return;
        return e && (this.hasCompl() || this.hasSecs()) ? (this.varsMultiOn = !0, this.varsMulti.pri.setVals(this.vars.getVals()), this.varsMulti.compl.setVals(this.vars.getVals()), this.varsMulti.sec1.setVals(this.vars.getVals()), this.varsMulti.sec2.setVals(this.vars.getVals()), this.setVarsActive('pri'))  : this.varsMultiOn = !1,
        this.colorChanged()
      },
      i.prototype.setVarsActive = function (e) {
        if (!this.varsMultiOn) return;
        return this.varsActive = e,
        this.vars = this.varsMulti[e],
        this.colorChanged()
      },
      i.prototype.setVars = function (e) {
        return this.vars.setVals(e)
      },
      i.prototype.addSaturation = function (e) {
        if (!this.varsMultiOn) return this.vars.addSaturation(e);
        this.varsMulti.pri.addSaturation(e),
        this.hasCompl() && this.varsMulti.compl.addSaturation(e);
        if (this.hasSecs()) return this.varsMulti.sec1.addSaturation(e),
        this.varsMulti.sec2.addSaturation(e)
      },
      i.prototype.addBright = function (e) {
        if (!this.varsMultiOn) return this.vars.addBright(e);
        this.varsMulti.pri.addBright(e),
        this.hasCompl() && this.varsMulti.compl.addBright(e);
        if (this.hasSecs()) return this.varsMulti.sec1.addBright(e),
        this.varsMulti.sec2.addBright(e)
      },
      i.prototype.addContrast = function (e) {
        if (!this.varsMultiOn) return this.vars.addContrast(e);
        this.varsMulti.pri.addContrast(e),
        this.hasCompl() && this.varsMulti.compl.addContrast(e);
        if (this.hasSecs()) return this.varsMulti.sec1.addContrast(e),
        this.varsMulti.sec2.addContrast(e)
      },
      i.prototype.setBase = function (e) {
        return this.locked = !0,
        this.setHue(e.hsv.h),
        this.vars.setMainVal([e.kS,
        e.kV]),
        this.locked = !1,
        this.colorChanged()
      },
      i.prototype.setByHex = function (e) {
        var t,
        n;
        return n = new a(0, 0, 0),
        n.setByHex(e),
        t = new o(0),
        t.setByRGB(n),
        this.setBase(t)
      },
      i.prototype.setConverter = function (e) {
        return e.type ? this.converter = {
          on: !0,
          type: e.type,
          amount: e.amount
        }
         : this.converter.on = !1,
        this.colorChanged()
      },
      i.prototype.isModelFree = function () {
        return this.modelID === 'free'
      },
      i.prototype.hasCompl = function () {
        return this.hueCompl != null
      },
      i.prototype.hasSecs = function () {
        return this.hueSec1 != null
      },
      i.prototype.getVar = function (e, t) {
        return this.varsMultiOn ? this.varsMulti[t].getVal(e)  : this.vars.getVal(e)
      },
      i.prototype.getVars = function () {
        return this.vars.getVals()
      },
      i.prototype.getHueActive = function () {
        if (!this.varsMultiOn) return this.hue;
        switch (this.varsActive) {
          case 'pri':
            return this.hue;
          case 'compl':
            return this.hueCompl;
          case 'sec1':
            return this.hueSec1;
          case 'sec2':
            return this.hueSec2
        }
      },
      i.prototype.getColCnt = function () {
        var e;
        return e = 1,
        this.hasCompl() && (e = 2),
        this.hasSecs() && (e += 2),
        e
      },
      i.prototype.updateCompl = function () {
        if (this.col.compl) {
          this.isModelFree() || (this.hueCompl = this.model.getComplement(this.hue));
          if (this.hueCompl != null) return this.col.compl.setHue(Math.round(this.hueCompl))
        }
      },
      i.prototype.updateSecs = function () {
        this.col.sec1 && (this.isModelFree() || (this.hueSec1 = this.model.getSec1(this.hue, this.angle)), this.hueSec1 != null && this.col.sec1.setHue(Math.round(this.hueSec1)));
        if (this.col.sec2) {
          this.isModelFree() || (this.hueSec2 = this.model.getSec2(this.hue, this.angle));
          if (this.hueSec2 != null) return this.col.sec2.setHue(Math.round(this.hueSec2))
        }
      },
      i.prototype.lock = function () {
        return this.locked = !0
      },
      i.prototype.unlock = function () {
        return this.locked = !1
      },
      i.prototype.storePalette = function () {
        if (this.hidden || this.locked) return;
        return this.uid = this.getSerialized(),
        t.trigger('history/setstate', {
          uid: this.uid
        }),
        t.trigger('palette/uid/changed', {
          uid: this.uid
        })
      },
      i.prototype.loadPalette = function (e) {
        var t;
        this.locked = !0;
        if (e && e.uid && e.uid !== - 1) {
          if (e.uid === this.uid) return this.locked = !1,
          0;
          t = this.setSerialized(e.uid);
          if (!t) {
            this.loadPalette(null);
            return
          }
          this.uid = this.getSerialized()
        } else this.setModel(d.model),
        this.setHue(d.hue),
        this.setAngle(d.angle),
        this.setPreset(d.preset);
        return this.locked = !1,
        this.modelChanged(),
        this.colorChanged()
      },
      i.prototype.randomize = function (e, t, n, i) {
        var o,
        u,
        a,
        f,
        l,
        c,
        h;
        this.locked = !0,
        h = this;
        if (e) {
          a = m[this.modelID],
          f = r.rnd(1, 7);
          while (f === a) f = r.rnd(1, 7);
          this.setModel(v(f)),
          this.switchVars(r.rnd(1, 10) > 8)
        }
        return t && (u = r.rnd(t * 30, t * 180), c = r.rndSign(), this.addHue(u * c), this.isModelFree() && (this.hasCompl() && (u = r.rnd(t * 30, t * 180), c = r.rndSign(), this.setHueCompl(this.hueCompl + u * c, !0)), this.hasSecs() && (u = r.rnd(t * 30, t * 180), c = r.rndSign(), this.setHueSec(this.hueSec1 + u * c, 1, !0), u = r.rnd(t * 30, t * 180), c = r.rndSign(), this.setHueSec(this.hueSec2 + u * c, 2, !0)))),
        n && (this.isModelFree() || (o = r.rnd(n * 15, n * 120), c = r.rndSign(), this.setHueSec(this.hue + this.angle + o * c))),
        i && (l = function (e) {
          var t,
          n,
          o,
          u;
          return u = 50,
          i > 0.5 && (h.vars = e, n = s.getPresetCount(), f = r.rnd(0, n - 1), h.setPreset(s.getPresetId(f)), u = 20),
          o = r.rnd( - u * i, u * i),
          e.addSaturation(o / 100),
          o = r.rnd( - u * i, u * i),
          e.addBright(o / 100),
          t = (Math.random() * Math.PI - Math.PI / 2) * i,
          u = r.rnd(100 - 75 * i, 100 + 75 * i),
          e.rotate(t, u / 100)
        }, this.varsMultiOn ? (l(this.varsMulti.pri), l(this.varsMulti.compl), l(this.varsMulti.sec1), l(this.varsMulti.sec2), this.varsActive = 'pri', this.vars = this.varsMulti.pri)  : l(this.vars)),
        this.locked = !1,
        e && this.modelChanged(),
        this.colorChanged()
      },
      i.prototype.getSerialized = function () {
        var e,
        t,
        n,
        i,
        s;
        i = '',
        s = m[this.modelID],
        n = s === 10,
        n && (s += this.hueCnt - 2),
        i += r.myB64.encodeInt(s, 1),
        i += r.myB64.encodeInt(Math.round(this.hue), 2);
        if (n) {
          if (this.hueCnt === 2 || this.hueCnt === 4) i += r.myB64.encodeInt(Math.round(this.hueCompl), 2);
          this.hueCnt > 2 && (i += r.myB64.encodeInt(Math.round(this.hueSec1), 2), i += r.myB64.encodeInt(Math.round(this.hueSec2), 2))
        } else i += r.myB64.encodeInt(Math.round(this.angle), 2);
        return t = [
          this.varsMultiOn
        ],
        i += r.myB64.encodeFlags(t),
        e = function (e) {
          var t;
          return t = e.getSerialized(),
          i += r.myB64.encodeInt(t.length, 1),
          i += t
        },
        this.varsMultiOn ? (e(this.varsMulti.pri), this.hasCompl() && e(this.varsMulti.compl), this.hasSecs() && (e(this.varsMulti.sec1), e(this.varsMulti.sec2)))  : e(this.vars),
        i
      },
      i.prototype.setSerialized = function (e) {
        var t,
        n,
        i,
        s,
        o,
        u,
        a,
        f,
        l;
        if (!r.myB64.isValidString(e)) return !1;
        a = this,
        i = !1,
        s = 0,
        u = e.substring(s, s + 1),
        f = r.myB64.decodeInt(u, 1);
        if (f >= 10) i = !0,
        t = f - 10 + 2;
         else {
          this.setModel(v(f));
          switch (f) {
            case 1:
              t = 1;
              break;
            case 2:
              t = 2;
              break;
            case 3:
            case 5:
              t = 3;
              break;
            default:
              t = 4
          }
        }
        s += 1,
        u = e.substring(s, s + 2),
        f = r.myB64.decodeInt(u, 2),
        this.setHue(f),
        s += 2;
        if (i) {
          if (t === 2 || t === 4) u = e.substring(s, s + 2),
          f = r.myB64.decodeInt(u, 2),
          this.hueCompl = f,
          s += 2;
          t > 2 && (u = e.substring(s, s + 2), f = r.myB64.decodeInt(u, 2), this.hueSec1 = f, s += 2, u = e.substring(s, s + 2), f = r.myB64.decodeInt(u, 2), this.hueSec2 = f, s += 2),
          this.setModelFree(t)
        } else u = e.substring(s, s + 2),
        f = r.myB64.decodeInt(u, 2),
        f < 5 && (f = 5),
        f > 175 && (f = 175),
        this.setAngle(f),
        s += 2;
        return u = e.substring(s, s + 1),
        l = r.myB64.decodeFlags(u),
        this.varsMultiOn = l[0],
        n = l[1],
        s += 1,
        o = function (t) {
          var n;
          return u = e.substring(s, s + 1),
          n = r.myB64.decodeInt(u, 1),
          s += 1,
          u = e.substring(s, s + n),
          t.setSerialized(u),
          s += n,
          t
        },
        this.varsMultiOn ? (o(this.varsMulti.pri), (t === 2 || t === 4) && o(this.varsMulti.compl), t > 2 && (o(this.varsMulti.sec1), o(this.varsMulti.sec2)), this.setVarsActive('pri'))  : o(this.vars),
        !0
        , console.log(this.getSimpleColorTable())//NICO
      },
      i.prototype.calcColorTable = function () {
        var e,
        t,
        n;
        return this.colorTable = {
          byPalette: {
          },
          sorted: {
          },
          byLum: {
          }
        },
        n = this,
        t = function (e, t) {
          var n,
          r;
          return n = e.getLum(),
          r = t.getLum(),
          n < r ? 1 : n > r ? - 1 : 0
        },
        e = function (e) {
          var r,
          i,
          s,
          u,
          a,
          f,
          l,
          c;
          r = n.col[e];
          if (!r) return null;
          a = [
          ],
          f = [
          ],
          l = [
          ];
          for (s = c = 0; c <= 4; s = ++c) i = new o(r.baseHSV.h),
          u = n.getVar(s, e),
          i.setSV(u[0], u[1]),
          a[s] = i,
          l[s] = i,
          s > 0 && (f[s] = i);
          return f.sort(t),
          f.unshift(a[0]),
          l.sort(t),
          n.colorTable.byPalette[e] = a,
          n.colorTable.sorted[e] = f,
          n.colorTable.byLum[e] = l
        },
        e('pri'),
        e('sec1'),
        e('sec2'),
        e('compl')
      },
      i.prototype.getSimpleColorTable = function () {
        var e,
        t,
        n;
        return n = this,
        e = function (e) {
          var t,
          r,
          i,
          s,
          o,
          u,
          a;
          o = {
          },
          a = n.colorTable[e];
          for (s in a) {
            r = a[s],
            t = [
            ];
            for (i = u = 0; u <= 4; i = ++u) t.push(r[i].rgb.getHex(!0));
            o[s] = t
          }
          return o
        },
        t = {
        },
        t.byPalette = e('byPalette'),
        t.byLum = e('byLum'),
        t
      },
      i.prototype.getColorCode = function (e, t, n, r, i) {
        var s,
        o;
        return this.col[e] || (e = 'pri'),
        n || (n = 'byPalette'),
        s = this.colorTable[n][e][t],
        o = s.rgb,
        r && this.converter && this.converter.on && (o = c.convert(o, this.converter)),
        i > 0 ? o.getCSS(i)  : i < 0 ? o : o.getHex(!0)
      },
      i.prototype.colorize = function (e, t, n) {
        var r,
        i,
        s,
        o,
        u,
        a,
        f,
        l,
        c,
        h,
        p,
        d,
        v,
        m,
        g;
        if (!e || !e.length) return;
        d = {
          bgcol: 'background',
          col: 'color',
          bdcol: 'border-color'
        },
        e.toggleClass('no-compl', !this.hasCompl()),
        e.toggleClass('no-secs', !this.hasSecs()),
        v = t ? 'sorted' : 'byPalette',
        g = [
          'pri',
          'sec1',
          'sec2',
          'compl'
        ];
        for (c in g) {
          o = g[c],
          u = o;
          for (l = m = 0; m <= 4; l = ++m) {
            i = this.getColorCode(u, l, v, n, - 1),
            s = this.getColorCode(u, l, 'byLum', n, - 1),
            a = i.getHex(),
            f = s.getHex();
            for (h in d) p = d[h],
            r = e.find('.' + h + '-' + o + '-' + l).css(p, '#' + a),
            h === 'bgcol' && (r.prop('title', a), r.attr('col-data', a)),
            r = e.find('.' + h + '-' + o + '-lum-' + l).css(p, '#' + f),
            h === 'bgcol' && (r.prop('title', f), r.attr('col-data', f))
          }
        }
        return !1
      },
      i.prototype.lessColorize = function (e, t, n) {
        var r,
        i,
        s,
        o,
        u,
        a,
        f,
        l,
        c,
        h;
        if (e == null || e.modifyVars == null) return;
        f = {
        },
        l = t ? 'sorted' : 'byPalette',
        h = [
          'pri',
          'compl',
          'sec1',
          'sec2'
        ];
        for (a in h) {
          s = h[a],
          o = s;
          for (u = c = 0; c <= 4; u = ++c) r = this.getColorCode(o, u, l, n),
          i = this.getColorCode(o, u, 'byLum', n),
          f['@col-' + s + '-' + u] = r,
          f['@col-' + s + '-lum-' + u] = i
        }
        return e.modifyVars(f)
      },
      i.prototype['export'] = function (t) {
        var i,
        s,
        o,
        u;
        return u = this,
        t === 'html' ? s = [
          1,
          2,
          0,
          3,
          4
        ] : s = [
          0,
          1,
          2,
          3,
          4
        ],
        i = function (e, t, n) {
          var i,
          o,
          a,
          f,
          l;
          f = '"' + t + '":{"ttl":"' + n + '","col":[';
          for (i = l = 0; l <= 4; i = ++l) o = s[i],
          a = u.getColorCode(e, o, 'byPalette', !1, - 1),
          i > 0 && (f += ','),
          f += '{"idx":' + o + ',"hex":"' + a.getHex() + '","r":' + a.r + ',"g":' + a.g + ',"b":' + a.b + ',"r0":' + r.round(a.r / 255, 3) + ',"g0":' + r.round(a.g / 255, 3) + ',"b0":' + r.round(a.b / 255, 3) + '}';
          return f += ']}',
          f
        },
        o = '{"type":"' + t + '","id":"' + this.uid + '","scheme":{',
        o += i('pri', 'primary', n('color.pri')),
        this.hasSecs() && (o += ',' + i('sec1', 'secondary-1', n('color.sec') + ' (1)'), o += ',' + i('sec2', 'secondary-2', n('color.sec') + ' (2)')),
        this.hasCompl() && (o += ',' + i('compl', 'complement', n('color.compl'))),
        o += '}}',
        r.sendRequest(e.urls['export'].url, 'POST', {
          data: o
        }, '_blank')
      },
      i.prototype.exportImg = function () {
        return new h(this, $('body'))
      },
      i.prototype.copy = function (e) {
        var t;
        return this.isModelFree() ? (t = new i('mono', this.hue, 30, e), t.setModelFree(this.hueCnt), t.hueCompl = this.hueCompl, t.hueSec1 = this.hueSec1, t.hueSec2 = this.hueSec2, t.updateCompl(), t.updateSecs())  : t = new i(this.modelID, this.hue, this.angle, e),
        t.setVars(this.vars.values),
        t.colorChanged(),
        t
      },
      i
    }(),
    p
  })
}.call(this), function () {
  define('ui.control.button.class', [
    'app.events',
    'util',
    'ui.control.dialog.class'
  ], function (e, t, n) {
    var r;
    return r = function () {
      function e(e, n) {
        var r,
        i,
        s;
        this.$parent = e,
        i = {
          className: '',
          label: '',
          asUIButton: !0,
          disabled: !1,
          onClick: null
        };
        if (!this.$parent) return;
        s = this,
        this.options = t.objMerge(i, n),
        this.$e = $('<SPAN>', {
          'class': 'control control-button ' + this.options.className
        }),
        this.$parent.append(this.$e),
        this.$button = $('<A>', {
          'class': 'button',
          href: '#'
        }),
        this.$e.append(this.$button),
        this.$label = $('<SPAN>', {
          'class': 'label'
        }),
        this.$label.text(this.options.label),
        this.$button.append(this.$label),
        this.options.asUIButton ? r = this.$button.button()  : r = this.$button,
        r.click(function (e) {
          var t;
          e.preventDefault(),
          s.$button.blur();
          if (s.disabled) return;
          return typeof (t = s.options).onClick == 'function' ? t.onClick()  : void 0
        }),
        this.disable(this.options.disabled)
      }
      return e.prototype.setHtml = function (e) {
        return this.$button.html(e)
      },
      e.prototype.disable = function (e) {
        return this.disabled = !!e,
        this.$e.toggleClass('disabled', this.disabled)
      },
      e
    }(),
    r
  })
}.call(this), function () {
  define('geometry.plane.class', [
  ], function () {
    var e;
    return e = function () {
      function e(e, t) {
        this.$canvas = e;
        if (!this.$canvas) return;
        t ? this.originPos = origin : this.originPos = {
          top: Math.floor(this.$canvas.height() / 2),
          left: Math.floor(this.$canvas.width() / 2)
        }
      }
      return e.prototype.getCanvasPos = function (e, t) {
        return {
          left: e + this.originPos.left,
          top: t + this.originPos.top
        }
      },
      e.prototype.getPagePos = function (e, t) {
        var n;
        return n = this.$canvas.offset(),
        {
          left: e + this.originPos.left + n.left,
          top: t + this.originPos.top + n.top
        }
      },
      e.prototype.getXYbyCanvasPos = function (e) {
        return {
          x: e.left - this.originPos.left,
          y: e.top - this.originPos.top
        }
      },
      e.prototype.getXYbyPagePos = function (e) {
        var t;
        return t = this.$canvas.offset(),
        {
          x: e.left - t.left - this.originPos.left,
          y: e.top - t.top - this.originPos.top
        }
      },
      e
    }(),
    e
  })
}.call(this), function () {
  define('util.debouncer.class', [
  ], function () {
    var e;
    return e = function () {
      function e(e, t) {
        this.maxFPS = e,
        this.targetHandler = t,
        this.maxFPS ? (this.on = !0, this.delay = Math.round(1000 / e), this.lastTick = null, this.lastEvent = null, this.timerID = null)  : this.on = !1
      }
      return e.prototype.debounce = function (e) {
        var t,
        n = this;
        return this.on ? this.timerID ? this.lastEvent = e : (t = new Date, t = t.getTime(), this.lastTick && t - this.lastTick <= this.delay ? this.timerID = setTimeout(function () {
          return n.handleDebounced()
        }, this.delay)  : this.handleDebounced(e))  : this.handleDebounced(e)
      },
      e.prototype.stop = function () {
        return this.handleDebounced()
      },
      e.prototype.handleDebounced = function (e) {
        var t;
        return t = new Date,
        this.lastTick = t.getTime(),
        e || (e = this.lastEvent),
        this.timerID && (clearTimeout(this.timerID), this.timerID = null),
        this.targetHandler(e)
      },
      e
    }(),
    e
  })
}.call(this), function () {
  define('ui.drag', [
    'util.debouncer.class'
  ], function (e) {
    var t;
    return t = {
      start: function (n, r, i) {
        var s;
        return this.control = n,
        t.on ? !1 : (i ? t.debouncer = new e(i, t.move)  : t.debouncer = null, t.on = !0, $(document).on('mousemove touchmove', t.moveDebounced), $(document).on('mouseup touchend', t.stop), typeof (s = t.control).onDragStart == 'function' && s.onDragStart(), t.move(r))
      },
      stop: function (e) {
        var n,
        r;
        return $(document).off('mousemove touchmove', t.moveDebounced),
        $(document).off('mouseup touchend', t.stop),
        (r = this.debouncer) != null && r.stop(),
        typeof (n = t.control).onDragStop == 'function' && n.onDragStop(),
        t.on = !1
      },
      moveDebounced: function (e) {
        return t.debouncer ? t.debouncer.debounce(e)  : t.move(e)
      },
      move: function (e) {
        var n,
        r,
        i;
        return r = e.originalEvent,
        n = {
          pos: {
            left: r.pageX,
            top: r.pageY
          },
          shiftKey: e.shiftKey,
          altKey: e.altKey
        },
        typeof (i = t.control).onDragMove == 'function' ? i.onDragMove(n)  : void 0
      }
    },
    t
  })
}.call(this), function () {
  define('ui.control.dot.class', [
    'app.events',
    'util',
    'ui.drag',
    'geometry.plane.class',
    'geometry.point.class'
  ], function (e, t, n, r, i) {
    var s;
    return s = function () {
      function s(e, s) {
        var o,
        u;
        this.$parent = e,
        o = {
          className: '',
          classOver: 'over',
          classActive: 'active',
          title: '',
          width: 17,
          height: 17,
          zindex: 99,
          opacity: 1,
          limit: null,
          dragable: !0,
          onDragStart: null,
          onDragMove: null,
          onBeforeDragMove: null,
          onDragStop: null,
          drawOnMove: !1,
          maxFPS: 0,
          data: null
        };
        if (!this.$parent) return;
        u = this,
        this.options = t.objMerge(o, s),
        this.data = this.options.data || {
        },
        this.drag = {
          on: !1
        },
        this.visible = !0,
        this.parW = this.$parent.width(),
        this.parH = this.$parent.height(),
        this.plane = new r(this.$parent),
        this.point = new i(this.plane),
        this.options.limit && this.point.setLimit(this.options.limit),
        this.$e = $('<DIV>', {
          'class': 'control control-dot ' + this.options.className,
          title: this.options.title
        }).css({
          position: 'absolute',
          width: this.options.width + 'px',
          height: this.options.height + 'px',
          zIndex: this.options.zindex,
          opacity: this.options.opacity
        }).data('control', this),
        this.options.dragable && this.$e.mouseenter(function (e) {
          return $(this).addClass(u.options.classOver)
        }).mouseleave(function (e) {
          return $(this).removeClass(u.options.classOver)
        }).on('mousedown touchstart', function (e, t) {
          return t && (e = t),
          n.start(u, e, u.options.maxFPS),
          !1
        }),
        e.append(this.$e),
        this.draw()
      }
      return s.prototype.setXY = function (e, t) {
        return this.point.setXY(e, t),
        this.draw()
      },
      s.prototype.setDeltaXY = function (e, t) {
        return this.point.setXY(this.point.x + e, this.point.y + t),
        this.draw()
      },
      s.prototype.setPolar = function (e, t) {
        return this.point.setPolar(e, t),
        this.draw()
      },
      s.prototype.doLimit = function () {
        return this.point.doLimit()
      },
      s.prototype.setData = function (e, t) {
        return this.data[e] = t
      },
      s.prototype.getData = function (e) {
        return this.data[e]
      },
      s.prototype.show = function () {
        if (this.visible) return;
        return this.visible = !0,
        this.$e.show()
      },
      s.prototype.hide = function () {
        if (!this.visible) return;
        return this.visible = !1,
        this.$e.hide()
      },
      s.prototype.fadeOut = function () {
        return this.$e.fadeOut()
      },
      s.prototype.fadeIn = function () {
        return this.$e.fadeIn()
      },
      s.prototype.draw = function () {
        var e,
        t;
        if (!this.visible) return;
        return e = this.point.getLimited(),
        t = e.getCanvasPos(),
        this.$e.css({
          left: Math.floor(t.left - this.options.width / 2) + 'px',
          top: Math.floor(t.top - this.options.height / 2) + 'px'
        })
      },
      s.prototype.onDragStart = function () {
        var t;
        return e.trigger('drag/start'),
        this.$e.addClass(this.options.classActive),
        typeof (t = this.options).onDragStart == 'function' ? t.onDragStart(this.point, this.options.data)  : void 0
      },
      s.prototype.onDragStop = function () {
        var t;
        return e.trigger('drag/stop'),
        this.$e.removeClass(this.options.classActive),
        typeof (t = this.options).onDragStop == 'function' ? t.onDragStop(this.point, this.options.data)  : void 0
      },
      s.prototype.onDragMove = function (e) {
        var t;
        return this.options.onBeforeDragMove != null && (this.data.beforeMoveData = this.options.onBeforeDragMove(e, this.point, this.options.data)),
        this.point.setXYByPagePos(e.pos),
        this.options.drawOnMove && this.draw(),
        typeof (t = this.options).onDragMove == 'function' ? t.onDragMove(e, this.point, this.data)  : void 0
      },
      s
    }(),
    s
  })
}.call(this), function () {
  define('ui.control.variator.class', [
    'ui.control.dot.class',
    'color.presets',
    'app.events',
    'util'
  ], function (e, t, n, r) {
    var i;
    return i = function () {
      function t(t, i, s) {
        var o,
        u,
        a,
        f,
        l,
        c;
        this.$parent = t,
        this.palette = i,
        o = {
          className: 'control control-variator',
          maxFPS: 0,
          radius: 100,
          radiusTreshold: 25,
          mirror: [
            3,
            2,
            1,
            0
          ],
          onChange: null
        };
        if (!this.$parent || !this.palette) return;
        f = this,
        this.options = r.objMerge(o, s),
        this.freeMode = !1,
        this.radius = this.options.radius,
        this.radiusTreshold = this.options.radiusTreshold,
        a = Math.floor(this.$parent.width() / 2) + 1 - this.radius,
        l = Math.floor(this.$parent.height() / 2) + 1 - this.radius,
        this.$e = $('<DIV>', {
          'class': this.options.className
        }).css({
          position: 'absolute',
          left: a,
          top: l,
          width: Math.round(this.radius * 2) + 'px',
          height: Math.round(this.radius * 2) + 'px'
        }).data('control', this),
        this.$parent.append(this.$e),
        this.dot = [
        ],
        this.dot[0] = new e(this.$e, {
          className: 'small pri',
          width: 13,
          height: 13,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: 0,
              max: f.radius
            }
          },
          onBeforeDragMove: function (e, t, n) {
          },
          onDragMove: function (e, t, n) {
            var r;
            return r = f.freeMode || e.shiftKey,
            f.palette.vars.moveMain(t.x / f.radius, t.y / f.radius, r),
            f.applyValue()
          }
        });
        for (u = c = 1; c <= 4; u = ++c) this.dot[u] = new e(this.$e, {
          className: 'small sec sec' + u,
          width: 13,
          height: 13,
          zindex: 98,
          opacity: 0.67,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: 0,
              max: f.radius
            }
          },
          data: {
            idx: u
          },
          onBeforeDragMove: function (e, t, n) {
          },
          onDragMove: function (e, t, n) {
            var r,
            i;
            return i = n.idx,
            r = f.freeMode || e.shiftKey,
            f.palette.vars.moveSec(i, t.x / f.radius, t.y / f.radius, r),
            f.applyValue()
          },
          onDragStop: function () {
            return n.trigger('palette/drag/done')
          }
        });
        n.register('palette/colors/changed', function () {
          return f.applyValue()
        })
      }
      return t.prototype.setFreeMode = function (e) {
        return this.freeMode = e
      },
      t.prototype.applyValue = function () {
        var e,
        t,
        n;
        n = [
        ];
        for (e = t = 0; t <= 4; e = ++t) this.setDotByVariatorPoint(this.dot[e], this.palette.vars.getPoint(e)),
        n.push(this.dot[e].draw());
        return n
      },
      t.prototype.setDotByVariatorPoint = function (e, t) {
        return e.setPolar(t.r * this.radius, t.theta)
      },
      t
    }(),
    i
  })
}.call(this), function () {
  define('ui.control.wheelswitch.class', [
    'app.events',
    'util',
    'ui.control.button.class'
  ], function (e, t, n) {
    var r;
    return r = function () {
      function r(n, r, i, s) {
        var o,
        u;
        this.$container = n,
        this.ctrl_wheel = r,
        this.palette = i,
        o = {
          className: ''
        },
        this.options = t.objMerge(o, s),
        u = this,
        e.register('palette/colors/changed', function () {
          return u.colorize()
        }),
        e.register('palette/model/changed', function () {
          return u.draw()
        }),
        this.draw()
      }
      return r.prototype.draw = function () {
        var e,
        t;
        return t = this,
        this.$e = $('<DIV>', {
          'class': 'control-wheelswitch ' + this.options.className
        }),
        this.$container.empty().append(this.$e),
        this.$e.on('mouseenter', function (e) {
          var n;
          return typeof (n = t.options).onEnter == 'function' ? n.onEnter(e)  : void 0
        }).on('mouseleave', function (e) {
          var n;
          return typeof (n = t.options).onLeave == 'function' ? n.onLeave(e)  : void 0
        }),
        this.$colors = $('<SPAN>', {
          'class': 'colors'
        }),
        this.$e.append(this.$colors),
        e = function (e) {
          var r,
          i;
          return i = e,
          r = new n(t.$colors, {
            className: 'col btn-' + e,
            asUIButton: !1,
            label: '',
            onClick: function () {
              return t.setCol(i)
            }
          }),
          r
        },
        this.colBtn = {
        },
        this.colBtn.pri = e('pri'),
        this.palette.hasCompl() && (this.colBtn.compl = e('compl')),
        this.palette.hasSecs() && (this.colBtn.sec1 = e('sec1'), this.colBtn.sec2 = e('sec2')),
        this.switchBtn = new n(this.$e, {
          className: 'lock',
          asUIButton: !1,
          label: '',
          onClick: function () {
            return t['switch'](!t.palette.varsMultiOn)
          }
        }),
        this.switchBtn.$label.addClass('ico'),
        this['switch'](t.palette.varsMultiOn)
      },
      r.prototype['switch'] = function (t) {
        return this.$colors.find('.control-button.sel').removeClass('sel'),
        t ? (e.trigger('palette/switchvars/multi'), this.$colors.show(), this.$colors.find('.control-button.btn-' + this.palette.varsActive).addClass('sel'))  : (e.trigger('palette/switchvars/same'), this.$colors.hide()),
        this.switchBtn.$label.toggleClass('ico-lock', !t).toggleClass('ico-unlock', t),
        this.switchBtn.$e.toggle(this.palette.hueCnt > 1)
      },
      r.prototype.setCol = function (t) {
        var n;
        n = this,
        this.$colors.find('.control-button.sel').removeClass('sel'),
        this.$colors.find('.control-button.btn-' + t).addClass('sel');
        if (n.palette.varsMultiOn) return e.trigger('palette/switchvars/active', {
          colId: t
        })
      },
      r.prototype.colorize = function () {
        var e,
        t;
        return t = this,
        e = function (e) {
          var n;
          return (n = t.colBtn[e]) != null ? n.$button.css('background', t.palette.getColorCode(e, 0))  : void 0
        },
        e('pri'),
        e('compl'),
        e('sec1'),
        e('sec2')
      },
      r
    }(),
    r
  })
}.call(this), function () {
  define('ui.control.wheel.class', [
    'color.wheel',
    'geometry.plane.class',
    'geometry.point.class',
    'ui.control.dot.class',
    'ui.control.variator.class',
    'ui.control.wheelswitch.class',
    'ui.drag',
    'app.events',
    'app.locale',
    'util'
  ], function (e, t, n, r, i, s, o, u, a, f) {
    var l,
    c,
    h,
    p;
    return h = function (e) {
      var t;
      return t = f.rad2deg(e),
      f.angleNorm(t + 90)
    },
    c = function (e) {
      var t;
      return t = f.angleNorm(e - 90),
      f.deg2rad(t)
    },
    p = function (e, t, n, r) {
      return t >= n.options.triRadius[0] && t < n.options.triRadius[1] ? (e = f.angleNorm(Math.round(e / 15) * 15), r.setPolar(t, c(e)), e)  : t >= n.options.secRadius[0] && t < n.options.secRadius[1] ? (e = f.angleNorm(Math.round(e / 30) * 30), r.setPolar(t, c(e)), e)  : e
    },
    l = function () {
      function l(e, t, n) {
        var r,
        i;
        this.palette = e,
        this.$parent = t,
        r = {
          className: 'control control-wheel',
          width: 400,
          height: 400,
          maxFPS: 0,
          variatorRadius: 103,
          activeRadius: [
            125,
            190
          ],
          hueRadius: 139,
          triRadius: [
            156,
            171
          ],
          secRadius: [
            171,
            185
          ],
          variatorTreshold: 0.5
        };
        if (!this.$parent) return;
        i = this,
        this.options = f.objMerge(r, n),
        this.freeMode = !1,
        this.isOverlay = !1,
        this.drawBackground(),
        this.init(),
        u.register('palette/colors/changed', function () {
          return i.updateByPalette()
        }),
        u.register('palette/model/changed', function () {
          return i.updateByPalette()
        })
      }
      return l.prototype.init = function () {
        var e;
        return e = this,
        this.dotPri = new r(this.$e, {
          className: 'pri',
          title: a('color.pri'),
          width: 17,
          height: 17,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: e.options.hueRadius,
              max: e.options.hueRadius
            }
          },
          onDragMove: function (t, n, r) {
            var i,
            s,
            o,
            u,
            a;
            return i = e.freeMode || t.shiftKey,
            a = n.getPolar(),
            o = a[0],
            u = a[1],
            s = h(u),
            s = p(s, o, e, e.dotPri),
            e.palette.setHue(s, i)
          }
        }),
        this.dotCompl = new r(this.$e, {
          className: 'compl',
          title: a('color.compl'),
          width: 17,
          height: 17,
          opacity: 0.67,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: e.options.hueRadius,
              max: e.options.hueRadius
            }
          },
          onDragMove: function (t, n, r) {
            var i,
            s,
            o,
            u,
            a;
            return i = e.freeMode || t.shiftKey,
            a = n.getPolar(),
            o = a[0],
            u = a[1],
            s = h(u),
            s = p(s, o, e, e.dotPri),
            e.palette.setHueCompl(s, i)
          }
        }),
        this.dotSec1 = new r(this.$e, {
          className: 'sec',
          title: a('color.sec'),
          width: 17,
          height: 17,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: e.options.hueRadius,
              max: e.options.hueRadius
            }
          },
          onDragMove: function (t, n, r) {
            var i,
            s,
            o,
            u,
            a;
            return s = e.freeMode || t.shiftKey,
            a = n.getPolar(),
            o = a[0],
            u = a[1],
            i = h(u),
            i = p(i, o, e, e.dotPri),
            e.palette.setHueSec(i, 1, s)
          }
        }),
        this.dotSec2 = new r(this.$e, {
          className: 'sec',
          title: a('color.sec'),
          width: 17,
          height: 17,
          maxFPS: this.options.maxFPS,
          limit: {
            type: 'radius',
            value: {
              min: e.options.hueRadius,
              max: e.options.hueRadius
            }
          },
          onDragMove: function (t, n, r) {
            var i,
            s,
            o,
            u,
            a;
            return s = e.freeMode || t.shiftKey,
            a = n.getPolar(),
            o = a[0],
            u = a[1],
            i = h(u),
            i = p(i, o, e, e.dotPri),
            e.palette.setHueSec(i, 2, s)
          }
        }),
        this.variator = new i(this.$e, this.palette, {
          maxFPS: this.options.maxFPS
        }),
        this.updateByPalette()
      },
      l.prototype.updateByPalette = function () {
        return this.dotPri.setPolar(1, c(this.palette.hue)),
        this.palette.hasCompl() ? (this.dotCompl.setPolar(1, c(this.palette.hueCompl)), this.dotCompl.show())  : this.dotCompl.hide(),
        this.palette.hasSecs() ? (this.dotSec1.setPolar(1, c(this.palette.hueSec1)), this.dotSec2.setPolar(1, c(this.palette.hueSec2)), this.dotSec1.show(), this.dotSec2.show())  : (this.dotSec1.hide(), this.dotSec2.hide()),
        this.drawDots(),
        this.updateBackground()
      },
      l.prototype.drawDots = function () {
        return this.dotPri.draw(),
        this.dotCompl.draw(),
        this.dotSec1.draw(),
        this.dotSec2.draw()
      },
      l.prototype.overlay = function (e) {
        return this.isOverlay = e,
        this.$overlay.toggleClass('over', e),
        e ? (this.dotPri.fadeOut(), this.dotCompl.fadeOut(), this.dotSec1.fadeOut(), this.dotSec2.fadeOut(), this.$info.fadeIn(), this.$switch.fadeIn())  : (this.dotPri.fadeIn(), this.palette.hasCompl() && this.dotCompl.fadeIn(), this.palette.hasSecs() && (this.dotSec1.fadeIn(), this.dotSec2.fadeIn()), this.$info.fadeOut(), this.$switch.fadeOut())
      },
      l.prototype.updateBackground = function (t) {
        var n,
        r;
        return n = e.getBaseColorByHue(this.palette.getHueActive()),
        r = e.hsv2rgb(n),
        $('.wheel-bgcol').css({
          background: '#' + r.getHex()
        })
      },
      l.prototype.drawBackground = function () {
        var e,
        r,
        i,
        u,
        f,
        l,
        c;
        this.$e = $('<DIV>', {
          'class': this.options.className
        }).width(this.options.width).height(this.options.height).data('control', this),
        this.$parent.append(this.$e),
        this.$e.append($('<DIV>', {
          'class': 'wheel-bgcol'
        }));
        for (i = c = 1; c <= 4; i = ++c) this.$e.append($('<DIV>', {
          'class': 'wheel-tile tile-' + i
        }));
        return u = new t(this.$e),
        f = new n(u),
        l = this,
        r = !1,
        e = !1,
        this.$overlay = $('<DIV>', {
          'class': 'clickable'
        }).width(this.options.width).height(this.options.height).css({
          position: 'relative',
          zIndex: 1
        }).on('mousedown', function (e) {
          return f.setXYByPagePos({
            left: e.pageX,
            top: e.pageY
          }),
          f.r >= l.options.activeRadius[0] && f.r <= l.options.activeRadius[1] && !l.isOverlay && l.dotPri.$e.triggerHandler('mousedown', e),
          !1
        }).on('mousemove', function (t) {
          var n;
          if (o.on) return;
          f.setXYByPagePos({
            left: t.pageX,
            top: t.pageY
          });
          if (f.r < l.options.variatorRadius && !r) return r = !0,
          n = l.$overlay.data('timerOut'),
          n ? (clearTimeout(n), l.$overlay.data('timerOut', null))  : (n = setTimeout(function () {
            return l.$overlay.data('timerIn', null),
            l.overlay(!0)
          }, 250), l.$overlay.data('timerIn', n));
          if (f.r >= l.options.variatorRadius && r && !e) return r = !1,
          n = l.$overlay.data('timerIn'),
          n ? (clearTimeout(n), l.$overlay.data('timerIn', null))  : (n = setTimeout(function () {
            return l.$overlay.data('timerOut', null),
            l.overlay(!1)
          }, 250), l.$overlay.data('timerOut', n))
        }),
        this.$e.append(this.$overlay),
        this.$info = $('<DIV>', {
          'class': 'infopane'
        }),
        this.$overlay.append(this.$info),
        this.$info.text(a('variator.info.shiftText')),
        this.$info.fadeOut(0),
        this.$switch = $('<DIV>', {
          'class': 'switch'
        }),
        this.$overlay.append(this.$switch),
        this['switch'] = new s(this.$switch, this, this.palette, {
          onEnter: function () {
            return e = !0
          },
          onLeave: function () {
            return e = !1
          }
        }),
        this.$switch.fadeOut(0)
      },
      l
    }(),
    l
  })
}.call(this), function () {
  define('ui.control.presets.class', [
    'app.ini',
    'app.events',
    'app.locale',
    'color.wheel',
    'color.palette.class',
    'color.presets',
    'geometry.plane.class',
    'geometry.point.class',
    'ui.control.dot.class',
    'ui.control.palette.class',
    'ui.control.variator.class',
    'util'
  ], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    var h;
    return h = function () {
      function r(e, n, r) {
        var i,
        s;
        this.palette = e,
        this.$parent = n,
        i = {
          className: 'control control-presets'
        };
        if (!this.$parent) return;
        s = this,
        this.options = c.objMerge(i, r),
        this.init(),
        t.register('palette/colors/changed', function () {
          if (s.active) return s.draw()
        })
      }
      return r.prototype.init = function () {
        return this.active = !1
      },
      r.prototype.activate = function (e) {
        this.active = !!e;
        if (this.active) return this.draw()
      },
      r.prototype.draw = function () {
        var r,
        i,
        o,
        u,
        a,
        l,
        c,
        h;
        c = this,
        this.paletteWork = this.palette.copy(!0),
        this.palette.varsMultiOn && (this.paletteWork.setModel('mono'), this.paletteWork.setHue(this.palette.getHueActive())),
        this.$parent.empty(),
        this.$e = $('<DIV>', {
          'class': this.options.className
        }).width(this.options.width).height(this.options.height).data('control', this),
        this.$parent.append(this.$e),
        o = $('<UL>'),
        this.$e.append(o),
        h = s.presetList;
        for (a in h) l = h[a],
        i = $('<LI>'),
        o.append(i),
        r = $('<A>', {
          href: '#'
        }),
        i.append(r),
        this.paletteWork.setPreset(a),
        u = new f(this.paletteWork, r, {
          asStatic: !0
        }),
        r.data('preset', a),
        r.append(n('preset.list.' + a + '.title'));
        return o.find('a').click(function (n) {
          return n.preventDefault(),
          a = $(this).data('preset'),
          c.palette.setPreset(a),
          t.trigger('ga/event', {
            key: e.GA.event.preset,
            value: a
          })
        })
      },
      r
    }(),
    h
  })
}.call(this), function () {
  define('widget.ui.control.adjuster.class', [
    'color.wheel',
    'geometry.plane.class',
    'geometry.point.class',
    'ui.control.dialog.class',
    'ui.control.dot.class',
    'ui.control.variator.class',
    'app.events',
    'app.locale',
    'util'
  ], function (e, t, n, r, i, s, o, u, a) {
    var f;
    return f = function () {
      function e(e, t, n) {
        var r,
        i,
        s;
        this.palette = e,
        this.$parent = t,
        i = {
          className: '',
          width: 170,
          positionMy: 'center',
          positionAt: 'center',
          positionOf: null
        };
        if (!this.$parent) return;
        s = this,
        this.options = a.objMerge(i, n),
        r = this.createContent(),
        this.$parent.append(r)
      }
      return e.prototype.createContent = function () {
        var e,
        t,
        n,
        r;
        return r = this,
        e = $('<DIV>', {
          'class': 'control control-adjust ' + this.options.className
        }).width(this.options.width).height(this.options.height).data('control', this),
        n = function (e, n, r, i, s) {
          var o,
          u,
          a,
          f,
          l,
          c;
          o = $('<DIV>', {
            'class': 'row'
          }),
          e.append(o),
          u = $('<DIV>', {
            'class': 'btns'
          }),
          o.append(u);
          for (a = l = 0, c = s.length; l < c; a = ++l) f = s[a],
          t(u, r, i, f, a);
          return u = $('<DIV>', {
            'class': 'hdr'
          }),
          o.append(u),
          u.html('<span class="title">' + n + '</span>')
        },
        t = function (e, t, n, i, s) {
          var u,
          a,
          f,
          l;
          return u = $('<BUTTON>'),
          e.append(u),
          i && u.click(function () {
            return o.trigger(t, {
              val: i
            }),
            o.trigger('adjuster/changed')
          }),
          l = Math.round(r.options.width / 6) - 4,
          a = [
            21,
            17,
            13,
            13,
            17,
            21
          ],
          f = [
            '-10',
            '-5',
            '-1',
            '+1',
            '+5',
            '+10'
          ],
          u.text(f[s]).css({
            width: l + 'px',
            height: a[s] + 'px',
            lineHeight: a[s] + 'px'
          }).data('adjust-data', {
            type: n,
            val: i
          })
        },
        n(e, u('adjuster.lblHue'), 'palette/adjust/hue', 'hue', [
          - 10,
          - 5,
          - 1,
          1,
          5,
          10
        ]),
        n(e, u('adjuster.lblSat'), 'palette/adjust/saturation', 'sat', [
          - 0.2,
          - 0.05,
          - 0.01,
          0.01,
          0.05,
          0.2
        ]),
        n(e, u('adjuster.lblBri'), 'palette/adjust/bright', 'bri', [
          - 0.2,
          - 0.05,
          - 0.01,
          0.01,
          0.05,
          0.2
        ]),
        n(e, u('adjuster.lblCon'), 'palette/adjust/contrast', 'con', [
          80,
          95.2381,
          99.001,
          101,
          105,
          125
        ]),
        e
      },
      e
    }(),
    f
  })
}.call(this), function () {
  define('ui.control.loader.class', [
    'app.events',
    'util'
  ], function (e, t) {
    var n;
    return n = function () {
      function e(e, n) {
        var r,
        i,
        s,
        o;
        this.$parent = e,
        i = {
          className: '',
          hideParent: !1
        };
        if (!this.$parent) return;
        o = this,
        this.options = t.objMerge(i, n),
        s = this.$parent.position(),
        this.$e = $('<DIV>', {
          'class': 'control control-loader ' + this.options.className,
          css: {
            position: 'absolute',
            zIndex: 9999,
            left: s.left + 'px',
            top: s.top + 'px',
            width: this.$parent.width() + 'px',
            height: this.$parent.height() + 'px'
          }
        }),
        r = $('<DIV>', {
          'class': 'loader-in'
        }),
        this.$e.append(r),
        this.$parent.after(this.$e),
        this.options.hideParent && this.$parent.css('visibility', 'hidden')
      }
      return e.prototype.done = function () {
        this.$e.remove();
        if (this.options.hideParent) return this.$parent.css('visibility', 'visible')
      },
      e
    }(),
    n
  })
}.call(this), function () {
  define('widget.ui.withwheel.class', [
    'app.events',
    'app.history',
    'app.locale',
    'util',
    'ui.control.button.class',
    'ui.control.wheel.class',
    'ui.control.presets.class',
    'widget.ui.control.adjuster.class',
    'ui.control.loader.class'
  ], function (e, t, n, r, i, s, o, u, a) {
    var f;
    return f = function () {
      function n(e, t, n) {
        var i,
        s;
        this.palette = e,
        this.$parent = t,
        i = {
          className: ''
        };
        if (!this.$parent) return;
        s = this,
        this.options = r.objMerge(i, n),
        this.init()
      }
      return n.prototype.init = function () {
        var n,
        r,
        u,
        f,
        l,
        c,
        h,
        p,
        d,
        v,
        m,
        g,
        y,
        b;
        return b = this,
        l = this.palette,
        this.widgetPars = {
        },
        this.$parent.addClass('ui-wheel'),
        this.$iframe = this.$parent.find('#content iframe'),
        n = this.$parent.find('#sidebar'),
        u = $('<DIV>', {
          'class': 'pane'
        }),
        n.append(u),
        f = $('<DIV>', {
          'class': 'pane'
        }),
        n.append(f),
        g = new i(n, {
          className: 'tab tab-wheel selected',
          label: 'Wheel',
          asUIButton: !1,
          onClick: function () {
            return y.$e.removeClass('selected'),
            g.$e.addClass('selected'),
            u.show(),
            f.hide(),
            v.activate(!1)
          }
        }),
        y = new i(n, {
          className: 'tab tab-presets',
          label: 'Presets',
          asUIButton: !1,
          onClick: function () {
            return g.$e.removeClass('selected'),
            y.$e.addClass('selected'),
            u.hide(),
            f.show(),
            v.activate(!0)
          }
        }),
        m = new s(l, u, v = new o(l, f)),
        r = $('<DIV>', {
          'class': 'actions'
        }),
        n.append(r),
        d = new i(r, {
          className: 'undo',
          label: '< Undo ',
          asUIButton: !1,
          disabled: !0,
          onClick: function () {
            return e.trigger('history/back')
          }
        }),
        h = new i(r, {
          className: 'redo',
          label: ' Redo >',
          asUIButton: !1,
          disabled: !0,
          onClick: function () {
            return e.trigger('history/fwd')
          }
        }),
        p = new i(r, {
          className: 'reset',
          label: 'Reset',
          asUIButton: !1,
          disabled: !0,
          onClick: function () {
            return e.trigger('palette/load', {
              uid: b.widgetPars.paletteUIDdefault || b.widgetPars.paletteUID
            })
          }
        }),
        r = $('<DIV>', {
          'class': 'buttons'
        }),
        n.append(r),
        c = new i(r, {
          className: 'btncancel',
          label: 'Cancel',
          asUIButton: !1,
          onClick: function () {
            return e.sendMessage(parent, '*', 'palettonwidget/done', null)
          }
        }),
        c = new i(r, {
          className: 'btnok',
          label: 'Apply',
          asUIButton: !1,
          onClick: function () {
            return e.sendMessage(parent, '*', 'palettonwidget/done', {
              colorTable: b.palette.getSimpleColorTable(),
              paletteUID: b.palette.uid,
              myData: b.widgetPars.myData
            })
          }
        }),
        r = $('<DIV>', {
          'class': 'credit'
        }).html('Powered by <a href="http://paletton.com" target="_blank">Paletton.com</a>'),
        u.append(r),
        e.register('palette/colors/changed', function () {
          return b.colorize()
        }),
        e.register('history/changed', function () {
          return d.disable(!t.hasBack()),
          h.disable(!t.hasFwd()),
          p.disable(b.palette.uid === b.widgetPars.paletteUID)
        }),
        e.register('palettonwidget/pars', function (t, n) {
          return b.widgetPars = n,
          b.widgetPars.dark && $('body').addClass('dark'),
          b.loader = new a($('#app'), {
            hideParent: !0
          }),
          b.$iframe.prop('src', n.templateURL),
          e.trigger('palette/load', {
            uid: n.paletteUID
          }),
          e.trigger('history/block')
        }),
        e.register('palettonwidget/previewloaded', function (e, t) {
          var n;
          return (n = b.loader) != null && typeof n.done == 'function' && n.done(),
          b.colorize()
        })
      },
      n.prototype.colorize = function () {
        var t,
        n;
        return n = this.widgetPars.colorizeMode,
        t = this.palette.getSimpleColorTable(),
        e.sendMessage(this.$iframe[0].contentWindow, '*', 'palettonwidget/colorize/' + n, t)
      },
      n
    }(),
    f
  })
}.call(this), function () {
  define('widget.app.core', [
    'app.ini',
    'app.events',
    'app.history',
    'util',
    'color.palette.class',
    'widget.ui.withwheel.class'
  ], function (e, t, n, r, i, s) {
    var o;
    return o = {
      init: function () {
        var r,
        o,
        u,
        a;
        return u = this,
        t.init($('#app')),
        u = this,
        r = new i('mono', 0, 30),
        a = new s(r, $('#app')),
        o = window[e.namespace.widgetPrefix] = {
          events: t,
          palette: r,
          ui: a
        },
        n.init(),
        t.listenMessages(),
        t.sendMessage(parent, '*', 'palettonwidget/loaded', null)
      }
    },
    o
  })
}.call(this), function () {
  var e;
  e = function (e) {
    return $('#jstest').removeClass('loading').html('ERROR: ' + e)
  },
  $(function () {
    return require.config(),
    window.postMessage ? browserInfo.isOldIE ? e('MSIE prior to version 9 is not supported by this application.\t\t<p>You may try a <a href="/previous/">previous version</a>, it could work work you.</p>')  : browserInfo.isOpera ? e('Opera browser is not supported by this application.\t\t<p>You may try a <a href="/previous/">previous version</a>, it could work work you.</p>')  : require(['widget.app.core'], function (e) {
      return e.init()
    })  : e('Your browser is not supported.')
  })
}.call(this), define('widget.app', function () {
});
