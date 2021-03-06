// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"typingEditor/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var java = "\npublic class StringCompareEmp{\n    public static void main(String args[]){\n       String str = \"Hello World\";\n       String anotherString = \"hello world\";\n       Object objStr = str;\n  \n       System.out.println( str.compareTo(anotherString) );\n       System.out.println( str.compareToIgnoreCase(anotherString) );\n       System.out.println( str.compareTo(objStr.toString()));\n    }\n }\n";
var js = "\ndocument.ready = function (callback) {\n    if (document.addEventListener) {\n        document.addEventListener('DOMContentLoaded', function () {\n            document.removeEventListener('DOMContentLoaded', arguments.callee, false);\n            callback();\n        }, false)\n    }\n    else if (document.attachEvent) {\n        document.attachEvent('onreadystatechange', function () {\n              if (document.readyState == \"complete\") {\n                        document.detachEvent(\"onreadystatechange\", arguments.callee);\n                        callback();\n               }\n        })\n    }\n    else if (document.lastChild == document.body) {\n        callback();\n    }\n}\n";
var line = "this is a line!";
exports.default = {
  content: java,
  java: java,
  js: js
};
},{}],"typingEditor/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var utils = {
  hasClass: hasClass,
  addClass: addClass,
  remove: remove,
  timeLeft: timeLeft
};
/**
 *@desc 判断是否有某个Class
 *@param {HTMLElement} el 元素
 *@param {string} className 类名
 *@return {boolean}
 */

function hasClass(el, className) {
  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(el.className);
}
/**
 * @desc 添加Class
 * @param el 元素
 * @param className 类名
 */


function addClass(el, className) {
  if (hasClass(el, className)) return false;
  el.className += " " + className;
}

function remove(el, className) {
  if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}
/**
 * @desc startTime - endTime 剩余时间
 * @param   startTime
 * @param   endTime
 * @return Object {d,h,m,s} 天时分秒
 */


function timeLeft(startTime, endTime) {
  if (!startTime || !endTime) {
    return false;
  }

  var t = endTime.getTime() - startTime.getTime();
  var d = 0,
      h = 0,
      m = 0,
      s = 0,
      format = '0';

  if (t > 0) {
    d = t / 3600 / 24 / 1000;
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
    format = m + "\u5206" + s + "\u79D2";
  }

  return {
    d: d,
    h: h,
    m: m,
    s: s,
    format: format
  };
}

exports.default = utils;
window.utils = utils;
},{}],"typingEditor/view.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __importDefault(require("./utils"));

var CharBlock =
/** @class */
function () {
  function CharBlock(char, type) {
    if (type === void 0) {
      type = "default";
    }

    this.isActive = false;
    this.char = char;
    this.type = type;
    this.html = document.createElement("span");
    this.initCharHtml();
    this.changeType(type);
  }

  CharBlock.prototype.initCharHtml = function () {
    var char = this.char;
    this.html.innerHTML = char;
  };

  CharBlock.prototype.changeType = function (type) {
    if (this.type === 'end') return;
    this.html.className = "char " + type + " " + (this.isActive ? "isActive" : "");
  };

  CharBlock.prototype.toggleActive = function (isActive) {
    this.isActive = isActive;

    if (this.isActive) {
      utils_1.default.addClass(this.html, "isActive");
    } else {
      utils_1.default.remove(this.html, "isActive");
    }
  };

  return CharBlock;
}();

exports.CharBlock = CharBlock;

var Line =
/** @class */
function () {
  function Line(lineText, type) {
    this.charList = [];
    this.initLine(lineText, type);
  }

  Line.prototype.initLine = function (text, type) {
    var _this = this;

    this.html = document.createElement("p");
    utils_1.default.addClass(this.html, "line");
    text.forEach(function (char) {
      var blockType = type === "input" ? "transparent" : "default";

      if (char === "indent") {
        blockType = "indent";
        char = "&nbsp";
      } else if (char === 'end') {
        blockType = "end";
        char = "&nbsp";
      }

      var charBlock = new CharBlock(char, blockType);

      _this.charList.push(charBlock);

      _this.html.append(charBlock.html);
    });
  };

  return Line;
}();

exports.Line = Line;

var View =
/** @class */
function () {
  function View(text, type) {
    this.lineList = [];
    this.text = text;
    this.html = document.createElement("div");
    utils_1.default.addClass(this.html, type);
    this.handleText(type);
  }

  View.prototype.handleText = function (type) {
    var text = this.text;
    var line = [];
    var char;
    var indent = true;

    for (var i = 0; i < text.length; i++) {
      char = text[i];

      if (!char || char === " ") {
        char = indent ? "indent" : "&nbsp;";
      } else if (char === "\r\n" || char === "\n") {
        var lineClass_1 = new Line(line, type);
        this.lineList.push(lineClass_1);
        this.html.append(lineClass_1.html);
        line = [];
        indent = true;
        continue;
      } else {
        indent = false;
      }

      line.push(char);
    }

    line.push('end');
    var lineClass = new Line(line, type);
    this.lineList.push(lineClass);
    this.html.append(lineClass.html);
  };

  return View;
}();

exports.View = View;
},{"./utils":"typingEditor/utils.ts"}],"typingEditor/analysis.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __importDefault(require("./utils"));

var Analysis =
/** @class */
function () {
  function Analysis() {
    var _this = this;

    this.inputNum = 0;
    this.errorNum = 0;
    this.isEnd = false;
    this.time = new Time();
    this.html = document.createElement("div");
    utils_1.default.addClass(this.html, "analysis");
    this.timer = setInterval(function () {
      if (_this.isEnd) {
        clearInterval(_this.timer);
      }

      _this.appendHtml();
    }, 1000);
  }

  Analysis.prototype.addInput = function () {
    if (this.isEnd) return;

    if (this.inputNum === 0) {
      this.time.setStart();
    }

    this.inputNum++;
    this.handleData();
  };

  Analysis.prototype.errorInput = function () {
    if (this.isEnd) return;
    this.errorNum++;
  };

  Analysis.prototype.endInput = function () {
    if (this.isEnd) return;
    this.isEnd = true;
    this.time.setEnd();
  };

  Analysis.prototype.handleData = function () {
    this.result = {
      totalTime: this.time.total,
      totalInput: this.inputNum,
      error: this.errorNum,
      correctRate: this.inputNum ? 1 - this.errorNum / this.inputNum : 1
    };
  };

  Analysis.prototype.appendHtml = function () {
    this.time.handleCostTime();
    this.handleData();
    var r = this.result;
    var html = "<span>\u7528\u65F6:" + (r.totalTime.format || "0") + "</span><span>\u603B\u8F93\u5165:" + r.totalInput + "</span><span>\u9519\u8BEF:" + r.error + "</span><span>\u6B63\u786E\u7387:" + Math.ceil(r.correctRate * 100) + "%</span>";
    this.html.innerHTML = html;
  };

  return Analysis;
}();

exports.Analysis = Analysis;

var Time =
/** @class */
function () {
  function Time() {}

  Time.prototype.setStart = function () {
    this.start = new Date();
  };

  Time.prototype.setEnd = function () {
    this.end = new Date();
    this.handleCostTime();
  };

  Time.prototype.handleCostTime = function () {
    var end = new Date();

    if (this.end) {
      end = this.end;
    }

    this.total = utils_1.default.timeLeft(this.start, end);
  };

  return Time;
}();

exports.Time = Time;
},{"./utils":"typingEditor/utils.ts"}],"typingEditor/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var config_1 = __importDefault(require("./config"));

var utils_1 = __importDefault(require("./utils"));

var view_1 = require("./view");

var analysis_1 = require("./analysis");
/**
 * @desc Typing 类
 * @
 */


var Typing =
/** @class */
function () {
  /**
   * 创建Typing实例
   * @param config.text 文章内容
   * @param config.el 挂载的htmlElement
   */
  function Typing(config) {
    this.index = [0, 0];
    this.el = config.el;
    var wrap = document.createElement("div");
    utils_1.default.addClass(wrap, "screen-warp");
    this.displayView = new view_1.View(config.text, "display");
    this.inputView = new view_1.View(config.text, "input");
    this.analysis = new analysis_1.Analysis();
    wrap.append(this.displayView.html, this.inputView.html);
    this.el.append(this.analysis.html, wrap);
    this.handleKeyEvent();
  }
  /**
   * 监听键盘输入
   */


  Typing.prototype.handleKeyEvent = function () {
    var _this = this;

    window.onkeydown = function (event) {
      var code = event.keyCode;
      var key = event.key;

      var lineIndex = function lineIndex() {
        return _this.index[1];
      };

      var charIndex = function charIndex() {
        return _this.index[0];
      };

      var inputBlock = function inputBlock() {
        return _this.inputView.lineList[lineIndex()].charList[charIndex()];
      };

      var displayBlock = function displayBlock() {
        return _this.displayView.lineList[lineIndex()].charList[charIndex()];
      }; // input text


      if (code > 47 && code < 59 || code > 64 && code < 91 || code > 185 && code < 223 || code === 32) {
        var type = "correct";

        if (key === " ") {
          key = "&nbsp;";

          if (event.preventDefault) {
            event.preventDefault();
          } else {
            window.event.returnValue = false;
          }
        }

        if (key !== displayBlock().char) {
          type = "error";

          _this.analysis.errorInput();
        }

        if (displayBlock().type === "end") {
          _this.analysis.endInput();
        }

        displayBlock().changeType("transparent");
        inputBlock().changeType(type);

        _this.moveIndex("forward"); // 计数


        _this.analysis.addInput(); // 阻止浏览器默认

      } // ENTER


      if (code === 13) {} // back


      if (code === 8) {
        _this.moveIndex("back");

        displayBlock().changeType("default");
        inputBlock().changeType("transparent");
      }
    };
  };
  /**
   * 移动光标
   * @param type 移动方向
   */


  Typing.prototype.moveIndex = function (type) {
    var _this = this;

    var lineIndex = this.index[1];
    var charIndex = this.index[0];

    var line = function line() {
      return _this.displayView.lineList[_this.index[1]];
    };

    var char = function char() {
      return line().charList[_this.index[0]];
    };

    char().toggleActive(false);

    if (type === "forward") {
      if (checkEnd(this.displayView)) return;

      if (charIndex >= line().charList.length - 1) {
        this.index[0] = 0;
        this.index[1]++;
      } else {
        this.index[0]++;
      }
    } else if (type === "back") {
      if (checkStart(this.displayView)) return;

      if (charIndex > 0 && char().type !== "indent") {
        this.index[0]--;
      } else {
        this.index[1]--;
        this.index[0] = line().charList.length - 1;
      }
    }

    char().toggleActive(true);
    if (char().type === "indent") this.moveIndex(type);

    function checkEnd(view) {
      return lineIndex === view.lineList.length - 1 && line().charList.length - 1 === charIndex;
    }

    function checkStart(view) {
      return lineIndex === 0 && charIndex === 0;
    }
  };

  return Typing;
}(); // 主函数


function __main__() {
  var config = {
    el: document.getElementById("typing"),
    text: config_1.default.content.trim()
  };
  var typing = new Typing(config);
}

window.onload = function () {
  __main__();
};
},{"./config":"typingEditor/config.ts","./utils":"typingEditor/utils.ts","./view":"typingEditor/view.ts","./analysis":"typingEditor/analysis.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59814" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","typingEditor/index.ts"], null)
//# sourceMappingURL=/typingEditor.66f7f39c.js.map