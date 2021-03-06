/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFormat = exports.DateTimeFormat = exports.Collator = exports.lang = undefined;
exports.t = t;
exports.r = r;

var _intl = __webpack_require__(2);

var _intl2 = _interopRequireDefault(_intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Intl = window.Intl || _intl2.default;

// require('@formatjs/intl-relativetimeformat/polyfill');
// require('@formatjs/intl-pluralrules/polyfill');

var lang = exports.lang = window.__WEDOCS_LANG__ || 'zh-CN';
var IDENTIFIER_REG = /^[a-zA-Z_\-]{4,10}(?=#)/;
var IDENTIFIER_REP = /^[a-zA-Z_\-]{4,10}#/;

function tplReplace(text, args) {
  return text.replace(/{(\d+)}/g, function ($0, $1) {
    return '' + ($1 in args ? args[$1] : $0);
  });
}

function t(text, args) {
  text = text || '';
  var identifier = IDENTIFIER_REG.exec(text);
  var pack = (window.__WEDOCS_LANG_PKG__ || {})[lang] || {};

  if (identifier && pack[identifier[0]]) {
    return tplReplace(pack[identifier[0]], args);
  }

  return tplReplace(text.replace(IDENTIFIER_REP, ''), args);
}

function r(text, args) {
  return tplReplace(text, args);
}

var Collator = exports.Collator = window.Intl.Collator;
var DateTimeFormat = exports.DateTimeFormat = window.Intl.DateTimeFormat;
var NumberFormat = exports.NumberFormat = window.Intl.NumberFormat;
// export const PluralRules = window.Intl.PluralRules;
// export const RelativeTimeFormat = window.Intl.RelativeTimeFormat;

window.I18N = window.Intl;
window.I18N.r = r;
window.I18N.t = t;
window.I18N.lang = lang;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Expose `IntlPolyfill` as global to add locale data into runtime later on.
global.IntlPolyfill = __webpack_require__(4);

// Require all locale data for `Intl`. This module will be
// ignored when bundling for the browser with Browserify/Webpack.
__webpack_require__(5);

// hack to export the polyfill as global Intl if needed
if (!global.Intl) {
    global.Intl = global.IntlPolyfill;
    global.IntlPolyfill.__applyLocaleSensitivePrototypes();
}

// providing an idiomatic api for the nodejs version of this module
module.exports = global.IntlPolyfill;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var jsx = function () {
  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  return function createRawReactElement(type, props, key, children) {
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {};
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  };
}();

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            return step("next", value);
          }, function (err) {
            return step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

var defaults = function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

var defineProperty$1 = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var _instanceof = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

var interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

var interopRequireWildcard = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
};

var newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var selfGlobal = typeof global === "undefined" ? self : global;

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var slicedToArrayLoose = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

var temporalRef = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
};

var temporalUndefined = {};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};



var babelHelpers$1 = Object.freeze({
  jsx: jsx,
  asyncToGenerator: asyncToGenerator,
  classCallCheck: classCallCheck,
  createClass: createClass,
  defineEnumerableProperties: defineEnumerableProperties,
  defaults: defaults,
  defineProperty: defineProperty$1,
  get: get,
  inherits: inherits,
  interopRequireDefault: interopRequireDefault,
  interopRequireWildcard: interopRequireWildcard,
  newArrowCheck: newArrowCheck,
  objectDestructuringEmpty: objectDestructuringEmpty,
  objectWithoutProperties: objectWithoutProperties,
  possibleConstructorReturn: possibleConstructorReturn,
  selfGlobal: selfGlobal,
  set: set,
  slicedToArray: slicedToArray,
  slicedToArrayLoose: slicedToArrayLoose,
  taggedTemplateLiteral: taggedTemplateLiteral,
  taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
  temporalRef: temporalRef,
  temporalUndefined: temporalUndefined,
  toArray: toArray,
  toConsumableArray: toConsumableArray,
  typeof: _typeof,
  extends: _extends,
  instanceof: _instanceof
});

var realDefineProp = function () {
    var sentinel = function sentinel() {};
    try {
        Object.defineProperty(sentinel, 'a', {
            get: function get() {
                return 1;
            }
        });
        Object.defineProperty(sentinel, 'prototype', { writable: false });
        return sentinel.a === 1 && sentinel.prototype instanceof Object;
    } catch (e) {
        return false;
    }
}();

// Need a workaround for getters in ES3
var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

// We use this a lot (and need it for proto-less objects)
var hop = Object.prototype.hasOwnProperty;

// Naive defineProperty for compatibility
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) obj.__defineGetter__(name, desc.get);else if (!hop.call(obj, name) || 'value' in desc) obj[name] = desc.value;
};

// Array.prototype.indexOf, as good as we need it to be
var arrIndexOf = Array.prototype.indexOf || function (search) {
    /*jshint validthis:true */
    var t = this;
    if (!t.length) return -1;

    for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
        if (t[i] === search) return i;
    }

    return -1;
};

// Create an object with the specified prototype (2nd arg required for Record)
var objCreate = Object.create || function (proto, props) {
    var obj = void 0;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (var k in props) {
        if (hop.call(props, k)) defineProperty(obj, k, props[k]);
    }

    return obj;
};

// Snapshot some (hopefully still) native built-ins
var arrSlice = Array.prototype.slice;
var arrConcat = Array.prototype.concat;
var arrPush = Array.prototype.push;
var arrJoin = Array.prototype.join;
var arrShift = Array.prototype.shift;

// Naive Function.prototype.bind for compatibility
var fnBind = Function.prototype.bind || function (thisObj) {
    var fn = this,
        args = arrSlice.call(arguments, 1);

    // All our (presently) bound functions have either 1 or 0 arguments. By returning
    // different function signatures, we can pass some tests in ES3 environments
    if (fn.length === 1) {
        return function () {
            return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
        };
    }
    return function () {
        return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
    };
};

// Object housing internal properties for constructors
var internals = objCreate(null);

// Keep internal properties internal
var secret = Math.random();

// Helper functions
// ================

/**
 * A function to deal with the inaccuracy of calculating log10 in pre-ES6
 * JavaScript environments. Math.log(num) / Math.LN10 was responsible for
 * causing issue #62.
 */
function log10Floor(n) {
    // ES6 provides the more accurate Math.log10
    if (typeof Math.log10 === 'function') return Math.floor(Math.log10(n));

    var x = Math.round(Math.log(n) * Math.LOG10E);
    return x - (Number('1e' + x) > n);
}

/**
 * A map that doesn't contain Object in its prototype chain
 */
function Record(obj) {
    // Copy only own properties over unless this object is already a Record instance
    for (var k in obj) {
        if (obj instanceof Record || hop.call(obj, k)) defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
    }
}
Record.prototype = objCreate(null);

/**
 * An ordered list
 */
function List() {
    defineProperty(this, 'length', { writable: true, value: 0 });

    if (arguments.length) arrPush.apply(this, arrSlice.call(arguments));
}
List.prototype = objCreate(null);

/**
 * Constructs a regular expression to restore tainted RegExp properties
 */
function createRegExpRestore() {
    if (internals.disableRegExpRestore) {
        return function () {/* no-op */};
    }

    var regExpCache = {
        lastMatch: RegExp.lastMatch || '',
        leftContext: RegExp.leftContext,
        multiline: RegExp.multiline,
        input: RegExp.input
    },
        has = false;

    // Create a snapshot of all the 'captured' properties
    for (var i = 1; i <= 9; i++) {
        has = (regExpCache['$' + i] = RegExp['$' + i]) || has;
    }return function () {
        // Now we've snapshotted some properties, escape the lastMatch string
        var esc = /[.?*+^$[\]\\(){}|-]/g,
            lm = regExpCache.lastMatch.replace(esc, '\\$&'),
            reg = new List();

        // If any of the captured strings were non-empty, iterate over them all
        if (has) {
            for (var _i = 1; _i <= 9; _i++) {
                var m = regExpCache['$' + _i];

                // If it's empty, add an empty capturing group
                if (!m) lm = '()' + lm;

                // Else find the string in lm and escape & wrap it to capture it
                else {
                        m = m.replace(esc, '\\$&');
                        lm = lm.replace(m, '(' + m + ')');
                    }

                // Push it to the reg and chop lm to make sure further groups come after
                arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
                lm = lm.slice(lm.indexOf('(') + 1);
            }
        }

        var exprStr = arrJoin.call(reg, '') + lm;

        // Shorten the regex by replacing each part of the expression with a match
        // for a string of that exact length.  This is safe for the type of
        // expressions generated above, because the expression matches the whole
        // match string, so we know each group and each segment between capturing
        // groups can be matched by its length alone.
        exprStr = exprStr.replace(/(\\\(|\\\)|[^()])+/g, function (match) {
            return '[\\s\\S]{' + match.replace('\\', '').length + '}';
        });

        // Create the regular expression that will reconstruct the RegExp properties
        var expr = new RegExp(exprStr, regExpCache.multiline ? 'gm' : 'g');

        // Set the lastIndex of the generated expression to ensure that the match
        // is found in the correct index.
        expr.lastIndex = regExpCache.leftContext.length;

        expr.exec(regExpCache.input);
    };
}

/**
 * Mimics ES5's abstract ToObject() function
 */
function toObject(arg) {
    if (arg === null) throw new TypeError('Cannot convert null or undefined to object');

    if ((typeof arg === 'undefined' ? 'undefined' : babelHelpers$1['typeof'](arg)) === 'object') return arg;
    return Object(arg);
}

function toNumber(arg) {
    if (typeof arg === 'number') return arg;
    return Number(arg);
}

function toInteger(arg) {
    var number = toNumber(arg);
    if (isNaN(number)) return 0;
    if (number === +0 || number === -0 || number === +Infinity || number === -Infinity) return number;
    if (number < 0) return Math.floor(Math.abs(number)) * -1;
    return Math.floor(Math.abs(number));
}

function toLength(arg) {
    var len = toInteger(arg);
    if (len <= 0) return 0;
    if (len === Infinity) return Math.pow(2, 53) - 1;
    return Math.min(len, Math.pow(2, 53) - 1);
}

/**
 * Returns "internal" properties for an object
 */
function getInternalProperties(obj) {
    if (hop.call(obj, '__getInternalProperties')) return obj.__getInternalProperties(secret);

    return objCreate(null);
}

/**
* Defines regular expressions for various operations related to the BCP 47 syntax,
* as defined at http://tools.ietf.org/html/bcp47#section-2.1
*/

// extlang       = 3ALPHA              ; selected ISO 639 codes
//                 *2("-" 3ALPHA)      ; permanently reserved
var extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}';

// language      = 2*3ALPHA            ; shortest ISO 639 code
//                 ["-" extlang]       ; sometimes followed by
//                                     ; extended language subtags
//               / 4ALPHA              ; or reserved for future use
//               / 5*8ALPHA            ; or registered language subtag
var language = '(?:[a-z]{2,3}(?:-' + extlang + ')?|[a-z]{4}|[a-z]{5,8})';

// script        = 4ALPHA              ; ISO 15924 code
var script = '[a-z]{4}';

// region        = 2ALPHA              ; ISO 3166-1 code
//               / 3DIGIT              ; UN M.49 code
var region = '(?:[a-z]{2}|\\d{3})';

// variant       = 5*8alphanum         ; registered variants
//               / (DIGIT 3alphanum)
var variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})';

//                                     ; Single alphanumerics
//                                     ; "x" reserved for private use
// singleton     = DIGIT               ; 0 - 9
//               / %x41-57             ; A - W
//               / %x59-5A             ; Y - Z
//               / %x61-77             ; a - w
//               / %x79-7A             ; y - z
var singleton = '[0-9a-wy-z]';

// extension     = singleton 1*("-" (2*8alphanum))
var extension = singleton + '(?:-[a-z0-9]{2,8})+';

// privateuse    = "x" 1*("-" (1*8alphanum))
var privateuse = 'x(?:-[a-z0-9]{1,8})+';

// irregular     = "en-GB-oed"         ; irregular tags do not match
//               / "i-ami"             ; the 'langtag' production and
//               / "i-bnn"             ; would not otherwise be
//               / "i-default"         ; considered 'well-formed'
//               / "i-enochian"        ; These tags are all valid,
//               / "i-hak"             ; but most are deprecated
//               / "i-klingon"         ; in favor of more modern
//               / "i-lux"             ; subtags or subtag
//               / "i-mingo"           ; combination
//               / "i-navajo"
//               / "i-pwn"
//               / "i-tao"
//               / "i-tay"
//               / "i-tsu"
//               / "sgn-BE-FR"
//               / "sgn-BE-NL"
//               / "sgn-CH-DE"
var irregular = '(?:en-GB-oed' + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)' + '|sgn-(?:BE-FR|BE-NL|CH-DE))';

// regular       = "art-lojban"        ; these tags match the 'langtag'
//               / "cel-gaulish"       ; production, but their subtags
//               / "no-bok"            ; are not extended language
//               / "no-nyn"            ; or variant subtags: their meaning
//               / "zh-guoyu"          ; is defined by their registration
//               / "zh-hakka"          ; and all of these are deprecated
//               / "zh-min"            ; in favor of a more modern
//               / "zh-min-nan"        ; subtag or sequence of subtags
//               / "zh-xiang"
var regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn' + '|zh-(?:guoyu|hakka|min|min-nan|xiang))';

// grandfathered = irregular           ; non-redundant tags registered
//               / regular             ; during the RFC 3066 era
var grandfathered = '(?:' + irregular + '|' + regular + ')';

// langtag       = language
//                 ["-" script]
//                 ["-" region]
//                 *("-" variant)
//                 *("-" extension)
//                 ["-" privateuse]
var langtag = language + '(?:-' + script + ')?(?:-' + region + ')?(?:-' + variant + ')*(?:-' + extension + ')*(?:-' + privateuse + ')?';

// Language-Tag  = langtag             ; normal language tags
//               / privateuse          ; private use tag
//               / grandfathered       ; grandfathered tags
var expBCP47Syntax = RegExp('^(?:' + langtag + '|' + privateuse + '|' + grandfathered + ')$', 'i');

// Match duplicate variants in a language tag
var expVariantDupes = RegExp('^(?!x).*?-(' + variant + ')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');

// Match duplicate singletons in a language tag (except in private use)
var expSingletonDupes = RegExp('^(?!x).*?-(' + singleton + ')-(?:\\w+-(?!x-))*\\1\\b', 'i');

// Match all extension sequences
var expExtSequences = RegExp('-' + extension, 'ig');

// Default locale is the first-added locale data for us
var defaultLocale = void 0;
function setDefaultLocale(locale) {
    defaultLocale = locale;
}

// IANA Subtag Registry redundant tag and subtag maps
var redundantTags = {
    tags: {
        "art-lojban": "jbo",
        "i-ami": "ami",
        "i-bnn": "bnn",
        "i-hak": "hak",
        "i-klingon": "tlh",
        "i-lux": "lb",
        "i-navajo": "nv",
        "i-pwn": "pwn",
        "i-tao": "tao",
        "i-tay": "tay",
        "i-tsu": "tsu",
        "no-bok": "nb",
        "no-nyn": "nn",
        "sgn-BE-FR": "sfb",
        "sgn-BE-NL": "vgt",
        "sgn-CH-DE": "sgg",
        "zh-guoyu": "cmn",
        "zh-hakka": "hak",
        "zh-min-nan": "nan",
        "zh-xiang": "hsn",
        "sgn-BR": "bzs",
        "sgn-CO": "csn",
        "sgn-DE": "gsg",
        "sgn-DK": "dsl",
        "sgn-ES": "ssp",
        "sgn-FR": "fsl",
        "sgn-GB": "bfi",
        "sgn-GR": "gss",
        "sgn-IE": "isg",
        "sgn-IT": "ise",
        "sgn-JP": "jsl",
        "sgn-MX": "mfs",
        "sgn-NI": "ncs",
        "sgn-NL": "dse",
        "sgn-NO": "nsl",
        "sgn-PT": "psr",
        "sgn-SE": "swl",
        "sgn-US": "ase",
        "sgn-ZA": "sfs",
        "zh-cmn": "cmn",
        "zh-cmn-Hans": "cmn-Hans",
        "zh-cmn-Hant": "cmn-Hant",
        "zh-gan": "gan",
        "zh-wuu": "wuu",
        "zh-yue": "yue"
    },
    subtags: {
        BU: "MM",
        DD: "DE",
        FX: "FR",
        TP: "TL",
        YD: "YE",
        ZR: "CD",
        heploc: "alalc97",
        'in': "id",
        iw: "he",
        ji: "yi",
        jw: "jv",
        mo: "ro",
        ayx: "nun",
        bjd: "drl",
        ccq: "rki",
        cjr: "mom",
        cka: "cmr",
        cmk: "xch",
        drh: "khk",
        drw: "prs",
        gav: "dev",
        hrr: "jal",
        ibi: "opa",
        kgh: "kml",
        lcq: "ppr",
        mst: "mry",
        myt: "mry",
        sca: "hle",
        tie: "ras",
        tkk: "twm",
        tlw: "weo",
        tnf: "prs",
        ybd: "rki",
        yma: "lrr"
    },
    extLang: {
        aao: ["aao", "ar"],
        abh: ["abh", "ar"],
        abv: ["abv", "ar"],
        acm: ["acm", "ar"],
        acq: ["acq", "ar"],
        acw: ["acw", "ar"],
        acx: ["acx", "ar"],
        acy: ["acy", "ar"],
        adf: ["adf", "ar"],
        ads: ["ads", "sgn"],
        aeb: ["aeb", "ar"],
        aec: ["aec", "ar"],
        aed: ["aed", "sgn"],
        aen: ["aen", "sgn"],
        afb: ["afb", "ar"],
        afg: ["afg", "sgn"],
        ajp: ["ajp", "ar"],
        apc: ["apc", "ar"],
        apd: ["apd", "ar"],
        arb: ["arb", "ar"],
        arq: ["arq", "ar"],
        ars: ["ars", "ar"],
        ary: ["ary", "ar"],
        arz: ["arz", "ar"],
        ase: ["ase", "sgn"],
        asf: ["asf", "sgn"],
        asp: ["asp", "sgn"],
        asq: ["asq", "sgn"],
        asw: ["asw", "sgn"],
        auz: ["auz", "ar"],
        avl: ["avl", "ar"],
        ayh: ["ayh", "ar"],
        ayl: ["ayl", "ar"],
        ayn: ["ayn", "ar"],
        ayp: ["ayp", "ar"],
        bbz: ["bbz", "ar"],
        bfi: ["bfi", "sgn"],
        bfk: ["bfk", "sgn"],
        bjn: ["bjn", "ms"],
        bog: ["bog", "sgn"],
        bqn: ["bqn", "sgn"],
        bqy: ["bqy", "sgn"],
        btj: ["btj", "ms"],
        bve: ["bve", "ms"],
        bvl: ["bvl", "sgn"],
        bvu: ["bvu", "ms"],
        bzs: ["bzs", "sgn"],
        cdo: ["cdo", "zh"],
        cds: ["cds", "sgn"],
        cjy: ["cjy", "zh"],
        cmn: ["cmn", "zh"],
        coa: ["coa", "ms"],
        cpx: ["cpx", "zh"],
        csc: ["csc", "sgn"],
        csd: ["csd", "sgn"],
        cse: ["cse", "sgn"],
        csf: ["csf", "sgn"],
        csg: ["csg", "sgn"],
        csl: ["csl", "sgn"],
        csn: ["csn", "sgn"],
        csq: ["csq", "sgn"],
        csr: ["csr", "sgn"],
        czh: ["czh", "zh"],
        czo: ["czo", "zh"],
        doq: ["doq", "sgn"],
        dse: ["dse", "sgn"],
        dsl: ["dsl", "sgn"],
        dup: ["dup", "ms"],
        ecs: ["ecs", "sgn"],
        esl: ["esl", "sgn"],
        esn: ["esn", "sgn"],
        eso: ["eso", "sgn"],
        eth: ["eth", "sgn"],
        fcs: ["fcs", "sgn"],
        fse: ["fse", "sgn"],
        fsl: ["fsl", "sgn"],
        fss: ["fss", "sgn"],
        gan: ["gan", "zh"],
        gds: ["gds", "sgn"],
        gom: ["gom", "kok"],
        gse: ["gse", "sgn"],
        gsg: ["gsg", "sgn"],
        gsm: ["gsm", "sgn"],
        gss: ["gss", "sgn"],
        gus: ["gus", "sgn"],
        hab: ["hab", "sgn"],
        haf: ["haf", "sgn"],
        hak: ["hak", "zh"],
        hds: ["hds", "sgn"],
        hji: ["hji", "ms"],
        hks: ["hks", "sgn"],
        hos: ["hos", "sgn"],
        hps: ["hps", "sgn"],
        hsh: ["hsh", "sgn"],
        hsl: ["hsl", "sgn"],
        hsn: ["hsn", "zh"],
        icl: ["icl", "sgn"],
        ils: ["ils", "sgn"],
        inl: ["inl", "sgn"],
        ins: ["ins", "sgn"],
        ise: ["ise", "sgn"],
        isg: ["isg", "sgn"],
        isr: ["isr", "sgn"],
        jak: ["jak", "ms"],
        jax: ["jax", "ms"],
        jcs: ["jcs", "sgn"],
        jhs: ["jhs", "sgn"],
        jls: ["jls", "sgn"],
        jos: ["jos", "sgn"],
        jsl: ["jsl", "sgn"],
        jus: ["jus", "sgn"],
        kgi: ["kgi", "sgn"],
        knn: ["knn", "kok"],
        kvb: ["kvb", "ms"],
        kvk: ["kvk", "sgn"],
        kvr: ["kvr", "ms"],
        kxd: ["kxd", "ms"],
        lbs: ["lbs", "sgn"],
        lce: ["lce", "ms"],
        lcf: ["lcf", "ms"],
        liw: ["liw", "ms"],
        lls: ["lls", "sgn"],
        lsg: ["lsg", "sgn"],
        lsl: ["lsl", "sgn"],
        lso: ["lso", "sgn"],
        lsp: ["lsp", "sgn"],
        lst: ["lst", "sgn"],
        lsy: ["lsy", "sgn"],
        ltg: ["ltg", "lv"],
        lvs: ["lvs", "lv"],
        lzh: ["lzh", "zh"],
        max: ["max", "ms"],
        mdl: ["mdl", "sgn"],
        meo: ["meo", "ms"],
        mfa: ["mfa", "ms"],
        mfb: ["mfb", "ms"],
        mfs: ["mfs", "sgn"],
        min: ["min", "ms"],
        mnp: ["mnp", "zh"],
        mqg: ["mqg", "ms"],
        mre: ["mre", "sgn"],
        msd: ["msd", "sgn"],
        msi: ["msi", "ms"],
        msr: ["msr", "sgn"],
        mui: ["mui", "ms"],
        mzc: ["mzc", "sgn"],
        mzg: ["mzg", "sgn"],
        mzy: ["mzy", "sgn"],
        nan: ["nan", "zh"],
        nbs: ["nbs", "sgn"],
        ncs: ["ncs", "sgn"],
        nsi: ["nsi", "sgn"],
        nsl: ["nsl", "sgn"],
        nsp: ["nsp", "sgn"],
        nsr: ["nsr", "sgn"],
        nzs: ["nzs", "sgn"],
        okl: ["okl", "sgn"],
        orn: ["orn", "ms"],
        ors: ["ors", "ms"],
        pel: ["pel", "ms"],
        pga: ["pga", "ar"],
        pks: ["pks", "sgn"],
        prl: ["prl", "sgn"],
        prz: ["prz", "sgn"],
        psc: ["psc", "sgn"],
        psd: ["psd", "sgn"],
        pse: ["pse", "ms"],
        psg: ["psg", "sgn"],
        psl: ["psl", "sgn"],
        pso: ["pso", "sgn"],
        psp: ["psp", "sgn"],
        psr: ["psr", "sgn"],
        pys: ["pys", "sgn"],
        rms: ["rms", "sgn"],
        rsi: ["rsi", "sgn"],
        rsl: ["rsl", "sgn"],
        sdl: ["sdl", "sgn"],
        sfb: ["sfb", "sgn"],
        sfs: ["sfs", "sgn"],
        sgg: ["sgg", "sgn"],
        sgx: ["sgx", "sgn"],
        shu: ["shu", "ar"],
        slf: ["slf", "sgn"],
        sls: ["sls", "sgn"],
        sqk: ["sqk", "sgn"],
        sqs: ["sqs", "sgn"],
        ssh: ["ssh", "ar"],
        ssp: ["ssp", "sgn"],
        ssr: ["ssr", "sgn"],
        svk: ["svk", "sgn"],
        swc: ["swc", "sw"],
        swh: ["swh", "sw"],
        swl: ["swl", "sgn"],
        syy: ["syy", "sgn"],
        tmw: ["tmw", "ms"],
        tse: ["tse", "sgn"],
        tsm: ["tsm", "sgn"],
        tsq: ["tsq", "sgn"],
        tss: ["tss", "sgn"],
        tsy: ["tsy", "sgn"],
        tza: ["tza", "sgn"],
        ugn: ["ugn", "sgn"],
        ugy: ["ugy", "sgn"],
        ukl: ["ukl", "sgn"],
        uks: ["uks", "sgn"],
        urk: ["urk", "ms"],
        uzn: ["uzn", "uz"],
        uzs: ["uzs", "uz"],
        vgt: ["vgt", "sgn"],
        vkk: ["vkk", "ms"],
        vkt: ["vkt", "ms"],
        vsi: ["vsi", "sgn"],
        vsl: ["vsl", "sgn"],
        vsv: ["vsv", "sgn"],
        wuu: ["wuu", "zh"],
        xki: ["xki", "sgn"],
        xml: ["xml", "sgn"],
        xmm: ["xmm", "ms"],
        xms: ["xms", "sgn"],
        yds: ["yds", "sgn"],
        ysl: ["ysl", "sgn"],
        yue: ["yue", "zh"],
        zib: ["zib", "sgn"],
        zlm: ["zlm", "ms"],
        zmi: ["zmi", "ms"],
        zsl: ["zsl", "sgn"],
        zsm: ["zsm", "ms"]
    }
};

/**
 * Convert only a-z to uppercase as per section 6.1 of the spec
 */
function toLatinUpperCase(str) {
    var i = str.length;

    while (i--) {
        var ch = str.charAt(i);

        if (ch >= "a" && ch <= "z") str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
    }

    return str;
}

/**
 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale
 * argument (which must be a String value)
 *
 * - represents a well-formed BCP 47 language tag as specified in RFC 5646 section
 *   2.1, or successor,
 * - does not include duplicate variant subtags, and
 * - does not include duplicate singleton subtags.
 *
 * The abstract operation returns true if locale can be generated from the ABNF
 * grammar in section 2.1 of the RFC, starting with Language-Tag, and does not
 * contain duplicate variant or singleton subtags (other than as a private use
 * subtag). It returns false otherwise. Terminal value characters in the grammar are
 * interpreted as the Unicode equivalents of the ASCII octet values given.
 */
function /* 6.2.2 */IsStructurallyValidLanguageTag(locale) {
    // represents a well-formed BCP 47 language tag as specified in RFC 5646
    if (!expBCP47Syntax.test(locale)) return false;

    // does not include duplicate variant subtags, and
    if (expVariantDupes.test(locale)) return false;

    // does not include duplicate singleton subtags.
    if (expSingletonDupes.test(locale)) return false;

    return true;
}

/**
 * The CanonicalizeLanguageTag abstract operation returns the canonical and case-
 * regularized form of the locale argument (which must be a String value that is
 * a structurally valid BCP 47 language tag as verified by the
 * IsStructurallyValidLanguageTag abstract operation). It takes the steps
 * specified in RFC 5646 section 4.5, or successor, to bring the language tag
 * into canonical form, and to regularize the case of the subtags, but does not
 * take the steps to bring a language tag into ???extlang form??? and to reorder
 * variant subtags.

 * The specifications for extensions to BCP 47 language tags, such as RFC 6067,
 * may include canonicalization rules for the extension subtag sequences they
 * define that go beyond the canonicalization rules of RFC 5646 section 4.5.
 * Implementations are allowed, but not required, to apply these additional rules.
 */
function /* 6.2.3 */CanonicalizeLanguageTag(locale) {
    var match = void 0,
        parts = void 0;

    // A language tag is in 'canonical form' when the tag is well-formed
    // according to the rules in Sections 2.1 and 2.2

    // Section 2.1 says all subtags use lowercase...
    locale = locale.toLowerCase();

    // ...with 2 exceptions: 'two-letter and four-letter subtags that neither
    // appear at the start of the tag nor occur after singletons.  Such two-letter
    // subtags are all uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and
    // four-letter subtags are titlecase (as in the tag "az-Latn-x-latn").
    parts = locale.split('-');
    for (var i = 1, max = parts.length; i < max; i++) {
        // Two-letter subtags are all uppercase
        if (parts[i].length === 2) parts[i] = parts[i].toUpperCase();

        // Four-letter subtags are titlecase
        else if (parts[i].length === 4) parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);

            // Is it a singleton?
            else if (parts[i].length === 1 && parts[i] !== 'x') break;
    }
    locale = arrJoin.call(parts, '-');

    // The steps laid out in RFC 5646 section 4.5 are as follows:

    // 1.  Extension sequences are ordered into case-insensitive ASCII order
    //     by singleton subtag.
    if ((match = locale.match(expExtSequences)) && match.length > 1) {
        // The built-in sort() sorts by ASCII order, so use that
        match.sort();

        // Replace all extensions with the joined, sorted array
        locale = locale.replace(RegExp('(?:' + expExtSequences.source + ')+', 'i'), arrJoin.call(match, ''));
    }

    // 2.  Redundant or grandfathered tags are replaced by their 'Preferred-
    //     Value', if there is one.
    if (hop.call(redundantTags.tags, locale)) locale = redundantTags.tags[locale];

    // 3.  Subtags are replaced by their 'Preferred-Value', if there is one.
    //     For extlangs, the original primary language subtag is also
    //     replaced if there is a primary language subtag in the 'Preferred-
    //     Value'.
    parts = locale.split('-');

    for (var _i = 1, _max = parts.length; _i < _max; _i++) {
        if (hop.call(redundantTags.subtags, parts[_i])) parts[_i] = redundantTags.subtags[parts[_i]];else if (hop.call(redundantTags.extLang, parts[_i])) {
            parts[_i] = redundantTags.extLang[parts[_i]][0];

            // For extlang tags, the prefix needs to be removed if it is redundant
            if (_i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
                parts = arrSlice.call(parts, _i++);
                _max -= 1;
            }
        }
    }

    return arrJoin.call(parts, '-');
}

/**
 * The DefaultLocale abstract operation returns a String value representing the
 * structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the
 * host environment???s current locale.
 */
function /* 6.2.4 */DefaultLocale() {
    return defaultLocale;
}

// Sect 6.3 Currency Codes
// =======================

var expCurrencyCode = /^[A-Z]{3}$/;

/**
 * The IsWellFormedCurrencyCode abstract operation verifies that the currency argument
 * (after conversion to a String value) represents a well-formed 3-letter ISO currency
 * code. The following steps are taken:
 */
function /* 6.3.1 */IsWellFormedCurrencyCode(currency) {
    // 1. Let `c` be ToString(currency)
    var c = String(currency);

    // 2. Let `normalized` be the result of mapping c to upper case as described
    //    in 6.1.
    var normalized = toLatinUpperCase(c);

    // 3. If the string length of normalized is not 3, return false.
    // 4. If normalized contains any character that is not in the range "A" to "Z"
    //    (U+0041 to U+005A), return false.
    if (expCurrencyCode.test(normalized) === false) return false;

    // 5. Return true
    return true;
}

var expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi; // See `extension` below

function /* 9.2.1 */CanonicalizeLocaleList(locales) {
    // The abstract operation CanonicalizeLocaleList takes the following steps:

    // 1. If locales is undefined, then a. Return a new empty List
    if (locales === undefined) return new List();

    // 2. Let seen be a new empty List.
    var seen = new List();

    // 3. If locales is a String value, then
    //    a. Let locales be a new array created as if by the expression new
    //    Array(locales) where Array is the standard built-in constructor with
    //    that name and locales is the value of locales.
    locales = typeof locales === 'string' ? [locales] : locales;

    // 4. Let O be ToObject(locales).
    var O = toObject(locales);

    // 5. Let lenValue be the result of calling the [[Get]] internal method of
    //    O with the argument "length".
    // 6. Let len be ToUint32(lenValue).
    var len = toLength(O.length);

    // 7. Let k be 0.
    var k = 0;

    // 8. Repeat, while k < len
    while (k < len) {
        // a. Let Pk be ToString(k).
        var Pk = String(k);

        // b. Let kPresent be the result of calling the [[HasProperty]] internal
        //    method of O with argument Pk.
        var kPresent = Pk in O;

        // c. If kPresent is true, then
        if (kPresent) {
            // i. Let kValue be the result of calling the [[Get]] internal
            //     method of O with argument Pk.
            var kValue = O[Pk];

            // ii. If the type of kValue is not String or Object, then throw a
            //     TypeError exception.
            if (kValue === null || typeof kValue !== 'string' && (typeof kValue === "undefined" ? "undefined" : babelHelpers$1["typeof"](kValue)) !== 'object') throw new TypeError('String or Object type expected');

            // iii. Let tag be ToString(kValue).
            var tag = String(kValue);

            // iv. If the result of calling the abstract operation
            //     IsStructurallyValidLanguageTag (defined in 6.2.2), passing tag as
            //     the argument, is false, then throw a RangeError exception.
            if (!IsStructurallyValidLanguageTag(tag)) throw new RangeError("'" + tag + "' is not a structurally valid language tag");

            // v. Let tag be the result of calling the abstract operation
            //    CanonicalizeLanguageTag (defined in 6.2.3), passing tag as the
            //    argument.
            tag = CanonicalizeLanguageTag(tag);

            // vi. If tag is not an element of seen, then append tag as the last
            //     element of seen.
            if (arrIndexOf.call(seen, tag) === -1) arrPush.call(seen, tag);
        }

        // d. Increase k by 1.
        k++;
    }

    // 9. Return seen.
    return seen;
}

/**
 * The BestAvailableLocale abstract operation compares the provided argument
 * locale, which must be a String value with a structurally valid and
 * canonicalized BCP 47 language tag, against the locales in availableLocales and
 * returns either the longest non-empty prefix of locale that is an element of
 * availableLocales, or undefined if there is no such element. It uses the
 * fallback mechanism of RFC 4647, section 3.4. The following steps are taken:
 */
function /* 9.2.2 */BestAvailableLocale(availableLocales, locale) {
    // 1. Let candidate be locale
    var candidate = locale;

    // 2. Repeat
    while (candidate) {
        // a. If availableLocales contains an element equal to candidate, then return
        // candidate.
        if (arrIndexOf.call(availableLocales, candidate) > -1) return candidate;

        // b. Let pos be the character index of the last occurrence of "-"
        // (U+002D) within candidate. If that character does not occur, return
        // undefined.
        var pos = candidate.lastIndexOf('-');

        if (pos < 0) return;

        // c. If pos ??? 2 and the character "-" occurs at index pos-2 of candidate,
        //    then decrease pos by 2.
        if (pos >= 2 && candidate.charAt(pos - 2) === '-') pos -= 2;

        // d. Let candidate be the substring of candidate from position 0, inclusive,
        //    to position pos, exclusive.
        candidate = candidate.substring(0, pos);
    }
}

/**
 * The LookupMatcher abstract operation compares requestedLocales, which must be
 * a List as returned by CanonicalizeLocaleList, against the locales in
 * availableLocales and determines the best available language to meet the
 * request. The following steps are taken:
 */
function /* 9.2.3 */LookupMatcher(availableLocales, requestedLocales) {
    // 1. Let i be 0.
    var i = 0;

    // 2. Let len be the number of elements in requestedLocales.
    var len = requestedLocales.length;

    // 3. Let availableLocale be undefined.
    var availableLocale = void 0;

    var locale = void 0,
        noExtensionsLocale = void 0;

    // 4. Repeat while i < len and availableLocale is undefined:
    while (i < len && !availableLocale) {
        // a. Let locale be the element of requestedLocales at 0-origined list
        //    position i.
        locale = requestedLocales[i];

        // b. Let noExtensionsLocale be the String value that is locale with all
        //    Unicode locale extension sequences removed.
        noExtensionsLocale = String(locale).replace(expUnicodeExSeq, '');

        // c. Let availableLocale be the result of calling the
        //    BestAvailableLocale abstract operation (defined in 9.2.2) with
        //    arguments availableLocales and noExtensionsLocale.
        availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

        // d. Increase i by 1.
        i++;
    }

    // 5. Let result be a new Record.
    var result = new Record();

    // 6. If availableLocale is not undefined, then
    if (availableLocale !== undefined) {
        // a. Set result.[[locale]] to availableLocale.
        result['[[locale]]'] = availableLocale;

        // b. If locale and noExtensionsLocale are not the same String value, then
        if (String(locale) !== String(noExtensionsLocale)) {
            // i. Let extension be the String value consisting of the first
            //    substring of locale that is a Unicode locale extension sequence.
            var extension = locale.match(expUnicodeExSeq)[0];

            // ii. Let extensionIndex be the character position of the initial
            //     "-" of the first Unicode locale extension sequence within locale.
            var extensionIndex = locale.indexOf('-u-');

            // iii. Set result.[[extension]] to extension.
            result['[[extension]]'] = extension;

            // iv. Set result.[[extensionIndex]] to extensionIndex.
            result['[[extensionIndex]]'] = extensionIndex;
        }
    }
    // 7. Else
    else
        // a. Set result.[[locale]] to the value returned by the DefaultLocale abstract
        //    operation (defined in 6.2.4).
        result['[[locale]]'] = DefaultLocale();

    // 8. Return result
    return result;
}

/**
 * The BestFitMatcher abstract operation compares requestedLocales, which must be
 * a List as returned by CanonicalizeLocaleList, against the locales in
 * availableLocales and determines the best available language to meet the
 * request. The algorithm is implementation dependent, but should produce results
 * that a typical user of the requested locales would perceive as at least as
 * good as those produced by the LookupMatcher abstract operation. Options
 * specified through Unicode locale extension sequences must be ignored by the
 * algorithm. Information about such subsequences is returned separately.
 * The abstract operation returns a record with a [[locale]] field, whose value
 * is the language tag of the selected locale, which must be an element of
 * availableLocales. If the language tag of the request locale that led to the
 * selected locale contained a Unicode locale extension sequence, then the
 * returned record also contains an [[extension]] field whose value is the first
 * Unicode locale extension sequence, and an [[extensionIndex]] field whose value
 * is the index of the first Unicode locale extension sequence within the request
 * locale language tag.
 */
function /* 9.2.4 */BestFitMatcher(availableLocales, requestedLocales) {
    return LookupMatcher(availableLocales, requestedLocales);
}

/**
 * The ResolveLocale abstract operation compares a BCP 47 language priority list
 * requestedLocales against the locales in availableLocales and determines the
 * best available language to meet the request. availableLocales and
 * requestedLocales must be provided as List values, options as a Record.
 */
function /* 9.2.5 */ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
    if (availableLocales.length === 0) {
        throw new ReferenceError('No locale data has been provided for this object yet.');
    }

    // The following steps are taken:
    // 1. Let matcher be the value of options.[[localeMatcher]].
    var matcher = options['[[localeMatcher]]'];

    var r = void 0;

    // 2. If matcher is "lookup", then
    if (matcher === 'lookup')
        // a. Let r be the result of calling the LookupMatcher abstract operation
        //    (defined in 9.2.3) with arguments availableLocales and
        //    requestedLocales.
        r = LookupMatcher(availableLocales, requestedLocales);

        // 3. Else
    else
        // a. Let r be the result of calling the BestFitMatcher abstract
        //    operation (defined in 9.2.4) with arguments availableLocales and
        //    requestedLocales.
        r = BestFitMatcher(availableLocales, requestedLocales);

    // 4. Let foundLocale be the value of r.[[locale]].
    var foundLocale = r['[[locale]]'];

    var extensionSubtags = void 0,
        extensionSubtagsLength = void 0;

    // 5. If r has an [[extension]] field, then
    if (hop.call(r, '[[extension]]')) {
        // a. Let extension be the value of r.[[extension]].
        var extension = r['[[extension]]'];
        // b. Let split be the standard built-in function object defined in ES5,
        //    15.5.4.14.
        var split = String.prototype.split;
        // c. Let extensionSubtags be the result of calling the [[Call]] internal
        //    method of split with extension as the this value and an argument
        //    list containing the single item "-".
        extensionSubtags = split.call(extension, '-');
        // d. Let extensionSubtagsLength be the result of calling the [[Get]]
        //    internal method of extensionSubtags with argument "length".
        extensionSubtagsLength = extensionSubtags.length;
    }

    // 6. Let result be a new Record.
    var result = new Record();

    // 7. Set result.[[dataLocale]] to foundLocale.
    result['[[dataLocale]]'] = foundLocale;

    // 8. Let supportedExtension be "-u".
    var supportedExtension = '-u';
    // 9. Let i be 0.
    var i = 0;
    // 10. Let len be the result of calling the [[Get]] internal method of
    //     relevantExtensionKeys with argument "length".
    var len = relevantExtensionKeys.length;

    // 11 Repeat while i < len:
    while (i < len) {
        // a. Let key be the result of calling the [[Get]] internal method of
        //    relevantExtensionKeys with argument ToString(i).
        var key = relevantExtensionKeys[i];
        // b. Let foundLocaleData be the result of calling the [[Get]] internal
        //    method of localeData with the argument foundLocale.
        var foundLocaleData = localeData[foundLocale];
        // c. Let keyLocaleData be the result of calling the [[Get]] internal
        //    method of foundLocaleData with the argument key.
        var keyLocaleData = foundLocaleData[key];
        // d. Let value be the result of calling the [[Get]] internal method of
        //    keyLocaleData with argument "0".
        var value = keyLocaleData['0'];
        // e. Let supportedExtensionAddition be "".
        var supportedExtensionAddition = '';
        // f. Let indexOf be the standard built-in function object defined in
        //    ES5, 15.4.4.14.
        var indexOf = arrIndexOf;

        // g. If extensionSubtags is not undefined, then
        if (extensionSubtags !== undefined) {
            // i. Let keyPos be the result of calling the [[Call]] internal
            //    method of indexOf with extensionSubtags as the this value and
            // an argument list containing the single item key.
            var keyPos = indexOf.call(extensionSubtags, key);

            // ii. If keyPos ??? -1, then
            if (keyPos !== -1) {
                // 1. If keyPos + 1 < extensionSubtagsLength and the length of the
                //    result of calling the [[Get]] internal method of
                //    extensionSubtags with argument ToString(keyPos +1) is greater
                //    than 2, then
                if (keyPos + 1 < extensionSubtagsLength && extensionSubtags[keyPos + 1].length > 2) {
                    // a. Let requestedValue be the result of calling the [[Get]]
                    //    internal method of extensionSubtags with argument
                    //    ToString(keyPos + 1).
                    var requestedValue = extensionSubtags[keyPos + 1];
                    // b. Let valuePos be the result of calling the [[Call]]
                    //    internal method of indexOf with keyLocaleData as the
                    //    this value and an argument list containing the single
                    //    item requestedValue.
                    var valuePos = indexOf.call(keyLocaleData, requestedValue);

                    // c. If valuePos ??? -1, then
                    if (valuePos !== -1) {
                        // i. Let value be requestedValue.
                        value = requestedValue,
                        // ii. Let supportedExtensionAddition be the
                        //     concatenation of "-", key, "-", and value.
                        supportedExtensionAddition = '-' + key + '-' + value;
                    }
                }
                // 2. Else
                else {
                        // a. Let valuePos be the result of calling the [[Call]]
                        // internal method of indexOf with keyLocaleData as the this
                        // value and an argument list containing the single item
                        // "true".
                        var _valuePos = indexOf(keyLocaleData, 'true');

                        // b. If valuePos ??? -1, then
                        if (_valuePos !== -1)
                            // i. Let value be "true".
                            value = 'true';
                    }
            }
        }
        // h. If options has a field [[<key>]], then
        if (hop.call(options, '[[' + key + ']]')) {
            // i. Let optionsValue be the value of options.[[<key>]].
            var optionsValue = options['[[' + key + ']]'];

            // ii. If the result of calling the [[Call]] internal method of indexOf
            //     with keyLocaleData as the this value and an argument list
            //     containing the single item optionsValue is not -1, then
            if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
                // 1. If optionsValue is not equal to value, then
                if (optionsValue !== value) {
                    // a. Let value be optionsValue.
                    value = optionsValue;
                    // b. Let supportedExtensionAddition be "".
                    supportedExtensionAddition = '';
                }
            }
        }
        // i. Set result.[[<key>]] to value.
        result['[[' + key + ']]'] = value;

        // j. Append supportedExtensionAddition to supportedExtension.
        supportedExtension += supportedExtensionAddition;

        // k. Increase i by 1.
        i++;
    }
    // 12. If the length of supportedExtension is greater than 2, then
    if (supportedExtension.length > 2) {
        // a.
        var privateIndex = foundLocale.indexOf("-x-");
        // b.
        if (privateIndex === -1) {
            // i.
            foundLocale = foundLocale + supportedExtension;
        }
        // c.
        else {
                // i.
                var preExtension = foundLocale.substring(0, privateIndex);
                // ii.
                var postExtension = foundLocale.substring(privateIndex);
                // iii.
                foundLocale = preExtension + supportedExtension + postExtension;
            }
        // d. asserting - skipping
        // e.
        foundLocale = CanonicalizeLanguageTag(foundLocale);
    }
    // 13. Set result.[[locale]] to foundLocale.
    result['[[locale]]'] = foundLocale;

    // 14. Return result.
    return result;
}

/**
 * The LookupSupportedLocales abstract operation returns the subset of the
 * provided BCP 47 language priority list requestedLocales for which
 * availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
 * Locales appear in the same order in the returned list as in requestedLocales.
 * The following steps are taken:
 */
function /* 9.2.6 */LookupSupportedLocales(availableLocales, requestedLocales) {
    // 1. Let len be the number of elements in requestedLocales.
    var len = requestedLocales.length;
    // 2. Let subset be a new empty List.
    var subset = new List();
    // 3. Let k be 0.
    var k = 0;

    // 4. Repeat while k < len
    while (k < len) {
        // a. Let locale be the element of requestedLocales at 0-origined list
        //    position k.
        var locale = requestedLocales[k];
        // b. Let noExtensionsLocale be the String value that is locale with all
        //    Unicode locale extension sequences removed.
        var noExtensionsLocale = String(locale).replace(expUnicodeExSeq, '');
        // c. Let availableLocale be the result of calling the
        //    BestAvailableLocale abstract operation (defined in 9.2.2) with
        //    arguments availableLocales and noExtensionsLocale.
        var availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

        // d. If availableLocale is not undefined, then append locale to the end of
        //    subset.
        if (availableLocale !== undefined) arrPush.call(subset, locale);

        // e. Increment k by 1.
        k++;
    }

    // 5. Let subsetArray be a new Array object whose elements are the same
    //    values in the same order as the elements of subset.
    var subsetArray = arrSlice.call(subset);

    // 6. Return subsetArray.
    return subsetArray;
}

/**
 * The BestFitSupportedLocales abstract operation returns the subset of the
 * provided BCP 47 language priority list requestedLocales for which
 * availableLocales has a matching locale when using the Best Fit Matcher
 * algorithm. Locales appear in the same order in the returned list as in
 * requestedLocales. The steps taken are implementation dependent.
 */
function /*9.2.7 */BestFitSupportedLocales(availableLocales, requestedLocales) {
    // ###TODO: implement this function as described by the specification###
    return LookupSupportedLocales(availableLocales, requestedLocales);
}

/**
 * The SupportedLocales abstract operation returns the subset of the provided BCP
 * 47 language priority list requestedLocales for which availableLocales has a
 * matching locale. Two algorithms are available to match the locales: the Lookup
 * algorithm described in RFC 4647 section 3.4, and an implementation dependent
 * best-fit algorithm. Locales appear in the same order in the returned list as
 * in requestedLocales. The following steps are taken:
 */
function /*9.2.8 */SupportedLocales(availableLocales, requestedLocales, options) {
    var matcher = void 0,
        subset = void 0;

    // 1. If options is not undefined, then
    if (options !== undefined) {
        // a. Let options be ToObject(options).
        options = new Record(toObject(options));
        // b. Let matcher be the result of calling the [[Get]] internal method of
        //    options with argument "localeMatcher".
        matcher = options.localeMatcher;

        // c. If matcher is not undefined, then
        if (matcher !== undefined) {
            // i. Let matcher be ToString(matcher).
            matcher = String(matcher);

            // ii. If matcher is not "lookup" or "best fit", then throw a RangeError
            //     exception.
            if (matcher !== 'lookup' && matcher !== 'best fit') throw new RangeError('matcher should be "lookup" or "best fit"');
        }
    }
    // 2. If matcher is undefined or "best fit", then
    if (matcher === undefined || matcher === 'best fit')
        // a. Let subset be the result of calling the BestFitSupportedLocales
        //    abstract operation (defined in 9.2.7) with arguments
        //    availableLocales and requestedLocales.
        subset = BestFitSupportedLocales(availableLocales, requestedLocales);
        // 3. Else
    else
        // a. Let subset be the result of calling the LookupSupportedLocales
        //    abstract operation (defined in 9.2.6) with arguments
        //    availableLocales and requestedLocales.
        subset = LookupSupportedLocales(availableLocales, requestedLocales);

    // 4. For each named own property name P of subset,
    for (var P in subset) {
        if (!hop.call(subset, P)) continue;

        // a. Let desc be the result of calling the [[GetOwnProperty]] internal
        //    method of subset with P.
        // b. Set desc.[[Writable]] to false.
        // c. Set desc.[[Configurable]] to false.
        // d. Call the [[DefineOwnProperty]] internal method of subset with P, desc,
        //    and true as arguments.
        defineProperty(subset, P, {
            writable: false, configurable: false, value: subset[P]
        });
    }
    // "Freeze" the array so no new elements can be added
    defineProperty(subset, 'length', { writable: false });

    // 5. Return subset
    return subset;
}

/**
 * The GetOption abstract operation extracts the value of the property named
 * property from the provided options object, converts it to the required type,
 * checks whether it is one of a List of allowed values, and fills in a fallback
 * value if necessary.
 */
function /*9.2.9 */GetOption(options, property, type, values, fallback) {
    // 1. Let value be the result of calling the [[Get]] internal method of
    //    options with argument property.
    var value = options[property];

    // 2. If value is not undefined, then
    if (value !== undefined) {
        // a. Assert: type is "boolean" or "string".
        // b. If type is "boolean", then let value be ToBoolean(value).
        // c. If type is "string", then let value be ToString(value).
        value = type === 'boolean' ? Boolean(value) : type === 'string' ? String(value) : value;

        // d. If values is not undefined, then
        if (values !== undefined) {
            // i. If values does not contain an element equal to value, then throw a
            //    RangeError exception.
            if (arrIndexOf.call(values, value) === -1) throw new RangeError("'" + value + "' is not an allowed value for `" + property + '`');
        }

        // e. Return value.
        return value;
    }
    // Else return fallback.
    return fallback;
}

/**
 * The GetNumberOption abstract operation extracts a property value from the
 * provided options object, converts it to a Number value, checks whether it is
 * in the allowed range, and fills in a fallback value if necessary.
 */
function /* 9.2.10 */GetNumberOption(options, property, minimum, maximum, fallback) {
    // 1. Let value be the result of calling the [[Get]] internal method of
    //    options with argument property.
    var value = options[property];

    // 2. If value is not undefined, then
    if (value !== undefined) {
        // a. Let value be ToNumber(value).
        value = Number(value);

        // b. If value is NaN or less than minimum or greater than maximum, throw a
        //    RangeError exception.
        if (isNaN(value) || value < minimum || value > maximum) throw new RangeError('Value is not a number or outside accepted range');

        // c. Return floor(value).
        return Math.floor(value);
    }
    // 3. Else return fallback.
    return fallback;
}

// 8 The Intl Object
var Intl = {};

// 8.2 Function Properties of the Intl Object

// 8.2.1
// @spec[tc39/ecma402/master/spec/intl.html]
// @clause[sec-intl.getcanonicallocales]
function getCanonicalLocales(locales) {
    // 1. Let ll be ? CanonicalizeLocaleList(locales).
    var ll = CanonicalizeLocaleList(locales);
    // 2. Return CreateArrayFromList(ll).
    {
        var result = [];

        var len = ll.length;
        var k = 0;

        while (k < len) {
            result[k] = ll[k];
            k++;
        }
        return result;
    }
}

Object.defineProperty(Intl, 'getCanonicalLocales', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: getCanonicalLocales
});

// Currency minor units output from get-4217 grunt task, formatted
var currencyMinorUnits = {
    BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 4, CLP: 0, KMF: 0, DJF: 0,
    XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3,
    OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0
};

// Define the NumberFormat constructor internally so it cannot be tainted
function NumberFormatConstructor() {
    var locales = arguments[0];
    var options = arguments[1];

    if (!this || this === Intl) {
        return new Intl.NumberFormat(locales, options);
    }

    return InitializeNumberFormat(toObject(this), locales, options);
}

defineProperty(Intl, 'NumberFormat', {
    configurable: true,
    writable: true,
    value: NumberFormatConstructor
});

// Must explicitly set prototypes as unwritable
defineProperty(Intl.NumberFormat, 'prototype', {
    writable: false
});

/**
 * The abstract operation InitializeNumberFormat accepts the arguments
 * numberFormat (which must be an object), locales, and options. It initializes
 * numberFormat as a NumberFormat object.
 */
function /*11.1.1.1 */InitializeNumberFormat(numberFormat, locales, options) {
    // This will be a internal properties object if we're not already initialized
    var internal = getInternalProperties(numberFormat);

    // Create an object whose props can be used to restore the values of RegExp props
    var regexpRestore = createRegExpRestore();

    // 1. If numberFormat has an [[initializedIntlObject]] internal property with
    // value true, throw a TypeError exception.
    if (internal['[[initializedIntlObject]]'] === true) throw new TypeError('`this` object has already been initialized as an Intl object');

    // Need this to access the `internal` object
    defineProperty(numberFormat, '__getInternalProperties', {
        value: function value() {
            // NOTE: Non-standard, for internal use only
            if (arguments[0] === secret) return internal;
        }
    });

    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
    internal['[[initializedIntlObject]]'] = true;

    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
    //    abstract operation (defined in 9.2.1) with argument locales.
    var requestedLocales = CanonicalizeLocaleList(locales);

    // 4. If options is undefined, then
    if (options === undefined)
        // a. Let options be the result of creating a new object as if by the
        // expression new Object() where Object is the standard built-in constructor
        // with that name.
        options = {};

        // 5. Else
    else
        // a. Let options be ToObject(options).
        options = toObject(options);

    // 6. Let opt be a new Record.
    var opt = new Record(),


    // 7. Let matcher be the result of calling the GetOption abstract operation
    //    (defined in 9.2.9) with the arguments options, "localeMatcher", "string",
    //    a List containing the two String values "lookup" and "best fit", and
    //    "best fit".
    matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

    // 8. Set opt.[[localeMatcher]] to matcher.
    opt['[[localeMatcher]]'] = matcher;

    // 9. Let NumberFormat be the standard built-in object that is the initial value
    //    of Intl.NumberFormat.
    // 10. Let localeData be the value of the [[localeData]] internal property of
    //     NumberFormat.
    var localeData = internals.NumberFormat['[[localeData]]'];

    // 11. Let r be the result of calling the ResolveLocale abstract operation
    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
    //     NumberFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
    //     internal property of NumberFormat, and localeData.
    var r = ResolveLocale(internals.NumberFormat['[[availableLocales]]'], requestedLocales, opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData);

    // 12. Set the [[locale]] internal property of numberFormat to the value of
    //     r.[[locale]].
    internal['[[locale]]'] = r['[[locale]]'];

    // 13. Set the [[numberingSystem]] internal property of numberFormat to the value
    //     of r.[[nu]].
    internal['[[numberingSystem]]'] = r['[[nu]]'];

    // The specification doesn't tell us to do this, but it's helpful later on
    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

    // 14. Let dataLocale be the value of r.[[dataLocale]].
    var dataLocale = r['[[dataLocale]]'];

    // 15. Let s be the result of calling the GetOption abstract operation with the
    //     arguments options, "style", "string", a List containing the three String
    //     values "decimal", "percent", and "currency", and "decimal".
    var s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');

    // 16. Set the [[style]] internal property of numberFormat to s.
    internal['[[style]]'] = s;

    // 17. Let c be the result of calling the GetOption abstract operation with the
    //     arguments options, "currency", "string", undefined, and undefined.
    var c = GetOption(options, 'currency', 'string');

    // 18. If c is not undefined and the result of calling the
    //     IsWellFormedCurrencyCode abstract operation (defined in 6.3.1) with
    //     argument c is false, then throw a RangeError exception.
    if (c !== undefined && !IsWellFormedCurrencyCode(c)) throw new RangeError("'" + c + "' is not a valid currency code");

    // 19. If s is "currency" and c is undefined, throw a TypeError exception.
    if (s === 'currency' && c === undefined) throw new TypeError('Currency code is required when style is currency');

    var cDigits = void 0;

    // 20. If s is "currency", then
    if (s === 'currency') {
        // a. Let c be the result of converting c to upper case as specified in 6.1.
        c = c.toUpperCase();

        // b. Set the [[currency]] internal property of numberFormat to c.
        internal['[[currency]]'] = c;

        // c. Let cDigits be the result of calling the CurrencyDigits abstract
        //    operation (defined below) with argument c.
        cDigits = CurrencyDigits(c);
    }

    // 21. Let cd be the result of calling the GetOption abstract operation with the
    //     arguments options, "currencyDisplay", "string", a List containing the
    //     three String values "code", "symbol", and "name", and "symbol".
    var cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');

    // 22. If s is "currency", then set the [[currencyDisplay]] internal property of
    //     numberFormat to cd.
    if (s === 'currency') internal['[[currencyDisplay]]'] = cd;

    // 23. Let mnid be the result of calling the GetNumberOption abstract operation
    //     (defined in 9.2.10) with arguments options, "minimumIntegerDigits", 1, 21,
    //     and 1.
    var mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);

    // 24. Set the [[minimumIntegerDigits]] internal property of numberFormat to mnid.
    internal['[[minimumIntegerDigits]]'] = mnid;

    // 25. If s is "currency", then let mnfdDefault be cDigits; else let mnfdDefault
    //     be 0.
    var mnfdDefault = s === 'currency' ? cDigits : 0;

    // 26. Let mnfd be the result of calling the GetNumberOption abstract operation
    //     with arguments options, "minimumFractionDigits", 0, 20, and mnfdDefault.
    var mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);

    // 27. Set the [[minimumFractionDigits]] internal property of numberFormat to mnfd.
    internal['[[minimumFractionDigits]]'] = mnfd;

    // 28. If s is "currency", then let mxfdDefault be max(mnfd, cDigits); else if s
    //     is "percent", then let mxfdDefault be max(mnfd, 0); else let mxfdDefault
    //     be max(mnfd, 3).
    var mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits) : s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3);

    // 29. Let mxfd be the result of calling the GetNumberOption abstract operation
    //     with arguments options, "maximumFractionDigits", mnfd, 20, and mxfdDefault.
    var mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);

    // 30. Set the [[maximumFractionDigits]] internal property of numberFormat to mxfd.
    internal['[[maximumFractionDigits]]'] = mxfd;

    // 31. Let mnsd be the result of calling the [[Get]] internal method of options
    //     with argument "minimumSignificantDigits".
    var mnsd = options.minimumSignificantDigits;

    // 32. Let mxsd be the result of calling the [[Get]] internal method of options
    //     with argument "maximumSignificantDigits".
    var mxsd = options.maximumSignificantDigits;

    // 33. If mnsd is not undefined or mxsd is not undefined, then:
    if (mnsd !== undefined || mxsd !== undefined) {
        // a. Let mnsd be the result of calling the GetNumberOption abstract
        //    operation with arguments options, "minimumSignificantDigits", 1, 21,
        //    and 1.
        mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);

        // b. Let mxsd be the result of calling the GetNumberOption abstract
        //     operation with arguments options, "maximumSignificantDigits", mnsd,
        //     21, and 21.
        mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);

        // c. Set the [[minimumSignificantDigits]] internal property of numberFormat
        //    to mnsd, and the [[maximumSignificantDigits]] internal property of
        //    numberFormat to mxsd.
        internal['[[minimumSignificantDigits]]'] = mnsd;
        internal['[[maximumSignificantDigits]]'] = mxsd;
    }
    // 34. Let g be the result of calling the GetOption abstract operation with the
    //     arguments options, "useGrouping", "boolean", undefined, and true.
    var g = GetOption(options, 'useGrouping', 'boolean', undefined, true);

    // 35. Set the [[useGrouping]] internal property of numberFormat to g.
    internal['[[useGrouping]]'] = g;

    // 36. Let dataLocaleData be the result of calling the [[Get]] internal method of
    //     localeData with argument dataLocale.
    var dataLocaleData = localeData[dataLocale];

    // 37. Let patterns be the result of calling the [[Get]] internal method of
    //     dataLocaleData with argument "patterns".
    var patterns = dataLocaleData.patterns;

    // 38. Assert: patterns is an object (see 11.2.3)

    // 39. Let stylePatterns be the result of calling the [[Get]] internal method of
    //     patterns with argument s.
    var stylePatterns = patterns[s];

    // 40. Set the [[positivePattern]] internal property of numberFormat to the
    //     result of calling the [[Get]] internal method of stylePatterns with the
    //     argument "positivePattern".
    internal['[[positivePattern]]'] = stylePatterns.positivePattern;

    // 41. Set the [[negativePattern]] internal property of numberFormat to the
    //     result of calling the [[Get]] internal method of stylePatterns with the
    //     argument "negativePattern".
    internal['[[negativePattern]]'] = stylePatterns.negativePattern;

    // 42. Set the [[boundFormat]] internal property of numberFormat to undefined.
    internal['[[boundFormat]]'] = undefined;

    // 43. Set the [[initializedNumberFormat]] internal property of numberFormat to
    //     true.
    internal['[[initializedNumberFormat]]'] = true;

    // In ES3, we need to pre-bind the format() function
    if (es3) numberFormat.format = GetFormatNumber.call(numberFormat);

    // Restore the RegExp properties
    regexpRestore();

    // Return the newly initialised object
    return numberFormat;
}

function CurrencyDigits(currency) {
    // When the CurrencyDigits abstract operation is called with an argument currency
    // (which must be an upper case String value), the following steps are taken:

    // 1. If the ISO 4217 currency and funds code list contains currency as an
    // alphabetic code, then return the minor unit value corresponding to the
    // currency from the list; else return 2.
    return currencyMinorUnits[currency] !== undefined ? currencyMinorUnits[currency] : 2;
}

/* 11.2.3 */internals.NumberFormat = {
    '[[availableLocales]]': [],
    '[[relevantExtensionKeys]]': ['nu'],
    '[[localeData]]': {}
};

/**
 * When the supportedLocalesOf method of Intl.NumberFormat is called, the
 * following steps are taken:
 */
/* 11.2.2 */
defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
    configurable: true,
    writable: true,
    value: fnBind.call(function (locales) {
        // Bound functions only have the `this` value altered if being used as a constructor,
        // this lets us imitate a native function that has no constructor
        if (!hop.call(this, '[[availableLocales]]')) throw new TypeError('supportedLocalesOf() is not a constructor');

        // Create an object whose props can be used to restore the values of RegExp props
        var regexpRestore = createRegExpRestore(),


        // 1. If options is not provided, then let options be undefined.
        options = arguments[1],


        // 2. Let availableLocales be the value of the [[availableLocales]] internal
        //    property of the standard built-in object that is the initial value of
        //    Intl.NumberFormat.

        availableLocales = this['[[availableLocales]]'],


        // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
        //    abstract operation (defined in 9.2.1) with argument locales.
        requestedLocales = CanonicalizeLocaleList(locales);

        // Restore the RegExp properties
        regexpRestore();

        // 4. Return the result of calling the SupportedLocales abstract operation
        //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
        //    and options.
        return SupportedLocales(availableLocales, requestedLocales, options);
    }, internals.NumberFormat)
});

/**
 * This named accessor property returns a function that formats a number
 * according to the effective locale and the formatting options of this
 * NumberFormat object.
 */
/* 11.3.2 */defineProperty(Intl.NumberFormat.prototype, 'format', {
    configurable: true,
    get: GetFormatNumber
});

function GetFormatNumber() {
    var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

    // Satisfy test 11.3_b
    if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');

    // The value of the [[Get]] attribute is a function that takes the following
    // steps:

    // 1. If the [[boundFormat]] internal property of this NumberFormat object
    //    is undefined, then:
    if (internal['[[boundFormat]]'] === undefined) {
        // a. Let F be a Function object, with internal properties set as
        //    specified for built-in functions in ES5, 15, or successor, and the
        //    length property set to 1, that takes the argument value and
        //    performs the following steps:
        var F = function F(value) {
            // i. If value is not provided, then let value be undefined.
            // ii. Let x be ToNumber(value).
            // iii. Return the result of calling the FormatNumber abstract
            //      operation (defined below) with arguments this and x.
            return FormatNumber(this, /* x = */Number(value));
        };

        // b. Let bind be the standard built-in function object defined in ES5,
        //    15.3.4.5.
        // c. Let bf be the result of calling the [[Call]] internal method of
        //    bind with F as the this value and an argument list containing
        //    the single item this.
        var bf = fnBind.call(F, this);

        // d. Set the [[boundFormat]] internal property of this NumberFormat
        //    object to bf.
        internal['[[boundFormat]]'] = bf;
    }
    // Return the value of the [[boundFormat]] internal property of this
    // NumberFormat object.
    return internal['[[boundFormat]]'];
}

function formatToParts() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

    var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);
    if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for formatToParts() is not an initialized Intl.NumberFormat object.');

    var x = Number(value);
    return FormatNumberToParts(this, x);
}

Object.defineProperty(Intl.NumberFormat.prototype, 'formatToParts', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: formatToParts
});

/*
 * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
 * @clause[sec-formatnumbertoparts]
 */
function FormatNumberToParts(numberFormat, x) {
    // 1. Let parts be ? PartitionNumberPattern(numberFormat, x).
    var parts = PartitionNumberPattern(numberFormat, x);
    // 2. Let result be ArrayCreate(0).
    var result = [];
    // 3. Let n be 0.
    var n = 0;
    // 4. For each part in parts, do:
    for (var i = 0; parts.length > i; i++) {
        var part = parts[i];
        // a. Let O be ObjectCreate(%ObjectPrototype%).
        var O = {};
        // a. Perform ? CreateDataPropertyOrThrow(O, "type", part.[[type]]).
        O.type = part['[[type]]'];
        // a. Perform ? CreateDataPropertyOrThrow(O, "value", part.[[value]]).
        O.value = part['[[value]]'];
        // a. Perform ? CreateDataPropertyOrThrow(result, ? ToString(n), O).
        result[n] = O;
        // a. Increment n by 1.
        n += 1;
    }
    // 5. Return result.
    return result;
}

/*
 * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
 * @clause[sec-partitionnumberpattern]
 */
function PartitionNumberPattern(numberFormat, x) {

    var internal = getInternalProperties(numberFormat),
        locale = internal['[[dataLocale]]'],
        nums = internal['[[numberingSystem]]'],
        data = internals.NumberFormat['[[localeData]]'][locale],
        ild = data.symbols[nums] || data.symbols.latn,
        pattern = void 0;

    // 1. If x is not NaN and x < 0, then:
    if (!isNaN(x) && x < 0) {
        // a. Let x be -x.
        x = -x;
        // a. Let pattern be the value of numberFormat.[[negativePattern]].
        pattern = internal['[[negativePattern]]'];
    }
    // 2. Else,
    else {
            // a. Let pattern be the value of numberFormat.[[positivePattern]].
            pattern = internal['[[positivePattern]]'];
        }
    // 3. Let result be a new empty List.
    var result = new List();
    // 4. Let beginIndex be Call(%StringProto_indexOf%, pattern, "{", 0).
    var beginIndex = pattern.indexOf('{', 0);
    // 5. Let endIndex be 0.
    var endIndex = 0;
    // 6. Let nextIndex be 0.
    var nextIndex = 0;
    // 7. Let length be the number of code units in pattern.
    var length = pattern.length;
    // 8. Repeat while beginIndex is an integer index into pattern:
    while (beginIndex > -1 && beginIndex < length) {
        // a. Set endIndex to Call(%StringProto_indexOf%, pattern, "}", beginIndex)
        endIndex = pattern.indexOf('}', beginIndex);
        // a. If endIndex = -1, throw new Error exception.
        if (endIndex === -1) throw new Error();
        // a. If beginIndex is greater than nextIndex, then:
        if (beginIndex > nextIndex) {
            // i. Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
            var literal = pattern.substring(nextIndex, beginIndex);
            // ii. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
            arrPush.call(result, { '[[type]]': 'literal', '[[value]]': literal });
        }
        // a. Let p be the substring of pattern from position beginIndex, exclusive, to position endIndex, exclusive.
        var p = pattern.substring(beginIndex + 1, endIndex);
        // a. If p is equal "number", then:
        if (p === "number") {
            // i. If x is NaN,
            if (isNaN(x)) {
                // 1. Let n be an ILD String value indicating the NaN value.
                var n = ild.nan;
                // 2. Add new part record { [[type]]: "nan", [[value]]: n } as a new element of the list result.
                arrPush.call(result, { '[[type]]': 'nan', '[[value]]': n });
            }
            // ii. Else if isFinite(x) is false,
            else if (!isFinite(x)) {
                    // 1. Let n be an ILD String value indicating infinity.
                    var _n = ild.infinity;
                    // 2. Add new part record { [[type]]: "infinity", [[value]]: n } as a new element of the list result.
                    arrPush.call(result, { '[[type]]': 'infinity', '[[value]]': _n });
                }
                // iii. Else,
                else {
                        // 1. If the value of numberFormat.[[style]] is "percent" and isFinite(x), let x be 100 ?? x.
                        if (internal['[[style]]'] === 'percent' && isFinite(x)) x *= 100;

                        var _n2 = void 0;
                        // 2. If the numberFormat.[[minimumSignificantDigits]] and numberFormat.[[maximumSignificantDigits]] are present, then
                        if (hop.call(internal, '[[minimumSignificantDigits]]') && hop.call(internal, '[[maximumSignificantDigits]]')) {
                            // a. Let n be ToRawPrecision(x, numberFormat.[[minimumSignificantDigits]], numberFormat.[[maximumSignificantDigits]]).
                            _n2 = ToRawPrecision(x, internal['[[minimumSignificantDigits]]'], internal['[[maximumSignificantDigits]]']);
                        }
                        // 3. Else,
                        else {
                                // a. Let n be ToRawFixed(x, numberFormat.[[minimumIntegerDigits]], numberFormat.[[minimumFractionDigits]], numberFormat.[[maximumFractionDigits]]).
                                _n2 = ToRawFixed(x, internal['[[minimumIntegerDigits]]'], internal['[[minimumFractionDigits]]'], internal['[[maximumFractionDigits]]']);
                            }
                        // 4. If the value of the numberFormat.[[numberingSystem]] matches one of the values in the "Numbering System" column of Table 2 below, then
                        if (numSys[nums]) {
                            (function () {
                                // a. Let digits be an array whose 10 String valued elements are the UTF-16 string representations of the 10 digits specified in the "Digits" column of the matching row in Table 2.
                                var digits = numSys[nums];
                                // a. Replace each digit in n with the value of digits[digit].
                                _n2 = String(_n2).replace(/\d/g, function (digit) {
                                    return digits[digit];
                                });
                            })();
                        }
                        // 5. Else use an implementation dependent algorithm to map n to the appropriate representation of n in the given numbering system.
                        else _n2 = String(_n2); // ###TODO###

                        var integer = void 0;
                        var fraction = void 0;
                        // 6. Let decimalSepIndex be Call(%StringProto_indexOf%, n, ".", 0).
                        var decimalSepIndex = _n2.indexOf('.', 0);
                        // 7. If decimalSepIndex > 0, then:
                        if (decimalSepIndex > 0) {
                            // a. Let integer be the substring of n from position 0, inclusive, to position decimalSepIndex, exclusive.
                            integer = _n2.substring(0, decimalSepIndex);
                            // a. Let fraction be the substring of n from position decimalSepIndex, exclusive, to the end of n.
                            fraction = _n2.substring(decimalSepIndex + 1, decimalSepIndex.length);
                        }
                        // 8. Else:
                        else {
                                // a. Let integer be n.
                                integer = _n2;
                                // a. Let fraction be undefined.
                                fraction = undefined;
                            }
                        // 9. If the value of the numberFormat.[[useGrouping]] is true,
                        if (internal['[[useGrouping]]'] === true) {
                            // a. Let groupSepSymbol be the ILND String representing the grouping separator.
                            var groupSepSymbol = ild.group;
                            // a. Let groups be a List whose elements are, in left to right order, the substrings defined by ILND set of locations within the integer.
                            var groups = [];
                            // ----> implementation:
                            // Primary group represents the group closest to the decimal
                            var pgSize = data.patterns.primaryGroupSize || 3;
                            // Secondary group is every other group
                            var sgSize = data.patterns.secondaryGroupSize || pgSize;
                            // Group only if necessary
                            if (integer.length > pgSize) {
                                // Index of the primary grouping separator
                                var end = integer.length - pgSize;
                                // Starting index for our loop
                                var idx = end % sgSize;
                                var start = integer.slice(0, idx);
                                if (start.length) arrPush.call(groups, start);
                                // Loop to separate into secondary grouping digits
                                while (idx < end) {
                                    arrPush.call(groups, integer.slice(idx, idx + sgSize));
                                    idx += sgSize;
                                }
                                // Add the primary grouping digits
                                arrPush.call(groups, integer.slice(end));
                            } else {
                                arrPush.call(groups, integer);
                            }
                            // a. Assert: The number of elements in groups List is greater than 0.
                            if (groups.length === 0) throw new Error();
                            // a. Repeat, while groups List is not empty:
                            while (groups.length) {
                                // i. Remove the first element from groups and let integerGroup be the value of that element.
                                var integerGroup = arrShift.call(groups);
                                // ii. Add new part record { [[type]]: "integer", [[value]]: integerGroup } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'integer', '[[value]]': integerGroup });
                                // iii. If groups List is not empty, then:
                                if (groups.length) {
                                    // 1. Add new part record { [[type]]: "group", [[value]]: groupSepSymbol } as a new element of the list result.
                                    arrPush.call(result, { '[[type]]': 'group', '[[value]]': groupSepSymbol });
                                }
                            }
                        }
                        // 10. Else,
                        else {
                                // a. Add new part record { [[type]]: "integer", [[value]]: integer } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'integer', '[[value]]': integer });
                            }
                        // 11. If fraction is not undefined, then:
                        if (fraction !== undefined) {
                            // a. Let decimalSepSymbol be the ILND String representing the decimal separator.
                            var decimalSepSymbol = ild.decimal;
                            // a. Add new part record { [[type]]: "decimal", [[value]]: decimalSepSymbol } as a new element of the list result.
                            arrPush.call(result, { '[[type]]': 'decimal', '[[value]]': decimalSepSymbol });
                            // a. Add new part record { [[type]]: "fraction", [[value]]: fraction } as a new element of the list result.
                            arrPush.call(result, { '[[type]]': 'fraction', '[[value]]': fraction });
                        }
                    }
        }
        // a. Else if p is equal "plusSign", then:
        else if (p === "plusSign") {
                // i. Let plusSignSymbol be the ILND String representing the plus sign.
                var plusSignSymbol = ild.plusSign;
                // ii. Add new part record { [[type]]: "plusSign", [[value]]: plusSignSymbol } as a new element of the list result.
                arrPush.call(result, { '[[type]]': 'plusSign', '[[value]]': plusSignSymbol });
            }
            // a. Else if p is equal "minusSign", then:
            else if (p === "minusSign") {
                    // i. Let minusSignSymbol be the ILND String representing the minus sign.
                    var minusSignSymbol = ild.minusSign;
                    // ii. Add new part record { [[type]]: "minusSign", [[value]]: minusSignSymbol } as a new element of the list result.
                    arrPush.call(result, { '[[type]]': 'minusSign', '[[value]]': minusSignSymbol });
                }
                // a. Else if p is equal "percentSign" and numberFormat.[[style]] is "percent", then:
                else if (p === "percentSign" && internal['[[style]]'] === "percent") {
                        // i. Let percentSignSymbol be the ILND String representing the percent sign.
                        var percentSignSymbol = ild.percentSign;
                        // ii. Add new part record { [[type]]: "percentSign", [[value]]: percentSignSymbol } as a new element of the list result.
                        arrPush.call(result, { '[[type]]': 'literal', '[[value]]': percentSignSymbol });
                    }
                    // a. Else if p is equal "currency" and numberFormat.[[style]] is "currency", then:
                    else if (p === "currency" && internal['[[style]]'] === "currency") {
                            // i. Let currency be the value of numberFormat.[[currency]].
                            var currency = internal['[[currency]]'];

                            var cd = void 0;

                            // ii. If numberFormat.[[currencyDisplay]] is "code", then
                            if (internal['[[currencyDisplay]]'] === "code") {
                                // 1. Let cd be currency.
                                cd = currency;
                            }
                            // iii. Else if numberFormat.[[currencyDisplay]] is "symbol", then
                            else if (internal['[[currencyDisplay]]'] === "symbol") {
                                    // 1. Let cd be an ILD string representing currency in short form. If the implementation does not have such a representation of currency, use currency itself.
                                    cd = data.currencies[currency] || currency;
                                }
                                // iv. Else if numberFormat.[[currencyDisplay]] is "name", then
                                else if (internal['[[currencyDisplay]]'] === "name") {
                                        // 1. Let cd be an ILD string representing currency in long form. If the implementation does not have such a representation of currency, then use currency itself.
                                        cd = currency;
                                    }
                            // v. Add new part record { [[type]]: "currency", [[value]]: cd } as a new element of the list result.
                            arrPush.call(result, { '[[type]]': 'currency', '[[value]]': cd });
                        }
                        // a. Else,
                        else {
                                // i. Let literal be the substring of pattern from position beginIndex, inclusive, to position endIndex, inclusive.
                                var _literal = pattern.substring(beginIndex, endIndex);
                                // ii. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'literal', '[[value]]': _literal });
                            }
        // a. Set nextIndex to endIndex + 1.
        nextIndex = endIndex + 1;
        // a. Set beginIndex to Call(%StringProto_indexOf%, pattern, "{", nextIndex)
        beginIndex = pattern.indexOf('{', nextIndex);
    }
    // 9. If nextIndex is less than length, then:
    if (nextIndex < length) {
        // a. Let literal be the substring of pattern from position nextIndex, inclusive, to position length, exclusive.
        var _literal2 = pattern.substring(nextIndex, length);
        // a. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
        arrPush.call(result, { '[[type]]': 'literal', '[[value]]': _literal2 });
    }
    // 10. Return result.
    return result;
}

/*
 * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
 * @clause[sec-formatnumber]
 */
function FormatNumber(numberFormat, x) {
    // 1. Let parts be ? PartitionNumberPattern(numberFormat, x).
    var parts = PartitionNumberPattern(numberFormat, x);
    // 2. Let result be an empty String.
    var result = '';
    // 3. For each part in parts, do:
    for (var i = 0; parts.length > i; i++) {
        var part = parts[i];
        // a. Set result to a String value produced by concatenating result and part.[[value]].
        result += part['[[value]]'];
    }
    // 4. Return result.
    return result;
}

/**
 * When the ToRawPrecision abstract operation is called with arguments x (which
 * must be a finite non-negative number), minPrecision, and maxPrecision (both
 * must be integers between 1 and 21) the following steps are taken:
 */
function ToRawPrecision(x, minPrecision, maxPrecision) {
    // 1. Let p be maxPrecision.
    var p = maxPrecision;

    var m = void 0,
        e = void 0;

    // 2. If x = 0, then
    if (x === 0) {
        // a. Let m be the String consisting of p occurrences of the character "0".
        m = arrJoin.call(Array(p + 1), '0');
        // b. Let e be 0.
        e = 0;
    }
    // 3. Else
    else {
            // a. Let e and n be integers such that 10???????? ??? n < 10??? and for which the
            //    exact mathematical value of n ?? 10?????????????? ??? x is as close to zero as
            //    possible. If there are two such sets of e and n, pick the e and n for
            //    which n ?? 10?????????????? is larger.
            e = log10Floor(Math.abs(x));

            // Easier to get to m from here
            var f = Math.round(Math.exp(Math.abs(e - p + 1) * Math.LN10));

            // b. Let m be the String consisting of the digits of the decimal
            //    representation of n (in order, with no leading zeroes)
            m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
        }

    // 4. If e ??? p, then
    if (e >= p)
        // a. Return the concatenation of m and e-p+1 occurrences of the character "0".
        return m + arrJoin.call(Array(e - p + 1 + 1), '0');

        // 5. If e = p-1, then
    else if (e === p - 1)
            // a. Return m.
            return m;

            // 6. If e ??? 0, then
        else if (e >= 0)
                // a. Let m be the concatenation of the first e+1 characters of m, the character
                //    ".", and the remaining p???(e+1) characters of m.
                m = m.slice(0, e + 1) + '.' + m.slice(e + 1);

                // 7. If e < 0, then
            else if (e < 0)
                    // a. Let m be the concatenation of the String "0.", ???(e+1) occurrences of the
                    //    character "0", and the string m.
                    m = '0.' + arrJoin.call(Array(-(e + 1) + 1), '0') + m;

    // 8. If m contains the character ".", and maxPrecision > minPrecision, then
    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
        // a. Let cut be maxPrecision ??? minPrecision.
        var cut = maxPrecision - minPrecision;

        // b. Repeat while cut > 0 and the last character of m is "0":
        while (cut > 0 && m.charAt(m.length - 1) === '0') {
            //  i. Remove the last character from m.
            m = m.slice(0, -1);

            //  ii. Decrease cut by 1.
            cut--;
        }

        // c. If the last character of m is ".", then
        if (m.charAt(m.length - 1) === '.')
            //    i. Remove the last character from m.
            m = m.slice(0, -1);
    }
    // 9. Return m.
    return m;
}

/**
 * @spec[tc39/ecma402/master/spec/numberformat.html]
 * @clause[sec-torawfixed]
 * When the ToRawFixed abstract operation is called with arguments x (which must
 * be a finite non-negative number), minInteger (which must be an integer between
 * 1 and 21), minFraction, and maxFraction (which must be integers between 0 and
 * 20) the following steps are taken:
 */
function ToRawFixed(x, minInteger, minFraction, maxFraction) {
    // 1. Let f be maxFraction.
    var f = maxFraction;
    // 2. Let n be an integer for which the exact mathematical value of n ?? 10f ??? x is as close to zero as possible. If there are two such n, pick the larger n.
    var n = Math.pow(10, f) * x; // diverging...
    // 3. If n = 0, let m be the String "0". Otherwise, let m be the String consisting of the digits of the decimal representation of n (in order, with no leading zeroes).
    var m = n === 0 ? "0" : n.toFixed(0); // divering...

    {
        // this diversion is needed to take into consideration big numbers, e.g.:
        // 1.2344501e+37 -> 12344501000000000000000000000000000000
        var idx = void 0;
        var exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;
        if (exp) {
            m = m.slice(0, idx).replace('.', '');
            m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0');
        }
    }

    var int = void 0;
    // 4. If f ??? 0, then
    if (f !== 0) {
        // a. Let k be the number of characters in m.
        var k = m.length;
        // a. If k ??? f, then
        if (k <= f) {
            // i. Let z be the String consisting of f+1???k occurrences of the character "0".
            var z = arrJoin.call(Array(f + 1 - k + 1), '0');
            // ii. Let m be the concatenation of Strings z and m.
            m = z + m;
            // iii. Let k be f+1.
            k = f + 1;
        }
        // a. Let a be the first k???f characters of m, and let b be the remaining f characters of m.
        var a = m.substring(0, k - f),
            b = m.substring(k - f, m.length);
        // a. Let m be the concatenation of the three Strings a, ".", and b.
        m = a + "." + b;
        // a. Let int be the number of characters in a.
        int = a.length;
    }
    // 5. Else, let int be the number of characters in m.
    else int = m.length;
    // 6. Let cut be maxFraction ??? minFraction.
    var cut = maxFraction - minFraction;
    // 7. Repeat while cut > 0 and the last character of m is "0":
    while (cut > 0 && m.slice(-1) === "0") {
        // a. Remove the last character from m.
        m = m.slice(0, -1);
        // a. Decrease cut by 1.
        cut--;
    }
    // 8. If the last character of m is ".", then
    if (m.slice(-1) === ".") {
        // a. Remove the last character from m.
        m = m.slice(0, -1);
    }
    // 9. If int < minInteger, then
    if (int < minInteger) {
        // a. Let z be the String consisting of minInteger???int occurrences of the character "0".
        var _z = arrJoin.call(Array(minInteger - int + 1), '0');
        // a. Let m be the concatenation of Strings z and m.
        m = _z + m;
    }
    // 10. Return m.
    return m;
}

// Sect 11.3.2 Table 2, Numbering systems
// ======================================
var numSys = {
    arab: ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??"],
    arabext: ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??"],
    bali: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    beng: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    deva: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    fullwide: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    gujr: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    guru: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    hanidec: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    khmr: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    knda: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    laoo: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    limb: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    mlym: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    mong: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    mymr: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    orya: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    tamldec: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    telu: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    thai: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"],
    tibt: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???"]
};

/**
 * This function provides access to the locale and formatting options computed
 * during initialization of the object.
 *
 * The function returns a new object whose properties and attributes are set as
 * if constructed by an object literal assigning to each of the following
 * properties the value of the corresponding internal property of this
 * NumberFormat object (see 11.4): locale, numberingSystem, style, currency,
 * currencyDisplay, minimumIntegerDigits, minimumFractionDigits,
 * maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, and
 * useGrouping. Properties whose corresponding internal properties are not present
 * are not assigned.
 */
/* 11.3.3 */defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
    configurable: true,
    writable: true,
    value: function value() {
        var prop = void 0,
            descs = new Record(),
            props = ['locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'],
            internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

        // Satisfy test 11.3_b
        if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');

        for (var i = 0, max = props.length; i < max; i++) {
            if (hop.call(internal, prop = '[[' + props[i] + ']]')) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
        }

        return objCreate({}, descs);
    }
});

/* jslint esnext: true */

// Match these datetime components in a CLDR pattern, except those in single quotes
var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
// trim patterns after transformations
var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
// Skip over patterns with these datetime components because we don't have data
// to back them up:
// timezone, weekday, amoung others
var unwantedDTCs = /[rqQASjJgwWIQq]/; // xXVO were removed from this list in favor of computing matches with timeZoneName values but printing as empty string

var dtKeys = ["era", "year", "month", "day", "weekday", "quarter"];
var tmKeys = ["hour", "minute", "second", "hour12", "timeZoneName"];

function isDateFormatOnly(obj) {
    for (var i = 0; i < tmKeys.length; i += 1) {
        if (obj.hasOwnProperty(tmKeys[i])) {
            return false;
        }
    }
    return true;
}

function isTimeFormatOnly(obj) {
    for (var i = 0; i < dtKeys.length; i += 1) {
        if (obj.hasOwnProperty(dtKeys[i])) {
            return false;
        }
    }
    return true;
}

function joinDateAndTimeFormats(dateFormatObj, timeFormatObj) {
    var o = { _: {} };
    for (var i = 0; i < dtKeys.length; i += 1) {
        if (dateFormatObj[dtKeys[i]]) {
            o[dtKeys[i]] = dateFormatObj[dtKeys[i]];
        }
        if (dateFormatObj._[dtKeys[i]]) {
            o._[dtKeys[i]] = dateFormatObj._[dtKeys[i]];
        }
    }
    for (var j = 0; j < tmKeys.length; j += 1) {
        if (timeFormatObj[tmKeys[j]]) {
            o[tmKeys[j]] = timeFormatObj[tmKeys[j]];
        }
        if (timeFormatObj._[tmKeys[j]]) {
            o._[tmKeys[j]] = timeFormatObj._[tmKeys[j]];
        }
    }
    return o;
}

function computeFinalPatterns(formatObj) {
    // From http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns:
    //  'In patterns, two single quotes represents a literal single quote, either
    //   inside or outside single quotes. Text within single quotes is not
    //   interpreted in any way (except for two adjacent single quotes).'
    formatObj.pattern12 = formatObj.extendedPattern.replace(/'([^']*)'/g, function ($0, literal) {
        return literal ? literal : "'";
    });

    // pattern 12 is always the default. we can produce the 24 by removing {ampm}
    formatObj.pattern = formatObj.pattern12.replace('{ampm}', '').replace(expPatternTrimmer, '');
    return formatObj;
}

function expDTComponentsMeta($0, formatObj) {
    switch ($0.charAt(0)) {
        // --- Era
        case 'G':
            formatObj.era = ['short', 'short', 'short', 'long', 'narrow'][$0.length - 1];
            return '{era}';

        // --- Year
        case 'y':
        case 'Y':
        case 'u':
        case 'U':
        case 'r':
            formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
            return '{year}';

        // --- Quarter (not supported in this polyfill)
        case 'Q':
        case 'q':
            formatObj.quarter = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
            return '{quarter}';

        // --- Month
        case 'M':
        case 'L':
            formatObj.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
            return '{month}';

        // --- Week (not supported in this polyfill)
        case 'w':
            // week of the year
            formatObj.week = $0.length === 2 ? '2-digit' : 'numeric';
            return '{weekday}';
        case 'W':
            // week of the month
            formatObj.week = 'numeric';
            return '{weekday}';

        // --- Day
        case 'd':
            // day of the month
            formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
            return '{day}';
        case 'D': // day of the year
        case 'F': // day of the week
        case 'g':
            // 1..n: Modified Julian day
            formatObj.day = 'numeric';
            return '{day}';

        // --- Week Day
        case 'E':
            // day of the week
            formatObj.weekday = ['short', 'short', 'short', 'long', 'narrow', 'short'][$0.length - 1];
            return '{weekday}';
        case 'e':
            // local day of the week
            formatObj.weekday = ['numeric', '2-digit', 'short', 'long', 'narrow', 'short'][$0.length - 1];
            return '{weekday}';
        case 'c':
            // stand alone local day of the week
            formatObj.weekday = ['numeric', undefined, 'short', 'long', 'narrow', 'short'][$0.length - 1];
            return '{weekday}';

        // --- Period
        case 'a': // AM, PM
        case 'b': // am, pm, noon, midnight
        case 'B':
            // flexible day periods
            formatObj.hour12 = true;
            return '{ampm}';

        // --- Hour
        case 'h':
        case 'H':
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            return '{hour}';
        case 'k':
        case 'K':
            formatObj.hour12 = true; // 12-hour-cycle time formats (using h or K)
            formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
            return '{hour}';

        // --- Minute
        case 'm':
            formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
            return '{minute}';

        // --- Second
        case 's':
            formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
            return '{second}';
        case 'S':
        case 'A':
            formatObj.second = 'numeric';
            return '{second}';

        // --- Timezone
        case 'z': // 1..3, 4: specific non-location format
        case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
        case 'O': // 1, 4: miliseconds in day short, long
        case 'v': // 1, 4: generic non-location format
        case 'V': // 1, 2, 3, 4: time zone ID or city
        case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
        case 'x':
            // 1, 2, 3, 4: The ISO8601 varios formats
            // this polyfill only supports much, for now, we are just doing something dummy
            formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
            return '{timeZoneName}';
    }
}

/**
 * Converts the CLDR availableFormats into the objects and patterns required by
 * the ECMAScript Internationalization API specification.
 */
function createDateTimeFormat(skeleton, pattern) {
    // we ignore certain patterns that are unsupported to avoid this expensive op.
    if (unwantedDTCs.test(pattern)) return undefined;

    var formatObj = {
        originalPattern: pattern,
        _: {}
    };

    // Replace the pattern string with the one required by the specification, whilst
    // at the same time evaluating it for the subsets and formats
    formatObj.extendedPattern = pattern.replace(expDTComponents, function ($0) {
        // See which symbol we're dealing with
        return expDTComponentsMeta($0, formatObj._);
    });

    // Match the skeleton string with the one required by the specification
    // this implementation is based on the Date Field Symbol Table:
    // http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
    // Note: we are adding extra data to the formatObject even though this polyfill
    //       might not support it.
    skeleton.replace(expDTComponents, function ($0) {
        // See which symbol we're dealing with
        return expDTComponentsMeta($0, formatObj);
    });

    return computeFinalPatterns(formatObj);
}

/**
 * Processes DateTime formats from CLDR to an easier-to-parse format.
 * the result of this operation should be cached the first time a particular
 * calendar is analyzed.
 *
 * The specification requires we support at least the following subsets of
 * date/time components:
 *
 *   - 'weekday', 'year', 'month', 'day', 'hour', 'minute', 'second'
 *   - 'weekday', 'year', 'month', 'day'
 *   - 'year', 'month', 'day'
 *   - 'year', 'month'
 *   - 'month', 'day'
 *   - 'hour', 'minute', 'second'
 *   - 'hour', 'minute'
 *
 * We need to cherry pick at least these subsets from the CLDR data and convert
 * them into the pattern objects used in the ECMA-402 API.
 */
function createDateTimeFormats(formats) {
    var availableFormats = formats.availableFormats;
    var timeFormats = formats.timeFormats;
    var dateFormats = formats.dateFormats;
    var result = [];
    var skeleton = void 0,
        pattern = void 0,
        computed = void 0,
        i = void 0,
        j = void 0;
    var timeRelatedFormats = [];
    var dateRelatedFormats = [];

    // Map available (custom) formats into a pattern for createDateTimeFormats
    for (skeleton in availableFormats) {
        if (availableFormats.hasOwnProperty(skeleton)) {
            pattern = availableFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
                result.push(computed);
                // in some cases, the format is only displaying date specific props
                // or time specific props, in which case we need to also produce the
                // combined formats.
                if (isDateFormatOnly(computed)) {
                    dateRelatedFormats.push(computed);
                } else if (isTimeFormatOnly(computed)) {
                    timeRelatedFormats.push(computed);
                }
            }
        }
    }

    // Map time formats into a pattern for createDateTimeFormats
    for (skeleton in timeFormats) {
        if (timeFormats.hasOwnProperty(skeleton)) {
            pattern = timeFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
                result.push(computed);
                timeRelatedFormats.push(computed);
            }
        }
    }

    // Map date formats into a pattern for createDateTimeFormats
    for (skeleton in dateFormats) {
        if (dateFormats.hasOwnProperty(skeleton)) {
            pattern = dateFormats[skeleton];
            computed = createDateTimeFormat(skeleton, pattern);
            if (computed) {
                result.push(computed);
                dateRelatedFormats.push(computed);
            }
        }
    }

    // combine custom time and custom date formats when they are orthogonals to complete the
    // formats supported by CLDR.
    // This Algo is based on section "Missing Skeleton Fields" from:
    // http://unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems
    for (i = 0; i < timeRelatedFormats.length; i += 1) {
        for (j = 0; j < dateRelatedFormats.length; j += 1) {
            if (dateRelatedFormats[j].month === 'long') {
                pattern = dateRelatedFormats[j].weekday ? formats.full : formats.long;
            } else if (dateRelatedFormats[j].month === 'short') {
                pattern = formats.medium;
            } else {
                pattern = formats.short;
            }
            computed = joinDateAndTimeFormats(dateRelatedFormats[j], timeRelatedFormats[i]);
            computed.originalPattern = pattern;
            computed.extendedPattern = pattern.replace('{0}', timeRelatedFormats[i].extendedPattern).replace('{1}', dateRelatedFormats[j].extendedPattern).replace(/^[,\s]+|[,\s]+$/gi, '');
            result.push(computeFinalPatterns(computed));
        }
    }

    return result;
}

// this represents the exceptions of the rule that are not covered by CLDR availableFormats
// for single property configurations, they play no role when using multiple properties, and
// those that are not in this table, are not exceptions or are not covered by the data we
// provide.
var validSyntheticProps = {
    second: {
        numeric: 's',
        '2-digit': 'ss'
    },
    minute: {
        numeric: 'm',
        '2-digit': 'mm'
    },
    year: {
        numeric: 'y',
        '2-digit': 'yy'
    },
    day: {
        numeric: 'd',
        '2-digit': 'dd'
    },
    month: {
        numeric: 'L',
        '2-digit': 'LL',
        narrow: 'LLLLL',
        short: 'LLL',
        long: 'LLLL'
    },
    weekday: {
        narrow: 'ccccc',
        short: 'ccc',
        long: 'cccc'
    }
};

function generateSyntheticFormat(propName, propValue) {
    if (validSyntheticProps[propName] && validSyntheticProps[propName][propValue]) {
        var _ref2;

        return _ref2 = {
            originalPattern: validSyntheticProps[propName][propValue],
            _: defineProperty$1({}, propName, propValue),
            extendedPattern: "{" + propName + "}"
        }, defineProperty$1(_ref2, propName, propValue), defineProperty$1(_ref2, "pattern12", "{" + propName + "}"), defineProperty$1(_ref2, "pattern", "{" + propName + "}"), _ref2;
    }
}

// An object map of date component keys, saves using a regex later
var dateWidths = objCreate(null, { narrow: {}, short: {}, long: {} });

/**
 * Returns a string for a date component, resolved using multiple inheritance as specified
 * as specified in the Unicode Technical Standard 35.
 */
function resolveDateString(data, ca, component, width, key) {
    // From http://www.unicode.org/reports/tr35/tr35.html#Multiple_Inheritance:
    // 'In clearly specified instances, resources may inherit from within the same locale.
    //  For example, ... the Buddhist calendar inherits from the Gregorian calendar.'
    var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component],


    // "sideways" inheritance resolves strings when a key doesn't exist
    alts = {
        narrow: ['short', 'long'],
        short: ['long', 'narrow'],
        long: ['short', 'narrow']
    },


    //
    resolved = hop.call(obj, width) ? obj[width] : hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];

    // `key` wouldn't be specified for components 'dayPeriods'
    return key !== null ? resolved[key] : resolved;
}

// Define the DateTimeFormat constructor internally so it cannot be tainted
function DateTimeFormatConstructor() {
    var locales = arguments[0];
    var options = arguments[1];

    if (!this || this === Intl) {
        return new Intl.DateTimeFormat(locales, options);
    }
    return InitializeDateTimeFormat(toObject(this), locales, options);
}

defineProperty(Intl, 'DateTimeFormat', {
    configurable: true,
    writable: true,
    value: DateTimeFormatConstructor
});

// Must explicitly set prototypes as unwritable
defineProperty(DateTimeFormatConstructor, 'prototype', {
    writable: false
});

/**
 * The abstract operation InitializeDateTimeFormat accepts the arguments dateTimeFormat
 * (which must be an object), locales, and options. It initializes dateTimeFormat as a
 * DateTimeFormat object.
 */
function /* 12.1.1.1 */InitializeDateTimeFormat(dateTimeFormat, locales, options) {
    // This will be a internal properties object if we're not already initialized
    var internal = getInternalProperties(dateTimeFormat);

    // Create an object whose props can be used to restore the values of RegExp props
    var regexpRestore = createRegExpRestore();

    // 1. If dateTimeFormat has an [[initializedIntlObject]] internal property with
    //    value true, throw a TypeError exception.
    if (internal['[[initializedIntlObject]]'] === true) throw new TypeError('`this` object has already been initialized as an Intl object');

    // Need this to access the `internal` object
    defineProperty(dateTimeFormat, '__getInternalProperties', {
        value: function value() {
            // NOTE: Non-standard, for internal use only
            if (arguments[0] === secret) return internal;
        }
    });

    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
    internal['[[initializedIntlObject]]'] = true;

    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
    //    abstract operation (defined in 9.2.1) with argument locales.
    var requestedLocales = CanonicalizeLocaleList(locales);

    // 4. Let options be the result of calling the ToDateTimeOptions abstract
    //    operation (defined below) with arguments options, "any", and "date".
    options = ToDateTimeOptions(options, 'any', 'date');

    // 5. Let opt be a new Record.
    var opt = new Record();

    // 6. Let matcher be the result of calling the GetOption abstract operation
    //    (defined in 9.2.9) with arguments options, "localeMatcher", "string", a List
    //    containing the two String values "lookup" and "best fit", and "best fit".
    var matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

    // 7. Set opt.[[localeMatcher]] to matcher.
    opt['[[localeMatcher]]'] = matcher;

    // 8. Let DateTimeFormat be the standard built-in object that is the initial
    //    value of Intl.DateTimeFormat.
    var DateTimeFormat = internals.DateTimeFormat; // This is what we *really* need

    // 9. Let localeData be the value of the [[localeData]] internal property of
    //    DateTimeFormat.
    var localeData = DateTimeFormat['[[localeData]]'];

    // 10. Let r be the result of calling the ResolveLocale abstract operation
    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
    //      DateTimeFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
    //      internal property of DateTimeFormat, and localeData.
    var r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales, opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);

    // 11. Set the [[locale]] internal property of dateTimeFormat to the value of
    //     r.[[locale]].
    internal['[[locale]]'] = r['[[locale]]'];

    // 12. Set the [[calendar]] internal property of dateTimeFormat to the value of
    //     r.[[ca]].
    internal['[[calendar]]'] = r['[[ca]]'];

    // 13. Set the [[numberingSystem]] internal property of dateTimeFormat to the value of
    //     r.[[nu]].
    internal['[[numberingSystem]]'] = r['[[nu]]'];

    // The specification doesn't tell us to do this, but it's helpful later on
    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

    // 14. Let dataLocale be the value of r.[[dataLocale]].
    var dataLocale = r['[[dataLocale]]'];

    // 15. Let tz be the result of calling the [[Get]] internal method of options with
    //     argument "timeZone".
    var tz = options.timeZone;

    // 16. If tz is not undefined, then
    if (tz !== undefined) {
        // a. Let tz be ToString(tz).
        // b. Convert tz to upper case as described in 6.1.
        //    NOTE: If an implementation accepts additional time zone values, as permitted
        //          under certain conditions by the Conformance clause, different casing
        //          rules apply.
        tz = toLatinUpperCase(tz);

        // c. If tz is not "UTC", then throw a RangeError exception.
        // ###TODO: accept more time zones###
        if (tz !== 'UTC') throw new RangeError('timeZone is not supported.');
    }

    // 17. Set the [[timeZone]] internal property of dateTimeFormat to tz.
    internal['[[timeZone]]'] = tz;

    // 18. Let opt be a new Record.
    opt = new Record();

    // 19. For each row of Table 3, except the header row, do:
    for (var prop in dateTimeComponents) {
        if (!hop.call(dateTimeComponents, prop)) continue;

        // 20. Let prop be the name given in the Property column of the row.
        // 21. Let value be the result of calling the GetOption abstract operation,
        //     passing as argument options, the name given in the Property column of the
        //     row, "string", a List containing the strings given in the Values column of
        //     the row, and undefined.
        var value = GetOption(options, prop, 'string', dateTimeComponents[prop]);

        // 22. Set opt.[[<prop>]] to value.
        opt['[[' + prop + ']]'] = value;
    }

    // Assigned a value below
    var bestFormat = void 0;

    // 23. Let dataLocaleData be the result of calling the [[Get]] internal method of
    //     localeData with argument dataLocale.
    var dataLocaleData = localeData[dataLocale];

    // 24. Let formats be the result of calling the [[Get]] internal method of
    //     dataLocaleData with argument "formats".
    //     Note: we process the CLDR formats into the spec'd structure
    var formats = ToDateTimeFormats(dataLocaleData.formats);

    // 25. Let matcher be the result of calling the GetOption abstract operation with
    //     arguments options, "formatMatcher", "string", a List containing the two String
    //     values "basic" and "best fit", and "best fit".
    matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');

    // Optimization: caching the processed formats as a one time operation by
    // replacing the initial structure from localeData
    dataLocaleData.formats = formats;

    // 26. If matcher is "basic", then
    if (matcher === 'basic') {
        // 27. Let bestFormat be the result of calling the BasicFormatMatcher abstract
        //     operation (defined below) with opt and formats.
        bestFormat = BasicFormatMatcher(opt, formats);

        // 28. Else
    } else {
        {
            // diverging
            var _hr = GetOption(options, 'hour12', 'boolean' /*, undefined, undefined*/);
            opt.hour12 = _hr === undefined ? dataLocaleData.hour12 : _hr;
        }
        // 29. Let bestFormat be the result of calling the BestFitFormatMatcher
        //     abstract operation (defined below) with opt and formats.
        bestFormat = BestFitFormatMatcher(opt, formats);
    }

    // 30. For each row in Table 3, except the header row, do
    for (var _prop in dateTimeComponents) {
        if (!hop.call(dateTimeComponents, _prop)) continue;

        // a. Let prop be the name given in the Property column of the row.
        // b. Let pDesc be the result of calling the [[GetOwnProperty]] internal method of
        //    bestFormat with argument prop.
        // c. If pDesc is not undefined, then
        if (hop.call(bestFormat, _prop)) {
            // i. Let p be the result of calling the [[Get]] internal method of bestFormat
            //    with argument prop.
            var p = bestFormat[_prop];
            {
                // diverging
                p = bestFormat._ && hop.call(bestFormat._, _prop) ? bestFormat._[_prop] : p;
            }

            // ii. Set the [[<prop>]] internal property of dateTimeFormat to p.
            internal['[[' + _prop + ']]'] = p;
        }
    }

    var pattern = void 0; // Assigned a value below

    // 31. Let hr12 be the result of calling the GetOption abstract operation with
    //     arguments options, "hour12", "boolean", undefined, and undefined.
    var hr12 = GetOption(options, 'hour12', 'boolean' /*, undefined, undefined*/);

    // 32. If dateTimeFormat has an internal property [[hour]], then
    if (internal['[[hour]]']) {
        // a. If hr12 is undefined, then let hr12 be the result of calling the [[Get]]
        //    internal method of dataLocaleData with argument "hour12".
        hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;

        // b. Set the [[hour12]] internal property of dateTimeFormat to hr12.
        internal['[[hour12]]'] = hr12;

        // c. If hr12 is true, then
        if (hr12 === true) {
            // i. Let hourNo0 be the result of calling the [[Get]] internal method of
            //    dataLocaleData with argument "hourNo0".
            var hourNo0 = dataLocaleData.hourNo0;

            // ii. Set the [[hourNo0]] internal property of dateTimeFormat to hourNo0.
            internal['[[hourNo0]]'] = hourNo0;

            // iii. Let pattern be the result of calling the [[Get]] internal method of
            //      bestFormat with argument "pattern12".
            pattern = bestFormat.pattern12;
        }

        // d. Else
        else
            // i. Let pattern be the result of calling the [[Get]] internal method of
            //    bestFormat with argument "pattern".
            pattern = bestFormat.pattern;
    }

    // 33. Else
    else
        // a. Let pattern be the result of calling the [[Get]] internal method of
        //    bestFormat with argument "pattern".
        pattern = bestFormat.pattern;

    // 34. Set the [[pattern]] internal property of dateTimeFormat to pattern.
    internal['[[pattern]]'] = pattern;

    // 35. Set the [[boundFormat]] internal property of dateTimeFormat to undefined.
    internal['[[boundFormat]]'] = undefined;

    // 36. Set the [[initializedDateTimeFormat]] internal property of dateTimeFormat to
    //     true.
    internal['[[initializedDateTimeFormat]]'] = true;

    // In ES3, we need to pre-bind the format() function
    if (es3) dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);

    // Restore the RegExp properties
    regexpRestore();

    // Return the newly initialised object
    return dateTimeFormat;
}

/**
 * Several DateTimeFormat algorithms use values from the following table, which provides
 * property names and allowable values for the components of date and time formats:
 */
var dateTimeComponents = {
    weekday: ["narrow", "short", "long"],
    era: ["narrow", "short", "long"],
    year: ["2-digit", "numeric"],
    month: ["2-digit", "numeric", "narrow", "short", "long"],
    day: ["2-digit", "numeric"],
    hour: ["2-digit", "numeric"],
    minute: ["2-digit", "numeric"],
    second: ["2-digit", "numeric"],
    timeZoneName: ["short", "long"]
};

/**
 * When the ToDateTimeOptions abstract operation is called with arguments options,
 * required, and defaults, the following steps are taken:
 */
function ToDateTimeFormats(formats) {
    if (Object.prototype.toString.call(formats) === '[object Array]') {
        return formats;
    }
    return createDateTimeFormats(formats);
}

/**
 * When the ToDateTimeOptions abstract operation is called with arguments options,
 * required, and defaults, the following steps are taken:
 */
function ToDateTimeOptions(options, required, defaults) {
    // 1. If options is undefined, then let options be null, else let options be
    //    ToObject(options).
    if (options === undefined) options = null;else {
        // (#12) options needs to be a Record, but it also needs to inherit properties
        var opt2 = toObject(options);
        options = new Record();

        for (var k in opt2) {
            options[k] = opt2[k];
        }
    }

    // 2. Let create be the standard built-in function object defined in ES5, 15.2.3.5.
    var create = objCreate;

    // 3. Let options be the result of calling the [[Call]] internal method of create with
    //    undefined as the this value and an argument list containing the single item
    //    options.
    options = create(options);

    // 4. Let needDefaults be true.
    var needDefaults = true;

    // 5. If required is "date" or "any", then
    if (required === 'date' || required === 'any') {
        // a. For each of the property names "weekday", "year", "month", "day":
        // i. If the result of calling the [[Get]] internal method of options with the
        //    property name is not undefined, then let needDefaults be false.
        if (options.weekday !== undefined || options.year !== undefined || options.month !== undefined || options.day !== undefined) needDefaults = false;
    }

    // 6. If required is "time" or "any", then
    if (required === 'time' || required === 'any') {
        // a. For each of the property names "hour", "minute", "second":
        // i. If the result of calling the [[Get]] internal method of options with the
        //    property name is not undefined, then let needDefaults be false.
        if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined) needDefaults = false;
    }

    // 7. If needDefaults is true and defaults is either "date" or "all", then
    if (needDefaults && (defaults === 'date' || defaults === 'all'))
        // a. For each of the property names "year", "month", "day":
        // i. Call the [[DefineOwnProperty]] internal method of options with the
        //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
        //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
        options.year = options.month = options.day = 'numeric';

    // 8. If needDefaults is true and defaults is either "time" or "all", then
    if (needDefaults && (defaults === 'time' || defaults === 'all'))
        // a. For each of the property names "hour", "minute", "second":
        // i. Call the [[DefineOwnProperty]] internal method of options with the
        //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
        //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
        options.hour = options.minute = options.second = 'numeric';

    // 9. Return options.
    return options;
}

/**
 * When the BasicFormatMatcher abstract operation is called with two arguments options and
 * formats, the following steps are taken:
 */
function BasicFormatMatcher(options, formats) {
    // 1. Let removalPenalty be 120.
    var removalPenalty = 120;

    // 2. Let additionPenalty be 20.
    var additionPenalty = 20;

    // 3. Let longLessPenalty be 8.
    var longLessPenalty = 8;

    // 4. Let longMorePenalty be 6.
    var longMorePenalty = 6;

    // 5. Let shortLessPenalty be 6.
    var shortLessPenalty = 6;

    // 6. Let shortMorePenalty be 3.
    var shortMorePenalty = 3;

    // 7. Let bestScore be -Infinity.
    var bestScore = -Infinity;

    // 8. Let bestFormat be undefined.
    var bestFormat = void 0;

    // 9. Let i be 0.
    var i = 0;

    // 10. Assert: formats is an Array object.

    // 11. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
    var len = formats.length;

    // 12. Repeat while i < len:
    while (i < len) {
        // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
        var format = formats[i];

        // b. Let score be 0.
        var score = 0;

        // c. For each property shown in Table 3:
        for (var property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, property)) continue;

            // i. Let optionsProp be options.[[<property>]].
            var optionsProp = options['[[' + property + ']]'];

            // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
            //     with argument property.
            // iii. If formatPropDesc is not undefined, then
            //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
            var formatProp = hop.call(format, property) ? format[property] : undefined;

            // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
            //     additionPenalty.
            if (optionsProp === undefined && formatProp !== undefined) score -= additionPenalty;

            // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
            //    removalPenalty.
            else if (optionsProp !== undefined && formatProp === undefined) score -= removalPenalty;

                // vi. Else
                else {
                        // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
                        //    "long"].
                        var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];

                        // 2. Let optionsPropIndex be the index of optionsProp within values.
                        var optionsPropIndex = arrIndexOf.call(values, optionsProp);

                        // 3. Let formatPropIndex be the index of formatProp within values.
                        var formatPropIndex = arrIndexOf.call(values, formatProp);

                        // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
                        var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

                        // 5. If delta = 2, decrease score by longMorePenalty.
                        if (delta === 2) score -= longMorePenalty;

                        // 6. Else if delta = 1, decrease score by shortMorePenalty.
                        else if (delta === 1) score -= shortMorePenalty;

                            // 7. Else if delta = -1, decrease score by shortLessPenalty.
                            else if (delta === -1) score -= shortLessPenalty;

                                // 8. Else if delta = -2, decrease score by longLessPenalty.
                                else if (delta === -2) score -= longLessPenalty;
                    }
        }

        // d. If score > bestScore, then
        if (score > bestScore) {
            // i. Let bestScore be score.
            bestScore = score;

            // ii. Let bestFormat be format.
            bestFormat = format;
        }

        // e. Increase i by 1.
        i++;
    }

    // 13. Return bestFormat.
    return bestFormat;
}

/**
 * When the BestFitFormatMatcher abstract operation is called with two arguments options
 * and formats, it performs implementation dependent steps, which should return a set of
 * component representations that a typical user of the selected locale would perceive as
 * at least as good as the one returned by BasicFormatMatcher.
 *
 * This polyfill defines the algorithm to be the same as BasicFormatMatcher,
 * with the addition of bonus points awarded where the requested format is of
 * the same data type as the potentially matching format.
 *
 * This algo relies on the concept of closest distance matching described here:
 * http://unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
 * Typically a ???best match??? is found using a closest distance match, such as:
 *
 * Symbols requesting a best choice for the locale are replaced.
 *      j ??? one of {H, k, h, K}; C ??? one of {a, b, B}
 * -> Covered by cldr.js matching process
 *
 * For fields with symbols representing the same type (year, month, day, etc):
 *     Most symbols have a small distance from each other.
 *         M ??? L; E ??? c; a ??? b ??? B; H ??? k ??? h ??? K; ...
 *     -> Covered by cldr.js matching process
 *
 *     Width differences among fields, other than those marking text vs numeric, are given small distance from each other.
 *         MMM ??? MMMM
 *         MM ??? M
 *     Numeric and text fields are given a larger distance from each other.
 *         MMM ??? MM
 *     Symbols representing substantial differences (week of year vs week of month) are given much larger a distances from each other.
 *         d ??? D; ...
 *     Missing or extra fields cause a match to fail. (But see Missing Skeleton Fields).
 *
 *
 * For example,
 *
 *     { month: 'numeric', day: 'numeric' }
 *
 * should match
 *
 *     { month: '2-digit', day: '2-digit' }
 *
 * rather than
 *
 *     { month: 'short', day: 'numeric' }
 *
 * This makes sense because a user requesting a formatted date with numeric parts would
 * not expect to see the returned format containing narrow, short or long part names
 */
function BestFitFormatMatcher(options, formats) {
    /** Diverging: this block implements the hack for single property configuration, eg.:
     *
     *      `new Intl.DateTimeFormat('en', {day: 'numeric'})`
     *
     * should produce a single digit with the day of the month. This is needed because
     * CLDR `availableFormats` data structure doesn't cover these cases.
     */
    {
        var optionsPropNames = [];
        for (var property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, property)) continue;

            if (options['[[' + property + ']]'] !== undefined) {
                optionsPropNames.push(property);
            }
        }
        if (optionsPropNames.length === 1) {
            var _bestFormat = generateSyntheticFormat(optionsPropNames[0], options['[[' + optionsPropNames[0] + ']]']);
            if (_bestFormat) {
                return _bestFormat;
            }
        }
    }

    // 1. Let removalPenalty be 120.
    var removalPenalty = 120;

    // 2. Let additionPenalty be 20.
    var additionPenalty = 20;

    // 3. Let longLessPenalty be 8.
    var longLessPenalty = 8;

    // 4. Let longMorePenalty be 6.
    var longMorePenalty = 6;

    // 5. Let shortLessPenalty be 6.
    var shortLessPenalty = 6;

    // 6. Let shortMorePenalty be 3.
    var shortMorePenalty = 3;

    var patternPenalty = 2;

    var hour12Penalty = 1;

    // 7. Let bestScore be -Infinity.
    var bestScore = -Infinity;

    // 8. Let bestFormat be undefined.
    var bestFormat = void 0;

    // 9. Let i be 0.
    var i = 0;

    // 10. Assert: formats is an Array object.

    // 11. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
    var len = formats.length;

    // 12. Repeat while i < len:
    while (i < len) {
        // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
        var format = formats[i];

        // b. Let score be 0.
        var score = 0;

        // c. For each property shown in Table 3:
        for (var _property in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, _property)) continue;

            // i. Let optionsProp be options.[[<property>]].
            var optionsProp = options['[[' + _property + ']]'];

            // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
            //     with argument property.
            // iii. If formatPropDesc is not undefined, then
            //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
            var formatProp = hop.call(format, _property) ? format[_property] : undefined;

            // Diverging: using the default properties produced by the pattern/skeleton
            // to match it with user options, and apply a penalty
            var patternProp = hop.call(format._, _property) ? format._[_property] : undefined;
            if (optionsProp !== patternProp) {
                score -= patternPenalty;
            }

            // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
            //     additionPenalty.
            if (optionsProp === undefined && formatProp !== undefined) score -= additionPenalty;

            // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
            //    removalPenalty.
            else if (optionsProp !== undefined && formatProp === undefined) score -= removalPenalty;

                // vi. Else
                else {
                        // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
                        //    "long"].
                        var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];

                        // 2. Let optionsPropIndex be the index of optionsProp within values.
                        var optionsPropIndex = arrIndexOf.call(values, optionsProp);

                        // 3. Let formatPropIndex be the index of formatProp within values.
                        var formatPropIndex = arrIndexOf.call(values, formatProp);

                        // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
                        var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

                        {
                            // diverging from spec
                            // When the bestFit argument is true, subtract additional penalty where data types are not the same
                            if (formatPropIndex <= 1 && optionsPropIndex >= 2 || formatPropIndex >= 2 && optionsPropIndex <= 1) {
                                // 5. If delta = 2, decrease score by longMorePenalty.
                                if (delta > 0) score -= longMorePenalty;else if (delta < 0) score -= longLessPenalty;
                            } else {
                                // 5. If delta = 2, decrease score by longMorePenalty.
                                if (delta > 1) score -= shortMorePenalty;else if (delta < -1) score -= shortLessPenalty;
                            }
                        }
                    }
        }

        {
            // diverging to also take into consideration differences between 12 or 24 hours
            // which is special for the best fit only.
            if (format._.hour12 !== options.hour12) {
                score -= hour12Penalty;
            }
        }

        // d. If score > bestScore, then
        if (score > bestScore) {
            // i. Let bestScore be score.
            bestScore = score;
            // ii. Let bestFormat be format.
            bestFormat = format;
        }

        // e. Increase i by 1.
        i++;
    }

    // 13. Return bestFormat.
    return bestFormat;
}

/* 12.2.3 */internals.DateTimeFormat = {
    '[[availableLocales]]': [],
    '[[relevantExtensionKeys]]': ['ca', 'nu'],
    '[[localeData]]': {}
};

/**
 * When the supportedLocalesOf method of Intl.DateTimeFormat is called, the
 * following steps are taken:
 */
/* 12.2.2 */
defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
    configurable: true,
    writable: true,
    value: fnBind.call(function (locales) {
        // Bound functions only have the `this` value altered if being used as a constructor,
        // this lets us imitate a native function that has no constructor
        if (!hop.call(this, '[[availableLocales]]')) throw new TypeError('supportedLocalesOf() is not a constructor');

        // Create an object whose props can be used to restore the values of RegExp props
        var regexpRestore = createRegExpRestore(),


        // 1. If options is not provided, then let options be undefined.
        options = arguments[1],


        // 2. Let availableLocales be the value of the [[availableLocales]] internal
        //    property of the standard built-in object that is the initial value of
        //    Intl.NumberFormat.

        availableLocales = this['[[availableLocales]]'],


        // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
        //    abstract operation (defined in 9.2.1) with argument locales.
        requestedLocales = CanonicalizeLocaleList(locales);

        // Restore the RegExp properties
        regexpRestore();

        // 4. Return the result of calling the SupportedLocales abstract operation
        //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
        //    and options.
        return SupportedLocales(availableLocales, requestedLocales, options);
    }, internals.NumberFormat)
});

/**
 * This named accessor property returns a function that formats a number
 * according to the effective locale and the formatting options of this
 * DateTimeFormat object.
 */
/* 12.3.2 */defineProperty(Intl.DateTimeFormat.prototype, 'format', {
    configurable: true,
    get: GetFormatDateTime
});

function GetFormatDateTime() {
    var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

    // Satisfy test 12.3_b
    if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');

    // The value of the [[Get]] attribute is a function that takes the following
    // steps:

    // 1. If the [[boundFormat]] internal property of this DateTimeFormat object
    //    is undefined, then:
    if (internal['[[boundFormat]]'] === undefined) {
        // a. Let F be a Function object, with internal properties set as
        //    specified for built-in functions in ES5, 15, or successor, and the
        //    length property set to 0, that takes the argument date and
        //    performs the following steps:
        var F = function F() {
            var date = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            //   i. If date is not provided or is undefined, then let x be the
            //      result as if by the expression Date.now() where Date.now is
            //      the standard built-in function defined in ES5, 15.9.4.4.
            //  ii. Else let x be ToNumber(date).
            // iii. Return the result of calling the FormatDateTime abstract
            //      operation (defined below) with arguments this and x.
            var x = date === undefined ? Date.now() : toNumber(date);
            return FormatDateTime(this, x);
        };
        // b. Let bind be the standard built-in function object defined in ES5,
        //    15.3.4.5.
        // c. Let bf be the result of calling the [[Call]] internal method of
        //    bind with F as the this value and an argument list containing
        //    the single item this.
        var bf = fnBind.call(F, this);
        // d. Set the [[boundFormat]] internal property of this NumberFormat
        //    object to bf.
        internal['[[boundFormat]]'] = bf;
    }
    // Return the value of the [[boundFormat]] internal property of this
    // NumberFormat object.
    return internal['[[boundFormat]]'];
}

function formatToParts$1() {
    var date = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

    var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

    if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for formatToParts() is not an initialized Intl.DateTimeFormat object.');

    var x = date === undefined ? Date.now() : toNumber(date);
    return FormatToPartsDateTime(this, x);
}

Object.defineProperty(Intl.DateTimeFormat.prototype, 'formatToParts', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: formatToParts$1
});

function CreateDateTimeParts(dateTimeFormat, x) {
    // 1. If x is not a finite Number, then throw a RangeError exception.
    if (!isFinite(x)) throw new RangeError('Invalid valid date passed to format');

    var internal = dateTimeFormat.__getInternalProperties(secret);

    // Creating restore point for properties on the RegExp object... please wait
    /* let regexpRestore = */createRegExpRestore(); // ###TODO: review this

    // 2. Let locale be the value of the [[locale]] internal property of dateTimeFormat.
    var locale = internal['[[locale]]'];

    // 3. Let nf be the result of creating a new NumberFormat object as if by the
    // expression new Intl.NumberFormat([locale], {useGrouping: false}) where
    // Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
    var nf = new Intl.NumberFormat([locale], { useGrouping: false });

    // 4. Let nf2 be the result of creating a new NumberFormat object as if by the
    // expression new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping:
    // false}) where Intl.NumberFormat is the standard built-in constructor defined in
    // 11.1.3.
    var nf2 = new Intl.NumberFormat([locale], { minimumIntegerDigits: 2, useGrouping: false });

    // 5. Let tm be the result of calling the ToLocalTime abstract operation (defined
    // below) with x, the value of the [[calendar]] internal property of dateTimeFormat,
    // and the value of the [[timeZone]] internal property of dateTimeFormat.
    var tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']);

    // 6. Let result be the value of the [[pattern]] internal property of dateTimeFormat.
    var pattern = internal['[[pattern]]'];

    // 7.
    var result = new List();

    // 8.
    var index = 0;

    // 9.
    var beginIndex = pattern.indexOf('{');

    // 10.
    var endIndex = 0;

    // Need the locale minus any extensions
    var dataLocale = internal['[[dataLocale]]'];

    // Need the calendar data from CLDR
    var localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars;
    var ca = internal['[[calendar]]'];

    // 11.
    while (beginIndex !== -1) {
        var fv = void 0;
        // a.
        endIndex = pattern.indexOf('}', beginIndex);
        // b.
        if (endIndex === -1) {
            throw new Error('Unclosed pattern');
        }
        // c.
        if (beginIndex > index) {
            arrPush.call(result, {
                type: 'literal',
                value: pattern.substring(index, beginIndex)
            });
        }
        // d.
        var p = pattern.substring(beginIndex + 1, endIndex);
        // e.
        if (dateTimeComponents.hasOwnProperty(p)) {
            //   i. Let f be the value of the [[<p>]] internal property of dateTimeFormat.
            var f = internal['[[' + p + ']]'];
            //  ii. Let v be the value of tm.[[<p>]].
            var v = tm['[[' + p + ']]'];
            // iii. If p is "year" and v ??? 0, then let v be 1 - v.
            if (p === 'year' && v <= 0) {
                v = 1 - v;
            }
            //  iv. If p is "month", then increase v by 1.
            else if (p === 'month') {
                    v++;
                }
                //   v. If p is "hour" and the value of the [[hour12]] internal property of
                //      dateTimeFormat is true, then
                else if (p === 'hour' && internal['[[hour12]]'] === true) {
                        // 1. Let v be v modulo 12.
                        v = v % 12;
                        // 2. If v is 0 and the value of the [[hourNo0]] internal property of
                        //    dateTimeFormat is true, then let v be 12.
                        if (v === 0 && internal['[[hourNo0]]'] === true) {
                            v = 12;
                        }
                    }

            //  vi. If f is "numeric", then
            if (f === 'numeric') {
                // 1. Let fv be the result of calling the FormatNumber abstract operation
                //    (defined in 11.3.2) with arguments nf and v.
                fv = FormatNumber(nf, v);
            }
            // vii. Else if f is "2-digit", then
            else if (f === '2-digit') {
                    // 1. Let fv be the result of calling the FormatNumber abstract operation
                    //    with arguments nf2 and v.
                    fv = FormatNumber(nf2, v);
                    // 2. If the length of fv is greater than 2, let fv be the substring of fv
                    //    containing the last two characters.
                    if (fv.length > 2) {
                        fv = fv.slice(-2);
                    }
                }
                // viii. Else if f is "narrow", "short", or "long", then let fv be a String
                //     value representing f in the desired form; the String value depends upon
                //     the implementation and the effective locale and calendar of
                //     dateTimeFormat. If p is "month", then the String value may also depend
                //     on whether dateTimeFormat has a [[day]] internal property. If p is
                //     "timeZoneName", then the String value may also depend on the value of
                //     the [[inDST]] field of tm.
                else if (f in dateWidths) {
                        switch (p) {
                            case 'month':
                                fv = resolveDateString(localeData, ca, 'months', f, tm['[[' + p + ']]']);
                                break;

                            case 'weekday':
                                try {
                                    fv = resolveDateString(localeData, ca, 'days', f, tm['[[' + p + ']]']);
                                    // fv = resolveDateString(ca.days, f)[tm['[['+ p +']]']];
                                } catch (e) {
                                    throw new Error('Could not find weekday data for locale ' + locale);
                                }
                                break;

                            case 'timeZoneName':
                                fv = ''; // ###TODO
                                break;

                            case 'era':
                                try {
                                    fv = resolveDateString(localeData, ca, 'eras', f, tm['[[' + p + ']]']);
                                } catch (e) {
                                    throw new Error('Could not find era data for locale ' + locale);
                                }
                                break;

                            default:
                                fv = tm['[[' + p + ']]'];
                        }
                    }
            // ix
            arrPush.call(result, {
                type: p,
                value: fv
            });
            // f.
        } else if (p === 'ampm') {
            // i.
            var _v = tm['[[hour]]'];
            // ii./iii.
            fv = resolveDateString(localeData, ca, 'dayPeriods', _v > 11 ? 'pm' : 'am', null);
            // iv.
            arrPush.call(result, {
                type: 'dayPeriod',
                value: fv
            });
            // g.
        } else {
            arrPush.call(result, {
                type: 'literal',
                value: pattern.substring(beginIndex, endIndex + 1)
            });
        }
        // h.
        index = endIndex + 1;
        // i.
        beginIndex = pattern.indexOf('{', index);
    }
    // 12.
    if (endIndex < pattern.length - 1) {
        arrPush.call(result, {
            type: 'literal',
            value: pattern.substr(endIndex + 1)
        });
    }
    // 13.
    return result;
}

/**
 * When the FormatDateTime abstract operation is called with arguments dateTimeFormat
 * (which must be an object initialized as a DateTimeFormat) and x (which must be a Number
 * value), it returns a String value representing x (interpreted as a time value as
 * specified in ES5, 15.9.1.1) according to the effective locale and the formatting
 * options of dateTimeFormat.
 */
function FormatDateTime(dateTimeFormat, x) {
    var parts = CreateDateTimeParts(dateTimeFormat, x);
    var result = '';

    for (var i = 0; parts.length > i; i++) {
        var part = parts[i];
        result += part.value;
    }
    return result;
}

function FormatToPartsDateTime(dateTimeFormat, x) {
    var parts = CreateDateTimeParts(dateTimeFormat, x);
    var result = [];
    for (var i = 0; parts.length > i; i++) {
        var part = parts[i];
        result.push({
            type: part.type,
            value: part.value
        });
    }
    return result;
}

/**
 * When the ToLocalTime abstract operation is called with arguments date, calendar, and
 * timeZone, the following steps are taken:
 */
function ToLocalTime(date, calendar, timeZone) {
    // 1. Apply calendrical calculations on date for the given calendar and time zone to
    //    produce weekday, era, year, month, day, hour, minute, second, and inDST values.
    //    The calculations should use best available information about the specified
    //    calendar and time zone. If the calendar is "gregory", then the calculations must
    //    match the algorithms specified in ES5, 15.9.1, except that calculations are not
    //    bound by the restrictions on the use of best available information on time zones
    //    for local time zone adjustment and daylight saving time adjustment imposed by
    //    ES5, 15.9.1.7 and 15.9.1.8.
    // ###TODO###
    var d = new Date(date),
        m = 'get' + (timeZone || '');

    // 2. Return a Record with fields [[weekday]], [[era]], [[year]], [[month]], [[day]],
    //    [[hour]], [[minute]], [[second]], and [[inDST]], each with the corresponding
    //    calculated value.
    return new Record({
        '[[weekday]]': d[m + 'Day'](),
        '[[era]]': +(d[m + 'FullYear']() >= 0),
        '[[year]]': d[m + 'FullYear'](),
        '[[month]]': d[m + 'Month'](),
        '[[day]]': d[m + 'Date'](),
        '[[hour]]': d[m + 'Hours'](),
        '[[minute]]': d[m + 'Minutes'](),
        '[[second]]': d[m + 'Seconds'](),
        '[[inDST]]': false // ###TODO###
    });
}

/**
 * The function returns a new object whose properties and attributes are set as if
 * constructed by an object literal assigning to each of the following properties the
 * value of the corresponding internal property of this DateTimeFormat object (see 12.4):
 * locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day,
 * hour, minute, second, and timeZoneName. Properties whose corresponding internal
 * properties are not present are not assigned.
 */
/* 12.3.3 */defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
    writable: true,
    configurable: true,
    value: function value() {
        var prop = void 0,
            descs = new Record(),
            props = ['locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'],
            internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

        // Satisfy test 12.3_b
        if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');

        for (var i = 0, max = props.length; i < max; i++) {
            if (hop.call(internal, prop = '[[' + props[i] + ']]')) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
        }

        return objCreate({}, descs);
    }
});

var ls = Intl.__localeSensitiveProtos = {
    Number: {},
    Date: {}
};

/**
 * When the toLocaleString method is called with optional arguments locales and options,
 * the following steps are taken:
 */
/* 13.2.1 */ls.Number.toLocaleString = function () {
    // Satisfy test 13.2.1_1
    if (Object.prototype.toString.call(this) !== '[object Number]') throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');

    // 1. Let x be this Number value (as defined in ES5, 15.7.4).
    // 2. If locales is not provided, then let locales be undefined.
    // 3. If options is not provided, then let options be undefined.
    // 4. Let numberFormat be the result of creating a new object as if by the
    //    expression new Intl.NumberFormat(locales, options) where
    //    Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
    // 5. Return the result of calling the FormatNumber abstract operation
    //    (defined in 11.3.2) with arguments numberFormat and x.
    return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
};

/**
 * When the toLocaleString method is called with optional arguments locales and options,
 * the following steps are taken:
 */
/* 13.3.1 */ls.Date.toLocaleString = function () {
    // Satisfy test 13.3.0_1
    if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');

    // 1. Let x be this time value (as defined in ES5, 15.9.5).
    var x = +this;

    // 2. If x is NaN, then return "Invalid Date".
    if (isNaN(x)) return 'Invalid Date';

    // 3. If locales is not provided, then let locales be undefined.
    var locales = arguments[0];

    // 4. If options is not provided, then let options be undefined.
    var options = arguments[1];

    // 5. Let options be the result of calling the ToDateTimeOptions abstract
    //    operation (defined in 12.1.1) with arguments options, "any", and "all".
    options = ToDateTimeOptions(options, 'any', 'all');

    // 6. Let dateTimeFormat be the result of creating a new object as if by the
    //    expression new Intl.DateTimeFormat(locales, options) where
    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
    var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

    // 7. Return the result of calling the FormatDateTime abstract operation (defined
    //    in 12.3.2) with arguments dateTimeFormat and x.
    return FormatDateTime(dateTimeFormat, x);
};

/**
 * When the toLocaleDateString method is called with optional arguments locales and
 * options, the following steps are taken:
 */
/* 13.3.2 */ls.Date.toLocaleDateString = function () {
    // Satisfy test 13.3.0_1
    if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');

    // 1. Let x be this time value (as defined in ES5, 15.9.5).
    var x = +this;

    // 2. If x is NaN, then return "Invalid Date".
    if (isNaN(x)) return 'Invalid Date';

    // 3. If locales is not provided, then let locales be undefined.
    var locales = arguments[0],


    // 4. If options is not provided, then let options be undefined.
    options = arguments[1];

    // 5. Let options be the result of calling the ToDateTimeOptions abstract
    //    operation (defined in 12.1.1) with arguments options, "date", and "date".
    options = ToDateTimeOptions(options, 'date', 'date');

    // 6. Let dateTimeFormat be the result of creating a new object as if by the
    //    expression new Intl.DateTimeFormat(locales, options) where
    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
    var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

    // 7. Return the result of calling the FormatDateTime abstract operation (defined
    //    in 12.3.2) with arguments dateTimeFormat and x.
    return FormatDateTime(dateTimeFormat, x);
};

/**
 * When the toLocaleTimeString method is called with optional arguments locales and
 * options, the following steps are taken:
 */
/* 13.3.3 */ls.Date.toLocaleTimeString = function () {
    // Satisfy test 13.3.0_1
    if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');

    // 1. Let x be this time value (as defined in ES5, 15.9.5).
    var x = +this;

    // 2. If x is NaN, then return "Invalid Date".
    if (isNaN(x)) return 'Invalid Date';

    // 3. If locales is not provided, then let locales be undefined.
    var locales = arguments[0];

    // 4. If options is not provided, then let options be undefined.
    var options = arguments[1];

    // 5. Let options be the result of calling the ToDateTimeOptions abstract
    //    operation (defined in 12.1.1) with arguments options, "time", and "time".
    options = ToDateTimeOptions(options, 'time', 'time');

    // 6. Let dateTimeFormat be the result of creating a new object as if by the
    //    expression new Intl.DateTimeFormat(locales, options) where
    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
    var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

    // 7. Return the result of calling the FormatDateTime abstract operation (defined
    //    in 12.3.2) with arguments dateTimeFormat and x.
    return FormatDateTime(dateTimeFormat, x);
};

defineProperty(Intl, '__applyLocaleSensitivePrototypes', {
    writable: true,
    configurable: true,
    value: function value() {
        defineProperty(Number.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Number.toLocaleString });
        // Need this here for IE 8, to avoid the _DontEnum_ bug
        defineProperty(Date.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Date.toLocaleString });

        for (var k in ls.Date) {
            if (hop.call(ls.Date, k)) defineProperty(Date.prototype, k, { writable: true, configurable: true, value: ls.Date[k] });
        }
    }
});

/**
 * Can't really ship a single script with data for hundreds of locales, so we provide
 * this __addLocaleData method as a means for the developer to add the data on an
 * as-needed basis
 */
defineProperty(Intl, '__addLocaleData', {
    value: function value(data) {
        if (!IsStructurallyValidLanguageTag(data.locale)) throw new Error("Object passed doesn't identify itself with a valid language tag");

        addLocaleData(data, data.locale);
    }
});

function addLocaleData(data, tag) {
    // Both NumberFormat and DateTimeFormat require number data, so throw if it isn't present
    if (!data.number) throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");

    var locale = void 0,
        locales = [tag],
        parts = tag.split('-');

    // Create fallbacks for locale data with scripts, e.g. Latn, Hans, Vaii, etc
    if (parts.length > 2 && parts[1].length === 4) arrPush.call(locales, parts[0] + '-' + parts[2]);

    while (locale = arrShift.call(locales)) {
        // Add to NumberFormat internal properties as per 11.2.3
        arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
        internals.NumberFormat['[[localeData]]'][locale] = data.number;

        // ...and DateTimeFormat internal properties as per 12.2.3
        if (data.date) {
            data.date.nu = data.number.nu;
            arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
            internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
        }
    }

    // If this is the first set of locale data added, make it the default
    if (defaultLocale === undefined) setDefaultLocale(tag);
}

defineProperty(Intl, '__disableRegExpRestore', {
    value: function value() {
        internals.disableRegExpRestore = true;
    }
});

module.exports = Intl;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(1);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
module.exports = __webpack_require__(24);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  index/src/lib/adapter.js, hVrN, ?????????????????? upload error:  */
    hVrN: "Image upload failed. Upload error:",
    /*  index/src/lib/adapter.js, EekB, ??????????????????????????????????????????  */
    EekB: "Network disconnected. Failed to upload image.",
    /*  index/src/lib/adapter.js, PlFY, ?????????????????? file reader error:  */
    PlFY: "Image upload failed. File reader error:",
    /*  index/src/lib/adapter.js, yzKq, ??????????????????  */
    yzKq: "Failed to read image",
    /*  index/src/word/wordPage.js, ciBt, ??????  */
    ciBt: "Doc",
    /*  index/src/word/wordPage.js, zfUX, ???????????? ?? ?????????  */
    zfUX: "WeChat Work \xB7 WeDoc",
    /*  index/src/word/wordPage.js, LUJB, ??????????????????2000???????????????  */
    LUJB: "\u7248\u672C\u5DEE\u8DDD\u5C0F\u4E8E2000\uFF0C\u76F4\u63A5\u8865\u62C9",
    /*  index/src/word/wordPage.js, Sbrw, ??????????????????  */
    Sbrw: "Choose to continue waiting",
    /*  index/src/word/wordPage.js, IeNg, ????????????????????????  */
    IeNg: "Choose to clear offline data",
    /*  index/src/word/wordPage.js, dRty, ????????????  */
    dRty: "Wait for sync",
    /*  index/src/word/wordPage.js, vfby, ??????????????????  */
    vfby: "Clear offline data",
    /*  index/src/word/wordPage.js, zvyS, ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    zvyS: "The offline data differs greatly from updates. Synchronization may take a long time. You can choose to clear offline data.",
    /*  index/src/word/wordPage.js, fOqV, ??????  */
    fOqV: "Note",
    /*  index/src/word/wordPage.js, hZBY, ??????????????????2000  */
    hZBY: "\u7248\u672C\u5DEE\u8DDD\u5927\u4E8E2000",
    /*  index/src/word/wordPage.js, nWGq, ???????????????????????????{0}  */
    nWGq: "Failed to sync updates, {0}",
    /*  index/src/word/wordPage.js, DweB, ????????????????????????  */
    DweB: "Offline version updated",
    /*  index/src/word/wordPage.js, ExTb, ????????????????????????...  */
    ExTb: "Synchronizing updates...",
    /*  index/src/word/wordPage.js, vWYB, ??????????????? {0}  */
    vWYB: "Recently saved in {0}",
    /*  index/src/word/wordPage.js, lUtO, ????????????  */
    lUtO: "Saved",
    /*  index/src/word/wordPage.js, weWv, ??????????????????! {0}  */
    weWv: "Failed to get the header! {0}",
    /*  index/src/word/wordPage.js, xUpu, ????????????????????????????????????
    ????????????????????????  */
    xUpu: "External sharing of this file is disabled.\nView it in WeChat Work.",
    /*  index/src/word/wordPage.js, nMJx, ??????????????????  */
    nMJx: "Failed to open the file",
    /*  index/src/word/wordPage.js, Lqpw, ??????????????????  */
    Lqpw: "The number of visitors exceeds the limit.",
    /*  index/src/word/wordPage.js, VqDp, ???????????????????????????  */
    VqDp: "The file has been deleted by the creator.",
    /*  index/src/word/wordPage.js, Aegf, ?????????????????????  */
    Aegf: "You have no permission to view",
    /*  index/src/word/wordPage.js, SzCU, ?????????????????????  */
    SzCU: "Access time expired",
    /*  index/src/word/wordPage.js, mHlc, ??????????????????{0}??????{1}  */
    mHlc: "Update data from {0} to {1}",
    /*  index/src/word/wordPage.js, AHrv, ????????????????????????????????????  */
    AHrv: "Identity status expired. Open again.",
    /*  index/src/word/wordPage.js, fjmc, ??????  */
    fjmc: "Refresh",
    /*  index/src/word/wordPage.js, RFoX, ??????????????????  */
    RFoX: "File has been deleted.",
    /*  index/src/word/wordPage.js, OmVc, ????????????????????????  */
    OmVc: "File permission has changed.",
    /*  index/src/word/wordPage.js, Xcrq, ??????????????????????????????????????????????????????  */
    Xcrq: "Skip in other cases (older than the current version)",
    /*  index/src/word/wordPage.js, CVFJ, ?????????????????????????????????????????????????????????????????????  */
    CVFJ: "This is the same as the current version and is deduplicated because of the previous order.",
    /*  index/src/word/wordPage.js, LFvR, ??????????????????  */
    LFvR: "Handling missing version",
    /*  index/src/word/wordPage.js, YfVy, ????????????????????????commit???newchange  */
    YfVy: "\u670D\u52A1\u7AEF\u4E0B\u53D1\u4E86\u81EA\u5DF1commit\u7684newchange",
    /*  index/src/word/wordPage.js, NEuK, ????????????????????????commit???accept  */
    NEuK: "\u670D\u52A1\u7AEF\u4E0B\u53D1\u4E86\u522B\u4EBAcommit\u7684accept",
    /*  index/src/word/wordPage.js, OyjG, ??????????????????????????????  */
    OyjG: "Unable to save edits",
    /*  index/src/word/wordPage.js, mecu, ????????????????????????{0}???{1}  */
    mecu: "Version is updated from {0} to {1}.",
    /*  index/src/word/wordPage.js, RWSz, ??????commit:{0}, msg: {1}  */
    RWSz: "Send commit:{0}, msg: {1}",
    /*  index/src/word/wordPage.js, syqC, pause by no write Auth ??????commit:{0}, msg: {1}  */
    syqC: "pause by no write Auth Send commit:{0}, msg: {1}",
    /*  index/src/word/wordPage.js, sIbO, ?????????????????? error:  */
    sIbO: "Image insertion failed. Error:",
    /*  index/src/word/wordPage.js, exdg, ?????????...  */
    exdg: "Saving...",
    /*  index/src/word/wordPage.js, bwWY, ??????????????????????????????  */
    bwWY: "Operation failed. Try again later.",
    /*  index/src/word/wordPage.js, xLdc, cgi?????????????????????{0} {1}  */
    xLdc: "Request error. {0} {1}",
    /*  index/src/word/wordPage.js, seuC, cgi?????????????????????{0} {1}  */
    seuC: "Request busy. {0} {1}",
    /*  index/src/word/wordPage.js, rFpf, ????????????????????????,{0}  */
    rFpf: "Failed to get offline data, {0}",
    /*   , HohO, ????????????????????????????????????\n????????????????????????  */
    HohO: "External sharing of this file is disabled.\nView it in WeChat Work."
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  melo/packages/util/src/image_util.ts, Vjvr, ??????????????????????????????????????????????????????Ctrl+V???????????????????????????  */
    Vjvr: "Failed to paste image Copy the original image and press Ctrl+V, or import the doc.",
    /*  melo/packages/util/src/image_util.ts, wsoU, ??????????????????????????????????????????????????????Cmd+V???????????????????????????  */
    wsoU: "Failed to paste image Copy the original image and press Cmd+V, or import the doc.",
    /*  melo/packages/util/src/string_util.ts, SXWq, ???  */
    SXWq: "\u9F98",
    /*  melo/packages/util/src/word_helper.ts, ZgWl, ???  */
    ZgWl: "Large",
    /*  melo/packages/util/src/word_helper.ts, wuIv, ???????????????????????????????????????????????????????????????????  */
    wuIv: "\xB7\xD7\uFF0D\u2018\u2019\u201C\u201D\u2026\u3001\u3002\u300A\u300B\u3010\u3011\uFF5B\uFF5D\uFF01\uFF08\uFF09\uFF0C\uFF1A\uFF1B\uFF1F",
    /*  melo/packages/util/src/word_helper.ts, gGUE, })]>?????????%!]|,.:;  */
    gGUE: "})]>\uFF09\u3011\uFF5D%!]|,.:;",
    /*  melo/packages/util/src/word_helper.ts, Qtxf, ?????????  */
    Qtxf: "\uFF08\u3010\uFF5B",
    /*  melo/packages/util/src/word_helper.ts, kuKc, -????  */
    kuKc: "-?\u2014",
    /*  melo/packages/util/src/word_helper.ts, SGmq, ???????????????????????????????????????  */
    SGmq: "\u3002\uFF0C\uFF1A\uFF1B\u201D\u2019\uFF1F\u300B\u3001\u3011\uFF09\uFF5D\u2026",
    /*  melo/packages/util/src/word_helper.ts, UgRx, })%!]|,./:;"'??????  */
    UgRx: "})%!]|,./:;\"'\u2032\u2033",
    /*  melo/packages/util/src/word_helper.ts, mvCP, {([???????????????  */
    mvCP: "{([\uFF08\u3010\uFF5B\u201C\u2018",
    /*  melo/packages/collab/src/atext_input/compatible_old_cs.ts, BICc, PAGE \@ "???$P???" \* TDW-CHINESE  */
    BICc: "PAGE @ \"\u7B2C$P\u9875\" * TDW-CHINESE",
    /*  melo/packages/collab/src/atext_input/compatible_old_cs.ts, JPed, ???PAGE \* TDW-CHINESE???  */
    JPed: "\u7B2C",
    /*  melo/packages/collab/src/collab/changeset_manager.ts, YUwp, ???????????????????????????, currentPos:{0}  */
    YUwp: "Substream added to a wrong position. currentPos:{0}",
    /*  melo/packages/collab/src/collab/changeset_manager.ts, Wryt, ????????????????????????????????????  */
    Wryt: "The section break at the end of the content cannot be deleted.",
    /*  melo/packages/collab/src/collab/changeset_manager.ts, xvzr, ???????????????????????????  */
    xvzr: "Content end mark cannot be deleted.",
    /*  melo/packages/collab/src/easysync/changeset_inverse.ts, bdrg, Changeset.inverse error,index out of bounds???cs({0}),curLine({1})  */
    bdrg: "Changeset.inverse error,index out of bounds\uFF01cs({0}),curLine({1})",
    /*  melo/packages/collab/src/table/table_manager.ts, ciBt, ??????  */
    ciBt: "Doc",
    /*  melo/packages/collab/src/table/table_manager.ts, XAeE, ????????????  */
    XAeE: "Doc/Sheet",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, dHiA, ??????  */
    dHiA: "Content",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, XfMC, ?????????  */
    XfMC: "Subheading",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, gjHS, ?????????  */
    gjHS: "Heading",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, pGbr, ?????????  */
    pGbr: "Headline",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, KxNi, ??????  */
    KxNi: "Note",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, mgHn, ?????????  */
    mgHn: "Subtitle",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, oxDk, ??????  */
    oxDk: "Title",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, Ypum, ?????? 9  */
    Ypum: "Title 9",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, uzXx, ?????? 8  */
    uzXx: "Title 8",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, hqyi, ?????? 7  */
    hqyi: "Title 7",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, roHX, ?????? 6  */
    roHX: "Title 6",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, QsCP, ?????? 5  */
    QsCP: "Title 5",
    /*  melo/packages/model/src/defines/builtin_style_sheet.ts, foex, ?????? 4  */
    foex: "Title 4",
    /*  melo/packages/model/src/defines/defaults.ts, KJtY, ????????????  */
    KJtY: "Microsoft YaHei",
    /*  melo/packages/model/src/list_model/list_info.ts, WeHa, ???%1???  */
    WeHa: "\uFF08%1\uFF09",
    /*  melo/packages/model/src/list_model/list_info.ts, EegC, %1???  */
    EegC: "%1\u3001",
    /*  melo/packages/model/src/list_model/list_utils.ts, gMvC, ???  */
    gMvC: "\u25CF",
    /*  melo/packages/model/src/list_model/list_utils.ts, JBwT, ???  */
    JBwT: "\u25CB",
    /*  melo/packages/model/src/list_model/list_utils.ts, vKGd, ???  */
    vKGd: "\xA1",
    /*  melo/packages/model/src/list_model/list_utils.ts, VdZT, ???  */
    VdZT: "\u2727",
    /*  melo/packages/model/src/list_model/list_utils.ts, pVIi, ???  */
    pVIi: "\xB2",
    /*  melo/packages/model/src/list_model/list_utils.ts, fgAe, ???  */
    fgAe: "\u27A2",
    /*  melo/packages/model/src/list_model/list_utils.ts, nfoF, ???  */
    nfoF: "\xD8",
    /*  melo/packages/model/src/list_model/list_utils.ts, VQSe, ???  */
    VQSe: "\u2713",
    /*  melo/packages/model/src/list_model/list_utils.ts, wzGZ, ???  */
    wzGZ: "\xFC",
    /*  melo/packages/model/src/list_model/list_utils.ts, pkSC, ???  */
    pkSC: "\u25C6",
    /*  melo/packages/model/src/list_model/list_utils.ts, cHIS, ???  */
    cHIS: "u",
    /*  melo/packages/model/src/list_model/list_utils.ts, zQyu, ???  */
    zQyu: "\u25A0",
    /*  melo/packages/model/src/list_model/list_utils.ts, tqvJ, ???  */
    tqvJ: "n",
    /*  melo/packages/model/src/list_model/list_utils.ts, rZqG, ???  */
    rZqG: "l",
    /*  melo/packages/model/src/list_model/list_utils.ts, CrQu, ???  */
    CrQu: "1,000",
    /*  melo/packages/model/src/list_model/list_utils.ts, gWnw, ???  */
    gWnw: "100",
    /*  melo/packages/model/src/list_model/list_utils.ts, YHAl, ???  */
    YHAl: "10",
    /*  melo/packages/model/src/list_model/list_utils.ts, eYTB, ??????  */
    eYTB: "0,000 trillion",
    /*  melo/packages/model/src/list_model/list_utils.ts, KCuv, ??????  */
    KCuv: "trillion",
    /*  melo/packages/model/src/list_model/list_utils.ts, nqvT, ???  */
    nqvT: "hundred million",
    /*  melo/packages/model/src/list_model/list_utils.ts, avOk, ???  */
    avOk: "ten thousand",
    /*  melo/packages/model/src/list_model/list_utils.ts, RQOK, ???  */
    RQOK: "9",
    /*  melo/packages/model/src/list_model/list_utils.ts, GpMz, ???  */
    GpMz: "8",
    /*  melo/packages/model/src/list_model/list_utils.ts, netS, ???  */
    netS: "7",
    /*  melo/packages/model/src/list_model/list_utils.ts, qWRF, ???  */
    qWRF: "6",
    /*  melo/packages/model/src/list_model/list_utils.ts, ltgJ, ???  */
    ltgJ: "5",
    /*  melo/packages/model/src/list_model/list_utils.ts, desc, ???  */
    desc: "4",
    /*  melo/packages/model/src/list_model/list_utils.ts, FHvt, ???  */
    FHvt: "3",
    /*  melo/packages/model/src/list_model/list_utils.ts, eagS, ???  */
    eagS: "2",
    /*  melo/packages/model/src/list_model/list_utils.ts, mNiF, ???  */
    mNiF: "1",
    /*  melo/packages/model/src/list_model/list_utils.ts, nkDK, ???  */
    nkDK: "0",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, xJYw, ???  */
    xJYw: "\u300B",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, SowJ, ???  */
    SowJ: "\u201D",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, WHFG, ???  */
    WHFG: "\u2019",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, zedC, ???  */
    zedC: "\u300F",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, YLun, ???  */
    YLun: "\u300D",
    /*  melo/packages/surface/src/auto_complete/auto_complete.ts, kszn, ???  */
    kszn: "\uFF09",
    /*  melo/packages/surface/src/components/hidden_editor_mobile.tsx, iPQC, ???  */
    iPQC: "",
    /*   , pwzG, ???  */
    pwzG: "\uE901",
    /*   , uYQn, ???  */
    uYQn: "\uE900"
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  melo-features/src/base/client_vars.ts, XHjl, ????????????????  */
    XHjl: "\u039B\u03B5\u03C9\u03BD\u03AF\u03B4\u03B1\u03C2",
    /*  melo-features/src/base/client_vars.ts, RoDQ, ????????????-ziofat  */
    RoDQ: "\u817E\u8BAF\u6587\u6863-ziofat",
    /*  melo-features/src/base/client_vars.ts, fiqH, ?????????  */
    fiqH: "Luo Wenxing",
    /*  melo-features/src/base/client_vars.ts, ZExF, ?????????5  */
    ZExF: "\u6D4B\u8BD5\u53F75",
    /*  melo-features/src/base/client_vars.ts, JcGw, ?????????????????????  */
    JcGw: "Test Document for WeChat Work App",
    /*  melo-features/src/base/error_monitor/base_raven_handler.ts, OyjG, ??????????????????????????????  */
    OyjG: "Unable to save edits",
    /*  melo-features/src/base/permission/permission.ts, zTLe, ????????????????????????????????????????????????{0}  */
    zTLe: "Your permission for this doc has changed. Current {0}",
    /*  melo-features/src/base/permission/permission.ts, GpWb, ????????????  */
    GpWb: "Cannot view",
    /*  melo-features/src/base/permission/permission.ts, KDjx, ?????????  */
    KDjx: "Allow view",
    /*  melo-features/src/base/permission/permission.ts, nRkv, ?????????  */
    nRkv: "Allow edit",
    /*  melo-features/src/base/permission/permission.ts, CqQx, ???????????????????????????????????????  */
    CqQx: "Your permission for this doc has changed",
    /*  melo-features/src/base/permission/permission.ts, sDfI, ????????????  */
    sDfI: "Click to refresh",
    /*  melo-features/src/features/app_guide/bottom_exposure_component.tsx, glkE, ??????APP  */
    glkE: "Download app",
    /*  melo-features/src/features/app_guide/bottom_exposure_component.tsx, yTpH, ?????????????????????????????????/??????/?????????  */
    yTpH: "Free online collaborative docs/sheets/PPTs",
    /*  melo-features/src/features/attachment/configs.tsx, MnLB, ???+???  */
    MnLB: "\u2318+\u21B5",
    /*  melo-features/src/features/attachment/configs.tsx, voAt, Ctrl+???  */
    voAt: "Ctrl+\u21B5",
    /*  melo-features/src/features/attachment/configs.tsx, lmcE, icon/toolbar/?????????  */
    lmcE: "icon/toolbar/\u5206\u9875\u7B26",
    /*  melo-features/src/features/attachment/configs.tsx, witx, ?????????  */
    witx: "Page break",
    /*  melo-features/src/features/attachment/configs.tsx, WHVw, icon/toolbar/????????????  */
    WHVw: "icon/toolbar/\u8FB9\u6846\u6837\u5F0F",
    /*  melo-features/src/features/attachment/configs.tsx, KQrV, ?????????  */
    KQrV: "Divider",
    /*  melo-features/src/features/attachment/configs.tsx, VmIW, ```+??????  */
    VmIW: "```+space",
    /*  melo-features/src/features/attachment/configs.tsx, HigK, icon/toolbar/?????????  */
    HigK: "icon/toolbar/\u4EE3\u7801\u5757",
    /*  melo-features/src/features/attachment/configs.tsx, Sauq, ?????????  */
    Sauq: "Code block",
    /*  melo-features/src/features/attachment/configs.tsx, lmiv, ???+K  */
    lmiv: "\u2318+K",
    /*  melo-features/src/features/attachment/configs.tsx, oAfQ, ?????????  */
    oAfQ: "Hyperlink",
    /*  melo-features/src/features/attachment/configs.tsx, bMps, ??????  */
    bMps: "Sheet",
    /*  melo-features/src/features/attachment/configs.tsx, AoHl, ????????????  */
    AoHl: "Upload images",
    /*  melo-features/src/features/attachment/configs.tsx, zHQs, ????????????????????????  */
    zHQs: "Insert charts or hyperlinks",
    /*  melo-features/src/features/attachment/configs.tsx, cLzp, ??????  */
    cLzp: "Insert",
    /*  melo-features/src/features/attachment/configs.tsx, GiIj, ??????  */
    GiIj: "Attachment",
    /*  melo-features/src/features/audio/audio_handler.tsx, Heyw, ???????????????  */
    Heyw: "Recording",
    /*  melo-features/src/features/audio/configs.tsx, ZdWU, ??????  */
    ZdWU: "Recording",
    /*  melo-features/src/features/audio/configs.tsx, QpbM, ????????????  */
    QpbM: "Insert recording",
    /*  melo-features/src/features/comment/comment_handler.ts, WikC, ??????????????????  */
    WikC: "Comment deleted",
    /*  melo-features/src/features/comment/comment_panel_header.tsx, YOWv, ?????????({0})  */
    YOWv: "Total comments ({0})",
    /*  melo-features/src/features/comment/configs.tsx, fWXB, ????????????  */
    fWXB: "Add comments",
    /*  melo-features/src/features/comment/configs.tsx, ytxf, ??????  */
    ytxf: "Comments",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, trXS, ????????????  */
    trXS: "How to work on it",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, Gslb, ????????????  */
    Gslb: "Learn More",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, MoPv, ??????  */
    MoPv: "Feedback",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, fjmc, ??????  */
    fjmc: "Refresh",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, fOqV, ??????  */
    fOqV: "Note",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, pEWS, ????????????  */
    pEWS: "Got it",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, viLg, ????????????  */
    viLg: "Start",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, gwVQ, ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    gwVQ: "Local cache will be cleared during fixing. Please backup to a local file before fixing.",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, CKJV, ??????  */
    CKJV: "Fix",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, ueEn, ?????????:{0}  {1}  */
    ueEn: "Error code: {0}  {1}",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, BfNM, ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    BfNM: "File deleted by the creator. Unable to upload. Content copied to clipboard. Copy it to a local file or export the file for backup and click \"Refresh\".",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, Mtqg, ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    Mtqg: "File deleted by the creator. Unable to upload. Content copied to clipboard. Copy it to a local file for backup and click \"Refresh\".",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, MseX, ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    MseX: "Edit permission revoked. Unable to upload. Content copied to clipboard. Copy it to a local file or export the file for backup and click \"Refresh\".",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, BUyk, ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    BUyk: "Edit permission revoked. Unable to upload. Content copied to clipboard. Copy it to a local file for backup and click \"Refresh\".",
    /*  melo-features/src/features/core_edit/block_user_edit_modal.tsx, eTXE, 1. ?????????????????????????????????????????????????????????????????????
            2. ?????????????????????????????????  */
    eTXE: "1. Full text copied to clipboard. Copy it to a local file for backup. \n        2. After backing up, click \"Repair\" below.",
    /*  melo-features/src/features/core_edit/configs.tsx, zXDQ, ???+Y  */
    zXDQ: "\u2318+Y",
    /*  melo-features/src/features/core_edit/configs.tsx, bYxG, ??????  */
    bYxG: "Redo",
    /*  melo-features/src/features/core_edit/configs.tsx, CALR, ???+Z  */
    CALR: "\u2318+Z",
    /*  melo-features/src/features/core_edit/configs.tsx, fkgy, ??????  */
    fkgy: "Cancel",
    /*  melo-features/src/features/core_edit/configs.tsx, ovMk, ??????  */
    ovMk: "Delete",
    /*  melo-features/src/features/core_edit/configs.tsx, VfzX, ??????  */
    VfzX: "Paste",
    /*  melo-features/src/features/core_edit/configs.tsx, Chfy, ??????  */
    Chfy: "Copy",
    /*  melo-features/src/features/core_edit/configs.tsx, xRep, ??????  */
    xRep: "Cut",
    /*  melo-features/src/features/core_edit/configs.tsx, FrRx, ??????  */
    FrRx: "Select All",
    /*  melo-features/src/features/core_edit/configs.tsx, KrTq, ??????  */
    KrTq: "Select",
    /*  melo-features/src/features/core_edit/configs.tsx, kDCy, ????????? {0}+V ??????  */
    kDCy: "Only pasting with {0}+V is supported.",
    /*  melo-features/src/features/core_edit/configs.tsx, xZyg, ???  */
    xZyg: "\u2318",
    /*  melo-features/src/features/core_edit/configs.tsx, WJNL, ???+V  */
    WJNL: "\u2318+V",
    /*  melo-features/src/features/core_edit/configs.tsx, kwuM, ???+C  */
    kwuM: "\u2318+C",
    /*  melo-features/src/features/core_edit/configs.tsx, WEJS, ???+X  */
    WEJS: "\u2318+X",
    /*  melo-features/src/features/core_edit/configs.tsx, KiGX, ???+A  */
    KiGX: "\u2318+A",
    /*  melo-features/src/features/doc_view/configs.tsx, PfTd, ???+P  */
    PfTd: "\u2318+P",
    /*  melo-features/src/features/doc_view/configs.tsx, vxFJ, ??????  */
    vxFJ: "Print",
    /*  melo-features/src/features/doc_view/configs.tsx, dEnh, ???+???+F  */
    dEnh: "\u2303+\u2318+F",
    /*  melo-features/src/features/doc_view/configs.tsx, cITD, ????????????  */
    cITD: "Full screen mode",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, fLhX, ?????????  */
    fLhX: "Make a suggestion",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, GodH, ????????????  */
    GodH: "Help Center",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, SxNo, ???????????????  */
    SxNo: "Follow Official Account",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, agbI, ??????????????????  */
    agbI: "About Tencent Docs",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, GEMC, ???????????????  */
    GEMC: "Help & Feedback",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, NKRL, ???????????????{0}  */
    NKRL: "Help & Feedback {0}",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, jVKk, ?????????  */
    jVKk: "Rename",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, Xflk, ?????????: {0}     ??? {1} ???  */
    Xflk: "Creator: {0} of {1} word(s)",
    /*  melo-features/src/features/doc_view_mobile/configs.tsx, oHJO, ??????  */
    oHJO: "Read only",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, iMHr, ??????  */
    iMHr: "Back",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, PSiW, ??????  */
    PSiW: "Done",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, rJQi, ????????????????????????  */
    rJQi: "Doc name cannot be empty.",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, ZxYD, ?????????????????????30?????????  */
    ZxYD: "Doc name cannot exceed 30 characters.",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, OUYT, ??????????????????????????????????????????
    \ / : * ? " < > |  */
    OUYT: "File name cannot contain: \n, /, :, *, ?, \", <, >, or |",
    /*  melo-features/src/features/doc_view_mobile/doc_view_mobile_handler.ts, Jkcq, ??????????????????  */
    Jkcq: "Enter the file name",
    /*  melo-features/src/features/emotion/configs.tsx, MEsm, ??????  */
    MEsm: "Sticker",
    /*  melo-features/src/features/emotion/configs.tsx, Dwvx, ????????????  */
    Dwvx: "Insert sticker",
    /*  melo-features/src/features/fieldcode/fieldcode_decorator.tsx, OUeD, ?????????  */
    OUeD: "Update domain",
    /*  melo-features/src/features/fieldcode_date/date_field_processor.ts, hfbg, yyyy???MM???dd???  */
    hfbg: "MM/dd/yyyy",
    /*  melo-features/src/features/fieldcode_mention_wxwork/configs.tsx, bKFq, ??????  */
    bKFq: "@",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, QaGk, ????????? 0 ????????????  */
    QaGk: "Pages are numbered from 0.",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, ZQIu, ????????? 1 ????????????  */
    ZQIu: "Pages are numbered from 1.",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, VhgL, ??????  */
    VhgL: "Page number",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, qUhn, ????????????  */
    qUhn: "In footer",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, hwrS, ????????????  */
    hwrS: "In header",
    /*  melo-features/src/features/fieldcode_page/configs.tsx, AxwU, ????????????  */
    AxwU: "Current location",
    /*  melo-features/src/features/fieldcode_page/numpages_field_processor.ts, Bkhu, ????????????{0}  */
    Bkhu: "Total pages: {0}",
    /*  melo-features/src/features/fieldcode_page/page_field_processor.ts, pCRN, ???{0}???  */
    pCRN: "Page {0}",
    /*  melo-features/src/features/fieldcode_page/page_field_processor.ts, heIJ, ???$P???  */
    heIJ: "Page $P",
    /*  melo-features/src/features/fieldcode_page/page_field_processor.ts, BICc, PAGE \@ "???$P???" \* TDW-CHINESE  */
    BICc: "PAGE @ \"Page $P\" * TDW-CHINESE",
    /*  melo-features/src/features/fieldcode_page/utils.ts, WAsy, ???  */
    WAsy: "\u8D1F",
    /*  melo-features/src/features/fieldcode_page/utils.ts, zBZD, ???  */
    zBZD: "\u5793",
    /*  melo-features/src/features/fieldcode_page/utils.ts, CrQu, ???  */
    CrQu: "1,000",
    /*  melo-features/src/features/fieldcode_page/utils.ts, gWnw, ???  */
    gWnw: "100",
    /*  melo-features/src/features/fieldcode_page/utils.ts, YHAl, ???  */
    YHAl: "10",
    /*  melo-features/src/features/fieldcode_page/utils.ts, tEoQ, ???  */
    tEoQ: "\u4EAC",
    /*  melo-features/src/features/fieldcode_page/utils.ts, SQrM, ???  */
    SQrM: "\u5146",
    /*  melo-features/src/features/fieldcode_page/utils.ts, nqvT, ???  */
    nqvT: "hundred million",
    /*  melo-features/src/features/fieldcode_page/utils.ts, avOk, ???  */
    avOk: "ten thousand",
    /*  melo-features/src/features/fieldcode_page/utils.ts, RQOK, ???  */
    RQOK: "9",
    /*  melo-features/src/features/fieldcode_page/utils.ts, GpMz, ???  */
    GpMz: "8",
    /*  melo-features/src/features/fieldcode_page/utils.ts, netS, ???  */
    netS: "7",
    /*  melo-features/src/features/fieldcode_page/utils.ts, qWRF, ???  */
    qWRF: "6",
    /*  melo-features/src/features/fieldcode_page/utils.ts, ltgJ, ???  */
    ltgJ: "5",
    /*  melo-features/src/features/fieldcode_page/utils.ts, desc, ???  */
    desc: "4",
    /*  melo-features/src/features/fieldcode_page/utils.ts, FHvt, ???  */
    FHvt: "3",
    /*  melo-features/src/features/fieldcode_page/utils.ts, eagS, ???  */
    eagS: "2",
    /*  melo-features/src/features/fieldcode_page/utils.ts, mNiF, ???  */
    mNiF: "1",
    /*  melo-features/src/features/fieldcode_page/utils.ts, gIUE, ???  */
    gIUE: "\u3007",
    /*  melo-features/src/features/file/configs.tsx, jUkX, ????????? Word  */
    jUkX: "Export to Word",
    /*  melo-features/src/features/file/configs.tsx, lyfG, ????????????  */
    lyfG: "Generate copy",
    /*  melo-features/src/features/file/configs.tsx, yGWD, ??????Word??????(.docx)  */
    yGWD: "Local Word document (.docx)",
    /*  melo-features/src/features/file/configs.tsx, zfcI, ?????????  */
    zfcI: "Export as",
    /*  melo-features/src/features/file/configs.tsx, XeqF, ??????????????????  */
    XeqF: "Import local file",
    /*  melo-features/src/features/file/configs.tsx, ouMO, ???????????????  */
    ouMO: "New folder",
    /*  melo-features/src/features/file/configs.tsx, SAyR, ???????????????  */
    SAyR: "Online collection forms",
    /*  melo-features/src/features/file/configs.tsx, lquI, ???????????????  */
    lquI: "Online PPTs",
    /*  melo-features/src/features/file/configs.tsx, DOWT, ????????????  */
    DOWT: "Online forms",
    /*  melo-features/src/features/file/configs.tsx, bqgX, ????????????  */
    bqgX: "Online docs",
    /*  melo-features/src/features/file/configs.tsx, RSbt, ??????  */
    RSbt: "New",
    /*  melo-features/src/features/file/configs.tsx, HBuF, ?????????????????????  */
    HBuF: "Save as my template",
    /*  melo-features/src/features/file/configs.tsx, lKeW, ?????????????????????  */
    lKeW: "Transfer file ownership",
    /*  melo-features/src/features/file/configs.tsx, QMtq, ??????  */
    QMtq: "Report",
    /*  melo-features/src/features/file/configs.tsx, JbDp, ????????????????????????  */
    JbDp: "Generate local shortcut",
    /*  melo-features/src/features/file/file_handler.tsx, HoFM, ????????????  */
    HoFM: "Feedback",
    /*  melo-features/src/features/file/file_handler.tsx, bRpC, ??????  */
    bRpC: "OK",
    /*  melo-features/src/features/file/file_handler.tsx, fIRO, ????????????????????????????????????  */
    fIRO: "Export failed. Try again later.",
    /*  melo-features/src/features/file/file_handler.tsx, eqvT, ???????????????????????? doc/docx/xls/xlsx/ppt/pptx/txt/csv ??????????????????  */
    eqvT: "Import failed. Only .doc/.docx/.xls/.xlsx/.ppt/.pptx/.txt/.csv files are supported.",
    /*  melo-features/src/features/file/file_handler.tsx, boMO, ?????????????????????????????????{0}MB???  */
    boMO: "Import failed. File size exceeds {0} MB.",
    /*  melo-features/src/features/file/file_handler.tsx, bLef, ???????????????????????????????????????  */
    bLef: "Import failed. You cannot import empty files.",
    /*  melo-features/src/features/file/file_handler.tsx, KItJ, ????????????????????????...  */
    KItJ: "Downloading. Please wait...",
    /*  melo-features/src/features/file/file_handler.tsx, yKht, ????????????????????????  */
    yKht: "Copy generated and opened",
    /*  melo-features/src/features/file/file_handler.tsx, xFjh, ???????????????????????????????????????  */
    xFjh: "Failed to generate copy. Try again later.",
    /*  melo-features/src/features/file/file_handler.tsx, HLxV, ??????-{0}  */
    HLxV: "Copy-{0}",
    /*  melo-features/src/features/file/file_handler.tsx, dSrH, ???????????????????????????...  */
    dSrH: "Generating copy...",
    /*  melo-features/src/features/file/file_handler.tsx, iCcT, ??????????????????...  */
    iCcT: "Generating copy...",
    /*  melo-features/src/features/file/file_service.ts, nTbP, ?????????????????????????????????  */
    nTbP: "Request failed. Try again later.",
    /*  melo-features/src/features/file/file_service.ts, Pzud, ?????????????????????????????????  */
    Pzud: "Network exception. Unable to save as template.",
    /*  melo-features/src/features/file/file_service.ts, HFvh, ?????????????????????????????????????????????  */
    HFvh: "No permission to access file. Unable to save as template.",
    /*  melo-features/src/features/file/file_service.ts, OCiT, ???????????????????????????????????????  */
    OCiT: "Max. template count reached. Unable to save as template.",
    /*  melo-features/src/features/file/file_service.ts, KuTo, ????????????100KB??????????????????????????????  */
    KuTo: "File is larger than 100 KB. Unable to save as template.",
    /*  melo-features/src/features/file/save_as_template.tsx, rFUg, ??????  */
    rFUg: "View",
    /*  melo-features/src/features/file/save_as_template.tsx, Bbyx, ????????????????????????[??????-????????????]??????  */
    Bbyx: "Template saved in \"New\" -> \"My Templates\".",
    /*  melo-features/src/features/file/save_as_template.tsx, WReF, ??????  */
    WReF: "Cancel",
    /*  melo-features/src/features/file/save_as_template.tsx, pLeb, ??????????????????  */
    pLeb: "Invalid template name",
    /*  melo-features/src/features/font/configs.tsx, CWoG, ????????????  */
    CWoG: "Clear formatting",
    /*  melo-features/src/features/font/configs.tsx, nxmh, ??????  */
    nxmh: "Font Size",
    /*  melo-features/src/features/font/configs.tsx, rNyU, ??????  */
    rNyU: "Font Style",
    /*  melo-features/src/features/font/configs.tsx, PSWu, ????????????  */
    PSWu: "Heading Style",
    /*  melo-features/src/features/font/configs.tsx, oxDk, ??????  */
    oxDk: "Title",
    /*  melo-features/src/features/font/configs.tsx, WQyJ, ????????????  */
    WQyJ: "Highlight",
    /*  melo-features/src/features/font/configs.tsx, YXfg, ????????????  */
    YXfg: "Font Color",
    /*  melo-features/src/features/font/configs.tsx, TsXN, ???+D  */
    TsXN: "\u2318+D",
    /*  melo-features/src/features/font/configs.tsx, bxOt, ?????????  */
    bxOt: "Strikethrough",
    /*  melo-features/src/features/font/configs.tsx, ymBP, ???+U  */
    ymBP: "\u2318+U",
    /*  melo-features/src/features/font/configs.tsx, Xfec, ?????????  */
    Xfec: "Underline",
    /*  melo-features/src/features/font/configs.tsx, zdOG, ???+I  */
    zdOG: "\u2318+I",
    /*  melo-features/src/features/font/configs.tsx, MKrO, ??????  */
    MKrO: "Italic",
    /*  melo-features/src/features/font/configs.tsx, slyT, ???+B  */
    slyT: "\u2318+B",
    /*  melo-features/src/features/font/configs.tsx, UrIe, ??????  */
    UrIe: "Bold",
    /*  melo-features/src/features/font/configs.tsx, OhGc, ???????????????(Esc)  */
    OhGc: "Exit format painter (Esc)",
    /*  melo-features/src/features/font/configs.tsx, fxmG, ?????????(?????????????????????)  */
    fxmG: "Format painter (double-click to apply to multiple places)",
    /*  melo-features/src/features/font/configs.tsx, tvVj, ?????????  */
    tvVj: "Format painter",
    /*  melo-features/src/features/font/configs.tsx, fWoN, ????????????  */
    fWoN: "Character Spacing",
    /*  melo-features/src/features/font/configs.tsx, TIdp, ???+=  */
    TIdp: "\u2318+=",
    /*  melo-features/src/features/font/configs.tsx, TsBS, ??????  */
    TsBS: "Subscript",
    /*  melo-features/src/features/font/configs.tsx, wMqb, ???+Shift+=  */
    wMqb: "\u2318+Shift+=",
    /*  melo-features/src/features/font/configs.tsx, GJIg, ??????  */
    GJIg: "Superscript",
    /*  melo-features/src/features/font/configs.tsx, eihq, ??????  */
    eihq: "Tilt",
    /*  melo-features/src/features/font/configs.tsx, ASwU, ????????????  */
    ASwU: "Text format",
    /*  melo-features/src/features/font/font_handler.ts, dHiA, ??????  */
    dHiA: "Content",
    /*  melo-features/src/features/font/font_handler.ts, mAEX, ??????  */
    mAEX: "PingFang",
    /*  melo-features/src/features/font/font_handler.ts, KJtY, ????????????  */
    KJtY: "Microsoft YaHei",
    /*  melo-features/src/features/font/font_handler.ts, Xkpd, ??????  */
    Xkpd: "Default",
    /*  melo-features/src/features/horizontal_line/configs.tsx, USHv, ?????????  */
    USHv: "Divider",
    /*  melo-features/src/features/horizontal_line/configs.tsx, fJVQ, ???????????????  */
    fJVQ: "Divider Style",
    /*  melo-features/src/features/horizontal_line/configs.tsx, TrQI, ???????????????  */
    TrQI: "Divider Color",
    /*  melo-features/src/features/horizontal_line/configs.tsx, YvyT, / ????????????  */
    YvyT: "/-shape Background Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, GYcm, X ????????????  */
    GYcm: "X-shape Background Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, enpo, V ????????????  */
    enpo: "V-shape Background Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, rqVw, ????????????  */
    rqVw: "Double Wave Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, xqNF, ?????????3  */
    xqNF: "Wave Line 3",
    /*  melo-features/src/features/horizontal_line/configs.tsx, CmKQ, ?????????2  */
    CmKQ: "Wave Line 2",
    /*  melo-features/src/features/horizontal_line/configs.tsx, MYsw, ?????????  */
    MYsw: "Wave Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, zVNY, ??????????????????  */
    zVNY: "Expanded Dotted Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, iUPH, ????????????  */
    iUPH: "Dotted Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, jalh, ??????  */
    jalh: "Dash Line",
    /*  melo-features/src/features/horizontal_line/configs.tsx, BmeF, ??????5  */
    BmeF: "\u666E\u901A5",
    /*  melo-features/src/features/horizontal_line/configs.tsx, nJFd, ??????4  */
    nJFd: "\u666E\u901A4",
    /*  melo-features/src/features/horizontal_line/configs.tsx, phWD, ??????3  */
    phWD: "\u666E\u901A3",
    /*  melo-features/src/features/horizontal_line/configs.tsx, kvwi, ??????2  */
    kvwi: "\u666E\u901A2",
    /*  melo-features/src/features/horizontal_line/configs.tsx, zvdV, ??????  */
    zvdV: "Normal",
    /*  melo-features/src/features/image/configs.tsx, mniU, ??????  */
    mniU: "Video",
    /*  melo-features/src/features/image/configs.tsx, Vxkc, ????????????  */
    Vxkc: "Camera image",
    /*  melo-features/src/features/image/configs.tsx, HRng, ????????????  */
    HRng: "Insert image",
    /*  melo-features/src/features/image/configs.tsx, etxl, ????????????  */
    etxl: "View original",
    /*  melo-features/src/features/image/configs.tsx, pkjf, ??????  */
    pkjf: "Crop",
    /*  melo-features/src/features/image/configs.tsx, GMxD, ????????????  */
    GMxD: "Restore image",
    /*  melo-features/src/features/image/configs.tsx, pTcP, ????????????  */
    pTcP: "Crop image",
    /*  melo-features/src/features/image/configs.tsx, YpLJ, ??????  */
    YpLJ: "Image",
    /*  melo-features/src/features/image/image_handler.tsx, EekB, ??????????????????????????????????????????  */
    EekB: "Network disconnected. Failed to upload image.",
    /*  melo-features/src/features/image/image_handler.tsx, dxZq, ?????????20M?????????????????????  */
    dxZq: "Insert an image less than 20 MB",
    /*  melo-features/src/features/image/image_handler.tsx, kdOC, ie??????????????????10M?????????????????????  */
    kdOC: "Insert an image less than 10 MB in IE",
    /*  melo-features/src/features/image/image_handler.tsx, snDe, ????????????????????????  */
    snDe: "Failed to get the linked picture",
    /*  melo-features/src/features/image/image_handler.tsx, vmGu, ??????????????????????????????  */
    vmGu: "The file type is not supported",
    /*  melo-features/src/features/image/image_handler.tsx, wbBN, ??????????????????????????????????????????  */
    wbBN: "Only an image file supports drag-and-drop upload.",
    /*  melo-features/src/features/link/configs.tsx, THUi, ????????????  */
    THUi: "Insert link",
    /*  melo-features/src/features/link/configs.tsx, WRew, ????????????  */
    WRew: "Cancel link",
    /*  melo-features/src/features/link/configs.tsx, KnPU, ????????????  */
    KnPU: "Edit link",
    /*  melo-features/src/features/link/configs.tsx, MUrQ, ????????????  */
    MUrQ: "Copy link",
    /*  melo-features/src/features/link/configs.tsx, TmSR, ????????????  */
    TmSR: "Open link",
    /*  melo-features/src/features/link/configs.tsx, nRQc, ??????  */
    nRQc: "Link",
    /*  melo-features/src/features/link/link_dialog.tsx, KFLs, ??????  */
    KFLs: "Apply",
    /*  melo-features/src/features/link/link_dialog.tsx, sBVF, ????????????????????????????????????????????????  */
    sBVF: "Incorrect link. Please check.",
    /*  melo-features/src/features/link/link_dialog.tsx, GokS, ???????????????????????????  */
    GokS: "Enter webpage URL",
    /*  melo-features/src/features/link/link_dialog.tsx, Iwye, ???????????????????????????????????????????????????  */
    Iwye: "Selection spans on multiple paragraphs. Cannot edit.",
    /*  melo-features/src/features/link/link_dialog.tsx, OsUP, ??????  */
    OsUP: "Text",
    /*  melo-features/src/features/link/link_handler.tsx, BNJf, ?????????  */
    BNJf: "Copied",
    /*  melo-features/src/features/link/link_tips.tsx, GHwQ, ??????  */
    GHwQ: "Modify",
    /*  melo-features/src/features/list/configs.tsx, tnzr, ???+Shift+I  */
    tnzr: "\u2318+Shift+I",
    /*  melo-features/src/features/list/configs.tsx, lhCu, ????????????  */
    lhCu: "Unordered list",
    /*  melo-features/src/features/list/configs.tsx, dglb, ????????????  */
    dglb: "Bullet",
    /*  melo-features/src/features/list/configs.tsx, BUgN, ???+Shift+U  */
    BUgN: "\u2318+Shift+U",
    /*  melo-features/src/features/list/configs.tsx, VIes, ????????????  */
    VIes: "Numerical list",
    /*  melo-features/src/features/list/configs.tsx, IldK, ????????????  */
    IldK: "Numerical item",
    /*  melo-features/src/features/list/configs.tsx, nBhC, ??????  */
    nBhC: "More",
    /*  melo-features/src/features/list/configs.tsx, bmuf, ????????????  */
    bmuf: "Numeric number",
    /*  melo-features/src/features/list/configs.tsx, rNAF, ????????????  */
    rNAF: "Task list",
    /*  melo-features/src/features/list/configs.tsx, cipF, ????????????  */
    cipF: "Continue numbering",
    /*  melo-features/src/features/list/configs.tsx, ONpR, ????????????  */
    ONpR: "Renumber",
    /*  melo-features/src/features/list/list_config.ts, EegC, %1???  */
    EegC: "%1\u3001",
    /*  melo-features/src/features/list/list_config.ts, iyVH, %1???  */
    iyVH: "%1\uFF09",
    /*  melo-features/src/features/list/list_config.ts, WeHa, ???%1???  */
    WeHa: "\uFF08%1\uFF09",
    /*  melo-features/src/features/list/list_config.ts, KzeN, (???)  */
    KzeN: "(\u4E09)",
    /*  melo-features/src/features/list/list_config.ts, eVnE, (???)  */
    eVnE: "(\u4E8C)",
    /*  melo-features/src/features/list/list_config.ts, moTv, (???)  */
    moTv: "(\u4E00)",
    /*  melo-features/src/features/list/list_config.ts, ySOL, ??????  */
    ySOL: "\u4E09\u3001",
    /*  melo-features/src/features/list/list_config.ts, BkoI, ??????  */
    BkoI: "\u4E8C\u3001",
    /*  melo-features/src/features/list/list_config.ts, Bpbo, ??????  */
    Bpbo: "\u4E00\u3001",
    /*  melo-features/src/features/list/list_config.ts, BNSn, 3???  */
    BNSn: "3\u3001",
    /*  melo-features/src/features/list/list_config.ts, EDmo, 2???  */
    EDmo: "2\u3001",
    /*  melo-features/src/features/list/list_config.ts, ReYz, 1???  */
    ReYz: "1\u3001",
    /*  melo-features/src/features/list/list_config.ts, fgAe, ???  */
    fgAe: "\u27A2",
    /*  melo-features/src/features/list/list_config.ts, ZDpv, ?????? ???  */
    ZDpv: "\u7F16\u53F7 \u27A2",
    /*  melo-features/src/features/list/list_config.ts, VQSe, ???  */
    VQSe: "\u2713",
    /*  melo-features/src/features/list/list_config.ts, Mlnw, ?????? ???  */
    Mlnw: "\u7F16\u53F7 \u2713",
    /*  melo-features/src/features/list/list_config.ts, VdZT, ???  */
    VdZT: "\u2727",
    /*  melo-features/src/features/list/list_config.ts, Adyr, ?????? ???  */
    Adyr: "\u7F16\u53F7 \u2727",
    /*  melo-features/src/features/list/list_config.ts, pkSC, ???  */
    pkSC: "\u25C6",
    /*  melo-features/src/features/list/list_config.ts, FKTf, ?????? ???  */
    FKTf: "\u7F16\u53F7 \u25C6",
    /*  melo-features/src/features/list/list_config.ts, zQyu, ???  */
    zQyu: "\u25A0",
    /*  melo-features/src/features/list/list_config.ts, NvqB, ?????? ???  */
    NvqB: "\u7F16\u53F7 \u25A0",
    /*  melo-features/src/features/list/list_config.ts, gMvC, ???  */
    gMvC: "\u25CF",
    /*  melo-features/src/features/list/list_config.ts, uRJq, ?????? ???  */
    uRJq: "\u7F16\u53F7 \u25CF",
    /*  melo-features/src/features/list/list_config.ts, VrNX, ???  */
    VrNX: "\u65E0",
    /*  melo-features/src/features/list/list_config.ts, eGnK, ?????? ???  */
    eGnK: "\u7F16\u53F7 \u65E0",
    /*  melo-features/src/features/location/configs.tsx, yugG, ??????  */
    yugG: "Location",
    /*  melo-features/src/features/location/location_handler.tsx, ubwv, ??????????????????  */
    ubwv: "Failed to obtain the location",
    /*  melo-features/src/features/newpad_input_tips/index.ts, MymO, ??????????????????  */
    MymO: "Tap to enter",
    /*  melo-features/src/features/outline/configs.tsx, MUZH, ????????????  */
    MUZH: "Show directory",
    /*  melo-features/src/features/outline/configs.tsx, XfMC, ?????????  */
    XfMC: "Subheading",
    /*  melo-features/src/features/outline/configs.tsx, gjHS, ?????????  */
    gjHS: "Heading",
    /*  melo-features/src/features/outline/configs.tsx, pGbr, ?????????  */
    pGbr: "Headline",
    /*  melo-features/src/features/outline/configs.tsx, TLbu, ??????  */
    TLbu: "Directory",
    /*  melo-features/src/features/page/configs.tsx, Xqtv, ????????????  */
    Xqtv: "Paging mode",
    /*  melo-features/src/features/page_shade/configs.tsx, mUlg, ??????  */
    mUlg: "Shading",
    /*  melo-features/src/features/page_shade/shade_template.tsx, LURG, ????????????  */
    LURG: "Page shading",
    /*  melo-features/src/features/page_shade/shade_template.tsx, YeWf, ?????????  */
    YeWf: "Grid pattern",
    /*  melo-features/src/features/page_shade/shade_template.tsx, fHNe, ?????????  */
    fHNe: "Dot pattern",
    /*  melo-features/src/features/page_shade/shade_template.tsx, eAdw, ???????????????  */
    eAdw: "Plain watercolor paper",
    /*  melo-features/src/features/page_shade/shade_template.tsx, KObf, ??????????????????  */
    KObf: "Porcelain white watercolor paper",
    /*  melo-features/src/features/page_shade/shade_template.tsx, vdhA, ??????  */
    vdhA: "Off-white",
    /*  melo-features/src/features/page_shade/shade_template.tsx, FLGj, ??????  */
    FLGj: "White",
    /*  melo-features/src/features/paragraph/configs.tsx, QEeg, ?????????  */
    QEeg: "Align Right",
    /*  melo-features/src/features/paragraph/configs.tsx, TSzu, ????????????  */
    TSzu: "Center",
    /*  melo-features/src/features/paragraph/configs.tsx, PjVD, ?????????  */
    PjVD: "Align Left",
    /*  melo-features/src/features/paragraph/configs.tsx, RLzH, ???+Shift+M  */
    RLzH: "\u2318+Shift+M",
    /*  melo-features/src/features/paragraph/configs.tsx, lAHq, ????????????  */
    lAHq: "Decrease indent",
    /*  melo-features/src/features/paragraph/configs.tsx, QyGH, ???+M  */
    QyGH: "\u2318+M",
    /*  melo-features/src/features/paragraph/configs.tsx, wbrk, ????????????  */
    wbrk: "Add indent",
    /*  melo-features/src/features/paragraph/configs.tsx, bhVz, ????????????  */
    bhVz: "Align horizontally",
    /*  melo-features/src/features/paragraph/configs.tsx, mbDH, ???+Shift+J  */
    mbDH: "\u2318+Shift+J",
    /*  melo-features/src/features/paragraph/configs.tsx, XOzr, ????????????  */
    XOzr: "Justify",
    /*  melo-features/src/features/paragraph/configs.tsx, gycP, ???+Shift+R  */
    gycP: "\u2318+Shift+R",
    /*  melo-features/src/features/paragraph/configs.tsx, NQnH, ???+Shift+E  */
    NQnH: "\u2318+Shift+E",
    /*  melo-features/src/features/paragraph/configs.tsx, wClh, ???+Shift+L  */
    wClh: "\u2318+Shift+L",
    /*  melo-features/src/features/paragraph/configs.tsx, MoSW, ????????????  */
    MoSW: "Paragraph format",
    /*  melo-features/src/features/paragraph/configs.tsx, skQx, ????????????????????????  */
    skQx: "More paragraph formatting",
    /*  melo-features/src/features/paragraph/configs.tsx, exCh, ??????  */
    exCh: "Indent",
    /*  melo-features/src/features/paragraph/configs.tsx, UNOt, ???????????????????????????  */
    UNOt: "More spacing and indentation styles",
    /*  melo-features/src/features/paragraph/configs.tsx, IGMY, ??????  */
    IGMY: "Line spacing",
    /*  melo-features/src/features/paragraph/configs.tsx, blMN, ???+Shift+{0}  */
    blMN: "\u2318+Shift+{0}",
    /*  melo-features/src/features/paragraph/configs.tsx, rWjH, ??????  */
    rWjH: "Align",
    /*  melo-features/src/features/paragraph/paragraph_setting_panel_manager.tsx, VgnS, ???????????????  */
    VgnS: "Indents and Spacing",
    /*  melo-features/src/features/paste_format/configs.tsx, BpFR, ???+Shift+V  */
    BpFR: "\u2318+Shift+V",
    /*  melo-features/src/features/paste_format/configs.tsx, fNPx, ???????????????  */
    fNPx: "Paste text only",
    /*  melo-features/src/features/paste_format/paste_format.tsx, OCfv, ?????????  */
    OCfv: "Text only",
    /*  melo-features/src/features/paste_format/paste_format.tsx, iNHG, ????????????  */
    iNHG: "Keep format",
    /*  melo-features/src/features/performance_report/performance_data.ts, XsbT, ?????????????????????FPS  */
    XsbT: "\u6E32\u67D3\u8FC7\u7A0B\u7684\u5E73\u5747FPS",
    /*  melo-features/src/features/performance_report/performance_data.ts, sfhU, ???????????????????????????  */
    sfhU: "\u6BCF\u6B21\u6E32\u67D3\u7684\u5E73\u5747\u8017\u65F6",
    /*  melo-features/src/features/performance_report/performance_data.ts, sMEN, ???????????????????????????  */
    sMEN: "\u6BCF\u6B21\u6392\u7248\u7684\u5E73\u5747\u8017\u65F6",
    /*  melo-features/src/features/performance_report/performance_data.ts, htWD, SCRIPT????????????  */
    htWD: "SCRIPT\u4E0B\u8F7D\u65F6\u957F",
    /*  melo-features/src/features/performance_report/performance_data.ts, PMxl, SCRIPT???????????????  */
    PMxl: "SCRIPT\u4E0B\u8F7D\u603B\u65F6\u957F",
    /*  melo-features/src/features/performance_report/performance_data.ts, Nkor, RAVEN??????  */
    Nkor: "RAVEN\u7248\u672C",
    /*  melo-features/src/features/performance_report/performance_data.ts, BHnY, ????????????  */
    BHnY: "\u6E32\u67D3\u65F6\u957F",
    /*  melo-features/src/features/performance_report/performance_data.ts, dSzt, ?????????UA  */
    dSzt: "\u6D4F\u89C8\u5668UA",
    /*  melo-features/src/features/performance_report/performance_data.ts, mQqF, ????????????????????????  */
    mQqF: "\u662F\u5426\u5904\u4E8E\u53EF\u89C1\u72B6\u6001",
    /*  melo-features/src/features/performance_report/performance_data.ts, TYxA, ????????????????????????(????????????)  */
    TYxA: "\u6240\u6709\u5185\u5BB9\u6E32\u67D3\u5B8C\u6210(\u5305\u62EC\u8868\u683C)",
    /*  melo-features/src/features/performance_report/performance_data.ts, wTsU, ????????????????????????  */
    wTsU: "\u6240\u6709\u5185\u5BB9\u6E32\u67D3\u5B8C\u6210",
    /*  melo-features/src/features/performance_report/performance_data.ts, mVdh, ???????????????????????????  */
    mVdh: "\u9996\u5C4F\u53EF\u7F16\u8F91\u4EA4\u4E92\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, vxqb, ??????????????????????????????  */
    vxqb: "\u7B2C\u4E00\u9875\u6392\u7248\u7ED3\u675F\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, YGCq, ??????????????????????????????  */
    YGCq: "\u7B2C\u4E00\u9875\u6392\u7248\u5F00\u59CB\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, uSVI, ????????????????????????  */
    uSVI: "\u9996\u5C4F\u6E32\u67D3\u53EF\u89C1\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, TCbu, ?????????workbench?????????  */
    TCbu: "\u521D\u59CB\u5316workbench\u7684\u8017\u65F6",
    /*  melo-features/src/features/performance_report/performance_data.ts, rUdP, atext???model?????????  */
    rUdP: "atext\u8F6Cmodel\u7684\u8017\u65F6",
    /*  melo-features/src/features/performance_report/performance_data.ts, LWbq, ??????cache content???????????????  */
    LWbq: "\u83B7\u53D6cache content\u7ED3\u675F\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, Dlsy, ??????cache content???????????????  */
    Dlsy: "\u83B7\u53D6cache content\u5F00\u59CB\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, oMlq, ??????nocache content???????????????  */
    oMlq: "\u83B7\u53D6nocache content\u7ED3\u675F\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, LPlQ, ??????nocache content???????????????  */
    LPlQ: "\u83B7\u53D6nocache content\u5F00\u59CB\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, lohM, ????????????????????????onload  */
    lohM: "\u5168\u90E8\u52A0\u8F7D\u5B8C\u6210\u65F6\u95F4onload",
    /*  melo-features/src/features/performance_report/performance_data.ts, Bxnc, domReady???????????????  */
    Bxnc: "domReady\u7ED3\u675F\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, sQGE, domReady???????????????  */
    sQGE: "domReady\u5F00\u59CB\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, VqtQ, dom?????????????????????????????????????????????  */
    VqtQ: "dom\u7ED3\u6784\u89E3\u6790\u5B8C\u6210\uFF0C\u5F00\u59CB\u52A0\u8F7D\u5185\u5D4C\u8D44\u6E90",
    /*  melo-features/src/features/performance_report/performance_data.ts, MPyg, ??????????????????(loading)  */
    MPyg: "\u9996\u6B21\u663E\u793A\u5185\u5BB9(loading)",
    /*  melo-features/src/features/performance_report/performance_data.ts, KjOu, TCP????????????????????????  */
    KjOu: "TCP\u94FE\u63A5\u5EFA\u7ACB\u7ED3\u675F\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, mzyl, dns????????????  */
    mzyl: "dns\u89E3\u6790\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, LXQu, ?????????????????????  */
    LXQu: "\u6253\u5F00\u6587\u6863\u7684\u65F6\u95F4",
    /*  melo-features/src/features/performance_report/performance_data.ts, LPDz, ????????????????????????  */
    LPDz: "Local data loading time",
    /*  melo-features/src/features/performance_report/performance_data.ts, JHwA, ??????????????????  */
    JHwA: "Load data source",
    /*  melo-features/src/features/performance_report/performance_data.ts, VnDW, ???????????????????????????????????????  */
    VnDW: "WeChat Work pre-pulling document time",
    /*  melo-features/src/features/performance_report/performance_data.ts, WjOQ, ???????????????????????????????????????  */
    WjOQ: "WeChat Work offline package incremental update time",
    /*  melo-features/src/features/performance_report/performance_data.ts, WYVa, ????????????????????????????????????  */
    WYVa: "WeChat Work pre-pulling offline package time",
    /*  melo-features/src/features/performance_report/performance_data.ts, ntxg, ???????????????????????????  */
    ntxg: "WeChat Work pre-authorization time",
    /*  melo-features/src/features/performance_report/performance_data.ts, pBPu, ????????????Webview???????????????  */
    pBPu: "WeChat Work Webview initializing time",
    /*  melo-features/src/features/read_record/configs.tsx, QnmY, ????????????  */
    QnmY: "Browsing history",
    /*  melo-features/src/features/read_record/configs.tsx, eKIr, ??????????????????  */
    eKIr: "View browsing history",
    /*  melo-features/src/features/recover_doc/recover_doc_handler.tsx, axSQ, ??????????????????????????????{0}???  */
    axSQ: "File restoring failed. Try again {0}.",
    /*  melo-features/src/features/recover_doc/recover_doc_handler.tsx, GsRo, ????????????  */
    GsRo: "Restored",
    /*  melo-features/src/features/recover_doc/recover_doc_handler.tsx, Wouf, ??????  */
    Wouf: "Restore",
    /*  melo-features/src/features/revision_record/configs.tsx, TqWE, ??????????????????  */
    TqWE: "View revision history",
    /*  melo-features/src/features/search/configs.tsx, cHek, ???????????????  */
    cHek: "Find and replace",
    /*  melo-features/src/features/search/configs.tsx, RVgb, ??????  */
    RVgb: "Find",
    /*  melo-features/src/features/search/configs.tsx, hFSr, ???????????????  */
    hFSr: "Find and replace",
    /*  melo-features/src/features/search/configs.tsx, IDwK, ???+F  */
    IDwK: "\u2318+F",
    /*  melo-features/src/features/search/configs.tsx, bRmD, ????????????  */
    bRmD: "Find to replace",
    /*  melo-features/src/features/search/search_dialog.tsx, AYht, ????????????  */
    AYht: "Replace All",
    /*  melo-features/src/features/search/search_dialog.tsx, SXAG, ??????  */
    SXAG: "Replace",
    /*  melo-features/src/features/search/search_dialog.tsx, jWyT, ?????????  */
    jWyT: "Next",
    /*  melo-features/src/features/search/search_dialog.tsx, mbgp, ?????????  */
    mbgp: "Previous",
    /*  melo-features/src/features/search/search_dialog.tsx, LbkW, ??????????????????  */
    LbkW: "Replace with",
    /*  melo-features/src/features/search/search_dialog.tsx, WhzI, ?????????  */
    WhzI: "Replace with",
    /*  melo-features/src/features/search/search_dialog.tsx, LPxv, ??????????????????  */
    LPxv: "Find what",
    /*  melo-features/src/features/search/search_handler.tsx, Ghkf, ?????????{0}??????????????????  */
    Ghkf: "A total of {0} results were replaced.",
    /*  melo-features/src/features/search/search_handler.tsx, uGDK, ????????????  */
    uGDK: "Replacement result",
    /*  melo-features/src/features/search/search_handler.tsx, XPbv, ????????????????????????{0}??? ???{1}??? {2}  */
    XPbv: "Are you sure you want to {2} {0} \"{1}\"\uFF1F",
    /*  melo-features/src/features/search/search_handler.tsx, MCkB, ??????????????? ???{0}??? ????  */
    MCkB: "Replace all with \"{0}\"?",
    /*  melo-features/src/features/search/search_handler.tsx, GCDE, ????????????????  */
    GCDE: "Clear All?",
    /*  melo-features/src/features/section/configs.tsx, rvut, ????????????  */
    rvut: "Page Layout",
    /*  melo-features/src/features/section/configs.tsx, dnMC, ??????  */
    dnMC: "Footer",
    /*  melo-features/src/features/section/configs.tsx, FdNJ, ??????  */
    FdNJ: "Header",
    /*  melo-features/src/features/section/section_handler.tsx, GtNO, ???????????????  */
    GtNO: "Header divider",
    /*  melo-features/src/features/section/section_handler.tsx, WgLx, ????????????  */
    WgLx: "Insert page number",
    /*  melo-features/src/features/share/configs.tsx, LlWE, ??????????????????????????????????????????  */
    LlWE: "Request submitted. Waiting for approval of creator.",
    /*  melo-features/src/features/share/configs.tsx, RVGT, ???????????????????????????24??????????????????  */
    RVGT: "Request rejected. Try again after 24 hours.",
    /*  melo-features/src/features/share/configs.tsx, mDdg, ??????????????????  */
    mDdg: "Apply for edit permission",
    /*  melo-features/src/features/shooting/shooting_handler.tsx, WtuN, ????????????  */
    WtuN: "Start shooting",
    /*  melo-features/src/features/spellcheck/configs.tsx, jJHT, ??????????????????  */
    jJHT: "Ignore all",
    /*  melo-features/src/features/spellcheck/configs.tsx, kwmf, ????????????  */
    kwmf: "Ignore",
    /*  melo-features/src/features/spellcheck/configs.tsx, RsZI, ????????????  */
    RsZI: "Intelligent error correction",
    /*  melo-features/src/features/spellcheck/spellcheck_util.ts, oLdW,
    ???????????????.!?]  */
    oLdW: "\u3002\uFF01\uFF1F\u2026\u2026.!?]",
    /*  melo-features/src/features/table/configs.tsx, iPeb, ????????????  */
    iPeb: "Align vertically",
    /*  melo-features/src/features/table/configs.tsx, Dtnc, ???????????????  */
    Dtnc: "Merge cells",
    /*  melo-features/src/features/table/configs.tsx, UwDV, ??????  */
    UwDV: "Border",
    /*  melo-features/src/features/table/configs.tsx, vPQd, ????????????  */
    vPQd: "Fill Color",
    /*  melo-features/src/features/table/configs.tsx, qIHw, ????????????  */
    qIHw: "Insert sheet",
    /*  melo-features/src/features/table/configs.tsx, iOUg, ????????????  */
    iOUg: "Bottom",
    /*  melo-features/src/features/table/configs.tsx, QWjh, ????????????  */
    QWjh: "Top",
    /*  melo-features/src/features/table/configs.tsx, nVwR, ????????????  */
    nVwR: "Delete sheet",
    /*  melo-features/src/features/table/configs.tsx, vYeL, ???????????????  */
    vYeL: "Split Cells",
    /*  melo-features/src/features/table/configs.tsx, SbHQ, ???????????????  */
    SbHQ: "Delete this column",
    /*  melo-features/src/features/table/configs.tsx, bXeF, ????????????{0}???  */
    bXeF: "Insert {0} column(s) to the right",
    /*  melo-features/src/features/table/configs.tsx, LFXs, ????????????{0}???  */
    LFXs: "Insert {0} column(s) to the left",
    /*  melo-features/src/features/table/configs.tsx, bukv, ???????????????  */
    bukv: "Delete this row",
    /*  melo-features/src/features/table/configs.tsx, tOhj, ????????????{0}???  */
    tOhj: "Insert {0} row(s) below",
    /*  melo-features/src/features/table/configs.tsx, nFCq, ????????????{0}???  */
    nFCq: "Insert {0} row(s) above",
    /*  melo-features/src/features/table/configs.tsx, fCIU, ?????????  */
    fCIU: "Border Line",
    /*  melo-features/src/features/table/table_handler.tsx, PmTv, ??????????????????????????????????????????????????????  */
    PmTv: "Number of sheets inserted reached the limit. Delete some sheets first.",
    /*  melo-features/src/features/tdocs_titlebar/tdocs_titlebar_handler.tsx, hjCp, ????????????????????????????????????????????????????????????????????????  */
    hjCp: "View only. Log in for more permissions.",
    /*  melo-features/src/features/tdocs_titlebar/tdocs_titlebar_handler.tsx, ekKJ, ????????????????????????????????????  */
    ekKJ: "View Only",
    /*  melo-features/src/features/tdocs_titlebar/tdocs_titlebar_handler.tsx, WPMu, {0} - ????????????  */
    WPMu: "{0} - Tencent Docs",
    /*  melo-features/src/features/title/title_handler.ts, etDu, ??????????????????  */
    etDu: "File name updated",
    /*  melo-features/src/features/title/title_manager.tsx, BgAD, ???????????????  */
    BgAD: "Untitled",
    /*  melo-features/src/features/translate/configs.tsx, lwkI, ????????????  */
    lwkI: "Intelligent translation",
    /*  melo-features/src/features/translate/translate_fail_view.tsx, nuMQ, ????????????  */
    nuMQ: "Translate again",
    /*  melo-features/src/features/translate/translate_fail_view.tsx, vBJE, ????????????  */
    vBJE: "Exit",
    /*  melo-features/src/features/translate/translate_fail_view.tsx, qOUG, ?????????????????????????????????  */
    qOUG: "Unable to translate. Try again later.",
    /*  melo-features/src/features/translate/translate_fail_view.tsx, wsWB, ??????????????????????????????  */
    wsWB: "Translation is not supported for this language.",
    /*  melo-features/src/features/translate/translate_handler.tsx, UEoY, ???????????????????????????????????????????????????????????????  */
    UEoY: "Failed to generate a new file for translation. Close the current page and try again.",
    /*  melo-features/src/features/translate/translate_handler.tsx, nLCc, ?????????????????????...  */
    nLCc: "Creating a translation file...",
    /*  melo-features/src/features/translate/translate_handler.tsx, mcGd, {0} - ??????  */
    mcGd: "{0} - translation",
    /*  melo-features/src/features/translate/translate_language_bar.tsx, AcHr, ????????????  */
    AcHr: "Auto Recognition",
    /*  melo-features/src/features/translate/translate_language_bar.tsx, ebIX, ??????  */
    ebIX: "English",
    /*  melo-features/src/features/translate/translate_language_bar.tsx, Oczu, ??????  */
    Oczu: "Chinese",
    /*  melo-features/src/features/translate/translate_save_btn.tsx, sWpe, ???????????????  */
    sWpe: "Create a new doc",
    /*  melo-features/src/features/video/configs.tsx, recR, ????????????  */
    recR: "Insert videos",
    /*  melo-features/src/features/watermark/configs.tsx, qJsm, ??????  */
    qJsm: "Watermark",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, Yoiu, ??????  */
    Yoiu: "Help",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, dzAX, ?????????????????????????????????  */
    dzAX: "Doc background for the visitor:",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, DxOX, ??????  */
    DxOX: "Example",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, epKI, ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  */
    epKI: "Once selected, the viewer name will be shown on the doc background to prevent unauthorized screen capture.",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, NuDf, ????????????????????????????????????  */
    NuDf: "Show viewer name on doc background",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, jHRO, ??????????????????  */
    jHRO: "Set viewer watermark",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, hWYy, ?????????????????????  */
    hWYy: "Watermark hidden to me",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, gEqO, ?????????  */
    gEqO: "Loose",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, FeJu, ?????????  */
    FeJu: "Tight",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, LQXy, ?????????????????????  */
    LQXy: "Enter text watermark",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, ZNmg, ??????????????????  */
    ZNmg: "Set file watermark",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, yLDH, ???????????????????????????????????????  */
    yLDH: "Unable to set watermark. Try again later.",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, LlEG, ????????????????????????????????????  */
    LlEG: "Illegal content. Enter again.",
    /*  melo-features/src/features/watermark/watermark_dialog.tsx, BKfc, ????????????????????????  */
    BKfc: "The file is watermarked.",
    /*  melo-features/src/features/word_count/word_count_component.tsx, DfHv, ??????  */
    DfHv: "word(s)",
    /*  melo-features/src/features/wxwork_quote/configs.tsx, JLtW, ??????  */
    JLtW: "Forward",
    /*  melo-features/src/features/wxwork_quote/configs.tsx, dEzb, icon/doc/toolbar/at??????  */
    dEzb: "icon/doc/toolbar/at\u5907\u4EFD",
    /*  melo-features/src/features/zoom_pc/configs.tsx, RvTS, ????????????  */
    RvTS: "Zoom",
    /*  melo-features/src/workbench/mobile_style_panel/style_panel_container.tsx, SPVU, ??????  */
    SPVU: "Paragraph",
    /*  melo-features/src/workbench/number_input/number_input.tsx, XzJY, ????????????  */
    XzJY: "Invalid number",
    /*  melo-features/src/workbench/number_input/number_input.tsx, erWp, ???????????????{0}???{1}  */
    erWp: "Valid value: {0} to {1}",
    /*  melo-features/src/workbench/palette/palette.tsx, rRBV, ???????????????  */
    rRBV: "Custom color",
    /*  melo-features/src/workbench/palette/palette.tsx, SwBr, ????????????  */
    SwBr: "Recent",
    /*  melo-features/src/workbench/palette/palette.tsx, AWot, ?????????  */
    AWot: "No color",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, TLEG, ?????????????????????...  */
    TLEG: "Saving offline edits...",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, bJVo, ????????????????????????....  */
    bJVo: "Syncing offline edits...",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, eEVZ, ??????????????????????????????????????????????????????????????????  */
    eEVZ: "Network unavailable. Sync updates under normal network connection.",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, xAGX, ??????????????????????????????????????????????????????????????????  */
    xAGX: "Network unavailable. Save offline edits under normal network connection.",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, Vzlq, ????????????,???????????????????????????????????????  */
    Vzlq: "Network exception. Sync updates under normal network connection.",
    /*  melo-features/src/workbench/snack_bar/network_status_snackbar.tsx, ViHm, ????????????,???????????????????????????????????????  */
    ViHm: "Network exception. Save offline edits under normal network connection.",
    /*  melo-features/src/workbench/title_bar/menu_manager.ts, sLvg, ????????????  */
    sLvg: "Intelligent Tools",
    /*  melo-features/src/workbench/title_bar/menu_manager.ts, ozKl, ??????  */
    ozKl: "View",
    /*  melo-features/src/workbench/title_bar/menu_manager.ts, yMav, ??????  */
    yMav: "Format",
    /*  melo-features/src/workbench/title_bar/menu_manager.ts, wkGM, ??????  */
    wkGM: "Edit",
    /*  melo-features/src/workbench/title_bar/menu_manager.ts, HUDY, ??????  */
    HUDY: "File",
    /*  melo-features/src/features/audio/components/audio_float_bar.tsx, Egmv, ??????????????????????????????  */
    Egmv: "Recording... Click to stop.",
    /*  melo-features/src/features/audio/components/audio_record_panel.tsx, HMQq, ????????????  */
    HMQq: "Recording",
    /*  melo-features/src/features/audio/components/audio_record_panel.tsx, Xfzn, ?????????...  */
    Xfzn: "Encoding...",
    /*  melo-features/src/features/audio/manager/audio_error.ts, rFdI, ????????????  */
    rFdI: "Unknown error",
    /*  melo-features/src/features/audio/manager/audio_error.ts, UCRV, ????????????????????????  */
    UCRV: "Failed to get audio link",
    /*  melo-features/src/features/audio/manager/audio_error.ts, clzu, ????????????????????????  */
    clzu: "Unable to play the resource",
    /*  melo-features/src/features/audio/manager/audio_error.ts, mVCI, ??????????????????????????????  */
    mVCI: "Playback failed. Check your network.",
    /*  melo-features/src/features/audio/manager/audio_error.ts, rcCz, ??????????????????????????????  */
    rcCz: "Playback failed. Try again later.",
    /*  melo-features/src/features/audio/manager/audio_error.ts, Ckui, ??????????????????, ???????????????  */
    Ckui: "Failed to upload record. Check your network.",
    /*  melo-features/src/features/audio/manager/audio_error.ts, OYgs, ???????????????????????????????????????  */
    OYgs: "Failed to upload encoder. Check your network.",
    /*  melo-features/src/features/audio/manager/audio_error.ts, ecPJ, ????????????????????????????????????  */
    ecPJ: "Recording is not supported in this browser.",
    /*  melo-features/src/features/audio/manager/audio_error.ts, SRHh, ?????????????????????  */
    SRHh: "No recording device found",
    /*  melo-features/src/features/audio/manager/audio_error.ts, hmUj, ?????????????????????  */
    hmUj: "Recording disabled",
    /*  melo-features/src/features/audio/manager/audio_error.ts, Wxsh, ??????????????????????????????  */
    Wxsh: "Recording failed. Try again later.",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, MeYw, ???????????????????????????????????????  */
    MeYw: "Voice input in progress. Unable to play.",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, qNYL, ?????????????????????????????????  */
    qNYL: "Recording in progress. Unable to play.",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, glcR, ?????????????????????????????????  */
    glcR: "Recording in progress. Confirm to leave?",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, rGfC, ???????????????????????????????  */
    rGfC: "Recording in progress. Confirm to leave?",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, dcFX, ??????????????????  */
    dcFX: "Stop playing",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, fdCA, ????????????  */
    fdCA: "Clear comments",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, SnGO, ??????????????????????????????????????????????????????  */
    SnGO: "Unable to delete the comment. Check your network or try again later.",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, PxNy, ?????????????????????????????????????????????  */
    PxNy: "Delete all comments for this content?",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, WoqC, ????????????  */
    WoqC: "Delete comments",
    /*  melo-features/src/features/comment/panel_component/comment_discuss_entry_button.tsx, UQsg, ??????  */
    UQsg: "Chat",
    /*  melo-features/src/features/comment/panel_component/comment_input.tsx, VnyH, ???????????????  */
    VnyH: "Sync to group:",
    /*  melo-features/src/features/comment/panel_component/comment_input.tsx, gfFH, ??????????????????  */
    gfFH: "Click to add comments",
    /*  melo-features/src/features/comment/panel_component/comment_item.tsx, LVJq, ?????????  */
    LVJq: "comment(s)",
    /*  melo-features/src/features/comment/panel_component/comment_item.tsx, odQc, ?????????  */
    odQc: "Collapsed",
    /*  melo-features/src/features/comment/panel_component/comment_item.tsx, JCVK, ????????????  */
    JCVK: "Add comments",
    /*  melo-features/src/features/comment/panel_component/comment_item.tsx, FbqB, ??????????????????????????????  */
    FbqB: "Delete this comment?",
    /*  melo-features/src/features/doc_view_mobile/controller/mobile_tips.ts, JWjp, ???????????????  */
    JWjp: "Rename",
    /*  melo-features/src/features/doc_view_mobile/controller/mobile_tips.ts, PsGw, ???????????????????????????  */
    PsGw: "View only",
    /*  melo-features/src/features/doc_view_mobile/controller/mobile_tips.ts, zaCu, ???????????????????????????  */
    zaCu: "File name synced automatically.",
    /*  melo-features/src/features/doc_view_mobile/controller/mobile_tips.ts, yfAY, ??????????????????????????????  */
    yfAY: "Click here to view all files.",
    /*  melo-features/src/features/font/config/font_family_config.ts, SsgE, ????????????  */
    SsgE: "STKaiTi",
    /*  melo-features/src/features/font/config/font_family_config.ts, DlEJ, ????????????  */
    DlEJ: "STFangSong",
    /*  melo-features/src/features/font/config/font_family_config.ts, spfv, ????????????  */
    spfv: "STSong",
    /*  melo-features/src/features/font/config/font_family_config.ts, gJnm, ?????????????????????  */
    gJnm: "Hiragino Sans GB",
    /*  melo-features/src/features/font/config/font_family_config.ts, seMp, ??????  */
    seMp: "HeiTi",
    /*  melo-features/src/features/font/config/font_family_config.ts, iUMO, ??????  */
    iUMO: "Song",
    /*  melo-features/src/features/font/config/font_family_config.ts, sBmg, ????????????  */
    sBmg: "PMingLiU",
    /*  melo-features/src/features/font/config/font_family_config.ts, XKyE, ???????????????  */
    XKyE: "Microsoft JhengHei",
    /*  melo-features/src/features/font/config/font_family_config.ts, HQYt, ?????????  */
    HQYt: "NSimSun",
    /*  melo-features/src/features/font/config/font_family_config.ts, wxhf, ?????????  */
    wxhf: "DFKai",
    /*  melo-features/src/features/font/config/font_family_config.ts, WACS, ??????  */
    WACS: "KaiTi",
    /*  melo-features/src/features/font/config/font_family_config.ts, GaeV, ??????  */
    GaeV: "FangSong",
    /*  melo-features/src/features/font/config/font_size_config.ts, tRvo, ??????  */
    tRvo: "Small 5",
    /*  melo-features/src/features/font/config/font_size_config.ts, KIXM, ??????  */
    KIXM: "Size 5",
    /*  melo-features/src/features/font/config/font_size_config.ts, pVUs, ??????  */
    pVUs: "Small 4",
    /*  melo-features/src/features/font/config/font_size_config.ts, EphO, ??????  */
    EphO: "Size 4",
    /*  melo-features/src/features/font/config/font_size_config.ts, rsMz, ??????  */
    rsMz: "Small 3",
    /*  melo-features/src/features/font/config/font_size_config.ts, kIgY, ??????  */
    kIgY: "Size 3",
    /*  melo-features/src/features/font/config/font_size_config.ts, FCuy, ??????  */
    FCuy: "Small 2",
    /*  melo-features/src/features/font/config/font_size_config.ts, lrDL, ??????  */
    lrDL: "Size 2",
    /*  melo-features/src/features/font/config/font_size_config.ts, FbyY, ??????  */
    FbyY: "Small 1",
    /*  melo-features/src/features/font/config/font_size_config.ts, MXzi, ??????  */
    MXzi: "Size 1",
    /*  melo-features/src/features/font/config/font_size_config.ts, PNfn, ??????  */
    PNfn: "Small Initial",
    /*  melo-features/src/features/font/config/font_size_config.ts, JYiF, ??????  */
    JYiF: "Initial",
    /*  melo-features/src/features/font/config/title_heading_config.ts, KxNi, ??????  */
    KxNi: "Note",
    /*  melo-features/src/features/font/panel/letter_spacing_panel.tsx, UbvE, ???????????????  */
    UbvE: "Character Spacing:",
    /*  melo-features/src/features/font/panel/letter_spacing_panel.tsx, ReHI, ??????  */
    ReHI: "Standard",
    /*  melo-features/src/features/font/panel/letter_spacing_panel.tsx, XDtz, {0}???  */
    XDtz: "{0} Pt",
    /*  melo-features/src/features/font/panel/letter_spacing_panel.tsx, THMV, ??????  */
    THMV: "Condensed",
    /*  melo-features/src/features/font/panel/letter_spacing_panel.tsx, etBF, ??????  */
    etBF: "Expanded",
    /*  melo-features/src/features/image/imagecrop/image_processor.tsx, wNPv, ???:{0} &nbsp;&nbsp;???:{1}  */
    wNPv: "Width: {0} &nbsp;&nbsp; Height: {1}",
    /*  melo-features/src/features/image/imagecrop/image_retry_toolbar.tsx, rxey, ??????  */
    rxey: "Retry",
    /*  melo-features/src/features/image/imagecrop/image_retry_toolbar.tsx, IJaS, ????????????  */
    IJaS: "Upload failed",
    /*  melo-features/src/features/image/imagecrop/image_toolbar.tsx, gFZH, ????????????  */
    gFZH: "Restore to original",
    /*  melo-features/src/features/image/imagecrop/image_toolbar.tsx, dfHA, ??????  */
    dfHA: "Zoom",
    /*  melo-features/src/features/image/ocr/ocr_capturer.tsx, uVmi, ????????????????????????????????????  */
    uVmi: "Restart app to get camera permission",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, Teic, ??????????????????  */
    Teic: "Insert photos",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, loHp, ????????????????????????  */
    loHp: "Unable to recognize text",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, iVOl, ??????  */
    iVOl: "Recognize",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, ngfY, ???????????????????????????...  */
    ngfY: "Recognizing and generating text...",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, Egfn, ??????????????????  */
    Egfn: "Extract text",
    /*  melo-features/src/features/image/ocr/ocr_display_layer.tsx, JZfE, ??????????????????  */
    JZfE: "Unable to obtain the image",
    /*  melo-features/src/features/image/ocr/ocr_manager.tsx, DkTI, ??????????????????????????????  */
    DkTI: "Recognition failed. Try again later.",
    /*  melo-features/src/features/image/ocr/ocr_manager.tsx, nKXG, ????????????  */
    nKXG: "Network error",
    /*  melo-features/src/features/image/ocr/ocr_manager.tsx, wJuy, ??????????????????  */
    wJuy: "Unable to read photos",
    /*  melo-features/src/features/image/ocr/ocr_manager.tsx, TWji, ???????????????????????????????????????  */
    TWji: "Enable camera permission in Settings",
    /*  melo-features/src/features/outline/components/outline_list.tsx, LGFv, ??????????????????  */
    LGFv: "Title is empty",
    /*  melo-features/src/features/outline/components/outline_list.tsx, ZBpx, ???????????????????????????????????????????????????????????????  */
    ZBpx: "Apply \"Title\" style to generate \"Contents\"",
    /*  melo-features/src/features/page/components/page.tsx, AgFR, ???  */
    AgFR: "Page",
    /*  melo-features/src/features/page/components/page.tsx, lmYL, ??? / ???  */
    lmYL: "of",
    /*  melo-features/src/features/page/components/page.tsx, gjXP, ???  */
    gjXP: "Page",
    /*  melo-features/src/features/page/components/page.tsx, zSfn, ??????????????????  */
    zSfn: "Enter Paging Mode",
    /*  melo-features/src/features/page/components/page.tsx, edtL, ??????????????????  */
    edtL: "Exit Paging mode",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, nEOS, ????????????  */
    nEOS: "Next Paragraph",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, hEgN, ????????????  */
    hEgN: "Last Paragraph",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, vBeU, ????????????  */
    vBeU: "Sample Text",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, tCEN, ??????  */
    tCEN: "Preview",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, Ketd, ??????  */
    Ketd: "cm",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, zdmi, ??????  */
    zdmi: "Character",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, eaEq, ??????  */
    eaEq: "Value",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, eTiN, ????????????  */
    eTiN: "Hanging",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, coMq, ????????????  */
    coMq: "First line",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, JLmp, ?????????  */
    JLmp: "(None)",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, QtJB, ????????????  */
    QtJB: "Special",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, JAwX, ??????  */
    JAwX: "Right",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, bxvR, ????????????  */
    bxvR: "Indentation Left",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, SPRm, ?????????????????????  */
    SPRm: "Snap to grid",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, aCxe, ????????????  */
    aCxe: "After",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, ceod, ????????????  */
    ceod: "Before",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, WbRJ, ?????????  */
    WbRJ: "Exactly",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, MCPW, ????????????  */
    MCPW: "Multiple",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, BTDN, ?????????  */
    BTDN: "Line Spacing",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, WxnV, ???  */
    WxnV: "At",
    /*  melo-features/src/features/paragraph/panel/paragraph_setting_panel.tsx, LEiQ, ???  */
    LEiQ: "pt",
    /*  melo-features/src/features/read_record/history_list/history_item.tsx, GiCs, ?????? {0}  */
    GiCs: "Today {0}",
    /*  melo-features/src/features/read_record/history_list/history_item.tsx, AdbF, ?????? {0}  */
    AdbF: "Yesterday {0}",
    /*  melo-features/src/features/read_record/history_list/history_item.tsx, GzOS, @??????  */
    GzOS: "@WeChat",
    /*  melo-features/src/features/read_record/history_list/history_item.tsx, TIdw, ??????  */
    TIdw: "WeChat",
    /*  melo-features/src/features/read_record/history_list/history_list.tsx, ABRe, ????????????  */
    ABRe: "Revision history",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, SBXU, ???{0}??????????????????  */
    SBXU: "({0} in total) modified the file",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, ThUR, ?????????{0}?????????  */
    ThUR: "Recovered the content of {0}",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, kEmI, ???{0}???  */
    kEmI: "{0} version",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, hlRQ, {0} ???  */
    hlRQ: "0} hour(s)",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, jYSB, ???  */
    jYSB: ",",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, eSIn, ???{0}???{1}  */
    eSIn: "{0} version {1}",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, Ybye, (??????)  */
    Ybye: "(Current)",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, wEUc, ??????????????????  */
    wEUc: "Expand detailed records",
    /*  melo-features/src/features/revision_record/history_list/history_item.tsx, JxzL, ??????????????????  */
    JxzL: "Hide detailed records",
    /*  melo-features/src/features/revision_record/record_preview/preview_editor.ts, rBmN, ???  */
    rBmN: "\u3000",
    /*  melo-features/src/features/revision_record/record_revert/record_revert.ts, PVzR, ?????????????????????????????????  */
    PVzR: "Recovery failed. Try again later.",
    /*  melo-features/src/features/revision_record/record_revert/record_revert.ts, BQAg, ???????????????????????????????????????  */
    BQAg: "Are you sure you want to recover the doc to this version?",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, vedn, ???  */
    vedn: "Bottom",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, zYDF, ???  */
    zYDF: "Up",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, TvpN, ???  */
    TvpN: "Right",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, qAgw, ???  */
    qAgw: "Left",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, ILtQ, ?????????  */
    ILtQ: "Margins",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, LwId, ???  */
    LwId: "Width",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, hyjd, ???  */
    hyjd: "Height",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, eXBD, ????????????  */
    eXBD: "Page Size",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, aXQb, ?????????  */
    aXQb: "Custom",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, JFSG, ????????????  */
    JFSG: "Page Size",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, bDNu, ??????  */
    bDNu: "Portrait",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, AeWd, ??????  */
    AeWd: "Landscape",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, tEJF, ????????????  */
    tEJF: "Orientation",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, akxI, ???????????????????????????{0}cm  */
    akxI: "The sum of top & bottom margins shall be less than {0} cm.",
    /*  melo-features/src/features/section/panel/page_setting_panel.tsx, ZNtO, ???????????????????????????{0}cm  */
    ZNtO: "The sum of left & right margins shall be less than {0} cm.",
    /*  melo-features/src/features/share/components/policy_button.tsx, VrJc, ???{0}????????????  */
    VrJc: "Collaborate with {0}",
    /*  melo-features/src/features/share/components/policy_button.tsx, oemx, ???{0}???  */
    oemx: "({0} in total)",
    /*  melo-features/src/features/share/components/policy_button.tsx, etlH, ??????????????????????????????  */
    etlH: "No friends are invited yet",
    /*  melo-features/src/features/share/components/policy_button.tsx, iRLy, ???????????????????????????  */
    iRLy: "Everyone can edit via the link",
    /*  melo-features/src/features/share/components/policy_button.tsx, kxVi, ??????  */
    kxVi: "Collaboration",
    /*  melo-features/src/features/share/components/policy_button.tsx, NxTk, ???????????????????????????  */
    NxTk: "Everyone can view via the link",
    /*  melo-features/src/features/share/components/policy_button.tsx, GnzL, ????????????????????????  */
    GnzL: "Invite others to collaborate",
    /*  melo-features/src/features/share/components/share_button.tsx, PJwz, ??????  */
    PJwz: "Share",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, rXWg, ?????????  */
    rXWg: "Refresh",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, KFZR, ?????????????????????????????????????????????  */
    KFZR: "File expired. Unable to access.",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, Sjrt, ???????????????  */
    Sjrt: "Modify the validity",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, MWQK, ?????????????????????????????????????????????  */
    MWQK: "Access link expired. Unable to access.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, PpKx, ?????????????????????????????????????????????  */
    PpKx: "Invitation sent to WeChat contacts. Please wait.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, QpOV, ??????????????????????????????????????????  */
    QpOV: "Shared. Your friend has joined the collaborator list.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, FkbA, ???????????????????????????????????????  */
    FkbA: "Changed from \"Private\" to \"Anyone Can Edit\".",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, ezsX, ???????????????????????????????????????  */
    ezsX: "Changed from \"Private\" to \"Anyone Can View\".",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, qCtJ, ????????????????????????????????????????????????????????????  */
    qCtJ: "Shared. The file has been changed from \"Private\" to \"Specified Users Can Collaborate\".",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, wRdt, ?????????????????????????????????????????????
    ????????????????????????????????????  */
    wRdt: "View only.\nSend a request to the creator for more permissions.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, oGCy, ?????????  */
    oGCy: "Failed",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, YGVE, ???????????????????????????????????????????????????  */
    YGVE: "Permission request rejected. View only.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, TplU, ?????????????????????  */
    TplU: "Submitted. Waiting for approval.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, TILf, ???????????????????????????????????????????????????  */
    TILf: "Request submitted. Waiting for approval of creator.",
    /*  melo-features/src/features/share/mobile/mobile_auth.ts, rqLg, ?????????????????????????????????  */
    rqLg: "Log in for more permissions.",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, FQKY, ?????????????????????????????????  */
    FQKY: "File cannot be accessed by others.",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, uEpT, ???????????????????????????  */
    uEpT: "File link expired",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, LcNf, ??????{0}??????????????????:   */
    LcNf: "{0} member(s) can edit it:",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, eipB, ???{0}  */
    eipB: ", {0}",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, nPNh, ???????????????????????????????????????  */
    nPNh: "Everyone can edit the file via the link.",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, dfIU, ???????????????????????????????????????  */
    dfIU: "Everyone can view the file via the link.",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, PXtT, ????????????????????????/????????????  */
    PXtT: "View/edit only by specified users",
    /*  melo-features/src/features/share/mobile/mobile_share.ts, kuge, ??????????????????/????????????  */
    kuge: "View/edit only by me",
    /*  melo-features/src/features/share/mobile/share.ts, fSVG, ????????? {0}  */
    fSVG: "Created on {0}",
    /*  melo-features/src/features/share/mobile/share.ts, kIay, ??????????????????  */
    kIay: "Unable to open file",
    /*  melo-features/src/features/share/mobile/share.ts, LApf, ????????????-????????????  */
    LApf: "Tencent Docs - Online Docs",
    /*  melo-features/src/features/share/mobile/share.ts, TjUR, ????????????  */
    TjUR: "Tencent Docs",
    /*  melo-features/src/features/table/border_panel/config.tsx, VLEf, ?????????  */
    VLEf: "No border",
    /*  melo-features/src/features/table/border_panel/config.tsx, CZeu, ????????????  */
    CZeu: "Bottom border",
    /*  melo-features/src/features/table/border_panel/config.tsx, Qhqc, ????????????  */
    Qhqc: "Right border",
    /*  melo-features/src/features/table/border_panel/config.tsx, ytUS, ????????????  */
    ytUS: "Top border",
    /*  melo-features/src/features/table/border_panel/config.tsx, Rkrc, ????????????  */
    Rkrc: "Left border",
    /*  melo-features/src/features/table/border_panel/config.tsx, RELo, ????????????  */
    RELo: "Outside border",
    /*  melo-features/src/features/table/border_panel/config.tsx, qNrf, ???????????????  */
    qNrf: "Inside vertical border",
    /*  melo-features/src/features/table/border_panel/config.tsx, ELPK, ???????????????  */
    ELPK: "Inside horizontal border",
    /*  melo-features/src/features/table/border_panel/config.tsx, SAez, ????????????  */
    SAez: "Inside border",
    /*  melo-features/src/features/table/border_panel/config.tsx, MFUd, ????????????  */
    MFUd: "All borders",
    /*  melo-features/src/features/table/border_panel/index.tsx, XJTi, ????????????  */
    XJTi: "Border Color",
    /*  melo-features/src/features/table/row_col_panel/index.tsx, tulR, ??????  */
    tulR: "Column",
    /*  melo-features/src/features/table/row_col_panel/index.tsx, aewv, ??????  */
    aewv: "Row",
    /*  melo-features/src/features/table/row_col_panel/index.tsx, WrML, ??????????????????  */
    WrML: "Custom row/column number",
    /*  melo-features/src/features/table/row_col_panel/index.tsx, gmvB, {0}X{1} ??????  */
    gmvB: "{0}X{1} sheet",
    /*  melo-features/src/features/table/table_split/modal_content.tsx, hwfU, ????????????{0}??????{1}  */
    hwfU: "Max split count {0} is {1}",
    /*  melo-features/src/features/table/table_split/modal_content.tsx, dOQE, ?????????{0}??????????????????  */
    dOQE: "Enter the multiple or factor of {0}",
    /*  melo-features/src/features/tdocs_titlebar_mobile/components/mobile_titlebar.tsx, PMlh, ????????????  */
    PMlh: "Log in now",
    /*  melo-features/src/features/tdocs_titlebar_mobile/components/mobile_titlebar.tsx, eFVB, ???????????????????????????????????????????????????????????????????????????????????????????????????  */
    eFVB: "No network connection. The edits have been saved locally, and will be synchronized to the cloud automatically when the network is available.",
    /*  melo-features/src/features/voice_input/components/voice_input_guide.tsx, YfKh, ??????????????????????????????????????????  */
    YfKh: "Tap & talk to convert speech to text",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, txdN, ?????????????????????  */
    txdN: "Tap & talk",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, tEjF, ??????????????????...  */
    tEjF: "Recognizing speech...",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, NsIJ, ??????????????????????????????  */
    NsIJ: "Recording paused. Tap to continue.",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, bMEJ, ??????????????????????????????  */
    bMEJ: "Recording...Please keep talking.",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, hdbC, ??????????????????..??  */
    hdbC: "Recognizing speech..\xA0",
    /*  melo-features/src/features/voice_input/components/voice_input_hint.tsx, GTIZ, ??????????????????.????  */
    GTIZ: "Recognizing speech.\xA0\xA0",
    /*  melo-features/src/features/voice_input/components/voice_input_panel.tsx, xGkl, ???????????????????????????????????????  */
    xGkl: "Release to start. Do not hold.",
    /*  melo-features/src/features/voice_input/components/voice_input_panel.tsx, VoLf, ?????????????????????  */
    VoLf: "Voice recording ended",
    /*  melo-features/src/features/voice_input/errors/voice_input_error_config.ts, TIcJ, ???????????????????????????????????????  */
    TIcJ: "An error occurred. Try again later",
    /*  melo-features/src/features/voice_input/errors/voice_input_error_config.ts, RQNA, ????????????????????????????????????  */
    RQNA: "Mic is occupied by another app.",
    /*  melo-features/src/features/voice_input/errors/voice_input_error_config.ts, zCmw, ???????????????????????????????????????  */
    zCmw: "Grant system mic permission and try again",
    /*  melo-features/src/features/voice_input/errors/voice_input_error_config.ts, iQUn, ?????????????????????????????????  */
    iQUn: "Network exception. Unable to record",
    /*  melo-features/src/features/zoom_mobile/components/mobile_zoom_status.tsx, RMhI, ????????????300%  */
    RMhI: "Max.: 300%",
    /*  melo-features/src/features/zoom_mobile/components/mobile_zoom_status.tsx, XuVx, ????????????100%  */
    XuVx: "Min.: 100%",
    /*  melo-features/src/features/zoom_mobile/components/mobile_zoom_status.tsx, CVIF, ?????????{0}%  */
    CVIF: "Zoom: {0}%",
    /*  melo-features/src/features/zoom_pc/components/zoom_status.tsx, EDum, {0}+0 ???????????? 100%  */
    EDum: "{0}+0 Recover to 100%",
    /*  melo-features/src/workbench/toolbar/components/toolbar_more_button.tsx, TbAh, ????????????  */
    TbAh: "More features",
    /*  melo-features/src/features/image/imageviewer/mobile/components.jsx, bBEf, ????????????  */
    bBEf: "Loading failed",
    /*  melo-features/src/features/presentation/components/menu_button/doc_presentation_button.tsx, eoWr, ????????????  */
    eoWr: "Demo Mode",
    /*  melo-features/src/features/presentation/components/toolbar/doc_presentation_toolbar.tsx, qemV, ????????????  */
    qemV: "End demo",
    /*  melo-features/src/features/presentation/components/toolbar/doc_presentation_toolbar.tsx, lrDH, ?????????  */
    lrDH: "Laser pointer",
    /*  melo-features/src/features/tdocs_titlebar/components/collab_status/animation_icon.tsx, WDNX, ???????????????{0}  */
    WDNX: "Recently saved: {0}",
    /*  melo-features/src/features/tdocs_titlebar/components/collab_status/animation_icon.tsx, ghNt, ????????????????????????  */
    ghNt: "Auto save all",
    /*  melo-features/src/features/tdocs_titlebar/components/collab_status/collab_status_tips.tsx, eOLG, ??????????????????  */
    eOLG: "Editing offline",
    /*  melo-features/src/features/tdocs_titlebar/components/collab_status/collab_status_tips.tsx, kCEz, ???????????? {0}  */
    kCEz: "Recently saved {0}",
    /*  melo-features/src/features/tdocs_titlebar/components/collab_status/collab_status_tips.tsx, lUtO, ????????????  */
    lUtO: "Saved",
    /*  melo-features/src/features/tdocs_titlebar/components/doc_title/title.tsx, DeRm, ??????????????????????????????????????????\ / : * ? " < > |  */
    DeRm: "File name cannot contain , /, :, *, ?, \", <, >, or |",
    /*  melo-features/src/features/tdocs_titlebar/components/login_banner/login_banner.tsx, LVfn, ?????????????????????????????????????????????????????????  */
    LVfn: "View only. Log in for more permissions.",
    /*  melo-features/src/features/tdocs_titlebar/components/readonly_tips/readonly_popover.tsx, zhaW, ?????????????????????????????????????????????????????????????????????????????????  */
    zhaW: "View only. Send a request to the creator for more permissions.",
    /*  melo-features/src/features/tdocs_titlebar/components/readonly_tips/readonly_tips.tsx, rxXB, ??????????????????????????????????????????????????????????????????????????????  */
    rxXB: "View only. Log in for more permissions.",
    /*  melo-features/src/features/tdocs_titlebar/components/readonly_tips/readonly_tips.tsx, RuvA, ????????????  */
    RuvA: "View only",
    /*  melo-features/src/features/tdocs_titlebar/components/readonly_tips/readonly_tips.tsx, hNQt, ?????????????????????????????????????????????????????????????????????  */
    hNQt: "View only. Click to apply for edit permission.",
    /*   , VbAW, ??????????????????????????????????????????\ / : * ? " < > |  */
    VbAW: "File name cannot contain: \n, /, :, *, ?, \", <, >, or |",
    /*   , Slzy, ???????????????.!?]  */
    Slzy: "\n\u3002\uFF01\uFF1F\u2026\u2026.!?]",
    /*   , Wydv, ?????????????????????????????????????????????
    ????????????????????????????????????  */
    Wydv: "View only.\nSend a request to the creator for more permissions.",
    /*   , fWXC, ??????  */
    fWXC: "Comments",
    /*   , fWXD, ????????????  */
    fWXD: "Open Comments",
    /*   , fWXE, ??????  */
    fWXE: "Add Comments",
    /*   , fWXF, ??????  */
    fWXF: "Forward",
    /*   , fWXG, ??????  */
    fWXG: "Comments",
    /*   , fWXH, ??????  */
    fWXH: "Crop",
    /*   , fWXI, ??????  */
    fWXI: "Reset",
    /*  melo-features/src/features/attachment/configs.tsx, KHwq, ?????????  */
    KHwq: "WeDoc",
    /*  melo-features/src/features/attachment/configs.tsx, TDmS, ??????  */
    TDmS: "Formats",
    /*  melo-features/src/features/attachment/utils.tsx, Qebx, ??????  */
    Qebx: "OK",
    /*  melo-features/src/features/attachment/utils.tsx, yvUC, ???????????????  */
    yvUC: "Select WeDoc Files",
    /*  melo-features/src/features/attachment/utils.tsx, NPHm, ??????????????????  */
    NPHm: "Select Wedrive Files",
    /*  melo-features/src/features/comment_wedoc/comment_wedoc_handler.tsx, LKet, ?????????  */
    LKet: "OK",
    /*  melo-features/src/features/comment_wedoc/comment_wedoc_handler.tsx, PKYn, ?????????????????????????????????????????????????????????????????????????????????  */
    PKYn: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/fieldcode_qwx_todo_handler.ts, YGfB, ?????????????????????????????????????????????  */
    YGfB: "",
    /*  melo-features/src/features/fieldcode_wedrive_file/fieldcode_wedrive_file_handler.tsx, gYNI, ????????????????????????  */
    gYNI: "Get share link failed",
    /*  melo-features/src/features/image/image_handler.tsx, gBzd, ?????????????????????????????????????????????????????????  */
    gBzd: "",
    /*  melo-features/src/features/qwx_todo/qwx_todo_handler.tsx, DQzt, ??????????????????  */
    DQzt: "Add todos failed",
    /*  melo-features/src/features/qwx_todo/qwx_todo_handler.tsx, gfWi, ???????????????  */
    gfWi: "Todo has been cancelled",
    /*  melo-features/src/features/spellcheck/spellcheck_util.ts, BxYh,
    ???????????????.!?]  */
    BxYh: "",
    /*  melo-features/src/features/attachment/components/insert_pic.tsx, fCzI, ????????????????????????  */
    fCzI: "Select local images",
    /*  melo-features/src/features/attachment/components/insert_wedoc.tsx, eghH, ????????????  */
    eghH: "Recent files",
    /*  melo-features/src/features/attachment/components/insert_wedoc.tsx, uMfW, ?????????????????????  */
    uMfW: "Select from WeDoc files",
    /*  melo-features/src/features/attachment/components/insert_wedrive.tsx, ovMd, ??????????????????  */
    ovMd: "Select from Wedrive files",
    /*  melo-features/src/features/attachment/components/wedrive_file_list.tsx, ChfD, ?????????????????????  */
    ChfD: "View all WeDoc files",
    /*  melo-features/src/features/attachment/components/wedrive_file_list.tsx, CITV, ????????????????????????  */
    CITV: "View all Wedrive files",
    /*  melo-features/src/features/attachment/lib/file.js, VzFf, {0}????????????  */
    VzFf: "Expired in {0} days",
    /*  melo-features/src/features/attachment/lib/file.js, LHBV, ????????????  */
    LHBV: "Expired soon",
    /*  melo-features/src/features/attachment/lib/file.js, kWqQ, {0}???????????????  */
    kWqQ: "Expired in {0} hours",
    /*  melo-features/src/features/attachment/lib/file.js, wOHy, ????????????  */
    wOHy: "Permanent",
    /*  melo-features/src/features/attachment/lib/file.js, sSxu, ?????????  */
    sSxu: "Expired",
    /*  melo-features/src/features/audio/manager/audio_manager.tsx, lncx, ???????????????????????????????????????  */
    lncx: "",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, aYEz, ??????????????????????????????????????????????????????  */
    aYEz: "",
    /*  melo-features/src/features/comment/panel_component/comment_block.tsx, NyGT, ??????????????????????????????????????????????????????  */
    NyGT: "",
    /*  melo-features/src/features/comment/panel_component/comment_item.tsx, TXNg,  ?????????  */
    TXNg: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, aeFi, ????????????  */
    aeFi: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, jVGL, ???  */
    jVGL: "Me",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, FyHx, ????????????  */
    FyHx: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, mfcq, ??????  */
    mfcq: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, VeMy, ???????????????  */
    VeMy: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, vQAR, ??????????????????  */
    vQAR: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, qRPh, ?????? HH:MM  */
    qRPh: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, wusp, mm???dd??? HH:MM  */
    wusp: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, yFHt, yyyy???mm???dd??? HH:MM  */
    yFHt: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, fEWA, ?????????  */
    fEWA: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, dyjP, ?????????  */
    dyjP: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, mgIV, ?????????  */
    mgIV: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, XJhH, ?????????  */
    XJhH: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, ZoWg, ?????????  */
    ZoWg: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, SlRk, ?????????  */
    SlRk: "",
    /*  melo-features/src/features/fieldcode_qwx_todo/components/qwx_todo.tsx, gzHu, ?????????  */
    gzHu: "",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, wOvP, ?????????????????????????????????????????????  */
    wOvP: "",
    /*  melo-features/src/features/share/mobile/advanced_permissions.ts, UArh, ??????????????????????????????  */
    UArh: "",
    /*  qwx_todo/components/qwx_todo.tsx, todo, ??????  */
    todo: "Upcoming",
    /*  qwx_todo/components/qwx_todo.tsx, t_upgrade, ?????????????????????????????????  */
    t_upgrade: "",
    /*  qwx_todo/components/qwx_todo.tsx, t_install, ?????????????????????APP??????????????????  */
    t_install: "",
    /*  melo-features/src/features/attachment/configs.tsx, gyGJ, ??????????????????????????????????????????  */
    gyGJ: "Insert styles, pictures, micro documents, files",
    mentionat: "@mention someone to view this doc",
    /*  melo-features/src/features/attachment/configs.tsx, ahbN, ????????????  */
    ahbN: "add files",
    /*  melo-features/src/features/attachment/configs.tsx, xRCm, ???????????????  */
    xRCm: "Add Micro Document",
    /*  melo-features/src/features/attachment/configs.tsx, YdzO, ????????????  */
    YdzO: "Insert style",
    /*  melo-features/src/features/fieldcode_wedrive_file/fieldcode_wedrive_file_handler.tsx, nCok, ????????????????????????  */
    nCok: "You have opened the current document.",
    /*  melo-features/src/features/attachment/components/insert_wedrive.tsx, cShl, ??????????????????  */
    cShl: "Upload local file",
    /*  melo-features/src/features/attachment/file_uploader/file_uploader_manager.ts, nrIa, ???????????? {0} ??????????????????  */
    nrIa: "Failed to upload file {0}.Please retry.",
    /*  melo-features/src/features/attachment/file_uploader/file_uploader_manager.ts, jJgu, ???????????????????????????  */
    jJgu: "Upload folder is not supported temporarily.",
    /*  melo-features/src/features/fieldcode_wedrive_file/components/wedrive_file.tsx, dcTk, ???????????????  */
    dcTk: "Show original link",
    /*  melo-features/src/features/fieldcode_wedrive_file/components/wedrive_file.tsx, EZtL, ???????????????  */
    EZtL: "Edit link",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, Ednt, {0}??????  */
    Ednt: "{0} Remind",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, EgpP, ????????????  */
    EgpP: "Remind Me",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, Zsja, ????????????  */
    Zsja: "Edit Remind",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, rCGY, ??????  */
    rCGY: "Clear",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, eACD, ????????????  */
    eACD: "Remind Time",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, VaAN, ????????????????????????  */
    VaAN: "Add and notify participants.",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, jflx, MM???dd??? hh:mm  */
    jflx: "M/dd hh:mm",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, mDQW, @???????????????????????????  */
    mDQW: "@Colleagues to create a to-do",
    /*  melo-features/src/features/list_qwx_todo/components/list_qwx_todo_decorator.tsx, XKRE, @???????????????????????????  */
    XKRE: "@ member assigns tasks",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_block.tsx, mCnW, ??????????????????  */
    mCnW: "View response comments",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_block.tsx, Ddwa, ???????????????  */
    Ddwa: "Respond with comments",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_block.tsx, eBnN, @??????  */
    eBnN: "@ Me",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_manager.tsx, CjOM, ????????????@  */
    CjOM: "In the document @",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_manager.tsx, fDGa,  [??????]{0}   */
    fDGa: " [link]{0} ",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_manager.tsx, fyoH,  [?????????]{0}   */
    fyoH: " [Doc]{0} ",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_manager.tsx, ZcaO,  [????????????]{0}   */
    ZcaO: " [File]{0} ",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_manager.tsx, XDNd,  [??????]   */
    XDNd: " [image] ",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_panel.tsx, ypuM, ?????????????????????@??????  */
    ypuM: "No mention at the moment",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_panel.tsx, alxD, ?????????{0}???  */
    alxD: "Mentioned {0} times",
    /*  melo-features/src/features/fieldcode_atpanel/fieldcode_atpanel_panel.tsx, rHSO, @??????  */
    rHSO: "@mine",
    /*  melo-features/src/features/fieldcode_atpanel/configs.tsx, rHSk, ????????????@  */
    rHSk: "@ In the documentation",
    /*  melo-features/src/features/placeholder/placeholder_handler.tsx, eQid, ???????????? ???+??? ??????????????????  */
    eQid: "Try typing '+' to quickly insert content",
    /*  melo-features/src/features/placeholder/placeholder_handler.tsx, DyeL, ??????@?????? ??????????????????  */
    DyeL: "Try @ colleague Remind the other party to view",
    /*   , FRIO, ?????????  */
    FRIO: "completed",
    /*   , jGIP, ?????????  */
    jGIP: "undone",
    /*   , AlFs, ????????????  */
    AlFs: "All Font Style",
    /*  melo-features/src/features/image/copypaste/copy_image.ts, uSjK, [??????]  */
    uSjK: "[\u5716\u7247]"
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  quick_menu/quick_actions.ts, BeJW, ?????????????????????????????????.  */
    BeJW: "Insert an image into this document",
    /*  quick_menu/quick_actions.ts, jeoq, ??????????????????.  */
    jeoq: "Insert a link",
    /*  quick_menu/quick_actions.ts, pPma, ??????  */
    pPma: "Code",
    /*  quick_menu/quick_actions.ts, abFW, ?????????????????????????????????.  */
    abFW: "Embed a code block in the article",
    /*  quick_menu/quick_actions.ts, ngRu, ?????????????????????.  */
    ngRu: "Add a divider",
    /*  quick_menu/quick_actions.ts, amub, ?????????????????????????????????.  */
    amub: "Embed a table with 3 rows and 4 columns",
    /*  quick_menu/quick_actions.ts, CSZt, ??????  */
    CSZt: "Content",
    /*  quick_menu/quick_actions.ts, cYkT, ??????  */
    cYkT: "Number",
    /*  quick_menu/quick_actions.ts, eysa, ?????????????????????????????????.  */
    eysa: "Create a simple number sequence",
    /*  quick_menu/quick_actions.ts, NoqE, ?????????????????????????????????.  */
    NoqE: "Create a simple dot sequence",
    /*  quick_menu/quick_actions.ts, tgSw, ??????  */
    tgSw: "Task",
    /*  quick_menu/quick_actions.ts, UGiy, ??????????????????????????????.  */
    UGiy: "Use the Task feature to track tasks",
    /*  quick_menu/quick_actions.ts, hBEc, ??????3  */
    hBEc: "H3",
    /*  quick_menu/quick_actions.ts, ElCn, ?????????.  */
    ElCn: "Subheading",
    /*  quick_menu/quick_actions.ts, jdHG, ??????2  */
    jdHG: "H2",
    /*  quick_menu/quick_actions.ts, ugUS, ?????????.  */
    ugUS: "Heading",
    /*  quick_menu/quick_actions.ts, KzVh, ??????1  */
    KzVh: "H1",
    /*  quick_menu/quick_actions.ts, xRup, ?????????.  */
    xRup: "Headline",
    /*  quick_menu/components/quick_menu.tsx, Wesn, ???????????????  */
    Wesn: "No results",
    /*  quick_menu/components/quick_menu.tsx, GogA, ??????  */
    GogA: "File",
    /*  quick_menu/components/quick_menu.tsx, kmXW, ??????????????????  */
    kmXW: "Upload Local File",
    /*  quick_menu/components/quick_menu.tsx, AUpg, ?????????????????????...  */
    AUpg: "View All WeDoc Files...",
    /*  quick_menu/components/quick_menu.tsx, cHpg, ????????????????????????...  */
    cHpg: "View All WeDrive Files...",
    /*  quick_menu/components/quick_menu.tsx, erBa, ??????  */
    erBa: "All",
    /*  quick_menu/components/wedoc_file_selector.tsx, ARyd, ????????????  */
    ARyd: "No file",
    /*  quick_menu/components/wedoc_file_selector.tsx, UQrT, ??????  */
    UQrT: "Recent"
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /* src/common/Alert.vue, ??? */
    h_eDQq: ".",
    /* src/common/Alert.vue, ?????? */
    h_eGVh: "Cancel",
    /* src/common/Alert.vue, ?????? */
    h_oxvr: "OK",
    /* src/common/Alert.vue, ???????????? */
    h_tLxi: "Online Docs",
    /* src/common/MessageDialog.vue, ??????????????????????????? */
    h_YuAj: "Clear all notifications?",
    /* src/common/MessageDialog.vue, ???????????? */
    h_dMsH: "No message",
    /* src/common/MessageDialog.vue, ?????? */
    h_WFza: "Clear",
    /* src/common/MessageDialog.vue, ???????????? */
    h_AYdw: "Tag all as read",
    /* src/common/MessageDialog.vue, ?????? */
    h_BMkI: "Notification",
    /* src/common/MessageDialog.vue, ????????????@???????????? */
    h_YZLf: "has viewed your @",
    /* src/common/MessageDialog.vue, ????????????@?????? */
    h_BIEK: "@ you in doc",
    /* src/common/MessageDialog.vue, ?????????{0} */
    h_vpQK: "deleted {0}",
    /* src/common/MessageDialog.vue, ??????????????? */
    h_nxDI: "exited the collaboration",
    /* src/common/MessageDialog.vue, ?????????????????????{0} */
    h_lYeh: "changed your permission to {0}",
    /* src/common/MessageDialog.vue, ???????????????????????? */
    h_daWi: "removed you from collaboration members",
    /* src/common/MessageDialog.vue, ????????????????????? */
    h_SARu: "invites you to join",
    /* src/common/MessageDialog.vue, ???????????? */
    h_NBnp: "commented on your post",
    /* src/common/MessageDialog.vue, ????????????@?????? */
    h_NgQh: "@ you in comment",
    /* src/common/MessageDialog.vue, ??????????????? */
    h_SRZb: "No read/write permission",
    /* src/common/MessageDialog.vue, ????????? */
    h_DqGw: "Allow edit",
    /* src/common/MessageDialog.vue, ????????? */
    h_qOdg: "Comment only",
    /* src/common/MessageDialog.vue, mm???dd??? HH:MM */
    h_IDVS: "mm/dd HH:MM",
    /* src/common/MessageDialog.vue, ??????????????? */
    h_voKh: "Shared folder",
    /* src/common/MessageDialog.vue, ????????? */
    h_pleL: "Folder",
    /* src/common/MessageDialog.vue, ?????? */
    h_ARCr: "Sheet",
    /* src/common/MessageDialog.vue, ?????? */
    h_sgTz: "Doc",
    /* src/common/MessageDialog.vue, {0}?????????{1} */
    h_Nxaw: "{0} deleted {1}",
    /* src/common/MessageDialog.vue, {0}??????????????? */
    h_KuFE: "{0} exited the collaboration",
    /* src/common/MessageDialog.vue, {0}?????????????????????????????? */
    h_aVyB: "{0} removed you from collaboration members",
    /* src/common/PermissionDialog.vue, ?????? */
    h_oEDH: "Add",
    /* src/common/PermissionDialog.vue, ?????????????????????????????????????????????????????????????????? */
    h_cwYQ: "Members have the permission to edit, comment and view all files in the folder.",
    /* src/common/PermissionDialog.vue, ????????? */
    h_ZEBS: "Creator",
    /* src/common/PermissionDialog.vue, ????????? */
    h_ArWN: "No permission",
    /* src/common/PermissionDialog.vue, ??????????????? */
    h_AvRr: "No contact",
    /* src/common/PermissionDialog.vue, ?????????????????? */
    h_ytwO: "No collaboration members",
    /* src/common/PermissionDialog.vue, ??????????????? */
    h_uJNw: "My contacts",
    /* src/common/PermissionDialog.vue, ???????????? */
    h_Oeyw: "Collaboration members",
    /* src/common/PermissionDialog.vue, ??????????????????????????? */
    h_yqFG: "Add from my contacts",
    /* src/common/PermissionDialog.vue, ????????????????????????????????????????????? */
    h_hqDc: "You cannot click to copy to clipboard in this browser",
    /* src/common/PermissionDialog.vue, ???????????????????????? */
    h_mnKq: "Failed to get link",
    /* src/common/PermissionDialog.vue, ???????????? */
    h_SHfI: "Copied",
    /* src/common/PermissionDialog.vue, {0}???{1}??? */
    h_MtXc: "{0} [{1}]",
    /* src/common/PermissionDialog.vue, ????????????????????????????????????????????? */
    h_POvd: "Collaboration members cannot be added via link",
    /* src/common/PermissionDialog.vue, ????????????{0}????????????????????????????????? */
    h_BGdb: "{0} members can only comment and view the file via the link",
    /* src/common/PermissionDialog.vue, ????????????{0}??????????????????????????????????????? */
    h_XqJr: "{0} members can edit, comment and share the file via the link",
    /* src/common/PermissionDialog.vue, ???????????????????????????????????????????????????????????? */
    h_jLGF: "Company members can edit, comment and share the file via the link",
    /* src/common/PermissionDialog.vue, ???????????? {0} ??? */
    h_wnYl: "Remove {0}?",
    /* src/common/PermissionDialog.vue, ?????????????????????????????????????????????????????? */
    h_eqPB: "Login status for Exmail has expired. Log in again?",
    /* src/common/PermissionDialog.vue, ???????????? */
    h_fPuG: "Adding failed",
    /* src/common/PermissionDialog.vue, ????????? */
    h_bQPH: "Disabled",
    /* src/common/PermissionDialog.vue, ?????????????????????????????? */
    h_UpbW: "Copy link and add collaboration members",
    /* src/common/PermissionDialog.vue, ?????????????????? */
    h_GPgQ: "Share by email",
    /* src/common/PermissionDialog.vue, ????????????????????????????????? */
    h_eYgi: "Add from Exmail contacts",
    /* src/common/PermissionDialog.vue, ????????????????????????????????? */
    h_MuHQ: "Add from WeChat Work contacts",
    /* src/common/PermissionDialog.vue, ?????????????????? */
    h_wXTh: "Remove collaboration members",
    /* src/common/PermissionDialog.vue, ???????????????????????? */
    h_oqRB: "Comment and view only",
    /* src/common/PermissionDialog.vue, ????????????????????????????????? */
    h_hsfe: "Allow edit, comment and view",
    /* src/common/PermissionDialog.vue, ???????????????????????????????????? */
    h_FUNG: "Disable adding collaboration members by link",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_phcg: "Link permission",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_XgJp: "Share by link",
    /* src/common/PermissionSheet.vue, {0}??????????????????{1}????????????????????? */
    h_XBVG: "{0} invites you to join \"{1}\". Click to join.",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_Olsn: "Copy failed",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_utJN: "Copy link",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_HzxY: "Forward by link",
    /* src/common/PermissionSheet.vue, ???????????? */
    h_CPYN: "Close link",
    /* src/lib/axiosConfig.js, cgi?????????????????????{0} {1} */
    h_UMyW: "Request busy. {0} {1}",
    /* src/lib/axiosConfig.js, cgi?????????????????????{0} {1} */
    h_TiNR: "Request error. {0} {1}",
    /* src/lib/axiosConfig.js, ???????????????????????????????????? */
    h_leWi: "Identity status expired. Open again.",
    /* src/lib/axiosConfig.js, cgi?????????????????????{0}  */
    h_dtBr: "Request error. {0}",
    /* src/mixins/OnlineUsersMixin.js, ?????? */
    h_OTLQ: "Wechat",
    /* src/pages/EditorModule/components/AtTarget.vue, @?????? */
    h_uDpB: "@ you",
    /* src/pages/EditorModule/components/AtTarget.vue, ????????????????????? */
    h_WqOP: "Select from Contacts...",
    /* src/pages/EditorModule/components/AtTarget.vue, ??????@?????? */
    h_uLfS: "@ you",
    /* src/pages/EditorModule/components/AtTarget.vue, ?????? */
    h_tHVp: "@ you in \"",
    /* src/pages/EditorModule/components/AtTarget.vue, ??????????????? @??????????????????????????? */
    h_EMWT: "@ canceled. The other user will not receive the notification.",
    /* src/pages/EditorModule/components/Comment.vue, ???????????? */
    h_EVNU: "Quote and forward",
    /* src/pages/Footer/components/WebFooter.vue, ????????????????????????????????? */
    h_ckEn: "Scan the QR code via WeChat or WeChat Work",
    /* src/pages/Footer/components/WebFooter.vue, ?????? */
    h_CAes: "Download",
    /* src/pages/Footer/components/WebFooter.vue, ???????????? */
    h_lTme: "Download Now",
    /* src/pages/Footer/components/WebFooter.vue, ??????????????? */
    h_kLyP: "Rich text style",
    /* src/pages/Footer/components/WebFooter.vue, @????????? */
    h_wKUh: "Notifications for @",
    /* src/pages/Footer/components/WebFooter.vue, ???????????? */
    h_WdNH: "Collaborative editing",
    /* src/pages/Footer/components/WebFooter.vue, ????????????????????????????????????????????? */
    h_ARsU: "Download WeChat Work for more collaboration features",
    /* src/pages/Footer/components/WxFooter.vue, ?????????????????????????????? */
    h_ECWJ: "Collaborate with colleagues efficiently in WeChat Work",
    /* src/pages/HeaderBar/components/DrivePaths.vue, ??????????????? */
    h_AbEg: "Add to WeDrive",
    /* src/pages/HeaderBar/components/DrivePaths.vue, ????????????????????? */
    h_add_dir: "Add to other Directory",
    /* src/pages/HeaderBar/components/DrivePaths.vue, ???????????? */
    h_in_dir: "Directory",
    /* src/pages/HeaderBar/components/FileName.vue, ??????????????? */
    h_HUYX: "Untitled sheet",
    /* src/pages/HeaderBar/components/FileName.vue, ??????????????? */
    h_AwNe: "Untitled document",
    /* src/pages/HeaderBar/components/FileName.vue, ??????????????? */
    h_AMFI: "File name too long",
    /* src/pages/HeaderBar/components/FileName.vue, ????????????????????? : {0} */
    h_gbRB: "File name cannot contain: {0}",
    /* src/pages/HeaderBar/components/FileName.vue, ?????? */
    h_bhBW: "Title",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ?????????????????? */
    h_gptH: "File History",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ???????????????????????????????????? */
    h_rins: "The creator disabled download for this file",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ????????? */
    h_JQxn: "Username",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ?????? */
    h_rcuX: "?",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ?????? ??? */
    h_vdrx: "Delete",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ???????????????????????????????????????????????????????????? */
    h_nSGt: "After deletion, it will be removed from your online docs and will not be shared.",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ???????????? */
    h_bXNl: "Unable to open",
    /* src/pages/HeaderBar/components/HeaderBar.vue, ???????????????????????? */
    h_slgr: "Added to online docs",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ??????????????? */
    h_smxu: "Help & Feedback",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_daeE: "Page Layout",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????? */
    h_pdOS: "Print",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????????????????????????????? */
    h_eFLW: "The creator disabled export for this file",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????? */
    h_SJhB: "Export",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_tGIv: "History",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????????????????? */
    h_dYtH: "Get link",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_Wbuo: "Permissions",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????????????????? */
    h_cPWg: "View in WeDrive",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????????????????? */
    h_kpyH: "View browsing history",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???) */
    h_PNVn: "people)",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_AwTz: "Accessing",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????????: {0} */
    h_WIqP: "Save in WeDrive: {0}",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????? */
    h_JfLw: "External",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????????????????????????????? */
    h_renS: "External users are allowed to access this document.",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????????????????? */
    h_IeEn: "Auto save all",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_ebfi: "Specified members",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ???????????? */
    h_PUHK: "Company members",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ????????? */
    h_NJlF: "Only you",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ????????? */
    h_SwhA: "Exporting",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ?????????????????????????????? */
    h_zGdC: "Export failed. Try again later.",
    /* src/pages/HeaderBar/components/HeaderBarWework.vue, ??????????????? */
    h_tGIw: "Resolved Comments",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, ?????? */
    h_YmIz: "Rollback",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, ?????????????????? */
    h_ntlv: "Edit History",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, mm???dd??? */
    h_Lpik: "mm/dd",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, ??? */
    h_CVme: ", ",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, {0}???{1}??? */
    h_rGUb: "{0} etc. ({1})",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, {0}???{1}???{2}??? */
    h_RDqM: "{1}/{2}/{0}",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, {0}???{1}??? */
    h_Qmeq: "{0}/{1}",
    /* src/pages/HeaderBar/components/HistoryOperationDialog.vue, ???????????? {0} ??????????????? */
    h_jrDF: "Rollback to version {0}?",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ?????? */
    h_obvQ: "All",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ????????????????????????????????????????????? */
    h_tJbw: "Unable to move a file/folder to its directory",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ???????????? */
    h_CQuV: "Failed to move",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ??????????????????????????? */
    h_OuwY: "A shared folder cannot be moved",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ??????????????? */
    h_HIcg: "No permission to move",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ????????????????????????????????? */
    h_vruP: "Unable to move to its folder",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ???????????????????????? */
    h_seQj: "Shared directory cannot be moved",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ????????????????????????????????????????????? */
    h_AXxE: "Unable to move others' files to shared folder",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ????????????????????????????????????????????? */
    h_JMcm: "Unable to remove others' files from shared folder",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ?????? */
    h_WBRz: "Move",
    /* src/pages/HeaderBar/components/MoveFileAndFolderDialog.vue, ????????? */
    h_MyBK: "Move:",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????????????????????????????? */
    h_cwkh: "The creator disabled watermark",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ??????????????? */
    h_phKg: "No watermark",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????????????????????????????????????????????????????? */
    h_gKzo: "Once selected, the collaborator's name will be displayed as watermark when he or she access the file.",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????? */
    h_YIvb: "Show Watermark",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ?????????????????????????????????????????? */
    h_DatK: "The creator allows collaboration members to download the file",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????? */
    h_fori: "Download allowed",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ?????????????????????????????????????????? */
    h_WaVG: "The creator does not allow collaboration members to download the file",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????? */
    h_EQrF: "Download not allowed",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ????????????????????????????????????????????????????????? */
    h_iqgr: "The creator does not allow external users to access the file via link",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ?????????????????? */
    h_isof: "Restrict external access",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ????????????????????????????????????????????????????????? */
    h_GJDV: "The creator allows external users to access the file via link",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ?????????????????? */
    h_LXWu: "Allow external access",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????????????????????????????????????????? */
    h_deZp: "Once selected, all collaboration members can download the file.",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????????????????????????????????????????????????????? */
    h_DulG: "Once selected, external users can download the file.",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ?????? */
    h_Dpbd: "Confirm",
    /* src/pages/HeaderBar/components/SecurityDialog.vue, ???????????? */
    h_vbha: "Security Settings",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_WwCP: "Hyperlink",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_ympt: "Upload images",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_QIyD: "Task list",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_CsTr: "Ordered list",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_nYJX: "Unordered list",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_GNcn: "Align Right",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_qtcN: "Align Center",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_trzV: "Align Left",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_WcMO: "Font Color",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_vINk: "Middle line",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_feoM: "Italic",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_eqUW: "Bold",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_ESgn: "More",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_lJAt: "@",
    /* src/pages/Toolbar/components/ToolBar.vue, ??????????????? */
    h_xofW: "Find and replace",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_oPsR: "Font Size",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_pseQ: "Font Style",
    /* src/pages/Toolbar/components/ToolBar.vue, ???????????? */
    h_gcpu: "Clear formatting",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_UsCx: "Format painter",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_KPbS: "Size 7",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_tlRw: "Small 6",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_pFTU: "Size 6",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_ybRJ: "Small 5",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_gctV: "Size 5",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_nMCz: "Small 4",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_zPwv: "Size 4",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_gXfC: "Small 3",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_VFcr: "Size 3",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_Mpwg: "Small 2",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_jlyT: "Size 2",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_UrIg: "Small 1",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_YfTH: "Size 1",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_RuMj: "Small Initial",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_LVCm: "Initial",
    /* src/pages/Toolbar/components/ToolBar.vue, ?????? */
    h_KzfL: "Content",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_iYfv: "Subheading",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_sGfm: "Heading",
    /* src/pages/Toolbar/components/ToolBar.vue, ????????? */
    h_TSut: "Headline",
    /* src/pages/Toolbar/lib/fonts.js, ???????????? */
    h_XdyI: "Microsoft YaHei",
    /* src/pages/Toolbar/lib/fonts.js, ???????????? */
    h_JEOF: "STKaiTi",
    /* src/pages/Toolbar/lib/fonts.js, ???????????? */
    h_KBVg: "STFangSong",
    /* src/pages/Toolbar/lib/fonts.js, ???????????? */
    h_pzLH: "STSong",
    /* src/pages/Toolbar/lib/fonts.js, ?????? */
    h_JegH: "PingFang",
    /* src/pages/Toolbar/lib/fonts.js, ????????????????????? */
    h_wuKG: "Hiragino Sans GB",
    /* src/pages/Toolbar/lib/fonts.js, ?????? */
    h_JcsO: "HeiTi",
    /* src/pages/Toolbar/lib/fonts.js, ?????? */
    h_HFWo: "Song",
    /* src/pages/Toolbar/lib/fonts.js, ???????????? */
    h_tAPd: "PMingLiU",
    /* src/pages/Toolbar/lib/fonts.js, ??????????????? */
    h_vWgs: "Microsoft JhengHei",
    /* src/pages/Toolbar/lib/fonts.js, ????????? */
    h_sxay: "NSimSun",
    /* src/pages/Toolbar/lib/fonts.js, ????????? */
    h_zOYF: "DFKai",
    /* src/pages/Toolbar/lib/fonts.js, ?????? */
    h_uvrj: "KaiTi",
    /* src/pages/Toolbar/lib/fonts.js, ?????? */
    h_flQk: "FangSong",
    /*  src/pages/HeaderBar/components/HeaderBarWework.vue, bxnE, ????????????  */
    bxnE: "Resolved Comments"
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  src/comment_data/define.ts, XfJE, ???  */
    XfJE: "?",
    /*  src/comment_data/define.ts, fTtU, ???  */
    fTtU: "?",
    /*  src/comment_data/mock.ts, DiPI, ?????????  */
    DiPI: "\u7F57\u6587\u5174",
    /*  src/comment_data/mock.ts, DYyk, ?????????????????????  */
    DYyk: "\u8FD9\u53C8\u662F\u4E00\u6761\u8BC4\u8BBA",
    /*  src/comment_data/mock.ts, oHGg, ??????????????????  */
    oHGg: "\u8FD9\u662F\u4E00\u6761\u8BC4\u8BBA",
    /*  src/comment_data/mock.ts, xbMg, ?????????????????????  */
    xbMg: "\u4F60\u597D\uFF0C\u6C83\u5C14\u5FB7\uFF01",
    /*  src/comment_data/middleware/index.ts, thQX, ??????????????????????????????????????????????????????  */
    thQX: "This comment has been deleted in the content. Archiving cannot be undone.",
    /*  src/comment_view/mobile/comment_block_mobile.tsx, EVgb, {0} ???????????????  */
    EVgb: "{0} handled the comment",
    /*  src/comment_view/mobile/comment_block_mobile.tsx, nbgw, ??????????????????????????????????????????????????????  */
    nbgw: "Unable to delete the comment. Check your network or try again later.",
    /*  src/comment_view/mobile/comment_block_mobile.tsx, ZKeh, ??????????????????????????????????????????????????????  */
    ZKeh: "Unable to like the comment. Check your network or try again later.",
    /*  src/comment_view/mobile/comment_block_mobile.tsx, ZXgs, ??????????????????????????????????????????????????????  */
    ZXgs: "Unable to edit the comment. Check your network or try again later.",
    /*  src/comment_view/mobile/comment_guide_page.tsx, Xghe, ????????????  */
    Xghe: "Got it",
    /*  src/comment_view/mobile/comment_guide_page.tsx, yprd, ??????????????????????????????????????????  */
    yprd: "You can recover the comment in \"Solved Comments\".",
    /*  src/comment_view/mobile/comment_guide_page.tsx, VivU, ??????????????????????????????????????????  */
    VivU: "Comments tagged as solved will be hidden.",
    /*  src/comment_view/mobile/comment_item_mobile.tsx, UHNx, ?????? {0}  */
    UHNx: "From {0}",
    /*  src/comment_view/mobile/comment_item_mobile.tsx, BVjT, ??????  */
    BVjT: "Delete",
    /*  src/comment_view/mobile/comment_item_mobile.tsx, IPFp, ??????  */
    IPFp: "Edit",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, rojn, ??????  */
    rojn: "Reply",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, RYyv, ???????????????????????????????????????  */
    RYyv: "Solved comments will be collected here.",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, VArs, ??????????????????  */
    VArs: "Tag as solved",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, dzwr, ??????????????????  */
    dzwr: "Tag as unsolved",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, QGIK, ?????????????????????????????????  */
    QGIK: "This comment has been tagged as unsolved.",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, cRfK, ??????????????????????????????????????????????????????  */
    cRfK: "Unable to archive the comment. Check your network or try again later.",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, VNtp, ??????????????????  */
    VNtp: "This comment has been handled.",
    /*  src/comment_view/pc/comment_archived_panel.tsx, Guxo, ????????????  */
    Guxo: "Unarchive",
    /*  src/comment_view/pc/comment_archived_panel.tsx, FTgD, ??????????????????  */
    FTgD: " handled the comment",
    /*  src/comment_view/pc/comment_block.tsx, iSlK, @??????????????????...  */
    iSlK: "@ colleagues to handle together...",
    /*  src/comment_view/pc/comment_block.tsx, uPFJ, ??????????????????????????????????????????????????????  */
    uPFJ: "Unable to add the comment. Check your network or try again later.",
    /*  src/comment_view/pc/comment_block.tsx, spHf, ??????????????????????????????????????????????????????????????????  */
    spHf: "Unable to tag as solved comment. Check your network or try again later.",
    /*  src/comment_view/pc/comment_input.tsx, qfWI, ??????  */
    qfWI: "Cancel",
    /*  src/comment_view/pc/comment_input.tsx, efdw, ??????  */
    efdw: "Send",
    /*  src/comment_view/pc/comment_input.tsx, ErIV, ????????????...  */
    ErIV: "Enter comment...",
    /*  src/comment_view/pc/comment_item.tsx, EjMJ, ?????????  */
    EjMJ: " comment(s)",
    /*  src/comment_view/pc/comment_item.tsx, DVyb, ?????????  */
    DVyb: "Collapsed",
    /*  src/comment_view/pc/comment_item.tsx, XuLF, ??????  */
    XuLF: "From",
    /*  src/comment_view/pc/comment_item.tsx, oPqg, ??????????????????????????????  */
    oPqg: "Delete this comment?",
    /*  src/comment_view/pc/comment_item.tsx, vXmW, ????????????  */
    vXmW: "Delete Comment",
    /*  src/comment_view/share/comment_util.ts, QVKO, YYYY???MM???DD??? hh:mm  */
    QVKO: "MM/DD/YYYY, hh:mm",
    /*  src/comment_view/share/comment_util.ts, cXGq, ??????{0}  */
    cXGq: "Tomorrow {0}",
    /*  src/comment_view/share/comment_util.ts, xwsT, ??????{0}  */
    xwsT: "Today {0}",
    /*  src/comment_view/share/comment_util.ts, RIDU, ??????  */
    RIDU: "Just now",
    /*  src/comment_view/share/comment_util.ts, rBiS, ???{0}  */
    rBiS: "",
    /*  src/comment_view/share/comment_util.ts, FzvV, ??????{0}  */
    FzvV: "Yesterday {0}",
    /*  src/comment_view/share/comment_util.ts, LqPe, ???  */
    LqPe: "Sat.",
    /*  src/comment_view/share/comment_util.ts, Iqzb, ???  */
    Iqzb: "Fri.",
    /*  src/comment_view/share/comment_util.ts, BeIf, ???  */
    BeIf: "Thu.",
    /*  src/comment_view/share/comment_util.ts, WThX, ???  */
    WThX: "Wed.",
    /*  src/comment_view/share/comment_util.ts, jAHF, ???  */
    jAHF: "Tue.",
    /*  src/comment_view/share/comment_util.ts, CLFV, ???  */
    CLFV: "Mon.",
    /*  src/comment_view/share/comment_util.ts, IJRe, ???  */
    IJRe: "Sun.",
    /*  src/lib/components/contacts.tsx, WxNh, ?????????????????????  */
    WxNh: "Select from Contacts...",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, BfQo, ??????  */
    BfQo: "Comments",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, kOsF, ???????????????  */
    kOsF: "Comments resolved",
    /*  src/comment_view/mobile/comment_panel_mobile.tsx, kGhW, ?????????  */
    kGhW: "Edited",
    /*  src/comment_view/share/comment_util.ts, MyiE, ?????????  */
    MyiE: " min ago"
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lang = "en";
window.__WEDOCS_LANG__ = lang;
window.__WEDOCS_LANG_PKG__ = window.__WEDOCS_LANG_PKG__ || {};
window.__WEDOCS_LANG_PKG__[lang] = window.__WEDOCS_LANG_PKG__[lang] || {};
window.__WEDOCS_LANG_PKG__[lang] = _extends({}, window.__WEDOCS_LANG_PKG__[lang], {
    /*  src/back_view/Backtip.tsx, abWI, ????????????????????????...  */
    abWI: "Loading recent documents",
    /*  src/back_view/Backtip.tsx, aAOF, ????????????  */
    aAOF: "Recent Documents",
    /*  src/back_view/Backtip.tsx, REfC, ???????????????  */
    REfC: "New Form",
    /*  src/back_view/Backtip.tsx, ckQR, ????????????  */
    ckQR: "New Word",
    /*  src/back_view/Backtip.tsx, lmMj, ????????????  */
    lmMj: "New Excel",
    /*  src/back_view/Backtip.tsx, axln, ??????????????? */
    axln: "Word Home",
    /*  src/back_view/Icon.tsx, aCUw, Icon/????????????/Form  */
    aCUw: "",
    /*  src/back_view/Icon.tsx, WJhK, Icon/????????????/Sheet  */
    WJhK: "",
    /*  src/back_view/Icon.tsx, kfvm, Icon/????????????/Doc  */
    kfvm: "",
    /*  src/back_view/Icon.tsx, jWpu, Icon/????????????/Home  */
    jWpu: "",
    /*  src/back_view/Backtip.tsx, Dfpt, ??????  */
    Dfpt: "New",
    /*  src/back_view/Icon.tsx, IeDs, Icon/????????????/new  */
    IeDs: "",
    /*  src/back_view/view.tsx, lkLj, Icon/Toolbar/??????  */
    lkLj: ""
});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

IntlPolyfill.__addLocaleData({locale:"en",date:{ca:["gregory","buddhist","chinese","coptic","dangi","ethioaa","ethiopic","generic","hebrew","indian","islamic","islamicc","japanese","persian","roc"],hourNo0:true,hour12:true,formats:{short:"{1}, {0}",medium:"{1}, {0}",full:"{1} 'at' {0}",long:"{1} 'at' {0}",availableFormats:{"d":"d","E":"ccc",Ed:"d E",Ehm:"E h:mm a",EHm:"E HH:mm",Ehms:"E h:mm:ss a",EHms:"E HH:mm:ss",Gy:"y G",GyMMM:"MMM y G",GyMMMd:"MMM d, y G",GyMMMEd:"E, MMM d, y G","h":"h a","H":"HH",hm:"h:mm a",Hm:"HH:mm",hms:"h:mm:ss a",Hms:"HH:mm:ss",hmsv:"h:mm:ss a v",Hmsv:"HH:mm:ss v",hmv:"h:mm a v",Hmv:"HH:mm v","M":"L",Md:"M/d",MEd:"E, M/d",MMM:"LLL",MMMd:"MMM d",MMMEd:"E, MMM d",MMMMd:"MMMM d",ms:"mm:ss","y":"y",yM:"M/y",yMd:"M/d/y",yMEd:"E, M/d/y",yMMM:"MMM y",yMMMd:"MMM d, y",yMMMEd:"E, MMM d, y",yMMMM:"MMMM y",yQQQ:"QQQ y",yQQQQ:"QQQQ y"},dateFormats:{yMMMMEEEEd:"EEEE, MMMM d, y",yMMMMd:"MMMM d, y",yMMMd:"MMM d, y",yMd:"M/d/yy"},timeFormats:{hmmsszzzz:"h:mm:ss a zzzz",hmsz:"h:mm:ss a z",hms:"h:mm:ss a",hm:"h:mm a"}},calendars:{buddhist:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["BE"],short:["BE"],long:["BE"]},dayPeriods:{am:"AM",pm:"PM"}},chinese:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},coptic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"],long:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},dangi:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},ethiopic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},ethioaa:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0"],short:["ERA0"],long:["ERA0"]},dayPeriods:{am:"AM",pm:"PM"}},generic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"],long:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},gregory:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["B","A","BCE","CE"],short:["BC","AD","BCE","CE"],long:["Before Christ","Anno Domini","Before Common Era","Common Era"]},dayPeriods:{am:"AM",pm:"PM"}},hebrew:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13","7"],short:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"],long:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AM"],short:["AM"],long:["AM"]},dayPeriods:{am:"AM",pm:"PM"}},indian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"],long:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Saka"],short:["Saka"],long:["Saka"]},dayPeriods:{am:"AM",pm:"PM"}},islamic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhu??l-Q.","Dhu??l-H."],long:["Muharram","Safar","Rabi?? I","Rabi?? II","Jumada I","Jumada II","Rajab","Sha??ban","Ramadan","Shawwal","Dhu??l-Qi??dah","Dhu??l-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},islamicc:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhu??l-Q.","Dhu??l-H."],long:["Muharram","Safar","Rabi?? I","Rabi?? II","Jumada I","Jumada II","Rajab","Sha??ban","Ramadan","Shawwal","Dhu??l-Qi??dah","Dhu??l-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},japanese:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Taika (645???650)","Hakuchi (650???671)","Hakuh?? (672???686)","Shuch?? (686???701)","Taih?? (701???704)","Keiun (704???708)","Wad?? (708???715)","Reiki (715???717)","Y??r?? (717???724)","Jinki (724???729)","Tenpy?? (729???749)","Tenpy??-kamp?? (749-749)","Tenpy??-sh??h?? (749-757)","Tenpy??-h??ji (757-765)","Tenpy??-jingo (765-767)","Jingo-keiun (767-770)","H??ki (770???780)","Ten-?? (781-782)","Enryaku (782???806)","Daid?? (806???810)","K??nin (810???824)","Tench?? (824???834)","J??wa (834???848)","Kaj?? (848???851)","Ninju (851???854)","Saik?? (854???857)","Ten-an (857-859)","J??gan (859???877)","Gangy?? (877???885)","Ninna (885???889)","Kanpy?? (889???898)","Sh??tai (898???901)","Engi (901???923)","Ench?? (923???931)","J??hei (931???938)","Tengy?? (938???947)","Tenryaku (947???957)","Tentoku (957???961)","??wa (961???964)","K??h?? (964???968)","Anna (968???970)","Tenroku (970???973)","Ten???en (973???976)","J??gen (976???978)","Tengen (978???983)","Eikan (983???985)","Kanna (985???987)","Eien (987???989)","Eiso (989???990)","Sh??ryaku (990???995)","Ch??toku (995???999)","Ch??h?? (999???1004)","Kank?? (1004???1012)","Ch??wa (1012???1017)","Kannin (1017???1021)","Jian (1021???1024)","Manju (1024???1028)","Ch??gen (1028???1037)","Ch??ryaku (1037???1040)","Ch??ky?? (1040???1044)","Kantoku (1044???1046)","Eish?? (1046???1053)","Tengi (1053???1058)","K??hei (1058???1065)","Jiryaku (1065???1069)","Enky?? (1069???1074)","Sh??ho (1074???1077)","Sh??ryaku (1077???1081)","Eih?? (1081???1084)","??toku (1084???1087)","Kanji (1087???1094)","Kah?? (1094???1096)","Eich?? (1096???1097)","J??toku (1097???1099)","K??wa (1099???1104)","Ch??ji (1104???1106)","Kash?? (1106???1108)","Tennin (1108???1110)","Ten-ei (1110-1113)","Eiky?? (1113???1118)","Gen???ei (1118???1120)","H??an (1120???1124)","Tenji (1124???1126)","Daiji (1126???1131)","Tensh?? (1131???1132)","Ch??sh?? (1132???1135)","H??en (1135???1141)","Eiji (1141???1142)","K??ji (1142???1144)","Ten???y?? (1144???1145)","Ky??an (1145???1151)","Ninpei (1151???1154)","Ky??ju (1154???1156)","H??gen (1156???1159)","Heiji (1159???1160)","Eiryaku (1160???1161)","??ho (1161???1163)","Ch??kan (1163???1165)","Eiman (1165???1166)","Nin???an (1166???1169)","Ka?? (1169???1171)","Sh??an (1171???1175)","Angen (1175???1177)","Jish?? (1177???1181)","Y??wa (1181???1182)","Juei (1182???1184)","Genryaku (1184???1185)","Bunji (1185???1190)","Kenky?? (1190???1199)","Sh??ji (1199???1201)","Kennin (1201???1204)","Genky?? (1204???1206)","Ken???ei (1206???1207)","J??gen (1207???1211)","Kenryaku (1211???1213)","Kenp?? (1213???1219)","J??ky?? (1219???1222)","J???? (1222???1224)","Gennin (1224???1225)","Karoku (1225???1227)","Antei (1227???1229)","Kanki (1229???1232)","J??ei (1232???1233)","Tenpuku (1233???1234)","Bunryaku (1234???1235)","Katei (1235???1238)","Ryakunin (1238???1239)","En????? (1239???1240)","Ninji (1240???1243)","Kangen (1243???1247)","H??ji (1247???1249)","Kench?? (1249???1256)","K??gen (1256???1257)","Sh??ka (1257???1259)","Sh??gen (1259???1260)","Bun????? (1260???1261)","K??ch?? (1261???1264)","Bun???ei (1264???1275)","Kenji (1275???1278)","K??an (1278???1288)","Sh???? (1288???1293)","Einin (1293???1299)","Sh??an (1299???1302)","Kengen (1302???1303)","Kagen (1303???1306)","Tokuji (1306???1308)","Enky?? (1308???1311)","??ch?? (1311???1312)","Sh??wa (1312???1317)","Bunp?? (1317???1319)","Gen?? (1319???1321)","Genk?? (1321???1324)","Sh??ch?? (1324???1326)","Karyaku (1326???1329)","Gentoku (1329???1331)","Genk?? (1331???1334)","Kenmu (1334???1336)","Engen (1336???1340)","K??koku (1340???1346)","Sh??hei (1346???1370)","Kentoku (1370???1372)","Bunch?? (1372???1375)","Tenju (1375???1379)","K??ryaku (1379???1381)","K??wa (1381???1384)","Gench?? (1384???1392)","Meitoku (1384???1387)","Kakei (1387???1389)","K???? (1389???1390)","Meitoku (1390???1394)","??ei (1394???1428)","Sh??ch?? (1428???1429)","Eiky?? (1429???1441)","Kakitsu (1441???1444)","Bun???an (1444???1449)","H??toku (1449???1452)","Ky??toku (1452???1455)","K??sh?? (1455???1457)","Ch??roku (1457???1460)","Kansh?? (1460???1466)","Bunsh?? (1466???1467)","??nin (1467???1469)","Bunmei (1469???1487)","Ch??ky?? (1487???1489)","Entoku (1489???1492)","Mei?? (1492???1501)","Bunki (1501???1504)","Eish?? (1504???1521)","Taiei (1521???1528)","Ky??roku (1528???1532)","Tenbun (1532???1555)","K??ji (1555???1558)","Eiroku (1558???1570)","Genki (1570???1573)","Tensh?? (1573???1592)","Bunroku (1592???1596)","Keich?? (1596???1615)","Genna (1615???1624)","Kan???ei (1624???1644)","Sh??ho (1644???1648)","Keian (1648???1652)","J???? (1652???1655)","Meireki (1655???1658)","Manji (1658???1661)","Kanbun (1661???1673)","Enp?? (1673???1681)","Tenna (1681???1684)","J??ky?? (1684???1688)","Genroku (1688???1704)","H??ei (1704???1711)","Sh??toku (1711???1716)","Ky??h?? (1716???1736)","Genbun (1736???1741)","Kanp?? (1741???1744)","Enky?? (1744???1748)","Kan???en (1748???1751)","H??reki (1751???1764)","Meiwa (1764???1772)","An???ei (1772???1781)","Tenmei (1781???1789)","Kansei (1789???1801)","Ky??wa (1801???1804)","Bunka (1804???1818)","Bunsei (1818???1830)","Tenp?? (1830???1844)","K??ka (1844???1848)","Kaei (1848???1854)","Ansei (1854???1860)","Man???en (1860???1861)","Bunky?? (1861???1864)","Genji (1864???1865)","Kei?? (1865???1868)","M","T","S","H"],short:["Taika (645???650)","Hakuchi (650???671)","Hakuh?? (672???686)","Shuch?? (686???701)","Taih?? (701???704)","Keiun (704???708)","Wad?? (708???715)","Reiki (715???717)","Y??r?? (717???724)","Jinki (724???729)","Tenpy?? (729???749)","Tenpy??-kamp?? (749-749)","Tenpy??-sh??h?? (749-757)","Tenpy??-h??ji (757-765)","Tenpy??-jingo (765-767)","Jingo-keiun (767-770)","H??ki (770???780)","Ten-?? (781-782)","Enryaku (782???806)","Daid?? (806???810)","K??nin (810???824)","Tench?? (824???834)","J??wa (834???848)","Kaj?? (848???851)","Ninju (851???854)","Saik?? (854???857)","Ten-an (857-859)","J??gan (859???877)","Gangy?? (877???885)","Ninna (885???889)","Kanpy?? (889???898)","Sh??tai (898???901)","Engi (901???923)","Ench?? (923???931)","J??hei (931???938)","Tengy?? (938???947)","Tenryaku (947???957)","Tentoku (957???961)","??wa (961???964)","K??h?? (964???968)","Anna (968???970)","Tenroku (970???973)","Ten???en (973???976)","J??gen (976???978)","Tengen (978???983)","Eikan (983???985)","Kanna (985???987)","Eien (987???989)","Eiso (989???990)","Sh??ryaku (990???995)","Ch??toku (995???999)","Ch??h?? (999???1004)","Kank?? (1004???1012)","Ch??wa (1012???1017)","Kannin (1017???1021)","Jian (1021???1024)","Manju (1024???1028)","Ch??gen (1028???1037)","Ch??ryaku (1037???1040)","Ch??ky?? (1040???1044)","Kantoku (1044???1046)","Eish?? (1046???1053)","Tengi (1053???1058)","K??hei (1058???1065)","Jiryaku (1065???1069)","Enky?? (1069???1074)","Sh??ho (1074???1077)","Sh??ryaku (1077???1081)","Eih?? (1081???1084)","??toku (1084???1087)","Kanji (1087???1094)","Kah?? (1094???1096)","Eich?? (1096???1097)","J??toku (1097???1099)","K??wa (1099???1104)","Ch??ji (1104???1106)","Kash?? (1106???1108)","Tennin (1108???1110)","Ten-ei (1110-1113)","Eiky?? (1113???1118)","Gen???ei (1118???1120)","H??an (1120???1124)","Tenji (1124???1126)","Daiji (1126???1131)","Tensh?? (1131???1132)","Ch??sh?? (1132???1135)","H??en (1135???1141)","Eiji (1141???1142)","K??ji (1142???1144)","Ten???y?? (1144???1145)","Ky??an (1145???1151)","Ninpei (1151???1154)","Ky??ju (1154???1156)","H??gen (1156???1159)","Heiji (1159???1160)","Eiryaku (1160???1161)","??ho (1161???1163)","Ch??kan (1163???1165)","Eiman (1165???1166)","Nin???an (1166???1169)","Ka?? (1169???1171)","Sh??an (1171???1175)","Angen (1175???1177)","Jish?? (1177???1181)","Y??wa (1181???1182)","Juei (1182???1184)","Genryaku (1184???1185)","Bunji (1185???1190)","Kenky?? (1190???1199)","Sh??ji (1199???1201)","Kennin (1201???1204)","Genky?? (1204???1206)","Ken???ei (1206???1207)","J??gen (1207???1211)","Kenryaku (1211???1213)","Kenp?? (1213???1219)","J??ky?? (1219???1222)","J???? (1222???1224)","Gennin (1224???1225)","Karoku (1225???1227)","Antei (1227???1229)","Kanki (1229???1232)","J??ei (1232???1233)","Tenpuku (1233???1234)","Bunryaku (1234???1235)","Katei (1235???1238)","Ryakunin (1238???1239)","En????? (1239???1240)","Ninji (1240???1243)","Kangen (1243???1247)","H??ji (1247???1249)","Kench?? (1249???1256)","K??gen (1256???1257)","Sh??ka (1257???1259)","Sh??gen (1259???1260)","Bun????? (1260???1261)","K??ch?? (1261???1264)","Bun???ei (1264???1275)","Kenji (1275???1278)","K??an (1278???1288)","Sh???? (1288???1293)","Einin (1293???1299)","Sh??an (1299???1302)","Kengen (1302???1303)","Kagen (1303???1306)","Tokuji (1306???1308)","Enky?? (1308???1311)","??ch?? (1311???1312)","Sh??wa (1312???1317)","Bunp?? (1317???1319)","Gen?? (1319???1321)","Genk?? (1321???1324)","Sh??ch?? (1324???1326)","Karyaku (1326???1329)","Gentoku (1329???1331)","Genk?? (1331???1334)","Kenmu (1334???1336)","Engen (1336???1340)","K??koku (1340???1346)","Sh??hei (1346???1370)","Kentoku (1370???1372)","Bunch?? (1372???1375)","Tenju (1375???1379)","K??ryaku (1379???1381)","K??wa (1381???1384)","Gench?? (1384???1392)","Meitoku (1384???1387)","Kakei (1387???1389)","K???? (1389???1390)","Meitoku (1390???1394)","??ei (1394???1428)","Sh??ch?? (1428???1429)","Eiky?? (1429???1441)","Kakitsu (1441???1444)","Bun???an (1444???1449)","H??toku (1449???1452)","Ky??toku (1452???1455)","K??sh?? (1455???1457)","Ch??roku (1457???1460)","Kansh?? (1460???1466)","Bunsh?? (1466???1467)","??nin (1467???1469)","Bunmei (1469???1487)","Ch??ky?? (1487???1489)","Entoku (1489???1492)","Mei?? (1492???1501)","Bunki (1501???1504)","Eish?? (1504???1521)","Taiei (1521???1528)","Ky??roku (1528???1532)","Tenbun (1532???1555)","K??ji (1555???1558)","Eiroku (1558???1570)","Genki (1570???1573)","Tensh?? (1573???1592)","Bunroku (1592???1596)","Keich?? (1596???1615)","Genna (1615???1624)","Kan???ei (1624???1644)","Sh??ho (1644???1648)","Keian (1648???1652)","J???? (1652???1655)","Meireki (1655???1658)","Manji (1658???1661)","Kanbun (1661???1673)","Enp?? (1673???1681)","Tenna (1681???1684)","J??ky?? (1684???1688)","Genroku (1688???1704)","H??ei (1704???1711)","Sh??toku (1711???1716)","Ky??h?? (1716???1736)","Genbun (1736???1741)","Kanp?? (1741???1744)","Enky?? (1744???1748)","Kan???en (1748???1751)","H??reki (1751???1764)","Meiwa (1764???1772)","An???ei (1772???1781)","Tenmei (1781???1789)","Kansei (1789???1801)","Ky??wa (1801???1804)","Bunka (1804???1818)","Bunsei (1818???1830)","Tenp?? (1830???1844)","K??ka (1844???1848)","Kaei (1848???1854)","Ansei (1854???1860)","Man???en (1860???1861)","Bunky?? (1861???1864)","Genji (1864???1865)","Kei?? (1865???1868)","Meiji","Taish??","Sh??wa","Heisei"],long:["Taika (645???650)","Hakuchi (650???671)","Hakuh?? (672???686)","Shuch?? (686???701)","Taih?? (701???704)","Keiun (704???708)","Wad?? (708???715)","Reiki (715???717)","Y??r?? (717???724)","Jinki (724???729)","Tenpy?? (729???749)","Tenpy??-kamp?? (749-749)","Tenpy??-sh??h?? (749-757)","Tenpy??-h??ji (757-765)","Tenpy??-jingo (765-767)","Jingo-keiun (767-770)","H??ki (770???780)","Ten-?? (781-782)","Enryaku (782???806)","Daid?? (806???810)","K??nin (810???824)","Tench?? (824???834)","J??wa (834???848)","Kaj?? (848???851)","Ninju (851???854)","Saik?? (854???857)","Ten-an (857-859)","J??gan (859???877)","Gangy?? (877???885)","Ninna (885???889)","Kanpy?? (889???898)","Sh??tai (898???901)","Engi (901???923)","Ench?? (923???931)","J??hei (931???938)","Tengy?? (938???947)","Tenryaku (947???957)","Tentoku (957???961)","??wa (961???964)","K??h?? (964???968)","Anna (968???970)","Tenroku (970???973)","Ten???en (973???976)","J??gen (976???978)","Tengen (978???983)","Eikan (983???985)","Kanna (985???987)","Eien (987???989)","Eiso (989???990)","Sh??ryaku (990???995)","Ch??toku (995???999)","Ch??h?? (999???1004)","Kank?? (1004???1012)","Ch??wa (1012???1017)","Kannin (1017???1021)","Jian (1021???1024)","Manju (1024???1028)","Ch??gen (1028???1037)","Ch??ryaku (1037???1040)","Ch??ky?? (1040???1044)","Kantoku (1044???1046)","Eish?? (1046???1053)","Tengi (1053???1058)","K??hei (1058???1065)","Jiryaku (1065???1069)","Enky?? (1069???1074)","Sh??ho (1074???1077)","Sh??ryaku (1077???1081)","Eih?? (1081???1084)","??toku (1084???1087)","Kanji (1087???1094)","Kah?? (1094???1096)","Eich?? (1096???1097)","J??toku (1097???1099)","K??wa (1099???1104)","Ch??ji (1104???1106)","Kash?? (1106???1108)","Tennin (1108???1110)","Ten-ei (1110-1113)","Eiky?? (1113???1118)","Gen???ei (1118???1120)","H??an (1120???1124)","Tenji (1124???1126)","Daiji (1126???1131)","Tensh?? (1131???1132)","Ch??sh?? (1132???1135)","H??en (1135???1141)","Eiji (1141???1142)","K??ji (1142???1144)","Ten???y?? (1144???1145)","Ky??an (1145???1151)","Ninpei (1151???1154)","Ky??ju (1154???1156)","H??gen (1156???1159)","Heiji (1159???1160)","Eiryaku (1160???1161)","??ho (1161???1163)","Ch??kan (1163???1165)","Eiman (1165???1166)","Nin???an (1166???1169)","Ka?? (1169???1171)","Sh??an (1171???1175)","Angen (1175???1177)","Jish?? (1177???1181)","Y??wa (1181???1182)","Juei (1182???1184)","Genryaku (1184???1185)","Bunji (1185???1190)","Kenky?? (1190???1199)","Sh??ji (1199???1201)","Kennin (1201???1204)","Genky?? (1204???1206)","Ken???ei (1206???1207)","J??gen (1207???1211)","Kenryaku (1211???1213)","Kenp?? (1213???1219)","J??ky?? (1219???1222)","J???? (1222???1224)","Gennin (1224???1225)","Karoku (1225???1227)","Antei (1227???1229)","Kanki (1229???1232)","J??ei (1232???1233)","Tenpuku (1233???1234)","Bunryaku (1234???1235)","Katei (1235???1238)","Ryakunin (1238???1239)","En????? (1239???1240)","Ninji (1240???1243)","Kangen (1243???1247)","H??ji (1247???1249)","Kench?? (1249???1256)","K??gen (1256???1257)","Sh??ka (1257???1259)","Sh??gen (1259???1260)","Bun????? (1260???1261)","K??ch?? (1261???1264)","Bun???ei (1264???1275)","Kenji (1275???1278)","K??an (1278???1288)","Sh???? (1288???1293)","Einin (1293???1299)","Sh??an (1299???1302)","Kengen (1302???1303)","Kagen (1303???1306)","Tokuji (1306???1308)","Enky?? (1308???1311)","??ch?? (1311???1312)","Sh??wa (1312???1317)","Bunp?? (1317???1319)","Gen?? (1319???1321)","Genk?? (1321???1324)","Sh??ch?? (1324???1326)","Karyaku (1326???1329)","Gentoku (1329???1331)","Genk?? (1331???1334)","Kenmu (1334???1336)","Engen (1336???1340)","K??koku (1340???1346)","Sh??hei (1346???1370)","Kentoku (1370???1372)","Bunch?? (1372???1375)","Tenju (1375???1379)","K??ryaku (1379???1381)","K??wa (1381???1384)","Gench?? (1384???1392)","Meitoku (1384???1387)","Kakei (1387???1389)","K???? (1389???1390)","Meitoku (1390???1394)","??ei (1394???1428)","Sh??ch?? (1428???1429)","Eiky?? (1429???1441)","Kakitsu (1441???1444)","Bun???an (1444???1449)","H??toku (1449???1452)","Ky??toku (1452???1455)","K??sh?? (1455???1457)","Ch??roku (1457???1460)","Kansh?? (1460???1466)","Bunsh?? (1466???1467)","??nin (1467???1469)","Bunmei (1469???1487)","Ch??ky?? (1487???1489)","Entoku (1489???1492)","Mei?? (1492???1501)","Bunki (1501???1504)","Eish?? (1504???1521)","Taiei (1521???1528)","Ky??roku (1528???1532)","Tenbun (1532???1555)","K??ji (1555???1558)","Eiroku (1558???1570)","Genki (1570???1573)","Tensh?? (1573???1592)","Bunroku (1592???1596)","Keich?? (1596???1615)","Genna (1615???1624)","Kan???ei (1624???1644)","Sh??ho (1644???1648)","Keian (1648???1652)","J???? (1652???1655)","Meireki (1655???1658)","Manji (1658???1661)","Kanbun (1661???1673)","Enp?? (1673???1681)","Tenna (1681???1684)","J??ky?? (1684???1688)","Genroku (1688???1704)","H??ei (1704???1711)","Sh??toku (1711???1716)","Ky??h?? (1716???1736)","Genbun (1736???1741)","Kanp?? (1741???1744)","Enky?? (1744???1748)","Kan???en (1748???1751)","H??reki (1751???1764)","Meiwa (1764???1772)","An???ei (1772???1781)","Tenmei (1781???1789)","Kansei (1789???1801)","Ky??wa (1801???1804)","Bunka (1804???1818)","Bunsei (1818???1830)","Tenp?? (1830???1844)","K??ka (1844???1848)","Kaei (1848???1854)","Ansei (1854???1860)","Man???en (1860???1861)","Bunky?? (1861???1864)","Genji (1864???1865)","Kei?? (1865???1868)","Meiji","Taish??","Sh??wa","Heisei"]},dayPeriods:{am:"AM",pm:"PM"}},persian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"],long:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AP"],short:["AP"],long:["AP"]},dayPeriods:{am:"AM",pm:"PM"}},roc:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Before R.O.C.","Minguo"],short:["Before R.O.C.","Minguo"],long:["Before R.O.C.","Minguo"]},dayPeriods:{am:"AM",pm:"PM"}}}},number:{nu:["latn"],patterns:{decimal:{positivePattern:"{number}",negativePattern:"{minusSign}{number}"},currency:{positivePattern:"{currency}{number}",negativePattern:"{minusSign}{currency}{number}"},percent:{positivePattern:"{number}{percentSign}",negativePattern:"{minusSign}{number}{percentSign}"}},symbols:{latn:{decimal:".",group:",",nan:"NaN",plusSign:"+",minusSign:"-",percentSign:"%",infinity:"???"}},currencies:{AUD:"A$",BRL:"R$",CAD:"CA$",CNY:"CN??",EUR:"???",GBP:"??",HKD:"HK$",ILS:"???",INR:"???",JPY:"??",KRW:"???",MXN:"MX$",NZD:"NZ$",TWD:"NT$",USD:"$",VND:"???",XAF:"FCFA",XCD:"EC$",XOF:"CFA",XPF:"CFPF"}}});

/***/ })
/******/ ]);